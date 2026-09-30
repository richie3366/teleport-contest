# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-09-30 — D-3143 `questpgr.c` quest-artifact search + pline delivery quartet (coverage head + same-file THIN siblings)

**C locus:** - `find_quest_artifact`: `questpgr.c:88–120` (INVENT `:94–95`, FLOOR `:96–97`, MINVENT fmon loop `:98–103`, MIGRATING mons+objs `:104–115`, BURIED `:116–117`).
**JS:** `js/quest.js` (find_qarti `:131`, find_quest_artifact `:160`), `js/questpgr.js` (deliver_by_pline export `:1043`), `js/do.js` (deliver_splev_message wiring `:2278`).
**Change:** restarted both quest.js functions in C order over live in-file `is_quest_artifact` (C `:66–70`) + `Has_contents` (const.js); added OBJ_INVENT/OBJ_MIGRATING imports (same const.js edge); restarted `deliver_by_pline` over live eos/copynchars/convert_line/pline and exported it; wired `do.js` `deliver_splev_message` to the live export (inline clone deleted, now-unused `convert_line` import dropped); `skip_pager` verified whole, no diff.
**Verify:** `node scripts/verify.mjs --fn find_quest_artifact,find_qarti,deliver_by_pline,skip_pager` → VERIFY: PASS (syntax 3 files; rule2; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared-file change).
**Named:** - `find_quest_artifact`: none — whole body, every callee live (DEADMONSTER ≡ mhp<1 per monst.h:214; invent/fmon/migrating_mons arrays per D-1691/dog.js).
**Next:** pop the next Open — coverage row.
## 2026-09-30 — D-3142 `wizcmds.c` wizard-debug septet: telekinesis + detect/load_lua/load_splua/panic/fuzzer/nhuuid (coverage head + same-file MISSING siblings)

**C locus:** - `wiz_telekinesis`: `wizcmds.c:494–528` (getpos `:504` + cancel `:505–506`, m_at-assign test `:508`, getdir `:510–511`, mhurtle `:514` + landing re-seed `:515–517`, hero hurtle `:520–521`, utotype loop `:524`).
**JS:** - `wiz_telekinesis`: js/wizcmds.js:540 (cc init, pline, do/while; `:508` assign-ahead-of-test kept; `(mhp|0) >= 1` ≡ !DEADMONSTER).
**Change:** `js/wizcmds.js` — 7 new `export async` fns in C order (detect/load_lua/load_splua before `wiz_flip_level`, telekinesis/panic/fuzzer after it, nhuuid before `wiz_mon_diff`); new names on live edges (getdir, y_n, UTOTYPE_NONE, fuzzer_impossible_*) + 2 new SAFE edges (dothrow mhurtle/hurtle, detect findit); `load_special`/`lspo_finalize_level(false)` via dynamic mklev import (D-3131 cycle precedent). `js/getline.js` — 7 EXT_CMDS runners with C flags (autocomplete iff C AUTOCOMPLETE). `js/mklev.js` — 2 doc lines now point at the live `wiz_load_splua` site.
**Verify:** `node scripts/verify.mjs --fn wiz_telekinesis,wiz_detect,wiz_load_lua,wiz_load_splua,wiz_panic,wiz_fuzzer,wiz_show_nhuuid` → syntax PASS (3 files) · rule2 PASS · 7× hidden-note (no corpus session blocked) + REACH-OK (fixed smoke spread 24/24 each, no RNG-tagged reach — wizard-debug, unreachable in scored sessions) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (shared file changed) → VERIFY: PASS.
**Named:** - `wiz_telekinesis`: none — whole body, every callee live.
**Next:** falsifier — a session blocked with any of the 7 as owner, or `#`-command behavior vs C in wizard mode. Do not re-pop the 8 stale proofs above (ledger notes carry the JS sites).
## 2026-09-30 — D-3141 `attrib.c` restore_attrib + postadjabil (coverage head + same-file MISSING sibling)

