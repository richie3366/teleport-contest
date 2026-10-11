# Review 2706 — 6c3585607 — vamp_shift MESSAGE arm (D-3845)

Metadata: SHA `6c3585607`, D-3845, cliffs-head `do.c`
flooreffects writer (owner C-whole, ledger ported; D-3784-class
literal collision). JS: `js/display.js` (+30: new export),
`js/monmove.js` (+5/−4: import + wiring). Test:
`scripts/vamp-shift-display.test.mjs` (new, 2 `it`).

## Intent vs deliverable

Promise: Healer-578136@632 shows a stale-vs-fresh map split —
JS's postmov pline flushed the map while C held it behind the
--More--; vamp_shift's `display_nhwindow(WIN_MESSAGE, FALSE)`
was a no-op comment in JS; port the NHW_MESSAGE arm whole and
wire it; session moves 632→878. Diff actually does: new async
`display_nhwindow_message()` + `await` in vamp_shift replacing
the no-op comment. Match.

## Inventory

- `display_nhwindow_message` (js/display.js:3278, async) —
  new. C: `nethack-c/upstream/win/tty/wintty.c:1873–1884`
  (read): NEED_MORE → more(); re-set NEED_MORE; clear;
  assert EMPTY; else EMPTY; cur zero; `!active →
  window_inited`. JS: NEED_MORE → remember_topl (adaptation,
  precedented — see below) + more() + re-set + clear; else
  mark EMPTY + cur zero. Arm-for-arm.
- `vamp_shift` (js/monmove.js:937, async local ≡ C staticfn)
  — wired. C: `nethack-c/upstream/src/monmove.c:2374–2394`
  (csym; body read): shape-match → 1; else vampshifter →
  newcham + UNCONDITIONAL display_nhwindow(WIN_MESSAGE,
  FALSE). JS matches (pre-existing newcham shape kept; the
  display call now live). Sole C caller postmov :1496 (csym).
- Callees all LIVE same-file: more (blocks via nhgetch, wipes
  _toplines, never flushes map — comment-cited), remember_topl,
  clear_nhwindow_message (EMPTY + cur zero), mark_topline_empty
  (EMPTY + cur zero), ensure_message_win. Import is one name
  added to monmove.js's existing display.js import — no new edge.

## C ↔ JS fidelity

The NEED_MORE path is the fix: C more() blocks WITHOUT a map
flush, then the clear arm runs — exactly the hold-vs-paint
split the symptom describes. The one non-C line,
`remember_topl()` before more(), is a faithful adaptation, not
a divergence: C keeps gt.toplines through more()+clear (the
next message's remember_topl histories it); JS more()/clear
wipe _toplines (read both), so the history must flush here —
the identical idiom + rationale already live in update_topl
(js/display.js:9368, read). Named in the JSDoc + ledger omit:
HUPSKIP/WIN_ERR/WIN_CANCELLED/lastwin+rawprint/`!active`
(startup/cancel bookkeeping; message window never cancelled),
MAP/STATUS/MENU/TEXT arms, sibling WIN_MESSAGE sites (still
flush_topl_more — loses pre-more history vs C, honestly
named). No RNG in the arm; the behavioral print effect is the
More-wait + topline clear the probe needed.

## Hallucinations / overclaim

None. "Ported the NHW_MESSAGE arm whole" is true modulo the
named bookkeeping; "no STOP check — C's arm has none" verified
(:1873–1884 contain none). The D-log's "NOT flush_topl_more"
distinction is real (that idiom skips history + clear).

## Density

Cliff-phase: head writer correct (first divergence names the
More-hold timing; owner proven whole). One arm + wiring, two
Ledger entries (vamp_shift ported + D-3845; tty_display_nhwindow
partial with the omit text), Verify bullet with movement +
REACH + green + strict + cohort + auto full 44/44 (shared
file). Reached: probe moved 632→878 per the ship-time board.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, at HEAD): `verify flooreffects --base
6c3585607~1` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, `scen-worldtour-Healer-578136:
PASS`, `1 PASS, ... → PROGRESS`; reach 3/3 REACH-OK. Zero
regressed. PASS rather than the ship-time 632→878 because
D-3846 later moved the session to PASS (its subject says so).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
