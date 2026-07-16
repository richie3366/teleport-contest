# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-16 23:15 — #638 confused level_tele (D-0575)
- Objective: seed5006 level_tele rnl(5) @8473.
- C locus: read.c seffect_teleportation; teleport.c level_tele /
  random_teleport_level; dungeon.c single_level_branch.
- Change: cursed/confused scroll → level_tele; port
  random_teleport_level; Confusion/`*`/involuntary use it.
- Verification: seed5006 8473→10953 Scr 154→174; green+strict PASS;
  cohort 29/29 PASS.
- Next: seed5006 can_make_bones rn2(1) @10953; or seed0116 residual.

## 2026-07-16 23:10 — #637 setworn oc_oprop (D-0574)
- Objective: seed5006 dosounds @8468 (C rn2(400) vs JS rn2(100)).
- C locus: worn.c setworn oc_oprop; youprop.h Regeneration; allmain
  U_CAN_REGEN/regen_hp.
- Change: extract oc_oprop; setworn/takeoff extrinsic; u_can_regen
  reads uprops[REGENERATION]. Symptom was missing Regeneration after
  wishing clay ring, not dosounds.
- Verification: seed5006 8468→8473 Scr 121→154; green+strict PASS;
  cohort PASS held.
- Next: seed5006 level_tele rnl(5) @8473; or seed0116 residual.

## 2026-07-16 23:03 — #636 wizard ^X Attributes (D-0573)
- Objective: seed0373 @119 Attributes / wizard MAGICENLIGHTENMENT.
- C locus: insight.c doattributes/attributes_enlightenment/status;
  attrib.c from_what/is_innate; hack.c weight_cap Is_airlevel→MAX.
- Change: invent.js wizard|discover MAGIC + status `<%d>` + Attributes
  subset + Air weight_cap MAX; attrib.js from_what/is_innate.
- Verification: seed0373 Scr 123→124/124 **PASS**; green+strict PASS;
  cohort 28/28 PASS.
- Next: seed5006 dosounds @8468; or seed0116 residual 114/127.

## 2026-07-16 22:57 — #635 formal score refresh
- Objective: mandatory #635 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6401**/11405, RNG **353648**/792838 (44.61%), `31+0.15/turn`
  (R² 0.772). Δ vs #630: Scr +23, RNG 0 (D-0569…D-0572), PASS same;
  seed0116 113→114.
- Next: seed0373 @119 Attributes; or seed5006 dosounds @8468.

## 2026-07-16 22:55 — D-0572 pluslvl uexp + endgame ^X Background
- Objective: seed0373 @118 enlightenment Background (CURRENT primary).
- C locus: insight.c background_enlightenment In_endgame/moves==1/
  wizard xp delta; dungeon.c endgamelevelname; exper.c pluslvl uexp.
- Change: js/exper.js pluslvl sets uexp; js/invent.js
  background_dungeon_clause + adventure/wizard xp; export
  endgamelevelname from display.js.
- Verification: seed0373 Scr 122→123 RNG full; @118 match; green+
  strict; cohort 28/28 PASS.
- Next: @119 Attributes (wizard MAGICENLIGHTENMENT); or seed5006
  dosounds @8468.

## 2026-07-16 20:49 — D-0571 air_pos S_cloud glyph
- Objective: seed0373 @110 Air gravity map clouds (CURRENT primary).
- C locus: mkmaze.c movebubbles air_pos / setup_waterlevel S_air;
  display.c back_to_glyph AIR/CLOUD; docrt lev->glyph.
- Change: js/mklev.js air_pos remembered_glyph + setup memory;
  js/display.js terrain_glyph AIR/CLOUD.
- Verification: seed0373 Scr 111→122 RNG full; @110 match; green+
  strict; cohort 28/28 PASS.
- Next: @118 enlightenment Background; or seed5006 dosounds @8468.

## 2026-07-16 22:44 — D-0570 mon_pmname / M2_PNAME article
- Objective: seed0373 @101 Wizard appear capitalization (CURRENT primary).
- C locus: do_name.c mon_pmname/pmname/x_monnam name_at_start; mondata.h
  type_is_pname; wizard.c resurrect Norep(Monnam).
- Change: js/do_name.js mon_pmname from pmnames + M2_PNAME article skip.
- Verification: seed0373 Scr 110→111 RNG full; @101 match; green+strict;
  cohort 30/30 PASS.
- Next: @110 Air gravity map clouds; or seed5006 dosounds @8468.

## 2026-07-16 22:40 — D-0569 Fire lit + monster lights
- Objective: seed0373 @100 Fire vision (CURRENT primary).
- C locus: sp_lev.c set_levltyp_lit; light.c do_light_sources; makemon emits_light.
- Change: load_fire SpLev_Map lit epilogue; js/light.js + vision TEMP_LIT;
  makemon/goto_level hooks. Global sel_set_ter force-unlit falsified (seed0009).
- Verification: seed0373 Scr 101→110 RNG full; green+strict PASS; cohort 28/28.
- Next: @101 Wizard Monnam capitalization; or seed5006 dosounds @8468.

## 2026-07-16 22:28 — #630 formal score refresh
- Objective: mandatory #630 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6378**/11405, RNG **353648**/792838 (44.61%), `31+0.15/turn`
  (R² 0.76). Δ vs #625: Scr +23, RNG 0 (D-0565…D-0568), PASS same.
- Next: seed0373 @100 Fire vision; or seed5006 dosounds @8468.

## 2026-07-16 22:26 — D-0568 the_unique_obj + print_dungeon bot
- Objective: seed0373 @99 `an` vs `the` Amulet + blank botl under More.
- C locus: `objnam.c` `the_unique_obj`/`doname_base`; `wintty.c` bot after
  fullscreen menu; `dungeon.c` `print_dungeon`.
- Change: `doname` `"the "` for unique/pname; Amulet uncursed skip;
  `print_dungeon` `await bot()` after menu (keep Options clear_committed).
- Verification: seed0373 Scr **100→101**/124 RNG full; green+strict PASS;
  cohort **30**/30 PASS; seed0116 still 113/127.
- Next: seed0373 @100 Fire vision; or seed5006 dosounds @8468.

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

## 2026-07-16 21:50 — #625 formal score refresh
- Objective: mandatory #625 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6355**/11405, RNG **353648**/792838 (44.61%), `31+0.14/turn`
  (R² 0.77). Δ vs #620: Scr +454, RNG +2962 (D-0560…D-0564).
- Next: seed0373 Bar-strt outdoor `~` glyphs; or seed5006 dosounds @8468.

## 2026-07-16 21:48 — #624 D-0564 describe_level Home
- Objective: seed0373 @screen 43 botl `Home 1` vs `Dlvl:16`.
- C locus: botl.c describe_level; dungeon.c endgamelevelname.
- Change: js/display.js describe_level (Knox/quest/endgame/Dlvl) +
  endgamelevelname; _statusLine2 uses describe_level(1).
- Verification: seed0373 Scr **65→78**/124 RNG full; green+strict
  PASS; cohort **28**/28 PASS.
- Next: Bar-strt outdoor `~` glyphs; or seed5006 dosounds @8468.
