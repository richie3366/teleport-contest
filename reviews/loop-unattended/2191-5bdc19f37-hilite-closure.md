# Review 2191 — 5bdc19f37 — status-hilite closure (impossible arms + 3 whole)

SHA `5bdc19f37`, D-3230; 2026-10-01; js/botl.js (+10/−9).
Four-function cluster (botl.c, one file): 1 changed, 3 declared
whole-but-untouched (audited below, not sampled). Closes no prior
review.

## Metadata

- Subject: "`botl.c` status-hilite closure: hilite2str impossible
  arms live + 3 verified-complete (coverage) (D-3230)."
- Promises: 5 corrupt-rule impossible() arms live with exact C
  strings, un-awaited per the :357 precedent; 3 siblings verified
  whole with only by-design menu_add caller gaps.

## Intent vs deliverable

Kept. The diff flips exactly the 5 comment arms to live `else
void impossible(…)` one-liners and updates the doc block. No
sibling touches — their ported declarations are verified in the
fidelity section from the current tree.

## Inventory — status_hilite2str

Changed: `status_hilite2str` (js/botl.js, local) — 5 arms +
doc. No new imports (impossible pre-imported :75), no deleted/
re-pointed symbols (`sym.mjs` re-point check vacuous).

## C ↔ JS fidelity — status_hilite2str

C `botl.c:3589–3669` (csym): all 5 `impossible("hl->behavior=…")`
strings match byte-for-byte (percentage/updown/absolute/
textmatch+`rel or textmatch error`/condition) ✓, in the correct
else-arms ✓. `void` (un-awaited) is sound: the sole wired caller
is the sync gather (`:3580` → js/botl.js:3069 ✓), and the :357
precedent establishes the pattern; the arms are corrupt-rule-only
(no ported path constructs a bad rel). Other callers `:4289`/
`:4298` verified inside `status_hilite_menu_add` (:3890–…, by-
design, no JS body) — correctly named, not silently dropped ✓.
No RNG ✓.

## Inventory — status_hilite_menu_choose_updownboth

Untouched this SHA (js/botl.js:3175, exported async); declared
ported — audited whole against C here.

## C ↔ JS fidelity — status_hilite_menu_choose_updownboth

C `botl.c:3810–3887` (csym): ltok rows with BL_AC Better/Less
wording ✓, `hasStr = str != null` ≡ C pointer test ("" shown) ✓,
unconditional EQ ✓, gtok GE/GT with BL_AC Worse/More wording ✓,
`Select field %s value:` prompt ✓, PICK_ONE res>0 → a_int−10 ✓.
Menu mechanics fold into select_menu_pick_one (file adaptation,
documented at both call sites). Callers `:4057`/`:4088`
verified inside menu_add ✓ — named gap is real. Whole: confirm.

## Inventory — status_hilite_menu

Untouched (js/botl.js:3555, exported async); declared ported —
audited whole here.

## C ↔ JS fidelity — status_hilite_menu

C `botl.c:4497–4578` (csym): redo loop ✓, gather + BL_FLUSH
count ✓, View-all + `""` separator ✓, per-field rows with the
SCORE_ON_BOTL-off skip ✓, `%-18s` padEnd + `(%d defined)` ✓,
pick dispatch (viewall / menu_fld→reset) ✓, recount + done ✓,
fuzzer gate ✓, hilite_delta=3 ✓, return TRUE ✓. Callees all
resolve same-module (gather/linestr, viewall :3528, menu_fld
:3453, reset :3413, blstatFldName :3141) ✓. Sole C caller
options.c:8465 → wired js/options.js:4395 ✓ (verified). Whole:
confirm.

## Inventory — all_options_statushilites

Untouched (js/options.js:12900, exported); declared ported —
audited whole here.

## C ↔ JS fidelity — all_options_statushilites

C `botl.c:4476–4495` (csym): done/gather pair ✓, walk with
`OPTIONS=hilite_status: %.*s\n` ✓ — the precision is exact
(C `BUFSZ − sizeof(lit) − 1` ≡ JS `BUFSZ − (length+1) − 1`, since
sizeof counts NUL) ✓, trailing done ✓. Sole C caller :9741 →
wired js/options.js:12966 ✓ (verified). Whole: confirm.

Diff grep on the js hunk: 0 hits. Rule #2 clean (no new imports).

## Hallucinations / overclaim

None. "Exact C strings" verified byte-for-byte; the sibling
"whole" claims verified arm-for-arm above rather than trusted.

## Density

Four whole C functions of one C file, one js file, no Must-fix
bundled ✓. Below the ~80 guideline with the file/closure
exhausted (2 stale pops en route) — legitimate small-C closure,
named in the D-log.

- Ledger: status_hilite2str ported — ACCEPT.
- Ledger: status_hilite_menu_choose_updownboth ported — ACCEPT.
- Ledger: status_hilite_menu ported — ACCEPT.
- Ledger: all_options_statushilites ported — ACCEPT.

## Verification

Re-measured (current tree):

```text
verify status_hilite2str: 0 blocked → smoke 24 PASS, 0 regressed → REACH-OK
verify status_hilite_menu_choose_updownboth: 0 blocked → smoke 24/24 → REACH-OK
verify status_hilite_menu: 0 blocked → smoke 24/24 → REACH-OK
verify all_options_statushilites: 0 blocked → smoke 24/24 → REACH-OK
```

Matches the D-log (4× vacuous note + REACH-OK, green/strict/
cohort/full 44/44). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
