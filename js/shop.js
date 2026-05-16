// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), adisturb(), costly_spot(), add_damage(); invent.c useupf() billing;
//        hack.c in_rooms() for **`SHOPBASE`**.

import { game } from './gstate.js';
import { pline } from './display.js';
import { unlinkFloorObject } from './floorobj.js';
import { cansee } from './vision.js';
import {
    OROOM,
    NO_ROOM,
    SHARED,
    SHARED_PLUS,
    ROOMOFFSET,
    SHOPBASE,
    UNIQUESHOP,
    IS_DOOR,
    SVALL,
    SHOP_DOOR_COST,
    ESHK,
    COLNO,
    ROWNO,
} from './const.js';

/**
 * C: hack.c **`in_rooms`** **`goodtype`** for **`SHOPBASE`** (shop + specialized shops).
 * @param {number} rt
 */
function rtypeIsShopClassForInRooms(rt) {
    const t = rt | 0;
    return t === SHOPBASE || (t > SHOPBASE && t <= UNIQUESHOP);
}

/** C: `svr.rooms[rno - ROOMOFFSET].rtype` — **JS** **`g.level.rooms`** index. */
function roomRtypeForLevlRoomno(g, roomno) {
    const idx = (roomno | 0) - ROOMOFFSET;
    if (idx < 0) return OROOM;
    const room = g.level?.rooms?.[idx];
    if (!room || (room.hx | 0) < 0) return OROOM;
    return room.rtype ?? OROOM;
}

/** C: hack.c **`in_rooms`** **`goodtype`** for **`SHOPBASE`** (matches **`rtype`** test). */
function roomnoIsShopbaseForInRooms(g, roomno) {
    const rt = roomRtypeForLevlRoomno(g, roomno);
    return rtypeIsShopClassForInRooms(rt);
}

/**
 * C: hack.c **`in_rooms`** **`SHOPBASE`** branch — append **`roomno`** if **`>= ROOMOFFSET`**,
 * **`goodtype`**, and not already listed (C **`strchr(ptr, rno)`**).
 * @param {import('./gstate.js').game} g
 * @param {number[]} acc
 * @param {number} roomno
 */
function pushShopbaseRoomnoUnique(g, acc, roomno) {
    const rn = roomno | 0;
    if (rn < ROOMOFFSET) return;
    if (!roomnoIsShopbaseForInRooms(g, rn)) return;
    if (acc.includes(rn)) return;
    acc.push(rn);
}

/**
 * C: hack.c **`in_rooms(x, y, SHOPBASE)`** — **`SHARED`** / **`SHARED_PLUS`** neighbor scan
 * (**`step`** 2 vs 1, same **`min_x`/`max_x`/`min_y`/`max_y_offset`** edge rules).
 * @param {import('./gstate.js').game} g
 * @param {number} cx
 * @param {number} cy
 * @param {number} step
 * @returns {number[]}
 */
function inRoomsShopbaseSharedNeighborScan(g, cx, cy, step) {
    let min_x = cx - 1;
    let max_x = cx + 1;
    if (cx < 1) min_x += step;
    else if (cx >= COLNO) max_x -= step;

    let min_y = cy - 1;
    let max_y_offset = 2;
    if (min_y < 0) {
        min_y += step;
        max_y_offset -= step;
    } else if (min_y + max_y_offset >= ROWNO) max_y_offset -= step;

    const out = [];
    for (let xx = min_x; xx <= max_x; xx += step) {
        let yOff = 0;
        let loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
        yOff += step;
        if (yOff > max_y_offset) continue;
        loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
        yOff += step;
        if (yOff > max_y_offset) continue;
        loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
    }
    return out;
}

/**
 * C: hack.c **`in_rooms(x, y, SHOPBASE)`** — full **`SHARED`** and **`SHARED_PLUS`** handling.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @returns {number[]} `levl.roomno` values (C stores as **`char`** IDs).
 */
export function inRoomsShopbaseRoomnos(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return [];
    const rno = loc.roomno | 0;
    if (rno === NO_ROOM || rno === 0) return [];
    if (rno === SHARED) return inRoomsShopbaseSharedNeighborScan(g, x | 0, y | 0, 2);
    if (rno === SHARED_PLUS) return inRoomsShopbaseSharedNeighborScan(g, x | 0, y | 0, 1);
    const rt = roomRtypeForLevlRoomno(g, rno);
    if (!rtypeIsShopClassForInRooms(rt)) return [];
    return [rno];
}

/** C: shk.c shop_keeper(roomno) — **`ESHK`.shoproom** matches **`roomno - ROOMOFFSET`**. */
function shopKeeperForLevlRoomno(g, roomno) {
    const idx = (roomno | 0) - ROOMOFFSET;
    if (idx < 0) return null;
    for (const m of g.level?.monsters ?? []) {
        if (!(m.isshk | 0)) continue;
        const e = ESHK(m);
        if (!e) continue;
        if ((e.shoproom | 0) === idx) return m;
    }
    return null;
}

