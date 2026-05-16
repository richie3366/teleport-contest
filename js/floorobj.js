// floorobj.js — Floor object chains (nexthere) at (x,y).
// C ref: mkobj.c place_object(), rm.c / invent floor lists;
//        dig.c bury_objs() / unearth_objs() (**`buriedObjHeads`**, **`stackobj`**, **`buried_ball`** subset).
//
// Shared by mklev.js and trap/missile code so traps can drop projectiles
// without importing the full level generator.

import { game } from './gstate.js';
import { NH5_BALL_CLASS } from './nh5_objclass.js';
import { TT_BURIEDBALL, ROT_ORGANIC } from './const.js';
import { stopNhObjTimer } from './obj_rot_timer.js';

/** C: mkobj_corpse.js **`CORPSE_OTYP`** — local literal avoids **`floorobj`↔`mkobj_corpse`** import cycle. */
const CORPSE_OTYP = 471;

export function floorObjKey(x, y) {
    return `${x},${y}`;
}

/** C: invent.c **`mergable(otmp, obj)`** subset for floor **`stackobj`** (no glob / oil / rider / bill). */
function mergableFloorStackSubset(otmp, obj) {
    if (!otmp || !obj || otmp === obj) return false;
    if ((otmp.otyp | 0) !== (obj.otyp | 0)) return false;
    if ((otmp.nomerge | 0) || (obj.nomerge | 0)) return false;
    if ((otmp.cursed | 0) !== (obj.cursed | 0) || (otmp.blessed | 0) !== (obj.blessed | 0)) return false;
    if ((otmp.unpaid | 0) !== (obj.unpaid | 0) || (otmp.no_charge | 0) !== (obj.no_charge | 0)) return false;
    if ((otmp.spe | 0) !== (obj.spe | 0)) return false;
    if ((otmp.otyp | 0) === CORPSE_OTYP && (otmp.corpsenm | 0) !== (obj.corpsenm | 0)) return false;
    return true;
}

/**
 * C: invent.c **`stackobj(obj)`** after **`place_object`** — merge **`obj`** into another floor stack at **`(ox,oy)`**.
 * Survivor is **`obj`** (C **`merged(&obj,&otmp)`** absorbs **`otmp`** into **`obj`**).
 * @returns {boolean} true when **`obj`** absorbed another stack (**`merged`** path)
 */
export function stackObjOnFloorInLevel(g, obj) {
    const lvl = g.level;
    if (!lvl?.floorObjHeads || !obj) return false;
    const k = floorObjKey(obj.ox | 0, obj.oy | 0);
    const head = lvl.floorObjHeads.get(k);
    for (let otmp = head; otmp; otmp = otmp.nexthere) {
        if (otmp === obj) continue;
        if (!mergableFloorStackSubset(obj, otmp)) continue;
        obj.quan = (obj.quan | 0) + (otmp.quan | 0);
        obj.owt = Math.max(1, (obj.owt | 0) + (otmp.owt | 0));
        unlinkFloorObjectInLevel(g, otmp);
        const arr = lvl.objects;
        if (arr) {
            const i = arr.indexOf(otmp);
            if (i >= 0) arr.splice(i, 1);
        }
        otmp.nexthere = null;
        return true;
    }
    return false;
}

/** C: take off chain before move — remove otmp from floorObjHeads at its coords (**`game.level`**). */
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

