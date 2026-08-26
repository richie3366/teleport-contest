# Review 502 — 21ccdfde — restore.c ghostfruit spe remap via fruitadd else (D-1541)

## Metadata
- Full / short hash: `21ccdfde93ef43e182bc3d88fc110ce326c96892` / `21ccdfde`
- Parent: `53f71db1` (D-1540). This file audits **this SHA only** (second of nine `js/` commits since review **500**). Archive **Addressed:** D-1541 `21ccdfde`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 08:42:14 +0200
- D-id: **D-1541**
- Stats: 11 files, +179 / −60 — `js/bones.js` +66 / −6, `js/options.js` +4 / −3. Band 150–350 (js/ insertions 70).
- Claims to close: Open `restore.c` `ghostfruit` (named from D-1540 / D-1523 / review **484**). Not `goodfruit`. `reviews/loop-2026-08-15/` has no unpaid ghostfruit Must-fix.
- JS / map: `bones.js` `ghostfruit` / `fruitadd_bones` / `remapObjChainIds`; comments in `options.js`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **484** named `ghostfruit` omit; **481** named fruitadd else for bones.

## Intent vs deliverable

Git subject promises: leftover bones slime molds remap `spe` via oldfruit `fname` and fruitadd else, not the dead hero’s fid.

Pinned C `restore.c` `ghostfruit` `:500–511`; caller `restobjchn` `:254–261` after ghostly `next_ident`, before age / contents. Callee `options.c` `fruitadd` else `:8257–8286` (`str != svp.pl_fruit`): `copynchars`+`sanitize_name`, `made_fruit=TRUE`, `fruit_from_name(FALSE)`, `rnd(127)` overflow, prepend; `nonew` does **not** write `current_fruit`. getlev `:1081–1082` load `oldfruit` before objects; `:1241` free after. `objnam.c` `fruit_from_name` `:443–519`. `bones.c` `sanitize_name` `:198–220`. `global.h` `PL_FSIZ` 32.

```500:511:nethack-c/upstream/src/restore.c
staticfn void
ghostfruit(struct obj *otmp)
{
    struct fruit *oldf;

    for (oldf = go.oldfruit; oldf; oldf = oldf->nextf)
        if (oldf->fid == otmp->spe)
            break;

    if (!oldf)
        impossible("no old fruit?");
    else
        otmp->spe = fruitadd(oldf->fname, (struct fruit *) 0);
}
```

Old JS: `loadfruitchn` into `game.oldfruit` then free; `sym` `ghostfruit` NOT FOUND; user `fruitadd` always candifies (`str===pl_fruit`).

The diff **does** port the oldfruit walk, miss-leave-spe, else-path clone (`fruitadd_bones`), and the `restobjchn` call on minvent/fobj/buried/bill/cobj. It **does not** print `impossible`, shift age, or import `options.js` `fruitadd` (cycle). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `ghostfruit` `:500` | C, **LIVE this SHA** | export |
| `fruitadd` else `:8257` | C, **CLONE** `fruitadd_bones` | cycle; not user path |
| `fruitadd_orc` | C same else, **CLONE** (pre-existing) | mklev.js; DRY named |
| `fruit_from_name` | C `:443`, **LIVE** | import; exact then prefix |
| `rnd` | C `rnd.c`, **LIVE** | overflow 127 |
| `loadfruitchn` / `oldfruit` | C `:468` / `:1082`, **LIVE** | D-1523 slot now consumed |
| `remapObjChainIds` | C `restobjchn` ghostly, **LIVE this SHA** | call added |
| `sanitize_name` 8-bit `_` | C `:213–216`, **OMIT named** | 7-bit always (orc same) |
| `impossible` pline | C `:509`, **OMIT named** | sync caller |
| age `svm.moves-svo.omoves` | C `:266–267`, **OMIT named** | |
| user `fruitadd` pointer-eq | C `:8184`, **unchanged** | still options.js |

`node scripts/sym.mjs ghostfruit fruitadd fruitadd_bones fruitadd_orc fruit_from_name fruit_from_indx loadfruitchn rnd sanitize_name`:

```
ghostfruit       js/bones.js:419   sync
fruitadd         js/options.js:712   sync
fruitadd_bones   NOT EXPORTED — 1 LOCAL js/bones.js:387
fruitadd_orc     NOT EXPORTED — 1 LOCAL js/mklev.js:853
fruit_from_name  js/objnam.js:1182   sync
fruit_from_indx  js/objnam.js:1167   sync
loadfruitchn     js/bones.js:86   sync
rnd              js/rng.js:69   sync
sanitize_name    NOT EXPORTED — 1 LOCAL js/options.js:691
```

