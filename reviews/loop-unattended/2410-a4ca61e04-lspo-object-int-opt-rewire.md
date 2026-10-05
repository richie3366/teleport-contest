# Review 2410 — a4ca61e04 — lspo_object int-opt rewire

## Metadata

- SHA: `a4ca61e04` (2026-10-06) — D-3496.
- Subject: Open head: impossible audit + lspo_object eroded/recharged→
  get_table_int_opt rewire (sp_lev.c:3641/:3645 null-default gap).
- Diff: `js/mklev.js` (2 hunks in `lspo_object_normalize_table`: delete the
  pre-buc eroded default, add both helper reads after lit), new
  `scripts/lspo-object-int.test.mjs`, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) both sites
restarted through the live whole helper on the existing mklev→dungeon
edge, placed in C read order (after lit :3640, before id :3652 — eroded
moved down from the pre-buc block so multi-bad-field precedence matches
C against name :3637/quantity :3638); (c) behavior delta is exactly the
C conversion.

The diff actually adds: the two helper calls with the C-order comment;
deletes the `if (tmp.eroded == null) tmp.eroded = 0` pre-buc default. No
import hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 2 sites (eroded/recharged) | C call wiring | sp_lev.c:3641/:3645 via :3631–3655 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (sp_lev.c:3631–3655, read at the cited range): spe :3634, buc :3635,
corpsenm :3636, name :3637, quantity :3638, buried :3639, lit :3640,
eroded :3641 (def 0), locked/trapped/tknown :3642–3644, recharged :3645
(def 0), greased/broken/achievement :3646–3648, id :3652, class :3653.
All D-entry cites exact.

Branch-by-branch confirm:

- Both reads — `get_table_int_opt(tmp, key, 0)`, defaults match C. `tmp`
  is a non-null spread past the caller's table gate (`l_create_object`
  :23045 region), so `lua_field` ≡ `tmp[name]`; classifications
  identical. OK.
- Eroded move — the old pre-buc default sat before the throwing name/
  quantity reads; the helper read now sits after lit, so a bad name/
  quantity throws before a bad eroded, exactly C's precedence. The
  claimed fix is real. OK.
- Recharged placement — reads with eroded after lit; C reads it at :3645
  (after locked/trapped/tknown :3642–44). Both sides throw on any bad
  field in the span and no in-tree table carries `recharged`, so the
  micro-order is unobservable (throw/throw, unreachable). Note only. OK.
- Conversion delta — integers unchanged incl. negatives; absent stays 0;
  integral floats and numeric strings now convert (old: flowed through);
  fractions and direct non-numerics now throw (old: silent flow / 0/1
  garbage); beyond-int32 truncates via asIntN(32), same as the old `|0`.
  Exactly C. OK.
- Consumer audit (re-run) — normalized path feeds `create_object(tmp)`
  (:23072), where the kept `|0`s are no-ops on converted int32; the 3
  direct `create_object` literals (:7383/:13881/:31279) carry neither
  field (→0 = C default); Sato eroded −1 ×2 (:10131–32) converts to −1
  as before; from-string default eroded 0 (:22870). Zero in-tree
  `recharged` fields. No in-tree behavior change. Matches the D-entry. OK.
- Omit arithmetic — 19 sites = 21 (D-3494) − 2 obj sites; wired 24 = 22
  + 2. Consistent chain. OK.

Required `sym.mjs` output (diff re-points the default + consumer gap to
the imported helper):

```text
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js:150 already imports the helper; the diff
adds no import. No new edge.

## Hallucinations / overclaim

The `js/` claims all reproduce. Docs-only carryover: this SHA's finish
re-stamped the same wrong bullet into the `get_table_int_opt` ledger row
(impossible paste; `d` now includes D-3496). Same already-queued
Must-fix 1-row repair as in 2409 — no duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 2-site rewire ride the Open head per precedent. Per-function
verdicts:

- 2 call-site rewires — whole :3641/:3645 ports, eroded precedence fixed,
  census clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  19-site omit is accurate, but the shipped ledger row still holds the
  impossible paste (already Must-fix queued). OK with queued repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2407; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 36/36 (six files); pre-change wiring check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  get_table_int_opt,impossible --base a4ca61e04~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-object-int.test.mjs`: 6/6 pass on this tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
