# Rotated from AGENT-LOOP-JOURNAL.md after #1538 D-1211 mhitm monkilled zombify

## 2026-08-18 05:01 — #1523 D-1199 mon_arrive After_you my=xyflags before rloc

**Objective:** Open — `dog.c` `mon_arrive` `my=xyflags` before
rloc (named). Not migrate bit.
**C locus:** `dog.c` `mon_arrive` 607–613 after xyloc switch
before `mnearto`/`rloc(RLOC_NOMSG)`. Caller `losedogs`
After_you 390–401 (`mux/muy` match `u.uz`, not EXACT_XY).
**Change:** After_you copies `mtrack[0].y` into `my` (`mx`
stays 0) then rloc when xlocale==0 else thin mnearto
(move_other FALSE). RANDOM zeros locale. Did not pull
kops/EXACT_XY Before_you/failed_arrivals/wander/leftovers/
Wiz_arrive. Filled D-1198 archive hash `2f8f7d9f`. Rotated
#1508. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **32**/32; green+strict
seed8000/0900; cohort **10**/10 + strict 1500/0012/0360/4500/
2200/0014/0004/0700/1800/0006.
**Next:** Open `allmain.c` `newgame` `notice_mon_off` (named).
Not wizkit.
**Blocked:** none.
