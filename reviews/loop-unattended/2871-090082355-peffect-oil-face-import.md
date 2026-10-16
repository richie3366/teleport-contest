# Review 2871 — 090082355 — lit-oil quaff imports FACE (Must-fix throw)

## Metadata

- SHA: `090082355930cda78a40c937666f4018ad77afc1` (D-4030)
- Must-fix: `ReferenceError: FACE is not defined` voiding
  scen-sweep-Wizard-51150073 seg0 (grow-filed @51150000,
  board-misattributed to `randomize_gem_colors` s0)
- js/ diff: `js/potion.js` 1 line (import name);
  `scripts/peffect-oil-lit-face.test.mjs` (new)
- Method: full per-function (Must-fix, 1 name)

## Intent vs deliverable

Promise: every lit-oil quaff by a non-fire-liker threw at
`peffect_oil` — `body_part(FACE)` read a bare identifier
with no binding. Add `FACE` to the existing `./const.js`
import. No edge, signature, or body change. 51150073
step 0 → 1178.

Diff actually: the one import name. Promise == diff.

## Inventory

- `peffect_oil` (`js/potion.js:386`; C `potion.c:1260-1294`
  per ledger): body untouched; `:403` now resolves `FACE`
  via `js/const.js:583` (`export const FACE = 2`).

## C ↔ JS fidelity

- C `hack.h:129-133` (`bodypart_types`, read): `FACE = 2`
  — the const.js value is C-exact. C `potion.c:1272`
  (read): `You("burn your %s.", body_part(FACE));` —
  matches the JS use site shape.
- No helper, branch, or RNG involved: pure name binding.
  No symbol deleted or re-pointed (the required `sym.mjs`
  paste is N/A); `FACE` joins the sibling body-part names
  already imported on the same lines.
- Grep of the `js/` hunk: a one-word import delta, nothing
  to grep. Rule #2 clean (HEAD).

## Hallucinations / overclaim

None. "Body untouched (whole per D-2860)" is accurate —
the diff touches only the import block. The vacuous
`verify peffect_oil` is disclosed as a note, with movement
claimed on the misattributed owner instead.

## Density

Model Must-fix discipline: the row existed at the parent
(quoted verbatim: throw + repro + deliverable), popped
next, shipped alone in a 1-line `js/` diff with its own
regression test. `Ledger:` peffect_oil re-stamped
(D-4030). The DONE-archive move rode in the same commit.

## Verification

Re-measured `--base 090082355~1 --no-reach` in one call:
`verify randomize_gem_colors: 0 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (51150073: 0 →
one_characteristic at step 1178) — exact match to the
D-log. `verify peffect_oil` vacuous (0 blocked), as
disclosed. Focused test 1/1 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
