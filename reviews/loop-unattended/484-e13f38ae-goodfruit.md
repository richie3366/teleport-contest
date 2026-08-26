# Review 484 — e13f38ae — bones.c goodfruit fid sign + savefruitchn (D-1523)

## Metadata
- Full / short hash: `e13f38ae896840e1377e22e96fa75224390bb56d` / `e13f38ae`
- Parent: `aac21a74` (D-1522). This file audits **this SHA only** (second of nine `js/` commits since review **482**). Archive **Addressed:** D-1523 `e13f38ae`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 03:52:28 +0200
- D-id: **D-1523**
- Stats: 11 files, +210 / −37 — `js/bones.js` +95, `js/end.js` +18 / −4, `js/objnam.js` +1 comment. Band 150–350 (js/ insertions 110).
- Claims to close: Open `bones.c` `goodfruit` (named from D-1522 / review **483**). Not `fruit_from_indx`. `reviews/loop-2026-08-15/` has no unpaid fruit-bones Must-fix.
- JS / map: `bones.js` `goodfruit` / `savefruitchn` / `loadfruitchn`; `end.js` `savebones` / `drop_upon_death`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **483** / **482** named bones `goodfruit`; **481** named restore `ghostfruit` as a **different** Open row.

## Intent vs deliverable

Git subject promises: unused named fruits stay negative and are omitted from bones; slime molds that still exist restore a positive fid.

Pinned C `bones.c` `goodfruit` `:42–47`: `fruit_from_indx(-id)` then `f->fid = id`. Callers: `savebones` `:450–453` negate every `fid`; `drop_upon_death` `:287–288` after `owornmask=0` before `rn2(5)`; `resetobjs` save `:131–132` after cobj recurse. Consumer `save.c` `savefruitchn` `:951–971` writes only `fid>=0` then a zero-fid sentinel. Bones `savebones` `:619` calls it **before** `savelev`. Load `restore.c` `loadfruitchn` `:468–483` prepends until `fid==0`; getlev ghostly `:1081–1082` stashes `go.oldfruit` **before** `restobjchn`; `:1241` `freefruitchn`. `ghostfruit` `:500–511` remaps `spe` via `fruitadd` (named).

Old JS: named omit after D-1522; bones JSON had no `fruitchn`; `drop_upon_death` skipped SLIME_MOLD.

