# Review 2888 — 436b1b1d0 — Align2amask multi-eval NONCO arm (D-4047)

- SHA: `436b1b1d0` (cliff, 1 C function: `sp_amask_to_amask` NONCO arm)
- D-entry: D-4047; Ledger: sp_lev.c (sp_amask_to_amask now whole)
- `js/` diff: `js/mklev.js` +9/−4 (macro expansion in C order); no
  test file, no new imports

## Intent vs deliverable

Promise: 4 Barbarian sessions loading Bar-goal diverge at C
`rn2(2)@noncoalignment` vs JS `rnd(2)@next_ident` because
sp_lev.c:1915 passes the drawing call `noncoalignment(...)` into
the multi-eval `Align2amask` macro (up to 3 draws, short-circuit)
while JS evaluated once. Diff expands the arm to the macro's
3-test form with fresh calls. No helpers, clones, or imports.
Promise = diff.

## Inventory

- `sp_amask_to_amask` NONCO arm (js/mklev.js:22213–22222): changed.
  C: `align.h:50–53` Align2amask, `sp_lev.c:1907–1922`
  sp_amask_to_amask + `:1851–1860` noncoalignment (ranges per
  `csym.mjs`), `do.c:434–438` hoist — all verified in pinned source.

## C ↔ JS fidelity

Macro verified (`align.h:50–53`): `((x)==A_NONE) ? AM_NONE :
((x)==A_LAWFUL) ? AM_LAWFUL : ((x)+2)` — x evaluated up to 3
times, short-circuit. Call site verified (`sp_lev.c:1915`):
`Align2amask(noncoalignment(u.ualignbase[A_ORIGINAL]))`.
`noncoalignment` verified (`:1851–1860`): `k = rn2(2)` then the
two-return shape — JS (`mklev.js:22197`) is line-identical.
JS expansion matches the macro test-for-test in C order
(A_NONE → AM_NONE, A_LAWFUL → AM_LAWFUL, else `(r3+2)&0xff`
for C unsigned) with a fresh drawing call per test; constants
match C exactly (A_NONE −128, A_LAWFUL 1, AM_NONE 0, AM_LAWFUL 4,
verified both sides). The single-eval `Align2amask` wrapper
(const.js:301) is untouched and still correct for pure args.

Corroboration beyond the cite: C itself documents the hazard —
do.c:434–438 comment "used to pass … but that evaluates its
argument more than once" with a hoisted `algn` (verified). The
19-site audit re-checked first-hand: all 7 other Align2amask
sites pass pure lvalues (`al`, `algn`, `u.ualign.type`,
`u.ualignbase[…]`), all 9 visible Amask2align sites pass pure
masks — :1915 is the sole drawing-expression argument. Temp-C
measurement (2 executions before the ALT print) is reverted and
unverifiable post-hoc, but `rg MEASURE` is empty in both trees
and `git status nethack-c/` clean (verified) — and the draw-count
fix is independently corroborated by 3 PASS + 1 moved below. No
symbol deleted or re-pointed.

## Hallucinations / overclaim

None. The multi-eval claim rests on the macro text plus C's own
do.c comment, not on the reverted probe alone.

## Density

Cliff-phase: row-11 writer, function now whole (all 4 arms
faithful, none named). 3 PASS + 1 moved (+462 steps to s546);
new owner named as future row. Dense one-spot fix, not a no-op.
`Ledger` updated.

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify noncoalignment --base 436b1b1d0~1
  --no-reach` → `3 PASS, 1 moved past, 0 unchanged, 0 worse`
  (50850014/49955009/49955028 PASS, 51050016 84→546
  `vamprises`) — exact match. Non-vacuous (4 blocked).
- D-log Verify bullet: full `verify.mjs --fn` (syntax 1 file,
  rule2, hidden line, REACH smoke 24/24, green + strict ×2,
  cohort 7/7, auto full 44/44 on shared-file change) — shipped;
  final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
