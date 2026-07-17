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

## 2026-07-17 13:05 — #696 D-0625 Arc QUEST_FIRSTTIME
- Objective: seed0361 screen peel (RNG full; Scr 306).
- C locus: `dat/quest.lua` Arc `firsttime`; `quest.c` `on_start`.
- Change: add Arc body to `QUEST_FIRSTTIME` (`%H` homebase). Missing
  text caused early return → no `flush_topl_more` → space stolen.
- Verification: Scr **306→309**/366 (147–153 match); green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @154 getpos farlook unexplored vs floor; or Pri-strt.

## 2026-07-17 12:56 — #695 score + D-0624 movemon restrap
- Objective: mandatory full `sessions` (#695÷5); seed0361 @53815 restrap.
- Score: **33/44** Scr **6698**/11405 RNG **416960**/792838 (52.59%)
  `33+0.16/turn`. Δ vs #690: Scr +17, RNG +18589.
- C locus: `mon.c` `movemon_singlemon` → `restrap`.
- Change: wire pre-dochug `restrap` for `is_hider` (body already D-0622).
- Verification: seed0361 RNG **full 53865**/53865 Scr 306; green+strict
  PASS; cohort 31/31 PASS.
- Next: seed0361 screen peel; or Pri-strt / seed0014/0108.

## 2026-07-17 12:55 — #694 D-0623 fog gas cloud + cham shapeshift
- Objective: seed0361 @53773 C create_gas_cloud rn2(3) vs JS mcalcmove.
- C locus: `monmove.c` m_everyturn_effect; `region.c` create_gas_cloud;
  `mon.c` decide_to_shapeshift.
- Change: `js/region.js` create_gas_cloud; fog everyturn before movement
  gate; regular cham decide_to_shapeshift; fumaroles uses real cloud.
- Verification: prefix 53773→53815 Scr 306 RNG 53817/53865; green+strict
  PASS; cohort 33/33 PASS.
- Next: seed0361 @53815 movemon restrap rn2(3); or Pri-strt.

## 2026-07-17 12:45 — #693 D-0622 hide_monst → restrap
- Objective: seed0361 @53705 C restrap rn2(3) vs JS getlev rnd(10).
- C locus: `mon.c` `hide_monst` / `restrap` / `hideunder`; `restore.c` getlev.
- Change: `js/mon.js` restrap + hide_monst viz override + mimic retry +
  hideunder. movemon restrap call site still deferred.
- Verification: prefix 53705→53773 Scr 306 RNG 53807/53865; green+strict
  PASS; cohort 33/33 PASS.
- Next: seed0361 @53773 create_gas_cloud rn2(3); or Pri-strt.

## 2026-07-17 12:41 — #692 D-0621 bigrm-7 load_special
- Objective: seed0361 @46893 C nhl shuffle after makemaz rnd(13)=7.
- C locus: `dat/bigrm-7.lua`; `mkmaze.c` `makemaz`; `sp_lev.c` load_special.
- Change: `load_bigrm_7` + dispatch (map, L→{L,T,{,.} replace, lit,
  stairs, nondig, 15/6/28 fill, wallify+flip+fixup).
- Verification: prefix **46893→53705** Scr **296** RNG **53734**/53865;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @53705 `restrap` vs getlev; or Pri-strt.

## 2026-07-17 12:40 — #691 D-0620 on_goal goal_first
- Objective: seed0361 @42649 C nhl shuffle after Arc-goal place_lregion.
- C locus: `quest.c` `on_goal`/`onquest`; `questpgr.c` `qt_pager`;
  `dat/quest.lua` Arc `goal_first`.
- Change: port `on_goal` (goal_first/next/alt + find_quest_artifact);
  Arc/Bar goal texts + `%o`/`%n`; Arc/Bar `questarti`.
- Verification: prefix **42649→46893** Scr **289→296** RNG **46893**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @46893 `bigrm-7` load_special; or Pri-strt.

## 2026-07-17 12:30 — #690 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **33/44** Scr **6681**/11405
  RNG **398371**/792838 (50.25%) speed `38+0.16/turn` (R² 0.797).
  Δ vs #685: Scr +18, RNG +19387, PASS unchanged.
- Next: seed0361 @42649 identify protofile (nhl shuffle vs rn2(79));
  or Pri-strt / leaderboard cron.

## 2026-07-17 12:28 — #689 D-0619 Arc-goal load_special
- Objective: seed0361 @34204 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Arc-goal.lua`; `makemon.c` MS_NEMESIS mitem/gender;
  `sp_lev.c` create_object/oname Orb.
- Change: port `load_arc_goal` (14× object / temple / Orb / Minion);
  `nemgend` + `BELL_OF_OPENING` (neminum gate); fill_special TEMPLE flags.
- Verification: prefix **34204→42649** Scr **289**/366 RNG **42658**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @42649 nhl shuffle vs rn2(79); or Pri-strt.

## 2026-07-17 12:18 — #688 D-0618 Arc-fila/filb load_special
- Objective: seed0361 @31644 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Arc-filb.lua` / `Arc-fila.lua`; `sp_lev.c` lspo_room /
  get_location_coord; `mklev.c` In_quest fil{a,b}.
- Change: port `load_arc_fila`/`load_arc_filb` ordinary des.room +
  croom `get_location_coord_in_room` (WET double-retry before DRY).
- Verification: prefix **31644→34204** Scr **289**/366 RNG **34219**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @34204 Arc-goal nhl shuffle vs rn2(79); or Pri-strt.

## 2026-07-17 12:05 — #687 D-0617 tower1 candle get_location_coord
- Objective: seed0361 @23223 C `get_location` rn2(15) vs JS `rnd(2)`.
- C locus: `sp_lev.c` `create_object`/`get_location_coord`; `tower1.lua` chest contents.
- Change: `load_tower1` wax/tallow candles use `get_location_coord_random(DRY)`
  instead of raw `rn2(sx/sy)` before `mksobj_at`.
- Verification: prefix **23223→31644** Scr **289**/366; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @31644 nhlib shuffle rn2(3) vs JS rn2(79); or Pri-strt.

## 2026-07-17 12:05 — #686 D-0616 qt_pager pline vs NHW_TEXT
- Objective: seed0361 @23016 Home movemon vs ^V→Dlvl:37 getbones.
- C locus: `questpgr.c` deliver_by_pline; `quest.lua` Arc nexttime default output.
- Change: `qt_pager` uses pline when no newline (C default); window if `\n`/long.
  NHW_TEXT had stolen `e` → `s` search turn → distfleeck before getbones.
- Verification: prefix **23016→23223** Scr **271→289**; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @23223 tower1 `get_location` rn2(15) vs `rnd(2)`; or Pri-strt.

## 2026-07-17 11:55 — #685 score + D-0615 diagnose @23016
- Objective: mandatory ÷5 full `sessions` score; seed0361 @23016 peel.
- Score: **33/44** Scr **6663**/11405 RNG **378984**/792838 (47.80%)
  `33+0.16/turn` R² 0.783. Δ#680: Scr +47 RNG +1115 PASS same.
- C locus: `bones.c` getbones; `teleport.c` level_tele; JS `distfleeck`.
- Change: none in `js/`. Falsified Medusa/`rn2(5)` getbones theory —
  C is `^V`→Dlvl:37 getbones; JS Home movemon after re-entry.
- Verification: green+strict PASS; full suite recorded in CURRENT.
- Next: post-Home turn/`--More--`/menu before second levelport; or Pri-strt.

## 2026-07-17 11:49 — #684 D-0614 on_start nexttime/othertime
- Objective: seed0361 @23015 C nhlib `shuffle` `rn2(2)` vs JS `rnd(13)`.
- C locus: `quest.c` `on_start`; `questpgr`/`nhl_init`; Arc nexttime.
- Change: port Home re-entry nexttime/othertime → `qt_pager` nhl shuffle.
  Matched rn2(3) was coincidental getbones, not partial shuffle.
- Verification: prefix **23015→23016** Scr **268→271** RNG **23269**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @23016 getbones vs `rn2(5)` (Dlvl:37 special); or Pri-strt.

## 2026-07-17 11:44 — #683 D-0613 artifact_hit / spec_dbon
- Objective: seed0361 @22362 C `rn2(6)` @ `xkilled` vs JS `rn2(3)`.
- C locus: `artifact.c` `spec_dbon`/`artifact_hit`; `uhitm.c` weapon melee.
- Change: port `spec_dbon`+`artifact_hit`; wire after `dmgval` in `hmon`.
  Symptom was knockback (`rn2(3)`+`rn2(6)`), not xkilled — Grayswandir
  `max(tmp,1)` double was missing so mon survived.
- Verification: prefix **22362→23015** Scr **225→268** RNG **24011**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @23015 nhlib shuffle vs `rnd(13)`; or Pri-strt.

## 2026-07-17 11:40 — #682 D-0612 mfndpos diagonal squeeze
- Objective: seed0361 @22140 C `rn2(12)` @ `m_move` vs JS `rn2(16)`.
- C locus: `mon.c` `mfndpos`; `hack.c` `bad_rock`/`cant_squeeze_thru`.
- Change: port diagonal squeeze gate — giant spider cnt 4→3.
- Verification: prefix **22140→22362** Scr **225** RNG **22664**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @22362 `xkilled` rn2(6) vs rn2(3); or Pri-strt.

