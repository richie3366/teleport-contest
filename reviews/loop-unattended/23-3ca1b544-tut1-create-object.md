# Review 23 — 3ca1b544 — tut-1 packed large-box contents / `create_object` (D-1062)

## Metadata
- Full / short hash: `3ca1b544ca8cb93d1916ce9f1c43b6a7be330a6e` / `3ca1b544`
- Parent: `a4860000` (reviews 21–22 ACCEPT; Must-fix empty; popped Open tut-1 large-box)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 04:45:18 +0200
- D-id: **D-1062**
- Stats: 10 files, +292 / −66 — `js/mklev.js` +228 (new `l_create_object` / `create_object` / `get_location_coord` / container stack; `load_tut1` box+wand only)
- Claims to close: Open queue tut-1 large-box contents only (not food / `place_lregion` / key / nhcore). Stamped **Addressed:** D-1062 `3ca1b544` on the archive row in the **next** SHA (`51b969b5` cadence) — hash present, not chicken-egg.
- JS / map: `mklev.js` `l_create_object` / `create_object` / `load_tut1`; `c-js-map/startup.md` names leftover `obfree` contents. Cadence **#1340** **44**/44 (`51b969b5`, docs-only; not a JS port).
- Docs-only since last `reviews/loop-unattended/` file: `51b969b5` score refresh only. No second JS SHA.

## Intent vs deliverable

Git subject promises: “Match C create_object so tut-1 packed large-box contents use DRY get_location and delete_contents.” Body: `load_tut1` used raw `rn2(sx/sy)` and `cobj=null`; nested wand now goes through `lspo_object`’s `container_obj` stack like C.

C `sp_lev.c:2193–2439` is `create_object`: `get_location_coord(DRY)`, `mksobj_at` / `mkobj_at`, spe/buc/erosion/lock/broken/trap, `SP_OBJ_CONTENT` extract+`add_to_container`, `SP_OBJ_CONTAINER` `delete_contents` then push, `stackobj` when not content. C `sp_lev.c:3557–3754` is `lspo_object` table form: class from `objects[id].oc_class`, `container_idx` → `SP_OBJ_CONTENT`, contents field → `SP_OBJ_CONTAINER`, `create_object`, Lua contents callback, `spo_pop_container`. C `dat/tut-1.lua:232–235` is a packed large box at `{41,6}` (`broken`, `trapped=false`) whose contents function is a **random-coord** wand of secret door detection (`spe=30`, `class="/"`).

The queue line was tut-1 large-box contents. The diff ships unpacked `l_create_object` used from `load_tut1` in place of `tut1_object` + raw `rn2` + `box.cobj=null`, and a `create_object` subset plus a `get_location_coord` wrapper over the existing random helpers.

