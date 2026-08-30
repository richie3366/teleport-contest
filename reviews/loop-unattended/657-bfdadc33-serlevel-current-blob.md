# Review 657 — bfdadc33 — save.c savelev JSON serLevel current blob (D-1696)

## Metadata
- Full / short hash: `bfdadc335f20afd6387c72973c94ccfff27d45d7` / `bfdadc33`
- Parent: `c33608ff` (D-1695). This file audits **this SHA only** (fourth of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1696 `bfdadc33`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 01:55:42 +0200
- D-id: **D-1696**
- Stats: `js/lev_json.js` +648; `js/save.js` +36/−250; `js/bones.js` +27/−150; `js/track.js` +14/−4; `js/mkobj.js` +1/−1. Total `js/` insertions **726** >250. Band **200–450**.
- Claims to close: ledger Cluster 2 — `payload.current` + shared codec. Not other `LFILE_EXISTS` (D-1697). Not RANGE_GLOBAL relink (D-1698). `reviews/loop-2026-08-15/` has no unpaid serLevel Must-fix.
- JS / map: new `lev_json.js`; `save.js` / `bones.js` callers. `c-js-map/harness.md`.
- Prior reviews: **655** bones should share `serTraps` — write now does via `serLevel`; load still clones.

## Intent vs deliverable

Git subject promises: JSON save writes a `serLevel` current blob and restore hydrates a GameMap with per-blob timer/light relink, instead of scattered top-level map keys.

`node scripts/csym.mjs` `savelev_core` → `save.c:451–566`. `relink_timers` `timeout.c:2750–2774` (`--callers` `restore.c:725` restgamestate, `:1299` getlev). `relink_light_sources` `light.c:516–563` (`:726` / `:1300`). `find_oid` `shk.c:2776–2804` (`--callers` include `timeout.c:2764`, `light.c:548`). **No `gb.billobjs`.** `savemonchn` `:891–896` `mnum` + `forget_temple_entry`. `restshk` `shk.c:290–305` `bill_p = &bill[0]` unless `-1000`. `savetrapchn` still `:544`.

```1299:1301:nethack-c/upstream/src/restore.c
    relink_timers(ghostly);
    relink_light_sources(ghostly);
    reset_oattached_mids(ghostly);
```

```2776:2804:nethack-c/upstream/src/shk.c
    if ((obj = o_on(id, gi.invent)) != 0) return obj;
    if ((obj = o_on(id, fobj)) != 0) return obj;
    if ((obj = o_on(id, svl.level.buriedobjlist)) != 0) return obj;
    if ((obj = o_on(id, gm.migrating_objs)) != 0) return obj;
    /* fmon / migrating_mons / mydogs minvent; never billobjs */
```

Parent: scattered `dosave0` keys; `serTraps` in `save.js`; bones local `serObj`/`serMon`. The diff **does** `js/lev_json.js` `serLevel`/`deserLevel`, `payload.current`, `levelBlobFromPayload` fallback, `relinkLevelTimersLights` (TIMER_OBJECT via blob fobj/buried/minvent; LS_OBJECT/LS_MONSTER; TIMER_MONSTER throw ≡ C panic), `serMon` LIVE `forget_temple_entry` + `mnum`, `deserMon` `eshk.bill_p`, bones **write** `serLevel(null)`, `peek_track`, export `timer_is_local`. It **does not** switch bones **load** to `deserLevel`. Named ghostly extras (D-0274). It **does not** persist other ledgers.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `serLevel` / `deserLevel` | LIVE JSON analogue of savelev/getlev | snapshot, no FREEING peel |
| `serTraps`/`deserTraps` | LIVE | re-point save.js → `lev_json.js` |
| `serObj`/`serMon` | LIVE | re-point; `serMon` calls `forget_temple_entry` |
| `relinkLevelTimersLights` | LIVE analogue of `:1299–1300` | blob-only `find_oid`; never billobjs |
| `timer_is_local` | LIVE | local → export |
| `peek_track` | LIVE | `save_track` now peeks then clear |
| `light_is_local` (lev_json) | CLONE of D-1695 | LS_MONSTER still timeout.c `mon_is_local` |
| `relinkGlobalTimersLights` | LIVE helper | used D-1698; this SHA exports it |
| bones `try_load_bones` hydrate | CLONE of `deserLevel` | traps via `deserTraps`; no relink |
| other ledgers / RANGE_GLOBAL / worms | OMIT named | |

`node scripts/sym.mjs`:

```
serLevel         js/lev_json.js:649   sync
deserLevel       js/lev_json.js:730   sync
serTraps         js/lev_json.js:34   sync
deserTraps       js/lev_json.js:70   sync
serObj           js/lev_json.js:83   sync
serMon           js/lev_json.js:144   sync
relinkLevelTimersLights js/lev_json.js:423   sync
timer_is_local   js/mkobj.js:824   sync
peek_track       js/track.js:35   sync
forget_temple_entry js/priest.js:48   sync
savemon_edog     js/makemon.js:304   sync
```

Re-points: `serTraps`/`serObj`/`serMon` moved save.js → lev_json; `save.js` re-exports. `--can js/lev_json.js js/mkobj.js timer_is_local` / `js/priest.js forget_temple_entry`; `--can js/save.js js/lev_json.js serLevel`: **ALREADY**. No TDZ. Do **not** add `serTraps` #2 in save.js. Do **not** add `find_oid` walking `billobjs`. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Blob vs scattered.** C `savelev_core` one level file. JS `dosave0` `current: serLevel(null)`. Restore `deserLevel(levelBlobFromPayload)` → `GameMap` + overlay, then `restore_timers`/`restore_light_sources` of the blob lists (later SHAs also install RANGE_GLOBAL). Missing `current` uses old top-level keys. **Match the JSON analogue of one savelev record.** Live `serLevel` **snapshots** (no peel): C `update_file` without this process exiting is WRITING; JS `Sy` continues. **Match WRITING, not FREEING.**

**Traps / damage / cemetery.** `traps: serTraps(...)` — bones write now shares the D-1694 helper (**closes 655 item 1 on the write path**). `damagelist: serDamage` / `deserDamage`. `bonesinfo: savecemetery`. **Match current-level persist.**

**Relink.** C after all mons/objs: `relink_timers` / `relink_light_sources` via `find_oid` / `find_mid(FM_EVERYWHERE)`; panic on miss; TIMER_MONSTER panic. JS `relinkLevelTimersLights` on the blob: TIMER_LEVEL/GLOBAL skip; TIMER_OBJECT `find_oid_in_blob` (fobj, buried, `fmon[].minvent` — **not invent, not billobjs**); LS_* rewrite `id` number → live pointer; miss throws. RANGE_LEVEL objects are not on invent; C `find_oid` invent-first is a no-op for those ids. **Match getlev `:1299–1300` for this blob.** `reset_oattached_mids` named. Ghostly `lookup_id_mapping` is bones; JSON save `ghostly==FALSE`.

**`light_is_local`.** `snapshotLocalLights` uses the **same** LS_MONSTER timeout.c `mon_is_local` as D-1695, not `light.c:373` `mx>0`. Already Must-fix **656**. Do **not** enqueue a second family.

**`serMon`.** C savemonchn sets `mnum` then `forget_temple_entry` then `savemon`. JS `if (ispriest) forget_temple_entry` then copies fields then `out.mnum`. **Match callers.** `save_mtraits` still inlines (D-1695). `savemon_edog` LIVE. EDOG relative times: C `moves_to_relative_time` around Sfo; JSON stores live. Named.

**`restshk`.** C `:292–296` `bill_p != (bill_x *)-1000` then `&bill[0]`. JS `eshk.bill_p !== -1000` then `eshk.bill || []`. Ghostly `assign_level` / `pacify_shk` named (bones). **Match the non-ghostly alias.**

**Bones load.** Write `...levelBlob`. Load still hand-rolls `GameMap` + `deserTraps` + local `deserMon` (no `deserLevel`, no relink). C getbones → `getlev`. Ghostly peace/id-remap **should** stay after a shared getlev. **CLONE of deserLevel.** Named D-0274 extras do not excuse skipping relink.

Callee closure (`dosave0` current). LIVE: `serLevel`, `deserLevel`, `serTraps`, `relinkLevelTimersLights`, `forget_temple_entry`, `timer_is_local`, `peek_track`. CLONE: `light_is_local` (Must-fix 656); bones load. OMIT named: other ledgers; RANGE_GLOBAL install; worms/bubbles/exclusions; `dst` relative; ghostly id map. STUB: **none** on the Sy path. Combined-arm ships for `payload.current`. Not “callee stubbed.”

## Hallucinations / overclaim

Subject “restore hydrates a GameMap with per-blob timer/light relink”: **true for `try_restore_save`.** D-log “bones `write_bonesfile` calls `serLevel`”: **true.** Do **not** stamp “Match C bones `getlev`.” Do **not** stamp “Match C `find_oid` invent.” Do **not** stamp “Match C light.c `mx>0`.” Do **not** add `serTraps` in save.js. Do **not** walk `billobjs` in relink (C panic if a timer pointed there).

## savelev_core order (this SHA’s codec)

C `save.c:451–566` after `update_mlstmv` (D-1695, not this file): `save_timers(RANGE_LEVEL)` → `save_light_sources(RANGE_LEVEL)` → `save_engravings` → `save_region` → `save_worm` → `save_exclusions` → `save_track` → `savelevchn` (rooms/doors/lastseentyp/locations) → `save_traps` (`savetrapchn`) → `saveobjchn(fobj)` → `saveobjchn(buried)` → `savemonchn(fmon)` → `save_worm` leftover → `save_damage` → `save_cemetery` → `saveobjchn(billobjs)`. JS `serLevel` encodes the **current** GameMap analogues: traps (D-1694 helper), objects, buried, monsters, damage, cemetery, lights/timers that `snapshotLocal*` already classified RANGE_LEVEL. It **does not** emit worm/bubbles/exclusions. Named. `peek_track` then clear **Match** C `save_track` consuming the breadcrumb. Rooms/`lastseentyp` ride on the GameMap object already in JSON, not a second Sfo.

**`deserObj` / contained.** C `restobjchn` walks nobj then cobj. JS `deserObj` restores `cobj` recursively. **Match the tree.** `o_id` kept so later `find_oid_in_blob` can relink. C `o_on` is the same walk.

**Ghostly.** C getlev `ghostly` true only for bones: `lookup_id_mapping`, `reset_oattached_mids`, peace. JSON `Sy` restore is `ghostly==FALSE`. Relink panic-on-miss **Match** non-ghostly. Bones **load** still skips this function — Actionable item 1.

**TIMER_LEVEL vs TIMER_OBJECT.** C `relink_timers` skips TIMER_LEVEL/GLOBAL (no object). JS `relinkLevelTimersLights` the same skip. TIMER_OBJECT needs the object on the **level** blob (fobj/buried/minvent), not invent. Pack lamps are RANGE_GLOBAL (D-1698). A floor lamp on this ledger **Match** blob find. Do **not** search `game.invent` here.

C `savelev_core` after `skip_lots` (`save.c:538–547`):

```538:547:nethack-c/upstream/src/save.c
    save_timers(nhfp, RANGE_LEVEL);
    save_light_sources(nhfp, RANGE_LEVEL);
    savemonchn(nhfp, fmon);
    save_worm(nhfp);
    savetrapchn(nhfp, gf.ftrap);
    saveobjchn(nhfp, &fobj);
    saveobjchn(nhfp, &svl.level.buriedobjlist);
    saveobjchn(nhfp, &gb.billobjs);
```

Timers/lights **before** mons/objs. JS snapshots those lists from the live GameMap in the same logical order (peel already happened D-1695). `billobjs` is **not** in `serLevel` current (never `find_oid`). **Match C omission.** `save_worm` named.

## Density

§2b: one savelev JSON codec + callers. +726 is a large file restart, not unrelated subsystems. Did not glue other-ledger `levels{}`.

**`reset_oattached_mids`.** C getlev `:1301` after relink. JS named omit. JSON objects keep `oattached` m_id numbers; live mons have new pointers after deser. **Match Sy if oattached unused**; bones ghostly needs it. Actionable item 1 should run it after `deserLevel` for bones only.

**`save_engravings` / regions.** C savelev writes them. JS GameMap already holds `engravings` / region lists from D-1037-era JSON. `serLevel` does not have to duplicate if `dosave0` already dumps the live map. If `serLevel` **omits** them and restore only overlays `deserLevel` fields, they must survive on the GameMap object. Parent scattered keys; this SHA’s blob must include or inherit them. Named if the blob drops engravings — check `serLevel` keys: traps/objects/mons/damage/cemetery/timers/lights. Engravings riding `game.level` **Match** if overlay keeps them. Do **not** invent a second engraving codec here.

**Worms / bubbles.** C `save_worm` / waterlevel. Named omit. A worm on the current floor would vanish across `Sy` if not in `serMon`. Public sessions have no longworm. Named.

## Verification

Journal: green+strict seed8000/0900; seed0013 99/99 (old-save fallback **and** new `current`); trap-same-floor 17/17; stairs 0015/0700/0014; seed0105 lamp. Public restore **is** hit. Bones load without `deserLevel` **public-unhit**.

## Actionable C-wrongs

1. **Bones `try_load_bones` should `deserLevel` then ghostly** — C getbones → getlev `:1299–1300`. One port: hydrate via `deserLevel(payload)` then keep peace_minded / id remap / seenv wipe. Do **not** skip relink. Named extras stay after getlev.
2. Named / already Must-fix: LS_MONSTER `mx>0` in `snapshotLocalLights` (656); RANGE_GLOBAL (D-1698); other ledgers (D-1697); worms/bubbles; EDOG relative times; `reset_oattached_mids`. Do **not** add `serLevel` #2. Do **not** restore scattered `dosave0` keys as the write path. Do **not** re-port `serTraps` (D-1694). Do **not** relink `billobjs`.

Verdict: **ACCEPT-WITH-DEBT**
