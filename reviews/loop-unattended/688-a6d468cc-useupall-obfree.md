# Review 688 — a6d468cc — invent.c useupall / shk.c obfree (D-1727)

## Metadata
- Full / short hash: `a6d468cce8483702098297381cf0cbf89744d6e6` / `a6d468cc`
- Parent: `a0c81cc6` (D-1726). This file audits **this SHA only** (second of nine `js/` commits since review **686**). Archive **Addressed:** D-1727 `a6d468cc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 10:04:17 +0200
- D-id: **D-1727**
- Stats: `js/shk.js` +140/−4; `js/invent.js` +18/−1; eat/apply/potion/timeout/zap/write/mkobj clone re-points. Total `js/` insertions **175** <250. Band **150–350**.
- Claims to close: Open `useupall` / `obfree` after D-1713 / review **674** FIRST_OBJECT skip. Not `observe_object`. Not full `dealloc_obj`. `reviews/loop-2026-08-15/` has no unpaid useupall Must-fix. Review **675** billed `billobjs` dummies — this SHA feeds that chain from `obfree(!merge)`.
- JS / map: `invent.js` `useupall`; `shk.js` `obfree` / `delete_contents`. `c-js-map/turns.md`.
- Prior: none written that Keep’d a useupall C-wrong; map-driven after splice clones.

## Intent vs deliverable

Git subject promises: a whole stack is `setnotworn`+`freeinv` then billobjs or merge-bquan, instead of invent splice / write no-op.

`node scripts/csym.mjs useupall` → `invent.c:1311–1317`. `--callers useupall`: `invent.c:1331` `useup`; `eat.c:2426`; `zap.c:2613` `backfire`; `apply.c:1463`; `potion.c:2432`/`:2570`; `timeout.c:1462`/`:1642`; `mkobj.c:1682`; `write.c` does **not** call `useupall` — it calls `useup(paper)` (`write.c:231`/`:278`/`:335`/`:349`/`:355`) which is invent.c `useup` `:1320–1333` → `useupall` when `quan==1`. `obfree` `shk.c:1186–1275`. `--callers obfree` includes `invent.c:944` `merged`, `shk.c:1181` `delete_contents`, `write.c:259`/`:280`/`:337`/`:350`. `food_disappears` `eat.c:395–403`. `book_disappears` `spell.c:644–652`. `maybe_reset_pick` `lock.c:268–285`. `delete_contents` `shk.c:1174–1183`. `dealloc_obj` `mkobj.c:2744–2811`. `carried` `obj.h:332` (`where==OBJ_INVENT`). `next_shkp` `shk.c:215–231`.

```1311:1333:nethack-c/upstream/src/invent.c
void
useupall(struct obj *obj)
{
    setnotworn(obj);
    freeinv(obj);
    obfree(obj, (struct obj *) 0); /* deletes contents also */
}

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

Parent: eat.js spliced invent; write.js `obfree` was `void obj`; zap/apply/potion/timeout had setnotworn+splice subsets; `merged` never called `obfree`. The diff **does** export canonical `useupall` and C-order `obfree`/`delete_contents`; re-points eat `useup` quan==1, zap `backfire`, apply candle/`useup_apply`, potion mix, timeout burn-carried, mkobj `merged`, invent_merged, litter boulder. It **does not** re-point `write.js` `useup(paper)` (still invent-splice at quan==1). D-log “eat.js / write.js clones retired” is **false for write `useup`**. It **does not** port full `dealloc_obj`. Named. It **does not** replace `useupall_gamestate` (tutorial stash). Named. It **does not** import zap.js `delete_contents` / apply `obfree_fig` / timeout `obfree_hatch`. Named only for zap `delete_contents`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `useupall` | LIVE new | `invent.js`; 3 C callees |
| `obfree` | LIVE new | `shk.js`; write.js import (was no-op) |
| `delete_contents` | LIVE new | recursive `obfree(curr,null)` |
| `food_disappears` | CLONE first body in shk.js | C `eat.c:395–403`. Do **not** add eat.js #2 |
| `book_disappears` | CLONE first body in shk.js | C `spell.c:644–652`. Do **not** add spell.js #2 |
| `maybe_reset_pick` | CLONE first body in shk.js | `reset_pick` LIVE import. Do **not** add lock.js #2 |
| `o_unleash` / `setnotworn` / `reset_pick` | LIVE import | existing edges |
| `onbill` / `next_shkp` / `shop_keeper` / `add_to_billobjs` / `oid_price_adjustment` | LIVE same-file | pre-existing |
| `Has_contents` / `Is_container` / `has_omid` / `OMID` | LIVE `const.js` | |
| `dealloc_obj_free` | CLONE subset | timers + `OBJ_DELETED`; not full `dealloc_obj` |
| `dealloc_obj` | STUB `mklev.js:1197` | pre-existing. Do **not** add #2 |
| `useupall_gamestate` | OMIT named | `do.js:950` tutorial stash |
| `write.js` `useup` | STUB in a live C caller | splice; not invent.c `useup` |
| `delete_contents` zap.js | CLONE leftover | named |
| `obfree_fig` / `obfree_corpse` / `obfree_hatch` | leftover clones | files this SHA edited |

