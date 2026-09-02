# Review 696 — 8b2be954 — invent.c useup / write.c dowrite paper (D-1735)

## Metadata
- Full / short hash: `8b2be954259518a2386a0d955a4b1890e2ed3a1c` / `8b2be954`
- Parent: `5e25ac48` (audit #2140 / reviews **687–695**). This file audits **this SHA only** (first of five `js/` commits since review **695**). Archive **Addressed:** D-1735 `8b2be954`. Review **688** stamp already filled.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 12:11:36 +0200
- D-id: **D-1735**
- Stats: `js/invent.js` +19/−1; `js/write.js` +2/−15. Total `js/` insertions **20** <250. Band **150–350**.
- Claims to close: Must-fix review **688** (`write.c` `useup(paper)` still invent-splice). Not full `dealloc_obj`. `reviews/loop-2026-08-15/` has no unpaid `useup` Must-fix.
- JS / map: `invent.js` `useup`; `write.js` import. `c-js-map/turns.md`.
- Prior: **688** QUALITY-RISK Must-fix: write.js splice at quan==1 never called `useupall`/`obfree`.

## Intent vs deliverable

Git subject promises: `write.c` `dowrite` paper calls `useupall` when `quan==1`, instead of invent splice after D-1727.

`node scripts/csym.mjs useup` → `invent.c:1320–1333`. `--callers useup`: 95 refs; write.c `:231`/`:278`/`:335`/`:349`/`:355` are the Must-fix sites. `useupall` `invent.c:1311–1317`. `dowrite` `write.c:73–385`. `weight` `mkobj.c:1887–1976`.

```1320:1333:nethack-c/upstream/src/invent.c
void
useup(struct obj *obj)
{
    if (obj->quan > 1L) {
        obj->in_use = FALSE;
        obj->quan--;
        obj->owt = weight(obj);
        update_inventory();
    } else {
        useupall(obj);
    }
}
```

Parent: write.js local `useup` decremented or `invent.splice` (review **688** C-wrong). The diff **does** export C-home `useup` next to `useupall` and re-point write.js (delete local splice; import). It **does not** re-point eat.js hybrid / detect/potion/read/spell splice clones. Named. It **does not** port full `dealloc_obj`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `useup` invent.js | LIVE new | C `invent.c:1320–1333` |
| `useup` write.js local | deleted | splice gone; import LIVE |
| `useupall` | LIVE import/same-file | D-1727 |
| `weight` | LIVE import | mkobj.js; invent already imported mkobj |
| `update_inventory` | LIVE same-file | |
| `obfree` | LIVE | write.js still uses for `new_obj` fail; paper now via `useupall` |
| eat.js `useup` | CLONE hybrid | invent+`useupf` floor; **exported** #2 |
| detect/potion/read/spell `useup` | CLONE splice | same family as **688**; named |
| apply `useup_apply` | CLONE leftover | already `useupall` at quan==1 |
| zap/lock `useup_invent` | leftover splice | not this SHA’s write path |

`node scripts/sym.mjs` (deleted clone → invent export; remaining clones):

```
useup            js/eat.js:1037   sync
                 js/invent.js:3957   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/detect.js:175  js/potion.js:410  js/read.js:183  js/spell.js:579
useupall         js/invent.js:3944   sync
weight           js/mkobj.js:244   sync
update_inventory js/invent.js:3927   sync
obfree           js/shk.js:3316   sync
```

`--can write.js invent.js useup`: ALREADY. `--can invent.js mkobj.js weight`: ALREADY (added `weight` to existing mkobj import). No new TDZ edge. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`useup` (`:1320–1333`).** C `quan > 1L` → `in_use=FALSE`, `quan--`, `weight`, `update_inventory`; else `useupall`. JS `:3957–3966` `obj.quan > 1` then the same four mutations else `useupall(obj)`. No null guard (C has none; parent write.js had `if (!otmp) return` — deleted with the splice). No `rn2`. **Match the body.** Parent write `(quan \|\| 1) > 1` treated missing quan as decrement; C-home `quan > 1` sends quan==1/`undefined` to `useupall`. Paper stacks have `quan`.

```3957:3966:js/invent.js
export function useup(obj) {
    if (obj.quan > 1) {
        obj.in_use = false;
        obj.quan--;
        obj.owt = weight(obj);
        update_inventory();
    } else {
        useupall(obj);
    }
}
```

**`useupall` (`:1311–1317`).** Unchanged this SHA: `setnotworn`; `freeinv`; `obfree(obj, null)`. Quan==1 paper now reaches that. **Match.**

**`dowrite` paper sites.** C `useup(paper)` at novel tear-up `:231`, dry-marker scroll vanish `:278`, failed-write scroll `:335`, Blind fail `:349`, success `:355`. JS write.js `:381`/`:427`/`:463`/`:473`/`:478` call the imported helper. Spellbook dry/fail arms still leave the book (C does not `useup` those). Fail paths still `obfree(new_obj)` without merge. **Match the five paper calls.** `check_unpaid(pen)` remains deferred in write.js (pre-existing named; not this Must-fix).

```349:355:nethack-c/upstream/src/write.c
        useup(paper);
        obfree(new_obj, (struct obj *) 0);
        return ECMD_TIME;
    }
    useup(paper);
```

**Callee closure (`useup`).** LIVE: `weight`, `update_inventory`, `useupall` (`setnotworn`/`freeinv`/`obfree`). STUB in the helper: **none**. STUB in the **write.c caller this SHA edited**: **none**. Review **688**’s Must-fix is now LIVE. Not “dispatch ported, callee stubbed.”

**Leftover clones (named, not this arm).** eat.js `useup` is an exported hybrid: invent decrement without `in_use`/`update_inventory`, else `useupall`; floor goes `useupf`/`delobj`. Detect/potion/read/spell still splice at quan==1 (same unpaid-bill miss as **688**, other C files). Map named them. Do **not** add `useup` #3. Import invent’s export.

## Hallucinations / overclaim

Subject “write.c dowrite paper calls useupall when quan==1”: **true**. D-log “write.js import (local splice deleted)”: **true**. D-1727 D-log “eat.js / write.js clones retired” is **now true for write `useup`**; still false for eat export #2. Do **not** stamp “Match C all `useup` callers.” Do **not** stamp “Match C `dealloc_obj`.” Do **not** stamp “Match C eat.c `useup` / `useupf`.” Do **not** stamp “Match C `check_unpaid(pen)`.” Journal “fortress held” is not a write-on-blank screen proof. Public sessions **do not** hit unpaid blank paper; canary was node quan>1 + unpaid `OBJ_ONBILL`. Admit public-unhit.

## Density

§2b Must-fix: one item (review **688** write splice), not glued to Open. +20. C `useup` is 14 lines; the miss was the caller re-point. Did not glue full `dealloc_obj` / remaining splice clones / Protection sensed (next Open after this SHA).

## Verification

D-log: save-oracle skip (untagged `invent.c:useup`); node quan>1 decrement+`in_use` + unpaid quan==1 → `OBJ_ONBILL`; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. write-on-blank **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Keep’d write.c path matches C). Named: eat.js hybrid `useup`+`useupf` (do **not** add invent #3; eat may import invent for the carried arm); detect/potion/read/spell splice clones; apply `useup_apply` leftover; zap/lock `useup_invent` splice; full `dealloc_obj`; `delobj` extract-only; zap `delete_contents` clone; `useupall_gamestate`. Do **not** restore write.js invent-splice. Do **not** add `food_disappears` #2. Do **not** re-port D-1727 `useupall`/`obfree`.

Verdict: **ACCEPT-WITH-DEBT**
