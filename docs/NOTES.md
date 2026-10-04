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

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3405 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3405.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3405 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3405: use_candle runs the two-stage safe_qbuf with the live strstri strip (imports extended, no new edges); reset_eat exported + wired in moveloop; touchfoo Named: - `cpostfx`: display_nhwindow(WIN_MAP, TRUE) map flush after curs_on_u (more() approx stan
- D-3404: moverock_core leverage reads `u.Levitation || Levitation_st() || Is_airlevel(u.uz)` (in-file + const edge, both live); test_move TEST_TRAV/TRAP skips  Named: - `moverock_core`: unmap_object trap/engr arms in dopush (remembered-glyph clear stands in
- D-3403: ysimple_name/simpleonames/actualoname call the live minimal_xname export (override_ID for actualoname); pickup's 4 clones retired to the existing objn Named: - `singplur_lookup`, `oname`: prior partial omissions (unchanged this batch).
- D-3402: one arm per C site in C order. Named: `look_all`/`look_engrs`: prior partial omissions (unchanged this batch).
- D-3401: ported each manifest function whole in C order: every guarded arm, every callee imported live or named, every C caller wired to the live export (clone Named: - `replmon`: mon.c:2703 unstuck (async-only: awaits docrt on swallow release).
- D-3400: one-line flip to `(u.uinwater | 0)` + field-citing comment (youprop.h:279; never-written note) — the D-3393 newsym :5375 idiom. Named: - `feel_location`: none new — pre-existing `feel_can_reach_floor` usteed P_RIDING/ustuck/c
- D-3399: (a) `sasc_bug`: none — by-design (`__SASC` is the Amiga SAS/C compiler; pinned Linux/gcc build compiles out decl + body, cf. Named: - `sasc_bug`: none — by-design: whole function absent from the scored binary (Amiga-only `
- D-3398: none — by-design. Named: - `mkstemp`: none — by-design: the whole function is absent from the scored binary (MSVC-o
- D-3397: single-file cluster in js/u_init.js (+48/−8), each arm in C order with C citations: pauper gates in both knows_ functions (param renamed to `override_ Named: - `knows_object`: none — whole C body live (sole callee `discover_object` live).
- D-3396: new exported `nh_sfunconvert` in js/files.js in C order right after `nh_sfconvert` (`:2344–2352`), whole 1-line body `doconvert_file(filename, 0, true Named: - `nh_sfunconvert`: none — whole C body live (sole C callee `doconvert_file` live same-fil
- D-3395: (a) new exported `dummyfunction` in js/cmd.js in C order right after dosh_core (`:5681–5696`), whole 1-line body, ECMD_CANCEL already imported; (b) ge Named: - `dummyfunction`: none — whole C body live (0 C callees).
- D-3394: (a) C-order arm after newsym: `if (mtmp.isshk && !in_his_shop && inhishop(mtmp)) await check_special_room(false);` — both callees live with no new edg Named: - `move_special`: none remaining — ledger omit resolved; all 15 C callees live (pline/Monn
- D-3393: (a) new `export function fn_cmap_to_glyph` beside `cmap_to_glyph`, whole C body; (b) `newsym` gains `if (suppress_map_output()) return;` first (in-fil Named: - `fn_cmap_to_glyph`: none — whole C body live (0 C callees besides `cmap_to_glyph`).
- D-3392: (a) none — falsified with git evidence (a redundant call-site guard drafted mid-iteration was reverted; it would be constant-true). (b) `repopulate_pe Named: - `repopulate_perminvent`: none — DUMPLOG in_dumplog (`:3089–3093`) is compiled out (D-177
- D-3391: deleted the dead JS — `recover_savefile` doc+body, `sfo_int` doc+body, `sfvalue_int` doc+body (git retains the text); ledger → by-design. Named: - `recover_savefile`: none — by-design: the whole function is absent from the scored binar
<!-- landmarks:end -->
