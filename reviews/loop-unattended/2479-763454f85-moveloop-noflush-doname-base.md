# Review 2479 — 763454f85 — moveloop flush delete (D-3598)

**Metadata.** SHA `763454f85` (2026-10-07, D-3598). Type: **cliff**:
writer fix for the cliffs head `objnam.c doname_base` (4 corpus
blocks; parked MISATTRIBUTED — writer deliverable, not a symptom
re-port). `js/` insertions: 6 (`js/allmain.js` +6/−4, one deleted
call + comment) + new test.

## Intent vs deliverable

Promise: the unconditional `flush_screen(1)` in `moveloop_core`
(D-2405 leftover) paints gbuf one screen ahead of C whenever a
yn/getdir preface `more()` blocks with no status change; deleting
it moves 4 doname_base sessions (2 PASS, 2 past).

Diff actually adds: the deletion + a C-citing comment. Promise
matches diff. No symbols deleted or re-pointed (`flush_screen`
still live, see below).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | moveloop_core once-per-input section | ported (flush delete) | [allmain.js](/home/debian/dev/teleport-contest/js/allmain.js:1486) | allmain.c:473–479 + cmd.c:5104 |

Helpers: none. `dog_move`/`dog_goal`/`mfndpos` verified whole by
TEMP-C measurement, unchanged.

## C ↔ JS fidelity

**C has no unconditional flush here.** `allmain.c:473–479` (read):
`if (disp.botl || disp.botlx) { bot(); curs_on_u(); } else if
(disp.time_botl) { timebot(); curs_on_u(); }` — paint happens only
inside the arms, then straight to `m_everyturn_effect` (:481) ✓.
The "next flush is parse()'s" cite holds: `cmd.c:5104`
`flush_screen(1)` at the top of `parse()` (read) ✓.
`csym moveloop_core` → allmain.c:176–564; callers `moveloop` :595,
nhlua :1452 (both just call it — no guarding `if` implicates the
deleted line) ✓.

**JS now mirrors C arm-for-arm.** [allmain.js](/home/debian/dev/teleport-contest/js/allmain.js:1486)
`botl||botlx → bot()+curs_on_u()`, `else time_botl →
timebot()+curs_on_u()` — same order, same gates, no trailing
flush ✓. The deleted line was provably extra: nothing in C
:473–483 paints outside the arms.

`sym.mjs flush_screen` → `js/display.js:7828 ASYNC` — the export
is live; only this one call site was removed, so no re-point audit
applies.

## Hallucinations / overclaim

None. "Named: none in this unit" is accurate — the section is now
a line-for-line mirror of C :473–479. The TEMP-C order
(F,F,F,F/M1,M2/commit/M1-no-flush/M2/F,F) is a commit-message
claim about ignored-tree files, but its conclusion (JS flushed
between dog move and more-block; C does not) is independently
confirmed by the C read above plus the JS DIAGFLUSH stack the
D-log cites.

## Density

Cliff §10.18: parent queue head is doname_base (4 blocks, RNG
645 — re-read from `763454f85~1:docs/LOOP-QUEUE.md`), tag parked
MISATTRIBUTED → writer deliverable is exactly what shipped. One
cliff, own `Ledger:` touch (D-3598 appended on moveloop_core),
movement on all 4 probes. Per-function verdict ACCEPT → SHA
ACCEPT.

## Verification

- Added-code grep: clean (comment + deletion only; no
  FORCE/DIAG/seed/coords).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `moveloop-yn-more-noflush.test.mjs`: PASS now
  (pins C's stale map at step 285).
- Re-measure (mine): `verify doname_base --base 763454f85~1
  --reach-all` → **2 PASS, 2 moved past, 0 unchanged, 0 worse**
  (Barbarian-94366 PASS, Caveman-94206 PASS, Ranger-94002 →
  yn_function@219, trap-Caveman-94281 → trapeffect_rocktrap@146)
  + smoke 24/24 REACH-OK. No REGRESSED session. Note: Ranger
  lands one owner further than the D-log's dosounds@197 because
  the working tree already contains D-3599 — cumulative movement,
  same direction, explained.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
