# Rotated from AGENT-LOOP-JOURNAL.md after D-1067 / #1349

## 2026-08-16 03:35 — #1334 D-1059 tut-1 mineralize kelp

**Objective:** Open queue — tut-1 `des` kelp only (not stairs /
box / key / `place_lregion`).
**C locus:** `mklev.c` `water_has_kelp` / `mineralize`;
`dat/tut-1.lua` has no `des.mineralize` (map `P`/`W` + post-load
`mineralize(-1,-1,-1,-1,FALSE)`).
**Change:** `water_has_kelp` C `&&`/`||` (`POOL` or `WATER &&
!Is_waterlevel`; MOAT); `In_endgame` return before kelp unless
`skip_lvl_checks`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1330** **44**/44; next
@**#1335**).
**Verified:** private node P/W/M place; endgame skip; waterlevel
WATER no `rn2`; defaults `rn2(10)`×2+`rn2(30)`. green+strict PASS;
seed0009 **73**/73; cohort **8**/8.
**Next:** Open tut-1 stairs only.
**Blocked:** none.
