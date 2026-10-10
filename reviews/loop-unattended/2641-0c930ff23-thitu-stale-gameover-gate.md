# Review 2641 — 0c930ff23 — thitu stale-gameover gate (D-3777)

Metadata. SHA `0c930ff23` (2026-10-10), D-3777, parent
`f486e0541`. js diff: `js/mthrowu.js` +7/−1 (one
gate: `gameover` → `_losehp_needs_done`) +
`scripts/thitu-stale-gameover-exercise.test.mjs`
(new). Ledger: `thitu` ported-note. Works the
cliffs row-2 (exercise; row-1 randomize exhausted).

## Intent vs deliverable

Promise: 95225@544 — dart-trap hit on a healthy
hero skipped C's A_STR exercise because moves-85
entered with STALE gameover=1 (gas death #11's
done() pending across the turn boundary) and JS
took the gameover-gated early return. Fix: gate on
THIS losehp's death flag.

Diff delivers exactly that gate. Promise and diff
match. No import change.

## Inventory

Changed JS (1 writer, 1 arm):

- thitu hit else-arm — `js/mthrowu.js:687–706`.
  C: `mthrowu.c:73–155` (csym range; whole body
  read: miss :105–119, acid :121–124, stone
  :125–129, potion :130–134, silver :136–140,
  losehp+exercise :150–151).

## C ↔ JS fidelity

**Gate C-exact.** C `:150–151` is unconditional
`losehp; exercise(A_STR,FALSE)` — C has no
pending-death state, so a non-fatal hit always
exercises. JS now matches: `_losehp_needs_done` is
set atomically with gameover in losehp
(`js/hack.js:1950–1951`, read) and consumed by
finish_losehp_done (`js/end.js:1919–1920`, read),
while gameover clears only at survive-resolution
(`js/end.js:2218`). The stale window (flag false,
gameover 1 — death #11's yn still resolving) is
exactly what the old gate misread; the new gate
skips the drain there and exercises, like C. Fatal
combinations preserved: this-hit death still drains
and returns 1 on true death. Arm context intact
(silver A_CON :136–140, acid burns, potion arm
untouched per Named-2). No symbol deleted or
re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The forensics (3 thitu
calls, moves-83 inline drain umort 9→10 vs
moves-85 stale entry umort 11→11, uhp 75) are
worker-direct measured, reverted. Named-1 (the
late-resolving savelife itself) is honestly left
open with a falsifier, not smuggled as fixed.

## Density

Cliff-phase §2b: one row, one writer arm, no
bundling. 95225 → FULL PASS. Focused test red
pre-fix → green post-fix (authentic shape).

## Verification

D-log Verify: exercise 1 PASS + 1 unchanged;
reach 80-spreads; gates + cohort PASS.

Re-measured by this audit (`verify exercise,thitu
--base 0c930ff23~1 --reach-all`, on HEAD so it
includes D-3781):

```text
verify exercise: 1 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-95225: PASS
  scen-sweep-Healer-95346: moved → do_statusline2 at step 474 (re-attributed)
reach exercise: 961 PASS, 0 regressed → REACH-OK
verify thitu: […] vacuous […]
reach thitu: 113 PASS, 0 regressed → REACH-OK
```

95225 PASS confirms D-3777; full 961/961 + 113/113
reach, 0 regressed — supersedes the spreads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
