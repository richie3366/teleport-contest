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
**`oc_uses_known`** (D-1674; `objects.h` BITS uskn; `mkobj.c` `unknow_object`;
`o_init.c` `rename_disco` dummy `known=!uskn`; `u_init.c` `ini_inv_adjust_obj`;
`objnam.c` unique known-leak); **`oc_charged`** (D-1690; `objects.h` BITS chrg;
`mkobj.c` RING_CLASS; `u_init.c` `ini_inv_adjust_obj`; `objnam.c` doname /
`readobjnam` spe clamp; `read.c` `charge_ok`/`recharge`; `zap.c` `drain_item` /
`maybe_destroy_item`; `eat.c` ring hunger; `do_wear.c` `learnring`;
`shk.c` `check_unpaid_usage`); **`oc_merge`** (D-1712; `objects.h` BITS mrg;
`objclass.h`; `invent.c` `mergable`; `mkobj.c` `clear_dknown`; `objnam.c`
readobjnam quan; `sp_lev.c` create_object quan; `read.c` quiver wornmask;
`worn.c` wearslot; `zap.c` poly fuse; `mplayer.c` thrown stack);
**`lspo_object` non-merge quan repeat** (D-1723; `sp_lev.c:3725–3740`
do-while `!oc_merge`; find_objtype + argc string/coord; class-letter
`def_char_to_objclass`/`mkgold`; live `js/mklev.js` `l_create_object`);
`oc_oprop` already extracted; **`is_multigen`/`is_poisonable`** (D-1732;
C `obj.h` `:260–268` WEAPON_CLASS `oc_skill` `-P_SHURIKEN`..`-P_BOW`, or
`permapoisoned` Grimtooth; live `js/objects.js` + `artifact.c`
`permapoisoned` `js/artifact.js`; `mksobj_init` quan/`opoisoned` + end
force; xname prefix; potion_dip; poly_obj keep; readobjnam `"poisoned "`
+ FOOD age=1 + post-oname Grimtooth; clones retired); mthrowu/uhitm poison combat / nhlobj lua named

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

### `src/files.c` `read_tribute` / `choose_passage` / `Death_quote`

JS: `js/files.js` + `js/generated/tribute_data.js` + `js/spell.js` study_book — partial

**tribute D-1633** (`files.c` `:3429–3653`; Rule #2 embed `dat/tribute` via
`extract-tribute.py`, not dlb disk; `choose_passage` MAXPASSAGES=30 reservoir
when passagecnt>30; tribpassage 0; NHW_MENU + `putmsghistory` lastline
`; passage #N]`; `Death_quote` oid 1 nowin_buf first line; `spell.c` SPE_NOVEL
literate/`ACH_NOVL`/`check_unpaid`, always return 1). **D-1653
`domonnoise` MS_RIDER Death tribute** (`sounds.c` `:1193–1236`;
`invent.c` `u_have_novel` `:1575–1584`; `hacklib.c` `ucase`
`:101–110`). Live `js/sounds.js` + `js/invent.js` `u_have_novel` +
`js/hacklib.js` `ucase`; `Death_quote` already D-1633.
`!Deathnotice` + novel → title + maybe misquoted (not Snuff /
Wee Free Men); else `rn2(3)` && `Death_quote`; else `!rn2(10)`
Sandman; else War. Death `pline(ucase)` no quotes; other riders
`verbalize`. **D-1752 `set_voice` / SetVoice** (`sounds.c` `:2160–2182`;
`sndprocs.h` empty without SND_LIB; `voice_death` after Death pline;
live `js/sounds.js` + `js/sndprocs.js`). **D-1761 `sound_speak` /
SoundSpeak** (`sounds.c` `:2184–2220` body `#ifdef SND_SPEECH` compiled
out; `sndprocs.h` `:275` empty without SND_LIB; Death `:1235`
`sound_speak(tmpbuf)` after `SetVoice`/`pline1(ucase)`; `pline.c`
`putmesg` `:79` `SoundSpeak`; live `js/sounds.js` + `js/sndprocs.js` +
`js/display.js` `pline_after_consume`; `cmd.c` yn `sound_speak` is
`#ifdef SND_SPEECH` compiled out). **D-1762 `maybe_gasp`**
(`sounds.c` `:545–610` Exclam `ROLL_FROM`/`NULL`; guardian/priest
rewrite + CUSS emin; live `js/sounds.js`; `p_coaligned` priest.js;
mndx for `mons[guardnum]`). **D-1763 `beg`**
(`sounds.c` `:518–542` helpless/diet gate then animal `domonnoise` /
humanoid `map_invisible`+SetVoice+`verbalize("I'm hungry.")` /
middle famished `pline`; live `js/sounds.js`; caller `dog_hunger`
`:383` still named). Named: save/rest
`context.novel`; dlb; `dog_hunger`/`dog_move` wire; `peacefuls_respond` / MS_ARREST Halt;
SND_SPEECH/`sound_verbal` body; remaining vault/priest/sit SetVoice.
lookup_novel is D-1651. putmsghistory body is D-1588.

### `include/artilist.h`

JS: extractor + `js/generated/artifacts_data.js` + `js/artifact.js` — partial

**name/otyp/spfx/align/role/race** (D-0064); **`retouch_object` + touch gate** (D-0065); 
**attk+mtype extract + `spec_abon`/`spec_applies`** (D-0611; 
PHYS early + DMONS/DCLAS/DFLAG2/DALIGN + ATTK Magm/Stun `rn2` + per-adtyp 
Fire/Cold/Elec/Drst/Drli/Ston resists (D-1862; hero props + mon `resists_*`; 
`defended()`/DFLAG1 still deferred)); 
**`spec_dbon`/`artifact_hit`/`attacks`/`is_art`** (D-0613;
Grayswandir `max(tmp,1)` double + FIRE/COLD/ELEC `rn2` gates;
D-1873 preamble + FIRE/COLD/ELEC/MAGM realizes_damage plines + ELEC
wake_nearto + Slimed burn_away, async callers; destroy/ignite bodies,
Mb_hit, SPFX_BEHEAD/DRLI still deferred); 
**`artiname` / `discover_artifact` / `artidisco[]`** (D-1107; save/rest artidisco named); 
**`init_artifacts`/`hack_artifacts`** (D-1201; C `artifact.c:109–116`/`85–106`; 
`allmain.c:792` after `init_dungeons` before `u_init_misc`; 
gift-role align + Excalibur `!Knight` `role=NON_PM` + `urole.questarti` align/role; 
JS rebuilds artilist from generated raw for process-reuse; save/rest `restore_artifacts` named; 
`roles[].questarti` still 0 for roles that never copied it — gift loop still matches 
`role==Role_switch`); **`arti_reflects` + `set_artifact_intrinsic` SPFX_REFLECT W_WEP** (D-1342; 
C `artifact.c:537–550` / `:867–872`; muse.c `mon_reflects` MON_WEP between shield and amulet; 
hero `EReflecting&W_WEP`; zap/pray `ureflects` W_AMUL/W_ARM/dragon D-1353; 
mcastu `ureflects` named — no artilist row has cspfx&SPFX_REFLECT); 
**`set_artifact_intrinsic` SPFX_WARN + MATCH_WARN D-1514** (C `artifact.c:824–839` 
`spec_m2` `:1065–1072` + `hack.h` `MATCH_WARN_OF_MON`; Sting/Orcrist `M2_ORC`, Grimtooth `M2_ELF` 
→ `EWarn_of_mon` + `warntype.obj` + `see_monsters`; else `EWarning`; display `sensemon`/`newsym` 
see_it / `display_warning` mon_to_glyph; `see_wsegs` D-1529 / polyd·species producer / 
`worm_known` D-1548; vision `howmonsseen` named); 
**`set_artifact_intrinsic` cspfx W_ART D-1539** (C `artifact.c:770` 
`spfx=(wp_mask!=W_ART)?spfx:cspfx` + drop `:771–778` `spfx&=~art->cspfx`; ESP/STLTH/TCTRL/WARN/
EREGEN/HSPDAM/HPHDAM; MKoT WARN\|TCTRL\|HPHDAM, Orb of Fate WARN\|HSPDAM\|HPHDAM, Heart STLTH, 
Detection/PYEC ESP\|HSPDAM, Eye EREGEN\|HSPDAM; callers invent `addinv_core1` `:991` / 
`freeinv_core` `:1383`; extractor A() s2; live `js/artifact.js` + `js/u_init.js` `addinv` + 
`js/invent.js` `freeinv_core`; defn/cary resist / SPFX_PROTECT / inv_prop 
`arti_invoke` on drop / questart `artitouch` / zap poly `addinv_core1` named); 
**`set_artifact_intrinsic` SPFX_SEARCH/REGEN/XRAY D-1558** (C `artifact.c:781–786` 
ESearching Excalibur wield, `:812–817` ERegeneration Trollsbane/Staff wield, 
`:859–866` Eyes `u.xray_range` 3/-1 + `gv.vision_full_recalc`; live 
`js/artifact.js` + `js/do_wear.js` `setworn` W_TOOL; carry W_ART uses cspfx so 
SEARCH is not a carry bit; Palantir `#if 0` REGEN cspfx; vision_recalc IN_SIGHT 
xray circle / SPFX_PROTECT / defn/cary / inv_prop drop / Sunsword named; 
cspfx is D-1539); 
**defn/cary extract + `defends`/`defends_when_carried` D-1453**;
**`artilist.cost` extract + `arti_cost` D-1719** (C
`artifact.c:2308–2317`; `getprice` `/4`; shop `get_cost` still `*4`);
omit gen_spe/gift_value; `end.c` `artifact_score` is D-1730; 
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
**GETOBJ_ALLOWCNT count prefix D-1530** (C `invent.c` `getobj` `:1937–2088` + `splittable` `:1664`; live `js/invent.js` `getobj_take_count`/`getobj_apply_count`/`getobj_split_otmp`; charge/drop/throw/wield/ready/adjust clones; Palantir not a live artifact; pickinv `&ctmp` is D-1559; `finish_splitting`/`unsplitobj` is D-1560; **stash getobj is D-1561**; doorganize_core nobj-unsplit named; **`in_doagain` CQ_REPEAT is D-1563**); 
**canned CMDQ_INT D-1551** (C `invent.c` `getobj` need_more_cq `:1778–1830` + `cmd.c` `cmdq_add_int`; live `js/invent.js` `getobj_from_cmdq`/`cmdq_add_int`; ALLOWCNT clones + apply/grease/jelly/rub KEY; INT then KEY splits, !ALLOWCNT/second INT clears canned; eat/read/zap/tin NOFLAGS clones + pickinv `&ctmp` named);
UNTRAP callee door force D-1495 (floor disarm_*/box named); 
`bane_applies`/blast `d()`/`losehp`/other wield intrinsics; `defended`; DFLAG1; 
hero/mon elemental resists; destroy_items/ignite; Mb_hit; SPFX_BEHEAD/DRLI; wake_nearto; 
**`found_artifact`/`find_artifact` D-1935** (C `artifact.c:409–417` / `:422–459`; 
`if (a && !found)` → `found_artifact` + where ternary (FLOOR→`inside_shop` shop/floor, 
CONTAINED, MINVENT, catchall "") + `livelog_printf(LL_ARTIFACT, "found %s%s")`; live 
`js/artifact.js` + `xname_flags :661` arm via `set_find_artifact` late binding 
(objnam keeps no static artifact edge, D-1521); impossible() error arms named — 
async pline in sync callers, C-continues-without-found kept as early returns; 
`uhitm.c:2237` steal arm unwired — no live JS steal site; dogmove/mpickstuff/mdrop_obj 
caller where-timing rides those clone rows); 
**`spec_ability` D-1936** (C `artifact.c:516–522` — `get_artifact`, non-artifact
identity gate + spfx bit in C short-circuit order; live `js/artifact.js`;
`confers_luck` SPFX_LUCK + `sit.c` `rndcurse` SPFX_INTEL + `detect.c`
`dosearch0` SPFX_SEARCH fund routed here; SPFX_SPEAK/SEEK/DEFN/DRLI/BEHEAD/
PROTECT header bits completed from `artifact.h:14–43`; `artifact_hit`
BEHEAD/DRLI arms still deferred there)

