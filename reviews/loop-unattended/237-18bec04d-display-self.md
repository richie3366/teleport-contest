# Review 237 — 18bec04d — display.h display_self U_AP_TYPE glyphs (D-1275)

## Metadata
- Full / short hash: `18bec04d17f48e7d99665e9f7d831e5fc9296dd8` / `18bec04d`
- Parent: `10f92d20` (reviews **233–236**). This file audits **this SHA only**. Archive row **Addressed:** D-1275 `18bec04d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 12:58:28 +0200
- D-id: **D-1275**
- Stats: 11 files, +314 / −78 — `js/display.js` +246 / −~40; `js/detect.js` +10 / −~8; comment `js/hack.js`.
- Claims to close: Open `display.c` `display_self` U_AP_TYPE glyphs (named from D-1260 / review **222**). Not seemimic. `reviews/loop-2026-08-15/` has no unpaid display_self Must-fix.
- JS / map: `display.js` `display_self` / `hero_display_glyph` / cmap·objnum·monnum helpers; `detect.js` `monster_detect`; `c-js-map/turns.md`. find_trap cls / muse / gender / swap-with-pet `seemimic` named.
- Prior reviews this SHA claims to close: **222** named omit `display_self` U_AP_TYPE glyphs after mimic unhide.

## Intent vs deliverable

Git subject promises: “Match C display.h display_self so a hero imitating furniture, an object, or a monster paints that glyph, instead of always showing hero_glyph.”

C `display_self` (`display.h:251–260`) wraps `maybe_display_usteed` (`:246–249`): steed `mon_visible` → `ridden_mon_to_glyph(..., rn2_on_display_rng)`; else `U_AP_TYPE` (`m_ap_type & M_AP_TYPMASK`) NOTHING → `hero_glyph`; FURNITURE → `cmap_to_glyph(mappearance)` (S_altar → `altar_to_glyph(AM_NEUTRAL)`); OBJECT → `objnum_to_glyph` (not Hallu); else `monnum_to_glyph(mappearance, Ugender)`. Callers: `display.c` `newsym` swallow (`:939–941`) / cansee u_at (`:1001–1009`) / !cansee feel (`:1041–1045`); `swallowed` (`:1369`); `detect.c` `monster_detect` (`:842–843`). `find_trap` cls (`:1951`) and `muse.c` `you_aggravate` (`:2640`) named.

Old JS: `hero_display_glyph` was steed-or-`hero_glyph` only; `monster_detect` hardcoded `'@'` `CLR_WHITE`.

The diff **does** export live `display_self`, U_AP_TYPE arms, and rewires those three `newsym`/`swallowed` sites plus detect. It does **not** port find_trap cls+wait, muse aggravate, gender glyph offsets, or pet-swap `seemimic`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `display_self` | C `display.h:251–260`, **new** | `show_glyph_cell` stand-in for `show_glyph` |
| `hero_display_glyph` | C `maybe_display_usteed` + ternary, **wired** | was steed-or-hero only |
| `hero_glyph` | C `:654–656`, **rename** | `(Upolyd \|\| !showrace) ? umonnum : urace.mnum`; no Hallu |
| `cmap_idx_to_glyph` | C `cmap_to_glyph` `:621–628`, **clone** | PCHAR 0–41, 46–48; skip 42–45 drawbridge + trap/zap |
| `objnum_to_display_glyph` | C `objnum_to_glyph` `:638`, **clone** | class `DEF_OC_SYM` + `oc_color`; gold `_goldsym`; not Hallu |
| `monnum_to_display_glyph` | C `monnum_to_glyph` `:639–641`, **clone** | mlet + `mcolors`; Ugender offsets named |
| `wall_cmap_color` | C `wallcolors[]` / `reset_glyphmap`, **extract** | mines BROWN / hell RED / soko DEC BLUE |
| `monster_detect` caller | C `detect.c:842–843`, **wired** | was hardcoded `@` |
| `newsym` / `swallowed` callers | C `display.c`, **wired** | |
| find_trap cls / muse `display_self` | C, **named omit** | JS `find_trap` still message-only |
| `display_monster` M_AP_FURNITURE | C, **named omit** | lastseentyp |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in the U_AP_TYPE arms; `objnum` deliberately skips Hallu (`display.h:636–638`). Steed still uses pre-existing `mon_glyph` (Hallu `rn2_on_display_rng`) where C uses `ridden_mon_to_glyph` with the same rng — not a new gate.

## C ↔ JS fidelity

Pinned C (`display.h:246–260`):

```
#define maybe_display_usteed(otherwise_self) \
    ((u.usteed && mon_visible(u.usteed)) \
         ? ridden_mon_to_glyph(u.usteed, rn2_on_display_rng) : (otherwise_self))
#define display_self() \
    show_glyph(u.ux, u.uy, maybe_display_usteed( \
        ((int) U_AP_TYPE == M_AP_NOTHING) ? hero_glyph \
        : ((int) U_AP_TYPE == M_AP_FURNITURE) \
          ? cmap_to_glyph((int) gy.youmonst.mappearance) \
          : ((int) U_AP_TYPE == M_AP_OBJECT) \
            ? objnum_to_glyph((int) gy.youmonst.mappearance) \
            : monnum_to_glyph((int) gy.youmonst.mappearance, Ugender)))
