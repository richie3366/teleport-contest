#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const seg = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments[0];

const moves = seg.moves || '';
let cut = 0;
let stepIdx = 0;
for (let i = 0; i < moves.length; i++) {
    if (moves[i] === 's' && stepIdx >= 30) {
        cut = i;
        break;
    }
    if (moves[i] !== '\r' && moves[i] !== '\n') stepIdx++;
}

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

await runSegment({
    ...seg,
    moves: moves.slice(0, cut),
    storage: storageHandle,
});

console.log('rng', getRngLog().length, 'moves', game.moves);
const mons = game.level?.monsters ?? [];
console.log('monsters', mons.length);
for (let i = 0; i < mons.length; i++) {
    const m = mons[i];
    console.log(i, {
        mnum: m.mnum,
        mx: m.mx,
        my: m.my,
        mgenmklev: m.mgenmklev | 0,
        msleeping: m.msleeping | 0,
        mtame: m.mtame | 0,
    });
}
