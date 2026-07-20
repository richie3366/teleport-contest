## 2026-07-20 23:57 — #1069 D-0918 drag_down / ballrelease
- Objective: seed4500 @55990 C `drag_down` rn2(2) vs JS rn2(50).
- C locus: `ball.c` `drag_down`/`ballrelease`/`litter`; `do.c`
  `goto_level` descend; `youprop.h` Punished≡(uball!=0).
- Change: port drag_down/ballrelease/litter; wire stair-fall when
  `u.uball` (not sticky `u.Punished`). Named omit: litter hitfloor/
  yname/Soundeffect; ballfall.
- Verification: prefix **55990→61462** RNG **61496** Scr **622**;
  green+strict PASS; cohort 13/13 PASS + strict lengths.
- Next: @61462 C `distfleeck` rn2(5) vs JS rn2(1000); cadence @#1070.
