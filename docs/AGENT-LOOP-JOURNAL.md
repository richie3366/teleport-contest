# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-30 — D-3170 monmove.c mon_regen whole regeneration and meal completion

**C locus:** - `mon_regen`: pinned monmove.c:307–320, whole body read in brief; sole caller mon.c:1193 passes FALSE.
**JS:** js/mon.js:1006; live healmon at :2327, imported finish_meating at :93 (js/dogmove.js:1675).
**Change:** restarted the body in C order: moves modulo 20 short-circuits regenerates; live healmon(mon, 1, 0); nonzero mspec_used decrement; nested digest_meal/meating guards, decrement and finish_meating at <=0. No new module edge: dogmove.js was already imported and finish_meating already bound. Exported the existing name and preserved its two-argument signature.
**Verify:** - `mon_regen`: preflight green + strict PASS before edits. `node scripts/verify.mjs --fn mon_regen`: no blocked corpus sessions (note); 24/24 smoke REACH-OK, syntax/Rule #2/green/strict/cohort PASS. Forced `node scripts/verify.mjs --fn mon_regen --full` because mon.js is shared although the script skipped full by default; tail:
**Named:** - `mon_regen`: none in this whole body. Both callees are live. healmon's pre-existing youmonst/healup omission (mon.c:4598–4602) remains outside this cluster: the sole C caller supplies fmon monsters, never youmonst.
**Next:** generated coverage head set_playmode; CURRENT's prior sysconf authorization prerequisite remains relevant. Do not pad this singleton with unrelated coverage rows.
## 2026-09-30 — D-3169 options.c optfn 6-pack (coverage) + stale Placebc/optfn_video; set_playmode restart reverted on sysconf gap

**C locus:** - `optfn_scroll_amount`: options.c:3763–3791 (do_set `:3770–3782`: bare negation stores 1, value stores atoi; negated+value bad_negation `:3777–3779`; get_val defopt `:3787`).
**JS:** js/options.js:3539 (optfn_crash_email), :3570 (optfn_crash_name), :3917 (optfn_scroll_amount), :3954 (optfn_scroll_margin), :3994 (optfn_windowtype), :4066+ (optfn_versinfo 2-site wiring), :11100/:11168/:11170/:11404/:11406 (row wiring), :10528–10529 (doset crash get_val), :884–897 (set_playmode restored + NOTE).
**Change:** ported all 5 whole in C order (vary_msgcount/crash_urlmax precedent: REQ_/OPTN_/EMPTY_OPTSTR, string_for_opt re-derive, opt_atoi for C atoi, allopt_name, set_optbuf, `| 0` int reads; absent wc_ fields ≡ C static 0; get_val 'default' ≡ defopt[]; windowtype get_val 'tty' ≡ sole winchoice windows.c:100/:233; crash free ≡ GC + live dupstr import). Wired all 5 allopt rows (D-3167 precedent) + doset crash get_val with C `:9043` `|| 'unknown'` fallback (unset output unchanged). Versinfo: 2 live config_error_add calls (botl.js no-op sink — behavior-neutral), dropped `void dflt`.
**Verify:** `node scripts/verify.mjs --fn optfn_scroll_amount,optfn_scroll_margin,optfn_windowtype,optfn_crash_email,optfn_crash_name,optfn_versinfo` → VERIFY: PASS — hidden notes ×6 (no corpus session blocked, expected for coverage rows); REACH-OK ×6 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Arm probe /tmp/optfn8-probe.mjs: ALL PASS (32 checks: do_set/get_val roundtrips, negated bare/valued, locked/inited gates, valueless errs, versinfo silenterrs, do_init dispatch over wired rows). Intermediate set_playmode restart falsified by green gate (seed0900 FAIL → reverted → green again).
**Named:** - `optfn_scroll_amount`: none — whole body; bad_negation is the live shared stub (own THIN row, pile_limit precedent).
**Next:** set_playmode PARTIAL row stays Open — re-ship only with the sysconf WIZARDS/EXPLORERS seed (JS sessions must see the recorder sysconf lines before the authorize gates can grant like C); recipe + measurements in Fix above.
## 2026-09-30 — D-3168 `sp_lev.c` nhl_abs_coord + cvt_to_abscoord ports (coverage) + stale optfn_symset

