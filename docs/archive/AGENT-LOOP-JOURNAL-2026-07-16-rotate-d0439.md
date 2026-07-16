# Rotated journal crumbs (#470 / D-0439)

## 2026-07-16 00:42 — #456 seed0004 @312 wall describe_looked (D-0425)
- Objective: seed0004 @312 `/` whatis `describe_looked` wall.
- C locus: `pager.c` `is_swallow_sym` + `do_screen_description` cmap
  walls; DECgraphics `S_vwall`/`S_sw_ml` share `\xf8`.
- Change: `describe_wall_looked` + swallow mid envelope; Unicode │
  prefix (JS topline lacks decgfx); export `terrain_glyph`.
- Verification: seed0004 Scr **396→397**/409; @312 fixed; RNG full;
  green+strict; cohort **23/23**.
- Next: seed0004 @330 invent `(1 of 2)` footer.

## 2026-07-16 00:31 — #455 score + D-0424 trap lookat
- Objective: mandatory full `sessions` score (#455÷5); primary seed0004 @310 dart trap `brief_at`.
- C locus: `pager.c` `lookat` `glyph_is_trap` → `trap_description`/`trapname`.
- Change: export full `trapname`; wire tseen trap into `brief_at` / `describe_looked` / `auto_describe_text` (D-0424).
- Verification: full suite **25/44** Scr **4350**/11405 RNG **263166**/792838; seed0004 **396**/409; green+strict; cohort 25/25.
- Next: seed0004 @312 wall `describe_looked` ambiguous cmap.

