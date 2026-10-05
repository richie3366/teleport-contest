# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  the ledger's declared-ported count rises (`docs/ledger/SNAPSHOTS.tsv`,
  one line per audit) ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3456 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3456.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3456 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3456: use_container ledger repair — pickup paste retired, D-3199 omits narrowed. Named: - `use_container`: *objp + containerdone update_inventory.
- D-3455: new file-local windowprocs_wincap2() (js/botl.js:1060–1070, shape mirrors options.js:1343–1349 — installed game.windowprocs.wincap2 or TTY_WINCAP2 fal Named: - `evaluate_and_notify_windowport`: none in-body — whole (caps live-read; multi-port regis
- D-3454: restore-or-retire re-verified at repair (D-3427 protocol) → retire: (a) paste names another fn — mon_break_armor's Named whole-claim, and that row is  Named: - `extract_from_minvent`: none — whole (D-2924 port; D-3189 paste retired; costly_alterati
- D-3453: installed const.js TTY_WINCAP2 (C tty bits minus the status four) after a per-bit consumer audit; the doset menu arm stays unwired (C shows the status Named: - `doset`: wc2 menu-skip arm (needs the status bits, which need windowport status delivery
- D-3452: direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `parseautocomplete`: wait_synch `:3291` (windowed input boundary; config parser stays sy
- D-3451: impossible re-audited (no JS change — vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support lines all live; p Named: none — all four switches whole (live export's null guard + _youmonst identity + impossible
- D-3450: restore-or-retire re-verified at repair (D-3427 protocol) → retire: (a) paste gone — current raw row carries no omit field (`ledger.mjs show mattackm` Named: - `mattackm`: none — whole (notice arms live js/mhitm.js:6223–6243; pasted mhitm_ad_blnd o
- D-3449: all 4 users switched to the live whole exports (resists_blnd js/mondata.js:453, audited whole D-3445/D-3447; bypass_obj js/worn.js:714; which_armor js Named: none — all four switches whole (trap/weapon/steed/mklev which_armor clones keep their own 
- D-3448: direct `ledger.mjs set` ×2 (NOT via finish-iteration). Named: - `status_initialize`: display_nhwindow(WIN_STATUS, FALSE) inside genl_status_init (window
- D-3447: all 6 users switched to live whole `resists_blnd(game.youmonst)` (js/mondata.js:453, audited whole D-3445); 4 subsets deleted (one-line live-export st Named: none — all four switches whole (zap.js:4607 resists_blnd_you subset keeps its own queued r
- D-3446: direct `ledger.mjs set` ×8 (NOT via finish-iteration), each sub-omit re-verified first (nhclose — JS gate+retval live js/files.js:791–799, close_check Named: - `nhclose`: close_check/bclose (by-design, sfstruct registry) + POSIX close (no VFS count
- D-3445: - `matattackm`: Unaware dream arm (G_UNIQ justone ? Named: - `matattackm`: none — whole (notice arms were the sole ledger omit).
- D-3444: direct `ledger.mjs set` ×1 (NOT via finish-iteration), each sub-omit re-verified first (chdirx — Rule #2, JS voids hackdir js/earlyarg.js:449 with the Named: - `opt_usage`: chdirx :379 (Rule #2, no CWD/filesystem in scored JS), dlb_init :383 (data-
- D-3443: - `mhitm_ad_blnd`: live whole can_blnd (js/uhitm.js:359; mondata.c :305–398 verified arm-by-arm incl. visor tail :422–441) at both sites; deleted both Named: - `mhitm_ad_blnd`: none — whole (uhitm/mhitm/mhitu arms all gate on live can_blnd; resists
- D-3442: direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified first (moveloop — JS moveloop calls neither (js/allmain.js:1602–1611) Named: - `moveloop`: drops moveloop_preamble(resuming) + !resuming maybe_do_tutorial() calls (hoi
<!-- landmarks:end -->
