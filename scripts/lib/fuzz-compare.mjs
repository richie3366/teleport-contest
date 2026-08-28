#!/usr/bin/env node
// fuzz-compare.mjs — Pass/fail via frozen ps_test_runner; first-diff via
// frozen/screen-decode.mjs. Do not reimplement `passed`.
//
// Usage:
//   node scripts/lib/fuzz-compare.mjs --self-test
//   import { scoreSession, firstDiff, screensVisuallyEqual } from './lib/fuzz-compare.mjs'

import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { decodeScreen, diffCell, ROWS_24, COLS_80 } from '../../frozen/screen-decode.mjs';
import { normalizeSession } from '../../frozen/session_loader.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const RUNNER = path.join(ROOT, 'frozen', 'ps_test_runner.mjs');

export function isRngCall(entry) {
    return typeof entry === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

export function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();
}

function extractRngCalls(rngArray) {
    return (rngArray || []).filter(isRngCall);
}

// Copied from frozen/ps_test_runner.mjs — must stay byte-identical to the
// frozen copies of STARTUP_VARIANT_LINES, preDecode, and cursorsEqual.
const STARTUP_VARIANT_LINES = [
    // Match any "Version X.Y.Z..." line — covers patched ("built Sun May  3 ..."),
    // recorder ("last build May 03 ..."), legacy ("Work-in-progress, built ..."),
    // and contestant-port banners ("Teleport JS (experiment ...)" etc).
    /Version\s+\d+\.\d+\.\d+[^\n]*/,
];

function preDecode(s) {
    let cur = String(s);
    for (const re of STARTUP_VARIANT_LINES) {
        cur = cur.replace(re, '<<VERSION_BANNER>>');
    }
    cur = cur.replace(/^\d{2}:\d{2}:\d{2}\.$/gm, '<time>.');
    return cur;
}

function cursorsEqual(c, j) {
    if (!Array.isArray(c)) return true; // canonical has no cursor → don't fail
    if (!Array.isArray(j)) return false; // JS produced no cursor but C did
    return c[0] === j[0] && c[1] === j[1] && c[2] === j[2];
}

export function screensVisuallyEqual(a, b) {
    const ga = decodeScreen(preDecode(a));
    const gb = decodeScreen(preDecode(b));
    for (let r = 0; r < ROWS_24; r++) {
        for (let c = 0; c < COLS_80; c++) {
            if (diffCell(ga[r][c], gb[r][c])) return false;
        }
    }
    return true;
}

function parseRunnerStdout(stdout) {
    const text = String(stdout || '');
    const bundleIdx = text.lastIndexOf('__RESULTS_JSON__');
    if (bundleIdx >= 0) {
        const json = text.slice(bundleIdx + '__RESULTS_JSON__'.length).trim();
        const bundle = JSON.parse(json);
        const results = bundle.results || [];
        if (!results[0]) {
            throw new Error('runner bundle has empty results');
        }
        return results[0];
    }
    const oneIdx = text.lastIndexOf('__RESULT_ONE__');
    if (oneIdx >= 0) {
        return JSON.parse(text.slice(oneIdx + '__RESULT_ONE__'.length).trim());
    }
    throw new Error('runner output missing __RESULTS_JSON__ / __RESULT_ONE__ marker');
}

/** Spawn the frozen runner. Never reimplement `passed`. */
export function scoreSession(sessionPath, opts = {}) {
    const timeoutMs = Number(opts.timeoutMs || process.env.SESSION_REPLAY_TIMEOUT_MS || 45000);
    const child = spawnSync(process.execPath, [RUNNER, sessionPath], {
        cwd: ROOT,
        encoding: 'utf8',
        timeout: timeoutMs,
        maxBuffer: 64 * 1024 * 1024,
        env: { ...process.env, SESSION_REPLAY_TIMEOUT_MS: String(timeoutMs) },
    });
    if (child.error) {
        return {
            session: path.basename(sessionPath),
            passed: false,
            metrics: {
                rngCalls: { matched: 0, total: 0 },
                screens: { matched: 0, total: 0 },
            },
            error: child.error.message,
        };
    }
    try {
        return parseRunnerStdout(child.stdout);
    } catch (err) {
        const errText = (child.stderr || '').trim() || child.error?.message || err.message;
        return {
            session: path.basename(sessionPath),
            passed: false,
            metrics: {
                rngCalls: { matched: 0, total: 0 },
                screens: { matched: 0, total: 0 },
            },
            error: errText || `runner exit ${child.status}`,
        };
    }
}

