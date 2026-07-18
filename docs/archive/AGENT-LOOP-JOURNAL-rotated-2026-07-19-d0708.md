## 2026-07-18 21:57 — #773 D-0695 unmul empty nomovemsg
- Objective: seed0014 trip `--More--` @22721 / @22868 mtrack desync.
- C locus: `hack.c` `unmul`; `timeout.c` FUMBLING `nomovemsg=""`.
- Change: D-0695 — `unmul` default only if `nomovemsg == null`; skip
  pline on `""`. Falsified: leftover-grid noises skip; more() keep-grid
  (regressed seed0002/0030 screens).
- Verification: prefix **22868→28552**, Scr **483→515**; green+strict;
  cohort PASS list intact.
- Next: @28552 C `exercise` `rn2(2)` vs JS `rn2(19)` (door-bump step).

