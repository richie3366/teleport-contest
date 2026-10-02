# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-02 — D-3315 `invent.c` safeq quartet (safeq_xprname head + safeq_shortxprname + any_obj_ok split + worn_wield_only)

**C locus:** - `safeq_xprname`: nethack-c/upstream/src/invent.c:2179–2184 — staticfn xprname(obj, NULL, ctx.let, ctx.dot, 0L, 0L); ctx invent.c:2173–2176, written by askchain :2451–2452, passed as safe_qbuf func at :2463.
**JS:** js/pickup.js:3762 (safeq_xprn_ctx), :3770 (safeq_xprname), :3779 (safeq_shortxprname), :3837–3852 (askchain ctx writes + safe_qbuf call); js/invent.js:4394 (worn_wield_only), :4422–4423 (display_minventory filter + predicate), :4443 (shown groups).
**Change:** ported the safeq ctx + pair module-local in js/pickup.js (C staticfn idiom, D-3301 precedent) with the JS xprname arg-order map (obj, let, dot, quan, txt, cost) vs C (obj, txt, let, dot, cost, quan); rewired askchain's !allflag block to C order (ctx writes :2451–2452, qpfx/first, safe_qbuf :2462–2465 with the `ininv ?` callback ternaries). Ported worn_wield_only module-local in js/invent.js and wired the !do_all armament filter + predicate in display_minventory. any_obj_ok booked split (no third clone — sym guidance). No new imports (pickup.js already imports xprname/ansimpleoname/safe_qbuf/doname; worn filter is field-local).
**Verify:** `node scripts/verify.mjs --fn safeq_xprname,safeq_shortxprname,any_obj_ok,worn_wield_only` → VERIFY: PASS (syntax 2 files; rule2; 4× `no corpus session blocked` + smoke-spread REACH-OK 24/24 each; green 2/2; strict ×2; cohort 7/7). Full `sessions`: 44/44 PASS (Scr 11,405/11,405 equiv, RNG full match, `337+1.65/turn`).
**Named:** - `safeq_xprname`: none in-body — whole C body live (ctx + callback + caller wired).
**Next:** dupstr_n head (`alloc.c`); refill yielded 0 eligible (rows --write 0; hidden-proxy queue 30 shown, 0 not open/parked/archived; no Parked line names a concrete writer+session; no new absent arm verified) — queue sits at 1 until coverage regenerates or the next refill authorization.

## 2026-10-02 — D-3314 `cfgfiles.c` dead-handler sextet (GDBPATH head + 3 queued siblings + AUTOCOMPLETE stale + DUMPLOGFILE)

