## 2026-07-16 15:05 — #555 score + D-0497 mhitm_ad_drst
- Objective: mandatory #555 full score; primary D-0497 seed0007 @16346.
- C locus: `uhitm.c` `mhitm_ad_drst` (mhitu) — mgc gate before hitmsg.
- Change: port `mhitm_ad_drst_u` for AD_DRST/DRDX/DRCO; leather a_can=1
  negates poison arm after rn2(10)=1.
- Verification: rng-diff full **16373**/16373; Scr still 60/302;
  green+strict+cohort PASS; full **28/44** Scr 5054 RNG **303218**
  (38.24%) `26+0.14/turn` (Δ vs #550 RNG +1034).
- Next: seed0007 screen peel (D-0498).

## 2026-07-16 15:00 — D-0496 postmov hides_under / hideunder
- Objective: primary D-0496 — seed0007 @16339 distfleeck vs rnd(20).
- C locus: `monmove.c` `postmov` hides_under/`S_EEL` `rn2(5)` →
  `hideunder` (`mon.c`); `can_hide_under_obj`.
- Change: `js/monmove.js` — gate + mundetected hideunder subset
  (water moccasins are M1_CONCEAL after D-0495 snakes).
- Verification: rng-diff **16339→16346**; seed0007 RNG **16355**/16373
  Scr 60; green+strict PASS; cohort 28/28 PASS.
- Next: @16346 `mhitm_mgc_atk_negated` rn2(10) vs rn2(3) (D-0497).
