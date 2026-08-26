# C→JS map — Data and world generation

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Data and world generation

Each entry is `C → JS — status`, then evidence (one map entry, wrapped).

### `include/objects.h`

JS: extractor + `js/generated/objects_data.js` — partial

Reproducible table; **`MAIL_STRUCTURES`→`SCR_MAIL` / `NUM_OBJECTS=481` (D-0848; 
Hallu `random_object` dim 463)**; **`objectDescrs`/`objectNameStrs`** (D-0040); 
**`oc_skill`/`oc_subtyp`** (D-0041); **`a_ac`/`oc_level`** (D-0042); **`oc_delay`** (D-0066); 
**`oc_big`/`oc_bimanual`** (D-0086); **`oc_wsdam`/`oc_wldam`** (D-0189); 
**`oc_cost`** (D-0447 shop bill / candle age units); 
still no extracted `oc_merge` bitfield (`oc_merge_of` class heuristic: SPELL/WAND mrg=0 — D-0679; 
D-0094); still no `oc_uses_known`/`oc_charged`/`oc_oprop` ( `mksobj` WAND uskn stand-in D-0316; 
`is_multigen`/`is_poisonable`/doname charged name-list stand-ins)

### `include/monsters.h`

JS: extractor + `js/generated/monsters_data.js` — partial

`has_at_weaps` from AT_WEAP; `mflags1` extracted (D-0020 `nohands`); 
**`mcolors` extracted** (D-0022 corpse `mon_color`); **`HI_LORD`→CLR_MAGENTA (5)** (D-0566; 
was wrongly 13); **`mflags3` extracted** (D-0039 INFRAVISION/VISIBLE); 
**`LVL(..., A_NONE)` parsed** (D-0053 Wizard difficulty); 
**full `mattk[]` extracted** (D-0130 experience + **D-0179 `get_mattk`**); 
**`bigmonst`/`thick_skinned`/`M1_THICK_HIDE`/`MZ_LARGE`** (D-0170); 
**M2 race bits HUMAN…ORC + UNDEAD/WERE/DEMON** (D-0172); 
**`pmnames[MALE/FEMALE/NEUTRAL]` from NAM/NAMS** (D-0173); **`M1_HUMANOID`/`humanoid`** (D-0194); 
**`MAIL_STRUCTURES`→`PM_MAIL_DAEMON` in extract (D-0606; SPECIAL_PM=330)**; 
**`msounds[]` / `mons().msound` C `monflag.h` SIZ sound (D-1053; 
`cry_sound` no longer always-chitter)**; poisonous/acidic/carnivore predicates still underused; 
HI_OBJ/HI_METAL extractor aliases still diverge from color.h

### rumor sources

JS: extractor + generated rumors — partial

Fortune path exercised

### `include/artilist.h`

JS: extractor + `js/generated/artifacts_data.js` + `js/artifact.js` — partial

**name/otyp/spfx/align/role/race** (D-0064); **`retouch_object` + touch gate** (D-0065); 
**attk+mtype extract + `spec_abon`/`spec_applies`** (D-0611; 
PHYS early + DMONS/DCLAS/DFLAG2/DALIGN + ATTK Magm/Stun `rn2`); 
**`spec_dbon`/`artifact_hit`/`attacks`/`is_art`** (D-0613; 
Grayswandir `max(tmp,1)` double + FIRE/COLD/ELEC `rn2` gates); 
**`artiname` / `discover_artifact` / `artidisco[]`** (D-1107; save/rest artidisco named); 
**`init_artifacts`/`hack_artifacts`** (D-1201; C `artifact.c:109–116`/`85–106`; 
`allmain.c:792` after `init_dungeons` before `u_init_misc`; 
gift-role align + Excalibur `!Knight` `role=NON_PM` + `urole.questarti` align/role; 
JS rebuilds artilist from generated raw for process-reuse; save/rest `restore_artifacts` named; 
`roles[].questarti` still 0 for roles that never copied it — gift loop still matches 
`role==Role_switch`); **`arti_reflects` + `set_artifact_intrinsic` SPFX_REFLECT W_WEP** (D-1342; 
C `artifact.c:537–550` / `:867–872`; muse.c `mon_reflects` MON_WEP between shield and amulet; 
hero `EReflecting&W_WEP`; zap/pray `ureflects` W_AMUL/W_ARM/dragon D-1353; 
cspfx extract / mcastu `ureflects` named — no artilist row has cspfx&SPFX_REFLECT); 
**`set_artifact_intrinsic` SPFX_WARN + MATCH_WARN D-1514** (C `artifact.c:824–839` 
`spec_m2` `:1065–1072` + `hack.h` `MATCH_WARN_OF_MON`; Sting/Orcrist `M2_ORC`, Grimtooth `M2_ELF` 
→ `EWarn_of_mon` + `warntype.obj` + `see_monsters`; else `EWarning`; display `sensemon`/`newsym` 
see_it / `display_warning` mon_to_glyph; cspfx W_ART MKoT/Orb of Fate / invent `W_ART` conferral / 
`see_wsegs` D-1529 / polyd·species producer / vision `howmonsseen` / `worm_known` named); 
**defn/cary extract + `defends`/`defends_when_carried` D-1453**; omit cost/gen_spe; 
**`inv_prop` extract + `arti_invoke` BLINDING_RAY D-1377**; 
**remaining specials + property toggle D-1488** (C `artifact.c` 
`invoke_healing`/`energy_boost`/`untrap`/`create_ammo`/`fling_poison`/`storm_spell` `:1779–2051` + 
switch `:2154–2172` + xor W_ARTI `:2178–2228`; 
live HEALING/ENERGY_BOOST/UNTRAP/LEV_TELE/ENLIGHTENING/CREATE_AMMO/FLING_POISON/FIRESTORM/SNOWSTORM 
+ CONFLICT/LEVITATION/INVIS; cost then switch); 
**`invoke_healing` first You_feel Blinded 0/1 D-1494** (C `youprop.h:92` / `artifact.c:1787`; 
not the HBlinded word; BlindedTimeout gates unchanged); 
**TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH D-1502** (C `invoke_taming`/`charge_obj`/`create_portal`/`banish` 
`:1768–2019` + switch; Palantir TAMING artilist `#if 0` still has the arm; 
zeroobj pseudo has no `oclass` so `tamedog` does not null the scroll path; 
callees `read.c` `seffect_taming`/`charge_ok`/`recharge`, `mon.c` `migrate_mon`, 
`dungeon.c` `dunlevs_in_dungeon`/`ledger_no`; zap AD_ELEC ring uses full `recharge`); 
**GETOBJ_ALLOWCNT count prefix D-1530** (C `invent.c` `getobj` `:1937–2088` + `splittable` `:1664`; live `js/invent.js` `getobj_take_count`/`getobj_apply_count`/`getobj_split_otmp`; charge/drop/throw/wield/ready/adjust clones; Palantir not a live artifact; canned CMDQ_INT / pickinv `&ctmp` / `finish_splitting`/`unsplitobj` / stash getobj / doorganize_core nobj-unsplit named); 
UNTRAP callee door force D-1495 (floor disarm_*/box named); 
`bane_applies`/blast `d()`/`losehp`/other wield intrinsics; `defended`; DFLAG1; 
hero/mon elemental resists; destroy_items/ignite; Mb_hit; SPFX_BEHEAD/DRLI; wake_nearto

### `src/mondata.c` `name_to_monplus` / `monstseesu`

JS: `js/mondata.js` — partial

**pmnames[MALE/FEMALE/NEUTRAL] longest match + gender out** (D-0173); 
grey dragon alt_spl subset (D-0064); **`name_to_monclass` letter/explain/truematch then 
`name_to_mon`** (D-1098; `create_particular` class-letter still named); 
**`monstseesu`/`monstunseesu`/`m_seenres` + makemon `seen_resistance`** (D-0235; 
omit buried `m_canseeu`/other M_SEEN_* muse gates/`monstunseesu_prop`); 
**`hates_silver`/`mon_hates_silver` D-1254** (`js/monsters.js`; 
C `mondata.c:524–528`/`517–519` were / S_VAMPIRE / demon / PM_SHADE / S_IMP except tengu + 
`is_vampshifter`; `special_dmgval`/`select_hwep`/`muse` whip-yank; 
`dmgval` silver/blessed/axe still named); omit full alt_spl/rank titles/plural edge cases

### `src/mkobj.c`

JS: `js/mkobj.js` — partial

