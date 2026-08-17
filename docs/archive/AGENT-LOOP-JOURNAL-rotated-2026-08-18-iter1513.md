# Rotated from AGENT-LOOP-JOURNAL.md after #1513 D-1191 run_timers

## 2026-08-17 21:16 — #1498 D-1179 goto_level do_fall_dmg

**Objective:** Open — `do.c` `goto_level` `do_fall_dmg` (named).
Not fix_shop_damage.
**C locus:** `do.c` `goto_level` 1805–1810 falling arm + 1988–1994
after `!new` `fix_shop_damage` before `pickup`; `dist` at 1498.
**Change:** capture `dist` before uz reassignment; on `falling`
`selftouch` then set the flag; after shop repair
`d(max(dist,1),6)` `maybe_half_phys` `losehp` ("falling down a
mine shaft"); fatal skips pickup (C noreturn). Did not pull
Punished `ballfall`, W-tower rndspot bit 2, `kill_genocided`,
`run_timers`, or `notice_mon_off`. Filled D-1178 archive hash
`4a700d08`. Rotated #1483. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a session falls through a
hole/trap door.
**Next:** Open `teleport.c` `rloc_to_core` telemsg (named). Not
RLOC_ERR.
**Blocked:** none.