### `src/mondata.c` `name_to_monplus` / `monstseesu`

JS: `js/mondata.js` — partial

**pmnames[MALE/FEMALE/NEUTRAL] longest match + gender out** (D-0173); 
grey dragon alt_spl subset (D-0064); **`name_to_monclass` letter/explain/truematch then 
`name_to_mon`** (D-1098; `create_particular` class-letter still named); 
**`monstseesu`/`monstunseesu`/`m_seenres` + makemon `seen_resistance`** (D-0235; 
omit buried `m_canseeu`/other M_SEEN_* muse gates/`monstunseesu_prop`); 
**`hates_silver`/`mon_hates_silver` D-1254 + `mon_hates_light` D-1948** (`js/monsters.js`;
C `mondata.c:524–528`/`517–519` were / S_VAMPIRE / demon / PM_SHADE / S_IMP except tengu +
`is_vampshifter`; C `mondata.c:547–550` `mon_hates_light` ≡ `hates_light(mon->data)` ≡
`&mons[PM_GREMLIN]` via the live `hates_light` mndx export; `special_dmgval`/`select_hwep`/`muse` whip-yank; 
`dmgval` silver/blessed/axe still named); **`eyecount` D-1534/D-1652**
(`js/monsters.js`; C `mondata.h` noeyes 0 / cyclops|floating eye 1 /
else 2; `mcastu.c` `mcast_blind_you`; sit Blind case 10 + pray
TROUBLE_BLIND + potionbreathe sting import the export); spell.c
study_book dull / zap rider / dothrow POT_WATER / mthrowu venom /
`make_blinded` itch still named; **`pronoun_gender` + `you.h`
`mhe`/`mhim`/`mhis` + `noit_mhe`/`noit_mhim`/`noit_mhis` D-1776**
(C `mondata.c:1188–1207` + `you.h:317–331` + `role.c` `genders[]`
`:688–694`; Hallu `rn2(4)` is drawn **first**, before either gate, so
these are RNG-visible; `PRONOUN_NO_IT` overrides only the `canspotmon`
test — neuter / non-humanoid still index 2. Single home in
`js/mondata.js`; eight local clones deleted from `shk`/`mhitu`/`uhitm`/
`sit`/`vault`/`mthrowu`/`fountain`/`steed`, `fountain.js` re-exports
`mhe`/`mhis`. Named: `apply.c:238` `PRONOUN_NO_IT` corpse arm,
`do_name.c` `mon_nam_too` `:1192` (still a `js/mhitm.js` clone),
`monverbself` vtense/makeplural, `type_is_pname` `insight.js` clone);
omit full alt_spl/rank titles/plural edge cases

### `src/mkobj.c`

JS: `js/mkobj.js` — partial

