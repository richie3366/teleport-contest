// dig_pay.js — dig.c shop billing tail after add_damage (dighole / zap dig paths).
// C ref: dig.c pay_for_damage(shopdoor ? "destroy" : "dig into", FALSE) after hero
//        shop wall/door dig; callers must have merged damagelist via shk.c add_damage.

import { payForDamage } from './shop.js';

/**
 * C: dig.c — after **`add_damage`** for shop wall/door, **`pay_for_damage`** once per dig.
 * @param {import('./gstate.js').game} g
 * @param {boolean} shopdoor
 * @param {boolean} shopwall
 */
export async function payAfterHeroDigShopHoleLikeC(g, shopdoor, shopwall) {
    if (!shopdoor && !shopwall) return;
    await payForDamage(g, shopdoor ? 'destroy' : 'dig into', false);
}
