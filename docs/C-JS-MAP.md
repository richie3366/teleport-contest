# C → JS coverage map

Structural ledger for the port. Status meanings are defined in
`PORTING-RUNBOOK.md`; a passing session alone does not imply `ported`.

Last broad audit: **2026-07-12**, dirty working tree based on `8b71735`.

## Update rule

When changing a subsystem:

1. cite the pinned C source/module;
2. update status only if the status definition is met;
3. name deferred semantics, not the public seed that failed to exercise them;
4. add verification evidence or link to `DIVERGENCE-LOG.md`.

## Harness and contracts

| C / contract | JS | Status | Evidence / known omissions |
|---|---|---|---|
| ISAAC64 engine | `js/isaac64.js` | frozen | Judge-owned; never edit |
| terminal grid/serialization | `js/terminal.js` | frozen | Judge-owned; cursor is scored with screen |
| persistence VFS | `js/storage.js` | frozen | Contract exists; gameplay save/bones users mostly absent |
| `tty_nhgetch` boundary | `js/input.js`, `js/jsmain.js` | partial | Boundary capture passes green + seed0017; capture hook still repairs Count/`--More--` cursor instead of deriving it entirely from display semantics; **askname before newgame when no OPTIONS=name** (D-0102); **`player_selection` before newgame** (D-0111) |
| core RNG wrappers | `js/rng.js` | partial | Green paths match; **`rnl` ported** (D-0059; Luck bias + internal `rn2` log); `rn1` is a macro over logged `rn2`; display-stream wrappers still absent |
| Lua RNG bindings/provenance | — | absent | `nh.rn2`/`nh.random` must consume core; patch 004 adds Lua callsite provenance, not a third ISAAC stream |
| display/hallucination RNG | — | absent | No hallucination parity |
| per-segment contestant API | `js/jsmain.js` | partial | Fresh game and shared storage binding implemented; save/bones gameplay users are absent |

## Startup and character creation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/options.c` | `js/options.js` + `js/generated/optlist_data.js` | partial | **`option_help` / `next_opt` + contest optlist extract** (D-0091); **`PREV_MSGS` msg_window descr via `#if` comment strip** (D-0114); **boolean `DECgraphics` + `symset` parse** (D-0115); **default `paranoia_bits` PRAY|SWIM|TRAP** (D-0102); enough OPTIONS= parse for Tourist paths; omit full rc/keybind/`doset`/`O` menu / paranoid_confirmation parser; recording `get_configfile` absolute path; full `load_symset` IBM/UTF8 |
| `src/role.c` `plnamesuffix` / `wintty.c` `tty_askname` | `js/askname.js`, `js/jsmain.js` | partial | **copyright splash + `Who are you?` when no name** (D-0102); UNIX name-char filter; omit SELECTSAVED / renameinprogress |
| `src/role.c` `genl_player_setup` / `wintty.c` `tty_player_selection` | `js/player_selection.js`, `js/roles.js`, `js/jsmain.js` | partial | **Shall I pick + role/race/gender/align menus + confirm + `rigid_role_checks`/`pick_align`** (D-0111); **Shall-I-pick topline NO_COLOR** (D-0113); roles/races `allow`/`selfmask`; already-specified rc facets skip; H2344 fullscreen role menu; omit filter-reset UI body, rename-in-confirm, SELECTSAVED |
| `src/role.c` | `js/roles.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** identity/attrs/`hpadv`/`enadv`/`neminum`; **`initrecord` matches C** (Caveman/Valkyrie/Priest/Tourist/Wizard **0**; others **10** — D-0056); **`xlev` on all roles + copied to `game.urole`** (D-0061); **all roles pantheon gods** + C roles[] order (Rogue before Ranger) for `randrole`; **`allow` race/gend/align masks** (D-0111); **`name.f = null` where C has 0** (only Caveman/Priestess keep `f` — D-0138); **races `lovemask`/`hatemask`/`selfmask`** (D-0172); `role_init` pantheon + SPE_LIGHT + nemesis gender; `Hello`/`align_*`; **all races `hpadv`/`enadv` + attrmin/attrmax + allow/selfmask** (D-0036/D-0111); full `role_init` beyond pantheon/SPE_LIGHT/nemgend deferred; rank/`title[].f` nulls where C has 0 still deferred |
| `src/u_init.c:u_init_role` | `js/u_init.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** cases (D-0052); Rogue `knows_class` still uses named P_DAGGER otyps; Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class` walks `bases[]` (Barb/Valk exclude polearms; Ranger: launchers/ammo/spears; Monk: armor only + SHURIKEN); Samurai `Japanese_item_name` pre-discovery; Healer `umoney0=rn1(1000,1001)` + `POT_FULL_HEALING` know; Valkyrie/Barbarian Lamp `!rn2(6)`; Monk `M_spell[rn2(90)/30]` + Magicmarker/`!rn2(4)` else Lamp; Archeologist Tinopener/`!rn2(10)` else Lamp/`!rn2(4)` else Magicmarker/`!rn2(5)` + SACK/TOUCHSTONE knows; Barbarian `rn2(100)>=50` kit pick; Caveman `Cave_man[]` only (club/sling/flint/rock/leather); `ini_inv_use_obj` quivers FLINT/ROCK; graystone quan=1 except FLINT; `Skill_W`/`Skill_P`/`Skill_K`/`Skill_S`/`Skill_H`/`Skill_V`/`Skill_Ran`/`Skill_Mon`/`Skill_A`/`Skill_B`/`Skill_C` for filter; `skill_init` / `initialspell` deferred |
| `src/u_init.c:u_init_race` | `js/u_init.js` | partial | Human no-op; orc `Xtra_food` + knows; elf instrument+knows; dwarf knows; gnome no-op (D-0027); `ini_inv_obj_substitution`/`inv_subs` ported; **`ini_inv_mkobj_filter` reject list + `oc_level`/`Skill_*` incl. `Skill_C`** (D-0042…/52) |
| `src/u_init.c:u_init_misc` | `js/u_init.js` | partial | `newhp`/`newpw` at ulevel 0; **`adjabil(0,1)`** role/race L1 intrinsics (D-0058); rc align → `ualign`; handedness RNG; many u fields still absent |
| `src/attrib.c:newhp` / `src/exper.c:newpw` | `js/attrib.js`, `js/exper.js` | partial | **Init + level-up** (lornd/hirnd + Con; `enermod`/`rn1`) (D-0061); `pluslvl` HP/EN/level/`adjabil` (omit achievements/Upolyd); **`experience`/`more_experienced`/`newuexp`/`newexplevel`** (D-0130); `uhpinc`/`ueninc` stored; omit eel AD_WRAP Amphibious XP / MAIL_DAEMON / `exp_percent_changing` / SCORE_ON_BOTL |
| `src/attrib.c` (attrs) | `js/attrib.js` | partial | Initial attr paths; `change_luck` clamp; **`adjabil`/`role_abil` + Fast/Very_fast** (D-0058); **`Searching()`** (D-0062); **gainstr You_feel on level-up** (D-0061); **`acurrstr` exported** (D-0059); **`adjattrib` async You_feel when msgflg≤0** (D-0116); omit Fixed_abil/Dunce/verbose "already", `postadjabil`, `add_weapon_skill`; `u_init_carry_attr_boost` stubbed |
| `src/allmain.c:welcome` / `role.c:Hello` | `js/allmain.js` | partial | New-game welcome from Hello+align+**C `!name.f`+both-genders gate**+race+role (D-0138); `urole.allow` copied; `flush_topl_more` before tutorial; restore path deferred |
| `src/allmain.c:moveloop_preamble` | `js/allmain.js` + `js/calendar.js` | partial | Moon/friday plines + `change_luck`; pickup/encumber/engraving deferred |
| `src/o_init.c` | `js/o_init.js` | partial | Green-session shuffle/discovery evidence; `discover_object` encounter flag + `interesting_to_discover` via extracted `objectDescrs` (D-0040); not audited across all classes |
| `src/dungeon.c`, `dat/dungeon.lua` | `js/dungeon.js`, generated dungeon data | partial | Topology subset; **`#annotate`/`donamelevel`/`query_annotation` + lazy mapseen; `#overview` current-level PICK_NONE** (D-0110); **`update_lastseentyp`/`recalc_mapseen` feat counts + overview OF_INTEREST line (TAB vs PREFIX)** (D-0123); **dungeon `flags.align = dgn_align & 7`** matches C 3-bit bitfield truncation of `D_ALIGN_*` (D-0171); not a replacement for executing upstream Lua; omit full `traverse_mapseenchn`/`interest_mapseen`/shop-temple rooms/`shop_string`/altar-god/auto-annotations/DRAWBRIDGE+mimic lastseentyp |
| tutorial / quest pager | `js/allmain.js`, `js/questpgr.js`, `js/invent.js` | partial | Legacy `%d`/`%G` + corner NHW_MENU without `clearScreen` (D-0026); **`maxcol=strlen+1` + leading pad / text at offx+1** (D-0071); **H2344_BROKEN offx** (D-0078); tutorial corner (D-0023); invent corner (D-0024); yes-path / pauper_legacy deferred |
| `src/insight.c` enlightenment | `js/invent.js` | partial | Autopickup from flags + race attr limits + `weapon_descr`/`skill_name` via `oc_skill` (D-0041); pantheon/wallet/handedness (D-0024); **omit gender when `!!urole.name.f`** (D-0097/D-0138); **gender only when `!name.f` + both-genders/initgend gate** (D-0164); **dungeon line `dungeons[].dname` + `depth(u.uz)`** (D-0164); Attributes `magic_negation` warded (D-0097); **`an(rank)` + basics HP/Pw phrasing + real `uexp`** (D-0130); **female `urole.name.f`/`rank.f` titles** (D-0137); **new/full moon + friday13 before XP + continuous 23-row `(k of n)` paging** (D-0158); shop `costly_spot` disable / `apelist` / enhance / P_SKILL table / odd-skill P_NAME / full Protection MC bumps / wizard next-level XP line / night()/midnight / endgame/knox/quest/rogue/bigroom dungeon phrasing deferred |
| `src/botl.c` status | `js/display.js`, `js/attrib.js` | partial | **`get_strength_str` 18/xx** (D-0078); botl `showexp`/`time` + plname capitalize; full blstats/conditions deferred |
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
Next peel: seed0030 @14118 / D-0185 (FORCE-open → 14153; dig-path /
pass_one / join-endpoint / pre-mismatch mdig **falsified**; next
post-wallify typ-write hook or C levl dump) / seed0101 Scr residual /
seed0200 combat @3382 / quest `makemaz` / parked seed2200 RC @158.
Hero `dotrap`/`trapeffect_pit` and `xkilled` `make_corpse` still
deferred; other `m_initinv` bodies + soldier early-return still deferred;
dog_move digweapon / iron bars / shop dig-damage deferred.

