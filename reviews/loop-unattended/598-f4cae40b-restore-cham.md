# Review 598 — f4cae40b — mon.c restore_cham getlev catchup + With_you (D-1637)

## Metadata
- Full / short hash: `f4cae40bd6d32a90c41ec9994d963f22dbb27048` / `f4cae40b`
- Parent: `7f506ccd` (D-1636). This file audits **this SHA only** (eighth of nine `js/` commits since review **590**). Archive **Addressed:** D-1637 `f4cae40b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 08:27:29 +0200
- D-id: **D-1637**
- Stats: `js/do.js` +26/−9, `js/dog.js` +12/−4, `js/mon.js` +13/−3. Band **150–350** (js/ insertions **~51**; id >454 → **200-floor**).
- Claims to close: Open `restore_cham` after D-1636. Not `normal_shape`. Not newcham mleashed. `reviews/loop-2026-08-15/` has no unpaid restore_cham Must-fix.
- JS / map: `mon.js` `restore_cham`; `do.js` `getlev_catchup_monsters`; `dog.js` `mon_arrive_with_you`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **589**/map named getlev `restore_cham`; D-1594 shipped the body without these callers.

## Intent vs deliverable

Git subject promises: getlev catchup and `mon_arrive` With_you await PfSC/`mcan` revert (or re-allow cham via `pm_to_cham`) instead of skipping the call after D-1594.

Pinned C `mon.c` `restore_cham` `:4646–4658` (`node scripts/csym.mjs restore_cham`). `--callers restore_cham`: `restore.c:1217` (getlev loop), `dog.c:464` (`mon_arrive`, **before** usteed return), `zap.c:824` (`montraits`, already live), `extern.h:1828`, comment `:4429`. `youprop.h:355–360` `Protection_from_shape_changers` is `H||E` ≡ `uprops[PROT_FROM_SHAPE_CHANGERS]`. Callees `normal_shape` `:4430–4462`, `pm_to_cham` `:534–546`. D-1594 already live `normal_shape`.

```4646:4658:nethack-c/upstream/src/mon.c
void
restore_cham(struct monst *mon)
{
    if (Protection_from_shape_changers || mon->mcan) {
        /* force chameleon or mimic to revert to its natural shape */
        normal_shape(mon);
    } else if (mon->cham == NON_PM) {
        /* chameleon doesn't change shape here, just gets allowed to do so */
        mon->cham = pm_to_cham(monsndx(mon->data));
    }
}
```

```1200:1220:nethack-c/upstream/src/restore.c
        /* regenerate monsters while on another level */
        if (!u.uz.dlevel || program_state.restoring == REST_LEVELS)
            continue;
        if (ghostly) {
            /* reset peaceful/malign relative to new character */
            ...
        } else if (elapsed > 0L) {
            mon_catchup_elapsed_time(mtmp, elapsed);
        }
        restore_cham(mtmp);
        if (ghostly || (elapsed > 0L && elapsed > (long) rnd(10)))
            hide_monst(mtmp);
```

`--callers restore_cham` `dog.c:464` is **before** `if (mtmp == u.usteed) return` (`:466–467`) and the `when == With_you` place (`:468–480`). After_you already awaited it; this SHA adds With_you.

Old JS: body live (D-1594) + zap `montraits`; `getlev_catchup_monsters` commented `// restore_cham deferred`; With_you placed without the call; PfSC missed `uprops` that `confer_oc_oprop` writes. The diff **does** await the call on catchup (after REST_LEVELS continue, before hide `rnd(10)`) and With_you (before usteed return), and ORs uprops H||E into PfSC. It **does not** port ghostly peace/`set_malign`, hideunder at `place_monster`, worm `place_wsegs`, JSON `try_restore_save` getlev, or `new_were`/`finish_meating` inside `normal_shape`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `restore_cham` | C `:4646–4658`, **LIVE** (callers this SHA) | export mon.js since D-1594 |
| `normal_shape` | C `:4430–4462`, **LIVE** | D-1594; await SHOW_MSG |
| `pm_to_cham` | C `:534–546`, **LIVE** | makemon.js |
| `Protection_from_shape_changers` | C youprop.h `:359–360`, **LIVE** | H\|\|E flats **plus** uprops |
| `getlev_catchup_monsters` | C getlev `:1181–1220` analogue, **LIVE this SHA** | in-memory stash |
| `mon_arrive_with_you` | C dog.c `:468–480` + `:464`, **LIVE this SHA** | |
| `mon_arrive_after_you` | C `:464` then After_you, **LIVE** | already awaited |
| zap `montraits` | C `:824`, **LIVE** | not this SHA |
| ghostly peace / `set_malign` | **OMIT named** | |
| getlev hide `ghostly \|\|` | **OMIT named** | JS still `elapsed > rnd(10)` only |
| JSON `try_restore_save` getlev | **OMIT named** | |
| `newcham` mleashed | **OMIT named** | Open row |

`node scripts/csym.mjs restore_cham` → `mon.c:4646-4658`. `--callers restore_cham`: `dog.c:464`, `restore.c:1217`, `zap.c:824`. `normal_shape` → `mon.c:4430-4462` (`--callers`: `mon.c:4653`, `zap.c:3199`). `pm_to_cham` → `mon.c:534-546`.

