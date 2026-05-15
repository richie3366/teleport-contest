// attrib.js — Hero attributes and luck.
// C ref: attrib.c change_luck(); you.h LUCKMIN / LUCKMAX.

import { game } from './gstate.js';
import { LUCKMIN, LUCKMAX } from './const.js';

/** C: change_luck(schar n) — adjust u.uluck with bounds; no RNG. */
export function changeLuck(n) {
    const u = game.u;
    u.uluck = (u.uluck ?? 0) + n;
    if (u.uluck < 0 && u.uluck < LUCKMIN) u.uluck = LUCKMIN;
    if (u.uluck > 0 && u.uluck > LUCKMAX) u.uluck = LUCKMAX;
}
