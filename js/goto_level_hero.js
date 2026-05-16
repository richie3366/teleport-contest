// goto_level_hero.js — do.c goto_level() subset for dig.c digactualhole + trap.c fall_through (hero falls).
// C ref: dig.c digactualhole() HOLE branch; trap.c trapeffect_hole() → fall_through(TRUE,…);
//        do.c goto_level / schedule_goto tail; spoteffects(FALSE) after arrival.
//
// Ported: **`applyGotoAfterHeroHoleFallLikeC`** (**`u.uz.dlevel`** +1 clamp **`num_dunlevs`**), **`utrap`** clear,
// **`mklev()`**, **`spotEffects(g, false)`**, **`vision_recalc`**; dig path **`You fall through...`** + pet jerk (**`next_to_u`** stub).
// Deferred: **`shopdig`/`pay_for_damage`**, **`impact_drop`/`pickup`**, **`fill_pit`**, real **`next_to_u`**,
// **`keepdogs`**, bones/save, **`schedule_goto`** / **`find_hell`**, **`trap->dst`**, full **`goto_level`**.

import { mklev } from './mklev.js';
import { spotEffects } from './spoteffects.js';
import { vision_recalc } from './vision.js';
import { pline } from './display.js';

/** C: mon.c **`next_to_u`** — stub **TRUE** until ball&chain / leash parity. */
export function nextToUForHoleFallStub() {
    return true;
}

/**
 * C: **`goto_level`** after a hole fall — bump **`dlevel`**, new map, **`spoteffects(FALSE)`**.
 * @param {import('./gstate.js').game} g
 */
export async function applyGotoAfterHeroHoleFallLikeC(g) {
    const u = g.u;
    if (!u || !g.level) return;

    const uz = u.uz || { dnum: 0, dlevel: 1 };
    const dnum = uz.dnum | 0;
    const prev = uz.dlevel | 0;
    const maxLev = g.dungeons?.[dnum]?.num_dunlevs;
    if (maxLev != null && prev >= (maxLev | 0)) return;

    let dlevel = prev + 1;
    if (maxLev != null && dlevel > (maxLev | 0)) dlevel = maxLev | 0;
    u.uz = { dnum, dlevel };
    u.utrap = 0;
    u.utraptype = 0;

    await mklev();
    await spotEffects(g, false, {});
    vision_recalc(1);
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

    /* C: **`shopdig`/`pay_for_damage`** — not ported (no RNG drain here). */
    await pline('You fall through...');

    await applyGotoAfterHeroHoleFallLikeC(g);
}
