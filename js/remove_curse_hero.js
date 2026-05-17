// remove_curse_hero.js — read.c seffect_remove_curse invent loop (partial).
// C ref: read.c seffect_remove_curse ~1507–1578 (gi.invent); steed saddle, shop costly_alteration, uslinging TODO.

import {
    W_ART,
    W_ARTI,
    W_BALL,
} from './const.js';
import { rn2 } from './rng.js';
import { NH5_COIN_CLASS, NH5_GEM_CLASS, NH5_WEAPON_CLASS } from './nh5_objclass.js';
import { learnscrolltypHeroLikeC } from './discover_scroll.js';

/** C: objects_nums — SCR_REMOVE_CURSE. */
const OTYP_SCR_REMOVE_CURSE = 327;
/** C: objects.h LOADSTONE. */
const OTYP_LOADSTONE = 471;
/** C: objects.h LEASH. */
const OTYP_LEASH = 237;
/**
 * C: objects.h — WEAPON/PROJECTILE with merge bit (mg) through CRYSKNIFE (ARROW…CRYSKNIFE NH5 19–44).
 * Used for uquiver wornmask when !sblessed (read.c objects[otyp].oc_merge).
 */
const OC_MERGE_QUIVER_WEAPON_OTYP = (() => {
    const s = new Set();
    for (let t = 19; t <= 44; t++) s.add(t);
    return s;
})();

/**
 * C: mkobj.c blessorcurse(otmp, chance) with chance == 2 (remove curse confused branch).
 * @param {{ blessed?: number; cursed?: number; oclass?: number }} obj
 */
function blessorcurseObjChance2LikeC(obj) {
    if (!obj) return;
    if ((obj.oclass | 0) === NH5_COIN_CLASS) return;
    if ((obj.blessed | 0) || (obj.cursed | 0)) return;
    /* C: if (!rn2(chance)) */
    if (rn2(2)) return;
    /* C: if (!rn2(2)) curse(otmp); else bless(otmp); */
    if (!rn2(2)) {
        obj.blessed = 0;
        obj.cursed = 1;
    } else {
        obj.cursed = 0;
        obj.blessed = 1;
    }
}

/**
 * C: mkobj.c uncurse(otmp) — clear cursed (lamplit / luck / BoH weight tail TODO).
 * @param {{ cursed?: number }} obj
 */
function uncurseObjHeroLikeC(obj) {
    if (!obj) return;
    obj.cursed = 0;
}

/**
 * C: read.c seffect_remove_curse — gi.invent loop only (nxto order); steed which_armor(W_SADDLE) TODO.
 * @param {import('./gstate.js').game} g
 * @param {{ otyp?: number; blessed?: number; cursed?: number; quan?: number }} scroll
 * @param {boolean} confused
 */
export async function removeCurseHeroInventLoopLikeC(g, scroll, confused) {
    const u = g?.u;
    if (!u) return;
    const sblessed = scroll.blessed | 0;
    const scrollOtyp = scroll.otyp | 0;
    const uswap = u.uswapwep ?? null;
    const uquiv = u.uquiver ?? null;
    const twoweap = u.twoweap | 0;

    let obj = g.invent;
    while (obj) {
        const nxto = obj.nobj ?? null;
        if ((obj.oclass | 0) !== NH5_COIN_CLASS && !(obj === scroll && (scroll.quan | 0) <= 1)) {
            let wornmask = (obj.owornmask | 0) & ~(W_BALL | W_ART | W_ARTI);
            if (wornmask && !sblessed) {
                if (obj === uswap && !twoweap) wornmask = 0;
                else if (obj === uquiv) {
                    const ocl = obj.oclass | 0;
                    const ot = obj.otyp | 0;
                    if (ocl === NH5_WEAPON_CLASS) {
                        if (!OC_MERGE_QUIVER_WEAPON_OTYP.has(ot)) wornmask = 0;
                    } else if (ocl === NH5_GEM_CLASS) {
                        /* C: !uslinging() — not ported; assume false → no quivered-gem worn effect */
                        wornmask = 0;
                    } else {
                        wornmask = 0;
                    }
                }
            }

            if (
                sblessed ||
                wornmask ||
                (obj.otyp | 0) === OTYP_LOADSTONE ||
                ((obj.otyp | 0) === OTYP_LEASH && (obj.leashmon | 0))
            ) {
                /* C: shop POT_WATER + costly_alteration / alter_cost — not ported */
                if (confused) {
                    blessorcurseObjChance2LikeC(obj);
                    obj.bknown = 0;
                } else if (obj.cursed | 0) {
                    uncurseObjHeroLikeC(obj);
                    if ((obj.bknown | 0) && scrollOtyp === OTYP_SCR_REMOVE_CURSE) {
                        learnscrolltypHeroLikeC(g, OTYP_SCR_REMOVE_CURSE);
                    }
                }
            }
        }
        obj = nxto;
    }
}