Creation/merge/weight subsets; `add_to_buried` (D-0014); 
`start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); 
**`run_timers`/`start_timer` queue + floor `rot_corpse`** (D-0405); 
**invent/minvent `rot_corpse` worn plines** (D-1213; 
C `dig.c` verbose Your + `remove_worn_item`/`setmnotwielded` + invent extract; 
hideunder expose / contents bury still named); 
**`attach_egg_hatch_timeout`/`stop_timer` + `mksobj` EGG→`set_corpsenm`** (D-0533); 
**`hatch_egg`/`learn_egg_type` body + `cry_sound`** (D-1036; dispatch D-1037; 
**`msound` table D-1053**; **`get_obj_location(0)` CONTAINED/BURIED + 
restore cobj `where=OBJ_CONTAINED` D-1054**); **REVIVE_MON / ZOMBIFY_MON** (D-1202; 
C `do.c` `revive_mon`/`zombify_mon` + `mon.c` `zombie_form`; `run_timers` dispatch; 
`start_corpse_timeout` `gz.zombify`+`rn1(15,5)` arm; `obj_has_timer`; 
buried zombie `revive_corpse` pit; xkilled `gz.zombify` D-1210; 
mhitm mdamagem around monkilled D-1211; **troll_baned mkcorpstat_norevive D-1223**; 
**MINVENT/CONTAINED + Adjmonnam D-1212**; **BURIED !is_zomb FALLTHROUGH impossible D-1220**; 
**Soundeffect(se_scratching, 50) before nearby You_hear D-1222**; 
**unique/pname corpse_xname adjective + rot CXN_NO_PFX D-1234**; 
glob / doname CXN_ARTICLE|CXN_NOCORPSE prefix-as-adjective still named); melt deferred; 
**`set_corpsenm` exported** (D-0247); `is_poisonable`≡missiles (D-0012); 
starting SACK/`mkbox_cnts` (D-0013); **`splitobj`** quan/owt + floor chain + 
`next_ident` (D-0028) + nobj link; **no invent[] splice** (D-0924 — premature splice broke 
seed0002; invent slot via touchfood freeinv+`addinv_nomerge`); 
**`mergable` FOOD `oeaten`/`orotten`** (D-0923; unpaid/erosion/candle arms still deferred); 
**`obj_extract_self` preserves ox/oy like C `remove_object`** (D-0911; 
was zeroing → false `drag_ball` cause_delay); **`obj_extract_self` MINVENT** (D-0029); 
**`SPBOOK_no_NOVEL` → `rnd_class`…`SPE_BLANK_PAPER`** (D-0055); 
**CORPSE `undead_to_corpse` + `G_NOCORPSE` retry** (D-0057); 
**EGG `can_be_hatched` multi-retry** (D-0068); **Samurai lacquered `SPLINT_MAIL`** (D-0079); 
**`mksobj_init` WEAPON/ARMOR artif `rn2(20|40+10*nartifact_exist())`** (D-0588) + 
**`mk_artifact` A_NONE eligible/`rn2(n)`** (D-0759; 
by_align/gift_value/gen_spe/permapoisoned deferred); 
**floor `stackobj`/`merged`/`mergable`** (D-0094) + **`add_to_minv` merge D-1492** + 
**`oc_merge_of` excludes SPBOOK/WAND** (D-0679); **`delobj`→`obj_resists(0,0)`** (D-0105); 
**`relobj_on_death` + `mdrop_obj` `distant_name` observe** (D-0108/D-0632; 
flooreffects / vault-gold / pet `droppables` deferred); 
**TOOL lamps `rn1(500,1000)` + grease/crystal/horn/bag/bell/instruments** (D-0146); 
**FOOD `CANDY_BAR`→`assign_candy_wrapper` `rn2(12)`** (D-0196); 
**`weight(CORPSE)` → `mons[corpsenm].cwt`** (D-0230); 
**FIGURINE `rndmonnum_adj(5,10)` + `is_human` retry + `blessorcurse(4)`** (D-0244); 
**`place_object` first-boulder / floor extract → `recalc_block_point` + 
under-boulder pile** (D-0270); **`clear_dknown` in `mksobj` (dknowns[] + shield-range)** (D-0292); 
**`Is_pudding`/`globby` mksobj init + `obj_nexto_xy`/`obj_absorb`/`obj_meld`/`pudding_merge_message`
 + thin `shrink_glob`** (D-0993; full `globby_bill_fixup` / shrink ice-eat deferred); 
**`mksobj` uskn includes WAND → `known=0`** (D-0316; 
table still lacks `oc_uses_known`/`oc_charged`; 
charged RING uskn / shared `unknow_object` deferred); 
**`mkbox_cnts` ICE_BOX → `mksobj(CORPSE)` + age=0/timers + `add_to_container`** (D-0361; 
BoH Is_mbag→SACK / WAN_CANCELLATION re-roll + BoH weight factor deferred); 
**candle `mksobj` `age=20*oc_cost` D-1308**; 
**`mksobj_migr_to_species` D-1363** (`:253–265` `add_to_migration` + `MIGR_TO_SPECIES` + 
`migr_species` overlay; caller `mkmaze.c` `stolen_booty`); 
omit FIGURINE transform/timeout, `nextoid` shop-price search, unpaid/`splitbill`, 
timers/light/`copy_oextra`, invent extract, `oeaten`/`eaten_stat`, statue weight arms

### `src/mon.c` `undead_to_corpse`/`can_be_hatched`/`mondead`/`corpse_chance`

JS: `js/mon.js`, `js/trap.js`, `js/mhitm.js`, `js/uhitm.js`, `js/explode.js` — partial

**`undead_to_corpse`** zombie/mummy/vampire map (D-0057); **`zombie_form`** (D-1202; 
kobold/orc/ettin/giant/human|kop elf/dwarf/gnome; already-S_ZOMBIE NON_PM; `zombify_mon` callee); 
**`zombie_maker` + xkilled `gz.zombify` around `make_corpse`** (D-1210; 
S_ZOMBIE except ghoul/skeleton, S_LICH, !mcan; !thrownobj/!stoned/!uwep + victim `zombie_form`); 
**mhitm `mdamagem` `gz.zombify` around `monkilled`** (D-1211; 
`!mwep` + AT_TUCH/CLAW/BITE + maker + victim `zombie_form`; 
**troll_baned mkcorpstat_norevive D-1223**; **gulpmm m_at swap D-1231**; 
**uhitm hmon_hitmon troll_baned around killed D-1232** (TRUE-only, not ternary); 
**uhitm `damageum`/`hmonas` troll_baned ternary/`uwep` D-1233** (AT_WEAP\|\|AT_CLAW); 
**hmonas AT_HUGS D-1250**; **`special_dmgval` `mon_hates_silver` = C `hates_silver` D-1254**; 
**hmonas AT_EXPL `explum` D-1251**; **uhitm `demonpet` spawn D-1252** (`makemon` NO_MM_FLAGS + 
`tamedog` FALSE + appear_msg; **hmonas AT_ENGL gulpum D-1264**; **fight_empty explum D-1265**; 
**hmonas altwep / uswapwep D-1266**; **hmonas skipdrin / pit kick D-1298**; **eat_brains D-1306**; 
**helmet / m_slips_free D-1307**; **mhitu AD_DRIN D-1329**; **mhitm AD_DRIN D-1330**; 
AD_WRAP m_slips_free still named); **passivemm assess_dmg `monkilled(magr)` D-1241** (no 
`gz.zombify`; AD_ACID goto skips `rn2(3)`/`mcan` return; **gulpmm snuff_lit minvent D-1242**; 
**gulpmm !goodpos return-home D-1243**; **gulpmm AD_DGST eat D-1244** (mhitm_ad_dgst 
Burrrrp/`damage=mhp`/lifesaver/tame nutrition; `monkilled` AD_DGST `mondead`; 
post-death cham/slime/wraith/`grow_up(null)`/nurse/`mon_givit`; swallowed AT_BOOM contained; 
gulpmu invent / digest-Medusa stone / `newcham` NC_SHOW_MSG pline / `grow_up` little_to_big still 
named)); **`can_be_hatched`/`dead_species`** + BREEDER_EGG (D-0068); 
**`kill_eggs` after genocide D-1097** (minvent/invent/fobj/migrating/buried + Has_contents; 
TIN/CORPSE #if 0 not ported; cham `newcham` + 
cmd.c wiz-level-change `kill_genocided_monsters` still named; do.c `goto_level` caller D-1190); 
**`egg_type_from_parent`** (D-1075; sit `#sit` `FALSE` roll; 
polyself `learn_egg_type` `TRUE` still named); **`record_mvitals_died`** (D-0126); 
**trap-path `monkilled`/`mondied`/`make_corpse` ordinary default_1** (D-0150); 
**mhitm `mondied`→`make_corpse` ordinary** (D-0167); 
**`xkilled`→`make_corpse` when `corpse_chance`** (D-0191); 
**`xkilled` treasure `mkobj(RANDOM_CLASS)` + food/size filters** (D-0229); 
**`xkilled` `adjalign(malign)` + peaceful −5** (D-0251; 
quest/nemesis/guardian/priest/tame specials + peaceful luck rn2 deferred); 
**`make_corpse` undead specials before `G_NOCORPSE`** (D-0271; trap shares `mhitm` export); 
**`make_corpse` pudding→GLOB + `obj_nexto`/`obj_meld`** (D-0993); 
**`corpse_chance` AT_BOOM → `mon_explodes`** (D-0273) + 
**always-TRUE `bigmonst`/lizard/golem/mplayer/rider/isshk** (D-0707; 
Vlad/lich dust, youmonst stomach boom, `LEVEL_SPECIFIC_NOCORPSE` deferred); 
omit cham/were restore before monsndx, golem/dragon/unicorn/worm corpse specials, 
`accessible`/`is_pool` / `LEVEL_SPECIFIC_NOCORPSE` gates, flooreffects non-floor arms, genus/other 
mon.c helpers

### `src/mondata.c` growth

JS: `js/mondata.js` — partial

**`little_to_big`/`big_to_little`** grownups table (D-0068); name_to_mon; 
omit `big_little_match` multi-step walks beyond one step

### `src/makemon.c`

JS: `js/makemon.js` — partial

