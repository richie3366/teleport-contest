# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: re-pop only on the listed falsifier (proofs in Parked).
- **2026-09-15 stale-dupe parks** (bodies live+C-cited, 0 blocked; re-pop only on Parked falsifier): is_edible/doeat_nonfood D-0936 (residuals map-grade; doeat pre-arms own Open row); paranoid_query D-0999/D-1000; release_hold/flash_hits_mon D-0979; getobj_apply CMDQ_KEY (not a C fn; 5 re-queues + cmdq pop live; 'key' drift stays); cancel_monst D-1017 (muse cancel wand map-named); zap_over_floor D-0948 (door/SDOOR/bars shopdamage live+C-cited; Soundeffect provably no-op; 0 blocked); unturn_dead/revive D-0955 (invent+floor+container/buried/cant_revive/ghost/shop + hero_breaks/breaks + worn ABON all live+C-cited; 0 blocked).
- **R-1082 music path live** (1323): `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge reaching polyself at eval (objnam→shk); late-bind setters (`_y_monnam` idiom).

- **Presence-only (0/553):** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt/exercise, dochug/dotrap/mintrap/nh_timeout/mon_break_armor.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum; do_statusline1/2 paint-timing; slimed landing + Sick-store.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled/x_monnam, domonnoise.
- **Misattributed parks:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon, that_is_a_mimic/drinkfountain, poly_obj, disclose/list_vanquished, dopush.
- **2026-09-14/15 STALE-DUPE/DEAD-ARM parks (all `verify` 0 blocked; dropped names keep full falsifier proofs in Parked):** test_move, arti_cost, m_initweap, mextra-trio, make_sick Unaware, dodrink, make_corpse, vpline, mkcavearea, kick_object, use_towel, use_tinning_kit, costly_tin, use_stone, kick_nondoor SDOOR+helpers/throne+tree, cpostfx/corpse_intrinsic/givit, offer_too_soon/eatspecial/cprefx/use_defensive/hitmu/getdir, use_whip/grapple/pole, use_pick_axe2, use_trap, awaken_soldiers/ubuzz (D-0974; proofs in Parked).

## Don't re-check (≤15)

- D-1790…D-2359 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2359.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2359.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2359: `js/trap.js` — new exported async `trap_ice_effects(x, y, ice_is_melting)` in C order/conjuncts next to `undestroyable_trap` (C home; all callees `t_a Named: local `useupf` clone shop-bill (pre-existing `js/zap.js:845` named deferral, untouched — s
- D-2358: `js/mthrowu.js` only, no new modules, no new module edges (`IRONBARS`/`IS_SINK` join the existing `const.js` import; `otense` joins the existing `objn Named: thrwmu always_toss / polearm (pre-existing header names, untouched); `thitu` quan>1 doname
- D-2357: `js/music.js` only, no new modules, no new module edges (`defended` joins the existing `mondata.js` import and `shieldeff` joins the existing `display Named: trap.js `sleep_monst` defended/shieldeff/how>=0 arms (own trap.c row, header-named); share
- D-2356: `js/mhitu.js` — real exported async `gulp_blnd_check` in C order/conjuncts next to gulpmu (C home; `attacktype_fordmg`/`can_blnd` join the existing uh Named: use_towel `apply.c:178` gulp arm (still inline always-false + map-named at apply.js:1886; 
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
<!-- landmarks:end -->
