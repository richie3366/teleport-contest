# Review 183 — c7071a4a — display.c `gbuf_show_kind` stop Hallu reroll (D-1221)

## Metadata
- Full / short hash: `c7071a4a249f9e810b1d3396b984c5ed0a9a8437` / `c7071a4a`
- Parent: `7b24ec10` (review **181–182** + cadence #1550). This file audits **this SHA only**. Archive row **Addressed:** D-1221 `c7071a4a` already has the short hash (filled on D-1222).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 18:02:16 +0200
- D-id: **D-1221**
- Stats: 10 files, +150 / −63 — `js/display.js` +51 / −18.
- Claims to close: review **181** Must-fix — `gbuf_show_kind` must not call `mon_glyph` / `obj_glyph` (Hallu `rn2_on_display_rng`) on every `show_glyph_cell`. Keep `mention_map` → `&a11y.glyph_updates`. seed0383. `reviews/loop-2026-08-15/` has no unpaid Hallu-classifier Must-fix.
- JS / map: `display.js` `gbuf_show_kind` / `cell_shows_displayed_monster`. `c-js-map/turns.md`. Integer glyph IDs / `do_screen_description` / await-`newsym` More when On / `spot_monsters` addr still named.
- Prior reviews this SHA claims to close: **181** QUALITY-RISK item 1.

## Intent vs deliverable

Git subject promises: “Match C display.c show_glyph so gbuf_show_kind classifies the already-chosen glyph, instead of re-rolling Hallu mon_glyph/obj_glyph on every show_glyph_cell.”

C `show_glyph` (`display.c:2011–2028`) inspects the **glyph id already stored** by `newsym`: `glyph_is_monster(glyph)`, `glyph_to_cmap(glyph)`, `glyph_is_nothing` / `unexplored`. Those macros (`display.h:770–773`) are range tests on the id. They do **not** call `what_mon` / `random_obj_to_glyph`.

D-1219 always ran `gbuf_show_kind` inside `show_glyph_cell`, and that helper called `mon_glyph` / `obj_glyph` (Hallu `rn2_on_display_rng`). Cadence #1550: seed0383 FAIL.

The diff **does** drop those two Hallu rollers. It classifies from occupancy + the **already-chosen tty `ch`**. It does **not** introduce integer `GLYPH_*` ids. Named.

The diff does **not**: restore `gbuf_show_kind` to skip when Off (C always has the glyph id; stamping kind without rolling is OK); await every `newsym`; retarget `spot_monsters`; change `mention_map` addr; call `random_trap_to_glyph`. Those stay named or pre-existing.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gbuf_show_kind` | clone of `glyph_is_*` on tty/occupancy | **no longer** calls `mon_glyph`/`obj_glyph` |
| `cell_shows_displayed_monster` | clone of `newsym` display_monster / sensed / Detect | visibility, not appearance RNG |
| mimic `M_AP_OBJECT && !sensemon` | C `display_monster` object glyph | **not** a second `obj_glyph` |
| `'I' && !decgfx` → `'invisible'` | C `glyph_is_invisible` | first, before occupancy |
| `trap_glyph` ch-match | C trap cmap; Hallu deferred | no `rn2_on_display_rng` |
| `terrain_glyph` ch-match | C `back_to_glyph` | no Hallu |
| `objects_at` + `cansee` → `'object'` | occupancy analogue of `glyph_is_object` | no second Hallu roll |
| `show_glyph_cell` | C store; still always stamps kind | announce still Off-gated |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates in this SHA’s `js/` hunks. Rule #2 clean.

## C ↔ JS fidelity

Pinned C classifier (`display.h:770–773` + `display.c:2011–2028`):

```
#define glyph_is_monster(glyph) \
    (glyph_is_normal_monster(glyph) || glyph_is_pet(glyph) \
     || glyph_is_ridden_monster(glyph) || glyph_is_detected_monster(glyph))
#define glyph_is_invisible(glyph) ((glyph) == GLYPH_INVISIBLE)
```

`show_glyph` uses those on `oldglyph` / `glyph` **after** `newsym` already chose the id (one `what_mon` / `random_obj` under Hallu). A second appearance roll is a C-wrong. That was D-1219.

JS after this SHA (`display.js:1445–1474`):

1. `ch === 'I' && !decgfx` → `'invisible'`. C: `GLYPH_INVISIBLE`. Match the tty stand-in.
2. `mtmp && cell_shows_displayed_monster`: `cansee && (mon_visible \|\| tp_sensemon)` else `tp_sensemon \|\| (mon_visible && see_with_infrared)` else Detect_monsters H\|E\|sticky. Those helpers do **not** call `mon_glyph`. Warning-only (not visible, not sense, not detect) returns false — C `glyph_is_monster` is false on warning glyphs. Match that split.
3. Mimic: `M_AP_TYPE === M_AP_OBJECT && !sensemon` → `'object'`. C stored glyph is the fake object, so `glyph_is_monster` is false. Match without `obj_glyph`.
4. Seen uncovered trap, `trap_glyph.ch === ch` → `'trap'`. `trap_glyph` has Hallu deferred (fixed cmap). No extra RNG.
5. Floor object, `!covers_objects && cansee` → `'object'` **without** matching `ch` to a second `obj_glyph`. C `glyph_is_object` is true when `newsym` already painted the object. Occupancy analogue; no Hallu.
6. `terrain_glyph.ch === ch` → `'terrain'`. `terrain_glyph` is cmap, not Hallu.
7. Uncovered object after terrain miss → `'object'` (remembered/unseen pile). Named vs integer ids, not a second Hallu roll.
8. Empty space / NO_COLOR → `'unexplored'`.

`show_glyph_change_wanted` still early-outs when `!glyph_updates` **before** kind. `show_glyph_cell` still always stamps `disp_kind` so a later On sees old kind. C always has the glyph id in gbuf. Stamping without rolling is the JS analogue.

`cell_shows_displayed_monster` is a **clone** of `newsym`’s “would this cell be a monster glyph?” not a C callee named `cell_shows_*`. Visibility checks (`cansee` / `mon_visible` / `tp_sensemon` / `see_with_infrared`) do not burn `rn2_on_display_rng`. That is the Must-fix.

C `newsym` already ran `display_monster` / `map_object` / `map_trap` / `back_to_glyph` and passed the resulting **glyph id** into `show_glyph`. JS `newsym` still calls `mon_glyph`/`obj_glyph` **once** to pick tty `ch` (that is C `what_mon`). This SHA only stops a **second** roll at store time.

When `glyph_updates` is On, `show_glyph_change_wanted` calls `gbuf_show_kind` for the furniture/wall/room tests, then `show_glyph_cell` calls it again to stamp `disp_kind`. Two occupancy walks, still zero Hallu RNG. C reads the id twice (`oldglyph` vs `glyph`) with no extra `rn2`. Acceptable clone cost.

`trap_glyph` (`display.js:601–637`) is a fixed cmap (`^` / WEB `"` / VS `~`) with “Hallucination / random_trap_to_glyph deferred.” Comparing `tg.ch === ch` does not roll. `terrain_glyph` is a `typ` switch (ROOM `.`, FOUNTAIN `{`, …) with no `rn2_on_display_rng`. Those callees were already in the D-1219 helper; this SHA did not add Hallu to them.

Caller: every `show_glyph_cell` (memory loop, `newsym`, `map_*`). Public default Off means announce is skipped; the leak was the always-on classifier. D-1219 `in_docrt` still correctly suppresses announce during `docrt`; it never suppressed the old Hallu roll — now there is none to suppress.

Occupancy can still disagree with C `glyph_is_*` on a cell whose tty `ch` is terrain while an object exists under a cover JS missed, or a mimic furniture stand-in (M_AP_FURNITURE still named). Default `glyph_updates` Off: announce never reads kind. Public path only needed “no extra Hallu RNG.” seed0383 is that path.

C `show_glyph` after the predicate (`display.c:2059–2070`) forces `accessiblemsg`, `do_screen_description`, `pline_xy("%s.", firstmatch)`, restore. JS `emit_show_glyph_change` is unchanged this SHA (`auto_describe_text` clone, named). The Hallu leak was **before** that then-arm, on the store path, including Off. Fixing the classifier does not require touching the then-arm.

`show_glyph_cell` remains async only when announce fires. Default Off: no yield. Match D-1219 store-sync except the extra RNG that this SHA removes.

## Hallucinations / overclaim

Subject + D-1221 say classify the already-chosen glyph instead of re-rolling Hallu. **Deleting `mon_glyph`/`obj_glyph` from `gbuf_show_kind` is the hunk.** Stamping **Addressed:** D-1221 is fair. This is **not** “Match C integer `GLYPH_MONSTER` ids.” The classifier is still a tty/occupancy clone. Do **not** stamp “Match C `do_screen_description`” or “Match C awaited `newsym` More.”

Journal on this SHA: seed0383 PASS after the Hallu leak. Cadence #1550 at the parent was 43/44. Claiming “fortress unchanged” on **this** SHA would have been wrong; they claimed seed0383 PASS. This audit’s full `sessions` at HEAD confirms 44/44 including seed0383.

## Density

One helper family: stop the Hallu reroll inside the D-1219 classifier. ~50 lines in `display.js`. §2b right size for a Must-fix peel. Did not glue Soundeffect or integer glyphs.

## Branch-by-branch confirm

1. `glyph_updates` Off + Hallu + `fmon` on cell: **no** `rn2_on_display_rng` from this helper. C: zero extra. **seed0383.**
2. Off + Hallu + floor object: **no** `obj_glyph`. Match C extra-RNG = 0.
3. Off + empty ROOM: no mtmp/obj → terrain/unexplored. Match.
4. Off + warning-only monster: `cell_shows` false → not `'monster'`. Match `!glyph_is_monster(warning)`.
5. Invisible `I`: `'invisible'` first. Match `glyph_is_invisible`.
6. Mimic object, unsensed: `'object'`. Match stored object glyph.
7. On + unexplored→fountain: announce still uses kind; no Hallu in kind. Predicate unchanged from D-1219.
8. `in_docrt`: announce skipped; classifier runs **without** Hallu. C `in_docrt` skips announce only. Match extra-RNG.
9. `mention_map` addr still `&a11y.glyph_updates`. Match **181** keep.
10. `mon_glyph` / `obj_glyph` still exist for **newsym** painting. This SHA does not delete them from the appearance path. Match C (appearance rolls once in `newsym`).
11. Mimic furniture (`M_AP_FURNITURE`): JS occupancy may still say `'monster'` if `cell_shows` is true. C stored cmap furniture, `glyph_is_monster` false. Named (D-1219 furniture stand-in). Default Off: unused.
12. `covers_objects` lava/pool: object occupancy skipped. C `covers_objects` same. Match.
13. Detect_monsters + hidden `mundetected`: `mon_visible` false; Detect arm of `cell_shows` still true → `'monster'`. C Detect paints a detected-monster glyph. Match `glyph_is_detected_monster` ⊂ `glyph_is_monster`.
14. seed0399 Hallu actions: same classifier; cadence PASS. Not a FORCE.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No `if (getRngLog().length === …)`. Contest Rule #2 clean.

## Verification

Journal: private canary **15**/15 (Hallu mon/obj `show_glyph_cell` RNG delta 0 vs D-1219; Off; `in_docrt`; mimic object; `I`; Detect; warning-only); green+strict seed8000/0900; cohort **8**/8 + strict including **seed0383** / 0399. This audit full `sessions` at HEAD `89588300`: **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838 (100%), speed `34+0.31/turn` (R² 0.878). seed0383 **16915**/16915. Public Hallu **hit** and PASS.

## Actionable C-wrongs

None for Must-fix. The review **181** Hallu reroll is gone.

Named omits (map, not Must-fix):

1. Integer `GLYPH_NOTHING` / `GLYPH_UNEXPLORED` / `cmap_to_glyph` ids
2. Full `do_screen_description` vs `auto_describe_text`
3. Await `newsym`/`show_glyph_cell` so On-path `--More--` is synchronous
4. `spot_monsters` → `a11y.mon_notices`; `mon_movement`
5. `docrt` underwater/buried; M_AP_FURNITURE mimic
6. Occupancy `'object'` without integer `glyph_is_object` when mention_map On

Do not Must-fix “always await `show_glyph_cell`.” Do not restore `mon_glyph` inside `gbuf_show_kind`. Do not FORCE seed0383.

## Callers / RNG ledger

`show_glyph_cell` is the JS stand-in for `display.c show_glyph`. Callers: `newsym`, memory/`docrt` loops, `map_trap`/`map_object` show paths, swallow/`show_memory_glyph`. None of those gained a new `rn2`/`rnd`/`rn1`/`d` in this SHA. The removed calls were `rn2_on_display_rng(NUMMONS)` and `rn2_on_display_rng(NUM_OBJECTS-…)` under Hallu. Cadence seed0383 matched 16915/16915 after the deletion; #1550 at the parent was 11392/16915. That delta is the proof the extra rolls were real.

`in_getlev` / `stopprint` / `suppress_map_output` gates in `show_glyph_change_wanted` are unchanged from D-1219. This SHA does not reopen mention_map addr.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `gbuf_show_kind` no longer re-rolls Hallu `mon_glyph`/`obj_glyph` on every `show_glyph_cell`; occupancy+tty classification is still not integer `glyph_is_*`, which stays named, and seed0383 is PASS.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1221 `c7071a4a`.
