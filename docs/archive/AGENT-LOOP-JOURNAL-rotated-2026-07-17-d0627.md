## 2026-07-17 11:44 — #683 D-0613 artifact_hit / spec_dbon
- Objective: seed0361 @22362 C `rn2(6)` @ `xkilled` vs JS `rn2(3)`.
- C locus: `artifact.c` `spec_dbon`/`artifact_hit`; `uhitm.c` weapon melee.
- Change: port `spec_dbon`+`artifact_hit`; wire after `dmgval` in `hmon`.
  Symptom was knockback (`rn2(3)`+`rn2(6)`), not xkilled — Grayswandir
  `max(tmp,1)` double was missing so mon survived.
- Verification: prefix **22362→23015** Scr **225→268** RNG **24011**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @23015 nhlib shuffle vs `rnd(13)`; or Pri-strt.

