# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — D-3071 coloratt.c breadth cluster: free_menu_coloring port; query_attr/query_color verified complete; add_menu_coloring_parsed partial; alternative_palette by-design

**C locus:** - `free_menu_coloring`: nethack-c/upstream/src/coloratt.c:664–680
**JS:** - `free_menu_coloring`: js/options.js:4505 (exported)
**Change:** - `free_menu_coloring`: new export in C order — do-loop over both chains (`:668–679`), regex_free per node, unlink ≡ C free (GC)
**Verify:** `node scripts/verify.mjs --fn free_menu_coloring,query_attr,query_color,add_menu_coloring_parsed` → VERIFY: PASS
**Named:** - `free_menu_coloring`: none in-body — whole body; sole C caller `freedynamicdata` unported (see Callers)
**Next:** pop the regenerated head.

## 2026-09-28 — D-3070 teleport.c enexto_core null-mdat arm + set_mon_data; tele_jump_ok, dotelecmd, m_blocks_teleporting verified complete

**C locus:** - `enexto_core`: nethack-c/upstream/src/teleport.c:219–276 (NEW_ENEXTO live; `:281–376` is the uncompiled `#else`)
**JS:** - `enexto_core`: js/teleport.js:631 (exported)
**Change:** - `enexto_core`: null-mdat default via live `mons(game.u?.umonster)`; zeromonst-literal + live `set_mon_data` import (imports.mjs SAFE, hoisted, call-time use); `:227–229` no-mask and `:274–276` fail-arm cites
**Verify:** `node scripts/verify.mjs --fn enexto_core,enexto,enexto_gpflags,tele_jump_ok,dotelecmd,m_blocks_teleporting --reach-all` → VERIFY: PASS
**Named:** - `enexto_core`: `:232` debugpline0 + `:274` debugpline4 (D_DEBUG-only, repo precedent); `:281–376` `#else` body not compiled (live build is NEW_ENEXTO)
**Next:** pop the regenerated head.

## 2026-09-28 — D-3069 options.c visuals/windowcolors closure: reset_needed_visuals + wc_set_window_colors + optfn_windowcolors + wc_color_name + reset_customcolors + clear_all_glyphmap_colors

**C locus:** - `reset_needed_visuals`: nethack-c/upstream/src/options.c:8979–9014
**JS:** - `reset_needed_visuals`: js/options.js:8652 (local, async — docrt/bot)
**Change:** - `reset_needed_visuals`: restarted whole in C order — full 4-flag gate, palette clear, customcolors/customsymbols/redraw arms with reglyph_darkroom, promptstyle guard, botl, all five clears
**Verify:** `node scripts/verify.mjs --fn reset_needed_visuals,optfn_windowcolors,wc_set_window_colors,wc_color_name,reset_customcolors,clear_all_glyphmap_colors` → VERIFY: PASS
**Named:** - `reset_needed_visuals`: reset_glyphmap(gm_optionchange) `:8983` (CURRENT ban); change_palette() `:8989` (`#ifdef CHANGE_COLOR` not compiled — windconf.h:29 commented out, only Amiga amiconf.h:165 defines it; sole other caller allmain.c:716 is inside the same ifdef); adjust_menu_promptstyle `:9004` (by-design, no scored analogue)
**Next:** pop the regenerated head.

## 2026-09-28 — D-3068 timeout.c trio: print_queue VERBOSE arm + cleanup_burn + property_by_index

**C locus:** - `print_queue`: nethack-c/upstream/src/timeout.c:2014–2037 (live arm `:2024–2028` under unconditional `#define VERBOSE_TIMER :1963`; names from timeout_funcs `:1978–1990` in enum timeout_types order)
**JS:** js/timeout.js:1828 `cleanup_burn`, js/timeout.js:2531 `property_by_index`, js/timeout.js:2590 `print_queue` (+ fmt_timer_arg TIMER_MONSTER arm); js/mkobj.js:1452 `TIMEOUT_FUNC_NAMES` export; js/ +81/−93 across 3 files; scripts/timeout-trio.test.mjs (8 its)
**Change:** print_queue prints the live `name(ptr)` arm via the shared TIMEOUT_FUNC_NAMES (newly exported from mkobj.js — no clone #2); new exported `cleanup_burn` in timeout.js (C order, end_burn `void impossible` precedent for the async-in-sync arm), stop_timer/obj_stop_timers/spot_stop_timers dispatch on the doomed/node func_index like C; new exported `property_by_index` in timeout.js with sentinel-synthesis clamp, both wizintrinsic sites call it, wizcmds table clone deleted (−70 lines, tables diffed identical first)
**Verify:** - `print_queue`: `verify --fn` hidden note (no corpus session blocked, expected for coverage) + REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS)
**Named:** - `print_queue`: none — the `!VERBOSE_TIMER #%d` arm is not compiled (C :1963); %p renders o_id/m_id/a_long (no heap pointers in JS — live fmt_ptr precedent)
**Next:** burn_object (timeout.c:1383–1680, ledger unknown PARTIAL C209/JS154) is the remaining same-file gap — hot lamp function, 19 C callees, ships as its own iteration

