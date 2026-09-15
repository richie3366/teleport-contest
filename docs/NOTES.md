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
- **2026-09-14/15 STALE-DUPE/DEAD-ARM parks (per-park proofs+falsifiers in Parked; all `verify` 0 blocked → NO MOVEMENT):** test_move, arti_cost D-1719, m_initweap D-0472, mextra-trio D-1598, make_sick Unaware, dodrink D-2031, make_corpse D-1794, vpline D-1807, mkcavearea D-0960, dig_up_grave review-26, furniture_handled D-0954, use_bell D-1028, ignite_items/catch_lit D-0978, getcad-trio, kick_object D-0989, costly_gold/donate_gold D-0991, use_unicorn_horn D-1030, use_towel D-1009, use_tinning_kit D-1027, costly_tin/use_tin_opener D-0940, flip_through_book/flip_coin D-1024, use_candle/use_candelabrum D-1025, use_figurine D-1029, use_crystal_ball D-1010, potionhit C-commented-arms, gd_sound, dosounds, dopay, use_stone, kick_nondoor SDOOR+helpers/throne+tree, resists_ston DEAD-ARM, cpostfx/corpse_intrinsic/givit D-0943/D-0944/D-0945/D-0492/D-2214. Falsifier for any: fresh `verify <fn>` showing a session blocked with it as owner.

## Don't re-check (≤15)

- D-1790…D-2348 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 are D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2348.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, or makemon→hack/artifact/minion. No re-port D-1682…D-2348.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2348: `js/end.js` only: `mptrNdx = mptr?.mndx ?? mnum`, `chamNdx = ismnum(cham) ? cham : mptrNdx`, `imitator = mptrNdx !== chamNdx || mimicker` with C citat Named: none new — ghost arms stay named per D-2341.
- D-2347: `js/mhitm.js` `magic_negation_you` exported with the full C hero arm in C order (gotprot from `u.EProtection` flat mirror or `uprops[PROTECTION].extri Named: `magic_negation_mon` monster arms (amulet of guarding / `protects()` / innate high-cleric·
- D-2346: `js/apply.js` only (+22/−15, no new modules): `await check_unpaid(obj)` before `costly_alteration`; real `freeinv(obj)` (already imported); `Soundeffe Named: HOLE `goto_level` fall (+ migrate/spoteffects — dig.c own row); revive container/buried po
- D-2345: `js/pray.js` only — file-local async `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` in C order (C `staticfn` ⇒ file-local, matching `off Named: `bestow_artifact` (corpse-gift path, own row) untouched; `display_nhwindow(WIN_MESSAGE, FA
- D-2344: `js/priest.js` — exported `free_epri` (GC replaces `free()`: null the `mextra.epri` slot, then `ispriest=0` like C) and exported async `angry_priest`  Named: none new — `altar_wrath` was already live (`pray.js`, used by dokick/eat); remaining `dig(
- D-2343: `js/attrib.js` — exported `uchangealign` (1:1 with C `attrib.c`): ublessed=0 + `game.flags.botl` (pray.js-guarded idiom), CONVERT livelog `permanently Named: `angry_priest` (C priest.c:876–911) at the conversion-glow priest check — own next Open qu
- D-2342: `js/mklev.js` only, zero new module edges (`imports.mjs --can mklev.js worn.js m_dowear` → ALREADY: file already statically imports worn.js). Named: other loaders' `spo_end_moninvent m_dowear` Named-omission lines (Kni-loca/fila/filb, Mon-
- D-2341: `js/end.js` — 5 names join existing imports (no new edges: `m_monnam`, `is_vampshifter`, `strstri`, `the_unique_pm`, `BUFSZ`; all `imports.mjs --can`  Named: `done_in_by` ghost arms (no corpus reach); vampshifter-alt + mimicker sub-arms (ported, un
- D-2340: 4 js files (+61/−23), no new modules. Named: `You_see "%s %s under %s"` pline + `set_msg_xy` / `PLNMSG_HIDE_UNDER` / `last_hider` (asyn
- D-2339: `js/makemon.js` only, zero new module edges (`MM_NOCOUNTBIRTH` joins the existing const.js import; `propagate` is same-file — no new cross-module impo Named: `makemon` ptr-arm `G_GENOD` veto + wizard extinct `debugpline` (`makemon.c:1204–1212`, own
- D-2338: `js/trap.js` only, zero new module edges (`imports.mjs --can` ALREADY ×7: `fillholetyp`/`liquid_flow`/`maybe_dunk_boulders` join the existing dig.js i Named: `spot_checks(x,y,old_typ)` (C `:3218`) — no JS counterpart anywhere in `js/` (own future r
- D-2337: extractor parses A() args[12]/args[13] as `genSpe`/`giftValue` and emits them; `js/generated/artifacts_data.js` regenerated via the checked-in extract Named: pray.c `bestow_artifact` caller wiring (pray.js:2200 comment stays — own row; this port sh
- D-2336: `js/mklev.js` only, zero new module edges (all names file-local; no `imports.mjs --can` needed — no new cross-module import). Named: medusa-1/3 pre-flip pushes with manual TELE/BRANCH drains (behaviorally exact duplicates o
- D-2335: `js/mklev.js` only. Named: Kni-strt King Arthur + Mon-strt Grand Master identical `spo_end_moninvent m_dowear` patter
- D-2334: `js/mklev.js` only, zero new module edges (`imports.mjs --can` ALREADY ×2: `deltrap` joins the existing trap.js import, `engr_at`/`del_engr` join the  Named: shared-`deltrap` Sokoban PIT/HOLE `maybe_finish_sokoban` sub-arm (`trap.c`; callee not liv
<!-- landmarks:end -->
