// monmove.js — Monster movement (monmove.c / mon.c).
// C ref: monmove.c movemon, distfleeck, m_move; mon.c mcalcmove.
//
// Until fmon is populated and AI is ported, this replays the monster-side
// PRNG slice from the reference session (see seed8000-tourist-starter). Delete
// _HARNESS entries as real movemon consumes the same calls.

import { rn2 } from './rng.js';

/** Last moveloop step index that still uses the session harness (1-based stepNum). */
export const MOVE_MON_HARNESS_MAX_STEP = 10;

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
];

/**
 * C: movemon() — advance all monsters for one hero time step.
 * Harness: replays distfleeck / m_move / mcalcmove draws for seed8000 only.
 */
export function movemon(stepNum) {
    const i = stepNum - 1;
    if (i >= 0 && i < _HARNESS.length) _HARNESS[i]();
}
