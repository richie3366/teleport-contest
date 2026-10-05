# Review 2396 — 3eafb17b2 — lspo_grave text→helper rewire + impossible (D-3467)

Metadata: SHA `3eafb17b2`, D-3467, Open head (coverage impossible +
D-3466 omit :4262). 2 functions (≤10 → whole Method each). Files:
`js/mklev.js` (+6/−10: adapter deleted, helper call) +
`scripts/lspo-grave-text.test.mjs` (new, 5 tests). No import change.

## Intent vs deliverable

Promise: re-audit coverage-head `impossible` unchanged; rewire the
lspo_grave table-form text read from its inline adapter (threw on
function-produced numbers) to the shared `get_table_str_opt`, whose
C `luaL_optstring` converts them. Diff actually does: exactly that
— 9-line adapter replaced by one helper call + comment. Matches.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| get_table_str_opt@grave (site) | partial (wire) | js/mklev.js:23505–23509 | sp_lev.c:4262 via nhlua.c:1053–1076 |
| impossible | audited | js/display.js:8970 (unchanged) | pline.c:583–634 |

## C ↔ JS fidelity

**Rewire — confirm.** C sp_lev.c:4262
(`txt = get_table_str_opt(L, "text", NULL)`, grep-pinned) via
nhlua.c:1053–1076 (`csym.mjs`): STRING/NIL → `luaL_optstring`,
FUNCTION → pcall then `luaL_optstring` (accepts string/number/nil
— numbers convert via lua_number2str), else
`nhl_error("get_table_str_opt: no string")`, dupstr/NULL return.
The deleted adapter's gap is genuine: C converts fn-numbers, it
threw. The shared helper (js/dungeon.js:388) ports all four arms
in C order incl. fn-number `%.14g` conversion and both verbatim
throws; `ret != null` keeps `""` like C's pointer test.
Equivalences verified: `a` is a non-null object at the call (gate
js/mklev.js:23505–23506), so `lua_field` is `a.text`;
`lua_type` maps nil/string/function/else identically to the old
`== null`/`typeof` chain — the sole behavior delta is fn-number
conversion, exactly C's. Import edge pre-exists (mklev.js:150);
`sym.mjs get_table_str_opt` → single sync def, no clones.
No deleted/re-pointed named symbol (inline code, not an export).

**impossible — confirm (verified here, cited by 2397/2398).** C
:591–592 recursion panic, :594 latch, :595–597 vsnprintf chop,
:598 paniclog (Rule #2, named), :599–600 fuzzer panic pre-pline,
:602–604 URGENT pline, :606–610 sanity early-return, :612–619
disorder/report/support (pointer-tested), :621–631 CRASHREPORT
(Rule #2, named), :633 latch clear — all live in C order at
js/display.js:8970–9012. Whole modulo the standing omits.

Nit (not a C-wrong): the new JS comment and test comment cite
`:4261`; the call is at :4262 (D-entry correct). The whole
function's pre-existing comments sit ~2 lines low (create_des_coder
:4251 vs cited :4249) — local stale convention, behavior exact.

## Hallucinations / overclaim

None. "Behavior delta is exactly the C conversion" proved arm by
arm above. The "17 C callers not rewired" census inherits D-3466's
verified list minus :4262 (18→17); the remaining sites keep named
inline adapters, not silent stubs.

## Density

Breadth-phase whole-function bar: the site now calls the whole
helper (no adapter remainder); the audit re-certifies an unchanged
whole body. Ledger entries + Verify lines present; Left open: none.
One test file, 5/5 (conversion + wiring asserts on the HEAD file).

## Verification

D-log: 2× hidden note (rows cited none) + 2× REACH-OK, green,
strict, cohort, full 44/44. Re-ran `hidden-proxy.mjs verify
impossible,get_table_str_opt --base 3eafb17b2~1 --reach-all`: 0
blocked at baseline and working scoreboard on both; 2× REACH-OK
(24/24 each, 0 regressed). Claim true. `node --test`
lspo-grave-text: 5/5. Rule #2 clean (iteration-wide). Diff grep:
no FORCE/DIAG/seeds/coords/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
