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

- **2026-09-16 process take (measured):** 126/362 non-audit iterations
  2026-09-09..15 were parks; 109/161 parked rows were stale copies from
  `data.md`/`debt.md`/TOP30. Superseded by the breadth phase (parks closed;
  rows come from `port-coverage.mjs --rows`, measured at enqueue).
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

- D-1790…D-2545 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2545.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2545.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2545: `js/readobjnam.js` — restarted as file-local `readobjnam_preparse` (mirrors staticfn) in C order with `:line` cites: split moist/wet branches keep C c Named: readobjnam-body applications of the newly parsed fields (future readobjnam/postparse rows,
- D-2544: `js/options.js` — ported the whole body in C order with `:line` cites; `strbuf_init/append/reserve/empty` (`:3083–3115`, plain-string booking, NULL-em Named: `get_option_value` + allopt table [2/7]; `all_options_conds` (+opt_next_cond) [3/7]; `get_
- D-2543: `js/objnam.js` — restarted `init_CapMons` in C order: `:833` embed-as-opened-file (`bogonfile` null when the embed is missing, guarding the `:871`/`:9 Named: `free_CapMons` caller save.c freedynamicdata `:1129` (save-freeing teardown, no JS counter
- D-2542: `js/mhitm.js` — new exported `mhitm_ad_elec` (`js/mhitm.js:878`) in C order: `:2688–2703` uhitm arm new (negate gate, `!Blind_slee()` file-local youpr Named: none in this body — every arm and callee is live or ported in this commit.
- D-2541: `js/mhitm.js` — restarted + exported `mhitm_ad_ston` in C order: `:4209–4214` uhitm arm new (live `munstone` + `minstapetrify`, damage=0); mhitu early-return to `mhitm_ad_ston_u`; mhitm arm kept — `js/uhitm.js` AD_STON row. Named: none in this body.
- D-2540: `js/mhitm.js` — restarted + exported `mhitm_ad_blnd` in C order: `:2964–2975` uhitm arm new (live `can_blnd` gate on the existing mhitm.js→uhitm.js ed Named: mhitu `:2982–2983` `Your1(vision_clears)` (Eyes of the Overworld; no Your1/vision_clears s
- D-2539: `js/version.js` — exported `what_datamodel_is_this` in C order (`:1006` loop starts at C row 1; DATAMODEL_TABLE holds exactly C rows 1–4 with live siz Named: Sfi_char/Sfi_uchar/Sfi_version_info byte feed (`:771`/`:779–781`/`:725`/`:735`, sfbase.c:3
- D-2538: `js/save.js` — restarted `set_savefile_name(regularize_it)` in C order with `:line` cites: `:1030–1034` VMS arm named compiled out; `:1036–1053` WIN32 Named: `getuid()` uid digits (`:1055` — Rule #2, no POSIX identity in dual-runtime ESM; single-us
- D-2537: `js/mthrowu.js` — restarted `thrwmu_body` in C order with `:line` cites: `:1186–1191` wield-gate; `:1194–1196` `select_rwep`; `:1198–1240` polearm arm Named: none in this body — every arm and callee is live, file-local, or imported above.
- D-2536: `js/dig.js` — restarted + exported `draft_message` in C order with `:line` cites: `:1513–1514` plain «an unexpected draft»; `:1515–1523` hallu «like y Named: none in this body — every arm and callee is live or file-local.
- D-2535: `js/version.js` (+366) — full family in C order with `:line` cites: opttext state (`:95–104`); `build_savebones_compat_string` (`:392–415`, VERSION_CO Named: `eos` (pointer-arithmetic helper — folded into `+=`, C hacklib.c:192); `make_version`/`pop
- D-2534: `js/getpos.js` — exported async `getpos_menu` (`js/getpos.js:944`) in C order with `:line` cites: `:677` same-file gather_locs; `:679–685` count<2 → ` Named: C window layer has no JS counterpart (select_menu_pick_one is the established PICK_ONE map
- D-2533: `js/mkobj.js` — restarted + exported `merged` (`js/mkobj.js:2549`) in C order with `:line` cites: `:826–831` age average (lamplit/globby skip); `:833– Named: `#if 0` mcarried worn arm (`:906–912`, compiled out); mergable() worn-`obj` gate stays (D-
- D-2532: `js/trap.js` — restarted `dofiretrap` in C order with `:line` cites: `:4241` shared `orig_dmg`/`num` init; `:4244–4253` steam arm with C short-circuit Named: none in this body — every arm and callee is live or file-local.
- D-2531: `js/dothrow.js` — restarted `breakobj` in C order with `:line` cites: `:2488–2491` crackable `erode_obj` + `ER_DESTROYED`-gated 1/0 return; `:2493` po Named: caller `fracture_rock` billable arm (`zap.c:5552` → `js/dig.js:1801` stays sync; `breakobj
<!-- landmarks:end -->
