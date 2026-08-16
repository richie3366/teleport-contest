# Review 15 — 3f8469fe — restore cobj where=OBJ_CONTAINED (D-1054)

## Metadata
- Full / short hash: `3f8469fe3ee5d2cbcf8dc5169b7ba827d8105b00` / `3f8469fe`
- Parent: `a19fb5e7` (reviews 13/14; queued this Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 02:11:09 +0200
- D-id: **D-1054**
- Stats: 13 files, +138 / −77 — `js/save.js` +16 / −7, `js/bones.js` +8 / −1, `js/timeout.js` +8 / −1
- Claims to close: D-1036 **risk 4** (`get_obj_location` flags `0` vs CONTAINED). Stamped **Addressed:** D-1054 `3f8469fe` on that review in the same SHA.
- JS / map: `save.js` / `bones.js` `deserObjChain`; `timeout.js` comment; `c-js-map/data.md`. Cadence still **#1325** **44**/44 (this SHA is not a score refresh).

## Intent vs deliverable

Git subject promises: “Match C restobjchn so contained objects keep where=OBJ_CONTAINED and get_obj_location(0) cannot hatch them.”

Review 14 already recorded that `timeout.js` `get_obj_location` matches C `zap.c:657–689` (`OBJ_CONTAINED` only if `locflags & CONTAINED_TOO`; hatch passes `0`). It warned that “fixing” the switch without a still-wrong `where` encoding was hunting a ghost.

The diff **does not** retouch the flags mask. It changes how JS restore **stamps** `where` on nested `cobj`: recurse `OBJ_CONTAINED` instead of the parent chain’s FLOOR/INVENT/MINVENT, and tags the save buried list `OBJ_BURIED` (bones already did). That is the remaining gap Review 14 asked to prove.

It does **not** port C `restobj` (binary NHFILE `where` from the file). JS-VFS still overwrites `where` from the chain argument after `{...raw}`. Equivalent for well-formed live `add_to_container` objects, which already serialize `where=2`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `deserObjChain` (save + bones) | JS-VFS adapter for `restore.c` `restobjchn` | still takes `where` and stamps the **current** object; nested call now `OBJ_CONTAINED` |
| `deserInventArray` kids | same adapter | invent objects stay `OBJ_INVENT`; contents `OBJ_CONTAINED` |
| `buriedobjlist` restore (save) | C callee family | was `OBJ_FLOOR`; now `OBJ_BURIED` like bones |
| `get_obj_location` | C function, comment only | `zap.c:654–689`; `obj.where \| 0` coerce; switch arms unchanged |
| `add_to_container` | imported C callee, not this SHA | `mkobj.js:203` already `where=OBJ_CONTAINED` |
| `shk.js` local `get_obj_location` | pre-existing clone | still floor/invent/contained only |
| `zap.js` `get_obj_location_zap` | pre-existing clone | already has MINVENT/BURIED/CONTAINED_TOO |
| `billobjs` deser | still `OBJ_FLOOR` | C restores saved `OBJ_ONBILL` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunks. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of `js/save.js` `js/bones.js` `js/timeout.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Persist remains frozen `storage.js` VFS. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### C `restobjchn` does not stamp parent `where`

C `restore.c:231–303`: loop `newobj` + `restobj(nhfp, otmp)` (full struct, including `where`), then if `Has_contents`:

```
otmp->cobj = restobjchn(nhfp, Is_IceBox(otmp));
for (otmp3 = otmp->cobj; otmp3; otmp3 = otmp3->nobj)
    otmp3->ocontainer = otmp;
```

The recursive call restores each content object’s **saved** `where`. C `add_to_container` writes `OBJ_CONTAINED` (`obj.h:77` value **2**, matches `js/const.js`). `restobjchn` only rewrites `ocontainer` pointers. **No `rn2`/`rnd` in `restobjchn`.**

JS cannot `restobj` a binary blob. `deserObjChain` copies JSON then **overwrites** `otmp.where = where`. Before this SHA, a floor box’s egg became `where=OBJ_FLOOR` (or INVENT/MINVENT). `get_obj_location(egg, 0)` then took the FLOOR/INVENT/MINVENT arm and returned coords — the same observable as passing `CONTAINED_TOO`. That **was** D-1036 risk 4.

After: kids are stamped `OBJ_CONTAINED`. Hatch flags `0` hit `case OBJ_CONTAINED: if (locflags & CONTAINED_TOO)` and return null. Match for the Must-fix.

`{...raw}` still copies a serialized `where` and then overwrites it. Stamping `OBJ_CONTAINED` for every nesting level matches C contents (including box-in-box). Live in-memory `goto_level` never went through deser; Review 14’s “live `where` is already CONTAINED” stands. This SHA closes the restore path.

`serObj` (`save.js:32–54`, bones twin) copies scalar `where` onto JSON and serializes `cobj` as an nobj-order array. Live `add_to_container` (`mkobj.js:203–205`) already sets `where=OBJ_CONTAINED` and `ocontainer`. So a well-formed save **already stored** `where=2` on the egg; deser then **threw it away** by stamping the parent chain. The bug was the overwrite, not a missing flags bit. After this SHA the overwrite is `OBJ_CONTAINED`, which matches the serialized value for live contents. Old VFS blobs that stored the wrong `where` on kids get corrected by the stamp — that is stricter than C `restobj` (which would keep a corrupt saved where) and is the right JS-VFS fix for the hatch observable.

Callers of `deserObjChain` after this SHA:

| Chain | Argument | Nested `cobj` |
|-------|----------|----------------|
| floor `fobj` | `OBJ_FLOOR` | `OBJ_CONTAINED` |
| invent (array helper) | `OBJ_INVENT` on the pack object | `OBJ_CONTAINED` |
| monster `minvent` | `OBJ_MINVENT` | `OBJ_CONTAINED` |
| buried | `OBJ_BURIED` | `OBJ_CONTAINED` |
| `billobjs` | still `OBJ_FLOOR` | `OBJ_CONTAINED` |

C `restore.c:421` `mtmp->minvent = restobjchn` keeps each minvent object’s saved `OBJ_MINVENT` and contents `OBJ_CONTAINED`. JS minvent stamp + nested CONTAINED matches. Invent uses `deserInventArray` (`save.js:160–178`) which stamps `OBJ_INVENT` on the pack object then `deserObjChain(kids, OBJ_CONTAINED)` — same as the chain helper’s new recursion. Bones `remapObjChainIds` walks `cobj` after deser (`bones.js:287–291`); C ghostly `next_ident` is parent-then-contents (`restore.c:254–277`). Order match.

### Hatch caller — flags 0, no extra RNG here

C `timeout.c:1038–1041`: only INVENT/FLOOR/MINVENT; `get_obj_location(egg, &x, &y, 0)`. If that fails, hatch does not `rnd(quan)` / `enexto` / `makemon`. JS `hatch_egg` already passed `0`. Before D-1054 a restored box egg returned coords and burned hatch RNG C would not. After, flags 0 returns null and those RNGs are skipped. That is the Must-fix observable. **No RNG in `get_obj_location` or `deserObjChain`.** Hatch RNG lives in `hatch_egg` (`rnd(quan)`, maybe `rn2(2)` for `yours`, leftover `rnd(12)`) and is unchanged.

### Buried list — same stamp class

C `restore.c:1172` `buriedobjlist = restobjchn(...)` keeps saved `OBJ_BURIED` (`obj.h:81` value **6**). Hatch comment (`timeout.c:1038–1040`): BURIED fails unless `BURIED_TOO`.

Bones already passed `OBJ_BURIED`. Save passed `OBJ_FLOOR`, so a restored buried egg looked like a floor egg and `get_obj_location(0)` succeeded. This SHA switches save to `OBJ_BURIED`. Nested contents of a buried container still recurse `OBJ_CONTAINED`, not BURIED — that is C (`add_to_container` inside a buried box).

### `get_obj_location` — branch-by-branch, still C, no RNG

C `zap.c:657–689`:

```
case OBJ_BURIED:
    if (locflags & BURIED_TOO) { *xp = obj->ox; *yp = obj->oy; return TRUE; }
    break;
case OBJ_CONTAINED:
    if (locflags & CONTAINED_TOO)
        return get_obj_location(obj->ocontainer, xp, yp, locflags);
    break;
```

INVENT → `u.ux/uy`; FLOOR → `ox/oy`; MINVENT → `ocarry->mx` or fail if migrating (`!mx`); else `xp=yp=0` and FALSE.

JS `timeout.js:504–528`: same arms, null instead of `0,0`+FALSE. Recurse on `ocontainer` with the **same** `locflags` (C passes `locflags` through). `CONTAINED_TOO=0x1` / `BURIED_TOO=0x2` match `obj.h:450–451`. Hatch `get_obj_location(egg, 0)` (`timeout.c:1041`; JS already). **`obj.where | 0`** is new: `undefined` becomes `OBJ_FREE=0` and falls through to null. Not a flags-mask change. **No RNG in `get_obj_location`.** Match.

Callers this SHA did not retouch: `hatch_egg` / `burn_object` / `fig_transform` pass `0` (comment now says so). `timeout.c:1792` burn/fig with `CONTAINED_TOO|BURIED_TOO` still uses the same function — those flags can locate a correctly tagged contained object. Before, a FLOOR-stamped box egg would also locate under flags `0`, which those callers never needed. After, flags-with-CONTAINED_TOO still works because `where` is CONTAINED and the bit is set.

JS `timeout.js:521–525`: `if (locflags & CONTAINED_TOO) return get_obj_location(obj.ocontainer, locflags)`. Missing `ocontainer` yields a recursive call on null → `if (!obj) return null` at the top. C would dereference `obj->ocontainer` (restore always rewrites those pointers in the `for (otmp3 = otmp->cobj)` loop). JS deser does the same pointer walk (`save.js:150–152`). A contained object without `ocontainer` is a JS graph bug, not this stamp.

Migrating objects (`OBJ_MIGRATING=5`) are not a `deserObjChain` chain in this SHA. C hatch already fails `get_obj_location` for MIGRATING (`timeout.c:1039`). JS switch has no MIGRATING arm → null. Match.

This is **not** “Match C dispatch, callee is a stub.” The switch was already the C function. The restore stamp was feeding it the wrong `where`.

### `billobjs` still FLOOR — named, not this Must-fix

C `restore.c:1173` `billobjs = restobjchn` restores saved `OBJ_ONBILL=7`. JS still `deserObjChain(..., OBJ_FLOOR)`. A billed egg would locate as floor under flags `0`. Shop-bill eggs with `HATCH_EGG` timers are not the D-1036 risk. Map, not a new Must-fix — do not widen this SHA into “stamp every chain from saved `raw.where`.”

`shk.js:336–351` local clone still omits MINVENT/BURIED. Hatch uses `timeout.js`. Named in the D-log.

## Hallucinations / overclaim

“Match C restobjchn so contained objects keep where=OBJ_CONTAINED and get_obj_location(0) cannot hatch them” is **true for the restore stamp and for hatch flags 0.** It is **not** a claim that JS `deserObjChain` is binary `restobjchn`, or that the flags switch was wrong. Stamping D-1036 risk 4 **Addressed** is fair. Hash already in the fix commit.

Cadence still **#1325** 44/44 does not prove a restored box egg. Journal admits public **unhit** (in-memory `goto_level` keeps live `where`). Private node: live `add_to_container` flags=0 null; CONTAINED_TOO recurses; save/restore `egg.where=CONTAINED` and hatch flags=0 null; buried flags=0 null. That is the right falsifier.

## Density (§2b)

One Must-fix: stop tagging restored contents as the parent chain. Nested `OBJ_CONTAINED` + save buried `OBJ_BURIED`. ~20 lines JS. Small for §2b’s 50–300 band, but it was the **queued** D-1036 risk 4 (Review 14: prove the `where` encoding or close the row). Not “finish restore.c.” Switch left unchanged on purpose.

## Verification

Journal: private restore node; green+strict PASS; restore/bones/hatch cohort **7**/7 (seed0013-restore, seed5006, seed0006/0007, seed0014, seed4500, seed2200). Path **unhit** by public traces. Adequate: fortress plus the restore stamp check. Public traces do not save/restore a boxed egg then hatch.

Cohort seeds exercise restore/bones/`hatch_egg` dispatch (D-1037), not a boxed egg. seed0013-friday13-restore is the restore path; seed0014/4500 were the original hatch-wire FAILs. They staying PASS means the stamp did not re-break live `where` on floor/invent eggs. It does **not** prove a box-egg hatch skip — that is the private node.

This review iter did not re-run sessions (not a cadence slot). C read + JS hunk grep is the audit.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1036 risk 4 (flags `0` accepting restored CONTAINED because `where` was stamped FLOOR/INVENT) is actually closed.

Named omits (map, not queue): `billobjs` still `OBJ_FLOOR`; `shk.js` local `get_obj_location`; `zap.js` invent `.includes` fallback; no binary `restobj`; `impossible()` unknown where.

Do not restore parent-chain `where` onto `cobj`. Do not “fix” the `get_obj_location` switch as if CONTAINED_TOO were missing.

## Verdict

- Verdict: **ACCEPT**
- Score: **8.5 / 10**
- One sentence: restored box eggs now keep `where=OBJ_CONTAINED` so hatch `get_obj_location(0)` fails like C; the flags switch was already C and was correctly left alone.
