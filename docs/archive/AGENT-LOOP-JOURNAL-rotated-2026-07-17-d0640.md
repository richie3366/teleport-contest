# Rotated journal crumbs (before #712 D-0640)

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
