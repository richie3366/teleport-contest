# Rotated journal crumbs

## 2026-07-19 14:45 — #879 minliquid (D-0775); @98492→98505
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mon.c` `minliquid` / `movemon_singlemon`.
- Change or falsified theory: ported `minliquid` (lava+pool+eel).
  Recorder: C has mumak@(55,9) on LAVAPOOL, same row9 map as JS;
  C spends movement then dies in minliquid (no dochug). Falsified
  couldsee/missing-boulder/DEC-lava@61. Do not FORCE linedup.
- Verification: green+strict PASS; cohort 35/35; seed0360
  **98505**/98528 Scr **275**.
- Next: wizard3 @98505 nhlib shuffle after getbones; then hellfill.

## 2026-07-19 14:40 — #878 @98492 DEC `~`≠lava; river matched (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; `display.c` DEC.
- Change or falsified theory: no port patch. Falsified #877 “lava flanks
  @(58,9)/(60,9)”: DECgraphics `~` = S_room (or ice), lava is meta-``.
  JS@98492: mumak(55,9) LAVA→hero(59,9); path LAVA/LAVA/ROOM+boulder/ROOM;
  couldsee false → rn2(3). Wizard2 hell_tweaks: pools skip; river floor=682
  endpoints match C rndcoord idx 11/461/54/603 → lava@55–56. Falsified
  randline +xstart (C rndcoord returns relative; net identity). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C `sobj_at(BOULDER,57,9)`/`couldsee(55,9)`; C visible
  lava@`(61,9)` vs JS ROOM+boulder; then wizard3 @98502.

## 2026-07-19 14:27 — #877 @98492 C-screen lava/warn (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; session screens.
- Change or falsified theory: no port patch. C Dlvl42: warn `'1'`@(55,9)
  + `q`@(60,10); (57,9) never revealed; lava `~`@(58,9)/(60,9) vs JS
  ROOM+boulder@(57,9). Falsified drop bounds2 +xstart (C fillsrect adds
  xstart). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C-state boulder/couldsee/lava; or hell_tweaks cell pick;
  then wizard3 @98502.

## 2026-07-19 14:40 — #878 @98492 DEC `~`≠lava; river matched (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; `display.c` DEC.
- Change or falsified theory: no port patch. Falsified #877 “lava flanks
  @(58,9)/(60,9)”: DECgraphics `~` = S_room (or ice), lava is meta-``.
  JS@98492: mumak(55,9) LAVA→hero(59,9); path LAVA/LAVA/ROOM+boulder/ROOM;
  couldsee false → rn2(3). Wizard2 hell_tweaks: pools skip; river floor=682
  endpoints match C rndcoord idx 11/461/54/603 → lava@55–56. Falsified
  randline +xstart (C rndcoord returns relative; net identity). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C `sobj_at(BOULDER,57,9)`/`couldsee(55,9)`; C visible
  lava@`(61,9)` vs JS ROOM+boulder; then wizard3 @98502.

## 2026-07-19 14:27 — #877 @98492 C-screen lava/warn (D-0773)
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `nhlib.lua` hell_tweaks; session screens.
- Change or falsified theory: no port patch. C Dlvl42: warn `'1'`@(55,9)
  + `q`@(60,10); (57,9) never revealed; lava `~`@(58,9)/(60,9) vs JS
  ROOM+boulder@(57,9). Falsified drop bounds2 +xstart (C fillsrect adds
  xstart). Do not FORCE.
- Verification: green+strict PASS; seed0360 still **98492**/275.
- Next: recorder C-state boulder/couldsee/lava; or hell_tweaks cell pick;
  then wizard3 @98502.

