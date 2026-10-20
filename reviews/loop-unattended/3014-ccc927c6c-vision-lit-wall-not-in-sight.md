# Review 3014 — ccc927c6c — vision_recalc's lit-wall arm takes C's goto not_in_sight

- SHA: `ccc927c6c` (cliff; scen-chain-Healer-50950082 global s661,
  owner-null row, 7 screens lost)
- D-entry: D-4174; Ledger: vision_recalc ported
- `js/` diff: vision.js +13 −7

## Intent vs deliverable

Promise: in vision_recalc's main loop, a lit door/wall/SDOOR that blocks
sight is in sight only when the square in front of it, toward the hero,
is lit. Otherwise C does `goto not_in_sight` (`:784`), which newsyms a
spot that was in sight. JS had no else there, so a ghost drawn in the
wall stayed painted after the hero stepped into a dark corridor.

Diff: the not_in_sight body becomes a per-row closure, called from the
final else (unchanged behaviour) and from a new else on the lit-wall
test. The promise matches the diff.

## Inventory

- vision_recalc — vision.js:1242 (C vision.c:740–838, the per-row
  column loop of the main recalc): one local closure, one new else, the
  old final else now calls the closure.

## C ↔ JS fidelity

C (vision.c:758–785, :821–836):

```c
if ((IS_DOOR(lev->typ) || lev->typ == SDOOR || IS_WALL(lev->typ))
    && !viz_clear[row][col]) {
    dx = sign(u.ux - col); flev = &levl[col + dx][row + dy];
    if (flev->lit || next_array[row + dy][col + dx] & TEMP_LIT) { … }
    else goto not_in_sight;
} …
} else {
 not_in_sight:
    if ((old_row[col] & IN_SIGHT)
        || ((next_row[col] & COULD_SEE) ^ (old_row[col] & COULD_SEE)))
        if (col != 0) newsym(col, row);
}
```

The JS closure tests `(ov & IN_SIGHT) || ((nv & COULD_SEE) ^ (ov &
COULD_SEE))` with the `col !== 0` guard. Branch for branch, it is the
label body.

`nv` is captured at the top of the column iteration. On the goto path,
neither C nor JS has written `next_row[col]` yet: IN_SIGHT is set only
in the taken arm. So reading the captured value equals C's live read.

The other three arms (night/xray IN_SIGHT, the plain lit arm, waslit)
are untouched. The closure is per row and captures `row`, as C's newsym
does.

## Hallucinations / overclaim

None. "Named omissions: none in the changed arm" is accurate: this was
the only missing goto in the loop.

## Density

Thirteen lines for a measured missing branch, with the glyph state
(`typ` VWALL, remembered wall, displayed ghost, `cansee` false,
`couldsee` true) pinning it to `:784`. Right-sized.

## Verification

```text
verify vision_recalc --base ccc927c6c~1 --no-reach
  vision_recalc: 0 blocked (vacuous; the row was owner-null)
frozen ps_test_runner .cache/hidden/sessions/scen-chain-Healer-50950082
  PASS, 1086/1086 screens, 55142/55142 RNG
```

The owner-null claim reproduces by replay. The audit's full rescore
(every main-loop column now goes through the closure) shows 0 PASS→FAIL.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
