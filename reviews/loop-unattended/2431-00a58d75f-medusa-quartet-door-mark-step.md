# Review 2431 — 00a58d75f — medusa quartet des.door :4661 mark step

## Metadata

- SHA: `00a58d75f` (2026-10-06) — D-3538.
- Subject: Open head: impossible audit + medusa quartet
  des.door :4661 game-mark campaign step (16 sites,
  4 bitmaps C-complete).
- Diff: `js/mklev.js` (+13/−2: 4 mark lines + doc lines),
  new `scripts/lspo-door-medusa-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  No manifest (same 2 unshippable partials); the step rides
  the Open head per precedent. No prior review claimed
  closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) medDoor ×3 + medusa-2 inline gain the guarded :4661
mark in C order; (c) per-site des evidence (4+4+1+7
sites, masks + coords match in order, no
drawbridge/ladder/mazewalk in any file); (d) all four
bitmaps C-complete; (e) provably neutral (no solidify,
CROSSWALL-only reader, bitmap-clean epilogue).

The diff actually adds: the 4 mark lines + 5 doc blocks.
Delivered = promised; every sub-claim re-verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| medDoor ×3 closures (mark) | C line port | sp_lev.c:4661 | whole |
| medusa-2 inline door (mark) | C line port | sp_lev.c:4661 | whole |
| `sel_set_door` live body (unchanged) | `ported` | sp_lev.c:4646–4662 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (sp_lev.c:4646–4662, re-read for 2430): doormask :4660
then unconditional mark :4661; coord-form des.door routes
via :4730. All 16 des sites are coord-form. No RNG in the
marked line; the one `random` door keeps its pre-existing
`rnddoor()` call (see below).

Branch-by-branch confirm:

- Mark placement — guarded set-add after doormask in all
  4 sites, C :4660/:4661 order, twDoor idiom. OK.
- Des census (re-read pinned lua) — medusa-1 :51–54:
  closed/locked/locked/closed at (46,07),(38,08),(38,11),
  (30,12); medusa-2 :48: locked (71,07); medusa-3 :72–75:
  locked/locked/random/locked at (08,08),(64,05),(50,13),
  (48,15); medusa-4 :69–75: 7 locked at 04,06 + 04,10 +
  08,04 + 08,12 + 10,06 + 10,10 + 12,08. JS calls match
  in order with masks (:5375–5378, :5696–5699 with
  `rnddoor()` for the random site, inline mx+71,my+7,
  :6092–6098 with hardcoded D_LOCKED). Zero
  des.drawbridge/ladder/mazewalk in all four files. OK.
- Stair split — "fixed mkstairs in 1/3" = direct-mkstairs
  call shape (medusa_1 fixed coords, medusa_3 medloc,
  both with explicit :4189 marks); "l_create_stairway in
  2/4" = helper shape (medusa_2 fixed coords through the
  helper, medusa_4 medloc). Verified in JS; the axis is
  call shape, and the split is accurate. OK.
- C-complete bitmaps — all four via
  splev_apply_centered_map (:6292) + marked stairs +
  marked doors; remaining stanzas outside the writer set.
  OK.
- Neutrality (re-read) — zero solidify_map calls across
  :5268–6120; epilogues link → remove_boundary →
  map_cleanup; remove_boundary consult at :19416 on this
  SHA (cite exact); map_cleanup + fixup_special zero set
  refs; zero set refs past :33000 (flip/wallification).
  OK.
- Ledger rows — `impossible` d advanced, note D-3538;
  `sel_set_door` d=D-3538 prepended. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required.

## Hallucinations / overclaim

None.

## Density

Breadth-phase small SHA: no shippable manifest; impossible
audit + 4-site mark ride the Open head per precedent.
Per-function verdicts:

- medusa :4661 sites (16) — whole line ports, C order,
  des-verified, neutral. OK.
- `sel_set_door` `ported` — live body + newly-wired
  inlined sites. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix head
  deferred per declared override, still queued — shipped
  next as D-3539).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,sel_set_door` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked),
  REACH-OK ×2 (smoke 24/24 each), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  node:test new 8/8 (3/8 pre-change) + neighbors 96/96.
- Audit re-measure (`--base 00a58d75f~1 --reach-all`):
  0 blocked each (vacuous, correctly labeled — rows
  cited none); smoke 24/24 → REACH-OK ×2, 0 regressed.
  Matches.
- `node --test scripts/lspo-door-medusa-spmap.test.mjs`:
  8/8 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
