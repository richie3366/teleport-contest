#!/usr/bin/env node
/**
 * Call-heat: replay recorded sessions on the instrumented C recorder
 * (NH_CALLCOUNT) and rank functions by how often they actually run.
 *
 *   node scripts/callheat.mjs replay [--jobs N] [--limit N] [--check]
 *   node scripts/callheat.mjs aggregate
 *
 * The binary is .cache/callheat/nethack (x86_64, -finstrument-functions).
 * Counts land in .cache/callheat/counts/. The install tree is copied per
 * worker so save/bones files do not collide. --check diffs the RNG log
 * against the session (the counter must not change the game).
 */
import { spawn, spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    MarkerParser, clearStaleState, parseNethackrcName, parseRngLines,
} from './record-session.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, '.cache', 'callheat');
const BIN = process.env.NH_CALLHEAT_BIN || path.join(CACHE, 'nethack');
const INSTALL_SRC = path.join(
    ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const COUNTS = path.join(CACHE, 'counts');
const PIN_TZ = 'America/New_York';

const args = process.argv.slice(2);
const cmd = args[0];
const rest = args.slice(1);
const val = (k, d) => {
    const i = rest.indexOf(`--${k}`);
    return i >= 0 && rest[i + 1] != null ? rest[i + 1] : d;
};
const flag = (k) => rest.includes(`--${k}`);

async function listSessions() {
    const out = [];
    const addDir = async (dir, source) => {
        let names = [];
        try { names = await fs.readdir(dir); } catch { return; }
        for (const n of names) {
            if (!n.endsWith('.session.json')) continue;
            out.push({ id: n.replace(/\.session\.json$/, ''), source, file: path.join(dir, n) });
        }
    };
    await addDir(path.join(ROOT, '.cache', 'hidden', 'sessions'), 'hidden');
    await addDir(path.join(ROOT, 'sessions'), 'public');
    const seen = new Set();
    return out.filter((s) => {
        if (seen.has(s.id)) return false;
        seen.add(s.id);
        return true;
    }).sort((a, b) => a.id.localeCompare(b.id));
}

function movesOf(seg) {
    if (seg.moves) return seg.moves;
    if (!Array.isArray(seg.steps)) return '';
    let s = '';
    for (const st of seg.steps) if (st.key != null) s += st.key;
    return s;
}

async function playSegment({ seg, isFirst, binary, installDir, homeDir, rngLogPath, countPrefix, tz, keepRng }) {
    await fs.mkdir(homeDir, { recursive: true });
    await fs.writeFile(path.join(homeDir, '.nethackrc'), seg.nethackrc || '');
    await fs.writeFile(rngLogPath, '');
    await clearStaleState(installDir, { wipeSave: isFirst });
    return new Promise((resolve, reject) => {
        const player = parseNethackrcName(seg.nethackrc) ?? '';
        const moves = movesOf(seg);
        const expected = moves.length + 1;
        const env = {
            ...process.env,
            NETHACKDIR: installDir,
            HACKDIR: installDir,
            HOME: homeDir,
            TERM: 'xterm-256color',
            TZ: tz || seg.timezone || PIN_TZ,
            NETHACK_NO_DELAY: '1',
            NETHACK_SEED: String(seg.seed ?? 0),
            NETHACK_FIXED_DATETIME: seg.datetime || '20000110090000',
            NOMUX_MARKERS: '1',
            NETHACK_RAW_KEYS: '1',
            NH_CALLCOUNT: countPrefix,
        };
        if (keepRng) env.NETHACK_RNGLOG = rngLogPath;
        else delete env.NETHACK_RNGLOG;
        const child = spawn(binary, ['-u', player], { env, stdio: ['pipe', 'pipe', 'pipe'] });
        let stderr = '';
        child.stderr.on('data', (b) => { stderr += b.toString(); if (stderr.length > 4000) stderr = stderr.slice(-4000); });
        child.stdin.on('error', () => {});
        const rng = [];
        let lastRng = 0;
        let nextKey = 0;
        let steps = 0;
        let settled = false;
        let timer = null;
        const arm = (ms, why) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => finish(new Error(`timeout ${why} after ${ms}ms`)), ms);
        };
        let closed = false;
        const finish = (err) => {
            if (settled) return;
            settled = true;
            if (timer) clearTimeout(timer);
            parser.stop();
            const done = () => {
                if (err) reject(Object.assign(err, { stderr, steps, rng }));
                else resolve({ steps, rng, stderr });
            };
            if (closed) { done(); return; }
            try { child.kill('SIGTERM'); } catch {}
            const kill = setTimeout(() => { try { child.kill('SIGKILL'); } catch {} }, 2000);
            kill.unref();
            child.once('close', done);
        };
        const readRng = async () => {
            try {
                const fh = await fs.open(rngLogPath, 'r');
                try {
                    const st = await fh.stat();
                    if (st.size > lastRng) {
                        const buf = Buffer.alloc(st.size - lastRng);
                        await fh.read(buf, 0, buf.length, lastRng);
                        lastRng = st.size;
                        rng.push(...parseRngLines(buf.toString('utf8')));
                    }
                } finally { await fh.close(); }
            } catch {}
        };
        const onMarker = async (m) => {
            if (m.kind !== 'input') return;
            steps++;
            if (keepRng) await readRng();
            if (steps >= expected) { finish(null); return; }
            if (nextKey < moves.length) {
                let k = moves[nextKey++];
                if (k === '\r') k = '\n';
                child.stdin.write(Buffer.from(k, 'utf8'));
                arm(180000, `key ${nextKey}/${moves.length}`);
            } else {
                try { child.stdin.end(); } catch {}
                arm(30000, 'exit');
            }
        };
        let chain = Promise.resolve();
        const parser = new MarkerParser((m) => {
            chain = chain.then(() => onMarker(m)).catch((e) => finish(e));
        });
        child.stdout.on('data', (c) => { try { parser.push(c); } catch (e) { finish(e); } });
        child.on('error', (e) => finish(e));
        child.on('close', (code, signal) => {
            closed = true;
            if (settled) return;
            if (signal === 'SIGTERM' || signal === 'SIGKILL') return;
            chain.then(async () => { if (keepRng) await readRng(); finish(null); }).catch((e) => finish(e));
        });
        arm(180000, 'first marker');
    });
}

