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
## 2026-07-18 18:20 — #749 D-0674 gas-cloud does_block
- Objective: seed0367 @283 C blank vs JS `·` (26 cells).
- C locus: `vision.c` `does_block`; `region.c` `add_region`/`run_regions`;
  `allmain.c` after `nh_timeout`.
- Change: D-0674 — `_blocks`→`visible_region_at`; create/expire
  `recalc_block_point`; `run_regions` ttl. Was fog on LOS (22,13),
  not Algorithm-C. Next D-0675 @297 (23,14) wall.
- Verification: prefix **283→297** Scr **315→314** RNG FULL;
  green+strict PASS; cohort **32**/32.
- Next: @297 map(23,14) C `x` vs JS blank (D-0675).

## ## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-18 18:00 — #748 D-0674 Pri-loca Algorithm-C NW cone
- Objective: seed0367 @283 C blank vs JS `·` (26 cells).
- C locus: `vision.c` `left_side`/`view_from`; `dat/Pri-loca.lua`.
- Change or falsified theory: darkroom/lit/memory **falsified** — JS
  `cansee`+lit+ROOM on all 26; hero (37,19) Pri-loca return; over-mark
  COULD_SEE past temple SW ~31,16. No code change (stop before shim).
- Verification: green+strict PASS; seed0367 Scr 315/324 RNG FULL; DIAG
  removed.
- Next: port/compare C `left_side` NW finger vs JS (D-0674).

## 2026-07-18 17:45 — #747 D-0673 tower1 map lit=FALSE
- Objective: seed0367 @278 C blank vs JS temple wall scraps.
- C locus: `sp_lev.c` `lspo_map` lit default FALSE; `dat/tower1.lua`.
- Change: `load_tower1` clears map-cell `.lit` after apply (D-0673;
  ≡ Pri-loca D-0668). solidfill BOOL_RANDOM lit was kept by
  `sel_set_ter(...,false)` nochange → over-lit vision past nv=1.
- Verification: Scr **312→315**/324 prefix **278→283**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @283 materialize More — C blank vs JS `·` (26 cells).

## 2026-07-18 17:35 — #746 D-0672 moveloop see_monsters Warning/ESP
- Objective: seed0367 @262 Warning/`W` vs warn-digit cell positions.
- C locus: `allmain.c` once-per-input `see_monsters` when
  Unblind_telepat/Warning (`!mv || Blind`).
- Change: `js/allmain.js` call `see_monsters()` after `find_ac`
  (D-0672). Stale gbuf floats were not refreshed on ordinary steps.
- Verification: Scr **308→312**/324 prefix **262→278**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @278 materialize map — C blank vs JS temple wall scraps.

## 2026-07-18 17:25 — #745 public score cadence
- Objective: mandatory full `sessions` score (#745÷5).
- C locus: n/a (score refresh; primary still seed0367 @262 Warning).
- Change or falsified theory: none — docs only. Rotated journal
  #730–#734 → `archive/AGENT-LOOP-JOURNAL-2026-07-18-rotate15.md`.
- Verification: green+strict PASS; suite **34/44**; Scr **7062**/11405;
  RNG **465040**/792838 (58.66%); speed `35+0.17/turn` (R² 0.78).
  Δ vs #740: Scr **+41**, RNG +0, PASS +0 (peels #741–44 absorbed).
- Next: seed0367 @262 Warning/`W` vs warn-digit cell positions.

## 2026-07-18 17:20 — #744 D-0671 intemple canseemon voice
- Objective: seed0367 @258 C `A nearby voice intones` vs JS `The priest`.
- C locus: `priest.c` `intemple` (`canseemon` ? Monnam : nearby voice).
- Change: `js/priest.js` intone subject `canspotmon`→`canseemon`
  (ESP alone must not Monnam; D-0671).
- Verification: Scr **305→308**/324 prefix **258→262**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @262 Warning/`W` vs warn-digit cell positions.

## 2026-07-18 17:11 — #743 D-0670 Pri goal + lava lit + quest_portal pline
- Objective: seed0367 @209 lava `` ` `` / missing materialize More.
- C locus: `quest.lua` Pri goal/nexttime; `questpgr.c` deliver_by_pline;
  `sp_lev.c` light_region; `Pri-goal.lua`.
- Change: Pri goal/nexttime/othertime texts; `load_pri_goal`→
  `light_region` (lava stays lit); `quest_portal` line-at-a-time pline
  (D-0670).
- Verification: Scr **291→305**/324 prefix **209→258**; green+strict;
  cohort **32**/32. RNG FULL.
- Next: @258 intemple `A nearby voice` vs `The priest`.

## 2026-07-17 19:52 — #742 D-0669 tp_sensemon Unblind_telepat
- Objective: seed0367 @203 C W/&/ghost-blank vs JS warn digits.
- C locus: `display.h` `_tp_sensemon`; `worn.c` `recalc_telepat_range`.
- Change: `tp_sensemon` + `newsym` sense path; ESP range via setworn
  (D-0669). Ghost physical glyph is `' '`; mindless zombies stay warn.
- Verification: Scr **267→291**/324 prefix **203→209**; green+strict;
  cohort **32**/32. RNG FULL.
- Next: @209 lava `` ` `` vs JS blank after materialize More.

## 2026-07-17 19:39 — #741 D-0668 Pri-loca map lit=FALSE
- Objective: seed0367 @203 materialize — JS live Z/memory vs C warn/`~`.
- C locus: `dat/Pri-loca.lua`; `sp_lev.c` `lspo_map` lit=FALSE;
  `mkmaze.c` `set_levltyp_lit`.
- Change: `load_pri_loca` clears `SpLev_Map` `.lit` after map (D-0668).
  Global `sel_set_ter(false)`≡C deferred (seed0009 regress).
- Verification: @203 residual **27** cells (C W/& vs JS warn); Scr still
  267/324; green+strict PASS; cohort **33**/34. RNG FULL.
- Next: C physical W/& on dark morgue cells vs JS mon_warning only.

## 2026-07-17 19:28 — #740 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score docs only).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: **34/44** PASS; Scr **7021**/11405 (+62 vs #735);
  RNG **465040**/792838 (58.66%, +0); speed `33+0.16/turn` (R² 0.80);
  green+strict PASS. seed0367 still RNG FULL Scr 267/324 @203.
- Next: seed0367 @203 level-teleport materialize map peel.

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
