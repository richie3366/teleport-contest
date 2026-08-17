# Rotated from AGENT-LOOP-JOURNAL.md after #1453 D-1143 in_out_region enter_msg / leave_msg

## 2026-08-17 03:50 — #1438 D-1131 teleds hideunder / mimic

**Objective:** Open queue — `teleport.c` `teleds` `hideunder` /
mimic (named). Not swallow docrt.
**C locus:** `teleport.c` `teleds` 493–496; `mon.c`
`hideunder` 4726–4801.
**Change:** `teleds` calls `hideunder(youmonst)` after
reset_utrap, before drag_ball. Failed hide + S_MIMIC sets
`m_ap_type=M_AP_NOTHING` (not seemimic). youmonst
`u.uundetected` + newsym when the flag changes. eel
`is_pool`/`couldsee`; concealer `!is_pool && !is_lava`.
Did not pull set_ustuck, swallow docrt, can_hide_under_obj,
cockatrice, or You_see. Filled D-1130 hash `6dd7a794`.
Rotated #1423. Open 12 after archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1435** **44**/44; next
@**#1440**).
**Verified:** private canary **47**/47; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 scroll + 0007 snake +
0009 swim + 0360/0367/0373/4500/2200/1500/1800/0030/0002/
0116/0060/0102/0700/0017/0361/0108/0383/5002) + strict
0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path
public-unhit on poly-hider / mimic teleds.
**Next:** Open `teleport.c` `teleds` `buried_ball_to_punishment`.
Not Punished ball.
**Blocked:** none.
