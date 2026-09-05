#!/usr/bin/env node
/**
 * geom-probe.mjs — measure C level geometry in ONE call.
 *
 *   node scripts/geom-probe.mjs <corpus-session-id | recipe.json> [--step N]
 *        [--keys <string>] [--js-root <dir>] [--x0 A --x1 B --y0 C --y1 D]
 *
 * Forks the recipe at step N (default: the step the committed scoreboard
 * blocks that session at, else the last step), appends a wizard-mode map
 * (`^F`, or --keys), records that on the pinned C recorder (~0.3 s),
 * replays the same keys in JS, then prints:
 *   - the level extends on both sides (mkmaze.c get_level_extends);
 *   - every map cell (rows 0–20) where the C and JS `^F` screens differ;
 *   - the mineralize-eligible cells (mklev.c:1501–1540 scan) present on
 *     one side only — the cells a gold/gem `rn2(1000)` count difference
 *     comes from;
 *   - the rows around the first differing cell, both sides.
 * A recipe without `playmode:debug` gets it appended so `^F` works; the
 * run is then a diagnostic game — compare C vs JS inside that run only.
 * Files land in .cache/probe/. Exit 0 when no cell differs.
 *
 * Why: when a level-wide scan (mineralize, bound_digging, wallification,
 * place_lregion …) owns an RNG first-diff, C only *noticed* a terrain
 * difference there; the count cannot say which cell or which writer.
 * #2262 spent 54 minutes and 362 calls without this measurement; the
 * C-wrong was a shop engraving cell (D-1849).
 *
 * --js-root <dir>: replay a scratch copy of the tree (bisects; the
 * pre-fix state) instead of the checkout.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const args = process.argv.slice(2);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] != null ? args[i + 1] : d; };
const target = args.find((a) => !a.startsWith('--') && a !== val('step') && a !== val('keys') && a !== val('js-root')
    && a !== val('x0') && a !== val('x1') && a !== val('y0') && a !== val('y1'));
if (!target) {
    console.error('usage: node scripts/geom-probe.mjs <corpus-session-id | recipe.json> [--step N] [--keys ^F] [--js-root dir]');
    process.exit(2);
}

const DEFAULT_INSTALL = path.join(ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const PROBE_INSTALL = '/tmp/nhhp-probe/w0'; /* nh_getenv drops HACKDIR > 128 chars */
const OUT = path.join(ROOT, '.cache', 'probe');
const COLNO = 80, ROWNO = 21;
const WALLS = new Set(['┌', '─', '┐', '│', '└', '┘', '├', '┤', '┬', '┴', '┼']);
const { decodeScreen, renderCell } = await import(pathToFileURL(path.join(ROOT, 'frozen', 'screen-decode.mjs')).href);

/* ---------- recipe ---------- */
let recipePath = target;
let id = path.basename(target).replace(/\.(recipe|session)\.json$/, '');
if (!existsSync(recipePath)) {
    const cands = [
        path.join(ROOT, 'hidden-corpus', 'recipes', `${target}.recipe.json`),
        path.join(ROOT, 'private-sessions', `${target}.recipe.json`),
    ];
    recipePath = cands.find(existsSync);
    if (!recipePath) { console.error(`no recipe for ${target} (looked in hidden-corpus/recipes, private-sessions)`); process.exit(2); }
    id = target;
}
const recipe = JSON.parse(readFileSync(recipePath, 'utf8'));
const seg = recipe.segments[0];
const moves = seg.moves || '';

let step = val('step', null);
if (step == null) {
    for (const p of [path.join(ROOT, 'hidden-corpus', 'scoreboard.json'), path.join(ROOT, '.cache', 'hidden', 'scores.json')]) {
        if (!existsSync(p)) continue;
        const j = JSON.parse(readFileSync(p, 'utf8'));
        const row = j.sessions?.[id] || j.rows?.[id];
        if (row && row.step != null && !row.passed) { step = row.step; console.log(`step ${step} from ${path.relative(ROOT, p)} (first divergence, owner ${row.owner})`); break; }
    }
}
if (step == null) step = moves.length;
step = Math.max(0, Math.min(Number(step), moves.length));
const keys = JSON.parse(`"${val('keys', '\\u0006')}"`); /* default ^F = wizard map */
const probeMoves = moves.slice(0, step) + keys;
let rc = seg.nethackrc || '';
let diagnosticGame = false;
if (!/playmode:debug/.test(rc)) { rc += (rc.endsWith('\n') || !rc ? '' : '\n') + 'OPTIONS=playmode:debug\n'; diagnosticGame = true; }

