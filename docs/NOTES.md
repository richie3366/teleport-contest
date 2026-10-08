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

- D-1790…D-3684 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3684.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3684 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3684:  Named: (1) recorder BSS-overflow defect needs human/audit fix (contest patch 006 + recorder binar
- D-3683: js/cmd.js only — the three arms now seed u.dz/dx/dy at the arm top in C order (`:1389–1391`: dz=0 planar + DIR_DX/DY), before the travel clears and th Named: none new — the three arms now carry the complete `:1389–1399` prefix in C order.
- D-3682: js/display.js only — the DARKROOMSYM arm now renders the stored glyph: `dsym === S_STONE` (Rogue) → tg blank `{ch:' ',NO_COLOR}` (NOTHING-arm shape);  Named: (1) reglyph_darkroom's non-Rogue no-color half (:1852–1853 showsyms[S_darkroom]=blank when
- D-3681: js/ only, no new imports/edges — (1) the 14 `use_color` reads → `wc_color` (polarity preserved; unset still means on, matching initval true); (2) the  Named: (1) windows.c has_color `:1399` wincap color query (use_color && WC_COLOR && has_color[]) 
- D-3680: read.js: `strange_feeling` joins the existing detect.js import (no new edge — `imports.mjs --can`: already statically imports); 3 sites renamed to liv Named: (1) live's detect-local useup stays partial (no update_inventory — pre-existing ledger-not
- D-3679: after each pline, `await flush_screen(1)` + `game.nhDisplay?.setCursor?.('Bind which key? '.length, 0)` before the blocking read — the get_count `:510 Named: none new — both pgetchar sites now carry the prompt-paint adaptation; readchar_core's thre
- D-3678: one row (`js/options.js:11408`): fruit → live `doset_compopt_get_val(optfn_fruit, 'fruit') || 'unknown'` (C `:9038` get_val + `:9043` fallback, crash_ Named: none in this unit — the fruit literal now mirrors C `:9038`.
- D-3677: js/getpos.js — the tip teardown now branches on the recorded paint geom: missing geom or offx==0 → null the geom + `await docrt()` before the kept flu Named: (1) corner teardown keeps the flush-resync cadence rather than C's docorner+no-flush — pix
- D-3676: all five sites → game.iflags.menu_overlay with wintty.c:1924–1925/optlist.h:456 cites (D-3675/D-3669 data-home class, reverse direction: the writer wa Named: (1) other DOSET/allopt-twin home splits stay unaudited per D-3675 (eight_bit_tty, extmenu,
- D-3675: js/options.js only, 3 lines (D-3669 data-home class) — the DOSET row → `key: 'wc_hilite_pet'` + optlist.h:366/flag.h:508 cite; both after-change reads Named: (1) other DOSET/allopt-twin home splits are unaudited and unreached — eight_bit_tty, extme
- D-3674: js/display.js only — new engrcorr_map_attr(gid) beside the attr family (`:495`: banked-id check vs cmap_to_glyph(S_ENGRCORR), live game.gs.showsyms co Named: (1) the `:2934` has_rogue_color first-arm (ROGUESET + IBM handling, never active on contes
- D-3673: js/display.js only — (1) `:2653` arm in C order: seed symidx from the integer glyph id via the live glyphmap_symidx (valid banked ids only; NO_GLYPH/J Named: none new in this unit — the twin's pre-existing omissions stand (glyphmap[] base copy + sy
- D-3672: `js/save.js` only — deleted the force/save/restore triplet (3 lines) and rewrote the comment with the `:571`/`:596` order cite; role_init now runs wit Named: (1) try_restore_save's remaining JSON-vs-binary saveshape gap stands (dorecover by-design 
- D-3671: `js/mklev.js` only — role-gated placement in C .lua order (between the (5,2) and (2,4) sites, so prepend order matches C): `if (game.urole?.mnum === P Named: none new.
- D-3670: none — measurement names the writer. Named: (1) otyp 474/475 → rock/boulder names inferred from the 5+5 counts + D-3618's JS probe, no
<!-- landmarks:end -->