```

JS: steed `mon_visible` first; `ap = m_ap_type & M_AP_TYPMASK` (live `0x7`); NOTHING → `hero_glyph`; FURNITURE → cmap clone; OBJECT → objnum clone; else monster. `M_AP_F_DKNOWN` (0x8) does not change the type test. This is **not** “Match C dispatch, callee is a stub”: `show_glyph_cell` paints the chosen `{ch,color,dec}`.

Furniture clone vs `defsym.h` PCHAR: S_fountain `{` `CLR_BRIGHT_BLUE`; S_altar `_`/`{` DEC + `altar_to_glyph(AM_NEUTRAL)` gray (no `USE_GENERAL_ALTAR_COLORS`); closed door `+` brown; open door ASCII `-`/`|` / DEC `a`; bars/tree/stairs/throne/sink/pool/ice/lava/air/cloud/water match existing `terrain_glyph` tty mapping (GRAY→`NO_COLOR` on ndoor/corr). Default `'?'` for cmap 42–45 and trap/zap (≥49). Eat-mimic / `#monster` hide set **OBJECT** (gold/orange/STRANGE_OBJECT), not those indices. Slimed sets **MONSTER** `PM_GREEN_SLIME`. Named skip of drawbridge/trap cmap, not a gold-mimic miss.

`objnum`: C is `otyp + GLYPH_OBJ_OFF` then tty class symbol + `oc_color`. JS `DEF_OC_SYM[oclass]` (ROCK `` ` ``, COIN `_goldsym`). Not `obj_glyph` / `statue_to_glyph` / Hallu `random_object`. Match the claimed non-Hallu object class.

`hero_glyph` does not Hallu (C macro neither). `newsym` swallow / cansee `canspotself` / feel `canspotself` now call `display_self` instead of inlining steed-or-hero. Detect `!swallowed` → `display_self()` before the sense pline. Order matches C `:842–844`.

## Hallucinations / overclaim

Subject + D-1275 say an imitating hero paints furniture/object/monster instead of always `hero_glyph`. **`display_self` + U_AP_TYPE arms + the four callers are the hunk.** Stamping **Addressed:** D-1275 is fair. Do **not** stamp “Match C `cmap_to_glyph` trap/zap/drawbridge 42–45.” Do **not** stamp “Match C `ridden_mon_to_glyph` overlay vs `mon_glyph`.” Do **not** stamp “Match C find_trap cls `display_self` / muse aggravate / `monnum` Ugender offsets.” `M_AP_TYPMASK===0x7` is C’s mask, not a trace index.

## Density

One C macro plus the callers that were painting hero/`@`. ~15 lines of C; 246 JS because the furniture arm clones PCHAR 12–48. Upper edge of §2b (table, not a second subsystem). Did not glue `seemimic` or doname EGG.

## Branch-by-branch confirm

1. `U_AP_TYPE==NOTHING`, no steed: `hero_glyph` umonnum/urace. Match.
2. Steed `mon_visible`: steed wins before U_AP_TYPE. Match order.
3. Eat-mimic gold `M_AP_OBJECT` `GOLD_PIECE`: `$` + coin color, no Hallu burn. Match.
4. Hallu orange: `%` FOOD, still `objnum` not `random_object`. Match.
5. `#monster` hide `STRANGE_OBJECT`: `]`. Match.
6. Fountain furniture `S_fountain=37`: `{` bright blue. Match PCHAR.
7. Altar furniture: gray `_` / DEC `{`. Match AM_NEUTRAL.
8. Closed door cmap 15/16: `+` brown. Match.
9. Slimed `M_AP_MONSTER` green slime: `P`. Gender offset named skip.
10. find_trap / muse callers: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `display_self` is in-process; detect no longer imports `CLR_WHITE` for a hardcoded `@`.

## Verification

Journal: private canary **19**/19 (C ternary+mask; JS arms; gold `$` / orange `%` / strange `]`; fountain `{`; altar `_`; closed door `+`; slime `P`; F_DKNOWN mask; objnum no Hallu burn; steed wins; detect caller; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless the hero is imitating (eat-mimic gold / `#monster` hide / Slimed). Cadence this audit: full `sessions` at HEAD `851d3e08` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. The ternary is the C body; detect/`newsym`/`swallowed` call it; `objnum` is the non-Hallu C macro, not a no-op. Missing drawbridge/trap cmap indices are named skips of unused furniture values on the live eat-mimic / `#monster` / Slimed paths.

Named omits (map, not Must-fix):

1. `find_trap` cls + `map_trap` + `display_self` + wait (`detect.c:1946–1959`)
2. `muse.c` `you_aggravate` `display_self`
3. `monnum_to_glyph` Ugender male/fem glyph offsets (same mlet on tty)
4. cmap 42–45 drawbridge; trap/zap/expl cmap; `display_monster` M_AP_FURNITURE lastseentyp
5. swap-with-pet `seemimic`

Do not Must-fix “JS `mon_glyph(steed)` vs `ridden_mon_to_glyph`.” Do not Must-fix “cmap GRAY→`NO_COLOR` on ndoor/corr” (existing tty map). Do not pull doname EGG this SHA.

## Callers / RNG ledger

C: `newsym` / `swallowed` / `monster_detect` (this SHA) plus find_trap / muse (named). JS those three. No new `rn2`/`rnd` in the U_AP_TYPE arms. Public fortress is not evidence a mimic-hero painted `$`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: imitating furniture/object/monster now paints via live `display_self`; find_trap/muse/gender/seemimic stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1275 `18bec04d`.
