// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), repair_damage(), repairable_damage(), shk_impaired(), next_shkp();
//        adisturb(), costly_spot(), add_damage(); invent.c useupf() billing;
//        hack.c in_rooms() for **`SHOPBASE`**.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { unlinkFloorObject, floorObjKey } from './floorobj.js';
import { cansee, vision_recalc } from './vision.js';
import { delEngrAt } from './engrave.js';
import { raceptr, passesWalls } from './mondata.js';
import { heroPassesWalls } from './walkable.js';
import {
    OROOM,
    NO_ROOM,
    SHARED,
    SHARED_PLUS,
    ROOMOFFSET,
    SHOPBASE,
    UNIQUESHOP,
    IS_DOOR,
    IS_ROOM,
    SVALL,
    SHOP_DOOR_COST,
    ESHK,
    COLNO,
    ROWNO,
    REPAIR_DELAY,
    D_BROKEN,
    D_CLOSED,
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

/**
 * C: **`mextra.h`** **`eshk.shoproom`** is **`(sroom - svr.rooms) + ROOMOFFSET`** (**`shknam.c`**), i.e. **`levl.roomno`** form.
 * Accept legacy **`0..n-1`** index if **`shoproom < ROOMOFFSET`**.
 * @param {*} [eshk]
 */
function eshkShoproomAsLevlRno(eshk) {
    const s = eshk?.shoproom | 0;
    if (s >= ROOMOFFSET) return s;
    return s + ROOMOFFSET;
}

/** C: shk.c **`shop_keeper(rmno)`** — find resident shk for **`levl.roomno`** **`rmno`**. */
function shopKeeperForLevlRoomno(g, roomno) {
    const target = roomno | 0;
    if (target < ROOMOFFSET) return null;
    for (const m of g.level?.monsters ?? []) {
        if (!(m.isshk | 0)) continue;
        const e = ESHK(m);
        if (!e) continue;
        if (eshkShoproomAsLevlRno(e) === target) return m;
    }
    return null;
}

/** C: dungeon.c **`on_level(&eshk->shoplevel, &u.uz)`** — stub **`dnum`** when missing. */
function onLevelWithHero(g, shoplevel) {
    const uz = g.u?.uz;
    if (!uz) return true;
    if (!shoplevel || shoplevel.dlevel == null) return true;
    const dnum = shoplevel.dnum != null ? shoplevel.dnum | 0 : uz.dnum | 0;
    return (shoplevel.dlevel | 0) === (uz.dlevel | 0) && dnum === (uz.dnum | 0);
}

/** C: shk.c **`inhishop(shkp)`** */
function inHishop(g, shkp) {
    const e = ESHK(shkp);
    if (!shkp || !(shkp.isshk | 0) || !e) return false;
    if (!onLevelWithHero(g, e.shoplevel)) return false;
    const rnos = inRoomsShopbaseRoomnos(g, shkp.mx | 0, shkp.my | 0);
    return rnos.includes(eshkShoproomAsLevlRno(e));
}

/** C: mon.c **`helpless`** subset (**`mfrozen`/`mcanmove`**). */
function helplessShk(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/** C: shk.c **`shk_impaired`** */
function shkImpaired(g, shkp) {
    if (!shkp || !(shkp.isshk | 0)) return true;
    if (!inHishop(g, shkp)) return true;
    const e = ESHK(shkp);
    if (helplessShk(shkp) || (e?.following | 0)) return true;
    return false;
}

/** C: trap.c **`t_at`** using **`g.level.traps`**. */
function trapAtIn(g, x, y) {
    const traps = g.level?.traps;
    if (!traps?.length) return null;
    return traps.find((t) => (t.tx | 0) === (x | 0) && (t.ty | 0) === (y | 0)) ?? null;
}

function delTrapIn(g, trap) {
    const traps = g.level?.traps;
    if (!traps) return;
    const i = traps.indexOf(trap);
    if (i >= 0) traps.splice(i, 1);
}

/** C: mon.c **`m_at`** on **`g.level.monsters`**. */
function monAtG(g, x, y) {
    return g.level?.monsters?.find((m) => (m.mx | 0) === (x | 0) && (m.my | 0) === (y | 0)) ?? null;
}

/** C: shk.c **`repairable_damage`** */
function repairableDamage(g, shkp, dam) {
    if (!dam || shkImpaired(g, shkp)) return false;
    const x = dam.x | 0;
    const y = dam.y | 0;
    const e = ESHK(shkp);
    if (!e) return false;
    if ((g.moves | 0) - (dam.when | 0) < REPAIR_DELAY) return false;

    const loc = g.level?.at(x, y);
    if (!loc) return false;

    const savedTyp = dam.typ | 0;
    if (!IS_ROOM(savedTyp)) {
        const ux = g.u?.ux | 0;
        const uy = g.u?.uy | 0;
        if (ux === x && uy === y && !heroPassesWalls(g)) return false;
        if ((shkp.mx | 0) === x && (shkp.my | 0) === y) return false;
        const mtmp = monAtG(g, x, y);
        if (mtmp && !passesWalls(raceptr(mtmp))) return false;
    }
    const ttmp = trapAtIn(g, x, y);
    if (ttmp) {
        const ux = g.u?.ux | 0;
        const uy = g.u?.uy | 0;
        if (ux === x && uy === y) return false;
        const mtmp2 = monAtG(g, x, y);
        if (mtmp2 && (mtmp2.mtrapped | 0)) return false;
    }
    const shopR = eshkShoproomAsLevlRno(e);
    if (!inRoomsShopbaseRoomnos(g, x, y).includes(shopR)) return false;
    return true;
}

/**
 * C: shk.c **`repair_damage(shkp, tmp_dam, TRUE)`** subset for **`fix_shop_damage`** catch-up:
 * trap removal (**`deltrap`** without **`mksobj`/`mpickobj`** yet), wall/door terrain restore.
 * Omits **`litter_scatter`/`block_point`/`picking_at`**; defers if floor objects at **`(x,y)`**.
 * @returns {boolean} whether damage entry should be discarded (**C non-zero **`repair_damage`**).
 */
function repairDamageCatchup(g, shkp, dam) {
    if (!repairableDamage(g, shkp, dam)) return false;
    const x = dam.x | 0;
    const y = dam.y | 0;
    const loc = g.level?.at(x, y);
    if (!loc) return false;

    const heads = g.level?.floorObjHeads;
    if (heads?.get(floorObjKey(x, y))) return false;

    let disposition = 1;
    const ttmp = trapAtIn(g, x, y);
    if (ttmp) {
        delTrapIn(g, ttmp);
        delEngrAt(x, y);
        if (cansee(x, y)) newsym(x, y);
        disposition = 3;
    }

    const savedTyp = dam.typ | 0;
    const curTyp = loc.typ | 0;
    const curMask = loc.doormask | 0;
    if (IS_ROOM(savedTyp) || (savedTyp === curTyp && (!IS_DOOR(savedTyp) || curMask > D_BROKEN))) {
        return disposition !== 0;
    }

    loc.typ = savedTyp;
    if (IS_DOOR(savedTyp)) loc.doormask = D_CLOSED;
    else loc.flags = dam.flags | 0;

    delEngrAt(x, y);
    if (cansee(x, y)) newsym(x, y);
    vision_recalc(1);

    return disposition !== 0;
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

/**
 * C: shk.c **`fix_shop_damage()`** — on restore, each unimpaired in-shop shk **`repair_damage(..., TRUE)`**
 * on **`level.damagelist`** entries (**`discard_damage_struct`**).
 * @param {import('./gstate.js').game} [g]
 */
export function fixShopDamage(g = game) {
    const list = g.level?.damagelist;
    if (!list?.length) return;

    const monsters = g.level?.monsters ?? [];
    for (const shkp of monsters) {
        if (!(shkp.isshk | 0)) continue;
        if (shkImpaired(g, shkp)) continue;
        for (let i = list.length - 1; i >= 0; i--) {
            const damg = list[i];
            if (repairDamageCatchup(g, shkp, damg)) list.splice(i, 1);
        }
    }
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
