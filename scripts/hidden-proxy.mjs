#!/usr/bin/env node
/**
 * hidden-proxy.mjs — the hidden-score proxy: a large corpus of ordinary-play
 * sessions recorded on the pinned C recorder, replayed in JS, with every
 * first divergence attributed to a C function. Operator + loop tooling.
 * Never touches sessions/ or js/.
 *
 *   node scripts/hidden-proxy.mjs gen [--n 240] [--seed N] [--jobs 6]
 *   node scripts/hidden-proxy.mjs gen --mode tour [--n 26] [--seed 70000]
 *       debug-mode ^V level-teleport descents (bigrm/rogue/medusa/castle
 *       depths) so the corpus reaches held-out level content; then record.
 *       record N new mutants via fuzz-oracle (explore/random/independent),
 *       keep the recipes in hidden-corpus/recipes/, sessions in .cache.
 *   node scripts/hidden-proxy.mjs import [batchDir]
 *       adopt an existing .cache/fuzz/batch-* (default: latest).
 *   node scripts/hidden-proxy.mjs record [--jobs 6]
 *       re-record every recipe whose session is missing from .cache
 *       (the cache is disposable; recipes + the recorder rebuild it).
 *   node scripts/hidden-proxy.mjs score [--jobs 6] [--ids a,b] [--owner fn]
 *       replay in JS (one process per session), attribute first diffs,
 *       write hidden-corpus/scoreboard.json (+ .cache/hidden/scores.json).
 *   node scripts/hidden-proxy.mjs queue [--limit 12]
 *       LOOP-QUEUE rows: C-function owners ranked by sessions blocked.
 *   node scripts/hidden-proxy.mjs verify <fn> [--base <git-rev>|working]
 *       rescore the sessions blocked on <fn> in the COMMITTED scoreboard at
 *       --base (default HEAD; the rows the queue row was built from), plus
 *       any blocked in the working scoreboard; report which PASS, which
 *       moved to a later owner, which did not move. Re-running verify in
 *       the same iteration re-runs the same sessions (the baseline is not
 *       the file verify itself rewrites). Reviews: --base <sha>~1.
 *   node scripts/hidden-proxy.mjs show <sessionId>
 *   node scripts/hidden-proxy.mjs status
 *
 * The number to move is the pass rate printed by `status`. The public 44
 * stay the regression fortress; this corpus is the work picker.
 */
import { spawn, spawnSync } from 'node:child_process';
import {
    existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync,
    copyFileSync, rmSync, cpSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const CORPUS = path.join(ROOT, 'hidden-corpus');
const RECIPES = path.join(CORPUS, 'recipes');
const SCOREBOARD = path.join(CORPUS, 'scoreboard.json');
const CACHE = path.join(ROOT, '.cache', 'hidden');
const SESSIONS = path.join(CACHE, 'sessions');
const SCORES = path.join(CACHE, 'scores.json');
const PRIVATE = path.join(ROOT, 'private-sessions');
const FUZZ_CACHE = path.join(ROOT, '.cache', 'fuzz');
const WORKER = path.join(SCRIPT_DIR, 'lib', 'hidden-worker.mjs');
const RECORD = path.join(SCRIPT_DIR, 'record-session.mjs');
const FUZZ = path.join(SCRIPT_DIR, 'fuzz-oracle.mjs');
const DEFAULT_INSTALL = path.join(
    ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const WORKER_ROOT = '/tmp/nhhp';
const PIN_TZ = 'America/New_York';

const args = process.argv.slice(2);
const cmd = args[0];
const rest = args.slice(1);
const val = (k, d) => { const i = rest.indexOf(`--${k}`); return i >= 0 && rest[i + 1] != null ? rest[i + 1] : d; };
const flag = (k) => rest.includes(`--${k}`);

function readJson(p) { return JSON.parse(readFileSync(p, 'utf8')); }
function writeJson(p, o) { mkdirSync(path.dirname(p), { recursive: true }); writeFileSync(p, JSON.stringify(o, null, 1) + '\n'); }
function stem(f) { return path.basename(f).replace(/\.(session|recipe)\.json$/, ''); }

async function pool(items, jobs, fn) {
    const out = new Array(items.length);
    let next = 0;
    async function w(wid) {
        for (;;) { const i = next++; if (i >= items.length) return; out[i] = await fn(items[i], i, wid); }
    }
    await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, items.length)) }, (_, i) => w(i)));
    return out;
}

