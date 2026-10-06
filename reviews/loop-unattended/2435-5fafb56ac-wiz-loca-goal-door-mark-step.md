# Review 2435 — 5fafb56ac — wiz-loca/goal des.door :4661 mark step

## Metadata

- SHA: `5fafb56ac` (2026-10-06) — D-3546.
- Subject: Open head: impossible audit + Wiz-loca/Wiz-goal
  des.door :4661 game-mark campaign step (20 sites,
  2 bitmaps C-complete; wall-form exclusion proved in C).
- Diff: `js/mklev.js` (+12/−5: 2 mark lines + doc lines),
  new `scripts/lspo-door-wiz-loca-goal-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (same unshippable partials); the step rides
  the Open head per precedent. No prior review claimed
  closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) Wiz-loca wizDoor (4) + Wiz-goal wizDoor (16 via one
loop call) gain the guarded :4661 mark in C order; (c)
per-site des evidence (4 + 16 in order; stairs loca up
03,17 + down 48,10, goal up 55,05; no mazewalk/
drawbridge/ladder); (d) both bitmaps C-complete
(doors-before-stairs kept); (e) loca's 5 wall-form secret
doors stay mark-free per the C `x == -1` branch (JS
splev_room_door → create_door, verified mark-free);
(f) provably neutral (remove_boundary CROSSWALL-only,
solidify/maze readers off-path, region loops coordinate-
iterated); (g) minend-3 surveyed into the mazewalk-
interplay step (4 sites, mazewalk after doors).

The diff actually adds: the 2 mark lines + des cites +
doc blocks. Delivered = promised; (f) cites are stale
despite the "byte-current" boast (see Hallucinations),
substance verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| Wiz-loca wizDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| Wiz-goal wizDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs sel_set_door`, reused 2434): sp_lev.c:4646–
4662, mark :4661 unconditional after doormask :4660. C
`lspo_door` branches at :4704 (`x == -1 && y == -1`):
wall-form → create_door (no mark), coord-form → :4730
`sel_set_door` (mark). No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — loca :76–79: 4
  locked at 55,08 + 55,12 + 47,08 + 47,12; stairs up
  03,17 :82 + down 48,10 :83. Goal :50–65: 16 locked
  19,06 … 49,09; stair up 55,05 :67. Zero mazewalk/
  drawbridge/ladder. JS matches in order (loca
  :7071–7074; goal 16-list :7344–7347 + loop call).
  OK.
- Wall-form exclusion — loca :41/:46/:54/:62/:71 are
  table-form `wall=` doors → C :4704 branch →
  create_door, no mark. JS: create_door :24257–24290
  and splev_room_door :24347+ contain zero
  `SpLev_Map` references; wall-form calls run before
  the coord doors. Correctly mark-free. OK.
- Doors-before-stairs — des doors precede stairs in
  both files; JS stairs follow the door sites (loca
  :7082/:7084, goal :7352). OK.
- Neutrality (re-read) — BOTH loaders call
  remove_boundary_syms (loca :7135, goal :7424), but
  its `.has` consult :19440 sits under the
  CROSSWALL-only gate :19438 (`typ !== CROSSWALL`
  skips) — DOOR cells added to the set cannot affect
  it. Neither loader calls solidify/mazewalk/
  fill_empty_maze; tower `.has` sites are other-loader-
  local. OK.
- Minend-3 survey — minend-3.lua:46 des.mazewalk;
  meDoor 4 sites :16967–16970, splev_mazewalk :16973
  after the doors. Substance exact; cites drifted
  (below). Unshipped — no verdict weight.
- Ledger rows — `sel_set_door` d=D-3546 prepended
  (rolling 6, D-3530 aged off); `impossible` likewise.
  OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

Docs-only cite drifts, substance verified true — but
the D-log calls them "byte-current cites", which is
false: ":19432 gate, :19433 consult" → true CROSSWALL
gate :19428/:19438, consult :19440; ":21595" → `let x`
line, true `.has` :21602; ":21638" → doc line, true
def :21639; "meDoor :16952, splev_mazewalk :16967" →
true :16967–16970/:16973. Same unqueued docs-only class
as 2432–2434/CURRENT debts — no queue row. The boast
should stop; the cites keep drifting because each SHA
shifts lines the author does not re-measure.

## Density

Breadth-phase small SHA: no shippable manifest;
impossible audit + 2-closure mark ride the Open head per
precedent. Per-function verdicts:

- Wiz-loca/goal :4661 sites (20) — whole line ports, C
  order, des-verified, neutral. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 7/7 (4/7 pre-change) + suites 52/52.
- Audit re-measure (`--base 5fafb56ac~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-wiz-loca-goal-spmap.test.mjs`:
  7/7 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
