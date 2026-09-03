# Review 754 — da520eda — vision.c do_clear_area override_vision (D-1785)

## Metadata
- Full / short hash: `da520eda5e9f701bb84d4c98a8ce4ae6ee9ed44c` / `da520eda`
- Parent: `7870c5c6` (D-1784). This file audits **this SHA only**. HEAD.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 20:51:27 +0200
- D-id: **D-1785**
- Stats: `js/vision.js` +25/−5; `js/detect.js` +19/−51; `js/dogmove.js` +3/−3; `js/fountain.js` +1/−1; `js/read.js` +1/−1. Total `js/` insertions **49** / **61** deletions. Band **150–350**.
- Claims to close: Open `vision.c` `do_clear_area` off-hero `view_from` + detect.js clone. Review **744** / D-1775 named the couldsee-only hole.
- JS / map: `vision.js` one async export; `detect.js` `detecting` + `openit` identity. `c-js-map/turns.md` / `data.md`.
- Archive **Addressed:** D-1785 `da520eda`.

## Intent vs deliverable

Git subject promises: Match C `vision.c` `do_clear_area` so detection on the water and air levels overrides vision that cannot pass through water or clouds, instead of a hero-only detect.js clone that skipped `override_vision` and an `openit` arrow that destroyed the callback identity `detecting()` needs.

`node scripts/csym.mjs do_clear_area` → `vision.c:2106–2148`. `--callers`: `detect.c:1815` `findone`; `:1923` `openone`; `dogmove.c:630` `wantdoor`; `fountain.c:124` `gush`; `read.c:2601` `set_lit`. `detecting` → `detect.c:1928–1932`.

The diff **does** make one async `vision.js` export, add `couldsee || override_vision` via exported `detecting()`, pass `openone` **by identity**, delete the `detect.js` clone and `CIRCLE_*` tables, and await all five callers (`dog_goal` async). Off-hero still `view_from` (file-local). Fountain/dog_goal still use arrows; those callbacks are **not** `findone`/`openone`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `do_clear_area` | LIVE repaired | only export; clone **deleted** |
| `detecting` | LIVE new | `func === findone \|\| func === openone` |
| `findone` / `openone` | LIVE local | `openit` passes **identity** |
| `view_from` | LIVE local | off-hero; **no** override (C same) |
| `dog_goal` | LIVE repaired | async; `dog_move` awaits |
| `CIRCLE_DATA` / `CIRCLE_START` | deleted | detect.js tables gone |
| `FOUND_FLASH_COUNT==0` `tmp_at` | OMIT named | |
| fountain `gush` arrow | pre-existing stand-in | not a `detecting()` callback |

`node scripts/sym.mjs` (deleted / re-pointed):

```
do_clear_area    js/vision.js:734   ASYNC — await required
detecting        js/detect.js:656   sync
findone          NOT EXPORTED — 1 LOCAL js/detect.js:562
openone          NOT EXPORTED — 1 LOCAL js/detect.js:747
openit           js/detect.js:806   ASYNC
view_from        NOT EXPORTED — 1 LOCAL js/vision.js:666
CIRCLE_DATA      NOT FOUND
```

`--can vision.js detect.js detecting`: **ALREADY**. This SHA **adds** `vision.js → detect.js`; `detecting` is a hoisted `function`. Cycle-safe. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

```2106:2146:nethack-c/upstream/src/vision.c
    if (scol != u.ux || srow != u.uy) {
        view_from(srow, scol, ..., range, func, arg);
    } else {
        override_vision = (detecting(func)
                           && (Is_waterlevel(&u.uz) || Is_airlevel(&u.uz)));
                if (couldsee(x, y) || override_vision)
                    (*func)(x, y, arg);
```

```1928:1932:nethack-c/upstream/src/detect.c
boolean detecting(void (*func)(...)) {
    return (func == findone || func == openone);
}
```

JS hero path: `override_vision = detecting(func) && (Is_waterlevel(u.uz) || Is_airlevel(u.uz))` then `await func` if `couldsee || override_vision`. Off-hero: `view_from` **without** override (and without `await` — `view_from` is sync; wantdoor arrow is `dist2`). `detecting` is `func === findone || func === openone`. **Match.**

**`openit` identity.** C `:1923` `do_clear_area(..., openone, &num)`. HEAD `js/detect.js:821` `await do_clear_area(u.ux, u.uy, BOLT_LIM, openone, num)` — **not** an arrow. `findit` already passed `findone` (`:678`). Water/air detection can fire. **Match.** An arrow would make `detecting()` false even with a correct gate.

**Clone deletion.** One `do_clear_area`. `CIRCLE_*` gone from `detect.js`. `vision.js` tables go through radius 15 (`MAX_RADIUS`).

**`dog_goal` async.** Only caller `dog_move` awaits. Off-hero `view_from` calls a **sync** wantdoor arrow (`dist2` ≡ C `distu`). C `override_vision` would not apply there anyway.

**Fountain arrow.** C passes `gush` by identity. JS still collects couldsee cells then awaits `gush`. Not a `detecting()` callback. Pre-existing async stand-in. Not a live detection C-wrong.

**Callee closure.** LIVE: `detecting`, `findone`/`openone` by identity, `view_from`, `couldsee`. OMIT named: `tmp_at`. STUB: **none** in a live detecting arm. Rule #2 clean. Cadence this overlay: 44/44, `44+0.34/turn`.

## Hallucinations / overclaim

“Match C `do_clear_area`” is true for override_vision, off-hero `view_from`, and one export. “`openit` arrow destroyed `detecting()`” is true and **fixed**. Do **not** stamp “Match C `gush` passed by identity.” Do **not** stamp “Match C `tmp_at` findit.” Public water/air detect is **unhit**; commit admits private probes (ordinary level open 0 / water+air open 1 with `couldsee` false). A first probe hung because typ 19 was used as ROOM (real ROOM is 25) — probe bug, not a port defect.

## Density

One C helper + the `detecting` identity it needs + clone deletion + five callers. +49/−61. Did not glue `tmp_at`. Right size.

## Verification

Commit: green+strict; 44/44 (this audit overlay re-ran full `sessions`: **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838, speed `44+0.34/turn`). Pet/fountain cohort including seed1800. `sym.mjs` shows a single `do_clear_area`. This audit read `detecting()` vs `openit`’s argument.

## Actionable C-wrongs

None for Must-fix. Named: `FOUND_FLASH_COUNT==0` `tmp_at`; keep `view_from` file-local. Do **not** restore the `detect.js` `do_clear_area` clone or `CIRCLE_*` tables. Do **not** collect `openit` cells through an arrow. Do **not** put `override_vision` on the off-hero `view_from` arm. Fountain may keep the gush collect stand-in until `gush` is passed by identity for order, not for `detecting()`.

**Pinned-C walk this overlay.**
`csym.mjs do_clear_area` → `vision.c:2106–2148`.
`detecting` `detect.c:1928–1932` is `func == findone || func == openone`.
HEAD `js/detect.js:656–658` and `:821` pass `openone` by identity;
`findit` `:678` passes `findone`.
Off-hero `view_from` has no override (C same).
Cadence this overlay: 44/44, `44+0.34/turn`.
Rule #2 clean. `sym.mjs` one `do_clear_area`.

Verdict: **ACCEPT-WITH-DEBT**
