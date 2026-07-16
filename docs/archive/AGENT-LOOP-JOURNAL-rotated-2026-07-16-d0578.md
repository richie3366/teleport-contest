# Rotated from AGENT-LOOP-JOURNAL.md (#642 D-0578)

## 2026-07-16 22:20 — D-0567 Sokoban premap @78
- Objective: seed0373 @78 Dlvl:6 blank Sokoban walls.
- C locus: `detect.c` `premap_detect`; `sp_lev.c` `solidify_map` /
  `flip_level`→`fix_wall_spines`; `display.c` sokoban `wall_color`.
- Change: `premap_detect` + SpLev_Map solidify + flip spines + Sokoban
  wall CLR_BLUE; traps via `level.traps[]`.
- Verification: seed0373 Scr **88→100**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS; seed0116 still 113/127.
- Next: seed0373 @99 Fire/`an` Amulet; or seed5006 dosounds @8468.

## 2026-07-16 22:04 — #627 D-0566 bigrm light_region + IRONBARS
- Objective: seed0373 @73 Dlvl:12 blank walls / `?` bars.
- C locus: sp_lev.c light_region; display.c IRONBARS; makemon.c
  S_SPIDER/S_SNAKE/S_ELEMENTAL; color.h HI_LORD.
- Change: light_region wall-expand (bigrm-2/8); IRONBARS + raw `|`;
  spider/snake hideunder; stalker minvis; extractor HI_LORD=5.
- Verification: seed0373 Scr **85→88**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0373 @78 Dlvl:6 blank walls; or seed5006 dosounds @8468.

## 2026-07-16 21:52 — #626 D-0565 TREE + eel hideunder
- Objective: seed0373 Bar-strt outdoor glyphs after Home botl.
- C locus: display.c back_to_glyph TREE; makemon.c S_EEL; mon.c hideunder.
- Change: js/display.js TREE `#`/`g` + keep raw DEC `g` in scoring grid;
  js/makemon.js S_EEL in_mklev → mundetected.
- Verification: seed0373 Scr **78→85**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0373 @73 Dlvl:12 blank walls; or seed5006 dosounds @8468.
