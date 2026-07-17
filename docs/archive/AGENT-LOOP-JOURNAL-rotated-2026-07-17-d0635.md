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
