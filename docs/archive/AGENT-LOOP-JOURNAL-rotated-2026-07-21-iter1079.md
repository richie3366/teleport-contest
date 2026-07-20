## 2026-07-20 23:45 — #1066 D-0915 goto_level unplacebc/placebc
- Objective: seed4500 @52643 C distfleeck rn2(5) vs JS move_special rn2(1).
- C locus: `do.c` `goto_level`; `ball.c` `unplacebc`/`placebc`.
- Change: Punished `unplacebc` before savelev + `placebc` after arrival.
  Stranded ball caused false drag `cause_delay` aborting travel → shk
  `onlineu` polarity (not a shk FORCE). Named omit: Blind glyph;
  maybe_unhide_at; waterlevel swallow; obj_delivery.
- Verification: prefix **52643→52803** RNG **52925** Scr **611**;
  green+strict PASS; cohort 10/10 PASS.
- Next: @52803 themerms/nhlib rn2(5) vs rn2(1000); cadence @#1070.

## 2026-07-20 23:38 — #1065 public score cadence
- Objective: mandatory full `sessions` @#1065; diagnose seed4500 @52643.
- C locus: `shk.c` `shk_move` satdoor/`onlineu` → `move_special` mill.
- Change: no port patch. Score refresh. DIAG: JS shk@home(65,6)
  hero(65,17) `onlineu` → `appr=0` `rn2(1)`; C next `distfleeck`
  ⇒ C `!onlineu` (hero-path desync; do not FORCE shk). Same class as
  D-0376 polarity flip.
- Verification: suite **42/44** Scr **10198**/11405 RNG
  **737530**/792838 (93.02%) `33+0.25/turn`; green+strict PASS;
  seed4500 still prefix **52643** RNG **52967** Scr **608**.
- Next: find when JS hero left C's line vs shk; leaderboard cron;
  cadence @#1070.

