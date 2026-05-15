// moveloop_aux.js — End-of-turn RNG after movemon (allmain.c moveloop_core tail).
// C ref: allmain.c (maybe_generate_rnd_mon, dosounds, gethungry, …), attrib.c exercise.
//
// These are minimal parity stubs: one draw each where the recorder attributes
// a single rn2 to the C function. Replace with real ports incrementally.

import { game } from './gstate.js';
import { rn2, rnd } from './rng.js';
import { uWipeEngr } from './engrave.js';

export function maybe_generate_rnd_mon() {
    rn2(70);
}

export function dosounds() {
    rn2(300);
}

export function gethungry() {
    rn2(20);
}

/** C: allmain.c — if (!rn2(40 + ACURR(A_DEX) * 3)) u_wipe_engr(rnd(3)); */
export function maybe_u_wipe_engr() {
    const u = game.u;
    if (!u) return;
    const dex = u.acurr?.a?.[1] ?? 10;
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
    gethungry();
    maybe_u_wipe_engr();
    pre_moveloop82_exercise(stepNum);
    moveloop_core_rng82();
    post_moveloop82_exercise(stepNum);
}
