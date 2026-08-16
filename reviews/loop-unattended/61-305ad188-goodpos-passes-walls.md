# Review 61 — 305ad188 — `goodpos` `passes_walls` + `may_passwall` (D-1100)

## Metadata
- Full / short hash: `305ad188c3cd9abb2e5f5a2f904ee5574bb917ed` / `305ad188`
- Parent: `a6934a3d` (D-1099). This file audits **this SHA only**. This review commit fills D-1100 archive hash `305ad188` (chicken-egg on the fix SHA).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 19:25:00 +0200
- D-id: **D-1100**
- Stats: 10 files, +124 / −49 — `js/teleport.js` +26 / −6 (local `may_passwall` + one early-out).
- Claims to close: Open queue `teleport.c` `goodpos` `passes_walls` + `may_passwall` early-out (named). Not youmonst swim. Stamped **Addressed:** D-1100 on the archive row **without** the short hash; this review fills `305ad188`. Filled D-1099 hash `a6934a3d`. Review **52** named wallwalk after the macro fix.
- JS / map: `teleport.js` `goodpos`. `c-js-map/turns.md` teleport row. `GP_AVOID_MONPOS` `is_exclusion_zone` and `goodpos_onscary` Elbereth / scare / altar-vamp still named (live Open). youprop `Passes_walls` in **other** callers (`hack.c` `cant_squeeze_thru`, `test_move`) not this function.
- Prior reviews this SHA claims to close: **52** / D-1099 “not this iter: passes_walls.”

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos so wallwalkers return true via passes_walls and may_passwall before accessible.”

Old JS, after pool/eel/lava, fell through to `amorphous` closed-door then `accessible()`. Xorn / earth elemental on STONE, walls, closed doors, trees, iron bars, boulders were rejected by `accessible()` / boulder checks that C never reaches when `passes_walls(mdat) && may_passwall(x,y)`.

The diff **does** that early-out: local `may_passwall` (STWALL + `wall_info|flags` `W_NONPASSWALL`); `if (passes_walls(mdat) && may_passwall(x, y)) return true` **after** lava and **before** amorphous/accessible. Form flag `M1_WALLWALK`, not youprop `Passes_walls`. Pool/lava still return first.

It does **not** pull `is_exclusion_zone`. Named. It does **not** switch live mons from `goodpos_onscary` to `onscary`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos` wallwalk early-out | C body, **retouched** | `teleport.c:163–164` |
| `passes_walls` | C macro, **imported** | `monsters.js` `M1_WALLWALK` ≡ `mondata.h:29` |
| `may_passwall` | C callee, **clone** | `hack.c:932–936`; local to avoid `mon.js` ↔ `teleport.js` cycle |
| `mon.js` `may_passwall` | **same clone** | D-0865 `wall_info\|flags`; not imported |
| `apply.js` `may_passwall_fig` | **same clone** | figurine; not this SHA |
| youprop `Passes_walls` | C **not used here** | `hack.c:958` uses it for youmonst squeeze; `goodpos` does not |
| `is_exclusion_zone` | C after boulder, **named omit** | live Open |
| `IS_STWALL` | C macro, **imported** | `rm.h:118` `typ <= DBWALL` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No RNG** in the new arm.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates, no recorded coordinates. `W_NONPASSWALL = 0x10` is `rm.h:302`, not a trace constant. Cycle-avoiding clone is documented and matches the existing `mon.js` helper byte-for-byte — not a second incompatible `may_passwall`.

## C ↔ JS fidelity

### Slot — after lava, before amorphous / scary / accessible

C `teleport.c:163–176`:

```
if (passes_walls(mdat) && may_passwall(x, y))
    return TRUE;
if (amorphous(mdat) && closed_door(x, y))
    return TRUE;
if (checkscary && (mtmp->m_id ? onscary(x, y, mtmp)
                              : goodpos_onscary(x, y, mdat)))
    return FALSE;
