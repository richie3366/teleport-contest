# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-08-16

- [x] `fountain.c` `wash_hands` (named). Not Excalibur. **Addressed:** D-1108


- [x] `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands. **Addressed:** D-1107 `0633a261`


- [x] `fountain.c` `dryup` cansee cloud-glyph skip of dryup pline (named). Not angry_guards. **Addressed:** D-1106 `127c045c`


- [x] `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Not dryup yn. **Addressed:** D-1105 `b4930cb9`


- [x] `fountain.c` `dryup` `angry_guards` after real dryup (named). Not wizard yn. **Addressed:** D-1104 `7458a5b8`


- [x] `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` SURFACE_AT (named from D-1077 review 38). Not `goodpos`. **Addressed:** D-1103 `130e7e21`


- [x] `teleport.c` `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`. **Addressed:** D-1102 `ebe1f041`


- [x] `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (named). Not `onscary`. **Addressed:** D-1101 `a7302142`


- [x] `teleport.c` `goodpos` `passes_walls` + `may_passwall` early-out (named). Not youmonst swim. **Addressed:** D-1100 `305ad188`


- [x] `teleport.c` `goodpos` youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (named). Not `passes_walls`. **Addressed:** D-1099 `a6934a3d`


- [x] `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs. **Addressed:** D-1098 `cdb72162`


- [x] `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE. **Addressed:** D-1097 `d1e7ae23`


- [x] `fountain.c` `dryup` wizard yn (named). Not angry_guards. **Addressed:** D-1096 `bd16c130`


- [x] `potion.c` `split_mon` trap rust / `minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit clone_mon. **Addressed:** D-1095 `a86a7111`


- [x] `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace. **Addressed:** D-1094 `46775b20`


- [x] `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (named from D-1053 review 14). **Addressed:** D-1093 `e0b68f1d`


- [x] `makemon.c` S_ORC / S_ELF / unicorn mlet peace override after `m_initweap` (named omit on makemon row). **Addressed:** D-1092 `c3f28bfd`


- [x] `teleport.c` `goodpos` must call `is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros (named from D-1077 review 38). **Addressed:** D-1091 `278521f1`


- [x] `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`. **Addressed:** D-1090 `43caa8ff`


- [x] `sit.c` `rndcurse` `Antimagic()` must be C `youprop.h` Antimagic ≡ `uprops[ANTIMAGIC]` intrinsic||extrinsic (invent.js `hero_Antimagic` shape), not `HAntimagic`/`EAntimagic` flats that `confer_oc_oprop` never writes. Worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM must `shieldeff` and use the reduced `rnd(6/(Antimagic+Half+1))` count. Do not rewrite `confer_oc_oprop`. Not `update_inventory` / hcolor. Not `is_pool`. Source: reviews/loop-unattended/48-d5038ac7-rndcurse-shieldeff.md **Addressed:** D-1089 `f91650c0`


- [x] `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not peace_minded. **Addressed:** D-1088 `049af16e`


- [x] `sit.c` `rndcurse` `shieldeff` (named omit). Not update_inventory / hcolor. **Addressed:** D-1087 `d5038ac7`


- [x] `steal.c` `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit take_gold D-1049). **Addressed:** D-1086 `89a97acc`


- [x] `engrave.c` `can_reach_floor` `Flying()` must be C `youprop.h` Flying via `uprops[FLYING]` (intrinsic||extrinsic||steed `is_flyer`)&&!blocked, not `HFlying`/`EFlying` flats that `confer_oc_oprop` never writes. Worn `AMULET_OF_FLYING` must skip `check_pit`. Copy `eat.js` `Flying()` shape. Do not rewrite `confer_oc_oprop`. Not steal.c `remove_worn_item`. Source: reviews/loop-unattended/43-453e759c-can-reach-floor-ceiling-hider.md **Addressed:** D-1085 `3e1a74e8`


- [x] `sit.c` `throne_sit_effect` wizard getlin "Throne sit effect (1..13)" (named). Not Analyze y_n. **Addressed:** D-1084 `83a3ada5`


- [x] `engrave.c` `can_reach_floor(check_pit)` teeter/shaft (named from D-1073). Not ceiling_hider. **Addressed:** D-1083 `e6167027`


- [x] `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE (named from D-1069/D-1071). Not check_pit. **Addressed:** D-1082 `453e759c`


- [x] `eat.c` `cprefx` `revive_corpse` after rider lifesave (debt.md). **Addressed:** D-1081 `cd5af20a`


- [x] `shk.c` `u_entered_shop` deserted / angry / Invis / pickaxe doorway (named D-0307). **Addressed:** D-1080 `0a4a5df3`


- [x] `makemon.c` `peace_minded` / `set_malign` read `ptr.msound` (`msounds[]` exists, D-1053). **Addressed:** D-1079 `d7d679c1`


- [x] `sit.c` `split_mon` monster `clone_mon` arm (JS named omit). **Addressed:** D-1078 `c7dcd80a`


- [x] `hack.c` `is_lava` includes DRAWBRIDGE_UP + `DB_LAVA` (named from D-1060). **Addressed:** D-1077 `a9e819a4`


- [x] `trap.c` hero pit/hole bodies under `dotrap` `VIASITTING` (named omit from D-1039). **Addressed:** D-1076 `87b4b7cb`


- [x] `sit.c` `dosit` `lay_an_egg` at end of function. Not hider / reach / ustuck. **Addressed:** D-1075 `f21410e1`


- [x] `sit.c` `dosit` dragon coin hoard: `money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare “hoard”). **Addressed:** D-1074 `962e07a9`


- [x] `sit.c` `dosit` OBJ_AT gate: skip picnic when `uteetering_at_seen_pit` or `uescaped_shaft` like C. **Addressed:** D-1073 `1f21183f`


- [x] `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`). Not swallow combat. **Addressed:** D-1072 `55906000`


- [x] `engrave.c` `can_reach_floor` ustuck AT_HUGS + `!sticks` (`mondata.c` `sticks`). Makes dosit sit-on-air reachable; ship before ustuck lap. Not ceiling_hider / MZ_HUGE. **Addressed:** D-1071 `aa96e08c`


- [x] `engrave.c` `can_reach_floor` Levitation + `sit.js` `dosit` message `Levitation()` must be C `youprop.h` `(HLevitation||ELevitation)&&!BLevitation`, not sticky `u.Levitation` only. Worn boots / potion `#sit` must tumble. Do not pull hugs / ceiling_hider / MZ_HUGE. Source: reviews/loop-unattended/30-872d1d93-dosit-can-reach-floor.md **Addressed:** D-1070 `9d3545c9`


- [x] `sit.c` `dosit` `can_reach_floor(FALSE)`: swallow “no seats” / Levitation tumble / sitting on air. Replace JS Levitation-only early return. **Addressed:** D-1069 `872d1d93`


- [x] `sit.c` `dosit` hider: `u.uundetected && is_hider` except trapper clears ceiling hide. Not `can_reach_floor` / ustuck. **Addressed:** D-1068 `990b06a8`


- [x] `dosit` steed message: C `mon_nam(usteed)`, not `"your steed"`. Source: D-1033 risk 4 (named, not a Must-fix). **Addressed:** D-1067 `2e50b318`


- [x] tut-1 nhcore callback disable on enter/leave. **Addressed:** D-1066 `7e330128`


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
