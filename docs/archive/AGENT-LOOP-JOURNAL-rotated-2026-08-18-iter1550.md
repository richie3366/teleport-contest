# Rotated from AGENT-LOOP-JOURNAL.md after #1550 review D-1217–D-1220 + cadence

## 2026-08-18 07:55 — #1535 review D-1205–D-1208 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `scrolltele` 874–882 / `trap.c`
`unconscious` 6776–6786; `do_name.c` `mon_nam` 1041–1046;
`pline.c` `vpline` 162–189 / `getpos.c` `coord_desc` 557–635 /
`cmd.c` `directionname` 4313–4322; `teleport.c` `dotele`
1041–1161 / `hack.c` `u_locomotion` 1817–1828.
**Change:** reviews **167** ACCEPT D-1205 (unconscious fail then
`safe_teleds`; clone matches `trap.c` prefixes), **168** ACCEPT
D-1206 (`whobuf` + imported `mon_nam`, not `y_monnam`; §2b thin
but C-exact), **169** ACCEPT-WITH-DEBT D-1207 (`pline`/`Norep`
consume live; `opt_accessiblemsg`/`pline_xy` named Open, not
Must-fix), **170** ACCEPT-WITH-DEBT D-1208 (`teleds`/vault/`!trap`
hunger live; LEVEL_TELEP yn + energy named, not Must-fix).
Filled D-1208 archive hash `bd8c2161`. No new Must-fix prepend.
Open 11 (no refill). Rotated #1520. Rule #2: no fs.
**Score:** cadence **#1535** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `34+0.28/turn` (R² 0.871). Next
@**#1540**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**Blocked:** none.
