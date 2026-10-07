# Review 2465 — c7223445e — travel no-path falls through, turn runs (D-3583)

**Metadata.** SHA `c7223445e` (2026-10-07, D-3583). Type: **cliff**:
writer port for the cliffs head `monmove.c distfleeck`. `js/`
insertions: 11 (`js/cmd.js` +12/−5, mostly the C cite) + committed
test.

## Intent vs deliverable

Promise: continue_run's no-path arm did end_running + move=0 +
return false, skipping the turn C runs; deleting the early return
makes no-path fall through like C :2724–2728 (travel1=0, domove,
move=1, turn runs). Probe Wiz-94142 →PASS (9816/9816 RNG, 321/321
screens); 5 corpus FAIL→PASS, 0 PASS→FAIL on rescore.

Diff actually adds: the deletion + comment. Promise matches diff.
No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | continue_run travel no-path arm (JS-only driver) | ported (domove row) | [cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:4441) | hack.c:2711–2991 (domove_core), 1265–1523 (findtravelpath) |

Helpers: none added. `findtravelpath_guess` (cmd.js:4702, read)
ports `found:` (dx=dy=0 + nomul(0) + NOPATH) — pre-existing, now
load-bearing. No clone→import re-point, so no `sym.mjs` re-point
output is required.

## C ↔ JS fidelity

**C has no early return — confirmed.** `csym domove_core` →
hack.c:2711–2991; the :2724–2728 block (read) is `if (travel) { if
(!findtravelpath(TRAVEL)) findtravelpath(GUESS); travel1 = 0; }`
with fall-through to the step ✓. `csym findtravelpath` →
hack.c:1265–1523; GUESS tail (read :1440–1523): no-guesses +
TEST_MOVE fail → `goto found:` → dx=dy=0, nomul(0), FALSE ✓;
TRAVEL-exhausted returns FALSE at :1516 with dx/dy stale and multi
kept (the B2 case) ✓. JS fall-through (cmd.js:4481–4487, read):
travel1=0, `await domove(dx, dy)`, move=1 unless domove zeroed it,
return true — the C shape exactly ✓.

**Both sub-cases land correctly.** found:-case: GUESS already
zeroed dx/dy + nomul(0) (which ended the run), so the old arm's
extra end_running was redundant and its move=0/return-false was
the turn-skip bug. B2-stale: nothing zeroes dx/dy or multi, so
JS steps the stale dir and retries next turn — C-identical by
construction ✓. No RNG in the deleted arm; the 95-draw turn-12
mechanism (TEMP-C measured, reverted, re-record byte-identical
per the D-log) explains the prefix match through 7671.

## Hallucinations / overclaim

None. The "5 sessions PASS, 0 regressions" rescore claim is
checkable against this audit's final board (see overlay); the
in-ship verify line matches my re-measure exactly.

## Density

Cliff §10.18: cliffs-head writer, one arm of the JS travel driver
(filed under the domove `Ledger:` row, which gains D-3583).
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: 0 hits.
- Rule #2: clean this iteration (see 2462).
- Committed test `travel-nopath-turn-runs.test.mjs`: 1/1 PASS now
  (pre-fix FAIL at prefix 7672 claimed in-ship).
- Re-measure (mine): `verify distfleeck --base c7223445e~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0 worse** +
  full reach **779/779 REACH-OK** (328 s) — the D-log's line
  exactly.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
