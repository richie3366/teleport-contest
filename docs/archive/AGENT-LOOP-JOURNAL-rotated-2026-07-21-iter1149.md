# Rotated from AGENT-LOOP-JOURNAL.md @#1149

## 2026-07-21 11:10 — #1134 Kni-goal load_special; RNG complete
- Objective: seed4500 @107646 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Kni-goal.lua`; `sp_lev.c` `load_special`; `mkmaze.c` `makemaz`.
- Change: no Kni-goal loader → empty maze → ordinary `rn2(79)`. Port
  `load_kni_goal` (map + Mirror + stock + Ixoth/quasits/jellies) + dispatch.
- Verification: green+strict PASS; cohort 12/12; rng-diff **108275**/108275;
  runner Scr **941→947**.
- Next: seed4500 screen peel (RNG done); cadence @#1135.
