# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-02 — D-3314 `cfgfiles.c` dead-handler sextet (GDBPATH head + 3 queued siblings + AUTOCOMPLETE stale + DUMPLOGFILE)

**C locus:** - `cnf_line_GDBPATH`: nethack-c/upstream/src/cfgfiles.c:1082–1094 — PANICTRACE-gated file_exists + config_error_add, sysopt.gdbpath free/dupstr; refs are fwd decl :82 + definition only (whole-file textual scan).
**JS:** - `cnf_line_GDBPATH`: no symbol (by-design) — dead in C; PANICTRACE file_exists is a filesystem probe (Rule #2) and sysopt.gdbpath is a debugger path with no JS counterpart (no gdbpath symbol).
**Change:** none in `js/` — five by-design resolutions + one stale-complete booking, documented here and booked via Ledger (D-3312/D-3302 precedent).
**Verify:** - `cnf_line_GDBPATH`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `cnf_line_GDBPATH`: whole body — dead in C; no scored caller.
**Next:** continue the missing-arm list (`invent.c` safeq pair + any_obj_ok/worn_wield_only, `alloc.c` dupstr_n).
## 2026-10-02 — D-3313 `cmd.c` rush octet (do_rush_northwest head + 6 siblings + rnd_extcmd_idx, whole remaining cmd.c Open set)

**C locus:** - `do_rush_northwest`: nethack-c/upstream/src/cmd.c:1468–1472 — `set_move_cmd(DIR_NW, 3)` + ECMD_TIME.
**JS:** - `do_rush_northwest`: js/cmd.js:618 — module-local one-liner; FUNCT_TXT row js/cmd.js:2070; family comment js/cmd.js:613–616.
**Change:** ported the seven rush leaves module-local in C order (do_move_*/do_run_*/do_rush_west idiom, D-3307 precedent) + seven FUNCT_TXT identity rows in C extcmdlist order + rnd_extcmd_idx as a live export (C extern) in C file order; new focused test scripts/rnd-extcmd-idx.test.mjs.
**Verify:** - `do_rush_northwest`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `do_rush_northwest`: none in-body — whole C body live (move_funcs function-pointer column is txt dispatch in JS, pre-existing architecture shared with do_run_*).
**Next:** continue the missing-arm list (`cfgfiles.c` cnf_line_GDBPATH head + GREPPATH sibling, `invent.c` safeq pair).
## 2026-10-02 — D-3312 `sfbase.c` save-proc sextet (sf_init head + sfvalue_any + 4 unqueued micro-gaps, all by-design)

**C locus:** - `sf_init`: nethack-c/upstream/src/sfbase.c:647–655 — sfoprocs/sfiprocs[invalid]=zero*, [historical]=historical_*; sfoflprocs/sfiflprocs[exportascii]=zero*; sole caller initoptions_init options.c:7129.
**JS:** - `sf_init`: no symbol (by-design) — the sfoprocs/sfiprocs/sfoflprocs/sfiflprocs tables have no JS container: JS dispatches on `fnidx === FNIDX_HISTORICAL` + structlevel/fieldlevel directly (e.g. js/files.js:1075–1085, docblock :1058–1064 citing sf_init :651/:653); materializing tables nothing reads would be dead scaffolding, and the historical_sfo_procs contents live outside sfbase.c (sfstruct.c:149).
**Change:** none in `js/` — six by-design resolutions, documented here and booked via Ledger (D-3302/D-3304 precedent).
**Verify:** `node scripts/verify.mjs --fn sf_init,sfvalue_any,sf_setprocs,sf_setflprocs,sfvalue_bitfield,bitfield_dump` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×6 (no corpus session blocked — normal for coverage) · REACH-OK ×6 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `sf_init`: the tables themselves — sfoprocs/sfiprocs/sfoflprocs/sfiflprocs + zero/historical contents have no JS container (installed configuration compiled into the sfo_/sfi_ dispatch arms).
**Next:** continue the missing-arm list (`cmd.c` do_rush_northwest head + 6 siblings); `sfbase.c` norm_ptrs_* C-0 empty-hook family (73 ledger-absent) left for a family-batch decision.
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
