# Rotated from AGENT-LOOP-JOURNAL.md after #1443 D-1135 hcolor drinksink

## 2026-08-17 01:45 — #1428 D-1123 rloc_to worm / ustuck-swallow docrt

**Objective:** Open queue — `teleport.c` `rloc_to` worm /
ustuck-swallow `docrt` (named). Not newsym.
**C locus:** `teleport.c` `rloc_to_core` 1675–1697; `worm.c`
`remove_worm` 714–726; `dungeon.c` `u_on_newpos`;
`hack.c` `check_special_room`; `display.c` `docrt` swallow;
`mon.c` `unstuck`.
**Change:** `remove_worm` export; `rloc_to` async worm pickup +
`place_worm_tail_randomly`; swallow `u_on_newpos` subset +
`check_special_room`/`docrt`; grab `!m_next2u` `unstuck`
(dynamic import). Did not pull shk-home / `maybe_unhide_at` /
`set_apparxy`. Filled D-1122 hash `5a2f96ca`. Rotated #1413.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1425** **44**/44; next
@**#1430**).
**Verified:** private canary **27**/27; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0360/4500/0373/0367 + 2200/0014/
0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/
0361/0108/0002/5002/2600) + strict 0012/0360/4500/0014/2200/
0004/0009/0367/0373/0030/0002/0116. Path public-unhit on live
worm rloc / swallow-teleport.
**Next:** Open `fountain.c` `drinksink` case 13 `create_gas_cloud`.
Not polyself.
**Blocked:** none.
