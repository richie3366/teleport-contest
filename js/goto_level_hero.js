// goto_level_hero.js — do.c goto_level() subset for dig.c digactualhole + trap.c fall_through (hero falls).
// C ref: dig.c digactualhole() HOLE branch; trap.c trapeffect_hole() → fall_through(TRUE,…);
//        do.c goto_level / schedule_goto tail; spoteffects(FALSE) after arrival.
//
// Ported: **`applyGotoAfterHeroHoleFallLikeC(g, dest?)`**, **`impactDropLikeC`**/**`objDeliveryLikeC`** (**`dokick.c`**), **`shopdigLikeC(1)`** / **`payForDamage('dig into')`** before **`You fall through...`** (**`dig.c`** **`digactualhole`** order); **`pickup(1)`** tail (**`do.c`** **`goto_level`**).
// **`applyHeroDescendStairsOneLevelLikeC(g)`** — **`do.c`** **`goto_level`** down-stairs slice after **`mklev`**/**`u_on_upstairs`** (**`near_capacity`/`Punished`/`Fumbling`**, **`drag_down`**, **`losehp`**, **`placebc`** omitted).
// Deferred: **`fill_pit`**, real **`next_to_u`**,
// **`keepdogs`**, bones/save, full **`schedule_goto`/`goto_level`** beyond **`mklev`**.

import { mklev, u_on_upstairs } from './mklev.js';
import { spotEffects } from './spoteffects.js';
import { vision_recalc } from './vision.js';
import { pline } from './display.js';
import { onLevelLikeC } from './hacklib.js';
import { shopdigLikeC, payForDamage, heroInShopOccupancyLikeUshops } from './shop.js';
import { impactDropLikeC, objDeliveryLikeC } from './impact_drop.js';
import { pickup } from './pickup.js';
import { stairwayAtInGame } from './decor.js';
import { nearCapacity, syncHeroInvWeightNetLikeC } from './encumbr.js';
import { maybeHalfPhys, losehp } from './mthrowu.js';
import { rnd } from './rng.js';
import { dragDownHeroStairsLikeC } from './hold_another_hero.js';

/** C: **`Punished`** / carried **`uball`** — macro subset until **`punish()`** sets **`u.Punished`**. */
function heroPunishedLikeC(g) {
    const u = g?.u;
    if (!u) return false;
    if ((u.Punished | 0) !== 0) return true;
    const b = g.uball;
    if (!b) return false;
    for (let o = g.invent; o; o = o.nobj) if (o === b) return true;
    return false;
}

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

/**
 * C: **`do.c`** **`goto_level`** — **`at_stairs`** && !**`up`** && !**`In_endgame`** after **`u_on_upstairs`**
 * ( **`stairway_find_from`** / **`u_on_sstairs`** omitted; **`u.dz`** treated as down).
 * Omits **`ballrelease`**, **`dismount_steed`**, **`selftouch`**, **`placebc`**, **`obj_delivery`**, branch mapseen.
 * @param {import('./gstate.js').game} g
 * @returns {Promise<boolean>} true if level changed
 */
export async function applyHeroDescendStairsOneLevelLikeC(g) {
    const u = g.u;
    if (!u || !g.level) return false;

    const st = stairwayAtInGame(g, u.ux | 0, u.uy | 0);
    if (!st || st.up) {
        await pline("You can't go down here.");
        return false;
    }

    const uz0 = u.uz || { dnum: 0, dlevel: 1 };
    const dnum = uz0.dnum | 0;
    const prev = uz0.dlevel | 0;
    const maxLev = g.dungeons?.[dnum]?.num_dunlevs;
    if (maxLev != null && prev >= (maxLev | 0)) {
        await pline("You can't go down here.");
        return false;
    }

    const atLadder = !!st.isladder;
    const newUz = { dnum, dlevel: prev + 1 };

    u.uz = newUz;
    u.utrap = 0;
    u.utraptype = 0;

    await mklev();
    u_on_upstairs();
    syncHeroInvWeightNetLikeC(g);

    const flying = !!(u.Levitation || u.Flying);
    const verbose = !!g.flags?.verbose;

    if (flying) {
        if (verbose) {
            await pline(
                atLadder ? 'You fly down along the ladder.' : 'You fly down the stairs.',
            );
        }
    } else if (
        (nearCapacity(g) | 0) > 0
        || heroPunishedLikeC(g)
        || (u.Fumbling | 0) !== 0
    ) {
        await pline(atLadder ? 'You fall down the ladder.' : 'You fall down the stairs.');
        if (heroPunishedLikeC(g) && g.uball) await dragDownHeroStairsLikeC(g);
        if (!(u.usteed | 0)) {
            const knm = atLadder ? 'falling off a ladder' : 'tumbling down a flight of stairs';
            losehp(maybeHalfPhys(rnd(3)), knm, 0);
        }
    } else if (verbose) {
        await pline(atLadder ? 'You climb down the ladder.' : 'You descend the stairs.');
    }

    /* C: **`goto_level`** — **`placebc`** after arrival when **`Punished`** (not ported). */
    await objDeliveryLikeC(g, false);
    await spotEffects(g, false, {});
    await objDeliveryLikeC(g, true);
    vision_recalc(1);
    await pickup(1);
    return true;
}
