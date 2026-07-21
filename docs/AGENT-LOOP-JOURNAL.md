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
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 17:27 — #1187 getpos redraw_cmd ^R

- Objective: seed4500 @1689 C getpos goal msg vs JS Unknown `^R`.
- C locus: `getpos.c` HELP/`redraw_cmd` → `getpos_refresh` +
  `show_goal_msg`; `cmd.c` `redraw_cmd` → doredraw (C('r')).
- Change: `getpos.js` `redraw_cmd` + `getpos_refresh` (`flush_screen`)
  on `?`/`^R`; no full Blind `docrt`.
- Verification: green+strict PASS; cohort 4/4; Scr **1793→1794**;
  first miss **@1689→@1691**.
- Next: @1691 farlook `stone` vs `corridor` (auto_describe/lastseentyp).

## 2026-07-21 17:25 — #1186 doapply nohands + invent Blind

- Objective: seed4500 @1679 tools-current-form; then @1681 invent
  typed ring/wand under Blind mold.
- C locus: `apply.c` `doapply` nohands+`check_capacity` before getobj;
  `invent.c` sortloot_item `!Blind` observe (prop Blind).
- Change: `apply.js` gates; `invent.js` `invent_lines`/
  `display_pickinv_reply` use `Blind()` not sticky `u.Blind`.
- Verification: green+strict PASS; cohort 6/6; Scr **1784→1793**;
  first miss **@1679→@1689**.
- Next: @1689 getpos vs JS `Unknown direction: '^R'`.

## 2026-07-21 17:17 — #1185 doeat check_capacity + score

- Objective: cadence full `sessions` @#1185; seed4500 @1674 carry vs eat.
- C locus: `eat.c` `doeat` → `hack.c` `check_capacity` after `floorfood`,
  before `is_edible`.
