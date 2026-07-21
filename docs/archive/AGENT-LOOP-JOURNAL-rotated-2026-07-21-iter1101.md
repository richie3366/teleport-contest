# Rotated from AGENT-LOOP-JOURNAL.md @#1101

## 2026-07-21 02:15 — #1087 D-0928 Y+1 falsified (tty/map); stairs ungated
- Objective: seed4500 medusa-3 hero place (D-0928).
- C locus: `sp_lev.c` `flip_level` stairs (no inFlipArea);
  `mkmaze.c` `get_level_extends` scan bounds; `dat/medusa-3.lua`.
- Falsified: whole-map Y+1 — C cursor `[42,7]` is tty (=map y+1);
  land is X-only C(42,6) vs JS(43,6). FORCE minx=1 → stair(31,16)
  but place desync @82419. Change: stairs/`dnstair` ungated flip +
  extends `xmin<=COLNO`/`ymin<=ROWNO` (prefix unchanged @88377).
- Verification: green+strict PASS; cohort 7/7; rng-diff @88377.
- Next: C-cited FlipX sum80 with place-safe terrain; cadence @#1090.
