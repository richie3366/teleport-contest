# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Cliff phase (human, 2026-10-06 — Constitution §10.18):** hypothesis:
  held-out (16/44, RNG 34.8 % at rngSteps 87.7 %) is bounded by a few
  *early cliffs in long sessions* that the corpus already records
  (2026-10-06 tops in §10.18; ledger gap was 1 fn, frozen since 2026-10-04
  — not by missing C). Falsifier: ~20 cliff iters with board rising + held-out
  flat ⇒ corpus stopped predicting; human revisits. Breadth hypothesis
  falsified 2026-10-06 (ledger +74 reclassified partials, held-out flat
  ~50 iters).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** port the value's writer, not the painter (region-heuristic owners).
- **disclose→enlightenment (measured):** Priest-92179 s100 display-stream-only (RNG 3081/3081); SYMPTOM-parked, proof in park archive.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
## Don't re-check (≤15)

- D-1790…D-3723 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3723.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3723 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3723: js/steed.js only — the gate reads `(u.uinwater | 0)` with C cites (`:46` + youprop.h:279); D-3400 idiom, same expression as the can_ride disjunct :211 Named: none new. use_saddle whole (ledger ported D-2999/D-2328 stands).
- D-3722: js/steed.js only — the disjunct reads `(u.uinwater | 0)` with C cites (`:169–174` + youprop.h:279); D-3400 idiom, same expression as the mount_steed g Named: none new. can_ride whole (5-line C body, all arms live).
- D-3721: js/zap.js only — the pool arm reads `((game.u?.uinwater | 0) && !Is_waterlevel(uz))` with C cites (`:1765–1767` + youprop.h:279); D-3400 idiom, same e Named: none new.
- D-3720: js/zap.js only — the gate reads `(game.u?.uinwater | 0)` with C cites (`:5059–5060` + youprop.h:279); D-3400 idiom, same expression as js/zap.js:6951, Named: none new.
- D-3719: js/mthrowu.js only — the tail calls the live `obj_sheds_light` export (js/light.js:239 → obj_is_burning :208, C-exact) via the dothrow.js:2667–2668 dy Named: none new.
- D-3718: js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); all three gates call it, and the Splash gate reads the live ` Named: none new.
- D-3717: js/makemon.js only — the arm calls the live hideunder export (already imported :185; imports.mjs --can: ALREADY, no new edge), with C cites (`:1322–13 Named: none new. makemon's standing partial omissions unchanged (D-3430: m_dowear/pet audited omi
- D-3716: js/mon.js only — the disjunct reads `(!(u.uinwater | 0) || !couldsee(x, y))` with C cites (`:4746–4747` + youprop.h:279); D-3400 idiom, same expressio Named: none new.
- D-3715: js/sounds.js only — the gate reads `(u.uinwater | 0)` with C cites (`:208` + youprop.h:279); D-3400 idiom, same expression, no new edge, no import. Named: none new.
- D-3714: js/dbridge.js only — local `hero_Deaf` :363 (D-1967; same module, no new edge, no import); the gate calls it and drops the acoustics disjunct, with C  Named: none new.
- D-3713: js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); the gate calls it and drops the acoustics disjunct, with C ci Named: none new.
- D-3712: js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); the gate calls it and drops the acoustics disjunct, with C ci Named: none new.
- D-3711: js/mthrowu.js only — `hero_Deaf` imported from monmove.js (imports.mjs --can: SAFE, hoisted function, cycle-safe; new mthrowu→monmove edge); the gate  Named: none new.
- D-3710: js/dig.js only — `You_hear` joins the pre-existing hack.js import (imports.mjs --can: ALREADY, no new edge); the arm drops the raw gate and awaits `Yo Named: none new.
- D-3709: js/mhitm.js only — `hero_Deaf` already imported :151 (D-3707 noises gate; no new edge); the gate calls it with C cites (`:4530` + youprop.h:125). hero Named: none new.
<!-- landmarks:end -->
