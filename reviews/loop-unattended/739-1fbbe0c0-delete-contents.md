# Review 739 — 1fbbe0c0 — shk.c delete_contents zap poly_obj import (D-1770)

## Metadata
- Full / short hash: `1fbbe0c0f161c920c2c6390deccca84dbe751ce7` / `1fbbe0c0`
- Parent: `3baada67` (D-1769). **Re-audit** of the same SHA previously filed as review **729** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:30:34 +0200
- D-id: **D-1770**
- Stats: `js/zap.js` +5/−16; `js/shk.js` +4/−2; `js/mkobj.js` +2/−1. Total `js/` insertions **11** ≤250. Band **150–350**. C helper is 10 lines; the Keep is clone deletion + import, not a new body.
- Claims to close: Open `zap.c` `delete_contents` clone after D-1756 / D-1727. Not trap chest. Not mklev `create_object`. Not objnam empty/verysmall. `reviews/loop-2026-08-15/` has no unpaid delete_contents Must-fix. Review **717** named the zap clone.
- JS / map: `zap.js` `poly_obj` now imports `shk.js` `delete_contents`. `c-js-map/data.md` / `turns.md`.
- Archive **Addressed:** D-1770 `1fbbe0c0`.

## Intent vs deliverable

Git subject promises: Match C `shk.c` `delete_contents` so zap `poly_obj` empties generated box contents via extract+`obfree`, instead of the zap.js unlink clone after D-1756.

`node scripts/csym.mjs delete_contents` → `shk.c:1174–1183`. `--callers delete_contents`: `objnam.c:5244`/`:5319`; `shk.c:1200` (`obfree`); `sp_lev.c:2344`; `trap.c:6370`; `zap.c:1829`; `extern.h:2918`.

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

**`delete_contents` (`:1178–1181`).** While `cobj`: extract self, `obfree(curr, NULL)`. Nested boxes go through `obfree` → `Has_contents` (`:1199–1200`) → `delete_contents` again, not a hand-rolled recurse on the parent. JS shk export is that loop (`obfree(curr, null)`). Extra `if (!obj) return` is defensive. **Match.** This SHA does not rewrite that body; it only consumes it from zap.

**The deleted zap clone was a C-wrong.** Parent `js/zap.js`:

```
while (obj?.cobj) {
    const curr = obj.cobj;
    obj.cobj = curr.nobj || null;
    curr.nobj = null;
    curr.ocontainer = null;
    curr.where = 0;
    if (Has_contents(curr)) delete_contents(curr);
}
```

No `obj_extract_self` (floor/invent/contained chains, `container_weight`, `freeinv`). No `obfree` (leash/`food_disappears`/`book_disappears`/unpaid bill/`dealloc_obj`/timers). Nested boxes were unlinked, not freed. `poly_obj` of a `mkbox_cnts` box therefore leaked unpaid/timer objects. Retiring that clone is the Keep, not a comment-only import.

**`poly_obj` (`zap.c:1827–1829`).** After leash/`o_unleash` bookkeeping, before quan fuse: `if (Has_contents(otmp)) delete_contents(otmp)`. Comment “no box contents --KAA”. JS `:4901` the same, now the shk import. **Match the caller.** Fuse `!oc_merge || (can_merge && quan > rn2(1000))` stays after. **Match RNG order.** `otmp` is the **new** polymorphed object; C empties its generated contents, not the old `obj`. JS the same.

**`obfree` (`:1199–1200`).** Still the shk body. `poly_obj` emptying the new object does not go through `obfree` on `otmp` itself first; it calls `delete_contents(otmp)` directly so each content is extracted then `obfree`’d. Nested contents still hit `obfree`’s `Has_contents`. **Match.** Double-delete is not a bug: after `delete_contents(otmp)`, `otmp.cobj` is empty, so a later `obfree(otmp)` `Has_contents` is false.

**Leftover clones (not this SHA’s claim).** `delete_contents_chest` (`trap.js:5243`) and `create_object_delete_contents` (`mklev.js:11290`) still extract then `quan=0` / `OBJ_FREE` without `obfree`. C `trap.c:6370` and `sp_lev.c:2344` call the shk function. Those clones **diverge** from C (no unpaid/timer/`dealloc_obj`). This commit **names** them. That is map debt, not a silent “Match C trap chest.” Clones that diverge from C are C-wrongs **in those files**; they are not this SHA’s live arm. objnam `:5244`/`:5319` still have no JS call.

**Callee closure (`poly_obj` Has_contents arm).** LIVE: `delete_contents`, `obj_extract_self`, `obfree`. OMIT named: trap / mklev / objnam sites. STUB: **none** in the live arm. Not “dispatch ported, callee stubbed” **for zap**. The retired clone was the stub.

**Density vs +11.** Playbook §2b: below ~40 insertions on a non-Must-fix port is a failed density handoff **unless C is that small**. C `delete_contents` is ten lines; the work is one live caller plus clone deletion. Consecutive Open `delete_contents` trap/mklev rows were correctly **not** glued (those clones are still wrong). Not a density fail.

## Hallucinations / overclaim

Subject “Match C `delete_contents`” is true **for zap `poly_obj`**. It is **not** true for trap chest or mklev `create_object` or objnam. D-log “named: trap.js / mklev.js” is honest. Review **729**’s ACCEPT-WITH-DEBT holds: this SHA does not leave a stub in the live zap arm. Do **not** stamp “every `delete_contents` clone is gone.” `sym.mjs` still reports the two leftover locals. Do **not** write clone #2 of either. Journal fortress PASS does not exercise box polymorph contents.

## Density

§2b: one C callee + the one live zap caller that used a diverging clone. +11 / net delete. Did **not** glue trap/mklev/objnam. Did **not** invent a FAIL peel. Did **not** add a third `delete_contents` clone.

## Verification

D-log: save-oracle skip (untagged `shk.c:delete_contents`); green+strict seed8000/0900; CURRENT cohort. Rule #2 clean. Box-poly `Has_contents` **public-unhit** (no public session polymorphs a generated box). Admit that. This re-audit re-reads pinned C against the hunks; it does not re-run those sessions for this SHA alone.

## Actionable C-wrongs

None for Must-fix (zap live arm matches C; leftovers named). Named: `trap.js` `delete_contents_chest`; `mklev.js` `create_object_delete_contents`; objnam empty/verysmall. Do **not** restore the zap unlink clone. Do **not** skip `obfree` after `obj_extract_self` in a live `delete_contents`. Do **not** recurse `Has_contents` on the parent instead of letting `obfree` do it. Do **not** write a third trap/mklev clone.

Verdict: **ACCEPT-WITH-DEBT**