if (!accessible(x, y)) { … ignorewater/ignorelava … return FALSE; }
```

JS `285–301`: same three tests after lava, then `accessible`. Live-mon `onscary` when `m_id != 0` is still always `goodpos_onscary` (pre-existing named omit). Wallwalk return happens **before** that scary test, so a xorn on Elbereth still returns true here if `may_passwall` — **C same** (`passes_walls` return is before `checkscary`). Match for the claimed slot.

Pool/lava still return earlier. Xorn on pool: C `is_swimmer`/`m_in_air` false → **false**, never wallwalk. JS same after D-1099. D-log canary “pool before wallwalk.” Match.

### `passes_walls(mdat)` not `Passes_walls`

C `mondata.h:29`: `#define passes_walls(ptr) (((ptr)->mflags1 & M1_WALLWALK) != 0L)`.

C `youprop.h:286`: `#define Passes_walls (HPasses_walls || EPasses_walls)` — ring of passwall / poly FROMFORM bit, used in `hack.c` `test_move` / `cant_squeeze_thru` when the mover **is** the hero.

`goodpos` takes `mtmp->data` for **both** youmonst and monsters (`teleport.c:133`, `163`). A human wearing a ring of passwall has `Passes_walls` true and `passes_walls(human data)` false. C `goodpos` on STONE returns false (`accessible` fails; no early-out). JS uses `passes_walls(mdat)` only. D-log: “H/EPasses_walls human STONE false; youmonst xorn form STONE true.” Match. Using youprop here would be a C-wrong. The port did not.

`passes_walls` import from `monsters.js` is the real macro expansion. Not a no-op.

### `may_passwall` clone vs `hack.c`

C `hack.c:932–936`:

```
return !(IS_STWALL(levl[x][y].typ)
         && (levl[x][y].wall_info & W_NONPASSWALL));
```

No `isok` check (caller already `isok`s). TREE is not `IS_STWALL` (`typ <= DBWALL`; TREE sits later). TREE + `W_NONPASSWALL` still returns **true**. Iron bars / closed doors / boulders are not STWALL; wallwalkers pass the helper and then skip boulder via `throws_rocks` or by returning before the boulder test. C wallwalk `return TRUE` is **before** `sobj_at(BOULDER)` — a xorn **may** land on a boulder in `goodpos`. JS same: early-out before boulder. D-log canary “boulder skip” means non-wallwalkers still skip; wallwalkers return true first. Match.

JS clone:

```
if (!loc) return false;
wi = (loc.wall_info | 0) | (loc.flags | 0);
return !(IS_STWALL(loc.typ) && (wi & W_NONPASSWALL));
```

`!loc` is extra vs C (defensive on a missing cell after `isok`). D-0865 split `W_*` onto `flags` vs C’s `wall_info` alias — OR is the established JS analog (`mon.js:80–86`, `apply.js` figurine). Not a D-1100 invention. `IS_STWALL` JS `typ <= DBWALL` ≡ `rm.h:118`. `W_NONPASSWALL` 0x10 ≡ `rm.h:302`. Match for STONE/VWALL + NONPASS false; STONE without the bit true; TREE+NONPASS true.

Local copy vs `import` from `mon.js`: `mon.js` already imports `teleport.js` (`enexto` / `rloc`). Importing `may_passwall` the other way is a cycle. Clone is justified and identical. Classify as **clone of C callee**, not a diverging helper. If the two JS copies drift later, that becomes a C-wrong family — they have not drifted in this SHA.

Amorphous closed-door remains after wallwalk (pudding on a closed door still true without `M1_WALLWALK`). Accessible still rejects closed/locked doors for ordinary forms. Match.

After a **failed** wallwalk (human on STONE, or xorn on NONPASS wall) C still runs amorphous (false for human/xorn) then scary then `!accessible` → false unless ignorewater/ignorelava on an actual pool/lava — which this cell is not. JS same. SDOOR/SCORR are `IS_STWALL` (they sit at or below `DBWALL` in `rm.h` order). Wallwalk on SDOOR: `may_passwall` true unless NONPASS → early true. Ordinary forms: `accessible` false (secret door not `>= DOOR` as a usable door in the JS `accessible` port). D-log canary lists SDOOR/SCORR. Match.

