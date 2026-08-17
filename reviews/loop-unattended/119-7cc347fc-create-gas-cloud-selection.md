# Review 119 — 7cc347fc — region.c `create_gas_cloud_selection` / Cloud room (D-1158)

## Metadata
- Full / short hash: `7cc347fc9fe47d32805b5180ff29656b6f220e91` / `7cc347fc`
- Parent: `ed28eef1` (D-1157). This file audits **this SHA only**. Archive row **Addressed:** D-1158 `7cc347fc` was filled by D-1159.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 13:58:08 +0200
- D-id: **D-1158**
- Stats: 11 files, +212 / −58 — `js/region.js` +66 (`create_gas_cloud_selection` + bounds clones); `js/mklev.js` +58 (`lspo_gas_cloud` / Cloud fill).
- Claims to close: Open queue `region.c` `create_gas_cloud_selection` (named). Not BFS create. Reviews **116** / **117** named the selection creator after expire/fumaroles. `reviews/loop-2026-08-15/` has no open selection Must-fix.
- JS / map: `region.js` `create_gas_cloud_selection`; `mklev.js` `lspo_gas_cloud` / `themeroom_fill_cloud`. `c-js-map/data.md` themerms. Ice/Boulder/… fills, `run_regions` geometry, mfndpos subset still named.
- Prior reviews this SHA claims to close: **116** / **117** named selection create; D-1157 next-port.

## Intent vs deliverable

Git subject promises: “Match C region.c create_gas_cloud_selection so a themerms Cloud room lays 1x1 bitmap steam (ttl -1) instead of skipping the selection creator.”

Old JS had BFS `create_gas_cloud` (drinksink / fog / fumaroles) with `rn1(3,4)` ttl and Fisher-Yates expand. C’s **other** creator (`region.c:1311–1336`) walks a selection bitmap, `add_rect_to_reg` 1×1, and leaves `create_region` ttl −1. Themerms Cloud (`dat/themerms.lua:62–69`, NetHack-3.7; not in this checkout) is `selection.room()` then asleep fog then `des.gas_cloud({ selection })`.

The diff **does** port the bitmap creator, `lspo_gas_cloud` (xy/`coord` → size-1 BFS; both −1 → selection; `ttl > -2` overwrite), and Cloud fill (`floor(numpoints/4)` fog + selection steam). It does **not** run C `get_location` on the xy form (comment). Ice/Boulder/Spider/… fills stay named. Honest.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `create_gas_cloud_selection` | C callee, **new** | `region.c:1311–1336` |
| `selection_getbounds` | C `selvar.c:77–95`, **clone** | dirty recalc omitted; empty `lx>=COLNO` → full map |
| `selection_getpoint_sel` | C `selection_getpoint`, **clone** | Set-backed `pts` |
| `make_gas_cloud` | C callee, **imported** | D-1137; shared with BFS |
| `lspo_gas_cloud` | C `sp_lev.c:4928–4965`, **new** | no `get_location` on xy |
| `themeroom_fill_cloud` | C lua body, **new** | `themerms.lua:62–69` |
| `splev_room_monster` | C `create_monster`, **pre-existing** | now returns `mtmp` for asleep |
| `create_gas_cloud` BFS | C sibling, **untouched** | still `rn1` ttl |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none in the selection creator (no `rn1`, no Fisher-Yates). Fog loop burns `induced_align(80)` + `makemon` per C `create_monster`. Path **public-unhit** on Cloud fill (reservoir pick already burned; public seeds do not land this body).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Cloud fill uses room geometry, not a public-seed cell.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not feed Cloud through BFS `create_gas_cloud` (that would `rn1` ttl and expand). Do not overwrite ttl when the lua omits it (C default −2). Do not pull Ice/Boulder fills into this peel.

## C ↔ JS fidelity

### Bitmap then `make_gas_cloud`

C `region.c:1311–1336`:

```
inside_cloud = is_hero_inside_gas_cloud();
selection_getbounds(sel, &r);
cloud = create_region((NhRect *) 0, 0);
for (x = r.lx; x <= r.hx; x++)
    for (y = r.ly; y <= r.hy; y++)
        if (selection_getpoint(x, y, sel)) {
            tmprect.lx = tmprect.hx = x;
            tmprect.ly = tmprect.hy = y;
            add_rect_to_reg(cloud, &tmprect);
        }
make_gas_cloud(cloud, damage, inside_cloud);
```

JS `region.js:781–798`: same `inside_cloud` first; object analog of `create_region` (`ttl: -1`, `REG_NOT_HEROS`); x-outer y-inner; 1×1 `rects.push`; `await make_gas_cloud`. `add_rect_to_reg` (`:133–155`) appends and widens the box — no merge. JS append is the same occupancy. `create_region` ttl −1 (`:108`); BFS creator then overwrites with `rn1(3,4)` (`:1303–1305`). Selection creator does **not**. Match.

`make_gas_cloud` (`:1181–1205` / JS `:359–413`): `!in_mklev && !mon_moving` → `set_heros_fault`; `inside_f`/`expire_f`/`arg`/`visible`/`glyph`; `add_region`; maybe envelop. Cloud fill is `in_mklev` → stays `REG_NOT_HEROS`, no envelop. Match.

### `lspo_gas_cloud`

C `sp_lev.c:4928–4959`: `get_table_xy_or_coord`; both −1 → `selection`; `damage` default 0; `ttl` default −2; `!sel` → `create_gas_cloud(x,y,1,damage)` else selection; `ttl > -2` overwrite.

JS `:766–783`: same defaults; `coord` only when x,y both −1 (C `get_table_xy_or_coord` `:3193–3200` same); no `get_location` on raw x,y (comment). Cloud uses selection, so the xy skip is not this lua body. Named for a future `des.gas_cloud({x,y})` special-level coord pack. Not a C-wrong on the Open **selection** line.

