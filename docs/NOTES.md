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
- Audits 1956–2023: all ACCEPT/WITH-DEBT, no Must-fix (mtele 1972–1980; 1990–1998: 631/953; seeded 5/5; mkshop=partial); do not re-open. Env: node v20, no node:sqlite.

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

- D-1790…D-3162 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only — do not read 12/12 as the 648/953 fortress.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3162.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3162.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3162: ported all seven whole in C order over live string_for_opt/opt_atoi/allopt_name/set_optbuf CURRENTLY_SET (same module), clear_status_hilites/parse_sta Named: - `optfn_DECgraphics`: read_sym_file `:1415` + clear_symsetentry `:1417` failure arm (SYMB
- D-3161: ported both whole in C order over live string_for_opt/bad_negation/wc2_supported/opt_atoi/config_error_add (same module) + imported reset_status_hilit Named: - `optfn_statushilites`: none — whole body; STATUS_HILITES-off arms compiled out (config.h
- D-3160: restarted `could_pole_mon` in C order (entry hitm, live `mdistu`, per-line C pins, C-shaped else); impaired now calls the gated display.js `Hallucinat Named: - `could_pole_mon`: none — whole body, every callee live.
- D-3159: burden/runmode prompt rows now `{attr: ATR_INVERSE}` + `{text: ''}` (pickup.js query_objlist precedent, tty_end_menu `:2685–2689`); simple-menu cond a Named: - `handler_pickup_burden`: none — whole body + tty paint rule.
- D-3158: ported both whole in C order, unpacked-args idiom (lspo_drawbridge/gold/region precedent). mazewalk: arguments.length dispatch (triple checkintegers + Named: - `lspo_mazewalk`: lcheck_param_table (table-or-empty + object check); get_table_mapchr_op
- D-3157: ported all four whole in C order. map_mode: exact-tiles via length gate + strncmpi (hacklib has no strcmpi), prefix lengths = sizeof-name minus 1, wc_ Named: - `optfn_map_mode`: none — whole body.
- D-3156: restarted in C order — `if (!sel) return`, getbounds, bounds loop, `if (isok(x, y) && selection_getpoint(x, y, sel)) fn(x, y, arg)`; dropped the `!sel Named: - `selection_iterate`: C caller `lspo_terrain` (:5025) unwired — function MISSING in JS, o
- D-3155: tail now `await impossible("You can't write such a weird scroll!");` then `return 1000`; `cost` is `async` (C `:55` can block on --More--) with the si Named: - `cost`: none — whole body, sole callee live (`impossible`; its own omits stay on its par
- D-3154: miss arm now `return false` right after the error (hit path still `return ret`); doc line corrected to "records an error and returns FALSE (`:7670–767 Named: - `parsebindings`: none — one-arm return fix on the D-3151 whole body; every callee alread
- D-3153: restarted `nxt_unbypassed_loot` in C order — length-bounded scan from [0] (cursor deleted), null-entry break, `obj_still_on_list` (listhead nobj walk  Named: - `nxt_unbypassed_loot`: none — whole body, sole callee live (`bypass_obj` import js/picku
- D-3152: new exported `l_get_config_errors` in C order returning the drained `[{line, error}]` array (Lua-table sink adapted: no JS Lua state, D-3098 precedent Named: - `l_get_config_errors`: lua registration sink (nhlua.c:1887; no Lua state in ESM — the ex
- D-3151: restarted `parsebindings` in C order — separator scan with `\\,`/`','` skip, tail-first recursion with ret aggregation, first-colon split (missing col Named: - `parsebindings`: none missing — every arm ported; the outMap overlay (pre-existing D-089
- D-3150: extended scripts/extract-seffects.py to emit `se_mappings_init` (198 rows: index 0 `{ seid: 0, '' }` per `:1972`, entries 1..197 in enum order) and re Named: - `get_sound_effect_filename`: none — whole body (the `:2043–2059` `#if 0` Strcat block is
- D-3149: new `dosuspend_core`/`dosh_core` in C order over live `getnow`/`timet_delta`/`game.urealtime` + new `cmdnotavail` (`:160`) + `win_can_suspend()` (fals Named: - `dosuspend_core`: `dosuspend()` (`cmd.c:5672`, `sys/share/ioctl.c:161`, SIGTSTP suspend)
- D-3148: default arm now `void impossible('Unknown spell skill, %d;', skill)` then `return ''` (fire-and-forget keeps it sync, dungeon.js correct_branch_type p Named: - `spelltypemnemonic`: none — whole body, sole callee live (impossible).
<!-- landmarks:end -->
