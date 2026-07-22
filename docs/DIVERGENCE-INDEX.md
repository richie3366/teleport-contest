# Divergence index

Lookup by ID, then open **one** matching `## D-NNNN` section in
`DIVERGENCE-LOG.md`. Do **not** read the full log by default.

| ID | Status | Area | Short result |
|---|---|---|---|
| D-1009 | fixed | apply `use_towel` + weapon wet/dry_a_towel + burnarmor towel dry | map-driven; green+cohort 15/16 (seed0009 pre-existing); cadence 43/44 @#1280 |
| D-1008 | fixed | apply/steed `use_saddle` + can_saddle whirly/unsolid | map-driven; green+cohort 15/16 (seed0009 pre-existing; ride PASS) |
| D-1007 | fixed | apply whistle: use_whistle/magic_whistle + can_blow/vault_summon_gd/tele_to_rnd_pet | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1006 | fixed | mon_poly monster-defender + newcham null-mdat/mbirth_limit | map-driven; green+cohort 15/16 (seed0009 pre-existing; wandpoly PASS) |
| D-1005 | fixed | apply leash: use_leash/next_to_u/check_leash + m_unleash wires | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-1004 | fixed | pray TROUBLE_LYCANTHROPE + peffect_water/vapor + mon_poly youmonst AD_POLY | map-driven; green+cohort 16/17 (seed0009 pre-existing); cadence 43/44 @#1275 |
| D-1003 | fixed | warnreveal + overexert_hp + Upolyd eel regen_hp | map-driven; green+allmain cohort 36/37 (seed0009 pre-existing) |
| D-1002 | fixed | allmain Teleportation/Polymorph/ulycn once-per-turn → tele/polyself/you_were | map-driven; green+allmain cohort 36/37 (seed0009 pre-existing) |
| D-1001 | fixed | ParanoidWerechange/Hit + `you_were`/`you_unwere` + mtimedone/wolfsbane | map-driven; green+combat/timeout cohort 11/12 (seed0009 pre-existing) |
| D-1000 | fixed | ParanoidPray Confirm + `see_nearby_monsters` allmain wire | map-driven; green+pray/allmain cohort 10/11 (seed0009 pre-existing) |
| D-0999 | fixed | ParanoidBreakwand getlin + `see_monster_closeup` camera/makedog | map-driven; green+startup/apply cohort 10/11 (seed0009 pre-existing) |
| D-0998 | fixed | `dopay` robbed/angry appease + debit/loan/credit | map-driven; green+shop cohort 11/12 (seed0009 pre-existing) |
| D-0997 | fixed | `animate_statue`/`activate_statue_trap` + Blind kick feel + break/search wire | map-driven; green+kick/search cohort 10/10 |
| D-0996 | fixed | `selftouch`/`mselftouch`/`minstapetrify` + `monstone`/`mon_to_stone`/`vamp_stone` + `xkilled` stoned | map-driven; green+cohort 15/16 (seed0009 pre-existing) |
| D-0995 | fixed | `instapetrify` + barefoot kick petrify + `bhit` DISP_FLASH | map-driven; green+kick/throw cohort 11/12 (seed0009 pre-existing); cadence 43/44 @#1265 |
| D-0994 | fixed | `sellobj`/`check_shop_obj`/`saleable`/`set_cost`/`contained_cost` + drop/throw wire | map-driven; green+shop/throw cohort 11/12 (seed0009 pre-existing) |
| D-0993 | fixed | globby `pudding_merge`/`obj_meld`/`obj_nexto_xy` + flooreffects/make_corpse | map-driven; green+drop/throw cohort 20/21 (seed0009 pre-existing) |
| D-0992 | fixed | `flooreffects` fire_damage/doaltarobj/hot-potion + dropx wire | map-driven; green+altar/throw cohort 20/21 (seed0009 pre-existing) |
| D-0991 | fixed | `costly_gold`/`donate_gold` + addtobill coin + kick out/refund | map-driven; green+shop/kick cohort 11/12 (seed0009 pre-existing) |
| D-0990 | fixed | `hits_bars`/`hit_bars` + bhit/throwit/launch_obj | map-driven; green+kick/throw cohort 7/8 (seed0009 pre-existing); cadence 43/44 @#1260 |
| D-0989 | fixed | Is_box kick + `container_impact_dmg`/`chest_trap`/`ghitm` + `make_angry_shk` | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0988 | fixed | `kick_object` + `bhit` KICKED_WEAPON flight/land | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0987 | fixed | `flooreffects` pool/lava/pit/shaft + boulder + drop/throw wire | map-driven; green+drop/throw cohort 20/21 (seed0009 pre-existing) |
| D-0986 | fixed | throne/`fall_through` + tree scatter + hero hole | map-driven; green+kick cohort 19/20 (seed0009 pre-existing) |
| D-0985 | fixed | `kick_nondoor` SDOOR/furniture + altar_wrath/disturb_grave/sink_backs_up | map-driven; green+kick cohort 19/20 (seed0009 pre-existing); cadence 43/44 @#1255 |
| D-0984 | fixed | `ship_object`/`otransit_msg` + dropx/throwit/drop_throw | map-driven; green+throw/drop cohort 20/21 (seed0009 pre-existing) |
| D-0983 | fixed | shop `stolen_value` + revive/kick/dig/lock/`costly_alteration` | map-driven; green+dig/zap cohort 19/20 (seed0009 pre-existing) |
| D-0982 | fixed | montraits/omonst/ghost recorporealize + KEEPTRAITS/`wary_dog` | map-driven; green+zap cohort 19/20 (seed0009 pre-existing) |
| D-0981 | fixed | `openholdingtrap`/`openfallingtrap` + Punished/`boxlock_invent` + SPE_KNOCK `mhurtle`/saddle | map-driven; green+zap cohort 20/21 (seed0009 pre-existing) |
| D-0980 | fixed | `timeout.js` restore `objects_at` import for `slip_or_trip` | fortress; D-0978 drop → seed0014 throw; cadence 43/44 @#1250 |
| D-0979 | fixed | `release_hold` WAN_OPENING + `flash_hits_mon`/`light_hits_gremlin` WAN_LIGHT | map-driven; green+zap/apply cohort 34/35 (seed0009 pre-existing) |
| D-0978 | fixed | `ignite_items`/`catch_lit`/`begin_burn`/`burn_away_slime` + LS_OBJECT/BURN_OBJECT | map-driven; green+zap/trap cohort 25/26 (seed0009 pre-existing) |
| D-0977 | fixed | music passtune + `open_drawbridge`/`close_drawbridge` + Mastermind hints | map-driven; green+apply cohort 36/37 (seed0009 pre-existing) |
| D-0976 | fixed | `dosinkfall` + `spoteffects` sink+Lev + `ELevitation` mirror + `stop_donning` | map-driven; green+move/wear cohort 36/37 (seed0009 pre-existing) |
| D-0975 | fixed | lavawall `fix_wall_spines` + `burn_floor_objects` give_feedback + fire-trap wire | map-driven; green+zap/trap cohort 24/24; cadence 43/44 @#1245 (seed0009 pre-existing) |
| D-0974 | fixed | music flute/harp/horn + BUGLE `awaken_soldiers` + FIRE/FROST `ubuzz`/`zapyourself` | map-driven; green+apply cohort 35/36 (seed0009 pre-existing Scr FAIL) |
| D-0973 | fixed | `explode` AD_MAGM/DISN/DRST/ACID mon/hero + masks + `mon_explodes` MAGM..SPC2 | map-driven debt; green+zap cohort 24/24 |
| D-0972 | fixed | music `do_earthquake`/`do_pit` + `DRUM_OF_EARTHQUAKE` | map-driven; green+apply cohort 36/36 (seed0009 pre-existing Scr FAIL on HEAD) |
| D-0971 | fixed | `explode` AD_COLD/ELEC mon/hero + Cold/Shock mask + `mon_explodes` COLD/ELEC | map-driven debt; green+zap cohort 20/20 |
| D-0970 | fixed | `toggle_stealth` + ELVEN on/off + `EStealth` mirror | map-driven debt; green+wear cohort 20/20; cadence 44/44 @#1240 |
| D-0969 | fixed | `angrygods` 4–8 + `gods_angry`/`rndcurse` + cursed_book wire | map-driven; green+pray/spell cohort 20/20 |
| D-0968 | fixed | `explode` AD_FIRE mon/hero + `explosionmask` + `mon_explodes` AD_FIRE | map-driven debt; green+zap cohort 20/20 |
| D-0967 | fixed | `bury_objs`/`unearth_objs`/`obj_ice_effects` + melt/freeze/liquid_flow | map-driven debt; green+dig/zap cohort 16/16 |
| D-0966 | fixed | `Ring_on`/`learnring`/`adjust_attrib`/`float_down` + steed wire | map-driven debt; green+wear/steed cohort 20/20 |
| D-0965 | fixed | ice melt / `burn_floor_objects` / fireball + TIMER_LEVEL `MELT_ICE_AWAY` | map-driven debt; green+zap cohort 16/16; cadence 44/44 @#1235 |
| D-0964 | fixed | `revive` container/buried + `cant_revive`/`zombie_can_dig` + OBJ_BURIED extract | map-driven debt; green+zap cohort 16/16 |
| D-0963 | fixed | `desecrate_altar`/`god_zaps_you`/`fry_by_god` + dig altar wire | map-driven debt; green+dig/pray cohort 16/16 |
| D-0962 | fixed | `conjoined_pits`/`xytodir` + autodig quiet + `dighole` boulder-fill | map-driven debt; green+dig cohort 16/16 |
| D-0961 | fixed | `impact_drop`/`down_gate`/`drop_to`/`add_to_migration` dig hole fall | map-driven debt; green+dig cohort 16/16 |
| D-0960 | fixed | `mkcavearea`/`mkcavepos`/`rm_waslit` earth dig | map-driven debt; green+dig cohort 16/16; cadence 44/44 @#1230 |
| D-0959 | fixed | `destroy_drawbridge` + find/is_wall dig furniture/`dighole` | map-driven debt; green+dig cohort 16/16 |
| D-0958 | fixed | `shopdig` dig warn/`shopdig(1)` pack snatch | map-driven debt; green+dig cohort 16/16 |
| D-0957 | fixed | `dig_up_grave` + `dighole` IS_GRAVE → PIT + grave contents | map-driven debt; green+dig cohort 16/16 |
| D-0956 | fixed | `Ring_gone`/`float_up`/`rescham`/`choke`(strangle)/`set_mimic_blocking` in eataccessory | map-driven debt; green+eat cohort 17/17 |
| D-0955 | fixed | `unturn_dead`/`revive` invent+floor + `hero_breaks`/`breaks` + worn ABON `cancel_item` | map-driven debt; green+zap cohort 16/16 |
| D-0954 | fixed | dig `furniture_handled` fountain/sink + HOLE hero `goto_level` + mon migrate | map-driven debt; green+dig cohort 16/16 |
| D-0953 | fixed | floorfood pool/lava reach + `vault_gd_watching` + gd_move witness | map-driven debt; green+eat/vault cohort 14/14 |
| D-0952 | fixed | break-wand strike/cancel/poly/tele/undead `bhitm`/`bhitpile`/`zapyourself` + `WAN_LIGHT` litroom | map-driven debt; green+wizard cohort 14/14 |
| D-0951 | fixed | pickaxe `use_pick_axe`/`dig` occupation/`is_digging`/`dig_typ`/`holetime` | map-driven debt; green+cohort 12/12 + arch tour PASS |
| D-0950 | fixed | `dig_check`/`digactualhole`/`fillholetyp` + break-wand dig/create pay | map-driven debt; green+wizard/dig cohort 12/12 |
| D-0949 | fixed | `explode` `zap_over_floor`/`pay_for_damage` + `do_break_wand` explode-types | map-driven debt; green+wizard/zap cohort 12/12 |
| D-0948 | fixed | `zap_over_floor` door/bars shopdamage + `dobuzz` `pay_for_damage` | map-driven debt; green+zap/shop cohort 12/12 + shop extras |
| D-0947 | fixed | `kick_door` shop `add_damage`/`pay_for_damage` + town watch | map-driven debt; suite **44**/44 @#1215; green+kick cohort 12/12 |
| D-0946 | fixed | `eatspecial` PAPER/potion/ring/amulet + leash/trident/flint/uwepgone/unpunish | map-driven debt; green+eat cohort 12/12 |
| D-0945 | fixed | `cpostfx` were*/mimic/`attrcurse` + `set_ulycn`/`eatmdone` | map-driven debt; green+eat cohort 12/12 |
| D-0944 | fixed | `mconveys` + `corpse_intrinsic`/`givit` | map-driven debt; green+eat cohort 12/12 |
| D-0943 | fixed | `cpostfx` specials + AD_STUN/AD_HALU hallu | map-driven debt; green+eat cohort 12/12 |
| D-0942 | fixed | `pay_for_damage`/`getcad`/`hot_pursuit` + chew/zap/wakeup | map-driven debt; suite **44**/44 @#1210 |
| D-0941 | fixed | `still_chewing` shop `add_damage` + `watch_dig`/`angry_guards` | map-driven debt; green+cohort 12/12 |
| D-0940 | fixed | tin `costly_tin`/`use_tin_opener` + shop `costly_alteration` | map-driven debt; green+cohort 12/12 |
| D-0939 | fixed | `cprefx` + cannibal/stone/slime helpers | map-driven debt; green+cohort 12/12 |
| D-0938 | fixed | `b_trapped` + `make_stunned`; tin/door/chew/kick wires | map-driven debt; green+cohort 12/12 |
| D-0937 | fixed | metallivore floorfood beartrap/bars + `still_chewing`/`dissolve_bars` | map-driven debt; suite **44**/44 @#1205 |
| D-0936 | fixed | `is_edible` poly + `doeat_nonfood`/`eatspecial` + floor gold | map-driven debt; green+eat cohort PASS |
| D-0935 | fixed | `start_tin`/`opentin`/`consume_tin` + multi-turn rations | map-driven debt; green+eat cohort PASS |
| D-0934 | fixed | recorder `get_configfile` default (CONSTITUTION §1.2) | suite **44**/44 @#1200; seed2200 Scr **230**/230 |
| D-0933 | fixed | NHW_TEXT paint ≤cols−1 (`process_text_window`) | #1199; path closed by D-0934 |
| D-0932 | fixed | serialize leading bold spaces (topten) | #1198; seed0030 aC2_aJ0→0 |
| D-0931 | fixed | flush S_air spaces + mid-row space CUF >4 | #1197; seed0373 sp_C6_J8→0 |
| D-0930 | fixed | serialize space+attr0+CLR_GRAY → NO_COLOR | #1196; j37→0 |
| D-0929 | fixed | look_here-only `keep_message_leftover` (not all corner) | suite **42/44**; Scr **10979**; seed4500 Scr **1389** held |
| D-0928 | partial | #1194 ^X rank==role + eaten_stat; #1195 suite **43**/44 Scr **11404**/11405 | seed4500 Scr **1814**; LB gap → D-0930 |
| D-0927 | fixed | rhack F-prefix reject non-movement (no execute) | seed4500 **87803→88377** RNG **88484** Scr **808**; next D-0928 place |
| D-0926 | fixed | mhitm_ad_blnd mhitu (raven AT_CLAW) + make_blinded | seed4500 **87218→87803** RNG **88082** Scr **794**; next @87803 distfleeck |
| D-0925 | fixed | breamm/breamu + mattacku AT_BREA + dobuzz fire-pool | seed4500 **86672→87218** RNG **87347** Scr **759**; next @87218 distfleeck |
| D-0924 | fixed | splitobj no invent[] splice (D-0923 over-splice) | seed0002 PASS restored; suite **42/44** Scr **10349**; next was @86672 breamm |
| D-0923 | fixed | touchfood freeinv+addinv_nomerge (partly-eaten invent) | seed4500 **82793→86672** RNG **86798** Scr **759**; invent[] splice later undone D-0924 |
| D-0922 | fixed | wakeup was_sleeping → wake_nearto (growl radius) | seed4500 **82788→82793** RNG **86800** Scr **755**; next @82793 steal invent |
| D-0921 | fixed | makemaz load_special minetn-4 College Town | seed4500 **61698→82788** RNG **83013** Scr **747**; next @82788 distfleeck |
| D-0920 | fixed | pleased fix_worst_trouble TROUBLE_HIT rnd(5) | seed4500 **61689→61698** RNG **61837** Scr **654**; next @61698 nhlib shuffle |
| D-0919 | fixed | nh_timeout FAST TIMEOUT / Very_fast expiry | seed4500 **61462→61689** RNG **61766** Scr **643**; next @61689 fix_worst_trouble |
| D-0918 | fixed | goto_level drag_down/ballrelease via uball | seed4500 **55990→61462** RNG **61496** Scr **622**; next @61462 distfleeck |
| D-0917 | fixed | fill_ordinary_room nsubrooms before needfill | seed4500 **54329→55990** RNG **57748** Scr **613**; next @55990 drag_down |
| D-0916 | fixed | themerms Nesting nested + lspo_door rnddoor | seed4500 **52803→54329** RNG **54647** Scr **613**; next @54329 somex |
| D-0915 | fixed | goto_level Punished unplacebc/placebc | seed4500 **52643→52803** RNG **52925** Scr **611**; next @52803 themerms |
| D-0914 | fixed | mk_knox_portal place under wizard/debug | seed4500 **50844→52643** RNG **52967** Scr **608**; next @52643 distfleeck |
| D-0913 | fixed | cmd `x` → doswapweapon + setworn twoweap clear | seed4500 **50338→50844** RNG **50936** Scr **594**; next @50844 mkshop |
| D-0912 | fixed | #turn / doturn chant + exercise(A_WIS) | seed4500 **50290→50338** RNG **50401** Scr **594**; next @50338 distfleeck |
| D-0911 | fixed | extract ox/oy + rottenfood + HDeaf timeout | seed4500 **50111→50290** Scr **499→596** RNG **50469**; next @50290 exercise |
| D-0910 | fixed | allmain regen_pw once-per-turn rn1 | seed4500 **50054→50111** RNG **50220→50240**; next @50111 next_ident |
| D-0909 | fixed | Punished drag_ball/move_bc/nomul(-2) | seed4500 **50034→50054** RNG **50167→50220**; next @50054 regen_pw |
| D-0908 | fixed | SCR_PUNISHMENT punish/placebc | seed4500 **49915→50034** Scr **481→499**; next was mattacku→D-0909 |
| D-0907 | fixed | study_book set_occupation(learn) + makeknown | seed4500 **49776→49915** Scr **459→481**; next @49915 mkobj |
| D-0906 | fixed | hellfill + create_maze / LVLINIT_MAZE | seed4500 **32538→49776** Scr **459**; next @49776 mcalcmove |
| D-0905 | fixed | peace_minded PM_ERINYS !abuse | seed4500 **28249→32538** Scr **308**; next @32538 hellfill |
| D-0904 | fixed | level_tele find_hell past main | seed4500 **18153→28249** Scr **302**; next @28249 makemon |
| D-0903 | fixed | fill_zoo BEEHIVE queen/killer+jelly | seed4500 **14216→18153** Scr **302**; next @18153 splev_initlev |
| D-0902 | fixed | shkveg/mkveggy_at HEALTHY_TIN | seed4500 **9974→14216** Scr **294**; next @14216 fill_ordinary |
| D-0901 | fixed | themerms Pillars terr shuffle | seed4500 **8925→9974** Scr **284**; next @9974 shkveg |
| D-0900 | fixed | spitmm/spitmu + m_lined_up | seed4500 **8491→8925** Scr **264→284**; next @8925 nhlib shuffle |
| D-0899 | fixed | #jump dojump/jump + getpos_getvalid | seed4500 **2869→8491** Scr **19→264**; next @8491 next_ident |
| D-0898 | fixed | ini_inv_use_obj armor setworn | seed2600 Scr **37→38** **PASS**; suite **42/44** |
| D-0897 | fixed | BIND= parsebindings + rhack inventory | seed2600 Scr **35→37**; next Antimagic setworn |
| D-0896 | fixed | bigrm-9 load_special | seed2600 RNG **FULL 11647** Scr **23→35**; next BIND= |
| D-0895 | fixed | themerms Temple of the gods fill | seed2600 **395→2917** Scr **3→23**; next @2917 nhlib shuffle |
| D-0894 | fixed | dryup town warn + watchman_warn_fountain | seed0014 **PASS 714/714**; suite **41/44** |
| D-0893 | fixed | setgemprobs ledger_no gem oc_prob | seed0014 Scr **678→712**; @631 closed; next @712 watch |
| D-0892 | fixed | do_attack gu.unweapon begin-bashing | seed0014 Scr **676→678**; @624 closed; next @631 gem |
| D-0891 | fixed | maketrap HOLE unhideable_trap tseen | seed0014 Scr **645→676**; @600 closed; next @624 bash |
| D-0890 | fixed | launch_obj DISP_FLASH + pline dirty vision_recalc | seed0014 Scr **644→645**; @560 closed; next @600 `^` |
| D-0889 | fixed | hack domove_swap peaceful x_monnam adj | seed0014 Scr **641→644**; next @560 trap map |
| D-0888 | fixed | uhitm cream pie The(xname) + An(singular) | seed0014 Scr **640→641**; next @558 peaceful swap |
| D-0887 | fixed | could_seduce hitmm/missmm + mhitu hitmsg | seed0014 Scr **638→640**; next @505 cream pie The |
| D-0886 | fixed | rloc appear + dochug flee RLOC_MSG | seed0014 Scr **636→638**; next @457 SSEX |
| D-0885 | fixed | teleport rloc RLOC_MSG vanish | seed0014 Scr **635→636**; @424 More via D-0886 |
| D-0884 | fixed | steal worn_item_removal on→from + nymph She | seed0014 Scr **634→635**; @417 vanish D-0885 |
| D-0883 | fixed | do_wear armoroff delay-0 no find_ac | seed0014 Scr **633→634**; @415 AC botl |
| D-0882 | fixed | invent merged coin bknown=0 before ID reconcile | seed0007 **PASS** restored; D-0879 order bug |
| D-0881 | fixed | objnam/potion short_oname dip yn budget strip | seed0014 Scr **624→633**; next @415 take-off botl AC |
| D-0880 | fixed | getline yn_function show_topl hard-wrap cursor | seed0014 Scr **623→624**; next @388 post-rust dip xname |
| D-0879 | fixed | invent addinv merged known/bknown/rknown + compare pline | seed0014 Scr **621→623**; next @383 yn cursor |
| D-0878 | fixed | lock chest_shatter_msg Blind+singular + PAPER/GLASS/WOOD mats | seed0014 Scr **620→621**; next @212 compare-items |
| D-0877 | fixed | dipfountain bath case 28 + steal somegold | seed0014 RNG **FULL 59178**; Scr 620/714; case 29 deferred |
| D-0876 | fixed | monmove watch_on_duty + has_town/in_town | seed0014 **58462→59074**; mon_yells/dig deferred |
| D-0875 | fixed | makemaz load_special minetn-3 Alley Town | seed0014 **52043→58462**; wand shop + watch_on_duty next |
| D-0874 | fixed | trapeffect_landmine + blow_up_landmine (mon weight) | seed0014 **50259→52043**; scatter/fill_pit deferred |
| D-0873 | fixed | sp_lev create_monster female overwrite after makemon | seed0399 **PASS** Scr 531→532; dwarf lord |
| D-0872 | fixed | objnam xname unique !nn uses_known → known=0 | seed0399 Scr **530→531**; @300 a silver bell |
| D-0871 | fixed | muse MUSE_POT_SPEED mquaffmsg + mon_adjust give_msg | seed0399 Scr **525→530**; @113–117 More |
| D-0870 | fixed | adjattrib in_moveloop STR/CON encumber_msg | seed0399 Scr **522→525**; poison--More-- before weaker |
| D-0869 | fixed | attrib poisoned/poisontell mhitu AD_DRST | seed0399 RNG **FULL 11409**; Scr 502→522 |
| D-0868 | fixed | done Lifesaved makeknown→exercise + savelife | seed0399 **10729→11152**; Scr 442→502; medallion |
| D-0867 | fixed | thitmonst tmiss else + food-fail wakeup | seed0399 **10697→10729**; Scr 429→442; armor throw |
| D-0866 | fixed | trapeffect_web mon mtrapped + mu_maybe_destroy_web | seed0399 **10581→10697**; Scr 409→429 |
| D-0865 | fixed | may_dig wall_info\|flags + peaceful dig avoid | seed0399 **10382→10581**; Scr 409; maze W_NONDIGGABLE |
| D-0864 | fixed | obj_resists invocation items skip rn2 | seed0399 **10309→10382**; Scr 407→409; Bell no rn2 |
| D-0863 | fixed | hold_another_object encumber_msg after prinv | seed0399 **10269→10309**; Scr 392→407; More absorbs #wizintrinsic |
| D-0862 | fixed | makesingular+as_is / gold wish / SCR_MAIL | seed0399 **10217→10269**; Scr 156→392 |
| D-0861 | fixed | searches_for_item Is_container | seed0399 **10157→10217**; Scr 113→156; elf sack goal |
| D-0860 | fixed | monflee always mon_track_clear | C fidelity; seed0399 @10157 inert (unicorn !mflee) |
| D-0859 | fixed | unicorn noteleport_level for NOTONL/flee-tele | C fidelity; seed0399 @10157 unchanged (maze !noteleport) |
| D-0858 | fixed | doattributes Hallu + Antimagic attrs | seed0383 **PASS** 219/219; suite PASS→39 local |
| D-0857 | fixed | corner NHW_MENU dismiss docorner≠docrt | Scr 211→217; superseded @213 by D-0858 |
| D-0856 | partial | invent display_pickinv Hallu obj_to_glyph | Scr 209→211; i/ESC map OK; superseded @210 by D-0857 |
| D-0855 | partial | m_dowear_type nambuf Monnam/mon_nam | LCP 555 named: movemon I_SPECIAL m_dowear; Scr 201→209; @? open |
| D-0854 | rejected | LCP 555 = fleeck→monflee Monnam | Falsified; true caller = m_dowear_type (D-0855) |
| D-0853 | partial | dochug Hallu newsym NOTHING/DONE/NOMOVES | LCP 553→555; first cell miss 198→199; Scr still 201; @199 open |
| D-0852 | partial | seed0383 Hallu levtport / gulp DISP | #996 flush+vision_off Scr→201; #997 dochug Hallu newsym (D-0853); @199 open |
| D-0851 | fixed | goto_level no post-docrt vision_recalc(0) | C fidelity; seed0383 @195 Hallu still open; green+cohort OK |
| D-0850 | fixed | xkilled tame `x_monnam(...,"poor",...)` | seed0383 Scr 193→194; @178 poor titan; green+cohort OK |
| D-0849 | fixed | do_name `hliquid` Hallu liquids + display-rng | seed0383 Scr 184→193; @187 purified water; green+cohort OK |
| D-0848 | fixed | extract-objects `-DMAIL_STRUCTURES` / SCR_MAIL | NUM_OBJECTS 481; Hallu rn2(463); seed0383 Scr 174→184 |
| D-0847 | closed | seed0383 @172 Hallu see_objects dim 462≠463 | Cause = missing SCR_MAIL (D-0848); next miss @184 |
| D-0846 | fixed | rloc_to newsym(old+new) + covers_objects | @173 mons OK w/ flush; 4 objs; Scr 174 w/o flush |
| D-0845 | fixed | see_traps only when glyph_is_trap | C fidelity; @172 burn still open |
| D-0844 | fixed | map_object Hallu statue memory random_obj | C fidelity; @172 still −1 display burn |
| D-0843 | fixed | HI_METAL mcolors + swallow DEC o/s scoring | Scr 148→176; flush still @172 post-expel Hallu |
| D-0842 | fixed | DECgfx swallow S_sw_tc/ml/mr/bc | o/x/x/s+SO; flush still display-RNG @bat; Scr 148 |
| D-0841 | rejected | gulpmu flush_topl_more ≡ display_nhwindow | toplines 141–174 OK; cause revised in D-0842 (not hjkl) |
| D-0840 | fixed | mpickstuff distant_name + hitmsg again | seed0383 Scr 146→148; RNG FULL; green+cohort OK |
| D-0839 | fixed | initedog set_malign after tame | seed0383 RNG FULL 16915; Scr 146/219; green+cohort OK |
| D-0838 | fixed | unstuck docrt + docrt memory Hallu | seed0383 prefix 11524→13689; green+cohort OK |
| D-0837 | fixed | getmattk mspec_used + mhitm_ad_cold | seed0383 prefix 11400→11524; green+cohort OK |
| D-0836 | fixed | abuse_dog + yelp/growl + xkilled luck | seed0383 prefix 11372→11400 Scr 144; green+cohort OK |
| D-0835 | fixed | wiz_intrinsic + make_hallucinated | seed0383 prefix 10843→11372 Scr 142→144; green+cohort OK |
| D-0834 | fixed | fog vapor TTL refresh + m_in_out_region | seed0383 prefix 10646→10843; green+cohort OK |
| D-0833 | fixed | domove uswallow + attack_checks engulfing_u | seed0383 prefix 10608→10646; RNG matched +577; green+cohort OK |
| D-0832 | fixed | makemon m_dowear + check_gear + I_SPECIAL | seed0383 prefix 10374→10608; green+cohort OK |
| D-0831 | rejected | JS mcanmove/sleep/WAITMASK/I_SPECIAL @10374 | JS gnome clear+mov12; ustuck=vortex; closed by D-0832 |
| D-0830 | rejected | post-swallow mcalcmove/MSLOW/minliquid | same +12/ROOM; not @10374; next mcanmove/sleep C-state |
| D-0829 | rejected | makemon 165/108 fmon creation order | same spawn+mcalcmove; not @10374; C skips gnome dochug |
| D-0828 | fixed | mondead keep-on-fmon + dmonsfree | C m_detach/dmonsfree; seed0383 still @10374; green+cohort OK |
| D-0827 | fixed | mattacku uswallow-only-ustuck early-out | C arm ported; seed0383 still @10374; RNG matched 10724→10762 |
| D-0826 | fixed | postmov engulfing_u → u_on_newpos | C arm ported; seed0383 still @10374 (gnome fleeck); next gnome skip |
| D-0825 | fixed | mattacku AT_ENGL + gulpmu (+ engulfing_u dochug) | seed0383 prefix 10281→10374 Scr 141→142; next @10374 fleeck order |
| D-0824 | fixed | monmove could_reach_item + mfndpos may_passwall | seed0383 prefix 10024→10281; closed by D-0825 |
| D-0823 | fixed | dog_goal could_reach_item pool/lava/boulder | seed0383 prefix 9709→10024; closed by D-0824 |
| D-0822 | fixed | bigrm-12 load_special (hexagon pool/lava) | seed0383 prefix 2493→9709 Scr 45→141; suite Scr+96 RNG+7585; next @9709 closed by D-0823 |
| D-0821 | fixed | Attributes Displaced + known speed-boots from_what | seed0360 **PASS** 833/833; suite 38/44; next seed0383 |
| D-0820 | fixed | Wiz locate_first/next qt_pager (quest.lua) | seed0360 Scr 830→832; @780/@781; next @828 Attributes displaced |
| D-0819 | fixed | getpos_help NHW_MENU + show_goal_msg on `?` | seed0360 Scr 828→830; @729/@730; next @780 materialize More |
| D-0818 | fixed | getpos feature matching altar `_` (+ furniture/traps) | seed0360 Scr 826→828; @719/@724; next @729 getpos_help |
| D-0817 | fixed | blank S_stone auto_describe without travelmode | seed0360 Scr 824→826; @678–679 stone; next @719 feature `_` |
| D-0816 | fixed | tele_restrict canseemon pline + wildmiss Displaced | seed0360 Scr 818→824; @668 tengu More; next @678 stone |
| D-0815 | fixed | getpos door cmap + unknown-dir visctrl | seed0360 Scr 812→818; @632 closed door; @661 ^D; next @668 |
| D-0814 | fixed | wiz_map level.traps + show_map_spot map_trap (+ blocked stair) | seed0360 Scr 694→812; @624 ^F traps; next @632 closed door |
| D-0813 | fixed | TRAVP_VALID BFS + travel blank S_stone | seed0360 Scr 689→694; @539 fixed; next @624 (D-0814) |
| D-0812 | fixed | lookat ROOM S_darkroom vs S_room | seed0360 Scr 684→689; @531 fixed; next @539 stone |
| D-0811 | fixed | lookat/auto_describe CLOUD fog/vapor | seed0360 Scr 679→684; @523 fixed; next @531 darkroom |
| D-0810 | fixed | setworn/Cloak_on no find_ac (delay-0 More) | seed0360 Scr 678→679; @497 AC; next @523 fog |
| D-0809 | fixed | getpos auto_describe "(no travel path)" | seed0360 Scr 673→678; @395 fixed; next @497 AC |
| D-0808 | fixed | Wiz quest firsttime qt_pager (quest.lua) | seed0360 Scr 670→673; prefix 373→395; next @395 travel path |
| D-0807 | fixed | sel_set_ter IS_LAVA → lit (C set_levltyp) | seed0360 Scr 638→670; prefix 324→373; next @373 fakewiz More |
| D-0806 | fixed | splev_mazewalk 3-arg ftyp=ROOM (not corrmaze→CORR) | seed0360 Scr 633→638; prefix 318→324; next @324 lava |
| D-0805 | fixed | Rogue assign_graphics + first-visit primitive pline | seed0360 Scr 628→633; prefix 301→318; next @318 · vs # |
| D-0804 | fixed | flip_level swap _objects_at with terrain (not fobj rebuild) | seed0360 Scr 617→628; prefix 249→301; next @301 materialize More |
| D-0803 | fixed | test_move cant_squeeze_thru Sokoban case 3 | seed0360 Scr 616→617; prefix 231→249; next @249 materialize map |
| D-0802 | fixed | lspo_region lit grow → light_region (minetn-5/minend-2) | seed0360 Scr 589→616; prefix 180→231; next @231 boulder |
| D-0801 | fixed | Valley arrival + hellish_smoke + Gehennom wall RED | seed0360 Scr 561→589; prefix 164→180; next @180 map mem |
| D-0800 | fixed | Wiz-loca + Wiz-fila/filb load_special | seed0360 RNG FULL 120639; Scr 519→561; next screen residual |
| D-0799 | fixed | set_apparxy can_fog vampshifter Displacement | seed0360 112857→113103; next getbones/lua |
| D-0798 | fixed | goto_level quest Home ok_to_quest gate | seed0360 112279→112857; Scr 504→519; next mux fleeck |
| D-0797 | fixed | acurr GoP STR19(25) + Dunce | seed0360 Scr 391→504; peel was premature getbones |
| D-0796 | fixed | castmu HASTE_SELF / CURE_SELF | MFAST → EOT +=24 leftover; seed0360 112243→112279 |
| D-0795 | fixed | movemon_singlemon early exits | utotype break + mon_offmap/isgd skip; idle on D-0794 |
| D-0794 | fixed | seed0360 apprentice leftover mov | cause was missing HASTE_SELF (D-0796); peel @112279 |
| D-0793 | fixed | makemon mux/muy zeromonst | mux/muy=0 not spawn; @112243 still Neferet CLOSE |
| D-0792 | fixed | Wizard ldrnum + mundisplaceable | leader_m_id set; refuse leader swap; CLOSE-clear @112243 falsified |
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
| D-0480 | partial | vanqsort strcmpi kept; serialize coerce superseded by D-0930 | D-0483 revert glyph path; D-0930 blank-only |
| D-0481 | fixed | makemon !in_mklev newsym after spawn | seed0006 Scr 106→110; @102→@110 disclose invent |
| D-0482 | fixed | disclose invent + enl + vanq ask | seed0006 **PASS** 123/123; Scr 5014; 28/44 |
| D-0483 | fixed | revert D-0480 serialize space/tty_map_color | seed0013 restored on live LB; keep strcmpi |
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
| D-0666 | fixed | altar_color via altarmask (unaligned CLR_RED) | seed0367 Scr 245→258; residual warn → D-0667 |
| D-0667 | fixed | see_monsters in teleds/docrt (stale Warning gbuf) | seed0367 Scr 258→267 prefix 185→203; next @203 level materialize |
| D-0668 | fixed | Pri-loca map lit=FALSE clear after mines lit-field | seed0367 @203 Z→warn; 27 cells W-vs-warn remain |
| D-0669 | fixed | tp_sensemon Unblind_telepat (amulet of ESP) | seed0367 Scr 267→291 prefix 203→209; next @209 lava |
| D-0670 | fixed | Pri goal/nexttime + Pri-goal lava lit + quest_portal pline | seed0367 Scr 291→305 prefix 209→258; next @258 intemple voice |
| D-0671 | fixed | intemple intone `canseemon` (not canspotmon) | seed0367 Scr 305→308 prefix 258→262; next @262 Warning floats |
| D-0672 | fixed | moveloop once-per-input see_monsters (Warning/ESP) | seed0367 Scr 308→312 prefix 262→278; next @278 materialize map |
| D-0673 | fixed | tower1 map lit=FALSE clear (≡ C lspo_map) | seed0367 Scr 312→315 prefix 278→283; next @283 · vs blank |
| D-0674 | fixed | does_block visible_region_at + run_regions ttl | seed0367 prefix 283→297 Scr 315→314; next @297 wall |
| D-0675 | fixed | clear_regions on mklev + goto_level stash/rest | seed0367 Scr 314→322 prefix 297→318; next @318 attributes pages |
| D-0676 | fixed | ^X attrs Fire/Shock/item_res/ESP/Warning + weapon_descr P_NONE + FAST worn equip | seed0367 **PASS** 324/324; suite PASS **35**/44 |
| D-0677 | fixed | chargen rigid only on plsel_startmenu (n>1) | seed0014 RNG prefix 1→3113 Scr 10→34; next @3113 exercise |
| D-0678 | fixed | SCR_IDENTIFY seffect_identify + invent identify_pack | seed0014 RNG prefix 3113→3199 Scr 34→43; next @3199 forcelock |
| D-0679 | fixed | forcelock + supply add_to_container + SPBOOK mrg=0 | seed0014 RNG prefix 3199→6294 Scr 43→154; next @6294 exercise |
| D-0680 | fixed | POT_SICKNESS peffect_sickness + makeknown WIS | seed0014 RNG prefix 6294→9354 Scr 154→221; next @9354 cursed_book |
| D-0681 | fixed | cursed_book + study_book too_hard + aggravate | seed0014 RNG prefix 9354→14566 Scr 221→298; next @14566 zhitm |
| D-0682 | fixed | zhitm wand-ray damage + cold destroy_items/resist | seed0014 RNG prefix 14566→16304 Scr 298→365; next @16304 dipfountain |
| D-0683 | fixed | water_damage → erode_obj(ERODE_RUST) | seed0014 RNG prefix 16304→16447 Scr 365→383; next @16447 gush/dogushforth |
| D-0684 | fixed | dogushforth/gush do_clear_area + nexttodoor | seed0014 RNG prefix 16447→16624 Scr 383→395; next @16624 dowaternymph |
| D-0685 | fixed | dowaternymph makemon + dip 21/22 + drink 28 | seed0014 RNG prefix 16624→16712 Scr 395→401; next @16712 steal |
| D-0686 | fixed | steal AD_SITM + rloc 50× rnd/rn2 | seed0014 RNG prefix 16712→17952 Scr 401→435; next @17952 dochug rn2(40) |
| D-0687 | fixed | domonnoise MS_SEDUCE nymph #chat | seed0014 RNG prefix 17952→18426 Scr 435→445; next @18426 distfleeck |
| D-0688 | fixed | assigninvlet keep letter + Boots_on Fumble rnd(20) | seed0014 RNG prefix 18426→18494 Scr 445→453; next @18494 exercise |
| D-0689 | fixed | exerper Fumbling ≡ H\|\|E (youprop.h) | seed0014 RNG prefix 18494→19636 Scr 453→459; next @19636 lspo_map |
| D-0690 | fixed | themerms Water-surrounded vault des.map | seed0014 prefix 19636→21242 Scr 459→460; next @21242 goto_level |
| D-0691 | fixed | goto_level descend Fumbling() ≡ H\|\|E | seed0014 prefix 21242→21529 Scr 460→467; next @21529 slip_or_trip |
| D-0692 | fixed | nh_timeout FUMBLING slip_or_trip rn2(4) | seed0014 prefix 21529→22582 Scr 467→481; next @22582 thitmonst |
| D-0693 | fixed | thitmonst pie DEX rnd(25) + hmon cream pie | seed0014 prefix 22582→22868 Scr 481→482; next @22868 dog_move |
| D-0694 | fixed | makeplural one_off foot→feet | seed0014 Scr 482→483; @22868 mtrack is More/key desync |
| D-0695 | fixed | unmul empty nomovemsg ≠ default | seed0014 prefix 22868→28552 Scr 483→515; next @28552 exercise |
| D-0696 | fixed | closed-door bump Fumbling() ≡ H\|\|E | seed0014 prefix 28552→32023 Scr 515→533; next @32023 create_monster |
| D-0697 | fixed | create_monster mines your_race rn2(3) | seed0014 prefix 32023→33278 Scr 533→538; next @33278 corpse_chance |
| D-0698 | fixed | ohitmon kill → mondied/corpse_chance | seed0014 prefix 33278→35611 Scr 538; next @35611 distfleeck |
| D-0699 | fixed | setworn(null,W_RINGL\|R) clears uleft/uright | seed0014 prefix 35611→36031 Scr 538; next @36031 exercise |
| D-0700 | fixed | ohitmon range==-1 rolling boulder re-extract | seed0014; boulder rests 56,10; next @35246 mdig |
| D-0701 | fixed | mons_see_trap dotrap/mintrap fan-out | seed0014 prefix 35246→36031 Scr 553→566; next @36031 exercise |
| D-0702 | fixed | travel couldsee-prefer / seenv-detour rest | seed0014 prefix 36031→40196 Scr 566→574; next @40196 mintrap |
| D-0703 | fixed | mintrap HOLE && !mindless already_seen | seed0014 prefix 40196→43068 Scr 574→575; next @43068 find_misc |
| D-0704 | fixed | find_misc bullwhip/invis + use_misc yank | seed0014 prefix 43068→43308 Scr 575; next @43308 distfleeck |
| D-0705 | fixed | lookaround mon_visible + attack_checks Wait invis | seed0014 prefix 43308→43341 Scr 575; next @43341 kick |
| D-0706 | fixed | maybe_kick_monster / kick_monster / kickdmg | seed0014 prefix 43341→43553 Scr 575; next @43553 mkobj/makemon |
| D-0707 | fixed | corpse_chance always-TRUE bigmonst/lizard/golem/… | seed0014 prefix 43553→49039 RNG 49495; next @49039 distfleeck |
| D-0708 | open | mfndpos cnt 6 vs 5; C dest~(24,12); suspect (22,10) | seed0014 @49039; only new neigh vs prior cnt=8 |
| D-0709 | fixed | EXT_CMDS `#wizwish` → wiz_wish | seed0108 2772→2778; next @2778 dochug rn2(4) |
| D-0710 | fixed | EXT_CMDS `#rub`/dorub + wield_tool; nomul clears cmdq | seed0108 2778→2807; next @2807 use_cream_pie |
| D-0711 | fixed | doapply use_cream_pie rnd(25)+ucreamed/make_blinded | seed0108 2807→2810; then D-0712 wipe |
| D-0712 | fixed | EXT_CMDS `#wipe`/dowipe + wipeoff occupation | seed0108 2807→2864; next @2864 exercise/polyself |
| D-0713 | fixed | EXT_CMDS `#polyself`/polymon controlled+mhmax | seed0108 2864→2881; next @2881 dog obj_resists |
| D-0714 | fixed | polymon `drop_weapon(1)` cantwield → dropx | seed0108 2881→2958; next @2958 distfleeck |
| D-0715 | fixed | EXT_CMDS `#invoke`/doinvoke !inv_prop nothing_happens | seed0108 2958→3011; next @3011 space/More before chest |
| D-0716 | fixed | wipe `make_blinded` sticky Blind + vision_recalc | seed0108 More restored; still @3011 EOT umov loopAgain |
| D-0717 | fixed | `set_mon_data` prorate hero `u.umovement` on slower poly | seed0108 3011→3186; next @3186 newman |
| D-0718 | fixed | `newman` after `#polyself` human (level/sex/rndexp/redist) | seed0108 3186→3564; next @3564 getbones |
| D-0719 | fixed | EXT_CMDS `#tip`/`dotip` floor ynq; unmul→deferred_goto | seed0108 RNG FULL 16958; Scr 110→148 |
| D-0720 | fixed | throw getdir `.`/`s` self + throw_obj refuse pline | seed0108 Scr 148→149; next cream Blind map |
| D-0721 | fixed | cream-pie make_blinded → vision_recalc on toggle | seed0108 Scr 149→156; next @78 polyself gnome |
| D-0722 | fixed | polymon gnome + Upolyd botl/glyph/weight_cap | seed0108 Scr 156→186; prefix 78→88 |
| D-0723 | fixed | EXT_CMDS `#monster`/domonability reflexive | seed0108 Scr 186→187; prefix 88→109; next @109 Fly |
| D-0724 | fixed | `set_uasmon` PROPSET(FLYING) FROMFORM | seed0108 Scr 187→280; rest PROPSET deferred |
| D-0725 | fixed | polymon verbose breath tip + dobreathe uen gate | seed0108 Scr 280→283; prefix 110→176; next @176 nohands |
| D-0726 | fixed | doloot nohands + #untrap could_untrap + newman individual | seed0108 Scr 283→287; prefix 176→216; next @216 open dir |
| D-0727 | fixed | `o`/doopen getdir + doforce ynq `q` + xname named | seed0108 Scr 287→292; prefix 216→280; next @280 #herecmdmenu |
| D-0728 | fixed | `#herecmdmenu`/`doherecmdmenu` self menu; NUL≠TIME | seed0108 Scr 292→293; cursors FULL; next wall color after ^V |
| D-0729 | fixed | Sokoban `wall_glyph` blue only under DECgraphics | seed0108 PASS 303/303; suite 36/44 @#810; next D-0708 |
| D-0730 | fixed | max_passive_dmg AD_ACID (+ FIRE/COLD/ELEC) | seed0399 10145→10157 RNG 10359; next @10157 m_move |
| D-0731 | fixed | unicorn mfndpos cnt7vs5 via mon drift | closed by D-0861 Is_container; next @10217 namedesc |
| D-0732 | fixed | mon_allowflags + in_your_sanctuary / temple ALLOW_SANCT | shared; seed0399 @10157 unchanged (maze nrooms=0) |
| D-0733 | fixed | mfndpos diagonal worm_cross + rogue door-cut | shared; inert for 0399/0014 (no worms / not rogue) |
| D-0734 | fixed | zhitu non-sleep + hero destroy_items AD_FIRE | seed5002 5980→6172; seg0 FULL; next themerms @6172 |
| D-0735 | fixed | use_stethoscope adjacent must return res TIME | seed5002 seg1 5668→5739; root was ECMD_OK stub |
| D-0736 | fixed | use_mirror + use_camera getdir/beam/flash | seed5002 cont 5739→5904; seg0 C FULL +1 learnwand |
| D-0737 | fixed | zhitu fatal losehp→finish_losehp_done before learnwand | seed5002 cont 5904→11643; RNG 6176→11693 |
| D-0738 | fixed | hero_seq moveloop + stethoscope seemimic/mstatusline | seed5002 cont 11643→11715; RNG 11693→11895 |
| D-0739 | fixed | mattackm mlstmv + dog_move return onscary | seed5002 cont 11715→11725; next wish rn2(181) |
| D-0740 | fixed | cmd `c` → doclose + getdir cmdassist | seed5002 RNG FULL 12167; Scr 114→125; was premature ^W wish |
| D-0741 | fixed | burnarmor erode + destroy pline/potionbreathe | seed5002 Scr 125→400; next @230 write/cmdassist |
| D-0742 | fixed | dowrite + open cmdassist + itemed throw | seed5002 Scr 400→410 **PASS**; suite 37/44 |
| D-0743 | fixed | mattackm AT_WEAP mon_wield_item → M_ATTK_MISS | seed0360 2995→3006; RNG 3098→3120; next exercise @3006 |
| D-0744 | fixed | Boots_on SPEED_BOOTS makeknown→exercise(A_WIS) | seed0360 3006→3037; RNG 3120→3186; next lua shuffle @3037 |
| D-0745 | fixed | oracle.lua load_special (rooms/DELPHI/statues) | seed0360 3037→8708; RNG 3186→8728; Scr 187→200; next castle @8708 |
| D-0746 | fixed | castle.lua load_special + mazewalk/squadmon | seed0360 8708→22925; RNG 8728→22948; Scr 200→201; next valley @22925 |
| D-0747 | fixed | valley.lua + Inhell hellish/G_NOHELL rndmonst | seed0360 22925→31374; RNG 22948→31408; Scr 201→204; next mkclass @31374 |
| D-0748 | fixed | mkclass_aligned Inhell via hellish (not GEHENNOM) | seed0360 31374→35405; RNG 31408→35443; Scr 204→207; next rnd_misc @35405 |
| D-0749 | fixed | rnd_misc_item life-saving needs !nonliving && !vampshifter | seed0360 35405→37668; RNG 35443→37686; suite #845 568288/71.68%; next shuffle @37668 |
| D-0750 | fixed | sanctum.lua load_special + peace_minded is_minion | seed0360 37668→38557; RNG 37686→38600; next rndmonst_adj @38557 |
| D-0751 | fixed | hell temperature + temperature_shift pm_resistance | seed0360 38557→41671; RNG 38600→41693; next place_lregion @41671 |
| D-0752 | fixed | sanctum teleport_region region_islev absolute | seed0360 41671→41768; RNG 41693→41793; next maybe_generate_rnd_mon @41768 |
| D-0753 | fixed | maybe_generate_rnd_mon udemigod/stronghold rate | seed0360 41768→41777; RNG 41793→41794; next lua shuffle @41777 |
| D-0754 | fixed | minetn-5.lua load_special (Grotto Town) | seed0360 41777→43248; RNG 41794→43267; suite #850 573869/72.38%; next minend-2 @43248 |
| D-0755 | fixed | minend-2.lua load_special (Wine Cellar) | seed0360 43248→52601; RNG 43267→52639; Scr 207→238; next soko4-1 @52601 |
| D-0756 | fixed | soko4-1.lua load_special (Sokoban entry) | seed0360 52601→53361; RNG 52639→53376; Scr 238→242; next tower2 @53361 |
| D-0757 | fixed | tower2.lua load_special (Vlad middle) | seed0360 53361→53591; RNG 53376→53595; Scr 242→246; next tower3 @53591 |
| D-0758 | fixed | tower3.lua load_special (Vlad entry) | seed0360 53591→55374; RNG 53595→55383; Scr 246→261; next medusa-3 @55374 |
| D-0759 | fixed | medusa-3.lua + mk_artifact A_NONE | seed0360 55374→60114; RNG 55383→60117; Scr 261→265; suite Scr 8270 RNG 74.51%; next bigrm-4 @60114 |
| D-0760 | fixed | bigrm-4.lua load_special | seed0360 60114→65027; RNG 60117→65054; Scr 265; next mkobj @65027 |
| D-0761 | fixed | makemon mlet before G_SGROUP | seed0360 65027→68428; RNG 65054→68434; Scr 265→270; next makeroguerooms @68428 |
| D-0762 | fixed | makeroguerooms + makelevel rogue skip0 | seed0360 68428→68690; RNG 68434→68694; Scr 270; next post-rogue load_special @68690 |
| D-0763 | fixed | asmodeus + hellprobs/noteleport/mlevel>49/sleep order | seed0360 68690→71832; RNG 68694→71855; Scr 270→267; next hell_tweaks @71832 |
| D-0764 | fixed | hell_tweaks + fillrect get_location xstart | seed0360 71832→72078; RNG 71855→72079; Scr 270; next juiblex/swamp @72078 |
| D-0765 | fixed | juiblex + lvlfill_swamp + map align L/R/T/B | seed0360 72078→74801; RNG 72079→74607; Scr 270→267; next walkfrom @74801 |
| D-0766 | fixed | baalz + baalz_fixup + bughack wallify | seed0360 74801→76622; RNG 74803→76625; Scr 273; next orcus @76622 |
| D-0767 | fixed | orcus + stock_room Orcus mongone invent | seed0360 76622→82982; RNG 76625→82989; Scr 273; next wizard1 @82982 |
| D-0768 | fixed | wizard1 load_special | seed0360 82982→86029; RNG 82989→86118; Scr 273; next distfleeck @86029 |
| D-0769 | fixed | m_move maybe_unhide_at | seed0360 86029→86100; RNG 86118→86137; Scr 273; next track vs slpgas @86100 |
| D-0770 | fixed | m_harmless check_in_air + mfndpos poisoncloud glyph | seed0360 86100→86170; RNG 86137→86170; Scr 273; next nhlib shuffle @86170 |
| D-0771 | fixed | wizard2 load_special | seed0360 86170→98492; RNG 86170→98507; Scr 273→275; next distfleeck @98492 |
| D-0772 | fixed | hell_tweaks `.w.` mapfrag + @98492 linedup diag | seed0360 still @98492; JS linedup boulder rn2(3) vs C distfleeck; next couldsee/m_move |
| D-0773 | fixed | @98492 linedup vs C (diag) | superseded: cause was missing minliquid (D-0775) |
| D-0774 | fixed | sp_lev map_cleanup before wallify/flip | hell loaders; seed0360 still @98492 (LOS boulder on ROOM) |
| D-0775 | fixed | movemon minliquid lava/pool | seed0360 98492→98505; RNG 98507→98528; Scr 275; next Wiz-strt @98505 |
| D-0776 | fixed | Wiz-strt load_special | seed0360 98505→100104; RNG 98528→100408; Scr 275→292; next traps @100104 |
| D-0777 | fixed | maketrap IS_AIR/CLOUD reject | seed0360 100104→100397; RNG 100408→100887; Scr 292; next distfleeck @100397 |
| D-0778 | fixed | m_move Tengu nature teleport | seed0360 100397→100738; RNG 100887→104024; Scr 292; next mfndpos chcnt @100738 |
| D-0779 | fixed | getpos seenv (peel cause superseded by D-0782) | seed0360 100738→101022 then D-0782 |
| D-0780 | fixed | lock.js getdir `'.'` = GETDIR_SELF | seed0360 Scr 292→293; #chat/kick/open path; peel unchanged |
| D-0781 | fixed | dochug/postmov mon_offmap gates | plumbing for portal migrate |
| D-0782 | fixed | Wiz-strt branch FlipY + MAGIC_PORTAL migrate | seed0360 101022→101930; Scr 294→389; RNG 105212 |
| D-0783 | fixed | Gloves_on POWER + Cloak_on DISPLACEMENT makeknown | seed0360 101930→104904; Scr 389→391; RNG 107246 |
| D-0784 | fixed | dotravel seenv\|\|couldsee (drop couldsee-only prefer) | seed0360 104904→108368; RNG 109279; seed0014→50259 |
| D-0785 | fixed | kick_ouch/dumb set_wounded_legs ATEMP(DEX)-- | seed0360 108368→108369; RNG 109615 |
| D-0786 | fixed | dokick Wounded_legs legs_in_no_shape + More | seed0360 108369→109077; suite RNG 109603 |
| D-0787 | fixed | wiz_map ^F do_mapping exercise(A_WIS) | seed0360 109077→109454; suite RNG 110391 |
| D-0788 | fixed | TRAVP_GUESS hero-matrix + raster pick (not displ) | seed0360 109454→110844; suite RNG 111367 |
| D-0789 | fixed | dotele clear travelcc before tele (^T getpos) | seed0360 110844→110880; suite RNG 111566 |
| D-0790 | fixed | m_move post-select mux-image → m_move_aggress DONE | seed0360 110880→112243; focused RNG 112272 |
| D-0791 | fixed | attack_checks WAITMASK + is_safemon canspotmon + wake G_UNIQ | seed0360 still @112243; Neferet CLOSE next |
| D-0792 | fixed | Wizard ldrnum + mundisplaceable | leader_m_id; refuse leader swap; CLOSE-clear @112243 falsified |



| D-0569 | fixed | Fire lit epilogue + monster do_light_sources | seed0373 Scr 101→110; next Wizard Monnam @101 |
| D-0568 | fixed | doname the_unique_obj + print_dungeon bot restore | seed0373 Scr 100→101; next Fire vision @100 |
| D-0567 | fixed | Sokoban premap_detect + solidify + flip spines + wall CLR_BLUE | seed0373 Scr 88→100; next @99 Fire / Amulet phrasing |
| D-0566 | fixed | bigrm light_region + IRONBARS + makemon hide/minvis + HI_LORD | seed0373 Scr 85→88; next @78 Dlvl:6 walls |

| D-0523 | fixed | m_calcdistress → were_change / new_were | seed0116 12461→12521 (RNG 12554/12562); Scr 110; next fleeck/dog_move |





D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

