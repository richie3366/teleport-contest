# Review 2414 — 9ed587304 — lspo_replace_terrain int-opt rewire

## Metadata

- SHA: `9ed587304` (2026-10-06) — D-3504.
- Subject: Open head: impossible audit + lspo_replace_terrain
  6-field→get_table_int_opt rewire (sp_lev.c:5086–5091 |0-gap).
- Diff: `js/mklev.js` (6 sites in `lspo_replace_terrain` + doc
  equivalence line corrected), new `scripts/lspo-replace-int.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) six sites
restarted through the live whole helper on the existing mklev→dungeon
edge, in place (already C order :5086→:5091), stale cites and the doc
equivalence line corrected; (c) behavior delta is exactly the C
conversion.

The diff actually adds: six helper calls (chance/100, lit/NOCHANGE,
x1/y1/x2/y2/−1) with corrected cites; deletes the six `splev_opt_int`
adapters. No import hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 6 sites (chance/lit/x1/y1/x2/y2) | C call wiring | sp_lev.c:5086–5091 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (`csym.mjs lspo_replace_terrain` → sp_lev.c:5050–5143; reads checked
at the pinned range): chance/100 :5086, lit/SET_LIT_NOCHANGE :5087,
x1 :5088, y1 :5089, x2 :5090, y2 :5091, region gate :5092–5095. Every
new cite exact; the old cites were stale by one as claimed (:5085 is
blank).

Branch-by-branch confirm:

- All six reads — defaults match C (100/−2/−1; SET_LIT_NOCHANGE = −2
  per js/const.js:1408, `|0` a no-op on all three). `o` is `opts ?? {}`
  plus an object check, always a non-null object, so `lua_field` ≡
  `o[name]` and nil ⟺ absent on both sides. OK.
- Read order — JS chance→lit→x1→y1→x2→y2 is exactly C's
  :5086→:5087→:5088→:5089→:5090→:5091. In-place; no reorder needed. OK.
- Doc line — the old `get_table_int_opt ≡ splev_opt_int` claim is now
  the live-helper cite. The equivalence it asserted was false (the
  adapter lacked the checkinteger gate); the correction is accurate. OK.
- Conversion delta — same C conversion as the series: fractions and
  direct non-numerics now throw like argerror; integral floats and
  numeric strings convert; beyond-int32 truncates via asIntN(32).
  Exactly C. OK.
- Entry-source audit (re-run) — `lspo_replace_terrain` has zero callers
  in `js/` (definition only). `scripts/` matches are source-text
  asserts in the new test (plus a function-ordering assert in the later
  lspo-terrain-int test), not calls. In-tree `_sel`/`_region` users pass
  unpacked numbers. No in-tree behavior change possible. OK.
- Omit arithmetic — 7 sites = terrain 1 + region 6; wired 36 = 30
  (D-3502) + 6. Consistent chain. OK.

Required `sym.mjs` output (diff re-points six local adapters to the
imported helper):

```text
lspo_replace_terrain js/mklev.js:2053   sync
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js already imports the helper from dungeon.js;
the diff adds no import. No new edge. No `--can` needed (no cycle
claim).

## Hallucinations / overclaim

The `js/` claims all reproduce. Docs-only carryover: this SHA's finish
re-stamped the same wrong bullet into the `get_table_int_opt` ledger row
(impossible paste; `d` now includes D-3504). Same already-queued
Must-fix head as in 2411–2413 — no duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 6-site rewire ride the Open head per precedent. Per-function
verdicts:

- 6 call-site rewires — whole :5086/:5087/:5088/:5089/:5090/:5091
  ports, order kept, cites corrected, zero callers (no behavior change
  possible). OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  7-site omit is accurate, but the shipped ledger row still holds the
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
  impossible,get_table_int_opt --base 9ed587304~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-replace-int.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
