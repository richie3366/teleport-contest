# Rotated from AGENT-LOOP-JOURNAL.md after #1535 review D-1205–D-1208 + cadence score

## 2026-08-18 04:15 — #1520 review D-1193–D-1196 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dokick.c` `deliver_obj_to_mon` 1854–1906 /
`makemon.c` 1469–1470 / `do_name.c` 1538–1586; `do.c`
`goto_level` 1839 / 1971–1972 / `hack.c` 1744–1783; `teleport.c`
`rloc_to_core` 1727–1731 / `hack.h` `makeknown`; `teleport.c`
1708 / `pline.c` `set_msg_xy` 93–97.
**Change:** reviews **155** ACCEPT-WITH-DEBT D-1193 (minvent
prepend live; `add_to_minv` merge named, not Must-fix), **156**
ACCEPT D-1194 (off/`docrt` + uz0 catch-up live; vision_recalc
caller named), **157** ACCEPT D-1195 (`makeknown` after dest
msg; `exercise` `rn2(19)` live), **158** ACCEPT-WITH-DEBT D-1196
(store dest `msg_loc`; `vpline` consume named, not Must-fix).
Filled D-1196 archive hash `d0cbc6e3`. No new Must-fix prepend.
Open 8 (no refill). Rotated #1505. Rule #2: no fs.
**Score:** cadence **#1520** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `32+0.27/turn` (R² 0.871). Next
@**#1525**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**Blocked:** none.
