# Rotated from AGENT-LOOP-JOURNAL.md (#426 / D-0400)

## 2026-07-15 13:32 — #413 autopick check_here (D-0387)
- Objective: seed0012 @75 `You see here a statue of a newt.`
- C locus: pickup.c pickup — after autopick, `check_here(n_picked>0)`.
- Change: JS `pickup` always called check_here only when `!flags.pickup`;
  ported post-autopick check_here + run nomul. Filtered pickup_types left
  statue/sling on floor; look_here was already correct.
- Verification: Scr **236→239**/308; @75/@79 match; green+strict PASS;
  cohort 22/22 PASS.
- Next: seed0012 @98 `$ - 5 gold pieces (7 in total).`

## 2026-07-15 13:26 — #412 hilite_pile ATR_INVERSE (D-0386)
- Objective: seed0012 @70 post-Options map — hypothesized DEC vs Unicode.
- C locus: display.h obj_is_piletop; wintty.c tty_print_glyph MG_OBJPILE
  + hilite_pile + use_inverse → ATR_INVERSE.
- Change: falsified DEC theory (Options `f` toggled hilite_pile); ported
  piletop attr through map_location/newsym + remembered redraw.
- Verification: Scr **199→236**/308; green+strict PASS; cohort 24/24.
- Next: seed0012 @75 `You see here a statue of a newt.`

## 2026-07-15 13:20 — #411 doset_simple_menu (D-0385)
- Objective: seed0012 @58 Options — port C `doset_simple_menu`.
- C locus: options.c doset_simple_menu; windows.c choose_classes_menu;
  wintty.c multipage fullscreen + status-after-clear.
- Change: allopt-driven Options menu + extract; choose_classes ATR/stay-open;
  status suppress across submenu; symset get_val.
- Verification: seed0012 Scr **187→199**; green+strict PASS; cohort
  seed1500/1800/0009 PASS.
- Next: seed0012 @70 post-Options map DEC vs Unicode restore.
