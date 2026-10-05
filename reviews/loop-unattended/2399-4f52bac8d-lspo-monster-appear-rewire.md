# Review 2399 — 4f52bac8d — lspo_monster appear_as rewire

## Metadata

- SHA: `4f52bac8d` (2026-10-05) — D-3473.
- Subject: Open head: impossible audit + lspo_monster appear_as→get_table_str_opt rewire (sp_lev.c:3326 String-coercion gap).
- Diff: `js/mklev.js` +35/−? (one call site + adapter restart), new `scripts/lspo-monster-appear.test.mjs` (48 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole modulo standing Rule #2 omits, no JS change;
(b) the appear_as site restarted through the live `get_table_str_opt` helper on the existing
mklev→dungeon edge (no import change); (c) `String()` coercion deleted; prefix dispatch +
Unknown-type throw unchanged; (d) behavior delta is exactly the C conversion.

The diff actually adds: one helper call + comment in `lspo_monster_normalize_table`
(`const mappear = get_table_str_opt(tmp, 'appear_as', null)`); a restarted
`lspo_monster_appear(mappear)` taking converted string-or-null (doc comment rewritten);
no import change; a 6-assert node:test file (5 helper-conversion + 1 wiring assert).
Delivered = promised. No other JS function added, deleted, or re-pointed.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_monster_appear` (mklev.js:23137, local) | adapter restart (not a C fn) | sp_lev.c:3327–3339 dispatch | whole |
| `lspo_monster_normalize_table` call site (:23227) | C call wiring | sp_lev.c:3326 | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:584–634 | re-verified below |
| `get_table_str_opt` (dungeon.js:388, live import) | C callee, LIVE | nhlua.c:1053–1076 | pre-existing whole |

## C ↔ JS fidelity

C (`csym.mjs lspo_monster` → sp_lev.c:3213–3400): `:3326 mappear =
get_table_str_opt(L, "appear_as", NULL)`; `:3327 if (mappear)` with `:3328–3335`
strncmp obj:/mon:/ter: dispatch else `nhl_error("Unknown appear_as type")`;
`:3337 dupstr(&mappear[4])`; `:3338 Free`. NULL → appear stays 0, appear_as stays NULL.
Helper C (nhlua.c:1053–1076): string/nil → optstring; function → pcall + optstring
(string/number/nil); else → `nhl_error("get_table_str_opt: no string")`.

Branch-by-branch confirm:

- `:3326` read — JS `:23227` calls the live helper with `(tmp, 'appear_as', null)`.
  Equivalence holds: the sole caller (`l_create_monster`, mklev.js:23311) passes
  `tmp = {...o}` after a null/non-object guard, so `lua_field(tmp,'appear_as')`
  (dungeon.js:252: `tbl[name]` for non-null objects) ≡ `tmp.appear_as`, and
  `lua_type` (dungeon.js:225) classifies nil/string/function/else exactly like
  C's LUA_TSTRING/LUA_TNIL/LUA_TFUNCTION/else (direct numbers/booleans/tables
  throw on both sides).
- `:3327` NULL gate — JS `if (mappear == null)` matches C's pointer test;
  empty string `""` is truthy in C (→ dispatch → nhl_error) and non-null in JS
  (→ dispatch → throw). Correct.
- `:3328–3335` dispatch — `startsWith` is C `strncmp` case-sensitive for these
  prefixes; unknown prefix throws like `nhl_error`. `slice(4)` = `&mappear[4]`.
- `:3337–3338` — `Free` has no JS analog (GC); no leak semantics.
- NULL default — JS returns `appear_as: ''` where C keeps NULL. Pre-existing
  (the null arm returned `''` before this commit) and unobservable downstream:
  the consumer (`splev_create_monster`, mklev.js:21859) collapses non-strings
  to `''`, and the fixup (`:21993 if (!appear_as) return`) treats `''` as absent.
- `impossible` audit — JS display.js:8970–9030 re-read: recursion latch throw
  (:591–592), vsnprintf chop (:595–597), fuzzer panic (:599–600), URGENT pline
  (:602–604), sanity early-return (:606–610), disorder/report/support
  (:612–619) all live; paniclog (:598) + CRASHREPORT (:621–631) remain Rule #2
  filesystem/network omits, correctly kept in Named. Audit true.

Required `sym.mjs` output (diff re-points the local adapter's input contract):

```text
lspo_monster_appear NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:23137
get_table_str_opt js/dungeon.js:388   sync
```

Single caller of the adapter (mklev.js:23228), rewired in this diff — no stale
raw-value caller remains. No import change (edge at mklev.js:150 predates this SHA).

## Hallucinations / overclaim

None. "Behavior delta is exactly the C conversion" verified arm-by-arm above.
The D-log does not claim corpus PASS — it reports "2× hidden note (none blocked —
normal; rows cited none)", which is the correct vacuous framing.

## Density

Breadth-phase small SHA (not a batch manifest; the commit documents `batch`: no gap
left). Per-function verdicts:

- `lspo_monster_appear` restart — whole :3327–3339 port, no stub in the arm. OK.
- normalize_table `:3326` call site — C caller wired to the live helper. OK.
- `impossible` `audited` — body really whole vs C modulo named Rule #2 omits. OK.
- No `Left open:`, no bundled Must-fix, no manifest deviation (no manifest exists
  in the no-gap regime; D-3467/D-3469/D-3471 precedent).

Banned-pattern grep on the `js/` hunk (`FORCE|DIAG|getRngLog|fastforward`): 0 hits.
`imports.mjs --rulecheck` over scored `js/`: "Rule #2 clean".

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax PASS, rule2 PASS,
  2× hidden note (none blocked), 2× REACH-OK (smoke 24/24 each), green 2/2,
  strict ×2, cohort 7/7, full 44/44 (auto: shared file changed); node:test 6/6.
- Audit re-measure (`hidden-proxy.mjs verify impossible,get_table_str_opt
  --base 4f52bac8d~1 --reach-all`): both functions 0 blocked at baseline and
  working scoreboard (vacuous, correctly labeled — queue row cited no blocks);
  smoke 24 PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log claim exactly.
- New test authenticates the change on the file (helper call present,
  `String(appear_as)` gone) — genuine wiring coverage, not a tautology.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
