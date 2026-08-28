# Review 535 — 1ba35e31 — vision.c unblock_point / dig_point (D-1574)

## Metadata
- Full / short hash: `1ba35e3127d23ec96a613d88e77f238f120a9506` / `1ba35e31`
- Parent: `423b6b29` (D-1573). This file audits **this SHA only** (eighth of nine `js/` commits since review **527**). Archive **Addressed:** D-1574 `1ba35e31`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 08:38:09 +0200
- D-id: **D-1574**
- Stats: `js/vision.js` +106 / −9, `js/mon.js` +14 / −5. Band 150–350 (js/ insertions **120**).
- Claims to close: Open `unblock_point` after D-1557. Not `nv_range`. Not `mimic_light_blocking` See_invisible. `reviews/loop-2026-08-15/` has no unpaid unblock Must-fix.
- JS / map: `vision.js` `dig_point`/`unblock_point`/`recalc_block_point`; `mon.js` `seemimic`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **518** / **534** named `unblock_point`. **518** said do not replace `recalc_block_point` with `unblock_point` in that iter — this SHA did the C recalc body.

## Intent vs deliverable

Git subject promises: a cell becoming transparent runs `dig_point` and `seemimic` unblocks a discovered lightblocker mimic instead of leaving `viz_clear` behind a full `vision_reset`.

Pinned C `vision.c` `unblock_point` `:898–907` (`dig_point(y,x)` then `viz_array[y][x]` → `vision_full_recalc`). Callee `dig_point` `:966–1048` (`staticfn`; already-clear return; left edge / right edge / both-clear `continue` non-end / left-clear / right-clear / both-blocked; **no** leftover-`i` end writes). `recalc_block_point` `:910–917`. `block_point` `:864–891` (already live D-1557). Caller `mon.c` `seemimic` `:4408–4427` (`is_blocker_appear` before `M_AP_NOTHING`; `!does_block` then `unblock_point`; `newsym`). `does_block` `:152–202`. `is_lightblocker_mappear` `monst.h:233–239`.

```898:917:nethack-c/upstream/src/vision.c
void
unblock_point(int x, int y)
{
    dig_point(y, x);
    if (gv.viz_array[y][x])
        gv.vision_full_recalc = 1;
}

void
recalc_block_point(coordxy x, coordxy y)
{
    if (does_block(x, y, &levl[x][y]))
        block_point(x, y);
    else
        unblock_point(x, y);
}
```

```4411:4426:nethack-c/upstream/src/mon.c
    boolean is_blocker_appear = (is_lightblocker_mappear(mtmp));
    if (has_mcorpsenm(mtmp))
        freemcorpsenm(mtmp);
    mtmp->m_ap_type = M_AP_NOTHING;
    mtmp->mappearance = 0;
    if (is_blocker_appear
        && !does_block(mtmp->mx, mtmp->my, &levl[mtmp->mx][mtmp->my]))
        unblock_point(mtmp->mx, mtmp->my);
    newsym(mtmp->mx, mtmp->my);
```

Old JS: `recalc_block_point` ignored `(x,y)` and called `vision_reset()` + `vision_full_recalc=1` (D-0113 stub). `seemimic` cleared disguise only.

