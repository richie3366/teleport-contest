# Rotated from AGENT-LOOP-JOURNAL.md after #1549 D-1220 revive_corpse BURIED FALLTHROUGH impossible

## 2026-08-18 07:36 — #1534 D-1208 dotele trap-at-feet teledest

**Objective:** Open — `teleport.c` `dotele` trap-at-feet teledest
(named). Not vault_tele.
**C locus:** `teleport.c` `dotele` 1041–1161; TELEP_TRAP arm
1054–1066; dispatch 1145–1153; morehungry 1159–1160.
**Change:** `t_at` tseen TELEP_TRAP jump via `u_locomotion`
(Lev/Fly). trap_once vault yn/deltrap then existing
`vault_tele()`. `isok(teledest)` `teleds` (no displace/
settrack). Else D-0789 travelcc+`tele()`. `!trap`
`morehungry(100)`. LEVEL_TELEP yn treated as declined.
Did not pull energy/spellcast or `dotelecmd` m-prefix.
Filled D-1207 archive hash `08d2e6b0`. Rotated #1519.
Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **8**/8 + strict 1500/0012/0360/0361/
4500/2200/0014/0004. Public-unhit unless ^T on a seen
TELEP_TRAP.
**Next:** Open `teleport.c` `dotelecmd` m-prefix mode menu
(named). Not energy gate.
**Blocked:** none.
