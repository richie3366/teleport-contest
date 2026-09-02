# Review 698 — 5d1f9fb6 — display.c newsym Detect_monsters cansee (D-1737)

## Metadata
- Full / short hash: `5d1f9fb68b6582b7d00057e3c58ace9f62cdf8e7` / `5d1f9fb6`
- Parent: `3afed6b0` (D-1736). This file audits **this SHA only** (third of five `js/` commits since review **695**). Archive **Addressed:** D-1737 `5d1f9fb6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 21:36:40 +0200
- D-id: **D-1737**
- Stats: `js/display.js` +46/−29. Total `js/` insertions **46** <250. Band **150–350**.
- Claims to close: Open `newsym` Detect_monsters cansee after D-1736 / reviews **687** and **697** (Protection LIVE; cansee still `see_it`-only always PHYSICALLY_SEEN). Not !cansee `display_monster`. Not furniture lastseentyp. `reviews/loop-2026-08-15/` has no unpaid Detect_monsters Must-fix.
- JS / map: `display.js` `newsym` / `Detect_monsters` / `cell_shows_displayed_monster` / `sensemon`. `c-js-map/turns.md`.
- Prior: **687** / **695** / **697** named `:1016–1029` as omit.

## Intent vs deliverable

Git subject promises: Detect_monsters on a seen square paints DETECTED (and bear/pit/web `tseen`) when the monster is not physically seen, instead of skipping the cansee arm after D-1736.

`node scripts/csym.mjs newsym` → `display.c:916–1099`. `--callers display_monster` already cited `:1027` / `:1053`. `Detect_monsters` is a header macro (`youprop.h:188–190`). `is_pit` `trap.h:113`. `PHYSICALLY_SEEN`/`DETECTED` `display.c:498–499`. `t_at` is the trap lookup at `(x,y)`.

```1013:1029:nethack-c/upstream/src/display.c
            see_it = mon && (mon_visible(mon)
                             || (!worm_tail && (tp_sensemon(mon)
                                                || MATCH_WARN_OF_MON(mon))));
            if (mon && (see_it || (!worm_tail && Detect_monsters))) {
                if (mon->mtrapped) {
                    struct trap *trap = t_at(x, y);
                    int tt = trap ? trap->ttyp : NO_TRAP;
                    if (tt == BEAR_TRAP || is_pit(tt) || tt == WEB)
                        trap->tseen = 1;
                }
                _map_location(x, y, show);
                display_monster(x, y, mon,
                                see_it ? PHYSICALLY_SEEN : DETECTED,
                                worm_tail);
```

Parent: cansee `if (see_it)` always `PHYSICALLY_SEEN`; no mtrapped `tseen`. The diff **does** take `see_it || (!worm_tail && Detect_monsters())`, set bear/pit/web `tseen`, and pass `see_it ? PHYSICALLY_SEEN : DETECTED`. It **does not** call `display_monster(..., see_it ? 0 : DETECTED)` on the !cansee arm (still `mon_glyph` + `show_glyph_cell`). Named. It **does not** port `detected_mon_to_glyph`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `Detect_monsters` display.js | CLONE of C macro | youprop H\|\|E + sticky/uprops; LOCAL |
| `newsym` cansee Detect arm | LIVE repaired | C `:1016–1029` |
| `cell_shows_displayed_monster` | LIVE re-point | same predicate |
| `sensemon` / `senseself` | LIVE re-point | share the helper |
| `is_pit` / `BEAR_TRAP` / `WEB` / `NO_TRAP` | LIVE import | const.js; `is_pit` ≡ trap.h |
| `t_at_display` | CLONE local | C `t_at`; do **not** add #2 |
| `display_monster` DETECTED | LIVE flag | skips mimic PHYSICALLY_SEEN |
| !cansee `display_monster` | OMIT named | still `mon_glyph` |
| potion.js `Detect_monsters` | leftover local | do **not** add display #3 as export |

`node scripts/sym.mjs`:

```
Detect_monsters  NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/display.js:423  js/potion.js:774
             => Do NOT write clone #3.
is_pit           js/const.js:2502   sync
             !! ALSO 1 LOCAL CLONE(S)  js/mklev.js:315
BEAR_TRAP        js/const.js:2478   sync   export const
t_at_display     NOT EXPORTED — 1 LOCAL  js/display.js:1225
display_monster  NOT EXPORTED — 1 LOCAL  js/display.js:1076
```

`--can display.js const.js is_pit` / `DETECT_MONSTERS`: ALREADY. No new TDZ edge. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Cansee gate (`:1016`).** C `mon && (see_it || (!worm_tail && Detect_monsters))`. JS `mtmp && (see_it || (!worm_tail && Detect_monsters()))`. `see_it` is `mon_visible || (!worm_tail && (tp_sensemon \|\| MATCH_WARN_OF_MON))` — same as C `:1013–1015`. Parent skipped Detect-only invisible monsters on a seen square (terrain `.` instead of `o`). **Match the gate.**

```3637:3658:js/display.js
        if (mtmp && (see_it || (!worm_tail && Detect_monsters()))) {
            if (mtmp.mtrapped) {
                const trap = t_at_display(x, y);
                const tt = trap ? (trap.ttyp | 0) : NO_TRAP;
                if (tt === BEAR_TRAP || is_pit(tt) || tt === WEB) {
                    trap.tseen = 1;
                }
            }
            ...
            display_monster(x, y, mtmp,
                see_it ? PHYSICALLY_SEEN : DETECTED, worm_tail);
```

**Youprop helper (`youprop.h:188–190`).** C `HDetect_monsters || EDetect_monsters`. JS flats + sticky + `uprops[DETECT_MONSTERS]` — same JS model as Protection in **697**. Re-points `sensemon` (C `_sensemon` tests `Detect_monsters` first) and `senseself`. LOCAL; do **not** export #3.

**mtrapped `tseen` (`:1017–1023`).** C `t_at` then `BEAR_TRAP || is_pit || WEB`. JS `t_at_display` + LIVE `is_pit` (PIT\|\|SPIKED_PIT). Null trap → `NO_TRAP`, no deref. **Match.** No `rn2`.

**sightflags (`:1027–1028`).** C `see_it ? PHYSICALLY_SEEN : DETECTED`. JS same. DETECTED skips the mimic PHYSICALLY_SEEN arm (`:532`), so an unseen-but-detected mimic does not paint furniture/object disguise. Then `sensemon` is true (Detect_monsters), so `sensed` is true and the second `if` paints the live monster. **Match the skip-disguise + show-monster outcome.** C then uses `detected_mon_to_glyph` (`:604–609`); JS `mon_glyph`. **Named omit** of detected glyph ids. Tty mlet is the same letter; do **not** stamp “Match C `detected_mon_to_glyph`.”

**`cell_shows_displayed_monster`.** Parent `mon_visible || (!worm_tail && tp_sensemon)` (no MATCH_WARN, no Detect). Now C’s `see_it || (!worm_tail && Detect_monsters)`. Occupancy kind follows the newsym arm. **Match that predicate.**

**!cansee (`:1047–1053`).** C `display_monster(..., see_it ? 0 : DETECTED, is_worm_tail)`. JS still `mon_glyph` + `show_glyph_cell` when `Detect_monsters && !worm_tail`. **Named omit.** This SHA only swapped the inline H\|E test for the helper. Do **not** stamp “Match C !cansee `display_monster`.”

**Callee closure (cansee Detect arm).** LIVE: `Detect_monsters` (verified CLONE of youprop.h), `mon_visible`, `tp_sensemon`, `MATCH_WARN_OF_MON`, `t_at_display` (CLONE of `t_at`), `is_pit`, `display_monster`, `map_location_memory` (`_map_location` show=FALSE analogue). OMIT named: !cansee `display_monster`; pet/detected glyph ids; `show_mon_or_warn`; `map_object` observe; `see_monsters` MON_STILL_ARRIVING. STUB in the **cansee Detect arm**: **none**. Reviews **687**/**697** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “paints DETECTED … when not physically seen”: **true for sightflags** and skip-mimic. **False** if read as `detected_mon_to_glyph`. D-log “bear/pit/web tseen”: **true**. Do **not** stamp “Match C `detected_mon_to_glyph` / pet glyphs.” Do **not** stamp “Match C !cansee `display_monster`.” Do **not** stamp “Match C `map_object`.” Journal “fortress held” is not a Detect-on-invisible screen proof. Public sessions **rarely** hit potion-of-monster-detection on an unseen occupant; canary was node goblin `o` vs ROOM `.`. Admit public-unhit for that branch.

## Density

§2b: one `newsym` cansee arm + the youprop C actually tests + occupancy classifier. +46. Did not glue !cansee `display_monster` / `map_object` / pet glyphs. Did **not** reopen D-1736 Protection.

## Verification

D-log: save-oracle skip (untagged `display.c:newsym`); node goblin `o` vs ROOM `.` on H/E/uprops + bear/pit/web `tseen`; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict (incl. seed0383 hallu). Rule #2 clean. Detect-not-seen **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open cansee arm matches C). Named: !cansee `display_monster` (`:1053`); pet/detected/`show_mon_or_warn` (`:588–619`); `map_object` observe; `see_monsters` MON_STILL_ARRIVING; `feel_location` `is_worm_tail`. Do **not** export display `Detect_monsters` (#3). Do **not** restore `see_it`-only cansee. Do **not** pass PHYSICALLY_SEEN when `!see_it`. Do **not** re-port D-1736 Protection.

Verdict: **ACCEPT-WITH-DEBT**
