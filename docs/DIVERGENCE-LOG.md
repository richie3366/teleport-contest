# Divergence log

Evidence-backed history of important C↔JS divergences. Active speculation stays
small in `NOTES.md`; once a cause is proved or a dead end is expensive enough
to preserve, record it here.

## Record format

Each entry should include:

- **Status:** open / parked / fixed / rejected hypothesis
- **Observed:** session, channel, first meaningful divergence
- **C locus:** file + function (line numbers optional and version-sensitive)
- **Cause/evidence:** why the diagnosis is established
- **Change:** JS semantic unit changed, without trace alignment
- **Verification:** focused, green, cohort, and full-run commands/results
- **General lesson:** only when reusable

Do not record a guessed cause as fixed merely because an RNG prefix moved.

## Index

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

D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

## D-0001 — blocking `--More--` owns input keys

- **Observed:** `seed0900-tourist-explore-actions`, RNG divergence near 2936.
- **C locus:** `pline.c`/tty `more()` and callers in pet combat.
- **Cause/evidence:** C blocked on topline `--More--` and consumed 59 reject
  keys followed by ESC. JS lacked the blocking prompt, so those keys became
  later gameplay commands.
- **Change:** ported `pline`/`more` input behavior and combat messages; async
  propagation reaches `nhgetch` without reordering physics.
- **Verification:** seed0900 RNG 2983/2983 and screens 84/84; seed8000 remained
  fully green.
- **Lesson:** map keys to input boundaries before attributing an RNG mismatch
  to game logic.

## D-0002 — vault gold merge

- **Observed:** seed1800 divergence around RNG 1057.
- **C locus:** C gold placement/merge path (`mkgold` and object lists).
- **Cause/evidence:** C merged into an existing gold stack; JS allocated a new
  object and consumed `next_ident`/`rnd(2)`.
- **Change:** use the C merge path and preserve object-list semantics.
- **Verification:** focused seed1800 prefix advanced; both green sessions held.

## D-0003 — tutorial and fortune cookie input ownership

- **Observed:** seed1800 divergence around 2362.
- **C locus:** startup tutorial prompt and `eat.c` rumor path.
- **Cause/evidence:** the rc did not disable the tutorial. `n` answered its
  yes/no prompt; it was not a north command. Later `e b` ate the cookie and
  entered `outrumor`/`getrumor`.
- **Change:** ported the prompt/key ownership and cookie rumor path.
- **Verification:** focused seed1800 advanced through the cookie sequence;
  green sessions held.

## D-0004 — starting-pet apport

- **Observed:** seed1800 divergence around 2403.
- **C locus:** `dog.c:makedog`/`initedog`, `attrib.c:acurr`.
- **Cause/evidence:** `makedog` runs before initial attributes are established.
  Non-Strength `ACURR` clamps to 3, so the starting pet gets `apport=3`.
  A JS `|| 10` fallback changed the later `rn2(8)` decisions.
- **Change:** ported the clamp and removed the invented fallback.
- **Verification:** focused seed1800 advanced; green sessions held.

## D-0005 — thrown object stops before blocked terrain

- **Observed:** JS embedded the dart in a wall; C placed it on stairs at
  `(47,18)` in the current seed1800 trace.
- **C locus:** `zap.c:bhit`, called by `dothrow.c:throwit`.
- **Cause/evidence:** C backs up/stops when the next cell is not `ZAP_POS` or is
  a closed door. JS only treated stone as blocking.
- **Change:** use the C terrain predicate/order.
- **Verification:** dart landing and RNG advanced to the current pet-movement
  divergence; green sessions held.
- **Lesson:** the coordinate is evidence, not the implementation rule.

## D-0006 — pet selection after dart APPORT

- **Status:** parked. Do not spend another loop iteration on it until the C
  state/candidate-set falsifier below is executable.
- **Observed:** `seed1800-tourist-eat-throw`, first RNG divergence at index
  2417. C calls `rn2(1)` in `dog_move`; JS calls `dogfood`/`obj_resists` on the
  dart first.
- **C locus:** `dogmove.c:dog_goal`, `dog_move`, and `mon.c:mfndpos`.
- **Established state:** JS pet `(48,17)`, hero `(48,18)`, APPORT goal dart
  `(47,18)`, squared `udist=1`, `mconf=0`, `mflee=0`, pet `apport=3`.
- **Rejected hypotheses:**
  - reject the dart in `can_carry`: contradicted by an earlier C APPORT success;
  - gate behavior on raw RNG index/coordinates: advanced the trace but broke
    seed0900 and violates the Constitution;
  - treat `LOST_THROWN` as a general carry rejection: not present in C.
- **Useful experiment (not shipped):** forcing `appr=0`, omitting candidate
  `(47,16)`, and ending selection after dart `dogfood` reached RNG 2435. This
  narrows the state/candidate-set question but is not a fix.
- **Next falsifier:** build/verify the recorder, add local-only instrumentation
  (never a production JS oracle) for C pet position, `gg`, `appr`, and exact
  `mfndpos` candidates/flags at this turn, then compare branch-by-branch before
  changing selection. No verified recorder binary/instrumentation command is
  currently available, so `rng-diff` alone is insufficient.
- **Required gate:** seed8000 + seed0900 remain fully green.

## D-0007 — role/race `mnum` identity (array index vs PM_*)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** 33/44 public sessions threw `u_init_role: role not ported`.
  Even Tourist matched only via `mnum === 10` (roles[] index) or name fallback.
- **C locus:** `role.c` `roles[].mnum` / `races[].mnum`; `u_init.c`
  `Role_switch` / `Race_switch` (`PM_ROGUE`, `PM_TOURIST`, `PM_HUMAN`, …).
- **Cause/evidence:** JS stored roles[] indexes (`Rogue=8`, `Tourist=10`,
  `human=0`) where C stores monster-table IDs (`338`, `340`, `260`).
- **Change:** `js/roles.js` uses generated `PM_*` constants; Rogue attrs/gods/
  `petnum`; `u_init.js` ports Rogue `trobj` + blindfold/`knows_object(SACK)` /
  dagger `knows_class` stand-in + wield/wear for short sword / leather armor.
- **Omissions named in C-JS-MAP:** `Skill_R`; full `knows_class` needs
  `oc_skill` in objects extractor; other roles still throw.
- **Verification:** green exact-length PASS; Rogue cohort no longer throws
  `role not ported` (seed1500 RNG 1173/2768; seed0013 519/4838). Role throws
  on full suite now **29/44**.
- **Lesson:** identity fields that drive `switch (Role_switch)` must come from
  the monster table, not the roles[] enumeration order.

## D-0008 — Tourist welcome/HP/align hardcodes vs Rogue first screen

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after Rogue `u_init_role` existed, `allmain.js` still emitted
  `Aloha … neutral …` and forced `HP:10` / `ualign.type=0`. Rogue sessions
  expect `Hello … chaotic … Rogue` and `HP:12(12)`.
- **C locus:** `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp` +
  `exper.c:newpw` at `u.ulevel==0`; `u_init.c` align from
  `aligns[flags.initalign]`; `insight.c` pantheon/`wallet` lines.
- **Cause/evidence:** Tourist-shaped literals ignored role `hpadv` (Rogue
  infix 10 + human 2 = 12) and rc `align:chaotic`.
- **Change:** `Hello(mnum)`, role/race `hpadv`/`enadv`, `newhp`/`newpw`, rc
  align → `ualign`, `welcome()`, invent pantheon + empty wallet.
- **Verification:** green PASS + strict lengths; Rogue step0/1 show
  `Hello … Rogue` and `HP:12` (remaining cell diffs = attrs/map after mklev
  RNG diverge).
- **Lesson:** shared startup display must read role/race/rc tables, not the
  first green seed’s literals.

## D-0009 — Rogue legacy pantheon/layout, botl flags, moon/friday

- **Status:** fixed (verified 2026-07-12).
- **Observed:** Rogue legacy `Book of Mog` vs C `Kos`; status always
  `Xp:N/0 T:T` vs C `Xp:N` when `!showexp`/`!time`; welcome `--More--`
  skipped before tutorial; seed0013 missing full-moon / Friday-13 plines.
- **C locus:** `quest.lua` `%d`/`%G` + `questpgr.c:convert_arg`;
  `pray.c:align_gname`/`align_gtitle`; `wintty.c` NHW_MENU `offx`;
  `botl.c` plname capitalize + `flags.showexp`/`flags.time`;
  `calendar.c:phase_of_the_moon`/`friday_13th`; `allmain.c:moveloop_preamble`.
- **Change:** `js/questpgr.js` alignment deity + offx layout; Tourist
  `ngod='_The Lady'`; `status_line_2` gates Xp/T; `flush_topl_more` before
  tutorial menu paint; `js/calendar.js` + preamble moon/friday + `change_luck`.
- **Verification:** green PASS + strict; seed1500 legacy/welcome text+cursor
  match (attrs still diverge); seed0013 moon/friday message lines match.
- **Next peel:** cleared by D-0010; then `start_corpse_timeout` (idx 1194).
- **Lesson:** shared startup UI must follow C convert_arg / tty menu geometry
  and datetime calendar, not Tourist-shaped constants.

## D-0010 — makemon skipped `m_initweap` (ordinary armed envelope)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1112**: C `rn2(4)` @
  `m_initweap` (S_KOBOLD darts) vs JS `rn2(50)` @ `m_initinv_tail` only.
- **C locus:** `mondata.h:is_armed` / `attacktype(AT_WEAP)`;
  `makemon.c:m_initweap` / `m_initthrow` / `mongets`; call from `makemon`
  when `allow_minvent`.
- **Cause/evidence:** JS never called `m_initweap`; kobold shaman lacks
  AT_WEAP so mlet-only `is_armed` would be wrong — extractor now emits
  `has_at_weaps`.
- **Change:** `scripts/extract-monsters.py` + `has_at_weaps`; `is_armed` in
  `monsters.js`; `m_initthrow`/`mongets`/`m_initweap` ordinary envelope in
  `makemon.js` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/
  S_HUMANOID + default; trailing `rn2(75)` offensive gate).
- **Verification:** green PASS + strict; seed1500 first mismatch moves to
  idx **1194** `start_corpse_timeout`; runner 1275/2768; seed0060 2464/3626;
  full suite 2/44, RNG 25334/792838, screens 108/11405.
- **Omissions:** S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials;
  `m_initinv` body; `add_to_minv` merge; demon→default FALLTHROUGH;
  `rnd_offensive_item` hard-helmet FALLTHROUGH.
- **Lesson:** gate invent on real AT_WEAP, not mlet; port throw/mongets
  before invent-tail RNG.

## D-0011 — `mkcorpstat` skipped timeout restart after special random corpse

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1194**: C `rn2(1000)` @
  `start_corpse_timeout` vs JS `rn2(8)` (already into next room fill). DIAG:
  random `mksobj` CORPSE picked `PM_LICHEN` → first timeout no-ops; C
  `mkcorpstat` override to trap victim restarts because
  `special_corpse(old)`; JS overrode corpsenm without restart.
- **C locus:** `mkobj.c:start_corpse_timeout`, `special_corpse`,
  `mkcorpstat` ptr-override restart; `mklev.c:mktrap_victim`.
- **Change:** full `start_corpse_timeout` RNG envelope (lizard/lichen,
  `rnz(rot_adjust)`, rider/troll branches); `special_corpse` +
  `mkcorpstat` restart; `age` on `mksobj`; trap-victim `TAINT_AGE` age
  adjust. Timer fire / `zombie_form` still deferred.
- **Verification:** green PASS + strict; seed1500 first mismatch → idx
  **2223** (`m_initinv` vs `m_initinv_tail`); runner 2255/2768, screen 1/40;
  seed0060 2464/3626; full suite 2/44, RNG 26314/792838, screens 109/11405.
- **Lesson:** lichen/lizard/troll/rider random corpses force a second
  `start_corpse_timeout` after `mkcorpstat` override — skipping the restart
  drops the entire `rnz` leaf.

## D-0012 — `is_poisonable` wrongly included daggers

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **2223**: C `rn2(10)` @
  `trquan` (Rogue dagger `ini_inv_adjust_obj`) vs JS `rn2(100)` still inside
  dagger `mksobj_init`. Prior notes misread provenance as `m_initinv`.
- **C locus:** `obj.h:is_poisonable` (missile `oc_skill` in
  `-P_SHURIKEN..-P_BOW`, or `permapoisoned`); `mkobj.c:mksobj_init`
  `is_poisonable && !rn2(100)`.
- **Cause/evidence:** DIAG stack at 2223 was `mksobj_init` poison roll.
  JS listed `DAGGER`/`SPEAR` as poisonable; C does not. Short sword already
  skipped the roll (not in the bad list), so invent matched until dagger.
- **Change:** `js/mkobj.js` `is_poisonable` ≡ `is_multigen` (name-list stand-in
  for the missile skill window); `permapoisoned` (Grimtooth) deferred.
- **Verification:** prefix moved to idx **2240** (sack); after D-0013 →
  **2298**. Green PASS + strict; cohort seed1500 2348/2768, seed0060
  2478/3626; full suite 2/44, RNG 26409/792838, screens 109/11405.
- **Lesson:** trust C macros over “weapons that can be poisoned in play”;
  `trquan` provenance mid-mklev timeline is invent after `makedog`, not
  monster invent.

## D-0013 — starting SACK omitted `mkbox_cnts`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2240** after D-0012: C `rn2(1)` @ `trquan`
  (sack adjust) vs JS already at blindfold `rn2(5)`. C had an extra
  `mkbox_cnts` `rn2(1)` with `n=0` for empty starting sack.
- **C locus:** `mkobj.c:mksobj_init` TOOL_CLASS FALLTHROUGH `SACK` →
  `mkbox_cnts`; `mkbox_cnts` empty-sack when `moves<=1 && !in_mklev` still
  does `rn2(n+1)`.
- **Change:** call `mkbox_cnts` for `SACK`/`OILSKIN_SACK`/`BAG_OF_HOLDING`/
  `ICE_BOX`; port empty-starting-sack `n=0` branch.
- **Verification:** with D-0012; seed1500 first mismatch → idx **2298**
  (`dog_goal`); green + strict PASS; full suite as in D-0012.
- **Lesson:** empty containers can still consume RNG; TOOL_CLASS fallthrough
  into `mkbox_cnts` is not chest-only.

## D-0014 — mineralize always placed gold/gems on `fobj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2298**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` (extra `obj_resists`). DIAG: first in-bbox floor object was
  gold on STONE behind a wall — `can_reach_location` false — so JS skipped
  APPORT and rolled `dogfood` on the next object.
- **C locus:** `mklev.c:mineralize` — `!rn2(3) ? add_to_buried : place_object`;
  `mkobj.c:add_to_buried` threads `buriedobjlist`, not `fobj`.
- **Cause:** JS consumed `rn2(3)` but always `place_object`, so buried mineral
  gold stayed on `fobj` and polluted `dog_goal` scans.
- **Change:** `js/mkobj.js` `add_to_buried`; `js/mklev.js` mineralize gold/gem
  branch matches C bury-vs-place; set `ox`/`oy`/`owt` before bury/place.
- **Verification:** idx **2298** `rn2(8)` matches; next break **2300**. Green
  PASS + strict; cohort seed1500 2343/2768, seed0060 2494/3626; full suite
  2/44, RNG 26445/792838, screens 109/11405.
- **Lesson:** RNG-consuming stubs that ignore the branch still change later
  observable state (`fobj` membership), not just the log.

## D-0015 — tainted CORPSE must be POISON in `dogfood`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after D-0014, JS set `gtyp=CADAVER` over APPORT for room
  corpse (`corpsenm=PM_ORC`, `age=-50` from mklev `age -= TAINT_AGE+1`), then
  entered follow-player `rn2(4)` while C kept APPORT and continued scanning.
- **C locus:** `dog.c:dogfood` — `peek_at_iced_corpse_age(obj)+50 <= moves`
  → POISON (before CADAVER return).
- **Change:** `js/dogmove.js` CORPSE case age check; also port
  `cursed_object_at` into `dog_goal` (was omitted).
- **Verification:** JS no longer takes follow `rn2(4)` here; mismatch is C
  `rn2(100)` vs JS `rn2(5)` @ idx **2300** (3 missing `obj_resists`). Green
  + strict PASS; suite as D-0014.
- **Lesson:** mklev-tainted corpses are intentionally inedible; treating them
  as CADAVER lets food goals clobber APPORT and desync the follow branch.
- **Named omission:** full `poisonous`/`acidic`/`carnivorous` via `mflags1`
  still deferred (age path covers this corpse).

## D-0016 — `mktrap_victim` created loot but never placed it

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2300**: C three extra `obj_resists` before
  `distfleeck`; JS `fobj` bbox had only APPORT gold + tainted CORPSE.
- **C locus:** `mklev.c:mktrap_victim` — `place_object` for trap ammo
  (ARROW/DART/ROCK) and each cursed possession; gnome candle likewise;
  PIT (ex-landmine) uses `breaktest` then dealloc instead of place.
- **Cause:** JS `mksobj`/`mkobj`+`curse` consumed creation RNG but left
  objects off `fobj`, so `dog_goal` never `dogfood`’d them. seed1500 trap
  was DART_TRAP with two possessions (food+gem) → exactly 3 missing scans.
- **Change:** `js/mklev.js` `mktrap_victim` places ammo/possessions/candle;
  local `mktrap_breaktest` for PIT debris (RNG-consuming like C `breaktest`).
- **Verification:** first mismatch **2300→2517** (`dog_move` cursed-square
  `rn2(39)`); runner seed1500 2518/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26624/792838, screens 109/11405.
- **Lesson:** levelgen helpers that “create for flavor” without C’s
  `place_object`/`add_to_buried` desync later pet scans even when creation
  RNG already matched.
- **Named omission:** `mkgrave_room` still skips `add_to_buried` for its
  gold/loot; `begin_burn` for unlit gnome candles deferred.

## D-0017 — `dog_move` cursed-square `uncursedcnt` / `cursemsg`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2517**: C `rn2(39)` @ `dogmove.c:1238`
  (`rn2(13*uncursedcnt)` with `uncursedcnt==3`); JS `rn2(1)` (approach
  `!rn2(++chcnt)` — never took the cursed continue).
- **C locus:** `dogmove.c:dog_move` — pre-loop `uncursedcnt` skips
  blocked `MON_AT` and `cursed_object_at`; candidate loop sets
  `cursemsg[i]` on cursed pile objects; then
  `cursemsg[i] && !mleashed && uncursedcnt>0 && rn2(13*uncursedcnt)` continue.
- **Cause:** JS counted every `mfndpos` slot as uncursed and skipped cursed
  food objects without setting `cursemsg`, so the cursed-square RNG never ran.
- **Change:** `js/dogmove.js` `dog_move` ports the count loop, `cursemsg`,
  and cursed continue (food-eat still collapses to immediate move).
- **Verification:** first mismatch **2517→2522** (`next_ident` + WEAPON
  `mksobj_init`); runner seed1500 2526/2768, seed0060 2494/3626; green PASS
  + strict; full suite 2/44, RNG 26664/792838, screens 109/11405.
- **Lesson:** pets’ “avoid cursed unless forced” is two-phase (count then
  probabilistic skip); inventing approach RNG without that skip desyncs
  quietly even when `dog_goal` APPORT already matches.
- **Named omission:** food `goto newdogpos` / eat side effects still partial;
  leash / trap / displace / minion branches deferred.

## D-0018 — pet `postmov` dart trap + `m_cansee` clear_path

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2522**: C `rnd(2)` @ `next_ident` then WEAPON
  `mksobj_init` (`rn2(6)`/`rn2(11)`/`rne(3)`) + erosions +
  `trapeffect_dart_trap`/`thitm`; JS `rnd(5)` from `score_targ`.
- **C locus:** `monmove.c:m_move` → `postmov` → `mintrap`;
  `trap.c:trapeffect_dart_trap` → `t_missile(DART)`; `vision.h:m_cansee` ≡
  `clear_path`. Provenance after approach selection: dart create, not
  `mongets`.
- **Cause:** (1) JS `m_move` returned `dog_move` without `postmov`/`mintrap`.
  (2) `find_targ` stubbed `m_cansee` always-true, so `pet_ranged_attk` scored
  a newt through walls (`rnd(5)`) before the step.
- **Change:** `js/trap.js` dart monster path (`t_at`/`t_missile`/`thitm`/
  `mintrap`); `js/monmove.js` `postmov` after pet `dog_move`;
  `js/vision.js` export `clear_path`/`m_cansee`; `js/dogmove.js` use
  `m_cansee` in `find_targ`/`find_friends`, return `MMOVE_MOVED` when
  stay-put (C).
- **Verification:** first mismatch **2522→2563** (`dog_invent` `rn2(udist)`
  4 vs 10); runner seed1500 2598/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26687/792838, screens 109/11405.
- **Lesson:** post-move weapon RNG is often trap ammo (`t_missile`), not
  monster invent; LOS stubs that always see through walls inject
  `score_targ` fuzz RNG before the real caller.
- **Named omission:** non-dart `trapeffect_*`; `thitm` hit/`dmgval`/
  `monkilled`; `stackobj` merge; `dog_invent` real pickup (`mpickobj`).

## D-0019 — cursemsg/--More-- keys + dog_invent pickup + seen-trap skip

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2563**: C `rn2(4)` @ `dog_invent` vs JS
  `rn2(10)` (udist 4 vs 10). Pet stayed put after dart; hero should be
  ortho dx=2 after `k`, but JS hero had walked during pending `--More--`.
- **C locus:** `dogmove.c:dog_move` cursemsg `pline` (reluctantly onto);
  `trap.c:thitm` miss `pline` (almost hit); `dog_invent` `mpickobj` +
  droppables/`rn2(udist+1)`; `mfndpos` `ALLOW_TRAPS` + `seetrap`/`tseen`
  `rn2(40)` skip.
- **Cause:** (1) Missing cursemsg + thitm plines → no `--More--`, so keys
  `l,l,j,j,h,h,.` moved the hero instead of being eaten (udist diverged).
  (2) `dog_invent` only stubbed pickup RNG → no minvent → wrong APPORT
  `rn2(8)` / drop path. (3) No `tseen`/`ALLOW_TRAPS` candidate skip.
- **Change:** cursemsg + thitm miss plines; `obj_extract_self`/`mpickobj`;
  `droppables` + drop RNG; dog_goal lit/`m_cansee` APPORT gates; `seetrap`;
  mfndpos `ALLOW_TRAPS`; dog_move `rn2(40)` skip; CORPSE `doname` corpsenm.
- **Verification:** first mismatch **2563→2618** (wild `m_move` track
  `rn2(20)` vs `rn2(24)`); runner seed1500 **2700/2768**, seed0060
  2493/3626; green PASS + strict; full suite 2/44, RNG **26858**/792838,
  screens 109/11405.
- **Lesson:** message `--More--` is position-critical; invent stubs that
  skip `mpickobj` still break later `dog_has_minvent` gating.
- **Named omission:** `relobj` body; `splitobj`; `couldsee` for
  `in_masters_sight`; full `droppables` tool-keeping; `m_harmless_trap`;
  non-pet `mon_knows_traps` skip in mfndpos.

## D-0020 — mon_allowflags OPENDOOR for nohands/verysmall

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2618**: C `rn2(20)` @ `m_move` track vs JS
  `rn2(24)`. DIAG at mismatch: newt at (70,7) with `cnt=6` including closed
  door (70,8) `D_CLOSED`; C `cnt=5`.
- **C locus:** `mon.c:mon_allowflags` `can_open =
  !(nohands(data)||verysmall(data))`; `mfndpos` skips closed doors without
  `OPENDOOR`.
- **Cause:** JS always `| OPENDOOR`. Newts are verysmall+nohands → must not
  open doors → closed-door neighbors must be omitted from `mfndpos`.
- **Change:** extract `mflags1` (`scripts/extract-monsters.py`);
  `nohands()`; `mon_allowflags` gates `OPENDOOR` on `can_open`.
- **Verification:** first mismatch **2618→2702** (JS log ends after
  wipe_engr; C continues `distfleeck`); runner seed1500 **2702/2768**,
  seed0060 2489/3626; green PASS + strict; full suite 2/44, RNG
  **26889**/792838, screens 109/11405.
- **Lesson:** `mfndpos` cnt is allowflags-sensitive; never grant OPENDOOR
  to all species.
- **Named omission:** full `mon_allowflags` (unlock/bust/dig/bars); 
  `mon_knows_traps` skip; `m_harmless_trap`; `bad_rock` diagonal squeeze.

## D-0021 — missing `doapply` / lock-pick turn (deferred movemon)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first mismatch at idx **2702**: C `distfleeck` after
  wipe_engr; JS RNG log ended. Hypothesis that JS exited early for
  `umovement`/`encumbrance` was **falsified** (DIAG: `cap=0`, `umove_after=12`).
- **Cause:** JS treated `a`/`e`/`l` as unknown / eat / move. C sequence is
  `doapply` → getobj lock pick (`e`) → `pick_lock` direction (`l`) →
  "You see no door there." → `PICKLOCK_LEARNED_SOMETHING` → `ECMD_TIME` →
  following `movemon`. Without that turn, JS deferred the post-`l` monster
  slice until later `s` keys, then stopped one search-turn short of C.
- **C locus:** `apply.c:doapply` (`LOCK_PICK` case); `lock.c:pick_lock`
  non-door branch; `cmd.c:get_adjacent_loc` / `getdir`.
- **Change:** `js/apply.js` + `js/lock.js`; wire `a` in `cmd.js`.
- **Verification:** `rng-diff` seed1500 **RNG OK (2768)**; runner
  2768/2768 RNG, screens 1/40; seed0060 still 2489/3626; green PASS +
  strict; full suite 2/44, RNG **26980**/792838, screens 109/11405.
  seed1800 also RNG OK (2458) in this measure (display still 0/26).
- **Lesson:** free-looking keys can be getobj/getdir replies; attribute
  menus and apply prompts own nhgetch keys. Do not diagnose post-EOT
  `umovement` until key ownership matches C.
- **Named omission:** `feel_location` / `update_mapseen_for` glyph gating
  (no-door always LEARNED/TIME); container-at-feet pick; real door
  lock occupation; non-pick apply tools (sack, etc.).

## D-0022 — `newsym` omitted floor objects; SDOOR drew as `?`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **1/40** with RNG complete. First fail at
  welcome `--More--` (screen idx 1): C showed `%`/`$` on the starting room
  floor and a continuous bottom wall; JS showed floor dots and `└?─…`.
- **Cause:** JS `newsym` painted hero/monster/terrain only — never
  `vobj_at` / `map_object`. Separately, `terrain_glyph` lacked `SDOOR`/
  `SCORR`, so secret doors fell through to default `?`. CORPSE map color
  must use `mon_color(corpsenm)` (orc → CLR_RED), not
  `objects[CORPSE].oc_color` (brown).
- **C locus:** `display.c:newsym` / `_map_location` / `map_object` /
  `back_to_glyph` (SDOOR→wall); `display.h:vobj_at`/`covers_objects`;
  glyph color `mon_color` for `GLYPH_BODY_*`.
- **Change:** `js/display.js` object layer + SDOOR/SCORR; extractor
  `mcolors` + `js/monsters.js` export for corpse colors.
- **Verification:** seed1500 **34/40** screens (RNG 2768); seed1800
  screens **0→10**/26; green PASS + strict; full suite 2/44, RNG
  26980/792838, screens **156**/11405.
- **Lesson:** screen coords use `setCell(x-1, y+1)`; diagnose map glyph
  misses before UI. Object creation RNG matching does not imply objects
  are drawn.
- **Named omission:** trap glyphs in `newsym`; full `wall_angle` for
  SDOOR junctions; pile-top glyph flags; hallucination/`newsym_rn2`.

## D-0023 — tutorial menu was title-centered, not C NHW_MENU offx

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **34/40** after D-0022. First fails at
  idx 2–3: C title at col 21 with full y/n/OPTIONS/(end) menu and cursor
  `[27,6]`; JS centered only the title (`pad=(80-23)/2` → col 28) and left
  leftover text after `n`.
- **Cause:** `ask_do_tutorial` never built a real corner `NHW_MENU`. C
  `tty_end_menu` sets `maxcol = max(strlen+2)` (OPTIONS footer → 59) and
  `offx = max(10, 80-maxcol-1)` → 20; `process_menu_window` paints a
  leading space at offx then text (title via `menu_headings` /
  `ATR_INVERSE` after `adjust_menu_promptstyle(WIN_INVEN)`).
- **C locus:** `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow(NHW_MENU)` / `process_menu_window`;
  `allmain.c`/`options.c` `menu_headings` default inverse.
- **Change:** `js/invent.js` `nhw_menu_geometry` + `paint_corner_nhw_menu`;
  `js/allmain.js:ask_do_tutorial` builds C line order and uses corner paint
  + `docrt` on dismiss.
- **Verification:** seed1500 Scr **36/40** (RNG 2768); seed1800 Scr
  **12/26**; green PASS + strict; full suite 2/44, RNG 26980/792838,
  screens **160**/11405.
- **Lesson:** menu geometry is driven by longest padded line, not title
  centering. Corner menus must not `clearScreen` the map.
- **Named omission:** invent `display_inventory` still fullscreen-clears /
  approximate `xprname`; discoveries class list; enlightenment plname /
  wielded-weapon body; fullscreen `NHW_MENU` path in the new helper.

## D-0024 — invent/doname/discoveries incomplete for Rogue screens

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **36/40** after D-0023. Fails at invent `i`
  (idx 28), discoveries `\` (32), enlightenment `^X` (34–35).
- **Cause:** (1) `display_inventory` used `paint_overlay` `clearScreen` with
  approximate startCol instead of corner `NHW_MENU`; (2) `doname` missed
  empty-container prefix, wield/swapwep suffixes, `potion of X`, and
  implicit-uncursed skip for known charged weapons; (3) `dodiscovered`
  only walked scroll/potion/wand and always used `  ` prefix; missing
  `oc_encountered` and `interesting_to_discover` OBJ_DESCR gate;
  (4) enlightenment lacked plname capitalize and `weapon_insight` lines.
- **C locus:** `invent.c:display_inventory` / `wintty.c` corner menu;
  `objnam.c:doname`; `u_init.c:ini_inv_adjust_obj` cknown;
  `o_init.c:discover_object`/`dodiscovered`/`interesting_to_discover`;
  `insight.c:weapon_insight`.
- **Change:** corner invent via `paint_corner_nhw_menu`; doname prefixes /
  wield strings; container `cknown`; `discover_object(..., encountered)`;
  disco walks `DEF_INV_ORDER` with `*`/`  `; ^X capitalize + wield body.
- **Verification:** seed1500 **PASS** RNG 2768/2768 Scr **40/40** + strict;
  green PASS + strict; seed1800 Scr still **12/26** (RNG 2458); full suite
  **3/44**, RNG 26980/792838, screens **165**/11405.
- **Lesson:** corner invent must keep the map; disco `*` vs spaces is
  `oc_encountered`, and only OBJ_DESCR types are interesting.
- **Named omission:** fullscreen invent path; full `oc_charged`/`oc_skill`
  in objects extractor; full `weapon_descr`/skill table; disco Japanese /
  unique/artifact classes; many enlightenment sections.

## D-0025 — getobj throw/apply: gold suggest + missing-letter loop

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458 but screens **12/26**. Diffs: throw
  prompt `[a or ?*]` vs C `[$a or ?*]`; post-throw stale `In what direction?`;
  apply bad letter returned immediately so later keys (`i`/`+`/`\`/`^X`) ran
  as top-level commands while C stayed in getobj/`--More--`.
- **Cause:** (1) `throw_ok` omitted `COIN_CLASS` (C `GETOBJ_SUGGEST`);
  (2) getobj helpers `return null` on missing invlet instead of C `continue`;
  (3) re-prompt never called `flush_topl_more`, so no `--More--`;
  (4) `getdir` left `_pending_message` for the next command-loop capture.
- **C locus:** `dothrow.c:throw_ok` / `dothrow`; `invent.c:getobj` missing
  letter → `You("don't have that object.")` + `continue`; `cmd.c:getdir`.
- **Change:** invent-order `$`+weapons in throw suggest; getobj_throw /
  getobj_apply loop + `flush_topl_more`; clear direction prompt after answer;
  same clear in `lock.js` getdir. `throw_gold` body still deferred.
- **Verification:** seed1800 Scr **24/26** (RNG 2458); green + seed1500 PASS
  + strict lengths; full suite **3/44**, RNG **27161**/792838, screens
  **177**/11405.
- **Lesson:** getobj must loop on missing letters; screen matches are not a
  contiguous prefix (legacy map can fail idx 0 while later frames match).
- **Named omission:** `throw_gold` body; getobj `?`/`*` menus; eat getobj
  still single-shot. (look `:` / legacy map cleared by D-0026.)

## D-0026 — legacy corner map + look staircase feature

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458, screens **24/26**. Idx 0: Book text
  matched but room rows blank (no DEC map under menu). Idx 25: `:` gave
  `You see no objects here.` vs C `There is a staircase up out of the
  dungeon here.--More--`.
- **Cause:** (1) `com_pager_legacy` always `clearScreen()`, wiping the map
  that `docrt` had painted; C corner NHW_MENU (`offx>10`) uses
  `process_text_window` which only `cl_end`s from `offx` and leaves lower
  map rows. (2) `dolook` stubbed; C `look_here` → `dfeature_at` →
  `stairs_description` for known Dlvl1 branch stairs with `u_traversed`
  (set in `mklev` after `place_branch`).
- **C locus:** `wintty.c:process_text_window` / `tty_display_nhwindow`
  NHW_MENU; `questpgr.c:deliver_by_window`; `invent.c:dfeature_at` /
  `look_here` / `dolook`; `stairs.c:stairs_description` /
  `known_branch_stairs`; `mklev.c` Dlvl1 `u_traversed`.
- **Change:** corner legacy paints from `offx` without clearing the map;
  `stairway_at` + `stairs_description` + Dlvl1 `u_traversed`; `dfeature_at`
  + `look_here` feature pline (no “no objects” when dfeature present);
  export `an`/`vtense`.
- **Verification:** seed1800 **PASS** 2458/2458 Scr **26/26** + strict;
  green + seed1500 PASS + strict; full suite **4/44**, RNG **27161**/792838,
  screens **179**/11405.
- **Lesson:** corner menus must not fullscreen-clear; look messages come
  from dungeon features before the no-objects fallback.
- **Named omission:** Blind feel path; engraving; multi-object look menu;
  `doname_with_price`; full altar/lava/ice/pool dfeature; Elemental Planes
  amulet destination strings beyond no-amulet Dlvl1 case.

## D-0027 — orc `u_init_race` Xtra_food + `inv_subs`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2341**: C `rn2(1)` @
  `trquan(u_init.c)` after Rogue `!rn2(5)` blindfold check; JS
  `rn2(100)` from `init_attr` (skipped race kit).
- **Cause:** `u_init_race` was human-only no-op. Orc non-wizard path must
  `ini_inv(Xtra_food)` (2× `FOOD_CLASS` `UNDEF_TYP`) before attrs. Race
  substitutions (`inv_subs`) were also absent — `ini_inv_obj_substitution`
  after `mksobj` (Rogue short sword/dagger → orcish; food CRAM/LEMBAS →
  tripe). Weapon `mksobj_init` RNG matched without subs because substitution
  is post-`mksobj` in C.
- **C locus:** `u_init.c:u_init_race` (`PM_ORC`); `Xtra_food[]`;
  `inv_subs[]`; `ini_inv_obj_substitution`; `ini_inv`.
- **Change:** port orc/elf/dwarf/gnome `u_init_race` switch (elf instrument
  `ROLL_FROM`); `Xtra_food`; full `inv_subs` + call from `ini_inv`.
- **Verification:** rng-diff first mismatch **2341 → 2476**; seed0060 runner
  **2489 → 2584**/3626; green + seed1500 + seed1800 PASS + strict; full
  suite **4/44**, RNG **27256**/792838, screens **179**/11405.
- **Lesson:** race kits run after role `ini_inv`; missing `trquan` before
  attrs is the fingerprint. Post-`mksobj` otyp swap does not change creation
  RNG.
- **Named omission:** `ini_inv_mkobj_filter` full reject list (incl. orc
  `RIN_POISON_RESISTANCE`); other roles still throw. (splitobj → D-0028)

## D-0028 — `dog_invent` partial-stack `splitobj` / `next_ident`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2476**: C `rnd(2)` @
  `next_ident(mkobj.c)` after `dog_invent` APPORT rolls; JS `rn2(4)` (took
  whole stack, skipped split).
- **Cause:** nohands pets `can_carry` returns `1` when `quan > 1`. C then
  `splitobj(obj, carryamt)` → `nextoid` → `next_ident` (`rnd(2)`). JS
  stubbed the partial split and picked up the entire floor stack.
- **C locus:** `dogmove.c:dog_invent`; `mkobj.c:splitobj` / `nextoid` /
  `next_ident`.
- **Change:** export real `splitobj` from `js/mkobj.js` (quan/owt, floor
  `nobj`/`nexthere` insert, `next_ident` for child oid); wire
  `dog_invent`; reuse from `dothrow.js` (remove local copy).
- **Verification:** rng-diff first mismatch **2476 → 2643**; seed0060
  runner **2584 → 2761**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27433**/792838, screens **179**/11405.
- **Lesson:** partial-stack pickup is an object-identity/RNG event, not
  just inventory bookkeeping.
- **Named omission:** `nextoid` shop-price oid search; unpaid/`splitbill`;
  timers/light/`copy_oextra`; `relobj` body (→ D-0029).

## D-0029 — `dog_invent` pet `relobj` / `mdrop_obj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2643**: C `rn2(8)` @
  `dog_goal` APPORT vs JS `rn2(100)` `obj_resists`. Drop RNG at 2640–2641
  matched, but JS never emptied minvent.
- **Cause:** `dog_invent` updated apport/droptime without calling `relobj`.
  `dog_has_minvent` stayed true → APPORT branch skipped. Also
  `add_to_minv` used string `'MINVENT'` and `obj_extract_self` only unlinked
  floor piles.
- **C locus:** `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (`OBJ_MINVENT`); `dogmove.c:dog_invent`.
- **Change:** `obj_extract_self` minvent unlink + `OBJ_MINVENT` in
  `add_to_minv`; pet-path `mdrop_obj`/`relobj` in `js/dogmove.js` (place on
  floor, optional verbose drop pline); wire from `dog_invent`.
- **Verification:** rng-diff first mismatch **2643 → 2663**; seed0060
  runner **2761 → 2771**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27445**/792838, screens **179**/11405.
- **Lesson:** drop tracking without releasing minvent falsifies every later
  `!dog_has_minvent` gate.
- **Named omission:** `flooreffects` / `stackobj` merge; vault-guard gold;
  worn/saddle/shop/`update_mon_extrinsics` in `mdrop_obj`; `couldsee` for
  `in_masters_sight` → D-0030.

## D-0030 — `dog_goal` `in_masters_sight` via real `couldsee`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2663**: C `rn2(100)`
  `obj_resists` (continued floor scan) vs JS `rn2(8)` APPORT. DIAG at pet
  `(12,12)` / hero `(15,13)`: `couldsee(pet)=false`, lit gate OK, no
  minvent, `m_cansee` OK — stub `in_masters_sight=true` forced the roll.
- **Cause:** `dog_goal` hardcoded `in_masters_sight = true` instead of C
  `couldsee(omx, omy)` (`viz_array & COULD_SEE`). When false, C skips the
  APPORT branch before `rn2(8)` and keeps scanning `fobj`.
- **C locus:** `dogmove.c:dog_goal`; `vision.h:couldsee`.
- **Change:** `js/dogmove.js` imports `couldsee` and sets
  `in_masters_sight = couldsee(omx, omy)`.
- **Verification:** rng-diff first mismatch **2663 → 2979**; seed0060
  runner **2771 → 3039**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27859**/792838, screens **179**/11405.
- **Lesson:** vision stubs that always-true gate RNG-consuming APPORT
  short-circuits; real `couldsee` already existed in `vision.js`.
- **Named omission:** `dog_goal` gettrack/FARAWAY when goal is hero and
  `!in_masters_sight`; next peel @ 2979 is C `exercise` `-rn2(2)` vs JS
  `distfleeck`.

## D-0031 — dokick empty-space `kick_dumb` / `exercise`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2979**: C `rn2(2)`
  `exercise(attrib.c:509)` vs JS `rn2(5)` `distfleeck`. Keys: Ctrl-D
  then `j`; C screen "You kick at empty space." Prefix matched through
  `gethungry` / wipe-engr `rn2(94)`.
- **Cause:** JS had no `#kick` (`dokick`); Ctrl-D was "Unknown command"
  and `j` was ordinary movement, so the turn never called
  `exercise(A_DEX, FALSE)` from `kick_dumb`. Not `exerper` (that runs
  before wipe-engr in the prior EOT block).
- **C locus:** `dokick.c:dokick` / `kick_dumb`; `cmd.c` bind `C('d')`.
- **Change:** `js/dokick.js` — `dokick` + `kick_dumb` (DEX≥16 empty-space
  and low-DEX strain envelope) + open-door→dumb / wall→ouch routing;
  wire Ctrl-D in `js/cmd.js`; export `getdir` from `js/lock.js`.
- **Verification:** rng-diff first mismatch **2979 → 2997**; seed0060
  runner **3039 → 3064**/3626, cursors **18 → 41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **27765**/792838,
  screens **179**/11405.
- **Lesson:** attribute `exercise` after matching EOT often comes from
  the *next* command (kick/search/combat), not `exerper`; use the key
  map and topline before blaming `moves%10`.
- **Named omission:** `kick_monster`/`kick_object`/closed-door Whammm/
  SDOOR-SCORR open rolls/furniture; `martial()`; `wake_nearby`/
  `u_wipe_engr` effects; `losehp`/`set_wounded_legs` bodies; next peel
  @ 2997 diagnosed as missing kick-avoid (D-0032), not missing `distfleeck`.

## D-0032 — seed0060 dog_move cnt 4 vs 3 (missing kick-avoid)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2997**: C `rn2(5)`
  `distfleeck` vs JS `rn2(4)`. Matched through kick `exercise` and
  dog_move `rn2(1/2/3)`.
- **Rejected:** post-kick fleeck/ALLOW_*/missing `distfleeck` body;
  mklev “extra CORR west of pet” / reading C `#` as wall — NetHack `#` is
  corridor; JS and C both have `CORR` at `(22,12)` (screen `#######f@`).
  Diagonal `bad_rock` squeeze does not drop any of the four open
  candidates for a kitten.
- **Cause/evidence:** C `dokick` sets `gk.kickedloc` to the kicked cell
  before resolution; `dog_move` / `m_move` call `m_avoid_kicked_loc` so
  peaceful/tame monsters skip that adjacent cell. Hero kicked south →
  `(24,13)`. JS never set or consulted `kickedloc`, so `mfndpos` kept
  four `appr=0` slots → extra `rn2(4)` before `distfleeck`.
- **C locus:** `dokick.c` (`kickedloc =`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear on `hack.c:domove` /
  `cmd.c` non-`dokick` timed commands.
- **Change:** `game.kickedloc` in `dokick`; `m_avoid_kicked_loc` (+ Sokoban
  stub) in `mon.js`; wire into `dog_move`; clear on successful `domove` and
  other timed non-kick commands in `cmd.js`.
- **Verification:** rng-diff first mismatch **2997 → 3016**; seed0060
  runner **3064 → 3086**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27787**/792838, screens **179**/11405.
- **Lesson:** after a kick, compare pet candidate skips to `kickedloc`
  before blaming terrain glyphs; `#` in tty is corridor, not wall.
- **Next:** peel @ **3105** (`maybe_generate_rnd_mon` → `makemon(NULL,0,0)`
  body; C `makemon_rnd_goodpos` vs JS stub falling through to `dosounds`).

## D-0033 — seed0060 missing donull (`.` wait)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3016**: C `rn2(5)`
  `distfleeck` vs JS `rn2(2)`. Matched through kick-avoid turn end
  (3015 = moveloop `rn2(94)`).
- **Rejected:** post-kick pet cell west-vs-south / `mtrack` candidate-skip /
  fleeck arity as the 3016 cause — kick-turn dog_move RNG already matched
  C through 3015; JS’s next call was `exercise` arity 2 (second kick), not
  a wrong `distfleeck` arity.
- **Cause/evidence:** moves include `\u0004j..`; JS `rhack` had no `.`
  branch so wait was “Unknown command” with `context.move=0`. C `donull`
  returns `ECMD_TIME` → monster turns start with `distfleeck` `rn2(5)`.
  Skipping both `.` waits made the next kick’s `exercise` `rn2(2)` land at
  3016. Timed non-kick commands also clear `gk.kickedloc` (`cmd.c`).
- **C locus:** `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  `ECMD_TIME && func != dokick`).
- **Change:** `js/do.js` `donull`; `js/cmd.js` `.` → timed wait + clear
  `kickedloc`. Omit `cmd_safety_prevention` (named in C-JS-MAP).
- **Verification:** rng-diff first mismatch **3016 → 3105**; seed0060
  runner **3086 → 3151**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27922**/792838, screens **179**/11405.
- **Lesson:** when C’s next call is `distfleeck` and JS shows a *different
  function’s* arity (here `exercise`/`rn2(2)`), check whether an intervening
  timed command key (`.` wait) was dropped as unknown.
- **Next:** peel @ **3105** — port `maybe_generate_rnd_mon`’s
  `makemon(NULL,0,0)` path (`makemon_rnd_goodpos` / `rndmonst`).

## D-0034 — seed0060 makemon(NULL,0,0) / makemon_rnd_goodpos

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3105**: C `rn2(77)`
  `makemon_rnd_goodpos` vs JS `rn2(300)` `dosounds`. Matched through
  `maybe_generate_rnd_mon` gate (3104 = `rn2(70)=0`).
- **Cause/evidence:** JS consumed the gate roll then stubbed the body.
  C calls `makemon(NULL,0,0)` → `makemon_rnd_goodpos` (`rn1(COLNO-3,2)` /
  `rn2(ROWNO)`, reject `cansee` when `!in_mklev`) → `rndmonst` → create →
  `G_SGROUP`/`m_initgrp` → invent. Also fixed wrong `MM_NOGRP=2` in
  `monsters.js` (C/`const.js` is `0x2000`) so group suppression matches.
- **C locus:** `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon`,
  `makemon_rnd_goodpos`, `m_initgrp`; `teleport.c:enexto_gpflags`.
- **Change:** `js/makemon.js` placement-before-`rndmonst`,
  `makemon_rnd_goodpos`, `m_initgrp`/`G_SGROUP`/`G_LGROUP`, early `fmon`
  link; `js/teleport.js` `enexto_gpflags`; `js/allmain.js` real
  `makemon(null,0,0)`; `js/monsters.js` `G_SGROUP`/`G_LGROUP`, drop fake
  `MM_NOGRP`.
- **Verification:** rng-diff first mismatch **3105 → 3536**; seed0060
  runner **3151 → 3562**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **28497**/792838, screens **179**/11405.
- **Lesson:** for `makemon(NULL,0,0)`, C picks coordinates *before*
  `rndmonst`; stubbing after the spawn gate is not RNG-equivalent.
- **Next:** peel @ **3536** — port `regen_hp` in the once-per-turn block
  before `dosounds`.

## D-0035 — seed0060 losehp + regen_hp (wall kick turn)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3536**: C `rn2(100)`
  `regen_hp` vs JS `rn2(300)` `dosounds`. Step 28 is wall kick
  ("Ouch!  That hurts!") after empty-space kicks; RNG OK through 3535
  (`maybe_generate_rnd_mon` miss).
- **Cause/evidence:** Two coupled gaps. (1) JS `kick_ouch` burned
  `rnd(CON?3:5)` but never applied `losehp`, so `uhp` stayed at max and
  C's `regen_hp` gate never opened. (2) JS once-per-turn block skipped
  `regen_hp` entirely before `dosounds`. Post-ouch session screens can
  still show `HP:11(11)` when same-turn heal equals damage — not proof
  that `losehp` was absent in C.
- **C locus:** `dokick.c:kick_ouch` → `losehp(Maybe_Half_Phys(dmg),…)`;
  `hack.c:losehp`; `allmain.c:regen_hp` / once-per-turn call before
  `dosounds`.
- **Change:** new `js/hack.js` `losehp`/`maybe_half_phys`; `dokick.js`
  applies damage; `allmain.js` `regen_hp` + `interrupt_multi` + call
  site when `uhp < uhpmax` (or mh when Upolyd).
- **Verification:** rng-diff **RNG OK 3626**; seed0060 runner
  **3626**/3626 RNG, Scr **0**/41, cursors **41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **28511**/792838,
  screens **179**/11405.
- **Lesson:** a missing HP mutation can look like a missing EOT RNG call;
  check whether the regen *gate* (`uhp < uhpmax`) can ever be true.
- **Next:** seed0060 screen idx 0 cells (legacy/botl); cursors already match.

## D-0036 — seed0060 orc hpadv + mon_glyph mcolor (screens 0–4)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 RNG **3626**/3626, screens **0**/41 (cursors
  41/41). Idx 0 had three cell diffs: botl `HP:12(12)` vs C `HP:11(11)`,
  and newt `:` color green vs yellow.
- **Cause/evidence:** (1) `roles.js` orc (and elf/dwarf/gnome) lacked
  `hpadv`/`enadv`, so `setup_role_race_from_rc` fell back to human
  `{infix:2}` → Rogue+orc HP **12**; C `role.c` orc is `{1,0,0,1,0,0}` →
  HP **11**. (2) `mon_glyph` used mlet-only `S_LIZARD→CLR_GREEN`; C
  `mons[PM_NEWT].mcolor` is `CLR_YELLOW` (11).
- **C locus:** `role.c` `races[]` orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`.
- **Change:** ported race `hpadv`/`enadv` (+ attrmin/attrmax) in
  `js/roles.js`; `mon_glyph` uses `mcolors[mnum]` (pets `CLR_WHITE`).
- **Verification:** seed0060 Scr **5**/41 (idx 0–4 match), RNG still
  **3626**/3626; green + seed1500/1800 PASS + strict; full **4/44**,
  screens **184**/11405 (+5), RNG **28511**/792838.
- **Lesson:** race table stubs that silently inherit human `hpadv` corrupt
  botl on every frame; mlet-only monster colors fail as soon as two
  species share a letter.
- **Next:** seed0060 idx 5+ (invent letter / map wall / downstairs color).

## D-0037 — seed0060 gold doname + mondied newsym (screen 5)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **5**/41. Idx 5 had
  two cell diffs: topline `"1 gold piece"` vs `"a gold piece"`, and map
  newt cell still `:` (yellow) while C showed floor `·`.
- **Cause/evidence:** (1) `doname` short-circuited `COIN_CLASS` to
  `` `${quan} gold piece` ``; C `doname_base` uses quan==1 article `"a "`
  + xname `"gold piece"`. (2) `mondied` removed the monster from `fmon`
  and zeroed `mx`/`my` without `newsym`, leaving a stale live glyph; C
  `mondead`→`mon_leaving_level` refreshes the cell (newt
  `corpse_chance` was false → floor, not `%`).
- **C locus:** `objnam.c:doname_base`; `mon.c:mondied`/`mondead`/
  `mon_leaving_level`.
- **Change:** `js/objnam.js` coin path uses the shared quan/article
  prefix; `js/mhitm.js` `mondead` keeps coords and calls `newsym`.
  Incomplete `make_corpse` via `mkcorpstat` was tried and **reverted** —
  it cut aggregate RNG by ~900 without a faithful special-case body.
- **Verification:** seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405 (+1), RNG **28511**/792838.
- **Lesson:** idx-5 `"1"` vs `"a"` was gold English, not invent letters;
  death without `newsym` looks like a lingering live monster. Do not ship
  a partial `make_corpse` that invents `mksobj` RNG.
- **Next:** seed0060 idx 6+ (drop then re-pickup pline / premature wall).

## D-0038 — seed0060 cansee invent pline + wall_angle + downstairs color

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **6**/41. Idx 6 had
  (1) topline extra "The kitten picks up a gold piece." after a drop,
  (2) premature wall `┌` at map (17,14) / screen (16,15), and later
  (3) downstairs `>` yellow vs C NO_COLOR.
- **Cause/evidence:** (1) C `mdrop_obj`/`dog_invent` gate drop/pickup
  plines on `cansee`; a second invent after an extra pet move picks up
  at (13,13) with `cansee=false` — C silent, JS always printed.
  (2) `set_wall_state` was a no-op and `terrain_glyph` mapped wall
  `typ` straight to DEC corners; C `back_to_glyph` uses
  `wall_angle(seenv)` — TLCORNER with `WM_C_OUTER` and seenv=SV0 alone
  yields `S_stone` (blank) until more octants are seen.
  (3) Public recordings paint upstairs `<` CLR_YELLOW and downstairs
  `>` NO_COLOR (not defsym gray for either).
- **C locus:** `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`xy_set_wall_state`/`wall_angle`/
  `back_to_glyph`.
- **Change:** gate pet drop/pickup plines on `cansee`; port
  `set_wall_state` cluster in `mklev.js`; port `wall_angle` into
  `display.js` terrain glyphs; downstairs `>` uses `NO_COLOR`.
- **Verification:** seed0060 Scr **37**/41 (idx 22/33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **216**/11405 (+31), RNG **28511**/792838.
- **Lesson:** silent out-of-sight invent still mutates state; unfinished
  exterior corners must stay stone until seenv warrants a glyph; do not
  force downstairs to match upstairs yellow.
- **Next:** seed0060 idx 22 (pet `f` vs corridor `#`).

## D-0039 — seed0060 idx 22 pet via orc infravision

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **37**/41. Sole map
  miss at idx 22: C white pet `f` at map (22,12) / term (21,13); JS
  corridor `#`. Pet position and RNG matched; glyph missing.
- **Cause/evidence:** hero at (24,12) in a dark corridor — `cansee(22,12)`
  false (only adjacent night-vision IN_SIGHT), but `couldsee` true.
  Orc race has `M3_INFRAVISION`; kitten has `M3_INFRAVISIBLE`. C
  `newsym` still `display_monster` when `!cansee` via
  `see_with_infrared && mon_visible`. JS `newsym` only drew monsters
  under `cansee`. Also `postmov` omitted C's final
  `newsym(mtmp->mx, mtmp->my)` after `mintrap`.
- **C locus:** `display.h:_see_with_infrared` / `_mon_visible`;
  `display.c:newsym` (!cansee branch); `monmove.c:postmov`;
  `monflag.h` M3_INFRA*; `polyself.c` race Infravision via
  `mons[urace.mnum]`.
- **Change:** extract `mflags3` (`scripts/extract-monsters.py`);
  `infravision`/`infravisible` in `monsters.js`; `newsym` infrared
  path + race Infravision in `display.js`; `postmov` newsym of new
  cell in `monmove.js`.
- **Verification:** seed0060 Scr **38**/41 (idx 22 cleared; 33/35/36
  disco/^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **217**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** dark-corridor pet glyphs for orcs are infrared, not FOV;
  do not treat `!cansee` as “draw terrain only” when sensing macros
  exist. Extract full M3 flags before inventing race hardcodes.
- **Next:** seed0060 idx 33 disco class layout (then ^X idx 35–36).

## D-0040 — seed0060 idx 33 disco OBJ_DESCR / obj_typename

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **38**/41. idx 33
  disco menu showed only elven/orcish dagger + potion + sack; C listed
  full orc racial knowledge (short sword, arrow, bow, spear, armor).
- **Cause/evidence:** `knows_object` already registered the orcish
  types. `interesting_to_discover` requires `OBJ_DESCR != NULL`; JS
  only knew a tiny FIXED_DESCRS / scroll-potion-wand map, so most
  orcish weapons/armor were filtered out. After extracting descrs,
  naming still mismatched (`uruk hai` / bare `sickness`) until
  `obj_typename` used `OBJ_NAME` + class prefixes.
- **C locus:** `objclass.h:OBJ_DESCR`/`OBJ_NAME`; `objects.c`
  `OBJECTS_DESCR_INIT`; `o_init.c:interesting_to_discover` /
  `dodiscovered`; `objnam.c:obj_typename`.
- **Change:** `scripts/extract-objects.py` emits `objectDescrs` +
  `objectNameStrs`; `invent.js` disco uses real descr gate +
  `obj_typename`; `u_init.js:has_descr` uses `objectDescrs`.
- **Verification:** seed0060 Scr **39**/41 (idx 33 cleared; 35–36
  ^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **218**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** discovery UI needs the full `obj_descr[]` table, not
  seed-shaped appearance maps. Prefer extractor fields over FIXED_*
  hand lists.
- **Next:** seed0060 idx 35–36 enlightenment (autopickup, attr
  limits, weapon_descr skill naming).

## D-0041 — seed0060 idx 35–36 ^X enlightenment

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **39**/41. idx 35–
  36 (^X) mismatched Autopickup (`off` vs `on for '$' plus thrown`),
  race attr limits (`(current; limit:18/50)` etc.), and weapon lines
  (`orcish short sword` vs skill `short sword`).
- **Cause/evidence:** `doattributes` hard-coded Autopickup off and
  plain attr numbers; `weapon_descr` used otyp display name instead of
  C `P_NAME(weapon_type(uwep))`. Session rc has
  `autopickup,pickup_types:$`; orc `ATTRMAX` differs from human 18 /
  `STR18(100)`.
- **C locus:** `insight.c` `basics_enlightenment` autopickup /
  `one_characteristic` / `weapon_insight`; `weapon.c` `weapon_descr` /
  `weapon_type` / `skill_name`; `attrib.h` `ATTRMAX`.
- **Change:** extract `oc_skill` in objects table; invent.js
  autopickup from flags, attr limit paren, `weapon_type`/`skill_name`
  /`weapon_descr` via skill category.
- **Verification:** seed0060 Scr **41**/41 PASS, RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **5/44**, screens
  **220**/11405 (+2), RNG **28511**/792838.
- **Lesson:** enlightenment text is option/race/skill semantics, not
  invent layout. Prefer `oc_skill` + `P_NAME` over otyp strings for
  wield descriptions.
- **Next:** next unported role `u_init_role`, or seed0013 Lua/`sp_lev`.

## D-0042 — Wizard `u_init_role` + `ini_inv_mkobj_filter` + Dark One gender

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  seed2200 still diverges later in mklev.
- **Observed:** **29/44** sessions threw `u_init_role: role not ported
  (Wizard)` (≈10 Wizard sessions). After port, **20/44** role throws
  remain (no Wizard). seed2200 rng-diff first mismatch moved from throw
  → idx **199** (missing Dark One `rn2(100)`) → idx **1283**
  (`choose_trapnote` vs `rnd(4)`).
- **Cause/evidence:** Wizard kit was absent; scaffold lacked pantheon/
  attrs/`hpadv`/`enadv`/`neminum`. Random UNDEF wand/ring/potion/scroll/
  book needed C `ini_inv_mkobj_filter` (reject list + `oc_level` +
  `Skill_W` discipline). Dark One has no fixed gender →
  `role_init` `rn2(100)<50`. Cloak wear/`a_ac` needed for AC:9.
- **C locus:** `u_init.c` `Wizard[]` / `u_init_role` / `ini_inv` /
  `ini_inv_mkobj_filter` / `Skill_W` / `restricted_spell_discipline`;
  `role.c` Wizard entry + `role_init` nemesis gender; `objclass.h`
  `oc_level`/`a_ac`.
- **Change:** extract `a_ac`/`oc_level`; Wizard roles + inventory +
  filter + `Skill_W`; cloak wear + `find_ac` via `a_ac`;
  `role_init_nemesis_gender` for random-gender nemeses.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  RNG **2756**/3018 Scr **1**/230 (prefix **1283**); full **5/44**,
  screens **239**/11405 (+19), RNG **44848**/792838; role throws
  **20**/44.
- **Omissions named:** `initialspell`; full `role_init` beyond nemesis
  gender; other role kits; seed2200 `choose_trapnote` (next peel).
- **Lesson:** unlocking a role is identity + inventory filter + any
  role_init RNG the nemesis gender path consumes — not kit tables alone.
- **Next:** peel seed2200 idx 1283 `choose_trapnote`, or next unported
  role (Priest/Knight clear 4 throws each).

## D-0043 — Priest `u_init_role` + pantheon `randrole` + shield wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Priest sessions still diverge later in mklev/moveloop.
- **Observed:** **20/44** role throws after D-0042; 4 Priest sessions
  threw. After port, **17/44** remain (no Priest). seed0501 rng-diff
  prefix **1153** (`wipeout_text`); seed0106 **2566** (`dog_move`);
  seed0030 advances past Priest into Knight throw.
- **Cause/evidence:** Priest kit absent; Priest has no fixed deities →
  `role_init` pantheon loop `randrole` until a role with `lgod`; JS
  roles[] had Ranger before Rogue (wrong pantheon indices) and lacked
  gods on scaffold roles; random SPBOOK needed `Skill_P`; SMALL_SHIELD
  needed `is_shield`/`W_ARMS` wear for AC.
- **C locus:** `u_init.c` `Priest[]` / `Lamp[]` / `Skill_P` /
  `u_init_role` / `ini_inv_use_obj` shield; `role.c` Priest entry +
  pantheon selection + `SPE_LIGHT`→`P_CLERIC_SPELL`; roles[] order.
- **Change:** C-ordered roles[] + pantheon gods on all roles; Priest
  attrs/`hpadv`/`enadv`/`neminum`; `role_init_pantheon` + SPE_LIGHT
  override; Priest inventory + Magicmarker/Lamp + `knows_object(POT_WATER)`;
  `Skill_P` in filter; shield wear + `uarms`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix still **1283**; full **5/44**, screens **240**/11405 (+1),
  RNG **50470**/792838; role throws **17**/44.
- **Omissions named:** `initialspell`; helm/gloves/boots wear paths;
  other role kits; seed0501 `wipeout_text`; seed0106 dog_move.
- **Lesson:** Priest unlock is pantheon RNG + correct roles[] indices/
  gods, not inventory alone — missing gods on other roles would
  over-consume `randrole`.
- **Next:** Knight `u_init_role` (5 throws), or seed2200
  `choose_trapnote`, or seed0501 makeniche engraving.

## D-0044 — Knight `u_init_role` + knows_class + helm/gloves wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Knight sessions still diverge later in mklev (`mkclass_aligned`).
- **Observed:** **17/44** role throws after D-0043; 5 Knight sessions
  threw (seed0103/0104/4500/5006 + seed0030 at Knight). After port,
  **13/44** remain (no Knight). seed0103 rng-diff prefix **1185**
  (`mkclass_aligned` vs `rn2(398)`); seed0030 advances past Knight into
  Samurai throw.
- **Cause/evidence:** Knight kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class(WEAPON/ARMOR)` walks
  `bases[]` (all non-magic, incl. polearms for Knight; skip
  CORNUTHAUM/DUNCE_CAP/SMALL_SHIELD). Helmet/gloves needed
  `ini_inv_use_obj` `W_ARMH`/`W_ARMG` wear (also boots path). Intrinsic
  `HJumping |= FROMOUTSIDE` for chess-like mobility.
- **C locus:** `u_init.c` `Knight[]` / `Skill_K` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` helm/gloves/boots; `role.c` Knight
  entry; `youprop.h` `HJumping`.
- **Change:** Knight roles attrs/`hpadv`/`enadv`/`initrecord`; Knight
  inventory; `Skill_K` in `skills_for_role`; bases[] `knows_class` for
  Knight; helm/gloves/boots wear + `uarmh`/`uarmg`/`uarmf` clear;
  `HJumping |= FROMOUTSIDE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **243**/11405 (+3), RNG **58004**/792838; role
  throws **13**/44; seed0103 RNG **2126**/2640 Scr **0**/60 (prefix
  **1185**); seed0104 **2401**/3223 Scr **1**/43.
- **Omissions named:** `skill_init` still stubbed (Skill_K table only);
  `initialspell`; other role kits; seed0103 `mkclass_aligned`; seed2200
  `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Knight unlock needs full-class discovery + armor-slot wear
  beyond suit/shield/cloak — helm/gloves were already a named Priest
  omission and block correct AC.
- **Next:** Samurai `u_init_role` (4 throws), or seed0103
  `mkclass_aligned`, or seed2200/seed0501 mklev peels.

## D-0045 — Samurai `u_init_role` + Japanese discovery + ammo quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Samurai sessions still diverge later (mklev / moveloop).
- **Observed:** **13/44** role throws after D-0044; 4 Samurai throws
  (seed0017/0107/0700 + seed0030 at Samurai). After port, **10/44**
  remain (no Samurai). seed0700 rng-diff prefix **1718**
  (`mkclass_aligned`); seed0017 **2672** / seed0107 **2652**
  (`u_calc_moveamt`); seed0030 advances past Samurai into Healer throw.
- **Cause/evidence:** Samurai kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class` for Samurai matches Knight
  (bases[] weapons+armor, incl. polearms). Optional Blindfold `!rn2(5)`.
  Japanese-name items pre-discovered via `Japanese_item_name` loop
  (skip `oc_magic`). YA ammo needed `is_ammo` quiver path (not dart-only
  `is_missile` name list).
- **C locus:** `u_init.c` `Samurai[]` / `Skill_S` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` ammo; `objnam.c` `Japanese_items` /
  `Japanese_item_name`; `role.c` Samurai entry; `obj.h` `is_ammo`.
- **Change:** Samurai roles attrs/`hpadv`/`enadv`/`initrecord`; Samurai
  inventory + Blindfold; `Skill_S` in `skills_for_role`; bases[]
  `knows_class` for Samurai; `Japanese_item_name` + discovery loop;
  `is_ammo`/`is_missile` via `oc_skill` for quiver.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **245**/11405 (+2), RNG **65208**/792838; role
  throws **10**/44; seed0700 RNG **1731**/3230 Scr **1**/51.
- **Omissions named:** `skill_init` still stubbed; display-path Japanese
  names in `obj_typename`/`doname`; other role kits; seed0700/0103
  `mkclass_aligned`; seed2200 `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Samurai unlock needs Japanese pre-discovery + real ammo
  quiver semantics, not kit tables alone — YA would otherwise sit
  unwielded and skew invent/AC screens.
- **Next:** Valkyrie/Healer/Ranger (2 throws each; Healer also seed0030),
  or shared `mkclass_aligned`, or seed2200/0501 mklev peels.

## D-0046 — Healer `u_init_role` + gold `rn1` + Lamp + full-healing know

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Healer sessions still diverge later (mklev trap peels).
- **Observed:** **10/44** role throws after D-0045; 2 dedicated Healer
  throws (seed0016 + seed0030). After port, **8/44** remain (no Healer).
  seed0016 rng-diff prefix **1341** (`hole_destination`); seed0030
  **5127** (`choose_trapnote`). seed0002 already past init (prefix
  unchanged at 1652).
- **Cause/evidence:** Healer kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C sets `u.umoney0 = rn1(1000, 1001)`, optional
  Lamp `!rn2(25)`, and `knows_object(POT_FULL_HEALING)`. Kit uses typed
  spellbooks (no UNDEF SPBOOK filter path); gloves `+1` via `trspe`.
- **C locus:** `u_init.c` `Healer[]` / `Skill_H` / `u_init_role`
  `PM_HEALER`; `role.c` Healer entry.
- **Change:** Healer roles attrs/`hpadv`/`enadv`/`initrecord`; Healer
  inventory + Lamp + gold `rn1` + `POT_FULL_HEALING` know; `Skill_H` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **251**/11405 (+6), RNG **67533**/792838; role
  throws **8**/44; seed0016 RNG **2258**/3656 Scr **0**/36.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  other role kits; seed0016 `hole_destination`; seed0030/2200
  `choose_trapnote`; seed0700/0103 `mkclass_aligned`; seed0501
  `wipeout_text`.
- **Lesson:** Healer unlock is mostly kit + money RNG; do not invent
  Tourist-shaped inventory or skip `rn1(1000,1001)` gold.
- **Next:** Valkyrie/Ranger (2 throws each), or remaining 1-throw roles,
  or shared mklev peels (`mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text`).

## D-0047 — Valkyrie `u_init_role` + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Valkyrie sessions still diverge later (mklev peels).
- **Observed:** **8/44** role throws after D-0046; 2 dedicated Valkyrie
  throws (seed0015 + seed0105). After port, **6/44** remain (no Valkyrie).
  seed0015 rng-diff prefix **337** (`lspo_map`); seed0105 **974**
  (`wipeout_text`).
- **Cause/evidence:** Valkyrie kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Valkyrie)` (spear+1, dagger,
  small shield+3, food ration), optional Lamp `!rn2(6)`, and
  `knows_class(WEAPON_CLASS)` (excludes polearms) + `knows_class(ARMOR_CLASS)`.
  JS `knows_class` bases[] walk had to admit Valkyrie (was Knight/Samurai
  only).
- **C locus:** `u_init.c` `Valkyrie[]` / `Skill_V` / `u_init_role`
  `PM_VALKYRIE` / `knows_class`; `role.c` Valkyrie entry.
- **Change:** Valkyrie roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Valkyrie inventory + Lamp + weapon/armor `knows_class`; `Skill_V` in
  `skills_for_role`; `knows_class` gate includes `PM_VALKYRIE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **252**/11405 (+1), RNG **68885**/792838; role
  throws **6**/44; seed0015 RNG **364**/8563 Scr **1**/44; seed0105
  RNG **988**/2499 Scr **0**/30.
- **Omissions named:** `skill_init` still stubbed; Ranger/Monk/
  Archeologist/Barbarian/Caveman kits; seed0015 `lspo_map`; seed0105/
  0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed2200/0030
  `choose_trapnote`; seed0016 `hole_destination`.
- **Lesson:** Valkyrie unlock needs bases[] `knows_class` with polearm
  skip — do not leave the Knight/Samurai-only gate or skip the Lamp
  `rn2(6)` branch.
- **Next:** Ranger (2 throws), or remaining 1-throw roles, or shared
  mklev peels.

## D-0048 — Ranger `u_init_role` + launcher/ammo/spear `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Ranger sessions still diverge later (moveloop / mklev peels).
- **Observed:** **6/44** role throws after D-0047; 2 dedicated Ranger
  throws (seed0101 + seed0102). After port, **4/44** remain (no Ranger:
  Monk/Archeologist/Barbarian/Caveman). seed0101 rng-diff prefix
  **2293** (`next_ident`); seed0102 **1281** (`rndmonst_adj`).
- **Cause/evidence:** Ranger kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Ranger)` (dagger+1, bow+1, two
  arrow stacks, cloak of displacement+2, cram×4) and
  `knows_class(WEAPON_CLASS)` filtered to launchers/ammo/spears via
  `is_launcher`/`is_ammo`/`is_spear` (not full weapon class).
- **C locus:** `u_init.c` `Ranger[]` / `Skill_Ran` / `u_init_role`
  `PM_RANGER` / `knows_class`; `obj.h` launcher/ammo/spear macros;
  `role.c` Ranger entry.
- **Change:** Ranger roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Ranger inventory; `Skill_Ran` in `skills_for_role`; `knows_class`
  admits `PM_RANGER` with launcher/ammo/spear filter; added
  `is_launcher`/`is_spear` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405 (+4), RNG **72474**/792838; role
  throws **4**/44; seed0101 RNG **2304**/2371 Scr **3**/27; seed0102
  RNG **1285**/4485 Scr **1**/25.
- **Omissions named:** `skill_init` still stubbed; Monk/Archeologist/
  Barbarian/Caveman kits; seed0101 `next_ident`; seed0102
  `rndmonst_adj`; seed0015 `lspo_map`; seed0105/0501 `wipeout_text`;
  seed0700/0103 `mkclass_aligned`; seed2200/0030 `choose_trapnote`;
  seed0016 `hole_destination`.
- **Lesson:** Ranger `knows_class` is not full-weapon discovery — port
  the launcher/ammo/spear filter; do not reuse Valkyrie/Knight's
  broader walk.
- **Next:** Monk/Archeologist/Barbarian/Caveman (1 throw each), or
  shared mklev/moveloop peels.

## D-0049 — Monk `u_init_role` + spellbook RNG + armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Monk sessions still diverge later (`lspo_map` / early peels).
- **Observed:** **4/44** role throws after D-0048; 1 dedicated Monk
  throw (seed0200). After port, **3/44** remain (Archeologist/
  Barbarian/Caveman). seed0200 rng-diff prefix **377** (`lspo_map`);
  positional RNG **1545**/3822.
- **Cause/evidence:** Monk kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Monk)` (gloves+2, robe+1, random
  scroll, healing×3, rations/fruit/cookies) then
  `ini_inv(M_spell[rn2(90)/30])` (Healing/Protection/Confuse Monster),
  Magicmarker `!rn2(4)` else Lamp `!rn2(10)`, `knows_class(ARMOR)`,
  `knows_object(SHURIKEN)`.
- **C locus:** `u_init.c` `Monk[]` / `M_spell` / `Skill_Mon` /
  `u_init_role` `PM_MONK` / `knows_class`; `role.c` Monk entry.
- **Change:** Monk roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Monk inventory + spellbook extras; `Skill_Mon` in `skills_for_role`;
  `knows_class` admits `PM_MONK` for armor walk.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **74019**/792838; role throws
  **3**/44; seed0200 RNG **1545**/3822 Scr **0**/40.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  Archeologist/Barbarian/Caveman kits; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0016 `hole_destination`;
  seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Monk spell choice is `rn2(90)/30` (three books), not a
  free `rn2(3)`; Magicmarker precedes Lamp with distinct odds.
- **Next:** Archeologist/Barbarian/Caveman (1 throw each), or shared
  mklev/moveloop peels.

## D-0050 — Archeologist `u_init_role` + tin opener/lamp/marker + SACK/TOUCHSTONE

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Archeologist session still diverges later (`hole_destination`).
- **Observed:** **3/44** role throws after D-0049; 1 dedicated
  Archeologist throw (seed0361). After port, **2/44** remain
  (Barbarian/Caveman). seed0361 rng-diff prefix **1280**
  (`hole_destination`); positional RNG **2478**/53865.
- **Cause/evidence:** Archeologist kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Archeologist)` (whip+2,
  leather jacket, fedora, rations×3, pick-axe, tinning kit, touchstone,
  sack) then Tinopener `!rn2(10)` else Lamp `!rn2(4)` else Magicmarker
  `!rn2(5)`, `knows_object(SACK/TOUCHSTONE)` — no `knows_class`.
- **C locus:** `u_init.c` `Archeologist[]` / `Skill_A` / `u_init_role`
  `PM_ARCHEOLOGIST`; `role.c` Archeologist entry.
- **Change:** Archeologist roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; Archeologist inventory + optional tool chain; `Skill_A` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **76497**/792838; role throws
  **2**/44; seed0361 RNG **2478**/53865 Scr **0**/366.
- **Omissions named:** `skill_init` still stubbed; Barbarian/Caveman
  kits; seed0361/0016 `hole_destination`; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0101 `next_ident`; seed0102
  `rndmonst_adj`.
- **Lesson:** Archeologist optional extras are a three-way else-if chain
  (tin opener → lamp → marker), not independent rolls; discovery is
  object-specific, not a class walk.
- **Next:** Barbarian/Caveman (1 throw each), or shared mklev/moveloop
  peels.

## D-0051 — Barbarian `u_init_role` + kit RNG + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Barbarian session still diverges later (`choose_trapnote`).
- **Observed:** **2/44** role throws after D-0050; 1 dedicated
  Barbarian throw (seed0373). After port, **1/44** remains (Caveman).
  seed0373 rng-diff prefix **1327** (`choose_trapnote`); positional
  RNG **2277**/35386.
- **Cause/evidence:** Barbarian kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `rn2(100)>=50` →
  `ini_inv(Barbarian_0)` (two-handed sword, axe, ring mail, ration)
  else `Barbarian_1` (battle-axe, short sword, ring mail, ration),
  then Lamp `!rn2(6)`, `knows_class(WEAPON)` excluding polearms +
  `knows_class(ARMOR)`.
- **C locus:** `u_init.c` `Barbarian_0`/`Barbarian_1` / `Skill_B` /
  `u_init_role` `PM_BARBARIAN`; `role.c` Barbarian entry.
- **Change:** Barbarian roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; both kit tables + Lamp; enable `PM_BARBARIAN` in
  `knows_class` bases[] walk; `Skill_B` in `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **78774**/792838; role throws
  **1**/44; seed0373 RNG **2277**/35386 Scr **0**/124.
- **Omissions named:** `skill_init` still stubbed; Caveman kit;
  seed0373/2200/0030 `choose_trapnote`; seed0361/0016
  `hole_destination`; seed0200/0015 `lspo_map`; seed0105/0501
  `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed0101
  `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Barbarian weapon kit uses `rn2(100)>=50` (not `rn2(2)`)
  per C comment about skewed generators; polearm exclusion matches
  Valkyrie `knows_class` path.
- **Next:** Caveman (last role throw), or shared mklev/moveloop peels.

## D-0052 — Caveman `u_init_role` + `Cave_man[]` + FLINT/ROCK quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Caveman session still diverges later (GEM `rnd_class` sum).
- **Observed:** **1/44** role throws after D-0051; 1 dedicated
  Caveman throw (seed1150). After port, **0/44** remain.
  seed1150 rng-diff prefix **1118** (`rnd_class` C `rnd(999)` vs JS
  `rnd(1000)`); positional RNG **2937**/3137 Scr **22**/51.
- **Cause/evidence:** Caveman kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Cave_man)` only (club+1,
  sling+2, flint 10–20 stacks, rock ×3 merges to 18..33, leather);
  **no** `knows_class`/Lamp. Also needed `ini_inv_use_obj` to quiver
  FLINT/ROCK (C includes them beside WEAPON/`is_weptool`) and
  graystone quan=1 except FLINT in `ini_inv_adjust_obj`.
- **C locus:** `u_init.c` `Cave_man[]` / `Skill_C` / `u_init_role`
  `PM_CAVE_DWELLER` / `ini_inv_use_obj` / `ini_inv_adjust_obj`;
  `role.c` Caveman entry.
- **Change:** Caveman roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  `Cave_man` trop table; `Skill_C` in `skills_for_role`; FLINT/ROCK
  quiver + graystone quan fix in shared `ini_inv_*` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **278**/11405, RNG **81711**/792838; role throws
  **0**/44; seed1150 RNG **2937**/3137 Scr **22**/51.
- **Omissions named:** `skill_init` still stubbed; seed1150 GEM
  `oclass_prob_totals` off-by-one; seed0373/2200/0030
  `choose_trapnote`; seed0361/0016 `hole_destination`; seed0200/0015
  `lspo_map`; seed0105/0501 `wipeout_text`; seed0700/0103
  `mkclass_aligned`; seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Caveman flint/rock are GEM ammo that must still enter
  the quiver path; rock quantity comes from outer trop count ×
  `mksobj` `rn1(6,6)`, not a single trop quan range.
- **Next:** shared mklev/moveloop peels, or GEM prob-total 999 vs 1000.

## D-0053 — `mkclass`/`mkclass_aligned` + Wizard `A_NONE` extractor

- **Status:** fixed (verified 2026-07-13) for makeniche iron-bars
  human-corpse selection; later peels remain.
- **Observed:** seed0700/0103 first mismatch was C `rn2(9)` @
  `mkclass_aligned` vs JS `rn2(398)` stub in `makeniche`. After real
  `mkclass` alone, prefix stuck at ~1723 because Wizard of Yendor had
  extractor fallback difficulty **0**, scrambling `mongen_order`.
- **Cause/evidence:** (1) JS burned a single `rn2(398)` instead of
  C `mkclass(S_HUMAN,0)` → `mkclass_aligned` (per-candidate `rn2(9)`
  hell/nohell mask, `montoostrong` `rn2(2)` break, weighted `rnd(num)`).
  (2) `extract-monsters.py` LVL regex rejected `A_NONE`, so WoY used
  the zeroed fallback and sorted first among humans.
- **C locus:** `makemon.c` `mkclass`/`mkclass_aligned`/`mk_gen_ok`/
  `init_mongen_order`; `mklev.c` `makeniche`; `mondata.h`
  `is_placeholder`; `monsters.h` Wizard `LVL(..., A_NONE)`.
- **Change:** port `mkclass`/`mkclass_aligned` (+ mongen_order,
  `mk_gen_ok`, `is_placeholder`, `G_IGNORE`); wire `makeniche`; parse
  `A_NONE`/`A_*` in monster extractor and regenerate
  `monsters_data.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **279**/11405, RNG **82967**/792838; seed0700
  prefix **1888** (`rndmonst_adj`); seed0103 **2337**
  (`next_ident`/`trquan`); positional seed0700 **2769**/3230,
  seed0103 **2344**/2640.
- **Omissions named:** `mkclass` alignment/`G_IGNORE` callers beyond
  niche (e.g. `ndemon`); `m_initinv` body; seed0700 `rndmonst_adj`
  weight arity; seed0103 pony/makemon invent; `choose_trapnote` /
  `hole_destination` / `wipeout_text` / `lspo_map`; SPBOOK_no_NOVEL
  (later D-0055).
- **Lesson:** a wrong extracted difficulty is enough to desync
  `mkclass` even when the control-flow port looks right — falsify
  table data early when `rn2(9)` count before `rn2(2)` is short.
- **Next:** peel `rndmonst_adj` (seed0700) or pony invent
  (seed0103), or other shared mklev blockers.

## D-0054 — `maketrap` `choose_trapnote` + `hole_destination`

- **Status:** fixed (verified 2026-07-13) for SQKY_BOARD note pick and
  HOLE/TRAPDOOR destination RNG; fuller `maketrap` still partial.
- **Observed:** seed2200/0030/0373 first mismatch C `rn2(12)` @
  `choose_trapnote` vs JS skipping to mktrap victim `rnd(4)`.
  seed0016/0361 C `rn2(4)` @ `hole_destination` vs same JS `rnd(4)`.
- **Cause/evidence:** JS `maketrap` was a push-only stub — never set
  `tnote` or `dst`, so squeaky-board and hole traps omitted C RNG.
- **C locus:** `trap.c` `choose_trapnote` / `hole_destination` /
  `dng_bottom` / `maketrap` switch for `SQKY_BOARD` and
  `HOLE`/`TRAPDOOR`.
- **Change:** port helpers into `js/trap.js`; export real `maketrap`;
  `mklev` imports it. Quest/Gehennom `dng_bottom` cutoffs included;
  overwrite/furniture/statue/boulder/shop/terrain morph named omissions.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix **1283→2724**; seed0016 **1341→2493**; seed0373 **1327→1401**
  (pre-D-0055); seed0361 **1280→1432**.
- **Lesson:** missing `maketrap` switch arms look like “wrong next
  call” arity drift at the victim gate — check trap-type RNG before
  fill_ordinary_room.
- **Next:** D-0055 cleared the follow-on SPBOOK misread; peel
  moveloop/`rndmonst_adj`/`peace_minded` next.

## D-0055 — `mkobj(SPBOOK_no_NOVEL)` → `rnd_class` through blank paper

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150/0030 (and post-D-0054 seed0373) showed
  C `rnd(999)` @ `rnd_class` vs JS `rnd(1000)`. Notes wrongly called
  this GEM `oclass_prob_totals`.
- **Cause/evidence:** C `SPBOOK_no_NOVEL` is `-SPBOOK_CLASS`; `mkobj`
  uses `rnd_class(bases[SPBOOK], SPE_BLANK_PAPER)` (sum **999**, novel
  prob 1 excluded). JS used fake class `11`, remapped to
  `SPBOOK_CLASS`, and rolled the full class total **1000**. Statue
  book path also used bare `SPBOOK_CLASS`.
- **C locus:** `objclass.h` `SPBOOK_no_NOVEL`; `mkobj.c` `mkobj`;
  `objnam.c` `rnd_class`; `mklev.c` supply-chest `extra_classes`.
- **Change:** `mkobj` honors `SPBOOK_no_NOVEL`; mklev uses
  `0 - SPBOOK_CLASS` and passes it through; statue path matches.
- **Verification:** green + cohort PASS; full **5/44**, screens
  **290**/11405, RNG **85043**/792838; seed1150 prefix **1118→2301**
  (`peace_minded`), positional **2941**/3137; seed0030 **5127→6305**;
  seed0373 **1327→2512**; seed2200 positional **2772**/3018.
- **Lesson:** provenance `rnd_class` + arity 999 is spellbook-without-
  novel, not gem totals — check `mkobj` fake-class branches before
  retuning `setgemprobs`.
- **Next:** D-0056 cleared Caveman `peace_minded` arity; peel
  seed0700 `rndmonst_adj` / seed2200 `exercise` / seed1150
  `dog_move` @ 2915.

## D-0056 — roles[] `initrecord` match C (Caveman/Valkyrie/Rogue)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150 first mismatch C `rn2(16)` @
  `peace_minded` vs JS `rn2(26)` — same call site, wrong arity.
- **Cause/evidence:** C `role.c` `initrecord` after `xlev`: Caveman
  **0**, Valkyrie **0**, Rogue **10**. JS had Caveman/Valkyrie **10**
  and Rogue **0**. `u_init` copies `urole.initrecord` into
  `u.ualign.record`; `peace_minded` rolls `rn2(16 + record)`.
- **C locus:** `role.c` roles[] `initrecord`; `makemon.c`
  `peace_minded`; `u_init.c` ualign init.
- **Change:** `js/roles.js` initrecord: Caveman 10→0, Valkyrie
  10→0, Rogue 0→10.
- **Verification:** green + seed1500/1800/0060 PASS + strict;
  seed1150 rng-diff prefix **2301→2915** (`dog_move`); positional
  **2941→2942**/3137 Scr 22/51; full **5/44**, screens **290**,
  RNG **85042**/792838. Rogue cohort still PASS (paths rarely hit
  co-aligned `peace_minded` with the bad Rogue record).
- **Lesson:** landmarks that say “initrecord 10” for every combat
  role are wrong — read the field after `/* Energy */` (=xlev) in
  `role.c`. Wrong record looks like a `peace_minded` formula bug.
- **Next:** seed0700 `rndmonst_adj` @ 1888 (likely `align_shift`);
  seed2200 `exercise` @ 2724; seed1150 `dog_move` @ 2915;
  seed0103 `next_ident`/`trquan` @ 2337.

## D-0057 — CORPSE `mksobj_init` `undead_to_corpse` + `G_NOCORPSE` retry

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0700/0361 first mismatch after a complete z1
  `rndmonst_adj` ending at `rn2(21)`: C `rn2(3)` (new `rndmonst_adj`)
  vs JS `rn2(2)` (`mksobj` gender). NOTES guessed `align_shift`.
- **Cause/evidence:** DoD is `alignment = "unaligned"` → `align_shift`
  returns 0; z1 pool freq-only totals are 3…21 for both. C
  `mksobj_init` CORPSE does
  `do { corpsenm = undead_to_corpse(rndmonnum()); } while (mvitals &
  G_NOCORPSE)` (tryct 50). Grid bug is in the z1 eligible set with
  `G_NOCORPSE`; when reservoir picks it, C burns a second full
  `rndmonst_adj`. JS took one `rndmonnum()` and fell through to
  gender `rn2(2)`. Also missing `allmain` mvitals init
  (`mvflags = geno & G_NOCORPSE`).
- **Rejected:** `align_shift` / `temperature_shift` as the seed0700
  arity gap on ordinary DoD dlvl1 (AM_NONE, temperature 0).
- **C locus:** `mkobj.c` `mksobj_init` FOOD/CORPSE; `mon.c`
  `undead_to_corpse`; `allmain.c` mvitals init.
- **Change:** `js/mon.js` `undead_to_corpse`; `js/allmain.js` mvitals
  init; `js/mkobj.js` CORPSE retry + TIN `undead_to_corpse`/`mvitals`
  check.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **290** RNG **85090**/792838; seed0700 prefix
  **1888→2733** (`u_calc_moveamt`); seed0361 **1432→2924** (`newhp`);
  positional seed0700 **2796**/3230, seed0361 **2972**/53865.
- **Lesson:** after a matching `rndmonst_adj` that ends at newt/`rn2(21)`,
  the next `rn2(3)` vs `rn2(2)` is often a **second** `rndmonnum` from
  CORPSE retry — not dungeon align. seed0102 @ 1281 after egg
  `!rn2(3)` is still the EGG `can_be_hatched` multi-retry peel.
- **Next:** seed0700 `u_calc_moveamt` @ 2733; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0058 — `adjabil` L1 Fast + `u_calc_moveamt` `rn2(3)`

- **Symptom:** seed0700 rng-diff @ **2733**: C `rn2(3)` @
  `u_calc_moveamt` vs JS `rn2(200)` @ `dosounds`.
- **Cause/evidence:** Samurai `sam_abil[]` grants `HFast` at level 1
  via `adjabil(0,1)` in `u_init_misc` (also Monk L1 Fast; Rogue
  Stealth; etc.). JS never called `adjabil` and omitted the
  Fast/Very_fast branches in `u_calc_moveamt`, so the first EOT after
  matching `maybe_generate_rnd_mon` jumped straight to dosounds.
  Tourist has no L1 Fast → green sessions unaffected.
- **Rejected:** dosounds arity reorder / missing fountain rolls as the
  primary gap at 2733 (C provenance is explicitly `u_calc_moveamt`).
- **C locus:** `attrib.c` `adjabil`/`role_abil`/`sam_abil`;
  `u_init.c` `u_init_misc`; `allmain.c` `u_calc_moveamt`;
  `youprop.h` Fast/Very_fast.
- **Change:** `js/attrib.js` innate tables + `adjabil`/`Fast`/
  `Very_fast`; `js/u_init.js` `adjabil(0,1)` before `ulevel=1`;
  `js/allmain.js` Fast/Very_fast `rn2(3)` in `u_calc_moveamt`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **291** RNG **85494**/792838; seed0700 prefix
  **2733→3141** (`rnl`/`doopen_indir`); positional **3146**/3230
  Scr **2**/51; seed0017 **2831**/3465 prefix **2711** (`m_move`).
- **Lesson:** role L1 intrinsics are not optional flavor — Fast changes
  every EOT RNG for Samurai/Monk. Port `adjabil` with the full innate
  tables, not a Samurai-only HFast hardcode.
- **Next:** seed0700 `rnl`/`doopen_indir` @ 3141; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0059 — `rnl` + autoopen `doopen_indir`

- **Symptom:** seed0700 rng-diff @ **3141**: C `rnl(20)` @
  `doopen_indir` vs JS `rn2(7)`.
- **Cause/evidence:** Walking into a CLOSED door with default
  `flags.autoopen` runs `hack.c` → `doopen_indir` → `rnl(20)` then
  (on resist) `exercise(A_STR)`. JS `domove` only treated closed doors
  as blocked (`move=0`) with no open attempt, so the next unrelated
  call (`rn2(7)`) sat at 3141. Three consecutive `l` resists in the
  session each emit only `rnl`+`exercise` and do **not** advance T.
- **Rejected:** treating the arity gap as pet/`distfleeck` reorder
  before the door bump; inventing a turn-consuming open on resist.
- **C locus:** `rnd.c` `rnl`; `lock.c` `doopen_indir`; `hack.c`
  `test_move` autoopen; `attrib.c` `acurrstr`/`exercise`.
- **Change:** `js/rng.js` `rnl` (Luck bias + logged internal `rn2`);
  `js/attrib.js` exported `acurrstr`; `js/lock.js` `doopen_indir`
  CLOSED success/resist; `js/cmd.js` autoopen wiring in `domove`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85803**/792838; seed0700 prefix
  **3141→3207** (`m_move`); positional **3229**/3230 Scr **2**/51;
  seed0030 **6876**/105529 Scr **39**/1953.
- **Omissions named:** interactive `o`/`doopen` getdir; `b_trapped`/
  autounlock/mapseen/`feel_newsym` detail; display-stream RNG still
  absent.
- **Lesson:** missing shared wrappers (`rnl`) look like late combat
  arity bugs when walk-into-door never consumes the open RNG.
- **Next:** seed0700 `m_move` @ 3207; seed0361 `newhp` @ 2924;
  seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0060 — `mfndpos` BOULDER + `NODIAG`

- **Symptom:** seed0700 rng-diff @ **3207**: C `rn2(16)` @
  `m_move` track skip vs JS `rn2(20)` (same site). seed0017 @ **2711**:
  C `rn2(16)` vs JS `rn2(32)`.
- **Cause/evidence:** (1) Newt at (65,4) had a corridor boulder neighbor;
  C `mfndpos` skips `sobj_at(BOULDER)` without `ALLOW_ROCK`, so
  `cnt=4` → `rn2(4*(cnt-j))=rn2(16)`. JS included the boulder cell
  (`cnt=5` → `rn2(20)`). (2) Grid bugs use `NODIAG(PM_GRID_BUG)` —
  C omits diagonals (`cnt=4`); JS allowed all 8 neighbors (`cnt=8` →
  `rn2(32)`).
- **Rejected:** inventing `appr`/`mtrack` order hacks; treating arity as
  a dog_move/`distfleeck` reorder (prefix through pet + fleeck matched).
- **C locus:** `mon.c` `mfndpos` / `mon_allowflags`; `hack.h` `NODIAG`;
  `mondata.h` `throws_rocks`/`passes_walls`.
- **Change:** `js/mon.js` boulder skip + `ALLOW_ROCK` bit; `NODIAG`
  diagonal reject; `mon_allowflags` sets `ALLOW_ROCK` for
  `throws_rocks`/`passes_walls`. `js/monsters.js` helpers + flags.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86026**/792838; seed0700 RNG
  **3230**/3230 Scr **2**/51; seed0017 prefix **2711→2775**
  positional **2840**/3465; seed0030 **7021**/105529.
- **Omissions named:** `m_can_break_boulder`; mfndpos pool/lava/garlic/
  `bad_rock` squeeze / temple / iron bars; `ALLOW_WALL`; hostile
  `m_avoid_kicked_loc` wiring.
- **Lesson:** `m_move` track `rn2(4*(cnt-j))` arity is an `mfndpos`
  candidate-count bug — dump `cnt`/`j`/neighbor objects before
  rewriting approach logic.
- **Next:** seed0700 screen peel (RNG full); seed0361 `newhp` @ 2924;
  seed0017 @ 2775; seed0102 egg; seed2200 `exercise`; seed1150
  `dog_move`.

## D-0061 — `newhp`/`newpw` level-up + `#levelchange`

- **Symptom:** seed0361 rng-diff @ **2924**: C `rnd(8)` @
  `newhp(attrib.c:1101)` vs JS `rn2(12)`. seed0373 @ **2512**: C
  `rnd(10)` vs JS `rn2(7)`.
- **Cause/evidence:** Provenance is the **level-up** branch (lornd), not
  init. Wizard tours type `#levelchange` → `20` → `wiz_level_change` →
  `pluslvl(FALSE)` loop. JS had only ulevel==0 `newhp`/`newpw`, no
  `pluslvl`, and `#` was an unknown command. Follow-on: Barbarian
  stalled at xlev because `setup_role_race_from_rc` omitted `xlev`
  (defaulted to 14 while C Barbarian is 10). Extcmd autocomplete must
  truncate-at-cursor like C NEWAUTOCOMP (append-after-expand garbled
  `levelchange`).
- **Rejected:** treating 2924 as init `newhp`/`rn2(12)` trap arity;
  Tourist-shaped level-up stubs; seed-specific level tables.
- **C locus:** `attrib.c` `newhp`; `exper.c` `newpw`/`enermod`/`pluslvl`;
  `wizcmds.c` `wiz_level_change`; `cmd.c` `doextcmd`;
  `win/tty/getline.c` `tty_get_ext_cmd`/`ext_cmd_getlin_hook`;
  `role.c` `roles[].xlev`.
- **Change:** `js/attrib.js` full `newhp` + async `adjabil` gainstr;
  `js/exper.js` `newpw`/`pluslvl`; `js/getline.js` `getlin`/`doextcmd`;
  `js/wizcmds.js` `wiz_level_change`; `js/cmd.js` `#`; `js/roles.js`
  `xlev` on all roles; `u_init` copies `xlev`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86020**/792838; seed0361 prefix
  **2924→2975** (`dosearch0`) positional **3044**/53865; seed0373
  **2512→2549** (`getbones`) positional **2573**/35386.
- **Omissions named:** `#levelchange` `losexp` drain; full `extcmdlist`;
  `pluslvl` achievements/livelog/`newuexp`/Upolyd; `adjabil` lose/
  `postadjabil`/`add_weapon_skill`.
- **Lesson:** tour peels after moveloop_preamble are often wizard
  `#levelchange`, not mklev; copy every RoleAdvance sibling field
  (`xlev`) when building `game.urole`.
- **Next:** seed0361 `dosearch0`/`rnl` @ 2975; seed0700 screen peel;
  seed0373 `getbones` @ 2549; seed0017 @ 2775; egg `can_be_hatched`.

## D-0062 — `dosearch0` + Searching autosearch

- **Symptom:** seed0361 rng-diff @ **2975**: C `rnl(8)` @
  `dosearch0(detect.c:2079)` vs JS `rn2(300)` dosounds.
- **Cause/evidence:** Archeologist L1 `HSearching` (via `adjabil`) makes
  C call `dosearch0(1)` every EOT when an adjacent unseen trap exists
  (`!rnl(8)`). JS never called `dosearch0` (search `s` only burned a
  turn; moveloop omitted Searching).
- **Rejected:** treating 2975 as a dosounds arity bug; seed-specific
  trap coordinates; implementing only the `s` command without EOT
  Searching.
- **Follow-on (not this unit):** after matching through wipe @ 2978,
  JS rhack reads wish-text `…blessed…` as commands (`e`/`s`) because
  **`^W` / wizard wish is unported** — next seed0361 peel is wish
  getlin, not another dosearch bug.
- **C locus:** `detect.c` `dosearch0`/`find_trap`/`cvt_sdoor_to_door`;
  `allmain.c` Searching EOT; `youprop.h` Searching; `cmd.c`/`detect.c`
  `dosearch`.
- **Change:** new `js/detect.js`; `Searching()` in `attrib.js`; EOT
  call in `allmain.js`; `s` + `continue_search` → `dosearch`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86037**/792838; seed0361 prefix
  **2975→2979** (wish-text `s`) positional **3051**/53865; seed0700
  RNG still full; seed0102 still egg @ 1281.
- **Omissions named:** feel_location/Blind/unmap_invisible; mfind0
  body; Hallucination/cls map_trap wait; activate_statue_trap; artifact
  SPFX_SEARCH fund; cmd_safety_prevention; warnreveal; `^W` wish.
- **Lesson:** L1 Searching roles (Arc/Ran) need EOT `dosearch0` even
  when the player never presses `s`; silent when no adjacent
  SDOOR/SCORR/unseen trap.
- **Next:** see D-0063 — first post-dosearch peel was `T` takeoff,
  not wish; wish follows once `TcTd` is consumed.

## D-0063 — `dotakeoff` (`T`) delay-0 armor

- **Symptom:** seed0361 rng-diff @ **2979**: C `rn2(5)` @
  `distfleeck` (post-takeoff turn) vs JS `rnl(8)` Searching. Key map
  is `TcTd\e^Wblessed…`; JS had no `T`, so `^W`/`blessed` leaked and
  `l`/`s` from the wish string became move/search.
- **Cause/evidence:** C `dotakeoff` — with 2 worn pieces (fedora +
  leather jacket) first `T` prompts getobj (`c` = fedora), second `T`
  auto-removes the remaining piece (`Narmorpieces == 1`). JS treated
  `T` as unknown.
- **Rejected:** claiming @ 2979 was solely `^W` wish (wish keys start
  at RNG **3011** after both takeoffs); treating wish-text `s` as the
  first peel without checking `TcTd`.
- **C locus:** `do_wear.c` `dotakeoff`/`count_worn_stuff`/
  `armor_or_accessory_off`/`armoroff`/`Helmet_off`/`Armor_off`/
  `off_msg`; `cmd.c` `'T'` → `dotakeoff`.
- **Change:** new `js/do_wear.js`; `cmd.js` `'T'` → `dotakeoff`.
  Delay-0 path only (`oc_delay` not in objects extractor); fedora
  Archeologist `change_luck(-1)`; accessories/cursed/layering basics.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86053**/792838; seed0361 prefix
  **2979→3011** (`next_ident` wish mksobj) positional **3054**/53865;
  seed0700 RNG still full.
- **Omissions named:** `oc_delay`/occupation `afternmv`; full
  `Helmet_off` magic helms; dragon armor; `setworn` prop side-effects;
  `ParanoidRemove`; welded/Glib glove gates; `A` takeoffall;
  **`^W`/`makewish`/`readobjnam`**.
- **Lesson:** after `#levelchange`, tour keys often strip armor before
  wizard wishes — missing `T` looks like wish-text leak at a later
  index.
- **Next:** `^W` `wiz_wish`/`makewish`/`readobjnam` for seed0361 @
  3011; or shared `getbones`/`^V` / egg / seed0700 screen.

## D-0064 — `^W` wish / `makewish` / `readobjnam` (seed0361 trio)

- **Symptom:** seed0361 rng-diff @ **3011**: C `rnd(2)` `next_ident`
  (Grayswandir `mksobj`) vs JS `rn2(5)` (wish text still leaked into
  rhack as movement/search).
- **Cause/evidence:** C `C('w')` → `wiz_wish` → `makewish` →
  `readobjnam` for `blessed +5 Grayswandir`, then SDSM, then ALS.
  JS had no `^W` binding and no wish parser. SDSM path is
  `name_to_monplus("silver dragon")` + `rnd_otyp_by_namedesc("scale
  mail")` (`rn2(67)`) then `SCALE_MAIL`→SDSM remap — not a direct
  full-name `rnd_otyp` (`rn2(1)`).
- **Rejected:** matching SDSM via exact `"silver dragon scale mail"`
  `rnd_otyp` (wrong arity); skipping `rn2(nartifact_exist())` in
  wizard mode (C still evaluates the `||` left side).
- **C locus:** `wizcmds.c` `wiz_wish`; `zap.c` `makewish`;
  `objnam.c` `readobjnam`/`rnd_otyp_by_namedesc`/`wishymatch`;
  `mondata.c` `name_to_monplus`; `artifact.c` `artifact_name`/
  `touch_artifact`/`nartifact_exist`; `do_name.c` `oname`;
  `invent.c` `hold_another_object`; `cmd.c` `C('w')`.
- **Change:** artifact extractor + `js/artifact.js`/`do_name.js`/
  `mondata.js`/`readobjnam.js`/`zap.js`; `wiz_wish`; `cmd.js` `^W`;
  `hold_another_object` + exported `addinv`; doname `named`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85938**/792838; seed0361 prefix
  **3011→3035** (`w` wield `touch_artifact`) positional **3087**/53865;
  seed0700 RNG still full; seed0108 wishlist positional **2690**.
- **Omissions named:** full `readobjnam` (fruits/traps/terrain/
  random/`o_ranges`/alt spellings/Japanese wish); `wishcmdassist`/
  history; livelog; `observe_object` beyond `dknown`; blast
  `losehp` in `touch_artifact`; `encumber_msg`; `#wizwish` extcmd;
  `w`/`W` wield/wear; `bane_applies`; artifact intrinsics on wield.
- **Lesson:** dragon scale mail wishes go through monster-name strip
  + generic `scale mail` probabilistic match, then otyp remap — do
  not short-circuit to the final otyp in `rnd_otyp_by_namedesc`.
- **Next:** `w`/`dowield` (seed0361 @ 3035) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0065 — `w`/`dowield` Grayswandir (seed0361)

- **Symptom:** seed0361 rng-diff @ **3035**: C `rn2(4)`
  `touch_artifact` vs JS `rn2(7)` (unknown-`w` desync).
- **Cause/evidence:** Session keys `wi` after wish trio. C
  `dowield` → `getobj` letter `i` → `ready_weapon` →
  `retouch_object` → `touch_artifact`. Neutral Archeologist +
  lawful Grayswandir → `badalign` → `rn2(4)` gate (`spfx` has
  `SPFX_RESTR|SPFX_HALRES`, not `SPFX_INTEL`). JS had no `'w'`
  binding.
- **Rejected:** treating wish-time `hold_another_object`
  `touch_artifact` (@ 3017) as the only touch — wield retouches
  again (@ 3035).
- **C locus:** `wield.c` `dowield`/`ready_weapon`/`setuwep`/
  `welded`; `artifact.c` `retouch_object`/`touch_artifact`;
  `cmd.c` `'w'`.
- **Change:** `js/wield.js` + `cmd.js` `'w'`; `retouch_object` in
  `artifact.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85896**/792838; seed0361 prefix
  **3035→3073** (`W` wear) positional **3103**/53865; seed0700
  RNG still full.
- **Omissions named:** `cantwield` poly; `cant_wield_corpse`;
  bimanual+shield; `will_weld` pline body; `doswapweapon`; quiver
  ynq; count-split/`finish_splitting`; `arti_speak`/
  `artifact_light`; `pushweapon`; blast `d()`/`losehp` when
  `rn2(4)==0`; silver-hate/bane in `retouch_object`; full
  `setworn` props; `W`/`dowear`.
- **Lesson:** alignment-restricted non-intelligent artifacts still
  roll `rn2(4)` on every retouch (wish and wield), not only once.
- **Next:** `W`/`dowear` (seed0361 @ 3073 SDSM) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0066 — `W`/`dowear` SDSM delay occupation (seed0361)

- **Symptom:** seed0361 rng-diff @ **3073**: C `rn2(5)`
  `distfleeck` vs JS `rn2(7)` (unknown-`W` then `j` as move).
- **Cause/evidence:** Session keys `Wj` after wield. C `dowear` →
  getobj `j` (SDSM) → `accessory_or_armor_on` → `setworn` +
  `nomul(-oc_delay)` with SDSM `oc_delay=5`. Moveloop skips
  `nhgetch` while `multi < 0`, attributing all 5 dressing turns
  (+ pet fleeck) to the `j` keystroke. JS lacked `'W'` and
  negative-`multi` occupation.
- **Rejected:** fleeck arity / pet geometry as the first cause —
  without wear, `j` was a south move with different pet path.
- **C locus:** `do_wear.c` `dowear`/`canwearobj`/
  `accessory_or_armor_on`/`Armor_on`; `worn.c` `setworn`;
  `hack.c` `nomul`/`unmul`; `allmain.c` `multi < 0`;
  `objects.h` `oc_delay`; `cmd.c` `'W'`.
- **Change:** extractor `oc_delay`; `js/do_wear.js` wear path;
  `js/hack.js` `nomul`/`unmul`; `js/allmain.js` occupation;
  `cmd.js` `'W'`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85752**/792838; seed0361 prefix
  **3073→3259** (`P` puton) positional **3262**/53865; seed0700
  RNG still full.
- **Omissions named:** `P`/`doputon` accessory bodies; `setworn`
  oc_oprop/extrinsic props; `dragon_armor_handling`; doff
  `oc_delay` occupation; poly/weld/trap `canwearobj` gates;
  `A` takeoffall; ring hand yn.
- **Lesson:** armor `oc_delay` is not optional for parity —
  delayed donning consumes multiple turns without further keys,
  and those turns share the selection keystroke's RNG segment.
- **Next:** `P`/`doputon` (seed0361 @ 3259 ALS) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0067 — `P`/`doputon` ALS put-on (seed0361)

- **Observed:** `seed0361-archeologist-tour`, first mismatch **3259**
  (`dog_move` `rn2(12)` vs JS `rn2(100)`).
- **Cause/evidence:** Session keys `Pk` after SDSM wear. C `doputon`
  → getobj → `accessory_or_armor_on` → `Amulet_on` (ALS is a no-op
  case + `on_msg`/`prinv`). JS lacked `'P'`, so `P`/`k` leaked into
  rhack. ALS puton itself emits no RNG; the turn's pet `dog_move`
  follows.
- **Rejected:** fleeck/dog_move formula as the first cause — without
  puton, keys never reached the post-puton movemon segment.
- **C locus:** `do_wear.c` `doputon`/`accessory_or_armor_on`/
  `Amulet_on`/`on_msg`; `worn.c` `setworn`; `invent.c` `prinv`;
  `objnam.c` amulet `(being worn)`; `cmd.c` `'P'`.
- **Change:** `js/do_wear.js` puton/amulet/ring-hand path;
  `js/cmd.js` `'P'`; `js/objnam.js` worn amulet/ring suffixes.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85792**/792838; seed0361 prefix
  **3259→3292** (`getbones`) positional **3295**/53865; seed0700
  RNG still full; seed0373 still `getbones` @ 2549.
- **Omissions named:** Ring_on learnring/attribs; Blindf_on
  specials; amulet change/strangle/sleep/flying/breathing bodies;
  ring Glib/cursed-gloves/welded gates; `setworn` oc_oprop;
  `dragon_armor_handling`; doff `oc_delay`; `A` takeoffall.
- **Lesson:** missing command letters look like late pet RNG gaps;
  confirm the key map (`Pk`) before peeling fleeck arity.
- **Next:** shared `getbones` (seed0361 @ 3292 / seed0373 @ 2549)
  or egg `can_be_hatched` / seed0700 screen.

## D-0068 — EGG can_be_hatched multi-retry

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **1281**: C continues
  `rndmonst_adj` `rn2(3)` (second `rndmonnum` in egg loop); JS
  `rn2(6)` after a one-shot stub. seed0361/0373 `getbones` @
  3292/2549 diagnosed as unbound `^V` → Quest `makemaz` (not a
  getbones body bug) — pivoted to egg.
- **Rejected:** getbones early-return / `flags.bones` — JS stub
  already emits `rn2(3)` when reached; tours never call `mklev`
  again without level-tele. CORPSE `G_NOCORPSE` retry — different
  peel (D-0057); egg is separate.
- **C locus:** `mkobj.c` `mksobj_init` EGG; `mon.c` `can_be_hatched`
  / `dead_species` / `BREEDER_EGG`; `mondata.c` `little_to_big` /
  `big_to_little` / `grownups`; `mondata.h` `lays_eggs` /
  `M1_OVIPAROUS`.
- **Cause:** typed-egg path must loop `can_be_hatched(rndmonnum())`
  until hatchable (or tryct); oviparous path consumes `!rn2(77)`.
  Stub broke after one `rndmonnum`.
- **Change:** `js/mon.js` `can_be_hatched`/`dead_species`;
  `js/mondata.js` grownups + growth helpers; `js/monsters.js`
  `M1_OVIPAROUS`/`lays_eggs`; `js/mkobj.js` real EGG retry loop.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **296** RNG **90837**/792838; seed0102 prefix
  **1281→4451** (`dog_goal`) positional **4459**/4485 Scr **2**/25;
  seed0700 RNG still full.
- **Omissions named:** `egg_type_from_parent`; hatch timers;
  `^V`/`level_tele`/`goto_level`/`makemaz`/`splev`.
- **Lesson:** when Notes say getbones but C never reaches `mklev`,
  check command bindings (`^V`) and special-level prerequisites
  before patching the stub that already matches.
- **Next:** seed0102 `dog_goal` @ 4451, or other shared peels;
  getbones waits on level-tele + special levels.

## D-0069 — seed0102 dog_goal udist / fireassist `f` key ownership

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **4451**: C `rn2(4)` @
  `dog_goal:575`; JS `rn2(100)` (invent `dogfood`/`obj_resists`).
- **Rejected:** APPORT/`can_carry` on LARGE_BOX; rewriting `dog_goal`
  appr; auto-submit unique `#` extcmds (broke seed0361); naïve
  `'f'`→`dofire` without fireassist (made `l` a real shot ~4442).
- **C locus:** `dothrow.c` `dofire` fireassist → `cmdq` `doswapweapon`
  + `dofire`; `wield.c` `ready_weapon`/`prinv` → `--More--` eats
  `l`/`i`; Esc ends More; swap `ECMD_TIME` then canned getdir;
  `dogmove.c` `dog_goal` `udist>1` → `rn2(4)` once hero stays put.
- **Cause:** Ranger starts with dagger wielded / bow in swap / arrows
  quivered. C `f` queues swap+retry; swap `prinv` shows
  `b - a +1 bow (weapon in right hand).--More--`; `l`/`i` bell in
  `more()`; Esc continues; turn passes; getdir then `+`/Esc cancel.
  JS treated unbound `f` as unknown then `l` as east move →
  `udist==1` → skipped `rn2(4)`.
- **Change:** `js/wield.js` `doswapweapon`/`setuswapwep`/
  `ammo_and_launcher`; `js/dothrow.js` fireassist `cmdq`;
  `js/cmd.js` `'f'`→`dofire` + canned `rhack` pop; `#name`/
  `docallcmd` stubs kept from prior peel.
- **Verification:** seed0102 RNG **4485/4485** (screen 0/25);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **294**/11405.
- **Lesson:** fireassist swap More owns direction letters before
  getdir; do not bind bare `dofire` when launcher is only in
  `uswapwep`. Late `dog_goal` `udist` often means an earlier leaked
  movement key.
- **Next:** seed0102 **screen** peel (More/prinv display), or
  seed0017 @ 2775 / seed0700 screens.

## D-0070 — seed0102 map glyphs + prinv period

- **Status:** fixed
- **Observed:** seed0102 RNG full but Scr **0/25**. Persistent cells:
  kobold `?` vs C `k` (CLR_BROWN); sink `?` vs C `{` (CLR_WHITE).
- **C locus:** `defsym.h` MONSYM (`S_KOBOLD`→`'k'`); PCHAR
  (`S_sink`→`'{'` CLR_WHITE, fountain/throne/altar/grave); `invent.c`
  `prinv` → `xprname(..., dot=TRUE)` trailing period.
- **Cause:** `mon_glyph` MLET_CH covered only dog/feline/rodent/lizard/
  human → unknown mlets rendered `'?'`. `terrain_glyph` defaulted
  furniture (typ SINK=30 etc.) to `'?'`. `xprname` omitted `dot`, so
  fireassist swap More lacked `hand).--More--`.
- **Change:** `js/display.js` full MONSYM `MLET_CH` + furniture
  cases in `terrain_glyph`; `js/objnam.js` `xprname(..., dot)`;
  prinv callers in wield/do_wear/invent pass `dot=true`.
- **Verification:** seed0102 Scr **0→17**/25 (RNG still full);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **311**/11405.
- **Named omission:** (retired by D-0071) Book overlay / cmdassist.
- **Next:** seed0017 @ 2775 / seed0700 screens / shared peels.

## D-0071 — seed0102 cmdassist help_dir + Book NHW_MENU offx

- **Status:** fixed
- **Observed:** seed0102 RNG full, Scr **17/25**. Scr 15: JS
  topline `cmdassist:…--More--` vs C fullscreen direction grid;
  later screens desynced because getdir **retried** after invalid
  keys and ate `\`, `^X`, etc. Scr 0: map glyphs under Book text
  (`k`, extra walls) where C blanks.
- **C locus:** `cmd.c` `getdir`/`help_dir`/`show_direction_keys`;
  `wintty.c` `tty_putstr` (`maxcol = strlen+1`),
  `tty_display_nhwindow`/`process_text_window` (NHW_MENU offx +
  leading pad); `quest.lua` legacy `output = "menu"`.
- **Cause:** (1) `getdir_cmdassist` used pline+more and looped on
  invalid keys; C shows NHW_TEXT then **returns 0** (only `?`
  retries). (2) Legacy `offx` used bare `strlen` without `+1` and
  painted text at `offx` without the leading pad space.
- **Change:** `js/dothrow.js` `help_dir`/`show_direction_keys` +
  getdir cancel-after-help / `?` retry / trailing-space prompt;
  `js/questpgr.js` `maxcol = strlen+1`, paint at `offx+1`,
  `moreCol = offx+1+8`.
- **Verification:** seed0102 **PASS** (4485/4485, 25/25) + strict;
  green + seed1500/1800/0060 PASS; full **6/44**, screens
  **320**/11405, RNG **90863**/792838.
- **Named omission:** `help_dir` Guidebook/`^letter` and nodiag
  grid-bug branch; other NHW_TEXT callers may still use wrong
  geometry.
- **Next:** seed0017 @ 2775 / seed0700 Scr 2/51 / seed2200
  `exercise`.

## D-0072 — seed0017 lookaround corridor-turn (run==1)

- **Status:** fixed
- **Observed:** seed0017 rng-diff @ **2775**: C `rn2(5)` @
  `distfleeck` vs JS `rn2(7)` @ `do_attack` (safemon bump). JS ended
  capital-`L` rush early, getch'd later keys (`j` into pet) while C
  kept running/monster phase.
- **C locus:** `hack.c` `lookaround` — STONE/IS_OBSTRUCTED are
  uninteresting (`continue`); run==1/3/8 corridor-follow updates
  `u.dx`/`u.dy` toward adjacent CORR when `corrct`/`i0` allow.
- **Cause:** JS `lookaround` called `end_running()` on
  `blocksMove(ahead)` (STONE typ=0 at dead-end). C does not stop for
  walls; it turns into the corridor. Premature run abort + Fast
  `umovement` left hero free to consume the next input mid-turn.
- **Change:** `js/cmd.js` `lookaround` — monster stop rules + run==1
  corridor-turn (`last_str_turn`, `corrct`/`i0`/`noturn`/`m0`).
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91263**/792838;
  seed0017 prefix **2775→3132** positional **3169**/3465; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** Blind early-return; traps/pools/NODIAG;
  `mon_visible`/M_AP furniture-object skip; AIR/ICE as uninteresting;
  run==2 corridor-widen stop; mention_walls plines.
- **Next:** seed0017 @ 3132 `dog_move`; seed0700 screen peel;
  seed2200 `exercise`.

## D-0073 — seed2200 `q`/`dodrink` POT_OIL (`peffect_oil`)

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2724**: C `rn2(2)` @
  `exercise(attrib.c:509)` vs JS `rn2(12)` @ `mcalcmove`. Session keys
  `q` then `h`; C screen `"That was smooth!"` / drink prompt
  `[fgh or ?*]`. JS unbound `q`, so `h` ran as west move from stairs.
- **C locus:** `potion.c` `dodrink` → `dopotion` → `peffects` →
  `peffect_oil` — uncursed unlit oil plines `"That was smooth!"` then
  `exercise(A_WIS, FALSE)` → `-rn2(2)`.
- **Cause:** no quaff path; movement key swallowed the potion letter.
- **Change:** `js/potion.js` (`dodrink`/`dopotion`/`peffect_oil` +
  drink getobj); `js/cmd.js` bind `'q'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91220**/792838;
  seed2200 prefix **2724→2733** positional **2790**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `peffect_*`; Strangled; fountain/sink/
  underwater drink; milky-ghost/smoky-djinni; lit-oil burn/`likes_fire`;
  worn-stack split; `more_experienced` on discover; getobj `?`/`*` menus.
- **Next:** seed2200 @ 2733 `z`/`dozap`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0074 — seed2200 `z`/`dozap` NODIR secret-door detect

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2733**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `z` then `c`; C screen `"You don't find anything."` / zap prompt
  `[c or ?*]`. JS unbound `z`, so `c` ran as SE move.
- **C locus:** `zap.c` `dozap` → `zappable` → `weffects` (always
  `exercise(A_WIS,TRUE)`) → `zapnodir` `WAN_SECRET_DOOR_DETECTION` →
  `detect.c` `findit` empty path.
- **Cause:** no zap path; movement key swallowed the wand letter.
- **Change:** `js/zap.js` (`dozap`/`zappable`/`weffects`/`zapnodir`/
  `learnwand` + zap getobj); `js/detect.js` `findit`/`findone`/
  hero-centered `do_clear_area`; `js/cmd.js` bind `'z'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91222**/792838;
  seed2200 prefix **2733→2772** positional **2794**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** IMMEDIATE/RAY `weffects` (`bhit`/`ubuzz`/
  `zap_dig`); `zapyourself`; `backfire` body; other NODIR (light/
  create/wish/enlighten/stasis); wrest pline; `check_capacity`/
  `nohands`; `check_unpaid`; `more_experienced`; `update_inventory`;
  findone flash/mimic/hider/invis/chest-trap/trapped-door.
- **Next:** seed2200 @ 2772 `r`/`doread`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0075 — seed2200 `r`/`doread` SCR_MAGIC_MAPPING

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2772**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `r` then `j`; C screen `"As you read the scroll, it disappears.  A
  map coalesces in your mind!"` / read prompt `[ijklm or ?*]`. JS
  unbound `r`, so `j` ran as south move.
- **C locus:** `read.c` `doread` → `seffects` (`exercise(A_WIS,TRUE)`
  when `oc_magic`) → `seffect_magic_mapping` → `detect.c`
  `do_mapping`/`show_map_spot` (second `exercise(A_WIS,TRUE)`).
- **Cause:** no read path; movement key swallowed the scroll letter.
- **Change:** `js/read.js` (`doread`/getobj-read/`seffects`/
  `seffect_magic_mapping`/`learnscroll`/`useup`); `js/detect.js`
  `do_mapping`/`show_map_spot`; `js/display.js`
  `magic_map_background`; `js/cmd.js` bind `'r'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91390**/792838;
  seed2200 prefix **2772→2925** positional **2940**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `seffect_*`; `study_book`; fortune/shirt/
  credit/marker/coin/orb/candy; Blind Braille gates; nommap/
  Hallucination/`make_confused`; blessed-SDOOR convert edge cases;
  `notice_mon_off`/`on`; `browse_map`/unconstrain; `trycall`;
  `can_chant`; `check_capacity`; `room_discovered`; trap/engraving
  restore after furniture in `show_map_spot`; SPE_MAGIC_MAPPING.
- **Next:** seed2200 @ 2925 `E`/`doengrave`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0076 — seed2200 `E`/`doengrave` fingertip Elbereth

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2925**: C `rn2(25)` @
  `doengrave(engrave.c:1223)` vs JS `rn2(5)`. Session keys `E` `-`
  (More) `Elbereth` Enter; C screen `"What do you want to write with?
  [- acden or ?*]`" then dust fingertip + getlin.
- **C locus:** `engrave.c` `doengrave` (DUST mix-up `!rn2(25)` per
  non-space) → `set_occupation(engrave)` → `make_engr_at` Elbereth
  `exercise(A_WIS,TRUE)`; `allmain.c` runs occupation before next
  `rhack`.
- **Cause:** `'E'` unbound → Unknown / movement; no engraving path.
- **Change:** `js/engrave.js` (`doengrave`/getobj-stylus/`make_engr_at`/
  occupation); `js/cmd.js` bind `'E'`; `js/allmain.js` occupation tick
  before `rhack`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91443**/792838;
  seed2200 prefix **2925→2979** positional **2993**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** wand/weapon/marker/towel/gem/ring stylus sfx;
  grave/altar/jello/swallow; add-to/overwrite yn; multi-turn dulling;
  del_engr/rloc beyond replace; engraving glyphs in `newsym`;
  `u_wipe_engr` body; livelog; demon/vampire blood default.
- **Next:** seed2200 post-Elbereth 0-RNG `/` UI then Lua shuffle @
  2979; seed0017 @ 3132 terrain; seed0700 screens.

## D-0077 — seed2200 `/` whatis + `?` help / `get_lua_version`

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2979**: C `rn2(3)` @ nhlib
  `shuffle(align)` vs JS `rn2(5)` @ `distfleeck`. C emits no RNG from
  post-Elbereth through step 108; step 109 `?`/`a` About triggers Lua.
- **C locus:** `pager.c` `dowhatis`/`do_look`/`dohelp`; `getpos.c`
  `getpos` + `handle_tip(TIP_GETPOS)`; `version.c` `doextversion` →
  `get_lua_version` (`nhlua.c`) → `nhl_init` loads `nhlib.lua`
  `shuffle(align)`.
- **Cause:** `'/'`/`'?'` unbound → Unknown; following `.`/`hjkl` were
  timed `donull`/moves before C's 0-RNG UI finished.
- **Change:** `js/pager.js` (`do_look`/`dowhatis`/`dohelp`/`checkfile`/
  `doextversion`); `js/getpos.js`; `js/cmd.js` bind `'/'`/`'?'`;
  `invent_lines` export for invent-pick whatis.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91280**/792838;
  seed2200 RNG **3018**/3018 Scr **1**/230; seed0700 RNG still full
  Scr **2**/51.
- **Named omission:** full `do_screen_description` glyph encyclopedia;
  tty NHW_TEXT geometry for help/`checkfile` pages; `whatdoes`
  keyhelp body beyond stub; `dokeylist`/`domenucontrols`/`option_help`
  /contact; PORT_HELP; getpos menu-jump/hilite/valids; lootabc true
  accelerators.
- **Next:** seed2200 screen peel / seed0017 @ 3132 terrain /
  seed0700 screens.

## D-0078 — H2344 NHW_MENU offx + botl get_strength_str

- **Status:** fixed
- **Observed:** seed0700 Scr **2**/51 with RNG full. First screen:
  Book of Amaterasu left-aligned (JS) vs pad-8 corner (C); botl
  `St:19` vs C `St:18/01`.
- **C locus:** `win/tty/wintty.c` `#define H2344_BROKEN` +
  `tty_display_nhwindow` NHW_MENU offx =
  `min(min(82, cols/2), cols-maxcol-1)` (fullscreen only when
  `maxrow>=rows || !menu_overlay`); `botl.c` `get_strength_str`.
- **Cause:** JS used stock `max(10, cols-maxcol-1)` then
  `offx==10 → fullscreen`, so long Amaterasu lines collapsed to
  col 0. Botl printed raw `acurr.a[A_STR]` (19) instead of
  `18/01`.
- **Change:** `js/questpgr.js` + `js/invent.js` `nhw_menu_geometry`
  H2344 offx; `js/attrib.js` `get_strength_str`; wired into
  `display.js` / `invent.js` / `questpgr.js` status lines.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318→361**/11405, RNG **91280**/792838;
  seed0700 Scr **2→44**/51; seed2200 still Scr **1**/230.
- **Named omission:** Samurai starting-pet christen (`Hachi`);
  invent Weapons header still ~2 cols left on Japanese-name
  invent; display-path Japanese disco names; seed2200 map
  `` ` `` vs ASCII `x`.
- **Next:** seed0700 pet `Hachi` / invent offx / Japanese disco;
  or seed2200 map cell; or seed0017 @ 3132 terrain.

## D-0079 — seed0700 Samurai Hachi + Japanese invent/disco

- **Status:** fixed
- **Observed:** seed0700 Scr **44**/51 (RNG full). Swap pline
  "your little dog" vs C "Hachi"; invent English short sword /
  yas / missing rustproof + 2-col offx; disco missing
  `shito`/`wakizashi`/`ninja-to` bracket lines.
- **C locus:** `dog.c` `makedog` + `do_name.c` `christen_monst` /
  `x_monnam`; `hack.c` `domove_swap_with_pet`; `objnam.c`
  Japanese/`makeplural` ya / quiver / `add_erosion_words`;
  `mkobj.c` lacquered Samurai `SPLINT_MAIL`; `o_init.c`
  `interesting_to_discover` / `disco_typename` / `discover_object`
  Samurai gate + `observe_object`.
- **Cause:** starting pet never christened; invent/disco lacked
  Japanese display path; lacquer `oerodeproof` absent; invent
  never called `observe_object` so wakizashi stayed `*`.
- **Change:** `js/dog.js` role petnames + `christen_monst`;
  `js/do_name.js` christen + `x_monnam_tame`; `js/cmd.js` swap
  pline; `js/objnam.js` Japanese/`ya`/quiver/rustproof/
  `disco_typename`; `js/mkobj.js` lacquer; `js/invent.js`
  Samurai disco + `observe_object` in `invent_lines`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **361→370**/11405, RNG
  **91280→91380**/792838; seed0700 **PASS** (51/51).
- **Named omission:** full `x_monnam` (hallu/invis/saddle/shk);
  pony saddle/`see_monster_closeup`; other erosion proofs;
  `In_quest` lacquer path; xname-path `observe_object` beyond
  invent_lines.
- **Next:** seed2200 map cell / seed0017 @ 3132 terrain /
  seed1150 `dog_move` / seed0016 `next_ident`.

## D-0080 — seed2200 STATUE map glyph (not ROCK_CLASS)

- **Status:** fixed
- **Observed:** seed2200 Scr **1**/230 (RNG full). First cell
  (16,11): C ASCII `x` CLR_WHITE vs JS ROCK_CLASS `` ` ``.
  Session has a floor STATUE of grid bug (`corpsenm` PM_GRID_BUG,
  mlet `S_XAN`).
- **C locus:** `display.h` `obj_to_glyph` → `statue_to_glyph`;
  `display.c` mapglyph statue branch uses `mons[offset].mlet` +
  `obj_color(STATUE)` (CLR_WHITE), not `S_rock`/ROCK_CLASS.
- **Cause:** JS `obj_glyph` always used `DEF_OC_SYM[ROCK_CLASS]`
  for statues; C since 3.6 shows the depicted monster letter.
- **Change:** `js/display.js` `obj_glyph` STATUE → `MLET_CH[mlet]`
  + statue `oc_color` (omit hallu/`random_monster` statue path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **370→380**/11405, RNG
  **91380**/792838; seed2200 Scr **1→11**/230.
- **Named omission:** hallucination statue `random_monster`;
  pile-top statue glyph flags; gender FEM statue offset.
- **Next:** seed2200 @ screen 10 whatis/overlay (room `·` vs
  gray blank) / seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0081 — seed2200 magic_map dark_room floors

- **Status:** fixed
- **Observed:** seed2200 Scr **11**/230 (RNG full). Screen 10 after
  `r`+`j` SCR_MAGIC_MAPPING: 118 cells — C DEC floor `~`/NO_COLOR
  vs JS blank/`CLR_GRAY` in distant rooms (not hero room).
- **C locus:** `display.c` `magic_map_background`;
  `reglyph_darkroom` (`showsyms[S_darkroom]=showsyms[S_room]`);
  `detect.c` `show_map_spot`/`do_mapping`.
- **Cause:** JS always rewrote out-of-sight `!waslit` ROOM floors to
  GLYPH_NOTHING blank. C with default `dark_room`+color uses
  `DARKROOMSYM`, which paints as the room-floor glyph.
- **Falsified:** whatis/NHW overlay clear painting blanks over map
  (screen 10 is post-mapping before `/`).
- **Change:** `js/display.js` `magic_map_background` — blank only when
  `!(dark_room && use_color)`; else keep floor ·/NO_COLOR.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **380→458**/11405, RNG
  **91380**/792838; seed2200 Scr **11→89**/230.
- **Named omission:** `newsym` still omits `waslit=(lit!=0)` on
  cansee; full S_darkroom/CLR_BLACK vs showsym equate.
- **Next:** seed2200 getpos tip @ screen 36 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0082 — seed2200 getpos tip NHW_MENU corner

- **Status:** fixed
- **Observed:** seed2200 Scr **89**/230 (RNG full). Screen 36 tip:
  C text at col ~10 over intact map, cursor `[16,8]`; JS blanked
  rows 0–20, painted at col 0, cursor `[5,8]`.
- **C locus:** `dat/nhcore.lua` `show_getpos_tip` → `nhlua.c`
  `nhl_text` → `create_nhwindow(NHW_MENU)` + `select_menu`
  PICK_NONE; `wintty.c` H2344 corner
  `offx = min(min(82,cols/2), cols-maxcol-1)` (maxcol = strlen+2;
  morestr `"(end) "`).
- **Cause:** JS `show_getpos_tip` invented a fullscreen blank +
  col-0 paint; C uses the same corner NHW_MENU path as invent
  (`paint_corner_nhw_menu`). Longest tip line 68 → maxcol 70 →
  offx 9 → cursor col 16.
- **Change:** `js/getpos.js` `show_getpos_tip` →
  `paint_corner_nhw_menu(lines, '(end) ')`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **458→459**/11405, RNG
  **91380**/792838; seed2200 Scr **89→90**/230.
- **Named omission:** getpos menu-jump/hilite/valids; farlook
  autodescribe still uses `dfeature_at`/`stairs_description`
  instead of cmap `lookat` (`S_brupstair`).
- **Next:** seed2200 farlook stairs @ screen 46 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0083 — seed2200 farlook stairs lookat + getpos cursor

- **Status:** fixed
- **Observed:** seed2200 Scr **90**/230 (RNG full). Screen 46 tip:
  C `"branch staircase up"` cursor `[21,10]`; JS
  `stairs_description` Dlvl1 text and/or cursor stuck at hero
  `[22,10]`.
- **C locus:** `pager.c` `lookat` cmap default →
  `defsyms[S_brupstair].explanation`; `display.c` `back_to_glyph`
  STAIRS when `known_branch_stairs`; `getpos.c` `auto_describe`
  prints **firstmatch** after lookat (not full out_str /
  `dfeature_at`); `curs(WIN_MAP)` **after** message paint.
- **Cause:** (1) farlook tip used `dfeature_at` →
  `stairs_description` ("… out of the dungeon") instead of cmap
  explanation; (2) `flush_screen`/`_buildScreenOutput` reset
  cursor to hero after getpos `setCursor`, undoing map cursor
  before `nhgetch` capture.
- **Change:** `js/pager.js` stair/wall/floor/self `lookat` subset +
  DECgraphics floor/corridor `do_screen_description` envelope;
  export `known_branch_stairs`; `js/getpos.js` set cursor after
  flush; `js/display.js` `more()` word-wrap only when len≥CO.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **459→478**/11405, RNG
  **91380**/792838; seed2200 Scr **90→109**/230.
- **Named omission:** full showsyms-driven cmap scan (ASCII
  ladder/`#` sets); getpos rush/run (D-0084).
- **Next:** seed2200 @ screen 65 getpos continue / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0084 — seed2200 getpos capital rush (HJKLYUBN)

- **Status:** fixed
- **Observed:** seed2200 Scr **109**/230 (RNG full). Screen 65 key
  `"H"`: C cursor `[17,13]` `"floor of a room"`; JS stayed at
  `[25,13]` `"corridor"` (ignored uppercase).
- **C locus:** `getpos.c` `getpos` — `movecmd(c, MV_WALK)` one step;
  `movecmd(c, MV_RUN)` via `highc(dirchars)` / `MV_RUSH` via
  `C(dirchars)` → `dx = 8 * u.dx` when `!iflags.getloc_moveskip`,
  then `truncate_to_map`.
- **Cause:** JS DIR map was lowercase-only; capital `H` fell through
  as no-op, so continued getpos never reached the room floor cell.
- **Change:** `js/getpos.js` — `truncate_to_map`; `HJKLYUBN` and
  Ctrl-dir rush/run 8× step (moveskip Off path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **478→482**/11405, RNG
  **91380**/792838; seed2200 Scr **109→113**/230.
- **Named omission:** `getloc_moveskip` glyph-skip loop; menu jump /
  hilite / valids.
- **Next:** seed2200 @ screen 80 checkfile pager cursor /
  seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0085 — seed2200 checkfile NHW_MENU process_text_window

- **Status:** fixed
- **Observed:** seed2200 Scr **113**/230 (RNG full). Screen 80 after
  `/`→`?` getlin `"fountain"` → `checkfile`: C cursor `[36,15]`
  corner overlay; JS fullscreen TEXT cursor `[8,15]` then (with
  corner attempt) `[35,15]` from trailing `\r` inflating maxcol.
- **C locus:** `pager.c` `checkfile` — `create_nhwindow(NHW_MENU)` +
  `putstr` + `display_nhwindow` → `wintty.c` `process_text_window`
  (H2344 offx, leading pad, dmore `--More--`); `hacklib.c`
  `tabexpand` after one leading tab on body lines.
- **Cause:** JS used fullscreen `show_text_pages` (NHW_TEXT-ish
  clearScreen); data.base `\r` left in lines shifted offx left by 1.
- **Change:** `js/pager.js` `show_nhw_menu_text` + CR-normalize
  `readDat` + tabexpand in `lookup_data_base`; `checkfile` calls
  NHW_MENU path.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **482→486**/11405 (with D-0086),
  RNG **91380**/792838; seed2200 Scr **113→117**/230.
- **Named omission:** tall checkfile fullscreen paging edge cases;
  `display_file` still NHW_TEXT-ish `show_text_pages`.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0086 — seed2200 doname xname SCR/SPE/RIN/WAN + bimanual hands

- **Status:** fixed
- **Observed:** seed2200 invent pick (`/`→`i`): C
  `scroll/spellbook/ring/wand of …`, `(weapon in hands)`; JS
  `scr`/`spe`/`rin`/`wan` tokens and `(weapon in right hand)`.
- **C locus:** `objnam.c` `xname` SCROLL/SPBOOK/RING/WAND;
  `doname` W_WEP + `bimanual` (`obj.h` → `oc_bimanual`/`oc_big`);
  `objects.h` WEAPON `bi` bit.
- **Cause:** `pretty_base` lowercased enum tokens; W_WEP ignored
  bimanual; extractor omitted `oc_big`.
- **Change:** `scripts/extract-objects.py` + regenerate
  `oc_big`; `js/objnam.js` xname class prefixes + `bimanual` →
  `(weapon in hands)`.
- **Verification:** with D-0085; invent screen 83 matches; seed2200
  Scr **117**/230; green cohort PASS.
- **Named omission:** unlabeled/called/descr paths; ammo/missile
  `(wielded)` phrasing; tethered aklys; glow/artifact_light paren
  overwrite.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0087 — seed2200 look_all / look_engrs NHW_TEXT

- **Status:** fixed
- **Observed:** seed2200 `/`→`m` screen 87: C cursor `[8,23]` and
  lines ` <23,9>   @  human wizard…` / ` <20,10>  f  tame kitten`;
  JS `--More--` on row 4, bare `    human wizard` / `tame monster`.
  Nearby objects listed every floor pile; C only glyph-shown.
- **C locus:** `pager.c` `look_all`/`look_engrs`/`self_lookat`/
  `look_at_monster`; `wintty.c` `tty_display_nhwindow(NHW_TEXT)` +
  `process_text_window` (more on `rows-1`); `getpos.c` `coord_desc`;
  `objnam.c` STATUE xname; `display.c` `newsym`/`glyph_at`.
- **Cause:** `show_text_pages` put `--More--` after content; look_all
  skipped coords/glyph and used `data.mname` + `loc.objects` instead
  of `data.name` + currently-shown (`cansee`/`mon_visible`) filter;
  STATUE pretty_base omitted corpsenm; look_engrs stringified
  `engr_txt` object.
- **Change:** NHW_TEXT `--More--` on row 23; look_all MAP prefixes +
  `look_shown_at`; statue `of a <pm>`; look_engrs remembered/
  obscured-by format + S_engroom `` ` ``.
- **Verification:** seed2200 Scr **117→167**/230; green + cohort
  PASS + strict; full **7/44**, screens **486→536**/11405, RNG
  **91379**/792838.
- **Named omission:** invis/warning glyphs; `object_from_map` fakeobj;
  compass/screen coord modes; look_traps format; `display_file`
  license page (seed2200 @ 110); S_engrcorr/grave headstone.
- **Next:** seed2200 `display_file`/license @ screen 110 /
  seed0017 terrain / seed1150.

## D-0088 — seed2200 doextversion runtime options / Lua license

- **Status:** fixed
- **Observed:** seed2200 Scr 167/230; first miss screen 109 — C has
  full options wrap through `browser…5.0.0 only`, windowing/soundlib/
  Lua copyright, then page 2 Permission block; JS truncated at
  `prefix, Lua interpreter version: 5.4` and mis-indented license.
- **C locus:** `version.c` `doextversion` OPTIONS_AT_RUNTIME +
  `mdlib.c` `build_options` / `do_runtime_info` / `lua_info[]`;
  outdented headers insert blank separators.
- **Change:** `doextversion_runtime_lines()` matching contest MacOS
  tty/nosound feature set + 5-space Permission continuation.
- **Verification:** with D-0089/D-0090; seed2200 Scr **167→176**/230.

## D-0089 — NHW_TEXT dmore quitchars

- **Status:** fixed
- **Observed:** history page at Benson: C stays for keys `?`/`e` then
  ESC; JS advanced on any key into Bill Dyer pages C never shows.
- **C locus:** `wintty.c` `dmore` → `getline.c` `xwaitforspace(quitchars)`
  with `quitchars=" \\r\\n\\033"` (`decl.c`); ESC → WIN_CANCELLED.
- **Change:** `text_page_wait()` / `show_text_pages` only accept
  space/CR/LF/ESC; other keys stay on page (capture boundaries kept).
- **Verification:** history pages through ESC match; green cohort PASS.

## D-0090 — seed2200 dowhatdoes

- **Status:** fixed
- **Observed:** after history, help `f`: C `Ask about…--More--` then
  `What command?` then `i       show your inventory (#inventory).`;
  JS stub dumped full keyhelp as NHW_TEXT.
- **C locus:** `pager.c` `dowhatdoes` / `dowhatdoes_core` /
  `whatdoes_help`; `cmd.c` `key2extcmddesc` / `key2txt`.
- **Change:** tip-once + more; yn-style prompt; `key2extcmddesc` for
  rhack-bound letters; `&`/`?` → stripped KEYHELP pages.
- **Verification:** seed2200 Scr **167→176**/230 (prefix through 157);
  green + cohort PASS + strict; full **7/44**, screens
  **536→545**/11405, RNG **91371**/792838.
- **Named omission:** full `key2extcmddesc` misc_keys/number_pad/
  rush-run; dokeylist; contact; cmdhelp `&?` conditionals (#if 0 in C).
- **Next:** seed2200 `option_help` @ screen 158 / seed0017 terrain /
  seed1150.

## D-0091 — seed2200 option_help

- **Status:** fixed (RC path harness-only residual)
- **Observed:** help `g` showed `(option help stub)`; C `option_help`
  NHW_TEXT lists booleans/compounds/others + epilog (screens 158–165).
- **C locus:** `options.c` `option_help` / `next_opt`; `optlist.h`
  `allopt[]`; `cfgfiles.c` `get_configfile`; tty wrap for long
  OPTIONS= intro. Contest flags: ALTMETA/CRASHREPORT/PREV_MSGS;
  no SCORE_ON_BOTL/TIMED_DELAY; tty WC/WC2 subset.
- **Change:** `scripts/extract-optlist.py` → `js/generated/optlist_data.js`;
  `option_help_lines()` + `next_opt` packing; help `g` →
  `show_text_pages`. Over-long `%-20s` compounds render unpadded to
  fit CO (glyph / whatis_filter). Wrap-forcing synthetic config path
  (not recording `$HOME`).
- **Verification:** seed2200 Scr **176→199**/230 (158 path cells only
  remaining option_help miss); green + cohort PASS + strict; full
  **7/44**, screens **545→568**/11405, RNG **91371**/792838.
- **Named omission:** recording-machine `get_configfile()` absolute
  path (`verify-rerecord` elides; do not hardcode); dokeylist;
  contact; full `doset`/`O` menu.
- **Next:** seed0017 @ 3132 terrain / seed1150 `dog_move` / seed2200
  post-help after accepting path residual.

## D-0092 — `in_mk_themerooms` for themerms `check_room`

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet (30,5) `mfndpos` cnt=4; missing
  walkable `(30,4)` (JS VWALL). C DEC screen: east door col **35**,
  fountain **31**, floor at **(30,4)** (DEC `~`≡room floor / possible
  D_NODOOR). JS room `lx=31,hx=35`, east door **36**, fountain **32**.
- **C locus:** `mklev.c` `makerooms` sets `gi.in_mk_themerooms` around
  Lua `themerooms_generate`; `sp_lev.c` `check_room` returns FALSE on
  non-STONE when `in_mk_themerooms` (no shrink).
- **Change:** `js/mklev.js` `themerooms_generate` toggles
  `game.in_mk_themerooms` for the call (was never set → JS could shrink
  where C aborts).
- **Verification:** green + cohort PASS + strict; full **7/44**,
  screens **568**/11405, RNG **91371**/792838. seed0017 still prefix
  **3132** — this flag alone is not the (30,4) cause for this seed.
- **Rejected:** “pool at (30,4)” — DEC `~` is floor. “mtrack/nxti” —
  inactive (`distminU=3`).
- **Next:** compare first-room `dx`/`xabs` / `split_rects` vs C map
  east-door x; or seed1150 @ 3032 `throw_obj`.

## D-0093 — getdir flush `--More--` + throw_obj multishot

- **Status:** fixed
- **Observed:** seed1150 @ **3032**: C `rnd(2)` @ `throw_obj` vs JS
  `rn2(5)` `distfleeck`. C sequence: fireassist swap `--More--`s,
  pet-drop `--More--`, getdir, `l` → “You shoot 2 flint stones.”
  JS skipped `more()` before getdir so the pet-drop space cancelled
  getdir and `l` walked.
- **C locus:** `cmd.c` `yn_function`/`tty_yn_function` (more when
  `TOPLINE_NEED_MORE`); `dothrow.c` `throw_obj` multishot +
  `multishot_class_bonus` (PM_CAVE_DWELLER −P_SLING/P_SPEAR).
- **Change:** `js/dothrow.js` `getdir_cmdassist` → `flush_topl_more()`
  before prompt; `throw_obj` ports volley calc + class bonus +
  `rnd(multishot)` + shoot pline.
- **Verification:** green + cohort PASS + strict; seed1800 PASS;
  seed1150 prefix **3032→3042** (rng-diff), positional **3070**/3137
  Scr **22**/51; full **7/44**, screens **568**/11405, RNG
  **91398**/792838.
- **Rejected:** “seed0017 room x-shift” — display `setCell(x-1)`;
  C screen fountain col 31 ≡ JS map x 32. seed0017 still @ 3132
  (`mfndpos` cnt).
- **Named omission:** full `xname`/`singular` for volley pline
  (doname stand-in); ACURRSTR crossbow gate; quest-artifact launcher
  bonus; `weapon_skills` init beyond defaults.
- **Next:** seed1150 @ 3042 extra `obj_resists` before `dog_move`;
  seed0017 mfndpos neighbour; seed2200 post-help.

## D-0094 — throw landing must `stackobj`

- **Status:** fixed
- **Observed:** seed1150 @ **3042**: C `rn2(12)` @ `dog_move` vs JS
  extra `rn2(100)` `obj_resists`. After sling volley of 2 flints,
  JS `dog_goal` `dogfood`'d two separate `fobj` FLINT nodes at
  `(51,14)` plus food + 2 golds (5 rolls); C merged the flints so
  only 4 `obj_resists` then selection RNG.
- **C locus:** `invent.c` `stackobj`/`merged`/`mergable`;
  `dothrow.c` `throwit` calls `stackobj` after `place_object`.
- **Cause:** JS `throwit` placed without merge; `dog_goal` walks
  `fobj` and always `dogfood`s in-bbox objects.
- **Change:** `js/mkobj.js` floor `mergable`/`merged`/`stackobj`
  (oc_merge approximated until extractor emits it); `throwit`,
  pet `mdrop_obj`, and trap miss-path call `stackobj`.
- **Verification:** green + cohort PASS + strict; seed1150
  **rng-diff OK** (3137/3137) Scr **22**/51 + strict lengths;
  full **7/44**, screens **568**/11405, RNG **91465**/792838.
- **Named omission:** `objects[].oc_merge` not in extractor (class
  heuristic + boulder/statue/boomerang denylist); full `mergable`
  shop/mail/globby/candle/erosion arms deferred.
- **Next:** seed1150 screen peel (Scr 22/51) / seed0017 @ 3132
  `mfndpos` / seed2200 post-help.

## D-0095 — seed1150 look_here + Monnam MGIVENNAME

- **Observed:** seed1150 Scr **22**/51 (RNG full): screen 6 C topline
  `"You see here a food ration."` vs JS blank; then pet plines
  `"The little dog picks/drops…"` vs C `"Slasher …"`.
- **C locus:** `hack.c` `spoteffects` → `pickup.c` `pickup`/
  `check_here` → `invent.c` `look_here`; `do_name.c` `Monnam`/
  `mon_nam` / `x_monnam` `MGIVENNAME` → `ARTICLE_NONE`.
- **Cause:** (1) JS `domove` never called `spoteffects`; with
  `!autopickup`, C always `check_here`→`look_here` on floor objects.
  (2) Caveman pet already christened `Slasher`, but dogmove `Monnam`
  hard-coded `"The <type>"`.
- **Change:** `js/pickup.js` `check_here`/`pickup`/`spoteffects`;
  `cmd.js` `domove` → `spoteffects(true)` after move; `do_name.js`
  export `Monnam`/`noit_Monnam`; dogmove imports them.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **22→27**/51 RNG full; full **7/44**,
  screens **568→574**/11405, RNG **91465→91471**/792838.
- **Named omission:** autopick body / `,` menus; `mention_decor`/
  `describe_decor`; pool/trap/sink arms of `spoteffects`; full
  `x_monnam` hallu/invis/saddle/priest/shk.
- **Rejected:** forcing corridor `#` to `NO_COLOR` under
  `lit_corridor` (raises seed1150 Scr, drops seed0900 to 12/84).
- **Next:** seed1150 corridor `#` color (C 8 vs JS 15) without
  regressing seed0900; or seed0017 mfndpos / invent Scr 38+.

## D-0096 — out-of-sight lit corridor → dark corr

- **Symptom:** seed1150 Scr **27**/51: `#` CLR_WHITE(15) vs C
  NO_COLOR(8) at out-of-sight unlit CORR; seed0900 needs visible
  lit-corridor white.
- **C locus:** `display.c` `newsym` (`waslit=(lit!=0)`; `!cansee`
  remap `S_litcorr`→`S_corr` when `!waslit` or dark_room+color);
  `back_to_glyph` / `reset_glyphmap` (shared `#` → CLR_WHITE for
  litcorr; S_corr CLR_GRAY → tty NO_COLOR).
- **Cause:** JS kept remembered `S_litcorr`/CLR_WHITE when leaving
  sight; never set `waslit` on cansee. Blind “always NO_COLOR” is
  wrong — visible `lit_corridor` must stay white (seed0900).
- **Change:** `js/display.js` `newsym` sets `waslit`; `!cansee`
  remaps remembered lit `#`→NO_COLOR; `terrain_glyph` uses
  `waslit||lit_corridor`.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **27→46**/51 RNG full; full **7/44**,
  screens **574→593**/11405, RNG **91471**/792838.
- **Named omission:** `newsym` ROOM→DARKROOMSYM memory arm;
  engraving/trap glyphs; hallu/`see_objects`.
- **Next:** seed1150 invent/UI @ screen 38 / seed0017 mfndpos /
  seed2200 post-help.

## D-0097 — GemStone xname + throw volley + ^X gender/MC

- **Symptom:** seed1150 Scr **46**/51 @ screen 38: JS
  `"You shoot 2 15 uncursed flints (in quiver pouch)."` vs C
  `"You shoot 2 flint stones."`; then ^X `"male human Caveman"` vs
  `"human Caveman"` and missing Attributes `"You are warded."`.
- **C locus:** `objnam.c` `GemStone` / `xname_flags` GEM_CLASS;
  `dothrow.c` `throw_obj` `You("%s %d %s.", … xname/singular)`;
  `insight.c` background gender omit when `urole.name.f`; 
  `attributes_enlightenment` `magic_negation` → warded/guarded/
  protected; `mhitu.c` `magic_negation` worn `a_can`.
- **Cause:** JS volley used `doname`; `pretty_base` omitted
  `" stone"`; ^X always printed gender; MC line absent / wrong
  section (Status vs Attributes).
- **Change:** `js/objnam.js` GemStone + GEM_CLASS `xname`/`singular`;
  `js/dothrow.js` volley uses `xname`; `js/invent.js` distinct-`name.f`
  gender omit + Attributes `magic_negation` (`oc_level` as `a_can`).
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 **PASS**; full **8/44**, screens
  **593→598**/11405, RNG **91471**/792838.
- **Named omission:** full `magic_negation` Protection/amulet bumps;
  roles.js `name.f=null` where C has 0 (still same-string proxy);
  full `xname` GEM unknown/called paths; armor pair-of in
  `obj_typename`.
- **Next:** seed0017 @ 3132 mfndpos / seed2200 Scr 199 / getbones.

## D-0098 — dog_move mtrack uses C `goto nxti`

- **Status:** fixed
- **Observed:** JS `dog_move` mtrack backtrack `continue` only advanced
  the inner `mtrack[]` loop; C `goto nxti` skips the candidate.
- **C locus:** `dogmove.c` `dog_move` mtrack loop → `goto nxti`.
- **Change:** `js/dogmove.js` labeled `candloop` + `continue candloop`
  when `rn2(MTSZ*(k-j))` says skip.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700/1150 PASS; full **8/44**, screens **598**/11405, RNG
  **91410**/792838. seed0017 still @ **3132** (`distminU=3`, mtrack
  inactive on that peel).
- **Next:** seed0017 (30,4) terrain (D-0099).

## D-0099 — seed0017 dog_goal gettrack (!couldsee)

- **Status:** fixed
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet **(30,5)** DOOR, hero **(29,8)**,
  `mfndpos` cnt=4 same cells as JS.
- **C recorder dump (after mklev):** `levl[30][4].typ=VWALL` — same as
  JS. Terrain-writer theory **falsified**.
- **C dump at peel (cc≈3130):** `couldsee(pet)=0`, `gg=(29,5)`,
  `gtyp=UNDEF`. After closer pick `(29,5)` updates `nidist`, former
  equal-distance `(29,6)` becomes farther → **3×** `rn2(12)`.
- **C locus:** `dogmove.c` `dog_goal` — when goal is hero and
  `!in_masters_sight`, `gettrack(omx,omy)` redirects `gg`; `track.c`
  `settrack` each new turn.
- **Cause:** JS `dog_goal` omitted the gettrack/ogoal/FARAWAY block;
  `track.c` was unported, so even with correct `couldsee` the goal
  stayed at the hero → only 2 farther cells.
- **Change:** `js/track.js` (`initrack`/`settrack`/`gettrack`);
  `allmain` calls `settrack` before `moves++`; `dog_goal` ports
  gettrack/ogoal (wantdoor `view_from` do_clear_area omitted → hero
  fallback).
- **Rejected:** missing walkable (30,4); room x-shift; wallification;
  mfndpos probe “extra neighbour” as the C map state.
- **Verification:** seed0017 prefix **3132→3327** (`prayer_done`);
  green+strict PASS; cohort seed1500/1800/0060/0102/0700/1150 PASS;
  full **8/44** Scr **598** RNG **91540**.
- **Next:** seed0017 @ 3327 `prayer_done` / `#pray`.

## D-0100 — post-fill full-map wallification

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** C `themerooms_post_level_generate` ends with
  `wallification(1,0,COLNO-1,ROWNO-1)` after Lua `post_level_generate`;
  JS `makelevel` omitted that call (Lua postprocess empty for default).
- **C locus:** `mklev.c` `themerooms_post_level_generate`
- **Change:** `js/mklev.js` `makelevel` calls `wallification` after
  special-room fill (no Lua postprocess queue yet — named omission).
- **Verification:** green+strict PASS; cohort seed1500/1800/0060/0102/
  0700/1150 PASS; full **8/44** Scr **598** RNG **91410**; seed0017
  still **3132** — wallification is not the (30,4) writer.
- **Next:** seed0017 @ 3327 `prayer_done` (D-0099 gettrack cleared 3132).

## D-0101 — seed0017 `#pray` / `prayer_done` / `angrygods`

- **Status:** fixed
- **Observed:** seed0017 @ **3327**: C `rn2(1000)` @ `prayer_done`
  (`rnz(250)`) vs JS missing. Moves `#pray\n` after altar approach.
- **C locus:** `pray.c` `dopray` / `can_pray` / `prayer_done` /
  `gods_upset` / `angrygods` / `godvoice`; `cmd.c` `doextcmd` returns
  callee `ECMD_*`.
- **Cause:** JS had no `#pray` extcmd and no `pray.js`. With
  `ublesscnt=300`, `can_pray` sets `p_type=0` (too soon) even on a
  coaligned altar → `prayer_done` does `rnz(250)` + `change_luck(-3)`
  + `gods_upset` → `angrygods`. Samurai `initrecord>=STRIDENT` +
  Luck=-3 → `maxanger=4`; case 0 displeased then `rnz(300)`.
- **Change:** new `js/pray.js` (`can_pray`/`dopray`/`prayer_done`/
  `water_prayer`/`gods_upset`/`angrygods` cases 0–3/`godvoice`);
  `getline.js` `#pray`; `doextcmd` returns ECMD; `cmd.js` `#` keeps
  `move` on `ECMD_TIME`.
- **Verification:** seed0017 RNG **3465**/3465 Scr **2**/67; seed0106
  prefix **→2639** (`do_attack`); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150 PASS; full **8/44** Scr **599** RNG
  **91965**.
- **Next:** seed0017 Scr (legacy/Book) / seed2200 Scr 199 / seed0106
  @ 2639 `do_attack`.

## D-0102 — askname splash + ParanoidPray yn

- **Status:** fixed
- **Observed:** seed0017 Scr **2**/67 with full RNG. Screen 0 C is
  copyright + `Who are you?` (no `OPTIONS=name`); JS skipped to Book.
  After askname, Scr **66**/67 — residual idx 46 C
  `Are you sure you want to pray? [yn] (n)` vs JS already on prayer
  `--More--` (ParanoidPray omitted).
- **C locus:** `wintty.c` `tty_init_nhwindows` / `tty_askname`;
  `role.c` `plnamesuffix`; `options.c` default
  `paranoia_bits = PARANOID_PRAY|…`; `pray.c` `dopray`;
  `topl.c` `tty_yn_function`; `cmd.c` `paranoid_query`.
- **Cause:** (1) JS invented `plname='Hero'` when rc omitted name, so
  typed `Akira` keys were eaten by Book's non-quitchar loop. (2)
  Default `PARANOID_PRAY` requires yn before prayer; JS skipped it so
  the confirm key only shifted one screen.
- **Change:** `js/askname.js` splash + `tty_askname` (grid paint only —
  no `flush_screen`); `jsmain` asks when `!opts.name` + default
  `paranoia_bits`; `getline.js` `yn_function`; `dopray` ParanoidPray
  confirm.
- **Verification:** seed0017 **PASS** RNG **3465**/3465 Scr **67**/67
  + strict; green+cohort PASS; full **9/44** Scr **718** RNG
  **91965**.
- **Next:** seed2200 Scr 199 / seed0106 @ 2639 `do_attack` /
  seed0077 chargen `player_selection`.

## D-0103 — seed0106 `#chat` / `dochat` / `domonnoise` MS_BARK

- **Status:** fixed
- **Observed:** seed0106 @ **2639**: C `rn2(7)` @ `do_attack`
  vs JS `rn2(5)` @ `distfleeck`. Keys after prayer: `#chat\n` +
  `l` + `h`. Screen: empty-east chat then swap with little dog.
- **C locus:** `sounds.c` `dotalk`/`dochat`/`domonnoise` MS_BARK;
  `cmd.c` extcmdlist `"chat"`; `getline.js` EXT_CMDS.
- **Cause:** JS had no `#chat`. C uses `l` as getdir (0 RNG, chat
  empty → ECMD_OK); JS treated `l` as move east → turn +
  `distfleeck`. Second `#chat`+`l` talks to dog after swap →
  `"The little dog barks."` + ECMD_TIME.
- **Change:** `js/sounds.js` (`dotalk`/`dochat`/`domonnoise`
  MS_BARK via S_DOG); `getline.js` EXT_CMDS `chat`.
- **Verification:** seed0106 prefix **2639→2713** (`kick_door`/
  `exercise`); green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **91887**/792838 (positional aggregate can drop when a wrong
  path’s accidental later matches disappear).
- **Named omission:** other MS_*; shop `price_quote`; wall/
  statue talk; `night()` howl; priest/`shk`/`quest` chat;
  `#chronicle`/`#conduct` still unknown.
- **Next:** seed0106 @ 2713 door kick / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0104 — seed0106 `kick_door` CLOSED/LOCKED bust

- **Status:** fixed
- **Observed:** seed0106 @ **2713**: C `rn2(19)` @ `exercise`
  then `rn2(40)`/`rnl(35)` @ `kick_door` vs JS `rn2(2)` (kick_ouch
  `exercise(A_DEX,FALSE)`).
- **C locus:** `dokick.c` `kick_door` (CLOSED/LOCKED after
  open/broken/nodoor → `kick_dumb`); `attrib.c` `exercise`;
  `rnd.c` `rnl`.
- **Cause:** JS `kick_door` deferred closed doors to `kick_ouch`
  (hurt path). C always `exercise(A_DEX,TRUE)` then
  `rnl(35) < avrg_attrib` (martial DEX bonus), then shatter /
  crash-open / Thwack-Whammm.
- **Change:** `js/dokick.js` `kick_door` CLOSED/LOCKED envelope
  (Levitation→ouch; DEX exercise; rnl bust; trap/shatter/crash;
  fail Thwack/Whammm).
- **Verification:** seed0106 prefix **2713→2912** (`monmulti`/
  `m_throw`); positional **2784→3159**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92262**/792838.
- **Named omission:** `martial()`; giant doorbuster; shop
  `in_rooms`/`add_damage`/`pay_for_damage`; town watchman;
  `b_trapped` body; Blind `feel_location`; kick_monster/object/
  SDOOR-SCORR/furniture.
- **Next:** seed0106 @ 2912 `monmulti`/`mthrowu` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0105 — seed0106 `thrwmu` / `monmulti` / move-then-shoot

- **Status:** fixed
- **Observed:** seed0106 @ **2912**: C `rnd(1)` @ `monmulti` then
  `next_ident`/`m_throw` `rn2(5)` vs JS still `m_move` `rn2(12)`.
- **C locus:** `monmove.c` `dochug` (MMOVE_MOVED fall-through);
  `mhitu.c` `mattacku` AT_WEAP `range2`; `mthrowu.c` `thrwmu`/
  `monshoot`/`monmulti`/`m_throw`/`thitu`/`u_catch_thrown_obj`/
  `drop_throw`; `weapon.c` `select_rwep`/`dmgval`;
  `dothrow.c` `should_mulch_missile`; `invent.c` `delobj`→
  `obj_resists(0,0)`.
- **Cause:** JS `dochug` returned early on `MMOVE_MOVED` and gated
  attacks on `nearby`, so ranged `thrwmu` never ran. C allows
  move-then-shoot when `!nearby && AT_WEAP`.
- **Change:** `js/monmove.js` fall-through; `js/mhitu.js` ranged
  `mattacku`; `js/mthrowu.js` + `js/weapon.js` throw envelope;
  `js/mkobj.js` `delobj`.
- **Verification:** seed0106 prefix **2912→2962** (`mattacku` melee);
  positional **3159→3217**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92304**/792838.
- **Named omission:** melee `mattacku`/`hitmu`/`missmu`; polearm/
  spit/breath; `hold_another_object` on catch; `ohitmon`;
  `flooreffects`/ship; full `mattk[]`; elf/orc/gnome racial
  multishot; extractor `oc_wsdam` (table stand-in); `mon_wield`
  HTH; cursed slip path beyond roll.
- **Next:** seed0106 @ 2962 melee `mattacku` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0106 — seed0106 `mattacku` melee / `hitmu`

- **Status:** fixed
- **Observed:** seed0106 @ **2962**: C `rnd(20)` @ `mattacku` then
  `hitmu` `d(1,4)` + `mhitm_knockback` vs JS `rn2(5)` `distfleeck`
  (no melee path). Screen: `"The kobold hits!"` HP 11→10.
- **C locus:** `mhitu.c` `mattacku` AT_WEAP `!range2` / `hitmu` /
  `hitmsg` / `mdamageu`; `uhitm.c` `mhitm_ad_phys` (mhitu bare /
  weapon); `uhitm.c` `mhitm_knockback`.
- **Cause:** JS `mattacku` only called `thrwmu` when `range2`;
  adjacent kobold (dart spent, `MON_WEP` null) needs melee
  `rnd(20+i)` → `hitmu`.
- **Change:** `js/mhitu.js` melee HTH + AT_WEAP envelope, `hitmu`/
  `hitmsg`/`missmu`/`mdamageu`, bare/`dmgval` ad_phys; export
  `get_mattk` / `mhitm_knockback` from `js/mhitm.js`.
- **Verification:** seed0106 prefix **2962→2982** (`hitum` next
  key); positional **3188**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92375**/792838.
- **Named omission:** `hitval`/`mswings` (mixed-dir `rn2`);
  `mon_wield` HTH body; `wildmiss`/displace; `passiveum`;
  `summonmu`/were; hugs/gaze/expl/engl/brea/spit/magc; seduce
  hitmsg; undead midnight extra `d()`; `Half_physical_damage`/
  Mitre; `done_in_by`; full `mattk[]` beyond FIRST_ATTK table;
  knockback hurtle body.
- **Next:** seed0106 @ 2982 `hitum` / hero melee / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0107 — seed0106 `hitum` / hero melee

- **Status:** fixed
- **Observed:** seed0106 @ **2982**: C `rn2(20)` @ `gethungry` (via
  `overexertion`) then `exercise`/`hitum` `rnd(20)`/`dmgval`/
  `xkilled` vs JS `rn2(5)` `distfleeck` (hostile `do_attack`
  stubbed `return true` with no combat RNG).
- **C locus:** `hack.c` `overexertion` → `eat.c` `gethungry`;
  `uhitm.c` `do_attack` / `hitum` / `known_hitum` /
  `find_roll_to_hit` / `hmon`; `weapon.c` `dmgval`/`abon`;
  `mon.c` `killed`/`xkilled`/`corpse_chance`.
- **Cause:** JS `do_attack` only handled safemon; hostiles returned
  true without `overexertion`/`hitum`, so monsters still moved
  (`distfleeck`) while C resolved mace melee and killed the kobold.
- **Change:** `js/eat.js` export `gethungry`; `js/hack.js`
  `overexertion`; `js/uhitm.js` hostile `do_attack`→`hitum`/
  `hmon`/`xkilled`; `js/weapon.js` melee `OC_WSDAM` (MACE…);
  `js/cmd.js` `await do_attack`.
- **Verification:** seed0106 prefix **2982→2993** (post-kill
  `dog_goal`); positional **3201**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92300**/792838.
- **Named omission:** `attack_checks` invis/mimic/peaceful yn;
  Cleaver/twoweapon/`double_punch`; full `hitval`/
  `weapon_hit_bonus`/`P_SKILL`; `dbon`/skill dam recalc;
  live knockback; `passive` counters; `make_corpse`/`mkobj`
  treasure bodies; `missum` near-miss flavor; `check_caitiff`;
  encumber `overexert_hp`.
- **Next:** seed0106 @ 2993 post-kill `dog_goal` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0108 — seed0106 `mondead`→`relobj` minvent drop

- **Status:** fixed
- **Observed:** seed0106 @ **2993**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` `obj_resists`. Kill RNG matched (`rn2(6)=2` no treasure,
  `rn2(3)=2` no corpse). C then had a second APPORT candidate; JS did
  not.
- **Rejected:** missing `make_corpse`/treasure body (this kill's rolls
  were false); rewriting `dog_goal` APPORT gates.
- **C locus:** `mon.c` `mondead` → `m_detach(due_to_death)` →
  `steal.c` `relobj(mtmp, 1, FALSE)`; `dogmove.c` `dog_goal` scans
  `fobj`.
- **Cause:** JS `mondead` removed the monster from `fmon` without
  dropping `minvent`. Kobold leftover darts never reached `fobj`, so
  post-kill `dog_goal` skipped the second APPORT `rn2(8)`.
- **Change:** `js/mkobj.js` `relobj_on_death`; wired from
  `js/uhitm.js` and `js/mhitm.js` `mondead` (before xkilled treasure/
  corpse RNG). Vault-guard gold / `flooreffects` omitted.
- **Verification:** seed0106 prefix **2993→4097** (`dipfountain`);
  positional **4114**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93214**/792838.
- **Named omission:** vault-guard gold discard; `flooreffects` on
  death-drop; worn/saddle extrinsics update; `make_corpse` /
  xkilled treasure `mkobj` bodies still deferred.
- **Next:** seed0106 @ 4097 `dipfountain` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0109 — seed0106 `#sit` + `#dip` / `dipfountain`

- **Status:** fixed
- **Observed:** seed0106 @ **4097**: C `rnd(30)` @ `dipfountain` vs JS
  `rn2(5)` `distfleeck`. Keys `#dip`→`d`→`y` on fountain; prior turn
  was `#sit` with `"Having fun sitting on the fountain?"`.
- **Rejected:** `#dip`-only without `#sit` (moves peel earlier to
  4073: JS `rnd(30)` while C still runs sit's monster-turn RNG).
- **C locus:** `sit.c` `dosit` default/`surface`; `potion.c` `dodip`;
  `fountain.c` `dipfountain`/`dryup`; `trap.c` `water_damage`
  (POT_WATER + force → ER_NOTHING); `objnam.c` holy-water xname/BUC.
- **Cause:** unbound `#sit`/`#dip` let later keys become moves. Fountain
  dip of holy water needs `water_damage` ER_NOTHING then `rnd(30)` /
  `dryup`.
- **Change:** `js/sit.js` `dosit`; `js/fountain.js` `dipfountain`/
  `dryup`; `js/potion.js` `dodip`; `js/trap.js` `water_damage`;
  `js/getline.js` extcmds `sit`/`dip`; `js/objnam.js` holy/unholy
  water naming.
- **Verification:** seed0106 prefix **4097→4141** (nhlib shuffle @
  `#version`); positional **4145**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93267**/792838.
- **Named omission:** Excalibur LONG_SWORD body; wash_hands; dipfountain
  cases 17–29; potion_dip alchemy; sink/pool dips; town warn/
  angry_guards; grease/towel/container water_damage; `#offer`/
  `#enhance`/`#annotate`/`#overview`/`#version` bindings.
- **Next:** seed0106 @ 4141 `#offer`/`#enhance`/`#annotate` key
  ownership / seed2200 Scr 199 / seed0077 `player_selection`.

## D-0110 — seed0106 `#offer`/`#enhance`/`#annotate`/`#overview`/`#version`

- **Status:** fixed (RNG); screens residual
- **Observed:** seed0106 @ **4141**: C `rn2(3)` nhlib `shuffle(align)`
  via `#version`/`doextversion`/`get_lua_version` vs JS `rn2(5)`
  `distfleeck`. Keys after second dip: `#offer\n` `#enhance\n` ESC
  `#annotate\nTest level\n` `#overview\n` ESC `#version\n` (+ spaces).
- **Rejected:** treating only `#version` as missing without prior
  key-owning menus (unbound enhance ESC / annotate getlin / overview
  ESC become moves before version runs).
- **C locus:** `pray.c` `dosacrifice` (not-on-altar); `weapon.c`
  `enhance_weapon_skill` PICK_NONE; `dungeon.c` `donamelevel`/
  `query_annotation`/`dooverview`; `version.c` `doextversion`;
  `nhlua.c` `get_lua_version` → nhlib shuffle.
- **Cause:** unbound extcmds left ESC / `Test level` / overview ESC as
  free keys → movement RNG while C shows menus/getlin then `#version`
  shuffle (0 RNG until Enter on version).
- **Change:** `js/pray.js` `dosacrifice`; `js/weapon.js`
  `enhance_weapon_skill`; `js/dungeon.js` `donamelevel`/
  `query_annotation`/`dooverview` + lazy mapseen; `js/pager.js`
  export `doextversion`; `js/getline.js` EXT_CMDS bindings; `do_name`
  menu `a` → `donamelevel`.
- **Verification:** seed0106 RNG **4194**/4194 Scr **5**/267;
  strict lengths PASS; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **722** RNG **93316**/792838.
- **Named omission:** `floorfood` sacrifice body; enhance
  `add_skills_to_menu`/`can_advance`/`skill_advance`/wizard speedy;
  overview `traverse_mapseenchn`/`interest_mapseen`/feature lines;
  `#chronicle`/`#conduct`/`#vanquished`/`#genocided`/`#adjust`/
  `#terrain` (and other remaining extcmds).
- **Next:** seed0106 Scr residual / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0111 — seed0077 `player_selection` / `genl_player_setup`

- **Status:** fixed (chargen path); mid-mklev residual
- **Observed:** seed0077 after askname "Shade": C
  `Shall I pick…` → `n` → role/race/gender menus → confirm →
  first RNG `rn2(1)=0 @ pick_align` (Rogue→chaotic via
  `plsel_startmenu`→`rigid_role_checks`) then gem shuffle. JS skipped
  selection and started `o_init` at `rn2(2)` (prefix **100**, Scr **6**).
- **Rejected:** treating seed0077 as rc-specified Rogue (nethackrc has
  no role/race/gender/align); skip-path only for already-specified facets.
- **C locus:** `role.c` `genl_player_setup` / `rigid_role_checks` /
  `pick_align` / `ok_*` / `plsel_startmenu` / `setup_*menu` /
  `role_menu_extra`; `wintty.c` `tty_player_selection`; H2344
  fullscreen when `maxrow>=rows`.
- **Cause:** no `player_selection` after askname; roles/races lacked
  `allow`/`selfmask`; tall role menu `paint_corner_nhw_menu` returned
  null on fullscreen; corner menus called `flush_screen` and invented
  botl during `in_role_selection`.
- **Change:** `js/player_selection.js`; roles/races/genders/aligns
  allow masks; `jsmain` → `player_selection` before `newgame`;
  `setup_role_race_from_rc` prefers `flags.init*`; invent fullscreen
  NHW_MENU + no status flush under `in_role_selection`.
- **Verification:** seed0077 prefix **100→1475** (`rnd_rect`/
  themerms); Scr **6→11**/33 (chargen through confirm); green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **746** RNG **101108**/792838.
- **Named omission:** filter-reset UI body; rename-in-confirm
  (`plnamesuffix` re-ask); SELECTSAVED; full `maybe_skip_seps` for
  non-24 rows; `doset`/`O` player_selection option.
- **Next:** seed0077 @ 1465 themerms/`rnd_rect` / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0112 — seed0077 `do_vault` `create_vault` fallback

- **Status:** fixed (RNG); screen residual remains
- **Observed:** seed0077 @ **1465**: C `rn2(1)` @ `rnd_rect` vs JS
  `rn2(6)`. After niches, vault `check_room` fails (`rn2(3)=1`);
  C then `rnd_rect() && create_vault()` burns **102** `rnd_rect`
  calls (outer null-check + create_room trycnt≤100) with
  `rect_cnt=1` before giving up; JS stubbed
  `else if (rnd_rect()) { /* simplified */ }` and continued into
  fill/branch with a different `rn2(6)`.
- **Rejected:** themerms/`check_room`/`split_rects` leaving extra JS
  rectangles during makerooms — prefix through niches matched;
  peel was the post-niche vault fallback stub.
- **C locus:** `mklev.c` `makelevel` vault block (`do_vault` /
  `check_room` / `create_vault`); `sp_lev.c` `create_room` vault
  arm (trycnt loop + `rnd_rect`).
- **Change:** `js/mklev.js` ports real fallback —
  `rnd_rect() && create_vault()` then re-`check_room` → fill or
  `rooms[nroom].hx = -1`.
- **Verification:** seed0077 RNG **3242**/3242 Scr **19**/33 +
  strict lengths; green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **759** RNG
  **104563**/792838.
- **Named omission:** `makevtele` still `makeniche(TELEP_TRAP)`
  stand-in; full vault fill/`mk_knox_portal` edge cases.
- **Next:** seed0077 Scr **19**/33 / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0113 — seed0077 door vision + pick_lock + DEC open-door

- **Status:** fixed
- **Observed:** seed0077 Scr **19**/33 with RNG full. Screen 6:
  Shall-I-pick topline color 0 vs C NO_COLOR(8). Screens 17+:
  south room invisible after "The door opens."; open-door cell
  ASCII `|` vs C DEC `a`; apply lockpick → JS "This doorway has
  no door." vs C "You cannot lock an open door."
- **Rejected:** further mklev/vault terrain mismatch — RNG already
  full; room3 existed in `rooms[]` with seenv=0 because LOS still
  blocked.
- **C locus:** `vision.c` `recalc_block_point`/`unblock_point`;
  `lock.c` `doopen_indir` + `pick_lock` `switch (doormask)`;
  `dat/symbols` DECgraphics `S_hodoor`/`S_vodoor` = meta-a;
  tty topline NO_COLOR for yn prompt.
- **Change:** `vision.js` `recalc_block_point` → `vision_reset`;
  `lock.js`/`dokick.js` call it before `vision_recalc`; `pick_lock`
  NODOOR/ISOPEN/BROKEN cases; `display.js` open door DEC `a`+brown;
  `shall_i_pick_prompt` uses `NO_COLOR`.
- **Verification:** seed0077 **PASS** (3242/3242, 33/33) + strict;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS;
  full **10/44** Scr **788** RNG **104575**/792838.
- **Named omission:** `pick_lock` CLOSED/LOCKED occupation +
  autounlock/credit-card; incremental `dig_point` (full reset OK);
  ASCII `|`/`-` open-door orientation when not DECgraphics.
- **Next:** seed2200 Scr 199 (RC path @158) / seed0106 Scr 5.

## D-0114 — option_help msg_window PREV_MSGS extract

- **Status:** fixed
- **Observed:** seed2200 screen 162 compound list showed
  `` `msg_window' - (not applicable) `` while C has the real
  `PREV_MSGS` description for ^P behavior.
- **C locus:** `optlist.h` `#if PREV_MSGS /* tty or curses */`
  vs `#else` `(not applicable)`; `scripts/extract-optlist.py`
  `eval_expr` left C comments in the expression → Python `eval`
  failed → False → wrong branch.
- **Change:** strip `/* … */` / `//` from `#if` expressions before
  eval; regenerate `js/generated/optlist_data.js`.
- **Verification:** seed2200 Scr **199→200**/230; green+cohort PASS;
  full **10/44** Scr **851** RNG **104575**/792838.
- **Named omission:** recording `get_configfile` absolute path still
  harness-only (screen 158); `dokeylist` / menu-controls stubs.
- **Next:** seed0106 Scr / seed2200 `dokeylist` @184.

## D-0115 — Primary ASCII vs `symset:DECgraphics`

- **Status:** fixed
- **Observed:** seed0106 (no `symset` in rc) Scr **5**/267 with RNG
  full: JS painted DEC walls/floors (`┌`/`·`) while C used Primary
  ASCII (`-`/`|`/`.`). Green/PASS cohort all set `symset:DECgraphics`.
- **Rejected:** further seed0106 Scr as only enhance/overview stubs —
  first miss was map glyphs from forced DEC.
- **C locus:** `options.c` / `symbols.c` default Primary showsyms;
  `OPTIONS=symset:DECgraphics` loads H_DEC; `display.c`
  `back_to_glyph` DOOR uses `horizontal` → `S_hodoor`/`S_vodoor`
  (ASCII `|`/`-`; DEC both meta-a); `defsym.h` S_room `.` vs DEC `~`.
- **Change:** `jsmain.js` sets `iflags.decgraphics` from rc;
  `display.js` ASCII vs DEC wall/floor/ndoor/open-door tables;
  `options.js` parses boolean `DECgraphics`.
- **Verification:** seed0106 Scr **5→32**/267; seed0107 Scr **1→35**;
  green+cohort PASS + strict; full **10/44** Scr **788→851** RNG
  **104575**/792838.
- **Named omission:** full `load_symset`/IBM/UTF8; `iflags.use_color`
  gating of `obj_color`/`mon_color` when `OPTIONS=color` absent
  (seed0106 potion `!` yellow vs NO_COLOR); `dokeylist`.
- **Next:** seed0106 @13 angrygods quote/`--More--` split /
  extcmd progressive `# c` paint / seed2200 `dokeylist`.

## D-0116 — angrygods `verbalize` + `adjattrib` You_feel

- **Status:** fixed
- **Observed:** seed0106 Scr **32**/267 first miss @13: C
  `"Thou art arrogant, mortal."  "Thou must relearn thy lessons!"--More--`
  vs JS second clause unquoted and no `--More--`; next key became
  `Unknown command ' '.` instead of `You feel foolish!`.
- **C locus:** `pray.c` `angrygods` case 2/3; `pline.c` `verbalize`;
  `attrib.c` `adjattrib` (`msgflg<=0` → `You_feel("%s!", minusattr)`).
- **Cause:** JS used bare `pline` for the relearn line (no quotes) and
  silent `adjattrib`, so `You_feel("foolish!")` never ran and never
  forced `more()` on the combined quote topline.
- **Change:** `display.js` `verbalize`/`You_feel`; `attrib.js`
  `adjattrib` async messaging + ACURR gate; `pray.js` case 2/3 uses
  `verbalize` + `await adjattrib(..., false)`; `vary_init_attr`/
  `u_init_inventory_attrs` await the async path.
- **Verification:** seed0106 Scr **32→34**/267 (screens 13–15 match);
  next miss @16 progressive `# c` vs `# chat`; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44**
  Scr **851→853** RNG **104575**/792838.
- **Named omission:** Fixed_abil/Dunce/verbose adjattrib; Unaware
  You_feel dream prefix; angrygods 4+; progressive extcmd paint.
- **Next:** seed0106 extcmd `# c` progressive getline /
  seed2200 `dokeylist` @184.

## D-0117 — seed0106 progressive `# c` / `# ch` extcmd paint

- **Status:** fixed
- **Observed:** seed0106 Scr **34**/267 first miss @16: after `#` then
  `c`, C topline `# c` vs JS `# chat` (same cursor col 3); `@17` `# ch`
  vs `# chat`. Screens 18–19 (`a`/`t`) already matched after C also
  expands at `"cha"`.
- **C locus:** `win/tty/getline.c` `ext_cmd_getlin_hook` →
  `cmd.c` `extcmds_match(..., ECM_NOFLAGS)`; `extcmdlist[]` AUTOCOMPLETE
  names (chat/chronicle/conduct share `"c"`/`"ch"`).
- **Cause:** JS autocomplete uniqueness used only the runnable
  `EXT_CMDS` subset, so `"c"` uniquely matched `chat`. C matches against
  every AUTOCOMPLETE entry (wizard-gated), so expansion waits until
  `"cha"`.
- **Change:** `getline.js` `EXT_CMD_AC` = full C AUTOCOMPLETE name set
  for hook uniqueness; `EXT_CMDS` remains the runnable subset for Enter
  dispatch.
- **Verification:** seed0106 Scr **34→38**/267 (screens 16–17 and
  24–25 match); next miss @34 potion `!` color 11 vs NO_COLOR 8;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **853→857** RNG **104575**/792838.
- **Named omission:** full runnable `extcmdlist` bodies; `extcmds_match`
  ECM_IGNOREAC exact-enter for non-AC names; `iflags.use_color` mapglyph
  gating (next peel).
- **Next:** seed0106 `use_color` / potion glyph color @34 /
  seed2200 `dokeylist` @184.

## D-0118 — `obj_is_generic` + tty gray/black → NO_COLOR

- **Status:** fixed
- **Observed:** seed0106 Scr **38**/267 first miss @34: map potion `!`
  at (71,9) JS CLR_YELLOW(11) vs C NO_COLOR(8). RNG **full** match;
  fruit juice otyp 319 shuffled to golden/yellow; C raw `|...!|` had no
  `\033[93m` (unlike yellow `<` on scr 29–33).
- **Rejected:** missing `OPTIONS=color` / `iflags.use_color` off —
  same session paints yellow stairs and white `@`/pet; color default
  On; forcing all yellow `!`→NO_COLOR is a hack (seed0002 has real
  yellow `!` when `dknown`).
- **C locus:** `display.h` `obj_is_generic` / `obj_to_glyph` /
  `generic_obj_to_glyph` — `!dknown` potions (and gems/spellbooks) use
  `objects[oclass]` (GENERIC_POTION CLR_GRAY), not per-otyp `oc_color`.
  Contest `006-nomux-capture.patch`: CLR_GRAY and CLR_BLACK record as
  default fg → decoded NO_COLOR.
- **Change:** `js/display.js` `obj_is_generic` + generic class color in
  `obj_glyph`; `tty_map_color` in `show_glyph_cell` maps
  CLR_GRAY/CLR_BLACK → NO_COLOR.
- **Verification:** seed0106 Scr **38→46**/267; next miss combat
  dart topline; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; seed2200 Scr
  **200**/230 unchanged; full **10/44** Scr **857→916** RNG
  **104575**/792838 (seed0030 Scr **46→97**).
- **Named omission:** hallu `random_obj_to_glyph`; pile-top generic
  offsets; when floor see sets `dknown` (colored potions after known).
- **Next:** seed0106 mthrowu/hit dart pline @46 /
  seed2200 `dokeylist` @184.

## D-0119 — mthrowu `canseemon`/`thitu` + melee skip hit-on-kill

- **Status:** fixed
- **Observed:** seed0106 Scr **46**/267 first miss @40: C topline
  `You are hit by a dart.` vs JS
  `The kobold throws dart!  You are hit by dart!`. Map at that step
  has no visible `k` (kobold still off-screen). Later @43: C
  `You kill the kobold!` vs JS
  `You hit the kobold.  You kill the kobold!`.
- **Cause/evidence:** JS `monshoot` used `couldsee && !minvis` as
  `canseemon`, so dark-corridor LOS still printed the throw pline;
  C `_canseemon` needs `cansee`/`see_with_infrared` + `mon_visible`.
  `thitu` omitted `an()`/`exclam` and miss plines (`A dart misses you.`).
  Melee `hmon` always printed `You hit` before damage; C
  `hmon_hitmon_msg_hit` skips when `destroyed` (non-thrown).
- **C locus:** `display.h` `_canseemon`; `mthrowu.c` `monshoot`/`thitu`;
  `zap.c` `exclam`; `uhitm.c` `hmon_hitmon_msg_hit`.
- **Change:** `js/mthrowu.js` real `canseemon`, `thitu` an/exclam/miss,
  `monshoot` `an(singular)`; `js/uhitm.js` apply damage then skip hit
  pline when destroyed.
- **Verification:** seed0106 Scr **46→49**/267 (next: floor `)` vs `#`
  at death-drop cell); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **916→919** RNG **104575**/792838.
- **Named omission:** `mshot_xname` multishot "Nth"; `obj_is_pname`/
  `the()`; thrown multishot hit-when-destroyed; surviving-hit
  `canseemon ? exclam : "."`; death-drop map glyph/`newsym` after kill.
- **Next:** seed0106 death-drop floor glyph @44 /
  seed2200 `dokeylist` @184.

## D-0120 — `newsym` memory under visible monster (`_map_location`)

- **Status:** fixed
- **Observed:** seed0106 Scr **49**/267 first miss @44: C map `)` (thrown
  dart) vs JS corridor `#` at the same cell. Screens 42–43 already matched
  (`k@)` then `)@d`); the glyph vanished after the pet left the cell once
  it was out of `cansee` (dark corridor, two steps from hero).
- **Cause/evidence:** Object was on the floor (`drop_throw` + remaining
  minvent via `relobj_on_death`). When the pet stood on it while `cansee`,
  JS `newsym` painted the monster and set `remembered_glyph` to **terrain**.
  C `newsym` calls `_map_location(x,y,FALSE)` before `display_monster`, so
  hero_memory keeps the object glyph. After the cell left sight, JS replayed
  remembered `#` while C kept `$`/`)`.
- **C locus:** `display.c` `newsym` / `_map_location` (show=0 under mon).
- **Change:** `js/display.js` `map_location_memory` + call from the
  `cansee`+visible-monster arm of `newsym`.
- **Verification:** seed0106 Scr **49→250**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **919→1120** RNG **104575**/792838.
- **Named omission:** hero-underfoot `_map_location` (still terrain-only;
  mapping under `@` regresses seed0060 gold `$`); infrared sensed-monster
  path still skips `_map_location`; traps/engravings in
  `map_location_memory`.
- **Next:** seed0106 `#dip` yn @110 / garlic doname @116 /
  seed2200 `dokeylist` @184.

## D-0121 — yn leave prompt + cleric skip `"uncursed "`

- **Status:** fixed
- **Observed:** seed0106 Scr **250**/267 first miss @110: C topline still
  `Dip 4 potions of holy water into the fountain? [yn] (n)` with hero
  cursor after a silent fountain curse (`rnd(30)=16`, `rn2(3)=1` no dryup);
  JS blank topline. @116: C `Dip 2 cloves of garlic…` vs JS
  `Dip 2 uncursed cloves of garlic…`.
- **Cause/evidence:** JS `yn_function` cleared `_pending_message` on every
  answer; C `tty_yn_function` leaves the prompt (`TOPLINE_NON_EMPTY`) until
  the next pline / `rhack` clear-after-capture. Holy-water case 16
  `curse()` is silent and dryup skipped, so the yn text must survive until
  the next-command nhgetch. Garlic BUC: C `doname` omits `"uncursed "` when
  `Role_if(PM_CLERIC)` (priest always knows BUC); JS always printed it for
  bknown uncursed non-charged items.
- **C locus:** `win/tty/topl.c` `tty_yn_function` clean_up;
  `objnam.c` `doname` uncursed + `!Role_if(PM_CLERIC)`.
- **Change:** `js/getline.js` `yn_function` keep prompt after answer;
  `js/objnam.js` `doname` skip uncursed for `PM_CLERIC`.
- **Verification:** seed0106 Scr **250→253**/267 (next: enhance menu
  offx @133); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1120→1123** RNG **104575**/792838.
- **Named omission:** `doname` uncursed still omits SCR_MAIL /
  AMULET_OF_YENDOR / FAKE_AMULET exclusions; `dodip` uses `doname` not
  `short_oname` length fallback.
- **Next:** seed0106 enhance menu @133 / seed2200 `dokeylist` @184.

## D-0122 — `#enhance` skill_init + add_skills_to_menu (paged PICK_NONE)

- **Status:** fixed
- **Observed:** seed0106 Scr **253**/267 first miss @133: C fullscreen
  `Current skills:` + Fighting/Weapon/Spellcasting skill list +
  `(1 of 2)`; JS corner overlay stub `(no skills ready to advance)`.
- **Cause/evidence:** `u_init_skills_discoveries` never called
  `skill_init`, so `weapon_skills[]` stayed unset; `enhance_weapon_skill`
  painted a three-line stub via corner NHW_MENU. C builds the real menu
  via `add_skills_to_menu` after invent→Basic / role maxes; tty_end_menu
  prepends prompt+blank; lmax=23 yields two pages; seed presses `\n` on
  page 1 (dismiss without page 2). Not an H2344 offx bug.
- **C locus:** `weapon.c` `skill_init` / `add_skills_to_menu` /
  `enhance_weapon_skill`; `wintty.c` `tty_end_menu` /
  `process_menu_window` PICK_NONE paging; `u_init.c`
  `u_init_skills_discoveries`.
- **Change:** `js/weapon.js` `skill_init`/`P_NAME`/`add_skills_to_menu`/
  enhance rewrite; `js/u_init.js` Skill_T/Skill_R + call `skill_init`;
  `js/invent.js` `select_menu_pick_none` (lmax=23, `(N of M)`).
- **Verification:** seed0106 Scr **253→254**/267 (next: overview
  features @165); seed0107 Scr **35→36**; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1123→1125** RNG **104575**/792838.
- **Named omission:** wizard speedy y_n; `can_advance`/`could_advance`/
  `peaked_skill` annotations; `skill_advance`; `skill_based_spellbook_id`;
  `unrestrict_weapon_skill(spelspec)`; `#chronicle`.
- **Next:** seed0106 `#overview` features @165 / seed2200 `dokeylist`
  @184.

## D-0123 — `#overview` mapseen features (`lastseentyp` / `recalc_mapseen`)

- **Status:** fixed
- **Observed:** seed0106 Scr **254**/267 first miss @165: C corner
  overview shows `A fountain.` under Level 1; JS only dungeon header +
  Level line + `(end)`. Header/`(end)` offx also short by 3 cols.
- **Cause/evidence:** `dooverview` never called `recalc_mapseen` /
  `print_mapseen` OF_INTEREST; `update_lastseentyp` was deferred in
  `newsym`/`magic_map_background`. Level line used PREFIX (6 spaces)
  instead of C TAB (3), so with a feature line H2344 `maxcol`/`offx`
  diverged even after adding the sentence.
- **C locus:** `dungeon.c` `update_lastseentyp` / `count_feat_lastseentyp`
  / `recalc_mapseen` / `show_overview` / `print_mapseen` (`TAB` vs
  `PREFIX` / `ADDNTOBUF`); `display.c` `_map_location` /
  `magic_map_background` call `update_lastseentyp`.
- **Change:** `js/dungeon.js` lastseentyp + feat count + overview
  feature sentence; Level `   ` TAB; `js/display.js` /
  `js/mklev.js` update/clear lastseentyp on map/level.
- **Verification:** seed0106 Scr **254→255**/267 (next: `#chronicle`
  @188); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1125→1126** RNG
  **104575**/792838.
- **Named omission:** shop/temple room traversal; `shop_string` /
  altar-to-god; altar `msalign`; DRAWBRIDGE_UP / furniture-mimic
  lastseentyp; `traverse_mapseenchn` / `interest_mapseen` / auto
  annotations; Blind bigroom / bones / valley/sanctum flags;
  `#chronicle`.
- **Next:** seed0106 `#chronicle` @188 / seed2200 `dokeylist` @184.

## D-0124 — `#chronicle` / `do_gamelog` / `show_gamelog`

- **Status:** fixed
- **Observed:** seed0106 Scr **255**/267 first miss @188: C NHW_TEXT
  `Logged events:` / ` Turn` / five lines (enter dungeon, rejected
  atheism, lost all experience, first weapon hit, first kill); JS
  `#chronicle: unknown extended command.`
- **Cause/evidence:** `#chronicle` was AUTOCOMPLETE-only (D-0117) with
  no `EXT_CMDS` runner; `gg.gamelog` / `livelog_printf` never written.
  Expected text matches C `show_gamelog(ENL_GAMEINPROGRESS)`.
- **C locus:** `cmd.c` extcmd → `insight.c` `do_gamelog` /
  `show_gamelog`; `pline.c` `gamelog_add` / `livelog_printf`;
  `allmain.c` `welcome` enter-dungeon; `pray.c` gnostic conduct;
  `exper.c` `losexp` ulevel==1; `uhitm.c` `first_weapon_hit`;
  `mon.c` `xkilled` killer conduct.
- **Change:** `js/pline.js` gamelog append; `js/insight.js`
  `do_gamelog`/`show_gamelog`; `js/getline.js` chronicle runner;
  wire welcome/pray/losexp/weaphit/killer; export `show_text_pages`.
- **Verification:** seed0106 Scr **255→257**/267 (next: `#conduct`
  @199); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1126→1128** RNG
  **104575**/792838.
- **Named omission:** `livelog_add` file write; final/Major
  `show_gamelog`; other livelog sites (wish/genocide/achieve/…);
  artifact/cursed-bknown `first_weapon_hit`; `#conduct`/
  `#vanquished`/`#genocided`.
- **Next:** seed0106 `#conduct` @199 / seed2200 `dokeylist` @184.

## D-0125 — `#conduct` / `doconduct` / `show_conduct`

- **Status:** fixed
- **Observed:** seed0106 Scr **257**/267 first miss @199: C NHW_MENU
  corner `Voluntary challenges:` + foodless/illiterate/genocide/
  polypile/polyself/wishless lines; JS `#conduct: unknown extended
  command.`
- **Cause/evidence:** `#conduct` was AUTOCOMPLETE-only with no
  `EXT_CMDS` runner. Expected overlay matches C `show_conduct(
  ENL_GAMEINPROGRESS)` with present-tense `enl_msg` + contractions;
  petless omitted because `initedog` bumps `u.uconduct.pets`.
- **C locus:** `cmd.c` extcmd → `insight.c` `doconduct` /
  `show_conduct` / `enlght_line` / `num_genocides` /
  `sokoban_in_play`; `dog.c` `initedog` `u.uconduct.pets++`.
- **Change:** `js/insight.js` `doconduct`/`show_conduct`; export
  `show_nhw_menu_text`; `js/getline.js` conduct runner; `js/dog.js`
  `initedog` pets++.
- **Verification:** seed0106 Scr **257→259**/267 (next: `#vanquished`
  @213); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1128→1130** RNG
  **104575**/792838.
- **Named omission:** `show_achievements` body (final/wizard only);
  livelog first-pet; food/vegan bump sites beyond existing counters;
  final disclosure `show_conduct`.
- **Next:** seed0106 `#vanquished` @213 / seed2200 `dokeylist` @184.

## D-0126 — `#vanquished` / `list_vanquished` + `mvitals.died` + empty `#genocided`

- **Status:** fixed
- **Observed:** seed0106 Scr **259**/267 first miss @213: C NHW_MENU
  corner `Vanquished creatures:` + `  a kobold` / `  a lichen` /
  `2 creatures vanquished.`; JS `#vanquished: unknown extended
  command.` (and `mvitals[].died` never incremented). Screen @226:
  C `No creatures have been genocided.`; JS unknown extcmd.
- **Cause/evidence:** `#vanquished`/`#genocided` were AUTOCOMPLETE-only
  with no runners. Even with a runner, `mondead` omitted C's
  `svm.mvitals[mndx].died++`, so the census would always be empty.
  Expected overlay matches traditional `VANQ_MLVL_MNDX` sort (both
  mlevel 0 → mndx kobold before lichen) with `an()` + 3-digit pfx
  padding.
- **C locus:** `cmd.c` extcmd → `insight.c` `dovanquished` /
  `list_vanquished` / `vanqsort_cmp` / `dogenocided` /
  `list_genocided`; `mon.c` `mondead` `mvitals[].died++`.
- **Change:** `js/mon.js` `record_mvitals_died`; call from
  `uhitm.js`/`mhitm.js` `mondead`; `js/insight.js`
  `dovanquished`/`list_vanquished`/`vanqsort_cmp` + empty
  `dogenocided`/`list_genocided`; `js/getline.js` runners;
  export `makeplural`; `M2_PNAME`.
- **Verification:** seed0106 Scr **259→262**/267 (next: `#adjust`
  @235); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1130→1133** RNG
  **104575**/792838.
- **Named omission:** `set_vanq_order` / `m #vanquished` force_sort;
  disclose yn ask; class-header / numeric-mlet MCLS modes; dumplog
  `'d'`; Hallucination footer; `#genocided` ngone>0 NHW_MENU +
  extinctions; cham/were restore before `monsndx` in `mondead`.
- **Next:** seed0106 `#adjust` @235 / seed2200 `dokeylist` @184.

## D-0127 — `#adjust` / `doorganize` getobj + destination cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **262**/267 first miss @235: C
  `What do you want to adjust? [a-h or ?*]` then
  `Adjust letter to what [ai-zA-Z] (? see used letters)?` then
  Esc → `Never mind.`; JS `#adjust: unknown extended command.`
- **Cause/evidence:** `#adjust` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. C `doorganize` → `getobj("adjust")` →
  `doorganize_core` destination `yn_function` (NULL resp).
- **C locus:** `cmd.c` extcmd → `invent.c` `doorganize` /
  `doorganize_core` / `adjust_ok` / `compactify` / `prinv`.
- **Change:** `js/invent.js` `doorganize`/`doorganize_core`/
  `getobj_adjust` (suggest non-gold, destination letter list,
  Esc cancel, move/collect/swap/merge without count-split);
  `js/getline.js` `#adjust` runner.
- **Verification:** seed0106 Scr **262→264**/267 (next: `#terrain`
  @253); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1133→1135** RNG
  **104575**/792838.
- **Named omission:** getobj count-split / `splitobj`;
  `display_used_invlets` / `display_pickinv` for `?`/`*`;
  `check_invent_gold` / wonky-gold `adjust_gold_ok`;
  `adjust_split` / itemactionsions; pack-full bump on split;
  floating `!invlet_constant` `reassign` truncate.
- **Next:** seed0106 `#terrain` @253 / seed2200 `dokeylist` @184.

## D-0128 — `#terrain` / `doterrain` View which? menu + Esc cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **264**/267 first miss @253: C
  `View which?` / `a * known map without monsters, objects, and traps`
  / `b -` / `c -` / `(end)`; JS `#terrain: unknown extended command.`
- **Cause/evidence:** `#terrain` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. Session Esc-cancels before
  `reveal_terrain` (moves `#terrain\n\x1b`).
- **C locus:** `cmd.c` `doterrain`; `detect.c` `reveal_terrain` /
  `browse_map` / `map_redisplay`; contest `006-nomux` selected → `*`.
- **Change:** `js/detect.js` `doterrain` (recalc_mapseen + PICK_ONE
  a/b/c + explore/wizard 4–6; Esc/`letter`/space-return) + partial
  `reveal_terrain`/`browse_map`/`map_redisplay`; `js/getline.js`
  `#terrain` runner.
- **Verification:** seed0106 Scr **264→265**/267 (next: `+` spells
  @257 / attributes @261); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1135→1136** RNG **104575**/792838.
- **Named omission:** `reveal_terrain_getglyph` / `show_glyph` map
  rewrite; `unconstrain_map` underwater/buried/swallow;
  `wiz_map_levltyp` / `wiz_levltyp_legend`; terrainmode autodescribe
  glyph path in getpos; TER_FULL explore map body.
- **Next:** seed0106 `+`/`dovspell`/`initialspell` @257 /
  seed2200 `dokeylist` @184.

## D-0129 — `initialspell` + `dovspell` VIEW menu + `age_spells`

- **Status:** fixed
- **Observed:** seed0106 Scr **265**/267 @257: C `Currently known spells`
  with `a - detect monsters` / `b - remove curse` / Fail% / Retention /
  `+ - [sort spells]`; JS stub `You don't know any spells right now.`
- **Cause/evidence:** `ini_inv_use_obj` never called `initialspell` for
  SPBOOK; no `spl_book` / `age_spells`; `dovspell` empty stub. Priest
  kit learns two books at init; Fail% needs role `spel*` +
  `percent_success`; Retention needs `age_spells` each turn (KEEN−turns).
- **C locus:** `spell.c` `initialspell` / `dovspell` / `dospellmenu` /
  `percent_success` / `spellretention` / `age_spells`; `u_init.c`
  `ini_inv_use_obj`; `allmain.c` moveloop `age_spells`; `role.c` Role
  `spelbase`…`spelsbon`.
- **Change:** `js/spell.js` (spl_book, initialspell, percent_success,
  retention, VIEW menu); roles `spel*` → `game.urole`; wire
  `ini_inv_use_obj` + `age_spells` in moveloop; capture
  `serialize_for_scoring` preserves leading inverse spaces; fullscreen
  menu leading pad attr 0 (C tty).
- **Verification:** seed0106 Scr **265→266**/267 (next: `^X`
  attributes @261); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1136→1139** RNG **104575**/792838; seed2200 Scr **200→201**.
- **Named omission:** spell swap/sort bodies; `docast`/`spelleffects`;
  `skill_based_spellbook_id` / spelspec unrestrict; wizard turns column;
  `force_learn_spell` / read-book path.
- **Next:** seed0106 `^X`/`doattributes` @261 / seed2200 `dokeylist` @184.

## D-0130 — kill XP + doattributes article / energy phrasing

- **Status:** fixed
- **Observed:** seed0106 Scr **266**/267 @261: JS `a Aspirant` /
  `0 experience points` / `both energy points` vs C `an Aspirant` /
  `6 experience points` / `all 8 energy points (spell power)`.
- **Cause/evidence:** `xkilled` never called `experience`/`more_experienced`
  (`uexp` stayed 0 after kobold kill = 6 XP). Attributes page hardcoded
  `"a "` and `"both energy points"` instead of C `an(rank)` and
  `basics_enlightenment` pwmax rules (`all N` when pw==pwmax && pwmax>2).
- **C locus:** `exper.c` `experience` / `more_experienced` / `newuexp` /
  `newexplevel`; `mon.c` `xkilled` cleanup; `insight.c`
  `background_enlightenment` / `basics_enlightenment`; `objnam.c` `an`;
  `include/monsters.h` mattk for XP attack bonuses.
- **Change:** extract full `mattk[]` into `monsters_data.js`; port
  `experience`/`more_experienced`/`newuexp`/`newexplevel`; wire after
  corpse RNG in `xkilled`; doattributes uses `an(rank)` + real uexp +
  C energy/HP phrasing; init `urexp=0`.
- **Verification:** seed0106 **PASS** (RNG 4194/4194 Scr 267/267);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **11/44** Scr **1139→1141** RNG **104575**/792838;
  seed2200 Scr **201→202**/230.
- **Named omission:** xkilled murder/peaceful luck/`adjalign` after XP;
  eel `AD_WRAP` Amphibious +1000; MAIL_DAEMON XP=1; `exp_percent_changing`;
  SCORE_ON_BOTL; `get_mattk` still uses compact FIRST_ATTK (extracted
  mattk used by `experience`); wizard next-level XP line on ^X.
- **Next:** seed2200 `dokeylist` @184 / seed0501 `wipeout_text` /
  seed0015/0200 `lspo_map`.

## D-0131 — dokeylist / show_menu_controls / docontact + usagehlp trailing blank

- **Status:** fixed
- **Observed:** seed2200 Scr **202**/230; help `j` was `(key list stub)`
  vs C `Full Current Key Bindings List`; help `l`/`o` stubs. After
  dokeylist aligned, usagehlp ended one `--More--` early (missing empty
  trailing page) → Unknown command cascade.
- **Cause/evidence:** no `dokeylist`/`show_menu_controls` port; `display_file`
  stripped all trailing blank lines while C keeps the intentional EOF blank
  from usagehlp's final `\n\n`.
- **C locus:** `cmd.c` `dokeylist` / `keylist_putcmds` / `show_direction_keys`
  / `key2txt` / `commands_init`+`reset_commands` (N_DIRS=8); `options.c`
  `show_menu_controls`; `pager.c` `domenucontrols` / `docontact`;
  `files.c`/`windows.c` `display_file` line list.
- **Change:** `scripts/extract-extcmdlist.py` → `extcmdlist_data.js`;
  `js/dokeylist.js` (!num_pad default binds); wire help `j`/`l`/`o`;
  `display_file` pops only the split artifact `\n`, not intentional blanks.
- **Verification:** seed2200 Scr **202→227**/230 (RNG full); remaining
  @158 RC path (parked), @222 disco missing `*` spellbooks, @229
  Elbereth look; green+strict PASS; cohort 1500/1800/0060/0102/0700/
  1150/0017/0077/0106 PASS; full **11/44** Scr **1141→1166** RNG
  **104575**/792838.
- **Named omission:** custom BIND=/number_pad/swap_yz/rest_on_space;
  menu_shift; CMD_PARAM bound params; recording `get_configfile` path.
- **Next:** seed2200 disco @222 / Elbereth `:` @229 / seed0501
  `wipeout_text` / `lspo_map` / `getbones`.

## D-0132 — Wizard skill_based_spellbook_id (disco `*` books)

- **Status:** fixed
- **Observed:** seed2200 Scr @222 `\`; C listed ten `* spellbook of …`
  after force bolt / create monster; JS jumped from copper book to
  Potions (missing skill-ID discoveries).
- **Cause/evidence:** `skill_init` omitted C's trailing
  `unrestrict_weapon_skill(spell_skilltype(spelspec))` and
  `skill_based_spellbook_id()`. Wizard BASIC attack/enchantment IDs
  books through level 3 via `discover_object(..., TRUE, FALSE)` so
  disco shows `*` (known, not encountered).
- **C locus:** `spell.c` `skill_based_spellbook_id`; `weapon.c`
  `skill_init` (post-advance fill) / `skill_advance` spell-school gate.
- **Change:** ported `skill_based_spellbook_id` in `js/spell.js`; wire
  from `skill_init` with spelspec unrestrict; non-pauper only.
- **Verification:** seed2200 Scr **227→228**/230 (then +Elbereth →229);
  green+strict PASS; cohort PASS; full **11/44** Scr **1166→1169** RNG
  **104575**/792838.
- **Named omission:** `skill_advance` → `skill_based_spellbook_id` when
  `#enhance` advances a spell school; pauper L0 path untested in public
  sessions.
- **Next:** Elbereth `:` / parked RC @158 / `wipeout_text` / `lspo_map`.

## D-0133 — read_engr_at for `:` look (Elbereth)

- **Status:** fixed
- **Observed:** seed2200 Scr @229 `:`; C
  `Something is written here in the dust.  You read: "Elbereth".--More--`;
  JS `You see no objects here.` (cursor at hero).
- **Cause/evidence:** `make_engr_at` already stored the DUST Elbereth;
  `look_here` / `check_here` deferred `read_engr_at`, so the empty-floor
  path only printed the no-objects pline.
- **C locus:** `engrave.c` `read_engr_at`; `invent.c` `look_here` /
  `dolook`; `pickup.c` `check_here` (ct==0 branch).
- **Change:** ported `read_engr_at` (DUST/ENGRAVE/BURN/MARK/blood
  non-Blind envelope); call from `look_here` and `check_here`.
- **Verification:** seed2200 Scr **228→229**/230 (cursors **230**/230);
  sole remaining miss parked RC path @158; green+strict PASS; cohort
  PASS; full **11/44** Scr **1169** RNG **104575**/792838.
- **Named omission:** Blind feel for engrave/burn; full `surface()` /
  `is_ice` nouns; multi-object menu order of `read_engr_at` after
  display; engraving glyphs in `newsym`.
- **Next:** seed0501/0105 `wipeout_text` / seed0015/0200 `lspo_map` /
  seed0101 `next_ident` / `getbones` (blocked on `^V`/`makemaz`).

## D-0134 — makeniche trap engraving + wipe_engr_at / wipeout_text

- **Status:** fixed
- **Observed:** seed0501 @ **1153** / seed0105 @ **974**: C
  `rn2(11)` @ `wipeout_text(engrave.c:134)` (length of `"ad aerarium"`);
  JS `rn2(5)` from a later unrelated path — vault `makevtele` →
  `makeniche(TELEP_TRAP)` never aged the niche dust engraving.
- **Cause/evidence:** JS `makeniche` placed the trap but omitted C's
  `trap_engravings[]` → `make_engr_at(..., DUST)` + `wipe_engr_at(..., 5)`;
  `wipe_engr_at` / production `wipeout_text` were stubs or mklev-local only.
- **C locus:** `mklev.c` `makeniche` / `makevtele`; `engrave.c`
  `wipe_engr_at` / `wipeout_text` / `make_engr_at`.
- **Change:** ported `wipeout_text` + `wipe_engr_at` in `engrave.js`;
  wired `trap_engravings` + place/age in `makeniche`; graffiti path now
  calls `make_engr_at` with MARK.
- **Verification:** seed0501 prefix **1153→2205** (`spelleffects_check`);
  seed0105 RNG **2499**/2499 (Scr still **0**/30); green+strict PASS;
  cohort 1500/1800/0060/0106 PASS; full **11/44** Scr **1176** RNG
  **107102**/792838.
- **Named omission:** `Can_fall_thru` before hole→ROCKTRAP (JS always
  converts holes, so TRAPDOOR niche never gets `"Vlad was here"`);
  wipeout seeded path; `maybe_smudge_engr`; `get_rnd_text(ENGRAVEFILE)`
  for `random_engraving`.
- **Next:** seed0501 `spelleffects_check` @ 2205 / seed0105 screens /
  seed0015 `lspo_map` / seed0101 `next_ident`.

## D-0135 — Z / docast / spelleffects_check + SPE_HEALING self-zap

- **Status:** fixed
- **Observed:** seed0501 @ **2205**: C `rnd(100)` @
  `spelleffects_check(spell.c:1372)`; JS `rn2(12)` — `Z` was unbound
  (`Unknown command`) so cast never ran.
- **Cause/evidence:** session casts healing on self (`Z`→`a`→`.`); needs
  CAST menu `getspell`, energy/hunger/`percent_success` check, `mksobj`
  pseudo, spell `getdir` (`.` = self success), `zapyourself`→`healup(d(6,4))`.
- **C locus:** `spell.c` `docast`/`getspell`/`dospellmenu`/`spelleffects_check`/
  `spelleffects`; `zap.c` `zapyourself`; `potion.c` `healup`; `eat.c`
  `morehungry`; `cmd.c` `getdir` self key.
- **Change:** wired `Z`→`docast`; CAST `dospellmenu`; check + healing
  self-zap path; `morehungry`; local `use_skill` advance; healup in zap.
- **Verification:** seed0501 prefix **2205→2217** (`dog_move`); Scr
  **6→10**/28; green+strict PASS; cohort 1500/1800/0060/0106 PASS; full
  **11/44** Scr **1180** RNG **107116**/792838.
- **Named omission:** other `spelleffects` otyps; directional `weffects`;
  traditional getspell yn; CQ_REPEAT; spell_backfire; amulet drain;
  check_capacity; `zapyourself` beyond healing; VIEW swap/sort.
- **Next:** seed0501 `dog_move` @ 2217 / seed0105 Scr / `lspo_map` /
  `next_ident`.


## D-0136 — study_book known-refresh (false dog_move peel)

- **Status:** fixed
- **Observed:** seed0501 @ **2217**: C `rn2(1)` @ `dog_move`; JS `rn2(5)`.
  Screens showed JS hero/pet drifted NW after keys `rgy` while C stayed put.
- **Cause/evidence:** JS `doread` stubbed SPBOOK with "not implemented" and
  returned; C called `study_book` → `You know "healing" quite well already.`
  + `more()` (eats `y#turn\rn`) + `Refresh your memory anyway? [yn] (n)`.
  Leaked `y` became a diagonal move → `udist`/`appr` diverged before search.
  Rejected: dog_move `chcnt`/`mtrack`/`appr` as the 2217 cause.
- **C locus:** `spell.c` `study_book`; `read.c` `doread` SPBOOK branch
  (literate bump before study).
- **Change:** `js/spell.js` `study_book` (blank + known-refresh yn + delay/
  too_hard gate + begin-memorize); `js/read.js` wires SPBOOK → study_book
  with C literate order.
- **Verification:** seed0501 RNG **2238**/2238 Scr **27→28**/28 (with
  D-0137); green+strict PASS; cohort + seed0501 PASS; full **12/44**
  Scr **1198** RNG **107134**/792838.
- **Named omission:** occupation/`learn`; novel/tribute; dull sleep;
  `cursed_book`/`confused_book` bodies.
- **Next:** seed0105 Scr / `lspo_map` / `next_ident`.

## D-0137 — ^X attributes female role/rank titles

- **Status:** fixed
- **Observed:** seed0501 Scr @22 (^X): C `Priestess` / JS `Priest`.
- **Cause/evidence:** `doattributes` always used `urole.name.m` /
  `rank.m`. C `insight.c` uses `name.f` / `rank_of(..., innategend)` when
  female.
- **C locus:** `insight.c` title + `background_enlightenment` role_titl.
- **Change:** `js/invent.js` `doattributes` selects `.f` when
  `flags.female` and female name/rank present.
- **Verification:** with D-0136, seed0501 **PASS**; green+cohort held.
- **Next:** seed0105 Scr / `lspo_map` / `next_ident`.

## D-0138 — roles `name.f` null + welcome gender gate

- **Status:** fixed
- **Observed:** seed0105 Scr @1 welcome: C `neutral human Valkyrie` /
  JS `neutral female human Valkyrie`. Tourist green held only by the
  old same-string proxy accidentally matching C's gender adj.
- **Cause/evidence:** C `role.c` sets `name.f = 0` except Caveman/
  Priestess. C `welcome()` adds gender only when `!urole.name.f` **and**
  `(allow & ROLE_GENDMASK) == (ROLE_MALE|ROLE_FEMALE)`. Valkyrie is
  female-only → no adj. JS stored `f: 'Valkyrie'` and treated
  `f===m` as "add gender".
- **C locus:** `role.c` roles[] `name.f`; `allmain.c` `welcome`.
- **Change:** `js/roles.js` `name.f = null` where C has 0; `welcome`
  uses C null + allow-mask gate; copy `allow` onto `game.urole`;
  `doattributes` omits gender on `!!name.f` (not string inequality).
- **Verification:** green+strict PASS; cohort PASS; seed0501 PASS;
  seed0105 welcome text matches (still Scr **0**/30 on other peel);
  full **12/44** Scr **1198** RNG **107134**.
- **Next:** seed0105 bright-blue ASCII `` ` `` map cell / `lspo_map` /
  `next_ident`.

## D-0139 — newsym S_engroom / S_engrcorr engraving glyphs

- **Status:** fixed
- **Observed:** seed0105 Scr **0**/30 with full RNG; systematic miss was
  bright-blue ASCII `` ` `` at map (26,17) among DEC room floors.
- **Cause/evidence:** Vault niche `ad aerarium` engraving exists at
  (26,17) (`erevealed` never set). C `defsym` `S_engroom` is `` ` `` +
  `CLR_BRIGHT_BLUE` (DECgraphics does not remap). C `newsym` sets
  `erevealed` when `cansee`, then `_map_location` → `map_engraving`.
  JS deferred engravings and painted ROOM floor.
- **Rejected:** ROCK_CLASS/boulder/gem object — no floor object there;
  boulder is gray; gem class symbol is `*`.
- **C locus:** `display.c` `newsym`/`map_engraving`/`_map_location`;
  `engrave.h` `engraving_to_defsym`/`spot_shows_engravings`;
  `defsym.h` `S_engroom`/`S_engrcorr`.
- **Change:** `js/display.js` — `erevealed` on cansee; engraving branch
  in `newsym`/`map_location_memory` (ROOM `` ` `` / CORR `#`, bright blue).
- **Verification:** seed0105 Scr **0→22**/30 (RNG still full); remaining
  8 are `#chat` wall pline / apply·eat prompts; green+strict PASS;
  cohort PASS; full **12/44** Scr **1198→1231** RNG **107134**.
- **Next:** seed0105 `#chat` `"It's like talking to a wall."` / eat·apply
  getobj, or `lspo_map` / `next_ident`.

## D-0140 — dochat wall / SDOOR / statue talk

- **Status:** fixed
- **Observed:** seed0105 Scr @10 blank vs C `"It's like talking to a
  wall."` after `#chat` + direction into wall.
- **Cause/evidence:** JS `dochat` returned `ECMD_OK` silently when
  `!mtmp`; C ports statue then `!Deaf && (IS_WALL||SDOOR)` pline
  (Blind `lastseentyp` gate; Hallu `rn2(10)` walltalk).
- **C locus:** `sounds.c` `dochat`.
- **Change:** `js/sounds.js` — statue notice; wall/SDOOR envelope with
  Blind/`lastseentyp` + non-hallu pline + hallu walltalk.
- **Verification:** seed0105 Scr **22→23**/30 (wall matched); green
  held; next peel was empty apply getobj.
- **Named omission:** shop `price_quote`; usteed; is_silent/Strangled/
  uswallow/Underwater; Hallu statue `rndmonnam`; other MS_*.
- **Next:** apply empty getobj (D-0141).

## D-0141 — getobj apply empty SUGGEST early return

- **Status:** fixed
- **Observed:** seed0105 after wall: C `"You don't have anything to use
  or apply."` vs JS `"What do you want to use or apply? [*]"`.
- **Cause/evidence:** C `getobj` when `suggested==0 && !forceprompt &&
  !allownone` early-returns; JS prompted `[*]` with empty TOOL_CLASS
  lets (no lamp this seed) and ate following `e` as invent letter.
- **C locus:** `invent.c` `getobj`; `apply.c` `apply_ok`/`doapply`.
- **Change:** `js/apply.js` — empty `apply_lets` → pline + null (no
  prompt).
- **Verification:** seed0105 apply screen matched; eat prompt then
  desynced on missing-letter (D-0142).
- **Named omission:** full `apply_ok` DOWNPLAY (coins/unknown potions)
  that would set `forceprompt` and allow `[*]`.
- **Next:** eat getobj missing-letter loop (D-0142).

## D-0142 — getobj eat missing-letter continue + --More--

- **Status:** fixed
- **Observed:** seed0105 after apply: C `"You don't have that
  object.--More--"` (getobj loop) vs JS single-shot return then key leak
  (`Unknown command 'd'`).
- **Cause/evidence:** C `getobj` `continue`s after missing letter;
  `You()` sets NEED_MORE; next `yn_function` calls `more()`. JS
  returned null on first bad letter.
- **C locus:** `invent.c` `getobj`; `topl.c` `tty_yn_function`/`more`.
- **Change:** `js/eat.js` — `yn_function` free-letter loop; missing
  letter pline + continue; empty edibles early-return.
- **Verification:** seed0105 **PASS** (RNG 2499/2499 Scr 30/30);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077/
  0106/0501/0105 PASS; full **13/44** Scr **1231→1239** RNG
  **107134→106907**.
- **Named omission:** ordinary food nutrition/occupation; eat `?`/`*`
  menu; full `is_edible`.
- **Next:** `lspo_map` / `next_ident` / `maybe_smudge_engr`.

## D-0143 — lspo_map themerms map rooms + filler_region

- **Status:** fixed
- **Observed:** seed0015 first mismatch @337 `rn2(71) @ lspo_map`;
  seed0200 @377 same. JS burned `rn2(100)` then `create_room`.
- **Cause/evidence:** Reservoir can pick L/S/T/Z/Cross/… shapes whose
  Lua `contents` call `des.map` → C `lspo_map` (`1+rn2(COLNO-1-wid)`,
  `rn2(ROWNO-hei)`, overwrite redo). JS treated every non-`ordinary`
  pick as `build_room` chance + rectangular `create_room`.
- **C locus:** `sp_lev.c` `lspo_map` / `mapfrag_*` / `lspo_region`;
  `mkmap.c` `flood_fill_rm`; `themerms.lua` map rooms + `filler_region`
  + `themeroom_fill` reservoir.
- **Change:** `js/mklev.js` — `splev_chr2typ`/`mapfrag`/`lspo_map_themeroom`
  placement+load; `filler_region` percent + irregular flood/add_room;
  `themeroom_fill` reservoir (lit/mindiff gates); wire 17 simple
  filler-map rooms; `makerooms` honors `themeroom_failed`.
- **Verification:** seed0015 prefix **337→357** (`selection_rndcoord` /
  Ghost fill); seed0200 **377→1447** (`dig_corridor`); green+strict
  PASS; PASS cohort held; full **13/44** Scr **1239→1240** RNG
  **106907→111362**.
- **Named omission:** fill *bodies* (Ghost `selection.room`/monster,
  Temple altars, …); Blocked center/Pillars/Water vault/complex maps;
  nested `des.room` themerms still `create_room`; irregular
  `dig_corridor` join.
- **Next:** Ghost `themeroom_fill` / `selection_rndcoord`, or
  `dig_corridor` after L-room, or `next_ident` / `maybe_smudge_engr`.

## D-0144 — Ghost of an Adventurer themeroom_fill

- **Status:** fixed
- **Observed:** seed0015 first mismatch @357 `rn2(36) @
  selection_rndcoord`; JS emitted `rn2(1)` (fill name only, no body).
- **Cause/evidence:** Reservoir picked Ghost; C runs
  `selection.room():rndcoord(0)` then `des.monster` ghost
  (asleep/waiting) + percent loot. JS stored `_themeroom_fill` and
  returned without contents.
- **C locus:** `themerms.lua` Ghost contents; `selvar.c`
  `selection_from_mkroom`/`selection_rndcoord`; `sp_lev.c`
  `create_monster`/`create_object`/`find_montype`/`induced_align`;
  `makemon.c` `rndghostname` for `PM_GHOST`.
- **Change:** `js/mklev.js` — selection helpers + Ghost fill body
  (monster + not-blessed id/class objects); `js/makemon.js` —
  `rndghostname`/`christen_monst` for ghosts + `mstrategy`/`MM_ASLEEP`.
- **Verification:** seed0015 prefix **357→1284** (`dig_corridor`);
  positional **392→1472**/8563; seed0200 still **1447** (`dig_corridor`);
  green+strict PASS; PASS cohort held; full **13/44** Scr **1239**
  RNG **112442**/792838.
- **Named omission:** other themerms fill bodies; full
  `create_monster` humidity/appear/inventory; `m_initinv` body.
- **Next:** `dig_corridor` (seed0015/0200), or `next_ident` /
  `maybe_smudge_engr`.

## D-0145 — finddpos_shift irregular inward walk

- **Status:** fixed
- **Observed:** seed0015 @1284 C `rn2(2) @ dig_corridor` vs JS
  `rn2(9)` (extra `finddpos` retry); seed0200 @1447 C `rn2(35) @
  dig_corridor` (nxcor) vs JS `rn2(6)` (skipped dig → next finddpos).
- **Cause/evidence:** After `filler_region` sets `irregular=true`,
  walls sit inside the bounding box. C `finddpos_shift` walks inward
  through STONE/CORR until `good_rm_wall_doorpos`; JS only tested the
  rect-edge cell and failed, so `join` never reached matching dig.
  `dig_corridor` body itself already matched C.
- **C locus:** `mklev.c` `finddpos_shift` / `finddpos` / `join`;
  caller `makecorridors`; dig in `sp_lev.c` `dig_corridor`.
- **Change:** `js/mklev.js` `finddpos_shift` — port irregular walk
  (DIR_180 + step via `xdir`/`ydir` + bounds fail).
- **Verification:** seed0015 prefix **1284→2513** (`mksobj_init`);
  positional **1472→2597**/8563; seed0200 **1447→1672**
  (`fill_ordinary_room`/`somex`); green+strict PASS; PASS cohort
  11/11; full **13/44** Scr **1239** RNG **115097**/792838.
- **Named omission:** `join` still always `CORR` (C arboreal→ROOM);
  other themerms fill bodies; `fill_ordinary_room` somexy envelope.
- **Next:** seed0015 `mksobj_init` @2513 / seed0200
  `fill_ordinary_room` @1672 / seed0101 `next_ident` /
  `maybe_smudge_engr` / `getbones`.

## D-0146 — mksobj_init OIL_LAMP / TOOL lamp charges

- **Status:** fixed
- **Observed:** seed0015 @2513 C `rn2(500) @ mksobj_init` (OIL_LAMP
  age via `rn1(500,1000)`) vs JS `rn2(1)` (skipped lamp body after
  Valkyrie `!rn2(6)` Lamp `ini_inv`).
- **Cause/evidence:** JS `mksobj_init` TOOL_CLASS handled chests/
  candles/markers but omitted BRASS_LANTERN/OIL_LAMP/MAGIC_LAMP and
  other charged tools. C sets `spe=1`, `age=rn1(500,1000)`,
  `lamplit=0`, `blessorcurse(5)`.
- **C locus:** `mkobj.c` `mksobj_init` TOOL_CLASS; caller
  `u_init.c` `ini_inv(Lamp)` from Valkyrie/Healer/Barbarian/…
- **Change:** `js/mkobj.js` — port lamp + grease/crystal/horn/bag/
  bell/magic-instrument TOOL cases; candle spe/lamplit (age deferred).
- **Verification:** seed0015 prefix **2513→2918** (`getbones`);
  positional **2597→2925**/8563 Scr **1→20**/44; green+strict PASS;
  PASS cohort 11/11; full **13/44** Scr **1259** RNG **115572**/792838.
- **Named omission:** FIGURINE (`rndmonnum_adj`+`is_human`); candle
  `age=20*oc_cost` (`oc_cost` not in objects extract); full
  `getbones` load path.
- **Next:** seed0200 irregular `somexy` @1672 / seed0015 `getbones`
  @2918 / `next_ident` / `maybe_smudge_engr`.

## D-0147 — occupied t_at + irregular somexy

- **Status:** fixed
- **Observed:** seed0200 @1672 C second `somex`/`somey` vs JS
  `mkgold` `rnd(2)` after gold `!rn2(3)` + first `somexyspace`.
- **Rejected hypothesis:** “JS ignores irregular and accepts first
  bbox cell.” DIAG on the gold room showed `irreg=false`/`nsub=0`;
  C’s extra `somex` was `somexyspace` retry after `occupied`.
- **Cause/evidence:** C `occupied` includes `t_at(x,y)` (and
  furniture/lava/pool/`invocation_pos`). JS only checked furniture/
  lava/pool, so gold landed on a trap cell that C rejected. Also
  ported missing irregular `somexy`/`inside_room` (still required for
  flood-fill themerms; not the peel writer here).
- **C locus:** `mklev.c` `occupied`; `mkroom.c` `somexy`/`inside_room`;
  caller `mklev.c` `fill_ordinary_room` → `somexyspace` → `mkgold`.
- **Change:** `js/mklev.js` — `occupied` calls `t_at`; irregular
  `somexy` `!edge`/`roomno` + exhaustive fallback; `inside_room` for
  subroom rejection. `invocation_pos` still always-false (named).
- **Verification:** seed0200 prefix **1672→1768**
  (`random_engraving`); positional **1687→3231**/3822 Scr **0→9**/40;
  green+strict PASS; PASS cohort 11/11; full **13/44** Scr **1268**
  RNG **118314**/792838.
- **Named omission:** `invocation_pos`/`inv_pos`; drawbridge lava in
  `is_lava`; `get_rnd_text(ENGRAVEFILE)` in `random_engraving`.
- **Next:** seed0200 `random_engraving`/`get_rnd_text` @1768 /
  seed0015 `getbones` @2918 / `next_ident` / `maybe_smudge_engr`.

## D-0148 — random_engraving get_rnd_text(ENGRAVEFILE)

- **Status:** fixed
- **Observed:** seed0200 @1768 C `rn2(2894)` @ `random_engraving`
  vs JS `rn2(2)` (stub re-called `getrumor` after `!rn2(4)`).
- **Cause/evidence:** C `engrave.c` `random_engraving`: when
  `!rn2(4)` short-circuits past `getrumor`, falls through to
  `get_rnd_text(ENGRAVEFILE,…,rn2,MD_PAD_RUMORS)` → `get_rnd_line`
  seeks in the pad+xcrypt engrave chunk (2894 bytes after don't-edit
  header). JS stub burned another rumor draw instead.
- **C locus:** `engrave.c` `random_engraving`; `rumors.c`
  `get_rnd_text`/`get_rnd_line`; `makedefs.c` `do_rnd_access_file`.
- **Change:** `scripts/extract-engrave.py` →
  `js/generated/engrave_data.js` (`ENGRAVE_BUF`, MAIL=1 grep);
  `js/rumors.js` export `get_rnd_text`; `js/engrave.js`
  `random_engraving`; remove mklev stub.
- **Verification:** seed0200 prefix **1768→3382** (`hitum`/
  `exercise`); positional **3231→3385**/3822 Scr **9→14**/40;
  green+strict PASS; PASS cohort 11/11; full **13/44** Scr **1275**
  RNG **121154**/792838.
- **Named omission:** epitaph `get_rnd_text(EPITAPHFILE)`;
  `maybe_smudge_engr`; bogusmon file.
- **Next:** seed0015 `getbones` @2918 / seed0101 `next_ident` @2293 /
  seed0030 `maybe_smudge_engr` @6732 / seed0200 combat @3382.

## D-0149 — ordinary `>` dodown / goto_level / getbones

- **Status:** fixed
- **Observed:** seed0015 @2918 C `rn2(3)` @ `getbones` vs JS `rn2(5)`
  (dog_move / unbound `>`). NOTES hypothesized getbones arity; false.
- **Rejected:** getbones early-return / wrong `flags.bones` — stub
  already emits `rn2(3)` when reached (same as D-0068 lesson for `^V`).
- **C locus:** `do.c` `dodown`/`goto_level`/`u_collide_m`;
  `dungeon.c` `next_level`; `bones.c` `getbones`; `dog.c`
  `keepdogs`/`losedogs`/`mon_arrive`; `mklev.c` special-room
  `rn2(u_depth)` → `do_mkroom(SHOPBASE)`; `mkroom.c` `mkshop`.
- **Cause:** `>` unbound in `rhack`; descent never called `mklev`.
  After wiring stairs, dlvl2 also needed the post-niche special-room
  chance roll (Dlvl1 short-circuits `u_depth > 1`).
- **Change:** `js/do.js` `dodown`/`next_level`/`goto_level`;
  `js/cmd.js` `'>'`; `js/dog.js` `keepdogs`/`losedogs`/`levl_follower`;
  `js/teleport.js` `rloc_to`; `js/mon.js` `mnexto`; `js/mklev.js`
  special-room chain + `mkshop` eligibility stub + `clear_level_structures`
  clears `fobj`/`ftrap`.
- **Verification:** seed0015 prefix **2918→8499** (`trapeffect_pit`);
  positional **8500**/8563 Scr **20**/44; green+strict PASS; cohort
  1500/1800/0060 PASS; full **13/44** Scr **1275** RNG
  **126755**/792838.
- **Named omission:** `savelev`/`getlev` restore; mysterious force;
  quest gate; portals/fall damage; Lua `NHCB_LVL_LEAVE`;
  `mkshop` `invalid_shop_shape`/shtypes/`rnd(100)` when eligible;
  COURT/ZOO/… `do_mkroom` bodies; `dotrap`/`trapeffect_pit`.
- **Lesson:** when Notes say getbones but JS never reaches `mklev`,
  check command bindings (`>` / `^V`) before patching the stub.
- **Next:** seed0015 `trapeffect_pit` @8499 / `next_ident` /
  `maybe_smudge_engr`.

## D-0150 — monster trapeffect_pit / make_corpse

- **Status:** fixed
- **Observed:** seed0015 @8499 C `rnd(6)` @ `trapeffect_pit(trap.c:2003)`
  vs JS `rn2(5)` (dog_move). NOTES said hero pit; provenance is
  **monster** branch `thitm(..., rnd(6))`.
- **Rejected:** hero `dotrap`/`set_utrap` first — C line 2003 is the
  pet fall-damage path after `mintrap`.
- **C locus:** `trap.c` `trapeffect_pit` (monster) / `thitm` /
  `trapeffect_selector`; `mon.c` `monkilled`/`mondied`/`make_corpse`
  default_1; `mkobj.c` `mkcorpstat`.
- **Cause:** `trapeffect_selector` only handled DART; PIT no-op so pet
  kept walking. Death also needed real `monkilled`→`make_corpse`
  (next_ident + rndmonst_adj + start_corpse_timeout), not mark-dead.
- **Change:** `js/trap.js` monster `trapeffect_pit` + `thitm` death →
  `monkilled`/`mondied`/`make_corpse`; `js/monsters.js`
  `grounded`/`is_flyer`/`is_floater`/`is_clinger`.
- **Verification:** seed0015 prefix **8499→8518**; positional
  **8524**/8563 Scr **21**/44; green+strict PASS; cohort 11 PASS;
  full **13/44** Scr **1276** RNG **126779**/792838.
- **Named omission:** hero `dotrap`/`trapeffect_pit`; SPIKED poison;
  `mselftouch` petrify; `wearing_iron_shoes`; `save_mtraits`;
  golem/dragon/… `make_corpse` specials; `xkilled`/`mhitm` still burn
  `corpse_chance` without `make_corpse`.
- **Lesson:** rng-diff provenance line numbers beat session-name
  guesses (“hero pit”); monster pit death pulls `make_corpse` RNG.
- **Next:** seed0015 @8518 newt `m_move` track vs second `distfleeck` /
  `next_ident` / `maybe_smudge_engr`.

## D-0151 — hostile postmov / mon_learns_traps / mfndpos known-trap skip

- **Status:** fixed
- **Observed:** seed0015 @8518 C `rn2(5)` second `distfleeck` vs JS
  `rn2(12)` newt `m_move` track. Pet already dead; only newt acts.
- **Rejected:** inventing `appr`/mtrack arity hacks; “second fleeck =
  two monsters”; mtrapped early-return (newt `mtrapped=0`, no
  `rn2(40)`).
- **C locus:** `monmove.c` `m_move`/`postmov`; `trap.c` `mintrap`
  `mon_learns_traps`; `mon.c` `mfndpos` known-trap `continue`;
  `mondata.c` `mon_knows_traps`/`mon_learns_traps`.
- **Cause:** JS hostile `m_move` stepped without `postmov`→`mintrap`,
  so never set `mtrapseen` for SQKY_BOARD under the newt. C learned the
  board then `mfndpos` skipped that cell — no track match, 0-RNG move,
  post `distfleeck`. JS kept `(5,9)` in candidates matching
  `mtrack[0]` → `rn2(12)`.
- **Change:** hostile `m_move`→`postmov`; `mon_knows_traps`/
  `mon_learns_traps` + `mtrapseen` init; `mintrap` learns before
  effect; `mfndpos` skips known harmful traps when `!(ALLOW_TRAPS)`;
  SQKY_BOARD effect stub (wake deferred).
- **Verification:** seed0015 RNG **8563**/8563 Scr **21**/44;
  green+strict PASS; cohort 11 PASS; full **13/44** Scr **1276** RNG
  **126818**/792838.
- **Named omission:** `wake_nearto`/`You_hear` for SQKY; `mons_see_trap`;
  HOLE `!mindless` already_seen; full `m_harmless_trap` immunities;
  `gettrack`/shortsighted/`m_search_items` in hostile `m_move`;
  mtrapped escape `rn2(40)`; hero `dotrap`.
- **Lesson:** when C has 0-RNG `m_move` between fleecks, check
  `mfndpos` candidate set (known traps) before rewriting track math.

## D-0152 — Q / doquiver_core ready uswapwep (seed0101 next_ident)

- **Status:** fixed
- **Observed:** seed0101 @2293 C `rnd(2)` @ `next_ident` then
  `obj_resists`/`mcalcmove`; JS `rn2(12)` (skipped throw).
- **Rejected:** missing `splitobj`/`next_ident` in throw alone — throw
  never ran; keys `Qbytdl` desynced while `Q` was unbound.
- **C locus:** `wield.c` `dowieldquiver`/`doquiver_core`;
  `dothrow.c` `throw_ok`/`throwit` hand-throw pline;
  session keys `Q`→ready bow from uswapwep→`t` throw arrows by hand.
- **Cause:** JS lacked `Q`/`doquiver_core`. C readies bow from alternate
  weapon (`ynq`), then throw splits arrows (`next_ident`) + `breaktest`
  (`obj_resists`). Unbound `Q` ate following letters as other commands.
- **Change:** `setuqwep` + `doquiver_core("ready")` (uswapwep/uwep ynq,
  `-` clear, worn reject); bind `Q`; `throw_ok` DOWNPLAY lone uwep;
  hand-throw pline + half range; `dofire` empty → `doquiver_core("fire")`.
- **Verification:** seed0101 prefix **2293→2302** (`_` travel); Scr
  **4→10**/27; green+strict PASS; cohort PASS; full **13/44** Scr
  **1282** RNG **126936**/792838.
- **Named omission:** count-split `finish_splitting`/`unsplitobj`;
  `Shk_Your` decline plines; AutoReturn/`find_launcher`/polearm.
- **Lesson:** seed0101 “next_ident” was command desync from missing
  `Q`, not a mkobj bug — read session keys/screens before inventing
  object-creation stubs.
- **Next:** seed0101 `_` travel @2302 / seed0015 Scr @21 /
  seed0016 eat `next_ident` @2493.

## D-0153 — `_` / dotravel cancel + getpos tip PICK_NONE (seed0101)

- **Status:** fixed
- **Observed:** seed0101 @2302 C `distfleeck` vs JS missing after throw;
  Scr 10/27 (Unknown command `_`).
- **Rejected:** search/`set_apparxy` as the first peel — keys `_` ESC
  `E` `-` ESC were travel getpos tip, not engrave; unbound `_` desynced
  the rest so searches never matched C RNG.
- **C locus:** `cmd.c` `dotravel`/`dotravel_target`; `getpos.c` `getpos`
  force unknown-direction; `hack.c` `handle_tip(TIP_GETPOS)` →
  nhcore `show_getpos_tip` PICK_NONE; `hack.c` `findtravelpath` adjacent
  + travel continue.
- **Cause:** JS lacked `_`/`dotravel`. Tip menu consumed one key then
  closed (C stays open for non-dismiss keys). Session cancels travel
  after tip; later `s`/`s`/`:` need keys in sync.
- **Change:** `dotravel`/`dotravel_target` + greedy/adjacent
  `findtravelpath_travel`; bind `_` + `#travel`; tip PICK_NONE loop;
  getpos force unknown-direction pline; `end_running` clears travel;
  `continue_run` recomputes travel steps.
- **Verification:** seed0101 prefix **2302→2309** (`set_apparxy`);
  Scr **10→21**/27; green+strict PASS; cohort PASS; full **13/44**
  Scr **1293** RNG **126947**/792838.
- **Named omission:** full `TEST_TRAV`/`TRAVP_GUESS`/`travelmap`/
  boulder-door delay; `getpos_menu`; `#retravel`; crawl_destination /
  NODIAG travel gates.
- **Lesson:** after a timed command, read the next keys/screens before
  peeling monster RNG — unbound `_` looked like a missing `distfleeck`.
- **Next:** seed0101 `set_apparxy` @2309 / seed0015 Scr @21 /
  seed0016 eat `next_ident` @2493.

## D-0154 — set_apparxy Displacement rn2(4) (seed0101)

- **Status:** fixed
- **Observed:** seed0101 @2309 C `rn2(4)` @ `set_apparxy` vs JS `rn2(5)`
  (`distfleeck`).
- **Rejected:** NODIAG / 4-dir vs 8-dir `xdir` as the arity cause —
  provenance is Displacement cloak, not movement dirs.
- **C locus:** `monmove.c` `set_apparxy`; `youprop.h` `Displaced`;
  Ranger kit `CLOAK_OF_DISPLACEMENT`.
- **Cause:** JS stub always set `mux/muy = hero` with no RNG. Hostile
  monsters facing a Displaced hero burn `!rn2(4)` (gotu) then optional
  displace-loop `rn2(2*displ+1)`. Skipping that made the next call a
  `distfleeck` `rn2(5)`.
- **Change:** Ported `set_apparxy` early-exits, Invis/Displaced/Underwater
  `displ`, gotu RNG, and displace position loop (`accessible`/
  `closed_door`/`couldsee`/`passes_walls`). EDisplaced via worn cloak
  otyp until `oc_oprop`/`setworn` props exist; `can_fog` stubbed false;
  DRAWBRIDGE_UP `SURFACE_AT` deferred.
- **Verification:** seed0101 RNG **2371**/2371 Scr **21**/27;
  green+strict PASS; cohort 11 PASS; full **13/44** Scr **1293** RNG
  **127004**/792838.
- **Named omission:** `oc_oprop` Extrinsic props; timed `HDisplaced`;
  `can_fog` vampshifter; `stuff_prevents_passage`; DRAWBRIDGE under-typ.
- **Lesson:** arity `rn2(4)` next to `distfleeck` `rn2(5)` is often
  Displacement/Invis `set_apparxy`, not a 4-dir mfndpos bug.
- **Next:** seed0016 eat `next_ident` @2493 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0155 — STETHOSCOPE self + eat touchfood split (seed0016)

- **Status:** fixed
- **Observed:** seed0016 @2493 C `rnd(2)` @ `next_ident` (eat split) vs
  JS `rn2(12)` (`mcalcmove`).
- **Rejected:** missing eat/`splitobj` alone as the first peel — DIAG
  showed JS did eventually split the apple, but only *after* a premature
  monster turn. Keys `a`/`c`/`.` were stethoscope; JS rejected the tool so
  `.` became `donull` and burned `mcalcmove` before `e`/`j`.
- **C locus:** `apply.c` `use_stethoscope` / `doapply`; `insight.c`
  `ustatusline`/`piousness`; `cmd.c` getdir `.`=self; `eat.c`
  `touchfood`/`doeat`/`fprefx`/`start_eating`/`lesshungry`;
  `mkobj.c` `splitobj`/`next_ident`.
- **Cause:** (1) Unbound STETHOSCOPE → key desync before eat.
  First stethoscope use is free when `hero_seq != stethoscope_seq`.
  (2) After timing matched, invent apple stack still needed
  `touchfood`→`splitobj(1)`→`next_ident` and reqtime-1 finish
  (Macintosh APPLE joke on contest MACOS build).
- **Change:** `use_stethoscope` + getdir self-ok + `ustatusline`/
  `piousness`; `doeat` food-class reqtime-1 path with `touchfood`/
  `fprefx`/`lesshungry`/`useup`. Multi-turn occupation / adjacent
  stethoscope / oc_nutrition extractor deferred.
- **Verification:** seed0016 prefix **2493→2551** (`zapyourself`);
  Scr **6→15**/36; green+strict PASS; cohort 1500/1800/0060/0105 PASS;
  full **13/44** Scr **1302** RNG **127080**/792838.
- **Named omission:** adjacent/`dz`/cursed stethoscope arms; multi-turn
  eat occupation; rotten `rn2(7)`; floorfood floor; `freeinv`+
  `addinv_nomerge`; `oc_nutrition` in objects extract; UNIX Core dumped.
- **Lesson:** when rng-diff shows eat `next_ident` vs `mcalcmove`, check
  whether an earlier apply/getdir ate the self-key as `donull` first.
- **Next:** seed0016 `zapyourself` @2551 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0156 — WAN_SLEEP zapyourself + Unaware gethungry (seed0016)

- **Status:** fixed
- **Observed:** seed0016 @2551 C `rnd(50)` @ `zapyourself` vs JS
  `rn2(5)` (`distfleeck`) — directional zap stubbed as nothing_happens.
- **Rejected:** missing RAY `weffects`/`buzz` first — C path is getdir
  `.` → self → `zapyourself` sleep, not a directed ray.
- **C locus:** `zap.c` `dozap`/`zapyourself` WAN_SLEEP; `timeout.c`
  `fall_asleep`; `eat.c` `gethungry` Unaware `rn2(10)`; `trap.c`
  `unconscious`; `youprop.h` Unaware.
- **Cause:** (1) `dozap` never called getdir/zapyourself for RAY wands.
  (2) After sleep matched, asleep turns need Unaware metabolic
  `rn2(10)` before accessorytime `rn2(20)`.
- **Change:** getdir `.`=self; `zapyourself` WAN_SLEEP/SPE_SLEEP +
  Sleep_resistance branch; `fall_asleep`/`usleep`/`nomovemsg`;
  `gethungry` Unaware gate. IMMEDIATE/RAY `weffects`, other
  zapyourself otyps, shieldeff/monstunseesu deferred.
- **Verification:** seed0016 RNG **3656**/3656 Scr **15→31**/36;
  green+strict PASS; cohort 1500/1800/0060/0105/0501 PASS; full
  **13/44** Scr **1318** RNG **128139**/792838.
- **Named omission:** RAY/`bhit`/`ubuzz`; other zapyourself cases;
  backfire; uhunger-- body; fainted Unaware arm; The(xname) article
  edge cases.
- **Lesson:** sleep/multi turns change gethungry RNG arity via Unaware
  before any hunger side-effect ports.
- **Next:** seed0016 Scr residual @31 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0157 — apply_ok SUGGEST wand/spbook (seed0016 Scr @3)

- **Status:** fixed
- **Observed:** seed0016 Scr @3 JS
  `What do you want to use or apply? [c or ?*]` vs C `[cfghi or ?*]`
  (cursor col 44 vs 48).
- **Rejected:** empty-SUGGEST / stethoscope-only getobj — invent has
  wand+three spellbooks; C suggests them for apply (break/flip).
- **C locus:** `apply.c` `apply_ok` / `doapply` getobj.
- **Cause:** JS `apply_ok` returned true only for `TOOL_CLASS`, so Healer
  prompt omitted `f` WAN_SLEEP and `ghi` SPE_*.
- **Change:** port `apply_ok` ranks (SUGGEST tools/wands/spbooks +
  pick/axe/pole/whip/oil/food/graystone; DOWNPLAY coins/unknown potions;
  EXCLUDE_SELECTABLE default). getobj letters = SUGGEST only; EXCLUDE →
  silly_thing. `do_break_wand` / `flip_through_book` / other otyps still
  deferred (default "Sorry…").
- **Verification:** seed0016 Scr **31→32**/36 (RNG full); green+strict
  PASS; cohort 11 PASS; full **13/44** Scr **1318** RNG **128139**.
- **Named omission:** break wand / flip book / flip coin / sack /
  cream pie / whip / use_stone / use_pole / Snickersnee.
- **Lesson:** apply prompt letters follow `apply_ok` SUGGEST classes,
  not the subset of otyps with ported `doapply` bodies.
- **Next:** seed0016 invent @24 (H2344 offx + `pair of` gloves) /
  seed0015 Scr / `maybe_smudge_engr`.

## D-0158 — armor pair of / set of + ^X new moon (seed0016 PASS)

- **Status:** fixed
- **Observed:** seed0016 invent @24 Coins at col ~32 vs C col 24;
  gloves line missing `pair of`; disco `leather gloves` vs
  `pair of leather gloves`; ^X missing `There is a new moon in effect.`
  so INT stayed on page 1.
- **Rejected:** bare H2344 invent offx pad; hardcoded INT→page2 without
  moon line (would break non-moon ^X).
- **C locus:** `objnam.c` `obj_typename`/`xname` ARMOR/LENSES;
  `insight.c` background_enlightenment moon/friday13 + tty 23-row page.
- **Cause:** JS omitted `pair of `/`set of ` prefixes (`oc_armcat`
  gloves/boots; dragon scales window; LENSES). Shorter invent maxcol
  shifted H2344 offx. ^X skipped `flags.moonphase` NEW/FULL line and
  used a fixed page split with INT always on page 1.
- **Change:** `pretty_base`/`obj_typename` pair-of/set-of; makeplural
  keeps singular `pair of`; `doattributes` continuous stream with
  moon/friday13 before experience and 23-content-row paging.
- **Verification:** seed0016 **PASS** (RNG 3656/3656 Scr 36/36);
  green+strict PASS; cohort 12 PASS; full **14/44** Scr **1323**
  RNG **128139**.
- **Named omission:** night()/midnight enlightenment lines; full
  `enlght_*` disclosure final tense; other armor naming edges.
- **Lesson:** invent offx follows maxcol from real doname strings;
  ^X page breaks follow content length, not hardcoded attribute index.
- **Next:** seed0015 Scr @21 / seed0030 `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0159 — postmov monster door open/unlock/smash (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @13 blank topline vs C
  `You hear a door open.`; RNG already full.
- **Rejected:** dosounds feature hear; missing `>` stairs alone (later
  screen 19).
- **C locus:** `monmove.c` `postmov` door block after `mintrap`;
  `m_move` `can_open`/`can_unlock`/`can_tunnel`; `monhaskey`;
  `mb_trapped`.
- **Cause:** JS `postmov` deferred door handling after stepping onto
  CLOSED/LOCKED; mfndpos already allowed OPENDOOR so monsters reached
  the cell without opening it or printing hear/see messages.
- **Change:** Port door open/unlock/smash + UnblockDoor vision refresh
  + monhaskey + mb_trapped envelope; wire can_open/can_unlock into
  postmov from m_move (pets and hostiles).
- **Verification:** seed0015 Scr **21→22**/44 (RNG full); green+strict
  PASS; cohort 12 PASS; full **14/44** Scr **1324** RNG **128111**.
- **Named omission:** vampshift fog sequencing; iron bars; mdig_tunnel;
  engulfing_u; shop add_damage; has_magic_key disarm; is_rider unlock;
  tunnels(); full mondied/wake_nearto/mon_learns_traps from mb_trapped;
  YMonnam/fog-cloud wording on amorphous squeeze.
- **Lesson:** OPENDOOR in mfndpos is not enough — postmov must change
  doormask and emit verbose hear/see after the step.
- **Next:** seed0015 descend `--More--` @19 / `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0160 — goto_level descend `--More--` on stale map (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @19 JS already Dlvl:2
  `You descend the stairs.` (no More; space → Unknown command) vs C
  `You descend the stairs.--More--` still on Dlvl:1 map/status.
- **Rejected:** missing descend pline text (message existed); botl
  Dlvl update bug alone.
- **C locus:** `display.c` `flush_screen(-1)` delay toggle;
  `docrt`→`cls`→`display_nhwindow(WIN_MESSAGE)` forces `more()` before
  clearing the map; `do.c` `goto_level` brackets arrival plines with
  postpone / un-postpone.
- **Cause:** JS `pline` set NEED_MORE but `docrt` never flushed messages
  before redrawing the new level, so `--More--` never owned the space
  key and the capture already showed Dlvl:2.
- **Change:** Port `flush_screen(-1)` postpone (topline-only paints
  while delayed); `cls` flushes NEED_MORE via `more()` then clears;
  `docrt` calls `cls` first; `goto_level` brackets plines+docrt with
  `-1` toggles. Reset topline/delay module state in `runSegment` start
  so NEED_MORE cannot leak across harness sessions.
- **Verification:** seed0015 Scr **22→23**/44 (screen 19 cells match;
  cursors full); green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1326** RNG **128111**.
- **Named omission:** full `delay_flushing` interaction with every
  `newsym` path; `disp.botlx` force; upstairs/fly/fall descend
  messages; savelev/getlev restore still regenerates.
- **Lesson:** level-change `--More--` must run while map flushes are
  postponed so the stale Dlvl:N screen stays visible; do not rebuild
  from the new `game.level` during that more().
- **Next:** seed0015 Dlvl:2 gold `$` vs wall @ screen 20 /
  `maybe_smudge_engr` / seed0101 Scr residual.

## D-0161 — clear `_objects_at` / `head_engr` on level rebuild (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @20 JS yellow `$` on top wall vs C DEC
  horizontal wall; RNG already full. Cell was HWALL with
  `remembered_glyph`/`disp_ch` `$` from `objects_at(63,6)`.
- **Rejected:** mineralize placing gold on HWALL; display preferring
  objects over walls (`covers_objects` matches C pool/lava only).
- **C locus:** `mklev.c` `clear_level_structures` zeroes
  `svl.level.objects[x][y]` and objlist; `savelev` release clears
  `head_engr`.
- **Cause:** dlvl1 `fill_ordinary_room`→`mkgold` placed GOLD_PIECE on
  ROOM (63,6). `goto_level`/`clear_level_structures` nullled `fobj` but
  left `game._objects_at` (and `head_engr`) intact, so dlvl2 HWALL at
  the same coordinates still returned the ghost floor object to
  `newsym`.
- **Change:** Clear `_objects_at` and `head_engr` in
  `clear_level_structures` and when `goto_level` detaches the live map.
- **Verification:** seed0015 Scr **23→24**/44 (screen 20 match);
  green+strict PASS; cohort 12 PASS; full **14/44** Scr **1327** RNG
  **128105**.
- **Named omission:** full savelev/getlev object/engraving restore;
  upstairs `<` color still diverges @ screen 21 (JS yellow vs C
  NO_COLOR).
- **Lesson:** spatial indexes must be wiped with the level lists —
  nulling `fobj` alone leaves ghost `objects_at` hits across depths.
- **Next:** seed0015 upstairs `<` color @21 / `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0162 — ordinary vs known-branch stair colors (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @21 upstairs `<` JS yellow (11) vs C
  NO_COLOR (8); RNG already full. Dlvl1 cohort sessions kept yellow
  upstairs / gray downstairs (D-0038 fixture note).
- **Rejected:** hardcoding upstairs=yellow / downstairs=NO_COLOR from
  public recordings (D-0038 partial — matched Dlvl1 only).
- **C locus:** `display.c` `back_to_glyph` STAIRS;
  `stairs.c` `known_branch_stairs`; `defsym.h` S_upstair/S_dnstair
  CLR_GRAY, S_br*stair CLR_YELLOW.
- **Cause:** JS `terrain_glyph` forced all upstairs yellow. C uses
  `known_branch_stairs(stairway_at)` (different dnum + `u_traversed`)
  for yellow branch glyphs; ordinary same-dungeon stairs stay gray
  (tty → NO_COLOR). Dlvl1 upstairs is a traversed branch → yellow;
  Dlvl2 upstairs to Dlvl1 is ordinary → NO_COLOR.
- **Change:** `terrain_glyph` STAIRS uses `stairway_at` +
  `known_branch_stairs` + `loc.ladder & LA_DOWN`; branch→CLR_YELLOW,
  else CLR_GRAY.
- **Verification:** seed0015 Scr **24→42**/44; green+strict PASS;
  cohort 12 PASS; full **14/44** Scr **1345** RNG **128105**.
- **Named omission:** ladder glyphs; remaining seed0015 Scr @22 distant
  SQKY "F note" / Scr @38 ^X genderPart.
- **Lesson:** Dlvl1 fixture colors are not universal stair rules —
  port `known_branch_stairs`, do not bake upstairs=yellow.
- **Next:** seed0015 distant SQKY hear / ^X attributes gender /
  `maybe_smudge_engr` / seed0101 Scr residual.

## D-0163 — monster `trapeffect_sqky_board` + `just_an` letter-space (seed0015)

- **Status:** fixed
- **Observed:** seed0015 Scr @22 blank vs C
  `You hear an F note squeak in the distance.`; RNG already full.
- **Rejected:** dosounds feature rolls; inventing a fake hear without
  `mintrap`/`trapeffect_sqky_board`.
- **C locus:** `trap.c` `trapeffect_sqky_board` / `trapnote`;
  `pline.c` `You_hear`; `mon.c` `wake_nearto`; `objnam.c` `just_an`
  (letter+space → `aefhilmnosx`).
- **Cause:** JS SQKY case was a no-op stub. Out-of-sight monsters need
  `You_hear` with `trapnote` + nearby/distance from `couldsee`/`mdistu`.
  trap.js `canseemon` was always-true (local `cansee` stub), which would
  take the in-sight pline path. After You_hear landed, article was
  `a F note` because JS `just_an` only checked vowels — C treats
  `"F note"` (`str[1]==' '`) as single-letter musical note → `an`.
- **Change:** port monster `trapeffect_sqky_board` + `trapnote` +
  `You_hear` + `wake_nearto`; real `canseemon` via vision/`mon_visible`;
  `just_an` letter-space / the-/lava/bars/ice.
- **Verification:** seed0015 Scr **42→43**/44 (then D-0164 → PASS);
  green+strict PASS; cohort 12 PASS.
- **Named omission:** hero `dotrap` SQKY; Deaf+mindless silent;
  `Soundeffect`; `disturb_buried_zombies`; full `just_an` one-/eu-/uke-
  exceptions.
- **Lesson:** trap effect stubs that skip messages still need real
  `canseemon`; musical-note articles are not vowel rules.
- **Next:** ^X genderPart / dungeon depth (D-0164).

## D-0164 — ^X gender gate + dungeon `depth(u.uz)` (seed0015)

- **Status:** fixed
- **Observed:** seed0015 Scr @38 `female human Valkyrie` vs C
  `human Valkyrie`; after gender fix, `on level 1` vs C `level 2`.
- **Rejected:** treating `!name.f` alone as always-add-gender (welcome
  already had the both-genders gate — D-0138).
- **C locus:** `insight.c` `background_enlightenment` gender tmpbuf +
  dungeon line (`dungeons[].dname` + `depth`/`dunlev`).
- **Cause:** `doattributes` used `hasFemaleName ? '' : gender+' '` and
  hardcoded `on level 1`. Valkyrie is female-only (`allow` not both
  genders) so C omits gender; after descend `depth(u.uz)` is 2.
- **Change:** same gender gate as welcome; dungeon line from
  `dungeons[dnum].dname` + `depth(u.uz)`.
- **Verification:** seed0015 **PASS** (RNG 8563/8563 Scr 44/44);
  green+strict PASS; cohort 12 PASS; full **15/44** Scr **1347** RNG
  **128105**.
- **Named omission:** endgame/knox/quest/rogue/bigroom dungeon phrasing;
  `In_quest` uses `dunlev` not `depth`.
- **Lesson:** welcome and ^X share the gender gate; do not hardcode
  Dlvl:1 into attributes after `goto_level` exists.
- **Next:** seed0030 `maybe_smudge_engr` / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0165 — `maybe_smudge_engr` after successful walk (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @6732 — C `rnd(5)` @
  `maybe_smudge_engr` then `wipe_engr_at` `rn2(26)`; JS `rn2(5)` elsewhere.
- **Rejected:** treating arity as a stray movement `rn2(5)`; inventing
  smudge without walk success / `spoteffects` ordering.
- **C locus:** `hack.c` `domove` → `maybe_smudge_engr`; `engrave.c`
  `can_reach_floor` / `wipe_engr_at`.
- **Cause:** JS `domove` never called `maybe_smudge_engr` after a
  successful walk. C erodes non-HEADSTONE engravings at old and/or new
  cell with `wipe_engr_at(..., rnd(5), FALSE)` when
  `can_reach_floor(TRUE)`, **after** `spoteffects`.
- **Change:** port `can_reach_floor` subset + `maybe_smudge_engr`; wire
  into `cmd.js` `domove` after `spoteffects`.
- **Verification:** seed0030 prefix **6732→6889** positional
  **7215**/105529 Scr **111**/1953; green+strict PASS; cohort 13 PASS;
  full **15/44** Scr **1348** RNG **128294**.
- **Named omission:** can_reach_floor ustuck-hugs / ceiling_hider /
  MZ_HUGE / uteetering_at_seen_pit / uescaped_shaft; `u_wipe_engr` body;
  `maybe_adjust_hero_bubble`.
- **Lesson:** walk-adjacent engraving erosion is part of `domove`, not
  engrave command; call after pickup/`spoteffects`.
- **Next:** seed0030 `next_ident` @10584 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0166 — Teleportation hub themeroom_fill + make_a_trap (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @6889 — C `rn2(3)` @
  `themerms.lua:268` Teleportation hub `contents`; JS `rn2(1)` (next
  room / skipped fill body).
- **Rejected:** treating arity as Storeroom/`rn2(1)` leftover; inventing
  hub traps without postprocess teledest / `mktrap` victim gate.
- **C locus:** `themerms.lua` Teleportation hub + `make_a_trap` +
  `post_level_generate`; `mklev.c` `themerooms_post_level_generate` /
  `mktrap` victim `rnd(4)`; `selvar.c` `selection_rndcoord` /
  `selection_filter_mapchar`.
- **Cause:** JS `themeroom_fill` reservoir could pick Teleportation hub
  but only Ghost had a body. Missing `2+rn2(3)` + room-floor rndcoord
  queue, `post_level_generate` teledest picks, and `mktrap`’s
  short-circuit `rnd(4)` before `(kind < HOLE)` rejects TELEP.
- **Change:** port hub fill + `selection_filter_mapchar` / all-floor
  selection; themerms postprocess queue → `make_a_trap` (seen TELEP +
  teledest); wire before wallification; `maketrap` gains `teledest`.
- **Verification:** seed0030 prefix **6889→10584** positional
  **10867**/105529 Scr **111**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1348** RNG **131946**.
- **Named omission:** other fill bodies (Ice/Temple/Storeroom/…);
  garden/dig postprocess handlers; hero TELEP activation.
- **Lesson:** Lua postprocess can burn RNG long after fill; `mktrap`
  victim `rnd(4)` still runs for TELEP even when the body is skipped.
- **Next:** seed0030 `next_ident` @10584 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0167 — mhitm mondied make_corpse / next_ident (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10584 — C `rnd(2)` @
  `next_ident(mkobj.c)` after `corpse_chance`; JS `rnd(1)`.
- **Rejected:** broken `next_ident` itself; inventing `rnd(1)` callers;
  treating arity as missing `nextoid` shop search.
- **C locus:** `mon.c` `mondied`/`make_corpse`/`corpse_chance`;
  `mkobj.c` `mkcorpstat`/`mksobj`/`next_ident`; `mhitm.c` death path
  after `mhitm_knockback`.
- **Cause:** JS mhitm `mondied` burned `corpse_chance` only (named
  omission). When the roll succeeded, C created the corpse
  (`mkcorpstat`→`next_ident` `rnd(2)`); JS fell through to `grow_up`
  `rnd(victim.m_lev+1)` = `rnd(1)` for a level-0 victim. Trap-path
  `mondied` already called `make_corpse` (D-0150).
- **Change:** port ordinary `make_corpse` default_1 into mhitm
  `mondied` (same envelope as trap.js: `CORPSTAT_INIT` + gender +
  `mkcorpstat`/`stackobj`/`newsym`).
- **Verification:** seed0030 prefix **10584→10608** positional
  **10939**/105529 Scr **110**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106 PASS; full **15/44** Scr **1347** RNG
  **131959**.
- **Named omission:** dragon/unicorn/worm/undead `make_corpse`
  specials; `accessible`/`is_pool` gate; `save_mtraits`; hero
  `xkilled` still burns `corpse_chance`/`!rn2(6)` without corpse body.
- **Lesson:** deferred corpse after a matching `corpse_chance` success
  does not look like a wrong `next_ident` — it looks like the next
  caller's arity (`grow_up`).
- **Next:** seed0030 `obj_resists` @10608 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0168 — dog_eat after edible newdogpos (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10608 — C three
  `obj_resists` `rn2(100)` after dog_move selection; JS one then
  `rn2(5)` (distfleeck).
- **Rejected:** missing floor pile / nexthere; poisonous newt corpse;
  missing `mpickstuff` dogfood; dog_goal invent scan after selection.
- **C locus:** `dogmove.c` edible candidate → `goto newdogpos` →
  `dog_eat` → `dogfood` (reward check) → `m_consume_obj` →
  `delobj`/`obj_resists(0,0)`.
- **Cause:** JS early-returned from the candidate loop on edible food
  (move only), skipping `dog_eat`. C always re-rolls `dogfood` then
  `delobj` — two extra `rn2(100)`.
- **Change:** set `do_eat` + break (C `goto`); after place call
  `dog_eat` (nutrition/pline subset + `dogfood` + `delobj`).
- **Verification:** seed0030 prefix **10608→10620** positional
  **11005**/105529 Scr **120**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106/0105/0016 PASS; full **15/44** Scr
  **1357** RNG **132086**.
- **Named omission:** full `dog_nutrition` cwt/cnutrit tables;
  bee jelly / rust spit / unpaid shop; `dog_invent` eat return path;
  `postmov` `mpickstuff` body.
- **Lesson:** edible `newdogpos` is not “move and return” — C’s
  `dog_eat` still burns `obj_resists` twice after the find.
- **Next:** seed0030 @10620 (distfleeck vs `rn2(4)`) / seed0101 Scr /
  seed0200 @3382.

## D-0169 — m_move meating before dog_move (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10620 — C second
  `distfleeck` `rn2(5)`; JS `rn2(4)` (looked like `dog_goal` follow /
  wanderer `dochug`).
- **Rejected:** wanderer `dochug` `rn2(4)` short-circuit; hero
  `IS_ROOM` vs corridor; pet position/`udist` divergence; missing
  `dog_goal` DOGFOOD branch.
- **C locus:** `monmove.c` `m_move` — after `mtrapped`, if
  `mtmp->meating` then `--meating` / `finish_meating` and
  `return MMOVE_DONE` **before** `dog_move`; `dochug` still recalcs
  `distfleeck`.
- **Cause:** prior turn’s `dog_eat` set `meating` via `dog_nutrition`.
  C spent the next pet turn digesting (two `distfleeck` only). JS
  skipped the gate and entered `dog_goal` follow `!rn2(4)`.
- **Change:** `m_move` runs `mtrapped` then meating countdown for all
  monsters; pets only reach `dog_move` when not eating. Export
  `finish_meating` stub from `dogmove.js`.
- **Verification:** seed0030 prefix **10620→10803** positional
  **11133**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **132144**.
- **Named omission:** `finish_meating` mimic `M_AP` reset /
  `quickmimic`; `hides_under` `rn2(10)` before approach; full
  `dog_nutrition` cwt tables (meating length may still drift).
- **Lesson:** post-eat `distfleeck` vs `rn2(4)` is often meating, not
  dog_goal — check `m_move` gates before follow-player RNG.
- **Next:** seed0030 @10803 (`hmon_hitmon_stagger`) / seed0101 Scr /
  seed0200 @3382.

## D-0170 — unarmed hmon_hitmon_stagger rnd(100) (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10803 — C `rnd(100)` @
  `hmon_hitmon_stagger`; JS `rn2(6)` (`xkilled` treasure).
- **Rejected:** barehands damage formula alone; xkilled order; miss vs
  hit gate (prefix matched through `rnd(2)=2` barehands).
- **C locus:** `uhitm.c` `hmon_hitmon` — after dmg recalc, if
  `unarmed && dmg > 1 && !thrown && !obj && !Upolyd` call
  `hmon_hitmon_stagger` **before** `mhp -= dmg` / `killed`. Stagger
  always evaluates `rnd(100) < P_SKILL(P_BARE_HANDED_COMBAT)` then
  `!bigmonst`/`!thick_skinned`.
- **Cause:** JS `hmon` applied barehands damage and went straight to
  `xkilled`, skipping the unarmed stagger RNG (even when skill gate
  fails, C still burns `rnd(100)`).
- **Change:** `hmon_hitmon_stagger` + call gate in `uhitm.js`;
  `bigmonst`/`thick_skinned`/`M1_THICK_HIDE`/`MZ_LARGE` in
  `monsters.js`; export `P_SKILL` from `weapon.js`.
- **Verification:** seed0030 prefix **10803→10861** positional
  **11206**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106/0105/0016 PASS; full **15/44** Scr
  **1405** RNG **132236**.
- **Named omission:** stun pline + `mhurtle_to_doom` when skill gate
  succeeds and pending dmg < mhp; martial `rnd(4)` barehands;
  `dbon`/weapon-skill dmg_recalc; live weapon knockback.
- **Lesson:** unarmed `dmg > 1` always burns stagger `rnd(100)` before
  kill RNG — do not jump from barehands `rnd(2)` to `xkilled`.
- **Next:** seed0030 @10861 (`nhlib.lua` shuffle after `getbones`) /
  seed0101 Scr / seed0200 @3382.

## D-0171 — Mines fill_lvl / makemaz(minefill) + dungeon align 3-bit

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10861 after `>`/`getbones`
  — C `nhlib.lua` shuffle `rn2(3)`; JS ordinary `makelevel` Medusa
  `rn2(5)`.
- **Rejected:** wrong getbones arity; themerms reload; Medusa check
  always-first as C order (C only evaluates `rn2(5)` after special/
  fill_lvl branches fail).
- **C locus:** `mklev.c` `makelevel` `fill_lvl` → `makemaz` →
  `load_special(minefill)` → `splev_initlev` SOLIDFILL+MINES →
  `mkmap.c` `init_fill`/passes/`join_map`; `dungeon.c`
  `flags.align` 3-bit bitfield truncates `D_ALIGN_*`.
- **Cause:** JS correctly set `uz` to Mines (`dnum=2`) on branch
  stairs but `makelevel` ignored `dungeons[].fill_lvl` and always ran
  ordinary rooms (burning Medusa `rn2(5)` first). Separately, JS stored
  dungeon `flags.align = D_ALIGN_LAWFUL (0x40)` full-width so
  `induced_align` took the `rn2(100)` dungeon path; C’s 3-bit field
  truncates 0x40→0 and falls through to `rn2(3)`.
- **Change:** `makelevel` dispatches `fill_lvl` → `makemaz` → JS
  `minefill.lua` body (`mkmap` + stairs/objects/monsters/traps);
  dungeon `flags.align = dgn_align & 7`.
- **Verification:** seed0030 prefix **10861→12757** positional
  **13100**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **134130**.
- **Named omission:** full `create_trap`/`mktrap_victim` on des.trap;
  `fixup_special`/`place_lregion`; hellfill/other protos; empty
  `makemaz("")` maze; Is_special / quest fill branches.
- **Lesson:** after `getbones` on a branch dungeon, check
  `fill_lvl`/`makemaz` before ordinary Medusa `rn2(5)`; dungeon align
  must match C’s 3-bit truncation.
- **Next:** seed0030 @12757 cleared by D-0172; see D-0172 next.

## D-0172 — race hatemask / M2 race bits + S_GNOME m_initinv

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12757 — C
  `rnd(14) @ m_initweap` (default gnome); JS `rn2(16)` (looked like
  wrong weapon envelope).
- **Rejected:** JS `m_initweap` default using `rn2(16)` instead of
  `rnd(14)` — default path already matched C; mismatch was an earlier
  extra `peace_minded` roll. S_GNOME special weapon case (C has none;
  gnomes fall through to default).
- **C locus:** `role.c` races[] `hatemask`/`lovemask`; `mondata.h`
  `race_hostile`/`race_peaceful`; `makemon.c` `peace_minded` /
  `m_initinv` S_GNOME; `monflag.h` M2_HUMAN…M2_ORC; extractor
  `scripts/extract-monsters.py` M2_FLAGS.
- **Cause:** (1) Human `hatemask = MH_GNOME|MH_ORC` so Tourist vs
  gnome returns hostile without co-align `rn2(16+record)`. JS omitted
  race masks and `race_*` checks. (2) Extractor zeroed unknown M2 race
  bits (`M2_GNOME` etc.), so even with hatemask the bit test failed.
  (3) After peace_minded, C `m_initinv` S_GNOME burns Mines
  `rn2(20)` candle gate; JS had tail-only `rn2(50)`/`rn2(100)`.
- **Change:** races[] `lovemask`/`hatemask` + copy onto `game.urace`;
  `peace_minded` race_peaceful/hostile (+ amulet arm); regenerate
  `monsters_data.js` with full M2 race bits; `m_initinv` S_GNOME
  candle before defensive/misc rolls.
- **Verification:** seed0030 prefix **12757→12907** positional
  **13718**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135175**.
- **Named omission:** MS_LEADER/GUARDIAN/NEMESIS/ERINYS/`is_minion`
  peace_minded arms; other `m_initinv` bodies (mercenary/nymph/…);
  `begin_burn` on failed mpickobj; `likes_gold`/`mkmonmoney`.
- **Lesson:** `rn2(16)` right after makemon gender is almost always
  `peace_minded` co-align — check `race_hostile` and extracted M2 race
  bits before blaming `m_initweap`.
- **Next:** seed0030 @12907 cleared by D-0173; see D-0173 next.

## D-0173 — NAMS pmnames / name_to_monplus gender (gnome lord)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12907 — C
  `rn2(3) @ induced_align`; JS `rn2(2)` (looked like induced_align
  dungeon-align short-circuit or wrong rn2 arity).
- **Rejected:** `induced_align` itself wrong (lev/dun align gates) —
  C was already on the final `rn2(3)` fallback; JS emitted an *extra*
  call before that. Also not a minefill `create_monster` order bug:
  prior gnome `find_montype`/`induced_align` pairs matched.
- **C locus:** `monst.c` `NAM`/`NAMS` → `permonst.pmnames[]`;
  `mondata.c` `name_to_monplus` gender match; `sp_lev.c`
  `find_montype` / `lspo_monster`; extractor
  `scripts/extract-monsters.py`.
- **Cause:** JS `name_to_monplus` only matched enum tokens
  (`PM_GNOME_LEADER` → `"gnome leader"`). `"gnome lord"`
  prefix-matched `"gnome"` → PM_GNOME, then `find_montype_gender`
  burned `rn2(2)` for non-fixed-sex. C matches NAMS male
  `"gnome lord"` → PM_GNOME_LEADER + MALE with **no** gender RNG,
  then `induced_align` `rn2(3)`.
- **Change:** extract `pmnames[MALE/FEMALE/NEUTRAL]` from NAM/NAMS;
  `name_to_monplus` longest-match + gender out-param; `find_montype`
  uses name gender before `rn2(2)`.
- **Verification:** seed0030 prefix **12907→12968** positional
  **13313**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134770**.
- **Named omission:** full `alt_spl` table / rank titles; other
  `m_initinv` bodies; `likes_gold` cleared by D-0174.
- **Lesson:** `rn2(2)` immediately before `induced_align` in minefill
  is `find_montype` gender — check NAMS male/female names, not
  `induced_align` first.
- **Next:** seed0030 @12968 cleared by D-0174; see D-0174 next.

## D-0174 — m_initinv likes_gold / mkmonmoney

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12968 — C
  `rn2(5) @ m_initinv(makemon.c:830)`; JS `rn2(100)` (`peace_minded`).
- **Rejected:** peace_minded / gnome candle order wrong — prior
  defensive `rn2(50)`/`rn2(100)` matched; only the trailing gold gate
  was missing. Also not “ordinary gnomes need gold” — gnomes lack
  `M2_GREEDY`; the peel is dwarf/orc GREEDY.
- **C locus:** `mondata.h` `likes_gold`; `steal.c` `findgold`;
  `makemon.c` `mkmonmoney` / `m_initinv` trailing gold; `monflag.h`
  `M2_GREEDY`.
- **Cause:** JS `m_initinv` deferred `likes_gold`/`mkmonmoney` after
  the defensive/misc rolls, so GREEDY monsters skipped `!rn2(5)` and
  jumped to `peace_minded`.
- **Change:** `likes_gold` + `M2_GREEDY`; `findgold`; `mkmonmoney`
  (`mksobj(GOLD_PIECE)` + `add_to_minv`); wire
  `likes_gold && !findgold && !rn2(5)` → `d(level_difficulty(), …)`.
- **Verification:** seed0030 prefix **12968→13007** positional
  **13339**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134796**.
- **Named omission:** PM_SOLDIER `rn2(13)` early return; other
  `m_initinv` bodies (mercenary/nymph/…); `findgold` container walk;
  `begin_burn` on failed candle `mpickobj`.
- **Lesson:** trailing `m_initinv` gold is shared across GREEDY mlets
  (dwarf/orc/…), not part of the S_GNOME candle case.
- **Next:** seed0030 @13007 cleared by D-0175; see D-0175 next.

## D-0175 — minefill create_monster induced_align before mkclass

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13007 — C
  `rn2(3) @ induced_align`; JS `rn2(9)` (`mkclass_aligned`).
- **Rejected:** induced_align dungeon/lev align gates wrong — named
  gnome/dwarf spawns already matched amask/`rn2(3)`; only class-letter
  `'G'`/`'h'` diverged. Also not a mkclass body bug (C’s next call is
  the same `rn2(9)` after amask).
- **C locus:** `sp_lev.c` `create_monster` → `sp_amask_to_amask` then
  `mkclass(class, G_NOGEN)` when `id == NON_PM`.
- **Cause:** JS `splev_create_monster` called `mkclass` before
  `induced_align(80)` for single-letter classes.
- **Change:** reorder — named `find_montype_gender` first; always
  `induced_align(80)`; then class-letter `mkclass`.
- **Verification:** seed0030 prefix **13007→13122** (then D-0176);
  green+strict PASS; cohort PASS.
- **Named omission:** `In_mines` your_race dwarf/gnome `rn2(3)` null-out;
  humidity `get_location_coord`; appear/inventory; non-RANDOM amask /
  `mk_roamer`.
- **Lesson:** class-letter and named minefill paths share amask but
  differ on whether `mkclass` runs after it — do not hoist mkclass.
- **Next:** seed0030 @13122 cleared by D-0176; see D-0176 next.

## D-0176 — minefill create_trap traptype retry + mktrap victim

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13122 — C second
  `rnd(25) @ traptype_rnd`; JS `rn2(79)` (`get_location`). After retry
  fix, @13127 C `rnd(4) @ mktrap` vs JS next get_location.
- **Rejected:** get_location arity / trap count wrong — first
  location+traptype matched; JS simply accepted NO_TRAP without retry
  then skipped victim gate.
- **C locus:** `sp_lev.c` `create_trap` → `mktrap` (`mklev.c`) —
  `do { traptype_rnd } while NO_TRAP`; hole→ROCKTRAP; victim
  `lvl <= rnd(4)` (+ LANDMINE→PIT / `mktrap_victim`).
- **Cause:** JS `splev_create_trap` called `traptype_rnd` once and
  skipped on NO_TRAP; never burned victim `rnd(4)`.
- **Change:** retry loop + ROCKTRAP rewrite + victim gate wired to
  existing `mktrap_victim` (same shape as `mktrap_room` / telehub).
- **Verification:** seed0030 prefix **13122→13226** positional
  **14148**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135605**.
- **Named omission:** `MKTRAP_NOSPIDERONWEB`/`SEEN`/`NOVICTIM` Lua
  flags; WEB giant spider; stair/ladder location retry; full
  `place_lregion` / stock after minefill traps.
- **Lesson:** special-level random traps still use ordinary `mktrap`
  retry+victim unless Lua sets `novictim`.
- **Next:** seed0030 @13226 cleared by D-0177; see D-0177 next.

## D-0177 — minefill fixup_special place_lregion + Mines mineralize

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13226 — C `rn2(79)` /
  `rn2(21)` @ `place_lregion`; JS `rn2(1000)` @ `mineralize`. After
  fixup, @13261 C `next_ident` (gold `mksobj`) vs JS still bare
  `rn2(1000)` until Mines gold/gem boost.
- **Rejected:** stock_room / ordinary mineralize-first — C provenance is
  `fixup_special` after `load_special`; minefill.lua has `noflip` and
  no lev_regions, so the only `place_lregion` is the Is_branchlev
  fallback. Room-based `place_branch(0,0)` is wrong here because
  `join_map_cleanup` leaves `nroom==0`.
- **C locus:** `sp_lev.c` `load_special` → `fixup_special` /
  `place_lregion` / `put_lregion_here` (`mkmaze.c`); `place_branch`
  (`mklev.c`); `mineralize` Mines `goldprob*=2` / `gemprob*=3`.
- **Cause:** JS `load_minefill` never called `fixup_special`; hero-only
  `place_lregion` stub lacked LR_BRANCH; mineralize omitted Mines boost.
- **Change:** port `bad_location`/`put_lregion_here`/`place_lregion`
  (branch short-circuit when `nroom`); `fixup_special` after minefill
  wallify; `place_branch(br,x,y)` coords; Mines mineralize multipliers.
- **Verification:** seed0030 prefix **13226→13906** positional
  **14344**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135801**.
- **Named omission:** lev_region[] compiler path; `mkportal`;
  `is_exclusion_zone`; oneshot `undestroyable_trap`/`rloc` tele; hell /
  V_tower / rogue / arboreal / Is_special mineralize skips; In_quest
  gold/gem slash; `mdig_tunnel` after Mines load.
- **Lesson:** after mkmap cleanup `nroom==0`, branch placement uses
  full-map `place_lregion` RNG — not the ordinary-room `place_branch`
  path. Mines mineralize probs are doubled/tripled.
- **Next:** seed0030 @13906 cleared by D-0178; see D-0178 next.

## D-0178 — mdig_tunnel / tunnels / ALLOW_DIG (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13906 — C `rnd(12)` @
  `mdig_tunnel`; JS `rn2(5)` @ `distfleeck`.
- **Rejected:** inventing a one-seed dig burn without wiring `can_tunnel` —
  every tunnel-capable move burns `pile=rnd(12)` even on open floor.
- **C locus:** `mondata.h` `tunnels`/`needspick`; `mon.c` `mon_allowflags`
  `ALLOW_DIG` + `mfndpos` diggable rock/tree; `monmove.c` `m_move`
  `can_tunnel` + close-range needspick disable + `postmov` →
  `dig.c` `mdig_tunnel` / `hack.c` `may_dig`.
- **Cause:** JS forced `can_tunnel=false` and skipped `mdig_tunnel`, so
  rock moles (and other M1_TUNNEL) never burned the post-move dig RNG.
- **Change:** `tunnels`/`needspick`; `mon_allowflags`/`mfndpos` ALLOW_DIG
  rockok/treeok/thrudoor; real `can_tunnel` in `m_move`; `js/dig.js`
  `may_dig`/`mdig_tunnel` (door/SCORR/wall/tree/stone + draft/crash/
  boulder-rock/treefruit); postmov call.
- **Verification:** seed0030 prefix **13906→13921** positional
  **14256**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135713**.
- **Named omission:** iron bars; `m_digweapon_check`; shop `add_damage`;
  Hallucination draft; `in_town` cavernous gate; peaceful shop/temple
  dig avoid; cursed-mwep dig-tool gate; full `mb_trapped` mondead;
  `ALLOW_WALL` passwall; engulfer update.
- **Lesson:** tunnel dig RNG is on every successful move of a digger,
  not only when standing on rock — `may_dig` is true for open floor.
- **Next:** seed0030 @13921 cleared by D-0179/D-0180; see those next.

## D-0179 — get_mattk from extracted mattk[] / AT_WEAP=254 (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13921 — C `rnd(20)` @
  `mattacku`; JS `rn2(12)` (next dig / other path).
- **Rejected:** inventing a Mines-only attack stub — extracted
  `mattks` already had full NATTK slots; JS ignored them.
- **C locus:** `monattk.h` AT_WEAP=254 / AT_SPIT=10; `mhitu.c`
  `getmattk` → `mptr->mattk[indx]`; `mattacku` `rnd(20+i)`.
- **Cause:** `get_mattk` used a hand `FIRST_ATTK` map with
  `AT_WEAP=10` (actually AT_SPIT). Mines dwarves/gnomes were AT_NONE
  so melee never burned the hit die.
- **Change:** `get_mattk` reads `magr.data.mattk[i]`; constants
  AT_WEAP=254 / AT_MAGC=255 / AT_SPIT=10; retire FIRST_ATTK.
- **Verification:** seed0030 prefix **13921→13953**; green+cohort PASS.
- **Named omission:** `getmattk` substitutions (SEDUCE/disease/DREN/
  mspec_used/cold→phys/…); AT_MAGC/AT_BREA/AT_GAZE/… bodies in
  `mattacku`; full multi-slot passives beyond AT_NONE scan.
- **Lesson:** experience() already used AT_WEAP=254 — combat must
  match `monattk.h`, not invent AT_WEAP=10 from older NetHack.
- **Next:** cleared further by D-0180; see D-0180 next.

## D-0180 — m_digweapon_check + pick/axe mon_wield (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13953 — C `distfleeck`
  rn2(5); JS `rnd(12)` @ dig (after matching track rn2(32)).
- **Rejected:** disabling dig near hero alone — C spends the turn
  wielding before place when needspick diggers lack the right tool.
- **C locus:** `monmove.c` `m_digweapon_check`; `weapon.c`
  `mon_wield_item` NEED_PICK_AXE / NEED_AXE / NEED_PICK_OR_AXE;
  hero-square `m_move` returns MMOVE_NOTHING (not DONE).
- **Cause:** JS always placed + `mdig_tunnel` for tunnelers; missing
  digweapon gate let needspick diggers dig when C only wielded.
- **Change:** `m_digweapon_check` before place; pick/axe arms of
  `mon_wield_item`; export `m_carrying`/`mon_has_shield`; hero-square
  → MMOVE_NOTHING so dochug can attack.
- **Verification:** seed0030 prefix **13953→13987** positional
  **14343**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135799**.
- **Named omission:** weld refuse-wield plines; `artifact_light`;
  NEED_HTH/`select_hwep`; dog_move digweapon; canseemon wield msgs.
- **Lesson:** dig RNG is gated by weapon readiness for needspick
  species — missing wield looks like “extra dig”, not wrong may_dig.
- **Next:** seed0030 @13987 (`next_ident` vs dig) /
  seed0101 Scr / seed0200 @3382.

## D-0181 — trapeffect_rocktrap + hostile gettrack + initrack (seed0030)

- **Status:** partial — rocktrap + hostile gettrack + level-leave initrack
  ported; dwarf @13987 pick still open
- **Observed:** seed0030 first RNG mismatch @13987 — C `next_ident`
  `rnd(2)` @ rocktrap `t_missile(ROCK)`; JS `rnd(12)` dig.
- **C locus:** `trap.c` `trapeffect_rocktrap` monster branch;
  `monmove.c` `m_move` `should_see` + `gettrack`; `mondata.c` `can_track`;
  `do.c`/`save.c`/`track.c` `savelev`→`save_track`→`initrack`.
- **Cause (ported):** JS `trapeffect_selector` omitted ROCKTRAP; hostile
  `m_move` omitted `!should_see && can_track`→`gettrack`; `goto_level`
  omitted initrack so prior-level tracks leaked.
- **Change:** monster `trapeffect_rocktrap`; `haseyes`/`can_track`;
  hostile `should_see`+`gettrack`; `goto_level` `initrack` on leave.
- **Rejected / falsified:**
  1. Wiring gettrack without initrack: stale tracks redirect newt
     @10676 → @10701 `rn2(24)` vs C `rn2(20)`.
  2. **Dwarf @13987 needs gettrack to prefer ROCKTRAP (27,6):** dwarf at
     (27,7), mux=(33,5), candidates include ROCKTRAP (27,6) and nearer
     (28,6); gettrack returns **null** — current-level ring has only
     (30,8)/(31,7)/(32,6); full stale prior-level ring also has no
     adjacent cell. Not a missing gettrack redirect.
- **Verification:** green+strict PASS; cohort PASS; full **15/44** Scr
  **1405** RNG **135795**; seed0030 prefix still **13987**.
- **Named omission:** hero rocktrap/helmet; empty-door pline_mon;
  Invis/balks/shortsighted/`m_search_items`; Excalibur `can_track`;
  per-level `rest_track` on return visits.
- **Lesson:** C `savelev` clears tracks on leave — porting gettrack
  without initrack invents cross-level footprints. Falsify adjacent-track
  presence before attributing a nearer-trap miss to gettrack.
- **Next:** why C steps on ROCKTRAP without adjacent track (mfndpos /
  actor order / other gg); or peel seed0101 Scr.

## D-0182 — m_search_items loot gg redirect (seed0030 dwarf rocktrap)

- **Status:** fixed (partial helpers; named omissions below)
- **Observed:** seed0030 @13987 — C `next_ident` rocktrap; JS `rnd(12)` dig
  toward mux-nearer (28,6). gettrack redirect falsified (D-0181).
- **C locus:** `monmove.c` `m_move` getitems gate + `m_search_items` /
  `mon_would_take_item` / `can_carry`.
- **Cause:** JS hostile `m_move` omitted floor-loot search. DIAG at dwarf
  (27,7): ROCKTRAP (27,6) pile CORPSE/SLIME_MOLD/ROCK/WORTHLESS_WHITE_GLASS;
  dwarf `M2_JEWELS|M2_COLLECT` → `likes_objs`/`likes_gems` redirects gg to
  (27,6), so rocktrap is nearer than dig (28,6).
- **Change:** `js/monmove.js` getitems + `m_search_items` +
  `mon_would_take_item`/`can_carry`/`curr_mon_load`/`max_mon_load`;
  `js/monsters.js` `likes_gems`/`likes_objs`/`likes_magic`/`mindless`/
  `is_animal`/`strongmonst` + `M2_JEWELS`/`M2_COLLECT`/`M2_MAGIC`.
- **Named omission:** `searches_for_item`; shop `in_rooms`+`rn2(25)`;
  `hides_under`/`onscary`/`costly_spot`; mines/soko prizes;
  `can_touch_safely` petrify/silver/artifact; `mon_would_consume_item`
  body; Invis/balks/shortsighted still deferred.
- **Verification:** seed0030 prefix **13987→14026**; positional
  **14351**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135801**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** mfndpos excluding (28,6)/(28,7); actor-order
  before loot gg (loot was the writer).
- **Next:** seed0030 @14026 (C `rn2(28)` mtrack vs JS `rn2(5)`
  distfleeck — actor/cnt); or seed0101 Scr / seed0200 @3382.

## D-0183 — underfoot m_search_items MMOVE_DONE (seed0030 gnome glass)

- **Status:** partial (underfoot short-circuit deferred; peaceful can_carry done)
- **Observed:** seed0030 @14026 — C `rn2(28)` mtrack @ `monmove.c:1963`;
  JS `rn2(5)` distfleeck.
- **C locus:** `monmove.c` `m_search_items` underfoot → `MMOVE_DONE` →
  `postmov` → `mpickstuff`; `mon.c` `can_carry` peaceful gate.
- **Cause:** DIAG: PM_GNOME @(57,11) on WORTHLESS_BLUE_GLASS —
  `m_search_items` returned TRUE (underfoot take). JS `postmov` ignored
  `MMOVE_DONE` (no mpickstuff), so the turn ended without mfndpos/mtrack
  while C continued to approach (`cnt=7` → `rn2(28)`). Actor-order/cnt
  drift after D-0182 **falsified**.
- **Change:** `js/monmove.js` — skip underfoot loot claim in
  `m_search_items` (distant redirects unchanged); `can_carry` peaceful
  non-pets return 0; `postmov` acknowledges DONE (pickup still omitted).
- **Named omission:** restore underfoot `return TRUE` together with
  `postmov`→`mpickstuff` (and shop `rn2(25)` / metallivorous / gelcube /
  corpse_eater arms as needed).
- **Verification:** seed0030 prefix **14026→14056**; positional
  **14375**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135825**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** post-loot actor skip / fleeck-only cnt drift;
  peaceful standing-vs-approaching (all gnomes `mpeaceful=0`); onscary /
  trap / shop under glass cell (none).
- **Next:** seed0030 @14056 (`u_catch_thrown_obj` rn2(88) vs JS rn2(32));
  or seed0101 Scr / seed0200 @3382.

## D-0184 — muse potion throw + potionhit (seed0030 @14056)

- **Status:** partial (potion offense + hero potionhit/breathe/makeknown;
  wand/horn muse and full peffects deferred)
- **Observed:** seed0030 @14056 — C `rn2(88)` `u_catch_thrown_obj`;
  JS `rn2(32)` `m_move`. Call-site stacks: C already in `m_throw`
  forcehit; JS at `thrwmu` URETREATING `rn2(5)` with ARROW.
- **C locus:** `mhitu.c` `mattacku` → `muse.c` `find_offensive` /
  `use_offensive` (MUSE_POT_SLEEPING); `mthrowu.c` `m_throw` potion
  branch → `potion.c` `potionhit`/`bottlename`/`potionbreathe`;
  flight `observe_object` → breathe `makeknown` →
  `discover_object(..., credit_hero)` → `exercise(A_WIS,TRUE)`.
- **Cause:** JS lacked muse offensive potion throw before AT_WEAP, so C
  hurled POT_SLEEPING while JS tried thrwmu ARROW and aborted on
  URETREATING. Coincident `rn2(5)` values were not `m_throw` forcehits.
- **Change:** `js/muse.js` (new) potion `find_offensive`/`use_offensive`;
  wire in `js/mhitu.js` `mattacku`; `js/mthrowu.js` POTION→`potionhit` +
  flight `observe_object`; `js/potion.js` `potionhit`/`bottlename`/
  `potionbreathe` hero path (`obfree` not `delobj`); `js/invent.js`
  `discover_object` credit_hero + `makeknown`; `js/hack.js` `losehp`
  matches C `end_running` (no forced `multi=0`).
- **Named omission:** muse wand/horn/scroll/camera offense; mon-target
  `potionhit`; `hold_another_object` catch; towel/Half_gas; trycall when
  `!kn`; full `make_confused`/`make_blinded` bodies.
- **Verification:** seed0030 prefix **14056→14118**; positional
  **14487**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135937**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** wrong `catch_chance`/DEX (JS never entered
  catch); `delobj` after potionhit (extra `rn2(100)`); makeknown without
  flight `observe_object` when thrower `!cansee`.
- **Next:** seed0030 @14151 (after D-0185); or seed0101 Scr / seed0200 @3382.

## D-0185 — seed0030 @14118 missing postmov `mpickstuff`

- **Status:** fixed
- **Observed:** seed0030 @14118 — C `rn2(32)` @ `m_move` mtrack; JS
  `rn2(24)`. Matching `rn2(32)` @14074 with **different mon positions**:
  C `(59,9)` vs JS `(58,9)` (same arg — silent path split).
- **C recorder dump:** at `(59,8)` both `gettrack=null`, `mux=(33,5)`;
  after `m_search_items` C `gg=(59,12)` vs JS `gg=(57,11)`. Same
  `poss`/cnt=8. C has no floor glass at `(57,11)` (gnome there holds
  glass in `minvent`); JS still has floor glass → nearer loot redirect.
  At `(57,10)` C **also** has TRCORNER/BRCORNER and cnt=6 — wall-opener
  theories were red herrings (FORCE-open coincidence).
- **C locus:** `mon.c` `mpickstuff`; `monmove.c` `postmov` shared
  `MOVED|DONE` `OBJ_AT` pickup; `m_search_items` gg.
- **Cause:** JS `postmov` never called `mpickstuff`, so hostile gnomes
  left takeable glass on the floor; later `m_search_items` chose a
  different gg without burning different RNG at the prior mtrack call.
- **Fix:** port `mpickstuff` (one-object take via `mon_would_take_item`/
  `can_carry`/`splitobj`/`mpickobj`) and run it in `postmov` for
  `MMOVE_MOVED|MMOVE_DONE` like C.
- **Rejected / falsified:** mkmap pass_two/join/flood/dig/wallify openers;
  post-wallify typ writers; C walkable walls at `(56,9)/(56,10)` when
  gnome is at `(57,10)`.
- **Verification:** seed0030 prefix **14118→14151**; positional
  **14489**/105529; full **15/44** Scr **1405** RNG **135939**; green
  + seed1500/1800/0060 + strict PASS. Next @14151 `distfleeck` vs
  `rnd(2)`.
- **Named omissions:** underfoot `m_search_items`→`MMOVE_DONE` still
  deferred (D-0183); shop/`inhishop`; meatmetal/cube/corpse_eater;
  `check_gear_next_turn`; `distant_name` side-effects.

## D-0186 — can_carry quan>1 only for M1_NOHANDS (seed0030 @14151)

- **Status:** fixed
- **Observed:** seed0030 @14151 — C `rn2(5)` `@distfleeck`; JS `rnd(2)`
  via `next_ident`←`splitobj`←`mpickstuff`←`postmov`.
- **DIAG:** PM_GNOME (hands) @(49,19) on WORTHLESS_VIOLET_GLASS quan=2
  owt=2; JS `carryamt=1` forced split; `nohands=false`; load 1/166.
- **C locus:** `mon.c` `can_carry` — `iquan>1` returns 1 only when
  `M1_NOHANDS && !glomper` (dragon gold/gems / AT_ENGL exceptions);
  otherwise weight-check then return full `iquan`.
- **Cause:** JS `can_carry` always `return 1` for any stack, so hands
  gnomes split every multi-quan gem and burned `next_ident` while C
  took the whole stack with no RNG.
- **Fix:** port C quan/nohands/glomper/peaceful/boulder/nymph/weight
  order in `js/monmove.js` `can_carry`; export `M1_NOTAKE`.
- **Verification:** seed0030 prefix **14151→14231**; positional
  **14536**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135986**; green+cohort+strict PASS.
- **Named omissions:** huge-quan `rn2(LARGEST_INT)` clamp; `can_touch_safely`
  petrify/silver/artifact; dogmove.js still uses simplified quan→1
  (pets are nohands — coincidentally OK).
- **Next:** seed0030 @14231 (`hitum`/`exercise` vs `rn2(5)`); or
  seed0101 Scr / seed0200 @3382.

## D-0187 — weapon_hit_bonus + martial barehands (seed0030 @14231)

- **Status:** fixed
- **Observed:** seed0030 @14231 — C `rn2(19)` `@exercise` after `hitum`
  `rnd(20)=13`; JS `rn2(5)` `@distfleeck`. seed0200 @3383 after the
  hit-bonus fix: C `rnd(4)` barehands vs JS `rnd(2)`.
- **Cause:** JS `find_roll_to_hit` stubbed `weapon_hit_bonus`→0. C
  `weapon_type(NULL)`→`P_BARE_HANDED_COMBAT`; unskilled non-martial
  bonus is **+1**, so `tmp > 13` and C hits→`exercise`/`hmon` while JS
  misses. Separately, `hmon_hitmon_barehands` uses
  `rnd(!martial_bonus() ? 2 : 4)` — Monk/Samurai need `rnd(4)`.
- **C locus:** `weapon.c` `weapon_hit_bonus` / `weapon_type` /
  `martial_bonus`; `uhitm.c` `find_roll_to_hit` / `hmon_hitmon_barehands`.
- **Fix:** port `weapon_hit_bonus` (weapon / two-weapon / bare-hand /
  riding) in `js/weapon.js`; wire into `find_roll_to_hit`; barehands
  `rnd(martial_bonus() ? 4 : 2)`.
- **Verification:** seed0030 prefix **14231→14235** (`passive`);
  positional **14586**/105529; seed0200 prefix **3382→3387**
  (`xkilled`/`next_ident`); full **15/44** Scr **1405** RNG
  **136046**; green+cohort+strict PASS.
- **Named omissions:** `hitval` silver/artifact/`spec_abon`;
  `weapon_dam_bonus`/`dbon` in `hmon`; `passive` body; Cleaver /
  twoweapon / `double_punch`.
- **Next:** seed0030 @14235 `passive` `rn2(3)`; or seed0200 @3387
  `xkilled` corpse/`next_ident`; or seed0101 Scr.

## D-0188 — hitum `passive` live rn2(3) (seed0030 @14235)

- **Status:** fixed
- **Observed:** seed0030 @14235 — C `rn2(3)` `@passive(uhitm.c:6019)`
  after live `hmon`; JS `rn2(5)` `@distfleeck`.
- **Cause:** JS `hitum` never called `passive`. C always calls
  `passive(mon, uwep, mhit, malive, AT_WEAP, …)` after `known_hitum`.
  First AT_NONE slot (often a NO_ATTK filler) still takes the live gate
  `malive && !mcan && rn2(3)` even when `damn=damd=0` and the adtyp
  switch is `default`.
- **C locus:** `uhitm.c` `hitum` / `passive` / `passive_obj`.
- **Fix:** port `passive` + `passive_obj` (RNG-faithful; erosion /
  gaze / split_mon bodies named omissions) and wire into `hitum`.
- **Verification:** seed0030 prefix **14235→14296** (`dmgval`);
  positional **14565**/105529 Scr **168**/1953; full **15/44** Scr
  **1405** RNG **136012**; green+cohort+strict PASS; seed0200 still
  **3387**.
- **Named omissions:** full AD_PLYS gaze/cube; `ugolemeffects` /
  `split_mon` / `erode_obj`/`erode_armor`/`drain_item` bodies;
  `done_in_by` stone; `attk_protection`; dokick/`hmon` poly-form
  `passive` callers; `s_suffix`/`hliquid` splash wording.
- **Next:** seed0030 @14296 `dmgval` `rnd(2)` vs `rnd(1)`; or
  seed0200 @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## D-0189 — extract oc_wsdam / dmgval (seed0030 @14296)

- **Status:** fixed
- **Observed:** seed0030 @14296 — C `rnd(2)` `@dmgval(weapon.c:265)`; JS
  `rnd(1)` (stand-in default).
- **Cause:** `extract-objects.py` already read C `oc_wsdam`/`oc_wldam` in
  the dump struct but never emitted them. JS `dmgval` used a partial
  name→sdam map that defaulted missing otyps (BULLWHIP/WORM_TOOTH/
  grappling hook, …) to **1**.
- **C locus:** `objects.h` WEAPON/WEPTOOL/PROJECTILE/ROCK `sdam`/`ldam`;
  `weapon.c` `dmgval`.
- **Fix:** emit `oc_wsdam`/`oc_wldam` from the extractor; regenerate
  `objects_data.js`; rewrite `dmgval` to use extracted dice + small-
  monster otyp switch (`+1` / `rnd(4)` / `rnd(6)`); drop the stand-in map.
- **Verification:** seed0030 prefix **14296→14299** (`can_make_bones` vs
  JS `rn2(5)`); positional **14572**/105529 Scr **168**/1953; full
  **15/44** Scr **1405** RNG **136019**; green+cohort+strict PASS;
  seed0200 still **3387**.
- **Named omissions:** large-monster otyp switch (`d(2,4)`/`d(2,6)`…);
  thick-skin/shade/silver/blessed/axe/artifact_light bonuses; heavy iron
  ball weight; `special_dmgval`; hero death/`done`/`can_make_bones` after
  killing blow (next peel @14299).
- **Next:** seed0030 @14299 hero death vs survival after matched `dmgval`;
  or seed0200 @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## D-0190 — mdamageu → done_in_by / can_make_bones (seed0030 @14299)

- **Status:** fixed
- **Observed:** seed0030 index **14299** — C `rn2(1)=0 @ can_make_bones`
  after matched knockback; JS `rn2(5)` (`distfleeck`) while hero kept
  fighting.
- **C locus:** `mhitu.c` `mdamageu` → `done_in_by` → `done` →
  `really_done` → `bones.c` `can_make_bones` depth `rn2(1+(depth>>2))`.
- **Cause/evidence:** DIAG — fatal blow `n=8` with `uhp_before=4` at
  idx 14299; JS `mdamageu` routed through `losehp` (gameover only, no
  bones RNG) and `runSegment` kept driving `moveloop_core` past death.
- **Change:** new `js/end.js` (`can_make_bones` / `done_in_by` / `done` /
  `really_done` stub); `mdamageu` matches C HP subtract + `done_in_by`;
  gameover stops `movemon` / `moveloop_core` / `runSegment`.
- **Verification:** seed0030 seg0 RNG **complete** (prefix **14300**,
  JS emitted 14300; next C line is seg1 `randomize_gem_colors`);
  positional **15844**/105529 Scr **44**/1953 (Scr drop = lost
  post-death accidental matches in seg0); full **15/44** Scr **1281**
  RNG **137291**; green+cohort+strict PASS; seed0200 still **3387**.
- **Named omissions:** full `no_bones_level` / portal ban / `savebones`
  body; Lifesaved; wizard·discover `Die?`; disclosure / topten / rip;
  `losehp`→`done(DIED)` path; killer/`ugrave_arise` detail.
- **Next:** seed0200 @3387 `xkilled`/`next_ident`; or seed0030 multi-
  segment / disclosure Scr; or seed0101 Scr residual.

## D-0191 — xkilled → make_corpse when corpse_chance (seed0200 @3387)

- **Status:** fixed
- **Observed:** seed0200 index **3387** — after matched
  `xkilled`/`corpse_chance` (`rn2(6)=3`, `rn2(2)=0`), C
  `rnd(2)=2 @ next_ident(mkobj.c:521)`; JS `rn2(12)`.
- **C locus:** `mon.c` `xkilled` → `corpse_chance` → `make_corpse` →
  `mkcorpstat`/`mksobj` `next_ident`.
- **Cause/evidence:** JS `xkilled` burned `corpse_chance` but never
  called `make_corpse` (comment said deferred). Treasure `!rn2(6)` was
  false here (`=3`); corpse chance succeeded → C created ordinary
  corpse via existing `make_corpse` default_1 path.
- **Change:** export `make_corpse` from `js/mhitm.js`; `js/uhitm.js`
  `xkilled` calls it when `corpse_chance` returns true.
- **Verification:** seed0200 prefix **3387→3547** (`distfleeck` vs
  JS `rn2(2)`); positional **3574**/3822 Scr **22**/40; full **15/44**
  Scr **1288** RNG **137724**; green+cohort+strict PASS.
- **Named omissions:** `mkobj(RANDOM_CLASS)` treasure body;
  `LEVEL_SPECIFIC_NOCORPSE`; `accessible`/`is_pool` gate; wasinside/
  burycorpse/zombify; murder/peaceful luck `rn2`; dragon/unicorn/golem
  corpse specials (shared with mhitm/trap `make_corpse`).
- **Next:** seed0200 @3547 `distfleeck`; or seed0030 disclosure·seg1;
  or seed0101 Scr residual.

## D-0192 — `,` / dopickup unbound (seed0200 @3547)

- **Status:** fixed
- **Observed:** seed0200 index **3547** — after matched EOT
  (`u_calc_moveamt` Fast `rn2(3)`, dosounds, gethungry, wipe_engr),
  C `rn2(5) @ distfleeck`; JS `rn2(2)`.
- **C locus:** `cmd.c` `,` → `dopickup`; `hack.c` `dopickup`/
  `pickup_checks`; `pickup.c` `pickup` / `pickup_object` /
  `pick_obj` (menu `AUTOSELECT_SINGLE`).
- **Cause/evidence:** Stack at mismatch was
  `exercise`←`kick_dumb`←`dokick` (Ctrl-D). `nhgetch` trace: after EOT,
  JS consumed `,`/`e`/`k`/spaces as zero-time (`,` was **Unknown
  command** `move=0`) then hit Ctrl-D kick. C's `,` step RNG is only
  monster/EOT after a timed `dopickup` (one floor object,
  AUTOSELECT_SINGLE — no menu keys). Not a fleeck/APPORT bug.
- **Change:** `js/pickup.js` `dopickup`/`pickup_checks`/`pickup_object`/
  `pick_obj`; manual `pickup(0)` one-object AUTOSELECT; `js/cmd.js`
  `,` → `dopickup`.
- **Verification:** seed0200 prefix **3547→3565** (`eatcorpse`);
  positional **3578**/3822 Scr **24**/40; full **15/44** Scr **1290**
  RNG **138575**; green+cohort+strict PASS.
- **Named omissions:** multi-object `query_objlist`/traditional yn;
  `lift_object` carry_count; shop bill; SCR_SCARE/CORPSE fatal;
  LOADSTONE no-split; furniture-specific nothing messages; engulfer
  loot_mon; encumbrance `pickup_prinv` prefixes.
- **Next:** seed0200 @3565 `eatcorpse`; or seed0030 disclosure·seg1;
  or seed0101 Scr residual.

## D-0193 — eatcorpse / CORPSE doeat (seed0200 @3565)

- **Status:** fixed
- **Observed:** seed0200 index **3565** — after matched EOT, C
  `rn2(20) @ eatcorpse`; JS `rn2(2)` (kick/`exercise` after refuse).
- **C locus:** `eat.c` `doeat` → `touchfood` → `eatcorpse` →
  `start_eating` / `eatfood` occupation; `mondata.h` vegan/vegetarian/
  carnivorous; `hack.c` `rounddiv`; `monsters.h` SIZ `cwt`/`cnutrit`.
- **Cause/evidence:** JS rejected CORPSE with "not implemented" (return
  0) after getobj `e`+`k`, then raced to Ctrl-D. C ate invent goblin
  corpse: rotting `rn2(20)`, `!rn2(7)` skip rotten, palatable path
  (Monk `youmonst` not carnivorous → no `rn2(10)`), `rn2(5)` taste
  index, then multi-turn occupation.
- **Change:** `js/eat.js` `eatcorpse`/`start_eating`/`eatfood`/
  `done_eating`/`bite`; CORPSE in `doeat`; `allmain.js` await
  occupation; extract `cwts`/`cnutrits` + mondata vegan/vegetarian/
  acidic/poisonous/carnivorous/herbivorous; `dogmove` uses extracted
  cwt/cnutrit.
- **Verification:** seed0200 RNG **3822**/3822 Scr **39**/40; full
  **15/44** Scr **1305** RNG **138545**; green+cohort+strict PASS.
- **Named omissions:** floorfood floor; TIN; full `cprefx`/`cpostfx`;
  tainted `make_sick`; `poison_strdmg`; slime/stone; `rottenfood`
  confuse/blind/faint bodies; freeinv invent-full drop; `?`/`*` menu;
  `oc_nutrition` extract.
- **Next:** seed0200 Scr residual / seed0030 disclosure·seg1 /
  seed0101 Scr.

## D-0194 — empty_handed + weapon_insight skill lines (seed0200 Scr)

- **Status:** fixed
- **Observed:** seed0200 Scr **39**/40 (RNG full) — ^X attributes page
  row: JS `You are bare handed.` / `You are unskilled in bare handed
  combat.` vs C `You are empty handed.` / `You have basic skill with
  martial arts.` NOTES guilty+taste topline join **falsified**.
- **C locus:** `wield.c` `empty_handed`; `insight.c` `weapon_insight`;
  `weapon.c` `P_NAME`/`skill_level_name`/`martial_bonus`; `skill_init`
  sets Monk bare-hand to `P_BASIC` when max > Expert.
- **Cause/evidence:** invent enlightenment hardcoded bare-handed/
  unskilled; Monk wears LEATHER_GLOVES → C `uarmg` ⇒ "empty handed";
  `martial_bonus` + `P_BASIC` ⇒ "have basic skill with martial arts."
- **Change:** `js/wield.js` `empty_handed` (+ ready/quiver callers);
  `js/invent.js` weapon_insight from real `P_SKILL`/`skill_name`
  (martial); `js/monsters.js` `M1_HUMANOID`/`humanoid`.
- **Verification:** seed0200 **PASS**; green+strict+cohort PASS; full
  **16/44** Scr **1306**/11405 RNG **138545**/792838.
- **Named omissions:** twoweap skill-comparison branch; `can_advance`
  enhance suffix; ammo-as-uwep skip; odd-skill P_NAME beyond martial;
  full `set_uasmon` youmonst.data (missing data → humanoid start).
- **Next:** seed0030 disclosure·seg1 / seed0101 Scr / seed0103
  `next_ident`.

## D-0195 — NHW_MENU flush NEED_MORE + mark_topline NON_EMPTY (seed0101 Scr)

- **Status:** fixed
- **Observed:** seed0101 Scr **21**/27 (RNG full) — screen 10 C
  `Where do you want to travel to?--More--` vs JS tip menu already
  painted; subsequent tip frames desynced (E/- eaten as getpos dirs).
- **C locus:** `win/tty/wintty.c` `tty_display_nhwindow(NHW_MENU)`
  flushes `TOPLINE_NEED_MORE` via `tty_display_nhwindow(WIN_MESSAGE)`
  before corner paint; `tty_nhgetch` marks `NEED_MORE`→`NON_EMPTY`
  (not EMPTY).
- **Cause/evidence:** After hand-throw pline, `_` travel pline sets
  NEED_MORE; getpos tip NHW_MENU must `more()` that message first.
  JS `paint_corner_nhw_menu` painted tip without flushing; also
  `mark_topline_seen` wrongly cleared to EMPTY.
- **Change:** `js/invent.js` `paint_corner_nhw_menu` +
  `select_menu_pick_none` await `flush_topl_more`; `js/display.js`
  `mark_topline_seen` → `TOPLINE_NON_EMPTY`.
- **Verification:** seed0101 **PASS** (RNG 2371/2371 Scr 27/27);
  green+strict+cohort PASS; full **17/44** Scr **1312**/11405 RNG
  **138545**/792838.
- **Named omissions:** full `update_topl` NON_EMPTY `cury`/docorner;
  other NHW_MENU fullscreen paths beyond pick_none/corner; pline
  NON_EMPTY append policy beyond NEED_MORE.
- **Next:** seed0030 disclosure·seg1 / seed0103 `next_ident` /
  quest `makemaz`.

## D-0196 — CANDY_BAR assign_candy_wrapper (seed0030 seg1 @1238)

- **Status:** fixed
- **Observed:** seed0030 seg1 first mismatch @1238 — C
  `rn2(12) @ assign_candy_wrapper` vs JS `rn2(6)` (quan gate).
- **C locus:** `read.c` `assign_candy_wrapper` (`spe = 1 +
  rn2(SIZE(candy_wrappers)-1)`); `mkobj.c` `mksobj_init` FOOD
  `CANDY_BAR` case before post-switch quan `!rn2(6)`.
- **Cause/evidence:** JS FOOD_CLASS omitted `CANDY_BAR`, so the next
  call was the shared quan `rn2(6)` while C burned wrapper `rn2(12)`
  first. Seg1 isolated prefix **1238→3347**.
- **Change:** `js/mkobj.js` — `assign_candy_wrapper` + `CANDY_BAR`
  branch; `SLIME_MOLD` spe from `current_fruit` when present (fruit
  chain still deferred).
- **Verification:** seed0030 positional **17994**/105529 Scr **44**/1953;
  seg1 prefix **3347**/7640; green+strict+cohort PASS; full **17/44**
  Scr **1312**/11405 RNG **140933**/792838.
- **Named omissions:** fruit `ffruit`/`current_fruit` init + slime-mold
  naming; candy wrapper *text* for `doread`; other FOOD specials
  (pudding globby beyond GLOB_ name skip).
- **Next:** seed0030 seg1 @3347 `dog_goal` vs JS `obj_resists`; or
  seed0103 `next_ident`/`trquan`.


## D-0197 — dogfood CORPSE vegan/lichen → MANFOOD (seed0030 seg1 @3347)

- **Status:** fixed
- **Observed:** seed0030 seg1 first mismatch @3347 — C `rn2(8) @ dog_goal`
  vs JS `rn2(100) @ obj_resists`.
- **C locus:** `dog.c` `dogfood` CORPSE: after age/acid/poison gates,
  `vegan(fptr)` → `herbi ? CADAVER : MANFOOD`; lichen is `S_FUNGUS`/vegan.
  `dogmove.c` `dog_goal` APPORT branch rolls `rn2(8)` only when
  `otyp >= MANFOOD` and `gtyp == UNDEF`.
- **Cause/evidence:** DIAG at pet (38,5): floor lichen CORPSE → JS
  `CADAVER` (hardcoded carni path) set food goal; C returned `MANFOOD`
  so APPORT `rn2(8)` fired, then continued scanning. JS never rolled
  `rn2(8)` and burned a second `obj_resists` on the next object.
- **Change:** `js/dogmove.js` `dogfood` — real `carnivorous`/`herbivorous`;
  CORPSE age poison skips lizard/lichen/fungus-pet; acidic/poisonous →
  POISON; vegan → MANFOOD for non-herbi pets. Deferred: `resists_*`,
  polyfood, cannibalism, rider/petrify.
- **Verification:** seg1 prefix **3347→3466**; seed0030 positional
  **18139**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **140894**/792838.
- **Named omissions:** `resists_poison`/`resists_acid`; `polyfood`;
  humanoid cannibalism; rider/petrify CORPSE; iced `peek_at_iced_corpse_age`.
- **Next:** seed0030 seg1 @3466 `mhitm_mgc_atk_negated`; or seed0103
  `next_ident`/`trquan`.

## D-0198 — `mhitm_mgc_atk_negated` + AD_ELEC `hitmu` (2026-07-13)

- **Symptom:** seed0030 seg1 @3466 C `rn2(10) @ mhitm_mgc_atk_negated`
  vs JS `rn2(3)` (knockback). Screen: "The grid bug bites!  You get
  zapped!"
- **Rejected:** missing passive `rn2(3)` after PHYS hit — C never
  reaches knockback until after `mhitm_ad_elec`.
- **Cause/evidence:** JS `hitmu` only called `mhitm_ad_phys_u`; C
  `hitmu`→`mhitm_adtyping`→`mhitm_ad_elec` (mhitu): `hitmsg`, then
  `mhitm_mgc_atk_negated` (`rn2(10)` vs `3*armpro`), then destroy_items
  gate `m_lev > rn2(20)`.
- **Change:** `js/mhitm.js` `mhitm_mgc_atk_negated` + hero
  `magic_negation` armor `a_can` subset; `js/mhitu.js`
  `mhitm_adtyping_u` (PHYS+ELEC) + `mhitm_ad_elec_u`; `hitmu` wired.
- **Verification:** seg1 prefix **3466→3497**; seed0030 positional
  **18080**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **141570**/792838.
- **Named omissions:** `destroy_items` body when gate passes; monster
  defender `magic_negation`; Protection/amulet MC bumps; other
  `mhitm_ad_*` (FIRE/COLD/ACID/…); `monstseesu`/`monstunseesu`;
  uhitm/mhitm elec branches.
- **Next:** seed0030 seg1 @3497 C `m_move` vs JS `mattacku` (position);
  or seed0103 `next_ident`/`trquan`.

## D-0199 — `monnear` NODIAG diagonal (seed0030 seg1 @3497)

- **Symptom:** seed0030 seg1 @3497 C `rn2(12) @ m_move` vs JS
  `rnd(20) @ mattacku` after grid-bug zap (D-0198).
- **Rejected:** hero/mux coordinate drift or wrong actor order — DIAG
  showed same grid bug (mid73) diagonal to hero in JS; C end screens
  also show diagonal adjacency after `l`.
- **Cause/evidence:** C `mon.c` `monnear`: `dist2==2 && NODIAG` → 0 so
  grid bugs are not "nearby" on diagonals → `dochug` `want_move` →
  `m_move`. JS `monnear` used `distmin<=1` (diagonal counts) → attack.
- **Change:** `js/mon.js` `monnear` matches C (`dist2<3` + NODIAG
  diagonal reject).
- **Verification:** seg1 prefix **3497→3870**; seed0030 positional
  **18437**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **141923**/792838.
- **Named omissions:** none new for `monnear`; themerms descend peel
  next.
- **Next:** seed0030 seg1 @3870 themerms.lua `room`/`nh.rn2`; or
  seed0103 `next_ident`/`trquan`.

## D-0200 — Default themed-fill + Storeroom + set_mimic_sym (seed0030 seg1 @3870)

- **Symptom:** seed0030 seg1 @3870 C `rn2(1) @ themerms.lua:1039
  themeroom_fill` vs JS `rn2(3)` after matching `create_room`.
- **Rejected:** wrong create_room args / next-room nhlib reservoir —
  C reservoir pick was "Default room with themed fill"; fill pick
  Storeroom (diff<4).
- **Cause/evidence:** JS `themerooms_generate` always `create_room(OROOM)`
  + `needfill=FILL_NORMAL` and never called `themeroom_fill` for
  rectangular themed-fill rooms. C `des.room({type="themed", contents=
  themeroom_fill})` → THEMEROOM + fill reservoir + Storeroom
  `selection.room():percentage(30)` + chest/mimic.
- **Change:** `js/mklev.js` — Default/Unlit/Both themed-fill rooms use
  THEMEROOM + `themeroom_fill`; Storeroom body + `selection_filter_percent`;
  mimic-as-chest via `mkclass(S_MIMIC)`/`enexto`/`appear_as`. `js/makemon.js`
  — `set_mimic_sym` on `S_MIMIC` (ordinary ROLL_FROM path; shop/maze arms
  stubbed).
- **Verification:** seg1 prefix **3870→5220** (`mkshop`); seed0030
  positional **19786**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **142362**/792838.
- **Named omissions:** other themerms fill bodies (Ice/Trap/Spider/…);
  Fake Delphi/Pillars/nested `des.room`; shop `get_shop_item` in
  `set_mimic_sym`; maze/sokoban/town mimic arms; altar MCORPSENM.
- **Next:** seed0030 seg1 @5220 `mkshop`; or seed0103 `next_ident`/`trquan`.

## D-0201 — mkshop eligibility + shtypes rnd(100) (seed0030 seg1 @5220)

- **Symptom:** seed0030 seg1 @5220 C `rnd(100)=65 @ mkshop` vs JS
  `rn2(7)` (fillable-room countdown still counted the shop room).
- **Rejected:** stock_room-first — C next call after type pick is
  `rn2(fillable)` at makelevel:1402; stocking is later (~5399).
- **Cause/evidence:** JS `mkshop` skipped eligible rooms without burning
  `rnd(100)` or setting `rtype`/`needfill`, so the room stayed
  ROOM_IS_FILLABLE and the countdown used `rn2(7)` vs C `rn2(6)`.
- **Change:** `js/mklev.js` — `isbig`/`has_*stairs`/`invalid_shop_shape`/
  full non-wizard `mkshop` (light, shtypes pick, `rtype`, `topologize`,
  `needfill`). `js/shknam.js` — `shtypes[]` name/symb/prob for type pick.
  `fill_special_room` early-returns on shop rtype pending `stock_room`.
- **Verification:** seg1 prefix **5220→5255** (`find_random_launch_coord`);
  seed0030 positional **19751**/105529 Scr **44**/1953; green+strict+
  cohort PASS; full **17/44** Scr **1312**/11405 RNG **142327**/792838.
- **Named omissions:** `stock_room`/`shkinit`/`mkshobj_at`/`get_shop_item`;
  shtypes iprobs/shknms; wizard SHOPTYPE; COURT/ZOO/… `do_mkroom` bodies.
- **Next:** seed0030 seg1 @5255 `find_random_launch_coord`/`mktrap`; or
  seed0103 `next_ident`/`trquan`.

## D-0202 — maketrap ROLLING_BOULDER mkroll_launch (seed0030 seg1 @5255)

- **Symptom:** seed0030 seg1 @5255 C `rn2(5)=1 @ find_random_launch_coord`
  vs JS `rnd(4)` (mktrap victim gate).
- **Rejected:** arrow/dart launch setup — traptype was `rnd(25)=7`
  (`ROLLING_BOULDER_TRAP`); C only calls `mkroll_launch` from that
  `maketrap` case.
- **Cause/evidence:** JS `maketrap` omitted `ROLLING_BOULDER_TRAP` →
  `mkroll_launch` → `find_random_launch_coord` (`rn1(5,4)` / `rn2(8)` /
  `isclearpath`), so victim `rnd(4)` ran immediately.
- **Change:** `js/trap.js` — `isclearpath`, `find_random_launch_coord`,
  `mkroll_launch`; `maketrap` calls `mkroll_launch(…, BOULDER, 1)` for
  rolling boulder; `launch2` field on trap.
- **Verification:** seg1 prefix **5255→5381** (`shkinit`/`makemon`
  shopkeeper); seed0030 positional **19890**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313**/11405 RNG
  **142466**/792838.
- **Named omissions:** drawbridge-under pool/lava in `is_pool_or_lava`;
  full `linedup` couldsee for launchplace; `launch_obj` trigger;
  STATUE_TRAP living statue; pit shop/terrain morph; Sokoban finish.
- **Next:** seed0030 seg1 @5381 `shkinit`/`stock_room`/`mkshobj_at`; or
  seed0103 `next_ident`/`trquan`.

## D-0203 — stock_room / shkinit / mkshobj_at (seed0030 seg1 @5381)

- **Symptom:** seed0030 seg1 @5381 C `rnd(2)=2 @ next_ident` (shopkeeper
  `makemon`) vs JS `rn2(200)` mineralize.
- **Rejected:** vault/mineralize order alone — C already filled vault gold
  earlier; @5381 is `fill_special_room` shop → `stock_room`→`shkinit`.
- **Cause/evidence:** JS `fill_special_room` returned early for
  `rtype >= SHOPBASE` without calling `stock_room`, so mklev jumped to
  mineralize while C created `PM_SHOPKEEPER` (`MM_ESHK`), shopkeeper
  `m_initinv`, `mkmonmoney`, tribute novel spot, and `mkshobj_at` stock.
- **Change:** `js/shknam.js` — shtypes iprobs/shknms, `get_shop_item`,
  `shkinit`/`stock_room`/`mkshobj_at`/`nameshk`/`good_shopdoor`;
  `js/makemon.js` — `neweshk`/`MM_ESHK`, shopkeeper `m_initinv`,
  `rnd_misc_item`, export `mkmonmoney`; `js/mkobj.js` — `SPE_NOVEL`
  `noveltitle`; `js/mklev.js` — `fill_special_room`→`stock_room`;
  `js/allmain.js` — `context.tribute.enabled`.
- **Verification:** seg1 prefix **5381→6561** (`dosounds`); seed0030
  positional **21235**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **143811**/792838.
- **Named omissions:** `shkveg`/`mkveggy_at`; Izchak minetown light-shk;
  platform ifdef `shktools` names; Orcus `mongone`; wizard SHOPTYPE;
  `rnd_defensive_item` body; irregular-shop edge cases; full `rloc`.
- **Next:** seed0030 seg1 @6561 `dosounds`; or seed0103
  `next_ident`/`trquan`.

## D-0204 — dosounds has_shop / feature gates (seed0030 seg1 @6561)

- **Symptom:** seed0030 seg1 @6561 C `rn2(200)=59 @ dosounds(sounds.c:313)`
  (`has_shop`) vs JS `rn2(20)` `gethungry`.
- **Rejected:** vault/mineralize order; treating 6561 as a fleeck arity bug
  (6560 already matched vault `rn2(200)` @ sounds.c:238).
- **Cause/evidence:** After D-0203 set `has_shop`, C `dosounds` rolls
  beehive/morgue/barracks/zoo/shop/temple/oracle gates after vault. JS
  `dosounds` stopped after vault, so `gethungry`'s `rn2(20)` landed where
  C burned shop `rn2(200)`.
- **Change:** moved/expanded `dosounds` into `js/sounds.js` — full feature
  gate order; shop body `search_special(ANY_SHOP)`/`tended_shop`/`rn2(2)`/
  `noisy_shop`; mon_sound helpers RNG-only when match; `is_undead` in
  `monsters.js`; `allmain.js` imports `dosounds`.
- **Verification:** seg1 prefix **6561→6565** (`distfleeck`); seed0030
  positional **21192**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **143768**/792838.
- **Named omissions:** You_hear plines; `gd_sound` vault body; vampshifter
  morgue; temple_priest body; oracle `canseemon`; `Is_sanctum`; Hallu
  message index offsets; full `in_rooms` for `inhishop`.
- **Next:** seed0030 seg1 @6565 `distfleeck` C `rn2(5)` vs JS `rn2(10)`;
  or seed0103 `next_ident`/`trquan`.

## D-0205 — shk_move before getitems (seed0030 seg1 @6565)

- **Symptom:** seed0030 seg1 @6565 C `rn2(5)=4 @ distfleeck` vs JS
  `rn2(10)=4` at `m_move` getitems peaceful gate.
- **Rejected:** fleeck arity/actor-order alone; treating rn2(10) as
  `dog_goal` apport or `mhitm_mgc_atk_negated` (stack was monmove:815
  getitems); meating early-return (shopkeeper `meating==0`).
- **Cause/evidence:** After first fleeck, C `m_move` routes `isshk` through
  `shk_move` (peaceful near home → return 0, no RNG) then second fleeck.
  JS fell through to normal AI and burned peaceful `!rn2(10)` getitems.
  DIAG: mnum=271 PM_SHOPKEEPER @ (76,7), mpeaceful=1, isshk set by
  `shkinit`.
- **Change:** new `js/shk.js` — `shk_move` / `move_special` / `inhishop` /
  `online2` (hacklib); `m_move` dispatches isshk/isgd/ispriest before
  normal AI; `gd_move`/`pri_move` stubs return 0.
- **Verification:** seg1 prefix **6565→6568** (C `mcalcmove` vs JS next
  ant fleeck); seed0030 positional **21198**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313** RNG **143774**.
- **Named omissions:** `shk_fixes_damage`; holetime dig follow; following
  verbalize/`rile_shk`; `resist_conflict`/`m_canseeu`; Fast+sobj_at
  doorway; `m_break_boulder`/`m_move_aggress`; `after_shk_move` bill_p;
  `gd_move` body; `pri_move` altar `rn1` mill.
- **Next:** seed0030 seg1 @6568 C `mcalcmove` vs JS extra hostile fleeck
  (movement rations / which ants still have `movement>=NORMAL_SPEED`);
  or seed0103 `next_ident`/`trquan`.

## D-0206 — movemon_singlemon hider skip dochug (seed0030 seg1 @6568)

- **Symptom:** seed0030 seg1 @6568 C `rn2(12) @ mcalcmove` vs JS
  `rn2(5) @ distfleeck` — JS still in monster pass after C entered EOT.
- **Rejected:** leftover ant movement allotment / wrong mcalcmove assignment
  to shopkeeper (fmon order); DIAG showed shk mmove=16 correctly got +24
  from first rn2(12)=2, leftovers before EOT were 0.
- **Cause/evidence:** C `movemon_singlemon` deducts NORMAL_SPEED then, for
  `is_hider` with `M_AP_OBJECT`/`M_AP_FURNITURE` (or `mundetected`), returns
  without `dochugw`. Storeroom mimics appear as objects (mappearance 215).
  C: only shopkeeper dochugs — two passes × two fleecks = 4 fleecks then
  EOT. JS: dochug'd mimics too → extra fleecks while C already at
  mcalcmove.
- **Change:** `js/monsters.js` `M1_HIDE`/`is_hider`; `js/mon.js`
  `movemon_singlemon` hider gate after movement deduct.
- **Verification:** seg1 prefix **6568→7007** (`next_ident` vs JS
  `rn2(20)`); seed0030 positional **21693**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313** RNG **144269**.
- **Named omissions:** `restrap` body (`rn2(3)` re-hide); eel
  `hideunder`; `minliquid` before dochug; equipping `I_SPECIAL`;
  Conflict `fightm`; `m_everyturn_effect`.
- **Next:** seed0030 seg1 @7007 C `next_ident` vs JS `rn2(20)`; or
  seed0103 `next_ident`/`trquan`.


## D-0207 — stumble_onto_mimic / object_from_map next_ident (seed0030 seg1 @7007)

- **Symptom:** seed0030 seg1 @7007 C `rnd(2) @ next_ident` vs JS
  `rn2(20) @ gethungry` — after matched EOT wipe gate; step key `n`,
  topline "That chest is a small mimic!".
- **Rejected:** missing EOT spawn/`u_wipe_engr` after matched
  `rn2(76)`; umovement loop divergence alone (JS umov==12 correctly
  took hero input).
- **Cause/evidence:** C `do_attack`→`attack_checks` sees `M_AP_TYPE`
  and calls `stumble_onto_mimic`→`that_is_a_mimic`→`object_from_map`→
  `mksobj(otyp,FALSE,FALSE)`→`next_ident` **before** `overexertion`.
  JS skipped mimic stumble and burned accessorytime `rn2(20)`.
- **Change:** `js/mon.js` `seemimic`/`wakeup`; `js/uhitm.js`
  `that_is_a_mimic`/`stumble_onto_mimic`/`attack_checks_mimic` wired
  ahead of `overexertion` in `do_attack`.
- **Verification:** seg1 prefix **7007→7189** (`dosounds` vault
  `gd_sound` `rn2(2)`); seed0030 positional **21760**/105529 Scr
  **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313**
  RNG **144336**.
- **Named omissions:** Blind/hallu/`sensemon`/Protection_from_shape_changers
  / warning-glyph / invis-marker arms of `attack_checks`; furniture
  `defsyms` message; AD_STCK `set_ustuck`; `wake_msg`/`setmangry`;
  full `object_from_map` (buried/hallu/observe_object).
- **Next:** seed0030 seg1 @7189 vault `gd_sound`→`rn2(2)`; or
  seed0103 `next_ident`/`trquan`.

## D-0208 — dosounds vault gd_sound rn2(2) (seed0030 seg1 @7189)

- **Symptom:** seed0030 seg1 @7189 C `rn2(2) @ dosounds(sounds.c:245)`
  vs JS continuing without the vault message roll after matched
  `has_vault && !rn2(200)`.
- **Rejected:** missing shop/`gethungry` after vault gate; beehive
  order drift (vault branch `return`s in C).
- **Cause/evidence:** C vault gate calls `search_special(VAULT)` then
  `gd_sound()` (`!(vault_occupied(urooms)||findgd())`) and, when true,
  `switch (rn2(2)+hallu)` before return. JS early-returned on the gate
  without burning `rn2(2)`.
- **Change:** `js/sounds.js` — `vault_occupied`/`findgd`/`gd_sound` +
  vault body `search_special`+`gd_sound`→`rn2(2)+hallu` (You_hear /
  gold_in_vault plines deferred).
- **Verification:** seg1 **7189→7640/7640 FULL**; seg2 continuous
  **1272**/6221 (`somey`); seed0030 positional **24164**/105529 Scr
  **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313**
  RNG **146740**.
- **Named omissions:** You_hear vault plines; gold_in_vault scan;
  `urooms` maintenance for `vault_occupied`; `findgd` migrating_mons
  park-at-`<0,0>`; fountain/sink Hallu index still deferred.
- **Next:** seed0030 seg2 @1272 `somey`/`create_room`; or seed0103
  `next_ident`/`trquan`.

## D-0209 — make_grave get_rnd_text(EPITAPHFILE) (seed0030 seg2 @1272)

- **Symptom:** seed0030 seg2 @1272 C `rn2(24075) @ somey(mkroom.c:674)`
  vs JS `rn2(3)` — right after matched `mkgrave` `dobell=!rn2(10)` and
  `find_okay_roompos` somex/somey.
- **Rejected:** room-height / `create_room` / `somey` arity drift — C
  provenance is the `rn2` **function pointer** passed into
  `get_rnd_text`; chunk size of pad+xcrypt epitaph buffer is exactly
  24075. JS stub `make_grave` only set `typ=GRAVE` and skipped the
  epitaph draw, so the next burn was `mkgrave`'s gold `rn2(3)`.
- **Cause/evidence:** C `engrave.c` `make_grave`: when `str` is null
  (non-bell graves), `get_rnd_text(EPITAPHFILE,buf,rn2,MD_PAD_RUMORS)`
  then `make_engr_at(...,HEADSTONE)`. Named omission from D-0148.
- **Change:** `scripts/extract-epitaph.py` →
  `js/generated/epitaph_data.js` (`EPITAPH_BUF` len 24075); `js/engrave.js`
  `make_grave`; `js/mklev.js` import + `mkgrave_room` bury/
  `level_difficulty` parity.
- **Verification:** seg2 continuous **1272→2217** (`u_init_race`
  elf `rn2(6)`); seg1 still FULL; seed0030 positional
  **24701**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1315** RNG **147856**.
- **Named omissions:** full `set_levltyp` beyond typ=GRAVE;
  `disturb_grave`; You_hear vault plines still deferred (D-0208).
- **Next:** seed0030 seg2 @2217 Wizard-elf `u_init_race` Xtra_food
  `rn2(6)`; or seed0103 `next_ident`/`trquan`.
