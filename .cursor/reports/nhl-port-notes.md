# NHL / `load_lua` port notes

Thin tracker for des-file work (not a second progress doc). **Do not** paste `sessions/*.session.json` into port code.

## VM choice

**Fengari** (npm `fengari`, pure JS ES modules) runs upstream `.lua` control flow; `des.*` / `selection.*` are bridged to JS (`js/nhl_lua.js` + `js/des_api.js` / `js/nhl_des_runtime.js`). A minetn-only transpile was rejected: it does not generalize to 128 `dat/*.lua` files.

## RNG verification (minetn vertical)

1. Enable Lua RNG logging where the harness expects it (`enableLuaRngLogLikeC` / core log path per `rng.js`).
2. Drive **`makemazLikeC`** on a Mines branch level whose **`proto`** resolves to **`minetn-1`** (same `u.uz` as C reference segment).
3. Compare **`rn2(`/`rnd(`** ordering only for the **Lua**-tagged segment after `nhl_init` / nhlib load — use one C recorder slice as a **locator**, not pasted answers.

## `des.*` → C `lspo_*` checklist (minetn-1 slice)

| Lua / binding | C (`sp_lev.c`) | JS |
|----------------|----------------|-----|
| `level_flags` | `lspo_level_flags` | `desLevelFlagsLikeC` |
| `level_init` | `lspo_level_init` → `splev_initlev` / `mkmap` | `desLevelInitLikeC` + `mkmap_mines.js` |
| `map` | `lspo_map` | `desMapAsciiLikeC` |
| `teleport_region` | `lspo_teleport_region` | `desTeleportRegionLikeC` |
| `region` (selection + lit) | `lspo_region` subset | `desRegionSelectionLitLikeC` |
| `levregion` | `lspo_levregion` | `desLevregionLikeC` |
| `feature` | `lspo_feature` | `desFeatureLikeC` (fountain subset) |
| `altar` | `lspo_altar` | `desAltarLikeC` |
| `door` | `lspo_door` | `desDoorLikeC` |
| `replace_terrain` | `lspo_replace_terrain` | `desReplaceTerrainLikeC` |
| `object` | `lspo_object` | `desObjectLikeC` |
| `monster` | `lspo_monster` | `desMonsterLikeC` |
| `wallify` | `lspo_wallify` | `desWallifyLikeC` |

**Not yet bound / partial:** `terrain`, `engraving`, `mazewalk`, `stair`, `trap`, `gold`, `non_diggable`, `non_passwall`, `room`, `subroom`, `corridor`, `drawbridge`, `maze`, `finalize_level`, … (extend per next `.lua`).

## `selection.*` / nhlib (minetn-1)

| API | Status |
|-----|--------|
| `selection.area` | `_sel_rect` |
| `selection.floodfill` | `_sel_flood` |
| `&` (band) | `_sel_and` |
| `rndcoord` | `_sel_rndcoord` |
| nhlib top-level `shuffle(align)` | **`nhlib_align_shuffle.js`** — core **`rn2`** shim (public harness); real C uses Lua **`nh.rn2`** when **`nhlib.lua`** loads under **`nhl_init`**. **`nhl_lua.js`** / minetn uses **`nhlRn2LikeC`**. |

## Per-slice read order (example)

- **Slice:** extend one `lspo_*` → read **one** C function + one target **`dat/*.lua`**.
- C paths: `read_file` / `rg` under **`nethack-c/upstream/`** (nested submodule).

## Wiring entry points

- **`mklev.js`** `loadLuaLikeC` → dynamic `import('./nhl_lua.js')` → `runLuaProtofileLikeC` (avoids ESM cycles with `nhl_des_runtime.js`).
- **`loadSpecialLikeC`** → post-load **`loadSpecialAfterLuaLikeC`** (already ported in `sp_lev_load.js`).

## Methodical ordering (NHL lane only)

1. Pick **one** next **`dat/*.lua`** (or extend allowlist in **`nhl_lua.js`** for a named proto).
2. Grep that script for **`des.`** / **`selection.`**; add or complete the matching **`lspo_*`** in **`nhl_des_runtime.js`** (re-export via **`des_api.js`** if adding new public entry points).
3. Read **one** C handler in **`sp_lev.c`** (and **`nhlsel.c`** if selection semantics) per commit-sized slice.
4. Run **`npm run score`** when RNG or map generation changes; keep **`nhlib_align_shuffle.js`** on **core** `rn2` until full **`nhl_init`** drives nhlib from C-shaped **`init_dungeons`** (see file comment — avoids 0/44 harness drift).

For **cross-lane** ordering (chargen vs NHL vs moveloop), use the **priority matrix** in [`c-to-js-port-current.md`](c-to-js-port-current.md).
