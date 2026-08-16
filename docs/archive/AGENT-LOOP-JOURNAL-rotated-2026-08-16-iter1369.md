# Rotated from AGENT-LOOP-JOURNAL.md after #1369 D-1077 is_lava DRAWBRIDGE_UP

## 2026-08-16 09:45 — #1354 D-1069 dosit can_reach_floor swallow/tumble/air

**Objective:** Open queue — `sit.c` `dosit` `can_reach_floor(FALSE)`:
swallow “no seats” / Levitation tumble / sitting on air. Replace JS
Levitation-only early return.
**C locus:** `sit.c` `dosit` (~414–421); `engrave.c` `can_reach_floor`;
`youprop.h` `Levitation`.
**Change:** after hider clear, call shared `can_reach_floor(false)`
(dynamic import; sit←engrave←hack←eat←sit) and the three C messages.
Air/water Levitation may sit. Did not port ustuck lap or helper
hugs/ceiling_hider. Rotated #1339 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** private node swallow no-seats; dungeon tumble; air/water
sit; lurker still sits after hide clear. green+strict PASS; cohort
**9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path unhit.
**Next:** Open `dosit` ustuck `!sticks` lap.
**Blocked:** none.
