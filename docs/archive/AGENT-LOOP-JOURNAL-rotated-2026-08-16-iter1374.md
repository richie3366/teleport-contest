# Rotated from AGENT-LOOP-JOURNAL.md after #1374 D-1080

## 2026-08-16 10:28 — #1359 review D-1070/D-1071 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`9d3545c9` D-1070, `aa96e08c` D-1071)
against pinned C, not the journal.
**C locus:** `engrave.c` `can_reach_floor`; `youprop.h` `Levitation`;
`mondata.c` `sticks`/`attacktype`/`dmgtype`; `monattk.h` `AT_HUGS`;
`sit.c` `dosit` message `Levitation`.
**Change:** reviews **31** ACCEPT (helper + sit clone `(H||E)&&!B`,
no sticky-true) and **32** ACCEPT (hugs conjunct in C `||` order;
local `sticks` matches C 7/11/19/28, not `monmove.js` 6/7). Must-fix
empty. Filled Addressed hash `aa96e08c`. No `js/` edits. Rule #2:
no fs. Rotated #1344 to archive.
**Score:** fortress unchanged (cadence **#1355** **44**/44; next
@**#1360**).
**Verified:** C read of `engrave.c:187–214`, `sit.c:414–429`,
`youprop.h:235–255`, `mondata.c:42–57`/`654–658`/`700–714`,
`monattk.h:11–21`/`61`/`70`, `do_wear.js:284–288`; generated
owlbear/python/eel/trapper `mattk`; grep FORCE/fs on the
`js/engrave.js` hunks.
**Next:** Open `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` /
`mhis`). Use C `sticks`, not `monmove.js`.
**Blocked:** none.
