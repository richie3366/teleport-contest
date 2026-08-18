# Rotated from AGENT-LOOP-JOURNAL.md after #1525 review D-1197–D-1200 + cadence score

## 2026-08-18 00:35 — #1510 review D-1185–D-1188 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `do_wear.c` `doddoremarm` 3022–3056 / `invent.c`
`wearing_armor` 2149–2152; `cmd.c` `do_rush`/`do_run` 1590–1617 /
rhack PREFIXCMD 3762–3801; `hack.c` `avoid_trap_andor_region`
2515–2581 / `trap.c` `immune_to_trap` 2783–2934; `teleport.c`
`domagicportal` 1444–1488.
**Change:** reviews **147** ACCEPT D-1185 (empty-worn `A`; `\e[72C`
was truncated capture, not H2344), **148** ACCEPT D-1186 (`g`/`G`
PREFIXCMD keep-run; `rhack(0)` firsttime multi), **149**
ACCEPT-WITH-DEBT D-1187 (portal yn live; sticky
`Stunned`/`Confusion` clone debt, not Must-fix), **150** ACCEPT
D-1188 (`feeltrap`+`domagicportal`; ATSTAIRS; callees live).
Filled D-1188 archive hash `c58efd08`. No new Must-fix prepend.
Open 10 + visctrl = 11 (no refill). Rotated #1495. Rule #2: no fs.
**Score:** cadence **#1510** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87). Next
@**#1515**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix seed8243 `cmd.c` rhack `visctrl` `^C`. Not
maybe_smudge_engr.
**Blocked:** none.
