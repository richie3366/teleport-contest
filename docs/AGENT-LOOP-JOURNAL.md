# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — Audit 2024–2032 (D-3064..D-3072): 8 ACCEPT, 1 QUALITY-RISK; full cadence

**Reviews:** 2024 fd2badce9 ACCEPT, 2025 709b8aea7 ACCEPT, 2026 1b84498a2 ACCEPT, 2027 b93547133 ACCEPT, 2028 774d64d58 ACCEPT, 2029 3bee10e1d ACCEPT, 2030 9e3e6255b ACCEPT, 2031 7e25e3c42 QUALITY-RISK (query_color PICK_ONE resolves explicit-pick-after-default to explicit; C coloratt.c:505–508 resolves to menu-earlier — D-3071 "provably dead" proof insufficient, review-2007 citation empty; Must-fix prepended), 2032 aa12e06ff ACCEPT.
**Cadence:** public 44/44 (Scr 11,405/11,405, RNG 792,838/792,838, `267+1.61/turn` R² 0.77); corpus rescore 631/953, RNG 96.04 %, screens 88.9 %, 0 flips, `full: true`; held-out 12/44 (board 2026-09-28T19:33Z, unchanged); ledger snapshot + seeded sample 5/5 sound.
**Next:** Must-fix query_color menu-earlier ships alone next port iter.
## 2026-09-29 — D-3072 sounds.c `release_sound_mappings` port; `mcould_eat_tin` + `get_dgn_align` retired stale

**C locus:** - `release_sound_mappings`: nethack-c/upstream/src/sounds.c:1675–1690 (`#ifdef USER_SOUNDS`, source-level port per the D-2776 file note)
**JS:** js/sounds.js `release_sound_mappings` (after `add_sound_mapping`, file order); no new import (`regex_free` already used at add_sound_mapping `:1596` arm)
**Change:** - `release_sound_mappings`: new export in js/sounds.js in C order — `:1678` nextsound pre-NULL, `:1680–1686` while-loop (next `:1681`, live `regex_free` `:1682`, frees-as-unlink `:1683–1684`, advance `:1685`), `:1688–1689` sounddir null under the if; C `free` ≡ unlink (GC collects, free_menu_coloring D-3071 precedent)
**Verify:** `node scripts/verify.mjs --fn release_sound_mappings` → VERIFY: PASS — syntax 1 file (js/sounds.js) · rule2 clean · hidden: no corpus session blocked (expected for a coverage row) · reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full skipped (no shared file)
**Named:** - `release_sound_mappings`: none in-body — whole body; sole C caller `freedynamicdata` unported (save-freeing teardown, map-named)
**Next:** pop the next Open — coverage row (`zap.c boxlock_invent` at ship time)
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
## 2026-09-28 — D-3065 utf8map.c free_all_glyphmap_u + reset_customsymbols (glyphmap unicode teardown pair)

**C locus:** - `free_all_glyphmap_u`: nethack-c/upstream/src/utf8map.c:59–80 (whole body in C order — MAX_GLYPH loop `:64–71`, gbuf sweep `:74–79`).
**JS:** js/glyphs.js:1003 (new export), :1024 (new export); js/options.js:196 (import), :8456–8457 (arm), :8459–8462 (gate), :8470 (clear).
**Change:** new exported `free_all_glyphmap_u()` in js/glyphs.js in C order with per-arm `:line` cites (nulls utf8str then u per cell — C `free` ≡ null, GC collects; absent array ≡ all-NULL BSS, no ensure); new exported `reset_customsymbols()` (`:214` + apply_customizations(game.currentgraphics, DO_CUSTOM_SYMBOLS)); wired the options.c:8996 arm in js/options.js reset_needed_visuals with the combined-`docrt` gate extended per C `:8985–8986` and the `:9012` flag clear; refreshed the apply_customizations caller line.
**Verify:** `node scripts/verify.mjs --fn free_all_glyphmap_u,reset_customsymbols` → VERIFY: PASS (syntax 2 files; rule2 clean; hidden notes — no corpus session blocked, expected for coverage rows; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK both; green 2/2; strict both; cohort 7/7; full 44/44).
**Named:** - `free_all_glyphmap_u`: the `:74–79` gbuf `gm.u` NULL sweep — JS keeps no per-cell glyph_map copies (map_glyphinfo builds fresh records, D-1983; the only `.u` readers walk the live array), so no dangling references exist; plus the unported symbols.c:345 caller.
**Next:** same-file mixed_to_utf8 stays absent — its `\G` arm needs decode_glyph (windows.c, ledger by-design) and its sole caller is wintty.c:4185 (unported); customcolors/palette reset_needed_visuals arms stay named there.
## 2026-09-28 — D-3064 objnam.c armor_simple_name xname :741 wiring + shirt_simple_name port

