# Divergence index

Lookup by ID, then open **one** matching `## D-NNNN` section in
`DIVERGENCE-LOG.md`. Do **not** read the full log by default.

| ID | Status | Area | Short result |
|---|---|---|---|
| D-1240 | fixed | uhitm.c remaining already-ported `pline_mon` | map-driven; C `uhitm.c` `light_hits_gremlin` 6425–6433 / `mhitm_ad_legs` nuzzle 4454 / `mhitm_ad_sedu` brag 4647; JS `pline`→`pline_mon` so `a11y.msg_loc` is mx,my; flash awaken/blind, legs reach/prick, sedu charm-fail stay `pline`; unported `mhitm_ad_*` / mhitu `hitmsg` / mgc avoids-harm / AT_HUGS still named |
| D-1239 | fixed | hack.c `cannot_push` squeeze + `sokoban_guilt` | map-driven; C `hack.c:304–311` / `trap.c` `sokoban_guilt` 7039–7055; vain-push then squeeze pline + return 0 so hero occupies the boulder; Sokoban `sokocheat++` + `change_luck(-1)`; giant pickup/maneuver / nopick m-dir still named |
| D-1238 | fixed | monmove.c `mind_blast` | map-driven; C `monmove.c:581–645` / dochug `:827–835`; JS `pline_mon` concentrates + far You-sense return + peaceful soothing vs `sensemon`/`Blind_telepat`/`!rn2(10)` lock-on + Half_spell integer half + fmon nmon `wakeup`/`rnd(15)`/`monkilled("", AD_DRIN)` then `set_apparxy`/`distfleeck`; bee_eat/iron bars/`mon_yells` still named |
| D-1237 | fixed | trap.c `launch_obj` rolling-boulder TELEP `pline_xy` | map-driven; C `trap.c:3460–3488` ROLL TELEP/LEVEL_TELEP `pline_xy`/`You_hear` then `rloco` or `add_to_migration`+`get_level`; LEVEL_TELEP `random_teleport_level` same-depth skip; `seetrap`+used_up; landmine/pit/`flooreffects` still named |
| D-1236 | fixed | options.c `optlist` `mon_movement` `a11y.mon_movement` | map-driven; C `optlist.h:493–494` `NHOPTB(mon_movement, … Off, …, &a11y.mon_movement)`; `options.c` `optfn_boolean` `*(addr)=!negated` no after-change arm; doset/`OPTIONS=` no longer `flags.mon_movement`; colon true/yes/on/1; default Off public unhit; leftover flags ignored |
| D-1235 | fixed | options.c `optlist` `spot_monsters` `a11y.mon_notices` | map-driven; C `optlist.h:708–710` `NHOPTB(spot_monsters, … Off, …, &a11y.mon_notices)`; `options.c` `optfn_boolean` `*(addr)=!negated` no after-change arm; doset/`OPTIONS=` no longer `flags.spot_monsters`; colon true/yes/on/1; default Off public unhit; `mon_movement` addr D-1236 |
| D-1234 | fixed | do.c `revive_corpse` unique/pname `corpse_xname` adjective | map-driven; C `objnam.c:1824–1919` unique/pname `s_suffix` + adjective after possessive vs before ordinary; `do.c:2131–2133` `corpse_xname(..., chewed?"bite-covered":0, CXN_SINGULAR)`; `dig.c:2158` `CXN_NO_PFX`; glob / doname CXN_ARTICLE\|CXN_NOCORPSE prefix-as-adjective still named |
| D-1233 | fixed | uhitm.c `hmonas`/`damageum` `troll_baned` ternary/`uwep` | map-driven; C `uhitm.c:4866–4880` AT_WEAP\|\|AT_CLAW `troll_baned(mdef, uwep) ? TRUE : FALSE` then killed/xkilled then FALSE (not hmon_hitmon TRUE-only / hitting obj); `do_attack` Upolyd → hmonas; `mkcorpstat` copies `norevive`; `revive` twitch already live; AT_HUGS/EXPL/ENGL / altwep / `demonpet` spawn still named |
| D-1232 | fixed | uhitm.c `hmon_hitmon` `troll_baned` around `killed` | map-driven; C `uhitm.c:1906–1909` TRUE-only then `killed` then FALSE (not mhitm/hmonas ternary); hitting `obj` not `uwep`; `mkcorpstat` copies `norevive`; `revive` twitch already live; hmonas AT_WEAP\|\|AT_CLAW `uwep` D-1233; poiskilled skip still named |
| D-1231 | fixed | mhitm.c gulpmm `m_at` swap + AT_ENGL | map-driven; C `mhitm.c:1075–1080` `m_at(mdef)==magr` re-place before `monkilled`; `gulpmm` 849–967 occupancy + `mattackm` AT_ENGL 510–536; JS `MON_OFFMAP` stands in for C grid; snuff_lit / `!goodpos` return-home / AD_DGST eat / passivemm shock still named; uhitm hmonas troll_baned D-1233 |
| D-1230 | fixed | `cmd.c` `#teleport` `doextcmd` | map-driven; C `cmd.c:1890–1891` extcmdlist `"teleport"` → `dotelecmd` IFBURIED\|CMD_M_PREFIX no AUTOCOMPLETE; `doextcmd:507–511` accept_menu_prefix; `getline.c` ECM_IGNOREAC\|ECM_EXACTMATCH; rhack `#` CMD_M_PREFIX; JS EXT_CMDS not EXT_CMD_AC; rolling-boulder TELEP `pline_xy` / weffects / Amulet drain still named |
| D-1229 | fixed | hack.c `impact_disturbs_zombies` | map-driven; C `hack.c:1787–1794` `owt<(violent?10U:100U)||is_flimsy` then `disturb_buried_zombies(ox,oy)`; dropz `with_impact`; throwit `!IS_SOFT` TRUE; kick obstructed-loose+land TRUE; `obj.h` is_flimsy; container_impact_dmg / hitfloor `dropz(TRUE)` / hideunder / local wake clones still named |
| D-1228 | fixed | monmove.c `msg_mon_movement` | map-driven; C `monmove.c:32–48` / caller `:2051–2053` after `place_monster`; `pline_xy(nix,niy)` dest not `pline_mon`; `a11y.mon_movement` + `canspotmon` + `mspotted`; next2u/closer/further/distance + `vtense(0, locomotion(…,"move"))`; default Off; optlist `&a11y.mon_movement` addr / `worm_move` / remaining `pline_mon` still named |
| D-1227 | fixed | monmove.c remaining `pline_mon` | map-driven; C `monmove.c` `monflee` 493–517 / `itsstuck` 1056 / `maybe_spin_web` 1286 / `postmov` door 1551–1610; JS `pline`→`pline_mon` so `a11y.msg_loc` is mx,my; You_see/You_hear stay `pline`; fog/S_LIGHT flows; Adjmonnam immobile + upstart(y_monnam); uhitm/worn/trap/weapon drop·tether / muse drinks / iron bars / mind_blast / bee_eat / mon_yells named; `msg_mon_movement` D-1228 |
| D-1226 | fixed | hack.c `test_move` run>=2 boulder `pline_dir` | map-driven; C `hack.c:1216–1221` / `could_move_onto_boulder` 145–163; g/G/travel DO_MOVE + mention_walls `"A boulder blocks your path."` via `pline_dir(xytodir(dx,dy))`; TEST_MOVE silent; Passes_walls skip outer arm; empty pack / giant / tiny / Blind / Hallu skip abort; cannot_push squeeze D-1239 |
| D-1225 | fixed | `dotele` energy/`spelleffects` SPE_TELEPORT_AWAY | map-driven; C `teleport.c:1070–1142` / `spell.c` `known_spell` 2363–2375 / `spelleffects` SPE_TELEPORT_AWAY atme / `spelleffects_check` `check_capacity`; hunger/STR/uen then capacity TIME; `castit` `spe_Fresh` !Confusion → `spelleffects(TRUE)` return before `tele`/`morehungry(100)`; else debit `5*oc_level`; `#teleport` doextcmd still named |
| D-1224 | fixed | `dotele` LEVEL_TELEP `y_n` + `level_tele_trap` | map-driven; C `teleport.c:1046–1053`/`1538–1571` / `trap.c` `trapeffect_level_telep` 2093–2095; seen LEVEL_TELEP `y_n` then `level_tele_trap(FORCETRAP)` return 1; decline `trap=0`; VIASITTING\|FORCETRAP trigger+intentional; Antimagic wrench unless intentional; In_endgame wrench always; deltrap+`level_tele`; Hallu/TC briefly feel else You_feel disoriented; !TC `make_confused` after port; energy-spellcast D-1225; `#teleport` doextcmd still named |

