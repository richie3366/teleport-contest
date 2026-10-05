# Review 2400 — eb19a3f45 — objclass/monclass class rewire

## Metadata

- SHA: `eb19a3f45` (2026-10-05) — D-3476.
- Subject: Open head: impossible audit + objclass/monclass class→get_table_str_opt rewire (sp_lev.c:3457/:3133 raw-field gap).
- Diff: `js/mklev.js` (+16/−5: shared adapter restart), new `scripts/lspo-objclass-field.test.mjs` (48 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) shared
`get_table_objclass_field` restarted through the live helper
(`const s = get_table_str_opt(o, 'class', null)`, C :3457/:3133) with C's
strlen==1 gate kept; (c) both callers pass non-null spreads so `lua_field` ≡
`o.class`; (d) behavior delta is exactly the C conversion.

The diff actually adds: the helper call + comment + `s != null && s.length === 1`
gate in the adapter; raw `o.class` read deleted; no import change; a 6-assert
node:test file (5 helper-conversion + 1 wiring assert). Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `get_table_objclass_field` (mklev.js:22794, local shared adapter) | adapter restart (covers 2 C fns) | sp_lev.c:3455–3464 + :3131–3140 | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:584–634 | re-verified (see 2399) |
| `get_table_str_opt` (dungeon.js:388, live import) | C callee, LIVE | nhlua.c:1053–1076 | pre-existing whole |

## C ↔ JS fidelity

C (`csym.mjs`): `get_table_objclass` sp_lev.c:3454–3464 and `get_table_monclass`
:3130–3140 are byte-identical bodies: `s = get_table_str_opt(L, "class", NULL)`;
`if (s && strlen(s) == 1) ret = (int) *s; Free(s); return ret` (−1 default).
One shared adapter covering both is faithful — no divergence to track.

Branch-by-branch confirm:

- `:3457/:3133` read — JS `:22801` calls the live helper with `(o, 'class',
  null)`. Both callers (:22989 object normalize, :23253 monster normalize) pass
  `tmp` spreads (`{...o}` at :23017/:23311 — always a non-null object even for
  nullish `o`), so `lua_field` ≡ `o.class` and nil/string/function/else
  classifications match C (direct numbers/booleans/tables throw both sides).
- `:3460/:3136` gate — `s != null && s.length === 1` is C's `s &&
  strlen(s)==1`; `charCodeAt(0)` is `(int)*s` for the ASCII class domain.
  NUL-in-string matches too (helper returns `dupstr`, which cuts at NUL like C).
- Pre-existing note (not this SHA): a non-ASCII 1-code-unit string (e.g. U+00E9)
  passes the JS gate where C's byte `strlen` would give −1. Same gate existed
  before (`typeof s === 'string' && s.length === 1`); class chars are ASCII in
  scored paths. No action.
- C-order: C reads "id" before "class" (:3541–3542); JS reads id (:22988) then
  class (:22989) — order preserved. The single-read disclosure (C re-reads class
  at :3653/:3358; JS reads once) is unobservable for data tables and correctly
  disclosed, not hidden.
- `impossible` audit — same standing text as 2399; JS body re-read there, all
  arms live, Rule #2 omits correctly kept. Audit true.

Required `sym.mjs` output (diff re-points the adapter's input contract):

```text
get_table_objclass_field NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22794
```

Both users of the adapter (:22989, :23253) flow through the restarted body —
no stale raw-read caller remains. No import change (edge at mklev.js:150 predates).

## Hallucinations / overclaim

None. The D-log's Callers bullet names wrapper users :3542/:3653/:3358 and
explicitly marks nhlobj.c:366 (obj.new wish path) as having no JS analogue —
a named boundary, not a silent miss. Corpus framing is the correct vacuous note.

## Density

Breadth-phase small SHA (no-gap regime; D-3467…D-3473 precedent). Per-function verdicts:

- `get_table_objclass_field` restart — whole :3455–3464 + :3131–3140 port, no
  stub in the arm. OK.
- `impossible` `audited` — body really whole vs C modulo named Rule #2 omits. OK.
- No `Left open:`, no bundled Must-fix.

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in 2399,
same iteration, no `js/` change between the two SHAs except this diff).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax/rule2 PASS,
  2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green 2/2,
  strict ×2, cohort 7/7, full 44/44; node:test 6/6.
- Audit re-measure (`hidden-proxy.mjs verify impossible,get_table_str_opt
  --base eb19a3f45~1 --reach-all`): 0 blocked at baseline and working
  scoreboard for both (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- New test's wiring assert (helper call + `s.length === 1` present, raw read
  gone) authenticates the change on the file.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
