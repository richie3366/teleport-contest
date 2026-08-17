# Rotated from AGENT-LOOP-JOURNAL.md after #1486 D-1169 run_regions hero_inside bit

## 2026-08-17 13:38 — #1471 D-1157 walk in_out_region

**Objective:** Open — `hack.c` walk `in_out_region` (named). Not teleds.
**C locus:** `hack.c` `domove_core` 2866–2868 after `drag_ball`;
callee `region.c` `in_out_region` 480–527; `is_hero_inside_gas_cloud`
1168–1176.
**Change:** `cmd.js` `domove` awaits `in_out_region(newx,newy)`
before occupy. Gas NO_CALLBACK never rejects; still updates
REG_HERO_INSIDE. Flip `is_hero_inside_gas_cloud` to the bit.
Did not pull hurtle / goto_level callers or `run_regions`
geometry. D-1156 hash already `16e8d88b`. Rotated #1456. Open
12 after refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1470** **44**/44; next
@**#1475**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **39**/39 (CURRENT shared + 0014/0383) + strict 8000/0900/
0002/0014/0012/0004/0030/0360/0361/0383/2200/0006. Path
public-unhit on force-field reject.
**Next:** Open `region.c` `create_gas_cloud_selection` (named).
Not BFS create. Audit @**#1475**.
**Blocked:** none.
