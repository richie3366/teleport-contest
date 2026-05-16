// goto_level_hero.js — do.c goto_level() subset for dig.c digactualhole + trap.c fall_through (hero falls).
// C ref: dig.c digactualhole() HOLE branch; trap.c trapeffect_hole() → fall_through(TRUE,…);
//        do.c goto_level / schedule_goto tail; spoteffects(FALSE) after arrival.
//
// Ported: **`applyGotoAfterHeroHoleFallLikeC(g, dest?)`**, **`impactDropLikeC`**/**`objDeliveryLikeC`** (**`dokick.c`**), **`shopdigLikeC(1)`** / **`payForDamage('dig into')`** before **`You fall through...`** (**`dig.c`** **`digactualhole`** order); **`pickup(1)`** tail (**`do.c`** **`goto_level`**).
// Deferred: **`fill_pit`**, real **`next_to_u`**,
// **`keepdogs`**, bones/save, full **`schedule_goto`/`goto_level`** beyond **`mklev`**.

import { mklev } from './mklev.js';
import { spotEffects } from './spoteffects.js';
import { vision_recalc } from './vision.js';
import { pline } from './display.js';
import { onLevelLikeC } from './hacklib.js';
import { shopdigLikeC, payForDamage, heroInShopOccupancyLikeUshops } from './shop.js';
import { impactDropLikeC, objDeliveryLikeC } from './impact_drop.js';
import { pickup } from './pickup.js';

/** C: mon.c **`next_to_u`** — stub **TRUE** until ball&chain / leash parity. */
export function nextToUForHoleFallStub() {
    return true;
}

/**
 * C: **`goto_level`** after a hole fall — set **`u.uz`**, new map, **`spoteffects(FALSE)`**.
 * @param {import('./gstate.js').game} g
 * @param {{ dnum: number, dlevel: number } | null | undefined} [dest] — C **`fall_through`** **`dtmp`** (**`trap->dst`**, **`find_hell`**, …). Omit for dig **`dlevel+1`** only.
 */
export async function applyGotoAfterHeroHoleFallLikeC(g, dest) {
    const u = g.u;
    if (!u || !g.level) return;

    const uz0 = u.uz || { dnum: 0, dlevel: 1 };
    /** @type {{ dnum: number, dlevel: number }} */
    let newUz;

    if (dest != null && Number.isInteger(dest.dlevel)) {
        const dn = dest.dnum | 0;
        let dl = dest.dlevel | 0;
        const mx = g.dungeons?.[dn]?.num_dunlevs;
        if (mx != null) {
            if (dl > (mx | 0)) dl = mx | 0;
            if (dl < 1) dl = 1;
        }
        newUz = { dnum: dn, dlevel: dl };
        if (onLevelLikeC(uz0, newUz)) return;
    } else {
        const dnum = uz0.dnum | 0;
        const prev = uz0.dlevel | 0;
        const maxLev = g.dungeons?.[dnum]?.num_dunlevs;
        if (maxLev != null && prev >= (maxLev | 0)) return;
        let dlevel = prev + 1;
        if (maxLev != null && dlevel > (maxLev | 0)) dlevel = maxLev | 0;
        newUz = { dnum, dlevel };
    }

    /* C: do.c **`goto_level`** **`falling`** → **`impact_drop(..., newlevel->dlevel)`** before **`u.uz`** assign. */
    await impactDropLikeC(g, null, u.ux | 0, u.uy | 0, newUz.dlevel | 0);

    u.uz = newUz;
    u.utrap = 0;
    u.utraptype = 0;

    await mklev();
    await objDeliveryLikeC(g, false);
    await spotEffects(g, false, {});
    await objDeliveryLikeC(g, true);
    vision_recalc(1);
    /* C: do.c goto_level() — **`(void) pickup(1);`** before return (after fall dmg / deliveries). */
    await pickup(1);
}

/**
 * C: digactualhole HOLE + at hero: **`goto_level`** then **`spoteffects(FALSE)`**.
 * Caller must have placed the hole trap; C pre-checks **`!u.ustuck`**, **`!Levitation`**, **`!Flying`** ( **`dighole.js`** ).
 * @param {import('./gstate.js').game} g
 * @param {number} digX
 * @param {number} digY
 */
export async function gotoLevelHeroFallThroughDigHoleLikeC(g, digX, digY) {
    const u = g.u;
    if (!u || !g.level) return;

    const xi = digX | 0;
    const yi = digY | 0;
    if ((u.ux | 0) !== xi || (u.uy | 0) !== yi) return;

    if (u.ustuck) return;

    let wontFall = !!(u.Levitation || u.Flying);
    if (!wontFall && !nextToUForHoleFallStub()) {
        await pline('You are jerked back by your pet!');
        wontFall = true;
    }
    if (wontFall) return;

    if (heroInShopOccupancyLikeUshops(g)) await shopdigLikeC(g, 1);
    else await payForDamage(g, 'dig into', true);

    await pline('You fall through...');

    await applyGotoAfterHeroHoleFallLikeC(g);
}
