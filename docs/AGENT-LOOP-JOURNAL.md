# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-01 — D-3186 restore inventory menu state before actions and preserve equipment command results

**C locus:** whole bodies and every brief reference table read; command registration and prinv caller guards read where needed.
**JS:** js/invent.js:7682 prinv, :7700 doprwep, :7763 doprarm, :7790 doprring, :7825 dopramulet, :7844 doprtool, :7902 doprinuse; js/iactions.js:921 dispinv_with_action. Caller changes in js/do_wear.js:283/:287, js/wield.js:609/:1108/:1110 and js/pickup.js:1190. imports.mjs --can confirmed existing static edges for iactions→invent display_inventory, do_wear→invent prinv and invent→wield empty_handed; no new module edge or top-level read.
**Change:** restarted the affected control flow in C order, retaining signatures. Keep empty alternate headers as empty strings in the existing setter. Restore menu state before searching inventory and invoking the action, return that action's result from the wrapper, and ignore it in each equipment view.
**Verify:** final command `node scripts/verify.mjs --fn doprarm,dispinv_with_action,prinv,doprwep,doprring,dopramulet,doprtool,doprinuse --full`; /tmp/D3186-final-verify.log. No failing sessions to triage. All eight hidden checks report no blocked corpus session (notes, not hidden PASS); coverage rows cite no block count.
**Named:** - `doprarm`: none in the whole body or command registration. Existing local wearing_armor/noarmor/obj_to_let bodies read whole in briefs and reused without new clones.
**Next:** first remaining generated Open coverage row after this invent.c closure; no manual coverage refill or phase-2 work.
## 2026-10-01 — D-3185 restore special-level Lua entry contracts and exact integer conversion

**C locus:** predecessor read whole bodies and caller tables before coding; continuation reread the leftover diff and only targeted caller references needed for this handoff. sp_lev.c lspo_room:4028–4116, build_room:2807–2830, get_table_xy_or_coord:3188–3203, lspo_level_flags:3759–3831, lspo_gas_cloud:4929–4965, lspo_level_init:3837–3875; nhlua.c get_table_mapchr_opt:256–271, check_mapchr:393–398, get_table_int_opt:1028–1039. Pinned upstream bodies are the oracle source.
**JS:** js/mklev.js:1093 lspo_gas_cloud, :1210 build_room, :1835 lspo_room, :20584 lspo_level_flags, :20680 check_mapchr, :20687 get_table_mapchr_opt, :20701 lspo_level_init, :20729 compiled-init adapter, :22569 get_table_xy_or_coord, :23908 compiled-room adapter; js/dungeon.js:335 get_table_int_opt; js/nhlua.js shared conversions. docs/c-js-map/data.md records restored contracts and inherited boundaries.
**Change:** restored table/arity guards, C destination integer narrowing, public room callback tables and C nesting/error order; renamed the existing coder room builder to build_room without duplicating it. Nested compiled builders use the public entry through splev_des_room. Gas clouds validate selections, apply damage and TTL defaults, and return C's zero.
**Verify:** initial continuation command node scripts/verify.mjs --fn lspo_room,build_room,lspo_level_flags,lspo_gas_cloud,lspo_level_init,get_table_mapchr_opt,check_mapchr,get_table_int_opt,get_table_xy_or_coord. No failing sessions to triage; syntax and Rule #2 passed. Each function reported no corpus session blocked at baseline (notes, not hidden PASS); the queued coverage row cites no corpus block count, so no consumed-baseline claim.
**Named:** - lspo_room / build_room: no missing whole-body arm. Lua stack/pcall operations are unpacked JS objects and direct callbacks; throws implement error/panic, GC owns memory.
**Next:** first remaining generated Open coverage row after this closure. Prior stale cnf_line_WIZARDS row retired as a whole handler while build_english_list's D-3184 diagnostic omission remains; ck_server_admin_msg retired by-design because SERVER_ADMIN_MSG is undefined in the pinned build. No manual coverage refill or new FAIL peel.
## 2026-09-30 — D-3184 initialize SYSCF wizard lists and report unsupported portable paths

