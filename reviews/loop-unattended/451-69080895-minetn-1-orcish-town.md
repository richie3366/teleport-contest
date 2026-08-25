# Review 451 — 69080895 — mklev.c minetn-1 load_special Orcish Town (D-1490)

## Metadata
- Full / short hash: `690808951eb3b6c250af508583ab87ccbe019f8d` / `69080895`
- Parent: `83fa138f` (D-1489). This file audits **this SHA only** (sixth of nine `js/` commits since review **445**). Archive **Addressed:** D-1490 `69080895` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 18:07:19 +0200
- D-id: **D-1490**
- Stats: 9 files, +380 / −37 — `js/mklev.js` +309 / −14.
- Claims to close: Open `mklev.c` `minetn-1` load_special (named from D-1363 / D-0754 / review **323**). Not minetn-5. `reviews/loop-2026-08-15/` has no unpaid orctown loader Must-fix.
- JS / map: `mklev.js` `load_minetn_1` / `load_special_proto`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **323** named minetn-1 after `stolen_booty`.

## Intent vs deliverable

Git subject promises: mines town variant 1 is Orcish Town (mines+map+orcs) instead of an empty maze fallback.

Pinned C is `dat/minetn-1.lua` via `sp_lev.c` `load_special`, dispatched from `mkmaze.c` `makemaz` when proto is `minetn-1`. `check_ransacked` already sets `game.ransacked` for that proto (D-1363) so `fixup_special` → `stolen_booty` can run **once the loader succeeds**.

Old JS: `load_special_proto` had minetn-2/3/4/5 (D-0754) and fell through empty maze for `-1`.

The diff **does** dispatch `minetn-1` and port the lua sequence with the same helper family as minetn-5 (`splev_initlev`, centered map, `l_create_object`, `percent`/`lua_random2`/`nhlib_shuffle`). It **does not** run a Lua VM (this repo’s established special-clone pattern). It **does not** port minetn-6/7. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `load_special_proto('minetn-1')` | C `load_special`, **wired this SHA** | |
| `load_minetn_1` | C `minetn-1.lua`, **clone of the lua script** | not a Lua VM |
| `splev_initlev` mines | C `lspo_initlev`, **already live** | `lit` BOOL_RANDOM |
| `splev_apply_centered_map` | C `lspo_map`, **already live** | `F`→IRONBARS |
| `l_create_object` | C `l_create_object`, **already live** | |
| `percent` / `lua_random2` / `nhlib_shuffle` | C nhlib.lua, **already live** | `rn2` |
| `selection_floodfill` / `selection_rndcoord` | C selvar.c, **already live** | |
| `placeHostile` | C `create_monster` subset, **local clone** | `set_malign`; not shared `splev_create_monster` |
| `makemon` / `set_malign` | C, **imported live** | |
| minetn-6/7 | C lua, **named omit** | |
| `link_doors_rooms` / `ensure_way_out` / `map_cleanup` | C `load_special` epilogue, **named omit** | same as other minetn loaders |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded session coordinates. The map string is the **lua source**, not a public-trace hardcode. Rule #2 clean. **New gameplay RNG:** mines `BOOL_RANDOM` lit; `rnddoor`; replace_terrain `rn2(100)`; shuffle; `lua_random2` rubble/army/shamans; `percent(90/50/80)`; `rndcoord`; `induced_align(80)` inside placeHostile; `stolen_booty` after ransacked (D-1363). Public fortress: no session is documented as rolling `minetn-1`.

## C ↔ JS fidelity

Lua order matches the JS function: `level_flags("mazelevel")` **before** mines init (walled+join can clear maze flag); mines init filling=fg; centered 37×19 map with `F` bars; string map `lit=FALSE` (JS clears `SpLev_Map` cells, lava stays lit); teleport_region / lit region / levregion stairs with the lua numbers (leading zeros are decimal 1, not octal); fountains (16,9)/(25,9); noalign shrine altar.

Altar: C `sp_lev.c` `:2476–2477` `if (!croom_is_temple || !a->shrine) return` **after** `altarmask = amask`. No temple room → no `priestini`, no `AM_SHRINE`. JS `AM_NONE` only. **Match.** Not a skip-shrine lie.

