# Review 2423 — 789009530 — string-opt close-out + stair :4189 marks

## Metadata

- SHA: `789009530` (2026-10-06) — D-3522.
- Subject: Open head: impossible audit + manifest
  get_table_buc recheck + string-opt close-out (stair
  table-form decision; :4189 mark on the random-arm
  helpers).
- Diff: `js/mklev.js` (2 marks + doc), new
  `scripts/lspo-stair-spmap.test.mjs`, docs/ledger/
  scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest 1 fn (get_table_buc recheck); the close-out
  rides the Open head per precedent. No prior review
  claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) `get_table_buc` re-audited whole, no JS change; (c)
stair table-form decision NO (all in-tree dirs unpacked
0/1 ints; :4165/:4171 parse is unported-Lua boundary);
(d) both random-arm helpers gain the unconditional :4189
mark in C order (after deltrap, before mkstairs),
mirroring the l_create_stairway idiom; (e)
`get_table_option` flipped to `ported`.

The diff actually adds: the two marks + close-out doc.
Delivered = promised. (d)'s site counts reproduce exactly
(see below); (c)'s "12" count does not (nit, immaterial).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `splev_create_stair` / `splev_room_stair` marks | C line port | sp_lev.c:4189 | whole |
| `l_create_stairway` body (unchanged, idiom source) | C fn port | sp_lev.c:4146–4213 | whole (mark pre-existing) |
| `get_table_buc` (unchanged) | `audited` | sp_lev.c:3441–3452 | re-verified |
| `get_table_option` (unchanged) | `ported` flip | nhlua.c:1121–1133 | whole body, boundary named |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs l_create_stairway` → sp_lev.c:4146–4213):
table-form dir read :4165, string-form :4171, random setup
:4180, clear :4186, deltrap :4187–4188, unconditional
`SpLev_Map[x][y] = 1` :4189, ladder arm :4191+, else
mkstairs with force `!(RANDOM)` :4209–4210. All cites
exact.

Branch-by-branch confirm:

- Mark placement — both helpers: deltrap → mark → mkstairs,
  mirroring l_create_stairway's own deltrap → mark order.
  Helpers call mkstairs default-forced FALSE, matching the
  C random arm. Exactly C. OK.
- Site census (re-run at this SHA) — 96 helper call sites
  (98 pattern hits = 96 calls + 2 defs), all in `load_*`
  des fns / des.room paths where C marks unconditionally.
  OK.
- Stair table-form NO (re-run) — exactly 6 in-tree
  `l_create_stairway` callers, all int up 0/1 (the 7th/8th
  hits are the lspo wrappers); `lspo_stair`/`lspo_ladder`
  def-only, zero callers; zero string-dir sources. No live
  reader exists to rewire; the :4165/:4171 parse stays a
  named in-code + D-log omit. OK.
- Live reader — `maze1xy` checks `game.SpLev_Map.has`
  (mklev.js:21353), i.e. the marks feed a live C-faithful
  reader; covered paths stay green (44/44 + REACH), so the
  delta is held-out-positive only. OK.
- Ledger rows — `get_table_option ported` (omit retired,
  boundary + by-design live in the D-3522 Named + in-code
  doc); `get_table_buc` recheck d=D-3522 "whole vs C";
  `impossible` stays partial per pattern. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (marks only; no import change).

## Hallucinations / overclaim

Two docs-only nits. (1) "The 12 `// des.stair(...)` raw
translations all hand-exact": `des.stair` matches 60 lines
at this SHA and D-3524 later maps 16 + 46 + 12 fixed
sites — "12" matches no population I can reconstruct.
The material censuses (6 int callers, zero lspo callers)
reproduce exactly; D-3524's per-site mapping supersedes
this sentence. (2) The D-3522 `Ledger:` bullet omits
`l_create_stairway` although its helpers changed — the
Verify line does cover it, and D-3524's bullet picks the
function up. Tracking gap, not a fidelity gap.

## Density

Breadth-phase small SHA: 1-fn manifest recheck + audits +
2-line C-order fix ride the Open head per precedent.
Per-function verdicts:

- 2 helper marks — whole :4189 ports, C order, cites
  exact, live reader, covered paths green. OK.
- `get_table_buc` recheck — tables + delegation intact,
  no JS change. OK.
- `get_table_option` `ported` — body whole, all shippable
  sites closed, stair boundary + nhlsel by-design named
  (row note keeps stale adapter line numbers — historical
  note, docs-only). OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn get_table_buc,impossible,
  get_table_option,l_create_stairway` → syntax PASS, rule2
  PASS, 4× hidden note (none blocked), 4× REACH-OK (smoke
  24/24 each), green 2/2, strict ×2, cohort 7/7, auto full
  44/44 (shared file changed); node:test new 3/3
  (pre-change 1/3 — only the reference guard) + neighbors
  `lspo-*` 152/152.
- Audit re-measure (same 4 fns, `--base 789009530~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); smoke 24 PASS / 0 regressed
  each → REACH-OK. No REGRESSED session. Matches.
- `node --test scripts/lspo-stair-spmap.test.mjs`: 3/3
  pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
