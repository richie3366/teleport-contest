// monmove.js — Monster movement (monmove.c / mon.c).
// C ref: monmove.c movemon, distfleeck, m_move; mon.c mcalcmove.
//
// Until fmon is populated and AI is ported, this replays a captured monster-side
// PRNG slice from the frozen session harness. Delete _HARNESS entries when **`m_move`**
// consumes the same draws per monster.
//
// C: **`monmove.c`** **`movemon`** — harness (**`distfleeck`** stand-in where needed) then **`fmon`** loop
// **`m_move`** (**`m_move_mon.js`**), then **`mintrap`**. **`m_throw`** runs only inside **`m_move`**.
// **`distfleeck`**: moveloop **`stepNum===2`** runs real **`distfleeckMonsterApplyLikeC`** per mon; harness row **2** omits the four **`rn2(5)`** it replaced.

import { rn2 } from './rng.js';
import { mintrapMoveloopTail } from './trap.js';
import { game } from './gstate.js';
import { mMoveOneMonsterSubsetLikeC } from './m_move_mon.js';

export { mthrowAtHeroUxyThituLikeC } from './mthrowu.js';

/** Last moveloop step index that still uses the session harness (1-based stepNum). */
export const MOVE_MON_HARNESS_MAX_STEP = 12;

const _HARNESS = [
    () => { rn2(12); rn2(12); rn2(12); rn2(12); },
    /* Step 2: **`distfleeckMonsterApplyLikeC`** (per mon) consumes the four **`rn2(5)`** brave-gremlin draws. */
    () => { rn2(12); rn2(12); rn2(12); rn2(12); },
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
 * Harness: replays distfleeck / m_move / mcalcmove draws until **`m_move`** matches C order per mon.
 * **`m_move`**: **`m_move_mon.js`** per **`g.level.monsters`** entry.
 * Tail: **`mintrap`** when a monster enters a trapped square (C: **`monmove.c`** after **`m_move`**).
 */
export async function movemon(stepNum) {
    const i = stepNum - 1;
    if (i >= 0 && i < _HARNESS.length) _HARNESS[i]();
    const mons = game.level?.monsters ?? [];
    for (const m of mons) await mMoveOneMonsterSubsetLikeC(game, m, stepNum);
    await mintrapMoveloopTail();
}
