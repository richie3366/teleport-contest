# Rotated from AGENT-LOOP-JOURNAL.md (#595)

## 2026-07-16 17:35 — #580 score + D-0522 TELE m_at reject
- Objective: mandatory full `sessions` score; peel seed0116 @12330
  `put_lregion_here` accept vs C reject.
- C locus: `mkmaze.c` `put_lregion_here` TELE `m_at` gate;
  `is_exclusion_zone`.
- Change: reject TELE placement on occupied mon when `!oneshot`;
  wire `is_exclusion_zone` (zones still unpopulated).
- Verification: #580 **30/44**, Scr **5898**/11405, RNG
  **321672**/792838 (40.57%), `29+0.15/turn`; seed0116
  **12330→12461** (RNG **12509**); green+strict; cohort 10/10.
- Next: `were_change` @12461; or Bar-strt / dosounds.
