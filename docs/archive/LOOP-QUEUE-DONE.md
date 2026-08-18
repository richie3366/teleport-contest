# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-08-18

- [x] `mhitm.c` `passivemm` AD_RBRE shock `monkilled` (named). Not troll_baned. **Addressed:** D-1241 `9b5bd39d`


- [x] `uhitm.c` remaining `pline_mon` (named). Not troll_baned. **Addressed:** D-1240 `d8f28958`


- [x] `hack.c` cannot_push squeeze (named from D-1226). Not run>=2 boulder. **Addressed:** D-1239 `51a337e7`


- [x] `monmove.c` `mind_blast` (named). Not msg_mon_movement. **Addressed:** D-1238 `6d2735b0`


- [x] `teleport.c` rolling-boulder TELEP `pline_xy` (named). Not `#teleport`. **Addressed:** D-1237 `d81367e2`


- [x] `options.c` `optlist` `&a11y.mon_movement` (named). Not spot_monsters. **Addressed:** D-1236 `5c860b0e`


- [x] `options.c` `optlist` `&a11y.spot_monsters` (named). Not glyph_updates. **Addressed:** D-1235 `f631610d`


- [x] `do.c` `revive_corpse` unique/pname `corpse_xname` adjective (named). Not Soundeffect. **Addressed:** D-1234 `e0ea385e`


- [x] `uhitm.c` `hmonas` `troll_baned` `mkcorpstat_norevive` (named). Not hmon_hitmon. **Addressed:** D-1233 `976094e5`


- [x] `uhitm.c` `hmon_hitmon` `troll_baned` around `killed` (named). Not hmonas. **Addressed:** D-1232 `83624a46`


- [x] `mhitm.c` gulpmm `m_at` swap (named). Not passivemm. **Addressed:** D-1231 `5cd4ab5c`


- [x] `teleport.c` `#teleport` `doextcmd` (named from D-1209). Not energy-spellcast. **Addressed:** D-1230 `a3c04dd7`


- [x] `hack.c` `impact_disturbs_zombies` (named from D-1214). Not hideunder. **Addressed:** D-1229 `0ddfb189`


- [x] `hack.c` `msg_mon_movement` (named). Not pline_mon. **Addressed:** D-1228 `23f3f19e`


- [x] remaining `pline.c` `pline_mon` callers (named). Not msg_mon_movement. **Addressed:** D-1227 `1da251ee`


- [x] `hack.c` run>=2 boulder `pline_dir` (named). Not mention_walls. **Addressed:** D-1226 `7998cb1e`


- [x] `spell.c` energy/`spelleffects` teleport (named from D-1209). Not `#teleport` doextcmd. **Addressed:** D-1225 `89588300`


- [x] `teleport.c` LEVEL_TELEP `y_n` (named from D-1209). Not energy-spellcast. **Addressed:** D-1224 `790ca8b7`


- [x] `mhitm.c` `troll_baned` `mkcorpstat_norevive` (named). Not gulpmm. **Addressed:** D-1223 `d4f9b432`


- [x] `do.c` `revive_corpse` `Soundeffect` se_scratching (named). Not BURIED pit. **Addressed:** D-1222 `7b0f9da7`


- [x] `display.c` `show_glyph` / JS `gbuf_show_kind`: do not re-call `mon_glyph`/`obj_glyph` (Hallu `rn2_on_display_rng`) on every `show_glyph_cell`. C classifies the already-chosen glyph. Keep mention_map addr. seed0383. Source: reviews/loop-unattended/181-925e5b77-show-glyph-glyph-updates.md **Addressed:** D-1221 `c7071a4a`


- [x] `do.c` `revive_corpse` BURIED `!is_zomb` FALLTHROUGH `impossible` (named). Not Soundeffect. **Addressed:** D-1220 `b09b013d`


- [x] `display.c` `show_glyph_change` glyph_updates (named). Not opt_accessiblemsg. **Addressed:** D-1219 `925e5b77`


- [x] `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg` (named). Not dolookaround. **Addressed:** D-1218 `b59f294b`


