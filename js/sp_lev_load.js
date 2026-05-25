// sp_lev_load.js — sp_lev.c load_special post-load_lua helpers.
// C ref: sp_lev.c link_doors_rooms, remove_boundary_syms, map_cleanup,
//        flip_level_rnd, solidify_map (load_special / sp_level_compilation tail).

import { insideRoomLikeC } from './hacklib.js';
import { rn2 } from './rng.js';
import { delEngrAt, engrAt } from './engrave.js';
import { tAt, delTrap } from './search.js';
import { floorObjKey, obliterateObjectInLevel } from './floorobj.js';
import {
    COLNO, ROWNO, ROOM, CROSSWALL, DOOR, SDOOR, IRONBARS,
    IS_WALL, IS_STWALL, IS_DOOR, IS_OBSTRUCTED, IS_POOL, IS_LAVA, IS_TREE,
    W_NONDIGGABLE, W_NONPASSWALL, ROOMOFFSET, OTYP_BOULDER, isok,
    MAGIC_PORTAL, VIBRATING_SQUARE,
} from './const.js';

/** C: rm.h IS_DOORJOIN */
function isDoorjoinTyp(typ) {
    return IS_OBSTRUCTED(typ) || typ === IRONBARS;
}

/**
 * C: sp_lev.c set_door_orientation — levl[][].horizontal for DOOR/SDOOR.
 * @param {import('./gstate.js').game} g
 */
export function setDoorOrientationLikeC(g, x, y) {
    const lev = g.level;
    const loc = lev?.at(x, y);
    if (!loc) return;
    let wleft = isok(x - 1, y) && (IS_WALL(lev.at(x - 1, y)?.typ)
        || IS_DOOR(lev.at(x - 1, y)?.typ) || lev.at(x - 1, y)?.typ === SDOOR);
    let wright = isok(x + 1, y) && (IS_WALL(lev.at(x + 1, y)?.typ)
        || IS_DOOR(lev.at(x + 1, y)?.typ) || lev.at(x + 1, y)?.typ === SDOOR);
    let wup = isok(x, y - 1) && (IS_WALL(lev.at(x, y - 1)?.typ)
        || IS_DOOR(lev.at(x, y - 1)?.typ) || lev.at(x, y - 1)?.typ === SDOOR);
    let wdown = isok(x, y + 1) && (IS_WALL(lev.at(x, y + 1)?.typ)
        || IS_DOOR(lev.at(x, y + 1)?.typ) || lev.at(x, y + 1)?.typ === SDOOR);
    if (!wleft && !wright && !wup && !wdown) {
        wleft = !isok(x - 1, y) || isDoorjoinTyp(lev.at(x - 1, y)?.typ);
        wright = !isok(x + 1, y) || isDoorjoinTyp(lev.at(x + 1, y)?.typ);
        wup = !isok(x, y - 1) || isDoorjoinTyp(lev.at(x, y - 1)?.typ);
        wdown = !isok(x, y + 1) || isDoorjoinTyp(lev.at(x, y + 1)?.typ);
    }
    loc.horizontal = ((wleft || wright) && !(wup && wdown)) ? 1 : 0;
}

/**
 * C: sp_lev.c shared_with_room
 * @param {import('./gstate.js').game} g
 * @param {object} droom
 */
function sharedWithRoomLikeC(g, x, y, droom) {
    const lev = g.level;
    const loc = lev?.at(x, y);
    if (!loc || !droom) return false;
    const rmno = (g.level.rooms.indexOf(droom) + ROOMOFFSET) | 0;
    if ((loc.roomno | 0) === rmno && !loc.edge) return false;
    if (isok(x - 1, y) && (lev.at(x - 1, y)?.roomno | 0) === rmno && (x - 1) <= (droom.hx | 0)) return true;
    if (isok(x + 1, y) && (lev.at(x + 1, y)?.roomno | 0) === rmno && (x + 1) >= (droom.lx | 0)) return true;
    if (isok(x, y - 1) && (lev.at(x, y - 1)?.roomno | 0) === rmno && (y - 1) <= (droom.hy | 0)) return true;
    if (isok(x, y + 1) && (lev.at(x, y + 1)?.roomno | 0) === rmno && (y + 1) >= (droom.ly | 0)) return true;
    return false;
}

/**
 * C: sp_lev.c maybe_add_door — calls mklev add_door when import available.
 * @param {import('./gstate.js').game} g
 * @param {(x: number, y: number, room: object) => void} addDoorFn
 */
function maybeAddDoorLikeC(g, x, y, droom, addDoorFn) {
    if ((droom.hx | 0) < 0) return;
    const lev = g.level;
    const loc = lev?.at(x, y);
    const rmno = (g.level.rooms.indexOf(droom) + ROOMOFFSET) | 0;
    if ((!droom.irregular && insideRoomLikeC(g, droom, x, y))
        || (loc && (loc.roomno | 0) === rmno)
        || sharedWithRoomLikeC(g, x, y, droom)) {
        addDoorFn(x, y, droom);
    }
}