The diff **does** port `dig_point` (inverse of live `fill_point`), export `unblock_point`, make `recalc_block_point` match C `:910–917`, and capture-then-unblock in `seemimic`. It **does not** port `has_mcorpsenm`/`freemcorpsenm`, Underwater `is_moat`, `display.c` `mimic_light_blocking` See_invisible `block_point`/`unblock_point` (still `recalc`), or C’s per-cell `block_point` in `region.c` `add_region` `:326–328`. Named in the D-log as “other `unblock_point` sites already on recalc.”

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dig_point` | C `:966–1048`, **LIVE this SHA** | one local; do not write #2 |
| `unblock_point` | C `:898–907`, **LIVE this SHA** | new export |
| `recalc_block_point` | C `:910–917`, **LIVE this SHA** | was full `vision_reset` |
| `seemimic` capture + unblock | C `:4411–4424`, **LIVE this SHA** | |
| `does_block` / `block_point` / `fill_point` | **LIVE** D-1557 | occupancy still fmon |
| `is_lightblocker_mappear` | **LIVE** | |
| `has_mcorpsenm` / `freemcorpsenm` | **OMIT named** | |
| `mimic_light_blocking` See_invisible | **OMIT named** | still `recalc` |
| `region.c` per-cell `block_point` | **STUB at JS callers** | one-corner `recalc` |

`node scripts/csym.mjs unblock_point` → `vision.c:898-907`. `--callers`: **39** sites (apply, dbridge, detect, dig, display, dokick, lock, mklev, mon `:4424`, region `:376`/`:1072`, zap, …). `dig_point` → `:966-1048` (only `unblock_point:901`). `recalc_block_point` → `:910-917`; `--callers`: **30** sites. `seemimic` → `mon.c:4408-4427`.

RNG: **none** in `dig_point` / `unblock_point` / `recalc` / `seemimic`.

`node scripts/sym.mjs` on new / re-pointed names:

```
unblock_point    js/vision.js:389   sync
dig_point        NOT EXPORTED — 1 LOCAL in js/vision.js:211
  => Do NOT write clone #2.
