# Rotated from AGENT-LOOP-JOURNAL.md (#622 D-0562)

## 2026-07-16 19:56 — #608 D-0548 soko3-1 / soko3-2 / soko4-2
- Objective: peel seed0373 @29533 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched makemaz `rnd(2)=1`.
- C locus: `dat/soko3-1.lua`, `dat/soko3-2.lua`, `dat/soko4-2.lua`;
  `sp_lev.c` `load_special`.
- Change: `js/mklev.js` loaders + dispatch; soko4-2 hardfloor / PIT /
  SCR_EARTH / branch `place_lregion`. (DIAG showed next miss was
  `soko4-2`, not `soko3-2`, after soko3-1.)
- Verification: rng-diff **29533→30061**; runner RNG **30129**/35386
  Scr 22; green+strict PASS; cohort **28**/28 PASS.
- Next: `next_ident` @30061; or dosounds @8468.

## 2026-07-16 19:52 — #607 D-0547 soko2-1 + DRY boulder
- Objective: peel seed0373 @29189 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched makemaz `rnd(2)=1`.
- C locus: `dat/soko2-1.lua`; `sp_lev.c` `load_special` /
  `is_ok_location` DRY boulder reject.
- Change: `js/mklev.js` `load_soko2_1` + dispatch; `is_ok_location_dry`
  rejects `sobj_at(BOULDER)`.
- Verification: rng-diff **29189→29533**; runner RNG **29554**/35386
  Scr 22; green+strict PASS; cohort **28**/28 PASS.
- Next: nhlib shuffle @29533 (likely soko3-1); or dosounds @8468.
