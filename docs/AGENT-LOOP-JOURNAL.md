# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-29 — D-3080 sfbase.c save-file base: sf_log + sfi_char/sfo_genericptr/sfi_genericptr/sfi_version_info/complex_dump + sfvalue_ trio

**C locus:** - `sf_log`: nethack-c/upstream/src/sfbase.c:376–404
**JS:** js/files.js:1153 sfi_char, :1189 sfo_genericptr, :1213 sfi_genericptr, :1246 sfi_version_info, :1285 sf_log, :1306 sfvalue_char, :1316 sfvalue_genericptr, :1327 sfvalue_uchar, :1359 complex_dump; js/const.js TURN_OFF_LOGGING.
**Change:** - `sf_log`: new export in C order — fplog read (`:379`), TURN_OFF_LOGGING gate (`:381`, new js/const.js const from sfbase.c:15), WRITING→rcount/wcount select (`:384`); fprintf+fflush named omit (Rule #2); `:399–401` stays dead, VMS shape compiled out.
**Verify:** `node scripts/verify.mjs --fn sf_log,complex_dump,sfo_genericptr,sfi_genericptr,sfi_version_info,sfi_char,sfvalue_char,sfvalue_genericptr,sfvalue_uchar` → VERIFY: PASS (green 2/2, strict ×2, cohort 7/7; full skipped — no shared file per detector):
**Named:** - `sf_log`: `:385–398` fprintf + `:402` fflush (Rule #2, no fs log; viable_nhfile precedent).
**Next:** SF_X queue row stays Open (macro generating sfo_bitfield/sfi_bitfield, not a portable function); binary NHFILE restore (mread/bread) remains the by-design boundary for the sfi_ fills.
## 2026-09-29 — D-3079 cmd.c handler_change_autocompletions + parseautocomplete port; counter_were stale-retired

**C locus:** - `handler_change_autocompletions`: nethack-c/upstream/src/cmd.c:2449–2515 (caller options.c:8362 optfn_o_autocomplete do_handler)
**JS:** - `handler_change_autocompletions`: js/cmd.js:2334 (export async).
**Change:** - `handler_change_autocompletions`: new async export in C order — menu build over EXTCMDLIST.length ≡ extcmdlist_length (`:2463–2481`, INTERNALCMD|CMD_NOT_AVAILABLE + short-name skips, a_int i+1, '*' when AUTOCOMP_ADJ, SELECTED when AUTOCOMPLETE), title row for the `:2483` prompt, one `select_menu_pick_any` with cancelValue -1 (cond_menu precedent) keeping the `:2485` n>=0 gate, apply loop (`:2486–2512`, Set of picked a_int ≡ C's `ec == &extcmdlist[a_int-1]`), free `:2511` GC.
**Verify:** `node scripts/verify.mjs --fn handler_change_autocompletions,parseautocomplete` → syntax PASS (3 files: js/cfgfiles.js js/cmd.js js/options.js) · rule2 PASS · hidden note ×2 (no corpus session blocked — coverage rows) · REACH-OK ×2 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 · full 44/44 (auto: shared file changed) → VERIFY: PASS. /tmp/parseautocomplete-probe.mjs 11/11 (toggle symmetry, list/colon/whitespace/empty/bad-name arms). New cfgfiles→cmd edge: same 100-module SCC, hoisted function export, call-time use only (imports.mjs --can CHECK-analyzed); probe import smoke ok.
**Named:** - `handler_change_autocompletions`: none in-body — whole body; window layer via live select_menu_pick_any, sole C callee parseautocomplete live.
**Next:** downstream static snapshot — js/getline.js EXT_CMD_AC (NEWAUTOCOMP uniqueness set) is taken once from C's AUTOCOMPLETE flags and does not follow runtime EXTCMDLIST flag changes; making `#` completion read live flags is a get_ext_cmd change, out of this cluster. Same-optfn sibling `count_autocompletions` (options.c:8358 get_val) still MISSING/unqueued — the doset row keeps its hardcoded '(0 currently set)'.
## 2026-09-29 — D-3078 eat.c temp_resist + food_substitution + 4 same-file restarts; 2 #if 0 by-designed

**C locus:** - `temp_resist`: nethack-c/upstream/src/eat.c:453–469 (live callers insight.c:1544,1555; eat.c:502 caller is `#if 0` dead)
**JS:** - `temp_resist`: js/eat.js:964 (export); js/invent.js:67 (import), sites js/invent.js:6315,6330,7038,7059.
**Change:** - `temp_resist`: new export in C order — timeout `:456`, four conjuncts `:458–466` (form/extrinsic/blocked guards + C comments); body verbatim the deleted clone.
**Verify:** `node scripts/verify.mjs --fn temp_resist,food_substitution,recalc_wt,do_reset_eat,foodword,start_eating` → syntax PASS (2 files: js/eat.js js/invent.js) · rule2 PASS · hidden note ×6 (no corpus session blocked — coverage rows) · REACH-OK ×6 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 → VERIFY: PASS. No full sessions (no shared file changed). New invent→eat edge: same 100-module SCC, hoisted export, call-time use only (imports.mjs --can CHECK-analyzed); /tmp/cluster-probe.mjs import smoke ok.
**Named:** - `temp_resist`: none — whole body, zero C callees.
**Next:** `leather_cover` + `maybe_extend_timed_resist` set by-design this commit (`#if 0`, uncompiled — D-3025 precedent). Caller-body gaps for future caller ports (not this cluster): doeat's 3 do_reset_eat sites + 2nd start_eating arm, eatfood's do_reset_eat site (D-2720-fenced), rottenfood's foodword message. eat.c still holds PARTIALs below block heat (reset_eat/tinopen_ok/eat_ok/use_up_tin/foodword-adjacent one-liners).
## 2026-09-29 — D-3077 worm.c random_dir port; 3 same-file PARTIALs stale-retired

**C locus:** - `random_dir`: nethack-c/upstream/src/worm.c:802–822 (staticfn decl :22; zero call sites)
**JS:** - `random_dir`: js/worm.js:668 (local; no callers, as in C).
**Change:** - `random_dir`: new local (C staticfn) in C order — x-step ternary `:805–809` (interior rn2(3)-1, right-edge -rn2(2), left-edge rn2(2)), x-changed y-step `:810–815`, forced y-change `:816–821` (rn2(2)?1:-1 / -1 / +1); C `int *nx,*ny` out-params ≡ `out.nx`/`out.ny` (mutable-coords-object convention per `rnd_nextto_goodpos_mon`); edge checks precede each single draw, preserving short-circuit + RNG order; COLNO/ROWNO added to the existing const.js edge (no new edge).
**Verify:** `node scripts/verify.mjs --fn random_dir,create_worm_tail,shrink_worm,count_wsegs` → syntax PASS (1 file) · rule2 PASS · hidden note ×4 (no corpus session blocked — coverage rows) · REACH-OK ×4 (no RNG-tagged reach; smoke 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 → VERIFY: PASS. No full sessions (js/worm.js not shared).
**Named:** - `random_dir`: none — whole body, sole callee rn2 live.
**Next:** stale-retired this commit via `ledger.mjs set` (bodies verified complete + callers wired): queue-head pops `doffing` (ported, js/do_wear.js:3920, all 14 arms) and `set_random` (split→js/rng.js:initRng — live body is one init_isaac64 call, D-3033; sole C caller init_random routes there); same-file `create_worm_tail` (C stores subsumed by newseg zero-literal js/worm.js:35; caller initworm wired js/worm.js:111), `shrink_worm` (3 C callers wired js/worm.js:324,471,480), `count_wsegs` (11/12 C callers wired; C trap.c:1975 trapeffect_pit arm unwired — belongs to a trapeffect_pit port). worm.c now holds no more Open (rest unknown+ok / ported / by-design); ~25 insertions with the file exhausted.
## 2026-09-29 — D-3076 trap.c keep_saddle_with_steedcorpse + join_adjacent_pits port; 7 stale retired

**C locus:** - `keep_saddle_with_steedcorpse`: nethack-c/upstream/src/trap.c:938–967 (caller trapeffect_landmine :2591–2592; decl :13; self :962)
**JS:** - `keep_saddle_with_steedcorpse`: js/trap.js:5794, wired at js/trap.js:5890.
**Change:** - `keep_saddle_with_steedcorpse`: new local (C staticfn) in C order — `!saddle` guard (`:944–945`), fobj while-walk (`:946`), CORPSE+has_omonst test (`:947`), m_id match (`:950`), saddle move via live `get_obj_location(chain, 0)` + `obj_extract_self` + `place_object` + `stackobj` (`:953–956`, `{x,y}|null` ≡ `&x,&y`+bool), cobj depth-first recurse (`:961–963`), nobj advance (`:964`); caller hoists `steed_mid`/`saddle` to branch scope (`:2545–2546`), assigns at `:2575–2576`/`:2580`, calls under `steed_mid && saddle && !u.usteed` after `blow_up_landmine` (`:2591–2592`).
**Verify:** `node scripts/verify.mjs --fn keep_saddle_with_steedcorpse,join_adjacent_pits` → syntax PASS · rule2 PASS · hidden note (no corpus session blocked on either — coverage rows) · REACH-OK both (no RNG-tagged reach; 24-session smoke spread 24/24 PASS each) · green 2/2 · strict 2/2 · cohort 7/7 · VERIFY: PASS; full `sessions` 44/44 (forced; Scr 11,405/RNG 792,838 intact, `266+1.59/turn`). No maintained unit harness in repo (sessions are the harness); new locals verified via REACH smoke + full suite, no /tmp probe kept.
**Named:** - `keep_saddle_with_steedcorpse`: none — every arm ported, every callee live (`has_omonst`/`OMONST`/`get_obj_location`/`obj_extract_self`/`place_object`/`stackobj` all pre-imported; no new cross-module edge).
**Next:** `reset_utrap` (trap.c:1045 THIN — msg arm wants async `float_up` + `You("can fly.")`; ~25 sync JS call sites need `await`, some chains need async conversion — own iteration); stale-retired this commit via `ledger.mjs set` (bodies verified complete + callers wired): `trapnote` (an≡just_an+str, js/trap.js:1161), `launch_in_progress` (js/trap.js:2606), `clear_conjoined_pits` (js/trap.js:1292), `unsqueak_ok` (js/trap.js:7589), `dountrap` (js/trap.js:7960), `m_harmless_trap` (all arms, impossible default named, js/trap.js:585), `trapeffect_sqky_board` (all arms, Soundeffect no-op named, js/trap.js:4086).
## 2026-09-29 — D-3075 read.c create_particular_parse whole-body restart

**C locus:** - `create_particular_parse`: nethack-c/upstream/src/read.c:3137–3249 (struct `_create_particular_data` include/hack.h:314–323; `wizard` ≡ flags.debug include/flag.h:30; `digit()` src/hacklib.c:61–65)
**JS:** js/read.js:2744 `function create_particular_parse(str, d)` (local — C staticfn); new static `monster_census` import (imports.mjs: hoisted, call-time, cycle-safe), `strstri`/`strncmpi` added to the hacklib edge, `ismnum` to the const edge, `PM_STALKER`/`PM_LONG_WORM` consts.
**Change:** - `create_particular_parse`: restarted whole in C order — all 12 `d` defaults (`:3145–3152`), digit-run quan + space skip (`:3155–3160`, `parseInt` ≡ `atoi` under the digit guard), QUAN_LIMIT=`ROWNO*(COLNO-1)` clamp via live `monster_census` (`:3161–3167`), six terms blanked via live bare `strstri` (`:3169–3194`, female-before-male), `mungspaces` (`:3195`), disposition via live `strncmpi` (`:3197–3205`), wizard `*`/`random` via file-local `wizard_mode()` (`:3207–3210`), `name_to_mon` + explicit-vs-name merge (`:3212–3229`), `ismnum` accept (`:3230–3231`), `name_to_monclass` species / S_invisible→stalker / S_WORM_TAIL→long worm / class→urole.mnum arms (`:3232–3248`); C `(str, &d) → boolean` signature; caller `create_particular` to `if (parse(bufp, d)) break`.
**Verify:** - `create_particular_parse`: `node scripts/verify.mjs --fn create_particular_parse` → syntax PASS (1 file) · rule2 PASS · hidden note (no corpus session blocked) · reach REACH-OK (no RNG-tagged reach; smoke 24/24 PASS) · green 2/2 · strict 2/2 · cohort 7/7 → VERIFY: PASS.
**Named:** - `create_particular_parse`: none in-body — every arm ported, every callee live (`monster_census`, `strstri`, `mungspaces`, `strncmpi`, `name_to_mon`, `name_to_monclass`), sole C caller wired. Representation notes: `monclass` -1 ≡ C MAXMCLASSES (no JS const; thin-body convention); `digit()` inlined as a 1-line predicate (no JS export).
**Next:** `create_particular_creation` randmonst/monclass + post-flag arms (open D-2004) consume the newly filled `d`.
## 2026-09-29 — D-3074 zap.c breadth cluster: boxlock_invent + item_what + zhitu ports; obj_shudders/adtyp_to_prop/zombie_can_dig verified complete

**C locus:** - `boxlock_invent`: nethack-c/upstream/src/zap.c:2687–2702
**JS:** js/lock.js `boxlock_invent`; js/invent.js `item_what` (+`adtyp_to_prop` verified); js/do_wear.js `boots_simple_name` export; js/zap.js `zhitu` (+`obj_shudders`, `zombie_can_dig` verified)
**Change:** - `boxlock_invent`: `boxing` flag in C order (`:2691–2699`, snapshot ≡ `nextobj` pre-fetch) + `update_inventory()` when hit (`:2700–2701`); added to the existing lock→invent import (no new edge)
**Verify:** `node scripts/verify.mjs --fn boxlock_invent,obj_shudders,adtyp_to_prop,item_what,zombie_can_dig,zhitu` → VERIFY: PASS — syntax 4 files · rule2 clean · hidden: no corpus session blocked on any (expected for coverage rows) · reach: zhitu 17/17 baseline-PASS reachers PASS → REACH-OK, other five smoke spread 24/24 each → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full skipped by detector so ran `node frozen/ps_test_runner.mjs sessions` → 44/44 PASS (RNG 792,838/792,838, screens 11,405/11,405). No new headless test — the maintained gate for breadth ports is per-function REACH + full suite (D-3070–3072 precedent); a query_color-style test is disproportionate here since every new arm is session-reached.
**Named:** - `boxlock_invent`: none — whole body; `!obj` guard kept (C NONNULLARG1, defensive)
**Next:** pop the next Open — coverage row
## 2026-09-29 — D-3073 `query_color` PICK_ONE menu-earlier (review 2031 C-wrong)

**C locus:** nethack-c/upstream/src/coloratt.c:505–508 (`query_color` pick_cnt==2 arm) + win/tty/wintty.c:1755–1759 (letter-press toggles + finishes, no PICK_ONE deselect) and :2808–2817 (picks gathered in menu order) ⇒ C ≡ menu-earlier(preselected, explicit)
**JS:** js/options.js `query_color` (:5209) + corrected doc comment; new headless test scripts/query-color-pick-one.test.mjs (5 cases: both menu orders, NO_COLOR path, Enter-preselected, ESC)
**Change:** after the helper returns explicit Y with dflt X≠NO_COLOR, index-compare in MENU_COLORNAMES (≡ C colornames[] pre-alias order, verified both sides) and return X when Y sorts strictly after X; NO_COLOR-default path unchanged (C then always yields explicit — picks[0]=Y since "no color" sorts last). Enter/ESC/own-letter arms unchanged (same values as C pick_cnt==1/0/-1).
**Verify:** `node --test scripts/query-color-pick-one.test.mjs` → 1 fail pre-fix (black+green-letter), 5/5 post-fix. `node scripts/verify.mjs --fn query_color` → VERIFY: PASS — syntax 1 file (js/options.js) · rule2 clean · hidden: no corpus session blocked (expected — review found it by audit, no corpus reach) · reach: no RNG-tagged reach, smoke spread 24/24 PASS → REACH-OK · green 2/2 · strict seed8000 + seed0900 · cohort 7/7 · full 44/44 (auto: shared file changed)
**Named:** none new — whole readback now C-faithful; botl.c:4234 caller stays with the pre-existing `status_hilite_menu_add` omission
**Next:** none — Must-fix closed; review 2031 stamped
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
