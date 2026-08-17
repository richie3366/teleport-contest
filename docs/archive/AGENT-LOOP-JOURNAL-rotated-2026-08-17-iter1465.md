# Rotated from AGENT-LOOP-JOURNAL.md after #1465 review D-1149–D-1152

## 2026-08-17 06:20 — #1450 review D-1137–D-1140 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `region.c` `make_gas_cloud` 1182–1204 /
`create_gas_cloud` 1229–1236; `mon.c` `minliquid_core` 1010–1067
/ `mondata.c` `on_fire` 1411–1445 / `trap.c` `fire_damage_chain`
4550–4572 / `allmain.c` 210–216; `teleport.c` `teleds` 487–504
/ `mon.c` `set_ustuck` 3421–3435; `teleport.c` `teleds` 454,
553–566 / `vault.c` `uleftvault` 256–277.
**Change:** reviews **98** ACCEPT D-1137 (You + `PLNMSG_ENVELOPED_IN_GAS`
after add_region analog; `set_heros_fault`; inside_f HP /
`m_poisongas_ok` named), **99** ACCEPT D-1138 (lava `on_fire` /
`mondead` vs `xkilled` + `fire_damage_chain`; `mon_moving` wrap;
gush is pool-only), **100** ACCEPT D-1139 (`set_ustuck(Null)` +
origin `docrt`; not `unstuck`), **101** ACCEPT-WITH-DEBT D-1140
(vault fake/restore + irate/`mpeaceful=0`; hostile `gd_move`
named no-op, not Must-fix). Must-fix empty. Filled D-1140 archive
hash `36fb8797`. Rotated #1436. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1450** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1455**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `teleds` `invocation_message`. Not
vault_guard.
**Blocked:** none.
