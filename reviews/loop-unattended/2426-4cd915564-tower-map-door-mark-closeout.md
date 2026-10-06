# Review 2426 — 4cd915564 — tower map/door game-mark close-out

## Metadata

- SHA: `4cd915564` (2026-10-06) — D-3528.
- Subject: Open head: impossible audit + tower map-cell/door
  game-mark close-out (lspo_map :6292 + sel_set_door :4661;
  local sets deleted).
- Diff: `js/mklev.js` (+104/−56: 3 map loops + 3 lit
  epilogues + 3 solidifies + 3 door sites + docs), new
  `scripts/lspo-map-tower-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the close-out rides the Open head per
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) 3 tower map loops gain the game-set init + :6292 mark
in C order; (c) lit epilogues + inline solidifies switched
to the game set with no effect change; (d) ladder
local-adds deleted (game adds already carried); (e) twDoor
×2 + tower3 inline gain the :4661 mark after doormask;
(f) per-site des evidence; pre-flip marks C-exact.

The diff actually adds exactly that. Delivered = promised
on all six points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 3 tower map loops (mark) | C line port | sp_lev.c:6292 | whole |
| 3 lit epilogues + 3 solidifies (set swap) | C reader wiring | sp_lev.c:321 + map lit | whole |
| twDoor ×2 + tower3 inline (mark) | C line port | sp_lev.c:4661 | whole |
| `lspo_map` / `sel_set_door` live bodies (unchanged) | `ported` | sp_lev.c:6074–6319 / :4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C load loop (sp_lev.c:6286–6296, re-read): INVALID skip,
>=MAX skip, levl clear ×4, mark :6292, selection :6293,
terr/sel_set_ter :6294–6296. C sel_set_door (:4646–4662):
doormask :4660 → mark :4661. C solidify_map (:314–323):
STWALL exemption reads `SpLev_Map` at :321. All cites exact.

Branch-by-branch confirm:

- Mark placement — all 3 loops: skips → mark → sel_set_ter,
  matching C (mark before terr). sel_set_ter reads no set
  (re-checked). OK.
- Door marks — after doormask, before flags (C :4660/:4661
  order); census re-run: dat 7/2/1 des.door, JS 7+2 twDoor
  calls + 1 inline, tower1 coords + states match in order.
  OK.
- Pre-flip exactness — tower1 order is map → lit → ladder →
  doors → wallify → flip → solidify; C flip_level
  (:531–922) never touches SpLev_Map (re-grepped: 0 hits),
  JS names it at :19594/:19617. Pre-flip marks C-exact. OK.
- Lit equivalence — set is fresh at the map loop
  (load_special_proto → create_des_coder → :6366-mirror
  reset :3106, NULL in finally), and lit runs before
  ladder/door marks, so the game set = map cells exactly.
  Unchanged in effect. OK.
- Solidify delta — now exempts door-marked coords like
  C :321; ladder local-adds deleted against the D-3524
  game adds. Exactly C. OK.
- TOWER1_MAP bytes (re-run) — runtime value byte-identical
  to tower1.lua :11–21, 15×11 incl. the backslash niche
  (source `\\` = runtime `\`). OK.
- Ledger rows — `impossible` d advanced, standing omit;
  `sel_set_door` + `lspo_map` ported with d=D-3528. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (local→game set swap; no import change).

## Hallucinations / overclaim

None in this SHA. Two pre-existing cite drifts confirmed
docs-only (right place, wrong number; placement re-verified
above): live lspo_map's :6300-series cites read +8 vs
ground truth :6292 (disclosed in D-3528 Next, unqueued),
and the drawbridge mark cites :5761 vs C :5760. Ledger
`lspo_map` c-range :6075 vs csym :6074 is the standing
return-line convention (review-2421 family).

## Density

Breadth-phase small SHA: manifest empty; impossible audit +
tower close-out ride the Open head per precedent.
Per-function verdicts:

- 3 map loops + 3 doors — whole :6292/:4661 ports, C order,
  cites exact, dat-verified, covered paths green. OK.
- `lspo_map` / `sel_set_door` `ported` — bodies whole,
  inlined loops now carried. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,lspo_map,sel_set_door`
  → syntax PASS, rule2 PASS, 3× hidden note (none blocked),
  REACH-OK ×3 (lspo_map 80/80 sampled of 172), green 2/2,
  strict ×2, cohort 7/7, auto full 44/44 (shared file
  changed); `--reach-all` lspo_map 172/172; node:test new
  7/7 (0/7 pre-change) + stair neighbors 60/60.
- Audit re-measure (same 3 fns, `--base 4cd915564~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); lspo_map reach 172 PASS /
  0 regressed; smokes 24/24 each → REACH-OK. Matches.
- `node --test scripts/lspo-map-tower-spmap.test.mjs`: 7/7
  pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
