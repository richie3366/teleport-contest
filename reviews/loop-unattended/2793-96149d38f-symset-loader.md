# Review 2793 — 96149d38f — symset loader family whole + handling-aware render

- **SHA:** `96149d38f` (Wed 2026-10-14) — welcome-row writer (D-3941).
- **D-entry:** D-3941. **Ledger:** 24 rows (19 ported, 2 partial, reader rows).
- **Diff size:** ~870 `js/` insertions (options.js +408, display.js +390,
  generated symbols, extractor, 13-it test). Board: 1 row.
- **Method:** cliff commit — whole Method per function (no RNG in family).

## Intent vs deliverable (promise vs diff)

The subject promises: 95 step-0 symset divergences (C stripped-high-bit
cells vs JS ASCII) healed by embedding all 14 dat/symbols sets and
porting the loader family whole (fopen/read/proc/parse, inits,
update/clear/sethandling/get_othersym, 4 optfn do_sets, initoptions
arms) plus handling-aware render in map_glyphinfo — 5 PASS + 70 moved,
UTF8-blank refused as recorder artifact.

The diff delivers exactly that roster, plus reader tolerance
(botl/detect/wizcmds), the darkroom equate in the loaded arm, and
const.js dead-stub removal. Promise and diff agree — with one
shipped regression (LADDER, see below) that D-3941's own Next
falsifier had named ("a DECgraphics fortress session painting a
non-base char").

## Inventory (status = per-function verdict)

| JS function | C locus (csym) | Status |
|---|---|---|
| options.js `fopen_sym_file` (local, C static) | files.c:2610–2624 | whole (Rule-2 text sub) |
| options.js `read_sym_file` | files.c:2630–2674 | whole vs C |
| options.js `proc_symset_line` | symbols.c:430–434 | whole vs C |
| options.js `parse_sym_line` | symbols.c:437–654 | whole vs C |
| display.js `init_symbols` | symbols.c:84–92 | whole vs C |
| display.js `init_primary_symbols` | symbols.c:166–183 | whole vs C |
| display.js `init_rogue_symbols` | symbols.c:186–214 | whole vs C |
| display.js `init_showsyms` | symbols.c:94–109 | whole vs C |
| display.js `get_othersym` | symbols.c:130–163 | whole vs C |
| display.js `update_primary/rogue_symset` | symbols.c:306–310/:312–316 | whole vs C |
| display.js `clear_symsetentry` | symbols.c:318–349 | whole vs C |
| display.js `set_symhandling` | symbols.c:656–669 | whole vs C |
| options.js 4 optfn do_set arms | options.c:4166–4236/:3544–3586/:1393–1439/:1905–1960 | whole vs C |
| display.js `switch_symbols` FALSE arm | symbols.c:252–292 | whole vs C (TRUE named) |
| options.js `initoptions_init` :7199/:7213 | options.c | 2 calls, C order |
| display.js `symset_render_char` + map_glyphinfo arms | wintty.c g_putch :3739–3790 + nomux patch | C-exact exc. LADDER |
| generated `SYMBOLS_TEXT` + extractor | dat/symbols | byte-identical, 14 sets |
| reader tolerance (botl/detect×2/wizcmds) | windows.c:1484, detect.c:629/:1348 | faithful adaptation |
| const.js stub/dead-state removal | — | zero dangling refs |

Deleted-symbol audit (required): `sym.mjs` resolves
`update_primary_symset` → display.js:3749, `update_rogue_symset` →
:3759, `set_symhandling` → :3801 (all single sync exports);
`purge_custom_entries` → glyphs.js:1117 (newly exported, hoisted);
all inits/get/clear/switch/parse/read/proc single sync exports;
`fopen_sym_file` local-only, matching C `staticfn` (not clone drift).
The new display→glyphs edge joins the existing SCC (glyphs already
imports display); all three bindings hoisted, runtime-only use —
TDZ-safe, proven by execution (13/13 + 44/44 + corpus on this code).

## C ↔ JS fidelity

Parser: branch-for-branch vs C :437–654 (truncate/mung/comment-cut/
split/finish/match_sym/G_-gate/unknown-error/pick-list cases
0-2-3-5/CONTROL cases 0-1-2-4-5/symbol + G_ rows). All callees LIVE
single exports (match_sym/sym_val options.js, match_glyph/glyphrep
glyphs.js, mungspaces/fuzzymatch/strncmpi, parse_conf_file which
pre-skips `#`/blank lines). Byte-vs-char truncate unreachable (max
dat line 125 « BUFSZ). `read_sym_file` exact incl. the
"Default symbols"/"default" fallback (:2649–2667) and missing-finish
note. Inits exact: index-0 `'\0'` placeholders verified in drawing.c,
DEF_R_OC_SYM_FULL index-identical to C's 18-entry table, rogue
door/stair overrides exact, nocolor=1 default present.
`clear_symsetentry` C-ordered incl. the live ENHANCED_SYMBOLS UTF8
transition (config.h:368). All four optfn do_set arms exact
(name-store → read → failure sink → switch/assign/flags), BACKWARD_COMPAT
live (optlist.h:15); the compiled-out arms (CURSES_GRAPHICS :1366,
`#ifndef ENHANCED_SYMBOLS`) correctly skipped — but note the D-log's
line cites drift ±2 from csym ranges throughout (cite nits, not code).
Render: `symset_render_char` models g_putch rows + the nomux hook
(high-bit strip, graph_on/off decgfx, `<32` ignore) exactly —
verified against patch 006; SYMHANDLING follows currentgraphics in
both. Extractor output byte-identical to pinned dat/symbols (35,399).

Two gaps: (1) **LADDER regression (shipped):** the loaded arm rendered
DEC 0xf9/0xfa as dec:true `y/z` → terminal `≤`, overwriting the base
arm's deliberate judge-flat dec:false — 2 fortress PASS→FAIL
(Ranger-95303@839, Barbarian-582719@1000). Fixed by child 3022efdd7
(D-3943, review 2795). (2) Observation (no row — unreached
razor-edge): the loaded S_darkroom arm reads `car[S_room]`/
`car[X_nothing]` while C's equate copies post-switch showsyms (ov
side included) — diverges only with SYMBOLS= room/nothing overrides
under a loaded set, which no session does.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords, no RNG
calls. Rule #2: clean (iteration-wide, SHA 2790; generated-data
import is the D-0477 pattern).

