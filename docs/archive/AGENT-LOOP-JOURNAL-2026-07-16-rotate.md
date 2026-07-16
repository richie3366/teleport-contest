# Archived agent loop journal entries

## 2026-07-16 21:50 — #625 formal score refresh
- Objective: mandatory #625 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **30/44**, Scr
  **6355**/11405, RNG **353648**/792838 (44.61%), `31+0.14/turn`
  (R² 0.77). Δ vs #620: Scr +454, RNG +2962 (D-0560…D-0564).
- Next: seed0373 Bar-strt outdoor `~` glyphs; or seed5006 dosounds @8468.

## 2026-07-16 21:48 — #624 D-0564 describe_level Home
- Objective: seed0373 @screen 43 botl `Home 1` vs `Dlvl:16`.
- C locus: botl.c describe_level; dungeon.c endgamelevelname.
- Change: js/display.js describe_level (Knox/quest/endgame/Dlvl) +
  endgamelevelname; _statusLine2 uses describe_level(1).
- Verification: seed0373 Scr **65→78**/124 RNG full; green+strict
  PASS; cohort **28**/28 PASS.
- Next: Bar-strt outdoor `~` glyphs; or seed5006 dosounds @8468.

