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

## 2026-07-16 21:40 — #622 D-0562 botl rank_of titles
- Objective: seed0373 Scr 23/124 residual after D-0561 RNG full.
- C locus: botl.c xlev_to_rank/rank_of; role.c roles[].rank[9].
- Change: full title[9]; rank_of in botl/insight/questpgr; u_init
  stores urole.title (was sticky title[0] → Plunderer at Xp:3).
- Verification: seed0373 Scr **23→47**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0373 @41 print_dungeon menu; or seed5006 dosounds @8468.

## 2026-07-16 21:35 — #621 D-0560/61 endgame ^V-2 → air RNG full
- Objective: seed0373 @32479 getbones after `^V-2` from Fire plane.
- C locus: teleport.c In_endgame level_tele; dat/air.lua; mkmaze.c
  setup_waterlevel/movebubbles/mv_bubble; do.c deliver_splev_message.
- Change: endgame negative dest; load_air; monclass D/E/J map;
  bubbles+movebubbles boing; splev arrival msgs.
- Verification: seed0373 RNG **OK 35386**/35386 Scr 23/124; green+strict
  PASS; cohort **28**/28 PASS.
- Next: seed0373 screen residual; or seed5006 dosounds @8468.

## 2026-07-16 21:20 — #620 score + D-0559 Amulet wish
- Objective: mandatory full score (#620÷5); seed0373 @32473 makewish.
- C locus: allmain amulet_wish; objnam readobjnam any; makemon appear;
  do temperature_change_msg; zap makewish.
- Change: amulet_wish→makewish; empty/null→wrpsym rn2+mkobj; Wizard
  appear Norep; hellish hot pline. (Empty-wish≠cancel.)
- Verification: seed0373 32473→32479; green+strict PASS; #620 full
  **30/44** Scr 5901 RNG 350686 (44.23%) `31+0.14/turn`.
- Next: seed0373 getbones @32479 (`^V-2`); or seed5006 dosounds @8468.

## 2026-07-16 21:06 — #619 D-0558 endgame resurrect Wizard
- Objective: seed0373 @32419 C collect_coords rn2(8) vs JS rn2(12)
- C locus: do.c goto_level In_endgame+newdungeon+amulet→resurrect;
  wizard.c resurrect; makemon.c adj_lev/iswiz
- Change: js/wizard.js resurrect; do.js call; makemon Wizard adj_lev+iswiz
- Verification: rng-diff 32419→32473; runner RNG 32473/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @32473 makewish/readobjnam (ESC); or dosounds @8468
