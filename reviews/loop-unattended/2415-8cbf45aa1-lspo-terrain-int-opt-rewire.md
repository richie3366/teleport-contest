# Review 2415 — 8cbf45aa1 — lspo_terrain int-opt rewire

## Metadata

- SHA: `8cbf45aa1` (2026-10-06) — D-3506.
- Subject: Open head: impossible audit + lspo_terrain lit→
  get_table_int_opt rewire (sp_lev.c:5001 splev_opt_int-gap).
- Diff: `js/mklev.js` (1 site in `lspo_terrain`'s table arm),
  new `scripts/lspo-terrain-int.test.mjs`, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) the site
restarted through the live whole helper on the existing mklev→dungeon
edge, in place (C :5001, after the typ read :5000); (c) behavior delta
is exactly the C conversion.

The diff actually adds: `tmpterrain.tlit = get_table_int_opt(o, 'lit',
SET_LIT_NOCHANGE)` with cites; deletes the `splev_opt_int` adapter. No
import hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_terrain` lit site | C call wiring | sp_lev.c:5001 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (`csym.mjs lspo_terrain` → sp_lev.c:4977–5038; arm read at the pinned
range): typ read :5000, `tmpterrain.tlit = get_table_int_opt(L, "lit",
SET_LIT_NOCHANGE)` :5001. Cite exact; placement after the :5000 read
matches C order.

Branch-by-branch confirm:

- Lit read — `get_table_int_opt(o, 'lit', SET_LIT_NOCHANGE)`, default
  matches C (SET_LIT_NOCHANGE = −2, `|0` a no-op). `o` is `a ?? {}` plus
  an object check, always a non-null object, so `lua_field` ≡ `o[name]`
  and nil ⟺ `== null` on both sides. OK.
- Conversion delta — same C conversion as the series: fractions and
  direct non-numerics now throw like argerror; integral floats and
  numeric strings convert; beyond-int32 truncates via asIntN(32).
  Exactly C. OK.
- Entry-source audit (re-run) — zero `lspo_terrain(` call sites in
  `js/` outside the `_sel`/`_region` unpacked-number variants. The only
  table-form callers are in `scripts/lspo-terrain-mazewalk.test.mjs`,
  passing integer `lit: 1` or absent lit — identical under old and new
  code. No in-tree behavior change possible. OK.
- Omit arithmetic — 6 sites = region 4 + 1 + 1; wired 37 = 36 (D-3504)
  + 1. Consistent chain; only the region tail remains. OK.

Required `sym.mjs` output (diff re-points the local adapter to the
imported helper):

```text
lspo_terrain     js/mklev.js:1967   sync
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js already imports the helper from dungeon.js;
the diff adds no import. No new edge. No `--can` needed (no cycle
claim).

## Hallucinations / overclaim

The `js/` claims all reproduce. Docs-only carryover: this SHA's finish
re-stamped the same wrong bullet into the `get_table_int_opt` ledger row
(impossible paste; `d` now includes D-3506). Same already-queued
Must-fix head as in 2411–2414 — no duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 1-site rewire ride the Open head per precedent. Per-function
verdicts:

- `lspo_terrain` lit site — whole :5001 port, order kept, cite exact,
  zero in-tree table callers (no behavior change possible). OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  6-site omit is accurate, but the shipped ledger row still holds the
  impossible paste (already Must-fix queued). OK with queued repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2412; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 61/61 (ten files); pre-change stash check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_int_opt --base 8cbf45aa1~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-terrain-int.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