| D-1222 | fixed | do.c `revive_corpse` `Soundeffect` se_scratching | map-driven; C `do.c:2230` `Soundeffect(se_scratching, 50)` before nearby buried `You_hear`; contest `sndprocs.h` empty macro (`!SND_LIB_INTEGRATED`); extracted `se_scratching=145`; other Soundeffect sites / unique pname `corpse_xname` still named |
| D-1221 | fixed | display.c `show_glyph` `gbuf_show_kind` Hallu reroll | review **181** Must-fix of D-1219; C `display.c:2011–2028` classifies the already-chosen glyph (`glyph_is_monster` / `glyph_to_cmap`); JS called `mon_glyph`/`obj_glyph` on every `show_glyph_cell` (Off/`in_docrt` too); occupancy+tty classifier; seed0383 PASS; mention_map addr kept; integer glyph IDs / await-`newsym` More when On still named |
| D-1220 | fixed | do.c `revive_corpse` BURIED `!is_zomb` FALLTHROUGH `impossible` | map-driven; C `do.c:2236–2240` FALLTHROUGH from buried non-zomb into default `impossible("revive_corpse: lost corpse @ %d", where)`; JS had commented omit + silent `break`; zomb pit/claw/`fill_pit` unchanged (D-1202); Soundeffect se_scratching still named |
| D-1219 | fixed | display.c `show_glyph` `show_glyph_change` / `mention_map` | map-driven; C `display.c:2011–2070` `a11y.glyph_updates` + furniture/unexplored predicate + `pline_xy` firstmatch; `optlist.h:427–428` `&a11y.glyph_updates` Off; `docrt` `in_docrt`; doset/`OPTIONS=` no longer `flags.mention_map`; default Off public unprefixed; Hallu classifier D-1221; integer glyph IDs / `in_getlev` / await-`newsym` More when On / `spot_monsters`/`mon_movement` addr still named |
| D-1218 | fixed | options.c `opt_accessiblemsg` `a11y.accessiblemsg` | map-driven; C `optlist.h:140–142` `&a11y.accessiblemsg` Off; `options.c` `optfn_boolean` `*(addr)=!negated` + `:5428–5430` in-game `msg_loc` zero; doset/`OPTIONS=` no longer `flags.accessiblemsg`; colon true/yes/on/1; default Off public unprefixed; `spot_monsters`/`mon_movement` addr still named; glyph_updates D-1219 |
| D-1217 | fixed | cmd.c `dolookaround` / `#lookaround` | map-driven; C `cmd.c:1195–1368` floodfill/seen/`lookaround_known_room` + scan GLOC_INTERESTING/`pline_xy`; extcmd IFBURIED+GENERALCMD no AUTOCOMPLETE; `getpos.c:482–503` GLOC_VALID FALLTHROUGH; `allmain.c:845–848` glyph_updates then-arm; default Off; corridor-goes-to / glyph_at table / GFILTER_AREA / aA cycle; `opt_accessiblemsg` D-1218 |
| D-1216 | fixed | pline.c `set_msg_dir`/`pline_dir` | map-driven; C `pline.c:82–89` `dirtocoord` then +=ux,uy; `pline_dir` 113–123 then vpline; `cmd.c:3858–3865` invalid dir no-op; live mention_walls "It's %s." + dobuzz `xytodir(-dx,-dy)` hits you; remaining `pline_mon` / run>=2 boulder `pline_dir` / `opt_accessiblemsg` wire / `msg_mon_movement` still named |
| D-1215 | fixed | pline.c `pline_xy`/`pline_mon` | map-driven; C `pline.c:126–150` set_msg_xy then vpline; youmonst→(0,0) not ux,uy (`isok` rejects prefix); live wield/zap/drop/pickup/`mb_trapped`; `set_msg_xy` lives in `display.js`; remaining callers / `set_msg_dir`/`pline_dir` / `opt_accessiblemsg` wire / `msg_mon_movement` still named |
| D-1214 | fixed | hack.c `disturb_buried_zombies` | map-driven; C `hack.c:1798–1813` buried CORPSE 3×3 `peek_timer(ZOMBIFY_MON)>0` then `max(1,t*2/3)`; rumble `moverock`; tread `!Lev&&!Fly&&!Stealth&&cwt>=WT_ELF/2`; `wake_nearto_core`; grounded `MMOVE_MOVED`; `timeout.c` `peek_timer` absolute; `impact_disturbs_zombies` / local wake clones / hideunder after tread still named |
| D-1213 | fixed | dig.c `rot_corpse` invent/minvent worn plines | map-driven; C `dig.c:2146–2189` invent verbose Your + owornmask `remove_worn_item(TRUE)`/`stop_occupation`; minvent wielded `setmnotwielded`; migrating `owornmask=0`; invent extract splice + `update_inventory`; hideunder expose / contents bury / unique CXN_NO_PFX / artifact_light still named |
| D-1212 | fixed | do.c `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED | map-driven; C `do.c:2183–2215` MINVENT drop/appear + CONTAINED pack/floor/minvent sack; `do_name.c:1142–1148` `Adjmonnam`; `mondata.c:1380–1392` `locomotion` pack verb; `zap.c` `get_obj_location` CONTAINED_TOO\|BURIED_TOO + `get_container_location`; snapshot where/mcarry/container before `revive`; `obfree` `OBJ_FREE` import; BURIED !is_zomb FALLTHROUGH D-1220; Soundeffect se_scratching still named |
| D-1211 | fixed | mhitm.c `mdamagem` `gz.zombify` around `monkilled` | map-driven; C `mhitm.c:1083–1089` `!mwep && zombie_maker(magr)` + AT_TUCH/CLAW/BITE + `zombie_form(mdef) != NON_PM` then `monkilled` then reset; xkilled setter D-1210; `start_corpse_timeout` `rn1(15,5)` D-1202; **troll_baned D-1223**; gulpmm swap / passivemm shock / uhitm troll_baned still named; MINVENT+CONTAINED D-1212 |
| D-1210 | fixed | mon.c `zombie_maker` + xkilled `gz.zombify` | map-driven; C `mon.c:362–379` `zombie_maker` (S_ZOMBIE except ghoul/skeleton, S_LICH, !mcan) + `xkilled` `:3619–3624` `gz.zombify` around `make_corpse` (`!thrownobj && !stoned && !uwep` + youmonst maker + victim `zombie_form`); `start_corpse_timeout` `rn1(15,5)` arm live since D-1202; mhitm monkilled setter D-1211; `disturb_buried_zombies` still named; MINVENT+CONTAINED D-1212 |
| D-1209 | fixed | `dotelecmd` m-prefix mode menu | map-driven; C `teleport.c:917–1031` / `spell.c` `tport_spell` 1707–1757 / `cmd.c` `C('t')` CMD_M_PREFIX; non-wizard `dotele(FALSE)`; wizard save H/E; `!menu_requested` ignore; else PICK_ONE n/s/t/w (`w` preselected) + hide/add; ESC ECMD_OK; restore H/E + reverse op; rhack keeps `menu_requested` for ^T; LEVEL_TELEP yn / energy-spellcast / `#teleport` doextcmd still named |
| D-1208 | fixed | `dotele` trap-at-feet teledest | map-driven; C `teleport.c:1041–1161`; `t_at` tseen TELEP_TRAP jump; trap_once vault yn/deltrap then `vault_tele`; `isok(teledest)` `teleds` no displace/settrack; else travelcc+`tele`; `!trap` morehungry; LEVEL_TELEP yn / energy-spellcast / dotelecmd m-prefix still named |
| D-1207 | fixed | `vpline` accessiblemsg consume | map-driven; C `pline.c:162–189`; always snapshot+reset `a11y.msg_loc`; On+`isok` prefix `coord_desc: ` (NONE→COMFULL); unit `directionname`; Norep consumes before suppress; `pline_xy`/`set_msg_dir`/`opt_accessiblemsg` wire / `dolookaround` still named |
| D-1206 | fixed | `scrolltele` steed `whobuf` `mon_nam` | map-driven; C `teleport.c:877–882`; `Strcpy` "you"; `u.usteed` `Sprintf(eos, " and %s", mon_nam)` not `y_monnam`; named SUPPRESS_SADDLE; usteed skips do_it "it"; unconscious still fall-through D-1205; dotele trap-at-feet / dotelecmd m-prefix still named |
| D-1205 | fixed | `scrolltele` unconscious controlled fail | map-driven; C `teleport.c:874–876` / `trap.c` `unconscious` 6776–6786; `multi<0` and (`usleep` or wake-msg prefixes); pline then fall through `learnscroll`+`safe_teleds` (no getpos); wizard still fails; Stunned skips the outer if; steed whobuf D-1206 |
| D-1204 | fixed | eat.c `eatspecial` SCR_MAIL + `uwepgone` artifact_light | map-driven; C `eat.c:2432–2447` MAIL_STRUCTURES junk-mail before scare/YUM; `wield.c:873–885` `artifact_light` `end_burn` + Tobjnam shine + `update_inventory`; gone-trio + `o_unleash` inventory; lesshungry choke/fullwarn / setuwep begin_burn still named |
| D-1203 | fixed | wizcmds.c `wiz_level_change` drain | map-driven; C `wizcmds.c:444–487` `#levelchange` + `exper.c:214–217` `#levelchange` nulls drainer (skip `resists_drli`, never fatal) then `losexp` loop + `u.ulevelmax=u.ulevel`; raise already D-0061; ESC/empty Never_mind; `makemap_prepost` / Upolyd mh / level-1 `done(DIED)` still named |
| D-1202 | fixed | timeout.c REVIVE_MON / ZOMBIFY_MON | map-driven; C `do.c:2251–2315` `revive_mon`/`zombify_mon` (table `timeout.c:1982–1983`); `mon.c:386–413` `zombie_form`; `timeout.c:2404–2409` `obj_has_timer`; `mkobj.c:1425–1428` `gz.zombify` `rn1(15,5)`; displacer `rloc(RLOC_NOMSG)`; rider `rn2(99)` retry / `ROT_CORPSE` `d(5,50)`; buried pit in `revive_corpse`; xkilled `gz.zombify` D-1210; mhitm monkilled setter D-1211; MINVENT+CONTAINED D-1212; BURIED !is_zomb FALLTHROUGH D-1220; Soundeffect se_scratching still named |
| D-1201 | fixed | artifact.c `init_artifacts` | map-driven; C `artifact.c:109–116` memset artiexist/artidisco + `hack_artifacts` `:85–106`; `allmain.c:792` after `init_dungeons` before `u_init_misc`; gift-role align / Excalibur `!Knight` `role=NON_PM` / `questarti` align+role; JS rebuilds artilist from raw; save/rest `restore_artifacts` named |
| D-1200 | fixed | allmain.c `newgame` `notice_mon_off` | map-driven; C `allmain.c:771` off at entry + `:844–848` on+`notice_all_mons(TRUE)` after welcome; D-1142 callees; default `spot_monsters` Off; `dolookaround` / `reset_glyphmap` / vision_recalc caller / mapping / wizcmds / save still named; `init_artifacts` D-1201 |
| D-1199 | fixed | `mon_arrive` After_you `my=xyflags` before rloc | map-driven; C `dog.c:607–613` + losedogs `:390–401`; copy `mtrack[0].y` into `my` (`mx` stays 0) then `mnearto`/`rloc(RLOC_NOMSG)`; xyloc switch RANDOM zeros locale; D-1182 reader + D-1198 bit 2 now live; kops/EXACT_XY Before_you/failed_arrivals/wander/leftovers/Wiz_arrive/mnearto yank named |
| D-1198 | fixed | `migrate_to_level` `In_W_tower` xyflags bit 2 | map-driven; C `dog.c:913–915`; `xyflags = depth-up` then `In_W_tower(mx,my,&u.uz)` `|=2`; pre-relmon coords vs current `u.uz` not dest; `rloc_pos_ok` my&2 D-1182; `mon_arrive` my=xyflags D-1199 |
| D-1197 | fixed | `scrolltele` W-tower/amulet `y_n("Override?")` | map-driven; C `teleport.c:865–870` after make_blinded; `uhave.amulet \|\| On_W_tower_level` then `!rn2(3)` You_feel; `!wizard \|\| y_n != 'y'` return (no learnscroll); wizard ynchars def n; unconscious / steed whobuf still named |
| D-1196 | fixed | `rloc_to_core` dest-msg `set_msg_xy` | map-driven; C `teleport.c:1708` after dest-msg gate before dest plines; `a11y.msg_loc` dest; silent/same-cell/`in_mklev`/unspotted skip; `accessiblemsg` pline consume still named |
| D-1195 | fixed | `rloc_to_core` wand `makeknown` | map-driven; C `teleport.c:1727–1731` after delivered dest msg; `current_wand` WAN_TELEPORTATION → `makeknown` (WIS `rn2(19)` if new); Null/other/RLOC_NOMSG/no-msg skip; dest-msg `set_msg_xy` D-1196 |
| D-1194 | fixed | do.c `goto_level` `notice_mon_off` | map-driven; C `do.c:1839` off before docrt + `:1971–1972` on+`notice_all_mons(TRUE)` after uz0; D-1142 callees; default `spot_monsters` Off; `reset_glyphmap` / vision_recalc caller still named; newgame wrap D-1200 |
| D-1193 | fixed | dokick.c `deliver_obj_to_mon` | map-driven; C `dokick.c:1853–1906` / `makemon.c:1469–1470` DF_NONE after invent; MIGR_TO_SPECIES + DELIVER_PM match; orc `christen_orc`/`free_oname`; dog leftovers / `mksobj_migr_to_species` / stolen_booty still named |
| D-1192 | fixed | allmain.c `newgame` wizkit `obj_delivery(FALSE)` | map-driven; C `allmain.c:826–829` after skills before legacy; `files.c` `read_wizkit`/`wizkit_addinv` VFS `WIZKIT=`; overflow WITH_HERO\|NOBREAK\|NOSCATTER then FALSE; `deliver_obj_to_mon` D-1193; getenv / `wish_history` / `init_artifacts` still named; newgame `notice_mon_off` D-1200 |
| D-1191 | fixed | do.c `goto_level` `run_timers` | map-driven; C `do.c:1818–1823` after losedogs+obj_delivery+kill_genocided before `u_collide_m`; callee `timeout.c` 2222–2241 (JS `mkobj.js` D-0405/D-1037); expire dest+delivered timers; invent/migrating stay live (`obj_is_local` false); `notice_mon_off` / cmd.c wiz-level-change / REVIVE/ZOMBIFY still named |
| D-1190 | fixed | do.c `goto_level` `kill_genocided_monsters` | map-driven; C `do.c:1817` after losedogs before run_timers/`u_collide_m`; callee `mon.c` 5639–5677 (D-1097); migrating G_GENOD mons + `kill_eggs` on invent/fobj/migrating/buried; `run_timers` D-1191; `notice_mon_off` / cmd.c wiz-level-change / cham `newcham` still named |
| D-1189 | fixed | `cmd.c` rhack `visctrl` Unknown command | human canary seed8243; C `cmd.c:3833–3834` / `hacklib.c` `visctrl` 469–493; `Unknown command '%s'` via `visctrl(key)` so Ctrl-C is `^C` not raw ETX; `dokeylist.js` `visctrl` already existed; `custompline(SUPPRESS_HISTORY)` / `cmdq_clear` CQ_REPEAT / `sanity_no_check` still named |
| D-1188 | fixed | `teleport.c` `domagicportal` | human canary seed8243; C `teleport.c:1444–1488` / `trap.c` `trapeffect_magic_portal` 2710–2722; activate pline; tutorial leave ATSTAIRS+`Resuming regular play.`; else PORTAL+stunmsg+`make_stunned`; `dotrap` `!undestroyable_trap` skip of escape `rn2(5)`; `mktrap` dst←`ucamefrom`; `goto_level` reset uz0; hero `level_tele_trap` / `UTOTYPE_RMPORTAL` still named |
| D-1187 | fixed | `hack.c` `avoid_trap_andor_region` ParanoidTrap | human canary seed8243; C `hack.c:2515–2581` / `domove_core:2825–2828`; default `PARANOID_TRAP` yn `"Really step into that magic portal?"` via `paranoid_query(ParanoidConfirm)` + `into_vs_onto` + `immune_to_trap` hero MAGIC_PORTAL NOT_IMMUNE; m-prefix skip unless run; silent TEST_MOVE subset; hero `domagicportal` / full test_move Passes_walls·squeeze still named |
| D-1186 | fixed | `cmd.c` `g`/`G` PREFIXCMD rush/run | human canary seed8243; C `cmd.c` `do_rush`/`do_run` 1588–1617 + rhack PREFIXCMD/`DOMOVE_RUSH`; `g` run=2 `G` run=3 `DOMOVE_RUSH` ECMD_OK; following walk keeps run (`set_move_cmd` sees attempting) + firsttime multi/mv; capital/Ctrl after prefix lack CMD_gGF; nested F+g/G / rhack inner parse still named |
| D-1185 | fixed | `doddoremarm` `A` empty-worn | human canary seed8243; C `do_wear.c:3022–3034`; no weapons/accessories/`wearing_armor` → You are not wearing anything ECMD_OK; chargen `\e[72C` was truncated capture (local C H2344 `\e[40C` already matched JS; do not revert D-0078); `ggetobj`/`menu_remarm`/`take_off` when worn still named |
| D-1184 | fixed | `scrolltele` `!Blinded` `make_blinded(0,FALSE)` | map-driven; C `teleport.c:861–863` after noteleport return before amulet/W-tower; `Blinded` ≡ `HBlinded && !BBlinded` (not Blindfold); skip when Blinded so timeout/FROMFORM is not cured; Eyes leftover TIMEOUT cleared; W-tower Override yn still named |
| D-1183 | fixed | `rloc_to_core` ustuck-together You() | map-driven; C `teleport.c:1710–1711` first post-msg arm; `mtmp==ustuck && !u_at(ux0,uy0)` → `You("and %s teleport together.")` else-if telemsg; swallow dest≠origin; grab far already unstuck; wand `makeknown` / `set_msg_xy` still named |
| D-1182 | fixed | `rloc_pos_ok` mx==0 updest/dndest | map-driven; C `teleport.c:1592–1615`; migrating `!mx` `my` flags bit0 up / bit1 W-tower; `dndest.nlx`+`On_W_tower_level` dest-in-exclude XOR `my&2`; else updest.lx / dndest.lx arrival minus nlx; on-map room lock unchanged; `migrate_to_level` bit 2 D-1198; `mon_arrive` my=xyflags D-1199 |
| D-1181 | fixed | `rloc` RLOC_ERR `impossible()` | map-driven; C `teleport.c:1884–1888` / `pline.c` `impossible`; no-backup + `RLOC_ERR` → urgent `"rloc(): couldn't relocate monster"` then disorder/report then FALSE; silent FALSE without the bit; paniclog/recursive panic/debug_fuzzer/sysopt.support/CRASHREPORT named |
| D-1180 | fixed | `rloc_to_core` telemsg vanishes-and-reappears | map-driven; C `teleport.c:1712–1719` after dest; spotted+couldsee dest → `"%s vanishes and reappears%s."` next/close-by/closer/farther; same-cell return before msg; ustuck-together / wand discovery / `set_msg_xy` still named |
| D-1179 | fixed | do.c `goto_level` `do_fall_dmg` | map-driven; C `do.c:1805–1809` falling + `:1988–1994` `d(max(dist,1),6)` Maybe_Half_Phys after `!new` shop repair before pickup; dist from pre-uz `depth`; losehp noreturn skips pickup; Punished `ballfall` / W-tower rndspot bit 2 still named |
| D-1178 | fixed | do.c `goto_level` `fix_shop_damage` | map-driven; C `do.c:1985–1986` `!new` after in_out_region; callee `shk.c` 4849–4874 / `repair_damage` catchup (post-block messages only); litter `rn2(9)` still runs; `shk_fixes_damage` / allmain / bones / `do_fall_dmg` still named |
| D-1177 | fixed | do.c `goto_level` `obj_delivery` | map-driven; C `dokick.c:1769–1851` / `do.c:1815` FALSE + `:1978` TRUE; XOR WITH_HERO; OBJ_MIGRATING extract; `deliver_obj_to_mon` / wizkit FALSE / `do_fall_dmg` still named |
| D-1176 | fixed | dothrow `mhurtle_step` `m_in_out_region` | map-driven; C `dothrow.c:1000` `will_hurtle && m_in_out_region` before place; callee `region.c` 533–576 three-loop attach_2_m skip + can_enter/leave then leave/enter; gas NO_CALLBACK never rejects; walk already called it; `place_monster` vs rloc / steed / petrify / minliquid / NODIAG still named |
| D-1175 | fixed | allmain youmonst `m_everyturn_effect` fog at `u.ux` | map-driven; C `allmain.c:481` after bot before `context.move`; callee `monmove.c` 658–674 `is_u?u.ux:mx`; Fog `!closed_door && !visible_region_at` size-1 dmg 0; await create; not ux0 trail (D-1167); udemigod / `amulet()` / `glibr` / `do_storms` / `mkot_trap_warn` still named |
| D-1174 | fixed | `mdisplacem` `update_monster_region` after both places | map-driven; C `mhitm.c:246–257` / `region.c` 598–611; swap then defender worm tail then update both; not rloc before-tail (D-1161); `should_displace` / dogmove caller / dbridge still named |
| D-1173 | fixed | `mnexto` `control_mon_tele` savemm | map-driven; C `mon.c:3974–3978` / `control_mon_tele` 1898–1934; after enexto, `iflags.mon_telecontrol` (not wizard at caller, not mx!=0) `control_mon_tele(..., FALSE)` then restore savemm; via_rloc FALSE uses goodpos; default Off; OPTIONS= doset / vanish-msg / RLOC_ERR still named |
| D-1172 | fixed | `rloc` steed `tele()` then TRUE | map-driven; C `teleport.c:1808–1811`; `rloc(usteed)` calls `tele()`/`scrolltele` and returns TRUE even if tele does not move (noteleport); before iswiz stair (D-1122); vanish-msg, RLOC_ERR still named; mnexto telecontrol D-1173 |
| D-1171 | fixed | `rloc_pos_ok` shk/priest room | map-driven; C `teleport.c:1620–1626`; on-map isshk+inhishop dest `levl.roomno` vs ESHK.shoproom unsigned char else-if ispriest+inhistemple vs EPRI.shroom; not in_rooms; then tele_jump_ok; mx==0 updest/dndest still named; rloc candy may still goodpos-fallback |
| D-1170 | fixed | `rloc_to` occupation `dochugw` | map-driven; C `teleport.c:1761–1763` / `monmove.c` dochugw; `go.occupation` → `dochugw(mtmp, FALSE)` after bill before mintrap; no dochug, only newly-spotted threat stop; `rloc_to_flag` after appear; onscary / makemon occupation still named |
| D-1169 | fixed | `run_regions` hero `inside_f` bit | map-driven; C `region.c:439–441` `f_indx != NO_CALLBACK && hero_inside` then `inside_gas_cloud(reg, Null)`; not `inside_region(u.ux,u.uy)`; monster list unchanged; `region_danger`/`region_safety` still geometric |
| D-1168 | fixed | allmain `moveloop` EOT fumaroles | map-driven; C `allmain.c:374–377` after wipe/udemigod before multi<0; `Is_waterlevel\|\|Is_airlevel` `movebubbles` else `flags.fumaroles` `await fumaroles`; callee D-1156; goto_level twin already wired; udemigod `intervene` / `glibr` / `do_storms` / `amulet()` / `mkot_trap_warn` / `m_everyturn` youmonst still named |
| D-1167 | fixed | hack.c youmonst `m_postmove_effect` | map-driven; C `hack.c:2877` after occupy before steed; callee `monmove.c` 672–683 `is_u?u.ux0:mx`; Hezrou 1×8 / Steam `!mcan` 1×0 at trail cell; helper awaited; `allmain` `m_everyturn` youmonst / moveloop fumaroles still named |
| D-1166 | fixed | do.c `goto_level` `in_out_region` | map-driven; C `do.c:1980–1981` after obj_delivery before pickup; `(void)` — do not abort level change; callee `region.c` 480–527; gas NO_CALLBACK never rejects; restored REG_HERO_INSIDE from landing cell; `obj_delivery` D-1177; `fix_shop_damage`/`do_fall_dmg` / `run_regions` bit still named |
| D-1165 | fixed | dothrow `hurtle_step` `in_out_region` | map-driven; C `dothrow.c:787–790` after isok before `*range==0`; callee `region.c` 480–527; gas NO_CALLBACK never rejects; REG_HERO_INSIDE even on later bump; do.c `goto_level` D-1166 |
| D-1164 | fixed | `rloc_to` trapped `mintrap` | map-driven; C `teleport.c:1766–1767` / `trap.c` mintrap; `mtrapped && !wormno` after dest (after appear when `rloc_to_flag`); dest no trap clears mtrapped; dest trap already-trapped `rn2(40)` not fresh step-on; occupation `dochugw` still named |
| D-1163 | fixed | `rloc_to` minvent shop bill `stolen_value` | map-driven; C `teleport.c:1748–1758` / `shk.c` find_objowner/onshopbill/stolen_value; dest `!costly_spot` clear no_charge else bill; shop-to-shop sticks; trapped `mintrap` D-1164; occupation `dochugw` still named |
| D-1162 | fixed | `rloc_to` resident shk `make_angry_shk` | map-driven; C `teleport.c:1739` / `shk.c` 1470–1488; snapshot `inhishop` before pickup; dest `!inhishop` → angry+`hot_pursuit`; `rloc_to_flag` appear then angry; minvent bill D-1163; occupation `dochugw` / trapped `mintrap` still named |
| D-1161 | fixed | `rloc_to` `update_monster_region` after place | map-driven; C `teleport.c:1685` / `region.c` 598–611; absolute membership from mx/my before worm tail; no enter/leave callbacks (`m_in_out_region` is walk); mhitm displace / dbridge / vanish-msg / shk-home still named |
| D-1160 | fixed | `rloc_to` `set_apparxy` after dest newsym | map-driven; C `teleport.c:1702` / `steed.c` `place_monster` mx/my only; drop mux=hero stand-in; Invis/Displaced re-orient; vanish-msg, shk-home still named |
| D-1159 | fixed | mfndpos `m_poisongas_ok` vamp/eel/breath | map-driven; C `mon.c:330–357`; vampshifter / eel\|waterlevel+pool / AT_BREA AD_DRST\|RBRE / immune Hezrou\|Vrock → OK; resists → MINOR (mfndpos still avoids); Resists_Elem worn/artifact still named; region.js keeps a local clone |
| D-1158 | fixed | `create_gas_cloud_selection` / Cloud room | map-driven; C `region.c:1311–1336` 1×1 bitmap not BFS/`rn1` ttl; `sp_lev.c` `lspo_gas_cloud` 4928–4965; themerms Cloud asleep fog + `des.gas_cloud({selection})`; Ice/Boulder/… fill, `run_regions` geometry, mfndpos `m_poisongas_ok` D-1159 |
| D-1157 | fixed | `domove` walk `in_out_region` | map-driven; C `hack.c:2866–2868` after `drag_ball` before occupy; callee `region.c` 480–527; gas NO_CALLBACK never rejects; REG_HERO_INSIDE; `is_hero_inside_gas_cloud` now the bit; dothrow hurtle / do.c goto_level / `run_regions` geometry still named |
| D-1156 | fixed | `fumaroles` `clear_heros_fault` / Norep whoosh | map-driven; C `mkmaze.c:1484–1514` / `region.h` `clear_heros_fault`; after lava `create_gas_cloud` set REG_NOT_HEROS (undo player-made `set_heros_fault`); `snd`/`loud` `distu<15`; `!Deaf` Norep whoosh / loud whoosh; goto_level already awaited; allmain moveloop caller / selection create / walk `in_out_region` still named |
| D-1155 | fixed | `expire_gas_cloud` dissipation plines | map-driven; C `region.c:1046–1087` / `run_regions` 419–473; thick `arg>=5` half+ttl=2; thin Blind/uswallow/`u_at` within / `cansee` seen; around-you + You_see a\|some; `xray_range<=1` suppress; fumaroles whoosh D-1156; `create_gas_cloud_selection` / geometric bit still named |
| D-1154 | fixed | `mkmaze.c` `inv_pos` / VIBRATING_SQUARE | map-driven; C `pick_vibrasquare_location` 1042–1093 / `makemaz` 1214–1216 / `sp_lev.c` `create_trap` VS 1818–1821 / `hellfill.lua` 437–441 / `mklev.c` `occupied` invocation_pos; `svi.inv_pos` then `maketrap(VS)`; no-upstairs short-circuit; `makemaz("")` create_maze caller / `Can_dig_down` !Invocation_lev still named |
| D-1153 | fixed | `vault_tele` `tele()` fallback | map-driven; C `teleport.c:772–783`; no vault / somexyspace fail / teleok fail → `tele()`/`scrolltele`/`safe_teleds`; success still `teleds(TELEDS_TELEPORT)`; dotele trap-at-feet teledest still named |
| D-1152 | fixed | `rloc_to` `maybe_unhide_at` dest | map-driven; C `teleport.c:1700` / `mon.c` `maybe_unhide_at` 4698–4719; after ustuck before newsym; hiders/eels unhide when dest has no cover / not pool; `can_hide_under_obj` coins; hero youmonst path, vanish-msg, `set_apparxy`, `update_monster_region` still named |
| D-1151 | fixed | `switch_terrain` `classify_terrain` | map-driven; C `hack.c:3131–3214` lastseentyp remaps into `iflags.terrain_typ`; Underwater≡uinwater; arboreal STONE; ROOM/CORR xFLOOR/xGROUND; door open/shut; DRAWBRIDGE_UP `db_under_typ`; Medusa sea / Juiblex swamp; WATER→xWATERWALL; botl iff terrainstatus && !run; option bag `flags.terrainstatus`; botl `terrain_descr[]` / options toggle / end_running MAX_TYPE / `spoteffects` callers still named |
| D-1150 | fixed | `domove` walk `invocation_message` | map-driven; C `hack.c:2964–2973` after `vision_recalc(1)` when ux0!=ux\|\|uy0!=uy; callee D-1141; Invocation_lev && inv_pos && !On_stairs; nomul You_feel `uvibrated` candelabrum; `mkmaze.c` `inv_pos` placement still named |
| D-1149 | fixed | `mongone` `mdrop_special_objs` then discard | map-driven Must-fix; C `mon.c:3275–3282`; clog victim Bell/Book/Candelabrum/Rider/quest arti drop before discard; unstuck when grabbing; `isgd`/`grddead`, `m_detach` wiz/shk/worm/MON_DETACH, worn `extract_from_minvent`, mongrantswish clone still named |
| D-1148 | fixed | `deal_with_overcrowding` limbo / elemental_clog | map-driven; C `mon.c:3986–3995` / `m_into_limbo` 3833–3840 / `migrate_mon` 3843–3861 / `elemental_clog` 3878–3949; minliquid failed survivor `rloc` + `mnexto` failed-enexto; endgame `You_feel("besieged.")` + victim `mongone`/`rloc_to` else prior-plane migrate; victim specials D-1149; steed Fly/Lev, `engulfing_u`, `mdrop_obj` worn/saddle still named |
| D-1147 | fixed | do_name `rndcolor` chest_trap gas | map-driven; C `do_name.c:1468–1477` / `decl.c` `c_obj_colors` / `trap.c:6474–6476` `blindgas[]`; always `rn2(CLR_MAX)` even Hallu; Hallu → `hcolor(NULL)` display-rng; else `k==NO_COLOR` `"colorless"` not `"transparent"`; Blind `ROLL_FROM(blindgas)` skips `rndcolor`; sit/apply/pray/detect/do/wield/read `hcolor` stubs still named |
| D-1146 | fixed | `inside_gas_cloud` damage | map-driven; C `region.c:1091–1165` / `run_regions` 439–456 / `mon.c` `m_poisongas_ok`; dam>0 hero sting/blind/losehp or cough; mon cough/angry/blind/`rnd+5` killed\|monkilled; size-1 `m_poisongas_ok` gate; await `run_regions`; expire dissipation / fumaroles / geometric bit / mfndpos subset still named |
| D-1145 | fixed | Excalibur `:441` `update_inventory` | map-driven; C `fountain.c:441` after gift/deny before `set_levltyp` ROOM; both arms; Excalibur return still skips `:552` (C); default perm_invent Off tty no-op (D-1126 callee); artidisco save/rest / On WIN_INVEN / `consume_obj_charge` still named |
| D-1144 | fixed | `djinni_from_bottle` `mongrantswish` | map-driven; C `potion.c:2815–2868` makemon + BUC `rn2(5)` remap + wish/`tamedog`/peace/vanish/hostile; MAGIC_LAMP `#rub` transform then call (apply.c:1816–1831); JS `mongrantswish` D-1136; dodrink smoky occupant / SetVoice / full `mongone` still named |
| D-1143 | fixed | `in_out_region` enter_msg / leave_msg | map-driven; C `region.c:505–506,519–520` `pline1` after clear/set; JS `await pline`; `teleok` async; `create_msg_region` #if 0 so live gas never sets msgs; force-field callbacks / hack.c/dothrow/`do.c` callers / geometric gas still named |
| D-1142 | fixed | `teleds` `notice_mon_off` / `notice_all_mons` | map-driven; C `teleport.c:540,570–571` / `flag.h` `notice_mon_off`/`on` / `hack.c` `notice_mon`/`notice_all_mons`; off before `vision_recalc`, on+`notice_all_mons(TRUE)` after invocation; distu sort You see/notice; default `spot_monsters` Off; goto_level wrap D-1194; newgame wrap D-1200; vision_recalc / seffect_magic_mapping / wizcmds / save / postmov / option wiring still named |
| D-1141 | fixed | `teleds` `invocation_message` | map-driven; C `teleport.c:569` / `hack.c` `invocation_message`/`invocation_pos`; after `spoteffects`; Invocation_lev && (x,y)==inv_pos && !On_stairs; nomul; You_feel vibration; `uvibrated`; candelabrum spe==7&&lamplit throb/glow; walk caller D-1150; `mkmaze.c` `inv_pos` still named |
| D-1140 | fixed | `teleds` vault_guard `uleftvault` | map-driven; C `teleport.c:454,553–566` / `vault.c` `uleftvault`; origin `vault_occupied`?`findgd`; dest `in_rooms(VAULT)` fake then restore before `spoteffects` (keep D-0639); gold+`um_dist` irate/`mpeaceful=0`; `!in_fcorridor` `gd_move`; hostile `gd_move` rloc/`gd_letknow`/`wallify` still named |
| D-1139 | fixed | `teleds` swallow `set_ustuck` + `docrt` | map-driven; C `teleport.c:487–504` / `mon.c` `set_ustuck`; snapshot uswallow; always `set_ustuck(Null)` (not `unstuck`); if swallowed Punished force `ball_active`/no-drag + `docrt` at origin; invocation / `notice_mon_*` still named |
| D-1138 | fixed | minliquid lava on_fire / xkilled / fire_damage_chain | map-driven; C `mon.c:1023–1060` / `trap.c:4550–4572` / `mondata.c:1411–1445` / `allmain.c:210–216`; `mon_moving` → `mondead` else `xkilled(XKILL_NOMSG)`; survivor `fire_damage_chain(minvent,FALSE,FALSE)` then `rloc(RLOC_MSG)`; steed Fly/Lev, overcrowding, engulfing_u still named |
| D-1137 | fixed | `make_gas_cloud` enveloped pline | map-driven; C `region.c:1197–1203` after `add_region`; `!in_mklev && !inside_cloud && is_hero_inside_gas_cloud` → You noxious/steam + `PLNMSG_ENVELOPED_IN_GAS`; `set_heros_fault` player-made; `create_gas_cloud` async; `m_poisongas_ok` / inside_f damage / fumaroles `clear_heros_fault` still named |
| D-1136 | fixed | `mongrantswish` `tmp_at` glyph hide | map-driven; C `potion.c:2794–2811` `glyph_at` then `mongone` then `tmp_at(DISP_ALWAYS)`/`tmp_at(mx,my)` around `makewish` + `DISP_END`; JS gbuf `disp_*` copy not `mon_glyph`; full `mongone` / `djinni_from_bottle` still named |
| D-1135 | fixed | do_name `hcolor` Hallu drinksink synonyms | map-driven; C `do_name.c:1460–1466` `hcolors[]` SIZE 74; Hallu\|\|NULL → `rn2_on_display_rng(SIZE)` only (pref not last; no gameover skip); drinksink case 4 Blind short-circuit; sit/apply/pray/detect/do/wield/read stubs + `rndcolor` still named |
| D-1134 | fixed | `dipfountain` after-switch `update_inventory` | map-driven; C `fountain.c:552` after switch before `dryup`; unconditional (not drink case 24 `buc_changed`); rust-gate/Levitation/Excalibur returns skip this site; default perm_invent Off tty no-op (D-1126 callee); Excalibur `:441` D-1145; On WIN_INVEN / `consume_obj_charge` still named |
| D-1133 | fixed | `tele_trap` teledest / else `tele()` | map-driven; C `teleport.c:1506–1532`; lift `next_to_u` sibling of once; `isok(teledest)` `settrack`+`enexto`/`rloc_to` then `teleds`; else `tele()`/`scrolltele`; dest-trap `in_tele_trap`; vault_tele fallback D-1153; dotele trap-at-feet teledest still named |
| D-1132 | fixed | `teleds` TT_BURIEDBALL `buried_ball_to_punishment` | map-driven; C `teleport.c:456–459` / `dig.c` `buried_ball_to_punishment` 1934–1955; before ball_active; extract+`punish` reuse+`reset_utrap(FALSE)`; type-only gate (not `u.utrap`); trapmove/unearth_objs/digactualhole/`level_tele`/`domagicportal` still named |
| D-1131 | fixed | `teleds` `hideunder` / mimic | map-driven; C `teleport.c:493–496` / `mon.c` `hideunder` 4726–4801; after reset_utrap before drag_ball; youmonst `u.uundetected`+newsym; S_MIMIC `m_ap_type=M_AP_NOTHING` not seemimic; `is_pool`/`is_lava`/`couldsee`; can_hide_under_obj / cockatrice / swallow docrt still named |
| D-1130 | fixed | `teleds` `update_player_regions` | map-driven; C `teleport.c:529` / `region.c` `update_player_regions` 582–592; after placebc before newsym; absolute REG_HERO_INSIDE from dest; attach_2_u always clear; not in_out_region enter/leave; geometric `is_hero_inside_gas_cloud` / walk `in_out_region` still named |
| D-1129 | fixed | `teleds` `switch_terrain` dest-typ | map-driven; C `teleport.c:551–552` / `hack.c` `switch_terrain` 3178–3217; dest typ≠origin after vision+materialize; obstructed/closed-door/waterwall/lavawall BLev/BFly FROMOUTSIDE skip float_down; unblock float_up/float_vs_flight; classify_terrain D-1151; other callers still named |
| D-1128 | fixed | `potion.c` dodip pool yn | map-driven; C `potion.c:2335–2361` / `fountain.c` `wash_hands`/`floating_above` / `steed.c` `rider_cant_reach` / `trap.c` `water_damage`; `is_pool` not `IS_POOL`; `can_reach_floor(FALSE)` gate; `waterbody_name` yn; Levitation youprop; hands/uarmg wash; else water_damage + POT_ACID in_use/useup; pot_acid_damage boom+delobj / drink_ok_extra / potion_dip still named |
| D-1127 | fixed | `eat.c` `vomit` cantvomit/Sick/acid poly | map-driven; C `eat.c:3736–3784` / `mondata.c` `cantvomit` 663–673 / `zap.c` `ubreatheu`+`zhitu` ZT_ACID; jaw-gape; SICK_VOMITABLE `make_sick(0)`; FAINTING dry-heave vs spewed; AT_BREA AD_ACID; altar_wrath; acidic melt_ice; acid_damage/erode bodies + timeout vomiting_dialog still named |

| D-1126 | fixed | drinkfountain case 24 `update_inventory` | map-driven; C `fountain.c:332–333` / `invent.c` `update_inventory` 2781–2809 / `display.c` `suppress_map_output`; `if (buc_changed)` then in_moveloop/`suppress_map_output`/suppress_price=0 around tty `sync_perminvent`; default perm_invent Off no `display_inventory`; On WIN_INVEN named; dipfountain 441 D-1145 / 552 D-1134 |
| D-1125 | fixed | dowatersnakes Hallucination `rndmonnam` | map-driven; C `fountain.c:45–46` / `do_name.c` `rndmonnam`; `!Blind` Hallucination `makeplural(rndmonnam(NULL))` else `"snakes"`; display-rng only on hallu arm |
| D-1124 | fixed | drinksink case 13 `create_gas_cloud` | map-driven; C `fountain.c:696–698` / `region.c` `create_gas_cloud`; size-1 poison `arg=4` + ttl `rn1(3,4)`; no expand shuffle; enveloped/`inside_f`/`hcolor` still named |
| D-1123 | fixed | `rloc_to` worm / ustuck-swallow `docrt` | map-driven; C `teleport.c:1675–1697` / `worm.c` `remove_worm`; worm pickup+tail re-place; swallow `u_on_newpos`/`check_special_room`/`docrt`; grab `!m_next2u` `unstuck`; shk-home/`maybe_unhide_at` still named |
| D-1122 | fixed | `rloc` Wizard stair / `control_mon_tele` | map-driven; C `teleport.c:1813–1841` / `control_mon_tele` 1898–1934 / `dungeon.c` `In_W_tower`; iswiz on-map `goodpos` stairs/ladders before 50× rnd; wizard-mode getpos; steed/`mnexto` still named |
| D-1121 | fixed | `teleds` `fill_pit` after `u_on_newpos` | map-driven; C `teleport.c:526` / `trap.c` `fill_pit`; vacated pit/hole+boulder settles; JS helper still thin extract+deltrap+delobj vs C `flooreffects("settle")`; Punished ball not this iter |
| D-1120 | fixed | `tele_trap` Antimagic wrenching pline | map-driven; C `teleport.c:1502–1505`; In_endgame\|\|Antimagic\|\|noteleport You_feel + Antimagic shieldeff; youprop uprops confer; once deltrap after next_to_u; teledest/tele still named |
| D-1119 | fixed | teleok `tele_jump_ok` / `in_out_region` | map-driven; C `teleport.c:440–443` / `region.c:480–527`; `teleok` after `goodpos` runs `tele_jump_ok(u.ux,u.uy,x,y)` then `in_out_region`; gas NO_CALLBACK never rejects; enter_msg / walk `in_out_region` still named |
| D-1118 | fixed | drinksink case 10 `polyself` | map-driven; C `fountain.c:680–686`; `!Unchanging` metamorphosis + `polyself(POLY_NOFLAGS)`; Unchanging skips You+call; youprop H\|\|E flats+uprops; case 13 `create_gas_cloud` still named |
| D-1117 | fixed | `gush` `minliquid` when `m_at` | map-driven; C `fountain.c:157–160` / `mon.c` `minliquid_core` 993–1109; iron rust `!rn2(5)` `d(2,6)`; drown `xkilled` vs `mondied`; `set_levltyp` / steed / lava xkilled / overcrowding still named |
| D-1116 | fixed | `drinkfountain` case 19 MAGIC enlightenment | map-driven; C `fountain.c:287–293` / `insight.c` `enlightenment(MAGICENLIGHTENMENT,0)`; not `doattributes` BASIC ^X; Status+Attributes+elapsed; bones/debug still BASIC-gated; potion/zap/artifact callers still named |
| D-1115 | fixed | `dipfountain` case 29 `mkgold` coins | map-driven; C `fountain.c:530–546`; looted skip; else `SET_FOUNTAIN_LOOTED` + `rnd((num_dunlevs-dlevel+1)*2)+5` merge/create; Blind-skip glistening; `exercise(A_WIS,TRUE)`/`newsym`; `update_inventory` still named |
| D-1114 | fixed | `dipfountain` cases 17–20 uncurse | map-driven; C `fountain.c:464–475`; `!is_hands && cursed` Blind-skip glow + `uncurse`; else loss; coins not skipped; luck/lamplit stay on mkobj `uncurse`; case 29 `mkgold` still named |
| D-1113 | fixed | `dipsink` + dodip sink yn | map-driven; C `fountain.c:716–801` / `do.c` `polymorph_sink` / `potion.c` dodip yn; lottery `breaksink`; hands `wash_hands`; potion pour+switch; local poly `rn2(4)`; pool dip / uncurse 17–20 still named |
| D-1112 | fixed | `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP | map-driven; C `teleport.c:2033–2095`; endgame amulet/`is_home_elemental`/`rn2(7)` stay; LEVEL_TELEP `random_teleport_level`+`get_level`; NO_TRAP `onscary(0,0)` stay else same-level migrate; `is_xport`&&!`control_teleport` mconf; valley/botlevel-avoid/hero still named |
| D-1111 | fixed | `teleok` vibrating / pit-fly | map-driven; C `teleport.c:422–433`; VS always ok; pit/hole iff Levitation\|\|Flying (youprop + steed flyer; sticky `u.Lev`/`u.Fly` ignored); `tele_jump_ok`/`in_out_region` still named |
| D-1110 | fixed | `goodpos` live-mon `onscary` when `m_id != 0` | map-driven; C `teleport.c:168–169` ternary + `monmove.c` `onscary`; vampshifter altar; Elbereth needs hero/image/`guardobjects`; `is_lminion`/`inhishop`/`inhistemple`; fakemon still `goodpos_onscary`; mfndpos `mon.js` partial named |
| D-1109 | fixed | `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` | map-driven; C `sp_lev.c:5496–5531`; type map TELE/UPTELE/DOWNTELE/MONGEN; `get_location(ANY_LOC\|NO_LOC_WARN)`; prepend list; `free_exclusions` on clear; `flip_level` remaps rects; soko2-2 / hellfill prefab / save/rest still named |
| D-1108 | fixed | `wash_hands` + dipfountain hands/uarmg | map-driven; C `fountain.c:557–577`/`448–449`; You-wash; Glib `make_glib(0)` + slippery `fingers_or_gloves`; `water_damage(uarmg)`; was_glib+ER_NOTHING→ER_GREASED so `!rn2(2)` skip; dipsink / pool dip still named |
| D-1107 | fixed | `dipfountain` Excalibur LONG_SWORD body | map-driven; C `fountain.c:404–447`; `exist_artifact`+`artiname`; lawful `oname`/`discover_artifact`/`bless`; unaligned curse+`spe--`; ROOM+town `angry_guards` not `dryup`; `wash_hands` still named |
| D-1106 | fixed | `dryup` cansee cloud-glyph skip of dryup pline | map-driven; C `fountain.c:223–227`; skip iff `glyph_is_cmap(glyph_at)` && `glyph_to_cmap==S_cloud`; poison still plines; shown mon/I `!cmap`; Excalibur still named |
| D-1105 | fixed | `watchman_warn_fountain` Deaf shake/wave | map-driven; C `fountain.c:183–193`; `nolimbs` shakes HEAD else waves `makeplural(ARM)` + `mhis`; !Deaf yell unchanged; cloud-glyph D-1106 |
| D-1104 | fixed | `dryup` `angry_guards(FALSE)` after real dryup | map-driven; C `fountain.c:236–237` after ROOM/`newsym`; `isyou && in_town`; not town-warn return / wizard `'n'`; Deaf shake D-1105; cloud-glyph still named |
| D-1103 | fixed | `db_under_typ` / `waterbody_name` SURFACE_AT | map-driven; C `dbridge.c:116–128` + `rm.h` SURFACE_AT + `pager.c` waterbody_name; pickup `describe_decor`; hideunder macros / display glyphs still named |
| D-1102 | fixed | `goodpos_onscary` Elbereth / scare / altar-vamp | map-driven; C `teleport.c:49–76` + `engrave.c` `sengr_at` strict; altar `S_VAMPIRE` not vampshifter; scare before Inhell; HEADSTONE/future time skip; live-mon `onscary` still named |
| D-1101 | fixed | `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone(LR_MONGEN)` | map-driven; C `teleport.c:180–182` / `mkmaze.c` `is_exclusion_zone`; after boulder; TELE/UPTELE/DOWNTELE do not reject mongen; wallwalk/pool/lava skip; live-mon `onscary` still named |
| D-1100 | fixed | `goodpos` `passes_walls` + `may_passwall` early-out | map-driven; C `teleport.c:163–164` / `hack.c` `may_passwall`; form `M1_WALLWALK` not youprop Passes_walls; STWALL+W_NONPASSWALL blocks; `is_exclusion_zone` later D-1101 |
| D-1099 | fixed | `goodpos` youmonst swim/lev/fly/wwalk pool+lava | map-driven; C `teleport.c:136–161` + `youprop.h`; confer uprops for Fly/Wwalk/Fire/Amphibious; lava Fire+Wwalk+oerodeproof / Upolyd likes_lava; `passes_walls` later D-1100 |
| D-1098 | fixed | `seffects` SCR_GENOCIDE / `do_class_genocide` | map-driven; C `read.c` seffect_genocide/`do_class_genocide` + `mondata.c` `name_to_monclass`; Confusion ≡ HConfusion; livelog / Hallu / POLY_REVERT / cham `newcham` / `update_inventory` still named |
| D-1097 | fixed | `kill_eggs` after genocide | map-driven; C `mon.c:5607–5677`; `kill_egg`/`dead_species(..., TRUE)`; invent array + nobj lists; TIN/CORPSE `#if 0` not ported; cham `newcham` / goto_level caller still named |
| D-1096 | fixed | `dryup` wizard `y_n("Dry up fountain?")` | map-driven; C `fountain.c:216–219` after town warn; `flags.debug`; `'n'` abort; no `debug_fuzzer` gate; `angry_guards` later D-1104; cloud-glyph / Deaf shake still named |
| D-1095 | fixed | `split_mon` trap rust / minliquid / uhitm AD_COLD | map-driven; C `trap.c:1652–1720` / `mon.c:987–992` / `uhitm.c:6078–6082`; `healmon` monster arm; drown/mhitu/mhitm/cmd still named |
| D-1094 | fixed | makemon MS_NEMESIS mitem `ptr.msound` | map-driven; C `role.c:2049–2056` overlay + `makemon.c:1378`; not `urole.neminum`; Tourist Master of Thieves; PM_NINJA weap still named |
| D-1093 | fixed | dogmove pal/target numeric `ptr.msound` | map-driven; C `dogmove.c` find_friends/score_targ/dog_move; MS_LEADER=36 / GUARDIAN=38 not string `'MS_LEADER'`; perceives/conf/faith still named |
| D-1092 | fixed | makemon S_ORC/S_UNICORN mlet peace | map-driven; C `makemon.c:1335–1342`; elf `Race_if` orcs hostile; `is_unicorn` co-align always peaceful (pony skip); 5.0 no S_ELF mlet; dprince/raven/emin still named |
| D-1091 | fixed | `goodpos` `is_pool()`/`is_lava()` not typ macros | map-driven; C `teleport.c:134–175`; UP+`DB_LAVA` lava arm not swimmer; dropped JS-only `!mtmp` else; youmonst swim/lev/fly still named |

