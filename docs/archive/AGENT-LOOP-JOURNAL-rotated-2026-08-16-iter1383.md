# Rotated from AGENT-LOOP-JOURNAL.md after #1383 D-1087

## 2026-08-16 12:14 — #1369 D-1077 is_lava DRAWBRIDGE_UP+DB_LAVA

**Objective:** Open queue — `hack.c` `is_lava` includes DRAWBRIDGE_UP
+ `DB_LAVA` (named from D-1060).
**C locus:** `dbridge.c` `is_lava` (~62–74); `rm.h` `DB_LAVA`/`DB_UNDER`.
**Change:** shared `hack.js` `is_lava` matches C (LAVAPOOL/LAVAWALL or
DRAWBRIDGE_UP with `drawbridgemask & DB_UNDER == DB_LAVA`). `mon.js`
`mfndpos` uses that helper instead of a LAVAPOOL/LAVAWALL-only clone.
Did not pull `is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT. Stamped review
19 named omit **Addressed:** D-1077. Rule #2: no fs. Rotated #1354
to archive.
**Score:** fortress unchanged (cadence **#1365** **44**/44; next
@**#1370**).
**Verified:** private canary (UP+DB_LAVA true; ICE/MOAT/FLOOR/DOWN
false); green+strict seed8000/0900; cohort **15**/15
(8000/0900/1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/
2200/0009) + strict 0014/4500/0360/2200. Path public-unhit.
**Next:** Open `sit.c` `split_mon` monster `clone_mon` arm.
**Blocked:** none.
