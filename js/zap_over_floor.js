// zap_over_floor.js — Floor tile effects from zaps / breath / wand explosions (subset).
// C ref: zap.c zap_over_floor(), zaptype(); monattk.h AD_* → ZT_* in zap.c preamble;
//        zap.c buzz()/bhit() — beam **`range += zap_over_floor(...)`** stepping (subset).

import { PHYS_EXPL_TYPE, BOLT_LIM, isok } from './const.js';
import { cansee } from './vision.js';
import { coldZapHitsWaterAt } from './melt_ice.js';

/** C: zap.c — wand zap base indices (AD_* − 1, first ten buzz damage kinds). */
export const ZT_MAGIC_MISSILE = 0;
export const ZT_FIRE = 1;
export const ZT_COLD = 2;
export const ZT_SLEEP = 3;
export const ZT_DEATH = 4;
export const ZT_LIGHTNING = 5;
export const ZT_POISON_GAS = 6;
export const ZT_ACID = 7;

/** C: zap.c ZT_WAND(x) */
export function ZT_WAND(x) {
    return x | 0;
}

/** C: zap.c ZT_SPELL(x) */
export function ZT_SPELL(x) {
    return 10 + (x | 0);
}

/** C: zap.c ZT_BREATH(x) */
export function ZT_BREATH(x) {
    return 20 + (x | 0);
}

/**
 * C: zap.c zaptype(int type) — monster wand zaps −39..−30 normalize before abs().
 * @param {number} type
 * @returns {number}
 */
export function zaptype(type) {
    let t = type | 0;
    if (t <= -30 && t >= -39) t += 30;
    return Math.abs(t);
}

/**
 * C: int damgtype = zaptype(type) % 10;
 * @param {number} type
 * @returns {number}
 */
export function zapDamgtype(type) {
    return zaptype(type) % 10;
}

/**
 * C: zap.c zap_over_floor(x, y, type, shopdamage, ignoremon, exploding_wand_typ) — JS subset.
 * **`ZT_COLD`** delegates to **`melt_ice.js`** **`coldZapHitsWaterAt`** (returns **`rangemod`**).
 *
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} type
 * @param {{ value?: boolean }|null} [_shopdamage] — C **`*shopdamage`** (doors/shops not ported)
 * @param {boolean} [_ignoremon]
 * @param {number} [_explodingWandTyp]
 * @returns {Promise<number>} rangemod (negative reduces beam range in **C**)
 */
export async function zapOverFloor(g, x, y, type, _shopdamage = null, _ignoremon = true, _explodingWandTyp = 0) {
    void _shopdamage;
    void _ignoremon;
    void _explodingWandTyp;
    if ((type | 0) === PHYS_EXPL_TYPE) return -1000;

    const damg = zapDamgtype(type);
    const seeIt = cansee(x, y);

    switch (damg) {
    case ZT_COLD:
        return await coldZapHitsWaterAt(g, x, y, seeIt);
    default:
        return 0;
    }
}

/**
 * C: zap.c buzz()/bhit() — walk **`(dx,dy)`** from **`(x0,y0)`**, each step **`range += zap_over_floor(...)`**.
 * When **`dx`=`dy`=0`**, a single **`zapOverFloor`** at **`(x0,y0)`** (hero self-zap / harness).
 *
 * @param {import('./gstate.js').game} g
 * @param {number} x0
 * @param {number} y0
 * @param {number} dx — −1, 0, or 1
 * @param {number} dy — −1, 0, or 1
 * @param {number} type — e.g. **`ZT_SPELL(ZT_COLD)`**
 * @param {number} [maxRange] — C beam range cap; default **`BOLT_LIM`**
 */
export async function zapOverFloorAlongRay(g, x0, y0, dx, dy, type, maxRange = BOLT_LIM) {
    const sx = x0 | 0;
    const sy = y0 | 0;
    const ddx = dx | 0;
    const ddy = dy | 0;
    if (ddx === 0 && ddy === 0) {
        await zapOverFloor(g, sx, sy, type);
        return;
    }
    let remaining = maxRange | 0;
    if (remaining <= 0) return;
    const cap = maxRange | 0;
    for (let i = 1; i <= cap; i++) {
        const x = sx + ddx * i;
        const y = sy + ddy * i;
        if (!isok(x, y)) break;
        const mod = await zapOverFloor(g, x, y, type);
        remaining += mod;
        if (mod <= -1000) break;
        if (remaining <= 0) break;
    }
}
