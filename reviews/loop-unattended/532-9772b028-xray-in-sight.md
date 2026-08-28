# Review 532 — 9772b028 — vision.c vision_recalc xray IN_SIGHT (D-1571)

## Metadata
- Full / short hash: `9772b02863a53c01b08f8c6f8803d55e88cbb855` / `9772b028`
- Parent: `3ace1611` (D-1570). This file audits **this SHA only** (fifth of nine `js/` commits since review **527**). Archive **Addressed:** D-1571 `9772b028`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 08:02:07 +0200
- D-id: **D-1571**
- Stats: `js/vision.js` +52 / −1. Band 150–350 (js/ insertions **52**).
- Claims to close: Open `vision_recalc` xray after D-1558/D-1562. Not howmonseen. `reviews/loop-2026-08-15/` has no unpaid xray-circle Must-fix.
- JS / map: `vision.js` `circle_ptr` / `apply_xray_in_sight` / `vision_recalc`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **531** named xray IN_SIGHT.

## Intent vs deliverable

Git subject promises: `xray_range` ORs `IN_SIGHT` in the `circle_ptr` disk (`seenv` SVALL) instead of ignoring Eyes through walls.

Pinned C `vision.c` `vision_recalc` `:631–668` after `view_from` / pit / underwater, before `do_light_sources` `:702`. Guards `:545–586`: swallow/`control==2` and Blind **skip** this arm; rogue uses `rogue_vision` only. Macro `circle_ptr` `vision.h:62`. Setter Eyes `artifact.c` `:859–866` (D-1558). `newsym(col,row)` while `viz_array` is still the **old** buffer.

```631:667:nethack-c/upstream/src/vision.c
        if (u.xray_range >= 0) {
            if (u.xray_range) {
                ranges = circle_ptr(u.xray_range);
                for (row = u.uy - u.xray_range; row <= u.uy + u.xray_range;
                     row++) {
                    ...
                    start = max(1, u.ux - ranges[dy]);
                    stop = min(COLNO - 1, u.ux + ranges[dy]);
                    for (col = start; col <= stop; col++) {
                        next_row[col] |= IN_SIGHT;
                        oldseenv = levl[col][row].seenv;
                        levl[col][row].seenv = SVALL;
                        if (!(old_row_val & IN_SIGHT) || oldseenv != SVALL)
                            newsym(col, row);
```

Old JS: 3×3 NV stand-in + lit `IN_SIGHT`; no xray circle. `howmonseen` XRAYVIS already live.

The diff **does** add `circle_ptr` + `apply_xray_in_sight` on the non-rogue else after `view_from`. It **does not** port `nv_range` circle (`:670–700`), pit/underwater view, `unblock_point`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| xray arm `:631–668` | C, **LIVE this SHA** | helper `apply_xray_in_sight` (not a C name) |
| `circle_ptr` | C macro `:62`, **LIVE** local | `slice(circle_start[z])` ≡ `&circle_data[start]` |
| `circle_data` / `circle_start` | **LIVE** pre-existing | |
| `newsym` | C, **LIVE** | `(col,row)` = `(x,y)` |
| `IN_SIGHT` / `SVALL` | **LIVE** const | |
| Eyes setter | **LIVE** D-1558 | `u.xray_range` 3 / −1 |
| `nv_range` circle | **OMIT named** | 3×3 stand-in kept |
| pit / underwater / `unblock_point` | **OMIT named** | |

`node scripts/csym.mjs vision_recalc` → `:511-857`. `circle_ptr` → `vision.h:62`. `--callers vision_recalc`: allmain / display / hack / … (shared).

RNG: **none**.

`node scripts/sym.mjs` on new names:

```
circle_ptr            NOT EXPORTED — 1 LOCAL js/vision.js:64  => no #2 (C is a macro)
apply_xray_in_sight   NOT EXPORTED — 1 LOCAL js/vision.js:795
vision_recalc         js/vision.js:830   sync
IN_SIGHT              js/const.js:888
SVALL                 js/const.js:1225
```

`node scripts/imports.mjs --can vision.js display.js newsym`: ALREADY. No new module edge.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Guards. swallow/`control==2`: empty next, no xray. Blind: `view_from` + old-sight newsym, **return before xray**. Rogue: `rogue_vision` only. **Match `:545–586`.**

Placement. Non-rogue else: `view_from` then xray then `do_light_sources`. **Match** relative to lights. C also runs xray after pit/underwater substitutes; JS still `view_from` there (**named** pit/water). Eyes disk still ORs `IN_SIGHT` through walls on the normal path.

Disk. `v_abs` dy; `ranges[dy]` from `circle_start[range]`; col 1..COLNO-1; `|= IN_SIGHT`; `seenv=SVALL`; newsym if newly sighted or seenv was not SVALL; expand rmin/rmax. **Match `:635–660`.** Range 0: hero cell only, **no** newsym. **Match `:662–667`.** Range `<0` (u_init −1): no-op. **Match.**

`circle_ptr`. `circle_data.slice(circle_start[3])[dy]` ≡ `circle_data[6+dy]` → 3,3,2,1. **Match the table already in vision.js.**

Callee closure. LIVE: `circle_ptr`, `newsym`, `IN_SIGHT`, `SVALL`, `view_from`. CLONE: abs dy. OMIT named: nv circle, pit, water. STUB: **none** in the xray arm. Not “dispatch ported, callee stubbed.”

C `xray_range < nv_range` skips NV when Eyes (3) beat nv (1). JS 3×3 NV loop still ORs adjacent — idempotent under the xray disk. Named nv, not a xray miss.

## Hallucinations / overclaim

Subject Eyes through walls via `circle_ptr` + SVALL: **true** on the non-rogue non-Blind path. D-log “not howmonseen”: **true**. Do **not** stamp “Match C `nv_range` circle.” Do **not** stamp “Match C pit/underwater then xray.” Do **not** stamp “Match C `unblock_point`.” This is **not** “dispatch ported, callee stubbed.”

## Density

One C arm + the macro it needs. +52 JS. Did not glue nv/`unblock_point`. §2b OK (small but one locus).

## Branch-by-branch confirm

1. `xray_range=-1`: no OR. **Match.**
2. Range 3, wall inside disk: `IN_SIGHT`+SVALL+newsym. **Match.**
3. Cell outside radius: unchanged. **Match.**
4. Range 0: hero only, no newsym. **Match.**
5. Blind: no xray. **Match.**
6. `control==2` / swallow: no xray. **Match.**
7. Rogue: no xray. **Match.**
8. newsym uses old `viz_array` (swap is later). **Match.**

## Callers / RNG ledger

Shared `vision_recalc(0)` after moves. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Local `circle_ptr` at the C home module.

## Verification

D-log canary **24**/24 (locus + wall-through r=3; outside; range 0; Blind/`control==2` skip; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Public Eyes-through-walls is **public-unhit** unless a session wears the artifact.

## Actionable C-wrongs

None for Must-fix. Named: `nv_range` circle; pit; underwater; `unblock_point`/`dig_point`. Do not add `circle_ptr` #2.

Verdict: **ACCEPT-WITH-DEBT**
