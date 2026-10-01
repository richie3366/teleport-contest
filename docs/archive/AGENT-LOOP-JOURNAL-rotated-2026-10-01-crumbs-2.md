# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
