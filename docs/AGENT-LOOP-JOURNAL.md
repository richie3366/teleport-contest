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
