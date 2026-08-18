# Rotated from AGENT-LOOP-JOURNAL.md after #1541 D-1213 rot_corpse worn plines

## 2026-08-18 05:36 — #1526 D-1201 init_artifacts

**Objective:** Open — `artifact.c` `init_artifacts` (named).
Not wizkit.
**C locus:** `artifact.c` `init_artifacts` 109–116 memset
artiexist/artidisco then `hack_artifacts` 85–106. Caller
`allmain.c` 792 after `init_dungeons`/`role_init`, before
`u_init_misc`.
**Change:** `init_artifacts` rebuilds artilist from generated
raw then gift-role align / Excalibur `!Knight` `role=NON_PM` /
`questarti` align+role. `newgame` calls it at the C site.
Did not pull `save_artifacts`/`restore_artifacts`, wizkit, or
`reset_glyphmap`. Rotated #1511. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **16**/16 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0700/0006/0108/0116.
**Next:** Open `timeout.c` REVIVE/ZOMBIFY (named). Not
run_timers.
**Blocked:** none.
