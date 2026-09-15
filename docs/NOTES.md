# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Park rows: re-pop only on the listed falsifier (proofs in Parked).

- **Presence-only parks (0/553 owned):** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt, dochug/dotrap/mintrap/nh_timeout/mon_break_armor (STALE).
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
- **really_done:** STALE per D-1812; live end.c residual is `disclose`.
- **newuhs:** STALE, full port D-1791.
- **domonnoise/dismount_steed:** STALE DUPLICATEs (D-1915/885).
- **STALE parks 2026-09-14/15** (proofs in Parked; re-pop only on blocked-owner verify): test_move/domove_core (D-1800/D-1270/D-1226 live), arti_cost (D-1719 triple), m_initweap S_DEMON (D-0472), mextra trio (D-1598 + follow-ups), make_sick Unaware (C potion.c:145-148 #if 0), dodrink drink_ok_extra/Strangled/underwater (D-2031 + D-1834), make_corpse (D-1794), vpline (D-1807), mkcavearea/mkcavepos/rm_waslit (D-0960; 0 blocked x3 — Parked).

## Don't re-check (≤15)

- D-1790…D-2311 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 are D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2311.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, or makemon→hack/artifact/minion. No re-port D-1682…D-2311.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2311: `js/dig.js`: `maybe_dunk_boulders` now async with C order preserved — `boulder_hits_pool` via dynamic `do.js` import (the file's convention for `do.js Named: `trap.js blow_up_landmine` fill_pit/maybe_dunk/spot_checks (own future trap row); `dig_che
- D-2310: port `clear_conjoined_pits` file-local in C order (`| 0` idiom, `xdir`/`ydir`/`N_DIRS`, `DIR_180`, `isok` + `t_at` neighbour lookup); `deltrap` calls  Named: `deltrap` Sokoban `maybe_finish_sokoban` + `dealloc_trap` tail (C `:6536–6545`; shop/regio
- D-2309: `js/pray.js` only (no new module edge — `shieldeff` joins the existing `display.js` import): both survive-lightning arms `await shieldeff(u.ux, u.uy)` Named: `SetVoice` ×2 (C-side no-op in this build); `mcastu ureflects` (pre-existing); post-death 
- D-2308: `js/shk.js` only: `rile_shk` ports the walk verbatim in C order over the live `bill_p`/`bill` shape (same `||` fallback as `addupbill`; `| 0` integer  Named: `SetVoice` in `shopdig` warn (pre-existing); `#if 0` nolimbs curse/rile early-return (C-di
- D-2307: `js/dig.js` only (+ `js/zap.js` 1-line `await`): `end_burn` via dynamic `timeout.js` import (sync export; `stop_timer` runs `cleanup_burn` — C `timeou Named: sanity-check `impossible` text (file-convention soft); CORPSE-under-ice (C TODO `:2026–202
- D-2306: `js/cmd.js` only, no new module edge (`do_fight` same-module; no `imports.mjs --can` needed): `-` shares the `F` arm (`ch === 'F' || ch === '-'` → `do Named: `!`→doshell binding (2 corpus sessions, own future row); other number_pad/phone/swap_yz/pc
- D-2305: `js/trap.js` only, no new module edge (`getobj`/`useup`/`consume_obj_charge` join the existing `invent.js` import; `GETOBJ_*` join `const.js`; `unbloc Named: `move_into_trap` (adjacent-Whoops; needs `test_move` export, D-1813); `stumble_on_door_mim
- D-2304: `js/mklev.js` only, no new cross-module edge (every callee same-module or already imported — `MKTRAP_NOFLAGS/SEEN/MAZEFLAG` join the existing `const.j Named: `mktrap` invalid-args `paniclog` write (file-only, no scored-JS equivalent under Rule #2; 
- D-2303: port the C arm verbatim in C order over live callees only — `otmp = sobj_at(BOULDER, sx, sy); if (otmp) { obj_extract_self(otmp); place_object(otmp, s Named: VIS_EFFECTS (commented out in C too — `/* tmp_at ...
- D-2302: port the C skeleton in C order over the existing inline refresh (conditions unchanged): file-local `const LSF_SHOW = 0x1` (light.c:41; the line-29 `CO Named: `LSF_NEEDS_FIXUP` (unchanged); `get_*_location` refinement arms — youmonst/usteed identity
- D-2301: file-local `const materialnm` (22 words, C order, `decl.c` C-ref; eat.js `foodwords` precedent — no new module edge, no `imports.mjs --can` needed; th Named: `grease_protect` polish stays named (pre-existing); `nhlobj.c:222` Lua "material" entry st
- D-2300: both arms in C order over live callees only — `if ((mtmp2.wormno | 0)) place_wsegs(mtmp2, mtmp)` after the steed-gated `place_monster` in `replmon`; ` Named: replmon light-source swap, full `replshk` bill, `set_ustuck` botl edge, `dealloc_monst` (G
- D-2299: `replmon` ports C order over live callees only — `impossible` (display.js), `place_monster` (steed.js), `OBJ_MINVENT` (const.js) and `remove_worm` (wo Named: `place_wsegs(mtmp2, mtmp)` in `replmon` (next Open row `worm.c` place_wsegs restore/replmo
- D-2298: port the C body in C order over live callees only — `glyph_at`/`glyph_is_trap`/`glyph_to_trap`/`trap_to_glyph` (display.js), `trap_description` (local Named: `doidtrap` (the `^` single-cell command, C `:2335+` — its own C function, own future row);
- D-2297: new exported `create_region(rects, nrect)` + `add_rect_to_reg(reg, rect)` in `js/region.js` (C order, `| 0` idiom, rects copied not aliased); both con Named: none new (`clone_region`/`create_msg_region`/`create_force_field` are `#if 0` in C too; bi
<!-- landmarks:end -->
