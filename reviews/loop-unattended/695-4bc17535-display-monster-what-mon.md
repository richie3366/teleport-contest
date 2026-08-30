# Review 695 — 4bc17535 — display.c display_monster M_AP_MONSTER what_mon (D-1734)

## Metadata
- Full / short hash: `4bc1753548c2b734768ca9b80e138c2ad890dc94` / `4bc17535`
- Parent: `9f6de017` (D-1733). This file audits **this SHA only** (ninth of nine `js/` commits since review **686**). Archive **Addressed:** D-1734 — this review commit fills `%h` `4bc17535`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 11:38:07 +0200
- D-id: **D-1734**
- Stats: `js/display.js` +50/−16. Total `js/` insertions **50** <250. Band **150–350**.
- Claims to close: Open `display_monster` M_AP_MONSTER `what_mon` after D-1726 / review **687** (furniture LIVE; this case still painted live `mon_glyph`). Not M_AP_FURNITURE lastseentyp. Not Protection sensed. `reviews/loop-2026-08-15/` has no unpaid `what_mon` Must-fix.
- JS / map: `display.js` `display_monster` / `what_mon` / `mon_glyph` / `worm_tail_glyph`. `c-js-map/turns.md`.
- Prior: **687** named this case “dispatch ported, callee stubbed” as a **named omit** (not Must-fix).

## Intent vs deliverable

Git subject promises: PHYSICALLY_SEEN mimics paint `what_mon(mappearance)` then `monnum_to_glyph`, instead of the live species after D-1726.

`node scripts/csym.mjs display_monster` → `display.c:513–622`. `--callers`: `:904` feel; `:1027` newsym cansee (`see_it ? PHYSICALLY_SEEN : DETECTED`); `:1053` !cansee. `what_mon` is a header macro (`display.h:197`), not a `.c` function — cite the define. `random_monster` `:186`. `Hallucination` `youprop.h:120`. `monnum_to_glyph` `:639–641`.

```578:584:nethack-c/upstream/src/display.c
        case M_AP_MONSTER: {
            int mndx = what_mon((int) mon->mappearance, rn2_on_display_rng);
            show_glyph(x, y, monnum_to_glyph(mndx, mgendercode));
            break;
        }
```

```186:197:nethack-c/upstream/include/display.h
#define random_monster(rng) ((*rng)(NUMMONS))
#define what_mon(mon, rng) (Hallucination ? random_monster(rng) : mon)
```

Parent: `worm_tail ? worm_tail_glyph() : mon_glyph(mon)` plus `mon_map_attr`; `mon_glyph` Hallu via sticky `u.Hallucination`. The diff **does** export `what_mon`/`random_monster`, paint appearance `mndx` via `monnum_to_display_glyph` without pet attr, and re-point `mon_glyph` / `worm_tail_glyph` to the youprop helper. It **does not** OR `Protection_from_shape_changers` into `sensed`. Named. It **does not** port male/fem glyph offsets. Named. It **does not** port pet/detected/`show_mon_or_warn`. Named. It **does not** re-point `swallow_cell` sticky Hallu (same file leftover).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `what_mon` | LIVE new | youprop `Hallucination()`, not sticky |
| `random_monster` | LIVE local (C macro) | `sym` “LOCAL” = not exported; do **not** add #2 |
| `monnum_to_display_glyph` | CLONE tty | mlet; ignores `mgendercode` |
| `display_monster` M_AP_MONSTER | LIVE repaired | appearance, not live species |
| `mon_glyph` / `worm_tail_glyph` | LIVE re-point | share `what_mon` |
| Protection `sensed` | OMIT named | still `sensemon` only |
| Detect_monsters cansee | OMIT named | |
| pet/detected/`show_mon_or_warn` | OMIT named | |
| `detect_wsegs` Hallu | CLONE in `worm.js` | youprop already; import `what_mon` — do **not** add #2 |
| `swallow_cell` Hallu | leftover sticky | same file; not this arm |

`node scripts/sym.mjs`:

```
what_mon         js/display.js:805   sync
random_monster   NOT EXPORTED — 1 LOCAL  js/display.js:797  (C-home macro)
Hallucination    js/display.js:369   sync  (!! also do_name.js + 8 locals)
mon_glyph        js/display.js:811   sync
```

`--can worm.js display.js what_mon`: ALREADY (`Hallucination` import). No new edge. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`what_mon` (`display.h:197`).** C `Hallucination ? random_monster(rng) : mon`. `Hallucination` is `HHallucination && !Halluc_resistance` (`youprop.h:120`), not sticky `u.Hallucination`. JS `Hallucination()` (`display.js:369`) then `random_monster(rng)` else `(mon | 0)`. `random_monster` is `rng(NUMMONS)` ≡ `(*rng)(NUMMONS)`. Default `rn2_on_display_rng`. **Match.** RNG only on the Hallu arm — one `rn2_on_display_rng(NUMMONS)` call, same as C.

```794:816:js/display.js
function random_monster(rng = rn2_on_display_rng) {
    return rng(NUMMONS);
}
export function what_mon(mon, rng = rn2_on_display_rng) {
    return Hallucination() ? random_monster(rng) : (mon | 0);
}
export function mon_glyph(mtmp) {
    const mnum = what_mon((mtmp.mnum ?? mtmp.data?.mndx) | 0, rn2_on_display_rng);
```

