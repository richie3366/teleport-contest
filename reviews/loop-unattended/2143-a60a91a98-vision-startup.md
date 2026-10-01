# Review 2143 — a60a91a98 — vision startup

SHA `a60a91a98`, D-3183; 2026-10-01; +29/-3 JS. No review closure.

## Intent vs deliverable

“Initialize vision before newgame or restore” adds vision_init/view_init,
imports the initializer into start, and corrects a row-alias comment.

## Inventory — vision_init

New sync export; same-file view_init LIVE. Typed planes/row objects
implement C aliases; no cloned function.

## C ↔ JS fidelity — vision_init

csym vision.c:120–142 assigns three row-pointer families, selects plane
zero/bounds, clears recalc and both planes, then view_init. JS already
owns persistent row objects, selects the same bounds and clears every
row before the call. No RNG; does not spuriously clear viz_clear/bounds.
Sole executable C caller unixmain.c:215 is wired in start before sound
window initialization and restore/newgame.

## Inventory — view_init

New sync export, empty body; verified C no-op, not a stub.

## C ↔ JS fidelity — view_init

vision.c:1650–1653 is empty in Algorithm C. :141 is the sole executable
caller; :92 is a declaration. JS call matches exactly.

## Inventory — start

Existing async startup adapter gains canonical initializer import/call.

## C ↔ JS fidelity — start

unixmain.c:200–227 places initialization after name/lock preparation,
before init_sound_disp_gamewindows and attempt_restore. JS ordering
matches this changed boundary; no trace/RNG predicate introduced.

## Hallucinations / overclaim

The empty initializer is pinned C, so no “dispatch ported, callee stubbed”
claim. No deleted/re-pointed symbols requiring sym output. Historical
full Rule #2 clean; diff scan has no FORCE/DIAG/seed/getRngLog/fastforward
or hardcoded session coordinates. No cycle-forced clone claim.

## Density

Ledger: vision_init ported — ACCEPT. Ledger: view_init ported — ACCEPT.
start caller wiring — ACCEPT. Two whole same-file bodies; small-cluster
exception documents no further eligible Open bodies. Per-function
Ledger/Verify present.

## Verification

Historical `verify vision_init,view_init --base a60a91a98~1 --reach-all`:
vision_init: 0 blocked, vacuous; smoke 24 PASS/0 regressed, REACH-OK.
view_init: 0 blocked, vacuous; smoke 24 PASS/0 regressed, REACH-OK.
D-log green/strict, relevant shared-startup cohort 7/7, full 44/44 pass.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
