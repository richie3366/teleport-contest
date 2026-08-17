# Rotated from AGENT-LOOP-JOURNAL.md after #1471 D-1157 walk in_out_region

## 2026-08-17 07:42 — #1456 D-1145 Excalibur :441 update_inventory

**Objective:** Open queue — `fountain.c` Excalibur `:441`
`update_inventory` (named). Not artidisco save.
**C locus:** `fountain.c` `dipfountain` 441; `invent.c`
`update_inventory` 2781–2809; `wintty.c` `tty_update_inventory`
3606–3614.
**Change:** after Lady of the Lake gift or deny, call
`update_inventory()` before the ROOM analog (C order; both arms).
Existing D-1126 callee: in_moveloop / `suppress_map_output` /
suppress_price=0 around tty `sync_perminvent`. Default perm_invent
Off no RNG. Excalibur `return` still skips `:552` (C). Did not pull
artidisco save/rest, On WIN_INVEN, or `consume_obj_charge` known.
Filled no prior hash gap. Rotated #1441. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **38**/38; green+strict seed8000/0900;
cohort **20**/20 (0014 fountain + 0106 dip + 0007 snakes + 0002
drinksink + 0006 demon + knight 0103/0104/4500 + 0108/0360/2200/
0004/0009/0030/0012/0116/0367/1500/1800/0060) + strict 8000/0900/
0014/0106/0006/0007/0002/0103/0104/4500/0108/0360/2200/0004/0030.
Path public-unhit (perm_invent Off; Excalibur dip unhit).
**Next:** Open `region.c` `inside_gas_cloud` damage. Not enveloped
pline.
**Blocked:** none.
