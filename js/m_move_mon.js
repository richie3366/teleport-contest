// m_move_mon.js — **`mon.c`** **`m_move()`** subset invoked from **`monmove.c`** **`movemon`**.
// C ref: mon.c **`m_move(struct monst *mtmp, int after)`**; monmove.c **`movemon`** walks **`fmon`**.
//
// Ported: **`distfleeck`** on selected moveloop steps (see **`monmove.js`** harness pairing), then **`m_throw`**.
// **`mcalcmove`**: **`mcalc_move.js`** (**`mcalcMoveLikeC`**) — not yet folded into moveloop timing.
// Omits **`mcalcmove`** **`movement`** accounting, grid **`domove`**, **`attack`**, **`minliquid`**, vault guard, worm tails.

import { mThrowAtHeroAfterMmoveIfLinedUpLikeC } from './mthrow_mon.js';
import { distfleeckMonsterApplyLikeC } from './distfleeck_mon.js';

/**
 * C: **`mon.c`** **`m_move(mtmp, 0)`** — one monster’s turn (**subset**).
 * @param {import('./gstate.js').game} g
 * @param {*} mtmp
 * @param {number} [stepNum] — 1-based moveloop step index (**`movemon`**); **`distfleeck`** when **2** only (harness pairing).
 */
export async function mMoveOneMonsterSubsetLikeC(g, mtmp, stepNum = 0) {
    if (!mtmp) return;
    if ((mtmp.mhp | 0) <= 0) return;
    if (stepNum === 2) await distfleeckMonsterApplyLikeC(g, mtmp);
    await mThrowAtHeroAfterMmoveIfLinedUpLikeC(g, mtmp);
}
