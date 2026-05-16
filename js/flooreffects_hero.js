// flooreffects_hero.js — do.c flooreffects() subset at (x,y) for hero deliveries.
// C ref: do.c flooreffects() — **`is_lava`**/**`lava_damage`**, **`is_pool`**/**`water_damage`**;
//        boulder/pit, teeter/hole, glob, hot-room potions, mon+altar deferred.

import { isLavaCellLikeC, isPoolCellLikeC } from './fillholetyp.js';
import { lavaDamageFromFlooreffectsLikeC } from './fire_damage.js';
import { waterDamageOne, ER_DESTROYED } from './water_damage.js';

/**
 * C: **`do.c`** **`flooreffects(obj, x, y, verb)`** — **subset**: lava instant burn / pool **`ER_DESTROYED`** only.
 * Omits: boulder+pool/pit, teetering **`ship_object`**, glob merge, hot-floor potions, mon **`doaltarobj`**.
 * @param {import('./gstate.js').game} g
 * @param {string} [_verb] — C **`"drop"`** / **`"fall"`**; reserved for splash plines
 * @returns {Promise<boolean>} **true** if **`obj`** is consumed (C **`TRUE`**)
 */
export async function flooreffectsObjAtLikeC(g, obj, x, y, _verb) {
    void _verb;
    if (!obj) return false;

    /* C: clear chains before water/lava helpers */
    obj.nobj = null;
    obj.nexthere = null;

    const xi = x | 0;
    const yi = y | 0;

    if (isLavaCellLikeC(g, xi, yi)) {
        return await lavaDamageFromFlooreffectsLikeC(g, obj, xi, yi);
    }
    if (isPoolCellLikeC(g, xi, yi)) {
        const gb = g.gb || (g.gb = {});
        const prev = gb.bhitpos;
        gb.bhitpos = { x: xi, y: yi };
        try {
            const er = await waterDamageOne(obj, false, g, { floorPool: true });
            return er === ER_DESTROYED;
        } finally {
            gb.bhitpos = prev;
        }
    }
    return false;
}