function makeStorageHandle() {
    const storage = new Map();
    return {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) {
            let n = 0;
            for (const k of storage.keys()) { if (n === i) return k; n++; }
            return null;
        },
    };
}

function flattenCanonical(segments) {
    const cScreens = [];
    const cCursors = [];
    const cRngByStep = [];
    const cSteps = [];
    for (const seg of segments) {
        for (const step of seg.steps || []) {
            cScreens.push(step.screen || '');
            cCursors.push(Array.isArray(step.cursor) ? step.cursor : null);
            cRngByStep.push(extractRngCalls(step.rng).map(normalizeRng));
            cSteps.push(step);
        }
    }
    return { cScreens, cCursors, cRngByStep, cSteps };
}

async function runJs(segments) {
    const { runSegment } = await import(pathToFileURL(path.join(ROOT, 'js', 'jsmain.js')).href);
    const storage = makeStorageHandle();
    const jsScreens = [];
    const jsCursors = [];
    const jsRngByStep = [];
    let error = null;
    try {
        for (const seg of segments) {
            const game = await runSegment({
                seed: seg.seed,
                datetime: seg.datetime,
                nethackrc: seg.nethackrc,
                moves: seg.moves,
                storage,
            });
            const screens = game.getScreens?.() || [];
            const cursors = game.getCursors?.() || [];
            const slices = game.getRngSlices?.() || [];
            for (let i = 0; i < screens.length; i++) {
                jsScreens.push(screens[i] || '');
                jsCursors.push(cursors[i] ?? null);
                const slice = (slices[i] || []).map((e) => (
                    typeof e === 'string' ? e.replace(/^\d+\s+/, '') : String(e)
                )).filter(isRngCall).map(normalizeRng);
                jsRngByStep.push(slice);
            }
        }
    } catch (e) {
        error = e.message || String(e);
    }
    return { jsScreens, jsCursors, jsRngByStep, error };
}

