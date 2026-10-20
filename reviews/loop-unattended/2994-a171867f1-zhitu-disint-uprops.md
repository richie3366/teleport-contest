# Review 2994 — a171867f1 — zap.js Disint_resistance reads uprops

- SHA: `a171867f1` (cliff; board head zhitu, scen-worldtour-Valkyrie-587104
  s634)
- D-entry: D-4154; Ledger: zhitu ported
- `js/` diff: js/zap.js +9 −2

## Intent vs deliverable

Promise: youprop.h defines Disint_resistance as
`u.uprops[DISINT_RES].intrinsic || .extrinsic`, and worn black dragon
scales or mail set only the extrinsic bit. zap.js's local clone read only
the flat `u.*Disint_resistance` fields. So zhitu's ZT_DEATH breath arm
took the armor-destruction path where C prints «You are not
disintegrated.». Diff: the clone ORs in the uprops bits and keeps the
flats. The promise matches the diff.

## Inventory

- `Disint_resistance` (zap.js:626, static) — the clone C does not have;
  it stands in for the youprop.h macro.
- Used by zhitu's ZT_DEATH breath arm; C zap.c zhitu, the arm at
  :4464–4490 per the D-log (the `if (Disint_resistance)` test follows
  inventory_resistance_check).

`sym.mjs Disint_resistance`: NOT EXPORTED, **3 local clones**
(explode.js:188, pray.js:1085, zap.js:626). There is also
`hero_Disint_resistance` at invent.js:5924, which is not exported either.
Clone drift is pre-existing. No clone is deleted or re-pointed here.

## C ↔ JS fidelity

C arm: `disn_prot = inventory_resistance_check(AD_DISN)`. If
Disint_resistance: «You are not disintegrated.», monstseesu, break.
Otherwise, if `uarms` the shield goes, else `uarm` the armor goes (and
`uarmc` / `uarmu` follow), and only then the death or the disn_prot
outcome. The arm order is unchanged in JS; only the predicate changed.
The patched clone now gives the C macro's truth table: uprops
intrinsic || extrinsic. The flats are a JS-side alias that eat.js:1669
writes for `HDisint_resistance` (intrinsic from a corpse), so keeping
them is a superset that matches C on every write path in js/. The RNG
draw (`rn2(100)` in inventory_resistance_check) comes before the
predicate and is unchanged.

The CLONE is verified against C here. A better fix would have been an
import, but no exported Disint_resistance exists, so the clone stands.

## Hallucinations / overclaim

None. The Named line is true: pray.js:1085 is flat-only, and
god_zaps_you's wide-angle disintegration test at pray.js:1211 (pray.c
god_zaps_you) reads it. A hero whose resistance comes from black dragon
armor would be fried in JS and bask in C. The D-log names no session,
and the corpus has no angry-god zap with DSM, so this audit records it
as ledger debt (`god_zaps_you partial`, omit naming the clone), not as
a Must-fix (§10.19).

## Density

A one-predicate fix on the head's writer.

## Verification

```text
verify zhitu --base a171867f1~1 --no-reach
  scen-worldtour-Valkyrie-587104: PASS → 1 PASS → PROGRESS
```

This reproduces the claim (804/804, RNG 74188/74188).

## Actionable C-wrongs

None queued. Ledger: god_zaps_you → partial (pray.js:1085 flat-only
clone).

Verdict: **ACCEPT**
