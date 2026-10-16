# Review 2855 — a01cb7062 — adjabil dual-store strip; Ranger group-map diagnosed and parked

## Metadata

- SHA: `a01cb7062abc14a9b83b21aee005f064227547f5` (D-4011)
- Cliff writer: `dosounds` head @e3b40271d (2 blocks); Knight
  writer `adjabil` ported, Ranger writer parked
- js/ diff: `js/attrib.js` +31/-8 (map + dual-write arms);
  `js/makemon.js` comment-only park pointer
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: (a) adjabil gains/loses dual-write the flat `u[prop]`
and `uprops[idx].intrinsic`, since `Fast()`/`Searching()` read
both — the lose arm printed "You feel slow!" while leaving
FROMEXPER set (Knight FULL PASS); (b) the Ranger group-map port
proved then reverted on hallu display-stream regressions,
parked with proof.

Diff actually: the map + arms + makemon comment. Promise == diff.

## Inventory

- `ADJABIL_UPROPS` (`js/attrib.js:1032`): flat→index map, all 12
  table props.
- `adjabil` (`js/attrib.js:1086`, C
  `nethack-c/upstream/src/attrib.c:1005-1074` via `csym.mjs`):
  merged prev, dual-write store, message gates on `nv`.

## C ↔ JS fidelity

- C `:1038-1065` read in full: single-long `prevabil`; gain
  `|= (mask|FROMOUTSIDE)` at ulevel 1 else `|= mask` with the
  `!(abil & INTRINSIC & ~mask)` gainstr gate; lose `&= ~mask`
  with the `!(abil & INTRINSIC)` losestr/`less` gate;
  `postadjabil` iff changed. JS mirrors every operator with
  `nv`; `store()` writes both mirrors so the desync that caused
  the cliff heals on first touch. All 12 table props across the
  role/race tables are exactly the map's keys (enumerated); the
  index constants were already imported — no new edge.
- Premise verified first-hand: `Fast()` / `Searching()`
  (`js/attrib.js:1166/1177`) OR flat `H*` with
  `uprops[idx].intrinsic/extrinsic` — the lose arm's flat-only
  write really did leave the live bit. C callers (exper.c:229,
  :355, polyself.c:364, u_init.c:999) match the D-log's four.
- makemon.js hunk is comment-only (park pointer + blank-line
  removal); zero behavior change, as claimed. `sym.mjs` N/A —
  no symbol deleted or re-pointed.

## Hallucinations / overclaim

None. The revert is reported with its regression IDs, and the
Ranger no-movement is parked, not sold as progress.

## Density

Cliff commit: dosounds was the generated head (verified
`e3b40271d:LOOP-QUEUE.md` row 1); whole-function port + honest
park; `Ledger:` entries for both functions. No FORCE/DIAG/seed
reads; Rule #2 clean (see 2853).

## Verification

Re-measured on HEAD code, `--base a01cb7062~1 --no-reach`:

- `verify dosounds: 2 PASS, 0 moved past, 0 unchanged, 0 worse`
  — Knight PASS is this SHA; Ranger PASS arrived via later
  work (parked here, healed since). No regression.
- `verify adjabil`: vacuous (owner is dosounds) — expected.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
