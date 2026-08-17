# Rotated from AGENT-LOOP-JOURNAL.md after #1475 review D-1157–D-1160

## 2026-08-17 08:50 — #1460 review D-1145–D-1148 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `fountain.c` `dipfountain` 441 / `invent.c`
`update_inventory` 2781–2809; `region.c` `inside_gas_cloud`
1091–1165 / `run_regions` 439–456 / `mon.c` `m_poisongas_ok`
330–357; `do_name.c` `rndcolor` 1468–1477 / `trap.c` 6474–6476;
`mon.c` `deal_with_overcrowding` 3986–3995 / `mongone` 3267–3282
/ `elemental_clog` 3878–3949.
**Change:** reviews **106** ACCEPT D-1145 (`:441` both arms; callee
default no-op), **107** ACCEPT D-1146 (dam>0 HP + local
`m_poisongas_ok`; expire/mfndpos named), **108** ACCEPT D-1147
(always `rn2(16)`; Blind `blindgas`; only C caller), **109**
QUALITY-RISK D-1148 (limbo/clog pick match; clog victim
`mongone` `minvent=null` skips `mdrop_special_objs`). Must-fix
prepend that `mongone` family. Filled D-1148 archive hash
`27274b3b`. Rotated #1445. Open 10 + Must-fix 1 (no refill).
Rule #2: no fs.
**Score:** cadence **#1460** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.28/turn` (R² 0.87). Next
@**#1465**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix `mon.c` `mongone` `mdrop_special_objs` then
discard (elemental_clog victim). Not worn extract. Not
`invocation_message`.
**Blocked:** none.
