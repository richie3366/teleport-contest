# Review 2989 — 39b1f3c66 — MUSE_SCR_EARTH calls read.js's drop_boulder_on_*

- SHA: `39b1f3c66` (cliff; message owner ballfall → writer
  drop_boulder_on_player, 1 row)
- D-entry: D-4149; Ledger: drop_boulder_on_player ported;
  drop_boulder_on_monster ported
- `js/` diff: js/muse.js +3/−108, js/read.js +2/−2 (export)

## Intent vs deliverable

Promise: read.c has one drop_boulder_on_player and one
drop_boulder_on_monster, and muse.c's MUSE_SCR_EARTH calls them
(`:1927`, `:1933`). js/muse.js kept stale clones. They lacked the death
drain after the boulder `losehp`, the engulfed-hero You_hear arm, and
the full `Deaf` macro. A goblin's scroll of earth that killed the hero
ended the game silently.

Diff: both read.js functions are exported, the muse.js clones (−107
lines) are deleted, and MUSE_SCR_EARTH destructures them from `await
import('./read.js')` (read.js already imports muse.js). The promise
matches the diff.

## Inventory

- `use_offensive` MUSE_SCR_EARTH arm — muse.js:1078–1120; C muse.c
  `:1891–1937`.
- `drop_boulder_on_player` — read.js:1672; C read.c:2294–2338.
- `drop_boulder_on_monster` — read.js:1733; C read.c:2341–2410.

`sym.mjs` on the deleted / re-pointed symbols:

```text
drop_boulder_on_player js/read.js:1672   ASYNC — await required
drop_boulder_on_monster js/read.js:1733   ASYNC — await required
```

Each has one definition and no clone left. Both calls in the arm are
awaited.

## C ↔ JS fidelity

The arm, line for line against C :1905–1936: the canspotmon «The %s
rumbles %s %s!» (blessed → "around") / cansee «… in the middle of
nowhere!» + map_invisible, makeknown when oseen → `m_useup` before any
boulder ("could be fatal to monster") → the 3×3 loop with C's predicate
(isok, !closed_door, !IS_OBSTRUCTED, !IS_AIR, centre `!is_blessed` else
`!is_cursed`, not the hero's square) → `drop_boulder_on_monster(x, y,
confused, FALSE)` → `distmin == 1 && !is_cursed` →
`drop_boulder_on_player(confused, !is_cursed, FALSE, TRUE)`. The
arguments match the read.js signatures `(confused, helmet_protects, byu,
skip_uswallow)` and `(x, y, confused, byu)`.

The return differs slightly. C returns `DEADMONSTER(mtmp) ? 1 : 2`. JS
adds `if (gameover) return 1` first and tests `mhp < 1`, which is how C
defines DEADMONSTER. The gameover guard only matters after a fatal
`done()` that C would never return from. It is not observable.

The dynamic `import()` is a cycle workaround. `imports.mjs --rulecheck`
→ "Rule #2 clean". Per memory, js/ is one 82-module SCC, so a static
import would also have been legal unless the read happens at module top
level (TDZ). That is a style choice, not a C-wrong.

## Hallucinations / overclaim

None. The ledger now points both rows at read.js, removing the old
duplicate note.

## Density

A clone deletion (−107) that makes the writer live. That is the kind of
change the clone-drift memory asks for.

## Verification

```text
verify ballfall (--base 39b1f3c66~1): scen-chain-Archeologist-610102 PASS → PROGRESS
verify drop_boulder_on_player / drop_boulder_on_monster: 0 blocked
```

Exact match with the D-log (310/310).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
