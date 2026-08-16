# Review 52 — 278521f1 — `goodpos` `is_pool()` / `is_lava()` not typ macros (D-1091)

## Metadata
- Full / short hash: `278521f123f6265e003844b9182869c5c137da70` / `278521f1`
- Parent: `43caa8ff` (D-1090). JS-touching since last dedicated review file creation (`8bb7d93f`): D-1089, D-1090, **this SHA**, D-1092. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 17:09:27 +0200
- D-id: **D-1091**
- Stats: 12 files, +126 / −59 — `js/teleport.js` +23 / −11 (`goodpos` pool/lava tests + imports). Docs include a **missing `DIVERGENCE-INDEX.md` row for D-1091** (D-1092 then D-1090 in the table); this review commit inserts it.
- Claims to close: Open queue `teleport.c` `goodpos` must call `is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros (named from D-1077 review **38**). Review **38** named omit 3. Stamped **Addressed:** D-1091 `278521f1` on the archive row (filled by D-1092). Also stamped review **38** item 3. `reviews/loop-2026-08-15/` has no open goodpos-macro Must-fix.
- JS / map: `teleport.js` `goodpos`. `c-js-map/turns.md` teleport row. youmonst swim/lev/fly/wwalk arms, `passes_walls`, `GP_AVOID_MONPOS` `is_exclusion_zone`, `goodpos_onscary` Elbereth still named (live Open).
- Prior reviews this SHA claims to close: **38** item 3. D-1090 D-log “not this iter: goodpos still macros.”

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos so a raised drawbridge over lava is lava, not a pool.”

The queue line was the two `is_*()` calls inside `goodpos`. The bug is `rm.h` `IS_POOL(typ)` = `(typ) >= POOL && (typ) <= DRAWBRIDGE_UP` — **every** raised bridge is a “pool” to the macro, so UP+`DB_LAVA` took the swimmer arm before the lava arm. C `teleport.c` calls `is_pool(x,y)` / `is_lava(x,y)`.

The diff **does** that envelope: import shared `hack.js` `is_pool` / `is_lava`; replace both `if (mtmp)` arms and the later `!accessible` ignore flags. It also **deletes** the JS-only `else` that rejected `IS_POOL`/`IS_LAVA` when `!mtmp`. C has no such else — null `mtmp` falls through to `accessible()` + ignorewater/ignorelava. That deletion is the C translation of the same if/else, not a second hypothesis.

It does **not** port youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool·lava arms. Named, already Open. It does **not** port `passes_walls`+`may_passwall`, `onscary` when `m_id != 0`, or `is_exclusion_zone`. Named, already Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos` pool/lava tests | C body, **retouched** | `teleport.c:134–175` |
| `is_pool` / `is_lava` | C callees, **imported** | real; D-1090 / D-1077 |
| `IS_POOL` / `IS_LAVA` | C macros, **removed from these tests** | `IS_POOL` import may remain unused elsewhere in the file |
| `!mtmp` pool/lava `else` | **deleted JS invention** | C falls through |
| youmonst pool/lava arms | C sibling, **named omit** | still monster `is_swimmer` / `m_in_air` |
| `passes_walls` + `may_passwall` | C sibling, **named omit** | live Open |
| `goodpos_onscary` | **clone**, fakemon only | Elbereth/scare/altar-vamp named |
| `m_in_air` | **clone** of `mon.c` | flyer/floater; cling named |
| `is_exclusion_zone` | C sibling, **absent** | live Open |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. One RNG site in this function is unchanged: eel `rn2(13)` after the pool arm.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. The UP+lava example is C `dbridge.c` semantics, not a recorded `(gx,gy)`. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Why the macros were wrong

C `rm.h:129–130`:

```
#define IS_POOL(typ) ((typ) >= POOL && (typ) <= DRAWBRIDGE_UP)
#define IS_LAVA(typ) ((typ) == LAVAPOOL || (typ) == LAVAWALL)
```

`DRAWBRIDGE_UP = 19` sits in the pool **range**. `IS_LAVA` never sees a raised lava bridge. Old JS `if (IS_POOL(typ)) … else if (IS_LAVA(typ))` therefore classified UP+`DB_LAVA` as a pool: swimmer/`m_in_air` over water, not flyer/`likes_lava` over lava. A salamander on UP+lava failed; a swimmer succeeded. C opposite.

