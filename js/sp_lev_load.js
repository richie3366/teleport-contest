// sp_lev_load.js — sp_lev.c load_special post-load_lua helpers.
// C ref: sp_lev.c link_doors_rooms, remove_boundary_syms, map_cleanup,
//        flip_level_rnd, solidify_map (load_special / sp_level_compilation tail).

import { insideRoomLikeC } from './hacklib.js';
import { rn2 } from './rng.js';
import { delEngrAt, engrAt } from './engrave.js';
import { tAt, delTrap } from './search.js';
import { floorObjKey, obliterateObjectInLevel } from './floorobj.js';
import {
    COLNO, ROWNO, STONE, ROOM, CROSSWALL, DOOR, SDOOR, IRONBARS,
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
 * C: mklev.c get_level_extends — bounds for flip_level (subset of mklev finalize).
 * @param {import('./gstate.js').game} g
 */
function getLevelExtendsFlipLikeC(g) {
    const map = g.level;
    if (!map) return { minx: 1, maxx: COLNO - 1, miny: 0, maxy: ROWNO - 1 };
    let xmin = 0;
    let xmax = COLNO - 1;
    let ymin = 0;
    let ymax = ROWNO - 1;
    let found = false;
    let nonwall = false;
    for (xmin = 0; !found && xmin <= COLNO - 1; xmin++) {
        for (let y = 0; y <= ROWNO - 1; y++) {
            const typ = map.at(xmin, y)?.typ ?? STONE;
            if (typ !== STONE) {
                found = true;
                if (!IS_WALL(typ)) nonwall = true;
            }
        }
    }
    xmin -= (nonwall || !map.flags?.is_maze_lev) ? 2 : 1;
    found = false;
    nonwall = false;
    for (xmax = COLNO - 1; !found && xmax >= 0; xmax--) {
        for (let y = 0; y <= ROWNO - 1; y++) {
            const typ = map.at(xmax, y)?.typ ?? STONE;
            if (typ !== STONE) {
                found = true;
                if (!IS_WALL(typ)) nonwall = true;
            }
        }
    }
    xmax += (nonwall || !map.flags?.is_maze_lev) ? 2 : 1;
    found = false;
    nonwall = false;
    for (ymin = 0; !found && ymin <= ROWNO - 1; ymin++) {
        for (let x = xmin; x <= xmax; x++) {
            const typ = map.at(x, ymin)?.typ ?? STONE;
            if (typ !== STONE) {
                found = true;
                if (!IS_WALL(typ)) nonwall = true;
            }
        }
    }
    ymin -= (nonwall || !map.flags?.is_maze_lev) ? 2 : 1;
    found = false;
    nonwall = false;
    for (ymax = ROWNO - 1; !found && ymax >= 0; ymax--) {
        for (let x = xmin; x <= xmax; x++) {
            const typ = map.at(x, ymax)?.typ ?? STONE;
            if (typ !== STONE) {
                found = true;
                if (!IS_WALL(typ)) nonwall = true;
            }
        }
    }
    ymax += (nonwall || !map.flags?.is_maze_lev) ? 2 : 1;
    let minx = xmin | 0;
    let maxx = xmax | 0;
    let miny = ymin | 0;
    let maxy = ymax | 0;
    if (miny < 0) miny = 0;
    if (minx < 1) minx = 1;
    if (maxx >= COLNO) maxx = COLNO - 1;
    if (maxy >= ROWNO) maxy = ROWNO - 1;
    return { minx, maxx, miny, maxy };
}

/** @param {object} otmp @param {number} x @param {number} y */
function relinkFloorChainCoords(otmp, x, y) {
    for (let o = otmp; o; o = o.nexthere) {
        o.ox = x | 0;
        o.oy = y | 0;
    }
}

/**
 * @param {import('./gstate.js').game} g
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function swapFloorHeadsFlipLikeC(g, x1, y1, x2, y2) {
    const heads = g.level?.floorObjHeads;
    if (!heads) return;
    const k1 = floorObjKey(x1, y1);
    const k2 = floorObjKey(x2, y2);
    const h1 = heads.get(k1);
    const h2 = heads.get(k2);
    if (h1) relinkFloorChainCoords(h1, x2, y2);
    if (h2) relinkFloorChainCoords(h2, x1, y1);
    if (h1) heads.set(k2, h1);
    else heads.delete(k2);
    if (h2) heads.set(k1, h2);
    else heads.delete(k1);
}

/**
 * @param {import('./game.js').GameMap} map
 */
function swapLocCellsFlipLikeC(map, x1, y1, x2, y2) {
    const a = map.at(x1, y1);
    const b = map.at(x2, y2);
    if (!a || !b) return;
    const tmp = { ...a };
    Object.assign(a, b);
    Object.assign(b, tmp);
}

/**
 * C: sp_lev.c flip_level — level-creation subset (`extras` false); #wizfliplevel deferred.
 * @param {import('./gstate.js').game} g
 * @param {number} flp — bit 1 vertical, bit 2 horizontal
 * @param {boolean} extras
 */
export function flipLevelLikeC(g, flp, extras) {
    const bits = flp | 0;
    if ((bits & 3) === 0) return;
    if (extras) return;
    const map = g.level;
    if (!map) return;
    const { minx, maxx, miny, maxy } = getLevelExtendsFlipLikeC(g);
    const flipY = (y) => (maxy - (y | 0)) + miny;
    const flipX = (x) => (maxx - (x | 0)) + minx;

    for (let st = g.stairs; st; st = st.next) {
        if (bits & 1) st.sy = flipY(st.sy | 0);
        if (bits & 2) st.sx = flipX(st.sx | 0);
    }

    for (const t of map.traps || []) {
        const tx = t.tx | 0;
        const ty = t.ty | 0;
        if (tx < minx || tx > maxx || ty < miny || ty > maxy) continue;
        if (bits & 1) t.ty = flipY(ty);
        if (bits & 2) t.tx = flipX(tx);
    }

    for (const m of map.monsters || []) {
        const mx = m.mx | 0;
        const my = m.my | 0;
        if (!mx && !my) continue;
        if (mx < minx || mx > maxx || my < miny || my > maxy) continue;
        if (bits & 1) m.my = flipY(my);
        if (bits & 2) m.mx = flipX(mx);
    }

    if (bits & 1) {
        const half = miny + Math.trunc((maxy - miny + 1) / 2);
        for (let x = minx; x <= maxx; x++) {
            for (let y = miny; y < half; y++) {
                const ny = flipY(y);
                swapLocCellsFlipLikeC(map, x, y, x, ny);
                swapFloorHeadsFlipLikeC(g, x, y, x, ny);
            }
        }
    }
    if (bits & 2) {
        const half = minx + Math.trunc((maxx - minx + 1) / 2);
        for (let x = minx; x < half; x++) {
            const nx = flipX(x);
            for (let y = miny; y <= maxy; y++) {
                swapLocCellsFlipLikeC(map, x, y, nx, y);
                swapFloorHeadsFlipLikeC(g, x, y, nx, y);
            }
        }
    }
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
