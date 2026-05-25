#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen, diffCell, ROWS_24, COLS_80 } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionName = process.argv[2] ?? 'seed8000-tourist-starter.session.json';
const onlyIdx = process.argv[3] != null ? Number(process.argv[3]) : null;

const STARTUP_VARIANT_LINES = [/Version\s+\d+\.\d+\.\d+[^\n]*/];
function preDecode(s) {
    let cur = String(s);
    for (const re of STARTUP_VARIANT_LINES) cur = cur.replace(re, '<<VERSION_BANNER>>');
    return cur.replace(/^\d{2}:\d{2}:\d{2}\.$/gm, '<time>.');
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const session = JSON.parse(readFileSync(join(ROOT, 'sessions', sessionName), 'utf8'));
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const h = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

const nh = await runSegment({ ...seg, storage: h });
const cScreens = [];
for (const step of seg.steps || []) if (step.screen) cScreens.push(step.screen);
const jScreens = nh.getScreens();

const indices = onlyIdx != null ? [onlyIdx] : [0, 11, 18, 21];
for (const idx of indices) {
    const ga = decodeScreen(preDecode(cScreens[idx]));
    const gb = decodeScreen(preDecode(jScreens[idx]));
    const diffs = [];
    for (let r = 0; r < ROWS_24; r++) {
        for (let c = 0; c < COLS_80; c++) {
            if (diffCell(ga[r][c], gb[r][c])) {
                diffs.push({ c, r, cch: ga[r][c].ch, js: gb[r][c].ch });
            }
        }
    }
    console.log('screen', idx, 'diffs', diffs.length);
    for (const d of diffs.slice(0, 25)) console.log(' ', d);
}
