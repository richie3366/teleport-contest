# Rotated from AGENT-LOOP-JOURNAL.md after D-1226 run>=2 boulder pline_dir

## 2026-08-18 10:47 — #1543 D-1215 pline_xy/pline_mon

**Objective:** Open — `pline.c` `pline_xy`/`pline_mon`
(named). Not set_msg_dir.
**C locus:** `pline.c` `pline_xy` 126–135 / `pline_mon`
137–150; callee `set_msg_xy` 93–97 then `vpline`. Callers
`weapon.c` 892, `muse.c` 187, `steal.c` 836, `dogmove.c` 460,
`monmove.c` `mb_trapped` 58.
**Change:** `set_msg_xy`+writers in `display.js`; hack
re-exports store. youmonst → (0,0) not ux,uy. Wired live
wield/zap/drop/pickup/`mb_trapped`. Did not pull `set_msg_dir`
/ remaining `pline_mon` / `msg_mon_movement`. Filled D-1214
archive hash `b44c4847`. Rotated #1528. Open 9 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **31**/31; green+strict
seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0060.
**Next:** Open `pline.c` `set_msg_dir` (named). Not pline_xy.
**Blocked:** none.
