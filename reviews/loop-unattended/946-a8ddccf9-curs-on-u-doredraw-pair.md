# Review 946 — a8ddccf9 — display.c curs_on_u/doredraw cursor-on-hero + redraw pair (D-1976)

- SHA: `a8ddccf9` — "display.c curs_on_u/doredraw cursor-on-hero + redraw pair (D-1976)."
- D-id: D-1976. JS: `js/display.js` (1 file, +33). C locus: `nethack-c/upstream/src/display.c` `curs_on_u` `:1686–1690`, `doredraw` `:1693–1698`.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the cursor-on-hero + #redraw pair. Diff actually adds:
exported async `curs_on_u()` (`await flush_screen(1)`) + exported async
`doredraw()` (`await docrt(); return ECMD_OK`), placed in C order before
`docrt`, plus the `ECMD_OK` const import. Both C bodies are one-liners
(5 + 6 lines); the ports are complete. Promise matches deliverable.

## Inventory

- New: `curs_on_u`, `doredraw` (both exported async). No other changes,
  no deletions/re-points. `sym.mjs`: single definitions, both ASYNC.

## C ↔ JS fidelity

Total C surface is two statements, both verified against csym output:

- `curs_on_u`: C `flush_screen(1)` → JS `await flush_screen(1)` with
  C's "Flush waiting glyphs & put cursor on hero" contract carried in
  the doc comment ✓. The await is forced (callee is async via bot/more
  nhgetch reach), not a shape change ✓.
- `doredraw`: C `docrt(); return ECMD_OK;` → JS `await docrt(); return
  ECMD_OK;` ✓ statement-for-statement. Probe confirms `doredraw → 0`
  (ECMD_OK) ✓.

Callee closure: `flush_screen`, `docrt` both async-live same-module;
`ECMD_OK` on the ALREADY `./const.js` edge (`--can` re-checked:
ALREADY; const read at runtime, no TDZ). No RNG, no branches, no
clones, no STUBs. Caller wiring (C call sites in allmain/eat/end/
explode/hack/trap; ext-table `cmd.c:1819`; `cmd.c:3917` check) named
with exact sites — functions live, unwired, honestly stated.

## Hallucinations / overclaim

None. "Same shape as `redraw_map`" is accurate. No movement claimed.

## Density

+33 lines for two whole 11-line C functions — below the ~40 soft floor
but squarely inside the "unless C is that small" exception: both
functions are complete, with nothing left to glue on (callers belong to
other rows). Pairing the two adjacent singletons is the §2b-shaped call.

## Verification

Honest vacuous notes for both functions (0 blocks each, no corpus-PASS
claimed); green + strict + cohort + auto-full 44/44 for both `--fn`
runs. Re-measured: `verify curs_on_u --base a8ddccf9~1` and `verify
doredraw --base a8ddccf9~1` → 0 blocked at baseline and now, both.
Export-smoke + return-value probe is proportionate for one-liners.
`imports.mjs --rulecheck` clean (re-run this review). Added-line grep:
no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
