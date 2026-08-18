# Rotated from AGENT-LOOP-JOURNAL.md after #1545 review D-1213–D-1216

## 2026-08-18 06:35 — #1530 review D-1201–D-1204 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `artifact.c` `init_artifacts` 111–116 /
`hack_artifacts` 87–107 / `allmain.c` 792; `do.c` `revive_mon`
2251–2295 / `zombify_mon` 2298–2315 / `timeout.c` 1982–1983 /
`mon.c` `zombie_form` 386–413; `wizcmds.c` `wiz_level_change`
444–487 / `exper.c` `losexp` 214–217; `eat.c` `eatspecial`
2432–2447 / `wield.c` `uwepgone` 873–885 / `apply.c`
`o_unleash` 711–722.
**Change:** reviews **163** ACCEPT D-1201 (memset + gift/Excalibur/
questarti live; `restore_artifacts` / sparse `questarti` named),
**164** ACCEPT-WITH-DEBT D-1202 (callbacks + `mkobj.js` dispatch
live; `gz.zombify` setters / `set_corpsenm` `oeaten` / `fill_pit`
settle named, not Must-fix), **165** ACCEPT D-1203 (drain loop +
`#levelchange` override + `ulevelmax`; `+N sscanf` named),
**166** ACCEPT-WITH-DEBT D-1204 (MAIL pline + snuff/`end_burn`
live; sticky `Blind_w` / local `Tobjnam` clone debt, not
Must-fix). Filled D-1204 archive hash `dbd3a08b`. No new Must-fix
prepend. Open 10 (no refill). Rotated #1515. Rule #2: no fs.
**Score:** cadence **#1530** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.868). Next
@**#1535**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**Blocked:** none.
