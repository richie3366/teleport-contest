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

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** queue prints the differing screen row; the value's writer is the port, the painter proven faithful (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3446 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3446.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3446 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3446: direct `ledger.mjs set` ×8 (NOT via finish-iteration), each sub-omit re-verified first (nhclose — JS gate+retval live js/files.js:791–799, close_check Named: - `nhclose`: close_check/bclose (by-design, sfstruct registry) + POSIX close (no VFS count
- D-3445: - `matattackm`: Unaware dream arm (G_UNIQ justone ? Named: - `matattackm`: none — whole (notice arms were the sole ledger omit).
- D-3444: direct `ledger.mjs set` ×1 (NOT via finish-iteration), each sub-omit re-verified first (chdirx — Rule #2, JS voids hackdir js/earlyarg.js:449 with the Named: - `opt_usage`: chdirx :379 (Rule #2, no CWD/filesystem in scored JS), dlb_init :383 (data-
- D-3443: - `mhitm_ad_blnd`: live whole can_blnd (js/uhitm.js:359; mondata.c :305–398 verified arm-by-arm incl. visor tail :422–441) at both sites; deleted both Named: - `mhitm_ad_blnd`: none — whole (uhitm/mhitm/mhitu arms all gate on live can_blnd; resists
- D-3442: direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified first (moveloop — JS moveloop calls neither (js/allmain.js:1602–1611) Named: - `moveloop`: drops moveloop_preamble(resuming) + !resuming maybe_do_tutorial() calls (hoi
- D-3441: - `use_camera`: s_suffix(mon_nam)+mbodypart(STOMACH) (:815 reflect precedent; all four names already imported). Named: - `use_camera`: none — whole (zapyourself CAMERA + flash_hits_mon callee rows pre-existing
- D-3440: direct `ledger.mjs set` ×6 (NOT via finish-iteration), each sub-omit re-verified first (newgame — reset_glyphmap + get_nhuuid absent from js/, no news Named: - `newgame`: reset_glyphmap(gm_newgame) (display-subsystem port, own row); NEWS display_fi
- D-3439: - `doopen_indir`: cellGlyph snapshot/compare around mapseen+newsym (pick_lock :1421 precedent; cellGlyph hoisted fn, null-safe). Named: none — all four arms whole (deferred glyphmap id→char table is display.js show_glyph_cell'
- D-3438: direct set ×2; domove travel-upstream + u_on_newpos live; goto NHFILE/MICRO/glyphmap omits, RMPORTAL live.
- D-3437: - `litter`: deleted the 14-line subset; calls the live whole `setnotworn` (js/do.js:516; WORN_SLOTS ≡ C worn[] incl. Named: none — both fixes whole (pre-existing file-locals freeinv_ball/canletgo_silent untouched, 
- D-3436: direct `ledger.mjs set` ×1 (NOT via finish-iteration), each sub-omit re-verified still unshipped first (getposx/y — no `getposx`/`getposy` in js/getpo Named: - `getpos`: gg.getposx/getposy stores (:848–849, :1144, :1160 exit zeroing) — sole C reade
- D-3435: C-exact condition + time&&run botl sub-arm after cliparound, before the Lua callbacks (runmode normalized with RUN_LEAP default per initoptions_init ` Named: - `moveloop_core`: none — whole.
- D-3434: mv=1 setter in both walk dispatch sites + mv replay path (COLNO-ride quirk exact; termination is bump-nomul at hack.c:2848 plus the finite map — no ha Named: - `moveloop_core`: run/tport MAP redisplay every 7th multi/moves (house run-flush model — 
- D-3433: multi>0 !run replay + getpos live bindings + replay test. Named: - `moveloop_core`: run/tport MAP redisplay every 7th multi/moves (house run-flush model — 
- D-3432: wired the live cliparound export at 3 sites (imports.mjs ALREADY ×2 — both files already import display.js, no new edge; hoisted async fn, no TDZ); di Named: - `moveloop_core`: run/tport MAP redisplay every 7th multi/moves (house run-flush model); 
<!-- landmarks:end -->
