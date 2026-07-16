# Rotated journal entries

## 2026-07-16 16:58 — #576 D-0518 print_dungeon(TRUE)
- Objective: shared `^V?` getbones blocker (seed0116 @6373 / seed0373 @2549).
- C locus: `dungeon.c` `print_dungeon`/`tport_menu`/`print_branch`;
  `teleport.c` `level_tele` levTport_menu force_dest.
- Change: bymenu PICK_ONE menu + `?`/menu_requested → force_dest
  `schedule_goto`; export `select_menu_pick_one`.
- Verification: seed0116 **6373→6383** (getbones+); seed0373
  **2549→2550**; Scr unchanged; green+strict; cohort **30/30**.
  seed5006 still @8468.
- Next: quest/`makemaz` special (0373/0116) or seed5006 `dosounds`.
