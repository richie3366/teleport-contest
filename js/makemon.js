// makemon.js — Create monsters (stub until makemon.c is ported).
// C ref: makemon.c makemon(); rndmonst() path for ptr === null.

import { game } from './gstate.js';
import { MONS_MLET } from './mons_rndmonst_ini_inv_data.js';
import { rndmonstLikeC } from './makemon_rndmonst.js';
import {
    MONS_MLEVEL,
} from './mons_rndmonst_ini_inv_data.js';
import { d, rnd, rn2 } from './rng.js';

/** C: mondata.h is_ndemon — `mons[mndx].mlet` in S_IMP..S_DEMON. */
function isNdemonMndxLikeC(mndx) {
    const mlet = MONS_MLET[mndx | 0] | 0;
    return mlet >= 5 && mlet <= 10;
}

const PM_WUMPUS = 86;
const PM_LONG_WORM = 114;
const PM_GIANT_EEL = 326;

/**
 * C: makemon(struct permonst *mdat, coordxy x, coordxy y, mmflags_nht mmflags)
 * **`[0,0]`** → C “anyplace” (**`makemon_rnd_goodpos`**); stub uses hero **`u.ux`/`u.uy`** until **`goodpos`** is ported.
 * Random **`mdat`** (**`rndmonst`**) — **`rndmonst_adj`** weighted loop.
 * @returns {{ mx: number, my: number, mhp: number, mhpmax: number, msleeping: number, mpeaceful: number, mtame: number, mnum: number, mcanmove?: number, mfrozen?: number, mvflags?: number }|null}
 */
export function makemon(mdat, x, y, mmflags) {
    void mmflags;
    let px = x | 0;
    let py = y | 0;
    if (px === 0 && py === 0) {
        px = game.u?.ux | 0;
        py = game.u?.uy | 0;
    }
    let mnum = 0;
    if (mdat === null) {
        const picked = rndmonstLikeC();
        if (picked < 0) return null;
        mnum = picked;
    } else if (mdat && typeof mdat === 'object' && typeof mdat.mnum === 'number') {
        mnum = mdat.mnum | 0;
    }
    /* C: makemon.c newmonhp — `d(m_lev, 8)` for ordinary monsters (adj_lev ≈ mlevel on D:1). */
    const mLev = Math.max(1, MONS_MLEVEL[mnum | 0] | 0);
    const hp = d(mLev, 8);
    const mtmp = {
        mx: px,
        my: py,
        mhp: hp,
        mhpmax: hp,
        msleeping: 0,
        mpeaceful: 0,
        mtame: 0,
        mnum,
        mcanmove: 1,
        mfrozen: 0,
        mflee: 0,
        mfleetim: 0,
        movement: 0,
        mgenmklev: 0,
    };
    mtmp.mgenmklev = game.in_mklev ? 1 : 0;
    if (!rn2(2)) {
        /* C: makemon.c female = femaleok ? rn2(2) : 0 */
    }
    /* C: makemon.c in_mklev — ndemon / wumpus / worm / eel + rn2(5), not all monsters. */
    if (game.in_mklev && !game.u?.uhave?.amulet && !rn2(5)) {
        const n = mnum | 0;
        if (
            isNdemonMndxLikeC(n)
            || n === (PM_WUMPUS | 0)
            || n === (PM_LONG_WORM | 0)
            || n === (PM_GIANT_EEL | 0)
        ) {
            mtmp.msleeping = 1;
        }
    }
    const mons = game.level?.monsters;
    if (mons) mons.push(mtmp);
    return mtmp;
}

/** @deprecated Use rndmonstLikeC — legacy stub for mkcorpstat until ported. */
export function rndmonnum() {
    return rndmonstLikeC();
}
