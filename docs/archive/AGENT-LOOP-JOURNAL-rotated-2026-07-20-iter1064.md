# Rotated from AGENT-LOOP-JOURNAL @#1064

## 2026-07-20 21:20 — #1049 D-0899 #jump dojump/jump
- Objective: seed4500 knight coverage (prefix 2869 mfndpos arity).
- C locus: `apply.c` `dojump`/`jump`/`is_valid_jump_pos`/`check_jump`;
  `dothrow.c` `walk_path`; `getpos.c` getvalid.
- Change: port physical `#jump` + knight chess dist; walk_path;
  getpos_getvalid `(invalid target)`. Named omit: SPE_JUMPING;
  hurtle_step; S_goodpos hilite glyphs; steed/trap-escape.
- Verification: green+strict PASS; cohort 7/7; seed4500 prefix
  **2869→8491** Scr **19→264**.
- Next: seed4500 @8491 `next_ident` vs `rn2(12)`; leaderboard cron;
  cadence @#1050.
