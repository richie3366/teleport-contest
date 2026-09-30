# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-30 — D-3164 `music.c` generic_lvl_desc sanctum arm (coverage)

**C locus:** music.c:478–492 — `if/else-if` chain over `&u.uz`: astral plane → plane → sanctum → puzzle → tower → dungeon.
**JS:** js/music.js:466 generic_lvl_desc (sanctum arm at :470, C pin `:484–485`). Sequential-`if` with early returns preserves C's else-if semantics (each arm returns).
**Change:** added the sanctum arm in C order between the endgame and sokoban arms over the live `Is_sanctum` export (js/const.js:3294, `Lcheck(&sanctum_level)`); extended the existing `./const.js` import (no new module edge).
**Verify:** note hidden verify generic_lvl_desc: no corpus session blocked on it at baseline; PASS reach (no RNG-tagged reach; smoke 24/24 PASS, 0 regressed → REACH-OK); syntax 1 file · Rule #2 PASS · green 2/2 · strict 2/2 · cohort 7/7 · full skipped (music.js not shared) → VERIFY: PASS.
**Named:** none — whole body, all 5 callees live (dungeon.h macros exported from const.js).
**Next:** generated Open — coverage head after refill.

## 2026-09-30 — D-3163 `worn.c` wornmask_to_armcat + allunworn (coverage)

**C locus:** - `wornmask_to_armcat`: worn.c:218–246 — `cat = 0`, `switch (mask & W_ARMOR)` over the 7 armor slots, no default arm.
**JS:** js/worn.js:308 allunworn, js/worn.js:356 wornmask_to_armcat. twoweap cleared by direct assignment (no botl, per C); slot nulls match setnotworn idiom; switch keeps C's exact-match semantics (multi-bit armor mask → 0).
**Change:** ported both whole in C order into js/worn.js next to their C neighbors (allunworn before wearmask_to_obj, wornmask_to_armcat before its inverse armcat_to_wornmask); added W_ARMOR to the existing const.js import (no new module edge).
**Verify:** - `wornmask_to_armcat`: hidden note (no corpus session blocked); REACH-OK (no RNG reach; smoke 24/24 PASS); /tmp/worn-probe.mjs: 7 slots + 0/W_WEP/multi-bit/W_ARMOR cases + armcat round-trip both directions all pass.
**Named:** - `wornmask_to_armcat`: none — whole body, no callees, no C callers.
**Next:** generated Open — coverage head after refill.

## 2026-09-30 — Audit 2114–2122 (D-3154..D-3162): 9 ACCEPT; full cadence

Reviews cover the 9 js/ SHAs since 5ab8920e9 against pinned C with
per-function fidelity + hidden-proxy re-measure. D-3154 closes review
2111's Must-fix (miss arm now FALSE, pins flipped, 22/22). Reproduced
D-3159's burden PROGRESS (scen-options-Samurai-94071 41→43) and all
other verify claims; no C-wrongs, no Must-fix. Noted (unqueued):
D-3159's IBM ledger omit carried the wrong bullet at its SHA (fixed
in-tree by D-3161); D-3160 11 rows and D-3162 14 rows exceed the
10-count on zero-code walk retirements (review-1962 precedent:
review-debt, all rows verified).
Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838);
corpus rescore 648/953 with full:true, 0 flips; held-out 13/44 flat.
Ledger snapshot + seeded sample 4/5 resolve (mhitm_ad_drin corrected
ported→split: uhitm + mhitm arms).

## 2026-09-30 — D-3162 `options.c` optfn DEC/playmode/hilite/term/autocomplete cluster (coverage)

