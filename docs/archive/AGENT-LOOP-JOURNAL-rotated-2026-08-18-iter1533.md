# Rotated from AGENT-LOOP-JOURNAL.md after #1533 D-1207 vpline accessiblemsg consume

## 2026-08-18 01:26 — #1518 D-1195 rloc_to_core wand makeknown

**Objective:** Open — `teleport.c` `rloc_to_core` wand `makeknown`
(named). Not ustuck-together.
**C locus:** `teleport.c` `rloc_to_core` 1727–1731 after delivered
dest pline, before resident shk angry. `dozap` sets
`gc.current_wand` around `weffects`.
**Change:** if `current_wand.otyp === WAN_TELEPORTATION` after a
delivered dest msg, `makeknown(WAN_TELEPORTATION)` (WIS
`rn2(19)` when new). Null / other otyp / no dest msg skip.
Did not pull `set_msg_xy`. Filled D-1194 archive hash
`c4c57ac1`. Rotated #1503. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/
2200/0014.
**Next:** Open `teleport.c` `rloc_to_core` `set_msg_xy` (named).
Not makeknown.
**Blocked:** none.
