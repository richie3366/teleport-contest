## 2026-07-17 00:46 — #650 formal score refresh
- Objective: mandatory #650 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **32/44**, Scr
  **6535**/11405, RNG **359063**/792838 (45.29%), `33+0.15/turn`
  (R² 0.755). Δ vs #645: Scr **+21**, RNG 0, PASS **31→32**
  (D-0580…D-0583 / seed5006 PASS).
- Next: seed0116 Scr 115/127; or leaderboard gap.
## 2026-07-17 00:45 — #649 D-0583 getbones leave-level gbuf
- Objective: seed5006 @198/@199 Get bones? map glyphs (CURRENT primary).
- C locus: vision.c vision_recalc(2); bones.c getbones yn flush;
  do.c goto_level vs flush_screen(-1) postpone.
- Change: snapshot pre-leave viz; on Get bones? run
  vision_off_newsym_gbuf on stashed leave-level + paint dirty gnew
  cells to Terminal. Ordinary vision_recalc(2) still skips newsym loop.
- Verification: seed5006 Scr **247→249**/249 RNG FULL PASS;
  green+strict PASS; cohort **29**/29 PASS; seed0116 115/127 held.
- Next: seed0116 Scr 115/127; or leaderboard gap / full suite score.