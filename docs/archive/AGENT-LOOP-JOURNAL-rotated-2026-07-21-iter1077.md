## 2026-07-20 23:03 — #1062 D-0912 #turn / doturn
- Objective: seed4500 @50290 C `exercise` `rn2(19)` vs JS `mcalcmove`
- C locus: `pray.c` `doturn` / `maybe_turn_mon_iter`; `cmd.c` `"turn"`
- Change: port Knight/Cleric `#turn` (chant + `exercise(A_WIS)` + undead
  iter + `nomul`); wire EXT_CMDS. Named omit: SPE_TURN_UNDEAD fallback;
  Hallu `halu_gname` RNG; resist TELL pline.
- Verification: prefix **50290→50338** RNG **50401** Scr **594**;
  green+strict PASS; cohort 6/6 PASS.
- Next: @50338 C `distfleeck` `rn2(5)` vs JS `rn2(3)`.

