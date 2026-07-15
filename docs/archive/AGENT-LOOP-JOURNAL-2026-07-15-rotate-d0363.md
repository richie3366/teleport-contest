# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 02:16 — #369 D-0348 chargen corner splash

- Objective: seed0009 @9 leftover splash under role-ok (hypothesis inverted).
- C locus: `wintty.c` `tty_display_nhwindow` corner → clear WIN_MESSAGE only;
  `erase_menu_or_text` on destroy.
- Change: `paint_corner_nhw_menu` chargen keeps BASE splash; erase prior
  `_tty_menu_geom` (fullscreen clear / corner cl_end) — D-0348.
- Verification: seed0009 Scr **12→13**/73; seed0077 PASS; green+strict;
  cohort 21 PASS.
- Next: seed0009 @13 `Entering the tutorial.--More--`.

