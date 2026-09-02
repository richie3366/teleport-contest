# Review 699 — 8a58906e — display.h cmap_to_glyph trap/zap/expl (D-1738)

## Metadata
- Full / short hash: `8a58906eecde8980376f7d843c964139e6e5ee78` / `8a58906e`
- Parent: `5d1f9fb6` (D-1737). This file audits **this SHA only** (fourth of five `js/` commits since review **695**). Archive **Addressed:** D-1738 `8a58906e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 22:10:14 +0200
- D-id: **D-1738**
- Stats: `js/const.js` +68/−1; `js/display.js` +241/−64-ish net; `js/explode.js` +18/−4. Total `js/` insertions **263** >250. Band **200–450**.
- Claims to close: Open `cmap_to_glyph` trap/zap/expl after D-1737 / review **687** (furniture LIVE via `cmap_idx_to_glyph`; trap/zap/cmap-C still `'?'`). Not furniture lastseentyp. Not Detect_monsters cansee. `reviews/loop-2026-08-15/` has no unpaid cmap Must-fix.
- JS / map: `display.js` `cmap_idx_to_glyph` / `explosion_to_glyph` / `explode_show_visible`; `explode.js`; `const.js` S_* 49–87/96–104. `c-js-map/turns.md`.
- Prior: **687** named trap/zap/expl cmap as omit (`cmap_idx_to_glyph` furniture-only).

## Intent vs deliverable

Git subject promises: trap/zap/cmap-C PCHARs and `explosion_to_glyph` paint via `trap_to_defsym` instead of `'?'` / parallel `trap_glyph` / voided `expltype` after D-1737.

`cmap_to_glyph` / `trap_to_glyph` / `explosion_to_glyph` are header macros (`display.h:621–628` / `:630–631` / `:587–594`), not `.c` functions. `trap_to_defsym` `rm.h:497`. `node scripts/csym.mjs explode` → `explode.c` (visible blast `:388–438`). `shield_static` `decl.c:97–101`. `explodecolors` `display.c:2670–2674`.

```621:631:nethack-c/upstream/include/display.h
#define cmap_to_glyph(cmap_idx) \
    ( ((cmap_idx) == S_stone)   ? GLYPH_CMAP_STONE_OFF                      \
    : ((cmap_idx) <= S_trwall)  ? cmap_walls_to_glyph(cmap_idx)             \
    : ((cmap_idx) <  S_altar)   ? cmap_a_to_glyph(cmap_idx)                 \
    : ((cmap_idx) == S_altar)   ? altar_to_glyph(AM_NEUTRAL)                \
    : ((cmap_idx) <  S_arrow_trap + MAXTCHARS) ? cmap_b_to_glyph(cmap_idx)  \
    : ((cmap_idx) <= S_goodpos) ? cmap_c_to_glyph(cmap_idx)                 \
      : NO_GLYPH )
#define trap_to_glyph(trap) \
    cmap_to_glyph(trap_to_defsym(((int) (trap)->ttyp)))
