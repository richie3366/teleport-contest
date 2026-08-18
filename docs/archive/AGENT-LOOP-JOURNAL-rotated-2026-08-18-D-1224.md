# Rotated from AGENT-LOOP-JOURNAL.md after D-1224 LEVEL_TELEP yn

## 2026-08-18 09:50 — #1540 review D-1209–D-1212 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `dotelecmd` 917–1031 / `spell.c`
`tport_spell` 1707–1757 / `cmd.c` `C('t')` 1890–1891; `mon.c`
`zombie_maker` 362–379 / `xkilled` 3619–3624; `mhitm.c`
`mdamagem` 1083–1089; `do.c` `revive_corpse` 2183–2215 /
`do_name.c` `Adjmonnam` 1142–1148 / `mondata.c` `locomotion`
1380–1392.
**Change:** reviews **171** ACCEPT-WITH-DEBT D-1209 (n/s/t/w +
live `tport_spell`; `'s'` still fail-closed in `dotele`, named),
**172** ACCEPT-WITH-DEBT D-1210 (maker + xkilled wrap live;
`dothrow` `thrownobj` thin, not Must-fix), **173**
ACCEPT-WITH-DEBT D-1211 (`mdamagem` wrap live; troll_baned/
gulpmm named), **174** ACCEPT-WITH-DEBT D-1212 (MINVENT/CONTAINED
+ `Adjmonnam`; buried non-zomb `impossible` named). Filled
D-1212 archive hash `fc314871`. No new Must-fix prepend.
Open 12 (no refill). Rotated #1525. Rule #2: no fs.
**Score:** cadence **#1540** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.829). Next
@**#1545**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `dig.c` `rot_corpse` invent/minvent worn plines
(named). Not REVIVE.
**Blocked:** none.
