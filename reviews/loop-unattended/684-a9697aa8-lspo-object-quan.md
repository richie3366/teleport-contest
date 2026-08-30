# Review 684 — a9697aa8 — sp_lev.c lspo_object non-merge quantity repeat (D-1723)

## Metadata
- Full / short hash: `a9697aa872859abacc229d64ce16656dab51f4f8` / `a9697aa8`
- Parent: `55932af9` (D-1722). This file audits **this SHA only** (seventh of nine `js/` commits since review **677**). Archive **Addressed:** D-1723 `a9697aa8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 08:51:26 +0200
- D-id: **D-1723**
- Stats: `js/mklev.js` +216/−42. Total `js/` insertions **216** <250. Band **150–350**.
- Claims to close: Open `lspo_object` non-merge `quantity` after D-1712 / review **673** (single `create_object`; minetn `placeObj` force-set `quan`). Not other `load_*` `des.object`. `reviews/loop-2026-08-15/` has no unpaid lspo quan Must-fix.
- JS / map: `mklev.js` `l_create_object` / `find_objtype` / `create_object`. `c-js-map/data.md`.
- Prior: **673** named the repeat loop; `create_object` already set quan only when `oc_merge`.

## Intent vs deliverable

Git subject promises: non-merge `quantity` repeats `create_object` (N objects), instead of one object after D-1712 `oc_merge`.

`node scripts/csym.mjs lspo_object` → `sp_lev.c:3556–3755`. Loop `:3725–3740`. `find_objtype` `:3467–3536` (`--callers` `:3543` `get_table_objtype`; string argc `:3602/:3615/:3629`). `get_table_objclass` `:3454–3464`. `get_table_objtype` `:3538–3547`. `create_object` `:2192–2440`; class-letter `:2220–2232`; quan-when-merge `:2298–2301`. `--callers lspo_object` is the lua registration decl only (not a C call site).

```3725:3740:nethack-c/upstream/src/sp_lev.c
    quancnt = (tmpobj.id > STRANGE_OBJECT) ? tmpobj.quan : 0;

    if (container_idx)
        tmpobj.containment |= SP_OBJ_CONTENT;

    if (maybe_contents) {
        lua_getfield(L, 1, "contents");
        if (!lua_isnil(L, -1))
            tmpobj.containment |= SP_OBJ_CONTAINER;
    }

    do {
        otmp = create_object(&tmpobj, gc.coder->croom);
        quancnt--;
    } while ((quancnt > 0) && ((tmpobj.id > STRANGE_OBJECT)
                               && !objects[tmpobj.id].oc_merge));
```

Parent: one `create_object`; class `oc_class||1`; no string argc; class-letter `mkobj_at(c)` not `def_char_to_objclass`; minetn `placeObj` then `otmp.quan=` even for non-merge; `tut1_object_quan` same force-set. The diff **does** the quancnt do-while, class/id rewrite, `find_objtype` (name then descr, ` of ` prefixes), argc string / string+coord / string+x,y, class-letter TOOL `'('` + `COIN` `mkgold`, minetn `placeObj = l_create_object`, tut-1 rocks via that path. It **does not** port other `load_*` `des.object`. Named. It **does not** port `get_table_int_or_random` `"random"` for `spe` (quantity `"random"` still becomes `-1`). Named-adjacent.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `l_create_object` | LIVE repaired | unpacked `lspo_object` |
| quancnt do-while | LIVE | C `:3736–3740`; `oc_merge_of(tmp.id)` |
| `find_objtype` | CLONE matched | static C; one local in mklev.js |
| `lspo_strcmpi` | CLONE | `strcmpi` ASCII fold; hacklib has no export |
| `get_coord_unpacked` | CLONE | C `get_coord` lua table |
| `get_table_xy_or_coord` | CLONE | C `:3649` analogue |
| `get_table_objclass_field` | CLONE | 1-char `"class"` else `-1` |
| `lspo_object_from_string` | CLONE | argc 1 / 2-coord / 3-xy |
| `lspo_object_normalize_table` | CLONE | table defaults |
| `create_object` class-letter | LIVE repaired | `def_char_to_objclass` / `mkgold` |
| `oc_merge_of` | LIVE import | D-1712; loop uses **template id** like C |
| `strstri` | LIVE import | hacklib; case-insensitive `" of "` |
| `def_char_to_objclass` | LIVE import | `objects.js:106` |
| minetn `placeObj` quan force | deleted | now `l_create_object` only |
| `tut1_object_quan` | LIVE repaired | `l_create_object`; origin via `splev_*` |
| other `load_*` `des.object` | OMIT named | still hand-rolled |
| `create_object` recharged/tknown/buried/Medusa/achievement | OMIT named | pre-existing |
| `is_multigen` / `is_poisonable` | OMIT named | |
| `get_table_int_or_random` spe `"random"` | OMIT named | quantity nil/`"random"` → `-1` matches C rndval |

`node scripts/sym.mjs`:

```
l_create_object  js/mklev.js:11741   sync
create_object    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11363
             => Do NOT write clone #2.
