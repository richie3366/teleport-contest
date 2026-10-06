# Review 2421 — d871471f3 — wall_property int-opt rewire (2416.1)

## Metadata

- SHA: `d871471f3` (2026-10-06) — D-3518.
- Subject: Must-fix: sp_lev.c wall_property 4-field→
  get_table_int_opt rewire (review 2416.1; second
  get_table_coords_or_region expansion).
- Diff: `js/mklev.js` (4 calls + cite), new
  `scripts/lspo-wall-property-int.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Must-fix ships alone. Claims to close review 2416
  Actionable 2416.1 (stamped `**Addressed:** D-3518`).

## Intent vs deliverable (promise vs diff)

Promises: (a) the four wall_property coord sites restarted
through the live whole helper on the EXISTING mklev→dungeon
edge, in place and in C order (after the lcheck_param_table
read :5887, before the region fallback :5571–5576); (b) cite
corrected to region-expansion style; (c) behavior delta is
exactly the C conversion; (d) zero in-tree behavior change;
(e) 2416.1 closed — the `ported` census now true.

The diff actually adds: four `get_table_int_opt(o, …)` reads
with the corrected cite, plus the wiring test. No import
hunk. Delivered = promised, all five points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_wall_property` 4 sites | C call wiring | sp_lev.c:5889 via :5565–5568 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge mklev.js:150) | nhlua.c:1028–1039 | whole body, census now closed |
| `splev_opt`-style inline `\|0` | divergent adapter | n/a | gone from this arm |

## C ↔ JS fidelity

C (`csym.mjs lspo_wall_property` → sp_lev.c:5875–5908; helper
→ :5560–5577): `create_des_coder()` :5885,
`lcheck_param_table` :5887, coords call :5889 into
`get_table_coords_or_region` whose four reads sit at
:5565–5568. Cites exact; JS placement keeps C order
(table check → :5565-68 → region fallback :5571–5576).

Branch-by-branch confirm:

- Four reads — defaults -1 match C; `o` is the
  object-checked non-null table, so `lua_field` ≡ `o[name]`
  and nil ⟺ `== null`. OK.
- Conversion delta — absent → -1, integers verbatim,
  integral floats + numeric strings convert, beyond-int32
  truncates like the `(int)` cast, fractions and direct
  non-numerics now throw like argerror. Exactly C. OK.
- Census closure — `csym.mjs --callers
  get_table_coords_or_region` shows exactly two C call sites
  (:5607 region, rewired D-3508; :5889 wall_property, rewired
  here). Both expansions now read through the helper, so the
  `ported` "all C sites closed" claim is true. 2416.1 done. OK.
- Entry-source audit (re-run) — `lspo_wall_property` occurs
  in `js/` only at the def (js/mklev.js:5209) + 2 comments;
  scripts/ hits are source-reading test asserts, not calls.
  No in-tree behavior change possible. OK.
- Import edge — `get_table_int_opt` already on the mklev.js
  dungeon import line; no new edge, no `--can` needed
  (no cycle claim). OK.

Required `sym.mjs` output (diff re-points the local adapter
to the import):

```text
get_table_int_opt js/dungeon.js:351   sync
lspo_wall_property js/mklev.js:5209   sync
```

## Hallucinations / overclaim

None. One nit: the D-log C locus cites `:5876–5908` where
`csym.mjs` prints `:5875–5908` (the `int` return-type line).
Same convention as the standing ledger row — docs-only, no
behavioral content.

## Density

Must-fix ships alone per the rule: one function, one
`Ledger:` entry (`lspo_wall_property ported`, d=D-3518
added), one Verify line, no `Left open:`, no bundled
Must-fix. Per-function verdicts:

- `lspo_wall_property` 4 sites — whole :5565–5568 port via
  :5889, order kept, cites exact, zero in-tree callers. OK.
- `get_table_int_opt` `ported` — census now closed (both
  expansions rewired; review 2416's 8-claim second sample
  already green). OK.

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration: no bare/node specifiers
or fs calls).

## Verification

- D-log: `verify.mjs --fn lspo_wall_property` → syntax PASS,
  rule2 PASS, hidden note (none blocked), REACH-OK (smoke
  24/24), green 2/2, strict ×2, cohort 7/7, auto full 44/44
  (shared file changed); node:test new 1/1 (0/1 pre-change)
  + neighbors 37/37.
- Audit re-measure (`hidden-proxy.mjs verify
  lspo_wall_property --base d871471f3~1 --reach-all`):
  0 blocked at baseline and working tree (vacuous,
  correctly labeled — the Must-fix row cited none); smoke
  24 PASS / 0 regressed → REACH-OK. No REGRESSED session.
  Matches the D-log.
- `node --test scripts/lspo-wall-property-int.test.mjs`:
  1/1 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