- [x] `cmd.c` `dolookaround` (named). Not glyph_updates. **Addressed:** D-1217 `dc34d705`


- [x] `pline.c` `set_msg_dir` (named). Not pline_xy. **Addressed:** D-1216 `517cb217`


- [x] `pline.c` `pline_xy`/`pline_mon` (named). Not set_msg_dir. **Addressed:** D-1215 `eaf10f2d`


- [x] `hack.c` `disturb_buried_zombies` (named). Not zombify_mon. **Addressed:** D-1214 `b44c4847`


- [x] `dig.c` `rot_corpse` invent/minvent worn plines (named). Not REVIVE. **Addressed:** D-1213 `c85424f4`


- [x] `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED (named). Not BURIED. **Addressed:** D-1212 `fc314871`


- [x] `mhitm.c` `gz.zombify` at monkilled (named). Not make_corpse. **Addressed:** D-1211 `481e005b`


- [x] `mon.c` `zombie_maker` + `gz.zombify` at `make_corpse` (named). Not mhitm. **Addressed:** D-1210 `f1a3518a`


- [x] `teleport.c` `dotelecmd` m-prefix mode menu (named). Not energy gate. **Addressed:** D-1209 `b3c0d228`


- [x] `teleport.c` `dotele` trap-at-feet teledest (named). Not vault_tele. **Addressed:** D-1208 `bd8c2161`


- [x] `pline.c` `vpline` accessiblemsg consume (named). Not set_msg_xy. **Addressed:** D-1207 `08d2e6b0`


- [x] `teleport.c` `scrolltele` steed whobuf (named). Not unconscious. **Addressed:** D-1206 `319bf51c`


- [x] `teleport.c` `scrolltele` unconscious (named). Not Override yn. **Addressed:** D-1205 `f389c2b4`


- [x] `eat.c` `eatspecial` (named). Not doeat_nonfood. **Addressed:** D-1204 `dbd3a08b`


- [x] `cmd.c` `wiz_level_change` (named). Not notice_mon_off. **Addressed:** D-1203 `a16884ab`


- [x] `timeout.c` REVIVE/ZOMBIFY (named). Not run_timers. **Addressed:** D-1202 `dfed1743`


- [x] `artifact.c` `init_artifacts` (named). Not wizkit. **Addressed:** D-1201 `4ffc2264`


- [x] `allmain.c` `newgame` `notice_mon_off` (named). Not wizkit. **Addressed:** D-1200 `15cb4a37`


- [x] `dog.c` `mon_arrive` `my=xyflags` before rloc (named). Not migrate bit. **Addressed:** D-1199 `4dc76022`


- [x] `dog.c` `migrate_to_level` `In_W_tower` xyflags bit 2 (named). Not mon_arrive. **Addressed:** D-1198 `2f8f7d9f`


- [x] `teleport.c` `scrolltele` W-tower Override yn (named). Not make_blinded. **Addressed:** D-1197 `7deb2670`

## 2026-08-17

- [x] `teleport.c` `rloc_to_core` `set_msg_xy` (named). Not makeknown. **Addressed:** D-1196 `d0cbc6e3`


- [x] `teleport.c` `rloc_to_core` wand `makeknown` (named). Not ustuck-together. **Addressed:** D-1195 `143f9a46`


- [x] `do.c` `goto_level` `notice_mon_off` (named). Not docrt. **Addressed:** D-1194 `c4c57ac1`


- [x] `dokick.c` `deliver_obj_to_mon` (named). Not obj_delivery. **Addressed:** D-1193 `2d2e68c7`


- [x] `allmain.c` `newgame` wizkit `obj_delivery(FALSE)` (named). Not goto_level. **Addressed:** D-1192 `cf9eb066`


- [x] `do.c` `goto_level` `run_timers` (named). Not kill_genocided. **Addressed:** D-1191 `cc7d0ef5`


- [x] `do.c` `goto_level` `kill_genocided_monsters` (named). Not run_timers. **Addressed:** D-1190 `9a2cbc27`


- [x] Human canary seed8243: `cmd.c` rhack `Unknown command` `visctrl(key)` so Ctrl-C is `^C` not raw ETX. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1189 `15dddffe`


- [x] Human canary seed8243: `teleport.c` `domagicportal` `"You activated a magic portal!"` / tutorial ATSTAIRS stunmsg. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1188 `c58efd08`


- [x] Human canary seed8243: `hack.c` `avoid_trap_andor_region` ParanoidTrap `"Really step into that magic portal?"` yn. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1187 `77ead396`


- [x] Human canary seed8243: `cmd.c` `g` rush prefix (until something interesting) vs JS Unknown command. Not maybe_smudge_engr. Not offx. **Addressed:** D-1186 `4dd396cc`


- [x] Human canary (no review stamp): `private-sessions/seed8243-samurai-tutorial.session.json`. Chargen `\e[72C` was truncated capture; local C H2344 `\e[40C` already matched JS (do not revert D-0078). First real miss: `do_wear.c` `doddoremarm` `A` empty-worn. **Addressed:** D-1185 `4750946a`


- [x] `teleport.c` `scrolltele` make_blinded (named). Not W-tower amulet. **Addressed:** D-1184 `1b94d8d3`


- [x] `teleport.c` `rloc_to_core` ustuck-together pline (named). Not telemsg. **Addressed:** D-1183 `d2512b22`


- [x] `teleport.c` `rloc_pos_ok` mx==0 updest/dndest (named). Not room lock. **Addressed:** D-1182 `01c8c41f`


- [x] `teleport.c` `rloc` `RLOC_ERR` impossible() (named). Not vanish-msg. **Addressed:** D-1181 `0b488053`


- [x] `teleport.c` `rloc_to_core` telemsg vanishes-and-reappears (named). Not RLOC_ERR. **Addressed:** D-1180 `665bbe09`


- [x] `do.c` `goto_level` `do_fall_dmg` (named). Not fix_shop_damage. **Addressed:** D-1179 `5f08f9e5`


- [x] `do.c` `goto_level` `fix_shop_damage` (named). Not obj_delivery. **Addressed:** D-1178 `4a700d08`


- [x] `do.c` `goto_level` `obj_delivery` (named). Not in_out_region. **Addressed:** D-1177 `36e0ce72`


- [x] `dothrow.c` `mhurtle_step` `m_in_out_region` (named). Not hurtle_step. **Addressed:** D-1176 `b652fbf3`


- [x] `allmain.c` `m_everyturn_effect` youmonst (named). Not m_postmove_effect. **Addressed:** D-1175 `7188da5b`


- [x] `mhitm.c` `mdisplacem` `update_monster_region` (named). Not rloc_to. **Addressed:** D-1174 `e5ec6685`


- [x] `mon.c` `mnexto` `control_mon_tele` (named). Not rloc. **Addressed:** D-1173 `e07eeae7`


- [x] `teleport.c` `rloc` steed `tele()` (named). Not Wizard stair. **Addressed:** D-1172 `e7c5c8ac`


- [x] `teleport.c` `rloc_pos_ok` isshk/ispriest room lock (named). Not make_angry_shk. **Addressed:** D-1171 `822498d3`


- [x] `teleport.c` `rloc_to` occupation `dochugw` (named). Not mintrap. **Addressed:** D-1170 `5a6be1fe`


- [x] `region.c` `run_regions` `hero_inside` bit (named). Not walk caller. **Addressed:** D-1169 `0f1ce7c6`


- [x] `allmain.c` `moveloop` `fumaroles` (named). Not mklev. **Addressed:** D-1168 `0ff54fb4`


- [x] `hack.c` `m_postmove_effect` youmonst (named). Not in_out_region. **Addressed:** D-1167 `d6ba6ede`


- [x] `do.c` `goto_level` `in_out_region` (named). Not walk. **Addressed:** D-1166 `0cb3acbe`


- [x] `dothrow.c` `hurtle_step` `in_out_region` (named). Not walk. **Addressed:** D-1165 `6d44ab7f`


- [x] `teleport.c` `rloc_to` trapped `mintrap` (named). Not occupation. **Addressed:** D-1164 `6f7e188b`


- [x] `teleport.c` `rloc_to` minvent shop bill (named). Not shk-home. **Addressed:** D-1163 `d24ff150`


- [x] `teleport.c` `rloc_to` shk `make_angry_shk` (named). Not vanish-msg. **Addressed:** D-1162 `38353d8a`


- [x] `teleport.c` `rloc_to` `update_monster_region` (named). Not set_apparxy. **Addressed:** D-1161 `4dfadf3a`


- [x] `teleport.c` `rloc_to` `set_apparxy` (named). Not vanish-msg. **Addressed:** D-1160 `8efa62e9`


- [x] `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath (named). Not inside_f. **Addressed:** D-1159 `e42ace32`


- [x] `region.c` `create_gas_cloud_selection` (named). Not BFS create. **Addressed:** D-1158 `7cc347fc`


- [x] `hack.c` walk `in_out_region` (named). Not teleds. **Addressed:** D-1157 `ed28eef1`


- [x] `mklev.c` `fumaroles` `clear_heros_fault` / Norep whoosh (named). Not expire dissipation. **Addressed:** D-1156 `16e8d88b`


- [x] `region.c` `expire_gas_cloud` dissipation plines (named). Not inside_gas HP. **Addressed:** D-1155 `df99ab32`


- [x] `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from invocation_pos). Not teleds. **Addressed:** D-1154 `10904562`


- [x] `teleport.c` `vault_tele` `tele()` fallback (named). Not teleds. **Addressed:** D-1153 `b332516f`


- [x] `teleport.c` `rloc_to` `maybe_unhide_at` (named). Not vanish-msg. **Addressed:** D-1152 `9b5ce7b3`


- [x] `hack.c` `classify_terrain` (named from switch_terrain). Not invocation. **Addressed:** D-1151 `6bdf4d49`


- [x] `hack.c` `domove` `invocation_message` (named). Not teleds. **Addressed:** D-1150 `505df513`


- [x] `mon.c` `mongone` `mdrop_special_objs` then discard (elemental_clog victim). Not worn extract. Source: reviews/loop-unattended/109-27274b3b-overcrowding.md **Addressed:** D-1149 `cdaccd3a`


- [x] `fountain.c` `gush` `deal_with_overcrowding` (named). Not lava xkilled. **Addressed:** D-1148 `27274b3b`


- [x] `do_name.c` `rndcolor` (named from hcolor). Not sit/apply identity stubs. **Addressed:** D-1147 `5c43dbc9`


- [x] `region.c` `inside_gas_cloud` damage (named). Not enveloped pline. **Addressed:** D-1146 `fe5cefad`


- [x] `fountain.c` Excalibur `:441` `update_inventory` (named). Not artidisco save. **Addressed:** D-1145 `623bc861`


- [x] `potion.c` `djinni_from_bottle` `mongrantswish` (named). Not bottle chance RNG. **Addressed:** D-1144 `1c1f7ccb`


- [x] `region.c` `in_out_region` enter_msg / leave_msg (named). Not update_player_regions. **Addressed:** D-1143 `bb8585ec`


- [x] `teleport.c` `teleds` `notice_mon_off` / `notice_all_mons` (named). Not invocation. **Addressed:** D-1142 `52194cc9`


- [x] `teleport.c` `teleds` `invocation_message` (named). Not vault_guard. **Addressed:** D-1141 `4d71520e`


- [x] `teleport.c` `teleds` `vault_guard` `uleftvault` (named). Not swallow docrt. **Addressed:** D-1140 `36fb8797`


- [x] `teleport.c` `teleds` swallow `docrt` (named). Not hideunder. **Addressed:** D-1139 `4071a74d`


- [x] `fountain.c` `gush` lava `fire_damage_chain` / `xkilled` (named). Not minliquid. **Addressed:** D-1138 `068e78df`


- [x] `region.c` `make_gas_cloud` enveloped pline (named). Not create_gas_cloud size-1. **Addressed:** D-1137 `50136436`


- [x] `fountain.c` `mongrantswish` `tmp_at` glyph hide (named). Not dowaterdemon makemon. **Addressed:** D-1136 `52aea3d1`


- [x] `do_name.c` `hcolor` Hallucination drinksink synonyms (named). Not hliquid. **Addressed:** D-1135 `b166bda5`


- [x] `fountain.c` `dipfountain` `update_inventory` after switch (named). Not Excalibur gift. **Addressed:** D-1134 `5f55ceba`


- [x] `teleport.c` `tele()` / trap teledest (named). Not tele_trap wrenching. **Addressed:** D-1133 `a956e990`


- [x] `teleport.c` `teleds` `buried_ball_to_punishment` (named). Not Punished ball. **Addressed:** D-1132 `a8d04dd2`


- [x] `teleport.c` `teleds` `hideunder` / mimic (named). Not swallow docrt. **Addressed:** D-1131 `00956ae8`


- [x] `teleport.c` `teleds` `update_player_regions` (named). Not teleok in_out_region. **Addressed:** D-1130 `6dd7a794`


- [x] `teleport.c` `teleds` `switch_terrain` (named). Not fill_pit. **Addressed:** D-1129 `410f22a2`


- [x] `potion.c` pool dip yn (named from dipsink). Not drinkfountain. **Addressed:** D-1128 `5b3923d7`


- [x] `eat.c` `vomit` cantvomit/Sick/acid poly arms (named from drinkfountain). Not dryup. **Addressed:** D-1127 `b4954c6f`


- [x] `fountain.c` `drinkfountain` case 24 `update_inventory` (named). Not enlightenment. **Addressed:** D-1126 `6497347e`


- [x] `fountain.c` `dowatersnakes` Hallucination `rndmonnam` (named). Not gush. **Addressed:** D-1125 `2fc408c0`

## 2026-08-16

- [x] `fountain.c` `drinksink` case 13 `create_gas_cloud` (named). Not polyself. **Addressed:** D-1124 `3b7606b3`


- [x] `teleport.c` `rloc_to` worm / ustuck-swallow `docrt` (named). Not newsym. **Addressed:** D-1123 `a55c4b24`


- [x] `teleport.c` `rloc` Wizard stair / `mon_telecontrol` (named). Not RLOC_MSG. **Addressed:** D-1122 `5a2f96ca`


- [x] `teleport.c` `teleds` `fill_pit` (named). Not Punished ball. **Addressed:** D-1121 `803a7f5c`


- [x] `teleport.c` `tele_trap` Antimagic wrenching pline (named). Not vault_tele. **Addressed:** D-1120 `acfb0167`


- [x] `teleport.c` `teleok` `tele_jump_ok` / `in_out_region` (named). Not vibrating. **Addressed:** D-1119 `26560ccf`


- [x] `fountain.c` `drinksink` case 10 `polyself` (named). Not dipsink. **Addressed:** D-1118 `8a01c200`


- [x] `fountain.c` `gush` `minliquid` body (named). Not dogushforth. **Addressed:** D-1117 `afb86487`


- [x] `fountain.c` `drinkfountain` enlightenment body (named). Not dryup. **Addressed:** D-1116 `19e4be31`


- [x] `fountain.c` `dipfountain` case 29 `mkgold` coins (named). Not wash_hands. **Addressed:** D-1115 `79438232`


- [x] `fountain.c` `dipfountain` cases 17–20 uncurse (named). Not Excalibur. **Addressed:** D-1114 `e30a51f2`


- [x] `fountain.c` `dipsink` (named). Not wash_hands. **Addressed:** D-1113 `c67f09d1`


- [x] `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP arms (named). Not hole path. **Addressed:** D-1112 `bb552fba`


- [x] `teleport.c` `teleok` vibrating / pit-fly (named). Not `rloc`. **Addressed:** D-1111 `b0847b88`


- [x] `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (named). Not `goodpos_onscary`. **Addressed:** D-1110 `fd738eab`


- [x] `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (named). Not `goodpos`. **Addressed:** D-1109 `5bf81ca7`


- [x] `fountain.c` `wash_hands` (named). Not Excalibur. **Addressed:** D-1108 `62b93acb`


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