async function replayOne(session, inst, check) {
    const data = JSON.parse(await fs.readFile(session.file, 'utf8'));
    if (data.version !== 5 || !Array.isArray(data.segments)) {
        throw new Error('not a v5 session');
    }
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'nhheat-'));
    const countPrefix = path.join(COUNTS, session.id);
    await fs.mkdir(COUNTS, { recursive: true });
    // Drop a previous run's pid files for this id.
    const prev = await fs.readdir(COUNTS).catch(() => []);
    await Promise.all(prev.filter((n) => n.startsWith(session.id + '.')).map((n) => fs.unlink(path.join(COUNTS, n)).catch(() => {})));
    const rng = [];
    let steps = 0;
    try {
        for (let i = 0; i < data.segments.length; i++) {
            const seg = data.segments[i];
            const r = await playSegment({
                seg,
                isFirst: i === 0,
                binary: BIN,
                installDir: inst,
                homeDir: path.join(tmp, 'home'),
                rngLogPath: path.join(tmp, 'rng.log'),
                countPrefix,
                tz: seg.timezone || PIN_TZ,
                keepRng: check,
            });
            steps += r.steps;
            rng.push(...r.rng);
            if (i + 1 < data.segments.length) {
                await fs.writeFile(path.join(tmp, 'rng.log'), '');
            }
        }
    } finally {
        await fs.rm(tmp, { recursive: true, force: true });
    }
    let rngMismatch = 0;
    if (check) {
        const want = [];
        for (const seg of data.segments) {
            for (const st of seg.steps || []) if (Array.isArray(st.rng)) want.push(...st.rng);
        }
        const n = Math.max(want.length, rng.length);
        for (let i = 0; i < n; i++) if (want[i] !== rng[i]) { rngMismatch++; if (rngMismatch === 1) {
            /* first mismatch kept on the result via fields below */
        } }
        return { id: session.id, steps, rngMismatch, want: want.length, got: rng.length,
            firstWant: want.find((w, i) => w !== rng[i]),
            firstGot: rng.find((g, i) => g !== want[i]) };
    }
    return { id: session.id, steps, rngMismatch: null };
}

async function pool(items, jobs, fn) {
    const out = new Array(items.length);
    let next = 0;
    async function worker(wid) {
        for (;;) {
            const i = next++;
            if (i >= items.length) return;
            out[i] = await fn(items[i], wid);
        }
    }
    await Promise.all(Array.from({ length: Math.min(jobs, items.length) }, (_, i) => worker(i)));
    return out;
}

