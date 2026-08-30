# Review 660 — 736b74ec — restore.c getlev place / envelope / omoves (D-1699)

## Metadata
- Full / short hash: `736b74ecc7fdb464e3122654a996062e379314bf` / `736b74ec`
- Parent: `e32e222d` (D-1698). This file audits **this SHA only** (seventh of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1699 `736b74ec`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 02:39:38 +0200
- D-id: **D-1699**
- Stats: `js/do.js` +41/−10; `js/save.js` +69/−7; `js/shk.js` +15; `js/jsmain.js` +3/−1. Total `js/` insertions **128** <250. Band **150–350**.
- Claims to close: Cluster 5 getlev post (ledger dog). Not shop/trap-ledger recipes. `reviews/loop-2026-08-15/` has no unpaid getlev Must-fix.
- JS / map: `do.js` `getlev_place_monsters`; `save.js` envelope; `shk.js` `set_residency`. `c-js-map/harness.md`.
- Prior reviews: **658** named getlev place; **659** named Cluster 5.

## Intent vs deliverable

Git subject promises: JSON restore places monsters, restamps other-ledger `omoves` like `restlevelfile`, and runs timers last, instead of `hide_monst` `rnd(10)` on leave-time elapsed.

`node scripts/csym.mjs` getlev body includes `:1177–1220`. `set_residency` `shk.c:271–277` (`--callers` `restore.c:1183`). `place_monster` `steed.c:897–932`. `inven_inuse` `restore.c:112–125`. dorecover envelope `:922–949`. `savelev_core` lev-timestmp `:515–516`. `hideunder` / `restore_cham` / `hide_monst` in the same getlev loop.

```1177:1198:nethack-c/upstream/src/restore.c
    for (x = 0; x < COLNO; x++)
        for (y = 0; y < ROWNO; y++)
            svl.level.monsters[x][y] = 0;
    for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) {
        if (mtmp->isshk)
            set_residency(mtmp, FALSE);
        if (mtmp->m_id == u.usteed_mid) {
            u.usteed = mtmp;
            u.usteed_mid = 0;
        } else {
            if (mtmp->m_id == u.ustuck_mid) {
                set_ustuck(mtmp);
                u.ustuck_mid = 0;
            }
            place_monster(mtmp, mtmp->mx, mtmp->my);
            if (hides_under(mtmp->data) && mtmp->mundetected)
                (void) hideunder(mtmp);
        }
```

```1212:1220:nethack-c/upstream/src/restore.c
        } else if (elapsed > 0L) {
            mon_catchup_elapsed_time(mtmp, elapsed);
        }
        restore_cham(mtmp);
        if (ghostly || (elapsed > 0L && elapsed > (long) rnd(10)))
            hide_monst(mtmp);
```

Parent: no occupancy place; other `omoves` stayed at leave-time so `<` after `Sy` had elapsed>0 → `rnd(10)` hide. The diff **does** `getlev_place_monsters` (residency, steed skip-place, ustuck, `place_monster`, `hideunder`); `restampOtherLedgerOmoves`; JSON restore `catchup(0)` + `inven_inuse` / `vision_reset` / `run_timers` last; `check_special_room` after welcome; stamp `usteed_mid`/`ustuck_mid` on save. It **does not** port `place_wsegs` or `reglyph_darkroom`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getlev_place_monsters` | LIVE | C `:1177–1198` |
| `set_residency` | LIVE | imported; C `:271–277` |
| `place_monster` | LIVE | `steed.js` = `steed.c:897` |
| `hideunder` | LIVE | `mon.js`; clone in monmove pre-existing |
| `set_ustuck` | LIVE | `mhitu.js`; clone in uhitm pre-existing |
| `inven_inuse` | LIVE | local `save.js`; C `:112–125` |
| `getlev_catchup_monsters` | LIVE | elapsed 0 ⇒ no `rnd(10)` |
| `restampOtherLedgerOmoves` | LIVE analogue of restlevelfile timestamp | |
| worms `place_wsegs` / `reglyph_darkroom` | OMIT named | |

`node scripts/sym.mjs`:

```
getlev_place_monsters js/do.js:1280   sync
getlev_catchup_monsters js/do.js:1310   ASYNC — await required
set_residency    js/shk.js:242   sync
place_monster    js/steed.js:943   sync
hideunder        js/mon.js:2750   sync
restore_cham     js/mon.js:2646   ASYNC — await required
set_ustuck       js/mhitu.js:984   sync
check_special_room js/hack.js:1780   ASYNC — await required
inven_inuse      NOT EXPORTED — 1 LOCAL js/save.js:599
run_timers       js/mkobj.js:1241   ASYNC — await required
```

`--can js/do.js js/shk.js set_residency` / `js/steed.js place_monster`: ALREADY. `--can js/save.js js/do.js getlev_place_monsters`: **IN-SCC, VERDICT SAFE** (hoisted function; dynamic import). Do **not** add `place_monster` #2. Do **not** add `set_residency` #2. Do **not** add `hideunder` #3. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Place.** C memset occupancy then the fmon loop. JS `game._level_monsters = new Map()` then the same arms. Steed: C `if (m_id==usteed_mid)` assign, **skip** place/ustuck/hideunder. JS `continue`. **Match `:1184–1188`.** Ustuck inside the non-steed arm. **Match.** `place_monster` LIVE `steed.c`. `hides_under && mundetected` then `hideunder`. **Match `:1196–1197`.** `place_wsegs` named.

**`set_residency`.** C `:271–277` `on_level(shoplevel, uz)` then `rooms[shoproom-ROOMOFFSET].resident`. JS `ESHK` then same. Extra bounds check. **Match getlev `:1182–1183`.**

**Catchup / hide.** C `elapsed > 0` then `mon_catchup`; `restore_cham` always (after REST_LEVELS continue); `hide_monst` if `ghostly || (elapsed > 0 && elapsed > rnd(10))`. JSON restore `catchup(0)` so no hide rng. In-memory `<` after `Sy`: other `omoves` restamped to restore-time `moves` ⇒ elapsed 0. **Match restlevelfile timestamp (`save.c:515–516`).** Current ledger keeps save-time `omoves` (C rereads original current savelev). **Match.**

**Envelope.** C `:922–949` `inven_inuse` → `reglyph_darkroom` (named omit) → `vision_reset` → `vision_full_recalc=1` → `run_timers` → `restoring=0` → mid=0 → `beyond_savefile_load` → `docrt`/`welcome`/`check_special_room`. JS restore does inven/vision/timers/restoring/mids/beyond; jsmain `docrt`/`welcome`/`check_special_room`. **Match order.** `try_restore_save` async; jsmain `await`. **Match.**

**M6.** One `restore_cham` per current `fmon` only; other ledgers stay on stash until `goto_level`. C other `getlev` during dorecover would cham them then `restlevelfile`; JS defers cham to first return. Named analogue; ledger 26/26 says occupancy was the dog.

Callee closure (getlev place + envelope). LIVE: `set_residency`, `place_monster`, `hideunder`, `set_ustuck`, `restore_cham`, `inven_inuse`, `run_timers`, `check_special_room`. OMIT named: worms, `reglyph_darkroom`, ghostly peace (bones). STUB: **none**. Combined-arm ships. Not “callee stubbed.”

## Hallucinations / overclaim

Subject “instead of hide_monst rnd(10) on leave-time elapsed”: **true** (private ledger 25/26 → 26/26). D-log “M6 one restore_cham per current fmon”: **true**, not “Match C other-ledger cham during dorecover.” Do **not** stamp “Match C `place_wsegs`.” Do **not** stamp “Match C `reglyph_darkroom`.” Do **not** add `place_monster` in do.js. Dynamic import is cycle-safe, not a clone.

## Density

§2b: one getlev place + dorecover envelope + restlevelfile timestamp. Related. +128.

## Verification

D-log: green+strict; seed0013 99/99; seed0105; stairs; trap-same-floor 17/17; cohort 1500/1800/0012/0004/0007/2200/0383. Private ledger **26/26**; catchup **30/30**. Public restore **is** hit (seed0013). Other-floor `<` after `Sy` is **public-unhit** (private ledger).

## Actionable C-wrongs

None for Must-fix. Named: `place_wsegs`; `reglyph_darkroom`; ghostly peace/`set_malign`; shop/trap-ledger recipes; `hideunder` clone in monmove; `set_ustuck` clone in uhitm. Do **not** add `set_residency` #2. Do **not** `rnd(10)` when elapsed is 0. Do **not** restamp **current** `omoves`. Do **not** insert other-ledger timers into `_timer_base` here. Do **not** re-port RANGE_GLOBAL (D-1698).

Verdict: **ACCEPT-WITH-DEBT**