/* ---------------- corpus membership ---------------- */
function corpusEntries() {
    const out = [];
    if (existsSync(RECIPES)) {
        for (const f of readdirSync(RECIPES).filter((x) => x.endsWith('.recipe.json')).sort()) {
            const id = stem(f);
            out.push({ id, recipe: path.join(RECIPES, f), session: path.join(SESSIONS, `${id}.session.json`), src: 'corpus' });
        }
    }
    if (existsSync(PRIVATE)) {
        for (const f of readdirSync(PRIVATE).filter((x) => x.endsWith('.session.json')).sort()) {
            const id = stem(f);
            const r = path.join(PRIVATE, `${id}.recipe.json`);
            out.push({ id, recipe: existsSync(r) ? r : null, session: path.join(PRIVATE, f), src: 'private' });
        }
    }
    return out;
}

/* ---------------- gen / import / record ---------------- */
function latestBatch() {
    if (!existsSync(FUZZ_CACHE)) return null;
    const dirs = readdirSync(FUZZ_CACHE).filter((d) => d.startsWith('batch-')).sort();
    return dirs.length ? path.join(FUZZ_CACHE, dirs[dirs.length - 1]) : null;
}

function cmdImport(batchDir) {
    const dir = batchDir || latestBatch();
    if (!dir || !existsSync(dir)) { console.error('no batch dir'); process.exit(1); }
    mkdirSync(RECIPES, { recursive: true });
    mkdirSync(SESSIONS, { recursive: true });
    let n = 0, dup = 0;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.recipe.json'))) {
        const id = stem(f);
        const dst = path.join(RECIPES, f);
        if (existsSync(dst)) { dup++; continue; }
        const sess = path.join(dir, `${id}.session.json`);
        if (!existsSync(sess)) continue; // record failed
        copyFileSync(path.join(dir, f), dst);
        copyFileSync(sess, path.join(SESSIONS, `${id}.session.json`));
        n++;
    }
    console.log(`imported ${n} recipes from ${path.relative(ROOT, dir)} (${dup} already present)`);
}

