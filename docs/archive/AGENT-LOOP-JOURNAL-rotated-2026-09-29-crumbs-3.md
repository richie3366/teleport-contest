# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
