## 2026-07-18 23:56 — #783 D-0704 find_misc whip/invis/yank
- Objective: seed0014 @43068 C `find_misc` rn2(5) vs JS rn2(28).
- C locus: `muse.c` find_misc BULLWHIP `!rn2(5)` + POT_INVISIBILITY;
  use_misc MUSE_BULLWHIP `rn2(4)`.
- Cause: invent whip+invis; JS only had speed → m_move rn2(28); later
  whip success needed yank body.
- Change: `js/muse.js` find_misc/use_misc gain-level/invis/bullwhip.
- Verification: green+strict PASS; prefix 43068→43308 Scr 575; cohort
  20/20 PASS.
- Next: seed0014 @43308 C `distfleeck` rn2(5) vs JS rn2(2).

## 2026-07-18 23:46 — #782 D-0703 mintrap HOLE already_seen
- Objective: seed0014 @40196 C `mintrap` rn2(4) vs JS rn2(5).
- C locus: `trap.c` mintrap — `already_seen = mon_knows_traps || (HOLE &&
  !mindless)`.
- Cause: gnome on HOLE with mtrapseen=0; JS omitted HOLE clause.
- Change: `js/trap.js` mintrap OR-in HOLE && !mindless.
- Verification: green+strict PASS; prefix 40196→43068 Scr 575; cohort
  12/12 PASS.
- Next: seed0014 @43068 C `find_misc` rn2(5) vs JS rn2(28).

## 2026-07-18 23:45 — #781 D-0702 travel seenv-detour quiet-rest
- Objective: seed0014 @36031 (NOTES said exercise rn2(19) vs rn2(5)).
- C locus: `hack.c` findtravelpath/TEST_TRAV; `cmd.c` dotravel_target.
- Falsified: exercise formula (already correct). Real: `_>` travel walked
  west on seenv-only detour; C rests → `n` boulder `exercise(A_STR)`.
- Change: prefer couldsee path; seenv-only worsen-dist → quiet-rest;
  trap/liquid avoid + tight-diag load squeeze in BFS.
- Verification: green+strict PASS; prefix 36031→40196 Scr 574; cohort
  seed0004/0007 stay PASS (couldsee-only alone broke them).
- Next: seed0014 @40196 C `mintrap` rn2(4) vs JS rn2(5).

## 2026-07-18 23:15 — #780 score + D-0701 mons_see_trap
- Objective: mandatory full score (#780÷5) + seed0014 @35246.
- Score: **35/44** Scr **7619**/11405 RNG **499061**/792838 (62.95%)
  `36+0.17/turn` (pre-fix suite).
- C locus: `mondata.c` `mons_see_trap`; `trap.c` dotrap/mintrap.
- Change: wire sight fan-out so nearby mons learn traps → mfndpos
  skips known cells; shortsighted + unicorn NOTONL in `m_move`.
- Verification: green+strict PASS; seed0014 prefix 35246→36031
  (36178 RNG / 566 Scr); cohort PASS.
- Next: seed0014 @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.

## 2026-07-18 23:05 — D-0700 ohitmon rolling boulder re-extract
- Objective: seed0014 @36031 travel/dopush vs continue_run.
- C locus: `mthrowu.c` `ohitmon` (`!objgone && range==-1` re-extract).
- Change: `js/mthrowu.js` — rolling boulder continues after mon hit; rests
  at launch2 (56,10). Root of missing adjacent boulder for travel/`n`.
- Verification: green+strict PASS; cohort 16/16 (incl. seed0361); seed0014
  prefix 36031→35246 (correct rest exposes earlier mdig miss).
- Next: seed0014 @35246 C `mdig_tunnel` vs JS `rn2(8)`.
