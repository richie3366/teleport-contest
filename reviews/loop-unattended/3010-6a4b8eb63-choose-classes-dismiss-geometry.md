# Review 3010 — 6a4b8eb63 — choose_classes_menu dismisses by menu geometry

- SHA: `6a4b8eb63` (cliff; board row doset_simple_menu,
  scen-options-Knight-50355037 s87, 11 screens; writer windows.c
  choose_classes_menu → tty erase_menu_or_text)
- D-entry: D-4170; Ledger: choose_classes_menu ported
- `js/` diff: options.js +6 −4

## Intent vs deliverable

Promise: choose_classes_menu ends with `destroy_nhwindow(win)`. tty's
erase_menu_or_text runs docrt + flush_screen(1) only for a fullscreen
menu, and `docorner` for a corner one. JS docrt'd every dismissal. With
spot_monsters on, docrt → vision_recalc → notice_all_mons re-posted «You
see your saddled pony.», so the next menu raised a --More-- that C never
shows.

Diff: the local `dismiss` calls invent.js `dismiss_nhw_menu()` instead of
`_menu_overlay = false; docrt(); flush_screen(1)`. The promise matches
the diff.

## Inventory

- choose_classes_menu — options.js:5902 (C windows.c:1644–1755; destroy at
  upstream `:1738`; the D-log's `:1746` is the recorder-tree line).
- dismiss_nhw_menu — invent.js:3267 (existing; also used by
  doset_simple_menu, options.js:10120).
- Five dismiss sites (options.js:5947, :5951, :5963, :5969 + ESC path)
  all route through it.

## C ↔ JS fidelity

C erase_menu_or_text (upstream wintty.c:965–984):

```c
if (cw->offx == 0) {
    if (cw->offy) { tty_curs(window, 1, 0); cl_eos(); }
    else if (clear) term_clear_screen();
    else { docrt(); flush_screen(1); }
} else
    docorner((int) cw->offx, cw->maxrow + 1, 0);
```

dismiss_nhw_menu reads the geometry paint_corner_nhw_menu recorded. For
`offx == 0` it runs docrt + flush. For a corner menu it runs
`erase_menu_or_text(offx, 0, maxrow + 1, false)` → docorner, with no
vision_recalc and so no notice_all_mons re-post. That matches the probe
backtraces in the D-log: every C re-post follows the fullscreen Options
menu's docrt, and none follows the corner menu.

The helper does not model the `offy != 0` cl_eos arm. That gap is
pre-existing and not reached by a class menu: paint_corner_nhw_menu
never sets offy for these. `clear` is FALSE on the destroy path (tty
`:1999` passes FALSE), and the helper uses that.

## Hallucinations / overclaim

None.

## Density

Reuses an existing C-shaped helper (removes a private clone of the
dismiss). Right-sized. The D-log's Named ("other JS menus with a private
docrt-always dismiss were not audited") is a fair reading list.

## Verification

```text
verify doset_simple_menu,choose_classes_menu --base 6a4b8eb63~1 --no-reach
  doset_simple_menu: 1 PASS (scen-options-Knight-50355037) → PROGRESS
  choose_classes_menu: 0 blocked (vacuous)
```

This reproduces the claim. Full rescore: 0 PASS→FAIL across the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
