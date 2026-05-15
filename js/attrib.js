// attrib.js — Hero attributes and luck.
// C ref: attrib.c change_luck(), exercise(); you.h LUCKMIN / LUCKMAX.

import { game } from './gstate.js';
import { LUCKMIN, LUCKMAX } from './const.js';

/**
 * C: attrib.c acurr(x) — effective attribute (minimal: ABASE only until poly/bonus port).
 * @param {number} x attrib_types A_STR…A_CHA
 */
export function acurr(x) {
    const u = game.u;
    return u?.acurr?.a?.[x] ?? 10;
}

/** C: change_luck(schar n) — adjust u.uluck with bounds; no RNG. */
export function changeLuck(n) {
    const u = game.u;
    u.uluck = (u.uluck ?? 0) + n;
    if (u.uluck < 0 && u.uluck < LUCKMIN) u.uluck = LUCKMIN;
    if (u.uluck > 0 && u.uluck > LUCKMAX) u.uluck = LUCKMAX;
}

/** C: attrib.c exercise(attr, inc) — stub until full training port. */
export function exercise(_attr, _inc) {
}
