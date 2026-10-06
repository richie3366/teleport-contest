# Review 2413 — c83eda903 — lspo_door int-opt rewire

## Metadata

- SHA: `c83eda903` (2026-10-06) — D-3502.
- Subject: Open head: impossible audit + lspo_door pos→
  get_table_int_opt rewire (sp_lev.c:4717 |0-gap).
- Diff: `js/mklev.js` (1 site in `lspo_door`'s wall arm),
  new `scripts/lspo-door-int.test.mjs`, journal rotation crumb,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) the site
restarted through the live whole helper on the existing mklev→dungeon
edge, in place (already C order :4715/:4716/:4717/:4718), null-table
3-arg default read preserved; (c) behavior delta is exactly the C
conversion.

The diff actually adds: `pos: get_table_int_opt(o, 'pos', -1)` with
cites; deletes the `splev_opt_int(o?.pos, -1)` adapter. No import hunk.
Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_door` pos site | C call wiring | sp_lev.c:4717 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (`csym.mjs lspo_door` → sp_lev.c:4670–4734; wall arm read at the
pinned range): secret :4715, mask :4716, pos
`get_table_int_opt(L, "pos", -1)` :4717, wall :4718, create_door :4720.
Every cite in the hunk exact.

Branch-by-branch confirm:

- Pos read — `get_table_int_opt(o, 'pos', -1)`, default matches C.
  In-place at :4717 between :4716 and :4718; C order kept. OK.
- Null-table equivalence (re-verified, not trusted) — 3-arg form sets
  `o = null`; `lua_field(null, …)` returns undefined (dungeon.js:252)
  and `lua_type(undefined)` is `'nil'` (:225), so the helper returns
  the −1 default — identical to the old `splev_opt_int(o?.pos, -1)`.
  Table form `o = a ?? {}`: non-null object, nil ⟺ `== null` both
  sides. OK.
- Conversion delta — same C conversion as the series: fractions and
  direct non-numerics now throw like argerror; integral floats and
  numeric strings convert; beyond-int32 truncates via asIntN(32).
  Exactly C. OK.
- Entry-source audit (re-run) — `lspo_door` has zero callers in `js/`
  (definition only; only the new test references it).
  `splev_room_door` takes an unpacked number, not a :4717 table read —
  correctly left alone. No in-tree behavior change possible. OK.
- Omit arithmetic — 13 sites = terrain 1 + replace 6 + region 6;
  wired 30 = 29 (D-3500) + 1. Consistent chain. OK.

Required `sym.mjs` output (diff re-points the local adapter to the
imported helper):

```text
lspo_door        js/mklev.js:19098   sync
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js already imports the helper from dungeon.js;
the diff adds no import. No new edge. No `--can` needed (no cycle
claim).

## Hallucinations / overclaim

The `js/` claims all reproduce. Docs-only carryover: this SHA's finish
re-stamped the same wrong bullet into the `get_table_int_opt` ledger row
(impossible paste; `d` now includes D-3502). Same already-queued
Must-fix head as in 2411/2412 — no duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 1-site rewire ride the Open head per precedent. Per-function
verdicts:

- `lspo_door` pos site — whole :4717 port, order kept, cites exact,
  zero callers (no behavior change possible). OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  13-site omit is accurate, but the shipped ledger row still holds the
  impossible paste (already Must-fix queued). OK with queued repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2412; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 55/55 (nine files); pre-change stash check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_int_opt --base c83eda903~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-door-int.test.mjs`: 7/7 pass on this
  tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
