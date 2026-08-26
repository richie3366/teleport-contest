# Review 489 — aa4d11f5 — display.c/region.c show_region overlay (D-1528)

## Metadata
- Full / short hash: `aa4d11f530876cd39f3e3f37ee7ae2e2f51c3317` / `aa4d11f5`
- Parent: `d53c5cd1` (D-1527). This file audits **this SHA only** (seventh of nine `js/` commits since review **482**). Archive **Addressed:** D-1528 `aa4d11f5`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 04:55:13 +0200
- D-id: **D-1528**
- Stats: 11 files, +209 / −77 — `js/display.js` +131 / −42, `js/region.js` +22 / −3. Band 150–350 (js/ insertions **153**).
- Claims to close: Open `display.c` `show_region` (named from D-1527). Not `see_wsegs`. `reviews/loop-2026-08-15/` has no unpaid gas-overlay Must-fix.
- JS / map: `region.js` `show_region`; `display.js` `newsym` / `map_location` / `mon_overrides_region`. `c-js-map/turns.md` + `data.md`.
- Prior reviews this SHA claims to close: none by SHA. Review **488** named `show_region` as the next Open.

## Intent vs deliverable

Git subject promises: visible gas/steam clouds paint `S_cloud`/`S_poisoncloud` over accessible or pool/lava cells unless a monster overrides.

Pinned C `region.c` `show_region` `:732–735` is `show_glyph(x, y, reg->glyph)`. Callers `display.c` `_map_location` `:470–471` (`show && !Blind`) and `newsym` cansee `:993–998`. Helper `mon_overrides_region` `:668–700`. Pool test `dbridge.c` `is_pool_or_lava` `:77–83` → `is_pool`/`is_lava` (DRAWBRIDGE_UP under-typ).

```993:998:nethack-c/upstream/src/display.c
        if (reg && (ACCESSIBLE(lev->typ)
                    || (reg->visible && is_pool_or_lava(x, y)))) {
            if (!mon_overrides_region(mon, x, y)) {
                show_region(reg, x, y);
                return;
            }
        }
```

```470:471:nethack-c/upstream/src/display.c
        if (show && !Blind && (_ml_reg = visible_region_at(x, y)) != 0)
            show_region(_ml_reg, x, y);
```

Old JS: `visible_region_at` live; overlay named; cansee `newsym` inlined object/trap/engr/bg instead of `_map_location(x,y,1)`.

The diff **does** export `show_region` (`#` + `CLR_BRIGHT_GREEN` / `CLR_GRAY` from defsym `S_poisoncloud` / `S_cloud`), wire `newsym_try_show_region` on hero and other cansee cells **before** monster/self, overlay after every `map_location` arm, port `mon_overrides_region`, and fold the duplicated cansee map into `map_location(x,y,true)`. It **does not** port `is_worm_tail`/`see_wsegs`, DRAWBRIDGE_UP in the local pool clone, C FIXME hero-inside/monster-outside, `reveal_terrain` gascloud, or pager lookat `S_poisoncloud`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `show_region` | C `:732–735`, **LIVE this SHA** | JS cmap stand-in `#`/colors |
| `visible_region_at` | C `:718–728`, **LIVE D-1512** | skip `!visible` / ttl==-2 |
| `mon_overrides_region` | C `:668–700` static, **CLONE this file** | C is staticfn |
| `newsym` cansee overlay | C `:993–998`, **LIVE** | early return |
| `_map_location` overlay | C `:470–471`, **LIVE** | `maybe_overlay_visible_region` |
| `is_pool_or_lava_disp` | C `dbridge.c:77`, **CLONE** | DRAWBRIDGE **OMIT named** |
| `show_glyph_cell` | C `show_glyph`, **LIVE** | stamps `disp_*` before await |
| `see_wsegs` / `is_worm_tail` | C `worm.c`, **OMIT named** | next Open at this SHA |
| `gbuf_show_kind` region | JS classify, **stand-in** | C inspects glyph id |

`node scripts/sym.mjs show_region visible_region_at newsym map_location mon_overrides_region is_pool_or_lava is_pool_or_lava_disp newsym_try_show_region maybe_overlay_visible_region show_glyph_cell`:

