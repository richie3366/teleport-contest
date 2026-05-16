// monmove.js — Monster movement (monmove.c / mon.c).
// C ref: monmove.c movemon, distfleeck, m_move; mon.c mcalcmove.
//
// Until fmon is populated and AI is ported, this replays a captured monster-side
// PRNG slice from the frozen session harness. Delete _HARNESS entries as real
// movemon consumes the same calls.
//
// C: **`m_throw`** at hero (**`mthrowu.c`**) — **`movemonMthrowAtHeroTailLikeC`** after harness (**`mthrow_mon.js`**).

import { rn2 } from './rng.js';
import { mintrapMoveloopTail } from './trap.js';
import { game } from './gstate.js';
import { movemonMthrowAtHeroTailLikeC } from './mthrow_mon.js';

export { mthrowAtHeroUxyThituLikeC } from './mthrowu.js';

/** Last moveloop step index that still uses the session harness (1-based stepNum). */
export const MOVE_MON_HARNESS_MAX_STEP = 12;

const _HARNESS = [
    () => { rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(5); rn2(5); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(32); rn2(5); rn2(5); rn2(32); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(24); rn2(5); rn2(5); rn2(24); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(16); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(12); rn2(5); rn2(5); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(16); rn2(5); rn2(5); rn2(16); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(12); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(20); rn2(5); rn2(5); rn2(8); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(12); rn2(5); rn2(5); rn2(20); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    // moveloop steps 11–12: #search (harness tail)
    () => { rn2(5); rn2(20); rn2(5); rn2(5); rn2(12); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
    () => { rn2(5); rn2(16); rn2(5); rn2(5); rn2(16); rn2(5); rn2(12); rn2(12); rn2(12); rn2(12); },
];

/**
 * C: movemon() — advance all monsters for one hero time step.
 * Harness: replays distfleeck / m_move / mcalcmove draws until movemon is ported.
 * Tail: **`mintrap`** when a monster enters a trapped square (C: **`monmove.c`** after **`m_move`**).
 */
export async function movemon(stepNum) {
    const i = stepNum - 1;
    if (i >= 0 && i < _HARNESS.length) _HARNESS[i]();
    await movemonMthrowAtHeroTailLikeC(game);
    await mintrapMoveloopTail();
}
