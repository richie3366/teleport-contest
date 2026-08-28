# Review 558 — 9244ce75 — light.c show_transient_light (D-1597)

## Metadata
- Full / short hash: `9244ce757f580bf27f3a61cf68c624adfc344280` / `9244ce75`
- Parent: `fa152acc` (D-1596). This file audits **this SHA only** (fourth of nine `js/` commits since review **554**). Archive **Addressed:** D-1597 `9244ce75`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 22:18:36 +0200
- D-id: **D-1597**
- Stats: `js/light.js` +140/−22, `js/zap.js` +13/−2, `js/minion.js` +13/−1, `js/apply.js` +8/−3. Band **150–350** (js/ insertions **174**).
- Claims to close: Open camera/thrown TEMP_LIT after D-1575. Not worm tails. Not `has_mcorpsenm`. `reviews/loop-2026-08-15/` has no unpaid transient-light Must-fix.
- JS / map: `light.js` `show_transient_light`/`transient_light_cleanup`/`new_light_core`; callers zap `bhit`, apply `do_blinding_ray`, minion `msummon`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: none unpaid; **536** named ndemon not this.

## Intent vs deliverable

Git subject promises: a camera flash or thrown lamp marks `mtemplit` on seen monsters in range instead of skipping TEMP_LIT.

Pinned C `light.c` `show_transient_light` `:255–324`. `new_light_core` `:68–94` (range 0 only Null `LS_OBJECT`). `do_light_sources` `:187–190` range 0 skips `get_obj_location`. `transient_light_cleanup` `:327–357`. `discard_flashes` `:360–370`. `youprop.h:103` `Blind ((HBlinded || EBlinded) && !BBlinded)`. Callers `--callers show_transient_light`: minion `:166`; zap `:3903` thrown/kicked; zap `:3916` FLASHED_LIGHT. Cleanup: apply `:75`; minion `:187`; zap `:4136` thrown/kicked only (FLASHED_LIGHT is caller).

```3901:3917:nethack-c/upstream/src/zap.c
        if (weapon == THROWN_WEAPON || weapon == KICKED_WEAPON) {
            if (obj->lamplit && !Blind)
                show_transient_light(obj, x, y);
            if (typ == IRONBARS
                && hits_bars(...)) {
                ...
            }
        } else if (weapon == FLASHED_LIGHT) {
            if (!Blind)
                show_transient_light((struct obj *) 0, x, y);
        }
```

Old JS: comments only; `new_light_source` allowed any range 0; `do_light_sources` `range<1` skipped Null flashes.

The diff **does** live `new_light_core`, camera range 0 in `do_light_sources`, `show_transient_light`/`cleanup`/`discard_flashes`, and wire apply/zap/minion. It **does not** port worm tails, FLASHED_LIGHT `tmp_at` DISP_BEAM, or save-file discard. Named. Thrown/kicked `!Blind` in `zap.js` uses that file’s sticky `u.Blind||u.ublind`, not C youprop.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `show_transient_light` | C `:255–324`, **LIVE this SHA** | |
| `new_light_core` | C `:68–94`, **LIVE this SHA** | local; C static |
| `do_light_sources` range 0 | C `:187–190`, **LIVE this SHA** | |
| `transient_light_cleanup` | C `:327–357`, **LIVE this SHA** | |
| `discard_flashes` | C `:360–370`, **LIVE this SHA** | local; C static |
| apply `do_blinding_ray` cleanup | C `:73–75`, **LIVE** | after `flash_hits_mon` |
| minion S_ANGEL | C `:162–187`, **LIVE** | youprop-ish Blind |
| zap thrown/kicked + cleanup | C `:3903`/`:4136`, **LIVE gate, CLONE Blind** | sticky `Blind()` |
| zap FLASHED_LIGHT arm | C `:3914–3916`, **LIVE** | camera actually uses apply clone |
| `canseemon` / `canspotmon` / `map_invisible` | **LIVE** | |
| `place_object` / `obj_extract_self` | **LIVE** | C `remove_object` |
| `vision_recalc` / `flush_screen` / `nh_delay_output` | **LIVE** | |
| `Blind` apply.js | C `:103` + uroleplay, **CLONE** | camera path |
| `Blind` zap.js | **CLONE diverges** | `u.Blind\|\|u.ublind` |
| worm tails / `tmp_at` / save discard | **OMIT named** | |

`node scripts/csym.mjs show_transient_light` → `:255-324`. `new_light_core` → `:68-94`. `transient_light_cleanup` → `:327-357`. `discard_flashes` → `:360-370`. `--callers` as above.

RNG: none in these functions. `hits_bars` `rn2(5)` is D-0990 after the flash. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
show_transient_light js/light.js:176   ASYNC — await required
transient_light_cleanup js/light.js:248   ASYNC — await required
new_light_core   NOT EXPORTED — 1 LOCAL js/light.js:46
             => Do NOT write clone #2. (C static — this is the body)
new_light_source js/light.js:66   sync
discard_flashes  NOT EXPORTED — 1 LOCAL js/light.js:230
do_light_sources js/light.js:106   sync
Blind            NOT EXPORTED — 28 LOCAL CLONE(S)
               js/apply.js:951  … js/zap.js:649 …
             => Do NOT write clone #29.
