
## 2026-07-16 17:25 — #578 D-0520 soko1-1 / builds_up difficulty
- Objective: seed0116 @9350 next special after bigrm (`makemaz` rnd(2)→soko1-1).
- C locus: `dat/soko1-1.lua`; `dungeon.c` builds_up/level_difficulty;
  `makemon.c` set_mimic_sym/m_initinv; `mkroom.c` fill_zoo; `sp_lev.c` flip.
- Change: load_soko1_1 + flip + fill_zoo ZOO; hacklib builds_up difficulty;
  Sokoban set_mimic_sym gate + t_at; leprechaun gold; spider/snake mkobj_at.
- Verification: seed0116 **9351→12294** (runner RNG **12336**/12562) Scr 110;
  green+strict; cohort 6/6 PASS. seed0373 still @3289.
- Next: fill_zoo cell filter after flip / place_lregion; or Bar-strt randline;
  or seed5006 dosounds.
