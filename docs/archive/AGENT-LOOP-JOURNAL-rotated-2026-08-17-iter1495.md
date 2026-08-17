# Rotated from AGENT-LOOP-JOURNAL.md after #1495 review D-1173–D-1176

## 2026-08-17 15:55 — #1480 review D-1161–D-1164 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `rloc_to_core` 1685 / `region.c`
`update_monster_region` 598–611; `teleport.c` 1651 / 1739–1740 /
`shk.c` `make_angry_shk` 1470–1488 / `inhishop` 1039–1048;
`teleport.c` 1742–1758 / `shk.c` `stolen_value` 3754–3871 /
`onshopbill` 1160–1163; `teleport.c` 1765–1767 / `trap.c`
`mintrap` 3733–3789.
**Change:** reviews **122** ACCEPT D-1161 (absolute membership after
place before tail; mhitm/dbridge named), **123** ACCEPT D-1162
(origin `inhishop` snap + real `hot_pursuit`; D-log “bill fold”
overclaims `addupbill` stub 0 — named, not Must-fix), **124**
ACCEPT D-1163 (dest `!costly_spot` minvent walk; unpaid-not-on-bill
ordinary), **125** ACCEPT D-1164 (dest-bare clear; dest-trap
already-trapped `rn2(40)` not trapeffect; occupation /
`m_easy_escape_pit` named). Must-fix empty. Filled D-1164 archive
hash `6f7e188b`. Rotated #1465. Open 10 (no refill). Rule #2: no fs.
**Score:** cadence **#1480** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1485**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dothrow.c` `hurtle_step` `in_out_region` (named).
Not walk.
**Blocked:** none.