### `mtmp` present — pool, eel, lava

C `teleport.c:117–162` after occupied-worm check:

```
        if (is_pool(x, y) && !ignorewater) {
            if (mtmp == &gy.youmonst)
                return (Swimming || Amphibious || (!Is_waterlevel
                            && !is_waterwall(x, y)
                            && (Levitation || Flying || Wwalking)));
            else
                return (is_swimmer(mdat)
                        || (!Is_waterlevel(&u.uz)
                            && !is_waterwall(x, y)
                            && m_in_air(mtmp)));
        } else if (mdat->mlet == S_EEL && rn2(13) && !ignorewater) {
            return FALSE;
        } else if (is_lava(x, y) && !ignorelava) {
            if (mdat == &mons[PM_FLOATING_EYE])
                return FALSE;
            else if (mtmp == &gy.youmonst)
                return (Levitation || Flying || (Fire_resistance && Wwalking
                            && uarmf && uarmf->oerodeproof)
                        || (Upolyd && likes_lava(gy.youmonst.data)));
            else
                return (m_in_air(mtmp) || likes_lava(mdat));
        }
```

JS `teleport.js:170–183`: `is_pool` then monster swimmer/`m_in_air` (youmonst deferred); `else if` eel `rn2(13)`; `else if` `is_lava` then floating-eye false then `m_in_air \|\| likes_lava` (youmonst deferred). `IS_WATERWALL(typ)` vs C `is_waterwall(x,y)` is `IS_WATERWALL(levl[x][y].typ)` (`dbridge.c:38–43`) — equivalent.

Eel `rn2(13)` only runs when `is_pool` is false (else-if). C same. clang left-to-right: `mdat->mlet == S_EEL` then `rn2(13)` then `!ignorewater`. JS `mdat?.mlet === 'S_EEL' && rn2(13) && !ignorewater` — optional-chain does not skip `rn2` when mlet is `S_EEL`. When `mdat` is missing, JS skips `rn2` (short-circuit); C would have `mtmp->data`. Fakemon / real `makemon` always set `.data`. Not a new miss.

Floating-eye lava: C `mdat == &mons[PM_FLOATING_EYE]`; JS `(mdat.mndx ?? -1) === PM_FLOATING_EYE`. Generated index. Match.

UP+`DB_LAVA`, `!ignorelava`, flyer: `is_pool` false, `is_lava` true, `m_in_air` true → **true**. Swimmer / salamander: flyer false, `likes_lava(salamander)` true → **true**; ordinary swimmer false → **false**. Old JS: `IS_POOL` true → swimmer true / salamander `m_in_air` false → **false**. That is the subject.

UP+`DB_MOAT`: `is_pool` true (D-1090) → swimmer/`m_in_air` arm, never lava. Match.

### `!mtmp` — deleted else is C

C initializes `mdat = 0`. The whole pool/eel/lava/scary block is `if (mtmp)`. Then:

```
    if (!accessible(x, y)) {
        if (!(is_pool(x, y) && ignorewater)
            && !(is_lava(x, y) && ignorelava))
            return FALSE;
    }
```

Old JS `else { if (IS_POOL && !ignorewater) return false; if (IS_LAVA && !ignorelava) return false; }` rejected **every** raised bridge for object placement (`IS_POOL(DRAWBRIDGE_UP)`), including UP+floor, and never used `is_lava` for UP+lava (macro false). New JS has no else; `!accessible` uses `is_pool`/`is_lava` + ignore flags. UP+lava without `ignorelava`: not accessible, `is_lava` true → false. UP+moat without `ignorewater`: false. UP+floor: neither helper → false if not accessible. Match C.

Boulder: C `sobj_at(BOULDER) && (!mdat || !throws_rocks(mdat))`. JS same; null `mdat` rejects boulder cells. Untouched.

### youmonst / `passes_walls` / onscary — named Open

If `mtmp === game.youmonst` on a pool, JS still uses `is_swimmer(youmonst.data)` / `m_in_air` (human is neither) instead of Swimming/Wwalking/Levitation/Flying. Pre-existing. Live Open: `teleport.c` `goodpos` youmonst swim/lev/fly/wwalk. This SHA’s comments mark the holes. Do not Must-fix a named Open row the subject did not claim.

