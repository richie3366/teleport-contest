# Review 2438 — 2cf0411c1 — arc-strt/loca des.door :4661 mark step

## Metadata

- SHA: `2cf0411c1` (2026-10-06) — D-3552.
- Subject: Open head: impossible audit + Arc-strt/Arc-loca
  des.door :4661 game-mark campaign step (28 sites,
  2 bitmaps C-complete).
- Diff: `js/mklev.js` (+10/−5: 2 mark lines + doc lines),
  new `scripts/lspo-door-arc-strt-loca-spmap.test.mjs`,
  docs/ledger/scoreboard, plus a 2-line C-JS-MAP.md header
  cleanup (stale 2026-07-12 audit line — undisclosed,
  trivial, docs-only).
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (no batch --write); the step rides the Open
  head per precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) Arc-strt arcDoor (12) + Arc-loca arcDoor (16) gain the
guarded :4661 mark in C order; (c) per-site des evidence
(12 + 16 in order; strt stair-before-doors :56/:60–71,
loca doors-before-stairs :48–63/:65–66; no mazewalk/
drawbridge/ladder; all coord-form; Arc-goal/fila/filb
carry 0 des.door); (d) both bitmaps C-complete (both
orders kept; splev_level_init creates the set before the
doors, so the guarded adds fire); (e) provably neutral
(no whole-set iteration in either body — enumerated
census; no reader runs on these paths; region loops
coordinate-iterated).

The diff actually adds: the 2 mark lines + des cites +
doc blocks. Delivered = promised; one stale cite (see
Hallucinations), substance verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| Arc-strt arcDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| Arc-loca arcDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs sel_set_door`, reused 2434): sp_lev.c:4646–
4662, mark :4661 unconditional after doormask :4660.
All 28 sites coord-form. No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — strt :60–71: 12
  doors (closed/closed/locked/locked/locked/locked/
  locked/closed/closed/locked/closed/locked) at 22,07
  + 38,07 + 47,08 + 23,10 + 39,10 + 57,10 + 47,12 +
  22,13 + 38,13 + 24,14 + 31,14 + 49,14; stair down
  55,07 :56 (before doors). Loca :48–63: 16 doors at
  31,04 + 28,08 + 29,10 + 28,12 + 31,16 + 34,05 +
  35,10 + 38,10 + 43,10 + 45,08 + 46,14 + 46,15 +
  49,10 + 52,11 + 52,13 + 54,15; stairs up 03,17 :65
  + down 39,10 :66 (after doors). Zero mazewalk/
  drawbridge/ladder; goal/fila/filb 0 des.door. JS
  matches in order (:8057–8068, :8297–8312). OK.
- Both orders kept — strt stair :8045 precedes first
  arcDoor :8057; loca stairs :8318/:8320 follow last
  arcDoor :8312. splev_level_init runs first in both
  bodies (:7978/:8192), so the guarded adds fire. OK.
- Neutrality (re-read) — zero `for (const key of sp)`
  in :7975–8415 (both bodies; nearest census entries
  :7706/:9193 bracket them). Neither loader calls
  solidify/remove_boundary/mazewalk/fill_empty_maze/
  drawbridge (epilogues wallification + flip + fixup).
  OK.
- Ledger rows — `sel_set_door` d=D-3552 prepended
  (rolling 6, D-3540 aged off); `impossible` likewise.
  OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

Docs-only: "the maze `.has` (:21612)" — at this SHA
:21612 is `do {`, the true `.has` is :21617 (copied
from D-3550's tree without re-measure). Substance true
(off-path). Same unqueued docs-only class as
2432/2433/2434/2435 — no queue row. Loader-range
endpoints (7974/8186 vs def lines 7975/8189) are
likewise off-by-a-few with the substance holding.

## Density

Breadth-phase small SHA: no shippable manifest;
impossible audit + 2-closure mark ride the Open head per
precedent. Per-function verdicts:

- Arc-strt/loca :4661 sites (28) — whole line ports, C
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
  node:test new 6/6 (3/6 pre-change) + suites 70/70.
- Audit re-measure (`--base 2cf0411c1~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-arc-strt-loca-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