**C locus:** - `restore_attrib`: `nethack-c/upstream/src/attrib.c:455–484` (equilibrium `:472–473`; countdown `:474–475`; step+botl `:476–477`; retimer `:478–479`; encumber_msg `:483–484`; zero C call sites — dead since the moveloop call was dropped).
**JS:** `js/attrib.js` (+65/−3: restore_attrib `:752`; postadjabil `:996`; adjabil gate `:1060`).
**Change:** `js/attrib.js` only — new exported async `restore_attrib` (`:752`) in C order (Wounded_legs macro inlined per the allmain/apply precedent, `u.uhs >= WEAK` per apply.js:799, `--ATIME` countdown, ATEMP step toward 0, `Math.trunc(100/acurr(A_CON))` retimer, live `disp.botl` read before `encumber_msg` like C `:483`); new local `postadjabil` (`:996`, C staticfn → local like `check_innate_abil`, pointer identity → prop-field compare); wired into the `adjabil` loop (`:1060`) behind `prev !== (u[prop] || 0)` ≡ C `:1063`. `WEAK` added to the const.js import, `see_monsters` to the existing display.js import (same edge, no new module dependency); `encumber_msg` via the file's existing dynamic-import idiom (avoids an invent cycle); dropped the two stale deferral comments. Stale siblings `vary_init_attr` (`:640`, caller `js/u_init.js:2025`) and `check_innate_abil` (`:1098`, callers `:1124`/`:1126`, hum_abil empty in C) set ported directly with notes.
**Verify:** - `restore_attrib`: `note hidden verify restore_attrib: no corpus session blocked on it at baseline`; `PASS reach restore_attrib: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`.
**Named:** - `restore_attrib`: none — whole body, every callee live (in-file `acurr`; `encumber_msg` via dynamic invent.js import).
**Next:** next coverage head from the regenerated block (post-`restore_attrib`).
## 2026-09-30 — D-3140 `do_wear.c` takeoff pair (dotakeoff uskin/ECMD_CANCEL + wornarm_destroyed cancel_don/live-useup)

