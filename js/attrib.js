// attrib.js — Hero attributes and luck.
// C ref: attrib.c acurr, adjattrib, change_luck(), exercise(); you.h ATTRMIN/ATTRMAX.

import { game } from './gstate.js';
import { LUCKMIN, LUCKMAX, STR18 } from './const.js';
import { rn2 } from './rng.js';

const DEF_ATTRMIN = Object.freeze([3, 3, 3, 3, 3, 3]);
const DEF_ATTRMAX = Object.freeze([STR18(100), 18, 18, 18, 18, 18]);

/** @param {number} ndx A_STR…A_CHA — C ATTRMIN(ndx) */
export function getRaceAttrMin(ndx) {
    return game.urace?.attrmin?.[ndx] ?? DEF_ATTRMIN[ndx] ?? 3;
}

/** @param {number} ndx A_STR…A_CHA — C ATTRMAX(ndx) */
export function getRaceAttrMax(ndx) {
    return game.urace?.attrmax?.[ndx] ?? DEF_ATTRMAX[ndx] ?? 18;
}

/** @param {number} ndx A_STR…A_CHA */
function attrMin(ndx) {
    return getRaceAttrMin(ndx);
}

/** @param {number} ndx A_STR…A_CHA */
function attrMax(ndx) {
    return getRaceAttrMax(ndx);
}

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
 * C: attrib.c adjattrib(int ndx, int incr, int msgflg)
 * JS maps ABASE/AMAX onto u.acurr.a / u.amax.a (no separate ABASE until invent/poly port).
 * @param {number} attr — A_STR … A_CHA
 * @param {number} change — delta (positive or negative)
 * @param {boolean|number} tell — C msgflg: positive => no message (hero init uses truthy skip)
 * @returns {boolean} true if ACURR changed
 */
export function adjattrib(attr, change, tell) {
    void tell;
    const u = game.u;
    if (!change || !u?.acurr?.a || !u?.amax?.a) return false;
    if (u.Fixed_abil) return false;

    const old_acurr = acurr(attr);
    const old_abase = u.acurr.a[attr] ?? 10;
    const AMN = attrMin(attr);
    const AMX = attrMax(attr);

    u.acurr.a[attr] = old_abase + change;

    if (change > 0) {
        if (u.acurr.a[attr] > u.amax.a[attr]) {
            u.amax.a[attr] = u.acurr.a[attr];
            if (u.amax.a[attr] > AMX) u.acurr.a[attr] = u.amax.a[attr] = AMX;
        }
    } else {
        if (u.acurr.a[attr] < AMN) {
            const decr = rn2(AMN - u.acurr.a[attr] + 1);
            u.acurr.a[attr] = AMN;
            u.amax.a[attr] -= decr;
            if (u.amax.a[attr] < AMN) u.amax.a[attr] = AMN;
        }
    }

    if (acurr(attr) === old_acurr) return false;

    if (u.atemp?.a) u.atemp.a[attr] = 0;
    if (u.atime?.a) u.atime.a[attr] = 0;

    game.disp = game.disp || {};
    game.disp.botl = true;
    return true;
}

/** C: attrib.c exercise(attr, inc) — stub until full training port. */
export function exercise(_attr, _inc) {
}
