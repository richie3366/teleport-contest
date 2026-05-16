// obj_rot_timer.js — Object-attached rot/revive timers (mkobj.c obj_timer_checks subset).
// C ref: mkobj.c obj_timer_checks(), timeout.c stop_timer()/start_timer() return semantics;
//        timeout.c TIMER_OBJECT **`timed`** refcount (**single timer** model here).

import { ROT_CORPSE, REVIVE_MON } from './const.js';
import { CORPSE_OTYP } from './mkobj_corpse.js';

/** C: mkobj.c **`#define ROT_ICE_ADJUSTMENT 2`** */
export const ROT_ICE_ADJUSTMENT = 2;

/**
 * C: **`timeout.c`** **`stop_timer`** — returns moves **remaining** (**`deadline - svm.moves`**).
 * JS stores absolute **`deadlineMoves`** on **`o._nhObjTimers[funcIndex]`**.
 * @param {import('./gstate.js').game} g
 * @param {Record<number, number>|undefined} map
 * @param {number} funcIndex — **`ROT_CORPSE`** / **`REVIVE_MON`**
 */
export function stopNhObjTimer(g, o, funcIndex) {
    const m = g.moves ?? 0;
    const map = /** @type {Record<number, number>} */ (o?._nhObjTimers);
    if (!map || map[funcIndex] == null) return 0;
    const deadline = map[funcIndex] | 0;
    delete map[funcIndex];
    if (!Object.keys(map).length) delete o._nhObjTimers;
    syncObjTimedCount(o);
    return Math.max(0, deadline - m);
}

/**
 * C: **`start_timer(when, TIMER_OBJECT, func_index, …)`** — **`when`** is delta from **`moves`**.
 * @returns {boolean} false when duplicate (**`impossible`** in C)
 */
export function startNhObjTimer(g, o, whenDelta, funcIndex) {
    if (!o) return false;
    const wd = Math.max(0, whenDelta | 0);
    const m = g.moves ?? 0;
    if (!o._nhObjTimers) o._nhObjTimers = {};
    const map = /** @type {Record<number, number>} */ (o._nhObjTimers);
    if (map[funcIndex] != null) return false;
    map[funcIndex] = m + wd;
    syncObjTimedCount(o);
    return true;
}

/** C: increment **`obj->timed`** per active **`TIMER_OBJECT`** — JS uses key count. */
function syncObjTimedCount(o) {
    const n = o?._nhObjTimers ? Object.keys(o._nhObjTimers).length : 0;
    o.timed = n > 0 ? n : 0;
}

/**
 * C: mkobj.c **`obj_timer_checks(otmp, x, y, force)`** — corpse + ice only (**`ROT_CORPSE`/`REVIVE_MON`**).
 * @param {'floor'|'buried'} where — C **`OBJ_FLOOR`/`OBJ_BURIED`**
 * @param {(gx: import('./gstate.js').game, xi: number, yi: number) => boolean} isIceAtCell
 */
export function objTimerChecksMkobj(g, o, x, y, force, where, isIceAtCell) {
    if ((o.otyp | 0) !== CORPSE_OTYP) return;
    const xh = x | 0;
    const yh = y | 0;
    const onFloor = where === 'floor';
    const buried = where === 'buried';
    const ice = !!isIceAtCell(g, xh, yh);
    const moves = g.moves ?? 0;

    let tleft = 0;
    let action = ROT_CORPSE;
    let restart = false;

    /* C: corpses just placed on or in ice */
    if ((onFloor || buried) && ice && force >= 0) {
        tleft = stopNhObjTimer(g, o, ROT_CORPSE);
        if (!tleft) {
            action = REVIVE_MON;
            tleft = stopNhObjTimer(g, o, REVIVE_MON);
        }
        if (tleft) {
            o.on_ice = 1;
            const age = moves - (o.age | 0);
            o.age = moves - age * ROT_ICE_ADJUSTMENT;
            tleft *= ROT_ICE_ADJUSTMENT;
            restart = true;
        }
    } else if (
        force < 0
        || ((o.on_ice | 0) && !((onFloor || buried) && ice))
    ) {
        tleft = stopNhObjTimer(g, o, ROT_CORPSE);
        if (!tleft) {
            action = REVIVE_MON;
            tleft = stopNhObjTimer(g, o, REVIVE_MON);
        }
        if (tleft) {
            o.on_ice = 0;
            const age = moves - (o.age | 0);
            o.age = (o.age | 0) + Math.trunc((age * (ROT_ICE_ADJUSTMENT - 1)) / ROT_ICE_ADJUSTMENT);
            tleft = Math.trunc(tleft / ROT_ICE_ADJUSTMENT);
            restart = true;
        }
    }
    if (restart) startNhObjTimer(g, o, tleft, action);
}
