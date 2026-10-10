# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Marathons (architect, 2026-10-09 — §10.19):** held-out (18/44, RNG
  41.7 %, rngSteps 92.4 %) loses RNG to early cliffs in *long* sessions the
  344-step corpus never recorded; the marathon cohort finds them (50/160,
  RNG 74.7 %). Falsifier: `hidden-proxy families` long-family RNG % rising
  ~20 iters while `leaderboard.mjs` RNG % stays ~41.7 % ⇒ fix the generator
  (diff against `seed0360`/`seed4500`/`seed0030` key streams). Falsified:
  2026-10-06 "corpus already records the cliffs" (board +40, held-out flat).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** port the value's writer, not the painter (region-heuristic owners).
- **disclose→enlightenment (measured):** Priest-92179 s100 display-stream-only (RNG 3081/3081); SYMPTOM-parked, proof in park archive.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
- **Trail stash (D-3739 latent):** JS per-level vs C arrival-clear; rings agreed — not the cause.
## Don't re-check (≤15)

- D-1790…D-3766 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3766) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3766.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3766 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3766: both lookups now via `objs[i]?.oc_name_idx ?? i` / `objs[i]?.oc_descr_idx ?? i` with an objclass.h cite; no new import. Named: none new (rnd_otyp_by_namedesc stays ported whole; migrate_orc / migrate_to_level omits un
- D-3765: gate is now `> 2 * MAX_EGG_HATCH_TIME` using the live `js/const.js:1364` export (= 200, C-exact), added to eat.js's existing const.js import (:110; AL Named: none new (fprefx otherwise whole per D-2159; the uhitm.js:1355 / dogmove.js:245 stale inli
- D-3764: gate is now `weapon.oclass === WEAPON_CLASS || is_weptool(weapon)` — the live `js/wield.js:116` export, already imported at `js/uhitm.js:53` (no new e Named: none new (thitmonst's D-2804 tmiss/miss wording + unstuck placebc omits stand; known_hitum
- D-3763: deleted the invented live-cloak arm in all 3 clones (stored HDisplaced/intrinsic/extrinsic checks kept); doc cites youprop.h + the gamestate desync wi Named: none new (nhl_gamestate's update_inventory display-refresh omit stands — screens match thr
- D-3762: `js/questpgr.js` only — three bodies verbatim from quest.lua (`cat -A`-verified: double space after «hill.»/«%H.» in Val text and synopsis; conversion Named: remaining role bodies no corpus session reaches (firsttime Cav/Mon; goal_first Hea/Mon/Rog
- D-3761: reordered the departure block to C order — check_special_room(true) → unplacebc → reset_utrap → fill_pit → set_ustuck → set_uinwater → uundetected → k Named: none new (goto_level's partial omits stand: binary NHFILE savelev/getlev by-design VFS ana
- D-3760: teleds_simple awaits the live u_on_newpos export (`./mklev.js`; imports.mjs SAFE, hoisted fn, cycle-safe); keeps the ux0/uy0 snap (C `:490–491`), news Named: teleds_simple subset vs C teleds otherwise unchanged (pre-existing, out of this divergence
- D-3759: `js/mhitm.js` mon_poly — capture `oldMndx` at entry (`oldform?.mndx ?? mdef?.mnum ?? Named: none new — mon_poly stays ported whole.
- D-3758: `js/mklev.js` — both reached copies call `await mongone(was)` at both disposals in C order with C cites (reject + `was = null`; accept after invent tr Named: (1) generic `create_object` Medusa copy (mklev.js:22724) keeps the sync splice — staticall
- D-3757: `js/makemon.js` — guard is now `!Protection_from_shape_changers() && mcham !== NON_PM` (C order, C-cited); imports the live display.js helper (module  Named: none new (makemon's remaining partial omits unchanged; m_initinv stays ported whole; JS's 
- D-3756: `js/dothrow.js` — replaced the inline loop with the C-ordered bhit call (`tethered_weapon ? Named: none new (bhit's remaining omits unchanged; throwit stays ported).
- D-3755: none (no `js/`). Named: none (distfleeck/set_apparxy bodies stand faithful; the writer is TBD by the probe — not o
- D-3754: `js/end.js` only — removed both extra `stackobj(otmp)` calls (C-cited comments); `drop_upon_death` gains `export` (C linkage is extern: the shk.c call Named: none new (give_to_nearby_mon reservoir/can_carry arms untouched — count-conserving; end.js
- D-3753: invent.js — restarted menu_identify (`:3580`) onto the live `query_objlist` (already imported, :354): buf first/next, qflags exactly C's, `n>id_limit` Named: none new. query_objlist's pre-existing omits stand (obj_to_glyph display RNG, count-prefix
- D-3752: `js/mthrowu.js` only — the wrapper saves and restores mon_moving (C's nested pattern); inside movemon it is now transparent (exactly C: TRUE throughou Named: none new. 95420's bones-remap writer stays open for the regenerated row (unchanged here, a
<!-- landmarks:end -->