async function cmdGen() {
    const n = Number(val('n', 240));
    const seed = Number(val('seed', Date.now() % 1e9));
    const jobs = Number(val('jobs', 6));
    const ne = Math.round(n * 0.5), nr = Math.round(n * 0.25), ni = n - ne - nr;
    const a = ['batch', '--mode', 'all', '--n-explore', String(ne), '--n-random', String(nr),
        '--n-independent', String(ni), '--tail-explore', val('tail-explore', '60'),
        '--tail-random', val('tail-random', '40'), '--tail-independent', val('tail-independent', '90'),
        '--jobs', String(jobs), '--seed', String(seed)];
    console.error(`fuzz-oracle ${a.join(' ')}`);
    const r = spawnSync(process.execPath, [FUZZ, ...a], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
    if (r.status) { console.error('batch failed'); process.exit(r.status); }
    cmdImport(latestBatch());
}

/* ---------------- tour: debug-mode level-teleport descents ----------------
   Ordinary tail-mutants stay on Dlvl 1–4, so they never reach the special
   levels a held-out tour walks into (bigrm 10–12, rogue 15–18, medusa
   21–24, castle). Debug-mode ^V<n> — the idiom the public seed4500 /
   seed0360 tours use — generates those levels on the C recorder, and a
   level the port cannot render diverges at generation. */
const TOUR_ROLES = [
    ['Touristo', 'Tourist', 'human', 'male', 'neutral'], ['Astrid', 'Valkyrie', 'human', 'female', 'neutral'],
    ['Musashi', 'Samurai', 'human', 'male', 'lawful'], ['Grok', 'Caveman', 'human', 'male', 'neutral'],
    ['merlin', 'Wizard', 'elf', 'male', 'chaotic'], ['robin', 'Rogue', 'human', 'male', 'chaotic'],
    ['Caspar', 'Priest', 'human', 'male', 'lawful'], ['Florian', 'Knight', 'human', 'male', 'lawful'],
    ['ricky', 'Ranger', 'human', 'female', 'chaotic'], ['Kira', 'Monk', 'human', 'female', 'neutral'],
    ['Indiana', 'Archeologist', 'human', 'male', 'lawful'], ['Conan', 'Barbarian', 'human', 'male', 'neutral'],
    ['Hippocrates', 'Healer', 'human', 'male', 'neutral'],
];
const TOUR_SCHEDULES = [[3, 6, 10, 11, 12], [5, 8, 15, 17, 22], [9, 13, 21, 23, 24], [2, 7, 16, 25, 27], [4, 11, 12, 19, 26]];
function mulberry32(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function cmdGenTour() {
    const n = Number(val('n', 26));
    const base = Number(val('seed', 70000));
    mkdirSync(RECIPES, { recursive: true });
    let made = 0;
    for (let i = 0; i < n; i++) {
        const [name, role, race, gender, align] = TOUR_ROLES[i % TOUR_ROLES.length];
        const sched = TOUR_SCHEDULES[Math.floor(i / TOUR_ROLES.length) % TOUR_SCHEDULES.length];
        const seed = base + i;
        const rng = mulberry32(seed);
        const walk = () => Array.from({ length: 6 }, () => 'hjklyubn.s:'[Math.floor(rng() * 11)]).join('');
        const moves = sched.map((d) => `\x16${d}\n${walk()}`).join('') + ':';
        const nethackrc = `OPTIONS=name:${name},role:${role},race:${race},gender:${gender},align:${align}\nOPTIONS=!legacy,!splash_screen,!tutorial\nOPTIONS=suppress_alert:3.4.3\nOPTIONS=symset:DECgraphics\nOPTIONS=playmode:debug\n`;
        const id = `tour-${role}-${seed}-d${sched.join('-')}`;
        const dst = path.join(RECIPES, `${id}.recipe.json`);
        if (existsSync(dst)) continue;
        writeJson(dst, { version: 5, timezone: PIN_TZ, fuzz: { mode: 'tour', role, dlvls: sched, prefixMoves: '', suffix: moves },
            segments: [{ seed, datetime: '20000110090000', timezone: PIN_TZ, nethackrc, moves }] });
        made++;
    }
    console.log(`tour recipes written: ${made} (record them with: node scripts/hidden-proxy.mjs record)`);
}

function prepareInstalls(jobs) {
    rmSync(WORKER_ROOT, { recursive: true, force: true });
    mkdirSync(WORKER_ROOT, { recursive: true });
    const out = [];
    for (let i = 0; i < jobs; i++) {
        const d = path.join(WORKER_ROOT, `w${i}`);
        cpSync(DEFAULT_INSTALL, d, { recursive: true });
        out.push({ installDir: d, binary: path.join(d, 'nethack') });
    }
    return out;
}

function recordOne(recipe, session, inst) {
    return new Promise((resolve) => {
        const child = spawn(process.execPath, [RECORD, recipe, session], {
            env: { ...process.env, NETHACK_INSTALL: inst.installDir, NETHACK_BINARY: inst.binary, RERECORD_TZ: PIN_TZ },
            stdio: ['ignore', 'ignore', 'pipe'],
        });
        let err = '';
        child.stderr.on('data', (b) => { err += b; });
        child.on('close', (code) => resolve({ ok: code === 0, err }));
    });
}

async function cmdRecord() {
    const jobs = Number(val('jobs', 6));
    const todo = corpusEntries().filter((e) => e.src === 'corpus' && !existsSync(e.session));
    if (!todo.length) { console.log('all corpus sessions present'); return; }
    mkdirSync(SESSIONS, { recursive: true });
    const installs = prepareInstalls(jobs);
    try {
        const res = await pool(todo, jobs, (e, _i, wid) => recordOne(e.recipe, e.session, installs[wid]));
        const ok = res.filter((r) => r.ok).length;
        console.log(`recorded ${ok}/${todo.length}`);
        res.forEach((r, i) => { if (!r.ok) console.error(`  FAIL ${todo[i].id}: ${r.err.trim().split('\n').pop()}`); });
    } finally {
        rmSync(WORKER_ROOT, { recursive: true, force: true });
    }
}

/* ---------------- score ---------------- */
function runWorker(session) {
    return new Promise((resolve) => {
        const child = spawn(process.execPath, [WORKER, session], {
            cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'],
        });
        let out = '', err = '';
        child.stdout.on('data', (b) => { out += b; });
        child.stderr.on('data', (b) => { err += b; });
        const t = setTimeout(() => child.kill('SIGKILL'), Number(process.env.HIDDEN_TIMEOUT_MS || 120000));
        child.on('close', () => {
            clearTimeout(t);
            try { resolve(JSON.parse(out.trim().split('\n').pop())); }
            catch { resolve({ session: path.basename(session), passed: false, error: `worker: ${(err || out).trim().split('\n').pop()}` }); }
        });
    });
}

function loadScores() { return existsSync(SCORES) ? readJson(SCORES) : { rows: {} }; }

function gitHead() {
    const r = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
    return (r.stdout || '').trim();
}

async function cmdScore() {
    const jobs = Number(val('jobs', 6));
    let entries = corpusEntries().filter((e) => existsSync(e.session));
    const prev = loadScores();
    const ids = val('ids', null);
    const owner = val('owner', null);
    if (ids) { const set = new Set(ids.split(',')); entries = entries.filter((e) => set.has(e.id)); }
    if (owner) entries = entries.filter((e) => prev.rows[e.id]?.owner === owner);
    if (!entries.length) { console.log('nothing to score'); return; }
    const t0 = Date.now();
    const res = await pool(entries, jobs, async (e) => ({ ...(await runWorker(e.session)), id: e.id, src: e.src }));
    const rows = ids || owner ? prev.rows : {};
    for (const r of res) rows[r.id] = r;
    writeJson(SCORES, { commit: gitHead(), at: new Date().toISOString(), rows });
    writeScoreboard(rows);
    console.log(`scored ${res.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    printStatus(rows);
}

function writeScoreboard(rows) {
    const board = {};
    for (const [id, r] of Object.entries(rows)) {
        board[id] = {
            src: r.src, passed: !!r.passed, rngM: r.rngM, rngT: r.rngT, scrM: r.scrM, scrT: r.scrT,
            kind: r.kind, step: r.step, steps: r.steps, owner: r.owner,
            loc: r.ownerFile ? `${r.ownerFile}:${r.ownerLine}` : null,
            jsOwner: r.jsOwner, cTopline: r.cTopline, jsTopline: r.jsTopline,
            error: r.error ? String(r.error).slice(0, 160) : null,
        };
    }
    writeJson(SCOREBOARD, { commit: gitHead(), at: new Date().toISOString(), sessions: board });
}

/* ---------------- aggregation ---------------- */
function aggregate(rows) {
    const by = new Map();
    const list = Object.values(rows);
    for (const r of list) {
        if (r.passed) continue;
        let key = r.owner;
        if (!key) {
            if (r.error) {
                const m = /\/js\/([\w./-]+):(\d+)/.exec(r.error);
                key = m ? `js-throw ${m[1]}:${m[2]}` : 'js-throw';
            } else key = `unattributed:${(r.cTopline || '').slice(0, 40)}`;
        }
        const a = by.get(key) || { owner: key, file: r.ownerFile, line: r.ownerLine, sessions: [], blockedRng: 0, blockedScr: 0, kinds: {}, examples: [] };
        a.sessions.push(r.id);
        a.blockedRng += r.blockedRng || 0;
        a.blockedScr += r.blockedScr || 0;
        a.kinds[r.kind || 'error'] = (a.kinds[r.kind || 'error'] || 0) + 1;
        if (a.examples.length < 3) a.examples.push({ id: r.id, step: r.step, c: r.cTopline, js: r.jsTopline, cEntry: r.cEntry, jsEntry: r.jsEntry, jsOwner: r.jsOwner });
        by.set(key, a);
    }
    const out = [...by.values()];
    out.sort((a, b) => b.sessions.length - a.sessions.length || b.blockedRng - a.blockedRng);
    return out;
}

function printStatus(rows) {
    const list = Object.values(rows);
    const n = list.length, pass = list.filter((r) => r.passed).length;
    const rngM = list.reduce((a, r) => a + (r.rngM || 0), 0), rngT = list.reduce((a, r) => a + (r.rngT || 0), 0);
    const scrM = list.reduce((a, r) => a + (r.scrM || 0), 0), scrT = list.reduce((a, r) => a + (r.scrT || 0), 0);
    console.log(`hidden-proxy: ${pass}/${n} PASS (${(100 * pass / Math.max(n, 1)).toFixed(1)}%)  RNG ${rngM}/${rngT} (${(100 * rngM / Math.max(rngT, 1)).toFixed(2)}%)  screens ${scrM}/${scrT} (${(100 * scrM / Math.max(scrT, 1)).toFixed(1)}%)`);
    const agg = aggregate(rows);
    const env = agg.filter((a) => a.owner.startsWith('env:')).reduce((s, a) => s + a.sessions.length, 0);
    const real = n - env;
    console.log(`excluding ${env} env-only sessions (recording path on screen): ${pass}/${real} PASS (${(100 * pass / Math.max(real, 1)).toFixed(1)}%)`);
    console.log(`blocking owners: ${agg.length}`);
    for (const a of agg.slice(0, 15)) {
        const ex = a.examples[0] || {};
        console.log(`  ${String(a.sessions.length).padStart(3)}x ${a.owner.padEnd(26)} ${(a.file ? a.file + ':' + a.line : '').padEnd(18)} rng-lost ${String(a.blockedRng).padStart(6)}  e.g. C«${(ex.c || '').slice(0, 48)}» J«${(ex.js || '').slice(0, 48)}»`);
    }
}

function cmdStatus() { printStatus(loadScores().rows); }

function cmdQueue() {
    const limit = Number(val('limit', 12));
    const rows = loadScores().rows;
    const agg = aggregate(rows).filter((a) => !a.owner.startsWith('unattributed') && !a.owner.startsWith('env:'));
    const total = Object.keys(rows).length;
    for (const a of agg.slice(0, limit)) {
        const ex = a.examples[0] || {};
        const file = a.file || (a.owner.startsWith('js-throw') ? 'js' : '?');
        const what = ex.cEntry
            ? `C draws \`${String(ex.cEntry).replace(/\s*@.*$/, '')}\` in ${a.owner}, JS ${ex.jsEntry ? '`' + String(ex.jsEntry).replace(/\s*@.*$/, '') + '` from ' + (ex.jsOwner || '?') : 'draws nothing'}`
            : `C «${(ex.c || '').slice(0, 60)}» vs JS «${(ex.js || '').slice(0, 60)}»`;
        console.log(`- [ ] \`${file}\` ${a.owner} — blocks ${a.sessions.length}/${total} corpus sessions (first at step ${ex.step}): ${what}. Probe: \`node scripts/hidden-proxy.mjs verify ${a.owner}\` (${a.examples.map((e) => e.id).join(', ')}).`);
    }
}

/* The committed scoreboard at a git rev: the rows the queue row and the
   brief were built from. `verify` measures movement against THIS, not
   against the working scoreboard, so a second verify in the same iteration
   re-runs the same sessions. (A verify rewrites the working rows: a PASS row
   is no longer "blocked on fn", and a later edit that breaks it again went
   unnoticed — D-1831 shipped 12 such regressions behind a vacuous
   "no corpus session is blocked" line.) */
function baselineRows(rev) {
    const r = spawnSync('git', ['show', `${rev}:hidden-corpus/scoreboard.json`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
    if (r.status !== 0 || !r.stdout) return null;
    try {
        const j = JSON.parse(r.stdout);
        const rows = {};
        for (const [id, row] of Object.entries(j.sessions || {})) rows[id] = { id, ...row };
        return { rev, commit: j.commit, at: j.at, rows };
    } catch { return null; }
}

async function cmdVerify(fn) {
    if (!fn) { console.error('usage: verify <C function> [--base <git-rev>|working] [--jobs N]'); process.exit(2); }
    const baseRev = val('base', 'HEAD');
    const base = baseRev === 'working' ? null : baselineRows(baseRev);
    if (baseRev !== 'working' && !base) console.log(`verify ${fn}: no committed scoreboard at ${baseRev}; using the working scores as baseline`);
    const prev = loadScores();
    const blockedIn = (rows) => Object.values(rows).filter((r) => r.owner === fn).map((r) => r.id);
    const baseIds = base ? blockedIn(base.rows) : [];
    const workIds = blockedIn(prev.rows);
    const ids = [...new Set([...baseIds, ...workIds])];
    console.log(`verify ${fn}: baseline ${base ? `${baseRev} (scoreboard at ${base.commit}, ${base.at})` : 'working scores'} — ${ids.length} session(s) blocked on it (${baseIds.length} at baseline, ${workIds.length} in the working scoreboard)`);
    if (!ids.length) {
        console.log(`verify ${fn}: no corpus session is blocked on it at ${base ? baseRev : 'working'} — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates and say so in the D-log.`);
        return;
    }
    const entries = corpusEntries().filter((e) => ids.includes(e.id) && existsSync(e.session));
    const missing = ids.filter((id) => !entries.some((e) => e.id === id));
    if (missing.length) console.log(`  (${missing.length} blocked session(s) have no cached recording — \`node scripts/hidden-proxy.mjs record\`: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? ', …' : ''})`);
    const res = await pool(entries, Number(val('jobs', 6)), async (e) => ({ ...(await runWorker(e.session)), id: e.id, src: e.src }));
    let passed = 0, moved = 0, sameStep = 0, stillFn = 0, stuck = 0, worse = 0;
    for (const r of res) {
        const before = (base && base.rows[r.id]) || prev.rows[r.id] || {};
        prev.rows[r.id] = r;
        let verdict;
        if (r.passed) { verdict = 'PASS'; passed++; }
        else if (before.passed) { verdict = `WORSE: was PASS at baseline, now ${r.owner || 'js-throw'} at step ${r.step}`; worse++; }
        else if ((r.step ?? -1) > (before.step ?? -1) || (r.owner !== fn && (r.step ?? 0) >= (before.step ?? 0))) {
            const same = (r.step ?? -1) === (before.step ?? -2);
            const later = r.owner === fn;
            verdict = `moved → ${r.owner || 'js-throw'} at step ${r.step} (was ${before.step}${same ? '; same step: re-attributed, read the row diff' : later ? `; still ${fn}, ${r.step - before.step} step(s) later` : ''})`;
            moved++; if (same) sameStep++; if (later) stillFn++;
        }
        else if ((r.step ?? 0) < (before.step ?? 0) || (r.rngM || 0) < (before.rngM || 0)) { verdict = `WORSE: now ${r.owner} at step ${r.step} (was ${before.step})`; worse++; }
        else { verdict = `still ${fn} at step ${r.step}: C«${r.cTopline}» J«${r.jsTopline}»`; stuck++; }
        console.log(`  ${r.id}: ${verdict}`);
    }
    writeJson(SCORES, { commit: gitHead(), at: new Date().toISOString(), rows: prev.rows });
    writeScoreboard(prev.rows);
    const verdict = worse ? 'REGRESSION' : stuck && !passed && !moved ? 'NO MOVEMENT' : 'PROGRESS';
    const notes = [sameStep ? `${sameStep} re-attributed at the same step` : '', stillFn ? `${stillFn} still ${fn} at a later step` : ''].filter(Boolean);
    console.log(`verify ${fn}: ${passed} PASS, ${moved} moved past${notes.length ? ` (${notes.join('; ')})` : ''}, ${stuck} unchanged, ${worse} worse → ${verdict}`);
    if (worse) process.exit(1);
}

function cmdShow(id) {
    const r = loadScores().rows[id];
    if (!r) { console.error('unknown session id'); process.exit(1); }
    console.log(JSON.stringify(r, null, 1));
    const e = corpusEntries().find((x) => x.id === id);
    if (e?.recipe) {
        const rc = readJson(e.recipe);
        console.log(`recipe: ${path.relative(ROOT, e.recipe)}\nmoves: ${JSON.stringify(rc.segments.map((s) => s.moves).join(' | '))}`);
        console.log(`replay: node frozen/ps_test_runner.mjs ${path.relative(ROOT, e.session)}`);
    }
}

(async () => {
    switch (cmd) {
    case 'gen': if (val('mode', '') === 'tour') cmdGenTour(); else await cmdGen(); break;
    case 'import': cmdImport(rest[0] && !rest[0].startsWith('--') ? path.resolve(rest[0]) : null); break;
    case 'record': await cmdRecord(); break;
    case 'score': await cmdScore(); break;
    case 'queue': cmdQueue(); break;
    case 'verify': await cmdVerify(rest[0]); break;
    case 'show': cmdShow(rest[0]); break;
    case 'status': cmdStatus(); break;
    default:
        console.error('usage: hidden-proxy.mjs gen|import|record|score|queue|verify <fn>|show <id>|status');
        process.exit(2);
    }
})();
