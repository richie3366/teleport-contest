# Rotated journal crumbs

## 2026-07-19 23:39 — #923 D-0802 lit grow minetn/minend
- Objective: seed0360 @180 leave-Gehennom blank BROWN walls.
- C locus: `sp_lev.c` `lspo_region` 2-arg `selection_do_grow` + lit.
- Change: `load_minetn_5`/`load_minend_2` use `light_region` (wall
  expand when lit). Named: castle/other interior lit; minetn-1/3/4/6/7.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **589→616**/833; prefix **180→231**; RNG FULL.
- Next: @231 boulder push message divergence.
## 2026-07-19 23:26 — #922 D-0801 Valley/smoke/Geh wall
- Objective: seed0360 screen residual @164 missing `--More--`.
- C locus: `do.c` goto_level Valley + hellish_smoke_mesg; `display.h`
  cmap_walls_to_glyph / wall_color(gehennom_walls).
- Change: Valley arrival plines + gehennom_entered; smell/sense smoke;
  heat/smoke gone; wall_glyph CLR_RED in hellish. Named: ACH_HELL; knox.
- Verification: green+strict PASS; cohort 34/34 PASS; seed0360 Scr
  **561→589**/833; prefix **164→180**; RNG FULL.
- Next: @180 leave-Gehennom remembered walls (map memory).
