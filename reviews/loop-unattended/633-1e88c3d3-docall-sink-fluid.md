# Review 633 — 1e88c3d3 — do_name.c docall sink-fluid / safe_qbuf (D-1672)

## Metadata
- Full / short hash: `1e88c3d3abfe98c3d29e11a4b5aac6918f1d9d30` / `1e88c3d3`
- Parent: `16fd4cbc` (D-1671). This file audits **this SHA only** (seventh of nine `js/` commits since review **626**). Archive **Addressed:** D-1672 `1e88c3d3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 18:12:51 +0200
- D-id: **D-1672**
- Stats: `js/do_name.js` +74/−21. Band **150–350** (`js/` insertions **74** <250; id >454).
- Claims to close: Open `docall` sink-fluid / `safe_qbuf` after D-1671. Not `undiscover_object`. Not `'o'` getobj. `reviews/loop-2026-08-15/` has no unpaid docall Must-fix.
- JS / map: `do_name.js` `docall` / `docall_xname`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **615** named pickup `safe_qbuf` (already D-1654); **621** named sink-fluid after `'o'`. Not **632**.

## Intent vs deliverable

Git subject promises: sink potions use OBJ_DESCR fluid prompt and other types use `safe_qbuf`, instead of concatenating Call+xname after D-0430.

Pinned C `docall` `:635–676` (`node scripts/csym.mjs docall`). `--callers`: `do.c:398`, `do_name.c:586/:751`, `fountain.c:647` (`fromsink=1`), `o_init.c:1201`, `potion.c:2780`. `docall_xname` `:604–633`. `carrying` `:1494–1504`. `obj.h:162` `#define fromsink corpsenm`. `OBJ_DESCR` `objclass.h:191`.

```646:652:nethack-c/upstream/src/do_name.c
    if (obj->oclass == POTION_CLASS && obj->fromsink)
        Sprintf(qbuf, "Call a stream of %s fluid:",
                OBJ_DESCR(objects[obj->otyp]));
    else
        (void) safe_qbuf(qbuf, "Call ", ":", obj,
                         docall_xname, simpleonames, "thing");
```

```674:675:nethack-c/upstream/src/do_name.c
    if (obj->where == OBJ_INVENT || carrying(obj->otyp))
        update_inventory();
```

Old JS: `Call ${docall_xname}:`; sink used `oc_descr||descr||'clear'`; `docall_xname` only BUC/`odiluted`; no `update_inventory`. The diff **does** `objectDescrs[oc_descr_idx]`, `safe_qbuf(..., 'thing')`, class/otyp fixups, invent carrying-walk + `update_inventory`. It **does not** port `undiscover_object` (NOT FOUND). Named. Removes the invented `'clear'` fallback.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `docall` | C `:635–676`, **LIVE this SHA** | |
| `docall_xname` | C `:604–633`, **LIVE this SHA** | local; **do not add #2** |
| `safe_qbuf` | C objnam D-1654, **LIVE** | first JS arg unused dest |
| `simpleonames` | C, **LIVE** | do not add clone #3 |
| `fromsink` | C `obj.h:162`, **CLONE** | `.fromsink` **or** `corpsenm===1` |
| `OBJ_DESCR` | C macro, **CLONE** | `objectDescrs[oc_descr_idx]` |
| `carrying` walk | C `:1494–1504`, **CLONE** inline | **do not add clone #5** |
| `discover_object` | C, **LIVE** | `(FALSE, TRUE, TRUE)` |
| `update_inventory` | C, **LIVE this SHA** | |
| `undiscover_object` | C `:666–668`, **OMIT named** | `sym.mjs` NOT FOUND |

`node scripts/csym.mjs docall` → `:635-676`. `docall_xname` → `:604-633`. `carrying` → `:1494-1504`. `--callers docall`: includes `fountain.c:647`. `--callers carrying`: includes `:674`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
docall           js/do_name.js:1371   ASYNC — await required
docall_xname     NOT EXPORTED — 1 LOCAL js/do_name.js:1333
             => Do NOT write clone #2.
carrying         NOT EXPORTED — 4 LOCAL dog/hack/quest/shk
             => Do NOT write clone #5.
