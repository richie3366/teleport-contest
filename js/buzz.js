// buzz.js — Hero + monster beam floor effects (`zap.c` **`ubuzz`/`buzz`/`dobuzz`**, **`muse.c`**).
// C ref: zap.c **`ubuzz`**, **`buzz`**, **`dobuzz`**, **`weffects`**;
//        muse.c **`use_offensive`** (**`BZ_M_WAND(BZ_OFS_WAN(otmp->otyp))`**, **`sgn(mux-mx)`**),
//        frost horn **`BZ_M_WAND(BZ_OFS_AD(AD_COLD|AD_FIRE))`**;
//        include/hack.h **`BZ_*`**, **`BZ_OFS_AD`**, **`BZ_OFS_SPE`**;
//        include/monattk.h **`AD_*`**.

import { zapOverFloorAlongRay, ZT_WAND } from './zap_over_floor.js';
import { isok } from './const.js';

/** C: objects.h — first RAY wand after **`WAN_DIGGING`** ( **`mklev.js`** pins digging at **305**). */
export const WAN_MAGIC_MISSILE = 306;

/** C: objects.h — **`WAN_FIRE`** after magic missile. */
export const WAN_FIRE = WAN_MAGIC_MISSILE + 1;

/** C: objects.h — ray wands follow **`WAN_MAGIC_MISSILE`** order (**`zap.c`** **`weffects`**). */
export const WAN_COLD = WAN_MAGIC_MISSILE + 2;

/** C: objects.h / **`spellbook_skill_level_data.js`** — first RAY spell (**`SPELL("magic missile"`**). */
export const SPE_MAGIC_MISSILE = 367;

/** C: monattk.h */
export const AD_MAGM = 1;
export const AD_FIRE = 2;
export const AD_COLD = 3;

/**
 * C: hack.h **`BZ_OFS_WAN(otyp)`**.
 * @param {number} otyp
 */
export function BZ_OFS_WAN(otyp) {
    return Math.abs((otyp | 0) - WAN_MAGIC_MISSILE) % 10;
}

/**
 * C: hack.h **`BZ_OFS_SPE(otyp)`**.
 * @param {number} otyp
 */
export function BZ_OFS_SPE(otyp) {
    return Math.abs((otyp | 0) - SPE_MAGIC_MISSILE) % 10;
}

/**
 * C: hack.h **`BZ_OFS_AD(adtyp)`**.
 * @param {number} adtyp
 */
export function BZ_OFS_AD(adtyp) {
    return Math.abs((adtyp | 0) - AD_MAGM) % 10;
}

/** C: hack.h **`BZ_M_WAND(bztyp)`** — monster wand / frost-horn-as-wand encoding (**`-39..-30`**). */
export function BZ_M_WAND(bztyp) {
    return -30 - (bztyp | 0);
}

/** C: hack.h **`BZ_M_SPELL(bztyp)`** — monster spell (**`-19..-10`**). */
export function BZ_M_SPELL(bztyp) {
    return -10 - (bztyp | 0);
}

/** C: hack.h **`BZ_M_BREATH(bztyp)`** — monster breath (**`-29..-20`**). */
export function BZ_M_BREATH(bztyp) {
    return -20 - (bztyp | 0);
}

/**
 * C: hack.h **`BZ_U_WAND(bztyp)`** → **`ZT_WAND`** hero wand **`dobuzz`** type.
 * @param {number} otyp — e.g. **`WAN_FIRE`** (**`WAN_MAGIC_MISSILE` + 1**)
 */
export function wandUbuzzTypeFromOtyp(otyp) {
    return ZT_WAND(BZ_OFS_WAN(otyp));
}

/** C: muse.c offensive wand — **`BZ_M_WAND(BZ_OFS_WAN(otyp))`**. */
export function wandMbuzzTypeFromOtyp(otyp) {
    return BZ_M_WAND(BZ_OFS_WAN(otyp));
}

/** C: muse.c frost horn — **`BZ_M_WAND(BZ_OFS_AD(AD_COLD|AD_FIRE))`**. */
export function hornMbuzzTypeFromAd(adtyp) {
    return BZ_M_WAND(BZ_OFS_AD(adtyp));
}

/** C: muse.c **`sgn(mtmp->mux - mtmp->mx)`** style. */
export function sgn(n) {
    const v = n | 0;
    if (v > 0) return 1;
    if (v < 0) return -1;
    return 0;
}

/**
 * C: zap.c **`ubuzz(type, nd)`** → **`dobuzz(type, nd, u.ux, u.uy, u.dx, u.dy, …)`**.
 * Floor/shop slice only — **`nd`** reserved for future **`zhitm`** parity.
 *
 * @param {import('./gstate.js').game} g
 * @param {number} type — **`ZT_WAND`/`ZT_SPELL`/`ZT_BREATH`** encoding
 * @param {number} [_nd]
 * @param {number} [maxRange]
 * @param {{ value?: boolean }|null} [shopdamageRef]
 */
export async function ubuzzOverFloor(g, type, _nd = 0, maxRange, shopdamageRef = null) {
    const u = g.u;
    if (!u) return;
    await zapOverFloorAlongRay(
        g,
        u.ux | 0,
        u.uy | 0,
        u.dx | 0,
        u.dy | 0,
        type | 0,
        maxRange === undefined ? undefined : maxRange,
        shopdamageRef,
    );
}

/**
 * C: zap.c **`buzz(type, nd, sx, sy, dx, dy)`** → **`dobuzz`** — arbitrary start + direction.
 * @param {import('./gstate.js').game} g
 * @param {number} type — hero (**`≥0`**) or monster (**`BZ_M_*`** negative) **`dobuzz`** type
 * @param {number} [_nd]
 * @param {number} sx
 * @param {number} sy
 * @param {number} dx
 * @param {number} dy
 * @param {number} [maxRange]
 * @param {{ value?: boolean }|null} [shopdamageRef]
 */
export async function mbuzzOverFloor(g, type, _nd, sx, sy, dx, dy, maxRange, shopdamageRef = null) {
    await zapOverFloorAlongRay(
        g,
        sx | 0,
        sy | 0,
        dx | 0,
        dy | 0,
        type | 0,
        maxRange === undefined ? undefined : maxRange,
        shopdamageRef,
    );
}

/**
 * Wizard harness: virtual monster on **`(u.ux+u.dx, u.uy+u.dy)`** zaps toward the hero
 * (**`muse.c`** **`sgn(u.ux-mx)`**, **`sgn(u.uy-my)`**).
 * @returns {boolean} false if **`u.dx`=`u.dy`=0`**, bad **`(sx,sy)`**, or aim **(0,0)**
 */
export async function mbuzzTowardHeroFromFacingNeighbor(g, type, nd = 6, maxRange, shopdamageRef = null) {
    const u = g.u;
    if (!u) return false;
    const dx0 = u.dx | 0;
    const dy0 = u.dy | 0;
    if (dx0 === 0 && dy0 === 0) return false;
    const sx = (u.ux + dx0) | 0;
    const sy = (u.uy + dy0) | 0;
    if (!isok(sx, sy)) return false;
    const mdx = sgn((u.ux | 0) - sx);
    const mdy = sgn((u.uy | 0) - sy);
    if (mdx === 0 && mdy === 0) return false;
    await mbuzzOverFloor(g, type, nd, sx, sy, mdx, mdy, maxRange, shopdamageRef);
    return true;
}