### Cloud room lua

NetHack-3.7 `dat/themerms.lua:62–69` (fetched; not in this tree):

```
local fog = selection.room();
for i = 1, (fog:numpoints() / 4) do
    des.monster({ id = "fog cloud", asleep = true });
end
des.gas_cloud({ selection = fog });
```

JS `:16776–16786`: `selection_from_mkroom` (already the Ghost-fill analog of `selection.room()`); `(numpoints/4)|0` then `i < n`. Lua 5.4 `/` is float; `for i = 1, 10.75` runs 10 times. Floor matches. `asleep = true` > `BOOL_RANDOM` (−1) → `msleeping`. JS sets `msleeping = 1` after `makemon`. `des.monster` without coord uses room `get_location`; `splev_room_monster(croom, 'fog cloud')` same family (and now returns `mtmp`). `des.gas_cloud({ selection })` → damage 0, ttl default −2 → region ttl stays −1. JS `void lspo_gas_cloud({ selection: fog })`.

`void` vs await: `lspo_gas_cloud` is async. During `in_mklev`, `make_gas_cloud` has **no** inner `await` (envelop pline skipped). The async function still hits `await make_gas_cloud` after the cloud is already `game.regions.push`’d. Registration is sync before the microtask; Cloud’s ttl is not overwritten. Comment is accurate for this caller. A later xy+ttl fire-and-forget would race the overwrite — not this lua.

### `selection_getbounds` empty

C `:84–88`: `bounds.lx >= sel->wid` → full map (then `getpoint` all false). JS `:lx >= COLNO` same. `selection_from_mkroom` empty returns `hx: -1` with `lx: 0`, so the scan loop does not run — no rects, same as a full-map all-false walk. Null `sel`: C `getbounds` returns without writing (`zeroNhRect`); JS maps null to the full map. Cloud always passes a live selection. Named edge, not this fill.

### `make_gas_cloud` / `in_mklev`

C `:1187–1188` `set_heros_fault` only when `!gi.in_mklev && !svc.context.mon_moving`. JS `:362–364` same. Cloud fill runs during themerms, so the bitmap steam stays `REG_NOT_HEROS` (create_region default, then the `!in_mklev` set is skipped). Glyph is `S_cloud` because damage 0 (`:1194` / JS `:370`). `mfndpos` only avoids `S_poisoncloud` (D-0770). Harmless steam does not change neighbour skips. Match.

`splev_room_monster` now returns `mtmp` (was `return` void). Needed so Cloud can set `msleeping`. Other fill callers ignore the return. Not a second cluster.

## Hallucinations / overclaim

D-log / CURRENT / subject say a themerms Cloud room lays 1×1 bitmap steam (ttl −1) instead of skipping the selection creator. **That is the hunk:** new C function + lua caller + fill body. Stamping **Addressed:** D-1158 is fair for the Open **selection** line. Hash `7cc347fc` is on the archive row (filled by D-1159). Do **not** stamp it as “Match C Ice/Boulder fills” or “xy `gas_cloud` now `get_location`s.” This is **not** “Match C dispatch, callee is a stub”: `make_gas_cloud` is the real D-1137 function; ttl −1 is `create_region`, not a BFS stand-in.

## Density

Selection creator + the only vanilla lua caller (`lspo_gas_cloud` + Cloud fill) is one C family. Right size (§2b). Related themerms Ice/Boulder stay named. Not “finish themerms.”

## Verification

Journal: private canary **41**/41 (L-shape order, hole, ttl −1, no RNG, glyphs, `in_mklev` NOT_HEROS, empty sel, lspo ttl overwrite, xy vs selection, coord form, Lua `/4` floor); green+strict seed8000/0900; cohort **39**/39 (CURRENT shared + 0014/0383). Path **public-unhit** on Cloud fill.

C read of `region.c:79–127`, `:1311–1336`, `sp_lev.c:3188–3204`, `:4928–4965`, `selvar.c:77–95`, `themerms.lua:62–69`; JS SHA creator + `lspo_gas_cloud` + fill. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1475**) **44**/44 — Cloud fill stays public-unhit; BFS drinksink/fog ttl still match.

| Case | C | JS after |
|------|---|---------|
| selection bits | 1×1 rects, x then y | **same** |
| ttl | `create_region` −1 | **same** |
| BFS `rn1` | not this creator | **same** |
| Cloud fog count | `floor(numpoints/4)` | **same** |
| Cloud steam | `des.gas_cloud({selection})` | **same** |
| xy `get_location` | `create_gas_cloud` after table xy | **named skip** |
| Ice/Boulder fills | lua bodies | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open selection creator matches `region.c:1311–1336`. Cloud lua matches `themerms.lua:62–69`.

Named omits / do-nots (map / Open, not Must-fix):

1. `lspo_gas_cloud` xy/`coord` `get_location` (special-level pack).
2. Ice/Boulder/Spider/Trap/Garden/… themerms bodies.
3. `run_regions` `hero_inside` bit; mfndpos subset (D-1159 next).
4. Do not restore BFS/`rn1` for selection steam. Do not default lua ttl to `rn1`. Do not pull mfndpos into this SHA — **Addressed:** D-1159 `e42ace32`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: themerms Cloud now lays 1×1 bitmap steam with `create_region` ttl −1 and `floor(n/4)` asleep fog, matching C’s selection creator rather than the BFS/`rn1` sibling.
- Must-fix stays empty for this SHA; next port popped Open mfndpos `m_poisongas_ok`. **Addressed:** D-1159 `e42ace32`. Not Ice fill.
