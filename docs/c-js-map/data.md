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
HI_OBJ/HI_METAL extractor aliases still diverge from color.h; **`mrs[]` / `mons().mr`** (D-2135; LVL group-4 permonst.mr drives `zap.c:6141` resist; 225/383 nonzero)

### rumor sources

JS: extractor + generated rumors — partial

Fortune path exercised

**D-2513 `getrumor` whole body** (`rumors.c:117–191`; live `js/rumors.js:93` in C order — `:129` guard, `:139–143` init sizes, `:149–163` adjtruth switch + default, `:164–166` buf `get_rnd_line`, `:168–175` cookie loop + `count>=50` + exercise else, `:176–181` open-fail + cookie strip; callers `engrave.c:57` → `js/engrave.js:210`, `rumors.c:551` → `js/rumors.js:169`, `artifact.c:2289` named omit unported `arti_speak`). Named: dlb handles + `init_rumors` parse (Rule #2 embed) + `couldnt_open_file` suppression.
**D-2556 `rumor_check` whole body** (`rumors.c:196–302`; live `js/rumors.js` in C order — open gate, embed init `start = 0` + sizes + `true_end == false_start`, `%06ld (%06lx)` stats, first/last true+false decrypted via `splitEmbedLines` + live `xcrypt` (padding kept), `no_rumors` pline + `flush_topl_more`, `others_check` (`:307–408`) ×3 into shared `lines[]` shown once via `show_text_pages`, file-local `couldnt_open_file` (`:769–782`) live; caller `wizcmds.c wiz_rumor_check` → `js/wizcmds.js:514` + runnable `#wizrumorcheck` `js/getline.js`). Named: `init_rumors` parse (build-time) + absolute START offsets (section-relative) + unreachable open-fail/comment-validation/create-fail arms + `dlb_fclose`.
**D-2603 `outoracle` whole body** (`rumors.c:640–693`; live `js/rumors.js:388` in C order — `:649–650` early return, `:652` embed-open check with the `:689–692` open-failed arm live (`couldnt_open_file(ORACLEFILE)` + `oracle_flg = -1`, unreachable under the embed, getrumor precedent), `:655–659` first-use `init_oracles` (`:576–595`, module-local `js/rumors.js:373`, deck = ORACLE_RECORDS indices, index 0 special) + empty-deck close, `:663–664` shouldn't-happen gate, `:665` pick (`rnd(cnt-1)` 1..cnt-1, special short-circuits), `:666` seek-as-index with pre-swap snapshot, `:667–668` swap-remove, `:670–678` window + headers, `:680–684` record lines (newline strip + xcrypt build-subsumed via `extract-oracles.py`; makedefs packs xcrypt'd `util/makedefs.c:1469/1500`), `:685–688` show + fclose no-op; caller `rumors.c:755` → `js/rumors.js:541` (`doconsult`, already wired). Named: none new.
**D-2729 `outrumor` whole body** (`rumors.c:528–574`; live `js/rumors.js:171` in C order — `:539–549` faint/Blind gates before getrumor (`is_fainted` new `./eat.js` edge, SAFE; `Blind` joins `./invent.js` import), `:551` getrumor + renovation fallback, `:554–563` oracle adverb chain + `SetVoice` + `verbalize` (no-arg call is `%`-verbatim, C `verbalize1`), `:564–571` cookie/paper tail; callers `eat.c:2523` → `js/eat.js:2058`, `read.c:368` → `js/read.js:2193` (FORTUNE_COOKIE arm, this commit), `rumors.c:747` → `js/rumors.js:534`; `:139`/`:207` init comments, not calls). Named: none new.

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
**read_tribute D-2582** (`files.c` `:3473–3645` whole-body restart in C order with `:line` cites — `switch (line[0])` `%`/`#`/`default` (`:3533`); split keeps `\n` so live `strip_newline` (`pager.js`, `hacklib.c:179–190`) runs exactly like C (`:3532`); `linect` kept for the compiled-out bad-`%` message (`:3531`, `:3589–3591`); cap C-exact `(bufsz|0) - 1` (`:3606`); `choose_passage` vs clamped explicit passage (`:3553–3556`); `%e` goto + scope pop (`:3580–3588`); attribution + `putmsghistory` (`:3629–3635`); window create deferred, `:3575–3576` WIN_ERR named infallible, `:3638` destroy owned by `show_nhw_menu_text`; `debugpline3` (`:3499–3500`) compiled out; dlb → embed (D-0477); live `js/files.js:314`, callers `spell.c:517` → `js/spell.js:1034`, `files.c:3652` → `js/files.js:1147`, `sounds.c:1210` → `js/sounds.js:1478` all wired). Named: file-local `tribute_ncmpi` (clone #4) / `tribute_copynchars` (clone #2) / `tribute_atoi` (review 594 debt); Sprintf/Strcpy/strchr/strrchr → string ops; save/rest `context.novel`.
**open_levelfile D-2472** (`files.c` `:673–716` + `fqname` `:354–393` +
`init/new/free/viable_nhfile` + `set_levelfile_name` `:606–618`; live
`js/files.js:466–724` `fqname`/`init_nhfile`/`new_nhfile`/`free_nhfile`/
`set_levelfile_name`/`open_levelfile`, `viable_nhfile` module-local;
`game.lock` = `gl.lock`, `game.gf?.fqn_prefix` = `gf.fqn_prefix`;
stash probe `LFILE_EXISTS ⟺ openable`; callers `do.c:1704` →
`js/do.js:1727`, `save.c:201` → `js/save.js:155`). Named: platform
(macopen/setmode/`;1`/translate); nhclose/fclose/fplog writes (Rule #2);
`close_nhfile`; `tricked_fileremoved` arms (no pline1/error);
`save.c:376` savestateinlock (unported); `recover_savefile` (no
SELF_RECOVER). **create_levelfile D-2555** (`files.c` `:621–670`; live
`js/files.js` exported, C order with `:line` cites — errbuf clear,
`game.lock` store-back, fqname kept `void`ed, WRITING/structlevel-TRUE
handle, stash-slot creat (fd = level token, always succeeds under VFS),
LFILE_EXISTS OR, unreachable Sprintf arm, `viable_nhfile` gate;
`WRITING` added to the existing const.js import). Callers named, none
wired (wrappers unported — a call from a non-C site would be C-wrong):
`do.c:1357` currentlevel_rewrite → `js/save.js:281`/:476 inlines;
`restore.c:760` restlevelfile → `js/save.js:822` dorecover path;
`save.c:390` savestateinlock → `js/save.js:456` dosave0 synthesize.
Named: platform creat/setmode, FCMASK/errno, failure arm, bufon/savelev/
close tails (wrapper rows). **set_savefile_name D-2538**
(`files.c:1020–1123`; live `js/save.js` UNIX arm in C order — regoffset 5,
spot 2, suffix-only `regularize` (`unixunix.c:297` ported file-local),
SAVESIZE 53 guards, extension/indicator/postappend live no-ops;
`game.SAVEF` = `gs.SAVEF`; `dosave0`/`try_restore_save` preset TRUE).
Named: `getuid` digits (Rule #2 single-user VFS); VMS/WIN32/MSDOS/MICRO
arms; `fname_encode`; SYSV truncation; RELEASED `impossible`;
`check_panic_save`/`recover_savefile`/`get_saved_games` counterparts.
**make_converted_name D-2580** (`files.c:2090–2153` + `contains_directory`
`:2179–2191` + `delete_convertedfile` `:2156–2165`; live `js/files.js` in C
order with `:line` cites — null-filename FALSE, prev-name drop (JS GC),
bare-vs-dir branch via live exported `contains_directory`, HACKDIR
`/usr/games/lib/nethackdir` fallback (config.h:447) with needsep + `ln`
size arithmetic, `unconverted` concat + `.exportascii` converted, TRUE;
module-local `unconverted/converted_filename` = `:2056` file-statics).
Callers wired: `files.c:2160` → `js/files.js delete_convertedfile`;
`files.c:999` delete_bonesfile → `js/bones.js:211` (bare base = fqname with
unconfigured prefixes). Named: `nh_getenv` NETHACKDIR/HACKDIR (Rule #2 no
env, SHOPTYPE precedent) + `c_eos` inlined as last-char index (JS strings
need no end-pointer) + `alloc`/`free` (GC) + `unlink` (no fs) + WIN32
`get_user_home_folder` (platform) + SHORT_FILENAMES comment-only block +
`#else SFCTOOL` externs + `free_convert_filenames` sibling (caller
`save.c:1168` free_everything is FREE_ALL_MEMORY infra, guarded) +
`delete_savefile :1258` converted arm (unported wrapper row).

### `include/artilist.h`

JS: extractor + `js/generated/artifacts_data.js` + `js/artifact.js` — partial

**name/otyp/spfx/align/role/race** (D-0064); **`retouch_object` + touch gate** (D-0065; whole-body restart D-2473 — Bell rite arm, ag/bane `You_cant` + `rnd(10)` damage + `losehp`/`exercise(A_CON)` fatal drain, worn-removal invent rescan, `loseit` Levitation freeinv/hitfloor else altar-gated pline + dropx; callers doapply newly wired, doinvoke/dowear/doeat/dowield already wired; `untouchable` `:2597–2636` and `retouch_equipment` `:2639–2705` bodies live D-2805, external callers wired D-2816 (`uchangealign` 0, `cpostfx`/`newman`/`polymon`/`rehumanize`/`mhitm_ad_were_u` 2)); 
**attk+mtype extract + `spec_abon`/`spec_applies`** (D-0611;
PHYS early + DMONS/DCLAS/DFLAG1/DFLAG2/DALIGN + ATTK Magm/Stun `rn2` + per-adtyp
Fire/Cold/Elec/Drst/Drli/Ston resists (D-1862; hero props + mon `resists_*`;
`defended()` guard via live mondata.js import + DFLAG1 mflags1 arm (D-2220;
no artilist row sets DFLAG1); DFLAG2 yours/Upolyd/ulycn arms live (D-2291;
`Upolyd`/`ismnum` const.js + `M2_WERE` monsters.js existing-edge imports,
`game.urace.selfmask` your_race convention));
**`spec_dbon`/`artifact_hit`/`attacks`/`is_art`** (D-0613;
Grayswandir `max(tmp,1)` double + FIRE/COLD/ELEC `rn2` gates;
D-1873 preamble + FIRE/COLD/ELEC/MAGM realizes_damage plines + ELEC
wake_nearto + Slimed burn_away, async callers; **SPFX_BEHEAD Tsurugi+Vorpal
both defend arms** (D-2144; ROLL_FROM `rn2(2)` always drawn, FATAL 200,
`observe_object`; `Monnam`/`observe_object`/`bigmonst`/`has_head`/
`noncorporeal`/`amorphous` existing edges, `mbodypart`/`body_part`
`polyself.js` edge, `NECK` const edge); **Mb_hit full tiers** (D-2146;
C `:1248–1434` + `:1537–1540` gate, `decl.c:51` fakename; `sticks`/`set_ustuck`/
`monflee`/`make_stunned`/`make_confused`/`upstart` new `--can`-SAFE edges,
`cancel_monst`/`resist`/`probe_monster`/`canspotmon`/`map_invisible`/`shieldeff`/
`nomul`/`NOTELL`/`WEAPON_CLASS` existing edges, file-local `attacktype`/AT_MAGC);
FIRE/COLD/ELEC `destroy_items` + FIRE `ignite_items` wired in C order (D-2292;
`!youdefend` bonus keep); **SPFX_DRLI both defend arms** (D-2292; drain clamp,
`distant_name` side effects, heal-half-up, `losexp` — `nonliving` monsters.js +
`hcolor` do_name.js + `The`/`distant_name` objnam.js + `healmon` mon.js +
`healup` potion.js + `losexp` exper.js + `monhp_per_lvl` makemon.js edges,
`ART_STORMBRINGER` generated, `NH_BLACK` file-local; `artifact_hit` complete); 
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
`js/invent.js` `freeinv_core`; resists + PROTECT + inv_prop drop shipped D-2378; 
questart `artitouch` live D-2370; zap poly `addinv_core1/2` live D-2371); 
**`set_artifact_intrinsic` SPFX_SEARCH/REGEN/XRAY D-1558** (C `artifact.c:781–786` 
ESearching Excalibur wield, `:812–817` ERegeneration Trollsbane/Staff wield, 
`:859–866` Eyes `u.xray_range` 3/-1 + `gv.vision_full_recalc`; live 
`js/artifact.js` + `js/do_wear.js` `setworn` W_TOOL; carry W_ART uses cspfx so 
SEARCH is not a carry bit; Palantir `#if 0` REGEN cspfx; vision_recalc IN_SIGHT 
xray circle / Sunsword named; cspfx is D-1539);
**`set_artifact_intrinsic` defn/cary resists + PROTECT + inv_prop drop D-2378** (C 
`artifact.c:731–768` seven-way defn/cary adtyp→E* mask + W_ART-off 
`cary.adtyp==dtyp` other-carrier guard (pure table check — C-quirk stale-bit 
parity probed); `:873–878` SPFX_PROTECT (Mitre/Tsurugi spfx); `:880–885` W_ART-off 
invoked-toggle reversal via async `revoke_invoked_property` (C guard verbatim; 
only Orb/INVIS, Sceptre/CONFLICT, Heart/LEVITATION ≤ LAST_PROP), awaited by 
`dropx` (C `dropx` order) + zap poly (C `:1910–1914` order); no-floor drops ride 
`finesse_ahriman` (own row); live `js/artifact.js` + `js/do.js` + `js/zap.js`);
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
**`arti_invoke` whole body D-2805** (C `:2130–2232` in one function: null `impossible` + `ECMD_OK`, `pline1(nothing_happens)`, cost then special switch with `res` (`impossible` default stays `ECMD_OK`), property xor inlined; `untouchable` calls it when the object is still carried; `retouch_equipment` is the C walker — attrib `:1360`, eat `:1325`, polyself `:463`/`:1021`/`:1415`, uhitm `:4285` still named); 
**`invoke_healing` first You_feel Blinded 0/1 D-1494** (C `youprop.h:92` / `artifact.c:1787`; 
not the HBlinded word; BlindedTimeout gates unchanged); 
**TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH D-1502; `invoke_create_portal` whole-body restart D-2664** (C `invoke_create_portal`
`:1866–1931` in C order with per-arm cites; 5 per-call dynamic imports hoisted static — `depth`/`goto_level` into existing
hacklib/do edges, `next_to_u`/`select_menu_pick_one` new SAFE edges, redundant dynamic terminal.js re-import dropped
(ATR_INVERSE already static); C `select_menu`(PICK_ONE)/window/end_menu/`any.zeroany`/`free` named menu-model adaptations
via live `select_menu_pick_one` (js/options.js:2309); `nothing_special` staticfn-local `:1761–1766`;
caller C `:2161` → js/artifact.js:2168 wired; C `invoke_taming`/`charge_obj`/`banish`
`:1768–2019` + switch; Palantir TAMING artilist `#if 0` still has the arm; 
zeroobj pseudo has no `oclass` so `tamedog` does not null the scroll path; 
callees `read.c` `seffect_taming`/`charge_ok`/`recharge`, `mon.c` `migrate_mon`, 
`dungeon.c` `dunlevs_in_dungeon`/`ledger_no`; zap AD_ELEC ring uses full `recharge`); 
**GETOBJ_ALLOWCNT count prefix D-1530** (C `invent.c` `getobj` `:1937–2088` + `splittable` `:1664`; live `js/invent.js` `getobj_take_count`/`getobj_apply_count`/`getobj_split_otmp`; charge/drop/throw/wield/ready/adjust clones; Palantir not a live artifact; pickinv `&ctmp` is D-1559; `finish_splitting`/`unsplitobj` is D-1560; **stash getobj is D-1561**; doorganize_core nobj-unsplit named; **`in_doagain` CQ_REPEAT is D-1563**); 
**canned CMDQ_INT D-1551** (C `invent.c` `getobj` need_more_cq `:1778–1830` + `cmd.c` `cmdq_add_int`; live `js/invent.js` `getobj_from_cmdq`/`cmdq_add_int`; ALLOWCNT clones + apply/grease/jelly/rub KEY; INT then KEY splits, !ALLOWCNT/second INT clears canned; eat/read/zap/tin NOFLAGS clones + pickinv `&ctmp` named);
UNTRAP callee door force D-1495 + floor disarm_*/box D-1813/D-2305 (move_into_trap residuals still named; stumble_on_door_mimic live D-2373); 
other wield intrinsics (**`touch_artifact` hero blast + `bane_applies` D-2010**); `defended`; DFLAG1; 
hero/mon elemental resists; destroy_items/ignite; Mb_hit; SPFX_DRLI (SPFX_BEHEAD live D-2144); wake_nearto; 
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
DRLI arm still deferred there (BEHEAD live D-2144)

### `src/mondata.c` `name_to_monplus` / `monstseesu`

JS: `js/mondata.js` — complete (D-2577); `title_to_mon` home `js/botl.js`

**pmnames[MALE/FEMALE/NEUTRAL] longest match + gender out** (D-0173); 
full 60-entry alt_spl + vortices/ies/ves pre-fixes + case-sensitive article strip + `title_to_mon` rank fallback (D-2577; remainder is the C `in_str` offset); 
grey dragon subset was D-0064; **`name_to_monclass` letter/explain/truematch then 
`name_to_mon`** (D-1098; `create_particular` class-letter still named); 
**`monstseesu`/`monstunseesu`/`m_seenres` + makemon `seen_resistance`** (D-0235; 
D-2233: `monstunseesu_prop` fully wired — `setworn` removal path (do_wear.js:561) + 
`setnotworn` (do.js, worn.c:170); `castmu`/`buzzmu` m_seenres gates live (mcastu.js); 
`m_canseeu` matches the live `#else` arm — the buried `u.uburied || m->mburied` variant 
is `#if 0`-dead C, never port; `MUSE_SCR_FIRE` likewise `#if 0`); 
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

**`mkcorpstat` (D-2795;** C `mkobj.c:2067–2118`). Bad type calls
`impossible` and continues. `x==0 && y==0` is `mksobj` (named:
`rloco` stays the D-2463 sync-chain omit). `spe` is
`flags & CORPSTAT_SPE_VAL`. `norevive` is copied from
`game.mkcorpstat_norevive`, then set for a cancelled non-rider.
`monsndx(ptr)` replaces the random corpsenm and restarts the
corpse timer when `zombify` or either type is `special_corpse`.
`mklev.c:1932` and `mon.c:626`/`647` pass `mons(mndx)`.

Creation/merge/weight subsets; `add_to_buried` (D-0014); 
`start_corpse_timeout` + `mkcorpstat` `special_corpse` restart (D-0011); 
**`run_timers`/`start_timer` queue + floor `rot_corpse`** (D-0405; `start_timer` whole body D-2794 — range panic, VERBOSE_TIMER duplicate `impossible`, return TRUE; D-2801 stores `MELT_ICE_AWAY` as timeout_funcs index 8 and `run_timers` calls `melt_ice_away` on the packed long);
**`spot_time_expires` + `spot_time_left` delegation** (D-1957;
C `timeout.c` `spot_time_expires` `:2444–2456` / `spot_time_left` `:2458–2463`;
absolute vs remaining; TIMER_LEVEL+func+packed-where triple match); 
**invent/minvent `rot_corpse` worn plines** (D-1213; 
C `dig.c` verbose Your + `remove_worn_item`/`setmnotwielded` + invent extract; 
hideunder expose / contents bury still named); 
**`attach_egg_hatch_timeout`/`stop_timer` + `mksobj` EGG→`set_corpsenm`** (D-0533); 
**`obj_split_timers` + splitobj wire + `poly_obj` hero-egg + hatch leftover** (D-1572;
C `timeout.c` `attach_egg_hatch_timeout` `:980–1005` / `obj_split_timers` `:2358–2370`;
`mkobj.c` `splitobj` `:498–499`; `zap.c` `poly_obj` `:1756–1779` `kill_egg`+`set_corpsenm`
`random_monster(rn2)`; `hatch_egg` `is_pool(mon)` + `learn_egg_type` `update_inventory`
+ impossible; SetVoice / migrating #if 0 / light split / `obj_move_timers`
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
**`mergable` FOOD `oeaten`/`orotten`** (D-0923) + **unpaid/erosion/candle/price/name/mail/artifact arms** (D-2324; `#if 0` bypass non-gate) + **otmp-worn merge + quiver-prefer addinv** (D-2207; obj-worn combine still deferred — merged setworn fixup unported); 
**`obj_extract_self` preserves ox/oy like C `remove_object`** (D-0911; 
was zeroing → false `drag_ball` cause_delay); **`remove_object` + `extract_nexthere` named exports** (D-2607; C `mkobj.c:2508–2521` + `:2623–2640` in C order with `:line` cites — where-gate/object-lost panics are throws, `game._objects_at` is `level.objects[x][y]`, `extract_nobj` sets FREE; floor arm routes OBJ_FLOOR through it, legacy unset-where keeps the tolerant inline path; 14 C callers wired — recreate_pile_at + splev monster-invent/saddle stay named omits, moverock relink subsumed by dopush→movobj); **`obj_extract_self` MINVENT** (D-0029); 
**`SPBOOK_no_NOVEL` → `rnd_class`…`SPE_BLANK_PAPER`** (D-0055); 
**CORPSE `undead_to_corpse` + `G_NOCORPSE` retry** (D-0057); 
**EGG `can_be_hatched` multi-retry** (D-0068); **Samurai lacquered `SPLINT_MAIL`** (D-0079); 
**`mksobj_init` WEAPON/ARMOR artif `rn2(20|40+10*nartifact_exist())`** (D-0588) + 
**`mk_artifact` A_NONE eligible/`rn2(n)`** (D-0759) + 
**by_align gift path + gift_value gate + gen_spe data + permapoisoned tail** (D-2337; 
extractor emits gs/gv; pray.c bestow_artifact caller wiring stays its own row); 
**`mksobj_init` envelope completion** (D-2265; FOOD `oeaten = 0`, TIN `cnutrit` gate + canonical `set_tin_variety` SPINACH/RANDOM incl. rotten remap, GEM `corpsenm = 0`, SPBOOK `spestudied = 0`, CHEST `tknown` assign, samurai `In_quest`); 
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
under-boulder pile** (D-0270); **D-2732 `place_object` whole-body completion**
(`mkobj.c:2305–2366` in C order: `:2309–2323` isok gate — OOB throws (no live
panic export, mklev.js:19190 precedent), x=0 warns via floating impossible()
(do_wear.js:619 precedent) then falls through, message via sync
simple_typename (C safe_typename async in JS); `:2325–2327` not-free throws
(`|0` treats unset where as OBJ_FREE); `:2329` assert dropped (debug-only);
`:2332–2351` boulder gate + under-last-boulder threading; `:2353–2356`
ox/oy/OBJ_FLOOR; `:2358–2361` no_charge lapse via live shk.js
costly_spot/costly_adjacent/find_objowner; `:2363–2366` fobj chain + timed;
`:2330` obj_no_longer_held live (D-2734: sync core `place_object_no_longer_held` — do.c:893–920 in C order, COST_DEGRD billing floated void);
`!otmp` guard kept (C NONNULLARG1); `_objects_at` Map stands in for
svl.level.objects); **`clear_dknown` in `mksobj` (dknowns[] + shield-range)** (D-0292); 
**`Is_pudding`/`globby` mksobj init + `obj_nexto_xy`/`obj_absorb`/`obj_meld`/`pudding_merge_message`
 + full `shrink_glob`** (D-0993 thin retired by D-2376: exported `shrink_glob(obj, expire_time)` in C order — off-level catch-up delta/moddelta, ice-thirds/buried/eating skips, halve-threshold invent + container-in-invent messages, floor cansee "fades away", `partly_eaten_hack` Yname2 with the reader in the `pretty_base` globby arm; file-local `item_on_ice`/`check_glob`/`shrinking_glob_gone`, `eating_glob` in `eat.js`; D-2374 ships full `globby_bill_fixup` + globby `get_pricing_units` weight arm; named: `start_glob_timeout` non-glob impossible; `insane_object` + `where_name` LIVE D-2520 (`js/mkobj.js:1534`/`1565`, `check_glob` wired `:1598`); `check_contained` LIVE D-2654 (`js/mkobj.js:1640`, C `:3374–3416` in order — Has_contents joins the const.js import, panics→throws, nestedmesg 112-char newline-stop inline; callers objlist_sanity `:3051` / mon_obj_sanity `:3226` unported wire-up-on-ship); D-2622 restarts `obj_meld` whole-body async in C order — holder-level `p1 && p2` guard (`:3774`) + null/same-pointee NULL fallthrough (`:3777`, old body returned the survivor), floor+free veto + heavier/`rn2(2)` tiebreak (`:3789–3792`), `ox` tail with the `cansee` gate + awaited `maybe_unhide_at` (`:3803–3809`, old floating lazy import retired), `else impossible(...)` (`:3811–3813`); callers `do.c:312`→`js/do.js:861` + `mon.c:727`→`js/mhitm.js:2943` both awaited; `:3779–3788` FIXME shore/pool as-is per C); 
**`mksobj` `unknow_object` `known` from `oc_uses_known`** (D-1674;
was WAND/class-name stand-in D-0316); steal.c / muse.c callers named;
**RING_CLASS `mksobj_init` `oc_charged`** (D-1690; was RIN_* name-list);
**`clear_dknown` `objects[].oc_merge`** (D-1712; was class heuristic
`oc_merge_of` SPELL/WAND mrg=0 D-0679; food/candle/boomerang/venom vs
non-stack swords); 
**`mkbox_cnts` ICE_BOX → `mksobj(CORPSE)` + age=0/timers + `add_to_container`** (D-0361; 
D-2265 ships BoH Is_mbag→SACK / WAN_CANCELLATION re-roll; BoH bag-weight lives in the bless/curse/unbless arms below, not this fn — body live, queue row retired STALE 2026-09-16); 
**`weight()` whole-body restart D-2578** (C `mkobj.c:1888–1976` in C order in `js/mkobj.js weight()`: `:1892` quan<1 impossible + return 0; `:1901` globby returns owt; `:1911` containers + STATUE with the `:1915–1933` corpsenm/msize/minwt arm (1.5x cwt floored, x quan) + `:1935` recursive cwt + BoH factor `:1950–1954` in C ternary order (D-2422 intact); `:1957` CORPSE quan x cwt with `LARGEST_INT` clamp + oeaten; `:1964` FOOD oeaten; `:1966` COIN min 1; `:1970` HEAVY_IRON_BALL owt kludge; `:1972` CANDELABRUM spe x tallow; `:1975` wt x quan else (quan+1)>>1; `ismnum` joins the const.js import + `HEAVY_IRON_BALL` const (ALREADY-edges); `mksobj` birth `owt: 1`→`0` per `*otmp = cg.zeroobj` `:1184` (placeholder tripped the `:1970` arm); `pickup.c` DELTA_CWT twin resolves via this body); 
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
**`copy_oextra` + mailcmd oextra tails** (D-2275;
C `mkobj.c` `copy_oextra` `:416–448` / `new_omailcmd`+`free_omailcmd` `:157–176` /
`invent.c` mergable mailcmd gate `:4477–4481`; `splitobj` `:495–499` +
`bill_dummy_object` `:727–729` wire `copy_oextra`+`free_omid` in C order incl.
LUAFREE normalize; `OMAILCMD`/`has_omailcmd` join `const.js`;
`dealloc_oextra`/`extract_nobj` already live D-1743/D-1756);
omit FIGURINE transform/timeout, `nextoid` shop-price search, `splitbill` impossible() diagnostics (flow live D-2278), 
`obj_move_timers` live D-2280 (`timeout.c:2339–2353` + `mkobj.js` export), light split live D-2279 (`light.c:779–803` + `mkobj.c:500–501` wire), invent Array vs nobj `extract_nobj`, `oeaten`/`eaten_stat` (statue weight arms shipped D-2578),
zap.c `dealloc_oextra` poly; **zap `delete_contents` D-1770**;
trap.js `delete_contents_chest` / mklev.js `create_object_delete_contents`,
wizard `makemap_prepost` dobjsfree,
`maybe_unhide_at` youmonst, `shrinking_glob_gone` vs delobj
|**`maybe_adjust_light` + bless/curse/unbless/uncurse lamplit tails** (D-2244;
C `mkobj.c:1703–1736` + `:1744–1838` light arms; `arti_light_radius` delta,
`obj_adjust_light_radius` await, Blind/`get_obj_location(0)` gate,
PLNMSG_OBJ_GLOWS It/They vs carried/canseen `Yname2`, `otense shine` +
much/brighter/less-brightly pline; read.c dragon-scale remail was_lit/
old_light + restore wired; bless-family async (state changes precede first
await); zap local `unbless` clone retired to the export; polyself
uskin merge arms deferred (skinback itself live js/polyself.js:1366 — queue row retired STALE 2026-09-16); potion dip
flag-sets bypass bless/curse (own row); COIN_CLASS/luck/bag-weight (bless,
curse, unbless)/bimanual/uswapwep/SPBOOK arms still deferred)

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
TIN/CORPSE #if 0 not ported; cham `newcham` D-2295 +
cmd.c wiz-level-change `kill_genocided_monsters` D-1288; do.c `goto_level` caller D-1190); 
**`egg_type_from_parent`** (D-1075; sit `#sit` `FALSE` roll live `js/sit.js:1129`;
polyself `newman` `learn_egg_type` `TRUE` pair live `js/polyself.js:1187-1196` D-2239); **`record_mvitals_died`** (D-0126); 
**trap-path `monkilled`/`mondied`/`make_corpse` ordinary default_1** (D-0150); 
**mhitm `mondied`→`make_corpse` ordinary** (D-0167); 
**`xkilled`→`make_corpse` when `corpse_chance`** (D-0191); 
**`xkilled` treasure `mkobj(RANDOM_CLASS)` + food/size filters** (D-0229); 
**`xkilled` `adjalign(malign)` + peaceful −5** (D-0251; superseded by D-2444
whole-body port — leader/nemesis/guardian/priest/tame/peaceful arms live); 
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
omit cham/were restore before monsndx (`mondead`, not `make_corpse`), genus/other 
mon.c helpers;
**`xkilled` whole body** (D-2444; `js/uhitm.js` restart in C order — conduct,
message, pit `t_at`/`is_pit` + floor-boulder `sobj_at` nocorpse / carried-boulder
bury, pet `killed_by_u`, engulfer missile via `mpickobj`, `vamp_rise_msg` +
`disintegested` writers around `monstone`/`mondead`, lifesaved "Maybe not...",
`be_sad`, MAIL_DAEMON `SCR_MAIL`, treasure `!rn2(6)` gates + `flooreffects`
gate, corpse + buried message, museum copy + `spoteffects`, unconditional
`newsym`, murder `see_monsters` via `hero_Blind_telepat`, quest/priest/tame/
peaceful adjalign + `iter_mons(anger_quest_guardians)` (`js/mon.js` ports),
tame `Soundeffect` + `LL_KILLEDPET` gamelog, malign; `zap.c`
`disintegrate_mon` ported with both `dobuzz` sites wired); omit only the
unported caller functions `mhitm_ad_rust`/`mhitm_ad_fire` uhitm arms
(`uhitm.c:2294/2547`) and `wiz_kill` (`wizcmds.c:315`) — own coverage rows;
holder-release re-layered D-2450 (`mtrapped=0` + `unstuck` right after the
`disintegested` reset, `!was_stoned`-gated, before the lifesave return —
C releases inside `mondead` via `mon_leaving_level :2702–2703`, never via
`monstone :3286–3373`); 
**`mondead`** (D-2147; `js/mhitm.js` export, `uhitm.js`/`trap.js` clones removed): be_sad clear, cham/were restore, mvitals, quest-leader mark, mail-daemon `G_GENOD`, S_KOP `rnd(5)`+`makemon` in C order; 
**`mondead` tail** (D-2231; `js/mhitm.js` async export + `mon.js`/`vault.js`/`shk.js` edges): `set_mon_min_mhpmax`, `lifesaved_monster` (amulet+wary_dog+genocided), `vamprises` (door smash + trapped-door kill D-2273 via canonical `monmove.js` `mb_trapped`), `grddead` (vault corridor+gold), `logdeadmon` (Medusa+livelog cadence), `thiefdead` (stealmid + stealarm→unstolenarm swap; `stealarm`/`unstolenarm` live in `steal.js`, `steal()` sets `afternmv`, D-2271), `shkgone` (resident/no_charge/setpaid/bill/ushops), full `m_detach` (unleash/light/mon_leaving/wizdead/nemesis/leader/relobj+gated newsym/purge/dismount), async `mondead` + `monstone`/`monkilled` wiring, all callers await;
**`vamp_stone`** (D-2611; `js/mhitm.js` restart in C order `:3766–3830` — pre-transform lapidifying buf via `x_monnam` ARTICLE_NONE + SUPPRESS_SADDLE|SUPPRESS_HALLUCINATION|SUPPRESS_INVISIBLE|SUPPRESS_IT with amorphous/flyer verb + `surface`, canonical `set_mon_min_mhpmax` (m_lev+1 floor), engulfing `expels`, amorphous closed-door `enexto`+`rloc_to`, canspotmon pline + `flush_topl_more` for `display_nhwindow`, `newcham` NO_NC_FLAGS / sandestin arm NC_SHOW_MSG, rise pline via `Amonnam`, unconditional `newsym`; both C callers already wired — `monstone` `js/mhitm.js:3114`, `minstapetrify` `js/trap.js:3386`);
**`monstone`** (this D; `js/mhitm.js` restart in C order `mon.c:3286–3373` — x/y read before vamp_stone (rloc), mhp=0 + lifesaved + DEADMONSTER return, mtrapped=0, statue arm via live `extract_from_minvent` + `unlink_minvent` fallback with BOULDER/live-`obj_resists` eject through live `flooreffects`-fall else lamplit `end_burn` + oldminvent chain, FEMALE/MALE/HISTORIC flags, mkcorpstat + mgivenname oname, add_to_container chain, weight, else ROCK, stackobj + `memory_glyph_is_invisible` unmap (D-2753: `levl[x][y].glyph == GLYPH_INVISIBLE`, not the loc helper that also matches `disp_glyph` / `remembered_glyph.invisible`) + cansee newsym, engulfing wasinside before mondead with digests jump-out pline after; removed the local `obj_resists_00` and `digests` clones for the live `dogmove.js`/`mhitu.js` exports; 8 C callers wired — eat.js:3319, displace `mhitm.js:2069` (`mhitm.c:237`), gaze `mhitm.js:5520` (`mhitm.c:786`), `mon.js:2409` (`mon.c:1439`), `uhitm.js:846` xkilled (`mon.c:3547`), `trap.js:3449` (`trap.c:3879`), `do_stone_mon` `mhitm.js:1720` (`uhitm.c:3963`), `mdamagem` `mhitm.js:4265` (`mhitm.c:1050`, D-2754));
**`shkgone` damage/`has_shop`** (this D; `js/shk.js` `discard_damage_owned_by` + `js/mhitm.js` has_shop clear via canonical `sounds.js` `search_special` export);
`minimal_monnam` live (D-2375; turns.md `do_name.c` row); omit `mongone` FALSE caller, sync `kill_genocided_monsters` nuance (`stinky_nemesis` gas live D-2270);
omit `teleport.js` `search_special` ANY_TYPE arm (clone drift; canonical export is `sounds.js`);
**`sanity_check_single_mon` + `pet_sanity_check`** (D-2479; both module-local in `js/mon.js`, C order — data-range/mnum/HP/dead/geno/tame/eshk/epri/egd/emin/edog/steed/trapped/frozen/hiding/mimic/leash arms; `monsndx` export added to `js/mondata.js`; D-2485 bound the `isgd` arm's `has_egd` import, `js/mon.js:25`);
named omits: `panic` (own row; illegal-data arm throws), `levltyp_to_name` + all three `#if 0` arms (dead-mon fmon/guard, mimic location, leash distu — omitted like C), callers in unported `mon_sanity_check` (`mon.c:258–324`, fmon `:265` + migr `:313` — wire when that ships);
**`golemeffects`** (D-2735; whole C body `mon.c:5680–5707` in C order — flesh ELEC heal / FIRE+COLD slow, iron ELEC slow / FIRE heal, non-golem return; slow via live `muse.js` `mon_adjust_speed`, heal via live `healmon` + cansee pline): completed + exported `golemeffects_mm` (`js/mhitm.js`); removed the heal-only `golemeffects_you` clone (`js/uhitm.js`) — gulpum ELEC/COLD/FIRE (`uhitm.c:5148/:5159/:5170` → `js/uhitm.js`) now calls the export; wired `damageum_ad_cold` (`uhitm.c:2644`) and passiveum COLD/FIRE/ELEC (`mhitu.c:2565/:2588/:2598`, incl. live `shieldeff` in C order); added the D-2718-deferred mhitm arm as `mhitm_ad_cold` + `mhitm_adtyping` AD_COLD row (`uhitm.c:4796`, C `:2664–2680`); already-wired sites verified (passivemm `:1399/:1423/:1435`, fire `:2555/:2617`, elec `:2701/:2734`); named: `explode.c:525` (`js/explode.js:30` no-port stands), hero-side `ugolemeffects` slow (other C fn `polyself.c:2160–2187`, next row)

### `src/mondata.c` growth

JS: `js/mondata.js` — partial

**`little_to_big`/`big_to_little`** grownups table (D-0068); name_to_mon;
**`big_little_match`** full both-direction multi-step walks (D-1772; live `js/mondata.js:296`, sole caller `mon.c:4240` wired `js/mon.js:1095`)
**`same_race`** (C `mondata.c:771–871`) restarted whole-body in C order
(D-2655; live `js/mondata.js:404`, per-arm `:line` cites) — exact `:775–776`
(mndx equality for fresh wrappers); races `:778–787`; giant/golem/flayer
`:789–794`; kobold `:795–798`; ogre→naga `:799–810`; rider/minion
`:812–815`; tengu `:817–818`; imp `:819–823`; demon `:824–825`; undead
`:826–840` with C's fallthrough (no terminal return — prior early
`return false` removed); growth `:843–857` via live `monsndx()`;
gargoyle/bee `:859–863`; longworm `:865–866`. Callers:
`dog.c:1080` wired `js/dogmove.js:216` (new cannibal arm), `eat.c:776`
→ `js/eat.js:3421`, `muse.c:255` → `js/muse.js:1341`,
`sounds.c:706–707` → `js/sounds.js:1001–1002`. Named: dogfood
polyfood/rider/petrify tails (deferred `js/dogmove.js:199–201`)

### `src/mondata.c` `can_blnd` / `resists_blnd` / `resists_blnd_by_arti`

JS: `js/uhitm.js:can_blnd` + `js/mondata.js:resists_blnd,resists_blnd_by_arti` — complete (D-2604)

**`can_blnd`** (C `mondata.c:305–398`) restarted whole-body in C order —
haseyes, perma-blind (`monst.h:253` inlined), raven-vs-raven, light arm
(`magr.mcan` + canonical `resists_blnd`), WEAP/SPIT/NONE obj arm (cream
pie EBlinded gate, venom ublindf/ucreamed gate + visor, POT_BLINDNESS
no-defense TRUE, other objs FALSE, hero-swallowed gate), ENGL arm
(you EBlinded/Unaware/ucreamed; monster sleeping), CLAW arm (you
ublindf + swallowed + visor), TUCH/STNG mcan arm, visor tail (hero
`game.invent` + `u.uarmh` alias; monster `minvent` chain; W_ARMH +
`objdescr_is` "visored helmet"). Callees: `haseyes` live
(`js/monsters.js`), `mon_perma_blind` macro inlined, `resists_blnd`
ported here, `objdescr_is` live (`js/apply.js`). Callers: `apply.c:3584`
via `can_blnd_cream_self` subset (`js/apply.js:1043`, called `:1098`);
`dothrow.c:1297` via `can_blnd_toss_self` subset (`js/dothrow.js:1257`,
used `:1628`); `mhitu.c:1279` canonical (`js/mhitu.js:1804`);
`mhitu.c:1472` via `gulpmu_can_blnd` subset (`js/mhitu.js:1727`, called
`:2028`); `mthrowu.c:471` canonical (`js/mthrowu.js:889`);
`mthrowu.c:755` canonical (`js/mthrowu.js:1234`); `uhitm.c:1268`
canonical (`js/uhitm.js:1272`,`:1383`); `uhitm.c:2966` canonical
(`js/mhitm.js:837`); `uhitm.c:2978` via `can_blnd_u` subset
(`js/mhitu.js:723`, called `:747`); `uhitm.c:2988` via `can_blnd_mm`
subset (`js/mhitm.js:809`, called `:851`); `uhitm.c:5128` canonical
(`js/uhitm.js:3412`).
**`resists_blnd`** (C `:247–272`) canonical: you Blind||Unaware, monster
mblinded||!mcansee||!haseyes||msleeping, dmgtype AD_BLND AT_EXPL/GAZE
(live `dmgtype_fromattack`, newly exported from `js/mhitm.js`), Sunsword
via `resists_blnd_by_arti`, you Blnd_resist catchall with upstream
`impossible()`. **`resists_blnd_by_arti`** (C `:275–298`): wielded
artifact `defends(AD_BLND)` + whole invent/minvent
`defends_when_carried` scan; C `#if 0` Eyes-of-the-Overworld arm omitted
upstream, no JS. Pre-existing file-local subsets stay as drift (named,
not rewired): `resists_blnd_mm` (`js/mhitm.js:793`),
`resists_blnd_you` (`js/mhitu.js:670`), `detect.js:282`,
`trap.js:4652` resists clones; `dmgtype_fromattack` clones in
`js/mhitu.js:655` (kept file-local).

### `src/mondata.c` `Resists_Elem`

JS: `js/mondata.js:Resists_Elem` — complete for the C body (D-2802)

**`Resists_Elem`** (C `mondata.c:129–197`) in C order. Property 1..8
(`FIRE_RES`..`STONE_RES`): hero `u.uprops` intrinsic||extrinsic, also
the flat `H*`/`E*` mirrors JS keeps for that same storage; monster
`mon_resistancebits` (`monst.h:270–271`) masked with `1 << (prop-1)`.
Then wielded artifact `defends(prop+1)` (`uwep` / `MON_WEP`), then the
invent walk: worn `oc_oprop == prop` under `W_ARMOR|W_ACCESSORY` plus
`W_WEP` (monsters always; hero only when `uwep` is a weapon or weptool)
and `W_SWAPWEP` when `u.twoweap`, worn alchemy smock for poison and
acid, and `defends_when_carried`. `prop+1` is C's damage type
(`:152`): poison is `AD_DRST` (7). Stone is `AD_SPC1` (9), not
`AD_STON` (18), so yellow dragon scales do not `defends()` stone
through this function. `ANTIMAGIC` / `DRAIN_RES` / `BLND_RES` return
live `resists_magm` / `resists_drli` / `resists_blnd`. Unexpected
`propindx` calls `impossible` and returns false (the pline is not
awaited, same as `resists_blnd`).
Poison macro sites now call it: `resists_poison_mm`
(`js/mhitm.js:1817`, used `:1833` and `:1872`), `resists_poison`
(`js/zap.js:1456`; `mthrowu.js:956`, `artifact.js:2325`,
`dogmove.js:197` and `:276`), monster `resists_poison` in
`js/mon.js:2450` and `:2576` and the non-hero arm of `:336`,
`js/explode.js:295`, `js/region.js:505`, and `potion.js:3956`
(`POT_SICKNESS`).
Named: `resists_fire` / `resists_cold` / `resists_elec` /
`resists_disint` / `resists_acid` / `resists_sleep` / `resists_ston`
still use the bit test (zap.js helper and the file-local clones in
`explode.js`, `mhitm.js`, `mon.js`, `trap.js`, `pray.js`,
`monsters.js`). `potion.js` `resists_elem_pot` still does for sleep
and acid. `zap.c:4367` `|| defended(mon, AD_DRST)` is still not
called (`js/zap.js:1963`). `uhitm.c:1532` `hmon_hitmon_poison` has no
JS function (`js/uhitm.js:1152`, `:1482`). Hero gas and explosion
arms keep `Poison_resistance` where C uses that macro
(`mon.c:355` → `js/mon.js:336`; `explode.c:61` → `js/explode.js:265`).

### `src/mondata.c` `mstrength` / `mstrength_ranged_attk`

JS: `js/mondata.js:mstrength` (exported) + file-local `mstrength_ranged_attk` — complete (D-2700)

**`mstrength`** (C `mondata.c:428–497`) ported whole-body in C order —
mlevel clamp `:434–435` (`Math.trunc`, operands non-negative), group bits
`:438–439` (live `G_SGROUP`/`G_LGROUP`), ranged arm `:442–443` (file-local
`mstrength_ranged_attk`, C `:501–512`: AT_BREA/SPIT/GAZE mask,
`>= AT_WEAP` gate), AC arms `:446–447`, speed arm `:450`, per-attack loop
`:453–465` (AT_MAGC, AT_WEAP+M2_STRONG, AT_EXPL sphere +3/+5/0),
per-damage loop `:468–476` (drain sextet +2, grid-bug strcmp guard,
heavy-damage `damd*damn > 23`), leprechaun −2 `:480–481`, bee/ant +2
`:485–487`, level adjust `:490–496` (`Math.trunc`). Constants via live
edges only: `AT_*`/`AD_PHYS/AD_DRLI/AD_STON/AD_DRDX/AD_DRCO/AD_WERE` from
`js/mhitm.js`, `AD_FIRE/AD_COLD/AD_ELEC/AD_DRST` file-local
(`js/mondata.js:51–58`), `G_SGROUP/G_LGROUP/M2_STRONG` from
`js/monsters.js`, `NATTK` from `js/const.js`; neutral name struct-field
first then `pmnames[mndx]?.[NEUTRAL]`. Named: sole C caller
`wizcmds.c:1807` `wiz_mon_diff` (wizard `#mondifficulty`, unported —
wire when it lands; no call invented elsewhere).

### `src/makemon.c`

JS: `js/makemon.js` — partial

**`STRAT_APPEARMSG` for `M3_WAITMASK|M3_COVETOUS`** (D-0928 #1128; with `mnexto`→`rloc_to_flag`); 
Ordinary `is_armed`/`m_initweap`/`mongets`/`m_initthrow` 
(S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/S_HUMANOID/S_TROLL/S_LIZARD
(D-0556 salamander + **D-1516** non-salamander `!is_armed` skip) /
**S_HUMAN PM_NINJA** (D-1516) /
**S_ANGEL humanoid** (D-0649) + **S_KOP cream pie/club/hose** (D-1515) + default); 
**`add_to_minv` uses `OBJ_MINVENT`** (D-0029) + **`add_to_minv` merge D-1492**; 
**`makemon_rnd_goodpos` + null-ptr `rndmonst` order + `m_initgrp`/`G_SGROUP`** (D-0034) + **fallback clears `GP_CHECKSCARY` in `gpflags` itself (bl==1 pass + stairway)** (D-2264); 
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
D-2022 lifts the SPE_DIG deferral: first Wizard on earth mongets SPE_DIG via `:1369–1384` mitem) + **`is_golem`→`golemhp(mndx)` fixed HP** (D-0554) + 
**`adj_erinys` mutates mlevel + `adj_lev` re-reads live table** (D-0928 #1099; 
`newmonhp` now complete (D-2017: `is_rider`→`d(10,8)` + `is_home_elemental` ×3 closed, `mlevel>49` arm already live)); 
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
**`bagotricks` bad-bag `impossible` + empty/seen `update_inventory` + `tipcontainer` BoT-target apply** (D-2354; `js/apply.js` vs `makemon.c:2554–2601`, target arm `pickup.c:3961–3966` via `js/pickup.js` dynamic import; D-1023 core); **D-2593 `tipcontainer_checks` whole-body port** (`pickup.c:3954–4055` in C order as module-local `js/pickup.js:4527` async fn: TIPCHECK enum `:3680-3684` at `:4500`, BoT-target `:3962`, lknown+carried/update_inventory `:3972`, locked `:3978`, trapped chest_trap+nomul `:3982`, bag/horn with target recursion `:4001` + location `:4005` + spe-restore `:4023`, quantum `:4034`, empty `:4047`; callers `:3724`/`:3726-3728` wired `:4657`/`:4661` + entry sync `:3697` at `:4648`; named omit: subfrombill `:4029-4030`); 
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
`can_hide_under_obj` coins / pet cursed / cockatrice retired by **D-2340** — all three live in `mon.js` hideunder, the `monmove.js` postmov local, and the `makemon.js` birth inline; `You_see` pline + `set_msg_xy`/`PLNMSG_HIDE_UNDER`/`last_hider` stay named); 
**D-0528 vampshifter `newcham`/`pickvampshape` + Vlad candelabrum + covetous `noteleport_level`**; 
**D-0606 `select_newcham_form` sandestin/doppel/cham/vamp + random + 
`accept_newcham_form`/`polyok`/`is_mplayer`; 
`extract-monsters.py` `-DMAIL_STRUCTURES` → `PM_MAIL_DAEMON` (SPECIAL_PM=330)** + 
**D-0928 #1111 random `while` = C (`!validspecmon` only continues under rogue uppercase `monsym` 
gate; else one `rn1` + outer `newcham`/`accept`)**; 
**D-2235 `select_newcham_form` ordinary dragon-armor arm + `tt_doppel` RECORD body + `classmon`** (`mon.c:5198–5207` `which_armor` W_ARM scales/mail → dragon; `topten.c:1444–1464` plgend/`classmon`/`christen`; live `which_armor`/`christen_monst`/`canseemon`, new `roles.js` edge); wizard mon_polycontrol retired by **D-2245** (live `wiz_force_cham_form` + `validvamp` + `mkclass_poly`, gate in C position, promise-split keeps scored runs sync) / RECORD `get_rnd_toptenentry` (no RECORD VFS, Rule #2); 
**D-1573 `newcham` Protection cancel** + outer rogue `tryct>15` + `set_mon_data` / wormgone /
light / `pm_invisible` / hideunder / long-worm init / vampire cham / `check_gear_next_turn`;
NC_SHOW_MSG `pline_mon` D-1586; **newcham mleashed `m_unleash` TRUE / `update_inventory` + Elbereth `monflee` D-1645**; **await remaining async NO_NC_FLAGS `newcham` D-1648** (mon_poly/stone/gulp/statue/revive/bhitm; sync makemon/`load_tower1` named);
ustuck / `possibly_unwield` / `mon_break_armor` / boulder `flooreffects` still named (async or missing; `poly_steed` live D-2243);
omit `set_apparxy` in byyou arm (dochug covers); 
**`makemon_appear_msg` Amonnam/next2u(req x,y)/MM_NOEXCLAM Norep** (D-0928 #1164; 
sync makemon + async caller; mimic mhidden_description/set_msg_xy still omit; 
occupation `dochugw(mtmp,FALSE)` live in the tail (D-2421: Norep stays MM_NOMSG-gated, 
`:1502–1504` arm runs whenever occupied; `nasty` both arms wired pre-mpeaceful-zero); 
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
!is_vampshifter`** (See_invisible peaceful-invis arm shipped D-2086 js/makemon.js:2665 — queue row retired STALE 2026-09-16); 
**D-0751 `temperature_shift` + hell `clear_level_structures` temp**; 
**D-1078 `clone_mon`** (HP half + caller max/2; enexto; no minvent); 
**D-1565 `clone_mon` `place_monster` 2D grid** (`steed.c:897–932` / `makemon.c:898`;
live `js/steed.js`; `_level_monsters` + `MON_FLOOR`; gulpmm clone retired;
`level_mon_at` ignores stale mx/my; `cutworm` via live `clone_mon`;
**D-2299** `replmon` place arm live (`mon.c:2533–2535` + relmon grid clear +
inventory check) + `makemon` birth flags live (`:1296–1301` mcansee/mcanmove/
mgenmklev/seen/MM_MINVIS); `makemon` grid `place_monster(mtmp,x,y)` deferred
(movement stale-heads; own Open row); `place_wsegs` replmon stays next row); **D-1252 `demonpet` caller** (`uhitm.c`; 
live `makemon` NO_MM_FLAGS + `tamedog` null FALSE);
**D-1607 `mongets` demon/lminion/mplayer-sword/invocation** (`:2189–2214` after
`mksobj`; `is_mplayer&&is_sword` `spe=3+rn2(4)`; callees `curse` /
`is_lminion` / obj.h `is_sword` live `js/objects.js` (dothrow clone
retired); prince/`mpickobj` already live);
**D-1584 `mk_mplayer`** live `js/mplayer.js` (C `mplayer.c`; not this file) |
**D-2107 `makemon` birth knowledge** (`makemon.c:1283–1294` after `female`, before `mpeaceful`: `In_sokoban && !mindless` → `mon_learns_traps(PIT/HOLE)`; `Is_stronghold && !mindless` → `(TRAPDOOR)`; `MS_LEADER/MS_NEMESIS` → `(ALL_TRAPS)`; `Is_stronghold||Is_knox||In_endgame||In_hell||In_V_tower||In_quest` → `mwandexp=TRUE` so first wand uses `buzz` not `buzz_force_miss`; `In_hell` = hellish flag idiom; **D-2294** `mpeaceful` MM_ANGRY arm (`:1297` verbatim ternary, `js/makemon.js:3208`) + `mwandexp` zeromonst template field (`monst.h:166`; `save.c`/`restore.c` whole-struct `savemon`/`restmon` analogue is `lev_json.js` `serMon` key-copy, probe-verified both ways));
**D-2719 `monhp_per_lvl` whole C body** (`:986–1007` in C order; default
`rnd(8)` drawn unconditionally, then golem (`golemhp/mlevel`, no RNG) /
`mlevel>49` (`4+rnd(4)`) / adult-dragon (`4+rn2(5)`) / level-0 (`rnd(4)`)
arms overwrite; live `js/makemon.js:962`; stale «named omit» doc removed).
Caller `exper.c:320` (`pluslvl` Upolyd arm) wired `js/exper.js:187–191`
(`monhp_per_lvl(youmonst)` → `mh +=` → `setuhpmax(mhmax,FALSE)` before
`newhp()`); `losexp :283` was already live (`js/exper.js:393`);
`artifact.c:1653` (`js/artifact.js:2950`), `zap.c:524` (`js/zap.js:4105`),
`zap.c:755` (`js/zap.js:2892`) pre-wired; `uhitm.c:2497` is a comment,
not a call. Named: none — whole body ported.

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
`place_wsegs` live (D-2300); 
**D-2300 `place_wsegs` callers** (`worm.c:614–635`; `mon.c` `replmon` `:2536–2537`, `restore.c` `getlev` `:1194–1195`; zap `wormno` copy + `cutworm` `:471` already live; `js/mon.js` + `js/do.js` over live `js/worm.js`);
**D-1573 `wormgone`** (`worm.c:307–332`; callee `toss_wsegs`; caller `mon.c` `newcham`
`:5359` place_monster head-back; `m_detach` `:2787` arm live in `js/mhitm.js`
(D-2231); `dog.c` `mon_leave` `:728–763` live in `js/dog.js` incl. the `:755`
worm arm — count, truncate, `wormgone`, head-back — wired at the keepdogs
follower arm + `migrate_to_level` (D-2296; `mon_leave`'s `no_charge` /
`picked_container` + `set_residency` named));
**D-1577 `redraw_worm`** (`worm.c:989–998`; callers `dog.c` `tamedog` `:1275–1276`
after head `newsym`, `abuse_dog` `:1386–1390` when the pet goes wild; unlike
`see_wsegs` includes the dummy at `wheads`; live `js/worm.js` + `js/dog.js`);
**D-1798 `wormhitu`** (`worm.c:343–362`; caller `monmove.c` `dochug` PHASE FOUR;
skip dummy at `wheads`; `distu(wx,wy)<3` then `mattacku`; live `js/worm.js`);
**D-2222 `flip_worm_segs_vertical`/`flip_worm_segs_horizontal** (`worm.c:968–987`;
caller `sp_lev.c` `flip_level` `:661–666` wormno arm after priest/shk; live
`js/worm.js` + `js/mklev.js` monsters loop);
omit save/rest wsegs, muse/mhitu
`worm_move` callers; feel_location
`is_worm_tail`; Detect_monsters cansee; MON_STILL_ARRIVING;
map_monst head `pet_to_glyph` / `detected_mon_to_glyph` (plain `mon_glyph`); 
**D-2670 `worm_cross`** (`worm.c:898–942` restart in C order with per-arm cites; `:913–916` impossible arm via `void impossible` sync precedent, live `distmin` import replacing the `Math.max` shadow, `!wnum` early-out dropped — `wtails[0]` null falls out FALSE like C; callers `hack.c:1172`→js/hack.js:511 + `mon.c:2253`→js/mon.js:3184 pre-existing wired, `steed.c:265` comment-only); `howmonseen` is D-1562; `worm_known` is D-1548; cutworm is D-1570; non-worm `level.monsters[][]` still fmon-only

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
**D-0774 `map_cleanup`** before wallify/flip (asmodeus/orcus/wizard1–2); **D-2334** deltrap/del_engr arms (shared-deltrap Sokoban `maybe_finish_sokoban` named); 
**D-0775 minliquid**; **D-0776 `Wiz-strt`** + **D-0777 `maketrap` AIR/CLOUD** + 
**D-0782 branch LR_BRANCH pre-flip** (prefix **101022→101930**; 
Scr **389**) + **D-0800 `Wiz-loca`/`Wiz-fila`/`Wiz-filb`** (seed0360 RNG **FULL 120639**; 
Scr **561**/833); **D-1818 `Wiz-goal`** (Dark One / Eye; lua `aligned=` ≠
C `align` → `induced_align`; **D-1906** 14 empty `des.object` `:74–87`, not 15 — :73 is the named Eye); fakewiz deferred; **D-0906 hellfill** via mklev; 
**D-2226 `LVLINIT_ROGUE` dispatch + roguecorr `impossible()` wall checks** (`sp_lev.c:2986–3003` default/NONE/ROGUE arms; `extralev.c:62–134` + `:270–273` nine guards; RIGHT from-door keeps C's verbatim `down` label); omit `ROGUEOPTS` env parse (Rule #2 — no environment in scored js/)

### `src/mklev.c` / `sp_lev.c` `lspo_map`

JS: `js/mklev.js` — partial

Ordinary level path substantial; **`fill_ordinary_room` nsubrooms recursion before needfill**
(D-0917) + **D-2469 `fill_ordinary_room` whole-body restart** (`mklev.c:939–1171` in C order: amulet-or-rn2(3) sleeper + spider-WEB, live `mktrap(0,NOFLAGS)` loop, `Is_rogue_level` skip, `mksink`/`mkgrave` live as same-file locals, 3 `impossible` arms; named omit: `count_level_features` recount quirk, incremental nsinks); mineralize bury-vs-place (D-0014); 
`mktrap_victim` place_object ammo/possessions (D-0016) + **D-1519 floor gnome candle `begin_burn`** (`mklev.c:1918–1919` after `place_object`, `!levl[x][y].lit` → live `timeout.js` `begin_burn`; not `m_initinv` D-1506; **D-1533** `create_object` `o->lit`); **D-2726 `create_object` whole-body completion** (`sp_lev.c:2193–2440` in C order: `:2284` recharged, `:2294` tknown, `:2304–2341` invent_carrying_monster/saddle + container-NULL artifact-uncreate via live `artifact_exists`/`safe_oname`/`obfree`, `:2356–2389` Medusa statue fill via live makemon/propagate + fmon-unlink idiom, `:2391–2420` achievement prizes via local `Is_mineend_level`/`Is_sokoend_level` (dungeon.h:136–137), `:2428–2437` buried via sync bury_an_obj inline; uball arm named omit — fresh otmp never uball + async pline); 
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
tut_key/eckey/Knight jump/leave-invent/`add_to_container` merge deferred — `map_location` tseen live js/display.js:4798 (D-0120/D-0326/D-1528), queue row retired STALE 2026-09-16); 
**occupied invocation_pos** (D-1154); omit other fill *bodies*, nested `des.room` bodies beyond 
Nesting/Fake Delphi/Huge/… outer sizes, Lua `post_level_generate` postprocess 
queue, `mkgrave_room` bury; **D-1533 `create_object` `o->lit` `begin_burn`** (`sp_lev.c:2425–2426` after `stackobj`, not tile.lit; `l_create_object` lit default 0; mktrap_victim is D-1519; **D-1542** themerms Light source fill); **D-1723 `lspo_object` non-merge quan do-while** (`sp_lev.c:3725–3740` `!objects[id].oc_merge`; find_objtype + argc string/coord; class-letter `def_char_to_objclass`/`mkgold`; other load_* `des.object` still hand-rolled); `Can_fall_thru` before hole→ROCKTRAP (Vlad niche); 
**D-0906 `hellfill`+`create_maze`/`LVLINIT_MAZE`** (seed4500 **32538→49776** Scr **459**; **D-2136 hells[7] border via `selection_rect_rel`** — C `selection.rect(0,0,78,20)` takes the `get_location_coord` origin shift (`gx.xstart=1`) → frame (1,0)-(79,20), not the hand-rolled (0,0)-(78,20); `lit=0` rule explicit); 
**hellfill Invocation_lev VS** (D-1154 `pick_vibrasquare_location`+`maketrap`; **D-2586** full `:line` cites + `:1069–1072` debugpline2 D_DEBUG named omit; `stairway_find_dir` file-local clone named); **D-2467 `mkinvokearea`+`mkinvpos`+`mkinvk_check_wall`** (`mklev.c:2410–2497`/:2503–2598/:2603–2613 → `js/mklev.js` exported `mkinvokearea`, module-local helpers; `deadbook` caller deferred in js/spell.js; `display_nhwindow` omit); 
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
**D-2492 `makemaz` whole-body restart (`mkmaze.c:1127–1223` in C order: live `Is_special`/`Invocation_lev`/`dmonsfree`, `check_ransacked` ASSIGN, `.lua` message + `await impossible`, `mklev.c:1289` hell/medusa `makemaz("")` gate wired; named: SPLEVTYPE getenv, `Is_branchlev`/`In_hell` (no live exports), `load_special` file IO)**; 
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
**D-2336 quest-start/soko branch levregions stored pre-flip for flip_level remap**; 
**D-2668 `get_table_region` + `get_table_intarray_entry` unpacked** (`sp_lev.c:5282–5316` + `:5260–5280`; file-local `get_table_region_unpacked`/`get_table_intarray_entry_unpacked` js/mklev.js; optional-absent → null keeping caller -1s, non-table/non-4 throws incl. C's "Not a region") wired into `l_teleport_region`/`l_levregion` (`:5414/:5421` via l_get_lregion) + `lspo_exclusion` (`:5514`); **same-file `search_door` (`:2492–2539`, panic ≡ throw) + `create_corridor` (`:2671–2725`, async for impossible, dig return discarded) new exports**; named: `lspo_corridor` table-form (`:4551`, no des.corridor caller in tree), `lspo_random_corridors` (`:4571`) ≡ inline `makecorridors()` at loader sites, `lspo_replace_terrain`/`lspo_region`/`lspo_wall_property` table-form region arms (`:5094`/`:5607`/`:5889` — unpacking compiled into loader constants, no runtime region-field read); 
**D-0608 `minend-1` `des.object("(")`→TOOL not WEAPON** (defsym `'('`=TOOL_CLASS); 
**D-0543 `soko1-2` load_special** (map/reward percent(25); soko1-1 + soko4-1 loaders live js/mklev.js:12307/12839, soko4-1 D-0756 fixed — remainder claim retired STALE 2026-09-16); 
**D-0547 `soko2-1` + `is_ok_location_dry` boulder reject**; **D-1820 `soko2-2`**; 
**D-0548 `soko3-1`/`soko3-2`/`soko4-2` load_special**; 
**D-0567 Sokoban `premap_detect`/`solidify_map`/`SpLev_Map` + 
flip `fix_wall_spines`** (**D-1820 `soko2-2`**; `soko4-1` D-0756); 
**D-0521 `load_special` must not call `fill_special_room` (makelevel fills once)**; 
**D-0522 `put_lregion_here` TELE `m_at` reject when `!oneshot` + 
`is_exclusion_zone`** (omit `m_into_limbo`; **D-1109 `lspo_exclusion`**; `undestroyable_trap`; 
other soko*-*; **D-0526 Bar-strt through Pelias/chieftains/trap/eels/ogre floodfill/flip/branch**; 
**D-0588 `Arc-strt` load_special + `splev_discard_default_minvent` (`mdrop_special_objs` 
obj_resists)**; Pelias/`Lord Carnarvon`/`Arch Priest` `m_dowear` live (D-2335) + King Arthur/Grand Master `m_dowear` live (D-2342); 
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
top-aligned map `'x'` skip + shops/temple/peaceful watch; **D-2095
`ensure_way_out`/`generate_way_out_method` live** — `floodfillchk_match_accessible` +
`selection_floodfill_accessible`, called pre-wallification per C `load_special`
`inaccessibles` arm; **D-2665 `selvar.c` selection_floodfill generic live**
(`set_selection_floodfillchk` + `sel_flood_havepoint` + `selection_free` exports;
accessible clone retired → installer + generic call per C `sp_lev.c:5225/5158/5229/5236/5247`;
7 Lua-`selection.floodfill` sites via `set_floodfillchk_match_under` per `nhlsel.c:750-751`); **D-2684 `selvar.c` selection_do_gradient + staticfn line_dist_coord live** (`js/mklev.js:27014` + file-local `:26986`; mind/maxd swap, dofs floor, default→impossible→radial fallthrough, C short-circuit rn2 gates; named: Lua `selection.gradient` binding `nhlsel.c:912` — no JS Lua bridge yet); **D-2101** driver rescan is C-faithful (`break outer` = `goto outhere` `sp_lev.c:5241-5251`, rescan from x=1)); 
**D-1504 `minetn-7` Bazaar Town** (nested `des.room` 30×15 + `percent(75)` 
nests + chance shops + sink `pos=0` door + temple `align[1]` + watch) +
**D-1513 town-floor `des.monster("gnome")` ×3** (lua `:155–165`; not four;
review **465**); 
**stolen_booty D-1363** live when proto is minetn-1 (**D-2586** full `:799–889` cites; `upstart_maz` clone retired → live hacklib `upstart`; C-staticfn helpers file-local); 
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
**D-2249 `create_monster` appear_as M_AP_MONSTER arm** (`:2002–2123` gate +
`select_newcham_form`/`name_to_mon` pick, `validvamp` S_HUMAN gate, mimic-self /
mimic-Wizard disguise vs cham/vamp `set_mon_data` + light + perminvis, NOTHING /
default impossibles, `does_block`→`block_point` tail; `opts.appear`/`appear_as`,
no caller passes them yet; FURNITURE/OBJECT generic arms stay named — live
levels use hand-rolled Rog-strt/soko/juiblex/minend/themerms paths); 
**D-2645 `lspo_monster` des.monster binding + `create_altar`** (``sp_lev.c:3214–3400`` + ``:2446–2486``; ``js/mklev.js`` ``l_create_monster``/``splev_create_altar`` + file-local ``get_table_align_unpacked``/``lspo_bool_opt``/``lspo_monster_appear``/``lspo_monster_from_string``/``lspo_monster_normalize_table``; ``set_levltyp`` now exported from ``js/trap.js``); string/class forms delegate to live ``splev_create_monster`` (single gender burn replayed); table post-spawn arms christen/female-override/9 status flags/%127/waiting-vamp-newcham/m_lev_adj/invent-drop/CUSTOM-global/inventFn+spo_end_moninvent; altar via live room/coords/in_rooms/priestini; live fills not rewired; named: ``lspo_altar`` binding, Lua argc dispatch, seentraps list, G_UNIQ/G_GONE, FURNITURE/OBJECT appear; 
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
`splev_create_trap` named type; `lspo_replace_terrain` selection arm;
**D-1966 `nhlsel.c` `l_selection_iterate`** (exported `selection_iterate_lua`:
y-outer/x-from-max(1,lx) + getpoint guard + argc/TFUNCTION throw like
nhl_error; relcoord round-trip skipped per 791/810; Lua-VM pcall-abort/
lua_gc/`l_selection_check` named omissions)) +
**D-1822 `bigrm-1`/`-10`/`-13` load_special** (percent(80) line/plus/snake
`selection_do_line`; fog maze `mazewalk`+levregion stair-up; 8-filter pillars
via nested `lspo_map` coord); Big Room 13/13;
**D-1823 `minend-3` load_special** (Catacombs: HWALL solidfill so mazewalk
carves map STONE only; valign bottom; west `stocked=false`; lua wallify;
luckstone prize + flint + level-teleports); Mine's End 3/3;
**D-2429 minend-3 level-teleport pair** (both explicit traps now through
`mktrap_seen_victim` — victim-gate `rnd(4)` burn per `mklev.c:2137` C `&&` order);
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
`setup` S_air memory** (hero_bubble track + `maybe_adjust_hero_bubble` live) + 
**D-2171 `movebubbles` water cons pickup + `mv_bubble` deposit** (C `mkmaze.c:1539–1685` pickup loop + `:1952–2100` cons arms in exact order: obj unlink via `obj_extract_self`, mon off-map + `MON_BUBBLEMOVE`, hero cons + `hero_bubble`, trap cons, `water_pos` paint + `block_point`; deposit between paint and boing: `place_object`/`stackobj`, `mnearto` else `elemental_clog` (new `mon.js` export), hero `u_on_newpos` (D-2756; steed / see_nearby / earth_sense live inside the call) + `mnexto`, trap tx/ty; `movebubbles`/`mv_bubble`/`restore_waterlevel` async with awaited `allmain`/`do` call sites; AIR/CLOUD paint gains C `unblock`/`block_point`; still named: Punished ball carry, `vision_recalc(2)`) + 
**D-2427 `mk_bubble` ini boing colli flips** (C `mkmaze.c:1924` + `:2088–2106` in `mk_bubble`: border `colli` flips on the ini path, default redirect stays ini-gated) + **D-2456 `mv_bubble` whole-body port** (C `mkmaze.c:1952–2107` same-named local `mv_bubble` in `js/mklev.js` (ex-`mv_bubble_move`); `:1981–1999` out-of-bounds pline+clamp arms live; cons-default `impossible` live; deposit `b.cons=null` unconditional under water; `mk_bubble` ini paint gains the C unblock/block_point arms — D-2427's named omit retired; `:1924` stays an inline ini replica on the sync load path, clamp/bounce provably no-ops there) + **D-2501 `movebubbles` whole-body port** (C `mkmaze.c:1539–1685` restarted in C order: `:1554–1555` wportal, `:1557` live `vision_recalc(2)`, `:1563–1564` Punished unplace-covet via new `ball.js` `unplacebc_and_covet_placebc` (`:222–234`, `rnd(400)` pin on `game.bcrestriction`, live `unplacebc` core), `:1572–1573` cons-guard via `impossible`, monster arm gains `else remove_monster` (live `steed.js`), air per-cell `recalc_block_point` + CLOUD `block_point`, `:1673–1679` toggle+drift (rx/ry order kept), `:1682–1683` lift via new `lift_covet_and_placebc` (`:236–254`, pin gate + `bcrestriction = 0` tail), `:1684` full-recalc; callers `allmain.c:375`→`js/allmain.js:1116`, `do.c:1832`→`js/do.js:1931` both gated water/air like C; named: BREADCRUMBS crumb variants, lift `paniclog`, `end.c:894` lift caller) + 
**D-1827 `water` load_special + `save_waterlevel`/`restore_waterlevel`/
`unsetup_waterlevel`/`set_wportal`** (76×20 WATER map, left-third tele,
astral portal, eels/kraken/sharks + 19 hostile water elementals; bubble
chain persist on savelev/getlev); 
**D-1828 `astral` load_special** (endgame 5 of 5: 75×20 temples, 60% wing
rooms, shuffled sanctums + `priestini`, Moloch/aligned hordes, Riders;
`deliver_splev_message` `convert_line` `%d`); 
**D-0551 adult-dragon endgame HP**; **D-0552 `pm_to_humidity` + 
`is_ok_location` HOT/WET/SOLID in `splev_create_monster`** (Is_waterlevel + `is_pool`/`is_lava` arms live D-2368); 
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
prefix **86170→98492**) + **D-2163 wizard3** (mazegrid + center map + east mazewalk + 
morgue/beehive/arrival des.regions + portal + `link_doors_rooms`/`remove_boundary_syms` 
epilogue (sp_lev.c lspo_finalize_level order; was missing → arrival west secret door 
unlinked from beehive, fdoor=north, queen 8th not 4th)) + **D-0776 `Wiz-strt`** (cloud replace + Neferet invent + siege; 
prefix **98505→100104**; Scr **292**) + **D-0777 `maketrap` AIR/CLOUD + 
`splev_create_trap` stairs/`get_location_coord`** (prefix **100104→100397**) + 
**D-0800 `Wiz-loca`/`Wiz-fila`/`Wiz-filb`** (seed0360 RNG **FULL**; Scr **561**;
**D-1818 `Wiz-goal`**; **D-1819 `Bar-goal`**; **D-1841 `fakewiz1`/`fakewiz2`); **D-1952 `mkmaze.c` `is_solid`/`mazexy`** (local `isSolidTile` clone retired; `wall_cleanup` calls `is_solid`; `mazexy` live but `populate_maze`/`create_maze`/`maze0xy`/`walkfrom` callers still deferred); **D-2216 `mkmaze.c` `populate_maze` + `makemaz` fallback tail** (`populate_maze` live in C order; empty-proto and load-failure paths run the C `:1197-1222` tail — is_maze_lev/corrmaze roll, create_maze variant, wallification, stairs or vibrating square, place_branch, populate_maze; walkfrom wall cell takes typ only per `:1306`; `mazexy` reads `maze_x_max()/maze_y_max()` per gx/gy; **D-2304 `mktrap` dispatcher + populate_maze trap loop** (live `mktrap` mklev.c:2036-2150 in C order — invalid-args once-guard, tm pool/lava abort, specified/rogue (`traptype_roguelvl` table)/hell-bias/`traptype_rnd`-loop select, hole→ROCKTRAP, mazexy/somexyspace 200-try occupied/boulder loop, `maketrap`, shared `mktrap_seen_victim` tail — plus the C 6th `rn1(6,7)` loop in `populate_maze`; still named: dmonsfree/SPLEVTYPE-getenv, `mktrap` invalid-args `paniclog` write) + **D-2519 `makerooms` whole-body restart** (`mklev.c:366-436` in C order: per-branch load-once gate (`_luathemes_loaded[dnum]` ⇔ `gl.luathemes[dnum]`; compiled-in tables, load cannot fail), pre hook (`pre_themerooms_generate` debug-env only), vault arm, themed arm (break on `themeroom_failed` only — pcall return unchecked per C), `else create_room(-1×6, OROOM, -1)` arm, post hook (`reset_xystart_size` + empty `post_themerooms_generate`); `!pick` path calls `impossible` per lua:975-978. Named: lua runtime (`nhl_init`/`nhl_loadlua`/`nhl_done`/`nhl_pcall_handle`), `create_des_coder` (SpLev_Map memset already in `reset_xystart_size`), `iflags.in_lua`, THEMERM/THEMERMFILL debug selection) + **D-2559 `dosdoor` whole-body restart** (`mklev.c:615–676` in C order: `shdoor` via live `in_rooms(x,y,SHOPBASE)` — file-local always-`[]` stub deleted, arg fixed 0→SHOPBASE; wall-guard type reset; DOOR `rn2(3)`/`rn2(5)`/`rn2(6)` + difficulty-5 trap gate; STUPID-undefined open/doorway arm; Rogue `D_NODOOR`; trapped→mimic with G_GONE triple + live `makemon(mkclass(S_MIMIC,0),NO_MM_FLAGS)`/`set_mimic_sym`; commented `newsym` kept out; SDOOR short-circuit arms; single end `doormask=flags` sync per rm.h:213; file-local `alloc_doors` (C staticfn :555–571, JS arrays self-grow) + `add_door` in C order — dup check, fdoor shift, rooms+subrooms folded loop (JS subrooms live inside `level.rooms`), `doorindex++` before store; callers `dodoor` + `makeniche` ×2 wired) + **D-2597 `topologize` whole-body restart** (`mklev.c:1595–1656` in C order with `:line` cites: roomnoidx roomno `:1602`, bounds `:1603–1604`, nsubrooms snapshot `:1609`, already-done/irregular skip `:1612–1614`, innards `:1619–1627`, top/bottom `:1629–1636`, sides `:1638–1645`, new subroom recursion `:1648–1654`; callers wired level_finalize_topology/shop/build_room/lspo_room/des-region. Named: SPECIALIZATION do_ordinary/rtype arms compiled out per `global.h:120`) + **D-2671 `sp_lev.c` `flip_encoded_dir_bits` + `swapbits`** (C `sp_lev.c:498–514` local in `js/mklev.js` in C order with `:line` cites, C `hacklib.c:830–837` live export in `js/hacklib.js`; xdir/ydir order verified C `decl.c:77–78` ≡ JS tables; both `flip_level` trap-loop conjoined-pit arms wired `sp_lev.c:603–604`/:612–613 with the full-`flp` call like C. Named: none) + **D-2695 `set_door_orientation` sel_set_door-caller wiring** (`sp_lev.c:1041–1085` body already live `js/mklev.js:16902` with C-locus `isok`/`IS_WALL`/`IS_DOOR`/`IS_OBSTRUCTED` + local `IS_DOORJOIN` ≡ `rm.h:122`; unwired 2nd C caller `sel_set_door :4659` now called in C order at all 15 des.door coord-form closures; `link_doors_rooms :1133` pre-wired. Named: `SpLev_Map[x][y]=1` marking + D_SECRET→SDOOR promotion stay with a future `sel_set_door` row; `link_doors_rooms` epilogue absent in medusa-1/bar-strt/pri-strt/arc-strt/arc-loca/minend-1·2·3 builders) + **D-2697 `set_door_orientation` remainder wiring** (`:4659` one-liner now at all 43 remaining coord-form sites — 28 closures (review-1654's 25 + sokoDoor×2 + tut1_door, whose table-form carries coord so C takes the coord path) + 15 inline (medusa-2/val-strt/sam-goal/sam-filb/cav-strt/cav-loca/tower3/soko3-1/soko3-2/minend-2/soko2-1/soko2-2/asmodeus/baalz/wizard3); review's "26 of 41" census corrected (25 named closures exist; tut-2 has no des.door). Named: wall-form create_door sites, dosdoor/drawbridge/doormask-clear/terrain paths) + **D-2716 `mklev.c` `traptype_rnd` whole body** (`mklev.c:1938-1998` in C order `js/mklev.js:30553-30591` — LEVEL_TELEP Knox disjunct `single_level_branch(game.u?.uz)` (`js/teleport.js:2231`) wired in C order (was deferred), FIRE_TRAP inline hellish read replaced by live `Inhell()` (`js/teleport.js:2241` ≡ `dungeon.c:1942`); C caller `:2075` → `mktrap` `:30757` pre-wired. Named: none) + **D-2737 `sp_lev.c` `lspo_map` + `lspo_replace_terrain` + `lspo_region` whole bodies** (C `lspo_map :6075–6319`, `lspo_replace_terrain :5051–5143`, `lspo_region :5584–5715` in C order in `js/mklev.js`, unpacked-table precedent D-2736 `lspo_trap`/D-2645 `lspo_monster`: string/table `arguments.length` dispatch, `splev_opt_*` + `get_table_xy_or_coord`/`get_table_region_unpacked` + `get_location_coord` twins, throws for nhl_error, contents as 2nd-arg-or-field callback, `{width,height}` for `l_push_wid_hei_table`, room object for `l_push_mkroom_table`, live selection returned for `l_selection_push_copy`; file-local `sel_set_lit` (C staticfn `:5535–5540`), `mapfrag_error` (`:281–295`), `set_levltyp_lit_tail` (C mkmaze.c:125 lit half incl. RANDOM→rn2(2)); `reset_xystart_size` keeps SpLev_Map via the keep variant (C never clears it); needfill/needjoining land post-add_room (C slot preserved — same final state). Named: mapfrag_free/dupstr/free (GC no-ops); lcheck_param_table/l_selection_check (shape checks); get_table_mapchr family (inline); nhl_pcall_handle (direct call); C needfill-string TODO + lit=random TODO (C's own notes, kept))

### `src/mkmap.c` cavern generator

JS: `js/mkmap.js` — complete envelope, live (D-1902 passes + D-1908 driver + D-1910 join + D-1911 finish/cutover; the `splev_initlev` LVLINIT_MINES path awaits the canonical `mkmap()`; `wallify_map` imported from `js/mklev.js`, never cloned)

**`get_map`/`pass_one`/`pass_two`/`pass_three`/`remove_room`/`remove_rooms`** (D-1902; C `mkmap.c:54–60` bounds-exact OOB→bg / `:67–96` in-place CA (0–2 kill, 5–8 breed) / `:100–144` double-buffered ==5 / <3 with per-call scratch at the C `new_loc` layout / `:378–436` total-overlap removal + last-over-slot swap with `roomnoidx` restamp; `remove_rooms` async for `await impossible`, `remove_room` spread-copy never aliases the `hx=-1` tombstone); **`init_map`/`init_fill`/`litstate_rnd`/`mkmap`** (D-1908; C `:23–34` blanket NO_ROOM/bg/unlit `:36–52` rn1/rnd scatter to limit 624 `:438–440` N_P1/P2/P3_ITER=1/1/2 `:442–448` depth-gated lit `:450–486` driver in C order; C `:460`/`:485` new_locations alloc/free maps to the D-1902 per-call scratch — observationally identical, no shared buffer to own); **`join_map`/`join_map_cleanup`** (D-1910; C `mkmap.c:257–328` fill loop + `joinm:` join pass / `:245–255` roomno strip + `nroom`/`nsubroom` reset with `rooms[0]`/`rooms[MAXNROFROOMS+1]` tombstones; `somexy`-failure `await impossible()` arm with centre fallback, `somexy`/`dig_corridor` short-circuits preserved for RNG, `mkmap()` driver `await`s the canonical join); **`finish_map`** (D-1911; C `mkmap.c:330–363` whole-map wallify under `walled` / `!IS_OBSTRUCTED` fg/bg + `TREE` + `walled && IS_WALL` lit with per-room `rlit` / unconditional lava light + `icedpools ? ICED_POOL : ICED_MOAT` (8/16 — the retired clone wrote 1/2); driver `:478` finish call + `:480–484` walled+joined cavernous stamp live); live cutover: `splev_initlev` MINES `await`s canonical `mkmap` (`async` through 30 MINES loaders + hellfill chain + `load_special_proto`); the `mklev.js` envelope clones (`mkmap_init_*`, `mkmap_get`, `MKMAP_DIRS`, `mkmap_pass_*`, `join_map_fixed`, `join_map_dig_pass`, local `join_map_cleanup`, `finish_map`, local `mkmap`) deleted; retained: `mklev.js` `wallify_map` (canonical C `sp_lev.c` home, exported), `litstate_rnd` local (non-MINES `rlit` site; pre-existing D-1908 debt), `MKMAP_WIDTH`/`HEIGHT` (`flood_fill` use);

### `src/track.c`

JS: `js/track.js` — partial

**`initrack`/`settrack`/`gettrack`** (D-0099); 
**`goto_level` `save_track`/`rest_track`** in-memory stash (D-0367; was wipe-only); 
**bones `write_bonesfile`/`getbones` persist utrack** (D-0578; 
C `savelev`→`save_track` / `getlev`→`rest_track`); **SFCTOOL resolved** (D-2225; C wraps only `settrack`/`gettrack` in `#ifndef SFCTOOL` — the single ESM build ships the full six-function family, no behavior to port; `rest_track` impossible-counts `panic` live as a loud throw)

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
(not one-corner `recalc`; seed4500 FAIL at D-1574); **D-1962 `inside_rect`
`:53–57` + `inside_region` `:62–73`** (exported `js/region.js`; stored
`bounding_box` else recompute); **D-2297 `create_region` `:79–127` + `add_rect_to_reg` `:133–157`** (exported `js/region.js` with C defaults; both gas-cloud constructors via `create_region(null, 0)` + `add_rect_to_reg`; `inside_region` loops `nrects`); 
**D-1598 `seemimic` `has_mcorpsenm`/`freemcorpsenm`**; **D-1587 `display.c` `mimic_light_blocking`**
See_invisible `block_point`/`unblock_point` (not `recalc`; potion/timeout/polyself
callers + `iter_mons` `mon_offmap` named); 
**detect SCORR/SDOOR uncover uses `recalc_block_point`** (D-0269); 
**`Is_rogue_level` → `rogue_vision`** (D-0486; room bounds + adjacent; pit/underwater deferred); 
**Blind `vision_recalc` COULD_SEE-only + old IN_SIGHT newsym** (D-0579); 
**`do_light_sources` TEMP_LIT + makemon `emits_light` LS_MONSTER** (D-0569; 
**D-1597 camera range 0** Null-id `LS_OBJECT` + `show_transient_light`;
**D-2157 circle_ptr exact ring live** (hero at_hero_range trim live D-2302); **D-1956 `obj_adjust_light_radius`** (`light.c:825–838`; first LS_OBJECT id-match wins, recalc only on change, else `impossible(xname)`; live `js/light.js` async; caller `mkobj.c` `maybe_adjust_light` bless/curse wiring WIRED D-2244); **D-2574 `del_light_source`** (`light.c:99–138` + staticfn `delete_ls` `:141–168`; type switch + NEEDS_FIXUP o_id arm + delete_ls + both impossible arms, restarted `js/light.js:89/114` sync with fire-and-forget `void impossible`; LS_OBJECT/LS_MONSTER now C-valued 1/2 per vision.h; `fmt_ptr` shared from `js/mkobj.js:1554`; 9 JS call sites wired, replmon + made_change pre-existing names, NEEDS_FIXUP producers unported by design); **D-2644 `relink_light_sources`** (`light.c:517–563`; flag-gated walk + LS_OBJECT→live `find_oid` / LS_MONSTER→live `find_mid(nid, FM_EVERYWHERE)` + ghostly remap via live `lookup_bones_id` + throw≡panic + flag clear, live `js/light.js`; callers restore.c `:726`→`js/save.js` relinkGlobalTimersLights site + guard, `:1300`→`js/save.js` post-restore_light_sources guard; C `lookup_id_mapping` own row restore.c:1484, ghostly bones light install + NEEDS_FIXUP producers unported by design); **D-2666 `write_ls`** (`light.c:633–702` whole body in C order + same-file staticfn `whereis_mon` `:397–417` file-local; bad-type impossible-only+Null `:699–701`, NEEDS_FIXUP passthrough `:641–642`, OBJECT can't-find `:646–654` via live `find_oid`, MONSTER chain `:655–688` via `whereis_mon` + live `find_mid` with DEADMONSTER disjunct, PROBLEMATIC TODO no-op, NEEDS_FIXUP set/record-as-Sfo/pointer-restore/flag-clears `:693–697`; `LSF_IS_PROBLEMATIC` 0x4 file-local; C staticfn exported — JS per-entry save writer is lev_json serLight; sole C caller maybe_write_ls `:598` → JS serLight sites snapshotLocalLights/snapshotGlobalLights/serLightList all route through `write_ls`, Null ≡ unwritten; Sfo binary + zeroany + `%u` + Null-id guards named in D-2666); **D-0675:** stale gas across levels blocked LOS (not 
Algorithm-C TRWALL); **`clear_regions` in `clear_level_structures` + 
goto_level stash/rest** (binary `save_regions` format unportable by design — JS saves JSON per Constitution §1.6; teardown `clear_regions` live js/region.js:647 — queue row parked DIAGNOSED 2026-09-16); **D-2639 `rest_regions` `:798–892`** (live `js/region.js:700` — stash rebuild in C field order, ttl rebase/floor, reverse post-pass remove/reset_region_mids `:928–941` via bones.js ghostly id map; callers `js/do.js:1780` + `js/save.js:874` non-ghostly, `js/bones.js:626` ghostly; Sfi_*⇔stash copy, alloc⇔GC; light.c/timeout ghostly lookups future); 
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
**D-2038 `seenv_matrix` center SVALL** (`display.c:3358–3362`, shared by
`vision.c`; hero's own square is seen from all angles) — `js/vision.js` copy
had `0` at `[1][1]` (starter-skeleton transcription slip; `js/display.js`
`set_seenv`/`unset_seenv` already carry SVALL) so a lit hero square kept
`seenv` 0 and `getpos` `<`/`>` feature scans missed stairs under the hero;
now SVALL (only reachable when `row==uy && col==ux`).
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
all callers pass `glyph_to_trap(glyph_at())` (lookat D-1787,
`look_traps` D-2298); named: C's own TODO on recursive/buried
containers); 
Monster dart path: `t_at`/`t_missile`/`thitm` miss pline/`mintrap`/`seetrap` (D-0018–D-0019); 
**`maketrap` + `choose_trapnote` + `hole_destination`/`dng_bottom`** (D-0054) + 
**D-0782 MAGIC_PORTAL mon migrate** + **D-0777 terrain gates** 
(`CAN_OVERWRITE`/pool/furniture/`IS_AIR` CLOUD ≠ portal → null, skip victim `rnd(4)`; 
Knox caller gates deferred (maketrap trap.c:482 + LEVEL_TELEP-kind mklev.c:1963 named omits js/trap.js:946 js/mklev.js:28338; fn + stairs/end/teleport callers live — queue row retired STALE 2026-09-16); **`water_damage` POT_WATER/force/dilute/scroll/book + 
`erode_obj(ERODE_RUST)`** (D-0109/D-0683) + **`fire_damage_chain` invent/floor walk + 
Blind smoke D-1138** + **CAN_OF_GREASE / TOWEL `wet_a_towel` / greased / 
`Is_container`+`Waterproof_container` before luck `rn2(20)`** (D-0928 #1101) + 
**`splash_lit` D-1337** (apply.c brass dunk/crackle/`snuff_lit`+age; 
rust-trap walks + water_damage; invent grease wash + container `hliquid` plines /
waterproof `makeknown` D-1501; **`pot_acid_damage` boom + `blank_novel` 
D-2289** (grease-described/`Your` fade+dilute/`update_inventory`, Book steam, 
SPE_NOVEL→blank, SCR_MAIL immune, chain acid_ctx/bhitpos; zap cancel too)); **monster `trapeffect_pit` + 
`thitm`→`monkilled`/`make_corpse` ordinary** (D-0150); 
**hero `trapeffect_pit` PIT/SPIKED + `trapeffect_hole` `Can_fall_thru` (D-1076; 
`fall_through` already D-0986; `check_in_air` Lev/Fly youprop.h; 
`wearing_iron_shoes` uarmf/which_armor IRON)**; 
**`mintrap` `mon_learns_traps` + `m_harmless_trap`** (D-0151); 
**`m_harmless_trap` BEAR_TRAP msize≤MZ_SMALL / amorph / whirly / unsolid + 
WEB / RUST / VIBRATING / PIT clinger** (D-0245) + **flyer `check_in_air`/`floor_trigger` + 
SLP/FIRE resist + `mintrap` in-air skip** (D-0770; defended deferred); 
**monster `trapeffect_sqky_board`/`trapnote`/`You_hear`/`wake_nearto` + 
real `canseemon`** (D-0163); **hero+monster `trapeffect_sqky_board` full arms** (D-2206; hero forcetrap/Levitation notice + squeak/vibrate pline + `wake_nearby`, monster `mon_nam` ARTICLE_THE + `pline_mon`; Soundeffect no-op); **`maketrap` `teledest` field for themerms TELEP** (D-0166); 
**monster `trapeffect_rocktrap` `t_missile(ROCK)`+`thitm(d(2,6))`** (D-0181); 
**hero+monster `trapeffect_arrow_trap` `t_missile(ARROW)`+`thitm(8,…)`/`thitu(8,…)`** (D-2022; Soundeffect/steedintrap/gone-arm pline_mon/in_sight seetrap/obfree mirrored from the dart port; anti-magic wired D-2470); 
**hero `trapeffect_rocktrap` feeltrap+place ROCK+losehp** (D-0360; 
`thitm` captures mx/my before death place); 
**`maketrap` ROLLING_BOULDER → `mkroll_launch`/`find_random_launch_coord`/`isclearpath`** (D-0202); 
**hero+mon `trapeffect_rolling_boulder_trap` + 
`launch_obj` ROLL path `dmgval`/`thitu`/`ohitmon`** (D-0599; LAUNCH_UNSEEN msgs; 
mid-roll TELEP D-1237; mid-roll landmine/pit D-1256; `hits_bars` D-0990; 
boulder-chain/`ship_object`/post-switch flooreffects (D-2318) + closed_door crash (D-2330); STWALL `Thump!` deferred); 
**hero `dotrap` + dart `t_missile`/`thitu` miss place** (D-0239; **full `dotrap` dispatch body D-1924** — C `:2996–3060` order: `FORCETRAP||FAILEDUNTRAP`, `plunged`/`conj_pit`/`adj_pit` before `nomul(0)`, `fixed_tele_trap` FORCETRAP force, Sokoban pit/hole air-currents `trapname(TRUE)` fall-through, `floor_trigger+check_in_air` step-over with `u_locomotion_pit`, `already_seen` escape `!Fumbling && !undestroyable && !=ANTI_MAGIC && !forcebungle && !plunged && !conj/adj && (!rn2(5)||(is_pit&&is_clinger))`, steed `mon_learns_traps`, mutated `trflags` to selector); 
**monster `trapeffect_hole`/TRAPDOOR → `mlevel_tele_trap`/`migrate_to_level` `Trap_Moved_Mon`** 
(D-0250; **D-2624** whole-body restart `js/trap.js:4046` in C `:2013–2067` order — hero+monster `impossible('dotrap/mintrap: %ss cannot exist…', trapname(tt,TRUE))` arms, `tt` local, `count_wsegs(mtmp)>5` long-worm arm, forcetrap TRAPDOOR/HOLE `pline_mon` pair, Sokoban yank `pline_mon`+seetrap, tail via `trapeffect_level_telep`; selector HOLE/TRAPDOOR caller already wired `js/trap.js:5655`); **`thitm` hit → `dmgval` clamp≥1** (D-0252); 
**monster `trapeffect_magic_trap` `rn2(21)`→`trapeffect_fire_trap` + FIRE_TRAP selector** (D-0254; **D-2431** xtradmg + AD_FIRE monkilled under `!DEADMONSTER` `trap.c:1800–1806` — no re-kill of a thitm-killed mon); 
**hero MAGIC_TRAP `rn2(30)`/`domagictrap` + `steedintrap` + fate-13 `body_part(SPINE)` / fate-15 qstart prodigal / fate-20 `seffects(SPE_REMOVE_CURSE)`** (D-0266; **D-2258** full `steedintrap` `:3101–3168` replaces the PIT-only clone; explosion still returns before steed; **full `dofiretrap` `:4233–4314` D-2532** (box/carried-pool steam + `the(xname/surface)` spray, `shieldeff`/`monstseesu`, Upolyd golem `mhmax` alts + `mlevel` burn, unconditional `melt_ice`; hero FIRE_TRAP/magic-fate-12/chest-fire callers pre-wired); 
**monster `trapeffect_slp_gas_trap`/`sleep_monst(rnd(25),-1)` + 
`breathless`/`resists_sleep`/`mr_bit` + SLP_GAS selector** (D-0256); **`trapeffect_bear_trap` hero+monster + 
`floor_trigger` BEAR/LANDMINE/SLP/RUST/FIRE + `set_utrap`/`set_wounded_legs`** (D-0398); 
**`trapeffect_rust_trap` hero+monster `rn2(5)` aim + `water_damage`/`splash_lit` + 
iron-golem rust** (D-0508; **D-1095** gremlin `rn2(3)`→`split_mon`; **splash_lit D-1337**; 
`update_inventory`; mlifesaver "starts to fall"; poly `body_part`; drown gremlin still named); 
**`trapeffect_landmine` + `blow_up_landmine`** (D-0874; mon weight `rn2(cwt+1)` vs `WT_ELF/2`;
seed0014 **50259→52043**; **D-2338** retires fill_pit/drawbridge/fillholetyp-liquid/maybe_dunk/unconscious + stale `which_armor`-iron-shoes (live `wearing_iron_shoes`)/steedintrap (live D-2258) — `spot_checks` + `keep_saddle_with_steedcorpse` stay named (no JS counterpart);
**`scatter` landmine arm + MAY_FRACTURE/MAY_DESTROY/uball/flooreffects/tail D-2274** — 
`blow_up_landmine` awaits `scatter(x,y,4,MAY_DESTROY|MAY_HIT|MAY_FRACTURE|VIS_EFFECTS)` in C order; 
shop bill live D-2282 (`credit_report` canonical `js/shk.js:453` + `scatter` baseline/gold-`addtobill`/`lostgoods` arms); boulder-restack live D-2303 (C `explode.c:776-790` `sobj_at(BOULDER)` extract+place via the canonical import); **`invent.c` `sobj_at` canonical D-2281** (`js/mkobj.js:2184` export in C position before `nxtobj`; 9 file-local clones retired to the import — detect/dig/dokick/fountain/hack/mklev/mthrowu/teleport/trap; residuals retired D-2285 (dbridge/music/steed + 7 renamed variants rewired to the import — zero clones remain))); 
**`set_wounded_legs`→`encumber_msg` + `weight_cap` `WT_WOUNDEDLEG_REDUCT` + 
preamble `oldcap` sync** (D-0400; load pline triggers bear `--More--`); 
**`erode_obj` full body** (D-0491 envelope + D-2325 `:170–354` arm-for-arm; 
hero/monster/floor victim + visobj, AD_FIRE/AD_ACID wards via `inventory_resistance_check` (invent.js, C zap.c:5710; `u_adtyp_resistance_obj` extrinsic-99 + dwarvish-cloak-90 arms C zap.c:5676–5698, D-2326; `adtyp_to_prop` stays the enl FIRE/COLD/DISN/ELEC/ACID subset vs C :5653–5671 full switch), grease_protect, verbose arms, EF_PAY costly_alteration, remove_worn_item/extract_from_minvent unwear; s_suffix clone retired); 
omit towel/container/acid-boom caller arms (water_damage container + fire chain + acid scroll-fade live D-0928/D-1501/D-2289/D-1009), overwrite `reset_utrap` 
/ Knox LEVEL_TELEP / Sokoban finish still named (**PIT/HOLE `set_levltyp` D-1280**; 
**DRAWBRIDGE_UP ice D-1296**; **shop `add_damage` D-1300**), other trap types, **hero 
SLP_GAS/`fall_asleep`/steedintrap call** (still deferred), **hero arrow/sqky/dart `poisoned()`; D-2290 wires dart/arrow `!rn2(2)` steedintrap + landmine `recursive_mine` guard + full `trapeffect_poly_trap` hero/monster to the now-full helper (D-2258 helper); 
**Punished pit `unplacebc`/`ballfall`/`placebc` D-1778** (C `trap.c:1955–1958`; 
callers gate on `u.uball` ≡ C `Punished` **D-1786**)**, 
vault/shop/temple `ceiling` labels (**trap burn/water/rock `helm`/`cloak`/`gloves`/`suit_simple_name` now canonical D-2186** — stubs deleted, do_wear/objnam imports; **`materialnm` helm prefix live D-2301** (C `trap.c:116–123` buf + `decl.c:90–94` table, file-local); **`burnarmor` case 3 literal `"gloves"` D-2190** (C `trap.c:143–146`, never `gloves_simple_name`)); **`instapetrify`/`selftouch`/`mselftouch`/`minstapetrify` + 
`mon_to_stone`/`vamp_stone`/`monstone` + `xkilled` stoned** (D-0995/D-0996), **`float_vs_flight` via `set_utrap` (D-2199)**,
full `body_part` poly, **`thitm` `stone_missile`/`passes_rocks` harmless arm** (D-2195; + `pline_mon` hit/miss arms, `-AD_RBRE`, `dealloc_obj` tail), **`mons_see_trap`** 
(D-0701); **`mintrap` already_seen = mon_knows_traps || (HOLE && !mindless)** (D-0703; 
**floor_trigger+check_in_air skip** D-0770; **full `mintrap` dispatch body D-1922** — trapped-arm `!rn2(40) || easy-pit` escape, boulder `!rn2(2)` pulls-free + fill_pit, metallivorous bear-trap eat / spiked-pit munch (meating=5), `easily ` adverb + set_msg_xy; fresh-arm fixed_tele_trap FORCETRAP force, usteed + Sokoban pit/hole gate skip, madeby_u rnl setmangry, unhide+appears envelope); 
**`m_harmless_trap` ANTI_MAGIC + `defended` resists** (D-2194; canonical
`defended` `mondata.c:89–124` + full `resists_magm` `:214–244` in
`js/mondata.js` — `Is_dragon_armor` now exported from `js/artifact.js`;
SLP/FIRE/ANTI_MAGIC arms wired; webmaker + flyer check_in_air +
SLP/FIRE/BEAR/WEB/RUST/VIBRATING/PIT done D-0245/D-0770; sqky
Deaf+mindless cringe gate `trap.c:1453`; rocktrap empty-door `pline_mon`
`:1380–1388`; maketrap drawbridge-under DB_FLOOR `:532–545` already live
`js/trap.js:966–976`), `disturb_buried_zombies` (addressed — out of scope); 
**`maketrap` STATUE_TRAP → `mk_trap_statue`** (D-0538; 
**D-2339** retires the MM_NOCOUNTBIRTH born tally — `makemon` `countbirth` + `propagate(mndx,countbirth,FALSE)` at C `:1160`/`:1233`; full `mongone` stays D-1149-named); 
fire `destroy_items`/`ignite`/`burn_floor`/`melt_ice`/`surface`/`minuhpmax`/`losexp`
(**D-2087** retires `data->mresists` species bits for `resists_elem`
fire/sleep; worn/artifact `Resists_Elem` grants still named); MAGIC_PORTAL/LEVEL_TELEP `mlevel_tele_trap` arms; valley_level stronghold dest; 
migrate light/worm/isshk; **`encumber_msg` callers beyond set_wounded_legs/preamble** (allmain 
turn-loop / exercise STR·CON / pickup/drop); Lev/air/steed `weight_cap` MAX; `stagger()` poly; 
`heal_legs` body + all `heal_legs(0)` sites live (`js/trap.js:3017`; royal-jelly fpostfx `js/eat.js`, mount_steed wizard-force `js/steed.js`); **`body_part`** / **`mbodypart`** import `polyself.js` (D-1496;
steed FOOT uses `mbodypart(usteed)`, not the hero). **mcastu HEAD /
pickup HAND D-1508**. **`mcast_blind_you` EYE D-1534**. **`observe_quantum_cat` FOOT D-1535**.
**`drown` full port D-2284** (C `:5059–5199` in C order: `feel_newsym`
waterwall map; uinwater wade prev-cell `is_pool` + Swim/Amphib/Breathless
`rn2(5)`; fall/plunge `.`/`!` + Titanic/rock sink; `water_damage_chain`;
gremlin `rn2(3)` `split_mon` / iron-golem `Maybe_Half_Phys(d(2,6))` rust;
leash slip; Amphibious/Breathless/Swimming survive + Punished
`unplacebc/placebc` + `vision_recalc`/`set_uinwater`/`under_water`;
Teleportation/`can_teleport` + `!Unaware` + Teleport_control/`rn2(3)<Luck+2`
`dotele`; `dismount_steed(GENERIC)`; `unmul`/`reset_faint`; mmove +
`rnd_nextto_goodpos` + waterlevel/`emergency_disrobe` crawl; `set_uinwater(1)`
+ urgent drown + 2x `done(DROWNING)`/`safe_teleds` loop + `set_uinwater(0)` +
`rescued_from_terrain`; `is_solid` ≡ `is_waterwall`, D-1814/D-1267 retired;
`lava_effects` stays D-1913). **`climb_pit` + file-local `m_easy_escape_pit`**
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
**`float_down` come-down `surface()`** (D-2094; C `trap.c:4144`
`surface(u.ux, u.uy)` via the shared `dungeon.c` surface `js/sit.js`
(D-2008) — dynamic import, the `./sit.js` `split_mon` idiom already in
this file; retires the file-local `surface_fd` floor/ground stand-in on
this arm, which misread STAIRS (STAIRS >= ROOM, `IS_ROOM` true) as
'floor'; `surface_fd` stays for the `fall_through` `The … opens up`
pline at `js/trap.js:3598`, a different C function). **`clear_conjoined_pits`
+ `deltrap` wire + `delfloortrap` clone retired** (D-2310; C `trap.c:6579–6601`
+ `:6535` — file-local port in C order, `deltrap` calls it first; `fountain.js`
local clone replaced by the canonical export, hero `reset_utrap` arm
unreachable via the `gush` `u_at` guard; named: Sokoban `maybe_finish_sokoban`
+ `dealloc_trap` tail); **`openholdingtrap`/`openfallingtrap` monster-arm
`canspotmon`** (D-2317; C `trap.c:6185` + `:6279` — telepathy-sensed counts;
JS narrowed both to file-local `canseemon`, dropping the `|| sensemon` arm;
`canspotmon` already imported from `display.js`, no new edge; `closeholdingtrap`
already correct; `boxlock_invent` `update_inventory` refresh stays named). **`float_up` gain-levitation** (D-2381; C `trap.c:3937–4006` — D-0956 residuals retired: BURIEDBALL arm calls exported `dig.js` `buried_ball` (C `dig.c:1884–1932`, floor/ground at ball cell); steed arm ports `youprop.h:242–245` `Lev_at_will` inline (`Monnam` magically-floats-up vs dismount); uswallow-animal arm inlines the only reachable `dungeon.c` `surface()` branch (maw/husk/nonesuch via `mhitu.js` `digests`+`enfolds`); WEB arm kept literal-dead per C (`:3963` vs `trap.h:77` WEB=18 / `you.h` TT_WEB=3, TT_WEB falls to bear-trap arm); tail uses canonical `mhitu.js` `Flying` (`youprop.h:253–255`); runtime `await import` only, no new static edges; named: file-local `Flying_fu` stays for `float_down`). **`sink_into_lava` whole-body port** (D-2466; C `trap.c:6991–7034` — `export async function sink_into_lava` `js/trap.js:6296` after `lava_effects` in C file order: not-trapped no-op, not-on-lava `reset_utrap(FALSE)`, `!uinvulnerable` third-HP burn-down + `utrap -= 1<<8`, terminal KILLED_BY "molten lava" + urgent death + `burn_away_slime` + `done(DISSOLVED)` + life-save `reset_utrap(TRUE)` + `safe_teleds` unless `hero_Levitation()/hero_Flying()`, else `!umoved` sink-deeper pline+burn vs `Norep` + `utrap += rnd(4)`; wired at the moveloop site `js/allmain.js:1157` under C's `allmain.c:424` guard; `trap.c:6966` is a comment, not a call site; moveloop `pooleffects(FALSE)` else-arm stays D-1000-deferred). **`trapeffect_anti_magic` whole-body port** (D-2470; C `trap.c:2322–2450` — module-local `async trapeffect_anti_magic` in C order: iron-shoes spe>0 drain (hero-only seetrap + lethargic pline + `costly_alteration(COST_DECHNT)`, both arms spe-=1 + `update_inventory`); hero seetrap + Antimagic implosion (Half_phys/Half_spell + Magicbane + carried non-quest `defends_when_carried(AD_MAGM)` rn2(4)s, `Passes_walls()` quartering, torpid/lethargic/sluggish by int-divided hp quarters, `losehp` KILLED_BY_AN + `finish_hero_losehp` gate) then 2d6 drain split (`halfd=rnd(drain/2)`, uenmax gifts halfd, `drain_en(drain, exclaim_it)`); monster `resists_magm`→`mspec_used += d(2,6)` lethargic else Magicbane/invent rn2(4)s + `passes_walls` quartering, mhp damage, file-local `monkilled` compression, see_it newsym; file-local `attacktype` (muse/polyself/eat idiom, no shared exporter); wired as `case ANTI_MAGIC` in `trapeffect_selector` (C `:2977–2978`), retiring the selector-default omit; named: none new in this body). **`trapeffect_anti_magic` hero carried-scan + `immune_to_trap` RUST hero walk array fix** (D-2477 — review 1429 Keep'd C-wrong: both walked array-model `game.invent` via `.nobj`, so the hero carried non-quest `defends(AD_MAGM)` `rnd(4)` and the worn-rustprone `NOT_IMMUNE` could never fire; C `gi.invent` is an nobj chain, JS invent is an array per `invent.js:369`. Fix swaps both to the `(game.invent || [])` array idiom (10 sibling sites in file); RUST monster arm keeps the `mon.minvent` nobj walk; quiver/swapwep skip and break-on-first-match preserved; no new imports; named: none). **`immune_to_trap` whole-body port** (D-2689; C `trap.c:2783–2934` — restarted `export function immune_to_trap` `js/trap.js` in C order: TELEP arm now calls canonical `apply.js` `mon_has_amulet` (minvent walk, same as the inlined loop it replaces; no new module edge — `imports.mjs --can` ALREADY); POLY arm is C-exact `resists_magm(mon)` → hero HIDDEN / monster CLEARLY (replaces hero-only `Antimagic_prop`, per C "covers Antimagic for player"); ANTI_MAGIC monster arm ported (`!resists_magm && (mcan || (!attacktype AT_MAGC && !attacktype AT_BREA))` → CLEARLY, file-local `attacktype`, AT_MAGC/AT_BREA already imported); FIRE/MAGIC invent-burn walk ported via file-local `firetrap_fuel` (scroll/potion/spbook or worn-flammable, known-fire-SCR/SPE exemption with hero `dknown && game.objects oc_name_known`; hero array vs monster nobj-chain per D-2477); wired sole C caller `hack.c:2561` → `js/hack.js:1999`; named: C's two impossible() paths (null mon, default bad ttype) stay out — sync port keeps no impossible path per D-1868).

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
**`m_into_limbo` caller wiring D-2236** (export + `do.c` u_collide_m tail +
`teleport.c` u_teleport_mon engulfing arm + `vault.c` clear_fcorr occupant arm;
sync `put_lregion_here` / wallify+`gd_mv_monaway` / dog `failed_arrivals` stay named);
minliquid failed survivor `rloc` + `mnexto` failed-enexto; 
**steed Flying/Levitation gate + `engulfing_u` drown flush + `mdrop_special_objs` 
via `steal.c` `mdrop_obj` D-2197**); **`drinksink` case 10 `polyself`** (D-1118; 
C `fountain.c:680–686`; `!Unchanging` metamorphosis + `polyself(POLY_NOFLAGS)`; 
Unchanging skips You+call; youprop H||E flats+uprops; 
confer writes UNCHANGING to uprops not `EUnchanging`; 
polyself.js now runs were `do_shift`, draconian `do_merge`/uskin + `skinback`,
`POLY_REVERT`, placeholder substitutes and wizard own-role `rehumanize` (D-2262);
`made_change` hero light-source bookkeeping live (D-2583: `:497` old_light capture,
`:581` rehumanize zeroing, `:720–730` del/new via live light.js helpers); 
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
else loss pline; coins not skipped; luck via mkobj luck arms → `set_moreluck` D-2287, lamplit tail live); 
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
timeout vomiting_dialog body still named (zhitu acid_damage + grease_protect live D-2232)

### `src/detect.c` `monster_detect`

JS: `js/detect.js` — partial

**`monster_detect` live-fmon + cls + map_monst + sense + 
browse_map(TER_DETECT\|TER_MON)** (D-0370); empty strange_feeling D-1418;
**detect_wsegs D-1545**; **long-worm mndx/mnum D-1549**; sense→getpos verbose tip shares one topline, no more() between (D-2081); omit cursed wake; blessed WIN_MAP; 
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
(invent.js `hero_Antimagic` + mcastu.js reader D-2090; confer cloak-of-MR / gray DSM never writes `EAntimagic`); 
Half_spell_damage sit clone vs uprops still named; 
`update_inventory` / Hallucination `hcolor` still named on rndcurse; donning/`cancel_don`; 
`in_use`; uskin `skinback`; `Amulet_off` wired D-2529; `Ring_gone`/`Blindf_off` still setworn;
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
`splev_create_trap_coord` `get_free_room_loc` + `mktrap` tm); **D-2736 `lspo_trap` des.trap binding + `create_trap`** (`sp_lev.c:4397–4470` + `:1812–1846`; `js/mklev.js` unpacked `lspo_trap`/`create_trap` + file-local `lspo_traptype_byname`/`lspo_traptype_opt` + `LSPO_TRAPTYPES` table; string/coord-pair/triple/table dispatch, NO_TRAP throw, teledest-wins launchplace + reset, vib arm, STAIRS/LADDER retry; named: Lua argc dispatch, lcheck_param_table, nhl_push_obj count); **Kni-goal** (D-0928 #1134) + **Kni-strt/loca/fila/filb** (D-1829; Camelot
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
Tou-goal.lua:112; D-2696: `selection_recalc_bounds` C-complete in C order
(`js/mklev.js:26868`, exported — dirty guard/reset/4 scans/clear) +
dirty protocol in new/setpoint/free/clone + `region.js:1146` getbounds
wired (C `selvar.c:82`); named deferred: `l_selection_xor`,
circle (`selection_do_ellipse` + `selection_do_grow` restart shipped D-2709:
getbounds recalc/empty→full arms, copy-back gate, free; grow exported per
C `extern.h:2861`; ellipse callers `nhlsel.c:799,850` have no JS Lua bridge
yet — no dat level uses selection.circle/ellipse); `selection_clear`
shipped D-2701) + Platinum Yendorian Express Card + Kops + des.wallify();
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
Random-feature center terrain (D-2006: Buried treasure / Massacre /
Statuary fills + `make_dig_engraving` postprocess — reservoir already
listed all 15; BODIES was 12); **`lspo_level_init` → `splev_initlev`**
(D-2256; C `sp_lev.c:3834–3875` table defaults + `splev_init_present`,
`:2981–3018` dispatch, MINES `linit->icedpools` from the `:192` static set
by Val `level_flags("icedpools")`, reset per coder `:6350`; `sel_set_ter`
ICE icedpool + CLOUD `del_engr_at` live; `lvl_is_joined` omitted — no C reader);
exclusion_zones save/rest deferred;
**Garden fill + `make_garden_walls` postprocess** (D-1861; numpoints/6
asleep wood nymphs via `splev_room_monster` default-random `induced_align`,
`percent(30)` DRY `des.feature` fountain, grown-sel walls→TREE +
SDOOR-kept `arboreal_sdoor` per-cell `rn2(100)`; `cvt_sdoor_to_door` clears it);
**des-coder lifecycle** (D-2643; `sp_lev.c:6336–6376` + `:6323–6333` + `:6443–6448` + `load_special :6454–6501`): exported `sp_level_coder_init` in C-home `js/mklev.js` (coder object in C order — allow_flips 3, n_subroom 1, 6+6 room arrays, statics, prior-coder `update_croom`, container zero, invent NULL, SpLev_Map clear, level flags with hellish≡In_hell, `reset_xystart_size`); exported `update_croom` (live-coder croom track); local `create_des_coder` guard; `load_special_proto` wrapper = create-at-entry + Free+NULL `finally` over the dispatch body. Named: `alloc` (GC); load_special post-lua epilogue reads (per-loader omits stand); defensive `create_des_coder` sites in unported lspo_* writers + room/subroom `update_croom` sites (future rows));
**`set_wallprop_in_selection` family** (D-2701; `sp_lev.c:5911–5932` whole body in C order + `:986–996` `sel_set_wall_property` + `:5936–5951` `lspo_non_diggable`/`lspo_non_passwall` forwarders + `selvar.c:48–64` exported `selection_clear`, retiring the D-2696 mutating-selection_clear deferral; sel-or-nothing mirrors the C lua-arity dispatch, `wall_info` OR per C);
**`lspo_drawbridge`/`lspo_gold`/`lspo_room`/`lspo_finalize_level` entries** (D-2710; unpacked-opts `lspo_exclusion` precedent — lcheck ≡ `?? {}`, nhl_error/panic ≡ throw; drawbridge static dir/state tables, raw-coord isok, `db_open == -1 → !rn2(2)`, SpLev_Map.add; gold C argc dispatch as `(amount,x,y)/(amount,coord)/(opts?)`; room C coder bookkeeping via in-commit `splev_coder_build_room` (C `build_room`) + `spo_endroom`, contents callback for the Lua pcall; finalize async with `fromDes` ≡ C `L`, in-commit `count_level_features`, `makemap_prepost` import cycle-safe; `splev_opt_int/index/boolean` cover the `nhlua.c` table getters; `SPLEV_H_LEFT/H_RIGHT`; callers Lua-only — `wiz_load_splua` NULL arm kept, per-level inline expansions not rewired);
**`lspo_feature` entry** (D-2712; same unpacked-opts precedent — C argc dispatch as `(typeStr)/(typeStr,coord)/(typeStr,x,y)/(opts?)`, absent opts ≡ `{}` so table-form type is required; in-commit `sel_set_feature` (`:4633–4644`, EXTRA_SANITY_CHECKS arm compiled out) + `l_table_getset_feature_flag` (`:4739–4756`, `rm.h:218` `looted ≡ flags` → JS `.looted`, dead `rn2(2)` arm kept) + exact `get_table_boolean` string-index semantics (`"true"→0`, local `splev_feature_boolopt` — the shared `splev_opt_boolean` maps strings the intuitive way and was left untouched); RANDOM→DRY / explicit→ANY_LOC packing, STONE impossible kept, flag arms gated on post-set typ + table form, POOL default; callers Lua-only (`sp_lev.c:6393` des table — no JS Lua runtime, per-level inline `splev_room_feature_*`/garden expansions not rewired)
**`lspo_wall_property`/`lspo_level_flags`/`lspo_engraving` entries** (D-2713; same precedent — wall_property `:5876–5908` table-form (no-arg ≡ `{}`, non-table throws; x1.. −1 defaults, region-required fallback, map-extent gx/gy ≡ `game.splev_*`, two ANY_LOC `get_location` corners) + in-commit `set_wall_property` (`:1001–1013` clamp + y-outer loop into live `sel_set_wall_property`); level_flags `:3759–3831` rest-args ≡ Lua stack (empty/non-string/unknown throw; strcmpi ≡ one `toLowerCase`; bool→true, temperature 0/1/-1, nomongen/nodeathdrops→false, Sokoban triple alias, coder arms post-create); engraving `:3881–3936` `(opts?)`/`(coord,type,text)` dispatch (required text, degrade/guardobjects via shared `splev_feature_boolopt` raw-index nonzero→true, post-dispatch croom, unconditional guardobjects/nowipeout tail; `Free` no-op; `ENGR_BLOOD` import-added, C `MARK` ≡ `ENGRAVE_MARK` alias); callers Lua-only (`sp_lev.c:6383/6385/6407` des table — per-level `markNondig`/flag/`engr()` inline expansions not rewired)

### `src/mkroom.c` `mkshop` / `src/shknam.c` `stock_room` / `src/shk.c`

JS: `js/mklev.js`, `js/shknam.js`, `js/makemon.js`, `js/shk.js` — partial

**`mkshop` eligibility + shtypes** (D-0201); 
**`stock_room`/`shkinit` MON_AT insurance `rloc(RLOC_NOMSG)` (D-2418; async `shkinit`/`stock_room`/`fill_special_room` + 3 awaited call sites)/`mkshobj_at`/`get_shop_item`/iprobs/shknms + 
shopkeeper `m_initinv`/`rnd_misc_item`/`MM_ESHK` + tribute novel** (D-0203); 
**`shkinit` whole-body restart in C order** (D-2570; live `set_malign` + `mon_learns_traps(ALL_TRAPS)` replace the inline `mtrapseen`; DEBUG wizard block + `assign_level` inline copy + ESHK fallback named); 
**`stock_room` locked-door `"Closed for inventory"` cell via `shk.c` `inside_shop` (`edge` = outside) + `Is_special`/`in_rooms` ROOM-or-CORR rewrite** (D-1849; shknam `inside_shop` clone removed — it ignored `edge`, put the engraving in rock and made that rock ROOM, costing `mineralize` one gold cell); 
**`make_happy_shk` adjalign / `home_shk` / migrate / `make_happy_shoppers` D-1540**
(C `:1395–1435`; `kops_gone`; `pacify_guards` mon.c clone; live
`mdrop_special_objs`/`migrate_to_level`; named: full `mnearto` yank;
`after_shk_move` occupancy `check_special_room`; `losedogs` shoppers);
**`shk_move`/`move_special`/`inhishop` + m_move isshk dispatch** (D-0205); 
**`u_entered_shop` welcome + `move_update`/`ushops_entered` via `check_special_room`** (D-0307; 
**deserted/angry/surcharge/robbed/Invis + pickaxe/steed/Fast doorway `dochug` D-1080**; 
SetVoice D-1752; Soundeffect + bill_p poison + Hallu shkname D-2218); **`shkname` whole body live in C order** (D-2727; isshk save/clear + noit_mon_nam fallback `:859–863`, `!isshk` fallthrough, `!has_eshk` panic→throw, Hallu `:870–890`, strip `:892–893`; `:866` impossible message named — async, unreachable for valid input, xname_flags precedent; was export + Hallu arm only, D-0307/D-2218); 
**`paybill`/`inherits`/`money2mon`/`set_repo_loc` death loot** (D-0311; 
angry takes-all + peaceful inherit); **`shkveg`/`mkveggy_at` + HEALTHY_TIN** (D-0902); 
**Izchak minetown light-shk `nameshk` arm** (D-2234); **veggy_item obj-path tin/corpse species** (D-0994); omit wizard SHOPTYPE (nh_getenv — Rule #2, same class as the SPLEVTYPE getenv deferral); 
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
`mkshop` wizard/`ep` multi-door arm shipped D-2569 — `ep` null per the
SHOPTYPE env omit above, only doorct==1 fires); 
**BEEHIVE `fill_zoo` queen/killer + royal jelly** (D-0903); 
**COCKNEST `fill_zoo` statue + `rn2(5)` loot / ANTHOLE `antholemon`+food + BARRACKS/SWAMP `has_*`** (this D); 
**SWAMP `mkswamp`** (D-1869); `antholemon()` do_mkroom gate; `shk_fixes_damage`; holetime follow; following verbalize; 
`gd_move`/`pri_move` bodies; `after_shk_move` bill_p; unpaid leave verbalize/rob_shop; 
`addupbill` body; `clear_unpaid`/`mongone` full; `paygd`;
**`getprice` FOOD_CLASS `corpsenm_price_adj`** (D-2679; tin/egg/corpse intrinsic-conveyance table + unique +50, level/nutrition base, wired first in the arm in C order; `intrinsic_possible` exported from `js/eat.js`, `unique_corpstat`/`ismnum` live imports; review-680 named debt retired); **`cost_per_charge` whole body live `js/shk.js:3387` (caller `check_unpaid_usage` :3432 wired)**

### `src/dungeon.c` `level_difficulty` / `deepest_lev_reached`

JS: `js/hacklib.js` — ported

**`deepest_lev_reached` `:1338–1371`** (D-2572; max depth over
dunlev_ureached, noquest skips Quest; `end.js`/`topten.js` clones retired
to this import); **`level_difficulty` `:2026–2084`** (D-2572; C order:
endgame sanctum+ulevel/2, amulet → deepest(FALSE), depth + builds_up
climb, extrinsic-only aggravate double-or-50; W_tower `#if 0` compiled
out); 6 clones retired (fountain depth-only + makemon/mklev/mkobj
delegators); 29 C call sites wired (do Tourist gate fixed from depth;
`nhlua.c:961` Lua push named — no JS lua runtime); full 44 + cohort 7/7.

**`insert_branch` `:462–508`** (D-2630; C order: extract identity scan
`:469–472`, missing → throw with the C message `:474–475` per botl.js
panic precedent, unlink `:476–479` ⇔ splice; `next = null` `:481`;
`branch_val` macro `:484–487` existing helper; `prev_val = -1` `:493`,
`new_val` `:494`, guarded scan + insertAt `:495–500`, link `:501–507` ⇔
splice; `.next` stays null — no JS reader, save.js JSON-copies);
callers wired: `:534` add_branch `js/dungeon.js:355`, `:1156` fixup Knox
`js/dungeon.js:994`, `mklev.c:2655` mk_knox_portal `js/mklev.js:25247`; named: none.

**`fixup_level_locations` `:1122–1182`** (D-2683; C order with per-arm
cites: `:1132` sentinel loop, `:1133–1135` find/assign, `:1136–1141` x-
filecode stamp, `:1142–1158` Knox float via live `on_level` +
`insert_branch`, `:1164–1168` five topology dnums, `:1171–1178` dummy
depth_start via live `dunlevs_in_dungeon`; `:1179` wizwhere TODO C-open);
`LEVEL_MAP` matches `level_map[]` entry-for-entry; exported as headless pin
(C static; D-2416 precedent) — `scripts/fixup-level-locations.test.mjs`
6/6; caller `:1313` `init_dungeons` `js/dungeon.js:1176` (D-2437,
unchanged); named: `assign_level`/`dname_to_dnum` clones in
dig/do/potion (pre-existing drift).

**`query_annotation` `:2499–2567`** (D-2705; C order, staticfn stays
file-local in `js/dungeon.js:2442`: custom → Replace `%.30s` prompt else
this-level/`describe_level` (dflgs 0/2, whole-`u.uz` swap — `d_level` is
`{ dnum, dlevel }`), live `strsubst` + new `trimspaces` (`js/hacklib.js:340`,
`:162–176` space/tab-only; C void-discards the return — identical since
`describe_level` never emits leading space/tab), first-char ESC check,
live `mungspaces`, free→null/0, `dupstr`→assign idiom;
`scripts/trimspaces.test.mjs` 5/5); callers wired: `:2575` donamelevel
`js/dungeon.js:2513`, `:3336` show_overview `js/dungeon.js:2554`; named:
EDIT_GETLIN `#ifdef` dead (`config.h:655`, D-1624), `dupstr` alloc.

**`u_on_newpos` `:1568–1601`** (D-2756; whole body in C order in
`js/mklev.js`: isok, panic-vs-impossible, ux/uy, cliparound, uundetected,
steed share, `!on_level` map_location + `terrain_typ = MAX_TYPE` else
see_nearby_objects, earth_sense). Callers wired at every C site (do.c
u_collide_m / goto_level, dothrow hurtle_step / mhurtle_step, hack.c
domove swallow + re-position, mkmaze put_lregion_here / mv_bubble,
monmove engulf, stairs u_on_s/up/dnstairs, teleport teleds / rloc_to,
trap move_into_trap). Named: `panic()` NORETURN (no JS panic; off-map
throws and does not place). `switch_terrain` in the function is a
comment, not a call. `moveloop_preamble` copies `uz0.dlevel = uz.dlevel`
(`allmain.c:97`) so the same-level arm runs after the opening
placement; `u_init` leaves `uz0.dlevel` at 0.

### `src/options.c` saveoptions writer

JS: `js/options.js` — partial ([campaign 5/7])

**`optfn_petattr` / `handler_petattr` live** (D-2792: `options.c:3138–3194` and `:6152–6164` in C order in `js/options.js` — do_init optn_ok, do_set via live `string_for_opt` / `bad_negation` / `match_str2attr` (complain FALSE) / `config_error_add`, negated-empty stores wintype `ATR_NONE`, success sets `wc_hilite_pet` from `wc2_petattr != ATR_NONE` and `opt_need_redraw` outside init; get_val and get_cnf_val via live `attr2attrname` on tty; do_handler async as `handler_petattr` → `query_attr`). allopt idx 129 `optfn` wired. Callers: no direct C call (NHOPTC, optlist.h `:568`); `parseoptions :637` and `get_option_value :8496` via existing `if (optfn)` arms; `allopt_array_init :7428` do_init plus `parseNethackrc` do_init; parseNethackrc valued and valueless do_set (negated skipped, negateok-No); doset `:8935` via `doset_optfn_do_handler` and the value column. Unset field reads as wintype `ATR_INVERSE` (`initoptions :7264` is not a JS function) so the doset column stays `inverse`. `display.js` `petattr_to_tty` (D-2799, D-2810) maps the wintype enum onto the terminal bitfield the way `s_atr2str` (`termcap.c:1339–1376`) does on the ANSI default tty (`:157–160`, `ZH`/`MB`/`MD`/`MH` null): none → 0, bold → `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1), italic → underline (`:1343–1356`), blink → bold (`:1349–1364`), dim → 0 (`:1370–1374`). Unset still reads as inverse (`initoptions :7264`). The hilite_pet enable arm (`options.c:5307`) stores 7. Named: `config_error_add` / `bad_negation` sinks; non-tty `#else` (`:3165`) compiled out.

**`optfn_disclose` / `handler_disclose` live** (D-2788: `options.c:1442–1560` and `:5674–5777` in C order in `js/options.js` — do_init optn_ok, do_set via live `string_for_opt` / `bad_negation` / `lowc`, all/none/negated-empty fill, prefix walk that leaves unspecified categories, k→v and d→o, get_val and get_cnf_val via live `strkitten` (`hacklib.c:275` in `js/hacklib.js`); do_handler async as `handler_disclose` PICK_ANY then PICK_ONE). allopt idx 45 `optfn` wired. Callers: no direct C call (NHOPTC function pointer, optlist.h `:284`); `parseoptions :637` and `get_option_value :8496` via existing `if (optfn)` arms (`js/options.js:6481` / `:6550`); `allopt_array_init :7428` do_init (`:6305`); parseNethackrc valued `:2540` and valueless `:2687` on `result.flags`; doset `:8935` via `doset_optfn_do_handler :1872` and the value column `:5412`. Named: `config_error_add` / `bad_negation` sinks (no-op); `n > 1` second-pick folded into `select_menu_pick_one`; menu glyph columns (`nul_glyphinfo`).

**`all_options_strbuf` whole-body port** (D-2544; D-2547: BoolOpt obsolete-skip + CompOpt setwhere-gate `break`→`continue` (C `:9697–9698`/`:9704–9706` switch-break = skip entry); `options.c:9678–9748` in C order: epoch header via live `yyyymmddhhmmss`, allopt BoolOpt/CompOpt/OthrOpt loop over the 217-row registry, cond guard at index 215, key-binds/symsets/menucolors/msgtypes/apes/autocomplete arms, WIZKIT tail via live `game.wizkit`); live: `strbuf_*` (`strutil.c`, plain-string booking), `msgtype2name` + `all_options_msgtypes` (`gp.plinemsg_types`), `all_options_menucolors` (oldest-first reverse like C), `all_options_apes` (no producer — always empty), `all_options_autocomplete` (no ADJ dirty-bits — empty), `savedsym_strbuf` (empty `savedSymbols`); **allopt table + `get_option_value` live** (D-2548: unix OPTCOUNT 217 rows in C order with idx, `opt_set_in_config` sized 217 all-false, request/optn consts); **`all_options_conds` + `opt_next_cond` live** (D-2549: `options.c:9551–9591` in C order with `:line` cites — OPTIONS= open, 75-col backslash wrap + 8-space indent, comma/gotone append, strcmp final; `botl.c:1456–1490` callee exported from `js/botl.js` reading live `condtests`, outbuf+boolean folded to null/''/token; parent `:9729` guard wired, dormant on `opt_set_in_config[215]` false); campaign complete [1/7]–[7/7] (D-2553): caller `do_write_config_file` live (`cfgfiles.c:169–210` in C order in `js/cfgfiles.js` — empty-configfile pline, suppress_alert/FEATURE_NOTICE_VER(3,7,0) warnings + tty_wait_synch pacing, %.*s overwrite truncate, paranoid_query gate, VFS write for fopen/fwrite/fclose, partial-write pline unrepresentable via atomic VFS; `cmd.c:1843` wired via getline.js EXT_CMDS + generated extcmdlist row); **`all_options_statushilites` live** (D-2552: `botl.c:4477–4495` writer in C order with `:line` cites — done/gather bracket, 230-char `%.*s` slice, closing done; `botl.c` store + chain in C order — `condition_aliases` `:749`, `split_clridx` `:2576`, `conditionbitmask2str` `:3141`, `hlattr2attrname` `:3369`, linestr store/add `:3403–3445`, done `:3448`, countfield `:3462`, gather_conditions `:3488`, gather `:3570`, `status_hilite2str` `:3590`; done+gather exported like opt_next_cond with head folded into gather's return; `stripchars` live in hacklib.js; parent `:9741` wired, dormant on empty store); `count_status_hilites` `:3477` named (doset row); allopt optfn null except the 13 shared_menu_optfn-family rows (D-2651 — CompOpt arm live for those); 18 BoolOpt addr null (no live JS field); `nhl_get_config` lua caller unported; config writers (`:640` parseoptions, `:5010` pfxfn_cond_, `:8438` optfn_o_status_cond, `:8670`/`:8940` doset) + `allopt_array_init` (`:7405` memcpy/initval/do_init) with config/doset scope; `all_options_palette` compiled out (CHANGE_COLOR off for tty) — no row; the AUTOCOMPLETE= option setter (`cmd.c:3260–3290`) + `count_autocompletions` (`:3312–3322`) travel with the future autocomplete-option row, not this family; **`parsesymbols` producer live** (D-2551: `symbols.c:773–848` in C order — comma tail-first recursion on a shared char array, S_/G_ gates, `match_sym` `:852–901` returning { range, idx, name } off the regenerated `[range, idx, name]` LOADSYMS triple, `sym_val` + file-local `escapes`, `savedsym_add`/`savedsym_free` onto `savedSymbols`; `cfgfiles` `:1193`/`:1204` wired as top-level SYMBOLS=/ROGUESYMBOLS= arms + `options.c:663` as the OPTIONS S_ fallback with live `check_gold_symbol`); named omits: `match_glyph` + `glyphrep_to_custom_map_entries` customization path, `switch_symbols` application at the callers, `config_error_add` sink; **`parseoptions` live** (D-2561: `options.c:489–691` in C order — comma tail-first recursion, BUFSZ/2 + blank/empty gates, `!`/`no`/`no-` negation fold, value-strip, pfx (`cond_`,`font`; `IBM_` MICRO-only) + minmatch name loop with the `:588` ambiguous break, 14-row alias loop, in_parseoptions bracket (the `:628` bad-negation early return leaks the counter like C), optfn dispatch dormant (all null), S_ fallback live via `parsesymbols` + `check_gold_symbol`, pfx-suffix/unknown gates; file-local `length_without_val` `:6739`, `bad_negation` `:6693`, `determine_ambiguities` `:6703` (lazy-once; JS has no sentinel so all 217 rows covered), `duplicate_opt_detection` `:6782`, `complain_about_duplicate` `:6790`; exported `match_optname` `:6760` (C global; ci-compare via live `lowc`, no new strncmpi), `reset_duplicate_opt_detection` `:6773`, `config_unmatched_ignored` + setter/clearer (`cfgfiles.c:2014–2026`); optlist.h n/d/pfx/al columns as exception sets — 64 negateok-No, 22 dupeok-Yes, 14 aliases — cc -E probe, JS row order verified identical; D-2566 adds the missing `travel_debug` non-DEBUG negateok-No row `optlist.h:794–796`); named omits: `config_error_add` sink (6 sites), `switch_symbols` application, disregard/heed setters; callers: recursion wired, `cnf_line_OPTIONS`/`rcfile`/doset family/`handler_pickup_types`/`toggle_bool_option` named (JS hand-rolled counterparts or unported optfns); **`cond_menu` live** (D-2635: `botl.c:1376–1454` in C order in `js/botl.js` — file-local `cond_cmp` `:1332` ranking+alpha / `menualpha_cmp` `:1344` comparators, sort-change row a_int 1 + 'S' + SKIPINVERT, `cond_%-14s` rows preselected iff enabled, PICK_ANY via live `select_menu_pick_any` with cancelValue -1, leftover-idx test clear `:1449`, disp.botl on both flags; caller `options.c:8437` wired in doset othrPicks with PFX_COND_IDX mark; `:5032` pfxfn_cond_ do_handler dead in C — no site); **`shared_menu_optfn` family live** (D-2651: `options.c:2052–2074` in C order — do_init no-op, do_set resolve-then-delegate, get_val `(to be done)` via `to_be_done :125`, get_cnf_val clear; file-local `check_misc_menu_command :694–706` over live `default_menu_cmd_info` via live `match_optname`, file-local `spcfn_misc_menu_cmd :5452–5476` via live `string_for_opt`/`txt2key`/`bad_negation`, file-local `illegal_menu_cmd_key :8037–8057` with inline digit/letter (hacklib.c `:62–72`, '@'-is-letter kept) over `def_oc_syms` (objects.js edge, same module), exported `add_menu_cmd_alias :8080–8097` (extern.h:2317) onto `game.mappedMenu` read by live `mapped_menu_strings`/`get_menu_cmd_key`, file-local `set_optbuf` holder for C char*-out params; 13 exported `optfn_menu_* :2077–2177` forwarders wired as the 13 allopt CompOpt optfns — `menu_headings :2183`/`menu_objsyms :2225` keep null (separate optfns, own rows); `get_option_value` CompOpt arm now passes a `{ buf }` holder (C static retbuf `:8485`); the `:649–659` parseoptions call site is `#if 0` dead in C — no site; the `:7658–7662` C `parsebindings` menu-command arm travels with the future BINDINGS row, not this family); named omits: `config_error_add` sink (+4 sites: both `illegal_menu_cmd_key` arms, `bad_negation` inside `spcfn`, `string_for_opt` missing-parameter), remaining unported optfn_*/pfxfn_* families; **`optfn_msg_window`/`handler_paranoid_confirmation`/`optfn_symset`/`handler_versinfo`/`warning_opts` whole-body ports** (D-2765: `options.c:2455–2520` + `:5831–5890` handler, `:5952–6008`, `:4166–4236`, `:6572–6617` + caller `:4471–4534`, `:7520–7538` + `:6682–6690`/`:6811–6820`/`:7540–7548` + caller `:4681–4700`, in C order in `js/options.js` with `:line` cites — msgwind/paranoia/known_handling tables, PICK_ONE/PICK_ANY menus via the live select helpers with prompts as header rows, bad_negation stub called, PREV_MSGS=1/curses-false/RELEASED sides live with compiled-out sides kept as conditions or named; 4 allopt rows wired, parseNethackrc msg_window ×2 + symset sites rewired, get_option_value serves the 4); named omits: `config_error_add` sink (+8 sites), symset file subsystem (`read_symset`/switch/`handler_symset`→`do_symset` browser), swim 'm'-substitution (`cmd_from_func`/`cmdname_from_func`), `optfn_paranoid_confirmation` caller + doset compound dispatch for the 3 menu handlers, MICRO `rejectoption` arm, gw.warnsyms readers, stale const.js:2896 known_handling; **doset do_handler dispatch live** (D-2773: `doset :8935–8939` → `doset_optfn_do_handler` = do_handler arms `:2516–2518`/`:3039–3041`/`:4511–4516`+`:4530`, `opt_set_in_config` on optn_ok; msg_window/versinfo/paranoid value column via REQ_GET_VAL incl. `optfn_paranoid_confirmation` get_val `:3021–3037`; `flags.versinfo` default per recorder `options.c:7174`); still named: `optfn_paranoid_confirmation` do_set parser `:2837–3020` (allopt optfn null), `opt_set_in_config` marking for the full-doset pickup_types/perminv_mode handler arms (simple-menu arms went live in D-2781); **menu_objsyms live** (D-2774: `handler_menu_objsyms :5794–5829`, `optfn_menu_objsyms :2224–2287`, `set_menuobjsyms_flags :7443–7451`, `objsymvals :273–280`; allopt row optfn wired (supersedes the D-2651 "keep null" note for menu_objsyms), doset row get_val + handler, parseNethackrc do_init + valued/boolean/alias do_set; D-2782: valueless rc site passes case-preserved `stripped` so `:2249` strncmp stays case-sensitive); named: `config_error_add` Illegal-parameter sink, menu glyph columns, `n > 1` disambiguation folded into the pick-one helper; **whatis_coord live** (D-2775: `handler_whatis_coord :6205–6276`, `optfn_whatis_coord :4702–4745`, init `:7190` GPCOORDS_NONE; allopt row optfn wired, doset row get_val + handler via `doset_optfn_do_handler`, parseNethackrc valued/boolean do_set on `iflags.getpos_coords`); named: `config_error_add` Unknown-parameter sink, menu glyph columns, `pick_cnt > 1` disambiguation folded into the pick-one helper; **number_pad live** (D-2778: `handler_number_pad :5893–5950`, `optfn_number_pad :2574–2645`; allopt row optfn wired, doset row get_val + handler via `doset_optfn_do_handler`, doset_simple hasHandler wired, parseNethackrc valued/valueless do_set with negated skipped per `:626` negateok-No, simple display delegates to live get_val; init `:7158` all-FALSE ≡ falsy-unset, no code); named: `reset_commands` (`cmd.c:3344–3476`, own coverage row — get_val derives the `:2629–2632` index from iflags via the `:3377`/`:3384`/`:3397`/`:3416` sync mapping until it ports), `number_pad()` tty platform no-op (`winprocs.h:161`), `config_error_add` Illegal-parameter sink, menu glyph columns. **`optfn_sortvanquished` live** (D-2784: `options.c:3958–4010` in C order — do_init VANQ_MLVL_MNDX, do_set via live `string_for_env_opt` (`:6682`) with `tdaACcnz`/`0`–`7`, negation resets to mode 0, unknown → live `config_error_add` + optn_silenterr, empty → optn_err, get_val `"key: short"` / get_cnf_val key from exported `vanqorders` (`insight.c:2601`); do_handler `:3997–4008` async as `optfn_sortvanquished_do_handler` because `set_vanq_order` + `pline` await). Callers: allopt optfn `optlist.h:690` → `js/options.js` row idx 165; `parseoptions :637` optfn dispatch; `get_option_value :8496`; `allopt_array_init :7428` do_init copied onto the rc flags bag (jsmain replaces `game.flags`); parseNethackrc valued + valueless do_set; doset `:8935` via `doset_optfn_do_handler` and doset_simple hasHandler via `doset_compound_via_getlin`; doset value column via get_val. Named: `config_error_add` message text (sink is a no-op); `eos` is string concat. **`optfn_soundlib` live** (D-2785: `options.c:3824–3860` in C order — do_init optn_ok, do_set via live `string_for_env_opt` (`:6682`), `get_soundlib_name` (`sounds.c:1863–1880`) then `soundlib_id_from_opt` (`:1882–1895`) then `assign_soundlib` (`:1797–1805`); get_val and get_cnf_val copy the active name. Contest table is nosound only (`sounds.c:1726–1776`, no `SND_LIB_*`). Helpers live in `js/options.js` because `js/sounds.js` already imports this module. allopt row idx 166 `optfn` wired; `parseoptions :637` and `get_option_value :8496` via the existing `if (optfn)` arms; `allopt_array_init :7428` do_init from `parseNethackrc`; rc valued and valueless do_set with negated skipped per `:626` negateok-No; doset set_gameview column via get_val. Named: `activate_chosen_soundlib` (`sounds.c:1778–1795`, already named at `allmain.c:703`); unixmain `assign_soundlib` (`unixmain.c:116`) compiled out (`SND_LIB_INTEGRATED`); `#if 0` `choose_soundlib`; `config_error_add` sink. **`optfn_gender` / `optfn_race` / `optfn_role` / `optfn_alignment` live** (D-2786: `options.c:1777–1812`, `:3507–3542`, `:3589–3624`, `:885–919` in C order — do_init optn_ok, do_set via `parse_role_opt` `:7904–8016`, positive `str2*` into `flags.init*` plus female / `gp.pl_race` / `nmcpy(pl_character)`, `saveoptstr` `:757–772` of `rolestring` `:72–73`, get_val `rolestring`, get_cnf_val `get_cnf_role_opt` `:8019–8033` or literal `"none"`). Helpers in `js/options.js`: `opt2roleopt` `:714–730`, `getoptstr` `:733–754`, module `roleoptvals`. `rolefilterstring` `:1316–1355` plus existing `clearrolefilter` / `setrolefilter` exported from `js/player_selection.js` (one `rfilter`). allopt idx 3–6 `optfn` wired; `parseoptions :635` and `get_option_value :8496` via the existing `if (optfn)` arms; `allopt_array_init :7428` do_init from `parseNethackrc`; rc valued and valueless do_set (`align` alias included; D-2791: `rc_do_set_role_family` sets `duplicateOpt` from `duplicate_opt_detection` (`options.c:621`, `cnf_line_OPTIONS` TRUE/TRUE) before the optfn, and `OPTN_SILENTERR` does not write the rc bag; `parseNethackrc` clears `dupdetected` like `read_config_file :1633`); doset set_gameview column via get_val (unset `init*` reads as BSS 0). rc still stores the raw spelling for `init_role_flags_from_rc` when the optfn does not return `optn_silenterr`. `rolefilterstring` returns `&outbuf[1]` so a filter starts with `!` (D-2791; a pre-seeded space left ` *preval != '!'`). Named: `config_error_add` sink; `complain_about_duplicate` sink; roleoptvals save/restore pair is not a callee of these optfns.

