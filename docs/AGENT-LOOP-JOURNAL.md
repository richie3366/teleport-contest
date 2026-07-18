# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## ## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-18 22:12 — D-0698 ohitmon mondied / corpse_chance
- Objective: seed0014 @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.
- C locus: `mthrowu.c` `ohitmon`; `mon.c` `mondied` / `corpse_chance`.
- Change: `ohitmon` kill → `mondied` / `xkilled(NOMSG)`; export quiet
  `mondied` + `monkilled` in mhitm; export `xkilled`.
- Verification: prefix **33278→35611**, Scr **538**/714; green+strict
  PASS; cohort **33**/33.
- Next: @35611 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## 2026-07-18 22:07 — #775 score + D-0697 mines your_race
- Objective: mandatory full score (#775÷5); seed0014 @32023 create_monster.
- C locus: `sp_lev.c` `create_monster`; `mondata.h` `your_race`.
- Change: D-0697 — mines dwarf/gnome `your_race`→`rn2(3)` clear pm in
  `splev_create_monster`/`splev_room_monster`. Suite Score **35/44**
  Scr **7604** RNG **497349** (62.73%).
- Verification: prefix **32023→33278**, Scr **533→538**/714; green+strict;
  cohort **33**/33 PASS.
- Next: @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.

## 2026-07-18 22:05 — #774 D-0696 door bump Fumbling()
- Objective: seed0014 @28552 C `exercise` `rn2(2)` vs JS `rn2(19)`.
- C locus: `hack.c` `test_move` closed_door autoopen / bump (`Fumbling`).
- Change: D-0696 — `cmd.js` uses `Fumbling()` (H||E) for impaired + bump
  instead of sticky `u.Fumbling` (was autoopen→`rn2(19)`).
- Verification: prefix **28552→32023**, Scr **515→533**; green+strict;
  cohort **33**/33 PASS.
- Next: @32023 C `create_monster` `rn2(3)` vs JS `rn2(79)` (descend).

## 2026-07-18 21:57 — #773 D-0695 unmul empty nomovemsg
- Objective: seed0014 trip `--More--` @22721 / @22868 mtrack desync.
- C locus: `hack.c` `unmul`; `timeout.c` FUMBLING `nomovemsg=""`.
- Change: D-0695 — `unmul` default only if `nomovemsg == null`; skip
  pline on `""`. Falsified: leftover-grid noises skip; more() keep-grid
  (regressed seed0002/0030 screens).
- Verification: prefix **22868→28552**, Scr **483→515**; green+strict;
  cohort PASS list intact.
- Next: @28552 C `exercise` `rn2(2)` vs JS `rn2(19)` (door-bump step).

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

## 2026-07-18 20:55 — #767 D-0689 exerper Fumbling
- Objective: seed0014 @18494 C `exercise` `rn2(2)` vs JS wipe-engr
  `rn2(76)`.
- C locus: `youprop.h` `Fumbling`; `attrib.c` `exerper`.
- Change: D-0689 — `Fumbling()` ≡ H||E||uprops; wire in `exerper`;
  sync Boots_on timeout into uprops intrinsic. Was checking unset
  `u.Fumbling` boolean after wear conferred extrinsic.
- Verification: prefix **18494→19636**, Scr **453→459**/714; green+
  strict PASS; cohort **33**/33.
- Next: @19636 C `lspo_map` `rn2(73)` (sp_lev) vs JS `rn2(100)`.