/**
 * C: shk.c add_damage(x, y, cost) — door entrance check; **`damagelist`** merge; **`seenv`** if **`cansee`**.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} cost
 */
export function addDamageAt(g, x, y, cost) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return;
    if (IS_DOOR(loc.typ)) {
        const rnos = inRoomsShopbaseRoomnos(g, x, y);
        let matched = false;
        for (let i = 0; i < rnos.length; i++) {
            const roomno = rnos[i];
            const mtmp = shopKeeperForLevlRoomno(g, roomno);
            const e = ESHK(mtmp);
            const sx = e?.shd?.x;
            const sy = e?.shd?.y;
            if (mtmp && e && (sx | 0) === (x | 0) && (sy | 0) === (y | 0)) {
                matched = true;
                break;
            }
        }
        if (!matched) return;
    }
    const lvl = g.level;
    if (!lvl) return;
    if (!lvl.damagelist) lvl.damagelist = [];
    const list = lvl.damagelist;
    const when = g.moves ?? 0;
    const ex = list.find((d) => (d.x | 0) === (x | 0) && (d.y | 0) === (y | 0));
    if (ex) {
        ex.cost = (ex.cost | 0) + (cost | 0);
        ex.when = when;
    } else {
        list.push({
            x: x | 0,
            y: y | 0,
            cost: cost | 0,
            when,
            typ: loc.typ | 0,
            flags: loc.flags | 0,
        });
    }
    if (cansee(x | 0, y | 0)) loc.seenv = SVALL;
}

/**
 * C: zap.c zap_over_floor — **`if (*in_rooms(…,SHOPBASE))`** **`add_damage`** before **`lev->doormask`**.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} type
 * @param {{ value?: boolean }|null} shopdamage
 */
export function applyZapShopDoorDamage(g, x, y, type, shopdamage) {
    const rnos = inRoomsShopbaseRoomnos(g, x, y);
    if (rnos.length === 0) return;
    if ((type | 0) >= 0) {
        addDamageAt(g, x, y, SHOP_DOOR_COST);
        if (shopdamage) shopdamage.value = true;
    } else {
        addDamageAt(g, x, y, 0);
    }
}

/** C: fix_shop_damage() — repair shop walls after restore. */
export function fixShopDamage() {
}

/**
 * C: shk.c costly_spot(x,y) — hero in shop interior (not shk square).
 * Stub: only checks level flag; **`inside_shop`/`shop_keeper`** not wired.
 * @param {object} [g]
 * @param {number} x
 * @param {number} y
 */
export function costlySpot(g = game, x, y) {
    void x;
    void y;
    if (!(g.level?.flags?.has_shop | 0)) return false;
    return false;
}

/**
 * C: shk.c addtobill(otmp, …) — unpaid hero destruction in shop.
 * @param {object} _g
 * @param {object} _otmp
 * @param {number} _n
 */
function addtobillFloorStub(_g, _otmp, _n) {
    void _g;
    void _otmp;
    void _n;
}

function removeFloorObjFromLevel(g, otmp) {
    unlinkFloorObject(otmp);
    const arr = g.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/**
 * C: invent.c useupf(obj, numused) — floor stack: **`costly_spot`** billing then **`delobj`** /
 * decrement **`quan`**. Omits **`splitobj`** (mutate stack in place), **`hideunder`**, **`mon_moving`**.
 * @param {typeof game} [g]
 * @param {{ ox?: number, oy?: number, quan?: number }} obj
 * @param {number} numused
 */
export function useupfFloor(g = game, obj, numused) {
    const scrquan = obj.quan ?? 1;
    const n = Math.min(Math.max(0, numused | 0), scrquan);
    if (n <= 0) return;

    /* C: !svc.context.mon_moving — not ported; hero burn_floor_objects is always hero. */
    if (costlySpot(g, obj.ox | 0, obj.oy | 0)) {
        /* C: strchr(u.urooms, *in_rooms(...)) ? addtobill : stolen_value — stubs until shk/in_rooms. */
        addtobillFloorStub(g, obj, n);
    }

    if (n >= scrquan) removeFloorObjFromLevel(g, obj);
    else obj.quan = scrquan - n;
}

/**
 * C: shk.c adisturb (subset) — peaceful shopkeeper / temple priest / vault guard
 * becomes hostile when struck. No-op if not those roles or already hostile.
 * @param {{ mpeaceful?: number, isshk?: number, ispriest?: number, isgd?: number, mAngry?: number }} mtmp
 */
export async function adisturb(mtmp) {
    if (!mtmp) return;
    const m = /** @type {Record<string, unknown>} */ (mtmp);
    if (!(m.isshk || m.ispriest || m.isgd)) return;
    if (!(mtmp.mpeaceful | 0)) return;
    mtmp.mpeaceful = 0;
    m.mAngry = 1;
    if (m.isshk) await pline('The shopkeeper gets angry!');
    else if (m.ispriest) await pline('The priest gets angry!');
    else await pline('The guard gets angry!');
}
