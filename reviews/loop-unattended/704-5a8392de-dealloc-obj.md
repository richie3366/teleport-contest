# Review 704 — 5a8392de — mkobj.c dealloc_obj / dobjsfree (D-1743)

## Metadata
- Full / short hash: `5a8392de5cc60bdf4a50f0f115c1ff13facf61dc` / `5a8392de`
- Parent: `3f9a8e48` (D-1742). This file audits **this SHA only** (fourth of nine `js/` commits since review **700**). Archive **Addressed:** D-1743 `5a8392de`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:28:56 +0200
- D-id: **D-1743**
- Stats: `js/mkobj.js` +133/−5; `js/light.js` +20/−1; `js/shk.js` +10/−22; `js/mklev.js` +6/−7; `js/allmain.js` +3/−1; `js/do.js` +3/−1; `js/save.js` +4/−1; `js/invent.js` comments. Total `js/` insertions **182** <250. Band **150–350**.
- Claims to close: Open `dealloc_obj` after D-1727 / reviews **688** and **696** (`obfree` ended in a timers+DELETED subset; mklev stub). Not `delobj`. Not `doseduce`. `reviews/loop-2026-08-15/` has no unpaid dealloc Must-fix.
- JS / map: `mkobj.js` `dealloc_obj`/`dobjsfree`/`dealloc_oextra`; `light.js` burn predicates; `shk.js` `obfree`; moveloop + JSON savelev. `c-js-map/data.md` + `turns.md`.
- Prior: **696** named full `dealloc_obj`. **688** named the same under `obfree`.

## Intent vs deliverable

Git subject promises: used-up objects stop timers, drop LS_OBJECT lights, clear thrown/kicked/tin/split, and queue OBJ_DELETED for dobjsfree instead of the `obfree` `dealloc_obj_free` subset after D-1727.

`node scripts/csym.mjs dealloc_obj` → `mkobj.c:2744–2811`. `--callers dealloc_obj`: 30 refs including `shk.c:1274` `obfree`, mklev ROCK/book/`mktrap_victim`, `save.c:810`. `dealloc_obj_real` `mkobj.c:2814–2827`. `dobjsfree` `mkobj.c:2830–2843`. `--callers dobjsfree`: `allmain.c:192`; `save.c:491` (savelev WRITING); `save.c:1139` (quit FREEING); `cmd.c:1033` `makemap_prepost`. `dealloc_oextra` `mkobj.c:95–111`. `obj_sheds_light` `light.c:762–767`. `obj_is_burning` `light.c:770–775`. `obj_extract_self` `mkobj.c:2556–2592` (`OBJ_FREE`/`LUAFREE`/`DELETED` no-op). `obj.h` `OBJ_LUAFREE` 8 / `OBJ_DELETED` 9.

```2744:2810:nethack-c/upstream/src/mkobj.c
    if (obj->timed)
        obj_stop_timers(obj);
    if (obj_sheds_light(obj)) {
        del_light_source(LS_OBJECT, obj_to_any(obj));
        obj->lamplit = 0;
    }
    if (obj == gt.thrownobj) gt.thrownobj = 0;
    if (obj == gk.kickedobj) gk.kickedobj = 0;
    if (obj == svc.context.tin.tin) { tin = 0; o_id = 0; }
    /* inline clear_splitobjs */
    if (obj->lua_ref_cnt) { obj->where = OBJ_LUAFREE; return; }
    if (!program_state.freeingdata) { queue OBJ_DELETED; }
    else dealloc_obj_real(obj);
```

