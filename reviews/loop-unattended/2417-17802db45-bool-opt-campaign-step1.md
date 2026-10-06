# Review 2417 — 17802db45 — boolean-opt campaign step 1 (trap/region/mazewalk/map)

## Metadata

- SHA: `17802db45` (2026-10-06) — D-3510.
- Subject: Open head: impossible audit + boolean-opt campaign step 1
  (8 splev_opt_boolean sites → get_table_boolean_opt,
  trap/region/mazewalk/map).
- Diff: `js/mklev.js` (8 sites + helper export + adapter deletion +
  mazewalk doc), new `scripts/lspo-bool-opt.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch
  manifest empty; the rewire rides the Open head per precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) eight
sites restarted through the live whole same-file helper, in place, C
order kept; stale cites corrected (trap :4433–4435→:4431–4433 plus
the collided xy cite :4431→:4429; region :5603–5605→:5601–5603);
trap `!!`/`!` wrappers preserved; dead adapter removed; helper
exported per C extern; (c) behavior delta is exactly the C
conversion (raw string indices, incl. "no"→3 truthy).

The diff actually adds: eight `get_table_boolean_opt(o, …)` reads
with corrected cites, `export` on the helper, mazewalk doc reword.
Deletes the adapter def + doc. No import hunk (same file).
Delivered = promised. Two docs slips persist (cites/observation —
JS behavior itself is C-exact; see Hallucinations).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| trap 3 sites | C call wiring | sp_lev.c:4431–4433 | whole |
| region 3 sites | C call wiring | sp_lev.c:5601–5603 | whole |
| mazewalk 1 site | C call wiring | sp_lev.c:5795 | whole |
| map 1 site | C call wiring | sp_lev.c:6121 | whole |
| `get_table_boolean_opt` (mklev.js:1007, exported) | LIVE same-file | nhlua.c:1106–1118 | whole |
| `get_table_boolean` (mklev.js:990, unchanged) | LIVE callee | nhlua.c:1078–1104 | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |
| `splev_opt_boolean` (deleted) | dead adapter | n/a | gone from `js/` |

## C ↔ JS fidelity

C pins (all verified against pinned ranges): trap :4429 xy, :4430
type, :4431 spider_on_web def 1, :4432 seen FALSE, :4433
`novictim = !…victim…TRUE`; region :5601/:5602/:5603
(irregular 0, joined TRUE, arrival_room 0); mazewalk :5794 typ,
:5795 stocked def 1, :5796 dir; map :6120 map str, :6121 lit FALSE,
:6122–6128 contents, :6129 mapfrag. Every rewritten cite is exact.

Branch-by-branch confirm:

- Helper bodies — `get_table_boolean`: strings → raw checkoption
  index via `get_table_option` (C :1090–1092, incl. "no"→3);
  booleans → 1/0 (C :1093–1094); numbers → checkinteger + 0/1 gate
  (C :1095–1098, `(int)` truncation via width-32); anything else →
  `nhl_error('Expected a boolean')` (C :1101–1102). `_opt`
  wrapper: nil → defval else delegate (C :1106–1118). Whole. OK.
- Conversion delta — booleans/0/1/absent unchanged; strings now raw
  indices (old adapter mapped to meanings); integral floats
  convert; beyond-int32 truncates; fractions throw from
  checkinteger; other strings throw invalid-option; non-numerics
  throw. Exactly C. OK.
- Trap wrappers — `!!` on spider_on_web/seen and `!` on victim
  preserved; C-truthiness exact for all four raw indices
  (0→false, 1/2/3→true both sides). OK.
- Entry-source audit (re-run) — `lspo_trap(`/`lspo_map(` defs only
  in `js/`; `lspo_mazewalk`'s sole real caller is
  scripts/lspo-terrain-mazewalk.test.mjs with boolean
  `stocked: false` (identical old vs new). No in-tree behavior
  change possible. OK.
- Export — C `extern.h:2142` declares it; `export` justified. OK.
- Adapter deletion — `sym.mjs splev_opt_boolean` → NOT FOUND in
  `js/**`. OK.

Required `sym.mjs` output (diff deletes the local adapter, sites
already resolve to the same-file helper):

```text
splev_opt_boolean NOT FOUND in js/** (no export, no local function/const).
get_table_boolean_opt js/mklev.js:1007   sync
lspo_mazewalk    js/mklev.js:1263   sync
```

No import change (same file), no `--can` needed.

## Hallucinations / overclaim

The `js/` claims all reproduce. Three docs slips (behavior is
C-exact in each case; no Must-fix — JS contradicts C nowhere):

- The `rtype` cite in `lspo_region` still reads `// C :5606` at HEAD
  (js/mklev.js:2107); pinned C has `rtype` at :5604 — stale by two,
  same family this SHA fixed for its neighbors, left behind.
- The D-log "Observed: region lit/rtype swapped vs C :5605/:5606"
  inverts reality: C order is rtype :5604 then rlit :5605, and JS
  reads rtype-then-rlit — JS already matches C. A future iter must
  NOT "correct" this order; only the cite wants `:5604`.
- The map observation cites mapfrag at :6128; it is :6129 (`}` is
  :6128). The disclosed throw-precedence point itself (JS does
  mapfrag before lit; C reads lit :6121 first) is accurate but
  pre-existing, disclosed, and unobservable (zero in-tree callers
  of `lspo_map`).

Ledger: this SHA's finish pasted the impossible first-line into the
`get_table_boolean_opt` row (same finish bug as the int series);
follow-up 97b97195d already restored the correct 28-site omit in
history (36 − 8 = 28 ✓, wired/equiv/by-design lists match the
D-entry). No duplicate prepend.

## Density

Breadth-phase small SHA: manifest empty; impossible audit + 8-site
rewire ride the Open head per precedent. Per-function verdicts:

- 8 rewire sites — whole C-line ports, order kept, cites exact,
  wrappers truthiness-exact, zero in-tree callers. OK.
- `impossible` `audited` — body really whole modulo named Rule #2
  omits (untouched). OK.
- `get_table_boolean_opt` partial — body whole; the 28-site omit is
  accurate post-follow-up; campaign next steps named. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per
  declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_boolean_opt` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked), 2×
  REACH-OK (smoke 24/24 each), green 2/2, strict ×2, cohort 7/7,
  auto full 44/44 (shared file changed); node:test new 8/8 +
  neighbors 31/31; pre-change stash check fails (unimportable
  pre-export), 8/8 post-change.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_boolean_opt --base 17802db45~1 --reach-all`):
  0 blocked both functions (vacuous, correctly labeled); smoke 24
  PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- `node --test scripts/lspo-bool-opt.test.mjs`: 10/10 pass on this
  tree (8 + 2 added by D-3514).

## Actionable C-wrongs

None (docs slips noted above; JS contradicts C nowhere).

Verdict: **ACCEPT**
