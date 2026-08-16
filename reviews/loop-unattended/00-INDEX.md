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
