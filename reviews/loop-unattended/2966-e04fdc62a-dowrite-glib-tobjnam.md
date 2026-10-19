# Review 2966 — e04fdc62a — dowrite's greasy-fingers drop: Tobjnam + fingers_or_gloves

- SHA: `e04fdc62a` (near-pass cliff; board owner `use_grease`, writer =
  write.c dowrite, from `cMsgOwners`)
- D-entry: D-4126; Ledger: dowrite ported
- `js/` diff: `js/write.js` +10/−14

## Intent vs deliverable

Promise: dowrite drops a magic marker from greasy fingers with
`Tobjnam(pen, "slip")` + `fingers_or_gloves(FALSE)`. JS printed
`doname(pen)` and a fixed "fingers", so «a magic marker (0:22) slips
from your fingers.» where C has «The magic marker slips from your
fingers.». Diff: the Glib arm uses live `Glib()`, `Tobjnam` and
`fingers_or_gloves`. The novel arm uses live `Hallucination()`. The
hold_another_object drop text is `The(aobjnam(new_obj, "slip"))`. The
local Blind clone is deleted for invent.js `Blind`. Promise = diff.

## Inventory

- `dowrite` — write.js:160–420; C write.c:73–385 (Glib :90–94, novel
  :~190, charge arms :269–281 / :316–330, drop :381–382).
- Live callees: `Glib` (potion.js:807, youprop.h `u.uprops[GLIB].intrinsic`),
  `Tobjnam` / `aobjnam` / `The` (objnam.js), `fingers_or_gloves`
  (do_wear.js), `Hallucination` (display.js:1367), `Blind` (invent.js:372).
- Deleted clone: write.js `Blind`. Its body was already C's macro, so this
  is a dedupe, not a behaviour change.

## C ↔ JS fidelity

```c
} else if (Glib) {
    pline("%s from your %s.", Tobjnam(pen, "slip"),
          fingers_or_gloves(FALSE));
    dropx(pen);
    return ECMD_TIME;
}
```

The JS line is that expression. Tobjnam gives «The magic marker slips»
(the(xname) + otense), with no doname charges, which is the measured
difference. `Glib()` reads the uprops slot, not the `u.Glib` flat. The
charge arms match C: the spellbook dry-out branch calls update_inventory
(C :275) and the scroll branch calls useup (:278), then «My Diary»
update_inventory (:327). The JS comments cite `:262` / `:283`, an older
numbering. Only the citations are stale, not the placement. The drop
string for hold_another_object is C :381's `The(aobjnam(new_obj,
"slip"))`. No RNG changed (rn1/rnl order untouched).

## Hallucinations / overclaim

None. Owner ≠ writer: the D-log says why the writer is dowrite (the
session applied a marker, and `cMsgOwners` lists write.c:91).

## Density

One arm, two mirror reads (Glib, Hallucination) moved to live props,
and the drop wording. All in one C function.

## Verification

```text
verify use_grease (--base e04fdc62a~1): 1 blocked
  scen-sweep-Wizard-50556038: PASS
verify use_grease: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify dowrite: 0 blocked (owner was use_grease)
```

The board owner's row passes on HEAD and matches the D-log's direct
`score --ids` (1038/1038).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
