import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { glibc_qsort } from "../js/invent.js";

// sortloot qsort fidelity: C invent.c sortloot :634 calls libc qsort() with
// sortloot_cmp, whose spe key (:530-536) is gated on obj1's otyp
// oc_uses_known only — INCONSISTENT for uses_known-vs-plain pairs with all
// earlier keys tied (cmp(a,b)>0 and cmp(b,a)>0 both hold). glibc's
// mergesort decides such pairs opposite to V8 Array.sort. Expected orders
// below are glibc 2.36 qsort outputs (differential /tmp/sortdiff harness),
// NOT the JS implementation's own output.

// Parametric sortloot_cmp mirror on precomputed key vectors:
// [orderclass, subclass, disco, name, bucx, grease, erosion, erodeproof,
//  uskn, known, spe]. indx = input position (C :623-624).
function cmp(a, b) {
    for (const k of ["c", "s", "d", "n"]) {
        if (a[k] !== b[k]) return a[k] - b[k];
    }
    if (a.bucx !== b.bucx) return b.bucx - a.bucx;
    if (a.grease !== b.grease) return b.grease - a.grease;
    if (a.erosion !== b.erosion) return a.erosion - b.erosion;
    if (a.erodeproof !== b.erodeproof) return b.erodeproof - a.erodeproof;
    if (a.uskn) {
        const v1 = a.known ? a.spe : -1000;
        const v2 = b.known ? b.spe : -1000;
        if (v1 !== v2) return v2 - v1;
    }
    return a.indx - b.indx;
}

const V = (c, s, d, n, bucx, grease, erosion, erodeproof, uskn, known, spe) => ({
    c, s, d, n, bucx, grease, erosion, erodeproof, uskn, known, spe,
});
function run(vecs) {
    const items = vecs.map((v, i) => ({ ...v, indx: i }));
    return glibc_qsort(items, cmp).map((o) => o.indx);
}

describe("sortloot glibc_qsort order", () => {
    it("reproduces C's pickup menu for the BoT-vs-BoH pile (scen-sweep-Barbarian-610017 step 642)", () => {
        // Chain order: BoT u (uskn, unknown charges), BoH v, gem, BoH l, oilskin n.
        const got = run([
            V(10, 1, 2, 0, 0, 0, 0, 0, 1, 0, 6),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
            V(20, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
        ]);
        assert.deepEqual(got, [1, 3, 4, 0, 2]);
    });
    it("flips an inconsistent pair like qsort (V8 insertion keeps chain order)", () => {
        const got = run([
            V(10, 1, 2, 0, 0, 0, 0, 0, 1, 0, 6),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
        ]);
        assert.deepEqual(got, [1, 0]);
    });
    it("keeps merge-direction order on mixed known/unknown spe triples", () => {
        const got = run([
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 3),
            V(10, 1, 2, 0, 0, 0, 0, 0, 1, 1, 5),
            V(10, 1, 2, 0, 0, 0, 0, 0, 1, 0, 6),
        ]);
        assert.deepEqual(got, [0, 1, 2]);
    });
    it("orders BUCX before the asymmetric spe key", () => {
        const got = run([
            V(10, 1, 2, 0, 2, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 1, 0, 6),
            V(10, 1, 2, 0, 1, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
        ]);
        assert.deepEqual(got, [0, 2, 3, 1]);
    });
    it("is stable on consistent inputs (all-tie keeps chain order)", () => {
        const got = run([
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
            V(10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 0),
        ]);
        assert.deepEqual(got, [0, 1, 2]);
    });
    it("handles n=0 and n=1", () => {
        assert.deepEqual(run([]), []);
        assert.deepEqual(run([V(10, 1, 2, 0, 0, 0, 0, 0, 1, 0, 6)]), [0]);
    });
});
