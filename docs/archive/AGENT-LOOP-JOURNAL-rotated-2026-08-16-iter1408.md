# Rotated from AGENT-LOOP-JOURNAL.md after #1408 D-1107 Excalibur LONG_SWORD

## 2026-08-16 18:12 — #1393 D-1095 split_mon rust/minliquid/uhitm AD_COLD

**Objective:** Open queue — `potion.c` `split_mon` trap rust /
`minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit
clone_mon.
**C locus:** `trap.c` rust 1652–1720; `mon.c` `minliquid_core`
987–992 / `healmon` 4596–4614; `uhitm.c` `passive` AD_COLD
6078–6082.
**Change:** rust hero+monster gremlin `split_mon`; minliquid
gremlin pool/fountain `rn2(3)` → split + `dryup` + pool
`water_damage_chain`; AD_COLD `healmon` then split on mhpmax
gate. Did not pull drown/mhitu/mhitm/cmd. Filled D-1094 hash
`46775b20`. Rotated #1378. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **6**/6; green+strict seed8000/0900;
cohort **15**/15 + strict 0014/0360/4500/2200. Path public-unhit.
**Next:** Open `fountain.c` `dryup` wizard yn.
**Blocked:** none.
