# Review 2412 — 817b5c8e8 — lspo_gold int-opt rewire

## Metadata

- SHA: `817b5c8e8` (2026-10-06) — D-3500.
- Subject: Open head: impossible audit + lspo_gold amount→
  get_table_int_opt rewire (sp_lev.c:4502 |0-gap).
- Diff: `js/mklev.js` (1 site in `lspo_gold` + per-line cites
  renumbered to pinned C), new `scripts/lspo-gold-int.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) the site
restarted through the live whole helper on the existing mklev→dungeon
edge, in place (already C order :4502 before :4503), stale cites
corrected; (c) behavior delta is exactly the C conversion.

The diff actually adds: one helper call `get_table_int_opt(o, 'amount',
-1)` with corrected cites; deletes the `splev_opt_int` adapter. No import
hunk. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_gold` amount site | C call wiring | sp_lev.c:4502 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE import (edge :150) | nhlua.c:1028–1039 | whole (see 2408) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (`csym.mjs lspo_gold` → sp_lev.c:4479–4522; per-line cites checked
against the pinned range): argc==3 arm :4490–4493, argc==2 table arm
:4494–4498, table-form gate :4499 + lcheck :4500, amount :4502,
get_table_xy_or_coord :4503, x/y split :4504, else nhl_error :4505–4508,
coord pack :4511–4514, get_location_coord :4516, rnd(200) :4517–4518,
mkgold :4519. Every new cite in the diff exact; the old cites were
stale as claimed (:4499-for-:4502 etc.).

Branch-by-branch confirm:

- Amount read — `get_table_int_opt(o, 'amount', -1)`, default matches C
  (`|0` on −1 is a no-op). `o` is `a ?? {}` at the table gate, always a
  non-null object, so `lua_field` ≡ `o.amount` and nil ⟺ `== null` on
  both sides. OK.
- Read order — JS amount→xy is exactly C's :4502→:4503. In-place; no
  reorder needed. OK.
- Conversion delta — integers unchanged incl. negatives; absent stays
  −1; integral floats and numeric strings now convert; fractions now
  throw like argerror (old adapter truncated silently); direct
  non-numerics now throw (old: 0/1 garbage); beyond-int32 truncates via
  asIntN(32), same as before. Exactly C (helper verified whole in
  2408, unchanged). OK.
- Entry-source audit (re-run) — `lspo_gold` has zero callers in `js/`
  (definition only; only the new test references it). No in-tree
  behavior change possible. Matches the D-entry. OK.
- Pre-existing, unchanged, unreachable: `create_des_coder()` sits only
  in the table arm while C :4488 runs it unconditionally; the
  `typeof b/a === 'object'` gates admit arrays C's LUA_TTABLE check
  would reject. Old and new JS agree, and no caller passes such input.
  Note only.
- Omit arithmetic — 14 sites = door 1 + terrain 1 + replace 6 + region
  6; wired 29 = 28 (D-3498) + 1. Consistent chain. OK.

Required `sym.mjs` output (diff re-points the local adapter to the
imported helper):

```text
get_table_int_opt js/dungeon.js:351   sync
splev_opt_int    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:1150
lspo_gold        js/mklev.js:1377   sync
```

Import-edge check: mklev.js already imports the helper from dungeon.js;
the diff adds no import. No new edge. No `--can` needed (no cycle
claim).

## Hallucinations / overclaim

The `js/` claims all reproduce (modulo the pre-existing notes above).
Docs-only carryover: this SHA's finish re-stamped the same wrong bullet
into the `get_table_int_opt` ledger row (impossible paste; `d` now
includes D-3500). Same already-queued Must-fix head as in 2411 — no
duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 1-site rewire ride the Open head per precedent. Per-function
verdicts:

- `lspo_gold` amount site — whole :4502 port, order kept, cites
  corrected, zero callers (no behavior change possible). OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); the D-entry's
  14-site omit is accurate, but the shipped ledger row still holds the
  impossible paste (already Must-fix queued). OK with queued repair.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration: clean across scored `js/`; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test 48/48 (eight files); pre-change wiring check fails/passes.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_int_opt --base 817b5c8e8~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-gold-int.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None (the ledger paste is docs-only and already Must-fix queued).

Verdict: **ACCEPT**