C `passes_walls(mdat) && may_passwall(x,y) return TRUE` before amorphous doors. JS comment “deferred.” Live Open.

C `checkscary && (mtmp->m_id ? onscary(x,y,mtmp) : goodpos_onscary(x,y,mdat))`. JS always `goodpos_onscary` (human/angel false, else false — stub). Live Open for Elbereth/scare/altar-vamp **and** the `m_id` `onscary` split. Named.

`GP_AVOID_MONPOS && is_exclusion_zone` still absent. Live Open.

## Hallucinations / overclaim

“Match C teleport.c goodpos so a raised drawbridge over lava is lava, not a pool” is **true for monster placement and for the `!accessible` ignore flags.** Callees `is_pool`/`is_lava` are the real D-1090/D-1077 functions, not stubs. This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that youmonst `goodpos` on a pool is C `Swimming\|\|…`, or that `onscary` runs for a real `m_id`. The header names those.

Deleting the `!mtmp` else is **not** over-scope: C never had it; leaving a macro `else` would have kept the DRAWBRIDGE_UP-as-pool reject for engraving/object `goodpos`.

Stamping **Addressed:** D-1091 is fair. Hash `278521f1` is on the archive row (filled by `c3f28bfd`). The D-log exists; the **index row was omitted** in this SHA — docs miss, filled here, not a JS C-wrong.

## Density (§2b)

One Open cluster: the `goodpos` pool/lava predicates plus the `!mtmp` else that used the same macros. ~20 executable lines in one function. Right size. youmonst / `passes_walls` / onscary left named (already queued as separate Open rows). Not “finish teleport.c.”

## Verification

Journal: private canary **44**/44 (POOL/MOAT/WATER/LAVAPOOL/LAVAWALL; UP+`DB_LAVA` swimmer false / flyer·salamander true / eye false; UP+dir+lava; UP+`DB_MOAT` swimmer true / sala false; UP+ICE/FLOOR neither; DOWN+lava walkable; ignorewater/ignorelava; null mtmp; `!isok`); green+strict seed8000/0900; cohort **14**/14 (1500/1800/0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009/0367) + sit/liquid strict. Path **public-unhit** on public DRAWBRIDGE_UP lava placement. Cadence **#1390** **44**/44 — fortress.

C read of `teleport.c:90–185`, `dbridge.c:46–74`, `rm.h:129–130`; JS `teleport.js:137–199`, `hack.js:740–765`. Hunk grepped FORCE/fs/seed.

| mtmp | cell | C | old JS | new JS |
|------|------|---|--------|--------|
| flyer | UP+`DB_LAVA` | lava arm true | pool arm (`IS_POOL`) | **lava arm true** |
| swimmer | UP+`DB_LAVA` | lava arm false | pool arm true | **lava arm false** |
| swimmer | UP+`DB_MOAT` | pool arm true | pool arm true | **pool arm true** |
| null | UP+`DB_LAVA`, !ignorelava | `!accessible` false | `IS_POOL` else false | **`is_lava` false** |

Eel land: `rn2(13)` still 12/13 reject. Unchanged.

## Actionable C-wrongs

None that Must-fix this next iter. The claimed `is_pool()`/`is_lava()` tests match `teleport.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (live Open).
2. `passes_walls` + `may_passwall` early-out (live Open).
3. `GP_AVOID_MONPOS` `is_exclusion_zone` (live Open).
4. `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire; `onscary` when `m_id != 0` (live Open).
5. hideunder / trap.js `is_pool_or_lava` still `IS_POOL` macros (named). `waterbody_name` `SURFACE_AT` / `db_under_typ` **Addressed:** D-1103

Do not restore `IS_POOL`/`IS_LAVA` in `goodpos`. Do not restore the `!mtmp` pool/lava else. Do not treat `IS_POOL(DRAWBRIDGE_UP)` as `is_pool(x,y)`. Do not pull youmonst arms into `dogmove` pal/target.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goodpos` now routes a raised lava drawbridge through `is_lava()` like `teleport.c`, so flyers/`likes_lava` succeed and swimmers fail, while youmonst swim/levitate arms and `onscary` stay named Open.
- Must-fix stays empty for this SHA; next port after D-1092 pops Open `dogmove.c` pal/target numeric `ptr.msound`.
