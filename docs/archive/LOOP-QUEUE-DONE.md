# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-08-16

- [x] tut-1 `tut_key` / eckey only. **Addressed:** D-1065 `296bc792`


- [x] tut-1 `place_lregion` only. **Addressed:** D-1064 `dc354c44`


- [x] tut-1 food objects only. **Addressed:** D-1063 `3f376b74`


- [x] tut-1 large-box contents only. **Addressed:** D-1062 `3ca1b544`


- [x] tut-1 stairs only. **Addressed:** D-1061 `05915d9b`


- [x] `dosit` lava/ice sit Fire_resistance/Cold_resistance must read C `youprop.h` (`u.uprops[FIRE_RES]`/`[COLD_RES]` intrinsic||extrinsic). `sit.js` clones H||E flats; `confer_oc_oprop` writes FIRE_RES/COLD_RES only to uprops (`EFire`/`ECold` unmirrored). Worn fire-resistance ring must take `d(2,10)` not `d(10,10)`. Do not rewrite `confer_oc_oprop` this iter; do not pull DRAWBRIDGE_UP+DB_LAVA `is_lava`. Source: reviews/loop-unattended/19-27f0a233-dosit-lava-ice.md **Addressed:** D-1060 `ecd37108`


- [x] tut-1 `des` kelp only. Not stairs / box / key / `place_lregion`. **Addressed:** D-1059 `c0d5279a`


- [x] `sit.c` `dosit` lava / ice / drawbridge sit (terrain, not trap-lava already in D-1039). **Addressed:** D-1058 `27f0a233`


- [x] `sit.c` `dosit` sink / altar / grave / stairs / ladder sit messages only. **Addressed:** D-1057 `e1852e71`


- [x] `dosit` water predicates must use C `Underwater` (`u.uinwater`, `youprop.h:279`), not the unset `u.Underwater` alias. Early pool `goto in_water` and muddy/cushions both read the dead field. Source: reviews/loop-unattended/16-e13735f8-dosit-in-water.md **Addressed:** D-1056 `2e79451d`


- [x] `sit.c` `dosit` water / pool / gremlin sit (after trap, before sink). Not the furniture list. **Addressed:** D-1055 `e13735f8`


- [x] `get_obj_location` flags: JS `0` must not accept CONTAINED when C hatch passes `0`. Source: D-1036 risk 4. **Addressed:** D-1054 `3f8469fe`


- [x] `cry_sound`: monster `msound` must be C `monflag.h` numbers, not empty → always-chitter. Source: `reviews/loop-2026-08-15/D-1036-2ae43a8b-hatch-egg.md` risk 3. **Addressed:** D-1053 `178d60f2`
- [x] Cursed-lamp `make_glib`: JS `(u.Glib|0)&TIMEOUT` must match C `HGlib|EGlib` timeout. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` `use_lamp` gap. **Addressed:** D-1052 `1710bd41`
- [x] `u_wipe_engr` / `tmp_at` no-ops in apply: wire or stop calling them as if they were C. Source: D-1022 risk 7. **Addressed:** D-1051 `7e389050`
- [x] `pickup_object` honors `telekinesis` like C (whip/grapple pull-in). Source: D-1022 risk 6. **Addressed:** D-1050 `4e55ff2f`

## 2026-08-15

- [x] `take_gold` must `remove_worn_item` like C `sit.c`. Source: `reviews/loop-2026-08-15/D-1034-63e86f5a-ordinary-throne.md` risk 3. **Addressed:** D-1049 `9e24f61a`


- [x] Vlad special case 10: C sets `HConfusion` only; JS must not also force flat `u.Confusion`. Source: `reviews/loop-2026-08-15/D-1033-a59caac8-vlad-throne.md` risk 2. **Addressed:** D-1048 `e395bb74`


- [x] `consume_obj_charge` unpaid/shop path (not `spe--` only). Source: D-1023 risk 3. **Addressed:** D-1047 `2ca2ccd7`


- [x] `light_cocktail` must take/update `struct obj **` like C `apply.c` `light_cocktail`. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` risk 4. **Addressed:** D-1046 `3371ddf0`


- [x] Whip/pole/grapple names: real `yname` / `Amonnam` / `mbodypart` (not local apply clones). Source: D-1022 risk 5. **Addressed:** D-1045 `e8884a53`.


- [x] `special_obj_hits_leader` must use C `is_quest_artifact` (`urole.questarti`), not `u.questarti`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1044 `d9febc3c`.

- [x] `find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding like C `worn.c` (thitmonst tmp). Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1042 `19e907f5`.
- [x] `should_mulch_missile` hero blessed save must be `rnl(4)` not `rn2(4)` like C `dothrow.c`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1043 `d3fac215`.
- [x] Pole targeting: `glyph_is_poleable_at` / `find_poleable_mon` must follow C `apply.c` `use_pole` (live `m_at` / map, not a glyph-only stand-in). Source: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` risk 3. **Addressed:** D-1040 `12458fe9`.
- [x] Pole `thitmonst` hit-vs-miss envelope for `use_pole` (combat RNG). Source: D-1022 risk 4. **Addressed:** D-1041 `eb3469ae`.
