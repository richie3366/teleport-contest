# Rotated from AGENT-LOOP-JOURNAL.md at #1042

## 2026-07-20 18:15 — #1026 D-0874 trapeffect_landmine
- Objective: seed0014 @50259 C `rnd(16)` landmine vs JS `rn2(5)`.
- C locus: `trap.c` `trapeffect_landmine` / `blow_up_landmine`; mon
  `rn2(cwt+1) < WT_ELF/2` early return (this peel underweight).
- Change: wire LANDMINE in selector; port landmine + partial blow_up
  (omit scatter/fill_pit/drawbridge/iron-shoes which_armor).
- Verification: green+strict PASS; seed0014 **50259→52043**; cohort
  20/20 PASS.
- Next: @52043 C nhlib.lua shuffle rn2(3) vs JS rn2(79); leaderboard cron.

