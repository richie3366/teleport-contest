// m_move_mon.js — **`mon.c`** **`m_move()`** subset invoked from **`monmove.c`** **`movemon`**.
// C ref: mon.c **`m_move(struct monst *mtmp, int after)`**; monmove.c **`movemon`** walks **`fmon`**.
//
// Ported: per-monster step then **`m_throw`** at hero (**`mthrow_mon.js`** **`mThrowAtHeroAfterMmoveIfLinedUpLikeC`**).
// Omits **`distfleeck`**, **`mcalcmove`** energy, grid **`domove`**, **`attack`**, **`minliquid`**, vault guard, worm tails.

import { mThrowAtHeroAfterMmoveIfLinedUpLikeC } from './mthrow_mon.js';

/**
 * C: **`mon.c`** **`m_move(mtmp, 0)`** — one monster’s turn (**subset**).
 * @param {import('./gstate.js').game} g
 * @param {*} mtmp
 */
export async function mMoveOneMonsterSubsetLikeC(g, mtmp) {
    if (!mtmp) return;
    if ((mtmp.mhp | 0) <= 0) return;
    await mThrowAtHeroAfterMmoveIfLinedUpLikeC(g, mtmp);
}
