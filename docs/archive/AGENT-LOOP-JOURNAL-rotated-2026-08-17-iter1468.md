# Rotated from AGENT-LOOP-JOURNAL.md after #1468 D-1155 expire_gas_cloud dissipation

## 2026-08-17 06:57 — #1453 D-1143 in_out_region enter_msg / leave_msg

**Objective:** Open queue — `region.c` `in_out_region`
enter_msg / leave_msg (named). Not update_player_regions.
**C locus:** `region.c` `in_out_region` 505–506 / 519–520;
`hack.h` `pline1`; `create_msg_region` 954–973 `#if 0`.
**Change:** `in_out_region` awaits `pline(leave_msg)` after
clear_hero_inside and `pline(enter_msg)` after set, when
non-NULL, then the leave_f/enter_f callbacks. `teleok` is
async and all its teleport.js callers await it. Did not
pull force-field `#if 0` callbacks, hack.c/dothrow/`do.c`
walk callers, or flip geometric gas. `teleds` still uses
`update_player_regions` (D-1130). Filled D-1142 archive
hash `52194cc9`. Rotated #1438. Open 10 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **40**/40; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit (`create_msg_region` `#if 0`).
**Next:** Open `potion.c` `djinni_from_bottle` `mongrantswish`.
Not bottle chance RNG.
**Blocked:** none.

