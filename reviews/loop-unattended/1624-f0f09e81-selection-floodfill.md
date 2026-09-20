# Review 1624 — f0f09e81 — selvar.c selection_floodfill whole-body restart (D-2665)

**Metadata:** SHA `f0f09e81`, `selvar.c`
`selection_floodfill` + predicate family, D-2665. JS:
`js/mklev.js` (+~110/−~70) + new
`scripts/selection-floodfill.test.mjs` (103 L, 5 tests).
Replaces two divergent clones with the C generic.

## Intent vs deliverable

Subject promises: JS carried two specializations (5-arg
`selection_floodfill` with invented seed-gate +
`queued`-Set; `selection_floodfill_accessible` with
`seen`-Set) where C has one generic + installable
global predicate; restart ports the generic, the
installer, `sel_flood_havepoint`, `selection_free`, and
both `sp_lev.c` predicates, rewiring all 11 call sites.
Diff delivers all of it. Promise matches deliverable.

## Inventory

- `selection_floodfill(ov, x, y, diagonals)`
  (mklev.js:26515, sync, exported) — C-order restart;
  old 5-arg clone + `selection_floodfill_accessible`
  both deleted (0 references remain; all 11 call sites
  use the 4-arg form — verified by grep here).
- `selection_flood_check_func` + exported
  `set_selection_floodfillchk` (:26477/:26480),
  `sel_flood_havepoint` (:26487, local),
  `selection_free` (:26498, exported, no clash per
  `sym.mjs`), `floodfillchk_match_under` + typ var +
  exported `set_floodfillchk_match_under`
  (:26206–26222). No new cross-module import.

## C ↔ JS fidelity

C loci read in full: `selvar.c:394–452` (body above),
`set_selection_floodfillchk :371–375`,
`sel_flood_havepoint :377–392`,
`floodfillchk_match_under :4586–4590`,
`set_floodfillchk_match_under :4592–4597`. No RNG
either side. Confirm:

- SEL_FLOOD / SEL_FLOOD_CHKDIR macros → closures with
  the C `&&` order (isok → predicate → `!getpoint`
  → `!havepoint`) ✓; null-predicate early return with
  `selection_free(tmp, TRUE) :424–426` ✓; unconditional
  seed push `:428` (the old invented seed-gate is gone)
  ✓; pop/set-both `:430–435`; 4-dir + diagonal arms
  `:437–445`; `idx > 0` loop `:447`; tail free `:451`
  ✓. Overrun → throw ≡ C panic (house idiom) ✓.
- Caller closure: C sp_lev.c:5158 → mklev.js:26241
  (global inherited — C calls `generate_way_out_method`
  only from `ensure_way_out` :5246, verified here, so
  the once-installed `:5225` predicate is C-faithful);
  C :5229/5236/5247 → :26321/:26330/:26342 with the
  installer at the `ensure_way_out` head ✓; C
  nhlsel.c:750–751 → 7 Lua-loader sites (typ install +
  4-arg call) ✓; C cmd.c:1283 / getpos.c:387 stay on
  their pre-existing rep-specific clones — named in the
  D-log with rationale (own reps, cycle risk), not
  silent stubs.
- Debt note: `selection_free(sel, FALSE)` memset arm
  folds into the same reset — named, no consumer
  distinguishes.

## Hallucinations / overclaim

None.

## Density

Breadth phase: one-function-family restart + test,
single module — right-sized (234-line diff is mostly
the deleted clones + cites).

## Verification

D-log Verify bullet claims PASS (syntax · rule2 ·
hidden note · REACH-OK smoke 24/24 · green · strict ·
cohort 7/7 · full 44/44 shared-file · new test 5/5).
Re-measured here: `hidden-proxy.mjs verify
selection_floodfill --base f0f09e81~1 --reach-all` → 0
blocked both sides (vacuous note, correctly labeled) +
smoke 24/24, 0 regressed → REACH-OK; `node --test
scripts/selection-floodfill.test.mjs` → pass 5, fail 0
(run here). Claim true. Diff grep: 0 hits for
FORCE/DIAG/getRngLog/fastforward/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
