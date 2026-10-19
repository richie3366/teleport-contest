# Review 2949 — 0b6f04308 — NHW_MENU display does no flush_screen; NEED_MORE arm gets the topline clear

- SHA: `0b6f04308` (cliff, board owner `furniture_detect`, 1 sweep row)
- D-entry: D-4109; Ledger: tty_display_nhwindow partial; tty_clear_nhwindow
  partial; ask_do_tutorial ported; do_look ported (99d5ac94d restored
  tty_clear_nhwindow's omit text, which this SHA's finish had overwritten)
- `js/` diff: `js/invent.js` +16/−7, `js/display.js` +32, `js/allmain.js`
  ±2, `js/getpos.js` −1, `js/pager.js` −2

## Intent vs deliverable

Promise: C `tty_display_nhwindow(NHW_MENU)` never calls flush_screen,
but the JS corner painter flushed the full map before every menu. So a
hallucinating hero's `getpos_sethilite` newsyms showed under the first
getpos tip, where C still shows the old glyphs. Also, the menu's
NEED_MORE arm lacked the tty_clear_nhwindow topline erase. Diff:

- the corner painter, `select_menu_pick_none` and the doattributes
  inline painter replace `flush_topl_more` with
  `if (topline_need_more()) await display_nhwindow_message()`;
- the corner painter's `flush_screen(1)` becomes
  `paint_message_window_only()`;
- `clear_nhwindow_message` and `clear_message_window_menu_overlay` erase
  row 0 visibly (`topline_home_cl_end`);
- three shims are removed: getpos tip's extra flush, ask_do_tutorial's
  pre-menu flush, and do_look's `length > 40` forced more().

Promise = diff.

## Inventory

- `paint_corner_nhw_menu` — invent.js:3093; C wintty.c :1919–1920.
- `select_menu_pick_none`, `doattributes` painter — invent.js:3332, :8874.
- `clear_nhwindow_message` / `clear_message_window_menu_overlay` —
  display.js:3338, :3420; C tty_clear_nhwindow NHW_MESSAGE :1047–1056.
- New `topline_home_cl_end`, `topline_need_more`,
  `paint_message_window_only` (display.js; no C counterpart beyond
  home()+cl_end() / the toplin read).
- Callee `display_nhwindow_message` — display.js:3408 (C NHW_MESSAGE arm:
  more(), re-set NEED_MORE, then clear). LIVE.

## C ↔ JS fidelity

```c
if (ttyDisplay->toplin == TOPLINE_NEED_MORE)
    tty_display_nhwindow(WIN_MESSAGE, TRUE);      /* wintty.c :1919–1920 */
…
case NHW_MESSAGE:
    if (ttyDisplay->toplin != TOPLINE_EMPTY) {
        if (!erasing_tty_screen) { home(); cl_end();
            if (cw->cury) docorner(1, cw->cury + 1, 0); }
        cw->curx = cw->cury = 0; ttyDisplay->toplin = TOPLINE_EMPTY; }
```

The JS menu prologue is now exactly C's guarded call. The old
`flush_topl_more` did more() but no clear, so row 0 stayed stale under
the overlay. The clear arm is `home(); cl_end()` (all row-0 cells blank),
plus `resync_map_row0` when the message wrapped. That is the JS stand-in
for `docorner(1, cury+1)` when `cury > 0`. No flush_screen appears on
C's NHW_MENU path (:1900–1960), so `paint_message_window_only` (topline
state only, no map or status) is the faithful repaint. The do_look
`length > 40` more() was a heuristic with no C counterpart. Its removal
is a fidelity gain: in C the --More-- comes from the menu display or
from the next pline overflowing. No RNG on any changed path.

## Hallucinations / overclaim

None. The commit lists two failed sweep shapes (36 and then 3
regressions) before the shipped one. The shipped one is the C shape.
The named partials (TEXT/MAP/STATUS arms, other pre-menu
`flush_topl_more` sites in pager.js / do_name.js) are honest.
look_here's site was then fixed by D-4111 (review 2951).

## Density

One owner, plus the menu-display prologue it needed at its three
painter sites. Within one C function family (tty_display_nhwindow /
tty_clear_nhwindow).

## Verification

```text
verify furniture_detect (--base 0b6f04308~1): 1 blocked
  scen-sweep-Barbarian-49956058: PASS → PROGRESS
verify getpos: 4 blocked, all still getpos at their steps (0 worse)
verify look_here: 7 blocked → Tourist-49956023 + wish-Barbarian-49959107
  PASS (later SHAs' code), 5 symset rows unchanged (parked D-3946)
verify do_look: 0 blocked
```

The D-log's furniture_detect claim reproduces. getpos/look_here were
added as adjacent rows and stay 0 worse. Full public 44/44 on HEAD.

## Actionable C-wrongs

None new.

Verdict: **ACCEPT**
