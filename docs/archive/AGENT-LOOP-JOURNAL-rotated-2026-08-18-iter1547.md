# Rotated from AGENT-LOOP-JOURNAL.md after #1547 D-1218 opt_accessiblemsg

## 2026-08-18 06:56 — #1532 D-1206 scrolltele steed whobuf

**Objective:** Open — `teleport.c` `scrolltele` steed whobuf
(named). Not unconscious.
**C locus:** `teleport.c` `scrolltele` 877–882 after unconscious
before learnscroll/getpos; `do_name.c` `mon_nam`.
**Change:** `whobuf` `"you"` then if `u.usteed` append
`" and " + mon_nam(usteed)` (not `y_monnam`). Did not pull
dotele trap-at-feet or dotelecmd m-prefix. Filled D-1205
archive hash `f389c2b4`. Rotated #1517. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **33**/33; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless controlled teleport
while riding.
**Next:** Open `pline.c` `vpline` accessiblemsg consume (named).
Not set_msg_xy.
**Blocked:** none.
