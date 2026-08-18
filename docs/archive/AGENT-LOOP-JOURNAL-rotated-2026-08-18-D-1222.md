# Rotated from AGENT-LOOP-JOURNAL.md after D-1222 revive_corpse Soundeffect se_scratching

## 2026-08-18 09:00 — #1538 D-1211 mhitm mdamagem gz.zombify around monkilled

**Objective:** Open — `mhitm.c` `gz.zombify` at monkilled
(named). Not make_corpse.
**C locus:** `mhitm.c` `mdamagem` 1083–1089.
**Change:** wrap both `mdamagem` death `monkilled` calls with
`game.zombify = (!mwep && zombie_maker(magr) && (AT_TUCH ||
AT_CLAW || AT_BITE) && zombie_form(mdef) !== NON_PM)` then
FALSE. Did not pull troll_baned, gulpmm swap, or passivemm
shock. Filled D-1210 archive hash `f1a3518a`. Rotated #1523.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **23**/23; green+strict
seed8000/0900; cohort **12**/12 + strict 0012/0004/1500/1800.
**Next:** Open `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED
(named). Not BURIED.
**Blocked:** none.

## 2026-08-18 08:50 — #1537 D-1210 zombie_maker + xkilled gz.zombify

**Objective:** Open — `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**C locus:** `mon.c` `zombie_maker` 362–379; `xkilled` 3619–3624.
**Change:** `zombie_maker` (S_ZOMBIE except ghoul/skeleton, S_LICH,
!mcan; mndx compare). `xkilled` sets `game.zombify` around
`make_corpse` (`!thrownobj && !stoned && !uwep` + youmonst +
victim `zombie_form`) then FALSE. Did not pull mhitm monkilled
zombify. Filled D-1209 archive hash `b3c0d228`. Rotated #1522.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **12**/12 + strict lengths (fresh
process seed0012).
**Next:** Open `mhitm.c` `gz.zombify` at monkilled (named). Not
make_corpse.
**Blocked:** none.

## 2026-08-18 08:33 — #1536 D-1209 dotelecmd m-prefix mode menu

**Objective:** Open — `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**C locus:** `teleport.c` `dotelecmd` 917–1031; `spell.c`
`tport_spell` 1707–1757; `cmd.c` `C('t')` CMD_M_PREFIX 1890–1891.
**Change:** non-wizard `dotele(FALSE)`; wizard save H/E; `!m`
ignore restrictions; else PICK_ONE n/s/t/w (`w` preselected);
ESC ECMD_OK; `tport_spell` hide/add then reverse; rhack keeps
`menu_requested` for ^T. Snapshot-then-clear (JS split rhack).
Did not pull energy/`spelleffects`, LEVEL_TELEP yn, or
`#teleport` doextcmd. Rotated #1521. Open 10 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/
4500/2200/0014/0004.
**Next:** Open `mon.c` `zombie_maker` + `gz.zombify` at
`make_corpse` (named). Not mhitm.
**Blocked:** none.
