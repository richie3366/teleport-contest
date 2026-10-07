# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Cliff phase (human, 2026-10-06 — Constitution §10.18):** hypothesis:
  held-out (16/44, RNG 34.8 % at rngSteps 87.7 %) is bounded by a few
  *early cliffs in long sessions* that the corpus already records —
  `next_ident` (14 sessions, 50 k RNG lost: `^G`/wish monster-name parse),
  `level_tele` (13, 38 k: `^V` arrival `--More--`), `distfleeck` (5–7,
  12–35 k), `yn_function` (25), `do_statusline2` (20) — not by missing C
  (the ledger gap is 1 function; its counts have been frozen since
  2026-10-04). Falsifier: `node scripts/leaderboard.mjs` after ~20 cliff
  iterations — board PASS/RNG rising while held-out passing/RNG % stays
  flat ⇒ the corpus stopped predicting the judge again; human revisits.
  The breadth-phase hypothesis (held-out bounded by missing C) was
  **falsified** 2026-10-06: ledger ported 4442→4516 (reclassified
  partials), measured ok/missing unchanged, held-out flat ~50 iterations.
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
- **mfndpos W2 [measure] DONE (D-3560):** turn-7 starts identical; 541 turn-7 C→(43,12) goal=(43,10) vs JS→(45,11) goal=hero(62,10); writer=`m_search_items` (43,10)-target. Port iter: fobj@(43,10) check + port arm. Recorder reverted, pristine re-record identical; probes in /tmp.
## Don't re-check (≤15)

- D-1790…D-3594 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3594.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3594 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3594: dismiss via the live `dismiss_nhw_menu()` (js/invent.js:3095; corner geom → `docorner` gbuf resend, zero display-RNG burns — sibling precedent used by Named: - `doterrain`: none — body whole, dismiss now corner-faithful.
- D-3593: none in js/ — audit only. Named: (1) the `:293` true arm `init_random(fn)` ← `set_random(sys_random_seed(), fn)` — OS entro
- D-3592: the two `DOSET_BOOL_ADDR` keys repointed to `getloc_usemenu`/`getloc_moveskip` with optlist cites (twin defect, same C block, same table, same consume Named: none in this unit — both whatis_* bindings now mirror C.
- D-3591: `js/rng.js` gains `reseed_random(fn)` with the C `:293` guard live over `game.has_strong_rngseed` (unset reads undefined ≡ decl.c FALSE; `void fn` per Named: reseed_random true arm: init_random(fn) ← set_random(sys_random_seed(), fn) — OS entropy, 
- D-3590: `js/botl.js` only. choose_behavior ported whole with C's accelerators as selectors (BL_CONDITION auto-picks with no menu); menu_add ported whole as a  Named: none new in this unit — both C bodies are whole in JS (inbuf preloads, dupstr/free, NUL tr
- D-3589: wrap the loop in set_bot_disabled(true)/restore (try/finally, C `:1859–1863` shape, sibling precedent) — paint, dismiss, and all returns run disabled  Named: none new in this arm — the `:1737` select now carries the `:1859–1863` wrapper over displa
- D-3588: `js/botl.js`: new module-local `sprintf_percent_s` (single-`%s`-conversion subset: `-` flag, width, precision, surrounding literal preserved) wired at Named: none new in this unit — the :4513 arm now implements the full single-%s width/precision su
- D-3587: `js/mklev.js` only, no new imports (same-module count_level_features). mklev re-ported whole in C order (:1582 init_mapseen → :1583 getbones gate → :1 Named: reseed_random ×4 no-op arms (by-design; deterministic build never sets has_strong_rngseed;
- D-3586: `js/options.js` only, no new imports (get_feature_notice_ver, get_current_feature_ver, config_error_add already imported). Named: (1) rc negated-suppress_alert skips silently like all sibling negateok-No arms instead of 
- D-3585: both loaders now write `game.level.flags.rndmongen = false` with the `:3812-3813` + lua cites (sibling deathdrops/noautosearch lines already correct). Named: none in this unit — the nomongen arm now mirrors C `:3812-3813` on both tut levels (the on
- D-3584: dosave0 omits `_lastinvnr` from the JSON payload (savegamestate analogue — C never writes it); try_restore_save sets `game._lastinvnr = 0` uncondition Named: none in this unit — the «never saved» design is now matched both directions (omit on save,
- D-3583: deleted the early return; no-path now falls through exactly like C's `:2724–2728`: travel1=0, domove(stale-or-zero dx,dy) (zero-step is a silent no-op Named: none new.
- D-3582: one line + cite: `mtmp.mstate = MON_FLOOR;` (C :931 via :1684), replacing the D-3577 partial clear. Named: none new in this arm — the `:1684/:931` reset is now C-identical; rloc_to's inline placeme
- D-3581: `js/mklev.js` only — both stores resolve through the live DEC-aware twin (`terrain_glyph`, already imported from display.js; same edge, no TDZ risk):  Named: none new — remembered stores keep the tty-only shape (no integer glyph id; C parity for th
- D-3580: `js/options.js` only: the 10th wizard bool row plus a live playmode value. Named: (1) `trav_debug` consumers hack.c:1431/:1492 (DEBUG travel-path display; no JS consumer — 
<!-- landmarks:end -->
