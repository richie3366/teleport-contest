# Rotated from AGENT-LOOP-JOURNAL.md after #1390 review D-1089–D-1092 + cadence score

## 2026-08-16 13:55 — #1375 review D-1078/D-1079/D-1080 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `makemon.c` `clone_mon` 837–943 / `potion.c`
`split_mon` 2899–2912; `makemon.c` `peace_minded` 2268–2308 /
`set_malign` 2321–2366; `shk.c` `deserted_shop` 723–747 /
`u_entered_shop` 751–917.
**Change:** reviews **39** ACCEPT D-1078, **40** ACCEPT D-1079,
**41** ACCEPT-WITH-DEBT D-1080 (youprop sticky / `in_rooms`
static-buf pointer named, not Must-fix). Filled D-1080 archive
hash `0a4a5df3`. Must-fix empty. Queue 11 Open (no refill).
Rotated #1360 to archive. Rule #2: no fs.
**Score:** cadence **#1375** **44**/44 Scr **11405**/11405 RNG
**100%** speed `32+0.27/turn` (R² 0.87). Next @**#1380**.
**Verified:** full `sessions` **44**/44; role-init throws **0**/44.
C read of the three loci vs JS hunks; grep FORCE/fs/seed.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave (debt.md).
**Blocked:** none.
