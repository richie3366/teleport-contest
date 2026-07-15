# Rotated journal entries

## 2026-07-15 02:58 — D-0351 tut-1 door-area des.*
- Objective: seed0009 @21 S_engroom `` ` `` vs floor (CURRENT).
- C locus: `dat/tut-1.lua` door-area; `sp_lev.c` lspo_engraving/door/trap;
  parse_config newbie options.
- Change: engravings (2,4)/(2,5)/(2,7)/(4,5) + `D_CLOSED` (2,6) + seen
  MAGIC_PORTAL (4,4) + mention_walls/decor/lit_corridor (D-0351).
- Verification: seed0009 Scr **21→27**; green+strict; cohort sample PASS.
- Next: @27 door resists vs opens (`doopen_indir` chance/attrs).

