# Rotated from AGENT-LOOP-JOURNAL.md after #1542 D-1214 disturb_buried_zombies

## 2026-08-18 05:52 — #1527 D-1202 REVIVE/ZOMBIFY

**Objective:** Open — `timeout.c` REVIVE/ZOMBIFY (named). Not
`run_timers`.
**C locus:** `do.c` `revive_mon` 2251–2295 / `zombify_mon`
2298–2315 (table `timeout.c` 1982–1983); `mon.c` `zombie_form`
386–413; `timeout.c` `obj_has_timer` 2404–2409; `mkobj.c`
`start_corpse_timeout` 1425–1428; buried pit `do.c`
`revive_corpse` 2217–2234.
**Change:** `revive_mon`/`zombify_mon` + `run_timers` dispatch;
`zombie_form`; zombify `rn1(15,5)` arm; `obj_has_timer`; buried
zombie pit. Did not pull `gz.zombify` setters, MINVENT/CONTAINED,
or `rot_corpse` worn plines. Filled D-1201 archive hash
`4ffc2264`. Rotated #1512. Open 7 after archive → refill to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** `zombie_form`/`is_displacer` unit; green+strict
seed8000/0900; cohort **16**/16 + strict lengths (fresh
process). Public-unhit unless a REVIVE/ZOMBIFY timer expires.
**Next:** Open `cmd.c` `wiz_level_change` (named). Not
notice_mon_off.
**Blocked:** none.