mkdirSync(OUT, { recursive: true });
const stem = path.join(OUT, `${id}-s${step}`);
const probeRecipe = { version: recipe.version || 5, timezone: recipe.timezone || 'America/New_York',
    segments: [{ ...seg, nethackrc: rc, moves: probeMoves }] };
delete probeRecipe.segments[0].steps;
writeFileSync(`${stem}.recipe.json`, JSON.stringify(probeRecipe, null, 1) + '\n');
const probeStep = step + keys.length;
console.log(`probe: ${id} keys ${JSON.stringify(moves.slice(0, step))} + ${JSON.stringify(keys)} → screen after step ${probeStep}${diagnosticGame ? '  [nethackrc += playmode:debug — diagnostic game; compare C vs JS inside this run only]' : ''}`);

/* ---------- C recording ---------- */
rmSync(PROBE_INSTALL, { recursive: true, force: true });
mkdirSync(path.dirname(PROBE_INSTALL), { recursive: true });
cpSync(DEFAULT_INSTALL, PROBE_INSTALL, { recursive: true });
const cOut = `${stem}.c.session.json`;
const rec = spawnSync(process.execPath, [path.join(SCRIPT_DIR, 'record-session.mjs'), `${stem}.recipe.json`, cOut], {
    cwd: ROOT, encoding: 'utf8',
    env: { ...process.env, NETHACK_INSTALL: PROBE_INSTALL, NETHACK_BINARY: path.join(PROBE_INSTALL, 'nethack'), RERECORD_TZ: recipe.timezone || 'America/New_York' },
});
if (rec.status !== 0 || !existsSync(cOut)) { console.error('C recording failed:\n' + (rec.stderr || rec.stdout)); process.exit(1); }
const cSession = JSON.parse(readFileSync(cOut, 'utf8'));
const cSteps = cSession.segments[0].steps;
if (!cSteps[probeStep]) { console.error(`C recording has ${cSteps.length} steps; expected > ${probeStep}`); process.exit(1); }

/* ---------- JS replay ---------- */
const jsRoot = path.resolve(val('js-root', ROOT));
globalThis.__NH_RNG_TRACE = true;
const { runSegment } = await import(pathToFileURL(path.join(jsRoot, 'js', 'jsmain.js')).href);
const mem = new Map();
const storage = { getItem: (k) => mem.has(k) ? mem.get(k) : null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k), get length() { return mem.size; }, key: (i) => [...mem.keys()][i] ?? null };
let jsScreens = [], jsErr = null, jsRng = 0;
try {
    const g = await runSegment({ seed: seg.seed, datetime: seg.datetime, nethackrc: rc, moves: probeMoves, storage });
    jsScreens = g.getScreens(); jsRng = g.getRngLog().length;
} catch (e) { jsErr = String(e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : e); }
writeFileSync(`${stem}.js.session.json`, JSON.stringify({ segments: [{ ...seg, nethackrc: rc, moves: probeMoves, steps: jsScreens.map((screen, i) => ({ key: i ? probeMoves[i - 1] : '', screen })) }] }));
if (jsErr) console.log(`JS replay threw: ${jsErr}`);
if (!jsScreens[probeStep]) { console.error(`JS produced ${jsScreens.length} screens; expected > ${probeStep}`); process.exit(1); }
const cRng = cSteps.reduce((n, s) => n + (s.rng || []).length, 0);
console.log(`C rng ${cRng} / JS rng ${jsRng} over ${probeStep + 1} steps; C topline ${JSON.stringify(toplineOf(cSteps[probeStep].screen))}`);

