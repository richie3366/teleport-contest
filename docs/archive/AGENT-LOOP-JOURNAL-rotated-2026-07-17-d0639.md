## 2026-07-17 13:05 — #696 D-0625 Arc QUEST_FIRSTTIME
- Objective: seed0361 screen peel (RNG full; Scr 306).
- C locus: `dat/quest.lua` Arc `firsttime`; `quest.c` `on_start`.
- Change: add Arc body to `QUEST_FIRSTTIME` (`%H` homebase). Missing
  text caused early return → no `flush_topl_more` → space stolen.
- Verification: Scr **306→309**/366 (147–153 match); green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @154 getpos farlook unexplored vs floor; or Pri-strt.
