## 2026-07-17 09:50 — #667 D-0598 searches_for_item (@7973)
- Objective: seed0361 `m_move` @7973 C `rn2(20)` vs JS `rn2(32)`.
- C locus: `muse.c` `searches_for_item`; `monmove.c` `mon_would_take_item`.
- Change: ported `searches_for_item` + wired into `mon_would_take_item`.
  C recorder: centaur gg→POT_HEALING (70,4) at=(71,4) cnt=5; JS had chased
  hero → (71,5) cnt=8. D-0597 pool/lava not the root.
- Verification: prefix **7973→11065** Scr **195→198**; green+strict PASS;
  cohort **31/31** PASS.
- Next: seed0361 @11065 `dmgval` `rnd(20)` vs `rn2(5)`; or Pri-strt.

