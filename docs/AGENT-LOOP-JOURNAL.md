# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-02 — D-3311 `monst.c` monst_globals_init missing erinys-reset effect (review 2266 Must-fix)

**C locus:** nethack-c/upstream/src/monst.c:71–76 — `memcpy(mons, mons_init, sizeof mons)`. Second live writer of C `mons[]`: mon.c:5918–5966 `adj_erinys` (mflags1, mattk[0..2], mlevel, difficulty of mons[PM_ERINYS]; callers attrib.c:1309 + restore.c:727). Review 2266 bounded the live-writer set at {role_init, adj_erinys} (zero `data->` permonst-field writes, zero direct `mons[i].field =` writes, role.c:2109 infravision fixup inside `#if 0`).
**JS:** js/monsters.js:220–223 (one added call + doc wording); scripts/monst-globals-init.test.mjs (new focused regression test: adj_erinys(60)→init→baseline + overlay-clear arms).
**Change:** call same-module `reset_erinys()` inside `monst_globals_init()` (restores the memcpy's erinys effect; no-op at both wired sites, which run with clean erinys) and corrected the doc comment to name both channels (pm_fixup overlay + adj_erinys baseline mutations).
**Verify:** `node scripts/verify.mjs --fn monst_globals_init --full` → VERIFY: PASS — syntax (1 changed: js/monsters.js) · rule2 · hidden note (no corpus session blocked) · REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44. Plus: /tmp/erinys-init-probe.mjs PASS (was FAIL pre-fix) · `node --test scripts/monst-globals-init.test.mjs` 2/2 PASS.
**Named:** none in-body — whole C body live (overlay clear + erinys reset ≡ memcpy). `game.mvitals` deliberately untouched (genocide state is NOT part of C `mons[]`, D-3308 analysis stands).
**Next:** queue head is now `sfbase.c` sf_init (first Open missing-arm row).
## 2026-10-02 — Audit 2262–2268: review D-3303–D-3310 (6 ACCEPT + 1 QUALITY-RISK) + full score

**Scope:** 7 js-touching SHAs since 2261 (D-3302/D-3305 docs-only, skipped): get_viz_clear, sp_lev septet, genl_player_selection+4, extcmd_initiator+run×8+freeall, monst_globals_init, wish_history_flush+add, handler_symset+arms+dispatch. Every verify re-measured per-function (incl. randrole real reach 69/69).
**Finding:** 2266 QUALITY-RISK — `monst_globals_init` overlay-clear omits the memcpy's erinys-reset effect (live 2nd mons[] writer `adj_erinys` mon.c:5918–5966; JS channel is baseline-array mutation + `reset_erinys`, never called here). Latent (both sites run clean; newgame/restore already reset) → 1 Must-fix row (same-module `reset_erinys()` call + comment fix, 44/44 + probe verify). Next cluster set to it.
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `329+1.64/turn`); corpus 705/953, 0 losses/0 gains, `full: true`; held-out 15/44 (+0). Ledger: snapshot appended; seeded sample fixed 1 row (`mhitm_ad_dcay` ported→split, 3 arms verified live).
**Next:** Must-fix ships alone.
## 2026-10-02 — D-3310 `options.c` handler_symset (do_symset wrapper + both do_handler arms + doset dispatch wired)

