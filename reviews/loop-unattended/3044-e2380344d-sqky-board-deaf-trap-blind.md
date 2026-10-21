# Review 3044 — e2380344d — sqky_board witness reads Deaf(), three trap.c Blind reads read Blind()

- SHA: `e2380344d` (cliffs head, owner trapeffect_sqky_board:
  scen-sweep-Tourist-51650001 step 609)
- D-entry: D-4204; Ledger: trapeffect_sqky_board, trapeffect_arrow_trap,
  trapeffect_rocktrap, fall_through ported
- `js/` diff: trap.js +6 −5

## Intent vs deliverable

Promise: trapeffect_sqky_board's monster arm chooses its witness message
on the hero's Deaf macro (`:1445–1457`). JS tested the sticky
`game.u.Deaf`, which nothing writes, so a hero deafened by the HDeaf
timeout still heard the squeak. The file's three sticky `u.Blind` reads
(arrow trap, rock trap, fall_through) move to Blind() as well.

Diff: `!game.u?.Deaf` → `!Deaf()`; arrow trap `!u.Blind` and rock trap
`!(u.Blind || u.ublind)` → `!Blind()`; fall_through's `const Blind`
local is removed, and its one use calls `Blind()`. The promise matches
the diff.

## Inventory

- trapeffect_sqky_board — trap.js:4200 (C trap.c:1403–1476).
- trapeffect_arrow_trap — `:2585` (observe_object after place_object).
- trapeffect_rocktrap — `:4143`.
- fall_through — `:4293` (`Blind && Levitation && !Sokoban` early
  return, C `:609`).
- Callees: trap.js file-local Blind() `:4988` and Deaf() `:4993`, both
  pre-existing and already used by the file's other sites. No symbol
  deleted (the removed `const Blind` is a block local).

## C ↔ JS fidelity

C `:1447–1457`:

```c
if (in_sight) {
    if (!Deaf) { … «A board beneath %s squeaks %s loudly.»; seetrap(trap); }
    else if (!mindless(mtmp->data))
        pline_mon(mtmp, "%s stops momentarily and appears to cringe.", …);
} else { … You_hear("%s squeak %s.", …); }
wake_nearto(mtmp->mx, mtmp->my, 40);
```

- youprop.h Deaf = `HDeaf || EDeaf || u.uroleplay.deaf`. JS Deaf()
  reads those three plus the dead `u.Deaf`. That matches C and is the
  measured fix (HDeaf 7 at the failing squeak).
- The out-of-sight You_hear arm has no Deaf test in C. JS has none
  either, and You_hear handles deafness itself. Same.
- Blind sites: JS Blind() = `u.Blind || u.ublind || ((HBlinded ||
  EBlinded) && !BBlinded)`, a strict superset of the old reads, so no
  previously-blind case flips to sighted. It still lacks C's
  Blindfolded / `!haseyes` / Eyes-of-the-Overworld terms. That is the
  repo-wide Blind clone family, named in the D-log and not this row.
- No RNG on any changed test: observe_object and the messages draw
  nothing, and the RNG order is unchanged.

## Hallucinations / overclaim

None. «nothing writes u.Deaf» holds on HEAD: the only `u.Deaf` reads
left in trap.js are Deaf()'s own fallback term and the comment.

## Density

Four reads in one C file, one measured falsifier. Right-sized.

## Verification

```text
verify trapeffect_sqky_board,trapeffect_arrow_trap,trapeffect_rocktrap --base e2380344d~1 --no-reach
  trapeffect_sqky_board: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-sweep-Tourist-51650001: PASS
  arrow_trap, rocktrap: 0 blocked (vacuous)
```

D-log: reach REACH-OK ×4, green 2/2, strict ×2, cohort 7/7, full 44/44,
sweep 677 baseline-PASS 0 regressed.

## Actionable C-wrongs

None. The Blind clone family is ledger/map debt across 26 clones, not a
C-wrong of this diff.

Verdict: **ACCEPT**
