# Review 2427 — bdc47be2f — knox/tut-1 des.door :4661 marks

## Metadata

- SHA: `bdc47be2f` (2026-10-06) — D-3530.
- Subject: Open head: impossible audit + knox/tut-1 des.door
  :4661 game-mark campaign step (23 sites, 2 closures).
- Diff: `js/mklev.js` (+5/−1: 2 marks + doc), new
  `scripts/lspo-door-knox-tut1-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the step rides the Open head per
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) knoxDoor + tut1_door gain the guarded :4661 mark after
doormask (C :4660/:4661 order); (c) per-loader des
verification (11 knox + 12 tut-1 sites, coords + states in
order); (d) knox bitmap C-complete, tut-1 carries doors +
stair; (e) provably neutral on both loaders.

The diff actually adds: the 2 marks + the doc line.
Delivered = promised on all five points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| knoxDoor mark (mklev.js:13637) | C line port | sp_lev.c:4661 | whole |
| tut1_door mark (mklev.js:20115) | C line port | sp_lev.c:4661 | whole |
| `rnddoor` (mklev.js:20497, unchanged) | C staticfn port | sp_lev.c:1147–1153 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C sel_set_door (:4646–4662, re-read): doormask :4660 →
mark :4661. C lspo_door (:4670–4734): `"random"` → −1 →
`rnddoor()` :4706. C rnddoor (:1147–1153): ROLL_FROM over
[NODOOR, BROKEN, ISOPEN, CLOSED, LOCKED]. All cites exact.

Branch-by-branch confirm:

- Mark placement — both closures: doormask → mark → flags,
  C :4660/:4661 order, twDoor idiom. OK.
- Knox census (re-run) — dat :114–124 = 11 des.door, JS 11
  knoxDoor calls, coords + states match in order
  (open→D_ISOPEN etc.). OK.
- Tut-1 census (re-run) — dat 12 des.door :91–283, JS 12
  calls in order; percent(50) locked/closed + open/closed
  → JS `percent(50) ? …` in C order; "random" :273 → live
  `rnddoor()` (table order + rn2(5) ≡ ROLL_FROM). OK.
- Knox completeness — map via `splev_apply_centered_map`
  (marks carried :4127/:4153); no stair/ladder/drawbridge/
  mazewalk in knox.lua (re-grepped: 0). Map + 11 doors =
  every C writer. OK.
- Tut-1 stair — `l_create_stairway(0, 58, 10, …)` :20356 ≡
  dat des.stair down 58,10 :289, live :4189 carried. OK.
- Neutrality (re-run) — no solidify call in either loader;
  shared proto body has no solidify/remove/maze reader;
  knox remove_boundary_syms is CROSSWALL-gated (door marks
  sit on DOOR/SDOOR); no mazewalk on either level. The
  delta touches no live reader. OK.
- Ledger rows — `impossible` d advanced, standing omit;
  `sel_set_door` ported with d=D-3530. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (2 added lines; no import change).

## Hallucinations / overclaim

None.

## Density

Breadth-phase small SHA: manifest empty; impossible audit +
2-line campaign step ride the Open head per precedent.
Per-function verdicts:

- 2 closure marks — whole :4661 ports, C order, cites
  exact, dat-verified, covered paths green. OK.
- `sel_set_door` `ported` — body whole, tower + knox +
  tut-1 closures carried, rest split-named. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 5/5 + stair/tower neighbors 67/67.
- Audit re-measure (same 2 fns, `--base bdc47be2f~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); smoke 24 PASS / 0 regressed
  each → REACH-OK. No REGRESSED session. Matches.
- `node --test scripts/lspo-door-knox-tut1-spmap.test.mjs`:
  5/5 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
