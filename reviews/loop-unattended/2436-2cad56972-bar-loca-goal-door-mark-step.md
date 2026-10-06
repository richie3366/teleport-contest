# Review 2436 — 2cad56972 — bar-loca/goal des.door :4661 mark step

## Metadata

- SHA: `2cad56972` (2026-10-06) — D-3548.
- Subject: Open head: impossible audit + Bar-loca/Bar-goal
  des.door :4661 game-mark campaign step (12 sites,
  2 bitmaps C-complete).
- Diff: `js/mklev.js` (+11/−6: 2 mark lines + doc lines),
  new `scripts/lspo-door-bar-loca-goal-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (same unshippable partials); the step rides
  the Open head per precedent. No prior review claimed
  closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) Bar-loca barDoor (10) + Bar-goal barGoalDoor (2) gain
the guarded :4661 mark in C order; (c) per-site des
evidence (10 + 2, states + coords in order; stairs loca
up 05,02 + down 70,13, goal up 36,05; no mazewalk/
drawbridge/ladder; all coord-form; goal :34 is a comment,
map 'S' stays SDOOR); (d) both bitmaps C-complete
(doors-before-stairs kept); (e) provably neutral (goal's
remove_boundary CROSSWALL-only; solidify/tower/maze
readers off-path; region loops coordinate-iterated).

The diff actually adds: the 2 mark lines + des cites +
doc blocks. Delivered = promised; this time the
"byte-current" cites are exact (verified below).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| Bar-loca barDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| Bar-goal barGoalDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (`csym.mjs sel_set_door`, reused 2434): sp_lev.c:4646–
4662, mark :4661 unconditional after doormask :4660.
All 12 sites coord-form (string-state des.door with
coords → :4730). No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — loca :41–50: 10
  doors open/open/open/locked/locked/closed/closed/
  closed/closed/locked at 23,03 + 30,08 + 34,14 +
  38,05 + 38,06 + 43,03 + 43,05 + 43,06 + 43,08 +
  55,06; stairs up 05,02 :52 + down 70,13 :53. Goal
  :35–36 locked 22,09 + 26,09; :34 is the `-- Secret
  doors` comment; stair up 36,05 :38. Zero mazewalk/
  drawbridge/ladder. JS matches in order with matching
  masks (loca :13793–13802; goal :13955–13956). OK.
- Doors-before-stairs — des doors precede stairs; JS
  stairs follow (loca :13808/:13810, goal :13960;
  goal stair block re-asserts the set + :4189 mark).
  OK.
- Neutrality (re-read) — goal epilogue calls
  remove_boundary_syms (:14023) but its consult :19445
  sits under the CROSSWALL-only gate :19444 — DOOR
  cells cannot affect it. Loca epilogue is
  wallification + flip + fixup (no remove_boundary).
  Neither loader calls solidify/mazewalk/
  fill_empty_maze. Reader census cites all exact at
  this SHA: :4182/:4183, :14270, :21607, :21650. OK.
- Ledger rows — `sel_set_door` d=D-3548 prepended
  (rolling 6, D-3536 aged off); `impossible` likewise.
  OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

None. The "byte-current cites" boast holds this time —
every cited line re-measured exact. (The standing
:4647 ledger-start convention from 2434 remains, but it
is pre-existing, not this SHA's claim.)

## Density

Breadth-phase small SHA: no shippable manifest;
impossible audit + 2-closure mark ride the Open head per
precedent. Per-function verdicts:

- Bar-loca/goal :4661 sites (12) — whole line ports, C
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
- Audit re-measure (`--base 2cad56972~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-bar-loca-goal-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
