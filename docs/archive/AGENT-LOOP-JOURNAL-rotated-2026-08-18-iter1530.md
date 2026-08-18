# Rotated from AGENT-LOOP-JOURNAL.md after #1530 review D-1201–D-1204

## 2026-08-18 01:05 — #1515 review D-1189–D-1192 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `cmd.c` rhack 3833–3834 / `hacklib.c` `visctrl`
469–493; `do.c` `goto_level` 1817 / `mon.c` 5639–5677; `do.c`
1818–1823 / `timeout.c` 2222–2241; `allmain.c` 826–829 /
`files.c` 2537–2601 / `cfgfiles.c` 1214–1218.
**Change:** reviews **151** ACCEPT D-1189 (`visctrl(key)` `^C`;
callee live), **152** ACCEPT D-1190 (`kill_genocided` after
`losedogs`; `newcham` named), **153** ACCEPT D-1191 (`run_timers`
after wipe; REVIVE named), **154** ACCEPT-WITH-DEBT D-1192
(overflow FALSE at hero live; `wizkit_wishing` unread / `WIZKIT=`
spaces-colon / EOF leftover clone debt, not Must-fix). Filled
D-1192 archive hash `cf9eb066`. No new Must-fix prepend. Open 12
(no refill). Rotated #1500. Rule #2: no fs.
**Score:** cadence **#1515** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.875). Next
@**#1520**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dokick.c` `deliver_obj_to_mon` (named). Not
obj_delivery.
**Blocked:** none.
