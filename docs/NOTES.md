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
## Don't re-check (≤15)

- D-1790…D-3558 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3558.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3558 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3558: `js/questpgr.js` only — six firsttime bodies verbatim from quest.lua (blank lines truly empty, double-space after periods per `cat -A`; conversions %H Named: Cav/Mon/Val firsttime bodies (quest.lua :720/:1388/:2713; no corpus session reaches them; 
- D-3557: GLOC_OBJS arm now `glyph_at` + live `glyph_is_object` + `objnum_to_glyph` boulder/rock exclusion, mirroring the GLOC_MONS arm; +2 names on the existin Named: (1) JS `glyph_is_object` (display.js:963) omits the C normal-piletop bank (display.h glyph
- D-3556: gate message via live `You('are too disoriented for this.')` (C `:2363`; `You` added to the existing display.js import — imports.mjs ALREADY, no new e Named: - `reveal_terrain`: none.
- D-3555: retire-stale via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `rloc_to_core`: none — all 5 D-2504 clauses retired (2 dead: u_on_newpos live :760, dog.
- D-3554: per-site des evidence this iter (Hea-strt.lua:50–61 = 12 des.door locked 24,10 + closed 26,08 + closed 27,12 + locked 28,13 + closed 35,07 + locked 35 Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3553: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `getpos`: gg.getposx/y stores (:848–849, :1144, :1160 exit zeroing) — sole C readers win
- D-3552: per-site des evidence this iter (Arc-strt.lua:60–71 = 12 des.door closed 22,07 + closed 38,07 + locked 47,08 + locked 23,10 + locked 39,10 + locked 57 Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3551: restore-compact via direct `ledger.mjs set` ×2 (NOT via finish-iteration; second set corrects the note's hand-count 220→221, D-3545 precedent). Named: - `role_menu_extra`: add_menu/add_menu_str map to menu_pick line objects (setup_*menu prot
- D-3550: per-site des evidence this iter (Pri-strt.lua:53–70 = 18 des.door locked 18,09 + locked 18,10 + closed 34,09 + closed 34,10 + closed 40,05 + closed 46 Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3549: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `readobjnam`: wizard y_n("Override glob weight limit?") override is async-only — sync ch
- D-3548: per-site des evidence this iter (Bar-loca.lua:41–50 = 10 des.door open 23,03 + open 30,08 + open 34,14 + locked 38,05 + locked 38,06 + closed 43,03 +  Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3547: restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `restmon`: binary Sfi_* reads (JSON blob analogue, Rule #2 dst-absolute); relative_time_
- D-3546: per-site des evidence this iter (Wiz-loca.lua:76–79 = 4 des.door locked 55,08 + 55,12 + 47,08 + 47,12; Wiz-goal.lua:50–65 = 16 des.door locked 19,06 + Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
- D-3545: restore-compact via direct `ledger.mjs set` ×3 (NOT via finish-iteration; first set hand-counted 292 proved 308 and clipped again at the cap — re-set  Named: - `initoptions_init`: sf_init :7129 (NHFILE, no scored analogue); choose_windows :7136 + i
- D-3544: per-site des evidence this iter (minend-1.lua:43–49 = 7 des.door locked 07,16 + 22,08 + 26,08 + 40,14 + 50,03 + 51,16 + 66,02; minend-2.lua:39 = gated Named: - `impossible`: paniclog :598 (filesystem) + CRASHREPORT :621–631 (yn prompt/raw_print/net
<!-- landmarks:end -->