**`STRAT_APPEARMSG` for `M3_WAITMASK|M3_COVETOUS`** (D-0928 #1128; with `mnexto`→`rloc_to_flag`); 
Ordinary `is_armed`/`m_initweap`/`mongets`/`m_initthrow` 
(S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/S_HUMANOID/S_TROLL/S_LIZARD
(D-0556 salamander + **D-1516** non-salamander `!is_armed` skip) /
**S_HUMAN PM_NINJA** (D-1516) /
**S_ANGEL humanoid** (D-0649) + **S_KOP cream pie/club/hose** (D-1515) + default); 
**`add_to_minv` uses `OBJ_MINVENT`** (D-0029) + **`add_to_minv` merge D-1492**; 
**`makemon_rnd_goodpos` + null-ptr `rndmonst` order + `m_initgrp`/`G_SGROUP`** (D-0034); 
**`mkclass`/`mkclass_aligned`/`init_mongen_order`/`mk_gen_ok`/`is_placeholder`** (D-0053); 
**`peace_minded` co-align + `race_hostile`/`race_peaceful` via urace hatemask/lovemask** 
(D-0056/D-0172) + **`PM_ERINYS` → `!ualign.abuse`** (D-0905; `msounds[]` D-1053; 
**`peace_minded`/`set_malign` `ptr.msound`** D-1079); 
**`set_malign` ordinary + m_initgrp refresh** (D-0251; **MS_LEADER −20** D-1079); 
**`makemon` mux/muy=0 like `zeromonst`** (D-0793); 
**`newmonhp` level-0 `rnd(4)` + `basehp` boost (min HP 2)** (D-0260) + 
**adult-dragon `In_endgame`→`8*m_lev` else `4*m_lev+d(m_lev,4)`** (D-0551) + 
**Wizard `adj_lev` = mlevel+died + `iswiz`/`no_of_wizards++`** (D-0558; 
SPE_DIG on earth deferred) + **`is_golem`→`golemhp(mndx)` fixed HP** (D-0554) + 
**`adj_erinys` mutates mlevel + `adj_lev` re-reads live table** (D-0928 #1099; 
omit rider/`mlevel>49`/`is_home_elemental`); 
**`m_initinv` S_GNOME candle + shopkeeper + `rnd_defensive_item` + PM_SOLDIER early-return + 
tail** (D-0172/D-0249) + **D-1506 S_GNOME `begin_burn` after `!mpickobj` && `!levl.lit`** 
(callee `timeout.c` `begin_burn`; live `js/timeout.js`; **D-1519** `mktrap_victim` floor candle); 
**`rnd_defensive_item` Sokoban via `sokoban_rules` not sticky `g.Sokoban`** 
(D-0557); **`likes_gold`/`findgold`/`mkmonmoney` trailing gold** (D-0174); 
**`rndghostname`/`christen` for `PM_GHOST`** (D-0144); **`rndmonnum_adj` + Plan B** (D-0244); 
**`set_mimic_sym` shop arm `get_shop_item`/`depth` + FODDERSHOP jelly/mold + 
assign_sym/`mkobj`** (D-0262); **D-1517 maze/sokoban/`in_town` statue** 
(`makemon.c:2439–2443` `is_maze_lev && !(In_mines && in_town(u.ux,u.uy)) && !In_sokoban && rn2(2)` 
STATUE; callee `hack.c` `in_town` local clone — hack→trap/mon→makemon; shop is D-0262); 
**D-1525 TEMPLE `S_altar` Align2amask `MCORPSENM`** (`:2458–2460` / `:2538–2546`; 
`rn2(3)-1` then `(Inhell && rn2(3)) ? AM_NONE : Align2amask`; Inhell dungeon `hellish` — no minion 
import; `has_mcorpsenm` stale `NON_PM`; furnsyms still pchar stubs); 
**D-0619 MS_NEMESIS `nemgend` + 
`BELL_OF_OPENING`/`Croesus`/`Pestilence` mitem**; 
**D-1094 `role_init` quest-pm overlay + mitem `ptr.msound == MS_NEMESIS`**; 
**D-1088 `m_initweap`/`m_initinv` MS_PRIEST/MS_GUARDIAN `ptr.msound`** + 
`quest_mon_represents_role` LEADER/NEMESIS; 
**D-1094** mitem `ptr.msound == MS_NEMESIS` via `role_init` overlay (Tourist Master of Thieves); 
**D-1516 PM_NINJA weap**; **`align_shift` oldmoves/`Is_special` cache + 
moves=0 through mklev (D-0652); **D-0751 `temperature_shift` via `pm_resistance`**; 
other `m_initinv` bodies (mercenary armor/nymph/giant/…); hell-court `noteleport_level`; 
**`m_initweap` S_DEMON named specials + `is_demon`→default FALLTHROUGH** (D-0472); 
**`!in_mklev` `newsym` after invent (+ byyou early)** (D-0481); 
**D-0526/D-1088 `m_initweap` MS_GUARDIAN kit (`ptr.msound` then switch mm) + 
`in_mklev` giant-eel/ndemon/wumpus/long-worm sleep before invent**; 
**D-0565 `S_EEL` `in_mklev` → `mundetected` via hideunder eel arm**; 
**D-0566 spider/snake `mkobj_at`+`hideunder` + stalker/black-light `minvis`/`perminvis`** + 
**D-0761 mlet switch before `set_malign`/`G_SGROUP`** (cave spider `mkobj` before group `rn2(2)`) 
**D-0928 #1119 `S_BAT` Inhell `is_bat`→`permspeed`/`mspeed` MFAST** + 
**D-1092 `S_ORC` `Race_if(PM_ELF)` / `S_UNICORN` `is_unicorn` co-align mlet peace** (5.0 has no 
`S_ELF` mlet; **D-1518** dprince MS_BRIBE / raven `BEC_DE_CORBIN`; **D-1526** emin roaming); 
+ **D-0628 `hides_under`/`M1_CONCEAL` gate** (python `S_SNAKE` but !CONCEAL stays visible; 
was blind `mundetected=1`); **D-0630 inline hideunder non-pit `t_at` blocks** (POLY_TRAP; 
`can_hide_under_obj` coins / pet cursed / cockatrice still deferred); 
**D-0528 vampshifter `newcham`/`pickvampshape` + Vlad candelabrum + covetous `noteleport_level`**; 
**D-0606 `select_newcham_form` sandestin/doppel/cham/vamp + random + 
`accept_newcham_form`/`polyok`/`is_mplayer`; 
`extract-monsters.py` `-DMAIL_STRUCTURES` → `PM_MAIL_DAEMON` (SPECIAL_PM=330)** + 
**D-0928 #1111 random `while` = C (`!validspecmon` only continues under rogue uppercase `monsym` 
gate; else one `rn1` + outer `newcham`/`accept`)**; 
omit dragon-armor ordinary arm / wizard mon_polycontrol / RECORD `tt_doppel` entries / `newcham` 
outer rogue `tryct>15` uppercase reject; omit `set_apparxy` in byyou arm (dochug covers); 
**`makemon_appear_msg` Amonnam/next2u(req x,y)/MM_NOEXCLAM Norep** (D-0928 #1164; 
sync makemon + async caller; mimic mhidden_description/set_msg_xy/dochugw still omit; 
in-body await still deferred); **D-0530 `m_initweap` S_TROLL polearm kit**; 
**D-0540 `m_initweap` soldier/watchman `rn1(PARTISAN..BEC_DE_CORBIN)` + `P_POLEARMS` filter**; 
**D-0541 `m_initweap` S_HUMAN `is_elf` kit (`M2_ELF`)**; 
**D-0542 `m_initinv` S_QUANTMECH SchroedingersBox (`rn2(20)` + HOUSECAT corpse)**; 
**D-0546 `m_initinv` S_MUMMY `rn2(7)`→`MUMMY_WRAPPING`**; 
**D-0553 `m_initinv` S_GIANT** minotaur `WAN_DIGGING` + 
`is_giant` gem `rn2(m_lev/2)`/`rnd_class(DILITHIUM..LUCKSTONE-1)` (`M2_GIANT`); 
**D-0544 `PM_LONG_WORM` `get_wormno`/`initworm`/`place_worm_tail_randomly` (`js/worm.js` + 
`_level_monsters`)**; **D-0545 `makemon` MON_AT + 
`worm_mon_at` (reject worm-seg cells before rndmonst)**; 
**D-0532 `rndmonst_adj` quest `rn2(7)`→`qt_montype` + roles[] `enemy1/2`**; 
**D-0535 `rnd_offensive_item` case0 FALLTHROUGH→`WAN_STRIKING`**; 
**D-0536 `makemon` MON_AT + `MM_ADJACENTOK`→`enexto_core`**; 
**D-0603/D-1088 `m_initweap`/`m_initinv` MS_PRIEST** (`ptr.msound` + 
**D-0637 `quest_mon_represents_role(PM_CLERIC)`** LEADER/NEMESIS not ldrnum; 
**D-1516 PM_NINJA weap**); **D-0644 `m_initinv` S_WRAITH/S_LICH/S_DEMON** (Nazgul ring; 
Master/Arch Lich; ice devil spear / Asmodeus wands); 
**D-1507 `makemon` Sokoban first-try `throws_rocks`** (`:1226–1230` `tryct==1 && throws_rocks && In_sokoban` then `|| !goodpos`; later tries fair game; explicit ptr skips);
**D-1515 `m_initweap` S_KOP** (`:402–409` `!rn2(4)` `m_initthrow(CREAM_PIE,2)` then `!rn2(3)` CLUB\|RUBBER_HOSE; live `m_initthrow`/`mongets`; `rnd_offensive_item` still 0);
**D-1516 `m_initweap` S_LIZARD non-salamander skip + PM_NINJA** (`:270–272` / `:495–499`; live `is_armed`/`mongets`; newt..crocodile `!AT_WEAP`; ninja `rn2(4)` SHURIKEN\|DART then SHORT_SWORD\|AXE); 
**D-1517 `set_mimic_sym` maze/sokoban/`in_town`** (`:2439–2443`; JS had `!(In_mines)` so non-town mines never statue; C `in_town(u.ux,u.uy)` not mimic cell; Sokoban already skipped `rn2(2)`); 
**D-1525 `set_mimic_sym` TEMPLE `S_altar` Align2amask `MCORPSENM`** (`:2458–2460` appear `S_altar`; `:2538–2546` `rn2(3)-1` then hellish `Inhell && rn2(3)` `AM_NONE` else `Align2amask`; `has_mcorpsenm` stale `NON_PM`; no minion `Inhell` import); 
**D-1518 `makemon` dprince MS_BRIBE / raven `BEC_DE_CORBIN`** (`:1397–1404` after sleep/byyou, before LONG_WORM; `is_dprince` live; local `u_wield_art` clone — artifact→display→mkobj cycle; emin is D-1526); 
**D-1526 `makemon` emin roaming** (`:1410–1428` after LONG_WORM, before `set_malign`; `ALIGNED_CLERIC`/`HIGH_CLERIC` `!(MM_EPRI|MM_EMIN)` always; `ANGEL` `!(MM_EMIN) && !rn2(3)`; `newemin` + `isminion` + `min_align=rn2(3)-1` + `MM_ANGRY?!rn2(3)` renegade + coalign XOR peaceful; live `newemin`/`EMIN`; `mk_roamer`/`priestini` flags skip; **D-1531** Pri-loca noalign caller); 
**`add_to_minv` merge D-1492** (`mkobj.c:2648–2665` via invent.c `merged()`; 
live `js/mkobj.js`, re-export `makemon.js`); **S_GNOME `begin_burn` D-1506**; 
**D-1519 `mktrap_victim` floor gnome candle `begin_burn`**; 
observe_quantum_cat/disclose SchroedingersBox; 
door-wall `S_hcdoor` / furnsyms real S_* / `Protection_from_shape_changers` early-out / `block_point`; 
`ndemon`/aligned `mkclass` callers unaudited; `rndmonst_adj` rogue/elem filters; 
egg `attach_egg_hatch_timeout`; **D-0747 `uncommon`/`rndmonst_adj` Inhell via dungeon `hellish` + 
`G_NOHELL` skip**; **D-0748 `mkclass_aligned` `gehennom=Inhell` via hellish** (`pick_nasty` / other 
`GEHENNOM` dnum sites still wrong); **D-0749 `rnd_misc_item` life-saving `!nonliving && 
!is_vampshifter`** (See_invisible peaceful invis arm deferred); 
**D-0751 `temperature_shift` + hell `clear_level_structures` temp**; 
**D-1078 `clone_mon`** (HP half + caller max/2; enexto; no minvent; 
`cutworm` / `place_monster` 2D grid named); **D-1252 `demonpet` caller** (`uhitm.c`; 
live `makemon` NO_MM_FLAGS + `tamedog` null FALSE) |

### `src/worm.c`

JS: `js/worm.js` — partial

**D-0544** creation: `get_wormno`/`initworm`/`create_worm_tail`/`count_wsegs`/`
place_worm_tail_randomly` + `_level_monsters` occupancy for `place_worm_seg`; 
`clear_wormdata` on level clear; **D-0545** `makemon` MON_AT via `worm_mon_at`; 
**D-1123** `remove_worm`; **D-1491** `worm_move`/`shrink_worm`/`worm_nomove` (`worm.c:189–297` / 
caller `monmove.c` `m_move` `:2054–2071`; 
grow `wgrowtime` `rnd(5)` then `rn1(10,2)*NORMAL/mcalcmove FALSE` + 
`d(2,2)` HP ladder or shrink tail; failed move HP floor 1); 
**D-1529 `see_wsegs`** (`worm.c:487–495`; callers `display.c` `see_monsters` `:1511–1512`, 
`worn.c` `mon_set_minvis` `:482–483`, `monmove.c` postmov `:1683–1686`; 
callee `newsym` `is_worm_tail` + `display_monster` `PM_LONG_WORM_TAIL`); 
omit cutworm/wormgone, save/rest wsegs, `worm_known`, detect_wsegs, muse/mhitu 
`worm_move` callers; muse.c/mon.c local `mon_set_minvis` clones; feel_location 
`is_worm_tail`; Detect_monsters cansee; MON_STILL_ARRIVING; 
`worm_cross` live; non-worm `level.monsters[][]` still fmon-only

