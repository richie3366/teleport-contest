// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), adisturb()

import { pline } from './display.js';

/** C: fix_shop_damage() — repair shop walls after restore. */
export function fixShopDamage() {
}

/**
 * C: shk.c adisturb (subset) — peaceful shopkeeper / temple priest / vault guard
 * becomes hostile when struck. No-op if not those roles or already hostile.
 * @param {{ mpeaceful?: number, isshk?: number, ispriest?: number, isgd?: number, mAngry?: number }} mtmp
 */
export async function adisturb(mtmp) {
    if (!mtmp) return;
    const m = /** @type {Record<string, unknown>} */ (mtmp);
    if (!(m.isshk || m.ispriest || m.isgd)) return;
    if (!(mtmp.mpeaceful | 0)) return;
    mtmp.mpeaceful = 0;
    m.mAngry = 1;
    if (m.isshk) await pline('The shopkeeper gets angry!');
    else if (m.ispriest) await pline('The priest gets angry!');
    else await pline('The guard gets angry!');
}
