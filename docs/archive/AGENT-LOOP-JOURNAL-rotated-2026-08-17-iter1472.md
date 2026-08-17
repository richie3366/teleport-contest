# Rotated from AGENT-LOOP-JOURNAL.md after #1472 D-1158 create_gas_cloud_selection

## 2026-08-17 08:03 — #1457 D-1146 inside_gas_cloud damage

**Objective:** Open queue — `region.c` `inside_gas_cloud` damage
(named). Not enveloped pline.
**C locus:** `region.c` `inside_gas_cloud` 1091–1165; `run_regions`
439–456; `create_gas_cloud` 1229–1236; `mon.c` `m_poisongas_ok`
330–357.
**Change:** dam>0 hero sting/`make_blinded`/Half_Phys+towel/`losehp`
or resist cough; mon cough/`setmangry`/blind/`rnd+5` then
`killed`/`monkilled`; local `m_poisongas_ok` (OK/MINOR/BAD);
size-1 envelop gate uses `m_poisongas_ok`; `run_regions` async +
await from `allmain`. Hero inside_f still geometric (walk
`in_out_region` named). Did not pull expire dissipation plines,
fumaroles whoosh, `create_gas_cloud_selection`, or mfndpos's
thinner `mon.js` `m_poisongas_ok`. Filled D-1145 archive hash
`623bc861`. Rotated #1442. Open 12 after archive+refill. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **76**/76; green+strict seed8000/0900;
cohort **20**/20 (0002 drinksink + 0014 fountain + 0361/0383 fog
ttl + 0006/0007/0106/0108/0360/2200/0004/0009/0030/0012/0116/1500/
1800/0060/0102/0700) + strict 8000/0900/0002/0014/0006/0361/0383/
0360/0030/2200/0108/0004/0007/0012. Path public-unhit on dam>0 HP
(fog ttl still matches).
**Next:** Open `do_name.c` `rndcolor` (named from hcolor). Not
sit/apply identity stubs.
**Blocked:** none.