**C locus:** - `nhl_abs_coord`: sp_lev.c:4810–4836 (lua_gettop dispatch `:4814`; pair arm `:4817–4822` lua_tointeger; table arm `:4823–4830` get_table_int; error `:4831–4833`; registered `nh.abscoord` nhlua.c:1863).
**JS:** js/mklev.js:22375 (lua_tointeger_unpacked), :22391 (cvt_to_abscoord), :22416 (nhl_abs_coord); scripts/nhl-abscoord.test.mjs (11 tests).
**Change:** ported both whole in C order, unpacked-args idiom (lspo_mazewalk precedent): arguments.length dispatch, new `lua_tointeger_unpacked` (mistype → 0, never throws — unlike checkinteger), get_table_int ≡ in-module `luaL_checkinteger_unpacked` on the fields (`:5979` precedent), {x, y} out-param for cvt (get_coord idiom), pair returns [x, y] (C pushes 2 values) / table returns a fresh {x, y} (C newtable + entries), nhl_error on bad forms. No new cross-module edge (all callees in-module: cvt, checkinteger, nhl_error). optfn_symset ledger → ported direct (stale: D-3162 DECgraphics file-IO/do_handler namings + H_UTF8 arm compiled out under ENHANCED_SYMBOLS, config.h:368).
**Verify:** `node scripts/verify.mjs --fn nhl_abs_coord,cvt_to_abscoord` → VERIFY: PASS — hidden notes ×2 (no corpus session blocked, expected for coverage rows); REACH-OK ×2 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/nhl-abscoord.test.mjs`: 11/11 PASS (origin split incl. roomless-coder else, pair/table shapes, tointeger truncation + mistype-0s, checkinteger throws incl. array input, all 4 bad-form throws).
**Named:** - `nhl_abs_coord`: nhl_add_table_entry_int (by-design; the table arm builds the object directly); lua_newtable/push stack ops (no Lua runtime — unpacked idiom).
**Next:** continue the breadth queue from the regenerated block.
## 2026-09-30 — D-3167 options.c 9× optfn ports (altkeyhandling/glyph/tile_file/tile_height/tile_width/vary_msgcount/crash_urlmax/pile_limit/player_selection)

**C locus:** - `optfn_altkeyhandling`: options.c:1022–1063
**JS:** js/options.js:3505 (altkeyhandling), :3532 (crash_urlmax), :3570 (glyph), :3612 (pile_limit), :3640 (VIA_*), :3655 (player_selection), :3692 (tile_file), :3731 (tile_height), :3768 (tile_width), :3805 (vary_msgcount).
**Change:** ported all nine whole in C order into one `js/options.js` block (map_mode/menu_headings/symset idiom: REQ_/OPTN_/EMPTY_OPTSTR, `string_for_opt` re-derive, `opt_atoi` for C atoi, `allopt_name`, `set_optbuf`, `| 0` int reads, `defopt[]`→'default', VIA_DIALOG/VIA_PROMPTS from winprocs.h:275–276, crash_urlmax decl.c:261 -1 default) and wired the 9 allopt dispatch rows. Every C callee live: bad_negation/string_for_opt/opt_atoi/allopt_name/set_optbuf/mungspaces in-module, strncmpi (hacklib), dupstr (dungeon), config_error_add (botl), glyphrep_to_custom_map_entries (glyphs) — no new module edge (hacklib import extension reverted: options.js already defines mungspaces in-module).
**Verify:** `node scripts/verify.mjs --fn <9 fns>` → VERIFY: PASS (first run caught `mungspaces` double-declaration from my import extension — reverted to the in-module def, re-ran green):
**Named:** none — whole bodies. `optfn_altkeyhandling` WIN32CON/TTY_GRAPHICS/WIN32 arms (`:1035–1042`, `:1047–1054`, `:1057–1061`) are compiled out on unix, documented in place (STATUS_HILITES-off precedent).
**Next:** next coverage rows (`sp_lev.c` nhl_abs_coord head / options.c refill).
## 2026-09-30 — D-3166 `sp_lev.c` lspo_message/corridor/random_corridors ports + levregion splits + 5 region.c #if 0 by-design (coverage head)

**C locus:** - `clone_region`: region.c:227–254 — inside `#if 0` (:220–256 "not yet used"); prototype also ifdef'd (:26–28); zero callers.
**JS:** 1 file, +110/−30 (mklev.js), far under caps.
**Change:** `js/mklev.js` — new `lspo_message(msg)` in C order (argc + string check via live in-module nhl_error, create_des_coder, null-vs-undefined append mirroring C's NULL-pointer check so stale '' still joins with '\n'); new async `lspo_corridor(opts)` (LSPO_WALLDIRS tables, required ints via luaL_checkinteger_unpacked ≡ get_table_int, walls via splev_opt_index default "all", awaited create_corridor) and async `lspo_random_corridors()` (all -1); rewired load_earth/air/astral des.message sites to per-line lspo_message calls (behavior-neutral); added create_des_coder + `?? {}` + object check to l_teleport_region/l_levregion; retired the create_corridor-doc omits. No new imports (all callees same-module).
**Verify:** `node scripts/verify.mjs --fn clone_region,create_force_field,create_msg_region,replace_mon_regions,remove_mon_from_regions,lspo_message,lspo_corridor,lspo_random_corridors,lspo_teleport_region,lspo_levregion` → PASS syntax (1 file: mklev.js) · PASS rule2 · note hidden ×10 (vacuous: 0 blocked — coverage rows, NOT corpus PASSes) · REACH-OK ×10 (no RNG tags; smoke 24/24 each) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file) · VERIFY: PASS. Verify ran after the last js/ edit. /tmp probe: 9/9 (append/null/''/argc/typeof arms + 3 corridor validation throws).
**Named:** - `clone_region`: whole function uncompiled (by-design: #if 0 region.c:220–256 + :26–28; cf D-3133).
**Next:** falsifier — a session blocked with any shipped function as owner, or a table-form des.corridor call appearing in dat/*.lua (wire lspo_corridor then). Do not re-pop the five by-design labels or the two split labels.
## 2026-09-30 — D-3165 `cmd.c` dotherecmdmenu whole port (coverage)

**C locus:** cmd.c:4342–4375 — click-stamped cell (`gc.clicklook_cc`) first: hero cell → here_cmd_menu, else there_cmd_menu + stamp reset; else getdir(NULL) → ECMD_CANCEL unless dir + isok(ux+dx), then dx|dy → there_cmd_menu(ux+dx, click) else here_cmd_menu; ECMD_TIME iff ch && ch != ESC.
**JS:** js/cmd.js:3436 dotherecmdmenu (per-line C pins `:4347–:4374`); js/getline.js:563 'therecmdmenu' EXT_CMDS entry.
**Change:** ported the whole body in C order as exported async js/cmd.js dotherecmdmenu (getdir/here_cmd_menu/there_cmd_menu are async in JS): BSS-{0,0} clicklook_cc read via `| 0` (isok-false like C), unconditional getdir_click set/clear, single-return ECMD shape with the doherecmdmenu NUL guard (`'\0'` is truthy in JS); extended the pre-existing `./lock.js` import with getdir (imports.mjs ALREADY, no new edge); added the 'therecmdmenu' EXT_CMDS entry after 'terrain' (C table adjacency) with the lazy `./cmd.js` runner.
**Verify:** note hidden verify dotherecmdmenu: no corpus session blocked on it at baseline; PASS reach (no RNG-tagged reach; smoke 24/24 PASS, 0 regressed → REACH-OK); syntax 2 files · Rule #2 PASS · green 2/2 · strict 2/2 · cohort 7/7 · full skipped (gate: no shared file changed) → VERIFY: PASS.
**Named:** none — whole body, every callee live (isok/CLICK_1/CLICK_2/ECMD_* from const.js, here_cmd_menu/there_cmd_menu same-module, getdir from lock.js).
**Next:** generated Open — coverage head after refill.
## 2026-09-30 — D-3164 `music.c` generic_lvl_desc sanctum arm (coverage)

**C locus:** music.c:478–492 — `if/else-if` chain over `&u.uz`: astral plane → plane → sanctum → puzzle → tower → dungeon.
**JS:** js/music.js:466 generic_lvl_desc (sanctum arm at :470, C pin `:484–485`). Sequential-`if` with early returns preserves C's else-if semantics (each arm returns).
**Change:** added the sanctum arm in C order between the endgame and sokoban arms over the live `Is_sanctum` export (js/const.js:3294, `Lcheck(&sanctum_level)`); extended the existing `./const.js` import (no new module edge).
**Verify:** note hidden verify generic_lvl_desc: no corpus session blocked on it at baseline; PASS reach (no RNG-tagged reach; smoke 24/24 PASS, 0 regressed → REACH-OK); syntax 1 file · Rule #2 PASS · green 2/2 · strict 2/2 · cohort 7/7 · full skipped (music.js not shared) → VERIFY: PASS.
**Named:** none — whole body, all 5 callees live (dungeon.h macros exported from const.js).
**Next:** generated Open — coverage head after refill.
## 2026-09-30 — D-3163 `worn.c` wornmask_to_armcat + allunworn (coverage)

**C locus:** - `wornmask_to_armcat`: worn.c:218–246 — `cat = 0`, `switch (mask & W_ARMOR)` over the 7 armor slots, no default arm.
**JS:** js/worn.js:308 allunworn, js/worn.js:356 wornmask_to_armcat. twoweap cleared by direct assignment (no botl, per C); slot nulls match setnotworn idiom; switch keeps C's exact-match semantics (multi-bit armor mask → 0).
**Change:** ported both whole in C order into js/worn.js next to their C neighbors (allunworn before wearmask_to_obj, wornmask_to_armcat before its inverse armcat_to_wornmask); added W_ARMOR to the existing const.js import (no new module edge).
**Verify:** - `wornmask_to_armcat`: hidden note (no corpus session blocked); REACH-OK (no RNG reach; smoke 24/24 PASS); /tmp/worn-probe.mjs: 7 slots + 0/W_WEP/multi-bit/W_ARMOR cases + armcat round-trip both directions all pass.
**Named:** - `wornmask_to_armcat`: none — whole body, no callees, no C callers.
**Next:** generated Open — coverage head after refill.
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