Creation/merge/weight subsets; `add_to_buried` (D-0014); 
`start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); 
**`run_timers`/`start_timer` queue + floor `rot_corpse`** (D-0405); 
**invent/minvent `rot_corpse` worn plines** (D-1213; 
C `dig.c` verbose Your + `remove_worn_item`/`setmnotwielded` + invent extract; 
hideunder expose / contents bury still named); 
**`attach_egg_hatch_timeout`/`stop_timer` + `mksobj` EGG→`set_corpsenm`** (D-0533); 
**`obj_split_timers` + splitobj wire + `poly_obj` hero-egg + hatch leftover** (D-1572;
C `timeout.c` `attach_egg_hatch_timeout` `:980–1005` / `obj_split_timers` `:2358–2370`;
`mkobj.c` `splitobj` `:498–499`; `zap.c` `poly_obj` `:1756–1779` `kill_egg`+`set_corpsenm`
`random_monster(rn2)`; `hatch_egg` `is_pool(mon)` + `learn_egg_type` `update_inventory`
+ impossible; SetVoice / migrating #if 0 / copy_oextra / light split / `obj_move_timers`
named); 
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
**`set_corpsenm` exported** (D-0247); **`is_multigen`/`is_poisonable` oc_skill
window + `permapoisoned`** (D-1732; was name-list missiles D-0012); 
starting SACK/`mkbox_cnts` (D-0013); **`splitobj`** quan/owt + floor chain + 
`next_ident` (D-0028) + nobj link + **`obj_split_timers` D-1572**; **no invent[] splice** (D-0924 — premature splice broke 
seed0002; invent slot via touchfood freeinv+`addinv_nomerge`); 
**`mergable` FOOD `oeaten`/`orotten`** (D-0923; unpaid/erosion/candle arms still deferred); 
**`obj_extract_self` preserves ox/oy like C `remove_object`** (D-0911; 
was zeroing → false `drag_ball` cause_delay); **`obj_extract_self` MINVENT** (D-0029); 
**`SPBOOK_no_NOVEL` → `rnd_class`…`SPE_BLANK_PAPER`** (D-0055); 
**CORPSE `undead_to_corpse` + `G_NOCORPSE` retry** (D-0057); 
**EGG `can_be_hatched` multi-retry** (D-0068); **Samurai lacquered `SPLINT_MAIL`** (D-0079); 
**`mksobj_init` WEAPON/ARMOR artif `rn2(20|40+10*nartifact_exist())`** (D-0588) + 
**`mk_artifact` A_NONE eligible/`rn2(n)`** (D-0759; 
by_align/gift_value/gen_spe deferred; mksobj_init `permapoisoned` is D-1732); 
**floor `stackobj`/`merged`/`mergable`** (D-0094) + **`add_to_minv` merge D-1492** + 
**`oc_merge_of` from `objects[].oc_merge`** (D-1712; was class heuristic
D-0679); **`delobj`→`obj_resists(0,0)`** (D-0105) + **`delobj_core` D-1756**; 
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
**`mksobj` `unknow_object` `known` from `oc_uses_known`** (D-1674;
was WAND/class-name stand-in D-0316); steal.c / muse.c callers named;
**RING_CLASS `mksobj_init` `oc_charged`** (D-1690; was RIN_* name-list);
**`clear_dknown` `objects[].oc_merge`** (D-1712; was class heuristic
`oc_merge_of` SPELL/WAND mrg=0 D-0679; food/candle/boomerang/venom vs
non-stack swords); 
**`mkbox_cnts` ICE_BOX → `mksobj(CORPSE)` + age=0/timers + `add_to_container`** (D-0361; 
BoH Is_mbag→SACK / WAN_CANCELLATION re-roll + BoH weight factor deferred); 
**candle `mksobj` `age=20*oc_cost` D-1308**; 
**`mksobj_migr_to_species` D-1363** (`:253–265` `add_to_migration` + `MIGR_TO_SPECIES` + 
`migr_species` overlay; caller `mkmaze.c` `stolen_booty`); 
**`dealloc_obj` / `dobjsfree` D-1743** (`:2744–2843` + `dealloc_oextra` `:95–111`;
`light.c` `obj_sheds_light`/`obj_is_burning`; `obj_extract_self`
LUAFREE/DELETED no-op; `obfree` + moveloop + JSON savelev/`dosave0`;
mklev ROCK/book/`mktrap_victim` discards); 
**`delobj` / `delobj_core` D-1756** (C `invent.c` `:1429–1462`;
`mkobj.c` `extract_nobj` `:2595–2614` / `container_weight` `:2731–2738`;
`zap.c` revive floor `delobj_core(,TRUE)` `:1110–1113`; live `obj_resists`;
floor `maybe_unhide_at`+`newsym` then `obfree`; CONTAINED/BURIED revive
`obfree`; live `js/mkobj.js` + `js/zap.js`); 
omit FIGURINE transform/timeout, `nextoid` shop-price search, unpaid/`splitbill`, 
timers/light/`copy_oextra`, invent Array vs nobj `extract_nobj`, `oeaten`/`eaten_stat`, statue weight arms,
zap.c `dealloc_oextra` poly; **zap `delete_contents` D-1770**;
trap.js `delete_contents_chest` / mklev.js `create_object_delete_contents`,
wizard `makemap_prepost` dobjsfree,
`maybe_unhide_at` youmonst, `shrinking_glob_gone` vs delobj

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
gulpmu invent / digest-Medusa stone / `newcham` NC_SHOW_MSG D-1586; `grow_up` little_to_big still 
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
**`make_corpse` special-corpse table** (D-1794; dragon scales `rn2(mrevived?20:3)`, 
unicorn horn / dust, worm tooth, iron/glass/clay/stone/wood/rope/leather/gold/paper 
golem drops, `CORPSTAT_BURIED` `bury_an_obj`, bypass/oname/Blind `clear_dknown`; 
`do_name.c` `free_mgivenname`; async for `pline_mon` / pudding merge / bury); 
**`corpse_chance` AT_BOOM → `mon_explodes`** (D-0273) + 
**always-TRUE `bigmonst`/lizard/golem/mplayer/rider/isshk** (D-0707; 
Vlad/lich dust, youmonst stomach boom); 
**`xkilled` LEVEL_SPECIFIC_NOCORPSE + accessible||is_pool + artifact un-create** (D-1796; 
`mon.c` macro in `mon.js` — rogue / `!deathdrops` / graveyard+undead `rn2(3)` 
short-circuit; `accessible` export uses `SURFACE_AT`; `artifact_exists` `!mod` 
clears `artiexist`; `corpse_chance` clones duplicate the macro as C does; 
`make_corpse` bury via `m_carrying` BOULDER; human-murder luck-2 + unicorn luck-5); 
omit cham/were restore before monsndx (`mondead`, not `make_corpse`), 
flooreffects non-floor arms, floor-boulder `sobj_at` nocorpse, MAIL_DAEMON, 
wasinside `spoteffects`, Blind_telepat `see_monsters`, quest adjalign arms, genus/other 
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
**`mkclass`/`mkclass_aligned`/`init_mongen_order`/`mk_gen_ok`/`is_placeholder`** (D-0053) +
**D-1575 `mk_gen_ok` MAIL_DAEMON** (random-demon `mkclass(S_DEMON, G_NOGEN)` / `ndemon`); 
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
import; **D-1598 `has_mcorpsenm`**); 
**D-1536 door/wall `S_hcdoor`** (`:2420–2438` left-connect HWALL/TLCORNER/TRWALL/BLCORNER/TDWALL/CROSSWALL/TUWALL 
→ `S_hcdoor` else `S_vcdoor`; rogue `S_hwall`/`S_vwall`; `mx!=0` short-circuit; no RNG); 
**D-1543 furnsyms real `S_*`** (`:2490–2497` `s_sym==MAXOCLASSES` ROLL_FROM `S_upstair×2`/`S_dnstair×2`/`S_altar`/`S_grave`/`S_throne`/`S_sink`; cmap ids not levl.typ; furnsyms `S_altar` takes Align2amask); 
**D-1556 DELPHI `S_fountain`** (`:2450–2456` `rt==DELPHI` `rn2(2)` STATUE else cmap `S_fountain=37`; not furnsyms; door arm still first); 
**D-1557 `set_mimic_sym` `does_block`/`block_point`** (`:2548–2549`; callees `vision.c` `does_block`/`fill_point`/`block_point`; live export; occupancy fmon not `m_at`; `recalc_block_point` still full `vision_reset`);
**D-1564 `set_mimic_sym` Protection/`made_fruit`/Plan-B** (`:2401–2402` H\|\|E uprops; `:2516–2545` Plan-B + `made_fruit`; live `can_be_hatched`; no third named clone);
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
omit dragon-armor ordinary arm / wizard mon_polycontrol / RECORD `tt_doppel` entries; 
**D-1573 `newcham` Protection cancel** + outer rogue `tryct>15` + `set_mon_data` / wormgone /
light / `pm_invisible` / hideunder / long-worm init / vampire cham / `check_gear_next_turn`;
NC_SHOW_MSG `pline_mon` D-1586; **newcham mleashed `m_unleash` TRUE / `update_inventory` + Elbereth `monflee` D-1645**; **await remaining async NO_NC_FLAGS `newcham` D-1648** (mon_poly/stone/gulp/statue/revive/bhitm; sync makemon/`load_tower1` named);
ustuck / `possibly_unwield` / `mon_break_armor` / boulder `flooreffects` / `poly_steed` still named (async or missing);
omit `set_apparxy` in byyou arm (dochug covers); 
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
**D-1566 `rndmonst_adj` rogue/elem filters** (`:1673–1686` `upper=Is_rogue_level` `isupper(monsym)` + `elemlevel=In_endgame&&!Is_astralevel` `wrong_elem_type`; live `is_home_elemental` C home; mon.js/teleport.js cycle clones; newmonhp ×3 / grow_up named — grow_up closed by D-1920); 
**D-1920 `grow_up` full C-order port** (`:2049–2178` in `js/mhitm.js`: `little_to_big` form change, golem/home-elemental thresholds, `lev_limit` base/raise/mplayer-30/min-5/max-49(50), unconditional `++m_lev`, GENOD + gender-hack plines via canonical `mhe`/`YMonnam`, `mleashed→update_inventory`, sanity undo + 400 cap; `monsndx` idiom retained, no new omits); 
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
**D-1525 `set_mimic_sym` TEMPLE `S_altar` Align2amask `MCORPSENM`** (`:2458–2460` appear `S_altar`; `:2538–2546` `rn2(3)-1` then hellish `Inhell && rn2(3)` `AM_NONE` else `Align2amask`; no minion `Inhell` import); 
**D-1598 `has_mcorpsenm`/`newmcorpsenm`/`freemcorpsenm`** (`mextra.h:234`; `makemon.c:2368–2383`/` :2543–2546`; callers `seemimic` `freemcorpsenm`, `copy_mextra`, zap bhitm long-worm skip+flag, `wormgone`, display `PM_TENGU`, pager `object_from_map`, apply stethoscope slime-mold `simpleonames`; live `js/const.js` + `js/makemon.js`; object_detect cursed-mimic / `altarmask_at` / worn `clear_bypasses` named); 
**D-1536 `set_mimic_sym` door/wall `S_hcdoor`** (`:2420–2438`; JS had `appear=0`; C left-connect → `S_hcdoor`/`S_vcdoor` or rogue `S_hwall`/`S_vwall`; `mx!=0` short-circuit); 
**D-1543 `set_mimic_sym` furnsyms real `S_*`** (`:2490–2497`; JS had stub `[0,0,1,1,2,3,4,5]`; C ROLL_FROM real cmap; furnsyms `S_altar` hits existing amask arm); 
**D-1556 `set_mimic_sym` DELPHI `S_fountain`** (`:2450–2456`; JS had `appear=0`; C `S_fountain=37`; not in furnsyms; door still first); 
**D-1557 `set_mimic_sym` `does_block`/`block_point`** (`:2548–2549`; JS omitted tail; live `js/vision.js` `does_block`/`fill_point`/`block_point`; not `recalc_block_point`);
**D-1564 `set_mimic_sym` Protection/`made_fruit`/Plan-B** (`:2401–2402` youprop H\|\|E uprops early-out; `:2516–2536` CORPSE+`G_NOCORPSE` `rn1` archeologist..wizard / EGG `!can_be_hatched` / TIN+nocorpse `NON_PM`; `:2537–2545` slime-mold `flags.made_fruit`; live `can_be_hatched`; no third named clone);
**D-1518 `makemon` dprince MS_BRIBE / raven `BEC_DE_CORBIN`** (`:1397–1404` after sleep/byyou, before LONG_WORM; `is_dprince` live; local `u_wield_art` clone — artifact→display→mkobj cycle; emin is D-1526); 
**D-1526 `makemon` emin roaming** (`:1410–1428` after LONG_WORM, before `set_malign`; `ALIGNED_CLERIC`/`HIGH_CLERIC` `!(MM_EPRI|MM_EMIN)` always; `ANGEL` `!(MM_EMIN) && !rn2(3)`; `newemin` + `isminion` + `min_align=rn2(3)-1` + `MM_ANGRY?!rn2(3)` renegade + coalign XOR peaceful; live `newemin`/`EMIN`; `mk_roamer`/`priestini` flags skip; **D-1531** Pri-loca noalign caller); 
**`add_to_minv` merge D-1492** (`mkobj.c:2648–2665` via invent.c `merged()`; 
live `js/mkobj.js`, re-export `makemon.js`); **S_GNOME `begin_burn` D-1506**; 
**D-1519 `mktrap_victim` floor gnome candle `begin_burn`**; 
**D-1535 `observe_quantum_cat`** (`pickup.c:2826–2896`; FOOT latebound; use_container/tip TRUE,TRUE; disclose FALSE,FALSE live spe; `Schroedinger's cat!`); muse monster-loot / escape companion HP named;
**D-1573 `newcham` Protection cancel**; **D-1575 `mk_gen_ok` MAIL_DAEMON**
(`:1746–1749` MAIL_STRUCTURES; `ndemon` `minion.c:462` `mkclass_aligned(S_DEMON,0,atyp)`;
`msummon` is_lminion/`llord`/PM_ANGEL `ndemon`; live export `teleport.js` `is_lminion`;
**D-1598 `has_mcorpsenm`/`newmcorpsenm`/`freemcorpsenm`** live `js/const.js` + `js/makemon.js`;
**D-1597 `show_transient_light`/`transient_light_cleanup`** live `js/light.js`
(`light.c:255–357`; camera range 0 + thrown lamplit `mtemplit`; callers zap `bhit`
`:3902–3916`/`:4135–4136`, apply `do_blinding_ray` `:73–75`, minion S_ANGEL `:162–187`;
`new_light_core` range 0; `discard_flashes`; worm tails / FLASHED_LIGHT `tmp_at`
DISP_BEAM / `save_light_sources` discard named);
**D-1574 `unblock_point`/`dig_point`**; **D-0747 `uncommon`/`rndmonst_adj` Inhell via dungeon `hellish` + 
`G_NOHELL` skip**; **D-0748 `mkclass_aligned` `gehennom=Inhell` via hellish** (`pick_nasty` / other 
`GEHENNOM` dnum sites still wrong); **D-0749 `rnd_misc_item` life-saving `!nonliving && 
!is_vampshifter`** (See_invisible peaceful invis arm deferred); 
**D-0751 `temperature_shift` + hell `clear_level_structures` temp**; 
**D-1078 `clone_mon`** (HP half + caller max/2; enexto; no minvent); 
**D-1565 `clone_mon` `place_monster` 2D grid** (`steed.c:897–932` / `makemon.c:898`; 
live `js/steed.js`; `_level_monsters` + `MON_FLOOR`; gulpmm clone retired; 
`level_mon_at` ignores stale mx/my; `cutworm` / makemon itself calling 
`place_monster` named); **D-1252 `demonpet` caller** (`uhitm.c`; 
live `makemon` NO_MM_FLAGS + `tamedog` null FALSE);
**D-1607 `mongets` demon/lminion/mplayer-sword/invocation** (`:2189–2214` after
`mksobj`; `is_mplayer&&is_sword` `spe=3+rn2(4)`; callees `curse` /
`is_lminion` / obj.h `is_sword` live `js/objects.js` (dothrow clone
retired); prince/`mpickobj` already live);
**D-1584 `mk_mplayer`** live `js/mplayer.js` (C `mplayer.c`; not this file) |

### `src/minion.c`

JS: `js/minion.js` — partial

**D-1608 `gain_guardian_angel`** (`:497–565`; caller `do.c`
`final_level` `:2052` after `create_mplayers`). Live `js/minion.js`
+ `goto_level` Astral `madeNew`. Callees `lose_guardian_angel`
(`:467–494`) + `priest.c` `mk_roamer` (one export `js/mklev.js`;
splev D-1553) + `eat.c` `Hear_again` export. `SetVoice` no-op
without SND_LIB. `mtame=10` only if `u.uconduct.pets` already
non-zero (no `tamedog`/edog). **D-1617 `dog_move` Conflict
`lose_guardian_angel(mtmp)`** (`dogmove.c:1046–1053`; live
`js/dogmove.js`; body D-1608). **D-1616 `reset_hostility`**
(`priest.c:754–768`; caller `do.c` `final_level` `:2046`
`iter_mons`; live `js/priest.js` + `js/do.js` `final_level`).
Named: ACH_ASTR; Hear_again occupation afternmv. ndemon is D-1575; msummon S_ANGEL
flash is D-1597; create_mplayers is D-1596.

### `src/mplayer.c`

JS: `js/mplayer.js` — partial

**D-1584 `mk_mplayer`** (`mplayer.c:117–317`; static `dev_name` `:43–69` /
`get_mplname` `:71–92` / `mk_mplayer_armor` `:94–115`). Caller
`sp_lev.c` `create_monster` `:1985–1986` RANDOM `PM_ARCHEOLOGIST..PM_WIZARD`
`m->id` (not `is_mplayer(pm)` after mines/geno clear). Live
`js/mplayer.js` + `splev_create_monster`; callees `makemon`/`mongets`/
`mpickobj`/`mkmonmoney`/`rnd_*_item` (exported) / `mk_artifact` `A_NONE`
`adjust_spe=FALSE` / `is_art` Magicbane / `m_dowear` / `christen_monst` /
`rank_of` / `rnd_class` / `weapon.c` `monmightthrowwep` (`rwep[]`).
Occupied `rloc(RLOC_ERR|RLOC_NOMSG)` fire-and-forget like
`mk_roamer_splev` (JS `rloc` async). **D-1596 `create_mplayers`**
(`mplayer.c:326–353`; caller `do.c` `final_level` `:2049` Astral
`madeNew` `rn1(4,3), TRUE`). Live `js/mplayer.js` + `goto_level`
`Is_astralevel` (ACH_ASTR named; reset_hostility is D-1616;
gain_guardian_angel is D-1608). Callees `set_mon_data`/`goodpos`/`mk_mplayer`; tryct>50
aborts. **D-1606 `mplayer_talk`** (`mplayer.c:355–377`; caller
`sounds.c` MS_HUMANOID `:1026–1031` `!mpeaceful && In_endgame &&
is_mplayer`). Live `js/mplayer.js` + `js/sounds.js` `domonnoise`
endgame arm (`ECMD_TIME`); same-class vs other `rn2(3)` once;
`SetVoice` no-op without SND_LIB; mndx vs `urole.mnum` (`mons()` is
a fresh object). **D-1618 `domonnoise` MS_HUMANOID** (`sounds.c:1025–1104`
peaceful + hostile `"threatens you."`; MS_ORC remap `:705–709`
`same_race` current/`urace.mnum` then Hallu). Live `js/sounds.js`;
epilogue `pline_msg` then `verbalize`; gnome `rn2(4)` short-circuit.
Named: guardian/isshk/gecko remaps; SetVoice.
**D-1626 `domonnoise` MS_BOAST** (`sounds.c:1006–1023`; hostile
`rn2(4)` gem `mhis` / mutton / Fee-Fie `wake_nearto(7*7)`;
peaceful FALLTHROUGH into MS_HUMANOID). Live `js/sounds.js`;
`mhis` one export, now `js/mondata.js` (`you.h` `pronoun_gender`
PRONOUN_HALLU; D-1776 — `fountain.js` re-exports it).
Case 0 immediate pline then `ECMD_TIME`.
MS_HUMANOID is D-1618.
`mongets` mplayer-sword
spe is D-1607. ndemon is D-1575.

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
**D-1545 `detect_wsegs`** (`worm.c:502–519`; caller `detect.c` `map_monst` 
`:132–133` showtail && `PM_LONG_WORM` always `use_detection_glyph=0`; 
`monster_detect` TRUE / `do_vicinity_map` FALSE; `what_mon` once then 
`show_glyph` pet/mon/detected; `S_WORM_TAIL` class maps the long worm); 
**D-1549 `map_monst` identity** (`detect.c:132` / `:832–833`; JS
`data.mndx ?? mnum` not `mons()` ptr so D-1545 is reachable); 
**D-1548 `worm_known`** (`worm.c:877–893`; `display.h` `_canseemon` `:117–120` 
`wormno ? worm_known : cansee||infrared`; callers `mon.c` `monkilled` `:3384` 
+ `vision.c` `howmonseen` is D-1562; live `js/worm.js` + 
`js/display.js` `canseemon` + `js/mhitm.js` `monkilled`; trap/muse/mthrowu 
canseemon clones + monmove/dig stubs); 
**D-1550 trap `monkilled` clone** (`mon.c:3384–3385`; review **509**; 
`js/trap.js` same `wormno ? worm_known : cansee(head)` as mhitm; pit 
`thitm` / rust iron-golem / fire; not infrared; clone stays local); 
**D-1570 `cutworm`** (`worm.c:372–477`; callee `place_wsegs` `:614–635`;
callers `uhitm.c` `known_hitum` `:641–642` slice_or_chop after Vorpal
oldhp `*mhit`, `dothrow.c` `thitmonst` `:2206–2207` chopper=`is_axe`;
`m_lev>=3 && !rn2(3)` then `clone_mon`; `mcloned=0` + Nd8 not
`newmonhp`; live `js/worm.js` + uhitm/dothrow; restore/replmon
`place_wsegs` named); 
**D-1573 `wormgone`** (`worm.c:307–332`; callee `toss_wsegs`; caller `mon.c` `newcham`
`:5359` place_monster head-back; mondead `:2787` / dog `:755` callers still named);
**D-1577 `redraw_worm`** (`worm.c:989–998`; callers `dog.c` `tamedog` `:1275–1276`
after head `newsym`, `abuse_dog` `:1386–1390` when the pet goes wild; unlike
`see_wsegs` includes the dummy at `wheads`; live `js/worm.js` + `js/dog.js`);
**D-1798 `wormhitu`** (`worm.c:343–362`; caller `monmove.c` `dochug` PHASE FOUR;
skip dummy at `wheads`; `distu(wx,wy)<3` then `mattacku`; live `js/worm.js`);
omit save/rest wsegs, `flip_worm_segs_vertical`/`flip_worm_segs_horizontal`, muse/mhitu 
`worm_move` callers; muse.c/mon.c local `mon_set_minvis` clones; feel_location 
`is_worm_tail`; Detect_monsters cansee; MON_STILL_ARRIVING; 
map_monst head `pet_to_glyph` / `detected_mon_to_glyph` (plain `mon_glyph`); 
`worm_cross` live; `howmonseen` is D-1562; `worm_known` is D-1548; cutworm is D-1570; non-worm `level.monsters[][]` still fmon-only

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
Scr **561**/833); **D-1818 `Wiz-goal`** (Dark One / Eye; lua `aligned=` ≠
C `align` → `induced_align`; **D-1906** 14 empty `des.object` `:74–87`, not 15 — :73 is the named Eye); fakewiz deferred; **D-0906 hellfill** via mklev; 
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
**tut-1 loot→end + `mineralize` special skip after kelp** (D-0353) + **tut-2 second variant 14x8 + up stair + burn `eckey(up)` + seen portal** (D-1895) + 
**D-1847 `mineralize` gold/gem loop** (`mklev.c:1501–1540` skip `y+=2`/`y+=1` then for `y++`; `Is_special` `on_level`; `dunlev` 0; `bound_digging` earth/`W_NONPASSWALL`; `join` arboreal ROOM; `reset_xystart_size` at clear/makerooms/themerooms_post). Named: 1-cluster `ly=15` east HWALL+TRC (Knight d5 409 vs 410; C STONE vs JS walls; `wall_cleanup` blocked by interior ROOM); 
**`water_has_kelp` `!Is_waterlevel` + `In_endgame` return before kelp** (D-1059; 
tut_key/eckey/Knight jump/leave-invent/`map_location` tseen/`add_to_container` merge deferred); 
**occupied invocation_pos** (D-1154); omit other fill *bodies*, nested `des.room` bodies beyond 
Nesting/Fake Delphi/Huge/… outer sizes, Lua `post_level_generate` postprocess 
queue, `mkgrave_room` bury; **D-1533 `create_object` `o->lit` `begin_burn`** (`sp_lev.c:2425–2426` after `stackobj`, not tile.lit; `l_create_object` lit default 0; mktrap_victim is D-1519; **D-1542** themerms Light source fill); **D-1723 `lspo_object` non-merge quan do-while** (`sp_lev.c:3725–3740` `!objects[id].oc_merge`; find_objtype + argc string/coord; class-letter `def_char_to_objclass`/`mkgold`; other load_* `des.object` still hand-rolled); `Can_fall_thru` before hole→ROCKTRAP (Vlad niche); 
**D-0906 `hellfill`+`create_maze`/`LVLINIT_MAZE`** (seed4500 **32538→49776** Scr **459**; 
**hellfill Invocation_lev VS** (D-1154 `pick_vibrasquare_location`+`maketrap`); 
rnd_hell_prefab/`makemaz("")` deferred; **D-1841 `fakewiz1`/`fakewiz2`**); empty `makemaz("")`; Is_special/quest fill; 
**minefill `fixup_special`/`place_lregion(LR_BRANCH)` + Mines mineralize gold×2/gem×3** (D-0177); 
**`mkstairs` no-op on dunlev ends** (up on dlevel 1 / down on `Is_botlevel`; 
D-0928 #1152 — minefill `des.stair("up")` no longer plants dlevel-0 upstairs); 
omit lev_region[] compiler/`mkportal`; **D-1109 `lspo_exclusion`** (hellfill prefab / 
save/rest still named; **D-1820 `soko2-2`** uses it); seed0060 @ 2997 was **not** corridor typ (D-0032); 
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
**D-1823 `minend-3` load_special**) + **D-0756 `soko4-1` load_special** (Sokoban entry map + PIT/SCR_EARTH +
branch lregion pre-flip; seed0360 prefix **52601→53361**; 
Scr **238→242**) + **D-0757 `tower2` load_special** (Vlad middle: niche shuffle + ladders + 
demons/hounds + chest amulets + spbook shuffle; seed0360 prefix **53361→53591**; 
Scr **242→246**) + **D-0758 `tower3` load_special** (Vlad entry: unshuffled niches + 
branch levregion + `D`/fixed+random mons + niche loot/traps; seed0360 prefix **53591→55374**; 
Scr **246→261**; **D-1820 `soko2-2`**; **D-1826 `medusa-2`/`-4`**); 
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
**D-1513 minetn-7 town-floor three gnomes**; **D-1841 `fakewiz1`/`fakewiz2`** (hellfill D-0906); 
flip_level lregion coord update deferred; 
**D-0608 `minend-1` `des.object("(")`→TOOL not WEAPON** (defsym `'('`=TOOL_CLASS); 
**D-0543 `soko1-2` load_special** (map/reward percent(25); other `soko*-*` deferred); 
**D-0547 `soko2-1` + `is_ok_location_dry` boulder reject**; **D-1820 `soko2-2`**; 
**D-0548 `soko3-1`/`soko3-2`/`soko4-2` load_special**; 
**D-0567 Sokoban `premap_detect`/`solidify_map`/`SpLev_Map` + 
flip `fix_wall_spines`** (**D-1820 `soko2-2`**; `soko4-1` D-0756); 
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
**D-1553** generic `splev_create_monster` amask dispatch — Pri-loca/sanctum
noalign now call it; **D-1584 `mk_mplayer`**) + **D-0658 `link_doors_rooms` + eastern hx=39** (D-0645 hx=35 interim retired; 
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
`fill_special_room` TEMPLE `has_temple`); **D-1819 `Bar-goal`** (Thoth Amon /
Heart; `align="noncoaligned"` → `AM_SPLEV_NONCO`) + **D-1824** fourteen
empty `des.object()` after Heart (`dat/Bar-goal.lua` `:44–57`; not
Wiz-goal's 15); **D-1826 `medusa-2`/`-4`** (twin-island palace /
yellow-dragon nest; Medusa 4/4); 
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
`:2125–2129`) + **D-1553** generic `splev_create_monster` `sp_amask_to_amask`
(CO/NONCO/RANDOM/`AM_MASK`) then non-RANDOM `mk_roamer` else `makemon(mm_flags)`;
`splev_room_monster` / `_at` wrappers; Pri-loca/sanctum noalign via dispatcher;
`mk_mplayer` role-id / appear_as / christen / invent / G_UNIQ extinct named; 
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
seed2600 RNG **FULL 11647** Scr **23→35**) +
**D-1821 `bigrm-5`/`-6`/`-11` load_special** (diamond ice/cloud grow; four-lobe
trees/fountains; maze corrwid `3+rn2(3)` wall→boulder + rolling-boulder traps;
`splev_create_trap` named type; `lspo_replace_terrain` selection arm) +
**D-1822 `bigrm-1`/`-10`/`-13` load_special** (percent(80) line/plus/snake
`selection_do_line`; fog maze `mazewalk`+levregion stair-up; 8-filter pillars
via nested `lspo_map` coord); Big Room 13/13;
**D-1823 `minend-3` load_special** (Catacombs: HWALL solidfill so mazewalk
carves map STONE only; valign bottom; west `stocked=false`; lua wallify;
luckstone prize + flint + level-teleports); Mine's End 3/3;
**D-0651 `medusa-1` load_special** + `Is_medusa_level` fixup statues;
**D-0759 `medusa-3` load_special** (place `selection_rndcoord` + Perseus/ravens; 
`mk_artifact` A_NONE) + **D-0928 open** #1092 C recorder: medusa-3 flip **sum81** stair**(32,16)** 
place≡JS land**(43,6)** (screen `>`@31/`@`(42,6) misleading); last=77/sum80 dead; 
`Flip_coord` inFlipArea+x restored; SpLev_Map flip omit (C); @88377 linedup still; **D-1826 `medusa-2`/`-4`**; 
**D-0654 empty-statue `resists_ston`/`poly_when_stoned`/`propagate` + 
extract `mresists`** (worn/artifact STONE_RES deferred; **D-1826 `medusa-2`/`-4`**); 
**D-0566 `light_region` wall-expand for bigrm-2/8 `des.region(...,"lit")`** + 
**D-1846 `bigrm-2` darkness choice 0–2 `des.region(...,"unlit")`**
(`dat/bigrm-2.lua` `:34–48`; argc=2 does not grow; Healer `^V` Dlvl:10
`rn2(4)=2` side strips; ice `selection:grow` after percent(25) live
**D-1856** `lspo_replace_terrain_sel` ROOM→ICE 100) + **`splev_apply_centered_map`/`splev_apply_map_at` force
`loc.lit=false`** (C `lspo_map` lit defaults FALSE; JS `sel_set_ter(false)`
is still nochange) + 
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
`setup` S_air memory** (water cons pickup) + 
**D-1827 `water` load_special + `save_waterlevel`/`restore_waterlevel`/
`unsetup_waterlevel`/`set_wportal`** (76×20 WATER map, left-third tele,
astral portal, eels/kraken/sharks + 19 hostile water elementals; bubble
chain persist on savelev/getlev); 
**D-1828 `astral` load_special** (endgame 5 of 5: 75×20 temples, 60% wing
rooms, shuffled sanctums + `priestini`, Moloch/aligned hordes, Riders;
`deliver_splev_message` `convert_line` `%d`); 
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
**D-1818 `Wiz-goal`**; **D-1819 `Bar-goal`**; **D-1841 `fakewiz1`/`fakewiz2`); **D-1952 `mkmaze.c` `is_solid`/`mazexy`** (local `isSolidTile` clone retired; `wall_cleanup` calls `is_solid`; `mazexy` live but `populate_maze`/`create_maze`/`maze0xy`/`walkfrom` callers still deferred)

