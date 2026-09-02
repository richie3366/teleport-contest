# Review 706 — 20426583 — display.c newsym !cansee display_monster DETECTED (D-1745)

## Metadata
- Full / short hash: `204265833c85dc1b3245cef4fe8acfd58b9a138e` / `20426583`
- Parent: `a2be8560` (D-1744). This file audits **this SHA only** (sixth of nine `js/` commits since review **700**). Archive **Addressed:** D-1745 `20426583`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:49:14 +0200
- D-id: **D-1745**
- Stats: `js/display.js` +23/−21. Total `js/` insertions **23** <250. Band **150–350**.
- Claims to close: Open `newsym` !cansee `display_monster` after D-1737 / review **698** (cansee DETECTED live; dark arm still `mon_glyph`+`show_glyph_cell`). Not pet/detected glyphs. Not `show_mon_or_warn`. `reviews/loop-2026-08-15/` has no unpaid newsym Must-fix.
- JS / map: `display.js` `newsym` !cansee + occupancy. `c-js-map/turns.md`.
- Prior: **698** named `:1046–1054` as omit.

## Intent vs deliverable

Git subject promises: !cansee sensed monsters use `display_monster(see_it ? 0 : DETECTED)` instead of `mon_glyph` `show_glyph_cell` after D-1737.

`node scripts/csym.mjs newsym` → `display.c:916–1099`. `--callers display_monster`: `:1027` cansee; `:1053` !cansee. `display_monster` `display.c:513–622`. `PHYSICALLY_SEEN` 1 / `DETECTED` 2 `:498–499`. `is_worm_tail` `:500`.

```1046:1054:nethack-c/upstream/src/display.c
        } else if ((mon = m_at(x, y)) != 0
                   && ((see_it = (tp_sensemon(mon) || MATCH_WARN_OF_MON(mon)
                                  || (see_with_infrared(mon)
                                      && mon_visible(mon)))) != 0
                       || (Detect_monsters && !is_worm_tail(mon)))) {
            display_monster(x, y, mon, see_it ? 0 : DETECTED,
                            is_worm_tail(mon) ? TRUE : FALSE);
```

Parent: two `show_glyph_cell` arms (see_it then Detect). Occupancy treated every infrared occupant as a monster glyph. The diff **does** collapse to C’s one condition and call live `display_monster` with `see_it ? 0 : DETECTED` (0 is **not** `PHYSICALLY_SEEN`). Occupancy now matches the second `if` (`!mimic || sensed`). It **does not** port pet/detected glyph ids or `show_mon_or_warn` I-unmap. Named. It **does not** reopen D-1737 cansee `PHYSICALLY_SEEN`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `newsym` !cansee arm | LIVE repaired | C `:1046–1054` |
| `display_monster` | LIVE local | C `:513–622`; sightflags 0 skips mimic memory |
| occupancy `cell_shows_displayed_monster` | LIVE repaired | matches `:589` `!mon_mimic \|\| sensed` |
| `tp_sensemon` / `MATCH_WARN` / infrared | LIVE | see_it |
| `Detect_monsters` | LIVE | `!worm_tail` |
| `PHYSICALLY_SEEN` / `DETECTED` | LIVE local consts | 1 / 2 |
| pet/detected glyphs | OMIT named | later D-1748 |
| `show_mon_or_warn` I-glyph | OMIT named | later D-1747 |
| `see_monsters` MON_STILL_ARRIVING | OMIT named | later D-1746 |
| `feel_location` `is_worm_tail` | OMIT named | |

`node scripts/sym.mjs`:

```
newsym           js/display.js   sync
display_monster  NOT EXPORTED — 1 LOCAL  js/display.js
cell_shows_displayed_monster NOT EXPORTED — 1 LOCAL
sensemon / tp_sensemon / see_with_infrared  sync
Detect_monsters  LOCAL display.js (+ potion.js clone — do NOT write #3)
```

No clone→import re-point. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. Do **not** add `display_monster` #2.

## C ↔ JS fidelity

**see_it (`:1047–1049`).** C assignment `tp_sensemon || MATCH_WARN || (see_with_infrared && mon_visible)`. Parent JS had `mon_visible && infrared` (same `&&`, reversed). This SHA matches C operand order. No RNG. **Match.**

**Gate (`:1046–1050`).** `m_at` and (see_it or (`Detect_monsters && !worm_tail`)). JS `mtmp && ((see_it = …) || (!worm_tail && Detect_monsters()))`. Detect-only leaves `see_it` falsy → `DETECTED`. Worm tails never take Detect. **Match.**