**C locus:** - `cnf_line_GDBPATH`: nethack-c/upstream/src/cfgfiles.c:1082–1094 — PANICTRACE-gated file_exists + config_error_add, sysopt.gdbpath free/dupstr; refs are fwd decl :82 + definition only (whole-file textual scan).
**JS:** - `cnf_line_GDBPATH`: no symbol (by-design) — dead in C; PANICTRACE file_exists is a filesystem probe (Rule #2) and sysopt.gdbpath is a debugger path with no JS counterpart (no gdbpath symbol).
**Change:** none in `js/` — five by-design resolutions + one stale-complete booking, documented here and booked via Ledger (D-3312/D-3302 precedent).
**Verify:** - `cnf_line_GDBPATH`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `cnf_line_GDBPATH`: whole body — dead in C; no scored caller.
**Next:** continue the missing-arm list (`invent.c` safeq pair + any_obj_ok/worn_wield_only, `alloc.c` dupstr_n).

## 2026-10-02 — D-3313 `cmd.c` rush octet (do_rush_northwest head + 6 siblings + rnd_extcmd_idx, whole remaining cmd.c Open set)

**C locus:** - `do_rush_northwest`: nethack-c/upstream/src/cmd.c:1468–1472 — `set_move_cmd(DIR_NW, 3)` + ECMD_TIME.
**JS:** - `do_rush_northwest`: js/cmd.js:618 — module-local one-liner; FUNCT_TXT row js/cmd.js:2070; family comment js/cmd.js:613–616.
**Change:** ported the seven rush leaves module-local in C order (do_move_*/do_run_*/do_rush_west idiom, D-3307 precedent) + seven FUNCT_TXT identity rows in C extcmdlist order + rnd_extcmd_idx as a live export (C extern) in C file order; new focused test scripts/rnd-extcmd-idx.test.mjs.
**Verify:** - `do_rush_northwest`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `do_rush_northwest`: none in-body — whole C body live (move_funcs function-pointer column is txt dispatch in JS, pre-existing architecture shared with do_run_*).
**Next:** continue the missing-arm list (`cfgfiles.c` cnf_line_GDBPATH head + GREPPATH sibling, `invent.c` safeq pair).

## 2026-10-02 — D-3312 `sfbase.c` save-proc sextet (sf_init head + sfvalue_any + 4 unqueued micro-gaps, all by-design)

**C locus:** - `sf_init`: nethack-c/upstream/src/sfbase.c:647–655 — sfoprocs/sfiprocs[invalid]=zero*, [historical]=historical_*; sfoflprocs/sfiflprocs[exportascii]=zero*; sole caller initoptions_init options.c:7129.
**JS:** - `sf_init`: no symbol (by-design) — the sfoprocs/sfiprocs/sfoflprocs/sfiflprocs tables have no JS container: JS dispatches on `fnidx === FNIDX_HISTORICAL` + structlevel/fieldlevel directly (e.g. js/files.js:1075–1085, docblock :1058–1064 citing sf_init :651/:653); materializing tables nothing reads would be dead scaffolding, and the historical_sfo_procs contents live outside sfbase.c (sfstruct.c:149).
**Change:** none in `js/` — six by-design resolutions, documented here and booked via Ledger (D-3302/D-3304 precedent).
**Verify:** `node scripts/verify.mjs --fn sf_init,sfvalue_any,sf_setprocs,sf_setflprocs,sfvalue_bitfield,bitfield_dump` → syntax PASS (0 changed js files) · Rule #2 PASS · hidden note ×6 (no corpus session blocked — normal for coverage) · REACH-OK ×6 (smoke spread 24/24 PASS each, no RNG-tagged reach) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file changed) → VERIFY: PASS.
**Named:** - `sf_init`: the tables themselves — sfoprocs/sfiprocs/sfoflprocs/sfiflprocs + zero/historical contents have no JS container (installed configuration compiled into the sfo_/sfi_ dispatch arms).
**Next:** continue the missing-arm list (`cmd.c` do_rush_northwest head + 6 siblings); `sfbase.c` norm_ptrs_* C-0 empty-hook family (73 ledger-absent) left for a family-batch decision.

## 2026-10-02 — D-3311 `monst.c` monst_globals_init missing erinys-reset effect (review 2266 Must-fix)

**C locus:** nethack-c/upstream/src/monst.c:71–76 — `memcpy(mons, mons_init, sizeof mons)`. Second live writer of C `mons[]`: mon.c:5918–5966 `adj_erinys` (mflags1, mattk[0..2], mlevel, difficulty of mons[PM_ERINYS]; callers attrib.c:1309 + restore.c:727). Review 2266 bounded the live-writer set at {role_init, adj_erinys} (zero `data->` permonst-field writes, zero direct `mons[i].field =` writes, role.c:2109 infravision fixup inside `#if 0`).
**JS:** js/monsters.js:220–223 (one added call + doc wording); scripts/monst-globals-init.test.mjs (new focused regression test: adj_erinys(60)→init→baseline + overlay-clear arms).
**Change:** call same-module `reset_erinys()` inside `monst_globals_init()` (restores the memcpy's erinys effect; no-op at both wired sites, which run with clean erinys) and corrected the doc comment to name both channels (pm_fixup overlay + adj_erinys baseline mutations).
**Verify:** `node scripts/verify.mjs --fn monst_globals_init --full` → VERIFY: PASS — syntax (1 changed: js/monsters.js) · rule2 · hidden note (no corpus session blocked) · REACH-OK (no RNG-tagged reach; smoke spread 24/24 PASS) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44. Plus: /tmp/erinys-init-probe.mjs PASS (was FAIL pre-fix) · `node --test scripts/monst-globals-init.test.mjs` 2/2 PASS.
**Named:** none in-body — whole C body live (overlay clear + erinys reset ≡ memcpy). `game.mvitals` deliberately untouched (genocide state is NOT part of C `mons[]`, D-3308 analysis stands).
**Next:** queue head is now `sfbase.c` sf_init (first Open missing-arm row).

## 2026-10-02 — Audit 2262–2268: review D-3303–D-3310 (6 ACCEPT + 1 QUALITY-RISK) + full score

**Scope:** 7 js-touching SHAs since 2261 (D-3302/D-3305 docs-only, skipped): get_viz_clear, sp_lev septet, genl_player_selection+4, extcmd_initiator+run×8+freeall, monst_globals_init, wish_history_flush+add, handler_symset+arms+dispatch. Every verify re-measured per-function (incl. randrole real reach 69/69).
**Finding:** 2266 QUALITY-RISK — `monst_globals_init` overlay-clear omits the memcpy's erinys-reset effect (live 2nd mons[] writer `adj_erinys` mon.c:5918–5966; JS channel is baseline-array mutation + `reset_erinys`, never called here). Latent (both sites run clean; newgame/restore already reset) → 1 Must-fix row (same-module `reset_erinys()` call + comment fix, 44/44 + probe verify). Next cluster set to it.
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `329+1.64/turn`); corpus 705/953, 0 losses/0 gains, `full: true`; held-out 15/44 (+0). Ledger: snapshot appended; seeded sample fixed 1 row (`mhitm_ad_dcay` ported→split, 3 arms verified live).
**Next:** Must-fix ships alone.
