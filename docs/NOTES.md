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

- D-1790…D-3147 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only — do not read 12/12 as the 648/953 fortress.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3147.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3147.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3147: restarted `display_cinventory` in C order over live `safe_qbuf(null, 'Contents of ', ':', obj, cinv_doname, cinv_ansimpleoname, 'that')` (same-module  Named: - `display_cinventory`: none — whole body, every callee live (safe_qbuf, query_objlist, al
- D-3146: restarted `msgtype_parse_add` in C order: `if (m)` keeps the hit path, miss arm calls live `config_error_add("Unknown message type '%s'")` (`:7860`),  Named: - `handler_disclose`: n>1 keep-second pick (`:5769–5770`) folded into select_menu_pick_one
- D-3145: default arm now `void impossible('correct_branch_type: unknown branch type')` then `return BR_STAIR` in C order (live `display.js` export, already imp Named: - `correct_branch_type`: none — whole body, every callee live.
- D-3144: new module-local `next2u` (you.h:558 macro, squared dist2, no isok guard like C); new `there_cmd_menu_next2u` in C order over live exports (carrying/t Named: - `there_cmd_menu_far`: none — whole body, every callee live.
- D-3143: restarted both quest.js functions in C order over live in-file `is_quest_artifact` (C `:66–70`) + `Has_contents` (const.js); added OBJ_INVENT/OBJ_MIGR Named: - `find_quest_artifact`: none — whole body, every callee live (DEADMONSTER ≡ mhp<1 per mon
- D-3142: `js/wizcmds.js` — 7 new `export async` fns in C order (detect/load_lua/load_splua before `wiz_flip_level`, telekinesis/panic/fuzzer after it, nhuuid b Named: - `wiz_telekinesis`: none — whole body, every callee live.
- D-3141: `js/attrib.js` only — new exported async `restore_attrib` (`:752`) in C order (Wounded_legs macro inlined per the allmain/apply precedent, `u.uhs >= W Named: - `restore_attrib`: none — whole body, every callee live (in-file `acurr`; `encumber_msg` 
- D-3140: `js/do_wear.js` — `dotakeoff` gains the uskin arm in C order (`game.u.uskin`, live `pline_The` already imported, `GRAY_DRAGON_SCALES` const at `:166`, Named: - `dotakeoff`: none — whole body, every callee live (count_worn_stuff/pline_The/pline/geto
- D-3139: `js/mklev.js` only (+105, all in-file): `l_create_stairway` gains `create_des_coder()` (`:4159`) plus a comment recording that the ok_fn params are th Named: - `l_create_stairway`: Lua argc table/string parse (loaders pass unpacked dir/coord — pre-
- D-3138: ported both functions whole in C order into js/glyphs.js (C-order slot right after `glyphid_cache_status`, mirroring C :454/:458/:470); wired the opti Named: - `glyphrep`: none — whole body, every callee live (`glyphrep_to_custom_map_entries` D-300
- D-3137: `js/botl.js` — 6 new exports in C order with per-arm cites (stat pair after `exp_percent_changing` :2090; clear after `conditionbitmask2str` :3141; co Named: - `clear_status_hilites`: sole-C-caller wiring — options.c:1867 do_set negated arm (JS hil
- D-3136: `js/end.js` only — restarted `done2` in C order (In_tutorial + y_n abandon gate with || short-circuit; cancel arm with curs_on_u + two-if multi/nomul  Named: - `done2`: signal() re-arms (:101, :135); wait_synch (:105); exit_nhwindows (:140); NH_abo
- D-3135: `js/pickup.js` only — restarted `mon_beside` in C order (nx/ny + `isok && m_at`; MON_AT ≡ m_at per rm.h :515–516 live `#else`); `dotip`: verbose noun  Named: - `mon_beside`: none — whole body, every callee live (isok, m_at), sole caller wired.
- D-3134: `js/cfgfiles.js` — new module-local `vconfig_error_add(fmt, args)` in C order after `config_error_done` (same relative order as C :1621/:1875); format Named: - `vconfig_error_add`: C-caller wiring (:1870 config_error_add → botl.js:1540 no-op, estab
- D-3133: `js/mklev.js` — new module-local `get_unpacked_coord(loc, defhumidity)` + `SP_COORD_IS_RANDOM` const in C order immediately before `get_location_coord Named: - `get_unpacked_coord`: sole-C-caller wiring — JS get_location_coord takes (humidity, croo
<!-- landmarks:end -->