### `src/mkmap.c` cavern generator

JS: `js/mkmap.js` — complete envelope, live (D-1902 passes + D-1908 driver + D-1910 join + D-1911 finish/cutover; the `splev_initlev` LVLINIT_MINES path awaits the canonical `mkmap()`; `wallify_map` imported from `js/mklev.js`, never cloned)

**`get_map`/`pass_one`/`pass_two`/`pass_three`/`remove_room`/`remove_rooms`** (D-1902; C `mkmap.c:54–60` bounds-exact OOB→bg / `:67–96` in-place CA (0–2 kill, 5–8 breed) / `:100–144` double-buffered ==5 / <3 with per-call scratch at the C `new_loc` layout / `:378–436` total-overlap removal + last-over-slot swap with `roomnoidx` restamp; `remove_rooms` async for `await impossible`, `remove_room` spread-copy never aliases the `hx=-1` tombstone); **`init_map`/`init_fill`/`litstate_rnd`/`mkmap`** (D-1908; C `:23–34` blanket NO_ROOM/bg/unlit `:36–52` rn1/rnd scatter to limit 624 `:438–440` N_P1/P2/P3_ITER=1/1/2 `:442–448` depth-gated lit `:450–486` driver in C order; C `:460`/`:485` new_locations alloc/free maps to the D-1902 per-call scratch — observationally identical, no shared buffer to own); **`join_map`/`join_map_cleanup`** (D-1910; C `mkmap.c:257–328` fill loop + `joinm:` join pass / `:245–255` roomno strip + `nroom`/`nsubroom` reset with `rooms[0]`/`rooms[MAXNROFROOMS+1]` tombstones; `somexy`-failure `await impossible()` arm with centre fallback, `somexy`/`dig_corridor` short-circuits preserved for RNG, `mkmap()` driver `await`s the canonical join); **`finish_map`** (D-1911; C `mkmap.c:330–363` whole-map wallify under `walled` / `!IS_OBSTRUCTED` fg/bg + `TREE` + `walled && IS_WALL` lit with per-room `rlit` / unconditional lava light + `icedpools ? ICED_POOL : ICED_MOAT` (8/16 — the retired clone wrote 1/2); driver `:478` finish call + `:480–484` walled+joined cavernous stamp live); live cutover: `splev_initlev` MINES `await`s canonical `mkmap` (`async` through 30 MINES loaders + hellfill chain + `load_special_proto`); the `mklev.js` envelope clones (`mkmap_init_*`, `mkmap_get`, `MKMAP_DIRS`, `mkmap_pass_*`, `join_map_fixed`, `join_map_dig_pass`, local `join_map_cleanup`, `finish_map`, local `mkmap`) deleted; retained: `mklev.js` `wallify_map` (canonical C `sp_lev.c` home, exported), `litstate_rnd` local (non-MINES `rlit` site; pre-existing D-1908 debt), `MKMAP_WIDTH`/`HEIGHT` (`flood_fill` use);

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
**`recalc_block_point` D-0113 stub retired in D-1574** (C `does_block` then
`block_point` else `unblock_point`; not a full `vision_reset`); 
**off-hero `do_clear_area`/`view_from` vis_func for wantdoor** (D-0211; **`override_vision` + single async export D-1785** — `dog_goal` is async now); 
**`does_block` BOULDER (+ CLOUD/WATERWALL/LAVAWALL)** (D-0242; exported, was `_blocks`) + 
**`is_lightblocker_mappear` mimic boulder/door/wall/tree** (D-0585) + 
**`visible_region_at` gas cloud return 2** (D-0674) + 
**D-1557 `block_point`/`fill_point`** (`vision.c:864–891` / `:1050–1128`; caller `set_mimic_sym`; leftover `i`; `vision_reset` `!!does_block`); 
**D-1574 `unblock_point`/`dig_point`** (`:898–907` / `:967–1048`; `seemimic`
`:4415–4424` after `M_AP_NOTHING`; `recalc_block_point` `:910–917`); 
**D-1576 `region.c` `add_region` `:326–328` / `remove_region` `:375–376` /
`expire_gas_cloud` `:1071–1072`** per-cell `block_point`/`unblock_point`
(not one-corner `recalc`; seed4500 FAIL at D-1574); 
**D-1598 `seemimic` `has_mcorpsenm`/`freemcorpsenm`**; **D-1587 `display.c` `mimic_light_blocking`**
See_invisible `block_point`/`unblock_point` (not `recalc`; potion/timeout/polyself
callers + `iter_mons` `mon_offmap` named); 
**detect SCORR/SDOOR uncover uses `recalc_block_point`** (D-0269); 
**`Is_rogue_level` → `rogue_vision`** (D-0486; room bounds + adjacent; pit/underwater deferred); 
**Blind `vision_recalc` COULD_SEE-only + old IN_SIGHT newsym** (D-0579); 
**`do_light_sources` TEMP_LIT + makemon `emits_light` LS_MONSTER** (D-0569; 
**D-1597 camera range 0** Null-id `LS_OBJECT` + `show_transient_light`;
circle_ptr exact ring / hero range trim still named); **D-1956 `obj_adjust_light_radius`** (`light.c:825–838`; first LS_OBJECT id-match wins, recalc only on change, else `impossible(xname)`; live `js/light.js` async; caller `mkobj.c` `maybe_adjust_light` bless/curse wiring named); **D-0675:** stale gas across levels blocked LOS (not 
Algorithm-C TRWALL); **`clear_regions` in `clear_level_structures` + 
goto_level stash/rest** (binary `save_regions` format / free_region teardown deferred); 
**D-0773 open:** wizard2 mumak LOS — JS `viz_clear` blocks at ROOM boulder → linedup rn2(3); 
C screen lava flanks differ + warn mon @(55,9); recorder `couldsee`/boulder open; 
Underwater moat in does_block deferred; seed0030 @372 blank niche was **not** doorway LOS (D-0302 
lit); **D-1562 `howmonseen`** (`vision.c:2151–2186`; callers `apply.c` `use_mirror` 
`:1108` SEENMON vs INFRAVIS-only + `pager.c` `look_at_monster` `:485–554` monbuf 
`[seen:]`; `look_all` NULL; `worm_known` is D-1548; mdistu inlined); 
**D-1571 `vision_recalc` xray IN_SIGHT** (`:631–668`; `circle_ptr` +
seenv SVALL + rmin/rmax + newsym before lights; Eyes D-1558 3/−1;
not rogue/Blind/`control==2`); **D-1583 `vision_recalc` nv_range
circle** (`:670–700`; `has_night_vision && xray_range < nv_range`;
`circle_ptr`; `if (next_row[col]) |=IN_SIGHT`; range 0 hero SVALL;
lighting-loop 3×3 stand-in retired; `u_init_misc` nv_range=1);
**D-1574 `unblock_point`/`dig_point`**;
**D-1576 region per-cell block/unblock**;
**D-1863 `vision_recalc` pit TT_PIT 3×3** (`vision.c:609–622`; `u.utrap &&
u.utraptype == TT_PIT` → immediate 3×3 IN_SIGHT|COULD_SEE, xray/nv still
apply) + **post-`rhack` `vision_full_recalc` consume** (`allmain.c:541–542`;
monsters next iteration see post-hero-action vision);
underwater `has_night_vision=0` + pool 3×3 / `notice_all_mons` still named;
**D-1955 `new_angle` live-macro** (`vision.c:461` `#else` `(*sv)`; `lev`/`row`/`col`
unused per the C comment) — exported `new_angle(lev, sv, row, col)` (`js/vision.js`,
`sv | 0` int idiom), all 3 main-loop sites (`:749,776,790`) wired.
Named: `#ifdef EXTEND_SPINE` staticfn body (`:413–451`, CROSSWALL..TRWALL
spine extension via `viz_clear`) compiled out (`:366` commented) — display
cosmetic, intentionally not ported; xray/nv/pit `seenv = SVALL` arms never
called `new_angle` in C (direct assignment, unchanged)

