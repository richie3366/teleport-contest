# Review 726 — 3b34b789 — display.h GLYPH_*_OFF / detect.c map_monst (D-1765)

## Metadata
- Full / short hash: `3b34b789499ae8739d37b4d6e2f4df269f66eb98` / `3b34b789`
- Parent: `8f3f4280` (D-1764). This file audits **this SHA only** (eighth of nine `js/` commits since review **718**). Archive **Addressed:** D-1765 `3b34b789`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 05:54:45 +0200
- D-id: **D-1765**
- Stats: `js/const.js` +6; `js/detect.js` +38/−; `js/display.js` +454/−79. Total `js/` insertions **419** >250. Band **200–450**.
- Claims to close: Open integer `GLYPH_*_OFF` / `map_monst` monsym·mtame after D-1764 / reviews **699** (cmap tty only) and **720** (named gbuf `glyph_is_trap`). Not `ridden_mon_to_glyph` usteed. `reviews/loop-2026-08-15/` has no unpaid glyph Must-fix.
- JS / map: `display.js` offsets + `glyph_is_*`; `detect.js` `map_monst`; `const.js` S_engroom..S_brdnladder. `c-js-map/turns.md`.
- Prior: **720** named integer `GLYPH_*_OFF` / `glyph_is_trap` on gbuf. **709** pet/detected tty. **699** trap/zap cmap tty.

## Intent vs deliverable

Git subject promises: Match C `display.h` `glyph_offsets` and `detect.c` `map_monst` so integer `GLYPH_*_OFF` banks and the monsym/mtame ternary (ghosts stay detected) replace tty-only glyphs after D-1764.

`node scripts/csym.mjs map_monst` → `detect.c:121–134`. `--callers map_monst`: proto `:28`; `monster_detect` `:834`; `do_vicinity_map` `:1531`. `see_traps` `display.c:1610–1621`; callers `allmain.c:459`, `potion.c:426`. `show_glyph` `display.c:1876–2072`. `newsym_rn2` is `#define` `rn2_on_display_rng` (`display.h:209`). Macros `cmap_to_glyph` `:621–628`, `mon_to_glyph` `:555–557`, `glyph_is_trap` `:972–974`, `glyph_is_monster` `:770–772`. Enum `:497–546`.

```121:134:nethack-c/upstream/src/detect.c
staticfn void
map_monst(struct monst *mtmp, boolean showtail)
{
    int glyph = (monsym(mtmp->data) == ' ')
                ? detected_mon_to_glyph(mtmp, newsym_rn2)
                : mtmp->mtame
                  ? pet_to_glyph(mtmp, newsym_rn2)
                  : mon_to_glyph(mtmp, newsym_rn2);
    show_glyph(mtmp->mx, mtmp->my, glyph);
    if (showtail && mtmp->data == &mons[PM_LONG_WORM])
        detect_wsegs(mtmp, 0);
}
```

```1610:1621:nethack-c/upstream/src/display.c
void
see_traps(void)
{
    struct trap *trap;
    int glyph;
    for (trap = gf.ftrap; trap; trap = trap->ntrap) {
        glyph = _glyph_at(trap->tx, trap->ty);
        if (glyph_is_trap(glyph))
            newsym(trap->tx, trap->ty);
    }
}
```

