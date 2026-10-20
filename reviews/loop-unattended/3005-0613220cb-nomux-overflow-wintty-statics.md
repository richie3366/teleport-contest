# Review 3005 — 0613220cb — recorder overflow past obuf: wintty erasing / clipping / resize_mesg

- SHA: `0613220cb` (recorder model, the next layer of D-4164; 2 sweep
  sessions, +1,313 screens)
- D-entry: D-4165; Ledger: tty_nhgetch split; tty_clear_nhwindow partial
- `js/` diff: display.js +93, nomux_capture.js +69 −6, input.js +7 −1;
  test +21

## Intent vs deliverable

Promise: payloads longer than 7472 bytes overrun obuf into wintty.c's
statics: erasing_tty_screen, `boolean clipping` (schar), clipx/clipy/
clipxmax/clipymax, calling_from_update_inventory, resize_mesg, fieldorder,
tty_status. C then acts on that text. Erasing stops the screen clears,
clipping pans the map left, and resize_mesg turns every key read into ESC.
JS carries the statics through the overflow and honours them.

Diff: `overflow_wintty` loads the live JS values into a 48-byte image,
applies the overflow bytes and the `\0`, and pokes the values back.
display.js adds `erasing_tty_screen` and `resize_mesg`, the
`nomux_wintty_statics` / `nomux_wintty_poke` accessors and
`tty_resize_mesg_arm`, and erasing gates in clear_nhwindow_message,
clear_message_window_menu_overlay and cls. It also adds a per-cell
`_nomux_shadow` for cells a pan no longer reaches. input.js runs the
resize arm after the key read. The promise matches the diff.

## Inventory

- overflow_wintty, put32le — nomux_capture.js (layout: +0 erasing, +4
  clipping schar, +8/12/16/20 clip*, +28 resize_mesg; 48 bytes to
  tty_status at +0x30). This matches the D-log's nm addresses
  (0x49db50…0x49db80).
- tty_resize_mesg_arm — display.js (C wintty.c tty_nhgetch RESIZABLE arm,
  upstream `:4084–4089`).
- clear_nhwindow_message / clear_message_window_menu_overlay — erasing
  gate (C tty_clear_nhwindow NHW_MESSAGE upstream `:1047–1056`).
- cls — `!erasing_tty_screen` gate (C NHW_MAP → NHW_BASE `:1074–1085`).
- nomux_cell_gbuf → `_nomux_shadow` fallback under a pan.
- reset_display_messages zeroes the new statics per game.

## C ↔ JS fidelity

NHW_MESSAGE (upstream `:1047–1056`): inside `toplin != EMPTY`, the erase
`home(); cl_end(); if (cury) docorner(…)` runs only `if
(!erasing_tty_screen)`. Then curx/cury are zeroed and toplin is set EMPTY.
JS sets EMPTY and zeroes curx/cury before its gate, then skips
topline_home_cl_end and resync_map_row0 (the docorner) under erasing. The
`_stale_topline` handoff is JS-only bookkeeping, so the next flush does
not repaint row 0 from `_pending_message`. The text stays as stale pixels,
as it does in C.

NHW_MAP/BASE (`:1074–1085`): `botlx = TRUE`, then term_clear_screen only
if not erasing. JS cls sets botlx and gates clearScreen. That is exact.

tty_nhgetch (`:4084–4089`): after the real read, `if (resize_mesg) {
resize_mesg = 0; tty_clear_nhwindow(WIN_MESSAGE); i = '\033'; }`. JS runs
it in the queue-read branch only, which is the analogue of the read
branch. That is exact.

Clipping: JS stores the schar as a number, and every reader tests it as
truthy (grep: only `clipping === true` in the statics getter). The
existing tty_cliparound (C `:3817–3842`, ported earlier) then re-anchors:
`x < clipx + 5` → `clipx = max(0, x − 20)`, so 73 → 53, the measured
shift.

Line cites: the D-log's `:4154–4160` and `:1073–1120` are recorder-tree
lines. Upstream they are `:4084–4089` and `:1047–1108`. The content
matches; only the numbers differ (same note as reviews 2988 and 2993).

Named and true: the NHW_STATUS / NHW_MENU / dismiss gates (`:1063`,
`:1096`, `:1988`) are not gated. `erase_tty_screen`'s `if
(erasing_tty_screen++)` sticky path is not modelled. Neither corpus
session reaches them.

## Hallucinations / overclaim

None. The 1300-step stall the D-log describes (every key ESC) is exactly
what the resize arm produces from the measured bytes.

## Density

~170 lines of tooling model for 2 sessions and 1,313 screens, on the
human's 2026-10-20 rule. Right-sized for the layer.

## Verification

Owner-null rows; I replayed them directly at HEAD:

```text
scen-sweep-Archeologist-610093  PASS 1643/1643  rng 55504/55504  cur 1643/1643
scen-sweep-Monk-49956033        PASS   95/95    rng  7163/7163
```

This reproduces the claim. Public 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
