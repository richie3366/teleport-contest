# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-30 — D-3152 `cfgfiles.c` config-error drain + sysconf stores + statement heed + default configfile (coverage)

**C locus:** - `l_get_config_errors`: cfgfiles.c:1516–1539 (head→tail drain `:1524–1536`, per-entry line+error table `:1525–1530`, free + head-null `:1531–1537`, return 1 `:1539`).
**JS:** js/cfgfiles.js:278 (`l_get_config_errors`, exported — extern.h decl), js/cfgfiles.js:710 (`cnf_line_DEBUGFILES`, module-local — C staticfn; table row :928), js/cfgfiles.js:721 (`cnf_line_BONES_POOLS`, module-local; table row :931), js/cfgfiles.js:986/997 (heed/disregard_this, exported — extern.h decls), js/options.js:744 (`get_default_configfile`, exported — extern.h decl).
**Change:** new exported `l_get_config_errors` in C order returning the drained `[{line, error}]` array (Lua-table sink adapted: no JS Lua state, D-3098 precedent; by-design nhl_add_table_entry_* effects inlined as the entry shape; free ≡ GC); new file-local `cnf_line_DEBUGFILES` (env gate over live `cnf_store_str` — Rule #2 keeps env_dbgfl 0 so the store arm runs) and `cnf_line_BONES_POOLS` (parseInt atoi + clamp, CHECK_SAVE_UID precedent), both wired into `configLineStmt` in place of the lambdas; new exported heed/disregard_this over `disregardedConfigLines` (59-row C-order table verified index-compatible: 20 + 28 SYSCF + 7 + 4 QT, USER_SOUNDS omitted both sides); new exported `get_default_configfile` in js/options.js next to `get_configfile`. Refreshed the two comments that named the drain as omitted. New scripts/cfgfiles-config-lines.test.mjs (5 tests; fails pre-fix on the missing exports).
**Verify:** - `l_get_config_errors`: `verify.mjs --fn` → no corpus session blocked (coverage row) + smoke-spread REACH-OK (24/24 PASS).
**Named:** - `l_get_config_errors`: lua registration sink (nhlua.c:1887; no Lua state in ESM — the export returns the table as a JS array); nhl_add_table_entry_int/str by-design, effects inlined.
**Next:** pop the next Open — coverage row (same-file WIZARDS fmtd arm needs async build_english_list — sync-parser boundary, future row; GDBPATH/GREPPATH PANICTRACE file_exists gates unportable under Rule #2).
## 2026-09-30 — D-3151 `options.c` parsebindings restart + bind_specialkey + versinfo gacc (coverage)

**C locus:** - `parsebindings`: options.c:7596–7674 (static mousebtn_names `:7602–7604`, quote-aware comma scan `:7606–7619`, tail-first recursion `:7620–7626`, first-colon split `:7628–7631`, trimspaces `:7633`, mouse arm `:7635–7642`, txt2key `:7644–7649`, special-key `:7651–7653`, menu arm `:7655–7666`, extcmd `:7668–7672`).
**JS:** js/options.js:943 (`parsebindings`), js/options.js:1012 (`overlay_bind_key`, module-local — the adapted bind_key call), js/cmd.js:1854 (`bind_specialkey`, exported — cmd.c extern), js/cmd.js:1803 (SPKEYS_BINDS name column), js/options.js:3271 (versinfo `gselector: '4'`).
**Change:** restarted `parsebindings` in C order — separator scan with `\\,`/`','` skip, tail-first recursion with ret aggregation, first-colon split (missing colon returns FALSE outright), untrimmed key strcmp for the mouse arm with C's fall-through on bind failure, live `txt2key`/`bind_mousebtn`/`bind_specialkey`/menu-alias calls, extcmd miss → error + ret; new module-local `overlay_bind_key` runs the bind_key `:2661–2728` match flow (`nothing`, C-exact paren cut, INTERNALCMD skip, CMD_PARAM error arms into the live sink, params stored live, param clears on rebind/unbind) over the pre-existing outMap overlay. Added the C name column to SPKEYS_BINDS + exported `bind_specialkey` in C order after it. Fixed the versinfo gacc to `'4'`; refreshed three comments that claimed the old omissions (cmd.js bind_mousebtn callers, cmd.js get_changed_key_binds emitter, dokeylist.js header).
**Verify:** `node scripts/verify.mjs --fn parsebindings,bind_specialkey,handler_versinfo` → VERIFY: PASS (syntax 3 files; Rule #2; hidden: no corpus session blocked on any at baseline; REACH-OK × 3 via fixed smoke spreads 24/24; green 2/2; strict × 2; cohort 7/7; full 44/44 incl. seed2600-wizard-custom-binds). `node --test scripts/parsebindings.test.mjs` 22/22; neighbor suites (get-changed-key-binds, bind-mousebtn, txt2key, rebind-keys) 44/44.
**Named:** - `parsebindings`: none missing — every arm ported; the outMap overlay (pre-existing D-0897/D-2550 architecture, read over defaults at key resolution) stands in for live cmdbind_add in the extcmd arm only; config_error_add text stays the pre-existing void sink (botl.js).
**Next:** pop the next Open — coverage row (same-file `handler_whatis_filter`/`optfn_map_mode` remain for a later cluster).
## 2026-09-30 — D-3150 `sounds.c` sound-effect filename automap (coverage)

**C locus:** - `get_sound_effect_filename`: sounds.c:1994–2080 (null/dir guard `:2008`, lazy init `:2011–2014`, baselen `:2016–2017`, consumes `:2019–2040`, `#if 0` Strcat `:2043–2059` compiled out, Snprintf build `:2060–2077`, return `:2079`).
**JS:** js/sounds.js:420 (`semap_basenames`), js/sounds.js:429 (`initialize_semap_basenames`, module-local — C staticfn), js/sounds.js:450 (`get_sound_effect_filename`, exported — extern.h decl), js/generated/seffects_data.js:204 (`se_mappings_init`).
**Change:** extended scripts/extract-seffects.py to emit `se_mappings_init` (198 rows: index 0 `{ seid: 0, '' }` per `:1972`, entries 1..197 in enum order) and regenerated js/generated/seffects_data.js; added module state (`semap_basenames` `:1977`, `basenames_initialized` `:1978`) + both functions in C order in js/sounds.js, reusing the live `sounddir`/`sff_*` module consts; new scripts/seffects-automap.test.mjs (6 tests).
**Verify:** - `get_sound_effect_filename`: `verify.mjs --fn` → no corpus session blocked (coverage row) + smoke-spread REACH-OK (24/24 PASS); /tmp probe 20/20 on C-computed strings/gates (incl. cap-exact 9/8 and 15/14, trailing-slash/backslash, existinglen>=cap).
**Named:** - `get_sound_effect_filename`: none — whole body (the `:2043–2059` `#if 0` Strcat block is compiled out, not ported; the out-of-range-id read is JS-only totality — C UB, same NULL via the `:2040` gate).
**Next:** pop the next Open — coverage row.
## 2026-09-30 — D-3149 `cmd.c` suspend/shell + extcmd-match family (coverage)

**C locus:** - `dosuspend_core`: `cmd.c:5661–5678` (SUSPEND-defined capability branch `:5666`, urealtime accounting `:5667–5670`, `dosuspend()` `:5672`, retime `:5673`, Norep else `:5676`, ECMD_OK `:5677`).
**JS:** `js/cmd.js:1352` (`cmdnotavail`), `:1361` (`win_can_suspend`), `:1376` (`dosuspend_core`), `:1400` (`dosh_core`); `js/getline.js:1247` (`shell` entry), `:1260` (`suspend` entry), `:1377` (`extcmds_getentry`), `:1398` (`extCmdAutocomplete` rewire); `js/generated/extcmdlist_data.js` (170 entries); `scripts/extract-extcmdlist.py` (flags + docstring).
**Change:** new `dosuspend_core`/`dosh_core` in C order over live `getnow`/`timet_delta`/`game.urealtime` + new `cmdnotavail` (`:160`) + `win_can_suspend()` (false here — tty answers `genl_can_suspend_yes`, ESM has no SIGTSTP); `dosh` live arm falls back to C's own !SHELL text since the subshell call is the omission. Wired both C table callers via `EXT_CMDS` `shell`/`suspend` runners (key + `#` dispatch flow through `extcmd_run_by_txt`). Rewired `extCmdAutocomplete` through live `extcmds_match(base, ECM_NOFLAGS)` + new `extcmds_getentry`; deleted dead `EXT_CMD_AC`/`availableAcNames` (−63).
**Verify:** `verify.mjs --fn dosuspend_core,dosh_core,extcmds_match,extcmds_getentry,cmdbind_remove` → syntax PASS (3 js files), Rule #2 PASS, 5× `no corpus session blocked` + smoke-spread REACH-OK (24/24 each), green 2/2, strict 2/2, cohort 7/7, VERIFY PASS; full `sessions` 44/44 after the regen (seed4500 failed 1802/1814 pre-regen at `#wizm` echo screens 778/804/820, fixed by the DEBUG rows); `node --test scripts/extcmd-debug-completion.test.mjs` 4/4 + `vision-wizmondiff-runners` 3/3; /tmp oracle vs git-HEAD hand list: identical except the 4 C-wrong removals (travel + 3 DEBUG rows, all confirmed against C guards).
**Named:** - `dosuspend_core`: `dosuspend()` (`cmd.c:5672`, `sys/share/ioctl.c:161`, SIGTSTP suspend) unportable under Rule #2; the suspend arm keeps C order with the call named in place.
**Next:** `#wizbury` exact entry prints "unknown extended command" (EXTCMDLIST row now resolves, no EXT_CMDS runner — `wiz_debug_cmd_bury` unported); queue it with its body when coverage reaches it. `bind_key` `:2651`/:2718 `cmdnotavail` arms (pre-existing port) could reuse the new `cmdnotavail` const.
## 2026-09-30 — D-3148 `spell.c` remainder: spelltypemnemonic impossible arm + dowizcast/show_spells/book_substitution (coverage)

**C locus:** - `spelltypemnemonic`: `spell.c:832–853` (7 skill arms, default impossible-then-"" `:852–853`).
**JS:** `js/spell.js` only — spelltypemnemonic `:499`, SPELLMENU_DUMP `:270`, show_spells `:1645`, book_substitution `:1805`, dowizcast `:1948`; no new imports (all edges already present).
**Change:** default arm now `void impossible('Unknown spell skill, %d;', skill)` then `return ''` (fire-and-forget keeps it sync, dungeon.js correct_branch_type precedent); added `SPELLMENU_DUMP = -3` + DUMP heading unindent in dospellmenu (C `:2104`; PICK_ONE key flow already DUMP-correct, return ignored per nhUse); new `show_spells`/`book_substitution`/`dowizcast` in C order over live in-file/imported callees (dowizcast menu via the dospellmenu corner-menu pattern; OBJ_NAME ≡ objectNameStrs like spellname()).
**Verify:** `node scripts/verify.mjs --fn spelltypemnemonic,dowizcast,show_spells,book_substitution,age_spells,spell_idx` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `spelltypemnemonic`: none — whole body, sole callee live (impossible).
**Next:** pop the next Open — coverage row.
## 2026-09-30 — D-3147 `invent.c` display_cinventory restart + cinv_ansimpleoname (coverage)

**C locus:** - `display_cinventory`: `invent.c:5446–5473` (safe_qbuf title `:5453–5457`, cobj → query_objlist INVORDER_SORT/PICK_NONE/allow_all `:5459–5461`, empty → invdisp_nothing + n=0 `:5462–5464`, n>0 selected[0] `:5466–5470`, cknown `:5471`, return `:5472`).
**JS:** `js/invent.js` only — `cinv_ansimpleoname` `:4576`, `display_cinventory` `:4603`; import names added on existing objnam.js/pickup.js edges (`imports.mjs --can`: ALREADY).
**Change:** restarted `display_cinventory` in C order over live `safe_qbuf(null, 'Contents of ', ':', obj, cinv_doname, cinv_ansimpleoname, 'that')` (same-module edge, already imported from objnam.js) and live `query_objlist(qbuf, items, INVORDER_SORT, PICK_NONE, allow_all)` (pickup.js edge, already imported); chain order into an array; `n>0 → pick_list[0].obj else null`; kept the split `invdisp_nothing` inline (hdr/''/'(empty)' PICK_NONE) and `obj.cknown = 1`. New module-local `cinv_ansimpleoname` in C order over live `ansimpleoname`/`strsubst`, keeping the mismatch-fired `strncmp` arms verbatim (no `!` in C) and spelling the empty-orig arm as an explicit prepend (C `strstr(bp,"")` hits; JS `strsubst` no-ops on empty orig).
**Verify:** `node scripts/verify.mjs --fn display_cinventory,cinv_ansimpleoname` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `display_cinventory`: none — whole body, every callee live (safe_qbuf, query_objlist, allow_all) or ledger-split inline (invdisp_nothing).
**Next:** pop the next Open — coverage row.
## 2026-09-30 — D-3146 `options.c` msgtype_parse_add error arms + sscanf fidelity (coverage)

**C locus:** - `handler_disclose`: `options.c:5674–5777` (category PICK_ANY `:5696–5714`, per-category PICK_ONE `:5717–5771`, v/g `#`+`?` rows, n>1 keep-second `:5769–5770`) — stale, body complete.
**JS:** `js/options.js` only — msgtype_parse_add `:693` (+doc `:688–692`).
**Change:** restarted `msgtype_parse_add` in C order: `if (m)` keeps the hit path, miss arm calls live `config_error_add("Unknown message type '%s'")` (`:7860`), else arm calls `config_error_add('Malformed MSGTYPE')` (`:7862`), `return false` (`:7864`); class is now `{1,255}` per `%255[^"]`. 8-case node probe (hit/unknown/empty-pattern/garbage/long-token/unterminated) all C-agreeing.
**Verify:** `node scripts/verify.mjs --fn handler_disclose,all_options_msgtypes,handler_align_misc,msgtype_parse_add,determine_ambiguities` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared-file change).
**Named:** - `handler_disclose`: n>1 keep-second pick (`:5769–5770`) folded into select_menu_pick_one; nul_glyphinfo; sinks (D-2788/R1747, unchanged).
**Next:** pop the next Open — coverage row.
## 2026-09-30 — D-3145 `dungeon.c` branch-type default arm + mapseen traverse stale (coverage)

**C locus:** - `correct_branch_type`: `dungeon.c:439–454` (TBR_STAIR/NO_UP/NO_DOWN/PORTAL `:443–450`, impossible + BR_STAIR default `:452–453`).
**JS:** `js/dungeon.js` only — correct_branch_type `:497` (+cite comment `:494–496`, impossible `:504`).
**Change:** default arm now `void impossible('correct_branch_type: unknown branch type')` then `return BR_STAIR` in C order (live `display.js` export, already imported `:154`; void-fire keeps the predicate sync — `In_W_tower` `:1289` / `mkobj.js` precedent).
**Verify:** `node scripts/verify.mjs --fn correct_branch_type,traverse_mapseenchn` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `correct_branch_type`: none — whole body, every callee live.
**Next:** pop the next Open — coverage row.
## 2026-09-30 — Audit 2096–2104 (D-3136..D-3144): 9 ACCEPT; full cadence

Reviews 2096–2104 audit 92b27a5b5..dbe017e06 against pinned C (quit cluster, botl hilite
closure, glyphrep pair closing 1510 Debt 1, lspo des bindings, takeoff pair, attrib pair,
wizcmds septet, quest quartet, there-menu trio). All corpus claims re-measured with
--reach-all (all vacuous + REACH-OK, no REGRESSED). No Must-fix — queue stays empty.
Observations (not queued): 2098 map mega-lines still name match_glyph/glyphrep (stale as to
these two); seeded sample 5/5 live (pet_ranged_attk cmd.c:941 caller is map-named under
domonability; shuffle_customizations `c` cites the dead #if 0 arm — inventory-level, `set`
recomputes the same range and would clobber `seed@`, so left for an inventory fix).
Cadence: public 44/44, corpus 648/953 (0 flips, full:true), held-out 13/44 flat.
Ledger snapshot + 5/5 seeded-ported sample live (0 fixed).
## 2026-09-30 — D-3144 `cmd.c` there-menu trio: next2u + far builders, whole-menu restart (coverage)

**C locus:** - `there_cmd_menu_far`: `cmd.c:4623–4636` (CLICK_1 `:4628`, linedup+dist2 throw `:4629–4631`, travel `:4633`).
**JS:** `js/cmd.js` only — next2u `:3072`, there_cmd_menu_next2u `:3089`, there_cmd_menu_far `:3182`, there_cmd_menu `:3232`.
**Change:** new module-local `next2u` (you.h:558 macro, squared dist2, no isok guard like C); new `there_cmd_menu_next2u` in C order over live exports (carrying/t_at/m_at/x_monnam/mon_nam/upstart/glyph_at/glyph_is_invisible_id/canspotmon/dist2 + has_mgivenname/W_SADDLE/D_ISOPEN consts + can_saddle on the existing steed edge; levl glyph ≡ remembered_glyph per detect.js; C `int *act` ≡ actOut box); new `there_cmd_menu_far` over live linedup (new SAFE mthrowu edge) + dist2; restarted `there_cmd_menu` whole in C order (test_move awaited, move_funcs[dir][MV_WALK] ≡ move_funcs_walk, travelcmd ≡ flags.travel default-On, pickAct ≡ npick/picks); deleted the dead `act_on_act_here` shim (sole caller was the menu); added which_armor (new SAFE worn edge).
**Verify:** `node scripts/verify.mjs --fn there_cmd_menu_far,there_cmd_menu_next2u,there_cmd_menu` → VERIFY: PASS (syntax 1 file; rule2; green 2/2; strict ×2; cohort 7/7).
**Named:** - `there_cmd_menu_far`: none — whole body, every callee live.
**Next:** pop the next Open — coverage row.