It does **not** add Lua argc string/coord parse. Loaders pass unpacked `id` / `rx` / `ry` / `contentsFn`. Named. It does **not** rewire tower/medusa/`splev_create_object` / other `load_*` `des.object` (those still `cobj=null` or hand-rolled). Named. It does **not** port tut-1 food / `place_lregion` / `tut_key` / nhcore disable. Those remain Open. Food still `tut1_object` at `(50,3)`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `l_create_object` | C `lspo_object` table form, new JS | `sp_lev.c:3557–3754`; unpacked, not `lua_State` |
| `create_object` | C function, new JS subset | `sp_lev.c:2193–2439`; named omits listed on the function |
| `get_location_coord` | C function, new JS wrapper | `sp_lev.c:1337–1353`; packed add origin; random → existing helpers |
| `get_location_coord_random` | imported existing C-shaped helper | `sp_lev.c:1226–1252` + double-try `1351–1352`; **not new this SHA** |
| `get_location_random` | existing | 100 `rn2(sx)`/`rn2(sy)` + exhaustive; `NO_LOC_WARN` → `(-1,-1)` |
| `is_ok_location` | existing clone of `sp_lev.c:1280–1308` | DRY `SPACE_POS` + no boulder; skips C `Is_waterlevel` / `is_ok_location_func` |
| `spo_pop_container` | C function, new JS | `sp_lev.c:3040–3046` |
| `container_obj[]` / `container_idx` | C statics | `sp_lev.c:195–197`; JS module lets; **no** `sp_level_coder_init` zero (`6360–6362`) |
| `create_object_delete_contents` | **clone** of `shk.c:1175–1183` | extract + zombie; **not** `obfree` (`food_disappears` / `dealloc_obj` / timers) |
| `mksobj_at` / `mkobj_at` | imported C callees | `mkobj.c`; `init=TRUE` still runs `mkbox_cnts` |
| `obj_extract_self` | imported C callee | `mkobj.c:2557–2592`; CONTAINED + FLOOR |
| `add_to_container` | imported C callee | `mkobj.c`; merge walk then `OBJ_CONTAINED` |
| `stackobj` | imported C callee | `mkobj.c`; skipped when `SP_OBJ_CONTENT` |
| `bless` / `curse` / `uncurse` / `blessorcurse` | imported C callees | unused on tut-1 (`curse_state` 0) |
| `unbless` | **clone** (`mklev.js` local) | `mkobj.c` `unbless`; unused this path |
| `load_tut1` call | C `des.object` site | `tut-1.lua:232–235` |
| `tut1_object` | pre-existing clone | food / other loot **not** switched |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. `(41,6)` is the baked `tut-1.lua` coord already used by the previous `tut1_object`, not a public-trace hardcode. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/mklev.js` hunks: no trace-index gates, no recorded coordinates as control flow, no `fastforward` burns. Packed coords come from the embedded map loader, not a seed-shaped box. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Packed box origin — C `get_location` for `*x >= 0` does **not** test DRY

C `create_object` always:

```
get_location_coord(&x, &y, DRY, croom, o->coord);
```

Packed unpack (`sp_lev.c:1328–1332`) yields `c.x,c.y` from `SP_COORD_X/Y`. `get_location` (`1222–1224`):

```
if (*x >= 0) { /* normal locations */
    *x += mx;
    *y += my;
}
```

`mx/my` are `croom->lx/ly` or `gx.xstart/gy.ystart`. Humidity DRY is **not** consulted on this arm. Then (`1260–1268`): if `!(ANY_LOC)` and `!isok`, set `x_maze_max, y_maze_max`.

JS packed (`mklev.js:9925–9939`): `mx + rx`, `my + ry` from `croom.lx/ly` or `game.splev_xstart/ystart`; `!isok` → `X_MAZE_MAX, Y_MAZE_MAX`. `load_tut1` already set those origins (`splev_map_center_start`) before the loot block, same as D-1061 stairs. Previous raw call used `xstart+41, ystart+6`. Match for packed.

Tut-1 map row 6 col 41 is `'.'` inside the open hall (`tut-1.lua` map line y=6). `splev_chr2typ` `'.'` → `ROOM`. Packed `force` is a stairs thing; objects do not call `mkstairs`. The box sits on ROOM.

C random vs packed is `*x >= 0` only (`1222`). JS uses `rx < 0 && ry < 0`. Lua `lspo_object` never emits mixed coords: `ox==-1 && oy==-1` → `SP_COORD_PACK_RANDOM`, else `SP_COORD_PACK(ox,oy)` (`3657–3660`). Tut-1 box is packed both axes; wand is both −1. Match in this envelope. Do not treat mixed `rx` as a Must-fix.

### Nested wand — DRY `get_location_coord` double-try, call-for-call

C wand has no coord → `SP_COORD_PACK_RANDOM(0)` (`3657–3658`). `get_unpacked_coord` with flags 0 falls back to defhumidity DRY (`1325–1326`). `get_location_coord` (`1348–1352`):

```
get_location(x, y, c.getloc_flags | (c.is_random ? NO_LOC_WARN : 0), croom);
if (*x == -1 && *y == -1 && c.is_random)
    get_location(x, y, humidity, croom);
