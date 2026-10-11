# Review 2675 — c7b85e2f6 — enlightenment Antimagic worn-cloak arm removed

Metadata: SHA `c7b85e2f6`, D-3811, cliff row-2 `insight.c`
one_characteristic writer (@38c910247; row-1 void-barred, falsifier
live-checked). JS: `js/invent.js` (+5/−9, one arm). Test:
`scripts/enlightenment-antimagic-no-worn.test.mjs`.

## Intent vs deliverable

Promise: enlightenment()'s final-attributes Antimagic inline read
flats + uprops + a worn-cloak arm, printing "magic-protected" on
gamestate-clobbered (worn, E=0) disclosure state where C reads false;
now the in-file `hero_Antimagic(u)` mirror, no worn arm. Claimed: 2
PASS. Diff actually does: one predicate swap + dead
CLOAK_MR/onames/await-import lines removed. Match.

## Inventory

- `enlightenment` (js/invent.js:6754) — changed: Antimagic arm
  predicate only. C `insight.c:1523–1524` (cited; verified below) +
  `youprop.h:55–57` macro.
- `hero_Antimagic` (js/invent.js:5768) — pre-existing in-file mirror,
  same module, no import. No new helpers, no deletes of exports, no
  re-points across modules.

`sym.mjs hero_Antimagic` (required — diff re-points the inline to it):

```text
hero_Antimagic   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:5768
```

Single in-file definition; no second clone written.

## C ↔ JS fidelity

C `insight.c:1523–1524` (verified by direct read): `if (Antimagic)
you_are("magic-protected", from_what(ANTIMAGIC));`. C
`youprop.h:55–57` (verified): `HAntimagic`/`EAntimagic` are
`u.uprops[ANTIMAGIC].intrinsic/.extrinsic`, `Antimagic` their OR — C
never reads worn gear. `hero_Antimagic` returns flats OR uprops
H/E, no worn arm: C-exact (flats are the JS H/E mirrors, D-3790
shape; doattributes' final=0 path already used it). Old arm's
`u.uarmc.otyp === CLOAK_MR` had no C counterpart — pure invention,
correctly deleted. No RNG in the arm; none added. Branch order
unchanged (Antimagic early among resistances, before Fire). Callers:
arm sits in enlightenment()'s final=1 path only; C callers
(end.c:594/651 disclose, artifact/fountain/potion/zap) map to
end.js:861 (probe path, final) + four final=0 sites taking the
doattributes branch — behavior unchanged there. Gap: none.
Predicate-by-predicate confirm.

## Hallucinations / overclaim

None. Owner verified misattributed (one_characteristic prints the
matching topline; the differing menu line is enlightenment's), not
re-ported. Diagnosis measured both sides (build-time uarmc=148,
uprops/flats 0, wornArm true → extra line; JS menu otherwise contains
every C line verbatim). Sibling Antimagic clones read and honestly
left standing (under-read direction, no reaching probe).

## Density

Cliff-phase: writer correct, row-2 with row-1 falsifier live-checked
(`verify randomize_gem_colors: 0 PASS, 2 unchanged`, both still
step-0 voids on the D-3733 throw). Ledger: `enlightenment ported`.
Verify bullet: 2 PASS + REACH-OK + green + strict + cohort + manual
full 44/44. Named latents are honest non-probe directions. Not
unreached: both probes PASS.

## Verification

js-hunk grep: clean (DIAG/FORCE/seed hits are docs prose only; temp
DIAG reverted). Rule #2 clean (iteration-wide run). Re-measure
(mine): `verify one_characteristic --base c7b85e2f6~1 --reach-all` →
`2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(95208/95221 PASS) and `smoke 24/24 → REACH-OK` — exactly the D-log
claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
