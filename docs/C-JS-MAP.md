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
| `tty_nhgetch` boundary | `js/input.js`, `js/jsmain.js` | partial | Boundary capture passes two Tourist sessions; capture hook still repairs Count/`--More--` cursor instead of deriving it entirely from display semantics |
| core RNG wrappers | `js/rng.js` | partial | Green paths match; **`rnl` ported** (D-0059; Luck bias + internal `rn2` log); `rn1` is a macro over logged `rn2`; display-stream wrappers still absent |
| Lua RNG bindings/provenance | — | absent | `nh.rn2`/`nh.random` must consume core; patch 004 adds Lua callsite provenance, not a third ISAAC stream |
| display/hallucination RNG | — | absent | No hallucination parity |
| per-segment contestant API | `js/jsmain.js` | partial | Fresh game and shared storage binding implemented; save/bones gameplay users are absent |

## Startup and character creation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/options.c` | `js/options.js` | partial | Enough options for current Tourist paths; full rc/keybind/symset semantics incomplete |
| `src/role.c` | `js/roles.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** identity/attrs/`hpadv`/`enadv`/`neminum`; **`initrecord` matches C** (Caveman/Valkyrie/Priest/Tourist/Wizard **0**; others **10** — D-0056); **`xlev` on all roles + copied to `game.urole`** (D-0061); **all roles pantheon gods** + C roles[] order (Rogue before Ranger) for `randrole`; `role_init` pantheon + SPE_LIGHT + nemesis gender; `Hello`/`align_*`; **all races `hpadv`/`enadv` + attrmin/attrmax** (D-0036); full `role_init` beyond pantheon/SPE_LIGHT/nemgend deferred |
| `src/u_init.c:u_init_role` | `js/u_init.js` | partial | Tourist + Rogue + Wizard + Priest + Knight + Samurai + Healer + Valkyrie + Ranger + Monk + Archeologist + Barbarian + **Caveman** cases (D-0052); Rogue `knows_class` still uses named P_DAGGER otyps; Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class` walks `bases[]` (Barb/Valk exclude polearms; Ranger: launchers/ammo/spears; Monk: armor only + SHURIKEN); Samurai `Japanese_item_name` pre-discovery; Healer `umoney0=rn1(1000,1001)` + `POT_FULL_HEALING` know; Valkyrie/Barbarian Lamp `!rn2(6)`; Monk `M_spell[rn2(90)/30]` + Magicmarker/`!rn2(4)` else Lamp; Archeologist Tinopener/`!rn2(10)` else Lamp/`!rn2(4)` else Magicmarker/`!rn2(5)` + SACK/TOUCHSTONE knows; Barbarian `rn2(100)>=50` kit pick; Caveman `Cave_man[]` only (club/sling/flint/rock/leather); `ini_inv_use_obj` quivers FLINT/ROCK; graystone quan=1 except FLINT; `Skill_W`/`Skill_P`/`Skill_K`/`Skill_S`/`Skill_H`/`Skill_V`/`Skill_Ran`/`Skill_Mon`/`Skill_A`/`Skill_B`/`Skill_C` for filter; `skill_init` / `initialspell` deferred |
| `src/u_init.c:u_init_race` | `js/u_init.js` | partial | Human no-op; orc `Xtra_food` + knows; elf instrument+knows; dwarf knows; gnome no-op (D-0027); `ini_inv_obj_substitution`/`inv_subs` ported; **`ini_inv_mkobj_filter` reject list + `oc_level`/`Skill_*` incl. `Skill_C`** (D-0042…/52) |
| `src/u_init.c:u_init_misc` | `js/u_init.js` | partial | `newhp`/`newpw` at ulevel 0; **`adjabil(0,1)`** role/race L1 intrinsics (D-0058); rc align → `ualign`; handedness RNG; many u fields still absent |
| `src/attrib.c:newhp` / `src/exper.c:newpw` | `js/attrib.js`, `js/exper.js` | partial | **Init + level-up** (lornd/hirnd + Con; `enermod`/`rn1`) (D-0061); `pluslvl` HP/EN/level/`adjabil` (omit achievements/`newuexp`/Upolyd); `uhpinc`/`ueninc` stored |
| `src/attrib.c` (attrs) | `js/attrib.js` | partial | Initial attr paths; `change_luck` clamp; **`adjabil`/`role_abil` + Fast/Very_fast** (D-0058); **`Searching()`** (D-0062); **gainstr You_feel on level-up** (D-0061); **`acurrstr` exported** (D-0059); omit lose plines, `postadjabil`, `add_weapon_skill`; `u_init_carry_attr_boost` stubbed |
| `src/allmain.c:welcome` / `role.c:Hello` | `js/allmain.js` | partial | New-game welcome from Hello+align+gender+race+role; `flush_topl_more` before tutorial; restore path deferred |
| `src/allmain.c:moveloop_preamble` | `js/allmain.js` + `js/calendar.js` | partial | Moon/friday plines + `change_luck`; pickup/encumber/engraving deferred |
| `src/o_init.c` | `js/o_init.js` | partial | Green-session shuffle/discovery evidence; `discover_object` encounter flag + `interesting_to_discover` via extracted `objectDescrs` (D-0040); not audited across all classes |
| `src/dungeon.c`, `dat/dungeon.lua` | `js/dungeon.js`, generated dungeon data | partial | Topology subset; not a replacement for executing upstream Lua |
| tutorial / quest pager | `js/allmain.js`, `js/questpgr.js`, `js/invent.js` | partial | Legacy `%d`/`%G` + corner NHW_MENU without `clearScreen` (D-0026); **`maxcol=strlen+1` + leading pad / text at offx+1** (D-0071); **H2344_BROKEN offx** (D-0078); tutorial corner (D-0023); invent corner (D-0024); yes-path / pauper_legacy deferred |
| `src/insight.c` enlightenment | `js/invent.js` | partial | Autopickup from flags + race attr limits + `weapon_descr`/`skill_name` via `oc_skill` (D-0041); pantheon/wallet/handedness (D-0024); shop `costly_spot` disable / `apelist` / enhance / P_SKILL table / odd-skill P_NAME deferred |
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
**370**/11405; RNG **91380**/792838.
Next peel: seed2200 map `` ` `` vs `x` / seed0017 @ 3132
`dog_move` (terrain at (30,4)) / seed1150 `dog_move` /
`getbones` (blocked on `^V`/`makemaz`) / `wipeout_text` /
`lspo_map` / pony `next_ident` / `maybe_smudge_engr`.
`make_corpse` body and `m_initinv` body still absent (named omissions).

## Data and world generation

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `include/objects.h` | extractor + `js/generated/objects_data.js` | partial | Reproducible table; **`objectDescrs`/`objectNameStrs`** (D-0040); **`oc_skill`/`oc_subtyp`** (D-0041); **`a_ac`/`oc_level`** (D-0042); **`oc_delay`** (D-0066); still no `oc_charged`/`oc_oprop` (`is_multigen`/`is_poisonable`/doname charged name-list stand-ins) |
| `include/monsters.h` | extractor + `js/generated/monsters_data.js` | partial | `has_at_weaps` from AT_WEAP; `mflags1` extracted (D-0020 `nohands`); **`mcolors` extracted** (D-0022 corpse `mon_color`); **`mflags3` extracted** (D-0039 INFRAVISION/VISIBLE); **`LVL(..., A_NONE)` parsed** (D-0053 Wizard difficulty); poisonous/acidic/carnivore predicates still underused; full mattk still underused |
| rumor sources | extractor + generated rumors | partial | Fortune path exercised |
| `include/artilist.h` | extractor + `js/generated/artifacts_data.js` + `js/artifact.js` | partial | **name/otyp/spfx/align/role/race** (D-0064); **`retouch_object` + touch gate** (D-0065); omit attk/defn/cary/inv/cost/color gen_spe; `bane_applies`/blast `d()`/`losehp`/wield intrinsics |
| `src/mondata.c` `name_to_monplus` | `js/mondata.js` | partial | **PM_* string + grey dragon alts** (D-0064); omit full alt_spl/rank titles/plural edge cases |
| `src/mkobj.c` | `js/mkobj.js` | partial | Creation/merge/weight subsets; `add_to_buried` (D-0014); `start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); `is_poisonable`≡missiles (D-0012); starting SACK/`mkbox_cnts` (D-0013); **`splitobj`** quan/owt + floor chain + `next_ident` (D-0028); **`obj_extract_self` MINVENT** (D-0029); **`SPBOOK_no_NOVEL` → `rnd_class`…`SPE_BLANK_PAPER`** (D-0055); **CORPSE `undead_to_corpse` + `G_NOCORPSE` retry** (D-0057); **EGG `can_be_hatched` multi-retry** (D-0068); **Samurai lacquered `SPLINT_MAIL`** (D-0079); omit `nextoid` shop-price search, unpaid/`splitbill`, timers/light/`copy_oextra`, invent/contained extract, `zombie_form`/zombify, TIN `cnutrit` gate, timer fire, `permapoisoned`, hatch timers, `In_quest` lacquer |
| `src/mon.c` `undead_to_corpse`/`can_be_hatched` | `js/mon.js` | partial | **`undead_to_corpse`** zombie/mummy/vampire map (D-0057); **`can_be_hatched`/`dead_species`** + BREEDER_EGG (D-0068); omit `egg_type_from_parent`, genus/other mon.c helpers |
| `src/mondata.c` growth | `js/mondata.js` | partial | **`little_to_big`/`big_to_little`** grownups table (D-0068); name_to_mon; omit `big_little_match` multi-step walks beyond one step |
| `src/makemon.c` | `js/makemon.js` | partial | Ordinary `is_armed`/`m_initweap`/`mongets`/`m_initthrow` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/S_HUMANOID + default); **`add_to_minv` uses `OBJ_MINVENT`** (D-0029); **`makemon_rnd_goodpos` + null-ptr `rndmonst` order + `m_initgrp`/`G_SGROUP`** (D-0034); **`mkclass`/`mkclass_aligned`/`init_mongen_order`/`mk_gen_ok`/`is_placeholder`** (D-0053); **`peace_minded` co-align path uses real `ualign.record`** (D-0056); omit MS_LEADER/GUARDIAN/NEMESIS/ERINYS/`race_*`/`is_minion`/amulet arms; **`align_shift`/`temperature_shift` stubbed 0**; **`m_initinv` body absent** (tail-only); omit `throws_rocks` Sokoban first-try, S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials, `add_to_minv` merge, demon→default FALLTHROUGH, `set_malign`; `ndemon`/aligned `mkclass` callers unaudited |
| `src/mklev.c` | `js/mklev.js` | partial | Ordinary level path substantial; mineralize bury-vs-place (D-0014); `mktrap_victim` place_object ammo/possessions (D-0016); **`set_wall_state`/`xy_set_wall_state`** (D-0038); **`makeniche` → real `mkclass(S_HUMAN)`** (D-0053); supply-chest **`SPBOOK_no_NOVEL`** (D-0055); omit `mkgrave_room` bury, `begin_burn`, special rooms/edge cases; seed0060 @ 2997 was **not** corridor typ (D-0032) |
| `src/vision.c` | `js/vision.js` | partial | Algorithm subset; `clear_path`/`m_cansee` exported for pet rays (D-0018); **`couldsee` wired into `dog_goal`** (D-0030); **`cansee` used by `makemon_rnd_goodpos`** (D-0034); broad FOV/detection states unaudited |
| `src/trap.c` | `js/trap.js` | partial | Monster dart path: `t_at`/`t_missile`/`thitm` miss pline/`mintrap`/`seetrap` (D-0018–D-0019); **`maketrap` + `choose_trapnote` + `hole_destination`/`dng_bottom`** (D-0054); omit overwrite/furniture/statue/boulder/shop/terrain morph, other trap types, hero `dotrap`, hit/`dmgval` |
| runtime `dat/*.lua` + `nhlua.c`/`sp_lev.c` | — | absent | Production requirement; generated dungeon structure is only a scaffold |