```

`--can apply.js light.js show_transient_light`: ALREADY. `--can zap.js light.js show_transient_light`: ALREADY. `--can minion.js light.js show_transient_light`: ALREADY. `--can light.js display.js canseemon`: ALREADY. Do **not** add `show_transient_light` #2 in zap. Do **not** add Blind #29 in `light.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Camera. `!obj`: skip if `levl[x][y].lit`; `new_light_core(x,y,0,LS_OBJECT,null)`; set `ls.x/y`; `vision_recalc(0)` + `flush_screen(0)`; `radius_squared = 0`; `dist2<=0` + `canseemon` → `mtemplit`. **Match `:266–316` for the lit/core/recalc/flag.** Range 0 paints one cell in `do_light_sources` (no longer `range<1` continue). **Match `:188–189` skip `get_obj_location`.** Illegal range 0 in C `impossible` then Null; JS silent Null. Not on the camera/thrown legal path.

Thrown lamp. Find `LS_OBJECT` with `id===obj`; require `OBJ_FREE`; else `impossible`. `place_object` at `bhitpos`; recalc/flush; `dist2<=range²`; delay; extract. **Match `:277–323` except C `remove_object` vs JS `obj_extract_self` (floor extract + boulder `recalc_block_point` is that callee).** `bhitpos` fallback `{x,y}` if unset is extra; C always has `gb.bhitpos`.

Cleanup. `discard_flashes` Null-id `LS_OBJECT`; recalc if `vision_full_recalc`; clear `mtemplit`; `!canspotmon` → `map_invisible`; flush if any. **Match `:327–357`.** Dead skip `mhp<1` ≡ `DEADMONSTER`. GD `!mx` skip is in **show**, not cleanup. **Match.**

Callers. apply camera: `bhit_flashed_light` then `flash_hits_mon` then cleanup. **Match `:63–75` order.** minion S_ANGEL `!Blind` flash, `xlight` then cleanup. **Match `:162–187`.** zap thrown/kicked flash before iron bars, cleanup at `bhit_done`. **Match `:3901–3903` / `:4135–4136`.** zap also added FLASHED_LIGHT in `bhit`; camera still uses apply’s clone (C has one `bhit`). Harmless duplicate.

**`!Blind` C-wrong (zap).** C Blind is `(HBlinded \|\| EBlinded) && !BBlinded` (`youprop.h:103`; Blindfolded is `EBlinded`). apply.js `Blind()` is that plus `uroleplay.blind` (house D-0716). zap.js `Blind()` is `game.u.Blind \|\| game.u.ublind` — sticky, not youprop. This SHA gated the **live** thrown/kicked (and zap FLASHED_LIGHT) arm on that clone. Conferral that writes H/E without sticky `u.Blind` will flash when C would not, or skip when sticky is stale. Not a named omit. “Dispatch ported, Blind callee is the wrong clone.”

minion inlined `(H\|\|E)&&!B` plus `uroleplay.blind` instead of importing apply’s helper (cycle). Same shape as apply, not zap sticky. Not the Must-fix.

Callee closure (show_transient_light). LIVE: `new_light_core`, `place_object`, `vision_recalc`, `flush_screen`, `dist2`, `canseemon`, `nh_delay_output`, `obj_extract_self`. OMIT named: worm tails. STUB: **none** inside the light body. Combined-arm may ship **except** the zap `!Blind` gate. That gate should have been youprop or its own Open row.

## Hallucinations / overclaim

Subject camera/thrown marks `mtemplit` in range: **true for apply camera and minion angel when that Blind is false; true for thrown only when zap sticky Blind is false.** D-log “range 0 Null-id + callers”: **true as wiring.** Do **not** stamp “Match C `!Blind` on zap `bhit`.” Do **not** stamp “Match C worm tails.” Do **not** stamp “Match C FLASHED_LIGHT `tmp_at` DISP_BEAM.” Do **not** stamp “retired 28 Blind clones.” Do **not** stamp “Match C `new_light_core` `impossible` on illegal range.” Public suite has little camera/thrown-lamp coverage.

## Density

One `light.c` envelope (`new_light_core` + show/cleanup + `do_light_sources` range 0) plus the three C callers. +174 JS. Did not glue `has_mcorpsenm`. §2b OK. Did glue a live `!Blind` site to the wrong clone — quality, not size.

## Branch-by-branch confirm

1. Camera unlit cell: range 0 core, `mtemplit` at `dist2==0`. **Match** (apply Blind).
2. Camera already lit: return. **Match.**
3. Thrown lamplit `OBJ_FREE`: place, flag, delay, extract. **Match body; Blind gate mismatch.**
4. Thrown not a light / not free: `impossible` return. **Match.**
5. Cleanup Null flashes + `map_invisible`. **Match.**
6. FLASHED_LIGHT cleanup deferred to apply. **Match.**
7. Worm / `tmp_at` / save. **Named.**

## Callers / RNG ledger

Awaited: apply, zap `bhit`, minion. Extra `hits_bars` `rn2` after thrown flash is C order. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add Blind #29. Do not wrap `wildmiss` as `pline_mon`. Do not skip apply camera because zap `bhit` now has FLASHED_LIGHT.

## Verification

D-log private canary **12**/12; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for camera/angel flash. A canary that never throws a lit lamp while HBlinded≠`u.Blind` does not falsify the zap clone. Worm tails unhit.

## Actionable C-wrongs

1. In `zap.js` `bhit`, gate `show_transient_light` (thrown/kicked lamplit and FLASHED_LIGHT) on C `youprop.h:103` Blind `(HBlinded \|\| EBlinded) && !BBlinded` (same as apply.js), not sticky `u.Blind \|\| u.ublind`. Do not add Blind clone #29 in `light.js`. Do not change apply camera Blind in the same iter unless it is the same helper.

Named (not Must-fix): worm tails (`:319` comment); FLASHED_LIGHT `tmp_at`; `save_light_sources` discard; `new_light_core` silent vs C `impossible`; light_base append vs C prepend.

Verdict: **QUALITY-RISK**

**Addressed:** D-1604
