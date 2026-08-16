# Review 70 — 5bf81ca7 — `lspo_exclusion` populate `exclusion_zones` (D-1109)

## Metadata
- Full / short hash: `5bf81ca71fa6e3061f590d77b0439cea8f06e9f5` / `5bf81ca7`
- Parent: `6cb4b63a` (review **66–69**). This file audits **this SHA only**. Archive row **Addressed:** D-1109 `5bf81ca7` was filled by D-1110 (chicken-egg on the fix SHA).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 21:58:35 +0200
- D-id: **D-1109**
- Stats: 10 files, +197 / −60 — `js/mklev.js` +109 / −12 (`lspo_exclusion` / `free_exclusions` / `flip_level` arm + seven soko loaders + vault helper).
- Claims to close: Open queue `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (named). Not `goodpos`. Review **62** named omit 1. `reviews/loop-2026-08-15/` has no open exclusion Must-fix.
- JS / map: `mklev.js` `lspo_exclusion`. `c-js-map/data.md` mklev / Lua rows. soko2-2 load, hellfill prefab TELE maps, `save_exclusions` / `load_exclusions` still named.
- Prior reviews this SHA claims to close: **62** item 1 (`lspo_exclusion` populate).

## Intent vs deliverable

Git subject promises: “Match C sp_lev.c lspo_exclusion so des.exclusion fills exclusion_zones.”

Old JS `goodpos` / `put_lregion_here` already walked `game.exclusion_zones` (D-1101 / D-0522), but Lua `des.exclusion` never filled the list except one baked themerms vault TELE rectangle assigned by hand. Sokoban hole/pit rows (`monster-generation` → `LR_MONGEN`) stayed empty, so `GP_AVOID_MONPOS` never rejected those cells.

The diff **does** port the opcode, prepend onto `game.exclusion_zones`, add origin via `get_location(ANY_LOC|NO_LOC_WARN)`, clear the list on `clear_level_structures`, flip rectangles in `flip_level`, and call the helper from every **loaded** special that had `des.exclusion` (soko1-1/1-2/2-1/3-1/3-2/4-1/4-2 + vault).

It does **not** load soko2-2, hellfill `rnd_hell_prefab` TELE maps, or persist the list through bones/goto. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `lspo_exclusion` | C body, **new** | `sp_lev.c:5498–5531`; exported |
| `EZ_TYPES` | C table, **clone** | `ez_types[]` / `ez_types2i[]` |
| `get_location` | C callee, **imported** | local `mklev.js`; analog of `get_location_coord` then `get_location` for non-random packed coords |
| `free_exclusions` | C callee, **new** | `dungeon.c:2582–2593`; JS drops the list (no `free`) |
| `clear_level_structures` | C caller, **retouched** | `mklev.c:921` after `clear_regions` |
| `flip_level` exclusion arm | C body, **new** | `sp_lev.c:876–896`; ungated FlipX/Y |
| soko `load_soko*` `des.exclusion` | C Lua call sites, **wired** | packed map-relative rects |
| `water_vault_contents` | C Lua call site, **rewired** | was a raw list assign; now the helper |
| `save_exclusions` / `load_exclusions` | C, **named omit** | `dungeon.c:2596–` |
| soko2-2 / hellfill prefab | C Lua, **named omit** | load still deferred |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. Region literals (`[7,1,23,1]` and siblings) are Lua `des.exclusion` packed coords, the same class as the boulder/trap tables already in those loaders, not public-trace coordinates. Frozen contracts untouched. **No new RNG** in the opcode (origin add is arithmetic; FlipX/Y are the pre-existing extends bbox).

## Constitution / playbook

Grep of the `js/mklev.js` hunk: no trace-index gates. Contest Rule #2: no Node builtins. One await at `nhgetch` still owns input. Baking `des.exclusion` into loaded specials is the existing mklev production path (full Lua VM still named on the data map), not a new architecture.

## C ↔ JS fidelity

### Opcode body

C `sp_lev.c:5498–5531`:

```
ez->zonetype = ez_types2i[get_table_option(L, "type", "teleport", ez_types)];
get_table_region(L, "region", &x1, &y1, &x2, &y2, FALSE);
a1 = x1, b1 = y1; a2 = x2, b2 = y2;
get_location_coord(&a1, &b1, ANY_LOC|NO_LOC_WARN, gc.coder->croom,
                   SP_COORD_PACK(a1, b1));
