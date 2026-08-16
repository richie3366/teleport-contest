# Review 64 — 130e7e21 — `db_under_typ` / `waterbody_name` `SURFACE_AT` (D-1103)

## Metadata
- Full / short hash: `130e7e21d57b2d6ddb2a743578a50a944331aa4f` / `130e7e21`
- Parent: `ebe1f041` (D-1102). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 20:14:37 +0200
- D-id: **D-1103**
- Stats: 15 files, +156 / −70 — `js/hack.js` +40 / −4 (`db_under_typ` + `SURFACE_AT` + `waterbody_name` typ); `js/pickup.js` +18 / −18 (drop local `surface_at` stub).
- Claims to close: Open queue `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` `SURFACE_AT` (named from D-1077 review **38**). Not `goodpos`. Stamped **Addressed:** D-1103 `130e7e21` on the archive row (chicken-egg on this SHA; D-1104 filled it). Also stamped reviews **38** item 4 / **51** item 2 / **52** item 5. Filled D-1102 hash `ebe1f041`.
- JS / map: `hack.js` `waterbody_name` / `db_under_typ`; `pickup.js` `describe_decor`. `c-js-map/data.md` / `turns.md`. hideunder macros / display DRAWBRIDGE_UP glyphs still named.
- Prior reviews this SHA claims to close: **38** / **51** / **52** named `db_under_typ` / `SURFACE_AT`.

## Intent vs deliverable

Git subject promises: “Match C dbridge.c db_under_typ so waterbody_name names the surface under a raised drawbridge.” Body: `SURFACE_AT` maps `DRAWBRIDGE_UP` through the mask instead of leaving the span as generic `"water"`; `describe_decor` uses the same helper.

Old JS `waterbody_name` switched on raw `lev.typ`. `DRAWBRIDGE_UP` matched none of LAVAPOOL / ICE / POOL / MOAT / WATER / LAVAWALL and fell through to `"water"`. C `pager.c:569` uses `SURFACE_AT` → `db_under_typ(drawbridgemask)`. `pickup.js` had a local `surface_at` that returned `DRAWBRIDGE_UP` as-is.

The diff **does** that: shared `db_under_typ` (ICE / LAVAPOOL / MOAT; default STONE) + `SURFACE_AT`; `waterbody_name` reads `SURFACE_AT`; `describe_decor` imports it and deletes the stub.

It does **not** port display.c DRAWBRIDGE_UP → S_pool/S_lava/S_ice glyphs, `classify_terrain`, hideunder `IS_POOL` macros, or `is_ice` DRAWBRIDGE_UP+`DB_ICE` shared. Named. It does **not** rewrite `describe_decor`’s `dfeature_at` / waterhere-rename (pickup header still names that).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `db_under_typ` | C callee, **new** | `dbridge.c:116–128`; exported from `hack.js` |
| `SURFACE_AT` | C macro, **new** | `rm.h:146–149`; exported from `hack.js` |
| `waterbody_name` | C body, **retouched** | `pager.c:561–611`; typ via `SURFACE_AT` |
| `describe_decor` | C caller, **retouched** | `pickup.c:376` `ltyp = SURFACE_AT` |
| local `surface_at` | **deleted stub** | used to return `DRAWBRIDGE_UP` raw |
| `DB_MOAT` / `DB_LAVA` / `DB_ICE` / `DB_FLOOR` / `DB_UNDER` | C bits, **imported** | `const.js` ≡ `rm.h:291–295` |
| hideunder / trap `is_pool_or_lava` | C macros, **named omit** | still `IS_POOL`/`IS_LAVA` typ |
| display DRAWBRIDGE_UP cmap | C, **named omit** | not this SHA |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No RNG** in the new helpers.

## Constitution / playbook

Grep of the `js/hack.js` / `js/pickup.js` hunks: no trace-index gates, no recorded coordinates. `DB_*` are `rm.h` masks (`DB_MOAT=0`, `DB_UNDER=28`), not trace constants. Deleting the DRAWBRIDGE_UP-as-typ stub is the C fix, not a seed-shaped rename. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### `db_under_typ` switch

C `dbridge.c:116–128`:

```
switch (mask & DB_UNDER) {
case DB_ICE:  return ICE;
case DB_LAVA: return LAVAPOOL;
case DB_MOAT: return MOAT;
default:      return STONE;
}
```

JS `790–800`: `(mask | 0) & DB_UNDER` then the same four arms. `DB_MOAT` is **0** (`rm.h:291` ≡ `const.js:2125`). A raised bridge over water (`mask & 28 == 0`) hits `case 0` → MOAT, not the default. `DB_FLOOR` is 16; `16 & 28 == 16` → default STONE. Direction bits sitting beside `DB_UNDER` are stripped by the mask. D-log “under-typ switch ± DIR; DB_FLOOR → STONE.” Match.

