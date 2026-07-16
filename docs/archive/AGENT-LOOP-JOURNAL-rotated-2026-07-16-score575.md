# Agent loop journal (rotated @#575 score)

Entries moved from live journal when it exceeded ~15.

## 2026-07-16 16:05 — #566 D-0508 trapeffect_rust_trap
- Objective: seed0398 @2839 C distfleeck rn2(5) vs JS rn2(20)
- C: `trap.c` `trapeffect_rust_trap` + selector `RUST_TRAP`
- Cause: selector omitted rust; @2838 match was JS fleeck vs C rust
  arity coincidence
- Fix: `js/trap.js` hero+monster rust trap rn2(5)/water_damage;
  wire selector; body_part HEAD/ARM
- Verify: seed0398 RNG **2840→2853**/3026 (prefix 2839→2852);
  green+strict PASS; cohort **27/27** PASS
- Next: @2852 C `weffects` rn2(8) vs JS rn2(5)

## 2026-07-16 15:54 — #565 score + D-0507 wish charges/wrp
- Objective: mandatory full `sessions` (#565÷5); seed0398 wish @2764
- C: `objnam.c` `readobjnam_parse_charges` + wrp[] class words;
  `rnd_otyp_by_namedesc` with oclass; wand `recharged`
- Fix: `js/readobjnam.js` — strip `(R:S)` / `(N)`; `wand of X` →
  WAND_CLASS + actualn; search when oclass set; set recharged
- Verify: seed0398 RNG **2773→2840**/3026 (prefix 2764→2839);
  green+strict; cohort seed0006/0007/1500/1800 PASS; suite **29/44**
  Scr 5296 RNG **303302** (38.26%) `25+0.13/turn`
- Next: seed0398 @2839 distfleeck rn2(5) vs rnd(20) after rust trap

## 2026-07-16 15:50 — D-0506 enlightenment Sleepy/Poison_res/Stealth
- Objective: seed0007 @297 Final Status/Attributes missing lines
- C: `insight.c` status_enlightenment Sleepy; attributes_enlightenment
  Poison_resistance / Stealth; youprop.h macros
- Fix: `js/invent.js` status_core_lines Sleepy + MAGIC attr poison/stealth
- Verify: seed0007 **PASS** 302/302; green+strict; cohort 26/26;
  full sessions **29/44** Scr 5296
- Next: leaderboard gap; seed0398 near-RNG survey

## 2026-07-16 15:45 — D-0505 tin_details homemade tintxts
- Objective: seed0007 @293 invent `homemade tin of lichen`
- C: `eat.c` tin_details / tin_variety(displ) / tintxts[]; set_cknown_lknown
- Fix: `js/objnam.js` tintxts + display tin_variety + full tin_details
- Verify: Scr **296→297**/302; RNG full; green+strict; cohort 26/26
- Next: @297 Final Attributes Sleep/Poison_res/Stealth (D-0506)

## 2026-07-16 15:42 — D-0504 add_erosion_words degrees
- Objective: seed0007 @161 invent `very burnt +1 leather armor`
- C: `objnam.c` `add_erosion_words` oeroded/oeroded2 + proof words
- Fix: `js/objnam.js` full `add_erosion_words` before spe (WEAPON/ARMOR)
- Verify: Scr **294→296**/302; RNG full; green+strict; cohort 26/26
- Next: @293 `homemade tin of lichen` (`tin_details` tintxts)

## 2026-07-16 15:36 — D-0503 TIN known + otyp_uses_known
- Objective: seed0007 @150 Take-out `a tin` vs `a tin of lichen`
- C locus: `objnam.c` xname_flags TIN+known; `eat.c` tin_details;
  `mkobj.c` unknow_object; FOOD unk
- Change: gate tin_details on `obj.known`; TIN/EGG in
  `otyp_uses_known` so mksobj starts known=0 (D-0503)
- Verification: Scr **291→294**/302 RNG full; green+strict;
  cohort 26/26; @161 very burnt leather next
- Next: `add_erosion_words` oeroded/oeroded2 degrees

## 2026-07-16 15:31 — #560 score + D-0502 find_ac ARM_BONUS
- Objective: mandatory full `sessions` score (#560÷5); seed0007 @124 AC
- C locus: `do_wear.c` `find_ac` / `hack.h` `ARM_BONUS`
- Change: `js/u_init.js` `find_ac` — erosion via ARM_BONUS + rings/
  amulet/HProt/uspellprot; botl on change (D-0502)
- Verification: seed0007 Scr **126→291**/302 RNG full; green+strict;
  cohort 26/26; full suite **28/44** Scr **5285**/11405 RNG 303218
  (38.24%) speed `25+0.13/turn`
- Next: seed0007 @150 Take-out `a tin` vs `a tin of lichen` (D-0503)


