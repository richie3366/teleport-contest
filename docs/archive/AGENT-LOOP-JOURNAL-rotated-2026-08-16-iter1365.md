# Rotated from AGENT-LOOP-JOURNAL.md after #1365 review D-1073/D-1074 + cadence

## 2026-08-16 07:40 — #1350 review D-1066/D-1067 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`7e330128` D-1066, `2e50b318` D-1067)
against pinned C, not the journal; cadence full `sessions`.
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` / `nhlib.lua`; `sit.c` `dosit`
406–408; `do_name.c` `mon_nam` / `x_monnam` ARTICLE_THE.
**Change:** review 27 ACCEPT (`tutorial()` then both ENTER/LEAVE
FALSE; Lua NHCB / GETPOS_TIP / `leaving_tutorial` FREEING named).
Review 28 ACCEPT (`You`+`mon_nam`, not `y_monnam`; one-pline density
note). Must-fix empty. Filled Addressed hash `2e50b318`. No `js/`
edits. Rule #2: no fs. Rotated #1335 to archive.
**Score:** cadence **#1350** **44**/44 Scr **11405**/11405 RNG **100%**
speed `31+0.26/turn` (R² 0.87). Next @**#1355**.
**Verified:** C read of `nhlua.c:140–194`/`1837–1846`, `do.c:1503–1515`
/`1640–1664`, `sit.c:406–409`, `do_name.c:1042–1046`/`1117–1128`,
`pline.c:366–374`, pinned `nhcore.lua` table; hunks grepped FORCE/fs.
Full `sessions` **44**/44; role-init throws **0**/44.
**Next:** Open empty; remaining `dosit` hider / `can_reach_floor` /
`ustuck` or `debt.md`.
**Blocked:** none.