**C locus:** - `dotakeoff`: `nethack-c/upstream/src/do_wear.c:1833–1855` (uskin arm `:1840–1844` + assert `:1839`; ECMD_OK `:1847`; ECMD_CANCEL `:1851–1852`).
**JS:** `js/do_wear.js` (+37/−37: dotakeoff `:2076`, wornarm_destroyed `:4032`); `js/cmd.js` (+4/−3: 'T' arm `:5310–5315`).
**Change:** `js/do_wear.js` — `dotakeoff` gains the uskin arm in C order (`game.u.uskin`, live `pline_The` already imported, `GRAY_DRAGON_SCALES` const at `:166`, assert kept as a comment), `return ECMD_OK` / `return ECMD_CANCEL` (added to the const.js import — same module, no new edge); `wornarm_destroyed` gains `if (donning(wornarm)) cancel_don()` with the C comment (both live in-file sync) and calls live `useup` (invent.js export, already imported and used at `:2988`); deleted the now-unused `invent_useup` clone; dropped the stale `cancel_don` omit from the `disintegrate_arm` doc. `js/cmd.js` — `rhack` 'T' arm now uses the `(res & ECMD_TIME)` bitmask like the 'A'/'d'/'D' siblings so ECMD_CANCEL (0x02) cannot read as took-time. No new cross-module import; Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node scripts/verify.mjs --fn dotakeoff,wornarm_destroyed` → PASS syntax (2 changed: js/cmd.js js/do_wear.js) · PASS rule2 · hidden note ×2 (0 blocked — normal for coverage rows) · PASS reach ×2 (no RNG-tagged reach; fixed smoke spread 24/24 each → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS; plus full `node frozen/ps_test_runner.mjs sessions` → 44/44 (RNG + screens exact). Preflight `verify --no-cohort` before edits likewise PASS.
**Named:** - `dotakeoff`: none — whole body, every callee live (count_worn_stuff/pline_The/pline/getobj/armor_or_accessory_off).
**Next:** breadth queue continues from the regenerated block; note (not a row): sibling `doremring` has the same `!otmp → 0` shape where C `:1885–1886` returns ECMD_CANCEL — left untouched (not Open, 'R' arm still boolean-consistent).
## 2026-09-30 — D-3139 `sp_lev.c` stair/altar/grave des-binding closure (l_create_stairway gap + lspo_stair/ladder/grave/altar) + 7 stale proofs

**C locus:** - `l_create_stairway`: `nethack-c/upstream/src/sp_lev.c:4147–4213` (`:4159` coder guard; `:4161–4177` table/string Lua parse; `:4180–4191` RANDOM scoord + set_ok_location_func(good_stair_loc) + get_location_coord DRY + reset NULL; `:4192–4195` deltrap + SpLev_Map; `:4197–4213` ladder dest + mkstairs force).
**JS:** `js/mklev.js` (+105 after `l_create_stairway`, C-relative order :4223/:4232/:4243/:4283); `js/engrave.js` (+1/-1 NULL-edge).
**Change:** `js/mklev.js` only (+105, all in-file): `l_create_stairway` gains `create_des_coder()` (`:4159`) plus a comment recording that the ok_fn params are the set/reset emulation (C `:1287–1288` replaces the humidity checks, exactly like the `ok_fn ||` default in `get_location_random` — verified, not assumed); new exports `lspo_stair`/:22856 + `lspo_ladder`/:22865 (unpacked passthroughs with C defaults down/random, `return 0` per lspo_trap); `lspo_grave`/:22885 in C order (number-first-arg triple via live `luaL_checkinteger_unpacked`, else table form with object check, live `get_table_xy_or_coord`, text NULL/string plus zero-arg function pcall per nhlua.c:1064-1066, `get_location_coord` DRY RANDOM-when-(-1,-1) idiom, isok + `!t_at` → GRAVE + `make_grave`); `lspo_altar`/:22935 in C order (table-only, live `get_table_align_unpacked` + `splev_opt_index` over shrines/shrines2i, fields straight into the D-2990 `splev_create_altar` split port — shrine always 0/1/2, never the -1 rn2 case). `js/engrave.js` (+1/-1): `if (!text)` → `if (text == null)` with the C cite — all 7 live callers pass null or non-empty strings (checked), so behavior-preserving outside the "" edge. No new cross-module edge (make_grave/t_at/isok/GRAVE already imported); Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node scripts/verify.mjs --fn l_create_stairway,lspo_stair,lspo_ladder,lspo_grave,lspo_altar` → PASS syntax (2 changed: js/engrave.js js/mklev.js) · PASS rule2 · hidden note ×5 (0 blocked — normal for coverage rows) · PASS reach ×5 (no RNG-tagged reach; fixed smoke spread 24/24 each → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) → VERIFY: PASS. Preflight `verify --no-cohort` before edits likewise PASS.
**Named:** - `l_create_stairway`: Lua argc table/string parse (loaders pass unpacked dir/coord — pre-existing doc note, kept); set_ok_location_func NULL reset (no JS global; ok_fn params are the emulation).
**Next:** breadth queue continues from the regenerated block (dotakeoff head after the stale pops).
## 2026-09-30 — D-3138 `glyphs.c` glyphrep + match_glyph ports, parsesymbols G_ arm wired (coverage head)

**C locus:** - `glyphrep`: nethack-c/upstream/src/glyphs.c:470–481 (no-cache debugger arm :474–475, nhUse :476, custom-map call :477, 1/0 tail :478–480).
**JS:** js/glyphs.js `match_glyph` + `glyphrep` (NO_GLYPH added to the existing display.js import); js/options.js:196 import + :10937 call-site comment + parsesymbols doc omits updated.
**Change:** ported both functions whole in C order into js/glyphs.js (C-order slot right after `glyphid_cache_status`, mirroring C :454/:458/:470); wired the options.js G_ arm through the existing glyphs.js import (same edge, one added name — no new module edge, call-time use only).
**Verify:** `node scripts/verify.mjs --fn match_glyph,glyphrep` → VERIFY: PASS (syntax 2 files; rule2; hidden note no baseline blocks, expected for coverage; REACH-OK both — no RNG-tagged reach, smoke spread 24/24 PASS; green 2/2; strict both; cohort 7/7; full 44/44 auto on shared-file change). Smoke probe /tmp/glyphrep-probe.mjs: unknown id → glyphrep 0, match_glyph 0, parsesymbols FALSE (C `:829`).
**Named:** - `glyphrep`: none — whole body, every callee live (`glyphrep_to_custom_map_entries` D-3002; `:476` nhUse lint no-op elided with cite; `&glyph` box discarded like C's unread out-param).
**Next:** parse_sym_line symbols.c:438+ when it surfaces as a coverage row (carries the :486 match_glyph caller); review 1510's single Debt item is now fully wired (both bare callees live — no stamp: Debt, row cited no review).