- Change: `eat.js` `doeat` EXT_ENCUMBER gate + You_cant carry message
  (D-0928 #1185). Score refresh **42**/44 Scr **11374**/11405 RNG 100%.
- Verification: green+strict PASS; seed1800 PASS; focused Scr
  **1783→1784**; first miss **@1674→@1679**.
- Next: @**1679** `doapply` `nohands` before getobj (tools current form).

## 2026-07-21 17:15 — #1184 dosearch0 Blind feel_location

- Objective: seed4500 @1658 C `/` vs JS `#` (misread as open door).
- C locus: `detect.c` `dosearch0` — Blind/`visible_region_at` →
  `feel_location`; SDOOR/SCORR feel; `unmap_invisible`.
- Change: `detect.js` prop Blind + feel arms (D-0928 #1184); felt
  `WAN_OPENING` at (25,9).
- Verification: green+strict PASS; cohort 9/9; Scr **1732→1783**;
  first miss **@1658→@1674**.
- Next: @**1674** C carry-so-much-stuff vs JS eat-that.
## 2026-07-21 17:04 — #1183 wizwhere NHW_MENU dmore

- Objective: seed4500 @1650 C ` --More--` (col9) vs JS `--More--`.
- C locus: `dungeon.c` `print_dungeon` `NHW_MENU` putstr;
  `wintty.c` `dmore` offset 2 (not NHW_TEXT offset 1).
- Change: `dungeon.js` `print_dungeon(FALSE)` → `show_nhw_menu_text`
  (D-0928 #1183).
- Verification: green+strict PASS; cohort 7/7; Scr **1724→1732**;
  first miss **@1650→@1658**.
- Next: @**1658** map open-door `/` vs wall `#`.
## 2026-07-21 17:01 — #1182 dopay Blind canspotmon You_cant

- Objective: seed4500 @1625 C `You can't see...` vs JS Kabalebo pay.
- C locus: `shk.c` `dopay` — `canspotmon` seensk; Blind/`Blind_telepat`;
  `You_cant("see...")`.
- Change: `shk.js` `dopay` real `canspotmon` + Blind gates + see arm
  (D-0928 #1182).
- Verification: green+strict PASS; cohort 7/7; Scr **1723→1724**;
  first miss **@1625→@1650**.
- Next: @**1650** `#wizwhere` ` --More--` vs `--More--`.
## 2026-07-21 16:55 — #1181 show_achievements + record

- Objective: seed4500 @1573 Voluntary challenges More r11 vs C r20.
- C locus: `insight.c` `show_achievements`/`record_achievement`;
  `exper.c` `pluslvl` ranks; `do.c` ACH_HELL/MINE/SOKO;
  `hack.c` ACH_TOWN.
- Change: real `uachieved` + wizard `#conduct` Achievements block;
  wire rank/hell/mines/town (+SHOP/TMPL imports) (D-0928 #1181).
- Verification: green+strict PASS; cohort 6/6; Scr **1722→1723**;
  first miss **@1573→@1625**.
- Next: @**1625** C `You can't see...` vs JS Kabalebo pay.
## 2026-07-21 16:50 — #1180 score + prop Blind doname

- Objective: cadence full `sessions` @#1180; seed4500 @1501 wish
  `a ring` vs `engagement ring` (Blind mold).
- C locus: `objnam.c` `xname_flags`/`doname` `!Blind`→`observe_object`;
  `youprop.h` Blind ≡ props (not sticky `u.Blind`).
- Change: `objnam.js` prop Blind for `xname`/`doname` observe
  (D-0928 #1180). Suite score: **42**/44 Scr **11312**/11405 RNG
  **100%** speed `30+0.25/turn`.
- Verification: green+strict PASS; cohort 6/6; Scr **1720→1722**;
  first miss **@1501→@1573**.
- Next: @**1573** Voluntary challenges leftover `--More--`.
## 2026-07-21 16:45 — #1179 timebot / time_botl

- Objective: seed4500 @1464 footsteps More botl C T:231 vs JS T:229.
- C locus: `allmain.c` `disp.time_botl` on `moves++`; `botl.c`
  `timebot`; `display.c` `flush_screen`→`timebot`.
- Change: `allmain.js` set `time_botl`; `display.js` `timebot()`
  (tty→`bot`) from flush (D-0928 #1179).
- Verification: green+strict PASS; cohort 6/6; Scr **1716→1720**;
  prefix **@1464→@1501**.
- Next: @**1501** wish `r - a ring.` vs `r - an engagement ring.`
## 2026-07-21 16:37 — #1178 polymon vision_full_recalc

- Objective: seed4500 @1441 map C DEC `~` vs JS floating-eye `e`.
- C locus: `polyself.c` `polymon` `gv.vision_full_recalc=1` before
  `see_monsters` (FROMFORM Blind).
- Change: `polyself.js` `polymon` set `vision_full_recalc` (D-0928
  #1178).
- Verification: green+strict PASS; cohort 6/6; Scr **1586→1716**;
  prefix **@1441→@1464**.
- Next: @**1464** botl T:**229** vs C T:**231**.
## 2026-07-21 16:28 — #1177 float_vs_flight + dropz encumber

- Objective: seed4500 @1438 poly More botl Knight vs C Brown Mold;
  @1439 gloves vs load More.
- C locus: `polyself.c` `set_uasmon`→`float_vs_flight` botl;
  `do.c` `dropz`→`encumber_msg` mid-`break_armor`.
- Change: `polyself.js` `float_vs_flight`; `do.js` await
  `encumber_msg` in `dropz` (D-0928 #1177).
- Verification: green+strict PASS; cohort 6/6; Scr **1583→1586**;
  prefix **@1438→@1441**.
- Next: @**1441** map C DEC `~` vs JS `e`.
## 2026-07-21 16:20 — #1176 getpos SHOWVALID `$`

- Objective: seed4500 @1347 getpos `$` Unknown direction vs C stay.
- C locus: `getpos.c` `NHKF_GETPOS_SHOWVALID`; `cmd.c` bind `'$'`.
- Change: `getpos.js` SHOWVALID before matching + hilite toggle
  stub; NOTES `feature_match_tags`/`S_goodpos` theory rejected
  (D-0928 #1176).
- Verification: green+strict PASS; cohort 6/6; Scr **1580→1583**;
  prefix **@1347→@1438**.
- Next: @**1438** poly More botl C `Brown Mold` vs JS `Knight`.
## 2026-07-21 16:15 — #1175 untrap getdir + score cadence

- Objective: cadence full `sessions` @#1175; seed4500 @1344 `#untrap`
  blank vs C `In what direction?`.
- C locus: `trap.c` `dountrap`→`untrap`→`getdir((char*)0)`.
- Change: `trap.js` `untrap` usual getdir + `dountrap` wiring;
  floor/box/door disarm deferred (D-0928 #1175).
- Verification: green+strict PASS; cohort 3/3; Scr **1579→1580**;
  prefix **@1344→@1347**. Full suite **42**/44 Scr **11170**/11405
  RNG **100%** speed `30+0.26/turn`.
- Next: @**1347** getpos `$` → `S_goodpos` `feature_match_tags`.
## 2026-07-21 16:09 — #1174 getpos cmap furniture fountain

- Objective: seed4500 @1322 getpos C `fountain` vs JS `unexplored area`.
- C locus: `pager.c` `lookat` cmap default → `defsyms[S_fountain].explanation`.
- Change: `getpos.js` `cmap_defsym_explanation` fountain/sink/opulent
  throne/grave/iron bars; S_altar align/high deferred (D-0928 #1174).
- Verification: green+strict PASS; cohort 6/6; Scr **1576→1579**;
  prefix **@1322→@1344**.
- Next: @**1344** `#untrap` C `In what direction?` vs JS blank
  (`dountrap` omits `untrap`→`getdir`).
## 2026-07-21 16:05 — #1173 sanctum lspo_map lit=FALSE clear

- Objective: seed4500 @1291 look_here map C blank/3×3 vs JS walls.
- C locus: `sp_lev.c` `lspo_map` default lit=FALSE → `set_levltyp_lit`;
  `dat/sanctum.lua` solidfill then map.
- Change: `load_sanctum` clears SpLev_Map lit after map (lava stays);
  global `sel_set_ter(false)`→unlit deferred (tut-1) (D-0928 #1173).
- Verification: green+strict PASS; seed0009 PASS; cohort 14/14;
  Scr **1529→1576**; prefix **@1291→@1322**.
- Next: @**1322** getpos `fountain` vs JS `unexplored area`.
