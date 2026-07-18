# Rotated from AGENT-LOOP-JOURNAL (#751 handoff)

## 2026-07-17 19:25 — #739 seed0367 @185 altar_color + see_monsters
- Objective: seed0367 @185 C altar `{` CLR_RED vs JS NO_COLOR; residual warn `1`.
- C locus: `display.c` `altar_to_glyph`/`altar_color`; `teleport.c` `teleds`→`see_monsters`.
- Change: D-0666 `altar_glyph_color`; D-0667 `see_monsters` in teleds/docrt.
- Verification: Scr **245→267**/324 prefix **185→203** RNG FULL; green+strict;
  cohort **32**/32. Suite score still #735 until #740.
- Next: @203 level-teleport materialize map (JS memory vs C blank).

## 2026-07-17 19:15 — #738 seed0367 @155 TREE lookat
- Objective: seed0367 getpos farlook @155 C `tree` vs JS `unexplored area`.
- C locus: `pager.c` `lookat` cmap default → `defsyms[S_tree].explanation`;
  `getpos.c` `auto_describe`.
- Change: `cmap_defsym_explanation` / pager lookat TREE → `"tree"`
  (D-0665). Falsified blank-disp_ch/Warning theory — cell had DEC `g`.
- Verification: seed0367 Scr **244→245**/324 prefix **155→185**,
  RNG FULL; green+strict PASS; cohort **34**/34.
- Next: @185 altar DEC `{` color1+decgfx vs JS NO_COLOR.

## 2026-07-17 19:10 — #737 seed0367 @154 self_lookat gender
- Objective: seed0367 farlook @154 priestess vs priest.
- C locus: `pager.c` `self_lookat`; `you.h` `Ugender`;
  `do_name.c`/`mondata.h` `pmname`.
- Change: D-0664 — export `pmname`/`Ugender`; pager+getpos
  self_lookat use `pmname(umonnum,Ugender)` (!Upolyd race adj).
- Verification: seed0367 Scr **243→244**/324 prefix **154→155**,
  RNG FULL; green+strict PASS; cohort **34**/34 PASS.
- Next: @155 C `tree` vs JS `unexplored area` (disp_ch/TREE memory).

## 2026-07-17 19:05 — #736 seed0367 @148 Pri firsttime + Warning
- Objective: seed0367 screen peel @148 materialize More / quest on_start.
- C locus: `dat/quest.lua` Pri `firsttime`; `display.h` `_mon_warning`;
  `display.c` `display_warning`; `allmain.c` `warnlevel=1`.
- Change: D-0662 Pri `QUEST_FIRSTTIME`; D-0663 `mon_warning`/
  `display_warning` + `context.warnlevel=1` in `newsym`.
- Verification: seed0367 Scr **205→243**/324 prefix **148→154**,
  RNG FULL; green+strict PASS; cohort **32/32** PASS.
- Next: @154 farlook `priestess` vs `priest`; @155 `tree` vs
  `unexplored area`.
