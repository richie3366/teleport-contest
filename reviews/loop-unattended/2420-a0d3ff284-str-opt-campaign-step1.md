# Review 2420 — a0d3ff284 — string-opt campaign step 1 (20 sites)

## Metadata

- SHA: `a0d3ff284` (2026-10-06) — D-3516.
- Subject: Open head: impossible audit + string-opt campaign step 1
  (19 splev_opt_index sites + region inline → get_table_option/
  luaL_checkoption).
- Diff: `js/mklev.js` (20 sites + adapter deletion + import +1
  name) + `js/dungeon.js` (+1 export), new
  `scripts/lspo-str-opt.test.mjs`, 2 neighbor tests maintained,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch
  manifest empty; the rewire rides the Open head per precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b)
twenty sites restarted through the live whole helpers on the
existing dungeon.js import line (name added, no new module edge);
eight stale cites corrected plus two collided neighbors (:4880,
:4551); door-wall `o?.wall` null-table fold preserved; dead
adapter removed; `luaL_checkoption` exported (its only home);
(c) behavior delta is exactly the C conversion (finite numbers
stringify-then-match); (d) `get_table_option` declared `partial`
with the campaign-step-2 remainder.

The diff actually adds: 20 helper reads with corrected cites, the
export keyword, the import name. Deletes the adapter def + doc.
Delivered = promised except (d): the shipped ledger row carries
the impossible first-line paste (4th instance of the finish bug)
with NO follow-up restore — the row is wrong at HEAD (see
Actionable 2420.1).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 13 table sites | C call wiring | sp_lev.c (13 lines) | whole |
| 7 unpacked sites | C call wiring | sp_lev.c (7 lines) | whole |
| `get_table_option` (dungeon.js:439, unchanged) | LIVE import | nhlua.c:1121–1133 | whole |
| `luaL_checkoption` (dungeon.js:309, exported) | LIVE import | lauxlib checkoption | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |
| `splev_opt_index` (deleted) | dead adapter | n/a | gone from `js/` |

## C ↔ JS fidelity

Every renumbered cite verified exact against pinned C: drawbridge
:5744/:5746 (was :5745/:5747), door 3-arg :4688 (was :4689),
feature table :4879 (was :4878) + `can_have_flags` :4880, map
:6117/:6118 (was :6114/:6115 — the old cites pointed at the
string-form arm), altar :4304 (was :4303 — the align read),
region :5619 (was :5625 — the grow line), corridor :4545/:4548 +
`create_corridor` :4551 (was :4548). Kept cites spot-verified:
:5789, :5796, :3907, :3916, :5891, :4698–4699, :4718. All exact.

Branch-by-branch confirm:

- Helper bodies — `get_table_option`: getfield + checkoption +
  pop (C :1129–1132) ✓. `luaL_checkoption`: nil→defval (null
  defval throws, covering the feature NULL arms), strings exact,
  finite numbers `String()`-then-match, NaN/non-strings throw,
  no match → `invalid option` ✓. The number-stringify quirk is
  the exact intended delta. OK.
- Door-wall fold — old `o?.wall ?? 'all'`; new `lua_field`
  returns undefined for null/non-object → nil → default 'all' ✓
  identical, verified in the body. OK.
- Region inline — `['unlit','lit']` order ≡ C `lits[]`
  (unlit→0, lit→1); `b ?? 'lit'` ≡ nil→defval ✓. OK.
- Import edge — `luaL_checkoption` added to the existing
  mklev→dungeon import statement (same line as `get_table_option`
  etc.): no new module edge. Export justified (C lauxlib extern;
  the dungeon.js local was its only home — no clone). OK.
- Entry-source audit (re-run, correcting the D-log) —
  drawbridge/corridor/feature/engraving/map/door/altar/region/
  wall_property: defs only in `js/` (no `dat/` dir exists;
  scripts/ hits are source-reading asserts). BUT mazewalk DOES
  have a test caller passing `dir` keys
  (scripts/lspo-terrain-mazewalk.test.mjs) — the D-log's "no
  test passes these keys" is false. Impact: none behaviorally
  (valid dirs convert identically; bad-dir throw texts changed
  to C's `invalid option`, needles re-pinned, green). Docs
  overclaim, not a C-wrong. ("Eleven entries" is a miscount;
  10 entries touched.) OK with noted overclaim.
- Remainder reality — step-2 adapters exist
  (js/mklev.js:22508 `get_table_buc`, :23050
  `get_table_align_unpacked`, js/questpgr.js:1073
  `howtoput2i`), so the `partial` status direction is right;
  only the row's omit text is wrong (paste). OK.
- Pre-existing noted — stair :4165/:4171 named omit, silent-
  default adapters as step 2 (all disclosed). OK.

Required `sym.mjs` output (diff deletes the local adapter and
re-points to the dungeon.js imports):

```text
splev_opt_index  NOT FOUND in js/** (no export, no local function/const).
luaL_checkoption js/dungeon.js:309   sync
get_table_option js/dungeon.js:439   sync
```

No new module edge (name on the existing import line), no `--can`
needed.

## Hallucinations / overclaim

The `js/` claims all reproduce except the entry-source sentence
(tests DO pass mazewalk `dir` keys; the SHA itself re-pinned
those needles). Two stale door cites left behind in the same
off-by-one family this SHA fixed for their neighbor: `x` cites
:4690 (C :4689), `y` cites :4691 (C :4690) — docs-only, behavior
unaffected.

Ledger: the shipped row flipped `ported`→`partial` carrying the
verbatim impossible paste (`d: D-3516,D-3101`) — and unlike
D-3510/D-3512 there is NO follow-up restore in history
(a0d3ff284 is HEAD). The D-entry's own Named remainder (step-2
adapters + stair omit + nhlsel by-design) is the true content.
Must-fix 2420.1 prepends its restore.

## Density

Breadth-phase small SHA: manifest empty; impossible audit + 20-site
rewire ride the Open head per precedent. Per-function verdicts:

- 20 sites — whole C-line ports, cites exact, folds/order kept,
  zero in-tree behavior change (one test caller, strings-only,
  green). OK.
- `impossible` `audited` — body really whole modulo named Rule #2
  omits (untouched; row stays `partial` per the standing
  pattern). OK.
- `get_table_option` `partial` — status direction right, but the
  shipped omit is the impossible paste with no restore at HEAD.
  C-WRONG (2420.1, ledger repair).
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per
  declared override, still queued).

Banned-pattern grep on the `js/` hunks: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_option` → syntax
  PASS (2 changed files), rule2 PASS, 2× hidden note (none
  blocked), 2× REACH-OK (smoke 24/24 each), green 2/2, strict
  ×2, cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 8/8 + neighbors 42/42; pre-change stash check
  fails (unimportable pre-export), 8/8 post-change.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_option --base a0d3ff284~1 --reach-all`):
  0 blocked both functions (vacuous, correctly labeled); smoke
  24 PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- `node --test` new + 2 maintained neighbors: 30/30 pass on
  this tree.

## Actionable C-wrongs

1. 2420.1 — `get_table_option` ledger row carries the impossible
   first-line paste at HEAD (no follow-up restore): 1-row repair
   restoring the D-3516 Named remainder (step-2 adapters + stair
   omit + nhlsel by-design) narrowed ≤300 chars, re-verified at
   repair. One port iter, docs-only, zero behavior risk.
   **Addressed:** D-3517 `f9a67973d`

Verdict: **QUALITY-RISK**