## Turns, commands, and display

| C source | JS | Status | Evidence / known omissions |
|---|---|---|---|
| `src/allmain.c` | `js/allmain.js` | partial | Basic move loop and hunger/sound subsets; **`mvitals.mvflags = geno & G_NOCORPSE` at newgame** (D-0057); **`maybe_generate_rnd_mon` → real `makemon(NULL,0,0)`** (D-0034); **`regen_hp` + once-per-turn call** (D-0035); **`u_calc_moveamt` Fast/Very_fast `rn2(3)`** (D-0058); **Searching EOT → `dosearch0(1)`** (D-0062); **`multi < 0` occupation + `unmul`/`afternmv`** (D-0066); **`go.occupation` tick before rhack** (D-0076); omit steed `mcalcmove` path / full `youmonst.data->mmove` via `set_uasmon`; `regen_pw`/Teleport/Poly once-per-turn RNG; Upolyd eel hp-loss rolls; Regeneration/Sleepy props; warnreveal; `monster_nearby` stop_occupation |
| `src/detect.c` `dosearch0`/`findit`/`do_mapping` | `js/detect.js` | partial | **8-neighbour SDOOR/SCORR/trap find + fund (lenses)** + `find_trap` message (D-0062); **`findit`/`findone` SDOOR/SCORR/unseen traps + hero `do_clear_area`** (D-0074); **`do_mapping`/`show_map_spot` hero_memory + `magic_map_background`** (D-0075); omit feel_location/Blind/unmap_invisible, mfind0 body, Hallucination/cls wait, activate_statue_trap, artifact SPFX_SEARCH, cmd_safety_prevention; findone flash/mimic/hider/invis/chest-trap/trapped-door; browse_map/unconstrain/notice_mon; room_discovered; trap/engraving restore after furniture |
| `src/cmd.c` / `src/do.c` / `src/hack.c` lookaround | `js/cmd.js`, `js/do.js`, `js/getline.js`, `js/wizcmds.js`, `js/zap.js`, `js/read.js`, `js/engrave.js`, `js/pager.js`, `js/getpos.js` | partial | Movement/search/apply/kick/wait and selected UI/item commands; Ctrl-D → `dokick` (D-0031); **`.` → `donull`** (D-0033); **autoopen walk-into → `doopen_indir`** (D-0059); **`#` → `doextcmd`/`#levelchange`/`#name`** (D-0061/D-0069); **`s`/`continue_search` → `dosearch`** (D-0062); **`T` → `dotakeoff`** (D-0063); **`^W` → `wiz_wish`/`makewish`** (D-0064); **`w` → `dowield`** (D-0065); **`W` → `dowear`** (D-0066); **`P` → `doputon`** (D-0067); **`'f'` → `dofire` + CQ_CANNED fireassist** (D-0069); **`help_dir`/`show_direction_keys` NHW_TEXT for getdir** (D-0071); **`lookaround` run==1 corridor-turn** (D-0072); **`'q'` → `dodrink`** (D-0073); **`'z'` → `dozap` NODIR secret-door/`findit`** (D-0074); **`'r'` → `doread` SCR_MAGIC_MAPPING/`do_mapping`** (D-0075); **`'E'` → `doengrave` fingertip DUST/`make_engr_at`** (D-0076); **`'/'` → `dowhatis`; `'?'` → `dohelp`** (D-0077); omit Blind/traps/pools/NODIAG/`mon_visible`/AIR-ICE/run==2 widen; full `extcmdlist`, `losexp` drain, `cmd_safety_prevention`, `rest_on_space`, interactive `o`, `#wizwish`, help_dir Guidebook/`^letter`/nodiag; IMMEDIATE/RAY zap; other `seffect_*`/`study_book`; non-hands stylus / multi-turn dulling / engraving glyphs |
| `src/potion.c` | `js/potion.js` | partial | **`dodrink`/`dopotion`/`peffect_oil`** uncursed/cursed unlit (D-0073); omit other `peffect_*`, Strangled, fountain/sink/underwater, milky/smoky bottles, lit-oil burn, worn-stack split, `more_experienced`, getobj `?`/`*` |
| `src/zap.c` `dozap` | `js/zap.js` | partial | **`dozap`/`zappable`/`weffects`/`zapnodir`/`learnwand`** NODIR `WAN_SECRET_DOOR_DETECTION` → `findit` (D-0074); `makewish` subset (D-0064); omit IMMEDIATE/RAY/`bhit`/`ubuzz`/`zap_dig`/`zapyourself`; other NODIR; `backfire` body; wrest pline; `check_capacity`/`nohands`/`check_unpaid`; `more_experienced`; `update_inventory` |
| `src/read.c` `doread`/`seffects` | `js/read.js` | partial | **`doread` getobj-read + SCR_MAGIC_MAPPING `seffects`/`seffect_magic_mapping` + learnscroll/useup** (D-0075); omit other `seffect_*`, `study_book`, fortune/shirt/credit/marker/coin/orb/candy, Blind Braille, nommap/`make_confused`, `trycall`, `can_chant`, `check_capacity`, SPE_MAGIC_MAPPING |
| `src/engrave.c` `doengrave`/`make_engr_at` | `js/engrave.js` | partial | **`doengrave` fingertip DUST getlin + mix-up + occupation `make_engr_at` Elbereth WIS** (D-0076); omit wand/weapon/marker/towel/gem/ring stylus; grave/altar/jello; add-to/overwrite; multi-turn dulling; engraving glyphs; `u_wipe_engr` body |
| `src/pager.c` `do_look`/`dowhatis`/`dohelp`/`checkfile` | `js/pager.js`, `js/getpos.js` | partial | **`/` whatis menu + getpos tip + invent/name/list branches; `?` help + About `get_lua_version` nhlib shuffle; data.base/`dat/*` paging** (D-0077); omit full `do_screen_description` glyphs; tty NHW_TEXT geometry parity; `whatdoes`/dokeylist/option_help/contact bodies; PORT_HELP; getpos menu-jump/hilite; lootabc true |
| `src/getpos.c` `getpos` | `js/getpos.js` | partial | **hjkl cursor + `.` LOOK_TRADITIONAL + ESC + first-use tip** (D-0077); omit menu jump, hilite, valids, quick modes beyond stub |
| `src/version.c` `doextversion` / `nhlua.c` `get_lua_version` | `js/pager.js` | partial | **first About → nhlib `shuffle(align)`** (D-0077); version/options text approximate; full OPTIONS_USED dlb parse deferred |
| `src/wield.c` | `js/wield.js` | partial | **`dowield`/`ready_weapon`/`setuwep`/`welded`** + getobj letter/`-` (D-0065); **`doswapweapon`/`setuswapwep`/`ammo_and_launcher`** (D-0069); omit `cantwield` poly, `cant_wield_corpse`, bimanual+shield, weld pline body, quiver ynq, count-split, `arti_speak`/`artifact_light`, `pushweapon`, full `setworn` props |
| `src/do_wear.c` | `js/do_wear.js` | partial | **`dotakeoff`** (D-0063) + **`dowear`/`canwearobj`/`accessory_or_armor_on`/`setworn`/`Armor_on` + delay-0 `on_msg`/`unmul`** (D-0066) + **`doputon`/`Amulet_on` + ring-hand yn + amulet/eyewear put-on** (D-0067); omit Ring_on learnring/attribs, Blindf_on specials, amulet change/strangle/sleep/flying/breathing, ring Glib/cursed-gloves/weld, doff `oc_delay` occupation, magic helms beyond fedora, `dragon_armor_handling`, `setworn` oc_oprop props, poly/weld/trap gates, `A` takeoffall |
| `src/objnam.c` `readobjnam` | `js/readobjnam.js`, `js/objnam.js` | partial | **wish subset:** prefixes + `name_to_monplus` dragon mail + `rnd_otyp_by_namedesc`/`wishymatch` + artifact_name + BUC/spe + oname (D-0064); doname empty/wield/swapwep/potion/implicit-uncursed (D-0024); CORPSE `corpsenm` (D-0019); **COIN quan=1 `"a gold piece"`** (D-0037); **`Japanese_item_name` table** for Samurai discovery (D-0045); **Japanese display in doname/`obj_typename`/`disco_typename` + ya plural + quiver + rustproof** (D-0079); doname `named`; **`xprname` `dot` for prinv** (D-0070); omit fruits/traps/terrain/random/`o_ranges`/alt spellings/Japanese wish; full erosion proofs beyond rustproof |
| `src/invent.c` `hold_another_object` | `js/invent.js` | partial | **artifact touch + addinv + prinv** (D-0064); **prinv `xprname(..., dot)`** (D-0070); **`observe_object` in invent_lines** (D-0079); omit fumbling/encumbrance-drop/autoquiver/fatal-corpse; xname-path observe beyond invent |
| `src/do_name.c` `oname` / `docallcmd` | `js/do_name.js` | partial | **artifact oname/`artifact_exists`** (D-0064); **`docallcmd` menu + cancel/floor stubs** (D-0069); **`christen_monst` + tame `x_monnam` subset** (D-0079); omit invent/floor getobj/getpos bodies, full x_monnam, literate/shop/intrinsic side-effects |
| `src/dokick.c` | `js/dokick.js` | partial | `dokick` + `kick_dumb` (D-0031); `kickedloc` (D-0032); **`kick_ouch` → `losehp`** (D-0035); omit `kick_monster`/`kick_object`/closed-door Whammm/SDOOR-SCORR open/furniture/`martial`/`wake_nearby`/`u_wipe_engr`/`set_wounded_legs`/`kickstr` terrain names |
| `src/hack.c` `losehp`/`nomul` | `js/hack.js` | partial | **`losehp` !Upolyd / Upolyd mh subtract** (D-0035); **`nomul`/`unmul` + afternmv** (D-0066); `maybe_half_phys` identity until Half_physical prop; omit `showdamage`/`maybe_wail`/`done(DIED)` bodies; full `end_running`/`cmdq_clear` |
| `src/apply.c` / `src/lock.c` | `js/apply.js`, `js/lock.js` | partial | `doapply` + `pick_lock` (D-0021); exported `getdir` for kick/apply; getobj missing-letter `continue`+`flush_topl_more` (D-0025); **`doopen_indir` CLOSED autoopen** (D-0059); omit sack/other tools, real door occupation, interactive `o` getdir, `b_trapped`/autounlock, `feel_location` mapseen gating, container-at-feet |
| `src/display.c` `newsym` / map | `js/display.js` | partial | Floor `vobj_at` + class symbols + CORPSE `mon_color` (D-0022); **live `mon_glyph` uses `mcolors[mnum]`** (D-0036; newt yellow); **`wall_angle` + seenv** (D-0038); upstairs `<` yellow / downstairs `>` NO_COLOR (D-0038); **`see_with_infrared`/`mon_visible` when `!cansee`** (D-0039; race Infravision via `mons[urace]`); **full MONSYM `MLET_CH` + FOUNTAIN/SINK/THRONE/ALTAR/GRAVE terrain** (D-0070); **`magic_map_background`** (D-0075); omit traps/engravings/hallucination/`see_objects`; telepathy/`Detect_monsters`/`MATCH_WARN_OF_MON`; full `set_uasmon`/uprops; pool/lava/ice/air/cloud terrain |
| `src/questpgr.c` / tty menu | `js/questpgr.js` | partial | **legacy corner NHW_MENU `maxcol=strlen+1` + leading pad** (D-0071); **H2344_BROKEN offx** (D-0078); omit other pager outputs / pauper_legacy |
| `src/invent.c` `look_here` / `dfeature_at` | `js/invent.js`, `js/mklev.js` | partial | Stairs via `stairs_description` + Dlvl1 `u_traversed` (D-0026); doors/fountain/sink stubs; Blind feel, engraving, multi-object menu, `doname_with_price` deferred |
| `src/pline.c` / tty message behavior | `js/display.js`, `js/input.js` | partial | `--More--` works for green paths + getobj re-prompt (D-0025); full message/window policy incomplete |
| `src/invent.c` | `js/invent.js` | partial | Corner NHW_MENU invent (D-0024); disco inv_order + `*`/encounter + `OBJ_DESCR`/`obj_typename` (D-0040); **Samurai `interesting_to_discover`/`disco_typename`/`discover_object` gate** (D-0079); fullscreen invent path deferred |
| `src/eat.c` | `js/eat.js` | partial | Cookie/reject subset; getobj still single-shot (no missing-letter `continue`); ordinary eating/nutrition incomplete |
| `src/dothrow.c`, `src/zap.c:bhit` | `js/dothrow.js` | partial | Dart split/flight/landing; `throw_ok` SUGGEST coins+weapons + getobj loop (D-0025); **`dofire` + fireassist uswapwep swap via cmdq** (D-0069); **`getdir`/`help_dir` NHW_TEXT** (D-0071); **`throw_gold` body absent**; `doquiver_core`/find_launcher/polearm incomplete |
| `src/mon.c`, `src/monmove.c` | `js/mon.js`, `js/monmove.js` | partial | Early ordinary movement; pet `postmov`→`mintrap` (D-0018); mfndpos `ALLOW_TRAPS` (D-0019); `OPENDOOR` gated on `nohands`/`verysmall` (D-0020); **`m_avoid_kicked_loc`** in `mon.js` (D-0032; not yet wired into hostile `m_move`); **`postmov` final `newsym(mx,my)`** (D-0039); **`mfndpos` BOULDER/`ALLOW_ROCK` + `NODIAG`** (D-0060); `throws_rocks`/`passes_walls` helpers; omit `m_can_break_boulder`, pool/lava/garlic/`bad_rock` squeeze/temple/iron bars/`ALLOW_WALL`, non-pet postmov / `mon_knows_traps` / Sokoban push-avoid body |
| `src/dog.c`, `src/dogmove.c` (+ `steal.c` relobj) | `js/dog.js`, `js/dogmove.js` | partial | Starting-pet subset; **`makedog` role petnames + `christen_monst`** (D-0079); CORPSE age→POISON + `cursed_object_at` in `dog_goal` (D-0015); `dog_move` uncursedcnt/`cursemsg` pline (D-0017/D-0019); `m_cansee` in `find_targ` (D-0018); `dog_invent` `mpickobj`+drop RNG + tseen `rn2(40)` (D-0019); `splitobj` when `carryamt != quan` (D-0028); **pet `relobj`/`mdrop_obj`** (D-0029); **`in_masters_sight = couldsee`** (D-0030); **`m_avoid_kicked_loc`** (D-0032); **drop/pickup plines gated on `cansee`** (D-0038); omit food `newdogpos` eat, gettrack/FARAWAY when `!in_masters_sight`, `flooreffects`/`stackobj` merge, vault-guard gold, worn/saddle/shop extrinsics; pony `put_saddle_on_mon`/`see_monster_closeup`; **`mtrack` skip uses inner `continue` (should be candidate skip / C `goto nxti`)**; seed1500 RNG complete (D-0021); seed0060 **PASS** (D-0041); seed0700 **PASS** (D-0079) |
| `src/uhitm.c`, `src/mhitm.c` | `js/uhitm.js`, `js/mhitm.js` | partial | Narrow pet combat paths; **`mondead`/`newsym` on kill** (D-0037); **`make_corpse` body deferred** (still burns `corpse_chance`); general combat absent |
| `src/teleport.c` | `js/teleport.js` | partial | Placement helpers + **`enexto_gpflags`** (D-0034); not complete teleport system |

