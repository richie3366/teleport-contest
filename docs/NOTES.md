# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Park rows: re-pop only on the listed falsifier (proofs in Parked).

- **Presence-only parks (0/553 owned):** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt/exercise, dochug/dotrap/mintrap/nh_timeout/mon_break_armor.
- **Fortress guards** (settled — do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom-owner parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum; do_statusline1/2 paint-timing; slimed landing + Sick-store.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled/x_monnam, domonnoise.
- **Misattributed parks (proofs in Parked):** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon, that_is_a_mimic/drinkfountain, poly_obj, disclose/list_vanquished, dopush.
- **2026-09-14/15 STALE-DUPE/DEAD-ARM parks (per-park proofs+falsifiers in Parked; all `verify` 0 blocked → NO MOVEMENT):** test_move, arti_cost D-1719, m_initweap D-0472, mextra-trio D-1598, make_sick Unaware, dodrink D-2031, make_corpse D-1794, vpline D-1807, mkcavearea D-0960, dig_up_grave review-26, furniture_handled D-0954, use_bell D-1028, ignite_items/catch_lit D-0978, getcad-trio, kick_object D-0989, costly_gold/donate_gold D-0991, use_unicorn_horn D-1030, use_towel D-1009, use_tinning_kit D-1027, costly_tin/use_tin_opener D-0940, flip_through_book/flip_coin D-1024, use_candle/use_candelabrum D-1025, use_figurine D-1029, use_crystal_ball D-1010, potionhit C-commented-arms, gd_sound, dosounds, dopay, use_stone, kick_nondoor SDOOR+helpers/throne+tree, resists_ston DEAD-ARM. Falsifier for any: fresh `verify <fn>` showing a session blocked with it as owner.

## Don't re-check (≤15)

- D-1790…D-2334 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 are D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2334.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, or makemon→hack/artifact/minion. No re-port D-1682…D-2334.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2334: `js/mklev.js` only, zero new module edges (`imports.mjs --can` ALREADY ×2: `deltrap` joins the existing trap.js import, `engr_at`/`del_engr` join the  Named: shared-`deltrap` Sokoban PIT/HOLE `maybe_finish_sokoban` sub-arm (`trap.c`; callee not liv
- D-2333: `js/wield.js` only. Named: untwoweapon side effects beyond basic clear (pre-existing).
- D-2332: `js/pray.js` only, zero new module edges (`imports.mjs --can` ALREADY ×2: `losexp` joins the existing exper.js import, `hcolor` joins the existing do_ Named: SetVoice pitch (audio only, no screen/RNG surface).
- D-2331: `js/apply.js` only, zero new module edges (all five names join existing static imports — `imports.mjs --can` ALREADY ×5: `freeinv`/invent.js, `unsplit Named: none new — the `hatch_egg` timeout callback stays its own function/row (D-1021 deferral); 
- D-2330: `js/trap.js` only, zero new imports (file-local `closed_door` :707 is the C predicate — IS_DOOR + D_CLOSED|D_LOCKED; `cansee`/`set_msg_xy`/`recalc_blo Named: none new — STWALL/TREE `Thump!` + `wake_nearto(x2, y2, 16)` stays named (own future row); 
- D-2329: `js/ball.js` gains exported async `drop_ball(x,y)` in C arm order — Blind `bc_order`+`bglyph` snapshot; `x != ux || y != uy` gate; utrap yank for ever Named: none new — `litter` hitfloor/shop/impact + `unpunish` stay deferred (turns.md:732 line now
- D-2328: `js/steed.js` only, no new static module edges: `poly_when_stoned` joins the existing `monsters.js` import and `Mgender` joins the existing `do_name.j Named: none new — `update_mon_extrinsics` and poly `body_part(HAND)` phrasing stay named (D-1008)
- D-2327: clone deleted; `js/dig.js` imports the shared C-order `surface` from `js/sit.js` (D-2008 home: SURFACE_AT/`db_under_typ`, air-bubble, pool, ice, lava, Named: none new — shared surface's swallow maw/husk arm stays named (D-2008; digests/enfolds live
- D-2326: `js/invent.js` only, no new module edges (`objectNames` already imported; `AD_COLD`/`AD_FIRE` file-local monattk.h block; `game.u.uarmc` ≡ C `uarmc`): Named: none new — the "deferred" comment retires in this commit; `adtyp_to_prop` stays the enl-su
- D-2325: `js/trap.js` — erode_obj rewritten arm-for-arm in C order: victim (carried_obj→youmonst / OBJ_MINVENT ocarry / null) + uvictim/vismon (local canseemon Named: none new — the data.md:1078 erode_obj omit line retires in this commit; zap.js:166/211 inv
- D-2324: `js/mkobj.js` — mergable rewritten in C order: unpaid/spe/no_charge/obroken/otrapped/lamplit block; FOOD arm kept (JS `orotten` is separate storage vs Named: obj-worn combine guard stays (D-2207; merged setworn fixup unported); C `#if 0` bypass non
- D-2323: `js/dig.js` only. Named: `spot_checks` tail (no JS counterpart anywhere in `js/` — new-function scope, pre-existing
- D-2322: `js/dig.js` only, no new static module edges (`is_whirly` + `G_UNIQ` join the existing `monsters.js` import; `STOMACH` joins the existing `const.js` i Named: none new — the `zap_dig` docstring omit retired to Hallucination draft only.
- D-2321: `js/dig.js` only, no new module edges (all four added names join existing static imports — `imports.mjs --can` ALREADY for each: `s_suffix` joins the  Named: swallowed pierce (`u.uswallow` early-return; next Open row, untouched); `nhUse(digdepth)` 
- D-2320: `js/dokick.js` only, no new module edges (`is_giant` joins the existing `monsters.js` import — `imports.mjs --can` ALREADY; `Soundeffect` joins the ex Named: `vision_recalc(1)` after each success arm (JS-only display refresh, pre-existing, untouche
<!-- landmarks:end -->
