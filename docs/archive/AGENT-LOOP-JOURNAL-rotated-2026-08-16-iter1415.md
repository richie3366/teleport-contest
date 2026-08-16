# Rotated from AGENT-LOOP-JOURNAL.md after #1415 review D-1109–D-1112 + cadence score

## 2026-08-16 19:37 — #1400 review D-1097–D-1100 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `mon.c` `kill_eggs` 5609–5677 / `timeout.c` `kill_egg`;
`read.c` `seffect_genocide` 1722–1738 / `do_class_genocide` 2638–2820
/ `mondata.c` `name_to_monclass` 1090–1176; `teleport.c` `goodpos`
136–164 / `youprop.h` swim–wwalk / `hack.c` `may_passwall` 932–936.
**Change:** reviews **58** ACCEPT D-1097 (`kill_egg` real), **59**
ACCEPT-WITH-DEBT D-1098 (wipe real; `'?'` `list_genocided` stub
named), **60** ACCEPT D-1099 (youprop youmonst pool/lava), **61**
ACCEPT D-1100 (form `passes_walls` + `may_passwall` clone). Must-fix
empty. Filled D-1100 archive hash `305ad188`. Rotated #1385. Open 8
(no refill). Rule #2: no fs.
**Score:** cadence **#1400** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1405**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `goodpos` `GP_AVOID_MONPOS`
`is_exclusion_zone`. Not `onscary`.
**Blocked:** none.
