# Review 138 — 36e0ce72 — dokick.c `obj_delivery` on `goto_level` (D-1177)

## Metadata
- Full / short hash: `36e0ce722f30dc53aa9875e3ce02ecaa6371196a` / `36e0ce72`
- Parent: `b2962a8a` (review **134–137** + cadence #1495). This file audits **this SHA only**. Archive row **Addressed:** D-1177 `36e0ce72` was filled by D-1178.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 20:50:30 +0200
- D-id: **D-1177**
- Stats: 12 files, +242 / −44 — `js/dokick.js` +122 (`obj_delivery`); `js/do.js` +13 / −4 (two awaits); `js/mkobj.js` +12 (`OBJ_MIGRATING` unlink).
- Claims to close: Open queue `do.c` `goto_level` `obj_delivery` (named). Not in_out_region. Reviews **127** / **137** named `do.c:1815` FALSE and `:1978` TRUE as the missing delivery pair after D-1166 landing `in_out_region`. `reviews/loop-2026-08-15/` has no open obj_delivery Must-fix.
- JS / map: `dokick.js` `obj_delivery`; callers `do.js` `goto_level`; extract `mkobj.js` `obj_extract_self`. `c-js-map/turns.md` `dokick.c` / `do.c`. `deliver_obj_to_mon`, allmain wizkit `obj_delivery(FALSE)`, `fix_shop_damage` / `do_fall_dmg` still named (later SHAs in this window).
- Prior reviews this SHA claims to close: **127** named omit; **137** next-port.

## Intent vs deliverable

Git subject promises: “Match C dokick.c obj_delivery so goto_level places migrating objects at the hero or stairs after a level change, instead of leaving them on the migrating chain.”

Old JS `goto_level` placed the hero (`placebc` / `losedogs` / room messages / `in_out_region`) without walking `migrating_objs`. C delivers twice: `obj_delivery(FALSE)` after `placebc` (WITH_HERO trap-door cargo at the hero) and `obj_delivery(TRUE)` after `check_special_room` (stairs / ladder / sstairs / random). `obj_extract_self` also lacked `OBJ_MIGRATING`, so a delivery pass would have orphaned the rest of the chain.

The diff **does** port the C loop (dest dnum/dlevel filter; `MIGR_TO_SPECIES` skip; nobreak / noscatter; XOR continue; extract; switch dest; `nx>0` place+break+stack+scatter else dummy coords + `rloco`) and wires both `goto_level` sites in C order. It **does** unlink `OBJ_MIGRATING` like `mkobj.c` `extract_nobj(&gm.migrating_objs)`. It does **not** port `deliver_obj_to_mon`, allmain wizkit FALSE, `fix_shop_damage`, `do_fall_dmg`, `kill_genocided_monsters`, or `run_timers`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `obj_delivery` | C callee, **new** | `dokick.c:1769–1851`; async because `breaks` / `scatter` |
| `goto_level` FALSE site | C caller, **new await** | `do.c:1815` after `placebc`, before `losedogs` |
| `goto_level` TRUE site | C caller, **new await** | `do.c:1978` after `check_special_room`, before `in_out_region` |
| `obj_extract_self` `OBJ_MIGRATING` | C arm, **new** | `mkobj.c:2579–2581`; then common `where=OBJ_FREE` |
| `stairway_find_from` | C callee, **imported** | `mklev.js`; ladder FALLTHROUGH then stairs/sstairs |
| `place_object` / `stackobj` / `delobj` | C callee, **imported** | `mkobj.js` |
| `breaks` / `breaktest` | C callee, **imported** | `dothrow.js`; WITH_HERO messages vs silent else |
| `scatter` | C callee, **imported** (partial named inside) | `explode.js`; flags `0`; force `rnd(2)` |
| `rloco` | C callee, **imported** (partial named) | `teleport.js`; Rider / flooreffects / shop bill / W-tower still named |
| `newsym` | C callee | noscatter arm |
| `IS_SOFT` | C macro, **imported** | `const.js` ≡ `rm.h:140` AIR/CLOUD/`IS_POOL` |
| `MIGR_*` | C macros, **imported** | `const.js` matches `dungeon.h:150–162` |
| `deliver_obj_to_mon` | C sibling, **named omit** | `dokick.c:1854+`; Open |
| wizkit `obj_delivery(FALSE)` | C caller, **named omit** | `allmain.c:828`; Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest `(nx,ny)` is live stair / hero / `rloco` pick. Rule #2 clean.

**New RNG on this path:** `rnd(2)` before scatter; `breaktest`/`breaks` may `obj_resists` `rn2`; `rloco` `rn1`/`rn2` loop; scatter internals. Empty `migrating_objs`: **zero** extra RNG.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not invert the XOR (FALSE is WITH_HERO, TRUE is not). Do not treat `MIGR_WITH_HERO` (9) as `MIGR_NOSCATTER` (2048). Do not zero `nx`/`ny` each iteration (C persists; only RANDOM/default zeros). Do not `delobj` the boulder-in-wall path (that is D-1178). Do not pull `fix_shop_damage` into this peel.

## C ↔ JS fidelity

### Callers vs `do.c:1813–1816` and `:1976–1981`

C:

```
if (Punished) placebc();
obj_delivery(FALSE);
losedogs();
…
check_special_room(FALSE);
obj_delivery(TRUE);
(void) in_out_region(u.ux, u.uy);
```

JS (`do.js` after this SHA): `placebc` then `await obj_delivery(false)` then `losedogs`; later `check_special_room` then `await obj_delivery(true)` then `in_out_region`. **Order matches.** `kill_genocided_monsters` / `run_timers` between losedogs and collide remain named (Open). `in_out_region` is D-1166. Not this peel.

### XOR vs `dokick.c:1792–1793`

C: `if (!near_hero ^ (where == MIGR_WITH_HERO)) continue;`

After stripping `MIGR_NOBREAK|MIGR_NOSCATTER`, `where == MIGR_WITH_HERO` is 0 or 1. Bitwise XOR with `!near_hero`:

| `near_hero` | `where` | C continue? | Deliver? |
|-------------|-----------|-------------|----------|
| FALSE | WITH_HERO (9) | no | yes (trap-door at hero) |
| FALSE | STAIRS/RANDOM | yes | no |
| TRUE | WITH_HERO | yes | no |
| TRUE | STAIRS/RANDOM | no | yes |

JS: `if ((!near_hero) !== (where === MIGR_WITH_HERO)) continue;` — same boolean XOR. Callers pass `false` then `true`. Match.

### noscatter vs `:1788–1790`

C: `noscatter = (where & MIGR_WITH_HERO) != 0` **before** stripping flags. `MIGR_WITH_HERO` is 9 (`0b1001`), not the 2048 `MIGR_NOSCATTER` bit. JS comment and `(where & MIGR_WITH_HERO) !== 0` match C, including the oddity that `MIGR_STAIRS_UP` (3) `& 9` is nonzero. Do not “fix” that to `=== 9` or to the 2048 flag.

### Switch / persist vs `:1800–1823`

C `nx, ny` declared **outside** the for-loop; only `MIGR_RANDOM` / `default` zeros them. A failed `stairway_find_from` leaves the previous object’s cell. JS `let nx = 0, ny = 0` outside; same switch; RANDOM/default zeros; WITH_HERO writes `u.ux`/`u.uy`; ladder sets `isladder` then FALLTHROUGH into stairs/sstairs. Match.

`omigr_from_*` copied into `fromdlev` then cleared. Match.

### Break / scatter vs `:1824–1848`

`nx > 0`: `place_object`; if `!nobreak && !IS_SOFT(typ)`: WITH_HERO → `breaks` (messages, continue if broke); else `breaktest` then silent `delobj`. Then `stackobj`; `!noscatter` → `scatter(..., rnd(2), 0, otmp)` else `newsym`.

`nx == 0`: dummy `ox=oy=0`; `if (rloco && !nobreak && breaktest) delobj`.

JS same branch order. `breaks` / `breaktest` / `scatter` / `rloco` / `IS_SOFT` / `place_object` are **imported C callees**, not local clones.

`rloco` is **partial** (named Rider revive, `flooreffects`, shop bill, W-tower / `dndest` restricted_fall). JS `rloco` always returns true after a `goodpos` pick, so the `rloco && breaktest` short-circuit never sees C’s FALSE (object already gone to lava/revive). That is a **named omit on `rloco`**, not a stub of `obj_delivery`. Stairs / WITH_HERO paths do not call `rloco`. Random migrating objects on the TRUE pass would diverge if `flooreffects` would have consumed them. Map already names that on `teleport.c` `rloco`. Do not Must-fix it onto an Open line that said “Not in_out_region.”

Second `obj_extract_self` inside `rloco` after delivery already extracted: C `OBJ_FREE` is a no-op in the switch; JS unmatched `where` falls through to set `OBJ_FREE` again. Match.

| Case | C | JS after |
|------|---|---------|
| empty `migrating_objs` | loop never runs | **same** |
| other-level ox/oy | continue, stay on chain | **same** |
| `MIGR_TO_SPECIES` | continue, no extract | **same** |
| FALSE + WITH_HERO, soft terrain | place at hero, skip break, noscatter `newsym` | **same** |
| FALSE + WITH_HERO, hard, glass | `breaks` messages; continue if broke | **same** |
| TRUE + STAIRS_UP, find_from hits | place at `stway.sx/sy`; silent `breaktest` | **same** |
| TRUE + STAIRS_UP, find_from misses | keep previous `nx` (or 0 → `rloco`) | **same** |
| TRUE + RANDOM | dummy 0,0 then `rloco` | **same** (rloco internals named) |
| `MIGR_NOBREAK` | skip break/breaktest | **same** |
| wizkit FALSE at `newgame` | `allmain.c:828` | **named skip** |

`scatter(..., rnd(2), 0, otmp)`: force is 1 or 2; flags 0 means no MAY_HITMON / MAY_DESTROY. JS `scatter` still rolls dir `rn2(N_DIRS)` and `rnd(range)` like C. Partial named insides (MAY_FRACTURE) do not fire at flags 0. Not a stub of the delivery call.

### Extract vs `mkobj.c:2579–2614`

C `OBJ_MIGRATING` → `extract_nobj(&gm.migrating_objs)` → `where=OBJ_FREE`, `nobj=0`. JS unlinks `game.migrating_objs` then the common tail sets `nobj`/`nexthere` null and `where=OBJ_FREE`. Does **not** clear `ox`/`oy` (D-0911). Delivery then overwrites coords. Match. Without this arm the new loop would leave the chain pointing at a FREE object.

`MIGR_TO_SPECIES` continue **without** extract: object stays on the migrating chain for `deliver_obj_to_mon`. Match. That sibling is still named.

## Hallucinations / overclaim

D-log / CURRENT / subject say `goto_level` places migrating objects at the hero or stairs instead of leaving them on the migrating chain. **That is the hunk:** both C call sites plus the `dokick.c:1769–1851` body plus the extract arm the body requires. Stamping **Addressed:** D-1177 is fair for the Open **obj_delivery** line. Hash `36e0ce72` is on the archive row (filled by D-1178). Do **not** stamp it as “Match C `deliver_obj_to_mon`” or “Match C wizkit” or “Match C `rloco` flooreffects” or “Match C `fix_shop_damage`.” This is **not** “Match C dispatch, callee is a stub”: `obj_delivery` is the real loop; `breaks` / `breaktest` / `stairway_find_from` / `place_object` / `scatter` are live; `rloco` is a partial C function with named internals, used only on the random arm.

## Density

One C function plus the extract arm it cannot run without, and both documented `goto_level` sites (the Open line named the pair; XOR is one function). ~120 JS lines in the callee + ~12 extract + two awaits. Right-size §2b. Did not pull shop catchup or shaft `losehp`. Not QUALITY-RISK.

## Verification

Journal: green+strict seed8000/0900; cohort **10**/10 (green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+screens. Path **public-unhit** when `migrating_objs` is empty — the usual public case. Green/cohort prove the empty-chain no-op does not inject `rnd(2)` / `rloco` RNG. They do **not** prove WITH_HERO `breaks` or stair `scatter`.

C read of `dokick.c:1769–1851`, `do.c:1813–1823`, `:1974–1996`, `mkobj.c:2556–2614`, `dungeon.h:150–162`, `rm.h:140`; JS SHA `obj_delivery` + both awaits + `OBJ_MIGRATING`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1500**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — empty chain did not desync the fortress.

## Actionable C-wrongs

None that Must-fix this next iter. The Open XOR + both `goto_level` sites match C. Extract matches. Callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. `deliver_obj_to_mon` (`dokick.c:1854+`). Open.
2. allmain wizkit `obj_delivery(FALSE)` (`allmain.c:828`). Open.
3. `rloco` Rider / `flooreffects` / shop bill / W-tower restricted_fall (pre-existing named on `teleport.js`).
4. `kill_genocided_monsters` / `run_timers` after losedogs (`do.c:1817–1823`). Open.
5. Do not invert XOR. Do not use `MIGR_NOSCATTER` for `noscatter`. Do not zero `nx` every object. Do not skip `OBJ_MIGRATING` unlink. Do not pull `fix_shop_damage` into this SHA — **Addressed:** D-1178 `4a700d08`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now runs C’s XOR `obj_delivery(FALSE)` then `TRUE` so WITH_HERO cargo lands at the hero and stair/random cargo after room messages, with migrating-chain unlink, while `deliver_obj_to_mon` and wizkit stay named.
- Must-fix stays empty for this SHA; next port in this window popped Open `fix_shop_damage`. **Addressed:** D-1177 `36e0ce72`. Not in_out_region, not wizkit.
