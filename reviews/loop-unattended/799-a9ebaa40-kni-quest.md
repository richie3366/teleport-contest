# Review 799 — a9ebaa40 — mkmaze.c makemaz Kni-strt/loca/fila/filb (D-1829)

## Metadata
- Full / short hash: `a9ebaa407ad4a25a7311189d83f2217b29b87741` / `a9ebaa40`
- Parent: `c306d211` (D-1828). Map-driven Open. Completes Knight quest 5/5 (`Kni-goal` already lived).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 22:38:44 +0200
- D-id: **D-1829**
- Stats: `js/mklev.js` +453/−3. `js/` insertions **453** >250. Band **80–450**.
- Claims to close: Open remaining four Knight protos. Not Rogue / fakewiz.
- JS / map: `load_kni_strt`/`_loca`/`_fila`/`_filb`. `c-js-map/data.md`. Archive **Addressed:** D-1829 `a9ebaa40`.

## Intent vs deliverable

Git subject promises: only `Kni-goal` existed; C loads `dat/Kni-{strt,loca,fila,filb}.lua`.

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `put_saddle_on_mon` `steed.c:141–163`. `create_altar` shrine `priestini` (`sp_lev.c:2479–2484`). `load_special` `:6453–6502`.

Parent dispatched `Kni-goal` only. The diff **does** add four loaders and proto branches. `Kni-goal` untouched.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_kni_strt` / `_loca` / `_fila` / `_filb` | LIVE new | lua bodies |
| `put_saddle_on_mon` | LIVE callee | `steed.js:278` |
| `priestini` | LIVE clone | loca shrine |
| `splev_initlev` mines | LIVE | strt fg=bg ROOM; loca/fillers ROOM/POOL joined |
| `kniDoor` | CLONE | `sel_set_door` |
| Arthur CUSTOM_INVENT | CLONE | Excalibur+plate via `mksobj_at`+`mpickobj` |
| generic `invent_carrying_monster` | OMIT named | saddle arm shipped |
| humidity / `m_dowear` / flip lregion / `ensure_way_out` | OMIT named | |

`node scripts/sym.mjs`:

```
load_kni_strt    NOT EXPORTED — 1 LOCAL mklev.js:6080
load_kni_loca    NOT EXPORTED — 1 LOCAL :6299
load_kni_fila    NOT EXPORTED — 1 LOCAL :6426
load_kni_filb    NOT EXPORTED — 1 LOCAL :6468
put_saddle_on_mon js/steed.js:278   sync
```

No clone→import. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Kni-strt vs `dat/Kni-strt.lua`.** Solidfill ROOM then mines fg=bg="." lit field. 50×16 Camelot map. COURT `{6,6,22,9}` `filled=2` → `FILL_LVFLAGS`. Downstair 40,7. Fifteen locked/closed doors match `:47–63`. Arthur at 9,7 Excalibur spe=4 blessed + plate spe=4. Chest 9,7. Four knights + six pages. Sleep-gas 24,4 / 25,4 + four random traps. Twelve quasits even-x 14..36 y=0. `for i=1, 2+nh.rn2(3)` warhorses `percent(50)` saddle → JS `2+rn2(3)` then `put_saddle_on_mon` (`:141–163`). Branch levregion (20,14) after flip. **Match those counts / RNG.**

**Kni-loca vs lua.** 15 empty objects. 45 packed MAGIC (JS `magicCells` 9+9+4+9+14) + 7 anti-magic. 17 quasits, `i`, `j`, 7 ochre, `j`. Neutral shrine `priestini`. **Match.**

**Kni-fila / filb.** fila: 8 objects, 4 quasit, `i`, 1 ochre, 4 traps. filb: 11 objects, 4 quasit, `i`, 3 ochre, 4 traps. Random up/down stairs. `noflip` skips `flip_level_rnd`. **Match lua `:16–40`.**

**Callee closure.** Four `makemaz` variants, same family. `put_saddle_on_mon` / `priestini` / `splev_create_*` LIVE. Named OMITs only. No STUB in a shipped arm. Arthur floor-`mksobj_at` then extract is the named generic invent clone, not a silent stub.

## Hallucinations / overclaim

Do **not** stamp generic `invent_carrying_monster`, humidity, or flip-lregion remap. Public Knight sessions do not walk quest start. Vacuous hidden verify is not a corpus PASS.

## Density

§2b: remaining four Knight protos, one `makemaz` family. +453. Did **not** glue Rogue. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base a9ebaa40~1` → `0 session(s) blocked` / `no corpus session is blocked on it`. Queue row was a blank-quest Open. lua counts vs HEAD `:6252–6494`. D-log green + cohort + full 44/44.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