**C locus:** whole bodies and all reference tables read in briefs; registration sites read by targeted search; mungspaces whole body read to check the formatter boundary.
**JS:** js/cfgfiles.js:664 cnf_line_WIZARDS, :951 cnf_line_PORTABLE_DEVICE_PATHS; js/end.js:2249 build_english_list, :2261 build_english_list_config, :2265 english_list_parts. docs/c-js-map/turns.md updates the retired WIZARDS caller omission and names the remaining diagnostic.
**Change:** added the whole WIZARDS handler in C order, using the already-imported live dupstr and replacing the same sysopt strings (GC implements free). Empty and wildcard values preserve fmtd_wizard_list. Reused one formatter body via english_list_parts and a synchronous config adapter; kept the existing async export/signature and live impossible call.
**Verify:** preflight green + strict PASS on the clean tree after locating installed Node 22 on PATH. Final command: node scripts/verify.mjs --fn cnf_line_WIZARDS,cnf_line_PORTABLE_DEVICE_PATHS,build_english_list --full. git diff --check clean.
**Named:** - `cnf_line_WIZARDS`: end.c:1836 impossible in build_english_list_config only for a nonempty all-isspace value (CR/VT/FF); empty and '*' guards and the returned empty formatted list are exact. The config parser remains synchronous and cannot await the diagnostic's possible nhgetch boundary.
**Next:** first remaining generated Open coverage row; no hand-written coverage refill. Synchronous config diagnostics need an input-boundary caller campaign before retiring the wordless-list omission.
## 2026-09-30 — D-3183 initialize vision before newgame or restore

**C locus:** whole bodies and all reference tables read in briefs; unixmain startup guard/order read around the executable caller.
**JS:** js/vision.js:104 vision_init, :120 view_init; js/jsmain.js:23 import, :197 startup call. game.active_buf mirrors the selected plane for existing JS consumers; game._viz_rmin/_viz_rmax are the existing C bound-pointer representation.
**Change:** added both whole C-shaped exports. Existing typed row arrays implement the C row-pointer aliases directly; vision_init selects the existing current-plane and bound arrays, clears the recalculation flag and both visibility planes, then calls view_init. Wired the sole executable startup caller in C order and corrected the row-alias comment.
**Verify:** clean-tree preflight green + strict PASS after putting the installed Node 22 runtime on PATH. Final command: node scripts/verify.mjs --fn vision_init,view_init --full. git diff --check clean; all verification workers exited.
**Named:** - `vision_init`: none in its whole body or executable caller. Existing cs_buf0/1 and viz_clear row objects are the live C pointer aliases, so no redundant pointer arrays are introduced.
**Next:** first remaining generated Open coverage row shknam.c init_shop_selection; brief and grow its Open callee/same-file cluster. No hand-written coverage refill.
## 2026-09-30 — D-3182 stop initoptions after every fatal startup exit

**C locus:** whole initoptions body and all five references read in brief; scores_only whole C body read in csym.
**JS:** js/options.js:8900 initoptions, :8908 assurance guard, :8915 fatal parse return, :8924 deferred-showpaths return; js/earlyarg.js:63–64 caller; scripts/initoptions-startup.test.mjs:64–125 regression cases; docs/c-js-map/data.md D-3182 omission landmark.
**Change:** preserve the whole existing C-ordered wrapper and add the missing noreturn propagation: return after fatal assurance, return immediately after second-pass nh_terminate, return unconditionally after deferred showpaths. scores_only returns immediately when initoptions exits, before flag reset or prscore. Updated the obsolete no-live-caller comment. All callees remain live exports; no new import edge.
**Verify:** - `initoptions`: clean-tree preflight green/strict PASS (installed Node v24.5.0 added to command PATH). MEASURED `/tmp/D3182-initoptions-oracle.c`: extracted the exact pinned C body, compiled with cc and deterministic callee doubles using setjmp/longjmp for exit; 8/8 cases establish initializer fatal, assurance fatal, second-parse fatal, showpaths noreturn, nontermination, zero-reported-error continuation, successful builtin-phase read and initializer-then-success call order. Checked-in startup regressions 13/13 PASS, including caller-owned error-bracket preservation, no fruit/opt_initial finish mutation after every fatal path, success/nontermination continuation and scores_only preserving exit_status=1.
**Named:** - `initoptions`: no new missing arm in this body or the earlyarg caller. Pre-existing unixmain.c:150 startup adapter skips outer options.c:7093–7112 (second sysconf pass and deferred showpaths), as already named in D-3172.
**Next:** first generated coverage row vision.c vision_init; brief and grow within its C file/callee closure. No hand-written coverage refill.
## 2026-09-30 — D-3181 await were transformation messages before mutation

