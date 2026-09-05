# C→JS map — Turns, commands, and display

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Turns, commands, and display

Each entry is `C → JS — status`, then evidence (one map entry, wrapped).

### `src/allmain.c`

JS: `js/allmain.js` — partial

Basic move loop and hunger/sound subsets; 
**`hero_seq = moves<<3` on EOT + `hero_seq++` once-per-hero-took-time** (D-0738; 
stethoscope free/TIME); **`moveloop_preamble` `set_wear(NULL)` after rndencode** (D-0596); 
**`beyond_savefile_load=1` new-game `:71` + restore `try_restore_save` `:942` D-1603**
(TTY_PERM_INVENT gate for `sync_perminvent`; `:107–110` `iflags.perm_invent`
`update_inventory`; preamble(true) does not store — C `dorecover` does;
tty WIN_INVEN `#perminv`/assesstty D-1642; create at `allmain.c:726` named); 
**`amulet_wish` once-per-input → `makewish`** (D-0559); 
**once-per-input `see_monsters` when Unblind_telepat/Warning/Hallu/Warn_of_mon/`any_visible_region`** (D-0672/D-1493/D-1512; 
**timeout `visible_region_summary` D-1527**; **display `show_region` D-1528**); **`encumber_msg` + 
`mvl_wtcap=near_capacity()` after monsters before EOT arm** (D-0411); 
**`u_calc_moveamt` Fast/Very_fast `rn2(3)`** (D-0058; 
@10966 after_calc theory falsified — D-0412 was travel boulder); 
**SLT `u_calc_moveamt` +9 cycle clean**; **rottenfood non-faint→occupation** (D-0443 fixed; 
was false early hero move); **`nh_timeout` before regen_hp — luck
baseluck + `stone_luck` / carrying(LUCKSTONE) (D-1792; C `timeout.c:597–621`
still runs when `uinvulnerable`); Stoned/Slimed/Vomiting/Strangled/Sick/
HLevitation/HPasses_walls dialogues before uprops `--` (D-1792; callees
`stoned_dialogue` `:136`, `slime_dialogue` `:388`, `vomiting_dialogue` `:196`,
`choke_dialogue` `:294`, `sickness_dialogue` `:322`, `levitation_dialogue`
`:352`, `phaze_dialogue` `:533`, `eat.c` `Popeye` `:3915`); 
WOUNDED_LEGS → `heal_legs(0)` + 
CONFUSION → `make_confused(0,TRUE)` + FUMBLING → `slip_or_trip`/`rn2(4)`/`incr_itimeout(rnd(20))` + 
`run_timers`** (D-0403/D-0405/D-0441/D-0692; **`slip_or_trip` keeps `objects_at` import** (D-0980; 
D-0978 drop regressed seed0014); **DEAF TIMEOUT → make_deaf(0)** (D-0911; **single-field `HDeaf` ≡
`uprops[DEAF].intrinsic` + skip DEAF in `sync_timeout_flats` + Unaware
talk D-1817**; C `timeout.c:752` / `wizcmds.c:1029`); **FAST TIMEOUT → Very_fast clear + slow-down You_feel** (D-0919); 
**DETECT_MONSTERS TIMEOUT → `see_monsters` (D-1418)**; 
**LEVITATION TIMEOUT → `float_down(I_SPECIAL|TIMEOUT)` (D-1419)**; 
**BLINDED TIMEOUT → make_blinded(0)+learn_unseen_invent** (D-0928 #1098); 
**remaining `u.uprops` TIMEOUT generic `--` (INVULNERABLE etc.; 
dedicated arms skipped)** (D-0928 #1168; expiry switch STONED/HALLUC/INVIS/… still silent); 
**`u.uinvulnerable` early-return freezes all TIMEOUT** (D-0928 #1171); 
**`#wizintrinsic` BLINDED → `make_blinded(newtimeout)` + HBlinded↔uprops sync** (D-0928 #1171); 
STUNNED/HALLUC/… expiry msgs / `region_dialogue` / `sleep_dialogue` / STONED·SLIMED
`done_timeout`/`slimed_to_death` / Glib / run_regions inside_f D-1146 / hero_inside bit D-1169 / expire 
dissipation D-1155 / surface() Underwater bottom named; 
ice hurtle/mount dismount / REVIVE/ZOMBIFY/burn deferred); 
**`exerper` encumbrance + every-5 Wounded_legs/`Fumbling()`≡H\|\|E/`HStun` DEX abuse + 
Confusion≡`HConfusion` / Hallucination≡`HHallucination&&!res` WIS abuse** 
(D-0401/D-0441/D-0689/D-0835; Clairvoyant/Regen/Monk fasting deferred; 
other `u.Fumbling` boolean sites still incomplete); 
**`exerchk` `next_attrib_check=600` + `rn2(AVAL)` resolve/`rn1(200,800)` reschedule + 
exercise Upolyd gate** (D-0449; `encumber_msg` after STR/CON exercise + Fixed_abil/Dunce deferred); 
**`seer_turn` `rn1(31,15)` once-per-hero after umovement loop** (D-0446; was wrongly in EOT; 
`do_vicinity_map` callee D-1391, allmain seer_turn caller / lava/pool once-per-hero still named); 
**`newgame` wizard `read_wizkit`+`obj_delivery(FALSE)`** (D-1192; VFS `WIZKIT=`; 
getenv/HOME/`wish_history`/`config_error`/`option_help` WIZKIT still named; 
**`newgame` `init_artifacts`/`hack_artifacts`** (D-1201; save/rest `restore_artifacts` named); 
**`newgame` `notice_mon_off`/`on` + `notice_all_mons(TRUE)` after welcome** (D-1200; 
**glyph_updates then-arm `dolookaround` D-1217**; 
`reset_glyphmap` / vision_recalc caller / mapping / wizcmds / save / `spot_monsters` wiring still 
named)); **`mvitals.mvflags = geno & G_NOCORPSE` at newgame** (D-0057); 
**`maybe_generate_rnd_mon` → real `makemon(NULL,0,0)`** (D-0034) + 
**udemigod/stronghold depth rate 25/50/70** (D-0753); **`regen_hp` + once-per-turn call** (D-0035); 
**Searching EOT → `dosearch0(1)`** (D-0062); 
**`multi < 0` occupation + `unmul`/`afternmv` + 
`unmul`→`deferred_goto` when utotype** (D-0066/D-0719); 
**`go.occupation` tick before rhack** (D-0076); 
**`welcome` enter-dungeon `livelog_printf`** (D-0124); 
**`await dosounds` vault `You_hear`** (D-0204/D-0298); 
**fountain/sink `You_hear` msg tables** (D-0303); **shop `You_hear` `shop_msg`** (D-0306); 
**`mcalcdistress` before EOT movement reallocation** (D-0257); 
**`await invault()` after exerchk** (D-0374); 
**`stop_occupation` + occupation `monster_nearby` interrupt** (D-0392; 
`maybe_finished_meal`/`reset_eat` deferred); omit steed `mcalcmove` path; 
full FROMFORM `set_uasmon` (basic `youmonst.data` in u_init D-0411); 
**`regen_pw` once-per-turn** (D-0910); **Teleportation/Polymorph/ulycn once-per-turn → 
`tele`/`polyself`/`you_were` + `mvl_change`** (D-1002; CQ_REPEAT queue still thin); 
**`next_to_u`/`check_leash`/`use_leash` LEASH cluster** (D-1005); 
**`warnreveal` + encumber-move `overexert_hp` + Upolyd eel `regen_hp` rn2(mh)/rn2(8)** (D-1003); 
swamp You1 / barracks/court `dosounds` `You_hear`; `u_entered_shop` / `ushops_entered` welcome; 
allmain **`moveloop` EOT `Is_waterlevel||Is_airlevel` `movebubbles` else `flags.fumaroles` 
`fumaroles` (D-1168; callee D-1156)**; **once-per-input `m_everyturn_effect(&youmonst)` fog at 
`u.ux` (D-1175; callee `monmove.c`)**; **`Glib` `glibr` before `nh_timeout` + `were_changes` 
`set_uasmon` + `mkot_trap_warn` + `do_storms` after `dosounds` + SAFERHANGUP 
`end_of_input`/`rhack` `done_hup` (D-1801; `timeout.c:1846` / `do_wear.c:2527` / 
`artifact.c:2752`+`count_surround_traps:2707` / `cmd.c:5182`; `buzz`/`dobuzz` lightning 
named; `fingers_or_gloves` exported)**; udemigod `intervene` / `amulet()` still named; 
**`moveloop` EOT `u_wipe_engr(rnd(3))` DEX `!rn2(40+ACURR(A_DEX)*3)` D-1372** (callee D-1051; 
dokick(2) D-1360; uhitm do_attack(3) D-1373; dothrow/dig still named); 
**`moveloop_core` `sanity_check` D-1664** (`allmain.c:197–198` `iflags.sanity_check\|\|debug_fuzzer` 
before `context.move`; opt_in Off; callee `wizcmds.c`; **`dobjsfree` D-1743**
`allmain.c:192`; **SAFERHANGUP `end_of_input` D-1801** `allmain.c:181–184`; 
bypasses / resume_wish named)

### `src/wizcmds.c`

JS: `js/wizcmds.js` — partial

**`sanity_check` + `you_sanity_check` gold/invlet D-1664** (`:1459–1481` / `:1401–1441`; 
`check_invent_gold("invent")` live D-1641; `sanity_no_check` ^P CMD_INSANE; 
`in_sanity_check` for `impossible`; swallow/overlay/HP-Pw clamps); 
**`#wizintrinsic` BLINDED `make_blinded`** (D-0928 #1171); **`#wizintrinsic`
DEAF `make_deaf(newtimeout, TRUE)`** (D-1817; C `wizcmds.c:1029`; not
generic Timeout pline); **`#levelchange`** (D-1203/D-0061); 
wiz_wish / wiz_genesis / wiz_level_tele / wiz_map / wiz_identify / wiz_makemap live. 
Named: `check_wornmask_slots`; obj/timer/mon/light/bc/trap/engraving/`levl_sanity_check`; 
optfn_boolean `sanity_check` OPTIONS=; `doredraw` body; wizweight;
count-prefix `#wizintrinsic`; sick/slimed/stoned/stunned/vomiting/glib
special arms.

### `src/detect.c` `dosearch0`/`findit`/`do_mapping`/`reveal_terrain` + `cmd.c` `doterrain`

JS: `js/detect.js` — partial

**8-neighbour SDOOR/SCORR/trap find + fund (lenses)** + `find_trap` message (D-0062); 
**`findit`/`findone` SDOOR/SCORR/unseen traps + hero `do_clear_area`** (D-0074) +
**`sense_trap` Hallu/cursed GOLD/`random_object` quan + `display_trap_map` /
`detect_obj_traps` / `trap_detect` strange_feeling** (D-1753;
`findone` trap/door/chest `sense_trap`; `level.traps` as `ftrap`) +
**`findone` `flash_glyph_at`/`foundone` + mimic/hider/invis tail**
(D-1775; `display.c` `flash_glyph_at` `:1304–1321` live in
`js/display.js` with `invisible_glyph_cell`; `foundone` `:1607–1634`
seenv SVALL + `COULD_SEE|IN_SIGHT` viz pulse around `newsym`;
SDOOR `recalc_block_point` vs SCORR `unblock_point`;
`M_AP_TYPE`→`seemimic`, `is_hider`/`hides_under`/S_EEL→`mundetected=0`;
`map_invisible` / `num_kept_invis` / `unmap_invisible` use D-1774
`memory_glyph_is_invisible`; `findit` detect/paranoid message tail;
**`do_clear_area` is one async export in `js/vision.js` D-1785**
(C `vision.c:2106–2148`; the `detect.js` clone is gone, `openit` passes
`openone` itself again so `detect.c` `detecting` `:1927–1932` can set
`override_vision` on the water/air levels where vision stops but
detection should not); FOUND_FLASH_COUNT==0 `tmp_at`/`--More--` path
still named); 
**`gold_detect` blessed GOLD/`o_in` COIN + `clear_stale_map`/`check_map_spot` +
mon/floor/`rnd(10)` golem map + strange_feeling poor/worried/steed** (D-1773;
caller `seffect_gold_detection`; `o_in`/`o_material` exported; steal.c
`findgold` live; object_detect `clear_stale_map` caller still named); 
**`food_detect` D-1781** (C `detect.c:478–594`; caller `read.c`
`seffect_food_detection` `:2045–2053`, dispatch `seffects` `:2252–2253`
**SCR_FOOD_DETECTION + SPE_DETECT_FOOD** — was the "not implemented"
default. Confused **or cursed** swaps FOOD_CLASS→POTION_CLASS and
"food"→"something"; `ctu` counts matches at the hero's spot and `ct`
elsewhere, and C's monster loop runs only while `(!ct || !ctu)`;
nothing-found returns `!stale` so `strange_feeling` useups the scroll,
and `gk.known` is `stale && !confused` there but TRUE in both other
arms. Blessed sets `u.uedibility` and picks "starts"/"continues" to
tingle; C's `flags.beginner = FALSE` around `strange_feeling` is
deliberate (force the custom message). Map arm: cls + `unconstrain_map`
+ `map_object` per floor match and one per monster inventory, `TER_MON`
added when `!ctu`, then `browse_map(TER_DETECT|TER_OBJ[|TER_MON])` +
`map_redisplay`. Live `js/detect.js` `food_detect` export (out-param
stands in for C's `gk.known` global) + `js/read.js`
`seffect_food_detection`. **`#cast` `SPE_DETECT_FOOD` → `seffects(pseudo)`
D-1788** (C `spell.c:1517–1531` skilled bless FALLTHROUGH; helper was
D-1781). Named: `u.uedibility` consumers —
`eat.c` `doeat` `:2834` `edibility_prompts` and `insight.c:1562`
enlightenment — are not ported, so the flag is set but never read;
remaining scroll-duplicate `#cast` otyps REMOVE_CURSE / CONFUSE_MONSTER /
CAUSE_FEAR / IDENTIFY / CHARM_MONSTER still named); 
**`do_mapping`/`show_map_spot` hero_memory + `magic_map_background`** (D-0075) + 
**`show_map_spot` tseen → `map_trap(t,1)` not `newsym`** (D-0814) + 
**`show_map_spot` `engr_at` → `map_engraving` when !furniture && !tseen trap** (D-0928 #1158; 
oldglyph trap/object restore still deferred); 
**`#terrain`/`doterrain` View which? PICK_ONE + Esc + 
partial `reveal_terrain`/`browse_map`** (D-0128); **DEL `\177` binds `doterrain`** (D-0341); 
**`reveal_terrain_getglyph`/`show_glyph` TER_MAP strip mon/obj** (D-0342); 
**`dosearch`→`cmd_safety_prevention`** (D-0228); 
**SCORR/SDOOR uncover → `recalc_block_point` not `vision_recalc(1)`** (D-0269); 
**`reveal_terrain_getglyph` TER_MAP trap strip + keep_traps trap_to_glyph** (D-0465; 
`display.js` kind=trap / `glyph_is_trap_at`); 
**`mfind0` mimic/hider/unseen reveal + `exercise(A_WIS)`** (D-0928 #1115; 
set_msg_xy / via_warning flush deferred); 
**`dosearch0` Blind/`visible_region_at` → `feel_location` + 
SDOOR `feel_location` / SCORR `feel_newsym` + `!Blind` `unmap_invisible`** (D-0928 #1184; 
prop Blind not sticky); omit Hallucination/cls wait, activate_statue_trap, artifact SPFX_SEARCH; 
findone FOUND_FLASH_COUNT==0 tmp_at path (D-1775 ported the flash/foundone/mimic/hider/invis tail); region/gascloud; M_AP_FURNITURE; 
unconstrain underwater/buried/swallow (display_trap_map unconstrain+reconstrain D-1753); wiz_map_levltyp/legend; 
oldglyph trap/object restore after furniture; **`do_vicinity_map` clairvoyance 9×5 (D-1391; 
SPE_CLAIRVOYANCE caller; unconstrain/reconstrain in this callee; allmain seer_turn still named)**; 
**`object_detect` D-1417 + D-1782** (C `detect.c:602–789`; caller
`peffect_object_detection`; **D-1782** added the `clear_stale_map`
gate — C's `if (!clear_stale_map(!class ? ALL_CLASSES : class, 0) && !ct)`
so a stale map redraws even with nothing found, and `ctu` then splits
"lack of something" (return 1) from "You sense ... nearby" (return 0) —
plus `o_in` container search instead of a raw `oclass` compare, the
buried chain, monster `minvent` (C counts *every* match, then a cursed
mimic or any gold adds one and breaks), the steed stale-coord fixup,
`unconstrain_map`, the boulder dual-class via
`showsyms[SYM_BOULDER]` → ROCK_CLASS + "and/or large stones",
`def_oc_syms[class].name` / Hallu·Confusion "something",
override-order mapping (buried, then floor, then minvent, then the
cursed-mimic `M_AP_OBJECT` stand-in or `findgold` gold whose
**`rnd(10)`** quan is a real draw), and the
`glyph_is_object(glyph_at(u.ux,u.uy))` → `newsym` + `TER_MON` arm.
Named: `display_nhwindow(WIN_MAP)` for the absence case is a flush
(the local `observe_recursively` already recurses `cobj`/`nobj` — do
not re-enqueue it); leftover map text that said "stops at top" was
false;
gold_detect is D-1773)**; 
**`monster_detect` empty+otmp `strange_feeling` threatened / hallu heebie jeebies (D-1418; 
caller `peffect_monster_detection`; **`detect_wsegs` D-1545** via `map_monst` 
showtail; cursed wake / blessed WIN_MAP / pet_to_glyph still named)**; 
**`warnreveal`+`mfind0` via_warning** (D-1003; set_msg_xy/display_nhwindow flush still thin); 
arboreal default tree; **`premap_detect` + `skip_premap_detect` for Sokoban** (D-0567; 
uses `level.traps[]`)

### `src/cmd.c` / `src/do.c` / `src/hack.c` lookaround / `src/pray.c` / `src/sounds.c`

JS: `js/cmd.js`, `js/do.js`, `js/wizard.js`, `js/getline.js`, `js/wizcmds.js`, `js/timeout.js`, `js/polyself.js`, 
`js/artifact.js`, `js/zap.js`, `js/read.js`, `js/engrave.js`, `js/pager.js`, `js/getpos.js`, 
`js/pray.js`, `js/sounds.js`, `js/rumors.js`, `js/sit.js`, `js/weapon.js`, `js/dungeon.js`, `js/insight.js`, 
`js/invent.js`, `js/pline.js` — partial

Movement/search/apply/kick/wait and selected UI/item commands; Ctrl-D → `dokick` (D-0031); 
**`parse`/`get_count` digit prefix then one `clear_nhwindow(WIN_MESSAGE)`** (D-0391; 
**`get_count` historicmsg D-1613** — C `cmd.c` `:5009–5090` `GC_SAVEHIST`/`GC_CONDHIST`/`GC_ECHOFIRST` + `putmsghistory`+`key2txt`; parse `GC_NOFLAGS`; getobj `GC_SAVEHIST`; live `js/cmd.js` + `getobj_take_count`; `adjust_split` caller / `custompline(SUPPRESS_HISTORY)` / altmeta `input_state` / num_pad `NHKF_COUNT` named); 
**`parse` `multi=command_count-1` + counted `.`/`rest_on_space` → 
`set_occupation(donull,"waiting",multi)` timed** (D-0928 #1096; 
multi>0 `rhack(cmd_key)` non-occupation path deferred); 
**counted `Ns` → `set_occupation(dosearch,"searching",multi)` timed** (D-0392; 
legacy `_repeat_search` path unused when occupation set); 
**`runSegment` ICRNL `\r`→`\n` + `C(dir)` rush (keys 1..26 only)** (D-0259); 
**Ctrl-rush `context.run=3` / capital run `run=1`** (D-0261); 
**`g`/`G` PREFIXCMD `do_rush`/`do_run` run=2/3 + following walk first-step keeps run (D-1186; 
**rhack `got_prefix_input` + `cmdq_shift` D-1582** — C `cmd.c` PREFIXCMD `:3762–3774` 
`goto got_prefix_input` (g/G/F/m `do_rush`/`do_run`/`do_fight`/`do_reqmenu`); 
`cmdq_shift` `:354–370`; doextcmd `:3753–3760` ext_tlist add+shift; 
`set_move_cmd` `:1386–1400` + `do_move_*` REPEAT; keyboard hjkl still DIR_DX; 
nested F+g/G / full CMD_gGF table / rhack `dxdy_moveok` / `cmd_from_func` / capital 
`do_run_*` REPEAT / travelmap `reset_cmd_vars` named)**; 
**rhack Unknown command `visctrl(key)` (D-1189; Ctrl-C is `^C`; 
**`do_repeat` CQ_REPEAT D-1563** (C `cmd.c` `:1637–1660` copy/`in_doagain`/`rhack(0)` restore; 
getobj `:2049–2054` INT+KEY; `cmdq_pop` REPEAT when `in_doagain`; Ctrl-A / `#repeat`; 
PREFIXCMD / `cmdq_shift` is D-1582); 
`custompline(SUPPRESS_HISTORY)` named; **`sanity_no_check` D-1664** (`CMD_INSANE` ^P if/else + 
bound tlist + canned EXTCMD; `wizcmds.c` `sanity_check`)**; 
**`lookaround` `mon_visible` gate** (D-0705; Blind/traps/mention_walls deferred); 
**`#lookaround`/`dolookaround`** (D-1217; 
C `cmd.c:1261–1368` floodfill/seen/`lookaround_known_room` + 
`#lookaround` EXT_CMDS no AUTOCOMPLETE + newgame glyph_updates then-arm; 
corridor-goes-to / outside-room TODO / integer glyph_at / full `do_screen_description` table still 
named); **ohitmon range==-1 re-extract so rolling boulder keeps rolling (D-0700; 
seed0014 next @35246 mdig)**; **travel stop before n-dopush was boulder-at-56,10 missing 
(D-0700)**; **`findtravelpath` trap/liquid avoid + tight-diag load + 
seenv||couldsee path / Chebyshev-worsen quiet-rest (D-0702; D-0784 drop couldsee-only prefer; 
D-0788 TRAVP_GUESS hero-matrix+raster pick; D-0813 TRAVP_VALID BFS hero→dest)**; 
lookaround trap/liquid + travelmap + TEST_TRAV deferred)**; 
**`set_move_cmd` DOMOVE_WALK/RUSH + continue_run no re-set** (D-0359); 
**`set_move_cmd` clears `travel`/`travel1` on walk and capital/Ctrl run** (D-0493; 
leftover `_` travel must not rewrite dx on `H`); 
**`.` → `donull` + `cmd_safety_prevention`** (D-0033/D-0228) + 
**`cmd_safety_prevention` reads `iflags.cmdassist` (optlist default On; 
Options toggle)** (D-0928 #1192); **`<space>` → `donull` when `flags.rest_on_space`** (D-0715); 
**`#wipe`/`make_blinded` Blind ≡ props not sticky + `vision_recalc(0)` on toggle** (D-0716; 
Eyes/Hallu talk deferred; **Unaware talk=FALSE is D-1768**; **Punished `set_bc` is D-1769**; Sting is D-1755); 
**`set_uasmon`→`set_mon_data` prorates `u.umovement` when new form slower** (D-0717; 
**`set_uasmon` resist_from_form MR_* FIRE…STONE + FLYING/BLINDED** D-0928 #1121; 
DRAIN_RES/ANTIMAGIC/SICK_RES/STUNNED/…/BLND_RES/`#monster`/`dobreathe` deferred; 
**`newman`/`polyman`/`redist_attr`/`rndexp`** (D-0718) + 
**`urace.individual.m/f` → "new man"** (D-0726; Sick/Stoned/Slimed/livelog/retouch deferred); 
**`polymon`→`encumber_msg` + `setworn` skip_find_ac** (D-0722); 
**`#monster`/`domonability` reflexive** (D-0723; 
spit/gaze/were/hide/web/… deferred) + **`can_breathe`→`dobreathe` uen<15** (D-0725; 
getdir/ubuzz deferred); **`polymon` verbose breath tip** (D-0725; other tips deferred)); 
**`d` → `dodrop`/`drop`/`dropx` + gold `freeinv_core` botl/`_goldCount` 
(D-0396)/`dropy`/`canletgo`** (D-0261) + **`flooreffects` via `dropz`** (D-0987) + 
**`dropz` `impact_disturbs_zombies`** (D-1229; 
`with_impact` owt/flimsy) + **`dropz`/`throwit` `container_impact_dmg`** (D-1249; 
C `dokick.c:409–485`; throw origin `u.ux,u.uy`; **hitfloor `dropz(TRUE)` D-1263**; 
**hold_another_object D-1272**; **pickup highdrop D-1273**; 
toss_up / litter still named) + **`doaltarobj`/`fire_damage`/hot potion** (D-0992) + 
**`getobj_drop` via `yn_function` leaves TOPLINE_NON_EMPTY; 
`clear_nhwindow_message` clears pending; leftover getobj text does not steal hero cursor** (D-0512; 
shops/sinks/`better_not_try` named; **`#droptype`/`D` `doddrop` D-1635** (C `do.c` `:922–944` TRADITIONAL `ggetobj("drop", drop)` + `'m'` `menu_drop`; FULL `query_category` then autopick/`query_objlist`; COMBINATION ggetobj combo ALL_FINISHED; callees `menudrop_split` `:963–977` / `menu_drop` `:980–1107`; `worn.c` `bypass_objlist`/`nxt_unbypassed_obj`; `cmd.c` `reset_occupations`; `getline.js` `#droptype`; ParanoidAutoAll / INCLUDE_VENOM display / `clear_bypasses` named); **drop getobj ALLOWCNT count prefix D-1530**; globby pudding_merge deferred); 
**`'>'` → `dodown`/`next_level`/`goto_level` ordinary stairs + 
`flush_screen(-1)` descend `--More--` + clear `_objects_at`/`head_engr`** (D-0149/D-0160/D-0161); 
**`goto_level` descend Flying / encumber|Punished|Fumbling fall `rnd(3)` `losehp`** (D-0445; 
**`Fumbling()` ≡ H\|\|E not sticky `u.Fumbling`** D-0691; **trap-door `do_fall_dmg`** (D-1179; 
Punished `ballfall` is **D-1778**; callers gate on `u.uball` ≡ C `Punished` **D-1786**; 
W-tower rndspot bit 2 still named); 
omit full `selftouch` petrify); 
**`goto_level` `familiar_level_msg` via `bones_include_name`** (D-0577); 
**Gehennom Valley arrival + hellish_smoke smell/sense** (D-0801; 
ACH_HELL/`ACH_MINE`/`ACH_SOKO` via `record_achievement` (D-0928 #1181); MICRO More deferred; 
**`#conduct` `show_achievements` wizard/final + 
`record_achievement`/`uachieved` ranks·HELL·MINE·TOWN·SHOP·TMPL** (D-0928 #1181); 
**D-1644 `goto_level` ACH_ENDG/ASTR/BGRM + Is_knox alarm + `new` `livelog_printf` entered** 
(C `do.c` `:1881–1959`; callee `insight.c` `record_achievement` `:2406–2472` `achieve_msg` + 
gameover skip; `botl.c` `describe_level` dflgs 2; live `js/do.js` + `js/insight.js`; 
SoundAchievement named; MICRO Valley More still named; prize `context.achieveo` otyp when 
unset is empty `OBJ_NAME`)); 
**Rogue first-visit primitive-world pline + 
`assign_graphics` ROGUESET/`check_gold_symbol`** (D-0805; 
RogueIBM color sets / full showsyms stairs `%` deferred; Is_knox/ACH_BGRM is D-1644); 
**`stairway_find_from(uz0)`** (D-0224); **`F`/`do_fight`/`domove_fight_empty`** (D-0225; 
boulder/pick/I-glyph deferred) + **`rhack` F-prefix + non-gGF cmd → pline + no execute** (D-0927; 
nested g/G after F / full CMD_gGF table deferred); 
**`_`/`#travel` → `dotravel`/`dotravel_target` + dest→hero `findtravelpath` BFS (`dirs_ord`) + 
boulder-node skip + `TRAVP_GUESS` fallback + clear `travelcc` when BFS step cell is destination + 
`goto_level` clears `travelcc`** (D-0153/D-0412/D-0453) + **TEST_TRAV seen-trap/liquid + 
tight-diag squeeze + couldsee-prefer / seenv-detour quiet-rest** (D-0702; 
travelmap revisit / door-delay / `could_move_onto_boulder` / Passes_walls / Sokoban / visited 
"unsure" / accurate seenv|couldsee still deferred); 
**autoopen walk-into → `doopen_indir`** (D-0059); 
**closed-door rush/impaired → orthogonal bump `Ouch!`+`exercise(A_DEX,FALSE)` / `That door is 
closed.` — check `!run` before clearing run** (D-0433) + 
**`Fumbling()` ≡ H||E for autoopen/bump (not sticky `u.Fumbling`)** (D-0696; 
Passes_walls/ooze/Underwater/tunnels/Blind feel/steed deferred; 
trap/steed/mthrowu sticky Fumbling still); 
**`#` → `doextcmd`/`#teleport`(D-1230)/`#wizwish`(D-0709)/`#wipe`(D-0712)/`#polyself`(D-0713; 
**`polymon` `drop_weapon(1)` cantwield→dropx** (D-0714); 
**`break_armor` nohands/verysmall gloves(+drop_weapon)/helm/shield + boots** (D-0928 #1116; 
horns/flimsy-helm/`ublindf` deferred); **`polyself(POLY_NOFLAGS)` system-shock `rn2(20)` + 
random `rn1(SPECIAL_PM)`** (D-0928 #1103; **POLY_LOW_CTRL forcecontrol downgrade D-1428**; 
were/vamp/dragon-merge/controllable_poly getlin/light-src deferred); 
**`set_mon_data` hero umov prorate** (D-0717))/`#invoke`/`doinvoke`/`arti_invoke` 
!inv_prop→nothing_happens+ECMD_TIME (D-0715) + 
**BLINDING_RAY `invoke_blinding_ray` D-1377** (crystal-ball/`inv_prop` other specials + 
property toggle still named; artilist `inv_prop` extracted)/`#untrap`/`could_untrap`(D-0726; 
door force D-1495; floor `untrap` named)/`**#levelchange `losexp("#levelchange")` drain + 
`u.ulevelmax` (D-1203; raise D-0061)**`/`**`#wizmakemap` `makemap_prepost` `u_on_rndspot` 
D-1288**`/`#wizintrinsic`(D-0835 HALLUC→`make_hallucinated`; 
**BLINDED silent when already Blind** D-0928 
#1097)/`#wizgenesis`/`#wizwhere`→`print_dungeon(FALSE)` text pages (D-0928 #1115; 
Invocation/portal debug lines deferred)/`#timeout`→`wiz_timeout_queue` (D-1527; 
C `timeout.c` `:2039–2127` + callee `region.c` `visible_region_summary`; 
VERBOSE_TIMER names / `fmt_ptr` heap / save `timer_id` / `wiz_light_sources` /
`timer_sanity_check` named)/ **INTERNALCMD `#altdip` → `dip_into`** (D-1537; 
C `cmd.c` `:2063` table + `ext_func_tab_from_func`/`cmdq_add_ec` `CMDQ_EXTCMD` + 
`extcmds_match` skip + `can_do_extcmd` buried no `IFBURIED`; typed `#altdip` unknown; 
`cmd_from_ecname` `#altdip`; **`#seeall` EXT_CMDS `doprinuse` D-1605**
(C `cmd.c` `:1848–1849` `*` / no AUTOCOMPLETE / `IFBURIED|GENERALCMD|CMD_M_PREFIX`;
typed runner `js/getline.js` EXT_CMDS; `doextcmd` `can_do_extcmd` +
`accept_menu_prefix` flag not a name set; sibling `#seeweapon`/`#seearmor`/
`#seerings`/`#seeamulet`/`#seetools` live dopr* callees; `*` key is D-0340;
**`#?` `doextlist` D-1625** (C `cmd.c` `:560–734` + `doc_extcmd_flagstr`
`:523–557`; `doextcmd` `:516–517` loop while `doextlist`; pager.c
`hmenu_doextlist`; typed runner EXT_CMDS `?`; help menu `k`;
**BIND= M('?') `cmdbind_get` D-1643** (C `cmd.c` extcmdlist `:1670–1672`
`M('?')` `"?"` `doextlist`; `commands_init` `:2754–2756` `cmdbind_add`;
`rhack` `:3678–3686` `cmdbind_get`; live `js/dokeylist.js` `cmdbind_get` +
`js/cmd.js` `rhack_dispatch_bound` + `js/getline.js` `extcmd_run_by_txt`;
not the doextlist body; **overlay BIND= on if/else keys D-1657**
(C `cmd.c` `rhack` `:3678` cmdbind_get first; `bind_key` nothing
`cmdbind_remove`; live `rhack_user_overlay_key` + EXT_CMDS if/else
runners; walk keys / PREFIXCMD overlay targets / `f_text` occupation
named); default meta without an EXT_CMDS runner still Unknown); **Eyes `is_plural` D-1552** (C `obj.h` 
`is_plural` + `artifact.c` `undiscovered_artifact` `:1130–1143`; 
`objnam.c` `otense`/`not_fully_identified`/`obj_is_pname`; 
`invent.c` `fully_identify_obj` `discover_artifact`; 
`iactions.c` `item_naming_classification` `the_unique_obj`; 
live `js/objnam.js` + `js/artifact.js` late-bind; clones retired; 
other INTERNALCMD `clicklook`/`mouseaction`/`altadjust`/`alttakeoff`/
`altunwield` / pray gift `discover_artifact` / `learn_egg_type` / 
save/rest artidisco named)/`#wizidentify`→`wiz_identify`/`override_ID`+`
display_inventory` wizid (D-0928 #1143; **unid_cnt>0 PICK_ANY D-1590**)/`#name`/`#pray`/`#chat` (**D-1808** `domonnoise` remaps genus/isshk/MOO/gecko + MS_ORACLE `doconsult` / MS_PRIEST `priest_talk` / MS_SELL `shk_chat` / NEMESIS+GUARDIAN `quest_chat`; remaining MS_* / `verbl_msg_mcan` / `night()` howl / save-rest `oracle_loc` named)/`#chronicle`/`#conduct`/`#vanquished`/`#genocided`(empty)/`
#adjust`/`#terrain`/`#sit`/`#dip`/`#offer` **`dosacrifice` ECMD_TIME after floorfood CORPSE/Yendor/fake D-1667** + **`offer_corpse` D-1678** (C `pray.c` `:1958–2120` + `eval_offering` `:1898–1956` / `consume_offering` `:1445–1475` / `sacrifice_your_race` `:1697–1778` / `sacrifice_value` `:1838–1850`; empty pick stays `ECMD_OK`; `offer_different_alignment_altar` / `bestow_artifact` / `angry_priest` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` named; floorfood getobj is D-1665)/`#turn`(D-0912; 
known_spell SPE_TURN_UNDEAD fallback deferred)/`#enhance`/`#twoweapon`/`#annotate`/`#overview`/`
#version`/`#travel`** (D-0061/D-0069/D-0101/D-0103/D-0109/D-0110/D-0124/D-0125/D-0126/D-0127/D-0128/
D-0153/D-0344/D-0510) + **`^F`/`#wizmap` → `wiz_map`/`do_mapping`/`exercise(A_WIS)` + 
trap/engr map** (D-0787) + **`wiz_map` walks `level.traps[]` when `ftrap` empty** (D-0814; 
notice_mon_off/on deferred) + **`^T` → `dotelecmd`** (D-0590; 
m-prefix keep + PICK_ONE D-1209) + **wizard `#pray` Force-the-gods → p_type 3/`uinvulnerable` + 
`pleased` You_feel/action `rn1`/`ublesscnt` `rnz(350)`** (D-0517) + 
**`in_trouble` TROUBLE_HIT / `critically_low_hp` + `fix_worst_trouble` HIT `rnd(5)` + 
pleased action switch** (D-0920; **`TROUBLE_LYCANTHROPE` → `you_unwere(TRUE)`** D-1004; 
other TROUBLE_* / pat_on_head gifts/crown deferred); 
**`angrygods` 4–8 + `rndcurse`/`gods_angry`** (D-0969); 
**`<'` → `doup`/`prev_level` + in-memory `savelev`/`getlev` catchup `rnd(10)`/`hide_monst`** 
(D-0366) + **`hide_monst` viz override → `restrap` `rn2(3)` (+ mimic retry) + 
`hideunder`** (D-0622) + **`movemon_singlemon` pre-dochug `restrap`** (D-0624; 
eel hideunder/`rn2(4)` / I_SPECIAL equip deferred); 
omit binary NHFILE/ledger-1 escape yn, mysterious force, quest gate, portals; 
trap-door fall D-1179; Lua `NHCB_LVL_LEAVE`; 
full `TEST_TRAV`/`TRAVP_GUESS`/`travelmap`/`#retravel`; **`#wizmakemap` D-1288**; 
**`#seeall` D-1605**; **`#?` D-1625**; **BIND= M('?') D-1643**; remaining `extcmdlist` bodies; …
**`body_part`** exact-name clones import `polyself.js` (wield via
`objnam.js` `body_part_latebound`; D-1496). `zap.js` appends `body_part`
to its existing polyself import. **`mcastu` `body_part(HEAD)` +
`pickup` `body_part(HAND)` D-1508** (mcastu imports `polyself.js`;
pickup via latebound — polyself→do→pickup cycle). **`mcast_blind_you`
`body_part(EYE)` D-1534** (`eyecount` live `monsters.js`). **`observe_quantum_cat`
`body_part(FOOT)` D-1535** (pickup latebound); **`zoo_mon_sound` zoo_msg+You_hear D-1871**
(C `sounds.c` `:115–128` (msleeping||animal)+ZOO gate, `rn2(2)+hallu`; live
`js/sounds.js` async print; file-local `get_iter_mons` async for printing bfunc;
throne/beehive/morgue/barracks/court You_hear plines still named).

### `src/potion.c`

JS: `js/potion.js` — partial

**`dodrink`/`dopotion`/`peffect_oil`** uncursed/cursed unlit (D-0073); 
**`dodrink` fountain yn→`drinkfountain`** (D-0237); **`dodrink` sink yn→`drinksink`** (D-0434); 
**`rhack` `q` gates move on `ECMD_TIME` only** (D-0280; `ECMD_CANCEL` must not spend a turn); 
**`dodip` fountain yn→`dipfountain`** (D-0109); 
**`getobj_drink` `?`/`*` → `display_pickinv_reply`** (D-0430); 
**`getobj_drink` prompt `compactify` when suggested>5; `?` keeps raw lets** (D-0455; 
other getobj callers / shared getobj still may omit); 
**`peffect_see_invisible`/`POT_FRUIT_JUICE` + `dopotion` trycall/`docall`** (D-0430; 
`make_blinded`/See_invisible props deferred; fruit `newuhs` field via D-0438); 
**`peffect_paralysis` `rn1(10,25-12*bcsign)`** (D-0430; Levitation/steed/`surface` deferred); 
**`peffect_confusion` + `make_confused`/`itimeout_incr` `rn1(7,16-8*bcsign)` + talk `You_feel` + 
`nh_timeout` CONFUSION expiry** (D-0436/D-0441; 
**`potionbreathe` POT_INVIS flash + await pline** (D-0741; remaining otyps D-1477)); 
**`dopotion` `more_experienced(0,10)` on `makeknown`** (D-0582); 
**`POT_BOOZE`/`peffect_booze`** + `d(2+uhs,8)` / healup / hunger / `newuhs` field / cursed pass-out 
(D-0438; `newuhs` hunger msgs/faint/ATEMP deferred); 
**`POT_HEALING`/`peffect_healing`** + `healup` botl (D-0444); 
**`POT_EXTRA_HEALING`/`peffect_extra_healing`** + 
async `healup`→`make_blinded`/`learn_unseen_invent` (D-0928 #1098; 
`healup` curesick `make_vomiting`+`make_sick` D-1398; healup cureblind `make_deaf` talk D-1399; 
**`peffect_speed` POT_SPEED/SPE_HASTE_SELF** (D-1408; 
`speed_up` `rn1(10,100+60*bcsign)` + wounded `heal_legs` + FROMOUTSIDE; 
zap zapyourself WAN_SPEED_MONSTER D-1410); 
**`peffect_object_detection` POT_OBJECT_DETECTION/SPE_DETECT_TREASURE** (D-1417; 
`object_detect(otmp,0)` then `exercise(WIS)`; empty `strange_feeling` return 1; 
blessed potion/spbook `do_dknown` invent+floor); 
**`peffect_monster_detection` POT_MONSTER_DETECTION/SPE_DETECT_MONSTERS** (D-1418; 
blessed `incr_itimeout` HDetect_monsters + lonely else `monster_detect`; 
empty threatened/`heebie jeebies` return 1); 
**`peffect_levitation` POT_LEVITATION/SPE_LEVITATION** (D-1419; 
`set_itimeout(1)`+`float_up` else `potion_nothing++`; 
cursed `~I_SPECIAL` then upstairs `doup` or `has_ceiling` `rnd`/`losehp` colliding with the 
ceiling; blessed `rn1(50,250)`+`I_SPECIAL`; uncursed `rn1(140,10)`; sink `spoteffects`; 
`timeout.c` `:794–803` expiry `float_down`; vault/temple/shop ceiling labels named); 
**`peffect_restore_ability` POT/SPE_RESTORE_ABILITY** (D-1420; cursed Ulch; 
else Wow good/better/great; `rn2(A_MAX)` ABASE=AMAX + AEXE max 0; potion `pluslvl`; 
apply.c `unfixable_trouble_count`); **`peffect_invisibility` POT/SPE_INVISIBILITY** (D-1421; 
no skilled bless; wrapping itchy return; FROMOUTSIDE / `d(6-3*bcsign,100)+100`; cursed aggravate; 
timeout INVIS expiry); **`peffect_polymorph` POT_POLYMORPH** (D-1428; 
You_feel little strange/normal; `!Unchanging` `POLY_NOFLAGS` unless blessed original form 
`POLY_CONTROLLED+POLY_LOW_CTRL` then `mtimedone` min `rn2(15)+10`; 
callee `polyself` LOW_CTRL forcecontrol downgrade); 
**`peffect_gain_energy` POT_GAIN_ENERGY** (D-1429; cursed lackluster else Magical energies; 
`d(blessed?3:!cursed?2:1,6)` ±uenmax + `3*num` uen clamp 0/max; uenpeak; botl; 
`exercise(WIS,TRUE)`; potionhit/potionbreathe named); **`peffect_acid` POT_ACID** (D-1430; 
Acid_resistance tastes tangy/sour else burns a little/a lot/like acid; 
`d(cursed?2:1, blessed?4:8)` `losehp(Maybe_Half_Phys)` KILLED_BY_AN; `exercise(CON,FALSE)`; 
Stoned `fix_petrification`; `potion_unkn++`; potionhit/potionbreathe named); 
**`peffect_gain_level` POT_GAIN_LEVEL** (D-1431; cursed `potion_unkn++`; 
ledger 1+amulet → `earth_level` else `Can_rise_up` → `get_level(depth-1)`; 
same-level "It tasted bad"; else You rise through ceiling + `goto_level` else uneasy; 
`pluslvl(FALSE)`; blessed `uexp=rndexp(TRUE)`; callee `dungeon.c` `Can_rise_up`; 
ceiling vault/temple/shop named); **`peffect_blindness` POT_BLINDNESS** (D-1432; 
already Blind or (H||E)&&BBlinded `potion_nothing++`; 
`make_blinded(itimeout_incr(BlindedTimeout, rn1(200, 250-125*bcsign)), !Blind)`; 
callee `do.js` `make_blinded`; **`toggle_blindness` `Sting_effects(-1)` D-1755**
(C `potion.c` `:334–364` Blind_telepat/Infravision/Stinging `see_monsters`
then `-1`; Hallu talk; Eyes vismsg/itch/`strange_feeling`; clones
retired; Blindf_on/off await toggle); **`make_blinded` Unaware
talk=FALSE D-1768** (C `:275–276` / `youprop.h` `:399`
`unconscious`/`is_fainted`; live `js/eat.js` `is_fainted`; **Punished
`set_bc(0)` D-1769** C `ball.c` `:379–424` / `potion.c` `:309`;
live `js/ball.js` + callers `make_blinded`/`Blindf_on`/`Blindf_off`/
`punish`; **Blind `move_bc` felt/glyph arms + `unplacebc` restore
D-1777** — C `move_bc` `:436–556` / `unplacebc_core` `:146–177`;
`u.bglyph`/`u.cglyph` are remembered **cells** here, not int ids, so
`levl_glyph_at` snapshots and `set_levl_glyph` writes back
(`levl[x][y].glyph = u.bglyph`); `movobj` exported from `js/hack.js`
(C `hack.c:824`) instead of a second inline extract+place;
`Is_waterlevel` swallow arm live; named: `maybe_unhide_at`
(sync callers), `bcrestriction`);
potionhit/potionbreathe named); 
**`peffect_sleeping` POT_SLEEPING** (D-1437; 
Sleep_resistance||Free_action `monstseesu(M_SEEN_SLEEP)` + 
yawn else `fall_asleep(-rn1(10, 25-12*bcsign), TRUE)` + `monstunseesu`; 
callee `timeout.c` `fall_asleep` / `mondata.c` `monstseesu`; potionhit/potionbreathe named); 
**`peffect_gain_ability` POT_GAIN_ABILITY** (D-1438; cursed Ulch+unkn; 
Fixed_abil extrinsic `potion_nothing++`; else blessed `adjattrib(i,1,0)` all A_MAX / uncursed `rn2` 
tries msgflg -1 then last 0; callee `attrib.c` `adjattrib`; potionhit/potionbreathe named); 
**`peffect_hallucination` POT_HALLUCINATION** (D-1439; Halluc_resistance `potion_nothing++` return; 
else already Hallucination `potion_nothing++` then still 
`make_hallucinated(itimeout_incr(HHallucination, rn1(200, 600-300*bcsign)), TRUE, 0)`; 
blessed `!rn2(3)` else `!cursed && !rn2(6)` MAGIC enlightenment; 
callee `make_hallucinated` + `invent.js` `enlightenment`; potionhit/potionbreathe named); 
**`peffect_full_healing`** healup 400/`4+4*bcsign` + blessed `ulevelmax--`/`pluslvl(FALSE)` + 
hallu + STR then CON + wounded legs (D-1411; potionhit/potionbreathe named; dip poison-coat D-1497); 
**`peffect_enlightenment`** cursed `potion_unkn`+uneasy+`exercise(WIS,FALSE)` else blessed 
`adjattrib` INT then WIS then `do_enlightenment_effect` (D-1413; artifact invoke still named)); 
**`POT_SICKNESS`/`peffect_sickness`** blessed stale-fruit + uncursed attr/HP (D-0680; 
poisontell wording / Fixed_abil / peffect hallu-clear via make_hallucinated still thin); 
**`peffect_water` + potionbreathe `POT_WATER` lycan** (D-1004; `make_sick` body deferred); 
**throwit steed `potionhit` crash/saddle/`H2Opotion_dip`/POT_WATER body D-1297 + 
remaining otyp switch/shop unpaid D-1472** (C-commented GAIN_LEVEL/LEVITATION/FRUIT/DETECT named) + 
**`potionbreathe` remaining otyps D-1477** (towel Half_gas_damage; restore/gain ABASE++; 
heal FALLTHROUGH +1; sickness −5; hallu vision; conf `make_confused` rnd(5); speed HFast; 
blindness `make_blinded` rnd(5); acid/poly CON; trycall !kn; 
C-commented GAIN_LEVEL/ENERGY/LEV/FRUIT/DETECT/OIL named); 
**`getobj_drink` empty suggest + GETOBJ_NOFLAGS → no key read** (D-0928 #1103; 
drink_ok_extra "else " deferred); omit other `peffect_*` (gain ability/hallucination), Strangled, 
drink underwater, **`djinni_from_bottle`** BUC chance + `mongrantswish`/tame/peace/vanish/hostile + 
MAGIC_LAMP `#rub` wire (D-1144; dodrink smoky occupant chance still named); 
milky/smoky bottles, lit-oil burn, worn-stack split, **`potion_dip` potion-potion `mixtype`** 
(D-1457; Klein/hands/H2O/poly gate) + **`potion_dip` unicorn/amethyst mixtype dip** (D-1486) + 
**`potion_dip` poison-coat / healing unpoison** (D-1497; `is_poisonable` missile window or 
Grimtooth) + **`potion_dip` oil/lamp** (D-1498; lit `fire_damage` / cursed `make_glib` /
weapon gleam-derust / `more_dips` OIL_LAMP/MAGIC_LAMP fill) + **`potion_dip` `poly_obj`/`obj_unpolyable`** (D-1499; unpolyable `obj_resists(5,95)` then `poly_obj(STRANGE_OBJECT)` + polypiles/`prinv`/`poof`) + **`potion_dip` lichen corpse / acid-erode** (D-1509; POT_ACID+CORPSE PM_LICHEN wrinkle/`hcolor` no-poof; else `erode_obj` ERODE_CORRODE EF_GREASE poof unless ER_NOTHING; worn `set_wear` is D-1510) + **`dip_into` #altdip** (D-1500; C `:2374–2405` canned `drink_ok` then `dip_ok` GETOBJ_PROMPT; caller `iactions.c` IA_DIP_OBJ; ignores floor; INTERNALCMD `#altdip` D-1537) + **`H2Opotion_dip` useeit `ublindf && Blindfolded_only`** (D-1501; C `potion.c` `:2461` / `youprop.h` Blindfolded≡EBlinded; unpaid POT_WATER `alter_cost`/`costly_alteration`; `mentioned_water` `makeknown`; towel soak; callee `trap.c` `water_damage` invent container plines); **`dodip` pool yn** (D-1128; 
`is_pool` not `IS_POOL`; `can_reach_floor(FALSE)` gate; `waterbody_name` yn; 
Levitation `floating_above`; unskilled rider skip; hands/uarmg `wash_hands`; 
else `water_damage` + POT_ACID `in_use`/`useup`; 
`pot_acid_damage` boom+delobj / `drink_ok_extra` still named); 
**`dodip` fountain yn via `short_oname(doname,thesimpleoname,QBUFSZ-sizeof getobj)`** (D-0881; 
pair_of→them deferred)

### `src/zap.c` `dozap`

JS: `js/zap.js` — partial

**`dozap`/`zappable`/`backfire`/`weffects`/`zapnodir`/`learnwand`** NODIR 
`WAN_SECRET_DOOR_DETECTION` → `findit` (D-0074); 
**directional getdir `.`=self + `confdir` + getdir_zap yn_function D-1721 /
CQ_REPEAT D-1729**
(confdir stays local; do not add to shared `getdir`) +
`zapyourself` SPE_HEALING/`WAN_SLEEP`/`SPE_SLEEP`/`WAN_DEATH`/`SPE_FINGER_OF_DEATH`/`WAN_POLYMORPH`/
`SPE_POLYMORPH` (D-0156/D-0576/D-0928 #1103); **getobj `?`/`*` → `display_pickinv_reply`; 
RAY `weffects` → `ubuzz`/`dobuzz` for `WAN_MAGIC_MISSILE`..`WAN_LIGHTNING` (range/`zap_hit`/`zhitm` 
damagetypes + cold `destroy_items`/`resist`/`Reflecting` shield)** (D-0450/D-0682); 
**`ureflects` shield `makeknown`→`exercise(A_WIS)`** (D-0452); 
**`dobuzz` `tmp_at(DISP_BEAM)` + `zapdir_to_glyph` + `DISP_CHANGE`/`DISP_END`** (D-0468); 
**`zhitu` non-sleep FIRE/COLD/MISSILE/LIGHTNING + hero `destroy_items` AD_FIRE** (D-0734); 
**`burnarmor` worn erode + `maybe_destroy_item` pline/`potionbreathe` + 
fatal mid-destroy `finish_losehp_done`** (D-0741; 
**ignite_items/`burn_away_slime`/`begin_burn`** (D-0978); 
death-disintegrate / poison·acid / ugolemeffects / inventory_resistance deferred; 
**`maybe_destroy_item` AD_ELEC D-1368 / Shock uprops D-1371**); 
**fatal `zhitu`→`losehp` awaits `finish_losehp_done` + `weffects` skips `learnwand` (D-0737; 
≡C noreturn / thitu D-0255)**; **IMMEDIATE `weffects` → `bhit(rn1(8,6))` + 
`bhito` WAN_POLYMORPH (`obj_unpolyable`/`obj_shudders`/`poly_obj` floor + 
invent replace D-1499; `learnwand`→`makeknown`) + `zapwrapup` `You_feel` shudder** (D-0509/D-0513; 
`bhitm` poly / `zap_updown`/`zap_map` / `create_polymon` / other bhito otyps 
deferred; **worn-slot `set_wear`** D-1510); **RAY `WAN_DIGGING`/`SPE_DIG` → `zap_dig`** (D-0516); 
**`weffects`/`zapnodir` `more_experienced(0,10)` on disclose** (D-0582); 
`makewish` subset (D-0064); **`makewish` `readobjnam_wish` wizterrainwish furniture/liquid/floor 
`switch_terrain` D-1279** (traps/door/wall named); 
**empty/null `readobjnam` → `any` wrpsym+`mkobj` via makewish ESC** (D-0559; 
MAXWISHTRY retry / qualifier-only empty deferred); 
**exported `dobuzz` + `zap_over_floor` fire-pool steam + hissing-gas `Norep`/`ZT_POISON_GAS` 1×1 + 
`zhitm` ZT_FIRE `burnarmor` + hit `The` article** (D-0925/D-0928 #1162; 
ice/fountain/WEB/POOL→PIT/cold/acid bars deferred); 
**`dobuzz` `type < 0` dead → `monkilled(..., AD_RBRE)` else `killed`/`xkilled`** (D-0928 #1094; 
seed4500 **88399→89775**; `disintegrate_mon` / fire `completelyburns` `XKILL_NOCORPSE` deferred); 
**RAY SPE_MAGIC_MISSILE..SPE_FINGER_OF_DEATH `weffects` ubuzz BZ_U_SPELL (D-1386)**; 
omit IMMEDIATE non-poly; `mon_reflects`; fireball/Hallucination `hdmgtype` rn2; shopdamage; 
map_invisible/unmap during buzz; setworn `EReflecting` bits (worn `SHIELD_OF_REFLECTION` stands 
in); **`ureflects` W_WEP D-1342**; **`ureflects` W_AMUL/W_ARM/dragon D-1353**; 
mcastu `ureflects` named; **`zapyourself` WAN/SPE_POLYMORPH → `polyself(POLY_NOFLAGS)` + 
`dozap` `nohands` before getobj** (D-0928 #1103); 
**`dozap` self-zap `losehp` `killer_xname`+`uhim()` D-1345**; 
**`zapyourself` WAN_LIGHTNING + `flashburn` D-1355**; 
**`zapyourself` WAN/SPE_MAGIC_MISSILE D-1364 / Antimagic uprops D-1367**; 
**`zapyourself` SPE_FIREBALL D-1365**; **`lightdamage` + zapnodir WAN/SPE_LIGHT + 
zapyourself WAN_LIGHT/CAMERA D-1366**; **`zapnodir` WAN_CREATE_MONSTER `create_critters` D-1379**; 
**`zapnodir` WAN_WISHING `Luck+rn2(5)`/`makewish` D-1380**; 
**`zapnodir` WAN_ENLIGHTENMENT `do_enlightenment_effect` D-1395**; 
**`zapnodir` WAN_STASIS `stasis_until` max `moves+rn1(21,10)` D-1404**; 
**`zapnodir` SPE_DETECT_UNSEEN shares SECRET_DOOR `findit` D-1412**; 
**SPE_LIGHT NODIR wand-duplicate `weffects`/`zapnodir` D-1427**; 
**SPE_SLEEP RAY wand-duplicate `weffects` ubuzz D-1440**; 
**SPE_DIG RAY wand-duplicate `weffects`/`zap_dig` D-1441**; 
**SPE_MAGIC_MISSILE RAY wand-duplicate `weffects` ubuzz D-1448**; 
**SPE_FINGER_OF_DEATH RAY wand-duplicate `weffects` ubuzz D-1449**; 
**SPE_KNOCK IMMEDIATE wand-duplicate `weffects` bhit D-1450**; 
**SPE_SLOW_MONSTER IMMEDIATE wand-duplicate `weffects` bhit D-1451**; 
**SPE_WIZARD_LOCK IMMEDIATE wand-duplicate `weffects` bhit D-1452**; 
**`bhit` thrown/kicked `shade_miss` D-1383**; **`bhit` M_AP_OBJECT skip D-1392**; 
**`bhit` WEB stick D-1393** (`:3926–3938` empty WEB thrown/kicked `!rn2(3)` + 
Yname2 pline/tseen/newsym + clear returning; 
throwit fly / skiprange / FLASHED_LIGHT DISP_BEAM still named); 
**`bhit` doorlock WAN_OPENING/SPE_KNOCK D-1462** (`:4056–4074` IS_DOOR|SDOOR not STONE; 
callee `lock.c` `:1103–1272` SDOOR appear + locked unlock + picking_at) + 
**`bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK D-1475** (Rogue hide / obstructed / trap-in-doorway / 
lock-shut) + **`bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT D-1482** (SDOOR appear-then-continue; 
trapped explode / D_BROKEN crash; learnwand also if WAN_STRIKING && !Deaf; 
shop D_BROKEN add_damage+pay destroy; muse.c mbhit named); 
**`maybe_destroy_item` AD_ELEC rings/wands D-1368**; **`zapyourself` WAN_MAKE_INVISIBLE D-1369**; 
**`zapyourself` WAN_SPEED_MONSTER D-1410**; 
**`zapyourself` WAN/SPE_SLOW_MONSTER `u_slow_down` D-1433**; 
**`zapyourself` WAN_LOCKING/SPE_WIZARD_LOCK `closeholdingtrap`+`boxlock_invent` D-1434**; 
**`zapyourself` WAN_PROBING `probe_objchain`+`ustatusline` D-1435**; 
**`bhitm` WAN_MAKE_INVISIBLE D-1414 / conferral See_invisible D-1423**; other zapyourself otyps; 
**`zapyourself` SPE_DRAIN_LIFE `!Drain_resistance`+`losexp` D-1446**; 
**zap_steed WAN_PROBING D-1443**; **zap_steed WAN_TELEPORTATION D-1455**; 
**zap_steed WAN_OPENING/SPE_KNOCK bhitm D-1463**; **zap_steed SPE_DRAIN_LIFE bhitm D-1464**; 
**zap_steed WAN_CANCELLATION/SPE_CANCELLATION bhitm D-1470**; 
**zap_steed WAN_POLYMORPH/SPE_POLYMORPH bhitm D-1471**; 
**zap_steed WAN_MAKE_INVISIBLE bhitm D-1473**; 
**zap_steed WAN_STRIKING/SPE_FORCE_BOLT bhitm D-1474**; 
**zap_steed WAN_SLOW_MONSTER/SPE_SLOW_MONSTER bhitm D-1478**; 
**zap_steed WAN_SPEED_MONSTER bhitm D-1479**; **zap_steed SPE_CURE_SICKNESS bhitm D-1480**; 
**zap_updown WAN_PROBING D-1444**; **zap_updown WAN_OPENING/SPE_KNOCK D-1454**; 
**zap_updown WAN_STRIKING/SPE_FORCE_BOLT D-1456**; **bhito WAN_PROBING D-1445**; 
**bhito SPE_DRAIN_LIFE drain_item D-1453**; 
**`bhito` WAN_OPENING/WAN_LOCKING/SPE_KNOCK/SPE_WIZARD_LOCK `boxlock` D-1467** (callee `lock.c` 
already live; **`bhito` uchain unpunish D-1481**; 
**`bhito` poly-arm `Is_box` `boxlock` `reset_pick` D-1483** (callee POLY `reset_pick` iff 
`xlock.box==obj`; zap_updown default down POLY/cancel/tele bhitpile+zap_map D-1485)); 
bhitm WAN_SPEED D-1422; **bhitm WAN_SLOW_MONSTER D-1424**; **bhitm WAN_LOCKING D-1425**; 
**bhitm WAN_PROBING D-1426**; **bhitm SPE_DRAIN_LIFE D-1436**; 
**bhitm SPE_HEALING/SPE_EXTRA_HEALING D-1469**; **zap_map engraving/cancel trap D-1476**; 
**zap_updown default down POLY/cancel/invis/tele bhitpile+zap_map D-1485**; 
**zap_map lateral drawbridge + bhit ZAPPED_WAND zap_map D-1489**; 
force_decor/draft_message/Invocation_lev named; setworn w_blocks; 
SPE_LIGHT NODIR wand-duplicate cast dispatch D-1427; SPE_SLEEP RAY wand-duplicate weffects D-1440; 
SPE_DIG RAY wand-duplicate weffects/zap_dig D-1441; 
SPE_MAGIC_MISSILE RAY wand-duplicate weffects D-1448; 
SPE_FINGER_OF_DEATH RAY wand-duplicate weffects D-1449; 
SPE_KNOCK IMMEDIATE wand-duplicate weffects D-1450; 
SPE_SLOW_MONSTER IMMEDIATE wand-duplicate weffects D-1451; 
SPE_WIZARD_LOCK IMMEDIATE wand-duplicate weffects D-1452; 
SPE_TURN_UNDEAD IMMEDIATE wand-duplicate weffects D-1458; 
SPE_POLYMORPH IMMEDIATE wand-duplicate weffects D-1459; 
SPE_CANCELLATION IMMEDIATE wand-duplicate weffects D-1460; 
SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate weffects D-1461; 
**SPE_TELEPORT_AWAY IMMEDIATE D-1468**; **SPE_HEALING/SPE_EXTRA_HEALING directional weffects 
D-1469**; **zap_updown WAN_LOCKING/SPE_WIZARD_LOCK D-1465**; 
**zap_updown SPE_STONE_TO_FLESH D-1466**; 
**zap_map engraving/cancel trap D-1476** (maybe_explode_trap + down engraving); 
**zap_updown default down POLY/cancel/invis/tele bhitpile+zap_map D-1485**; 
**zap_map lateral drawbridge + bhit ZAPPED_WAND zap_map D-1489**; 
force_decor/draft_message/Invocation_lev named; potion peffect_enlightenment is D-1413; 
**dozap cursed `backfire` D-1416**; wrest pline; `check_capacity`/`check_unpaid`; 
`update_inventory`; shieldeff/monstunseesu; `defended`/`resists_magm` body; acid_damage/erode; 
**`maybe_destroy_item` AD_ELEC D-1368**; spell_damage_bonus / Knight questart;
**`body_part`** via existing `polyself.js` import (D-1496);
**`poly_obj` `Has_contents` → `shk.c` `delete_contents` D-1770**
(`:1827–1829` KAA; C `shk.c` `:1174–1183` extract+`obfree`; zap.js
unlink clone retired; named: trap.js `delete_contents_chest`,
mklev.js `create_object_delete_contents`, objnam empty/verysmall statue).

### `src/read.c` `doread`/`seffects`

JS: `js/read.js` — partial

**`doread` getobj-read + SCR_MAGIC_MAPPING `seffects`/`seffect_magic_mapping` + 
learnscroll/useup** (D-0075); **getobj `?`/`*` → `display_pickinv_reply` + 
SCR_TELEPORTATION → `scrolltele`/`safe_teleds` + learnscroll→`makeknown`+XP** (D-0407) + 
**cursed/confused → `level_tele`** (D-0575; 
Teleport_control getpos deferred) + **`doread` confused mispronounce/`can_chant` silently** 
(D-0580; poly silent/headless deferred); **SCR_LIGHT → `seffect_light`/`litroom`/`set_lit` + 
`lightdamage` gremlin body D-1366** (D-0431; 
confused yellow/black-light pets, snuff_lit/artifact_light/Punished ball, gremlin hit list; 
**Sunsword radius-0 D-1377**); **SCR_REMOVE_CURSE → `seffect_remove_curse` + cursed `nodisappear` + 
`trycall`/`uncurse`** (D-0432; shop water costly_alteration, Punished/unpunish, buried_ball, steed 
saddle glow, update_inventory, SPE_REMOVE_CURSE cast deferred); 
**SCR_ENCHANT_WEAPON → `seffect_enchant_weapon` + `chwepon`/`cap_spe`** (D-0435; 
confused Yobjnam2/hcolor polish, twoweapon secondary, shop costly_alteration on proof strip 
deferred); **SCR_DESTROY_ARMOR → `seffect_destroy_armor`/`destroy_arm`** (D-0491; 
confused p_glow2, cursed vibrate/disintegrate_arm, blessed choice/disintegrate_cursed deferred); 
**SCR_IDENTIFY → `seffect_identify` + invent `identify_pack`/`not_fully_identified`/`identify`** 
(D-0678; SPE_IDENTIFY cast, traditional ggetobj, `discover_artifact`/`learn_egg_type` deferred); 
**SCR_PUNISHMENT → `seffect_punishment`/`punish` + `setworn` W_BALL/CHAIN + `placebc`** (D-0908) +
**`punish` Blind `set_bc(1)` D-1769** (C `read.c` `:3059` / `ball.c` `:379–424`;
live `js/ball.js`; Blind `move_bc` / `unplacebc` restore is **D-1777**) + 
**SCR_GENOCIDE → `seffect_genocide`/`do_class_genocide` + `name_to_monclass`** (D-1098; 
livelog / Hallu names / vampshifted POLY_REVERT / cham `newcham` / `update_inventory` still named; 
`create_particular` class-letter still named) + 
**`domove` Punished `drag_ball`/`move_bc`/`cause_delay`→`nomul(-2)`** (D-0909; 
Blind move_bc felt/glyph is **D-1777**, `ballfall` is **D-1778**; jerked-back hmon/miss, 
drop_ball/litter/unpunish deferred; **`set_bc` is D-1769**); 
**`create_particular` named `name_to_mon` + `makemon(..., MM_NOEXCLAM)` + 
`makemon_appear_msg` for `#wizgenesis`/`^G`** (D-0510/D-0928 #1164; 
class-letter/* random/cant_revive yn/tame·peaceful prefixes deferred; 
invent caller appear removed — C has none); **SPBOOK → `study_book`** (D-0136); 
**`assign_candy_wrapper` in mkobj FOOD init** (D-0196; candy *read* text still deferred); 
**SCR/SPE_CREATE_MONSTER `seffect_create_monster` (D-1401; C `:1608–1624` / seffects `:2229–2231`; 
callee `create_critters` D-1379; spell.c `:1528–1531` no skilled bless)**; 
**SCR/SPE_MAGIC_MAPPING `seffect_magic_mapping` (D-1407; C `:2102–2153` / seffects `:2263–2265`; 
nommap `make_confused(HConfusion+rnd(30))` + `notice_mon_off/on`; 
spell.c `:1528–1531` no skilled bless; SCR D-0075)**; 
omit other `seffect_*` (punishment done D-0908; create is D-1401; 
mapping is D-1407), fortune/shirt/credit/marker/coin/orb/candy-read, Blind Braille, Rogue 
`unblock_point` on blessed SDOOR, `can_chant` poly silent/headless/buzz/burble; 
**`doread` `check_capacity` EXT_ENCUMBER→ECMD_OK** (D-0928 #1104)

### `src/engrave.c` `doengrave`/`make_engr_at`/`read_engr_at`/`wipeout_text`/`random_engraving`/`
make_grave`/`can_reach_floor` + `hack.c` `maybe_smudge_engr` + `write.c` `dowrite`

JS: `js/engrave.js`, `js/write.js`, `js/rumors.js`, `js/generated/engrave_data.js`, 
`js/generated/epitaph_data.js`, `js/cmd.js` — partial

**`doengrave` fingertip DUST getlin + mix-up + occupation `make_engr_at` Elbereth WIS** (D-0076); 
**`read_engr_at` DUST/ENGRAVE/BURN/MARK/blood non-Blind** (D-0133); 
**`read_engr_at` maxelen = BUFSZ−sizeof feel-lit (incl NUL)** (D-0282); 
**`wipeout_text` + `wipe_engr_at` (seed==0)** (D-0134); 
**`random_engraving` → `get_rnd_text(ENGRAVEFILE)` pad+xcrypt extract** (D-0148); 
**`rloc_engr` `goodpos(NULL)` (D-1476 zap_map TELE)**; 
**`make_grave` → `get_rnd_text(EPITAPHFILE)` HEADSTONE** (D-0209); 
**`maybe_smudge_engr` after walk + `can_reach_floor` subset** (D-0165); 
**`domove` smudge only when `DOMOVE_RUSH|WALK` succeeded; 
clear `domove_attempting` each step** (D-0359; continue_run no `rnd(5)`); 
**mon `dochug` dust wipe** (D-0369); **`dowrite` MAGIC_MARKER apply → getobj write-on + 
getlin type + ink/Luck write** (D-0742; known_spell / livelog literate / check_unpaid / Glib 
Tobjnam polish deferred); **`doengrave` live getobj write-with + non-hands
stylus `doengrave_sfx_item`/`_WAN`** (D-1689: wand zappable/backfire/NODIR
`zapnodir` / weapon blade ENGRAVE / Fire Brand BURN / marker MARK / towel
wipe / gem-ring `oc_tough` / boots DUST / large-silly; canned KEY D-1675); 
**`u_wipe_engr` body (D-1051 apply pole/grapple)**; **dokick `u_wipe_engr(2)` D-1360**; 
**allmain DEX timeout `u_wipe_engr(rnd(3))` D-1372**; 
**uhitm `do_attack` `u_wipe_engr(3)` D-1373**; **dothrow `throw_obj` `u_wipe_engr(2)` D-1374**; 
dig caller still named; altar/jello; yn add-to (same-type defaults append);
multi-turn dulling / marker ink occupation; Blind feel; 
full `surface`/`is_ice`; wipeout seeded path; `disturb_grave` from doengrave
(kick callers live); full `set_levltyp` beyond GRAVE typ; 
can_reach_floor Levitation is C youprop.h (H||E)&&!B (D-1070); 
**ustuck AT_HUGS + !sticks** (D-1071; local `mondata.c` `sticks`; sit-on-air reachable); 
**sticks export for dosit lap** (D-1072); 
**can_reach_floor ceiling_hider + Flying||MZ_HUGE** (D-1082); 
**Flying() ORs uprops[FLYING]** (D-1085; confer writes amulet extrinsic, never `EFlying`; 
worn `AMULET_OF_FLYING` skips check_pit); **can_reach_floor(check_pit) teeter/shaft** (D-1083; 
Flying/MZ_HUGE still skip); invent/pickup caller `trap&&is_pit` / `cant_reach_floor` pit-bottom / 
`display.js` `feel_can_reach_floor` clone / other `Flying()` clones still H/E-only named

### `src/pager.c` `do_look`/`dowhatis`/`dohelp`/`checkfile`

JS: `js/pager.js`, `js/getpos.js`, `js/dokeylist.js`, `js/generated/dat_text.js` — partial

**`/` whatis menu + getpos tip + invent/name/list branches
(itemed `/` cmdq_pop KEY skip-menu + `display_inventory` canned KEY D-1686;
`q` bells with menu kept per `process_menu_window` default arm D-1877);
`?` help + About `get_lua_version` nhlib shuffle; data.base/`dat/*` paging** (D-0077); 
**Rule #2: `readDat` from in-process `DAT_TEXT` (no Node fs)** (D-0477); 
**farlook `lookat` cmap stairs + DECgraphics floor/corridor describe** (D-0083); 
**`brief_at`/`describe_looked` blank S_stone before typ CORR** (D-0928 #1188; 
full do_screen_description cmap scan deferred); 
**`checkfile` NHW_MENU `process_text_window` + tabexpand/CR** (D-0085); 
**`look_all`/`look_engrs` NHW_TEXT more@23 + MAP coords/glyph + `look_shown_at` + 
statue/engr** (D-0087); **`doextversion` OPTIONS_AT_RUNTIME options/windowing/soundlib/Lua 
license** (D-0088); **NHW_TEXT `dmore` quitchars** (D-0089); 
**`show_text_pages` / fullscreen `show_nhw_menu_text` paint ≤cols−1** ≡ C `process_text_window` 
`++curx < cols` (D-0933; recording `get_configfile` path string still deferred — Constitution); 
**NHW_MENU putstr `show_nhw_menu_text` `dmore` quitchars** (D-0240; space/CR/ESC only); 
**`dowhatdoes` tip+`What command?`+`key2extcmddesc`** (D-0090);
**cmd.c `&` → `dowhatdoes` dispatch + export** (D-1855; IFBURIED|GENERALCMD,
ECMD_OK no turn; ALTMETA ESC-double + introff/intron named); 
**help `g` → `option_help`** (D-0091); **`dokeylist`/`domenucontrols`/`docontact` + 
default !num_pad binds** (D-0131); **`display_file` keeps intentional trailing blank** (D-0131); 
**`;` → `doquickwhatis`/`do_look(1)` + `look_at_monster` distant_monnam/asleep + 
putmixed no forced more** (D-0330); **`checkfile` ask via `yn_function` (NEED_MORE→more) + 
lookat parenthetical forces `found=1`** (D-0334); 
**`brief_at`/`describe_looked` tseen trap → `trapname`** (D-0424) + **trap-glyph `a trap (lookat)`** (D-1874; `do_screen_description` `:1220` first-match + didlook `:1611–1614` parenthetical; vibrating-square `an(x_str)` arm still deferred); 
**`describe_looked` DECgraphics wall ↔ swallow mid + Unicode │** (D-0425; 
trapped_chest/door + Hallucination + full showsyms cmap scan + SDOOR deferred); 
omit full `key2extcmddesc` misc/numpad; PORT_HELP; getpos menu-jump/hilite; lootabc true; 
look_traps format; invis/warning glyphs; custom BIND=/number_pad; 
selectable `process_menu_window` path; **`self_lookat` → `pmname(umonnum,Ugender)` not male 
`urole.name.m`** (D-0664) + **Punished `, chained to ` + `ansimpleoname(uball)`** (D-0928 #1149; 
steed/utrap deferred) + **`brief_at` CLOUD fog/vapor** (D-0811) + 
**`room_cmap_explanation` S_darkroom** (D-0812) + **blocked staircase down qstart** (D-0814); 
look_at_monster hallu/health/stuck/leashed/trapped; **howmonseen D-1562**; 
**`object_from_map` / `look_at_object` D-1524** (`pager.c:284–399`; fake SLIME_MOLD 
`spe = current_fruit` then mimic `MCORPSENM`; glyphotyp not integer glyph; 
`brief_at`/`look_all` live; doname_with_price/`doname_vague_quan` named — doname 
stand-in; cmap trapped-chest CHEST|LARGE_BOX is **D-1779**;
glyph_is_body|statue corpsenm named; **`that_is_a_mimic` D-1544** (`uhitm.c:6201–6276`; live `object_from_map` 
+ defsyms PCHAR desc + `MIM_OMIT_WAIT`; dynamic pager import); **getpos fakeobj 
D-1547** (`lookat` `glyph_is_object` → `look_at_object`; `map_object` stores 
otyp; gbuf monster wins over memory); **`mhidden_description` D-1554** 
(`pager.c:184–280`; PREFIX/ARTICLE/ALTMON/REGION; memory otyp vs glyph_at; 
self_lookat / look_at_monster / mstatusline / makemon appear / flash_hits_mon; 
dungeon.c surface ice/pool/altar named); `namefloorobj` still named; **`trap_description` + `trapped_chest_at`/`trapped_door_at` D-1779**
(`pager.c:164–181` / `detect.c:135–197`; the trap glyph stands in for
semi-real trapped chests and doors — real ttyp, not on `ftrap`; both
gates burn `rn2(20)` under Hallucination and `trapped_door_at` re-enters
`trapped_chest_at` for a doorless doorway, so chest-first order is RNG
order; live `js/detect.js` exports + `js/pager.js` `trap_description`)
then **lookat tnum = `glyph_to_trap(glyph_at)` D-1787** (`pager.c:718–721`
/ `display.h:671–674` / `display.c:2477`; dummytrap chest/door is a
trap glyph with no `ftrap`, so `t_at&&tseen` never entered the helper;
`brief_at` / `describe_looked` / `auto_describe_text` enter on
`glyph_is_trap` and pass that tnum; floor objects no longer beat a
trap glyph; `glyph_at_gbuf` clone deleted) then **`lookat` body D-1843**
(`pager.c:656–802` / `glyphs.c:199–231`; `glyph_is_unexplored` →
`"unexplored area"` vs cmap `S_stone` `!seenv` → `"unexplored"`;
`glyph_to_cmap` live; `brief_at` / `auto_describe_text` are lookat buf
+ blocked-stair rewrite) then **lookat cmap default `defsyms[]` D-1848**
(`pager.c:779–795` has no `S_room`/`S_darkroom` cases; DARKROOMSYM is
`newsym` `:1079–1096` so gbuf already holds `S_darkroom` / Rogue
`S_stone`; `room_cmap_explanation` is no longer a lookat arm);
Hallu
random_obj otyp / glyph_is_body|statue
corpsenm / buried-embedded suffixes named; **`look_traps` still
prints `trap at (x,y)`** (C `:2093–2094` uses `glyph_to_trap` +
`trap_description`); `doidtrap` unported; C TODO recursive/buried
containers named; **`do_screen_description` full cmap/symbol table**
(later owner after D-1843; ROOM parenthetical still uses
`room_cmap_explanation`) then **blank-sym collapse D-1854**
(`pager.c:1246–1627` looked `' '`: ghost + dark-room + unexplored + stone
+ air found=5 → prefix + "can be many things" + didlook lookat
"(unexplored area)"/"(unexplored)"/"(dark part of a room)", found=1;
full showsyms scan, terrainmode gating, moat double-add, warnsym/boulder
co-locate, override gotos, unreconnoitered/mon_interior still deferred)

### `src/getpos.c` `getpos` / `nhlua.c` `nhl_text`

JS: `js/getpos.js`, `js/jsmain.js` — partial

**hjkl cursor + `.` LOOK_TRADITIONAL + ESC**; 
**first-use tip via `paint_corner_nhw_menu` PICK_NONE loop** (D-0077/D-0082/D-0153); 
**NHW_MENU paints flush NEED_MORE first** (D-0195); **force unknown-direction pline** (D-0153); 
**curs after flush + `lookat` firstmatch autodescribe** (D-0083); 
**`HJKLYUBN`/`C(dir)` rush 8× + `truncate_to_map`** (D-0084); 
**terrainmode tip skip-`docrt` + space/CR quitchar → `Done.`** (D-0343); 
**`auto_describe` msg_given loop + TER_DETECT display-glyph lookat (`unexplored area` / mimic / 
shk)** (D-0390); **`cmap_defsym_explanation` furniture default** fountain/sink/throne/grave/iron 
bars (D-0928 #1174; S_altar align/high deferred); 
**`'>'`/`'<'` stairs/ladder + altar/furniture/trap/water feature scan** (D-0408/D-0818; 
two-pass from cursor; **`S_ss1` defsym `'0'` → Can't find…** D-0928 #1135; 
**`redraw_cmd(^R)`/`getpos_refresh` → `flush_screen` + `show_goal_msg`** D-0928 #1187; 
**blank S_stone before typ CORR** (`auto_describe_text`) D-0928 #1188 (full glyph_is_unexplored IDs 
deferred; full `docrt` Blind deferred; `redraw_map` body deferred); 
**`NHKF_GETPOS_SHOWVALID` `'$'` / `AUTODESC` `'#'` / `LIMITVIEW` / `MENU` / `MOVESKIP` before matching** D-1845 — default `#` never reaches tree/bars feature scan; matching[] defsyms (incl. `S_rslant` `'/'` → Can't find…; `S_ss1` `'0'` D-0928 #1135); `getloc_moveskip` glyph-skip; pick_chars LOOK_QUICK/ONCE/VERBOSE; `aAzZ` cycle; restore `u.dx`; 
`getpos_menu` / GFILTER_AREA flood / cmdq_pop start / `cmd_from_func` custom binds / mouse / do_run prefix still named); 
**`?` → `getpos_help` NHW_MENU + `show_goal_msg`** (D-0819; 
`cmd_from_func` custom binds named / **getpos_getvalid/hilite help lines + whatis multi-pick tail** D-1880; 
S_goodpos hilite glyphs / **mMoOdDxXaAzZ `gather_locs` cycle** D-0928 #1189 / D-1845 
(`getpos_menu` / GFILTER_AREA still named; 
**GLOC_INTERESTING / GLOC_VALID FALLTHROUGH D-1217**); 
**stairs terrain match requires `seenv`** (D-0779; blank `disp_ch` is not known); 
**`iflags.autodescribe` default On + stairs/ladder firstmatch** (D-0423); 
**lookat trap tnum `glyph_to_trap(glyph_at)` in `auto_describe_text`** (D-1787; was tseen `trapname` D-0424); 
**`auto_describe_text` ROOM/CORR/wall/STONE + `waterbody_name` moat/pool/lava/ice + 
Medusa/juiblex/samurai/waterlevel (D-0626/D-0928 #1163; 
**waterbody_name SURFACE_AT/`db_under_typ` D-1103**; 
DRAWBRIDGE_UP cmap still typ-gated vs C glyph S_pool; 
altar/engraving + coord_desc deferred) + **shown floor object → 
`look_at_object` / fakeobj D-1547** (`pager.c` lookat `glyph_is_object`; 
`map_object` stores otyp so remembered-gone piles fake; unsensed 
`M_AP_OBJECT` mappearance; displayed monster glyph wins over memory; 
`doname_with_price` / `doname_vague_quan` / buried-embedded suffixes 
deferred) + **`getpos_sethilite` force-newsyms + `flush_screen(0)` last-glyph curs** (D-0928 #1137; 
apply `display_*_positions` call `tmp_at` S_goodpos D-1051; 
getpos default Normal so paint on SHOWVALID) + 
**travel `"(no travel path)"` via `is_valid_travelpt`** (D-0809; TRAVP_VALID hero→dest D-0813; 
`getpos_getvalid` deferred) + **CLOUD → fog/vapor / cloudy area** (D-0811) + 
**ROOM → `room_cmap_explanation` S_darkroom when !cansee** (D-0812) + 
**blank S_stone via lastseentyp** (D-0813 travel; **D-0817** non-travel/`^T` too; 
TER_DETECT blanks stay unexplored; Rogue !waslit→stone; 
full glyph ID discrimination deferred) + **`maybe_blocked_staircase_down` qstart !ok_to_quest** 
(D-0814) + **DOOR → doorway/open/broken/closed door** (D-0815; 
drawbridge portcullis deferred) + **unknown-direction `visctrl(key)`** (D-0815; 
force-note `cmd_from_func` visctrl deferred); 
**`self_lookat_brief` gender via `pmname`/`Ugender`** (D-0664) + 
**Punished chained suffix** (D-0928 #1149); **`cmap_defsym_explanation` TREE → `"tree"`** (D-0665; 
iron bars/fountain/altar still deferred); 
omit hilite, `getpos_menu`, GFILTER_AREA flood, full `gs.showsyms` / `do_screen_description` / furniture mimic 
names, cmdq_pop at getpos start

### `src/version.c` `doextversion` / `nhlua.c` `get_lua_version`

JS: `js/pager.js` — partial

**first About/`#version` → nhlib `shuffle(align)`** (D-0077/D-0110); 
version/options text approximate; full OPTIONS_USED dlb parse deferred; 
**`doversion` / `'V'` versionshort live (D-1881)** — `mdlib.c` `mdlib_version_string` / `version_id_string` + `version.c` `version_string` / `getversionstring` in `js/version.js`, `doversion` in `js/pager.js`, `versionshort` EXT_CMDS runner in `js/getline.js`, `'V'` arm in `js/cmd.js`. Named: `bannerc_string`, `status_version`, `early_version_info`/`dump_version_info`, git-suffix data arms.

### `src/wield.c`

JS: `js/wield.js` — partial

**`dowield`/`ready_weapon`/`setuwep`/`welded`** + getobj letter/`-` (D-0065); 
**`wield_tool` for `#rub`/apply auto-wield** (D-0710; cantwield/bimanual+shield deferred); 
**`flags.pushweapon` → `setuswapwep(oldwep)` after successful `ready_weapon`/`setuwep` in 
`dowield`+`wield_tool`** (D-0928 #1167; no extra prinv — swap path's second prinv is 
`doswapweapon`); **`doswapweapon`/`setuswapwep`/`ammo_and_launcher`** (D-0069) + 
**`rhack` `'x'` → `doswapweapon`** + **`setuwep`/`setuswapwep` clear `twoweap` ≡ `setworn`** + 
**`ready_weapon` are/can_no_longer pline** (D-0913; 
cantwield ridiculous / full setworn / `#swap` deferred); 
**`Q`/`dowieldquiver`/`doquiver_core`/`setuqwep` + uswapwep/uwep ynq** (D-0152); 
**`empty_handed` gloves/humanoid** (D-0194); 
**`#twoweapon`/`dotwoweapon`/`can_twoweapon`/`set_twoweap`/`untwoweapon`** (D-0344; 
Yname2/body_part/Glib drop polish deferred); 
**`chwepon` glow/spe + strange_feeling + worm-tooth/crysknife** (D-0435) +
**artifact `restrict_name` faint-glow + Magicbane clue + unpaid `alter_cost` +
`costly_alteration` COST_DEGRD/DECHNT + weld `update_inventory`** (D-1692;
C `wield.c` `chwepon` `:991–997` / `:1036–1039` / unpaid+shop; callee
`artifact.c` `restrict_name` already D-1670; `is_art` not `u_wield_art`
clone #6; Hallucination `hcolor`; invent.c `useupall` / `obfree`;
local `Yobjnam2` vs objnam export named); omit `cantwield` poly, `cant_wield_corpse`, bimanual+shield weld pline body; **getobj ALLOWCNT D-1530**; **`finish_splitting`/`unsplitobj`/`clear_splitobjs` D-1560** (C `wield.c` `:345–351` + `dowield`/`doquiver_core` callers; `mkobj.c` `:554–629`; live local `finish_splitting` + `js/mkobj.js` + invent `freeinv`; ynq split-one/rest; gold partial; JS mergable owornmask dance); `Shk_Your` decline, `arti_speak` / setuwep Sunsword begin_burn; dothrow/apply/pickup/invent `unsplitobj` callers + allmain/mon `clear_splitobjs` still named; **`uwepgone` `artifact_light` `end_burn` + Tobjnam + 
gone-trio `update_inventory`** (D-1204); full `setworn` props; 
**`getobj_wield` SUGGEST weapons/weptools + `- ` prefix + compactify when suggested>5** (D-0457; 
`?`/`*` pickinv still deferred); **`body_part`** via `objnam.js`
`body_part_latebound` (do not import `polyself.js` — direct cycle).

### `src/do_wear.c`

JS: `js/do_wear.js` — partial

**`Boots_on` FUMBLE_BOOTS `incr_itimeout(HFumbling,rnd(20))` + 
sync `uprops[FUMBLING].intrinsic`** (D-0688/D-0689) + **SPEED_BOOTS `makeknown`→`exercise(A_WIS)` + 
`You_feel` speed up** (D-0744) + **`Gloves_on` GAUNTLETS_OF_POWER `makeknown` + 
FUMBLING `incr_itimeout`** (D-0783; DEX `adj_abon` deferred) + 
**`Cloak_on` PROTECTION `makeknown` + DISPLACEMENT `toggle_displacement`; 
no `find_ac`** (D-0783/D-0810; **`toggle_stealth` RIN_STEALTH/ELVEN_CLOAK/ELVEN_BOOTS on+off + 
`EStealth` mirror** (D-0970); Cloak_off DISPLACEMENT off; 
MUMMY/INVIS/OILSKIN/ALCHEMY + Boots_off SPEED/water/levitation deferred; 
**`nh_timeout` FUMBLING `slip_or_trip` D-0692**) + **`dotakeoff`** (D-0063) + 
**`getobj_takeoff` missing-letter `continue`+`--More--`** (D-0634) + 
**`getobj_takeoff` → `yn_function` leave `gt.toplines`** (D-0928 #1148; 
delayed `armoroff` has no `off_msg` until afternmv; 
`?`/`*` pickinv / `takeoff_ok` inaccessible still deferred) + 
**`dowear`/`canwearobj`/`accessory_or_armor_on`/`setworn`(no `find_ac`, ≡`worn.c` 
D-0810)/`Armor_on` + delay-0 `on_msg`/`unmul`** (D-0066) + 
**`dowear` `verysmall||nohands` → `"Don't even bother."`** (D-0928 #1124; 
no getobj) + **`on_msg` → `xname` + `obj_is_pname`?`the`:`an`** (D-0463; 
towel uses `"head"` not full `body_part`; 
`not_fully_identified` detail deferred) + **`doputon`/`Amulet_on` + ring-hand yn + 
amulet/eyewear put-on; GUARDING `makeknown`+`find_ac`** (D-0067/D-0810) + 
**`setworn`→`recalc_telepat_range`/`ETelepat`** (D-0669) + 
**`setworn(null,W_RINGL|R)` clears uleft/uright** (D-0699) + 
**ring put-on Glib/cursed-gloves/welded gates** (D-0699) + 
**`Amulet_on` RESTFUL_SLEEP `rnd(98)`→`HSleepy` TIMEOUT** (D-0494; 
`Amulet_off` clear + `nh_timeout` SLEEPY/fall_asleep deferred) + 
**`choose_ring_hand` → `yn_function(…, rightleftchars, '\0')` `[rl]`** (D-0421) + 
**`accessory_or_armor_on` ring `nolimbs`→cannot-stick ECMD_OK** (D-0928 #1104; 
poly/`body_part` wording; **query_menu `rightleftchars` D-1728**) + 
**`armoroff` `oc_delay`/`nomul`/`afternmv`/`suit_simple_name` mail** (D-0259) + 
**delay-0 no `find_ac` (≡C; stale botl until allmain — D-0883)**; 
**`destroy_arm`/`some_armor`/`obj_erode_type`** (D-0491); 
**`find_ac` in `u_init.js` — ARM_BONUS erosion + 
RIN_PROTECTION/AMULET_OF_GUARDING/HProtection/uspellprot** (D-0502; 
monster `find_mac` minvent worn ARM_BONUS/amulet of guarding + AC_MAX (D-1042, `worn.js`) + 
full HProtection wiring deferred); **`setworn` worn[] walk `oc_oprop` + `w_blocks` blocked + SWAPWEP/QUIVER skip
+ W_WEP weapon-class/`is_weptool` gate + `monstunseesu_prop` + `setuwep`/`setuswapwep`/`setuqwep`
call `setworn`** (D-1757; C `worn.c` `:72–145` / `w_blocks` `:38–44`;
`mondata.c` `cvt_prop_to_mseenres`; `wield.c` `:99–135`/`:275–289`;
Eyes `BBlinded`, mummy wrapping `BInvis`, cornuthaum `BClairvoyant`;
skin `W_ARM|I_SPECIAL`, nudist, tux_penalty, botl, `update_inventory`;
`cancel_doff` D-1766) +
**`setworn`/`takeoff` `oc_oprop` → `uprops[].extrinsic`** 
(D-0574; `u_can_regen` reads REGENERATION; artifact intrinsics D-1558);
**`Ring_on`/`learnring`/`adjust_attrib`/`Ring_off`+`float_down`** (D-0966; **`toggle_stealth`** D-0970; 
**`dosinkfall`/`stop_donning`** D-0976) + **BLINDED→`EBlinded` mirror** (D-0579); 
**`equip_ok` SUGGEST-only puton/wear/takeoff prompts + `cursed` boots/gloves/lenses plural + 
`Blindf_on`/`Blindf_off`** (D-0579; `inaccessible_equipment` / R remove_ok / **Punished `set_bc` D-1769**;
`toggle_blindness` `Sting_effects(-1)` D-1755) + **empty wear/puton getobj prompt `[*]` not `[*?]`** 
(D-0584; C `invent.c` `!buf[0]` → `" [*]"`) + 
**`set_wear` from `moveloop_preamble` → `Helmet_on` fedora Archeologist `change_luck(1)`** (D-0596; 
`Ring_on` body / initial `pickup(1)` deferred; **`poly_obj` `set_wear(obj)`** D-1510); 
**`dragon_armor_handling` + `Armor_on`/`Armor_off` + 
FAST `EFast` mirror / `Very_fast` uprops** (D-0636; 
gold `make_hallucinated`, red `see_monsters`, yellow `wielding_corpse`, arti_light burn deferred); 
omit amulet change/strangle/flying/breathing, ring Glib/cursed-gloves/weld, magic helms beyond 
fedora, weld/trap gates; **`doddoremarm`/`A` empty-worn You are not wearing anything (D-1185)**; 
**ggetobj takeoff D-1602** (`doddoremarm` TRADITIONAL `select_off` + `askchain`) + 
**`take_off` occupation D-1619** (`do_takeoff` + `takeoff_order` + `oc_delay`; 
cloak/suit extra; `Amulet_off` ESP/`RESTFUL_SLEEP`/`GUARDING`; drown/strangle/fly named) +
**`cancel_doff`** (D-1766; C `do_wear.c` `:1643–1659` skip `cancel_don` when
`I_SPECIAL` then `takeoff.mask &= ~slotmask`; `setworn`/`setnotworn` callers;
`doffing` `:1600–1640` accessory/wep `takeoff.what`; named: setnotworn
`monstunseesu_prop`/`update_inventory`) / **`menu_remarm` D-1630** (C `do_wear.c` `:3089–3138` MENU_FULL 
`query_category(WORN|ALL|UNPAID|BUCX)` then `query_objlist(SIGNAL_NOMENU|USE_INVLET|INVORDER_SORT)` 
PICK_ANY `is_worn`/`is_worn_by_type`; COMBINATION `ggetobj` combo; TRADITIONAL `'m'` retry -2/-3; 
callees `js/pickup.js`; `obj_to_glyph` display RNG / INCLUDE_HERO / ParanoidAutoAll named); 
full cloak/helm simple-name variants; **other `*_on` still call `find_ac` (C often does not — 
named)**

### `src/objnam.c` `readobjnam`

JS: `js/readobjnam.js`, `js/objnam.js` — partial

**wish subset:** prefixes + `name_to_monplus` dragon mail + `rnd_otyp_by_namedesc`/`wishymatch` + 
artifact_name + BUC/spe + oname (D-0064); **empty/null → `any:` wrpsym+`mkobj`** (D-0559; 
qualifier-only empty deferred); **`makesingular`+as_is + gold mksobj(FALSE) early-return + 
wizard oc_merge quan** (D-0862); **`simpleonames`/`ansimpleoname` statue/figurine bare type** 
(D-0928 #1139; ≡C `minimal_xname` corpsenm=NON_PM); 
**`makeplural`/`makesingular` `singplur_compound`** (`labeled`/`called`/`named`/…) (D-0928 #1140); 
**BALL `very ` when `owt>oc_weight` + doname `(chained|attached to you)`** (D-0928 #1141) + 
**`simpleonames`/`ansimpleoname` bare BALL never `very `** (≡C `minimal_xname` zeroobj owt; 
D-0928 #1149) + **`doname` FOOD `oeaten`→`partly eaten ` + `greased ` prefix** (D-0928 #1150) + 
**doname CORPSE `corpse_xname` CXN_ARTICLE|CXN_NOCORPSE + glob size/xname (D-1255)** + 
**doname EGG** `ismnum`+`(known||MV_KNOWS_EGG)` `pmnames[NEUTRAL]` + 
`spe==1` `(laid by you)` (D-1276) + **doname MEAT_RING** FOOD `goto ring` worn/+spe (D-1295); 
**wizterrainwish** furniture/liquid/ice/tree/bars/cloud/floor then `switch_terrain` (D-1279); 
**trap loop `maketrap` D-1289** (`str_start_is` + hole→`ROCKTRAP` + portal "to nowhere"; 
live `trap.js`); **door/wall D-1290**; **secret corridor D-1304** (CORR→SCORR); 
drawbridge/lava `pooleffects` still named; 
**doname candle `partly used` / lamp `(lit)` D-1308** (mksobj `age=20*oc_cost`); 
**doname CANDELABRUM `(n of 7)` D-1317**; **doname TOOL W_TOOL|W_SADDLE `(being worn)` D-1318**; 
**doname LEASH `(attached to …)` D-1319**; **doname POT_OIL `(lit)` D-1320**; 
**doname W_WEP/W_SWAPWEP/RING `body_part(HAND)` poly D-1321**; 
**doname W_WEP `!mrg_to_wielded` + AKLYS `"tethered to"` D-1322**; 
**`killer_xname` D-1335** (dokick kickobjnam + petrify; **eat choke D-1344**; 
**dozap self-zap D-1345**; **throwit `:1747` D-1346**; throw_obj `:147` / pickup/wield remaining); 
**warn_obj / artifact_light W_WEP `)` rewrite D-1347**; **`the()` CapitalMon D-1357**; 
**`the()` fruit_from_name + artifact_name D-1487** (named fruit takes `"the "` unless pname 
artifact; local artifact_name copy); **`fruit_from_indx` + xname FOOD SLIME_MOLD D-1511** 
(`spe`→fname; missing `"fruit"`; quan ick singular then plural; `init_fruit_chain` default 
fid 1; **fruitadd walker D-1520**; **doname_base slime-mold fake_arti D-1521** 
(`artifact_name(bp,0,FALSE)`; force_the `"the "` else no a/an; xname `:1011` 
the-strip); **reorder_fruit D-1522** (`objnam.c:521–554` `allfr[1+127]`;
forward TRUE rebuilds low-to-high; out-of-range/dup fid return unsorted;
impossible pline named — helper is sync; insight.c `#ifdef DEBUG` wizard
fruit dump still named); **bones `goodfruit` D-1523** (`bones.c:42–47`
`fruit_from_indx(-id)` then `fid=id`; savebones `:450–453` negate all
fids; `drop_upon_death` / resetobjs SLIME_MOLD arm; `savefruitchn`
fid>=0; getlev `oldfruit=loadfruitchn` then free; **restore.c `ghostfruit`
D-1541** (`:500–511` oldfruit fid→fname then fruitadd else; restobjchn
`:260–261` after next_ident; fruitadd else clone in bones.js — options
user path stays; impossible pline / age shift named)); **pager look SLIME_MOLD `spe` D-1524** (`pager.c` `object_from_map`
`:336–343` / `look_at_object`; fake `current_fruit` then mimic MCORPSENM;
getpos fakeobj is D-1547 / namefloorobj named / that_is_a_mimic is D-1544 / ghostfruit is D-1541); 
CHAIN erosion polish / other ball otypes deferred); 
**`readobjnam_parse_charges` `(N)`/`(R:S)` + wrp[] `wand of X` → oclass/actualn + 
wand `recharged`** (D-0507; named/called/labeled, o_ranges, glass, fruits, drawbridge (furniture 
D-1279; trap loop D-1289; **door/wall D-1290**; 
**secret corridor D-1304**), non-wizard spe clamps deferred); 
doname empty/wield/swapwep/potion/implicit-uncursed (D-0024); 
**`the_unique_obj`/`obj_is_pname` → `"the "` + Amulet uncursed skip** (D-0568) + 
**`xname`/`doname` `!nn && oc_uses_known && oc_unique` → `known=0`** (D-0872; 
gen table omits `oc_uses_known` — Bell/Candelabrum/Amulet/Book heuristic; 
CORPSE article skip D-1255; slime-mold fake_arti D-1521); **cleric skip `"uncursed "`** (D-0121); 
**Priest `xname`/`doname` force `bknown=1`** (D-0315); CORPSE `corpsenm` (D-0019); 
**COIN quan=1 `"a gold piece"`** (D-0037); 
**`Japanese_item_name` table** for Samurai discovery (D-0045); 
**Japanese display in doname/`obj_typename`/`disco_typename` + ya plural + quiver + 
rustproof** (D-0079); doname `named`; **`xname` `has_oname&&dknown` → ` named ONAME`** (D-0727; 
`obj_is_pname` bare-ONAME arm deferred); **`xprname` `dot` for prinv** (D-0070); 
**xname SCR/SPE/RIN/WAN `… of <actualn>` + bimanual `(weapon in hands)`** (D-0086); 
**xname POTION dknown+!nn → `<descr> potion` via `oc_descr_idx`** (D-0285); 
**xname AMULET dknown+!nn → `<descr> amulet` + Yendor/fake known arm** (D-0292); 
**xname WEAPON/VENOM/TOOL !nn → `OBJ_DESCR` (shared whistle)** (D-0305); 
**xname ARMOR !nn → OBJ_DESCR** (+pair/set/shield !dknown) (D-0325); 
armor_simple_name for called deferred; **xname WAND dknown+!nn → `<descr> wand` + 
mzapwand `dknown`** (D-0309); **xname SCROLL dknown+!nn → labeled/`<dn> scroll` (unlabeled blank 
paper)** (D-0312); **xname SPBOOK dknown+!nn → `<descr> spellbook`** (D-0321); 
**STATUE `of a <pm>`** (D-0087); **GEM `GemStone`/`xname`/`singular` + 
`obj_typename` stone** (D-0097); **armor gloves/boots `pair of` + dragon scales `set of` + LENSES; 
makeplural keeps singular pair** (D-0158); 
**`makeplural` C `one_off[]` irregulars (`foot`→`feet`) + fox→foxes / muskox→oxen** (D-0694; 
pronoun genders / already_plural ae/eaux / man→men / as_is collective / mongoose·slice deferred); 
**`just_an` letter+space (`aefhilmnosx`) + the-/lava/bars/ice** (D-0163); 
**doname `cknown`+`Has_contents` → `containing N item(s)`** via `count_contents` stacks (D-0395); 
**`vtense` bare singular + ends-in-s plural** (D-0403; 
full special_subjs/`of`/`from` polish deferred); 
**xname WEAPON `poisoned ` + doname strip/reinsert** (D-0418; 
`permapoisoned`/wet-towel/figurine deferred); 
**xname RING dknown+!nn → `<descr> ring` via `oc_descr_idx`; 
`nn`=`oc_name_known` only (not `obj.known`)** (D-0420); 
omit fruits/door/wall/drawbridge (wizterrainwish furniture D-1279; 
traps D-1289)/random/`o_ranges`/alt spellings/Japanese wish; SPE_NOVEL hallu polish; 
**`doname` W_WEP stack/ammo/missile/non-weptool → `(wielded)` else hand phrasing** (D-0661; 
`mrg_to_wielded` / AKLYS tethered D-1322; **warn_obj+artifact_light W_WEP paren D-1347**; 
ARMOR gloves `:1412` still named); **TIN xname only when `obj.known` + 
TIN/EGG `otyp_uses_known`** (D-0503; table still omits `oc_uses_known` bit); 
**`add_erosion_words` oeroded/oeroded2 degrees + rknown proofs** (D-0504; 
BALL/CHAIN + greased prefix deferred); **doname weptool→WEAPON `+spe` + 
TOOL/WEPTOOL charged list** (D-0631; lamp `(lit)` / candle `partly used` D-1308; 
candelabrum `(n of 7)` D-1317; W_TOOL worn D-1318; LEASH D-1319; POT_OIL `(lit)` D-1320; 
W_WEP `body_part(HAND)` poly still named); 
**tin_details tintxts/`homemade` when cknown+spe<0** (D-0505; 
non-display tin_variety/set_tin_variety + tinning kit deferred); 
SCR_MAIL/amulet uncursed exclusions; blanket `observe_object` in `xname`/`doname` when `!Blind && 
!distantname` + **prop Blind not sticky `u.Blind`** (FROMFORM molds; 
D-0928 #1180 / D-0716) + **`distant_name`** (D-0469; 
monmove callers / gameover o_id wipe deferred); 
**`doname` unpaid suffix + `paydoname` suppress_price** (D-0461; 
container paydoname rewrite D-1702 / `contained_cost` via unpaid_cost COST_CONTENTS); 
`doname_with_price` for-sale + **`record_price_quote`** (D-0460/D-0469); 
**box `locked`/`unlocked`/`broken`/`trapped` prefixes** (D-0464; `greased` prefix deferred); 
**`short_oname` + `simpleonames`/`thesimpleoname`** (D-0881; 
**`safe_qbuf` + `Yname2`/`ysimple_name`/`Ysimple_name2` D-1654**; 
apply/do_name/eat/invent/lock/mhitu/shk/trap callers named; 
pre-existing yname clones stay) + **`otense` export D-1544** (C `objnam.c:2531–2546`; 
Eyes `is_plural` named; pre-existing local clones stay) + **`yname`/`shk_your`/`the_unique_pm` (D-1045; 
`mon_owns` via `y_monnam`; `shk_owns` shop unpaid/floor costly deferred)** +
**`xname_flags` `xcalled` + gameover T_SHIRT/`apron_text`/`hawaiian_motif`/CANDY_BAR
(D-1802)** (`objnam.c:557` / `:971–996`; `read.c` `tshirt_text` `:99` /
`hawaiian_motif` `:189` / `apron_text` `:253` / `candy_wrapper_text` `:295` /
`erode_obj_text` `:88`; live in `js/objnam.js` — objnam→read/engrave is TDZ
on `_body_part`; `wipeout_text` late-bound from `engrave.js`; attrib
`ysimple_name` clone deleted so `from_what` uses exported `simpleonames`
not `cxname`). Named: xname article arms; `armor_simple_name` for called
(still `dn`); `find_artifact`; `releaseobuf`/PREFIX overflow paniclog;
`hawaiian_design` / doread shirt-apron-hawaiian; `obj_is_pname` goto nameit

### `src/invent.c` `hold_another_object` / `prinv` / `count_contents` / `assigninvlet`

JS: `js/invent.js`, `js/objnam.js`, `js/u_init.js` `assigninvlet`/`addinv` — partial

**`assigninvlet` preserves free a-z/A-Z invlet** (steal→`freeinv`→later `addinv` same obj; D-0688; 
`display_used_invlets` D-1591; pack-full NOINVSYM polish deferred); 
**artifact touch + addinv + prinv** (D-0064); 
**`hold_another_object` stay-in-invent → `encumber_msg`** (D-0863; 
flushes prinv `--More--` before makewish `ublesscnt`) + 
**drop_it Fumbling / `inv_cnt(FALSE)>invlet_basic` / encumbrance>`pickup_burden` → `dropx` or 
`hitfloor(FALSE)`** (D-1272; autoquiver on stay; cursed LOADSTONE skips burden drop; 
fatal wished corpse / artifact `dropy`+wasUpolyd+crysknife / perm_invent WIN_INVEN still named); 
**prinv `xprname(..., dot)`** (D-0070); **`observe_object` in invent_lines** (D-0079); 
**`observe_object` FIRST_OBJECT skip** (D-1713; C `o_init.c:441–451`;
generic/STRANGE_OBJECT `otyp < FIRST_OBJECT`; Hallu `youprop.h` not sticky
`u.Hallucination`; `discover_object` credit_hero FALSE); 
**`useup` / `useupall` / `obfree` / `useupf`** (D-1727 `useupall`/`obfree`;
D-1735 `useup` C `invent.c` `:1320–1333`; **D-1771** `useupf`
`:4762–4783` + eat.c `carried` hybrid; live `js/invent.js`;
`write.js` imports (no invent-splice); **`dealloc_obj` D-1743**
C `mkobj.c` `:2744–2811` / `dealloc_obj_real` `:2814–2827` /
`dobjsfree` `:2830–2843` / `dealloc_oextra` `:95–111`; callees
`light.c` `obj_sheds_light`/`obj_is_burning`; live `js/mkobj.js` +
`js/light.js`; `obfree`/`moveloop_core`/`savelev` JSON/`dosave0` +
mklev ROCK/book/mktrap_victim discards; **`delobj`/`delobj_core` D-1756**
C `invent.c` `:1429–1462` + `extract_nobj`/`container_weight` +
revive `delobj_core(,TRUE)`; **zap `delete_contents` D-1770**;
named: detect/potion/read/spell local useup clones, zap.js useupf
clone, shop addtobill/stolen_value, trap.js `delete_contents_chest` /
mklev.js `create_object_delete_contents`, nhl_gamestate leftover,
wizard `makemap_prepost` dobjsfree, invent Array vs nobj); 
**`prinv` total_of + `xprname` quan + `(N in total)`** (D-0388); 
**`count_contents`** nested/quan/everything (D-0395; shoppy `costly_spot` deferred); 
xname-path observe beyond invent; **`pickup_prinv` slight/moderate/near/overload + 
lifting/removing + `pickup_encumbrance`** (D-0456; 
**`lift_object` yn Continue? + telekinesis silent refuse** D-1050); 
**`addinv` merge → C `merged` age/quan/coin-`bknown=0` then known/bknown/rknown + 
invent compare-learn pline** (D-0879/D-0882; uses `mkobj.mergable`; 
quiver-prefer / worn-slot / oname / globby / `#adjust` `invent_merged` compare msg / addinv clear 
`how_lost` deferred)

### `src/do_name.c` `oname` / `docallcmd`

JS: `js/do_name.js` — partial

**artifact oname/`artifact_exists`** (D-0064); 
**`docallcmd` menu + `i`→getobj name_ok/do_oname** (D-0069/D-0928 #1147) +
**`'m'`/`'C'` `do_mgivenname`** (D-1638; getpos + visibility + `alreadynamed` +
`christen_monst`; `hacklib.c` `fuzzymatch`; swallow `disp_kind`; `apply.c`
`beautiful` export; `mhe` from fountain; SetVoice empty without SND_LIB) +
**`'d'`/`'\\'` `o_init.c` `rename_disco`** (D-1647; inv_order pack, no venom
append; `interesting_to_discover` C-home + `disco_append_typename` BUFSZ
truncate + `append_price_quote`; dummy `dknown`/`!oc_uses_known` then `docall`;
`oc_uses_known` extract named); 
**`'o'` getobj `"call"`** (D-1660; live `getobj` + `xname` dknown/`docall`;
#if 0 EXCLUDE is D-1682; `'i'` live getobj is D-1681);
**`'i'` getobj `"name"`** (D-1681; C `do_name.c` `docallcmd` `:566–569`
`getobj("name", name_ok, GETOBJ_PROMPT)` then `do_oname`; export
`name_ok` `:466–476` for `iactions.c` `item_naming_classification`;
deleted `getobj_name` clone; #if 0 EXCLUDE is D-1682);
**`docallcmd` #if 0 EXCLUDE / `silly_thing`** (D-1682; C `do_name.c`
`:581–585` compiled out; live `invent.c` `silly_thing` `:2093–2131`
Call Amulet / unknown fake `pline_The`; else `silly_thing_to`;
`getobj` GETOBJ_EXCLUDE; `canwearobj` noisy else `"wear"`;
`decl.c` `silly_thing_to`; OBSOLETE_HANDLING compiled out);
**artifact_name slip** (D-1670; `artifact.c` `restrict_name` + `do_oname`
`:331–357` `wipeout_text`/`rnd_on_display_rng` + literate++; canonical
Sting/Orcrist `otyp==objtyp`; `is_plural`+`safe_qbuf` prompt; wield
`restrict_name` is D-1692; `oname` via_naming livelog is D-1680);
**`oname` via_naming livelog** (D-1680; C `do_name.c` `oname`
`:371–426`; `literate++` `livelog_printf` LL_CONDUCT|LL_ARTIFACT /
LL_ARTIFACT; `new_oname`; uwep `set_artifact_intrinsic`; unpaid
`alter_cost`; `OBJ_INVENT` `update_inventory`; uswapwep `set_twoweap`;
`untwoweapon` You() named — oname stays sync; wield `restrict_name`
is D-1692);
**`docallcmd` cmdq_pop canned** (D-1671; C `:511–518` KEY skip-menu else
`cmdq_clear(CQ_CANNED)`; `:508–550` `flags.lootabc` acc + `if (gi.invent)`
i/o rows; export `cmdq_pop`/`cmdq_clear` `js/cmd.js`; iactions Call
pushkeys D-1675; `'i'` live getobj is D-1681; #if 0 EXCLUDE is D-1682);
**`docall`/`trycall` potion call → `oc_uname`** (D-0430) + **sink-fluid
`OBJ_DESCR` / `safe_qbuf` Call `docall_xname` `simpleonames` `"thing"`
(D-1672;** C `do_name.c` `:635–676` + `docall_xname` `:604–633`;
`objnam.c` `safe_qbuf` already D-1654; C `fromsink` overlays `corpsenm`;
invent `update_inventory` when `OBJ_INVENT` or carrying-walk;
**`undiscover_object` / `gem_learned` D-1691** (`o_init.c` `:497–523`
disco shift; `shk.c` `:3196–3231` unpaid gem `get_cost`; callees
`invent.c` `o_on` `:1586–1599` + `shk.c` `find_oid` `:2776–2804` /
`bp_to_obj` billobjs; `discover_object` moveloop GEM reprice +
`update_inventory`; `docall` empty-uname); `observe_object`
FIRST_OBJECT skip named); **`christen_monst` + tame `x_monnam` subset** (D-0079); 
**`Monnam`/`noit_Monnam` MGIVENNAME→bare** (D-0095); 
**`x_monnam` do_it `!canspotmon`→`it`** (D-0295; saddle adj kept); 
**`mon_nam` isshk → `shkname`** (D-0307); **`uhitm` imports shared `mon_nam`** (D-0308); 
**named `PM_GHOST` → `s_suffix`+`" ghost"`** (D-0329); 
**`distant_monnam_none` ARTICLE_NONE for farlook** (D-0330); 
**`distant_monnam_none` isshk → `shkname`** (D-0390); 
**`mon_pmname`/`pmnames` casing + `M2_PNAME` article skip** (D-0570; 
Wizard keeps `"the "` via !pname); **exported `pmname`/`Ugender` for hero self_lookat** (D-0664); 
**`Hallucination`/`rndmonnam`/`bogusmon` display RNG** (D-0838; 
invent/floor getobj/getpos bodies, invis adj/priest/`called`/`is_mplayer`/`AUGMENT_IT`, 
literate/shop deferred); **`hliquid` hliquids[] + display-rng** (D-0849); 
**`hcolor` hcolors[] + display-rng** (D-1135; 
Hallu or NULL pref → `rn2_on_display_rng(SIZE)` only, pref not last choice, gameover does not skip; 
drinksink case 4 Blind short-circuit); **`rndcolor`** (D-1147; 
always `rn2(CLR_MAX)` even when Hallu; Hallu → `hcolor(NULL)` display-rng; 
else `k==NO_COLOR` → `"colorless"` not table `"transparent"`; else `c_obj_colors[k]`; 
chest_trap `Blind ? ROLL_FROM(blindgas) : rndcolor()`; 
sit/apply/pray/detect/do/wield/read identity stubs still named); 
**exported `x_monnam` adjective/ARTICLE + `mon_nam`→`x_monnam`** (D-0850); 
**`x_monnam` remaining body D-1803** (C `do_name.c` `:826–1032` `nextmbuf`
ring / youmonst `"you"` / AUGMENT_IT someone/something hallu `rn2(2)` /
M_AP_MONSTER mappear / invis+saddle adjectives / is_mplayer `rank_of`+
`lcase` and `" the "` split / ARTICLE_A `just_an` not `an()` / M2_PNAME
+ Wizard `ARTICLE_THE`; `hack.h` EXACT_NAME 0x1F not SUPPRESS_NAME;
wrappers `l_monnam`/`some_mon_nam`/`Some_Monnam`/`YMonnam`/`noit_*`
through `x_monnam`; `hacklib.c` `lcase`; `objnam.c` `just_an` one/eu/uke/
unicorn/x-consonant; apply `l_monnam` + dothrow/mhitu/steal `Some_Monnam`
clones rebound. Priest/minion `priestname` D-1846 (`priest.c`
`:302–367` via `js/do_name.js`; hallu `halu_gname` pantheon RNG still named)); 
**`uhitm` live `a_monnam` D-1544**; **`namefloorobj` getpos + vobj_at / object_from_map + Hallu unames + call_ok D-1555**; 
**`domove` safemon swap → `x_monnam` ARTICLE + peaceful adj + frighten verb** (D-0889; 
**seemimic/pit/NODIAG/boulder D-1299**; `goodpos` / mintrap aftermath named); 
**`distant_monnam` ARTICLE_THE via `x_monnam` called** (D-1638);
**`mon_nam_too` `:1189–1216` + `monverbself` `:1219–1249` D-1790** — one
home each in `js/do_name.js`; the `js/mhitm.js` `is_neuter`/`female`
clone is deleted and its six uses rebound. `mon_nam_too` is `mon_nam`
for anyone but the monster itself, else the reflexive that
`pronoun_gender(mon, PRONOUN_HALLU)` picks — so it draws **`rn2(4)`**
while hallucinating (D-1776), and index 3 is the only way to reach
"themselves". `monverbself` builds
"<monnamtext> <verb> <othertext> <self>"; `vtense(selfbuf, verb)`
returning the verb **unchanged** is C's test that the reflexive stayed
plural, and only then is the subject run through `makeplural`. That
made C's `makeplural` pronoun block `objnam.c:2853–2869` a live callee,
so it is ported too (he/him/his of genders[0..2] → they/them/their,
first match wins — "it" hits `genders[2].he` before `.him`, "her" hits
`genders[1].him` — capitalised when the input was). **The genders[3]
arm `:1236–1244` is ported as C writes it, not as C's comment reads
it:** the comment expects "them" and wants "they", but makeplural
already returned "they" and this arm rewrites it to `genders[3].him`,
so a hallucinated steed reads "Them rouse themselves!" and a subject
that was already "They" becomes "Theys" (makeplural default `s`). Do
not "fix" either to "they". Live callers wired: `apply.c:1126` mirror
infravision ("… too far away to see **itself** in the dark.") and
`:1158` nymph admire, `muse.c:184` zap-self ("<mon> zaps himself with
<wand>!"), `steed.c:429` `kick_steed` rouse. Named: `muse.c` `mplayhorn`
`:218` self arm and fire-breath-on-self `:3145`, `uhitm.c:4168`
`pline_mon("%s hits %s.")` — no JS sites for those yet.

**`distant_monnam` astral PM_HIGH_CLERIC conceal D-1673** (C `do_name.c`
`:1178–1182`; `!Hallucination && Is_astralevel && !m_next2u`;
ARTICLE_THE `"the "` else bare; `female` priestess; pager
`look_at_monster` ARTICLE_NONE via `distant_monnam_none`; `mons()` is
a fresh object so `data.mndx`); **`lookup_novel` D-1651**
(C `do_name.c` `:1626–1661` aliases then table/`The` walk then IndexOk
miss; `SIR_TERRY_NOVELS` export from mkobj `noveltitle` home; callers
`readobjnam` SPE_NOVEL before `oname` ONAME_WISH + `create_object`
named `oname` ONAME_LEVEL_DEF); artifact_name slip is D-1670; cmdq_pop
canned is D-1671; sink-fluid/`safe_qbuf` is D-1672; `oname` via_naming
livelog is D-1680; `'i'` getobj `"name"` is D-1681; #if 0 EXCLUDE /
`silly_thing` is D-1682; `undiscover_object` / `gem_learned` is D-1691.

### `src/dokick.c`

JS: `js/dokick.js` — partial

`dokick` + `kick_dumb` (D-0031); `kickedloc` (D-0032); **`kick_ouch` → `losehp`** (D-0035); 
**`kick_door` CLOSED/LOCKED `rnl(35)` bust** (D-0104); 
**`kick_ouch`/`kick_dumb` → `set_wounded_legs` ATEMP(DEX)--** (D-0785; export from `trap.js`); 
**`dokick` `Wounded_legs` → `legs_in_no_shape` + `flush_topl_more`** (D-0786); 
**`dokick` no_kick poly/steed/lizard/uinwater/utrap/boulder D-1362** (`:1265–1310`; 
`kick_steed` callee; steed `by_steed` / `monverbself` vtense / swallow+pit-brace+Lev after getdir 
still named); **`maybe_kick_monster`/`kick_monster`/`kickdmg` + `martial()`** (D-0706; 
**`kickdmg`→`check_caitiff`** D-0928 #1100; **poly AT_KICK D-1310**; 
**kickdmg `special_dmgval(W_ARMF)` D-1332**; **`maybe_mnexto` evade D-1336**; **`kickstr` D-1343**; 
**`kickdmg` `abuse_dog`/`monflee` D-1349**; **martial knockback D-1350**; 
**`dokick` `wake_nearby(FALSE)` D-1358**; **`dokick` `u_wipe_engr(2)` D-1360**; 
**`kick_ouch` drawbridge `find_drawbridge` remap D-1361**; 
**`kick_ouch`/`kick_dumb` air/Lev `hurtle` D-1370** (`:876–877` `rn2(2)` range 1; 
`:904–905` `rn1(2,4)`; youprop `(H||E)&&!B`; losehp noreturn skip); shop-town watchman deferred; 
dokick monster recoil / `kick_object` air `hurtle` still named); 
**`kick_nondoor` SDOOR/SCORR + altar/fountain/grave/bars/sink** (D-0985); 
**throne/`fall_through` + tree scatter/swarm** (D-0986); 
**`ship_object`/`impact_drop`** (D-0984/D-0961); **`obj_delivery`** (D-1177; 
`goto_level` FALSE after placebc / TRUE after `check_special_room`; XOR WITH_HERO; 
`obj_extract_self` OBJ_MIGRATING; `deliver_obj_to_mon` D-1193 makemon DF_NONE; 
**`mksobj_migr_to_species` / stolen_booty D-1363**; 
**`mon_arrive` MIGR_LEFTOVERS DF_ALL D-1505**; add_to_minv merge D-1492; minetn-1 D-1490; wizkit FALSE D-1192); 
**`kick_object` + `bhit` KICKED_WEAPON** (D-0988) + 
**`really_kick_object` snuff_candle after extract before bhit D-1325** (candles/candelabrum only, 
not snuff_lit; throwit land D-1333; mthrowu `:942` D-1334) + 
**`kick_object`/`instapetrify` `killer_xname` D-1335** (`objnam.c:1942`; eat D-1344; dozap D-1345; 
throwit D-1346; throw_obj `:147` / pickup remaining callers named; 
kickstr is D-1343) + **`impact_disturbs_zombies` TRUE after place** (D-1229; 
obstructed-loose + land); **Is_box `container_impact_dmg`/lock/lid/`chest_trap` + 
`ghitm`** (D-0989; **gas `Blind`/`rndcolor` D-1147**) + 
**`ghitm` `hidden_gold(TRUE)` D-1751** (`dokick.c` `:361` vault.c helper not a kick clone; 
caller `throw_gold` `:2712`; zap.c `miss`; **SetVoice D-1752** shk/priest/gd/merc) + 
**`dropz`/`throwit` `container_impact_dmg`** (D-1249); **`hits_bars`/`hit_bars`** (D-0990; 
costly_gold, barefoot petrify, tmp_at flash deferred)

### `src/hack.c` `losehp`/`nomul`/`spoteffects`/`overexertion`/`dopickup`/`domove`/`trapmove`/`
test_move`/`moverock` / `timeout.c` `fall_asleep` / `pickup.c`

JS: `js/hack.js`, `js/pickup.js`, `js/cmd.js`, `js/mon.js`, `js/monmove.js` — partial

**`domove` `u_rooted` when `youmonst.data.mmove==0`** (brown mold etc.; 
spend turn, no step) (D-0928 #1106; Is_airlevel/Is_waterlevel "in place" deferred — Levitation 
alone); **`domove_core` ParanoidTrap → `avoid_trap_andor_region`** (D-1187; 
C `hack.c:2515–2581` / `:2825–2828` after rooted before `u.utrap`; 
`into_vs_onto` + `immune_to_trap` hero MAGIC_PORTAL `TRAP_NOT_IMMUNE`; silent TEST_MOVE subset; 
gas-region yn; Hallu `rnd(TRAPNUM-1)`; **full `test_move` Passes_walls·squeeze / FIRE invent-burn / 
POLY `resists_magm` still named**); **`domove` swallowed → `u_on_newpos(ustuck)` + 
attack engulfer** (D-0833; skip impaired/`m_at` walk; 
air_turbulence/slippery_ice/escape_from_sticky still deferred; 
**`water_friction`/`water_turbulence` D-1800**); 
**`domove_core` `water_friction` via `water_turbulence` +
`avoid_running_into_trap_or_liquid` + `domove_fight_ironbars`/`domove_fight_web`
+ remaining `mention_walls`** (D-1800; C `mkmaze.c:1688` /
`hack.c:2364` / `:2443` / `:2493` / `:1995` / `:2020` / `:2585` /
testdiag doorway; JS `js/hack.js` + `js/cmd.js` `domove`;
Swimming inlined not clone #3; `uwep_skill_type`/`u_wield_art` inlined;
`weapon_descr` exported from invent.js; named: lookaround,
air_turbulence, slippery_ice_fumbling, escape_from_sticky_mon,
`Known_wwalking`/`Known_lwalking`, autodig/tunnels chew rock/ooze/`worm_cross`,
`exercise_steed`, Blind `feel_location` on obstacles,
full `back_to_glyph`/`wall_angle` bump text); 
**`domove_core` `carrying_too_much` before attack** (OVERLOADED collapse / low-HP>SLT stamina; 
air-level exempt) (D-0928 #1117); **`domove` `u_maybe_impaired`/`impaired_movement`/`confdir`** 
(D-0437; Confusion `!rn2(5)` + Stunned; tunnels/`passes_walls` in bad_rock deferred); 
**`domove_fight_empty` always `unmap_object` + optional boulder/statue `map_object` + 
`newsym`** (D-0928 #1166; was I-glyph-only; **fight_empty explum(null) D-1265**; 
**fight_empty `glyph_at` + `unmap_invisible` after empty D-1774**; 
dig-with-pick/Underwater/Hallu statue/ansimpleoname deferred); 
**`domove` run-into-visible non-safemon stop** (`context.run` + 
`mon_visible`/`sensemon`/`M_AP_*` → `nomul`+`move=0` before attack) (D-0440; 
displacer/`bump_mon`/mundetected Wait!/Blind_telepat/Protection_from_shape amulet deferred); 
**`domove` `u.utrap`→`trapmove` before test_move** (D-0401; BEARTRAP Norep+`rn2(5)`/diagonal; 
WEB/PIT/LAVA/INFLOOR partial; steed/Sting/`climb_pit`/buried-ball deferred); 
**`losehp` !Upolyd / Upolyd mh subtract** (D-0035); 
**fatal `losehp` → `_losehp_needs_done` + noreturn contract via `finish_losehp_done`** (D-0255); 
**fatal `losehp` leaves negative `uhp` (no clamp); `done` zeros after `bot`** (D-0320); 
**`nomul`/`unmul` + afternmv** (D-0066) + **`nomul`/`unmul` `usleep=0` + nomul `uinvulnerable=FALSE`** (D-1797;
C `hack.c:4166–4167` / `:4197`; `fall_asleep` restamps after `nomul`; named: Upolyd `"You survived that "` form `:4192–4194`) + **`nomul` clears `_cmdq_canned`** (D-0710; 
≡C `cmdq_clear`) + **`unmul` treats `nomovemsg==""` as no pline (not default)** (D-0695; 
fumbling `timeout.c`); **`fall_asleep`/`usleep`/`nomovemsg`** (D-0156); 
**`overexertion`→`gethungry`+`overexert_hp`** (D-0107/D-1003); 
**`monster_nearby`/`noattacks`** (D-0228; **`canspotmon` not `cansee`** D-0928 #1097; 
onscary deferred); **`domove`→`spoteffects`→`pickup`/`check_here` when `!flags.pickup`** (D-0095); 
**`check_special_room`/`move_update`/`in_rooms` + shop enter** (D-0307) + 
**special-room enter plines ZOO/SWAMP/COURT/MORGUE/… + rtype→OROOM wake `rn2(3)`** (D-0660; 
furniture_present throne / BARRACKS monstinroom / DELPHI / room_discovered / wake_msg text 
deferred); **`,` → `dopickup`/`pickup_checks`/`pickup_object`/`pick_obj` one-object AUTOSELECT** 
(D-0192) + **`pickup_checks` furniture/pool/lava/swallow D-1838** (C `hack.c` `:3788–3872` throne/sink/grave/fountain/open-door/altar/`STAIRS`/`There`; `dopickup` `:3876–3892` `-2` `loot_mon`; named: dungeon.c `surface`) + **multi `query_objlist` PICK_ANY** (D-0365) + **`INVORDER_SORT` class headings + 
prompt ATR_INVERSE** (D-0384) + **floor `query_objlist` `sortloot(SORTLOOT_LOOT|PACK)`** (D-0405) + 
**PICK_ANY `@`/`./`-` MENU_INVERT/SELECT/UNSELECT_ALL** (D-0406; 
SKIPINVERT/page invert/search deferred; FEEL_COCKATRICE look_here abort is D-1599;
loot_classify subclass / count-N deferred; **floor TRADITIONAL `query_classes` D-1620**) + **`:` `container_contents` `sortloot` + 
`add_to_container` merge / corpse `spe` gender** (D-0383; 
nested/identified discover deferred; **`observe_quantum_cat` D-1535**); 
**`autopick_testobj` + `O`/`@` doset_simple/dotogglepickup** (D-0368; 
full allopt / exceptions / costly_spot / thrown·stolen filters deferred) + 
**autopick end `check_here(n_picked>0)` + run nomul** (D-0387; hideunder/newsym_force deferred); 
**`pickup` multi/`!pickup`/`notake` one gate + incapable pline** (D-0928 #1127; 
unconscious skip deferred); **`pickup_object` gold `disp.botl` before pick/prinv** (D-0393); 
**`pickup_prinv`→`prinv` count/total_of** (D-0388); 
**`#loot`/`doloot`/`doloot_core` D-1837** (C `pickup.c` `doloot` `:2166–2174` `loot_reset_justpicked`; `doloot_core` `:2178–2346` lootcont + lootmon `get_adjacent_loc("Loot in what direction?")`; `loot_mon` `:2430–2481` saddle + swallowed pickup; `lock.c` `doopen_indir` `:808–811` `u_at`/`dz>0` → `doloot`) + **`do_loot_cont` locked autounlock + `use_container` `:` look + 
MENU_FULL take-out** (D-0362/D-0489/D-0490) + **`doloot` capacity+nohands + 
`use_container` `u_handsy`** (D-0726; **`able_to_loot` freehand `body_part(HAND)` D-1508**; Confusion reverse_loot named) + 
**`use_container` `'r'` reversed put-in then take-out D-1567** (C `pickup.c` `:3132–3210` `loot_in_first`; TRADITIONAL yn_function + `explain_container_prompt`) + **MENU_TRADITIONAL `traditional_loot` + `askchain` D-1581** (C `pickup.c` `:3229–3261` `query_classes`/`askchain`/`in_container`/`out_container`/`ck_bag`; `invent.c` `askchain` `:2376–2541`; callees `collect_obj_classes`/`add_valid_menu_class`/`allow_category`/`sortloot` INVLET; `drawing.c` `def_char_to_objclass`; `hacklib.c` `highc`; `topl.c` yn `#`; ggetobj takeoff/identify is D-1602; floor pickup `query_classes` is D-1620; mbag explosion body named) + 
**floor TRADITIONAL `query_classes` D-1620** (C `pickup.c` `pickup` `:793–891` `There` + `query_classes` `:140–262` then yn/pickup_object; `'m'` `query_objlist` allow_all/-3 `allow_category`; ynaq/ynNaq default `'y'`; `count_unpaid` nobj; hideunder/`newsym_force`/engulfer minvent traditional; **`safe_qbuf` D-1654**) + 
**`safe_qbuf` D-1654** (C `objnam.c` `:5623–5698` QBUFSZ-1 + `short_oname` then lastR; pickup `:852` Pick up / `:1774` Continue? / `:3077–3082` Do what with + empty Yname2 / `:3607` tip; `decl.h` `something`; lift container `"removing"` named; apply/do_name/eat/invent/lock/mhitu/shk/trap named) + 
**`in_or_out_menu` more_containers `n` D-1592** (C `pickup.c` `in_or_out_menu` `:3397–3477` `'n'` loot-next `MENU_ITEMFLAGS_SELECTED` + Space/Return default; `use_container` `:3091` pass-through; `do_loot_cont` `:2161` `cindex<ccount`; `doloot_core` `:2217–2273` `container_at` + num_conts>1 PICK_ANY `"Loot which containers?"`; `'q'` `abort_looting` vs `'n'` continue; ggetobj takeoff/identify is D-1602; floor `query_classes` is D-1620; mbag explosion / PICK_ANY @ invert / >26 / lootcont→lootmon empty-pick named) + 
**`doloot_core` lootmon `get_adjacent_loc` + `loot_mon` saddle D-1837** (C `pickup.c` `:2296–2344`; Confusion reverse_loot named; multi-cont is D-1592); 
+ **`#untrap`/`could_untrap` nohands gate** (D-0726; door force D-1495; floor `untrap()` named); 
**`domove` diagonal `test_move` intact-doorway ban + `doorless_door`** (D-0219) + 
**`m_at`/`do_attack` before closed_door/testdiag/blocksMove** (D-0372; 
run-into-visible stop D-0440; displacer / bump_mon / mundetected Wait! deferred); 
**`blocksMove` → `IS_OBSTRUCTED`+IRONBARS+closed DOOR** (D-0231; SDOOR/SCORR/TREE); 
**`test_move` IRONBARS `passes_bars` D-1270** (C `hack.c:1024–1036` Passes_walls \|\| 
`passes_bars(youmonst.data)`; DO_MOVE rust/corr/metallivore `still_chewing`; 
Underwater / generic rock Passes_walls / tunnels / autodig still named); 
**`mention_walls` obstructed bump pline** (D-0354; wall/tree/solid stone/bars;
**OOB `move_out_of_bounds` + testdiag doorway + run-into-trap/liquid D-1800**); 
**`test_move` run>=2 boulder `pline_dir`** (D-1226; 
C `hack.c:1216–1221` / `could_move_onto_boulder` 145–163; DO_MOVE+mention_walls; TEST_MOVE silent; 
Passes_walls skip; cannot_push squeeze D-1239; **cannot_push giant pickup/maneuver D-1253**; 
**nopick m-dir over/against D-1262**); **`moverock`/`dopush` clear-dest boulder push + 
STR exercise** (D-0238) + **monster-behind `You_hear`/`canspotmon` + `closed_door` vain + 
dopush `unmap` I** (D-0317; shop/trap/`unmap_object` trap·engr deferred; 
**cannot_push squeeze + `sokoban_guilt` D-1239**; **cannot_push giant pickup/maneuver D-1253**; 
**nopick m-dir over/against D-1262**; **Blind unseen feel D-1281**; **next_boulder D-1294**; **Sokoban diagonal won't-roll D-1859**; 
verysmall vain / dopush·cannot_push_msg / Levitation Blind feel_location still named) + 
**`disturb_buried_zombies`** (D-1214; C `hack.c:1798–1813` peek+stop+`max(1,t*2/3)` on buried 
CORPSE ZOMBIFY_MON 3×3; rumble `moverock`; 
tread after run-stop `!Lev&&!Fly&&!Stealth&&cwt>=WT_ELF/2`; `wake_nearto_core`; 
grounded `MMOVE_MOVED`; `timeout.c` `peek_timer`; **`impact_disturbs_zombies`** (D-1229; 
C `hack.c:1787–1794` `owt<(violent?10:100)||is_flimsy` then disturb ox,oy; 
dropz / throwit `!IS_SOFT` / kick obstructed-loose+land; 
**dropz/throwit `container_impact_dmg` D-1249**; **hitfloor `dropz(TRUE)` D-1263**; 
local wake_nearby clones still named; **`domove` hideunder after tread** (D-1245; 
C `hack.c:2949–2951` `hides_under||S_EEL||dx||dy` then `hideunder(&youmonst)` writes 
`u.uundetected`; **mimic `m_ap_type` unhide D-1260**; 
C `hack.c:2953–2960` `(dx||dy)&&(U_AP_TYPE==OBJECT||FURNITURE)` → `m_ap_type=M_AP_NOTHING` not 
`seemimic`; **`display_self` U_AP_TYPE D-1275**; 
**swap-with-pet `seemimic` D-1299** (C `hack.c:2098–2224` park 
ux0/`mundetected=0`/`M_AP_TYPE`→`seemimic` before pit/NODIAG/boulder/mtrapped/mundisplaceable; 
`handle_tip(TIP_UNTRAP_MON)`; cmd occupy then swap, hider skip); 
bump_mon `stumble_onto_mimic` / `goodpos` origin / minliquid·mintrap aftermath still named))) + 
**`test_move` tight-diag `cant_squeeze_thru` after dest obstacles (Sokoban case 3 / load / 
bigmonst; hero Passes_walls + `inv_weight()+weight_cap()`)** (D-0803; 
`can_fog` exemption / hero `worm_cross` deferred); 
**`spoteffects` skips pickup when `in_steed_dismounting`** (D-0220); 
**`spoteffects` IS_SINK+Levitation → `dosinkfall` + `ELevitation` mirror + 
`stop_donning`** (D-0976); **`hack.c` `switch_terrain` Lev/Fly FROMOUTSIDE (D-1129; 
teleds dest-typ gate; **`classify_terrain` D-1151**; **`dissolve_bars` `u_at` D-1259**; 
**`set_uinwater` D-1267**; **`spoteffects` dest-typ D-1268**; **`digactualhole` PIT/HOLE D-1269**; 
**dothrow hurtle D-1277**; **`u_on_rndspot` D-1278**; **objnam wish D-1279**)**; 
**`hack.c` `invocation_message` / `invocation_pos` (D-1141 teleds after `spoteffects`; 
**D-1150** walk `domove` after `vision_recalc(1)` / `hack.c:2973`; 
**D-1154** `mkmaze.c` `pick_vibrasquare_location` / hellfill VS / occupied invocation_pos; 
apply.js clone / dungeon.c `Invocation_lev` export still named)**; 
**`domove` walk `in_out_region` after `drag_ball` before occupy (D-1157; C `hack.c:2866–2868`; 
gas NO_CALLBACK never rejects; REG_HERO_INSIDE; `is_hero_inside_gas_cloud` now the bit; 
dothrow `hurtle_step` D-1165; do.c `goto_level` D-1166; 
`run_regions` hero `inside_f` `hero_inside` bit D-1169; 
`region_danger`/`region_safety` still geometric)**; 
**`domove` youmonst `m_postmove_effect` after occupy before steed mx/my (D-1167; 
C `hack.c:2877` / `monmove.c` 672–683; Hezrou/Steam trail at `u.ux0`; helper `is_u`; 
**`allmain.c` once-per-input `m_everyturn_effect(&youmonst)` fog at `u.ux` (D-1175)**; 
**`spoteffects`→`dotrap` (non-pit pickup then trap)** (D-0239) + 
**`spoteffects` recursion / `in_lava_effects` / lev timeout `rn2(2)` /
Warning ice / hidden-mon+piercer surprise** (D-1799; C `hack.c:3311–3462`;
`incr_itimeout_HLevitation` / invent `Blind` exports; named: pooleffects
leave-water / Wwalking / steed / ceiling_hider; `failing_untrap` writer
`trap.c` `move_into_trap`; helm_simple_name clones) + 
**`dotrap` `!undestroyable_trap` skips seen-escape `rn2(5)`** (D-1188; 
MAGIC_PORTAL/VIBRATING_SQUARE never escape; plunge/conj_pit/adj_pit still named); 
`maybe_half_phys` identity until Half_physical prop; **`losehp`→`maybe_wail`** (D-0928 #1153; 
`finish_maybe_wail` after drag_down/stair-fall; 
Wizard/Elf/Valkyrie power-count + Soundeffect deferred at other losehp call sites still need 
`finish_maybe_wail`); omit `showdamage`/`done(DIED)` bodies (monster kills use `done_in_by` 
D-0190); fulll `end_running`/`cmdq_clear`; 
**`overexert_hp` + melee `overexertion` HVY_ENCUMBER** (D-1003); pool/trap/sink; 
**`describe_decor` mention_decor** (D-0356; D-1835 Fumbling defer / waterhere `waterbody_name` / ice `Norep` / `back_on_ground` / `force_decor` / `deferred_decor` timeout catch-up; 
**`waterbody_name` Medusa/juiblex/samurai/ICE/waterlevel** D-0928 #1163; 
**SURFACE_AT/`db_under_typ` D-1103**; ice_descr / `dfeature_at` ice/pool/lava/throne/drawbridge still named); 
Passes_walls/autodig/chew; Blind `feel_location`/`autopick` arms; 
full `back_to_glyph`/`wall_angle`→S_stone / OOB mention_walls; floor TRADITIONAL query_classes is D-1620 (hideunder/newsym_force/engulfer minvent traditional; `safe_qbuf` is D-1654); 
**`pickup_object` telekinesis / `lift_object` / `carry_count` / scare raise-vs-pick / corpse 
remote** (D-1050); shop bill; **Sokoban boulder `body_part(HAND)` D-1508**; LOADSTONE/giant-boulder weight override / ghostly / container 
`delta_cwt`; furniture nothing msgs; engulfer loot_mon; Deafness/Hear_again; Rogue `doorless_door`; 
shop `block_door`/`block_entry`; full `test_move` NODIAG/boulder 
**`swim_move_danger`/`handle_tip(TIP_SWIM)` + `m`→nopick; 
`pooleffects`→`drown`/`lava_effects`→`done(BURNING)`** (D-0357; Known_wwalking, full invent burn); 
**`is_lava` DRAWBRIDGE_UP+`DB_LAVA`** (D-1077); 
**`is_pool`/`is_moat` DRAWBRIDGE_UP+`DB_MOAT`** (D-1090; C `dbridge.c`; 
juiblex MOAT is pool not moat; `mfndpos` uses shared `is_pool`; 
**`goodpos` `is_pool()`/`is_lava()` D-1091**; 
**`waterbody_name` SURFACE_AT / `db_under_typ` D-1103**; `covers_objects` `IS_POOL` still named; 
`hideunder` is_pool/is_lava D-1131)

### `src/end.c` / `src/bones.c` / `src/rip.c` / `src/topten.c` / `src/do.c` Tourist XP

JS: `js/end.js`, `js/bones.js`, `js/rip.js`, `js/topten.js`, `js/getline.js`, `js/do.js`, 
`js/invent.js`, `js/insight.js`, `js/dungeon.js` — partial

**`done_in_by`→`done`→`really_done` + `can_make_bones` depth rn2** (D-0190) + 
**wizard≡`flags.debug||flags.wizard`** (D-0576); 
**`flush_topl_more` + possessions `disclose` yn** (D-0216); 
**`disclose:` → `end_disclose[]` + `should_query_disclose_option('i')`** (D-0288; 
`-i` skips invent yn); **`disclose` attributes/vanquished/genocided/conduct/overview** (D-0358; 
gameover `enlightenment` BASIC\|MAGIC + `init_mapseen` + overview `(end)`); 
**`genl_outrip` + Goodbye/death summary NHW_TEXT + score before bones** (D-0289); 
**Tourist `more_experienced(depth)` on new `goto_level`** (D-0289); 
**`goto_level` `assign_level(&u.uz0,&u.uz)` reset after Tourist XP** (D-1188; C `do.c:1967`; 
later same-level portal steps are not landing); 
**`goto_level` getlev syncs `g.Sokoban` from level flags** (D-0557); 
**`goto_level` no post-`docrt` `vision_recalc(0)`** (D-0851; C only inside docrt); 
**`goto_level` Punished `unplacebc`/`placebc`** (D-0915; 
Blind glyph/`maybe_unhide_at`/waterlevel swallow still deferred); 
**`goto_level` `(void) in_out_region(u.ux,u.uy)` after check_special_room before pickup** (D-1166; 
C `do.c:1981`; void — do not abort the level change; `obj_delivery` D-1177; 
`fix_shop_damage` D-1178; `do_fall_dmg` D-1179; `kill_genocided_monsters` D-1190 after losedogs; 
`run_timers` D-1191 after kill_genocided before u_collide_m; 
`notice_mon_off`/`notice_mon_on`/`notice_all_mons(TRUE)` D-1194 after uz0 reset before 
print_level_annotation; `reset_glyphmap` / vision_recalc `notice_all_mons` still named; 
newgame wrap D-1200); **`goto_level` `obj_delivery`** (D-1177; 
C `dokick.c` 1769–1851 / `do.c:1815` FALSE + `:1978` TRUE; XOR WITH_HERO; 
`obj_extract_self` OBJ_MIGRATING; `deliver_obj_to_mon` D-1193; wizkit FALSE D-1192; 
`run_timers` D-1191; `kill_genocided_monsters` D-1190); 
**`goto_level` `fix_shop_damage` catchup** (D-1178; C `do.c:1985–1986` `!new` after in_out_region; 
callee `shk.c` 4849–4874 / `repair_damage` catchup; 
`shk_fixes_damage` / allmain/bones still named); **`goto_level` `do_fall_dmg`** (D-1179; 
C `do.c:1805–1809` falling + `:1988–1994` `d(max(dist,1),6)` after shop repair before pickup; 
Punished `ballfall` is **D-1778** (C `ball.c:42–67`: `gets_hit` `rn2(5)` is drawn 
**before** `ballrelease`, and short-circuits when the ball is on the hero's spot or wielded; 
`rn1(7,25)` capped to 3 by `hard_helmet`); callers were dead behind sticky 
`u.Punished` until **D-1786** gated on `u.uball` (C `youprop.h:77`); 
W-tower `u_on_rndspot` bit 2 still named); 
**`goto_level` climb `great_effort` = Punished&&!Levitation + Flying ladder "along" + 
`u_locomotion`** (D-0928 #1159; poly `locomotion()` / steed-flyer Flying deferred); 
**`goto_level` savelev/getlev persist `lastseentyp`** (D-0928 #1160); 
**`goto_level` `save_timers(RANGE_LEVEL)`/`restore_timers`** (D-1037;
peel local object/spot timers so off-level HATCH_EGG/rot/burn/melt do not fire;
**`save_light_sources(RANGE_LEVEL)` + `billobjs` stash + `update_mlstmv` +
`forget_temple_entry` on ordinary leave (D-1695)**; pack lamps stay RANGE_GLOBAL;
**LS_MONSTER locality is light.c `mx > 0` not timeout.c migrating/mydogs
(D-1708; same predicate in JSON `snapshotLocalLights` /
`snapshotGlobalLights`)**; **`update_mlstmv` `iter_mons` skip
DEADMONSTER/`mon_offmap` (D-1709)**; **`cant_go_back` FREEING vs
WRITING|FREEING (D-1722; JSON `delete_levelfile` stash drop +
`remdun_mapseen` notreachable + `discard_migrations`; not binary
NHFILE)**; `free_luathemes` / full migrating `obfree` named;
**JSON `payload.current` `serLevel`/`deserLevel` per-blob relink (D-1696;
never `billobjs`; **other `LFILE_EXISTS` `payload.levels` D-1697 M2**;
**RANGE_GLOBAL pack-lamp relink D-1698 — JSON gamestate-before-current
is a no-op because those objects are never on fobj**; **dorecover
getlev `place_monster`/`set_residency`/`hideunder`/steed-ustuck + one
`restore_cham` per current fmon (M6) + restlevelfile omoves restamp
(`savelev` writes `svm.moves`) + `run_timers` last D-1699**)**; bones ghostly timeout+=adjust named) + **`goto_level` `run_timers`** (D-1191;
C `do.c:1818–1823` after delivery; invent/migrating stay on the live queue — do not peel them); 
**`goto_level` stair-fall `drag_down`/`ballrelease` via `uball` (≡C `Punished`)** (D-0918; 
litter `hitfloor`/yname/`Soundeffect` still deferred; `ballfall` is **D-1778**; 
falling-arm callers gate on `u.uball` **D-1786**); 
**seed0383 Scr 209/219 RNG FULL after D-0852…D-0855 (#1000 suite); first cell miss past @199; 
wear/invis plines deferred**; **`goto_level` stash/restore `updest`/`dndest`** (D-0656; 
C `Sfo`/`Sfi_dest_area`; **`set_uinwater(0)` leave+after-getlev D-1267**; 
exclusion_zones save/rest named; **`u_on_rndspot` `switch_terrain` D-1278**; 
**`u_on_sstairs` → `u_on_rndspot` D-1287**; **cmd.c `makemap_prepost` `u_on_rndspot` D-1288**); 
**`goto_level` In_endgame `newdungeon`+amulet → `resurrect` new-Wizard** (D-0558) + 
**appear Norep + `temperature_change_msg` hot** (D-0559; 
migrating-Wizard arm deferred) + **`deliver_splev_message` + air/water `movebubbles`** (D-0561); 
**`goto_level` portal arm + `place_branch` `mkportal`** (D-0594; 
find MAGIC_PORTAL / missing → `u_on_rndspot(0)`; **`mktrap` MAGIC_PORTAL dst←`ucamefrom` D-1188**; 
debug_fuzzer `place_branch` ucamefrom still named); 
/ astral `final_level` / makemon MM_NOMSG arm deferred); 
**RIP trailing empty putstr → page-2 blank `--More--`** (D-0290); 
**`topten` record VFS + !toptenwin raw panel + nh_terminate capture** (D-0291) + 
**wizard/discover early-exit score-list msg** (D-0514; omit LOGFILE/XLOGFILE/toptenwin NHW_TEXT); 
**`finish_losehp_done` + bones_ok `mk_named_object` CORPSE + `drop_upon_death` + 
`PM_GHOST` MM_NONAME** (D-0255; `can_make_bones` before message flush); 
**`write_bonesfile`/`try_load_bones` VFS JSON + ghostly `next_ident` remap** (D-0274; 
seg9 16582→16630); **`goodfruit` + savebones fid-negate + drop_upon_death /
resetobjs SLIME_MOLD arm + `savefruitchn` fid>=0 (D-1523)** (C `bones.c:42–47`
/ `:450–453` / `:131–132` / `:287–288`; `save.c:951–971`; getlev
`oldfruit=loadfruitchn` then `freefruitchn`; **restore.c `ghostfruit` spe
remap D-1541** (`:500–511` / restobjchn `:260–261`; fruitadd else clone;
impossible pline / age shift named); other resetobjs arms still named); **wizard `Die?`/`Save bones?`/`Get bones?`/`Unlink bones?`/`Replace it?` + 
`savelife` + `hidden_gold`** (D-0581; seed5006 Scr 230→246); 
**getbones yn leave-level gbuf mon→memory + dirty Terminal paint** (D-0583; seed5006 **PASS**; 
ordinary `vision_recalc(2)` newsym loop deferred); 
**`done_object_cleanup` places limbo `_thrownobj`/`_kickedobj`** (D-0275; 
48→49 entities, seg9 16630→16635); **`serMon`/`try_load_bones` persist `mtrack[MTSZ]`** (D-0276; 
C `savemon`/`restmon`; seg9 16635→16683); 
**ghostly `peace_minded`/`set_malign` + savebones pet untame** (D-0277; C `restore.c` getlev; 
seg9 16683→16836); **`savebones` clear seenv/waslit/glyph + load strip remembered/disp (D-0328)**; 
**`savebones` cemetery `bonesinfo` + `bones_include_name` / `familiar_level_msg`** (D-0577; 
formatkiller; **`when[]` = `yyyymmddhhmmss(endtime)` D-1710**); **`no_bones_level` (special/dungeon boneid, botlevel, branch dlevel>1, 
Gehennom invocation) + non-branch MAGIC_PORTAL + `getbones` gate** (D-0279; seg4 FULL); 
**`#quit`→`done2` yn→`done(QUIT)` + EXT_CMDS** (D-0281; GENERALCMD/ECMD_OK); 
**`really_done`→`paybill` before flush + `finish_paybill` before bones** (D-0311); 
**`done_in_by` isshk honorific+shkname+`KILLED_BY`** (D-0313; `shkname_is_pname`); 
**`done` deaths[how] when empty/`how>=PANICKED` + `really_done` QUIT→`NO_KILLER_PREFIX` + 
`outentry` quit/starved share dungeon/level** (D-0324); 
**`disclose` invent 'y' + ID walk + container_contents; 
gameover enlightenment night/moon + Antimagic/Poison_res/infra/Stealth/warded/Luck + Sleepy status; 
`list_vanquished` ask; overview `dunlev_ureached` range** (D-0482/D-0506; 
seed0006/seed0007 **PASS**); **`done2` wizard `Dump core?` ynq + 
`done_stopprint` skips rip/Goodbye + trailing raw blanks** (D-0514; 
Dump-core `y`→NH_abort deferred); **`done2` cancel `n` → `clear_nhwindow(WIN_MESSAGE)`** (D-0928 
#1190; curs_on_u/wait_synch/multi nomul deferred); 
**`done` Lifesaved → makeknown→exercise + savelife/useup** (D-0868; 
livelog/formatkiller/CHOKING vomit deferred); ParanoidDie/Bones getlin "yes"; 
LOGFILE/XLOGFILE/toptenwin NHW_TEXT; builds_up `level_difficulty`; ParanoidQuit getlin "yes"; 
tutorial abandon; binary savelev; arise/statue arms; ebones; give_to_nearby_mon body; 
resetobjs known-strip / set_ghostly (SLIME_MOLD fruit mark is D-1523); `save_dlevel` assign in `no_bones_level`; Is_special boneid letter variants; 
inven_inuse / ball-chain placebc; accessible closed_door; shk name-based peace; 
`hide_monst` after ghostly; `unleash_all` in finish_paybill; 
`done_in_by` G_UNIQ/ghost/mimicker/vampshifter/priest|minion/minvis/hallu/monhealthdescr/
multi_reason; enlightenment poly/remaining resistance catalogue; set_uasmon FROMRACE; 
**`paygd`/`clearpriests`/`fixup_death`/`force_launch_placement`/`clearlocks`/
`free_pickinv_cache`/`timet_delta` D-1812** (C `end.c` `really_done`
`:1165` / `:1203` / `:1232` / `:1239–1244` / `:1378`; `vault.c` `paygd`
`:1204`; `priest.c` `clearpriests` `:918`; `trap.c` `launch_drop_spot`
`:3221` / `launch_in_progress` `:3235` / `force_launch_placement`
`:3243`; `files.c` `clearlocks` `:732`; `invent.c` `free_pickinv_cache`
`:3043`; `allmain.c` `timet_delta` `:995`; live `js/end.js` + those
modules; named: POSIX signals in clearlocks, `grddead` inside mongone,
display_pickinv cache setter, insight/save/`#suspend`/`#shell`
`timet_delta` callers, DUMPLOG); 
**`observe_quantum_cat` disclose D-1535** (live-cat contents line; 
**companion HP D-1754**); 
**`artifact_score` D-1730** (C `end.c:906–940`; ESCAPED/ASCENDED `really_done`
`:1449` count + `:1482` list; `arti_cost*5/2` + `nowrap_add`; recurse
`Has_contents`; live `js/end.js`; **`get_valuables` D-1741**; companion HP is
D-1754; DUMPLOG list named; hidden_gold is D-1731); **`get_valuables` D-1741** (C `end.c:762–791` +
`sort_valuables` `:797–818`; `really_done` `:1433–1446` `count*oc_cost` +
`:1490–1519` list; glass slot; skip `oartifact`; live `js/end.js`; companion HP is
D-1754; DUMPLOG named); **companion pet HP D-1754** (C `really_done`
`:1293–1295` `keepdogs(TRUE)`; `:1453–1476` mydogs `mtame` `mhp` + live
`Schroedingers_cat` `d(adj_lev(housecat),8)`; two-line "You and NAME" /
verb+points; `dog.c` keepdogs `:799–809` pets_only wakeup; live `js/end.js`
`score_escape_companions` + `js/dog.js` + exported `adj_lev`; DUMPLOG /
keepdogs migrate/leash/`mon_has_amulet` is **D-1783**); overview interest_mapseen/endgame/builds_up/branches/cemetery list; 
savelife Sick/endmultishot/curs_on_u/uswallow; 
ordinary `vision_recalc(2)` gbuf newsym loop / `notice_all_mons`

### `src/dig.c` `mdig_tunnel` / `zap_dig` / `hack.c` `may_dig`

JS: `js/dig.js` / `js/dbridge.js` / `js/dokick.js` — partial

**`may_dig` + `mdig_tunnel`** door/SCORR/wall/tree/stone + `rnd(12)` pile + 
draft/crash/boulder-rock/`rnd_treefruit_at` (D-0178); 
**`may_dig`/`mdig_tunnel`/`zap_dig`/`may_passwall` OR `flags\|wall_info` for 
W_NONDIGGABLE/W_NONPASSWALL** (D-0865); **`zap_dig`** horizontal `rn1(18,8)` + door/SDOOR + 
maze_dig + `DISP_BEAM` (D-0516); **`dig_check`/`fillholetyp`/`digactualhole`/`liquid_flow`/`
fill_pit`/`maybe_dunk`** for break-wand dig (D-0950); 
**`dig_typ`/`pick_can_reach`/`is_digging`/`holetime`/`dig` occupation/`use_pick_axe`/`dighole` 
thin/`fracture_rock`** (D-0951); **`furniture_handled` fountain/sink + HOLE `goto_level` + 
mon `teleport_pet` migrate** (D-0954); **`dig_up_grave` + `dighole` IS_GRAVE** (D-0957); 
**`shopdig` warn/snatch from dig hole fall + start-downward** (D-0958); 
**`destroy_drawbridge` + `find_drawbridge`/`is_drawbridge_wall` dig wires** (D-0959); 
**`open_drawbridge`/`close_drawbridge` + music passtune** (D-0977); 
**`mkcavearea`/`mkcavepos`/`rm_waslit` earth dig** (D-0960); 
**`impact_drop`/`down_gate`/`drop_to`/`add_to_migration` HOLE floor fall** (D-0961); 
**`conjoined_pits`/`xytodir` + autodig quiet + `dighole` boulder-fill/`delfloortrap`** (D-0962); 
**`desecrate_altar`/`god_zaps_you`/`fry_by_god` + 
`disintegrate_arm`/`summon_minion` dig wire** (D-0963); 
**`angrygods` cases 4–8 + `gods_angry`/`rndcurse`/`punish`/`summon_minion`/`god_zaps_you` default** 
(D-0969); **`digactualhole` PIT/HOLE `switch_terrain` D-1269** (C `dig.c:733` after `wake_nearby`; 
`:757` HOLE `at_u` before Lev/Fly re-read; 
`trap.c` `maketrap` PIT/HOLE `set_levltyp` STONE/SCORR→CORR still named); 
**`use_pick_axe2` `u_wipe_engr(3)` D-1375** (C `:1335` axe-scratch after `!ispick` and not 
LANDMINE/BEAR_TRAP; callee D-1051; uteetering/uescaped_shaft / Underwater still named); 
omit Hallucination draft; swallowed/`u.dz` ceiling; zap_dig pitdig; 
crush/entity + iron-chain scatter; impact shop `stolen_value`

### `src/eat.c`

JS: `js/eat.js` — partial

Cookie + **reqtime-1 food** (`touchfood`/`splitobj`/`fprefx`/`lesshungry`) (D-0155); 
**`doeat` `check_capacity` / EXT_ENCUMBER before `is_edible`** (D-0928 #1185; 
Strangled / uedibility / hands_obj / worn-armor eat / metallic rust-monster / RIN_SLOW_DIGESTION / 
doeat_nonfood still deferred); **`fprefx` CLOVE_OF_GARLIC → 
`garlic_breath`/`olfaction`/`monflee(0)`** (D-0635; undead `make_vomiting` deferred); 
**`gethungry` accessorytime `rn2(20)`** (D-0107); 
**Unaware metabolic `rn2(10)` before accessorytime** (D-0156;
`is_fainted` / Unaware `talk=FALSE` D-1768; **D-1791** `newuhs` sets
FAINTED on faint); 
**`gethungry` ordinary `uhunger--` via `hero_form_data` diet + 
odd/even Regen/encumb/Hunger/Conflict burns** (D-0410) + 
**accessorytime even cases 0/4/8/12/16 (amulet/rings)** (D-0633; 
seed0361 **PASS**) + **`uinvulnerable` early-return skips accessorytime** (D-0517 prayer); 
**`init_uhunger`/`newuhs` field thresholds + u_init `uhs=NOT_HUNGRY`** (D-0438) +
**`newuhs` hunger messages / `end_running` / ATEMP WEAK / faint/starve /
occupation `force_save_hs` + `unfaint` afternmv** (D-1791; C `eat.c:3362–3512` /
`unfaint` `:3335–3344` / `hack.c` `end_running` `:4129–4158`; JS was a
14-line field stub; `gethungry`/`morehungry` are async so they can await
it; named: `sit.js` lay-egg `morehungry` still not awaited, `polyself.c:431/:436`
and `cant_finish_meal` have no JS caller, `findtravelpath` `end_running(FALSE)`,
`gt.travelmap` `selection_free`); 
**getobj missing-letter `continue` + empty early-return** (D-0142); 
**CORPSE `eatcorpse`/`start_eating`/`eatfood` occupation + extracted `cwt`/`cnutrit`** (D-0193;
**rot `(moves-age)/(10+rn2(20))` live — seed0014 @43789 was D-1774 I-glyph
fight_empty, not skipped `nonrotting_corpse`**); 
**`eatcorpse` palatable/yummy via `hero_form_data` when `youmonst` unset** (D-0409; 
full `set_uasmon` FROMFORM props deferred); 
**`eatcorpse` acid/sick inline `losehp` via `rnd(15)`/`rnd(8)` not `1+rn2`** (D-0428; 
real `losehp`/`make_sick` deferred); **`floorfood` feeding yn + 
`poison_strdmg(rnd(4),rnd(15))`** (D-0221); 
**floor `useup`→`useupf`/`delobj`/`obj_resists(0,0)`** (D-0222;
**D-1771** eat.c `carried`? `useup`:`useupf` — C `invent.c` `useupf`
`:4762–4783` split+`delobj`+`hideunder`; live `js/invent.js` export;
eat.js hybrid retired; apply/engrave/fountain/pray/zap import the
C-locus; named: shop addtobill/stolen_value, `mon_moving`, zap.js
useupf clone, detect/potion/read/spell useup clones, fprefx pyrolisk); 
**`vomit` `nomul(-2)` + You_can_move_again** (D-0371) + 
**cantvomit/Sick/FAINTING/acid poly** (D-1127; `mondata.c` `cantvomit`; 
`zap.c` `ubreatheu`/`zhitu` ZT_ACID resist+hliquid+d(nd,6)+rn2 gates; altar_wrath; 
acidic `melt_ice`); **`rottenfood` + non-faint still `start_eating` (only faint dont_start; 
`consume_oeaten(…,2)`)** (D-0443; **`Hear_again` afternmv** (D-0911); 
`make_blinded` body / foodword poly deferred); 
**ordinary-food `doeat` rotten → `rottenfood`/`consume_oeaten`/`dont_start`** (D-0911); 
**`start_tin`/`opentin`/`consume_tin` + `tin_variety` + `gainstr`/`make_vomiting`/`make_glib` + 
multi-turn non-corpse `eatfood`** (D-0935; 
`costly_tin` shop billing / `use_tin_opener` apply / Fixed_abil Popeye Olive·Bluto / b_trapped 
wake·stun deferred); **`done_eating`→`cpostfx` `eye_of_newt_buzz` for AT_MAGC||PM_NEWT** (D-0492; 
cpostfx specials / corpse_intrinsic/givit / AD_STUN hallu deferred); 
**`touchfood` freeinv+`addinv_nomerge` + invent `splitobj` splice** (D-0923; 
sellobj_state invent-full dropy / COST_BITE deferred); 
**D-0928 #1113:** seed4500 @103155 — JS `floorfood`/getobj sees floor apples + 
invent food while C `e` is nothing-to-eat (key desync into Count:20 `.`); 
invent/floor provenance open; do not ship inediate `is_edible` FOOD reject; 
omit metallivore·pool floorfood / sacrifice·tin arms / **cprefx rider `revive_corpse` after 
lifesave** (D-1081) / polymon stone-golem failure polish / tainted Sick / slime·stone / `?`/`*` 
menu; `is_edible` ghoul/cube/fire/metal arms vs JS FOOD-only; 
`oc_nutrition` still local FOOD map until extract; `addinv` often omits `where=OBJ_INVENT`; 
timeout.c vomiting_dialog cantvomit/Hallu texts; zhitu acid_damage/erode_armor bodies; 
C web-destroy TODO before ice still named; 
**`eatspecial` MAIL_STRUCTURES `SCR_MAIL` + `uwepgone` `artifact_light`** (D-1204); 
**`choke` `killer_xname` D-1344** (C `eat.c:279` tombstone KILLED_BY; 
coins `"very rich meal"` / null `"quick snack"`; dozap D-1345; throwit D-1346; 
throw_obj `:147` remaining); **`lesshungry`/`bite` choke+fullwarn D-1356** (C 
`eat.c:3289–3333`/`3133–3158`; `doeat` canchoke SATIATED snapshot; 
adj_victual_nutrition lembas/cram / `do_reset_eat` touchfood named); 
**`eat_brains` D-1306** (C `eat.c:601–754`; uhitm headed `mhitm_ad_drin` call; 
**helmet / `m_slips_free` D-1307**; **mhitu caller D-1329**; **mhitm caller D-1330**)

### `src/apply.c` / `src/lock.c` / `src/music.c`

JS: `js/apply.js`, `js/lock.js`, `js/insight.js`, `js/music.js`, `js/write.js` — partial

`doapply` + `pick_lock` (D-0021); **`doapply` `nohands` + 
EXT_ENCUMBER `check_capacity` before getobj** (D-0928 #1186; 
retouch/wand-break/flip_book/coin still deferred); 
**`#jump`/`dojump`/`jump` physical + knight chess `distu==5` + `walk_path`/`check_jump` (D-0899; 
SPE_JUMPING spell is D-1397; #jump known_spell fallback / hurtle_step / steed·trap-escape; 
S_goodpos tmp_at D-1051)**; **`#rub`/`dorub`/`wield_tool` re-queue** (D-0710; 
**`use_stone` graystone** D-1014; jelly deferred; **`djinni_from_bottle`** MAGIC_LAMP (D-1144)); 
**`splash_lit` D-1337**; **`use_cream_pie`** immerse+`rnd(25)`+ucreamed/`make_blinded`+delobj 
(D-0711) + **`make_blinded` toggle → `vision_recalc(0)`** (D-0721; 
Blind_telepat/Infravision/Sting `see_monsters` D-1755 / Eyes / **Punished `set_bc` D-1769**; 
costly_alteration COST_SPLAT / quan>1 invent-split deferred); exported `getdir` for kick/apply; 
**`getdir` `'.'` = SELF** (D-0780; was cancel) + 
**D-1038 `lock.js` `getdir` cmdq DIR/KEY, `s` self, `<>`, movecmd HJKL/Ctrl, optional numpad, `^R` 
retry** (no trailing `confdir`) + 
**D-1721 `getdir` yn_function** (C `cmd.c` `:3987–4011` `yn_function(query, NULL, '\0', FALSE)` then 
`clear_nhwindow(WIN_MESSAGE)`; `(s && *s != '^')` query; live `js/lock.js` + 
`getdir_cmdassist` / `getdir_zap`; unused dothrow clone deleted) + 
**D-1729 `getdir` CQ_REPEAT** (C `:3962–4019` `cmdq_pop` DIR/KEY + `cmdq_add_key(CQ_REPEAT)` 
when `!in_doagain`; `in_doagain` `nhgetch`; live `getdir_read_dirsym`; `getdir_zap` 
calls shared `getdir` then local `confdir`; dig `use_pick_axe` calls `getdir`) + 
**D-1806 `getdir` help_dir / cmdassist / strange-direction NEED_MORE / `dxdy_moveok`**
(C `help_dir` `:4168–4296` NHW_TEXT `show_text_pages` quitchar wait + Guidebook
`dowhatdoes_core`; `dxdy_moveok` `:3901–3907` NODIAG grid-bug; live shared
`js/lock.js` `getdir`; `getdir_cmdassist` wraps; `doclose` / `get_adjacent_loc`
call `getdir`; no trailing `confdir`; named: mouse `_` getpos, fuzzer,
`cmd_from_func` keys, rhack `dxdy_moveok`; `yn_function_menu` is D-1728) +
**D-1815 `getdir` `:4098` `iflags.cmdassist`** (optlist default On;
Options/`O` writes `game.iflags`; `!cmdassist` skips `help_dir` for the
strange-direction pline; `?` still forces help; not `game.flags`); 
getobj missing-letter `continue`+`flush_topl_more` (D-0025); 
**empty SUGGEST → "don't have anything"** (D-0141); **`doopen_indir` CLOSED autoopen** (D-0059); 
**`doclose`/`c` getdir cmdassist + close envelope** (D-0740; 
stumble_on_door_mimic / Blind feel / portcullis deferred); 
**`get_adjacent_loc` → shared `getdir` (D-1806); `MAGIC_MARKER` → `dowrite`** (D-0742); 
**`doopen_indir`/`kick_door` `recalc_block_point`; `pick_lock` NODOOR/ISOPEN/BROKEN** (D-0113); 
**`doopen_indir` locked → autounlock APPLY_KEY + `autokey`/`pick_lock` ynq + 
`picklock` occupation `rn2(100)`** (D-0487); 
**`#loot`/`do_loot_cont` locked box → `pick_lock`/`picklock` box arm (4*DEX+25 rogue)** (D-0489) + 
**unlocked `use_container` MENU_FULL take-out `query_category`/`out_container` + 
lootabc `a` alias** (D-0490) + **`flags.lootabc` display a/b/c/d/e + 
take-out `sortloot` INVORDER_SORT class headings + gold `bot()`** (D-0501; 
autopick `A` / put-in heading polish deferred; traditional_loot is D-1581); 
**`#force`/`doforce` + `forcelock` occupation + `breakchestlock`** (D-0679; 
blade erosion break / shop bill / ice-box corpse age deferred); 
**`doorlock` WAN_OPENING/SPE_KNOCK D-1462** (SDOOR appear + locked unlock + picking_at; 
caller `zap.c` `bhit` `:4056–4074`) + **WAN_LOCKING/SPE_WIZARD_LOCK D-1475** (Rogue hide / 
obstructed / trap-in-doorway / lock-shut) + 
**WAN_STRIKING/SPE_FORCE_BOLT D-1482** (SDOOR appear then smash/explode; loudness wake_nearto; 
muse.c mbhit named; bhito boxlock is D-1467) + **`chest_shatter_msg` Blind+`singular` + 
`objclass.h` PAPER/GLASS/WOOD mats** (D-0878; 
potionbreathe / Blind hear-vs-see deferred) + **doforce ynq def `'q'`** (D-0727); 
**`o`/`doopen` → `doopen_indir(0,0)` getdir** (D-0727; **loot-at-feet `u_at` → `doloot` D-1837**;
pit "Open where?" / mimic / AUTOUNLOCK_KICK deferred); 
**`#herecmdmenu`/`doherecmdmenu` self menu** (D-0728; 
`#therecmdmenu` / next2u/far / K==0 travel / CMDQ_KEY·DIR follow-ups / glyph≠hero Look deferred); 
**`#tip`/`dotip` floor ynq (def q) + basic floor `tipcontainer`** (D-0719; 
**highdrop `hitfloor(TRUE)` D-1273**; **getobj invent tip D-1665**; 
**`choose_tip_container_menu` boxes>1 PICK_ONE D-1679** (C `pickup.c` `:3500–3558` dummy 
`"tip something being carried"` `MENU_ITEMFLAGS_SELECTED` + `'i'` unless lootabc/`i>'i'-'a'`; 
n==0/1/2/-1 quirk; Space/Return accept dummy → getobj; ESC `ECMD_CANCEL`); 
tipcontainer_gettarget menu / altarizing `doaltarobj` / ice-box / cursed mbag / shop / toss_up / 
candle·oil spill / tiphat / MENU_SEARCH·map_menu_cmd·multi-page named); **`use_stethoscope` self + `ustatusline`/`piousness` + 
free first `hero_seq`** (D-0155) + **adjacent isok/`m_at`/empty return `res` TIME** (D-0735) + 
**`mundetected`/`mappearance` `seemimic` + `mstatusline` align/size/AC** (D-0738; 
SDOOR/SCORR/`its_dead`/defsyms furniture/`map_invisible`/ailment flags deferred) + 
**`use_mirror` getdir+cursed+self+`bhit` INVIS_BEAM+flee `rn2(5)`/`monflee` + 
`use_camera` getdir+charge+`flash_hits_mon` subset** (D-0736; 
Medusa/`mon_reflects`/nymph steal+rloc; `howmonseen` is D-1562; `see_monster_closeup`; 
flash mimic/gremlin deferred); **`apply_ok` SUGGEST tools/wands/spbooks + 
weapon/oil/food/graystone ranks** (D-0157); **`getobj_apply` prompt `compactify` when suggested>5; 
`?` keeps raw lets** (D-0466); **getobj `?`/`*` → `display_pickinv_reply`; 
sack/bag → `use_container` take-out** (D-0375) + **put-in coins MENU_FULL** (D-0376) + 
**locked Hmmm pline** (D-0381) + **`in_or_out_menu` prompt ATR_INVERSE + SELECTED `*`** (D-0382) + 
**`use_container` outmaybe/`yname` + MENU_FULL `query_category` put-in** (D-0394) + 
**`used`→`cknown=1` containerdone** (D-0395) + 
**`use_container` emptymsg `Ysimple_name2`** (D-0417; 
**quantum `"now "` D-1535**; cursed-mbag `"now "` + full `minimal_xname` deferred); 
**`do_play_instrument`/`do_improvisation` LEATHER_DRUM + `improvised_notes` + 
`awaken_monsters`/`awaken_scare` TOOL `resist` alev=10 + auditory `onscary(0,0)`→`monflee` + 
`dosounds` Deaf≡HDeaf** (D-0454) + **`DRUM_OF_EARTHQUAKE` → 
`do_earthquake`/`do_pit`/`generic_lvl_desc` + 
fountain/sink/altar(`desecrate_altar`)/grave/throne/SCORR/ROOM/door collapse + 
PIT IS_ROOM→ROOM morph in shared `maketrap`** (D-0972 / **D-1280**) + 
**flute/harp sleep·snake·nymph·charm + FIRE/FROST horn `ubuzz`/`zapyourself` + 
BUGLE `awaken_soldiers`** (D-0974; **passtune getlin + `open_drawbridge`/`close_drawbridge` + 
Mastermind hints** D-0977; `Hero_playnotes`; flees_light; can_blow poly; selftouch petrify; 
flooreffects full; maketrap shop-hole/DRAWBRIDGE_UP ice named (**set_levltyp D-1280**); 
sleep defended/shieldeff; set_entity crush still deferred); 
omit `do_break_wand`/`flip_through_book`/`flip_coin`, adjacent/dz/cursed stethoscope, forcelock 
shop/erosion polish, `feel_location` mapseen gating, **stash getobj ALLOWCNT D-1561** (`stash_ok`/`ck_bag`/`GETOBJ_PROMPT|GETOBJ_ALLOWCNT` + `in_container` early-outs/`unsplitobj`); **`'r'` reversed D-1567** (`loot_in_first` put-in then take-out; TRADITIONAL yn_function + `explain_container_prompt`); **traditional_loot askchain D-1581** (ggetobj takeoff/identify / in_or_out_menu more_containers `n`/lootabc Next / mbag explosion / icebox age / shop sellobj / snuff_lit named); 
door `b_trapped` body / AUTOUNLOCK_KICK / quest-artifact autokey ranking; 
**`use_leash`/`next_to_u`/`check_leash`/`m_unleash`/`o_unleash`/`get_mleash`/`number_leashed`/`
leashable`/`mon_has_amulet` + `whimper` + domove/stairs/tele/dig/trap wires** (D-1005; 
**`m_unleash` `pline_mon`+`update_inventory` + `m_detach` FALSE + dogmove ALLOW_U +
`o_unleash`/`use_leash`/`next_to_u` inventory D-1609**;
getdir `<`/`>` steed-dz; artifact.c next_to_u; 
end.js `unleash_all` still thin; **newcham mleashed D-1645**;
keepdogs stay-behind + leash is **D-1783**; grow_up leash / Hallu
`mhis` named); **`use_whistle`/`use_magic_whistle`/`magic_whistled` + 
`can_blow` + `wake_nearby(petcall)` whistletime + `vault_summon_gd` + `tele_to_rnd_pet` + 
EUCALYPTUS_LEAF whistle arms** (D-1007; Soundeffect; Hallu hcolor eucalyptus brown; 
mintrap last_msg polish when pline unset; full is_silent msound tables); 
**`use_saddle` via `doapply` SADDLE** (D-1008; `update_mon_extrinsics` deferred); 
**`use_stone` + dorub/doapply graystone** (D-1014; use_royal_jelly deferred); 
**`use_grease` trailing `update_inventory` + live getobj D-1656** (C `apply.c` `:2652`;
`getobj("grease", grease_ok, GETOBJ_PROMPT)` not clone; grease_ok COIN
`GETOBJ_EXCLUDE` 0; `gloves_simple_name` gauntlets; consume_obj_charge
known is D-1615; sit.c `special_throne_effect` grease spray named)

### `src/display.c` `newsym` / map

JS: `js/display.js` — partial

Floor `vobj_at` + class symbols + CORPSE `mon_color` (D-0022); 
**live `mon_glyph` uses `mcolors[mnum]`** (D-0036; newt yellow); **`wall_angle` + seenv** (D-0038); 
**STAIRS `known_branch_stairs`→CLR_YELLOW else CLR_GRAY** (D-0162; tty gray→NO_COLOR); 
**`see_with_infrared`/`mon_visible` when `!cansee`** (D-0039; race Infravision via `mons[urace]`); 
**`mon_warning`/`display_warning` + `context.warnlevel=1`** (D-0663; 
**Hallu `rn2_on_display_rng(WARNCOUNT-1)` D-0838**; 
**D-0852 #992:** Hallu `vision_off_newsym_gbuf({useLiveViz})` at `docrt` + 
`goto_level` leave restores C `vision_recalc(2)` warn burns; Scr 194→196; non-Hallu gated; 
full ctrl=2 loop falsified; **#993 gulpmu vision_off alone falsified Scr174**; 
**#994 warn-only×8 alone Scr174**; **#996 flush_topl_more + 
Hallu vision_off together Scr196→201 — gulp dims match C through ~core16749**); 
**`tp_sensemon`/`Unblind_telepat` + `recalc_telepat_range`** (D-0669; 
**MATCH_WARN_OF_MON overlay D-1514**); **`altar_color` via `altarmask`/`altar_to_glyph`** (D-0666; 
no USE_GENERAL_ALTAR_COLORS); **`see_monsters` + `teleds` call** (D-0667; 
**Warn_of_mon count + Sting_effects D-1493**; 
**allmain `any_visible_region` OR D-1512** (C `region.c`; timeout `visible_region_summary` D-1527;
**newsym/`_map_location` `show_region` D-1528**; **`see_wsegs` / `is_worm_tail` D-1529**; 
**`detect_wsegs` D-1545**; 
DRAWBRIDGE_UP under-typ / C FIXME hero-inside-cloud still named); 
**SPFX_WARN conferral + MATCH_WARN see_it D-1514**; 
**`see_monsters` MON_STILL_ARRIVING skip D-1746**; **feel_location `is_worm_tail` D-1749**; **make_blinded
`Sting_effects(-1)` D-1755**); **`swallowed`/`docrt`/`newsym` uswallow + hallu `what_mon`** + 
**docrt memory=`show_memory_glyph` + gulpmu `swallowed(1)`** (D-0838; underwater/buried deferred); 
**DECgfx swallow `S_sw_tc/ml/mr/bc` meta-o/x/x/s** (D-0842; Primary corners `/\\`); 
**swallow DEC `o`/`s` keep SO-form for scoring + `HI_METAL`≡CLR_CYAN in `mcolors`** (D-0843; 
Hallu statue mem random_obj D-0844; **`see_traps` only if `glyph_is_trap` gbuf** D-0845; 
**`covers_objects` is_pool&&!Underwater** D-0846; 
@172 Hallu objs = moves=11 free see_objects after ice expels@10 D-0847 — JS free-window burns 
inventoried (#984: docrt 21M+4O / see_mon 21M+1W / mnexto+post 2M / once-in 22M+1W+4O); 
next C ~drn2 dim diff; **`newsym` `show_region` + `mon_overrides_region` D-1528**;
`vision_recalc(2)` main newsym loop still skipped in JS); 
**`mon_glyph`/`obj_glyph` Hallu display RNG** (D-0838; trap hallu deferred); 
**full MONSYM `MLET_CH` + FOUNTAIN/SINK/THRONE/ALTAR/GRAVE terrain** (D-0070); 
**`magic_map_background` + dark_room DARKROOMSYM≡S_room** (D-0075/D-0081); 
**STATUE `obj_glyph` → mons[corpsenm].mlet + `obj_color(STATUE)`** (D-0080); 
**`more()` word-wrap / pre-wrapped last-line `--More--`** (D-0083/D-0282); 
**`look_shown_at` for look_all glyph filter** (D-0087); 
**`waslit=(lit!=0)` + out-of-sight `S_litcorr`→`S_corr`** (D-0096); 
**DECgraphics open door meta-a / CLR_BROWN** (D-0113); 
**Primary ASCII vs `symset:DECgraphics` walls/floors/ndoor/open-door `horizontal`** (D-0115); 
**DECgraphics `S_altar` meta-`{` (ASCII `_`); scoring grid keeps raw `{`** (D-0293); 
**`map_invisible` + `canspotmon`/`canseemon`/`sensemon` + `newsym` keep `I`** (D-0296; 
tp_sensemon/warn/worm deferred); **`explode` 3x3 `map_invisible` when
`cansee && !canspotmon` D-1760** (`explode.c` `:378–381`; live
`js/explode.js`; You_hear vs Boom! same pass; not `explosion_to_glyph`);
**`display_monster` M_AP_OBJECT fake obj → `map_object(&obj, !sensed)`**
(D-1739; C `:564–575`; memory+`observe_object` even when sensed;
D-0297 paint); **M_AP_FURNITURE `cmap_to_glyph` + lastseentyp** (D-1726;
`js/display.js` `display_monster`; not `update_lastseentyp`);
**M_AP_MONSTER `what_mon(mappearance, rn2_on_display_rng)` +
`monnum_to_glyph`** (D-1734; `display.h` `what_mon`/`random_monster`;
live `js/display.js`; not live `mon_glyph`);
**`display_monster` sensed = Protection_from_shape_changers ||
`sensemon`** (D-1736; youprop.h H||E; live `js/display.js`;
map_object observe is D-1739);
**`newsym` cansee Detect_monsters** (D-1737; C `:1013–1029`
`see_it || (!worm_tail && Detect_monsters)` then mtrapped
BEAR_TRAP/`is_pit`/WEB `tseen` + `display_monster` DETECTED;
youprop.h H||E; live `js/display.js` + `cell_shows_displayed_monster`);
**`newsym` !cansee `display_monster` DETECTED** (D-1745; C `:1046–1054`
`see_it ? 0 : DETECTED` — 0 is not PHYSICALLY_SEEN; occupancy
`!mimic || sensed`; live `js/display.js`; pet/detected glyphs are
D-1748; `show_mon_or_warn` I-glyph is D-1747);
**`see_monsters` MON_STILL_ARRIVING skip** (D-1746; C `:1508–1509`
`continue`; `monst.h` `:67` 0x100; `dog.c` `mon_arrive` `:430` set,
`:479` With_you clear, `:622` After_you clear, usteed return leaves
the bit; live `js/display.js` + `js/const.js` + `js/dog.js`
With_you/After_you; pet/detected glyphs are D-1748;
`show_mon_or_warn` is D-1747; feel_location `is_worm_tail` is D-1749;
make_blinded `Sting_effects(-1)` is D-1755);
**`show_mon_or_warn` I-glyph `unmap_object`** (D-1747; C `:481–496`;
callers `display_monster` `:619` / `display_warning` `:650`;
`vobj_at` then `map_object(o, FALSE)` when `cansee`; live
`js/display.js`; pet/detected glyphs are D-1748; map_object observe
is D-1739);
**`display_monster` pet_to_glyph / detected_mon_to_glyph** (D-1748;
C `:587–618`; `display.h` `pet_to_glyph` `:563–565` /
`detected_mon_to_glyph` `:557–559` / `petnum_to_glyph` (no
`what_mon` on tame tails) / `detected_monnum_to_glyph`; tame &&
!Hallucination prefers pet over DETECTED; tty `wintty.c`
`:3927–3936` MG_PET hilite then MG_DETECT `use_inverse`; live
`js/display.js`; C has **no** steed arm here — a ridden steed is
painted by `display_self` (**D-1784**); integer `GLYPH_*_OFF` /
`map_monst` are D-1765;
feel_location `is_worm_tail` is D-1749); 
**`display.h` integer `GLYPH_*_OFF` / `detect.c` `map_monst`** (D-1765;
C `display.h` `:497–546` enum + `:553–650`/`970–979` `*_to_glyph` /
`glyph_is_*`; `detect.c` `map_monst` `:124–128` `monsym==' '`
detected else `mtame` pet else mon; live `js/display.js` +
`js/detect.js` `map_monst`; `js/const.js` S_engroom/S_brdnladder;
**`ridden_mon_to_glyph` usteed wire is D-1784**; named: swallow cmap,
`map_glyphinfo`/`reset_glyphmap`, `in_getlev` / await-`newsym` More
when mention_map On);
**`maybe_display_usteed` / `display_self` ridden bank D-1784**
(C `display.h` `:246–249` picks `ridden_mon_to_glyph`, not
`mon_to_glyph`, so the hero's square lands in GLYPH_RIDDEN_* while
mounted; `map_glyphinfo` `:2986–2997` then reads that bank for
`MG_RIDDEN | MG_FEMALE`/`MG_MALE` **from the steed**, so
`display_self`'s wizmgender inverse follows the steed's gender, not
the hero's. tty ch/color are unchanged — the payoff is that
`glyph_is_ridden_monster` and `glyph_to_mon`'s ridden arm stop being
dead code. Named: `map_glyphinfo` `has_rogue_color` → NO_COLOR for a
ridden glyph, part of the wider ROGUESET colour deferral);
**`display.c` `show_glyph` always overwrite gbuf** (D-1767; C
`:2039` `gbuf.glyph = glyph`; `see_traps` `:1617–1619`
`glyph_is_trap(_glyph_at)` only; `back_to_glyph` `:2286–2427`;
`do_vicinity_map` `:1528` `!glyph_is_monster` without kind hybrid;
live `js/display.js` + `js/detect.js` import `map_background`;
named: usteed, swallow cmap, `map_glyphinfo`;
DRAWBRIDGE tty `?` while integer `back_to_glyph` is live);
**`newsym` cansee I-arm uses `lev->glyph` not gbuf** (D-1774; C
`:1032–1033` `glyph_is_invisible(lev->glyph)`; `unmap_invisible`
`:387–396` levl.glyph; `hack.c` `domove_fight_empty` `:2242–2245`
`glyph_at`; `do_attack` atk_done `:577–580`; `mon.c` `mondead`
`:3170`; live `js/display.js` `memory_glyph_is_invisible` +
`js/cmd.js` + `js/uhitm.js`/`js/mhitm.js` mondead; eat.c
`eatcorpse` rot `rn2(20)` was already live — skipped because
fight_empty punched stale I instead of walking onto the corpse;
`ridden_mon_to_glyph` usteed is **D-1784**; named: swallow cmap);
 
**`feel_location` `is_worm_tail` overlay** (D-1749; C `:901–908`
`!u_at && m_at && sensemon` then `display_monster(..., is_worm_tail)`
— Detect_monsters still paints tails, unlike `newsym`; `_suppress_map_output`
`:754–755`; `engr_can_be_felt`; Underwater `is_pool_or_lava`/`is_ice`;
ROOM/CORR darken via `cmap_to_glyph` identity; callers hack.c `dopush`
`:210–215` / `cannot_push_msg` `:257–258` / monster-behind `:459–460`;
live `js/display.js` + `js/hack.js`; named: levitate-arm do_room_glyph/
litcorr, usteed reach, Levitation/verysmall/Sokoban/test_move/lock
Blind feel); 
**`obj_is_generic` + tty CLR_GRAY/BLACK→NO_COLOR** (D-0118); 
**`map_object`/`see_nearby_objects` neardist `observe_object`** (D-0299; 
upgrades generic gem/potion/spellbook to per-otyp color); 
**`newsym` !cansee+no-memory → blank** (D-0300; C `show_mem` unexplored); 
**`map_location_memory` under cansee+visible monster** (D-0120); 
**`display_self` U_AP_TYPE furniture/object/monster glyphs** (D-1275; `maybe_display_usteed` first; 
`objnum` not Hallu; detect `monster_detect`; find_trap cls / muse / gender offsets named; 
**swap-with-pet `seemimic` D-1299**); **`newsym` u_at `canspotself` → `_map_location(…,!see_self)` 
+ `display_self` only when spottable** (D-0326; 
`feel_location` !cansee still deferred — D-0928 #1166 fixed @1048 via unmap_object not 
feel_location); **`update_lastseentyp` on cansee/`magic_map_background`** (D-0123); 
**`S_engroom`/`S_engrcorr` + `erevealed` on cansee** (D-0139); 
**`flush_screen(-1)` postpone + `docrt`→`cls`→`more` before redraw** (D-0160); 
**`docrt` `vision_recalc(2)`+memory+`vision_recalc(0)`** (D-0328); 
**`cls`→`clear_glyph_buffer` blanks `disp_*`** (D-0389; detect More map); 
**botl `Dlvl` via `depth()` + Mines `wall_glyph` CLR_BROWN** (D-0283) + 
**Gehennom `wall_glyph` CLR_RED** (D-0801; knox deferred); 
**`assign_graphics` ROGUESET → ASCII floors + botl `*:` gold + Rogue nocolor strip** (D-0805; 
RogueIBM/`load_symset` / full showsyms deferred); 
**`tmp_at` DISP_FLASH/END + `nh_delay_output`** (D-0284); 
**`tmp_at` DISP_BEAM/CHANGE + `zapdir_to_glyph` (DEC h/vbeam)** (D-0468; 
**TETHER BACKTRACK D-1311**; ALL / ALWAYS nest polish deferred); 
**POOL/MOAT/WATER/LAVAPOOL/LAVAWALL/ICE `terrain_glyph` + 
scoring grid keeps raw DEC `` ` ``** (D-0355; Primary `}`/`.` + colors); 
**`obj_is_piletop` + `hilite_pile`/`use_inverse` → ATR_INVERSE on map objects** (D-0386; 
MG_DETECT/BW_* deferred); **`mon_map_attr` hilite_pet/`wc2_petattr` ATR_INVERSE on tame `newsym`** 
(D-0478; accessibility SYM_PET_OVERRIDE + remembered MG_PET when pet left deferred); 
**`unmap_object`/`unmap_invisible` + `mondead` clears remembered `I`** (D-0479) + 
**`unmap_object` ≡ C trap/engraving/`map_background` (not `map_location`)** (D-0928 #1166; 
**`set_bc` is D-1769**; Blind `move_bc` glyph / `feel_location` still deferred); omit ladder glyphs; 
infrared `_map_location`; 
**`map_trap`/`trap_glyph` tseen in `_map_location`/`newsym`** (D-0419);
**`trapname` Hallu + `see_traps` glyph_is_trap (D-1759;**
C `trap.c` `:7098–7155` `rn2_on_display_rng(TRAPNUM+SIZE+1)` /
`display.h` `trap_to_glyph` `:630` **no** Hallu — 5.0 dropped
`random_trap_to_glyph`; `display.c` `see_traps` `:1610–1621`;
live `js/trap.js` + `js/display.js` `trap_to_glyph`/`see_traps`
`glyph_is_trap(_glyph_at)` only (D-1767; no `disp_kind` hybrid);
detect clone retired; pager `trap_description` is **D-1779**);
**`cmap_to_glyph` trap/zap/cmap-C + `explosion_to_glyph`** (D-1738;
`display.h` `:621–628`/`:587–594`; `rm.h` `trap_to_defsym`; explode.c
`:388–438`; live `js/display.js` `cmap_idx_to_glyph` /
`explode_show_visible` + `js/explode.js` + `js/const.js` S_* 49–87 /
96–104; WEB `"` / VS `~`; DEC v/h beam + expl tc/ml/mr/bc;
`shield_static` cmap indices; named: swallow cmap,
getpos/`apply`
`S_goodpos` tmp_at, region `'S_poisoncloud'`/`'S_cloud'` strings,
You_hear vs Boom! when !visible, explode `map_invisible` !canspotmon;
integer glyph IDs are D-1765; DRAWBRIDGE integer `back_to_glyph` is D-1767 (tty still `?`); furniture lastseentyp is D-1726; hallu trap names are D-1759); 
hallu/`random_monster` statue; pile-top/gender statue glyph offsets; 
telepathy/`Detect_monsters`; MATCH_WARN overlay D-1514 (`see_wsegs` / `is_worm_tail` D-1529); full `set_uasmon`/uprops; 
**TREE `terrain_glyph` + scoring grid keeps raw DEC `g`** (D-0565; Primary `#`/CLR_GREEN); 
**IRONBARS `terrain_glyph` + scoring keeps raw DEC `|`** (D-0566; Primary `#`/HI_METAL); 
**AIR/CLOUD `terrain_glyph` S_air/S_cloud** (D-0571); DRAWBRIDGE_UP tty still default `?` (integer `back_to_glyph` D-1767); 
ASCII `|`/`-` open-door when not DEC; ROOM→DARKROOMSYM memory arm in `newsym`; 
DRAWBRIDGE_UP lastseentyp is D-1711; furniture lastseentyp is D-1726; 
**Sokoban `wall_glyph` CLR_BLUE iff DECgraphics** (D-0567/D-0729; ASCII→GRAY/NO_COLOR; 
knox + why DEC recorder SGR 34 vs source `wallcolors[]` GRAY deferred); 
DISP_TETHER BACKTRACK / ALL nest; other DEC remaps (ladder); 
glyph_is_generic remembered-only newsym_force arm; full lev->glyph vs remembered-only memory; 
!cansee `display_monster` is D-1745 (cansee Detect is D-1737); **`see_monsters` MON_STILL_ARRIVING skip is D-1746**; **`show_mon_or_warn` I-glyph is D-1747**; **pet/detected glyphs are D-1748**; **feel_location `is_worm_tail` is D-1749**; **integer `GLYPH_*_OFF` / `map_monst` is D-1765**; **`show_glyph` always stamp gbuf is D-1767**; **`newsym` cansee I-arm `lev->glyph` is D-1774**; **`ridden_mon_to_glyph` usteed wire is D-1784**; 
Rogue-level litcorr/room darkening; **`feel_location` + Blind `newsym` u_at** (D-0928 #1169; 
reachable `_map_location` + Punished `bc_felt` + `feel_newsym`; 
`is_worm_tail` overlay D-1749; full levitate-arm do_room_glyph/litcorr + usteed reach deferred; MATCH_WARN via `sensemon` is D-1514); 
**`show_glyph` `show_glyph_change` + `mention_map`→`a11y.glyph_updates` + 
`docrt` `in_docrt` (D-1219; default Off; firstmatch via `auto_describe_text`; 
**`gbuf_show_kind` occupancy/tty not Hallu `mon_glyph`/`obj_glyph`** D-1221; 
integer `GLYPH_*_OFF` / `map_monst` are D-1765; **`show_glyph` always stamp gbuf is D-1767**; `GLYPH_NOTHING` vs
UNEXPLORED on `clear_glyph_buffer`; `in_getlev` / await-`newsym` More when On /
full gbuf-id classifier still named; **D-1587 `mimic_light_blocking` See_invisible `block_point`/`unblock_point`**
(C `:1531–1540`; not `recalc_block_point`; `js/vision.js`; potion.c /
timeout.c / polyself.c callers + `iter_mons` `mon_offmap` named))**

### `src/questpgr.c` / tty menu

JS: `js/questpgr.js`, `js/quest.js`, `js/do.js`, `js/dungeon.js` — partial

**legacy corner NHW_MENU `maxcol=strlen+1` + leading pad** (D-0071); 
**H2344_BROKEN offx** (D-0078); **`qt_pager("firsttime")` nhl_init shuffle + Bar text** (D-0527; 
`goto_level` onquest) + **Arc firsttime** (D-0625) + **Pri firsttime** (D-0662) + 
**Wiz firsttime** (D-0808; other-role firsttime burn shuffle only); 
**`on_locate` locate_first/next + Bar/Arc/Pri/Wiz text** (D-0531/D-0590/D-0820; 
other-role locate burn shuffle only); **`quest_chat`/`quest_talk`/`leader_speaks`/`chat_with_leader`
 + Arc/Pri `leader_first` + Pri `assignquest` + Arc `badalign` + 
`is_pure` wizard≡`flags.debug` adjust** (D-0590/D-0627/D-0640; `#chat`→`domonnoise` MS_LEADER; 
**`mon_msound` S_NYMPH→MS_SEDUCE + cajoles/comes-on/`Hello sailor` ECMD_TIME** (D-0687; 
**`doseduce` AMOROUS_DEMON SYSOPT non-nymph D-1750**; other MS_* deferred); **finish_quest throw/kick D-1312**; 
encourage/got_thanks/questart/banished/nemesis talk deferred); 
**`ok_to_quest` + `goto_level` Home in-branch gate** (D-0798; 
Gehennom amulet mysteryforce deferred); **`convert_arg` `%r`/`%R`→`rank_of` + `%ra`/`%rA`/`%rC` + 
`%s`/`%S`/`%g` + `%Xp`/`%XP`/`%Xs`/`%XS`** (D-0627/D-0640) + 
**`convert_arg` `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z` + `homebase`/`intermed`/`neminame`**
(D-1649; C `:235–325`; `%o`/`%O` `artiname`+`the`+`strstri`; `%a`/`%A` `align_str`;
`%D` `align_gname(A_LAWFUL)`; `%Z` `dungeons[0].dname`) + 
**`convert_line` pronoun `%Xh`/`%XH`/`%Xi`/`%XI`/`%Xj`/`%XJ` + `qtext_pronoun`**
(D-1634; `strchr("dlno")`; `%o` Eyes/plural they/them/their; `%O` neuter;
`%Xt` strip `the `; `genders[2]`/`[3]`; `role_init` `godgend`/`ldrgend`); 
**`on_start` nexttime/othertime** (D-0614; Arc+Bar+**Pri** texts D-0670; 
other roles miss then D-1662 common retry); **`qt_pager` default→pline / newline→NHW_TEXT** (D-0616; 
Arc nexttime pline; explicit single-line `output=text` deferred) + 
**`com_pager_core` synopsis `putmsghistory(FALSE)`** (D-1622; howtoput; 
default+newline synthesize `[text]`; live Arc/Bar/Pri/Wiz/Kni lua 
synopsis + legacy after NHW_MENU; convert_line pronoun `%Xh` is D-1634; 
**`qt_pager` common retry** D-1662; array rn2 / pauper_legacy / 
killed_nemesis `rawtext` named; convert_arg catalogue is D-1649); 
**`on_goal` goal_first/next/alt + Arc/Bar/Pri/**Kni** texts** (D-0620/D-0670/D-0928 #1193; 
other-role goal bodies; invent/migrating chains deferred) + 
**`setup_role_race_from_rc` installs `questarti` for `%o`/`%O`** (D-0629; 
Arc/Bar templates only — other-role questarti still omitted on `roles[]`); 
**`goto_level` `at_dgn_entrance("The Quest")` → `com_pager(quest_portal*)`** (D-0650) + 
**`quest_portal` explicit `output=pline` → `deliver_by_pline`** (D-0670; 
Is_knox/bigroom ACH deferred; Rogue primitive pline D-0805); **`qt_pager` common retry** (D-1662; role miss → `"common"` + second nhl_init); pauper_legacy; other common com_pager msgids; array rn2

### `src/invent.c` `look_here` / `dfeature_at` / `src/stairs.c`

JS: `js/invent.js`, `js/mklev.js`, `js/pickup.js` — partial

Stairs via `stairs_description` + Dlvl1 `u_traversed` (D-0026) + 
**`stairs_description` traversed dest uses `depth`/`dunlev` (quest/knox)** (D-0928 #1154; 
Elemental Planes amulet string deferred); 
**`u_on_sstairs` → `u_on_rndspot` D-1287** (C `stairs.c:111–145`; special else rndspot(upflag); 
upstairs/dnstairs wrappers; `goto_level` newdungeon awaits; 
**cmd.c `makemap_prepost` `u_on_rndspot` D-1288**); doors/fountain/sink stubs; 
**`check_here`→`look_here` after move when `!autopickup`** (D-0095) + 
**also after autopick when `flags.pickup`** (D-0387) + 
**`check_here` skips `uchain` in count** (D-0928 #1141); 
**`read_engr_at` from look_here / check_here ct==0** (D-0133); 
**multi NHW_MENU "Things that are/you feel here:"** + pile_limit skip arm (D-0220); 
**Blind feel floor pline + feel/see verb** (D-0928 #1096; altar/ice/pit-reach variants deferred); 
**`look_here` seen trap / visible region `There()`** (D-1835; C `invent.c:4162–4177`); 
**NHW_MENU `--More--` quitchars** via `show_nhw_menu_text` (D-0240) + 
**#1151/#1156 overlay:** `look_here` passes `keep_message_leftover` so getpos WIN_MESSAGE leftovers 
stay left of offx (C `display_nhwindow(WIN_MESSAGE,FALSE)` then no-op clear); 
ordinary corner menus clear (D-0929 fixed); teleds placebc stays; 
**`dfeature_at` D_BROKEN + `describe_decor` mention path** (D-0356); 
**`observe_object` before `doname`** (D-0399; C xname_flags path — pile gems get color); 
**`doname_with_price` for-sale via `get_cost_of_shop_item`** (D-0460); 
**`doname` unpaid via `is_unpaid`/`unpaid_cost`** (D-0461); **feel_cockatrice D-1599** (skip/single/multi floor; pickup FEEL abort); engulfer stomach minvent feel named; 
**`distant_name`/doname observe** (D-0469)

### `src/pline.c` / tty message behavior

JS: `js/display.js`, `js/input.js`, `js/pline.js`, `js/getline.js` — partial

`--More--` works for green paths + getobj re-prompt (D-0025); 
**`pline` dirty `vision_full_recalc`→`vision_recalc(0)` before flush** (D-0890; 
matches `pline.c` vpline — boulder/door/light mid-turn LOS); 
**`vpline` always snapshot+reset `a11y.msg_loc` + `accessiblemsg` `coord_desc: ` prefix** (D-1207; 
default Off; NONE→COMFULL; unit `directionname`; Norep consumes before suppress; 
**`pline_xy`/`pline_mon`** (D-1215; youmonst→(0,0) not ux,uy; 
live wield/zap/drop/pickup/`mb_trapped`; **monmove remaining `pline_mon` D-1227** 
(monflee/itsstuck/maybe_spin_web/postmov door; You_see/You_hear stay pline); 
**uhitm remaining already-ported `pline_mon` D-1240** (gremlin light cry/recoil, xan nuzzle, sedu 
brag; flash awaken/blind and legs reach/prick stay pline); 
remaining unported uhitm `mhitm_ad_*` / worn/trap/weapon drop·tether / muse drinks / postmov 
IRONBARS eat D-1247 (pass is Norep) / **mon_yells D-1248**; **mhitu hitmsg D-1261**; 
**mhitu missmu D-1286**; **mhitu wildmiss set_msg_xy D-1291**; **mhitu mswings pline_mon D-1305**; 
AT_ENGL gulps/lunges still named; **monmove mind_blast D-1238**; **bee_eat_jelly D-1246**); 
**`set_msg_dir`/`pline_dir`** (D-1216; C `pline.c:82–89`/`113–123` + `cmd.c` `dirtocoord`; 
live mention_walls "It's %s." + dobuzz `xytodir(-dx,-dy)` hits you; 
**monmove remaining `pline_mon` D-1227**; remaining uhitm/worn/trap `pline_mon` named; 
**`msg_mon_movement` D-1228** (dest `pline_xy` after place, not `pline_mon`; default Off; 
optlist addr named); run>=2 boulder `pline_dir` D-1226; **`dolookaround` D-1217**; 
**`opt_accessiblemsg` D-1218**; **`show_glyph` glyph_updates D-1219**)); 
**`pline`/`update_topl` `notdied` short-circuit** (D-0928 #1133; starts TRUE; 
`strncmp("You die")` only when room check runs — WIN_STOP+no room keeps WIN_STOP so yn skips more; 
#1132 always-clear was wrong); **`yn_function` clears WIN_STOP after `flush_topl_more`** (D-0928 
#1132; ≡C tty_yn_function); **`yn_function` `'\0'` def skips `(c)` + 
returns def on ESC/quitchars** (D-0421; matches tty `if (def)`); 
**`yn_function` SUPPRESS_HISTORY `show_topl` hard-wrap via `topl_wrap_echo` (cursor after CO-1 
wrap)** (D-0880); **post-answer `gt.toplines=prompt+key2txt`/`#N` D-1623** (`topl.c` `:532–542` rewrite + dumplogmsg, not addtopl; leftover painted prompt); 
**`tty_nhbell` / `cw->cury` / `intr` D-1631** (`termcap.c` `:750–757` + `topl.c` `:475–478`/`:518`/`:544–548`; optlist silent default On; unwrapped `cury==0` keeps leftover; wrapped clear does not wipe `gt.toplines`; `more`/`help_dir` call sites; **kill_char D-1632**); 
**MENU_SEARCH / `tty_wait_synch` D-1646** (`wintty.c` `process_menu_window` `:1698–1731` `:` `tty_getlin`+`pmatchi`+`toggle_menu_curr`; PICK_NONE bell; PICK_ONE first match finishes; explicit page/gacc `:` not search; `tty_wait_synch` `:3623–3647` rawprint `getret` / inmore `addtopl("--More--")` / inread `intr++` two `tty_doprev_message`; live `js/invent.js` `process_menu_search` + pickinv/used-invlets/PICK_NONE + `js/options.js` pick_one/any + `js/pager.js` `whatis_menu_choice` + `js/iactions.js` `itemactions` + `js/display.js`; `more` inmore guard; too_small `void tty_wait_synch`; map_menu_cmd remaps / display_inventory loop `wait_synch` / `tty_raw_print` setter named); 
**`message_menu` PICK_ONE + `more` dismiss_more** (D-0422); 
**`Norep` vs `gp.prevmsg` (last shown pline)** (D-0402); 
**`vpline` `msgtype_type` / `execplinehandler` / `maybe_play_sound` D-1807**
(`options.c` `:7796` first regex_match on `gp.plinemsg_types`;
`MSGTYPE=` `cnf_line_MSGTYPE` `:632` + `msgtype_parse_add`;
NOSHOW / NOREP+prevmsg suppress before vision_recalc; STOP `more`;
`execplinehandler` returns without `sysopt.msghandler`; USER_SOUNDS
compiled out of macosx-minimal so C `vpline` does not call
`maybe_play_sound`; `dolook` `hide_unhide_msgtypes`; named: SOUND=
soundmap, UNIX msghandler fork, doset MSGTYPE menu, full POSIX ERE); 
**botl `_statusLine1` `rank_of(ulevel)` via `xlev_to_rank` + full `roles[].title[9]`** (D-0562; 
was sticky title[0]); **botl `_statusLine2` `enc_stat` when `near_capacity()>UNENCUMBERED`** 
(D-0401) + **`hu_stat` when `uhs!=NOT_HUNGRY` before enc_stat** (D-0500) + 
**Blind/Deaf/Stun/Conf/Hallu/Lev/Fly before Ride** (D-0458; 
Stone/Slime/Strngl/Sick before hunger + Halluc_resistance deferred); 
**Upolyd botl mh/HD/pmname + `hero_glyph` umonnum + `weight_cap` cwt** (D-0722); 
**`set_uasmon` PROPSET(FLYING) FROMFORM** (D-0724) + 
**PROPSET(BLINDED, !haseyes)** (D-0928 #1109) + **`float_vs_flight`→`disp.botl`** (D-0928 #1177) + 
**`polymon` `vision_full_recalc=1` before `see_monsters`** (D-0928 #1178; 
eyeless FROMFORM Blind clears stale IN_SIGHT; 
was_blind restore / other PROPSET / BLND_RES / polysense deferred); 
**`dropz`→`encumber_msg`** (D-0928 #1177; mid-`break_armor` load More before gloves); 
**`polymon` verbose `#monster` breath tip + `dobreathe` energy** (D-0725); 
**`verbalize`/`You_feel`** (D-0116); **`gamelog_add`/`livelog_printf` chronicle list** (D-0124); 
**`mark_topline_seen` NEED_MORE→NON_EMPTY** (D-0195); 
**`update_topl` space→`\n` while len≥CO + `redotoplin` more when wrapped** (D-0282); 
**`getlin`/`get_ext_cmd` echo `topl_putsym` wrap at CO-1 + `buf < COLNO`** (D-0331); 
**botl `describe_level` Knox/`Home %d`/endgame plane/`Dlvl|Tutorial`+`depth()`** (D-0564; 
livelog addbranch); **insight ^X endgame dungeon via shared `endgamelevelname`** (D-0572); 
**botl `_statusLine2` was Dlvl-only** (D-0283); **botl HP display `hp<0→0` + max 9999** (D-0287); 
**`bot` skip when `u.uhp==-1`** (D-0310); **`pline`→`flush`→`bot`; `more` paints cache only; 
`cls` `botlx`; spell `uen` `botl`** (D-0314); omit livelog file write; 
full `update_topl` NON_EMPTY cury/docorner; backspace-across-wrap; 
**putmsghistory D-1588** (`topl.c` `tty_putmsghistory` + `remember_topl`/`msghistory_snapshot`/`dumplogmsg`; getobj force_invmenu qbuf); 
**tty_doprev_message D-1601** (`topl.c` `:19–119` + `redotoplin` `:121–141`; TTY `'s'` single ring walk / `'f'` full / `'c'` combo / `'r'` reversed NHW_MENU; `cmd.c` `doprev_message` ^P/`#prevmsg`; `options.c` `msg_window` first-char); **getline.c ^P D-1611** (`hooked_tty_getlin` `:105–141` zeros `inread` around callee; `'s'`/`'c'`&&!doprev two calls first then continue; else restore prompt; `get_ext_cmd` same C fn; SPECIAL_PROMPT + `gt.toplines`); **yn ^P D-1612** (`topl.c` `tty_yn_function` `:434–463` + `:394–396` inread++/SPECIAL + `:544–545` inread--; non-`'s'` zeros inread then restore; `'s'` two calls first then discards next key; not getline `hooked_getlin_ctrl_p`); **get_count historicmsg D-1613** (`cmd.c` `:5009–5090` + getobj `:1944` `GC_SAVEHIST`; not putmsghistory body); **restore_msghistory D-1614**; **yn post-answer prompt+key D-1623** (`topl.c` `:532–542`; leftover not addtopl; yn ^P is D-1612); **tty_nhbell / `cw->cury` / `intr` D-1631**; **files.c tribute D-1633**; **kill_char D-1632**; **EDIT_GETLIN D-1624** (`config.h:655` commented; live `#else *bufp='\0'` + `name_from_player` + `query_annotation` replace/`describe_level` + epilogue dumplogmsg/suppress_history); 
full message/window policy incomplete; `%-2d` pad; Upolyd mh botl; 
**`timebot` via `flags.time_botl` on `moves++`** (D-0928 #1179; tty→`bot()`; 
VIA_WINDOWPORT `stat_update_time` / `suppress_map_output` deferred; **`gb.bot_disabled` D-1831**)

### `win/tty/getline.c` `hooked_tty_getlin`

JS: `js/getline.js`, `js/do_name.js`, `js/dungeon.js` — partial

**EDIT_GETLIN D-1624** (`include/config.h:655` commented out; live
`hooked_tty_getlin` `:76–78` `*bufp='\0'`; `do_name.c` `name_from_player`
`:105–128` `nhUse(defres)` then mung/PL_PSIZ; `dungeon.c`
`query_annotation` `:2508–2545` `#else` replace prompt + other-level
`describe_level` dflgs 0/2; epilogue `:173–186` dumplogmsg unless
extcmd `suppress_history`; two-arg `getlin`; `find_mapseen` early-out);
**getline ^P D-1611**; yn post-answer D-1623; yn ^P D-1612;
**tty_nhbell yn D-1631**. **kill_char D-1632** (`:196–209` NEWAUTOCOMP
wipe; POSIX VERASE=DEL / VKILL=C('U') so `erase_char||'\\b'` covers
BS+DEL; empty erase + else `tty_nhbell`; `:102–105` `intr--` `*bufp=0`;
`getlin`/`get_ext_cmd`). **ESC-nonempty D-1639** (`:85–91` clear then
fall through `:102–211` `intr`/`doprev`/else `tty_nhbell`; JS had
`continue` after clear; `hooked_getlin_handle_esc` on both callers).
**MENU_SEARCH / `tty_wait_synch` D-1646**. **yn addcmdq D-1706** (`cmd.c`
`yn_function` `:5470–5583` 4th arg; pop KEY / else `cmdq_clear(CQ_CANNED)`
then `cmdq_add_key(CQ_REPEAT)` when TRUE; `iflags.last_msg` PLNMSG_UNKNOWN;
query `QBUFSZ` `...` truncate; resp-mismatch remap after record;
`tty_yn_function` windowport; getobj / paranoid_ynq / askchain FALSE).
**yn remaining + fuzzer RNG D-1805** (`cmd.c` `:5513–5581`
`debug_fuzzer && resp && *resp && rn2(20)` then `rn2(ln)` / ESC
`rn2(ln-1)`-or-`rn2(ridx)`; mismatch `impossible` unless
`in_doagain && !wizard` with TEMP `fuzzer_impossible_continue`;
`program_state.input_state = otherInp`; live `js/getline.js` +
`js/const.js` InputState / fuzzer states).
**getdir yn_function D-1721** (`cmd.c` `:3987–4011`; lock.js + throw/zap/dig clones).
**getdir CQ_REPEAT D-1729** (`cmd.c` `:3962–4019`; `getdir_read_dirsym`;
throw `getdir_cmdassist`; zap local confdir; dig `use_pick_axe` `getdir`).
**yn_function_menu D-1728** (`cmd.c` `:5393–5463` `yn_menuable_resp` /
`yn_func_menu_opt` / menu; `decl.c` unique tables; `optlist.h`
`iflags.query_menu`; `window_inited`; `hack.h` y_n/ynq/ynaq/nyaq/YN;
paranoid_ynq + `choose_ring_hand` identity; live `js/getline.js` +
`js/const.js` + `js/options.js` + `js/jsmain.js` + `js/do_wear.js`).
Named: remaining interned `'yn'`/`'ynq'` callers; hide+web
`hidespinchars` in `domonability`; SND_SPEECH (no soundlib);
DUMPLOG_CORE (D-1776); paniclog file (Rule #2); getdir fuzzer /
help_dir / cmdassist / `dxdy_moveok` (next Open).
`gettty` termios named.
Do not enable EDIT_GETLIN (would drop the replace prompt).

### `src/restore.c` `restore_msghistory` / `restore_gamelog` / `src/nhlua.c` `restore_luadata` / `save_luadata` / `src/save.c` `save_msghistory` / `save_gamelog`

JS: `js/save.js` — partial

**restore_msghistory D-1614** (`restore.c` `:1411–1441`; JSON analogue of
Sfi_int length + Sfi_char, `-1` break; `putmsghistory(msg,TRUE)` then
`putmsghistory(NULL,TRUE)` if any; missing/non-array = old JSON without
the chunk; length > BUFSZ-1 throws ≡ C panic); **save_msghistory**
(`save.c` `:1029–1056` `getmsghistory` walk, skip empty, truncate
BUFSZ-1; empty walk is `[]`); callees `putmsghistory`/`getmsghistory`
D-1588. **restore_gamelog D-1628** (`restore.c` `:1386–1409`; JSON
analogue of Sfi_int length + Sfi_char + `Sfi_gamelog_line` then
`gamelog_add(flags, turn, msg)`; length > `BUFSZ*2-1` throws ≡ C panic;
missing/non-array = old JSON; present chunk replaces, C `gg.gamelog`
NULL at process start); **save_gamelog** (`save.c` `:236–262` walk, no
skip-empty, `-1` sentinel; JSON array `{text,turn,flags}`); callee
`gamelog_add` D-0124. **restore_luadata D-1636** (`nhlua.c` `:1344–1363`;
JSON analogue of Sfi_unsigned length + Sfi_char lua source; `!gl.luacore`
`l_nhcore_init` then `luaL_loadstring` + `nhl_pcall_handle` NHLpa_panic;
missing JSON = old save, still init; emptystr = empty chunk, nhcore `{}`
stays); **save_luadata** (`nhlua.c` `:1327–1341` `get_nh_lua_variables`
/ emptystr; JSON string `nh_lua_variables={…};` via `dat/nhcore.lua`
`get_variables_string` + `dat/nhlib.lua` `table_stringify`);
`l_nhcore_init` sets `luacore` + `nh_lua_variables={}`; unixmain restore
does not second-init. `dosave0`/`try_restore_save` D-0335/D-1603.
Binary NHFILE / SFCTOOL / `nhl_variable` / Lua NHCB `nh_callback_*` /
full Lua VM / FREEING `discard_gamelog` named.

### `src/invent.c` / `src/iactions.c`

JS: `js/invent.js`, `js/iactions.js`, `js/do.js` — partial

Corner NHW_MENU invent (D-0024); **`invent_lines`/`display_pickinv_reply` prop Blind observe** 
(D-0928 #1186; sticky `u.Blind` missed FROMFORM molds → false dknown); 
**`ddoinv`→`dispinv_with_action`→`itemactions` `Do what with` menu + 
corner leftover WIN_STATUS left of offx (D-1842; C `docorner` `cl_end` from `tty_curs(BASE, offx)` `--x` then `bot()` which no-ops while `gb.bot_disabled`; JS `do_statusline1` + skip rows 22–23 in `_buildScreenOutput` while disabled; no grid snapshot/restore — D-1831; D-1831/D-1832 unhandled key is `tty_nhbell` with `page_start` set — no `docrt`; extra-page `maxrow` is per-window; `windows.c` `select_menu`/`getlin` `gb.bot_disabled`; overlay MENU_SEARCH `tty_getlin` paints WIN_MESSAGE and wrap-`cl_end`s row 1; D-0467 `_statusSuppressed` fullscreen dismiss; corner dismiss is `docorner` not `flush_screen` cache-repaint; **`itemactions_pushkeys` throw/drop/apply/read/…** D-0742 + **IA_DIP_OBJ `dip_into`** D-1500 + **IA_ADJUST_STACK `adjust_split`** D-1621 + **IA_ADJUST_OBJ / `check_invent_gold`** D-1641 + **IA_SACRIFICE / IA_TIP_CONTAINER / IA_INVOKE_OBJ** D-1665 + **`dosacrifice` ECMD_TIME D-1667** + **`offer_corpse` D-1678** + **IA_UNWIELD / IA_NAME_* / IA_EAT_OBJ / IA_ENGRAVE_OBJ** D-1675 (`remarm_swapwep` `#altunwield`; `floorfood` `iflags.menu_requested`; canned name/stylus KEY) + **IA_BUY_OBJ shop pay D-1676** (`itemactions` unpaid `p` `shop_keeper`/`inhishop`; `dopay` canned billed invlet) + **IA_TWOWEAPON D-1677** (`itemactions` `'X'` MAYBETWOWEAPON / `could_twoweap` / `!uarms`; `itemactions_pushkeys` canned `dotwoweapon` no invlet) + **IA_RUB_OBJ / IA_SWAPWEAPON / IA_WHATIS_OBJ D-1686** (`itemactions_pushkeys` `dorub`+invlet / `doswapweapon` no invlet / `dowhatis` `'i'`+invlet; `pager.c` `do_look` cmdq_pop KEY skip-menu; `display_inventory` canned KEY)); **dotypeinv Traditional itemize yn D-1687** (`invent.c` `:3826–4032` yn_function class prompt / FULL query_category PICK_ONE; `this_type_only` `:3792–3823`; `tally_BUCX` `:3578–3616`; callee `shk.c` `doinvbill`; `query_objlist` this_title / PICK_ONE; cmd `I` / #inventtype); **itemactions Engrave/Write + stack simpleonames + apply catalogue D-1833** (`iactions.c` `:429–445` `is_blade`/`oc_tough` Engrave vs Write; local `simpleonames` `quan!=1` `makeplural`; apply otyp chain `:309–400`; `item_reading_classification` cookie/shirt/apron/hawaiian + SCR_MAIL; `is_wet_towel` / `body_part(HAND|FINGER)`; named: W already-wearing `armor_simple_name`; dungeon.c `surface` terrain; `cantwield` `'w'` skip; objnam export `simpleonames` still omits makeplural))**;
**`display_pickinv`/`invent_lines` Hallu `obj_glyph`≡`obj_to_glyph(rn2_on_display_rng)` per item** 
(D-0856; seed0383 Scr 209→211); **`dismiss_nhw_menu` ≡ erase_menu_or_text** (fullscreen docrt / 
corner gbuf-flush; D-0857); **`doattributes` Status `Hallucination` + 
Attributes `Antimagic`/`from_what`** (D-0858; seed0383 **PASS**; 
Stoned/Slimed/…/Blind status + Invulnerable/Cold/… resists + wear/invis plines deferred); 
disco inv_order + `*`/encounter + `OBJ_DESCR`/`obj_typename` (D-0040); 
**`disco_append_typename` + `append_price_quote` `{buy N}`** (D-0469; 
sell quotes / BUFSZ truncate deferred); **`dodiscovered` NHW_TEXT `show_text_pages` + 
VENOM_CLASS append** (D-0928 #1142; discosort a/c/s + unique/artifact pseudo-classes + 
`flags.inv_order` override deferred); **`display_inventory` wizid Debug Identify `unid_cnt==0` 
corner menu** (D-0928 #1143) + **unid_cnt>0 PICK_ANY `_`/^I/letters
D-1590** (`build_wizid_pickinv_items`; SKIPINVERT `menuitem_invert_test`;
empty `"Not carrying anything."`; `identify_pack` `update_inventory`); 
**Samurai `interesting_to_discover`/`disco_typename`/`discover_object` gate** (D-0079); 
**`paint_corner_nhw_menu` fullscreen when `maxrow>=24`; 
no botl flush under `in_role_selection`** (D-0111); 
**chargen corner: WIN_MESSAGE clear + prior-menu erase, not clearScreen** (D-0348); 
**`select_menu_pick_none` lmax=23 paging** (D-0122); 
**`display_inventory`/`display_pickinv_reply` npages>1 → `(N of M)` + Space page** (D-0426; 
**D-1872** `wintty.c` `process_menu_window` `:1621–1649` page keys `>`/`<`/`^`/`|` in `select_menu_pick_none` + `display_pickinv_reply` + `display_used_invlets` (PICK_NONE included; `>` never finishes; PICK_NONE `:`/default bell); 
other NHW_MENU callers still single-page); 
**`doorganize`/`#adjust` getobj + destination cancel/move/collect/swap/merge** (D-0127); 
**`paint_corner_nhw_menu`/`select_menu_pick_none` flush NEED_MORE** (D-0195); 
**drop getobj `compactify` when suggested>5** (D-0332); 
**friday13 `doattributes` two-space body indent** (D-0333); 
**`$`/`doprgold` wallet pline** (D-0338; **D-1720** `currency`; **D-1731**
`hidden_gold(FALSE)` `:4502–4546` stash `eos` / non-verbose total +
m-prefix `dispinv_with_action("$", FALSE)`; **D-1740**
`shopper_financial_report` / `shop_debt` `:989–1035` two-pass
`next_shkp` xor + debit+bill; live `js/invent.js` + `js/shk.js`;
dokick `hidden_gold_kick` / botl hidden_gold callers named); 
**`)`/`doprwep` bare-handed / wielded `xprname`** (D-0339; m-prefix inuse menu D-1589); 
**`[`/`doprarm` + `=`/`"`/`(`/`doprring`/`dopramulet`/`doprtool`/`*` `doprinuse`** (D-0340; 
**inuse `dispinv` D-1589**; **uskin noarmor D-1668** (`simpleonames` + `"set of "` + strstri `" dragon "`; polyself merge `uskin=` / scale-mail revert named); **`#seeall` EXT_CMDS D-1605**
typed runner + sibling `#seeweapon`/`#seearmor`/`#seerings`/`#seeamulet`/`#seetools`;
`doextlist` named); 
**`doattributes` Background `In_endgame`/`endgamelevelname` + moves==1 just-started + 
wizard XP delta** (D-0572; `MAGICENLIGHTENMENT` Attributes for wizard ^X + status `<%d>` + 
Is_bigroom deferred); **getobj ALLOWCNT count prefix D-1530**; **canned CMDQ_INT D-1551** (`need_more_cq` INT then KEY + split_otmp; apply/grease/jelly/rub KEY); **`display_pickinv` `&ctmp` D-1559** (PICK_ONE digits / n==1 `-1`; ALLOWCNT throw/drop/wield/ready/charge/adjust; **stash D-1561**); **`in_doagain` CQ_REPEAT D-1563**; **getobj in_doagain readchar + GETOBJ ranks + sortloot filter D-1804** (`hack.h` `GETOBJ_EXCLUDE=-3`…`SUGGEST=2`; `getobj_filter_prompt` SORTLOOT_INVLET; `gi.in_doagain` `readchar` not yn; silly_thing after REPEAT before split_otmp; `#adjust` live getobj; named: display_pickinv body, getobj_* clones in do/wield/potion/apply/write, readchar_core fuzzer/queue/ALTMETA); **live getobj wear/puton/throw/drink/remove D-1834** (`dowear`/`doputon`/`dothrow`/`dodrink`/`doremring` call `js/invent.js` `getobj`; `do_wear.c` `equip_ok` `:3403–3447` GETOBJ ranks + covering cloak/suit/gloves; `throw_ok` `:316–348` `!uslinging`/sling gems/boulder; `drink_ok_extra` fountain/sink; rhack `'R'`; named: drop/wield/apply/write/takeoff/dip clones, `canwearobj` polyform); **eat/read/zap/tin getobj NOFLAGS D-1568** (`js/invent.js` `getobj`; eat_ok/tin_ok/tinopen_ok NOFLAGS; read_ok GETOBJ_PROMPT; zap_ok NOFLAGS; empty !forceprompt; digit reject; pickinv null out_cnt; floorfood `getobj_else`; **sacrifice/offer_ok D-1665**); **`display_pickinv` hands/xtra_choice D-1569** (`getobj_hands_txt`; usextra n-bump + n==1 `message_menu(HANDS_SYM)`; sortpack Miscellaneous `'-'` row; live getobj `- ` SUGGEST prefix; wield/ready/grease/dip_ok); **force_invmenu `*`/`?` redo D-1578** (`getobj` skip yn auto `?`/`*` oneloop; `display_pickinv` Special `(list everything)`/`(list likely candidates)` + tty_end_menu query; `getobj_display_pickinv` redo_menu); **mime_action D-1579** (`invent.c` `:1677–1706`; typed `'-'` `!allownone`; `hacklib.c` `ing_suffix`; getobj_adjust `'-'`; pickinv `'-'` no mime); **gacc / `'0'` ball D-1580** (`invent.c` `:3323–3325` non-wizid gacc 0; `let_to_name` showsym `"  ('%c')"`; `drawing.c` `def_oc_syms` BALL `'0'`; `wintty.c` collect gacc + `!counting && strchr(gacc,'0')`); **`sortloot` INVLET D-1581** (askchain; invent Array); **ggetobj takeoff/identify D-1602** (`invent.c` `:2199–2369` Traditional getlin class prompt; takeoff `is_worn` / identify `not_fully_identified`; `askchain` `:2376–2541` worn/unid filters + ident `'q'` `-1` + skip takeoff `"That was all."`; callers `identify_pack` MENU_TRADITIONAL + `doddoremarm` `select_off`; `take_off` occupation is D-1619; `menu_remarm` is D-1630; **ggetobj drop D-1635**); **putmsghistory D-1588** (`invent.c` getobj `:1926–1928` `msggiven` + `topl.c` `tty_putmsghistory`/`remember_topl`/`dumplogmsg`; live getobj); **`sortloot` inuse_only D-1589** (`invent.c` `inuse_classify` `:70–144` + `sortloot_cmp` SORTLOOT_INUSE + `display_pickinv` `:3186–3317` `is_inuse` filter / fake HANDS_SYM W_WEP / inuse_headers; `dispinv_with_action` `flags.sortloot='i'`; `doprinuse` `*`; CMD_M_PREFIX `)`/`[`/`=`/`"`/`(`/`*`); **perm_invent InvInUse D-1600** (`invent.c` `prepare_perminvent` `:5548–5562` `fromcore.invmode`; `display_pickinv` `:3108–3113` `inuse_only = invmode&InvInUse` / `show_gold = invmode&InvShowGold`; `:3277–3280` `"In use"` vs `"Inventory in use"`; `sync_perminvent` `:5653–5656` `display_inventory(NULL,FALSE)` PICK_NONE; `wintype.h` InvInUse=8; **writers D-1603** `allmain.c:71` / `restore.c:942` `beyond_savefile_load`; **tty WIN_INVEN / `#perminv` D-1642** (`invent.c` `doperminv` `:2813–2857` `|` / `#perminv` IFBURIED|GENERALCMD|NOFUZZERCMD; `wintty.c` `assesstty` `:3557–3599` minrow 28/mincol 79 SMALL_INUSE 10; `tty_ctrl_nhwindow` request_settings too_small (RESIZABLE) + need 52x79; `ttyinv_create_window`/`ttyinv_add_menu`/`selector_to_slot`/`slot_to_invlet`/`ttyinv_populate_slot`/`ttyinv_render` InvSparse empty letters/`tty_refresh_inventory` setCell; live `js/invent.js` + `js/cmd.js` `|` + `js/getline.js` `#perminv`; 24x80 too_small; `optfn_perminv_mode` / `handler_perminv_mode` / `cmap_D0walls_to_glyph` / **`tty_wait_synch` D-1646** / `set_option_mod_status` / toggle-off `docrt` named)); **SORTLOOT_PETRIFY D-1599** (`invent.c` `sortloot` `:611–620` filter override keep `touch_petrifies` CORPSE; `will_feel_cockatrice` `:4333–4340` + `feel_cockatrice` `:4342–4361`; `look_here` skip/single/multi feel; `pickup.c` `query_objlist` FEEL abort `look_here(0)`; eat.c / doloot / pray force_touch / engulfer stomach named); **wizid unid_cnt>0 PICK_ANY D-1590** (`invent.c` `:3222–3407` `'_'`/`^I` SKIPINVERT + skip fully ID'd + sortpack headers; `windows.c` `menuitem_invert_test`; `identify_pack` `update_inventory`); **`display_used_invlets` D-1591** (`invent.c` `:3466–3519` sortpack `let_to_name` + `doname` + `obj_to_glyph` PICK_ONE `"Inventory letters used:"`; caller `doorganize_core` `:5146` `?`/`*` n==0 retry / n<0 ESC; live `build_used_invlets_items`; nobj-split avoidlet live D-1621; gold adjust D-1641); **`adjust_split` D-1621** (`invent.c` `:5007–5065` getobj `"split"` NOFLAGS + yn digit + `get_count` GC_ECHOFIRST|GC_CONDHIST then `splitobj`+`doorganize_core`; caller `iactions.c` `itemactions_pushkeys` IA_ADJUST_STACK `#altadjust` INTERNALCMD; nobj `"Split N"` / unsplit cancel / bump `assigninvlet` export `u_init.js`; **`check_invent_gold` D-1641** (`adjust_gold_ok` / doorganize filter / itemactions gold `i` / dest `$`); **`invlet_constant`/`reassign`/`obj_to_let` D-1655** (`invent.c` `:4853–4884` / `:2860–2868`; `fixinv` opt_out On; getobj/display_pickinv/doorganize/prinv/#see*; optfn_boolean fixinv/sortpack/implicit_uncursed/price_quotes; xprname use_invlet; **`dounpaid` D-1663**; wizcmds sanity_check is D-1664; wizweight named)); **`dounpaid` D-1663** (`invent.c` `:3653–3789` Iu one-item `pline` / NHW_MENU putstr + Total / floor+buried extra; `find_unpaid` `:3020–3041`; `mkobj.c` `unknwn_contnr_contents` `:682–695`; `xprname` `:2928–2938` Iu/Ix cost column; **D-1720** `currency` Hallu `ROLL_FROM(currencies[])` `:1545–1554` / `:1521–1543` live (`xprname` + `doprgold`/insight wallet + dokick/dig/lock/trap clones; shk_names_obj fmt stays C `zorkmid%s`); caller **dotypeinv / doinvbill D-1687**); **get_count historicmsg D-1613**; **`consume_obj_charge` known `update_inventory` D-1615** (`invent.c` `:1344–1345` after spe--; apply/detect/music/mkobj callers live; unpaid D-1047; InvInUse D-1600; writers D-1603; pickup tip-spill / trap `disarm_squeaky_board` callers named; **use_grease trailing D-1656**; **tip getobj / offer_ok D-1665**); 
getobj_* clones (drop/wield/apply/write/takeoff/dip) still local prompt loops; display_pickinv body (not this cluster); full magic enlightenment deferred; 
**`display_pickinv_reply` n==1 + lets → `message_menu` PICK_ONE** (D-0422; 
**`display_inventory` → `display_pickinv_reply` PICK_ONE/NONE D-1850**
(`invent.c` `:3427–3452` after cmdq; farlook `/` `i` pack headers stay on
non-selector; pickup.c `:223` / end.c `:592` pass TRUE; PICK_NONE bells
letters); 
menu_requested named; wizid unid_cnt>0 is D-1590; `display_used_invlets` is D-1591; gacc / `'0'` ball is D-1580; force_invmenu redo is D-1578; mime_action is D-1579; usextra hands is D-1569; putmsghistory is D-1588; sortloot inuse_only is D-1589; SORTLOOT_PETRIFY is D-1599; perm_invent InvInUse is D-1600; beyond_savefile_load writers are D-1603; tty WIN_INVEN / `#perminv` is D-1642; ggetobj takeoff/identify is D-1602; `#seeall` EXT_CMDS is D-1605; consume_obj_charge known is D-1615; `adjust_split` is D-1621; `check_invent_gold` is D-1641; `invlet_constant`/`reassign` is D-1655; use_grease trailing is D-1656; ggetobj drop is D-1635; **dounpaid is D-1663**; wizcmds sanity_check is D-1664; **offer/tip/invoke pushkeys is D-1665**; **unwield/name/eat/engrave pushkeys is D-1675**; **IA_BUY_OBJ shop pay is D-1676**; **IA_TWOWEAPON is D-1677**; **IA_RUB_OBJ / IA_SWAPWEAPON / IA_WHATIS_OBJ is D-1686**; **dotypeinv Traditional itemize is D-1687**; **`dosacrifice` ECMD_TIME is D-1667**; **`offer_corpse` is D-1678**; **uskin noarmor is D-1668**; **itemactions Engrave/Write/apply is D-1833**)

### `src/dothrow.c`, `src/zap.c:bhit`

JS: `js/dothrow.js` — partial

Dart split/flight/landing; `throw_ok` SUGGEST coins+weapons + getobj loop (D-0025); 
**`ok_to_throw` `notake`/`nohands` before getobj/`dofire`** (D-0928 #1112; 
`check_capacity` deferred); **throwit ACURRSTR urange D-1316** (crossbow 18 / owt / uball / ammo 
half+hand pline / air-lev recoil hurtle / boulder / Mjollnir / underwater; 
`isqrt(arw->range)` tether D-1323); **`dofire` + fireassist uswapwep swap via cmdq** (D-0069); 
**`getdir`/`help_dir` NHW_TEXT** (D-0071) + **`getdir`/cmdassist `.`/`s` = self; 
`throw_obj` self refuse pline** (D-0720; `throw_gold` self / confdir-on-self deferred); 
**`throw_obj` `u_wipe_engr(2)` D-1374** (C `:138` after self refuse before petrify; callee D-1051; 
canletgo/Mjollnir/too-heavy/welded/wet-towel / petrify `:139–148`; dig is D-1375); 
**`dothrow` → `getdir_cmdassist` + getobj CMDQ_KEY** (D-0742) + 
**`getdir_cmdassist` yn_function** (D-1721; tty_yn_function `flush_topl_more` is D-0093) +
**`getdir_cmdassist` CQ_REPEAT** (D-1729; shared `getdir_read_dirsym`); 
**`hurtle`/`hurtle_step` Punished tug + trap-anchor + nomul(-range) + wall/`m_at` stop + 
`u_on_newpos` (D-1038; not `teleds`; **`hurtle_step` `in_out_region` after isok before 
`*range==0`** D-1165; **`mhurtle_step` `will_hurtle && m_in_out_region` before place** D-1176; 
**`hurtle_step` dest-typ `switch_terrain` after flush** D-1277; 
endmultishot/drag_ball/drown/trap pass-over/check_special_room/steed 
`u_on_newpos`/petrify/`place_monster` vs rloc deferred)**; 
**`help_dir` More = `xwaitforspace(quitchars)` only** (D-0451; non-quitchar `tty_nhbell` D-1631); 
**`throw_obj` multishot + `multishot_class_bonus` + `rnd(multishot)`** (D-0093); 
**`throwit`→`stackobj`** (D-0094); **`throwit` land `cansee`→`newsym`** (D-0427; 
**`flooreffects` pool/lava/pit/shaft + Splash/Plop** D-0987; 
**`fire_damage`/altar/hot potion** D-0992; **`hits_bars`/`hit_bars`** D-0990; 
**`impact_disturbs_zombies` TRUE when `!IS_SOFT`** D-1229; 
**throwit `container_impact_dmg`(u.ux,u.uy) D-1249**; `obj_sheds_light` vision recalc deferred; 
**hitfloor `dropz(TRUE)` D-1263**; **invent `hold_another_object` `hitfloor(FALSE)` D-1272**; 
**pickup highdrop `hitfloor(TRUE)` D-1273**; **'toss_up D-1274**; 
**throwit returning_missile D-1282**; **throwit losehp `killer_xname` D-1346** (C `:1747`); 
**throwit swallowit D-1283**; **throwit slip D-1292**; **throwit stamina D-1293**; 
**throwit steed potionhit D-1297**; **boomhit D-1301**; **throw_gold swallow D-1302**; **throw_gold `ghitm`/bhit/dz/ship/floor D-1751** 
(unsplitobj D-0720 / quivered gold / dungeon.c ceiling vault-temple-shop labels named); 
**sho_obj_return_to_u D-1303**; **tethered DISP_TETHER/BACKTRACK D-1311**; 
**thitmonst leader catch / finish_quest D-1312**; 
**throwit_mon_hit snuff_candle / hot_pursuit D-1313; throwit caller D-1315**; 
**throwit ACURRSTR urange D-1316**; zap bhit `THROWN_TETHERED_WEAPON` / isqrt D-1323 (THROWN_WEAPON 
fly stand-in named); **`bhit` thrown/kicked `shade_miss` D-1383**; 
**`bhit` M_AP_OBJECT skip D-1392**; **`bhit` WEB stick D-1393** (kick/tether; 
throwit inline still skips WEB); **`bhit` `show_transient_light` `!Blind` youprop D-1604** (`youprop.h:103` `(HBlinded||EBlinded)&&!BBlinded` + `uroleplay.blind`; not sticky `u.Blind||u.ublind`; review **558**; apply camera Blind unchanged; worm tails / FLASHED_LIGHT `tmp_at` named); **boomhit/bhitm `m_respond` D-1314**; 
**thitmonst vanish pline D-1324**; **throwit land snuff_candle D-1333** (candles/candelabrum only, 
not snuff_lit; mthrowu `:942` D-1334); litter named); **volley pline `xname`/`singular`** (D-0097); 
**`throw_ok` DOWNPLAY lone' uwep + hand-throw pline/half range; 
`dofire` empty→`doquiver_core("fire")`** (D-0152); 
**`dofire` continue after doquiver** (D-0484); 
**`dofire` empty-quiver `You()` leaves NEED_MORE; `getobj_ready` `flush_topl_more` waits like C getobj** (D-1851; D-0484 skip reverted); 
**`dofire` autoquiver / find_launcher / throw-and-return / pole / whip / fireassist canned wield** (D-1851); 
**`dofire` mark_topline_seen after ready + `dir_from_key` MV_ANY capitals/Ctrl-rush** (D-0485); 
**`getobj` `*`/`?`→`display_pickinv_reply` + ALLOWCNT count prefix D-1530** (throw-one / gold count / split_otmp; pickinv `&ctmp` named) + **`throwit` mon-hit food/`befriend_with_obj`→`tamedog`** (D-0415); 
**`thitmonst` EGG/CREAM_PIE/VENOM `ACURR(A_DEX)>rnd(25)` → `hmon` cream-pie/`rn1(25,21)` blind** 
(D-0693); **`tmiss` + food-fail `tmiss(FALSE)` + else `tmiss(TRUE)` `!rn2(3)` wakeup** (D-0867; 
armor/non-special throw; `mshot_xname`→`xname`; 
**`thitmonst` WEAPON/weptool/GEM hit-vs-miss tmp+dieroll `hmon`/`tmiss` + 
APPLIED wakeup (D-1041)**; **`find_mac` minvent ARM_BONUS/guarding (D-1042)**; 
**`should_mulch_missile` hero blessed `!rnl(4)` (D-1043)**; 
**`special_obj_hits_leader` `is_quest_artifact` via `urole.questarti` not `u.questarti` (D-1044)**; 
ball/boulder/`potionhit`/`gem_accept` body; **swallow vanish pline D-1324**; 
`cutworm` + shop `obfree` + full `is_plural` otense deferred); 
throw_obj ACURRSTR crossbow volley gate / quest-artifact launcher / full `weapon_skills` / full 
`movecmd` bind table

### `src/mon.c`, `src/monmove.c`

JS: `js/mon.js`, `js/monmove.js` — partial

**`decide_to_shapeshift`/`newcham` same-form via mndx** (D-0928 #1130; 
`mons()` allocates — do not `!== mon.data`; seed4500 **107304→107470** RNG **107498** Scr **941**); 
Early ordinary movement; pet `postmov`→`mintrap` (D-0018); mfndpos `ALLOW_TRAPS` (D-0019); 
`OPENDOOR` gated on `nohands`/`verysmall` (D-0020); **`m_avoid_kicked_loc`** in `mon.js` (D-0032; 
not yet wired into hostile `m_move`); **`postmov` final `newsym(mx,my)`** (D-0039); 
**`mfndpos` BOULDER/`ALLOW_ROCK` + `NODIAG`** (D-0060); 
**`mfndpos` NOTONL via `monseeu`/`monlineu`** (D-0233; 
**unicorn `mon_allowflags` NOTONL** + fail-tele/`rloc_to` track clear D-0731; 
**`noteleport_level` for unicorn NOTONL + flee-tele** D-0859; 
**`mfndpos` onscary/garlic/IRONBARS/poison-gas + mconf/`!mcansee`** D-0731 #814; 
**poisoncloud glyph only (not fog/steam `S_cloud`)** D-0770; 
**mfndpos `m_poisongas_ok` vamp/eel/waterlevel-pool/AT_BREA poison/MINOR** (D-1159; 
Resists_Elem worn/artifact still named); **`mon_allowflags` 
isshk/priest/BUSTDOOR/unlock/minion·human/NOGARLIC + `in_your_sanctuary`/`ALLOW_SANCT`** D-0732; 
**`mfndpos` diagonal `worm_cross` + rogue door-cut** D-0733 — seed0399 @10157 cnt7vs5: **#1008 C 
poss[] DIAG done** — C drops MON_AT cells (elf noble×2 + spider); 
JS has those three at wrong coords (silent appr drift); not mfndpos ROOM omit; 
**peaceful shop/temple dig avoid** D-0865; full `passes_bars` ALLOW_BARS D-1258; 
hero `hack.c` `test_move` `passes_bars` D-1270; Underwater / rock Passes_walls named); 
**`monnear` NODIAG diagonal** (D-0199); **exported `monflee`** (D-0635; 
**`mon_track_clear` always** D-0860; **`release_hero` D-1798** / flees_light/Vrock deferred); 
**`dochug` frozen/sleep Hallu `newsym`** (WAITMASK/msleeping); 
**`dochug` NOTHING/DONE/NOMOVES Hallu `newsym` after 2nd distfleeck** (D-0853; 
**isgd vanish D-1798**; #977/@172 Scr−2 was different window); 
**`dochug` mconf/mstun recover + mflee `rn2(40)` teleport (`can_teleport`/`await rloc(RLOC_MSG)` 
D-0886) + **`m_respond` D-1314** + courage `rn2(25)`** (D-0442; gazemu D-1328; 
**leppie_stash D-1798** — named: `mdrop_obj` flooreffects/saddle); **`dochug` STRAT_CLOSE + `monnear` → `quest_talk`** (D-0590; 
**PHASE FOUR nearby `quest_talk` D-1798**; nemesis msound still deferred); 
`distfleeck` scared/onscary/flees_light/`monflee` still stub (D-0854: LCP 555 Monnam×7 is **not** 
fleeck→monflee — no core `rnd` between fleecks); 
**`dochug` covetous `tactics` before fleeck** (D-0928 #1120; STRAT_NONE harass rn2/mnexto; 
STRAT_HEAL mavenge-only — choose_stairs/rloc/healmon/FALLTHROUGH + `target_on` pursuit deferred); 
**`disturb` `wake_msg` still deferred**; **D-0779 #893–#895:** siege quasit silent `m_move`→CLOUD 
then 2nd fleeck site-shifts bat `!rn2(3)` — C moves then skips 2nd fleeck (DIED/`mon_offmap`); 
D-0781 gates live, CLOUD setter still open; 
**`dochug` undirected `castmu` before `m_move`** (D-0641; 
**`HASTE_SELF`→`mon_adjust_speed` + `CURE_SELF` `d(3,6)`** D-0796; 
other `mcast_spell` / `mattacku` AT_MAGC deferred); 
**`dochug` MMOVE_MOVED→ranged fall-through** (D-0105); 
**`dochug` NEED_HTH `mon_wield_item` when `dist2<=8` + `Conflict` in want_move** (D-0264); 
**`dochug` `is_watch`→`watch_on_duty` `!rn2(3)` + `in_town`/`has_town`/`picking_lock`** (D-0876; 
**mon_yells D-1248**; angry_guards/`is_digging`/`watch_dig` live); 
**`dochug` `mind_blast` D-1238** (`is_mind_flayer` `!rn2(20)` then body + 
`set_apparxy`/`distfleeck`; **bee_eat_jelly D-1246**; 
**`gelcube_digests` D-1257** (`eaten_stat` + `extract_from_minvent` + 
`m_consume_obj` heal/`delobj`; meatbox/poly named); **`meatmetal` D-1271**; 
**`meatobj` D-1284** (cube floor engulf `mpickobj` / devour `m_consume_obj`); 
**`meatcorpse` D-1285** (corpse_eater floor CORPSE; vegan/petrify skip; rider revive; splitobj; 
`m_consume_obj`; `mon_would_consume_item` still named); **postmov IRONBARS D-1247**; 
**`mon_yells` D-1248**); **`dochug` uses `hero_conflict` + 
PHASE FOUR `resist_conflict` for peaceful under Conflict** (D-0413); 
**`dochug` MMOVE_MOVED fall-through includes `ranged_attk_available`** (D-0609; 
`m_seenres` gate in ranged_attk still deferred; **MOVED unstuck/`helpless` + `wormhitu` D-1798**); 
**`m_move` cnt==0 `find_defensive(TRUE)`+healing `use_defensive`/`precheck`** (D-0610; 
flee/dig/tele/create invent + blindness healing deferred); 
**`dochug`→`disturb` sleeping wake (`rn2(7)` / Stealth/ettin/nymph|jabber|lep)** (D-0278; 
`wake_msg` still deferred); **`dochug` `wipe_engr_at(mx,my,1)` before apparxy/fleeck** (D-0369; 
mconf/mstun/flee-teleport/**m_respond D-1314**/courage between wipe and apparxy (gazemu named); 
**`dochug` STRAT_ARRIVE `m_arrival` + MS_BRIBE mux-mismatch D-1798** (`demon_talk` paid-off / `cuss` `!rn2(5)` named)); 
**`dochugw` occupation threat → `stop_occupation`** (D-0392; `onscary` stub); 
**hostile `m_move`→`postmov` + `mfndpos` known-trap skip** (D-0151); 
**`set_apparxy` Displacement/Invis/Underwater** (D-0154; cloak otyp for EDisplaced; 
**`can_fog` vampshifter** D-0799; omit `oc_oprop`/DRAWBRIDGE 
`SURFACE_AT`/`stuff_prevents_passage`); **`postmov` door open/unlock/smash + UnblockDoor + 
monhaskey/mb_trapped** (D-0159; **pline_mon D-1227**; You_see/You_hear stay pline; 
**postmov IRONBARS eat/Norep D-1247**; **`mon_yells` D-1248**; 
**`msg_mon_movement` D-1228** dest `pline_xy` after place not `pline_mon`; 
optlist addr / `worm_move` named; **mind_blast D-1238**; **bee_eat_jelly D-1246**; 
**`gelcube_digests` D-1257**); **`m_move` meating countdown before `dog_move`/approach + 
pet `mtrapped`** (D-0169); **`mcalcdistress`/`mon_regen` mfrozen/mblinded/mfleetim** (D-0257); 
**`were_change`/`new_were`/`counter_were`** in `js/were.js` from `m_calcdistress` (D-0523; 
omit howl `You_hear`/`wake_nearto`, `mon_break_armor`/`possibly_unwield`/`monflee` onscary; 
cham `decide_to_shapeshift` regular+vamp (D-0623/D-0659; minliquid via D-0775); 
**`newcham` NC_SHOW_MSG `pline_mon`/`usmellmon`/`noname_monnam` D-1586**; **`normal_shape` await `NC_SHOW_MSG` D-1594** (Protection cancel 
D-1573; **getlev `restore_cham` D-1637**; **newcham mleashed `m_unleash` TRUE/`update_inventory` + Elbereth `set_apparxy`/`monflee` D-1645**; **await remaining async NO_NC_FLAGS `newcham` D-1648**; `possibly_unwield`/`mon_break_armor`/ustuck/`poly_steed`/boulder named; sync makemon/`load_tower1` named); 
**open D-0928 #1118:** after getlev, vamp-bat @46,19 `mcalcmove` add 12 vs C 24 (2nd movemon pass 
missing → early EOT shapeshift @104705; fmon order / lich placement suspect; 
`restore_cham` on getlev is D-1637); 
**`tunnels`/`needspick` + `ALLOW_DIG` mfndpos rockok/treeok/thrudoor + 
`postmov`→`mdig_tunnel`** (D-0178); **`m_digweapon_check` + hero-square MMOVE_NOTHING** (D-0180); 
**`haseyes`/`can_track`; hostile `should_see`+`gettrack` (D-0181)**; 
`throws_rocks`/`passes_walls` helpers; omit `m_can_break_boulder`, garlic/temple/iron 
bars/poison-gas `visible_region_at` (**D-0597:** `mfndpos` pool/lava/waterwall + 
`ALLOW_WALL` bit), Sokoban push-avoid body; 
**`mfndpos` diagonal `bad_rock`/`cant_squeeze_thru`** (D-0612; 
`can_fog` vampshifter in squeeze still deferred); 
**D-0708 open:** seed0014 @49039 peaceful gnome `mfndpos` cnt 6 vs C 5 (symptom looked like 
`distfleeck` `rn2(6)`); **D-0710 fixed:** seed0108 missing `#rub`→SE `n` desynced pet nearby (not 
dochug geometry); **S_LEPRECHAUN findgold arm D-1798** in want_move OR; 
**`m_balks_at_approaching`** launcher/pole/aklys/`ranged_attk_available` + `appr==-2` (D-0253; 
`m_seenres` in ranged_attk deferred); shortsighted / wired `m_avoid_kicked_loc` / **`m_move` 
post-select `chi` + `itsstuck` + `ALLOW_U`→mux + 
`nix==mux`→`m_move_aggress` (empty image → DONE)** (D-0790; 
**`mdisplacem` swap + `update_monster_region` both after defender tail (D-1174)** / 
`should_displace` prefer / `m_can_break_boulder` / region can_enter / `mfndpos` still omits setting 
`ALLOW_MDISP`); **`mfndpos` door amorphous-engulfing arm + fixed-tele-track `ALLOW_TRAPS` (D-1868;
can_fog / corrupt-ttyp impossible still named)**; **D-0794/D-0796 fixed:** seed0360 leftover apprentice was missing `HASTE_SELF` 
MFAST (EOT `+=24`); prefix **112243→112279**; **`movemon_singlemon` early exits** (D-0795; 
full `gd_move` / `dmonsfree` deferred); **`m_move` Invis `should_see&&rn2(11)` + 
stalker/bat/light rn2(3) + leppie_avoidance** (D-0268; shortsighted after track still deferred); 
**`m_search_items`/`mon_would_take_item` getitems loot gg** (D-0182); 
**postmov `mpickstuff` MOVED|DONE** (D-0185) + **`distant_name(otmp,doname)`** (D-0840; 
was plain doname → long ID names / early More); 
**`can_carry` quan>1 → 1 only for `M1_NOHANDS` non-glomper** (D-0186); 
**underfoot MMOVE_DONE + peaceful `can_carry`** (D-0183/D-0223; 
underfoot `return TRUE`→`postmov`→`mpickstuff` restored; 
omit `searches_for_item` (D-0598 potion/wand/scroll/amulet/tool subset; 
**Is_container/Is_mbag/!olocked** D-0861; 
FOOD corpse/tin/egg + `can_blow` polish deferred)/shop/`hides_under` in 
`m_search_items`/`onscary`/`costly_spot`/prizes/`can_touch_safely` body/`mon_would_consume`); 
**`m_move` Tengu nature teleport `!rn2(5)`→rloc/mnexto + uswallow early-out** (D-0778; 
MAIL_DAEMON deferred); **`dochug`/`postmov` `mon_offmap` after `m_move`/`mintrap`** (D-0781; 
skips 2nd `distfleeck`; setter paths still partial); 
**`m_move` isshk→`shk_move` before getitems** (D-0205); 
**`m_move` `set_apparxy` before mtame/shk|gd|priest** (D-0267; 
C order — shk early-return must still consume notseen `rn2(3)`); 
**`movemon_singlemon` `is_hider`+`M_AP_OBJECT`/`FURNITURE`/`mundetected` skip dochug** (D-0206) + 
**`S_EEL` `!mundetected` `(mflee||!m_next2u)` `!canseemon` `!rn2(4)` → `hideunder`** (D-0928 #1107; 
You_see via #1139; cockatrice / can_hide_under_obj polish deferred) + 
**`mfndpos` eel `nexttry`** land crawl when `!cnt && wantpool && !is_pool` (D-0928 #1108); 
**`movemon` after last mon: `dmonsfree` then `u.utotype` → `deferred_goto` + 
`somebody_can_move=FALSE`** (D-0828/D-0591; 
light-source vision_full_recalc / clear_bypasses / clear_splitobjs still deferred; 
**D-0830 rejected:** post-swallow mcalcmove/MSLOW/minliquid not @10374; 
**D-0831 rejected:** JS mcanmove/sleep/WAITMASK/I_SPECIAL clear at EE act (ustuck=ice vortex; 
gnome unworn LEVITATION_BOOTS — closed by **D-0832** `m_dowear`/`check_gear`/`I_SPECIAL`); 
**D-0832 fixed:** `js/worn.js` `m_dowear`/`which_armor`/`update_mon_extrinsics` + 
`makemon` `m_dowear(TRUE)` + `mpickstuff` `check_gear_next_turn` + 
`movemon_singlemon` I_SPECIAL arm (seed0383 **10374→10608**; 
artifact_light / dogmove check_gear / youmonst which_armor deferred); 
**D-0855:** `m_dowear_type` entry `See_invisible?Monnam:mon_nam` nambuf (Hallu rndmonnam; 
wear/invis plines still deferred; Scr **201→209**); 
**D-0829 rejected:** makemon 165/108 creation order not @10374 — C skips gnome `dochug` with no 
RNG); **`movemon_singlemon` Conflict→`fightm` before `dochugw`** (D-0413; 
ustuck/itsstuck release deferred; **`m_everyturn_effect` fog→`create_gas_cloud` size-1 + 
`m_postmove_effect` Hezrou/Steam** (D-0623; **D-1167** `hack.c` youmonst after occupy uses `u.ux0`; 
monster still pre-place `mx/my`; **D-1175** `allmain.c` youmonst fog at `u.ux`); 
**D-0834:** `region.js` add_region m_at→`monsters[]` + `run_regions` fog `ttl+=5` + 
`m_in_out_region` (seed0383 **10646→10843**; dam>0 inside_f D-1146; hero_inside bit D-1169; 
expire dissipation D-1155; teleport `update_monster_region` D-1161; 
mhurtle_step three-loop D-1176); **`m_calcdistress`→`decide_to_shapeshift` regular+vamp** 
(D-0623/D-0659; `pickvampshape` Vlad `mon_has_special` still deferred); 
**`restrap` body (D-0622) + movemon pre-dochug call (D-0624; eel hideunder/`rn2(4)` deferred)**); 
**`minliquid`/`minliquid_core` lava+pool in `movemon_singlemon` + 
mmove==0 `m_calcdistress`** (D-0775; **eel out-of-water → `monflee(2)` incl. `mon_track_clear`** 
D-0928 #1110; **D-1095** gremlin `split_mon`+fountain `dryup`+pool `water_damage_chain`; 
**D-1117** iron-golem rust + drown `xkilled`/`mondied`; 
**D-1138** lava `on_fire`/`fire_damage_chain`; 
**D-1148** `deal_with_overcrowding` after failed survivor `rloc`; 
**D-1149** clog-victim `mongone` `mdrop_special_objs` then discard; 
steed air/`engulfing_u` flush / `mdrop_obj` worn extract still named); 
**`seemimic`/`wakeup`/`setmangry` for stumble reveal + missum/hmon anger** (D-0207/D-0234; 
**`wakeup` was_sleeping → `wake_nearto(mlevel*18)`** D-0922 + **`wake_msg` + 
growl pline** D-0928 #1161; **`peacefuls_respond` D-1772** (watch Halt
`verbalize`+`angry_guards`; humanoid `maybe_gasp`/flee/anger; same-mlet
`big_little_match`+growl `PLNMSG_GROWL`; `setmangry` `!mon_moving`); omit Elbereth 
hypocrite/`qst_guardians_respond`/victim growl else-arm/`hot_pursuit`/`freemcorpsenm`/light-block); 
**`postmov` hides_under/`S_EEL` `rn2(5)`→`hideunder` + `can_hide_under_obj`** (D-0496; 
**You_see hide pline** D-0928 #1139; pet cursed / cockatrice skip deferred) + 
**`m_move` `maybe_unhide_at` after place before track/postmov** (D-0769; youmonst path deferred); 
**`postmov` `maybe_spin_web` + `webmaker`/`count_traps`/`holds_up_web`** (D-0595; 
**pline_mon + upstart(y_monnam)/something D-1227**; shop `add_damage` deferred); 
**`m_move` hides_under + OBJ_AT + `can_hide_under_obj` + 
`rn2(10)` stay-put before `set_apparxy`** (D-0589); dog_move digweapon; 
vampshift fog door sequencing; **ALLOW_BARS rust/corr/metallivore D-1258**; 
hero `test_move` `passes_bars` D-1270; **`dissolve_bars` `switch_terrain` D-1259**; 
**`meatmetal` D-1271**; **`meatobj` D-1284**; **`meatcorpse` D-1285**; 
`mon_would_consume_item` named; engulfing_u; shop `add_damage`; `has_magic_key` disarm; 
`is_rider` unlock; full mondied from `mb_trapped`; `finish_meating` mimic AP; 
cursed-mwep dig-tool gate **ported D-1868**; huge-quan `rn2` clamp; dogmove `can_carry` still simplified |

### `src/mondata.c` trap memory / `src/trap.c` web / `maketrap` / `dountrap`

JS: `js/trap.js` — partial

**`maketrap` `tseen = unhideable_trap(typ)` (HOLE always seen)** (D-0891; 
bones `unhideable_trap` reaffirm / pit conjoined / overwrite `reset_utrap` named; 
**PIT/HOLE `set_levltyp` D-1280**; **DRAWBRIDGE_UP ice D-1296**; **shop `add_damage` D-1300**); 
**`mon_knows_traps`/`mon_learns_traps` `mtrapseen`** (D-0151); 
**`mons_see_trap`** lit 7² / unlit 2 fan-out from `dotrap`/`mintrap` (D-0701); 
**`trapeffect_web` mon catch/`mtrapped` + `mu_maybe_destroy_web`** (D-0866; 
hero/steed/strength-tim deferred); **`trapeffect_fire_trap`/`dofiretrap` 
`burnarmor`→`destroy_items(AD_FIRE)`** (D-0928 #1120; 
dynamic import vs zap cycle) + **`burn_floor_objects` give_feedback / smell + 
`melt_ice`** (D-0975) + **`ignite_items`/`burn_away_slime` via fire trap** (D-0978; 
surface deferred); **`launch_obj` ROLL `tmp_at(DISP_FLASH)` + 
`nh_delay_output` delaycnt=2** (D-0890; LAUNCH_UNSEEN bowling / curs_on_u / down_gate / 
boulder-chain / post-switch flooreffects deferred; 
**mid-roll TELEP/LEVEL_TELEP `pline_xy` + `rloco`/migrate D-1237**; 
**mid-roll LANDMINE KAABLAMM/`fracture_rock`/`scatter` + PIT/HOLE `flooreffects` D-1256**; 
**hits_bars** D-0990); **`untrap` door D_TRAPPED find/disarm + 
`has_magic_key`→force D-1495** (C `trap.c:5865–5868` / `:6051–6095`; 
force skips find `rn2`/fail `rnd`; usual `getdir` D-0928 #1175); 
**floor `disarm_holdingtrap` / `disarm_landmine` / `disarm_shooting_trap` /
`disarm_box` / `untrap_box` / `help_monster_out` + `try_disarm` /
`untrap_prob` / `cnv_trap_obj` / `try_lift` D-1813** (C `:5551` /
`:5593` / `:5663` / `:5793` / `:5820` / `:5699` / `:5440` / `:5287` /
`:5340` / `:5676`; JS `untrap` had returned 0 on a seen floor trap);
`disarm_squeaky_board` / adjacent-Whoops `move_into_trap` (no
`test_move` export) / `stumble_on_door_mimic` named; 
**`chest_trap` luck-save + explode/gas/needle/fire/elec/freeze/hallu** (D-0989; 
**gas `Blind`/`rndcolor` D-1147**; Soundeffect / bot polish / Halluc_resistance stagger still 
named); omit steed `mon_learns`; `madeby_u` `rnl` setmangry

### `src/spell.c`

JS: `js/spell.js` — partial

**`initialspell` + `spl_book` + `age_spells` + 
`dovspell` VIEW** (Fail%/Retention via `percent_success`/`spellretention`; D-0129); 
**wizard `dospellmenu` turns / `spellknow(i)`** (D-0586); 
**`dospellmenu` dismiss via `dismiss_nhw_menu`** (corner gbuf-flush ≠ docrt; D-0857); 
**`skill_based_spellbook_id`** (D-0132); **`Z`/`docast`/`getspell` CAST + `spelleffects_check` + 
SPE_HEALING self-zap** (D-0135); **`study_book` blank + known-refresh yn + delay/too_hard + 
begin-memorize** (D-0136); **`cursed_book` `rn2(oc_level)` + `aggravate` + 
too_hard nomul/`!rn2(3)` crumble** (D-0681); 
**`set_occupation(learn)` + `learn` finish `makeknown` credit_hero** (D-0907); 
**`cursed_book` default → `rndcurse`** (D-0969; 
lenses-speed / confused_book / deadbook / novel / dull sleep / `In_W_tower` / check_unpaid / 
shieldeff still deferred); **`tport_spell` hide/add/unhide/remove SPE_TELEPORT_AWAY (D-1209)**; 
**`known_spell` + `dotele` energy/spellcast + `spelleffects` SPE_TELEPORT_AWAY atme + 
`spelleffects_check` `check_capacity` (D-1225)**; 
**skilled SPE_FIREBALL/SPE_CONE_OF_COLD `throwspell` scatter (D-1378; 
`rnd(8)+1` `explode` olet 0 + `spell_damage_bonus`; 
callee `zap.c` `zapyourself` D-1365 when dx=dy=dz=0)**; 
**unskilled SPE_FIREBALL/CONE FALLTHROUGH `weffects` (D-1386; 
C `:1454–1514` FORCE_BOLT `physical_damage` + RAY `ubuzz` BZ_U_SPELL) + 
live `getdir` cancel leftover dirs (D-1387; C `cmd.c` `:4095–4111` quitchars leave `u.dx/dy/dz`)**; 
**SPE_FORCE_BOLT IMMEDIATE `weffects`/`bhit` (D-1388; 
C `:1458–1514` `physical_damage` + getdir + `zapyourself`/`weffects` `rn1(8,6)`; 
callee `bhitm` `spell_damage_bonus`)**; **SPE_CREATE_FAMILIAR `make_familiar(NULL,u.ux,u.uy,FALSE)` 
(D-1389; C `:1569–1571`; callee `dog.c` D-1029; dynamic import vs dog→weapon→spell)**; 
**SPE_PROTECTION `cast_protection` (D-1390; C `:1104–1177` / `:1581–1583`; 
log2(ulevel) gain vs uspellprot/natac; `uspmtime` 20 expert else 10; 
callee `find_ac` + `timeout.c` `:652–661` usptime tick)**; 
**SPE_CLAIRVOYANCE `do_vicinity_map` (D-1391; C `:1572–1580`; callee `detect.c` `:1448–1585`; 
blocked cornuthaum hat; allmain seer_turn still named)**; 
**SPE_JUMPING `jump(max(role_skill,1))` (D-1397; C `:1584–1587`; callee `apply.c` `jump`; 
!TIME → nothing_happens; magic ustuck writhe + tame pull-free + air/waterlevel; 
#jump known_spell fallback still named)**; 
**SPE_CURE_SICKNESS `healup(0,0,TRUE,FALSE)` then ill/slime (D-1398; C `:1552–1567`; 
callee `potion.c` `healup` `make_vomiting`+`make_sick(SICK_ALL)` + `make_slimed`)**; 
**SPE_CURE_BLINDNESS `healup(0,0,FALSE,TRUE)` (D-1399; C `:1549–1551`; 
callee `potion.c` cream + `make_blinded` + `make_deaf`)**; 
**SPE_CHAIN_LIGHTNING `cast_chain_lightning` (D-1400; C `:1588–1590` / `:1002–1100`; 
callee `zap.c` `zhitm` `BZ_U_SPELL(AD_ELEC-1)` nd=2; peaceful skip; swallow TODO; 
`defended` / zhitm `spell_damage_bonus` still named)**; **SPE_CREATE_MONSTER `seffects` (D-1401; 
C `:1528–1531`; no skilled bless; callee `read.c` `seffect_create_monster` `:1608–1624` → 
`create_critters`)**; **SPE_MAGIC_MAPPING `seffects` (D-1407; same C `:1528–1531`; 
callee `read.c` `seffect_magic_mapping` `:2102–2153`; nommap `make_confused` + `notice_mon_off/on`; 
SCR D-0075)**; **SPE_DETECT_FOOD `seffects` (D-1788; C `:1517–1531` skilled bless
then FALLTHROUGH `seffects(pseudo)`; callee `read.c` `seffect_food_detection` →
`detect.c` `food_detect` D-1781; remaining scroll-duplicate otyps
REMOVE_CURSE / CONFUSE_MONSTER / CAUSE_FEAR / IDENTIFY / CHARM_MONSTER named)**; **SPE_HASTE_SELF `peffects` (D-1408; 
C `:1534–1546` skilled bless then `peffects(pseudo)`; callee `potion.c` `peffect_speed`/`speed_up`; 
**SPE_DETECT_TREASURE `peffects` (D-1417; same C `:1534–1546` skilled bless then `peffects`; 
callee `potion.c` `peffect_object_detection` → `detect.c` `object_detect` 
do_dknown/strange_feeling)**; **SPE_DETECT_MONSTERS `peffects` (D-1418; same C `:1534–1546`; 
callee `potion.c` `peffect_monster_detection` blessed `incr_itimeout` HDetect_monsters / unblessed 
`monster_detect` empty `strange_feeling`; `timeout.c` expiry `see_monsters`)**; 
**SPE_LEVITATION `peffects` (D-1419; same C `:1534–1546`; 
callee `potion.c` `peffect_levitation` `float_up`/`incr_itimeout`/`I_SPECIAL`; 
`timeout.c` `:794–803` `float_down`; cursed potion upstairs/`has_ceiling` live)**; 
**SPE_RESTORE_ABILITY `peffects` (D-1420; same C `:1534–1546`; 
callee `potion.c` `peffect_restore_ability` ABASE=AMAX / potion pluslvl; 
apply.c `unfixable_trouble_count`)**; **SPE_INVISIBILITY `peffects` (D-1421; 
C `:1544–1546` FALLTHROUGH `peffects` no skilled bless; 
callee `potion.c` `peffect_invisibility` wrapping / FROMOUTSIDE / timeout)**; 
**`spell_backfire` (D-1409; C `:1179–1217` `rn2(10)` confuse/stun TIMEOUT increment; 
caller `spelleffects_check` `:1251–1260` when `spellknow<=0`)**; 
**SPE_DETECT_UNSEEN NODIR `weffects`/`zapnodir` `findit` (D-1412; C `:1474` / zap.c `:2552–2558`; 
callee D-0074)**; **SPE_LIGHT NODIR `weffects`/`zapnodir` litroom (D-1427; 
C `:1473` / zap.c `:2544–2550` D-1366)**; **SPE_SLEEP RAY `weffects` ubuzz (D-1440; 
C `:1462` / zap.c `:3461–3462`)**; **SPE_DIG RAY `weffects`/`zap_dig` (D-1441; 
C `:1467` / zap.c `:3459–3460`)**; **SPE_MAGIC_MISSILE RAY `weffects` ubuzz (D-1448; 
C `:1463` / zap.c `:3461–3462`)**; **SPE_FINGER_OF_DEATH RAY `weffects` ubuzz (D-1449; 
C `:1472` / zap.c `:3461–3462`)**; **SPE_KNOCK IMMEDIATE `weffects` bhit (D-1450; 
C `:1464` / zap.c `:3440–3451`; bhitm/zapyourself D-0981)**; 
**SPE_SLOW_MONSTER IMMEDIATE `weffects` bhit (D-1451; C `:1465` / zap.c `:3440–3451`; 
bhitm D-1424 / zapyourself D-1433)**; **SPE_WIZARD_LOCK IMMEDIATE `weffects` bhit (D-1452; 
C `:1466` / zap.c `:3440–3451`; bhitm D-1425 / zapyourself D-1434)**; 
**SPE_TURN_UNDEAD IMMEDIATE `weffects` bhit (D-1458; C `:1468` / zap.c `:3440–3451`; 
bhitm/zapyourself unturn D-0955)**; **SPE_POLYMORPH IMMEDIATE `weffects` bhit (D-1459; 
C `:1469` / zap.c `:3440–3451`; bhitm WAN/SPE/POT poly live; zapyourself D-0156; 
zap_steed D-1471)**; **SPE_CANCELLATION IMMEDIATE `weffects` bhit (D-1460; 
C `:1471` / zap.c `:3440–3451`; bhitm/zapyourself `cancel_monst` live)**; 
**SPE_STONE_TO_FLESH IMMEDIATE `weffects` bhit (D-1461; C `:1478` / zap.c `:3440–3451`; 
bhitm golem/mimic; zapyourself polymon/Stoned/invent; bhito `stone_to_flesh_obj`)**; 
**SPE_TELEPORT_AWAY IMMEDIATE `weffects` bhit (D-1468; C `:1470` / zap.c `:3440–3451`; 
bhitm `u_teleport_mon`; zapyourself `tele()`; bhito `rloco`; zap_steed D-1455)**; 
**SPE_HEALING/SPE_EXTRA_HEALING IMMEDIATE `weffects` bhit (D-1469; 
C `:1475–1514` skilled bless then getdir + zapyourself/`weffects`; callee zap.c `:3440–3451`; 
bhitm `:433–473` `healmon` + skilled/extra `mcureblindness`; zapyourself healup D-0135; 
zap_steed via bhitm)**; omit swap/sort, other `spelleffects` otyps (remaining peffects 
mix/potionhit/potionbreathe; remaining scroll-duplicate REMOVE_CURSE /
CONFUSE_MONSTER / CAUSE_FEAR / IDENTIFY / CHARM_MONSTER — DETECT_FOOD is D-1788;
SPE_DRAIN_LIFE bhitm D-1436 / self-dir zapyourself D-1446), 
doorlock/zap_updown/steed, traditional getspell yn, CQ_REPEAT/amulet drain

### `src/mhitu.c` / `src/mthrowu.c` / `src/weapon.c` / `src/muse.c` / `src/potion.c`

JS: `js/mhitu.js`, `js/minion.js`, `js/mthrowu.js`, `js/weapon.js`, `js/muse.js`, `js/potion.js`, 
`js/steal.js`, `js/mcastu.js`, `js/wizard.js` — partial

**`castmu` cast pline + PSI_BOLT/OPEN_WOUNDS severity plines before `mdamageu`; 
`urgent_pline`/WIN_NOSTOP; `polyman` was_blind `make_blinded`** (D-0928 #1191; 
seed4500 Scr **1799→1803** prefix **@1761→@1770**; 
Half_spell_damage in castmu + **mcast_spell remaining 14 arms + `touch_of_death` D-1825** (`losestr` / `clonewiz` / `ureflects` empty-str); **PSI_BOLT `body_part(HEAD)` D-1508**; **`mcast_blind_you` EYE D-1534**; named: `mon_spell_hits_spot` / `has_aggravatables` / AD_FIRE/COLD/MAGM / `cursetxt` / `buzzmu`); 
**`enhance_weapon_skill` wizard y_n + speedy PICK_ONE / `skill_advance` / wizard practice columns** 
(D-0928 #1146; seed4500 Scr **1001→1120** prefix **@630→@707**; 
`add_weapon_skill`/`lose_weapon_skill` / `use_skill` may-advance msg deferred); 
**`mhitm_ad_legs` mhitu** (D-0928 #1131; seed4500 **107470→107645** RNG **107645** Scr **939**; 
nuzzle `pline_mon` D-1240; uhitm/mhitm arms + poly `body_part` deferred); 
**`mon_poly` youmonst + monster-defender + `mhitm_ad_poly` mhitu/mhitm AD_POLY** (D-1004/D-1006; 
`newcham` null-mdat non-cham + mbirth_limit; uhitm damageum poly'd-hero path deferred; 
shieldeff/ANTIMAGIC gear scan deferred); **`castmu` SUMMON_MONS → `nasty`** (D-0928 #1129; 
seed4500 **106852→107304** RNG **107335** Scr **941**; 
`wizard.c` nasty Inhell/`pick_nasty`/`enexto`/`makemon`; unmakemon full defer → mhp=0; 
other mcast_spell bodies are D-1825 (`mon_spell_hits_spot` / `has_aggravatables` still named); 
**`castmu` PSI_BOLT/OPEN_WOUNDS → `mdamageu` + `rehumanize`; 
Unchanging `mh<1` → `done(DIED)`** (D-0928 #1123; 
seed4500 still @**106540** — JS wears wished amulet of unchanging so savelife keeps Upolyd; 
force-ignore Unchanging → **106838**; invent/Put-on letter vs C deferred); 
**`mattacku` AT_MAGC→`castmu`/`buzzmu` + castmu dmg dice** (D-0928 #1122; 
seed4500 **106536→106540** RNG **106559** Scr **937**; 
was omitted AT_MAGC so choose_monster_spell skipped; real buzzmu zap deferred); 
**`getmattk` remaining substitutions + `mattacku` remaining body** (D-1795;
`mhitu.c` `:490–952` / `:309–444`; Underwater / `u.uundetected` / `#monster`
+ object-mimic / Invis `tmp-=2` / eel vis / `uinvulnerable` / DISE→STUN /
AD_DREN / cancelled AT_WEAP→PHYS / home-elem `damn*2` / Snickersnee
`hitval(youmonst)` / AT_ENGL `flush_screen(1)`+`pline_mon` / `bot()` /
sleep `rn2(10)`; `m_monnam`; `simple_typename`/`mimic_obj_name`; named:
`hitmu`, SEDUCE=0 `c_sa_no`, ceiling `in_rooms`, uhitm `prev_result`,
lock.js `simple_typename` clone; **`nomul`/`unmul` `usleep` is D-1797**;
**NATTK abort on `program_state.gameover` D-1816** — C `done` longjmp
never returns to `i+1`; JS `really_done` returns; wizard/explore
`savelife` does not set `gameover`);
**`getmattk` lich cold-resist touch→PHYS + damn=(damn+1)/2** (D-0928 #1121; 
seed4500 **106531→106536** RNG **106546** Scr **937**; needs poly `COLD_RES` FROMFORM; 
AD_DREN energy / cancelled AT_WEAP→PHYS / home-elemental damn*2 / DISE→STUN live D-1795); 
**`hitmu` mundetected hides_under/eel “was hidden under” pline** (D-0928 #1114; 
seed4500 **103155→104217** RNG **104364** Scr **928**; `something` Blind/`It`→`Something`; 
pool-water what deferred detail matches C); 
**`hitmu`→`passiveum`/`assess_dmg` + `mhitm_ad_ston` mhitu** (D-0928 #1105; 
seed4500 **101373→101391** RNG **101579** Scr **924**; 
`split_mon`/`golemeffects`/`mon_reflects`/`erode_armor`/`make_stoned` detail deferred); 
**`spitmm`/`spitmu` + `m_lined_up`; `mattacku` AT_SPIT when range2** (D-0900); 
**`breamm`/`breamu` + `mattacku` AT_BREA** (D-0925; 
seed4500 **86672→87218** RNG **87347** Scr **759**; 
mon-mon `mattackm` AT_SPIT/AT_BREA deferred — import cycle; 
Hallu breathwep / neg-type `monkilled` deferred); **`mhitm_ad_blnd` mhitu** (D-0926; 
seed4500 **87218→87803** RNG **88082** Scr **794**; 
Eyes `vision_clears` / full `can_blnd` ublindf·visor / uhitm·mhitm AD_BLND arms deferred); 
**`mattacku` AC_VALUE** live (`hack.h` neg→`-rnd(-AC)`); 
**`getmattk` mspec_used→AT_TUCH/CLAW** + **`mhitm_ad_cold` hero + `destroy_items`** (D-0837; 
SSEX named (SEDUCE=0 `c_sa_no`); D-1795 shipped DISE/DREN/WEAP/lich/home-elem; AD_FIRE hero deferred); 
**`unstuck`→`docrt` on swallow exit** (D-0838; Punished placebc deferred); 
**`initedog` `set_malign`** (D-0839; seed0383 RNG FULL); 
**`mpickstuff` `distant_name` + `hitmsg` consecutive `" again"`** (D-0840; Scr 146→148); 
**gulpmu `flush_topl_more`+Hallu `vision_off` together** (D-0852 #996 Scr196→201; 
alone falsified D-0841/#993/#994); **DECgfx swallow** (D-0842) + **HI_METAL mcolors** (D-0843); 
**`mattacku` uswallow only-`ustuck` early-out** (D-0827; Underwater non-swimmer live D-1795); 
**`mattacku` AT_ENGL + `gulpmu` first-swallow / AD_COLD·FIRE·ELEC·PHYS·DGST** (D-0825; 
snuff_lit / steed dismount deferred; **`postmov` engulfer `u_on_newpos` (D-0826)** — `swallowed(1)` 
on first engulf via D-0838); **`dochug` MMOVE_MOVED `engulfing_u`→`mattacku`** (D-0825); 
**`mattacku` AT_WEAP ranged `thrwmu` + melee HTH/`hitmu`/`hitmsg`/`mdamageu`** (D-0105/D-0106); 
**`hitmu` `!canspotmon`→`map_invisible`** (D-0579) + 
**`hitmu` always `stop_occupation`** (D-0928 #1097; Blind Count:N `.` wait); 
**`mattacku` mounted steed `rn2(is_orc?2:4)`→`mattackm` + retaliation** (D-0217); 
**`mattacku`→`summonmu`/`msummon` demon+were arms** (D-0473 demon; **D-1844** were `new_were`/`were_summon` `rn2(5-(night*2))`/`rn2(30)`/`rn2(10)` + `were.c` `were_summon` `rnd(5)` typ `rn2`; is_lminion/angel deferred); 
**`mdamageu`→`done_in_by` (not `losehp`)** (D-0190); 
**`get_mattk` ← extracted `mattk[]` + AT_WEAP=254** (D-0179) + 
**AD_SPEL/CLRC/RBRE/SAMU/CURS codes** (D-0641); 
**`mon_wield_item` NEED_PICK_AXE/AXE/PICK_OR_AXE + NEED_HTH/`select_hwep` + 
canseemon wield pline** (D-0180/D-0264/D-0318; mwelded refuse-wield/weld/artifact_light/tether deferred); 
**`possibly_unwield` / `setmnotwielded` / `mwepgone` D-1744** (`weapon.c` `:746–795` / `:1813–1828` / `:937–946`; `worn.c` `bypass_obj`; `wield.c` `mwelded`; newcham/new_were/`mattackm`/`use_whip`; named: steal_it / mhitm_ad_sitm, m_throw setmnotwielded, mon_break_armor, extract mwepgone inline, zap bypass_obj clone); 
**`select_rwep`/`monmulti`/`m_throw`/`thitu`/`should_mulch`**; 
**`canseemon`=`cansee`/`infrared`+`mon_visible`; `thitu` `an`/`exclam`/miss; 
`monshoot` `an(singular)`** (D-0119); **`find_defensive`/`use_defensive` healing+milky precheck**
(D-0610) **+ mreadmsg / reveal_trap / mon_escape / `mon_consume_unstone` + lizard / stairs / traps / tele+create scrolls**
(D-1809; named: unicorn horn, bugle, wand dig/tele/create/undead, `munstone`); **`find_offensive`/`use_offensive` MUSE_POT_* throw + 
`m_throw` POTION→`potionhit`/`bottlename`/`potionbreathe` + 
flight `observe_object`→`makeknown`/`exercise(A_WIS)`** (D-0184) **+ ray wands / fire·frost horns / WAN_TELE·UNDEAD `mbhitm` / SCR_EARTH drop_boulder** (D-1810; named: `linedup_callback` floor-corpse, `fhito_loc`/`bhito`, destroy_drawbridge, SCR_FIRE `#if 0`, sanctuary/AD_HEAL); 
**`m_throw` `tmp_at(DISP_FLASH)` + await `potionhit` plines** (D-0284); 
**`m_throw` `return_from_mtoss` snuff_candle D-1334** (C `:942` notcaught before 
ship/`flooreffects("drop")`; tethered AKLYS `return_flightpath`; 
candles/candelabrum only, not `snuff_lit`; `thrwmu` always_toss/polearm named); 
**await `thitu`/`monshoot` plines before `losehp`/flight** (D-0319); 
**`mbhitm` fatal striking → `finish_losehp_done` noreturn** (D-0323); 
**`find_offensive` C `nomore` continue** — later invent cannot override selected type (D-0258); 
**`MUSE_WAN_STRIKING` `mbhit`/`mbhitm` + Antimagic Boing/`makeknown` + 
`monstseesu`/`m_seenres` MAGR** (D-0234/D-0235; 
**`linedup`/`lined_up` boulderhandling + vision BOULDER does_block** (D-0242); 
**mbhit doorlock** WAN_OPENING/LOCKING/STRIKING + zap_oseen makeknown + 
shop D_BROKEN add_damage(0) D-1484 (hero bhit is D-1482); 
omit `fhito_loc`/drawbridge; `find_misc`/`find_defensive` nomore; 
`rnd_offensive_item` case0 hard_helmet FALLTHROUGH; **`do_wear.c` `hard_helmet` `:567–573` 
is one export D-1778** — `js/do_wear.js` with `is_helmet` (C `obj.h:283`) exported beside it; 
the six local copies in dothrow/mhitu/potion/trap/uhitm/zap are gone, and the dothrow/trap 
pair were C-wrong: no `is_helmet` gate and an inlined IRON..MITHRIL/GLASS range instead of 
`is_metallic`/`is_crackable`. `is_helmet` clones in `u_init.js`/`worn.js` still named); 
**`dochug` `find_defensive` gates + `find_misc`/`use_misc` WAN/POT_SPEED + 
gain-level/invis/bullwhip `rn2(5)`/`rn2(4)` yank + 
`mon_adjust_speed`/`mcalcmove` MFAST** (D-0232/D-0704; 
**`MUSE_POT_SPEED` `mquaffmsg` + async `mon_adjust_speed` give_msg/`learnwand`** D-0871; 
**poly trap/wand/potion + bag `mloot_container` / `muse_newcham_mon` / `you_aggravate`** D-1811
(C `use_misc` `:2382` / `find_misc` `:2094` / `muse_newcham_mon` `:2248` /
`mloot_container` `:2263` / `you_aggravate` `:2630`; JS default-0 plus
`!m.misc` early-out skipped POLY_TRAP; now those arms; named: cursed
mbag FIXME, CLIPPING `cliparound`)); 
**await `mzapwand`/`mbhit`/`mbhitm`/hurl plines + await `use_misc`** (D-0261; 
unawaited wand `--More--` raced input); **`dmgval` via extracted `oc_wsdam`/`oc_wldam` + 
small-monster otyp switch** (D-0189); **`dmgval` shade/`shade_glare` D-1354**; 
**`dmgval` large switch / thick-skin / iron ball / blessed·axe·silver·`artifact_light` `rnd()` / `spec_dbon` half / `greatest_erosion` D-1793** 
(`weapon.c` `:215–356`; `obj.h` `is_axe` one export in `objects.js`; `mondata.h` `is_wooden`/`hates_light`; 
named: `hitval` blessed/spear/trident/pick/silver still deferred, `spec_abon` is D-0611); 
**`skill_init` + `#enhance`/`add_skills_to_menu` PICK_NONE paged** (D-0122); 
**spelspec `unrestrict_weapon_skill` + `skill_based_spellbook_id`** (D-0132); 
**`weapon_hit_bonus` (b.h. unskilled +1; martial/twoweapon/riding)** (D-0187); 
**`dbon` + `weapon_dam_bonus` in `hmon_hitmon_dmg_recalc`** (D-0363; Basic martial +3; 
`use_skill` practice; PROJECTILE→launcher skillwep + may-advance msg deferred); 
**`hitmu`→`mhitm_adtyping` PHYS+ELEC+DRST/DRDX/DRCO + `mhitm_mgc_atk_negated`** (D-0198/D-0497) + 
**`poisoned`/`poisontell` attrib-loss `d(2,2)` + HP/fatal arms** (D-0869; 
name_to_mon G_UNIQ / Half_gas_damage / trap·throw callers deferred) + 
**AD_SITM/AD_SEDU→`mhitm_ad_sedu`→`steal`** (D-0686; brag `pline_mon` D-1240; 
**`worn_item_removal` on→from + nymph `She stole` D-0884**; 
**post-steal `rloc(RLOC_MSG)` vanish D-0885**; 
monkey cant_take / stealarm afternmv deferred; 
**`doseduce` / `mayberem` / `ld()` AD_SSEX D-1750** (`mhitu.c` `:1984–2305` / `:2308–2352` / `:25`; 
`uhitm.c` `mhitm_ad_ssex` mhitu arm; `sounds.c` MS_SEDUCE; extractor `SEDUCTION_ATTACKS_YES`; 
SYSOPT default on; **SetVoice D-1752**; **`hero_Deaf` D-1758** `youprop.h:125`
`HDeaf\|\|EDeaf\|\|uroleplay.deaf` — Cha `rn2`/`y_n` skip; hitmsg/You_hear/sedu/ston
use the same local); **`noit_mhim`/`noit_mhis` Hallu D-1776**
(`you.h:326–331` via the single `mondata.c` `pronoun_gender` port —
the shk clone that dropped Hallu is gone; `shk.c` `getcad` `:5137` and
partial-pay `:2657` wired); named:
uhitm hero-as-seducer, mhitm mon-mon AD_SSEX, 
SEDUCE=0 `c_sa_no` subst, steal.c monkey_business `unresponsive` site)); 
**`mswings`/`mswings_verb` + `hitval` on AT_WEAP melee** (D-0286); 
**`missmu` nearmiss `"just "` + unseen `map_invisible`** (D-0301; 
seduce/`stop_occupation` deferred) + **`hitmsg` consecutive `" again"`** (D-0840) + **`pline_mon` + 
AT_TENT/`s_suffix` + AT_EXPL/BOOM + thick_skinned kick punct D-1261**; **missmu pline_mon D-1286**; 
**wildmiss set_msg_xy then pline D-1291**; **mswings pline_mon D-1305**; 
**mattacku AT_TENT melee D-1309** (HTH with claw/kick/bite; 
`!MON_WEP\|\|mconf\|\|Conflict\|\|!touch_petrifies` + unsolid `failed_grab` + 
thick-skinned kick skip `hitmu`); **`mattacku` explmu D-1326** (`mcan` miss before `d()`; 
thin-air/`empty water` vs `hitmsg`; AD_COLD/FIRE/ELEC `mon_explodes`; 
AD_BLND visible skip-`rnd` + AD_HALU kaleidoscope/`mondead`; `ugolemeffects` + `wake_nearto(7*7)`); 
**mattacku AT_HUGS D-1327** (auto if prev two hit or ustuck; failed_grab pline; 
mhitm_ad_phys grab/u_slip_free/crush; rope-golem choke); 
**gazemu D-1328** (mattacku skip Medusa mndx; m_respond_medusa; 
AD_STON reflect/killed/STONING, CONF/STUN/BLND/FIRE, cancelled looks-X, Hallu rn2(4); 
BEHOLDER AD_SLEE/AD_SLOW compiled out); **arti_reflects W_WEP D-1342**; 
AT_ENGL gulps/lunges / **mhitu AD_DRIN D-1329**; 
**mhitu AD_WRAP D-1331** (u_slip_free / coil-or-swing / pool drown / AT_HUGS crush / verbose brush; 
uhitm wrap D-1348 / mhitm brush D-1406); **mhitm AD_DRIN D-1330** (mattackm AT_TENT + 
hitmm tentacles suck); `defended` / `resists_blnd_by_arti` named; 
**`ohitmon` + `omon_adj` mon missile hit/`rnd(20)`/`dmgval`** (D-0439); 
**`ohitmon` range==-1 drop_throw re-extract continue (D-0700)**; 
**`ohitmon` kill → `mondied`/`xkilled(NOMSG)` + `corpse_chance`** (D-0698) + 
**`ohitmon` `!mon_moving`→`setmangry`** (D-0928 #1099; **m_throw shade_miss D-1382**; 
**zap `bhit` shade_miss D-1383**; poison/silver/acid/egg petrify/can_blnd/vampshifter verb 
deferred); **MUSE_CAMERA** find+use `lightdamage` D-1376 (C `:1566–1574`/`:1938–1955` `!rn2(6)` + 
flash/`make_blinded`/`spe--`/return 1; callee D-1366); ray-wand/horn/SCR_EARTH D-1810; 
mon-target `potionhit` crash/saddle/POT_WATER D-1297 (other otyps named); 
`hitval` blessed/spear/trident/pick/silver (artifact `spec_abon` D-0611);
polearm/breath/gulp/AT_MAGC, catch `hold_another_object`, racial multishot, HTH `select_hwep`,
weld/artifact_light wield msgs, knockback hurtle; `mshot_xname` Nth; `obj_is_pname`/`the()`;
enhance `add_weapon_skill`/`lose_weapon_skill`/`use_skill` may-advance;
other `mhitm_ad_*` (AD_FIRE hero); potionbreathe/were destroy_items deferrals;
`mswingsm` mon-mon  **`wildmiss` Displaced/Invis/Underwater + `!foundyou` skipnonmagc** (D-0816; 
could_seduce SEDU smile live; **nolimbs lunge + set_msg_xy D-1291**; Some_Monnam impossible named)

### `src/dog.c`, `src/dogmove.c` (+ `steal.c` relobj)

JS: `js/dog.js`, `js/dogmove.js` — partial

Starting-pet subset; **`find_friends`/`score_targ`/`dog_move` pal/target `ptr.msound` numeric 
MS_LEADER/GUARDIAN** (D-1093; string `'MS_LEADER'` was dead after D-1053; 
`perceives` invis-tame pal, `score_targ` conf/`Is_qstart`/faith/AT_NONE/vampshifter, melee 
`haseyes`/`mon_reflects`/`touch_petrifies` still named); 
**`obj_resists` invocation/rider items skip `rn2(100)`** + 
**`dogfood` `is_quest_artifact` short-circuit** (D-0864; seed0399 **10309→10382**); 
**`abuse_dog` mtame-- / `rn2(mtame)` → yelp/growl** (D-0836; 
**`growl`/`yelp` `wake_nearto` mlevel×18/×12** D-0922; `abuse_dog` `m_unleash` TRUE live; body is D-1609; dokick kickdmg D-1349; 
zap/trap/hack callers deferred); **D-0823/D-0824:** `could_reach_item` pool/`is_swimmer` + 
lava/`likes_lava` + boulder/`throws_rocks` in **both** `dogmove.js` and `monmove.js` (seed0383 
**9709→10024→10281**); **D-0825…D-0827:** gulp + postmov u_on_newpos + mattacku uswallow gate; 
next @10374 C skips gnome dochug (EOT order matches); 
**D-0824:** `mfndpos` wires `may_passwall` for ALLOW_WALL; 
**D-0739:** dog_move melee return-attack gates `mlstmv`/`!onscary`/`monnear` (export `onscary`); 
**D-0743 fixed:** return `mattackm` AT_WEAP `mon_wield_item`→MISS (no `rnd(20)`); 
seed0360 **2995→3006**; **D-0735/36:** stethoscope adjacent TIME + mirror/camera getdir; 
seed5002 seg0 continuous **5739→5904** (C seg0 FULL +1 JS trailing learnwand `rn2(19)`); 
next trailing exercise / seg1. **seed0367 @1946 getobj_takeoff (D-0634); 
@1975 garlic_breath (D-0635); @2331 blue DSM Very_fast (D-0636); @2336 Pri-strt (D-0637); 
@3282 intemple+teleds (D-0638/39); @3310 #chat quest_chat (D-0640); @3332 castmu (D-0641); 
@3438 Pri-loca (D-0642–45); @15172 Pri-goal (D-0646; next @17449 minetn-2)**; 
**`makedog` role petnames + `christen_monst`** (D-0079); 
**`makedog` pony → `put_saddle_on_mon`** (D-0212); **`initedog` `u.uconduct.pets++`** (D-0125); 
**`keepdogs`/`losedogs`/`levl_follower`/`mon_arrive` With_you** (D-0149; 
**With_you `restore_cham` D-1637**; **keepdogs stay_behind + both leash
arms D-1783** — C `dog.c:786–884`: trapped follower gets a `mintrap`
escape attempt (**RNG**, and C's `!trap` arm clears `mtrapped` so it
usually follows), steed clears trap/meal and `mdrop_special_objs`,
then still-eating / still-trapped `pline_mon` and `mon_has_amulet`
"very disoriented" set stay_behind, which snaps a leash
("suddenly comes loose" + `m_unleash`, His/Her/Its by
`humanoid`+`female`) and `impossible`s a left-behind steed; a leashed
non-candidate instead gets "leash goes slack". **`keep_mon_accessible`
`:764–785`** → `migrate_to_level(..., ledger_no(u.uz), MIGR_EXACT_XY)`
for the Wizard and for an off-home shk/priest/guard; `on_level`
exported from `js/dungeon.js` for it (13 other clones still named).
`keepdogs` is async now — `js/do.js` `goto_level` and `js/end.js`
await it. **The walk is C's `for (mtmp = fmon; mtmp; mtmp = mtmp2)`
with `mtmp2 = mtmp->nmon` saved first (D-1789)** — C reads the next
pointer *before* the body because both departure arms unlink `mtmp`
from `fmon`: `relmon(mtmp, &gm.mydogs)` `:863` for a follower and
`migrate_to_level` `:906` (itself `relmon(..., &gm.migrating_mons)`)
for one kept accessible. So `js/dog.js` walks
`[...(game.fmon || [])]` and unlinks departers from the **live**
array in place — the follower arm splices `game.fmon` before
`game.mydogs.unshift`, the accessible arm splices inside
`migrate_to_level`, and an ordinary monster is left where it is.
There is no survivors-list rebuild: a `game.fmon = stay` tail would
delete whatever a mid-walk splice skipped past (one accessible
Wizard / off-home shk/priest/guard not last in `fmon` is enough)
and whatever a callee appended. Named: `relmon` `mon.c:2559–2594`
itself, hence no `mon_leaving_level` `:2694–2730`
(`unstuck` / `remove_monster` / `remove_worm` / `seemimic` /
`fill_pit` / `newsym` / `polearm.hitmon`) on the follower arm — JS
`unstuck` is async, so a real `relmon` would make
`migrate_to_level` async at every caller. Named: `mon_leave`
`:725–763` minvent `no_charge` /
`picked_container` / shk `set_residency` / worm-segment `wormno`);
**`update_mlstmv` `iter_mons` skip DEADMONSTER/`mon_offmap` (D-1709)**;
**`cant_go_back` FREEING vs WRITING|FREEING (D-1722; `do.c:1640–1664`
+ `delete_levelfile` / `remdun_mapseen` / `discard_migrations`; JSON
analogue)**; `free_luathemes` / full migrating `obfree` named; 
**`migrate_to_level` `In_W_tower` xyflags bit 2 (D-1198)**; 
**`mon_arrive` After_you `my=xyflags` before rloc (D-1199)**; 
**`mon_arrive` After_you `MIGR_LEFTOVERS` `deliver_obj_to_mon` DF_ALL (D-1505)**; 
**`mon_arrive` After_you wander/`somexy` after catchup (D-1538; C `:491–500`/`:506`/`:582–605`; 
`in_rooms` live; mkroom `somex`/`somey`/`inside_room`/`somexy` local clone — mklev→trap→dog; 
kops/EXACT_XY Before_you/failed_arrivals/Wiz_arrive/mnearto yank still named)**; 
**`levl_follower` `M2_STALK` + flee/amulet + `mydogs` prepend** (D-0474; 
`mon_has_amulet` iswiz / `is_fshk` deferred); 
**pickup/drop plines use `Monnam` MGIVENNAME** (D-0095); 
CORPSE age→POISON + `cursed_object_at` in `dog_goal` (D-0015); 
**`dogfood` CORPSE vegan→MANFOOD + lizard/lichen/fungus age skip + acidic/poisonous** (D-0197; 
`resists_*`/polyfood/cannibalism/rider/petrify deferred); `carnivorous`/`herbivorous` from mflags1; 
`dog_move` uncursedcnt/`cursemsg` pline (D-0017/D-0019); 
**`cursemsg` gates on `display.canseemon` LOS** (D-0416; 
hero_memory glyph/`distant_name` what-name deferred); 
**`resist_conflict`/`hero_conflict` after dog_goal + `mon_allowflags` ALLOW_U** (D-0406; 
**D-1617 `dog_move` Conflict `!edog` `lose_guardian_angel(mtmp)`** body D-1608; 
**DISMOUNT_THROWN steed throw D-1627**; setworn oc_oprop named); 
**`dog_move` newdogpos `ALLOW_U`→`mattacku`/`MMOVE_DONE`** (D-0414; 
**ALLOW_U `m_unleash` FALSE D-1609**; `pet_ranged_attk` youmonst→`mattacku` deferred); 
**`dog_eat` message gate C order — `sawpet` is `cansee`+`mon_visible`, second arm `canspotmon`** (D-1875; queue owner `glibr` was a `corpse`-substring misattribution, `glibr()` untouched);
**`tamedog` already-tame thrown food → `dogfood`/`dog_eat`** (D-0415; 
**blessed scroll/spell +2 clamp 10 D-1532**; new-tame food devour polish /
Tobjnam stop / big_corpse catch named); 
`m_cansee` in `find_targ` (D-0018); `dog_invent` `mpickobj`+drop RNG + tseen `rn2(40)` (D-0019); 
`splitobj` when `carryamt != quan` (D-0028); **pet `relobj`/`mdrop_obj`** (D-0029); 
**`mdrop_obj`/`dog_invent` use `distant_name`→observe when near** (D-0469); 
**`in_masters_sight = couldsee`** (D-0030); **`m_avoid_kicked_loc`** (D-0032); 
**`m_avoid_soko_push_loc`** (D-0524; Sokoban `dist2==4` + boulder between pet-cell and hero); 
**drop/pickup plines gated on `cansee`** (D-0038); **`mdrop_obj`→`stackobj`** (D-0094); 
**`mtrack` skip → C `goto nxti`** (D-0098); 
**edible `newdogpos`→`dog_eat` (re-`dogfood` + `delobj`)** (D-0168); 
**`finish_meating` stub** (D-0169); **`dog_nutrition` uses extracted `cwt`/`cnutrit`** (D-0193); 
**`dog_nutrition` FOOD `objects[].oc_delay` + nutrition map + msize× + non-food `owt/20`** (D-0364; 
`oeaten`/extractor `oc_nutrition` deferred); 
omit bee jelly/rust spit/unpaid shop, `dog_invent` eat-return path (DOGFOOD/CADAVER/starving 
ACCFOOD→`dog_eat`, D-0223), `flooreffects`, vault-guard gold, worn/shop extrinsics, 
**`m_in_out_region` before `newdogpos` place**; `see_monster_closeup`; 
seed1500 RNG complete (D-0021); **`dog_goal` gettrack/ogoal** (D-0099); 
**`dog_goal` wantdoor via off-hero `do_clear_area`/`view_from` vis_func** (D-0211); 
**`dog_goal` invent `dogfood` when `udist<=1` skips `!rn2(4)`** (D-0429/D-0735); 
**`dog_goal` udist after door-step `dog_move`** (D-0451 open); 
seed0017 RNG **full** after `#pray` (D-0101); seed0106 @2993 post-kill `dog_goal` next; 
seed0012 @6952 **`dog_goal` gg/wantdoor** (D-0367); 
**seed0004 Conflict after D-0405 timers/sortloot (D-0406); teleport scroll D-0407**; 
**D-0453 fixed:** @26987 was hero Y desync from stale `travelcc`; 
**`m_in_out_region`/`m_digweapon_check` before place still omitted**; 
**D-0485 fixed** (dofire More+getdir); **D-0490 fixed:** seed0007 @7142→7175 — missing `#loot` 
take-out gold; **`mfndpos` still lacks onscary/garlic/`mm_aggression` (D-0597 pool/lava; 
D-0612 squeeze) |

### `src/steed.c`

JS: `js/steed.js` — partial

**`can_saddle` + `put_saddle_on_mon`** (D-0212); 
**`use_saddle` apply SADDLE + `can_saddle` whirly/unsolid** (D-1008); 
**`can_ride`/`doride`/`mount_steed`/`landing_spot`/`dismount_steed` BYCHOICE** (D-0213); 
**riding display / pet mcolor / saddled / Ride botl** (D-0214); 
**`m_at` skips `usteed` (C remove_monster)** (D-0217); 
**`test_move_ok` diagonal intact-doorway ban** (D-0219); 
**dismount `in_steed_dismounting` + `float_down(0,W_SADDLE)`** (D-0220/D-0966); 
**`kick_steed` D-1362** (`:402–449`; dokick yn + apply whip; 
`monverbself` vtense/makeplural named); 
**`dismount_steed` DISMOUNT_THROWN/KNOCKED/FELL HP D-1627**
(`:603–618`; usteed-clear Flying/Lev; `"are thrown"` FALLTHROUGH
`losehp`/`set_wounded_legs`/`heal_legs(1)`; `dog_move` Conflict
steed + `wary_dog` callers);
**`landing_spot` KNOCKED preferred-dir + enexto forceit D-1640**
(`:459–572`; `xytodir(u.dx,u.dy)` then `rn2(2)` DIR_RIGHT/DIR_LEFT
trio, remaining dirs, early break `j<3`, `throws_rocks` boulder,
`enexto` when forceit; C NODIAG `(j%1)!=0` never skips);
omit `update_mon_extrinsics`,
Punished/ustuck float_down arms, water/lava grounded steed death,
encumber_msg /
polearm unweapon, BYCHOICE Hallu rain, map-grid remove_monster,
artifact saddle `untouchable`, uhitm DISMOUNT_KNOCKED `u.dx`/`u.dy`
caller; tutorial/disclosure done D-0215/16

### `src/uhitm.c`, `src/mhitm.c`, `src/explode.c`

JS: `js/uhitm.js`, `js/mhitm.js`, `js/explode.js` — partial

**`find_mac` minvent worn ARM_BONUS/guarding + AC_MAX (D-1042; re-export from `worn.js`)**; 
**`do_attack` `gu.unweapon` begin-bashing pline** (D-0892; 
twoweapon/untwoweapon before it deferred; egg-useup re-arm still thin); 
**`do_attack` `u_wipe_engr(3)` D-1373** (after `exercise(A_STR)`; callee D-1051; 
dothrow is D-1374 / dig is D-1375); **`do_attack` leprechaun evade D-1381** (`S_LEPRECHAUN` 
`!rn2(7)` `m_move(0)` then stumble/`return FALSE`; check_capacity / twoweapon still named); 
**`hmon` cream pie `The(xname)`/`An(singular)` splash** (D-0888; 
`mbodypart` FACE deferred — hardcoded face); 
**`could_seduce` + `hitmm`/`missmm` smile/pretend + 
`mhitu` `hitmsg`/`missmu`/`wildmiss` seduce arms** (D-0887; **hitmm shade_miss D-1341**; 
**dmgval shade/`shade_glare` D-1354**; **hitmm silver sear D-1351**; 
**mdamagem AD_STON leftover D-1352**; **mdamagem AD_CONF leftover D-1385**; 
**mdamagem AD_STUN leftover D-1396**; **mdamagem AD_FIRE leftover D-1405**; 
**mdamagem AD_SLEE leftover D-1857** (`uhitm.c:3479–3522` uhitm/mhitm keep dice; mhitu `mhitm_ad_slee_u` hitmsg + `rn2(5)`; damageum AD_SLEE live); 
**mhitm AD_WRAP brush D-1406**; artifact wep; **mthrowu m_throw shade_miss D-1382**; 
**zap `bhit` shade_miss D-1383**; **hmon shade_miss D-1384**; **mhitm_ad_phys shade_miss D-1394**; 
**mhitm_ad_phys mwep dmgval D-1402** (mhitm arm `:4142–4157` corpse `do_stone_mon` then `dmgval` + 
GOP `rn1(4,3)` + min 1); **mhitm_ad_phys AT_KICK thick_skinned D-1403** (mhitm arm `:4138–4141` 
zeros leftover after shade; youmonst already `damageum_ad_phys`); 
**mhitm_ad_phys artifact_hit D-1415** (mhitm arm `:4158–4180` after dmgval; 
hitmm skips default hits); **mhitm_ad_phys rustm D-1442** (mhitm arm `:4182–4183` after 
artifact_hit iff leftover; callee `mhitm.c` rustm `:1260–1280`); 
**mhitm_ad_phys poison leftover D-1447** (mhitm arm `:4184–4189` after rustm `!rn2(4)` 
`opoisoned\|\|permapoisoned`; callee `mhitm_really_poison` `:3104–3118`; 
`mhitm_ad_drst` 1/8 / worm-shrieker still named);
**mhitm_ad_phys mhitu weapon arm D-1864** (mhitu arm `:4041–4126` corpse
`do_stone_u`/done + `dmgval` + GOP `rn1(4,3)` + `artifact_hit`-or-`hitmsg` +
silver sear + `rnd(-uac)` soak + Half + pudding `cloneu` split + `rustm` +
dieroll `poisoned()`; non-weapon keeps `magr != u.ustuck`);
**mhitm_ad_phys_u dmgval defender D-1865** (`dmgval(otmp, null)` →
`dmgval(otmp, game.youmonst)` per `weapon.c:215` + mhitu `:4061–4066`
`mdef == &youmonst`; big-hero `wldam` vs small `wsdam`); 
**mattackm AT_HUGS D-1340**); **`hmon_hitmon_pet` → `abuse_dog` + 
survive `monflee(10*rnd(dmg))`** (D-0836); 
**`xkilled` `(peaceful&&!rn2(2))\|\|mtame` `change_luck(-1)` + 
tame `adjalign(-15)` before experience** (D-0836; human-murder/unicorn/quest arms deferred); 
**`xkilled` msg: `!canspotmon`→`it` / tame→`x_monnam(...,"poor",...)`** (D-0850); 
**`mondead`/`m_detach` keeps dead on `fmon` until `dmonsfree`** (D-0828; was immediate splice); 
**`attack_checks` `engulfing_u` early-out** (D-0833; allow melee on engulfer before Wait!); 
**`attack_checks` clears `STRAT_WAITMASK` first** (D-0791; kick/cancel still disturb; 
peaceful yn deferred); **`is_safemon` requires `canspotmon`** (D-0791); 
**`mundisplaceable` + `domove` refuse leader/Oracle/priest/shk/gd swap** (D-0792; 
`goodpos`/trap-on-dest deferred); **`mattackm` AT_WEAP `mon_wield_item`→`M_ATTK_MISS`** (D-0743; 
thrwmm/`possibly_unwield`/`mswingsm` deferred); **`mattackm` sets `magr.mlstmv = moves`** (D-0739; 
out-of-sequence attack counts as move); **`max_passive_dmg` AD_ACID/FIRE/COLD/ELEC + 
AD_PHYS** (D-0730; `completelyburns`/`rots`/`rusts` deferred); 
**`fightm` Conflict mon-vs-mon + always `resist_conflict`** (D-0413; 
ustuck/itsstuck release deferred); **`known_hitum` flee → `monflee(!rn2(3)?rnd(100):0)`** 
(D-0404/D-0635; ustuck/`sticks` release deferred); 
**`do_attack` safemon in-the-way leaves `context.move` (turn spends) + 
tame `monflee(rnd(6))` incl. `mon_track_clear`** (D-0442/D-0459/D-0860; 
inshop/isshk dopay/frozen-helpless/longworm/`passes_walls`/Vrock deferred); 
**`do_attack` hostile → `attack_checks` Wait! `!canspotmon` (D-0705) + 
`overexertion`/`hitum`/`known_hitum`/`hmon`/`xkilled`** (D-0107; 
peaceful yn/warning glyph/hides_under deferred); 
**`hmon_hitmon_msg_hit` skip melee hit when destroyed** (D-0119); 
**`mondead`→`relobj_on_death` minvent + death-drop `distant_name` disco** (D-0108/D-0632); 
**`mvitals.died++`** (D-0126); **`xkilled` → `experience`/`more_experienced`/`newexplevel`** 
(D-0130); pet safemon displace; **`mdisplacem` + region after both places (D-1174; 
`should_displace` / dogmove caller / dbridge named)**; **`mondead`/`newsym` on kill** (D-0037); 
**`mondead` `glyph_is_invisible`→`unmap_object`** (D-0479); 
**mhitm `mondied`→`make_corpse` ordinary default_1** (D-0167); 
**`monkilled`/`mondied` split + `nonliving` verb** (D-0698; worm_known/disintegested deferred); 
**unarmed `hmon_hitmon_stagger` `rnd(100)` gate** (D-0170); 
**`weapon_hit_bonus` in `find_roll_to_hit` + martial barehands `rnd(4)`** (D-0187); 
**`hmon_hitmon_dmg_recalc` `dbon`/`weapon_dam_bonus`/`use_skill`** (D-0363; 
gloves/silver `special_dmgval` + PROJECTILE launcher skillwep deferred); 
**`hmon` weapon `artifact_hit`/`spec_dbon` after dmgval** (D-0613; Grayswandir double; 
elemental destroy_items/Mb_hit/behead/DRLI deferred); 
**`hitval` spe + `oc_hitbon` + oartifact `spec_abon`** (D-0265/D-0611; 
blessed/spear/trident/pick/silver vs-mon deferred); 
**`find_roll_to_hit` Luck `sgn*((abs+2)/3)`** (D-0272; encumbrance/`utrap`/monk/orc-elf deferred); 
**`find_roll_to_hit`→`check_caitiff` knight/samurai** (D-0928 #1100; apply.c callers deferred); 
**`hitum`→`passive`/`passive_obj` live `rn2(3)`** (D-0188); 
**`hitum` twoweapon/`double_punch` second swing + `mon_maybe_unparalyze`** (D-0345; 
Cleaver `hitum_cleave` deferred; hmon `gt.twohits` strbonus scaling live); 
**`xkilled`→`make_corpse` when `corpse_chance`** (D-0191); 
**`corpse_chance` AT_BOOM → `mon_explodes`/`explode` PHYS** (D-0273) + 
**`explode` AD_FIRE mon/hero combat + `explosionmask` Fire_resistance/`resists_fire` + 
`mon_explodes` AD_FIRE** (D-0968) + **`explode` AD_COLD/ELEC mon/hero + Cold/Shock mask + 
`mon_explodes` COLD/ELEC** (D-0971) + **`explode` AD_MAGM/DISN/DRST/ACID mon/hero + 
Antimagic/Disint/Poison/Acid masks + `mon_explodes` MAGM..SPC2** (D-0973) + 
**`explode` 3x3 `map_invisible` `!canspotmon` + You_hear vs Boom! +
`engulfer_explosion_msg` D-1760** (`explode.c` `:378–452` / `:117–179`;
`seemimic` before caught-in; generic unseen `"explosion"` killer skip;
live `js/explode.js` + `se_blast`; named: hallu `rndmonnam`, You_hear
Underwater/Unaware, TRAP_EXPLODE killer `uhim`, grabbing double-damage,
golemeffects/Invulnerable/`resists_magm` worn scan; explosion_to_glyph
is D-1738); 
**`xkilled` treasure `mkobj(RANDOM_CLASS)` + food/size filters** (D-0229); 
**`xkilled` final `newsym` after treasure/corpse** (D-0304); 
**`mhitm_mgc_atk_negated` + hero armor `a_can`** (D-0198); 
**`attack_checks`→`stumble_onto_mimic`/`that_is_a_mimic` next_ident** (D-0207); 
**`that_is_a_mimic` live `object_from_map` / defsyms / `MIM_OMIT_WAIT` D-1544** 
(`uhitm.c:6201–6276`; gold `quan=2`; furniture PCHAR desc; masked `M_AP_TYPE`; 
export `otense`; getpos fakeobj is D-1547; `namefloorobj` / `mhidden_description` / 
trapped-chest cmap on `M_AP_OBJECT` / Eyes `is_plural` named); **`mondied` undead `"destroyed"` + shared `Monnam` saddle** (D-0214); 
**`hmon` weapon `maybe_knockback`→`mhitm_knockback` `rn2(3)`+`rn2(6)`** (D-0227); 
**`mattackm` `gv.vis` + `hitmm`/`missmm`/`mondied` cansee gates** (D-0241); 
**`noises`/`You_hear` out-of-sight m-vs-m** (D-0294; `far_noise`/`noisetime`); 
**`pre_mm_attack` `map_invisible` when `!canspotmon`** (D-0296); 
**hit/miss plines use shared `mon_nam` (shk)** (D-0308); 
**`hmon_hitmon_msg_hit` `canseemon?exclam(dmg)` + bash/lash/smite/hit verb** (D-0322); 
**`xkilled` `nonliving` → `"destroy"`** (D-0327; 
`is_golem`/`weirdnonliving`/`nonliving` in `monsters.js`); 
omit `seemimic`/`mundetected` unhide+showit; 
omit stun pline/`mhurtle_to_doom`, `special_dmgval` gloves/silver, `attack_checks` 
Blind/hallu/invis-marker/peaceful yn, Cleaver `hitum_cleave`, knockback 
hurtle/steadfast/size/weapon gates + ART_OGRESMASHER, full AD_PLYS/`erode_obj`/`done_in_by` 
stone/`dokick` passive callers; **D-1095** `passive` AD_COLD `healmon`+`split_mon`; 
mhitu/mhitm AD_COLD still named; thrown multishot hit-when-destroyed; `hit()` thrown path; 
vault-guard gold / flooreffects on death-drop; flooreffects non-floor treasure arms; 
uhitm/mhitm `mhitm_ad_elec` branches; Protection/amulet MC; 
`monkilled` still `is_undead`-only (not full `nonliving`); 
**remaining already-ported `pline_mon` D-1240** (`light_hits_gremlin` cry/recoil + 
`mhitm_ad_legs` nuzzle + `mhitm_ad_sedu` brag; flash awaken/blind stay pline; 
**hmonas AT_HUGS D-1250**; **hmonas AT_EXPL `explum` D-1251** (dhit=-1 wakeup/You 
explode/rehumanize; AD_BLND/HALU + COLD/FIRE/ELEC `(adtyp-1)+20` you-caused `explode`; 
**hmonas AT_ENGL gulpum D-1264**; **fight_empty explum(null) D-1265**; 
**hmonas altwep / uswapwep D-1266**; **hmonas skipdrin / pit kick D-1298**; **eat_brains D-1306**; 
**helmet / m_slips_free D-1307**; **mhitu AD_DRIN D-1329**; **mhitu AD_DRLI D-1870** (`mhitm_ad_drli` `:2479–2488` mhitu arm: hitmsg + `!rn2(3)` + Drain_resistance + mgc_negated(TRUE) → losexp; uhitm/mhitm arms + `mhitm_ad_dren` still named); **mhitm AD_DRIN D-1330**; 
**mhitm gazemm D-1338**; **mhitm explmm D-1339** (AT_EXPL distmin>1 skip; mcan miss; 
cansee explodes else noises; FIRE/COLD/ELEC `mon_explodes`; else mdamagem then mondead; 
tame melancholy; leashed slack; mdamagem AD_HALU mhitm arm; 
**mhitm AT_HUGS D-1340** (auto if prev two `M_ATTK_HIT`; failed_grab; 
hitmm squeezes unless `u.ustuck`); **mdamagem AD_STON leftover D-1352**; 
**mdamagem AD_CONF leftover D-1385**; artifact_hit D-1415; rustm D-1442; poison leftover D-1447; 
worm-shrieker still named); **mhitu AD_WRAP D-1331**; **uhitm AD_WRAP m_slips_free D-1348**; 
**mhitm AD_WRAP brush D-1406**); unported `mhitm_ad_*` still named; **mhitu `hitmsg` D-1261**; 
**mhitu missmu D-1286**; **mhitu wildmiss set_msg_xy D-1291**); 
**`passivemm` assess_dmg `monkilled(magr)` D-1241** (raw AT_NONE dice; AD_ACID goto; 
live `rn2(3)` COLD/FIRE/ELEC/PLYS/STUN; no zombify; 
gulpmm snuff_lit D-1242 / **gulpmm !goodpos return-home D-1243**; 
AD_DGST eat / drain_item ABON / golem MSLOW named; **arti_reflects D-1342**); 
**`special_obj_hits_leader` predicate D-1044; catch/`finish_quest` D-1312**; 
chat_with_leader got_thanks/questart still named

### `src/teleport.c`

JS: `js/teleport.js` — partial

**D-0928:** #1092 place≡(43,6); #1093 fight_empty I; #1094 dobuzz mon-kill `monkilled`; 
**#1095** @89775 = JS early `#pray`@89766 (`uinvulnerable` skips `gethungry` rn2(20)) while C 
Count:20 — next cmd desync post-^V/feel/Count; 
do not FORCE mux/last=77 or clear invuln. **#1128** `rloc_to_flag` + Blind `arrives` + 
`RLOC_NOMSG=0x04` (was mis-valued). Placement helpers + **`enexto_gpflags`** (D-0034); 
**`rloc_to` newsym(old)+newsym(new)** (D-0149/D-0846) + 
**worm `remove_worm`/`place_worm_tail_randomly` + 
ustuck-swallow `u_on_newpos`/`check_special_room`/`docrt` + grab `!m_next2u` `unstuck` (D-1123; 
`js/worm.js` `remove_worm`)** + **`rloc_to` `maybe_unhide_at` dest before newsym (D-1152; 
`monmove.js` export; hero youmonst path still named)** + 
**`rloc_to` `set_apparxy` after dest newsym (D-1160; 
C `place_monster` mx/my only — do not restore mux=hero stand-in)** + 
**`rloc_to` `update_monster_region` after place before worm tail (D-1161; 
C `region.c` absolute membership from mx/my; 
no enter/leave callbacks — those are `m_in_out_region`; 
dbridge `update_monster_region` still named (mhitm mdisplacem D-1174))** + 
**`rloc_to` resident shk `make_angry_shk` after dest (D-1162; snapshot `inhishop` before pickup; 
`rloc_to_flag` appear then angry; C `teleport.c:1739` / `shk.c` 1470)** + 
**`rloc_to` minvent shop bill after angry (D-1163; 
dest `!costly_spot` → clear `no_charge` else `stolen_value` for `onshopbill`; 
shop-to-shop keeps no_charge+first bill; C `teleport.c:1748–1758`)** + 
**`rloc_to` occupation `dochugw` after bill (D-1170; 
C `teleport.c:1761–1763` / `monmove.c` dochugw; 
`go.occupation` → `dochugw(mtmp, FALSE)` — no dochug, only newly-spotted threat stop; 
`rloc_to_flag` after appear; onscary / makemon occupation still named)** + 
**`rloc_to` trapped `mintrap` after occupation (D-1164; C `teleport.c:1766–1767`; 
`mtrapped && !wormno`; dest no trap clears mtrapped; 
dest trap is already-trapped escape not a fresh step-on; `rloc_to_flag` after appear)**; 
**`rloc_to_core` telemsg "vanishes and reappears" (D-1180; next/close-by/closer/farther; 
same-cell return before msg)**; **`rloc` `RLOC_ERR` `impossible()` (D-1181; 
C `teleport.c:1884–1888` / `pline.c` urgent then disorder/report; 
paniclog/recursive panic/debug_fuzzer/CRASHREPORT named)**; 
**`rloc_pos_ok` mx==0 updest/dndest (D-1182; C `teleport.c:1592–1615`; `my` bit0 up / bit1 W-tower; 
`dndest.nlx`+On_W_tower XOR exclude; else updest.lx / dndest.lx minus nlx)**; 
**`migrate_to_level` `In_W_tower` xyflags bit 2 (D-1198; C `dog.c:913–915`; 
pre-relmon mx,my vs `u.uz`)**; **`mon_arrive` After_you `my=xyflags` before rloc (D-1199)**; 
**ustuck-together You() (D-1183; C 1710–1711 `mtmp==ustuck && !u_at(ux0,uy0)` first post-msg arm, 
else-if telemsg)**; **scrolltele make_blinded D-1184**; **scrolltele W-tower Override yn D-1197**; 
**scrolltele steed whobuf D-1206**; **`rloc_to_core` wand `makeknown(WAN_TELEPORTATION)` after 
delivered dest msg (D-1195; C 1727–1731; Null/other otyp skip)**; 
**`rloc_to_core` dest-msg `set_msg_xy` (D-1196; C 1708; a11y.msg_loc dest before dest plines; 
`vpline` consume D-1207)**; **`goodpos` `accessible`/closed-door + 
occupied/`boulder`/amorph door** (D-0246); 
**`teleport_pet` / `mlevel_tele_trap` hole path / `migrate_to_level`** (D-0250); 
**`vault_tele`/`teleds`/`tele_trap` + mon `mtele_trap`/`mvault_tele`/`rloc` subset** (D-0373; 
once TELEP→VAULT somexyspace); **`rloc` 50× `rnd(COLNO-1)`/`rn2(ROWNO)` + 
`rloc_pos_ok`/`tele_jump_ok` + unshuffled candy** (D-0686; 
**`RLOC_MSG` vanish when spotted+!couldsee dest D-0885**; 
**post-place appear/arrives + next-to/close-by D-0886**; 
**Wizard stair `goodpos` + `control_mon_tele` (D-1122; `In_W_tower` / `stairway_find_forwiz`)**; 
**`rloc_pos_ok` isshk/ispriest dest room lock (D-1171; C `teleport.c:1620–1626`; 
dest `levl.roomno` vs ESHK.shoproom / EPRI.shroom unsigned char after inhishop/inhistemple; 
not in_rooms; rloc candy may still goodpos-fallback)**; 
**D-1172** `rloc` steed `tele()`+TRUE (C 1808–1811; not Wizard stair); 
**mnexto `control_mon_tele(..., FALSE)` + savemm (D-1173)**; 
**telemsg "vanishes and reappears" D-1180**; **`rloc` `RLOC_ERR` `impossible()` D-1181**; 
**`rloc_pos_ok` mx==0 D-1182**; ustuck-together D-1183); 
**`teleds` must not pre-set `u.urooms` before `spoteffects`** (D-0639; 
D-0374 premature sync was harmful for TEMPLE entry); 
**`teleds` TELEDS_TELEPORT+verbose materialize pline + `spoteffects(TRUE)`** (D-0393) + 
**`see_monsters` before vision** (D-0667); 
**`scrolltele`/`safe_teleds`/`tele` + learnscroll credit** (D-0407); 
**wizard/`Teleport_control` controlled `getpos` + `^T` `dotelecmd`/`dotele`** (D-0590; 
**`dotele` clears `travelcc` before `tele` + scrolltele clears on land-at-travelcc** D-0789; 
**scrolltele `make_blinded(0,FALSE)` when `!Blinded` (D-1184)**; 
**scrolltele W-tower/amulet `y_n("Override?")` (D-1197)**; 
**scrolltele `unconscious()` fail then `safe_teleds` (D-1205)**; 
**scrolltele steed `whobuf` `mon_nam` (D-1206)**; 
**dotele trap-at-feet TELEP_TRAP teledest teleds (D-1208; no displace/settrack; 
trap_once → vault_tele D-1153)**; **dotelecmd m-prefix PICK_ONE n/s/t/w + tport_spell (D-1209)**; 
**dotele LEVEL_TELEP yn + `level_tele_trap(FORCETRAP)` (D-1224; 
trap.c `trapeffect_level_telep` hero `seetrap`+call)**; energy/spellcast D-1225; 
**`#teleport` doextcmd → dotelecmd (D-1230; no AUTOCOMPLETE; 
rhack `#` CMD_M_PREFIX + resolved accept_menu_prefix)**; 
**rolling-boulder TELEP `pline_xy` D-1237** (trap.c `launch_obj` ROLL TELEP/LEVEL_TELEP + 
teleport.c `rloco`/`random_teleport_level`; landmine/pit D-1256); 
**`level_tele` wizard/Teleport_control getlin numeric + `get_level` + `schedule_goto` + 
moveloop `deferred_goto` + `^V` bind** (D-0515) + 
**`print_dungeon(TRUE)` `?`/menu_requested force_dest** (D-0518) + 
**endgame dest `AMULET_OF_YENDOR` `mksobj`+`addinv`+`prinv`** (D-0549; 
seed0373 30061→30065) + **In_endgame negative dest `dlevel=llimit+newlev`** (D-0560; 
seed0373 `^V-2` Fire→Air) + **confused/`*`/involuntary `random_teleport_level`** (D-0575; 
seed5006 8473→10953) + **past-main-dungeon `find_hell`→valley** (D-0904; seed4500 ^V30) +
**heaven `u_left_shop(ushops0,TRUE)` + Cloud 9 / fly-or-plummet / `done(DIED)` /
escape dlevel 0 + `goto_level` `ledger_no<=0` `done(ESCAPED)`** (D-1764;
`teleport.c` `:1321–1385` / `do.c` `:1517–1519`; buried ball before `next_to_u`;
live `js/teleport.js` + `js/do.js`; `lev_by_name` is **D-1780**;
**Nowhere `ynq` + Quest/mines/sanctum deepest clamp + invoked
`"Sorry..."` + `"anywhere"`/`"here"` You_cant D-1846** (`teleport.c`
`:1254–1276` / `:1388–1422`; dest-level `bigrm-2` darkness + Rogue
`S_ndoor`/`dosdoor` D_NODOOR + `priestname` in the same cluster);
named: bymenu=FALSE `print_dungeon`; debug_fuzzer); 
**`lev_by_name` D-1780** (C `dungeon.c:2096–2170`; caller
`teleport.c` `:1248` `else if ((newlev = lev_by_name(buf)) == 0)
newlev = atoi(buf)`; custom `#annotate` label wins first via
`find_mapseen_by_str` `:2651`, else strip leading "The " / trailing
" level" then the two aliases — gehennom·hell → `valley` (or
" to Vlad's tower" `In_V_tower`) because the bare branch name would
land on the castle, and delphi → oracle — then `find_level`, else
branch names incl. "<branch> to Xyzzy" via `find_branch`'s
`pd == NULL` arm `:322–334` (`(ledger_no(end1) << 8) | ledger_no(end2)`,
matching `dungeons[end2.dnum].dname` case-insensitively with a
leading "The " ignored). Gates: `dlev_in_current_branch` `:2087–2092`
(valley/medusa count as one branch) **and** wizard-or-VISITED — both
ledger ends for a branch. Live `js/dungeon.js` `lev_by_name` export +
file-local `find_mapseen_by_str`/`dlev_in_current_branch`/
`wizard_mode`/`ledger_visited` (C `staticfn`), `js/teleport.js`
imports it); 
**`goto_level` delivers `dfr_post_msg` via pline before `onquest`** (C `maybe_lvltport_feedback`); 
**Pri firsttime flushes materialize `--More--`** (D-0662); 
**D-0615/D-0616:** Home→Dlvl:37 was qt_pager NHW_TEXT stealing keys (fixed); 
`lev_by_name` is **D-1780**; D-1846 Nowhere ynq + Quest/mines/sanctum
clamp + invoked gate; omit bymenu=FALSE `print_dungeon`; debug_fuzzer;
water/earth/astral `load_special`; `SURFACE_AT` drawbridge; 
**`goodpos_onscary` altar S_VAMPIRE / SCR_SCARE_MONSTER / strict Elbereth (D-1102; 
local `sengr_at` HEADSTONE/time; Inhell/endgame Elbereth off; vampshifter altar is onscary-only)**; 
**`goodpos` pool/lava `is_swimmer`/`m_in_air`/`likes_lava` + eel `rn2(13)` (D-0653)** + 
**`goodpos` `is_pool()`/`is_lava()` not `IS_POOL`/`IS_LAVA` (D-1091)** + 
**`u_at` allowed for youmonst/ustuck-swallow/usteed** (D-0928 #1102; 
seed4500 **100421→100475** wizard ^T self); 
**youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool·lava (D-1099)**; 
**`goodpos` `passes_walls(mdat)` + `may_passwall` early-out (D-1100; 
form flag, not youprop Passes_walls)**; **`goodpos` `GP_AVOID_MONPOS` 
`is_exclusion_zone(LR_MONGEN)` after boulder (D-1101; wallwalk/pool/lava skip; 
clone of `mkmaze.c`)**; **`goodpos` live-mon `onscary` when `m_id != 0` (D-1110; 
local `monmove.c` clone — vampshifter altar, hero/image/guardobjects Elbereth, 
`is_lminion`/`inhishop`/`inhistemple`; mfndpos still uses `mon.js` partial)**; 
**`teleok` VIBRATING_SQUARE + pit/hole iff Levitation||Flying (D-1111)** + 
**`teleok` `tele_jump_ok`/`in_out_region` (D-1119; **enter_msg/leave_msg `pline1` D-1143**; 
force-field callbacks still named; hack.c walk D-1157; dothrow `hurtle_step` D-1165; 
do.c `goto_level` D-1166; mhurtle_step D-1176)**; 
**`mlevel_tele_trap` MAGIC_PORTAL/LEVEL_TELEP/NO_TRAP (D-1112; 
endgame amulet/`is_home_elemental`/`rn2(7)` stay; LEVEL_TELEP `random_teleport_level`+`get_level`; 
NO_TRAP `onscary(0,0)` stay else same-level migrate; `is_xport`&&!`control_teleport` mconf; 
valley_level / botlevel hole avoid pline still named; hero `level_tele_trap` D-1224)**; 
**`domagicportal` (D-1188; C `teleport.c:1444–1488` / `trap.c` `trapeffect_magic_portal`; 
activate pline; tutorial leave ATSTAIRS+`Resuming regular play.`; 
else PORTAL+stunmsg+`make_stunned((HStun&TIMEOUT)+3,FALSE)`; `mktrap` dst←`ucamefrom`; 
`goto_level` reset uz0; `UTOTYPE_RMPORTAL` / hero `level_tele_trap` still named)**; 
**`tele_trap` In_endgame/Antimagic/noteleport wrenching + shieldeff (D-1120; youprop uprops confer; 
once deltrap after next_to_u; `in_tele_trap` guard)** + 
**`tele_trap` teledest `settrack`+displace `enexto`/`rloc_to` then `teleds` else `tele()` (D-1133; 
`next_to_u` sibling of once)**; **`vault_tele` `tele()` fallback when no vault/space (D-1153)**; 
**dotele trap-at-feet teledest D-1208**; **#1151 `teleds` Punished `unplacebc`/`placebc` (+ 
`drag_ball` when in-range)** + **`teleds` `fill_pit(u.ux0,u.uy0)` after `u_on_newpos` (D-1121; 
existing `trap.c` `fill_pit` thin extract+deltrap+delobj; 
C `flooreffects("settle")` still named)** + 
**`teleds` dest-typ≠origin `switch_terrain` after vision+materialize (D-1129; 
`hack.c` body: obstructed/closed-door/waterwall/lavawall `BLevitation`/`BFlying` FROMOUTSIDE, skip 
`float_down`, `float_up`/`float_vs_flight` on unblock; 
youprop H\|\|E\|\|steed-flyer && !B)** + **`teleds` `update_player_regions` after placebc (D-1130; 
C `region.c` absolute REG_HERO_INSIDE from dest; attach_2_u always clear; 
not in_out_region — enter/leave msgs are D-1143)** + **`teleds` `hideunder(&youmonst)` + 
S_MIMIC `m_ap_type=M_AP_NOTHING` (D-1131; 
C `mon.c` hideunder youmonst `u.uundetected`+newsym when flag changes; 
`is_pool`/`is_lava`/`couldsee`; not seemimic; 
can_hide_under_obj/cockatrice/cursed_object/You_see named)** + 
**`teleds` TT_BURIEDBALL `buried_ball_to_punishment` before ball_active (D-1132; 
C `dig.c` extract+`punish` reuse+`reset_utrap(FALSE)`; 
trapmove/unearth_objs/digactualhole named; `level_tele` buried ball is D-1764)** + **`teleds` `set_ustuck(Null)` + 
swallow `docrt` (D-1139; snapshot uswallow; Punished force ball_active/no-drag; 
not unstuck)** — **`classify_terrain` in `switch_terrain` D-1151**; 
**`dissolve_bars` `u_at` D-1259**; other callers 
(`spoteffects`/`set_uinwater`/`digactualhole`/`dothrow`/`goto_level`); 
**`teleds` vault_guard save/restore + `uleftvault` (D-1140; origin `vault_occupied`?`findgd`; 
dest `in_rooms(...,VAULT)` fake then restore before `spoteffects`; 
gold+`um_dist` irate/`mpeaceful=0`; `!in_fcorridor` `gd_move`; 
hostile `gd_move` rloc/`gd_letknow`/`wallify_vault` still named)** + 
**`teleds` `invocation_message` after `spoteffects` (D-1141; 
C `hack.c:3064–3085` / `invocation_pos` && !`On_stairs`; nomul; You_feel vibration; `uvibrated`; 
candelabrum spe==7&&lamplit throb/glow; walk `domove` D-1150; 
`mkmaze.c` `inv_pos` still named)** + **`teleds` `notice_mon_off`/`on` + 
`notice_all_mons(TRUE)` (D-1142; C `flag.h` block around vision; 
`hack.c` distu-sort You see/notice; default `spot_monsters` Off; goto_level wrap D-1194; 
newgame wrap D-1200; `vision.c` `vision_recalc` / `seffect_magic_mapping` / wizcmds / save / 
`postmov` / option wiring still named)**; 
`run_regions` hero `inside_f` `hero_inside` bit D-1169 (`region_danger`/`region_safety` still 
geometric); youmonst `m_postmove_effect` D-1167; **`tele_restrict` async canseemon pline** (D-0816)

### `src/vault.c`

JS: `js/vault.js` — partial

**`vault_occupied`/`findgd`/`newegd`/`invault`** (D-0374; 
timer + `makemon(PM_GUARD)` + getlin + fakecorr door); 
**`hidden_gold`/`contained_gold` + peaceful `gd_move` corridor step** (D-0375);
**`hidden_gold` export D-1731** (C `vault.c:1256–1268`; live `js/vault.js`;
doprgold FALSE; end/shk clones retired; dokick `hidden_gold_kick` /
botl/detect/insight/topten/u_init callers named); 
**`gd_move` dig while-loop wall→DOOR/ortho-redirect/STONE→CORR + `find_guard_dest` incr_radius + 
um_dist `rn2(10)`** (D-0377); **`clear_fcorr`/`restfakecorr` + 
`blackout`/`map_location`/`deltrap`/`del_engr_at`** (D-0378/D-0380 side); 
**async `gd_move` um_dist `"Move along!"` verbalize** (D-0396); 
**`parkguard`/`gd_move_cleanup` + `!u_in_vault` look-around → Suddenly pline + 
`flush_topl_more`** (D-0397); **`uleftvault` via `teleds` (D-1140; 
gold+`um_dist` irate/`mpeaceful=0`; dest VAULT fake then restore)**; 
omit hostile/witness/goldincorridor gd_move / migrating findgd / `wallify_vault` body / 
`vault_summon_gd` / Croesus angry wield / `fracture_rock` / `xy_set_wall_state` / Punished-uball / 
yelp-rloc-limbo / corridor-disappears pline / confused-disappears / Well begone verbalize / 
gd_mv_monaway / mpickgold / dig `del_engr_at`

### `src/shk.c` `shk_move` / `src/priest.c` `move_special` / `pri_move` / `intemple`

JS: `js/shk.js`, `js/priest.js` — partial

**`shk_move`/`move_special`/`inhishop`** (D-0205/D-0233); 
satdoor mill + `onlineu` early-return live; 
**D-0915:** seed4500 @52643 shk/`onlineu` was false hero-path — Punished ball stranded across 
`goto_level` (do not FORCE shk); **D-0376:** post-mill off-home return needs real hero `onlineu` 
(was desynced by bag put-in stub); **`pri_move`/`histemple_at` altar `rn1(3,-1)` mill + 
Conflict chase** (D-0604); **`intemple`/`findpriest`/`temple_occupied`/`has_shrine` + 
`goto_level`/`check_special_room` TEMPLE** (D-0638) + 
**`teleds` TEMPLE entry via move_update** (D-0639) + 
**`intemple` intone uses `canseemon` (not `canspotmon`)** (D-0671; ESP→"A nearby voice"); 
**`#chat` Arch Priest → `domonnoise` MS_LEADER `quest_chat`** (D-0640; 
MS_PRIEST `priest_talk` deferred); **`fix_shop_damage` catchup + `repair_damage`** (D-1178; 
`goto_level` `!new`; allmain/bones callers still named); omit `shk_fixes_damage`; 
holetime dig follow; following verbalize/`rile_shk`; `m_break_boulder`/`m_move_aggress`; 
`after_shk_move` bill_p; **D-0447:** `costly_spot`/`getprice`/`get_cost`/`billable`/`add_one_tobill`
/`addtobill`/`append_honorific` + `pick_obj` robshop; 
**D-0448:** `dopay`/`menu_pick_pay_items`/`dopayobj`/`pay`→`money2mon`/`splitobj` `next_ident` + 
cmd `p`; **D-0928 #1182:** `dopay` `canspotmon` seensk + Blind/`Blind_telepat` + 
`You_cant("see...")` (was live-map stub → false "not near enough"); 
**D-0462:** `money2mon` decrements `game._goldCount` (JS botl `$:` cache; C `money_cnt`); 
**D-0460:** `get_cost_of_shop_item`/`doname_with_price` + C-shaped `inside_shop` roomno; 
**D-0461:** `is_unpaid`/`unpaid_cost`/`count_unpaid` + doname unpaid + 
`paydoname` in pay menu/`dopayobj`; **D-1684:** `pay_billed_items`
via_menu always `menu_pick_pay_items` (deleted invented
`pay_take_canned_billed`; leftover IA_BUY_OBJ KEY is next `rhack`
`cmd.c:3642–3651`); **D-1688:** `cheapest_item` `:1521–1539` min
`ibill[].cost` + `pay_billed_items` `:2060–2080` cash+credit early
return (stashed_gold / `*paid_p` `" left"` / `more_than_one`);
**D-1702:** `buy_container` `:2307–2411` + `insufficient_funds` /
`reject_purchase` / `update_bill` + `make_itemized_bill` container
coalesce (`KnownContainer` / `UndisclosedContainer`) + `paydoname`
Has_contents rewrite; `unpaid_cost` COST_CONTENTS → `contained_cost`;
**D-1703:** `shk_names_obj` `:3412–3445` `observe_object` then
`makeknown` for `!oc_magic` && `saleable` WEAPON/ARMOR/SCROLL/SPBOOK
or MIRROR; `highc` unknown announce vs `You(fmt)`; `plur(amt)`;
**D-1704:** `dopay` `:1814–1856` multi-shk `getpos` pay-whom (ESC
`ECMD_CANCEL`; `cx<0` / self / `!cansee` / empty / `!isshk` / too-far);
**D-1705:** `bill_box_content` `:3386–3407` + `addtobill` `:3526–3534`
`contained_cost` then bill nested contents (`SchroedingersBox` skip;
coins skip; recurse `Has_contents`); `picked_container` coin skip;
`add_one_tobill` `record_price_quote`; list-price `the_contents_of` /
`and_its_contents`;
**D-1714:** `FullyUsedUp`/`PartlyUsedUp` `make_itemized_bill`
`:1543–1663` + `add_to_billobjs` `:3365–3383` dummy/residual
`OBJ_ONBILL` + `add_one_tobill` bill-full You / OBJ_FREE dealloc /
globby `newomid`/`OMID` + `sub_one_frombill` residual + menu
used-up/unpaid headings + `update_bill` ONBILL extract +
`obj_extract_self` ONBILL; **D-1715:** `pay_billed_items`
`:2082–2109` Traditional itemize `yn_function("Itemized billing?",
"ynq m", 'q')` + `menu_requested` toggle + `dopayobj` `:2259–2275`
y_n Pay? (`upstart(doname)`); **D-1716:** `dopay` `:2011–2025`
mute/Deaf thank-you nod (`hero_deaf`/`muteshk` else
`Shknam` nods; surcharge bang/period; `paid` `update_inventory`);
**D-1717:** `remote_burglary` `:664–682` + `rob_shop` `:685–719` +
`call_kops` `:509–564` + `makekops` `:5112–5135` + `addupbill`
`:495–507` + `setpaid` `clear_unpaid` walks; `pick_obj` `:1936–1939`
awaits after addinv when unpaid from outside the shop; **D-1718:**
`get_cost` `:2897–2941` glass GEM_CLASS + GLASS `ubirthday` color
table (`otyp - FIRST_GLASS_GEM` → real-gem `oc_cost`; identified
skips); **D-1719:** `artifact.c` `arti_cost` `:2308–2317` +
`getprice` `:4324–4327` (`artilist.cost` else `100*oc_cost`;
`/4` when shk_buying; extractor A() cost; get_cost shop `*4`
unchanged); **D-1720:** `invent.c` `currency` `:1545–1554` Hallu
`ROLL_FROM(currencies[])` (`hack.h` `rn2(SIZE)`; `amount!=1L`
`makeplural`; live `js/invent.js` + `xprname` + wallet +
dokick/dig/lock/trap clones); **D-1733:** `u_left_shop` `:578–625`
leave-boundary verbalize then `rob_shop`/`call_kops`; `wizard.c`
`choose_stairs` `:330–364` + `stairs.c` `stairway_find_type_dir`
`:88–96` stair swarm (`builds_up` / ladder / branch / opposite);
live `js/shk.js` + `js/wizard.js` + `js/mklev.js`; **SetVoice D-1752**
(`u_entered_shop` / `u_left_shop` / `addtobill` `set_voice` / `dopay`);
named: remaining shk `pick_pick` / kops / pay-bill SetVoice;
STRAT_HEAL still rloc/healmon; `costly_gold`; heaven caller is D-1764;
**D-1740:** `shop_debt` `:989–999` + `shopper_financial_report`
`:1002–1035` two-pass `next_shkp(fmon, FALSE)` xor; `doprgold`
awaits after wallet (D-1731); live `js/shk.js`; named: dokick
`hidden_gold_kick`; `end.c` `get_valuables` is D-1741; `artifact_score` is D-1730; botl live
`money_cnt` vs cache; 
`mapseen_temple`/`Is_sanctum`/`forget_temple_entry`/`priest_talk`

### `src/mon.c` `mnexto`

JS: `js/mon.js` — partial

**`mnexto` → `rloc_to_flag` (async; RLOC_MSG/STRAT_APPEARMSG appear)** (D-0928 #1128; 
was silent `rloc_to`); **failed `enexto` → `deal_with_overcrowding` D-1148**; 
**clog-victim `mongone` `mdrop_special_objs` D-1149**; 
**`control_mon_tele(..., FALSE)` + savemm D-1173** (default Off; not rloc via_rloc TRUE); 
**`maybe_mnexto` accessible dest D-1336** (20× `enexto`+`couldsee`+`NODIAG` then `rloc_to`; 
no montelecontrol; dokick evade caller); OPTIONS=`montelecontrol` doset / `mnearto` overcrowding 
still named 

Production comments in several of these files still describe behavior as
"enough for seedXXXX" or "not needed for seedXXXX." Treat those as explicit
evidence of `partial`, and generalize them from C when touching the function.
