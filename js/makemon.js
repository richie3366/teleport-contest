// makemon.js — Create monsters (stub until makemon.c is ported).
// C ref: makemon.c makemon(); rndmonst() path for ptr === null.

import { game } from './gstate.js';
import { rnd, rn2 } from './rng.js';

/**
 * C: makemon.c rndmonst-style selection — weighted loop not ported; contest stub.
 * Used by mkcorpstat when pm is null.
 */
export function rndmonnum() {
    rn2(398);
    return 0;
}

/**
 * C: makemon(struct permonst *mdat, coordxy x, coordxy y, mmflags_nht mmflags)
 * Stub: consumes a minimal RNG slice for random mdat at fixed coordinates.
 * @returns {{ mx: number, my: number, mhp: number, msleeping: number, mpeaceful: number }|null}
 */
export function makemon(mdat, x, y, mmflags) {
    void mmflags;
    if (mdat === null) {
        rndmonnum();
    }
    const hp = rnd(8);
    return { mx: x, my: y, mhp: hp, msleeping: 0, mpeaceful: 0 };
}
