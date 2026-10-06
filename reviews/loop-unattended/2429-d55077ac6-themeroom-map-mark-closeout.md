# Review 2429 — d55077ac6 — themeroom map :6292 close-out

## Metadata

- SHA: `d55077ac6` (2026-10-06) — D-3534.
- Subject: Open head: impossible audit + lspo_map_themeroom
  :6292 game-mark close-out (last unmarked map loop; 19/19
  themerms byte-identical).
- Diff: `js/mklev.js` (+11/−1: helper init + mark + docs),
  new `scripts/lspo-map-themeroom-spmap.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch picker surfaced 1 unshippable fn (no manifest); the
  close-out rides the Open head per precedent. No prior
  review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) the themeroom helper gains the game-set init + :6292
mark in C order; (c) per-site des evidence (19/19
byte-identical, filler-only contents, wall-form doors
excluded per C); (d) last unmarked map loop; (e) provably
neutral via a themed-room reader pass.

The diff actually adds: the init + mark + doc lines.
Delivered = promised; (c)/(e) carry docs-only imprecisions
(see Hallucinations) with the substance verified true.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| lspo_map_themeroom loop (mark) | C line port | sp_lev.c:6292 | whole |
| `lspo_map` live body (unchanged) | `ported` | sp_lev.c:6074–6319 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C (sp_lev.c:6244–6305, re-read): the `in_mk_themerooms`
gate guards only the no-overwrite pre-check; the shared
"Load the map" loop (skips → mark :6292 → selection →
sel_set_ter) runs on the themeroom path too. Cites exact.

Branch-by-branch confirm:

- Mark placement — skips → mark → sel_set_ter, C order,
  tower idiom; helper is the sole themeroom map path
  (caller :32348 mapdef branch). OK.
- 19/19 bytes (re-run) — all JS THEMEROOM_MAPS runtime
  values byte-identical to the named themerms.lua des.map
  blocks, names match 1:1. OK.
- No map-contents writers (re-run) — zero des.stair/
  drawbridge/mazewalk/ladder in themerms.lua; all des.door
  wall-form (coord-less → create_door path, which never
  marks: re-grepped :1713–1806, 0 hits). OK.
- Last unmarked loop (re-run) — all 21 map-load loops
  (mapfrag_get + sel_set_ter) carry the mark; the 3
  mark-less mapfrag reads are validation/probe reads
  (mapfrag_error, match predicate, themeroom pre-check),
  not load loops. OK.
- Neutrality (re-run) — solidify: des-gated + soko +
  astral only, none on the ordinary path; remove/maze
  readers all in special loaders; lspo_finalize_level is
  def-only (dead); themeroom runs on the ordinary path
  (:29621) where no live reader runs; next special level
  resets via the :6366 mirror. Conclusion true. OK.
- Ledger rows — `impossible` d advanced, standing omit;
  `lspo_map` ported with d=D-3534. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (init + mark; no import change).

## Hallucinations / overclaim

Three docs-only imprecisions, substance verified true:
(1) "wall-form des.door sites :299–436" omits :857/:862
(also wall-form, shop-room contents — same create_door
exclusion); (2) "filler_region-only contents" — 2 of 19
also carry a conditional replace_terrain / region+chests+
rooms, but no SpLev_Map writer in any; (3) reader-pass
counts ("8 special loaders", "9", "wiz-only finalize")
don't reproduce (13 remove sites, 12 mazewalk calls in 10
loaders + hellfill) — the conclusion (no live reader on
the ordinary path) re-verified true.

## Density

Breadth-phase small SHA: no shippable manifest; impossible
audit + 1-loop close-out ride the Open head per precedent.
Per-function verdicts:

- Themeroom loop — whole :6292 port, C order, cite exact,
  dat-verified, covered paths green. OK.
- `lspo_map` `ported` — body whole, every map-load loop in
  the tree now carried. OK.
- `impossible` `audited` — whole modulo named Rule #2
  omits (untouched). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,lspo_map` → syntax
  PASS, rule2 PASS, 2× hidden note (none blocked), REACH-OK
  ×2 (lspo_map 80/80 sampled of 172), green 2/2, strict ×2,
  cohort 7/7, auto full 44/44 (shared file changed);
  `--reach-all` lspo_map 172/172; node:test new 5/5 (2/5
  pre-change) + tower/tut/door/stair neighbors 78/78.
- Audit re-measure (same 2 fns, `--base d55077ac6~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); lspo_map reach 172 PASS /
  0 regressed; smoke 24/24 → REACH-OK. Matches.
- `node --test scripts/lspo-map-themeroom-spmap.test.mjs`:
  5/5 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
