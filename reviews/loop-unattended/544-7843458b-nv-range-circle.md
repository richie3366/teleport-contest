# Review 544 — 7843458b — vision.c vision_recalc nv_range circle (D-1583)

## Metadata
- Full / short hash: `7843458b01c470fba9517fa751e9c30e8de86439` / `7843458b`
- Parent: `6c996e15` (D-1582). This file audits **this SHA only** (eighth of nine `js/` commits since review **536**). Archive **Addressed:** D-1583 `7843458b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 17:24:56 +0200
- D-id: **D-1583**
- Stats: `js/vision.js` +55/−net. Band **200–350** (js/ insertions **44**; id >454 so 200-floor; ceiling 350).
- Claims to close: Open `nv_range` circle leftover after D-1571. Not pit TT_PIT 3×3. Not underwater `has_night_vision=0`. `reviews/loop-2026-08-15/` has no unpaid nv_range Must-fix.
- JS / map: `vision.js` `apply_nv_range_in_sight` / `vision_recalc`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **532** named `nv_range` circle (`:670–700`) and kept the adjacent 3×3 stand-in.

## Intent vs deliverable

Git subject promises: night vision uses `circle_ptr(u.nv_range)` after xray (`IN_SIGHT` only where `view_from` already marked) instead of a hardcoded 3×3 lighting stand-in.

Pinned C `vision.c` `vision_recalc` `:670–700` after xray `:631–668`, before `do_light_sources` `:702`. Guard `has_night_vision && u.xray_range < u.nv_range`. Range 0: hero `|=IN_SIGHT` + `seenv=SVALL`. Range >0: `circle_ptr` + `v_abs` dy; `if (next_row[col]) |=IN_SIGHT` (no SVALL, no `newsym`). `has_night_vision` starts 1 at `:587`; underwater `:589–595` sets 0. Pit `:609–622` still keeps NV=1. Setter `u_init.c` `u_init_misc` `:1019–1020` `nv_range=1`, `xray_range=-1`. Callee `circle_ptr` `vision.h:62` (live D-1571). `v_abs` `vision.c:101`.

```670:698:nethack-c/upstream/src/vision.c
        if (has_night_vision && u.xray_range < u.nv_range) {
            if (!u.nv_range) { /* range is 0 */
                next_array[u.uy][u.ux] |= IN_SIGHT;
                levl[u.ux][u.uy].seenv = SVALL;
                ...
            } else if (u.nv_range > 0) {
                ranges = circle_ptr(u.nv_range);
                ...
                    for (col = start; col <= stop; col++)
                        if (next_row[col])
                            next_row[col] |= IN_SIGHT;
```

Old JS: D-1571 xray circle live; lighting loop hardcoded `abs<=1` `IN_SIGHT` + `continue`. **532** named that omit.

The diff **does** add `apply_nv_range_in_sight` on the non-rogue else after xray, drop the 3×3 `continue`. It **does not** port pit TT_PIT 3×3, underwater `has_night_vision=0` + pool 3×3, `notice_all_mons`, `mimic_light_blocking` See_invisible. Named. `has_night_vision` is a local `1`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `apply_nv_range_in_sight` | C inline `:670–700`, **LIVE this SHA** | JS extract; not a C function name |
| `vision_recalc` call site | C `:586–700` else, **LIVE this SHA** | after xray, before lights |
| `circle_ptr` | C macro `:62`, **LIVE** | do **not** add #2 |
| `apply_xray_in_sight` | C `:631–668`, **LIVE** (D-1571) | order: xray then nv |
| `v_abs` dy | C `:101` / `:685`, **CLONE** | ternary abs |
| 3×3 lighting `continue` | **deleted** | was the stand-in |
| pit TT_PIT / underwater NV=0 | **OMIT named** | still full `view_from` |
| `has_night_vision` | C `:587–595`, **OMIT named** | JS const `1` |

`node scripts/csym.mjs vision_recalc` → `:511-857`. `circle_ptr` → `vision.h:62`. `--callers vision_recalc`: allmain `:471`/`:542`/`:580`, display, hack, light, … (shared). `u_init_misc` `:943-1036` (`nv_range=1` at `:1019`).

RNG: **none** in the nv circle. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
vision_recalc    js/vision.js:865   sync
circle_ptr       NOT EXPORTED — 1 LOCAL js/vision.js:64
             => Do NOT write clone #2.
apply_nv_range_in_sight NOT EXPORTED — 1 LOCAL js/vision.js:837
apply_xray_in_sight NOT EXPORTED — 1 LOCAL js/vision.js:795
```

`--can vision.js display.js newsym`: ALREADY. `circle_ptr` stays in `vision.js` (C macro home). Do not add `circle_ptr` in light.js.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Guard. `has_night_vision && xray_range < nv_range`. JS `u_init` sets `nv_range=1`, `xray_range=-1` so `-1 < 1` is true. Eyes `xray_range=3` → `3 < 1` skip (Eyes already cover). **Match `:670`.** Underwater should force NV off. **Named.**

Range 0. Hero `|=IN_SIGHT`, `seenv=SVALL`, rmin/rmax. **Match `:671–675`.** Default nv is 1, so this arm is unused unless a later setter zeros it.

Range >0. `circle_ptr(nv_range)`; rows `uy±range`; skip row<0, break row≥ROWNO; `v_abs` dy; start/stop clamped 1..COLNO-1; **only** `if (next_row[col]) |=IN_SIGHT`; still widen rmin/rmax to the circle. **No** SVALL, **no** `newsym` (unlike xray). **Match `:676–697`.**

`circle_ptr(1)`. Table `circle_data[1,1]` → dx=1 on dy=0 and dy=1 → 3×3. **Match C radius-1 offsets and the deleted stand-in for default nv.** `circle_ptr(2)` is `2,2,1` (not a 5×5 square). The old `abs<=1` could not grow with `nv_range`. **That is the C-wrong this SHA retires.**

Order. C: swallow/Blind/rogue skip this else; else view_from (or pit/water) → xray → nv → `do_light_sources`. JS non-rogue: `view_from` → xray → nv → lights. **Match the non-pit path.** Pit/water named: JS still full LOS then nv, so a pit hero sees farther than C’s 3×3.

Deleted stand-in. Old loop ORed adjacent `IN_SIGHT` and `continue` (skipped wall/door lighting). C never skips the lighting pass for NV cells; nv only ORs bits on already-marked cells. Removing `continue` is **more** C-faithful. Adjacent dark-but-COULD_SEE cells no longer get a free `IN_SIGHT` from geometry alone — they need `next_row[col]` from `view_from`. **Match `:691–693`.**

`has_night_vision=1` with no underwater zero: on waterlevel/pool JS still runs nv. **Named omit, not a stub in the dry-land arm.**

Callee closure (default nv=1, not Blind, not rogue, not pit). LIVE: `circle_ptr`, `view_from`, `apply_xray_in_sight`, `do_light_sources`, `IN_SIGHT`. CLONE: abs dy. OMIT named: pit, underwater NV=0, `notice_all_mons`. STUB: **none** in the dry-land nv arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `circle_ptr(u.nv_range)` after xray, IN_SIGHT only where `view_from` marked: **true** on the non-rogue non-Blind path. D-log “not pit / underwater”: **true.** Do **not** stamp “Match C pit TT_PIT then nv.” Do **not** stamp “Match C Underwater `has_night_vision=0`.” Do **not** stamp “Match C `notice_all_mons`.” The 3×3 lighting `continue` is gone; do **not** claim the lighting loop itself was rewritten to C’s post-swap update. This is **not** “xray dispatch, nv stubbed”: nv is the live body **532** named.

## Density

One leftover C block after D-1571 (`:670–700` + drop stand-in). +44 JS. C is ~30 lines; not a one-`if` peel. Did not glue `mk_mplayer`. §2b OK.

## Branch-by-branch confirm

1. Default `nv_range=1`, `xray_range=-1`: circle 3×3, OR IN_SIGHT iff `next_row[col]`. **Match.**
2. Eyes on (`xray_range=3`): skip nv. **Match.**
3. `nv_range=0`: hero cell + SVALL. **Match** (unused at u_init).
4. `nv_range=2`: `circle_ptr(2)` not 5×5. **Match**; old 3×3 could not.
5. Wall in circle with `next_row[col]==0`: no IN_SIGHT. **Match** (old 3×3 would OR).
6. Blind / `control==2` / swallow: nv not called. **Match** `:545–586`.
7. Rogue: `rogue_vision` only, no nv. **Match** `:584–585`.
8. Pit / underwater: still `view_from` + nv. **Named.**
9. Lights after nv. **Match** `:702`.

## Callers / RNG ledger

C `vision_recalc` is shared (allmain, display, hack, light, …). JS same export. NV adds **no** RNG. No seed gate. `u_init_misc` still the setter (`nv_range=1`).

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Local `circle_ptr` at the C home module. Do not add `circle_ptr` #2. `apply_nv_range_in_sight` is an extract of C inline, not a second `vision_recalc`.

## Verification

D-log private canary **28**/28 (C locus + nv=1/2/3/0; wall-blocked; xray≥nv skip; Blind/`control==2`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Default nv=1 is on every public session’s `vision_recalc`; the **delta vs 3×3** is public-unhit unless a cell at Chebyshev 1 was unmarked by `view_from` (walls). nv>1 is **public-unhit**.

## Actionable C-wrongs

None for Must-fix. Named: pit TT_PIT 3×3; underwater `has_night_vision=0` + pool 3×3; `notice_all_mons`; `mimic_light_blocking` See_invisible. Do not add `circle_ptr` #2. Do not restore the lighting 3×3 `continue`. Do not treat Eyes skip as a miss.

Verdict: **ACCEPT-WITH-DEBT**
