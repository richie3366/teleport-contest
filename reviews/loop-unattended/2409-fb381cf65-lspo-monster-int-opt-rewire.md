# Review 2409 — fb381cf65 — lspo_monster int-opt rewire

## Metadata

- SHA: `fb381cf65` (2026-10-06) — D-3494.
- Subject: Open head: impossible audit + lspo_monster
  fleeing/blinded/paralyzed/m_lev_adj→get_table_int_opt rewire
  (sp_lev.c:3304-06/:3310 |0-gap).
- Diff: `js/mklev.js` (+7/−4 in `lspo_monster_normalize_table`), new
  `scripts/lspo-monster-int.test.mjs`, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) four sites
restarted through the live whole helper on the existing mklev→dungeon
edge (:150, no import change), in place (already C order
:3304→:3305→:3306→:3310); (c) behavior delta is exactly the C conversion.

The diff actually adds: four helper calls with C comments; deletes the
four `| 0` adapters. No import hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 4 sites (fleeing/blinded/paralyzed/m_lev_adj) | C call wiring | sp_lev.c:3304/:3305/:3306/:3310 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (sp_lev.c:3296–3311, read at the cited range): fleeing :3304, blinded
:3305, paralyzed :3306 (all def 0), stunned/confused/waiting booleans
:3307–3309, m_lev_adj :3310 (def 0), seentraps :3311.

Branch-by-branch confirm:

- All four reads — `get_table_int_opt(tmp, key, 0)`, defaults match C.
  `tmp` is a non-null spread (`const tmp = { ...o }`) past the caller's
  table gate (`l_create_monster` throws on non-objects), so `lua_field`
  ≡ `tmp[name]`; nil/non-nil classifications identical. OK.
- Read order — JS fleeing→blinded→paralyzed→(3 bools)→m_lev_adj is
  exactly C's :3304→:3305→:3306→:3310 with the bools between. In-place;
  no reorder needed. OK.
- Conversion delta — integers unchanged incl. negatives; absent stays 0;
  integral floats and numeric strings now convert; fractions now throw
  like argerror (old `|0` truncated silently); direct non-numerics now
  throw (old: 0/1 garbage); beyond-int32 truncates via asIntN(32), same
  as the old `|0`. Exactly C. OK.
- Entry-source audit (re-run) — `l_create_monster` has zero callers in
  `js/` (no Lua layer); no table passes these fields (dig.js:259
  "fleeing" is a prose word list; generated tribute text is Pratchett
  prose). No in-tree behavior change. Matches the D-entry. OK.
- Omit arithmetic — 21 sites = 25 (D-3492) − 4 mon sites; wired 22 = 18
  + 4. Consistent chain. OK.

Required `sym.mjs` output (diff re-points four local adapters to the
imported helper):

```text
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js:150 already imports `get_table_int_opt`
from dungeon.js; the diff adds no import. No new edge.

## Hallucinations / overclaim

The `js/` claims all reproduce. One real defect, docs-only: this SHA's
finish stamped the **wrong bullet** into the `get_table_int_opt` ledger
row — the row at fb381cf65 carries the `impossible` omit verbatim
("paniclog :598 … stays named") instead of D-3494's own 21-site omit
(the D-entry itself has both bullets correct; the commit message's
`Named:` section shows only the impossible one). Truth is recoverable
from the D-entry; no `js/` behavior is affected. It is **already queued**
as the `get_table_int_opt` Must-fix 1-row repair (ship-time band refill,
citing fb381cf65 per `git log -S`) — no duplicate prepend from this
review.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 4-site rewire ride the Open head per precedent. Per-function
verdicts:

- 4 call-site rewires — whole :3304/:3305/:3306/:3310 ports, order kept,
  census clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  21-site omit is accurate, but the shipped ledger row holds the
  impossible paste (already Must-fix queued, see above). OK with queued
  repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2407; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 18/18 (three files); pre-change stash check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  get_table_int_opt,impossible --base fb381cf65~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-monster-int.test.mjs`: 6/6 pass on this tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
