## 2026-07-16 18:10 — #586 D-0527 onquest firsttime nhl shuffle
- Objective: seed0373 @4157 C nhlib shuffle vs JS rn2(79).
- C locus: `quest.c` onquest/on_start; `questpgr.c` qt_pager/
  com_pager_core nhl_init; `do.c` goto_level materialize→onquest.
- Change: `js/quest.js`; qt_pager Bar firsttime + nhl shuffle;
  wire inside goto_level; Barbarian homebase/ldrnum.
- Verification: rng-diff **4157→4159**; runner RNG **4209**/35386
  Scr 21/124; green+strict; cohort **30**/30; seed0116 RNG full.
- Next: Bar-loca load_special @4159; or seed5006 dosounds @8468.