get_location_coord(&a2, &b2, ANY_LOC|NO_LOC_WARN, gc.coder->croom,
                   SP_COORD_PACK(a2, b2));
ez->lx = a1; ez->ly = b1; ez->hx = a2; ez->hy = b2;
ez->next = sve.exclusion_zones;
sve.exclusion_zones = ez;
```

`ez_types` / `ez_types2i`: `"teleport"`→`LR_TELE`, `"teleport-up"`→`LR_UPTELE`, `"teleport-down"`→`LR_DOWNTELE`, `"monster-generation"`→`LR_MONGEN`. Default type `"teleport"`. JS `EZ_TYPES` plus `opts?.type ?? 'teleport'` matches those four strings and the default.

Unknown type: C `get_table_option` lua-errors. JS `EZ_TYPES[typeName] ?? LR_TELE` silently falls back. **Baked callers only pass known types.** A future Lua VM that fed a typo would disagree. Named as opcode-vs-VM, not a live C-wrong of this SHA’s call sites.

C then `get_location_coord` with `SP_COORD_PACK` of the numeric pair. For non-random packed coords, unpack is identity, then `get_location` adds `croom->lx/ly` or `gx.xstart/gy.ystart` (`sp_lev.c:1210–1224`, `1337–1353`). `ANY_LOC` skips the `!isok` maze-max clamp. JS calls `get_location` directly with the same flags (`mklev.js:10174–10203`). For the positive packed integers the baked loaders pass, that is the C non-random arm. Random packed coords (`SP_COORD_IS_RANDOM`) are not used at these call sites.

Origin: soko loaders call `splev_apply_centered_map`, which sets `splev_xstart/ystart/xsize/ysize` before boulders/traps/exclusion. `splev_map_origin()` therefore returns that map origin, not the `(1,0)` fallback. Vault contents reads the same `splev_*` the old `mx+2` assign used; `[2,2,3,3]` through `get_location` is the same absolute rectangle.

Prepend: `ez.next = game.exclusion_zones; game.exclusion_zones = ez`. soko4-2 calls two regions in Lua order; the second becomes head. C prepends the same way. Walker `is_exclusion_zone` still ORs matches, so list order does not change mongen reject. After this SHA, Sokoban `makemon` `GP_AVOID_MONPOS` (D-1101) finally has a non-empty `LR_MONGEN` list on those hole rows; TELE vault still does not reject mongen.

`croom`: baked callers omit it (`null`). C top-level `des.exclusion` after `des.map` has `coder->croom` NULL. Match for the wired sites. The helper accepts `opts.croom` for a later room-contents Lua path.

C `get_table_region(..., FALSE)` requires a numeric four-tuple (no random region). JS `region[0..3] | 0` is that arm. Lua `{ 07,01, 23,01 }` is decimal 7 in Lua 5.4 (not C octal); the baked `[7,1,23,1]` matches the trap row in the same loader.

Binding: C `sp_lev.c:6405` `{ "exclusion", lspo_exclusion }`. JS has no Lua VM; the exported function is the opcode body the baked `load_soko*` / vault contents call at the same moment C’s Lua would (after map + boulders, before/with traps). That is the production path this repo already uses for every other `des.*` on those maps.

`put_lregion_here` TELE still walks the same list (D-0522). Populating TELE vault `{2,2,3,3}` can now reject teleport dests inside that rectangle after origin add — C same. Mongen query still ignores TELE zonetype.

### `free_exclusions` / `flip_level`

C `mklev.c:920–921`: `clear_regions(); free_exclusions();`. JS `1035–1037`: same order. C walks and `free`s nodes then NULLs the head; JS NULLs the head (GC). Observable list is empty either way.

C `sp_lev.c:876–896`: for each zone, if `flp&1` FlipY both `ly/hy` and swap if inverted; if `flp&2` FlipX both `lx/hx` and swap. **Ungated** (not `inFlipArea`). JS `8441–8456` uses the same FlipX/Y closures already used for ungated stairs (`maxx-x+minx`). Sokoban `flip_level_rnd` after populate now remaps the hole-row rectangles the way C does; before this SHA the list was empty so flip was a no-op.

### Wired Lua numbers

| Loader | JS region | Type |
|--------|-----------|------|
| soko1-1 | `[7,1,23,1]` | MONGEN |
| soko1-2 | `[5,1,23,1]` | MONGEN |
| soko2-1 | `[7,9,18,9]` | MONGEN |
| soko3-1 | `[11,10,27,10]` | MONGEN |
| soko3-2 | `[11,10,24,10]` | MONGEN |
| soko4-1 | `[1,6,7,11]` | MONGEN |
| soko4-2 | `[1,1,1,9]` then `[1,8,7,9]` | MONGEN |
| vault | `[2,2,3,3]` | TELE (default) |

Trap tables in the same loaders use the same packed pairs (soko1-1 HOLE at 7,1…23,1). Exclusion is the hole/pit **row**, which is what C’s `des.exclusion` is for: `makemon` `GP_AVOID_MONPOS` must not plant on the trap line. TELE vault zone does **not** reject mongen (`is_exclusion_zone` zonetype; review **62**). Match.

soko2-2 still has no `load_special`. Hellfill prefab maps still named. Those lists stay empty in JS the way an unloaded special is empty in C.

## Hallucinations / overclaim

“Match C so des.exclusion fills exclusion_zones” is **true for the opcode, the origin add, prepend, free-on-clear, ungated flip, and every loaded special that actually calls `des.exclusion`.** It is **not** true that soko2-2 or hellfill prefabs fill the list, that bones/goto persist it, or that a Lua VM now runs `dat/*.lua`.

This is **not** “Match C dispatch, callee is a stub.” `get_location` is the real origin add; `is_exclusion_zone` (D-1101) is the real walker. An empty list on an unloaded map is C’s empty list.

Stamping **Addressed:** D-1109 is fair for the Open populate line. Hash `5bf81ca7` is on the archive row (filled by D-1110).

## Density (§2b)

One Open cluster: C’s one opcode plus the two C sites that keep the list honest (`free_exclusions`, `flip_level` exclusion arm) plus the loaded Lua call sites that were the data hole. ~100 executable lines in one module. Sibling live-mon `onscary` correctly left for the next SHA. Not “finish sp_lev.c.” Right size (large end of the envelope).

## Verification

Journal: private canary **25**/25 (default TELE; origin add; TELE≠MONGEN alias; U/DTELE alias TELE; named up/down types; prepend; croom origin; FlipY low-corner); green+strict seed8000/0900; cohort **16**/16 including soko **0360**/0373 + 4500/2200/0030 + strict 0360/0373/4500/2200. Path **public-unhit** on prefixes that never walked a populated MONGEN list; soko cohort is the relevant loaded special, not a fortress proof of hole-row mongen. This audit’s full `sessions` still **44**/44 — same.