```
show_region      js/region.js:95   sync
visible_region_at js/region.js:79   sync
newsym           js/display.js:2729   sync
map_location     js/display.js:2676   sync
mon_overrides_region NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:440
is_pool_or_lava  NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
               js/dig.js:222  js/eat.js:930  js/trap.js:633
is_pool_or_lava_disp NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:465
newsym_try_show_region NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:480
maybe_overlay_visible_region NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:496
show_glyph_cell  js/display.js:1925   ASYNC — await required
```

This SHA does **not** delete a symbol. `mon_overrides_region` is C static — one JS local is the C shape. `is_pool_or_lava_disp` is a **fourth** JS clone because `hack.js` already imports `display.js` (cycle). `hack.js` `is_pool`/`is_lava` already include DRAWBRIDGE (D-1077/D-1090); this clone does **not**. Named. `newsym_try_show_region` / `maybe_overlay` are JS names for the two C call sites, not extra C functions. `show_region` is sync and fire-and-forgets `show_glyph_cell`; the `disp_ch`/`gnew` stamp is **before** `await emit_show_glyph_change`. Same as the rest of `newsym`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`rn2_on_display_rng` is not in this overlay). **Public-unhit** until a live visible cloud is on-screen. Inherited seed0367 FAIL is D-1526.

## C ↔ JS fidelity

`show_region`. C `show_glyph(x,y,reg->glyph)`. `make_gas_cloud` sets cmap `S_poisoncloud` vs `S_cloud`. defsym.h: `S_cloud` `'#'` `CLR_GRAY`; `S_poisoncloud` `'#'` `CLR_BRIGHT_GREEN`. JS tags those strings and paints those tty cells. Does **not** write `remembered_glyph`. **Match the paint and the memory rule.** JS `if (!reg) return` is extra; C callers never pass NULL. Harmless.

`newsym` cansee order. C: `visible_region_at`, `waslit`, `m_at`, `is_worm_tail`, `erevealed`, **then** overlay+return, **then** `u_at` / monster / `_map_location(1)`. JS splits `u_at` earlier but both cansee arms now call `newsym_try_show_region` **after** `waslit`/`erevealed` and **before** `display_self` / `display_monster`. **Match `:993–998` vs `:1001+`.** Overlay true → skip mapping this call. **Match `return`.**

Guard. `ACCESSIBLE(typ)` **or** (`reg.visible && is_pool_or_lava`). `visible_region_at` already skipped `!visible`/ttl==-2, so `reg.visible` is true for every `reg` it returns; the extra `reg.visible` is C’s wording for pool/lava. JS the same. STONE / WALL: not ACCESSIBLE, not pool → no early overlay; `_map_location` may still overlay after mapping if show && !Blind. **Match the C split** (early return only for accessible/pool; STONE uses map-then-overlay).

`mon_overrides_region`. Swallow: `uswallow && (!mon \|\| mon != ustuck)` → FALSE (redundant; `newsym` already returned). Head cell `mx==mon->mx && my==mon->my` && (`sensemon` \|\| `mon_warning`) → TRUE. Else `!Blind && _mon_visible && M_AP not FURNITURE/OBJECT && distu <= r*(r+1)` with `r = xray_range>1 ? xray : 1` → TRUE (includes worm tail cells). Else `glyph_is_invisible(levl[mx][my].glyph)`. JS uses `mon_visible` which is `_mon_visible` (minvis/mundetected only). `glyph_is_invisible(loc)` is remembered `invisible`. **Match `:675–699`.** C FIXME hero-inside/monster-outside: `visible_region_at` on the **monster** cell is Null so overlay never runs there. JS the same. Named.

`_map_location`. After object/trap/engr/bg + `update_lastseentyp`, overlay if `show && !Blind`. JS `maybe_overlay_visible_region` on every arm. **Match.** `show==false` (map under monster): no overlay. Blind: no overlay. **Match.**

`is_pool_or_lava`. C `is_pool` (POOL/MOAT/WATER/`is_moat` incl. DRAWBRIDGE_UP+DB_MOAT) or `is_lava` (LAVAPOOL/LAVAWALL/DRAWBRIDGE_UP+DB_LAVA). JS local: those typs **without** DRAWBRIDGE. **Named omit.** Ordinary pool/lava/moat/waterwall match.

