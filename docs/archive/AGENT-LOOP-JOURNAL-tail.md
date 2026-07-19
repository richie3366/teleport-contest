## 2026-07-17 11:10 — #677 D-0607 minend-1 load_special
- Objective: seed0361 @21119 C nhlib shuffle after makemaz vs JS place_lregion.
- C locus: `dat/minend-1.lua`; `mkmaze.c` `makemaz`; `sp_lev.c` load_special.
- Change: `load_minend_1` + `load_special_proto` dispatch (map, niches,
  mimics, mines_prize luckstone, random fill, wallify/flip/fixup).
- Verification: prefix **21119→21310** Scr **222** RNG **21466**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21310 mkobj GEM `oclass_prob_totals` 1000 vs 1002.


## 2026-07-16 20:35 — #613 D-0553 m_initinv S_GIANT
- Objective: seed0373 @30308 S_GIANT invent vs trailing rn2(50)
- C locus: makemon.c m_initinv case S_GIANT; mondata.h is_giant
- Change: JS S_GIANT minotaur WAN_DIGGING + is_giant gem loop; M2_GIANT
- Verification: rng-diff 30308→30344; RNG 30351/35386; green+strict;
  cohort 30/30 PASS
- Next: @30344 golemhp (stone golem silent newmonhp) vs d(21,8)

## 2026-07-16 20:29 — #612 D-0552 splev pm_to_humidity
- Objective: peel seed0373 @30263 C `next_ident` vs JS `get_location`.
- C locus: `sp_lev.c` `pm_to_humidity` / `is_ok_location` /
  `create_monster` humidity.
- Change: `js/mklev.js` humidity-aware placement; `js/monsters.js`
  `likes_lava`/`likes_fire`/`is_swimmer`/`amphibious`.
- Verification: rng-diff **30263→30308**; runner RNG **30336**/35386;
  green+strict PASS; cohort **28**/28 PASS.
- Next: @30308 C `m_initinv` S_GIANT gem `rn2(m_lev/2)`; or dosounds.

## 2026-07-16 20:22 — #611 D-0551 newmonhp adult dragon endgame
- Objective: peel seed0373 @30209 C female `rn2(2)` vs JS `d(22,8)`.
- C locus: `makemon.c` `newmonhp` adult-dragon `In_endgame` arm.
- Change: `js/makemon.js` — adult `S_DRAGON`/`PM_GRAY_DRAGON+` HP is
  `8*m_lev` in endgame (no RNG), else `4*m_lev+d(m_lev,4)`.
- Verification: rng-diff **30209→30263**; runner RNG **30272**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @30263 C `next_ident` vs JS `get_location`; or dosounds @8468.

## 2026-07-17 00:50 — #651 D-0584 wear/puton empty `[*]`
- Objective: seed0116 Scr 115/127 (CURRENT primary).
- C locus: invent.c getobj empty-buf `" [*]"`; do_wear wear_ok/puton_ok.
- Change: getobj_wear/puton empty prompt `[*?]` → `[*]`.
- Verification: seed0116 Scr **115→116**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0116 @114 materialize map `` ` `` vs `·` (32,13).

## 2026-07-17 11:00 — #676 D-0606 select_newcham_form + MAIL extract
- Objective: seed0361 @18684 C `select_newcham_form` vs JS `rn2(75)`.
- C locus: `mon.c` `select_newcham_form`/`accept_newcham_form`/`newcham`;
  `wizard.c` `pick_nasty`; `global.h` `MAIL_STRUCTURES`.
- Change: port doppel/sandestin/cham + random + `polyok`/`is_mplayer`;
  `extract-monsters.py` `-DMAIL_STRUCTURES` (SPECIAL_PM 329→330).
- Verification: prefix **18684→21119** Scr **220** RNG **21217**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21119 lua `shuffle`/`splev` after `makemaz`.

## rotated from AGENT-LOOP-JOURNAL.md @ 2026-07-17 13:42

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

## 2026-07-17 14:23 — #709 D-0637 Pri-strt + Arch Priest kit
- Objective: seed0367 @2336 C nhlib shuffle vs JS rn2(79) place_lregion.
- C locus: dat/Pri-strt.lua; makemon.c quest_mon_represents_role; role.c
  Priest ldrnum PM_ARCH_PRIEST.
- Change: load_pri_strt; quest_mon_represents_role + MS_PRIEST gates;
  roles.js Priest ldrnum/homebase/intermed/questarti. Empty makemaz was
  the getbones-adjacent symptom, not a bones-path bug.
- Verification: prefix **2336→3282**; Scr 167; green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: seed0367 @3282 intemple rn2(4) vs rn2(12).
## 2026-07-19 15:17 — #882 maketrap AIR/CLOUD (D-0777); @100104→100397
- Objective: seed0360 @100104 C get_location vs JS rnd(4) mid Wiz-strt traps.
- C locus: `trap.c` `maketrap` (`IS_AIR && typ != MAGIC_PORTAL`).
- Change or falsified theory: CLOUD is SPACE_POS so DRY get_location can
  pick it; C rejects non-portal traps → no victim rnd(4). Ported terrain
  gates + `splev_create_trap` stairs/`get_location_coord` parity.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100104→100397**, RNG **100408→100887**, Scr **292**/833.
- Next: @100397 distfleeck vs rn2(3) (m_move).

## 2026-07-19 15:22 — #883 m_move Tengu teleport (D-0778); @100397→100738
- Objective: seed0360 @100397 C distfleeck vs JS rn2(3).
- C locus: `monmove.c` `m_move` Tengu `!rn2(5)` before not_special.
- Change or falsified theory: JS omitted Tengu nature teleport; matched
  `rn2(5)` strings hid the missing call until next mon’s fleeck vs
  stalker `rn2(3)`. Ported Tengu rloc/mnexto + uswallow early-out.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100397→100738**, RNG **100887→104024**, Scr **292**/833.
- Next: @100738 mfndpos chcnt rn2(6) vs rn2(5) (m_move appr==0).
