# Review 2501 — 81ffd2b1b — really_done topline EMPTY (D-3620)

SHA: `81ffd2b1b` — cliffs-head `yn_function` writer (death disclose topline).
D-3620.

## Intent vs deliverable

Promise: after the answered `Die? [yn]` prompt, C's `really_done`
`display_nhwindow(WIN_MESSAGE)` settles toplin EMPTY without erasing pixels,
so the disclose menu overlay keeps the stale prompt; JS blanked it. Fix adds
two display helpers and wires them: 5 PASS.

Diff actually adds: `js/display.js` (+36) — `mark_topline_empty()` and
`clear_message_window_menu_overlay()`; `js/end.js` (+7) — wire in
`really_done`; `js/invent.js` (+4/−2) — corner menu clear via the new
helper; `scripts/disclose-topline-retain.test.mjs` (2 cases). Same-edge
import-name additions only.

## Inventory

- `mark_topline_empty` (`js/display.js:3152`, new) — C `wintty.c:1873–1884`
  NHW_MESSAGE else-arm + `end.c:1246–1247` call site. Status: fixed.
- `clear_message_window_menu_overlay` (`js/display.js:3170`, new) — C
  `wintty.c:1047–1058` + `:1108` via the NHW_MENU overlay shape `:1934–1938`.
  Status: fixed.
- `really_done` wire (`js/end.js:1146`) + `paint_corner_nhw_menu` wire
  (`js/invent.js:3020`). Status: fixed.

## C ↔ JS fidelity

All four C sites verified. `end.c:1246–1247`: `display_nhwindow(WIN_MESSAGE,
FALSE)` after `clearlocks()`, before the disclose walk — JS wires after
`flush_topl_more()` at the same position. NHW_MESSAGE arm (`:1874–1884`):
NEED_MORE → `more()` + clear (ends EMPTY); else → `toplin = EMPTY`,
`curx = cury = 0`, no visual erase — JS `mark_topline_empty()` is line-exact,
and the unconditional call is correct because the NEED_MORE arm already ends
EMPTY via `more()` (`js/display.js:8107`). `tty_clear_nhwindow` MESSAGE
(`:1047–1058`, `:1108`): visual erase only when `toplin != EMPTY`,
unconditional cur zero — JS matches, including the early return. The MENU arm
(`:1900–1946`) sends only the *overlay* branch through that clear
(`:1934–1938`); the fullscreen branch blanks unconditionally (`:1924–1933`)
— so wiring the new helper only in the corner painter is the correct call
shape, and the fullscreen path is untouched.

The `_pending_message` mechanism is sound, not a hack: screen capture reads
it (`display.js:7067/7245/7279`), so keeping it under EMPTY state reproduces
C's stale pixels, and clearing it under non-EMPTY reproduces `home();
cl_end()`. The deliberate split from `clear_nhwindow_message`'s parse-time
extension (`:3119–3136`, clears pending even when EMPTY) is named in the
D-entry with its hot-path rationale.

Helper class: both new functions are faithful C-arm replicas (LIVE), single
definitions each per `sym.mjs`, sync. No clone created or re-pointed. No
FORCE/DIAG/seed/coordinate in the hunks.

## Hallucinations / overclaim

None. The "1 screen lost each, RNG fully matched" symptom and the
cols-0–12-only grid diff are consistent with a pure topline-state bug, and
the fix touches only topline state.

## Density

Cliff commit, one writer family (two C arms + two wires), own head
(`yn_function`) per its HEAD queue. The behavior change necessarily affects
every corner menu, but it *is* C's behavior for every overlay menu, and
REACH + full 44 (D-log) hold. Ledger: `end.c` row updated (D-3620); wintty.c
rows stay unknown per the distributed-painter precedent — named, not hidden.

## Verification

Re-measured: `hidden-proxy.mjs verify yn_function --base 81ffd2b1b~1
--reach-all` → `5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(all five D-log sessions still PASS); smoke reach 24/24 → REACH-OK. Exact
match. Unit test: 2 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
