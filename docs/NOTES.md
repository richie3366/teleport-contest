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
- Audit 2167–2175 gap: D-3189/D-3190 lack per-SHA audits (counts live in CURRENT Score + journal).

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3314 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3314.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3314 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3314: none in `js/` — five by-design resolutions + one stale-complete booking, documented here and booked via Ledger (D-3312/D-3302 precedent). Named: - `cnf_line_GDBPATH`: whole body — dead in C; no scored caller.
- D-3313: ported the seven rush leaves module-local in C order (do_move_*/do_run_*/do_rush_west idiom, D-3307 precedent) + seven FUNCT_TXT identity rows in C ex Named: - `do_rush_northwest`: none in-body — whole C body live (move_funcs function-pointer colum
- D-3312: none in `js/` — six by-design resolutions, documented here and booked via Ledger (D-3302/D-3304 precedent). Named: - `sf_init`: the tables themselves — sfoprocs/sfiprocs/sfoflprocs/sfiflprocs + zero/histor
- D-3311: call same-module `reset_erinys()` inside `monst_globals_init()` (restores the memcpy's erinys effect; no-op at both wired sites, which run with clean  Named: none in-body — whole C body live (overlay clear + erinys reset ≡ memcpy).
- D-3310: `export function handler_symset()` after handler_whatis_coord (C-adjacent staticfn handlers); `mark_opt_need_redraw()` for :6326; return OPTN_OK — C o Named: - `handler_symset`: in-body `do_symset(optidx == opt_roguesymset)` — the symbols.c SYMBOLS
- D-3309: ported the flush body as a live export in C file order (after `wish_history_add`, before `wish_history_menu`); nulling the 20 ring slots is the GC `fr Named: - `wish_history_flush`: sole C caller save.c:1136 — freedynamicdata has no JS counterpart 
- D-3308: `export function monst_globals_init()` clearing the overlay (`game.pm_fixup = Object.create(null)`, commit_pm_fixup's container — drop-overlay ≡ memcp Named: none in-body — whole C body live (single memcpy ≡ overlay clear).
- D-3307: whole-body export of the head in C order (after pgetchar) + sole-caller wiring in get_ext_cmd; 8 module-local do_run_* in C order (do_move_*/do_rush_w Named: - `extcmd_initiator`: none in-body — whole C body live (`?? 0` ≡ zero-initialized field pr
- D-3306: whole-body port of the head in C order (C file order, before genl_player_setup) + four stale-complete bookings (brief-verified, D-3302 precedent). Named: - `genl_player_selection`: none in-body — whole C body live (C `exit` collapses into the b
- D-3305: no `js/` change — one stale-complete + one by-design, documented here and booked via Ledger (D-3302 precedent). Named: - `ia_addmenu`: none — whole C body live in the `add` closure (add_menu fixed-default args
- D-3304: four by-design resolutions + two stale-complete + one module-local port (C staticfn idiom, D-3293 precedent; same module as callee, no new import). Named: - `l_register_des`: the registration itself — no `lua_State`/global table exists in scored
- D-3303: whole-body port in C order as an export in js/vision.js (C file order, before vision_init); `isok` added to the existing `./const.js` import (`imports Named: - `get_viz_clear`: C caller levl_sanity_check (wizcmds.c:1443–1457) unported — no JS call 
- D-3302: none in `js/` — four by-design resolutions + one stale-complete, all documented here and booked via Ledger. Named: - `discardexcess`: the FILE* drain itself — no stream exists post-split (readentry docbloc
- D-3301: added three module-local functions in C-cite form (C staticfn idiom, D-3293 precedent); rewired all three C caller sites to the named functions. Named: none — every arm, callee (live), and C caller wired.
- D-3300: - `nextobuf`: ledger by-design — no JS symbol to add (a `return ''` stub would be dead; every C caller is ported on fresh strings). Named: - `nextobuf`: the pool itself — `obufs[NUMOBUF][BUFSZ]` rotation has no JS counterpart (im
<!-- landmarks:end -->
