# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