**C locus:** - `armor_simple_name`: nethack-c/upstream/src/objnam.c:5435–5468 (whole body in C order — oc_armcat 7-arm switch `:5442–5462`, default simpleonames + impossible `:5463–5466`).
**JS:** js/do_wear.js:1812 (new export), :1828 (ARM_SHIRT arm + doc), :1866 (doff dispatch), :3963 (late-bind registration), :4090 (destroy-armor site); js/objnam.js:962 (xname `un` arm), :2579–2582 (late-bind slot); js/invent.js:344 (import), :5629 (item_what W_ARMU arm).
**Change:** new exported `shirt_simple_name()` in js/do_wear.js with the sibling `*_simple_name` family (C home is objnam.c); the ARM_SHIRT arms (armor_simple_name `:5460`, armor_doff_simple_name for do_wear.c:1959), destroy-armor do_wear.c:3233, and item_what W_ARMU zap.c:5738 now call it; xname_flags ARMOR `un` arm passes `armor_simple_name(obj)` per C `:741` via a `set_armor_simple_name` late-bind (doffing-precedent `var` + `dn` fallback — a static objnam→do_wear edge TDZs `_body_part`, measured 2026-09-28: the new edge reordered eval onto polyself's top-level set_body_part).
**Verify:** `node scripts/verify.mjs --fn armor_simple_name,shirt_simple_name --full` → VERIFY: PASS (syntax 3 files; rule2 clean; hidden notes — no corpus session blocked, expected for a coverage row; reach — no RNG-tagged reach, fixed smoke spread 24/24 PASS → REACH-OK both; green 2/2; strict both; cohort 7/7; full 44/44).
**Named:** - `armor_simple_name`: none — every arm ported, every callee live (armcat reads oc_skill ≡ oc_armcat per the port's object-table convention; the async `impossible` is fire-and-forget in this sync function); the late-bind `dn` fallback fires only in graphs that never import do_wear.js.
**Next:** cloak_simple_name robe-vs-cloak (D-2186) and the armoroff default-arm `'armor'` vs C impossible + no nomovemsg (review 1047 named gap) stay their own rows.
## 2026-09-28 — Audit 2016–2023: 8 ACCEPT, 0 Must-fix

Public 44/44; held-out 12/44; corpus 631/953, 0 flips, full:true.
Debt notes (not queued): js/options.js:3181 + js/earlyarg.js:281 stale
"unported" cites (D-3061/D-3062 shipped the bodies).
## 2026-09-28 — D-3063 date.c free_nomakedefs (version-info teardown) + mdlib.c:871 wiring

**C locus:** - `free_nomakedefs`: nethack-c/upstream/src/date.c:134–173 (whole body in C order — populated guard `:139–140`, build_date `:142–144`, version_string `:145–147`, version_id `:148–150`, copyright_banner_c `:151–153`, NETHACK_GIT_* arms `:154–168` compiled out, flag reset `:171`).
**JS:** `js/date.js` (1 export + hook registration; `__setFreeNomakedefs` joins the existing date.js→version.js edge — no new module edge); `js/version.js` (hook + `:871` call site + doc).
**Change:** new exported `free_nomakedefs()` in js/date.js in C order with per-arm `:line` cites (nulls the 4 strdup'd `game.nomakedefs` fields — GC owns the memory, no clone; numerics untouched per C); wired the mdlib.c:871 site via a `__setFreeNomakedefs` hook in js/version.js (same late-binding as populate — D-1881 forbids a static version.js→date.js edge); refreshed the js/date.js:65 flag comment.
**Verify:** `node scripts/verify.mjs --fn free_nomakedefs` → VERIFY: PASS (syntax 2 files; rule2 clean; hidden note — no corpus session blocked, expected for a coverage row; reach — no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK; green 2/2; strict both; cohort 7/7). Smoke: unpopulated free no-ops, populate→release nulls the 4 strings and keeps version_number, second free guard no-ops.
**Named:** - `free_nomakedefs`: none — every arm ported; NETHACK_GIT_SHA/BRANCH/PREFIX arms compiled out in the contest build (same resolution as populate D-2653); C `free()` has no JS analogue (GC).
**Next:** make_version (mdlib.c, MISSING/absent) remains its own row — runtime_info_init `:841` InterimVersionInfo stands in until it lands; release_runtime_info's own C callers (save.c:1167, version.c:508) are unwired pre-existing, out of cluster.
## 2026-09-28 — D-3062 hack.c spot_checks + dump_weights (ice-timer recheck, --dumpweights table)

**C locus:** - `spot_checks`: nethack-c/upstream/src/hack.c:4525–4547 (whole body in C order — DRAWBRIDGE_UP db_ice_now `:4533` + FALLTHROUGH `:4534–4535`, ICE gate `:4537–4538`, timer stop `:4540–4541`, obj_ice_effects `:4544`).
**JS:** `js/hack.js` (3 exports + 1 local; names on 8 existing edges + new decl/o_init edges, both `--can` clean); `js/trap.js` (import + site + doc); `js/dig.js` (import + 13 sites).
**Change:** new sync exports in `js/hack.js` in C order with per-arm `:line` cites (`spot_checks`; `cmp_weights` file-local from the `:4486` staticfn; `dump_weights_lines` builder + `dump_weights` emitter per the D-3060 split); wired `blow_up_landmine` `:3218` and all 13 `dighole` fall-through returns; committed test scripts/spot-checks.test.mjs (11 cases: 7 timer arms incl. the dry-bridge fire, sortedness/count/separators/the-an nest/oc_name_known).
**Verify:** `node scripts/verify.mjs --fn spot_checks,dump_weights` → PASS syntax (3 changed js files) · PASS rule2 · note hidden ×2 (no corpus session blocked — coverage rows) · PASS reach ×2 (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed). `node --test scripts/spot-checks.test.mjs` → 11/11 pass.
**Named:** - `spot_checks`: none — every arm ported, every callee live (`spot_time_left`, `spot_stop_timers`, `obj_ice_effects`).
**Next:** retired 4 stale rows via `ledger.mjs set ported` in this commit: initoptions_init (D-3061 complete js/options.js:6791; remaining arms no-analogue — sf_init/assure_syscf_file C bodies read), genus (js/mon.js:638 + 2 callers wired), get_strength_str (js/attrib.js:185 + callers wired), obj_ice_effects (js/mkobj.js:3563; mkmaze.c:103 caller open). Left open: rounddiv (3 live clones; y==0 panic-vs-0 needs dedicated hot-path analysis); dump_weights earlyarg arm (earlyarg.c's row).
## 2026-09-28 — D-3061 options.c initoptions_init builtin-defaults port (breadth coverage)

**C locus:** `options.c` `initoptions_init` `:7119–7305` (whole body in C order; sole C caller `initoptions` `:7088`).
**JS:** `js/options.js` (new export + 4 import names on existing edges + PILE_LIMIT_DFLT const + caller wiring); `js/cmd.js`, `js/earlyarg.js` (comment-only).
**Change:** new exported `initoptions_init()` in `js/options.js` in C order with per-arm `:line` cites (opt_phase ×2, allopt_array_init, cmdline-windowtype arm via same-file nmcpy + disclose_strcmpi, glyphid cache, reset_commands, allopt initval loop, all flags/iflags stores, init_ov_* symbols, warnsyms loop in the `:3182` `.ch` convention, inv_order from DEF_INV_ORDER, pickup/sortloot, end_disclose, menu/wc/menuinvertmode stores, SLIME_MOLD/pl_fruit partial init, SYSCF pass); wired the `:7088` call in `initoptions()`; refreshed 4 stale "unported" cites (cmd.js ×2, earlyarg.js, allopt_array_init). Committed test scripts/initoptions-init.test.mjs (5 cases: flags/iflags defaults, warnsyms/pl_fruit/syscf phase, initval-loop reapply, cmdline arm).
**Verify:** `node scripts/verify.mjs --fn initoptions_init` → PASS syntax (3 changed js files) · PASS rule2 · note hidden vacuous (coverage row, no corpus session blocked) · PASS reach (smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed). `node --test scripts/initoptions-init.test.mjs` → 5/5 pass.
**Named:** `initoptions_init`: sf_init `:7129` (NHFILE proc tables, no scored analogue); init_random ×2 `:7161–7162` (initRng seeds both streams once in jsmain start()); choose_windows `:7136`, init_symbols `:7199`, switch_symbols `:7212`, init_rogue_symbols `:7213` (seed by-design); TERM AT `:7223–7230` + vt `:7235–7242` (POSIX TERM/termcap guards, by-design symset bodies; use_color stays unset = C's non-AT FALSE); MSDOS/WIN32 `:7246–7252` + MAC `:7253–7257` (compiled out on unix); assure_syscf_file `:7289` (POSIX open + exit; VFS read handles absence).
**Next:** this iteration's first pop `untrap_prob` was stale (full C body already at `js/trap.js:7263`, both C callers wired `:7433`/`:7602`) — retired via `ledger.mjs set untrap_prob ported` in this same commit. `initoptions()` still has no live JS caller (startup wiring is a separate row when queued).
