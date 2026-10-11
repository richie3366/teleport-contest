# Review 2682 — 6e7e9bf7a — domonability chain arms, bare tail return

Metadata: SHA `6e7e9bf7a`, D-3818, cliff row-2 `cmd.c` domonability
(@08f125a34; owner itself). JS: `js/polyself.js` (tail deleted,
two chain arms, bare return). Test:
`scripts/domonability-reflexive-tail.test.mjs` (4 its).

## Intent vs deliverable

Promise: shriek/gremlin arms fell through to a shared reflexive
tail; C's Upolyd/normal arms are chain members and the chain ends
in bare `return ECMD_OK`. Claimed: 95329 1075→1164 (moved past).
Diff actually does: `tail()` deleted, two else-if arms added, `return
tail()` → `return ECMD_OK`; strings byte-identical. Match.

## Inventory

- `domonability` (js/polyself.js:2993) — changed: tail structure
  only. C `cmd.c:889–949` (csym range; full body verified below).
- No new helpers, no new imports, no deleted exports (the deleted
  `tail` was a function-local closure). No sym re-point to run.

## C ↔ JS fidelity

C `cmd.c:889–949` (verified by direct read) vs JS, arm by arm:
might_hide prompt + q/ESC→OK; breathe→dobreathe; SPIT→dospit;
NYMPH→doremove; GAZE→dogaze; were→dosummon; c/hide; c/web;
mind_flayer→domindblast; GREMLIN (fountain→split+dryup,
pool→split, else There-is-no-fountain — **no return**); unicorn→
horn + TIME; MS_SHRIEK (You-shriek + buried/aggravate — **no
return**); vampire→dopoly; steed→pet_ranged_attk + TIME; Upolyd→
reflexive pline (**no return**); else→You-don't (**no return**);
bare `return ECMD_OK`. JS matches all 16 arms in order with
identical returns; C `There(...)`/`You(...)` prefixes expand to
the exact JS strings ("There is no fountain here.", "You
shriek.", "You don't have..."). The old `return tail()` appended
the reflexive line after the gremlin/shriek fall-throughs — the
exact probe symptom ("You shriek. Any special ability...").
Gremlin dry-land control ("no fountain here" without a More
prompt) covers the same fall-through class. No RNG; none added.
Gap: none. Arm-by-arm + return-by-return confirm.

## Hallucinations / overclaim

None. "All 19 callees live" is a brief claim, not a dispatch
overclaim — every arm calls through, no stub in the chain.

## Density

Cliff-phase: owner itself, row-2. Ledger: domonability arm.
Verify bullet: moved-past + REACH-OK + green + strict + cohort.
Movement is board-recorded: committed scoreboards show 95329 at
domonability/1075 pre-commit → still_chewing/1164 post-commit
(checked both boards; C "You start chewing..." vs JS "" — the
D-3819 row). Named: none new. Not unreached: strictly later
step/owner.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify domonability --base 6e7e9bf7a~1
--reach-all` → `1 PASS ... → PROGRESS` (95329 PASS) and `smoke
24/24 → REACH-OK`. PASS rather than the D-log's 1164 because the
re-run executes on current HEAD, where D-3819 completed the
session — the D-log's 1075→1164 is confirmed by the committed
boards above, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