find_objtype     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11626
             => Do NOT write clone #2.
oc_merge_of      js/mkobj.js:1920   sync
def_char_to_objclass js/objects.js:106   sync
strstri          js/hacklib.js:217   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/attrib.js:305  js/write.js:90
mkgold           js/mkobj.js:2618   sync
mkobj_at         js/mkobj.js:1856   sync
mksobj_at        js/mkobj.js:1805   sync
```

`create_object` / `find_objtype` are C `staticfn` — one JS local is the port, not drift. Do **not** add `find_objtype` #2. Do **not** add `create_object` #2. Do **not** add `strstri` #3 in mklev (import is live). `--can js/mklev.js js/hacklib.js strstri` / `objects.js def_char_to_objclass` / `mkobj.js oc_merge_of`: **ALREADY**. Used inside functions, not TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**quancnt (`:3725`, `:3736–3740`).** C `(id > STRANGE_OBJECT) ? quan : 0` then `do { create; quancnt--; } while (quancnt > 0 && id > STRANGE_OBJECT && !objects[id].oc_merge)`. JS `(tmp.id > STRANGE_OBJECT) ? (tmp.quan | 0) : 0` and `!oc_merge_of(tmp.id)`. `STRANGE_OBJECT` is otyp 0. `quan === -1` → one create, `quancnt` goes negative, while false. Merge + `quan=3`: one create (D-1712 sets stack), while stops on `oc_merge`. Non-merge + `quan=3`: three `create_object` at the same coord. Loop tests **template id**, not `otmp.otyp` — C the same. **Match. No `rn2` in the loop.**

**Class/id rewrite (`:3663–3667`).** C `class==-1 && id>STRANGE` → `objects[id].oc_class`; else `class>-1 && id==STRANGE` → `id=-1`. JS the same; missing `oc_class` falls to `0` (C has no fallback; `0` is the `!c` RANDOM path). Parent used `|| 1`. **Match C better.** Class-letter then `id=-1` so quancnt is 0 — **one** random-class object, not N. C the same.

**`create_object` class-letter (`:2210–2232`).** C `!c` → `mkobj_at(RANDOM)`; `id != -1` → `mksobj_at`; else `def_char_to_objclass`; `MAXOCLASSES` panic; `COIN_CLASS` → `mkgold(0)`; else `mkobj_at(oclass)`. JS now that arm (`throw` analogue of panic). Parent `mkobj_at(c)` with a raw char code as oclass. **Match C.** `mkgold` already LIVE.

**quan-when-merge (`:2298–2301`).** Unchanged this SHA: `o.quan>0 && oc_merge_of(otmp.otyp)`. Non-merge repeats keep default `mksobj` quan (usually 1). **Match.**

**`find_objtype` (`:3467–3536`).** Empty/`null` → `STRANGE_OBJECT`. `def_char_to_objclass(oclass)` then `MAXOCLASSES→0`. `strstri(..., " of ")` then five prefixes `strncmpi` / JS `toLowerCase` slice; strip prefix; **name** loop with class filter; **descr** loop **without** class filter (C FIXME). Unknown → `nhl_error` / JS `throw`. Prefix order matches C. **Match.** `"oil lamp"` has no ` of `; name match. `'('` is argc string length 1, not this function.

**Argc string (`:3594–3631`).** C: 1 string; 2 string+coord table; 3 string+x,y. Length 1 → `class=*s`, `id=STRANGE`; else `class=-1`, `find_objtype(s,-1)`. `maybe_contents=0`. JS `typeof o==='string'` → `lspo_object_from_string`; `fn=null`. Number+number → xy; object with `lx` → croom (JS-only third-arg room); else coord unpack. **Match the three C overloads.** Lua contents function is table-only in C; JS string path drops `contentsFn`. **Match.**

**Table defaults.** C `quan=-1`, `spe=-127`, `trapped/locked=-1`, `lit=0`, `corpsenm=NON_PM`. JS `lspo_object_normalize_table`. `"class"` 1-char only (numeric JS `class` wiped to `-1` then filled from `oc_class` — C lua never has a numeric class field). `id` string → `find_objtype`; null → `STRANGE_OBJECT`. **Match the table form.** `get_table_int_or_random("quantity","random")` returns `-1`; JS non-number quan → `-1`. **Match quantity.** `spe:"random"` would not (loaders pass numbers). Named.

**minetn `placeObj`.** Deleted force-`quan`. Candles/rocks **merge** (D-1712 bits) → one stack via `create_object`. Wands in this loader have no `quan`. **Match C lua `des.object`.** Coordinates still packed `rx/ry` + `splev` origin from `splev_apply_centered_map`.

**tut-1 rocks.** `tut1_object_quan` now `l_create_object({id, rx:mx, ry:my, quan})`. `load_tut1` sets `game.splev_xstart/ystart` to the same pair previously added in `tut1_object`. ROCK **merges** → stack size, not N tiles. Parent force-set was the same outcome for merge. **Match origin + merge.** Comment claiming packed origin is true.

**Callee closure (lspo_object).** LIVE: `create_object`, `oc_merge_of`, `def_char_to_objclass`, `mkgold`, `mkobj_at`, `mksobj_at`, `strstri`, `lspo_object_apply_montype` (pre-existing). CLONE: `find_objtype`, argc/table helpers, `lspo_strcmpi` — verified against C here. OMIT named: other `load_*`; buried/Medusa/achievement/recharged/tknown; `is_multigen`. STUB in the **repeat** arm: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “non-merge quantity repeats create_object (N objects), instead of one object”: **true** on `l_create_object`. D-log canary LONG_SWORD×3 / WAN_LIGHT×2 / candle+dagger+rock stacks / `"oil lamp"` / `'('` TOOL: **private**, not public. Do **not** stamp “Match C every `load_*` `des.object`.” Do **not** stamp “Match C `get_table_int_or_random` for `spe`.” Do **not** stamp “Match C `tut1_object` (non-quan) via `l_create_object`” — that helper still `mksobj_at` + origin add. Journal “fortress held” is not a three-sword-tile proof. Public tut-1 rocks **are** merge stacks (seed0009). Non-merge N-object lua **public-unhit**.

## Density

§2b: one C `lspo_object` envelope (loop + find_objtype + argc + class-letter) that Open named after D-1712. Same `sp_lev.c:3556–3755`. +216. Did not glue other `load_*` or Medusa/achievement `create_object` omits. Did **not** add `find_objtype` #2.

## Verification

D-log: save-oracle skip (untagged `sp_lev.c:lspo_object`); private canary 16/16; focused seed0009 tut-1 rocks; green+strict seed8000/0900; CURRENT cohort **8**/8 + seed0360 minetn-1 + strict. Public **merge** quan (rocks/candles) **is** hit. Public **non-merge N objects** unhit except canary. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open loop matches C; remaining `des.object` loaders are named). Named: other `load_*` `des.object`; `create_object` recharged/tknown/buried/Medusa/achievement; `is_multigen`/`is_poisonable`; detect `sense_trap` Hallu quan; `spe:"random"`. Do **not** add `find_objtype` #2. Do **not** add `create_object` #2. Do **not** add `strstri` #3 in mklev. Do **not** restore minetn/`tut1_object_quan` force-`quan`. Do **not** `mkobj_at(c)` with a raw class letter. Do **not** treat class-letter `quan` as N objects (C quancnt 0). Do **not** filter descr matches by class (C does not).

Verdict: **ACCEPT-WITH-DEBT**
