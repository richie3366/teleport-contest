#!/usr/bin/env node
/** One-off: dump fmon order + mcalcmove result at first new-turn (seed8000). */
import { readFileSync } from 'fs';
import { normalizeSession } from '../frozen/session_loader.mjs';
import { runSegment } from '../js/jsmain.js';
import { mcalcMoveLikeC } from '../js/mcalc_move.js';
import { raceptr, S_EEL } from '../js/mondata.js';
import { fmonListNewestFirstLikeC } from '../js/fmon_iter.js';
import { NORMAL_SPEED } from '../js/const.js';

const sessionData = JSON.parse(
    readFileSync('sessions/seed8000-tourist-starter.session.json', 'utf8'),
);
const seg = normalizeSession(sessionData).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) {
        let n = 0;
        for (const k of storage.keys()) { if (n === i) return k; n++; }
        return null;
    },
};

const g = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: storageHandle,
});

const mons = fmonListNewestFirstLikeC(g);
console.log('moves', g.moves, 'monster count', mons.length);
for (let i = 0; i < mons.length; i++) {
    const m = mons[i];
    const ptr = raceptr(m);
    const before = m.movement | 0;
    const add = mcalcMoveLikeC(m, true, g);
    console.log(
        i,
        'mnum', m.mnum,
        'mlet', ptr?.mlet,
        'eel', (ptr?.mlet | 0) === S_EEL,
        'mmove', ptr?.mmove,
        'mx,my', m.mx, m.my,
        'mgenmklev', m.mgenmklev | 0,
        'movement', before, '+', add, '=', before + add,
        'ge12', before + add >= NORMAL_SPEED,
    );
}
