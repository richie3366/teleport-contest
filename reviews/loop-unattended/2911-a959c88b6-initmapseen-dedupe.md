# Review 2911 — a959c88b6 — init_mapseen drops the invented dedupe guard

- SHA: `a959c88b6` (cliff rank-29 writer: tutorial
  re-entry double node)
- D-entry: D-4073; Ledger: dungeon.c
  (`init_mapseen ported`)
- `js/` diff: `js/dungeon.js` +8/−5 (guard deleted
  + doc rewritten); new
  `scripts/init-mapseen-duplicate.test.mjs`

## Intent vs deliverable

Promise: delete the `find_mapseen` dedupe guard so
init_mapseen unconditionally allocs + sorted-inserts
like C; the leaving_tutorial re-creation then holds
two tut-2 nodes and end disclosure prints the level
twice; two worldtour PASSes. The diff is exactly
the guard deletion plus the doc rewrite. Promise =
diff.

## Inventory

- `init_mapseen` (dungeon.js:1767–1799): 2 guard
  lines deleted; body otherwise untouched. C:
  dungeon.c :2834–2871.
- Doc comment rewritten with the mechanism + C
  cites. No import changes, no new edges.

No deleted symbols (find_mapseen/ensure_mapseen kept
and live), no re-pointed clones — step-3 paste not
triggered.

## C ↔ JS fidelity

Confirmed against pinned C:

- C :2841–2850 unconditional `alloc` + full
  `memset` + `lastseentyp` wipe; :2852–2870 sorted
  insert by (dnum, dlevel); no find/dedupe
  anywhere. The guard was pure JS invention.
- Mechanism cites check: mklev.c:1582 re-inits on
  every creation (before getbones); do.c:1654–1660
  discards tutorial levelfiles on leaving_tutorial
  while remdun_mapseen keeps the chain entries;
  traverse :3359 `why != 0` bypasses interest for
  end disclosure → the level prints twice. All
  three cites land on the claimed lines.
- Caller safety: C's single call site mklev.c:1582
  matches JS's single direct caller mklev.js:2941;
  the recalc/room_discovered sites (dungeon.js:2481/
  :2632) use `ensure_mapseen` (find || init), so
  the guard removal can only double-insert where C
  does. Body is C-order: alloc shape, lev,
  unconditional wipe, sorted insert (:1791
  predicate exact).
- Pre-existing JS `return init` (C returns void)
  kept for ensure_mapseen — harmless, disclosed
  shape, not a C-wrong.

## Hallucinations / overclaim

None. The 3 no-movement sessions are a genuine
split, not NO-MOVEMENT-as-omission: S1 (map-E,
different screen region + stepFns combat writers)
and S3/S4 (breath-killer strings measured both
sides this iteration, with the downstream offx
mechanism cited) each name their own future
deliverable.

## Density

Cliff writer, committed rank 29, first actionable
(ranks 1–21 + 28 parks re-verified live). One
`Ledger:` entry. Full 44/44 run in-commit
(dungeon.js shared). No unreached work.

## Verification

Re-measure (`--base a959c88b6~1 --no-reach`):

```text
verify background_enlightenment: 2 PASS, 0 moved past, 3 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-49955007: PASS
  scen-worldtour-Priest-49950072: PASS
  3× still background_enlightenment at 324/1734/624 (identical toplines)
```

Exact match. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
