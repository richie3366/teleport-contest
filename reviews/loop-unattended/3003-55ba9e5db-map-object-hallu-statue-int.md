# Review 3003 — 55ba9e5db — map_object's hallucinated-statue memory carries C's int

- SHA: `55ba9e5db` (cliff; 2 reserve owner-null sweep rows, 199 screens;
  writer display.c map_object)
- D-entry: D-4163; Ledger: map_object ported
- `js/` diff: display.js +7 −1

## Intent vs deliverable

Promise: under Hallucination, C remembers a statue as
`levl[x][y].glyph = random_obj_to_glyph(newsym_rn2)`, a real object int
(or a body int for a random CORPSE). show_map_spot keeps a remembered
object through `^F` / magic mapping by testing that int. The JS memory
record for this arm had no `glyph`, so newsym painted NO_GLYPH into the
gbuf, and the next mapping wiped the remembered objects to floor.

Diff: the CORPSE sub-arm gets `glyph: mnum + GLYPH_BODY_OFF`; the other
sub-arm gets `glyph: objnum_to_glyph(otyp)`. The promise matches the diff.

## Inventory

- map_object — display.js:2575 (C display.c:332–366); Hallu+STATUE arm
  only changed.
- Used, unchanged: objnum_to_glyph display.js:1032 (`onum + GLYPH_OBJ_OFF`,
  C display.h:638).

## C ↔ JS fidelity

C display.h:933–936:

```c
#define random_obj_to_glyph(rng) \
    (((go.otg_temp = random_object(rng)) == CORPSE)     \
         ? (random_monster(rng) + GLYPH_BODY_OFF)       \
         : (go.otg_temp + GLYPH_OBJ_OFF))
```

`random_object(rng)` is `rng(NUM_OBJECTS - FIRST_OBJECT) + FIRST_OBJECT`
(display.h:187) and `random_monster(rng)` is `rng(NUMMONS)` (:186). The
JS arm draws the same two display-RNG calls in the same order, and now
stores the same ints: body offset for CORPSE, `otyp + GLYPH_OBJ_OFF`
otherwise. A random STATUE gets the plain object int, not a statue-bank
int. That matches C, which does not use obj_to_glyph here.

The non-Hallu arm right below already carried `glyph`, so every
map_object memory write now holds an int. The D-log names a side effect:
newsym's memory paint now takes the attribute from glyph_bank_attr (plain
object bank) instead of the legacy `objpile` flag. That is C's behaviour
for this int: random_obj_to_glyph never yields a piletop offset.

Pre-existing, not this diff: the gate reads `game.u?.Hallucination`
(a flat mirror) rather than the youprop macro. It is the same read as at
the parent, and the sessions agree.

## Hallucinations / overclaim

None.

## Density

Two lines that fix a writer the measurement named (temp show_map_spot +
show_glyph_cell stack logs). Right-sized.

## Verification

Both rows are owner-null reserve rows, so `verify --fn` has nothing
blocked, and the full rescore carries reserve rows without re-running
them. I replayed them directly at HEAD:

```text
frozen/ps_test_runner.mjs .cache/hidden/sessions/<id>.session.json
  scen-sweep-Barbarian-50055075  PASS 1954/1954  rng 78601/78601
  scen-sweep-Caveman-49950025    PASS 1758/1758  rng 47816/47816
```

This reproduces the claim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
