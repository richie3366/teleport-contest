#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    if (!track) return;
    const rng0 = getRngLog().length;
    if (rng0 < 3210 || rng0 > 3225) return;
    const list = floor.map((o) => ({ ox: o.ox, oy: o.oy, otyp: o.otyp }));
    console.log('dogGoalFloor rng', rng0, 'n', list.length, list);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
for (const seg of segments) await runSegment({ ...seg, storage: h });
