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

## 2026-07-17 14:16 — #708 D-0636 blue DSM Very_fast
- Objective: seed0367 @2331 C u_calc_moveamt rn2(3) vs JS dosounds rn2(400).
- C locus: do_wear.c dragon_armor_handling/Armor_on; youprop.h Very_fast.
- Change: dragon_armor_handling (blue→EFast) + Armor_on/off; Fast/Very_fast
  read uprops[FAST]; confer_oc_oprop FAST→EFast mirror. Hypothesis "missing
  u_calc_moveamt call" falsified — Very_fast false without blue DSM EFast.
- Verification: prefix **2331→2336**; Scr **166→167**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @2336 getbones / nhlib shuffle vs rn2(79).

## 2026-07-17 14:12 — #707 D-0635 garlic_breath monflee
- Objective: seed0367 @1975 C dochug rn2(40) vs JS rn2(5).
- C locus: eat.c fprefx/garlic_breath; mondata.c olfaction; monmove.c monflee.
- Change: olfaction + garlic_breath → monflee(0); export monflee; known_hitum
  real monflee. Hypothesis "dochug flee arm missing" falsified — mflee never set.
- Verification: prefix **1975→2331**; Scr **155→166**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @2331 u_calc_moveamt rn2(3) vs dosounds rn2(400).

## 2026-07-17 14:02 — #706 D-0634 getobj_takeoff continue
- Objective: seed0367 @1946 (looked like dog_goal one fewer obj_resists).
- C locus: invent.c getobj missing-letter continue; do_wear.c dotakeoff.
- Change: getobj_takeoff loops on "don't have that object" (was abort →
  key desync / early garlic eat). Hypothesis "fobj shortfall" falsified.
- Verification: prefix **1946→1975**; Scr **75→155**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @1975 dochug rn2(40) vs rn2(5).

## 2026-07-17 13:53 — #705 public score 34/44
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence); seed0367 peel scouted only.
- Change: refreshed CURRENT Score — **34/44** PASS; Scr **6829**/11405;
  RNG **416960**/792838 (52.59%); speed `33+0.16/turn`. seed0361 in suite.
  Next peel: seed0367 @1946 dog_goal one fewer `obj_resists`.
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0367 dog_goal/fobj vs dogfood early-out; or seed0014/0108.

## 2026-07-17 13:50 — #704 D-0633 seed0361 ^X attrs PASS
- Objective: seed0361 @360/@361 attrs `(1 of 2)` vs `(1 of 3)`.
- C locus: `insight.c` attributes_enlightenment; `weapon.c` odd_skill_names;
  `artifact.c` set_artifact_intrinsic/what_gives; `allmain.c` ublesscnt--;
  `eat.c` gethungry case 8.
- Change: Hallu/Search/Reflect/Lifesaved lines + saber skill_name +
  HALRES on wield + bare_artifactname; ublesscnt--; amulet hunger burn.
- Verification: seed0361 **PASS** 366/366 + strict; green+strict PASS;
  cohort 31/31 PASS.
- Next: full sessions on #705 (expect 34/44); seed0367 / seed0014/0108.

## 2026-07-17 13:42 — #703 D-0632 relobj distant_name disco
- Objective: seed0361 @358 disco Armor cloak/shoes order reversed.
- C locus: `steal.c` `mdrop_obj` `distant_name` before extract; `objnam.c`.
- Change: `relobj_on_death` calls `distant_name(otmp, doname)` while still
  MINVENT so disco follows minvent order (not reverse pile look_here).
- Verification: Scr **363→364**/366; @358 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @360/@361 attrs pages (Hallu/Search/Reflect/lifesaved).


## 2026-07-17 13:36 — #702 D-0631 ini_inv weptool + doname charged
- Objective: seed0361 @354 invent — uncursed pick-axe / tinning vs
  `+0` swapwep / `(0:72)` charges.
- C locus: `u_init.c` `ini_inv_use_obj` `is_weptool`; `objnam.c`
  `doname_base` weptool→WEAPON + TOOL `oc_charged`.
