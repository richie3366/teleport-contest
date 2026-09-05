# Review 800 — ab55b818 — mkmaze.c makemaz Rog-strt/loca/goal/fila/filb (D-1830)

## Metadata
- Full / short hash: `ab55b818f1516252d2499191ceb1d8b7408df9cc` / `ab55b818`
- Parent: `a9ebaa40` (D-1829). Map-driven Open. Rogue quest 5/5 (none lived).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 22:51:27 +0200
- D-id: **D-1830**
- Stats: `js/mklev.js` +498/−3. `js/` insertions **498** >250. Band **80–450**.
- Claims to close: Open remaining five Rogue protos. Not `process_menu_window` / fakewiz.
- JS / map: `load_rog_strt`/`_loca`/`_fila`/`_filb`/`_goal`. `c-js-map/data.md`. Archive **Addressed:** D-1830 `ab55b818`.

## Intent vs deliverable

Git subject promises: no Rogue quest loaders; C loads `dat/Rog-*.lua`; largest uncovered role (6/44 public).

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `--callers makemaz`: `mklev.c:1270,1272,1274,1285,1289`. `load_special` `sp_lev.c:6453–6502` (`mkmaze.c:1188`). `create_monster` `:1924–2187`; appear_as furniture `:2002–2026`. `nhlib.lua` `math.random` `:5–15`, `shuffle` `:17–21`, `d` `:29–40`.

Parent dispatched zero `Rog-*`. The diff **does** add five loaders and proto branches.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_rog_strt` / `_loca` / `_fila` / `_filb` / `_goal` | LIVE new | lua bodies |
| `lua_random2` / `nhlib_shuffle` / `selection_floodfill` / `selection_rndcoord` | LIVE | streets + wanderers |
| `l_create_object` | LIVE callee | `mklev.js:14876` |
| `mimicDown` appear_as | CLONE | `M_AP_FURNITURE` + `S_dnstair` |
| generic `splev_create_monster` appear_as | OMIT named | local staircase only |
| generic `invent_carrying_monster` | OMIT named | Master leather/dagger clone |
| humidity / `m_dowear` / flip lregion / `ensure_way_out` | OMIT named | |

`node scripts/sym.mjs` (no clone→import in this SHA):

```
load_rog_strt    NOT EXPORTED — 1 LOCAL mklev.js:6641
load_rog_loca    NOT EXPORTED — 1 LOCAL :6815
load_rog_fila    NOT EXPORTED — 1 LOCAL :6893
load_rog_filb    NOT EXPORTED — 1 LOCAL :6951
load_rog_goal    NOT EXPORTED — 1 LOCAL :7010
lua_random2      NOT EXPORTED — 1 LOCAL :14233
nhlib_shuffle    NOT EXPORTED — 1 LOCAL :21798
l_create_object  js/mklev.js:14876   sync
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Rog-strt vs `dat/Rog-strt.lua`.** Solidfill STONE + mazelevel/noteleport/hardfloor/nommap. 76×21 map string matches `:18–39`. Floodfill streets at (0,12). Four exits `{33,0},{0,12},{25,20},{75,5}` then `nhlib_shuffle` (`:17–21`, `j=1+rn2(i)`). Downstair at `place[1]`; three mimics `appear_as ter:staircase down` → C `create_monster` `:2016–2026` `defsyms[].explanation` / JS `S_dnstair` (26). 14 locked + 32 closed doors including lua’s duplicate `(23,14)` twice. Master of Thieves (36,11) leather spe=5, silver dagger spe=4, `d(2,4)` daggers spe=2 not-cursed — lua `d` is `math.random(1,faces)` twice (`nhlib.lua:29–40`), **not** `rnd.c` `d()`; JS `lua_random2(1,4)+lua_random2(1,4)` with `lo+rn2(hi-lo+1)` ≡ `math.random(lo,hi)` (`:5–10`). Chest 36,11. Nine thugs. 16 traps. Eight exit lep/nymph. `math.random(4,7)` nymph+lep pairs + `math.random(7,10)` chameleons on `rndcoord(1)`. Branch (19,9) after flip (named flip-lregion omit). **Match those counts / RNG.**

**Rog-loca.** 1 cursed teleport + 14 empty objects, 6 traps, 17 leprechaun + `l` + 7 guardian naga + 3 `N` + 5 chameleon. **Match lua `:44–99`.**

**Rog-fila / filb.** lua files are identical six ordinary rooms + `random_corridors`. JS room stock matches `:6–64` both files. **Match.**

**Rog-goal.** noteleport map. `levregion` stair-up `region_islev=1` exclude `{01,18,04,20}`. Spiked pit 37,7. Blessed named Master Key 38,10. Chameleon tin 26,12. 13 empty objects, 11 random traps. Master Assassin 38,10. 16 lep + 2 `l` + 8 naga + 3 `N` + 5 chameleon. Four sharks at lua coords. **Match `:37–110`.**

**Callee closure.** Five `makemaz` variants, one family. `l_create_object` / `lua_random2` / `nhlib_shuffle` / floodfill LIVE. Named OMITs only. Mimic `S_dnstair` is a verified CLONE of `M_AP_FURNITURE` + `"staircase down"`, not a silent stub.

## Hallucinations / overclaim

Do **not** stamp generic `appear_as`, `invent_carrying_monster`, humidity, or flip-lregion remap. Public Rogue sessions do not walk quest start. Vacuous hidden verify is not a corpus PASS.

## Density

§2b: remaining five Rogue protos, one `makemaz` family. +498. Did **not** glue `process_menu_window`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base ab55b818~1` → `0 session(s) blocked` / `no corpus session is blocked on it`. Queue row was a blank-quest Open (0 corpus blocks). lua vs HEAD `:6641–7100`. D-log green + cohort + full 44/44.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
