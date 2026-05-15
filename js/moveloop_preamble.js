// moveloop_preamble.js — Once per moveloop() before the core loop.
// C ref: allmain.c moveloop_preamble().
//
// Ported: calendar, rndencode/seer_turn, set_wear/reset_justpicked stubs, …
// Not yet: pickup(1) autopickup (RNG + invent chain; still in fastforward gap).

import { game } from './gstate.js';
import { pline } from './display.js';
import { rnd } from './rng.js';
import { NEW_MOON, FULL_MOON, NORMAL_SPEED } from './const.js';
import { parseFixedDatetime, phaseOfTheMoonFromDate, isFriday13thFromDate } from './moonphase.js';
import { changeLuck } from './attrib.js';
import { initrack } from './track.js';
import { setWear } from './wear.js';
import { resetJustPicked } from './pickup.js';

/**
 * @param {boolean} resuming — C `moveloop_preamble(resuming)` (restore vs new).
 */
export async function moveloopPreamble(resuming) {
    const g = game;
    g.flags = g.flags || {};
    g.program_state = g.program_state || {};
    g.context = g.context || {};
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

    if (!resuming) {
        /* C: program_state.beyond_savefile_load = 1 */
        g.program_state.beyond_savefile_load = 1;
        /* C: svc.context.rndencode = rnd(9000); */
        g.context.rndencode = rnd(9000);
        /* C: set_wear((struct obj *) 0); reset_justpicked(gi.invent); */
        setWear(null);
        resetJustPicked(g.invent);
        /* C: (void) pickup(1); — autopickup; port pickup.c when invent + floor objs exist */
        /* C: svc.context.seer_turn = (long) rnd(30); */
        g.context.seer_turn = rnd(30);
        /* C: u.umovement = NORMAL_SPEED; initrack(); */
        g.u.umovement = NORMAL_SPEED;
        initrack();
    }

    /* C: disp.botlx = TRUE — status-line highlight refresh flag */
    g.disp = g.disp || {};
    g.disp.botlx = true;

    /* C: u.uz0.dlevel = u.uz.dlevel; svc.context.move = 0; */
    if (g.u?.uz) g.u.uz0 = { ...g.u.uz };
    g.context.move = 0;

    /* C: program_state.in_moveloop = 1 */
    g.program_state.in_moveloop = 1;
}
