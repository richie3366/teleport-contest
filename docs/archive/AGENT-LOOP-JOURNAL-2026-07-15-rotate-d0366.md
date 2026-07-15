# Rotated from AGENT-LOOP-JOURNAL.md (D-0366)

## 2026-07-15 04:25 — D-0353 tut-1 remainder + WAITMASK
- Objective: seed0009 finish tut-1 level-gen (CURRENT).
- C locus: `dat/tut-1.lua` loot→end; `mklev.c` mineralize special skip;
  `makemon.c` align_shift; `monmove.c` dochug STRAT_WAITMASK.
- Change: load_tut1 through potion; mineralize early return; real
  align_shift; WAITFORU/WAITMASK gate before distfleeck (D-0353).
- Verification: Scr **38→39** (@33 wall); RNG **3450→3649**; green+strict;
  cohort 7 PASS.
- Next: @33 glance/wall “It's a wall.” vs blank JS topline.

## 2026-07-15 03:15 — D-0352 tut-1 mktrap gate through sling
- Objective: seed0009 @27 door resists vs opens (CURRENT).
- C locus: `mklev.c` mktrap victim `rnd(4)`; `dungeon.c` induced_align
  Is_special; `dat/tut-1.lua` kick→sling.
- Change: falsified doopen chance; `mktrap_seen_victim` + load_tut1 through
  sling; induced_align via sp_levchn (D-0352).
- Verification: Scr **27→38** (first miss @33 wall); RNG **3341→3450**;
  green+strict; cohort 5 PASS.
- Next: load_tut1 large-box mkbox_cnts+contents → place_lregion.