Parent: tty `{ch,color,kind}` only; `map_monst` always `mon_glyph`; `see_traps` `disp_kind !== 'trap'`; missing S_engroom / S_br*ladder. The diff **does** port the offset enum (incl. `GLYPH_TRAP_OFF = GLYPH_CMAP_B_OFF + (S_arrow_trap - S_grave)`), male/fem `*_to_glyph`, `glyph_is_*` / `glyph_to_mon` / integer `cmap_to_glyph` / `altar_to_glyph`, `attach_glyph` on `cmap_idx_to_glyph`, store `loc.disp_glyph` **when the caller passes an id**, `map_monst` C ternary + `glyph_tty_attr`, vicinity `glyph_is_monster(oldglyph.glyph)`, and fill cmap holes 21/24/29–32 without shifting existing S_* ids. It **does not** make `show_glyph_cell` always overwrite gbuf. It **does not** wire `ridden_mon_to_glyph` into `display_self`/usteed or port `map_glyphinfo`/`reset_glyphmap`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `GLYPH_*_OFF` / `NO_GLYPH` / `MAX_GLYPH` | LIVE const | `display.h:497–546`; `NO_GLYPH = MAX_GLYPH` |
| `mon_to_glyph` / `pet_to_glyph` / `detected_mon_to_glyph` | LIVE repaired | `what_mon` + male/fem offs `:555–565` |
| `ridden_mon_to_glyph` / `ridden_monnum_to_glyph` | LIVE export, caller OMIT | body matches macro; usteed named |
| `monnum_to_glyph` / `petnum_to_glyph` / `detected_monnum_to_glyph` | LIVE | no `what_mon` |
| `monsym` | LIVE new | `mondata.h`; JS `MLET_CH[mlet]` |
| `cmap_to_glyph` / `altar_to_glyph` / `cmap_walls_to_glyph` | LIVE new | header macros; tty still `cmap_idx_to_tty` |
| `cmap_idx_to_glyph` | LIVE repaired | tty + `.glyph`; renamed inner `cmap_idx_to_tty` |
| `glyph_is_*` / `glyph_to_mon` | LIVE new | integer only (`glyph_id` null on tty objects) |
| `glyph_is_invisible` | LIVE repaired | **also** `disp_glyph === GLYPH_INVISIBLE` |
| `map_monst` | LIVE repaired | C ternary; `detect_wsegs` D-1545 |
| `glyph_tty_attr` | LIVE export | detect MG_PET / MG_DETECT tty |
| `see_traps` | LIVE repaired **wrong gbuf** | prefers stale `disp_glyph` |
| `show_glyph_cell` | CLONE incomplete | writes `disp_glyph` only if arg set |
| `do_vicinity_map` `glyph_is_monster` | LIVE + stale | AND with `kind !== 'monster'` |
| `map_glyphinfo` / `reset_glyphmap` / swallow cmap | OMIT named | |
| `newsym_rn2` | no JS name | C alias of `rn2_on_display_rng` — do not add |

`node scripts/sym.mjs`:

```
cmap_idx_to_glyph js/display.js:1388   sync
cmap_to_glyph    js/display.js:562   sync
glyph_is_trap    js/display.js:650   sync
glyph_is_monster js/display.js:643   sync
glyph_is_invisible js/display.js:1017   sync
glyph_is_invisible_id js/display.js:647   sync
glyph_to_mon     js/display.js:673   sync
mon_to_glyph     js/display.js:429   sync
pet_to_glyph     js/display.js:439   sync
detected_mon_to_glyph js/display.js:449   sync
ridden_mon_to_glyph js/display.js:459   sync
monnum_to_glyph  js/display.js:486   sync
monsym           js/display.js:422   sync
map_monst        js/detect.js:1095   sync
see_traps        js/display.js:4370   sync
show_glyph_cell  js/display.js:3186   ASYNC — await required
trap_to_glyph    js/display.js:1698   sync
altar_to_glyph   js/display.js:548   sync
GLYPH_TRAP_OFF   js/display.js:187   sync   export const
NO_GLYPH         js/display.js:183   sync   export const
newsym_rn2       NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
```

`--can detect.js display.js pet_to_glyph` / `detected_mon_to_glyph` / `mon_to_glyph` / `monsym` / `glyph_tty_attr` / `glyph_is_monster`: **ALREADY** (static import). `--can display.js detect.js map_monst`: **SAFE** (hoisted; 87-module SCC, not a TDZ). FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Offset enum (`display.h:497–546`).** JS copies the recurrence (`NUMMONS` banks, wall span, `GLYPH_CMAP_B_OFF = 5 + GLYPH_ALTAR_OFF`, `GLYPH_TRAP_OFF` from `S_arrow_trap - S_grave`, `NUMMONS<<3` swallow, `MAXEXPCHARS` expl, `NO_GLYPH = MAX_GLYPH`). Filled `S_engroom=21` / `S_engrcorr=24` / `S_brupstair=29`…`S_brdnladder=32` into holes; parent `S_corr=22` / `S_altar=33` / `S_arrow_trap=49` **did not shift**. `GLYPH_ALTAR_OFF` now uses real `S_brdnladder`. **Match the constants.**

