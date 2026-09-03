# Review 729 — 1fbbe0c0 — shk.c delete_contents zap poly_obj import (D-1770)

## Metadata
- Full / short hash: `1fbbe0c0f161c920c2c6390deccca84dbe751ce7` / `1fbbe0c0`
- Parent: `3baada67` (D-1769). Second of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:30:34 +0200
- D-id: **D-1770**
- Stats: `js/zap.js` +5/−16; `js/shk.js` +4/−2; `js/mkobj.js` +2/−1. Total `js/` insertions **11** <250. Band **150–350**.
- Claims to close: Open `zap.c` `delete_contents` clone after D-1756 / D-1727. Not trap chest. Not mklev `create_object`. `reviews/loop-2026-08-15/` has no unpaid delete_contents Must-fix. Review **717** named the zap clone.
- JS / map: `zap.js` `poly_obj` now imports `shk.js` `delete_contents`. `c-js-map/data.md` / `turns.md`.
- Prior: Review **717** ACCEPT-WITH-DEBT (`delobj`; zap clone named). Archive **Addressed:** D-1770 `1fbbe0c0`.

## Intent vs deliverable

Git subject promises: Match C `shk.c` `delete_contents` so zap `poly_obj` empties generated box contents via extract+`obfree`, instead of the zap.js unlink clone after D-1756.

`node scripts/csym.mjs delete_contents` → `shk.c:1174–1183`. `--callers delete_contents`: `objnam.c:5244`/`:5319`; `shk.c:1200` (`obfree`); `sp_lev.c:2344`; `trap.c:6370`; `zap.c:1829`.

```1174:1183:nethack-c/upstream/src/shk.c
void
delete_contents(struct obj *obj)
{
    struct obj *curr;

    while ((curr = obj->cobj) != 0) {
        obj_extract_self(curr);
        obfree(curr, (struct obj *) 0);
    }
}
```

Parent: `js/shk.js` already exported this body (D-1727). `js/zap.js` had a **local** `delete_contents` that walked `cobj = curr.nobj`, set `where=0`, recursed `Has_contents`, and **never** called `obj_extract_self` or `obfree`. `poly_obj` already invoked that name. The diff **does** import the shk export, delete the zap clone, and leave the `Has_contents(otmp)` call. It **does not** re-point trap.js / mklev.js / objnam. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `delete_contents` | LIVE import | shk.js D-1727; zap clone **deleted** |
| `obfree` | LIVE | callee of `delete_contents`; `Has_contents` recurses |
| `obj_extract_self` | LIVE | |
| `Has_contents` | LIVE const | `poly_obj` gate `:1828` |
| `poly_obj` caller | LIVE repaired | same site, live callee |
| `delete_contents_chest` | CLONE leftover | trap.js; extract + `quan=0`, **no** `obfree` |
| `create_object_delete_contents` | CLONE leftover | mklev.js; same skip |
| objnam empty/verysmall | OMIT named | `objnam.js` has **no** `delete_contents` |
| `obfree` `:1200` | LIVE already | parent |

`node scripts/sym.mjs` (deleted clone → import):

```
delete_contents  js/shk.js:3293   sync
obfree           js/shk.js:3311   sync
obj_extract_self js/mkobj.js:2461   sync
Has_contents     js/const.js:3140   sync
poly_obj         js/zap.js:4809   ASYNC — await required
delete_contents_chest NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/trap.js:5243
             => Do NOT write clone #2.
create_object_delete_contents NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11290
             => Do NOT write clone #2.
```

`--can zap.js shk.js delete_contents`: **ALREADY** (`obfree` was already imported). FORCE/DIAG/`getRngLog`/`fastforward`/seed names / coords: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No RNG in `delete_contents`. `poly_obj` fuse `rn2(1000)` is **after** this call in C and JS (unchanged).

## C ↔ JS fidelity

**`delete_contents` (`:1178–1181`).** While `cobj`: extract self, `obfree(curr, NULL)`. Nested boxes go through `obfree` → `Has_contents` → `delete_contents` again, not a hand-rolled recurse on the parent. JS shk export is that loop (`obfree(curr, null)`). Extra `if (!obj) return` is defensive. **Match.** The **deleted** zap clone was a C-wrong: unlink without `obfree` (no unpaid/`dealloc_obj`/timers/`food_disappears`). Retiring it is the Keep.

