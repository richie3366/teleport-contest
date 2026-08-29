# Review 651 — 0458e7cc — objects.h oc_charged extract (D-1690)

## Metadata
- Full / short hash: `0458e7cc5251dca6ef3ffdd9a1e4317db0960fe2` / `0458e7cc`
- Parent: `658cd53c` (D-1689). This file audits **this SHA only** (seventh of nine `js/` commits since review **644**). Archive **Addressed:** D-1690 `0458e7cc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 23:16:14 +0200
- D-id: **D-1690**
- Stats: `js/generated/objects_data.js` +3/−1; `js/objnam.js` +10/−44; `js/mkobj.js` +4/−5; `js/u_init.js` +4/−8; `js/readobjnam.js` +26/−5; `js/zap.js` +3/−3; `js/shk.js` +2/−2; `js/do_wear.js` +2/−2. Total `js/` insertions **54** <250. Band **150–350**. Extractor `scripts/extract-objects.py` +5/−3 (not scored `js/`).
- Claims to close: Open `oc_charged` extract after D-1674 `oc_uses_known`. Not `oc_merge`. Not TIN/TOWEL/STATUE spe switch after wish clamp. `reviews/loop-2026-08-15/` has no unpaid charged-bit Must-fix.
- JS / map: extractor + `objects_data.js` `oc_charged`; `otyp_is_charged`; RING `mksobj_init` / `ini_inv_adjust_obj`; `readobjnam` non-wizard clamp. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **635** named next BITS after uskn.

## Intent vs deliverable

Git subject promises: doname, RING `mksobj_init`, starting-ring spe, and wish spe clamp read the extracted bit instead of a charged name-list.

`node scripts/csym.mjs` does not define `oc_charged` (field). `objclass.h:60` `Bitfield(oc_charged, 1)`. `mksobj_init` `mkobj.c:868–1175` RING `:1128–1148` (`--callers` `:1198`). `ini_inv_adjust_obj` `u_init.c:1206–1250` RING spe `:1238–1241` (`--callers` `:1353`). `doname_base` `objnam.c:1222–1751` implicit-uncursed `:1339`; RING `+spe` `:1500`; TOOL `goto charges` `:1480`. `readobjnam` `:4909–5400` clamp `:5094–5117`. `charge_ok` `read.c:688–724`. `drain_item` `zap.c:1381–1455` (`--callers` mhitm/mhitu/uhitm/zap). `maybe_destroy_item` `:5790–5954` AD_ELEC `:5868`. `gethungry` `eat.c:3162–3277` (`--callers` allmain `:354`, hack `:3056`) `!oc_charged` `:3248/:3263`. `is_weptool` `obj.h:249–250`. `Luck` `you.h:464`.

```1128:1136:nethack-c/upstream/src/mkobj.c
    case RING_CLASS:
        if (objects[otmp->otyp].oc_charged) {
            blessorcurse(otmp, 3);
            if (rn2(10)) {
                if (rn2(10) && bcsign(otmp))
                    otmp->spe = bcsign(otmp) * rne(3);
                else
                    otmp->spe = rn2(2) ? rne(3) : -rne(3);
```

```5094:5116:nethack-c/upstream/src/objnam.c
    if (d.spesgn == 0) {
        d.spe = d.otmp->spe;
    } else if (wizard) {
        ; /* no restrictions except SPE_LIM */
    } else if (d.oclass == ARMOR_CLASS || d.oclass == WEAPON_CLASS
               || is_weptool(d.otmp)
               || (d.oclass == RING_CLASS && objects[d.typ].oc_charged)) {
        if (d.spe > rnd(5) && d.spe > d.otmp->spe)
            d.spe = 0;
        if (d.spe > 2 && Luck < 0)
            d.spesgn = -1;
    } else {
```

Parent: dump omitted `charged`; `is_charged_otyp` OR’d WEAPON/WAND/named tools/six `RIN_*`. The diff **adds** `charged` as extract `r[20]` → `oc_charged`, deletes the name-list, points `otyp_is_charged` at the table, RING init + `ini_inv` at `objects[].oc_charged`, and ports the non-wizard wish clamp (`rnd(5)` / `Luck`). eat.js already read `oc_charged` (was always 0). It **does not** extract `oc_merge` or the TIN/TOWEL/STATUE spe `switch` after clamp. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `oc_charged` | LIVE table | extract JSON `charged` → row `[20]` |
| `otyp_is_charged` | LIVE | table read; was name-list |
| `is_charged_otyp` | deleted | |
| RING `mksobj_init` | LIVE | same `rn2`/`rne` envelope; predicate now C |
| `ini_inv_adjust_obj` | LIVE | `rne(3)` when charged && spe≤0 |
| `readobjnam` clamp | LIVE | `is_weptool` import; `Luck()` = `uluck+moreluck` |
| `charge_ok` / `recharge` | LIVE | already `otyp_is_charged` |
| `drain_item` / `maybe_destroy_item` | LIVE | drop name-list OR |
| `learnring` / `check_unpaid_usage` | LIVE | `oc.oc_charged` only |
| `gethungry` | LIVE | no eat.js hunk; field now nonzero |

`node scripts/sym.mjs`:

```
is_charged_otyp  NOT FOUND in js/**
otyp_is_charged  js/objnam.js:320   sync
is_weptool       js/wield.js:109   sync
             !! ALSO 10 LOCAL CLONE(S)
```

`--can js/readobjnam.js js/wield.js is_weptool`: ALREADY static. FORCE/DIAG/getRngLog/fastforward: none. Rule #2: extractor writes `js/generated/`; scored `js/` does not `fs`.

## C ↔ JS fidelity

BITS chrg in the dump sits after `uses_known` in JSON but packed at `r[20]` after `oc_uses_known` `r[19]` — same layout as uskn (D-1674). Sample rows: weapons/armor last `1`; six charged rings `1`; teleport/poly/hunger rings `0`; sack/lamp/food `0`; marker/bag-of-tricks/weptool `1`. Matches `objects.h` WEAPON/ARMOR `chrg=1`, RING `spec`, TOOL `chg`, WAND.

RING `mksobj_init` `:1129` vs JS `objs()[otmp.otyp]?.oc_charged` then unchanged `blessorcurse(3)` / `rn2(10)` / `rne` / `rn2(4)-rn2(3)` / curse. Uncharged curse list still by otyp (C `:1143–1146`). `ini_inv` `:1239–1241` `oc_class==RING && oc_charged && spe<=0` → `rne(3)`; JS uses `obj.oclass` (same object).

`doname_base` `:1339` / RING `:1500` / TOOL `:1480` now table-true for tools the name-list already covered and for any BITS-1 type it missed. Meat ring still `chrg=0` so FOOD `+spe` stays idle.

Wish: parent skipped non-wizard clamp for armor/weapon. This SHA adds C `:5099–5116` including weptool and charged rings. `rnd(5)` then `Luck<0` flips `spesgn`. Else wand/crystal `(n:-1)` cap and `spe = otmp.spe` max. `wizardMode()` is debug/wizard flags. `SPE_LIM` after sign. TIN/TOWEL/STATUE `switch (d.typ)` named.

`drain_item` `:1386–1388` `!oc_charged && not WEAPON/ARMOR/weptool`. `maybe_destroy` `:5868` `oc_charged && rn2(3)`. `gethungry` `:3248` `!oc_charged` now distinguishes +0 charged rings (no hunger) vs uncharged (hunger).

## Hallucinations / overclaim

Not “dispatch stubbed.” The bit is in the generated table. Overclaim would be `oc_merge` or full `readobjnam` spe `switch`. `is_weptool` still has a named-fallback clone in wield.js; clamp uses the export.

## Density

§2b: one BITS field + every consumer that used the name-list. Not a one-call peel.

## Verification

Journal: private canary (6 charged rings; WEAPON/ARMOR/WAND 1; lamp/sack/novel/Yendor/food 0; marker/BoT/weptool 1); green+strict seed8000/0900; cohort **9**/9 + strict. Public unhit for wish clamp (fortress). Adding `rnd(5)` on wished armor is C; wizard-seed path still skips via `wizardMode`.

## Actionable C-wrongs

None for Must-fix. Named (map): `oc_merge` extract; `readobjnam` TIN/TOWEL/STATUE/SLIME_MOLD spe after clamp; `is_weptool` name fallback. Do **not** restore `is_charged_otyp`. Do **not** skip `rnd(5)` on non-wizard armor/weapon.

Verdict: **ACCEPT-WITH-DEBT**
