# Review 2867 — bf7208009 — gamestate enter calls live freeinv

## Metadata

- SHA: `bf7208009f3d21b0e8eeba2c7061b1c519cb242f` (D-4025)
- Cliff writer: level_tele row-4, worldtour-Barbarian-
  50458507 s419 (D-4024's measured Oracle residual)
- js/ diff: `js/do.js` +7/-9 (freeinv import + enter-loop
  swap); `scripts/gamestate-enter-carry-clear.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: the enter loop hand-shifted invent with `where =
OBJ_FREE`, skipping `freeinv_core` — a stashed artifact's
stale W_ART ESP kept sensing the Oracle. Call the live
`freeinv` export (extract + core + update_inventory) in C
order. s419 → s944.

Diff actually: import + 3-line swap. Promise == diff.

## Inventory

- `tutorial_enter_gamestate` (`js/do.js:1117`, mirror of C
  store arm `nhlua.c:1772-1782`): loop body now
  `setnotworn → freeinv → owornmask restore → unshift`.

## C ↔ JS fidelity

- C `:1775-1781` (read): `wornmask` save → `setnotworn` →
  `freeinv` → `owornmask` restore → prepend `gmst_invent`.
  JS is line-for-line that order (`unshift` = prepend).
- `freeinv` (`js/invent.js:9811`, read): array splice +
  nobj unlink (= `extract_nobj`), `pickup_prev=0`,
  `where=OBJ_FREE`, `freeinv_core`, `update_inventory`.
  Its per-item `update_inventory` adds no new behavior:
  `setnotworn` already ends with one (C `worn.c:182`,
  `js/do.js:555`).
- Loop soundness: `inv` is the live `game.invent`
  reference (`:1120`), and `freeinv` splices `inv[0]` —
  equivalent to the old `shift()`; terminates identically.
  (`game.invent` undefined → empty loop, as before.)
- `sym.mjs freeinv`: canonical export; 3 pre-existing local
  clones in other files untouched — this SHA correctly
  imports the export instead of adding clone #4.
  `imports.mjs --can do.js invent.js freeinv`: ALREADY, no
  new edge.

## Hallucinations / overclaim

None. The writer-leg note (50556042 leave/leash arm still
s1497) is disclosed in-commit as a named omission with its
ledger pointer, and re-measured below as unchanged — not
smuggled as movement.

## Density

Writer port on the live row with movement (+525 steps);
leave-arm obfree subset, update_inventory tail, and the new
auto_describe@944 owner all named. `Ledger:` nhlua row +
D-4025.

## Verification

Re-measured `--base bf7208009~1 --no-reach`: `verify
level_tele: 0 PASS, 1 moved past (419→944), 0 unchanged, 0
worse`; `verify nhl_gamestate: 0 PASS, 0 moved past, 1
unchanged (s1497), 0 worse`. Both claims exact.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
