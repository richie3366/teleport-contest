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

- D-1790…D-3468 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3468.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3468 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3468: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `lcheck_param_table`: none — whole (D-3175 port; D-3175 paste retired; 25/27 C sites wir
- D-3467: impossible re-audited (no JS change — recursion panic, vsnprintf chop, fuzzer panic, URGENT pline, sanity-check early return, disorder/report/support  Named: - `get_table_str_opt`: body whole (zero-arg JS callback for by-design nhl_pcall_handle); 1
- D-3466: restore-or-retire re-verified at repair (D-3427 protocol) → narrowed restore of the D-3175 Named text, sub-omit by sub-omit: (a) nhl_pcall_handle by-d Named: - `get_table_str_opt`: body whole (zero-arg JS callback stands in for by-design nhl_pcall_
- D-3465: wired the live cfgfiles.js exports in C order (imports.mjs SAFE ×3, hoisted fns, call-time use): the NULL arm calls config_error_add with the C-verbat Named: - `proc_wizkit_line`: none — whole.
- D-3464: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `options_free_window_colors`: none — whole (D-3180 port; D-3180 paste retired; no pre-pa
- D-3463: (1) rc valueless branch: new `lname === 'pauper'` arm writes both `result.flags.pauper` and `result.flags.nudist` in parse order (C-exact for every se Named: - `newgame`: reset_glyphmap(gm_newgame) (display-subsystem port, own row); NEWS display_fi
- D-3462: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `free_autopickup_exceptions`: none — whole (D-3180 port; D-3180 paste retired; no pre-pa
- D-3461: exercise tail now `void encumber_msg()` under the C gate (moves>0 + STR/CON; static invent.js import, imports.mjs SAFE — hoisted fn, call-time use, sa Named: - `exercise`: none — whole (debugpline0/3 :491 + :510–514 are `#ifdef DEBUG` compiled out 
- D-3460: retire via direct `ledger.mjs set` ×1 (NOT via finish-iteration). Named: - `map_menu_cmd`: none — whole (D-3180 port; D-3180 paste retired; no pre-paste omit to re
- D-3459: extended the existing polyself.js import (imports.mjs ALREADY — edge since :77, D-2349 safe) with rehumanize; mh<1 arm now `await rehumanize()` (C :63 Named: - `regen_hp`: none — whole.
- D-3458: restore-or-retire re-verified at repair (D-3427 protocol) → retire: (a) paste names another fn — optfn_packorder's Named whole-claim, and that row is  Named: - `oc_to_str`: none — whole (D-3177 port; D-3177 paste retired; :812 caller satisfied by s
- D-3457: js/end.js — arise (:1704) + ghost (:1735) arms now set game.in_mklev = false after makemon (C :461/:498), prev-restore locals deleted; doc names the : Named: - `savebones`: close_nhfile on the probe hit + the :622 tail close (no VFS handle — atomic
- D-3456: use_container ledger repair — pickup paste retired, D-3199 omits narrowed. Named: - `use_container`: *objp + containerdone update_inventory.
- D-3455: new file-local windowprocs_wincap2() (js/botl.js:1060–1070, shape mirrors options.js:1343–1349 — installed game.windowprocs.wincap2 or TTY_WINCAP2 fal Named: - `evaluate_and_notify_windowport`: none in-body — whole (caps live-read; multi-port regis
- D-3454: restore-or-retire re-verified at repair (D-3427 protocol) → retire: (a) paste names another fn — mon_break_armor's Named whole-claim, and that row is  Named: - `extract_from_minvent`: none — whole (D-2924 port; D-3189 paste retired; costly_alterati
<!-- landmarks:end -->
