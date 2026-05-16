// floorobj.js — Floor object chains (nexthere) at (x,y).
// C ref: mkobj.c place_object(), rm.c / invent floor lists;
//        dig.c bury_objs() / unearth_objs() (**`buriedObjHeads`**).
//
// Shared by mklev.js and trap/missile code so traps can drop projectiles
// without importing the full level generator.

import { game } from './gstate.js';

export function floorObjKey(x, y) {
    return `${x},${y}`;
}

/** C: take off chain before move — remove otmp from floorObjHeads at its coords. */
export function unlinkFloorObject(otmp) {
    const lvl = game.level;
    if (!lvl?.floorObjHeads || !otmp || otmp.ox < 0 || otmp.oy < 0) return;
    const k = floorObjKey(otmp.ox, otmp.oy);
    const head = lvl.floorObjHeads.get(k) ?? null;
    if (head === otmp) {
        if (otmp.nexthere) lvl.floorObjHeads.set(k, otmp.nexthere);
        else lvl.floorObjHeads.delete(k);
    } else if (head) {
        let cur = head;
        while (cur?.nexthere) {
            if (cur.nexthere === otmp) {
                cur.nexthere = otmp.nexthere;
                break;
            }
            cur = cur.nexthere;
        }
    }
    otmp.nexthere = null;
}

/**
 * C: dig.c **`bury_objs`** — entire floor **`nexthere`** chain at **`(x,y)`** moves to **`buriedObjHeads`**.
 * Shop **`stolen_value`** / **`no_charge`** omitted; objects stay in **`level.objects`**.
 * @param {import('./gstate.js').game} g
 */
export function buryFloorChainAt(g, x, y) {
    const lvl = g.level;
    if (!lvl?.floorObjHeads) return;
    const k = floorObjKey(x | 0, y | 0);
    const floorHead = lvl.floorObjHeads.get(k);
    if (!floorHead) return;
    lvl.floorObjHeads.delete(k);
    if (!lvl.buriedObjHeads) lvl.buriedObjHeads = new Map();
    const buriedPrev = lvl.buriedObjHeads.get(k) ?? null;
    let tail = floorHead;
    while (tail.nexthere) tail = tail.nexthere;
    tail.nexthere = buriedPrev;
    lvl.buriedObjHeads.set(k, floorHead);
}

/**
 * C: dig.c **`unearth_objs`** — buried chain at **`(x,y)`** prepended onto floor stack.
 * **`buried_ball`** / **`ROT_ORGANIC`** **`stop_timer`** / **`stackobj`** not ported.
 * @param {import('./gstate.js').game} g
 */
export function unearthBuriedChainAt(g, x, y) {
    const lvl = g.level;
    if (!lvl?.buriedObjHeads) return;
    const k = floorObjKey(x | 0, y | 0);
    const buriedHead = lvl.buriedObjHeads.get(k);
    if (!buriedHead) return;
    lvl.buriedObjHeads.delete(k);
    if (!lvl.floorObjHeads) lvl.floorObjHeads = new Map();
    const floorPrev = lvl.floorObjHeads.get(k) ?? null;
    let tail = buriedHead;
    while (tail.nexthere) tail = tail.nexthere;
    tail.nexthere = floorPrev;
    lvl.floorObjHeads.set(k, buriedHead);
}

/** C: mkobj.c place_object(otmp, x, y) */
export function placeFloorObject(otmp, x, y) {
    const lvl = game.level;
    if (!lvl || !otmp) return;
    if (otmp.ox >= 0 && otmp.oy >= 0 && (otmp.ox !== x || otmp.oy !== y)) unlinkFloorObject(otmp);
    if (!lvl.floorObjHeads) lvl.floorObjHeads = new Map();
    const k = floorObjKey(x, y);
    otmp.ox = x;
    otmp.oy = y;
    const prev = lvl.floorObjHeads.get(k) ?? null;
    otmp.nexthere = prev;
    lvl.floorObjHeads.set(k, otmp);
    if (!lvl.objects.includes(otmp)) lvl.objects.push(otmp);
}