- Change: u_init `is_weptool` (+ bimanual/shield gate); objnam
  donameClass remap + charged-tool/WEPTOOL name list.
- Verification: Scr **362→363**/366; @354 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @358 disco order; @360/@361 attrs pages.


## 2026-07-17 13:31 — #701 D-0630 hideunder non-pit trap
- Objective: seed0361 @339 map `%` vs `S` after Home5 getlev.
- C locus: `mon.c` `hideunder` trap/`is_pit`; `makemon.c` S_SNAKE;
  Arc-goal.lua traps before monsters.
- Change: makemon inline hideunder skipped non-pit `t_at` (POLY_TRAP);
  C left snake visible. Gate with `t_at && !is_pit`.
- Verification: Scr **355→362**/366 RNG full; green+strict PASS;
  cohort 33/33 PASS.
- Next: seed0361 @354 invent doname; or Pri-strt.


## 2026-07-17 13:25 — #700 score + D-0629 questarti %o
- Objective: mandatory full `sessions` score (#700); seed0361 @320 Orb.
- C locus: `questpgr.c` `convert_arg` `%o`; `role.c` `questarti`;
  `u_init.js` `setup_role_race_from_rc` omitted field.
- Change: install `urole.questarti` from role template.
- Verification: suite **33/44**, Scr **6818**/11405, RNG **416960**/792838
  (52.59%), `33+0.16/turn`; seed0361 Scr **352→355**; green+strict PASS.
- Next: seed0361 remaining 11 screens; or Pri-strt.


## 2026-07-17 13:20 — #699 D-0628 python hideunder M1_CONCEAL
- Objective: seed0361 @307 map `%` vs `S` after locate materialize.
- C locus: `makemon.c` S_SPIDER/S_SNAKE → `hideunder`; `mondata.h`
  `hides_under`/`M1_CONCEAL`; python lacks CONCEAL.
- Change: JS forced `mundetected=1` for all S_SNAKE; python stayed
  hidden under pancake. Gate on `hides_under(ptr)`.
- Verification: Scr **331→352**/366; RNG full; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @320 Orb of Detection text; or Pri-strt.


## 2026-07-17 13:15 — #698 D-0627 is_pure debug + %ra
- Objective: seed0361 @182 adjust?/dialogue vs zap; badalign rank text.
- C locus: `quest.c` `is_pure` (`wizard`≡`flags.debug`); `questpgr.c`
  `convert_arg`/`convert_line` `%r` + `%ra`→`an()`.
- Change: `is_pure` used `flags.wizard` (unset under playmode:debug);
  `%r` used sticky `urole.rank` and treated `%ra` as literal → `Diggera`.
- Verification: Scr **327→331**/366; green+strict PASS; cohort 33/33.
- Next: seed0361 @307 map `S` vs `%`; or Pri-strt.


## 2026-07-17 13:10 — #697 D-0626 getpos cmap / waterbody
- Objective: seed0361 @154 getpos `"unexplored area"` vs `"floor of a room"`.
- C locus: `pager.c` `lookat` cmap/`waterbody_name`; `getpos.c` `auto_describe`.
- Change: `auto_describe_text` was stubbing all non-stair/trap glyphs;
  cells were ROOM/`~` and MOAT/``` — not blank memory. Added
  `cmap_defsym_explanation` + `waterbody_name`.
- Verification: Scr **309→327**/366; green+strict PASS; cohort 33/33.
- Next: seed0361 @182 adjust?/dialogue vs zap; or Pri-strt.


## 2026-07-17 13:05 — #696 D-0625 Arc QUEST_FIRSTTIME
- Objective: seed0361 screen peel (RNG full; Scr 306).
- C locus: `dat/quest.lua` Arc `firsttime`; `quest.c` `on_start`.
- Change: add Arc body to `QUEST_FIRSTTIME` (`%H` homebase). Missing
  text caused early return → no `flush_topl_more` → space stolen.
- Verification: Scr **306→309**/366 (147–153 match); green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @154 getpos farlook unexplored vs floor; or Pri-strt.


