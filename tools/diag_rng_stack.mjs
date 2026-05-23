#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const lo = parseInt(process.argv[2] || '1630', 10);
const hi = parseInt(process.argv[3] || '1642', 10);

const rngMod = await import(join(ROOT, 'js/rng.js'));
const origRn2 = rngMod.rn2;
let idx = 0;
rngMod.rn2 = function rn2Patched(x) {
    const v = origRn2(x);
    if (idx >= lo && idx <= hi) {
        const stack = new Error().stack.split('\n').slice(2, 6).map((l) => l.trim()).join(' <- ');
        console.log(`${idx}: rn2(${x})=${v}  ${stack}`);
    }
    idx++;
    return v;
};

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const sessionPath = join(ROOT, 'sessions/seed0077-rogue-chargen.session.json');
const segments = normalizeSession(JSON.parse(readFileSync(sessionPath, 'utf8'))).segments;
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) {
        const keys = [...storage.keys()];
        return i >= 0 && i < keys.length ? keys[i] : null;
    },
};
for (const seg of segments) {
    await runSegment({ ...seg, storage: storageHandle });
}
