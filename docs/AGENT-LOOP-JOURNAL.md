# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-01 — D-3194 `dog.c` mon_arrive With_you completion (live mnexto + awaited placement + link nmon)

**C locus:** `nethack-c/upstream/src/dog.c:419–623` (`mon_arrive`; With_you `:466–479`, link `:430–442`); `mon.c:3955–3983` (`mnexto`: usteed sync, enexto/isok fail → `deal_with_overcrowding`, mon_telecontrol, `rloc_to_flag(mm, rlocflags)`); callers dog.c `:371/:383/:397` (losedogs), wizard.c `:748` (resurrect, −1 = Wiz_arrive).
**JS:** `js/dog.js:43` (mnexto import), `:794` (link nmon), `:818` (with_you live mnexto + awaits).
**Change:** `js/dog.js` only — With_you else-branch now `await mnexto(mtmp, RLOC_NOMSG)` (live `js/mon.js:2054` export: C-exact fail arm, telecontrol, flags; dog→mon edge ALREADY, name added to the existing import — `imports.mjs --can` clean); rn2-gate branch `await rloc_to(...)` (rloc_to already imported, async); link sets `mtmp.nmon = game.fmon[0] || null` before unshift (C `:431–432`). No DIAG/FORCE/seed logic; Rule #2 clean. mnearto_no_yank re-verified against the live mnearto FALSE path (identical: early-out, goodpos/enexto/isok, rloc_to_flag, no recurse) — kept, not re-pointed (drop-in would add the move_other dead arm).
**Verify:** `node scripts/verify.mjs --fn mon_arrive --reach-all` → PASS syntax (1 file: js/dog.js) · rule2 · hidden note (0 blocked at baseline) · **reach 142/142 PASS, 0 regressed → REACH-OK** · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. (Repo keeps no tests/ harness — sessions + verify are the regression mechanism; no new framework per skill.)
**Named:** none in this body. D-2459 family items re-attributed to their true owners (not mon_arrive C): losedogs kops-dismiss scan (dog.c:310–356, losedogs's body); full mnearto yank (mnearto move_other=TRUE path — mon_arrive always passes FALSE, C :611); resurrect SetVoice + Deaf acoustics (wizard.c:730–756, resurrect's body).
**Next:** Open — coverage head after mon_arrive (`objnam.c` readobjnam THIN).
## 2026-10-01 — D-3193 close lspo_room→get_table_roomtype_opt validation/diagnostic closure

**C locus:** - `get_table_roomtype_opt`: sp_lev.c:4003–4020 — reads via get_table_str_opt (:4006), case-insensitive room_types[] scan (:4009–4013), synchronous impossible (:4015–4016).
**JS:** js/mklev.js get_table_roomtype_opt:23654 (restarted), lspo_room:1835, lspo_region:2129, splev_des_room:23914, splev_build_room:23866. Export names kept (async added).
**Change:** reader restarted on canonical get_table_str_opt (dungeon.js, already imported) with `''` emptystr default; unknown arm awaits impossible; async propagated through the full caller closure so the diagnostic completes before room RNG and callbacks — 21 defs async (reader + 2 entries + 2 adapters + 9 load_* + nested_room/nesting_contents + 5 themeroom contents fns), await at 85 splev_des_room + 6 themeroom_nested_room + 12 nest() + 6 themeroom dispatch + 8 inner sites, 7 contents/nest arrows async, contents invocations awaited in both entries (C pcall completes before spo_endroom). All 9 load_* callers already thenable-tolerant (`if (isThenable(p)) await p`); themeroom dispatches land in async themerooms_generate; mklev.js holds the only try blocks (both in already-async fns) and the three entries have no other JS callers. The mechanical closure was applied by assert-or-abort /tmp/roomtype-patch.cjs (kept out of the repo).
**Verify:** /tmp/roomtype-probe.mjs (missing/empty→defval, string/function equivalence, type=true/5/function→boolean all reject /no string/, three entries AsyncFunction) — all assertions passed. No maintained unit harness exists in-repo (no tests/ dir), so the probe plus the fortress below is the evidence. `node scripts/verify.mjs --fn get_table_roomtype_opt,lspo_room,lspo_region`:
**Named:** - `get_table_roomtype_opt`: none.
**Next:** none for this closure; breadth queue continues.
## 2026-10-01 — D-3192 restore mpickstuff verbose default-ON gate

