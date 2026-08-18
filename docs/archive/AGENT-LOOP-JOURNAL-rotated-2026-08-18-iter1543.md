# Rotated from AGENT-LOOP-JOURNAL.md after #1543 D-1215 pline_xy/pline_mon

## 2026-08-18 06:02 — #1528 D-1203 wiz_level_change drain

**Objective:** Open — `cmd.c` `wiz_level_change` (named). Not
notice_mon_off.
**C locus:** `wizcmds.c` `wiz_level_change` 444–487; `exper.c`
`losexp` 214–217 (`#levelchange` nulls drainer before
`resists_drli`); registered `cmd.c` extcmdlist.
**Change:** drain loop `losexp("#levelchange")` + clamp `<1` to
1; `u.ulevelmax = u.ulevel` after drain/raise; `losexp`
override so Drain_resistance does not block the wizard request
and it is never fatal; ESC/empty → Never_mind + ECMD_OK.
Did not pull `makemap_prepost` / `wiz_makemap`, Upolyd mh, or
level-1 `done(DIED)`. Filled D-1202 archive hash `dfed1743`.
Rotated #1513. Open 11 after archive (no refill). Rule #2: no
fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** `losexp` canary **9**/9; green+strict
seed8000/0900; cohort **16**/16 + strict lengths (0360/0361/
0373/0108/0116/0006/2200/4500/1500/1800/0004/0012/0367/0398).
Public raise tours unhit on the drain arm.
**Next:** Open `eat.c` `eatspecial` (named). Not doeat_nonfood.
**Blocked:** none.
