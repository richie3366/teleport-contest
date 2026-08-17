# Rotated from AGENT-LOOP-JOURNAL.md after #1492 D-1174 mdisplacem region

## 2026-08-17 15:10 — #1477 D-1162 rloc_to make_angry_shk

**Objective:** Open — `teleport.c` `rloc_to` shk `make_angry_shk`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1651 / 1734–1740;
`shk.c` `make_angry_shk` 1470–1488 / `inhishop` 1039–1048.
**Change:** snapshot `resident_shk` before pickup; dest
`!inhishop` → existing `make_angry_shk`. `rloc_to_flag` defers
angry until after appear pline. Did not pull vanish-msg / minvent
shop bill / occupation `dochugw` / trapped `mintrap`. Filled
D-1161 archive hash `4dfadf3a`. Rotated #1462. Open 12 after
archive+refill. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **32**/32 (leave-shop angry+following;
stay-shop; already-out; non-shk; same-cell; furious; bill fold;
null; flag appear-then-angry; flag stay; priest; migrating mx==0);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/
0367/0373/0002. Path public-unhit on resident shk rloc out of shop.
**Next:** Open `teleport.c` `rloc_to` minvent shop bill (named).
Not shk-home.
**Blocked:** none.
