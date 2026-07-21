# Agent loop journal archive (rotated 2026-07-21)

## 2026-07-21 19:02 — #1198 serialize leading bold spaces

- Objective: leaderboard gap — seed0030 strict `aC2_aJ0` after D-0931.
- C locus: `topten.c` `topten_print_bold` → `raw_print_bold` /
  `putstr(..., ATR_BOLD, …)`; bold covers rank pad `"  1"`.
- Change: `serialize_for_scoring` firstCol keep `attr&0x7`
  (inv|bold|uline) so leading bold pads emit under SGR (D-0932).
- Verification: green+strict PASS; seed0030 strict space **0**;
  seed0373 still 0; gap cohort 13/13.
- Next: await LB cron PASS lift.

## 2026-07-21 18:56 — #1197 S_air flush + mid-row space CUF

- Objective: leaderboard gap — seed0373 strict `sp_C6_J8` after D-0930.
- C locus: `display.c` `back_to_glyph` AIR → `S_air`; `defsym.h`
  CLR_CYAN; contest tty mid-row space runs >4 → CSI CUF.
- Change: `_buildScreenOutput` paints set `disp_ch` spaces (incl. AIR);
  `serialize_for_scoring` mid-row same-color space runs >4 → SGR+CUF
  (D-0931; D-0930 gray coerce kept).
- Verification: green+strict PASS; seed0373 strict space **0**; gap
  cohort 12/12 + shared 6/6; seed0013/4500/0007 PASS.
- Next: await LB cron; seed0030 bold-bleed residual deferred.

## 2026-07-21 18:44 — #1196 serialize CLR_GRAY blanks → NO_COLOR

- Objective: leaderboard 32-vs-43 gap — judge cell-only fails on
  full-RNG local-PASS sessions (D-0480 class).
- C locus: `wintty.c` tty ANSI_DEFAULT / empty gray hilite → default
  fg; frozen Terminal clear leaves CLR_GRAY.
- Change: `display.js` `serialize_for_scoring` coerce space+attr0+
  CLR_GRAY → NO_COLOR only (D-0930; no glyph tty_map_color).
- Verification: green+strict PASS; gap cohort 0002/0004/0007/0012/
  0013/0014/0030/0360/0373/0383/0399/4500 PASS; seed0007 j37
  **7080→0**; seed0360/0399 strict SGR clean; seed2200 parked.
- Next: await judge cron (expect public PASS lift); seed0373 cyan
  space leftovers / seed0030 bold-bleed deferred.
