// mhitu.js — Monster attacks hero (partial).
// C ref: mhitu.c mattacku — AT_WEAP ranged → thrwmu only.

import { game } from './gstate.js';
import { monnear } from './mon.js';
import { Is_rogue_level } from './const.js';
import { is_armed } from './monsters.js';
import { thrwmu } from './mthrowu.js';
import { nomul } from './hack.js';

/**
 * C ref: mhitu.c calc_mattacku_vars — range2 = !monnear(mux,muy).
 */
function calc_mattacku_vars(mtmp) {
    const u = game.u || {};
    const ranged = dist2u(mtmp) > 3;
    const range2 = !monnear(mtmp, mtmp.mux ?? u.ux, mtmp.muy ?? u.uy);
    return { ranged, range2 };
}

function dist2u(mtmp) {
    const u = game.u || {};
    const dx = mtmp.mx - u.ux;
    const dy = mtmp.my - u.uy;
    return dx * dx + dy * dy;
}

/**
 * C ref: mhitu.c mattacku — hostile AT_WEAP ranged throw path.
 * Melee / breath / spit / gulp / disguise / steed deferred.
 * Returns 1 if monster died, else 0.
 */
export async function mattacku(mtmp) {
    if (!mtmp || (mtmp.mhp | 0) < 1) return 1;
    const { ranged, range2 } = calc_mattacku_vars(mtmp);
    if (!ranged) nomul(0);

    // Only weapon-ranged for this peel; other aatyp deferred.
    if (range2 && is_armed(mtmp.data) && !Is_rogue_level(game.u?.uz)) {
        // C: for each mattk AT_WEAP when range2 → thrwmu
        thrwmu(mtmp);
    }
    return (mtmp.mhp | 0) < 1 ? 1 : 0;
}
