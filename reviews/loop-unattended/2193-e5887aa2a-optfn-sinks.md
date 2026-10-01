# Review 2193 — e5887aa2a — optfn sink closure (4 sinks + 3 whole)

SHA `e5887aa2a`, D-3232; 2026-10-01; js/options.js (+8/−8).
Seven-function cluster (options.c, one file): 4 one-line sink
wires, 3 declared whole-but-untouched (audited below). Closes no
prior review.

## Metadata

- Subject: "`options.c` config_error_add-sink closure: 4 optfn
  diagnostics wired + 3 queued bodies verified whole (D-3232)."
- Promises: each sink one live `config_error_add("<Unknown|
  Illegal> %s parameter '%s'", allopt_name(optidx), op)` with the
  exact C format string; both `void optidx` placeholders removed;
  4 map clauses retired; handlers verified comment-accurate.

## Intent vs deliverable

Kept. The diff wires exactly the 4 do_set diagnostics and
removes the 2 `void optidx` placeholders. No handler touches —
their ported declarations are verified from the current tree.

## Inventory — 4 optfns (changed)

Changed one line each: `optfn_msg_window` (:1848),
`optfn_menu_objsyms` (:1984), `optfn_whatis_coord` (:2301),
`optfn_number_pad` (:2419). No new imports (sink :247 and
allopt_name :1792 pre-existing, same-file), no deleted/
re-pointed symbols.

## C ↔ JS fidelity — 4 optfn sinks

All 4 C arms re-read in pinned options.c: `:2494–2495` Unknown
(msg_window) ✓, `:2253–2254` Illegal (menu_objsyms) ✓,
`:4724–4725` Unknown (whatis_coord) ✓, `:2600–2601` Illegal
(number_pad) ✓ — format strings exact, `allopt[optidx].name`
≡ `allopt_name(optidx)` (verified: scans allopt rows by idx →
row.name) ✓, `op` bound in all four (param ×2, verified locals
×2 — whatis :2294, number_pad :2404) ✓. Return/retval lines
untouched ✓. Structures: all four bodies carry do_init/do_set/
get_val arms with C citations plus async-split do_handlers
(dispatch rows + :3453–3467 verified wired; :5880 direct caller
verified) — the sinks were their only gaps. No RNG ✓.

## Inventory — handler_menu_objsyms

Untouched (:2023, exported async); declared ported — audited
whole here.

## C ↔ JS fidelity — handler_menu_objsyms

C `options.c:5794–5829` (csym): `%-12.12s%c%.60s` rows (slice+
padEnd exact) ✓, a_int i+1, selector '0'+i, gacc *buf ✓,
SELECTED on current ✓, end prompt ✓, n>0 → a_int−1 with the n>1
disambiguation folded into the helper (documented) ✓, OPTN_OK ✓.
Caller :2284 → :3453 wired ✓. Whole: confirm.

## Inventory — handler_whatis_coord

Untouched (:2327, exported async); declared ported — audited
whole here.

## C ↔ JS fidelity — handler_whatis_coord

C `options.c:6205–6276` (csym): 5 rows with exact strings ✓,
blank + map info with verbose suffix ✓, non-tty row gated ✓,
COL80 branch with `[%02d,%02d]` padStart ✓, pick + pick_cnt>1
folded into the helper (named adaptation) ✓, OPTN_OK ✓. Caller
:4742 → :3465 wired ✓. Whole: confirm.

## Inventory — initoptions_finish

Untouched (:8941, exported); declared ported — audited whole
here.

## C ↔ JS fidelity — initoptions_finish

C `options.c:7323–7384` (csym): rcfile ✓, fruitadd + oc_name via
init_fruit_chain (verified covers both :7329/:7341) ✓, boulder
showsyms + reset_glyphmap named (match the standing by-design
stance) ✓, STATUS_HILITES block ✓, rest_on_space ✓, tiled/ascii
fallback (exact comma-operator shape) ✓, ENHANCED_SYMBOLS block
✓, opt_initial=FALSE ✓. Caller :7114 → :8930 wired ✓ (other two
refs are comments ✓). Nit (not a C-wrong): the `:5680–5693`
line citation for init_fruit_chain drifted (now :7324) — function
reference correct. Whole: confirm.

Diff grep on the js hunk: 0 hits. Rule #2 clean (no new imports).

## Hallucinations / overclaim

None. "Import already present :247" and "same-module :1792"
verified; the stale-pop claims (get_uchars/e_at/bill_box_content/
kickstr) are ledger operations outside this diff, each with a
file:line note.

## Density

Seven whole C functions of one C file, one js file, no Must-fix
bundled ✓. Below the ~80 guideline with bodies already whole —
legitimate sink-closure, named in the D-log.

- Ledger: handler_whatis_coord ported — ACCEPT.
- Ledger: initoptions_finish ported — ACCEPT.
- Ledger: handler_menu_objsyms ported — ACCEPT.
- Ledger: optfn_whatis_coord ported — ACCEPT.
- Ledger: optfn_menu_objsyms ported — ACCEPT.
- Ledger: optfn_msg_window ported — ACCEPT.
- Ledger: optfn_number_pad ported — ACCEPT.

## Verification

Re-measured (current tree, one call):

```text
verify ×7: 0 blocked each → smoke 24 PASS, 0 regressed → REACH-OK each
```

Matches the D-log (7× vacuous note + REACH-OK, green/strict/
cohort/full 44/44). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
