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