### `src/extralev.c`

JS: `js/extralev.js` — partial

**D-0762 `makeroguerooms`/`makerogueghost`/`miniwalk`/`roguecorr`/`corr`** + 
`makelevel` Is_rogue → skip0; `roguename`; **D-0763 asmodeus** after rogue; 
**D-0764 `hell_tweaks`** + **D-0772 `'.w.'` mapfrag** (not `'[.w.]'`); 
**D-0765 juiblex/`lvlfill_swamp`** (prefix **72078→74801**); 
**D-0766 baalz/`baalz_fixup`** (prefix **74801→76622**) + 
**D-0806 `splev_mazewalk` 3-arg ftyp=ROOM** (not corrmaze→CORR; 
seed0360 Scr **633→638**) + **D-0807 `sel_set_ter` IS_LAVA→lit** (C `set_levltyp`; 
hell_tweaks lava; seed0360 Scr **638→670**); **D-0767 orcus** (prefix **76622→82982**); 
**D-0768 wizard1** (prefix **82982→86029**); **D-0771 wizard2** (prefix **86170→98492**); 
**D-0774 `map_cleanup`** before wallify/flip (asmodeus/orcus/wizard1–2; deltrap/del_engr deferred); 
**D-0775 minliquid**; **D-0776 `Wiz-strt`** + **D-0777 `maketrap` AIR/CLOUD** + 
**D-0782 branch LR_BRANCH pre-flip** (prefix **101022→101930**; 
Scr **389**) + **D-0800 `Wiz-loca`/`Wiz-fila`/`Wiz-filb`** (seed0360 RNG **FULL 120639**; 
Scr **561**/833); Wiz-goal + fakewiz deferred; **D-0906 hellfill** via mklev; 
omit `LVLINIT_ROGUE` / `ROGUEOPTS` / `impossible()` wall checks

### `src/mklev.c` / `sp_lev.c` `lspo_map`

JS: `js/mklev.js` — partial

