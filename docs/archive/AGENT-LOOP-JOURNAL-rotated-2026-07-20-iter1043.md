# Rotated from AGENT-LOOP-JOURNAL.md @#1043

## 2026-07-20 18:45 — #1027 D-0875 minetn-3 Alley Town
- Objective: seed0014 @52043 C nhlib shuffle `rn2(3)` vs JS `rn2(79)`.
- C locus: `dat/minetn-3.lua` via `makemaz`/`load_special`; nhlib
  `shuffle(align)`.
- Change: port `load_minetn_3` + dispatch; `wand shop`→`WANDSHOP`.
  Named omit: minetn-1/4/6/7.
- Verification: green+strict PASS; seed0014 **52043→58462**; cohort
  38/38 PASS.
- Next: @58462 C `watch_on_duty` rn2(3) vs JS rn2(10); leaderboard cron.

