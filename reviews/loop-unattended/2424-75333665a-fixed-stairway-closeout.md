# Review 2424 — 75333665a — fixed-stairway close-out (16+8 sites)

## Metadata

- SHA: `75333665a` (2026-10-06) — D-3524.
- Subject: Open head: impossible audit + l_create_stairway
  fixed-stairway close-out (special-level :4189 marks +
  fixed force; sanctum live deltrap, Val-goal off-map
  stair).
- Diff: `js/mklev.js` (16 stair sites + 8 ladder blocks +
  sanctum deltrap + doc), new
  `scripts/lspo-stair-fixed-spmap.test.mjs`, D-3522 test
  header, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the close-out rides the Open head
  per precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) 16 fixed stair calls in 13 loaders gain the :4189 mark
+ fixed force, 8 tower/wizard ladder blocks gain the mark,
  sanctum gains its live deltrap — each in C order with
  per-site dat evidence; (c) quest 46 + soko 12 stay raw
  as the named remainder; (d) `l_create_stairway ported`.

The diff actually adds: 16 forced stairs (counted), 24
marks, the sanctum t_at/deltrap, the doc close-out.
Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 16 fixed stair sites | C line ports | sp_lev.c:4189 + :4209–4210 | whole |
| 8 ladder blocks | C line ports | sp_lev.c:4189–4191 | whole |
| sanctum deltrap | C line port | sp_lev.c:4187–4188 | whole, live |
| `mkstairs` (mklev.js:33219, unchanged local) | C fn port | mklev.c:2157–2197 | whole (force arm live) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C fixed path (`csym.mjs` bodies): :4187–4188 deltrap,
unconditional mark :4189, mkstairs force `!(RANDOM)` =
TRUE :4209–4210; `mkstairs` :2172 force rooms first,
:2188 dungeon-end return. Cites exact (one slip: the
D-log's ":2174 bad-terrain impossible" — the call is at
:2179; :2174 is the ltyp read. Docs-only).

Branch-by-branch confirm (sampled 6 of 24 sites + dat):

- Val-goal — dat :34 intent comment + :37 stair exact;
  JS marks before mkstairs, force rooms the LAVA (no more
  spurious impossible); traps dat :65–74 / loader
  post-stair, fixed boards at (13,8)/(21,8) ≠ (45,10).
  Deltrap correctly absent. OK.
- Sanctum — dat 6 traps :85–90 + stair :130 exact; JS 6
  `placeTrapRnd` (matching kinds) precede the stair, so
  the new t_at/deltrap is genuinely live — the only such
  site. C order kept. OK.
- Medusa-1/3 — dat stairs :48–49 / :41 exact; traps
  postdate in dat (:95–101) and loader; medloc absolute
  (place pts carry mx/my). OK.
- Tower1 ladder — mark precedes the LADDER write;
  stairway_add(down, dlevel+1) + LA_DOWN match C
  :4199–4205; zero trap mentions before the ladder in
  the loader. OK.
- C-FALSE callers untouched — `generate_stairs` still
  calls mkstairs default-forced; the 16 forced calls are
  exactly the fixed-scoord population claimed. OK.
- Remainder named — quest 46 + soko 12 stay raw per the
  D-log Named + in-code doc (per-site mapping remainder,
  not a silent stub). OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (marks + `force` args only; `mkstairs` is a
pre-existing whole local, unchanged).

## Hallucinations / overclaim

None material. The ":2174 bad-terrain impossible" cite
(points at the ltyp read; the call is :2179) is a
docs-only slip. All sampled dat lines, coords, trap
orders, and counts (16 forced, 8 ladders, 6/6/2/8
callers) reproduce exactly.

## Density

Breadth-phase small SHA: manifest empty; impossible audit
+ per-site close-out ride the Open head per precedent.
Per-function verdicts:

- 24 sites — whole :4187–4189/:4209–4210 ports, C order,
  cites exact, dat-verified, covered paths green. OK.
- `l_create_stairway` `ported` — body whole (D-3522 mark
  core + this-iter fixed mapping), remainder named. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,l_create_stairway` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  2× REACH-OK (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 17/17 (pre-change 2/17 — only the pin
  tests) + neighbors 22/22.
- Audit re-measure (same 2 fns, `--base 75333665a~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); smoke 24 PASS / 0 regressed
  each → REACH-OK. No REGRESSED session. Matches.
- `node --test scripts/lspo-stair-fixed-spmap.test.mjs`:
  17/17 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
