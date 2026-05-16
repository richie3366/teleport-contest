// mvitals.js — Per-species game state (stub until decl.c / geno port).
// C ref: decl.c `struct mvitals mvitals[NUMMONS]`; mon.c make_corpse checks
// `svm.mvitals[mndx].mvflags & G_NOCORPSE`.

/** Enough slots for monsndx indices until `NUMMONS` is ported from upstream. */
export const MVITALS_SLOTS = 512;

/**
 * Allocate `g.mvitals[]` with default `mvflags: 0` (corpses allowed).
 * Safe to call on every `newgame`; no RNG.
 * @param {Record<string, unknown>} g
 */
export function initMvitalsStub(g, size = MVITALS_SLOTS) {
    if (!g) return;
    g.mvitals = Array.from({ length: size }, () => ({ mvflags: 0 }));
}
