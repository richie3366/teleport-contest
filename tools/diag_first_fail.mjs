#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath = process.argv[2] || join(ROOT, 'sessions/seed0077-rogue-chargen.session.json');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { decodeScreen, diffCell, ROWS_24, COLS_80 } = await import(join(ROOT, 'frozen/screen-decode.mjs'));

const STARTUP_VARIANT_LINES = [
    /^NetHack 5\.0/,
    /^NetHack 3\./,
    /^NetHack [0-9]/,
];

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

const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const seg = normalizeSession(session).segments[0];
const cScreens = [];
for (const step of seg.steps || []) {
    if (step.screen) cScreens.push(step.screen);
}

const storage = new Map();
const st = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

const g = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: st,
});
const jsScreens = g.getScreens();

const fails = [];
for (let i = 0; i < cScreens.length; i++) {
    if (!screensVisuallyEqual(jsScreens[i] || '', cScreens[i] || '')) fails.push(i);
}
console.log('failing steps', fails.join(','));
if (fails.length) {
    const i = fails[0];
    const ga = decodeScreen(preDecode(cScreens[i]));
    const gb = decodeScreen(preDecode(jsScreens[i]));
    const diffs = [];
    for (let r = 0; r < 24; r++) {
        for (let c = 0; c < 80; c++) {
            if (diffCell(ga[r][c], gb[r][c])) diffs.push({ c, r, a: ga[r][c], b: gb[r][c] });
        }
    }
    console.log('first fail step', i, 'diffs', diffs.length);
    for (const d of diffs.slice(0, 15)) {
        console.log(`  (${d.c},${d.r})`, 'C:', d.a, 'JS:', d.b);
    }
}