## Hallucinations / overclaim

"Ported whole" holds for the named roster (verified above); the two
named unports (load_symset, do_symset browser) have
compiled-out/by-design callers as claimed, and the TRUE-arm
showsyms-source omission is named with its observed cost (10
re-attributions). The UTF8-artifact refusal was forward-confirmed by
D-3944's measurement (56 C glyphs, 0 recorded bytes). No overclaim
beyond the LADDER miss, which the commit's own falsifier flagged.

## Density

Cliff phase (§10.18): parent head was welcome 96/2815 (verified in
`96149d38f~1:docs/LOOP-QUEUE.md`), Must-fix empty. Writer family
ported whole in C order with own Ledger entries each; movement on 75
of 96 probes. One cliff, one C file family (+ its render consumer).
✓

## Verification

Focused test 14/14 at HEAD (13 here + D-3943's; ran). Re-measured
myself (`--base 96149d38f~1 --reach-all --jobs 8`, current code):

```
verify welcome: 6 PASS, 70 moved past (10 re-attributed at the same step), 20 unchanged, 0 worse → PROGRESS
smoke welcome: 24 PASS, 0 regressed → REACH-OK
verify read_sym_file: 0 blocked (vacuous, as disclosed) / smoke 24 PASS → REACH-OK
```

Superset of the D-log's 5/70/21 (later SHAs added the 6th PASS).
"moved → js-throw" lines are the `owner || 'js-throw'` display
fallback (hidden-proxy.mjs:676) — spot-checked rows show screen divs,
error/jsPanic null. No REGRESSED session on current code (the 2
LADDER FAILs healed by D-3943 — verified in review 2795).

## Actionable C-wrongs

1. Loaded-carrier LADDER dec:true overwrite (2 PASS→FAIL) — **already
   fixed by child 3022efdd7** (D-3943 Must-fix, shipped alone); no
   queue row filed (would be stale on arrival). Verified in review 2795.

Verdict: **ACCEPT-WITH-DEBT**
