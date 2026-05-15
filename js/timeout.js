// timeout.js — Multi-turn actions and travel (gm.multi / nomul).
// C ref: hack.c nomul(), end_running() (subset).

import { game } from './gstate.js';

/**
 * C: hack.c nomul(int nval) — clamp multi-turn state; stop running when cleared.
 */
export function nomul(nval) {
    const m = game.multi ?? 0;
    if (m < nval) return;
    game.multi = nval;
    if (nval === 0 && game.context) game.context.run = 0;
}
