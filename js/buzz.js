// buzz.js — Hero beam floor effects (`zap.c` **`ubuzz`** / **`weffects`** ray subset).
// C ref: zap.c **`ubuzz`**, **`dobuzz`**, **`weffects`** (WAN_MAGIC_MISSILE…WAN_LIGHTNING);
//        include/hack.h **`BZ_OFS_WAN`**, **`BZ_U_WAND`**.

import { zapOverFloorAlongRay, ZT_WAND } from './zap_over_floor.js';

/** C: objects.h — first RAY wand after **`WAN_DIGGING`** ( **`mklev.js`** pins digging at **305**). */
export const WAN_MAGIC_MISSILE = 306;

/**
 * C: hack.h **`BZ_OFS_WAN(otyp)`** — index **0..9** along magic missile…lightning block.
 * @param {number} otyp
 */
export function BZ_OFS_WAN(otyp) {
    return Math.abs((otyp | 0) - WAN_MAGIC_MISSILE) % 10;
}

/**
 * C: hack.h **`BZ_U_WAND(bztyp)`** → **`ZT_WAND`** hero wand **`dobuzz`** type.
 * @param {number} otyp — e.g. **`WAN_FIRE`** (**`WAN_MAGIC_MISSILE` + 1**)
 */
export function wandUbuzzTypeFromOtyp(otyp) {
    return ZT_WAND(BZ_OFS_WAN(otyp));
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
