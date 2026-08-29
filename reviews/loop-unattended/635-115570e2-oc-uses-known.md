# Review 635 — 115570e2 — objects.h oc_uses_known extract (D-1674)

## Metadata
- Full / short hash: `115570e20e4aa6d9cd8eda2de861ed0746baab33` / `115570e2`
- Parent: `39af0ea7` (D-1673). This file audits **this SHA only** (ninth of nine `js/` commits since review **626**). Archive **Addressed:** D-1674 (this commit fills `%h` `115570e2`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 18:31:09 +0200
- D-id: **D-1674**
- Stats: `js/generated/objects_data.js` +3/−1; `js/mkobj.js` +19/−10; `js/o_init.js` +2/−1; `js/objnam.js` +7/−24. Total `js/` insertions **31** <250. Band **150–350**. Extractor `scripts/extract-objects.py` is not scored `js/`.
- Claims to close: Open `oc_uses_known` extract after D-0316 class/name stand-in. Not `rename_disco` body. Not steal/muse callers. Not `oc_charged`/`oc_merge`. `reviews/loop-2026-08-15/` has no unpaid uskn Must-fix.
- JS / map: `objects_data.js` `oc_uses_known`; `mkobj.js` `unknow_object`; `objnam.js` `otyp_uses_known`; `o_init.js` dummy. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **634** named this row. Not **633**.

## Intent vs deliverable

Git subject promises: `unknow_object` and `rename_disco` dummy `known` use extracted BITS `uskn`, instead of a class/name stand-in after D-0316.

Pinned C `unknow_object` `:851–865` (`node scripts/csym.mjs unknow_object`). `--callers`: `mkobj.c:1192` (`mksobj`); `muse.c:181` / `:210`; `steal.c:664`; comment `:833`. `clear_dknown` `:835–848`. `rename_disco` `:1130–1206` dummy `:1198`. `ini_inv_adjust_obj` `:1206–1250` (`:1215–1216`). `objclass.h:53–56` `oc_uses_known`. `objects.h:42` `BITS(nmkn,mrg,uskn,…)`.

```851:864:nethack-c/upstream/src/mkobj.c
void
unknow_object(struct obj *obj)
{
    clear_dknown(obj); /* obj->dknown = 0; */
    obj->bknown = obj->rknown = 0;
    obj->cknown = obj->lknown = 0;
    obj->tknown = 0;
    obj->known = objects[obj->otyp].oc_uses_known ? 0 : 1;
}
```

```1198:1198:nethack-c/upstream/src/o_init.c
            odummy.known = !objects[dis].oc_uses_known;
```

Old JS: extractor dumped the C field then **dropped** it from rows; `uses_known_otyp` OR’d WEAPON/ARMOR/`is_charged_otyp`/TIN/EGG/uniques; `mksobj` inlined that; `rename_disco` `!ocl?.oc_uses_known` was always true (missing field). The diff **does** append `uses_known` as `r[19]`, map `oc_uses_known`, port `unknow_object`, and make `otyp_uses_known` a table read. It **does not** extract `oc_charged`/`oc_merge` or wire steal/muse. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `oc_uses_known` | C `objclass.h:53`, **LIVE this SHA** (table field) | not a JS function (`sym.mjs` NOT FOUND is expected) |
| `unknow_object` | C `:851–865`, **LIVE this SHA** | export `mkobj.js` |
| `otyp_uses_known` | JS reader of the bit, **LIVE this SHA** | was heuristic wrapper |
| `uses_known_otyp` | **deleted** | `sym.mjs` NOT FOUND — do not revive |
| `mksobj` | C `:1178+`, **LIVE** caller | `o_id` then `unknow_object` |
| `rename_disco` dummy | C `:1198`, **LIVE** (assignment already there) | now a real bit |
| `ini_inv_adjust_obj` | C `:1215–1216`, **LIVE via table** | body not rewritten; `otyp_uses_known` now C |
| `clear_dknown` | C `:835–848`, **LIVE** | `oc_merge` arm still named |
| steal/muse callers | C `:664` / `:181`/`:210`, **OMIT named** | `muse.js` comment “deferred” |
| `oc_charged` / `oc_merge` | C bitfields, **OMIT named** | |

`node scripts/csym.mjs unknow_object` → `:851-865`. `--callers`: `:1192` / muse / steal. `rename_disco` → `:1130-1206`. `ini_inv_adjust_obj` → `:1206-1250`. `clear_dknown` → `:835-848`.

RNG: none in `unknow_object`. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
unknow_object    js/mkobj.js:1676   sync
otyp_uses_known  js/objnam.js:367   sync
uses_known_otyp  NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
oc_uses_known    NOT FOUND in js/** (no export, no local function/const).
```

`--can mkobj.js objnam.js otyp_uses_known`: **ALREADY** (mkobj still imports objnam; this SHA **stopped** calling `otyp_uses_known` there). `--can u_init.js objnam.js otyp_uses_known`: **ALREADY**. Do **not** stamp “cycle-forced clone.” Do **not** revive `uses_known_otyp`. Do **not** add `oc_uses_known` as a function.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. Extractor is Python offline; scored `js/` only embeds the table.

## C ↔ JS fidelity

BITS layout. C `BITS(nmkn,mrg,uskn,ctnr,mgc,chrg,uniq,…)`. JS rows keep `r[0]…r[18]` as before and **append** `uskn` at `r[19]` (not insert after `name_known`). `oc_class`/`oc_name_known`/`oc_magic` indices unchanged. **Match the field without a tuple shift.**

Class macros (spot-check vs `createObjectsArray()`):

- `WEAPON` / `PROJECTILE` / `BOW`: uskn **1** (`objects.h:117–128`). `LONG_SWORD` → 1.
- `WAND`: uskn **1** (`:1447`). `WAN_LIGHT` → 1.
- `POTION` / `SCROLL`: uskn **0** (`:1123`, `:1184`). `POT_WATER` / `SCR_IDENTIFY` → 0.
- `FOOD(..., unk, …)`: `EGG`/`TIN` unk **1** (`:1052`, `:1117`); `APPLE`/`CORPSE` **0**. Table matches.
- `RING(..., spec, …)`: uskn **= spec** (`:738`). `RIN_ADORNMENT` spec 1 → 1; `RIN_REGENERATION` spec 0 → 0. Old heuristic treated charged-class rings as uskn; regeneration is **not**. **Match C, not the stand-in.**
- `TOOL(..., chg, …)`: uskn **= chg** (`:882`). `SACK` 0; `BAG_OF_TRICKS` 1.
- Uniques: `AMULET_OF_YENDOR` / `FAKE_…` / `BELL_OF_OPENING` / `CANDELABRUM` / `SPE_BOOK_OF_THE_DEAD` / `SPE_NOVEL` → 1. `SPE_DIG` (ordinary book) → 0.

`unknow_object`. C: `clear_dknown`; zero b/r/c/l/t known; `known = uskn ? 0 : 1`. JS the same (`objs()[otyp]?.oc_uses_known`). Extra `if (!obj) return`. **Match `:851–865`.** `clear_dknown` `oc_merge` still named (pre-existing D-0292).

`mksobj` order. C `:1187` `o_id = next_ident()` then `:1192` `unknow_object`. JS was `known` then `clear_dknown` then `o_id`. Now `o_id` then `unknow_object`. **Match `:1187–1192`.** `corpsenm` still in the JS literal (C sets it after); `unknow_object` does not touch it.

`rename_disco`. C dummy `known = !objects[dis].oc_uses_known`. JS `known: !ocl?.oc_uses_known` was always true; now the bit is 0/1. **Match `:1198`.** Body is D-1647; this SHA only makes the assignment C-true.

`ini_inv_adjust_obj`. C `:1215–1216` `if (objects[otyp].oc_uses_known) obj->known = 1`. JS already `if (otyp_uses_known(obj.otyp)) obj.known = 1`. The helper is now the table. **Match that `if`.** Do **not** stamp Match C `oc_charged` `rne(3)` / chaotic `opoisoned` (named / other arms).

`xname` unique leak. `clear_unique_known_leak` now tests `ocl.oc_uses_known` (same bit). **Match the C unique-known clear**, not a name list.

Callee closure. LIVE: table field, `unknow_object`, `mksobj` caller, dummy assignment, `otyp_uses_known` readers (`u_init` / objnam). CLONE: none new. OMIT named: steal/muse `unknow_object`; `oc_charged`; `oc_merge` in `clear_dknown`. STUB: **none** in the live `unknow_object` / dummy arms. Combined-arm: every C callee of `:864` / `:1198` is LIVE or named OMIT. “Dispatch ported, callee stubbed” is **false**. Deleted heuristic is gone (`uses_known_otyp` NOT FOUND).

## Hallucinations / overclaim

Subject “extracted BITS uskn”: **true** (canary polarity matches C macros). D-log “drop class/name stand-in”: **true** (`uses_known_otyp` deleted). Do **not** stamp “Match C steal.c / muse.c `unknow_object`.” Do **not** stamp “Match C `oc_charged` extract.” Do **not** stamp “Match C `clear_dknown` `oc_merge`.” Do **not** stamp “rewrote `ini_inv_adjust_obj` / `rename_disco`.” Fortress 44/44 does not prove a shuffled TIN dummy `#name` vs the old always-known dummy.

## Density

+31 JS + extractor: one bitfield family (`unknow_object` + dummy + table). §2b cluster. Did not glue remaining pushkeys. Did not invent `oc_charged`.

## Verification

Wired: `r[19]` uskn; `unknow_object` polarity; dummy `!uskn`; `otyp_uses_known` table; unique leak. Unwired C: steal/muse; `oc_charged`; `oc_merge`. Conf: no RNG. No seed gate.

D-log private canary (WEAPON/WAND/TIN/EGG/Yendor/novel =1; potion/scroll/apple/SPE_DIG/uncharged ring =0); green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2080** at this SHA: **44**/44. Public sessions do not prove `#name` disco dummy.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): steal.c / muse.c `unknow_object`; `oc_charged`; `oc_merge` in `clear_dknown`; remaining `ini_inv` `opoisoned`/charged-ring `rne`. Do **not** revive `uses_known_otyp`. Do **not** add `unknow_object` clone. Do **not** re-port `rename_disco` (D-1647). Do **not** re-port `distant_monnam` (D-1673).

Verdict: **ACCEPT-WITH-DEBT**
