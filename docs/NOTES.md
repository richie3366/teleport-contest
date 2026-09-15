# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Park rows: re-pop only on the listed falsifier (proofs in Parked).

- **Presence-only parks (0/553 owned):** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt, dochug/dotrap/mintrap/nh_timeout/mon_break_armor (STALE).
- **ignite_items/catch_lit:** STALE DUPLICATE, parked 2026-09-15 (shipped D-0978; proof in LOOP-QUEUE Parked).
- **Transient parks:** break_armor timing.
- **exercise:** draw-presence only, 0/553 owned.
- **do_statusline1/2:** paint-timing (statusline1 → attributes_enlightenment).
- **Fortress guards** (settled — do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom-owner parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled/x_monnam.
- **slimed:** landing + Sick-store writers.
- **Misattributed parks (proofs in Parked):** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon, that_is_a_mimic/drinkfountain, poly_obj (citation + no C arm).
- **disclose/list_vanquished:** Hallu desync / identical-prompt cell.
- **dopush:** mimic memory/viz, not the push.
- **domonnoise:** STALE DUPLICATE of D-1915 (review 885 ACCEPT; no-skip range holds it).
- **STALE parks 2026-09-14/15** (proofs in Parked; re-pop only on blocked-owner verify): test_move/domove_core, arti_cost (D-1719), m_initweap S_DEMON (D-0472), mextra trio (D-1598), make_sick Unaware, dodrink (D-2031+D-1834), make_corpse (D-1794), vpline (D-1807), mkcavearea/mkcavepos/rm_waslit (D-0960), dig_up_grave/IS_GRAVE (review-26), furniture_handled-HOLE (D-0954), use_bell/openit/openone/mkundead (D-1028); getcad trio (stale), kick_object Is_box/container_impact/chest_trap/ghitm (D-0989).

## Don't re-check (≤15)

- D-1790…D-2318 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 are D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2318.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, or makemon→hack/artifact/minion. No re-port D-1682…D-2318.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2318: `js/trap.js` only (+2 static imports: `sndprocs.js` Soundeffect — `imports.mjs` SAFE, no cycle; `const.js` MIGR_NOWHERE; `dokick.js`/`do.js` via the f Named: launch_obj `closed_door` crash-through (C `:3533–3541`; `pline_The` has no JS counterpart)
- D-2317: both call sites now use the already-imported `canspotmon` (`display.js:1237` ≡ C; no new module edge, no TDZ risk). Named: `boxlock_invent` `update_inventory()` refresh (map-named; UI redraw, no corpus screen/RNG 
- D-2316: `js/hack.js` (C-file match): new export `revive_nasty` in C order — `mons()`+`is_rider` permonst (mondata.h:110), `monsterNames.indexOf('PM_WIZARD_OF_ Named: `set_entity`/`do_entity` crush on open/close (D-1967 open row — its iter wires); `moverock
- D-2315: `js/music.js` only, no new module edges (all three source modules already imported): SCORR arm calls live `unblock_point` (joins the existing `vision. Named: do_pit `set_levltyp(x, y, filltype)` side effects (no JS `set_levltyp` exists — own future
- D-2314: `js/do.js` only: `if (falling) await impact_drop(null, u.ux|0, u.uy|0, newlevel.dlevel|0)` immediately before the keepdogs block, hence before `check_ Named: `goto_hell(at_stairs,falling)` (dungeon.c:1956–1962) has no JS counterpart (zero `goto_hel
- D-2313: `js/dbridge.js` only: both `Soundeffect` calls in C order (before messages); boulder arm `await flooreffects(otmp2,x,y,'fall')` (new static `do.js` ed Named: local `wake_nearto` `& ~0x01` vs C `~STRAT_WAITMASK` + `wake_msg`/`G_UNIQ` skip (mon.c `wa
- D-2312: `js/dig.js` only: bear-trap arm ports C order (`rnl(7)` first, `dmgval(uwep, game.youmonst)+dbon()`, `u.uarmf` halve `| 0`, `body_part(FOOT)` via dyna Named: `Soundeffect` (draw-free); `IS_ALTAR altar_wrath`/`angry_priest` (pray family, D-0963 row)
- D-2311: `js/dig.js`: `maybe_dunk_boulders` now async with C order preserved — `boulder_hits_pool` via dynamic `do.js` import (the file's convention for `do.js Named: `trap.js blow_up_landmine` fill_pit/maybe_dunk/spot_checks (own future trap row); `dig_che
- D-2310: port `clear_conjoined_pits` file-local in C order (`| 0` idiom, `xdir`/`ydir`/`N_DIRS`, `DIR_180`, `isok` + `t_at` neighbour lookup); `deltrap` calls  Named: `deltrap` Sokoban `maybe_finish_sokoban` + `dealloc_trap` tail (C `:6536–6545`; shop/regio
- D-2309: `js/pray.js` only (no new module edge — `shieldeff` joins the existing `display.js` import): both survive-lightning arms `await shieldeff(u.ux, u.uy)` Named: `SetVoice` ×2 (C-side no-op in this build); `mcastu ureflects` (pre-existing); post-death 
- D-2308: `js/shk.js` only: `rile_shk` ports the walk verbatim in C order over the live `bill_p`/`bill` shape (same `||` fallback as `addupbill`; `| 0` integer  Named: `SetVoice` in `shopdig` warn (pre-existing); `#if 0` nolimbs curse/rile early-return (C-di
- D-2307: `js/dig.js` only (+ `js/zap.js` 1-line `await`): `end_burn` via dynamic `timeout.js` import (sync export; `stop_timer` runs `cleanup_burn` — C `timeou Named: sanity-check `impossible` text (file-convention soft); CORPSE-under-ice (C TODO `:2026–202
- D-2306: `js/cmd.js` only, no new module edge (`do_fight` same-module; no `imports.mjs --can` needed): `-` shares the `F` arm (`ch === 'F' || ch === '-'` → `do Named: `!`→doshell binding (2 corpus sessions, own future row); other number_pad/phone/swap_yz/pc
- D-2305: `js/trap.js` only, no new module edge (`getobj`/`useup`/`consume_obj_charge` join the existing `invent.js` import; `GETOBJ_*` join `const.js`; `unbloc Named: `move_into_trap` (adjacent-Whoops; needs `test_move` export, D-1813); `stumble_on_door_mim
- D-2304: `js/mklev.js` only, no new cross-module edge (every callee same-module or already imported — `MKTRAP_NOFLAGS/SEEN/MAZEFLAG` join the existing `const.j Named: `mktrap` invalid-args `paniclog` write (file-only, no scored-JS equivalent under Rule #2; 
<!-- landmarks:end -->
