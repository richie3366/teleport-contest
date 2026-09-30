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
- Audit 2123–2131: 4 ACCEPT, 5 QUALITY-RISK; four Must-fix families: sysconf startup ordering, config-error sink, coordxy int16, region validation. Public 44/44; parent-baseline SHA replays show no regressions. Ledger SQL uses Node 22 (host Node 20 lacks node:sqlite).

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

- D-1790…D-3178 stand except the four Must-fix families in reviews 2126–2131. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present: `hidden-proxy record --jobs 8` reports all sessions present (953 entries). Full scores require unfiltered `score`, after every audit verify.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3178.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3178.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3178: added both whole bodies beside the existing buffer helpers, with C order, signed-int length arithmetic, NUL termination and unsigned length return. Named: - `strbuf_nl_to_crlf`: none in its whole body or caller closure.
- D-3177: added all six bodies in C order. packorder calls the existing ordering helper and changes the same numeric class array, including C's partial mutation Named: - `optfn_packorder`: none in the whole body or newly wired dispatch/menu/parser paths. cha
- D-3176: replaced the local iterator with one live async export using mon_offmap, saved successor identity and signed-16 arguments. Named: - `get_iter_mons_xy`: none in the whole body or sole caller.
- D-3175: restarted both binding bodies in C order over one l_get_lregion, one parameter-table adapter and the whole boolean/optional-boolean adapters. Named: - `lspo_teleport_region`: none in its body/loader bindings.
- D-3174: signed-16 input casts and all four offset writes; Lua 5.4.8 exact-integral/range checks with pair failures returning 0 and table failures throwing. Named: - `nhl_abs_coord`: no missing branch.
- D-3173: exported config_error_add from cfgfiles.js and re-exported it from botl.js, preserving every existing imported binding; options.js imports the real si Named: - `config_error_add`: wrapper body complete; inherited absent caller diagnostics keep the 
- D-3172: startup now uses the existing C-shaped initializer before user rc, retaining the initialized live flags/iflags/name and system role-option strings. Named: - `initoptions_init`: pre-existing sf_init :7129 (NHFILE procedure tables; JS saves JSON t
- D-3171: restarted set_playmode in C order, keeping the existing JS mode aliases coherent and recording gp.plnamelen on a granted wizard rename. Named: - `set_playmode`: none in its whole body or two direct callers.
- D-3170: restarted the body in C order: moves modulo 20 short-circuits regenerates; live healmon(mon, 1, 0); nonzero mspec_used decrement; nested digest_meal/m Named: - `mon_regen`: none in this whole body.
- D-3169: ported all 5 whole in C order (vary_msgcount/crash_urlmax precedent: REQ_/OPTN_/EMPTY_OPTSTR, string_for_opt re-derive, opt_atoi for C atoi, allopt_na Named: - `optfn_scroll_amount`: none — whole body; bad_negation is the live shared stub (own THIN
- D-3168: ported both whole in C order, unpacked-args idiom (lspo_mazewalk precedent): arguments.length dispatch, new `lua_tointeger_unpacked` (mistype → 0, nev Named: - `nhl_abs_coord`: nhl_add_table_entry_int (by-design; the table arm builds the object dir
- D-3167: ported all nine whole in C order into one `js/options.js` block (map_mode/menu_headings/symset idiom: REQ_/OPTN_/EMPTY_OPTSTR, `string_for_opt` re-der Named: none — whole bodies.
- D-3166: `js/mklev.js` — new `lspo_message(msg)` in C order (argc + string check via live in-module nhl_error, create_des_coder, null-vs-undefined append mirro Named: - `clone_region`: whole function uncompiled (by-design: #if 0 region.c:220–256 + :26–28; c
- D-3165: ported the whole body in C order as exported async js/cmd.js dotherecmdmenu (getdir/here_cmd_menu/there_cmd_menu are async in JS): BSS-{0,0} clicklook Named: none — whole body, every callee live (isok/CLICK_1/CLICK_2/ECMD_* from const.js, here_cmd_
- D-3164: added the sanctum arm in C order between the endgame and sokoban arms over the live `Is_sanctum` export (js/const.js:3294, `Lcheck(&sanctum_level)`);  Named: none — whole body, all 5 callees live (dungeon.h macros exported from const.js).
<!-- landmarks:end -->