/* ---------- decode + compare ---------- */
function toplineOf(s) { const g = decodeScreen(s || ''); return g[0].map(renderCell).join('').trimEnd(); }
function analyse(screen) {
    const grid = decodeScreen(screen || '');
    const ch = (x, y) => (x < 1 || x > 79 || y < 0 || y > 20) ? ' ' : renderCell(grid[y + 1][x - 1]);
    const isStone = (x, y) => ch(x, y) === ' ';
    const isWall = (x, y) => WALLS.has(ch(x, y));
    /* mkmaze.c get_level_extends, including the for-loop post-increment */
    let found = false, nonwall = false, xmin, xmax, ymin, ymax;
    for (xmin = 0; !found && xmin <= COLNO; xmin++) for (let y = 0; y <= ROWNO - 1; y++) if (!isStone(xmin, y)) { found = true; if (!isWall(xmin, y)) nonwall = true; }
    xmin -= 2; if (xmin < 0) xmin = 0;
    found = false; nonwall = false;
    for (xmax = COLNO - 1; !found && xmax >= 0; xmax--) for (let y = 0; y <= ROWNO - 1; y++) if (!isStone(xmax, y)) { found = true; if (!isWall(xmax, y)) nonwall = true; }
    xmax += 2; if (xmax >= COLNO) xmax = COLNO - 1;
    found = false; nonwall = false;
    for (ymin = 0; !found && ymin <= ROWNO; ymin++) for (let x = xmin; x <= xmax; x++) if (!isStone(x, ymin)) { found = true; if (!isWall(x, ymin)) nonwall = true; }
    ymin -= 2;
    found = false; nonwall = false;
    for (ymax = ROWNO - 1; !found && ymax >= 0; ymax--) for (let x = xmin; x <= xmax; x++) if (!isStone(x, ymax)) { found = true; if (!isWall(x, ymax)) nonwall = true; }
    ymax += 2;
    const nondig = (x, y) => (y <= ymin || y >= ymax || x <= xmin || x >= xmax);
    /* mklev.c mineralize gold/gem scan: which cells draw rn2(1000) */
    const elig = [];
    for (let x = 2; x < COLNO - 2; x++) for (let y = 1; y < ROWNO - 1; y++) {
        if (!isStone(x, y + 1)) { y += 2; } else if (!isStone(x, y)) { y += 1; }
        else if (!nondig(x, y) && isStone(x, y - 1) && isStone(x + 1, y - 1) && isStone(x - 1, y - 1)
            && isStone(x + 1, y) && isStone(x - 1, y) && isStone(x + 1, y + 1) && isStone(x - 1, y + 1)) elig.push(`${x},${y}`);
    }
    return { ch, elig, ext: { xmin, xmax, ymin, ymax } };
}
const C = analyse(cSteps[probeStep].screen), J = analyse(jsScreens[probeStep]);
console.log(`extends   C ${JSON.stringify(C.ext)}  JS ${JSON.stringify(J.ext)}`);
const sc = new Set(C.elig), sj = new Set(J.elig);
console.log(`eligible  C ${C.elig.length}  JS ${J.elig.length}  C-only: ${C.elig.filter((c) => !sj.has(c)).join(' ') || '-'}  JS-only: ${J.elig.filter((c) => !sc.has(c)).join(' ') || '-'}`);
const diffs = [];
for (let y = 0; y < ROWNO; y++) for (let x = 1; x < COLNO; x++) { const a = C.ch(x, y), b = J.ch(x, y); if (a !== b) diffs.push({ x, y, a, b }); }
console.log(`map cells differing: ${diffs.length}`);
for (const d of diffs.slice(0, 60)) console.log(`  (${d.x},${d.y}) C=${JSON.stringify(d.a)} JS=${JSON.stringify(d.b)}`);
if (diffs.length > 60) console.log(`  … ${diffs.length - 60} more`);
if (diffs.length) {
    const d = diffs[0];
    const x0 = Number(val('x0', Math.max(1, d.x - 10))), x1 = Number(val('x1', Math.min(79, d.x + 10)));
    const y0 = Number(val('y0', Math.max(0, d.y - 3))), y1 = Number(val('y1', Math.min(20, d.y + 3)));
    const hdr = '      ' + Array.from({ length: x1 - x0 + 1 }, (_, i) => String((x0 + i) % 10)).join('');
    for (const [name, S] of [['C ', C], ['JS', J]]) {
        console.log(`${name} rows ${y0}–${y1}, x ${x0}–${x1}\n${hdr}`);
        for (let y = y0; y <= y1; y++) { let row = `${name} ${String(y).padStart(2)} `; for (let x = x0; x <= x1; x++) row += S.ch(x, y); console.log(row); }
    }
    console.log(`\nA cell that is rock in C and not in JS (or the reverse) names the terrain writer to port — not the scan that noticed it. Files: ${path.relative(ROOT, stem)}.{c,js}.session.json`);
}
process.exit(diffs.length ? 1 : 0);
