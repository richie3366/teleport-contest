// dogmove_reach.js — C dogmove.c could_reach_item / can_reach_location (goal filters).
// C ref: dogmove.c could_reach_item() ~1362, can_reach_location() ~1379.

import { IS_DOOR, CORR, ROOM } from './const.js';
import { isPoolCellLikeC, isLavaCellLikeC } from './fillholetyp.js';
import { throwsRocks, passesWalls, swims, likesLava } from './mondata.js';
import { raceptr } from './mondata.js';
import { dist2 } from './hacklib.js';
import { OTYP_BOULDER } from './const.js';
import { floorObjKey } from './floorobj.js';

/** C: dogmove.c cursed_object_at — any cursed member of floor stack at (x,y). */
export function cursedObjectAtDogmoveLikeC(g, x, y) {
    const head = g.level?.floorObjHeads?.get(floorObjKey(x | 0, y | 0));
    for (let o = head; o; o = o.nexthere) {
        if (o.cursed) return true;
    }
    return false;
}

/**
 * C: dogmove.c could_reach_item — pool/lava/boulder vs monster capabilities.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} nx
 * @param {number} ny
 */
function sobjAtBoulderLikeC(g, x, y) {
    const head = g.level?.floorObjHeads?.get(floorObjKey(x | 0, y | 0));
    for (let o = head; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

export function couldReachItemDogmoveLikeC(g, mtmp, nx, ny) {
    const ptr = raceptr(mtmp);
    if (isPoolCellLikeC(g, nx, ny) && !swims(ptr)) return false;
    if (isLavaCellLikeC(g, nx, ny) && !likesLava(ptr)) return false;
    if (sobjAtBoulderLikeC(g, nx, ny) && !throwsRocks(ptr)) return false;
    return true;
}

function isObstructedDogmoveLikeC(g, typ) {
    return typ < IS_DOOR && (typ | 0) !== CORR && (typ | 0) !== ROOM;
}

/**
 * C: dogmove.c can_reach_location — recursive reachability for dog_goal filters.
 * @param {import('./gstate.js').game} g
 * @param {Record<string, unknown>} mtmp
 * @param {number} mx
 * @param {number} my
 * @param {number} fx
 * @param {number} fy
 */
export function canReachLocationDogmoveLikeC(g, mtmp, mx, my, fx, fy) {
    const xi = mx | 0;
    const yi = my | 0;
    const xf = fx | 0;
    const yf = fy | 0;
    if (xi === xf && yi === yf) return true;
    const dist = dist2(xi, yi, xf, yf);
    const ptr = raceptr(mtmp);
    for (let i = xi - 1; i <= xi + 1; i++) {
        for (let j = yi - 1; j <= yi + 1; j++) {
            if (i < 0 || i > 79 || j < 0 || j > 23) continue;
            if (dist2(i, j, xf, yf) >= dist) continue;
            const loc = g.level?.at(i, j);
            if (!loc) continue;
            const typ = loc.typ | 0;
            if (isObstructedDogmoveLikeC(g, typ) && !passesWalls(ptr)) continue;
            if (IS_DOOR(typ) && ((loc.doormask | 0) & 3)) continue;
            if (!couldReachItemDogmoveLikeC(g, mtmp, i, j)) continue;
            if (canReachLocationDogmoveLikeC(g, mtmp, i, j, xf, yf)) return true;
        }
    }
    return false;
}