Missing JS `drawbridgemask` (`undefined|0 === 0`) would name as MOAT. C `levl[][].drawbridgemask` is a bitfield on a real cell. JS drawbridge cells already carry the mask from D-1090/D-1077. Not Must-fix.

### `SURFACE_AT`

C `rm.h:146–149`:

```
#define SURFACE_AT(x,y) \
    ((levl[x][y].typ == DRAWBRIDGE_UP) \
     ? db_under_typ(levl[x][y].drawbridgemask) \
     : levl[x][y].typ)
```

JS `808–815`: missing cell → STONE (C `levl[][]` always exists after `isok`); `typ === DRAWBRIDGE_UP` → `db_under_typ(drawbridgemask)`; else `typ|0`. `DRAWBRIDGE_DOWN` is **not** rewritten (C same — down is the bridge surface, not the under-typ). POOL/MOAT/LAVAPOOL pass through. Match.

### `waterbody_name` after the typ swap

C `pager.c:567–610`: `ltyp = SURFACE_AT`; LAVAPOOL molten; ICE ice / hallu frozen; POOL pool of; MOAT hallu-deep / medusa shallow sea / juiblex swamp / samurai qstart pond / else moat; waterwall; lavawall; default `"water"`.

JS `823–852`: same arms. Raised lava bridge now returns `molten ${hliquid('lava')}` instead of `"water"`. Raised moat → moat/pond/swamp/sea. Raised ice → `"ice"`. Raised floor (`DB_FLOOR` → STONE) still default `"water"` — C same (STONE is not a waterbody arm). Hallu / medusa / juiblex / samurai qstart / waterlevel wall unchanged. Match for the claimed typ source.

`waterbody_name` still `isok` → `"drink"` first (`pager.c:567–568`). `SURFACE_AT` is not reached off-map. Match.

### `describe_decor`

C `pickup.c:376`: `ltyp = SURFACE_AT(u.ux, u.uy);` then `dfeature_at`. JS `192` now calls the shared helper. Walking onto a raised lava span: `ltyp` is LAVAPOOL, not DRAWBRIDGE_UP, so `prev_decor` comparison and `IS_FURNITURE` see the under-typ like C. The deleted stub returned DRAWBRIDGE_UP, so mention_decor treated every raised bridge as one furniture class.

C still uses `dfeature_at` on the **map** typ (bridge glyph / feature string), not `waterbody_name`, for the spoken `dfeature`. JS same — pickup header still names waterhere-rename / `waterbody_name` swamp rewrite as deferred. This SHA only fixes `ltyp`. Not a silent claim that farlook and mention_decor now share every string.

`IS_POOL(iflags.prev_decor)` ice-from-pool skip (`pickup.c:384–386`) now sees a prior raised-moat as MOAT (pool-class via `IS_POOL`) if that is what `SURFACE_AT` stored. C same once `prev_decor` is the under-typ. Match for the `ltyp` assignment.

