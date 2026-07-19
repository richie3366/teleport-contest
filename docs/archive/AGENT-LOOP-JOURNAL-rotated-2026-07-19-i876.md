## 2026-07-19 11:40 — #861 hell_tweaks (D-0764)
- Objective: seed0360 @71832 C hell_tweaks percent vs JS flip `rn2(2)`.
- C locus: `dat/nhlib.lua` hell_tweaks; `dat/asmodeus.lua` protected;
  `nhlsel.c` fillrect get_location_coord; selvar grow/or/not/set.
- Change: port `hell_tweaks` + selection helpers; fillrect adds xstart
  (bare abs bounds overran filter_percent by 3 cells).
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **71832→72078**; RNG **71855→72079**; Scr **270**/833.
- Next: @72078 C nhlib shuffle / `lvlfill_swamp` (juiblex) vs JS `rn2(79)`.


## 2026-07-19 11:48 — #862 juiblex / lvlfill_swamp (D-0765)
- Objective: seed0360 @72078 C nhlib shuffle / lvlfill_swamp vs JS rn2(79).
- C locus: `dat/juiblex.lua`; `sp_lev.c` `lvlfill_swamp` / LVLINIT_SWAMP;
  `lspo_map` left/right/top/bottom.
- Change: `lvlfill_swamp` + SWAMP init; map align L/R/T/B; `load_juiblex`
  + dispatch; `Is_juiblex_level`. Omit baalz/orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 15/15; seed0360 prefix
  **72078→74801**; RNG **72079→74607**; Scr **270→267**/833.
- Next: @74801 C nhlib shuffle / `walkfrom` (baalz/orcus/hellfill/wizard*).