This SHA does **not** delete a clone or re-point `fruitadd`; it adds a second else-path clone next to `fruitadd_orc` (same body). Importing `options.js` `fruitadd` would candify (`makesingular` / tin / corpse) because JS cannot do C’s `str==pl_fruit` pointer test for `oldf->fname`. Honest. Do **not** write clone #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2: bones still VFS `storage.js`, not `fs`.

## C ↔ JS fidelity

Lookup. Walk `game.oldfruit` (`nextf`) until `fid==spe`. **Match `:504–506`.** Miss: leave `spe`, no impossible pline. **Match the assignment; message named.** Hit: `otmp.spe = fruitadd_bones(fname)`. **Match `:511` for the else callee.**

Else clone vs C `:8257–8286`. Truncate `PL_FSIZ-1` (32). Sanitize: `&0x7f`, `<0x20` or DEL → `.`. C also maps 8-bit to `_` only when `WINDOWPORT(tty)&&!wc_eight_bit_input`; JS always emits 7-bit (same as `fruitadd_orc` / options comment “eight_bit_input always on”). **Named 8-bit omit.** `made_fruit=true`. `fruit_from_name(look,false,{fid})` zeros then tracks max fid like C `:455–462`. Hit → return `found.fid` (C `nonew` without `current_fruit`). Miss + `highest>=127` → `rnd(127)` without touching `current_fruit`. Else prepend `{fname, fid:highest+1, nextf:ffruit}`. **Match else, not the user candify arm.** `fname==pl_fruit` text still takes else (C pointer inequality). **Match.**

Walker. Live D-1520: exact `strcmp`, longest prefix + space, `makesingular`, prefix+singularize. **Match `:458–517`.**

Caller order. C: `next_ident`, then `SLIME_MOLD` `ghostfruit`, then age, then `cobj` recurse. JS: ident, ghostfruit, cobj; age skipped. **Match ghostfruit placement.** Chains: minvent (via restmon), fobj, buried, billobjs. **Match getlev `:1166–1173`+`:421`.** invent/ball/migrating_objs are restgamestate, not bones.

oldfruit lifetime. Load before remap; `null` after rest_track. **Match `:1082` / `:1241`.**

Callee closure (ghostfruit arm). LIVE: oldfruit walk, `fruit_from_name`, `rnd`, loadfruitchn, remap callers. CLONE: `fruitadd_bones` matched to else here (no candify / no `current_fruit`). OMIT named: impossible, age, 8-bit `_`. STUB: none. **The arm may ship.** Do **not** candify / write `current_fruit` on this path.

## Hallucinations / overclaim

Subject remap via fname + fruitadd else: **true.** D-log “not the dead hero’s fid”: **true** when oldfruit hits. Stamping **Addressed:** D-1541 is fair for **lookup + else clone + restobjchn call**. Do **not** stamp “Match C `impossible`.” Do **not** stamp “Match C age shift.” Do **not** stamp “Match C user `fruitadd` pointer-eq.” This is **not** “dispatch ported, callee stubbed”: the callee is a verified else clone, not `options.js` candify.

## Density

C `ghostfruit` is 12 lines; the else clone is the real cluster (`fruitadd` `:8257–8286` + walker). +70 JS. Did not glue Light source fill. §2b OK (C that small; >40 insertions).

## Branch-by-branch confirm

1. Same-name as live `ffruit`: reuse fid, no prepend. **Match.**
2. New name: prepend `highest+1`. **Match.**
3. Prefix reuse (`fruit_from_name` FALSE). **Match.**
4. Miss oldfruit: spe unchanged. **Match.**
5. `fname` text equals `pl_fruit`: still else, no candify. **Match.**
6. Overflow `highest>=127`: `rnd(127)`, no `current_fruit`. **Match.**
7. cobj slime mold: remapped (parent then contents). **Match.**
8. Age / impossible pline: skipped. **Named.**

## Callers / RNG ledger

C: only `restobjchn` when `ghostly && otyp==SLIME_MOLD`. JS: only bones `remapObjChainIds`. **New RNG:** `rnd(127)` on overflow (public-unhit). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. VFS bones. No scored `fs`. No FORCE.

## Verification

D-log canary **15**/15 (C/JS grep; same-name; new-name prepend; miss; fname==pl_fruit still else; prefix; sanitize; overflow `rnd(127)`; cobj; VFS try_load_bones spe 2→7; Rule #2); green+strict; cohort **7**/7. **Public-unhit** (named-fruit bones). Admit it.

## Actionable C-wrongs

None for Must-fix. Named: impossible pline; age shift; 8-bit sanitize `_`; DRY `fruitadd_orc`/`fruitadd_bones`; other `resetobjs` save arms.

Verdict: **ACCEPT-WITH-DEBT**