`node scripts/sym.mjs` (deleted clones → NOT FOUND; re-points):

```
useupall         js/invent.js:3944   sync
obfree           js/shk.js:3316   sync
delete_contents  js/shk.js:3299   sync
             !! ALSO 1 LOCAL CLONE(S)  js/zap.js:4705
food_disappears  NOT EXPORTED — 1 LOCAL  js/shk.js:3261  => Do NOT write clone #2.
book_disappears  NOT EXPORTED — 1 LOCAL  js/shk.js:3274  => Do NOT write clone #2.
maybe_reset_pick NOT EXPORTED — 1 LOCAL  js/shk.js:3287  => Do NOT write clone #2.
dealloc_obj      NOT EXPORTED — 1 LOCAL  js/mklev.js:1197  => Do NOT write clone #2.
dealloc_obj_free NOT EXPORTED — 1 LOCAL  js/shk.js:3232
o_unleash        js/apply.js:1441   sync  (+ eat.js clone — do NOT add #3)
reset_pick       js/lock.js:145   sync
setnotworn       js/do.js:450   sync
freeinv          js/invent.js:6142   sync
obj_stop_timers  js/mkobj.js:929   sync
useupall_apply / useupall_pot / useupall_burn / useupall_invent  NOT FOUND
useupall_gamestate NOT EXPORTED — 1 LOCAL  js/do.js:950
```

`--can`: `shk.js` already imported `apply.js` / `lock.js` / `do.js`; `invent.js` already imported `shk.js` / `do.js`; `mkobj.js` already imported `shk.js`. No new TDZ edge on those. `write.js` **gained** `import { obfree } from './shk.js'` (parent had no shk import). `obfree` is a function export (hoisted). A cycle is not a blocker; this is not a top-level TDZ read. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`useupall` (`:1311–1317`).** C `setnotworn`; `freeinv`; `obfree(obj, NULL)`. JS same three calls (`obfree(obj, null)`). `freeinv` already extracts, `where=OBJ_FREE`, `freeinv_core`, `update_inventory`. **Match the body.** No `rn2`.

**`useup` (`:1320–1333`).** C quan>1: `in_use=FALSE`, `quan--`, `weight`, `update_inventory`; else `useupall`. JS eat.js `useup` quan>1 decrement+weight (still no `update_inventory` — pre-existing) else `useupall` — **else branch matches**. apply `useup_apply` same. **write.js `useup` still splices invent at quan==1** and never calls `useupall`/`obfree`. C `write.c` `useup(paper)` is this invent function. Unpaid blank paper would C-path to `obfree(!merge)` → `add_to_billobjs`; JS drops the object off invent with no bill dummy. **C-wrong.** D-log “write.js clones retired” covers only the old `void obj` `obfree`, not `useup(paper)`.

**`obfree` prefix (`:1193–1204`).** C leash `o_unleash`; FOOD `food_disappears`; SPBOOK `book_disappears`; `Has_contents` → `delete_contents`; `Is_container` → `maybe_reset_pick`; BOULDER `next_boulder=0`. JS same order. **Match the prefix.** `food_disappears`: C `victual = zero_victual` then `obj_stop_timers` if `timed`. JS `context.victual = {}` + timers. **Match the two statements** (zero vs `{}` is the JS victual holder). `book_disappears`: book/o_id only. **Match.** `maybe_reset_pick`: C `container ? container==xlock.box : (!box || !carried(box))` with `carried` = `where==OBJ_INVENT`. JS invent `.includes(box)` (eat.js `carried` convention). Same for top-level invent; not a `where` field. Close enough; not Must-fix.

**Shop bill (`:1206–1262`).** C unpaid: `next_shkp(fmon, TRUE)` walk `onbill(..., TRUE)`; else `shop_keeper(*u.ushops)`. Then `onbill(..., FALSE)`. `!merge`: `useup=TRUE`, `unpaid=0`, globby `owt=OMID`, `add_to_billobjs`, **return**. Merge: `bpm` missing → `impossible` return; else `bpm.bquan += bp.bquan`, `billct--`, `*bp = bill_p[billct]`. Else not-on-bill: maybe donate `o_id` via `oid_price_adjustment`. JS idx `next_shkp` (pre-existing fmon-array analogue of `shk.c:215–231` including ANGRY `rile_shk`); same bill math (`bill[i] = bill[billct]` after decrement). **Match the bill arms.** No extra `rn2`.