### `src/trap.c`

JS: `js/trap.js` — partial

**`trapname` Hallu (D-1759;** C `:7098–7155` display rng + 62
`halu_trapnames` + role/rank `" trap"`; `trap_to_glyph` is not Hallu;
detect clone retired; **pager `trap_description` D-1779** — C
`pager.c:164–181` chest-then-door-then-`trapname`, over `detect.c`
`trapped_chest_at` `:135–177` / `trapped_door_at` `:178–197`, both of
which draw `rn2(20)` while Hallucinating (RNG-visible from farlook);
live `js/detect.js` exports + `js/pager.js` local (C `staticfn`);
named: callers still pass the live `t_at` ttyp, not
`glyph_to_trap(glyph_at())`, and C's own TODO on recursive/buried
containers); 
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
**hero `dotrap` + dart `t_missile`/`thitu` miss place** (D-0239; **full `dotrap` dispatch body D-1924** — C `:2996–3060` order: `FORCETRAP||FAILEDUNTRAP`, `plunged`/`conj_pit`/`adj_pit` before `nomul(0)`, `fixed_tele_trap` FORCETRAP force, Sokoban pit/hole air-currents `trapname(TRUE)` fall-through, `floor_trigger+check_in_air` step-over with `u_locomotion_pit`, `already_seen` escape `!Fumbling && !undestroyable && !=ANTI_MAGIC && !forcebungle && !plunged && !conj/adj && (!rn2(5)||(is_pit&&is_clinger))`, steed `mon_learns_traps`, mutated `trflags` to selector); 
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
**Punished pit `unplacebc`/`ballfall`/`placebc` D-1778** (C `trap.c:1955–1958`; 
callers gate on `u.uball` ≡ C `Punished` **D-1786**)**, 
vault/shop/temple `ceiling` labels, `helm_simple_name` hat polish; **`instapetrify`/`selftouch`/`mselftouch`/`minstapetrify` + 
`mon_to_stone`/`vamp_stone`/`monstone` + `xkilled` stoned** (D-0995/D-0996), `float_vs_flight`, 
full `body_part` poly, `stone_missile`/`passes_rocks` harmless arm in `thitm`, **`mons_see_trap`** 
(D-0701); **`mintrap` already_seen = mon_knows_traps || (HOLE && !mindless)** (D-0703; 
**floor_trigger+check_in_air skip** D-0770; **full `mintrap` dispatch body D-1922** — trapped-arm `!rn2(40) || easy-pit` escape, boulder `!rn2(2)` pulls-free + fill_pit, metallivorous bear-trap eat / spiked-pit munch (meating=5), `easily ` adverb + set_msg_xy; fresh-arm fixed_tele_trap FORCETRAP force, usteed + Sokoban pit/hole gate skip, madeby_u rnl setmangry, unhide+appears envelope); 
full `m_harmless_trap` anti-magic/webmaker/`defended` resists (flyer check_in_air + SLP/FIRE + 
BEAR/WEB/RUST/VIBRATING/PIT done D-0245/D-0770), Deaf+mindless silent, 
`disturb_buried_zombies`, empty-door pline_mon, drawbridge-under pool/lava; 
**`maketrap` STATUE_TRAP → `mk_trap_statue`** (D-0538; 
full `mongone`/MM_NOCOUNTBIRTH born tally deferred); fate-20 `seffects(SPE_REMOVE_CURSE)`; 
fire `destroy_items`/`ignite`/`burn_floor`/`melt_ice`/`surface`/`data->mresists`/`minuhpmax`/`
losexp`; MAGIC_PORTAL/LEVEL_TELEP `mlevel_tele_trap` arms; valley_level stronghold dest; 
migrate light/worm/isshk; **`encumber_msg` callers beyond set_wounded_legs/preamble** (allmain 
turn-loop / exercise STR·CON / pickup/drop); Lev/air/steed `weight_cap` MAX; `stagger()` poly; 
`heal_legs`; **`body_part`** / **`mbodypart`** import `polyself.js` (D-1496;
steed FOOT uses `mbodypart(usteed)`, not the hero). **mcastu HEAD /
pickup HAND D-1508**. **`mcast_blind_you` EYE D-1534**. **`observe_quantum_cat` FOOT D-1535**.
**`drown` crawl-out D-1814** (C `emergency_disrobe` `:4896` /
`rnd_nextto_goodpos` `:4944` / crawl `teleds(TELEDS_ALLOW_DRAG)`
`:5154–5166`; JS stub always-TRUE disrobe + `teleds_drown`; now those
plus `unmul`/`reset_faint`/`mmove`; named: Amphibious wade,
Teleportation escape, steed, drowning `done()` loop, `feel_newsym`
waterwall, lava_effects). **`climb_pit` + file-local `m_easy_escape_pit`**
(D-1876; C `trap.c:4183–4230` Passes_walls ascend / `!rn2(2)` boulder
crevice with `display_nhwindow` flush / Flying-clinger climb-out /
`--utrap`-or-easy-escape (pit fiend, `msize >= MZ_HUGE`) crawl-out with
Sokoban+Levitation float variant / Norep still-in-pit with Hallu `!rn2(5)`;
wired into `trapmove` TT_PIT (`js/hack.js`) + `doup` pit gate (`js/do.js`);
named: poly `locomotion()` verbs, `clear_nhwindow` past the flush).
**`m_easy_escape_pit` pit-fiend identity arm** (D-1933; `data === mons[PM_PIT_FIEND]`
was dead — `mons` is a factory function returning a fresh snapshot per call, so
the subscript was `undefined`; C `ptr == &mons[PM_PIT_FIEND]` is now
`(data?.mndx | 0) === PM_PIT_FIEND`, the monsndx-equivalent idiom per
js/do.js/js/do_name.js; pit fiend msize 3 < MZ_HUGE 4, so the arm is load-bearing).
**`lava_effects` full C-order port** (D-1913; C `trap.c:6794–6987`):
`d(6,6)` before `in_lava_effects` guard; `feel_newsym` + `burn_away_slime` +
`likes_lava` early FALSE; `usurvive = Fire||(Wwalking&&dmg<uhp)` (uprops slots +
flats, `Is_waterlevel`); `!usurvive` invent `in_use` flags with one
`protect_oid` + `impossible`; boots burst first (`Boots_off` + `useup`);
`!Fire` Wwalking-burn→burn_stuff else fall, Lifesaved/discover/wizard survive,
guarded invent burn (Book glow, worn burst + `remove_worn_item(TRUE)` +
`useupall`, summary), boil-away poly, 2x `done(BURNING)` + `safe_teleds` loop,
double-fail `HFire_resistance`/`HWwalking` TIMEOUT 5 →burn_stuff,
`rescued_from_terrain` + `spoteffects(FALSE)` TRUE; `Fire+!Wwalking+!trapped`
sink (`rn1` short-circuit, `set_utrap`, `monstseesu`, `losehp`); burn_stuff
`destroy_items(AD_FIRE)` + `ignite_items`. Named: none new (`sink_into_lava`
not called by C here). **`Wwalking` live re-read** (D-1918): post-boots
`if (Wwalking)` / sink `else if (!Wwalking…)` / countermeasure `if (!Wwalking)`
re-read the macro via `liveWwalking()` (boots burst clears the slot through
`Boots_off`); entry snapshot kept for entry `usurvive` + the flag loop.

