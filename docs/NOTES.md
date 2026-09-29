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

- D-1790…D-3094 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only — do not read 12/12 as the 648/953 fortress.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3094.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3094.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3094: - `pfxfn_cond_`: new export in C order before pfxfn_font — do_init → condopt(0,null,0); do_set → parse_cond_option + full switch (0 marks opt_set_in_c Named: - `pfxfn_cond_`: do_handler `:5032` `(void) cond_menu()` — async in JS, arm unreachable in
- D-3093: - `mhitm_ad_ssex`: new export in C order right after mhitm_ad_sedu — is_youmonst(magr) → sedu + done-check; is_youmonst(mdef) → SYSOPT_SEDUCE gate wit Named: - `mhitm_ad_ssex`: none in-body — whole body, every callee live (mhitm_ad_sedu, could_sedu
- D-3092: - `wiz_show_vision`: new EXT_CMDS row — wiz:true, autocomplete:true, lazy `import('./wizcmds.js')` → wiz_show_vision() (D-2779 sibling pattern; dynami Named: - `wiz_show_vision`: none — runner-only change; body unchanged since D-3085 ACCEPT.
- D-3091: - `wiz_custom`: new EXT_CMDS row — wiz:true, autocomplete:false, lazy `import('./wizcmds.js')` → wiz_custom() (D-2779 sibling pattern; dynamic import, Named: - `wiz_custom`: none — runner-only change; body unchanged since D-3089 ACCEPT.
- D-3090: - `lose_weapon_skill`: new sync export in C order — free-slots-first, record pop, P_SKILL-- via setter, slots_required-1 refund, panic ≡ loud throw (i Named: - `lose_weapon_skill`: none in-body — whole body, every callee live (slots_required, P_SKI
- D-3089: - `wiz_custom`: new async export in C order — sibling wizard gate, cache fill, raw-array win (create/start), verbatim heading, bufa (`#wizcustom: colo Named: - `wiz_custom`: none in-body — whole body, every callee live or house-mapped (menu verbs →
- D-3088: - `dump_enums`: new file-local in C order — 11 `edmp` tables via exported `dump_enums_tables()` assembler (monsdump from live monsterNames slice(3) +  Named: - `dump_enums`: `raw_print` `:797–798`,`:800` stdout sink (no pre-window channel in dual-r
- D-3087: - `doborn`: new async export in C order — fmt closure (`%4i %4i %c %-30s` via padStart/padEnd), header, LOW_PM..NUMMONS census over game.mvitals (born Named: - `doborn`: none in-body — whole body, every callee live or const (show_text_pages, pmname
- D-3086: - `cmdq_print`: new async export in C order — queue via cmdq_qname, CQ header, full 5-arm switch + default; KEY code from string-or-number node key in Named: - `cmdq_print`: none in-body — whole body, every callee live (pline, key2txt); 0 callers b
- D-3085: - `wiz_mon_diff`: new async export in C order — title const, NUMMONS-bounded walk with verbatim `!mlet` sentinel break (C's table carries the sentinel Named: - `wiz_mon_diff`: none in-body — whole body, every callee live (mstrength; putstr/display/
- D-3084: - `mimic_hit_msg`: restarted whole in C order — `ap = mappearance` first (`:5779`), full 4-case M_AP_TYPE switch (`:5781–5792`, no-ops verbatim), otyp Named: - `mimic_hit_msg`: none in-body — whole body, every callee live (pline_mon, The, simple_ty
- D-3083: - `create_particular_creation`: restarted whole in C order — firstchoice/NON_PM + cant_revive named gate (`:3261–3273`), per-iteration `mkclass(d.monc Named: - `create_particular_creation`: none in-body — whole body, every callee live (mkclass, rnd
- D-3082: - `get_uchars`: named the omit in the doc comment (windowed input boundary; game build blocks in tty_wait_synch; the config parser stays sync — parsea Named: - `get_uchars`: wait_synch `:433` (windowed input boundary; game build blocks in tty_wait_
- D-3081: - `get_uchars`: new file-local in C order — separator flush with modlist zero-skip (`:398–404`), count==size/end return (`:406`), digit accumulate (`: Named: - `get_uchars`: none — whole body; `wait_synch()` is an empty macro here, not an omission.
- D-3080: - `sf_log`: new export in C order — fplog read (`:379`), TURN_OFF_LOGGING gate (`:381`, new js/const.js const from sfbase.c:15), WRITING→rcount/wcount Named: - `sf_log`: `:385–398` fprintf + `:402` fflush (Rule #2, no fs log; viable_nhfile preceden
<!-- landmarks:end -->
