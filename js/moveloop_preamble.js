// moveloop_preamble.js — Once per moveloop() before the core loop.
// C ref: allmain.c moveloop_preamble().
//
// Ported: calendar side-effects (moon / Friday 13th messages + luck).
// Not yet: deferred explore restore, rnd(9000) / pickup / initrack / …

import { game } from './gstate.js';
import { pline } from './display.js';
import { NEW_MOON, FULL_MOON } from './const.js';
import { parseFixedDatetime, phaseOfTheMoonFromDate, isFriday13thFromDate } from './moonphase.js';
import { changeLuck } from './attrib.js';

/**
 * @param {boolean} resuming — C `moveloop_preamble(resuming)` (restore vs new).
 */
export async function moveloopPreamble(resuming) {
    const g = game;
    g.flags = g.flags || {};
    if (resuming && g.iflags?.deferred_X) {
        /* C: enter_explore_mode() — not ported */
    }

    const clock = g.fixed_datetime ? parseFixedDatetime(g.fixed_datetime) : null;
    if (clock) {
        g.flags.moonphase = phaseOfTheMoonFromDate(clock);
        g.flags.friday13 = isFriday13thFromDate(clock);
    } else {
        g.flags.moonphase = NEW_MOON;
        g.flags.friday13 = false;
    }

    if (g.flags.moonphase === FULL_MOON) {
        await pline('You are lucky!  Full moon tonight.');
        changeLuck(1);
    } else if (g.flags.moonphase === NEW_MOON) {
        await pline('Be careful!  New moon tonight.');
    }
    if (g.flags.friday13) {
        await pline('Watch out!  Bad things can happen on Friday the 13th.');
        changeLuck(-1);
    }

    /* C: !resuming → rnd(9000), set_wear, pickup(1), seer_turn, umovement, … */
    void resuming;
}