```

Parent: `cmap_idx_to_glyph` furniture/terrain then `'?'`; `trap_glyph` parallel `ttyp` colors; `explode(..., _expltype)` `void`. The diff **does** add defsym S_* 49–87/96–104 + `trap_to_defsym`, route trap/zap/cmap-C through `cmap_trap_zap_expl_glyph`, re-point `trap_glyph` to `cmap_idx_to_glyph(trap_to_defsym)`, export `explosion_to_glyph` (DARK→FIERY), paint visible blast via `explode_show_visible`, and drive `shieldeff` from `shield_static` cmap indices. It **does not** port drawbridge 42–45. Named. It **does not** switch !visible `Boom!` to `You_hear("a blast.")`. Named. It **does not** `map_invisible` when `mtmp && cansee && !canspotmon`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `S_arrow_trap`…`S_goodpos` / `S_expl_*` | LIVE const | defsym.h PCHAR 49–87 / 96–104 |
| `trap_to_defsym` / `defsym_to_trap` | LIVE new | C `rm.h:497–498` |
| `explodecolors` / `NUM_ZAP` | LIVE new | display.c table / display.h |
| `cmap_trap_zap_expl_glyph` | CLONE tty of cmap_b/c | PCHAR ch+color; not integer IDs |
| `cmap_idx_to_glyph` | LIVE repaired | default no longer `'?'` for 49–87 |
| `trap_glyph` | LIVE re-point | C `trap_to_glyph` |
| `explosion_to_glyph` | LIVE new | tty clone of C macro |
| `explode_show_visible` | LIVE new | explode.c `:388–438` |
| `shield_static` | LIVE local | decl.c 7×3 |
| `explode` expltype | LIVE re-point | no longer `void` |
| drawbridge 42–45 / swallow 88–95 | OMIT named | still `'?'` / other macros |
| You_hear vs Boom! | OMIT named | |
| hallu `random_trap_to_glyph` | OMIT named | |

`node scripts/sym.mjs` (new exports; trap_glyph stays local):

```
cmap_idx_to_glyph js/display.js:885   sync
explosion_to_glyph js/display.js:1036   sync
trap_to_defsym   js/const.js:191   sync
trap_glyph       NOT EXPORTED — 1 LOCAL  js/display.js:1238
explode_show_visible js/display.js:3202   ASYNC — await required
S_arrow_trap     js/const.js:142   sync   export const
```

`--can explode.js display.js explode_show_visible` / `unmap_invisible`: ALREADY. `--can display.js const.js trap_to_defsym`: ALREADY. No new TDZ edge. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none (`AUTOUNLOCK_FORCE` / `FORCETRAP` are C constants). `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**S_* ids.** C `defsym.h` PCHAR 49=`S_arrow_trap` … 87=`S_goodpos`; 96–104 `S_expl_*`; swallow 88–95 skipped (other macros). JS const matches those numbers. **Match the index window.**

**`trap_to_defsym` (`rm.h:497`).** C `S_arrow_trap + t - 1`. JS same. `trap_to_glyph` is that cmap. JS `trap_glyph` `cmap_idx_to_glyph(trap_to_defsym(ttyp))`. Parent parallel color table is gone. **Match.** Hallu `random_trap_to_glyph` still omitted. `ttyp<=NO_TRAP` JS returns `^`/HI_METAL; C would cmap `S_water` — callers do not pass 0; not Must-fix.

**Trap PCHARs (`cmap_b`).** C `idx < S_arrow_trap + MAXTCHARS` (49..73: arrow…trapped-chest). JS `idx >= S_arrow_trap && idx < S_arrow_trap + MAXTCHARS`. ch `^` except WEB `"` (`defsym.h:174`) and VS `~` (`:180`); 25-entry color table matches those PCHARs (HI_METAL, HI_METAL, CLR_GRAY, CLR_BROWN, HI_METAL, CLR_RED, CLR_GRAY, HI_ZAP, CLR_BLUE, CLR_ORANGE, CLR_BLACK, CLR_BLACK, CLR_BROWN, CLR_BROWN, CLR_MAGENTA, CLR_MAGENTA, CLR_BRIGHT_MAGENTA, CLR_GRAY, CLR_GRAY, HI_ZAP, HI_ZAP, CLR_BRIGHT_GREEN, CLR_MAGENTA, CLR_ORANGE, CLR_ORANGE). **Match tty.** Parent `'?'` for `S_web` is gone. `trap_glyph` invalid `ttyp` still `^`/HI_METAL (C would `cmap_to_glyph(S_water)`); not a live caller.

**Zap + cmap C (`:627`).** C next arm is `idx <= S_goodpos` → `cmap_c_to_glyph` (`idx - S_digbeam`). That packs 78–87 (dig/flash/boom/ss/poison/goodpos). JS paints **74–87** in one helper: v/h/l/r beam `|-\/` (DEC v/h `x`/`q` from `dat/symbols`); then cmap-C `*` `!` `)` `(` `0#@*` poisoncloud `#`/bright green, `S_goodpos` `$`/HI_ZAP (`defsym.h:186–207`). **Match those PCHARs.** Zap 74–77 are not `GLYPH_ZAP_*` (C uses `zapdir_to_glyph` for beams); tty cmap of `S_vbeam` is still the PCHAR. `idx > S_goodpos` (swallow 88–95) still `'?'` ≡ C `cmap_to_glyph` `NO_GLYPH` (swallow is `swallow_to_glyph`). Drawbridge 42–45 still `'?'`. Named.

