// lava.js — Hero stepping on molten lava (trap.c lava_effects() subset).
// C ref: trap.c lava_effects(), spoteffects() — feel_newsym; burn_away_slime;
// Fire_resistance / Wwalking / destroy_items / done(BURNING) not ported.

import { game } from './gstate.js';
import { IS_LAVA } from './const.js';
import { feelNewsym } from './display.js';

/**
 * C: trap.c lava_effects() — early **`feel_newsym`** + **`iflags.in_lava_effects`** re-entry guard.
 * Call from movement after **`drown()`**-style pool handling (**`spoteffects`** order).
 * @param {typeof game} [g]
 * @returns {Promise<boolean>} reserved (**`TRUE`** = life-saved in C); always **false** for now
 */
export async function maybeHeroLavaEffects(g = game) {
    const u = g.u;
    if (!u) return false;
    const loc = g.level?.at(u.ux, u.uy);
    if (!loc || !IS_LAVA(loc.typ)) return false;

    g.iflags = g.iflags || {};
    if (g.iflags.in_lava_effects | 0) return false;

    g.iflags.in_lava_effects = (g.iflags.in_lava_effects | 0) + 1;
    try {
        feelNewsym(u.ux, u.uy);
        /* C: burn_away_slime; likes_lava; boots burn; destroy_items; losehp; lifesave — TODO */
    } finally {
        g.iflags.in_lava_effects = Math.max(0, (g.iflags.in_lava_effects | 0) - 1);
    }
    return false;
}
