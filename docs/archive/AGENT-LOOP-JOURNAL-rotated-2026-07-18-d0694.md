## 2026-07-18 19:30 — #757 D-0680 POT_SICKNESS peffect_sickness
- Objective: seed0014 @6294 C `exercise` `rn2(19)` vs JS `rn2(5)`.
- C locus: `potion.c` `peffect_sickness`/`peffects`; `o_init.c`
  `discover_object` credit_hero → `exercise(A_WIS,TRUE)`.
- Change: D-0680 — port `peffect_sickness`; wire `POT_SICKNESS` so
  `dopotion` `makeknown` runs (blessed path observed).
- Verification: prefix **6294→9354**, Scr **154→221**/714; green+strict
  PASS; cohort **35**/35.
- Next: @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)` (`study_book`).
