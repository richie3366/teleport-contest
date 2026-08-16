# C→JS map — Startup and character creation

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Startup and character creation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/options.c` | `js/options.js` + `js/generated/optlist_data.js` | partial | **`option_help` / `next_opt` + contest optlist extract** (D-0091); **`get_configfile` default = contest-recorder absolute path** (CONSTITUTION §1.2 / D-0934; suite **44**/44 @#1200); **`PREV_MSGS` msg_window descr via `#if` comment strip** (D-0114); **boolean `DECgraphics` + `symset` parse** (D-0115); **default `paranoia_bits` PRAY|SWIM|TRAP** (D-0102); enough OPTIONS= parse for Tourist paths; **`doset_simple` / `doset_simple_menu` from `allopt[]` OptS_General…Status** + multipage fullscreen + `choose_classes_menu` ATR / stay-open toggles (D-0385; seed0012 Scr 187→199); **`doset_simple` Comp fruit `getlin`/`optfn_fruit`/`fruitadd` + PICK_ONE `>`/`<`/`^`/`|` pages** (D-0928 #1138; seed4500 Scr **954→966**; other Comp parseoptions / fruitadd bones/`rnd(127)`/`name_to_mon` candied deferred); **`select_menu_pick_any` MENU_SELECT_ALL/PAGE + UNSELECT/INVERT + page nav** (D-0928 #1144; `wintty.c` process_menu_window; count-prefix / MENU_SEARCH / menuitem_invert_test SKIPINVERT deferred); **`mO`/`menu_requested` → `doset()` PICK_ANY + contest bool/compound page order + `pickup_types` handler** (D-0488); **`doset` `%-Ns [val]` + NHOPTB On defaults + showexp/time `botl`** (D-0498); **`doset` per-bool `pline` like `optfn_boolean`** (D-0499; topline append/`more` before next opt so showexp botl paints during prior pair’s More); **`set_playmode` → plname `"wizard"` when `flags.debug`** (D-0511; `authorize_wizard_mode`/sysopt.wizards + explore authorize/`deferred_X` + restore-path call deferred); **`BIND=`/`BINDINGS=` → `txt2key`+`parsebindings` → `Cmd.binds` + rhack `inventory`** (D-0897; seed2600 **PASS**); omit full `Cmd.cmdbinds` defaults table / other bind targets; mouse/menu aliases; CMD_PARAM; omit full `parseoptions` after-change arms, `allopt_array_init` into bags, `reset_needed_visuals` subset; omit number_pad/autounlock/symset **handlers**, help descr lines, paranoid_confirmation parser; full `load_symset` IBM/UTF8; **SYMBOLS=** overrides |
| `src/role.c` `plnamesuffix` / `wintty.c` `tty_askname` | `js/askname.js`, `js/jsmain.js` | partial | **copyright splash + `Who are you?` when no name** (D-0102); UNIX name-char filter; **confirm `'a'` rename → `tty_askname`** (D-0471); **rename BASE cury from splash=11 / corner `docorner` maxrow** (D-0475; no `clearScreen`); omit SELECTSAVED / full `plnamesuffix` suffix facet parse |
| `src/role.c` `genl_player_setup` / `wintty.c` `tty_player_selection` | `js/player_selection.js`, `js/roles.js`, `js/jsmain.js` + `invent.js` `paint_corner_nhw_menu` | partial | **Shall I pick + role/race/gender/align menus + confirm + `rigid_role_checks`/`pick_align`** (D-0111); **`rigid_role_checks` only when `n>1` menu opens** ≡ C `plsel_startmenu` — `n<=1` auto-assign skips `pick_*` RNG (D-0677; seed0014 prefix 1→3113); **Shall-I-pick topline NO_COLOR** (D-0113); **corner chargen keeps BASE splash + erase_menu_or_text prior geom** (D-0348); **`maybe_skip_seps` counts compatible ok_* roles + excess==2 header blank** (D-0379); **`reset_role_filtering` PICK_ANY + Set/Reset `~`** (D-0471); **`dismiss_chargen_nhw_menu` docorner → `_base_cury`** (D-0475); **filter menu `tty_end_menu` page packing `(N of M)`** (D-0476; title+blank in `nitems`); roles/races `allow`/`selfmask`; already-specified rc facets skip; H2344 fullscreen role menu; omit SELECTSAVED / `plnamesuffix` rename facet parse |
| `src/role.c` | `js/roles.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** identity/attrs/`hpadv`/`enadv`/`neminum`; **`initrecord` matches C** (Caveman/Valkyrie/Priest/Tourist/Wizard **0**; others **10** — D-0056); **`xlev` on all roles + copied to `game.urole`** (D-0061); **all roles pantheon gods** + C roles[] order (Rogue before Ranger) for `randrole`; **`allow` race/gend/align masks** (D-0111); **`name.f = null` where C has 0** (only Caveman/Priestess keep `f` — D-0138); **races `lovemask`/`hatemask`/`selfmask`** (D-0172); `role_init` pantheon + SPE_LIGHT + nemesis gender; `Hello`/`align_*`; **all races `hpadv`/`enadv` + attrmin/attrmax + allow/selfmask** (D-0036/D-0111); **Wizard `ldrnum`/`guardnum`/`homebase`/`intermed`/`questarti`** (D-0792 → `leader_m_id`); other roles’ quest fields still sparse; full `role_init` beyond pantheon/SPE_LIGHT/nemgend deferred; rank/`title[].f` nulls where C has 0 still deferred |
| `src/u_init.c:u_init_role` | `js/u_init.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** cases (D-0052); Rogue `knows_class` still uses named P_DAGGER otyps; Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class` walks `bases[]` (Barb/Valk exclude polearms; Ranger: launchers/ammo/spears; Monk: armor only + SHURIKEN); Samurai `Japanese_item_name` pre-discovery; Healer `umoney0=rn1(1000,1001)` + `POT_FULL_HEALING` know; Valkyrie/Barbarian Lamp `!rn2(6)`; Monk `M_spell[rn2(90)/30]` + Magicmarker/`!rn2(4)` else Lamp; Archeologist Tinopener/`!rn2(10)` else Lamp/`!rn2(4)` else Magicmarker/`!rn2(5)` + SACK/TOUCHSTONE knows; Barbarian `rn2(100)>=50` kit pick; Caveman `Cave_man[]` only (club/sling/flint/rock/leather); `ini_inv_use_obj` **armor via `setworn` (oc_oprop Antimagic etc.)** (D-0898) + **`is_weptool`→uwep/uswapwep** (D-0631) + quivers FLINT/ROCK; graystone quan=1 except FLINT; weapon still manual `setuwep`/`setuqwep` (C uses those helpers); shield `!(uwep&&bimanual)`/`set_twoweap` omit; `Skill_W`/`Skill_P`/`Skill_K`/`Skill_S`/`Skill_H`/`Skill_V`/`Skill_Ran`/`Skill_Mon`/`Skill_A`/`Skill_B`/`Skill_C` for filter; `skill_init` / `initialspell` deferred |
| `src/u_init.c:u_init_race` | `js/u_init.js` | partial | Human no-op; orc `Xtra_food` + knows; elf instrument+knows (**eager `ROLL_FROM` before `ini_inv`/`trquan`** D-0210); dwarf knows; gnome no-op (D-0027); `ini_inv_obj_substitution`/`inv_subs` ported; **`ini_inv_mkobj_filter` reject list + `oc_level`/`Skill_*` incl. `Skill_C`** (D-0042…/52) |
| `src/u_init.c:u_init_misc` | `js/u_init.js` | partial | `newhp`/`newpw` at ulevel 0; **`u.umonnum`/`umonster` + basic `youmonst.data`** (D-0411; full FROMFORM `set_uasmon` deferred); **`adjabil(0,1)`** role/race L1 intrinsics (D-0058); rc align → `ualign`; handedness RNG; many u fields still absent |
| `src/attrib.c:newhp` / `src/exper.c:newpw` | `js/attrib.js`, `js/exper.js` | partial | **Init + level-up** (lornd/hirnd + Con; `enermod`/`rn1`) (D-0061); `pluslvl` HP/EN/level/`adjabil` + **`uexp=newuexp(ulevel)` before `++ulevel` when `!incr`** (D-0572; incr≥tmp clamp); **`experience`/`more_experienced`/`newuexp`/`newexplevel`** (D-0130); `uhpinc`/`ueninc` stored; omit eel AD_WRAP Amphibious XP / MAIL_DAEMON / `exp_percent_changing` / SCORE_ON_BOTL / achievements/Upolyd monhp |
| `src/attrib.c` (attrs) | `js/attrib.js` | partial | Initial attr paths; `change_luck` clamp; **`adjalign`/`ALIGNLIM`** (D-0251) + **`adj_erinys` + `reset_erinys`** (D-0928 #1099; restore-path re-apply deferred); **`adjabil`/`role_abil` + Fast/Very_fast** (D-0058); **`Searching()`** (D-0062); **gainstr You_feel on level-up** (D-0061); **`acurrstr` exported** (D-0059); **`acurr` GoP→`STR19(25)` + Dunce INT/WIS→6** (D-0797; nymph CHA / Ogresmasher CON deferred); **`adjattrib` async You_feel when msgflg≤0** (D-0116); **`adjattrib` in_moveloop STR/CON → `encumber_msg`** (D-0870; Fixed_abil/verbose "already" deferred); **`poisoned`/`poisontell`** (D-0869); **`exercise` Upolyd physical gate** (D-0449); omit `postadjabil`, `add_weapon_skill`; `u_init_carry_attr_boost` stubbed |
| `src/allmain.c:welcome` / `role.c:Hello` | `js/allmain.js` | partial | New-game welcome from Hello+align+**C `!name.f`+both-genders gate**+race+role (D-0138); `urole.allow` copied; `flush_topl_more` before tutorial; restore path deferred |
| `src/allmain.c:moveloop_preamble` | `js/allmain.js` + `js/calendar.js` | partial | Moon/friday plines + `change_luck`; pickup/encumber/engraving deferred |
| `src/o_init.c` | `js/o_init.js` | partial | Green-session shuffle/discovery evidence; `discover_object` encounter flag + `interesting_to_discover` via extracted `objectDescrs` (D-0040); **`setgemprobs` uses `ledger_no`/`maxledgerno`** (D-0893; was forced lev=0); not audited across all classes |
| `src/dungeon.c`, `dat/dungeon.lua` | `js/dungeon.js`, generated dungeon data | partial | Topology subset; **`#annotate`/`donamelevel`/`query_annotation` + lazy mapseen; `#overview` PICK_NONE** (D-0110); **`show_overview` dismiss → `dismiss_nhw_menu`** (corner docorner/gbuf only — not forced `docrt`; D-0928 #1172); **`interest_mapseen` furthest/`OF_INTEREST`/annotations** (D-0928 #1145); **`msrooms` shop/temple + leave `recalc_mapseen` + `recbranch_mapseen` + `shop_string`/branch lines/wizard `[proto]`; `show_map_spot`→`room_discovered`; find_mapseen no longer wipes `lastseentyp`** (D-0928 #1157) + **`goto_level` savelev/getlev persist `lastseentyp`** (D-0928 #1160; prevents cross-level feat pollution on overview); altar-god / builds_up / endgame-first deferred; **`print_level_annotation` from `goto_level`** (D-0928 #1097; remember custom name `--More--`); **`update_lastseentyp`/`recalc_mapseen` feat counts + overview OF_INTEREST line (TAB vs PREFIX)** (D-0123); **dungeon `flags.align = dgn_align & 7`** matches C 3-bit bitfield truncation of `D_ALIGN_*` (D-0171); **`print_dungeon(TRUE)` wizard ^V `?` PICK_ONE** (D-0518; headings/specials/branches/continuous selectors/unreachable Knox letter) + **tty_end_menu prompt blank row** (D-0563) + **`bot()` after menu dismiss** (D-0568); **`print_dungeon(FALSE)` `#wizwhere` NHW_MENU putstr → `show_nhw_menu_text`** (D-0928 #1115/#1183 — not NHW_TEXT; dmore offset 2 → ` --More--`); Invocation/portal debug lines deferred; not a replacement for executing upstream Lua; omit Blind bigroom/oracle/valley/sanctum auto-flags/DRAWBRIDGE+mimic lastseentyp |
| tutorial / quest pager | `js/allmain.js`, `js/questpgr.js`, `js/invent.js`, `js/do.js`, `js/mklev.js` | partial | Legacy `%d`/`%G` + corner NHW_MENU without `clearScreen` (D-0026); **`maxcol=strlen+1` + leading pad / text at offx+1** (D-0071); **H2344_BROKEN offx** (D-0078); tutorial corner (D-0023); invent corner (D-0024); **`ask_do_tutorial` invalid stay-open** (D-0215); **`schedule_goto`/`deferred_goto` + `maybe_do_tutorial` yes-path + `Is_special`→`makemaz("tut-1")` skeleton + `goto_level` `pickup(1)`** (D-0349; Scr 13→14 Entering `--More--`); **tut-1 CENTER + invent stash** (D-0350); **`tutorial_enter_gamestate` `setnotworn` clears oc_oprop extrinsics** (D-1015); **`setnotworn` worn[] pointer-walk + `nhl_gamestate(true)` invent restore / re-wear** (D-1020; apply.js cream/breakwand share export); **`nhl_gamestate` memcpy u/disco/mvitals/spl_book + memset spells + uz keep + oc_uname clear + `init_uhunger` ATEMP** (D-1035; memcpy skips gi worn pointers); **door-area des.*** (D-0351); **`mktrap` victim `rnd(4)` + `induced_align` Is_special + des.* through sling** (D-0352; Scr 27→38); **tut-1 kelp via `mineralize` `water_has_kelp`** (D-1059; `!Is_waterlevel` + `In_endgame` skip before kelp); omit large-box contents / food / stairs / `place_lregion` / tut_key/eckey / leftover `obfree` contents / nhcore callback disable / `update_inventory` |
| `src/insight.c` enlightenment | `js/invent.js`, `js/attrib.js`, `js/artifact.js`, `js/mkobj.js` | partial | Autopickup from flags + race attr limits + `weapon_descr`/`skill_name` via `oc_skill` (D-0041); pantheon/wallet/handedness (D-0024); **omit gender when `!!urole.name.f`** (D-0097/D-0138); **gender only when `!name.f` + both-genders/initgend gate** (D-0164); **dungeon line `dungeons[].dname` + `depth(u.uz)`** (D-0164); Attributes `magic_negation` warded (D-0097); **`an(rank)` + basics HP/Pw phrasing + real `uexp`** (D-0130); **female `urole.name.f`/`rank.f` titles** (D-0137); **new/full moon + friday13 before XP + continuous 23-row `(k of n)` paging** (D-0158); **`weapon_insight` `empty_handed` + real `P_SKILL`/`martial` skill line** (D-0194); **`weapon_insight` twoweap skill-limit compare** (D-0347; COLNO `.` clip); **`status_enlightenment` Deaf + `hu_stat` hunger + `near_capacity`/`enc_stat` movement** (D-0470); **wizard ^X `MAGICENLIGHTENMENT` + status `<%d>` + `from_what`/`is_innate` poison/stealth/fast + Air `weight_cap` MAX** (D-0573; seed0373 **PASS**); **`doattributes` Status armor nudity + Attributes `Teleport_control` + `from_what`→`what_gives` worn extrinsic** (D-0587; seed0116 **PASS**); **`doattributes` Halluc_resistance/Searching/Reflecting/Lifesaved + odd `skill_name` saber + `set_artifact_intrinsic` SPFX_HALRES + `bare_artifactname` what_gives** (D-0633; seed0361 **PASS**); **`weapon_descr` P_NONE→oclass name; Fire/Shock/`item_resistance` AD_ELEC; Blind_telepat/Warning; `from_what(FAST)` worn equipment** (D-0676; seed0367 **PASS**); **`Displaced` Appearance + known speed-boots `ysimple_name(uarmf)` + `pair of` strip** (D-0821; seed0360 **PASS**); **`!strcmpi(rank,role)` → noun + omit role; Punished/`ansimpleoname(uball)` + Wounded_legs `you_have`; Jumping + umortality `N_times`; `weight` FOOD/CORPSE `oeaten`→`eaten_stat`** (D-0928 #1194; seed4500 **PASS** Scr **1814**; suite **43**/44 Scr **11404**/11405 @#1195; Cold/Sleep/Disint/Acid/Drain/Sick/Stone resists + other item_resistance + See_invisible/Warn_of_mon/Clairvoyant/Infravision + Teleportation/Aggravate/Conflict + Blind/Stun Status / poly/ride/trap / HEAVY_IRON_BALL `owt!=0` weight short-circuit deferred); shop `costly_spot` disable / `apelist` / enhance / `can_advance` suffix / full Protection MC bumps / night()/midnight / Is_bigroom dungeon phrasing deferred |
| `src/botl.c` status | `js/display.js`, `js/attrib.js` | partial | **`get_strength_str` 18/xx** (D-0078); botl `showexp`/`time` + plname capitalize; **`Ride` when `u.usteed`** (D-0214); **`timebot` + `disp.time_botl` on `moves++`** (D-0928 #1179; tty path→`bot()`); full blstats/other conditions / VIA_WINDOWPORT `stat_update_time` deferred |
| `src/calendar.c` / botl flags | `js/calendar.js`, `js/display.js` | partial | Fixed-datetime moon/friday; botl `showexp`/`time` + plname capitalize |

**Shared blocker:** **0/44 sessions** throw `u_init_role: role not ported`
(all public roles ported through D-0052 Caveman; Wizard/Priest/Knight/
Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/Caveman
D-0042…/52). Rogue invent + mineralize bury +
corpse-age POISON + `mktrap_victim` place + `dog_move` cursed-square +
dart-trap `mintrap` + cursemsg/`--More--` + `dog_invent` pickup + tseen
trap skip + `OPENDOOR` `nohands`/`verysmall` + `doapply`/`pick_lock`
(D-0012–D-0021) + `newsym` objects/SDOOR (D-0022) + tutorial NHW_MENU
(D-0023) + invent/doname/disco (D-0024) + getobj throw/apply
`$`/`continue`/`--More--` (D-0025) + legacy corner map + look `:`
staircase (D-0026) verified.
seed1500 **PASS** RNG/Scr **2768/2768**, **40/40**. seed1800 **PASS**
**2458/2458**, **26/26**. Orc race kit (D-0027) + `splitobj` (D-0028) +
`relobj` (D-0029) + `dog_goal` real `couldsee` (D-0030) + empty-space
`#kick` (D-0031) + `m_avoid_kicked_loc` (D-0032) + `.`/`donull` (D-0033) +
`makemon(NULL,0,0)` / `makemon_rnd_goodpos` / `m_initgrp` (D-0034) + wall
`kick_ouch` `losehp` + once-per-turn `regen_hp` (D-0035) clear RNG
**3626/3626**. Orc race `hpadv` + `mon_glyph` `mcolors` (D-0036) →
screens **5/41** (idx 0–4). Gold `doname` + `mondied`/`newsym` (D-0037)
→ screens **6/41** (idx 0–5). cansee invent pline + `set_wall_state`/
`wall_angle` + downstairs `>` NO_COLOR (D-0038) → screens **37/41**.
Orc infravision `newsym` + `postmov` newsym (D-0039) → screens
**38/41**. Disco `OBJ_DESCR`/`obj_typename` (D-0040) → screens
**39/41**. ^X enlightenment autopickup/limits/`weapon_descr` (D-0041)
→ screens **41/41** — seed0060 **PASS**. Wizard init + filter + Dark
One gender (D-0042) → role throws **20**/44; seed2200 Scr **1**/230,
rng-diff prefix **1283** (`choose_trapnote`). Priest init + pantheon
`randrole` + shield wear (D-0043) → role throws **17**/44; seed0501
prefix **1153** (`wipeout_text`); seed0106 **2566** (`dog_move`).
Knight init + knows_class + helm/gloves + HJumping (D-0044) → role
throws **13**/44; seed0103 prefix **1185** (`mkclass_aligned`);
seed0104 RNG **2401**/3223. Samurai init + Japanese discovery +
`is_ammo` quiver (D-0045) → role throws **10**/44; seed0700 prefix
**1718** (`mkclass_aligned`); seed0017/0107 reach `u_calc_moveamt`.
Healer init + gold `rn1` + Lamp + `POT_FULL_HEALING` (D-0046) →
role throws **8**/44; seed0016 prefix **1341** (`hole_destination`);
seed0030 prefix **5127** (`choose_trapnote`). Valkyrie init + Lamp +
weapon/armor `knows_class` (D-0047) → role throws **6**/44; seed0015
prefix **337** (`lspo_map`); seed0105 prefix **974** (`wipeout_text`).
Ranger init + launcher/ammo/spear `knows_class` (D-0048) → role throws
**4**/44; seed0101 prefix **2293** (`next_ident`); seed0102 prefix
**1281** (`rndmonst_adj`). Monk init + spellbook RNG + armor
`knows_class` (D-0049) → role throws **3**/44; seed0200 prefix **377**
(`lspo_map`). Archeologist init + tin opener/lamp/marker chain +
SACK/TOUCHSTONE knows (D-0050) → role throws **2**/44; seed0361 prefix
**1280** (`hole_destination`, same as seed0016). Barbarian init +
`rn2(100)>=50` kit + Lamp + weapon/armor `knows_class` (D-0051) →
role throws **1**/44; seed0373 prefix **1327** (`choose_trapnote`,
same as seed2200/0030). Caveman init + `Cave_man[]` + FLINT/ROCK
quiver + graystone quan (D-0052) → role throws **0**/44; seed1150
rng-diff prefix **1118** (then D-0055). `mkclass`/`mkclass_aligned`
+ Wizard `A_NONE` extractor (D-0053) → seed0700 prefix **1888**
(`rndmonst_adj`); seed0103 **2337** (`next_ident`/`trquan`).
`maketrap` `choose_trapnote`/`hole_destination` (D-0054) +
`SPBOOK_no_NOVEL` `rnd_class` (D-0055) → screens **290**/11405, RNG
**85043**/792838; seed2200 prefix **2724**; seed1150 **2301**;
seed0030 **6305**. roles `initrecord` (D-0056) → seed1150 prefix
**2915** (`dog_move`); RNG **85042**/792838. CORPSE
`undead_to_corpse`/`G_NOCORPSE` retry + mvitals init (D-0057) →
seed0700 prefix **2733** (`u_calc_moveamt`); seed0361 **2924**
(`newhp`); RNG **85090**/792838. `adjabil` L1 + `u_calc_moveamt`
Fast/Very_fast (D-0058) → seed0700 prefix **3141** (`rnl`/
`doopen_indir`); screens **291**/11405; RNG **85494**/792838.
`rnl` + autoopen `doopen_indir` (D-0059) → seed0700 prefix **3207**
(`m_move`); positional **3229**/3230; screens **295**/11405; RNG
**85803**/792838. `mfndpos` BOULDER/`ALLOW_ROCK` + `NODIAG` (D-0060)
→ seed0700 RNG **3230**/3230 Scr **2**/51; seed0017 prefix **2775**;
screens **295**/11405; RNG **86026**/792838. `newhp`/`newpw` level-up
+ `pluslvl` + `#levelchange` (D-0061) → seed0361 prefix **2975**
(`dosearch0`); seed0373 **2549** (`getbones`); screens **295**/11405;
RNG **86020**/792838. `dosearch0` + Searching EOT (D-0062) →
seed0361 prefix **2979** (then `T` takeoff); screens **295**/11405;
RNG **86037**/792838. `T`/`dotakeoff` (D-0063) → seed0361 prefix
**3011** (`^W` wish `next_ident`); screens **295**/11405; RNG
**86053**/792838. `^W`/`makewish`/`readobjnam` (D-0064) → seed0361
prefix **3035** (`w` wield); screens **295**/11405; RNG
**85938**/792838. `w`/`dowield` (D-0065) → seed0361 prefix **3073**
(`W` wear); screens **295**/11405; RNG **85896**/792838.
`W`/`dowear`/`oc_delay`/`nomul` (D-0066) → seed0361 prefix **3259**
(`P` puton); screens **295**/11405; RNG **85752**/792838.
`P`/`doputon`/`Amulet_on` (D-0067) → seed0361 prefix **3292**
(`getbones`); screens **295**/11405; RNG **85792**/792838.
EGG `can_be_hatched`/`dead_species`/`little_to_big` (D-0068) →
seed0102 prefix **4451** (`dog_goal`); positional **4459**/4485;
screens **296**/11405; RNG **90837**/792838. fireassist `f`
(D-0069) → seed0102 RNG **4485**/4485 Scr **0**/25. MONSYM/
furniture/`xprname` `dot` (D-0070) → seed0102 Scr **17**/25;
screens **311**/11405; RNG **90863**/792838. `help_dir`/Book offx
(D-0071) → seed0102 **PASS**; public **6/44**; screens
**320**/11405; RNG **90863**/792838. `lookaround` corridor-turn
(D-0072) → seed0017 prefix **2775→3132** positional **3169**/3465;
screens **320**/11405; RNG **91263**/792838. `dodrink`/`peffect_oil`
(D-0073) → seed2200 prefix **2724→2733** positional **2790**/3018;
screens **320**/11405; RNG **91220**/792838. `z`/`dozap` NODIR
`findit` (D-0074) → seed2200 prefix **2733→2772** positional
**2794**/3018; screens **320**/11405; RNG **91222**/792838.
`r`/`doread` SCR_MAGIC_MAPPING/`do_mapping` (D-0075) → seed2200
prefix **2772→2925** positional **2940**/3018; screens
**320**/11405; RNG **91390**/792838. `E`/`doengrave` fingertip
Elbereth (D-0076) → seed2200 prefix **2925→2979** positional
**2993**/3018; screens **318**/11405; RNG **91443**/792838.
`/`/`dowhatis` + `?`/`dohelp`/`get_lua_version` (D-0077) →
seed2200 RNG **3018**/3018 Scr **1**/230; screens **318**/11405;
RNG **91280**/792838. H2344 NHW_MENU `offx` + `get_strength_str`
(D-0078) → seed0700 Scr **2→44**/51; screens **361**/11405;
RNG **91280**/792838. Samurai `Hachi` + Japanese invent/disco
(D-0079) → seed0700 **PASS**; public **7/44**; screens
**370**/11405; RNG **91380**/792838. STATUE `obj_glyph`
mons[corpsenm].mlet + white (D-0080) → seed2200 Scr **1→11**/230;
screens **380**/11405; RNG **91380**/792838.
`magic_map_background` dark_room floors (D-0081) → seed2200 Scr
**11→89**/230; screens **458**/11405; RNG **91380**/792838.
getpos tip `nhl_text` NHW_MENU corner (D-0082) → seed2200 Scr
**89→90**/230; screens **459**/11405; RNG **91380**/792838.
farlook `lookat` stairs + getpos curs-after-flush (D-0083) →
seed2200 Scr **90→109**/230; screens **478**/11405; RNG
**91380**/792838. getpos `HJKLYUBN`/`C(dir)` rush +
`truncate_to_map` (D-0084) → seed2200 Scr **109→113**/230;
screens **482**/11405; RNG **91380**/792838.
checkfile NHW_MENU `process_text_window` (D-0085) + doname
SCR/SPE/RIN/WAN + bimanual/`oc_big` (D-0086) → seed2200 Scr
**113→117**/230; screens **486**/11405; RNG **91380**/792838.
look_all/look_engrs NHW_TEXT (D-0087) → seed2200 Scr
**117→167**/230; screens **536**/11405; RNG **91379**/792838.
doextversion + NHW_TEXT quitchars + dowhatdoes (D-0088–90) →
seed2200 Scr **167→176**/230; screens **545**/11405; RNG
**91371**/792838.
`option_help` (D-0091) → seed2200 Scr **176→199**/230; screens
**568**/11405; RNG **91371**/792838 (screen 158 RC path residual).
**`in_mk_themerooms`** (D-0092) → green/cohort held; seed0017 still
**3132** (room x vs C east-door 35).
**getdir `flush_topl_more` + `throw_obj` multishot** (D-0093) →
seed1150 prefix **3032→3042** positional **3070**/3137 Scr **22**/51;
screens **568**/11405; RNG **91398**/792838.
**`stackobj` after throw/drop** (D-0094) → seed1150 RNG
**3137**/3137 Scr **22**/51; screens **568**/11405; RNG
**91465**/792838.
**`spoteffects`/`check_here`/`look_here` + Monnam MGIVENNAME**
(D-0095) → seed1150 Scr **22→27**/51; screens **568→574**/11405;
RNG **91465→91471**/792838.
**`newsym` waslit + out-of-sight `S_litcorr`→`S_corr`** (D-0096)
→ seed1150 Scr **27→46**/51; screens **574→593**/11405; RNG
**91471**/792838 (unchanged).
**GemStone `xname` + throw volley + ^X gender/MC** (D-0097) →
seed1150 **PASS**; public **8/44**; screens **593→598**/11405;
RNG **91471**/792838.
**dog_move mtrack `goto nxti`** (D-0098) → green cohort PASS; full
**8/44** Scr **598** RNG **91410**/792838; seed0017 still **3132**.
**post-fill `wallification`** (D-0100) → C parity; green/cohort held;
seed0017 still **3132** (not the (30,4) writer; themerms all default).
**dog_goal `gettrack`** (D-0099) → C recorder falsified (30,4) terrain;
`!couldsee`→gettrack `gg`; seed0017 prefix **3132→3327**; full
**8/44** Scr **598** RNG **91540**/792838.
**`#pray`/`prayer_done`/`angrygods` 0–3** (D-0101) → seed0017 RNG
**3465**/3465 Scr **2**/67; seed0106 **→2639**; full **8/44** Scr
**599** RNG **91965**/792838.
**askname + ParanoidPray yn** (D-0102) → seed0017 **PASS**; public
**9/44**; Scr **718**/11405; RNG **91965**/792838.
**`#chat`/`dochat`/`domonnoise` MS_BARK** (D-0103) → seed0106
prefix **2639→2713** (`kick_door`); full **9/44** Scr **718**
RNG **91887**/792838.
**`kick_door` CLOSED/LOCKED bust** (D-0104) → seed0106 prefix
**2713→2912** (`monmulti`); positional **3159**/4194; full
**9/44** Scr **718** RNG **92262**/792838.
**`thrwmu`/`monmulti` move-then-shoot** (D-0105) → seed0106 prefix
**2912→2962** (`mattacku` melee); positional **3217**/4194; full
**9/44** Scr **718** RNG **92304**/792838.
**`mattacku` melee / `hitmu`** (D-0106) → seed0106 prefix
**2962→2982** (`hitum`); positional **3188**/4194; full **9/44**
Scr **718** RNG **92375**/792838.
**`hitum` / hero melee / `xkilled`** (D-0107) → seed0106 prefix
**2982→2993** (post-kill `dog_goal`); positional **3201**/4194;
full **9/44** Scr **718** RNG **92300**/792838.
**`mondead`/`relobj` death minvent** (D-0108) → seed0106 prefix
**2993→4097** (`dipfountain`); positional **4114**/4194;
full **9/44** Scr **718** RNG **93214**/792838.
**`#sit`/`#dip`/`dipfountain`** (D-0109) → seed0106 prefix
**4097→4141** (`#version` nhlib shuffle); positional **4145**/4194;
full **9/44** Scr **718** RNG **93267**/792838.
**`#offer`/`#enhance`/`#annotate`/`#overview`/`#version`** (D-0110)
→ seed0106 RNG **4194**/4194 Scr **5**/267; full **9/44** Scr
**722** RNG **93316**/792838.
**`player_selection`/`genl_player_setup`** (D-0111) → seed0077
prefix **100→1475** Scr **6→11**/33; full **9/44** Scr **746**
RNG **101108**/792838.
**`do_vault`/`create_vault` fallback** (D-0112) → seed0077 RNG
**3242**/3242 Scr **19**/33; full **9/44** Scr **759** RNG
**104563**/792838.
**door `recalc_block_point` + `pick_lock` D_ISOPEN + DEC open-door**
(D-0113) → seed0077 **PASS**; full **10/44** Scr **788** RNG
**104575**/792838.
**`option_help` msg_window PREV_MSGS extract** (D-0114) → seed2200
Scr **199→200**/230.
**Primary ASCII / `symset:DECgraphics`** (D-0115) → seed0106 Scr
**5→32**/267; seed0107 Scr **1→35**; full **10/44** Scr **851**
RNG **104575**/792838.
**angrygods `verbalize` + `adjattrib` You_feel** (D-0116) →
seed0106 Scr **32→34**/267; full **10/44** Scr **853** RNG
**104575**/792838.
**`ext_cmd_getlin_hook` full AUTOCOMPLETE uniqueness** (D-0117); **`yn_function` leave prompt after answer** (D-0121) →
seed0106 Scr **34→38**/267; full **10/44** Scr **857** RNG
**104575**/792838.
**`obj_is_generic` + tty gray/black→NO_COLOR** (D-0118) →
seed0106 Scr **38→46**/267; seed0030 Scr **46→97**; full **10/44**
Scr **916** RNG **104575**/792838.
**mthrowu `canseemon`/`thitu` + melee skip hit-on-kill** (D-0119) →
seed0106 Scr **46→49**/267; full **10/44** Scr **919** RNG
**104575**/792838.
**`newsym` `_map_location` under visible monster** (D-0120) →
seed0106 Scr **49→250**/267; full **10/44** Scr **1120** RNG
**104575**/792838.
**`yn_function` leave prompt + cleric `doname` skip uncursed** (D-0121) →
seed0106 Scr **250→253**/267; full **10/44** Scr **1123** RNG
**104575**/792838.
**`skill_init` + `#enhance` `add_skills_to_menu` paged PICK_NONE** (D-0122) →
seed0106 Scr **253→254**/267; seed0107 Scr **35→36**; full **10/44**
Scr **1125** RNG **104575**/792838.
**`update_lastseentyp`/`recalc_mapseen` + overview feature line** (D-0123) →
seed0106 Scr **254→255**/267; full **10/44** Scr **1126** RNG
**104575**/792838.
**`#chronicle`/`do_gamelog`/`show_gamelog` + livelog wire** (D-0124) →
seed0106 Scr **255→257**/267; full **10/44** Scr **1128** RNG
**104575**/792838.
**`#conduct`/`doconduct`/`show_conduct` + `initedog` pets++** (D-0125) →
seed0106 Scr **257→259**/267; full **10/44** Scr **1130** RNG
**104575**/792838.
**`#vanquished`/`list_vanquished` + `mvitals.died` + empty `#genocided`**
(D-0126) → seed0106 Scr **259→262**/267; full **10/44** Scr **1133**
RNG **104575**/792838.
**`#adjust`/`doorganize` getobj + destination cancel** (D-0127) →
seed0106 Scr **262→264**/267; full **10/44** Scr **1135** RNG
**104575**/792838.
**`#terrain`/`doterrain` View which? + Esc cancel** (D-0128) →
seed0106 Scr **264→265**/267; full **10/44** Scr **1136** RNG
**104575**/792838.
**`initialspell`/`dovspell`/`age_spells`** (D-0129) → seed0106 Scr
**265→266**/267; full **10/44** Scr **1139** RNG **104575**/792838.
**kill XP + doattributes `an`/Pw** (D-0130) → seed0106 **PASS**;
full **11/44** Scr **1141** RNG **104575**/792838; seed2200 Scr
**202**/230.
**`dokeylist`/`show_menu_controls`/`docontact` + usagehlp blank**
(D-0131) → seed2200 Scr **202→227**/230; full **11/44** Scr
**1166** RNG **104575**/792838.
**Wizard `skill_based_spellbook_id` + `read_engr_at`** (D-0132/33) →
seed2200 Scr **227→229**/230; full **11/44** Scr **1169** RNG
**104575**/792838.
**`makeniche` trap engraving + `wipe_engr_at`/`wipeout_text`** (D-0134) →
seed0501 prefix **1153→2205**; seed0105 RNG **full**; full **11/44**
Scr **1176** RNG **107102**/792838.
**`Z`/`docast`/`spelleffects_check` + SPE_HEALING self-zap** (D-0135) →
seed0501 prefix **2205→2217** (`dog_move`); Scr **6→10**/28; full
**11/44** Scr **1180** RNG **107116**/792838.
**`r`/`study_book` known-refresh + ^X female role/rank** (D-0136/37) →
seed0501 **PASS**; full **12/44** Scr **1198** RNG **107134**/792838.
**roles `name.f=null` + welcome gender gate** (D-0138) → seed0105
welcome text matches; Scr still **0**/30 (bright-blue ASCII `` ` ``);
full **12/44** Scr **1198** RNG **107134**/792838.
**`newsym` `S_engroom`/`S_engrcorr`** (D-0139) → seed0105 Scr
**0→22**/30; full **12/44** Scr **1231** RNG **107134**/792838.
**`#chat` wall + apply/eat getobj** (D-0140/41/42) → seed0105 **PASS**;
full **13/44** Scr **1239** RNG **106907**/792838.
**`lspo_map` + filler_region map themerms** (D-0143) → seed0015
prefix **337→357**; seed0200 **377→1447**; full **13/44** Scr **1240**
RNG **111362**/792838.
**Ghost `themeroom_fill`/`selection_rndcoord`** (D-0144) → seed0015
prefix **357→1284**; positional **1472**/8563; full **13/44** Scr
**1239** RNG **112442**/792838.
**`finddpos_shift` irregular walk** (D-0145) → seed0015 prefix
**1284→2513**; positional **2597**/8563; seed0200 **1447→1672**;
full **13/44** Scr **1239** RNG **115097**/792838.
**`mksobj_init` OIL_LAMP / TOOL lamps** (D-0146) → seed0015 prefix
**2513→2918**; positional **2925**/8563 Scr **20**/44; full **13/44**
Scr **1259** RNG **115572**/792838.
**`occupied` `t_at` + irregular `somexy`** (D-0147) → seed0200 prefix
**1672→1768**; positional **3231**/3822 Scr **9**/40; full **13/44**
Scr **1268** RNG **118314**/792838.
**`random_engraving`/`get_rnd_text(ENGRAVEFILE)`** (D-0148) → seed0200
prefix **1768→3382**; positional **3385**/3822 Scr **14**/40; full
**13/44** Scr **1275** RNG **121154**/792838.
**`>`/`dodown`/`goto_level`/`getbones`/`keepdogs`** (D-0149) →
seed0015 prefix **2918→8499**; positional **8500**/8563 Scr **20**/44;
full **13/44** Scr **1275** RNG **126755**/792838.
**monster `trapeffect_pit`/`make_corpse`** (D-0150) → seed0015 prefix
**8499→8518**; positional **8524**/8563 Scr **21**/44; full **13/44**
Scr **1276** RNG **126779**/792838.
**hostile `postmov`/`mon_learns_traps`/`mfndpos` known-trap skip**
(D-0151) → seed0015 RNG **8563**/8563 Scr **21**/44; full **13/44**
Scr **1276** RNG **126818**/792838.
**`Q`/`doquiver_core` uswapwep ready + hand-throw** (D-0152) →
seed0101 prefix **2293→2302**; Scr **4→10**/27; full **13/44** Scr
**1282** RNG **126936**/792838.
**`_`/`dotravel` cancel + tip PICK_NONE** (D-0153) →
seed0101 prefix **2302→2309**; Scr **10→21**/27; full **13/44** Scr
**1293** RNG **126947**/792838.
**`set_apparxy` Displacement/`Invis`** (D-0154) →
seed0101 RNG **2371**/2371 Scr **21**/27; full **13/44** Scr
**1293** RNG **127004**/792838.
**STETHOSCOPE + eat `touchfood`/`splitobj`** (D-0155) →
seed0016 prefix **2493→2551**; Scr **6→15**/36; full **13/44** Scr
**1302** RNG **127080**/792838.
**WAN_SLEEP `zapyourself`/`fall_asleep` + Unaware `gethungry`** (D-0156) →
seed0016 RNG **3656**/3656 Scr **15→31**/36; full **13/44** Scr
**1318** RNG **128139**/792838.
**`apply_ok` SUGGEST wand/spbook** (D-0157) → seed0016 Scr **31→32**/36;
full **13/44** Scr **1318** RNG **128139**.
**armor `pair of`/`set of` + ^X new moon paging** (D-0158) →
seed0016 **PASS**; full **14/44** Scr **1323** RNG **128139**.
**`postmov` door open/unlock/smash** (D-0159) →
seed0015 Scr **21→22**/44; full **14/44** Scr **1324** RNG **128111**.
**`flush_screen(-1)`/`docrt`→`cls` descend `--More--`** (D-0160) →
seed0015 Scr **22→23**/44; full **14/44** Scr **1326** RNG **128111**.
**`clear_level_structures` `_objects_at`/`head_engr`** (D-0161) →
seed0015 Scr **23→24**/44; full **14/44** Scr **1327** RNG **128105**.
**ordinary vs known-branch stair colors** (D-0162) →
seed0015 Scr **24→42**/44; full **14/44** Scr **1345** RNG **128105**.
**monster `trapeffect_sqky_board` + `just_an` letter-space** (D-0163) +
**^X gender gate + dungeon `depth`** (D-0164) →
seed0015 **PASS**; full **15/44** Scr **1347** RNG **128105**.
**`maybe_smudge_engr`/`can_reach_floor` after walk** (D-0165) →
seed0030 prefix **6732→6889**; full **15/44** Scr **1348** RNG
**128294**.
**Teleportation hub fill + `make_a_trap`** (D-0166) →
seed0030 prefix **6889→10584** positional **10867**/105529; full
**15/44** Scr **1348** RNG **131946**.
**mhitm `mondied`→`make_corpse` ordinary** (D-0167) →
seed0030 prefix **10584→10608** positional **10939**/105529; full
**15/44** Scr **1347** RNG **131959**.
**`dog_eat` after edible `newdogpos`** (D-0168) →
seed0030 prefix **10608→10620** positional **11005**/105529 Scr
**120**/1953; full **15/44** Scr **1357** RNG **132086**.
**`m_move` meating before `dog_move`** (D-0169) →
seed0030 prefix **10620→10803** positional **11133**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **132144**.
**unarmed `hmon_hitmon_stagger` `rnd(100)`** (D-0170) →
seed0030 prefix **10803→10861** positional **11206**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **132236**.
**Mines `fill_lvl`/`makemaz(minefill)` + dungeon align `&7`** (D-0171) →
seed0030 prefix **10861→12757** positional **13100**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **134130**.
**race `hatemask`/`M2_*` + S_GNOME `m_initinv`** (D-0172) →
seed0030 prefix **12757→12907** positional **13718**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135175**.
**NAMS `pmnames` / `name_to_monplus` gender** (D-0173) →
seed0030 prefix **12907→12968** positional **13313**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **134770**.
**`likes_gold`/`mkmonmoney` `m_initinv`** (D-0174) →
seed0030 prefix **12968→13007** positional **13339**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **134796**.
**minefill `create_monster` amask-before-mkclass** (D-0175) +
**`create_trap` retry/victim** (D-0176) →
seed0030 prefix **13007→13226** positional **14148**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135605**.
**minefill `fixup_special`/`place_lregion` + Mines mineralize** (D-0177) →
seed0030 prefix **13226→13906** positional **14344**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135801**.
**`tunnels`/`ALLOW_DIG`/`mdig_tunnel`** (D-0178) →
seed0030 prefix **13906→13921** positional **14256**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135713**.
**`get_mattk` extracted mattk / AT_WEAP=254** (D-0179) +
**`m_digweapon_check` + pick/axe wield** (D-0180) →
seed0030 prefix **13921→13987** positional **14343**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135799**.
**monster `trapeffect_rocktrap`** (D-0181) → effect + hostile
`should_see`/`gettrack` + `goto_level` `initrack`; dwarf @13987
gettrack redirect falsified (no adjacent track).
**`m_search_items` loot gg** (D-0182) → seed0030 prefix
**13987→14026** positional **14351**/105529 Scr **168**/1953; full
**15/44** Scr **1405** RNG **135801**.
**underfoot `m_search_items` + peaceful `can_carry`** (D-0183) →
seed0030 prefix **14026→14056** positional **14375**/105529 Scr
**168**/1953; full **15/44** Scr **1405** RNG **135825**.
**`dog_goal` wantdoor/`do_clear_area`** (D-0211) → seed0030 seg2
**2408→2930** (`eatcorpse`); positional **25256**/105529 Scr
**48**/1953; full **19/44** Scr **1433** RNG **149674**.
**`floorfood` + `poison_strdmg`** (D-0221) → seed0030 seg2
**2930→3207** (`obj_resists`); positional **25538**/105529 Scr
**48**/1953; full **19/44** Scr **1433** RNG **149541**.
**`useupf`→`delobj` floor meal** (D-0222) → seed0030 seg2
**3207→5939** (`distfleeck` vs `rn2(20)`); positional
**28231**/105529 Scr **48**/1953; full **19/44** Scr **1433**
RNG **152565**.
**`m_search_items` underfoot MMOVE_DONE** (D-0223) → seed0030 seg2
**5939→6060** (`mattacku`); positional **28318**/105529 Scr
**48**/1953; full **19/44** Scr **1433** RNG **152652**.
**`goto_level` `stairway_find_from`** (D-0224 partial) + **D-0224
upstairs screen≠map rejected**; **`F`/`do_fight`/`domove_fight_empty`**
(D-0225) → seed0030 seg2 RNG **FULL**; positional **33021**/105529;
full **19/44** Scr **1433** RNG **157355**.
**Nesting rooms `rn2(4)` + positioned `create_room`** (D-0226) →
seed0030 seg3 **4527→7617** (`mhitm_knockback`); positional
**36316**/105529; full **19/44** Scr **1433** RNG **160650**.
**`hmon` weapon `mhitm_knockback`** (D-0227) →
seed0030 seg3 **7617→7935**; positional **36491**/105529.
**`cmd_safety_prevention` `s`/`.`** (D-0228) →
seed0030 seg3 **7935→8561**; positional **37147**/105529 Scr **56**/1953;
full **19/44** Scr **1441** RNG **161481**.
**`xkilled` treasure `mkobj(RANDOM_CLASS)`** (D-0229) →
seed0030 seg3 **8561→9166**; positional **37565**/105529 Scr **56**/1953;
full **19/44** Scr **1441** RNG **161899**.
**CORPSE `weight` → `mons[corpsenm].cwt`** (D-0230) →
seed0030 seg3 **9166→9299**; positional **38048**/105529 Scr **56**/1953;
full **19/44** Scr **1441** RNG **162377**.
**`blocksMove` `IS_OBSTRUCTED`/SDOOR** (D-0231) →
seed0030 seg3 **9299→9778**; positional **38253**/105529 Scr **48**/1953;
full **19/44** Scr **1433** RNG **162593**.
**`find_misc`/`use_misc` WAN_SPEED** (D-0232) →
seed0030 seg3 **9778→9850**; positional **38260**/105529 Scr **48**/1953;
full **19/44** Scr **1433** RNG **162600**.
**`mfndpos` NOTONL `monseeu`/`monlineu`** (D-0233) →
seed0030 seg3 **9850→9881**; positional **38265**/105529 Scr **48**/1953;
full **19/44** Scr **1433** RNG **162605**.
**`setmangry` + WAN_STRIKING `mbhit`** (D-0234) →
seed0030 seg3 **9881→9887**; positional **38305**/105529 Scr **48**/1953;
full **19/44** Scr **1433** RNG **162645**.
**`monstseesu`/`m_seenres` MAGR** (D-0235) →
seed0030 seg3 **FULL**; positional **40677**/105529 Scr **48**/1953;
full **19/44** Scr **1433** RNG **165017**.
**`ini_inv_adjust_obj` UNDEF_SPE charged ring `rne(3)`** (D-0236) →
seed0030 seg4 **2369→6630** (`drinkfountain`); positional
**45217**/105529 Scr **59**/1953; full **19/44** Scr **1444** RNG
**169732**.
**`drinkfountain` / dodrink fountain yn** (D-0237) →
seed0030 seg4 **6630→7554** (`exercise`); positional
**45960**/105529 Scr **59**/1953; full **19/44** Scr **1444** RNG
**170543**.
**`moverock`/`dopush` boulder push** (D-0238) →
seed0030 seg4 **FULL**; positional **46654**/105529 Scr **69**/1953;
full **19/44** Scr **1454** RNG **171238**.
**Hero `dotrap` dart `t_missile`/`thitu` miss** (D-0239) →
seed0030 seg5 **3076→3096** (`distfleeck` vs `rnd(2)`); positional
**46375**/105529 Scr **69**/1953; full **19/44** Scr **1454** RNG
**171026**.
**NHW_MENU putstr `dmore` quitchars** (D-0240) →
seed0030 seg5 **3096→4174** (`dog_move` `rn2(12)`); positional
**46399**/105529 Scr **69**/1953; full **19/44** Scr **1441** RNG
**169781**.
Next: seg5 @4174 `dog_move` candidate `rn2(12)` / quest
`getbones` `^V`/`makemaz`.
seed0104 **PASS** after D-0220.
seed0103 **PASS** (D-0215 tutorial stay-open + D-0216 disclose).
**mounted `mattacku` steed** (D-0217) → seed0104 **2841→3031**.
**D-0218 upstairs theory rejected**; **`test_move` diagonal doorway**
(D-0219) → seed0104 RNG **full**; **dismount look_here** (D-0220) →
seed0104 **PASS**.
Hero `dotrap` dart done (D-0239); pit/arrow/rock/sqky/`poisoned`
hero arms still deferred; `xkilled` ordinary
`make_corpse` + treasure `mkobj` done (D-0191/D-0229;
`flooreffects` non-floor arms deferred); `,`
one-object AUTOSELECT done (D-0192; multi query_objlist deferred);
CORPSE `eatcorpse`/`eatfood` done (D-0193); **`floorfood` feeding yn
+ poison_strdmg** done (D-0221; metallivore/pool/tin/sacrifice deferred);
**floor `useupf`/`delobj`** done (D-0222);
**^X `empty_handed`/`weapon_insight` skill** done (D-0194; seed0200 PASS);
**NHW_MENU NEED_MORE flush + mark_topline NON_EMPTY** done (D-0195;
seed0101 PASS);
**CANDY_BAR `assign_candy_wrapper`** done (D-0196; seed0030 seg1
**1238→3347**);
**`dogfood` CORPSE vegan/lichen→MANFOOD + age/acid/poison** done
(D-0197; seg1 **3347→3466**);
**`mhitm_mgc_atk_negated` + AD_ELEC `hitmu`** done (D-0198; seg1
**3466→3497**);
**`monnear` NODIAG diagonal** done (D-0199; seg1 **3497→3870**);
**Default themed-fill + Storeroom + `set_mimic_sym`** done (D-0200;
seg1 **3870→5220**);
**`mkshop` eligibility + shtypes `rnd(100)`** done (D-0201; seg1
**5220→5255**);
**`maketrap` ROLLING_BOULDER `mkroll_launch`** done (D-0202; seg1
**5255→5381**);
**`stock_room`/`shkinit`/`mkshobj_at`** done (D-0203; seg1
**5381→6561**);
**`dosounds` shop/beehive/… feature gates** done (D-0204; seg1
**6561→6565**);
**`shk_move` isshk/isgd/ispriest dispatch** done (D-0205; seg1
**6565→6568**);
**`movemon_singlemon` hider/`M_AP_*` skip dochug** done (D-0206; seg1
**6568→7007**);
**`stumble_onto_mimic`/`object_from_map` next_ident** done (D-0207;
seg1 **7007→7189**);
**vault `gd_sound`/`rn2(2)+hallu`** done (D-0208; seg1 **7189→7640 FULL**);
**`make_grave`/`get_rnd_text(EPITAPHFILE)`** done (D-0209; seg2
**1272→2217** `u_init_race`);
**elf Instrument eager `ROLL_FROM`** done (D-0210; seg2
**2217→2408** `distfleeck`);
other `m_initinv` bodies still deferred (mercenary armor/nymph/giant/…);
soldier early-return done (D-0249);
dog_move digweapon / iron bars / shop dig-damage deferred;
underfoot `m_search_items`→`MMOVE_DONE` done (D-0223; shop/hides_under/
onscary/costly_spot/`can_touch_safely` search arms still deferred);
`losehp`→`done(DIED)` / disclosure / topten / `savebones` body deferred
(D-0190).