`hliquid` / Hallucination / `Is_medusa_level` / `Is_juiblex_level` / samurai `Is_qstart` were already in `waterbody_name` (D-0928 #1163). This SHA only changes which `typ` those arms see. A raised juiblex swamp span is `DB_MOAT` → MOAT → `"swamp"` like a real MOAT cell. C same. `Role_if(PM_SAMURAI)` JS still uses `game.urole.mnum === PM_SAMURAI` plus `qstart_level` dnum/dlevel — pre-existing, not a D-1103 invention.

Shared export vs keeping `db_under_typ` private to `hack.js`: C’s function is in `dbridge.c` and `SURFACE_AT` is an `rm.h` macro used from pager and pickup. JS has no `dbridge.js`; `is_pool`/`is_lava`/`is_moat` already live in `hack.js` (D-1090/D-1077). Putting the under-typ helper next to those is the existing module split, not a new file. `pickup.js` importing `SURFACE_AT` matches C including `rm.h`. Cycle-free (`hack.js` does not import `pickup.js`).

`ICE` / `LAVAPOOL` / `MOAT` / `STONE` / `DRAWBRIDGE_UP` are `const.js` numbers matching `rm.h` terrain enum order. `DB_ICE=8` is not `ICE` the terrain typ — the switch maps the mask onto the terrain. Mixing those would name a raised ice span as typ 8 (SDOOR-ish) instead of `ICE`. The port uses `return ICE` in the `DB_ICE` arm. Match.

`is_pool` / `is_lava` / `is_moat` are **not** rewritten here. They already special-case `DRAWBRIDGE_UP` + mask (D-1090 / D-1077). `SURFACE_AT` is the look/decor path; the movement predicates stay the dedicated helpers. Using `SURFACE_AT === MOAT` as a substitute for `is_moat` would skip the juiblex-false in `is_moat` (`dbridge.c:107–110`). The port did not. Match.

Callers of `waterbody_name` outside this SHA (`pager.js` farlook, `hack.js` ice_descr / drown strings) pick up the under-typ automatically because they already imported the function. No second DRAWBRIDGE_UP switch was added. `ice_descr` still asks `waterbody_name` for the frozen-liquid noun (`pager.c:634`) — raised ice now yields `"ice"` / hallu `"frozen water"` instead of default `"water"`. C same once `SURFACE_AT` is ICE.

## Hallucinations / overclaim

“Match C so waterbody_name names the surface under a raised drawbridge” is **true for `db_under_typ`, `SURFACE_AT`, lava/moat/ice/floor under-typ, and `describe_decor`’s `ltyp`.** It is **not** true that hideunder / trap `is_pool_or_lava` use `is_pool()`/`is_lava()`, that display maps DRAWBRIDGE_UP to S_lava, or that `describe_decor` rewrites `"pool of water"` through `waterbody_name`.

This is **not** “Match C dispatch, callee is a stub.” `db_under_typ` is the real switch; `SURFACE_AT` is the real macro expansion. Stamping **Addressed:** D-1103 is fair. Hash `130e7e21` is on the archive row (filled by D-1104).

## Density (§2b)

One Open cluster: C’s under-typ helper + the two callers the queue named (`waterbody_name`, `describe_decor`). ~40 executable lines in `hack.js` plus a stub deletion. Sibling hideunder macros / display glyphs correctly left named. Not “finish dbridge.c.” Right size.

Deleting the pickup stub in the same SHA is the second caller, not a second hypothesis. Leaving `describe_decor`’s `dfeature_at` string path untouched is the correct split: C assigns `ltyp = SURFACE_AT` and `dfeature = dfeature_at(...)` as two different values. A peel that also rewrote `dfeature_at` for DRAWBRIDGE_UP would have been a second family (display/feature names), not this Open line.

## Verification

Journal: private canary **46**/46 (under-typ switch ± DIR; SURFACE_AT UP/DOWN/POOL/missing; waterbody lava/moat/ice/floor; medusa/juiblex/samurai/waterlevel; hallu frozen/deep); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (no public raised-bridge look). Cadence fortress is not a drawbridge-look proof.

C read of `dbridge.c:116–128`, `rm.h:146–149` / `291–295`, `pager.c:561–611`, `pickup.c:353–376`; JS `hack.js:785–852`, `pickup.js:183–227`, `const.js:2125–2129`; hunk grepped FORCE/fs/seed.

| Case | C | old JS | new JS |
|------|---|---------|--------|
| UP + `DB_LAVA` look | molten lava | `"water"` | **molten lava** |
| UP + `DB_MOAT` look | moat (or pond/sea/swamp) | `"water"` | **moat/…** |
| UP + `DB_ICE` look | ice | `"water"` | **ice** |
| UP + `DB_FLOOR` look | `"water"` default | `"water"` | **`"water"`** |
| DOWN + lava | lava typ, not under-typ | lava typ | **same** |
| POOL cell | pool of water | pool of water | **same** |
| missing cell `SURFACE_AT` | N/A (`levl` exists) | — | STONE (defensive) |
| UP + `DB_MOAT` juiblex | swamp | `"water"` | **swamp** |
| UP + `DB_ICE` hallu | frozen water | `"water"` | **frozen water** |
| `describe_decor` ltyp UP+lava | LAVAPOOL | DRAWBRIDGE_UP | **LAVAPOOL** |

## Actionable C-wrongs

None that Must-fix this next iter. The under-typ switch and the two named callers match C.

Named omits / do-nots (map / Open, not Must-fix):

1. hideunder / `trap.js` `is_pool_or_lava` still typ macros (named). `is_ice` DRAWBRIDGE_UP+`DB_ICE` local clones.
2. display.c DRAWBRIDGE_UP → S_pool / S_lava / S_ice; `classify_terrain` / `update_lastseentyp`.
3. `describe_decor` waterhere / `waterbody_name` swamp rename (pickup header). Do not pull `dryup` `angry_guards` into this SHA — **Addressed:** D-1104 `7458a5b8` (next SHA).

Do not restore DRAWBRIDGE_UP as raw `waterbody_name` typ. Do not treat `DB_MOAT=0` as “no under-typ.” Do not map `DRAWBRIDGE_DOWN` through `db_under_typ`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a raised drawbridge now names its under-typ through a real `db_under_typ` / `SURFACE_AT` pair in `waterbody_name` and `describe_decor`, while hideunder macros and display glyphs stay named.
- Must-fix stays empty for this SHA; next port popped Open `dryup` `angry_guards` (D-1104).
- Public suite PASS is fortress, not proof of a raised-bridge look.
