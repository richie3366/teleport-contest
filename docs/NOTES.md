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

- D-1790…D-2576 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2576.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2576.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2576: `js/pickup.js` — restarted `do_loot_cont` in C order with `:line` cites: short-circuit `unlocktool || UNTRAP` condition (`:2121–2123`); `objects_at(ox Named: none new — every arm and callee live or ported in this commit (UNTRAP mechanics inside `pi
- D-2575: `js/mhitm.js` — new exported `mhitm_ad_sedu(magr, mattk, mdef, mhm)` (`:1293`, blnd/elec precedent): uhitm arm via live `steal_it` + zero; `is_youmons Named: `mhitm_ad_ssex` remainder (SYSOPT_SEDUCE/could_seduce/doseduce mhitu body + its dispatch h
- D-2574: `js/light.js` — restarted `del_light_source` (`:114`) in C order with `:line` cites (union unwrap: raw obj/mtmp since `monst_to_any` is identity; swit Named: LSF_NEEDS_FIXUP producers (save/restore path relinks at load instead); replmon light swap 
- D-2573: `js/display.js` — new exported `raw_printf(fmt, ...args)` (sync like C) + file-local `vraw_printf(fmt, args)` (C staticfn → file-local, `bhit_skiprang Named: the caller remainder above + `raw_print` sink + `vpline_expand` width/precision strip (hit
- D-2572: `js/hacklib.js` — new exported `deepest_lev_reached(noquest)` (C order: quest-skip, ureached-0 skip, max depth) + restarted `level_difficulty(uz)` in  Named: `nhlua.c:961` Lua push (no JS lua runtime — no `js/*lua*` module exists); none other — eve
- D-2571: `js/zap.js` — new file-local async `create_polymon(obj, okind)` (C staticfn → file-local like `bhit_skiprange`) in C order with `:line` cites; `G_GENO Named: none new — every arm and callee live or ported in this commit (`recreate_pile` restack + `
- D-2570: `js/shknam.js` — restarted `shkinit` in C order with `:line` cites: `set_malign` joins the existing makemon.js import + `mon_learns_traps` joins the e Named: `#ifdef DEBUG` wizard impossible/pline/display block (`:638–655`, DEBUG undefined in produ
- D-2569: `js/mklev.js` — restarted `mkshop` in C order with `:line` cites: `wizard` const (`flags.debug`/`flags.wizard`, pick_room precedent); `ep = null` with Named: SHOPTYPE single-char dispatch (`:104–153` — env endpoint absent per the omit above; every 
- D-2568: `js/readobjnam.js` — `O_RANGES` (`:1006`, C order, indices resolved once like `ALT_SPELLINGS_RESOLVED`) + `FIRST/LAST/NUM_GLASS_GEMS` (`:1029–1031`, 9 Named: postparse3 `case 6` retry re-entry (above); single-char class code (C postparse1 `return 4
- D-2567: `js/engrave.js` — restarted `make_engr_at` in C order with `:line` cites: smem/havepristine block, replace-at (del_engr no-ops on null, matching the ` Named: newengr/engr_text_space arena (by design — JS strings need no arena; sizes kept on the rec
- D-2566: `js/options.js` — add `'travel_debug'` after `'traps'` (64 names). Named: none new — dormant optfn dispatch still unported (D-2561 named).
- D-2565: `js/pager.js` — return `str.slice(0, end)` (tail dropped, C `*p = '\0'`); kept in pager.js (sole in-tree caller is `doextversion`), now `export`ed for Named: none new — every arm live (`\r`-swallow, NULL-arm passthrough via `?? ''`).
- D-2564: `js/invent.js` — `Is_bigroom` joins the existing const.js import (ALREADY-edge, no new module); `background_dungeon_clause` gains `else if (Is_bigroom Named: SCORE_ON_BOTL arm (`:710–717`, `botl_score()` + `flags.showscore` — dead in this build, `c
- D-2563: `js/weapon.js` — restarted `select_rwep` in C order with `:line` cites: new `PWEP_NAMES` table (`:506–510`); Oselect arms as early returns (propellor  Named: `can_touch_safely` inside `oselect` (`mon.c:1957–1974`; `js/monmove.js:230` stub stays alw
- D-2562: `js/dog.js` — restarted async `mon_catchup_elapsed_time` in C order with `:line` cites: nmv<0 → loud `throw` (lev_json.js precedent — `panic` itself s Named: none — every arm and callee live or ported in this commit (`panic` loud-throw per preceden
<!-- landmarks:end -->
