#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));

const calls = [];
const petSnaps = [];
globalThis.__diagMovemon = (stepNum, moves) => {
    calls.push({ stepNum, moves });
    if (calls.length > 30) calls.shift();
};
globalThis.__diagMovemonSinglemon = (g, mtmp, stepNum) => {
    petSnaps.push({
        where: 'singlemon',
        stepNum,
        moves: g.moves | 0,
        mtame: mtmp.mtame | 0,
    });
    if (petSnaps.length > 40) petSnaps.shift();
};
globalThis.__diagPetMovemon = (g, mtmp, stepNum, where) => {
    petSnaps.push({
        where,
        stepNum,
        moves: g.moves | 0,
        mov: mtmp.movement | 0,
        mtame: mtmp.mtame | 0,
    });
    if (petSnaps.length > 40) petSnaps.shift();
};
let dogMoveCalls = 0;
globalThis.__diagDogMoveLikeC = () => {
    dogMoveCalls++;
};

const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(sessionData).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i]; },
};

await runSegment({ ...seg, storage: storageHandle });
const { game: g } = await import(join(ROOT, 'js/gstate.js'));
console.log('movemon calls', calls.length, calls.slice(-10));
console.log('dogMoveLikeC calls', dogMoveCalls);
console.log('petSnaps', petSnaps.length, petSnaps.slice(-10));
const mons = g.level?.monsters ?? [];
console.log('mons', mons.length, 'tame', mons.filter((m) => m.mtame | 0).length);
