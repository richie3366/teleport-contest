# Rotated from AGENT-LOOP-JOURNAL.md @ #660 score refresh

## 2026-07-17 00:35 — #648 D-0582 identify more_experienced(0,10)
- Objective: seed5006 @187 points 134 vs 144 (CURRENT primary).
- C locus: potion.c dopotion; zap.c weffects/zapnodir.
- Change: port more_experienced(0,10) on potion makeknown and wand
  disclose/zapnodir when type was unknown.
- Verification: seed5006 Scr **246→247**/249 RNG FULL; remaining @198
  Get-bones map water; green+strict PASS; cohort **29**/29 PASS;
  seed0116 115/127 held.
- Next: seed5006 @198/@199 Get bones? map glyphs; or seed0116 115/127.
## 2026-07-17 00:28 — #647 D-0581 wizard Die?/bones yn
- Objective: seed5006 @185 Die?/Save-bones yn (CURRENT primary).
- C locus: end.c done Die?/savelife; really_done Save bones?;
  bones.c Get/Unlink/Replace; vault.c hidden_gold; zap.c uhim.
- Change: port wizard/discover Die? + savelife; Save bones?;
  Get/Unlink/Replace yn; hidden_gold in score; death-ray flags.female;
  stale-map flush during getbones; botl on uz change.
- Verification: seed5006 Scr **230→246**/249 RNG FULL; green+strict
  PASS; cohort **29**/29 PASS; seed0116 115/127 held.
- Next: seed5006 @187 urexp 134 vs 144; or Get bones? stale map
  glyphs; or seed0116 Scr 115/127.
## 2026-07-17 00:20 — #646 D-0580 doread confused mispronounce
- Objective: seed5006 Scr @162 mispronounce vs level_tele (CURRENT).
- C locus: read.c doread confused/Hallu pline + can_chant silently;
  before seffect_teleportation → level_tele.
- Change: port mispronounce/`Being so trippy` plines; Blind
  cogitate/pronounce via exported can_chant (Strangled subset).
- Verification: seed5006 Scr **228→230**/249 RNG FULL; first miss
  @185 Die?; green+strict PASS; cohort **31**/31 PASS; seed0116
  Scr 115/127 held.
- Next: seed5006 @185 Die?/Save-bones yn; or seed0116 Scr 115/127.
## 2026-07-17 00:17 — #645 formal score refresh
- Objective: mandatory #645 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **31/44**, Scr
  **6514**/11405, RNG **359063**/792838 (45.29%), `32+0.15/turn`
  (R² 0.769). Δ vs #640: Scr **+41**, RNG **+109**, PASS same
  (D-0578/D-0579).
- Next: seed5006 @162 confused mispronounce; or seed0116 Scr 115/127.
