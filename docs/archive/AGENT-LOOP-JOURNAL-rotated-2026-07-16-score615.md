## 2026-07-16 19:20 — #600 score + D-0540 soldier polearm rn1
- Objective: mandatory 5-iter score refresh; peel seed0373 @16261
  C `m_initweap` `rn2(12)` vs JS `rn2(2)`.
- C locus: `makemon.c` `m_initweap` PM_SOLDIER/PM_WATCHMAN.
- Change: full `sessions` → CURRENT Score; port soldier/watchman
  `rn1(PARTISAN..BEC_DE_CORBIN)` + `P_POLEARMS` filter.
- Verification: **30/44** Scr **5900**/11405 RNG **337400**/792838
  (42.56%) `31+0.15/turn` (R² 0.74); rng-diff **16261→19071**;
  runner RNG **19086**; green+strict; cohort 28/28.
- Next: m_initweap is_elf @19071; or dosounds @8468.
