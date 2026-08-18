# Rotated from AGENT-LOOP-JOURNAL.md after #1527 D-1202 REVIVE/ZOMBIFY

## 2026-08-18 00:45 — #1512 D-1190 goto_level kill_genocided_monsters

**Objective:** Open — `do.c` `goto_level` `kill_genocided_monsters`
(named). Not `run_timers`.
**C locus:** `do.c` `goto_level` 1817 after losedogs before
`run_timers` / `u_collide_m`; callee `mon.c` 5639–5677 (D-1097).
**Change:** wire existing `kill_genocided_monsters` after
`losedogs` so migrating G_GENOD mons (and eggs) die on arrival.
Did not pull `run_timers`, `notice_mon_off`, cmd.c
`#levelchange`, or cham `newcham`. Filled D-1189 archive hash
`15dddffe`. Rotated #1497. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(1500/1800/0015/0002/0014/2200/4500/0367/0009/0012) + strict
lengths. Public-unhit unless genocide-then-migrate.
**Next:** Open `do.c` `goto_level` `run_timers` (named). Not
kill_genocided.
**Blocked:** none.