**`*_to_glyph` (`:555–565`).** One `what_mon(monsndx, rng)` then female? FEM_OFF : MALE_OFF. JS the same; default rng `rn2_on_display_rng` ≡ `newsym_rn2`. Tails: `petnum_to_glyph` no `what_mon`; detected tails `what_mon(PM_LONG_WORM_TAIL)` then `detected_monnum_to_glyph`. **Match.** `ridden_mon_to_glyph` body LIVE; `display_self`/usteed **named omit**, not a stub in a live arm.

**`map_monst` (`:124–128`).** `monsym==' '` (ghost) → detected **before** `mtame`, so tame ghosts stay DETECT. Else pet else mon. Then `show_glyph` + optional `detect_wsegs`. JS `monsym(mtmp.data)===' '` then the same; passes `g.glyph` + `glyph_tty_attr`. `mtmp_is_long_worm` is mndx (D-1549). Callers `:834` TRUE / `:1531` FALSE. **Match the ternary.** Hallu `what_mon` is display-stream (not core log).

**`cmap_to_glyph` (`:621–628`).** Stone / walls / cmap-a (`idx - S_ndoor`) / `altar_to_glyph(AM_NEUTRAL)` / cmap-b (`idx - S_grave`) / cmap-c / `NO_GLYPH`. JS integer function matches; tty stays on `cmap_idx_to_tty` wrapped by `attach_glyph`. Trap ids land in `GLYPH_TRAP_OFF`…`+MAXTCHARS`. **Match the integer map.** `trap_to_glyph` still no Hallu (D-1759).

**`show_glyph` vs `show_glyph_cell` (`display.c:1876–2072`).** C always assigns `gg.gbuf[y][x].glyphinfo.glyph = glyph` (after range check). `_glyph_at` / `glyph_at` read that cell. JS:

```3186:3204:js/display.js
export async function show_glyph_cell(x, y, ch, color = NO_COLOR, decgfx = false, attr = 0, glyph) {
    ...
    loc.disp_kind = kind;
    if (glyph != null) loc.disp_glyph = glyph | 0;
    else if (ch === 'I' && !decgfx) loc.disp_glyph = GLYPH_INVISIBLE;
```

Callers that still paint tty-only (no 7th arg): `map_background` `:1035`, `map_engraving` `:1733`, `magic_map_background` `:3788`, memory/`show_map_spot` `:3428`/`:3457`/`:3621`/`:3660`, `map_location` dark/space arms. Those **leave the previous `disp_glyph`**. C has no stale gbuf. **C-wrong.**

**`see_traps` (`:1617–1619`).** C: `_glyph_at` then `glyph_is_trap` only. JS after this SHA:

```4378:4384:js/display.js
        if (loc?.disp_glyph != null) {
            if (!glyph_is_trap(loc.disp_glyph)) return;
        } else if (loc?.disp_kind !== 'trap') {
            return;
        }
        newsym(x, y);
```

Once any integer id has been stored, the `disp_kind` fallback is dead. Stale trap ids after a later tty-only `map_background` / `map_location` make `glyph_is_trap` true while the cell is no longer a trap glyph in C. Extra `newsym` is not paint-only: `newsym` `:4127–4132` can set `trap.tseen` on mtrapped bear/pit/web, and `:4117–4118` sets `engr.erevealed`. Callers `allmain.c:459` (Hallu once-per-input) and `potion.c:426` (`toggle_blindness` / appearance change). Core `rn2` log does **not** include `rn2_on_display_rng`, so extra display Hallu rolls would not explain seed0006; extra `tseen` / `erevealed` / `glyph_is_invisible` short-circuit **do**. **C-wrong (fortress).**

