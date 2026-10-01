# Review 2192 — 516e71ff9 — MENUCOLOR closure (sink + 4 whole)

SHA `516e71ff9`, D-3231; 2026-10-01; js/options.js (+5/−4).
Five-function cluster (coloratt.c/cfgfiles.c closure): 1 changed,
4 declared whole-but-untouched (audited below). Closes no prior
review.

## Metadata

- Subject: "`coloratt.c` MENUCOLOR closure: sink wired + 4
  verified-complete, palette by-design (coverage) (D-3231)."
- Promises: live `config_error_add('Malformed MENUCOLOR')` sink
  (C :627, import pre-existing); doc + map clause retired; 4
  siblings verified whole with palette/by-design caller gaps.

## Intent vs deliverable

Kept. The diff wires exactly the sink and corrects the doc block
(caller now wired). No sibling touches — their ported
declarations are verified from the current tree below.

## Inventory — add_menu_coloring

Changed: `add_menu_coloring` (js/options.js, exported) — sink
line + doc. No new imports/edges (config_error_add imported
:247 pre-existing), no deleted/re-pointed symbols.

## C ↔ JS fidelity — add_menu_coloring

C `coloratt.c:616–660` (csym): the `=`-missing arm fires
`config_error_add("Malformed MENUCOLOR")` + `return FALSE` ✓ —
JS now identical (string exact ✓). Sole C caller cfgfiles.c:1166
(the options.c:9599 ref is a comment) → wired js/cfgfiles.js:705
+ MENUCOLOR dispatch :1017 ✓ (both verified present). The rest of
the body (strncpy, mungspace/`&` split, clr/attr, quote-strip,
parsed tail) is pre-existing with C citations; the sink was its
only gap. No RNG ✓.

## Inventory — match_str2clr

Untouched (js/botl.js:1667, exported); declared ported — audited
whole here.

## C ↔ JS fidelity — match_str2clr

C `coloratt.c:348–371` (csym): fuzzy loop with first-match break
✓, `!matched && digit` + atoi ✓ (empty-string safe both sides),
range check + `Unknown color '%.60s'` sink unless suppressed ✓,
CLR_MAX default ✓. Callers: all 7 live C sites enumerated in the
D-log match csym's list exactly (spot-verified :3059→botl.js:1966
and :636→options.js:5948); `:1080` verified inside `#ifdef
CHANGE_COLOR` alternative_palette ✓ — correctly named. Whole:
confirm.

## Inventory — match_str2attr

Untouched (js/botl.js:1691, exported); declared ported — audited
whole here.

## C ↔ JS fidelity — match_str2attr

C `coloratt.c:373–389` (csym): fuzzy loop, −1 default,
`Unknown text attribute '%.50s'` sink iff complain ✓ — exact,
all 5 C callers live-wired per the D-log table (same-file
pattern as str2clr). Whole: confirm.

## Inventory — clr2colorname

Untouched (js/artifact.js:877, exported); declared ported —
audited whole here.

## C ↔ JS fidelity — clr2colorname

C `coloratt.c:337–346` (csym): first-match scan over the 16-entry
in-order table, NULL when absent. JS direct-index table with the
16 names in C order ≡ first-match (each color appears once) ✓;
OOB → `''` vs C NULL: safe adaptation (C callers would
strcpy-crash on NULL; all pass valid colors; every JS consumer
flows into template/strNsubst) ✓, documented in the commit
message. Callers: `:4271` inside menu_add ✓, `:9669` inside
`#ifdef CHANGE_COLOR` all_options_palette ✓ (both verified) —
correctly named. Whole: confirm.

## Inventory — cnf_line_MENUCOLOR

Untouched (js/cfgfiles.js:705, local); declared ported — audited
whole here.

## C ↔ JS fidelity — cnf_line_MENUCOLOR

C `cfgfiles.c:1164–1167`: `return add_menu_coloring(bufp)` ≡ JS
`return !!add_menu_coloring(bufp)` (boolean adaptation) ✓;
parsers[] MENUCOLOR dispatch :1017 wired ✓. Whole: confirm.

Diff grep on the js hunk: 0 hits. Rule #2 clean (no new imports).

## Hallucinations / overclaim

None. The "both resolved since" claim checks out (sink live,
caller + dispatch present with exact line numbers).

## Density

Five whole C functions of one closure, one js file, no Must-fix
bundled ✓. Below the ~80 guideline with the closure exhausted
(change_palette retired by-design en route) — legitimate,
named in the D-log.

- Ledger: add_menu_coloring ported — ACCEPT.
- Ledger: match_str2clr ported — ACCEPT.
- Ledger: match_str2attr ported — ACCEPT.
- Ledger: clr2colorname ported — ACCEPT.
- Ledger: cnf_line_MENUCOLOR ported — ACCEPT.

## Verification

Re-measured (current tree, one call):

```text
verify ×5: 0 blocked each → smoke 24 PASS, 0 regressed → REACH-OK each
```

Matches the D-log (5× vacuous note + REACH-OK, green/strict/
cohort/full 44/44). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
