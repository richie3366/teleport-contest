#!/usr/bin/env node
// Special-level / themed-room coverage audit (dynamic half; the static
// half is scripts/level-audit-static.py). See
// reviews/level-audit/2026-10-20-special-levels.md.
//
// Copies js/ to .cache/level-audit/js, injects three hooks into the COPY's
// mklev.js (special-level load, themed-room pick, themed fill pick) — the
// scored js/ is never touched — then replays every cached corpus session
// (.cache/hidden/sessions) against the copy and records, per event, the
// flat RNG index. An event is "RNG-verified" when the session's JS RNG
// stream still matched C's (frozen runner normalization) at that index.
//
//   node scripts/level-audit.mjs                 # all cached sessions, 8 jobs
//   node scripts/level-audit.mjs --jobs 4 --ids a,b
//   node scripts/level-audit.mjs --report        # re-aggregate last run only
//
// Output: per-level table (builds, sessions, RNG-verified, board-screen
// verified), unreached levels, themed-room/fill tallies, exceptions.
// Results: .cache/level-audit/results/<id>.json, summary.json.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { cpus } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WORK = join(ROOT, '.cache/level-audit');
const JSCOPY = join(WORK, 'js');
const RESULTS = join(WORK, 'results');
const SESSIONS = join(ROOT, '.cache/hidden/sessions');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };

const isRngCall = (e) => typeof e === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(e);
const norm = (e) => e.replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();

const HOOKS = [
    ['        const ok = await load_special_proto_body(protofile);\n',
        "        globalThis.__LEVHOOK?.('special', protofile, ok);\n"],
    ['    croom._themeroom_fill = pick.name;\n',
        "    globalThis.__LEVHOOK?.('fill', pick.name, true);\n"],
    ['        const mapdef = THEMEROOM_MAPS[pick.name];\n',
        null], // hook goes before this anchor
];

function prepareCopy() {
    rmSync(JSCOPY, { recursive: true, force: true });
    mkdirSync(WORK, { recursive: true });
    cpSync(join(ROOT, 'js'), JSCOPY, { recursive: true });
    const p = join(JSCOPY, 'mklev.js');
    let s = readFileSync(p, 'utf8');
    for (const [anchor, after] of HOOKS) {
        if (s.split(anchor).length !== 2) throw new Error(`hook anchor not unique/found: ${anchor.trim()}`);
        s = after
            ? s.replace(anchor, anchor + after)
            : s.replace(anchor, "        globalThis.__LEVHOOK?.('theme', pick.name, true);\n" + anchor);
    }
    writeFileSync(p, s);
}

async function worker(sessPath) {
    const id = basename(sessPath).replace(/\.session\.json$/, '');
    const out = { id, events: [], error: null };
    try {
        const { normalizeSession } = await import(pathToFileURL(join(ROOT, 'frozen/session_loader.mjs')).href);
        const segments = normalizeSession(JSON.parse(readFileSync(sessPath, 'utf8'))).segments;
        const cRng = []; const cCum = [];
        for (const seg of segments) for (const step of seg.steps || []) {
            for (const e of (step.rng || [])) if (isRngCall(e)) cRng.push(e);
            cCum.push(cRng.length);
        }
        const rngMod = await import(pathToFileURL(join(JSCOPY, 'rng.js')).href);
        const { runSegment } = await import(pathToFileURL(join(JSCOPY, 'jsmain.js')).href);
        let offset = 0;
        globalThis.__LEVHOOK = (kind, name, ok) => {
            const k = offset + (rngMod.getRngLog() || []).filter(isRngCall).length;
            out.events.push({ kind, name, ok, k });
        };
        const mem = new Map();
        const storage = {
            getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)),
            removeItem: (k) => mem.delete(k), get length() { return mem.size; }, key: (i) => [...mem.keys()][i] ?? null,
        };
        const jsRng = [];
        try {
            for (const seg of segments) {
                const g = await runSegment({ seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc, moves: seg.moves, storage });
                for (const e of (g.getRngLog?.() || [])) {
                    const s = typeof e === 'string' ? e.replace(/^\d+\s+/, '') : String(e);
                    if (isRngCall(s)) jsRng.push(s);
                }
                offset = jsRng.length;
            }
        } catch (e) { out.error = String(e?.message || e).slice(0, 200); }
        // First mismatch inside C's recording; JS RNG past the recording's
        // end is ignored, as the frozen runner does.
        let div = -1;
        for (let i = 0; i < cRng.length; i++) if (norm(cRng[i]) !== norm(jsRng[i] || '')) { div = i; break; }
        out.cRng = cRng.length; out.jsRng = jsRng.length; out.rngDiv = div;
        const stepOf = (k) => { let s = 0; while (s < cCum.length && cCum[s] < k) s++; return s; };
        out.rngDivStep = div < 0 ? null : stepOf(div + 1);
        out.steps = cCum.length;
        for (const ev of out.events) { ev.step = stepOf(ev.k); ev.pastEnd = ev.k > cRng.length; }
    } catch (e) { out.error = 'setup: ' + String(e?.message || e).slice(0, 200); }
    writeFileSync(join(RESULTS, out.id + '.json'), JSON.stringify(out));
}

