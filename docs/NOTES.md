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

- D-1790…D-2511 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2511.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2511.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2511: `js/uhitm.js` — `AD_HEAL = 27` const (monattk.h:69) + `mhitm_ad_heal` word on the live mhitm edge + `defended` word on the live mondata edge (`imports Named: none in these two bodies — every arm of both functions is now live.
- D-2510: `js/hack.js` — restarted `domove_swap_with_pet` in C order with `:line` cites: `:2101–2105` guard + boulder capture; `:2107–2114` park/seemimic via li Named: C `:2147` `assert(trap != NULL)` — implied by `mtrapped` (cleared `:2116–2118` when `!trap
- D-2509: `js/insight.js` only (same-edge import word `impossible` on the live display edge — `imports.mjs --can` ALREADY, no new edge) — restarted `record_achi Named: C `spell.c:292` ACH_INVK (deadbook invocation-ritual success path — no `arti1_primed` ritu
- D-2508: `js/pager.js` — restarted `look_all` in C order with `:line` cites: `:1989` region, `:1992–1993` buf init + `glyph_at`, `:1994–2004` do_mons monster b Named: compass-full coord text (local `coord_desc` `(here)` deferral, pre-existing — header split
- D-2507: `js/mthrowu.js` — restarted `ohitmon` in C order with `:line` cites: `:334–339` notonhead/ismimic/vis/observe; `:341–349` tmp +marcher level +`MON_WEP Named: mon_notices unfreeze in same-file `omon_adj` (pre-existing local deferral, untouched); `#i
- D-2506: `js/options.js` only (same-edge import words: hacklib `strNsubst`, display `tty_wait_synch`, invent `select_menu_pick_none`, terminal C CLR_* + `NO_CO Named: `config_error_add` + `regex_error_desc` (msgtype_add precedent); native `create_nhwindow`/
- D-2505: `js/do_wear.js` — restarted `Amulet_on` as the C-order switch with `:line` cites: `:972–977` no-op group; `:978–995` breathing (W_AMUL masked out for  Named: `livelog_newform` (log-only, no live helper — map); `Flying_dw` uprops gap (reads u.* mirr
- D-2504: `js/teleport.js` only, no new module edges — new `export async function rloc_to_core(mtmp, x, y, rlocflags)` composing the live helpers in C order (sa Named: `u_on_newpos` inlined (ux/uy/uundetected/steed; `see_nearby_objects` correctly skipped — u
- D-2503: restarted `precheck` in C order with `:line` cites. Named: none in the ported body — every C arm is live. (Pre-existing file-local `m_useup`/`objdesc
- D-2502: restarted `trapeffect_web` in C order. Named: none in the ported body — every C arm is live. (Pre-existing deferrals elsewhere untouched
- D-2501: `js/ball.js` — new module-local `check_restriction` (literal `:181–189` mirror; `game.bcrestriction` holds the C static, init 0; override -1 per `hack Named: `panic("movebubbles: cons != null")` → `impossible` (no live JS panic export); BREADCRUMBS
- D-2500: `js/read.js` only, no new module edges (`imports.mjs --can` ALREADY on all five): `You`/`Your` (display), `Tobjnam` (objnam), `useup as useup_live` (i Named: local `useup` clone (`js/read.js`, used by other read fns) and `Yname2_read` (`wand_explod
- D-2499: `js/mon.js` — new `export async function meatbox` in C order (`:1356` cube-engulf test, `:1363–1367` spill pline, `:1368–1379` head-first unwrap with  Named: none in the ported body — every C arm is live. (`meatbox` sole C caller is `m_consume_obj`
- D-2498: new `js/botl.js` (~470 L) in C order with `:line` cites — `initblstats[]` (27 rows verbatim), `init_blstats` (dual buffers on `game.gb`, zeroed unions Named: `status_update` windowport dispatch (`winprocs.h:186`); `get_hilite :2364` + `hilite_reset
- D-2497: `js/objnam.js` — `doname` → `doname_base(obj, flags)` (existing body kept, arms in C order) + `DONAME_*` exports + `doname_vague_quan` wrapper; overri Named: obuf/xnamep/eos/Concat/strprepend/releaseobuf/sitoa + `doname_full`/paniclog overflow (D-2
<!-- landmarks:end -->
