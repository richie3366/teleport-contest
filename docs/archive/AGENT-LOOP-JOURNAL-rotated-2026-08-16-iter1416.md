# Rotated from AGENT-LOOP-JOURNAL.md after #1416 D-1113 dipsink

## 2026-08-16 19:48 — #1401 D-1101 goodpos GP_AVOID_MONPOS is_exclusion_zone

**Objective:** Open queue — `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone` (named). Not `onscary`.
**C locus:** `teleport.c` `goodpos` 180–182; `mkmaze.c`
`is_exclusion_zone` 317–331; `dungeon.h` `within_bounded_area` / `LR_*`.
**Change:** local `is_exclusion_zone` (mklev.js already imports
teleport.js — cycle). After boulder: `avoid_monpos &&
is_exclusion_zone(LR_MONGEN)` → false. TELE/UPTELE/DOWNTELE do
not reject mongen. Wallwalk/pool/lava still skip it. Did not
pull live-mon `onscary`. D-1100 hash already `305ad188`.
Rotated #1386. Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1400** **44**/44; next
@**#1405**).
**Verified:** private canary **57**/57; green+strict seed8000/0900;
cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/
0014/0360/2200/0009/0367) + strict 0014/4500/0360/2200/0367/0009.
Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos_onscary` Elbereth /
SCR_SCARE_MONSTER / altar-vampire. Not `is_pool`.
**Blocked:** none.