```

First try: DRY|`NO_LOC_WARN`. Random arm (`1226–1252`): `rn2(sx)` / `rn2(sy)` (or `somexy` in-room) until `is_ok_location`, 100 times, then exhaustive `xx,yy` scan. `NO_LOC_WARN` miss → `(-1,-1)`. Second try: DRY without `NO_LOC_WARN` → another 100 + scan, then `impossible` and maze-max.

JS wand defaults `rx=ry=-1` (`10056–10057`). `get_location_coord(DRY, null, -1, -1)` → `get_location_coord_random(DRY)` (`9772–9776`), which is that same pair of `get_location_random` calls. `get_location_random` (`9740–9762`) is the 100-try `rn2` + exhaustive + `NO_LOC_WARN` → `(-1,-1)` else maze-max. Tut-1 `croom` is null (`gc.coder->croom` unset without `des.room`). Match. No extra `create_monster`-style DRY fallback (that is `create_monster`, not `create_object`).

C `is_ok_location` DRY (`1297–1301`): `SPACE_POS` and no boulder unless `SOLID`. JS `is_ok_location` (`9720–9733`) is that pair. Tut-1 is not the water plane; skipped C `Is_waterlevel` early-true (`1284–1285`) is dead here. `is_ok_location_func` is unset during `create_object` (stairs set `good_stair_loc` only around `l_create_stairway`). Match.

Prior JS burned **one** `rn2(sx)`/`rn2(sy)` pair and `mksobj_at` even on STONE. C retries until DRY. That is the claimed wand fix. Public seed0009 prefix does not reach this cell (journal). Private 20/20 on a 2×2 STONE map with one ROOM is the right falsifier for **humidity**, not a public FAIL.

### `mksobj_at` + `mkbox_cnts` then `delete_contents` — order, not a stub dispatch

C box: `o->id != -1` → `mksobj_at(o->id, x, y, TRUE, !named)` (`2211–2212`). `named` is false. JS `mksobj_at(id, x, y, true, !named)` (`9961–9962`). `mksobj` TOOL_CLASS `LARGE_BOX` still does `olocked=rn2(5)`, `otrapped=!rn2(10)`, `mkbox_cnts` (`mkobj.c:318–320`, `rn2(n+1)` then `boxiprobs`). Then `create_object` overwrites broken/trapped (`2286–2293`):

```
} else if (o->broken) {
    otmp->obroken = 1;
    otmp->olocked = 0;
}
if (o->trapped == 0 || o->trapped == 1)
    otmp->otrapped = o->trapped;
```

JS the same (`10007–10013`). `mkbox_cnts` therefore still sees the **temporary** `rn2(5)` lock for `n=5|3`, then broken clears the lock. Match. `spe==-127` skips spe assign (`2230–2231` / `9968`). `eroded==0` zeros mksobj erosion (`2280–2283` / `10002–10006`). `curse_state` 0 keeps mksobj BUC (`2253–2254` / `9990–9991`). No gameplay `rn2` in those assigns.

C `SP_OBJ_CONTAINER` (`2343–2349`): `delete_contents(otmp)` then push `container_obj[container_idx++]`. JS (`10031–10036`): `create_object_delete_contents` then the same push. C `delete_contents` (`shk.c:1175–1183`):

```
while ((curr = obj->cobj) != 0) {
    obj_extract_self(curr);
    obfree(curr, (struct obj *) 0);
}
```

No `obj_resists`. JS walks `cobj`, `obj_extract_self` (CONTAINED unlinks `nobj`, `where=OBJ_FREE`), recurses nested, then `quan=0` zombie. It does **not** call `obfree` (`food_disappears` / `dealloc_obj` / timer stop). The comment claims “extract + obfree”. That is **overclaim on the callee**, same class as D-1061’s inline `deltrap`. `startup.md` already names “leftover `obfree` contents.” `BOX_PROBS` includes `FOOD_CLASS` (15%); a timed egg/corpse can be born then “deleted.” C stops the timer. JS `hatch_egg` / `get_obj_location(0)` on `OBJ_FREE` returns null and does not spawn; leftover timers are still a named omit, not the claimed `cobj` length. Private node: wand `cobj` length 1. Do **not** widen this review into Must-fix “port full `shk.c` `obfree`.”

This is **not** “Match C `create_object` dispatch, callee is a stub.” `mksobj_at`, `mkbox_cnts`, `obj_extract_self`, `add_to_container`, `stackobj`, `get_location_random` are real. It **is** “Match C `create_object` includes `delete_contents`, and the callee here is a clone.”

### `lspo_object` containment bits and callback order

C after filling `tmpobj` (`3725–3748`):

```
if (container_idx)
    tmpobj.containment |= SP_OBJ_CONTENT;
