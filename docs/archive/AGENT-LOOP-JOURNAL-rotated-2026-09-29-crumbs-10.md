# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — D-3113 `report.c` NH_panictrace_libc + NH_panictrace_gdb + crashreport_bidshow + dobugreport + swr_add_uricoded + panictrace_handler (6× same-file closure)

**C locus:** - `NH_panictrace_libc`: `nethack-c/upstream/src/report.c:484–512` (`#if 0` `:487–490`, `#ifdef PANICTRACE_LIBC` backtrace arm `:492–508`, compiled `#else` `:510`).
**JS:** js/report.js (+172/−7 incl. header/imports), js/earlyarg.js (+2/−1), js/cmd.js (+2), js/getline.js (+6).
**Change:** six new exports in js/report.js in C order with per-arm cites. `NH_panictrace_libc`/`NH_panictrace_gdb` return `false`: the compiled arms — neither `PANICTRACE_LIBC` nor `PANICTRACE_GDB` is ever `-D`-defined (no define in sys/unix Makefiles or hints; sysconf values are only the end.c runtime priorities) and the `#if 0` block is dead in C. `crashreport_bidshow` documents the compiled-out WIN32 arms and names the `raw_print(bid)` sink (no pre-window stdout channel — D-2573 — and routing through `raw_printf` would invent handler/count effects C lacks).
**Verify:** `node scripts/verify.mjs --fn NH_panictrace_libc,NH_panictrace_gdb,crashreport_bidshow,dobugreport,swr_add_uricoded,panictrace_handler` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `NH_panictrace_libc`: none — whole body; the compiled arm is `return FALSE` (`:510`).
**Next:** report.c now holds nothing more Open (submit_web_report/setsignals by-design; get_saved_pline ported; init/bidshow/dobugreport/handler partial on Rule #2/by-design grounds only) — pop the next coverage row.

## 2026-09-29 — D-3112 `version.c` copyright_banner_line + dump_version_info + get_critical_size_count (3× MISSING→whole; queue head stale)

**C locus:** - `copyright_banner_line`: `nethack-c/upstream/src/version.c:471–490` (A `:473–475`, B `:477–479`, runtime C `:482–483`, D `:485–487`, `""` `:488`; all four `#ifdef`s live — patchlevel.h:39–44).
**JS:** js/files.js (+37), js/earlyarg.js (+34/−3).
**Change:** `copyright_banner_line` + `get_critical_size_count` as new exports in js/files.js (C order, per-arm cites) — files.js, not version.js, because version.js stays import-free (D-1881: const.js reads COMMIT_NUMBER at top level) and files.js already hosts the version.c save-validation family with live const.js + game imports. `dump_version_info` as a new export in js/earlyarg.js next to `early_version_info` (same reason: needs the `raw_printf` channel; sole C caller earlyarg.c:512), in C order: `game.gh?.hname ?? 'nethack'` (botl.js:2322: no gh.hname in JS), `slice(eos(hname) - 33)` (`nhStr` is the identity cast, lint.h:16), live `runtime_info_init`/`release_runtime_info` (added to the existing version.js edge — version.js is a leaf, no cycle), `%-12.33s` slice+padEnd, `%08lx` via `>>> 0` hex padStart(8), `raw_printf('%s', buf)` for C `raw_print` (no JS channel — the live early-output adaptation). Wired the argcheck `:dump` arm to call it (replacing the named omission).
**Verify:** `node scripts/verify.mjs --fn copyright_banner_line,dump_version_info,get_critical_size_count` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `copyright_banner_line`: none in-body — whole body, every value live (A/B/D pins, runtime banner_c). Pre-populate line 3 reads `""` (C static dummies deliberately not copied — js/date.js:98–103).
**Next:** `report.c` NH_panictrace_libc (next coverage row; dead callee submit_web_report needs a by-design check first).

## 2026-09-29 — D-3111 `options.c` test_regex_pattern + change_inv_order (THIN→whole + MISSING→whole; 16 stale rows declared)

**C locus:** - `test_regex_pattern`: `nethack-c/upstream/src/options.c:7869–7901` (NULL-only `!str` `:7878–7879`, errmsg default `:7880–7881`, regex_init `:7883`, !match sink `:7884–7887`, compile `:7889`, error_desc `:7893`, free-before-message `:7895`, failure sink `:7897–7898`).
**JS:** js/options.js (+64/−10).
**Change:** js/options.js only — completed `test_regex_pattern` (`:5300`) in C order (NULL-only str gate so `""` compiles like C, `'NHregex error'` default, live config_error_add sink calls with C formats, OOM free-before-message order; `re_error_desc` named omit). New file-local `change_inv_order` (`:5324`) in C order over the number-array inv_order model (C index bytes): GOLD_SYM `'## 2026-09-29 — D-3110 mondata.c max_passive_dmg restart + ranged_attk/can_track/levl_follower/is_fshk (coverage)

**C locus:** - `max_passive_dmg`: nethack-c/upstream/src/mondata.c:720–767 (multi2 contact loop, complete-burn/rot/rust `:749–752` → magr.mhp, elemental/PHYS dice `damn||mlevel+1` × damd × multi2).
**JS:** js/mhitm.js:2299, js/mondata.js:1235, js/monsters.js:403 (+ set_can_track_excalibur_hook above, bound js/artifact.js:920), js/dog.js:346, js/shk.js:237.
**Change:** restarted max_passive_dmg in C order (in-file completely*_mm + resists_* locals — no new clones/imports); new ranged_attk export in js/mondata.js (NATTK + AT_* already imported); can_track Excalibur arm via artifact.js late-bind setter (static monsters→artifact edge is a TDZ cycle — artifact.js:13 reads M2_UNDEAD at eval — D-2349 precedent; first verify caught it, cohort 0/7 ReferenceError); levl_follower both arms (mon_has_amulet already imported; is_fshk added to the existing shk.js import); new is_fshk export in js/shk.js (ESHK live). Stale-set, bodies complete + all C callers wired: little_to_big, big_to_little, mon_knows_traps, gender.
**Verify:** `node scripts/verify.mjs --fn max_passive_dmg,ranged_attk,can_track,levl_follower,is_fshk` → VERIFY: PASS; per-function hidden note (no corpus session blocked — coverage row) + REACH-OK (no RNG-tagged reach; 24-session smoke spread 24 PASS each); syntax 6 files; rule2; green 2/2; strict ×2; cohort 7/7. First run FAILed cohort 0/7 on the monsters→artifact TDZ (fixed via late-bind, re-ran PASS).
**Named:** - `max_passive_dmg`: none — whole body, every callee live.
**Next:** queue head now `mklev.c` add_door (coverage PARTIAL); mondata.c remainder verified shipped-undeclared (name_to_monclass mon.c:5124 caller belongs to the unported wiz_force family — left unknown) or deferred (monstseesu 59-caller audit, sliparm dup-canonical).

## 2026-09-29 — D-3109 sounds.c activate_chosen_soundlib port + 6 same-file dispositions (coverage)

**C locus:** - `activate_chosen_soundlib`: nethack-c/upstream/src/sounds.c:1779–1795 (idx `:1781`, IndexOk panic `:1783–1784`, exit arm `:1786–1788`, struct copy `:1790`, init `:1791–1792`, active/chosen publish `:1793–1794`); table sounds.c:1726–1776 (nosound-only in contest build), soundprocs BSS global `:1693`; sole scored caller allmain.c:703 init_sound_disp_gamewindows (options.c:3839 + unixmain.c:111 refs are comments).
**JS:** js/options.js:6649 activate_chosen_soundlib (`:6650` idx, `:6651–6652` panic, `:6653–6656` exit, `:6658` copy, `:6659–6660` init, `:6661–6664` publish), nosound_procs full shape :6600–6613; js/allmain.js:19 import + :188 wire.
**Change:** activate ported in C order into js/options.js next to the D-2785 soundlib family (table + assign/get/id_from_opt live there): idx `|0` (C uint32→int), IndexOk throw ≡ panic (assign_soundlib precedent), `||` exit arm with cmd.js:358 typeof-hook shape, `{...}` struct copy into game.soundprocs (established C-global home), init-hook call, active publish + chosen `>>>0` (uint32_t). nosound_procs extended to the full 11-field C struct shape (sound_triggers 0 + 8 null hooks — behavior-neutral: only reader cmd.js:358 is typeof-guarded). allmain.js imports (imports.mjs: same 100-module SCC, lazy body read + hoisted function export — safe) and calls it at C :703; header omit line retired.
**Verify:** `node scripts/verify.mjs --fn activate_chosen_soundlib,mon_is_gecko,dotalk,cry_sound,maybe_play_sound,sound_matches_message,play_sound_for_message` → VERIFY: PASS (syntax 2 files js/allmain.js js/options.js · Rule #2 · hidden notes `no corpus session blocked` ×7 · reach: no RNG-tagged reach, smoke spread 24 run / 24 PASS each → REACH-OK ×7 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 auto, shared file).
**Named:** - `activate_chosen_soundlib`: none — whole body, panic ≡ throw; SND_LIB_* rows stay compiled out (contest table is nosound-only).
**Next:** `mondata.c` max_passive_dmg (next queue head; PARTIAL 39C/28JS in js/mhitm.js).

## 2026-09-29 — Audit 2060–2068 (D-3100..D-3108): 9 ACCEPT; full cadence

Reviews 2060–2068 audit e028921a0..32d25b3c3 (wiz dumps, dungeon branches, forget/drain, makemon 9-fn, earlyarg 9-fn, hack 10-fn, append_str, makemap_remove_mons, crashreport_init): all ACCEPT, no Must-fix. Re-measured every corpus claim with `--reach-all` (m_initgrp 147/147, m_initthrow 153/153); `--can` on D-3103/D-3107 edges returns ALREADY (no new edges). Cadence: public 44/44 (Scr 11,405, RNG 792,838, `271+1.62/turn`); corpus 648/953, RNG 96.75%, screens 90.7%, 0 flips, `full: true`; held-out 13/44 flat. Ledger snapshot + 5/5 seeded-ported sample live.

## 2026-09-29 — D-3108 report.c crashreport_init degenerate port + 2 stale pops (coverage)

**C locus:** - `crashreport_init`: nethack-c/upstream/src/report.c:112–174 (once `:115–117`, HASH decl/init `:118–122`, BINFILE readlink `:123`, open `:125–131` with BETA raw_printf `:127–129`, 4K read loop `:133–143`, finish `:144–147`, hex `:148–164`, skip bid `:168–169` + nhUse `:172–173`; bid static `:107–109`); sole caller allmain.c:38 early_init (`#ifdef CRASHREPORT`, active on Linux via config.h:244-254).
**JS:** js/report.js:28 crashreport_init (`:30–31` once, `:32–40` omitted-hash cites, `:41–42` skip, `:43–46` tail); module-local bid `:13`, _crashreport_once `:16`. No imports (nhmd4.js-style import-free module).
**Change:** new js/report.js — degenerate remainder in C order: live once-guard, `skip:`-arm bid "unknown" (the only reachable outcome: readlink/open/read have no scored analogue — Rule #2; nhmd4 is live in js/nhmd4.js per D-2688 but has no input bytes here), BETA arm cited compiled-out, nhUse as void cites. Exported unwired — C calls only from early_init.
**Verify:** `node scripts/verify.mjs --fn crashreport_init` → VERIFY: PASS (syntax 1 file js/report.js · Rule #2 · hidden note `no corpus session blocked` · reach: no RNG-tagged reach, smoke spread 24 run / 24 PASS → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 · full skipped, no shared file).
**Named:** - `crashreport_init`: report.c:118–166 binary self-hash (HASH_BINFILE readlink `:123`, open `:125`, read loop `:133–143`, nhmd4 init/update/finish `:120–122`/`:137–138`/`:144–145`, hex `:148–164` — Rule #2, no /proc or fd I/O) + caller early_init unported; BETA raw_printf `:127–129` compiled out (no BETA in contest build).
**Next:** `rumors.c` init_oracles (next in queue order; review 1562 ACCEPTs the embed port — stale-check, then ship the head).