The diff **does** import live `fruit_from_indx`, export `goodfruit`, negate before drop, call from drop and from a SLIME_MOLD-only `resetobjs` walk (minvent / fobj / buried / cobj), persist `savefruitchn` in the VFS JSON, and `loadfruitchn` into `game.oldfruit` then clear it. It **does not** port `ghostfruit`. It **does not** port other `resetobjs` save arms (`known`/`dknown`, name strip, egg/tin/corpse). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodfruit` | C `:42–47`, **LIVE this SHA** | `fruit_from_indx(-id)` then `fid=id` |
| `fruit_from_indx` | C `objnam.c:431–439`, **LIVE** | imported; no extra clone |
| `savebones_negate_fruit_ids` | C `:450–453`, **LIVE this SHA** | `fid = -fid` walk |
| `drop_upon_death` SLIME_MOLD | C `:287–288`, **LIVE this SHA** | before `rn2(5)` |
| `resetobjs_mark_slime_molds` | C `:131–132` subset, **LIVE this SHA** | cobj then nobj; other arms OMIT |
| `savefruitchn` | C `save.c:951–971`, **LIVE this SHA** | `fid>=0`; FREEING dealloc named |
| `loadfruitchn` | C `restore.c:468–483`, **LIVE this SHA** | prepend; `fid==0` break |
| getlev `oldfruit` | C `:1082` / `:1241`, **LIVE slot** | then free; remap not called |
| `ghostfruit` | C `:500–511`, **OMIT named** | `sym` **NOT FOUND** |
| `resetobjs` known-strip / in_use | C `:59–129`, **OMIT named** | |
| `newfruit` | C alloc, **CLONE** | plain `{fname,fid,nextf}` |

`node scripts/sym.mjs goodfruit fruit_from_indx savefruitchn loadfruitchn savebones_negate_fruit_ids ghostfruit resetobjs`:

```
goodfruit        js/bones.js:30   sync
fruit_from_indx  js/objnam.js:1167   sync
savefruitchn     js/bones.js:65   sync
loadfruitchn     js/bones.js:82   sync
savebones_negate_fruit_ids js/bones.js:40   sync
ghostfruit       NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
resetobjs        NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
```

This SHA does **not** delete a symbol. `fruit_from_indx` stays the objnam export (D-1511); goodfruit **imports** it. `ghostfruit` / full `resetobjs` are named omits, not re-points.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2: fruitchn is VFS JSON, not `fs`. **RNG:** drop still `rn2(5)` then `rn2(8)` after the new call; no extra dice. **Public-unhit** (named-fruit bones).

## C ↔ JS fidelity

`goodfruit`. C `:44–47`: lookup `-id`, if found `fid = id`. JS `:30–33`: `fruit_from_indx(-(id|0))` then `f.fid = id|0`. C `fruit_from_indx` (`:435–438`) is `f->fid == indx` with **no 1..127 clamp**, so a negative fid after negate matches. JS D-1511 walker is the same compare. Miss → no-op. **Match.**

Negate. C `:452–453` before drop. JS `savebones` calls `savebones_negate_fruit_ids` then `drop_upon_death`. **Match order.** `fid = -fid` on every node. Double-call would flip twice; bones calls it once. **Match.**

Drop. C `:285–291`: `owornmask=0`, then SLIME_MOLD `goodfruit(spe)`, then `rn2(5)` curse. JS `:806–813`: same three steps. **Match.** `mtmp`/`cont` still place on the floor (pre-existing `add_to_minv` omit). The slime-mold line does not depend on that. Invent is an array `shift` (pre-existing); one goodfruit per former invent object. **Match the call.**

`resetobjs` save SLIME_MOLD. C `:55–58` snapshot `nobj`, recurse `cobj`, then `:131–132`. JS recurse `cobj` then `nobj` without the `in_use` extract/`continue` (`:59–63`). `goodfruit` does not rewrite `nobj`, so walk order matches the live objects. A hypothetical `in_use` slime mold would be marked in JS and discarded in C — **named with the other save arms**, not a stub inside `goodfruit`. Buried: C `resetobjs(buriedobjlist)`. Live JS is an `nobj` chain (`mkobj.js`); the `Array.isArray` arm is the JSON dual-form already in `write_bonesfile`. `goodfruit` is idempotent (second call looks up `-positive` and misses). **Not a fid bug.**

`savefruitchn`. C writes `fid>=0` in walk order, then a zero-fid sentinel; FREEING dealloc is not the bones WRITING path (`bones.c:612–619`). JS pushes `{fname,fid}` for `fid>=0` and does **not** clear `ffruit`. **Match WRITING.** JSON has no sentinel; `loadfruitchn` end-of-array is the same stop.

`loadfruitchn`. C prepends each `fid!=0`, deallocates the zero node, returns the reversed list. JS prepends, `fid===0` break. Empty → null. **Match.** getlev ghostly loads **before** objects (`:1082`); JS sets `game.oldfruit` before `deserObjChain`. After `rest_track`, C `freefruitchn` (`:1241`); JS `game.oldfruit = null`. **Match the slot.** `restobjchn` `:260–261` `ghostly && SLIME_MOLD` → `ghostfruit` is **not** called. `sym` NOT FOUND. Named Open `restore.c` `ghostfruit`. This is **not** “goodfruit dispatch, callee stubbed”: `fruit_from_indx` is LIVE. It **is** “restore loaded `oldfruit` without remapping `spe`.” Honest, already queued.

Callee closure (save envelope). LIVE: `fruit_from_indx`, `goodfruit`, `rn2`. CLONE: `loadfruitchn` node alloc. OMIT named: `ghostfruit`, other `resetobjs`, FREEING. STUB: none in the negate/drop/mark/save arms. **Those arms may ship.**

## Hallucinations / overclaim

Subject unused fruits stay negative and are omitted; existing slime molds restore a positive fid: **true of the save path** (`savefruitchn` filter). **False as a restore name remap** until `ghostfruit`. D-log negate/flip/miss/filter/load prepend reverse/cobj walk: **true of that canary**, not a public named-fruit bones file. Stamping **Addressed:** D-1523 for **`:42–47` + `:450–453` + drop `:287–288` + resetobjs `:131–132` + `savefruitchn` `:951–959`** is fair. Do **not** stamp “Match C `ghostfruit`.” Do **not** stamp “Match C full `resetobjs`.” Do **not** treat fortress 44/44 as a slime-mold bones screen. `fruit_from_indx` is **not** a stub.

## Density

+110 JS: `goodfruit` plus its savebones callers and the `savefruitchn` consumer C already ties to the negate. Playbook §2b one family. Did not glue `ghostfruit`. Acceptable.

## Branch-by-branch confirm

1. Negate then drop SLIME_MOLD `spe==k`: lookup `-k`, `fid=k`. **Match.**
2. Named fruit with no remaining slime mold: stays negative; omitted from `fruitchn`. **Match.**
3. `goodfruit` miss (`fruit_from_indx` NULL): no write. **Match `:46–47`.**
4. Second `goodfruit` on the same fid (drop then fobj resetobjs): lookup `-positive` misses; stays positive. **Match C idempotence.**
5. Container `cobj` slime mold: recurse before parent. **Match `:57–58` / `:131`.**
6. `savefruitchn` walk order; load prepend reverses. **Match `:476–478`.**
7. Empty chain / all-negative: empty array / null `oldfruit`. **Match zero sentinel only.**
8. `rn2(5)` curse still after goodfruit. **Match; no extra RNG.**
9. `ghostfruit` / `fruitadd` else. **Named omit.**
10. **Public-unhit** (named-fruit bones).

## Callers / RNG ledger

C: `savebones` negate; `drop_upon_death`; `resetobjs` save; `savefruitchn` in bones file. JS the same sites plus VFS JSON. No new `rn2`/`rnd`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Persist via `storage.js` VFS. No fs. No FORCE.

## Verification

D-log: private canary **21**/21 (C/JS grep; negate; flip; miss; filter; load prepend reverse; cobj walk; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** (named-fruit bones). Cohort is shared-startup. Honest.

## Actionable C-wrongs

None at the claimed save envelope. Remaining **named** (map / Open): restore.c `ghostfruit`; pager look `spe = current_fruit`; other `resetobjs` save arms; `in_use` extract; arise/statue bones arms. Do not Must-fix “call `ghostfruit` from this SHA” (already a separate Open row). Do not Must-fix JSON lacking a zero-fid sentinel (`loadfruitchn` end-of-array). Do not Must-fix `fid | 0`.

Verdict: **ACCEPT-WITH-DEBT**
