# Review 2996 — 28f9d7a09 — newsym sees a dead monster still on the grid

- SHA: `28f9d7a09` (cliff; board head encumber_msg,
  scen-sweep-Rogue-51250033 s886; writer display.c newsym's m_at lookup)
- D-entry: D-4156; Ledger: newsym ported
- `js/` diff: js/display.js +11

## Intent vs deliverable

Promise: monstone makes the statue and calls `newsym(x, y)` before
`mondead`. The petrified monster (mhp 0) is still on
`level.monsters[x][y]`, and C m_at has no DEADMONSTER test, so newsym
draws the monster over its statue. While the hero hallucinates, that
display_monster spends one display-RNG `random_monster` draw. JS's
newsym lookup dropped every `mhp <= 0` monster, skipped the draw and
shifted every later hallucinated glyph. Diff: mon_at_display first
returns a dead monster that is still on the grid cell. The promise
matches the diff.

## Inventory

- `mon_at_display` — display.js:706–735 (static; the JS stand-in for
  newsym's `m_at`). `sym.mjs`: 1 def, not exported.
- C: mon.c monstone :3286–3373 (`if (cansee) newsym(x, y)` just before
  `mondead(mdef)`); rm.h m_at :515–516; display.c newsym `mon = m_at(x,
  y)`.
- level_mon_at (worm.js) is unchanged and keeps its `mhp <= 0` filter
  for its non-display callers.

## C ↔ JS fidelity

C `m_at(x, y)` is `level.monsters[x][y]` plus a `mx/my` check that
admits worm tails. Nothing tests hit points. A monster leaves the grid
only in remove_monster, which m_detach → mon_leaving_level runs inside
mondead. So between `mhp = 0` and m_detach, C's newsym sees the corpse
to be. That window is exactly monstone's newsym, and also any other
newsym a death path runs before mondead.

JS's new arm reads the grid map and returns a `mhp <= 0` cell under
these conditions: (a) not the steed, which C never places; (b) not
MON_OFFMAP, which JS sets where C's remove_monster leaves no grid entry;
(c) the cell is its own head or a worm cell. JS remove_monster deletes
the grid entry, so the arm stops matching at the same point C's does.
Live monsters fall through to the unchanged path. The fmon fallback
still skips the dead, which is right, because a monster that never
reached the grid is not in C's m_at either.

## Hallucinations / overclaim

None. The display-RNG measurement (streams equal through draw 167, then
C's lone `drn2(383)`) places the missing call before the statue triple,
and this fix adds exactly that call.

## Density

An 11-line fix to the C lookup semantics on a shared path, with a sweep
of 673 baseline PASS, 0 regressed (D-log).

## Verification

```text
verify encumber_msg,monstone,newsym --base 28f9d7a09~1 --no-reach
  encumber_msg: 1 PASS (scen-sweep-Rogue-51250033) → PROGRESS
  monstone: 0 blocked (vacuous)
  newsym: scen-symset-Rogue-50350015 still newsym @683 — NO MOVEMENT
```

The newsym row is not this SHA's claim. C prints the impossible
«newsym: attempting screen update for <0,0>» and JS prints nothing.
That is a pre-existing board row (owner newsym, other cause) and stays
in the cliffs block.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
