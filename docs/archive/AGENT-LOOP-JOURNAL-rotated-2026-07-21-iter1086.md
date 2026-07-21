## 2026-07-21 00:09 — #1071 D-0920 TROUBLE_HIT fix_worst_trouble
- Objective: seed4500 @61689 C `fix_worst_trouble` `rnd(5)` vs
  JS `rn2(1000)` after matched `pleased` `rnl(2)`.
- C locus: `pray.c` `critically_low_hp` / `in_trouble` /
  `fix_worst_trouble` TROUBLE_HIT / `pleased` action switch.
- Change: port critically_low_hp + TROUBLE_HIT detect/fix; wire
  pleased `min(action,5)` cases. Root: stubbed in_trouble→0 skipped
  HIT `rnd(5)` uhpmax boost.
- Verification: prefix **61689→61698** RNG **61837** Scr **654**;
  green+strict PASS; cohort 15/15 PASS.
- Next: @61698 C nhlib.lua shuffle `rn2(3)` vs JS `rn2(79)`.
