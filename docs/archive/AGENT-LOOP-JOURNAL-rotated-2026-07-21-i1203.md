# Rotated from AGENT-LOOP-JOURNAL @#1203

## 2026-07-21 18:36 — #1195 public score cadence

- Objective: cadence full `sessions` (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: docs only — CURRENT Score + NOTES + D-0928 suite confirm.
- Verification: green+strict PASS; full suite **43**/44 Scr
  **11404**/11405 RNG **792838**/792838 (100%); speed
  `31+0.26/turn`; seed4500 **PASS** Scr **1814**/1814; seed2200
  sole miss 229/230 parked.
- Next: leaderboard 22-vs-43 gap; next cadence @**#1200**.

## 2026-07-21 18:35 — #1194 ^X rank==role + eaten_stat

- Objective: seed4500 @1808 C `Knight, level 15 male human` +
  `(1 of 3)` vs JS `a level … Knight` + `(1 of 2)`.
- C locus: `insight.c` `background_enlightenment` `!strcmpi(rank,role)`;
  status Punished/Wounded_legs; attributes Jumping/umortality;
  `mkobj.c`/`eat.c` `weight`→`eaten_stat`.
- Change: `invent.js` role/rank clause + status/attr lines;
  `mkobj.js` FOOD/CORPSE `oeaten` `eaten_stat` (D-0928 #1194).
- Verification: green+strict PASS; cohort 10/10; seed4500 **PASS**
  Scr **1812→1814**.
- Next: leaderboard gap; cadence @**#1195** suite Scr reconfirm.

## 2026-07-21 18:20 — #1193 Kni goal_first / goal_next

- Objective: seed4500 @1799 C swamp-exit hole NHW_TEXT vs JS heat/smoke.
- C locus: `dat/quest.lua` Kni `goal_first`; `quest.c` `on_goal` →
  `qt_pager("goal_first")` before `temperature_change_msg`.
- Change: `questpgr.js` add Kni `goal_first`/`goal_next` from quest.lua
  (D-0928 #1193).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1807→1812**; first miss **@1799→@1808**.
- Next: @**1808** ^X `background_enlightenment` rank==role branch.

## 2026-07-21 18:12 — #1192 cmd_safety iflags.cmdassist

- Objective: seed4500 @1770 C short waiting-hit tip vs JS blank.
- C locus: `do.c` `cmd_safety_prevention` — `iflags.cmdassist ||
  !(*flagcounter)++` (seed toggled cmdassist off via Options `j`).
- Change: `do.js` read `iflags.cmdassist` (default On), not
  `flags.cmdassist` (D-0928 #1192).
- Verification: green+strict PASS; cohort 7/7; focused Scr
  **1803→1807**; first miss **@1770→@1799**.
- Next: @**1799** C swamp-exit hole pline vs JS heat/smoke More.