**M_AP_MONSTER (`:578–584`).** C `what_mon((int)mon->mappearance, rn2_on_display_rng)` then `show_glyph(monnum_to_glyph(mndx, mgendercode))`. `mgendercode` is `female ? FEMALE : MALE` (`:525`). No `worm_tail` in this case; glyph is `GLYPH_MON_*_OFF`, not pet. JS `:1001–1008` `what_mon(mon.mappearance|0)` then `monnum_to_display_glyph` then `show_glyph_cell` **without** `mon_map_attr`. Parent wrongly used live `mon_glyph` / worm tail + pet attr (a blob mimicking a kobold showed `b`). **Match the appearance mndx and the dropped pet attr.** Male/fem offsets are OMIT named (tty mlet identical).

```639:641:nethack-c/upstream/include/display.h
#define monnum_to_glyph(mnum,gnd) \
    ((int) (mnum) + (((gnd) == MALE) ? GLYPH_MON_MALE_OFF       \
                                     : GLYPH_MON_FEM_OFF))
```

**`mon_glyph` / `worm_tail_glyph`.** C `mon_to_glyph` is `what_mon(monsndx(mon->data), rng)`. JS `what_mon(mnum ?? data.mndx)`. Worm tail C uses `what_mon(PM_LONG_WORM_TAIL, rn2_on_display_rng)` on the `!mimic \|\| sensed` arm (`:608–610`). Sharing the helper is the C macro, not a second clone. **Match those Hallu rng sites.** Sticky `u.Hallucination` here would be a C-wrong; this SHA removed it. `swallow_cell` still uses sticky Hallu — leftover, not this arm.

**`sensed` still (`:522–523`).** C `Protection_from_shape_changers \|\| sensemon`. JS `sensemon` only (`:960`). With Protection, C paints appearance then overwrites with the real monster (`:588`). JS would leave the fake. **Named omit** (Open row), not a stub inside the M_AP_MONSTER case body. `newsym` `:1027` `see_it ? PHYSICALLY_SEEN : DETECTED` is still the Detect_monsters named omit from **687**.

**Callee closure (this case).** LIVE: `what_mon`, `random_monster`, `Hallucination()`, `rn2_on_display_rng`, `monnum_to_display_glyph` (verified tty CLONE of `monnum_to_glyph` minus gnd), `show_glyph_cell`. OMIT named: Protection in `sensed`; gender offsets; pet/detected; `show_mon_or_warn`; Detect_monsters cansee. STUB in the **M_AP_MONSTER** arm: **none**. Review **687**’s named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “PHYSICALLY_SEEN mimics paint `what_mon(mappearance)` then `monnum_to_glyph`”: **true** on tty mlet. D-log “youprop, not sticky”: **true** for `what_mon`/`mon_glyph`/`worm_tail_glyph`. Do **not** stamp “Match C `Protection_from_shape_changers` sensed.” Do **not** stamp “Match C male/fem `GLYPH_MON_*_OFF`.” Do **not** stamp “Match C `show_mon_or_warn` / pet / detected glyphs.” Do **not** stamp “Match C `newsym` `see_it ? PHYSICALLY_SEEN : DETECTED`.” Do **not** stamp “Match C `swallow_to_glyph` `what_mon`.” Journal “fortress held” is not a mimic-as-kobold screen proof. Public sessions **do not** hit M_AP_MONSTER mimics; helper **public-unhit**; canary was node `k` vs live `b`. Admit that. seed0383 hallu exercises `what_mon` via `mon_glyph`, not this mimic case.

## Density

§2b: one `display_monster` case + the macros C actually calls (`what_mon`/`random_monster`). Re-pointing `mon_glyph`/`worm_tail_glyph` is the same helper, not a second subsystem. +50. Did not glue Protection sensed (next Open). Did **not** reopen D-1726 furniture lastseentyp.

## Verification

D-log: save-oracle skip (untagged `display.c:display_monster`); node appearance `k` vs live blob `b` + Hallu/resist/`Detect_monsters` overwrite; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict (incl. seed0383 hallu). Rule #2 clean. M_AP_MONSTER mimic **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open case matches C; remaining arms were named). Named: Protection_from_shape_changers sensed (`:522–523`); Detect_monsters cansee (`:1016–1029` / `:1053`); male/fem offsets; pet/detected/`show_mon_or_warn` (`:588–619`); `swallow_cell` sticky Hallu (`display.js` ~`:3614` — re-point to `what_mon`, do **not** write #2); `worm.js` `detect_wsegs` inline Hallu (`:477–478` — import the export). Do **not** add `what_mon` #2. Do **not** add `random_monster` #2. Do **not** restore live `mon_glyph` on this case. Do **not** restore `mon_map_attr` on the appearance glyph. Do **not** add `Protection_from_shape_changers` #3 in display.js without the C `sensed` OR. Do **not** re-port D-1726 furniture.

Verdict: **ACCEPT-WITH-DEBT**
