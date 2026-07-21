# Rotated from AGENT-LOOP-JOURNAL @#1175

## 2026-07-21 14:36 — #1163 waterbody_name Medusa shallow sea

- Objective: seed4500 @1001 C `shallow sea` vs JS `moat`.
- C locus: `pager.c` `waterbody_name` MOAT → `Is_medusa_level`
  / juiblex / samurai-qstart / hallu; ICE; waterlevel wall.
- Change: `hack.js` `waterbody_name` ports those arms; SURFACE_AT
  drawbridge still deferred (D-0928 #1163).
- Verification: green+strict PASS; cohort 36/36; Scr **1431→1433**;
  prefix **@1001→@1034**.
- Next: @**1034** C empty vs JS `A minotaur appears close by.`
  (`create_particular` invents pline).

## 2026-07-21 14:32 — #1162 zap_over_floor hissing-gas Norep

- Objective: seed4500 @997 C hissing gas vs JS fire-blast hits-you.
- C locus: `zap.c` `zap_over_floor` ZT_FIRE/is_pool → `Norep`;
  `hit` via objnam `The`.
- Change: async fire-pool Norep (+ Deaf/waterlevel/MOAT see_it);
  `hit_zap` uses objnam `The`; await from `dobuzz` (D-0928 #1162).
- Verification: green+strict PASS; cohort 36/36; Scr **1427→1431**;
  prefix **@997→@1001**.
- Next: @**1001** C `shallow sea` vs JS `moat` (`waterbody_name`).

