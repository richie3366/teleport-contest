# Review 683 — 55932af9 — do.c goto_level cant_go_back FREEING (D-1722)

## Metadata
- Full / short hash: `55932af947e3a0fce9efdf74ade6afdc4ed1bb2d` / `55932af9`
- Parent: `48ddbfc8` (D-1721). This file audits **this SHA only** (sixth of nine `js/` commits since review **677**). Archive **Addressed:** D-1722 `55932af9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 08:34:27 +0200
- D-id: **D-1722**
- Stats: `js/do.js` +87/−49; `js/dog.js` +47/−1; `js/dungeon.js` +15; `js/files.js` +36/−1; `js/mon.js` +1/−1. Total `js/` insertions **186** <250. Band **150–350**.
- Claims to close: Open `cant_go_back` FREEING after D-1721 / reviews **670** / **656** (always WRITING-stash + unconditional `update_mlstmv`). Not binary NHFILE `savelev_core`. Not `free_luathemes`. `reviews/loop-2026-08-15/` has no unpaid cant_go_back Must-fix.
- JS / map: `do.js` `goto_level`; `files.js` `delete_levelfile`; `dungeon.js` `remdun_mapseen`; `dog.js` `discard_migrations`; `mon.js` export `discard_minvent`. `c-js-map/turns.md`.
- Prior: **670** named `cant_go_back` skip of `update_mlstmv`; **656** named FREEING vs WRITING|FREEING.

## Intent vs deliverable

Git subject promises: endgame/tutorial leave uses FREEING (no persist) plus `delete_levelfile` / `remdun_mapseen` / `discard_migrations`, instead of always WRITING-stashing.

`node scripts/csym.mjs goto_level` body includes `do.c:1640–1664`. `--callers delete_levelfile` include `:1657`. `--callers remdun_mapseen` include `:1661`. `--callers discard_migrations` only `do.c:1663`. `delete_levelfile` `files.c:718–730`. `remdun_mapseen` `dungeon.c:2810–2832`. `discard_migrations` `dog.c:935–990`. `leaving_tutorial` set `do.c:1511–1514`. `WRITING`/`FREEING` `hack.h:960–961` (`0x02` / `0x04`).

```1640:1664:nethack-c/upstream/src/do.c
    cant_go_back = ((newdungeon && In_endgame(newlevel)) || leaving_tutorial);
    if (!cant_go_back) {
        update_mlstmv(); /* current monsters are becoming inactive */
        if (nhfp->structlevel)
            bufon(nhfp->fd);       /* use buffered output */
    } else {
        free_luathemes(leaving_tutorial ? tut_themes : most_themes);
    }
    save_mode = nhfp->mode;
    nhfp->mode = cant_go_back ? FREEING : (WRITING | FREEING);
    savelev(nhfp, ledger_no(&u.uz));
    nhfp->mode = save_mode;
    close_nhfile(nhfp);
    if (cant_go_back) {
        for (l_idx = maxledgerno(); l_idx > 0; --l_idx)
            if (!leaving_tutorial || ledger_to_dnum(l_idx) == tutorial_dnum)
                delete_levelfile(l_idx);
        for (l_idx = 0; l_idx < svn.n_dgns; ++l_idx)
            if (!leaving_tutorial || l_idx == tutorial_dnum)
                remdun_mapseen(l_idx);
        discard_migrations();
    }
```

Parent: always `update_mlstmv` + priest `forget_temple_entry` after `keepdogs`, then always stash `VISITED|LFILE_EXISTS`. No `leaving_tutorial`. The diff **does** set `leaving_tutorial` on the tutorial-leave arm, compute `cant_go_back` with `In_endgame(newlevel)`, gate `update_mlstmv` / priest forget / stash behind `WRITING`, peel RANGE_LEVEL timers/lights on FREEING-only, then the three discard loops. It **does not** call `free_luathemes`. Named. It **does not** `unlink` files (JSON analogue; Rule #2). It **does not** `obfree` migrating objs. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `goto_level` cant_go_back | LIVE repaired | `do.js`; JSON savelev analogue |
| `leaving_tutorial` | LIVE | C `:1514`; JS tutorial(false) arm |
| `update_mlstmv` | LIVE import | now only when `WRITING` |
| `forget_temple_entry` | LIVE import | only when WRITING (`save.c:891–894`) |
| `delete_levelfile` | LIVE JSON analogue | drop stash; no `fs.unlink` |
| `remdun_mapseen` | LIVE | C `#if 1` `notreachable`; does not unlink |
| `discard_migrations` | LIVE | Wizard / endgame dest kept |
| `discard_minvent` | CLONE exported | pre-existing `mkobj.c` clone; mongone already used it |
| `maxledgerno` / `ledger_to_dnum` | LIVE import | dungeon.js; **do not** add teleport.js clone #2 |
| `free_luathemes` | OMIT named | C `:1646` |
| migrating `obfree` | OMIT named | C `dog.c:980–987` |
| `dealloc_monst` | JSON analogue | drop from `migrating_mons`; GC |
| `bufon` / NHFILE | N/A | no binary savelev |
| quest `remdun_mapseen` | OMIT named | `quest.c:203`; `quest.js` still comments it |
| save.c `delete_levelfile` | OMIT named | dosave hangup / other callers |

