// u_init_link_race_invent.js — C u_init.c u_init_race() invent tails after role pack (addinv prepend).
// C ref: u_init.c u_init_race PM_ORC `ini_inv(Xtra_food)` — after u_init_role, before Wishing/Money.

import { game } from './gstate.js';
import { races } from './roles.js';
import { NH5_FOOD_CLASS } from './nh5_objclass.js';
import { objectOcWeight } from './obj_oc_weight_data.js';

/**
 * C: u_init.c `u_init_race` PM_ORC — `if (!Role_if(PM_WIZARD)) ini_inv(Xtra_food)`.
 * Prepends **`g._orcXtraFoodOtyps`** (from **`consumeUInitRaceOrcXtraFoodIniInvLikeC`**) onto **`g.invent`**
 * in C **`addinv`** order (last generated food = chain head).
 * @param {import('./gstate.js').game} [g]
 */
export function applyOrcXtraFoodInventTailLikeC(g = game) {
    const orcIdx = races.findIndex((r) => r.name === 'orc');
    if ((g.initrace | 0) !== orcIdx) return;
    if (g.urole?.abbr === 'Wiz') return;
    const otyps = g._orcXtraFoodOtyps;
    if (!Array.isArray(otyps) || otyps.length !== 2) return;
    for (const ot of otyps) {
        if ((ot | 0) <= 0) return;
    }

    /** @param {number} otyp */
    function mkFood(otyp) {
        const q = 1;
        const w = objectOcWeight(otyp | 0) || 1;
        return {
            otyp: otyp | 0,
            oclass: NH5_FOOD_CLASS,
            quan: q,
            spe: 0,
            owt: Math.max(1, w * q),
            oartifact: 0,
            nobj: null,
            cursed: 0,
            blessed: 0,
        };
    }

    for (const otyp of otyps) {
        const o = mkFood(otyp | 0);
        o.nobj = g.invent ?? null;
        g.invent = o;
    }
}
