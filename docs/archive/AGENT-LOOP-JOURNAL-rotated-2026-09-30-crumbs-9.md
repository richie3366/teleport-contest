# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