```973:975:js/display.js
    default:
        return cmap_trap_zap_expl_glyph(idx, dec);
```

**`explosion_to_glyph` (`:587–594`).** C ternary: FROSTY/MAGICAL/WET/MUDDY/NOXIOUS else **FIERY** (EXPL_DARK=0 included — not `explodecolors[EXPL_DARK]` black). Offset `idx - S_expl_tl`. JS 9-cell ch `/ - \\ |   | \\ - /` then DEC tc/ml/mr/bc `o`/`x`/`s`; colors WHITE/MAGENTA/BLUE/BROWN/GREEN else `explodecolors[EXPL_FIERY]` (ORANGE ≡ `explode_color_fiery`). **Match the DARK→FIERY default and the 9-cell ch.** Integer `GLYPH_EXPLODE_*_OFF` still named. `explodecolors[]` order DARK..FROSTY matches `display.c:2670`.

```587:594:nethack-c/upstream/include/display.h
#define explosion_to_glyph(expltyp, idx) \
    ((idx) - S_expl_tl                                                  \
     + (((expltyp) == EXPL_FROSTY) ? GLYPH_EXPLODE_FROSTY_OFF           \
        : ((expltyp) == EXPL_MAGICAL) ? GLYPH_EXPLODE_MAGICAL_OFF       \
          : ((expltyp) == EXPL_WET) ? GLYPH_EXPLODE_WET_OFF             \
           : ((expltyp) == EXPL_MUDDY) ? GLYPH_EXPLODE_MUDDY_OFF        \
             : ((expltyp) == EXPL_NOXIOUS) ? GLYPH_EXPLODE_NOXIOUS_OFF  \
               : GLYPH_EXPLODE_FIERY_OFF))
```

```1036:1047:js/display.js
export function explosion_to_glyph(expltyp, idx) {
    const eidx = (idx | 0) - S_expl_tl;
    const chs = ['/', '-', '\\', '|', ' ', '|', '\\', '-', '/'];
    let ch = chs[eidx] ?? '/';
    ...
    else color = explodecolors[EXPL_FIERY] ?? CLR_ORANGE;
```

**Visible blast (`explode.c:388–438`).** C `if (visible)` tmp_at `starting ? DISP_BEAM : DISP_CHANGE` of `explosion_to_glyph(expltype, explosion[i][j])`, skip `EXPL_SKIP`, then if `any_shield && flags.sparkle` loop `SHIELD_COUNT` `show_glyph(cmap_to_glyph(shield_static[k]))` + delay, cover with blast again; else two `nh_delay_output`; `tmp_at(DISP_END, 0)`. JS `explode_show_visible` recomputes `visible` from `cansee` (C set `visible` in the mask pass), returns if none, same tmp_at / sparkle (`flags.sparkle === false` only; missing ≡ On like `shieldeff`) / two delays / DISP_END. `explosion[][]` is C column-first (`explode.c:11–14`); JS copies that layout so `explosion[0][0]` is `S_expl_tl` at `(x-1,y-1)`. EXPL_MON/HERO bits match C `explmask & (EXPL_MON|EXPL_HERO)`. **Match the visible painter.** Parent `void _expltype` skipped this entire arm.

**`shieldeff` (`display.c:1110–1123`).** C `!flags.sparkle` return; `cansee` then `cmap_to_glyph(shield_static[i])` 21 times + `newsym`. Parent used inline `{ch,color}`. This SHA re-points to `cmap_idx_to_glyph(shield_static[i])` (S_ss1..S_ss4). **Match the cmap indices.** DEC/showsyms S_ss* remap still named.

```11:14:nethack-c/upstream/src/explode.c
static const int explosion[3][3] = {
        { S_expl_tl, S_expl_ml, S_expl_bl },
        { S_expl_tc, S_expl_mc, S_expl_bc },
        { S_expl_tr, S_expl_mr, S_expl_br } };
```

