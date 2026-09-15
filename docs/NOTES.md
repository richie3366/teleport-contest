# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: re-pop only on the listed falsifier (proofs in Parked).
- **2026-09-14/15 stale-dupe parks** (0 blocked; every item has its own Parked row with proof+falsifier — see there, not here).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.

- **Presence-only:** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt/exercise, dochug/dotrap/mintrap/nh_timeout/mon_break_armor.
- **Stale-dupe parks** (0 blocked; proofs+falsifiers in Parked rows — re-pop only if verify blocks with the named owner): hitmu TOP30-ratio, grow_up D-1920, in_or_out_menu, untrap D-1813+D-2305+D-2372, makeplural D-1923, explode D-1925.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **ggetobj/take_off/cancel_doff parked** STALE DUPLICATE (fixed, 0 blocked on all 7 family fns; D-numbers: Parked row). Falsifier: verify blocked with any family fn as owner.
- **Symptom parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum; do_statusline1/2 paint-timing; slimed landing + Sick-store.
- **STALE + misattributed parks** (proofs+falsifiers: Parked rows): lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/gcrownu/big_little_match/xkilled/x_monnam/domonnoise; vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon/that_is_a_mimic/drinkfountain/poly_obj/disclose/list_vanquished/dopush.
## Don't re-check (≤15)

- D-1790…D-2396 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2396.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2396.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2396: `js/potion.js` only — the make_sick onset, partial-cure and full-cure arms plus make_slimed/make_stoned now mirror TIMEOUT bits to `u.uprops[…].intrin Named: make_vomiting/make_stunned/make_confused flat writers share the dual-storage shape (own ro
- D-2395: `js/do_wear.js` only — new exported `wielding_corpse(obj, how, voluntary)` in exact C order (CORPSE/uarmg/wield gates; `touch_petrifies(mons(corpsenm) Named: none new.
- D-2394: `js/topten.js` only — the four arms in exact C order with `slice(0,6/8/7/13)` prefix checks (≡ the `strncmp` lens) and `t1.plgend?.[0]==='F'`, then th Named: none new; both `outentry` map omissions retired (turns.md line updated to live, this entry
- D-2393: `js/do.js` — canonical exported `async obj_no_longer_held` in exact C order (null return; `Has_contents` recursion; `(otyp|0)===CRYSKNIFE` + `!oerodep Named: sync cores `place_object` (`mkobj.c:2330`), `add_to_container` (`mkobj.c:2683`), `extract_
- D-2392: `js/mhitm.js` — exported `mhitm_ad_slow` in exact C mhitm-branch order (gate first, `|0` mspeed/MSLOW guard, oldspeed snapshot, `await mon_adjust_spee Named: `defended(mdef, AD_SLOW)` early return (`:3659–3660`, RNG-free wielded-artifact / blue-sca
- D-2391: `js/weapon.js` — canonical exported `autoreturn_weapon` (C order: null guard, `otyp('AKLYS')` compare, `{ otyp, range: AKLYS_LIM², tethered: 1 }`; `BO Named: `thrwmu` polearm arm (`mthrowu.c:1195–1240` is_pole/MON_POLE_DIST/couldsee/canseemon + msw
- D-2390: `js/vault.js` — full async `wallify_vault` in C order/branch structure (boundary-ring loops with interior `continue`; `IS_WALL || g_at || sobj_at(ROCK Named: `xy_set_wall_state` paint (mklev.js file-local, not exported — `wall_info=0` set exactly, 
- D-2389: `js/do_wear.js` — new `carrying_stoning_corpse()` (C invent walk over `game.invent`, `CORPSE` + `touch_petrifies(mons(corpsenm))`; exported: C declare Named: none new — ring-arm `gloves_simple_name` gauntlets variant, `cloak_simple_name` robe, `sur
- D-2388: `js/pickup.js` only (+ import line): `query_classes` calls canonical `tally_BUCX(objs, here)` from `./invent.js` (`imports.mjs --can` → ALREADY, same  Named: none new — `count_unpaid` floor-head nobj note retired as already-exact (see C locus); qbu
- D-2387: `js/mhitu.js` — `gulpmu_can_blnd` gains C's `check_visor` flag (set in the CLAW arm only) + the `:388–396` tail via new file-local `visored_helmet_wor Named: `uhitm.js` exported `can_blnd` + `mhitu.js` `can_blnd_u` keep their own visor defers (othe
- D-2386: `js/hack.js` — TIP_GETPOS arm in C switch order (`await l_nhcore_call(NHCORE_GETPOS_TIP); return true`, `:1583–1587`) + `NUM_TIPS` range check; `js/do Named: `game.context.tips` is not save-persisted in JS (shared by all four tips since D-1963; C `
- D-2385: `js/weapon.js` — `use_skill` is now `async`, C order (`P_NONE`/`P_ISRESTRICTED` guards, `advance_before = can_advance(skill, false)`, `+= degree|0`, ` Named: `lose_weapon_skill`/`drain_weapon_skill` may-advance arm stays deferred (turns.md); PROJEC
- D-2384: `back_on_ground` ported arm-for-arm in C order over the shared `surface()` (sit.js D-2008) with the file-local `hero_Levitation()`/`hero_Flying()` pre Named: `surface()` uswallow maw/husk arm (stays the sit.js D-2008 note — fires only while swallow
- D-2383: both loops use the file-local `hero_inside(reg)` (no new edge, no TDZ — same-file function declaration); safety dual-writes flat + `uprops[MAGICAL_BRE Named: none new — geometric residual, blind tail and breathing dual-write all retired.
- D-2382: `js/cmd.js` — `travelmap_ensure()` (C `:1268–1269`; per-game heap on `game.travelmap`, never saved, like C) + `TRAVEL_NOPATH/STEP/STEP_UNSURE` tri-sta Named: full `test_move` TEST_MOVE/DO_MOVE modes (adjacent + GUESS no-guess arms keep the `blocksM
<!-- landmarks:end -->
