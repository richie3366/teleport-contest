# Review 62 — a7302142 — `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (D-1101)

## Metadata
- Full / short hash: `a7302142d082ec8ac1160b1f837c9a5228195b83` / `a7302142`
- Parent: `ea07bad2` (cadence #1400 reviews **58–61**). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 19:50:15 +0200
- D-id: **D-1101**
- Stats: 10 files, +138 / −46 — `js/teleport.js` +31 / −1 (`is_exclusion_zone` + `within_bounded_area` + one `goodpos` test).
- Claims to close: Open queue `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (named). Not `onscary`. Stamped **Addressed:** D-1101 `a7302142` on the archive row (filled by D-1102). Review **61** named omit 1. `reviews/loop-2026-08-15/` has no open exclusion Must-fix.
- JS / map: `teleport.js` `goodpos`. `c-js-map/turns.md` teleport row. `lspo_exclusion` populate of `des.exclusion` still named (live Open). live-mon `onscary` still named.
- Prior reviews this SHA claims to close: **61** item 1 (`is_exclusion_zone` after wallwalk).

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos so GP_AVOID_MONPOS rejects mongen exclusion zones after the boulder check.”

Old JS honored `GP_AVOID_MONPOS` only as `m_at` occupied. After boulder it returned true. C `teleport.c:180–182` then rejects when `avoid_monpos && is_exclusion_zone(LR_MONGEN, x, y)`. Ordinary ROOM cells inside a mongen exclusion were accepted; C returns FALSE. Wallwalk / pool / lava still return first in C, so those early-outs never reach the zone test.

The diff **does** that slot: local `is_exclusion_zone` (mkmaze.c clone) and `within_bounded_area`; after `sobj_at(BOULDER)`:

```
if (avoid_monpos && is_exclusion_zone(LR_MONGEN, x, y)) return false;
```

It does **not** populate `game.exclusion_zones` from `des.exclusion` (`sp_lev.c` `lspo_exclusion`). Named, already Open. TELE-only zones do not reject mongen (callee logic, not a skip). It does **not** switch live mons from `goodpos_onscary` to `onscary`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos` exclusion test | C body, **retouched** | `teleport.c:180–182` after boulder |
| `is_exclusion_zone` | C callee, **clone** | `mkmaze.c:317–331`; local — `mklev.js` already imports `teleport.js` |
| `mklev.js` `is_exclusion_zone` | **same clone** | pre-existing; byte-for-byte the same `if` |
| `within_bounded_area` | C macro, **clone** | `dungeon.h:144–145`; local to avoid `rect.js` coupling |
| `rect.js` `within_bounded_area` | **same clone** | identical inclusive bounds |
| `LR_TELE` / `LR_UPTELE` / `LR_DOWNTELE` / `LR_MONGEN` | C enum, **imported** | `const.js` ≡ `dungeon.h:36–43` (`LR_MONGEN = 7`) |
| `GP_AVOID_MONPOS` | C flag, **pre-existing** | `hack.h:1175` `0x01000000`; `makemon` already ORs it |
| `lspo_exclusion` | C data source, **named omit** | live Open; zones mostly empty |
| `goodpos_onscary` Elbereth | C after wallwalk, **named omit** | next SHA D-1102 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No RNG** in the new arm.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates, no recorded coordinates. `LR_*` are `dungeon.h` enumerators, not trace constants. Cycle-avoiding clone is documented and matches the existing `mklev.js` helper — not a second incompatible walker. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Slot — after boulder, not before wallwalk / pool / lava

C `teleport.c:163–184`:

```
if (passes_walls(mdat) && may_passwall(x, y))
    return TRUE;
… amorphous … checkscary …
if (!accessible(x, y)) { … return FALSE; }
if (sobj_at(BOULDER, x, y) && (!mdat || !throws_rocks(mdat)))
    return FALSE;
/* pretend GP_AVOID_MONPOS == monster creation */
if (avoid_monpos && is_exclusion_zone(LR_MONGEN, x, y))
    return FALSE;
return TRUE;
```

JS `354–371`: same order. Wallwalk `return true` **skips** exclusion, so a xorn in a mongen zone still places in C and JS. Pool / lava `return` also skip it. D-log canary “xorn ROOM/STONE skip; eel pool skip; flyer lava skip.” Match. Do not “fix” exclusion before wallwalk; C does not.

`avoid_monpos` is already `((gpflags & GP_AVOID_MONPOS) !== 0)` at JS `293`. `makemon.js:1996–1998` ORs `GP_CHECKSCARY | GP_AVOID_MONPOS` like C `makemon.c:1163`. `makemon_rnd_goodpos` also `gpflags |= GP_AVOID_MONPOS` (`makemon.c:1085` ≡ JS `1903`). The new test therefore runs on monster creation. `rloc_pos_ok` calls `goodpos(..., GP_CHECKSCARY)` **without** `GP_AVOID_MONPOS` (`teleport.c:1581`). A live `rloc` into a mongen zone is **not** rejected by this arm in C or JS. D-log “rloc without flag.” Match.

### `is_exclusion_zone` clone vs `mkmaze.c`

C `mkmaze.c:317–331`:

```
while (ez) {
    if (((type == LR_DOWNTELE
          && (ez->zonetype == LR_DOWNTELE || ez->zonetype == LR_TELE))
         || (type == LR_UPTELE
             && (ez->zonetype == LR_UPTELE || ez->zonetype == LR_TELE))
         || type == ez->zonetype)
        && within_bounded_area(x, y, ez->lx, ez->ly, ez->hx, ez->hy))
        return TRUE;
    ez = ez->next;
}
```

JS `272–283`: same three disjuncts, then inclusive bounds, then `ez.next`. `type === LR_MONGEN` hits only the third clause (`type === ez.zonetype`), so `LR_TELE` / `LR_UPTELE` / `LR_DOWNTELE` zones do **not** reject mongen. `type === LR_DOWNTELE` matches `LR_DOWNTELE` **or** `LR_TELE` (first clause). Querying `LR_TELE` does not match an UPTELE-only zone. D-log “TELE/UPTELE/DOWNTELE no mongen reject; DOWNTELE matches TELE.” Match.

`within_bounded_area` JS `264–265` is `x >= lx && x <= hx && y >= ly && y <= hy` ≡ `dungeon.h:144–145` and `rect.js:69–70`. Inclusive on all four edges. Not a half-open interval. Match.

`game.exclusion_zones` is the JS analog of `sve.exclusion_zones` (`decl.h:1136`). C `free_exclusions` (`dungeon.c:2581–2592`) clears the list on level leave; `save_exclusions` / `load_exclusions` persist zonetype + rectangle. JS never walks a populated list on public specials; one baked tut `des.exclusion` TELE rectangle exists in `mklev.js:16871–16877` (`type="teleport"` → `LR_TELE`), which this mongen query **does not** reject. Named populate (`lspo_exclusion`) is the remaining data hole, not a walker bug. C `lspo_exclusion` (`sp_lev.c:5498–5530`) maps `"monster-generation"` → `LR_MONGEN` after `get_location_coord` so the stored `lx,ly,hx,hy` are already absolute. Until that opcode exists, a private canary must inject the linked list the walker expects — the D-log did that. Public specials do not.

Local copy vs `import` from `mklev.js`: `mklev.js` already imports `teleport.js` (`enexto` / `rloc`). Importing the other way is a cycle. Clone is justified and identical. Classify as **clone of C callee**, not a diverging helper. If the two JS copies drift later, that becomes a C-wrong family — they have not drifted in this SHA.

### Who actually hits the new `if`

Fakemon `{ data: ptr }` from `makemon` `x==0,y==0` (`makemon.c` / JS `2004–2006`) has `GP_AVOID_MONPOS`. ROOM inside an `LR_MONGEN` rectangle → false. Same cell with only `LR_TELE` → true. Null `game.exclusion_zones` → false from the walker → `goodpos` true (C empty list same). Match.

`MM_IGNOREWATER` still reaches exclusion after a pool early-out is skipped (`ignorewater` makes the pool arm not return). D-log “ignorewater still hits exclusion.” C same: pool `return` is inside `!ignorewater`. Match.

Occupied / `u_at` still return **before** exclusion. A monster standing in a mongen zone is already rejected by `MON_AT && avoid_monpos` (`teleport.c:114–115`). The new test is for **empty** cells in the rectangle. Match.

`enexto` / `enexto_core` pass `GP_CHECKSCARY` (`teleport.c:201` / JS `474–480`) and inherit caller flags when `makemon` ORs `GP_AVOID_MONPOS`. A near-hero `enexto` into a mongen rectangle therefore hits the new `if` for ordinary forms. C same. Do not add a second exclusion test inside `enexto_core`; `goodpos` is the C choke point.

## Hallucinations / overclaim

“Match C so GP_AVOID_MONPOS rejects mongen exclusion zones after the boulder check” is **true for the slot, the `LR_MONGEN` zonetype match, TELE not aliasing mongen, inclusive bounds, wallwalk/pool/lava skip, and makemon already passing the flag.** It is **not** true that `des.exclusion` from Lua specials fills `game.exclusion_zones` (`lspo_exclusion` still Open), or that live `rloc` uses this arm (no `GP_AVOID_MONPOS`).

This is **not** “Match C dispatch, callee is a stub.” `is_exclusion_zone` is a real `mkmaze.c` clone that walks the list. An empty list is C’s empty list. Stamping **Addressed:** D-1101 is fair for the Open line. Hash `a7302142` is on the archive row (filled by D-1102).

## Density (§2b)

One Open cluster: the post-boulder conjunct C writes as one `if`. ~25 executable lines + a 12-line helper that already existed in `mklev.js`. Playbook “one deferred `if`” is the too-small column; the helper is the C callee that `if` requires. Sibling Elbereth / live `onscary` correctly left for later SHAs. Right size (small end).

## Verification

Journal: private canary **57**/57 (null zones; MONGEN reject with flag / rloc without flag; TELE/UPTELE/DOWNTELE no mongen reject; DOWNTELE matches TELE; inclusive bounds; linked list; xorn ROOM/STONE skip; eel pool skip; flyer lava skip; xorn lava arm first; ignorewater still hits exclusion; `u_at` / `MON_AT` first); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (`LR_MONGEN` zones not populated in public specials). Cadence **#1400** **44**/44 was fortress, not an exclusion proof. This audit’s full `sessions` still **44**/44 — same.

C read of `teleport.c:90–184`, `mkmaze.c:317–331`, `dungeon.h:36–43` / `144–145`, `makemon.c:1085` / `1163`, `teleport.c:1581`; JS `teleport.js:263–371`, `makemon.js:1897–2014`, `mklev.js:400–411`, `const.js:885–893`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| empty list, `GP_AVOID_MONPOS` | true (fall through) | **same** |
| `LR_MONGEN` rect + flag | false after boulder | **same** |
| `LR_TELE` rect + flag | true (zonetype miss) | **same** |
| `LR_DOWNTELE` query vs `LR_TELE` zone | true (first clause) | **same** (not this `goodpos` call) |
| xorn STONE in MONGEN zone | wallwalk true first | **same** |
| swimmer pool in MONGEN zone | pool arm, skip zone | **same** |
| `rloc_pos_ok` (no AVOID flag) | no zone test | **same** |
| `makemon` random place | flag set, zone test live | **same** |
| `ignorewater` on pool in MONGEN | exclusion still runs | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The post-boulder `LR_MONGEN` test matches `teleport.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (`sp_lev.c:5498–5530`). Live Open. Not `goodpos`.
2. `goodpos_onscary` Elbereth / scare / altar-vamp — **Addressed:** D-1102 `ebe1f041` (next SHA). `onscary` when `m_id != 0` still named.
3. Do not import `mklev.js` `is_exclusion_zone` (cycle). Do not run exclusion before wallwalk/pool/lava. Do not let TELE zones reject mongen.

Do not skip the `GP_AVOID_MONPOS` conjunct. Do not treat `rloc` as monster creation. Do not restore occupied-only `GP_AVOID_MONPOS`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goodpos` now rejects mongen exclusion rectangles after the boulder check when `GP_AVOID_MONPOS` is set, via a `mkmaze.c`-matching walker, while Lua `des.exclusion` still does not fill the list and wallwalk/pool/lava still skip the test.
- Must-fix stays empty for this SHA; next port after this cluster popped Open `goodpos_onscary` (D-1102), not a fountain peel.
