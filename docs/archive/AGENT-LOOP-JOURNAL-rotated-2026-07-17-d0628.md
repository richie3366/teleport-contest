## 2026-07-17 11:49 — #684 D-0614 on_start nexttime/othertime
- Objective: seed0361 @23015 C nhlib `shuffle` `rn2(2)` vs JS `rnd(13)`.
- C locus: `quest.c` `on_start`; `questpgr`/`nhl_init`; Arc nexttime.
- Change: port Home re-entry nexttime/othertime → `qt_pager` nhl shuffle.
  Matched rn2(3) was coincidental getbones, not partial shuffle.
- Verification: prefix **23015→23016** Scr **268→271** RNG **23269**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @23016 getbones vs `rn2(5)` (Dlvl:37 special); or Pri-strt.
