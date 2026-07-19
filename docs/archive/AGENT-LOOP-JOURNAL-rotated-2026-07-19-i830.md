## 2026-07-19 — #817 mfndpos worm_cross + rogue door-cut (D-0733)
- Objective: seed0399 @10157 / shared mfndpos; pivoted after C-state need.
- C locus: `mon.c` `mfndpos` diagonal; `worm.c` `worm_cross`.
- Change: port `worm_cross`; wire rogue door-cut + worm_cross into
  `mfndpos`. DIAG: unicorn open 3×3 ROOM; dest=(57,11) if kept; FORCE
  omit-pair ID exhausted (@10217 wish); gnome kickedloc clear.
- Verification: green+strict PASS; cohort 6/6; seed0399 @10157;
  seed0014 @49039 held.
- Next: C-state which cells C drops (D-0731/D-0708); or coverage.

## 2026-07-19 — #816 mon_allowflags + temple SANCT (D-0732)
- Objective: seed0399 @10157; pivoted after maze C-state DIAG.
- C locus: `mon.c` `mon_allowflags`/`mfndpos`; `priest.c` `in_your_sanctuary`.
- Change: isshk/priest/BUSTDOOR/unlock/minion·rider/human·minotaur/
  NOGARLIC; temple ALLOW_SANCT + `in_your_sanctuary`. Falsified: temple
  explains @10157 (maze nrooms=0 has_temple=false; still cnt=7).
- Verification: green+strict PASS; cohort 6/6; seed0399 @10157;
  seed0014 49495 held.
- Next: D-0731 C-state which 2 cells; or D-0708 @49039.

## 2026-07-19 — #815 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no js/ change).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; suite **36/44**; Scr **7926**/11405;
  RNG **527503**/792838 (66.53%); speed `37+0.18/turn` (R² 0.794).
  Δ vs #810: Scr +0, RNG +189; seed0399 10359→10389 still @10157.
- Next: D-0731 C-state omit @10157; or D-0708 @49039; prefer shared.

