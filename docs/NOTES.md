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

- D-1790…D-2659 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2659.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2659.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2659: restarted the export in C order with per-arm ``:line`` cites — single if/else-if/else with one tail return; corpse reads the ``mons[]`` table direct ( Named: non-corpse/non-else ``oc_nutrition`` still via the ``FOOD_NUTRITION`` name map (extractor 
- D-2658: new exported ``magic_negation(mon)`` (``js/mhitm.js:2412``) in C order with per-arm ``:line`` cites — null (JS hero-defender idiom) or ``game.youmonst Named: none — D-1405 mon-arm omits (amulet/protects/cleric·minion) retired by this port; C ``&mon
- D-2657: hoisted negated above hitmsg in C order with ``|| !!mtmp.mspec_used``; ``You("aren't transformed.")`` via same-module display.js import (output-identi Named: none new — every callee live (``mhitm_mgc_atk_negated`` js/mhitm.js:2454, ``mon_poly`` :59
- D-2656: ported the missing arm in C order with per-arm ``:line`` cites — ``otmp = null`` ``:1862``; parent/child oid gate on live ``game.context.objsplit`` (` Named: none new — the old "objsplit unsplit" omit is retired by this port; ``addinv_before`` stay
- D-2655: restarted the export in C order with per-arm ``:line`` cites — letters ``:773`` up front (null guard stays first, JS-only, C takes NONNULLARG12); exac Named: dogfood CORPSE ``polyfood`` (``mon->mtame > 1`` arm ``:1075``), rider/petrify tails (pre-e
- D-2654: exported ``async check_contained`` in C order with per-arm ``:line`` cites — ``Has_contents`` joins the const.js import (same-module edge, live const. Named: ``objlist_sanity`` (mkobj.c:3032) + ``mon_obj_sanity`` (mkobj.c:3204) caller wiring (unpor
- D-2653: new C-home `js/date.js` in C order with per-arm `:line` cites — file-local `extract_field` (`:44–49`), `case_insensitive_comp`, `md_ignored_features`  Named: `free_nomakedefs` (date.c:134–173 remainder; release_runtime_info:871); `make_version` (md
- D-2652: new C-home ``js/earlyarg.js`` (Constitution §3.1 1:1) in C order with per-arm ``:line`` cites — exported ``async scores_only(argc, argv, dir)`` (async Named: ``config_error_done`` (cfgfiles.c:1592 flush — JS config_error_add is a sink js/botl.js:11
- D-2651: C-home ``js/options.js`` in C order with per-arm ``:line`` cites — exported ``shared_menu_optfn`` (do_init no-op, do_set resolve-then-delegate, get_va Named: ``config_error_add`` sink (+4 sites: both ``illegal_menu_cmd_key`` arms, ``bad_negation`` 
- D-2650: new exports in C-home ``js/topten.js`` in C order with per-arm ``:line`` cites — ``writexlentry(tt, how)`` returns the full tab-separated line (C FILE Named: FILE*/fopen/lock append plumbing (no xlogfile VFS consumer — D-2585 arm stands); ``alloc``
- D-2649: new exports ``parse_status_hl2(s, from_configfile)`` + ``parse_status_hl1(op, from_configfile)`` in C-home ``js/botl.js`` in C order with per-arm ``:l Named: ``config_error_add`` sink (options.c; bad_negation precedent — FALSE propagation kept at a
- D-2648: restarted as exported ``readentry(line)`` in C order with per-arm ``:line`` cites — 13-field fscanf regex (``:238–245``), SCANBUFSZ remainder cut (``: Named: ``discardexcess`` (topten.c:207 — FILE-streaming only; a VFS line carries no excess past i
- D-2647: in C order with per-arm ``:line`` cites — ``PARANOID_CONFIRM``/``PARANOID_AUTOALL`` joined the existing ``./const.js`` import (same module, no new edg Named: menu_loot ``query_loot_category`` ParanoidAutoAll + unpaid/billed + WORN_TYPES + venom (pr
- D-2646: three arms inserted in C order between special_subjs and one_off-reverse with per-arm ``:line`` cites (craft ``:2732`` via in-file ``eqCI`` tail; slic Named: ``makesingular`` pronoun they/them/their→it block (``:3053–3068``, pre-existing); ia→ium b
- D-2645: new unpacked bindings in C-home ``js/mklev.js`` in C order with per-arm ``:line`` cites (mirroring ``l_create_object``): file-local ``get_table_align_ Named: ``lspo_altar`` + ``lspo_monster`` Lua argc dispatch (no Lua layer; callers pass unpacked);
<!-- landmarks:end -->
