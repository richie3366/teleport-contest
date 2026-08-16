# Rotated from AGENT-LOOP-JOURNAL.md after #1403 D-1103 db_under_typ / SURFACE_AT

## 2026-08-16 17:06 — #1388 D-1091 goodpos is_pool()/is_lava()

**Objective:** Open queue — `teleport.c` `goodpos` must call
`is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros
(named from D-1077 review **38**).
**C locus:** `teleport.c` `goodpos` 134–175; `dbridge.c`
`is_pool`/`is_lava`; `rm.h` `IS_POOL` range includes
DRAWBRIDGE_UP.
**Change:** `teleport.js` `goodpos` uses shared `hack.js`
`is_pool`/`is_lava`. UP+`DB_LAVA` takes the lava arm
(flyer/`likes_lava`), not the swimmer arm. Dropped JS-only
`!mtmp` pool/lava early-out. Stamped review **38** named omit
**Addressed:** D-1091. Filled D-1090 hash `43caa8ff`. Rotated
#1373. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **44**/44 (POOL/MOAT/WATER/lava;
UP+lava swimmer false / flyer·sala true; UP+moat swimmer true;
UP+ICE/FLOOR neither; ignore flags; null mtmp); green+strict
seed8000/0900; cohort **14**/14 (1500/1800/0060/0102/0700/
0017/0106/0107/4500/0014/0360/2200/0009/0367) + sit/liquid
strict. Path public-unhit for DRAWBRIDGE_UP lava placement.
**Next:** Open `makemon.c` S_ORC/S_ELF/unicorn mlet peace.
Audit @**#1390**.
**Blocked:** none.
