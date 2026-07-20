## 2026-07-20 21:28 — #1051 D-0901 Pillars terr shuffle
- Objective: seed4500 @8925 nhlib shuffle rn2(7) vs JS rn2(5).
- C locus: `themerms.lua` Pillars; `nhlib.lua` shuffle; `sp_lev.c`
  `lspo_terrain`/`create_room`.
- Change: port Pillars contents — shuffle 7-char terr + 2×2 terrain
  blocks. Named omit: Random-feature center; nested room bodies.
- Verification: seed4500 prefix **8925→9974** Scr **284**; green+strict;
  cohort 11/11 PASS.
- Next: seed4500 @9974 shkveg rnd(860); leaderboard cron; cadence @#1055.
