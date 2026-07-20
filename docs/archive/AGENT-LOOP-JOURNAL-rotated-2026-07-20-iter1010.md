# Rotated from AGENT-LOOP-JOURNAL.md at #1010

## 2026-07-20 14:10 — #997 dochug Hallu idle newsym (D-0853)
- Objective: seed0383 dim-seq from mismatch idx 398 → @195/@198.
- C locus: monmove.c dochug switch Hallu newsym on NOTHING/DONE/NOMOVES
  after 2nd distfleeck (≈931); C call 17281 ~drn2(383).
- Diagnosis: first cell miss was **@198** (levtport @195 already OK).
  Abs LCP 553 = missing idle Hallu mon_glyph between fleeck rn2(5)s;
  #977/@172 Scr−2 was a different window — re-port does not regress.
- Change: `dochug` Hallu `newsym(mx,my)` for NOMOVES/NOTHING/DONE.
- Verification: LCP **553→555**; firstFail **198→199**; Scr **201**
  RNG FULL; cursors 218; green+strict PASS; cohort 8/8.
- Next: LCP 555 C Monnam(430) vs JS mon(383); screen @199+.

## 2026-07-20 13:55 — #996 gulpmu flush+vision_off together (D-0852)
- Objective: seed0383 @195; JS vs C `~drn2` inventory gulp→@195.
- C locus: mhitu.c gulpmu `display_nhwindow` + `vision_recalc(2)`.
- Diagnosis: pre-gulp dims≡C; first mismatch missing 8×~drn2(5) at bat
  engulfs (core 11051); JS then double once-per-input `swallowed(0)`
  (16×383 vs C 8) because More did not consume `l`/`space`. Flush or
  warns alone ±8; together match C.
- Change: `gulpmu` `await flush_topl_more()` + Hallu
  `vision_off_newsym_gbuf({useLiveViz:true})` before `vision_recalc(2)`.
- Verification: Scr **201**/219 RNG FULL; gulp dims match→~16749;
  green+strict PASS; cohort 8/8.
- Next: dim-seq from mismatch idx 398 → @195.
