# Rotated from AGENT-LOOP-JOURNAL @#1193

## 2026-07-21 16:45 — #1179 timebot / time_botl

- Objective: seed4500 @1464 footsteps More botl C T:231 vs JS T:229.
- C locus: `allmain.c` `disp.time_botl` on `moves++`; `botl.c`
  `timebot`; `display.c` `flush_screen`→`timebot`.
- Change: `allmain.js` set `time_botl`; `display.js` `timebot()`
  (tty→`bot`) from flush (D-0928 #1179).
- Verification: green+strict PASS; cohort 6/6; Scr **1716→1720**;
  prefix **@1464→@1501**.
- Next: @**1501** wish `r - a ring.` vs `r - an engagement ring.`

## 2026-07-21 16:37 — #1178 polymon vision_full_recalc

- Objective: seed4500 @1441 map C DEC `~` vs JS floating-eye `e`.
- C locus: `polyself.c` `polymon` `gv.vision_full_recalc=1` before
  `see_monsters` (FROMFORM Blind).
- Change: `polyself.js` `polymon` set `vision_full_recalc` (D-0928
  #1178).
- Verification: green+strict PASS; cohort 6/6; Scr **1586→1716**;
  prefix **@1441→@1464**.
- Next: @**1464** botl T:**229** vs C T:**231**.
