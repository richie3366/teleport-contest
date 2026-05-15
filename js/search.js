// search.js — Trap / secret-door search (#search).
// C ref: detect.c dosearch(), dosearch0(int), sense_trap(), cursed_splash(),
//       findone(), mfind0(), rnl(); cmd.c dispatches #search → dosearch().
//
// This file exists so rhack() can call real C-shaped entry points. Do not
// paste session PRNG traces here; parity with recordings comes from faithful
// ports of the functions above, not from replaying seed-specific call lists.

import { pline } from './display.js';

/**
 * C: dosearch() — wrapper; eventually may handle multi-turn search, context.
 */
export async function dosearch() {
    await dosearch0(0);
}

/**
 * C: dosearch0(int) — search the eight neighbors, fund(), SDOOR/SCORR, traps.
 * @param {number} arg0 C `turn` / context flag (unused in minimal stub)
 */
export async function dosearch0(arg0) {
    void arg0;
    // TODO: Port neighbor iteration, obj/terrain checks, rn2/rnl as in detect.c.
    await pline('You find no traps or secret doors.');
}
