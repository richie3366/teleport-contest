## 2026-07-19 12:05 — #864 orcus + Orcus mongone (D-0767)
- Objective: seed0360 @76622 C nhlib shuffle / walkfrom vs JS rn2(79).
- C locus: `dat/orcus.lua`; `shknam.c` stock_room Orcus mongone;
  `steal.c` mdrop_special_objs obj_resists.
- Change: `load_orcus` + dispatch; `stock_room` Orcus invent obj_resists
  + detach. Omit hellfill/wizard*/fakewiz; full shkgone.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **76622→82982**; RNG **76625→82989**; Scr **273**/833.
- Next: @82982 C nhlib shuffle / wizard1.lua vs JS rn2(79).
## 2026-07-19 11:56 — #863 baalz / baalz_fixup (D-0766)
- Objective: seed0360 @74801 C nhlib shuffle / walkfrom vs JS rn2(79).
- C locus: `dat/baalz.lua`; `mkmaze.c` `baalz_fixup` / bughack wallify;
  `sp_lev.c` corrmaze; map without contents keeps xstart.
- Change: `load_baalz` + dispatch; `baalz_fixup` + `Is_baal_level`;
  bughack in `wall_cleanup`/`fix_wall_spines`. Omit orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 18/18; seed0360 prefix
  **74801→76622**; RNG **74803→76625**; Scr **273**/833.
- Next: @76622 C nhlib shuffle / walkfrom → **orcus** (`orcus.lua:107`).