if (maybe_contents && !lua_isnil(contents))
    tmpobj.containment |= SP_OBJ_CONTAINER;
otmp = create_object(&tmpobj, croom);   /* stackobj(box) while empty */
/* pcall contents function */
if (CONTAINER) spo_pop_container();
```

JS `l_create_object` (`10062–10067`): `container_idx` → `SP_OBJ_CONTENT`; `contentsFn` → `SP_OBJ_CONTAINER`; `create_object`; `contentsFn(otmp)`; pop if CONTAINER. `SP_OBJ_CONTENT=0x1`, `SP_OBJ_CONTAINER=0x2` (`sp_lev.h:54–55`; `const.js:1797–1798`).

Box: `contentsFn` set, `container_idx==0` → CONTAINER only. `create_object` deletes mkbox_cnts, pushes box, `stackobj(box)` because not CONTENT (`2422–2423` / `10039`). Then nested wand: `container_idx==1` → CONTENT (no CONTAINER). Wand `mksobj_at` on the DRY cell, `obj_extract_self` (C `remove_object` for floor — same extract), `add_to_container`, `cobj.owt=weight`. No `stackobj` on the wand. Then pop. Match.

C `if (tmpobj.class == -1 && tmpobj.id > STRANGE_OBJECT) class = objects[id].oc_class` (`3662–3663`). JS fills class from `game.objects[id].oc_class` when class is null/`<0` and `id>0` (`10058–10060`). Tut-1 Lua wand also passes `class="/"`. C then still takes `o->id != -1` → `mksobj_at(id)` (`2209–2212`); the letter is unused when id is set. JS omits the `"/"`. Same `mksobj_at`. Match.

C `if (!c) mkobj_at(RANDOM_CLASS); else if (id != -1) mksobj_at; else def_char_to_objclass` (`2209–2227`). JS else is `mkobj_at(c)` **without** `def_char_to_objclass` / `mkgold`. Named omit. Tut-1 both objects have numeric `id`. The `class=1` fallback when `oc_class` is missing does not fire for `LARGE_BOX` / `WAN_SECRET_DOOR_DETECTION`.

C CONTENT with `container_idx==0` and no `invent_carrying_monster`: object stays on floor (`2305–2315`). JS skips the extract block when `!container_idx` (`10017–10029`). Match. `invent_carrying_monster` / saddle / artifact-uncreate-on-null-container named.

C `quan>0 && oc_merge`, `oname`, `corpsenm`, `recharged`, `tknown`, Medusa statue, achievement, `lit`/`begin_burn`, `buried` skipped. Named. Tut-1 `quan` default −1; wand `spe=30` overwrites mksobj spe after init (`2230–2231`). JS `9968`. Match. C `quan` non-merge repeat loop (`3734–3738`) named; tut-1 quan is not a pile.

`container_idx` is not zeroed in a JS `sp_level_coder_init` (`sp_lev.c:6360–6362`). Only `load_tut1` calls `l_create_object` today, and it always pops. Named. Do not treat that as this Open line.

## Hallucinations / overclaim

“Match C create_object so tut-1 packed large-box contents use DRY get_location and delete_contents” is **true for packed origin add, DRY random double-try, `container_obj` push/pop, `stackobj` before the contents callback, broken/trapped after `mkbox_cnts`, and switching tut-1 off raw `rn2` + `cobj=null`.** It is **not** true that Lua `des.object` table parse exists, that `delete_contents` is C `shk.c` `obfree`, that class-letter `def_char_to_objclass` / `mkgold` shipped, or that every special-level `des.object` now uses `l_create_object`. The D-log deferred list says those. The subject does not claim food/key/`place_lregion`.

Cadence **#1340** 44/44 does not newly prove the box (seed0009 prefix already had a large box glyph at this cell under the old `tut1_object` path). Journal admits public path unhit except that prefix. Private DRY-only ROOM / `cobj` length 1 nodes are the right checks for **humidity and mkbox_cnts wipe**.

Stamping the Open item **Addressed:** D-1062 is fair for the tut-1 packed+contents envelope. Hash `3ca1b544` is already on the archive row (`51b969b5`).

## Density (§2b)

One Open cluster: C’s packed `des.object` box + nested random wand → `lspo_object` / `create_object` / DRY `get_location_coord` / `delete_contents` / `container_obj`. New function family in `mklev.js` (~180 executable lines) plus one `load_tut1` call-site. Sibling random/packed arms of `get_location_coord` shipped with the function (not a one-`if` peel). Other loaders left named on purpose. Right size. Not “finish `sp_lev.c`.” Not food in the same SHA.

## Verification

Journal: private node 20/20 random wands on the sole ROOM cell in a 2×2 STONE map (raw `rn2` would miss); packed box broken/unlocked/untrapped, wand `spe=30`, `cobj` length 1. green+strict PASS; seed0009 **73**/73; cohort **11**/11 (8000/0900/0009/1500/1800/0060/0102/0360/2200/0030/0373). Path unhit except seed0009 prefix already in D-0353.

This review iter did not re-run sessions (cadence **#1340** already refreshed Score). C read of `sp_lev.c:1202–1353` / `2193–2439` / `3040–3046` / `3557–3754` / `6360–6362`, `shk.c:1175–1183` / `obfree` `1193–1274`, `mkobj.c:304–370` `mkbox_cnts` + `2557–2592` `obj_extract_self`, `sp_lev.h:54–85`, `dat/tut-1.lua:33–51` / `232–235`, JS `mklev.js:8602–8618` / `9740–9776` / `9891–10068`, `mkobj.js:158–168` / `534–594` / `1483–1487` / `2055–2151`, `timeout.js:504–528` is the audit. Grep of the `js/mklev.js` hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the packed box + DRY nested-wand envelope this SHA shipped.

Named omits (map, not queue): tut-1 food / `place_lregion` / `tut_key` / nhcore disable (live Open); Lua argc parse; quan non-merge repeat; oname / corpsenm / buried / lit / achievement / Medusa / `invent_carrying_monster`; class-letter `def_char_to_objclass` / `mkgold`; artifact uncreate when `container_obj` is NULL; inline `delete_contents` without `obfree`; no `sp_level_coder_init` container zero; other `load_*` `des.object` still `cobj=null` / hand-rolled; `is_ok_location` `Is_waterlevel` / `is_ok_location_func`.

Do not restore raw `rn2(sx/sy)` for nested tut-1 box contents. Do not skip `delete_contents` after `mkbox_cnts`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: packed `create_object` adds origin like C `get_location`, nested wand retries DRY like `get_location_coord`, and the box uses `container_obj` + extract-wipe after `mkbox_cnts` instead of `cobj=null`.
