# Rotated from AGENT-LOOP-JOURNAL.md after #1426 D-1121 teleds fill_pit

## 2026-08-16 21:55 — #1411 D-1109 lspo_exclusion populate exclusion_zones

**Objective:** Open queue — `sp_lev.c` `lspo_exclusion` populate
`exclusion_zones` from `des.exclusion` (named). Not `goodpos`.
**C locus:** `sp_lev.c` `lspo_exclusion` 5496–5531;
`dungeon.c` `free_exclusions`; `sp_lev.c` `flip_level` 876–896.
**Change:** port `lspo_exclusion` (type map; `get_location`
ANY_LOC|NO_LOC_WARN; prepend). `free_exclusions` on
`clear_level_structures`. `flip_level` remaps rectangles.
Wire loaded soko `des.exclusion` MONGEN + vault TELE helper.
soko2-2 / hellfill prefab / save/rest still named. Rotated
#1396. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1410** **44**/44; next
@**#1415**).
**Verified:** private canary **25**/25; green+strict seed8000/0900;
cohort **16**/16 (0360 soko + 0373/4500/2200/0030/…) + strict
0360/0373/4500/2200. Path public-unhit.
**Next:** Open `teleport.c` `goodpos` live-mon `onscary` when
`m_id != 0`. Not `goodpos_onscary`.
**Blocked:** none.
