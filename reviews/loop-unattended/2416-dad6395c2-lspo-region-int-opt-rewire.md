# Review 2416 — dad6395c2 — lspo_region int-opt rewire (last gap)

## Metadata

- SHA: `dad6395c2` (2026-10-06) — D-3508.
- Subject: Open head: impossible audit + lspo_region 6-field→
  get_table_int_opt rewire (sp_lev.c:5565-68/:5600/:5605 last
  splev_opt_int gap).
- Diff: `js/mklev.js` (6 sites in `lspo_region`'s table arm + delete
  of `splev_opt_int`), new `scripts/lspo-region-int.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch
  manifest empty; the rewire rides the Open head per precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) the six
region sites restarted through the live whole helper on the existing
mklev→dungeon edge, in place, already C order; stale per-line cites
corrected; dead `splev_opt_int` removed (region held its last uses);
(c) behavior delta is exactly the C conversion; (d) `get_table_int_opt`
flipped to `ported` — "all C sites closed: 43 wired".

The diff actually adds: six `get_table_int_opt(o, …)` reads with
corrected cites; deletes the adapter def + doc. No import hunk.
Delivered = promised except (d): the flip misses the second
`get_table_coords_or_region` expansion (see Actionable 2416.1).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_region` 6 sites | C call wiring | sp_lev.c:5600/:5605/:5565–5568 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge mklev.js:150) | nhlua.c:1028–1039 | whole body, wrong `ported` |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |
| `splev_opt_int` (deleted) | dead adapter | n/a | gone from `js/` |

## C ↔ JS fidelity

C (`csym.mjs lspo_region` → sp_lev.c:5583–5715; arm pinned at
:5595–5611): `needfill` :5600, `rlit` :5605, coords call :5607 into
`get_table_coords_or_region` :5560–5577 whose four reads sit at
:5565–5568. Cites exact; JS placement keeps C order
(:5600→:5605→:5565-68).

Branch-by-branch confirm (region arm):

- Filled/lit/coords reads — defaults 0/-1/-1 match C; `o` is
  `a ?? {}` plus an object check, always a non-null object, so
  `lua_field` ≡ `o[name]` and nil ⟺ `== null`. OK.
- Conversion delta — same C conversion as the series: fractions and
  direct non-numerics now throw like argerror; integral floats and
  numeric strings convert; beyond-int32 truncates via asIntN(32)
  like the `(int)` cast. Exactly C. OK.
- Entry-source audit (re-run) — `lspo_region(` occurs only at the def
  (js/mklev.js:2095); scripts/ hits are source-reading test asserts,
  not calls. No in-tree behavior change possible. OK.
- Adapter deletion — `sym.mjs splev_opt_int` → NOT FOUND in `js/**`;
  remaining mentions are historical strings in older test files. OK.
- `impossible` `audited` — body whole modulo the named Rule #2 omits
  (paniclog :598, CRASHREPORT :621–631); recursion panic, vsnprintf
  chop, fuzzer panic, URGENT pline, sanity early-return,
  disorder/report/support lines + latch reset all live at
  display.js:8970–9010; untouched since c107c3e18 (pre-SHA). OK.

Required `sym.mjs` output (diff deletes the local adapter, sites
already on the import):

```text
splev_opt_int    NOT FOUND in js/** (no export, no local function/const).
lspo_region      js/mklev.js:2095   ASYNC — await required
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js:150 already imports the helper; no new
edge, no `--can` needed (no cycle claim).

The census miss: `csym.mjs --callers get_table_coords_or_region`
shows exactly two C call sites — :5607 (region, rewired here) and
:5889 (`lspo_wall_property`, NOT rewired). The :5889 expansion at
js/mklev.js:5214–5217 still reads via inline `|0`:

```js
let dx1 = o.x1 != null ? (o.x1 | 0) : -1; // C :5889 get_table_int_opt -1
```

`2.5`→`2`, `'soon'`→`0`, `true`→`1` where C argerrors — the exact
divergence this campaign retired everywhere else, and the comment
itself cites the C opt read. It is named nowhere: `lspo_wall_property`
is ledger `ported` with no omit. Zero in-tree callers (def +
comments only), so blast radius is nil — but the `ported` claim
"all C sites closed" is false.

Second sample (8 more census claims, triggered by the wrong `ported`):
dungeon.c:820–822 ✓ (dungeon.js:784–786), :896 ✓ (:861),
:1011/1013/1014 ✓ (:961–964), sp_lev.c:3193–3194 ✓
(mklev.js:22743–22744), :3304–3310 ✓ (:23194–23201), :4062–4076 ✓
(:1814–1824), padding :5489 ✓ (exact-unpacked via throwing
`luaL_checkinteger_unpacked`, mklev.js:1057), nhlsel :886–893 ✓
(by-design `l_selection_gradient`). Single miss, not systematic.

## Hallucinations / overclaim

The `js/` rewire claims all reproduce. The ledger claim "all C sites
closed: 43 wired" overclaims by one expansion (wall_property :5889).
The D-3509 follow-up ("premise-gone retire") confirms the impossible
paste is gone from the row — that half of the flip is accurate.

## Density

Breadth-phase small SHA: manifest empty; impossible audit + 6-site
rewire ride the Open head per precedent. Per-function verdicts:

- `lspo_region` 6 sites — whole :5600/:5605/:5565–5568 port, order
  kept, cites exact, zero in-tree callers. OK.
- `impossible` `audited` — body really whole modulo named Rule #2
  omits (untouched). OK.
- `get_table_int_opt` `ported` — body whole, but the all-sites-closed
  census misses wall_property :5889 (divergent clone, unnamed).
  C-WRONG (2416.1).
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per
  declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration: no bare/node specifiers or fs calls).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax
  PASS, rule2 PASS, 2× hidden note (none blocked), 2× REACH-OK
  (smoke 24/24 each), green 2/2, strict ×2, cohort 7/7, auto full
  44/44 (shared file changed); node:test 38/38 (six int files);
  pre-change stash check fails 2/7, passes 7/7 post-change.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_int_opt --base dad6395c2~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24
  PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- `node --test scripts/lspo-region-int.test.mjs`: 7/7 pass on this
  tree.

## Actionable C-wrongs

1. 2416.1 — `get_table_int_opt` wrong `ported`: the wall_property
   :5889 expansion of C :5565–5568 still reads through divergent
   inline `|0` (js/mklev.js:5214–5217), named nowhere. Rewire the 4
   sites through the helper on the existing edge (or name the omit
   on the owning row). One port iter; zero in-tree callers, no
   behavior risk.

Verdict: **QUALITY-RISK**