**C locus:** - `mpickstuff`: mon.c:1847–1910; whole body read in brief output; the message gate is `if (flags.verbose)` at :1898 with `flags.verbose` decl-initialized TRUE.
**JS:** js/monmove.js:537 mpickstuff gate. Same export name and signature retained.
**Change:** restored `game.flags?.verbose !== false` in `mpickstuff` with a C-citing comment. No new imports, runtime filesystem, RNG/frame alignment or recorded-input gates.
**Verify:** no failed sessions to triage. `node scripts/verify.mjs --fn mpickstuff` completed with this actual tail:
**Named:** - `mpickstuff`: none added; restores the D-3176 body to the C gate.
**Next:** pop the next Must-fix row (review 2145 roomtype validation/diagnostic closure).
## 2026-10-01 — D-3191 restore prinv verbose default-ON gate plus inventory hardening

**C locus:** - `prinv`: invent.c:2875–2890; whole body read in brief output; the suffix gate is `flags.verbose ? totalbuf : ""` at :2889 with `flags.verbose` decl-initialized TRUE.
**JS:** js/invent.js:7694 prinv gate; js/iactions.js:958 post-menu scan guard; js/invent.js:7864 doprtool -1 guard. Same export names and signatures retained.
**Change:** restored `game.flags?.verbose !== false` in `prinv` with a C-citing comment; restored the `o &&`-class guard (`otmp &&`) in the `dispinv_with_action` post-menu scan; `doprtool` now ends iteration (`undefined`) when `indexOf` returns -1 instead of restarting at the head. No new imports, runtime filesystem, RNG/frame alignment or recorded-input gates.
**Verify:** no failed sessions to triage. `node scripts/verify.mjs --fn prinv,doprtool` completed with this actual tail:
**Named:** - `prinv`: none added; restores the D-3186 body to the C gate.
**Next:** pop the next Must-fix row (review 2150 item 2, mon.c mpickstuff verbose gate).
## 2026-10-01 — D-3190 preserve exact Lua coordinate integers through destination casts

**C locus:** whole bodies and every reference table read in brief outputs; destination assignments and SP_COORD_PACK read at the immediate callers.
**JS:** js/nhlua.js:65 luaL_checkinteger_unpacked; js/mklev.js:22516 get_coord, :22572 get_table_xy_or_coord, :1093 lspo_gas_cloud; destination callers listed below, packed adapters :1305/:22039/:23148/:23500. Same export names and signatures retained.
**Change:** the existing luaL_checkinteger_unpacked now supports exact signed-64 transport with width=64: safe values remain Numbers, unsafe values remain BigInts. Both object fields use that mode, matching the existing exact array reader; get_table_xy_or_coord passes the result unchanged. Gas applies width=16 before conversion to Number while testing the original integers for selection.
**Verify:** no failed sessions to triage. Extracted pinned-C/Lua oracle /tmp/D3185-oracle (source extraction /tmp/D3185-oracle-build.py) versus current JS /tmp/D3190-parity.mjs: **153/153 PASS**, including both coordinate forms, signed-64 extrema, low-bit casts, fractional/error differences between object and array forms, int32 optional fields and selection TTL. External room/gas constructors and RNG are observation sinks: this measures arguments, guards, mutations and call order, not placement.
**Named:** - `get_table_xy_or_coord`: no missing helper arm. Inherited stair table parsing at sp_lev.c:4164 remains absent in lowered js/mklev.js:l_create_stairway.
**Next:** first remaining Must-fix, review 2145 Actionable 2: canonical optional-string roomtype validation/function evaluation and diagnostic completion before build_room RNG. Coverage block is regenerated by finish; no hand refill.
## 2026-10-01 — D-3189 complete monster armor messages before mutation and riding RNG

**C locus:** whole pinned bodies and all references read in brief outputs; immediate newcham/new_were guards read directly.
**JS:** js/worn.js:501 finish_worn_call, :513 m_lose_armor, :533 mon_break_armor, :725 extract_from_minvent, :776 update_mon_extrinsics, :867 maybe_blocks; js/mthrowu.js:183 extraction return; scripts/mon-break-armor-message.test.mjs real-input suspension checks.
**Change:** restarted the whole armor body in C call order and propagated nested extraction/speed/dismount completion. A local generator call frame runs synchronously until a live callee returns an input continuation, then resumes precisely after that C call; it accumulates no messages/actions, reads no frames/RNG indices, and preserves synchronous silent paths used by newcham. Every armor message precedes its destruction/drop, except the C saddle message which follows placement.
**Verify:** clean preflight node scripts/verify.mjs --no-cohort PASS. Final node scripts/verify.mjs --fn mon_break_armor,m_lose_armor,extract_from_minvent,update_mon_extrinsics --reach-all --full (log /tmp/armor-verify.log):
**Named:** - `mon_break_armor`: none in this whole body or its two executable C callers. Existing live callees and C macro expansions are reused; Soundeffect is the contest no-op.
**Next:** first remaining Must-fix: review 2145 exact Lua coordinate integer transport and gas narrowing; then roomtype validation/diagnostic completion. Phase-2 parks remain closed.
## 2026-10-01 — audit 2141–2149, D-3181–D-3188

