# Review 2696 — 520d66ff9 — drinkfountain KILLED_BY_AN import

Metadata: SHA `520d66ff9`, D-3833, cliffs-head `o_init.c`
randomize_gem_colors writer (owner already-whole, D-3832 read
once per the tag). JS: `js/fountain.js` (+1/−1: one import
name). Test: `scripts/drinkfountain-poisonres-killer.test.mjs`
(new, 2 `it`s).

## Intent vs deliverable

Promise: 2 step-0 throw-voids (578205, 578136) with
`ReferenceError: KILLED_BY_AN is not defined at drinkfountain
(js/fountain.js:827)` — the void paradox misattributes them to
the first C draw; add the missing const.js import, no body
change; both voids move (0→536, 0→274). Diff actually does:
exactly the one import name. Match.

## Inventory

- `drinkfountain` case 21 (js/fountain.js:815–838) — unchanged
  body; the fix is the `KILLED_BY_AN` name joining the
  existing const.js import (fountain.js:75). C:
  `nethack-c/upstream/src/fountain.c` case 21 `/* Poisonous */`
  (csym body): `if (Poison_resistance)` → fruitname pline +
  `losehp(rnd(4), "unrefrigerated sip of juice",
  KILLED_BY_AN)`; else `poison_strdmg(rn1(4,3), rnd(10),
  "contaminated water", KILLED_BY)` + `exercise(A_CON,
  FALSE)`. JS mirrors it arm-for-arm (poisRes union,
  fruitname(FALSE), rnd(4), rn1/rnd order). C value:
  `hack.h:602 #define KILLED_BY_AN 0`; JS: `js/const.js:531
  export const KILLED_BY_AN = 0`. Match.
- No new helpers, no re-points — import-only. `sym.mjs` not
  required; the single C caller (potion.c:546 → js/potion.js:2458)
  stays pre-wired.

## C ↔ JS fidelity

The arm was already C-exact; the defect was purely the missing
import, which threw on first execution of the poisRes branch.
Value, call order, and the sibling KILLED_BY arm are verified
against C above. The D-log's standing note (case-29 scare's
release_hero/vrock-cloud gap is a different arm) is true of
the code. No RNG touched. Gap in `js/`: none.

## Hallucinations / overclaim

One, in the ledger rather than the code: the D-log says the
case-29 omit stands "untouched", but this SHA's
`docs/ledger/fountain.c.jsonl` hunk **dropped the row's `omit`
field** (`case-29 scare inlines monflee … but omits
release_hero(ustuck) and the vrock spore cloud`) while keeping
`status: partial`. The live row is now an omit-less partial —
the named omission no longer lives in the ledger where the
playbook requires it. See Actionable.

## Density

Cliff-phase: head writer correct (throw-void writer named by
the recorded stack, not a re-port). Import-only, whole on its
path. Ledger: `drinkfountain partial` + D-3833 — minus the
omit above. Verify bullet: 2 moved + REACH-OK ×2 + green +
strict + cohort + forced full 44/44 (same code state). Not
unreached: both probes move hundreds of steps.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default ≤80 spread + all blocked — the
--reach-all pass on 2695 plus this audit's final full rescore
cover the rest): `verify drinkfountain,randomize_gem_colors
--base 520d66ff9~1` → drinkfountain: 0 blocked (writer,
expected), reach 52/52 REACH-OK; randomize_gem_colors: 3
blocked at parent → `0 PASS, 3 moved past, 0 unchanged,
0 worse` (578205 → losehp@536, 578136 → adj_pit_checks@274 —
this SHA's probes, exact steps as claimed; 578306 →
level_tele@859 via the later D-3835, consistent); reach
80/80 REACH-OK. Zero regressed.

## Actionable C-wrongs

1. (Debt, not a Must-fix — ledger text is repaired inside a
   real iteration, never a row.) Restore the dropped omit on
   the drinkfountain ledger row: `node scripts/ledger.mjs set
   drinkfountain partial --omit "case-29 scare inlines
   monflee(mtmp,0,FALSE,FALSE) but omits release_hero(ustuck)
   and the vrock spore cloud (create_gas_cloud)"`, keeping the
   D-3833 stamp.

Verdict: **ACCEPT-WITH-DEBT**