| D-1090 | fixed | `is_pool`/`is_moat` DRAWBRIDGE_UP+`DB_MOAT` | map-driven; C `dbridge.c:46–58`/`100–113`; juiblex skip; `DB_MOAT=0`; shared `hack.js`; mfndpos/dig/zap clones deleted; `goodpos` later D-1091 |
| D-1089 | fixed | sit `rndcurse` `Antimagic()` via `uprops[ANTIMAGIC]` | review **48** Must-fix; C `youprop.h:55–57`; confer cloak-of-MR / gray DSM extrinsic not `EAntimagic`; `shieldeff` + reduced `rnd` count; Half_spell_damage clone named |
| D-1088 | fixed | makemon `m_initweap` priest/guardian `ptr.msound` | map-driven; C `makemon.c:263–327`/`721–727` + `quest_mon_represents_role`; MS_PRIEST=41 / MS_GUARDIAN=38; PM_NINJA weap + MS_NEMESIS mitem still named |
| D-1087 | fixed | sit `rndcurse` Antimagic `shieldeff` | map-driven; C `sit.c:581–583` / `display.c:1109–1124`; sparkle opt_out On; SHIELD_COUNT 21 `shield_static`; ASCII S_ss1..4; other callers + update_inventory/hcolor named |
| D-1086 | fixed | steal `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` | map-driven; C `steal.c:213–290`; W_ARMOR → do_wear `*_off`; leftover `setnotworn` pointer-walk; unchain → `unpunish`; W_WEAPONS `*gone`; Amulet/Ring/Blindf still setworn |
| D-1085 | fixed | engrave `Flying()` via `uprops[FLYING]` | review **43** Must-fix; C `youprop.h:247–255`; confer writes amulet extrinsic not `EFlying`; worn `AMULET_OF_FLYING` skips `check_pit`; other Flying clones named |
| D-1084 | fixed | sit `throne_sit_effect` wizard getlin 1..13 | map-driven; C `sit.c:48–61`; `wizard && !debug_fuzzer` after `rnd(13)`; ESC Never_mind return; atoi 1..13 override; 0/empty keep rnd; Analyze y_n not this iter |
| D-1083 | fixed | engrave `can_reach_floor(check_pit)` teeter/shaft | map-driven; C `engrave.c:209–211` / `trap.c` helpers; seen pit precipice / hole FALSE; in-pit/unseen/Flying still TRUE; invent/pickup `trap&&is_pit` callers + `cant_reach_floor` named |
| D-1082 | fixed | engrave `can_reach_floor` ceiling_hider / Flying\|\|MZ_HUGE | map-driven; C `engrave.c:203–207` / `mondata.h` / `youprop.h` Flying; lurker undetected FALSE before huge; trapper still reaches; check_pit D-1083 |
| D-1081 | fixed | eat `cprefx` rider `revive_corpse` after lifesave | map-driven; C `eat.c:831–849` / `do.c:2111–2246`; tin skip; `zero_victual`; floor rider suffixes; MINVENT/CONTAINED + Adjmonnam D-1212; BURIED !is_zomb FALLTHROUGH D-1220; Soundeffect se_scratching still named |
| D-1080 | fixed | shk `u_entered_shop` deserted/angry/Invis/doorway | map-driven; C `shk.c:723–917`; empty_shops latch; carrying walks `game.invent`; SetVoice/Soundeffect/Hallu named |
| D-1079 | fixed | makemon `peace_minded`/`set_malign` `ptr.msound` | map-driven; C `makemon.c:2268–2366`; MS_LEADER −20 before always_peaceful; GUARDIAN/NEMESIS peace; `m_initweap` still mndx |
| D-1078 | fixed | sit `split_mon` monster `clone_mon` | map-driven; C `potion.c:2899–2912` / `makemon.c:837–943`; sit local else no longer `return null`; trap rust/minliquid/uhitm AD_COLD later D-1095 |
| D-1077 | fixed | `is_lava` DRAWBRIDGE_UP+`DB_LAVA` | map-driven; C `dbridge.c:62–74`; shared `hack.js`; mfndpos uses it; `is_pool`/`is_moat` later D-1090 |
| D-1076 | fixed | trap hero `trapeffect_pit`/`trapeffect_hole` VIASITTING | map-driven; C `trap.c:1835–2025`; `set_utrap(rn1(6,2), TT_PIT)`; spikes/`poisoned`; hole `Can_fall_thru`; `check_in_air` youprop Lev/Fly; Punished `ballfall` still omit |
| D-1075 | fixed | sit `dosit` `lay_an_egg` after throne | map-driven; C `sit.c:357–396`/`559–560`; male/hunger/tetra/Sargasso `ECMD_OK`; spawn vs lay; `egg_type_from_parent` in `mon.js`; not having-fun |
| D-1074 | fixed | sit `dosit` dragon `money_cnt` meager hoard | map-driven; C `sit.c:443–446` / `hack.c` first COIN_CLASS quan; `"meager "` iff `obj.quan + money_cnt(invent) < ulevel * 1000`; not a sum |
| D-1073 | fixed | sit `dosit` OBJ_AT picnic skip `uteetering`/`uescaped_shaft` | map-driven; C `sit.c:437–439` / `trap.c`; helpers exported from `trap.js`; in-pit still picnics; `can_reach_floor(check_pit)` still named |
| D-1072 | fixed | sit `dosit` ustuck `!sticks` lap `Monnam`/`mhis` | map-driven; C `sit.c:422–429`; engrave `sticks` export not `monmove.js`; eel no-lap; hugs still air |
| D-1071 | fixed | engrave `can_reach_floor` ustuck AT_HUGS + `!sticks` | map-driven; C `engrave.c:192–197` / `mondata.c` `sticks`; sit-on-air reachable; eel WRAP still reaches; lap D-1072 |
| D-1070 | fixed | engrave/sit `can_reach_floor` Levitation `youprop.h` | review 30 QUALITY-RISK; C `(H||E)&&!B` not sticky `u.Levitation`; worn boots/potion `#sit` tumble; hugs D-1071 |
| D-1069 | fixed | sit `dosit` `can_reach_floor(FALSE)` swallow/tumble/air | map-driven; C `sit.c:414–421` after hider; air/water Levitation may sit; helper hugs/ceiling_hider still named |
| D-1068 | fixed | sit `dosit` hider `u.uundetected` except trapper | map-driven; C `sit.c:410–412` after usteed, before `can_reach_floor`; trapper stays floor-hidden; no `newsym` |
| D-1067 | fixed | sit `dosit` steed `mon_nam(usteed)` | D-1033 risk 4; C `You`+`mon_nam` ARTICLE_THE, not `"your steed"` / not `y_monnam` |
| D-1066 | fixed | tut-1 `tutorial()` nhcore ENTER/LEAVE disable | map-driven; C `tutorial()` `l_nhcore_call` then both `nhcore_call_available` FALSE after leave; JS `goto_level` called `nhl_gamestate` directly |
| D-1065 | fixed | tut-1 `tut_key` / `nh.eckey` | map-driven; C `cmd_from_ecname`/`nhl_get_cmd_key` + Lua Ctrl-/Alt- rewrite; hardcoded `:`/`\\`/`#twoweapon`/`Ctrl-T` were not eckey |
| D-1064 | fixed | tut-1 `levregion_add` / `fixup_special` dest copy | map-driven; C `sp_lev.c` `des.teleport_region` `{9,3,9,3}`: `LR_TELE` both, exclude `-1` `del_islev`; `place_lregion` from `u_on_rndspot` not load |
| D-1063 | fixed | tut-1 `create_object` food apple/candy/lichen | map-driven; C `sp_lev.c` packed `des.object`: buc not-cursed=`uncurse`, corpse `montype` pmnames→`set_corpsenm`, CORPSE `spe`=CORPSTAT lflags |
| D-1062 | fixed | tut-1 `create_object` large-box contents | map-driven; C `sp_lev.c` packed box + nested random wand: `get_location_coord` DRY, `delete_contents` after mkbox_cnts, container_obj stack |
| D-1061 | fixed | tut-1 `l_create_stairway` packed stairs | map-driven; C `sp_lev.c` packed `des.stair` deltrap+SpLev_Map+`mkstairs` force ROOM before dungeon-end return |
| D-1060 | fixed | sit `dosit` Fire/Cold `uprops[]` | review 19 QUALITY-RISK; C `youprop.h` `uprops[FIRE_RES]`/`[COLD_RES]`; worn ring `d(2,10)` not H\|\|E flats |
| D-1059 | fixed | mklev tut-1 `mineralize` kelp | map-driven; C `water_has_kelp` `!Is_waterlevel` + `In_endgame` return before kelp; tut-1.lua has no `des.mineralize` |
| D-1058 | fixed | sit `dosit` lava/ice/DRAWBRIDGE_DOWN sit | map-driven; C `sit.c:539–555`; WWalking lava `likes_lava` vs `d(2\|10,10)`; trap TT_LAVA remains D-1039 |
| D-1057 | fixed | sit `dosit` sink/altar/grave/stairs/ladder sit_message | map-driven; C `sit.c:526–538`; altar calls `altar_wrath`; stairs/ladder literals not defsyms |
| D-1056 | fixed | sit `dosit` `Underwater` ≡ `u.uinwater` | D-1055 read unset `u.Underwater`; C `youprop.h:279` is `u.uinwater` |
| D-1055 | fixed | sit `dosit` water/pool/gremlin | after trap before sink; early pool/gremlin `in_water`; `split_mon`+`dryup`; C `water_damage(uarm)` twice |
| D-1054 | fixed | save/bones restore cobj `OBJ_CONTAINED` | D-1036 hatch `get_obj_location(0)` accepted restored box eggs tagged FLOOR/INVENT |
| D-1053 | fixed | sounds/data `cry_sound` `msounds[]` C `monflag.h` | D-1036 empty `msound` always-chitter; extractor SIZ sound + growl MS_* unified |
| D-1052 | fixed | apply/potion cursed-lamp `make_glib` Glib TIMEOUT | D-1023 `use_lamp` used `(u.Glib\|0)&TIMEOUT`; C `Glib` ≡ `uprops[GLIB].intrinsic`; remaining `(HGlib\|EGlib)&TIMEOUT` |
| D-1051 | fixed | apply `u_wipe_engr` + S_goodpos `tmp_at` | D-1022 no-ops; C `u_wipe_engr`→`wipe_engr_at`; pole/grapple/jump `tmp_at(DISP_BEAM,S_goodpos)` |
| D-1050 | fixed | pickup `pickup_object` telekinesis | D-1022 voided flag; C whip TRUE silent encumbrance refuse + remote corpse/scare `raise`; grapple FALSE ynq |
| D-1049 | fixed | sit `take_gold` `remove_worn_item` | D-1034 spliced invent + `delobj` only; C `remove_worn_item(otmp, FALSE)` then `delobj` (quiver gold → `uqwepgone`) |
| D-1048 | fixed | sit/read Vlad case 10 `HConfusion` only | D-1033 also wrote flat `u.Confusion`; C `Confusion` ≡ `HConfusion`; `seffect_remove_curse` reads intrinsic |
| D-1047 | fixed | invent/shk `consume_obj_charge` unpaid | D-1023 locals were `spe--` only; C `check_unpaid` → `cost_per_charge` debit + verbalize before `spe--` |
| D-1046 | fixed | apply `light_cocktail` `struct obj **` | D-1023 took obj by value; C writes `*optr` after snuff-merge/`addinv` and split/`hold_another_object` |
| D-1045 | fixed | apply/objnam/do_name/polyself whip names | D-1022 clones: `the(xname)` / `highc(mon_nam)` / hero `body_part`; C `yname`/`Amonnam`/`mbodypart` |
| D-1044 | fixed | dothrow `special_obj_hits_leader` `urole.questarti` | D-1041 used `u.questarti`; C `is_quest_artifact` reads `gu.urole.questarti` |
| D-1043 | fixed | dothrow `should_mulch_missile` hero `rnl(4)` | D-1041 blessed hero save used `rn2(4)`; C `dothrow.c` uses luck-biased `rnl(4)` |
| D-1042 | fixed | worn `find_mac` minvent ARM_BONUS | D-1041 tmp used stub base `data.ac`; C walks worn `ARM_BONUS` / guarding −2 + `AC_MAX` |
| D-1041 | fixed | dothrow `thitmonst` weapon hit-vs-miss | D-1022 always-`tmiss` for WEAPON/weptool/GEM; C tmp+dieroll `hmon`/`tmiss` + APPLIED wakeup |
| D-1040 | fixed | apply pole `glyph_at` targeting | D-1022 `glyph_is_poleable_at` used live `m_at`/`sobj_at`; C `glyph_at` + skip tame only if monster glyph |
| D-1039 | fixed | sit `dosit` trap-before-throne | D-1033 skipped `else if (trap)`; JS ran throne RNG on a trapped cell; already-trapped sit + `dotrap` `VIASITTING` |
| D-1038 | fixed | lock `getdir` C envelope + dothrow `hurtle` | D-1022 clones (`getdir_whip`/`hurtle_apply` teleds) were C-wrong; shared getdir + hurtle_step, no trailing confdir |
| D-1037 | fixed | timeout `save_timers` RANGE_LEVEL + HATCH_EGG dispatch | C peels local timers on savelev; JS kept firing off-level floor eggs; hatch_egg now dispatched |
| D-1036 | fixed | timeout `hatch_egg`/`learn_egg_type` + `cry_sound` | C timer callback; body D-1036; dispatch D-1037 via save_timers peel |
| D-1035 | fixed | `nhl_gamestate` memcpy u/disco/mvitals/spl_book + `init_uhunger` | C backup/restore + memset spells + ATEMP; JS invent-only; memcpy skips gi worn ptrs |
| D-1034 | fixed | sit ordinary `throne_sit_effect` 1–13 | C rnd(13) switch; JS dropped; take_gold + do_genocide REALLY+ONTHRONE |
| D-1033 | fixed | sit `special_throne_effect` | C Vlad throne 1–13; JS omitted IS_THRONE; grease COIN skip + losexp/seffects wires |
| D-1032 | fixed | timeout/apply `fig_transform` | C attach rnd(9000)+200; JS dropped FIG_TRANSFORM; callback + BUC/carry/drop wires |
| D-1031 | fixed | apply/mkobj `hornoplenty` | C doapply HORN_OF_PLENTY; JS said unknown; rn2(13) potion/food + tip BoT/horn |
| D-1030 | fixed | apply `use_unicorn_horn` | C doapply UNICORN_HORN; JS said unknown; cursed rn2(13)/2 + TimedTrouble shuffle/cure |
| D-1029 | fixed | apply `use_figurine` | C doapply FIGURINE; JS said unknown; loc checks + make_familiar BUC 80-10-10 |
| D-1028 | fixed | apply `use_bell` | C doapply BELL/BELL_OF_OPENING; JS said unknown; ordinary/BofO + openit/findit/mkundead |
| D-1027 | fixed | apply `use_tinning_kit` | C doapply TINNING_KIT; JS said unknown; floorfood tin + homemade spe=-2 + rider revive |
| D-1026 | fixed | apply `use_grease` | C doapply CAN_OF_GREASE; JS said unknown; Glib/slip dropx + hands/object grease + inaccessible |
| D-1025 | fixed | apply `use_candle`/`use_candelabrum` | C doapply candle/candelabrum; JS said unknown; attach/split + light/snuff + age/=2 |
| D-1024 | fixed | apply `flip_through_book`/`flip_coin` | C doapply SPBOOK/COIN; JS said unknown; fade/BoT/blank + slip dropx |
| D-1023 | fixed | apply `use_lamp`/`light_cocktail`/`use_trap`/`bagotricks` | C doapply oil/trap/BoT; JS said unknown; begin_burn + occupation + spe-- |
| D-1022 | fixed | apply `use_whip`/`use_grapple`/`use_pole` + Snickersnee `is_pole` | C doapply dispatch; JS said unknown; wield+cmdq getdir/getpos |
| D-1021 | fixed | apply `use_royal_jelly` + dorub/doapply | C smear/egg hatch; JS said unknown; kill_egg + GETOBJ_PROMPT |
| D-1020 | fixed | `setnotworn` worn[] pointer-walk + leave-tutorial invent restore | C pointer-equal; JS was mask `setworn(null)`; `nhl_gamestate(true)` invent+rewear |
| D-1019 | fixed | `sellobj` BSS `sell_response` + C `robbed` precedence | C `'\0'` queries; JS defaulted `'a'` auto-sold; robbed `-= (offer<0)` then clear |
| D-1018 | fixed | `use_pick_axe` cmdq wield re-apply `doapply`+invlet | C queues EC+KEY; JS `{typ:'ec'}` uncallable; getobj_apply ignored KEY |
| D-1017 | fixed | `cancel_monst` self-cancel walks hero `invent` Array | C `gi.invent` nobj; JS treated Array as nobj head; ABON never ran |
| D-1016 | fixed | `shopdig(1)` snatch `um_dist` polarity + `setnotworn` | C close+bill; JS had De Morgan inverted; do.js setnotworn |
| D-1015 | fixed | tutorial `setnotworn` clears oc_oprop / EStealth | seed0009 Scr 72→73; suite 44/44 Scr 11405/11405 |
| D-1014 | fixed | apply `use_stone` + dorub/doapply graystone | map-driven; cadence 43/44 @#1285; green+cohort 16/17 (seed0009 pre-existing) |
| D-1013 | fixed | apply BLINDFOLD/LENSES Blindf_on/off + cursed_check export | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1012 | fixed | pray in_trouble collapsing…cursed_blindfold + all minors + stuck_ring/make_deaf/buried_ball helpers | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1011 | fixed | pray in_trouble majors Stoned…Region + make_sick/region_safety/rescued_from_terrain | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1010 | fixed | apply/detect `use_crystal_ball` + thin object/trap/furniture detect | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1009 | fixed | apply `use_towel` + weapon wet/dry_a_towel + burnarmor towel dry | map-driven; green+cohort 15/16 (seed0009 pre-existing); cadence 43/44 @#1280 |
| D-1008 | fixed | apply/steed `use_saddle` + can_saddle whirly/unsolid | map-driven; green+cohort 15/16 (seed0009 pre-existing; ride PASS) |
| D-1007 | fixed | apply whistle: use_whistle/magic_whistle + can_blow/vault_summon_gd/tele_to_rnd_pet | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1006 | fixed | mon_poly monster-defender + newcham null-mdat/mbirth_limit | map-driven; green+cohort 15/16 (seed0009 pre-existing; wandpoly PASS) |
| D-1005 | fixed | apply leash: use_leash/next_to_u/check_leash + m_unleash wires | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1004 | fixed | pray TROUBLE_LYCANTHROPE + peffect_water/vapor + mon_poly youmonst AD_POLY | map-driven; green+cohort 16/17 (seed0009 pre-existing); cadence 43/44 @#1275 |
| D-1003 | fixed | warnreveal + overexert_hp + Upolyd eel regen_hp | map-driven; green+allmain cohort 36/37 (seed0009 pre-existing) |
| D-1002 | fixed | allmain Teleportation/Polymorph/ulycn once-per-turn → tele/polyself/you_were | map-driven; green+allmain cohort 36/37 (seed0009 pre-existing) |
| D-1001 | fixed | ParanoidWerechange/Hit + `you_were`/`you_unwere` + mtimedone/wolfsbane | map-driven; green+combat/timeout cohort 11/12 (seed0009 pre-existing) |
| D-1000 | fixed | ParanoidPray Confirm + `see_nearby_monsters` allmain wire | map-driven; green+pray/allmain cohort 10/11 (seed0009 pre-existing) |
| D-0999 | fixed | ParanoidBreakwand getlin + `see_monster_closeup` camera/makedog | map-driven; green+startup/apply cohort 10/11 (seed0009 pre-existing) |
| D-0998 | fixed | `dopay` robbed/angry appease + debit/loan/credit | map-driven; green+shop cohort 11/12 (seed0009 pre-existing) |
| D-0997 | fixed | `animate_statue`/`activate_statue_trap` + Blind kick feel + break/search wire | map-driven; green+kick/search cohort 10/10 |
| D-0996 | fixed | `selftouch`/`mselftouch`/`minstapetrify` + `monstone`/`mon_to_stone`/`vamp_stone` + `xkilled` stoned | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-0995 | fixed | `instapetrify` + barefoot kick petrify + `bhit` DISP_FLASH | map-driven; green+kick/throw cohort 11/12 (seed0009 pre-existing); cadence 43/44 @#1265 |
| D-0994 | fixed | `sellobj`/`check_shop_obj`/`saleable`/`set_cost`/`contained_cost` + drop/throw wire | map-driven; green+shop/throw cohort 11/12 (seed0009 pre-existing) |
| D-0993 | fixed | globby `pudding_merge`/`obj_meld`/`obj_nexto_xy` + flooreffects/make_corpse | map-driven; green+drop/throw cohort 20/21 (seed0009 pre-existing) |
| D-0992 | fixed | `flooreffects` fire_damage/doaltarobj/hot-potion + dropx wire | map-driven; green+altar/throw cohort 20/21 (seed0009 pre-existing) |
| D-0991 | fixed | `costly_gold`/`donate_gold` + addtobill coin + kick out/refund | map-driven; green+shop/kick cohort 11/12 (seed0009 pre-existing) |
| D-0990 | fixed | `hits_bars`/`hit_bars` + bhit/throwit/launch_obj | map-driven; green+kick/throw cohort 7/8 (seed0009 pre-existing); cadence 43/44 @#1260 |
| D-0989 | fixed | Is_box kick + `container_impact_dmg`/`chest_trap`/`ghitm` + `make_angry_shk` | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0988 | fixed | `kick_object` + `bhit` KICKED_WEAPON flight/land | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0987 | fixed | `flooreffects` pool/lava/pit/shaft + boulder + drop/throw wire | map-driven; green+drop/throw cohort 20/21 (seed0009 pre-existing) |
| D-0986 | fixed | throne/`fall_through` + tree scatter + hero hole | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0985 | fixed | `kick_nondoor` SDOOR/furniture + altar_wrath/disturb_grave/sink_backs_up | map-driven; green+kick cohort 19/20 (seed0009 pre-existing); cadence 43/44 @#1255 |
| D-0984 | fixed | `ship_object`/`otransit_msg` + dropx/throwit/drop_throw | map-driven; green+throw/drop cohort 20/21 (seed0009 pre-existing) |
| D-0983 | fixed | shop `stolen_value` + revive/kick/dig/lock/`costly_alteration` | map-driven; green+dig/zap cohort 19/20 (seed0009 pre-existing) |
| D-0982 | fixed | montraits/omonst/ghost recorporealize + KEEPTRAITS/`wary_dog` | map-driven; green+zap cohort 19/20 (seed0009 pre-existing) |
| D-0981 | fixed | `openholdingtrap`/`openfallingtrap` + Punished/`boxlock_invent` + SPE_KNOCK `mhurtle`/saddle | map-driven; green+zap cohort 20/21 (seed0009 pre-existing) |
| D-0980 | fixed | `timeout.js` restore `objects_at` import for `slip_or_trip` | fortress; D-0978 drop → seed0014 throw; cadence 43/44 @#1250 |
| D-0979 | fixed | `release_hold` WAN_OPENING + `flash_hits_mon`/`light_hits_gremlin` WAN_LIGHT | map-driven; green+zap/apply cohort 34/35 (seed0009 pre-existing) |
| D-0978 | fixed | `ignite_items`/`catch_lit`/`begin_burn`/`burn_away_slime` + LS_OBJECT/BURN_OBJECT | map-driven; green+zap/trap cohort 25/26 (seed0009 pre-existing) |
| D-0977 | fixed | music passtune + `open_drawbridge`/`close_drawbridge` + Mastermind hints | map-driven; green+apply cohort 36/37 (seed0009 pre-existing) |
| D-0976 | fixed | `dosinkfall` + `spoteffects` sink+Lev + `ELevitation` mirror + `stop_donning` | map-driven; green+move/wear cohort 36/37 (seed0009 pre-existing) |
| D-0975 | fixed | lavawall `fix_wall_spines` + `burn_floor_objects` give_feedback + fire-trap wire | map-driven; green+zap/trap cohort 24/24; cadence 43/44 @#1245 (seed0009 pre-existing) |
| D-0974 | fixed | music flute/harp/horn + BUGLE `awaken_soldiers` + FIRE/FROST `ubuzz`/`zapyourself` | map-driven; green+apply cohort 35/36 (seed0009 pre-existing Scr FAIL) |
| D-0973 | fixed | `explode` AD_MAGM/DISN/DRST/ACID mon/hero + masks + `mon_explodes` MAGM..SPC2 | map-driven debt; green+zap cohort 24/24 |
| D-0972 | fixed | music `do_earthquake`/`do_pit` + `DRUM_OF_EARTHQUAKE` | map-driven; green+apply cohort 36/36 (seed0009 pre-existing Scr FAIL on HEAD) |
| D-0971 | fixed | `explode` AD_COLD/ELEC mon/hero + Cold/Shock mask + `mon_explodes` COLD/ELEC | map-driven debt; green+zap cohort 20/20 |
| D-0970 | fixed | `toggle_stealth` + ELVEN on/off + `EStealth` mirror | map-driven debt; green+wear cohort 20/20; cadence 44/44 @#1240 |
| D-0969 | fixed | `angrygods` 4–8 + `gods_angry`/`rndcurse` + cursed_book wire | map-driven; green+pray/spell cohort 20/20 |
| D-0968 | fixed | `explode` AD_FIRE mon/hero + `explosionmask` + `mon_explodes` AD_FIRE | map-driven debt; green+zap cohort 20/20 |
| D-0967 | fixed | `bury_objs`/`unearth_objs`/`obj_ice_effects` + melt/freeze/liquid_flow | map-driven debt; green+dig/zap cohort 16/16 |
| D-0966 | fixed | `Ring_on`/`learnring`/`adjust_attrib`/`float_down` + steed wire | map-driven debt; green+wear/steed cohort 20/20 |
| D-0965 | fixed | ice melt / `burn_floor_objects` / fireball + TIMER_LEVEL `MELT_ICE_AWAY` | map-driven debt; green+zap cohort 16/16; cadence 44/44 @#1235 |
| D-0964 | fixed | `revive` container/buried + `cant_revive`/`zombie_can_dig` + OBJ_BURIED extract | map-driven debt; green+zap cohort 16/16 |
| D-0963 | fixed | `desecrate_altar`/`god_zaps_you`/`fry_by_god` + dig altar wire | map-driven debt; green+dig/pray cohort 16/16 |
| D-0962 | fixed | `conjoined_pits`/`xytodir` + autodig quiet + `dighole` boulder-fill | map-driven debt; green+dig cohort 16/16 |
| D-0961 | fixed | `impact_drop`/`down_gate`/`drop_to`/`add_to_migration` dig hole fall | map-driven debt; green+dig cohort 16/16 |
| D-0960 | fixed | `mkcavearea`/`mkcavepos`/`rm_waslit` earth dig | map-driven debt; green+dig cohort 16/16; cadence 44/44 @#1230 |
| D-0959 | fixed | `destroy_drawbridge` + find/is_wall dig furniture/`dighole` | map-driven debt; green+dig cohort 16/16 |
| D-0958 | fixed | `shopdig` dig warn/`shopdig(1)` pack snatch | map-driven debt; green+dig cohort 16/16 |
| D-0957 | fixed | `dig_up_grave` + `dighole` IS_GRAVE → PIT + grave contents | map-driven debt; green+dig cohort 16/16 |
| D-0956 | fixed | `Ring_gone`/`float_up`/`rescham`/`choke`(strangle)/`set_mimic_blocking` in eataccessory | map-driven debt; green+eat cohort 17/17 |
| D-0955 | fixed | `unturn_dead`/`revive` invent+floor + `hero_breaks`/`breaks` + worn ABON `cancel_item` | map-driven debt; green+zap cohort 16/16 |
| D-0954 | fixed | dig `furniture_handled` fountain/sink + HOLE hero `goto_level` + mon migrate | map-driven debt; green+dig cohort 16/16 |
| D-0953 | fixed | floorfood pool/lava reach + `vault_gd_watching` + gd_move witness | map-driven debt; green+eat/vault cohort 14/14 |
| D-0952 | fixed | break-wand strike/cancel/poly/tele/undead `bhitm`/`bhitpile`/`zapyourself` + `WAN_LIGHT` litroom | map-driven debt; green+wizard cohort 14/14 |
| D-0951 | fixed | pickaxe `use_pick_axe`/`dig` occupation/`is_digging`/`dig_typ`/`holetime` | map-driven debt; green+cohort 12/12 + arch tour PASS |
| D-0950 | fixed | `dig_check`/`digactualhole`/`fillholetyp` + break-wand dig/create pay | map-driven debt; green+wizard/dig cohort 12/12 |
| D-0949 | fixed | `explode` `zap_over_floor`/`pay_for_damage` + `do_break_wand` explode-types | map-driven debt; green+wizard/zap cohort 12/12 |
| D-0948 | fixed | `zap_over_floor` door/bars shopdamage + `dobuzz` `pay_for_damage` | map-driven debt; green+zap/shop cohort 12/12 + shop extras |
| D-0947 | fixed | `kick_door` shop `add_damage`/`pay_for_damage` + town watch | map-driven debt; suite **44**/44 @#1215; green+kick cohort 12/12 |
| D-0946 | fixed | `eatspecial` PAPER/potion/ring/amulet + leash/trident/flint/uwepgone/unpunish | map-driven debt; green+eat cohort 12/12 |
| D-0945 | fixed | `cpostfx` were*/mimic/`attrcurse` + `set_ulycn`/`eatmdone` | map-driven debt; green+eat cohort 12/12 |
| D-0944 | fixed | `mconveys` + `corpse_intrinsic`/`givit` | map-driven debt; green+eat cohort 12/12 |
| D-0943 | fixed | `cpostfx` specials + AD_STUN/AD_HALU hallu | map-driven debt; green+eat cohort 12/12 |
| D-0942 | fixed | `pay_for_damage`/`getcad`/`hot_pursuit` + chew/zap/wakeup | map-driven debt; suite **44**/44 @#1210 |
| D-0941 | fixed | `still_chewing` shop `add_damage` + `watch_dig`/`angry_guards` | map-driven debt; green+cohort 12/12 |
| D-0940 | fixed | tin `costly_tin`/`use_tin_opener` + shop `costly_alteration` | map-driven debt; green+cohort 12/12 |
| D-0939 | fixed | `cprefx` + cannibal/stone/slime helpers | map-driven debt; green+cohort 12/12 |
| D-0938 | fixed | `b_trapped` + `make_stunned`; tin/door/chew/kick wires | map-driven debt; green+cohort 12/12 |
| D-0937 | fixed | metallivore floorfood beartrap/bars + `still_chewing`/`dissolve_bars` | map-driven debt; suite **44**/44 @#1205 |
| D-0936 | fixed | `is_edible` poly + `doeat_nonfood`/`eatspecial` + floor gold | map-driven debt; green+eat cohort PASS |
| D-0935 | fixed | `start_tin`/`opentin`/`consume_tin` + multi-turn rations | map-driven debt; green+eat cohort PASS |
| D-0934 | fixed | recorder `get_configfile` default (CONSTITUTION §1.2) | suite **44**/44 @#1200; seed2200 Scr **230**/230 |
| D-0933 | fixed | NHW_TEXT paint ≤cols−1 (`process_text_window`) | #1199; path closed by D-0934 |
| D-0932 | fixed | serialize leading bold spaces (topten) | #1198; seed0030 aC2_aJ0→0 |
| D-0931 | fixed | flush S_air spaces + mid-row space CUF >4 | #1197; seed0373 sp_C6_J8→0 |
| D-0930 | fixed | serialize space+attr0+CLR_GRAY → NO_COLOR | #1196; j37→0 |
| D-0929 | fixed | look_here-only `keep_message_leftover` (not all corner) | suite **42/44**; Scr **10979**; seed4500 Scr **1389** held |
| D-0928 | partial | #1194 ^X rank==role + eaten_stat; #1195 suite **43**/44 Scr **11404**/11405 | seed4500 Scr **1814**; LB gap → D-0930 |
| D-0927 | fixed | rhack F-prefix reject non-movement (no execute) | seed4500 **87803→88377** RNG **88484** Scr **808**; next D-0928 place |
| D-0926 | fixed | mhitm_ad_blnd mhitu (raven AT_CLAW) + make_blinded | seed4500 **87218→87803** RNG **88082** Scr **794**; next @87803 distfleeck |
| D-0925 | fixed | breamm/breamu + mattacku AT_BREA + dobuzz fire-pool | seed4500 **86672→87218** RNG **87347** Scr **759**; next @87218 distfleeck |
| D-0924 | fixed | splitobj no invent[] splice (D-0923 over-splice) | seed0002 PASS restored; suite **42/44** Scr **10349**; next was @86672 breamm |
| D-0923 | fixed | touchfood freeinv+addinv_nomerge (partly-eaten invent) | seed4500 **82793→86672** RNG **86798** Scr **759**; invent[] splice later undone D-0924 |
| D-0922 | fixed | wakeup was_sleeping → wake_nearto (growl radius) | seed4500 **82788→82793** RNG **86800** Scr **755**; next @82793 steal invent |
| D-0921 | fixed | makemaz load_special minetn-4 College Town | seed4500 **61698→82788** RNG **83013** Scr **747**; next @82788 distfleeck |
| D-0920 | fixed | pleased fix_worst_trouble TROUBLE_HIT rnd(5) | seed4500 **61689→61698** RNG **61837** Scr **654**; next @61698 nhlib shuffle |
| D-0919 | fixed | nh_timeout FAST TIMEOUT / Very_fast expiry | seed4500 **61462→61689** RNG **61766** Scr **643**; next @61689 fix_worst_trouble |
| D-0918 | fixed | goto_level drag_down/ballrelease via uball | seed4500 **55990→61462** RNG **61496** Scr **622**; next @61462 distfleeck |
| D-0917 | fixed | fill_ordinary_room nsubrooms before needfill | seed4500 **54329→55990** RNG **57748** Scr **613**; next @55990 drag_down |
| D-0916 | fixed | themerms Nesting nested + lspo_door rnddoor | seed4500 **52803→54329** RNG **54647** Scr **613**; next @54329 somex |
| D-0915 | fixed | goto_level Punished unplacebc/placebc | seed4500 **52643→52803** RNG **52925** Scr **611**; next @52803 themerms |
| D-0914 | fixed | mk_knox_portal place under wizard/debug | seed4500 **50844→52643** RNG **52967** Scr **608**; next @52643 distfleeck |
| D-0913 | fixed | cmd `x` → doswapweapon + setworn twoweap clear | seed4500 **50338→50844** RNG **50936** Scr **594**; next @50844 mkshop |
| D-0912 | fixed | #turn / doturn chant + exercise(A_WIS) | seed4500 **50290→50338** RNG **50401** Scr **594**; next @50338 distfleeck |
| D-0911 | fixed | extract ox/oy + rottenfood + HDeaf timeout | seed4500 **50111→50290** Scr **499→596** RNG **50469**; next @50290 exercise |
| D-0910 | fixed | allmain regen_pw once-per-turn rn1 | seed4500 **50054→50111** RNG **50220→50240**; next @50111 next_ident |
| D-0909 | fixed | Punished drag_ball/move_bc/nomul(-2) | seed4500 **50034→50054** RNG **50167→50220**; next @50054 regen_pw |
| D-0908 | fixed | SCR_PUNISHMENT punish/placebc | seed4500 **49915→50034** Scr **481→499**; next was mattacku→D-0909 |
| D-0907 | fixed | study_book set_occupation(learn) + makeknown | seed4500 **49776→49915** Scr **459→481**; next @49915 mkobj |
| D-0906 | fixed | hellfill + create_maze / LVLINIT_MAZE | seed4500 **32538→49776** Scr **459**; next @49776 mcalcmove |
| D-0905 | fixed | peace_minded PM_ERINYS !abuse | seed4500 **28249→32538** Scr **308**; next @32538 hellfill |
| D-0904 | fixed | level_tele find_hell past main | seed4500 **18153→28249** Scr **302**; next @28249 makemon |
| D-0903 | fixed | fill_zoo BEEHIVE queen/killer+jelly | seed4500 **14216→18153** Scr **302**; next @18153 splev_initlev |
| D-0902 | fixed | shkveg/mkveggy_at HEALTHY_TIN | seed4500 **9974→14216** Scr **294**; next @14216 fill_ordinary |
| D-0901 | fixed | themerms Pillars terr shuffle | seed4500 **8925→9974** Scr **284**; next @9974 shkveg |
| D-0900 | fixed | spitmm/spitmu + m_lined_up | seed4500 **8491→8925** Scr **264→284**; next @8925 nhlib shuffle |
| D-0899 | fixed | #jump dojump/jump + getpos_getvalid | seed4500 **2869→8491** Scr **19→264**; next @8491 next_ident |
| D-0898 | fixed | ini_inv_use_obj armor setworn | seed2600 Scr **37→38** **PASS**; suite **42/44** |
| D-0897 | fixed | BIND= parsebindings + rhack inventory | seed2600 Scr **35→37**; next Antimagic setworn |
| D-0896 | fixed | bigrm-9 load_special | seed2600 RNG **FULL 11647** Scr **23→35**; next BIND= |
| D-0895 | fixed | themerms Temple of the gods fill | seed2600 **395→2917** Scr **3→23**; next @2917 nhlib shuffle |
| D-0894 | fixed | dryup town warn + watchman_warn_fountain | seed0014 **PASS 714/714**; suite **41/44** |
| D-0893 | fixed | setgemprobs ledger_no gem oc_prob | seed0014 Scr **678→712**; @631 closed; next @712 watch |
| D-0892 | fixed | do_attack gu.unweapon begin-bashing | seed0014 Scr **676→678**; @624 closed; next @631 gem |
| D-0891 | fixed | maketrap HOLE unhideable_trap tseen | seed0014 Scr **645→676**; @600 closed; next @624 bash |
| D-0890 | fixed | launch_obj DISP_FLASH + pline dirty vision_recalc | seed0014 Scr **644→645**; @560 closed; next @600 `^` |
| D-0889 | fixed | hack domove_swap peaceful x_monnam adj | seed0014 Scr **641→644**; next @560 trap map |
| D-0888 | fixed | uhitm cream pie The(xname) + An(singular) | seed0014 Scr **640→641**; next @558 peaceful swap |
| D-0887 | fixed | could_seduce hitmm/missmm + mhitu hitmsg | seed0014 Scr **638→640**; next @505 cream pie The |
| D-0886 | fixed | rloc appear + dochug flee RLOC_MSG | seed0014 Scr **636→638**; next @457 SSEX |
| D-0885 | fixed | teleport rloc RLOC_MSG vanish | seed0014 Scr **635→636**; @424 More via D-0886 |
| D-0884 | fixed | steal worn_item_removal on→from + nymph She | seed0014 Scr **634→635**; @417 vanish D-0885 |
| D-0883 | fixed | do_wear armoroff delay-0 no find_ac | seed0014 Scr **633→634**; @415 AC botl |
| D-0882 | fixed | invent merged coin bknown=0 before ID reconcile | seed0007 **PASS** restored; D-0879 order bug |
| D-0881 | fixed | objnam/potion short_oname dip yn budget strip | seed0014 Scr **624→633**; next @415 take-off botl AC |
| D-0880 | fixed | getline yn_function show_topl hard-wrap cursor | seed0014 Scr **623→624**; next @388 post-rust dip xname |
| D-0879 | fixed | invent addinv merged known/bknown/rknown + compare pline | seed0014 Scr **621→623**; next @383 yn cursor |
| D-0878 | fixed | lock chest_shatter_msg Blind+singular + PAPER/GLASS/WOOD mats | seed0014 Scr **620→621**; next @212 compare-items |
| D-0877 | fixed | dipfountain bath case 28 + steal somegold | seed0014 RNG **FULL 59178**; Scr 620/714; case 29 deferred |
| D-0876 | fixed | monmove watch_on_duty + has_town/in_town | seed0014 **58462→59074**; mon_yells/dig deferred |
| D-0875 | fixed | makemaz load_special minetn-3 Alley Town | seed0014 **52043→58462**; wand shop + watch_on_duty next |
| D-0874 | fixed | trapeffect_landmine + blow_up_landmine (mon weight) | seed0014 **50259→52043**; scatter/fill_pit deferred |
| D-0873 | fixed | sp_lev create_monster female overwrite after makemon | seed0399 **PASS** Scr 531→532; dwarf lord |
| D-0872 | fixed | objnam xname unique !nn uses_known → known=0 | seed0399 Scr **530→531**; @300 a silver bell |
| D-0871 | fixed | muse MUSE_POT_SPEED mquaffmsg + mon_adjust give_msg | seed0399 Scr **525→530**; @113–117 More |
| D-0870 | fixed | adjattrib in_moveloop STR/CON encumber_msg | seed0399 Scr **522→525**; poison--More-- before weaker |
| D-0869 | fixed | attrib poisoned/poisontell mhitu AD_DRST | seed0399 RNG **FULL 11409**; Scr 502→522 |
| D-0868 | fixed | done Lifesaved makeknown→exercise + savelife | seed0399 **10729→11152**; Scr 442→502; medallion |
| D-0867 | fixed | thitmonst tmiss else + food-fail wakeup | seed0399 **10697→10729**; Scr 429→442; armor throw |
| D-0866 | fixed | trapeffect_web mon mtrapped + mu_maybe_destroy_web | seed0399 **10581→10697**; Scr 409→429 |
| D-0865 | fixed | may_dig wall_info\|flags + peaceful dig avoid | seed0399 **10382→10581**; Scr 409; maze W_NONDIGGABLE |
| D-0864 | fixed | obj_resists invocation items skip rn2 | seed0399 **10309→10382**; Scr 407→409; Bell no rn2 |
| D-0863 | fixed | hold_another_object encumber_msg after prinv | seed0399 **10269→10309**; Scr 392→407; More absorbs #wizintrinsic |
| D-0862 | fixed | makesingular+as_is / gold wish / SCR_MAIL | seed0399 **10217→10269**; Scr 156→392 |
| D-0861 | fixed | searches_for_item Is_container | seed0399 **10157→10217**; Scr 113→156; elf sack goal |
| D-0860 | fixed | monflee always mon_track_clear | C fidelity; seed0399 @10157 inert (unicorn !mflee) |
| D-0859 | fixed | unicorn noteleport_level for NOTONL/flee-tele | C fidelity; seed0399 @10157 unchanged (maze !noteleport) |
| D-0858 | fixed | doattributes Hallu + Antimagic attrs | seed0383 **PASS** 219/219; suite PASS→39 local |
| D-0857 | fixed | corner NHW_MENU dismiss docorner≠docrt | Scr 211→217; superseded @213 by D-0858 |
| D-0856 | partial | invent display_pickinv Hallu obj_to_glyph | Scr 209→211; i/ESC map OK; superseded @210 by D-0857 |
| D-0855 | partial | m_dowear_type nambuf Monnam/mon_nam | LCP 555 named: movemon I_SPECIAL m_dowear; Scr 201→209; @? open |
| D-0854 | rejected | LCP 555 = fleeck→monflee Monnam | Falsified; true caller = m_dowear_type (D-0855) |
| D-0853 | partial | dochug Hallu newsym NOTHING/DONE/NOMOVES | LCP 553→555; first cell miss 198→199; Scr still 201; @199 open |
| D-0852 | partial | seed0383 Hallu levtport / gulp DISP | #996 flush+vision_off Scr→201; #997 dochug Hallu newsym (D-0853); @199 open |
| D-0851 | fixed | goto_level no post-docrt vision_recalc(0) | C fidelity; seed0383 @195 Hallu still open; green+cohort OK |
| D-0850 | fixed | xkilled tame `x_monnam(...,"poor",...)` | seed0383 Scr 193→194; @178 poor titan; green+cohort OK |
| D-0849 | fixed | do_name `hliquid` Hallu liquids + display-rng | seed0383 Scr 184→193; @187 purified water; green+cohort OK |
| D-0848 | fixed | extract-objects `-DMAIL_STRUCTURES` / SCR_MAIL | NUM_OBJECTS 481; Hallu rn2(463); seed0383 Scr 174→184 |
| D-0847 | closed | seed0383 @172 Hallu see_objects dim 462≠463 | Cause = missing SCR_MAIL (D-0848); next miss @184 |
| D-0846 | fixed | rloc_to newsym(old+new) + covers_objects | @173 mons OK w/ flush; 4 objs; Scr 174 w/o flush |
| D-0845 | fixed | see_traps only when glyph_is_trap | C fidelity; @172 burn still open |
| D-0844 | fixed | map_object Hallu statue memory random_obj | C fidelity; @172 still −1 display burn |
| D-0843 | fixed | HI_METAL mcolors + swallow DEC o/s scoring | Scr 148→176; flush still @172 post-expel Hallu |
| D-0842 | fixed | DECgfx swallow S_sw_tc/ml/mr/bc | o/x/x/s+SO; flush still display-RNG @bat; Scr 148 |
| D-0841 | rejected | gulpmu flush_topl_more ≡ display_nhwindow | toplines 141–174 OK; cause revised in D-0842 (not hjkl) |
| D-0840 | fixed | mpickstuff distant_name + hitmsg again | seed0383 Scr 146→148; RNG FULL; green+cohort OK |
| D-0839 | fixed | initedog set_malign after tame | seed0383 RNG FULL 16915; Scr 146/219; green+cohort OK |
| D-0838 | fixed | unstuck docrt + docrt memory Hallu | seed0383 prefix 11524→13689; green+cohort OK |
| D-0837 | fixed | getmattk mspec_used + mhitm_ad_cold | seed0383 prefix 11400→11524; green+cohort OK |
| D-0836 | fixed | abuse_dog + yelp/growl + xkilled luck | seed0383 prefix 11372→11400 Scr 144; green+cohort OK |
| D-0835 | fixed | wiz_intrinsic + make_hallucinated | seed0383 prefix 10843→11372 Scr 142→144; green+cohort OK |
| D-0834 | fixed | fog vapor TTL refresh + m_in_out_region | seed0383 prefix 10646→10843; green+cohort OK |
| D-0833 | fixed | domove uswallow + attack_checks engulfing_u | seed0383 prefix 10608→10646; RNG matched +577; green+cohort OK |
| D-0832 | fixed | makemon m_dowear + check_gear + I_SPECIAL | seed0383 prefix 10374→10608; green+cohort OK |
| D-0831 | rejected | JS mcanmove/sleep/WAITMASK/I_SPECIAL @10374 | JS gnome clear+mov12; ustuck=vortex; closed by D-0832 |
| D-0830 | rejected | post-swallow mcalcmove/MSLOW/minliquid | same +12/ROOM; not @10374; next mcanmove/sleep C-state |
| D-0829 | rejected | makemon 165/108 fmon creation order | same spawn+mcalcmove; not @10374; C skips gnome dochug |
| D-0828 | fixed | mondead keep-on-fmon + dmonsfree | C m_detach/dmonsfree; seed0383 still @10374; green+cohort OK |
| D-0827 | fixed | mattacku uswallow-only-ustuck early-out | C arm ported; seed0383 still @10374; RNG matched 10724→10762 |
| D-0826 | fixed | postmov engulfing_u → u_on_newpos | C arm ported; seed0383 still @10374 (gnome fleeck); next gnome skip |
| D-0825 | fixed | mattacku AT_ENGL + gulpmu (+ engulfing_u dochug) | seed0383 prefix 10281→10374 Scr 141→142; next @10374 fleeck order |
| D-0824 | fixed | monmove could_reach_item + mfndpos may_passwall | seed0383 prefix 10024→10281; closed by D-0825 |
| D-0823 | fixed | dog_goal could_reach_item pool/lava/boulder | seed0383 prefix 9709→10024; closed by D-0824 |
| D-0822 | fixed | bigrm-12 load_special (hexagon pool/lava) | seed0383 prefix 2493→9709 Scr 45→141; suite Scr+96 RNG+7585; next @9709 closed by D-0823 |
| D-0821 | fixed | Attributes Displaced + known speed-boots from_what | seed0360 **PASS** 833/833; suite 38/44; next seed0383 |
| D-0820 | fixed | Wiz locate_first/next qt_pager (quest.lua) | seed0360 Scr 830→832; @780/@781; next @828 Attributes displaced |
| D-0819 | fixed | getpos_help NHW_MENU + show_goal_msg on `?` | seed0360 Scr 828→830; @729/@730; next @780 materialize More |
| D-0818 | fixed | getpos feature matching altar `_` (+ furniture/traps) | seed0360 Scr 826→828; @719/@724; next @729 getpos_help |
| D-0817 | fixed | blank S_stone auto_describe without travelmode | seed0360 Scr 824→826; @678–679 stone; next @719 feature `_` |
| D-0816 | fixed | tele_restrict canseemon pline + wildmiss Displaced | seed0360 Scr 818→824; @668 tengu More; next @678 stone |
| D-0815 | fixed | getpos door cmap + unknown-dir visctrl | seed0360 Scr 812→818; @632 closed door; @661 ^D; next @668 |
| D-0814 | fixed | wiz_map level.traps + show_map_spot map_trap (+ blocked stair) | seed0360 Scr 694→812; @624 ^F traps; next @632 closed door |
| D-0813 | fixed | TRAVP_VALID BFS + travel blank S_stone | seed0360 Scr 689→694; @539 fixed; next @624 (D-0814) |
| D-0812 | fixed | lookat ROOM S_darkroom vs S_room | seed0360 Scr 684→689; @531 fixed; next @539 stone |
| D-0811 | fixed | lookat/auto_describe CLOUD fog/vapor | seed0360 Scr 679→684; @523 fixed; next @531 darkroom |
| D-0810 | fixed | setworn/Cloak_on no find_ac (delay-0 More) | seed0360 Scr 678→679; @497 AC; next @523 fog |
| D-0809 | fixed | getpos auto_describe "(no travel path)" | seed0360 Scr 673→678; @395 fixed; next @497 AC |
| D-0808 | fixed | Wiz quest firsttime qt_pager (quest.lua) | seed0360 Scr 670→673; prefix 373→395; next @395 travel path |
| D-0807 | fixed | sel_set_ter IS_LAVA → lit (C set_levltyp) | seed0360 Scr 638→670; prefix 324→373; next @373 fakewiz More |
| D-0806 | fixed | splev_mazewalk 3-arg ftyp=ROOM (not corrmaze→CORR) | seed0360 Scr 633→638; prefix 318→324; next @324 lava |
| D-0805 | fixed | Rogue assign_graphics + first-visit primitive pline | seed0360 Scr 628→633; prefix 301→318; next @318 · vs # |
| D-0804 | fixed | flip_level swap _objects_at with terrain (not fobj rebuild) | seed0360 Scr 617→628; prefix 249→301; next @301 materialize More |
| D-0803 | fixed | test_move cant_squeeze_thru Sokoban case 3 | seed0360 Scr 616→617; prefix 231→249; next @249 materialize map |
| D-0802 | fixed | lspo_region lit grow → light_region (minetn-5/minend-2) | seed0360 Scr 589→616; prefix 180→231; next @231 boulder |
| D-0801 | fixed | Valley arrival + hellish_smoke + Gehennom wall RED | seed0360 Scr 561→589; prefix 164→180; next @180 map mem |
| D-0800 | fixed | Wiz-loca + Wiz-fila/filb load_special | seed0360 RNG FULL 120639; Scr 519→561; next screen residual |
| D-0799 | fixed | set_apparxy can_fog vampshifter Displacement | seed0360 112857→113103; next getbones/lua |
| D-0798 | fixed | goto_level quest Home ok_to_quest gate | seed0360 112279→112857; Scr 504→519; next mux fleeck |
| D-0797 | fixed | acurr GoP STR19(25) + Dunce | seed0360 Scr 391→504; peel was premature getbones |
| D-0796 | fixed | castmu HASTE_SELF / CURE_SELF | MFAST → EOT +=24 leftover; seed0360 112243→112279 |
| D-0795 | fixed | movemon_singlemon early exits | utotype break + mon_offmap/isgd skip; idle on D-0794 |
| D-0794 | fixed | seed0360 apprentice leftover mov | cause was missing HASTE_SELF (D-0796); peel @112279 |
| D-0793 | fixed | makemon mux/muy zeromonst | mux/muy=0 not spawn; @112243 still Neferet CLOSE |
| D-0792 | fixed | Wizard ldrnum + mundisplaceable | leader_m_id set; refuse leader swap; CLOSE-clear @112243 falsified |
| D-0001 | fixed | input/messages | Missing blocking `--More--` reassigned later keys |
| D-0002 | fixed | object generation | Vault gold must merge rather than allocate again |
| D-0003 | fixed | startup/eat | Tutorial answer and cookie rumor key ownership |
| D-0004 | fixed | starting pet | `apport` derives from pre-attribute `ACURR(A_CHA)` |
| D-0005 | fixed | throwing | `bhit` stops before non-`ZAP_POS` terrain |
| D-0006 | parked | pet movement | Needs reproducible C state/candidate capture |
| D-0007 | fixed | startup/role IDs | Role/race `mnum` must be PM_* not array index |
| D-0008 | fixed | startup/welcome | Tourist Aloha/neutral/HP:10 hardcodes block Rogue first screen |
| D-0009 | fixed | legacy/botl/calendar | Legacy %d/%G + menu offx; showexp/time; moon/friday preamble |
| D-0010 | fixed | makemon invent | `is_armed`+`m_initweap` ordinary envelope; was skipping to `rn2(50)` |
| D-0011 | fixed | corpse timers | `mkcorpstat` must restart timeout when `special_corpse(old)` |
| D-0012 | fixed | weapon init | `is_poisonable` is missiles only — not dagger/spear |
| D-0013 | fixed | container init | starting SACK still calls `mkbox_cnts` → `rn2(1)` |
| D-0014 | fixed | mineralize | `!rn2(3)` must `add_to_buried` (not always `place_object`) |
| D-0015 | fixed | dogfood | tainted CORPSE `age+50<=moves` → POISON (not CADAVER) |
| D-0016 | fixed | mktrap_victim | trap ammo/possessions must `place_object` onto `fobj` |
| D-0017 | fixed | dog_move | `uncursedcnt` + `cursemsg`/`rn2(13*uncursedcnt)` cursed skip |
| D-0018 | fixed | trap/postmov | pet step → `mintrap` dart `t_missile`; `m_cansee`=`clear_path` |
| D-0019 | fixed | --More--/dog_invent | cursemsg+thitm plines; real pickup; drop RNG; tseen trap skip |
| D-0020 | fixed | mon_allowflags | OPENDOOR only if `!(nohands\|\|verysmall)`; was inflating mfndpos cnt |
| D-0021 | fixed | apply/lock | Missing `doapply`/`pick_lock` deferred post-`l` movemon (seed1500 @ 2702) |
| D-0022 | fixed | display | `newsym` omitted floor objects + SDOOR→`?` (seed1500 Scr 1→34) |
| D-0023 | fixed | tutorial menu | `ask_do_tutorial` used title-center pad; C uses NHW_MENU offx |
| D-0024 | fixed | invent/doname/disco | corner invent + doname suffixes; disco `*`/encounter + classes |
| D-0025 | fixed | getobj throw/apply | COIN_CLASS `$` suggest; missing-letter `continue`+`--More--`; clear getdir prompt |
| D-0026 | fixed | legacy + look stairs | Corner legacy keeps map; `look_here`/`stairs_description` Dlvl1 up |
| D-0027 | fixed | u_init orc | orc `Xtra_food` + `inv_subs` after Rogue blindfold |
| D-0028 | fixed | dog_invent/splitobj | nohands partial pickup → `splitobj`/`next_ident` |
| D-0029 | fixed | dog_invent/relobj | pet `relobj`/`mdrop_obj` clears minvent for APPORT |
| D-0030 | fixed | dog_goal/couldsee | `in_masters_sight` must use real `couldsee`, not stub true |
| D-0031 | fixed | dokick/kick_dumb | Ctrl-D empty-space kick → `exercise(A_DEX,FALSE)` before monmove |
| D-0032 | fixed | dogmove/dokick | seed0060 @ 2997: missing m_avoid_kicked_loc after kick |
| D-0033 | fixed | cmd/donull | seed0060 @ 3016: `.` wait missing → skipped turns |
| D-0034 | fixed | makemon/rnd | seed0060 @ 3105: stubbed `makemon(NULL,0,0)` skipped placement RNG |
| D-0035 | fixed | losehp/regen_hp | seed0060 @ 3536: wall kick must `losehp` + EOT `regen_hp` |
| D-0036 | fixed | race hpadv + mon_color | orc `hpadv` + `mon_glyph` mcolors; seed0060 Scr 0→5 |
| D-0037 | fixed | doname COIN + mondied newsym | "a gold piece" + death `newsym`; Scr 5→6 |
| D-0038 | fixed | cansee pline + wall_angle + `>` color | seed0060 Scr 6→37 (silent pickup; unfinished corner; dnstair) |
| D-0039 | fixed | newsym infrared + postmov | orc Infravision shows pet in dark; Scr 37→38 |
| D-0040 | fixed | disco OBJ_DESCR + obj_typename | extracted descr/name strs; Scr 38→39 |
| D-0041 | fixed | ^X enlightenment | autopickup/limits/weapon_descr; Scr 39→41 PASS |
| D-0060 | fixed | mfndpos | BOULDER/`ALLOW_ROCK` + `NODIAG` (grid bug); seed0700 RNG full |
| D-0061 | fixed | exper/levelup | `newhp`/`newpw` level-up + `pluslvl` + `#levelchange`; roles `xlev` |
| D-0062 | fixed | detect/search | `dosearch0` + Searching EOT; next was takeoff then wish |
| D-0063 | fixed | do_wear/takeoff | `T`/`dotakeoff` + delay-0 `armoroff`; seed0361 past `TcTd` |
| D-0064 | fixed | wish/readobjnam | `^W`/`makewish`/`readobjnam` + artifacts; seed0361 past 3 wishes |
| D-0065 | fixed | wield | `w`/`dowield`/`ready_weapon`/`setuwep`/`retouch_object`; seed0361 past Grayswandir wield |
| D-0066 | fixed | wear | `W`/`dowear`/`canwearobj`/`setworn`/`oc_delay`/`nomul`; seed0361 past SDSM dress |
| D-0067 | fixed | puton | `P`/`doputon`/`Amulet_on` + accessory path; seed0361 past ALS; next `getbones` |
| D-0068 | fixed | mkobj/egg | EGG `can_be_hatched` retry + growth helpers; seed0102 1281→4451 |
| D-0069 | fixed | fire/`f` | fireassist swap+cmdq; seed0102 RNG full (udist via no leaked `l`) |
| D-0070 | fixed | display/xprname | full MLET_CH + furniture terrain + prinv `dot`; seed0102 Scr 0→17 |
| D-0071 | fixed | getdir/legacy | `help_dir` NHW_TEXT + no-retry; Book `maxcol=strlen+1`/pad; seed0102 PASS |
| D-0072 | fixed | lookaround | run==1 corridor-turn; seed0017 prefix 2775→3132 |
| D-0073 | fixed | potion/quaff | `q`/`dodrink`/`peffect_oil`; seed2200 2724→2733 |
| D-0074 | fixed | zap/findit | `z`/`dozap` NODIR secret-door/`findit`; seed2200 2733→2772 |
| D-0075 | fixed | read/mapping | `r`/`doread` SCR_MAGIC_MAPPING + `do_mapping`; seed2200 2772→2925 |
| D-0076 | fixed | engrave | `E`/`doengrave` fingertip DUST Elbereth + occupation; seed2200 2925→2979 |
| D-0077 | fixed | whatis/help | `/`/`dowhatis` + `?`/`dohelp`/`get_lua_version`; seed2200 RNG full |
| D-0078 | fixed | tty/botl | H2344 NHW_MENU offx + `get_strength_str`; seed0700 Scr 2→44 |
| D-0079 | fixed | Samurai invent | `makedog` Hachi + Japanese display + lacquer + observe; seed0700 PASS |
| D-0080 | fixed | display/statue | `obj_glyph` STATUE → mons[corpsenm].mlet + `obj_color(STATUE)`; seed2200 Scr 1→11 |
| D-0081 | fixed | display/map | `magic_map_background` dark_room → keep floor · (not blank); seed2200 Scr 11→89 |
| D-0082 | fixed | getpos tip | `nhl_text` NHW_MENU corner offx (not fullscreen blank); seed2200 Scr 89→90 |
| D-0083 | fixed | farlook stairs | `lookat` cmap `S_brupstair` + getpos curs-after-flush; seed2200 Scr 90→109 |
| D-0084 | fixed | getpos rush | `HJKLYUBN`/`C(dir)` → 8× `truncate_to_map`; seed2200 Scr 109→113 |
| D-0085 | fixed | pager/checkfile | NHW_MENU `process_text_window` + CR/tabexpand; seed2200 Scr 113→117 |
| D-0086 | fixed | objnam/doname | SCR/SPE/RIN/WAN `… of` + bimanual `hands` + `oc_big`; invent @i |
| D-0087 | fixed | pager look_all | NHW_TEXT more@23 + coords/glyph + shown-filter + statue/engr |
| D-0088 | fixed | version/doextversion | OPTIONS_AT_RUNTIME options+windowing+soundlib+Lua license pages |
| D-0089 | fixed | NHW_TEXT dmore | `xwaitforspace(quitchars)` — non-space keys stay on page |
| D-0090 | fixed | pager/dowhatdoes | tip+`What command?`+`key2extcmddesc`; seed2200 Scr 167→176 |
| D-0091 | fixed | options/help | `option_help`/`next_opt` + optlist extract; seed2200 Scr 176→199 |
| D-0092 | fixed | mklev/themerooms | `in_mk_themerooms` for `check_room` abort; seed0017 still @3132 |
| D-0093 | fixed | dothrow/getdir | flush `--More--` before getdir + Caveman multishot; seed1150 3032→3042 |
| D-0094 | fixed | invent/stackobj | throw landing `stackobj` merge; seed1150 RNG full |
| D-0095 | fixed | pickup/Monnam | `spoteffects`/`check_here` + given-name Monnam; seed1150 Scr 22→27 |
| D-0096 | fixed | display/newsym | out-of-sight litcorr→corr; seed1150 Scr 27→46 |
| D-0097 | fixed | objnam/throw/^X | GemStone xname + volley + gender/MC; seed1150 PASS |
| D-0098 | fixed | dog_move mtrack | `goto nxti` candidate skip (was inner `continue`) |
| D-0099 | fixed | dog_goal gettrack | `!couldsee` → gettrack gg; not missing (30,4) terrain |
| D-0100 | fixed | mklev wallification | post-fill full-map `wallification` like C `themerooms_post`; not (30,4) |
| D-0101 | fixed | `#pray` / prayer_done | unbound extcmd; p_type 0 → rnz(250)+angrygods |
| D-0102 | fixed | askname + ParanoidPray | no-name splash/`Who are you?`; default pray yn |
| D-0103 | fixed | `#chat` / dochat | unbound extcmd; getdir `l` became move → fake `do_attack` peel |
| D-0104 | fixed | dokick/kick_door | CLOSED door used kick_ouch stand-in; need exercise TRUE + rnl(35) |
| D-0105 | fixed | mthrowu/monmulti | MMOVE_MOVED must fall through to thrwmu when !nearby+AT_WEAP |
| D-0106 | fixed | combat/mhitu | `mattacku` melee HTH/`hitmu` for adjacent AT_WEAP |
| D-0107 | fixed | combat/uhitm | hero `do_attack`→`overexertion`/`hitum`/`xkilled` |
| D-0108 | fixed | mon/relobj | `mondead`→`m_detach` must `relobj` minvent onto fobj |
| D-0109 | fixed | sit/dip | `#sit`/`#dip`/`dipfountain`; seed0106 4097→4141 |
| D-0110 | fixed | extcmd menus | `#offer`/`#enhance`/`#annotate`/`#overview`/`#version`; seed0106 RNG full |
| D-0111 | fixed | chargen | `player_selection`/`genl_player_setup`; seed0077 100→1475 |
| D-0112 | fixed | mklev/vault | `do_vault` `create_vault` fallback (not one `rnd_rect`); seed0077 RNG full |
| D-0113 | fixed | vision/lock/display | door `recalc_block_point` + `pick_lock` D_ISOPEN + DEC open-door `a`; seed0077 PASS |
| D-0114 | fixed | options/extract | `#if PREV_MSGS /*…*/` comment broke extract → stale `(not applicable)` msg_window |
| D-0115 | fixed | display/symset | Honor `symset:DECgraphics`; default Primary ASCII walls/floors/open doors |
| D-0116 | fixed | pray/attrib/pline | angrygods `verbalize` + `adjattrib` You_feel → quote/`--More--`; seed0106 Scr 32→34 |
| D-0117 | fixed | getline/extcmd AC | full AUTOCOMPLETE uniqueness for NEWAUTOCOMP; seed0106 Scr 34→38 |
| D-0118 | fixed | display/glyph | `obj_is_generic` + tty gray/black→NO_COLOR; seed0106 Scr 38→46 |
| D-0119 | fixed | mthrowu/uhitm msg | `canseemon`+`thitu` an/exclam/miss; melee skip hit when destroyed; seed0106 Scr 46→49 |
| D-0120 | fixed | display/newsym | `_map_location` memory under visible mon; seed0106 Scr 49→250 |
| D-0121 | fixed | yn/doname | leave yn prompt after answer; cleric skip `"uncursed "`; seed0106 Scr 250→253 |
| D-0122 | fixed | skill/#enhance | `skill_init` + `add_skills_to_menu` paged PICK_NONE; seed0106 Scr 253→254 |
| D-0123 | fixed | dungeon/overview | `lastseentyp`/`recalc_mapseen` + overview feature line; TAB vs PREFIX; seed0106 Scr 254→255 |
| D-0124 | fixed | insight/#chronicle | `do_gamelog`/`show_gamelog` + livelog wire; seed0106 Scr 255→257 |
| D-0125 | fixed | insight/#conduct | `doconduct`/`show_conduct` + `initedog` pets++; seed0106 Scr 257→259 |
| D-0126 | fixed | insight/#vanquished | `list_vanquished` + `mvitals.died` + empty `#genocided`; seed0106 Scr 259→262 |
| D-0127 | fixed | invent/#adjust | `doorganize` getobj + destination cancel; seed0106 Scr 262→264 |
| D-0128 | fixed | detect/#terrain | `doterrain` View which? + Esc cancel; seed0106 Scr 264→265 |
| D-0129 | fixed | spell/+ | `initialspell`/`dovspell` VIEW + `age_spells`; seed0106 Scr 265→266 |
| D-0130 | fixed | exper/^X | `experience`/`more_experienced` + doattributes `an`/Pw; seed0106 **PASS** |
| D-0131 | fixed | cmd/pager | `dokeylist`/`show_menu_controls`/`docontact` + usagehlp trailing blank; seed2200 Scr 202→227 |
| D-0132 | fixed | spell/weapon | Wizard `skill_based_spellbook_id` + spelspec unrestrict; seed2200 disco `*` @222 |
| D-0133 | fixed | engrave/look | `read_engr_at` from `look_here`/`check_here`; seed2200 Elbereth `:` @229 |
| D-0134 | fixed | mklev/engrave | `makeniche` trap `make_engr_at`+`wipe_engr_at`/`wipeout_text`; seed0105 RNG full |
| D-0135 | fixed | spell/cast | `Z`/`docast`/`spelleffects_check` + SPE_HEALING self-zap; seed0501 @2205 |
| D-0136 | fixed | spell/read | `study_book` known-refresh `--More--`/yn; seed0501 key leak @2217 |
| D-0137 | fixed | insight/^X | female `urole.name.f`/`rank.f`; seed0501 **PASS** |
| D-0138 | fixed | roles/welcome | C `name.f=0` + welcome gender gate; Valkyrie no `female` |
| D-0139 | fixed | display/engrave | `S_engroom`/`S_engrcorr` in `newsym`; seed0105 Scr 0→22 |
| D-0140 | fixed | sounds/dochat | wall/SDOOR + statue talk; seed0105 wall pline |
| D-0141 | fixed | invent/apply getobj | empty SUGGEST → "don't have anything to use or apply" |
| D-0142 | fixed | invent/eat getobj | missing-letter `continue` + NEED_MORE `--More--`; seed0105 **PASS** |
| D-0143 | fixed | mklev/lspo_map | themerms map rooms → `lspo_map`+`filler_region`; not `rn2(100)`+`create_room` |
| D-0144 | fixed | themerms/Ghost | Ghost fill: `selection_rndcoord` + create_monster/object |
| D-0145 | fixed | mklev/finddpos | irregular `finddpos_shift` walk; dig_corridor joins on map rooms |
| D-0146 | fixed | mkobj/lamp | OIL_LAMP `rn1(500,1000)` + TOOL charged cases in `mksobj_init` |
| D-0147 | fixed | mklev/occupied | `occupied` needs `t_at`; irregular `somexy`/`inside_room` |
| D-0148 | fixed | engrave/get_rnd_text | ENGRAVEFILE `get_rnd_text` via pad+xcrypt extract; not getrumor stub |
| D-0149 | fixed | do/goto_level | ordinary `>` `dodown`/`goto_level`/`getbones`/`keepdogs`; dlvl2 shop `rn2(u_depth)` |
| D-0150 | fixed | trap/pit mon | monster `trapeffect_pit` + `thitm`→`monkilled`/`make_corpse`; not hero dotrap |
| D-0151 | fixed | monmove/traps | hostile `postmov` + `mon_learns_traps` + `mfndpos` known-trap skip; seed0015 RNG full |
| D-0152 | fixed | wield/quiver | `Q`/`doquiver_core` uswapwep ready + hand-throw; seed0101 @2293 |
| D-0153 | fixed | cmd/travel | `_`/`dotravel` cancel + tip PICK_NONE; seed0101 @2302 |
| D-0154 | fixed | monmove/apparxy | `set_apparxy` Displacement `rn2(4)`; seed0101 RNG full |
| D-0155 | fixed | apply/eat | STETHOSCOPE self + touchfood split; seed0016 @2493→2551 |
| D-0156 | fixed | zap/sleep | WAN_SLEEP self-zap + Unaware gethungry; seed0016 RNG full |
| D-0157 | fixed | apply/getobj | `apply_ok` SUGGEST wand/spbook; seed0016 Scr 31→32 |
| D-0158 | fixed | objnam/insight | armor `pair of`/`set of` + ^X new moon + 23-row page; seed0016 PASS |
| D-0159 | fixed | monmove/door | `postmov` CLOSED/LOCKED open/unlock/smash; seed0015 Scr 21→22 |
| D-0160 | fixed | display/goto_level | `flush_screen(-1)` + `docrt`→`cls` more before redraw; descend `--More--` |
| D-0161 | fixed | mklev/objects_at | clear `_objects_at`/`head_engr` on level rebuild; ghost gold gone |
| D-0162 | fixed | display/stairs | `known_branch_stairs` → yellow; ordinary stairs CLR_GRAY→NO_COLOR |
| D-0163 | fixed | trap/sqky | monster `trapeffect_sqky_board` + `just_an` letter-space |
| D-0164 | fixed | insight/depth | ^X gender gate + dungeon `depth(u.uz)`; seed0015 PASS |
| D-0165 | fixed | hack/engrave | `maybe_smudge_engr` after walk + `can_reach_floor` |
| D-0166 | fixed | themerms/telehub | Teleportation hub fill + `make_a_trap` teledest + `mktrap` `rnd(4)` |
| D-0167 | fixed | mhitm/corpse | mhitm `mondied`→`make_corpse`/`next_ident` (not grow_up `rnd(1)`) |
| D-0168 | fixed | dogmove/eat | `dog_eat` after edible `newdogpos` (2nd dogfood + delobj) |
| D-0169 | fixed | monmove/meating | `m_move` meating countdown before `dog_move` |
| D-0170 | fixed | uhitm/stagger | unarmed `hmon_hitmon_stagger` `rnd(100)` before kill |
| D-0171 | fixed | mklev/mines | `fill_lvl`→`makemaz(minefill)` + mkmap; dungeon align 3-bit |
| D-0172 | fixed | peace_minded/m_initinv | race hatemask + M2 race bits; S_GNOME candle |
| D-0173 | fixed | name_to_monplus/NAMS | pmnames gender; gnome lord no rn2(2) |
| D-0174 | fixed | m_initinv/likes_gold | likes_gold + findgold + mkmonmoney rn2(5) |
| D-0175 | fixed | minefill/create_monster | class-letter: induced_align before mkclass |
| D-0176 | fixed | minefill/create_trap | traptype NO_TRAP retry + mktrap victim rnd(4) |
| D-0177 | fixed | minefill/fixup | `fixup_special`/`place_lregion` + Mines mineralize |
| D-0178 | fixed | dig/mdig_tunnel | tunnels/`ALLOW_DIG`/`mdig_tunnel` postmov rnd(12) |
| D-0179 | fixed | mhitm/get_mattk | extracted mattk[] + AT_WEAP=254 (not AT_SPIT=10) |
| D-0180 | fixed | monmove/digweapon | `m_digweapon_check` + pick/axe `mon_wield_item` |
| D-0181 | partial | trap/rocktrap + gettrack | rocktrap + should_see/gettrack/initrack; dwarf pick → D-0182 |
| D-0182 | fixed | monmove/m_search_items | getitems + loot gg redirect; dwarf rocktrap @13987 |
| D-0183 | partial | monmove/underfoot loot | skip underfoot MMOVE_DONE until mpickstuff; can_carry peaceful |
| D-0184 | partial | muse/potionhit | MUSE_POT_* throw + hero potionhit/breathe/makeknown |
| D-0185 | fixed | postmov mpickstuff | seed0030 @14118: missing `mpickstuff` left floor glass → silent `m_search_items` gg split |
| D-0186 | fixed | mon.c can_carry | quan>1 → 1 only for M1_NOHANDS; hands take full stack |
| D-0187 | fixed | weapon.c hit bonus | `weapon_hit_bonus` + martial barehands `rnd(4)` |
| D-0188 | fixed | uhitm.c passive | `hitum`→`passive` live `rn2(3)` even for NO_ATTK |
| D-0189 | fixed | weapon.c dmgval | extract `oc_wsdam`/`oc_wldam`; drop stand-in default 1 |
| D-0190 | fixed | end/bones death | `mdamageu`→`done_in_by`/`can_make_bones`; stop post-death RNG |
| D-0191 | fixed | mon.c xkilled corpse | `xkilled`→`make_corpse` when `corpse_chance` (not burn-only) |
| D-0192 | fixed | cmd/pickup `,` | unbound `,` skipped pickup turn → early Ctrl-D kick |
| D-0193 | fixed | eat.c eatcorpse | CORPSE refuse → early kick; port eatcorpse + occupation |
| D-0194 | fixed | insight/weapon | empty_handed + real P_SKILL martial ^X; seed0200 PASS |
| D-0195 | fixed | wintty/NHW_MENU | menu flush NEED_MORE + mark_topline NON_EMPTY; seed0101 PASS |
| D-0196 | fixed | mkobj/candy | CANDY_BAR `assign_candy_wrapper` `rn2(12)` before quan `rn2(6)` |
| D-0197 | fixed | dogfood CORPSE | vegan/lichen → MANFOOD; APPORT `rn2(8)` |
| D-0198 | fixed | mhitm AD_ELEC | `mhitm_mgc_atk_negated` + `hitmu` adtyping |
| D-0199 | fixed | monnear NODIAG | grid-bug diagonal not nearby → `m_move` |
| D-0200 | fixed | themerms fill | Default themed-fill → `themeroom_fill` + Storeroom + `set_mimic_sym` |
| D-0201 | fixed | mkshop | `invalid_shop_shape` + shtypes `rnd(100)` + rtype/needfill |
| D-0202 | fixed | maketrap | ROLLING_BOULDER `mkroll_launch`/`find_random_launch_coord` |
| D-0203 | fixed | shops | `stock_room`/`shkinit`/`mkshobj_at` + shopkeeper invent |
| D-0204 | fixed | dosounds | shop/`has_*` feature gates after vault; seg1 6561→6565 |
| D-0205 | fixed | shk_move | isshk before getitems; seg1 6565→6568 |
| D-0206 | fixed | movemon hider | disguised mimic skip dochug; seg1 6568→7007 |
| D-0207 | fixed | mimic attack | stumble_onto_mimic object_from_map next_ident; seg1 7007→7189 |
| D-0208 | fixed | dosounds vault | gd_sound rn2(2)+hallu; seg1 7189→full 7640; next seg2 somey |
| D-0209 | fixed | make_grave epitaph | EPITAPHFILE get_rnd_text; seg2 1272→2217 |
| D-0210 | fixed | elf Instrument | eager ROLL_FROM before trquan; seg2 2217→2408 |
| D-0211 | fixed | dog_goal wantdoor | !couldsee ogoal/do_clear_area; seg2 2408→2930 |
| D-0212 | fixed | pony saddle | makedog put_saddle_on_mon; seed0103 2337→2440 |
| D-0213 | fixed | #ride mount | doride/mount_steed/dismount; seed0103 RNG full |
| D-0214 | fixed | ride display | pet mcolor + ridden glyph + saddled + Ride botl; Scr 2→57 |
| D-0215 | fixed | tutorial menu | invalid letter stays open; no premature Please choose |
| D-0216 | fixed | death disclose | really_done flush You die --More-- + possessions yn |
| D-0217 | fixed | mattacku steed | mounted rn2(is_orc?2:4)→mattackm steed; seed0104 2841→3031 |
| D-0218 | rejected | upstairs geometry | @3031 was not create_room drift; superseded by D-0219 |
| D-0219 | fixed | test_move diagonal door | ban diagonal into/out of intact doorway; seed0104 RNG full |
| D-0220 | fixed | dismount look_here | float_down→pickup + multi NHW_MENU; seed0104 PASS |
| D-0221 | fixed | floorfood + poison_strdmg | floor yn before invent getobj; seg2 2930→3207 |
| D-0222 | fixed | useupf→delobj | floor meal `obj_resists(0,0)`; seg2 3207→5939 |
| D-0223 | fixed | m_search_items underfoot | restore MMOVE_DONE→mpickstuff; seg2 5939→6060 |
| D-0224 | rejected | upstairs geometry | screen≠map; stairs matched (66,2); superseded by D-0225 |
| D-0225 | fixed | F/do_fight | unbound F; Fl forcefight thin-air; seg2 RNG full |
| D-0226 | fixed | Nesting rooms | rn2(4) w/h before build_room; positioned create_room |
| D-0227 | fixed | hmon knockback | weapon maybe_knockback→mhitm_knockback rn2(3)+rn2(6) |
| D-0228 | fixed | cmd_safety_prevention | safe_wait blocks s/. beside hostiles; seg3 7935→8561 |
| D-0229 | fixed | xkilled treasure | mkobj(RANDOM_CLASS) after !rn2(6); seg3 8561→9166 |
| D-0230 | fixed | CORPSE weight | mons[corpsenm].cwt; goblin gg divert; seg3 9166→9299 |
| D-0231 | fixed | blocksMove/SDOOR | IS_OBSTRUCTED+IRONBARS; walk-into-SDOOR; seg3 9299→9778 |
| D-0232 | fixed | muse find_misc | shk WAN_SPEED spend turn; seg3 9778→9850 |
| D-0233 | fixed | mfndpos NOTONL | monseeu/monlineu mark; avoid skips; seg3 9850→9881 |
| D-0234 | fixed | setmangry + WAN_STRIKING | miss→wakeup anger; mbhit Boing; seg3 9881→9887 |
| D-0235 | fixed | monstseesu M_SEEN_MAGR | Boing→seenres; find_offensive skips; seg3 FULL |
| D-0236 | fixed | ini_inv UNDEF_SPE ring | charged ring spe≤0 → rne(3); seg4 2369→6630 |
| D-0237 | fixed | drinkfountain | dodrink fountain yn + rnd(30); seg4 6630→7554 |
| D-0238 | fixed | moverock/dopush | walk-into boulder push + exercise STR; seg4 FULL |
| D-0239 | fixed | trap/dotrap | hero dart `t_missile`+`thitu` miss; seg5 3076→3096 |
| D-0240 | fixed | NHW_MENU dmore | putstr quitchars; seg5 3096→4174 |
| D-0241 | fixed | mhitm gv.vis | hitmm/missmm/mondied cansee; seg5 4174→4372 |
| D-0242 | fixed | linedup/vision | BOULDER does_block + linedup rn2; seg5 FULL |
| D-0243 | fixed | themerms Blocked center | map+replace_terrain; seg6 339→2638 |
| D-0244 | fixed | FIGURINE rndmonnum_adj | adj(5,10)+is_human; seg6 2638→4080 |
| D-0245 | fixed | m_harmless_trap BEAR | msize≤SMALL; seg6 4080→10280 |
| D-0246 | fixed | goodpos accessible | closed door reject; seg6 10280→10815 |
| D-0247 | fixed | themerms Buried zombies | fill body; seg6 10815→11830 |
| D-0248 | fixed | themerms sized outer rooms | Fake Delphi+… positioned create_room; seg6 11830→13801 |
| D-0249 | fixed | m_initinv defensive | `rnd_defensive_item` + PM_SOLDIER early-return; seg6 13801→15369 |
| D-0250 | fixed | trapeffect_hole TRAPDOOR | mon fall→migrate Trap_Moved_Mon; seg6 15369→17712 |
| D-0251 | fixed | set_malign/adjalign xkilled | ualign.record after kill; peace_minded rn2(21); seg6 17712→18683 |
| D-0252 | fixed | thitm dmgval | hit path called dmgval; stub dam=1 skipped rnd; seg6 18683→18840 |
| D-0253 | fixed | m_balks launcher flee | @18840→18913; gnome appr=-1 vs approach |
| D-0254 | fixed | trapeffect_magic_trap | mon rn2(21)→fire; seg6 18913→19831 |
| D-0255 | fixed | losehp→done + bones | fatal thitu noreturn; corpse+ghost; seg6 FULL |
| D-0256 | fixed | trapeffect_slp_gas_trap | mon sleep_monst(rnd(25)); seg7 9290→9811 |
| D-0257 | fixed | mcalcdistress mfrozen | EOT thaw after sleep-gas; seg7 9811→10404 |
| D-0258 | fixed | find_offensive nomore | WAN then POT invent; C keeps wand; seg7 FULL |
| D-0259 | fixed | armoroff delay + ICRNL rush | seg8 3088→3263; takeoff nomul + C(j) |
| D-0260 | fixed | newmonhp level-0 min HP | rnd(4)=1→2; jackal survives; seg8 3263→3310 |
| D-0261 | fixed | Ctrl-rush run=3 + await muse pline | seg8 FULL; seed0013 Scr 57/59 |
| D-0262 | fixed | set_mimic_sym shop get_shop_item | shop mimic appearance; seg9 7196→8138 |
| D-0263 | fixed | drinkfountain dofindgem rnd_class | fate=27 gem; seg9 8138→8281 |
| D-0264 | fixed | dochug NEED_HTH mon_wield_item | goblin dist2=8 wield; seg9 8281→8352 |
| D-0265 | fixed | hitval oc_hitbon (a_ac) | dagger +2 to-hit; seg9 8352→8918 |
| D-0266 | fixed | hero MAGIC_TRAP / domagictrap | rn2(30)+fate11 HInvis; seg9 8918→8943 |
| D-0267 | fixed | m_move set_apparxy before shk|tame | shk notseen rn2(3); seg9 8943→10461 |
| D-0268 | fixed | m_move Invis should_see rn2(11) appr | appr=0 gate; needs D-0269 couldsee |
| D-0269 | fixed | detect SCORR/SDOOR recalc_block_point | vision_recalc(1) left stale viz_clear |
| D-0270 | fixed | place_object/remove boulder vision | mkobj block/recalc; retires D-0242 omit |
| D-0271 | fixed | make_corpse undead before G_NOCORPSE | zombie/mummy/vampire mkcorpstat; seg9 10811→12411 |
| D-0272 | fixed | find_roll_to_hit Luck bonus | full-moon +1; seg9 12411→12414 |
| D-0273 | fixed | corpse_chance AT_BOOM / mon_explodes | gas spore PHYS boom; seg9 12414→16582 |
| D-0274 | fixed | getbones VFS load | Elara→Hermione bones open+next_ident; seg9 16582→16630 |
| D-0275 | fixed | done_object_cleanup thrownobj | limbo missile→map before bones; seg9 16630→16635 |
| D-0276 | fixed | bones mtrack serialize/restore | C savemon/restmon mtrack; seg9 16635→16683 |
| D-0277 | fixed | bones ghostly peace_minded reset | C restore getlev; seg9 16683→16836 |
| D-0278 | fixed | dochug disturb sleeping wake | C monmove disturb rn2(7); seg9 16836→17104 |
| D-0279 | fixed | no_bones_level branch/bot/special | skip depth rn2 on Mines-stair Dlvl2; seg4 FULL 8031 |
| D-0280 | fixed | rhack dodrink ECMD_TIME | CANCEL truthy≠time; seg5 FULL 8397; 55489→88957 |
| D-0281 | fixed | `#quit` done2 | unknown extcmd→y move; seg8 FULL; 88957→105529 |
| D-0282 | fixed | topl wrap + redotoplin more | update_topl `\n` + cury more; read_engr BUFSZ maxelen; Scr prefix 24→46 |
| D-0283 | fixed | botl depth + Mines walls | `Dlvl` via `depth()`; `In_mines` wall CLR_BROWN; Scr prefix 46→50, 87→100 |
| D-0284 | fixed | m_throw tmp_at DISP_FLASH | flight glyph through potionhit `--More--`; Scr 100→102, miss 50→51 |
| D-0285 | fixed | potion xname descr | `oc_name_known` not `obj.known`; dknown+!nn → `<descr> potion`; Scr 102→103, miss→62 |
| D-0286 | fixed | mswings / hitval AT_WEAP | bow melee swing pline before hit; Scr miss 62→75 start |
| D-0287 | fixed | botl HP clamp <0→0 | status shows 0 not −4 after lethal; Scr 103→116, miss→75 |
| D-0288 | fixed | disclose end_disclose | `disclose:-i…` → NO_WITHOUT_PROMPT; invent yn skipped |
| D-0289 | fixed | genl_outrip + death summary | RIP+Aloha NHW_TEXT; Tourist goto XP; Scr 116→120, miss→76 |
| D-0290 | fixed | RIP endwin trailing blank | dump_forward `""` → page-2 blank `--More--`; Scr 120→161, miss→78 |
| D-0291 | fixed | topten + record VFS | raw_print panel + nh_terminate capture; Scr 161→818, miss→818 |
| D-0292 | fixed | amulet xname + clear_dknown | dknown+!nn → `<descr> amulet`; prefix 93→109; Scr 818→821 |
| D-0293 | fixed | display/DECgraphics altar | `S_altar` meta-`{` (not `_`); prefix 109→126; Scr 821→840 |
| D-0294 | fixed | mhitm noises | out-of-sight miss/hit → `You_hear`; prefix 126→129; Scr 840→843 |
| D-0295 | fixed | Monnam do_it | `!canspotmon` → `It` before type/name; prefix 129 topline |
| D-0296 | fixed | map_invisible / pre_mm | unseen magr → `I`; prefix 129→163; Scr 843→853 |
| D-0297 | fixed | display_monster M_AP_OBJECT | mimic → obj glyph not mlet; prefix 163→174; Scr 853→887 |
| D-0298 | fixed | dosounds vault You_hear | vault `gd_sound` switch → pline; prefix 174→237; Scr 887→889 |
| D-0299 | fixed | map_object nearby observe | neardist `observe_object` + `see_nearby_objects`; prefix 237→259; Scr 889→1085 |
| D-0300 | fixed | newsym unseen blank | !cansee+no-memory → blank (not no-op); prefix 259→266; Scr 1085→1146 |
| D-0301 | fixed | missmu just near-miss | nearmiss+verbose `"just "`; map_invisible; prefix 266→372; Scr 1146→1147 |
| D-0302 | fixed | filler_region bbox lit | irregular room: no bbox re-light; prefix 372→448; Scr 1147→1346 |
| D-0303 | fixed | dosounds fountain/sink You_hear | msg tables → pline; prefix 448→484; Scr 1346→1348 |
| D-0304 | fixed | xkilled post-drop newsym | treasure then `newsym`; prefix 484→485; Scr 1348→1370 |
| D-0305 | fixed | TOOL/WEAPON xname descr | `!oc_name_known` → `OBJ_DESCR` (whistle); prefix 485→550; Scr 1370→1371 |
| D-0306 | fixed | dosounds shop You_hear | `shop_msg[rn2(2)+hallu]`; prefix 550→573; Scr 1371→1373; suite Scr +226 |
| D-0307 | fixed | shop enter welcome + shk Monnam | `u_entered_shop`/`ushops` + `ubirthday`/`m_id`; prefix 573→580; Scr 1373→1376 |
| D-0308 | fixed | uhitm mon_nam shk | import `do_name` mon_nam; prefix 576→580; Scr 1376→1383 |
| D-0309 | fixed | WAND xname descr + zap dknown | `"%s wand"` + mzapwand dknown; @580 topline; with D-0308 Scr +7 |
| D-0310 | fixed | bot skip uhp==-1 | keep prior botl on fatal overkill more(); prefix 580→582; Scr 1383→1387 |
| D-0311 | fixed | paybill inherits death | angry shk takes possessions pline before flush; @582; Scr 1387→1388 |
| D-0312 | fixed | SCROLL xname unlabeled | `!nn`+!magic → `<dn> scroll`; drop `obj.known`; @594; Scr 1388→1389 |
| D-0313 | fixed | done_in_by isshk RIP | honorific+shkname+`, the shopkeeper`+`KILLED_BY`; @583; Scr 1389→1394 |
| D-0314 | fixed | botl flush/bot/more | pline→flush→bot; more no bot; cls botlx; spell uen botl; @779; Scr 1394→1395 |
| D-0315 | fixed | Priest xname bknown | cleric forces `bknown=1` in xname/doname; @787 cursed candy; Scr 1395→1398 |
| D-0316 | fixed | mkobj WAND known | `mksobj` uskn includes WAND; known=0; @791 glass wand no charges; Scr 1398→1400 |
| D-0317 | fixed | moverock hear-behind | monster-behind You_hear/canspotmon + dopush unmap I; @836; Scr 1400→1427 |
| D-0318 | fixed | mon_wield canseemon pline | canseemon Monnam/doname wield !|.; @1174; Scr 1427→1428 |
| D-0319 | fixed | thitu/monshoot await pline | await hit/miss/shoot before losehp/flight; @1195 )+HP; Scr 1428→1432 |
| D-0320 | fixed | losehp leave neg uhp | no fatal uhp=0 clamp; bot -1 skip keeps HP:4 @1262; Scr 1432→1438 |
| D-0321 | fixed | SPBOOK xname descr | dknown+!nn → `"%s spellbook"`; drop `obj.known`; @1342 shining; Scr 1438→1445 |
| D-0322 | fixed | uhitm hit exclam | `hmon_hitmon_msg_hit` canseemon?exclam(dmg)+verb; @1429 `!`; Scr 1445→1446 |
| D-0323 | fixed | mbhitm finish_losehp | await `finish_losehp_done` after fatal striking; @1433; Scr 1446→1604 |
| D-0324 | fixed | quit topten how | `done` deaths[QUIT]+`really_done` NO_KILLER; outentry quit+dungeon; @1484; Scr 1604→1605 |
| D-0325 | fixed | ARMOR xname descr | `!oc_name_known` → `OBJ_DESCR` (+pair/set/shield); @1601; Scr 1605→1606 |
| D-0326 | fixed | newsym canspotself | `!canspotself` → `_map_location(show)`; no `@` when Invisible; @1606; Scr 1606→1820 |
| D-0327 | fixed | xkilled nonliving destroy | `nonliving`→`"destroy"`; @1684; Scr 1820→1821; suite Scr 3258 |
| D-0328 | fixed | savebones clear map memory | seenv/waslit/glyph+disp strip; docrt vision_recalc(2); @1821; Scr 1821→1831 |
| D-0329 | fixed | named ghost monnam | PM_GHOST+mgivenname → s_suffix+`" ghost"`; @1830; Scr 1831→1832 |
| D-0330 | fixed | `;` glance + look_at_monster | doquickwhatis; distant_monnam+asleep; putmixed no forced more; Scr 1832→1933 |
| D-0331 | fixed | getlin/`#` topl wrap | `topl_putsym` CO-1 wrap + `buf < COLNO`; seed0030 full PASS; seed2200 Scr 206 |
| D-0332 | fixed | getobj drop compactify | `suggested>5` → `compactify`; drop `[a-g]`; seed0013 @23 |
| D-0333 | fixed | friday13 enl indent | `doattributes` two-space body line; seed0013 full PASS |
| D-0334 | fixed | farlook checkfile yn | `yn_function` NEED_MORE→more; lookat `found=1`; seed2200 Scr 206→229 |
| D-0335 | fixed | JSON dosave/restore | `S`/`dosave0` VFS + restore segment; Scr 47→65; RNG full |
| D-0336 | fixed | welcome restore align | omit align unless base changed/adrift; @49 welcome-back |
| D-0337 | fixed | attributes quitchars | `doattributes` xwaitforspace; ^O stays on page; @56 |
| D-0338 | fixed | `$` doprgold | empty wallet pline; @60 |
| D-0339 | fixed | `)` doprwep | bare-handed empty_handed pline; @62; Scr 68→69 |
| D-0340 | fixed | invent show-* | `[`/`=`/`"`/`(` doprarm…doprtool; Scr 69→72 |
| D-0341 | fixed | DEL→doterrain | bind existing `#terrain`; Scr 72→75; next reveal_terrain |
| D-0342 | fixed | reveal_terrain getglyph | TER_MAP strip mon/obj; Scr 75→89 |
| D-0343 | fixed | getpos terrain Done | tip skip-docrt + space quitchar; restore 99/99 |
| D-0344 | fixed | `#twoweapon` / dotwoweapon | EXT_CMDS + can_twoweapon; not AC; Scr 36→42 |
| D-0345 | fixed | hitum twohits / uswapwep | second known_hitum; Scr 42→96; RNG full |
| D-0346 | fixed | dosit OBJ_AT / CORPSE xname | the(xname)+comfort; bare corpse; Scr 96→97 |
| D-0347 | fixed | weapon_insight twoweap limits | skill limited-by lines + COLNO `.` clip; seed0107 PASS |
| D-0348 | fixed | chargen corner NHW_MENU | keep BASE splash; erase prior menu geom; seed0009 Scr 12→13 |
| D-0349 | fixed | tutorial yes-path | `schedule_goto`/`deferred_goto` + tut-1 skeleton; Scr 13→14 |
| D-0350 | fixed | tut-1 CENTER + arrival | map center/updest/rndspot/Tutorial botl/invent stash; Scr 14→21 |
| D-0351 | fixed | tut-1 door-area des.* | engravings+D_CLOSED+portal seen+newbie opts; Scr 21→27 |
| D-0352 | fixed | tut-1 mktrap gate + sling | victim `rnd(4)` + induced_align Is_special + des.* through sling; Scr 27→38 |
| D-0353 | fixed | tut-1 remainder + WAITMASK | load_tut1 loot→end; mineralize special skip; align_shift; dochug WAITMASK; Scr 38→39 |
| D-0354 | fixed | mention_walls obstructed bump | test_move DO_MOVE pline “It's a wall.”; Scr 39→40 |
| D-0355 | fixed | pool/lava/ice terrain glyphs | back_to_glyph + raw DEC `` ` `` grid; Scr 40→48 |
| D-0356 | fixed | describe_decor broken door | pickup !OBJ_AT + mention_decor; Scr 48→49 |
| D-0357 | fixed | swim_move_danger + drown/lava | ParanoidSwim/m-prefix/pooleffects; Scr 49→63 |
| D-0358 | fixed | death disclose a/c/o + mapseen | enlightenment+conduct+overview before RIP; Scr 63→73 |
| D-0359 | fixed | continue_run no engraving smudge | DOMOVE_RUSH\|WALK gate + clear attempting; seed0009 PASS |
| D-0360 | fixed | hero rocktrap place ROCK | feeltrap+u.ux/uy; unblocks seed0012 stack overflow |
| D-0361 | fixed | mkbox_cnts ICE_BOX | mksobj(CORPSE) not boxiprobs; seed0012 1285→3346 |
| D-0362 | fixed | #loot use_container :/ESC | EXT_CMDS loot; seed0012 @3152 was hero desync |
| D-0363 | fixed | hmon dmg_recalc dbon/skill | martial Basic +3; seed0012 @3204→3248 |
| D-0364 | fixed | dog_nutrition objects[] oc_delay | tripe meating=2; seed0012 @3248→3483 |
| D-0365 | fixed | multi `,` query_objlist PICK_ANY | menu keys no longer leak as move; @3483→6924 |
| D-0366 | fixed | doup + in-memory getlev hide rnd(10) | `<` unbound; stash restore; @6924→6952 |
| D-0367 | fixed | save_track/rest_track per-level utrack | return visit gettrack; @6952→7288 |
| D-0368 | fixed | O/@ autopickup + autopick_testobj | leftover floor gold; @7288→7312 |
| D-0369 | fixed | dochug wipe_engr_at before fleeck | dust under mon; @7312→8384 |
| D-0370 | fixed | drinkfountain case 26 monster_detect | browse_map getpos; @8384→8802 |
| D-0371 | fixed | drinkfountain case 20 vomit/nomul(-2) | foul water multi; @8802→12439 |
| D-0372 | fixed | domove attack before test_move | doorway diagonal; @12439→12489 |
| D-0373 | fixed | vault_tele / tele_trap once TELEP | niche→vault somex; @12489→13287 |
| D-0374 | fixed | invault + guard makemon / merc kit | timer+spawn; @13287→13392 |
| D-0375 | fixed | apply `?` bag take-out + gd_move | hidden_gold; @13392→13517 |
| D-0376 | fixed | bag put-in; leaked LF rush-south | put-in coins; prefix 13517→13576; cursors 259→270 |
| D-0377 | fixed | gd_move dig while-loop redirect | wall→ortho STONE CORR; prefix 13576→13700; cursors 270→279 |
| D-0378 | fixed | clear_fcorr/restfakecorr after escort | restore fakecorr; RNG 13700→13878 full; cursors 279→291 |
| D-0379 | fixed | maybe_skip_seps compatible roles | count ok_* not roles.length; seed0012 Scr 14→17 |
| D-0380 | fixed | SPELL_LEV_PW after num_spells | Monk Pw 4→5; seed0012 Scr 17→181 |
| D-0381 | fixed | use_container locked Hmmm pline | lknown branch; seed0012 Scr 181→182 |
| D-0382 | fixed | in_or_out_menu prompt/SELECTED | ATR_INVERSE + `q *`; Scr 182→184 |
| D-0383 | fixed | ice-box sortloot / merge stacks | add_to_container+corpse spe; Scr 184→185 |
| D-0384 | fixed | query_objlist INVORDER_SORT | class headings + prompt ATR; Scr 185→187 |
| D-0385 | fixed | doset_simple_menu allopt Options | General→Status + FS multipage; Scr 187→199 |
| D-0386 | fixed | hilite_pile MG_OBJPILE ATR_INVERSE | obj_is_piletop + use_inverse; Scr 199→236 |
| D-0387 | fixed | pickup autopick → check_here | post-autopick look_here; Scr 236→239 |
| D-0388 | fixed | invent prinv total_of | gold merge `(N in total)`; Scr 239→240 |
| D-0389 | fixed | display cls clear_glyph_buffer | detect More blank map; Scr 240→244 |
| D-0390 | fixed | getpos auto_describe TER_DETECT | lookat unexplored/mimic/shk; Scr 244→257 |
| D-0391 | fixed | cmd parse/get_count digit clear | clear once after count; Scr 257→259 |
| D-0392 | fixed | stop_occupation + dochugw/Ns search | counted search interrupt; Scr 259→268 |
| D-0393 | fixed | teleds materialize + gold disp.botl | vault TELEP More $:307; Scr 268→275 |
| D-0394 | fixed | use_container outmaybe/yname + MENU_FULL put-in | Scr 275→283; @278 containing next |
| D-0395 | fixed | doname containing + use_container cknown | Scr 283→284; @294 Move along! next |
| D-0396 | fixed | drop gold freeinv_core botl + gd_move Move along! | Scr 284→307; @307 Suddenly next |
| D-0397 | fixed | gd_move_cleanup parkguard + look-around Suddenly | Scr 307→308; seed0012 PASS |
| D-0398 | fixed | trapeffect_bear_trap + floor_trigger BEAR | seed0004 RNG 4025→4087; @26 yellow gem next |
| D-0399 | fixed | look_here observe before doname | pile gem color; seed0004 Scr 28→29; seed0002 50→54 |
| D-0400 | fixed | encumber_msg + WT_WOUNDEDLEG_REDUCT | bear `--More--` via load pline; RNG 4087→4114; @29 caught next |
| D-0401 | fixed | trapmove + enc_stat botl + exerper status + mintrap rn2(40) | seed0004 Scr 29→52; RNG 4114→5331; @46 wriggle next |
| D-0402 | fixed | Norep vs gp.prevmsg (not Norep-only cache) | seed0004 @46 caught+wriggle; Scr 52→53; @51 heal_legs next |
| D-0403 | fixed | heal_legs + nh_timeout WOUNDED_LEGS | seed0004 @51; Scr 53→215; RNG 5331→9213; @216 next |
| D-0404 | fixed | known_hitum flee `Math.trunc(mhpmax/2)` + engulfing_u | seed0004 Scr 215→233; RNG 9213→9892; @9795 dog_move next |
| D-0405 | fixed | run_timers ROT_CORPSE + pickup sortloot | seed0004 Scr 233→241; RNG 9892→10399; @10370 resist_conflict next |
| D-0406 | fixed | pickup MENU_INVERT_ALL + resist_conflict/hero_conflict | seed0004 RNG 10399→10409; @10382 exercise/teleds next |
| D-0407 | fixed | SCR_TELEPORTATION scrolltele/safe_teleds + getobj `?` | seed0004 RNG 10409→10569; Scr 241→242; @10563 next |
| D-0408 | fixed | getpos `>`/`<` stairs feature scan | seed0004 RNG 10569→10685; prefix→10657; @10657 eatcorpse next |
| D-0409 | fixed | eatcorpse palatable `hero_form_data` | seed0004 RNG 10685→11027; prefix→10713; @10713 exercise next |
| D-0410 | fixed | gethungry metabolic `uhunger--` + accessory burns | seed0004 RNG 11027→11029; prefix→10966; @10966 umove/dopush next |
| D-0411 | fixed | umonnum/youmonst.data + moveloop encumber_msg/mvl_wtcap | seed0004 miss still @10966; green+cohort 25; after_calc next |
| D-0412 | fixed | findtravelpath dest-BFS + boulder skip + GUESS | seed0004 prefix 10966→11568; after_calc red herring |
| D-0413 | fixed | Conflict fightm before dochugw + dochug hero_conflict/P4 | seed0004 prefix 11568→11708; @11708 mattacku next |
| D-0414 | fixed | dog_move ALLOW_U → mattacku under Conflict | seed0004 prefix 11708→11722; @11722 next_ident next |
| D-0415 | fixed | throw `*` + thitmonst food → tamedog/dog_eat | seed0004 RNG full 12084; Scr 240→243; screen peel next |
| D-0416 | fixed | dog_move cursemsg → display.canseemon LOS | seed0004 Scr 243→244; @182 fixed; @239 bag empty next |
| D-0417 | fixed | use_container emptymsg → Ysimple_name2 | seed0004 Scr 244→245; @239 fixed; @240 quan next |
| D-0418 | fixed | xname/doname WEAPON poisoned prefix | seed0004 Scr 245→254; @240 fixed; @248 trap `^` next |
| D-0419 | fixed | map_trap / tseen trap glyph in newsym | seed0004 Scr 254→382; @248 fixed; @277 look_here next |
| D-0420 | fixed | xname RING descr / nn≠obj.known | seed0004 Scr 382→389; @277 fixed; @285 `[rl]` next |
| D-0421 | fixed | choose_ring_hand → yn_function [rl] | seed0004 Scr 389→390; @285 fixed; @288 invent More next |
| D-0422 | fixed | display_pickinv n==1 → message_menu | seed0004 Scr 390→391; @288 fixed; @297 stairs describe next |
| D-0423 | fixed | getpos autodescribe default On + stairs | seed0004 Scr 391→395; @297 fixed; @310 dart trap next |
| D-0424 | fixed | lookat tseen trap brief_at / trapname | seed0004 Scr 395→396; @310 fixed; @312 wall look next |
| D-0425 | fixed | describe_looked DECgraphics wall / swallow | seed0004 Scr 396→397; @312 fixed; @330 invent next |
| D-0426 | fixed | invent multi-page `(N of M)` display/pickinv | seed0004 Scr 397→403; @330/@336 fixed; @354 map `%` next |
| D-0427 | fixed | throwit land cansee→newsym | seed0004 full PASS Scr 409/409; suite 26/44 |
| D-0428 | fixed | eatcorpse acid/sick losehp rnd not 1+rn2 | seed0002 prefix 3808→4565; Scr still 54; @4565 next |
| D-0429 | fixed | @4565 udist symptom (root D-0430 drink) | closed by D-0430; not obj_resists/dog_goal |
| D-0430 | fixed | drink getobj `?` + fruit trycall + paralysis | seed0002 prefix 4565→6186; Scr 54→99; @6186 exercise next |
| D-0431 | fixed | SCR_LIGHT seffect_light/litroom + learnscroll WIS | seed0002 prefix 6186→6954; Scr 99→126; @6954 remove-curse next |
| D-0432 | fixed | SCR_REMOVE_CURSE seffect + nodisappear + trycall | seed0002 prefix 6954→8609; Scr 126→172; @8609 door next |
| D-0433 | fixed | closed-door rush bump before autoopen | seed0002 prefix 8609→8831; Scr 172→190; @8831 drinksink next |
| D-0434 | fixed | drinksink + dodrink sink yn | seed0002 prefix 8831→8863; Scr 190→194; @8863 ENCHANT_WEAPON next |
| D-0435 | fixed | SCR_ENCHANT_WEAPON seffect + chwepon | seed0002 prefix 8863→10511; Scr 194→233; @10511 confusion next |
| D-0436 | fixed | peffect_confusion + make_confused | seed0002 prefix 10511→10550; Scr 233; @10550 monmove next |
| D-0437 | fixed | u_maybe_impaired / confdir on domove | seed0002 prefix 10550→10634; Scr 233; @10634 peffect_booze next |
| D-0438 | fixed | peffect_booze + newuhs field / uhs init | seed0002 prefix 10634→11150; Scr 233; @11150 ohitmon next |
| D-0439 | fixed | ohitmon + omon_adj on mon missile hit | seed0002 prefix 11150→11309; Scr 233; @11309 u_maybe_impaired next |
| D-0440 | fixed | run-into-visible-hostile stop | seed0002 prefix 11309→11487; Scr 233; @11487 wipe_engr rn2(61) next |
| D-0441 | fixed | nh_timeout CONFUSION expiry | seed0002 prefix 11487→12222; Scr 233→242; @12222 distfleeck next |
| D-0442 | fixed | safemon keep move + dochug flee rn2(40) | seed0002 prefix 12222→12530; Scr 242→247; @12530 obj_resists next |
| D-0443 | fixed | rottenfood non-faint must start_eating | seed0002 prefix 12530→14081; Scr 247→284; @14081 healing next |
| D-0444 | fixed | peffect_healing + POT_HEALING peffects | seed0002 prefix 14081→16501; Scr 284→292 |
| D-0445 | fixed | goto_level descend fall rnd(3) | seed0002 prefix 16501→18354; Scr 292→311 |
| D-0446 | fixed | seer_turn rn1(31,15) once-per-hero | seed0002 prefix 18354→18457; Scr 311; @18457 honorific next |
| D-0447 | fixed | pickup shop append_honorific rn2(4) | seed0002 prefix 18457→19167; Scr 311→313; @19167 next_ident next |
| D-0448 | fixed | dopay money2mon/splitobj next_ident | seed0002 prefix 19167→25615; Scr 313→320; @25615 exerchk next |
| D-0449 | fixed | exerchk next_attrib_check + rn2(50) loop | seed0002 prefix 25615→25767; Scr 320; @25767 exercise/dobuzz next |
| D-0450 | fixed | zap getobj ? + RAY ubuzz/dobuzz sleep | seed0002 prefix 25767→26692; Scr 320; @26692 obj_resists next |
| D-0451 | fixed | doloot lootmon getdir + help_dir quitchar More; doforce ECMD_TIME | seed0002 26692→26883; Scr 320→322 |
| D-0452 | fixed | ureflects shield makeknown→exercise | seed0002 26883→26987; Scr 322→323; @26987 dog_goal next |
| D-0453 | fixed | travelcc clear on BFS dest + goto_level (hero Y→dog_goal udist) | seed0002 26987→27050; Scr 323; @27050 music next |
| D-0454 | fixed | do_improvisation LEATHER_DRUM + resist alev=10 + auditory monflee + dosounds HDeaf | seed0002 RNG full 27158; Scr 323; screen@54 drink compactify next |
| D-0455 | fixed | drink getobj compactify when suggested>5 | seed0002 first miss @54→@221; Scr 323→325 |
| D-0456 | fixed | pickup_prinv slightload lifting + pickup_encumbrance | seed0002 first miss @221→@229; Scr 325→326 |
| D-0457 | fixed | wield getobj SUGGEST/`- ` + compactify>5 | seed0002 first miss @229→@237; Scr 326→327 |
| D-0458 | fixed | botl Blind…Conf…Fly conditions after enc_stat | seed0002 @237→@272; Scr 327→353 |
| D-0459 | fixed | do_attack safemon “in the way” pline + end_running | seed0002 @272→@342; Scr 353→354 |
| D-0460 | fixed | look_here doname_with_price for-sale suffix | seed0002 @342→@345; Scr 354→361 |
| D-0461 | fixed | doname unpaid_cost + paydoname suppress_price | seed0002 @345→@359; Scr 361→363 |
| D-0462 | fixed | money2mon decrements `_goldCount` for botl `$:` | seed0002 @359→@363; Scr 363→559 |
| D-0463 | fixed | wear `on_msg` uses `xname` not type string | seed0002 @363→@454; Scr 559→560 |
| D-0464 | fixed | doname box locked/unlocked/trapped prefixes | seed0002 @454→@502; Scr 560→561 |
| D-0465 | fixed | #terrain TER_MAP strip traps (kind=trap) | seed0002 @502→@525; Scr 561→563 |
| D-0466 | fixed | apply getobj compactify when suggested>5 | seed0002 @525→@530; Scr 563→566 |
| D-0467 | fixed | invent `i` → itemed `Do what with` menu | seed0002 @530→@538; Scr 566→568 |
| D-0468 | fixed | dobuzz DISP_BEAM zapdir_to_glyph | seed0002 @538→@587; Scr 568→593 |
| D-0469 | fixed | distant_name observe + disco {buy} quotes | seed0002 @587→@590; Scr 593→594 |
| D-0470 | fixed | ^X Status deaf + encumbrance | seed0002 PASS Scr 595/595 |
| D-0471 | fixed | chargen rename + reset_role_filtering | seed0006 RNG 2276→6578 Scr 13→68 |
| D-0472 | fixed | dowaterdemon + S_DEMON m_initweap fallthrough | seed0006 RNG 6578→6667; @6660 summonmu |
| D-0473 | fixed | mattacku summonmu + msummon demon arms | seed0006 RNG 6667→6686; @6685 mon_arrive |
| D-0474 | fixed | levl_follower M2_STALK + mydogs prepend | seed0006 RNG full 6736; Scr 68→72 |
| D-0475 | fixed | rename tty_askname BASE cury after docorner | seed0006 Scr 72→80; @13→@22 filter page |
| D-0476 | fixed | filter reset_role_filtering tty page packing | seed0006 Scr 80→89; @22→@71 hilite_pet |
| D-0477 | fixed | Rule #2: pager dat texts in-process | remove Node fs/path/url; embed dat_text.js |
| D-0478 | fixed | hilite_pet / wc2_petattr ATR_INVERSE on tame | seed0006 Scr 89→95; @71→@77 I vs # |
| D-0479 | fixed | mondead unmap_object clears invisible I | seed0006 Scr 95→106; @77→@102 water demon |
| D-0480 | partial | vanqsort strcmpi kept; serialize coerce superseded by D-0930 | D-0483 revert glyph path; D-0930 blank-only |
| D-0481 | fixed | makemon !in_mklev newsym after spawn | seed0006 Scr 106→110; @102→@110 disclose invent |
| D-0482 | fixed | disclose invent + enl + vanq ask | seed0006 **PASS** 123/123; Scr 5014; 28/44 |
| D-0483 | fixed | revert D-0480 serialize space/tty_map_color | seed0013 restored on live LB; keep strcmpi |
| D-0484 | fixed | dofire empty-quiver continue + letter More | seed0007 RNG 2824→2832; dog_move next |
| D-0485 | fixed | dofire ready More + getdir MV_ANY capitals | seed0007 RNG 2832→3219; picklock next |
| D-0486 | fixed | vision_recalc rogue_vision for Is_rogue_level | C vision.c; not seed0007 (dlvl1) |
| D-0487 | fixed | picklock + doopen autounlock | seed0007 RNG 3219→6414; eatcorpse next |
| D-0488 | fixed | mO doset + pickup_types | seed0007 @6414 eatcorpse; prefix→7066 picklock next |
| D-0489 | fixed | #loot box pick_lock / picklock | seed0007 @7066→7142; Scr 60 |
| D-0490 | fixed | #loot MENU_FULL take-out → invent gold | seed0007 @7142→7175; exercise next |
| D-0491 | fixed | SCR_DESTROY_ARMOR / destroy_arm / erode_obj | seed0007 @7175→13259; eye_of_newt next |
| D-0492 | fixed | eye_of_newt_buzz via cpostfx | seed0007 @13259→15284; dog_move next |
| D-0493 | fixed | set_move_cmd clears travel on walk/run | seed0007 @15284→15877; Amulet_on next |
| D-0494 | fixed | Amulet_on RESTFUL_SLEEP rnd(98)/HSleepy | seed0007 @15877→15983; dowatersnakes next |
| D-0495 | fixed | drinkfountain dowatersnakes rn1(5,2) | seed0007 @15983→16339; distfleeck next |
| D-0496 | fixed | postmov hides_under rn2(5)/hideunder | seed0007 @16339→16346; mgc_atk next |
| D-0497 | fixed | mhitm_ad_drst mhitu mgc gate | seed0007 RNG full 16373; screen peel next |
| D-0498 | fixed | doset fmtstr + bool On defaults | seed0007 Scr 60→84; @38 botl next |
| D-0499 | fixed | doset per-bool pline (optfn_boolean) | seed0007 Scr 84→85; @85 Satiated next |
| D-0500 | fixed | botl hu_stat before enc_stat | seed0007 Scr 85→116; @116 loot next |
| D-0501 | fixed | lootabc display + take-out INVORDER_SORT + gold bot() | seed0007 Scr 116→126; @124 AC next |
| D-0502 | fixed | find_ac ARM_BONUS erosion (+ rings/amulet/HProt) | seed0007 Scr 126→291; @150 tin next |
| D-0503 | fixed | TIN xname known + otyp_uses_known (egg/tin) | seed0007 Scr 291→294; @161 burnt next |
| D-0504 | fixed | add_erosion_words oeroded degrees + proofs | seed0007 Scr 294→296; @293 homemade next |
| D-0505 | fixed | tin_details tintxts / homemade (cknown+spe<0) | seed0007 Scr 296→297; @297 Final Attr next |
| D-0506 | fixed | enlightenment Sleepy + Poison_res + Stealth | seed0007 **PASS** 302/302; suite 29/44 |
| D-0507 | fixed | wish parse_charges + wrp `wand of X` | seed0398 RNG 2773→2840; suite RNG +84 |
| D-0508 | fixed | trapeffect_rust_trap hero+mon rn2(5) | seed0398 RNG 2840→2853; @2852 weffects next |
| D-0509 | fixed | IMMEDIATE weffects bhit/bhito WAN_POLYMORPH | seed0398 RNG 2853→2960; @2960 collect_coords next |
| D-0510 | fixed | #wizgenesis create_particular named makemon | seed0398 RNG 2960→3026 full; Scr 0/87 next |
| D-0511 | fixed | set_playmode plname "wizard" + no u_init rewrite | seed0398 Scr 0→77; @28 drop getobj next |
| D-0512 | fixed | !verbose drop getobj leave topline + parse clear/cursor | seed0398 Scr 77→83; @48 shudder next |
| D-0513 | fixed | zapwrapup You_feel shuddering vibrations | seed0398 Scr 83→84 |
| D-0514 | fixed | done2 Dump core + stopprint rip skip + wizard topten msg | seed0398 Scr 84→87 **PASS** |
| D-0515 | fixed | ^V wiz_level_tele / level_tele numeric + deferred_goto | seed0116 2978→5910 Scr 9→79; seed5006 4182→8468 Scr 4→121 |
| D-0516 | fixed | weffects WAN_DIGGING → zap_dig horizontal beam | seed0116 5910→6246 Scr 79→101; next moveloop @6246 |
| D-0517 | fixed | wizard Force-the-gods + pleased You_feel/rn1/rnz | seed0116 6246→6373 Scr 101→107; next getbones/^V? |
| D-0518 | fixed | print_dungeon(TRUE) wizard ^V `?` force_dest | seed0116 6373→6383; seed0373 2549→2550; next makemaz |
| D-0519 | fixed | makemaz protofile + bigrm-2 / Bar-strt load | seed0116 6374→9351 Scr 107→110; seed0373 2550→3289 |
| D-0520 | fixed | soko1-1 load + builds_up difficulty + mimic/soko invent | seed0116 9351→12294 (RNG 12336/12562); Scr 110; next fill_zoo tail / place_lregion |
| D-0521 | fixed | load_soko1_1 must not fill_special_room (makelevel once) | seed0116 12294→12330 (RNG 12368/12562); Scr 110; next put_lregion_here |
| D-0522 | fixed | put_lregion_here TELE m_at reject when !oneshot | seed0116 12330→12461 (RNG 12509/12562); Scr 110; next were_change |
| D-0524 | fixed | m_avoid_soko_push_loc | seed0116 RNG full 12562; was dog_move vs fleeck @12521 |
| D-0525 | fixed | Bar-strt selection_do_randline path carve | seed0373 3289→3303; next induced_align @3303 |
| D-0526 | fixed | Bar-strt Pelias→branch + guardian weap + eel sleep | seed0373 3303→4157 RNG 4185; next shuffle @4157 |
| D-0527 | fixed | onquest firsttime qt_pager nhl_init shuffle | seed0373 4157→4159 RNG 4209; next Bar-loca @4159 |
| D-0528 | fixed | tower1 load_special + vampshift/newcham | seed0373 4159→4571 RNG 4596; next Bar-loca @4571 |
| D-0529 | fixed | Bar-loca load_special + traptype_rnd level_difficulty | seed0373 4571→5082 RNG 5133; next m_initweap @5082 |
| D-0530 | fixed | m_initweap S_TROLL polearm kit | seed0373 5082→5497 RNG 5511; next nhlib shuffle @5497 |
| D-0531 | fixed | on_locate + In_quest Bar-fila/filb + reset_xystart | seed0373 5497→6811 RNG 6849; next rndmonst_adj @6811 |
| D-0532 | fixed | rndmonst_adj quest rn2(7)→qt_montype + roles enemy* | seed0373 6811→9839 RNG 9872; next egg hatch @9839 |
| D-0533 | fixed | attach_egg_hatch_timeout + mksobj EGG set_corpsenm | seed0373 9839→9875 RNG 10034; next next_ident @9875 |
| D-0534 | fixed | mktrap WEB → makemon GIANT_SPIDER before victim rnd(4) | seed0373 9875→11957 RNG 12021; next mksobj_init @11957 |
| D-0535 | fixed | rnd_offensive_item case0 FALLTHROUGH → WAN_STRIKING | seed0373 11957→11988 RNG 12023; next collect_coords @11988 |
| D-0536 | fixed | create_monster MON_AT → enexto before makemon | seed0373 11988→12327 RNG 14397; next mineralize @12327 |
| D-0537 | fixed | mineralize In_quest goldprob/=4 gemprob/=6 | seed0373 12327→14748 RNG 14774; next rndmonst_adj @14748 |
| D-0538 | fixed | maketrap STATUE_TRAP → mk_trap_statue | seed0373 14748→15574 RNG 15601; next nhlib shuffle @15574 |
| D-0539 | fixed | makemaz bigrm-8 load_special | seed0373 15574→16261 RNG 16275; next m_initweap @16261 |
| D-0540 | fixed | m_initweap soldier/watchman polearm rn1+P_POLEARMS | seed0373 16261→19071 RNG 19086; next is_elf @19071 |
| D-0541 | fixed | m_initweap S_HUMAN is_elf kit (M2_ELF) | seed0373 19071→21730 RNG 21757; next m_initinv QUANTMECH @21730 |
| D-0542 | fixed | m_initinv S_QUANTMECH SchroedingersBox | seed0373 21730→22651 RNG 22674; next nhlib shuffle @22651 |
| D-0543 | fixed | soko1-2 load_special | seed0373 22651→24531 RNG 24545; next makemon rn2(5) @24531 |
| D-0544 | fixed | makemon LONG_WORM initworm + place_worm_tail | seed0373 24531→25654 RNG 25657; next fill_zoo @25654 |
| D-0545 | fixed | makemon MON_AT sees worm body segs | seed0373 25654→25869 RNG 25885; next m_initinv S_MUMMY @25869 |
| D-0546 | fixed | m_initinv S_MUMMY rn2(7)+MUMMY_WRAPPING | seed0373 25869→29189 RNG 29214; next nhlib shuffle @29189 |
| D-0547 | fixed | soko2-1 load_special + DRY boulder reject | seed0373 29189→29533 RNG 29554; next nhlib shuffle @29533 |
| D-0548 | fixed | soko3-1 / soko3-2 / soko4-2 load_special | seed0373 29533→30061 RNG 30129; next next_ident @30061 |
| D-0549 | fixed | level_tele endgame AMULET_OF_YENDOR grant | seed0373 30061→30065 RNG 30115; next nhlib shuffle @30065 |
| D-0550 | fixed | fire.lua load_special + endgame level_difficulty | seed0373 30065→30209 RNG 30222; next makemon female @30209 |
| D-0551 | fixed | newmonhp adult dragon In_endgame 8*m_lev | seed0373 30209→30263 RNG 30272; next next_ident vs get_location @30263 |
| D-0552 | fixed | splev pm_to_humidity HOT/WET for create_monster | seed0373 30263→30308 RNG 30336; next m_initinv S_GIANT @30308 |
| D-0553 | fixed | m_initinv S_GIANT gems / minotaur wand | seed0373 30308→30344 RNG 30351; next golemhp @30344 |
| D-0554 | fixed | newmonhp is_golem → golemhp fixed HP | seed0373 30344→30743 RNG 30755; next get_location vs next_ident @30743 |
| D-0555 | fixed | get_location_coord random double-retry | seed0373 30743→31895 RNG 31908; next salamander m_initweap @31895 |
| D-0556 | fixed | m_initweap S_LIZARD salamander spear/trident/stiletto | seed0373 31895→32011 RNG 32340; next rnd_defensive Sokoban rn2(4) @32011 |
| D-0557 | fixed | sticky g.Sokoban cleared + rnd_defensive level flag | seed0373 32011→32419 RNG 32421; next collect_coords rn2(8) @32419 |
| D-0558 | fixed | goto_level endgame resurrect Wizard + adj_lev/iswiz | seed0373 32419→32473 RNG 32473; next makewish/readobjnam @32473 |
| D-0559 | fixed | amulet_wish + readobjnam any + Wizard appear/hot | seed0373 32473→32479 RNG 32479; next getbones @32479 |
| D-0560 | fixed | In_endgame level_tele negative dest llimit+newlev | seed0373 32479→32480 getbones; next air.lua |
| D-0561 | fixed | air.lua + monclass D/E/J + setup_waterlevel/movebubbles | seed0373 RNG full 35386; Scr 23/124 residual |
| D-0562 | fixed | botl rank_of / xlev_to_rank + roles title[9] | seed0373 Scr 23→47; next print_dungeon @41 |
| D-0563 | fixed | print_dungeon tty_end_menu prompt blank row | seed0373 Scr 47→65; seed0116 110→113; next describe_level Home @43 |
| D-0564 | fixed | describe_level Home/Knox/endgame botl | seed0373 Scr 65→78; next Bar-strt ~ glyphs / dosounds @8468 |
| D-0565 | fixed | TREE terrain_glyph + S_EEL in_mklev hideunder | seed0373 Scr 78→85; next @73 Dlvl:12 walls / dosounds @8468 |
| D-0570 | fixed | mon_pmname + M2_PNAME article in x_monnam | seed0373 Scr 110→111; next Air map @110 |
| D-0571 | fixed | movebubbles air_pos S_cloud glyph + AIR/CLOUD terrain_glyph | seed0373 Scr 111→122; next enlightenment @118 |
| D-0573 | fixed | wizard ^X MAGIC attrs + Air weight_cap MAX | seed0373 Scr 123→124 **PASS**; next seed5006 dosounds @8468 |
| D-0574 | fixed | setworn oc_oprop extrinsic (RIN_REGENERATION) | seed5006 8468→8473 Scr 121→154; next level_tele rnl @8473 |
| D-0575 | fixed | confused scroll level_tele + random_teleport_level | seed5006 8473→10953 Scr 154→174; next can_make_bones @10953 |
| D-0576 | fixed | zapyourself WAN_DEATH + getdir confdir + bones debug≡wizard | seed5006 seg0 10953→11026 FULL Scr 174→182; next seg1 gemcolors @11026 |
| D-0577 | fixed | familiar_level_msg + cemetery bonesinfo | seed5006 seg1 2777→2782 Scr 182→192; suite #640 31/44 Scr 6473 |
| D-0578 | fixed | bones utrack + gettrack | save/rest track in bones; no initrack wipe after getbones; seed5006 RNG FULL |
| D-0579 | fixed | equip SUGGEST + Blindf_on / Blind vision | seed5006 Scr 217→228; seed0116 114→115; @162 next |
| D-0580 | fixed | doread confused mispronounce before seffects | seed5006 Scr 228→230; first miss @185 Die? |
| D-0581 | fixed | wizard Die?/bones yn + hidden_gold | seed5006 Scr 230→246; urexp/map residual |
| D-0582 | fixed | identify more_experienced(0,10) | seed5006 Scr 246→247; map glyphs @198 next |
| D-0583 | fixed | getbones yn leave-level gbuf mon→memory | seed5006 Scr 247→249 PASS; vision_off paint dirty |
| D-0584 | fixed | wear/puton empty getobj `[*]` not `[*?]` | seed0116 Scr 115→116; next @114 map `` ` `` vs `·` |
| D-0585 | fixed | does_block is_lightblocker_mappear | seed0116 Scr 116→125; next @117 spells / @122 insight |
| D-0586 | fixed | dospellmenu wizard turns column | seed0116 Scr 125→126; next @122 ^X armor / Teleport_control |
| D-0587 | fixed | ^X armor nudity + Teleport_control what_gives | seed0116 Scr 126→127 **PASS** |
| D-0588 | fixed | Arc-strt load + invent discard + nartifact artif | seed0361 3293→4247 RNG 3307→4323; next m_move |
| D-0589 | fixed | m_move hides_under rn2(10) stay-put | seed0361 4247→4363 RNG 4323→4414; next nhlib shuffle |
| D-0590 | fixed | ^T dotele + STRAT_CLOSE quest_talk | seed0361 4363→4368 RNG 4414→4516 Scr 161→178; next getbones |
| D-0591 | fixed | movemon deferred_goto | seed0361 4368→5483 RNG 4516→5605 Scr 178; next pick_room |
| D-0592 | fixed | do_mkroom pick_room/mkzoo | seed0361 5483→5859 RNG 5605→5934; next COURT fill_zoo |
| D-0593 | fixed | fill_zoo COURT throne/courtmon/chest | seed0361 5859→7837 RNG 5934→7974; next dosounds nsinks |
| D-0594 | fixed | place_branch mkportal + goto_level portal | seed0361 7837→7844 RNG 7974→8126 Scr 178→180; next maybe_spin_web |
| D-0595 | fixed | postmov maybe_spin_web + webmaker | seed0361 7844→7924 RNG 8126→8215 Scr 180→181; next doopen_indir |
| D-0596 | fixed | set_wear / Helmet_on fedora luck | seed0361 7924→7973 Scr 181→195; next m_move @7973 |
| D-0597 | fixed | mfndpos pool/lava/waterwall | ported; not @7973 root (see D-0598) |
| D-0598 | fixed | searches_for_item / mon_would_take_item | seed0361 7973→11065 Scr 195→198; next dmgval @11065 |
| D-0599 | fixed | rolling boulder trapeffect + launch_obj | seed0361 11065→12287 Scr 198→205; next pick_room @12287 |
| D-0600 | fixed | mktemple/priestini/newepri | seed0361 12287→12288; next doorct @12288 shrine_pos |
| D-0601 | fixed | make_niches depth + dosdoor mimic + G_GONE | niches/mimic/G_GONE; @12288 peel continued as D-0602 |
| D-0602 | fixed | pick_room wizard≡flags.debug | seed0361 12288→12294; next priest/makemon @12294 |
| D-0603 | fixed | MS_PRIEST m_initweap/m_initinv | seed0361 12294→13719 Scr 215; next pri_move @13719 |
| D-0604 | fixed | pri_move histemple_at + altar rn1 mill | seed0361 13719→13839 Scr 215; continued D-0605 |
| D-0605 | fixed | soko mimic boulder retry unreachable in C | seed0361 13839→18684 Scr 215 RNG 18774; next select_newcham_form @18684 |
| D-0606 | fixed | select_newcham_form + MAIL_DAEMON extract | seed0361 18684→21119 Scr 220 RNG 21217; next lua shuffle @21119 |
| D-0607 | fixed | minend-1 load_special | seed0361 21119→21310 Scr 222 RNG 21466; continued D-0608 |
| D-0608 | fixed | minend-1 "(" → TOOL not WEAPON | seed0361 21310→21974 Scr 224 RNG 22135; continued D-0609 |
| D-0609 | fixed | dochug MMOVE_MOVED + ranged_attk_available | seed0361 21974→22042 Scr 224 RNG 22154; continued D-0610 |
| D-0610 | fixed | m_move cnt==0 tryescape + healing use_defensive | seed0361 22042→22084 Scr 225 RNG 22261; continued D-0611 |
| D-0611 | fixed | hitval oartifact spec_abon / attk extract | seed0361 22084→22140 Scr 225 RNG 22478; continued D-0612 |
| D-0612 | fixed | mfndpos diagonal bad_rock / cant_squeeze_thru | seed0361 22140→22362 Scr 225 RNG 22664; continued D-0613 |
| D-0613 | fixed | artifact_hit / spec_dbon Grayswandir double | seed0361 22362→23015 Scr 268 RNG 24011; continued D-0614 |
| D-0614 | fixed | on_start nexttime/othertime nhl shuffle | seed0361 23015→23016 Scr 271 RNG 23269; continued D-0615 |
| D-0615 | fixed | Home distfleeck vs ^V→Dlvl:37 (diag) | superseded by D-0616 qt_pager pline |
| D-0616 | fixed | qt_pager default→pline not NHW_TEXT | seed0361 23016→23223 Scr 271→289; continued D-0617 |
| D-0617 | fixed | tower1 candle get_location_coord DRY | seed0361 23223→31644 Scr 289; next nhl shuffle vs rn2(79) |
| D-0618 | fixed | Arc-fila/filb load_special + croom get_location_coord | seed0361 31644→34204 Scr 289; next Arc-goal nhl shuffle |
| D-0619 | fixed | Arc-goal load_special + Minion nemgend/BELL mitem | seed0361 34204→42649 Scr 289 RNG 42658; next nhl shuffle @42649 |
| D-0620 | fixed | on_goal goal_first nhl shuffle | seed0361 42649→46893 Scr 296 RNG 46893; next bigrm-7 |
| D-0621 | fixed | bigrm-7 load_special | seed0361 46893→53705 Scr 296 RNG 53734; next restrap @53705 |
| D-0622 | fixed | getlev hide_monst → restrap | seed0361 53705→53773 Scr 306 RNG 53807; next create_gas_cloud @53773 |
| D-0623 | fixed | fog m_everyturn create_gas_cloud + cham decide_to_shapeshift | seed0361 53773→53815 Scr 306 RNG 53817; next movemon restrap @53815 |
| D-0624 | fixed | movemon_singlemon restrap pre-dochug | seed0361 RNG 53817→53865 full; Scr 306; next screen peel |
| D-0625 | fixed | Arc QUEST_FIRSTTIME missing | seed0361 Scr 306→309; next getpos farlook @154 |
| D-0626 | fixed | getpos auto_describe cmap / waterbody | seed0361 Scr 309→327; next @182 adjust/dialogue |
| D-0627 | fixed | is_pure wizard≡debug + convert_arg %r/%ra | seed0361 Scr 327→331; next @307 map S vs % |
| D-0628 | fixed | makemon snake hideunder needs hides_under | seed0361 Scr 331→352; next @320 Orb text |
| D-0629 | fixed | setup_role_race installs questarti for %o | seed0361 Scr 352→355; suite Scr 6818; next remaining 11 |
| D-0630 | fixed | makemon snake hideunder skips non-pit trap | seed0361 Scr 355→362; next invent/attrs @354 |
| D-0631 | fixed | ini_inv is_weptool + doname charged/weptool | seed0361 Scr 362→363; next disco @358 / attrs @360 |
| D-0632 | fixed | relobj mdrop distant_name observe (disco order) | seed0361 Scr 363→364; @358 MATCH; next attrs @360 |
| D-0633 | fixed | ^X attrs Hallu/Search/Reflect/Life + saber + hunger | seed0361 **PASS** 366/366; suite #705 **34/44** |
| D-0634 | fixed | getobj_takeoff missing-letter continue | seed0367 @1946→1975; Scr 75→155; key desync |
| D-0635 | fixed | fprefx garlic_breath → monflee | seed0367 @1975→2331; Scr 155→166; dochug rn2(40) |
| D-0636 | fixed | blue DSM dragon_armor_handling EFast | seed0367 @2331→2336; Scr 166→167; Very_fast rn2(3) |
| D-0637 | fixed | Pri-strt + Arch Priest quest role kit | seed0367 @2336→3282; Scr 167; next intemple @3282 |
| D-0638 | fixed | intemple + check_special_room TEMPLE | wired; real @3282 was teleds urooms (D-0639) |
| D-0639 | fixed | teleds must not pre-set u.urooms before spoteffects | seed0367 @3282→3310; Scr 167; next @3310 shuffle |
| D-0640 | fixed | #chat domonnoise MS_LEADER → quest_chat + Pri texts | seed0367 @3310→3332; Scr 169; next mcastu @3332 |
| D-0641 | fixed | extract AD_SPEL/CLRC + dochug undirected castmu | seed0367 @3332→3438; Scr 169; next nhlib @3438 |
| D-0642 | fixed | Pri-loca load_special + MORGUE fill_zoo | seed0367 @3438→10674; Scr 170; next fill_zoo @10674 |
| D-0643 | fixed | fill_zoo rectangular roomno gate | seed0367 @10674→13882; RNG 13909; next m_initinv @13882 |
| D-0644 | fixed | m_initinv S_DEMON/S_WRAITH/S_LICH | seed0367 @13882→15167; RNG 15181; next place_lregion @15167 |
| D-0645 | fixed | Pri-loca eastern morgue fill hx 35 | seed0367 @15167→15172; RNG 15214; next nhlib @15172 |
| D-0646 | fixed | Pri-goal load_special | seed0367 @15172→17449; RNG 17451; next minetn-2 @17449 |
| D-0647 | fixed | minetn-2 load_special + flip sbrooms | seed0367 @17449→19994; RNG 19999; next bigrm-3 @19994 |
| D-0648 | fixed | bigrm-3 load_special + mapfrag match | seed0367 @19994→26229; RNG 26235; next m_initweap @26229 |
| D-0649 | fixed | m_initweap S_ANGEL humanoid kit | seed0367 @26229→26688; RNG 26697; next nhlib @26688 |
| D-0650 | fixed | goto_level quest_portal com_pager | seed0367 @26688→26691; RNG 26698; next medusa @26691 |
| D-0651 | fixed | medusa-1 load_special | seed0367 @26691→26695; RNG 26718; next rndmonst @26695 |
| D-0652 | fixed | align_shift oldmoves cache + moves=0 thru mklev | seed0367 @26695→27121; RNG 27146; next next_ident @27121 |
| D-0653 | fixed | goodpos pool/lava is_swimmer·m_in_air | seed0367 @27121→27126; RNG 27153; next rndmonst_adj @27126 |
| D-0654 | fixed | medusa statue resists_ston + mresists extract | seed0367 @27126→33068; RNG 33076; next nhlib @33068 |
| D-0655 | fixed | Pri-fila/filb load_special + morgue roomtype | seed0367 @33068→35535; RNG 35572 Scr 175; next @35535 |
| D-0656 | fixed | getlev restore updest/dndest | plumbing; @35535 put_lregion reject (59,14) still open |
| D-0657 | fixed | C put_lregion (59,14) m_at elf zombie | diagnosed; fixed by D-0658 link_doors+hx=39 |
| D-0658 | fixed | Pri-loca link_doors_rooms + hx=39; drop rect roomno gate | seed0367 @35535→35546; RNG 35910 Scr 171; next shapeshift |
| D-0659 | fixed | vamp decide_to_shapeshift arms (fog/low-hp/vamp-form) | seed0367 @35546→38566; RNG 38592 Scr 180; next getbones |
| D-0660 | fixed | check_special_room MORGUE/… enter plines + More ownership | seed0367 RNG FULL 50125; Scr 180→202; next screen peel |
| D-0661 | fixed | doname W_WEP `(wielded)` vs hand phrasing | seed0367 Scr 202→205 prefix 76→148; next @148 materialize More |
| D-0662 | fixed | Pri QUEST_FIRSTTIME missing | seed0367 More + firsttime; Scr 205→206; next warning @148 |
| D-0663 | fixed | mon_warning / display_warning + warnlevel=1 | seed0367 Scr 206→243 prefix 148→154; next farlook gender |
| D-0664 | fixed | self_lookat pmname(umonnum,Ugender) | seed0367 Scr 243→244 prefix 154→155; next @155 tree |
| D-0665 | fixed | getpos/lookat TREE → defsyms "tree" | seed0367 Scr 244→245 prefix 155→185; next @185 altar glyph |
| D-0666 | fixed | altar_color via altarmask (unaligned CLR_RED) | seed0367 Scr 245→258; residual warn → D-0667 |
| D-0667 | fixed | see_monsters in teleds/docrt (stale Warning gbuf) | seed0367 Scr 258→267 prefix 185→203; next @203 level materialize |
| D-0668 | fixed | Pri-loca map lit=FALSE clear after mines lit-field | seed0367 @203 Z→warn; 27 cells W-vs-warn remain |
| D-0669 | fixed | tp_sensemon Unblind_telepat (amulet of ESP) | seed0367 Scr 267→291 prefix 203→209; next @209 lava |
| D-0670 | fixed | Pri goal/nexttime + Pri-goal lava lit + quest_portal pline | seed0367 Scr 291→305 prefix 209→258; next @258 intemple voice |
| D-0671 | fixed | intemple intone `canseemon` (not canspotmon) | seed0367 Scr 305→308 prefix 258→262; next @262 Warning floats |
| D-0672 | fixed | moveloop once-per-input see_monsters (Warning/ESP) | seed0367 Scr 308→312 prefix 262→278; next @278 materialize map |
| D-0673 | fixed | tower1 map lit=FALSE clear (≡ C lspo_map) | seed0367 Scr 312→315 prefix 278→283; next @283 · vs blank |
| D-0674 | fixed | does_block visible_region_at + run_regions ttl | seed0367 prefix 283→297 Scr 315→314; next @297 wall |
| D-0675 | fixed | clear_regions on mklev + goto_level stash/rest | seed0367 Scr 314→322 prefix 297→318; next @318 attributes pages |
| D-0676 | fixed | ^X attrs Fire/Shock/item_res/ESP/Warning + weapon_descr P_NONE + FAST worn equip | seed0367 **PASS** 324/324; suite PASS **35**/44 |
| D-0677 | fixed | chargen rigid only on plsel_startmenu (n>1) | seed0014 RNG prefix 1→3113 Scr 10→34; next @3113 exercise |
| D-0678 | fixed | SCR_IDENTIFY seffect_identify + invent identify_pack | seed0014 RNG prefix 3113→3199 Scr 34→43; next @3199 forcelock |
| D-0679 | fixed | forcelock + supply add_to_container + SPBOOK mrg=0 | seed0014 RNG prefix 3199→6294 Scr 43→154; next @6294 exercise |
| D-0680 | fixed | POT_SICKNESS peffect_sickness + makeknown WIS | seed0014 RNG prefix 6294→9354 Scr 154→221; next @9354 cursed_book |
| D-0681 | fixed | cursed_book + study_book too_hard + aggravate | seed0014 RNG prefix 9354→14566 Scr 221→298; next @14566 zhitm |
| D-0682 | fixed | zhitm wand-ray damage + cold destroy_items/resist | seed0014 RNG prefix 14566→16304 Scr 298→365; next @16304 dipfountain |
| D-0683 | fixed | water_damage → erode_obj(ERODE_RUST) | seed0014 RNG prefix 16304→16447 Scr 365→383; next @16447 gush/dogushforth |
| D-0684 | fixed | dogushforth/gush do_clear_area + nexttodoor | seed0014 RNG prefix 16447→16624 Scr 383→395; next @16624 dowaternymph |
| D-0685 | fixed | dowaternymph makemon + dip 21/22 + drink 28 | seed0014 RNG prefix 16624→16712 Scr 395→401; next @16712 steal |
| D-0686 | fixed | steal AD_SITM + rloc 50× rnd/rn2 | seed0014 RNG prefix 16712→17952 Scr 401→435; next @17952 dochug rn2(40) |
| D-0687 | fixed | domonnoise MS_SEDUCE nymph #chat | seed0014 RNG prefix 17952→18426 Scr 435→445; next @18426 distfleeck |
| D-0688 | fixed | assigninvlet keep letter + Boots_on Fumble rnd(20) | seed0014 RNG prefix 18426→18494 Scr 445→453; next @18494 exercise |
| D-0689 | fixed | exerper Fumbling ≡ H\|\|E (youprop.h) | seed0014 RNG prefix 18494→19636 Scr 453→459; next @19636 lspo_map |
| D-0690 | fixed | themerms Water-surrounded vault des.map | seed0014 prefix 19636→21242 Scr 459→460; next @21242 goto_level |
| D-0691 | fixed | goto_level descend Fumbling() ≡ H\|\|E | seed0014 prefix 21242→21529 Scr 460→467; next @21529 slip_or_trip |
| D-0692 | fixed | nh_timeout FUMBLING slip_or_trip rn2(4) | seed0014 prefix 21529→22582 Scr 467→481; next @22582 thitmonst |
| D-0693 | fixed | thitmonst pie DEX rnd(25) + hmon cream pie | seed0014 prefix 22582→22868 Scr 481→482; next @22868 dog_move |
| D-0694 | fixed | makeplural one_off foot→feet | seed0014 Scr 482→483; @22868 mtrack is More/key desync |
| D-0695 | fixed | unmul empty nomovemsg ≠ default | seed0014 prefix 22868→28552 Scr 483→515; next @28552 exercise |
| D-0696 | fixed | closed-door bump Fumbling() ≡ H\|\|E | seed0014 prefix 28552→32023 Scr 515→533; next @32023 create_monster |
| D-0697 | fixed | create_monster mines your_race rn2(3) | seed0014 prefix 32023→33278 Scr 533→538; next @33278 corpse_chance |
| D-0698 | fixed | ohitmon kill → mondied/corpse_chance | seed0014 prefix 33278→35611 Scr 538; next @35611 distfleeck |
| D-0699 | fixed | setworn(null,W_RINGL\|R) clears uleft/uright | seed0014 prefix 35611→36031 Scr 538; next @36031 exercise |
| D-0700 | fixed | ohitmon range==-1 rolling boulder re-extract | seed0014; boulder rests 56,10; next @35246 mdig |
| D-0701 | fixed | mons_see_trap dotrap/mintrap fan-out | seed0014 prefix 35246→36031 Scr 553→566; next @36031 exercise |
| D-0702 | fixed | travel couldsee-prefer / seenv-detour rest | seed0014 prefix 36031→40196 Scr 566→574; next @40196 mintrap |
| D-0703 | fixed | mintrap HOLE && !mindless already_seen | seed0014 prefix 40196→43068 Scr 574→575; next @43068 find_misc |
| D-0704 | fixed | find_misc bullwhip/invis + use_misc yank | seed0014 prefix 43068→43308 Scr 575; next @43308 distfleeck |
| D-0705 | fixed | lookaround mon_visible + attack_checks Wait invis | seed0014 prefix 43308→43341 Scr 575; next @43341 kick |
| D-0706 | fixed | maybe_kick_monster / kick_monster / kickdmg | seed0014 prefix 43341→43553 Scr 575; next @43553 mkobj/makemon |
| D-0707 | fixed | corpse_chance always-TRUE bigmonst/lizard/golem/… | seed0014 prefix 43553→49039 RNG 49495; next @49039 distfleeck |
| D-0708 | open | mfndpos cnt 6 vs 5; C dest~(24,12); suspect (22,10) | seed0014 @49039; only new neigh vs prior cnt=8 |
| D-0709 | fixed | EXT_CMDS `#wizwish` → wiz_wish | seed0108 2772→2778; next @2778 dochug rn2(4) |
| D-0710 | fixed | EXT_CMDS `#rub`/dorub + wield_tool; nomul clears cmdq | seed0108 2778→2807; next @2807 use_cream_pie |
| D-0711 | fixed | doapply use_cream_pie rnd(25)+ucreamed/make_blinded | seed0108 2807→2810; then D-0712 wipe |
| D-0712 | fixed | EXT_CMDS `#wipe`/dowipe + wipeoff occupation | seed0108 2807→2864; next @2864 exercise/polyself |
| D-0713 | fixed | EXT_CMDS `#polyself`/polymon controlled+mhmax | seed0108 2864→2881; next @2881 dog obj_resists |
| D-0714 | fixed | polymon `drop_weapon(1)` cantwield → dropx | seed0108 2881→2958; next @2958 distfleeck |
| D-0715 | fixed | EXT_CMDS `#invoke`/doinvoke !inv_prop nothing_happens | seed0108 2958→3011; next @3011 space/More before chest |
| D-0716 | fixed | wipe `make_blinded` sticky Blind + vision_recalc | seed0108 More restored; still @3011 EOT umov loopAgain |
| D-0717 | fixed | `set_mon_data` prorate hero `u.umovement` on slower poly | seed0108 3011→3186; next @3186 newman |
| D-0718 | fixed | `newman` after `#polyself` human (level/sex/rndexp/redist) | seed0108 3186→3564; next @3564 getbones |
| D-0719 | fixed | EXT_CMDS `#tip`/`dotip` floor ynq; unmul→deferred_goto | seed0108 RNG FULL 16958; Scr 110→148 |
| D-0720 | fixed | throw getdir `.`/`s` self + throw_obj refuse pline | seed0108 Scr 148→149; next cream Blind map |
| D-0721 | fixed | cream-pie make_blinded → vision_recalc on toggle | seed0108 Scr 149→156; next @78 polyself gnome |
| D-0722 | fixed | polymon gnome + Upolyd botl/glyph/weight_cap | seed0108 Scr 156→186; prefix 78→88 |
| D-0723 | fixed | EXT_CMDS `#monster`/domonability reflexive | seed0108 Scr 186→187; prefix 88→109; next @109 Fly |
| D-0724 | fixed | `set_uasmon` PROPSET(FLYING) FROMFORM | seed0108 Scr 187→280; rest PROPSET deferred |
| D-0725 | fixed | polymon verbose breath tip + dobreathe uen gate | seed0108 Scr 280→283; prefix 110→176; next @176 nohands |
| D-0726 | fixed | doloot nohands + #untrap could_untrap + newman individual | seed0108 Scr 283→287; prefix 176→216; next @216 open dir |
| D-0727 | fixed | `o`/doopen getdir + doforce ynq `q` + xname named | seed0108 Scr 287→292; prefix 216→280; next @280 #herecmdmenu |
| D-0728 | fixed | `#herecmdmenu`/`doherecmdmenu` self menu; NUL≠TIME | seed0108 Scr 292→293; cursors FULL; next wall color after ^V |
| D-0729 | fixed | Sokoban `wall_glyph` blue only under DECgraphics | seed0108 PASS 303/303; suite 36/44 @#810; next D-0708 |
| D-0730 | fixed | max_passive_dmg AD_ACID (+ FIRE/COLD/ELEC) | seed0399 10145→10157 RNG 10359; next @10157 m_move |
| D-0731 | fixed | unicorn mfndpos cnt7vs5 via mon drift | closed by D-0861 Is_container; next @10217 namedesc |
| D-0732 | fixed | mon_allowflags + in_your_sanctuary / temple ALLOW_SANCT | shared; seed0399 @10157 unchanged (maze nrooms=0) |
| D-0733 | fixed | mfndpos diagonal worm_cross + rogue door-cut | shared; inert for 0399/0014 (no worms / not rogue) |
| D-0734 | fixed | zhitu non-sleep + hero destroy_items AD_FIRE | seed5002 5980→6172; seg0 FULL; next themerms @6172 |
| D-0735 | fixed | use_stethoscope adjacent must return res TIME | seed5002 seg1 5668→5739; root was ECMD_OK stub |
| D-0736 | fixed | use_mirror + use_camera getdir/beam/flash | seed5002 cont 5739→5904; seg0 C FULL +1 learnwand |
| D-0737 | fixed | zhitu fatal losehp→finish_losehp_done before learnwand | seed5002 cont 5904→11643; RNG 6176→11693 |
| D-0738 | fixed | hero_seq moveloop + stethoscope seemimic/mstatusline | seed5002 cont 11643→11715; RNG 11693→11895 |
| D-0739 | fixed | mattackm mlstmv + dog_move return onscary | seed5002 cont 11715→11725; next wish rn2(181) |
| D-0740 | fixed | cmd `c` → doclose + getdir cmdassist | seed5002 RNG FULL 12167; Scr 114→125; was premature ^W wish |
| D-0741 | fixed | burnarmor erode + destroy pline/potionbreathe | seed5002 Scr 125→400; next @230 write/cmdassist |
| D-0742 | fixed | dowrite + open cmdassist + itemed throw | seed5002 Scr 400→410 **PASS**; suite 37/44 |
| D-0743 | fixed | mattackm AT_WEAP mon_wield_item → M_ATTK_MISS | seed0360 2995→3006; RNG 3098→3120; next exercise @3006 |
| D-0744 | fixed | Boots_on SPEED_BOOTS makeknown→exercise(A_WIS) | seed0360 3006→3037; RNG 3120→3186; next lua shuffle @3037 |
| D-0745 | fixed | oracle.lua load_special (rooms/DELPHI/statues) | seed0360 3037→8708; RNG 3186→8728; Scr 187→200; next castle @8708 |
| D-0746 | fixed | castle.lua load_special + mazewalk/squadmon | seed0360 8708→22925; RNG 8728→22948; Scr 200→201; next valley @22925 |
| D-0747 | fixed | valley.lua + Inhell hellish/G_NOHELL rndmonst | seed0360 22925→31374; RNG 22948→31408; Scr 201→204; next mkclass @31374 |
| D-0748 | fixed | mkclass_aligned Inhell via hellish (not GEHENNOM) | seed0360 31374→35405; RNG 31408→35443; Scr 204→207; next rnd_misc @35405 |
| D-0749 | fixed | rnd_misc_item life-saving needs !nonliving && !vampshifter | seed0360 35405→37668; RNG 35443→37686; suite #845 568288/71.68%; next shuffle @37668 |
| D-0750 | fixed | sanctum.lua load_special + peace_minded is_minion | seed0360 37668→38557; RNG 37686→38600; next rndmonst_adj @38557 |
| D-0751 | fixed | hell temperature + temperature_shift pm_resistance | seed0360 38557→41671; RNG 38600→41693; next place_lregion @41671 |
| D-0752 | fixed | sanctum teleport_region region_islev absolute | seed0360 41671→41768; RNG 41693→41793; next maybe_generate_rnd_mon @41768 |
| D-0753 | fixed | maybe_generate_rnd_mon udemigod/stronghold rate | seed0360 41768→41777; RNG 41793→41794; next lua shuffle @41777 |
| D-0754 | fixed | minetn-5.lua load_special (Grotto Town) | seed0360 41777→43248; RNG 41794→43267; suite #850 573869/72.38%; next minend-2 @43248 |
| D-0755 | fixed | minend-2.lua load_special (Wine Cellar) | seed0360 43248→52601; RNG 43267→52639; Scr 207→238; next soko4-1 @52601 |
| D-0756 | fixed | soko4-1.lua load_special (Sokoban entry) | seed0360 52601→53361; RNG 52639→53376; Scr 238→242; next tower2 @53361 |
| D-0757 | fixed | tower2.lua load_special (Vlad middle) | seed0360 53361→53591; RNG 53376→53595; Scr 242→246; next tower3 @53591 |
| D-0758 | fixed | tower3.lua load_special (Vlad entry) | seed0360 53591→55374; RNG 53595→55383; Scr 246→261; next medusa-3 @55374 |
| D-0759 | fixed | medusa-3.lua + mk_artifact A_NONE | seed0360 55374→60114; RNG 55383→60117; Scr 261→265; suite Scr 8270 RNG 74.51%; next bigrm-4 @60114 |
| D-0760 | fixed | bigrm-4.lua load_special | seed0360 60114→65027; RNG 60117→65054; Scr 265; next mkobj @65027 |
| D-0761 | fixed | makemon mlet before G_SGROUP | seed0360 65027→68428; RNG 65054→68434; Scr 265→270; next makeroguerooms @68428 |
| D-0762 | fixed | makeroguerooms + makelevel rogue skip0 | seed0360 68428→68690; RNG 68434→68694; Scr 270; next post-rogue load_special @68690 |
| D-0763 | fixed | asmodeus + hellprobs/noteleport/mlevel>49/sleep order | seed0360 68690→71832; RNG 68694→71855; Scr 270→267; next hell_tweaks @71832 |
| D-0764 | fixed | hell_tweaks + fillrect get_location xstart | seed0360 71832→72078; RNG 71855→72079; Scr 270; next juiblex/swamp @72078 |
| D-0765 | fixed | juiblex + lvlfill_swamp + map align L/R/T/B | seed0360 72078→74801; RNG 72079→74607; Scr 270→267; next walkfrom @74801 |
| D-0766 | fixed | baalz + baalz_fixup + bughack wallify | seed0360 74801→76622; RNG 74803→76625; Scr 273; next orcus @76622 |
| D-0767 | fixed | orcus + stock_room Orcus mongone invent | seed0360 76622→82982; RNG 76625→82989; Scr 273; next wizard1 @82982 |
| D-0768 | fixed | wizard1 load_special | seed0360 82982→86029; RNG 82989→86118; Scr 273; next distfleeck @86029 |
| D-0769 | fixed | m_move maybe_unhide_at | seed0360 86029→86100; RNG 86118→86137; Scr 273; next track vs slpgas @86100 |
| D-0770 | fixed | m_harmless check_in_air + mfndpos poisoncloud glyph | seed0360 86100→86170; RNG 86137→86170; Scr 273; next nhlib shuffle @86170 |
| D-0771 | fixed | wizard2 load_special | seed0360 86170→98492; RNG 86170→98507; Scr 273→275; next distfleeck @98492 |
| D-0772 | fixed | hell_tweaks `.w.` mapfrag + @98492 linedup diag | seed0360 still @98492; JS linedup boulder rn2(3) vs C distfleeck; next couldsee/m_move |
| D-0773 | fixed | @98492 linedup vs C (diag) | superseded: cause was missing minliquid (D-0775) |
| D-0774 | fixed | sp_lev map_cleanup before wallify/flip | hell loaders; seed0360 still @98492 (LOS boulder on ROOM) |
| D-0775 | fixed | movemon minliquid lava/pool | seed0360 98492→98505; RNG 98507→98528; Scr 275; next Wiz-strt @98505 |
| D-0776 | fixed | Wiz-strt load_special | seed0360 98505→100104; RNG 98528→100408; Scr 275→292; next traps @100104 |
| D-0777 | fixed | maketrap IS_AIR/CLOUD reject | seed0360 100104→100397; RNG 100408→100887; Scr 292; next distfleeck @100397 |
| D-0778 | fixed | m_move Tengu nature teleport | seed0360 100397→100738; RNG 100887→104024; Scr 292; next mfndpos chcnt @100738 |
| D-0779 | fixed | getpos seenv (peel cause superseded by D-0782) | seed0360 100738→101022 then D-0782 |
| D-0780 | fixed | lock.js getdir `'.'` = GETDIR_SELF | seed0360 Scr 292→293; #chat/kick/open path; peel unchanged |
| D-0781 | fixed | dochug/postmov mon_offmap gates | plumbing for portal migrate |
| D-0782 | fixed | Wiz-strt branch FlipY + MAGIC_PORTAL migrate | seed0360 101022→101930; Scr 294→389; RNG 105212 |
| D-0783 | fixed | Gloves_on POWER + Cloak_on DISPLACEMENT makeknown | seed0360 101930→104904; Scr 389→391; RNG 107246 |
| D-0784 | fixed | dotravel seenv\|\|couldsee (drop couldsee-only prefer) | seed0360 104904→108368; RNG 109279; seed0014→50259 |
| D-0785 | fixed | kick_ouch/dumb set_wounded_legs ATEMP(DEX)-- | seed0360 108368→108369; RNG 109615 |
| D-0786 | fixed | dokick Wounded_legs legs_in_no_shape + More | seed0360 108369→109077; suite RNG 109603 |
| D-0787 | fixed | wiz_map ^F do_mapping exercise(A_WIS) | seed0360 109077→109454; suite RNG 110391 |
| D-0788 | fixed | TRAVP_GUESS hero-matrix + raster pick (not displ) | seed0360 109454→110844; suite RNG 111367 |
| D-0789 | fixed | dotele clear travelcc before tele (^T getpos) | seed0360 110844→110880; suite RNG 111566 |
| D-0790 | fixed | m_move post-select mux-image → m_move_aggress DONE | seed0360 110880→112243; focused RNG 112272 |
| D-0791 | fixed | attack_checks WAITMASK + is_safemon canspotmon + wake G_UNIQ | seed0360 still @112243; Neferet CLOSE next |
| D-0792 | fixed | Wizard ldrnum + mundisplaceable | leader_m_id; refuse leader swap; CLOSE-clear @112243 falsified |



| D-0569 | fixed | Fire lit epilogue + monster do_light_sources | seed0373 Scr 101→110; next Wizard Monnam @101 |
| D-0568 | fixed | doname the_unique_obj + print_dungeon bot restore | seed0373 Scr 100→101; next Fire vision @100 |
| D-0567 | fixed | Sokoban premap_detect + solidify + flip spines + wall CLR_BLUE | seed0373 Scr 88→100; next @99 Fire / Amulet phrasing |
| D-0566 | fixed | bigrm light_region + IRONBARS + makemon hide/minvis + HI_LORD | seed0373 Scr 85→88; next @78 Dlvl:6 walls |

| D-0523 | fixed | m_calcdistress → were_change / new_were | seed0116 12461→12521 (RNG 12554/12562); Scr 110; next fleeck/dog_move |





D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