**Review:** eight JS SHAs oldest first, each file written before opening the next; 3 ACCEPT, 4 ACCEPT-WITH-DEBT, 1 QUALITY-RISK. Prior 2132/2136 fixes confirmed. Ledger overlay 2149 is another QUALITY-RISK. No JS edits. Three Must-fix families: mon_break_armor consumes/drops armor before queued messages complete; full-width Lua coordinates round before destination casts; roomtype helper bypasses optional-string/function validation and diagnostic completion. First queue row is mon_break_armor, to ship alone.
**Verify:** each JS SHA remeasured on its historical code against its parent with --reach-all; no REGRESSED sessions. Extended extracted-C probes exposed the coordinate/roomtype defects; a suspension probe confirms armor consumption precedes the message wait. Public sessions 44/44, RNG 792,838/792,838, screens 11,405/11,405, speed 302+1.36/turn (R² .761). Full record: all 953 recordings present. Last hidden-proxy command: unfiltered score --jobs 8, 648/953 PASS, RNG 96.75%, screens 90.7%, 953 entries, 0 unrecorded, full=true at 01:29:01Z. Committed-scoreboard comparison: zero PASS losses/gains. Held-out refreshed: 13/44, 6,883/11,265 points, RNG 33.6%, screens 61.1%, last judged Sept 30 19:07Z.
**Ledger:** snapshots before/after corrections. Five random seeded ported briefs: drop_uswapwep, mon_break_armor, mhitm_ad_famn, weight_cap, shuffle_customizations. mon_break_armor corrected to partial; famn corrected to split with both live helpers. Review 2145 also corrects room/gas rows to partial. Final ledger: ported 1,186, partial 273, split 73. Hot-doc checks pass; no manual coverage refill or invented corpus FAIL.
**Next:** ship first Must-fix, then exact coordinate transport, then roomtype closure; preserve full corpus score as the guard, not proof of unexercised branches.
## 2026-10-01 — D-3188 restore impossible diagnostics, fatal guards and printf formatting

**C locus:** whole impossible and pline bodies and the complete brief reference tables read before editing; end.c panic:394–470 read to distinguish the fatal guard from its unported lifecycle.
**JS:** js/display.js:8056 vpline_expand; :8578 impossible. The formatter is the existing export used by cfgfiles/display message wrappers, which is why verification forced the complete public suite.
**Change:** restart impossible in C order, retaining its name and async signature. Throw at both fatal guards using the existing scored-JS panic idiom; keep the latch set on fatal termination. Reuse and extend the live vpline_expand export: consume star width/precision arguments before the converted value; preserve field alignment, sign/base prefixes, zero-padding and explicit precision; use BigInt narrowing for promoted int/short/char and pinned 64-bit long/long-long/size_t conversions.
**Verify:** `node scripts/verify.mjs --fn impossible --full`, /tmp/D3188-verify.log. Coverage row cites no blocked-session count; hidden note is not a corpus PASS. No failures to triage.
**Named:** - `impossible`: pline.c:598 paniclog and :621–631 CRASHREPORT prompt/raw_print/network submission remain Rule #2 omissions; files.c paniclog and report.c submit_web_report already have by-design ledger rows. At :592/:600 the fatal throw is wired, but end.c panic:398–470 panicking state, raw feedback/window teardown, error save/recover, core dump and really_done lifecycle remain absent.
**Next:** first remaining generated Open coverage row; no manual refill or phase-2 work.
## 2026-10-01 — D-3187 preserve unsigned migration sorting and reread the list after input

**C locus:** whole bodies and all brief reference tables read before editing; the qsort function-pointer site and extcmd registration were checked separately because the reference scanner misses them.
**JS:** js/wizcmds.js:1987 migrsort_cmp, :2012 list_migrating_mons, :2132 wiz_migrate_mons.
**Change:** restart the three whole bodies in C order and retain names/signatures. Compare IDs as unsigned 32-bit values and use the C less-than/greater-than result. Count and collect with separate reads of game.migrating_mons and game.u.uz; retain every switch arm and pass the counts to pline in C argument order.
**Verify:** `node scripts/verify.mjs --fn migrsort_cmp,list_migrating_mons,wiz_migrate_mons --full`, /tmp/D3187-verify.log. The coverage head cites no blocked session count; all three hidden checks correctly report notes, not hidden PASS. No failing sessions to triage.
**Named:** - `migrsort_cmp`: none in the whole body or executable callback wiring.
**Next:** first remaining generated Open coverage row; no manual refill or phase-2 work.
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
