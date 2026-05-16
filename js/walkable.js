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
 * True when water/lava at `typ` blocks this body (land-bound on that liquid).
 * @param {*} ptr
 * @param {number} typ
 */
function liquidTerrainBlocksRaceptr(ptr, typ) {
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
    if (!isWaterTerrain(typ) && !isLavaTerrain(typ)) return false;
    return liquidTerrainBlocksRaceptr(raceptr(mtmp), typ);
}

/**
 * C: mon.c goodpos() — hero moving onto (x,y) for peaceful swap: Levitation/Flying clear liquids;
 * lava also cleared by extrinsic `Fire_resistance` when innate `MR_FIRE` is absent.
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function terrainBlocksDisplaceForHero(x, y, g = game) {
    if (blocksMovementAt(x, y, g)) return true;
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    const typ = loc.typ;
    if (!isWaterTerrain(typ) && !isLavaTerrain(typ)) return false;

    const u = /** @type {{ Levitation?: number, Flying?: number, Fire_resistance?: number }} */ (g.u);
    if (u?.Levitation || u?.Flying) return false;

    const ptr = raceptr(g.youmonst);
    if (!liquidTerrainBlocksRaceptr(ptr, typ)) return false;
    if (isLavaTerrain(typ) && u?.Fire_resistance) return false;
    return true;
}
