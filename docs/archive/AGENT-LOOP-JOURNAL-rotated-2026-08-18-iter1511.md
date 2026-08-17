# Rotated from AGENT-LOOP-JOURNAL.md after #1511 D-1189 rhack visctrl

## 2026-08-17 21:00 — #1496 D-1177 goto_level obj_delivery

**Objective:** Open — `do.c` `goto_level` `obj_delivery` (named).
Not in_out_region.
**C locus:** `dokick.c` `obj_delivery` 1769–1851; callers
`do.c` `:1815` FALSE after placebc, `:1978` TRUE after
`check_special_room`; `mkobj.c` `obj_extract_self` OBJ_MIGRATING.
**Change:** port the callee (XOR WITH_HERO; bitmask noscatter;
persistent nx/ny; soft skip; WITH_HERO `breaks` else silent
`breaktest`+`delobj`; scatter `rnd(2)` or newsym; rloco). Wire
both `goto_level` sites. Unlink `OBJ_MIGRATING` in extract.
Did not pull `deliver_obj_to_mon`, wizkit FALSE, shop/fall,
`kill_genocided_monsters`, or `run_timers`. Rotated #1481.
Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit when `migrating_objs` is empty.
**Next:** Open `do.c` `goto_level` `fix_shop_damage` (named). Not
obj_delivery.
**Blocked:** none.
