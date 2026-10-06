# Review 2432 — 65c6d93ec — Bar-strt/Wiz-strt des.door :4661 mark step

## Metadata

- SHA: `65c6d93ec` (2026-10-06) — D-3540.
- Subject: Open head: impossible audit + Bar-strt/Wiz-strt
  des.door :4661 game-mark campaign step (16 sites,
  2 bitmaps C-complete).
- Diff: `js/mklev.js` (+9/−3: 2 mark lines + doc lines),
  new `scripts/lspo-door-bar-wiz-strt-spmap.test.mjs`,
  docs/ledger/scoreboard (+ journal rotation).
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (same unshippable partials + goto_level);
  the step rides the Open head per precedent. No prior
  review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) barDoor + wizDoor gain the guarded :4661 mark in C
order; (c) per-site des evidence (8+8 sites, masks +
coords match in order, no drawbridge/ladder/mazewalk);
(d) both bitmaps C-complete (stairs precede doors in des
and JS); (e) provably neutral; (f) castle surveyed and
deferred (18 sites, mazewalk-after-door interplay).

The diff actually adds: the 2 mark lines + 3 doc blocks.
Delivered = promised; (e) carries one docs-only cite
drift (see Hallucinations), substance verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| barDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| wizDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (sp_lev.c:4646–4662, per 2430): doormask :4660 then
unconditional mark :4661; all 16 des sites coord-form
(:4730 path). No RNG in the marked line.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in
  both closures, C :4660/:4661 order. OK.
- Des census (re-read pinned lua) — Bar-strt :63–70:
  locked/locked/closed/open×5 at 12,05 + 12,09 + 21,07
  + 07,13 + 18,13 + 23,13 + 25,10 + 28,05; Wiz-strt
  :55–62: closed×2/closed/locked×2/closed/locked×2 at
  31,09 + 16,08 + 28,07 + 34,10 + 35,10 + 15,10 +
  19,10 + 20,10. JS matches in order with masks
  (open→D_ISOPEN; :6587–6594, :6826–6833). Zero
  drawbridge/ladder/mazewalk in either file. OK.
- Closure locality (extra-site check) — other
  wizDoor/barDoor calls (wiz_loca ×4, wiz_goal ×16,
  bar_loca ×10) each sit under their own unmarked
  per-loader closure; the marked closures serve exactly
  the 8+8 des-backed calls. No over-marking. OK.
- Stair-before-door — des :59/:50 stairs precede :63/:55
  doors; JS Bar stair (09,09) + mark precedes :6587,
  Wiz stair (30,10) + mark precedes :6826; coords match
  des. OK.
- Neutrality (re-read) — zero solidify_map across both
  loader bodies; exactly one remove_boundary_syms in
  range, inside load_wiz_strt (Bar-strt epilogue has
  none) as claimed; reader census unchanged from D-3538
  (re-verified: map/fixup/link/flip/wallification set
  refs zero). OK.
- Castle survey (spot-check) — 18 des.door :62–79,
  mazewalk :223–224, 18 castleDoor JS calls; numbers
  check out. Deferred, unshipped — no verdict weight.
- Ledger rows — `impossible` d=D-3540, note D-3540;
  `sel_set_door` d=D-3540 prepended. Exact. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

One docs-only cite drift: "js/mklev.js:19415 gate" —
at this SHA :19415 is a closing `}`; the CROSSWALL
pre-check gate is :19411 and the set consult :19423.
Substance (CROSSWALL-only) re-verified true. Same class
as the unqueued CURRENT debts (2426 cite drifts, 2420
stale-by-one) — no queue row.

## Density

Breadth-phase small SHA: no shippable manifest; impossible
audit + 2-closure mark ride the Open head per precedent.
Per-function verdicts:

- barDoor/wizDoor :4661 sites (16) — whole line ports, C
  order, des-verified, neutral, no over-marking. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued — shipped
  next as D-3541).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 6/6 (3/6 pre-change) + neighbors 26/26.
- Audit re-measure (`--base 65c6d93ec~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-bar-wiz-strt-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
