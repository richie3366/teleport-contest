# Rotated from AGENT-LOOP-JOURNAL.md after #1393 D-1095 split_mon rust/minliquid/uhitm AD_COLD

## 2026-08-16 14:38 — #1378 D-1083 can_reach_floor check_pit teeter/shaft

**Objective:** Open queue — `engrave.c` `can_reach_floor(check_pit)`
teeter/shaft (named from D-1073). Not ceiling_hider.
**C locus:** `engrave.c` `can_reach_floor` (~209–211); `trap.c`
`uteetering_at_seen_pit` / `uescaped_shaft`.
**Change:** after Flying||MZ_HUGE, `check_pit && t_at &&
(uteetering || uescaped)` returns FALSE. In-pit / unseen still
reach. Did not pull invent/pickup `trap&&is_pit` callers or
`cant_reach_floor`. Filled D-1082 Addressed hash `453e759c`.
Rotated #1364 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary 16/16 (teeter/in-pit/unseen/shaft/
Flying/MZ_HUGE/swallow/Levitation); green+strict seed8000/0900;
cohort **14**/14 + strict 1800/0004/0101/0103/0360/2200/4500.
**Next:** Open `sit.c` `throne_sit_effect` wizard getlin.
**Blocked:** none.
