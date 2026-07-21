# Rotated from AGENT-LOOP-JOURNAL.md @#1109

## 2026-07-21 03:24 — #1094 D-0928 dobuzz type<0 monkilled
- Objective: seed4500 @88399 corpse_chance rn2(2) vs JS rn2(6).
- C locus: `zap.c` `dobuzz` (`type < 0` → `monkilled`); `mon.c`
  `monkilled`/`mondied`/`corpse_chance`.
- Change: export `monkilled`; dobuzz mon-breath kill uses it (no
  `xkilled` treasure `rn2(6)`).
- Verification: prefix **88399→89775**; RNG **89881** Scr **807**;
  green+strict PASS; cohort 7/7.
- Next: @89775 C `gethungry` `rn2(20)` vs JS `rn2(67)`.
