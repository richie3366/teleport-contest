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
| D-0480 | partial | vanqsort strcmpi kept; serialize coerce reverted | D-0483; LB gap still open |
| D-0481 | fixed | makemon !in_mklev newsym after spawn | seed0006 Scr 106→110; @102→@110 disclose invent |
| D-0482 | fixed | disclose invent + enl + vanq ask | seed0006 **PASS** 123/123; Scr 5014; 28/44 |
| D-0483 | fixed | revert D-0480 serialize space/tty_map_color | judge 23→22 correlated; keep strcmpi |
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

| D-0569 | fixed | Fire lit epilogue + monster do_light_sources | seed0373 Scr 101→110; next Wizard Monnam @101 |
| D-0568 | fixed | doname the_unique_obj + print_dungeon bot restore | seed0373 Scr 100→101; next Fire vision @100 |
| D-0567 | fixed | Sokoban premap_detect + solidify + flip spines + wall CLR_BLUE | seed0373 Scr 88→100; next @99 Fire / Amulet phrasing |
| D-0566 | fixed | bigrm light_region + IRONBARS + makemon hide/minvis + HI_LORD | seed0373 Scr 85→88; next @78 Dlvl:6 walls |

| D-0523 | fixed | m_calcdistress → were_change / new_were | seed0116 12461→12521 (RNG 12554/12562); Scr 110; next fleeck/dog_move |





D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

