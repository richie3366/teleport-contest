# Review 669 — 0c0f29fe — light.c save_light_sources LS_MONSTER mx>0 (D-1708)

## Metadata
- Full / short hash: `0c0f29fea7f737dcd531f1d1fd9f2a2afd5b0372` / `0c0f29fe`
- Parent: `2fe0b09c` (audit #2110 of D-1693–D-1707). This file audits **this SHA only** (first of nine `js/` commits since review **668**). Archive **Addressed:** D-1708 `0c0f29fe`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 05:32:26 +0200
- D-id: **D-1708**
- Stats: `js/mkobj.js` +21/−3; `js/lev_json.js` +25/−16 net in the light helpers. Total `js/` insertions **27** <250. Band **150–350**.
- Claims to close: review **656** Actionable #1 (`light.c` LS_MONSTER `mx > 0`, not timeout.c migrating/mydogs). Same predicate in JSON snapshots. Not `update_mlstmv` skip (D-1709). Not `cant_go_back` FREEING. `reviews/loop-2026-08-15/` has no unpaid light-locality Must-fix.
- JS / map: `mkobj.js` `light_is_local` export; `lev_json.js` `snapshotLocalLights` / `snapshotGlobalLights` import it. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **656** QUALITY-RISK Actionable #1. File already stamped `**Addressed:** D-1708 `0c0f29fe``.

## Intent vs deliverable

Git subject promises: mydogs followers with `mx>0` peel RANGE_LEVEL, instead of timeout.c migrating/mydogs.

`node scripts/csym.mjs save_light_sources` → `light.c:420–471`. `--callers`: `save.c:297` RANGE_GLOBAL; `:540` RANGE_LEVEL; `:1101` free. `maybe_write_ls` `:570–603` (`--callers` `:434`/`:436`). `restore_light_sources` `:478–493`. `discard_flashes` `:360–370`. `obj_is_local` `timeout.c:2559–2577`. timeout `mon_is_local` `:2583–2596`. **light.c `:373` `#define mon_is_local(mon) ((mon)->mx > 0)`.**

```373:373:nethack-c/upstream/src/light.c
#define mon_is_local(mon) ((mon)->mx > 0)
```

```449:454:nethack-c/upstream/src/light.c
                case LS_OBJECT:
                    is_global = !obj_is_local(curr->id.a_obj);
                    break;
                case LS_MONSTER:
                    is_global = !mon_is_local(curr->id.a_monst);
                    break;
```

```582:586:nethack-c/upstream/src/light.c
        case LS_OBJECT:
            is_global = !obj_is_local(ls->id.a_obj);
            break;
        case LS_MONSTER:
            is_global = !mon_is_local(ls->id.a_monst);
```

Parent (D-1695): `light_is_local` LS_MONSTER called timeout.c `mon_is_local` (not on migrating/mydogs). JSON had a **second** clone of that wrong test, including `typeof id === 'number' → local`. The diff **does** switch LS_MONSTER to `(mx|0)>0`; treat missing monster id as local (`is_global=0`); export one helper; delete the lev_json clone. It **does not** change timeout `mon_is_local` / `obj_is_local` (timers, OBJ_MINVENT). It **does not** restore `clear_light_sources` on `goto_level`. It **does not** port `update_mlstmv` skip. Named next Must-fix.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `light_is_local` | LIVE export | was unexported; LS_MONSTER now light.c `:373` |
| `save_light_sources` | LIVE peel | comment-only; still `light_is_local === wantLocal` |
| `snapshotLocalLights` | LIVE JSON RANGE_LEVEL write | imports; no peel (C FREEING) |
| `snapshotGlobalLights` | LIVE JSON RANGE_GLOBAL write | same helper; skip local |
| `mon_is_local` | LIVE timeout.c | timers / OBJ_MINVENT **only**; comment now says so |
| `obj_is_local` | LIVE timeout.c | LS_OBJECT still this (extern.h) |
| `discard_flashes` | LIVE | unchanged; LS_OBJECT `!id` before peel |
| lev_json `light_is_local` | deleted clone | re-point → import. Do **not** add clone #3 |

`node scripts/sym.mjs`:

```
light_is_local   js/mkobj.js:890   sync
mon_is_local     js/mkobj.js:789   sync
obj_is_local     js/mkobj.js:805   sync
save_light_sources js/mkobj.js:909   sync
restore_light_sources js/mkobj.js:929   sync
discard_flashes  js/light.js:230   sync
snapshotLocalLights NOT EXPORTED — 1 LOCAL in lev_json.js (the snapshot, not a C-fn clone)
snapshotGlobalLights js/lev_json.js:538   sync
```

Re-points: `lev_json.js` dropped `obj_is_local`/`mon_is_local` imports; added `light_is_local`. Local `function light_is_local` deleted. `--can js/lev_json.js js/mkobj.js light_is_local`: **ALREADY**. `--can js/do.js js/mkobj.js save_light_sources`: **ALREADY**. No new TDZ edge. Do **not** add `light_is_local` #2. Do **not** add `mon_is_local` #2 for lights. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**LS_MONSTER peel.** C `save_light_sources` release (`:443–470`): `is_global ^ (range==RANGE_LEVEL)` removes the other range. `mon_is_local` here is **the light.c macro** (`mx > 0`; comment `(mon->mx == 0) implies migrating`). A follower already copied onto `gm.mydogs` with `mx>0` is **local** → peeled at RANGE_LEVEL onto the left level. Timeout.c `mon_is_local` (`:2583–2596`) walks migrating then mydogs and would return FALSE for that same pointer. Review **656** caught JS using that timeout helper. This SHA: `(mon.mx|0)>0`. **Match `:373` / `:453` / `:586`.**

**Missing id.** C `:445–447`: `!curr->id.a_monst` → `impossible` + `is_global=0` (local). `maybe_write_ls` `:577–580`: same null → `continue` (do **not** write). JS LS_MONSTER `!mon` → `true` (local). In-memory peel **Match release_data**. JSON `snapshotLocalLights` would **include** a no-id monster light; C `maybe_write_ls` would skip it. Camera flashes are LS_OBJECT; JSON still skips `LS_OBJECT && !id` like `discard_flashes`. No-id LS_MONSTER is an `impossible` path. Not a scored-screen fork. Do **not** treat JSON include-vs-skip as a second Must-fix.

**LS_OBJECT.** C uses timeout `obj_is_local` (`extern.h`), including OBJ_MINVENT → timeout `mon_is_local` (mydogs), **not** `mx>0`. JS still `obj_is_local(ls.id)`. Pack lamps OBJ_INVENT → non-local → RANGE_GLOBAL. **Match `:450`.** A minvent lamp on a mydogs follower stays global in both; the monster’s own LS_MONSTER peels. That split is C.

**Unknown type.** C default `:456–459`: `is_global=0` (local) + `impossible`. JS `light_is_local` falls through to `return false` (non-local). Opposite polarity on a bad `ls.type`. `impossible` path. Named as clone-polarity debt, not Must-fix.

**JSON vs in-memory.** C RANGE_LEVEL **writes then FREEING-peels**. JSON snapshots copy without peeling (Game dies after S). Local snapshot `!light_is_local → continue`; global `light_is_local → continue`. Same predicate as the peel. **Match maybe_write_ls polarity.** Deleted `typeof id === 'number'` shortcut: snapshots run on live `ls.id` pointers at save. Restore relink is D-1696/D-1698, not this SHA. Do **not** restore the number→local lie.

**Callee closure (RANGE_LEVEL leave).** LIVE: `discard_flashes`, `light_is_local`, `obj_is_local`, `save_light_sources`. Timeout `mon_is_local` is **not** on the light arm. CLONE: none added. STUB: none. OMIT named: `cant_go_back` FREEING; worms/bubbles/exclusions. Combined-arm ships with the Must-fix callee now LIVE and C-matched.

No RNG in this locus (`rn2`/`rnd`/`rn1`/`d`: none).

## Hallucinations / overclaim

Subject “mydogs followers with mx>0 peel RANGE_LEVEL, instead of timeout.c migrating/mydogs”: **true** for LS_MONSTER. D-log “same predicate in JSON snapshots”: **true** (import, not a third clone). Do **not** stamp “Match C `maybe_write_ls` no-id skip” for LS_MONSTER JSON. Do **not** stamp “Match C default-type `is_global=0`.” Do **not** stamp “Match C `iter_mons`.” Do **not** restore `clear_light_sources` on leave. Do **not** route LS_OBJECT through `mx>0`. Journal “fortress held” is not a fidelity proof; this audit is.

Not a “dispatch ported, callee stubbed” case. The D-1695 dispatch was already live; the **callee predicate** was the C-wrong, and this SHA fixed that predicate.

## Density

§2b: Must-fix **656** #1 alone. +27. Did not glue `update_mlstmv` skip. Related JSON clone retirement is the same predicate, not a second cluster.

## Verification

D-log / journal: save-oracle skip (untagged); predicate smoke (mydogs `mx>0` local, pack lamp global); focused seed0105 lamp + seed0013 restore + seed0015/0700/0014 stairs; green+strict seed8000/0900; cohort 7/7. Public stairs/leave **is** hit. LS_MONSTER follower lights **public-unhit** (same admission as **656**). Pack-lamp keep is seed0105, not yellow-light pets.

## Actionable C-wrongs

None for Must-fix. Named / impossible-path: JSON no-id LS_MONSTER include vs `maybe_write_ls` skip; unknown `ls.type` non-local vs C local; `cant_go_back` FREEING; `update_mlstmv` skip (next SHA). Do **not** add `light_is_local` #2. Do **not** add `mon_is_local` #2. Do **not** restore lev_json `typeof id === 'number'`. Do **not** delete timeout `mon_is_local`. Do **not** restore `clear_light_sources` on `goto_level`. Do **not** re-port RANGE_LEVEL timers (D-1037).

Verdict: **ACCEPT-WITH-DEBT**
