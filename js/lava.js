// lava.js — Hero stepping on molten lava (trap.c lava_effects() subset).
// C ref: trap.c lava_effects(), spoteffects() — feel_newsym; burn_away_slime;
// likes_lava; Fire_resistance / Wwalking / destroy_items / done(BURNING) not ported.

import { game } from './gstate.js';
import { IS_LAVA } from './const.js';
import { feelNewsym } from './display.js';
import { likesLava, permonstHuman } from './mondata.js';

/**
 * C: timeout.c burn_away_slime() — no **`u.Slimed`** / **`make_slimed`** in JS yet.
 * @param {typeof game} _g
 */
async function burnAwaySlimeStub(_g) {
    void _g;
    /* C: if (Slimed) make_slimed(0L, "The slime that covers you is burned away!"); */
}

/**
 * C: trap.c lava_effects() — **`feel_newsym`**, **`burn_away_slime`**, **`likes_lava`** early exit;
 * **`iflags.in_lava_effects`** re-entry guard. Call from movement after pool (**`spoteffects`** order).
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
        await burnAwaySlimeStub(g);
        const mdat = g.youmonst?.data ?? permonstHuman;
        if (likesLava(mdat)) return false;
        /* C: usurvive / boots / destroy_items / losehp / lifesave — TODO */
    } finally {
        g.iflags.in_lava_effects = Math.max(0, (g.iflags.in_lava_effects | 0) - 1);
    }
    return false;
}
