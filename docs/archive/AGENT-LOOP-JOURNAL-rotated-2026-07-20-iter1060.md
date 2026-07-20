## 2026-07-20 20:54 — #1045 score + D-0894 dryup town warn
- Objective: cadence full `sessions` + seed0014 @712 watchman vs dryup.
- C locus: `fountain.c` `dryup` / `watchman_warn_fountain`.
- Change: town first-use SET_FOUNTAIN_WARNED + watchman yell + return
  without drying (D-0894). Named omit: angry_guards; Deaf shake; wizard yn.
- Verification: green+strict PASS; cohort 35/35; seed0014 **PASS 714/714**;
  full suite **41/44** Scr **9574**/11405 RNG **676373**/792838 (85.31%)
  `33+0.23/turn`.
- Next: leaderboard cron; seed2600/4500 coverage; seed2200 parked @158.

