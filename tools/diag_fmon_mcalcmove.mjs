#!/usr/bin/env node
/** One-off: dump fmon order + mcalcmove result at first new-turn (seed8000). */
import { readFileSync } from 'fs';
import { normalizeSession } from '../frozen/session_loader.mjs';
import { runSegment } from '../js/jsmain.js';
import { mcalcMoveLikeC } from '../js/mcalc_move.js';
import { raceptr, S_EEL } from '../js/mondata.js';
import { fmonListNewestFirstLikeC, fmonListForMcalcmoveLikeC } from '../js/fmon_iter.js';
import { NORMAL_SPEED } from '../js/const.js';
import { game } from '../js/gstate.js';
import { getRngLog } from '../js/rng.js';
import { movemonStep8DistantMonEligibleLikeC } from '../js/mfndpos_mon.js';

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

await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: storageHandle,
});

const g = game;
const mons = fmonListNewestFirstLikeC(g);
console.log('moves', g.moves, 'monster count', mons.length);
const log = getRngLog();
console.log('rn2(12) near 2975:', log.slice(2970, 2985).map((e, i) => `${i + 2970}:${e.kind}${e.n != null ? ':' + e.n : ''}=${e.result}`));
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
        'distant', movemonStep8DistantMonEligibleLikeC(g, m),
    );
}
console.log('--- swap order ---');
for (let i = 0; i < fmonListForMcalcmoveLikeC(g).length; i++) {
    const m = fmonListForMcalcmoveLikeC(g)[i];
    const ptr = raceptr(m);
    console.log('swap', i, 'mnum', m.mnum, 'mx,my', m.mx, m.my, 'mmove', ptr?.mmove, 'distant', movemonStep8DistantMonEligibleLikeC(g, m));
}
