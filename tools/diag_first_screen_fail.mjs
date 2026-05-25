#!/usr/bin/env node
/** First screen index where JS != C for a session. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen, diffCell, ROWS_24, COLS_80 } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionName = process.argv[2] ?? 'seed0077-rogue-chargen.session.json';

const STARTUP_VARIANT_LINES = [/Version\s+\d+\.\d+\.\d+[^\n]*/];

function preDecode(s) {
    let cur = String(s);
    for (const re of STARTUP_VARIANT_LINES) {
        cur = cur.replace(re, '<<VERSION_BANNER>>');
    }
    cur = cur.replace(/^\d{2}:\d{2}:\d{2}\.$/gm, '<time>.');
    return cur;
}

function screensVisuallyEqual(a, b) {
    const ga = decodeScreen(preDecode(a));
    const gb = decodeScreen(preDecode(b));
    for (let r = 0; r < ROWS_24; r++) {
        for (let c = 0; c < COLS_80; c++) {
            if (diffCell(ga[r][c], gb[r][c])) return false;
        }
    }
    return true;
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions', sessionName), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

const nhGame = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: storageHandle,
});

const cScreens = [];
for (const step of seg.steps || []) {
    if (step.screen) cScreens.push(step.screen);
}
const jScreens = nhGame.getScreens?.() || [];

let failIdx = -1;
for (let i = 0; i < cScreens.length; i++) {
    if (!screensVisuallyEqual(jScreens[i] || '', cScreens[i] || '')) {
        failIdx = i;
        console.log('first fail', i, 'of', cScreens.length);
        break;
    }
}

if (failIdx < 0) {
    console.log('all screens match');
    process.exit(0);
}

const ga = decodeScreen(preDecode(cScreens[failIdx]));
const gb = decodeScreen(preDecode(jScreens[failIdx]));
const diffs = [];
for (let r = 0; r < ROWS_24; r++) {
    for (let c = 0; c < COLS_80; c++) {
        if (diffCell(ga[r][c], gb[r][c])) {
            diffs.push({ x: c, decRow: r, mapY: r - 1, c: ga[r][c].ch, js: gb[r][c].ch });
        }
    }
}
console.log('diff count', diffs.length);
for (const d of diffs) console.log(d);