## Data and world generation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `include/objects.h` | extractor + `js/generated/objects_data.js` | partial | Reproducible table; **`objectDescrs`/`objectNameStrs`** (D-0040); **`oc_skill`/`oc_subtyp`** (D-0041); **`a_ac`/`oc_level`** (D-0042); **`oc_delay`** (D-0066); **`oc_big`/`oc_bimanual`** (D-0086); still no `oc_cost` (candle lamp age D-0146), `oc_wsdam`/`oc_wldam` (dmgval stand-in map D-0105), `oc_merge`/`oc_charged`/`oc_oprop` (`stackobj` uses class heuristic D-0094; `is_multigen`/`is_poisonable`/doname charged name-list stand-ins) |
| `include/monsters.h` | extractor + `js/generated/monsters_data.js` | partial | `has_at_weaps` from AT_WEAP; `mflags1` extracted (D-0020 `nohands`); **`mcolors` extracted** (D-0022 corpse `mon_color`); **`mflags3` extracted** (D-0039 INFRAVISION/VISIBLE); **`LVL(..., A_NONE)` parsed** (D-0053 Wizard difficulty); **full `mattk[]` extracted** (D-0130 experience + **D-0179 `get_mattk`**); **`bigmonst`/`thick_skinned`/`M1_THICK_HIDE`/`MZ_LARGE`** (D-0170); **M2 race bits HUMAN…ORC + UNDEAD/WERE/DEMON** (D-0172); **`pmnames[MALE/FEMALE/NEUTRAL]` from NAM/NAMS** (D-0173); poisonous/acidic/carnivore predicates still underused |
| rumor sources | extractor + generated rumors | partial | Fortune path exercised |
| `include/artilist.h` | extractor + `js/generated/artifacts_data.js` + `js/artifact.js` | partial | **name/otyp/spfx/align/role/race** (D-0064); **`retouch_object` + touch gate** (D-0065); omit attk/defn/cary/inv/cost/color gen_spe; `bane_applies`/blast `d()`/`losehp`/wield intrinsics |
| `src/mondata.c` `name_to_monplus` | `js/mondata.js` | partial | **pmnames[MALE/FEMALE/NEUTRAL] longest match + gender out** (D-0173); grey dragon alt_spl subset (D-0064); omit full alt_spl/rank titles/plural edge cases |
| `src/mkobj.c` | `js/mkobj.js` | partial | Creation/merge/weight subsets; `add_to_buried` (D-0014); `start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); `is_poisonable`≡missiles (D-0012); starting SACK/`mkbox_cnts` (D-0013); **`splitobj`** quan/owt + floor chain + `next_ident` (D-0028); **`obj_extract_self` MINVENT** (D-0029); **`SPBOOK_no_NOVEL` → `rnd_class`…`SPE_BLANK_PAPER`** (D-0055); **CORPSE `undead_to_corpse` + `G_NOCORPSE` retry** (D-0057); **EGG `can_be_hatched` multi-retry** (D-0068); **Samurai lacquered `SPLINT_MAIL`** (D-0079); **floor `stackobj`/`merged`/`mergable`** (D-0094); **`delobj`→`obj_resists(0,0)`** (D-0105); **`relobj_on_death`** (D-0108); **TOOL lamps `rn1(500,1000)` + grease/crystal/horn/bag/bell/instruments** (D-0146); omit FIGURINE `rndmonnum_adj`, candle `oc_cost` age, `nextoid` shop-price search, unpaid/`splitbill`, timers/light/`copy_oextra`, invent/contained extract, `zombie_form`/zombify, TIN `cnutrit` gate, timer fire, `permapoisoned`, hatch timers, `In_quest` lacquer; full `mergable` shop/mail/globby/candle/erosion |
| `src/mon.c` `undead_to_corpse`/`can_be_hatched`/`mondead` | `js/mon.js`, `js/trap.js`, `js/mhitm.js` | partial | **`undead_to_corpse`** zombie/mummy/vampire map (D-0057); **`can_be_hatched`/`dead_species`** + BREEDER_EGG (D-0068); **`record_mvitals_died`** (D-0126); **trap-path `monkilled`/`mondied`/`make_corpse` ordinary default_1** (D-0150); **mhitm `mondied`→`make_corpse` ordinary** (D-0167); omit cham/were restore before monsndx, `egg_type_from_parent`, golem/dragon/… corpse specials, `accessible`/`is_pool` gate, `xkilled` still burns chance without corpse, genus/other mon.c helpers |
| `src/mondata.c` growth | `js/mondata.js` | partial | **`little_to_big`/`big_to_little`** grownups table (D-0068); name_to_mon; omit `big_little_match` multi-step walks beyond one step |
| `src/makemon.c` | `js/makemon.js` | partial | Ordinary `is_armed`/`m_initweap`/`mongets`/`m_initthrow` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/S_HUMANOID + default); **`add_to_minv` uses `OBJ_MINVENT`** (D-0029); **`makemon_rnd_goodpos` + null-ptr `rndmonst` order + `m_initgrp`/`G_SGROUP`** (D-0034); **`mkclass`/`mkclass_aligned`/`init_mongen_order`/`mk_gen_ok`/`is_placeholder`** (D-0053); **`peace_minded` co-align + `race_hostile`/`race_peaceful` via urace hatemask/lovemask** (D-0056/D-0172); **`m_initinv` S_GNOME candle + tail** (D-0172); **`likes_gold`/`findgold`/`mkmonmoney` trailing gold** (D-0174); **`rndghostname`/`christen` for `PM_GHOST`** (D-0144); omit MS_LEADER/GUARDIAN/NEMESIS/ERINYS/`is_minion` peace arms; **`align_shift`/`temperature_shift` stubbed 0**; other `m_initinv` bodies + PM_SOLDIER early-return absent; omit `throws_rocks` Sokoban first-try, S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials, `add_to_minv` merge, demon→default FALLTHROUGH, `set_malign`; `ndemon`/aligned `mkclass` callers unaudited |
| `src/mklev.c` / `sp_lev.c` `lspo_map` | `js/mklev.js` | partial | Ordinary level path substantial; mineralize bury-vs-place (D-0014); `mktrap_victim` place_object ammo/possessions (D-0016); **`set_wall_state`/`xy_set_wall_state`** (D-0038); **`makeniche` → real `mkclass(S_HUMAN)`** (D-0053); supply-chest **`SPBOOK_no_NOVEL`** (D-0055); **`in_mk_themerooms` for themerms `check_room`** (D-0092); **post-fill full-map `wallification`** (D-0100); **`do_vault` `create_vault` fallback** (D-0112); **`makeniche` trap_engravings + `wipe_engr_at`** (D-0134); **`lspo_map` themerms placement + `filler_region`/`flood_fill_rm` + fill reservoir** (D-0143); **Ghost fill `selection_from_mkroom`/`selection_rndcoord` + monster/loot** (D-0144); **`finddpos_shift` irregular inward walk** (D-0145); **`occupied` `t_at` + irregular `somexy`/`inside_room`** (D-0147); **dlvl2+ special-room `rn2(u_depth)` → `do_mkroom`/`mkshop` stub** (D-0149); **`clear_level_structures` clears `_objects_at`/`head_engr`** (D-0161); **`fill_lvl`→`makemaz(minefill)` + `mkmap` SOLIDFILL/MINES/`init_fill`/`join_map` + minefill stairs/objects/monsters/traps** (D-0171); omit `invocation_pos`, other fill *bodies*, Blocked center/Pillars/Water vault/complex maps, nested `des.room` themerms, `join` arboreal→ROOM, Lua `post_level_generate` postprocess queue, `mkgrave_room` bury, `begin_burn`; `Can_fall_thru` before hole→ROCKTRAP (Vlad niche); hellfill/other protos; empty `makemaz("")`; Is_special/quest fill; **minefill `fixup_special`/`place_lregion(LR_BRANCH)` + Mines mineralize gold×2/gem×3** (D-0177); omit lev_region[] compiler/`mkportal`/exclusion zones; seed0060 @ 2997 was **not** corridor typ (D-0032); seed0017 @3132 was **not** missing (30,4) terrain (D-0099); seed0077 @1465 was **not** themerms rect-count (D-0112); seed0200 @1672 was **not** irregular-only (D-0147); seed0200 @1768 was **not** empty getrumor (D-0148); seed0030 @10861 was **not** Medusa/`rn2(5)` first (D-0171); **minefill class-letter `induced_align` before `mkclass`** (D-0175); **minefill `create_trap` NO_TRAP retry + victim `rnd(4)`** (D-0176); seed0030 @13007 was **not** induced_align itself (D-0175); seed0030 @13122 was **not** get_location (D-0176); seed0030 @13226 was **not** mineralize-first (D-0177) |
| `src/track.c` | `js/track.js` | partial | **`initrack`/`settrack`/`gettrack`** (D-0099); **`goto_level`→`initrack`** like C savelev release (D-0181); omit per-level rest_track on return + bones |
| `src/vision.c` | `js/vision.js` | partial | Algorithm subset; `clear_path`/`m_cansee` exported for pet rays (D-0018); **`couldsee` wired into `dog_goal`** (D-0030); **`cansee` used by `makemon_rnd_goodpos`** (D-0034); **`recalc_block_point` → `vision_reset` after door open/break** (D-0113); broad FOV/detection states unaudited; incremental `dig_point` deferred; non-hero `do_clear_area`/`view_from` for wantdoor omitted (D-0099) |
| `src/trap.c` | `js/trap.js` | partial | Monster dart path: `t_at`/`t_missile`/`thitm` miss pline/`mintrap`/`seetrap` (D-0018–D-0019); **`maketrap` + `choose_trapnote` + `hole_destination`/`dng_bottom`** (D-0054); **`water_damage` POT_WATER/force/dilute/scroll/book** (D-0109); **monster `trapeffect_pit` + `thitm`→`monkilled`/`make_corpse` ordinary** (D-0150); **`mintrap` `mon_learns_traps` + `m_harmless_trap`** (D-0151); **monster `trapeffect_sqky_board`/`trapnote`/`You_hear`/`wake_nearto` + real `canseemon`** (D-0163); **`maketrap` `teledest` field for themerms TELEP** (D-0166); **monster `trapeffect_rocktrap` `t_missile(ROCK)`+`thitm(d(2,6))`** (D-0181); omit grease/towel/container/acid boom, `erode_obj` rust body, overwrite/furniture/statue/boulder/shop/terrain morph, other trap types, **hero `dotrap`/`trapeffect_pit`/SQKY/ROCKTRAP/TELEP**, SPIKED poison/`mselftouch` petrify/`wearing_iron_shoes`, hit/`dmgval`, `mons_see_trap`, HOLE `!mindless` already_seen, full `m_harmless_trap` immunities, mtrapped escape `rn2(40)`, Deaf+mindless silent, `disturb_buried_zombies`, empty-door pline_mon |
| `src/fountain.c` | `js/fountain.js` | partial | **`dipfountain` case 16/default + `dryup` rn2(3)** (D-0109); omit Excalibur body, wash_hands, cases 17–29, drinkfountain, town warn/`angry_guards`, wizard yn |
| `src/sit.c` | `js/sit.js` | partial | **`dosit` having-fun / surface fountain** (D-0109); omit steed/trap/pool/OBJ_AT picnic/throne/egg |
| runtime `dat/*.lua` + `nhlua.c`/`sp_lev.c` | `js/mklev.js` themerms subset | partial | **Simple filler-map themerms via JS `lspo_map`** (D-0143); **Ghost fill body** (D-0144); **irregular finddpos_shift** (D-0145); **Teleportation hub fill + `make_a_trap` postprocess** (D-0166); full Lua VM + remaining `des.*` still production requirement; nested `des.room` / complex map rooms / other fill bodies (Ice/Temple/Storeroom/…) + garden/dig postprocess absent |

## Turns, commands, and display

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/allmain.c` | `js/allmain.js` | partial | Basic move loop and hunger/sound subsets; **`mvitals.mvflags = geno & G_NOCORPSE` at newgame** (D-0057); **`maybe_generate_rnd_mon` → real `makemon(NULL,0,0)`** (D-0034); **`regen_hp` + once-per-turn call** (D-0035); **`u_calc_moveamt` Fast/Very_fast `rn2(3)`** (D-0058); **Searching EOT → `dosearch0(1)`** (D-0062); **`multi < 0` occupation + `unmul`/`afternmv`** (D-0066); **`go.occupation` tick before rhack** (D-0076); **`welcome` enter-dungeon `livelog_printf`** (D-0124); omit steed `mcalcmove` path / full `youmonst.data->mmove` via `set_uasmon`; `regen_pw`/Teleport/Poly once-per-turn RNG; Upolyd eel hp-loss rolls; Regeneration/Sleepy props; warnreveal; `monster_nearby` stop_occupation |
| `src/detect.c` `dosearch0`/`findit`/`do_mapping`/`reveal_terrain` + `cmd.c` `doterrain` | `js/detect.js` | partial | **8-neighbour SDOOR/SCORR/trap find + fund (lenses)** + `find_trap` message (D-0062); **`findit`/`findone` SDOOR/SCORR/unseen traps + hero `do_clear_area`** (D-0074); **`do_mapping`/`show_map_spot` hero_memory + `magic_map_background`** (D-0075); **`#terrain`/`doterrain` View which? PICK_ONE + Esc + partial `reveal_terrain`/`browse_map`** (D-0128); omit feel_location/Blind/unmap_invisible, mfind0 body, Hallucination/cls wait, activate_statue_trap, artifact SPFX_SEARCH, cmd_safety_prevention; findone flash/mimic/hider/invis/chest-trap/trapped-door; `reveal_terrain_getglyph`/show_glyph rewrite; unconstrain underwater/buried/swallow; wiz_map_levltyp/legend; room_discovered; trap/engraving restore after furniture |
| `src/cmd.c` / `src/do.c` / `src/hack.c` lookaround / `src/pray.c` / `src/sounds.c` | `js/cmd.js`, `js/do.js`, `js/getline.js`, `js/wizcmds.js`, `js/zap.js`, `js/read.js`, `js/engrave.js`, `js/pager.js`, `js/getpos.js`, `js/pray.js`, `js/sounds.js`, `js/sit.js`, `js/weapon.js`, `js/dungeon.js`, `js/insight.js`, `js/invent.js`, `js/pline.js` | partial | Movement/search/apply/kick/wait and selected UI/item commands; Ctrl-D → `dokick` (D-0031); **`.` → `donull`** (D-0033); **`'>'` → `dodown`/`next_level`/`goto_level` ordinary stairs + `flush_screen(-1)` descend `--More--` + clear `_objects_at`/`head_engr`** (D-0149/D-0160/D-0161); **`_`/`#travel` → `dotravel`/`dotravel_target` + adjacent/greedy `findtravelpath`** (D-0153); **autoopen walk-into → `doopen_indir`** (D-0059); **`#` → `doextcmd`/`#levelchange`/`#name`/`#pray`/`#chat`/`#chronicle`/`#conduct`/`#vanquished`/`#genocided`(empty)/`#adjust`/`#terrain`/`#sit`/`#dip`/`#offer`/`#enhance`/`#annotate`/`#overview`/`#version`/`#travel`** (D-0061/D-0069/D-0101/D-0103/D-0109/D-0110/D-0124/D-0125/D-0126/D-0127/D-0128/D-0153); omit `doup`/`savelev`/`getlev` restore, mysterious force, quest gate, portals/fall damage, Lua `NHCB_LVL_LEAVE`; full `TEST_TRAV`/`TRAVP_GUESS`/`travelmap`/`#retravel`; remaining `extcmdlist` bodies; … |
| `src/potion.c` | `js/potion.js` | partial | **`dodrink`/`dopotion`/`peffect_oil`** uncursed/cursed unlit (D-0073); **`dodip` fountain yn→`dipfountain`** (D-0109); omit other `peffect_*`, Strangled, drink fountain/sink/underwater, milky/smoky bottles, lit-oil burn, worn-stack split, `potion_dip` alchemy, sink/pool dips, `more_experienced`, getobj `?`/`*` |
| `src/zap.c` `dozap` | `js/zap.js` | partial | **`dozap`/`zappable`/`weffects`/`zapnodir`/`learnwand`** NODIR `WAN_SECRET_DOOR_DETECTION` → `findit` (D-0074); **directional getdir `.`=self + `zapyourself` SPE_HEALING/`WAN_SLEEP`/`SPE_SLEEP`** (D-0156); `makewish` subset (D-0064); omit IMMEDIATE/RAY/`bhit`/`ubuzz`/`zap_dig`; other zapyourself otyps; other NODIR; `backfire` body; wrest pline; `check_capacity`/`nohands`/`check_unpaid`; `more_experienced`; `update_inventory`; shieldeff/monstunseesu |
| `src/read.c` `doread`/`seffects` | `js/read.js` | partial | **`doread` getobj-read + SCR_MAGIC_MAPPING `seffects`/`seffect_magic_mapping` + learnscroll/useup** (D-0075); **SPBOOK → `study_book`** (D-0136); omit other `seffect_*`, fortune/shirt/credit/marker/coin/orb/candy, Blind Braille, nommap/`make_confused`, `trycall`, `can_chant`, `check_capacity`, SPE_MAGIC_MAPPING |
| `src/engrave.c` `doengrave`/`make_engr_at`/`read_engr_at`/`wipeout_text`/`random_engraving`/`can_reach_floor` + `hack.c` `maybe_smudge_engr` | `js/engrave.js`, `js/rumors.js`, `js/generated/engrave_data.js`, `js/cmd.js` | partial | **`doengrave` fingertip DUST getlin + mix-up + occupation `make_engr_at` Elbereth WIS** (D-0076); **`read_engr_at` DUST/ENGRAVE/BURN/MARK/blood non-Blind** (D-0133); **`wipeout_text` + `wipe_engr_at` (seed==0)** (D-0134); **`random_engraving` → `get_rnd_text(ENGRAVEFILE)` pad+xcrypt extract** (D-0148); **`maybe_smudge_engr` after walk + `can_reach_floor` subset** (D-0165); omit wand/weapon/marker/towel/gem/ring stylus; grave/altar/jello; add-to/overwrite; multi-turn dulling; Blind feel; full `surface`/`is_ice`; `u_wipe_engr` body; wipeout seeded path; epitaph `get_rnd_text`; can_reach_floor ustuck-hugs/ceiling_hider/MZ_HUGE/uteetering/uescaped_shaft |
| `src/pager.c` `do_look`/`dowhatis`/`dohelp`/`checkfile` | `js/pager.js`, `js/getpos.js`, `js/dokeylist.js` | partial | **`/` whatis menu + getpos tip + invent/name/list branches; `?` help + About `get_lua_version` nhlib shuffle; data.base/`dat/*` paging** (D-0077); **farlook `lookat` cmap stairs + DECgraphics floor/corridor describe** (D-0083); **`checkfile` NHW_MENU `process_text_window` + tabexpand/CR** (D-0085); **`look_all`/`look_engrs` NHW_TEXT more@23 + MAP coords/glyph + `look_shown_at` + statue/engr** (D-0087); **`doextversion` OPTIONS_AT_RUNTIME options/windowing/soundlib/Lua license** (D-0088); **NHW_TEXT `dmore` quitchars** (D-0089); **`dowhatdoes` tip+`What command?`+`key2extcmddesc`** (D-0090); **help `g` → `option_help`** (D-0091); **`dokeylist`/`domenucontrols`/`docontact` + default !num_pad binds** (D-0131); **`display_file` keeps intentional trailing blank** (D-0131); omit full showsyms-driven `do_screen_description`; full `key2extcmddesc` misc/numpad; PORT_HELP; getpos menu-jump/hilite; lootabc true; look_traps format; invis/warning glyphs; object_from_map fakeobj; custom BIND=/number_pad |
| `src/getpos.c` `getpos` / `nhlua.c` `nhl_text` | `js/getpos.js` | partial | **hjkl cursor + `.` LOOK_TRADITIONAL + ESC**; **first-use tip via `paint_corner_nhw_menu` PICK_NONE loop** (D-0077/D-0082/D-0153); **force unknown-direction pline** (D-0153); **curs after flush + `lookat` firstmatch autodescribe** (D-0083); **`HJKLYUBN`/`C(dir)` rush 8× + `truncate_to_map`** (D-0084); omit menu jump, hilite, valids, `getloc_moveskip` glyph-skip, quick modes beyond stub |
| `src/version.c` `doextversion` / `nhlua.c` `get_lua_version` | `js/pager.js` | partial | **first About/`#version` → nhlib `shuffle(align)`** (D-0077/D-0110); version/options text approximate; full OPTIONS_USED dlb parse deferred |
| `src/wield.c` | `js/wield.js` | partial | **`dowield`/`ready_weapon`/`setuwep`/`welded`** + getobj letter/`-` (D-0065); **`doswapweapon`/`setuswapwep`/`ammo_and_launcher`** (D-0069); **`Q`/`dowieldquiver`/`doquiver_core`/`setuqwep` + uswapwep/uwep ynq** (D-0152); omit `cantwield` poly, `cant_wield_corpse`, bimanual+shield, weld pline body, count-split `finish_splitting`/`unsplitobj`, `Shk_Your` decline, `arti_speak`/`artifact_light`, `pushweapon`, full `setworn` props |
| `src/do_wear.c` | `js/do_wear.js` | partial | **`dotakeoff`** (D-0063) + **`dowear`/`canwearobj`/`accessory_or_armor_on`/`setworn`/`Armor_on` + delay-0 `on_msg`/`unmul`** (D-0066) + **`doputon`/`Amulet_on` + ring-hand yn + amulet/eyewear put-on** (D-0067); omit Ring_on learnring/attribs, Blindf_on specials, amulet change/strangle/sleep/flying/breathing, ring Glib/cursed-gloves/weld, doff `oc_delay` occupation, magic helms beyond fedora, `dragon_armor_handling`, `setworn` oc_oprop props, poly/weld/trap gates, `A` takeoffall |
| `src/objnam.c` `readobjnam` | `js/readobjnam.js`, `js/objnam.js` | partial | **wish subset:** prefixes + `name_to_monplus` dragon mail + `rnd_otyp_by_namedesc`/`wishymatch` + artifact_name + BUC/spe + oname (D-0064); doname empty/wield/swapwep/potion/implicit-uncursed (D-0024); **cleric skip `"uncursed "`** (D-0121); CORPSE `corpsenm` (D-0019); **COIN quan=1 `"a gold piece"`** (D-0037); **`Japanese_item_name` table** for Samurai discovery (D-0045); **Japanese display in doname/`obj_typename`/`disco_typename` + ya plural + quiver + rustproof** (D-0079); doname `named`; **`xprname` `dot` for prinv** (D-0070); **xname SCR/SPE/RIN/WAN `… of <actualn>` + bimanual `(weapon in hands)`** (D-0086); **STATUE `of a <pm>`** (D-0087); **GEM `GemStone`/`xname`/`singular` + `obj_typename` stone** (D-0097); **armor gloves/boots `pair of` + dragon scales `set of` + LENSES; makeplural keeps singular pair** (D-0158); **`just_an` letter+space (`aefhilmnosx`) + the-/lava/bars/ice** (D-0163); omit fruits/traps/terrain/random/`o_ranges`/alt spellings/Japanese wish; unlabeled/called/descr beyond GEM; ammo `(wielded)` / tethered aklys / glow paren; full erosion proofs beyond rustproof; SCR_MAIL/amulet uncursed exclusions |
| `src/invent.c` `hold_another_object` | `js/invent.js` | partial | **artifact touch + addinv + prinv** (D-0064); **prinv `xprname(..., dot)`** (D-0070); **`observe_object` in invent_lines** (D-0079); omit fumbling/encumbrance-drop/autoquiver/fatal-corpse; xname-path observe beyond invent |
| `src/do_name.c` `oname` / `docallcmd` | `js/do_name.js` | partial | **artifact oname/`artifact_exists`** (D-0064); **`docallcmd` menu + cancel/floor stubs** (D-0069); **`christen_monst` + tame `x_monnam` subset** (D-0079); **`Monnam`/`noit_Monnam` MGIVENNAME→bare** (D-0095); omit invent/floor getobj/getpos bodies, full x_monnam hallu/invis/saddle/priest/shk, literate/shop/intrinsic side-effects |
| `src/dokick.c` | `js/dokick.js` | partial | `dokick` + `kick_dumb` (D-0031); `kickedloc` (D-0032); **`kick_ouch` → `losehp`** (D-0035); **`kick_door` CLOSED/LOCKED `rnl(35)` bust** (D-0104); omit `kick_monster`/`kick_object`/SDOOR-SCORR open/furniture/`martial`/shop-town watchman/`b_trapped`/`wake_nearby`/`u_wipe_engr`/`set_wounded_legs`/`kickstr` terrain names |
| `src/hack.c` `losehp`/`nomul`/`spoteffects`/`overexertion` / `timeout.c` `fall_asleep` | `js/hack.js`, `js/pickup.js`, `js/cmd.js` | partial | **`losehp` !Upolyd / Upolyd mh subtract** (D-0035); **`nomul`/`unmul` + afternmv** (D-0066); **`fall_asleep`/`usleep`/`nomovemsg`** (D-0156); **`overexertion`→`gethungry`** (D-0107); **`domove`→`spoteffects`→`pickup`/`check_here` when `!flags.pickup`** (D-0095); `maybe_half_phys` identity until Half_physical prop; omit `showdamage`/`maybe_wail`/`done(DIED)` bodies; full `end_running`/`cmdq_clear`; encumber `overexert_hp`; pool/trap/sink/`mention_decor`/`autopick` arms; Deafness/Hear_again |
| `src/dig.c` `mdig_tunnel` / `hack.c` `may_dig` | `js/dig.js` | partial | **`may_dig` + `mdig_tunnel`** door/SCORR/wall/tree/stone + `rnd(12)` pile + draft/crash/boulder-rock/`rnd_treefruit_at` (D-0178); omit Hallucination draft; `in_town` cavernous; shop `add_damage`; Soundeffect; iron-bar path stays in monmove |
| `src/eat.c` | `js/eat.js` | partial | Cookie + **reqtime-1 food** (`touchfood`/`splitobj`/`fprefx`/`lesshungry`) (D-0155); **`gethungry` accessorytime `rn2(20)`** (D-0107); **Unaware metabolic `rn2(10)` before accessorytime** (D-0156); **getobj missing-letter `continue` + empty early-return** (D-0142); multi-turn occupation / rotten `rn2(7)` / floorfood floor / corpses/tins / `?`/`*` menu deferred; uhunger-- body / fainted Unaware arm deferred; `oc_nutrition` still local FOOD map until extract |
| `src/apply.c` / `src/lock.c` | `js/apply.js`, `js/lock.js`, `js/insight.js` | partial | `doapply` + `pick_lock` (D-0021); exported `getdir` for kick/apply; getobj missing-letter `continue`+`flush_topl_more` (D-0025); **empty SUGGEST → "don't have anything"** (D-0141); **`doopen_indir` CLOSED autoopen** (D-0059); **`doopen_indir`/`kick_door` `recalc_block_point`; `pick_lock` NODOOR/ISOPEN/BROKEN** (D-0113); **`use_stethoscope` self + `ustatusline`/`piousness` + free first `hero_seq`** (D-0155); **`apply_ok` SUGGEST tools/wands/spbooks + weapon/oil/food/graystone ranks** (D-0157); omit `do_break_wand`/`flip_through_book`/`flip_coin`, adjacent/dz/cursed stethoscope, sack/container/cream pie/whip/`use_stone`/`use_pole`, Snickersnee, CLOSED/LOCKED lock occupation, interactive `o` getdir, `b_trapped`/autounlock, `feel_location` mapseen gating, container-at-feet |
| `src/display.c` `newsym` / map | `js/display.js` | partial | Floor `vobj_at` + class symbols + CORPSE `mon_color` (D-0022); **live `mon_glyph` uses `mcolors[mnum]`** (D-0036; newt yellow); **`wall_angle` + seenv** (D-0038); **STAIRS `known_branch_stairs`→CLR_YELLOW else CLR_GRAY** (D-0162; tty gray→NO_COLOR); **`see_with_infrared`/`mon_visible` when `!cansee`** (D-0039; race Infravision via `mons[urace]`); **full MONSYM `MLET_CH` + FOUNTAIN/SINK/THRONE/ALTAR/GRAVE terrain** (D-0070); **`magic_map_background` + dark_room DARKROOMSYM≡S_room** (D-0075/D-0081); **STATUE `obj_glyph` → mons[corpsenm].mlet + `obj_color(STATUE)`** (D-0080); **`more()` word-wrap only when len≥CO** (D-0083); **`look_shown_at` for look_all glyph filter** (D-0087); **`waslit=(lit!=0)` + out-of-sight `S_litcorr`→`S_corr`** (D-0096); **DECgraphics open door meta-a / CLR_BROWN** (D-0113); **Primary ASCII vs `symset:DECgraphics` walls/floors/ndoor/open-door `horizontal`** (D-0115); **`obj_is_generic` + tty CLR_GRAY/BLACK→NO_COLOR** (D-0118); **`map_location_memory` under cansee+visible monster** (D-0120); **`update_lastseentyp` on cansee/`magic_map_background`** (D-0123); **`S_engroom`/`S_engrcorr` + `erevealed` on cansee** (D-0139); **`flush_screen(-1)` postpone + `docrt`→`cls`→`more` before redraw** (D-0160); omit ladder glyphs; hero-underfoot `_map_location` (seed0060-sensitive), infrared `_map_location`, traps/hallucination/`see_objects`; hallu/`random_monster` statue; pile-top/gender statue offsets; telepathy/`Detect_monsters`/`MATCH_WARN_OF_MON`; full `set_uasmon`/uprops; pool/lava/ice/air/cloud terrain; ASCII `|`/`-` open-door when not DEC; ROOM→DARKROOMSYM memory arm in `newsym`; floor-see `dknown` timing for colored potions; DRAWBRIDGE_UP/furniture-mimic lastseentyp |
| `src/questpgr.c` / tty menu | `js/questpgr.js` | partial | **legacy corner NHW_MENU `maxcol=strlen+1` + leading pad** (D-0071); **H2344_BROKEN offx** (D-0078); omit other pager outputs / pauper_legacy |
| `src/invent.c` `look_here` / `dfeature_at` | `js/invent.js`, `js/mklev.js`, `js/pickup.js` | partial | Stairs via `stairs_description` + Dlvl1 `u_traversed` (D-0026); doors/fountain/sink stubs; **`check_here`→`look_here` after move when `!autopickup`** (D-0095); **`read_engr_at` from look_here / check_here ct==0** (D-0133); Blind feel, multi-object menu, `doname_with_price`, pile_limit skip deferred |
| `src/pline.c` / tty message behavior | `js/display.js`, `js/input.js`, `js/pline.js` | partial | `--More--` works for green paths + getobj re-prompt (D-0025); **`verbalize`/`You_feel`** (D-0116); **`gamelog_add`/`livelog_printf` chronicle list** (D-0124); omit livelog file write; full message/window policy incomplete |
| `src/invent.c` | `js/invent.js` | partial | Corner NHW_MENU invent (D-0024); disco inv_order + `*`/encounter + `OBJ_DESCR`/`obj_typename` (D-0040); **Samurai `interesting_to_discover`/`disco_typename`/`discover_object` gate** (D-0079); **`paint_corner_nhw_menu` fullscreen when `maxrow>=24`; no botl flush under `in_role_selection`** (D-0111); **`select_menu_pick_none` lmax=23 paging** (D-0122); **`doorganize`/`#adjust` getobj + destination cancel/move/collect/swap/merge** (D-0127); omit count-split/`display_used_invlets`/wonky-gold/`adjust_split`; full magic enlightenment deferred |
| `src/dothrow.c`, `src/zap.c:bhit` | `js/dothrow.js` | partial | Dart split/flight/landing; `throw_ok` SUGGEST coins+weapons + getobj loop (D-0025); **`dofire` + fireassist uswapwep swap via cmdq** (D-0069); **`getdir`/`help_dir` NHW_TEXT** (D-0071); **`getdir_cmdassist` `flush_topl_more` before prompt** (D-0093); **`throw_obj` multishot + `multishot_class_bonus` + `rnd(multishot)`** (D-0093); **`throwit`→`stackobj`** (D-0094); **volley pline `xname`/`singular`** (D-0097); **`throw_ok` DOWNPLAY lone uwep + hand-throw pline/half range; `dofire` empty→`doquiver_core("fire")`** (D-0152); **`throw_gold` body absent**; find_launcher/polearm incomplete; ACURRSTR crossbow / quest-artifact launcher / full `weapon_skills` |
| `src/mon.c`, `src/monmove.c` | `js/mon.js`, `js/monmove.js` | partial | Early ordinary movement; pet `postmov`→`mintrap` (D-0018); mfndpos `ALLOW_TRAPS` (D-0019); `OPENDOOR` gated on `nohands`/`verysmall` (D-0020); **`m_avoid_kicked_loc`** in `mon.js` (D-0032; not yet wired into hostile `m_move`); **`postmov` final `newsym(mx,my)`** (D-0039); **`mfndpos` BOULDER/`ALLOW_ROCK` + `NODIAG`** (D-0060); **`dochug` MMOVE_MOVED→ranged fall-through** (D-0105); **hostile `m_move`→`postmov` + `mfndpos` known-trap skip** (D-0151); **`set_apparxy` Displacement/Invis/Underwater** (D-0154; cloak otyp for EDisplaced; omit `oc_oprop`/`can_fog`/DRAWBRIDGE `SURFACE_AT`); **`postmov` door open/unlock/smash + UnblockDoor + monhaskey/mb_trapped** (D-0159); **`m_move` meating countdown before `dog_move`/approach + pet `mtrapped`** (D-0169); **`tunnels`/`needspick` + `ALLOW_DIG` mfndpos rockok/treeok/thrudoor + `postmov`→`mdig_tunnel`** (D-0178); **`m_digweapon_check` + hero-square MMOVE_NOTHING** (D-0180); **`haseyes`/`can_track`; hostile `should_see`+`gettrack` (D-0181)**; `throws_rocks`/`passes_walls` helpers; omit `m_can_break_boulder`, pool/lava/garlic/`bad_rock` squeeze/temple/iron bars/`ALLOW_WALL`, Sokoban push-avoid body, balks/shortsighted in hostile `m_move`; **`m_search_items`/`mon_would_take_item` getitems loot gg** (D-0182); **underfoot MMOVE_DONE skip + peaceful `can_carry`** (D-0183; omit restore underfoot `return TRUE`+`postmov`→`mpickstuff`/`searches_for_item`/shop/`hides_under`/`onscary`/`costly_spot`/prizes/`can_touch_safely` body/`mon_would_consume`); dog_move digweapon; vampshift fog door sequencing; iron bars; engulfing_u; shop `add_damage`; `has_magic_key` disarm; `is_rider` unlock; full mondied from `mb_trapped`; `hides_under` `rn2(10)`; `finish_meating` mimic AP; peaceful shop/temple dig avoid; cursed-mwep dig-tool gate |
| `src/mondata.c` trap memory | `js/monsters.js` | partial | **`mon_knows_traps`/`mon_learns_traps` `mtrapseen`** (D-0151); omit `mons_see_trap` sight fan-out |
| `src/spell.c` | `js/spell.js` | partial | **`initialspell` + `spl_book` + `age_spells` + `dovspell` VIEW** (Fail%/Retention via `percent_success`/`spellretention`; D-0129); **`skill_based_spellbook_id`** (D-0132); **`Z`/`docast`/`getspell` CAST + `spelleffects_check` + SPE_HEALING self-zap** (D-0135); **`study_book` blank + known-refresh yn + delay/too_hard + begin-memorize** (D-0136); omit occupation/`learn`, novel/tribute, dull sleep, `cursed_book`/`confused_book`, swap/sort, other `spelleffects` otyps / directional `weffects`, traditional getspell yn, wizard turns column, CQ_REPEAT/spell_backfire/amulet drain |
| `src/mhitu.c` / `src/mthrowu.c` / `src/weapon.c` / `src/muse.c` / `src/potion.c` | `js/mhitu.js`, `js/mthrowu.js`, `js/weapon.js`, `js/muse.js`, `js/potion.js` | partial | **`mattacku` AT_WEAP ranged `thrwmu` + melee HTH/`hitmu`/`hitmsg`/`mdamageu`** (D-0105/D-0106); **`get_mattk` ← extracted `mattk[]` + AT_WEAP=254** (D-0179); **`mon_wield_item` NEED_PICK_AXE/AXE/PICK_OR_AXE** (D-0180); **`select_rwep`/`monmulti`/`m_throw`/`thitu`/`should_mulch`**; **`canseemon`=`cansee`/`infrared`+`mon_visible`; `thitu` `an`/`exclam`/miss; `monshoot` `an(singular)`** (D-0119); **`find_offensive`/`use_offensive` MUSE_POT_* throw + `m_throw` POTION→`potionhit`/`bottlename`/`potionbreathe` + flight `observe_object`→`makeknown`/`exercise(A_WIS)`** (D-0184); melee `OC_WSDAM` stand-in (D-0107); **`skill_init` + `#enhance`/`add_skills_to_menu` PICK_NONE paged** (D-0122); **spelspec `unrestrict_weapon_skill` + `skill_based_spellbook_id`** (D-0132); omit muse wand/horn/scroll/camera; mon-target `potionhit`; `getmattk` substitutions; `hitval`/`mswings`, polearm/spit/breath/gulp/AT_MAGC, `ohitmon`, catch `hold_another_object`, racial multishot, HTH `select_hwep`, weld/artifact_light wield msgs, extractor `oc_wsdam`/`oc_wldam`, knockback hurtle; `mshot_xname` Nth; `obj_is_pname`/`the()`; enhance `can_advance`/`skill_advance`→spellbook-id/wizard speedy |

| `src/dog.c`, `src/dogmove.c` (+ `steal.c` relobj) | `js/dog.js`, `js/dogmove.js` | partial | Starting-pet subset; **`makedog` role petnames + `christen_monst`** (D-0079); **`initedog` `u.uconduct.pets++`** (D-0125); **`keepdogs`/`losedogs`/`levl_follower`/`mon_arrive` With_you** (D-0149); **pickup/drop plines use `Monnam` MGIVENNAME** (D-0095); CORPSE age→POISON + `cursed_object_at` in `dog_goal` (D-0015); `dog_move` uncursedcnt/`cursemsg` pline (D-0017/D-0019); `m_cansee` in `find_targ` (D-0018); `dog_invent` `mpickobj`+drop RNG + tseen `rn2(40)` (D-0019); `splitobj` when `carryamt != quan` (D-0028); **pet `relobj`/`mdrop_obj`** (D-0029); **`in_masters_sight = couldsee`** (D-0030); **`m_avoid_kicked_loc`** (D-0032); **drop/pickup plines gated on `cansee`** (D-0038); **`mdrop_obj`→`stackobj`** (D-0094); **`mtrack` skip → C `goto nxti`** (D-0098); **edible `newdogpos`→`dog_eat` (re-`dogfood` + `delobj`)** (D-0168); **`finish_meating` stub** (D-0169); omit full `dog_nutrition` cwt/cnutrit tables, bee jelly/rust spit/unpaid shop, `dog_invent` eat-return path, wantdoor `view_from` do_clear_area (FARAWAY→hero fallback), `flooreffects`, vault-guard gold, worn/saddle/shop extrinsics; pony `put_saddle_on_mon`/`see_monster_closeup`; seed1500 RNG complete (D-0021); **`dog_goal` gettrack/ogoal** (D-0099); seed0017 RNG **full** after `#pray` (D-0101); seed0106 @2993 post-kill `dog_goal` next |
| `src/uhitm.c`, `src/mhitm.c` | `js/uhitm.js`, `js/mhitm.js` | partial | **`do_attack` hostile → `overexertion`/`hitum`/`known_hitum`/`hmon`/`xkilled`** (D-0107); **`hmon_hitmon_msg_hit` skip melee hit when destroyed** (D-0119); **`mondead`→`relobj_on_death` minvent** (D-0108); **`mvitals.died++`** (D-0126); **`xkilled` → `experience`/`more_experienced`/`newexplevel`** (D-0130); pet safemon displace; **`mondead`/`newsym` on kill** (D-0037); **mhitm `mondied`→`make_corpse` ordinary default_1** (D-0167); **unarmed `hmon_hitmon_stagger` `rnd(100)` gate** (D-0170); **`xkilled` corpse/`mkobj` treasure still deferred** (burns `corpse_chance` + `!rn2(6)`); omit stun pline/`mhurtle_to_doom`, martial `rnd(4)`, `dbon`/skill dmg_recalc, `attack_checks` invis/mimic/peaceful yn, Cleaver/twoweapon/`double_punch`, full `hitval`/`weapon_hit_bonus`/`P_SKILL`/`dbon`, live knockback, `passive`; surviving-hit `canseemon?exclam`; thrown multishot hit-when-destroyed; vault-guard gold / flooreffects on death-drop; xkilled murder/peaceful luck/`adjalign` |
| `src/teleport.c` | `js/teleport.js` | partial | Placement helpers + **`enexto_gpflags`** (D-0034); **`rloc_to`** (D-0149); not complete teleport system |
| `src/mon.c` `mnexto` | `js/mon.js` | partial | **`mnexto` via enexto+rloc_to** (D-0149); omit mon_telecontrol / overcrowding limbo |

Production comments in several of these files still describe behavior as
"enough for seedXXXX" or "not needed for seedXXXX." Treat those as explicit
evidence of `partial`, and generalize them from C when touching the function.

## Known constitutional debt

These are not protected merely because the two green sessions exercise them:

| JS area | Debt to replace from C |
|---|---|
| `js/jsmain.js` capture hook | Detects Count/`--More--` text and repairs cursor at capture time; cursor semantics belong in input/display code |
| `js/display.js` message paths | Contains scenario-derived cursor/layout special cases rather than complete window/message policy |
| `js/eat.js` | Cookie + reqtime-1 `touchfood`/`fprefx` (D-0155); multi-turn occupation still deferred |
| `js/invent.js` | Corner invent + disco `*`/encounter + `obj_typename` (D-0040); ^X autopickup/limits/`weapon_descr` (D-0041); **Samurai disco + invent `observe_object`** (D-0079); **^X gender omit + Attributes MC warded** (D-0097); **^X moon/friday13 + 23-row continuous page** (D-0158); fullscreen invent and full magic enlightenment deferred |
| `js/u_init.js` / `js/roles.js` | Rogue/Tourist/Wizard/Priest/Knight/Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/**Caveman** + human/orc(/elf/dwarf/gnome) race kits (D-0027/D-0042…/52); pantheon gods + C roles[] order; **race `hpadv`/`enadv` table** (D-0036); **roles `xlev` copied to `game.urole`** (D-0061); helm/gloves/boots/shield wear + Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class`/`HJumping`/`Japanese_item_name`/`is_ammo`/`is_launcher`/`is_spear`; Caveman FLINT/ROCK quiver; **`oc_skill`/`a_ac`/`oc_level` extracted**; dagger `knows_class` can migrate; **`skill_init` via `u_init_skills_discoveries`** (D-0122; Skill_T/R + all roles); **roles `spel*` + `initialspell`/`age_spells`/`dovspell` VIEW** (D-0129); **`skill_based_spellbook_id` + spelspec unrestrict** (D-0132); **`docast` SPE_HEALING** (D-0135); omit swap/sort/other cast otyps/`oc_charged` |
| `js/allmain.js` | Welcome/HP/align no longer Tourist-literal; **`regen_hp` once-per-turn** (D-0035); tutorial, hunger, sound, and attribute checks still have deferred branches |
| `js/mon.js` / `js/monmove.js` / `js/dogmove.js` | Monster flags, movement predicates, targeting, carrying, and combat have named stubs/defaults |
| `js/mklev.js` / `js/mkobj.js` / `js/makemon.js` | Many terrain/object/monster-type branches remain scenario-limited |

When editing one of these areas, replace the narrow behavior with its C
semantic unit and run a non-target cohort. Do not preserve a trace-derived path
solely to keep a Tourist seed green.

## Major absent or scaffolded systems

This is a planning list, not an exhaustive C file inventory:

- complete role/race/gender/alignment initialization and skills;
- hero-versus-monster and monster-versus-hero combat;
- traps, riding, travel partial (`_` cancel + adjacent/greedy; full
  TEST_TRAV/GUESS/travelmap deferred); prayer partial (`#pray` p_type 0 + angrygods 0–3);
  chat partial (`#chat` wall/SDOOR/statue + MS_BARK; other MS_*/shop/priest deferred);
- kicking beyond empty-space/`kick_dumb`/`kick_door` CLOSED bust
  (monsters, objects, SDOOR/SCORR, furniture, martial/shop-town);
- apply beyond lock-pick no-door (containers, other tools);
- potions, scrolls, wands, spells, equipment, artifacts;
- shops/priests/vault guards and billing;
- level transitions, branches, quests, and special levels;
- pure-JS Lua 5.4 runtime plus `nh.*` bindings;
- save/restore, bones, record/topten through frozen storage;
- properties, timeout/status effects, polymorph, death/lifesaving;
- hallucination and display RNG;
- animation-frame parity.

## Scaffolding retirement

`js/fastforward.js` contains only empty exported hooks. No RNG replay entries
remain. Next cleanup is to remove callers/imports and then delete the empty
module when that can be done without changing behavior.

Live scores, green anchors, objectives, and commands belong only in
`PROGRESS.md`.
