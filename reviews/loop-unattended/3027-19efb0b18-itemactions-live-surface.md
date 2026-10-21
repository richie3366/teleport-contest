# Review 3027 — 19efb0b18 — itemactions names the engrave surface with the live surface()

- SHA: `19efb0b18` (cliff; board row itemactions,
  scen-extcmd-Ranger-51257069 s772, «Write on the stairs» vs «… on the floor …»)
- D-entry: D-4187; Ledger: itemactions (ledger note cleaned)
- `js/` diff: iactions.js +5 −8

## Intent vs deliverable

Promise: iactions.c itemactions builds the engrave row as
`"%s on the %s with %s"` with `surface(u.ux, u.uy)` (`:439–445`). JS
hard-coded "floor" because of a stale comment about "four always-floor
stubs", although the whole dungeon.c surface has been the sit.js export
since D-2008. The stale surface and cantwield omission notes are
removed.

Diff: `import { surface } from './sit.js'`, and the row text uses
`surface(u.ux, u.uy)`. The file header and the itemactions doc drop
both omissions. The promise matches the diff.

## Inventory

- itemactions — iactions.js:622–630 (C iactions.c:436–446).
- surface — sit.js:492, new import (C dungeon.c surface).

```text
surface          js/sit.js:492   sync
```

It is sync, so no await is owed inside the template string.

## C ↔ JS fidelity

C `:436–446`:

```c
} else if (otmp->oclass == WEAPON_CLASS || otmp->oclass == WAND_CLASS
         || otmp->oclass == GEM_CLASS || otmp->oclass == RING_CLASS) {
    Sprintf(buf, "%s on the %s with %s",
            (is_blade(otmp) || otmp->oclass == WAND_CLASS
             || ((GEM||RING) && objects[otmp->otyp].oc_tough)) ? "Engrave" : "Write",
            surface(u.ux, u.uy),
            (otmp->quan > 1L) ? "one of these items" : "this item");
```

JS has the same verb test, the live surface, and the same quantity
phrase. The preceding "Scribble graffiti on the floor" arm hard-codes
"floor" in C too, and JS keeps it.

Dropped "cantwield" omission: C `:608` is `if (otmp == uwep ||
cantwield(gy.youmonst.data))`. JS iactions.js:780–788 already
implements the skip (`nohands || verysmall`), so the old omission note
was false. Removing it is correct.

## Hallucinations / overclaim

None. The stale comment this commit removes was itself the
hallucination: it told later iterations not to use the real `surface`.

## Density

One import and one interpolation on the cliff owner. Right-sized.

## Verification

```text
verify itemactions,surface --base 19efb0b18~1 --no-reach
  itemactions: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  surface:     0 blocked (vacuous)
```

This reproduces the D-log (scen-extcmd-Ranger-51257069 PASS).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