`node scripts/sym.mjs`:

```
discard_migrations js/dog.js:1112   sync
remdun_mapseen   js/dungeon.js:1745   sync
delete_levelfile js/files.js:421   sync
discard_minvent  js/mon.js:2570   sync
maxledgerno      js/dungeon.js:683   sync
ledger_to_dnum   js/dungeon.js:695   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/teleport.js:2609
update_mlstmv    js/dog.js:342   sync
save_track       js/track.js:53   sync
save_timers      js/mkobj.js:848   sync
save_light_sources js/mkobj.js:909   sync
forget_temple_entry js/priest.js:48   sync
In_endgame       js/const.js:3078   sync
WRITING          js/const.js:1690   sync   export const
FREEING          js/const.js:1691   sync   export const
```

Re-points: `discard_minvent` local → export (same body; mongone still uses it). `--can js/do.js js/files.js delete_levelfile` / dungeon `remdun_mapseen` / dog `discard_migrations` / `js/dog.js js/mon.js discard_minvent` / light `del_light_source`: **ALREADY**. Used **inside** `goto_level` / `discard_migrations`, not at module top. Cycle ≠ TDZ. Do **not** add `ledger_to_dnum` #2 in do.js (import the dungeon export). Do **not** add `discard_minvent` #2. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. JSON drop-stash is the allowed analogue of `unlink`.

## C ↔ JS fidelity

**`leaving_tutorial` (`:1511–1514`).** C `In_tutorial(&u.uz)` then `tutorial(FALSE)`, `up = FALSE`, `leaving_tutorial = TRUE`. JS the same on the `else if (In_tutorial(u.uz))` arm. **Match.** Init `false`. Endgame enter is `newdungeon && In_endgame(newlevel)` — C `:1504` also has an amulet/`earth_level` gate **before** this; JS still skips that gate (pre-existing named mysteryforce/amulet, not this peel).

**Predicate (`:1640`).** C `(newdungeon && In_endgame(newlevel)) || leaving_tutorial`. JS identical (`In_endgame` is astral `dnum`, `const.js:3078`). **Match.** No `rn2`.

**`update_mlstmv` (`:1641–1642`).** C only when `!cant_go_back`. JS `if (save_mode & WRITING)` — equivalent (`WRITING|FREEING` vs `FREEING`). Review **670** named this skip; this SHA closes it. **Match.** Priest `forget_temple_entry` only when `update_file` (`save.c:891–894` = COUNTING|WRITING). JS only walks `fmon` on WRITING. **Match the WRITING guard.** C `bufon` is NHFILE; N/A.

**`savelev` mode (`:1648–1651`).** Ordinary leave still stashes `VISITED|LFILE_EXISTS` + lastseentyp/timers/lights/billobjs (parent JSON analogue). FREEING-only peels `save_timers(RANGE_LEVEL)` + `save_light_sources(RANGE_LEVEL)` without persist — C comment `:1636–1638` still needs cleanup for dangling timers/lights. **Match the JSON analogue of skip_lots + peel.** Not binary `savelev_core` `dealloc_monst` of live `fmon`. Named as analogue, not a stubbed dispatch: the WRITING arm still has the live stash helpers.