Parent: `shk.js` `dealloc_obj_free` (timers + `OBJ_DELETED`, no queue/lights/globals); mklev `function dealloc_obj(_otmp) { /* stub */ }`. The diff **does** export C-home `dealloc_obj`/`dobjsfree`/`dealloc_oextra`, live burn predicates, re-point `obfree`/bill/`setpaid`/`update_bill` and mklev discards, drain the queue in `moveloop_core` and JSON `savelev`/`dosave0`, and make `obj_extract_self` a no-op on LUAFREE/DELETED. It **does not** port `delobj`→`obfree`. Named. It **does not** hook `cmd.c:1033` or `save.c:1139` FREEING. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dealloc_obj` | LIVE new export | C `:2744–2811` |
| `dealloc_obj_real` | LIVE local | C `:2814–2827`; poison ≡ `zeroobj`+`free` |
| `dobjsfree` | LIVE export | C `:2830–2843` |
| `dealloc_oextra` | LIVE export | C `:95–111` |
| `obj_sheds_light` / `obj_is_burning` | LIVE new | light.c; ignitable/artifact_light LIVE |
| `obj_stop_timers` / `del_light_source` | LIVE | |
| `obj_extract_self` LUAFREE/DELETED | LIVE repaired | C switch no-op |
| `hands_obj` | LIVE import | weapon.js sentinel |
| `obfree` tail | LIVE re-point | clone `dealloc_obj_free` **deleted** |
| mklev ROCK/book/`mktrap_victim` | LIVE re-point | stub **deleted** |
| `moveloop_core` `dobjsfree` | LIVE | C `:192` |
| JSON savelev WRITING / `dosave0` | LIVE analogue | C `save.c:491` |
| `dealloc_obj_free` | gone | `sym` NOT FOUND — do **not** write #1 |
| `delobj` | OMIT named | still extract-only |
| `makemap_prepost` / save FREEING `:1139` | OMIT named | |
| zap `delete_contents` clone / nhl leftover | OMIT named | |

`node scripts/sym.mjs` (re-point / delete required):

```
dealloc_obj      js/mkobj.js:2590   sync
dealloc_obj_real NOT EXPORTED — 1 LOCAL  js/mkobj.js:2564
dobjsfree        js/mkobj.js:2655   sync
dealloc_oextra   js/mkobj.js:2822   sync
dealloc_obj_free NOT FOUND in js/**
obj_sheds_light  js/light.js:96   sync
obj_is_burning   js/light.js:88   sync
obj_extract_self js/mkobj.js:2421   sync
obj_stop_timers  js/mkobj.js:931   sync
del_light_source js/light.js:73   sync
hands_obj        js/weapon.js:72   sync   export const
ignitable        js/timeout.js:529   sync
artifact_light   js/timeout.js:540   sync
free_omonst      js/mkobj.js:2794   sync
obfree           js/shk.js:3306   sync
```

`--can mkobj.js light.js obj_sheds_light`: ALREADY (pre-existing `del_light_source` edge). `--can light.js timeout.js ignitable`: **NEW-CYCLE** vs `timeout.js`→`light.js`; `export function ignitable` **function-hoisted — VERDICT SAFE** (read only inside `obj_is_burning`). `--can mkobj.js weapon.js hands_obj`: **NEW-CYCLE** vs `weapon.js`→`mkobj.js`; `export const hands_obj` is not a function, but the read is **inside `dealloc_obj`**, not a top-level TDZ load. SAFE. Other `--can` (mklev/allmain/do/save → mkobj): ALREADY. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Guards (`:2747–2763`).** C boulder `next_boulder=0`; already-DELETED `impossible`+return; not FREE/LUAFREE `panic`; `nobj`/`cobj` `panic`; `&hands_obj` `impossible`+return. JS the same returns/throws (`hands_obj` or `_hands`). Extra `if (!obj) return` is JS-only (C has no NULL). **Match the live checks.** `impossible` pline is unnamed small omit.

**Timers / lights (`:2766–2780`).** C `timed` → `obj_stop_timers`; `obj_sheds_light` → `del_light_source(LS_OBJECT, obj_to_any)` then `lamplit=0`. JS passes `obj` (existing LS id). `obj_is_burning` is `lamplit && (ignitable || artifact_light)`. JS `ignitable` matches `obj.h:397–402` (magic lamp needs `spe>0`). **Match.** No RNG in this arm.

**Globals / split (`:2782–2796`).** thrownobj / kickedobj / tin.tin+o_id / inline `clear_splitobjs` when `o_id` is parent or child. JS `game.thrownobj` / `game.kickedobj` / `game.context.tin` / `objsplit`. **Match.**

**Queue vs real (`:2798–2810`).** `lua_ref_cnt` → `OBJ_LUAFREE` return. Else if `!freeingdata` prepend `go.objs_deleted` with `where=OBJ_DELETED`; else `dealloc_obj_real`. JS `game.objs_deleted` / `program_state.freeingdata`. **Match.** `dealloc_obj_real`: C `dealloc_oextra` then `*obj=zeroobj; free`. JS `dealloc_oextra` then poison links/`where`/`timed`/`lamplit`/`quan`/`otyp`/`lua_ref`/`oextra`. **Match the JS free analogue.** `dealloc_oextra` drops oname / `free_omonst` / omailcmd then the bag — C’s three pointer fields. **Match.**

**`dobjsfree` (`:2830–2843`).** Drain, panic if not DELETED, `obj_extract_self`, `dealloc_obj_real`. JS throw + the same two calls. C `allmain.c:192` every turn before bypasses; JS `moveloop_core` the same slot. C `save.c:491` when WRITING and `objs_deleted`; JS `goto_level` `save_mode & WRITING` and `dosave0` (empty queue is a no-op). **Match those two.** `cmd.c:1033` and quit `save.c:1139` FREEING stay named (no binary savelev-freeing).

**`obj_extract_self` (`:2559–2563`).** C FREE/LUAFREE/DELETED `break`. JS early-return those `where` values so a queued object is not treated as floor. **Match C’s no-op.**

**Mklev discards.** C `mklev.c:1113/:1115/:1530/:1882` `dealloc_obj` on the losing spellbook, ROCK, unplaced victim gear. Parent stubbed. Now live. **Match those sites.**

**Callee closure (`dealloc_obj` / `dobjsfree`).** LIVE: `obj_stop_timers`, `obj_sheds_light` (body ports C), `obj_is_burning`, `ignitable`, `artifact_light`, `del_light_source`, `hands_obj`, `dealloc_oextra`, `free_omonst`, `obj_extract_self`. OMIT named: `delobj`; `makemap_prepost`; FREEING `:1139`; zap `delete_contents` clone; nhl leftover; remaining C-only callers (bones/pager/potion/trap/uhitm/u_init). STUB: **none**. Parent `dealloc_obj_free` / mklev stub are gone. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “stop timers, drop LS_OBJECT, clear thrown/kicked/tin/split, queue OBJ_DELETED”: **true**. D-log `obfree` + moveloop + JSON savelev: **true**. Do **not** stamp “Match C `delobj` `obfree`.” Do **not** stamp “Match C `makemap_prepost` / quit FREEING `dobjsfree`.” Do **not** stamp “Match C every `dealloc_obj` caller.” Do **not** stamp “Match C `zeroobj` every field.” Journal “fortress held” is not a lit-lamp-useup screen proof. Public sessions **thin** on queued DELETED; canary was node 26/26. Admit public-unhit for lua_ref / freeingdata.

## Density

§2b: C `dealloc_obj` + `dobjsfree` + the two light predicates + the JS clone/stub this helper replaced. +182. Did not glue `delobj` or `possibly_unwield` (next Open). Did **not** reopen D-1727 `useupall` / D-1735 `useup`.

## Verification

D-log: save-oracle skip (untagged `mkobj.c:dealloc_obj`); node 26/26 (lights, thrown/kicked/tin/split, lua_ref, hands_obj, oextra, obfree, freeingdata); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Lit-object dealloc **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the helper and the re-pointed `obfree`/mklev/moveloop/savelev arms match C; `delobj` is named). Named: `delobj` extract-only; zap.js `delete_contents` clone; nhl leftover; `makemap_prepost`; quit FREEING `:1139`; remaining C callers (bones/do_name/dokick/mkmaze/pager/potion/trap/u_init/uhitm); bypasses / resume_wish. Do **not** restore `dealloc_obj_free` or the mklev stub. Do **not** add `obj_sheds_light` #2. Do **not** read `hands_obj` at `mkobj.js` top level (const TDZ). Do **not** import timeout from light at top-level value. Do **not** hook binary savelev-freeing. Do **not** re-port D-1727 / D-1735.

Verdict: **ACCEPT-WITH-DEBT**
