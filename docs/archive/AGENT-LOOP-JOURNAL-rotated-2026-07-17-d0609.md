## 2026-07-17 09:26 — #665 score + D-0596 set_wear
- Objective: mandatory full `sessions` score (#665÷5) + seed0361
  `doopen_indir` @7924 (PRIMARY).
- C locus: `do_wear.c` `set_wear`/`Helmet_on`; `allmain.c` preamble.
- Change: ported `set_wear`; call from `moveloop_preamble` (fedora
  Archeologist luck). Score: **33/44** Scr **6587**/11405 RNG
  **363924**/792838 (45.90%) `33+0.15/turn`; Δ vs #660 Scr +17 RNG
  +2621.
- Verification: prefix 7924→7973; Scr 181→195; green+strict; cohort
  31/31 PASS.
- Next: seed0361 `m_move` @7973; or Pri-strt seed0367.

## 2026-07-17 09:20 — #664 D-0595 maybe_spin_web
- Objective: seed0361 `maybe_spin_web` @7844 (PRIMARY).
- C locus: `monmove.c` `maybe_spin_web` / `holds_up_web` /
  `count_webbing_walls` / `soko_allow_web`; `mondata.h` `webmaker`;
  `trap.c` `count_traps`.
- Change: ported spider web spin postmov (`rn2(1000)<prob`) + helpers;
  `webmaker` in `m_harmless_trap` WEB arm.
- Verification: prefix 7844→7924; RNG 8126→8215 Scr 180→181;
  green+strict PASS; cohort 33/33 PASS.
- Next: seed0361 `doopen_indir` @7924; or Pri-strt seed0367.

