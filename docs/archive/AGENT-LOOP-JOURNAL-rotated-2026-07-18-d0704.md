# Rotated from AGENT-LOOP-JOURNAL.md (#783 / D-0704)

## 2026-07-18 21:30 — #772 D-0694 makeplural feet
- Objective: seed0014 @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)`.
- C locus: `objnam.c` makeplural/one_off; DIAG dog_move mtrack.
- Change: D-0694 — port `one_off` (`foot`→`feet`). Falsified: wrong
  `rn2(12)` constant (already correct); any-key more (breaks 0-RNG rejects).
- Verification: Scr **482→483**; prefix still **22868**; green+strict;
  cohort 7/7 PASS.
- Next: @22721 trip `--More--` key ownership → dmin/mtrack @22868.

## 2026-07-18 21:16 — #771 D-0693 thitmonst pie DEX
- Objective: seed0014 @22582 C `thitmonst` `rnd(25)` vs JS `rn2(100)`.
- C locus: `dothrow.c` thitmonst pie/egg; `uhitm.c` CREAM_PIE;
  `mondata.c` can_blnd.
- Change: D-0693 — `thitmonst` DEX gate + `hmon` cream-pie/`rn1(25,21)`.
- Verification: prefix **22582→22868**, Scr **481→482**; positional
  **22978**/59178; green+strict; cohort **33**/33.
- Next: @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)`.

## 2026-07-18 21:12 — #770 score + D-0692 slip_or_trip
- Objective: mandatory #770 full score; seed0014 @21529 slip_or_trip.
- C locus: `timeout.c` nh_timeout FUMBLING; `slip_or_trip` rn2(4).
- Change: D-0692 — `js/timeout.js` FUMBLING case + slip_or_trip.
- Verification: suite **35**/44 Scr **7547**/11405 RNG **486452**/792838
  (61.36%) `37+0.17/turn`; prefix **21529→22582** Scr **467→481**;
  green+strict; cohort **33**/33.
- Next: @22582 C `thitmonst` `rnd(25)` vs JS `rn2(100)`.

## 2026-07-18 21:05 — #769 D-0691 goto_level Fumbling()
- Objective: seed0014 @21242 C `goto_level` `rnd(3)` vs JS `rn2(10)`.
- C locus: `do.c` goto_level descend fall; `youprop.h` Fumbling.
- Change: `js/do.js` use `Fumbling()` (H||E) not sticky `u.Fumbling`.
- Verification: prefix **21242→21529**, Scr **460→467**; green+strict;
  cohort **33**/33 PASS.
- Next: @21529 C `slip_or_trip` `rn2(4)` vs JS `rn2(100)`.

## 2026-07-18 21:02 — #768 D-0690 Water-surrounded vault
- Objective: seed0014 @19636 C `lspo_map` `rn2(73)` vs JS `rn2(100)`.
- C locus: `themerms.lua` Water-surrounded vault; `sp_lev.c` `lspo_map`.
- Change: D-0690 — wire vault into `THEMEROOM_MAPS` (was META-only →
  create_room). Port map contents: themed region, escape-item chest
  via `readobjnam`, undead, teleport exclusion.
- Verification: prefix **19636→21242**, Scr **459→460**/714; green+
  strict PASS; cohort **35**/35.
- Next: @21242 C `goto_level` `rnd(3)` vs JS `rn2(10)`.
