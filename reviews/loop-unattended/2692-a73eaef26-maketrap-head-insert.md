# Review 2692 — a73eaef26 — maketrap head-insert (newest-first trap order)

Metadata: SHA `a73eaef26`, D-3829, cliffs head `getpos.c` getpos
writer (getpos untouched — whole). JS: `js/trap.js` (one word +
cite) + one-word comment repairs in `js/detect.js`,
`js/dogmove.js`, `js/pager.js`. Test:
`scripts/maketrap-ftrap-order.test.mjs`.

## Intent vs deliverable

Promise: JS appended `level.traps` but C head-inserts
`gf.ftrap`, so hallu trap-fake appearances were assigned in
reverse order (outer-swap of 3); `push` → `unshift`. Claimed:
95311 → PASS. Diff actually does: exactly that. Match.

## Inventory

- `maketrap` (js/trap.js) — changed: `push` → `unshift` under
  `if (!oldplace)`; oldplace keeps position
  (`:581–585` sokoban arm preserved). C `trap.c:455–588`
  (csym): `:577–579` `ttmp->ntrap = gf.ftrap; gf.ftrap = ttmp`
  under `!oldplace`. Mechanism: `display_trap_map :978–979`
  (read) walks `gf.ftrap` newest-first into per-fake
  `sense_trap` + positional display-RNG picks — full reversal of
  3 = outer swap, middle fixed, exactly the measured symptom.
- No new helpers, imports, deletes, or re-points — nothing for
  `sym.mjs`.

## C ↔ JS fidelity

The insertion arm is now C-exact, including the oldplace
exception (verified in JS: unshift only under `!oldplace`;
focused test pins order + oldplace-position). Creation sequence
and every RNG draw are untouched — only stored order changes, so
behavioral deltas are confined to iteration-order effects. I
re-checked the D-log's consumer survey on the live tree: t_at
(one trap/cell — order-free); deltrap splice (order-preserving);
`set_wportal` (js/mklev.js:18886 — first-match walk, now
newest-first ≡ C `mkmaze.c:1800–1809`, verified); count_traps/
existential/bones/per-cell/per-trap walks (order-free by
construction). The array is the live structure (`ntrap` stays
null for array traps; the `game.ftrap` chain is legacy —
pre-existing duality, untouched). Real flagged divergence (not
this SHA's): C `restore.c:1149–1160` (read) head-inserts each
trap as read, so post-restore C order is oldest-first while JS
deserTraps preserves file order — a `restore.c` function with a
save-compat design question, named in the D-log, unobserved by
any probe (bounded by the 0-worse rescores + manual 44/44). No
RNG; none added. Gap: none in this SHA.

## Hallucinations / overclaim

None. The D-3437 "whole vs C" audit miss is owned honestly, and
the restore-order divergence is disclosed with its C cite and
design constraint instead of being buried — the opposite of
overclaim.

## Density

Cliff-phase: head writer correct (insertion arm the swapped
cells name; getpos/sense_trap/map_object verified C-exact and
untouched). One arm, whole. Ledger: `maketrap ported`. Verify
bullet: 1 PASS + REACH-OK ×2 + green + strict + cohort + manual
full 44/44 (fortress, incl. hallu + save/restore) + neighbor
suites 10/10. Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify getpos,maketrap --base a73eaef26~1
--reach-all` → `verify getpos: 1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (95311 PASS), smoke 24/24
REACH-OK ×2; maketrap vacuous at baseline (as the D-log says).
Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
