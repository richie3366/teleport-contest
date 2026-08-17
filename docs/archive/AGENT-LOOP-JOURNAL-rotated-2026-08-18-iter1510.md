# Rotated from AGENT-LOOP-JOURNAL.md after #1510 review D-1185–D-1188 + cadence

## 2026-08-17 20:50 — #1495 review D-1173–D-1176 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `mnexto` 3974–3978 / `teleport.c`
`control_mon_tele` 1898–1934; `mhitm.c` `mdisplacem` 178–267 /
`region.c` 598–611; `allmain.c` 481 / `monmove.c`
`m_everyturn_effect` 650–663; `dothrow.c` `mhurtle_step` 1000 /
`region.c` `m_in_out_region` 533–576.
**Change:** reviews **134** ACCEPT D-1173 (`control_mon_tele(..., FALSE)`
+ savemm copy; public Off; not rloc via_rloc TRUE), **135** ACCEPT
D-1174 (real `mdisplacem` + region after defender tail; `should_displace`
keeps public arm unhit), **136** ACCEPT D-1175 (Fog at current `u.ux`
after bot before `context.move`; not `ux0` trail), **137** ACCEPT
D-1176 (`will_hurtle && m_in_out_region` three-loop; gas never rejects;
`place_monster` vs rloc named). Must-fix empty. Filled D-1176 archive
hash `b652fbf3`. Rotated #1480. Open 8 (no refill). Rule #2: no fs.
**Score:** cadence **#1495** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1500**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `do.c` `goto_level` `obj_delivery` (named). Not
in_out_region.
**Blocked:** none.
