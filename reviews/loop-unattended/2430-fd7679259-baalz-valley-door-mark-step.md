# Review 2430 — fd7679259 — baalz/valley des.door :4661 mark step

## Metadata

- SHA: `fd7679259` (2026-10-06) — D-3536.
- Subject: Open head: impossible audit + baalz/valley des.door
  :4661 game-mark campaign step (4 sites, 2 bitmaps
  C-complete).
- Diff: `js/mklev.js` (+9/−4: 2 mark lines + doc lines),
  new `scripts/lspo-door-baalz-valley-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch picker surfaced 2 unshippable partials (no manifest);
  the step rides the Open head per precedent. No prior
  review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) baalz inline door + valleyDoor gain the guarded :4661
mark in C :4660/:4661 order; (c) per-site des evidence
(1+3 locked sites, coords match, no drawbridge/ladder,
valley mazewalk-free); (d) both bitmaps C-complete;
(e) provably neutral (mazewalk-before-door, bitmap-clean
fixup, CROSSWALL-only reader).

The diff actually adds: the 2 mark lines + 3 doc blocks.
Delivered = promised; every sub-claim re-verified true
below.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| baalz inline door (mark) | C line port | sp_lev.c:4661 | whole |
| valleyDoor closure (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (csym: sp_lev.c:4646–4662): typ write :4660, then
unconditional `SpLev_Map[x][y] = 1` :4661. Caller gate
(:4705–4731): coord-form → `sel_set_door` :4730;
wall-form (x==−1) → `create_door` (no mark). Both des
sites here are coord-form, so :4661 applies. No RNG in
the body — call-for-call trivially holds.

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in both
  sites, C :4660/:4661 order, twDoor idiom; guard matches
  the established split (set exists on special levels).
  JS valley :25089, baalz :25995. OK.
- Des census (re-read pinned lua) — baalz.lua:35 exactly 1
  `des.door("locked",00,06)`, matches the inline block at
  mx+0,my+6; valley.lua:66–68 exactly 3 locked doors at
  (4,1),(8,4),(6,6), matching the 3 valleyDoor calls in
  order; zero des.drawbridge/ladder in either file; zero
  des.mazewalk in valley. OK.
- C order — baalz.lua :33 mazewalk, :34 stair, :35 door;
  JS load_baalz :25983 < :25987–25988 < :25995. OK.
- C-complete bitmaps — baalz own map loop :25945 (:6292)
  + stair :4189 + door; valley via
  splev_apply_centered_map (:6292) + stair :4189 + 3
  doors; remaining des stanzas (regions, altar,
  non_diggable) are outside the 4-site writer set. OK.
- Neutrality (re-read) — baalz_fixup (:849–948) has zero
  SpLev_Map refs; remove_boundary_syms skips non-CROSSWALL
  before consulting the set (consult at :19401 on this
  SHA — cite exact); wallification has zero set refs;
  solidify touches STWALL only, never DOOR cells. OK.
- Ledger rows — `impossible` d advanced, note D-3536,
  standing Rule #2 omit; `sel_set_door` d=D-3536
  prepended, still `ported`. OK.
- Doc census — D-3530 substring preserved verbatim, new
  closures appended. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (2 one-line marks + docs; no import change).

## Hallucinations / overclaim

None. The "C (:33 before :35)" shorthand omits the :34
stair between them, but the commit message's fuller
":33/:34/:35 order" and the test assert the exact
sequence — shorthand, not overclaim.

## Density

Breadth-phase small SHA: no shippable manifest (2
restore-compacted partials); impossible audit + 2-site
mark ride the Open head per precedent. Per-function
verdicts:

- baalz/valley :4661 sites — whole line port, C order,
  des-verified, neutral. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued — shipped
  next as D-3537).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 6/6 (3/6 pre-change) + knox/tut-1 5/5 +
  map/stair neighbors 78/78.
- Audit re-measure (`--base fd7679259~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-baalz-valley-spmap.test.mjs`:
  6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
