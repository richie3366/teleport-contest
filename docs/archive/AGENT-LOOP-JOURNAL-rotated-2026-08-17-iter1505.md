# Rotated from AGENT-LOOP-JOURNAL.md after #1505 review D-1181–D-1184 + cadence

## 2026-08-17 19:30 — #1490 review D-1169–D-1172 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `region.c` `run_regions` 439–441 / `hero_inside`
`region.h:17`; `teleport.c` `rloc_to_core` 1761–1763 /
`monmove.c` `dochugw` 204–238; `teleport.c` `rloc_pos_ok`
1620–1626; `teleport.c` `rloc` 1808–1811 / `tele` 842–845.
**Change:** reviews **130** ACCEPT D-1169 (hero `inside_f` bit
not geometry; `region_danger` named), **131** ACCEPT D-1170
(`dochugw(FALSE)` after bill before mintrap; `onscary` named),
**132** ACCEPT D-1171 (dest `levl.roomno` vs shoproom/shroom;
mx==0 named), **133** ACCEPT D-1172 (`tele(); return TRUE`
before iswiz; `mnexto` named). Must-fix empty. Filled D-1172
archive hash `e7c5c8ac`. Rotated #1475. Open 12 (no refill).
Rule #2: no fs.
**Score:** cadence **#1490** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.86). Next
@**#1495**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `mon.c` `mnexto` `control_mon_tele` (named). Not rloc.
**Blocked:** none.
