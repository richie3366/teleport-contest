# Review 2926 — 5f9c42ea8 — corner-menu dismissal no longer flushes the screen

- SHA: `5f9c42ea8` (cliff, owner `process_menu_window`)
- D-entry: D-4085; Ledger: wintty.c (`tty_destroy_nhwindow` split
  js=pager.js:show_nhw_menu_text, D-4085)
- `js/` diff: `js/pager.js` +5 −5

## Intent vs deliverable

Promise: during final disclosure, dismissing a corner menu
(«Contents of the large box:») ran `flush_screen(1)` after the docorner
erase. A pending botl then repainted status rows 22–23, which C leaves
blank until the next window (3 sessions). Diff: the corner-arm
`flush_screen(1)` is deleted from `show_nhw_menu_text`, and the comment
is rewritten. Promise = diff.

## Inventory

- `show_nhw_menu_text` dismissal tail — pager.js:768–777; C
  wintty.c tty_destroy_nhwindow :2009– → tty_dismiss_nhwindow :1999 →
  `erase_menu_or_text` :966–984 → `docorner` :3650–3718.

## C ↔ JS fidelity

```c
erase_menu_or_text(window, cw, clear) {
    if (cw->offx == 0) { if (cw->offy) { tty_curs; cl_eos(); }
                         else if (clear) term_clear_screen();
                         else { docrt(); flush_screen(1); } }
    else docorner((int) cw->offx, cw->maxrow + 1, 0);
}
```

Only the full-width `docrt` arm flushes. The corner arm is `docorner`
alone. `docorner` clears and redraws each row (cl_end, row_refresh),
then `end_glyphout()`. Only when `ymax >= wins[WIN_STATUS]->offy` does it
set `disp.botlx` and call `bot()` (:3714–3718). It has no
`flush_screen`. tty_destroy_nhwindow adds no flush either. Before this
fix, JS's extra `flush_screen(1)` ran the core's pending `bot()` on
every corner dismissal. Dropping it leaves the status repaint to
docorner's own `bot()` gate, as in C. The full-width arm keeps its
docrt + flush. No RNG.

## Hallucinations / overclaim

None. The D-log says plainly that verify has no movement line here
(rows owned by `process_menu_window`). It gives a full `score` (677/864,
0 PASS→FAIL) and names the reserve row it scored by id.

## Density

One deleted line at the C-equivalent locus. One Ledger bullet.

## Verification

```text
verify process_menu_window (--base 5f9c42ea8~1): 5 blocked
  sweep-Caveman-50350081, sweep-Healer-50055088, sweep-Caveman-610105: PASS
  options-Monk-50355038 s121, options-Priest-50162016 s51: still (empty toplines — other shapes)
verify process_menu_window: 3 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS
```

This matches the D-log's 2 + 1 reserve claim. Removing a screen flush is
a shared-path change, and the audit's full rescore (below) is its
regression check. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
