# Rotated from AGENT-LOOP-JOURNAL.md after #1522 D-1198 migrate_to_level W-tower xyflags bit 2

## 2026-08-17 23:55 — #1507 D-1186 cmd.c g/G PREFIXCMD rush

**Objective:** Must-fix human canary seed8243 `cmd.c` `g` rush
prefix vs JS Unknown command. Not maybe_smudge. Not offx.
**C locus:** `cmd.c` `do_rush`/`do_run` 1588–1617 / `set_move_cmd`
1387–1399 / rhack PREFIXCMD + `DOMOVE_RUSH` 3762–3801.
**Change:** `rhack` `g`→run=2 / `G`→run=3 + `DOMOVE_RUSH`,
`move=0` like `F`/`m` (no inner `parse` getch). Following walk
keeps run and sets first-step multi/mv. Double-prefix cancel;
non-walk after pending prefix pline. Did not pull nested F+g/G.
Filled D-1185 archive hash `4750946a`. Rotated #1492. Open 10 +
Must-fix portal yn = 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **106→107**/129 (`g` Unknown gone; @22
empty); remaining @107 ParanoidTrap portal yn; green+strict
seed8000/0900; cohort **8**/8
(1500/1800/0700/0361/0014/2200/0009/0012) + strict
1500/0700/0009/0361.
**Next:** Must-fix seed8243 `hack.c` `avoid_trap_andor_region`
ParanoidTrap portal yn. Not maybe_smudge_engr.
**Blocked:** none.
