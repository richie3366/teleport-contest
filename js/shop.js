// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), adisturb(), costly_spot(); invent.c useupf() billing.

import { game } from './gstate.js';
import { pline } from './display.js';
import { unlinkFloorObject } from './floorobj.js';

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
