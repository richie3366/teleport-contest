// mvitals.js — Per-species game state (stub until decl.c / geno port).
// C ref: decl.c `struct mvitals mvitals[NUMMONS]`; mon.c make_corpse checks
// `svm.mvitals[mndx].mvflags & G_NOCORPSE`; genocide sets `G_GENOD` (see mon.c).

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

/**
 * OR bits into `g.mvitals[mndx].mvflags` (e.g. `G_GENOD`, `G_NOCORPSE` from monflag).
 * No RNG. Out-of-range `mndx` is ignored.
 * @param {Record<string, unknown>} g
 * @param {number} mndx
 * @param {number} flags
 */
export function mergeMvitalsMvflags(g, mndx, flags) {
    const arr = g?.mvitals;
    if (!arr) return;
    const i = mndx | 0;
    if (i < 0 || i >= arr.length) return;
    const slot = arr[i];
    slot.mvflags = (slot.mvflags | 0) | (flags | 0);
}
