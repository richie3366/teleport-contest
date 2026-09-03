# Review 756 — 01562c50 — pager.c lookat trap tnum = glyph_to_trap(glyph_at) (D-1787)

## Metadata
- Full / short hash: `01562c504f064a7eca6ddecd3a5975e5821ecca6` / `01562c50`
- Parent: `be1cef1a` (D-1786). Claims to close review **748** QUALITY-RISK (`e8515402` D-1779 helpers live, lookat still `t_at&&tseen`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 22:22:57 +0200
- D-id: **D-1787**
- Stats: `js/display.js` +28/−2; `js/pager.js` +18/−17; `js/getpos.js` +13/−8; `js/detect.js` +5/−11. Total `js/` insertions **64** ≤250. Band **80–350**.
- Claims to close: Must-fix **748** — lookat tnum from gbuf, not ftrap. Not `look_traps`. Not `doidtrap`.
- JS / map: `display.js` `glyph_to_trap`/`glyph_at`; `pager.js` `brief_at`/`describe_looked`; `getpos.js` `auto_describe_text`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1787 `01562c50`.

## Intent vs deliverable

Git subject promises: Match C `pager.c` `lookat` so a detected trapped chest or door is named from the gbuf glyph, instead of requiring `t_at&&tseen` that dummytrap never satisfies.

`node scripts/csym.mjs lookat` → `pager.c:656–802`. `--callers trap_description`: `pager.c:721` (lookat); `pager.c:2094` (`look_traps`). `glyph_to_trap` `display.h:671–674`. `glyph_at` `display.c:2477–2483`. `defsym_to_trap` `rm.h:498`. `trapped_chest_at` `detect.c:137–177`.

```718:721:nethack-c/upstream/src/pager.c
    } else if (glyph_is_trap(glyph)) {
        int tnum = glyph_to_trap(glyph);
        trap_description(buf, tnum, x, y);
```

Parent: helpers LIVE; three lookat clones still `t_at&&tseen`; `glyph_to_trap` NOT FOUND; `describe_looked` ranked floor objects before the trap arm; `auto_describe_text` still `trapname`. The diff **does** port `glyph_to_trap` + export `glyph_at`, enter all three clones on `glyph_is_trap(glyph_at)`, pass that tnum, and delete `glyph_at_gbuf`. It **does not** port `look_traps` `:2093` (still `"trap at (x,y)"`). Subject is true for `/` and autodescribe.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `glyph_to_trap` | LIVE new | `display.h:671–674` |
| `glyph_at` | LIVE new export | `display.c:2477–2483`; `disp_glyph` |
| `trap_description` | LIVE re-point | local → export; body unchanged |
| `brief_at` / `describe_looked` / `auto_describe_text` | LIVE repaired | gbuf tnum; no `tseen` |
| `glyph_at_gbuf` | deleted clone | rebound to export |
| `trapped_chest_at` / `trapped_door_at` | LIVE | now `glyph_at` |
| `look_traps` | STUB pre-existing | named; C’s second caller |
| `doidtrap` | OMIT named | NOT FOUND |

`node scripts/sym.mjs` (delete/re-point):

```
glyph_to_trap    js/display.js:662   sync
glyph_at         js/display.js:672   sync
trap_description js/pager.js:225   sync
glyph_at_gbuf    NOT FOUND
trapped_chest_at js/detect.js:1507   sync
trapped_door_at  js/detect.js:1541   sync
trapname         js/trap.js:1476   sync
glyph_is_trap    js/display.js:652   sync
defsym_to_trap   js/const.js:201   sync
look_traps       NOT EXPORTED — 1 LOCAL js/pager.js:1251
doidtrap         NOT FOUND
lookat           NOT FOUND (three clones)
```

`--can pager.js display.js glyph_to_trap`: **ALREADY**. `--can getpos.js pager.js trap_description`: **ALREADY**. `--can detect.js display.js glyph_at`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**`glyph_to_trap` (`:671–674`).** C: `glyph_is_trap ? defsym_to_trap((glyph - GLYPH_TRAP_OFF) + S_arrow_trap) : NO_GLYPH`. `defsym_to_trap(d)` is `d - S_arrow_trap + 1` (`rm.h:498`), so ttyp = `(glyph - GLYPH_TRAP_OFF) + 1`. JS: `glyph_id` (identity on numbers, same as other `glyph_to_*`) then the same formula. Non-trap → `NO_GLYPH`. **Match.**

**`glyph_at` (`:2477–2483`).** OOB → `cmap_to_glyph(S_room)` (C XXX). In-bounds → `gbuf[y][x].glyph`. JS `loc.disp_glyph` (D-1767). Missing number → `NO_GLYPH`. **Match the C XXX + gbuf read.** One export; `glyph_at_gbuf` gone. `glyph_at_disp` is a ch/color snapshot, not a second integer `glyph_at`.

**Lookat trap arm vs occupancy.** C `lookat` is else-if on **one** `glyph_at`: self, swallow, monster, object, **then trap**. A trap glyph cannot also be `glyph_is_object`. Parent JS ranked `loc.objects` / `t_at` anyway, so dummytrap chest (trap glyph + floor pile) printed `doname`. All three clones now take the trap glyph **before** occupancy objects. **Match C’s glyph chain** for this arm. Self still precedes trap (`u_at`). Do not read this as “trap before monster in C” — exclusive banks; occupancy was the C-wrong.

**`trap_description` / Hallu RNG.** Chest-before-door; `ttyp != TRAPPED_CHEST || (Hallucination && rn2(20))` short-circuits ordinary pits to **zero** draws. Dummytrap chest now actually enters. Probe: hallu pit 0× `rn2(20)`; hallu chest 1×. **Match.** Do not invent pit `rn2(20)`.

**Callee closure (lookat trap arm).** LIVE: `glyph_at`, `glyph_is_trap`, `glyph_to_trap`, `trap_description`, `trapped_chest_at`, `trapped_door_at`, `trapname`. OMIT named: `look_traps` `:2093`, `doidtrap`, recursive/buried TODO. STUB **inside the lookat arm**: **none**. `look_traps` is a **different caller**, still `"trap at (x,y)"` — named, not a stub inside this peel.

## Hallucinations / overclaim

Subject “named from the gbuf glyph, instead of requiring `t_at&&tseen`” is **true** on `brief_at`, `describe_looked`, and `auto_describe_text`. Review **748**’s three-clone Must-fix is closed. Do **not** stamp “Match C `look_traps`.” Do **not** stamp “`doidtrap` ported.” `lookat` the C `staticfn` is still three clones, not one function — acceptable for this tnum peel. Public-unhit (no suite farlook of dummytrap chest); probed.

## Density

§2b Must-fix: tnum source + the three clones that Must-fix named + one `glyph_at` export. +64. Did **not** glue `look_traps` / `doidtrap`.

## Verification

D-log: green+strict; cohort incl. seed0383 hallu; `glyph_to_trap` round-trip; dummytrap chest + pile + `disp_kind==='object'` → `"trapped chest"`; hallu pit vs chest `rn2(20)`. save-oracle `pager.c:lookat` untagged skip. Rule #2 clean. This audit: `csym` `lookat:718–721` / `glyph_to_trap` / `glyph_at` vs HEAD `js/pager.js:979–982` / `js/getpos.js` trap-before-object.

## Actionable C-wrongs

None for Must-fix. Named: `look_traps` `:2093–2094` (still coordinate stub); `doidtrap`; C TODO recursive/buried. Do **not** invent `rn2(20)` on ordinary pit farlook. Do **not** add `sobj_at` clone #13. Do **not** restore `t_at&&tseen` on these three clones.

Verdict: **ACCEPT-WITH-DEBT**
