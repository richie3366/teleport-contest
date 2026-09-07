# Review 1008 — 2d18057e — seenv_matrix center 0→SVALL (D-2038)

Metadata: SHA `2d18057e`, D-2038, Open-row port (6
screen-first x_monnam rows). js/ touches
`js/vision.js` (1 constant + comment). Also
rescores scoreboard + touches `c-js-map/data.md`.
No stamp owed.

## Intent vs deliverable

Subject promises: center cell `0`→SVALL per
`display.c:3358–3362`, no new imports/edges,
reachable only at the hero's own square. Diff
actually adds: exactly that. Promise == diff. No
deletes / re-points.

## Inventory

- Changed JS: `seenv_matrix[1][1]`. `sym.mjs`
  not needed for a constant swap (SVALL already
  imported from the same const block at vision.js:11;
  no callee, no clone, no stub). Named: none new.

## C ↔ JS fidelity

Against `display.c:3358–3362` (read — the matrix
literal sits at :3359–3363 with its "used here and
in vision.c" comment at :3356–3357; 1-line slip,
noise): C center is SVALL, all eight neighbours
SV0–SV7 in the same positions. JS matrix is now
cell-identical. The old `0` meant "hero's own
square seen from no angle", which explains the
symptom mechanically (self-lookat fails → "Can't
find dungeon feature '<'" instead of the hero
name). Causal chain confirmed by the pre-verify
probe (Ranger step-38 topline flips to byte-equal
C text), not just asserted.

## Hallucinations / overclaim

None. "Bit-identical by construction" for other
cells holds (single matrix entry, read-guarded by
`row==uy && col==ux`).

## Density

One constant — below the ~40-insertion floor, but
C is literally one cell, which §2b exempts. 1 PASS
+ 3 moved past + full 44/44 on a shared file is a
complete handoff, not a waste iter.

## Verification

- `imports.mjs --rulecheck`: clean. No added lines
  to grep beyond the constant + comment.
- Re-measured `hidden-proxy verify x_monnam --base
  2d18057e~1`: `1 PASS, 3 moved past, 2 unchanged,
  0 worse → PROGRESS` — matches the D-log's
  classification (92117 PASS; 92126/92006/92209
  moved; 92024 + 91128 still x_monnam, disclosed).
  One drift note: at HEAD, Caveman-92006 reads
  "moved → one_characteristic at step 88" where the
  D-log said "→ disclose at step 84" — a later
  commit moved the same session to a later owner,
  which is forward motion, not a contradiction.
- Green 2/2 + strict ×2, cohort 7/7, full 44/44
  per D-log (owed: vision.js is shared; claimed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
