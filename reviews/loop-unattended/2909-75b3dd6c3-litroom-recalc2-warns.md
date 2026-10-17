# Review 2909 — 75b3dd6c3 — litroom runs recalc(2)'s warn burns via D-0852 helper

- SHA: `75b3dd6c3` (cliff writer: recalc(2) warn burns,
  doread rank-23 Shape-A remainder)
- D-entry: D-4070; Ledger: read.c (`litroom ported`)
- `js/` diff: `js/read.js` +12/−1 (one helper call +
  comment + import extension); new
  `scripts/litroom-recalc2-warns.test.mjs`

## Intent vs deliverable

Promise: litroom's `!Blind` arm now calls
`vision_off_newsym_gbuf({ useLiveViz: true })` before
`vision_recalc(2)` so the two hallu-warning display
burns fire in display-RNG order; 587219@363 heals,
hallu-Wizard 565→845, Valkyrie PASS. The diff is
exactly that call plus the comment and the import
name. Promise = diff.

## Inventory

- `litroom` (read.js:534–548): one added call inside
  the existing `if (!Blind)` arm, before
  `vision_recalc(2)`. C: read.c litroom :2490–2635,
  arm at :2611–2616.
- Import: `vision_off_newsym_gbuf` appended to the
  existing `./vision.js` line (read.js:139) — name
  only, ALREADY edge, zero new module edge.

No deleted symbols, no re-pointed clones — step-3
paste not triggered. Callee is a LIVE export,
long-standing (D-0852/D-3863/D-3658 precedent).

## C ↔ JS fidelity

Confirmed against pinned C:

- C read.c:2611–2612 `if (!Blind) {
  vision_recalc(2); ... }` then :2619 delayed
  `vision_full_recalc = 1`. JS keeps the arm in
  C order (helper, recalc, move_bc, full_recalc=1).
- C vision_recalc control==2 (vision.c:544–547):
  next array left empty, then the main update loop
  (:728–824) still runs: every cell falls to the
  `not_in_sight` arm (:807–822), newsym'ing old
  IN_SIGHT cells. Those newsyms paint warned mons →
  display_warning :640 `Hallucination ?
  rn2_on_display_rng(WARNCOUNT-1)+1` — the 2 burns
  the D-log measured (1,2@5), shifting the 4 frame
  substitutions. Mechanism complete.
- JS vision_recalc skips the loop for control 2
  (vision.js:1230 `control !== 2`, D-0852) — the
  stated gap is real. The helper (vision.js:1371–
  1410) ports exactly that loop for empty next:
  predicate `old IN_SIGHT || old COULD_SEE`
  (:1403–1404) ≡ C's `old IN_SIGHT || (next
  COULD_SEE ^ old COULD_SEE)` with next empty,
  row-major over old rmin/rmax, plus the hero
  newsym — same set, same order.
- Nit (not a C-wrong): the D-log C locus cites
  `:2605–2609`; the arm is actually at :2611–2616
  (`vision_recalc(2)` at :2612, delayed recalc at
  :2619). Cite drift only — code and behavior
  exact.

## Hallucinations / overclaim

None. The `js-throw` label on 587219's new step 522
is disclosed in-commit as a verify display artifact
for owner-null moves; my `show` re-run confirms
`error: null`, kind screen, topline diff «A moat.»
vs «A deep water.». The Tourist@614 no-movement is
a parked recorder-artifact with falsifier, not
NO-MOVEMENT-as-omission. litroom vacuity (0
blocked) stated as writer-note.

## Density

Cliff writer, committed rank 23, first actionable
in committed order (ranks 1–21 park-holds re-
verified live this iteration; rank-22 Knight stale
PASS recorded with precedent). Owner doread
(region heuristic) → writer litroom via C-vs-JS
display-draw windows measured on both recorders.
One `Ledger:` entry. All four callers named with
JS lines. No unreached work.

## Verification

Re-measure (`--base 75b3dd6c3~1 --no-reach`):

```text
verify doread: 1 PASS, 2 moved past, 1 unchanged, 0 worse → PROGRESS
  scen-hallu-Valkyrie-51255008: PASS
  scen-sweep-Wizard-587219: moved → step 522 (was 363)
  scen-hallu-Wizard-51450068: moved → auto_describe@845 (was 565)
  scen-sweep-Tourist-50450057: still doread at 614 (parked artifact)
verify litroom: no corpus session is blocked (vacuous, disclosed)
```

Exact match to the D-log. No FORCE/DIAG/seed/coords
in the `js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