RNG: getlev hide still `rnd(10)` as C `:1219`. `restore_cham` itself has no `rn2`/`rnd`. No seed gate. REST_LEVELS must be imported where catchup reads it (this SHA adds the const import — do not drop it).

`node scripts/sym.mjs` on new / re-pointed names:

```
restore_cham     js/mon.js:2645   ASYNC — await required
normal_shape     js/mon.js:901   ASYNC — await required
pm_to_cham       js/makemon.js:927   sync
PROT_FROM_SHAPE_CHANGERS js/const.js:2440   sync
```

No deleted export. `node scripts/imports.mjs --can do.js mon.js restore_cham` → ALREADY. `--can dog.js mon.js restore_cham` → ALREADY. Static import, not a TDZ clone. Cycle SCC is not a blocker.

## C ↔ JS fidelity

Body. C: PfSC **or** `mcan` → `normal_shape`; else if `cham == NON_PM` → `pm_to_cham(monsndx(data))`. JS: `prot || mon.mcan` then `cham === NON_PM || cham == null`. Null is JS unset analogue of never-written `NON_PM`, not a second algorithm. `pm_to_cham(mon.data?.mndx ?? mon.mnum)` ≡ `monsndx`. **Match the two arms.**

PfSC. C macro is strictly `uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic || .extrinsic`. JS ORs those uprops **and** `u.HProtection_from_shape_changers` / `E…` / `u.Protection_from_shape_changers`. eat/wiz write the flats; `confer_oc_oprop` writes uprops. OR is the port of the C macro across JS’s split storage, not a wider-than-C rule: a hero with the property in either place matches C’s single store. **Match confer_oc_oprop + H||E.**

getlev loop. C `:1201–1202` `continue` if `!u.uz.dlevel` **or** `restoring == REST_LEVELS` — that skip **includes** `restore_cham`. D-log “unconditional after continue” means among mons that did not continue, not “even on REST_LEVELS.” JS now imports `REST_LEVELS` and continues the same way. Then C: ghostly peace **else if** elapsed catchup; then `restore_cham`; then hide if `ghostly || (elapsed > 0 && elapsed > rnd(10))`. JS: no ghostly arm (named); `if (elapsed > 0) catchup`; `await restore_cham`; hide if `elapsed > 0 && elapsed > rnd(10)` only. **restore_cham placement matches C `:1217`.** Hide missing `ghostly ||` is a **named omit**, not a live-arm stub: ghostly bones getlev is not this in-memory stash path.

`dog.c` `:464` is shared by With_you and After_you (and usteed). JS After_you already awaited; this SHA awaits With_you **before** `if (mtmp === u.usteed) return` then the `!m_at && !rn2(tame?10:peaceful?5:2)` / `mnexto` place. That `rn2` is pre-existing With_you, not added here. **Match caller order.**

Callee closure (getlev + With_you arms). LIVE: `restore_cham`, `normal_shape`, `pm_to_cham`, `mon_catchup_elapsed_time`, `hide_monst`, `REST_LEVELS`. CLONE: none new. OMIT named: ghostly peace/`set_malign`; hideunder; worm segs; JSON dorecover getlev; hide `ghostly ||`. STUB: none. Combined-arm ships. zap `montraits` already LIVE (not this SHA).

Diff grep: no FORCE / DIAG / getRngLog / fastforward / seed names / hardcoded coords. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## Hallucinations / overclaim

Subject getlev catchup + With_you await `restore_cham`; PfSC uprops: **true.** REST_LEVELS continue: **true** (this SHA, not previously). Do **not** stamp “Match C getlev ghostly peace / `set_malign`.” Do **not** stamp “Match C hide_monst `ghostly || elapsed > rnd(10)`” — JS still elapsed-only. Do **not** stamp “Match C JSON `try_restore_save` getlev.” Do **not** stamp “Match C `normal_shape` `new_were` / `finish_meating`” (named in D-1594). Do **not** stamp “Match C newcham mleashed.” Public stairs catchup is **role-hit** on seeds that leave a level; PfSC ring is **public-unhit**.

## Density

+51: C `restore_cham` 13 plus two missing callers and the PfSC uprops read. §2b one cham-restore family. Did not glue mleashed or `normal_shape` internals. Small diff, one cluster.

## Verification

Wired: catchup await; REST_LEVELS continue; With_you await before usteed; PfSC uprops OR. Unwired C: ghostly hide/peace; JSON dorecover getlev. Conf: hide still `rnd(10)` as C; `restore_cham` no RNG. No seed gate.

D-log private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for PfSC ring + chameleon on a revisited level. Fortress does not prove the uprops OR.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): ghostly peace/`set_malign`; getlev hide `ghostly ||`; hideunder at `place_monster`; worm `place_wsegs`; steed/ustuck mid remap; JSON `try_restore_save` getlev; `new_were`/`finish_meating` in `normal_shape`; newcham mleashed. Do not drop the `REST_LEVELS` import. Do not await `restore_cham` on the continued REST_LEVELS path (C `continue` skips it). Do not re-port `normal_shape` (D-1594). Do not add a second `restore_cham` in zap `montraits`.

Verdict: **ACCEPT-WITH-DEBT**
