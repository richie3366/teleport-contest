## 2026-07-19 — #798 seed0108 wipe Blind sticky (D-0716)
- Objective: seed0108 @3011 after `#invoke` spaces (CURRENT primary).
- C locus: `potion.c` `make_blinded`/`toggle_blindness`; `youprop.h` Blind;
  `do.c` `wipeoff`.
- Change: Blind/`hero_Blind`/`vision_recalc` ≡ props not sticky;
  wipe `make_blinded` syncs `u.Blind` + `vision_recalc(0)` on toggle.
  Falsified: global `rest_on_space` (already). More restored; umov still short.
- Verification: green+strict PASS; prefix still **3011**; cohort
  seed1500/1800/0060 PASS; screens 58→74 on seed0108 runner.
- Next: @3011 C post-EOT `movemon` (umov<12 loopAgain) vs JS umov=15.