**`glyph_is_invisible`.** C tests the current gbuf id. JS now `disp_glyph === GLYPH_INVISIBLE` **or** remembered I. Stale I after a tty remap makes `newsym` `:4148–4151` `map_invisible`+return (skip `map_location`) and `show_mon_or_warn` extra `unmap_object`. Same stale-gbuf family.

**`do_vicinity_map` (`:1526–1531`).** C `!glyph_is_monster(oldglyph)` then `map_invisible` else `map_monst`. JS ANDs `kind !== 'monster'` **and** `!glyph_is_monster(oldglyph.glyph)`. Stale monster id with `kind` trap/object skips `map_invisible` (C would I). Mixed tty/integer. Same family.

**`glyph_is_trap` / `glyph_is_monster` predicates.** Integer ranges match C. `glyph_id` on a tty object is `null` → false. Harmless until `disp_glyph` is trusted as live gbuf.

## Hallucinations / overclaim

Subject / D-log: “Match C” integer banks **and** `see_traps` `glyph_is_trap` analogue; “not a public FAIL”; verified green+cohort **7**/7. The offset enum and `map_monst` ternary **do** match. The gbuf analogue **does not**: `show_glyph_cell` is not `show_glyph`. Calling `see_traps` / vicinity / `glyph_is_invisible` “ported to integer glyphs” while most `newsym` terrain paints omit the id is a **dispatch/gbuf Match-C overclaim**. Public suite at this SHA is **not** 44/44 (bisect: `2d66f69e` 4/4 PASS on the later FAIL set; this SHA 0/4; D-1766 same prefixes). Cohort 7/7 does not cover seed0006 / 0014 / 0030 / 4500.

## Density

§2b: offset enum + `map_monst` ternary is one cluster. Wiring `glyph_is_*` into `see_traps` / vicinity / `glyph_is_invisible` **without** completing `show_glyph` is a second hypothesis in the same commit (+419). Too big: integer ids and live gbuf reads should have been one falsifier. Named usteed/swallow/`map_glyphinfo` were correctly split.

## Verification

D-log: save-oracle skip (untagged `detect.c:map_monst` / `display.h:GLYPH_MON_OFF`); node canary (offset identities; ghost→detect including tame; wild/pet/fem pet banks); green+strict seed8000/0900; CURRENT cohort **7**/7. Rule #2 clean. **Public suite at this SHA FAIL** (cadence later): seed0006 wizard-water-demon RNG 3608/6736 Screen 88/123; seed0014 dequa-fountain RNG 43831/59178 Screen 629/714; seed0030 ten-deaths RNG 51583/105529 Screen 1795/1953; seed4500 knight RNG 90701/108275 Screen 1109/1814. Do **not** treat green+cohort as fortress. Do **not** invent a new FAIL peel — this is the D-1765 C-wrong.

## Actionable C-wrongs

1. `display.c` `show_glyph` always overwrites `gbuf.glyph`; JS `show_glyph_cell` leaves stale `loc.disp_glyph` on tty-only paints (`map_background` `:1035`, `magic_map_background` `:3788`, `map_engraving`, `show_map_spot` / memory). Then `see_traps` (`:1617–1619`), `glyph_is_invisible`, and `do_vicinity_map` (`:1528`) treat that id as `_glyph_at`, extra-or-skip `newsym` (`tseen` / `erevealed` / I-keep). One port: always stamp `disp_glyph` (integer from the glyph just shown, or `NO_GLYPH` / cmap id), and make `see_traps` `glyph_is_trap(_glyph_at)` only — no `disp_kind` hybrid. Not `ridden_mon_to_glyph` usteed. Not `map_glyphinfo`. Not a new FAIL peel.

Named (map, not Must-fix): `ridden_mon_to_glyph` usteed; swallow cmap; `map_glyphinfo` / `reset_glyphmap`. Do **not** add `newsym_rn2`. Do **not** shift existing S_* ids. Do **not** restore `map_monst` always-`mon_glyph`. Do **not** invent 3.6 `random_trap_to_glyph`. Do **not** restore `see_traps` `tseen` walk (D-1759).

Verdict: **QUALITY-RISK**

**Addressed:** D-1767 `148dc4da`