async function cmdReplay() {
    try { await fs.access(BIN); } catch { throw new Error(`missing instrumented binary: ${BIN}`); }
    const jobs = Number(val('jobs', 8));
    const limit = Number(val('limit', 0));
    const check = flag('check');
    let sessions = await listSessions();
    if (limit > 0) sessions = sessions.slice(0, limit);
    const only = val('id', '');
    if (only) sessions = sessions.filter((s) => s.id === only || s.id.includes(only));
    console.log(`replay ${sessions.length} sessions jobs=${jobs} check=${check}`);
    const root = path.join(os.tmpdir(), 'nhheat-inst');
    await fs.rm(root, { recursive: true, force: true });
    await fs.mkdir(root, { recursive: true });
    const installs = [];
    for (let i = 0; i < jobs; i++) {
        const d = path.join(root, `w${i}`);
        await fs.cp(INSTALL_SRC, d, { recursive: true });
        installs.push(d);
    }
    const t0 = Date.now();
    let done = 0;
    let failed = 0;
    const failures = [];
    try {
        await pool(sessions, jobs, async (s, wid) => {
            const t = Date.now();
            try {
                const r = await replayOne(s, installs[wid], check);
                done++;
                const extra = check ? ` rngΔ=${r.rngMismatch}/${r.want}` : '';
                if (check && r.rngMismatch) {
                    console.log(`RNG ${r.id} mismatch ${r.rngMismatch} first want=${r.firstWant} got=${r.firstGot}`);
                }
                if (done % 25 === 0 || done <= 3 || sessions.length <= 5) {
                    console.log(`[${done}/${sessions.length}] ${r.id} steps=${r.steps}${extra} ${(Date.now() - t)}ms`);
                }
            } catch (e) {
                failed++;
                done++;
                failures.push({ id: s.id, err: String(e.message || e).split('\n')[0] });
                console.error(`FAIL ${s.id}: ${String(e.message || e).split('\n')[0]}`);
            }
        });
    } finally {
        await fs.rm(root, { recursive: true, force: true });
    }
    const sec = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`done ${done - failed}/${sessions.length} failed=${failed} in ${sec}s`);
    if (failures.length) {
        await fs.writeFile(path.join(CACHE, 'failures.json'), JSON.stringify(failures, null, 1));
        for (const f of failures.slice(0, 20)) console.error(`  ${f.id}: ${f.err}`);
    }
}

