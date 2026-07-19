# Rotated from AGENT-LOOP-JOURNAL.md (#940 score cadence)

## 2026-07-20 00:16 — #928 D-0806 mazewalk ftyp ROOM
- Objective: seed0360 @318 C `·` vs JS `#` on baalz materialize+hot.
- C locus: `sp_lev.c` `lspo_mazewalk` — 3-arg form ftyp=ROOM;
  corrmaze only gates wallify / `ftyp<1` substitute.
- Change: `js/mklev.js` `splev_mazewalk` default typ=ROOM (was
  corrmaze→CORR). Named: table-form typ optional.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **633→638**/833; prefix **318→324**; RNG FULL.
- Next: @324 Dlvl:40 materialize C DEC lava `` ` `` vs JS blank.

## 2026-07-20 00:05 — #927 D-0805 Rogue arrival + graphics
- Objective: seed0360 @301 materialize `--More--` / `*:0` / `.` floors.
- C locus: `do.c` `goto_level` Rogue pline + `assign_graphics`;
  `symbols.c` / `display.c` Rogue nocolor.
- Change: `js/do.js` + `js/display.js` — ROGUESET swap, gold `*`,
  DEC off, nocolor strip, first-visit primitive pline. Named:
  RogueIBM / full showsyms / knox / bigroom.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **628→633**/833; prefix **301→318**; RNG FULL.
- Next: @318 materialize+hot C `·` vs JS `#` (3,18).

## 2026-07-19 23:56 — #926 D-0804 flip_level object piles
- Objective: seed0360 @249 JS `%` vs C `/` after ^V Sokoban-4 materialize.
- C locus: `sp_lev.c` `flip_level` — swap `level.objects` with terrain.
- Change: `js/mklev.js` — stop fobj nexthere rebuild; swap `_objects_at`
  with cell flip; buried coord flip. Named: monsters[][] / drawbridge.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **617→628**/833; prefix **249→301**; RNG FULL.
- Next: @301 materialize `--More--` (Dlvl:18).

## 2026-07-19 23:47 — #925 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no peel).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8623**/11405 (**+98** vs #920); RNG
  **652181**/792838 (82.26%, **+7528** = D-0800…D-0803 soak); speed
  `36+0.21/turn` R² 0.796. seed0360 suite Scr **617**/833 @249.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: seed0360 @249 ^V materialize map cells (no FORCE).
