// goto_level_hero.js — do.c goto_level() subset for dig.c digactualhole (HOLE + hero falls).
// C ref: dig.c digactualhole() HOLE branch; do.c goto_level(&newlevel, FALSE, TRUE, FALSE) tail;
//        spoteffects(FALSE) after arrival.
//
// Ported: **`You fall through...`**, **`u.uz.dlevel`** +1 (clamp **`num_dunlevs`**), **`utrap`** clear,
// **`mklev()`** new map, **`spotEffects(g, false)`**, **`vision_recalc`**.
// Deferred: **`shopdig`/`pay_for_damage`**, **`impact_drop`/`pickup`**, **`fill_pit`**, **`next_to_u`** leash,
// **`keepdogs`**, bones/save, endgame/quest gates, full **`goto_level`**.

import { mklev } from './mklev.js';
import { spotEffects } from './spoteffects.js';
import { vision_recalc } from './vision.js';
import { pline } from './display.js';

/** C: mon.c **`next_to_u`** — stub **TRUE** until ball&chain / engulfer parity (**`trap.js`**). */
function nextToUStub() {
    return true;
}

/**
 * C: digactualhole HOLE + at hero: **`goto_level(&newlevel, FALSE, TRUE, FALSE)`** then **`spoteffects(FALSE)`**.
 * Caller must have placed the hole trap and matched C **`!u.ustuck`**, **`!Levitation`**, **`!Flying`** prechecks.
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
    if (!wontFall && !nextToUStub()) {
        await pline('You are jerked back by your pet!');
        wontFall = true;
    }
    if (wontFall) return;

    /* C: **`shopdig`/`pay_for_damage`** — not ported (no RNG drain here). */
    await pline('You fall through...');

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
