# Rotated from AGENT-LOOP-JOURNAL.md after #1376 D-1081

## 2026-08-16 10:45 — #1361 D-1072 dosit ustuck !sticks lap

**Objective:** Open queue — `sit.c` `dosit` ustuck `!sticks` lap
(`Monnam` / `mhis`). Not swallow combat.
**C locus:** `sit.c` `dosit` (~422–429); `mondata.c` `sticks`;
`you.h` `mhis` / `mondata.c` `pronoun_gender`; `do_name.c` `Monnam`.
**Change:** after `can_reach_floor(FALSE)` succeeds, C
`u.ustuck && !sticks(youmonst.data)` → humanoid
`Monnam`/`mhis` lap else `Monnam` has no lap; `ECMD_OK`.
Engrave `sticks` export (C AT 7/11), not `monmove.js`.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private node eel/mimic/trapper no-lap; hobbit offer
lap; owlbear air; python hero sits; swallow no seats.
green+strict PASS; cohort **14**/14. Rotated #1346 to archive.
**Next:** Open `sit.c` `dosit` OBJ_AT `uteetering`/`uescaped_shaft`
gate.
**Blocked:** none.
