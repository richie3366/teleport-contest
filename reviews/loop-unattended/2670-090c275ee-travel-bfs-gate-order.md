# Review 2670 — 090c275ee — auto_describe writer: travel BFS gate order

Metadata: SHA `090c275ee`, D-3806, cliff row-2 `getpos.c` auto_describe
writer (@4fb06f715; row-1 void-barred, falsifier live-checked). JS:
`js/cmd.js` (+17/−14, findtravelpath_bfs only). Test:
`scripts/travel-valid-unseen-suffix.test.mjs`.

## Intent vs deliverable

Promise: travel BFS tested the destination before the visibility gate,
so invisible+unremembered destinations falsely validated and the "(no
travel path)" suffix dropped; move the gate above the dest test in C
order. Claimed: 2 PASS, 95340 178→180. Diff actually does: gate block
relocated verbatim above the dest test, enqueue comment added, one
cite fix (`:1400`→`:1395`). Match.

## Inventory

- `findtravelpath_bfs` (js/cmd.js:4580) — changed: statement reorder
  only, no logic added/removed. C `hack.c:1265–1523` (csym range), BFS
  core :1395–1420.
- No new helpers, no import change (couldsee already imported), no
  deletes, no re-points.

## C ↔ JS fidelity

C (hack.c:1395–1398): one combined `if (test_move(x, y, nx-x, ny-y,
TEST_TRAV) && (levl[nx][ny].seenv || (!Blind && couldsee(nx, ny))))`;
dest test :1398–1418 inside it; else-if enqueue :1420. JS now walks the
identical order: `travel_test_move` → `seenv || (!Blind && couldsee)`
→ dest-return → enqueue. The couldseeOnly D-0702 variant is relocated
verbatim (same predicate, same `u.Blind` reads; `u` bound at function
top :4581, in scope at the new site). The `!loc → continue` null guard
moved up with the gate — strictly safer on real levels (loc always
exists), no C-visible change. No RNG in the BFS core; reorder changes
no draw order (couldsee/test_move are pure predicates here). Callers
(TRAVP_VALID :4887, TRAVP_TRAVEL/GUESS :4507/4953, GUESS phase-2 :4850)
inherit unchanged; GUESS phase-1 keeps its own C-order loop, untouched.
Gap: none. Order-by-order confirm against :1395–1420.

## Hallucinations / overclaim

None. Mechanism measured live (temp DIAG, reverted — added-lines grep
clean): 95340 cell (77,17) seenv=0 blind=1, C gate false vs JS valid
true. The 95340 "js-throw" label at step 180 is disclosed as the
`owner || 'js-throw'` fallback (error null), with a JS-vs-JS 1045-step
full-screen diff proving exactly 1 topline changed — the step-180
owner-null diff is pre-existing next cliff, not a regression.

## Density

Cliff-phase: writer correct — auto_describe verified whole (D-2966
suffix arms), divergence was is_valid_travelpt's TRUE where C reads
FALSE. Whole-function: reorder completes the BFS vs C :1395–1420; no
new omission. Ledger: `findtravelpath split ...` entry covers the
family. Verify bullet: movement + REACH-OK + green + strict + cohort +
voluntary full 44/44 (travel-core change — appropriate caution). Not
unreached: 3 sessions, all moved.

## Verification

Added-lines grep: clean (DIAG word appears only in the commit message
describing the reverted probe). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify auto_describe --base 090c275ee~1
--reach-all` → `2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(95402/95312 PASS; 95340 178→180) and `smoke 24/24 → REACH-OK` —
exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
