# Review 2321 — f1f60014e — reveal-terrain probe deletion

Metadata: SHA `f1f60014e`, D-3366, Must-fix for review 2318
C-wrong 1. Stat: js/display.js only (−16/+0 net in
function; no other js/ file).

Intent vs deliverable: subject promises "reveal-terrain
committed probe deletion". Diff actually: deletes the
`__probe` capture block and the `__probe`/`globalThis`
tail write, restoring the direct `return
reveal_terrain_cmap_hack(...)`. Matches promise; closes
the queued Must-fix exactly as specified.

Inventory: 0 new/changed functions (2 block deletions
inside `reveal_terrain_getglyph`). No helper, import,
stub, or clone touched. The 4 id arms from 6da1640bc are
untouched.

C ↔ JS fidelity: deletion-only — no C semantics change
possible. Confirm the restore is exact: pre-6da1640bc
`js/display.js:4474` was `return
reveal_terrain_cmap_hack(` = restored tail byte-shape;
`git diff 6da1640bc~1 f1f60014e -- js/display.js` carries
zero probe/`__ret`/`42` lines, i.e. the remaining delta
is exactly the 4 id arms. Repo-wide grep at HEAD: no
`__probe` / `__probe_reveal` in `js/` or tests — nothing
ever read the global, so no orphaned reader. The
behavior-neutral claim (record-only, no
control-flow/RNG/return effect) holds by inspection: the
captured object was never branched on.

Hallucinations / overclaim: none. The D-log correctly
admits the D-3363 "(reverted)" claim was false.

Density: 1-function Must-fix, alone ✓. One `Ledger:`
entry, one Verify line. Full 44/44 cited (shared file).

Verification: re-measured — `verify
reveal_terrain_getglyph --base f1f60014e~1 --reach-all`
→ "0 blocked at baseline + working scoreboard" +
"smoke 24/24 → REACH-OK". Matches the D-log (0 blocks,
smoke 24/24). D-log says "expected — Must-fix, not
corpus", honest vacuous note ✓. Diff grep: only the
deleted lines carry banned shapes. `sym.mjs` (required
paste; nothing re-pointed):

```text
reveal_terrain_getglyph js/display.js:4366   sync
```

Single definer, unchanged export.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
