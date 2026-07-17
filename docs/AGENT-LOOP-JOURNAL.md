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

## 2026-07-17 11:32 — #681 D-0611 hitval spec_abon
- Objective: seed0361 @22084 C `rnd(5)` @ `spec_abon` vs JS `rnd(20)`.
- C locus: `artifact.c` `spec_abon`/`spec_applies`; `weapon.c` `hitval`.
- Change: extract attk+mtype; port `spec_applies`+`spec_abon`; wire
  `hitval` oartifact path.
- Verification: prefix **22084→22140** Scr **225** RNG **22478**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @22140 `m_move` rn2(12) vs rn2(16); or Pri-strt.

## 2026-07-17 11:28 — #680 score + D-0610 tryescape defense
- Objective: mandatory full `sessions` score (#680÷5); seed0361 @22042.
- Score: **33/44** Scr **6616**/11405 RNG **377869**/792838 (47.66%)
  `33+0.16/turn`. Δ vs #675: Scr +9, RNG +3380.
- C locus: `monmove.c` m_move cnt==0; `muse.c` find/use_defensive + precheck.
- Change: tryescape defense when no moves; healing invent + milky precheck.
- Verification: prefix **22042→22084** Scr **225** RNG **22261**;
  green+strict PASS; cohort 20/20 PASS.
- Next: seed0361 @22084 `spec_abon`/`hitum`; or Pri-strt.

## 2026-07-17 11:20 — #679 D-0609 MMOVE_MOVED ranged_attk
- Objective: seed0361 @21974 C `rnd(4)` @ mattacku vs JS `rn2(5)` distfleeck.
- C locus: `monmove.c` dochug MMOVE_MOVED; `mhitu.c` ranged_attk_available / AC_VALUE.
- Change: fall-through gate adds `ranged_attk_available` (gnomish wizard AT_MAGC).
- Verification: prefix **21974→22042** Scr **224** RNG **22154**;
  green+strict PASS; cohort 14/14 PASS.
- Next: seed0361 @22042 `precheck`/`use_defensive`; or Pri-strt.

## 2026-07-17 11:15 — #678 D-0608 minend-1 "(" → TOOL
- Objective: seed0361 @21310 C `rnd(1000)` @ mkobj vs JS `rnd(1002)`.
- C locus: `dat/minend-1.lua` `des.object("(")`; `defsym.h` TOOL `'('`.
- Change: `load_minend_1` two random objs `WEAPON_CLASS`→`TOOL_CLASS`
  (WEAPON sum 1002; TOOL 1000). Not GEM setgemprobs.
- Verification: prefix **21310→21974** Scr **224** RNG **22135**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21974 `mattacku` `rnd(4)` vs `distfleeck` `rn2(5)`.

## 2026-07-17 11:10 — #677 D-0607 minend-1 load_special
- Objective: seed0361 @21119 C nhlib shuffle after makemaz vs JS place_lregion.
- C locus: `dat/minend-1.lua`; `mkmaze.c` `makemaz`; `sp_lev.c` load_special.
- Change: `load_minend_1` + `load_special_proto` dispatch (map, niches,
  mimics, mines_prize luckstone, random fill, wallify/flip/fixup).
- Verification: prefix **21119→21310** Scr **222** RNG **21466**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21310 mkobj GEM `oclass_prob_totals` 1000 vs 1002.

## 2026-07-17 11:00 — #676 D-0606 select_newcham_form + MAIL extract
- Objective: seed0361 @18684 C `select_newcham_form` vs JS `rn2(75)`.
- C locus: `mon.c` `select_newcham_form`/`accept_newcham_form`/`newcham`;
  `wizard.c` `pick_nasty`; `global.h` `MAIL_STRUCTURES`.
- Change: port doppel/sandestin/cham + random + `polyok`/`is_mplayer`;
  `extract-monsters.py` `-DMAIL_STRUCTURES` (SPECIAL_PM 329→330).
- Verification: prefix **18684→21119** Scr **220** RNG **21217**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21119 lua `shuffle`/`splev` after `makemaz`.

## 2026-07-17 10:50 — #675 score + D-0605 soko mimic retry
- Objective: mandatory full score (#675÷5); seed0361 @13839 find_montype
  vs rn2(26).
- C locus: `sp_lev.c` create_monster M_AP_OBJECT boulder (`m->x < 0`
  after `m->x = mtmp->mx`); `soko1-1.lua` giant mimic.
- Change: drop JS post-makemon `m_bad_boulder_spot` relocation (C gate
  unreachable). Score: **33/44** Scr **6607**/11405 RNG **374489**/792838
  (47.23%) `32+0.16/turn`.
- Verification: prefix **13839→18684** Scr **215** RNG **18774**;
  green+strict PASS; cohort **31/31**; full sessions **33/44**.
- Next: seed0361 @18684 `select_newcham_form`; or Pri-strt.

## 2026-07-17 10:45 — #674 D-0604 pri_move altar mill
- Objective: seed0361 @13719 C `rn2(3) @ pri_move` vs JS `rn2(5)`.
- C locus: `priest.c` `pri_move` / `histemple_at`; `monmove.c` ispriest.
- Change: port `histemple_at` + `pri_move` (rn1 mill, Conflict chase,
  Invis avoid → `move_special`); `await pri_move` in `m_move`.
- Verification: prefix **13719→13839** Scr **215** RNG **13889**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @13839 `find_montype` (sp_lev); or Pri-strt.

