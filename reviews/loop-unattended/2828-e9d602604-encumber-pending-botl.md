# Review 2828 — e9d602604 — encumber_msg botl commits via putmesg conversion

- SHA: `e9d602604` (D-3983)
- Files: `js/invent.js` + `js/display.js` (+11/+11), focused test
  `scripts/chained-pline-sees-post-pline-botl.test.mjs`
- Method: cliff writer (2 functions, 1 mechanism); whole Method.
- Cites: C `pickup.c:1977–2020`, `pline.c:266–284`, `display.c:2236–2239`,
  `attrib.c:516–517`, `dothrow.c:1550–1559` — all read directly.

## Intent vs deliverable

Promise: C commits `disp.botl` synchronously after the crossing pline;
JS's floated `await pline` let a chained follower's flush run first,
painting Burdened one screen late (Valkyrie-610117 s1013 Stressed vs
Burdened) → PASS. Fix: record `game._pending_botl` synchronously with
the oldcap commit; `putmesg` converts it to real botl at display time.
Diff adds exactly the one-line record + the top-of-putmesg conversion.
Promise and diff agree.

## Inventory

- `encumber_msg` — `js/invent.js:1183` (export async) vs C
  `pickup.c:1977–2020`. Status: commit order repaired.
- `putmesg` — `js/display.js:10053` (file-local sync) vs C
  `pline.c:65` + vpline call order `:266–284`. Status: conversion added.

## C ↔ JS fidelity

C order, verified line by line:

- `pickup.c:1982–1999` / `:2000–2016`: crossing message, then
  `disp.botl = TRUE`; `:2019` commits `go.oldcap` — all synchronous,
  nothing interleaves ✓.
- `pline.c` vpline: `:266–271` vision recalc, `:273–274`
  `flush_screen` **before** `:276` `putmesg` ✓ — so the crossing
  message's own flush never repaints (botl unset at that point);
  `display.c:2236–2239` repaints botl first in every *later* flush ✓.
- Session story checks: `exercise` tail calls `encumber_msg`
  (`attrib.c:516–517` ✓); the dothrow stamina arm
  ("drops from your grasp" + `exercise(A_CON)`, `dothrow.c:1550–1559` ✓).

JS now matches C in every observable ordering:

- `game.oldcap = newcap` and `if (oldcap !== newcap)
  game._pending_botl = true` are adjacent with no `await` between ✓
  synchronous commit.
- Conversion sits at the top of `putmesg`, which the pline path calls
  (`display.js:10118`) strictly after its own flush (`:10113`,
  C `:273–274`) — so own flush doesn't repaint (as in C) and every
  later flush does (as in C). The conversion point equals C's
  post-`You()` sync set observationally.
- Backstop: both arms' post-pline real sets stay ✓ (a suppressed pline
  never reaches `putmesg`); the `debug_prevent_pline` early return
  precedes the conversion ✓. Double crossings are idempotent
  (`pending` is a boolean; C's `:1982`/`:2000` gates agree on when no
  message means no commit).
- `_pending_botl` has exactly 3 touch points repo-wide (1 set, 2-line
  convert), transient within the turn, no save/load surface ✓.
- No RNG anywhere on these paths; branch order untouched.

Not trace tailoring: no session/seed/coordinate/step gating — the
mechanism is C's synchronous commit order, same class as the
deferred-done drains (D-3949/D-3981). Nothing deleted or re-pointed →
`sym.mjs` N/A. Diff grep clean; Rule #2 clean (`--rulecheck`).

## Hallucinations / overclaim

None. Every C cite checked out (`:2016`/`:1999`, `:2236–2239`,
`:516–517`, `:1555` region). The `encumber_msg` vacuous verify is
labeled a note, not a PASS.

## Density

Cliff head of its parent (`do_statusline2` x12, Must-fix empty) ✓. One
cause, writer repaired, both `Ledger:` entries touched
(`pickup.c`/`pline.c` jsonl), focused test with authentic pre-fix FAIL
→ post-fix PASS, full 44/44 run (shared files) ✓.

## Verification

Ship-time: `verify do_statusline2: 1 PASS (Valkyrie full 1688), 11
unchanged`; `encumber_msg: note (0 blocked)`; smoke REACH-OK ×2;
green/strict/cohort + full 44/44 green.
Re-measure (`verify encumber_msg,do_statusline2 --base e9d602604~1
--jobs 4` on HEAD): `encumber_msg: 0 blocked` (note restated) + smoke
24/24 REACH-OK; `do_statusline2: 1 PASS, 0 moved, 11 unchanged, 0 worse
→ PROGRESS` — exact match, no later-SHA superset (this is HEAD).
No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
