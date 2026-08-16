# Rotated from AGENT-LOOP-JOURNAL.md after #1363 D-1073

## 2026-08-16 07:15 — #1348 D-1066 tut-1 tutorial() nhcore disable

**Objective:** Open queue — tut-1 nhcore callback disable on
enter/leave only (not Lua cmd_before/`tutorial_turn` / Knight jump).
**C locus:** `nhlua.c` `tutorial` / `l_nhcore_call` / `l_nhcore_init`;
`do.c` `goto_level`; `dat/nhcore.lua` enter/leave_tutorial;
`dat/nhlib.lua` `tutorial_enter`/`tutorial_leave`.
**Change:** `goto_level` calls `tutorial()`. `l_nhcore_init` fills
`nhcore_call_available` TRUE. After leave, both ENTER/LEAVE FALSE.
Lua `nh.callback` cmd_before/`tutorial_turn` still named. Rule #2:
no fs. Rotated #1333 to archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node enter keeps available + stash; leave
disables both; second enter skips; nil start_new_game disables that
slot; GETPOS stays TRUE. green+strict PASS; seed0009 **73**/73;
cohort **12**/12.
**Next:** Open `dosit` steed `mon_nam(usteed)`.
**Blocked:** none.
