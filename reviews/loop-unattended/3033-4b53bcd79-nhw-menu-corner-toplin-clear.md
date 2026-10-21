# Review 3033 — 4b53bcd79 — putstr NHW_MENU corner windows clear the topline only when toplin != EMPTY

- SHA: `4b53bcd79` (cliff; board row container_contents,
  scen-sweep-Archeologist-50055049 s1607, C keeps «Die? [yn] (n)» left of
  «Contents of the chest:», JS wiped it)
- D-entry: D-4193; Ledger: tty_display_nhwindow partial
- `js/` diff: pager.js +9 −12, invent.js +4 −3

## Intent vs deliverable

Promise: wintty.c tty_display_nhwindow's NHW_MENU corner arm calls
`tty_clear_nhwindow(WIN_MESSAGE)` (`:1938–1941`), which erases only when
`toplin != TOPLINE_EMPTY` (`:1047–1058`). JS show_nhw_menu_text blanked
the topline unconditionally, and look_here alone opted out through the
JS-only `keep_message_leftover` flag.

Diff: fullscreen (`offx === 0`) still sets `_pending_message = ''`. A
corner window calls `clear_message_window_menu_overlay()`. The `opts`
parameter, its doc and look_here's flag argument are deleted. The
promise matches the diff.

## Inventory

- show_nhw_menu_text — pager.js:627–774 (C wintty.c:1907–1946 MENU arm).
- look_here — invent.js:9640–9672 (C invent.c look_here; the call drops
  the flag).
- clear_message_window_menu_overlay — display.js:3484–3500, existing,
  new import (C wintty.c tty_clear_nhwindow NHW_MESSAGE `:1046–1057`).

`grep -anw keep_message_leftover js/*.js` → no hits. The flag is fully
gone, with no dangling reader.

## C ↔ JS fidelity

C `:1927–1941`:

```c
if (cw->offx == 10 || cw->maxrow >= (int) ttyDisplay->rows
    || !iflags.menu_overlay) {
    cw->offx = 0;
    if (cw->offy || iflags.menu_overlay) { tty_curs(window, 1, 0); cl_eos(); }
    else term_clear_screen();
    ttyDisplay->toplin = TOPLINE_EMPTY;
} else {
    if (WIN_MESSAGE != WIN_ERR) tty_clear_nhwindow(WIN_MESSAGE);
}
```

The corner arm is now C's call. The NEED_MORE flush (`:1921–1922`)
already ran at the head of show_nhw_menu_text. look_here gets C's
outcome from C state: display_nhwindow_message leaves toplin EMPTY, so
the clear is a no-op, and the JS flag that faked this is retired.

**Gap in the callee** (pre-existing, but this diff routes ~20 more
callers through it). C tty_clear_nhwindow NHW_MESSAGE `:1047–1056`:

```c
if (ttyDisplay->toplin != TOPLINE_EMPTY) {
    if (!erasing_tty_screen) { home(); cl_end();
        if (cw->cury) docorner(1, cw->cury + 1, 0); }
    cw->curx = cw->cury = 0;
    ttyDisplay->toplin = TOPLINE_EMPTY;
}
```

JS display.js:3485–3489 zeroes `_msg_cw.curx/cury` **before** the EMPTY
test, so on EMPTY it is not a no-op. In C, a cury > 0 left under an EMPTY
toplin survives, and topl.c update_topl `:275–277` (`else if
(cw->cury) docorner(1, cw->cury + 1, 0)`) and the yn clean-up `:547`
read it. JS loses it. That needs a wrapped message marked EMPTY without
a clear, followed by a corner menu. No corpus row shows it.

## Hallucinations / overclaim

The D-log calls clear_message_window_menu_overlay "the existing exact
port … which returns early on TOPLINE_EMPTY". It returns early only
after the cursor reset above, so "exact" overclaims in exactly the
EMPTY case this commit relies on. The topline text behaviour that the
symptom needs is right.

## Density

One arm on the cliffs-head writer, plus one retired JS-only flag.
Right-sized.

## Verification

```text
verify container_contents,look_here,show_nhw_menu_text --base 4b53bcd79~1 --no-reach
  container_contents: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                      (scen-sweep-Archeologist-50055049: PASS)
  look_here, show_nhw_menu_text: 0 blocked (vacuous)
```

This reproduces the D-log. Regressions in the window are checked by the
audit's single full rescore.

## Actionable C-wrongs

1. display.js clear_message_window_menu_overlay: move the
   `curx = cury = 0` inside the `toplin != EMPTY` gate (wintty.c
   `:1047–1056`). It is unreached, so per §10.19 it is not a Must-fix.
   It is recorded in the tty_clear_nhwindow ledger omit by this audit.
   Ship it with the first wintty.c cliff that reaches a wrapped EMPTY
   topline.

Verdict: **ACCEPT-WITH-DEBT**