**C locus:** whole bodies and every reference table read in briefs; caller guards read:
**JS:** js/were.js:141 new_were; js/mhitu.js:3384/:3388 awaited callers; js/mon.js:1204 existing normal_shape now observes the full message continuation; scripts/new-were-message.test.mjs suspension regression.
**Change:** restarted new_were as one async whole body in C order. Await pline before every transformation mutation; then await armor, unwield and monflee sequentially. Use live monsndx, Hallucination, pmname/Mgender, impossible and healmon; expand helpless exactly and truncate the healing division toward zero.
**Verify:** clean preflight green/strict PASS with Node 22 from /tmp/nethack-node22/bin. Final command: node scripts/verify.mjs --fn normal_shape,new_were --reach-all --full (log /tmp/D3181-verify-full.log).
**Named:** - `normal_shape`: none added in the whole body or its caller wiring; its existing new_were await now includes the initial message input boundary.
**Next:** first remaining Must-fix: options.c initoptions fatal-exit continuation (review 2132). Phase-2 parks remain closed.
## 2026-09-30 — audit 2132–2140, D-3172–D-3180

**Review:** nine JS SHAs, oldest first, each review written before the next SHA; 2 QUALITY-RISK, 7 ACCEPT-WITH-DEBT. No JS edits. Must-fix: normal_shape→new_were emits without awaiting the message before mutation; initoptions continues after fatal second sysconf/assure/showpaths. First queue item is the were-message continuation.
**Verify:** each SHA remeasured on its code against its parent with --reach-all; no REGRESSED sessions. Public full sessions 44/44, RNG 792,838/792,838, screens 11,405/11,405; speed 287+1.41/turn (R² .793). Full record found all recordings; final hidden-proxy command was unfiltered score: 648/953 PASS, RNG 96.75%, screens 90.7%, 953 entries, 0 unrecorded, full=true at 20:48:37Z. Committed-baseline comparison: 0 PASS losses/gains. Held-out 13/44, 6,883/11,265 points, RNG 33.6%, screens 61.1%.
**Ledger:** snapshot appended; compiled-out Lift_covet_and_placebc/Unplacebc corrected to by-design. Five seeded ported samples briefed: visctrl, peffect_acid, autokey, yname, makeroguerooms; ordinary branch bodies represented, existing diagnostics/buffer omissions remain documented.
**Next:** ship first Must-fix alone; do not treat the full fortress as proof of unexercised failure/message branches.
## 2026-09-30 — D-3180 option dispatch, menu-color handler and menu-key lookup with cleanup exports

