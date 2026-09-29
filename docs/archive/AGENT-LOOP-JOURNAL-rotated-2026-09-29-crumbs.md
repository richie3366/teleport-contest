# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
