# Rotated from AGENT-LOOP-JOURNAL.md after #1420 review D-1113–D-1116 + cadence score

## 2026-08-16 20:33 — #1405 review D-1101–D-1104 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `goodpos` 180–182 / `mkmaze.c`
`is_exclusion_zone` 317–331; `teleport.c` `goodpos_onscary`
49–76 / `engrave.c` `sengr_at`; `dbridge.c` `db_under_typ`
116–128 / `rm.h` SURFACE_AT / `pager.c` waterbody_name;
`fountain.c` `dryup` 236–237 / `mon.c` `angry_guards`.
**Change:** reviews **62** ACCEPT D-1101 (`is_exclusion_zone`
real clone), **63** ACCEPT-WITH-DEBT D-1102 (fakemon helper
real; live-mon `onscary` still named Open), **64** ACCEPT
D-1103 (`db_under_typ`/`SURFACE_AT` real), **65** ACCEPT
D-1104 (`angry_guards` imported D-0941). Must-fix empty.
Filled D-1104 archive hash `7458a5b8`. Rotated #1390. Open 9
(no refill). Rule #2: no fs.
**Score:** cadence **#1405** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.26/turn` (R² 0.86). Next
@**#1410**.
**Verified:** C read of the four loci vs JS hunks; grep
FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Open `fountain.c` `watchman_warn_fountain` Deaf
shake/wave. Not dryup yn.
**Blocked:** none.
