## 2026-07-17 01:00 — #652 D-0585 does_block is_lightblocker_mappear
- Objective: seed0116 Scr 116/127 @114 materialize map `` ` `` vs `·`.
- C locus: vision.c does_block; monst.h is_lightblocker_mappear.
- Change: vision.js `_blocks` treats mimic-as-boulder (and door/wall/tree
  furniture) as light blockers so Algorithm C marks the edge cell.
- Verification: seed0116 Scr **116→125**/127 RNG FULL; green+strict PASS;
  cohort **30**/30 PASS; seed0373 PASS. Residual @117 spells / @122 insight.
- Next: seed0116 @117 “Currently known spells” centering; or leaderboard.