/** C: **`unlinkFloorObject`** with explicit **`g.level`** (avoid **`game`** mismatch). */
export function unlinkFloorObjectInLevel(g, otmp) {
    const lvl = g.level;
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

/** C: **`rm.c`**-style remove from **`buriedObjHeads`** at **`otmp.ox`/`otmp.oy`**. */
export function unlinkBuriedObjectInLevel(g, otmp) {
    const lvl = g.level;
    if (!lvl?.buriedObjHeads || !otmp || otmp.ox < 0 || otmp.oy < 0) return;
    const k = floorObjKey(otmp.ox, otmp.oy);
    const head = lvl.buriedObjHeads.get(k) ?? null;
    if (head === otmp) {
        if (otmp.nexthere) lvl.buriedObjHeads.set(k, otmp.nexthere);
        else lvl.buriedObjHeads.delete(k);
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
 * C: mkobj.c **`place_object(otmp, x, y)`** with explicit **`g.level`**.
 * @param {import('./gstate.js').game} g
 */
export function placeFloorObjectInLevel(g, otmp, x, y) {
    const lvl = g.level;
    if (!lvl || !otmp) return;
    const xi = x | 0;
    const yi = y | 0;
    if (otmp.ox >= 0 && otmp.oy >= 0 && (otmp.ox !== xi || otmp.oy !== yi)) unlinkFloorObjectInLevel(g, otmp);
    if (!lvl.floorObjHeads) lvl.floorObjHeads = new Map();
    const k = floorObjKey(xi, yi);
    otmp.ox = xi;
    otmp.oy = yi;
    const prev = lvl.floorObjHeads.get(k) ?? null;
    otmp.nexthere = prev;
    lvl.floorObjHeads.set(k, otmp);
    if (!lvl.objects.includes(otmp)) lvl.objects.push(otmp);
}

/**
 * C: dig.c **`buried_ball`** — at **`(x,y)`** only (**`buriedObjHeads`** cell; full C scans **`buriedobjlist`** + radius).
 * Returns first **`BALL_CLASS`** object (NH5: **`HEAVY_IRON_BALL`** is the normal floor **`BALL_CLASS`** item).
 */
export function buriedBallAtCellForUnearth(g, x, y) {
    const u = g.u;
    if ((u?.utrap | 0) && (u?.utraptype | 0) !== TT_BURIEDBALL) return null;
    const k = floorObjKey(x | 0, y | 0);
    const head = g.level?.buriedObjHeads?.get(k);
    for (let o = head; o; o = o.nexthere) {
        if ((o.oclass | 0) === NH5_BALL_CLASS) return o;
    }
    return null;
}

/**
 * C: dig.c **`buried_ball_to_punishment`** subset — no **`punish()`** yet: clear **`utrap`**, place ball at hero.
 * @param {import('./gstate.js').game} g
 */
export function buriedBallToPunishmentMinimal(g, ball) {
    const u = g.u;
    if (!u || !ball) return;
    u.utrap = 0;
    u.utraptype = 0;
    g.uball = ball;
    placeFloorObjectInLevel(g, ball, u.ux | 0, u.uy | 0);
    stackObjOnFloorInLevel(g, ball);
}

/**
 * C: dig.c **`unearth_objs(x, y)`** — per buried object: **`buried_ball`/`TT_BURIEDBALL`** vs **`place_object`+`stackobj`**;
 * **`ROT_ORGANIC`** **`stop_timer`** via **`stopNhObjTimer`** (**`ROT_CORPSE`** timers unchanged).
 * @param {import('./gstate.js').game} g
 */
export function unearthObjsDigInLevel(g, x, y) {
    const lvl = g.level;
    if (!lvl?.buriedObjHeads) return;
    const xh = x | 0;
    const yh = y | 0;
    const k = floorObjKey(xh, yh);
    const bball = buriedBallAtCellForUnearth(g, xh, yh);
    const u = g.u;
    let head = lvl.buriedObjHeads.get(k) ?? null;
    while (head) {
        const otmp = head;
        head = otmp.nexthere;
        if (bball && otmp === bball && (u?.utrap | 0) && (u?.utraptype | 0) === TT_BURIEDBALL) {
            unlinkBuriedObjectInLevel(g, otmp);
            buriedBallToPunishmentMinimal(g, otmp);
        } else {
            unlinkBuriedObjectInLevel(g, otmp);
            if (otmp.timed) {
                stopNhObjTimer(g, otmp, ROT_ORGANIC);
            }
            placeFloorObjectInLevel(g, otmp, xh, yh);
            stackObjOnFloorInLevel(g, otmp);
        }
    }
}

/**
 * C: dig.c **`bury_objs`** — entire floor **`nexthere`** chain at **`(x,y)`** moves to **`buriedObjHeads`**.
 * Shop billing (**`stolen_value`** subset + **`no_charge`**) runs in **`melt_ice.js`** before this (**`shop.js`**).
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
 * C: dig.c **`unearth_objs`** — delegates to **`unearthObjsDigInLevel`** (**`stackobj`/`buried_ball`** subset).
 * @param {import('./gstate.js').game} g
 */
export function unearthBuriedChainAt(g, x, y) {
    unearthObjsDigInLevel(g, x, y);
}

/**
 * C: dig.c **`bury_an_obj`** subset — prepend one object onto **`buriedObjHeads`** at **`(ox,oy)`**.
 * @param {import('./gstate.js').game} g
 */
export function prependBuriedObjectInLevel(g, otmp) {
    const lvl = g.level;
    if (!lvl || !otmp) return;
    const xi = otmp.ox | 0;
    const yi = otmp.oy | 0;
    unlinkFloorObjectInLevel(g, otmp);
    unlinkBuriedObjectInLevel(g, otmp);
    if (!lvl.buriedObjHeads) lvl.buriedObjHeads = new Map();
    const k = floorObjKey(xi, yi);
    const prev = lvl.buriedObjHeads.get(k) ?? null;
    otmp.nexthere = prev;
    lvl.buriedObjHeads.set(k, otmp);
    otmp.ox = xi;
    otmp.oy = yi;
    if (!lvl.objects.includes(otmp)) lvl.objects.push(otmp);
}

/**
 * Remove **`otmp`** from floor/buried chains and **`level.objects`** (**`obfree`** / **`obj_extract_self`** subset).
 * @param {import('./gstate.js').game} g
 */
export function obliterateObjectInLevel(g, otmp) {
    if (!otmp) return;
    unlinkFloorObjectInLevel(g, otmp);
    unlinkBuriedObjectInLevel(g, otmp);
    const arr = g.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
    otmp.nexthere = null;
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
