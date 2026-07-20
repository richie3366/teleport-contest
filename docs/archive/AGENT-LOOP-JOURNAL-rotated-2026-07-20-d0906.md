# Rotated journal entries

## 2026-07-20 20:32 — #1041 D-0890 launch_obj FLASH + pline vision
- Objective: seed0014 @560 trap-trigger map (boulder + LOS).
- C locus: `trap.c` `launch_obj` tmp_at DISP_FLASH; `pline.c` dirty
  `vision_recalc` before flush.
- Change: FLASH roll loop + delaycnt=2; pline runs vision_recalc when
  `vision_full_recalc` (boulder extract unblock).
- Verification: green+strict PASS; cohort 6/6; seed0014 Scr **644→645**.
- Next: @600 JS `·` vs C `^` trap glyph (68,16).

