#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const idx = Number(process.argv[2] ?? 21);
const pre = (s) => String(s).replace(/Version[^\n]*/, '<<V>>');

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const seg = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed8000-tourist-starter.session.json'), 'utf8')),
).segments[0];
const st = new Map();
const h = {
    getItem(k) { return st.has(k) ? st.get(k) : null; },
    setItem(k, v) { st.set(k, String(v)); },
    removeItem(k) { st.delete(k); },
    get length() { return st.size; },
    key() { return null; },
};

const nh = await runSegment({ ...seg, storage: h });
const cSteps = seg.steps.filter((s) => s.screen);
const row0 = (scr) => {
    const g = decodeScreen(pre(scr));
    let s = '';
    for (let c = 0; c < 80; c++) s += g[0][c].ch;
    return s.trim();
};
console.log('C', row0(cSteps[idx].screen));
console.log('JS', row0(nh.getScreens()[idx]));
