# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-14 17:55 — D-0283 botl depth + Mines walls

- Objective: seed0030 Scr 87/1953 (CURRENT primary); first miss @46.
- C locus: `botl.c` `describe_level` `depth(&u.uz)`; `display.c`
  `wall_color(mines_walls)`.
- Change: botl `Dlvl` via `depth()` (not `dunlev`); Mines walls
  `CLR_BROWN` when `In_mines`. DIAG confirmed second `>` is Mines
  branch stairs (`dnum:2,dlevel:1`), not wrong goto.
- Verification: Scr@46–49 match; prefix **46→50**; Scr 87→100;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@50 C `!` vs JS `·` (6,33); or seed0013.
