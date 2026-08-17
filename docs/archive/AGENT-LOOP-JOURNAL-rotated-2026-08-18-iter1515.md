# Rotated from AGENT-LOOP-JOURNAL.md after #1515 review D-1189–D-1192

## 2026-08-17 21:40 — #1500 review D-1177–D-1180 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dokick.c` `obj_delivery` 1769–1851 / `do.c` 1815+1978;
`shk.c` `fix_shop_damage` 4849–4874 / `repair_damage` 4731–4845;
`do.c` `do_fall_dmg` 1805–1809 + 1988–1994; `teleport.c`
`rloc_to_core` 1658–1659 + 1712–1719.
**Change:** reviews **138** ACCEPT D-1177 (XOR FALSE/TRUE +
`OBJ_MIGRATING` extract; `rloco` internals / wizkit named), **139**
ACCEPT D-1178 (`!new` catchup; silent post-`block_point`;
`shk_fixes_damage` named), **140** ACCEPT D-1179 (`d(max(dist,1),6)`
after catchup; `ballfall` / W-tower bit 2 named), **141** ACCEPT
D-1180 (reappear suffix + same-cell return; ustuck / `RLOC_ERR`
named). Must-fix empty. Filled D-1180 archive hash `665bbe09`.
Rotated #1485. Open 9 (no refill). Rule #2: no fs.
**Score:** cadence **#1500** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.87). Next
@**#1505**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `rloc` `RLOC_ERR` impossible() (named).
Not vanish-msg.
**Blocked:** none.
