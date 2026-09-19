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
- **Shipped writers (detail in D-logs, do not re-check):** rloc arrivals (D-2418/2419); distfleeck mail-daemon (D-2410); mon_adjust_speed glyph (D-2421); enlightenment BoH/Unchanging (D-2422/23); collect_coords mk_bubble flips (D-2427); mfndpos can_fog door (D-2428 — both Valkyries moved past).
- **m_move cnt-j (D-2409 + D-2424 + D-2428 shipped):** goblin C5/J4 → mfndpos ALLOW_M arm; Valkyrie residuals → can_fog door writer, shipped. Falsified: mtrack, occupants.
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2521 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2521.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2521.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2521: `js/pager.js` — restarted `look_engrs` (`:2358`) in C order with `:line` cites: `:2155` region holder; `:2160` seenv gate; `:2166` engr_at (no gone-en Named: compass-full coord text (local `coord_desc` `(here)` deferral, pre-existing — same as `loo
- D-2520: `js/mkobj.js` — `OBJ_STATE_NAMES` verbatim in OBJ_* order (`:3289–3293`); exported `where_name` (`js/mkobj.js:1534`) in C order (`:3299–3308`: null →  Named: the 7 unported C caller functions (`obj_sanity_check`, `objlist_sanity`, `shop_obj_sanity`
- D-2519: `js/mklev.js` — restarted `makerooms` in C order with `:line` cites: `:369–370` inits; `:373` themes handle ⇔ `g._luathemes_loaded[dnum]` (marked once Named: lua runtime (`nhl_init`/`nhl_loadlua`/`nhl_done`/`nhl_pcall_handle`/`lua_getglobal` — room
- D-2518: `js/zap.js` — `resists_drli` returns `defended(mon, AD_DRLI)` per C `:210`; `defended` joins the existing mondata edge (`imports.mjs --can` ALREADY, n Named: split-arm homes stay split by architecture (damageum_adtyping / mhitm_adtyping_u / mdamage
- D-2517: `js/dothrow.js` — `export async function gem_accept` in C order with `:line` cites: `:2320–2321` buddy/gem gates (`sgn` module-local, minion/trap/make Named: none — every callee live (`Strcpy`/`Strcat` inline `=`/`+=`; `TRUE` → `true`; `BUFSZ` buf 
- D-2516: `js/wizcmds.js` — `LEVLTYP_NAMES` verbatim from C `cmd.c:1072–1084` (38 names + undiggable marker + padding); restarted `wiz_map_levltyp` in C order w Named: `eos`/`Sprintf`/`Strcat` (no JS export exists — inline appends); `strncmpi` (inline `/^the
- D-2515: `js/botl.js` — `conditions`/`condtests`/`terrain_descr`/`enc_stat` tables verbatim in C order with `:line` cites (+ `hu_stat`, bl-enum 0–29, `OPT_IN`/ Named: `botl_score` (`botl.c:417–437`, compiled out — `SCORE_ON_BOTL` commented out, `config.h:62
- D-2514: new `js/restore.js` — `newmextra` (`makemon.c:1064–1072`, `{ mcorpsenm: NON_PM }`), `new_mgivenname` (`do_name.c:31–47`, `free_mgivenname :50–57` inli Named: binary NHFILE `Sfi_*` reads (JSON blob presence + copy is the wire analogue — Rule #2, `le
- D-2513: `js/rumors.js` only (same-edge import words `impossible` on the live display edge + `RUMORFILE` on the live const edge — `imports.mjs --can` ALREADY b Named: `dlb_fopen`/`dlb_fclose` handles (Rule #2 embed D-0477 — buffers always present); `init_ru
- D-2512: `js/options.js` only, in C order — a_int++ moved before the skip (false cite corrected); suffix template → `` `"\\\"=..."` `` with no trailing quote ( Named: the C pick_cnt>1 arm (preselected exit + explicit pick) — the single-pick helper cannot pr
- D-2511: `js/uhitm.js` — `AD_HEAL = 27` const (monattk.h:69) + `mhitm_ad_heal` word on the live mhitm edge + `defended` word on the live mondata edge (`imports Named: none in these two bodies — every arm of both functions is now live.
- D-2510: `js/hack.js` — restarted `domove_swap_with_pet` in C order with `:line` cites: `:2101–2105` guard + boulder capture; `:2107–2114` park/seemimic via li Named: C `:2147` `assert(trap != NULL)` — implied by `mtrapped` (cleared `:2116–2118` when `!trap
- D-2509: `js/insight.js` only (same-edge import word `impossible` on the live display edge — `imports.mjs --can` ALREADY, no new edge) — restarted `record_achi Named: C `spell.c:292` ACH_INVK (deadbook invocation-ritual success path — no `arti1_primed` ritu
- D-2508: `js/pager.js` — restarted `look_all` in C order with `:line` cites: `:1989` region, `:1992–1993` buf init + `glyph_at`, `:1994–2004` do_mons monster b Named: compass-full coord text (local `coord_desc` `(here)` deferral, pre-existing — header split
- D-2507: `js/mthrowu.js` — restarted `ohitmon` in C order with `:line` cites: `:334–339` notonhead/ismimic/vis/observe; `:341–349` tmp +marcher level +`MON_WEP Named: mon_notices unfreeze in same-file `omon_adj` (pre-existing local deferral, untouched); `#i
<!-- landmarks:end -->
