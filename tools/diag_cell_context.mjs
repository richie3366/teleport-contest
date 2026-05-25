#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen, diffCell, ROWS_24, COLS_80 } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const idx = Number(process.argv[2] ?? 17);
const x = Number(process.argv[3] ?? 35);
const mapY = Number(process.argv[4] ?? 9);
const decRow = mapY + 1; /* decode row 0 = message; row 1 = map y=0 */

const STARTUP_VARIANT_LINES = [/Version\s+\d+\.\d+\.\d+[^\n]*/];
function preDecode(s) {
    let cur = String(s);
    for (const re of STARTUP_VARIANT_LINES) cur = cur.replace(re, '<<VERSION_BANNER>>');
    return cur.replace(/^\d{2}:\d{2}:\d{2}\.$/gm, '<time>.');
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const cScreens = [];
for (const step of seg.steps || []) {
    if (step.screen) cScreens.push(step.screen);
}
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};
const nh = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: sh,
});
const js = nh.getScreens()[idx] || '';
const ga = decodeScreen(preDecode(js));
const gb = decodeScreen(preDecode(cScreens[idx] || ''));
console.log('screen', idx, 'map', x, mapY, 'decRow', decRow, 'js', ga[decRow][x], 'c', gb[decRow][x]);
// context row
for (let col = x - 3; col <= x + 3; col++) {
    let line = '';
    for (let c = col; c <= col; c++) {
        line += ` js=${ga[y][c].ch} c=${gb[y][c].ch}`;
    }
    console.log('col', col, line);
}
for (let row = decRow - 2; row <= decRow + 2; row++) {
    let s = `${row}: `;
    for (let col = 28; col <= 42; col++) {
        const d = diffCell(ga[row][col], gb[row][col]);
        s += d ? `[${gb[row][col].ch}/${ga[row][col].ch}]` : gb[row][col].ch;
    }
    console.log(s);
}
