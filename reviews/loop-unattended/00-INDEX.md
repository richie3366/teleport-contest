# Unattended loop reviews

Written by review iterations (`scripts/agent-port-loop.review.prompt.md`).
English. One file per JS-touching commit (or a tight SHA group).
QUALITY-RISK / REJECT must prepend `docs/LOOP-QUEUE.md` **Must-fix**
in the same iteration (commit + push). The next port pops that first.

Catch-up of `reviews/loop-2026-08-15/` (unpaid C-wrongs) lives in
`LOOP-QUEUE.md` Must-fix until those rows are checked off.

| File | Commit | D-id | Verdict |
|------|--------|------|---------|
| [01-12458fe9-pole-glyph-targeting.md](./01-12458fe9-pole-glyph-targeting.md) | `12458fe9` | D-1040 pole `glyph_at` | **ACCEPT-WITH-DEBT** |
| [02-eb3469ae-thitmonst-hit-vs-miss.md](./02-eb3469ae-thitmonst-hit-vs-miss.md) | `eb3469ae` | D-1041 `thitmonst` hit-vs-miss | **QUALITY-RISK** |
| [03-19e907f5-find-mac-arm-bonus.md](./03-19e907f5-find-mac-arm-bonus.md) | `19e907f5` | D-1042 `find_mac` ARM_BONUS | **ACCEPT** |
| [04-d3fac215-mulch-rnl.md](./04-d3fac215-mulch-rnl.md) | `d3fac215` | D-1043 mulch hero `rnl(4)` | **ACCEPT** |
| [05-d9febc3c-leader-questarti.md](./05-d9febc3c-leader-questarti.md) | `d9febc3c` | D-1044 `urole.questarti` | **ACCEPT** |
| [06-e8884a53-whip-yname-amonnam.md](./06-e8884a53-whip-yname-amonnam.md) | `e8884a53` | D-1045 `yname`/`Amonnam`/`mbodypart` | **ACCEPT** |
| [07-3371ddf0-light-cocktail-optr.md](./07-3371ddf0-light-cocktail-optr.md) | `3371ddf0` | D-1046 `light_cocktail` `**optr` | **ACCEPT** |
| [08-2ca2ccd7-consume-obj-charge.md](./08-2ca2ccd7-consume-obj-charge.md) | `2ca2ccd7` | D-1047 `consume_obj_charge` unpaid | **ACCEPT** |
| [09-e395bb74-vlad-hconfusion-only.md](./09-e395bb74-vlad-hconfusion-only.md) | `e395bb74` | D-1048 Vlad case 10 `HConfusion` only | **ACCEPT** |
| [10-9e24f61a-take-gold-remove-worn.md](./10-9e24f61a-take-gold-remove-worn.md) | `9e24f61a` | D-1049 `take_gold` `remove_worn_item` | **ACCEPT** |
| [11-4e55ff2f-pickup-telekinesis.md](./11-4e55ff2f-pickup-telekinesis.md) | `4e55ff2f` | D-1050 `pickup_object` telekinesis | **ACCEPT** |
| [12-7e389050-wipe-engr-tmp-at.md](./12-7e389050-wipe-engr-tmp-at.md) | `7e389050` | D-1051 `u_wipe_engr` / S_goodpos `tmp_at` | **ACCEPT** |
| [13-1710bd41-glib-timeout.md](./13-1710bd41-glib-timeout.md) | `1710bd41` | D-1052 cursed-lamp `Glib` TIMEOUT | **ACCEPT** |
| [14-178d60f2-msound-cry.md](./14-178d60f2-msound-cry.md) | `178d60f2` | D-1053 `cry_sound` `msound` | **ACCEPT** |
| [15-3f8469fe-restobjchn-contained.md](./15-3f8469fe-restobjchn-contained.md) | `3f8469fe` | D-1054 restore cobj `OBJ_CONTAINED` | **ACCEPT** |
| [16-e13735f8-dosit-in-water.md](./16-e13735f8-dosit-in-water.md) | `e13735f8` | D-1055 `dosit` `in_water` | **QUALITY-RISK** |
| [17-2e79451d-dosit-underwater.md](./17-2e79451d-dosit-underwater.md) | `2e79451d` | D-1056 `dosit` `Underwater` ≡ `u.uinwater` | **ACCEPT** |
| [18-e1852e71-dosit-furniture.md](./18-e1852e71-dosit-furniture.md) | `e1852e71` | D-1057 furniture sit_message | **ACCEPT** |
| [19-27f0a233-dosit-lava-ice.md](./19-27f0a233-dosit-lava-ice.md) | `27f0a233` | D-1058 lava/ice/DRAWBRIDGE_DOWN sit | **QUALITY-RISK** |
| [20-c0d5279a-mineralize-kelp.md](./20-c0d5279a-mineralize-kelp.md) | `c0d5279a` | D-1059 mineralize kelp | **ACCEPT** |
| [21-ecd37108-dosit-fire-cold-uprops.md](./21-ecd37108-dosit-fire-cold-uprops.md) | `ecd37108` | D-1060 sit Fire/Cold `uprops[]` | **ACCEPT** |
| [22-05915d9b-tut1-l-create-stairway.md](./22-05915d9b-tut1-l-create-stairway.md) | `05915d9b` | D-1061 tut-1 packed `l_create_stairway` | **ACCEPT** |
| [23-3ca1b544-tut1-create-object.md](./23-3ca1b544-tut1-create-object.md) | `3ca1b544` | D-1062 tut-1 `create_object` large-box | **ACCEPT** |
| [24-3f376b74-tut1-food-objects.md](./24-3f376b74-tut1-food-objects.md) | `3f376b74` | D-1063 tut-1 food `create_object` | **ACCEPT** |
| [25-dc354c44-tut1-levregion-add.md](./25-dc354c44-tut1-levregion-add.md) | `dc354c44` | D-1064 tut-1 `levregion_add` TELE dests | **ACCEPT** |
| [26-296bc792-tut1-tut-key-eckey.md](./26-296bc792-tut1-tut-key-eckey.md) | `296bc792` | D-1065 tut-1 `tut_key` / `nh.eckey` | **ACCEPT** |
| [27-7e330128-tut1-tutorial-nhcore.md](./27-7e330128-tut1-tutorial-nhcore.md) | `7e330128` | D-1066 tut-1 `tutorial()` nhcore disable | **ACCEPT** |
| [28-2e50b318-dosit-steed-mon-nam.md](./28-2e50b318-dosit-steed-mon-nam.md) | `2e50b318` | D-1067 `dosit` steed `mon_nam` | **ACCEPT** |
| [29-990b06a8-dosit-hider-uundetected.md](./29-990b06a8-dosit-hider-uundetected.md) | `990b06a8` | D-1068 `dosit` hider `uundetected` | **ACCEPT** |
| [30-872d1d93-dosit-can-reach-floor.md](./30-872d1d93-dosit-can-reach-floor.md) | `872d1d93` | D-1069 `dosit` `can_reach_floor` | **QUALITY-RISK** |
| [31-9d3545c9-can-reach-floor-levitation.md](./31-9d3545c9-can-reach-floor-levitation.md) | `9d3545c9` | D-1070 `can_reach_floor` Levitation | **ACCEPT** |
| [32-aa96e08c-can-reach-floor-hugs.md](./32-aa96e08c-can-reach-floor-hugs.md) | `aa96e08c` | D-1071 `can_reach_floor` hugs | **ACCEPT** |
| [33-55906000-dosit-ustuck-lap.md](./33-55906000-dosit-ustuck-lap.md) | `55906000` | D-1072 `dosit` ustuck lap | **ACCEPT** |
| [34-1f21183f-dosit-picnic-teeter.md](./34-1f21183f-dosit-picnic-teeter.md) | `1f21183f` | D-1073 picnic `uteetering`/`uescaped_shaft` | **ACCEPT** |
| [35-962e07a9-dosit-meager-hoard.md](./35-962e07a9-dosit-meager-hoard.md) | `962e07a9` | D-1074 dragon `money_cnt` meager | **ACCEPT** |
| [36-f21410e1-dosit-lay-an-egg.md](./36-f21410e1-dosit-lay-an-egg.md) | `f21410e1` | D-1075 `dosit` `lay_an_egg` | **ACCEPT** |
| [37-87b4b7cb-dotrap-pit-hole.md](./37-87b4b7cb-dotrap-pit-hole.md) | `87b4b7cb` | D-1076 hero pit/hole `dotrap` | **ACCEPT-WITH-DEBT** |
| [38-a9e819a4-is-lava-drawbridge.md](./38-a9e819a4-is-lava-drawbridge.md) | `a9e819a4` | D-1077 `is_lava` DRAWBRIDGE_UP+`DB_LAVA` | **ACCEPT** |
| [39-c7dcd80a-split-mon-clone-mon.md](./39-c7dcd80a-split-mon-clone-mon.md) | `c7dcd80a` | D-1078 sit `split_mon` `clone_mon` | **ACCEPT** |
| [40-d7d679c1-peace-malign-msound.md](./40-d7d679c1-peace-malign-msound.md) | `d7d679c1` | D-1079 `peace_minded`/`set_malign` `ptr.msound` | **ACCEPT** |
| [41-0a4a5df3-u-entered-shop.md](./41-0a4a5df3-u-entered-shop.md) | `0a4a5df3` | D-1080 `u_entered_shop` deserted/angry/Invis/doorway | **ACCEPT-WITH-DEBT** |
| [42-cd5af20a-cprefx-revive-corpse.md](./42-cd5af20a-cprefx-revive-corpse.md) | `cd5af20a` | D-1081 `cprefx` rider `revive_corpse` | **ACCEPT** |
| [43-453e759c-can-reach-floor-ceiling-hider.md](./43-453e759c-can-reach-floor-ceiling-hider.md) | `453e759c` | D-1082 `can_reach_floor` ceiling_hider / Flying\|\|MZ_HUGE | **QUALITY-RISK** |
| [44-e6167027-can-reach-floor-check-pit.md](./44-e6167027-can-reach-floor-check-pit.md) | `e6167027` | D-1083 `can_reach_floor(check_pit)` teeter/shaft | **ACCEPT** |
| [45-83a3ada5-throne-wizard-getlin.md](./45-83a3ada5-throne-wizard-getlin.md) | `83a3ada5` | D-1084 `throne_sit_effect` wizard getlin | **ACCEPT** |
| [46-3e1a74e8-can-reach-floor-flying-uprops.md](./46-3e1a74e8-can-reach-floor-flying-uprops.md) | `3e1a74e8` | D-1085 `can_reach_floor` Flying `uprops[FLYING]` | **ACCEPT** |
| [47-89a97acc-remove-worn-item-armor-off.md](./47-89a97acc-remove-worn-item-armor-off.md) | `89a97acc` | D-1086 `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` | **ACCEPT-WITH-DEBT** |
| [48-d5038ac7-rndcurse-shieldeff.md](./48-d5038ac7-rndcurse-shieldeff.md) | `d5038ac7` | D-1087 `rndcurse` Antimagic `shieldeff` | **QUALITY-RISK** |
| [49-049af16e-m-initweap-priest-guardian-msound.md](./49-049af16e-m-initweap-priest-guardian-msound.md) | `049af16e` | D-1088 `m_initweap` priest/guardian `ptr.msound` | **ACCEPT** |
| [50-f91650c0-rndcurse-antimagic-uprops.md](./50-f91650c0-rndcurse-antimagic-uprops.md) | `f91650c0` | D-1089 sit `rndcurse` `Antimagic()` via `uprops[ANTIMAGIC]` | **ACCEPT** |
| [51-43caa8ff-is-pool-is-moat-drawbridge.md](./51-43caa8ff-is-pool-is-moat-drawbridge.md) | `43caa8ff` | D-1090 `is_pool`/`is_moat` DRAWBRIDGE_UP+`DB_MOAT` | **ACCEPT** |
| [52-278521f1-goodpos-is-pool-is-lava.md](./52-278521f1-goodpos-is-pool-is-lava.md) | `278521f1` | D-1091 `goodpos` `is_pool()`/`is_lava()` not typ macros | **ACCEPT** |
| [53-c3f28bfd-makemon-orc-unicorn-peace.md](./53-c3f28bfd-makemon-orc-unicorn-peace.md) | `c3f28bfd` | D-1092 `makemon` S_ORC/S_UNICORN mlet peace | **ACCEPT** |
| [54-e0b68f1d-dogmove-numeric-msound.md](./54-e0b68f1d-dogmove-numeric-msound.md) | `e0b68f1d` | D-1093 `dogmove` pal/target numeric `ptr.msound` | **ACCEPT-WITH-DEBT** |
| [55-46775b20-role-init-nemesis-msound.md](./55-46775b20-role-init-nemesis-msound.md) | `46775b20` | D-1094 `role_init` overlay + MS_NEMESIS Bell | **ACCEPT** |
| [56-a86a7111-split-mon-callers.md](./56-a86a7111-split-mon-callers.md) | `a86a7111` | D-1095 rust/`minliquid`/uhitm AD_COLD `split_mon` | **ACCEPT** |
| [57-bd16c130-dryup-wizard-yn.md](./57-bd16c130-dryup-wizard-yn.md) | `bd16c130` | D-1096 `dryup` wizard `y_n` | **ACCEPT** |
| [58-d1e7ae23-kill-eggs-genocide.md](./58-d1e7ae23-kill-eggs-genocide.md) | `d1e7ae23` | D-1097 `kill_eggs` after genocide | **ACCEPT** |
| [59-cdb72162-seffects-scr-genocide.md](./59-cdb72162-seffects-scr-genocide.md) | `cdb72162` | D-1098 `seffects` SCR_GENOCIDE / `name_to_monclass` | **ACCEPT-WITH-DEBT** |
| [60-a6934a3d-goodpos-youmonst-swim.md](./60-a6934a3d-goodpos-youmonst-swim.md) | `a6934a3d` | D-1099 `goodpos` youmonst swim/lev/fly/wwalk | **ACCEPT** |
| [61-305ad188-goodpos-passes-walls.md](./61-305ad188-goodpos-passes-walls.md) | `305ad188` | D-1100 `goodpos` `passes_walls` + `may_passwall` | **ACCEPT** |
| [62-a7302142-goodpos-exclusion-zone.md](./62-a7302142-goodpos-exclusion-zone.md) | `a7302142` | D-1101 `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` | **ACCEPT** |
| [63-ebe1f041-goodpos-onscary.md](./63-ebe1f041-goodpos-onscary.md) | `ebe1f041` | D-1102 `goodpos_onscary` Elbereth / scare / altar-vamp | **ACCEPT-WITH-DEBT** |
| [64-130e7e21-db-under-typ.md](./64-130e7e21-db-under-typ.md) | `130e7e21` | D-1103 `db_under_typ` / `waterbody_name` SURFACE_AT | **ACCEPT** |
| [65-7458a5b8-dryup-angry-guards.md](./65-7458a5b8-dryup-angry-guards.md) | `7458a5b8` | D-1104 `dryup` `angry_guards` after real dryup | **ACCEPT** |
| [66-b4930cb9-watchman-deaf-shake.md](./66-b4930cb9-watchman-deaf-shake.md) | `b4930cb9` | D-1105 `watchman_warn_fountain` Deaf shake/wave | **ACCEPT** |
| [67-127c045c-dryup-cloud-glyph.md](./67-127c045c-dryup-cloud-glyph.md) | `127c045c` | D-1106 `dryup` cansee `S_cloud` skip | **ACCEPT-WITH-DEBT** |
| [68-0633a261-dipfountain-excalibur.md](./68-0633a261-dipfountain-excalibur.md) | `0633a261` | D-1107 `dipfountain` Excalibur LONG_SWORD | **ACCEPT** |
| [69-62b93acb-wash-hands.md](./69-62b93acb-wash-hands.md) | `62b93acb` | D-1108 `wash_hands` + dipfountain hands/uarmg | **ACCEPT** |
| [70-5bf81ca7-lspo-exclusion.md](./70-5bf81ca7-lspo-exclusion.md) | `5bf81ca7` | D-1109 `lspo_exclusion` populate `exclusion_zones` | **ACCEPT** |
| [71-fd738eab-goodpos-onscary-live.md](./71-fd738eab-goodpos-onscary-live.md) | `fd738eab` | D-1110 `goodpos` live-mon `onscary` | **ACCEPT** |
| [72-b0847b88-teleok-vibrating-pit.md](./72-b0847b88-teleok-vibrating-pit.md) | `b0847b88` | D-1111 `teleok` vibrating / pit-fly | **ACCEPT** |
| [73-bb552fba-mlevel-tele-trap.md](./73-bb552fba-mlevel-tele-trap.md) | `bb552fba` | D-1112 `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP | **ACCEPT** |
| [74-c67f09d1-dipsink.md](./74-c67f09d1-dipsink.md) | `c67f09d1` | D-1113 `dipsink` + dodip sink yn | **ACCEPT** |
| [75-e30a51f2-dipfountain-uncurse.md](./75-e30a51f2-dipfountain-uncurse.md) | `e30a51f2` | D-1114 `dipfountain` cases 17–20 uncurse | **ACCEPT** |
| [76-79438232-dipfountain-mkgold.md](./76-79438232-dipfountain-mkgold.md) | `79438232` | D-1115 `dipfountain` case 29 `mkgold` | **ACCEPT** |
| [77-19e4be31-drinkfountain-enlightenment.md](./77-19e4be31-drinkfountain-enlightenment.md) | `19e4be31` | D-1116 `drinkfountain` case 19 MAGIC enlightenment | **ACCEPT** |
| [78-afb86487-gush-minliquid.md](./78-afb86487-gush-minliquid.md) | `afb86487` | D-1117 `gush` `minliquid` when `m_at` | **ACCEPT** |
| [79-8a01c200-drinksink-polyself.md](./79-8a01c200-drinksink-polyself.md) | `8a01c200` | D-1118 drinksink case 10 `polyself` | **ACCEPT** |
| [80-26560ccf-teleok-jump-region.md](./80-26560ccf-teleok-jump-region.md) | `26560ccf` | D-1119 teleok `tele_jump_ok` / `in_out_region` | **ACCEPT** |
| [81-acfb0167-tele-trap-wrenching.md](./81-acfb0167-tele-trap-wrenching.md) | `acfb0167` | D-1120 `tele_trap` Antimagic wrenching | **ACCEPT** |
| [82-803a7f5c-teleds-fill-pit.md](./82-803a7f5c-teleds-fill-pit.md) | `803a7f5c` | D-1121 `teleds` `fill_pit` after `u_on_newpos` | **ACCEPT-WITH-DEBT** |
| [83-5a2f96ca-rloc-wizard-stair.md](./83-5a2f96ca-rloc-wizard-stair.md) | `5a2f96ca` | D-1122 `rloc` Wizard stair / `control_mon_tele` | **ACCEPT** |
| [84-a55c4b24-rloc-to-worm-docrt.md](./84-a55c4b24-rloc-to-worm-docrt.md) | `a55c4b24` | D-1123 `rloc_to` worm / ustuck-swallow `docrt` | **ACCEPT** |
| [85-3b7606b3-drinksink-gas-cloud.md](./85-3b7606b3-drinksink-gas-cloud.md) | `3b7606b3` | D-1124 drinksink case 13 `create_gas_cloud` | **ACCEPT** |