### `src/dog.c` `tamedog` / `initedog`

JS: `js/dog.js` — partial

**`tamedog` obj=null envelope** peaceful+edog for magic-trap fate 19 (D-0266) + 
**demonpet `tamedog(null, FALSE)` D-1252**; 
**`initedog` `set_malign` after mpeaceful=1 + domestic minimumtame** (D-0839; 
starting-pet malign −9 vs renegade +3); 
**`tamedog` `obj && dogfood >= MANFOOD` D-1502** (C `:1247`; invoke TAMING zeroobj → APPORT so 
tame-extend is rejected after peaceful); 
**`tamedog` is_covetous / is_demon-vs-hero / quest leader / blessed-scroll +2 /
givemsg `pline_mon` / post-tame `mon_wield_item` D-1532**
(C `:1169–1280`; `is_minion` is `mtmp.isminion` like C `mtmp->isminion`);
**`tamedog` isshk `make_happy_shk` D-1540** (C `:1235–1238` + `shk.c` `:1395–1435`;
not pacify+“calms down” only);
**`tamedog` `wake_nearto(mx,my,1)` D-1546** (C `:1159–1161`; live `mon.js`
`wake_nearto_core` wake_msg + STRAT_WAITMASK + disturb; distance==1
limits to mtmp cell, not `wakeup()` anger);
**`tamedog`/`abuse_dog` `redraw_worm` D-1577** (C `worm.c:989–998`);
**`tamedog` FULL_MOON night S_DOG `rn2(6)` + already-tame catch
`pline_mon` / big_corpse / `Tobjnam` stop D-1585** (C `:1176–1178` /
`:1199–1209`; `objnam.c` `Tobjnam`; generated mlet `'S_DOG'`;
left-to-right `night()` then `rn2(6)` even if `obj` is null / not a dog);
**`tamedog` ustuck expels/unstuck D-1593** (C `:1184–1190`; live
`mhitu.js` `expels`/`unstuck`; `engrave.js` `sticks` not monmove
AT_HUGS=6; after mflee, before already-tame food);
**`tamedog` `initedog` `has_edog` vs `!mtame` D-1595** (C `:1253–1259`
`newedog`+`initedog(TRUE)` else `initedog(FALSE)`; `dog.c` `newedog`
`:22–32`; `makemon.c` MM_EDOG `:1245–1246`; `initedog` `EDOG(mtmp)`;
mirrors `mtmp.edog` for dogmove;
**`initedog` ogoal `-1` + first-pet livelog D-1610** (C `:63–87`;
`dog_goal` `ogoal.x` truthy sentinel; live `livelog_printf`/`uhis`/`an`/
export `mon_pmname`; starting pet skips livelog because `!in_moveloop`);
**`free_edog` + restore `newedog` D-1629** (`dog.c` `:34–42` drop EDOG
then `mtame=0`, extern-only in C; `restore.c` `restmon` `:349–361`
`newedog`+apport≤0→1; pair `save.c` `savemon` `:860–869`; JSON
absolute times, `game.moves` restored first; live `js/dog.js` +
`js/makemon.js` `restmon_edog`/`savemon_edog` + save/bones restmon);
read.c light-scroll `initedog` / `dealloc_mextra` / relative_time
pair named)



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
browse_map(TER_DETECT\|TER_MON)** (D-0370); empty strange_feeling D-1418;
**detect_wsegs D-1545**; **long-worm mndx/mnum D-1549**; omit cursed wake; blessed WIN_MAP; 
unconstrain; pet/detected glyphs; TER_DETECT autodescribe text

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
**grease spray `update_inventory` + `make_glib` uarmg D-1683** (C `sit.c:266–279` /
`potion.c:466–467`; `COIN_CLASS` skip same as `grease_ok`; not `use_grease`) /
wish / drain `losexp` / attrcurse / VS `schedule_goto` / `msummon` / 
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
**`body_part`** imports `polyself.js` (exact-name clone retired);
**`eyecount` D-1652** (C `mondata.h` via `js/monsters.js`;
`throne_sit_effect` Blind case 10 0 HEAD / 1 singular / 2+ plural
tingle — not always-2 stub; pray TROUBLE_BLIND + potionbreathe sting
import the same export; spell dull / zap rider / dothrow POT_WATER /
mthrowu venom / `make_blinded` itch still named);
**grease spray D-1683** (case 6 invent `update_inventory` after
`make_glib(rn1(101,100))`; callee `uarmg` refresh; rndcurse redraw named).

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
**sized rectangular outer rooms** Fake Delphi/Huge/Mausoleum/Random feature/Twin (D-0248) +
**nested `des.room` via `splev_des_room`/`build_room` chance** Fake Delphi / Room-in-a-room /
Huge / Mausoleum / Twin (D-1836; `filled` default 0 in `in_mk_themerooms`; weapon+armor
`splev_roomtype`); **Pillars terr shuffle + 2×2 terrain** (D-0901); 
**Temple of the gods fill** + themes `splev_align` store (D-0895; 
three `create_altar`/`get_free_room_loc`); 
**Cloud room fill** + `lspo_gas_cloud`/`create_gas_cloud_selection` (D-1158; 
1×1 bitmap, ttl −1, not BFS; asleep fog `numpoints/4`); 
**Light source fill** + `l_create_object` oil lamp `lit=true` (D-1542; 
needs_unlit `rm.lit==false`; callee D-1533 `o->lit` `begin_burn`; not 
`create_object_themed`/`mksobj_at`); **Ice / Boulder / Spider nest / Trap room fills**
(D-1840; `selection_filter_percent` `rn2(100)<pct` x-outer then Lua iterate
y-outer; Ice `set_levltyp` ICE + `percent(25)` `nhl_start_timer_at` melt-ice;
Boulder `percent(50)` boulder vs rolling-boulder trap; Spider `difficulty>8`
`and percent(80)` spider_on_web; Trap shuffle eight kinds then `traps[1]`;
`splev_create_trap_coord` `get_free_room_loc` + `mktrap` tm); **Kni-goal** (D-0928 #1134) + **Kni-strt/loca/fila/filb** (D-1829; Camelot
mines-kludge + Isle of Glass swamp mines + fillers); **Rog-strt/loca/goal/fila/filb** (D-1830; Rogue quest 5/5:
shuffle-exit mimics `S_dnstair` + floodfill streets + Master Key);
**Val-strt/loca/goal/fila/filb** (D-1852; Valkyrie quest 5/5: lava-ringed ice
pools + Norn CUSTOM_INVENT + lava drawbridges + Orb of Fate; mines
`icedpools: true` live via `finish_map`); **Sam-strt/loca/goal/fila/filb**
(D-1858; Samurai quest 5/5: Sato CUSTOM_INVENT erodeproof + class-object
coords + Tsurugi + rn2 ring holes; fila mines no-lit-key);
**Hea-strt/loca/goal/fila/filb** (D-1885; Healer quest 5/5:
Hippocrates silver-dagger invent + P→room chance-10 replace + chaos-shrine
priestini + Staff of Aesculapius + Cyclops; ';'→S_EEL class fix);
**Tou-strt/loca/goal/fila/filb** (D-1887 + D-1888; Tourist quest 5/5:
morgue/shop/barracks/zoo/temple FILL_NORMAL rects + ordinary-rect
lighting-only (litstate_rnd(-1)) + blank-paper pair + '.'-minus-shops
`selection_sub` rndcoord traps (D-1944; Tou-loca.lua:131 sub-of-or +
Tou-goal.lua:112; named deferred: `l_selection_xor`, mutating
`selection_clear`, ellipse/gradient/circle) + Platinum Yendorian Express Card + Kops + des.wallify();
fila/filb mines no-lit-key; strt has Twoflower CUSTOM_INVENT
(walking shoes +3, hawaiian shirt +3) + chest + branch levregion cell);
**Ran-strt/loca/goal/fila/filb** (D-1889; Ranger quest 5/5: arboreal
solidfill-"." + pre-map whole-level "."→T chance-5 replace + left/center
map + absolute islev branch rect, Orion CUSTOM_INVENT (leather armor/yumi/
ya×50) + asleep minotaur siege, wumpus loca, Longbow of Diana + Scorpius +
des.wallify() goal, TREE/STONE-bg noflip fillers);
**Mon-strt/loca/goal/fila/filb** (D-1890; Monk quest 5/5: Pri-strt-identical
20x76 map but temple needfill 0 — no `filled` key (sp_lev.c lspo_region
:5600 default) — lua-order floodfill-then-terrain, Grand Master robe +6
invent, tin×2/food-ration×4 l_create_object, abbots, 8+4 siege; loca 76x21
map + random stairs + negate-filter rndcoord(0) blessed spinach tin + burn
Elbereth; goal mines-only init (solidfill commented out) + Pri-goal map +
Eyes of the Overworld lenses with no oerodeproof + Master Kaen/altar pick;
all-ordinary hostile-E/X fillers);
**Cav-strt/loca/goal/fila/filb** (D-1891; Caveman quest 5/5: 76x20 maps,
strt whole-map unlit + temple filled=1 FILL_NORMAL flood (sp_lev.c :5600)
+ 6 ordinary irregulars needfill 0 + coaligned shrine via
sp_amask_to_amask(AM_SPLEV_CO) + Shaman Karnov armor/club +5 + chest +
neanderthals + 2 fixed pits + 12 hostile bugbears; loca mazelevel/
hardfloor no-noteleport + fixed stairs + hostile h/H stock; goal
solidfill-only + whole-map lit + Sceptre of Might mace + asleep
Chromatic Dragon + shriekers; Ran-fila mines+noflip fillers;
D-1893 des.wallify() epilogue in strt/loca/goal via existing
wallify_map on splev extents (sp_lev.c lspo_wallify :5965 → wallify_map
:2865), lua-final before wallification → flip → fixup);
**knox** (D-1853; Fort Ludios
76x20 solidfill vault: branch + up/down tele, throne COURT, vault gold/trap
iterate y-outer, zoo/arrival/barracks, 11 doors, soldiers/D/eels, gems);
full Lua VM + remaining `des.*` still production requirement; 
Random-feature center terrain + 
other fill bodies (Buried treasure/Massacre/Statuary/…) 
+ dig postprocess absent; icedpool on ICE (`splev_init_present`); exclusion_zones save/rest deferred;
**Garden fill + `make_garden_walls` postprocess** (D-1861; numpoints/6
asleep wood nymphs via `splev_room_monster` default-random `induced_align`,
`percent(30)` DRY `des.feature` fountain, grown-sel walls→TREE +
SDOOR-kept `arboreal_sdoor` per-cell `rn2(100)`; `cvt_sdoor_to_door` clears it)