**C locus:** - `optfn_DECgraphics`: options.c:1393–1439 (BACKWARD_COMPAT on, optlist.h:15: do_set `:1409–1427` single-PRIMARYSET load, no rogue set `:1410`; `#else` `:1428–1431` compiled out; get arms `:1434–1436` empty).
**JS:** js/options.js:7119 (DECgraphics), :7166 (playmode), :7212 (hilite_status), :7256/:7301 (term_cols/rows), :11931 (o_autocomplete), rc key :4043/:4237 + lname :4350, allopt rows 1/15/41/75/179/180, doset rows :10001/:10047; js/cmd.js:2521 (count_autocompletions); scripts/optfn-dec-term-cluster.test.mjs (25 tests).
**Change:** ported all seven whole in C order over live string_for_opt/opt_atoi/allopt_name/set_optbuf CURRENTLY_SET (same module), clear_status_hilites/parse_status_hl1/count_status_hilites/config_error_add (botl.js edge, extended) + count_autocompletions (new cmd.js export over generated EXTCMDLIST, null-terminator-free loop) + LARGEST_INT (const.js edge; both edges imports.mjs ALREADY). playmode writes game.wizard/game.discover (C globals; discover new dynamic field like wizard); strcmpi("play") is a length gate + strncmpi (map_mode precedent); cursesgraphics declared by-design, no code (porting ifdef'd-out C would add dead JS — necrophiliac precedent).
**Verify:** `node scripts/verify.mjs --fn optfn_DECgraphics,optfn_o_autocomplete,optfn_hilite_status,optfn_playmode,optfn_term_cols,optfn_term_rows,count_autocompletions,optfn_cursesgraphics` → VERIFY: PASS — hidden notes ×8 (no corpus session blocked, expected for coverage rows); REACH-OK ×8 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/optfn-dec-term-cluster.test.mjs`: 25/25 PASS (all do_set/get arms incl. badflag, mode families, clear/parse, atoi edges, bare/default, rc + dispatch + dump wiring); siblings optfn-coverage/optfn-status/all-options-statushilites/all-options-conds: 48/48 PASS.
**Named:** - `optfn_DECgraphics`: read_sym_file `:1415` + clear_symsetentry `:1417` failure arm (SYMBOLS file IO under Rule #2) + switch_symbols `:1419` (by-design) — IBMgraphics precedent.
**Next:** continue the breadth queue from the regenerated block.

## 2026-09-30 — D-3161 `options.c` optfn_statushilites + optfn_statuslines (coverage cluster)

**C locus:** - `optfn_statushilites`: options.c:4012–4064 (STATUS_HILITES on, config.h:616: do_set `:4025–4036` delta store + from_file reset gate; `#else` `:4037–4042` compiled out; get_val `:4046–4050`; get_cnf_val `:4058`).
**JS:** js/options.js:7096 (optfn_statushilites), :7146 (optfn_statuslines), rc valued :4231/:4239 + valueless :4400/:4407, allopt rows 174/176, doset rows :9770/:9774; js/botl.js reset_status_hilites doc (caller now live); scripts/optfn-status-cluster.test.mjs (15 tests).
**Change:** ported both whole in C order over live string_for_opt/bad_negation/wc2_supported/opt_atoi/config_error_add (same module) + imported reset_status_hilites (botl.js; pre-existing edge, imports.mjs ALREADY). Statushilites full-doset row is live get_val now; statuslines displays keep the C-observable `:4101` supported arm (contest tty sets WC2_STATUSLINES, wintty.c:119; the live optfn reads 'unknown' under the deliberate minimal JS wincap2).
**Verify:** `node scripts/verify.mjs --fn optfn_statushilites,optfn_statuslines` → VERIFY: PASS — hidden notes ×2 (no corpus session blocked, expected for coverage rows); REACH-OK ×2 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7; full 44/44 (auto: shared file changed). Focused `node --test scripts/optfn-status-cluster.test.mjs`: 15/15 PASS (all do_set/get arms incl. negated fall-through, bare/default, atoi edges, rc + dispatch + dump wiring, both wc2 arms); sibling `scripts/optfn-coverage-cluster.test.mjs`: 20/20 PASS.
**Named:** - `optfn_statushilites`: none — whole body; STATUS_HILITES-off arms compiled out (config.h:616).
**Next:** continue the breadth queue from the regenerated block.

## 2026-09-30 — D-3160 `apply.c` could_pole_mon cluster + `hacklib.c` isqrt (coverage)

**C locus:** - `could_pole_mon`: apply.c:3391–3412 (hitm entry snapshot `:3395`, uwep/pole gate `:3397–3398`, range `:3400`, find `:3404`, hitm arm `:3405–3407`, mdistu ×2 `:3406`).
**JS:** js/apply.js:3771 (`could_pole_mon` restart), :3696 (`find_poleable_mon` impaired `:3698` + isqrt `:3699`), :3660/:3679 (calc/get_valid docs), 3 import names; js/hacklib.js:36 (`isqrt` export); scripts/polearm-coverage-cluster.test.mjs (3 tests).
**Change:** restarted `could_pole_mon` in C order (entry hitm, live `mdistu`, per-line C pins, C-shaped else); impaired now calls the gated display.js `Hallucination` youprop (D-1493; aliased — do_name.js squats the bare name and documents itself as not-the-macro); ported `isqrt` as the hacklib.js C-locus export, rewired find, deleted `isqrt_pole`; C-ref docs on the two staticfn locals (distu is a macro, hack.h:1531 — `distu_apply` is its expansion).
**Verify:** `node scripts/verify.mjs --fn could_pole_mon,calc_pole_range,find_poleable_mon,get_valid_polearm_position,isqrt` → VERIFY: PASS — hidden notes ×5 (no corpus session blocked, expected for coverage rows); REACH-OK ×5 (no RNG-tagged reach, smoke spreads 24/24 PASS each); syntax; rule2; green 2/2; strict both; cohort 7/7. Focused `node --test scripts/polearm-coverage-cluster.test.mjs`: 3/3 PASS. First verify run caught a real bug (bare `Hallucination` import collided with the do_name.js squat — `Identifier already declared`, cohort 0/7); fixed via alias, re-verified PASS.
**Named:** - `could_pole_mon`: none — whole body, every callee live.
**Next:** `optfn_IBMgraphics` coverage row persists while declared partial (generator re-queues partial + measured-gap rows); retires only via a `read_sym_file` port or a generator tweak — out of scope, D-3159 stands.
