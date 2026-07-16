## 2026-07-16 18:28 — #589 D-0530 m_initweap S_TROLL
- Objective: seed0373 @5082 C `m_initweap` `rn2(2)` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap` `case S_TROLL`.
- Change: port S_TROLL polearm kit; ANGEL/KOP/LIZARD still deferred.
- Verification: rng-diff **5082→5497**; runner RNG **5511**/35386;
  green+strict; cohort 30/30 PASS; seed0116 RNG full.
- Next: @5497 C nhlib shuffle `rn2(2)` vs JS `rn2(5)`; or seed5006
  `dosounds` @8468.

