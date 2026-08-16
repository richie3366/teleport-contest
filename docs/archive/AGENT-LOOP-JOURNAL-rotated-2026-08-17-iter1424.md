# Rotated from AGENT-LOOP-JOURNAL.md after #1424 D-1120 tele_trap Antimagic wrenching

## 2026-08-16 21:30 — #1409 D-1108 wash_hands + dipfountain hands/uarmg

**Objective:** Open queue — `fountain.c` `wash_hands` (named).
Not Excalibur.
**C locus:** `fountain.c` `wash_hands` 557–577; `dipfountain`
448–449; `youprop.h` Glib; `potion.c` `make_glib`; `do_wear.c`
`fingers_or_gloves`; `objnam.c` `gloves_simple_name`.
**Change:** port `wash_hands` and wire hands/`uarmg`. You-wash
pline; Glib `make_glib(0)` + slippery; `water_damage(uarmg)`;
was_glib+ER_NOTHING→ER_GREASED so dipfountain `!rn2(2)` skip
can fire. Dynamic import `make_glib` (potion cycle). Did not
pull `dipsink`, pool dip, uncurse 17–20, or case 29 `mkgold`.
Filled D-1107 hash `0633a261`. Rotated #1394. Open 10 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1405** **44**/44; next
@**#1410**).
**Verified:** private canary **33**/33; green+strict seed8000/0900;
cohort **19**/19 (0014 fountain + wizard/role + knight 0103/0104/
4500) + strict 0014/0006/2200/0360/4500/0103. Public traces
**unhit**.
**Next:** Open `sp_lev.c` `lspo_exclusion` populate
`exclusion_zones` from `des.exclusion`. Not `goodpos`.
**Blocked:** none.
