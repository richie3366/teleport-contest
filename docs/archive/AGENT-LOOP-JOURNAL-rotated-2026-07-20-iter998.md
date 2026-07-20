## 2026-07-20 11:42 — #984 seed0383 free-window burn inventory (D-0847)
- Objective: C vs JS display burns post-unstuck docrt/mnexto before @172.
- C locus: display.c docrt/newsym/see_*; mhitu.c expels/unstuck; vision.c
  vision_recalc; teleport.c rloc_to.
- Change or falsified theory: DIAG inventory only (reverted). JS free
  window: docrt 21×383+4×462, see_mon 21×383+1×5, mnexto+post 2×383,
  once-in 22×383+1×5+4×462. Engulfer on hero skips mon_glyph. No gas
  region on burn cells. Need C ~drn2 dim diff — not +N at see_objects.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: record C with NETHACK_RNGLOG_DISP=1; diff ~drn2 vs JS inventory.

## 2026-07-20 11:28 — #983 seed0383 display-stream timeline (D-0847)
- Objective: display-RNG skew before moves=11 see_objects @172.
- C locus: display.c swallowed/see_objects; mhitu.c gulpmu/expels;
  mon.c unstuck→docrt; wizcmds.c wiz_intrinsic docrt.
- Falsified: +N before see_objects (any dim) cannot hit C `)+[[`;
  naive docrt/swallowed cls+bot reorder → RNG 11527 (reverted).
  Timeline: Hallu@8 swallowed → 8×swallowed → ice expels@10 → free
  see_objects@11. No production JS retained.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: burn-site inventory post-unstuck docrt/mnexto before see_mon@11.


