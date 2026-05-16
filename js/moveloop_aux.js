// moveloop_aux.js — End-of-turn RNG after movemon (allmain.c moveloop_core tail).
// C ref: allmain.c (maybe_generate_rnd_mon, dosounds, …), eat.c gethungry (called from allmain after moves++).
//
// `pre_moveloop82_exercise` / `post_moveloop82_exercise` still replay bare `rn2` for session harness.

import { game } from './gstate.js';
import { rn2, rnd } from './rng.js';
import { A_DEX } from './const.js';
import { acurr } from './attrib.js';
import { uWipeEngr } from './engrave.js';
import { nearCapacity, ENC } from './encumbr.js';
import { uhsFromUhunger } from './hunger.js';

export function maybe_generate_rnd_mon() {
    rn2(70);
}

export function dosounds() {
    rn2(300);
}

/**
 * C: eat.c gethungry(void) — minimal port: ordinary uhunger--, accessorytime = rn2(20),
 * odd/even ring hunger (HRegeneration / encumbrance / Hunger / Conflict), no switch(ring) yet.
 * C order vs exerchk: allmain calls this immediately after svm.moves++, then exerchk().
 */
export function gethungry() {
    const u = game.u;
    if (!u || typeof u.uhunger !== 'number') return;
    if (u.uinvulnerable || game.iflags?.debug_hunger) return;

    /* C: !(Unaware || !rn2(10)) omitted — asleep metabolic stub */
    if (!(u.Upolyd | 0) && !u.Slow_digestion) u.uhunger--;

    const accessorytime = rn2(20);
    if (accessorytime % 2) {
        if (u.HRegeneration) u.uhunger--;
        if (nearCapacity() > ENC.SLT_ENCUMBER) u.uhunger--;
    } else {
        if (u.Hunger) u.uhunger--;
        if (u.HConflict) u.uhunger--;
    }
    /* C: switch (accessorytime) ring/amulet nutrition — port when uleft/uright/uamul exist */
    u.uhs = uhsFromUhunger(u.uhunger);
}

/** C: allmain.c — if (!rn2(40 + ACURR(A_DEX) * 3)) u_wipe_engr(rnd(3)); */
export function maybe_u_wipe_engr() {
    const u = game.u;
    if (!u) return;
    const dex = acurr(A_DEX);
    const denom = 40 + Math.trunc(dex * 3);
    if (!rn2(denom)) uWipeEngr(rnd(3));
}

/** C: attrib.c exercise — rn2(19) before final moveloop rn2(82) on some turns. */
export function pre_moveloop82_exercise(stepNum) {
    if (stepNum === 9) rn2(19);
}

/** C: allmain.c moveloop_core — trailing rn2(82) in this session build. */
export function moveloop_core_rng82() {
    rn2(82);
}

/** C: attrib.c exercise — extra rn2(31) after rn2(82) on harness step 6. */
export function post_moveloop82_exercise(stepNum) {
    if (stepNum === 6) rn2(31);
}

/** Full tail after movemon for one game-time step (harness range only). */
export function end_of_turn_rng(stepNum) {
    maybe_generate_rnd_mon();
    dosounds();
    maybe_u_wipe_engr();
    pre_moveloop82_exercise(stepNum);
    moveloop_core_rng82();
    post_moveloop82_exercise(stepNum);
}