**C locus:** nethack-c/upstream/src/options.c:6320–6328 — whole body in C order: `reslt = do_symset(optidx == opt_roguesymset)` (:6325), `go.opt_need_redraw = TRUE` (:6326), `return reslt` (:6327). Callers: options.c:3583 (optfn_roguesymset arm :3582–3584), options.c:4228 (optfn_symset arm :4223–4233, glyphid-cache wrapped). Callee: symbols.c:908–1099 do_symset (ledger by-design; all six C returns TRUE — measured `awk '/return/'` over :908–1100, function ends :1098).
**JS:** js/options.js:2389 export; :3570/:3605 roguesymset signature + arm; :3625/:3668–3676 symset signature + arm; :3528/:3531 doset_optfn_do_handler arms; :9345 simple-menu arm (was OPTN_ERR).
**Change:** `export function handler_symset()` after handler_whatis_coord (C-adjacent staticfn handlers); `mark_opt_need_redraw()` for :6326; return OPTN_OK — C optn_ok = 1 = TRUE (options.c:84) and do_symset is TRUE on every path. Wired both C caller arms (plain return; glyphid fill/free wrap via the trio already imported at js/options.js:210 — no new edge) plus both doset dispatches (C :8663–8666 simple, C :8935–8938 full — both call optfn(idx, do_handler) generically). C `:4231–4232` apply_customizations is commented out in C.
**Verify:** `node scripts/verify.mjs --fn handler_symset` → VERIFY: PASS — syntax (1 changed: js/options.js) · rule2 · hidden note (no corpus session blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** - `handler_symset`: in-body `do_symset(optidx == opt_roguesymset)` — the symbols.c SYMBOLS-file menu browser is ledger by-design (no scored analogue, no js/symbols.js); its return is deterministic TRUE on all six C paths, modeled as OPTN_OK.
**Next:** queue head is now `sfbase.c` sf_init (Open missing-arm).
## 2026-10-02 — D-3309 `zap.c` wish_history_flush (DEBUG-on ring clear + stale wish_history_add omit retired)

**C locus:** - `wish_history_flush`: nethack-c/upstream/src/zap.c:6259–6270 — whole body in C order: `for (idx = 0; idx < MAX_WISH_HISTORY; ++idx) free + NULL` (:6263–6266), `wish_history_idx = 0` (:6268). Sole C caller save.c:1136 (freedynamicdata). 0 C callees.
**JS:** - `wish_history_flush`: js/zap.js `export function wish_history_flush()` — C :6263–6266 loop nulls `game.wish_history[0..19]` (guarded on `Array.isArray`, C-equivalent when the ring was never created), C :6268 sets `game.wish_history_idx = 0` unconditionally. Probe: add×3 (1 dedup) → flush → 20 nulls + idx 0; no-array → idx 0, no throw.
**Change:** ported the flush body as a live export in C file order (after `wish_history_add`, before `wish_history_menu`); nulling the 20 ring slots is the GC `free`; index reset unconditional per C :6268. No new import (same module; `game` + `MAX_WISH_HISTORY` already in scope). Retired the stale `wish_history_add` omit via Ledger (D-3302 same-file-gap precedent).
**Verify:** `node scripts/verify.mjs --fn wish_history_flush,wish_history_add` → syntax PASS (1 changed: js/zap.js) · Rule #2 PASS · hidden note ×2 (no corpus session blocked — normal for coverage) · REACH-OK ×2 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `wish_history_flush`: sole C caller save.c:1136 — freedynamicdata has no JS counterpart (save-freeing teardown, map-named); no JS call site.
**Next:** continue the missing-arm list (`options.c` handler_symset head).
## 2026-10-02 — D-3308 `monst.c` monst_globals_init (mons baseline reset + both live callers wired)

**C locus:** nethack-c/upstream/src/monst.c:71–76 — whole body in C order: `memcpy(mons, mons_init, sizeof mons)`. Callers: allmain.c:42 (early_init), makemon.c:1841 (dump_mongen), makedefs.c:306 (build tool).
**JS:** js/monsters.js:220 (export, after commit_pm_fixup); js/jsmain.js:16 (import) + :133 (call, C-order decl→monst→sys_early); js/makemon.js:98 (import) + :883 (call, C :1841 before init_mongen_order :1842; doc omit retired, adjacent off-by-one cites corrected).
**Change:** `export function monst_globals_init()` clearing the overlay (`game.pm_fixup = Object.create(null)`, commit_pm_fixup's container — drop-overlay ≡ memcpy-to-baseline), wired at both live C caller sites in C order.
**Verify:** `node scripts/verify.mjs --fn monst_globals_init` → VERIFY: PASS — syntax (3 changed files) · rule2 · hidden note (no corpus session blocked — expected for a coverage row) · REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed).
**Named:** none in-body — whole C body live (single memcpy ≡ overlay clear). `game.mvitals` deliberately untouched: genocide state is NOT part of C `mons[]` — every G_GENOD/G_EXTINCT writer targets `svm.mvitals[].mvflags` (makemon.c:968/979/1529, mon.c:3144, read.c, timeout.c, wizcmds.c:80; `mk_gen_ok` reads both).
**Next:** queue head is now `zap.c` wish_history_flush (Open missing-arm).
## 2026-10-02 — D-3307 `cmd.c` extcmd_initiator + do_run_* family + cmdbind_freeall by-design

**C locus:** - `extcmd_initiator`: nethack-c/upstream/src/cmd.c:456–460 — `return gc.Cmd.extcmd_char`; sole caller win/tty/getline.c:310.
**JS:** - `extcmd_initiator`: js/cmd.js:971 — `export function extcmd_initiator() { return game.Cmd?.extcmd_char ?? 0; }` (C `:459`; code ≡ C char, set by reset_commands `:3475`); added to the existing `./cmd.js` import in js/getline.js:39 (`imports.mjs --can`: ALREADY, no new edge).
**Change:** whole-body export of the head in C order (after pgetchar) + sole-caller wiring in get_ext_cmd; 8 module-local do_run_* in C order (do_move_*/do_rush_west idiom) + FUNCT_TXT identity rows; cmdbind_freeall by-design (sole C caller freedynamicdata is ledger by-design save-freeing).
**Verify:** `node scripts/verify.mjs --fn extcmd_initiator,do_run_west,do_run_northwest,do_run_north,do_run_northeast,do_run_east,do_run_southeast,do_run_south,do_run_southwest,cmdbind_freeall` → syntax PASS · Rule #2 PASS · hidden note ×10 (no corpus session blocked — normal for coverage) · REACH-OK ×10 (no RNG-tagged reach; smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file per gate) → VERIFY: PASS; plus forced `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS (initiator prompt wiring).
**Named:** - `extcmd_initiator`: none in-body — whole C body live (`?? 0` ≡ zero-initialized field pre-reset_commands).
**Next:** `cmd.c` do_rush_* ×7 (same file, same shape, over the 10-cap here) + next missing-arm row.
## 2026-10-02 — D-3306 `role.c` genl_player_selection port + 4 stale-complete closure mates

**C locus:** - `genl_player_selection`: nethack-c/upstream/src/role.c:2177–2185 — `if (genl_player_setup(0)) return; nh_terminate(EXIT_SUCCESS)`; 0 references in pinned C (generic window-port entry).
**JS:** - `genl_player_selection`: js/player_selection.js:1324 — `export async function` (async: genl_player_setup is async in JS); `if (await genl_player_setup(0)) return;` (0 ≠ null → rows 0, C-exact) then `nh_terminate(EXIT_SUCCESS)`; new import `nh_terminate` from `./end.js` (`imports.mjs --can`: IN-SCC but hoisted — cycle-safe, no top-level TDZ read) + EXIT_SUCCESS added to the `./const.js` import.
**Change:** whole-body port of the head in C order (C file order, before genl_player_setup) + four stale-complete bookings (brief-verified, D-3302 precedent).
**Verify:** `node scripts/verify.mjs --fn genl_player_selection,randrole,validrace,gotrolefilter,character_race` → syntax PASS (1 changed js file: js/player_selection.js) · Rule #2 PASS · hidden note ×5 (no corpus session blocked — normal for coverage) · REACH-OK ×5 (randrole: 69 reaching sessions 69 PASS; other four: no RNG-tagged reach, smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `genl_player_selection`: none in-body — whole C body live (C `exit` collapses into the by-design nh_terminate gameover/exiting flags).
**Next:** continue the missing-arm list (`cmd.c` extcmd_initiator head).
## 2026-10-02 — D-3305 `iactions.c` ia_addmenu + `decl.c` sa_victual (stale-complete + analyzer-no-op by-design)

**C locus:** - `ia_addmenu`: nethack-c/upstream/src/iactions.c:127–136 (C staticfn) — `any = cg.zeroany; any.a_int = act; add_menu(win, &nul_glyphinfo, &any, let, 0, ATR_NONE, NO_COLOR, txt, MENU_ITEMFLAGS_NONE)`; sole caller itemactions (:278–716, 68 sites :306–:695).
**JS:** - `ia_addmenu`: js/iactions.js:473 — `const add = (act, letch, txt) => { items.push({ act, let: letch, text: `${letch} - ${txt}` }); }`: win ≡ closed-over items array, a_int ≡ act field (read back at :894/:905 into itemactions_pushkeys), nul-glyph/ATR_NONE/NO_COLOR/no-flags ≡ plain `{ text, attr: 0 }` entries (:874); the `let - ` prefix is the tty menu rendering.
**Change:** no `js/` change — one stale-complete + one by-design, documented here and booked via Ledger (D-3302 precedent).
**Verify:** `node scripts/verify.mjs --fn ia_addmenu,sa_victual` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×2 (no corpus session blocked — normal for coverage) · REACH-OK ×2 (no RNG-tagged reach; smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `ia_addmenu`: none — whole C body live in the `add` closure (add_menu fixed-default args collapse by the items-array menu idiom).
**Next:** continue the missing-arm list (`role.c` genl_player_selection head).
## 2026-10-02 — D-3304 `sp_lev.c` Lua-adjacent septet (l_register_des head + 3 by-design + 2 stale-complete + sel_set_wallify port)

**C locus:** - `l_register_des`: nethack-c/upstream/src/sp_lev.c:6435–6441 — `lua_newtable` + `luaL_setfuncs(nhl_functions)` + `lua_setglobal("des")`; sole caller nhlua.c:2347 (Lua-state init block).
**JS:** - `l_register_des`: no symbol (by-design) — no Lua runtime in scored ESM (nhlua.c 77 by-design seed; `nhlua_init`/`l_register` NOT FOUND in js/); des-table entries are called directly as JS exports (lspo_* live in js/mklev.js), so the registration itself has no analogue.
**Change:** four by-design resolutions + two stale-complete + one module-local port (C staticfn idiom, D-3293 precedent; same module as callee, no new import).
**Verify:** `node scripts/verify.mjs --fn l_register_des,sp_code_jmpaddr,get_trapname_bytype,cvt_to_relcoord,lspo_non_diggable,lspo_non_passwall,sel_set_wallify` → syntax PASS (1 changed js file: js/mklev.js) · Rule #2 PASS · hidden note ×7 (no corpus session blocked — normal for coverage) · REACH-OK ×7 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `l_register_des`: the registration itself — no `lua_State`/global table exists in scored ESM.
**Next:** continue the missing-arm list (`iactions.c` ia_addmenu head).
## 2026-10-02 — D-3303 `vision.c` get_viz_clear (whole-body port, sole caller named)

**C locus:** - `get_viz_clear`: nethack-c/upstream/src/vision.c:105–110 — `if (isok(x,y) && !viz_clear[y][x]) return TRUE; return FALSE;` sole C caller levl_sanity_check wizcmds.c:1453 (`(does_block(…) ? 1 : 0) != get_viz_clear(x, y)`).
**JS:** - `get_viz_clear`: js/vision.js:104 — `if (isok(x, y) && !viz_clear[y][x]) return 1; return 0`; C short-circuit kept (isok guards the plane read); TRUE/FALSE → 1/0 ints matching the `does_block` int idiom and the sole C caller's `!=` int comparison.
**Change:** whole-body port in C order as an export in js/vision.js (C file order, before vision_init); `isok` added to the existing `./const.js` import (`imports.mjs --can`: ALREADY, no new edge; const.js:2313 is the C-locus cmd.c:isok, not the hacklib duplicate).
**Verify:** `node scripts/verify.mjs --fn get_viz_clear` → syntax PASS (1 changed js file: js/vision.js) · Rule #2 PASS · hidden note (no corpus session blocked — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** - `get_viz_clear`: C caller levl_sanity_check (wizcmds.c:1443–1457) unported — no JS call site to wire; none in-body (whole C body live).
**Next:** continue the missing-arm list (`sp_lev.c` l_register_des head).
## 2026-10-02 — D-3302 `topten.c` score-stream quintet (discardexcess + nsb_mung/unmung + free_ttlist by-design, add_achieveX stale-complete)

**C locus:** - `discardexcess`: nethack-c/upstream/src/topten.c:208–215 — `do { c = fgetc(rfile); } while (c != '\n' && c != EOF)` drain-to-newline; callers readentry :246 (fscanf fail arm) and :256 (overlong-remainder arm).
**JS:** - `discardexcess`: no symbol (by-design) — JS `readentry` (js/topten.js:433) parses one pre-split VFS line; there is no FILE* stream position to drain, and both fail arms keep C's `points = 0` (js/topten.js:445, 465 — the docblock at :425 already names this omit; review 1607 ACCEPT).
**Change:** none in `js/` — four by-design resolutions + one stale-complete, all documented here and booked via Ledger.
**Verify:** `node scripts/verify.mjs --fn discardexcess,nsb_mung_line,nsb_unmung_line,free_ttlist,add_achieveX` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×5 (no corpus session blocked — normal for coverage) · REACH-OK ×5 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `discardexcess`: the FILE* drain itself — no stream exists post-split (readentry docblock omit, review-1607 ACCEPTed).
**Next:** continue the missing-arm list (`vision.c` get_viz_clear head).
## 2026-10-02 — Audit 2256–2261: review D-3295–D-3301 (6 ACCEPT, docs-only D-3300 skipped) + full score

**Scope:** 6 js-touching SHAs since audit 2247–2255 (b4812e9cd, b23f261b5, 1896adcef, 42c45189d, 8859c7e6d, 3442eb4d9); 56ef5b381 (D-3300) is docs-only, out of scope.
**Reviews:** 2256–2261 all ACCEPT, 0 Must-fix families. Every D-log verify claim re-measured (`hidden-proxy verify --base <sha>~1 --reach-all`): all 0-blocked + REACH-OK, zero REGRESSED.
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `332+1.61/turn`); corpus 705/953 PASS (RNG 98.09 %, screens 93.4 %), 0 losses / 0 gains, `full: true`; held-out 15/44 (rank 5, +0).
**Ledger:** `summary --snapshot` appended; 5 ported rows sampled (rumor_check, fopen_config_file, age_spells, price_quote, write_ls) — all resolve, no fixes. `ledger.mjs sql` unusable on Node v20.12.2 (no node:sqlite); sampled via jsonl grep.
## 2026-10-02 — D-3301 `mklev.c` vault/branch/sort triple (pos_to_room + makevtele + mkroom_cmp, all callers wired)

**C locus:** - `pos_to_room`: nethack-c/upstream/src/mklev.c:1677–1687 — rooms scan via `inside_room`, NULL fallthrough; sole caller place_branch :1714.
**JS:** - `pos_to_room`: js/mklev.js:33329 — `for i < g.level.nroom` scan returning the room or null (C NULL → null); live `inside_room` callee (js/mklev.js:32964).
**Change:** added three module-local functions in C-cite form (C staticfn idiom, D-3293 precedent); rewired all three C caller sites to the named functions.
**Verify:** `node scripts/verify.mjs --fn pos_to_room,makevtele,mkroom_cmp` → syntax PASS · Rule #2 PASS · hidden note (no corpus session blocked — normal for coverage) ×3 · REACH-OK ×3 (smoke spread 24 PASS, 0 regressed each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file) → VERIFY: PASS.
**Named:** none — every arm, callee (live), and C caller wired. JS-only guards (unobservable under C semantics): `curr &&` null-hole guard in pos_to_room (JS rooms arrays can be sparse — makeniche guards `!aroom`; C structs cannot), `x?.lx || 0` in mkroom_cmp (preserves the prior inline arrow's exact nullish/NaN behavior).
**Next:** continue the missing-arm list (`topten.c` discardexcess head).
## 2026-10-02 — D-3300 `objnam.c` obuf/name-wrapper closure (nextobuf by-design + 11 stale-complete)

**C locus:** - `nextobuf`: nethack-c/upstream/src/objnam.c:142–146 whole body (C staticfn) — `obufidx = (obufidx + 1) % NUMOBUF; return obufs[obufidx];` 17 same-file C call sites (:203–:3041).
**JS:** - `nextobuf`: no symbol (by-design; pool cited at js/objnam.js:4064–4070).
**Change:** - `nextobuf`: ledger by-design — no JS symbol to add (a `return ''` stub would be dead; every C caller is ported on fresh strings). Evidence: no `obufs[]`/`obufidx` in scored JS; releaseobuf doc :4064–4070; xname_flags + doname_base ledger omits (D-2483 by-design strings).
**Verify:** `node scripts/verify.mjs --fn nextobuf,releaseobuf,thesimpleoname,Yname2,The,Yobjnam2,obj_is_pname,An,yobjnam,Japanese_item_name,Doname2,Ysimple_name2` → VERIFY: PASS — syntax 0 changed js files; rule2 clean; hidden 0 blocked ×12 (coverage rows); reach REACH-OK ×12 (fixed smoke spread 24/24 each, no RNG-tagged reach); green 2/2; strict ×2; cohort 7/7; full skipped (no shared file changed).
**Named:** - `nextobuf`: the pool itself — `obufs[NUMOBUF][BUFSZ]` rotation has no JS counterpart (immutable strings; D-2483 by-design strings).
**Next:** queue head now `mklev.c` pos_to_room (missing-arm row 2); objnam.c measured-gap unknowns exhausted (remaining unknowns measured-ok or declared). Observed, not queued (hand rows are Must-fix/corpus only): js/wield.js:1288 `Yobjnam2` clone is xname-based (drops yobjnam's aobjnam/shk_your-gate arms) and js/do_wear.js:276 `obj_is_pname` clone drops the gameover/override_ID gate — clone-drift candidates if a review ever names them.
