# Rotated from AGENT-LOOP-JOURNAL.md (#694 D-0623)

## 2026-07-17 11:20 — #679 D-0609 MMOVE_MOVED ranged_attk
- Objective: seed0361 @21974 C `rnd(4)` @ mattacku vs JS `rn2(5)` distfleeck.
- C locus: `monmove.c` dochug MMOVE_MOVED; `mhitu.c` ranged_attk_available / AC_VALUE.
- Change: fall-through gate adds `ranged_attk_available` (gnomish wizard AT_MAGC).
- Verification: prefix **21974→22042** Scr **224** RNG **22154**;
  green+strict PASS; cohort 14/14 PASS.
- Next: seed0361 @22042 `precheck`/`use_defensive`; or Pri-strt.

## 2026-07-17 11:15 — #678 D-0608 minend-1 "(" → TOOL
- Objective: seed0361 @21310 C `rnd(1000)` @ mkobj vs JS `rnd(1002)`.
- C locus: `dat/minend-1.lua` `des.object("(")`; `defsym.h` TOOL `'('`.
- Change: `load_minend_1` two random objs `WEAPON_CLASS`→`TOOL_CLASS`
  (WEAPON sum 1002; TOOL 1000). Not GEM setgemprobs.
- Verification: prefix **21310→21974** Scr **224** RNG **22135**;
  green+strict PASS; cohort 7/7 PASS.
- Next: seed0361 @21974 `mattacku` `rnd(4)` vs `distfleeck` `rn2(5)`.
