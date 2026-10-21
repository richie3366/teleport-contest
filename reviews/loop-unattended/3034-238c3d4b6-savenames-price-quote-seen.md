# Review 3034 — 238c3d4b6 — savenames/restnames round-trip the price-quote memory

- SHA: `238c3d4b6` (cliff; board row doclassdisco,
  scen-town-Tourist-630002 s228 = segment 2 s21, C «potion (murky) {buy
  250}» vs JS «potion (murky)»)
- D-entry: D-4194; Ledger: savenames ported, restnames ported
- `js/` diff: o_init.js +13

## Intent vs deliverable

Promise: o_init.c savenames/restnames write and read each `objects[i]`
whole through `Sfo_objclass`/`Sfi_objclass` (`:387–389`, `:421–423`).
That includes this variant's `oc_{sell,buy}_{min,max}seen`
(objclass.h `:108–111`). JS saved only the shuffle/discovery fields.

Diff: savenames emits the four fields per entry. restnames copies each
one back when the key is present (`!= null`). The promise matches the
diff. The owner doclassdisco is the painter. The writer is the
save/restore pair, and the D-log names it.

## Inventory

- savenames — o_init.js:365–391 (C o_init.c:374–407).
- restnames — o_init.js:404–437 (C o_init.c:410–437).
- No helper is added or deleted.

## C ↔ JS fidelity

C `:387–389` / `:421–423` loop `Sfo_objclass(nhfp, &objects[i], …)` /
`Sfi_objclass`, which is the whole struct in the historical format. So
the JS question is whether every **mutable** objclass member
round-trips. I walked the struct (objclass.h:47–112):

- Mutated at runtime: oc_name_known, oc_encountered, oc_uname
  (discovery/naming); oc_descr_idx, oc_color, oc_tough, oc_material
  (o_init shuffle); oc_prob (gem probabilities); the four `*seen`
  fields (shk.c record_price_quote). All are now in the JS record.
- Static on both ends: oc_name_idx, oc_merge, oc_uses_known, oc_magic,
  oc_charged, oc_unique, oc_nowish, oc_big, oc_dir, oc_subtyp, oc_oprop,
  oc_class, oc_delay, oc_weight, oc_cost, oc_wsdam/wldam, oc_oc1/2,
  oc_nutrition. These come from the fresh table, as before.

The D-log's "Named omissions: none" therefore holds. The uname loop
(`:394–406`, `:424–430`) was already folded per entry. The
PRICE_MIN_INIT sentinel 0xffffffff is an exact JSON number. A save
without the keys keeps the fresh unseen values, which is a compatible
reading of older JS saves and changes no C behaviour.

## Hallucinations / overclaim

None. The claim that the recorder uses historical whole-struct I/O
rests on sfstruct.c, as the D-log says, and the PASS of the two-segment
session confirms it.

## Density

Two 4-field additions on the writer. Right-sized.

## Verification

```text
verify doclassdisco,savenames,restnames --base 238c3d4b6~1 --no-reach
  doclassdisco: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                (scen-town-Tourist-630002: PASS)
  savenames, restnames: 0 blocked (vacuous)
```

This reproduces the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
