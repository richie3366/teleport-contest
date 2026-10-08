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
  2026-10-04). Falsifier: ~20 cliff iters with board rising + held-out
  flat ⇒ corpus stopped predicting; human revisits. Breadth hypothesis
  falsified 2026-10-06 (ledger +74 reclassified partials, held-out flat
  ~50 iters).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired).
## Don't re-check (≤15)

- D-1790…D-3679 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 953 entries; full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3679.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3679 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
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
- D-3669: both rows → `{ obj: 'flags', … }` (D-3629 shape + `optlist.h:168` cite on the DOSET row). Named: none new. doset's pre-existing D-3457 audited omit stands (envelope unchanged — data home 
- D-3668: `js/mklev.js` only — new `themeroom_random_feature_contents` (C-order feature list, live `nhlib_shuffle`, `l_push_mkroom_table` width/height, room-rel Named: (1) standing dispatch omissions untouched: Water vault D-0690, Blocked center map+replace_
- D-3667: `js/invent.js` only — teardown branches on the in-scope `offx` (`nhw_menu_geometry`, `:8651`): offx==0 → `docrt()` (fullscreen arm, identical to befor Named: (1) erase_menu_or_text `:1098` mid-life menu clear still has no JS caller (pre-existing — 
- D-3666: none — measurement only. Named: (1) C-side `~drn2` call-site tags are stale-context junk (patch 003 macros cover only core
- D-3665: `js/invent.js` only — `end_menu_cut_str(text, cap=78)` helper (`:2728–2733` verbatim, paint-time copy: C mutates mlist but C callers only read back id Named: (1) morestr truncation `:2753–2758` (dead: C's own morestr construction bounds it; JS more
<!-- landmarks:end -->
