# Review 1293 — 348a7846 — dungeon.c surface clone retires to shared (D-2327)

Metadata: SHA `348a7846`, D-2327, Must-fix from review 1289 (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dig.js` +5/−11: clone deleted, mid-file import added); C `surface dungeon.c:1749–1788` full body + C `hliquid do_name.c:1492–1510` (via `csym.mjs`); JS `surface js/sit.js:475–505` body read; `sym.mjs` on `surface` (required: clone→import re-point — pasted below); `imports.mjs --can dig.js sit.js surface`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify surface --base 348a7846~1` re-run.

## Intent vs deliverable

Subject promises the review-1289 Must-fix: the DRAWBRIDGE_UP ROOM cop-out printed "ground" where C prints the drawbridge-under noun. Diff deletes the file-local clone and re-points all six `surface(...)` call sites at the shared D-2008 body. Promise kept.

## Inventory

- Deleted: 9-line local `surface` (fountain/altar/wall/doorway/floor/ground only).
- Added: `import { surface } from './sit.js'` + C-citing comment naming the 1289 defect.
- Untouched: all six call sites (`:687/:689` furniture, `:1788/:1964/:2024` too-hard, `:2645` scratch) now bind the import.

Required sym paste (deleted clone → import):

```text
surface          js/sit.js:475   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/dokick.js:245  js/engrave.js:123
```

The dig.js clone is gone from the list; the two remaining clones are the map-named per-context ones the D-log discloses (turns.md). Canonical home confirmed exported sync.

## C ↔ JS fidelity

Shared body vs C `:1749–1788`: branch order exact (swallow arm named-omitted per D-2008 → AIR → pool → ice → lava → DRAWBRIDGE_DOWN bridge → altar → grave → fountain → stairs → wall/SDOOR → doorway → room → ground). `SURFACE_AT` via `db_under_typ` on DRAWBRIDGE_UP ✓; bridge reads raw typ ✓. Every behavior delta at the six dig.js sites moves toward C: moat/lava/ice-under-drawbridge nouns (the Must-fix), plus stairs (`STAIRS ≥ ROOM` misread as floor — the sit.js comment cites the Ranger-92133 proof), headstone, bridge, SDOOR→wall. JS `hliquid` (`do_name.js:370`) ≡ C (hallu → display-RNG pick incl. pref as last choice; else pref as-is).

Correction to my own review 1289: the D-log's wording fix is right and 1289's was wrong — C's lava arm is `hliquid("lava")`, which returns `"lava"` (not "molten lava") when not hallucinating, verified in pinned `do_name.c:1492–1510`. Likewise the degenerate STONE mask reads "water" both sides (`DB_MOAT=0`). No code impact (JS `hliquid('lava')` is exact either way); 1289's Actionable item (wrong noun on all three real masks) stands unchanged.

## Hallucinations / overclaim

None. `--can` SAFE-at-commit → ALREADY now (the edge itself); mid-file `import` is hoisted ESM, and the probe loaded `dig.js` with the edge. "Zero new imports" is precise — one import line, no new callee. Vacuous-hidden note honest.

## Density

−11/+5 for a Must-fix single defect. Correct (Must-fix ships alone).

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + 8/8 hand probe (deleted, disclosed). Re-measured:

```text
verify surface: baseline 348a7846~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
