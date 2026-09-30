# Review 2127 — c8af100c3 — nine option handlers

SHA `c8af100c3`, D-3167; 2026-09-30; +339 JS. No closure.

**Addressed:** D-3173

## Intent vs deliverable

Subject promises “9× optfn ports”. Diff adds nine sync exports and allopt
dispatch entries. Error branches ship with silent callees.

## Inventory — optfn_altkeyhandling

New whole export; no Unix callees.

## C ↔ JS fidelity — optfn_altkeyhandling

options.c:1021–1063 accepts init/set, empties gets; Windows-only handler
guards excluded correctly.

## Inventory — optfn_glyph

New export; mungspaces/glyphrep LIVE, bad_negation STUB.

## C ↔ JS fidelity — optfn_glyph

options.c:1814–1849 negated-value, empty, mung/parse, get/cnf order matches;
error message disappears.

## Inventory — optfn_tile_file

New export; dupstr LIVE, GC free.

## C ↔ JS fidelity — optfn_tile_file

options.c:4320–4351 value/empty guards, replacement, default/config output
match ordinary strings.

## Inventory — optfn_tile_height

New export; string/int/buffer CLONEs, bad_negation STUB.

## C ↔ JS fidelity — optfn_tile_height

options.c:4353–4383 preserves negated-zero/value/error/bare and
numeric/empty/default gets; diagnostic missing.

## Inventory — optfn_tile_width

New export; same closure.

## C ↔ JS fidelity — optfn_tile_width

options.c:4385–4415 same branch sequence on width; diagnostic missing.

## Inventory — optfn_vary_msgcount

New export; same closure.

## C ↔ JS fidelity — optfn_vary_msgcount

options.c:4439–4469 same branch sequence on count; diagnostic missing.

## Inventory — optfn_crash_urlmax

New export; string/int CLONEs, config_error_add STUB.

## C ↔ JS fidelity — optfn_crash_urlmax

options.c:1310–1339 preserves <75 rejection/store and null-output guard;
diagnostic missing.

## Inventory — optfn_pile_limit

New export; string/int CLONEs, bad_negation STUB.

## C ↔ JS fidelity — optfn_pile_limit

options.c:3403–3435 preserves zero/value/default and negative reset;
diagnostic missing.

## Inventory — optfn_player_selection

New export; strncmpi LIVE, config_error_add STUB.

## C ↔ JS fidelity — optfn_player_selection

options.c:3437–3468 six-character dialog/prompt prefixes and gets match;
unknown-value diagnostic missing.

## Hallucinations / overclaim

“Every C callee live” is false: bad_negation is empty; botl.config_error_add
is empty. C options.c:6692–6697 calls cfgfiles.c:1864–1872, which
formats/enqueues via :1874–1890. No same-commit named omit. Other adapters
preserve strings/buffers/atoi for ordinary input. Each callers query: zero
direct refs; generic parseoptions/allopt dispatch is wired. No RNG in these
bodies. Diff anti-pattern scan empty; Rule #2 clean. Nothing
deleted/repointed; no cycle excuse.

## Density

Ledger: all nine ported individually. Function verdicts:
altkeyhandling/tile_file ACCEPT;
glyph/tile_height/tile_width/vary_msgcount/crash_urlmax/pile_limit/player_selection
QUALITY-RISK. Nine live ports plus four unrelated ledger retirements exceed
ten; grouped Verify uses placeholders rather than individual named lines.

## Verification

On this SHA, all nine in one call, `--base c8af100c3~1 --reach-all`. Both
summary lines per function:

| Function | verify | smoke |
|---|---|---|
| optfn_altkeyhandling | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_glyph | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_tile_file | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_tile_height | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_tile_width | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_vary_msgcount | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_crash_urlmax | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_pile_limit | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_player_selection | 0 blocked | 24 PASS, 0 regressed, REACH-OK |

D-log green/strict/cohort/full claims do not exercise error sinks.

## Actionable C-wrongs

1. Close option-error reporting: replace bad_negation and config_error_add
   stubs with C formatting/enqueue behavior and wire these handlers.

Verdict: **QUALITY-RISK**
