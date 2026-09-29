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

- D-1790…D-3117 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings: `.cache/hidden/sessions` is empty (941 recipes). `hidden-proxy score` sees 12 `private-sessions` only — do not read 12/12 as the 648/953 fortress.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3117.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3117.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3117: new assure export in C order (VFS readability ≡ open `:2052` — same VFS-for-fopen precedent as fopen below; gd-gated do_deferred_showpaths(1); raw_pri Named: - `assure_syscf_file`: none in-body — whole body, every callee live (WIN32 `:2035–2038` / 
- D-3116: restarted the filter exported in C order over live callees (selection_new/getbounds/getpoint/setpoint, local match_maptyps, rn2): NULL→null, getbounds Named: - `selection_filter_mapchar`: C caller nhlsel.c:669 l_selection_filter_mapchar (Lua `selec
- D-3115: completed the body in C order over live callees: minvent walk with Has_contents→picked_container before `no_charge = 0`; `if (mtmp.isshk) set_residenc Named: - `mon_leave`: none — whole body, every callee live (picked_container, set_residency, coun
- D-3114: new `regex_error_desc` export in C order (errbuf collapses to the return — every C caller uses it only; regerror ≡ captured SyntaxError text, empty-me Named: - `add_sound_mapping`: raw_print(re_error_desc) sounds.c:1604 (no pre-window stdout channe
- D-3113: six new exports in js/report.js in C order with per-arm cites. Named: - `NH_panictrace_libc`: none — whole body; the compiled arm is `return FALSE` (`:510`).
- D-3112: `copyright_banner_line` + `get_critical_size_count` as new exports in js/files.js (C order, per-arm cites) — files.js, not version.js, because version Named: - `copyright_banner_line`: none in-body — whole body, every value live (A/B/D pins, runtim
- D-3111: js/options.js only — completed `test_regex_pattern` (`:5300`) in C order (NULL-only str gate so `""` compiles like C, `'NHregex error'` default, live  Named: - `test_regex_pattern`: regex_error_desc (sys/ port, no src/*.c body; value flows only int
- D-3110: restarted max_passive_dmg in C order (in-file completely*_mm + resists_* locals — no new clones/imports); new ranged_attk export in js/mondata.js (NAT Named: - `max_passive_dmg`: none — whole body, every callee live.
- D-3109: activate ported in C order into js/options.js next to the D-2785 soundlib family (table + assign/get/id_from_opt live there): idx `|0` (C uint32→int), Named: - `activate_chosen_soundlib`: none — whole body, panic ≡ throw; SND_LIB_* rows stay compil
- D-3108: new js/report.js — degenerate remainder in C order: live once-guard, `skip:`-arm bid "unknown" (the only reachable outcome: readlink/open/read have no Named: - `crashreport_init`: report.c:118–166 binary self-hash (HASH_BINFILE readlink `:123`, ope
- D-3107: ported both in C order into js/wizcmds.js — file-local async makemap_unmakemon (vitals-ensure mirrors makemon.js unmakemon; plain born-- with no 255-c Named: - `makemap_remove_mons`: none — whole body, every callee live (keepdogs, dmonsfree, imposs
- D-3106: ported the `:93–95` arm in C position as fire-and-forget `void impossible(...)` (sync look helper cannot await the async impossible — artifact.js:1419 Named: - `append_str`: none — whole body; impossible is fire-and-forget rather than awaited (sync
- D-3105: canonical `rounddiv` exported from js/hack.js in C order (else-if chain kept, Math.trunc renders C long/int conversion — double-exact, no `|0` wrap; y Named: - `rounddiv`: none — whole body, panic live (leaf).
- D-3104: whole-file closure ported in C order into js/earlyarg.js. Named: - `lopt`: none — every callee live (config_erradd core, eos).
- D-3103: `cmp_init_mongen_order` extracted as a file-local (C staticfn) with the `#if 0` arm cited compiled-out, wired into the init_mongen_order sort (pre-exi Named: - `check_mongen_order`: whole function — C `#if (NH_DEVEL_STATUS != NH_STATUS_RELEASED)`, 
<!-- landmarks:end -->