C read of `sp_lev.c:5496–5531` / `876–896` / `1202–1353`, `dungeon.c:2582–2593`, `mklev.c:920–921`, `dungeon.h:35–43`; JS `mklev.js:718–757` / `1035–1037` / `8441–8456` / soko+vault call sites, `teleport.js:282–294`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| default type omitted | `LR_TELE` | **same** |
| `"monster-generation"` | `LR_MONGEN` | **same** |
| packed `(7,1)` after centered map | `xstart+7, ystart+1` | **same** |
| vault `{2,2,3,3}` | map origin + 2..3 | **same** (was raw `mx+2`) |
| two soko4-2 rects | prepend, both walked | **same** |
| FlipY inverts ly/hy | swap | **same** |
| `clear_level_structures` | list NULL | **same** |
| soko2-2 | would populate | **empty** (load deferred) |

## Actionable C-wrongs

None that Must-fix this next iter. The opcode and wired call sites match `sp_lev.c:5498–5531`.

Named omits / do-nots (map / Open, not Must-fix):

1. soko2-2 `des.exclusion` — load still deferred. Not this opcode.
2. hellfill `rnd_hell_prefab` TELE exclusions. Named.
3. `save_exclusions` / `load_exclusions` (bones / goto_level). Named.
4. Do not restore the vault raw `exclusion_zones` assign. Do not skip `free_exclusions` on clear. Do not skip the `flip_level` exclusion arm now that the list is populated. Do not let TELE zones reject mongen (walker, D-1101).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `des.exclusion` now prepends origin-adjusted rectangles onto `exclusion_zones` with C’s type map, free-on-clear, and ungated flip, and every loaded Sokoban/vault caller is wired, while soko2-2 / hellfill / save-rest stay named.
- Must-fix stays empty for this SHA; next port after this cluster popped Open live-mon `onscary` (D-1110), not a fountain peel.
