// moveloop_aux.js — End-of-turn RNG after movemon (allmain.c moveloop_core tail).
// C ref: allmain.c (maybe_generate_rnd_mon, dosounds, gethungry, …), attrib.c exercise.
//
// These are minimal parity stubs: one draw each where the recorder attributes
// a single rn2 to the C function. Replace with real ports incrementally.

import { rn2 } from './rng.js';

export function maybe_generate_rnd_mon() {
    rn2(70);
}

export function dosounds() {
    rn2(300);
}

export function gethungry() {
    rn2(20);
}

/** C: attrib.c exercise — rn2(19) before final moveloop rn2(82) on some turns. */
export function pre_moveloop82_exercise(stepNum) {
    if (stepNum === 9) rn2(19);
}

/** C: allmain.c moveloop_core — trailing rn2(82) in this session build. */
export function moveloop_core_rng82() {
    rn2(82);
}

/** C: attrib.c exercise — extra rn2(31) after rn2(82) on move 6 in seed8000. */
export function post_moveloop82_exercise(stepNum) {
    if (stepNum === 6) rn2(31);
}

/** Full tail after movemon for one game-time step (harness range only). */
export function end_of_turn_rng(stepNum) {
    maybe_generate_rnd_mon();
    dosounds();
    gethungry();
    pre_moveloop82_exercise(stepNum);
    moveloop_core_rng82();
    post_moveloop82_exercise(stepNum);
}
