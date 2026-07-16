# Rotated from AGENT-LOOP-JOURNAL (#644)

## 2026-07-16 22:26 — D-0568 the_unique_obj + print_dungeon bot
- Objective: seed0373 @99 `an` vs `the` Amulet + blank botl under More.
- C locus: `objnam.c` `the_unique_obj`/`doname_base`; `wintty.c` bot after
  fullscreen menu; `dungeon.c` `print_dungeon`.
- Change: `doname` `"the "` for unique/pname; Amulet uncursed skip;
  `print_dungeon` `await bot()` after menu (keep Options clear_committed).
- Verification: seed0373 Scr **100→101**/124 RNG full; green+strict PASS;
  cohort **30**/30 PASS; seed0116 still 113/127.
- Next: seed0373 @100 Fire vision; or seed5006 dosounds @8468.