**Worn + dealloc (`:1263–1274`).** C `owornmask` → `impossible` + `setnotworn`; then `dealloc_obj`. JS same sanity then `dealloc_obj_free`: `obj_stop_timers` if timed, `where=OBJ_DELETED`, `nobj=null`. C `dealloc_obj` also panics on nobj/cobj/not-FREE, drops LS_OBJECT lights, thrownobj/kickedobj/tin, splitobjs, lua_ref → LUAFREE, else `objs_deleted` queue. **Named omit** of that rest. The timers+DELETED subset is a verified CLONE of the always-on timer + mark-deleted steps, not a `TODO` no-op. Do **not** stamp “Match C `dealloc_obj`.”

**`delete_contents` (`:1174–1183`).** C `while (cobj) { extract; obfree(curr, NULL); }`. JS same. **Match.** Recursive via `Has_contents` inside `obfree`.

**`merged` (`invent.c:944`).** C `obfree(obj, otmp)` after extract. JS mkobj `merged` and invent_merged now call `obfree(obj, otmp)` with `where=OBJ_FREE` / `nobj=null` so dealloc does not see INVENT. invent_merged is still a thin quan+flags merge (no age/lights/worn/globby/pline). Pre-existing; this SHA only added the C `obfree` tail. Not “Match C whole `merged`.”

**Callee closure (`useupall`).** LIVE: `setnotworn`, `freeinv`, `obfree`. STUB: **none** in the helper. **Callee closure (`obfree`).** LIVE: `o_unleash`, `delete_contents`, `Has_contents`, `Is_container`, `onbill`, `next_shkp`, `shop_keeper`, `add_to_billobjs`, `oid_price_adjustment`, `setnotworn`. CLONE matched here: `food_disappears`, `book_disappears`, `maybe_reset_pick`, `dealloc_obj_free` subset. OMIT named: full `dealloc_obj`. STUB in a **C caller this SHA edited**: write.js `useup` — **not** LIVE `useupall`. Combined-arm: “canonical helper ported, write.c `useup` still splice” is the miss.

## Hallucinations / overclaim

Subject “instead of invent splice / write no-op”: **true for `obfree(new_obj)`**; **false for `useup(paper)`**. D-log “eat.js / write.js clones retired”: **true for eat `useupall` and write `obfree` no-op**; **false for write `useup`**. Do **not** stamp “Match C `write.c` `useup(paper)`.” Do **not** stamp “Match C `dealloc_obj`.” Do **not** stamp “Match C invent.c `merged` body.” Do **not** stamp “Match C `useupall_gamestate`.” Journal “fortress held” is not an unpaid-marker proof. Public sessions **rarely** hit shop `useupall`; canary was node ONBILL + merge `billct`. Admit public-unhit for write-on-blank and glob bill merge.

## Density

§2b: C `useupall` + callee `obfree` (caller/callee cluster). +175. Retired four named `useupall_*` clones plus write `obfree` no-op. Did not glue full `dealloc_obj` / `delobj` / yn_function_menu. Did **not** finish the write.c `useup` call sites in a file this SHA already opened — that is the miss, not a density overshoot.

## Verification

D-log: save-oracle skip (untagged `invent.c:useupall`); node unpaid → `OBJ_ONBILL` + merge `billct`; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. write.c `useup(paper)` **unhit** by that canary. Admit that.

## Actionable C-wrongs

1. **`write.c` `useup(paper)` still local invent-splice.** C `:231`/`:278`/`:335`/`:349`/`:355` call invent.c `useup` `:1320–1333` (`quan>1` decrement+`update_inventory`, else `useupall` → `obfree`). JS `write.js:242–252` decrements or `invent.splice` with no `setnotworn`/`freeinv`/`obfree`. One port: replace that helper with invent.c `useup` (import `useupall`; quan>1 keep `weight`+`update_inventory`). Do **not** add `food_disappears` #2. Do **not** add `dealloc_obj` #2 in mklev. Do **not** re-port D-1713 FIRST_OBJECT skip. Named leftovers (map, not this Must-fix): full `dealloc_obj`; `delobj` extract-only; zap `delete_contents` clone; `useupall_gamestate`; apply `obfree_fig` / timeout `obfree_hatch` / zap `obfree_corpse`.

Verdict: **QUALITY-RISK**
