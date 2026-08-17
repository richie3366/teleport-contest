# Rotated from AGENT-LOOP-JOURNAL.md after #1457 D-1146 inside_gas_cloud damage

## 2026-08-17 04:35 — #1442 D-1134 dipfountain after-switch update_inventory

**Objective:** Open queue — `fountain.c` `dipfountain`
`update_inventory` after switch (named). Not Excalibur gift.
**C locus:** `fountain.c` `dipfountain` 552; `invent.c`
`update_inventory` 2781–2809; `wintty.c` `tty_update_inventory`
3606–3614.
**Change:** after the `rnd(30)` switch, call `update_inventory()`
then `dryup` (C order; unconditional, unlike drinkfountain case 24
`buc_changed`). Existing D-1126 callee: in_moveloop /
`suppress_map_output` / suppress_price=0 around tty
`sync_perminvent`. Default perm_invent Off no RNG. Did not pull
Excalibur `:441`, On WIN_INVEN, or `consume_obj_charge` known.
Filled D-1133 archive hash `a956e990`. Rotated #1427. Open 9 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **28**/28; green+strict seed8000/0900;
cohort **21**/21 (0014 fountain + 0106 dip + 0007 snakes + 0002
drinksink + 0006 demon + 0108 + 0360/2200/4500 + 0004/0009/0012/
0030/0383/0399/0116/0367/0398 + 1500/1800/0060) + strict 0014/0007/
0002/0006/0106/0108/0360/2200/4500/0030/0004/0009. Path
public-unhit (perm_invent Off).
**Next:** Open `do_name.c` `hcolor` Hallucination drinksink
synonyms. Not hliquid.
**Blocked:** none.