**`poly_obj` (`zap.c:1827–1829`).** After leash/`o_unleash` bookkeeping, before quan fuse: `if (Has_contents(otmp)) delete_contents(otmp)`. Comment “no box contents --KAA”. JS `:4901` the same, now the shk import. **Match the caller.** Fuse `!oc_merge || (can_merge && quan > rn2(1000))` stays after. **Match order.**

**`obfree` (`:1199–1200`).** `Has_contents(obj) delete_contents(obj)` still the shk body. `poly_obj` emptying the **new** object’s generated `mkbox_cnts` does not go through that arm of `obfree` on `otmp` itself; it calls `delete_contents(otmp)` directly so each content is extracted then `obfree`’d. Nested contents still hit `obfree`’s `Has_contents`. **Match.**

**Leftover clones (not this SHA’s claim).** `delete_contents_chest` and `create_object_delete_contents` still extract then `quan=0` / `OBJ_FREE` without `obfree`. C `trap.c:6370` and `sp_lev.c:2344` call the shk function. Those clones **diverge** from C. This commit **names** them. That is map debt, not a silent “Match C trap chest.” objnam `:5244`/`:5319` still have no JS call.

**Callee closure (`poly_obj` Has_contents arm).** LIVE: `delete_contents`, `obj_extract_self`, `obfree`. OMIT named: trap / mklev / objnam sites. STUB: **none** in the live arm. Not “dispatch ported, callee stubbed” **for zap**. The retired clone was the stub.

**What the zap clone did vs C.** While `cobj`: `obj.cobj = curr.nobj`, clear `ocontainer`/`nobj`, `where=0`, recurse `Has_contents`. No `obj_extract_self` (floor/invent/contained links), no `obfree` (leash/food/book/bill/`dealloc_obj`). Nested boxes were unlinked, not freed. `poly_obj` of a `mkbox_cnts` box therefore leaked unpaid timers. Importing shk is the Keep; leaving trap/mklev clones is honest naming.

## Hallucinations / overclaim

Subject / D-log “Match C `delete_contents`” for **zap `poly_obj`** is true: the callee is the shk export, extract+`obfree`. “instead of the zap.js unlink clone” is true (function deleted). Do **not** stamp “Match C `trap.c` chest `delete_contents`.” Do **not** stamp “Match C `sp_lev.c` `create_object` `delete_contents`.” Do **not** stamp “Match C objnam empty statue.” Journal “fortress held” is not a poly-box screen.

## Density

§2b: one C callee already live + the one caller whose clone contradicted it. +11 / net zap shrinkage. C helper is 10 lines; the work is clone deletion, not a new body. Below the usual ~40-insertion heuristic because **C is that small** and the clone was the whole omit. Did **not** glue trap chest / mklev / eat `useupf`. Did **not** invent a FAIL peel.

## Verification

D-log: save-oracle skip (untagged `zap.c:delete_contents`); node canary nested+`mkbox_cnts` `OBJ_DELETED` + `poly_obj` STRANGE_OBJECT empty LARGE_BOX/SACK; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Poly of a filled box **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (zap arm now LIVE extract+`obfree`; leftovers named). Named: `trap.js` `delete_contents_chest`; `mklev.js` `create_object_delete_contents`; objnam empty/verysmall. Do **not** restore the zap unlink clone. Do **not** write `delete_contents` clone #2 in trap/mklev — import `shk.js`. Do **not** skip `obfree` after extract. Do **not** re-port D-1727 `obfree` / D-1756 `delobj`.

C `shk.c:1178–1181` is extract then `obfree(curr, NULL)` in a `while (cobj)` loop — never a `quan=0` tombstone. C `zap.c:1827–1829` is the KAA “no box contents” gate on the **new** `otmp`, not the old `obj`. Other C callers (`trap.c:6370`, `sp_lev.c:2344`, `objnam.c:5244`/`:5319`, `obfree` itself at `:1200`) stay named. Do not add a third zap helper.

```1174:1183:nethack-c/upstream/src/shk.c
void
delete_contents(struct obj *obj)
{
    struct obj *curr;

    while ((curr = obj->cobj) != 0) {
        obj_extract_self(curr);
        obfree(curr, (struct obj *) 0);
    }
}
```

Verdict: **ACCEPT-WITH-DEBT**
