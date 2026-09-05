# Review 810 — bf310d98 — selvar.c selection_filter_percent themed fills (D-1840)

## Metadata
- Full / short hash: `bf310d98c253d3e0907fe779a5b5724c2c7ccc75` / `bf310d98`
- Parent: `65036888` (D-1839). Map-driven Open: 2 tours at `rn2(100)` `@ selection_filter_percent` vs JS `rnd_rect`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 03:17:02 +0200
- D-id: **D-1840**
- Stats: `js/mklev.js` +138/−4. `js/` insertions **138** ≤250. Band **80–350**.
- Claims to close: Ice / Boulder / Spider / Trap `themeroom_fill` so C’s `rn2(100)` runs. Not Garden/Massacre/Statuary.
- JS / map: four fill bodies + `selection_filter_percent`. `c-js-map/data.md`. Archive **Addressed:** D-1840 (hash fill this audit).

## Intent vs deliverable

Git subject promises: those four fills were no-ops after the name pick, so generation returned to `makerooms` `rnd_rect`.

`node scripts/csym.mjs selection_filter_percent` → `selvar.c:223–245` (x-outer, `rn2(100) < percent`). `--callers`: `nhlsel.c:396`. `l_selection_filter_percent` `:388–402`. `l_selection_iterate` `:924–957` (y-outer, `cvt_to_relcoord`). `create_trap` `sp_lev.c:1811–1846`. Lua `dat/themerms.lua` Ice `:47–58`, Boulder `:73–85`, Spider `:89–98`, Trap `:102–113`.

The diff **does** port those four bodies. Remaining fills stay named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `selection_filter_percent` | LIVE | x-outer `:239–242` |
| `selection_iterate_lua` | LIVE clone | y-outer `:935–936` |
| `themeroom_fill_ice/_boulder/_spider/_trap` | LIVE new | lua contents |
| `splev_create_trap_coord` | LIVE | `create_trap` + croom |
| `nhlib_shuffle` | LIVE | trap names |
| Garden / Buried treasure / Massacre / Statuary | OMIT named | |
| icedpool on ICE / humidity `get_location` | OMIT named | |

`node scripts/sym.mjs`:

```
selection_filter_percent NOT EXPORTED — 1 LOCAL mklev.js:20680
themeroom_fill_ice / _boulder / _spider / _trap  NOT EXPORTED — 1 LOCAL each
splev_create_trap_coord  NOT EXPORTED — 1 LOCAL :15072
get_free_room_loc_coord  NOT EXPORTED — 1 LOCAL :15126
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Filter (`:239–242`).** x then y; `getpoint && rn2(100)<pct`. JS same. **Match that RNG.**

**Iterate (`:935–936`).** y then x (`max(1,lx)`). JS `selection_iterate_lua`. Ice melt / boulder / spider / trap use it. Ice `des.terrain` has no RNG (paint ICE); JS `selection_iterate` x-outer for paint only. **Match the RNG-bearing loops.**

**Ice lua `:49–57`.** `selection.room()`; terrain I; `percent(25)` then iterate `start_timer_at(..., mintime+rn2(1000))`. **Match.** icedpool named.

**Boulder `:76–84`.** `percentage(30)` then `percent(50)` boulder vs rolling-boulder trap. **Match.**

**Spider `:91–96`.** `difficulty>8` then `and percent(80)` — short-circuit so easy levels burn no `rn2`. JS `spooders && percent(80)`. **Match.**

**Trap `:104–112`.** Shuffle eight names; `percentage(30)`; `des.trap(traps[1],x,y)` → JS `traps[0]` after `nhlib_shuffle`. **Match.**

**`create_trap` `:1822–1845`.** croom `get_free_room_loc` then `mktrap` with flags. **Match the shipped coord path.** Humidity named.

**Callee closure.** Four fills, one `selection_filter_percent` family (D-1836 named these). Filter/iterate/`create_trap` LIVE. Remaining fills OMIT named. No STUB in a shipped fill.

## Hallucinations / overclaim

Do **not** stamp Garden/Massacre/Statuary, icedpool, or humidity. Two tours **moved past** (`level_tele` / `js-throw`) — not corpus PASS of those later owners.

## Density

§2b: the four fills that actually call `percentage(30)` / Ice terrain. +138. Did **not** glue fakewiz. Right size.

## Verification

This audit, `js/` at `bf310d98`: `node scripts/hidden-proxy.mjs verify selection_filter_percent --base bf310d98~1` → `2 session(s) blocked`. Summary: **`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`** (`tour-Barbarian-70024` → `level_tele` step 32 was 0; `tour-Monk-70022` → `js-throw` step 45 was 12). Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
