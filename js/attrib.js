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

/**
 * C: attrib.c adjattrib(int attr, int change, boolean tell) — adjust base attribute.
 * @param {number} attr — A_STR … A_CHA
 * @param {number} change — usually +1 or -1
 * @param {boolean} tell — whether to pline (not ported)
 * @returns {boolean} true if value changed
 */
export function adjattrib(attr, change, tell) {
    void tell;
    const u = game.u;
    if (!u?.acurr?.a || !u?.amax?.a) return false;
    if (change !== 1) return false;
    const cur = u.acurr.a[attr] ?? 10;
    const mx = u.amax.a[attr] ?? 18;
    if (cur >= mx) return false;
    u.acurr.a[attr] = cur + 1;
    game.disp = game.disp || {};
    game.disp.botl = true;
    return true;
}

/** C: attrib.c exercise(attr, inc) — stub until full training port. */
export function exercise(_attr, _inc) {
}
