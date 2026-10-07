# Review 2495 — 644849a84 — dog_goal portal union scan (D-3614)

- SHA: `644849a84ce67ed542d9b5cdae369109b8c89c5a`
- Subject: cliffs-head dog_move writer dog_goal: portal scan walked the dead
  game.ftrap chain (Caveman-94281 → PASS, Valkyrie-94361 → step 24) (D-3614)
- Type: cliff (1 C function), js +32/−7 in `js/dogmove.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: portal scan walks the doidtrap union (gf-store then level.traps,
deduped), first MAGIC_PORTAL decides with C's break; one-word export for the
test; Caveman PASS + Valkyrie moved. Diff delivers exactly that. Matches.

## Inventory

- `dog_goal` (`js/dogmove.js:661+`) — changed (portal arm + `export`). C:
  `nethack-c/upstream/src/dogmove.c:481-647` (`csym` range); portal block
  :596–601 read directly.
- No new/deleted symbols; no new imports.

## C ↔ JS fidelity

C :596–601 walks `gf.ftrap` via ntrap; the first MAGIC_PORTAL decides
(`distu <= 2` → appr=1, `break` either way — "assume at most one magic
portal per level"). JS now builds the union: array-shaped `game.ftrap` or
its ntrap chain, then `game.level.traps`, identity-deduped — then the same
first-portal `break` with `dist2(...) <= 2` (distu is the squared distance).
Store-split claim verified: `maketrap` pushes `game.level.traps`
(js/trap.js:1112) while fresh levels leave `game.ftrap` null (js/do.js:1971),
and the goto_level portal lookup (js/do.js:2085–2101) walks the same union —
so the old ftrap-only loop was blind exactly as diagnosed. Union order
(ftrap-store first) vs C's single chain only matters with two distinct live
portals, which C's one-portal assumption excludes; dedupe covers the shared
object. The appr=1 inference chain (rn2(4) drawn + invent scan drawn ⇒
stairs-false, DOGFOOD impossible for the feline ⇒ portal arm) is sound
elimination against C :578–601. `export` on the C-staticfn follows the
live-export precedent and changes no behavior. No RNG in the arm.

Cheat grep: clean (the temp DIAG probe was reverted; no residue in the
diff). Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. "D-3411's other dead-chain siblings intentionally untouched" is an
honest scope boundary, and no session blocks on those siblings in this
cliff. The Valkyrie landing (inuse_classify@24) is stated as a move, not a
PASS — and inuse_classify is indeed a generated-block row head afterward.

## Density

Cliff phase: owner dog_move → writer dog_goal from the divergence; one
function, whole portal arm, both probes moved. Per-function verdict:
dog_goal — ACCEPT.

## Verification

Re-measured myself: `verify dog_move,dog_goal --base 644849a84~1
--reach-all` → Caveman-94281 PASS, Valkyrie-94361 moved dog_move@21 →
inuse_classify@24; `1 PASS, 1 moved → PROGRESS`; reach dog_move 586/586,
reach dog_goal 566/566, 0 regressed. Matches the D-log exactly (my reach
ran the full spreads).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
