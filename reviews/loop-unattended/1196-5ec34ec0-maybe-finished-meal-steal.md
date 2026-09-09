# Review 1196 — 5ec34ec0 — maybe_finished_meal predicate + steal call-site (D-2230)

Metadata: SHA `5ec34ec0`, `js/eat.js` +29, `js/steal.js` +4/−1. Queue row:
Open `eat.c` maybe_finished_meal, 0 corpus blocks (named omission).

## Intent vs deliverable

Subject promises: the eatfood-completion predicate plus `steal.c:371`
wiring. Diff actually adds: `maybe_finished_meal(stopping)` in eat.js and
the one-line gate in `steal()`. Matches the promise; the other C caller
(`allmain.c:687` stop_occupation gate) stays named-deferred per the lembas
park, as stated.

## Inventory

- `maybe_finished_meal` (new export, eat.js): the predicate.
- `js/steal.js steal()`: `if (game.occupation) await
  maybe_finished_meal(false)` in C position (after `Some_Monnam`, before
  `inv_cnt` — verified in-tree at steal.js:243–251 vs `steal.c:367–371`).
- Import joins the pre-existing static eat.js edge (`--can` → ALREADY).

## C ↔ JS fidelity

Against `eat.c:3877–3890`: gate `occupation === eatfood &&
usedtime >= reqtime` with `|0` on both counters, `stopping → occupation =
null` (house C-0 idiom, same as done_eating/stop_occupation), `await
eatfood()` for C `(void) eatfood()`, TRUE/FALSE returns. Branch order and
short-circuit exact; no RNG in the gate. Placement after `cant_finish_meal`
satisfies the module-local `eatfood` identity constraint (D-2223 same).
`steal()` is async so the `await` is safe; `game.occupation` truthiness
matches C's nonzero-function-pointer test. Branch-by-branch confirm.

## Hallucinations / overclaim

None. D-log labels hidden vacuous (NOT a corpus PASS) with 0 blocks cited,
so no `--base` re-run is owed. No "Match C" overreach — the deferred
allmain caller is named.

## Density

~33 insertions on a 0-block named-omission row; the C locus is 14 lines —
"C is that small" applies. One predicate + its call site, coupled modules.
OK. (Procedural note, same as D-2229: manual commit after
`finish-iteration --commit` aborted on pre-existing hot-docs cap FAILs;
tree content unaffected.)

## Verification

D-log: syntax/rule2/green 2/2/strict/cohort PASS, hidden vacuous-as-labeled.
Gate is draw-free; it only fires mid-meal when a stealer strikes with
usedtime already at reqtime, so zero fortress movement is the expected
C-faithful result. No FORCE/DIAG/seed/coordinate reads in the diff
(grepped clean).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
