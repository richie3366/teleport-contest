// m_move_mon.js — **`mon.c`** **`m_move()`** subset invoked from **`monmove.c`** **`movemon`**.
// C ref: mon.c **`m_move(struct monst *mtmp, int after)`**; monmove.c **`movemon`** walks **`fmon`**.
//
// Ported: C **`monmove.c`** **`dochug`** — first **`distfleeck`** (~791) then **`m_move`**/**`m_throw`**,
// then second **`distfleeck`** (~915) when **`status != MMOVE_DIED`** (alive ⇒ **`mhp > 0`** here).
// **`stepNum===1`**: harness only (no per-mon **`distfleeck`** in this stub pairing). **`stepNum ≥ 2`**:
// both **`distfleeck`** calls; **`monmove.js`** harness rows **3–12** omit aggregate **`rn2(5)`** from **`distfleeck`**.
// **`mcalcmove`**: **`allmain.js`** adds **`movement`** each **`context.move`**; this path subtracts **`NORMAL_SPEED`** before **`distfleeck`**/**`m_throw`** (C order: spend then **`dochugw`** subtree).
// Omits **`minliquid`**, misc_worn, hider/eel, **`fightm`**, grid **`domove`**, vault guard, worm tails.

import { NORMAL_SPEED } from './const.js';
import { mThrowAtHeroAfterMmoveIfLinedUpLikeC } from './mthrow_mon.js';
import { distfleeckMonsterApplyLikeC } from './distfleeck_mon.js';

/**
 * C: **`mon.c`** **`m_move(mtmp, 0)`** — one monster’s turn (**subset**).
 * @param {import('./gstate.js').game} g
 * @param {*} mtmp
 * @param {number} [stepNum] — 1-based moveloop step index (**`movemon`**).
 */
export async function mMoveOneMonsterSubsetLikeC(g, mtmp, stepNum = 0) {
    if (!mtmp) return;
    if ((mtmp.mhp | 0) <= 0) return;
    /* C: mon.c movemon_singlemon — if (mtmp->movement < NORMAL_SPEED) return FALSE; mtmp->movement -= NORMAL_SPEED; */
    const mov = mtmp.movement | 0;
    if (mov < NORMAL_SPEED) return;
    mtmp.movement = mov - NORMAL_SPEED;
    if (stepNum >= 2) await distfleeckMonsterApplyLikeC(g, mtmp);
    await mThrowAtHeroAfterMmoveIfLinedUpLikeC(g, mtmp);
    if (stepNum >= 2 && (mtmp.mhp | 0) > 0) await distfleeckMonsterApplyLikeC(g, mtmp);
}
