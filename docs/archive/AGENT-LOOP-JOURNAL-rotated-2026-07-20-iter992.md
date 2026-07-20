# Rotated from AGENT-LOOP-JOURNAL (#992)

## 2026-07-20 10:05 — #977 see_traps glyph_is_trap (D-0845)
- Objective: seed0383 @172 post-expel Hallu display-RNG before flush.
- C locus: display.c see_traps glyph_is_trap(_glyph_at); teleport.c rloc_to newsym.
- Change: `see_traps` only newsym when disp_ch is trap glyph. Falsified
  dochug NOTHING/DONE Hallu newsym and rloc_to/2nd-expel +1 (Scr→174).
- Verification: seed0383 Scr 176 RNG FULL; green+strict PASS; cohort 5/5.
- Next: reconstruct C burn between expelled More and see_monsters (not
  blanket rloc_to); then 4 objs; flush.
