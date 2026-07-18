# Rotated journal entries

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
