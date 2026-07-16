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

## 2026-07-16 20:53 — #618 D-0557 sticky Sokoban clear
- Objective: seed0373 @32011 C next_ident vs JS rn2(4) Sokoban dig-avoid
- C locus: mklev.c clear_level_structures sokoban_rules=0; muse.c rnd_defensive_item
- Change: clear g.Sokoban/lf.sokoban in clear_level_structures; getlev sync;
  rnd_defensive_item uses level sokoban_rules only
- Verification: rng-diff 32011→32419; runner RNG 32421/35386;
  green+strict PASS; cohort 30/30 PASS
- Next: @32419 collect_coords rn2(8) vs JS rn2(12); or dosounds @8468

## 2026-07-16 20:50 — #617 D-0556 salamander m_initweap
- Objective: seed0373 @31895 C `m_initweap` `rn2(7)` vs JS `rn2(75)`
- C locus: makemon.c m_initweap S_LIZARD PM_SALAMANDER (~495–499)
- Change: js/makemon.js salamander spear/trident/stiletto kit
- Verification: rng-diff 31895→32011; runner RNG 32340/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @32011 rnd_defensive_item Sokoban rn2(4) vs next_ident
  (sticky game.Sokoban?); or dosounds @8468

## 2026-07-16 20:46 — #616 D-0555 get_location_coord retry
- Objective: seed0373 @30743 C get_location vs JS next_ident
- C locus: sp_lev.c get_location_coord; create_monster humidity
- Change: js/mklev.js get_location_coord_random (double get_location
  on random miss) used by splev_create_monster
- Verification: rng-diff 30743→31895; runner RNG 31908/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @31895 salamander m_initweap rn2(7); or dosounds @8468

## 2026-07-16 20:39 — #615 formal score refresh
- Objective: mandatory 5-iter full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence; no port peel this iter).
- Change: documented suite aggregates in CURRENT.md Score.
- Verification: green+strict PASS; full sessions **30/44** Scr
  **5901**/11405 RNG **348962**/792838 (44.01%) `31+0.15/turn`
  (R² 0.77). Δ vs #610: Scr 0, RNG +559 (D-0551…D-0554), PASS same.
- Next: seed0373 @30743 get_location vs next_ident; or dosounds @8468.

## 2026-07-16 20:36 — #614 D-0554 newmonhp golemhp
- Objective: seed0373 @30344 C silent stone-golem HP vs JS d(21,8)
- C locus: makemon.c newmonhp is_golem arm; golemhp()
- Change: js/makemon.js golemhp + newmonhp is_golem branch
- Verification: rng-diff 30344→30743; runner RNG 30755/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @30743 get_location vs next_ident; or dosounds @8468

