## 2026-07-22 03:10 — #1256 D-0986 throne/tree + fall_through

**Objective:** map-driven — finish `kick_nondoor` throne/tree
(CURRENT next cluster after D-0985).
**C locus:** `dokick.c` kick_nondoor IS_THRONE/IS_TREE; `trap.c`
`fall_through` + hero `trapeffect_hole`; `explode.c` `scatter`.
**Changed:** throne destroy/loot/`fall_through`; tree fruit scatter +
bee swarm; export thin `scatter` + `fall_through` — D-0986.
Deferred: `kick_object`; scatter MAY_FRACTURE/shop/flooreffects.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing). Rule #2: no fs.
**Next:** `kick_object` (bhit KICKED_WEAPON/flooreffects); or
flooreffects pit; absent.md thin.
**Blocked:** none.
## 2026-07-22 03:00 — #1255 cadence + D-0985 kick_nondoor

**Objective:** cadence full `sessions` @#1255; map-driven
`kick_nondoor` SDOOR/furniture (CURRENT next cluster).
**C locus:** `dokick.c` kick_nondoor; `pray.c` altar_wrath;
`engrave.c` disturb_grave; `fountain.c` sink_backs_up.
**Changed:** port SDOOR/SCORR + altar/fountain/grave/bars/sink;
export helpers — D-0985. Deferred: throne fall_through; tree
scatter; kick_object.
**Verified:** cadence **43**/44 Scr **11404**/11405 RNG **100%**
speed `30+0.27/turn` (seed0009 Scr 72/73); green+strict PASS;
kick cohort **19**/20. Rule #2: no fs.
**Next:** kick_object / throne fall_through / tree; or flooreffects.
**Blocked:** none.
