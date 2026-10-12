# Review 2725 — e0e05880b — getpos nxtc curs (D-3865)

Metadata: SHA `e0e05880b`, D-3865, cliffs-head
`getpos.c` getpos (loop-top dropped the nxtc curs
on auto_describe miss). JS: `js/getpos.js` (+8:
one curs call + C cite). Test:
`scripts/getpos-nxtc-curs-miss.test.mjs` (new).

## Intent vs deliverable

Promise: 'm'-cycle cursor stale on hero — C's
nxtc footer curses every arm pass (`:1144–
1148`), so the loop-top autodescribe arm
(`:865–866`) inherits the moved-cell cursor
even when the describe misses and prints
nothing; JS's auto_describe curses only on a
hit, leaving the cursor stale; add the nxtc
curs before the describe (no-op re-curs on a
hit); marathon FULL PASS. Diff actually does
that. Match.

## Inventory

- getpos loop-top autodescribe branch
  (getpos.js:1465): one `curs_win_map(cx, cy)`
  before `await auto_describe(cx, cy)`.
  C: getpos.c nxtc `:1143–1148` (read:
  getposx/y, cliparound, `curs(WIN_MAP,cx,cy)`,
  flush) + loop-top `:860–867` (read:
  autodescribe arm calls auto_describe with no
  own curs — it relies on the previous pass's
  nxtc curs).
- auto_describe (getpos.js:655, read): early
  `return` on describe miss (no curs); curs
  only after a successful describe (`:694–
  695`, C `:659–660`) — the "curses only on a
  hit" claim verified in the body.
- curs_win_map (getpos.js:630): single local
  helper, no cross-file clone.

## C ↔ JS fidelity

Control-flow confirm. C's structure makes the
nxtc curs unconditional-between-passes: every
arm ends `goto nxtc` → curs → loop top. JS's
loop-top branch had no equivalent on the miss
path (early return skips the only curs), so
the cursor kept whatever an earlier paint left
(stale on hero). The fix inserts exactly C's
statement at exactly the position C's flow
implies (before `:865–866`'s describe, carrying
`:1144–1148`'s cursor). On a hit the added
curs targets the same cell auto_describe
re-curses — idempotent, as claimed. Cursor-only;
no RNG, no message text touched.

## Hallucinations / overclaim

None. The wizmap/TER_MON miss mechanism
(pager.c:1328 monster-arm skip on a displayed
'o') is cited as the miss cause, consistent
with the early-return path. No DIAG/FORCE/seed
in the js hunk.

## Density

Cliff-phase: getpos head (578214's post-D-3863
block at 433 — this closes the D-3863→D-3865
chain; review 2723's "later progress" note
resolves here). Ledger: getpos.c row + D-3865.
Reached: probe FULL PASS (834/834).

## Verification

Rule #2 clean (iteration-wide). Re-measure
(mine): `verify getpos --base e0e05880b~1
--reach-all` → `1 session(s) blocked on it (1
at baseline, 0 in the working scoreboard)`,
Monk-578214 PASS, `1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`; smoke 24/24
REACH-OK. Zero regressed. The FULL-PASS claim
is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
