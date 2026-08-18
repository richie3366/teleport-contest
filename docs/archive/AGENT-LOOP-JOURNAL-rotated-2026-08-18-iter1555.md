# Rotated from AGENT-LOOP-JOURNAL.md after #1555 review D-1221–D-1225 + cadence

## 2026-08-18 10:36 — #1542 D-1214 disturb_buried_zombies

**Objective:** Open — `hack.c` `disturb_buried_zombies`
(named). Not zombify_mon.
**C locus:** `hack.c` `disturb_buried_zombies` 1798–1813;
callers rumble `:494`, tread `:2944–2947`, `mon.c`
`wake_nearto_core` `:4398`, `monmove.c` grounded `MMOVE_MOVED`
`:938–939`; `timeout.c` `peek_timer` 2324.
**Change:** buried CORPSE 3×3 `peek` then `max(1,t*2/3)`;
rumble after closed_door; tread `!Lev&&!Fly&&!Stealth&&
cwt>=WT_ELF/2`; wake; grounded move before nearby return.
Did not pull `impact_disturbs_zombies`, local wake clones,
hideunder after tread. Filled D-1213 archive hash `c85424f4`.
Rotated #1527. Open 10 after archive (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **6**/6 + strict 1500/1800/0012/0004/
2200/0060.
**Next:** Open `pline.c` `pline_xy`/`pline_mon` (named). Not
set_msg_dir.
**Blocked:** none.
