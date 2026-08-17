# Rotated from AGENT-LOOP-JOURNAL.md after #1482 D-1166 goto_level in_out_region

## 2026-08-17 12:32 — #1467 D-1154 inv_pos / VIBRATING_SQUARE

**Objective:** Open — `mkmaze.c` `inv_pos` / VIBRATING_SQUARE
(named from invocation_pos). Not teleds.
**C locus:** `mkmaze.c` `pick_vibrasquare_location` 1042–1093 /
`makemaz` 1214–1216; `sp_lev.c` `create_trap` VS 1818–1821;
`hellfill.lua` 437–441; `mklev.c` `occupied` 1806–1811.
**Change:** port `pick_vibrasquare_location` (`svi.inv_pos`,
upstairs row/col/diag/`distmin<=11`, `SPACE_POS`, `occupied`;
no-upstairs short-circuit). `create_trap(VS)` then `maketrap`.
hellfill Invocation_lev → VS else down stair. `occupied`
`invocation_pos`. Did not pull `makemaz("")` create_maze,
`Can_dig_down` !Invocation_lev, apply.js clone, or shared
`dungeon.c` export. Filled D-1153 archive hash `b332516f`.
Rotated #1452. Open 10 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1465** **44**/44; next
@**#1470**).
**Verified:** private canary **33**/33 (range; stairs
row/col/diag/distmin; SPACE_POS; no-stairs 2 `rn2`; occupied +
`invocation_pos` on/off Invocation_lev; botlevel/not-hellish;
maketrap VS / undestroyable; fountain/trap/STONE skip; pool;
stale 99,99; (0,0) vs (1,0); !isok); green+strict seed8000/0900;
cohort **24**/24 (0360/4500 hellfill + 0012 vault + 0004 pony +
2200/0030/0002/0006/0007/0009/0014/0017/0060/0102/0106/0108/
0116/0361/0367/0373/0383/0700/1500/1800) + strict
0012/0004/0360/4500/2200/0030/0002/0367. Path public-unhit on
Invocation_lev.
**Next:** Open `region.c` `expire_gas_cloud` dissipation plines
(named). Not inside_gas HP.
**Blocked:** none.