**sightflags 0 vs 1 (`:1053`).** Cansee uses `see_it ? PHYSICALLY_SEEN : DETECTED` (`:1028`). Dark uses **`see_it ? 0 : DETECTED`**. First mimic `if` is `sightflags == PHYSICALLY_SEEN` (`:532`). Infrared see_it on a dark square therefore **does not** write mimic memory. Unsensed mimic: second `if (!mon_mimic || sensed)` (`:589`) is false → no live letter. Parent `mon_glyph` showed `o`/`{`. **Match C’s 0.** Detect-only is `DETECTED` (2), still not PHYSICALLY_SEEN, same mimic skip unless sensed.

**Warning arm after.** C `else if (mon_warning(mon) && !is_worm_tail(mon)) display_warning`. JS kept that after the collapsed monster `if`. This SHA does not restub `display_warning`. **Match the order.**

**Occupancy.** C gbuf occupancy follows the glyph `display_monster` actually painted. JS `cell_shows_displayed_monster` now requires the same `see_it || Detect` gate **and** `!mimic || sensed`. Infra unsensed mimic is not a monster cell. **Match that.**

**`show_mon_or_warn`.** C comment: display also clears an I-glyph. That helper is still named (next Open at this SHA). This SHA only switches the painter to `display_monster`. Not a silent stub inside the new call: the callee is LIVE; I-unmap is a named inner omit of that callee (D-1747).

**`feel_location`.** Dark non-monster cells still `feel_location` / remembered glyph. C `is_worm_tail` there is a **different** function, named. Not this arm.

**Callee closure (!cansee monster arm).** LIVE: `display_monster` (body ports C), `tp_sensemon`, `MATCH_WARN_OF_MON`, `see_with_infrared`, `mon_visible`, `Detect_monsters`, `is_worm_tail`. OMIT named: pet/detected ids; `show_mon_or_warn`; MON_STILL_ARRIVING; `feel_location` tail. STUB: **none**. Review **698** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

**JS !cansee painter (`display.js:3794–3802`).** One `if` with C’s assignment-or, then `display_monster(..., see_it ? 0 : DETECTED, worm_tail)`. Early `return`. Warning `if` follows. Occupancy `cell_shows_displayed_monster` dark arm (`:2681–2690`) repeats see_it/Detect then `!mimic || sensed`. **Match that split.** Cansee occupancy (`:2675–2679`) was D-1737 and is unchanged.

**RNG.** None in the !cansee gate. `display_monster` Hallu/`what_mon` rng is the named pet/detected omit at this SHA (later D-1748).

## Hallucinations / overclaim

Subject “`display_monster(see_it ? 0 : DETECTED)` instead of `mon_glyph`”: **true**. D-log infra mimic keeps `.` / Detect `meverseen`: **true** for the 0/DETECTED split. Do **not** stamp “Match C pet_to_glyph / detected_mon_to_glyph.” Do **not** stamp “Match C `show_mon_or_warn` unmap I.” Do **not** stamp “Match C cansee arm” (that is D-1737, still `PHYSICALLY_SEEN`). Journal “fortress held” is not a dark-Detect screen proof. Public dark Detect **thin**; canary was node 12/12. Admit public-unhit.

**Cansee arm not this SHA.** D-1737 still `see_it ? PHYSICALLY_SEEN : DETECTED` (`:1028`). Passing 0 there would skip mimic memory on a lit square. Do **not** “align” cansee to the dark 0.

## Density

§2b: one `newsym` arm + occupancy that must match it. +23. C arm is ~10 lines; the miss was calling the wrong painter. Did not glue pet glyphs / `show_mon_or_warn`. Did **not** reopen D-1737.

## Verification

D-log: save-oracle skip (untagged `display.c:newsym`); node 12/12 (dark Detect `o`+meverseen; unsensed `.`; infra mimic `.`; Detect mimic `o` not `{`; infra goblin `o`; cansee Detect minvis; Detect worm_tail memory); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (incl. seed0383 hallu). Rule #2 clean. Dark Detect **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the !cansee painter matches C; I-glyph/pet ids are named). Named: pet/detected glyphs (`:587–618`); `show_mon_or_warn` (`:481–496`); `see_monsters` MON_STILL_ARRIVING; `feel_location` `is_worm_tail`. Do **not** pass `PHYSICALLY_SEEN` on the dark arm. Do **not** restore `mon_glyph`+`show_glyph_cell` here. Do **not** add `display_monster` #2. Do **not** re-port D-1737 / D-1736.

**`is_worm_tail`.** C `:1050` / `:1054` use `is_worm_tail(mon)` (same helper as cansee). JS `is_worm_tail(mtmp, x, y)` already existed. This SHA did not rewrite it. `feel_location` still named.

Verdict: **ACCEPT-WITH-DEBT**
