#!/usr/bin/env node
/**
 * Map C PRNG indices to recorder call sites (file:line from NETHACK_RNGLOG).
 * Public sessions strip "@ caller" — re-record with scripts/record-session.mjs --save-rng-log.
 *
 * Usage:
 *   node tools/diag_c_rng_callers.mjs <rng.log> <start> [end]
 *   node tools/diag_c_rng_callers.mjs --record <session.json> <start> [end]
 *   node tools/diag_c_rng_callers.mjs --session <session.json> <start> [end] --rng-log <rng.log>
 */
import { readFileSync } from 'fs';
import { mkdtemp, rm } from 'fs/promises';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { tmpdir } from 'os';
import { parseC_rngLogText } from './parse_c_rng_log.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function usage() {
    console.error(`Usage:
  node tools/diag_c_rng_callers.mjs <rng.log> <start> [end]
  node tools/diag_c_rng_callers.mjs --record <session.json> <start> [end]
  node tools/diag_c_rng_callers.mjs --session <session.json> <start> [end] --rng-log <rng.log>

Record (requires nethack-c recorder build):
  node scripts/record-session.mjs --save-rng-log /tmp/foo.rng.log sessions/<session>.session.json /tmp/out.json
  node tools/diag_c_rng_callers.mjs /tmp/foo.rng.log 3100 3145`);
    process.exit(2);
}

function formatCaller(e) {
    if (!e.file) return '(no caller — build recorder with rng-log patches)';
    const loc = `${e.file}:${e.line}`;
    return e.callerFunc ? `${e.callerFunc} (${loc})` : loc;
}

function printWindow(entries, lo, hi) {
    const rng = entries.filter((e) => e.kind === 'rng');
    for (let i = lo; i <= hi; i++) {
        const e = rng.find((x) => x.index === i);
        if (!e) {
            console.log(`  ${i}: (missing in log)`);
            continue;
        }
        const draw = `${e.fn}(${e.args})=${e.result}`;
        console.log(`  ${i}: ${draw}  @ ${formatCaller(e)}`);
    }
}

async function loadStepRanges(sessionPath) {
    const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
    const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
    const segments = normalizeSession(session).segments;
    const ranges = [];
    let i = 0;
    for (const seg of segments) {
        for (const st of seg.steps || []) {
            const n = (st.rng || []).filter(
                (x) => typeof x === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(x),
            ).length;
            const start = i;
            i += n;
            const key = st.key ?? st.input ?? null;
            ranges.push({
                key: key == null ? '(start)' : (typeof key === 'string' ? JSON.stringify(key) : String(key)),
                rngStart: start,
                rngEnd: i - 1,
            });
        }
    }
    return ranges;
}

function stepForIndex(ranges, idx) {
    for (const r of ranges) {
        if (idx >= r.rngStart && idx <= r.rngEnd) return r;
    }
    return null;
}

async function recordToRngLog(sessionPath, outLog) {
    const script = join(ROOT, 'scripts/record-session.mjs');
    const nullOut = join(tmpdir(), `nh-diag-${Date.now()}.json`);
    await new Promise((resolve, reject) => {
        const child = spawn(
            process.execPath,
            [script, '--save-rng-log', outLog, sessionPath, nullOut],
            { cwd: ROOT, stdio: ['ignore', 'inherit', 'inherit'] },
        );
        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`record-session exited ${code}`));
        });
    });
    await rm(nullOut, { force: true }).catch(() => {});
}

async function main() {
    const argv = process.argv.slice(2);
    let mode = 'file';
    let sessionPath = null;
    let rngLogPath = null;
    let pos = [];

    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--record') { mode = 'record'; continue; }
        if (a === '--session') {
            mode = 'session';
            sessionPath = resolve(argv[++i]);
            continue;
        }
        if (a === '--rng-log') {
            rngLogPath = resolve(argv[++i]);
            continue;
        }
        if (a === '-h' || a === '--help') usage();
        pos.push(a);
    }

    if (mode === 'record') {
        if (pos.length < 2) usage();
        sessionPath = resolve(pos[0]);
        const tmp = await mkdtemp(join(tmpdir(), 'nh-crng-'));
        rngLogPath = join(tmp, 'rng.log');
        try {
            console.error(`[record] ${sessionPath} → ${rngLogPath}`);
            await recordToRngLog(sessionPath, rngLogPath);
        } catch (err) {
            await rm(tmp, { recursive: true, force: true }).catch(() => {});
            throw err;
        }
    } else if (mode === 'session') {
        if (!rngLogPath || pos.length < 2) usage();
        sessionPath = sessionPath || resolve(pos[0]);
    }

    let lo;
    let hi;
    if (mode === 'file') {
        if (pos.length < 2) usage();
        rngLogPath = resolve(pos[0]);
        lo = parseInt(pos[1], 10);
        hi = parseInt(pos[2] ?? pos[1], 10);
    } else if (mode === 'record') {
        if (pos.length < 2) usage();
        lo = parseInt(pos[1], 10);
        hi = parseInt(pos[2] ?? pos[1], 10);
    } else {
        if (pos.length < 1) usage();
        lo = parseInt(pos[0], 10);
        hi = parseInt(pos[1] ?? pos[0], 10);
    }
    if (Number.isNaN(lo)) usage();

    const text = readFileSync(rngLogPath, 'utf8');
    const entries = parseC_rngLogText(text);
    const total = entries.filter((e) => e.kind === 'rng').length;
    console.log(`C rng log: ${rngLogPath} (${total} draws)`);

    if (sessionPath) {
        const ranges = await loadStepRanges(sessionPath);
        const st = stepForIndex(ranges, lo);
        if (st) {
            console.log(`session step @ ${lo}: key ${st.key} (rng ${st.rngStart}–${st.rngEnd})`);
        }
    }

    console.log(`callers ${lo}–${hi}:`);
    printWindow(entries, lo, hi);

    if (mode === 'record') {
        const tmp = dirname(rngLogPath);
        console.error(`[hint] reuse: node tools/diag_c_rng_callers.mjs ${rngLogPath} ${lo} ${hi}`);
        await rm(tmp, { recursive: true, force: true }).catch(() => {});
    }
}

main().catch((err) => {
    console.error('[fail]', err.message || err);
    process.exit(1);
});
