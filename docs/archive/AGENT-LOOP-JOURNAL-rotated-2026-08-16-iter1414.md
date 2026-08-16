# Rotated from AGENT-LOOP-JOURNAL.md after #1414 D-1112 mlevel_tele_trap MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP

## 2026-08-16 19:22 — #1399 D-1100 goodpos passes_walls + may_passwall

**Objective:** Open queue — `teleport.c` `goodpos` `passes_walls` +
`may_passwall` early-out (named). Not youmonst swim.
**C locus:** `teleport.c` `goodpos` 163–164; `hack.c`
`may_passwall` 931–936; `mondata.h` `passes_walls` ≡ M1_WALLWALK.
**Change:** local `may_passwall` (STWALL + `wall_info|flags`
W_NONPASSWALL). Early-out `passes_walls(mdat)` before amorphous/
accessible — form flag, not youprop Passes_walls. Pool/lava still
first. Did not pull `is_exclusion_zone`. Filled D-1099 hash
`a6934a3d`. Rotated #1384. Open 8 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **68**/68; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone`. Not `onscary`. Audit @**#1400**.
**Blocked:** none.
