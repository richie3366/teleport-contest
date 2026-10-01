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
- Audit 2141–2148: 3 ACCEPT, 4 ACCEPT-WITH-DEBT, 1 QUALITY-RISK; review 2145 queues exact Lua coordinate transport and roomtype validation/diagnostic closure. Ledger overlay 2149 armor message-before-mutation and nested extraction waits are fixed by D-3189; review 2145 coordinate transport is fixed by D-3190; roomtype validation/diagnostic completion is now the first Must-fix. Historical parent-based remeasures have no regressions; public 44/44. Previous 2132/2136 fixes confirmed. Ledger: armor ported, extraction/room/gas partial, famn split.

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

- D-1790…D-3193 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present: `hidden-proxy record --jobs 8` reports all sessions present (953 entries). Full scores require unfiltered `score`, after every audit verify.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3193.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3193 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3193: reader restarted on canonical get_table_str_opt (dungeon.js, already imported) with `''` emptystr default; unknown arm awaits impossible; async propag Named: - `get_table_roomtype_opt`: none.
- D-3192: restored `game.flags?.verbose !== false` in `mpickstuff` with a C-citing comment. Named: - `mpickstuff`: none added; restores the D-3176 body to the C gate.
- D-3191: restored `game.flags?.verbose !== false` in `prinv` with a C-citing comment; restored the `o &&`-class guard (`otmp &&`) in the `dispinv_with_action`  Named: - `prinv`: none added; restores the D-3186 body to the C gate.
- D-3190: the existing luaL_checkinteger_unpacked now supports exact signed-64 transport with width=64: safe values remain Numbers, unsafe values remain BigInts Named: - `get_table_xy_or_coord`: no missing helper arm.
- D-3189: restarted the whole armor body in C call order and propagated nested extraction/speed/dismount completion. Named: - `mon_break_armor`: none in this whole body or its two executable C callers.
- D-3188: restart impossible in C order, retaining its name and async signature. Named: - `impossible`: pline.c:598 paniclog and :621–631 CRASHREPORT prompt/raw_print/network sub
- D-3187: restart the three whole bodies in C order and retain names/signatures. Named: - `migrsort_cmp`: none in the whole body or executable callback wiring.
- D-3186: restarted the affected control flow in C order, retaining signatures. Named: - `doprarm`: none in the whole body or command registration.
- D-3185: restored table/arity guards, C destination integer narrowing, public room callback tables and C nesting/error order; renamed the existing coder room b Named: - lspo_room / build_room: no missing whole-body arm.
- D-3184: added the whole WIZARDS handler in C order, using the already-imported live dupstr and replacing the same sysopt strings (GC implements free). Named: - `cnf_line_WIZARDS`: end.c:1836 impossible in build_english_list_config only for a nonemp
- D-3183: added both whole C-shaped exports. Named: - `vision_init`: none in its whole body or executable caller.
- D-3182: preserve the whole existing C-ordered wrapper and add the missing noreturn propagation: return after fatal assurance, return immediately after second- Named: - `initoptions`: no new missing arm in this body or the earlyarg caller.
- D-3181: restarted new_were as one async whole body in C order. Named: - `normal_shape`: none added in the whole body or its caller wiring; its existing new_were
- D-3180: added six complete C-shaped exports and restarted handler_menu_colors in C order. Named: - `optfn_o_bind_keys`: none in this body or registered callers.
- D-3179: added the two C-shaped async exports beside the existing wrappers, using the existing live cores and restriction check without a new import. Named: - `Lift_covet_and_placebc`: none in the released-build body. ball.c:330–338 development pa
<!-- landmarks:end -->
