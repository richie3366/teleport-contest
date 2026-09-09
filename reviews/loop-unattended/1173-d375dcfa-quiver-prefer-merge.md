# Review 1173 — d375dcfa — quiver-prefer pickup merge (D-2207)

Metadata: SHA `d375dcfa`, `js/mkobj.js` (+9/−1) + `js/u_init.js`
(+28/−8), D-2207. Queue row `prinv` (scen-normal-Caveman-92059
step 67/74, 0 blocked RNG: C «c - an uncursed flint stone (in quiver
pouch) (19 in total).» vs JS «f - an uncursed flint stone.» — a `,`
pickup lifting 1 floor flint onto the quivered 18-stack).

Intent vs deliverable: subject promises the addinv_core0
quiver-prefer arm plus narrowing the `mergable` worn gate to the
combine stack. Diff actually does both: absorb body extracted to an
`absorbInto(otmp)` closure (no behavior change) + `u.uquiver`-first
merge with early return, and `mergable` now rejects only obj-worn.
Promise == diff.

Inventory: one refactored function (`addinv`), one narrowed
predicate (`mergable`). No new imports (`mergable` already imported
in u_init), no clones, no stubs.

**C ↔ JS fidelity**: confirm on both loci. (1) Quiver-prefer vs
`invent.c:1098–1106` (body read):

```c
/* merge with quiver in preference to any other inventory slot ... */
if (uquiver && merged(&uquiver, &obj)) {
    obj = uquiver;
    ...
    goto added;
}
/* merge if possible; find end of chain in the process */
for (prev = 0, otmp = gi.invent; otmp; prev = otmp, otmp = otmp->nobj)
    if (merged(&otmp, &obj)) { ... }
```

JS tries `mergable(uq, obj)` → `absorbInto(uq)` with early return
before the invent loop — same order, same `goto added` bypass of
the loop (the `added:` tail, addinv_core2/carry, lives inside
`absorbInto` per the diff context). `merged()` re-checks mergable
internally in C; JS checks `mergable` synchronously with no
interleaving await between check and absorb, so no TOCTOU. (2) Worn
gate vs C `mergable :4378–4499` (range from `csym.mjs`; full 122-line
body contains zero `owornmask` reads — the absent check is measured,
not assumed). The kept obj-worn rejection is justified, not
C-divergent: C `merged() :877–913` slot fixup fires only
`if (obj->owornmask)` (live carried arm `:878`, `#if 0` mon arm
`:907`), so unworn-obj → worn-otmp needs no fixup on either side —
verified against the C text, not asserted. Spillover checked: six
other JS `mergable` callers (files.js:58, invent.js ×3, mkobj.js:2065,
pickup.js:1057, zap.js:4675) all move toward C parity, since the
obj-worn rejection is unchanged everywhere and C likewise permits
worn-otmp absorbs. Residual obj-worn combine merge is named in the
map (merged setworn/setnotworn fixup unported), not silently dropped.
No RNG in either change, matching C (quiver-prefer draws nothing).

Hallucinations / overclaim: none. No RNG-index or seed reads; the
fix is a branch-order + predicate port. No FORCE/DIAG.

Density: two files that already call each other, one C envelope
(addinv_core0 + mergable/merged) — a right-sized §2b cluster.

Verification: D-log Verify bullet shows hidden 1 PASS + green +
cohort + manual full 44/44 (addinv runs in every session).
Re-measured myself:

```text
verify prinv: baseline d375dcfa~1 — 1 session(s) blocked
  scen-normal-Caveman-92059: PASS
1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine PASS on the blocked session, not vacuous.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
