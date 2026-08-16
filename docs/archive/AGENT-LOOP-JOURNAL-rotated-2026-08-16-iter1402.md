# Rotated from AGENT-LOOP-JOURNAL.md after #1402 D-1102

## 2026-08-16 16:56 — #1387 D-1090 is_pool/is_moat DRAWBRIDGE_UP+DB_MOAT

**Objective:** Open queue — `dbridge.c` `is_pool` / `is_moat`
DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`.
**C locus:** `dbridge.c` `is_pool` 46–58 / `is_moat` 100–113;
`rm.h` `DB_MOAT=0` / `DB_UNDER=28`.
**Change:** shared `hack.js` `is_pool`/`is_moat` match C
(Juiblex MOAT is pool not moat). Deleted `mfndpos_is_pool`;
dig/zap import shared `is_moat`. Stamped review **38** named
omit **Addressed:** D-1090. Filled D-1089 hash `f91650c0`.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **41**/41 (POOL/MOAT/WATER;
UP+DB_MOAT ± dir; UP+LAVA/ICE/FLOOR false; DOWN false;
juiblex MOAT pool-not-moat / UP+MOAT neither); green+strict
seed8000/0900; cohort **13**/13 (1500/1800/0060/0102/0700/
0017/0106/0107/4500/0014/0360/2200/0009) + sit/liquid strict.
Path public-unhit for DRAWBRIDGE_UP moat.
**Next:** Open `teleport.c` `goodpos` `is_pool()`/`is_lava()`
not `IS_POOL`/`IS_LAVA`. Audit @**#1390**.
**Blocked:** none.

