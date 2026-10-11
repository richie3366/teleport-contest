# Review 2701 — 6db3e5984 — Blindfolded ≡ EBlinded, drop || ublindf

Metadata: SHA `6db3e5984`, D-3838, cliffs-head `pray.c` dopray
writer (dopray body C-whole per D-3600 + brief). JS:
`js/pray.js` (+3/−1: delete + cite). Test:
`scripts/pray-lenses-blindfolded.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: sweep-Wizard-578213@468: JS appended an extra
--More-- («lenses softly glows amber», never printed by C)
because pray.js's `Blindfolded()` OR-ed `u.ublindf`, ranking
cursed lenses a major trouble; C's macro is EBlinded only and
lenses confer no [BLINDED] extrinsic. Delete the disjunct;
session moves 468→482. Diff actually does: exactly the
2-line delete + cite. Match.

## Inventory

- `Blindfolded` (js/pray.js:339–343) — changed: now `return
  !!(game.u?.EBlinded)`. C: `youprop.h:96 #define Blindfolded
  EBlinded` (read) — verbatim. Consumer: in_trouble
  (js/pray.js:599) `if (Blindfolded() && u.ublindf &&
  u.ublindf.cursed)`, matching C `in_trouble` (csym)
  `if (Blindfolded && ublindf->cursed)` (the JS null-guard is
  harmless — C relies on Blindfolded implying worn).
- EBlinded sync (the delete's precondition): verified live —
  `confer_oc_oprop` (js/do_wear.js:409–422, read) mirrors
  oc_oprop extrinsic into `uprops[p]` + the `u.EBlinded` flat
  for p === BLINDED; blindfold/towel set it, lenses don't
  (oc_oprop-gated). No new helpers, no re-points — nothing for
  `sym.mjs`.

## C ↔ JS fidelity

The macro is now verbatim C. With cursed lenses worn,
EBlinded is 0 on both sides → the trouble is skipped on both
sides; with a cursed blindfold/towel, the extrinsic is set on
both sides → major trouble on both sides. No RNG. Gap: none.

## Hallucinations / overclaim

None. The mechanism is measured (prefix replay: More swallows
9 keys through faithful xwaitforspace before the phantom
message; pre-fix probe replays showed --More--, post-fix the
pinned C screen), and the sibling youprop locals are
explicitly left untouched as not implicated.

## Density

Cliff-phase: head writer correct (the in_trouble predicate,
not a re-port of dopray). One predicate, whole. Ledger:
`in_trouble ported` + D-3838. Verify bullet: 1 moved +
REACH-OK ×2 + green + strict + cohort + full 44/44. Not
unreached: probe moves 468→482 (and the next SHA takes it to
PASS).

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify
dopray,in_trouble --base 6db3e5984~1` → dopray: 1 blocked at
parent → `1 PASS, 0 moved past, 0 unchanged, 0 worse`
(Wizard-578213 now FULL PASS on current code — this SHA moved
it 468→482 per its D-log, the later D-3839 finished it;
movement confirmed and exceeded); smoke 24/24 + 24/24
REACH-OK. Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