Ordinary level path substantial; **`fill_ordinary_room` nsubrooms recursion before needfill** 
(D-0917); mineralize bury-vs-place (D-0014); 
`mktrap_victim` place_object ammo/possessions (D-0016) + **D-1519 floor gnome candle `begin_burn`** (`mklev.c:1918–1919` after `place_object`, `!levl[x][y].lit` → live `timeout.js` `begin_burn`; not `m_initinv` D-1506; **D-1533** `create_object` `o->lit`); 
**`set_wall_state`/`xy_set_wall_state`** (D-0038); 
**`makeniche` → real `mkclass(S_HUMAN)`** (D-0053); 
supply-chest **`SPBOOK_no_NOVEL`** (D-0055) + **`add_to_container` fill + 
SPBOOK level-bias** (D-0679); **`in_mk_themerooms` for themerms `check_room`** (D-0092); 
**post-fill full-map `wallification`** (D-0100); **`do_vault` `create_vault` fallback** (D-0112); 
**`mk_knox_portal` place under wizard/debug** (D-0914); 
**`makeniche` trap_engravings + `wipe_engr_at`** (D-0134); 
**`lspo_map` themerms placement + `filler_region`/`flood_fill_rm` + fill reservoir** (D-0143); 
**Ghost fill `selection_from_mkroom`/`selection_rndcoord` + monster/loot** (D-0144); 
**`finddpos_shift` irregular inward walk** (D-0145); 
**`occupied` `t_at` + irregular `somexy`/`inside_room`** (D-0147); 
**dlvl2+ special-room `rn2(u_depth)` → `do_mkroom`/`mkshop` rtype+shtypes** (D-0149/D-0201); 
**`clear_level_structures` clears `_objects_at`/`head_engr`** (D-0161) + 
**`clear_regions`** (D-0675; C mklev.c) + **`sokoban_rules`/`sokoban`/`g.Sokoban`** (D-0557; 
C `sokoban_rules=0`); **`fill_lvl`→`makemaz(minefill)` + 
`mkmap` SOLIDFILL/MINES/`init_fill`/`join_map` + minefill stairs/objects/monsters/traps** (D-0171); 
**Blocked center map + region `replace_terrain` L→wall|pool** (D-0243); 
**sized rectangular themerms outer w/h → positioned `create_room`** (D-0248); 
**irregular `filler_region`: flood_fill lights only — no bbox re-light** (D-0302); 
**tut-1 `des.map` SPLEV_CENTER + updest/`u_on_rndspot` + Tutorial botl + invent stash** (D-0350); 
**tut-1 door-area engravings/`D_CLOSED`/`MAGIC_PORTAL` seen + newbie opts** (D-0351); 
**tut-1 `mktrap` victim `rnd(4)` + `induced_align` Is_special + kick→sling des.*** (D-0352); 
**tut-1 loot→end + `mineralize` special skip after kelp** (D-0353) + 
**`water_has_kelp` `!Is_waterlevel` + `In_endgame` return before kelp** (D-1059; 
tut_key/eckey/Knight jump/leave-invent/`map_location` tseen/`add_to_container` merge deferred); 
**occupied invocation_pos** (D-1154); omit other fill *bodies*, nested `des.room` bodies beyond 
Nesting/Fake Delphi/Huge/… outer sizes, `join` arboreal→ROOM, Lua `post_level_generate` postprocess 
queue, `mkgrave_room` bury; **D-1533 `create_object` `o->lit` `begin_burn`** (`sp_lev.c:2425–2426` after `stackobj`, not tile.lit; `l_create_object` lit default 0; mktrap_victim is D-1519; themerms Light source fill still named); `Can_fall_thru` before hole→ROCKTRAP (Vlad niche); 
**D-0906 `hellfill`+`create_maze`/`LVLINIT_MAZE`** (seed4500 **32538→49776** Scr **459**; 
**hellfill Invocation_lev VS** (D-1154 `pick_vibrasquare_location`+`maketrap`); 
rnd_hell_prefab/`makemaz("")`/fakewiz deferred); empty `makemaz("")`; Is_special/quest fill; 
**minefill `fixup_special`/`place_lregion(LR_BRANCH)` + Mines mineralize gold×2/gem×3** (D-0177); 
**`mkstairs` no-op on dunlev ends** (up on dlevel 1 / down on `Is_botlevel`; 
D-0928 #1152 — minefill `des.stair("up")` no longer plants dlevel-0 upstairs); 
omit lev_region[] compiler/`mkportal`; **D-1109 `lspo_exclusion`** (soko2-2 / hellfill prefab / 
save/rest still named); seed0060 @ 2997 was **not** corridor typ (D-0032); 
seed0017 @3132 was **not** missing (30,4) terrain (D-0099); 
seed0077 @1465 was **not** themerms rect-count (D-0112); 
seed0200 @1672 was **not** irregular-only (D-0147); 
seed0200 @1768 was **not** empty getrumor (D-0148); 
seed0030 @10861 was **not** Medusa/`rn2(5)` first (D-0171); 
**minefill class-letter `induced_align` before `mkclass`** (D-0175); 
**minefill `create_trap` NO_TRAP retry + victim `rnd(4)`** (D-0176); 
seed0030 @13007 was **not** induced_align itself (D-0175); 
seed0030 @13122 was **not** get_location (D-0176); 
seed0030 @13226 was **not** mineralize-first (D-0177); 
**Nesting rooms + positioned `create_room`** (D-0226); 
**seed0104 upstairs (19,7) vs C (18,8) — `place_branch` on drifted room origin** (D-0218; 
@3031 symptom); seed0030 seg3 @4527 was **not** blind themerms `rn2(100)` (D-0226); 
seed0030 seg6 @339 was **not** generic build_room chance (D-0243 Blocked center); 
seed0030 seg6 @11830 was **not** irregular somexy (D-0248 Fake Delphi sizes); 
**seed0030 seg6 @18840 was not m_move track formula / not Mines mkmap (28,13)** (D-0253 — DEC 
`k`→`┐` misread; both TRCORNER; mklev RNG+rooms match; peel is gnome `(26,11)` pos/cnt drift); 
seed0030 @372 was **not** doorway LOS (D-0302) ; 
**D-0519 `makemaz` protofile `rnd(rndlevs)` + 
`load_special` dispatch (`bigrm-2`, `bigrm-8` D-0539, `Bar-strt` through randline path carve 
D-0525); `splev_map_origin` honors `splev_*`; makemon nymph/jabberwock sleep + S_NYMPH invent**; 
**D-0804 `flip_level` swaps `_objects_at` with terrain (preserve nexthere; no fobj rebuild)**; 
**D-0520 `soko1-1` + `flip_level_rnd` + fill_zoo ZOO + `builds_up`/`level_difficulty` + 
Sokoban `set_mimic_sym`/`m_initinv` gold+spider**; 
**D-0605 `create_mimic_as_boulder` no post-makemon `m_bad_boulder_spot` retry** (C `m->x < 0` after 
`m->x = mtmp->mx` is unreachable); **D-0607 `minend-1` load_special** (niche shuffle + 
mimic `appear_as` + mines_prize luckstone) + 
**D-0755 `minend-2` load_special** (Wine Cellar solidfill map + percent terrain + 
region_islev tele + prize; seed0360 prefix **43248→52601**; Scr **207→238**; 
`minend-3` deferred) + **D-0756 `soko4-1` load_special** (Sokoban entry map + PIT/SCR_EARTH + 
branch lregion pre-flip; seed0360 prefix **52601→53361**; 
Scr **238→242**) + **D-0757 `tower2` load_special** (Vlad middle: niche shuffle + ladders + 
demons/hounds + chest amulets + spbook shuffle; seed0360 prefix **53361→53591**; 
Scr **242→246**) + **D-0758 `tower3` load_special** (Vlad entry: unshuffled niches + 
branch levregion + `D`/fixed+random mons + niche loot/traps; seed0360 prefix **53591→55374**; 
Scr **246→261**; `soko2-2`/`medusa-2/4` deferred); 
**D-0745 `oracle` load_special** (`des.room` + historic `montype="C"` statues + nested DELPHI + 
Oracle + `noflip`); **D-0746 `castle` load_special** (mazegrid + map + mazewalk/`fill_empty_maze` + 
drawbridge + `squadmon` barracks); **D-0747 `valley` load_special** (solidfill + map + 
percent paths + temple/morgue + corpses + `remove_boundary_syms`; seed0360 prefix **22925→31374**; 
next `mkclass_aligned` @31374); **D-0750 `sanctum` load_special** (solidfill + map + 
temple/sanctum altar/`priestini` + irregular morgue + fire ring + `mk_roamer` horde; 
seed0360 prefix **37668→38557**) + **D-0928 #1173 sanctum map lit=FALSE clear after `splev_apply`** 
(solidfill BOOL_RANDOM left lit; C `lspo_map` lit=FALSE; 
seed4500 **@1291→@1322** Scr **1529→1576**; 
global `sel_set_ter(false)`≡C still deferred — tut-1) + 
**`peace_minded` `is_minion`→`record>=0`** (High Cleric; **msound LEADER/GUARDIAN/NEMESIS** D-1079; 
ERINYS D-0905); **D-0751 `clear_level_structures` temperature `In_hell?1:0`** (sanctum omits lua 
temperate → hot; valley still overrides temperate); 
**D-0752 sanctum `teleport_region` `region_islev=1` absolute** (C `levregion_add` skips 
`get_location`; was mx+ → span 23 vs 26; prefix **41671→41768**) + 
**D-0753 `maybe_generate_rnd_mon` stronghold-depth rate** + **D-0754 `minetn-5`** + 
**D-1490 `minetn-1`** + **D-1503 `minetn-6`** + **D-1504 `minetn-7`** +
**D-1513 minetn-7 town-floor three gnomes**; fakewiz deferred (hellfill D-0906); 
flip_level lregion coord update deferred; 
**D-0608 `minend-1` `des.object("(")`→TOOL not WEAPON** (defsym `'('`=TOOL_CLASS); 
**D-0543 `soko1-2` load_special** (map/reward percent(25); other `soko*-*` deferred); 
**D-0547 `soko2-1` + `is_ok_location_dry` boulder reject**; 
**D-0548 `soko3-1`/`soko3-2`/`soko4-2` load_special**; 
**D-0567 Sokoban `premap_detect`/`solidify_map`/`SpLev_Map` + 
flip `fix_wall_spines`** (`soko2-2` deferred; `soko4-1` D-0756); 
**D-0521 `load_special` must not call `fill_special_room` (makelevel fills once)**; 
**D-0522 `put_lregion_here` TELE `m_at` reject when `!oneshot` + 
`is_exclusion_zone`** (omit `m_into_limbo`; **D-1109 `lspo_exclusion`**; `undestroyable_trap`; 
other soko*-*; **D-0526 Bar-strt through Pelias/chieftains/trap/eels/ogre floodfill/flip/branch**; 
**D-0588 `Arc-strt` load_special + `splev_discard_default_minvent` (`mdrop_special_objs` 
obj_resists)**; omit Pelias/`Lord Carnarvon`/`Arch Priest` `m_dowear`; 
**D-0637 `Pri-strt` load_special** (map/temple/altar/Arch Priest 
invent/acolytes/trees/darts/zombies/flip/branch); 
**D-0642 `Pri-loca` load_special** (mines lit-field + 
map/morgue regions/shrine+hostile cleric/`Can_fall_thru` hardfloor holes→ROCKTRAP + 
locate_first text) + **D-1531 Pri-loca `align=noalign` aligned cleric `mk_roamer`**
(`sp_lev.c` `:1983–1984` + `priest.c` `mk_roamer`; live `mk_roamer_splev` `MM_EMIN`
`min_align=A_NONE`; review **487** misnamed `load_pri_strt`; emin arm is D-1526;
`splev_create_monster` still RANDOM-only) + **D-0658 `link_doors_rooms` + eastern hx=39** (D-0645 hx=35 interim retired; 
D-0657 m_at @35535 cleared) + **D-0668 Pri-loca map lit=FALSE clear** (mines lit-field → dark 
morgue; global `sel_set_ter(false)`≡C deferred — seed0009) + 
**D-0673 tower1 map lit=FALSE clear** (solidfill BOOL_RANDOM lit kept by sel_set_ter 
false→nochange; ≡C lspo_map lit=FALSE; tower2 D-0757; 
tower3 D-0758) + **D-0646 `Pri-goal` load_special** (mines lava + map/Mitre/Nalzok) + 
**D-0670 `light_region` unlit keeps lava lit**; 
**D-0655 `Pri-fila`/`Pri-filb` + `splev_roomtype` morgue**; other-role quest starts; 
**D-0527 onquest firsttime nhl shuffle**; 
**D-0528 `tower1` + vampshift/`newcham`/`pickvampshape` + `noteleport_level` covetous**; 
**D-0617 tower1 chest candle contents → `get_location_coord_random(DRY)`** (was raw `rn2(sx/sy)`); 
tower2 D-0757; tower3 D-0758; **D-0529 `Bar-loca` + `traptype_rnd`→`level_difficulty()`**; 
**D-0530 `m_initweap` S_TROLL**; **D-0531 `on_locate` + `makelevel` In_quest `*-fila`/`*-filb` + 
`reset_xystart_size`**; **D-0618 `Arc-fila`/`Arc-filb` ordinary `des.room` + 
croom `get_location_coord` double-retry**; 
**D-0619 `Arc-goal` load_special** (map/temple/Orb/`Minion` + 
`fill_special_room` TEMPLE `has_temple`); omit medusa-2/4; Bar-goal; 
**D-0647 `minetn-2` load_special** (`create_subroom`/`create_door`/`splev_des_room` + 
`flip_level` sbrooms) + **D-0875 `minetn-3` Alley Town** (wand shop + nested chance rooms) + 
**D-0921 `minetn-4` College Town** (book shop + nested chance rooms; 
seed4500 **61698→82788**) + **D-0754 `minetn-5` load_special** (Grotto Town solidfill map + 
percent terrain + shops/temple/watch; seed0360 prefix **41777→43248**) + 
**D-0802 `des.region(sel,"lit")` → `light_region` wall-expand** (minetn-5 + minend-2; 
seed0360 Scr **589→616**; prefix **180→231**; **D-1490 `minetn-1` Orcish Town**; 
**D-1503 `minetn-6` Bustling Town** (solidfill then mines lit=1 bg HWALL + 
top-aligned map `'x'` skip + shops/temple/peaceful watch); 
**D-1504 `minetn-7` Bazaar Town** (nested `des.room` 30×15 + `percent(75)` 
nests + chance shops + sink `pos=0` door + temple `align[1]` + watch) +
**D-1513 town-floor `des.monster("gnome")` ×3** (lua `:155–165`; not four;
review **465**); 
**stolen_booty D-1363** live when proto is minetn-1; 
cleric/stronghold graveyard else-if named); other-role quest fills; **D-0533 egg hatch timeout**; 
**D-0534 `mktrap` WEB→`makemon(PM_GIANT_SPIDER)` before victim gate** 
(`splev_create_trap`/`mktrap_room`/`mktrap_seen_victim`; tut-1 `nospider`); 
**D-0536 `splev_create_monster` MON_AT→`enexto`**; 
**D-1531 `create_monster` `sp_amask != AM_SPLEV_RANDOM` → `mk_roamer`** (Pri-loca
lua `align="noalign"`; `Amask2align(AM_NONE)`; female + peaceful override
`:2125–2129`; `splev_create_monster`/`splev_room_monster` still always
`induced_align(80)`+`makemon`); 
**D-0873 `create_monster` always `mtmp->female = m->female` after makemon** (`des.monster()`/class 
letter → 0; named id → find_montype gender; overwrites makemon `rn2(2)`); 
**D-0697 `create_monster` mines dwarf/gnome `your_race`→`rn2(3)` clear pm** 
(`splev_create_monster`/`splev_room_monster`; hand-rolled fill paths deferred); 
**D-0537 `mineralize` In_quest goldprob/=4 gemprob/=6**; 
**D-0539 `bigrm-8` load_special** (percent F-replace + flip); 
**D-0621 `bigrm-7` load_special** (L→{L,T,{,.} replace + flip); 
**D-0648 `bigrm-3` load_special** (`selection.match("[.w.]")` + F/T/W/Z); 
**D-0760 `bigrm-4` load_special** (L→{.,P,L,-,T,W,Z} replace + fountains) + 
**D-0822 `bigrm-12` load_special** (hexagon P/W + L/Z percent replaces + `noflipy` flip; 
seed0383 prefix **2493→9709**; Scr **45→141**) + 
**D-0896 `bigrm-9` load_special** (water/lava eye + pupil lit rings + noflip; 
seed2600 RNG **FULL 11647** Scr **23→35**; other bigrm-N deferred); 
**D-0651 `medusa-1` load_special** + `Is_medusa_level` fixup statues; 
**D-0759 `medusa-3` load_special** (place `selection_rndcoord` + Perseus/ravens; 
`mk_artifact` A_NONE) + **D-0928 open** #1092 C recorder: medusa-3 flip **sum81** stair**(32,16)** 
place≡JS land**(43,6)** (screen `>`@31/`@`(42,6) misleading); last=77/sum80 dead; 
`Flip_coord` inFlipArea+x restored; SpLev_Map flip omit (C); @88377 linedup still; omit medusa-2/4; 
**D-0654 empty-statue `resists_ston`/`poly_when_stoned`/`propagate` + 
extract `mresists`** (worn/artifact STONE_RES deferred; medusa-2/4 deferred); 
**D-0566 `light_region` wall-expand for bigrm-2/8 `des.region(...,"lit")`** + 
**D-0802 minetn-5/minend-2** (castle/other interior-only lit loops still deferred); 
**D-0540…D-0542** soldier polearm / is_elf / QUANTMECH; **D-0543 `soko1-2`**; 
**D-0544 LONG_WORM initworm**; **D-0545 makemon worm-seg MON_AT**; **D-0546 S_MUMMY wrapping**; 
**D-0547 `soko2-1` + DRY boulder**; **D-0548 `soko3-1`/`soko3-2`/`soko4-2`**; 
**D-0550 `fire` load_special + endgame `level_difficulty` sanctum+ulevel/2**; 
**`fumaroles` `clear_heros_fault` + Norep whoosh D-1156**; 
**allmain `moveloop` EOT caller D-1168**; 
**Cloud room / `lspo_gas_cloud` / `create_gas_cloud_selection` D-1158** (not BFS; ttl stays −1); 
**D-0561 `air` load_special + monclass letters + `setup_waterlevel`/`movebubbles`** + 
**D-0571 `movebubbles` air_pos `S_cloud` glyph + 
`setup` S_air memory** (water/earth/astral deferred; water cons pickup); 
**D-0551 adult-dragon endgame HP**; **D-0552 `pm_to_humidity` + 
`is_ok_location` HOT/WET/SOLID in `splev_create_monster`** (Is_waterlevel short-circuit deferred); 
**D-0553 `m_initinv` S_GIANT**; **D-0554 `golemhp`**; 
**D-0555 `get_location_coord` random double-retry** before create_monster DRY fallback (fixed 
coords / croom somexy deferred; object/trap get_location_coord still single-loop); 
**D-0556 `m_initweap` S_LIZARD salamander** spear/trident/stiletto + **D-1516** other lizards `!is_armed` skip (S_ANGEL D-0649; S_KOP D-1515; PM_NINJA D-1516); 
seed0373 next @32011 sticky Sokoban? in `rnd_defensive_item`; 
**D-0762 makelevel Is_rogue → extralev**; **D-0763 asmodeus load_special** (mazegrid+maps+mazewalk; 
shared: newmonhp mlevel>49, hell-court noteleport, hellprobs, ndemon sleep before G_SGROUP); 
**D-0764 `hell_tweaks`** (selection or/not/grow/set + fillrect xstart; prefix **71832→72078**); 
**D-0765 juiblex/`lvlfill_swamp`** (swamp init + pockets + lair; prefix **72078→74801**); 
**D-0766 baalz/`baalz_fixup` + bughack wallify** (corrmaze solidfill + right map + west mazewalk; 
prefix **74801→76622**); **D-0767 orcus** (mazegrid + right map + west mazewalk + hell_tweaks + 
shops/morgue; `stock_room` Orcus invent+detach; prefix **76622→82982**); 
**D-0768 wizard1** (mazegrid + center map + east mazewalk + morgue secret door + ladder + 
hell_tweaks; prefix **82982→86029**) + **D-0771 wizard2** (mazegrid + center map + 
zoo FILL_NORMAL + east mazewalk + ladders + hell_tweaks; 
prefix **86170→98492**) + **D-0776 `Wiz-strt`** (cloud replace + Neferet invent + siege; 
prefix **98505→100104**; Scr **292**) + **D-0777 `maketrap` AIR/CLOUD + 
`splev_create_trap` stairs/`get_location_coord`** (prefix **100104→100397**) + 
**D-0800 `Wiz-loca`/`Wiz-fila`/`Wiz-filb`** (seed0360 RNG **FULL**; Scr **561**; 
Wiz-goal + fakewiz deferred)

### `src/track.c`

JS: `js/track.js` — partial

**`initrack`/`settrack`/`gettrack`** (D-0099); 
**`goto_level` `save_track`/`rest_track`** in-memory stash (D-0367; was wipe-only); 
**bones `write_bonesfile`/`getbones` persist utrack** (D-0578; 
C `savelev`→`save_track` / `getlev`→`rest_track`); omit SFCTOOL

### `src/vision.c`

JS: `js/vision.js` — partial

Algorithm subset; `clear_path`/`m_cansee` exported for pet rays (D-0018); 
**`couldsee` wired into `dog_goal`** (D-0030); **`cansee` used by `makemon_rnd_goodpos`** (D-0034); 
**`recalc_block_point` → `vision_reset` after door open/break** (D-0113); 
**off-hero `do_clear_area`/`view_from` vis_func for wantdoor** (D-0211); 
**`does_block` BOULDER (+ CLOUD/WATERWALL/LAVAWALL) in `_blocks`** (D-0242) + 
**`is_lightblocker_mappear` mimic boulder/door/wall/tree** (D-0585) + 
**`visible_region_at` gas cloud in `_blocks` + `recalc_block_point` on create/expire** (D-0674; 
`seemimic` incremental `dig_point` deferred); 
**detect SCORR/SDOOR uncover uses `recalc_block_point`** (D-0269); 
**`Is_rogue_level` → `rogue_vision`** (D-0486; room bounds + adjacent; pit/underwater deferred); 
**Blind `vision_recalc` COULD_SEE-only + old IN_SIGHT newsym** (D-0579); 
**`do_light_sources` TEMP_LIT + makemon `emits_light` LS_MONSTER** (D-0569; 
LS_OBJECT / circle range>1 deferred); **D-0675:** stale gas across levels blocked LOS (not 
Algorithm-C TRWALL); **`clear_regions` in `clear_level_structures` + 
goto_level stash/rest** (binary `save_regions` format / free_region teardown deferred); 
**D-0773 open:** wizard2 mumak LOS — JS `viz_clear` blocks at ROOM boulder → linedup rn2(3); 
C screen lava flanks differ + warn mon @(55,9); recorder `couldsee`/boulder open; 
Underwater moat in does_block deferred; seed0030 @372 blank niche was **not** doorway LOS (D-0302 
lit)

### `src/trap.c`

JS: `js/trap.js` — partial

Monster dart path: `t_at`/`t_missile`/`thitm` miss pline/`mintrap`/`seetrap` (D-0018–D-0019); 
**`maketrap` + `choose_trapnote` + `hole_destination`/`dng_bottom`** (D-0054) + 
**D-0782 MAGIC_PORTAL mon migrate** + **D-0777 terrain gates** 
(`CAN_OVERWRITE`/pool/furniture/`IS_AIR` CLOUD ≠ portal → null, skip victim `rnd(4)`; 
Knox `single_level_branch` deferred); **`water_damage` POT_WATER/force/dilute/scroll/book + 
`erode_obj(ERODE_RUST)`** (D-0109/D-0683) + **`fire_damage_chain` invent/floor walk + 
Blind smoke D-1138** + **CAN_OF_GREASE / TOWEL `wet_a_towel` / greased / 
`Is_container`+`Waterproof_container` before luck `rn2(20)`** (D-0928 #1101) + 
**`splash_lit` D-1337** (apply.c brass dunk/crackle/`snuff_lit`+age; 
rust-trap walks + water_damage; invent grease wash + container `hliquid` plines /
waterproof `makeknown` D-1501; pot_acid boom / SPE_NOVEL 
blank deferred); **monster `trapeffect_pit` + 
`thitm`→`monkilled`/`make_corpse` ordinary** (D-0150); 
**hero `trapeffect_pit` PIT/SPIKED + `trapeffect_hole` `Can_fall_thru` (D-1076; 
`fall_through` already D-0986; `check_in_air` Lev/Fly youprop.h; 
`wearing_iron_shoes` uarmf/which_armor IRON)**; 
**`mintrap` `mon_learns_traps` + `m_harmless_trap`** (D-0151); 
**`m_harmless_trap` BEAR_TRAP msize≤MZ_SMALL / amorph / whirly / unsolid + 
WEB / RUST / VIBRATING / PIT clinger** (D-0245) + **flyer `check_in_air`/`floor_trigger` + 
SLP/FIRE resist + `mintrap` in-air skip** (D-0770; defended deferred); 
**monster `trapeffect_sqky_board`/`trapnote`/`You_hear`/`wake_nearto` + 
real `canseemon`** (D-0163); **`maketrap` `teledest` field for themerms TELEP** (D-0166); 
**monster `trapeffect_rocktrap` `t_missile(ROCK)`+`thitm(d(2,6))`** (D-0181); 
**hero `trapeffect_rocktrap` feeltrap+place ROCK+losehp** (D-0360; 
`thitm` captures mx/my before death place); 
**`maketrap` ROLLING_BOULDER → `mkroll_launch`/`find_random_launch_coord`/`isclearpath`** (D-0202); 
**hero+mon `trapeffect_rolling_boulder_trap` + 
`launch_obj` ROLL path `dmgval`/`thitu`/`ohitmon`** (D-0599; LAUNCH_UNSEEN msgs; 
mid-roll TELEP D-1237; mid-roll landmine/pit D-1256; `hits_bars` D-0990; 
boulder-chain/`ship_object`/post-switch flooreffects deferred); 
**hero `dotrap` + dart `t_missile`/`thitu` miss place** (D-0239); 
**monster `trapeffect_hole`/TRAPDOOR → `mlevel_tele_trap`/`migrate_to_level` `Trap_Moved_Mon`** 
(D-0250); **`thitm` hit → `dmgval` clamp≥1** (D-0252); 
**monster `trapeffect_magic_trap` `rn2(21)`→`trapeffect_fire_trap` + FIRE_TRAP selector** (D-0254); 
**monster `trapeffect_slp_gas_trap`/`sleep_monst(rnd(25),-1)` + 
`breathless`/`resists_sleep`/`mr_bit` + SLP_GAS selector** (D-0256); 
**hero MAGIC_TRAP `rn2(30)`/`domagictrap` + `dofiretrap` null-box + 
hero FIRE_TRAP→`dofiretrap`** (D-0266); **`trapeffect_bear_trap` hero+monster + 
`floor_trigger` BEAR/LANDMINE/SLP/RUST/FIRE + `set_utrap`/`set_wounded_legs`** (D-0398); 
**`trapeffect_rust_trap` hero+monster `rn2(5)` aim + `water_damage`/`splash_lit` + 
iron-golem rust** (D-0508; **D-1095** gremlin `rn2(3)`→`split_mon`; **splash_lit D-1337**; 
`update_inventory`; mlifesaver "starts to fall"; poly `body_part`; drown gremlin still named); 
**`trapeffect_landmine` + `blow_up_landmine`** (D-0874; mon weight `rn2(cwt+1)` vs `WT_ELF/2`; 
seed0014 **50259→52043**; omit `scatter`/fill_pit/drawbridge/`which_armor` iron shoes/steedintrap); 
**`set_wounded_legs`→`encumber_msg` + `weight_cap` `WT_WOUNDEDLEG_REDUCT` + 
preamble `oldcap` sync** (D-0400; load pline triggers bear `--More--`); 
**`erode_obj` burn/damage/destroy envelope** (D-0491; 
grease_protect/costly_alteration/inventory_resistance/remove_worn_item deferred); 
omit grease/towel/container/acid boom, full `erode_obj` rust/verbose arms, overwrite `reset_utrap` 
/ Knox LEVEL_TELEP / Sokoban finish still named (**PIT/HOLE `set_levltyp` D-1280**; 
**DRAWBRIDGE_UP ice D-1296**; **shop `add_damage` D-1300**), other trap types, **hero 
SLP_GAS/`fall_asleep`/steedintrap**, **hero arrow/sqky/dart `poisoned()`; steedintrap non-pit; 
Punished pit `ballfall`**, vault/shop/temple `ceiling` labels, `helm_simple_name` hat/`Yname2` 
soft-helm polish; **`instapetrify`/`selftouch`/`mselftouch`/`minstapetrify` + 
`mon_to_stone`/`vamp_stone`/`monstone` + `xkilled` stoned** (D-0995/D-0996), `float_vs_flight`, 
full `body_part` poly, `stone_missile`/`passes_rocks` harmless arm in `thitm`, **`mons_see_trap`** 
(D-0701); **`mintrap` already_seen = mon_knows_traps || (HOLE && !mindless)** (D-0703; 
**floor_trigger+check_in_air skip** D-0770; Sokoban pit/hole inescapable still deferred); 
full `m_harmless_trap` anti-magic/webmaker/`defended` resists (flyer check_in_air + SLP/FIRE + 
BEAR/WEB/RUST/VIBRATING/PIT done D-0245/D-0770), mtrapped escape `rn2(40)`, Deaf+mindless silent, 
`disturb_buried_zombies`, empty-door pline_mon, drawbridge-under pool/lava; 
**`maketrap` STATUE_TRAP → `mk_trap_statue`** (D-0538; 
full `mongone`/MM_NOCOUNTBIRTH born tally deferred); fate-20 `seffects(SPE_REMOVE_CURSE)`; 
fire `destroy_items`/`ignite`/`burn_floor`/`melt_ice`/`surface`/`data->mresists`/`minuhpmax`/`
losexp`; MAGIC_PORTAL/LEVEL_TELEP `mlevel_tele_trap` arms; valley_level stronghold dest; 
migrate light/worm/isshk; **`encumber_msg` callers beyond set_wounded_legs/preamble** (allmain 
turn-loop / exercise STR·CON / pickup/drop); Lev/air/steed `weight_cap` MAX; `stagger()` poly; 
`heal_legs`; **`body_part`** / **`mbodypart`** import `polyself.js` (D-1496;
steed FOOT uses `mbodypart(usteed)`, not the hero). **mcastu HEAD /
pickup HAND D-1508**. Named: `mcast_blind_you` EYE;
`observe_quantum_cat` FOOT.

### `src/dog.c` `tamedog` / `initedog`

JS: `js/dog.js` — partial

**`tamedog` obj=null envelope** peaceful+edog for magic-trap fate 19 (D-0266) + 
**demonpet `tamedog(null, FALSE)` D-1252**; 
**`initedog` `set_malign` after mpeaceful=1 + domestic minimumtame** (D-0839; 
starting-pet malign −9 vs renegade +3); 
**`tamedog` `obj && dogfood >= MANFOOD` D-1502** (C `:1247`; invoke TAMING zeroobj → APPORT so 
tame-extend is rejected after peaceful); 
**`tamedog` is_covetous / is_demon-vs-hero / quest leader / blessed-scroll +2 /
`make_happy_shk` / givemsg `pline_mon` / post-tame `mon_wield_item` D-1532**
(C `:1169–1280`; `is_minion` is `mtmp.isminion` like C `mtmp->isminion`);
named: `wake_nearto` sleep; FULL_MOON night S_DOG `rn2(6)`; ustuck
expels/unstuck; `redraw_worm`; Tobjnam stop / big_corpse catch;
`initedog` `has_edog` vs `!mtame`

### `src/fountain.c`

JS: `js/fountain.js` — partial

**`dipfountain` case 16/default + `dryup` rn2(3)** (D-0109); 
**`drinkfountain` fate=rnd(30)/mgkftn/fate<10/default+message arms + dryup** (D-0237; 
**fate<10 raw `uhunger += rnd(10)` + `newuhs(FALSE)` D-1359**, not lesshungry); 
**`dofindgem`/`rnd_class(DILITHIUM..LUCKSTONE-1)` + FOUNTAIN_LOOTED** drink case 27 + 
dip case 24 (D-0263); **`drinkfountain` case 26 → `monster_detect` + browse_map** (D-0370); 
**`drinkfountain` case 20 → `vomit`/`nomul(-2)`** (D-0371); 
**`drinksink` rn2(20) switch + `breaksink` + dodrink sink yn** (D-0434; 
**case 10 Unchanging+`polyself(POLY_NOFLAGS)` D-1118**; 
**case 13 `create_gas_cloud(1,4)` D-1124 / enveloped D-1137**; **hcolor drinksink case 4 D-1135**; 
**`hliquid` via do_name D-0849**); **`drinkfountain` case 23 
`dowaterdemon`/`makemon`/`mongrantswish` subset** (D-0472; 
**`tmp_at(DISP_ALWAYS, glyph_at)` hide D-1136**; full C `mongone` still named; 
**`djinni_from_bottle`** D-1144); **`drinkfountain` case 22 / dip case 23 `dowatersnakes` 
`rn1(5,2)`+`makemon` water moccasin** (D-0495; Hallucination `makeplural(rndmonnam(NULL))` D-1125); 
**`dipfountain` water_damage→erode rust gate `rn2(2)`** (D-0683); 
**`dogushforth`/`gush`/`nexttodoor`/`delfloortrap` + dip case 25 / drink case 30** (D-0684; 
full `set_levltyp` deferred); **`gush` `m_at` → `minliquid` else `newsym`** (D-1117; 
C `fountain.c:157–160` / `mon.c` `minliquid_core` 993–1008 rust + 1068–1109 drown; 
iron-golem `!rn2(5)` `d(2,6)`; `!mon_moving` `xkilled(XKILL_NOMSG)` else `mondied`; drown pline; 
survivor `water_damage_chain`+`rloc(RLOC_NOMSG)`; `sad_feeling`; 
teleport-away `await rloc(RLOC_MSG)`; **lava `on_fire`/`xkilled`/`fire_damage_chain` D-1138** 
(`allmain.c:210–216` `mon_moving` around `movemon`); 
**`deal_with_overcrowding` D-1148** (`mon.c:3986–3995` / 
`m_into_limbo`/`migrate_mon`/`elemental_clog`; 
minliquid failed survivor `rloc` + `mnexto` failed-enexto); 
steed Flying/Levitation, `engulfing_u` flush, `mdrop_special_objs` 
worn/saddle/`extract_from_minvent` still named); **`drinksink` case 10 `polyself`** (D-1118; 
C `fountain.c:680–686`; `!Unchanging` metamorphosis + `polyself(POLY_NOFLAGS)`; 
Unchanging skips You+call; youprop H||E flats+uprops; 
confer writes UNCHANGING to uprops not `EUnchanging`; 
were/vamp/`POLY_MONSTER`/`POLY_REVERT` stay named on polyself.js); 
**`drinksink` case 13 `create_gas_cloud`** (D-1124; 
C `fountain.c:696–698` / `region.c` `create_gas_cloud`; 
size-1 poison cloud `arg=4` + ttl `rn1(3,4)`; no expand shuffle; 
**`make_gas_cloud` enveloped You + `PLNMSG_ENVELOPED_IN_GAS` D-1137**; inside_f damage D-1146; 
expire dissipation D-1155; fumaroles whoosh D-1156); 
**`dowaternymph` + dip cases 21–22 + drink case 27→28** (D-0685); 
**`dipfountain` cases 26–28 bath/`somegold`/`exercise(A_WIS,FALSE)`** (D-0877); 
**`dryup` town first-use `SET_FOUNTAIN_WARNED` + `watchman_warn_fountain` !Deaf yell** (D-0894); 
**`watchman_warn_fountain` Deaf shake/wave** (D-1105; 
`nolimbs` shakes HEAD else waves `makeplural(ARM)` + `mhis`/`pronoun_gender`); 
**`dryup` wizard `y_n("Dry up fountain?")` after town warn** (D-1096; `flags.debug`; `'n'` abort; 
no `debug_fuzzer` gate); **`dryup` `angry_guards(FALSE)` after real dryup when `isyou && in_town`** 
(D-1104); **`dryup` cansee cloud-glyph skip** (D-1106; fog/steam `S_cloud` not poison; 
shown mon/I `!cmap`; **newsym `show_region` D-1528**; **`is_worm_tail` D-1529**; 
DRAWBRIDGE_UP under-typ still named); 
**`dipfountain` Excalibur LONG_SWORD body** (D-1107; `exist_artifact`+`artiname`; 
lawful `oname`/`discover_artifact`/`bless`; unaligned curse+`spe--`; 
`set_levltyp` ROOM not `dryup`; Excalibur `:441` `update_inventory` D-1145 / artidisco save/rest 
still named); **`wash_hands` + dipfountain hands/uarmg** (D-1108; You-wash; Glib `make_glib(0)`; 
`water_damage(uarmg)`; was_glib+ER_NOTHING→ER_GREASED; 
local `fingers_or_gloves`/`gloves_simple_name`; pool yn D-1128); 
**`dipsink` + dodip sink yn** (D-1113; lottery `!rn2(25/15)` `breaksink`; hands/uarmg `wash_hands`; 
non-potion tap+`water_damage`; potion pour + otyp switch; local `do.c` `polymorph_sink` `rn2(4)`; 
`potionbreathe`/`trycall`/`useup`; pool yn D-1128 / `drink_ok_extra` still named); 
**`dipfountain` cases 17–20 uncurse** (D-1114; `!is_hands && cursed` → Blind-skip glow + `uncurse`; 
else loss pline; coins not skipped; luck/lamplit stay on mkobj `uncurse`); 
**`dipfountain` case 29 `mkgold` coins** (D-1115; 
`SET_FOUNTAIN_LOOTED` then `rnd((num_dunlevs-dlevel+1)*2)+5`; Blind-skip glistening; 
`exercise(A_WIS,TRUE)`/`newsym`; looted skip before `mkgold`; 
post-switch `update_inventory` D-1134); **`drinkfountain` case 19 MAGICENLIGHTENMENT** (D-1116; 
`enlightenment(MAGIC, ENL_GAMEINPROGRESS)` not `doattributes` BASIC ^X; Status+Attributes+elapsed; 
bones/debug still BASIC-gated); **`drinkfountain` case 24 `update_inventory`** (D-1126; 
C `fountain.c:332–333` / `invent.c` `update_inventory`; 
`if (buc_changed)` then in_moveloop/`suppress_map_output`/suppress_price=0 around tty 
`sync_perminvent`; default perm_invent Off returns before `display_inventory`; 
On WIN_INVEN still named; Excalibur 441 D-1145; 552 D-1134 / consume_obj_charge still named); 
**`dipfountain` after-switch `update_inventory`** (D-1134; 
C `fountain.c:552` after switch before `dryup`; unconditional unlike drink case 24 `buc_changed`; 
rust-gate/`Levitation`/Excalibur returns skip this site; 
default perm_invent Off no `display_inventory`; On WIN_INVEN / `consume_obj_charge` still named); 
**`dipfountain` Excalibur `:441` `update_inventory`** (D-1145; 
C `fountain.c:441` after gift/deny before `set_levltyp` ROOM; both arms; 
default perm_invent Off tty no-op; On WIN_INVEN / artidisco save/rest / `consume_obj_charge` still 
named); **`vomit` cantvomit/Sick/acid poly D-1127**; 
timeout vomiting_dialog / zhitu acid_damage bodies still named

### `src/detect.c` `monster_detect`

JS: `js/detect.js` — partial

**`monster_detect` live-fmon + cls + map_monst + sense + 
browse_map(TER_DETECT\|TER_MON)** (D-0370); omit strange_feeling; cursed wake; blessed WIN_MAP; 
unconstrain; worm segs; pet/detected glyphs; TER_DETECT autodescribe text

### `src/sit.c`

JS: `js/sit.js` — partial

**`dosit` having-fun / surface fountain** (D-0109); 
**OBJ_AT picnic sit + CORPSE comfort/`the(xname)`** (D-0346; `xname` bare corpse); 
**`else if (trap)` before `IS_THRONE`** (D-1039; already-trapped sit + `dotrap` `VIASITTING`; 
hero pit/hole bodies **D-1076**); **water/pool/gremlin `in_water`** (D-1055; 
early `goto in_water` for `is_pool&&!Underwater` and gremlin fountain/pool skips OBJ_AT/trap; 
Underwater/waterlevel cushions/mud; `split_mon`+fountain `dryup`; 
else `rn2(10)` `water_damage(uarm)` twice — pinned C second call is `uarm` not `uarmf`; 
**D-1056** C `youprop.h` `Underwater` ≡ `u.uinwater` not `u.Underwater`); 
**IS_THRONE + `special_throne_effect`** (D-1033; 
grease `COIN_CLASS` skip / wish / drain `losexp` / attrcurse / VS `schedule_goto` / `msummon` / 
confused `seffects(SPE_REMOVE_CURSE)` **HConfusion-only D-1048** / poly / acid / shuffle); 
**ordinary `throne_sit_effect` 1–13** (D-1034; 
`take_gold` **`remove_worn_item(FALSE)` W_WEAPONS `*gone` D-1049** / `courtmon` / `do_genocide(5)` 
REALLY+ONTHRONE getlin); **furniture sit_message** (D-1057; 
`IS_SINK` humanoid rump vs underside + `IS_ALTAR` `altar_wrath` + `IS_GRAVE` + 
`STAIRS` `"stairs"` + `LADDER` `"ladder"` — not defsyms staircase/ladder up/down); 
**lava/ice/DRAWBRIDGE_DOWN sit** (D-1058; 
WWalking lava sit_message + `burn_away_slime` + 
`likes_lava` warm vs `d((Fire_resistance?2:10),10)` `"sitting on lava"`; 
ice sit_message + !Cold_resistance `"ice feels cold"`; DRAWBRIDGE_DOWN `"drawbridge"`; 
trap TT_LAVA remains D-1039; **D-1060** C `youprop.h` Fire/Cold ≡ `uprops[FIRE_RES]`/`[COLD_RES]` 
intrinsic||extrinsic (worn ring; `confer_oc_oprop` does not mirror `EFire`/`ECold`); 
**`is_lava` DRAWBRIDGE_UP+DB_LAVA** D-1077 on shared `hack.js` / C `dbridge.c`; 
**`is_pool`/`is_moat` DRAWBRIDGE_UP+DB_MOAT** D-1090; juiblex MOAT is pool not moat; 
**`goodpos` `is_pool()`/`is_lava()` D-1091**; **SURFACE_AT / `db_under_typ` D-1103**); 
**`dosit` steed `You` + `mon_nam(usteed)`** (D-1067; 
C `sit.c:406–408` ARTICLE_THE, not `"your steed"` / not `y_monnam`); 
**`dosit` hider `u.uundetected` clear except trapper** (D-1068; 
C `sit.c:410–412` after usteed, before `can_reach_floor`; trapper stays floor-hidden; 
no `newsym` at this locus); **`dosit` `can_reach_floor(FALSE)`** (D-1069; 
C `sit.c:414–421` swallow “no seats” / Levitation tumble / sit-on-air `ECMD_OK`; 
air/water Levitation may sit via shared `engrave.js` helper; 
**D-1070** helper+message `Levitation` ≡ `youprop.h` `(H||E)&&!B`, not sticky `u.Levitation`); 
**D-1071** helper hugs `AT_HUGS`+`!sticks` so sit-on-air can fire; 
**D-1072** `dosit` ustuck `!sticks` lap `Monnam`/`mhis` (C `sit.c:422–429`; 
engrave `sticks` export, not `monmove.js`); 
**D-1073** `dosit` OBJ_AT picnic skip when `uteetering_at_seen_pit`/`uescaped_shaft` (C 
`sit.c:437–439` / `trap.c`; helpers in `trap.js`); 
**D-1083** `can_reach_floor(check_pit)` teeter/shaft (`engrave.c:209–211`); 
**D-1074** dragon `COIN_CLASS` `You("%shoard")` `"meager "` iff `obj.quan + 
money_cnt(invent) < u.ulevel * 1000` (C `sit.c:443–446` / `hack.c` first-coin, not a sum; 
local in `sit.js`); helper ceiling_hider/Flying||MZ_HUGE D-1082; **D-1083** check_pit teeter/shaft; 
**wizard getlin 1..13 D-1084** (`wizard && !iflags.debug_fuzzer` after `rnd(13)`; 
ESC Never_mind return; atoi 1..13 override; 0/empty keep rnd); 
**D-1075** `dosit` `lay_an_egg` after IS_THRONE (C `sit.c:357–396`/`559–560`; 
male/hunger/splash-tetra/Sargasso `ECMD_OK`; spawn vs lay; 
`mksobj(EGG,FALSE,FALSE)` + `spe=1` + `egg_type_from_parent(umonnum,FALSE)` + `observe_object` + 
`dropy`/`stackobj`/`morehungry`; `egg_type_from_parent` in `mon.js`); SetVoice; 
**seffects SCR_GENOCIDE D-1098**; **kill_eggs D-1097**; 
**D-1078** `split_mon` monster `clone_mon` (`potion.c` else + 
`makemon.c` `clone_mon` in `makemon.js`; sit local clone); 
**D-1095** trap rust/`minliquid`/uhitm AD_COLD `split_mon` callers; 
drown/mhitu/mhitm/cmd still named; take_gold **`remove_worn_item` W_ARMOR `*_off` / `unpunish` / 
`setnotworn` pointer-walk D-1086** (steal.js export; sit dynamic-import; 
fedora `Helmet_off` luck / DSM `Armor_off` `dragon_armor_handling`; 
leftover bits walk `worn[]` by pointer not `owornmask=0`; `worn_item_removal` passes TRUE); 
**D-1087** rndcurse Antimagic `shieldeff(u.ux,u.uy)` (C `sit.c:581–583` / `display.c` `shieldeff`; 
`flags.sparkle` opt_out On; SHIELD_COUNT 21 `decl.c` `shield_static` ASCII S_ss1..4 HI_ZAP + 
`flush_screen(1)` + `nh_delay_output` + `newsym`; 
DEC/showsyms S_ss* / explode inline sparkle / `shieldeff_mon` / zap·pray·spell·trap callers still 
named); **D-1089** sit `Antimagic()` ≡ `youprop.h` `uprops[ANTIMAGIC]` intrinsic||extrinsic 
(invent.js `hero_Antimagic`; confer cloak-of-MR / gray DSM never writes `EAntimagic`); 
Half_spell_damage sit clone vs uprops still named; 
`update_inventory` / Hallucination `hcolor` still named on rndcurse; donning/`cancel_don`; 
`in_use`; uskin `skinback`; `Amulet_off`; `Ring_gone`/`Blindf_off` still setworn;
**`body_part`** imports `polyself.js` (exact-name clone retired).

### runtime `dat/*.lua` + `nhlua.c`/`sp_lev.c`

JS: `js/mklev.js` themerms subset — partial

**Simple filler-map themerms via JS `lspo_map`** (D-0143); **Ghost fill body** (D-0144); 
**irregular finddpos_shift** (D-0145); **Teleportation hub fill + 
`make_a_trap` postprocess** (D-0166); **Default/Unlit/Both themed-fill → `themeroom_fill` + 
Storeroom + `set_mimic_sym`** (D-0200); **Nesting rooms size `rn2(4)` + 
positioned `create_room`** (D-0226) + **nested mid/inner create_subroom/door** (D-0916) + 
**`splev_room_door` lspo_door `rnddoor`** (D-0916); 
**Blocked center map + `replace_terrain`** (D-0243); 
**Water-surrounded vault map + region/chests/escape/`readobjnam`/undead/`lspo_exclusion`** 
(D-0690/D-1109); **Buried zombies fill** (D-0247; 
shuffle + buried CORPSE/`set_corpsenm`/`bury`/`zombify` timer); 
**sized rectangular outer rooms** Fake Delphi/Huge/Mausoleum/Random feature/Twin (D-0248; 
nested bodies deferred); **Pillars terr shuffle + 2×2 terrain** (D-0901); 
**Temple of the gods fill** + themes `splev_align` store (D-0895; 
three `create_altar`/`get_free_room_loc`); 
**Cloud room fill** + `lspo_gas_cloud`/`create_gas_cloud_selection` (D-1158; 
1×1 bitmap, ttl −1, not BFS; asleep fog `numpoints/4`); **Kni-goal** (D-0928 #1134; 
Kni-strt/loca/fila/filb deferred); full Lua VM + remaining `des.*` still production requirement; 
Room-in-room nested create_subroom + Pillars terrain + 
Mausoleum/Twin/Fake Delphi/Huge nested bodies + 
other fill bodies (Ice/Boulder/Spider/Trap/Garden/Buried treasure/Massacre/Statuary/Light source/…) 
+ garden/dig postprocess absent; exclusion_zones save/rest deferred

### `src/mkroom.c` `mkshop` / `src/shknam.c` `stock_room` / `src/shk.c`

JS: `js/mklev.js`, `js/shknam.js`, `js/makemon.js`, `js/shk.js` — partial

**`mkshop` eligibility + shtypes** (D-0201); 
**`stock_room`/`shkinit`/`mkshobj_at`/`get_shop_item`/iprobs/shknms + 
shopkeeper `m_initinv`/`rnd_misc_item`/`MM_ESHK` + tribute novel** (D-0203); 
**`shk_move`/`move_special`/`inhishop` + m_move isshk dispatch** (D-0205); 
**`u_entered_shop` welcome + `move_update`/`ushops_entered` via `check_special_room`** (D-0307; 
**deserted/angry/surcharge/robbed/Invis + pickaxe/steed/Fast doorway `dochug` D-1080**; 
SetVoice/Soundeffect/Hallu shkname still named); **`shkname` export** (D-0307); 
**`paybill`/`inherits`/`money2mon`/`set_repo_loc` death loot** (D-0311; 
angry takes-all + peaceful inherit); **`shkveg`/`mkveggy_at` + HEALTHY_TIN** (D-0902); 
omit Izchak/wizard SHOPTYPE; veggy_item obj-path tin/corpse species deferred; 
**Orcus mongone invent+detach** (D-0767; full `shkgone`/`mdrop_obj` deferred); 
**`pick_room`/`mkzoo` via `do_mkroom`** (D-0592); 
**COURT `fill_zoo`/`mk_zoo_thronemon`/`courtmon`/chest/`has_court`** (D-0593); 
**MORGUE `fill_zoo` `morguemon`/`mk_tt_object`/chest/`make_grave`** (D-0642) + 
**Pri-loca eastern hx=39 + `link_doors_rooms`** (D-0658; 
D-0643 rect roomno gate removed — C has none; door-edge skips cover overlaps; 
D-0645 hx=35 interim retired) + **put_lregion (59,14) m_at** (D-0657); **Pri-goal** (D-0646); 
**`mktemple`/`shrine_pos`/`priestini`/`newepri`** (D-0600); 
**`make_niches` depth/`!noteleport` + `makeniche` `Can_fall_thru` + `dosdoor` mimic + 
special-room G_GONE** (D-0601); **`pick_room` wizard≡`flags.debug`** (D-0602; 
`mkshop` wizard/`ep` multi-door arm still absent); 
**BEEHIVE `fill_zoo` queen/killer + royal jelly** (D-0903); 
SWAMP/`mkswamp` + ANTHOLE `antholemon`+food / COCKNEST statue loot deferred; 
`antholemon()` do_mkroom gate; `shk_fixes_damage`; holetime follow; following verbalize; 
`gd_move`/`pri_move` bodies; `after_shk_move` bill_p; unpaid leave verbalize/rob_shop; 
`addupbill` body; `clear_unpaid`/`mongone` full; `paygd`

