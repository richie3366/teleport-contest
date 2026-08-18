# Rotated from AGENT-LOOP-JOURNAL.md after #1531 D-1205 scrolltele unconscious

## 2026-08-18 01:12 — #1516 D-1193 deliver_obj_to_mon

**Objective:** Open — `dokick.c` `deliver_obj_to_mon` (named).
Not obj_delivery.
**C locus:** `dokick.c` `deliver_obj_to_mon` 1853–1906; caller
`makemon.c` 1469–1470 DF_NONE after invent; helpers
`do_name.c` `christen_orc`/`rndorcname`/`free_oname`.
**Change:** port the species-delivery loop (DELIVER_PM;
DF_RANDOM/ALL/NONE maxobj; orc named booty mines gang vs
`rn2(2)` Fence; `free_oname`; `add_to_minv`). Wire makemon
before `!in_mklev` newsym. Did not pull dog leftovers,
`mksobj_migr_to_species`, or stolen_booty. Rotated #1501.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **39**/39 + strict lengths.
**Next:** Open `do.c` `goto_level` `notice_mon_off` (named).
Not docrt.
**Blocked:** none.
