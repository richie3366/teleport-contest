// mondata.js — Monster type predicates and locomotion phrasing.
// C ref: mondata.h (is_floater, is_flyer, …), mondata.c raceptr(), locomotion(),
// stagger(), monflag.h M1_*, MZ_*.

import { game } from './gstate.js';

/** @typedef {{ mlet: number, mflags1: number, msize: number, mmove: number }} Permonst */

// C: monflag.h (subset used by locomotion / stagger)
const M1_FLY = 0x00000001;
const M1_AMORPHOUS = 0x00000004;
const M1_BREATHLESS = 0x00000400;
const M1_NOLIMBS = 0x00006000;
const M1_SLITHY = 0x00080000;

const MZ_SMALL = 1;

// C: sym.h / defsym.h — S_EYE, S_LIGHT, S_HUMAN enum indices
const S_EYE = 5;
const S_LIGHT = 25;
const S_HUMAN = 53;

/** Innate human (PM_HUMAN–style) for encumber / stagger when not polymorphed. */
export const permonstHuman = Object.freeze({
    mlet: S_HUMAN,
    mflags1: 0x00020000, /* M1_HUMANOID */
    msize: 2, /* MZ_MEDIUM */
    mmove: 12,
});

/** C: mondata.h breathless */
export function breathless(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_BREATHLESS) !== 0;
}

/**
 * C: raceptr(mtmp) — innate race permonst; hero uses mons[urace.mnum] when !Upolyd.
 * @param {{ data?: Permonst }|null|undefined} mtmp
 * @returns {Permonst}
 */
export function raceptr(mtmp) {
    const g = game;
    if (mtmp === g.youmonst && !g.u?.Upolyd) return g.urace?.permonst ?? permonstHuman;
    return mtmp?.data ?? permonstHuman;
}

function highc(ch) {
    if (!ch || typeof ch !== 'string') return ch;
    const c = ch[0];
    return c === c.toLowerCase() ? c.toUpperCase() : c;
}

/** C: mondata.h is_floater */
function isFloater(/** @type {Permonst} */ ptr) {
    return ptr.mlet === S_EYE || ptr.mlet === S_LIGHT;
}

/** C: mondata.h is_flyer */
function isFlyer(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_FLY) !== 0;
}

/** C: mondata.h slithy */
function slithy(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_SLITHY) !== 0;
}

/** C: mondata.h amorphous */
function amorphous(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_AMORPHOUS) !== 0;
}

/** C: mondata.h nolimbs */
function nolimbs(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_NOLIMBS) === M1_NOLIMBS;
}

/** C: mondata.c static locoverbs */
const LEVITATE = ['float', 'Float', 'wobble', 'Wobble'];
const FLYS = ['fly', 'Fly', 'flutter', 'Flutter'];
const FLYL = ['fly', 'Fly', 'stagger', 'Stagger'];
const SLITHER = ['slither', 'Slither', 'falter', 'Falter'];
const OOZE = ['ooze', 'Ooze', 'tremble', 'Tremble'];
const IMMOBILE = ['wiggle', 'Wiggle', 'pulsate', 'Pulsate'];
const CRAWL = ['crawl', 'Crawl', 'falter', 'Falter'];

/**
 * Shared branch table: returns table string or null to use caller `def`.
 * @param {Permonst} ptr
 * @param {0|1|2|3} locoindx
 * @returns {string|null}
 */
function locomotionBranch(ptr, locoindx) {
    if (isFloater(ptr)) return LEVITATE[locoindx];
    if (isFlyer(ptr) && ptr.msize <= MZ_SMALL) return FLYS[locoindx];
    if (isFlyer(ptr) && ptr.msize > MZ_SMALL) return FLYL[locoindx];
    if (slithy(ptr)) return SLITHER[locoindx];
    if (amorphous(ptr)) return OOZE[locoindx];
    if (!ptr.mmove) return IMMOBILE[locoindx];
    if (nolimbs(ptr)) return CRAWL[locoindx];
    return null;
}

/**
 * C: locomotion(const struct permonst *ptr, const char *def)
 * @param {Permonst|null|undefined} ptr
 * @param {string} def
 * @returns {string}
 */
export function locomotion(ptr, def) {
    if (!ptr || typeof def !== 'string' || !def.length) return def || 'move';
    const locoindx = def[0] !== highc(def[0]) ? 0 : 1;
    return locomotionBranch(ptr, locoindx) ?? def;
}

/**
 * C: stagger(const struct permonst *ptr, const char *def)
 * @param {Permonst|null|undefined} ptr
 * @param {string} def
 * @returns {string}
 */
export function stagger(ptr, def) {
    if (!ptr || typeof def !== 'string' || !def.length) return def || 'stagger';
    const locoindx = def[0] !== highc(def[0]) ? 2 : 3;
    return locomotionBranch(ptr, locoindx) ?? def;
}
