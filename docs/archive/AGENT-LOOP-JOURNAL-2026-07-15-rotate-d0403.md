# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 13:35 — #414 prinv total_of gold (D-0388)
- Objective: seed0012 @98/99 `$ - 5 gold pieces (7 in total).`
- C locus: invent.c prinv total_of + xprname quan; pickup.c pickup_prinv.
- Change: JS ignored lift count after gold merge; ported prinv `(N in
  total)` + xprname quan override; pickup_prinv/hold/out_container pass
  pre-merge count.
- Verification: Scr **239→240**/308; @99 match; green+strict PASS;
  cohort 24/24 PASS.
- Next: seed0012 @138 monster-sense More map blanking.

## 2026-07-15 13:40 — #415 score + cls clear_glyph_buffer (D-0389)
- Objective: mandatory full `sessions` score; seed0012 @138 detect More map.
- C locus: display.c cls → clear_glyph_buffer; detect.c monster_detect.
- Change: JS cls only cleared Terminal; ported clear_glyph_buffer on
  loc.disp_* so sense --More-- shows blank map + mons/@.
- Verification: full sessions **24/44**, Scr **3914**/11405 RNG
  **255082**/792838; seed0012 Scr **240→244**; first fail @140; green+
  strict PASS; cohort 22/22 PASS.
- Next: seed0012 @140 TER_DETECT autodescribe `unexplored area`.