**C locus:** whole bodies and every brief reference table read:
**JS:** js/options.js:6994 handler_menu_colors; :12969 optfn_o_bind_keys; :12991 optfn_o_menu_colors; :13014 optfn_monsters; :13032 map_menu_cmd; :13050 free_autopickup_exceptions; :13069 options_free_window_colors. js/invent.js:3216 shared PICK_NONE remap. Scored diff: 216 insertions/75 deletions across two files, seven C functions.
**Change:** added six complete C-shaped exports and restarted handler_menu_colors in C order. Synchronous option requests stay synchronous; input-bearing do_handler returns the existing async callee promise. Wired option-table pointers, value display and handler dispatch, including C's successful-change marks.
**Verify:** clean preflight green + strict PASS using installed Node 22.22.0 after correcting PATH. Final command `node scripts/verify.mjs --fn optfn_o_bind_keys,optfn_o_menu_colors,handler_menu_colors,optfn_monsters,map_menu_cmd,free_autopickup_exceptions,options_free_window_colors --full`. Tail from /tmp/D3180-verify-final.log: `PASS syntax 2 changed js file(s): js/invent.js js/options.js`; `PASS rule2 no fs/path/url/node: imports, no DIAG/FORCE/seed gates`; `PASS green 2/2 passing`; `PASS strict seed8000-tourist-starter.session.json`; `PASS strict seed0900-tourist-explore-actions.session.json`; `PASS cohort 7/7 passing`; `PASS full 44/44 passing`; `VERIFY: PASS`. git diff --check clean.
**Named:** - `optfn_o_bind_keys`: none in this body or registered callers. Existing live handler_rebind_keys carries its D-2762 binding-parameter/command integration debt; no new clone was added.
**Next:** first regenerated Open coverage head, vision_init; grow its same-file/callee cluster from briefs. Phase-2 parks remain closed.
## 2026-09-30 — D-3179 ball-and-chain breadcrumb unplace and covet placement wrappers

**C locus:** whole bodies and every brief reference read:
**JS:** js/ball.js:562 Unplacebc; :584 Lift_covet_and_placebc. 41 insertions/2 deletions in one scored file. Density exception: these two small wrappers exhaust eligible MISSING/THIN gaps in ball.c; Placebc and Unplacebc_and_covet_placebc are already declared by-design, check_restriction is stale/complete, and the other same-file bodies are live. No unrelated cluster padding.
**Change:** added the two C-shaped async exports beside the existing wrappers, using the existing live cores and restriction check without a new import. Unplacebc clears placement breadcrumbs, sets unplacement breadcrumbs and records caller/line before entering the core, including with a restriction. Lift preserves the exact chain OBJ_FREE guard and restriction/core order; it does not mutate breadcrumbs.
**Verify:** clean preflight green + strict PASS with installed Node 22.22.0 after correcting shell PATH. Final command `node scripts/verify.mjs --fn Lift_covet_and_placebc,Unplacebc --full`. Tail (/tmp/D3179-verify.log): `PASS syntax 1 changed js file(s): js/ball.js`; `PASS rule2 no fs/path/url/node: imports, no DIAG/FORCE/seed gates`; `PASS green 2/2 passing`; `PASS strict seed8000-tourist-starter.session.json`; `PASS strict seed0900-tourist-explore-actions.session.json`; `PASS cohort 7/7 passing`; `PASS full 44/44 passing`; `VERIFY: PASS`. git diff --check clean; no started verifier/replay worker remains running.
**Named:** - `Lift_covet_and_placebc`: none in the released-build body. ball.c:330–338 development paniclog is compiled out by NH_DEVEL_STATUS == NH_STATUS_RELEASED. BREADCRUMBS macro expansion wiring is disabled in the pinned build (config.h:644), so no production caller was invented.
**Next:** first regenerated Open coverage head; Phase-2 parks remain closed.
## 2026-09-30 — D-3178 string-buffer CRLF expansion and bounded Strlen