function atosBatch(addrs) {
    const lines = [];
    const BATCH = 400;
    for (let i = 0; i < addrs.length; i += BATCH) {
        const chunk = addrs.slice(i, i + BATCH).map((a) => '0x' + a);
        const out = spawnSync('atos', ['-arch', 'x86_64', '-o', BIN, ...chunk], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
        if (out.status !== 0) throw new Error(out.stderr || `atos exit ${out.status}`);
        const got = out.stdout.split('\n').filter((l) => l.length);
        if (got.length !== chunk.length) {
            throw new Error(`atos returned ${got.length} lines for ${chunk.length} addresses`);
        }
        lines.push(...got);
    }
    return lines;
}

function parseAtos(line) {
    const m = /^(.*?) \(in [^)]+\) \((.+):(\d+)\)/.exec(line);
    if (!m) return { fn: '??', file: '??', line: 0 };
    const file = m[2].replace(/^.*\//, '');
    return { fn: m[1], file, line: Number(m[3]) };
}

function loadLedger() {
    const out = spawnSync(process.execPath, [
        path.join(ROOT, 'scripts', 'ledger.mjs'), 'sql',
        'select file, fn, status, c_code, cover from fn',
    ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    if (out.status !== 0) throw new Error(out.stderr || 'ledger sql failed');
    const lines = out.stdout.split('\n').filter(Boolean);
    const head = lines.shift().split('\t');
    const idx = Object.fromEntries(head.map((h, i) => [h, i]));
    const map = new Map();
    for (const line of lines) {
        const c = line.split('\t');
        const file = c[idx.file];
        const fn = c[idx.fn];
        map.set(`${file}\t${fn}`, {
            status: c[idx.status] || 'unknown',
            c_code: Number(c[idx.c_code]) || 0,
            cover: c[idx.cover] || '',
        });
    }
    return map;
}

const OPEN = new Set(['unknown', 'absent', 'scaffold', 'partial']);

async function cmdAggregate() {
    const files = (await fs.readdir(COUNTS)).filter((n) => /\.\d+$/.test(n));
    const byAddr = new Map();
    const sessionsByAddr = new Map();
    let sessionsOk = new Set();
    let totalCalls = 0n;
    let dropped = 0n;
    for (const f of files) {
        const id = f.replace(/\.\d+$/, '');
        sessionsOk.add(id);
        const text = await fs.readFile(path.join(COUNTS, f), 'utf8');
        const seen = new Set();
        for (const line of text.split('\n')) {
            if (line.startsWith('# drop')) {
                dropped += BigInt('0x' + line.slice(7).trim());
                continue;
            }
            if (!line || line.startsWith('#')) continue;
            const sp = line.indexOf(' ');
            if (sp < 0) continue;
            const addr = line.slice(0, sp);
            const n = BigInt('0x' + line.slice(sp + 1));
            totalCalls += n;
            byAddr.set(addr, (byAddr.get(addr) || 0n) + n);
            if (!seen.has(addr)) {
                seen.add(addr);
                let set = sessionsByAddr.get(addr);
                if (!set) sessionsByAddr.set(addr, set = new Set());
                set.add(id);
            }
        }
    }
    console.log(`addresses ${byAddr.size} sessions ${sessionsOk.size} calls ${totalCalls} dropped ${dropped}`);
    const addrs = [...byAddr.keys()];
    const resolved = atosBatch(addrs);
    const ledger = loadLedger();
    const fnMap = new Map();
    let unresolved = 0;
    for (let i = 0; i < addrs.length; i++) {
        const sym = parseAtos(resolved[i]);
        if (sym.fn === '??') unresolved++;
        const calls = byAddr.get(addrs[i]);
        const sess = sessionsByAddr.get(addrs[i]);
        const key = `${sym.file}\t${sym.fn}`;
        let row = fnMap.get(key);
        if (!row) fnMap.set(key, row = { file: sym.file, fn: sym.fn, calls: 0n, sessions: new Set(), line: sym.line });
        row.calls += calls;
        if (sym.line && (!row.line || sym.line < row.line)) row.line = sym.line;
        for (const s of sess) row.sessions.add(s);
    }
    const rows = [...fnMap.values()].map((r) => {
        const led = ledger.get(`${r.file}\t${r.fn}`);
        return {
            file: r.file,
            fn: r.fn,
            line: r.line,
            calls: r.calls.toString(),
            sessions: r.sessions.size,
            status: led ? led.status : '',
            c_code: led ? led.c_code : 0,
            cover: led ? led.cover : '',
        };
    }).sort((a, b) => {
        const d = BigInt(b.calls) - BigInt(a.calls);
        return d < 0n ? -1 : d > 0n ? 1 : a.fn.localeCompare(b.fn);
    });
    const summary = {
        generatedAt: new Date().toISOString(),
        sessions: sessionsOk.size,
        addresses: byAddr.size,
        functions: rows.length,
        unresolved,
        totalCalls: totalCalls.toString(),
        dropped: dropped.toString(),
        rows,
    };
    await fs.mkdir(CACHE, { recursive: true });
    await fs.writeFile(path.join(CACHE, 'functions.json'), JSON.stringify(summary));
    const open = rows.filter((r) => OPEN.has(r.status));
    console.log(`wrote ${rows.length} functions (${open.length} open) unresolved=${unresolved} → .cache/callheat/functions.json`);
    console.log('--- hottest ---');
    for (const r of rows.slice(0, 20)) {
        console.log(`${r.calls.padStart(14)}  ${String(r.sessions).padStart(4)}  ${(r.status || '—').padEnd(10)}  ${r.file}  ${r.fn}`);
    }
    console.log('--- hottest still open ---');
    for (const r of open.slice(0, 20)) {
        console.log(`${r.calls.padStart(14)}  ${String(r.sessions).padStart(4)}  ${r.status.padEnd(10)}  ${r.file}:${r.line}  ${r.fn}`);
    }
}

if (cmd === 'replay') {
    cmdReplay().catch((e) => { console.error(e); process.exit(1); });
} else if (cmd === 'aggregate') {
    cmdAggregate().catch((e) => { console.error(e); process.exit(1); });
} else {
    console.error('usage: callheat.mjs replay [--jobs N] [--limit N] [--id SUB] [--check] | aggregate');
    process.exit(2);
}
