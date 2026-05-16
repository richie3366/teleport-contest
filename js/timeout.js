// timeout.js — Multi-turn actions and travel (gm.multi / nomul).
// C ref: hack.c nomul(), end_running() (subset); timeout.c fall_asleep().

import { game } from './gstate.js';

/**
 * C: hack.c nomul(int nval) — set multi-turn counter (negative = helpless turns).
 */
export function nomul(nval) {
    game.multi = nval;
    if (nval === 0 && game.context) game.context.run = 0;
}

/** C: hack.c end_running(boolean force) — stop multi-step travel (subset). */
export function endRunning(force) {
    const g = game;
    g.context = g.context || {};
    if (force) g.context.run = 0;
}

/**
 * C: timeout.c fall_asleep(int how_long, boolean wakeup_msg) — nomul + usleep + nomovemsg.
 * @param {number} howLong — negative, turns remaining asleep (C convention).
 */
export function fallAsleep(howLong, wakeupMsg) {
    nomul(howLong);
    game.multi_reason = 'sleeping';
    game.nomovemsg = wakeupMsg ? 'You wake up.' : null;
    const u = game.u;
    if (u) u.usleep = game.moves ?? 0;
}
