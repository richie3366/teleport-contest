#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
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

/* Step 40 is first `L` with session RNG index 2502 (see session steps). */
const moveCharsBeforeL = 40;
const snap = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, moveCharsBeforeL),
    storage: storageHandle,
});

const mons = game.level?.monsters ?? [];
console.log('rng', snap?.rngLog?.length ?? getRngLog().length, 'moves', game.moves, 'nroom', game.level?.nroom, 'mons', mons.length);
for (const m of mons) {
    console.log(`  m${m.mnum}@(${m.mx},${m.my}) mk${m.mgenmklev | 0} mov${m.movement | 0}`);
}
