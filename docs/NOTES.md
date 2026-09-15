# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: re-pop only on the listed falsifier (proofs in Parked).
- **paranoid_query park (2026-09-15):** D-0999/D-1000; all arms live+C-cited (getline.js:1301/1351, apply.js:1012+, pray.js:1790+, mon.js:451/514, end.js Quit/Die/Bones); verify 0 blocked.
- **release_hold/flash_hits_mon park (2026-09-15):** D-0979; all arms live+C-cited (zap.js:2520 release_hold, apply.js:1053 break-wand, zap.js:4017/4462 bhitm/self, uhitm.js:3390 flash + :3347 gremlin); brief+verify 0 blocked.

- **Eval-order TDZ (D-2349):** no static `objnam.js`→`shk.js` edge (or anything reaching polyself at eval) — boot `_body_part` TDZ via polyself top-level `set_body_part`. Late-bind via setters (the `_y_monnam` idiom).

- **Presence-only (0/553):** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt/exercise, dochug/dotrap/mintrap/nh_timeout/mon_break_armor.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum; do_statusline1/2 paint-timing; slimed landing + Sick-store.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled/x_monnam, domonnoise.
- **Misattributed parks:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon, that_is_a_mimic/drinkfountain, poly_obj, disclose/list_vanquished, dopush.
- **2026-09-14/15 STALE-DUPE/DEAD-ARM parks (all `verify` 0 blocked):** test_move, arti_cost, m_initweap, mextra-trio, make_sick Unaware, dodrink, make_corpse, vpline, mkcavearea, dig_up_grave, furniture_handled, use_bell, ignite_items/catch_lit, getcad-trio, kick_object, costly_gold/donate_gold, use_unicorn_horn, use_towel, use_tinning_kit, costly_tin, flip_through_book/flip_coin, use_figurine, use_crystal_ball, potionhit C-commented-arms, gd_sound, dosounds, dopay, use_stone, kick_nondoor SDOOR+helpers/throne+tree, resists_ston, cpostfx/corpse_intrinsic/givit, offer_too_soon/eatspecial/cprefx/use_defensive/hitmu/getdir, do_earthquake/do_pit/DRUM, use_whip/grapple/pole, use_pick_axe2, use_trap.

## Don't re-check (≤15)

- D-1790…D-2355 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2355.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2355.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2355: `js/apply.js` only, no new modules, no new module edges (`objects` joins the existing `objects.js` import — `imports.mjs --can` ALREADY; `check_unpaid Named: candle `SetVoice(shop_keeper(*in_rooms(...)), 0, 80, 0)` (audio voice no-op, use_candle pr
- D-2354: `js/apply.js` — `impossible` joins the existing `display.js` import (`imports.mjs --can` ALREADY, no new edge); bad-bag arm awaits `impossible("bad ba Named: `tipcontainer_checks` otrapped `chest_trap`/`nomul`, recursive `tipcontainer_checks(target
- D-2353: `dodrop` (shop + non-shop arms), `doapply`, `dorub` call live `getobj` with the C word/ok/flags; deleted the three clones + six single-use letter help Named: remaining `getobj_*` clones with verb-specific shape (wield/ready hands-return mapping `wi
- D-2352: `js/pickup.js` only (+11/−4, no new modules, no new imports — `PICK_ANY` already imported): `sortflags` starts `(how === PICK_ANY) ? Named: none new.
- D-2351: `js/end.js` only (+3/−2, no new modules, no new imports): predicate `!==` → `===` with a C-cited comment (`end.c` imitator arm `!strcmp(fakenm, "vampi Named: none new — ghost arms stay named per D-2341.
- D-2350: `js/pickup.js` only, no new modules, no new module edges (`PICK_ANY` joins the existing const.js import; `is_pool`/`is_lava` were already imported fro Named: query_objlist `:1060–1062` single-worn-engulfer-item autoselect suppress (unreachable: man
- D-2349: `js/shk.js` — exported `shk_owns_prefix` (C `shk_owns` order, canonical `timeout.js` `get_obj_location(obj, 0)` via existing import, local `costly_spo Named: `Yname2_oil`/`s_suffix_apply`/`plur_quan`/`otense_stone` suffix families (use_stone/use_la
- D-2348: `js/end.js` only: `mptrNdx = mptr?.mndx ?? mnum`, `chamNdx = ismnum(cham) ? cham : mptrNdx`, `imitator = mptrNdx !== chamNdx || mimicker` with C citat Named: none new — ghost arms stay named per D-2341.
- D-2347: `js/mhitm.js` `magic_negation_you` exported with the full C hero arm in C order (gotprot from `u.EProtection` flat mirror or `uprops[PROTECTION].extri Named: `magic_negation_mon` monster arms (amulet of guarding / `protects()` / innate high-cleric·
- D-2346: `js/apply.js` only (+22/−15, no new modules): `await check_unpaid(obj)` before `costly_alteration`; real `freeinv(obj)` (already imported); `Soundeffe Named: HOLE `goto_level` fall (+ migrate/spoteffects — dig.c own row); revive container/buried po
- D-2345: `js/pray.js` only — file-local async `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` in C order (C `staticfn` ⇒ file-local, matching `off Named: `bestow_artifact` (corpse-gift path, own row) untouched; `display_nhwindow(WIN_MESSAGE, FA
- D-2344: `js/priest.js` — exported `free_epri` (GC replaces `free()`: null the `mextra.epri` slot, then `ispriest=0` like C) and exported async `angry_priest`  Named: none new — `altar_wrath` was already live (`pray.js`, used by dokick/eat); remaining `dig(
- D-2343: `js/attrib.js` — exported `uchangealign` (1:1 with C `attrib.c`): ublessed=0 + `game.flags.botl` (pray.js-guarded idiom), CONVERT livelog `permanently Named: `angry_priest` (C priest.c:876–911) at the conversion-glow priest check — own next Open qu
- D-2342: `js/mklev.js` only, zero new module edges (`imports.mjs --can mklev.js worn.js m_dowear` → ALREADY: file already statically imports worn.js). Named: other loaders' `spo_end_moninvent m_dowear` Named-omission lines (Kni-loca/fila/filb, Mon-
- D-2341: `js/end.js` — 5 names join existing imports (no new edges: `m_monnam`, `is_vampshifter`, `strstri`, `the_unique_pm`, `BUFSZ`; all `imports.mjs --can`  Named: `done_in_by` ghost arms (no corpus reach); vampshifter-alt + mimicker sub-arms (ported, un
<!-- landmarks:end -->
