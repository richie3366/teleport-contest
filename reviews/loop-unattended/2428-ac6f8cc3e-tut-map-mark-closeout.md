# Review 2428 — ac6f8cc3e — tut-1/tut-2 des.map :6292 marks

## Metadata

- SHA: `ac6f8cc3e` (2026-10-06) — D-3532.
- Subject: Open head: impossible audit + tut-1/tut-2 des.map
  :6292 game-mark close-out (tutorial bitmaps C-complete).
- Diff: `js/mklev.js` (+8/−2: 2 loops + doc), new
  `scripts/lspo-map-tut-spmap.test.mjs`, door-test header,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the close-out rides the Open head per
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) both tut map loops gain the game-set init + :6292 mark
in C order; (c) per-site des evidence (bitmaps byte-identical,
door/stair census, no drawbridge/mazewalk/ladder); (d) both
tutorial bitmaps C-complete; (e) provably neutral.

The diff actually adds: the 2 inits + 2 marks + doc lines.
Delivered = promised on all five points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| load_tut1 map loop (mark) | C line port | sp_lev.c:6292 | whole |
| load_tut2 map loop (mark) | C line port | sp_lev.c:6292 | whole |
| `lspo_map` live body (unchanged) | `ported` | sp_lev.c:6074–6319 | re-verified |
| `impossible` (display.js) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C load loop (sp_lev.c:6286–6296, re-read in review 2426):
skips → mark :6292 → selection :6293 → sel_set_ter
:6294–6296. Cites exact.

Branch-by-branch confirm:

- Mark placement — both loops: combined INVALID/MAX skip →
  mark → sel_set_ter, C order, tower idiom. OK.
- Bitmap bytes (re-run) — TUT1_MAP runtime value
  byte-identical to tut-1.lua des.map (75×18), TUT2_MAP to
  tut-2.lua des.map (14×8). OK.
- Des census (re-run) — tut-1: 12 des.door :91–283 + 1
  des.stair down 58,10 :289; tut-2: 1 des.stair up 2,2
  :20; zero ladder/drawbridge/mazewalk in both. OK.
- Stair wiring — tut-1 `l_create_stairway(0, 58, 10, …)`
  :20356, tut-2 `l_create_stairway(1, 2, 2, …)` :20464,
  both via the live :4189-carrying helper. OK.
- Bitmap completeness — tut-1: map + 12 door marks (D-3530)
  + live stair; tut-2: map + live stair, no doors. Every
  C writer on these levels now marked. OK.
- Neutrality (re-run) — both epilogues are wallification +
  fixup_special only (noflip, no solidify/remove/maze
  calls); CROSSWALL = 'B' map char, absent from both maps;
  STWALL has no map-char source. No live reader can
  observe the delta. OK.
- Ledger rows — `impossible` d advanced, standing omit;
  `lspo_map` ported with d=D-3532. OK.

No symbol deleted or re-pointed — no `sym.mjs` output
required (2 added inits + 2 marks; no import change).

## Hallucinations / overclaim

None.

## Density

Breadth-phase small SHA: manifest empty; impossible audit +
2-loop close-out ride the Open head per precedent.
Per-function verdicts:

- 2 map loops — whole :6292 ports, C order, cites exact,
  dat-verified, covered paths green. OK.
- `lspo_map` `ported` — body whole, tower + tut inlined
  loops carried, themeroom split-named. OK.
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
  `--reach-all` lspo_map 172/172; node:test new 6/6 (3/6
  pre-change) + door/tower/stair neighbors 78/78.
- Audit re-measure (same 2 fns, `--base ac6f8cc3e~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); lspo_map reach 172 PASS /
  0 regressed; smoke 24/24 → REACH-OK. Matches.
- `node --test scripts/lspo-map-tut-spmap.test.mjs`: 6/6
  pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