undiscover_object NOT FOUND in js/**
             This index includes js/generated/. Do not add a local clone.
discover_object  js/invent.js:3397   sync
update_inventory js/invent.js:3523   sync
simpleonames     js/objnam.js:1945   sync
             !! ALSO 2 LOCAL CLONES — iactions.js pickup.js
```

`--can do_name.js invent.js update_inventory`: ALREADY. `--can do_name.js objnam.js safe_qbuf`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** invent `undiscover_object`. Do **not** add `carrying` #5.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

dknown / `flush_screen(1)`. **Match `:641–644`.**

Sink. C `POTION_CLASS && fromsink` with `fromsink` **aliased to `corpsenm`**. Fountain `otmp->fromsink = 1` (`:647`). JS `fromsink || (corpsenm|0)===1` plus fountain `.fromsink=1`. Empty `OBJ_DESCR` prints an empty `%s` (no `'clear'`). JS `objectDescrs[...]||''`. **Match `:646–648`.** Not Match a dedicated C bitfield (there isn’t one).

Else prompt. C `safe_qbuf(qbuf, "Call ", ":", obj, docall_xname, simpleonames, "thing")`. JS dest ignored, same prefix/suffix/funcs/`thing`. **Match `:650–652`.** Replaces concatenation. **Match C length fallback** (D-1654), not a new `safe_qbuf`.

`docall_xname`. C copy, `oextra=0`, `quan=1`, BUC 0, then weapon `opoisoned`, potion `odiluted` (C overlays `oeroded`; JS field), towel/statue `spe`, tin `known`, figurine `corpsenm=NON_PM`, iron ball `owt=oc_weight`, glob `owt=120`, `an(xname)`. JS the same chain. **Match `:604–633`.**

Name / disco. C `name_from_player` then `mungspaces`; empty + `had_name` → `undiscover_object`; else `dupstr` + `discover_object(..., FALSE, TRUE, TRUE)`. JS mungspaces inside `name_from_player`; empty arm **does not** undiscover (named); else `discover_object(otyp, false, true, true)`. **Match the discover call.** Not Match uncall disco removal.

Invent refresh. C `where==OBJ_INVENT || carrying(otyp)`. JS `OBJ_INVENT` or array/`nobj` walk of `gi.invent??invent`. **Match `:674–675` without `carrying` #5.**

Callee closure. LIVE: `safe_qbuf`, `simpleonames`, `xname`/`an`, `discover_object`, `update_inventory`, `name_from_player`. CLONE: `docall_xname` (matched here); `fromsink` overlay; carrying walk. OMIT named: `undiscover_object`. STUB: empty-uncall disco only. Combined-arm: sink/`safe_qbuf` LIVE; undiscover is a named Open of that arm, not this row’s identifier. “Dispatch ported, callee stubbed” is **false** for the prompt. Do **not** treat missing `undiscover_object` as a silent Match C uncall.

## Hallucinations / overclaim

Subject OBJ_DESCR fluid + `safe_qbuf`: **true** (canary booze/water; `'clear'` gone). D-log `docall_xname` fixups + `update_inventory`: **true**. Do **not** stamp “Match C `undiscover_object`.” Do **not** add `carrying` #5. Do **not** stamp “Match C `oc_descr` property” (it is `OBJ_DESCR` / `objectDescrs`). Public drinksink may hit; fortress does not prove shuffled descr vs the old `'clear'`.

## Density

+74: `docall` + `docall_xname` envelope. §2b one function family. Did not glue `distant_monnam`.

## Verification

Wired: sink OBJ_DESCR; `safe_qbuf` Call/:/thing; carrying walk; no `'clear'`. Unwired C: `undiscover_object`. Conf: no RNG. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the `'clear'` removal unless a session drinks a sink.

## Actionable C-wrongs

None for the Open identifier. Named (map, not Must-fix): `undiscover_object` / `gem_learned`; remaining `carrying` sites stay the four clones. Do **not** invent `undiscover_object`. Do **not** add `carrying` #5. Do **not** add `docall_xname` #2. Do **not** re-port `safe_qbuf` (D-1654). Do **not** re-port cmdq_pop (D-1671).

Verdict: **ACCEPT-WITH-DEBT**