cansee map fold. Old JS duplicated `_map_location(1)`. Now `map_location(x,y,true)` so the overlay runs on that arm too. **Match C `:1035`.**

`gbuf_show_kind`. C classifies the glyph id `show_glyph` just wrote. JS has no ids; if a visible region is here, !Blind, `ch==='#'` and color is the cloud color → `'cmap'`. Stops a cloud `#` from being tagged monster/object. **Stand-in, not a C callee.** Corridor `#` without a region does not take this arm.

Callee closure (overlay arm). LIVE: `visible_region_at`, `show_region`, `show_glyph_cell`, `sensemon`, `mon_warning`, `mon_visible`, `ACCESSIBLE`. CLONE: `mon_overrides_region` (C static), `is_pool_or_lava_disp` except DRAWBRIDGE named. STUB: none. OMIT named: DRAWBRIDGE, `see_wsegs`, FIXME, `reveal_terrain` gas, pager lookat. **Arm may ship.** Not “dispatch ported, callee stubbed”: `show_region` is a real paint.

## Hallucinations / overclaim

Subject paints S_cloud/S_poisoncloud over accessible or pool/lava unless monster overrides: **true of the two C call sites**. D-log canary vapor ROOM no-memory / poison green / ttl−2 / pool / lava / STONE map-then-overlay / Blind / show=false / visible mon / minvis far / hero-in-cloud / object hidden / I-glyph: **true of that canary**. Stamping **Addressed:** D-1528 for **`:732–735` + `:470–471` + `:668–700` + `:993–998`** is fair. Do **not** stamp “Match C DRAWBRIDGE pool/lava.” Do **not** stamp “Match C `see_wsegs`.” Do **not** stamp “Match C integer cmap ids.” D-log “not a public FAIL” is true of **this** delta; seed0367 is still the D-1526 break. `show_region` is **not** a stub.

## Density

+153 JS: C overlay + helper + one cmap stand-in + folding the duplicated map arm. Did not glue `see_wsegs` (D-1529). §2b acceptable.

## Branch-by-branch confirm

1. ROOM vapor, no mon: early `show_region`, no `remembered_glyph` write this return. **Match.**
2. Poison: `#` + bright green. **Match defsym.h:204.**
3. Steam/fog: `#` + gray. **Match defsym.h:149.**
4. `!visible` or ttl==-2: `visible_region_at` null; no overlay. **Match.**
5. POOL/MOAT/LAVAPOOL with visible cloud: early overlay. **Match `:994`.**
6. STONE: no early overlay; `map_location` may overlay after. **Match.**
7. `show=false` under monster: memory without cloud paint. **Match `:470`.**
8. Blind: `_map_location` skip; `cansee` false so no early overlay. **Match.**
9. `sensemon`/`mon_warning` on head: monster wins. **Match `:680–682`.**
10. Adjacent `_mon_visible` non-mimic: monster wins. **Match `:689–694`.**
11. Remembered `I`: override TRUE, no cloud. **Match `:699`.**
12. DRAWBRIDGE_UP water/lava. **Named omit.**
13. Worm tail occupancy. **Named omit (D-1529).**
14. **Public-unhit** (no public live cloud on-screen).

## Callers / RNG ledger

C: `newsym` / `_map_location` only. JS the same. No `rn2` in the new helpers. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Fourth `is_pool_or_lava` clone is cycle debt, not Rule #2.

## Verification

D-log: private canary **31**/31; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until a live visible cloud is on-screen. Honest for this SHA. Full-suite FAIL remains seed0367 from D-1526.

## Actionable C-wrongs

None at the claimed overlay. Remaining **named**: DRAWBRIDGE_UP in `is_pool_or_lava_disp`; `see_wsegs`/`is_worm_tail`; C FIXME hero-inside; `reveal_terrain` gascloud; pager lookat `S_poisoncloud`. Do not Must-fix “await `show_glyph_cell`” — `newsym` is sync and the stamp is pre-await. Do not Must-fix importing `hack.js` `is_pool` from `display.js` (cycle). Do not Must-fix the Pri-strt emin dice (review **487**).

Verdict: **ACCEPT-WITH-DEBT**
