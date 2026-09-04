#!/usr/bin/env node
/**
 * hidden-worker.mjs — replay ONE recorded session in JS (fresh process, so
 * no cross-session state leaks), score it with the frozen runner's rules,
 * and attribute the first divergence to a C function on both sides.
 *
 *   node scripts/lib/hidden-worker.mjs <session.json>   → JSON on stdout
 *
 * Attribution:
 *  - RNG-first divergence: the C entry at the first positional mismatch
 *    carries "@ fn(file.c:line)" (recorder patch 003). The JS entry carries
 *    "@ jsfn(file.js:line)" because this worker turns on
 *    globalThis.__NH_RNG_TRACE. Owner = that C function.
 *  - Screen-first divergence (RNG still in sync): owner = the C function
 *    whose string literal renders the C topline at that step (c-index
 *    matchMessage); the JS topline is attributed the same way against js/.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { normalizeSession } from '../../frozen/session_loader.mjs';
import {
    isRngCall, normalizeRng, screensVisuallyEqual, toplineOf,
} from './fuzz-compare.mjs';
import { loadCIndex, parseCRng } from './c-index.mjs';
import { decodeScreen, diffCell, renderCell, ROWS_24, COLS_80 } from '../../frozen/screen-decode.mjs';

/** First differing cell between two encoded screens → row text on both sides. */
function rowDiff(cScr, jScr) {
    const a = decodeScreen(cScr || ''), b = decodeScreen(jScr || '');
    for (let r = 0; r < ROWS_24; r++) {
        for (let c = 0; c < COLS_80; c++) {
            if (diffCell(a[r][c], b[r][c])) {
                const text = (g) => g[r].map((x) => renderCell(x)).join('').replace(/\s+$/, '');
                return { row: r, col: c, c: text(a), js: text(b),
                         region: r === 0 ? 'topline' : r >= 22 ? 'botl' : 'map/menu' };
            }
        }
    }
    return null;
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function cursorsEqual(c, j) {
    if (!Array.isArray(c)) return true;
    if (!Array.isArray(j)) return false;
    return c[0] === j[0] && c[1] === j[1] && c[2] === j[2];
}

function makeStorage() {
    const m = new Map();
    return {
        getItem(k) { return m.has(k) ? m.get(k) : null; },
        setItem(k, v) { m.set(k, String(v)); },
        removeItem(k) { m.delete(k); },
        get length() { return m.size; },
        key(i) { let n = 0; for (const k of m.keys()) { if (n === i) return k; n++; } return null; },
    };
}

function stripIdx(e) {
    return typeof e === 'string' ? e.replace(/^\d+\s+/, '') : String(e);
}

async function main() {
    const sessionPath = process.argv[2];
    const raw = JSON.parse(readFileSync(sessionPath, 'utf8'));
    const segments = normalizeSession(raw).segments;

    /* canonical (C) side, flattened */
    const cScreens = [], cCursors = [], cRngRaw = [], cRngStepOf = [];
    let stepNo = 0;
    for (const seg of segments) {
        for (const step of seg.steps || []) {
            cScreens.push(step.screen || '');
            cCursors.push(Array.isArray(step.cursor) ? step.cursor : null);
            for (const e of (step.rng || []).filter(isRngCall)) {
                cRngRaw.push(e);
                cRngStepOf.push(stepNo);
            }
            stepNo++;
        }
    }

    /* JS side */
    globalThis.__NH_RNG_TRACE = true;
    const { runSegment } = await import(pathToFileURL(path.join(ROOT, 'js', 'jsmain.js')).href);
    const storage = makeStorage();
    const jsScreens = [], jsCursors = [], jsRngRaw = [];
    let error = null;
    const t0 = Date.now();
    try {
        for (const seg of segments) {
            const game = await runSegment({
                seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
                moves: seg.moves, storage,
            });
            for (const e of (game.getRngLog?.() || []).map(stripIdx).filter(isRngCall)) jsRngRaw.push(e);
            const screens = game.getScreens?.() || [];
            const cursors = game.getCursors?.() || [];
            for (let i = 0; i < screens.length; i++) {
                jsScreens.push(screens[i] || '');
                jsCursors.push(cursors[i] ?? null);
            }
        }
    } catch (e) {
        error = (e && e.stack ? e.stack.split('\n').slice(0, 4).join(' | ') : String(e));
    }
    const ms = Date.now() - t0;

    /* frozen-runner scoring rules */
    const rngT = cRngRaw.length;
    let rngM = 0, firstRngIdx = null;
    for (let i = 0; i < rngT; i++) {
        const ok = normalizeRng(jsRngRaw[i] || '') === normalizeRng(cRngRaw[i]);
        if (ok) rngM++;
        else if (firstRngIdx === null) firstRngIdx = i;
    }
    const scrT = cScreens.length;
    let scrM = 0, firstScreen = null;
    for (let i = 0; i < scrT; i++) {
        const ok = screensVisuallyEqual(jsScreens[i] || '', cScreens[i])
            && cursorsEqual(cCursors[i], jsCursors[i]);
        if (ok) scrM++;
        else if (firstScreen === null) firstScreen = i;
    }
    const passed = !error && rngM === rngT && scrM === scrT;

    /* attribution */
    const idx = loadCIndex();
    let firstRngStep = firstRngIdx === null ? null : cRngStepOf[firstRngIdx];
    let kind = null, owner = null, ownerFile = null, ownerLine = 0;
    let cEntry = null, jsEntry = null, prevEntry = null, jsOwner = null;
    let step = null;
    if (firstRngIdx !== null && (firstScreen === null || firstRngStep <= firstScreen)) {
        kind = 'rng';
        step = firstRngStep;
        cEntry = cRngRaw[firstRngIdx];
        jsEntry = jsRngRaw[firstRngIdx] || null;
        prevEntry = firstRngIdx > 0 ? cRngRaw[firstRngIdx - 1] : null;
        const c = parseCRng(cEntry);
        owner = c.fn; ownerFile = c.file; ownerLine = c.line;
        if (jsEntry) {
            const m = /@\s*(.+)$/.exec(jsEntry);
            jsOwner = m ? m[1] : null;
        } else if (prevEntry) {
            /* JS ran out of draws: it stopped inside/after the previous owner */
            const pc = parseCRng(prevEntry);
            jsOwner = `(no JS draw; last matched was ${pc.fn})`;
        }
    } else if (firstScreen !== null) {
        kind = 'screen';
        step = firstScreen;
    }
    const cTop = step === null ? '' : toplineOf(cScreens[step] || '');
    const jsTop = step === null ? '' : toplineOf(jsScreens[step] || '');
    let cMsgOwners = idx.matchMessage(cTop);
    let rd = null, region = null;
    if (kind === 'screen') {
        rd = rowDiff(cScreens[step], jsScreens[step]);
        region = rd ? rd.region : 'cursor';
        /* Owner precedence: a config/temp path on screen is the recording
           environment, not the port (env:); a status-line row belongs to
           botl.c; otherwise the topline names the function that drew this
           screen (a menu's prompt owns its body); a bare body row is the
           fallback. */
        const envRe = /\/var\/folders\/|\/nh-rec-|\/Users\/|\/tmp\/nh|\/home\//;
        if (rd && (envRe.test(rd.c) || envRe.test(rd.js))) {
            cMsgOwners = [{ fn: 'env:config-path', file: 'cfgfiles.c', line: 0 }];
        } else if (rd && rd.region === 'botl' && ((rd.c === '') !== (rd.js === ''))) {
            /* one side blank under an overlay: the tty menu/text window
               clears only from its own left column, so C keeps the left of
               the status line; a port that wipes the row diverges here */
            cMsgOwners = [{ fn: 'process_menu_window', file: 'wintty.c', line: 1709 }];
        } else if (rd && rd.region === 'botl') {
            cMsgOwners = [{ fn: rd.row === 22 ? 'do_statusline1' : 'do_statusline2', file: 'botl.c', line: rd.row === 22 ? 85 : 130 }];
        } else if (!cMsgOwners.length && rd) {
            const rowOwners = idx.matchMessage(rd.c);
            if (rowOwners.length) cMsgOwners = rowOwners;
        }
        if (cMsgOwners.length) {
            owner = cMsgOwners[0].fn; ownerFile = cMsgOwners[0].file; ownerLine = cMsgOwners[0].line;
        } else {
            owner = null;
        }
    }
    /* C functions that drew RNG in the divergent step — the hot set */
    const stepFns = [];
    if (step !== null) {
        const seen = new Set();
        for (let i = 0; i < rngT; i++) {
            if (cRngStepOf[i] !== step) continue;
            const f = parseCRng(cRngRaw[i]).fn;
            if (f && !seen.has(f)) { seen.add(f); stepFns.push(f); }
        }
    }
    const blockedRng = firstRngIdx === null ? 0 : rngT - firstRngIdx;
    const blockedScr = firstScreen === null ? 0 : scrT - firstScreen;

    const out = {
        session: path.basename(sessionPath),
        passed, error, ms,
        rngM, rngT, scrM, scrT,
        kind, step, steps: scrT,
        owner, ownerFile, ownerLine, jsOwner,
        cEntry, jsEntry, prevEntry,
        cTopline: cTop, jsTopline: jsTop,
        cMsgOwners: cMsgOwners.map((o) => `${o.fn}(${o.file}:${o.line})`),
        stepFns: stepFns.slice(0, 12),
        region, rowDiff: rd,
        blockedRng, blockedScr,
        coverage: !!(error && /not (yet )?implemented|unported|TODO/i.test(error)),
    };
    process.stdout.write(JSON.stringify(out) + '\n');
}

main().catch((e) => {
    process.stdout.write(JSON.stringify({ session: process.argv[2], passed: false, error: String(e && e.stack || e) }) + '\n');
    process.exit(0);
});
