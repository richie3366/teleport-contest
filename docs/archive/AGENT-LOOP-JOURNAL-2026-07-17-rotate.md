# Archived from AGENT-LOOP-JOURNAL

## 2026-07-17 10:00 — #668 D-0599 rolling boulder (@11065)
- Objective: seed0361 @11065 C `rnd(20) @ dmgval` vs JS `rn2(5)`.
- C locus: `trap.c` `trapeffect_rolling_boulder_trap` / `launch_obj`.
- Change: wired ROLLING_BOULDER into `trapeffect_selector`; ported
  `launch_obj` ROLL path (hero `dmgval`+`thitu`). Symptom was missing
  trap effect, not dmgval body — C screen "Click! … boulder misses you."
- Verification: prefix **11065→12287** Scr **198→205**; green+strict
  PASS; cohort **31/31** PASS.
- Next: seed0361 @12287 `pick_room` rn2(5) vs rn2(3); or Pri-strt.