## 2026-09-28 — D-3067 `unmakemon` (makemon.c:1514–1539) + `nasty` caller wiring

**C locus:** `unmakemon`: nethack-c/upstream/src/makemon.c:1514–1539 (countbirth :1519, mndx :1520, born untally :1525–1528 with the 255-cap carve-out, unique un-extinct :1529–1530, mhp=0 :1532, discard_minvent(TRUE) :1536, mongone :1538, return 0 :1539); sole C caller wizard.c:677 `nasty`
**JS:** js/makemon.js:3656 (`unmakemon`; `monsndx` + `discard_minvent`/`mongone` added to pre-existing mondata/mon imports — no new edges); js/wizard.js:7,154 (import + wired call)
**Change:** new exported `async unmakemon(mon, mmflags)` in js/makemon.js in C order with per-arm `:line` cites — countbirth from MM_NOCOUNTBIRTH (:1519), mndx via live `monsndx` (:1520), mvitals entry ensured like `propagate` (C svm.mvitals[] always present), born decrement guarded `> 0 && < 255` (:1525–1528), G_UNIQ → mvflags `&= ~G_EXTINCT` (:1529–1530), mhp=0 (:1532), live `discard_minvent(mon, true)` (:1536), `await` live `mongone(mon)` (:1538, async only for its unstuck/mdrop_special_objs awaits), return null (:1539); wired the `nasty` arm to `mtmp = await unmakemon(mtmp, NO_MM_FLAGS)`
**Verify:** `node scripts/verify.mjs --fn unmakemon` → VERIFY: PASS (syntax 2 files; rule2 clean; hidden note — no corpus session blocked, expected for coverage rows; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7; full 44/44 auto on shared change). New scripts/unmakemon.test.mjs: 4/4 pass (unmake+unt tally, MM_NOCOUNTBIRTH, 0/255 bounds, unique un-extinct)
**Named:** `unmakemon`: none — every arm ported, every callee live (`monsndx`, `discard_minvent`, `mongone`)
**Next:** pop the regenerated coverage head

## 2026-09-28 — D-3066 shk.c breadth cluster: onbill/restshk/cad/pacify_shk/rouse_shk/use_unpaid_trapobj + 9 stale

**C locus:** - `onbill`: nethack-c/upstream/src/shk.c:1136–1155 (whole body — shkp-guarded billct walk `:1140–1150`, paid-on-bill impossible `:1147–1148`, unpaid-not-on-bill impossible `:1152–1154`).
**JS:** js/shk.js:245 (pacify_shk), :271 (new restshk), :1878 (cad), :3769 (onbill), :4950 (rouse_shk); js/apply.js:4902 (use_unpaid_trapobj); js/do.js:1338 (assign_level export); js/lev_json.js:32 (import), :195 (deserMon ghostly), :799 (fmon); js/bones.js:650 (ghostly opt).
**Change:** onbill restructured to C order with fire-and-forget impossible arms (same_price precedent); new exported restshk in shk.js (strncmpi/assign_level/poly_gender/muteshk imports — all pre-existing edges; assign_level/muteshk newly exported) wired in lev_json.js deserMon replacing the inline arm, with ghostly threaded deserLevel opts ← getlev_bones; cad rewritten in C order on the live poly_gender export (poly_gender_shk removed — it returned 0/1 where C returns 2 for neuter); pacify_shk walks bill_p/bill with `(price+3)/4` floor math; rouse_shk async with the verbosely pline + 6 site awaits; use_unpaid_trapobj full port (Deaf_hero/find_objowner/muteshk/SetVoice).
**Verify:** `node scripts/verify.mjs --fn onbill,restshk,cad,pacify_shk,rouse_shk,use_unpaid_trapobj` → VERIFY: PASS (syntax 5 files; rule2 clean; hidden notes — no corpus session blocked, expected for coverage rows; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK all six; green 2/2; strict both; cohort 7/7; full 44/44 auto on shared change).
**Named:** - `onbill`: none — whole body, sole callee live, all C callers wired.
**Next:** dropped paints nothing further — shk.c eligible remainder is sub-threshold one-liners (replshk/is_fshk/sasc_bug/clear_no_charge*) and D-history secondary pool (remote_burglary, bill_box_content, cheapest_item); head moves to makemon.c unmakemon.