`enexto` fakemon `{ data: mdat, mx:0, wormno:0 }` has `mdat` of the type being placed. `passes_walls(mdat)` uses that type. A xorn *generation* on rock is the public-unhit path this Open line was for. `GP_ALLOW_XY` / `GP_CHECKSCARY` flags are unchanged. `is_exclusion_zone` would run only after a successful fall-through to the end (`teleport.c:181–182`) — wallwalk `return TRUE` **skips** it, so a xorn can be placed in a mongen exclusion zone in C too. JS same. Do not “fix” that by checking exclusion before wallwalk; C does not.

## Hallucinations / overclaim

“Match C so wallwalkers return true via passes_walls and may_passwall before accessible” is **true for the slot, the form flag, STWALL+NONPASS, TREE not blocking, and pool/lava still winning.** It is **not** true that a ring of passwall lets a human occupy stone in `goodpos` (C forbids that here), or that `is_exclusion_zone` ran.

This is **not** “Match C dispatch, callee is a stub.” `passes_walls` is the real `M1_WALLWALK` test; `may_passwall` is a faithful clone of `hack.c`, not a no-op. Stamping **Addressed:** D-1100 is fair. Fill hash `305ad188` in this commit.

## Density (§2b)

One Open cluster: the early-out C writes as two conjuncts. ~15 executable lines + a 6-line helper that already exists in `mon.js`. Playbook “one deferred `if`” is the too-small column; the helper is the C callee that `if` requires. Sibling `is_exclusion_zone` was correctly left Open. Right size (small end).

## Verification

Journal: private canary **68**/68 (table xorn/earth vs jackal/human/pudding; STONE/VWALL/TREE/IRONBARS/SDOOR/SCORR/closed·locked door; W_NONPASSWALL `wall_info` and `flags` alias; TREE+NONPASS still true; H/EPasses_walls human STONE false; youmonst xorn form STONE true / NONPASS false; boulder skip; pool before wallwalk; occupied / `u_at` / `GP_ALLOW_U` / `GP_CHECKSCARY`); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (xorn/earth-elemental placement on rock). Cadence **#1400** (this audit) **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not a wallwalk proof.

C read of `teleport.c:163–182`, `hack.c:932–936` / `958`, `mondata.h:29`, `youprop.h:286`, `rm.h:118` / `302`; JS `teleport.js:207–302`, `mon.js:80–86`, `monsters.js:476–478`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| xorn STONE, no NONPASS | true early | **same** |
| xorn STONE + `W_NONPASSWALL` | false helper → accessible false | **same** |
| earth elemental VWALL | true | **same** |
| TREE + NONPASS | true (`!IS_STWALL`) | **same** |
| human + `HPasses_walls` STONE | false (form flag) | **same** |
| youmonst xorn form STONE | true | **same** |
| jackal STONE | accessible false | **same** |
| pudding closed door | amorphous true (after) | **same** |
| xorn pool | pool arm false | **same** |
| xorn boulder | wallwalk true before boulder | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The early-out is C’s conjunct on form `M1_WALLWALK` and `may_passwall`.

Named omits / do-nots (map / Open, not Must-fix):

1. `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (`teleport.c:181–182`). **Addressed:** D-1101 `a7302142`. Not `onscary`.
2. `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire **Addressed:** D-1102 `ebe1f041`. `onscary` when `m_id != 0` still named.
3. Do not import `mon.js` `may_passwall` (cycle). Do not use youprop `Passes_walls` in `goodpos`.

Do not skip `passes_walls`/`may_passwall`. Do not let pool/lava fall through to wallwalk. Do not restore human ring-of-passwall as `goodpos` stone-ok.

`closed_door` / `accessible` / `throws_rocks` / `sobj_at(BOULDER)` are pre-existing D-0246 helpers, not retouched. `IS_STWALL` import was added with `W_NONPASSWALL` for the clone; `IS_POOL` may remain unused in this file from D-1091. Dead import is a lint smell, not a C-wrong. `may_passwall` returning false on `!loc` after `isok` would only fire if `level.at` is missing a cell the map claims is ok — JS level holes, not C `levl[][]` UB. Not Must-fix.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: wallwalkers now return true from `goodpos` via form `passes_walls` and a `hack.c`-matching `may_passwall` before `accessible()`, while a passwall ring on a human still cannot occupy stone and `is_exclusion_zone` stays the live Open row.
- Must-fix stays empty for this SHA; next port pops Open `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone`. **Addressed:** D-1101 `a7302142`
