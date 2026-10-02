# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-02 — D-3299 `pline.c` There (do.js clone removal + canonical import rewire)

**C locus:** - `There`: nethack-c/upstream/src/pline.c:425–433 whole body (C extern) — `vpline(YouMessage(tmp, "There ", line), the_args)`; YouMessage = strcpy+strcat into the You_buf growable buffer (:338–363), memory mgmt unneeded in JS. 55 C call sites.
**JS:** - `There`: js/display.js:7915 (canonical export, pre-existing, unchanged); rewire js/do.js:752 (import :65; clone deleted :505).
**Change:** - `There`: deleted the do.js:505 clone (C-cite comment left at the site); added `There` to the existing `./display.js` import (do.js:65; `imports.mjs --can`: ALREADY, no new edge). Behavior-neutral at the sole caller: single preformatted arg (no dropped args) and `pline(fmt,...args) ≡ vpline(fmt,...args)` (display.js:8274).
**Verify:** `node scripts/verify.mjs --fn There` tail pasted verbatim:
**Named:** - `There`: none in-body — whole C body live in the canonical export (You_buf growth + free_youbuf are memory-mgmt only, by-design; null/empty guard is the file idiom). Audit omission: per-site mapping of 54 C call sites (see Callers).
**Next:** queue holds 1 row (`objnam.c` nextobuf, by-design-or-port). Refill stays thin: generated block dry at C≥8 (all remaining unknown/absent gaps ≤7 lines); hidden-proxy owners all tagged; next iters continue hand-verified missing-arm rows from `rows --min-c-lines 1` + brief evidence (pline.c exhausted: You_buf/free_youbuf by-design, dumplog* retired D-1776).

## 2026-10-02 — D-3298 `decl.c` program_state_init (early_init zero-reset + jsmain wiring)

**C locus:** - `program_state_init`: nethack-c/upstream/src/decl.c:1074–1077 whole body (C extern) — `program_state = init_program_state` (`{ 0 }`, decl.c:1001; every `struct sinfo` int reads 0, hack.h:776+). Sole C caller allmain.c:35 `early_init` (first call, before `decl_globals_init` :40).
**JS:** - `program_state_init`: js/decl.js:42–55 (export :53); caller js/jsmain.js:130 (+ import :14).
**Change:** - `program_state_init`: `export function program_state_init()` in `js/decl.js` (C file order, before `decl_globals_init`), body `game.program_state = {}` — `{}` ≡ `{ 0 }` under the falsy-default read idiom (same as `reset_instance_globals`); unconditional assign, never merge, like C. Wired as the first call after `resetGame()` in `jsmain.js start()`, same relative order as C (:35 before :40). Import extended on the existing `./decl.js` edge (no new module edge).
**Verify:** `node scripts/verify.mjs --fn program_state_init` → VERIFY: PASS — syntax 2 files (js/decl.js, js/jsmain.js); rule2 clean; hidden 0 blocked (coverage row); reach smoke 24/24 REACH-OK; green 2/2; strict ×2; cohort 7/7; full 44/44 (auto: shared file changed).
**Named:** - `program_state_init`: none — whole C body live (single assignment; no merge/restore semantics — C calls it once at startup only).
**Next:** queue EMPTY after this commit: 7 rows consumed (1 shipped, 6 retired), remainder 0, refill dry — (1) `rows --write` 0 rows; (2) hidden-proxy 79/79 owners tagged open/parked/archived; (3) no park names one concrete writer + session (full index scanned — all vague/conditional/parked/truncated); (4) no verified-absent arm (objects_globals_init live js/objects.js:69; monst_globals_init vacuous — JS mons() mints fresh, geno lives in mvitals; putstr/raw_print/raw_print_bold are winprocs macros, not functions). Next iteration has no head: brief new (4) candidates under its own refill authorization, or a human reopens phase 2 ([measure] W2/W3 rows waiting).

## 2026-10-02 — D-3297 `hacklib.c` char trio: digit + letter + onlyspace (canonical exports, 3 rewires)

**C locus:** - `digit`: nethack-c/upstream/src/hacklib.c:62–65 whole body (C extern, hacklib.h) — `boolean ('0' <= c && c <= '9')`.
**JS:** - `digit`: `js/hacklib.js:236` (exported, C extern).
**Change:** - `digit`: `export function digit(c)` in C order, char-or-code param (highc/lowc idiom); single-char string compare is code compare, all below 128 (no signed-char trap).
**Verify:** `node scripts/verify.mjs --fn digit,letter,onlyspace` tail pasted verbatim:
**Named:** - `digit`: none in-body — whole C body live (unwired callers keep C-exact inlines, listed above).
**Next:** queue head moves to `topten_print`. Same-file ledger-Open audit (this iter): brief-verified live — strip_newline `js/pager.js:2941` (D-2565), xcrypt `js/rumors.js:34`, what_datamodel_is_this `js/version.js:329`, sgn `js/eat.js:2848` + 17 clones (consolidation over cap, left); read-verified C-cited in `js/hacklib.js` — highc lowc lcase ucase upstart trimspaces eos str_start_is str_end_is str_lines_maxlen strkitten copynchars ing_suffix stripchars stripdigits strsubst strNsubst findword ordin distmin dist2 online2 fuzzymatch swapbits; nh_snprintf skipped (Snprintf-macro backend only, zero direct C callers — printf-family pass).

