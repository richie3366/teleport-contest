# Rotated from AGENT-LOOP-JOURNAL.md after #1528 D-1203 wiz_level_change drain

## 2026-08-18 00:50 — #1513 D-1191 goto_level run_timers

**Objective:** Open — `do.c` `goto_level` `run_timers` (named).
Not `kill_genocided`.
**C locus:** `do.c` `goto_level` 1818–1823 after losedogs +
`obj_delivery` + `kill_genocided_monsters` before `u_collide_m`;
callee `timeout.c` 2222–2241 (JS `mkobj.js` D-0405/D-1037).
**Change:** `await run_timers()` after `kill_genocided_monsters`
so dest + delivered timers that expired while away fire before
collide/vision/pickup. Did not peel invent/migrating RANGE_LEVEL
(`obj_is_local` false). Did not pull `notice_mon_off`, cmd.c
`#levelchange`, or REVIVE/ZOMBIFY. Filled D-1190 archive hash
`9a2cbc27`. Rotated #1498. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** green+strict seed8000/0900; cohort **16**/16
(1500/1800/0015/0002/0014/2200/4500/0367/0009/0012/0004/
0060/0102/0700/0006/0361) + strict lengths. Public-unhit
unless a due timer is on the restored or delivered queue.
**Next:** Open `allmain.c` `newgame` wizkit `obj_delivery(FALSE)`
(named). Not goto_level.
**Blocked:** none.
