// walkable.js — Terrain blocking for hero/monster moves (shared stub).
// C ref: hack.c blocks(), mon.c goodpos() (terrain slice only).

import { game } from './gstate.js';
import { STONE, DOOR, D_CLOSED, D_LOCKED, IS_WALL, POOL, MOAT, WATER, LAVAPOOL, LAVAWALL } from './const.js';
import { isFlyer, isFloater, raceptr, swims, amphibious, fireResistant } from './mondata.js';

/**
 * True if (x,y) cannot be walked onto (walls, closed doors, void).
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function blocksMovementAt(x, y, g = game) {
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    if (loc.typ === STONE) return true;
    if (IS_WALL(loc.typ)) return true;
    if (loc.typ === DOOR && (loc.doormask & (D_CLOSED | D_LOCKED))) return true;
    return false;
}

function isWaterTerrain(typ) {
    return typ === POOL || typ === MOAT || typ === WATER;
}

function isLavaTerrain(typ) {
    return typ === LAVAPOOL || typ === LAVAWALL;
}

/**
 * C: mon.c goodpos() — water/lava at (x,y): flyers/floaters pass; water allows swim/amphibious;
 * lava allows innate `MR_FIRE` (subset until full `goodpos`).
 * @param {{ data?: unknown }} mtmp
 */
export function terrainBlocksDisplaceForMon(mtmp, x, y, g = game) {
    if (blocksMovementAt(x, y, g)) return true;
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    const typ = loc.typ;
    const ptr = raceptr(mtmp);

    if (isWaterTerrain(typ)) {
        if (isFlyer(ptr) || isFloater(ptr)) return false;
        if (swims(ptr) || amphibious(ptr)) return false;
        return true;
    }
    if (isLavaTerrain(typ)) {
        if (isFlyer(ptr) || isFloater(ptr)) return false;
        if (fireResistant(ptr)) return false;
        return true;
    }
    return false;
}
