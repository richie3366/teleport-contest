# Rotated from AGENT-LOOP-JOURNAL.md after #1377 D-1082

## 2026-08-16 11:02 — #1363 D-1073 dosit OBJ_AT picnic teeter/shaft skip

**Objective:** Open queue — `sit.c` `dosit` OBJ_AT gate: skip picnic
when `uteetering_at_seen_pit` or `uescaped_shaft` like C.
**C locus:** `sit.c` `dosit` (~437–439); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`.
**Change:** export those helpers from `trap.js` (C home); `do.js`
`flooreffects` uses the exports (deleted locals). Picnic `if` is
`obj && !(uteetering || uescaped)`. In-pit `TT_PIT` still picnics.
Did not pull `can_reach_floor(check_pit)` / meager hoard /
`lay_an_egg`. Rule #2: no fs. Rotated #1348 to archive.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private helper/gate canary; green+strict seed8000/0900;
cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `sit.c` `dosit` dragon coin hoard `money_cnt` meager.
**Blocked:** none.

## 2026-08-16 10:52 — #1362 review D-1072 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`55906000` D-1072) against pinned C,
not the journal. Docs-only `4ee4c056` cadence #1360 noted, not a
port claim.
**C locus:** `sit.c` `dosit` (~422–429); `mondata.c` `sticks` /
`pronoun_gender`; `you.h` `mhis`; `do_name.c` `Monnam`.
**Change:** review **33** ACCEPT (lap `ustuck && !sticks(hero)`
with engrave `sticks` export C AT 7/11, not `monmove.js` 6/7;
`Monnam` imported; local `mhis` non-hallu matches
`pronoun_gender`; hugs still air). Must-fix empty. Filled
Addressed hash `55906000`. No `js/` edits. Rule #2: no fs.
Rotated #1347 to archive.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** C read of `sit.c:400–435`, `engrave.c:191–199`,
`mondata.c:654–658`/`1191–1207`, `you.h:317–324`,
`do_name.c:1074–1079`, `role.c:688–694`, `monsters.h` eel/mimic
ATTK; JS `sit.js:155–181`/`1054–1085`, `engrave.js:233–274`,
`monmove.js:1315–1328`; grep FORCE/fs on the hunks.
**Next:** Open `sit.c` `dosit` OBJ_AT `uteetering`/`uescaped_shaft`
gate.
**Blocked:** none.
