# Review 2411 — f7fcd744c — lspo_mineralize int-opt rewire

## Metadata

- SHA: `f7fcd744c` (2026-10-06) — D-3498.
- Subject: Open head: impossible audit + lspo_mineralize gem/gold/kelp×2→
  get_table_int_opt rewire (sp_lev.c:3947–3950 splev_opt_int gap).
- Diff: `js/mklev.js` (1 hunk in `lspo_mineralize`: 4 helper reads + stale
  +1 per-line cites corrected), new `scripts/lspo-mineralize-int.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) four sites
restarted through the live whole helper on the existing mklev→dungeon
edge, in place (already C order :3947→:3948→:3949→:3950), stale +1 cites
corrected; (c) behavior delta is exactly the C conversion.

The diff actually adds: four helper calls with corrected cites; deletes
the four `splev_opt_int` adapters. No import hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 4 sites (gem/gold/kelp×2) | C call wiring | sp_lev.c:3947/:3948/:3949/:3950 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (sp_lev.c:3938–3955, read at the cited range): create_des_coder :3943,
lcheck_param_table :3945, default comment :3946, gem :3947, gold :3948,
kelp_moat :3949, kelp_pool :3950 (all def −1), mineralize :3952, return
:3954. Every new cite exact; the old cites were stale +1 as claimed.

Branch-by-branch confirm:

- All four reads — `get_table_int_opt(t, key, -1)`, defaults match C
  (`|0` on −1 is a no-op). `t` is the caller's `o ?? {}`, so `lua_field`
  ≡ `t[name]` for object inputs; classifications identical. OK.
- Read order — JS gem→gold→kelp_moat→kelp_pool is exactly C's
  :3947→:3948→:3949→:3950. In-place; no reorder needed. OK.
- Conversion delta — integers unchanged incl. negatives; absent stays
  −1; integral floats and numeric strings now convert; fractions now
  throw like argerror (old `splev_opt_int` truncated silently); direct
  non-numerics now throw (old: 0/1 garbage); beyond-int32 truncates via
  asIntN(32), same as before. Exactly C. OK.
- Entry-source audit (re-run) — `lspo_mineralize` has zero callers in
  `js/`/`scripts/` (no Lua des dispatch; test-only wiring asserts); the
  only in-tree `mineralize` call passes literals (−1 ×4, :34398). No
  in-tree behavior change possible. Matches the D-entry. OK.
- Gate note (pre-existing, unchanged, unreachable): for a non-object
  non-null `o`, C :3945 `lcheck_param_table` throws while JS defaults —
  the D-entry's "nil on both sides" overstates. Old and new JS agree
  (−1), and no caller passes such input. Note only.
- Omit arithmetic — 15 sites = 19 (D-3496) − 4 lvlinit sites; wired 28 =
  24 + 4. Consistent chain. OK.

Required `sym.mjs` output (diff re-points four local adapters to the
imported helper):

```text
get_table_int_opt js/dungeon.js:351   sync
```

Import-edge check: mklev.js:150 already imports the helper; the diff
adds no import. No new edge.

## Hallucinations / overclaim

The `js/` claims all reproduce (modulo the gate note above). Docs-only
carryover: this SHA's finish re-stamped the same wrong bullet into the
`get_table_int_opt` ledger row (impossible paste; `d` now includes
D-3498). Same already-queued Must-fix 1-row repair as in 2409 — no
duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 4-site rewire ride the Open head per precedent. Per-function
verdicts:

- 4 call-site rewires — whole :3947/:3948/:3949/:3950 ports, order kept,
  cites corrected, zero callers (no behavior change possible). OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  15-site omit is accurate, but the shipped ledger row still holds the
  impossible paste (already Must-fix queued). OK with queued repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2407; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 42/42 (seven files); pre-change wiring check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  get_table_int_opt,impossible --base f7fcd744c~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-mineralize-int.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