Production comments in several of these files still describe behavior as
"enough for seedXXXX" or "not needed for seedXXXX." Treat those as explicit
evidence of `partial`, and generalize them from C when touching the function.

## Known constitutional debt

These are not protected merely because the two green sessions exercise them:

| JS area | Debt to replace from C |
|---|---|
| `js/jsmain.js` capture hook | Detects Count/`--More--` text and repairs cursor at capture time; cursor semantics belong in input/display code |
| `js/display.js` message paths | Contains scenario-derived cursor/layout special cases rather than complete window/message policy |
| `js/eat.js` | Allowed-letter formatting, menu fallback, and eating are narrow subsets |
| `js/invent.js` | Corner invent + disco `*`/encounter + `obj_typename` (D-0040); ^X autopickup/limits/`weapon_descr` (D-0041); **Samurai disco + invent `observe_object`** (D-0079); fullscreen invent and magic enlightenment deferred |
| `js/u_init.js` / `js/roles.js` | Rogue/Tourist/Wizard/Priest/Knight/Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/**Caveman** + human/orc(/elf/dwarf/gnome) race kits (D-0027/D-0042…/52); pantheon gods + C roles[] order; **race `hpadv`/`enadv` table** (D-0036); **roles `xlev` copied to `game.urole`** (D-0061); helm/gloves/boots/shield wear + Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class`/`HJumping`/`Japanese_item_name`/`is_ammo`/`is_launcher`/`is_spear`; Caveman FLINT/ROCK quiver; **`oc_skill`/`a_ac`/`oc_level` extracted**; dagger `knows_class` can migrate; `skill_init` / `initialspell` / `oc_charged` deferred |
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
- traps, engraving, prayer, riding, chat, travel;
- kicking beyond empty-space/`kick_dumb` (monsters, objects, doors, furniture);
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