**C locus:** whole bodies and every reference table read in briefs:
**JS:** js/options.js:11051 strbuf_nl_to_crlf and :11080 Strlen_. 45 js/ insertions in one file. Density exception: the file's eligible absent bodies are these two small functions; its only other eligible THIN body, strbuf_empty, is already complete under GC and was marked stale. Other measured-ok functions are not new Open coverage work; strbuf_reserve is already declared ported. No unrelated file was added to pad the cluster.
**Change:** added both whole bodies beside the existing buffer helpers, with C order, signed-int length arithmetic, NUL termination and unsigned length return. CRLF expansion reserves before moving characters backwards and expands every LF, including an LF already preceded by CR. Strlen_ preserves the exact 32767 failure threshold via a non-returning Error while naming the absent panic subsystem.
**Verify:** clean preflight green + strict PASS using installed Node 22.22.0 after correcting PATH. Final command: `node scripts/verify.mjs --fn strbuf_nl_to_crlf,Strlen_ --full` Tail (/tmp/D3178-verify.log): `PASS syntax 1 changed js file(s): js/options.js`; `PASS rule2 no fs/path/url/node: imports, no DIAG/FORCE/seed gates`; `PASS green 2/2 passing`; `PASS strict seed8000-tourist-starter.session.json`; `PASS strict seed0900-tourist-explore-actions.session.json`; `PASS cohort 7/7 passing`; `PASS full 44/44 passing`; `VERIFY: PASS`. Both per-function reach lines are recorded below. git diff --check clean; no worker started by this iteration remains running.
**Named:** - `strbuf_nl_to_crlf`: none in its whole body or caller closure. Existing in-process JS strings replace C buffer identity/allocation/free; reserve tracks the C capacity.
**Next:** first regenerated Open coverage row after this head leaves. Phase-2 parks stay closed.
## 2026-09-30 — D-3177 packorder and object-class string conversion with obsolete symbol handlers

**C locus:** whole bodies and every reference table read in the briefs:
**JS:** js/options.js:1420 oc_to_str, :1463 optfn_dungeon, :1482 optfn_effects, :1501 optfn_objects, :1520 optfn_packorder, :1542 optfn_traps; js/cfgfiles.js:101 awaited config serialization. 219 js/ insertions across two files.
**Change:** added all six bodies in C order. packorder calls the existing ordering helper and changes the same numeric class array, including C's partial mutation on an invalid value; the optional bag serves standalone rc parsing. The new converter accepts numeric arrays or C byte strings, sign-extends each byte, stops at NUL and uses the live impossible export. Valid conversion remains synchronous; only impossible's input-capable branch resumes the walk through its promise, before consuming another byte.
**Verify:** clean preflight green/strict PASS before changes (Node was initially absent from PATH; installed Node used). Final command: `node scripts/verify.mjs --fn optfn_packorder,oc_to_str,optfn_dungeon,optfn_effects,optfn_objects,optfn_traps --full`:
**Named:** - `optfn_packorder`: none in the whole body or newly wired dispatch/menu/parser paths. change_inv_order and oc_to_str are live. Existing wider options-menu selection ordering and unrelated parser/rc diagnostics remain outside this cluster.
**Next:** generated coverage head after these rows leave; platform-only rows have their compiled-out guards recorded by-design. Phase-2 parks remain closed.
## 2026-09-30 — D-3176 monster iteration, pickup capacity and normal-shape closure

**C locus:** whole bodies and every brief call-site table read:
**JS:** js/monmove.js:242 get_iter_mons_xy, :308 curr_mon_load, :323 max_mon_load, :374 can_carry, :495 mpickstuff; js/mon.js:1204 normal_shape, :251 shared load call; js/dokick.js:496 iterator caller.
**Change:** replaced the local iterator with one live async export using mon_offmap, saved successor identity and signed-16 arguments. A callback may remove both earlier nodes and the current node without skipping the saved successor. Re-port of the carrying closure preserves C branch order, 32767 threshold and rn2(12768), signed-int loads and return values, truncating capacity divisions, and every pickup ownership step.
**Verify:** clean preflight green/strict PASS using Node 22.22.0 in /tmp/nethack-node22/bin. `node scripts/verify.mjs --fn get_iter_mons_xy,mpickstuff,can_carry,curr_mon_load,max_mon_load,normal_shape`:
**Named:** - `get_iter_mons_xy`: none in the whole body or sole caller. JS represents the linked fmon list as an array of monster identities; message callback requires await.
**Next:** generated coverage queue after removal of this head and stale rows; phase-2 parks remain closed.
