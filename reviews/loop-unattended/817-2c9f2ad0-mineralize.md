# Review 817 — 2c9f2ad0 — mklev.c mineralize gold/gem loop + bound_digging (D-1847)

## Metadata
- Full / short hash: `2c9f2ad01ed27d5335d7fbd783a043cbf92fbef9` / `2c9f2ad0`
- Parent: `5d89cc96` (D-1846). Map-driven Open: 2 corpus still `mineralize` (Knight/Monk gold `rn2(1000)` vs later `place_lregion`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 07:56:53 +0200
- D-id: **D-1847**
- Stats: `js/mklev.js` +79/−24. `js/` insertions **79** ≤250. Band **80–350**.
- Claims to close: gold/gem skip arithmetic + `bound_digging` / `join` / xstart. **Does not** claim corpus PASS. Names the leftover 1-cell TRC.
- JS / map: `mineralize` / `bound_digging` / `join` / `reset_xystart_size`. `c-js-map/data.md`. Open still `mineralize` (2 corpus).

## Intent vs deliverable

Git subject promises: skip without `continue`; `on_level` walk; `dunlev` 0; `wall_info|flags`; earth `bound_digging`; arboreal `join`; `reset_xystart_size`; post-mineralize `xstart=0` / morgue→graveyard. 1-cell TRC named, not FORCE-stoned.

`node scripts/csym.mjs mineralize` → `mklev.c:1448–1541`. `--callers`: `mklev.c:1550`, `sp_lev.c:3952`. Gold loop `:1501–1540`. `bound_digging` `mkmaze.c:1440–1461` (`mklev.c:1549`). `join` `:438–518` (`:500–501` arboreal). `reset_xystart_size` `sp_lev.c:205–212` (`mklev.c:429`, `:922`, `:1183`). `Is_special` `dungeon.c:1447–1457`.

The diff **does** those loop/topology fixes. It does **not** change `wall_cleanup` / `create_room` paint. D-log Status is **partial**.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `mineralize` gold/gem loop | LIVE repaired | `:1501–1540` |
| `Is_special` walk | CLONE | same as unexported `dungeon.js:2015` |
| `bound_digging` | LIVE | earth return + passwall ring |
| `join` arboreal `ROOM` | LIVE | `:500–501` |
| `reset_xystart_size` call sites | LIVE | clear / after `makerooms` / themerms post |
| `level_finalize_topology` xstart=0 / graveyard | LIVE | `mklev.c:1556–1560` |
| 1-cell `ly=15` HWALL+TRC / `wall_cleanup` | OMIT named | not FORCE |

`node scripts/sym.mjs`:

```
mineralize       js/mklev.js:23731   sync
bound_digging    NOT EXPORTED — 1 LOCAL mklev.js:23871
join             NOT EXPORTED — 1 LOCAL mklev.js:22819
reset_xystart_size NOT EXPORTED — 1 LOCAL mklev.js:1415
on_level         js/dungeon.js:1117   sync
wall_cleanup     NOT EXPORTED — 1 LOCAL mklev.js:23287
create_room      NOT EXPORTED — 1 LOCAL mklev.js:22305
```

FORCE/DIAG/`getRngLog`/`fastforward`/recorded coords in `js/`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Skip arithmetic (`:1503–1506`).** `y+1` not STONE → `y += 2`; else this not STONE → `y += 1`; then the `for` `y++` (net +3 / +2). Parent `continue` after `y += 2` still ran the JS increment (net +3); the live C-wrongs were `s?.dlevel` truthy `Is_special` (dlevel 0 missed) and `dunLevel ?? 1`. New code: `on_level` walk (C `Is_special`), `dunLevel ?? 0` ≡ `dunlev` when `uz` missing. **Match those guards.**

**Gold/gem (`:1507–1539`).** `!(wall_info & W_NONDIGGABLE)` then seven STONE neighbors (no south-center; `y+1` already STONE). `rn2(1000) < goldprob` → `mksobj(GOLD_PIECE)` `1+rnd(goldprob*3)` then `!rn2(3)` buried else `place_object`. Then `rn2(1000) < gemprob` → `for (cnt = rnd(2+dunlev/3); cnt > 0; cnt--)` ROCK `dealloc` else bury/place. JS ORs `wall_info|flags` (C `rm.wall_info` is that field). Neighbor list matches. **Match call-for-call on a STONE cell.** Knight 409 vs 410 is **not** a leftover skip bug: C's extra check is `(77,13)` where JS is HWALL.

**`bound_digging` (`:1446–1460`).** Earth return; `IS_STWALL`; `<=ymin/>=ymax` `W_NONDIGGABLE`; one tile past `W_NONPASSWALL`. JS writes both `wall_info` and `flags`. **Match those rings.**

**`join` (`:500–501`).** `arboreal ? ROOM : CORR`. **Match.** `reset_xystart_size` body already `xstart=1` (`sp_lev.c:208`); new call sites match C `:429` / `:922` / `:1183`. Post-mineralize `gx.xstart=0` + `has_morgue`→`graveyard` **Match `:1556–1560`.**

**Callee closure.** One `mineralize` family + topology callees C runs in `level_finalize_topology`. `mksobj` / `mkobj` / `on_level` LIVE. `Is_special` verified CLONE. `wall_cleanup` OMIT named. No STUB in the gold arm.

## Hallucinations / overclaim

Do **not** stamp `wall_cleanup` or the 1-cell TRC as done. D-log says **NO MOVEMENT** and keeps Open `mineralize` — that is honest leftover, not a vacuous PASS. The gold loop is claimed C-faithful; the named omit is geometry, not a second gold-loop pass. They did **not** ship the `(76,14)/(77,14)` STONE FORCE.

## Density

§2b: gold/gem loop + the topology callees C runs around it (`bound_digging`, `join`, xstart). +79. Did **not** glue `lookat`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify mineralize --base 2c9f2ad0~1` → `2 session(s) blocked`. Summary: **`0 PASS, 0 moved past, 2 unchanged, 0 worse → NO MOVEMENT`** (`tour-Knight-70020-d5-8-15-17-22` still `mineralize` step 3; `tour-Monk-70009-d3-6-10-11-12` still `mineralize` step 12). Matches the D-log. Not presented as PASS.

## Actionable C-wrongs

None that must block the next port as a Must-fix. The leftover is the named `wall_cleanup` / `ly=15` east HWALL+TRC (Open `mineralize`, 2 corpus). Do not re-port the gold loop. Review 813 lookat Must-fix is a different family and stays first.

Verdict: **ACCEPT-WITH-DEBT**