## 2026-10-02 — D-3296 `cmd.c` missing-arm trio: levltyp_to_name + table, do_rush_west, cmdq_reverse

**C locus:** - `levltyp_to_name`: nethack-c/upstream/src/cmd.c:1089–1094 whole body (C extern, extern.h:425) + `levltyp[MAX_TYPE+2]` table cmd.c:1072–1086 (37 rm.h-order names + `[37]` undiggable + `[38]` pad). C callers mon.c:226 (inside `#if 0` `:223–235`, dead) + nhlua.c:551 (in `nhl_getmap`, ledger by-design "no scored analogue").
**JS:** - `levltyp_to_name`: `js/cmd.js:634` (exported, C extern); table `js/cmd.js:613`.
**Change:** - `levltyp_to_name`: `export const levltyp` (39 entries, C `:1073–1085` order verbatim) + `export function levltyp_to_name` in C order (`typ >= 0 && typ < MAX_TYPE` short-circuit, NULL → null); `MAX_TYPE` added to the existing const.js import (value 37 = rm.h:94; no new edge).
**Verify:** `node scripts/verify.mjs --fn levltyp_to_name,do_rush_west,cmdq_reverse` tail pasted verbatim:
**Named:** - `levltyp_to_name`: none in-body — whole C body + table live (both C callers unwired as above).
**Next:** head is now `hacklib.c` digit (missing-arm row); `cmd.c` holds no more Open rows.

## 2026-10-02 — D-3295 `getpos.c`/`selvar.c` sethilite gather pair: getpos_getvalids_selection + selection_force_newsyms port, sethilite restart

**C locus:** - `getpos_getvalids_selection`: nethack-c/upstream/src/getpos.c:102–115 whole body (C staticfn) — null-guard `:108–109`, then `selection_setpoint(x, y, sel, 1)` every sel-scoped cell where validf is true (`:111–114`; x from 1, y from 0). C callers getpos.c:53 (old valids) + :56 (new valids), both in getpos_sethilite.
**JS:** - `getpos_getvalids_selection`: `js/getpos.js:103` (module-local, C staticfn).
**Change:** - `getpos_getvalids_selection`: module-local `function getpos_getvalids_selection(sel, validf)` in C order (guard + sel.wid/sel.hei scans + `selection_setpoint`); live `selection_setpoint` import (mklev.js:30157), no clone.
**Verify:** `node scripts/verify.mjs --fn getpos_getvalids_selection,selection_force_newsyms` tail pasted verbatim:
**Named:** - `getpos_getvalids_selection`: none in-body — whole C body live (`typeof validf` guard is the JS null-vs-undefined idiom for C `!validf`).
**Next:** head is now `cmd.c` levltyp_to_name (missing-arm row); queue refilled per-row-evidence below.

## 2026-10-02 — Audit 2247–2255: review D-3286–D-3294 (9 ACCEPT) + full score

**Scope:** d8fa56ce0…6f1e33d59 (9 js/ SHAs since 2246), one SHA at a time, each re-measured via `hidden-proxy verify --base <sha>~1 --reach-all`.
**Verdicts:** 9 ACCEPT, 0 Must-fix. Every D-log verify claim re-measured exact (0-blocked vacuous + smoke/reach REACH-OK per fn; zero REGRESSED). Unqueued nits: D-3294 RND ledger note cites C :62-66 for a :62-64 body; onlyspace js/topten.js:65 trims all whitespace where C keeps space/tab-only (single caller topten.c:325, names can't hold newline — predates window, survey note).
**Fortress:** public 44/44 (Scr 11405, RNG 792838, `329+1.62/turn` R² 0.78); corpus 705/953 (74.0%), RNG 98.09%, scr 93.4%, 0 losses, 1 gain (scen-tour-Valkyrie-92040); `full: true` @6f1e33d59 fullAt 16:04:02Z. Held-out 15/44 (+0), rank 5.
**Ledger:** snapshot appended; `ledger.mjs sql` unrunnable (node v20, no node:sqlite) — 5 ported rows sampled via jsonl+brief instead (drop, wiz_flip_level, trapeffect_dart_trap, sfi_version_info, vtense): all stand. Refill: coverage 0 rows, queue 30/30 tagged (0 eligible; scoreboard hash verified unchanged after the read-only queue call); ~20-brief hand survey converged with D-3294's Next survey (dead decl-only callbacks / representation-subsumed / live) → 0 new rows, queue stays 7 Open (below band, no filler). Ledger: known_vibrating_square_at → ported (stale, whole at js/getpos.js:740); makevtele effect inlined js/mklev.js:28302-28304 (tool needs a --js fn for ported/split — left absent, do not row).
