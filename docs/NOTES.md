# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: re-pop only on the listed falsifier (proofs in Parked).
- **2026-09-14/15 stale-dupe parks** (0 blocked): is_edible/doeat_nonfood, paranoid_query, release_hold/flash_hits_mon, getobj_apply, cancel_monst, zap_over_floor, unturn_dead/revive, adj_pit_checks, still_chewing, sellobj, instapetrify/barefoot-kick/bhit-DISP_FLASH (D-0995); fix_worst_trouble/toggle_stealth/fix_wall_spines/burn_away_slime (D-1011/D-0970/D-0975/D-0978); loot_in_first/explain_container_prompt, collect_obj_classes INVLET (full proofs: Parked rows at HEAD); test_move, arti_cost, m_initweap, mextra-trio, make_sick Unaware, dodrink, make_corpse, vpline, mkcavearea, kick_object, use_towel/tinning-kit/costly_tin/use_stone, kick_nondoor, cpostfx/givit, offer_too_soon/eatspecial/cprefx, use_defensive/hitmu/getdir, use_whip/grapple/pole/pick_axe2/use_trap, awaken_soldiers/ubuzz (D-0974), undead_to_corpse, can_be_hatched/restore-ability/invisibility.
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.

- **Presence-only:** mkclass_aligned/get_location, gethungry/maybe_generate/mattacku/u_calc_moveamt/exercise, dochug/dotrap/mintrap/nh_timeout/mon_break_armor.
- **in_or_out_menu park probe (2026-09-15):** C `:3396-3477` re-read arm-for-arm vs `js/pickup.js:2343-2445` — selectors/return/texts/defaults/ESC all live (D-1592 + review 553 ACCEPT-WITH-DEBT, 0 C-wrongs); `something`=="something" (`decl.c:45/150/152`); Look/stash via export; residuals `n==0`/`n>1` behaviorally dead in the nhgetch loop. brief 0 blocked; verify vacuous (green 2/2, strict ×2, cohort 7/7); live queue `--limit 30` no owner → parked STALE DUPLICATE, no js/. Falsifier: verify showing a session blocked with in_or_out_menu as owner.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum; do_statusline1/2 paint-timing; slimed landing + Sick-store.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/gcrownu/big_little_match/xkilled/x_monnam, domonnoise.
- **Misattributed parks:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon, that_is_a_mimic/drinkfountain, poly_obj, disclose/list_vanquished, dopush.
## Don't re-check (≤15)

- D-1790…D-2388 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2388.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2388.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2388: `js/pickup.js` only (+ import line): `query_classes` calls canonical `tally_BUCX(objs, here)` from `./invent.js` (`imports.mjs --can` → ALREADY, same  Named: none new — `count_unpaid` floor-head nobj note retired as already-exact (see C locus); qbu
- D-2387: `js/mhitu.js` — `gulpmu_can_blnd` gains C's `check_visor` flag (set in the CLAW arm only) + the `:388–396` tail via new file-local `visored_helmet_wor Named: `uhitm.js` exported `can_blnd` + `mhitu.js` `can_blnd_u` keep their own visor defers (othe
- D-2386: `js/hack.js` — TIP_GETPOS arm in C switch order (`await l_nhcore_call(NHCORE_GETPOS_TIP); return true`, `:1583–1587`) + `NUM_TIPS` range check; `js/do Named: `game.context.tips` is not save-persisted in JS (shared by all four tips since D-1963; C `
- D-2385: `js/weapon.js` — `use_skill` is now `async`, C order (`P_NONE`/`P_ISRESTRICTED` guards, `advance_before = can_advance(skill, false)`, `+= degree|0`, ` Named: `lose_weapon_skill`/`drain_weapon_skill` may-advance arm stays deferred (turns.md); PROJEC
- D-2384: `back_on_ground` ported arm-for-arm in C order over the shared `surface()` (sit.js D-2008) with the file-local `hero_Levitation()`/`hero_Flying()` pre Named: `surface()` uswallow maw/husk arm (stays the sit.js D-2008 note — fires only while swallow
- D-2383: both loops use the file-local `hero_inside(reg)` (no new edge, no TDZ — same-file function declaration); safety dual-writes flat + `uprops[MAGICAL_BRE Named: none new — geometric residual, blind tail and breathing dual-write all retired.
- D-2382: `js/cmd.js` — `travelmap_ensure()` (C `:1268–1269`; per-game heap on `game.travelmap`, never saved, like C) + `TRAVEL_NOPATH/STEP/STEP_UNSURE` tri-sta Named: full `test_move` TEST_MOVE/DO_MOVE modes (adjacent + GUESS no-guess arms keep the `blocksM
- D-2381: BURIEDBALL arm calls `buried_ball(cc)` (newly exported from `js/dig.js:514`, verified arm-for-arm vs C: `!u.utrap || TT_BURIEDBALL` gate, exact-spot r Named: none new in `float_up` (D-0956 float_up residuals fully retired).
- D-2380: deleted the `js/lock.js:618` local, added `import { Protection_from_shape_changers } from './were.js'` (the `:57` export reads flats + `uprops[].intri Named: none new. (`pick_lock :571` keeps its own inline predicate + `maybe_absorb_item` tail per 
- D-2379: `js/trap.js` `ceiling` ported arm-for-arm in C order (wording cross-checked against the live full `js/zap.js:2482` `ceiling_updown` that serves zap_up Named: `js/dothrow.js` toss_up `ceiling_at` clone (same partial arms; own row when a falsifier fi
- D-2378: `js/artifact.js` — defn/cary→(prop, E* flat) seven-way map written through the existing dual-write `set_spfx_extrinsic` (C E* macros ARE `uprops[].ext Named: message paths (pre-existing); `finesse_ahriman` + no-floor-drop levhack ordering incl. the
- D-2377: replaced with `await make_sick(0, null, true, SICK_ALL)` (same-file callee — no new import, no new module edge, no TDZ; matches the `curesick` precede Named: none new.
- D-2376: `js/mkobj.js` — file-local `NOT_ON_ICE/SET_ON_ICE/BURIED_UNDER_ICE` consts + `item_on_ice` (JS `get_obj_location` returns `{x,y}|null`, so the C boole Named: `insane_object` full port (object-diagnostic helper; own row when a falsifier fires); `sta
- D-2375: new exported sync `minimal_monnam(mon, ckloc)` in `js/do_name.js` (C home) in C order/conjuncts, one `nextmbuf` slot per call (`x_monnam` idiom, so th Named: wiz `migr` list caller (`wizcmds.c:1587–1599` `strsubst <0,0>` strip + MGIVENNAME + mux/mu
- D-2374: new exported async `globby_bill_fixup(obj_absorber, obj_absorbed)` in `js/shk.js` (C home; all 16 other callees already local/imported there — `next_s Named: `onbill` impossible() arms (pre-existing clone takes `_silent`; shared helper, own row); s
<!-- landmarks:end -->