function rngStepEqual(cArr, jArr) {
    const a = cArr || [];
    const b = jArr || [];
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * First canonical *step* index whose screen/cursor misses, and first
 * whose per-step normalized RNG disagrees. Loop bound is C's count
 * (C1): a missing JS screen is a divergence at that index.
 */
export async function firstDiff(sessionPathOrData) {
    const raw = typeof sessionPathOrData === 'string'
        ? JSON.parse(readFileSync(sessionPathOrData, 'utf8'))
        : sessionPathOrData;
    const segments = normalizeSession(raw).segments;
    const { cScreens, cCursors, cRngByStep } = flattenCanonical(segments);
    const js = await runJs(segments);

    let firstScreen = null;
    let firstRng = null;
    const n = cScreens.length;
    for (let i = 0; i < n; i++) {
        const cellsOk = screensVisuallyEqual(js.jsScreens[i] || '', cScreens[i] || '');
        const cursorOk = cursorsEqual(cCursors[i], js.jsCursors[i]);
        if (firstScreen === null && !(cellsOk && cursorOk)) firstScreen = i;
        if (firstRng === null && !rngStepEqual(cRngByStep[i], js.jsRngByStep[i])) {
            firstRng = i;
        }
        if (firstScreen !== null && firstRng !== null) break;
    }
    const firstAny = firstScreen === null ? firstRng
        : firstRng === null ? firstScreen
        : Math.min(firstScreen, firstRng);
    const idx = firstAny == null ? 0 : firstAny;
    return {
        firstScreen,
        firstRng,
        firstAny,
        screenTotal: n,
        cTopline: toplineOf(cScreens[idx] || ''),
        jsTopline: toplineOf(js.jsScreens[idx] || ''),
        jsError: js.error,
    };
}

export function toplineOf(screen) {
    const first = String(screen || '').split('\n')[0] || '';
    return first
        .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, '')
        .replace(/[\x0e\x0f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function metricsShape(result) {
    const rng = result?.metrics?.rngCalls || { matched: 0, total: 0 };
    const scr = result?.metrics?.screens || { matched: 0, total: 0 };
    return {
        rngM: rng.matched | 0,
        rngT: rng.total | 0,
        scrM: scr.matched | 0,
        scrT: scr.total | 0,
    };
}

function perturbVisibleGlyph(screen) {
    const ESC = '\x1b';
    let i = 0;
    while (i < screen.length) {
        if (screen[i] === ESC) {
            i += 2;
            while (i < screen.length) {
                const code = screen.charCodeAt(i);
                if (code >= 0x40 && code <= 0x7e) { i += 1; break; }
                i += 1;
            }
            continue;
        }
        if (screen[i] === '\n' || screen[i] === '\x0e' || screen[i] === '\x0f') {
            i += 1;
            continue;
        }
        if (/[A-Za-z.]/.test(screen[i])) {
            const repl = screen[i] === 'Q' ? 'Z' : 'Q';
            return screen.slice(0, i) + repl + screen.slice(i + 1);
        }
        i += 1;
    }
    throw new Error('no visible glyph to perturb');
}

function pickLockStep(steps) {
    for (let i = 1; i < steps.length; i++) {
        if (steps[i]?.screen && extractRngCalls(steps[i].rng || []).length > 0) return i;
    }
    throw new Error('no in-game step with both a screen and RNG calls');
}

const LOCK_SESSION = path.join(ROOT, 'sessions', 'seed0900-tourist-explore-actions.session.json');

export async function runSelfTest() {
    const tmp = mkdtempSync(path.join(tmpdir(), 'fuzz-compare-'));
    const failures = [];
    const check = (ok, msg) => { if (!ok) failures.push(msg); };
    let lockK = -1;

    try {
        const passResult = scoreSession(LOCK_SESSION);
        check(passResult && passResult.passed === true, `PASS lock: runner passed=${passResult?.passed}`);
        const passDiff = await firstDiff(LOCK_SESSION);
        check(passDiff.firstScreen === null, `PASS lock: firstScreen=${passDiff.firstScreen}`);
        check(passDiff.firstRng === null, `PASS lock: firstRng=${passDiff.firstRng}`);
        check(passDiff.firstAny === null, `PASS lock: firstAny=${passDiff.firstAny}`);

        const orig = JSON.parse(readFileSync(LOCK_SESSION, 'utf8'));
        const steps = orig.segments[0].steps;
        const LOCK_K = pickLockStep(steps);
        lockK = LOCK_K;
        if (!steps[LOCK_K]?.screen) {
            throw new Error(`lock session missing steps[${LOCK_K}].screen`);
        }
        const rngLines = extractRngCalls(steps[LOCK_K].rng || []);
        if (rngLines.length === 0) {
            throw new Error(`lock session steps[${LOCK_K}] has no RNG calls`);
        }

        const screenCopy = JSON.parse(JSON.stringify(orig));
        screenCopy.segments[0].steps[LOCK_K].screen =
            perturbVisibleGlyph(screenCopy.segments[0].steps[LOCK_K].screen);
        const screenPath = path.join(tmp, 'screen-fail.session.json');
        writeFileSync(screenPath, JSON.stringify(screenCopy));
        const screenResult = scoreSession(screenPath);
        check(screenResult && screenResult.passed === false, 'SCREEN lock: runner should FAIL');
        const screenDiff = await firstDiff(screenPath);
        check(screenDiff.firstScreen === LOCK_K,
            `SCREEN lock: firstScreen=${screenDiff.firstScreen} expected ${LOCK_K}`);

        const rngCopy = JSON.parse(JSON.stringify(orig));
        const rngArr = rngCopy.segments[0].steps[LOCK_K].rng;
        for (let i = 0; i < rngArr.length; i++) {
            if (!isRngCall(rngArr[i])) continue;
            rngArr[i] = rngArr[i].replace(/=(\d+)/, (_, n) => `=${Number(n) + 1}`);
            break;
        }
        const rngPath = path.join(tmp, 'rng-fail.session.json');
        writeFileSync(rngPath, JSON.stringify(rngCopy));
        const rngResult = scoreSession(rngPath);
        check(rngResult && rngResult.passed === false, 'RNG lock: runner should FAIL');
        const rngDiff = await firstDiff(rngPath);
        check(rngDiff.firstRng === LOCK_K,
            `RNG lock: firstRng=${rngDiff.firstRng} expected ${LOCK_K}`);
        check(rngDiff.firstScreen === null,
            `RNG lock: firstScreen=${rngDiff.firstScreen} expected null`);
    } finally {
        rmSync(tmp, { recursive: true, force: true });
    }

    if (failures.length) {
        console.error('fuzz-compare self-test FAIL:');
        for (const f of failures) console.error('  ' + f);
        process.exit(1);
    }
    console.log(`fuzz-compare self-test OK (seed0900 PASS + screen/RNG locks at k=${lockK})`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain && process.argv.includes('--self-test')) {
    runSelfTest().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