Doors: eleven `rnddoor()` at the lua cells. Replace `|`→`.` chance 18/18/18/33. Match.

`place` 10 coords, `shuffle` (Fisher–Yates `1+rn2(i)`). Lua 1-based `place[1]…[5]` shop corpses = JS `place[0]…[4]`. Candles/lamp/wands index-map 1-based→0-based. **Match.** Watch corpses have no coord (random `l_create_object`). Match.

Rubble: `math.random(10,19)` then `percent(90)` boulder + always rock. JS `lua_random2(10,19)` = `10+rn2(10)`. Match nhlib.

Army: `percent(50)` **then** `inside:rndcoord(1)` (remove). Else `percent(80)` Uruk else Mordor. JS does not evaluate rndcoord before percent. **Match lua evaluation.** Shamans `for i=1,random(1,6)` `m_lev_adj = (i==1) and 3 or 0`, `rndcoord(0)` no-remove. Hill orc `percent(90)` else goblin, no coord. Match.

`placeHostile` is a **clone** of `create_monster`: `find_montype_gender`, `induced_align(80)`, mines your-race clear, humidity/`get_location`, `makemon`, `peaceful=0`, `set_malign`, optional `m_lev` clamp 0–49. Hallucination check: “Match C `create_monster`” while this is a **local subset** — it is not a no-op stub; `makemon` is live. Shared `splev_create_monster` was correctly not given `set_malign` as a stealth global.

`wallify_map` then C `wallification` if `!corrmaze`, `flip_level_rnd(3,false)`, `fixup_special` (stolen_booty). Match `load_special` tail used by other minetn clones. `ensure_way_out` still named.

## Hallucinations / overclaim

Subject says variant 1 is Orcish Town instead of an empty maze. **True** once `makemaz` picks `minetn-1`. **False until named** for minetn-6/7 and `ensure_way_out`. Stamping **Addressed:** D-1490 for this proto is fair. Do **not** stamp “Match C Lua VM `load_special`.” Do **not** treat fortress PASS as orctown (public-unhit unless `rnd` hits variant 1). Do **not** claim `add_to_minv` merge (later D-1492).

## Density

One lua special, same envelope as minetn-5. ~280 JS lines. Playbook §2b. Did not glue minetn-6. Acceptable.

## Branch-by-branch confirm

1. `load_special_proto('minetn-1')` → `load_minetn_1`. **Match makemaz dispatch.**
2. Mazelevel flag before mines init. **Match lua line 12 vs 14.**
3. Map `F` bars; lit clear on non-lava. **Match.**
4. No-temple altar: `AM_NONE`, no priest. **Match `:2476–2477`.**
5. Shopkeeper corpses on shuffled `place[0..4]`. **Match lua `place[1..5]`.**
6. Army percent then rndcoord(remove). **Match lua `:121–130`.**
7. First shaman only `m_lev+3`. **Match lua `:134–136`.**
8. `check_ransacked` still sets ransacked; `fixup_special` → booty. **Match D-1363.**
9. minetn-6/7 still empty-maze. Named.
10. **Public-unhit** unless a session rolls variant 1.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Map text is lua, not a session screenshot. Plain ESM. Clone is the established special path, not a new WASM/Lua VM (Constitution long-term; not this SHA’s job).

## Verification

Journal: private canary **25**/25 (dispatch; mazelevel before mines; map `F`/lit; no-temple altar; army percent-then-rndcoord; shaman `i==1`; ransacked→stolen_booty; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None in the lua sequence / RNG order vs `minetn-1.lua`. The `placeHostile` clone matches `peaceful=0` + `set_malign`.

Named omits (map / Open, not Must-fix):

1. minetn-6 / minetn-7 `load_special`
2. `link_doors_rooms` extras / `ensure_way_out` / `map_cleanup` / `count_level_features`
3. dog `MIGR_LEFTOVERS` (then still Open)

Do not Must-fix “should have used a Lua VM.” Do not Must-fix “stolen_booty never runs” (`fixup_special` is called). Do not Must-fix “altar should `priestini` without a TEMPLE room.”

## Callers / RNG ledger

C caller: `makemaz` → `load_special("minetn-1")`. JS `load_special_proto`. Dice as above. Public fortress does not require this proto.

Verdict: **ACCEPT-WITH-DEBT**
