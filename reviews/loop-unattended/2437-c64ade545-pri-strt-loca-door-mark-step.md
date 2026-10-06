# Review 2437 — c64ade545 — pri-strt/loca des.door :4661 mark step

## Metadata

- SHA: `c64ade545` (2026-10-06) — D-3550.
- Subject: Open head: impossible audit + Pri-strt/Pri-loca
  des.door :4661 game-mark campaign step (24 sites,
  2 bitmaps C-complete).
- Diff: `js/mklev.js` (+11/−6: 2 mark lines + doc lines),
  new `scripts/lspo-door-pri-strt-loca-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (5 unshippable partials, read-only preview);
  the step rides the Open head per precedent. No prior
  review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) Pri-strt priDoor (18) + Pri-loca priDoor (6) gain the
guarded :4661 mark in C order; (c) per-site des evidence
(18 + 6 in order; strt stair-before-doors :51/:53–70,
loca doors-before-stairs :38–43/:46–47; no mazewalk/
drawbridge/ladder; all coord-form); (d) both bitmaps
C-complete (both orders kept in JS); (e) provably neutral
— including the new whole-set-read case: loca's lit=FALSE
loop :7706 runs before the first priDoor call; solidify/
remove_boundary/tower/maze readers off-path and uncalled.

The diff actually adds: the 2 mark lines + des cites +
doc blocks. Delivered = promised; cites re-measured
exact.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| Pri-strt priDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| Pri-loca priDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs sel_set_door`, reused 2434): sp_lev.c:4646–
4662, mark :4661 unconditional after doormask :4660.
All 24 sites coord-form. No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — strt :53–70: 18
  doors (locked/locked/closed×5/locked/closed×3/
  locked/closed×3/closed×3) at 18,09 + 18,10 +
  34,09 + 34,10 + 40,05 + 46,05 + 52,05 + 38,07 +
  42,07 + 46,07 + 52,07 + 38,12 + 44,12 + 48,12 +
  52,12 + 40,14 + 46,14 + 52,14; stair down 52,09
  :51 (before doors). Loca :38–43: 6 locked at 10,06
  + 10,07 + 20,02 + 20,11 + 30,06 + 30,07; stairs up
  43,05 :46 + down 20,06 :47 (after doors). Zero
  mazewalk/drawbridge/ladder. JS matches in order
  (:7532–7549, :7792–7797). OK.
- Both orders kept — JS stair :7520 precedes first
  priDoor :7532 (strt); JS stairs :7803/:7805 follow
  last priDoor :7797 (loca). OK.
- Neutrality (re-read) — the lit=FALSE whole-set loop
  `for (const key of sp)` is exactly :7706 and runs
  before the first priDoor call :7792, so later adds
  cannot affect it (and C likewise clears lit at map
  time, doors don't touch lit). Neither loader calls
  solidify/remove_boundary/mazewalk/fill_empty_maze
  (strt epilogue wallification + flip + fixup; loca
  wallification + fixup, noflip). Reader census cites
  all exact: :4182/:4183, :19449/:19450, :14274,
  :21612/:21655. OK.
- Ledger rows — `sel_set_door` d=D-3550 prepended
  (rolling 6, D-3538 aged off); `impossible` likewise.
  OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

None.

## Density

Breadth-phase small SHA: no shippable manifest;
impossible audit + 2-closure mark ride the Open head per
precedent. Per-function verdicts:

- Pri-strt/loca :4661 sites (24) — whole line ports, C
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
  node:test new 6/6 (3/6 pre-change) + neighbors.
- Audit re-measure (`--base c64ade545~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-pri-strt-loca-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
