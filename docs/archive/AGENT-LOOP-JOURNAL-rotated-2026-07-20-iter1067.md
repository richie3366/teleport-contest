## 2026-07-20 21:39 — #1053 D-0903 fill_zoo BEEHIVE
- Objective: seed4500 @14216 C `next_ident` vs JS `rn2(3)` after
  matched `fill_ordinary_room` `rn2(5)`.
- C locus: `mkroom.c` `fill_zoo` BEEHIVE center queen/killer + jelly.
- Change: typed `PM_QUEEN_BEE`/`PM_KILLER_BEE` + center +
  `LUMP_OF_ROYAL_JELLY` `rn2(3)` (was `makemon(NULL)`/`rndmonst`).
  Named omit: ANTHOLE antholemon+food; COCKNEST statue loot.
- Verification: seed4500 prefix **14216→18153** Scr **294→302** RNG
  **14271→18215**; green+strict PASS; cohort 11/11 PASS.
- Next: @18153 C `splev_initlev` `rn2(2)` vs JS `rn2(4)` after
  getbones + nhlib shuffle; cadence @#1055.

## 2026-07-20 21:33 — #1052 D-0902 shkveg / mkveggy_at
- Objective: seed4500 @9974 C `shkveg` `rnd(860)` vs JS FOOD `rnd(1000)`.
- C locus: `shknam.c` `veggy_item`/`shkveg`/`mkveggy_at`/`mkshobj_at`;
  `eat.c` `set_tin_variety(HEALTHY_TIN)`.
- Change: port type-only veggy pick + HEALTHY_TIN follow-up; wire
  `VEGETARIAN_CLASS` in `mkshobj_at`. Named omit: Izchak; wizard
  SHOPTYPE; veggy_item obj-path.
- Verification: seed4500 prefix **9974→14216** Scr **284→294** RNG
  **10113→14271**; green+strict; cohort 11/11 PASS.
- Next: seed4500 @14216 next_ident vs rn2(3); leaderboard cron;
  cadence @#1055.
