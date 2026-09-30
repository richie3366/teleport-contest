# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-30 — Audit 2114–2122 (D-3154..D-3162): 9 ACCEPT; full cadence

Reviews cover the 9 js/ SHAs since 5ab8920e9 against pinned C with
per-function fidelity + hidden-proxy re-measure. D-3154 closes review
2111's Must-fix (miss arm now FALSE, pins flipped, 22/22). Reproduced
D-3159's burden PROGRESS (scen-options-Samurai-94071 41→43) and all
other verify claims; no C-wrongs, no Must-fix. Noted (unqueued):
D-3159's IBM ledger omit carried the wrong bullet at its SHA (fixed
in-tree by D-3161); D-3160 11 rows and D-3162 14 rows exceed the
10-count on zero-code walk retirements (review-1962 precedent:
review-debt, all rows verified).
Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838);
corpus rescore 648/953 with full:true, 0 flips; held-out 13/44 flat.
Ledger snapshot + seeded sample 4/5 resolve (mhitm_ad_drin corrected
ported→split: uhitm + mhitm arms).
## 2026-09-30 — D-3162 `options.c` optfn DEC/playmode/hilite/term/autocomplete cluster (coverage)

**C locus:** - `optfn_DECgraphics`: options.c:1393–1439 (BACKWARD_COMPAT on, optlist.h:15: do_set `:1409–1427` single-PRIMARYSET load, no rogue set `:1410`; `#else` `:1428–1431` compiled out; get arms `:1434–1436` empty).
**JS:** js/options.js:7119 (DECgraphics), :7166 (playmode), :7212 (hilite_status), :7256/:7301 (term_cols/rows), :11931 (o_autocomplete), rc key :4043/:4237 + lname :4350, allopt rows 1/15/41/75/179/180, doset rows :10001/:10047; js/cmd.js:2521 (count_autocompletions); scripts/optfn-dec-term-cluster.test.mjs (25 tests).
**Change:** ported all seven whole in C order over live string_for_opt/opt_atoi/allopt_name/set_optbuf CURRENTLY_SET (same module), clear_status_hilites/parse_status_hl1/count_status_hilites/config_error_add (botl.js edge, extended) + count_autocompletions (new cmd.js export over generated EXTCMDLIST, null-terminator-free loop) + LARGEST_INT (const.js edge; both edges imports.mjs ALREADY). playmode writes game.wizard/game.discover (C globals; discover new dynamic field like wizard); strcmpi("play") is a length gate + strncmpi (map_mode precedent); cursesgraphics declared by-design, no code (porting ifdef'd-out C would add dead JS — necrophiliac precedent).
**Verify:** `node scripts/verify.mjs --fn optfn_DECgraphics,optfn_o_autocomplete,optfn_hilite_status,optfn_playmode,optfn_term_cols,optfn_term_rows,count_autocompletions,optfn_cursesgraphics` → VERIFY: PASS — hidden notes ×8 (no corpus session blocked, expected for coverage rows); REACH-OK ×8 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/optfn-dec-term-cluster.test.mjs`: 25/25 PASS (all do_set/get arms incl. badflag, mode families, clear/parse, atoi edges, bare/default, rc + dispatch + dump wiring); siblings optfn-coverage/optfn-status/all-options-statushilites/all-options-conds: 48/48 PASS.
**Named:** - `optfn_DECgraphics`: read_sym_file `:1415` + clear_symsetentry `:1417` failure arm (SYMBOLS file IO under Rule #2) + switch_symbols `:1419` (by-design) — IBMgraphics precedent.
**Next:** continue the breadth queue from the regenerated block.
## 2026-09-30 — D-3161 `options.c` optfn_statushilites + optfn_statuslines (coverage cluster)

**C locus:** - `optfn_statushilites`: options.c:4012–4064 (STATUS_HILITES on, config.h:616: do_set `:4025–4036` delta store + from_file reset gate; `#else` `:4037–4042` compiled out; get_val `:4046–4050`; get_cnf_val `:4058`).
**JS:** js/options.js:7096 (optfn_statushilites), :7146 (optfn_statuslines), rc valued :4231/:4239 + valueless :4400/:4407, allopt rows 174/176, doset rows :9770/:9774; js/botl.js reset_status_hilites doc (caller now live); scripts/optfn-status-cluster.test.mjs (15 tests).
**Change:** ported both whole in C order over live string_for_opt/bad_negation/wc2_supported/opt_atoi/config_error_add (same module) + imported reset_status_hilites (botl.js; pre-existing edge, imports.mjs ALREADY). Statushilites full-doset row is live get_val now; statuslines displays keep the C-observable `:4101` supported arm (contest tty sets WC2_STATUSLINES, wintty.c:119; the live optfn reads 'unknown' under the deliberate minimal JS wincap2).
**Verify:** `node scripts/verify.mjs --fn optfn_statushilites,optfn_statuslines` → VERIFY: PASS — hidden notes ×2 (no corpus session blocked, expected for coverage rows); REACH-OK ×2 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/optfn-status-cluster.test.mjs`: 15/15 PASS (all do_set/get arms incl. negated fall-through, bare/default, atoi edges, rc + dispatch + dump wiring, both wc2 arms); sibling `scripts/optfn-coverage-cluster.test.mjs`: 20/20 PASS.
**Named:** - `optfn_statushilites`: none — whole body; STATUS_HILITES-off arms compiled out (config.h:616).
**Next:** continue the breadth queue from the regenerated block.
## 2026-09-30 — D-3160 `apply.c` could_pole_mon cluster + `hacklib.c` isqrt (coverage)

**C locus:** - `could_pole_mon`: apply.c:3391–3412 (hitm entry snapshot `:3395`, uwep/pole gate `:3397–3398`, range `:3400`, find `:3404`, hitm arm `:3405–3407`, mdistu ×2 `:3406`).
**JS:** js/apply.js:3771 (`could_pole_mon` restart), :3696 (`find_poleable_mon` impaired `:3698` + isqrt `:3699`), :3660/:3679 (calc/get_valid docs), 3 import names; js/hacklib.js:36 (`isqrt` export); scripts/polearm-coverage-cluster.test.mjs (3 tests).
**Change:** restarted `could_pole_mon` in C order (entry hitm, live `mdistu`, per-line C pins, C-shaped else); impaired now calls the gated display.js `Hallucination` youprop (D-1493; aliased — do_name.js squats the bare name and documents itself as not-the-macro); ported `isqrt` as the hacklib.js C-locus export, rewired find, deleted `isqrt_pole`; C-ref docs on the two staticfn locals (distu is a macro, hack.h:1531 — `distu_apply` is its expansion).
**Verify:** `node scripts/verify.mjs --fn could_pole_mon,calc_pole_range,find_poleable_mon,get_valid_polearm_position,isqrt` → VERIFY: PASS — hidden notes ×5 (no corpus session blocked, expected for coverage rows); REACH-OK ×5 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7. Focused `node --test scripts/polearm-coverage-cluster.test.mjs`: 3/3 PASS. First verify run caught a real bug (bare `Hallucination` import collided with the do_name.js squat — `Identifier already declared`, cohort 0/7); fixed via alias, re-verified PASS.
**Named:** - `could_pole_mon`: none — whole body, every callee live.
**Next:** `optfn_IBMgraphics` coverage row persists while declared partial (generator re-queues partial + measured-gap rows); retires only via a `read_sym_file` port or a generator tweak — out of scope, D-3159 stands.
## 2026-09-30 — D-3159 `options.c` burden/runmode prompt rows + o_status_cond/count_cond + mouse_support + IBMgraphics (coverage cluster)

**C locus:** - `handler_pickup_burden`: options.c:6085–6111 (letters `:6091`, items `:6097–6101`, end_menu prompt `:6103`, select `:6104–6106`); paint rule wintty.c tty_end_menu `:2685–2689` (promptstyle + blank item), promptstyle default menu_headings (allmain.c:728).
**JS:** js/options.js:2700 (handler_pickup_burden), :6913 (handler_runmode), :6951 (optfn_mouse_support), :7013 (optfn_IBMgraphics), :11492 (count_cond), :11510 (optfn_o_status_cond); scripts/optfn-coverage-cluster.test.mjs (20 tests).
**Change:** burden/runmode prompt rows now `{attr: ATR_INVERSE}` + `{text: ''}` (pickup.js query_objlist precedent, tty_end_menu `:2685–2689`); simple-menu cond arm sets [PFX_COND_IDX] on TRUE and returns OPTN_OK unconditionally (full-doset `:9733` precedent); both O-menu cond vals call live count_cond(); ported the 3 optfns + count_cond whole in C order (mouse: compat/atoi/range/get tables over opt_atoi+string_for_opt; IBM: gs.symset mirror loop with RogueIBM rename, rogue-level assign gated on optInitial like C; o_status_cond: `;` arms as comments, no do_handler branch per async-split precedent) with allopt + rc-parse + doset wiring.
**Verify:** `node scripts/verify.mjs --fn handler_pickup_burden,handler_runmode,optfn_o_status_cond,count_cond,optfn_mouse_support,optfn_IBMgraphics` → VERIFY: PASS — hidden: burden PROGRESS (scen-options-Samurai-94071 step 41 → obj_resists at step 43, later owner), notes ×5 (no corpus session blocked, expected for coverage rows); REACH-OK ×6 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/optfn-coverage-cluster.test.mjs`: 20/20 PASS (cond counts, all do_set/get arms incl. compat/atoi edges, rc-parse + dump wiring).
**Named:** - `handler_pickup_burden`: none — whole body + tty paint rule.
**Next:** other select_menu_pick_one prompt headers (menustyle, disclose, …) still lack the tty promptstyle+blank convention — same 3-line shape when a session reaches them; continue the breadth queue from the regenerated block.
## 2026-09-30 — D-3158 `sp_lev.c` lspo_mazewalk + lspo_terrain (coverage cluster)

**C locus:** - `lspo_mazewalk`: sp_lev.c:5769–5869 (mwdirs tables `:5771–5776`; triple `:5786–5789` vs table `:5790–5796` dispatch; get_location ANY_LOC `:5803`; isok `:5805–5809`; ftyp<1 corrmaze `:5811–5813`; W_RANDOM roll `:5815–5816`; move switch `:5819–5834`; non-door write `:5836–5839`; parity fixups `:5846–5862`; walkfrom `:5864`; fill when stocked `:5865–5866`).
**JS:** js/mklev.js:1271 (lspo_mazewalk), :1857 (lspo_terrain); scripts/lspo-terrain-mazewalk.test.mjs (12 tests).
**Change:** ported both whole in C order, unpacked-args idiom (lspo_drawbridge/gold/region precedent). mazewalk: arguments.length dispatch (triple checkintegers + checkoption dir default random; table form get_table_xy_or_coord + mapchr_opt ROOM + boolean stocked + option dir), ANY_LOC locate, isok throw, corrmaze ftyp default, W_RANDOM roll, W_NORTH/SOUTH/EAST/WEST move switch (default impossibles bare like the sync lspo siblings, then falls through to the write like C), non-door write, even-x EAST/write vs shift fixup (x arm writes, y arm only moves), walkfrom, fill when stocked; own north/south/east/west tables (the drawbridge LSPO_MWDIRS above holds DB_* values in west/east order). terrain: all four argc arms (table with -1,-1 selection-field read; coord pair gated on table-but-not-selection since a selection userdata is not LUA_TTABLE; selection pair; triple), required-typ Erroneous-map-char throws, shared INVALID gate, selection_iterate with the (ter,tlit) unpack closure else locate+isok+single sel_set_ter. l_selection_check errors on missing selection (nhlsel.c:58-66 checktype USERDATA, no nil pass), so -1,-1 without a selection-shaped field throws. levl indexes go through level.at with the walkfrom null guard (C indexes raw levl).
**Verify:** `node scripts/verify.mjs --fn lspo_mazewalk,lspo_terrain` → VERIFY: PASS — hidden notes ×2 (no corpus session blocked, expected for coverage rows); REACH-OK ×2 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/lspo-terrain-mazewalk.test.mjs`: 12/12 PASS (dispatch per arm, step/parity writes, selection vs single-cell split, all nhl_error throws).
**Named:** - `lspo_mazewalk`: lcheck_param_table (table-or-empty + object check); get_table_mapchr_opt/get_table_boolean_opt/get_table_option (inline splev_chr2typ/splev_opt_boolean/splev_opt_index); luaL_checkinteger (luaL_checkinteger_unpacked). nhl_error line-suffix omitted (file precedent — no lua_State).
**Next:** continue the breadth queue from the regenerated block (sp_lev.c's 4 rows all resolve this iteration: 2 shipped + 2 stale).
## 2026-09-30 — D-3157 `options.c` optfn_map_mode + optfn_menu_headings + color_attr_to_str + optfn_pettype (coverage cluster)

**C locus:** - `optfn_map_mode`: options.c:1962–2047 (do_set `:1972–2026`: exact-tiles strcmpi `:1983`, strncmpi prefix chain `:1985–2011`, unknown `:2012–2016`, wc/preference gate `:2017–2021`, negation `:2022–2025`; get_val `:2028–2045`, TILES_FIT unnamed → defopt `:2041–2043`).
**JS:** js/options.js:3008 (optfn_map_mode), :3089 (optfn_menu_headings), :3125 (color_attr_to_str), :3143 (optfn_pettype); js/const.js:1517–1525 (MAP_MODE_ASCII 1–9); js/jsmain.js:183 (default); scripts/optfn-mapmode-headings-pettype.test.mjs (17 tests).
**Change:** ported all four whole in C order. map_mode: exact-tiles via length gate + strncmpi (hacklib has no strcmpi), prefix lengths = sizeof-name minus 1, wc_supported/preference_update gate, negated→bad_negation+ERR, get_val chain with 11→'default'. menu_headings: direct-op do_set (empty→C-domain INVERSE/NONE+NO_COLOR; silenterr; parse whole-struct assign), get_val to_str + space→hyphen; do_handler async-split (no branch, msg_window precedent). color_attr_to_str: C-`"%s&%s"` over live clr2colorname/attr2attrname (`|0` ≡ C zero-struct). pettype: env_opt parse, 9-letter switch (C `'\0'` random is JS `''` so get_cnf_val truthiness matches C 0), dead post-return `break` skipped. Attr-domain consistency: empty arm, initoptions default (:7475) and handler default (:6172) now store C-domain (MC_ATR_*, = C ATR_*); ape_heading_attr (:5980) translates C→terminal for the painter (DIM/ITALIC/BLINK unrenderable, named). jsmain iflags assembly gains the C `:7188–7189` default {7,8} (initoptions_init is not on the JS startup path; rc spread overrides).
**Verify:** `node scripts/verify.mjs --fn optfn_map_mode,optfn_menu_headings,color_attr_to_str,optfn_pettype` → VERIFY: PASS — hidden notes ×4 (no corpus session blocked, expected for coverage rows); REACH-OK ×4 (no RNG-tagged reach, smoke spreads 24/24 PASS each); green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). First run caught seed0007 doset `[black&none]` (menu_headings unset on the JS startup path) → fixed with the jsmain C-default; re-run green. Focused `node --test scripts/optfn-mapmode-headings-pettype.test.mjs`: 17/17 PASS.
**Named:** - `optfn_map_mode`: none — whole body. Valueless map_mode rc arm skipped (bare→OK no-op, `!`→sink-only bad_negation+ERR; zero observable effect).
**Next:** continue the breadth queue from the regenerated block (options.c's 7 rows all resolve this iteration: 3 shipped + color_attr_to_str callee + 3 stale + palette by-design).
## 2026-09-30 — D-3156 `selvar.c` selection_iterate whole-body restart (coverage)

**C locus:** - `selection_iterate`: selvar.c:726–743 (null guard `:734–735`, getbounds `:737`, x-outer/y-inner scan `:739–740`, isok+getpoint gate `:741`, callback with arg `:742`).
**JS:** js/mklev.js:29483 (`selection_iterate`), :4857 (comment).
**Change:** restarted in C order — `if (!sel) return`, getbounds, bounds loop, `if (isok(x, y) && selection_getpoint(x, y, sel)) fn(x, y, arg)`; dropped the `!sel.pts.size` shortcut (equivalent: empty pts ⇒ getpoint 0 everywhere ⇒ the C loop body never fires; the full-map empty scan `:84–89` only costs level-gen-time cycles). All ~25 call-site closures keep the (x, y) shape; the trailing `arg` passes through for C-signature fidelity. `isok` already imported in-file (used at :4862) — no new cross-module import.
**Verify:** `node scripts/verify.mjs --fn selection_iterate` → VERIFY: PASS — hidden note (no corpus session blocked, expected for a coverage row); reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `selection_iterate`: C caller `lspo_terrain` (:5025) unwired — function MISSING in JS, own Open coverage row (different C file, not this cluster).
**Next:** continue the breadth queue from the regenerated block.
## 2026-09-30 — D-3155 `write.c` cost impossible arm + async (coverage)

**C locus:** - `cost`: write.c:14–57 (SPBOOK `:17–18`, switch `:20–56`, SCR_MAIL `:22–23` under `#ifdef MAIL_STRUCTURES`, BLANK_PAPER/default impossible `:53–55`, `return 1000` `:57`).
**JS:** js/write.js:96 (`async function cost`), :123 (await impossible), :395 (call site), :15 (import).
**Change:** tail now `await impossible("You can't write such a weird scroll!");` then `return 1000`; `cost` is `async` (C `:55` can block on --More--) with the single caller awaiting; `impossible` added to the existing `./display.js` import (edge already exists — no new cross-module import). SCR_MAIL arm confirmed live: `MAIL_STRUCTURES` unconditionally defined (`include/global.h:430`).
**Verify:** `node scripts/verify.mjs --fn cost` → VERIFY: PASS — hidden note (no corpus session blocked, expected for a coverage row); reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7; full skipped (no shared file changed).
**Named:** - `cost`: none — whole body, sole callee live (`impossible`; its own omits stay on its partial row).
**Next:** continue the breadth queue from the regenerated block (`case_insensitive_comp` already ported-stale this iteration).
## 2026-09-30 — D-3154 `options.c` parsebindings extcmd-miss returns FALSE (Must-fix 2111)

**C locus:** - `parsebindings`: options.c:7668–7672 (`if (!bind_key(...))` miss gate `:7668`, `config_error_add` `:7670`, `return FALSE` `:7671`, hit path `return ret` `:7672`).
**JS:** js/options.js:1010 (`return false` in the miss arm; export signature unchanged).
**Change:** miss arm now `return false` right after the error (hit path still `return ret`); doc line corrected to "records an error and returns FALSE (`:7670–7671`)"; both pins flipped to `false` with the C locus in the test names.
**Verify:** - `parsebindings`: pins flipped first → 20/22 (2 red, the two miss pins); after the arm fix 22/22 + neighbors 18/18 (`get-changed-key-binds`, `bind-mousebtn`, `cfgfiles-config-lines` — none call `parsebindings` directly).
**Named:** - `parsebindings`: none — one-arm return fix on the D-3151 whole body; every callee already live.
**Next:** pop the next Open — coverage row.
