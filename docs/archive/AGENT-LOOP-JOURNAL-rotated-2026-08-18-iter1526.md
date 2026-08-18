# Rotated from AGENT-LOOP-JOURNAL.md after #1526 D-1201 init_artifacts

## 2026-08-18 00:40 — #1511 D-1189 cmd.c rhack visctrl ^C

**Objective:** Must-fix human canary seed8243 `cmd.c` rhack
`Unknown command` `visctrl(key)` so Ctrl-C is `^C` not raw ETX.
Not `maybe_smudge_engr`. Not `kill_genocided`.
**C locus:** `cmd.c` `rhack` 3833–3834 /
`hacklib.c` `visctrl` 469–493.
**Change:** unknown-command pline uses existing
`dokeylist.js` `visctrl(key)`. Did not pull
`custompline(SUPPRESS_HISTORY)`, `cmdq_clear` CQ_REPEAT, or
`sanity_no_check`. Rotated #1496. Open 10 (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** private canary Scr **129**/129 RNG **2768**/2768;
green+strict seed8000/0900; cohort **18**/18 + strict
1500/1800/2200/0009/0361/0012.
**Next:** Open `do.c` `goto_level` `kill_genocided_monsters`
(named). Not `run_timers`.
**Blocked:** none.
