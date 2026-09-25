# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  `port-coverage.mjs` MISSING/THIN count falls ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

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
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2798 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2798.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2798.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2798: Restart of `fracture_rock` in C order, async because `You` and `breakobj` can reach `--More--`. Named: `poly_obj` shop-anger bill (`zap.c:1965–1986`) stays named at `js/zap.js:5255`.
- D-2797: One exported `mhitm_ad_drst` in C order. Named: `resists_poison_mm` still omits artifact and worn poison resistance (same gap as `js/zap.j
- D-2796: Restart of `thitu` in C order. Named: `apply.c:3197–3205` is inside `#if 0` and is not a live caller.
- D-2795: Restart of `mkcorpstat` in C order. Named: `rloco` at `mkobj.c:2082` (`x == 0 && y == 0`) stays uncalled.
- D-2794: Restart of `start_timer` in C order. Named: `objnam.c:5223` wish-corpse `ZOMBIFY_MON` timer still deferred at `js/readobjnam.js:1678` 
- D-2793: Restart of `dodown` in C order. Named: `doup` still omits `set_move_cmd(DIR_UP)`, `u_rooted`, `stucksteed`, and `near_capacity() 
- D-2792: `optfn_petattr` and `handler_petattr` in C order. Named: `config_error_add` and `bad_negation` message text (existing no-op sinks).
- D-2791: `rc_do_set_role_family` sets `go.opt_initial` and `go.opt_from_file` (the `TRUE, TRUE` pair) and `duplicateOpt` from `duplicate_opt_detection` before  Named: `config_error_add` and `complain_about_duplicate` message text (existing no-op sinks).
- D-2790: Restart of `nmcpy` in C order: copy while `count < maxlen`, stop before a comma or NUL, return the bounded string (JS strings are immutable; callers a Named: `petname_optfn` (`:866`), `optfn_name` (`:2561`), `optfn_windowtype` (`:4972`), and `inito
- D-2789: restart of `basic_menu_colors` in C order with `:line` cites. Named: none on this function.
- D-2788: `optfn_disclose` and `handler_disclose` in `js/options.js` in C order with `:line` cites. Named: `config_error_add` and `bad_negation` sinks (no-op).
- D-2787: the sequence and the parser in `js/cfgfiles.js` in C order, UNIX `fopen_config_file` via `vfsReadFile`, `config_line_stmt` table with live handlers fo Named: `initoptions_init` / `initoptions_finish` (startup does not call `rcfile`).
- D-2786: the four optfns plus `parse_role_opt`, `saveoptstr`, `getoptstr`, `opt2roleopt`, `get_cnf_role_opt`, and `rolestring` in `js/options.js`, in C order w Named: `config_error_add` message text (existing no-op sink).
- D-2785: restart as `optfn_soundlib` in C order with `:line` cites. Named: `activate_chosen_soundlib` (`sounds.c:1778–1795`; already named at `allmain.c:703` — chose
- D-2784: restart as `optfn_sortvanquished` in C order with `:line` cites. Named: `config_error_add` message text (existing no-op sink).
<!-- landmarks:end -->
