// flooreffects_hero.js — do.c flooreffects() subset at (x,y) for hero deliveries.
// C ref: do.c flooreffects() — **`boulder_hits_pool`**, **`is_lava`**/**`lava_damage`**, **`is_pool`**
// (**splash** + **`water_damage`**); hot-room potions. Deferred: boulder+pit, teeter/**`ship_object`**, glob, mon+altar.

import { isLavaCellLikeC, isPoolCellLikeC } from './fillholetyp.js';
import { lavaDamageFromFlooreffectsLikeC } from './fire_damage.js';
import {
    waterDamageOne,
    ER_DESTROYED,
    nh5HeroObjectClass,
    heroLuck,
} from './water_damage.js';
import { boulderHitsPoolLikeC } from './melt_ice.js';
import { OTYP_BOULDER, ROOM, CORR, WT_SPLASH_THRESHOLD } from './const.js';
import { NH5_POTION_CLASS } from './nh5_objclass.js';
import { cansee } from './vision.js';
import { pline, newsym } from './display.js';
import { objResists } from './obj_resists.js';
import { breaksObjDeliveryLikeC } from './obj_break_dothrow.js';
import { doname } from './objnam.js';

/** C: objects_nums — **`POT_OIL`** ( **`do.c`** hot-floor branch always survives ). */
const OTYP_POT_OIL = 320;

function objWeightLikeC(obj) {
    const w = obj?.owt | 0;
    return w > 0 ? w : 1;
}

function heroUAtLikeC(g, x, y) {
    const u = g.u;
    if (!u) return false;
    return (u.ux | 0) === (x | 0) && (u.uy | 0) === (y | 0);
}

function heroBlindLikeC(g) {
    const u = g.u;
    return !!(u?.ublind | 0) || (u?.timed?.blind ?? 0) > 0;
}

function heroDeafLikeC(g) {
    return (g.u?.timed?.deaf ?? 0) > 0;
}

function levitationOrFlyingLikeC(g) {
    const u = g.u;
    return !!(u?.Levitation | 0) || !!(u?.Flying | 0);
}

/**
 * C: **`do.c`** **`flooreffects(obj, x, y, verb)`** — boulder/pool/lava, pool splash, hot potions.
 * Omits: boulder+pit/**`hmon`**, teeter/**`ship_object`**, glob merge, mon **`doaltarobj`**.
 * @param {import('./gstate.js').game} g
 * @param {string} [_verb] — C **`"drop"`** / **`"fall"`** / **`"land"`** (splash uses **`Deaf`** only; **`You_hear`** deferred)
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

    const gb = g.gb || (g.gb = {});
    const saveBhitpos = gb.bhitpos;
    gb.bhitpos = { x: xi, y: yi };
    try {
        if ((obj.otyp | 0) === OTYP_BOULDER && (await boulderHitsPoolLikeC(g, obj, xi, yi, false))) {
            return true;
        }

        if (isLavaCellLikeC(g, xi, yi)) {
            return await lavaDamageFromFlooreffectsLikeC(g, obj, xi, yi);
        }
        if (isPoolCellLikeC(g, xi, yi)) {
            const u = g.u;
            const blind = heroBlindLikeC(g);
            const levFly = levitationOrFlyingLikeC(g);
            if ((blind || levFly) && !heroDeafLikeC(g) && heroUAtLikeC(g, xi, yi)) {
                const uw = !!(u?.underwater | 0);
                if (!uw) {
                    const w = objWeightLikeC(obj);
                    if (w > WT_SPLASH_THRESHOLD) {
                        await pline('Splash!');
                    } else if (levFly) {
                        await pline('Plop!');
                    }
                }
                /* C: **`map_background`** + **`newsym`** — display subset: **`newsym`** only */
                await newsym(xi, yi);
            }
            const er = await waterDamageOne(obj, false, g, { floorPool: true });
            return er === ER_DESTROYED;
        }

        const loc = g.level?.at(xi, yi);
        const typ = loc?.typ | 0;
        const temp = (g.level?.flags?.temperature ?? 0) | 0;
        if (
            temp > 0 &&
            (typ === ROOM || typ === CORR) &&
            nh5HeroObjectClass(obj) === NH5_POTION_CLASS
        ) {
            if (cansee(xi, yi)) {
                const q = obj.quan | 0;
                const subj = q > 1 ? 'they' : 'it';
                const heatVerb = q > 1 ? 'heat' : 'heats';
                const hitVerb = q > 1 ? 'hit' : 'hits';
                await pline(`${doname(obj, g)} ${heatVerb} up as ${subj} ${hitVerb} the hot ground.`);
            }
            let survivalChance = obj.blessed ? 70 : 50;
            if (obj.invlet) survivalChance += heroLuck(g) * 2;
            if ((obj.otyp | 0) === OTYP_POT_OIL) survivalChance = 100;

            if (!objResists(obj, survivalChance, 100)) {
                if (cansee(xi, yi)) {
                    const q = obj.quan | 0;
                    await pline(q > 1 ? 'They shatter from the heat!' : 'It shatters from the heat!');
                } else {
                    await pline('You hear a shattering noise.');
                }
                if (await breaksObjDeliveryLikeC(g, obj, xi, yi)) return true;
            }
        }

        return false;
    } finally {
        gb.bhitpos = saveBhitpos;
    }
}