function report() {
    const levels = readdirSync(join(ROOT, 'nethack-c/upstream/dat'))
        .filter((f) => f.endsWith('.lua') && !['dungeon.lua', 'nhcore.lua', 'nhlib.lua', 'quest.lua', 'themerms.lua'].includes(f))
        .map((f) => f.replace(/\.lua$/, '')).sort();
    const board = JSON.parse(readFileSync(join(ROOT, 'hidden-corpus/scoreboard.json'), 'utf8')).sessions;
    const S = {}; const T = {}; const F = {}; const exceptions = [];
    let n = 0, errs = 0;
    for (const f of readdirSync(RESULTS)) {
        const o = JSON.parse(readFileSync(join(RESULTS, f), 'utf8')); n++;
        if (o.error) errs++;
        const div = o.rngDiv ?? -1; const b = board[o.id];
        for (const ev of o.events) {
            const okRng = div === -1 || div > ev.k;
            if (ev.kind === 'special') {
                const s = (S[ev.name] ??= { builds: 0, sessions: new Set(), rngOk: 0, scrSeen: 0, scrOk: 0 });
                s.builds++; s.sessions.add(o.id);
                if (okRng) s.rngOk++;
                else if (!ev.pastEnd) exceptions.push(`${ev.name} ${o.id} step ${ev.step}: RNG diverged at step ${o.rngDivStep}`);
                if (b) {
                    s.scrSeen++;
                    if (b.passed || (b.step != null && b.step > ev.step)) s.scrOk++;
                    else exceptions.push(`${ev.name} ${o.id} step ${ev.step}: board first divergence step ${b.step} (${b.owner})`);
                }
            } else {
                const m = ev.kind === 'theme' ? T : F;
                (m[ev.name] ??= [0, 0]); m[ev.name][0]++; if (okRng) m[ev.name][1]++;
            }
        }
    }
    console.log(`sessions ${n}, errors ${errs}`);
    console.log('level        builds  sessions  rngOK  boardScreenOK');
    const unreached = []; const summary = {};
    for (const l of levels) {
        const s = S[l];
        if (!s) { unreached.push(l); summary[l] = null; continue; }
        summary[l] = { builds: s.builds, sessions: s.sessions.size, rngOk: s.rngOk, scrOk: s.scrOk, scrSeen: s.scrSeen };
        console.log(`${l.padEnd(12)} ${String(s.builds).padStart(6)}  ${String(s.sessions.size).padStart(8)}  ${String(s.rngOk).padStart(5)}  ${s.scrOk}/${s.scrSeen}`);
    }
    console.log(`\nunreached (${unreached.length}): ${unreached.join(' ')}`);
    console.log('\nthemed rooms (picks / rngOK):');
    for (const [k, v] of Object.entries(T).sort((a, b) => b[1][0] - a[1][0])) console.log(`  ${k.padEnd(48)} ${v[0]} / ${v[1]}`);
    console.log('themed fills (picks / rngOK):');
    for (const [k, v] of Object.entries(F).sort((a, b) => b[1][0] - a[1][0])) console.log(`  ${k.padEnd(48)} ${v[0]} / ${v[1]}`);
    console.log(`\nexceptions (${exceptions.length}; triage each — most are earlier unrelated divergences):`);
    for (const e of exceptions) console.log('  ' + e);
    writeFileSync(join(WORK, 'summary.json'), JSON.stringify({ sessions: n, errors: errs, levels: summary, unreached, themes: T, fills: F, exceptions }, null, 1));
}

if (argv[0] === '--worker') {
    await worker(argv[1]);
    process.exit(0);
} else if (argv.includes('--report')) {
    report();
} else {
    const jobs = Math.max(1, Number(opt('--jobs', Math.min(8, cpus().length))));
    const ids = opt('--ids', '');
    const files = ids
        ? ids.split(',').map((i) => join(SESSIONS, `${i}.session.json`))
        : readdirSync(SESSIONS).filter((f) => f.endsWith('.session.json')).map((f) => join(SESSIONS, f));
    if (!files.length || !existsSync(files[0])) { console.error(`no sessions under ${SESSIONS}`); process.exit(2); }
    prepareCopy();
    rmSync(RESULTS, { recursive: true, force: true });
    mkdirSync(RESULTS, { recursive: true });
    let next = 0, done = 0;
    await new Promise((resolve) => {
        const launch = () => {
            if (next >= files.length) { if (done === files.length) resolve(); return; }
            const f = files[next++];
            const c = spawn(process.execPath, [fileURLToPath(import.meta.url), '--worker', f], { stdio: 'ignore' });
            c.on('exit', () => {
                done++;
                if (done % 250 === 0) process.stderr.write(`  ${done}/${files.length}\n`);
                if (done === files.length) resolve(); else launch();
            });
        };
        for (let i = 0; i < jobs; i++) launch();
    });
    report();
}
