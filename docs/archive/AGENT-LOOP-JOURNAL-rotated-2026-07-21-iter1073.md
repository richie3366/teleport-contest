## 2026-07-20 22:56 — #1061 D-0911 extract ox/oy + rotten + HDeaf
- Objective: seed4500 @50111 C `next_ident`/`doeat` vs JS `mcalcmove`
- C locus: `mkobj.c` `obj_extract_self`; `eat.c` `rottenfood`/`Hear_again`;
  `timeout.c` DEAF case
- Change: keep ox/oy after extract (was false drag cause_delay); wire
  ordinary rotten + Hear_again; nh_timeout HDeaf decrement. Named omit:
  TIN/multi-turn non-corpse; make_deaf talk; Blinded/… timeouts.
- Verification: prefix **50111→50290** RNG **50469** Scr **499→596**;
  green+strict PASS; cohort 6/6 PASS
- Next: @50290 exercise rn2(19); leaderboard cron; cadence @#1065

## 2026-07-20 22:45 — #1060 score + D-0910 regen_pw
- Objective: cadence full `sessions` + seed4500 @50054 regen_pw
- C locus: `allmain.c` `regen_pw` + moveloop once-per-turn call
- Change: port regen_pw (period/Energy_regeneration/EMagical_breathing
  + rn1); wire after regen_hp. Named omit: Teleport/Poly EOT arms.
- Verification: prefix **50054→50111** RNG **50220→50240** Scr **499**;
  green+strict PASS; cohort 6/6; suite **42/44** Scr **10089**/11405
  RNG **734803**/792838 (92.68%) `31+0.23/turn`
- Next: @50111 next_ident rnd(2); cadence @#1065

## 2026-07-20 22:36 — D-0909 Punished drag_ball/move_bc
- Objective: seed4500 @50034 C mattacku rnd(20) vs JS rn2(20)
- C locus: ball.c drag_ball/move_bc; hack.c domove Punished arms
- Change: symptom was adjacency drift after punish — port drag_ball +
  sighted move_bc; wire cause_delay→nomul(-2) in domove
- Verification: prefix 50034→50054 RNG 50167→50220 Scr 499;
  green+strict PASS; cohort 6/6 PASS
- Next: @50054 regen_pw rn2(2); cadence @#1060

## 2026-07-20 22:25 — D-0908 SCR_PUNISHMENT punish/placebc
- Objective: seed4500 @49915 C mkobj rnd(1000) vs JS rn2(19)
- C locus: read.c seffect_punishment/punish; ball.c placebc; worn setworn
- Change: port SCR_PUNISHMENT → punish (mkobj CHAIN/BALL + setworn +
  placebc); mksobj where=OBJ_FREE; js/ball.js placebc
- Verification: prefix 49915→50034 Scr 481→499 RNG 50071→50167;
  green+strict PASS; cohort 4/4 PASS
- Next: @50034 mattacku rnd(20) vs rn2(20); cadence @#1060

