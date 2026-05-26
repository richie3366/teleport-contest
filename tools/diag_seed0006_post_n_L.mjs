#!/usr/bin/env node
/** Post-for-n / final-post-for-l timing on seed0006 (RNG ~2502–2516). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const gs = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { NORMAL_SPEED } = await import(join(ROOT, 'js/const.js'));

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

function snap(label) {
    const g = gs.game;
    const mons = g.level?.monsters ?? [];
    console.log(
        label,
        'rng',
        getRngLog().length,
        'moves',
        g.moves,
        'umov',
        g.u?.umovement,
        'nmon',
        mons.length,
    );
    for (const m of mons) {
        console.log(
            `  m${m.mnum}@(${m.mx},${m.my}) mov${m.movement | 0} mk${m.mgenmklev | 0} tame${m.mtame | 0}`,
        );
    }
}

for (const n of [39, 40, 41]) {
    storage.clear();
    await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        nethackrc: seg.nethackrc,
        moves: seg.moves.slice(0, n),
        storage: storageHandle,
    });
    snap(`slice(0,${n})`);
    const tail = getRngLog().slice(-8);
    console.log('  rng tail:', tail.join(' | '));
}
console.log('C expects rn2(12)x4 ~2502, peel rn2(5)x6 ~2509–2515, rn2(12)x4 ~2516');
