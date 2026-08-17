# Rotated from AGENT-LOOP-JOURNAL.md after #1490 review D-1169–D-1172 + cadence

## 2026-08-17 14:40 — #1475 review D-1157–D-1160 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `hack.c` `domove_core` 2866–2868 / `region.c`
`in_out_region` 480–527 / `is_hero_inside_gas_cloud` 1168–1176;
`region.c` `create_gas_cloud_selection` 1311–1336 / `sp_lev.c`
`lspo_gas_cloud` 4928–4965 / `themerms.lua` Cloud 62–69;
`mon.c` `m_poisongas_ok` 330–357 / `mfndpos` 2172, 2240;
`teleport.c` `rloc_to_core` 1702 / `steed.c` `place_monster`
929 / `monmove.c` `set_apparxy` 2198–2266.
**Change:** reviews **118** ACCEPT D-1157 (walk await + bit helper;
hurtle/`goto_level`/`run_regions` inside_f named), **119** ACCEPT
D-1158 (1×1 bitmap ttl −1 + Cloud `floor(n/4)` fog; xy
`get_location` named), **120** ACCEPT D-1159 (vamp/eel/breath OK;
MINOR still avoids; worn `Resists_Elem` named), **121** ACCEPT
D-1160 (drop mux=hero; real `set_apparxy` after dest `newsym`;
`update_monster_region` named). Must-fix empty. Filled D-1160
archive hash `8efa62e9`. Rotated #1460. Open 9 (no refill).
Rule #2: no fs.
**Score:** cadence **#1475** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1480**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy.
**Blocked:** none.
