# Review 658 — c0395a16 — save.c dosave0 JSON other LFILE_EXISTS ledgers (D-1697)

## Metadata
- Full / short hash: `c0395a16e2f8d554c5bbee6ad4a182d6821a70e2` / `c0395a16`
- Parent: `bfdadc33` (D-1696). This file audits **this SHA only** (fifth of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1697 `c0395a16`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 02:10:11 +0200
- D-id: **D-1697**
- Stats: `js/save.js` +101/−2; `js/dungeon.js` +13; `js/o_init.js` +1/−22. Total `js/` insertions **115** <250. Band **150–350**.
- Claims to close: Cluster 3 other-floor JSON. Not RANGE_GLOBAL (D-1698). Not getlev place/`restore_cham` (D-1699). `reviews/loop-2026-08-15/` has no unpaid ledger Must-fix.
- JS / map: `save.js` `serOtherLevels`/`serLinfo`/`restoreOtherLedgers`; `maxledgerno` export. `c-js-map/harness.md`.
- Prior reviews: **657** named other ledgers.

## Intent vs deliverable

Git subject promises: JSON save walks other `LFILE_EXISTS` ledgers into `payload.levels`, instead of `mklev` on restore-then-`<`.

`node scripts/csym.mjs dosave0` → `save.c:73–234`. Other-level loop `:185–215`. `--callers`: `cmd.c:5200`, `end.c:448`, `save.c:56`. `save_dungeon` linfo `:172–176`. `maxledgerno` `dungeon.c:1391–1396` (`--callers` include `save.c:185`, `dungeon.c:172`). `ledger_no` `:1374–1379`. `dorecover` other-level `:869–888` then current `getlev` `:898`.

```185:215:nethack-c/upstream/src/save.c
    for (ltmp = (xint8) 1; ltmp <= maxledgerno(); ltmp++) {
        if (ltmp == ledger_no(&gu.uz_save))
            continue;
        if (!(svl.level_info[ltmp].flags & LFILE_EXISTS))
            continue;
        ...
        getlev(onhfp, svh.hackpid, ltmp);
        savelev(nhfp, ltmp);
        delete_levelfile(ltmp);
    }
```

```172:176:nethack-c/upstream/src/dungeon.c
        count = maxledgerno();
        Sfo_int(nhfp, &count, "level_info_count");
        for (i = 0; i < count; ++i)
            Sfo_linfo(nhfp, &svl.level_info[i], "svl.level_info");
```

Parent: `payload.current` only. `o_init.js` cloned `ledger_no`/`maxledgerno`. The diff **does** `serOtherLevels` (`ltmp=1..maxL`, skip current, `LFILE_EXISTS`, `serLevel(info)`), `serLinfo` `i < maxledgerno()`, synthesize current `VISITED|LFILE_EXISTS`/`omoves`, `restoreOtherLedgers` into `level_info` with `deserLevel` (relink on blob, **not** `_timer_base`), `maxledgerno` export, o_init import. Persist `tune`/`inv_pos`/`dungeon_topology`. Missing `levels` = old save. It **does not** `getlev` other floors into the live map / zero `u.uz`. Named JSON analogue of per-level files. It **does not** port getlev place/`hideunder`/`restore_cham` (later D-1699; D-log 25/26 dog).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `serOtherLevels` | LIVE analogue of `:185–215` | stash `serLevel`, not open_levelfile |
| `serLinfo` | LIVE analogue of `:172–176` | `i < count` not `<=` |
| `restoreOtherLedgers` | LIVE analogue of `:869–888` | M2: no live timer insert |
| `maxledgerno` | LIVE | o_init clone → `dungeon.js` import |
| `ledger_no` | LIVE | same re-point; **7 leftover clones** elsewhere |
| `serLevel`/`deserLevel` | LIVE | D-1696 |
| getlev place/`restore_cham` | OMIT named | D-1699 |
| RANGE_GLOBAL | OMIT named | D-1698 |

`node scripts/sym.mjs`:

```
maxledgerno      js/dungeon.js:608   sync
ledger_no        js/dungeon.js:598   sync
             !! ALSO 7 LOCAL CLONE(S) — IMPORT; do NOT add another
               js/dig.js:244  js/do.js:1184  js/mon.js:1255  js/muse.js:835  js/potion.js:1662  js/shknam.js:280  …and 1 more
serOtherLevels   NOT EXPORTED — 1 LOCAL js/save.js:139
serLinfo         NOT EXPORTED — 1 LOCAL js/save.js:155
restoreOtherLedgers NOT EXPORTED — 1 LOCAL js/save.js:170
```

Deleted o_init locals (clone → import). `--can js/save.js js/dungeon.js maxledgerno` / `js/o_init.js js/dungeon.js maxledgerno`: **ALREADY**. Do **not** add `maxledgerno` #3 in o_init. Do **not** add `ledger_no` #9. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Walk.** C `:185` `ltmp = 1; ltmp <= maxledgerno()`; skip `ledger_no(&uz_save)`; skip `!LFILE_EXISTS`; `getlev` from a **level file** then `savelev` into the save. JS has no NHFILE per ledger: `goto_level` already stashed `level_info[ltmp]`. `serLevel(info)` is the JSON analogue of savelev of that stash. **Match which ledgers are written.** C also `delete_levelfile` after copy; JS has nothing to delete. Named.

**`linfo`.** C count = `maxledgerno()`; loop `i < count` so index `maxledgerno()` is **not** in the array. JS the same. Comment in `dungeon.js` is accurate. Restore copies `flags` then ORs `LFILE_EXISTS|VISITED` on hydrated blobs. C `restlevelfile` marks the level file present. **Match flags for return visits.**

**`maxledgerno`.** C `:1391–1396` last dungeon `ledger_start + num_dunlevs`. JS `duns[n-1]`. **Match.** Empty `n_dgns` → 0 (C would index `dungeons[-1]` if called too early; JS guards).

**Restore order.** C: other `getlev`+`restlevelfile` loop, rewind, `getlev` current. JS: `restoreOtherLedgers` then `deserLevel` current. Others stay on `level_info`; timers/lights **not** pushed onto live bases (M2 — C other getlev would restore then savelev-FREEING peel). **Match “not live” for others.** Missing `levels` skips the loop (seed0013 current-only). **Match old-save.**

**C `u.uz` zero while copying others** (`:179–183` / `:218`). JS never loads others into the live `GameMap`. No `set_ustuck` / steed clear for that dance. Named analogue.

Callee closure (other-ledger arm). LIVE: `maxledgerno`, `ledger_no`, `serLevel`, `deserLevel`, `LFILE_EXISTS`/`VISITED`. CLONE: none new (`o_init` clone **deleted**). OMIT named: NHFILE getlev/savelev/delete; getlev place (D-1699); RANGE_GLOBAL; shop/trap-ledger recipes. STUB: **none**. Combined-arm ships. Not “callee stubbed.”

**`i < maxledgerno()`.** C `save_dungeon` / rest linfo loop is `i < maxledgerno()`, **not** `<=`. Ledger 0 unused. JS `for (i = 1; i < maxledgerno(); i++)` if that is how they walk — confirm they never persist `linfo[maxledgerno()]`. C `maxledgerno()` is last **valid** ledger. **Match the exclusive end.** `tune`/`inv_pos` on `save_dungeon` extras are dungeon metadata, not `levels{}` blobs.

**RNG.** Other-ledger persist is memcpy of already-generated maps. No `rn2` in this SHA. `mklev` on a missing blob would consume RNG — this peel **stops** that for `LFILE_EXISTS`. **Match.**

## Hallucinations / overclaim

Subject “instead of mklev on restore-then-<”: **true** when `levels{}` exists (private ledger geometry). D-log “dog 1-cell miss is Cluster 5”: **true** — this SHA does not claim `place_monster`. Do **not** stamp “Match C `open_levelfile`/`delete_levelfile`.” Do **not** stamp “Match C `restlevelfile` omoves restamp” (D-1699). Do **not** add `ledger_no` in o_init. `tune`/`inv_pos` persist is `save_dungeon` extras, not the Open line — honest extras.

## Density

§2b: one `dosave0` other-ledger loop + `linfo` + `maxledgerno` re-point. Related. +115. Did not glue RANGE_GLOBAL.

## Verification

Journal: green+strict; seed0013 99/99; seed0015 in-session stairs; trap-same-floor 17/17; private ledger **25/26** (geometry restored, dog cell = Cluster 5). Public restore **does not** leave then `<` after `Sy`. Path **public-unhit** for other-floor JSON; private ledger is the proof.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): leftover `ledger_no` clones (do/dig/mon/…); getlev place/`hideunder`/`restore_cham` (D-1699); RANGE_GLOBAL (D-1698); shop/trap-ledger; C `u.uz` zero dance. Do **not** add `maxledgerno` #2. Do **not** insert other-ledger timers into `_timer_base` here. Do **not** persist index `maxledgerno()` in `linfo`. Do **not** re-port `serLevel` (D-1696). Do **not** mklev a visited floor that has `LFILE_EXISTS`.

Verdict: **ACCEPT-WITH-DEBT**
