// were_hero.js — were.c you_were / you_unwere subset for potion.c potionbreathe() water vapors.
// C ref: were.c you_were(), you_unwere(); hack.c monster_nearby(); polyself.c polymon()/rehumanize() (minimal).

import { pline } from './display.js';
import { ismnum, NON_PM, M_AP_FURNITURE, M_AP_OBJECT } from './const.js';
import {
    isWerePtr,
    isHider,
    permonstHuman,
    raceptr,
    noattacksPtr,
} from './mondata.js';
import { rn1 } from './rng.js';
import { cansee } from './vision.js';
import { distmin } from './hacklib.js';
import { syncPolyHpFromHumanShape } from './u_init_hp_energy.js';

const M2_WERE = 0x00000004;

function helplessWereMon(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/** Minimal beast permonst so `isWerePtr` matches C `is_were` for lycanthrope forms. */
function permonstWereBeastStub(mnum) {
    return { ...permonstHuman, mnum: mnum | 0, mflags2: M2_WERE };
}

/**
 * C: you.h `Upolyd` ≡ `(u.mtimedone != 0)` — JS keeps both `u.Upolyd` and `u.mtimedone` in sync here.
 * @param {{ Upolyd?: number, mtimedone?: number }|null|undefined} u
 */
export function upolydHeroLikeC(u) {
    if (!u) return false;
    if (u.Upolyd | 0) return true;
    return (u.mtimedone | 0) > 0;
}

/**
 * C: hack.c monster_nearby() — subset for were-change gating (no `onscary`, full `canspotmon`).
 * @param {import('./gstate.js').game} g
 */
export function monsterNearbyWereLikeC(g) {
    const u = g.u;
    if (!u) return false;
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const list = g.level?.monsters;
    if (!list?.length) return false;
    const hallu = u.Hallucination | 0;
    for (const mtmp of list) {
        const x = mtmp.mx | 0;
        const y = mtmp.my | 0;
        if (distmin(x, y, ux, uy) !== 1) continue;
        const ap = mtmp.m_ap_type | 0;
        if (ap === M_AP_FURNITURE || ap === M_AP_OBJECT) continue;
        const ptr = raceptr(mtmp);
        if (!hallu && ((mtmp.mpeaceful | 0) || noattacksPtr(ptr))) continue;
        if (isHider(ptr) && (mtmp.mundetected | 0)) continue;
        if (helplessWereMon(mtmp)) continue;
        if (!cansee(x, y)) continue;
        return true;
    }
    return false;
}

async function rehumanizeWereVaporSubsetLikeC(g) {
    const u = g.u;
    if (!u) return;
    if (u.Unchanging | 0) return;
    await pline(`You return to ${g.urace?.adj || 'human'} form!`);
    u.Upolyd = 0;
    u.mtimedone = 0;
    const rm = g.urace?.mnum ?? 0;
    u.umonnum = rm;
    g.youmonst = g.youmonst || {};
    g.youmonst.mnum = rm;
    g.youmonst.data = g.urace?.permonst ?? permonstHuman;
    g.disp = g.disp || {};
    g.disp.botl = true;
    g.vision_full_recalc = 1;
}

/**
 * C: were.c you_unwere(purify) — paths used when **`purify`** is FALSE (**`potionbreathe`** holy vapor).
 * Omits **`paranoid_query`** / **`Polymorph_control`** (not in JS yet); omits **`Unchanging`** death.
 */
export async function youUnwerePotionbreatheSubsetLikeC(g, purify) {
    const u = g.u;
    if (!u) return;
    if (purify) {
        await pline('You feel purified.');
        u.ulycn = NON_PM;
        return;
    }
    if (u.Unchanging | 0) return;
    const ptr = g.youmonst?.data ?? permonstHuman;
    if (isWerePtr(ptr) && !monsterNearbyWereLikeC(g)) {
        await rehumanizeWereVaporSubsetLikeC(g);
    } else if (isWerePtr(ptr) && !(u.mtimedone | 0)) {
        u.mtimedone = rn1(200, 200);
        u.Upolyd = upolydHeroLikeC(u) ? 1 : 0;
    }
}

/**
 * C: were.c you_were() — subset for **`potionbreathe`** cursed water vapor (**`!Upolyd`**).
 * Omits **`paranoid_query`**, genocides, **`polymon`** inventory/stat tails; **`rn1(500,500)`** matches **`polymon`** timer start.
 */
export async function youWerePotionbreatheSubsetLikeC(g) {
    const u = g.u;
    if (!u) return;
    const lycn = u.ulycn | 0;
    if (!ismnum(lycn)) return;
    if (u.Unchanging | 0) return;
    if ((u.umonnum | 0) === lycn) return;
    if (monsterNearbyWereLikeC(g)) return;
    g.context = g.context || {};
    g.context.were_changes = (g.context.were_changes | 0) + 1;
    u.mtimedone = rn1(500, 500);
    u.umonnum = lycn;
    u.Upolyd = 1;
    g.youmonst = g.youmonst || {};
    g.youmonst.mnum = lycn;
    g.youmonst.data = permonstWereBeastStub(lycn);
    await pline('You turn into a beast!');
    syncPolyHpFromHumanShape();
    g.disp = g.disp || {};
    g.disp.botl = true;
    g.vision_full_recalc = 1;
}
