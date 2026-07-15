# Divergence index

Lookup by ID, then open **one** matching `## D-NNNN` section in
`DIVERGENCE-LOG.md`. Do **not** read the full log by default.

| ID | Status | Area | Short result |
|---|---|---|---|
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

D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