recalc_block_point js/vision.js:399   sync
block_point      js/vision.js:379   sync
fill_point       NOT EXPORTED — 1 LOCAL in js/vision.js:298
does_block       js/vision.js:134   sync
seemimic         js/mon.js:876       sync
is_lightblocker_mappear js/vision.js:99  sync
vision_reset     js/vision.js:164   sync
mimic_light_blocking NOT EXPORTED — 1 LOCAL in js/vision.js:112
```

`--can mon.js vision.js unblock_point`: ALREADY statically imported. `--can vision.js mon.js m_at`: SAFE (hoisted). Occupancy stays fmon (no 2D `level.monsters` grid). Do **not** add `dig_point` clone #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`unblock_point`. `dig_point(y,x)` then `if (viz_array[y][x]) vision_full_recalc=1`. Optional `?.` is a JS softening. **Match `:898–907`.** Light-source recalc still a C comment.

`dig_point`. Already-clear return (JS also `!viz_clear[row]` — dead: row arrays always exist). Left edge copies `right_ptrs[1]` or writes `right=1` + left-loop; right edge symmetric; both-clear two loops with `continue` on opaque `i`; left-clear / right-clear / both-blocked including `left=col-1` `right=col+1`. **No leftover-`i` (those are `fill_point` only).** Caller `unblock_point(x,y)` → `dig_point(y,x)`. **Match `:966–1048`.**

`recalc_block_point`. `does_block` then `block_point` else `unblock_point`. **Match `:910–917`.** This is **not** equivalent to the old stub: C `vision_reset` `:210–265` rebuilds every cell and always sets `vision_full_recalc`. The stub ignored `(x,y)` and did that. Live recalc updates **one** cell and sets the flag only if that cell was could-see.

`seemimic`. Capture `is_lightblocker_mappear` before `M_AP_NOTHING`; then `!does_block` → `unblock_point`; `newsym` if `mx>0` (C always `newsym`; pre-existing). **Match `:4411–4424` except `has_mcorpsenm` (named) and mx=0 `newsym`.** `does_block` occupancy remains the D-1557 fmon clone, not C `m_at` (`rm.h:516`).

Callee closure (`seemimic` unblock arm). LIVE: `is_lightblocker_mappear`, `does_block`, `unblock_point`, `dig_point`. OMIT named: `freemcorpsenm`. STUB: **none in this arm.** Combined-arm may ship **for seemimic**.

Callee closure (JS **callers that still say “C unblock_point” but call `recalc_block_point` once**). C `region.c` `add_region` `:326–328` `block_point(i,j)` **every** visible inside cell; `remove_region` `:375–376` and `expire_gas_cloud` `:1071–1072` `!does_block` then `unblock_point` **per cell**. JS `make_gas_cloud` / `remove_region` call `recalc_block_point(rects[0])` **once**; `expire_gas_cloud` pass 1 is an empty comment. While recalc was `vision_reset`, that one call rebuilt the whole map (`does_block` sees gas via `visible_region_at`). After this SHA it fill/digs **only the corner**. That is a **C-wrong**, not a named omit — the map still claims “`recalc_block_point` on create/expire” as if the stub’s full rebuild survived.

## Hallucinations / overclaim

Subject `dig_point` + `seemimic` capture-then-unblock: **true for those two functions.** D-log “not a public FAIL” / fortress 44/44: **false at this SHA.** Worktree `sessions/seed4500-knight-coverage.session.json`: parent `423b6b29` **PASS** (RNG 108275/108275, screens 1814/1814); this SHA **FAIL** (RNG **88490**/108275, screens **1058**/1814, cursors 1379/1814) — **same numbers as HEAD `d13bf416`.** D-1575 did not move the needle. Cohort 7/7 + green seed8000/0900 did not exercise this. Do **not** stamp “Match C `region.c` `block_point` per cell.” Do **not** stamp “other `unblock_point` sites already on recalc ≡ C `unblock_point`” once recalc is no longer `vision_reset`. Do **not** stamp “Match C `mimic_light_blocking`.”

## Density

One C vision cluster (`dig_point`/`unblock`/`recalc` + `seemimic`). +120 JS. Did not glue `nv_range`. §2b OK for the **functions**; shipping them while JS multi-cell stand-ins still fire **one** recalc is the density miss.

## Branch-by-branch confirm

1. `seemimic` wall/door/boulder mimic, terrain open: capture true, `does_block` 0 after clear → `dig_point`. **Match C seemimic.**
2. Closed-door terrain under a door mimic: `does_block` 1 → no unblock. **Match.**
3. Gold-object mimic: `is_lightblocker_mappear` false → no unblock. **Match.**
4. `recalc_block_point` on an open door: `unblock_point`. **Match C recalc.**
5. `recalc_block_point` on a closed door: `block_point`. **Match C recalc.**
6. Gas cloud create: C `block_point` every inside cell; JS one corner. **C-wrong.**
7. Gas expire/remove: C per-cell `unblock_point`; JS one corner / empty expire pass. **C-wrong.**

## Callers / RNG ledger

C `unblock_point` 39 sites; JS wired `seemimic` plus recalc. dokick/lock/zap/dig comments still `recalc_block_point` as a stand-in — correct **iff** that C site is `recalc_block_point` or the cell’s `does_block` already matches the desired fill/dig. **No core RNG.** No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `dig_point` is the C `staticfn` at its home (one local). Do not add clone #2.

## Verification

D-log private canary **29**/29 (locus; fill/dig inverse; door recalc; boulder/`S_hcdoor` seemimic; closed-door no-unblock; Rule #2); green+strict seed8000/0900; cohort **7**/7. **Did not run seed4500.** This SHA **breaks** public `seed4500-knight-coverage`. Public-unhit for `nv_range` / See_invisible mimics.

## Actionable C-wrongs

1. **`recalc_block_point` is no longer a whole-map rebuild, but JS multi-cell C loops still call it once.** Port C `region.c` `add_region` `:326–328` (`block_point` every visible inside cell) and `remove_region` `:375–376` / `expire_gas_cloud` `:1071–1072` (`!does_block` then `unblock_point` per cell). Until those loops are live, a full `vision_reset` at those JS sites is the honest stand-in — not one-corner incremental. Then run `seed4500-knight-coverage` (first FAIL at this SHA: RNG 88490/108275). Do not wrap `vision_reset` into `seemimic`. Do not add `dig_point` #2. Do not invent a frame-align queue.

Verdict: **QUALITY-RISK**

**Addressed:** D-1576
