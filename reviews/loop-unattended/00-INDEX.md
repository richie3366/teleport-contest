# Unattended loop reviews

Written by review iterations (`scripts/agent-port-loop.review.prompt.md`).
English. One file per JS-touching commit, written to disk as that SHA is
finished; the audit still **commits them together**. QUALITY-RISK / REJECT
must prepend `docs/LOOP-QUEUE.md` **Must-fix** in the same iteration
(commit + push). The next port pops that first.

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
| [86-2fc408c0-dowatersnakes-rndmonnam.md](./86-2fc408c0-dowatersnakes-rndmonnam.md) | `2fc408c0` | D-1125 `dowatersnakes` Hallucination `rndmonnam` | **ACCEPT** |
| [87-6497347e-drinkfountain-update-inventory.md](./87-6497347e-drinkfountain-update-inventory.md) | `6497347e` | D-1126 drinkfountain case 24 `update_inventory` | **ACCEPT** |
| [88-b4954c6f-vomit-cantvomit-acid.md](./88-b4954c6f-vomit-cantvomit-acid.md) | `b4954c6f` | D-1127 `vomit` cantvomit/Sick/acid | **ACCEPT** |
| [89-5b3923d7-dodip-pool-yn.md](./89-5b3923d7-dodip-pool-yn.md) | `5b3923d7` | D-1128 `dodip` pool yn | **ACCEPT** |
| [90-410f22a2-teleds-switch-terrain.md](./90-410f22a2-teleds-switch-terrain.md) | `410f22a2` | D-1129 `teleds` `switch_terrain` dest-typ | **ACCEPT** |
| [91-6dd7a794-teleds-update-player-regions.md](./91-6dd7a794-teleds-update-player-regions.md) | `6dd7a794` | D-1130 `teleds` `update_player_regions` | **ACCEPT** |
| [92-00956ae8-teleds-hideunder-mimic.md](./92-00956ae8-teleds-hideunder-mimic.md) | `00956ae8` | D-1131 `teleds` hideunder / mimic | **ACCEPT-WITH-DEBT** |
| [93-a8d04dd2-teleds-buried-ball.md](./93-a8d04dd2-teleds-buried-ball.md) | `a8d04dd2` | D-1132 `teleds` TT_BURIEDBALL unearth | **ACCEPT** |
| [94-a956e990-tele-trap-teledest.md](./94-a956e990-tele-trap-teledest.md) | `a956e990` | D-1133 `tele_trap` teledest / `tele()` | **ACCEPT** |
| [95-5f55ceba-dipfountain-update-inventory.md](./95-5f55ceba-dipfountain-update-inventory.md) | `5f55ceba` | D-1134 `dipfountain` after-switch `update_inventory` | **ACCEPT** |
| [96-b166bda5-hcolor-drinksink.md](./96-b166bda5-hcolor-drinksink.md) | `b166bda5` | D-1135 `hcolor` Hallu drinksink | **ACCEPT** |
| [97-52aea3d1-mongrantswish-tmp-at.md](./97-52aea3d1-mongrantswish-tmp-at.md) | `52aea3d1` | D-1136 `mongrantswish` `tmp_at` hide | **ACCEPT** |
| [98-50136436-make-gas-cloud-enveloped.md](./98-50136436-make-gas-cloud-enveloped.md) | `50136436` | D-1137 `make_gas_cloud` enveloped You | **ACCEPT** |
| [99-068e78df-minliquid-lava-on-fire.md](./99-068e78df-minliquid-lava-on-fire.md) | `068e78df` | D-1138 minliquid lava `on_fire` / `xkilled` | **ACCEPT** |
| [100-4071a74d-teleds-swallow-docrt.md](./100-4071a74d-teleds-swallow-docrt.md) | `4071a74d` | D-1139 `teleds` swallow `docrt` | **ACCEPT** |
| [101-36fb8797-teleds-vault-uleftvault.md](./101-36fb8797-teleds-vault-uleftvault.md) | `36fb8797` | D-1140 `teleds` vault_guard `uleftvault` | **ACCEPT-WITH-DEBT** |
| [102-4d71520e-teleds-invocation-message.md](./102-4d71520e-teleds-invocation-message.md) | `4d71520e` | D-1141 `teleds` `invocation_message` | **ACCEPT** |
| [103-52194cc9-teleds-notice-mon.md](./103-52194cc9-teleds-notice-mon.md) | `52194cc9` | D-1142 `teleds` `notice_mon_off` / `notice_all_mons` | **ACCEPT-WITH-DEBT** |
| [104-bb8585ec-in-out-region-msgs.md](./104-bb8585ec-in-out-region-msgs.md) | `bb8585ec` | D-1143 `in_out_region` enter_msg / leave_msg | **ACCEPT** |
| [105-1c1f7ccb-djinni-from-bottle.md](./105-1c1f7ccb-djinni-from-bottle.md) | `1c1f7ccb` | D-1144 `djinni_from_bottle` `mongrantswish` | **ACCEPT** |
| [106-623bc861-excalibur-update-inventory.md](./106-623bc861-excalibur-update-inventory.md) | `623bc861` | D-1145 Excalibur `:441` `update_inventory` | **ACCEPT** |
| [107-fe5cefad-inside-gas-cloud.md](./107-fe5cefad-inside-gas-cloud.md) | `fe5cefad` | D-1146 `inside_gas_cloud` damage | **ACCEPT** |
| [108-5c43dbc9-rndcolor.md](./108-5c43dbc9-rndcolor.md) | `5c43dbc9` | D-1147 `rndcolor` chest_trap gas | **ACCEPT** |
| [109-27274b3b-overcrowding.md](./109-27274b3b-overcrowding.md) | `27274b3b` | D-1148 `deal_with_overcrowding` limbo / clog | **QUALITY-RISK** |
| [110-cdaccd3a-mongone-mdrop-special.md](./110-cdaccd3a-mongone-mdrop-special.md) | `cdaccd3a` | D-1149 `mongone` `mdrop_special_objs` | **ACCEPT** |
| [111-505df513-domove-invocation.md](./111-505df513-domove-invocation.md) | `505df513` | D-1150 `domove` walk `invocation_message` | **ACCEPT** |
| [112-6bdf4d49-classify-terrain.md](./112-6bdf4d49-classify-terrain.md) | `6bdf4d49` | D-1151 `switch_terrain` `classify_terrain` | **ACCEPT** |
| [113-9b5ce7b3-rloc-maybe-unhide.md](./113-9b5ce7b3-rloc-maybe-unhide.md) | `9b5ce7b3` | D-1152 `rloc_to` `maybe_unhide_at` dest | **ACCEPT** |
| [114-b332516f-vault-tele-fallback.md](./114-b332516f-vault-tele-fallback.md) | `b332516f` | D-1153 `vault_tele` `tele()` fallback | **ACCEPT** |
| [115-10904562-pick-vibrasquare.md](./115-10904562-pick-vibrasquare.md) | `10904562` | D-1154 `pick_vibrasquare_location` / hellfill VS | **ACCEPT** |
| [116-df99ab32-expire-gas-cloud.md](./116-df99ab32-expire-gas-cloud.md) | `df99ab32` | D-1155 `expire_gas_cloud` dissipation plines | **ACCEPT** |
| [117-16e8d88b-fumaroles-whoosh.md](./117-16e8d88b-fumaroles-whoosh.md) | `16e8d88b` | D-1156 fumaroles `clear_heros_fault` / Norep whoosh | **ACCEPT** |
| [118-ed28eef1-walk-in-out-region.md](./118-ed28eef1-walk-in-out-region.md) | `ed28eef1` | D-1157 walk `in_out_region` | **ACCEPT** |
| [119-7cc347fc-create-gas-cloud-selection.md](./119-7cc347fc-create-gas-cloud-selection.md) | `7cc347fc` | D-1158 `create_gas_cloud_selection` / Cloud room | **ACCEPT** |
| [120-e42ace32-mfndpos-m-poisongas-ok.md](./120-e42ace32-mfndpos-m-poisongas-ok.md) | `e42ace32` | D-1159 mfndpos `m_poisongas_ok` vamp/eel/breath | **ACCEPT** |
| [121-8efa62e9-rloc-set-apparxy.md](./121-8efa62e9-rloc-set-apparxy.md) | `8efa62e9` | D-1160 `rloc_to` `set_apparxy` dest | **ACCEPT** |
| [122-4dfadf3a-rloc-update-monster-region.md](./122-4dfadf3a-rloc-update-monster-region.md) | `4dfadf3a` | D-1161 `rloc_to` `update_monster_region` | **ACCEPT** |
| [123-38353d8a-rloc-make-angry-shk.md](./123-38353d8a-rloc-make-angry-shk.md) | `38353d8a` | D-1162 `rloc_to` `make_angry_shk` | **ACCEPT** |
| [124-d24ff150-rloc-stolen-value.md](./124-d24ff150-rloc-stolen-value.md) | `d24ff150` | D-1163 `rloc_to` minvent `stolen_value` | **ACCEPT** |
| [125-6f7e188b-rloc-mintrap.md](./125-6f7e188b-rloc-mintrap.md) | `6f7e188b` | D-1164 `rloc_to` trapped `mintrap` | **ACCEPT** |
| [126-6d44ab7f-hurtle-in-out-region.md](./126-6d44ab7f-hurtle-in-out-region.md) | `6d44ab7f` | D-1165 `hurtle_step` `in_out_region` | **ACCEPT** |
| [127-0cb3acbe-goto-level-in-out-region.md](./127-0cb3acbe-goto-level-in-out-region.md) | `0cb3acbe` | D-1166 `goto_level` `in_out_region` | **ACCEPT** |
| [128-d6ba6ede-youmonst-m-postmove.md](./128-d6ba6ede-youmonst-m-postmove.md) | `d6ba6ede` | D-1167 youmonst `m_postmove_effect` | **ACCEPT** |
| [129-0ff54fb4-moveloop-fumaroles.md](./129-0ff54fb4-moveloop-fumaroles.md) | `0ff54fb4` | D-1168 moveloop EOT fumaroles | **ACCEPT** |
| [130-0f1ce7c6-run-regions-hero-inside.md](./130-0f1ce7c6-run-regions-hero-inside.md) | `0f1ce7c6` | D-1169 `run_regions` hero `inside_f` bit | **ACCEPT** |
| [131-5a6be1fe-rloc-occupation-dochugw.md](./131-5a6be1fe-rloc-occupation-dochugw.md) | `5a6be1fe` | D-1170 `rloc_to` occupation `dochugw` | **ACCEPT** |
| [132-822498d3-rloc-pos-ok-room-lock.md](./132-822498d3-rloc-pos-ok-room-lock.md) | `822498d3` | D-1171 `rloc_pos_ok` shk/priest room | **ACCEPT** |
| [133-e7c5c8ac-rloc-steed-tele.md](./133-e7c5c8ac-rloc-steed-tele.md) | `e7c5c8ac` | D-1172 `rloc` steed `tele()` | **ACCEPT** |
| [134-e07eeae7-mnexto-control-mon-tele.md](./134-e07eeae7-mnexto-control-mon-tele.md) | `e07eeae7` | D-1173 `mnexto` `control_mon_tele` savemm | **ACCEPT** |
| [135-e5ec6685-mdisplacem-update-monster-region.md](./135-e5ec6685-mdisplacem-update-monster-region.md) | `e5ec6685` | D-1174 `mdisplacem` `update_monster_region` | **ACCEPT** |
| [136-7188da5b-youmonst-m-everyturn-effect.md](./136-7188da5b-youmonst-m-everyturn-effect.md) | `7188da5b` | D-1175 youmonst `m_everyturn_effect` | **ACCEPT** |
| [137-b652fbf3-mhurtle-step-m-in-out-region.md](./137-b652fbf3-mhurtle-step-m-in-out-region.md) | `b652fbf3` | D-1176 `mhurtle_step` `m_in_out_region` | **ACCEPT** |
| [138-36e0ce72-goto-level-obj-delivery.md](./138-36e0ce72-goto-level-obj-delivery.md) | `36e0ce72` | D-1177 `goto_level` `obj_delivery` | **ACCEPT** |
| [139-4a700d08-goto-level-fix-shop-damage.md](./139-4a700d08-goto-level-fix-shop-damage.md) | `4a700d08` | D-1178 `goto_level` `fix_shop_damage` | **ACCEPT** |
| [140-5f08f9e5-goto-level-do-fall-dmg.md](./140-5f08f9e5-goto-level-do-fall-dmg.md) | `5f08f9e5` | D-1179 `goto_level` `do_fall_dmg` | **ACCEPT** |
| [141-665bbe09-rloc-to-core-telemsg.md](./141-665bbe09-rloc-to-core-telemsg.md) | `665bbe09` | D-1180 `rloc_to_core` telemsg | **ACCEPT** |
| [142-0b488053-rloc-rloc-err.md](./142-0b488053-rloc-rloc-err.md) | `0b488053` | D-1181 `rloc` `RLOC_ERR` | **ACCEPT** |
| [143-01c8c41f-rloc-pos-ok-migrating.md](./143-01c8c41f-rloc-pos-ok-migrating.md) | `01c8c41f` | D-1182 `rloc_pos_ok` mx==0 | **ACCEPT** |
| [144-d2512b22-rloc-ustuck-together.md](./144-d2512b22-rloc-ustuck-together.md) | `d2512b22` | D-1183 ustuck-together You() | **ACCEPT** |
| [145-1b94d8d3-scrolltele-make-blinded.md](./145-1b94d8d3-scrolltele-make-blinded.md) | `1b94d8d3` | D-1184 `scrolltele` `make_blinded` | **ACCEPT** |
| [146-8c51cfe8-seed8243-private-canary.md](./146-8c51cfe8-seed8243-private-canary.md) | `8c51cfe8` | private seed8243 canary (docs) | **ACCEPT** |
| [147-4750946a-doddoremarm-empty-worn.md](./147-4750946a-doddoremarm-empty-worn.md) | `4750946a` | D-1185 `doddoremarm` empty-worn `A` | **ACCEPT** |
| [148-4dd396cc-do-rush-do-run.md](./148-4dd396cc-do-rush-do-run.md) | `4dd396cc` | D-1186 `do_rush`/`do_run` PREFIXCMD | **ACCEPT** |
| [149-77ead396-avoid-trap-paranoid.md](./149-77ead396-avoid-trap-paranoid.md) | `77ead396` | D-1187 ParanoidTrap portal yn | **ACCEPT-WITH-DEBT** |
| [150-c58efd08-domagicportal.md](./150-c58efd08-domagicportal.md) | `c58efd08` | D-1188 `domagicportal` ATSTAIRS | **ACCEPT** |
| [151-15dddffe-rhack-visctrl.md](./151-15dddffe-rhack-visctrl.md) | `15dddffe` | D-1189 rhack `visctrl` `^C` | **ACCEPT** |
| [152-9a2cbc27-kill-genocided.md](./152-9a2cbc27-kill-genocided.md) | `9a2cbc27` | D-1190 `goto_level` `kill_genocided` | **ACCEPT** |
| [153-cc7d0ef5-run-timers.md](./153-cc7d0ef5-run-timers.md) | `cc7d0ef5` | D-1191 `goto_level` `run_timers` | **ACCEPT** |
| [154-cf9eb066-wizkit-obj-delivery.md](./154-cf9eb066-wizkit-obj-delivery.md) | `cf9eb066` | D-1192 newgame wizkit FALSE | **ACCEPT-WITH-DEBT** |
| [155-2d2e68c7-deliver-obj-to-mon.md](./155-2d2e68c7-deliver-obj-to-mon.md) | `2d2e68c7` | D-1193 `deliver_obj_to_mon` | **ACCEPT-WITH-DEBT** |
| [156-c4c57ac1-notice-mon-off.md](./156-c4c57ac1-notice-mon-off.md) | `c4c57ac1` | D-1194 `goto_level` `notice_mon_off` | **ACCEPT** |
| [157-143f9a46-rloc-wand-makeknown.md](./157-143f9a46-rloc-wand-makeknown.md) | `143f9a46` | D-1195 rloc wand `makeknown` | **ACCEPT** |
| [158-d0cbc6e3-rloc-set-msg-xy.md](./158-d0cbc6e3-rloc-set-msg-xy.md) | `d0cbc6e3` | D-1196 dest-msg `set_msg_xy` | **ACCEPT-WITH-DEBT** |
| [159-7deb2670-scrolltele-override-yn.md](./159-7deb2670-scrolltele-override-yn.md) | `7deb2670` | D-1197 scrolltele Override yn | **ACCEPT** |
| [160-2f8f7d9f-migrate-xyflags-bit2.md](./160-2f8f7d9f-migrate-xyflags-bit2.md) | `2f8f7d9f` | D-1198 migrate bit 2 | **ACCEPT** |
| [161-4dc76022-mon-arrive-xyflags.md](./161-4dc76022-mon-arrive-xyflags.md) | `4dc76022` | D-1199 `mon_arrive` `my=xyflags` | **ACCEPT-WITH-DEBT** |
| [162-15cb4a37-newgame-notice-mon-off.md](./162-15cb4a37-newgame-notice-mon-off.md) | `15cb4a37` | D-1200 newgame `notice_mon_off` | **ACCEPT** |
| [163-4ffc2264-init-artifacts.md](./163-4ffc2264-init-artifacts.md) | `4ffc2264` | D-1201 `init_artifacts` | **ACCEPT** |
| [164-dfed1743-revive-zombify.md](./164-dfed1743-revive-zombify.md) | `dfed1743` | D-1202 REVIVE/ZOMBIFY | **ACCEPT-WITH-DEBT** |
| [165-a16884ab-wiz-level-change.md](./165-a16884ab-wiz-level-change.md) | `a16884ab` | D-1203 `#levelchange` drain | **ACCEPT** |
| [166-dbd3a08b-eatspecial-mail-uwepgone.md](./166-dbd3a08b-eatspecial-mail-uwepgone.md) | `dbd3a08b` | D-1204 `eatspecial` MAIL + `uwepgone` | **ACCEPT-WITH-DEBT** |
| [167-f389c2b4-scrolltele-unconscious.md](./167-f389c2b4-scrolltele-unconscious.md) | `f389c2b4` | D-1205 `scrolltele` unconscious | **ACCEPT** |
| [168-319bf51c-scrolltele-steed-whobuf.md](./168-319bf51c-scrolltele-steed-whobuf.md) | `319bf51c` | D-1206 steed `whobuf` | **ACCEPT** |
| [169-08d2e6b0-vpline-accessiblemsg.md](./169-08d2e6b0-vpline-accessiblemsg.md) | `08d2e6b0` | D-1207 `vpline` consume | **ACCEPT-WITH-DEBT** |
| [170-bd8c2161-dotele-trap-at-feet.md](./170-bd8c2161-dotele-trap-at-feet.md) | `bd8c2161` | D-1208 `dotele` teledest | **ACCEPT-WITH-DEBT** |
| [171-b3c0d228-dotelecmd-m-prefix.md](./171-b3c0d228-dotelecmd-m-prefix.md) | `b3c0d228` | D-1209 `dotelecmd` m-prefix | **ACCEPT-WITH-DEBT** |
| [172-f1a3518a-zombie-maker-xkilled.md](./172-f1a3518a-zombie-maker-xkilled.md) | `f1a3518a` | D-1210 `zombie_maker` + xkilled | **ACCEPT-WITH-DEBT** |
| [173-481e005b-mhitm-zombify.md](./173-481e005b-mhitm-zombify.md) | `481e005b` | D-1211 mhitm `gz.zombify` | **ACCEPT-WITH-DEBT** |
| [174-fc314871-revive-corpse-minvent.md](./174-fc314871-revive-corpse-minvent.md) | `fc314871` | D-1212 `revive_corpse` MINVENT/CONTAINED | **ACCEPT-WITH-DEBT** |
| [175-c85424f4-rot-corpse-worn.md](./175-c85424f4-rot-corpse-worn.md) | `c85424f4` | D-1213 `rot_corpse` invent/minvent worn | **ACCEPT-WITH-DEBT** |
| [176-b44c4847-disturb-buried-zombies.md](./176-b44c4847-disturb-buried-zombies.md) | `b44c4847` | D-1214 `disturb_buried_zombies` | **ACCEPT-WITH-DEBT** |
| [177-eaf10f2d-pline-xy-pline-mon.md](./177-eaf10f2d-pline-xy-pline-mon.md) | `eaf10f2d` | D-1215 `pline_xy`/`pline_mon` | **ACCEPT-WITH-DEBT** |
| [178-517cb217-set-msg-dir.md](./178-517cb217-set-msg-dir.md) | `517cb217` | D-1216 `set_msg_dir`/`pline_dir` | **ACCEPT-WITH-DEBT** |
| [179-dc34d705-dolookaround.md](./179-dc34d705-dolookaround.md) | `dc34d705` | D-1217 `dolookaround` / `#lookaround` | **ACCEPT-WITH-DEBT** |
| [180-b59f294b-opt-accessiblemsg.md](./180-b59f294b-opt-accessiblemsg.md) | `b59f294b` | D-1218 `opt_accessiblemsg` | **ACCEPT** |
| [181-925e5b77-show-glyph-glyph-updates.md](./181-925e5b77-show-glyph-glyph-updates.md) | `925e5b77` | D-1219 `show_glyph` `glyph_updates` | **QUALITY-RISK** |
| [182-b09b013d-revive-corpse-buried-fallthrough.md](./182-b09b013d-revive-corpse-buried-fallthrough.md) | `b09b013d` | D-1220 BURIED FALLTHROUGH `impossible` | **ACCEPT** |
| [183-c7071a4a-gbuf-show-kind-hallu.md](./183-c7071a4a-gbuf-show-kind-hallu.md) | `c7071a4a` | D-1221 `gbuf_show_kind` Hallu reroll | **ACCEPT-WITH-DEBT** |
| [184-7b0f9da7-soundeffect-se-scratching.md](./184-7b0f9da7-soundeffect-se-scratching.md) | `7b0f9da7` | D-1222 `Soundeffect` se_scratching | **ACCEPT-WITH-DEBT** |
| [185-d4f9b432-troll-baned-mkcorpstat.md](./185-d4f9b432-troll-baned-mkcorpstat.md) | `d4f9b432` | D-1223 `troll_baned` `mkcorpstat_norevive` | **ACCEPT-WITH-DEBT** |
| [186-790ca8b7-level-telep-yn.md](./186-790ca8b7-level-telep-yn.md) | `790ca8b7` | D-1224 LEVEL_TELEP `y_n` + `level_tele_trap` | **ACCEPT-WITH-DEBT** |
| [187-89588300-dotele-energy-spellcast.md](./187-89588300-dotele-energy-spellcast.md) | `89588300` | D-1225 `dotele` energy/`spelleffects` | **ACCEPT-WITH-DEBT** |
| [188-7998cb1e-test-move-boulder-pline-dir.md](./188-7998cb1e-test-move-boulder-pline-dir.md) | `7998cb1e` | D-1226 `test_move` run>=2 boulder `pline_dir` | **ACCEPT-WITH-DEBT** |
| [189-1da251ee-monmove-remaining-pline-mon.md](./189-1da251ee-monmove-remaining-pline-mon.md) | `1da251ee` | D-1227 monmove remaining `pline_mon` | **ACCEPT-WITH-DEBT** |
| [190-23f3f19e-msg-mon-movement.md](./190-23f3f19e-msg-mon-movement.md) | `23f3f19e` | D-1228 `msg_mon_movement` dest `pline_xy` | **ACCEPT-WITH-DEBT** |
| [191-0ddfb189-impact-disturbs-zombies.md](./191-0ddfb189-impact-disturbs-zombies.md) | `0ddfb189` | D-1229 `impact_disturbs_zombies` | **ACCEPT-WITH-DEBT** |
| [192-a3c04dd7-teleport-doextcmd.md](./192-a3c04dd7-teleport-doextcmd.md) | `a3c04dd7` | D-1230 `#teleport` `doextcmd` | **ACCEPT-WITH-DEBT** |
| [193-5cd4ab5c-gulpmm-m-at-swap.md](./193-5cd4ab5c-gulpmm-m-at-swap.md) | `5cd4ab5c` | D-1231 gulpmm `m_at` swap | **ACCEPT-WITH-DEBT** |
| [194-83624a46-hmon-hitmon-troll-baned.md](./194-83624a46-hmon-hitmon-troll-baned.md) | `83624a46` | D-1232 `hmon_hitmon` `troll_baned` | **ACCEPT-WITH-DEBT** |
| [195-976094e5-hmonas-damageum-troll-baned.md](./195-976094e5-hmonas-damageum-troll-baned.md) | `976094e5` | D-1233 `hmonas`/`damageum` `troll_baned` | **ACCEPT-WITH-DEBT** |
| [196-e0ea385e-corpse-xname-unique-pname.md](./196-e0ea385e-corpse-xname-unique-pname.md) | `e0ea385e` | D-1234 unique/pname `corpse_xname` | **ACCEPT-WITH-DEBT** |
| [197-f631610d-spot-monsters-a11y.md](./197-f631610d-spot-monsters-a11y.md) | `f631610d` | D-1235 `spot_monsters` → `a11y.mon_notices` | **ACCEPT-WITH-DEBT** |
| [198-5c860b0e-mon-movement-a11y.md](./198-5c860b0e-mon-movement-a11y.md) | `5c860b0e` | D-1236 `mon_movement` → `a11y.mon_movement` | **ACCEPT-WITH-DEBT** |
| [199-d81367e2-launch-obj-telep-pline-xy.md](./199-d81367e2-launch-obj-telep-pline-xy.md) | `d81367e2` | D-1237 rolling-boulder TELEP `pline_xy` | **ACCEPT-WITH-DEBT** |
| [200-6d2735b0-mind-blast.md](./200-6d2735b0-mind-blast.md) | `6d2735b0` | D-1238 `mind_blast` | **ACCEPT-WITH-DEBT** |
| [201-51a337e7-cannot-push-squeeze.md](./201-51a337e7-cannot-push-squeeze.md) | `51a337e7` | D-1239 cannot_push squeeze + `sokoban_guilt` | **ACCEPT-WITH-DEBT** |
| [202-d8f28958-uhitm-remaining-pline-mon.md](./202-d8f28958-uhitm-remaining-pline-mon.md) | `d8f28958` | D-1240 remaining already-ported `pline_mon` | **ACCEPT-WITH-DEBT** |
| [203-9b5bd39d-passivemm-monkilled.md](./203-9b5bd39d-passivemm-monkilled.md) | `9b5bd39d` | D-1241 `passivemm` assess_dmg `monkilled(magr)` | **ACCEPT-WITH-DEBT** |
| [204-509b1355-gulpmm-snuff-lit.md](./204-509b1355-gulpmm-snuff-lit.md) | `509b1355` | D-1242 gulpmm `snuff_lit` minvent | **ACCEPT-WITH-DEBT** |
| [205-729b03dc-gulpmm-goodpos-home.md](./205-729b03dc-gulpmm-goodpos-home.md) | `729b03dc` | D-1243 gulpmm `!goodpos` return-home | **ACCEPT-WITH-DEBT** |
| [206-293059d0-gulpmm-ad-dgst-eat.md](./206-293059d0-gulpmm-ad-dgst-eat.md) | `293059d0` | D-1244 gulpmm AD_DGST eat | **ACCEPT-WITH-DEBT** |
| [207-6115dc58-hideunder-after-tread.md](./207-6115dc58-hideunder-after-tread.md) | `6115dc58` | D-1245 hideunder after tread | **ACCEPT-WITH-DEBT** |
| [208-2cce0dc8-bee-eat-jelly.md](./208-2cce0dc8-bee-eat-jelly.md) | `2cce0dc8` | D-1246 `bee_eat_jelly` | **ACCEPT-WITH-DEBT** |
| [209-4dfec66a-postmov-iron-bars.md](./209-4dfec66a-postmov-iron-bars.md) | `4dfec66a` | D-1247 postmov IRONBARS | **ACCEPT-WITH-DEBT** |
| [210-6e18c402-mon-yells.md](./210-6e18c402-mon-yells.md) | `6e18c402` | D-1248 `mon_yells` | **ACCEPT-WITH-DEBT** |
| [211-7f54b762-container-impact-dmg.md](./211-7f54b762-container-impact-dmg.md) | `7f54b762` | D-1249 `container_impact_dmg` dropz/throwit | **ACCEPT-WITH-DEBT** |
| [212-87b4705a-hmonas-at-hugs.md](./212-87b4705a-hmonas-at-hugs.md) | `87b4705a` | D-1250 hmonas AT_HUGS | **QUALITY-RISK** |
| [213-e097a5df-explum.md](./213-e097a5df-explum.md) | `e097a5df` | D-1251 `explum` / AT_EXPL | **ACCEPT-WITH-DEBT** |
| [214-f7714f94-demonpet.md](./214-f7714f94-demonpet.md) | `f7714f94` | D-1252 `demonpet` spawn | **ACCEPT-WITH-DEBT** |
| [215-d384e339-cannot-push-giant.md](./215-d384e339-cannot-push-giant.md) | `d384e339` | D-1253 cannot_push giant pickup | **ACCEPT-WITH-DEBT** |
| [216-fd5ebd92-hates-silver.md](./216-fd5ebd92-hates-silver.md) | `fd5ebd92` | D-1254 `hates_silver` / `mon_hates_silver` | **ACCEPT-WITH-DEBT** |
| [217-25a81ff1-glob-doname-cxn.md](./217-25a81ff1-glob-doname-cxn.md) | `25a81ff1` | D-1255 glob / doname CXN | **ACCEPT-WITH-DEBT** |
| [218-03e8b10c-launch-obj-landmine-pit.md](./218-03e8b10c-launch-obj-landmine-pit.md) | `03e8b10c` | D-1256 `launch_obj` LANDMINE/PIT | **ACCEPT-WITH-DEBT** |
| [219-466adf3e-gelcube-digests.md](./219-466adf3e-gelcube-digests.md) | `466adf3e` | D-1257 `gelcube_digests` | **ACCEPT-WITH-DEBT** |
| [220-c63ac778-passes-bars.md](./220-c63ac778-passes-bars.md) | `c63ac778` | D-1258 `passes_bars` / ALLOW_BARS | **ACCEPT-WITH-DEBT** |
| [221-78707282-dissolve-bars-switch-terrain.md](./221-78707282-dissolve-bars-switch-terrain.md) | `78707282` | D-1259 `dissolve_bars` `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [222-8729fa24-mimic-unhide.md](./222-8729fa24-mimic-unhide.md) | `8729fa24` | D-1260 mimic unhide after hideunder | **ACCEPT-WITH-DEBT** |
| [223-8e2808ad-hitmsg.md](./223-8e2808ad-hitmsg.md) | `8e2808ad` | D-1261 mhitu `hitmsg` | **ACCEPT-WITH-DEBT** |
| [224-72757d4c-moverock-nopick.md](./224-72757d4c-moverock-nopick.md) | `72757d4c` | D-1262 nopick `m<dir>` over/against | **ACCEPT-WITH-DEBT** |
| [225-6a950d81-hitfloor-dropz.md](./225-6a950d81-hitfloor-dropz.md) | `6a950d81` | D-1263 `hitfloor` `dropz(TRUE)` | **ACCEPT-WITH-DEBT** |
| [226-d86fe2fe-gulpum.md](./226-d86fe2fe-gulpum.md) | `d86fe2fe` | D-1264 AT_ENGL `gulpum` | **ACCEPT-WITH-DEBT** |
| [227-9859426c-fight-empty-explum.md](./227-9859426c-fight-empty-explum.md) | `9859426c` | D-1265 fight_empty `explum(null)` | **ACCEPT-WITH-DEBT** |
| [228-42d50a53-hmonas-altwep.md](./228-42d50a53-hmonas-altwep.md) | `42d50a53` | D-1266 hmonas altwep / `uswapwep` | **ACCEPT-WITH-DEBT** |
| [229-f7676db6-set-uinwater.md](./229-f7676db6-set-uinwater.md) | `f7676db6` | D-1267 `set_uinwater` `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [230-26fb4aa0-spoteffects-switch-terrain.md](./230-26fb4aa0-spoteffects-switch-terrain.md) | `26fb4aa0` | D-1268 `spoteffects` dest-typ `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [231-76f7018d-digactualhole-switch-terrain.md](./231-76f7018d-digactualhole-switch-terrain.md) | `76f7018d` | D-1269 `digactualhole` PIT/HOLE `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [232-a4aa34d3-test-move-passes-bars.md](./232-a4aa34d3-test-move-passes-bars.md) | `a4aa34d3` | D-1270 hero `test_move` IRONBARS `passes_bars` | **ACCEPT-WITH-DEBT** |
| [233-3925f2b3-meatmetal.md](./233-3925f2b3-meatmetal.md) | `3925f2b3` | D-1271 `meatmetal` | **ACCEPT-WITH-DEBT** |
| [234-175707ca-hold-another-object.md](./234-175707ca-hold-another-object.md) | `175707ca` | D-1272 `hold_another_object` `hitfloor(FALSE)` | **ACCEPT-WITH-DEBT** |
| [235-2a6bf680-tipcontainer-highdrop.md](./235-2a6bf680-tipcontainer-highdrop.md) | `2a6bf680` | D-1273 `tipcontainer` highdrop `hitfloor(TRUE)` | **ACCEPT-WITH-DEBT** |
| [236-b166de10-toss-up.md](./236-b166de10-toss-up.md) | `b166de10` | D-1274 `toss_up` + throwit `u.dz` | **ACCEPT-WITH-DEBT** |
| [237-18bec04d-display-self.md](./237-18bec04d-display-self.md) | `18bec04d` | D-1275 `display_self` U_AP_TYPE glyphs | **ACCEPT-WITH-DEBT** |
| [238-2860794e-doname-egg.md](./238-2860794e-doname-egg.md) | `2860794e` | D-1276 doname EGG | **ACCEPT-WITH-DEBT** |
| [239-20c69ccf-hurtle-step.md](./239-20c69ccf-hurtle-step.md) | `20c69ccf` | D-1277 `hurtle_step` dest-typ `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [240-851d3e08-u-on-rndspot.md](./240-851d3e08-u-on-rndspot.md) | `851d3e08` | D-1278 `u_on_rndspot` `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [241-12d815ca-wizterrainwish.md](./241-12d815ca-wizterrainwish.md) | `12d815ca` | D-1279 `wizterrainwish` `switch_terrain` | **ACCEPT-WITH-DEBT** |
| [242-5f8a620a-maketrap-set-levltyp.md](./242-5f8a620a-maketrap-set-levltyp.md) | `5f8a620a` | D-1280 `maketrap` PIT/HOLE `set_levltyp` | **ACCEPT-WITH-DEBT** |
| [243-7a783c86-moverock-blind-feel.md](./243-7a783c86-moverock-blind-feel.md) | `7a783c86` | D-1281 Blind unseen boulder feel | **ACCEPT-WITH-DEBT** |
| [244-7d61ee8b-throwit-returning-missile.md](./244-7d61ee8b-throwit-returning-missile.md) | `7d61ee8b` | D-1282 throwit returning_missile | **ACCEPT-WITH-DEBT** |
| [245-5b4788e1-throwit-swallowit.md](./245-5b4788e1-throwit-swallowit.md) | `5b4788e1` | D-1283 throwit swallowit | **ACCEPT-WITH-DEBT** |
| [246-433ad843-meatobj.md](./246-433ad843-meatobj.md) | `433ad843` | D-1284 `meatobj` | **ACCEPT-WITH-DEBT** |
| [247-965d2beb-meatcorpse.md](./247-965d2beb-meatcorpse.md) | `965d2beb` | D-1285 `meatcorpse` | **ACCEPT-WITH-DEBT** |
| [248-9486280d-missmu-pline-mon.md](./248-9486280d-missmu-pline-mon.md) | `9486280d` | D-1286 `missmu` `pline_mon` | **ACCEPT-WITH-DEBT** |
| [249-04b325fd-u-on-sstairs.md](./249-04b325fd-u-on-sstairs.md) | `04b325fd` | D-1287 `u_on_sstairs` → rndspot | **ACCEPT-WITH-DEBT** |
| [250-b741fb93-makemap-prepost.md](./250-b741fb93-makemap-prepost.md) | `b741fb93` | D-1288 `makemap_prepost` rndspot | **ACCEPT-WITH-DEBT** |
| [251-44b22432-wizterrainwish-traps.md](./251-44b22432-wizterrainwish-traps.md) | `44b22432` | D-1289 wizterrainwish trap loop | **ACCEPT-WITH-DEBT** |
| [252-67c863ad-wizterrainwish-door-wall.md](./252-67c863ad-wizterrainwish-door-wall.md) | `67c863ad` | D-1290 wizterrainwish door/wall | **ACCEPT-WITH-DEBT** |
| [253-c6fa1420-wildmiss-set-msg-xy.md](./253-c6fa1420-wildmiss-set-msg-xy.md) | `c6fa1420` | D-1291 wildmiss `set_msg_xy` then `pline` | **ACCEPT-WITH-DEBT** |
| [254-2e893032-throwit-slip.md](./254-2e893032-throwit-slip.md) | `2e893032` | D-1292 throwit cursed/greased slip | **ACCEPT-WITH-DEBT** |
| [255-31e55930-throwit-stamina.md](./255-31e55930-throwit-stamina.md) | `31e55930` | D-1293 throwit stamina drop | **ACCEPT-WITH-DEBT** |
| [256-c37bd683-moverock-next-boulder.md](./256-c37bd683-moverock-next-boulder.md) | `c37bd683` | D-1294 moverock `next_boulder` | **ACCEPT-WITH-DEBT** |
| [257-dd02dc1b-doname-meat-ring.md](./257-dd02dc1b-doname-meat-ring.md) | `dd02dc1b` | D-1295 doname MEAT_RING | **ACCEPT-WITH-DEBT** |
| [258-993e17ea-maketrap-drawbridge-ice.md](./258-993e17ea-maketrap-drawbridge-ice.md) | `993e17ea` | D-1296 maketrap DRAWBRIDGE_UP ice | **ACCEPT-WITH-DEBT** |
| [259-6dfb7d2c-throwit-steed-potionhit.md](./259-6dfb7d2c-throwit-steed-potionhit.md) | `6dfb7d2c` | D-1297 throwit steed potionhit | **ACCEPT-WITH-DEBT** |
| [260-086eb03d-hmonas-skipdrin-pit-kick.md](./260-086eb03d-hmonas-skipdrin-pit-kick.md) | `086eb03d` | D-1298 hmonas skipdrin / pit kick | **ACCEPT-WITH-DEBT** |
| [261-eca3330c-swap-with-pet-seemimic.md](./261-eca3330c-swap-with-pet-seemimic.md) | `eca3330c` | D-1299 swap-with-pet `seemimic` | **ACCEPT-WITH-DEBT** |
| [262-376a5a0d-maketrap-shop-add-damage.md](./262-376a5a0d-maketrap-shop-add-damage.md) | `376a5a0d` | D-1300 maketrap shop `add_damage` | **ACCEPT-WITH-DEBT** |
| [263-18fa6c89-boomhit.md](./263-18fa6c89-boomhit.md) | `18fa6c89` | D-1301 `zap.c` boomhit | **ACCEPT-WITH-DEBT** |
| [264-1a7839f7-throw-gold-swallow.md](./264-1a7839f7-throw-gold-swallow.md) | `1a7839f7` | D-1302 throw_gold swallow | **ACCEPT-WITH-DEBT** |
| [265-2b1a575c-sho-obj-return-to-u.md](./265-2b1a575c-sho-obj-return-to-u.md) | `2b1a575c` | D-1303 `sho_obj_return_to_u` | **ACCEPT-WITH-DEBT** |
| [266-909ef3dc-wizterrainwish-secret-corridor.md](./266-909ef3dc-wizterrainwish-secret-corridor.md) | `909ef3dc` | D-1304 secret corridor | **ACCEPT-WITH-DEBT** |
| [267-b82b15a8-mswings-pline-mon.md](./267-b82b15a8-mswings-pline-mon.md) | `b82b15a8` | D-1305 `mswings` `pline_mon` | **ACCEPT-WITH-DEBT** |
| [268-49dab44b-eat-brains.md](./268-49dab44b-eat-brains.md) | `49dab44b` | D-1306 `eat_brains` | **ACCEPT-WITH-DEBT** |
| [269-b97b1fc6-helmet-m-slips-free.md](./269-b97b1fc6-helmet-m-slips-free.md) | `b97b1fc6` | D-1307 helmet / `m_slips_free` | **ACCEPT-WITH-DEBT** |
| [270-2b9c2c6a-doname-candle-lit.md](./270-2b9c2c6a-doname-candle-lit.md) | `2b9c2c6a` | D-1308 candle `partly used` / lamp `(lit)` | **ACCEPT-WITH-DEBT** |
| [271-07ac10e0-mattacku-at-tent.md](./271-07ac10e0-mattacku-at-tent.md) | `07ac10e0` | D-1309 `mattacku` AT_TENT melee | **ACCEPT-WITH-DEBT** |
| [272-734449dc-kick-monster-poly-at-kick.md](./272-734449dc-kick-monster-poly-at-kick.md) | `734449dc` | D-1310 `kick_monster` poly AT_KICK | **ACCEPT-WITH-DEBT** |
| [273-3633eb61-throwit-tether-backtrack.md](./273-3633eb61-throwit-tether-backtrack.md) | `3633eb61` | D-1311 throwit DISP_TETHER / BACKTRACK | **ACCEPT-WITH-DEBT** |
| [274-77606a78-thitmonst-leader-catch.md](./274-77606a78-thitmonst-leader-catch.md) | `77606a78` | D-1312 thitmonst leader catch / `finish_quest` | **ACCEPT-WITH-DEBT** |
| [275-27751021-throwit-mon-hit-snuff.md](./275-27751021-throwit-mon-hit-snuff.md) | `27751021` | D-1313 `throwit_mon_hit` snuff / `hot_pursuit` | **QUALITY-RISK** |
| [276-a1d48196-m-respond.md](./276-a1d48196-m-respond.md) | `a1d48196` | D-1314 `mon.c` `m_respond` | **ACCEPT-WITH-DEBT** |
| [277-44a786aa-throwit-calls-throwit-mon-hit.md](./277-44a786aa-throwit-calls-throwit-mon-hit.md) | `44a786aa` | D-1315 throwit → `throwit_mon_hit` | **ACCEPT-WITH-DEBT** |
| [278-75c08164-throwit-acurrstr-urange.md](./278-75c08164-throwit-acurrstr-urange.md) | `75c08164` | D-1316 throwit ACURRSTR urange | **ACCEPT-WITH-DEBT** |
| [279-9b1b4ba4-doname-candelabrum.md](./279-9b1b4ba4-doname-candelabrum.md) | `9b1b4ba4` | D-1317 doname CANDELABRUM `(n of 7)` | **ACCEPT-WITH-DEBT** |
| [280-ccdc8670-doname-tool-worn.md](./280-ccdc8670-doname-tool-worn.md) | `ccdc8670` | D-1318 doname TOOL W_TOOL\|W_SADDLE worn | **ACCEPT-WITH-DEBT** |
| [281-cd867647-doname-leash-attached.md](./281-cd867647-doname-leash-attached.md) | `cd867647` | D-1319 doname LEASH attached | **ACCEPT-WITH-DEBT** |
| [282-cf309315-doname-pot-oil-lit.md](./282-cf309315-doname-pot-oil-lit.md) | `cf309315` | D-1320 doname POTION POT_OIL `(lit)` | **ACCEPT-WITH-DEBT** |
| [283-b7a0c3c7-doname-wep-body-part.md](./283-b7a0c3c7-doname-wep-body-part.md) | `b7a0c3c7` | D-1321 doname W_WEP `body_part(HAND)` | **QUALITY-RISK** |
| [284-843343cc-doname-wep-mrg-tether.md](./284-843343cc-doname-wep-mrg-tether.md) | `843343cc` | D-1322 doname W_WEP `!mrg_to_wielded` + AKLYS tethered | **ACCEPT-WITH-DEBT** |
| [285-b50daaea-bhit-tether-isqrt.md](./285-b50daaea-bhit-tether-isqrt.md) | `b50daaea` | D-1323 `bhit` THROWN_TETHERED / isqrt | **ACCEPT-WITH-DEBT** |
| [286-1d5b0b66-thitmonst-swallow-vanish.md](./286-1d5b0b66-thitmonst-swallow-vanish.md) | `1d5b0b66` | D-1324 thitmonst swallow vanish pline | **ACCEPT-WITH-DEBT** |
| [287-2cdf2b1f-dokick-snuff-candle.md](./287-2cdf2b1f-dokick-snuff-candle.md) | `2cdf2b1f` | D-1325 dokick `snuff_candle` | **ACCEPT-WITH-DEBT** |
| [288-9570f32a-explmu-at-expl.md](./288-9570f32a-explmu-at-expl.md) | `9570f32a` | D-1326 explmu / AT_EXPL | **ACCEPT-WITH-DEBT** |
| [289-2c9dff6a-mattacku-at-hugs.md](./289-2c9dff6a-mattacku-at-hugs.md) | `2c9dff6a` | D-1327 `mattacku` AT_HUGS | **ACCEPT-WITH-DEBT** |
| [290-b21765a2-gazemu.md](./290-b21765a2-gazemu.md) | `b21765a2` | D-1328 `gazemu` / AT_GAZE | **ACCEPT-WITH-DEBT** |
| [291-a7a5a835-mhitm-ad-drin-u.md](./291-a7a5a835-mhitm-ad-drin-u.md) | `a7a5a835` | D-1329 mhitu AD_DRIN | **ACCEPT-WITH-DEBT** |
| [292-cfc95500-mhitm-ad-drin.md](./292-cfc95500-mhitm-ad-drin.md) | `cfc95500` | D-1330 mhitm AD_DRIN | **ACCEPT-WITH-DEBT** |
| [293-ea5df558-mhitm-ad-wrap-u.md](./293-ea5df558-mhitm-ad-wrap-u.md) | `ea5df558` | D-1331 mhitu AD_WRAP | **ACCEPT-WITH-DEBT** |
| [294-e430e099-kickdmg-special-dmgval.md](./294-e430e099-kickdmg-special-dmgval.md) | `e430e099` | D-1332 kickdmg `special_dmgval` | **ACCEPT-WITH-DEBT** |
| [295-b82375a7-throwit-land-snuff.md](./295-b82375a7-throwit-land-snuff.md) | `b82375a7` | D-1333 throwit land `snuff_candle` | **ACCEPT-WITH-DEBT** |
| [296-487daa2f-mthrowu-return-snuff.md](./296-487daa2f-mthrowu-return-snuff.md) | `487daa2f` | D-1334 mthrowu `return_from_mtoss` snuff | **ACCEPT-WITH-DEBT** |
| [297-31d32cad-killer-xname.md](./297-31d32cad-killer-xname.md) | `31d32cad` | D-1335 `killer_xname` kickobjnam | **ACCEPT-WITH-DEBT** |
| [298-a7ac5e52-maybe-mnexto.md](./298-a7ac5e52-maybe-mnexto.md) | `a7ac5e52` | D-1336 `maybe_mnexto` kick evade | **ACCEPT-WITH-DEBT** |
| [299-2bd70a77-splash-lit.md](./299-2bd70a77-splash-lit.md) | `2bd70a77` | D-1337 `splash_lit` | **ACCEPT-WITH-DEBT** |
| [300-2368dc58-gazemm.md](./300-2368dc58-gazemm.md) | `2368dc58` | D-1338 `gazemm` | **ACCEPT-WITH-DEBT** |
| [301-fdb30435-explmm.md](./301-fdb30435-explmm.md) | `fdb30435` | D-1339 `explmm` | **ACCEPT-WITH-DEBT** |
| [302-85eee14d-mattackm-at-hugs.md](./302-85eee14d-mattackm-at-hugs.md) | `85eee14d` | D-1340 mattackm AT_HUGS | **ACCEPT-WITH-DEBT** |
| [303-e3a30202-shade-miss.md](./303-e3a30202-shade-miss.md) | `e3a30202` | D-1341 hitmm `shade_miss` | **ACCEPT-WITH-DEBT** |
| [304-34de9f33-arti-reflects.md](./304-34de9f33-arti-reflects.md) | `34de9f33` | D-1342 `arti_reflects` W_WEP | **ACCEPT-WITH-DEBT** |
| [305-946d719d-kickstr.md](./305-946d719d-kickstr.md) | `946d719d` | D-1343 `kickstr` | **ACCEPT-WITH-DEBT** |
| [306-5195acee-choke-killer-xname.md](./306-5195acee-choke-killer-xname.md) | `5195acee` | D-1344 choke `killer_xname` | **ACCEPT-WITH-DEBT** |
| [307-2a5e72e0-dozap-killer-xname.md](./307-2a5e72e0-dozap-killer-xname.md) | `2a5e72e0` | D-1345 dozap `killer_xname` | **ACCEPT-WITH-DEBT** |
| [308-15b20ab4-throwit-killer-xname.md](./308-15b20ab4-throwit-killer-xname.md) | `15b20ab4` | D-1346 throwit `killer_xname` | **ACCEPT-WITH-DEBT** |
| [309-1651816e-doname-warn-obj-glow.md](./309-1651816e-doname-warn-obj-glow.md) | `1651816e` | D-1347 doname warn_obj glow | **ACCEPT-WITH-DEBT** |
| [310-dde5f91b-mhitm-ad-wrap.md](./310-dde5f91b-mhitm-ad-wrap.md) | `dde5f91b` | D-1348 uhitm AD_WRAP | **ACCEPT-WITH-DEBT** |
| [311-533e732f-kickdmg-abuse-dog.md](./311-533e732f-kickdmg-abuse-dog.md) | `533e732f` | D-1349 kickdmg `abuse_dog` | **ACCEPT-WITH-DEBT** |
| [312-d3f2a9e5-kickdmg-martial-knockback.md](./312-d3f2a9e5-kickdmg-martial-knockback.md) | `d3f2a9e5` | D-1350 kickdmg martial knockback | **ACCEPT-WITH-DEBT** |
| [313-48f2f0a2-hitmm-silver-sear.md](./313-48f2f0a2-hitmm-silver-sear.md) | `48f2f0a2` | D-1351 hitmm silver sear | **ACCEPT-WITH-DEBT** |
| [314-160de986-mdamagem-ad-ston.md](./314-160de986-mdamagem-ad-ston.md) | `160de986` | D-1352 mdamagem AD_STON leftover | **ACCEPT-WITH-DEBT** |
| [315-03e578b1-ureflects-amul-arm.md](./315-03e578b1-ureflects-amul-arm.md) | `03e578b1` | D-1353 ureflects W_AMUL/W_ARM/dragon | **ACCEPT-WITH-DEBT** |
| [316-6570ddba-dmgval-shade-glare.md](./316-6570ddba-dmgval-shade-glare.md) | `6570ddba` | D-1354 dmgval shade/`shade_glare` | **ACCEPT-WITH-DEBT** |
| [317-0be6d98e-zapyourself-lightning.md](./317-0be6d98e-zapyourself-lightning.md) | `0be6d98e` | D-1355 zapyourself WAN_LIGHTNING | **ACCEPT-WITH-DEBT** |
| [318-6fd45ec4-lesshungry-bite-choke.md](./318-6fd45ec4-lesshungry-bite-choke.md) | `6fd45ec4` | D-1356 lesshungry/bite choke | **QUALITY-RISK** |
| [319-0be5135b-the-capitalmon.md](./319-0be5135b-the-capitalmon.md) | `0be5135b` | D-1357 `the()` CapitalMon | **ACCEPT-WITH-DEBT** |
| [320-fbfc72d9-dokick-wake-nearby.md](./320-fbfc72d9-dokick-wake-nearby.md) | `fbfc72d9` | D-1358 dokick `wake_nearby` | **ACCEPT-WITH-DEBT** |
| [321-a895ac7e-kick-ouch-drawbridge.md](./321-a895ac7e-kick-ouch-drawbridge.md) | `a895ac7e` | D-1361 kick_ouch drawbridge remap | **ACCEPT-WITH-DEBT** |
| [322-a979a9ac-dokick-no-kick.md](./322-a979a9ac-dokick-no-kick.md) | `a979a9ac` | D-1362 dokick no_kick + `kick_steed` | **ACCEPT-WITH-DEBT** |
| [323-c10f4246-stolen-booty-migr-species.md](./323-c10f4246-stolen-booty-migr-species.md) | `c10f4246` | D-1363 `mksobj_migr_to_species` / stolen_booty | **ACCEPT-WITH-DEBT** |
| [324-17a0937c-zapyourself-magic-missile.md](./324-17a0937c-zapyourself-magic-missile.md) | `17a0937c` | D-1364 zapyourself WAN/SPE_MAGIC_MISSILE | **QUALITY-RISK** |
| [325-d8f4fba6-zapyourself-fireball.md](./325-d8f4fba6-zapyourself-fireball.md) | `d8f4fba6` | D-1365 zapyourself SPE_FIREBALL | **ACCEPT-WITH-DEBT** |
| [326-9a144895-lightdamage-wan-light.md](./326-9a144895-lightdamage-wan-light.md) | `9a144895` | D-1366 `lightdamage` WAN_LIGHT/camera | **ACCEPT-WITH-DEBT** |
| [327-463e151d-antimagic-uprops.md](./327-463e151d-antimagic-uprops.md) | `463e151d` | D-1367 `Antimagic()` uprops[ANTIMAGIC] | **ACCEPT-WITH-DEBT** |
| [328-9df30ee3-maybe-destroy-item-elec.md](./328-9df30ee3-maybe-destroy-item-elec.md) | `9df30ee3` | D-1368 `maybe_destroy_item` AD_ELEC | **QUALITY-RISK** |
| [329-46c4e1b0-zapyourself-make-invisible.md](./329-46c4e1b0-zapyourself-make-invisible.md) | `46c4e1b0` | D-1369 zapyourself WAN_MAKE_INVISIBLE | **ACCEPT-WITH-DEBT** |
| [330-90eca343-kick-air-hurtle.md](./330-90eca343-kick-air-hurtle.md) | `90eca343` | D-1370 kick_ouch/kick_dumb air/Lev hurtle | **ACCEPT-WITH-DEBT** |
| [331-211485a0-shock-resistance-uprops.md](./331-211485a0-shock-resistance-uprops.md) | `211485a0` | D-1371 `Shock_resistance()` uprops[SHOCK_RES] | **ACCEPT-WITH-DEBT** |
| [332-b3fe3015-allmain-dex-wipe.md](./332-b3fe3015-allmain-dex-wipe.md) | `b3fe3015` | D-1372 allmain DEX `u_wipe_engr(rnd(3))` | **ACCEPT-WITH-DEBT** |
| [333-d5614c8a-do-attack-wipe.md](./333-d5614c8a-do-attack-wipe.md) | `d5614c8a` | D-1373 `do_attack` `u_wipe_engr(3)` | **ACCEPT-WITH-DEBT** |
| [334-08007958-throw-obj-wipe.md](./334-08007958-throw-obj-wipe.md) | `08007958` | D-1374 `throw_obj` `u_wipe_engr(2)` | **ACCEPT-WITH-DEBT** |
| [335-8a2a32bd-dig-axe-wipe.md](./335-8a2a32bd-dig-axe-wipe.md) | `8a2a32bd` | D-1375 `use_pick_axe2` `u_wipe_engr(3)` | **ACCEPT-WITH-DEBT** |
| [336-61c15769-muse-camera.md](./336-61c15769-muse-camera.md) | `61c15769` | D-1376 MUSE_CAMERA `lightdamage` | **ACCEPT-WITH-DEBT** |
| [337-e785f5bb-invoke-blinding-ray.md](./337-e785f5bb-invoke-blinding-ray.md) | `e785f5bb` | D-1377 `invoke_blinding_ray` | **ACCEPT-WITH-DEBT** |
| [338-12953730-skilled-fireball-scatter.md](./338-12953730-skilled-fireball-scatter.md) | `12953730` | D-1378 skilled SPE_FIREBALL scatter | **ACCEPT-WITH-DEBT** |
| [339-ad7b89c7-zapnodir-create-monster.md](./339-ad7b89c7-zapnodir-create-monster.md) | `ad7b89c7` | D-1379 zapnodir WAN_CREATE_MONSTER | **ACCEPT-WITH-DEBT** |
| [340-ef8a60b0-zapnodir-wishing.md](./340-ef8a60b0-zapnodir-wishing.md) | `ef8a60b0` | D-1380 zapnodir WAN_WISHING | **ACCEPT-WITH-DEBT** |
| [341-e0594454-do-attack-leprechaun.md](./341-e0594454-do-attack-leprechaun.md) | `e0594454` | D-1381 `do_attack` leprechaun evade | **ACCEPT-WITH-DEBT** |
| [342-6077050a-mthrowu-shade-miss.md](./342-6077050a-mthrowu-shade-miss.md) | `6077050a` | D-1382 `m_throw` shade_miss | **ACCEPT-WITH-DEBT** |
| [343-970c6097-bhit-shade-miss.md](./343-970c6097-bhit-shade-miss.md) | `970c6097` | D-1383 `bhit` shade_miss | **ACCEPT-WITH-DEBT** |
| [344-ec703f48-hmon-shade-miss.md](./344-ec703f48-hmon-shade-miss.md) | `ec703f48` | D-1384 `hmon` shade_miss | **ACCEPT-WITH-DEBT** |
| [345-5be02746-mdamagem-ad-conf.md](./345-5be02746-mdamagem-ad-conf.md) | `5be02746` | D-1385 mdamagem AD_CONF leftover | **ACCEPT-WITH-DEBT** |
| [346-1f94d5e3-unskilled-fireball-weffects.md](./346-1f94d5e3-unskilled-fireball-weffects.md) | `1f94d5e3` | D-1386 unskilled SPE_FIREBALL weffects | **QUALITY-RISK** |
| [347-c3d768d1-getdir-cancel-leftover.md](./347-c3d768d1-getdir-cancel-leftover.md) | `c3d768d1` | D-1387 getdir cancel leftover dirs | **ACCEPT-WITH-DEBT** |
| [348-c6af8407-force-bolt-immediate.md](./348-c6af8407-force-bolt-immediate.md) | `c6af8407` | D-1388 SPE_FORCE_BOLT IMMEDIATE weffects | **ACCEPT-WITH-DEBT** |
| [349-5e8d1fbd-create-familiar.md](./349-5e8d1fbd-create-familiar.md) | `5e8d1fbd` | D-1389 SPE_CREATE_FAMILIAR make_familiar | **ACCEPT-WITH-DEBT** |
| [350-b5b5eb34-cast-protection.md](./350-b5b5eb34-cast-protection.md) | `b5b5eb34` | D-1390 SPE_PROTECTION cast_protection | **ACCEPT-WITH-DEBT** |
| [351-a4923869-clairvoyance-vicinity.md](./351-a4923869-clairvoyance-vicinity.md) | `a4923869` | D-1391 SPE_CLAIRVOYANCE do_vicinity_map | **ACCEPT-WITH-DEBT** |
| [352-adfd4533-bhit-mimic-object.md](./352-adfd4533-bhit-mimic-object.md) | `adfd4533` | D-1392 bhit M_AP_OBJECT skip | **ACCEPT-WITH-DEBT** |
| [353-7863ae2a-bhit-web-stick.md](./353-7863ae2a-bhit-web-stick.md) | `7863ae2a` | D-1393 bhit WEB stick | **ACCEPT-WITH-DEBT** |
| [354-91827af6-mhitm-ad-phys-shade.md](./354-91827af6-mhitm-ad-phys-shade.md) | `91827af6` | D-1394 mhitm_ad_phys shade_miss | **ACCEPT-WITH-DEBT** |
| [355-05f8c1a1-zapnodir-enlightenment.md](./355-05f8c1a1-zapnodir-enlightenment.md) | `05f8c1a1` | D-1395 zapnodir WAN_ENLIGHTENMENT | **ACCEPT-WITH-DEBT** |
| [356-66018a5a-mhitm-ad-stun.md](./356-66018a5a-mhitm-ad-stun.md) | `66018a5a` | D-1396 mhitm_ad_stun leftover | **ACCEPT-WITH-DEBT** |
| [357-f5e00af7-spe-jumping.md](./357-f5e00af7-spe-jumping.md) | `f5e00af7` | D-1397 SPE_JUMPING jump(max skill) | **ACCEPT-WITH-DEBT** |
| [358-a938a5b9-spe-cure-sickness.md](./358-a938a5b9-spe-cure-sickness.md) | `a938a5b9` | D-1398 SPE_CURE_SICKNESS healup | **ACCEPT-WITH-DEBT** |
| [359-64d4d089-spe-cure-blindness.md](./359-64d4d089-spe-cure-blindness.md) | `64d4d089` | D-1399 SPE_CURE_BLINDNESS healup | **ACCEPT-WITH-DEBT** |
| [360-dce9ac86-chain-lightning.md](./360-dce9ac86-chain-lightning.md) | `dce9ac86` | D-1400 SPE_CHAIN_LIGHTNING BFS zhitm | **ACCEPT-WITH-DEBT** |
| [361-88587b68-spe-create-monster.md](./361-88587b68-spe-create-monster.md) | `88587b68` | D-1401 SPE_CREATE_MONSTER seffects | **ACCEPT-WITH-DEBT** |
| [362-2a3da9b9-mhitm-ad-phys-mwep.md](./362-2a3da9b9-mhitm-ad-phys-mwep.md) | `2a3da9b9` | D-1402 mhitm_ad_phys mwep dmgval | **ACCEPT-WITH-DEBT** |
| [363-d9134735-mhitm-ad-phys-kick.md](./363-d9134735-mhitm-ad-phys-kick.md) | `d9134735` | D-1403 mhitm_ad_phys AT_KICK thick | **ACCEPT-WITH-DEBT** |
| [364-cc7284d4-zapnodir-stasis.md](./364-cc7284d4-zapnodir-stasis.md) | `cc7284d4` | D-1404 zapnodir WAN_STASIS | **ACCEPT-WITH-DEBT** |
| [365-7c3921f2-mhitm-ad-fire.md](./365-7c3921f2-mhitm-ad-fire.md) | `7c3921f2` | D-1405 mhitm_ad_fire leftover | **ACCEPT-WITH-DEBT** |
| [366-61936a70-mhitm-ad-wrap.md](./366-61936a70-mhitm-ad-wrap.md) | `61936a70` | D-1406 mhitm_ad_wrap brush | **ACCEPT-WITH-DEBT** |
| [367-6ec1c72d-spe-magic-mapping.md](./367-6ec1c72d-spe-magic-mapping.md) | `6ec1c72d` | D-1407 SPE_MAGIC_MAPPING seffects | **ACCEPT-WITH-DEBT** |
| [368-5c71fc34-spe-haste-self.md](./368-5c71fc34-spe-haste-self.md) | `5c71fc34` | D-1408 SPE_HASTE_SELF peffects | **ACCEPT-WITH-DEBT** |
| [369-fa039634-spell-backfire.md](./369-fa039634-spell-backfire.md) | `fa039634` | D-1409 spell_backfire | **ACCEPT-WITH-DEBT** |
| [370-55259f2b-zapyourself-wan-speed.md](./370-55259f2b-zapyourself-wan-speed.md) | `55259f2b` | D-1410 zapyourself WAN_SPEED | **ACCEPT-WITH-DEBT** |
| [371-71ee9186-peffect-full-healing.md](./371-71ee9186-peffect-full-healing.md) | `71ee9186` | D-1411 peffect_full_healing | **ACCEPT-WITH-DEBT** |
| [372-fb872749-zapnodir-detect-unseen.md](./372-fb872749-zapnodir-detect-unseen.md) | `fb872749` | D-1412 zapnodir SPE_DETECT_UNSEEN | **ACCEPT-WITH-DEBT** |
| [373-285218b2-peffect-enlightenment.md](./373-285218b2-peffect-enlightenment.md) | `285218b2` | D-1413 peffect_enlightenment | **ACCEPT-WITH-DEBT** |
| [374-f968904d-bhitm-wan-make-invisible.md](./374-f968904d-bhitm-wan-make-invisible.md) | `f968904d` | D-1414 bhitm WAN_MAKE_INVISIBLE | **QUALITY-RISK** |
| [375-081c5c6a-mhitm-ad-phys-artifact-hit.md](./375-081c5c6a-mhitm-ad-phys-artifact-hit.md) | `081c5c6a` | D-1415 mhitm_ad_phys artifact_hit leftover | **ACCEPT-WITH-DEBT** |
| [376-22e87b3b-backfire.md](./376-22e87b3b-backfire.md) | `22e87b3b` | D-1416 backfire | **ACCEPT-WITH-DEBT** |
| [377-e78d7780-spe-detect-treasure.md](./377-e78d7780-spe-detect-treasure.md) | `e78d7780` | D-1417 SPE_DETECT_TREASURE peffects | **ACCEPT-WITH-DEBT** |
| [378-e611ef84-spe-detect-monsters.md](./378-e611ef84-spe-detect-monsters.md) | `e611ef84` | D-1418 SPE_DETECT_MONSTERS peffects | **ACCEPT-WITH-DEBT** |
| [379-89f05e45-spe-levitation.md](./379-89f05e45-spe-levitation.md) | `89f05e45` | D-1419 SPE_LEVITATION peffects | **ACCEPT-WITH-DEBT** |
| [380-9ab114b4-spe-restore-ability.md](./380-9ab114b4-spe-restore-ability.md) | `9ab114b4` | D-1420 SPE_RESTORE_ABILITY peffects | **ACCEPT-WITH-DEBT** |
| [381-d6d910c2-spe-invisibility.md](./381-d6d910c2-spe-invisibility.md) | `d6d910c2` | D-1421 SPE_INVISIBILITY peffects | **ACCEPT-WITH-DEBT** |
| [382-9f2a3a08-bhitm-wan-speed-monster.md](./382-9f2a3a08-bhitm-wan-speed-monster.md) | `9f2a3a08` | D-1422 bhitm WAN_SPEED_MONSTER | **ACCEPT-WITH-DEBT** |
| [383-1200fdb0-knowninvisible-conferral-see-invis.md](./383-1200fdb0-knowninvisible-conferral-see-invis.md) | `1200fdb0` | D-1423 knowninvisible conferral See_invisible | **ACCEPT-WITH-DEBT** |
| [384-faa5f3f3-bhitm-wan-slow-monster.md](./384-faa5f3f3-bhitm-wan-slow-monster.md) | `faa5f3f3` | D-1424 bhitm WAN_SLOW_MONSTER | **ACCEPT-WITH-DEBT** |
| [385-8f334efb-bhitm-wan-locking.md](./385-8f334efb-bhitm-wan-locking.md) | `8f334efb` | D-1425 bhitm WAN_LOCKING | **ACCEPT-WITH-DEBT** |
| [386-e50968db-bhitm-wan-probing.md](./386-e50968db-bhitm-wan-probing.md) | `e50968db` | D-1426 bhitm WAN_PROBING | **ACCEPT-WITH-DEBT** |
| [387-91c11733-spe-light-nodir.md](./387-91c11733-spe-light-nodir.md) | `91c11733` | D-1427 SPE_LIGHT NODIR weffects | **ACCEPT-WITH-DEBT** |
| [388-19c24f62-peffect-polymorph.md](./388-19c24f62-peffect-polymorph.md) | `19c24f62` | D-1428 peffect_polymorph | **ACCEPT-WITH-DEBT** |
| [389-4a16af4e-peffect-gain-energy.md](./389-4a16af4e-peffect-gain-energy.md) | `4a16af4e` | D-1429 peffect_gain_energy | **ACCEPT-WITH-DEBT** |
| [390-3e742468-peffect-acid.md](./390-3e742468-peffect-acid.md) | `3e742468` | D-1430 peffect_acid | **ACCEPT-WITH-DEBT** |
| [391-66254727-peffect-gain-level.md](./391-66254727-peffect-gain-level.md) | `66254727` | D-1431 peffect_gain_level | **ACCEPT-WITH-DEBT** |
| [392-b19bcf7a-peffect-blindness.md](./392-b19bcf7a-peffect-blindness.md) | `b19bcf7a` | D-1432 peffect_blindness | **ACCEPT-WITH-DEBT** |
| [393-07c5ee30-zapyourself-wan-slow.md](./393-07c5ee30-zapyourself-wan-slow.md) | `07c5ee30` | D-1433 zapyourself WAN_SLOW | **ACCEPT-WITH-DEBT** |
| [394-4488f535-zapyourself-wan-locking.md](./394-4488f535-zapyourself-wan-locking.md) | `4488f535` | D-1434 zapyourself WAN_LOCKING | **ACCEPT-WITH-DEBT** |
| [395-ebe912e0-zapyourself-wan-probing.md](./395-ebe912e0-zapyourself-wan-probing.md) | `ebe912e0` | D-1435 zapyourself WAN_PROBING | **ACCEPT-WITH-DEBT** |
| [396-e413754d-bhitm-spe-drain-life.md](./396-e413754d-bhitm-spe-drain-life.md) | `e413754d` | D-1436 bhitm SPE_DRAIN_LIFE | **ACCEPT-WITH-DEBT** |
| [397-af184f1e-peffect-sleeping.md](./397-af184f1e-peffect-sleeping.md) | `af184f1e` | D-1437 peffect_sleeping | **ACCEPT-WITH-DEBT** |
| [398-abdbcad6-peffect-gain-ability.md](./398-abdbcad6-peffect-gain-ability.md) | `abdbcad6` | D-1438 peffect_gain_ability | **ACCEPT-WITH-DEBT** |
| [399-f6dd492b-peffect-hallucination.md](./399-f6dd492b-peffect-hallucination.md) | `f6dd492b` | D-1439 peffect_hallucination | **ACCEPT-WITH-DEBT** |
| [400-530eaa3c-spe-sleep-wand-duplicate.md](./400-530eaa3c-spe-sleep-wand-duplicate.md) | `530eaa3c` | D-1440 SPE_SLEEP wand-duplicate | **ACCEPT-WITH-DEBT** |
| [401-b8ef02c3-spe-dig-wand-duplicate.md](./401-b8ef02c3-spe-dig-wand-duplicate.md) | `b8ef02c3` | D-1441 SPE_DIG wand-duplicate | **ACCEPT-WITH-DEBT** |
| [402-892be171-mhitm-ad-phys-rustm.md](./402-892be171-mhitm-ad-phys-rustm.md) | `892be171` | D-1442 mhitm_ad_phys rustm leftover | **ACCEPT-WITH-DEBT** |
| [403-4a0aa5cc-zap-steed-wan-probing.md](./403-4a0aa5cc-zap-steed-wan-probing.md) | `4a0aa5cc` | D-1443 zap_steed WAN_PROBING | **ACCEPT-WITH-DEBT** |
| [404-ae0cf7f4-zap-updown-wan-probing.md](./404-ae0cf7f4-zap-updown-wan-probing.md) | `ae0cf7f4` | D-1444 zap_updown WAN_PROBING | **ACCEPT-WITH-DEBT** |
| [405-7628b03e-bhito-wan-probing.md](./405-7628b03e-bhito-wan-probing.md) | `7628b03e` | D-1445 bhito WAN_PROBING | **ACCEPT-WITH-DEBT** |
| [406-ed218e86-zapyourself-spe-drain-life.md](./406-ed218e86-zapyourself-spe-drain-life.md) | `ed218e86` | D-1446 zapyourself SPE_DRAIN_LIFE | **ACCEPT-WITH-DEBT** |
| [407-4dde6eeb-mhitm-ad-phys-poison.md](./407-4dde6eeb-mhitm-ad-phys-poison.md) | `4dde6eeb` | D-1447 mhitm_ad_phys poison leftover | **ACCEPT-WITH-DEBT** |
| [408-20f59004-spe-magic-missile-wand-duplicate.md](./408-20f59004-spe-magic-missile-wand-duplicate.md) | `20f59004` | D-1448 SPE_MAGIC_MISSILE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [409-70c2b8e6-spe-finger-wand-duplicate.md](./409-70c2b8e6-spe-finger-wand-duplicate.md) | `70c2b8e6` | D-1449 SPE_FINGER_OF_DEATH wand-duplicate | **ACCEPT-WITH-DEBT** |
| [410-de69d3f9-spe-knock-wand-duplicate.md](./410-de69d3f9-spe-knock-wand-duplicate.md) | `de69d3f9` | D-1450 SPE_KNOCK IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [411-5c8b73c5-spe-slow-wand-duplicate.md](./411-5c8b73c5-spe-slow-wand-duplicate.md) | `5c8b73c5` | D-1451 SPE_SLOW_MONSTER IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [412-41c16bfe-spe-wizard-lock-wand-duplicate.md](./412-41c16bfe-spe-wizard-lock-wand-duplicate.md) | `41c16bfe` | D-1452 SPE_WIZARD_LOCK IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [413-291aea0a-bhito-spe-drain-item.md](./413-291aea0a-bhito-spe-drain-item.md) | `291aea0a` | D-1453 bhito SPE_DRAIN_LIFE drain_item | **ACCEPT-WITH-DEBT** |
| [414-68635edb-zap-updown-wan-opening.md](./414-68635edb-zap-updown-wan-opening.md) | `68635edb` | D-1454 zap_updown WAN_OPENING/SPE_KNOCK | **ACCEPT-WITH-DEBT** |
| [415-ad3eca95-zap-steed-wan-teleport.md](./415-ad3eca95-zap-steed-wan-teleport.md) | `ad3eca95` | D-1455 zap_steed WAN_TELEPORTATION | **ACCEPT-WITH-DEBT** |
| [416-91e3e8a8-zap-updown-wan-striking.md](./416-91e3e8a8-zap-updown-wan-striking.md) | `91e3e8a8` | D-1456 zap_updown WAN_STRIKING/SPE_FORCE_BOLT | **ACCEPT-WITH-DEBT** |
| [417-c2736f3e-potion-mixtype-dip.md](./417-c2736f3e-potion-mixtype-dip.md) | `c2736f3e` | D-1457 mixtype / potion_dip mix | **ACCEPT-WITH-DEBT** |
| [418-01edf8b9-spe-turn-undead-wand-duplicate.md](./418-01edf8b9-spe-turn-undead-wand-duplicate.md) | `01edf8b9` | D-1458 SPE_TURN_UNDEAD IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [419-7634fd61-spe-polymorph-wand-duplicate.md](./419-7634fd61-spe-polymorph-wand-duplicate.md) | `7634fd61` | D-1459 SPE_POLYMORPH IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [420-f071b0ad-spe-cancellation-wand-duplicate.md](./420-f071b0ad-spe-cancellation-wand-duplicate.md) | `f071b0ad` | D-1460 SPE_CANCELLATION IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [421-e4d98eb1-spe-stone-to-flesh-wand-duplicate.md](./421-e4d98eb1-spe-stone-to-flesh-wand-duplicate.md) | `e4d98eb1` | D-1461 SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [422-2173fc2d-bhit-doorlock-wan-opening.md](./422-2173fc2d-bhit-doorlock-wan-opening.md) | `2173fc2d` | D-1462 bhit doorlock WAN_OPENING/SPE_KNOCK | **ACCEPT-WITH-DEBT** |
| [423-849d7532-banned-pattern-comment-strip.md](./423-849d7532-banned-pattern-comment-strip.md) | `849d7532` | banned-pattern comment strip (no D-id) | **ACCEPT** |
| [424-99a31c84-zap-steed-wan-opening.md](./424-99a31c84-zap-steed-wan-opening.md) | `99a31c84` | D-1463 zap_steed WAN_OPENING/SPE_KNOCK via bhitm | **ACCEPT-WITH-DEBT** |
| [425-89aab16d-zap-steed-spe-drain.md](./425-89aab16d-zap-steed-spe-drain.md) | `89aab16d` | D-1464 zap_steed SPE_DRAIN_LIFE via bhitm | **ACCEPT-WITH-DEBT** |
| [426-a52401a6-zap-updown-wan-locking.md](./426-a52401a6-zap-updown-wan-locking.md) | `a52401a6` | D-1465 zap_updown WAN_LOCKING/SPE_WIZARD_LOCK | **ACCEPT-WITH-DEBT** |
| [427-3605a281-zap-updown-spe-stone-to-flesh.md](./427-3605a281-zap-updown-spe-stone-to-flesh.md) | `3605a281` | D-1466 zap_updown SPE_STONE_TO_FLESH | **ACCEPT-WITH-DEBT** |
| [428-1003ab88-bhito-boxlock.md](./428-1003ab88-bhito-boxlock.md) | `1003ab88` | D-1467 bhito boxlock WAN_OPENING/WAN_LOCKING | **ACCEPT-WITH-DEBT** |
| [429-3b4c39e2-spe-teleport-away.md](./429-3b4c39e2-spe-teleport-away.md) | `3b4c39e2` | D-1468 SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate | **ACCEPT-WITH-DEBT** |
| [430-245c783d-spe-healing-weffects.md](./430-245c783d-spe-healing-weffects.md) | `245c783d` | D-1469 SPE_HEALING/SPE_EXTRA_HEALING directional weffects | **ACCEPT-WITH-DEBT** |
| [431-444e2080-zap-steed-wan-cancellation.md](./431-444e2080-zap-steed-wan-cancellation.md) | `444e2080` | D-1470 zap_steed WAN_CANCELLATION/SPE_CANCELLATION via bhitm | **ACCEPT-WITH-DEBT** |
| [432-36a4e811-zap-steed-wan-polymorph.md](./432-36a4e811-zap-steed-wan-polymorph.md) | `36a4e811` | D-1471 zap_steed WAN_POLYMORPH/SPE_POLYMORPH via bhitm | **ACCEPT-WITH-DEBT** |
| [433-71a0a3d5-potionhit-remaining-otyp.md](./433-71a0a3d5-potionhit-remaining-otyp.md) | `71a0a3d5` | D-1472 potionhit remaining otyp switch | **ACCEPT-WITH-DEBT** |
| [434-e6a44782-zap-steed-wan-make-invisible.md](./434-e6a44782-zap-steed-wan-make-invisible.md) | `e6a44782` | D-1473 zap_steed WAN_MAKE_INVISIBLE via bhitm | **ACCEPT-WITH-DEBT** |
| [435-dfd88d1b-zap-steed-wan-striking.md](./435-dfd88d1b-zap-steed-wan-striking.md) | `dfd88d1b` | D-1474 zap_steed WAN_STRIKING/SPE_FORCE_BOLT via bhitm | **ACCEPT-WITH-DEBT** |
| [436-a3a2d65a-bhit-doorlock-wan-locking.md](./436-a3a2d65a-bhit-doorlock-wan-locking.md) | `a3a2d65a` | D-1475 bhit doorlock WAN_LOCKING/SPE_WIZARD_LOCK | **ACCEPT-WITH-DEBT** |
| [437-747e6616-zap-map-engraving-cancel-trap.md](./437-747e6616-zap-map-engraving-cancel-trap.md) | `747e6616` | D-1476 zap_map down engraving / maybe_explode_trap | **QUALITY-RISK** |
| [438-c3f67016-potionbreathe-remaining-otyps.md](./438-c3f67016-potionbreathe-remaining-otyps.md) | `c3f67016` | D-1477 potionbreathe remaining otyps | **ACCEPT-WITH-DEBT** |
| [439-713e0441-zap-steed-wan-slow.md](./439-713e0441-zap-steed-wan-slow.md) | `713e0441` | D-1478 zap_steed WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm | **ACCEPT-WITH-DEBT** |
| [440-7c918806-zap-steed-wan-speed.md](./440-7c918806-zap-steed-wan-speed.md) | `7c918806` | D-1479 zap_steed WAN_SPEED_MONSTER via bhitm | **ACCEPT-WITH-DEBT** |
| [441-a65834a1-zap-steed-spe-cure-sickness.md](./441-a65834a1-zap-steed-spe-cure-sickness.md) | `a65834a1` | D-1480 zap_steed SPE_CURE_SICKNESS via bhitm | **ACCEPT-WITH-DEBT** |
| [442-4642b8b1-bhito-uchain-unpunish.md](./442-4642b8b1-bhito-uchain-unpunish.md) | `4642b8b1` | D-1481 bhito uchain unpunish WAN_OPENING/SPE_KNOCK | **ACCEPT-WITH-DEBT** |
| [443-f0cb5942-bhit-doorlock-wan-striking.md](./443-f0cb5942-bhit-doorlock-wan-striking.md) | `f0cb5942` | D-1482 bhit doorlock WAN_STRIKING/SPE_FORCE_BOLT | **ACCEPT-WITH-DEBT** |
| [444-49826707-bhito-poly-arm-boxlock.md](./444-49826707-bhito-poly-arm-boxlock.md) | `49826707` | D-1483 bhito poly-arm boxlock reset_pick | **ACCEPT-WITH-DEBT** |
| [445-dba2c79a-mbhit-doorlock.md](./445-dba2c79a-mbhit-doorlock.md) | `dba2c79a` | D-1484 muse.c mbhit doorlock WAN_STRIKING | **ACCEPT-WITH-DEBT** |
| [446-e98c0be8-zap-updown-default-break.md](./446-e98c0be8-zap-updown-default-break.md) | `e98c0be8` | D-1485 zap_updown default break into down bhitpile+zap_map | **ACCEPT** |
| [447-9f784a5c-potion-dip-unicorn-amethyst.md](./447-9f784a5c-potion-dip-unicorn-amethyst.md) | `9f784a5c` | D-1486 potion_dip unicorn/amethyst mixtype dip | **ACCEPT-WITH-DEBT** |
| [448-8d41bd04-the-fruit-from-name.md](./448-8d41bd04-the-fruit-from-name.md) | `8d41bd04` | D-1487 the() fruit_from_name + artifact_name | **ACCEPT-WITH-DEBT** |
| [449-00d5d4d6-arti-invoke-remaining.md](./449-00d5d4d6-arti-invoke-remaining.md) | `00d5d4d6` | D-1488 arti_invoke remaining inv_prop | **QUALITY-RISK** |
| [450-83fa138f-zap-map-lateral-drawbridge.md](./450-83fa138f-zap-map-lateral-drawbridge.md) | `83fa138f` | D-1489 zap_map lateral drawbridge / bhit | **ACCEPT-WITH-DEBT** |
| [451-69080895-minetn-1-orcish-town.md](./451-69080895-minetn-1-orcish-town.md) | `69080895` | D-1490 minetn-1 load_special Orcish Town | **ACCEPT-WITH-DEBT** |
| [452-f26e11aa-worm-move.md](./452-f26e11aa-worm-move.md) | `f26e11aa` | D-1491 worm.c worm_move / shrink_worm / worm_nomove | **ACCEPT-WITH-DEBT** |
| [453-b303c111-add-to-minv-merge.md](./453-b303c111-add-to-minv-merge.md) | `b303c111` | D-1492 mkobj.c add_to_minv merge | **ACCEPT-WITH-DEBT** |
| [454-8669b5b8-see-monsters-hallu-warn.md](./454-8669b5b8-see-monsters-hallu-warn.md) | `8669b5b8` | D-1493 allmain.c see_monsters Hallu / Warn_of_mon | **ACCEPT-WITH-DEBT** |
| [455-27a1f4b6-invoke-healing-blinded.md](./455-27a1f4b6-invoke-healing-blinded.md) | `27a1f4b6` | D-1494 invoke_healing Blinded 0/1 | **ACCEPT** |
| [456-4722df06-untrap-door-force.md](./456-4722df06-untrap-door-force.md) | `4722df06` | D-1495 untrap door force / has_magic_key | **ACCEPT-WITH-DEBT** |
| [457-08854746-body-part-callers.md](./457-08854746-body-part-callers.md) | `08854746` | D-1496 body_part / mbodypart callers | **ACCEPT-WITH-DEBT** |
| [458-377302b9-potion-dip-poison-coat.md](./458-377302b9-potion-dip-poison-coat.md) | `377302b9` | D-1497 potion_dip poison-coat / healing unpoison | **ACCEPT-WITH-DEBT** |
| [459-51ea77da-potion-dip-oil-lamp.md](./459-51ea77da-potion-dip-oil-lamp.md) | `51ea77da` | D-1498 potion_dip oil/lamp | **ACCEPT-WITH-DEBT** |
| [460-089a9829-potion-dip-poly-obj.md](./460-089a9829-potion-dip-poly-obj.md) | `089a9829` | D-1499 potion_dip poly_obj / obj_unpolyable | **ACCEPT-WITH-DEBT** |
| [461-b96ac27f-dip-into-altdip.md](./461-b96ac27f-dip-into-altdip.md) | `b96ac27f` | D-1500 potion.c dip_into #altdip | **ACCEPT-WITH-DEBT** |
| [462-83b29455-h2opotion-dip-useeit.md](./462-83b29455-h2opotion-dip-useeit.md) | `83b29455` | D-1501 H2Opotion_dip useeit / towel | **ACCEPT-WITH-DEBT** |
| [463-89b85fcc-arti-invoke-taming-charge-portal-banish.md](./463-89b85fcc-arti-invoke-taming-charge-portal-banish.md) | `89b85fcc` | D-1502 TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH | **ACCEPT-WITH-DEBT** |
| [464-1f64431d-minetn-6-bustling-town.md](./464-1f64431d-minetn-6-bustling-town.md) | `1f64431d` | D-1503 minetn-6 load_special Bustling Town | **ACCEPT-WITH-DEBT** |
| [465-eeb0e912-minetn-7-bazaar-town.md](./465-eeb0e912-minetn-7-bazaar-town.md) | `eeb0e912` | D-1504 minetn-7 load_special Bazaar Town | **QUALITY-RISK** |
| [466-cac06f86-mon-arrive-leftovers.md](./466-cac06f86-mon-arrive-leftovers.md) | `cac06f86` | D-1505 mon_arrive MIGR_LEFTOVERS DF_ALL | **ACCEPT-WITH-DEBT** |
| [467-1e1d1864-gnome-candle-begin-burn.md](./467-1e1d1864-gnome-candle-begin-burn.md) | `1e1d1864` | D-1506 m_initinv S_GNOME begin_burn | **ACCEPT-WITH-DEBT** |
| [468-a4a370f4-throws-rocks-sokoban.md](./468-a4a370f4-throws-rocks-sokoban.md) | `a4a370f4` | D-1507 throws_rocks Sokoban first-try | **ACCEPT-WITH-DEBT** |
| [469-be542317-body-part-aliases.md](./469-be542317-body-part-aliases.md) | `be542317` | D-1508 body_part HEAD/HAND aliases | **ACCEPT-WITH-DEBT** |
| [470-7092fab7-potion-dip-lichen-acid.md](./470-7092fab7-potion-dip-lichen-acid.md) | `7092fab7` | D-1509 potion_dip lichen / acid-erode | **ACCEPT-WITH-DEBT** |
| [471-57d22857-poly-obj-worn-set-wear.md](./471-57d22857-poly-obj-worn-set-wear.md) | `57d22857` | D-1510 poly_obj worn set_wear | **ACCEPT-WITH-DEBT** |
| [472-85c341a7-fruit-from-indx.md](./472-85c341a7-fruit-from-indx.md) | `85c341a7` | D-1511 fruit_from_indx + xname SLIME_MOLD | **ACCEPT-WITH-DEBT** |
| [473-79744185-any-visible-region.md](./473-79744185-any-visible-region.md) | `79744185` | D-1512 any_visible_region + allmain see_monsters | **ACCEPT-WITH-DEBT** |
| [474-2f5f7fd1-minetn-7-town-gnomes.md](./474-2f5f7fd1-minetn-7-town-gnomes.md) | `2f5f7fd1` | D-1513 minetn-7 town-floor three gnomes | **ACCEPT** |
| [475-9a50ef27-spfx-warn-match-warn.md](./475-9a50ef27-spfx-warn-match-warn.md) | `9a50ef27` | D-1514 SPFX_WARN conferral / MATCH_WARN | **ACCEPT-WITH-DEBT** |
| [476-3a5f062e-s-kop-m-initweap.md](./476-3a5f062e-s-kop-m-initweap.md) | `3a5f062e` | D-1515 m_initweap S_KOP cream pie / club / hose | **ACCEPT-WITH-DEBT** |
| [477-cf3c5701-lizard-ninja-m-initweap.md](./477-cf3c5701-lizard-ninja-m-initweap.md) | `cf3c5701` | D-1516 S_LIZARD skip + PM_NINJA kit | **ACCEPT-WITH-DEBT** |
| [478-8bfe0bc8-set-mimic-sym-in-town.md](./478-8bfe0bc8-set-mimic-sym-in-town.md) | `8bfe0bc8` | D-1517 set_mimic_sym maze/sokoban/in_town | **ACCEPT-WITH-DEBT** |
| [479-527815fb-dprince-bribe-raven.md](./479-527815fb-dprince-bribe-raven.md) | `527815fb` | D-1518 dprince MS_BRIBE / raven BEC_DE_CORBIN | **ACCEPT-WITH-DEBT** |
| [480-d5799f73-mktrap-victim-candle.md](./480-d5799f73-mktrap-victim-candle.md) | `d5799f73` | D-1519 mktrap_victim gnome candle begin_burn | **ACCEPT-WITH-DEBT** |
| [481-5dd0ba20-fruitadd-fruit-from-name.md](./481-5dd0ba20-fruitadd-fruit-from-name.md) | `5dd0ba20` | D-1520 fruitadd → objnam fruit_from_name | **ACCEPT-WITH-DEBT** |
| [482-6a42c40e-doname-fake-arti.md](./482-6a42c40e-doname-fake-arti.md) | `6a42c40e` | D-1521 doname_base slime-mold fake_arti | **ACCEPT-WITH-DEBT** |
| [483-aac21a74-reorder-fruit.md](./483-aac21a74-reorder-fruit.md) | `aac21a74` | D-1522 objnam.c reorder_fruit fid sort | **ACCEPT-WITH-DEBT** |
| [484-e13f38ae-goodfruit.md](./484-e13f38ae-goodfruit.md) | `e13f38ae` | D-1523 bones.c goodfruit fid sign + savefruitchn | **ACCEPT-WITH-DEBT** |
| [485-2c688c98-object-from-map.md](./485-2c688c98-object-from-map.md) | `2c688c98` | D-1524 pager.c object_from_map SLIME_MOLD spe | **ACCEPT-WITH-DEBT** |
| [486-e234a41b-temple-altar-mimic.md](./486-e234a41b-temple-altar-mimic.md) | `e234a41b` | D-1525 set_mimic_sym TEMPLE S_altar Align2amask | **ACCEPT-WITH-DEBT** |
| [487-4e78ca90-emin-roaming.md](./487-4e78ca90-emin-roaming.md) | `4e78ca90` | D-1526 makemon.c emin roaming ALIGNED_CLERIC/ANGEL | **QUALITY-RISK** |
| [488-d53c5cd1-visible-region-summary.md](./488-d53c5cd1-visible-region-summary.md) | `d53c5cd1` | D-1527 wiz_timeout_queue + visible_region_summary | **ACCEPT-WITH-DEBT** |
| [489-aa4d11f5-show-region.md](./489-aa4d11f5-show-region.md) | `aa4d11f5` | D-1528 display.c/region.c show_region overlay | **ACCEPT-WITH-DEBT** |
| [490-72c1fcdd-see-wsegs.md](./490-72c1fcdd-see-wsegs.md) | `72c1fcdd` | D-1529 worm.c see_wsegs + is_worm_tail | **ACCEPT-WITH-DEBT** |
| [491-a5d779b7-getobj-allowcnt.md](./491-a5d779b7-getobj-allowcnt.md) | `a5d779b7` | D-1530 invent.c getobj GETOBJ_ALLOWCNT count prefix | **ACCEPT-WITH-DEBT** |
| [492-3c112783-pri-loca-mk-roamer.md](./492-3c112783-pri-loca-mk-roamer.md) | `3c112783` | D-1531 Pri-loca mk_roamer | **ACCEPT-WITH-DEBT** |
| [493-81e04089-tamedog-covetous.md](./493-81e04089-tamedog-covetous.md) | `81e04089` | D-1532 tamedog is_covetous / make_happy_shk stub | **QUALITY-RISK** |
| [494-9d2ba80e-create-object-lit.md](./494-9d2ba80e-create-object-lit.md) | `9d2ba80e` | D-1533 create_object o->lit | **ACCEPT-WITH-DEBT** |
| [495-289573bc-mcast-blind-you.md](./495-289573bc-mcast-blind-you.md) | `289573bc` | D-1534 mcast_blind_you EYE | **ACCEPT-WITH-DEBT** |
| [496-455020ed-observe-quantum-cat.md](./496-455020ed-observe-quantum-cat.md) | `455020ed` | D-1535 observe_quantum_cat FOOT | **ACCEPT-WITH-DEBT** |
| [497-2778c077-set-mimic-sym-door.md](./497-2778c077-set-mimic-sym-door.md) | `2778c077` | D-1536 set_mimic_sym door S_hcdoor | **ACCEPT-WITH-DEBT** |
| [498-4508a3cb-altdip-internalcmd.md](./498-4508a3cb-altdip-internalcmd.md) | `4508a3cb` | D-1537 INTERNALCMD #altdip | **ACCEPT-WITH-DEBT** |
| [499-e7574dc9-mon-arrive-wander-somexy.md](./499-e7574dc9-mon-arrive-wander-somexy.md) | `e7574dc9` | D-1538 mon_arrive wander/somexy | **ACCEPT-WITH-DEBT** |
| [500-719506a4-cspfx-w-art.md](./500-719506a4-cspfx-w-art.md) | `719506a4` | D-1539 set_artifact_intrinsic cspfx W_ART | **ACCEPT-WITH-DEBT** |
| [501-53f71db1-make-happy-shk.md](./501-53f71db1-make-happy-shk.md) | `53f71db1` | D-1540 make_happy_shk adjalign/home/migrate | **ACCEPT-WITH-DEBT** |
| [502-21ccdfde-ghostfruit.md](./502-21ccdfde-ghostfruit.md) | `21ccdfde` | D-1541 restore.c ghostfruit fruitadd else | **ACCEPT-WITH-DEBT** |
| [503-e5188ba2-light-source-fill.md](./503-e5188ba2-light-source-fill.md) | `e5188ba2` | D-1542 themerms Light source oil lamp | **ACCEPT-WITH-DEBT** |
| [504-caae0b20-set-mimic-sym-furnsyms.md](./504-caae0b20-set-mimic-sym-furnsyms.md) | `caae0b20` | D-1543 set_mimic_sym furnsyms S_* | **ACCEPT-WITH-DEBT** |
| [505-c9f09e97-that-is-a-mimic.md](./505-c9f09e97-that-is-a-mimic.md) | `c9f09e97` | D-1544 that_is_a_mimic object_from_map | **ACCEPT-WITH-DEBT** |
| [506-adfba7fc-detect-wsegs.md](./506-adfba7fc-detect-wsegs.md) | `adfba7fc` | D-1545 detect_wsegs map_monst identity | **QUALITY-RISK** |
| [507-da06ac60-tamedog-wake-nearto.md](./507-da06ac60-tamedog-wake-nearto.md) | `da06ac60` | D-1546 tamedog wake_nearto(mx,my,1) | **ACCEPT-WITH-DEBT** |
| [508-0461e305-lookat-look-at-object.md](./508-0461e305-lookat-look-at-object.md) | `0461e305` | D-1547 lookat getpos look_at_object | **ACCEPT-WITH-DEBT** |
| [509-9b53440e-worm-known.md](./509-9b53440e-worm-known.md) | `9b53440e` | D-1548 worm_known trap monkilled clone | **QUALITY-RISK** |
| [510-34013957-map-monst-mndx.md](./510-34013957-map-monst-mndx.md) | `34013957` | D-1549 map_monst / monster_detect mndx | **ACCEPT-WITH-DEBT** |
| [511-27feb511-trap-monkilled.md](./511-27feb511-trap-monkilled.md) | `27feb511` | D-1550 trap monkilled worm_known | **ACCEPT-WITH-DEBT** |
| [512-73321d0c-getobj-cmdq-int.md](./512-73321d0c-getobj-cmdq-int.md) | `73321d0c` | D-1551 getobj canned CMDQ_INT | **ACCEPT-WITH-DEBT** |
| [513-4383ae0a-is-plural-eyes.md](./513-4383ae0a-is-plural-eyes.md) | `4383ae0a` | D-1552 is_plural Eyes + artidisco | **ACCEPT-WITH-DEBT** |
| [514-9ed46432-splev-amask-mk-roamer.md](./514-9ed46432-splev-amask-mk-roamer.md) | `9ed46432` | D-1553 splev amask + mk_roamer | **ACCEPT-WITH-DEBT** |
| [515-1918ea61-mhidden-description.md](./515-1918ea61-mhidden-description.md) | `1918ea61` | D-1554 mhidden_description | **ACCEPT-WITH-DEBT** |
| [516-1c43e64c-namefloorobj.md](./516-1c43e64c-namefloorobj.md) | `1c43e64c` | D-1555 namefloorobj | **ACCEPT-WITH-DEBT** |
| [517-f8a7cea2-delphi-s-fountain.md](./517-f8a7cea2-delphi-s-fountain.md) | `f8a7cea2` | D-1556 DELPHI S_fountain | **ACCEPT-WITH-DEBT** |
| [518-0f5e4df5-block-point.md](./518-0f5e4df5-block-point.md) | `0f5e4df5` | D-1557 does_block / block_point | **ACCEPT-WITH-DEBT** |
| [519-599494b3-search-regen-xray.md](./519-599494b3-search-regen-xray.md) | `599494b3` | D-1558 SEARCH/REGEN/XRAY conferral | **ACCEPT-WITH-DEBT** |
| [520-30c83eb9-pickinv-ctmp.md](./520-30c83eb9-pickinv-ctmp.md) | `30c83eb9` | D-1559 pickinv `&ctmp` menu count | **ACCEPT-WITH-DEBT** |
| [521-67d0c50c-finish-splitting.md](./521-67d0c50c-finish-splitting.md) | `67d0c50c` | D-1560 finish_splitting / unsplitobj | **ACCEPT-WITH-DEBT** |
| [522-c60475f1-stash-allowcnt.md](./522-c60475f1-stash-allowcnt.md) | `c60475f1` | D-1561 stash getobj ALLOWCNT | **ACCEPT-WITH-DEBT** |
| [523-a54cb31b-howmonseen.md](./523-a54cb31b-howmonseen.md) | `a54cb31b` | D-1562 howmonseen bitmask | **ACCEPT-WITH-DEBT** |
| [524-1504ead1-do-repeat.md](./524-1504ead1-do-repeat.md) | `1504ead1` | D-1563 do_repeat / getobj CQ_REPEAT | **ACCEPT-WITH-DEBT** |
| [525-e8cc4c96-set-mimic-sym-protection.md](./525-e8cc4c96-set-mimic-sym-protection.md) | `e8cc4c96` | D-1564 set_mimic_sym Protection / fruit / Plan-B | **ACCEPT-WITH-DEBT** |
| [526-224bd3a6-place-monster.md](./526-224bd3a6-place-monster.md) | `224bd3a6` | D-1565 place_monster / clone_mon 2D grid | **ACCEPT-WITH-DEBT** |
| [527-72735008-rndmonst-adj.md](./527-72735008-rndmonst-adj.md) | `72735008` | D-1566 rndmonst_adj rogue/elem filters | **ACCEPT-WITH-DEBT** |
| [528-b2827fe2-use-container-reversed.md](./528-b2827fe2-use-container-reversed.md) | `b2827fe2` | D-1567 use_container `'r'` reversed | **ACCEPT-WITH-DEBT** |
| [529-413df120-getobj-noflags.md](./529-413df120-getobj-noflags.md) | `413df120` | D-1568 getobj eat/read/zap/tin NOFLAGS | **ACCEPT-WITH-DEBT** |
| [530-934f168b-pickinv-hands.md](./530-934f168b-pickinv-hands.md) | `934f168b` | D-1569 pickinv hands/xtra_choice | **ACCEPT-WITH-DEBT** |
| [531-3ace1611-cutworm.md](./531-3ace1611-cutworm.md) | `3ace1611` | D-1570 cutworm / place_wsegs | **ACCEPT-WITH-DEBT** |
| [532-9772b028-xray-in-sight.md](./532-9772b028-xray-in-sight.md) | `9772b028` | D-1571 vision_recalc xray IN_SIGHT | **ACCEPT-WITH-DEBT** |
| [533-6d7adcc6-egg-hatch-timers.md](./533-6d7adcc6-egg-hatch-timers.md) | `6d7adcc6` | D-1572 attach_egg_hatch_timeout / obj_split_timers | **ACCEPT-WITH-DEBT** |
| [534-423b6b29-newcham-cancel.md](./534-423b6b29-newcham-cancel.md) | `423b6b29` | D-1573 newcham Protection cancel / wormgone | **ACCEPT-WITH-DEBT** |
| [535-1ba35e31-unblock-point.md](./535-1ba35e31-unblock-point.md) | `1ba35e31` | D-1574 unblock_point / dig_point | **QUALITY-RISK** |
| [536-d13bf416-mk-gen-ok-mail.md](./536-d13bf416-mk-gen-ok-mail.md) | `d13bf416` | D-1575 mk_gen_ok MAIL / msummon ndemon arms | **ACCEPT-WITH-DEBT** |
| [537-7131dc25-add-region-per-cell.md](./537-7131dc25-add-region-per-cell.md) | `7131dc25` | D-1576 add_region / remove / expire per-cell block | **ACCEPT-WITH-DEBT** |
| [538-38c61b34-redraw-worm.md](./538-38c61b34-redraw-worm.md) | `38c61b34` | D-1577 redraw_worm tamedog / abuse_dog | **ACCEPT-WITH-DEBT** |
| [539-c4019a30-force-invmenu.md](./539-c4019a30-force-invmenu.md) | `c4019a30` | D-1578 getobj force_invmenu `*`/`?` redo | **ACCEPT-WITH-DEBT** |
| [540-51d877a8-mime-action.md](./540-51d877a8-mime-action.md) | `51d877a8` | D-1579 mime_action typed `'-'` | **ACCEPT-WITH-DEBT** |
| [541-d7879b7c-gacc-ball.md](./541-d7879b7c-gacc-ball.md) | `d7879b7c` | D-1580 pickinv gacc / BALL `'0'` | **ACCEPT-WITH-DEBT** |
| [542-fd458754-traditional-loot.md](./542-fd458754-traditional-loot.md) | `fd458754` | D-1581 traditional_loot / askchain | **ACCEPT-WITH-DEBT** |
| [543-6c996e15-prefixcmd-cmdq-shift.md](./543-6c996e15-prefixcmd-cmdq-shift.md) | `6c996e15` | D-1582 PREFIXCMD / cmdq_shift | **ACCEPT-WITH-DEBT** |
| [544-7843458b-nv-range-circle.md](./544-7843458b-nv-range-circle.md) | `7843458b` | D-1583 nv_range circle_ptr | **ACCEPT-WITH-DEBT** |
| [545-05c69d9b-mk-mplayer.md](./545-05c69d9b-mk-mplayer.md) | `05c69d9b` | D-1584 mk_mplayer splev role-id | **ACCEPT-WITH-DEBT** |
| [546-d5c9430a-tamedog-full-moon.md](./546-d5c9430a-tamedog-full-moon.md) | `d5c9430a` | D-1585 tamedog FULL_MOON S_DOG rn2(6) | **ACCEPT-WITH-DEBT** |
| [547-9cdc66f5-newcham-nc-show-msg.md](./547-9cdc66f5-newcham-nc-show-msg.md) | `9cdc66f5` | D-1586 newcham NC_SHOW_MSG pline_mon | **QUALITY-RISK** |
| [548-5e46f730-mimic-light-blocking.md](./548-5e46f730-mimic-light-blocking.md) | `5e46f730` | D-1587 mimic_light_blocking See_invisible | **ACCEPT-WITH-DEBT** |
| [549-a3325fe0-putmsghistory.md](./549-a3325fe0-putmsghistory.md) | `a3325fe0` | D-1588 getobj putmsghistory / tty_putmsghistory | **ACCEPT-WITH-DEBT** |
| [550-7415056f-sortloot-inuse.md](./550-7415056f-sortloot-inuse.md) | `7415056f` | D-1589 sortloot SORTLOOT_INUSE / inuse_only | **ACCEPT-WITH-DEBT** |
| [551-094af60d-wizid-pick-any.md](./551-094af60d-wizid-pick-any.md) | `094af60d` | D-1590 display_pickinv wizid PICK_ANY | **ACCEPT-WITH-DEBT** |
| [552-92bbf63b-display-used-invlets.md](./552-92bbf63b-display-used-invlets.md) | `92bbf63b` | D-1591 display_used_invlets | **ACCEPT-WITH-DEBT** |
| [553-c4be5135-more-containers-n.md](./553-c4be5135-more-containers-n.md) | `c4be5135` | D-1592 in_or_out_menu more_containers n | **ACCEPT-WITH-DEBT** |
| [554-4b34b340-tamedog-ustuck.md](./554-4b34b340-tamedog-ustuck.md) | `4b34b340` | D-1593 tamedog ustuck expels/unstuck | **ACCEPT-WITH-DEBT** |
| [555-dc1d6d94-normal-shape-await.md](./555-dc1d6d94-normal-shape-await.md) | `dc1d6d94` | D-1594 normal_shape await NC_SHOW_MSG | **ACCEPT-WITH-DEBT** |
| [556-ab70af21-tamedog-has-edog.md](./556-ab70af21-tamedog-has-edog.md) | `ab70af21` | D-1595 tamedog initedog has_edog | **ACCEPT-WITH-DEBT** |
| [557-fa152acc-create-mplayers.md](./557-fa152acc-create-mplayers.md) | `fa152acc` | D-1596 create_mplayers Astral final_level | **ACCEPT-WITH-DEBT** |
| [558-9244ce75-show-transient-light.md](./558-9244ce75-show-transient-light.md) | `9244ce75` | D-1597 show_transient_light mtemplit | **QUALITY-RISK** |
| [559-9a4cbd04-has-mcorpsenm.md](./559-9a4cbd04-has-mcorpsenm.md) | `9a4cbd04` | D-1598 has_mcorpsenm NON_PM unset | **ACCEPT-WITH-DEBT** |
| [560-95ad0f11-sortloot-petrify.md](./560-95ad0f11-sortloot-petrify.md) | `95ad0f11` | D-1599 SORTLOOT_PETRIFY / feel_cockatrice | **ACCEPT-WITH-DEBT** |
| [561-fb87326a-perm-invent-inv-inuse.md](./561-fb87326a-perm-invent-inv-inuse.md) | `fb87326a` | D-1600 perm_invent InvInUse / prepare_perminvent | **QUALITY-RISK** |
| [562-fd0ada3f-tty-doprev-message.md](./562-fd0ada3f-tty-doprev-message.md) | `fd0ada3f` | D-1601 tty_doprev_message / ^P #prevmsg | **ACCEPT-WITH-DEBT** |
| [563-b9710bcf-ggetobj-takeoff-identify.md](./563-b9710bcf-ggetobj-takeoff-identify.md) | `b9710bcf` | D-1602 ggetobj takeoff/identify askchain | **ACCEPT-WITH-DEBT** |