/**
 * C: sp_lev.c link_doors_rooms
 * @param {import('./gstate.js').game} g
 * @param {(x: number, y: number, room: object) => void} addDoorFn — mklev add_door
 */
export function linkDoorsRoomsLikeC(g, addDoorFn) {
    const lev = g.level;
    if (!lev?.rooms?.length) return;
    for (let y = 0; y < ROWNO; y++) {
        for (let x = 0; x < COLNO; x++) {
            const typ = lev.at(x, y)?.typ;
            if (!IS_DOOR(typ) && typ !== SDOOR) continue;
            setDoorOrientationLikeC(g, x, y);
            for (const room of lev.rooms) {
                if (!room || (room.hx | 0) <= 0) continue;
                maybeAddDoorLikeC(g, x, y, room, addDoorFn);
                const subs = room.sbrooms;
                if (subs) {
                    for (const sub of subs) {
                        if (sub) maybeAddDoorLikeC(g, x, y, sub, addDoorFn);
                    }
                }
            }
        }
    }
}

/**
 * C: sp_lev.c remove_boundary_syms — CROSSWALL + SpLev_Map → ROOM.
 * @param {import('./gstate.js').game} g
 */
export function removeBoundarySymsLikeC(g) {
    const lev = g.level;
    if (!lev) return;
    const spMap = g.desCoder?.spLevMap;
    let hasBounds = false;
    for (let x = 0; x < COLNO - 1; x++) {
        for (let y = 0; y < ROWNO - 1; y++) {
            if (lev.at(x, y)?.typ === CROSSWALL) {
                hasBounds = true;
                break;
            }
        }
        if (hasBounds) break;
    }
    if (!hasBounds || !spMap) return;
    const xMax = g.x_maze_max | 0;
    const yMax = g.y_maze_max | 0;
    for (let x = 0; x < xMax; x++) {
        for (let y = 0; y < yMax; y++) {
            const loc = lev.at(x, y);
            if (loc?.typ === CROSSWALL && spMap[x]?.[y]) loc.typ = ROOM;
        }
    }
}

/**
 * C: trap.c undestroyable_trap subset for map_cleanup.
 * @param {number} ttyp
 */
/** C: trap.c undestroyable_trap */
function undestroyableTrapLikeC(ttyp) {
    return ttyp === MAGIC_PORTAL || ttyp === VIBRATING_SQUARE;
}

/**
 * C: sp_lev.c map_cleanup — remove objs/traps/engr on lava/pool.
 * @param {import('./gstate.js').game} g
 */
export function mapCleanupLikeC(g) {
    const lev = g.level;
    if (!lev) return;
    for (let x = 0; x < COLNO; x++) {
        for (let y = 0; y < ROWNO; y++) {
            const typ = lev.at(x, y)?.typ;
            if (!IS_LAVA(typ) && !IS_POOL(typ)) continue;
            const k = floorObjKey(x, y);
            let o = lev.floorObjHeads?.get(k) ?? null;
            while (o) {
                const next = o.nexthere ?? null;
                if ((o.otyp | 0) === OTYP_BOULDER) obliterateObjectInLevel(g, o);
                o = next;
            }
            const ttmp = tAt(x, y);
            if (ttmp && !undestroyableTrapLikeC(ttmp.ttyp | 0)) delTrap(ttmp);
            if (engrAt(x, y)) delEngrAt(x, y);
        }
    }
}

/**
 * C: sp_lev.c solidify_map — nondiggable walls outside des compiler map.
 * @param {import('./gstate.js').game} g
 */
export function solidifyMapLikeC(g) {
    const lev = g.level;
    const spMap = g.desCoder?.spLevMap;
    if (!lev || !spMap) return;
    for (let x = 0; x < COLNO; x++) {
        for (let y = 0; y < ROWNO; y++) {
            const loc = lev.at(x, y);
            if (!loc) continue;
            const typ = loc.typ | 0;
            if ((IS_STWALL(typ) || IS_TREE(typ)) && !spMap[x]?.[y]) {
                loc.wall_info = (loc.wall_info | 0) | W_NONDIGGABLE | W_NONPASSWALL;
            }
        }
    }
}

/**
 * C: sp_lev.c flip_level — full map transpose deferred (#wizfliplevel extras omitted).
 * @param {import('./gstate.js').game} g
 * @param {number} flp — bit 1 vertical, bit 2 horizontal
 * @param {boolean} extras
 */
export function flipLevelLikeC(g, flp, extras) {
    void g;
    void flp;
    void extras;
    /* C: sp_lev.c flip_level — terrain/monsters/objects/timer flip; deferred */
}

/**
 * C: sp_lev.c flip_level_rnd
 * @param {import('./gstate.js').game} g
 * @param {number} allowFlips — bitmask passed from des coder allow_flips
 * @param {boolean} extras — FALSE during load_special
 */
export function flipLevelRndLikeC(g, allowFlips, extras) {
    let c = 0;
    const flp = allowFlips | 0;
    if ((flp & 1) && rn2(2)) c |= 1;
    if ((flp & 2) && rn2(2)) c |= 2;
    if (c) flipLevelLikeC(g, c, extras);
}