**!visible message (`:439–452`).** C `olet==MON_EXPLODE||TRAP_EXPLODE` generic-str; `!Deaf && olet != SCROLL_CLASS` → `You_hear("a blast.")` `didmsg=TRUE`; then `if (!Deaf && !didmsg) Boom!`. Visible path leaves `didmsg` false so Boom! still fires after the painter. JS `explode.js:397–401` always `if (!Deaf) Boom!` after `explode_show_visible` (which returns immediately when !visible). SCROLL_CLASS off-screen would C You_hear-skip or skip Boom! via didmsg; JS still Boom!. **Named omit.** Not a stub inside the visible arm.

**`map_invisible` (`:378–381`).** C `mtmp && cansee && !canspotmon` else `unmap_invisible` when `!mtmp`. JS only the `else unmap`. Named.

**`gbuf_show_kind` traps.** Occupancy still matches `trap_glyph(trap).ch`. After this SHA that ch is cmap (web `"` not `^`), so kind `'trap'` follows the new PCHAR. **Match the displayed letter.** Region overlay still keys `'S_poisoncloud'`/`'S_cloud'` strings, not cmap ids. Named.

**Callee closure (trap/zap/expl cmap).** LIVE: `trap_to_defsym`, `cmap_idx_to_glyph`, `explosion_to_glyph`, `tmp_at`, `shield_static`, `shieldeff` cmap path, `explode_show_visible` (ASYNC, awaited from `explode`). OMIT named: drawbridge; swallow; integer IDs; hallu trap; You_hear; explode `map_invisible`; getpos `S_goodpos` tmp_at; region string keys; `reset_glyphmap` explodecolors vs defsym orange. STUB in the **trap/zap/expl cmap arms**: **none**. Review **687**’s `'?'` omit is now LIVE. Not “dispatch ported, callee stubbed.” `NUM_ZAP` is exported and unused in this SHA (zapdir packing named).

## Hallucinations / overclaim

Subject “via trap_to_defsym instead of `'?'` / parallel trap_glyph / voided expltype”: **true**. D-log WEB `"` / VS `~` / DARK→FIERY / drawbridge still `?`: **true**. Do **not** stamp “Match C integer `GLYPH_CMAP_*` / `GLYPH_EXPLODE_*`.” Do **not** stamp “Match C `You_hear` when !visible.” Do **not** stamp “Match C drawbridge cmap 42–45.” Do **not** stamp “Match C `random_trap_to_glyph`.” Journal “fortress held” is not a fireball-screen proof. Visible blast **public-unhit** on many seeds; canary was node `^`/`"`/`~`/`$`/`#` + expl `/`. Admit that.

## Density

§2b: one cmap envelope (trap + zap + cmap-C + the explode macros C uses for those indices). +263 in band. Did not glue `map_object` observe (next Open) or drawbridge. Did **not** reopen D-1737 Detect / D-1726 furniture.

## Verification

D-log: save-oracle skip (untagged `display.c:cmap_to_glyph`); node trap `^`/`"`/`~`, `S_goodpos` `$`, poisoncloud `#`, `explosion_to_glyph(EXPL_FIERY, S_expl_tl).ch === '/'`, EXPL_DARK→FIERY, drawbridge still `?`; green+strict seed8000/0900; CURRENT cohort **7**/7 + seed2200/0383 **9**/9 + strict. Rule #2 clean. Visible blast **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open cmap window matches C on tty). Named: drawbridge 42–45; swallow cmap; integer glyph IDs; hallu `random_trap_to_glyph`; getpos/`apply` `S_goodpos` tmp_at; region `'S_poisoncloud'`/`'S_cloud'` strings; You_hear vs Boom! when !visible; explode `map_invisible` when `mtmp && !canspotmon`. Do **not** restore parallel `trap_glyph` colors. Do **not** `void expltype`. Do **not** add `trap_to_defsym` #2. Do **not** re-port D-1737 Detect / D-1726 furniture.

Verdict: **ACCEPT-WITH-DEBT**
