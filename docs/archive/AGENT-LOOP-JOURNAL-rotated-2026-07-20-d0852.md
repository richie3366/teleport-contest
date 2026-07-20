# Agent loop journal archive

## 2026-07-20 09:57 — #976 map_object Hallu statue memory (D-0844)
- Objective: seed0383 @172 post-expel Hallu display-RNG before flush.
- C locus: display.c map_object Hallu+STATUE memory random_obj_to_glyph.
- Change: `map_object` — statue display vs memory burns; diagnosed @172
  as −1 display burn before once-per-input Hallu see_* (mons align with
  +1 dummy; 4 objs remain). Statue fix does not move Scr 176.
- Verification: seed0383 Scr 176 RNG FULL; green+strict PASS; cohort 6/6.
- Next: missing burn in post-expel docrt/mnexto/postmov; then 4 objs; flush.

