#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

let lastMoves = -1;
globalThis.__diagAfterMove = (g) => {
    const moves = g.moves | 0;
    if (moves === lastMoves) return;
    lastMoves = moves;
    if (moves < 1 || moves > 40) return;
    const mons = game.level?.monsters ?? [];
    console.log(
        'moves',
        moves,
        'rng',
        getRngLog().length,
        'n',
        mons.length,
        mons.map((m) => `${m.mnum}@(${m.mx},${m.my}) g${m.mgenmklev | 0}`).join(' '),
    );
};

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

for (const seg of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...seg, storage: storageHandle });
}