**`delete_levelfile` (`:718–730`, loop `:1655–1657`).** C unlink when `lev==0` or `LFILE_EXISTS`, then `&= ~LFILE_EXISTS`. Loop is `maxledgerno()` down to **> 0** (keep #0). Tutorial filter: only ledgers whose `ledger_to_dnum == tutorial_dnum`. JS drops stash pointers, clears `LFILE_EXISTS`, keeps the slot (C keeps `level_info[lev]`). Loop and filter **match**. `lev==0` arm is unused from this caller. Other C callers (`save.c:214/222/223`, unix lock) stay unnamed-as-live — **OMIT** for this peel (no `fs`).

**`remdun_mapseen` (`:2810–2832`, loop `:1659–1661`).** C `#if 1` sets `flags.notreachable = 1` and does **not** unlink the node (`#else` is dead). JS `mptr.flags.notreachable = 1` on `mapseenchn` array. Dungeon loop `0 .. n_dgns-1` with the same tutorial filter. **Match.** Quest caller `quest.c:203` still named in `quest.js`.

**`discard_migrations` (`:935–990`).** C keep `iswiz || In_endgame(&dest)` (`mux`/`muy`); else unlink, `discard_minvent(FALSE)`, `del_light_source(LS_MONSTER)` if `emits_light`, `dealloc_monst`. Objects: keep endgame dest; else unlink, `OBJ_FREE`, `owornmask=0`, **`obfree`**. JS keepMons rebuild; `discard_minvent(mtmp, false)`; `emits_light` + `del_light_source(LS_MONSTER, mtmp)` (pointer id, JSON). Object walk matches unlink/`OBJ_FREE`/`owornmask` and **skips `obfree`**. Named. `discard_minvent` still does not `extract_from_minvent` / `artifact_exists` — pre-existing clone omits, not introduced. **Match the keep/drop predicate.** Not “dispatch ported, callee stubbed” for the Wizard/endgame keep arm.

**Callee closure (cant_go_back arm).** LIVE: `In_endgame`, `update_mlstmv` (ordinary), `delete_levelfile`, `remdun_mapseen`, `discard_migrations`, `maxledgerno`, `ledger_to_dnum`, `discard_minvent` (exported clone), `emits_light` / `del_light_source`. CLONE: `discard_minvent` body (pre-existing; matched enough for mongone). OMIT named: `free_luathemes`, full `obfree`, binary NHFILE, quest remdun, save.c unlink. STUB in the **cant_go_back** arm: **none** (obfree is named omit, not a silent no-op inside a claimed LIVE `obfree`). Combined-arm ships.

**Order vs C (pre-existing, not this peel).** C `check_special_room` then `keepdogs` then `recalc_mapseen` then `vision_recalc` then this block. JS still `keepdogs` then `check_special_room`. C `travelcc` zero is *before* keepdogs; JS still after vision. Not claimed. Do **not** Must-fix as a D-1722 miss.

## Hallucinations / overclaim

Subject “endgame/tutorial leave uses FREEING plus delete/remdun/discard, instead of always WRITING-stash”: **true**. D-log “JSON analogue, not binary NHFILE”: **true**. D-log “`update_file` = COUNTING|WRITING; savemonchn `forget_temple_entry` only when WRITING”: **true** for the JS guard. Do **not** stamp “Match C `free_luathemes`.” Do **not** stamp “Match C `obfree` on migrating objs.” Do **not** stamp “Match C `unlink` / `savelev_core` dealloc.” Do **not** stamp “Match C quest `remdun_mapseen`.” Journal “fortress held” is not an endgame-leave proof. Public stairs sessions are **not** endgame; tutorial/endgame leave is **public-unhit** except via tagged restore oracle.

## Density

§2b: one C `goto_level` cant_go_back envelope + the three C callees that Open named. Same `do.c:1640–1664`. +186. Did not glue `free_luathemes`, binary savelev, or quest remdun. Did **not** invent a filesystem unlink.

## Verification

D-log: save-oracle probe skip untagged `dog.c:cant_go_back`; tagged `do.c:goto_level` → ledger-seed0015 (private 8472/8472); focused seed0015/0700/0014 stairs + seed0013 restore + seed0105 lamp; rng-diff --all-segments seed0013; green+strict; cohort 9/9 + strict. Public **endgame/tutorial leave unhit**. Restore ledger **is** tagged. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open envelope matches C; JSON analogue is named and Rule #2–legal). Named: `free_luathemes` (`do.c:1646`); full migrating `obfree` (`dog.c:980–987`); quest `remdun_mapseen` (`quest.c:203`); save.c / unix `delete_levelfile` callers; binary `savelev_core` dealloc; `discard_minvent` extract/artifact omits (pre-existing). Do **not** add `ledger_to_dnum` #2. Do **not** add `discard_minvent` #2. Do **not** `unlink` / import `fs`. Do **not** restore unconditional `update_mlstmv` + always-stash. Do **not** `break` the tutorial filter into “delete all ledgers on tutorial leave.” Do **not** unlink `mapseenchn` nodes (`#else` is dead C).

Verdict: **ACCEPT-WITH-DEBT**
