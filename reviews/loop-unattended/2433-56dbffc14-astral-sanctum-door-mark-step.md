# Review 2433 — 56dbffc14 — astral/sanctum des.door :4661 mark step

## Metadata

- SHA: `56dbffc14` (2026-10-06) — D-3542.
- Subject: Open head: impossible audit + astral/sanctum
  des.door :4661 game-mark campaign step (13 sites,
  2 bitmaps C-complete).
- Diff: `js/mklev.js` (+9/−3: 2 mark lines + doc lines),
  new `scripts/lspo-door-astral-sanctum-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (same 3 unshippable partials); the step rides
  the Open head per precedent. No prior review claimed
  closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) astralDoor + sanctDoor gain the guarded :4661 mark in
C order; (c) per-site des evidence (9+4 sites, masks +
coords match in order; sanctum :36 wall-form excluded per
C; no drawbridge/mazewalk; astral stairless); (d) both
bitmaps C-complete (sanctum doors-before-stair order kept
in JS); (e) provably neutral (STWALL/CROSSWALL-only
readers, mazewalk-free paths, no post-door whole-set
iteration); (f) asmodeus/orcus/wizard2 surveyed and
deferred (mazewalk interplay class).

The diff actually adds: the 2 mark lines + 3 doc blocks.
Delivered = promised; (e) carries two docs-only cite
drifts (see Hallucinations), substance verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| astralDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| sanctDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (sp_lev.c:4646–4662, per 2430): doormask :4660 then
unconditional mark :4661; coord-form via :4730, wall-form
via create_door (no mark). 13 sites coord-form, 1
wall-form correctly excluded. No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — astral :93–101: 9
  doors closed/closed/locked/locked/closed/closed/
  locked/locked/closed at 11,09 + 17,09 + 23,12 + 37,08
  + 37,11 + 37,17 + 51,12 + 57,09 + 63,09; sanctum
  :45–48: closed/locked/closed/closed at 40,06 + 62,06
  + 46,12 + 53,10. JS matches in order (:16272–16280,
  :27657–27660). Sanctum :36 is coord-less wall-form
  (`wall="random"`) → create_door, correctly unmarked.
  Zero drawbridge/mazewalk in either file; zero
  des.stair/ladder in astral; sanctum stair :130 up
  63,15. OK.
- Doors-before-stair — des doors :45–48 precede stair
  :130; JS doors :27657–27660 precede stair+mark
  :27739–27742 (up, 63,15). Astral: zero mkstairs in
  :16078–16393 — map + doors only. OK.
- Neutrality (re-read) — full `.has` census is exactly
  4 sites: :4183 solidify (STWALL gate :4182 — cite
  exact), :19426 remove_boundary (CROSSWALL gate
  :19425), :21588/:21631 mazewalk-region; zero whole-set
  iterations anywhere. Astral epilogue runs solidify +
  remove_boundary (both typ-gated, DOOR-safe); sanctum
  epilogue has neither call. Neither des has mazewalk,
  so :21588/:21631 never run here. Flip/set-iteration
  census unchanged. OK.
- Deferred surveys (spot-check) — asmodeus 4 doors +
  mazewalk, orcus 16 + mazewalk, wizard2 2 + mazewalk:
  counts exact. Unshipped — no verdict weight.
- Ledger rows — `impossible` d=D-3542, note D-3542;
  `sel_set_door` d=D-3542 prepended (rolling 6-window,
  D-3007 aged off per convention). OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

Two docs-only cite drifts, substance verified true:
(1) ":19421 gate" — at this SHA :19421 is
`const sp = g.SpLev_Map;`, the CROSSWALL gates are :19410
(pre-check) and :19425 (loop skip); (2) fill_empty_maze
caller ":21703" is :21706 on this tree (:1326 exact).
Same unqueued docs-only class as 2432 / CURRENT debts —
no queue row.

## Density

Breadth-phase small SHA: no shippable manifest; impossible
audit + 2-closure mark ride the Open head per precedent.
Per-function verdicts:

- astralDoor/sanctDoor :4661 sites (13) — whole line
  ports, C order, des-verified, neutral. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued — shipped
  next as D-3543).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 6/6 (3/6 pre-change) + neighbors 14/14.
- Audit re-measure (`--base 56dbffc14~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-astral-sanctum-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
