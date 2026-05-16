// walkable.js — Terrain blocking for hero/monster moves (shared stub).
// C ref: hack.c test_move(), may_passwall(); teleport.c goodpos(); monmove.c accessible().

import { game } from './gstate.js';
import {
    DOOR, D_CLOSED, D_LOCKED, IS_OBSTRUCTED, IS_STWALL, IRONBARS, W_NONPASSWALL, isok,
    POOL, MOAT, WATER, LAVAPOOL, LAVAWALL, OTYP_BOULDER,
} from './const.js';
import {
    isFlyer, isFloater, raceptr, swims, amphibious, fireResistant,
    passesWalls, throwsRocks, amorphous, passesBars,
} from './mondata.js';
import { floorObjKey } from './floorobj.js';

/**
 * C: hack.c may_passwall(x,y)
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function mayPasswall(x, y, g = game) {
    const loc = g.level?.at(x, y);
    if (!loc) return false;
    return !((IS_STWALL(loc.typ)) && ((loc.wall_info | 0) & W_NONPASSWALL));
}

/** C: monmove.c closed_door — loc must be from `g.level.at`. */
function isClosedDoorLoc(loc) {
    return loc.typ === DOOR && ((loc.doormask | 0) & (D_CLOSED | D_LOCKED)) !== 0;
}

/** C: mkobj.c / decl — boulder on floor stack (teleport.c goodpos `sobj_at(BOULDER, …)`). */
function sobjAtBoulder(x, y, g = game) {
    const heads = g.level?.floorObjHeads;
    if (!heads) return false;
    for (let o = heads.get(floorObjKey(x, y)) ?? null; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

/** C: youprop.h Passes_walls — intrinsic/extrinsic; else innate `passes_walls(raceptr(youmonst))`. */
function heroPassesWalls(g) {
    const u = /** @type {Record<string, unknown>} */ (g.u);
    if ((u?.HPasses_walls | 0) || (u?.EPasses_walls | 0) || (u?.Passes_walls | 0)) return true;
    return passesWalls(raceptr(g.youmonst));
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
 * C: hack.c test_move() — `IS_OBSTRUCTED || IRONBARS`, closed doors (no rock-eater / rust / ooze messages).
 * @param {*} ptr `raceptr(mtmp)` or `raceptr(youmonst)`.
 * @param {{ hero?: boolean }} [opts] hero: use `heroPassesWalls` for `Passes_walls` intrinsic/extrinsic.
 */
export function physicalObstacleBlocksBody(ptr, x, y, g = game, opts = {}) {
    const hero = !!opts.hero;
    if (!isok(x, y)) return true;
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    const typ = loc.typ;
    const passW = hero ? heroPassesWalls(g) : passesWalls(ptr);

    if (IS_OBSTRUCTED(typ) || typ === IRONBARS) {
        if (passW && mayPasswall(x, y, g)) return false;
        if (typ === IRONBARS && (passW || passesBars(ptr))) return false;
        return true;
    }
    if (isClosedDoorLoc(loc)) return true;
    return false;
}

/**
 * True if (x,y) cannot be walked onto by the **hero** (walls, stone, iron bars, closed doors).
 * C ref: hack.c test_move() obstructed + door slice.
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function blocksMovementAt(x, y, g = game) {
    return physicalObstacleBlocksBody(raceptr(g.youmonst), x, y, g, { hero: true });
}

/**
 * C: teleport.c goodpos() — order: pool/lava; passes_walls+may_passwall; amorphous+closed_door;
 * physical obstacle (`physicalObstacleBlocksBody`); boulder unless throws_rocks (covers boulder-in-pit).
 * @param {{ data?: unknown }} mtmp
 */
export function terrainBlocksDisplaceForMon(mtmp, x, y, g = game) {
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    const typ = loc.typ;
    const ptr = raceptr(mtmp);

    if (isWaterTerrain(typ) || isLavaTerrain(typ)) {
        if (physicalObstacleBlocksBody(ptr, x, y, g, { hero: false })) return true;
        return liquidTerrainBlocksRaceptr(ptr, typ);
    }

    if (passesWalls(ptr) && mayPasswall(x, y, g)) return false;

    if (amorphous(ptr) && isClosedDoorLoc(loc)) return false;

    if (physicalObstacleBlocksBody(ptr, x, y, g, { hero: false })) return true;

    if (sobjAtBoulder(x, y, g) && !throwsRocks(ptr)) return true;

    return false;
}

/**
 * C: teleport.c goodpos() for hero destination — Levitation/Flying on liquids; `Fire_resistance`;
 * passes_walls / boulder same structure as mon.
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function terrainBlocksDisplaceForHero(x, y, g = game) {
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    const typ = loc.typ;
    const ptr = raceptr(g.youmonst);

    if (isWaterTerrain(typ) || isLavaTerrain(typ)) {
        if (physicalObstacleBlocksBody(ptr, x, y, g, { hero: true })) return true;
        const u = /** @type {{ Levitation?: number, Flying?: number, Fire_resistance?: number }} */ (g.u);
        if (u?.Levitation || u?.Flying) return false;
        if (!liquidTerrainBlocksRaceptr(ptr, typ)) return false;
        if (isLavaTerrain(typ) && u?.Fire_resistance) return false;
        return true;
    }

    if (heroPassesWalls(g) && mayPasswall(x, y, g)) return false;

    if (amorphous(ptr) && isClosedDoorLoc(loc)) return false;

    if (physicalObstacleBlocksBody(ptr, x, y, g, { hero: true })) return true;

    if (sobjAtBoulder(x, y, g) && !throwsRocks(ptr)) return true;

    return false;
}