### `src/mkroom.c` `mkshop` / `src/shknam.c` `stock_room` / `src/shk.c`

JS: `js/mklev.js`, `js/shknam.js`, `js/makemon.js`, `js/shk.js` — partial

**`mkshop` eligibility + shtypes** (D-0201); 
**`stock_room`/`shkinit`/`mkshobj_at`/`get_shop_item`/iprobs/shknms + 
shopkeeper `m_initinv`/`rnd_misc_item`/`MM_ESHK` + tribute novel** (D-0203); 
**`stock_room` locked-door `"Closed for inventory"` cell via `shk.c` `inside_shop` (`edge` = outside) + `Is_special`/`in_rooms` ROOM-or-CORR rewrite** (D-1849; shknam `inside_shop` clone removed — it ignored `edge`, put the engraving in rock and made that rock ROOM, costing `mineralize` one gold cell); 
**`make_happy_shk` adjalign / `home_shk` / migrate / `make_happy_shoppers` D-1540**
(C `:1395–1435`; `kops_gone`; `pacify_guards` mon.c clone; live
`mdrop_special_objs`/`migrate_to_level`; named: full `mnearto` yank;
`after_shk_move` occupancy `check_special_room`; `losedogs` shoppers);
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
**COCKNEST `fill_zoo` statue + `rn2(5)` loot / ANTHOLE `antholemon`+food + BARRACKS/SWAMP `has_*`** (this D); 
**SWAMP `mkswamp`** (D-1869); `antholemon()` do_mkroom gate; `shk_fixes_damage`; holetime follow; following verbalize; 
`gd_move`/`pri_move` bodies; `after_shk_move` bill_p; unpaid leave verbalize/rob_shop; 
`addupbill` body; `clear_unpaid`/`mongone` full; `paygd`

