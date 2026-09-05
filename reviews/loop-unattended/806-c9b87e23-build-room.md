# Review 806 — c9b87e23 — sp_lev.c build_room nested themerms des.room (D-1836)

## Metadata
- Full / short hash: `c9b87e231a9729be8cb32854155974c49a171304` / `c9b87e23`
- Parent: `16668da3` (D-1835). Map-driven Open: 4 tour sessions at `rn2(100)` `@ build_room`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 02:03:30 +0200
- D-id: **D-1836**
- Stats: `js/mklev.js` +155/−14. `js/` insertions **155** ≤250. Band **80–350**.
- Claims to close: nested Fake Delphi / Room-in-a-room / Huge / Mausoleum / Twin `des.room`. Not remaining `themeroom_fill` (Ice/Boulder later D-1840).
- JS / map: `splev_build_room` / `splev_des_room` + five contents. `c-js-map/data.md`. Archive **Addressed:** D-1836 `c9b87e23`.

## Intent vs deliverable

Git subject promises: nested `des.room` was deferred so C’s `build_room` `rn2(100)` never ran; JS fell through to `makerooms` `rnd_rect`.

`node scripts/csym.mjs build_room` → `sp_lev.c:2806–2833`. Chance `:2811` `(!r->chance || rn2(100) < r->chance) ? r->rtype : OROOM`. Nested `create_subroom` `:2813–2815` (`:1667–1707`). Caller `lspo_room` `:4081`.

The diff **does** run that chance then `create_subroom` for those five themerms.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `splev_build_room` | LIVE | C `build_room` |
| `splev_des_room` | LIVE | `lspo_room`: build → contents → `add_doors_to_room` |
| `create_subroom` / `create_room` | LIVE | |
| five `themeroom_*_contents` | LIVE | lua nested `des.room` |
| remaining `themeroom_fill` Ice/Boulder/… | OMIT named | Ice/Boulder/Spider/Trap later D-1840 |
| Random-feature center / garden/dig / exclusion_zones | OMIT named | |

`node scripts/sym.mjs`:

```
splev_build_room     NOT EXPORTED — 1 LOCAL mklev.js
splev_des_room       NOT EXPORTED — 1 LOCAL
create_subroom       NOT EXPORTED — 1 LOCAL
create_room          NOT EXPORTED — 1 LOCAL
splev_roomtype       NOT EXPORTED — 1 LOCAL
themeroom_nested_room NOT EXPORTED — 1 LOCAL
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**`build_room` `:2811–2830`.** `chance` default 100 still burns `rn2(100)`. Nested: `create_subroom` then `topologize`, `needfill`, `needjoining`. Non-nested: `create_room`. **Match that RNG and those fields.** `filled` default 0 in `in_mk_themerooms` matches `lspo_room`.

**Callee closure.** Nested `des.room` is this function’s remaining caller set. `create_subroom` LIVE. Fill bodies named. No STUB in the shipped chance arm.

## Hallucinations / overclaim

Do **not** stamp Ice/Boulder/Spider/Trap fills here (named; D-1840 later). `tour-Caveman-70003` same-step re-attr to `js-throw` is disclosed, not NO MOVEMENT-as-omit.

## Density

§2b: consecutive `build_room` nested rooms, one family. +155. Right size.

## Verification

This audit, `js/` at `c9b87e23`: `node scripts/hidden-proxy.mjs verify build_room --base c9b87e23~1` → `4 session(s) blocked`. Summary: **`0 PASS, 4 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS`**. Matches the D-log (Caveman `js-throw` step 3; Knight `mineralize` 3; Ranger `fill_zoo` 42; Tourist `attributes_enlightenment` 32). Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
