# Review 181 — 925e5b77 — display.c `show_glyph` `glyph_updates` / `mention_map` (D-1219)

## Metadata
- Full / short hash: `925e5b7727938b6fd5fc6e347f1d3d597a01de02` / `925e5b77`
- Parent: `b59f294b` (D-1218). This file audits **this SHA only**. Archive row **Addressed:** D-1219 `925e5b77` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 12:27:26 +0200
- D-id: **D-1219**
- Stats: 14 files, +333 / −93 — `js/display.js` +199 / −36; `js/options.js` +20; `js/jsmain.js` +19; `js/hack.js` comment.
- Claims to close: Open queue `display.c` `show_glyph_change` glyph_updates (named). Not opt_accessiblemsg. `reviews/loop-2026-08-15/` has no unpaid mention_map Must-fix.
- JS / map: `display.js` `show_glyph_change_wanted` / `gbuf_show_kind` / `emit_show_glyph_change` / `docrt` `in_docrt`; `options.js` `mention_map` → `a11y.glyph_updates`. `c-js-map/startup.md` + `turns.md`. Integer glyph IDs / `in_getlev` / await-`newsym` More when On / `spot_monsters` addr still named.
- Prior reviews this SHA claims to close: **178** named `glyph_updates`; D-1217 then-arm waiting on this addr.

## Intent vs deliverable

Git subject promises: “Match C display.c show_glyph glyph_updates so mention_map announces interesting map changes via pline_xy, instead of leaving show_glyph_change named and writing mention_map to flags.”

C `show_glyph` (`display.c:2011–2070`) sets local `show_glyph_change` from `a11y.glyph_updates` and the **already-chosen integer glyph**, then stores gbuf, then `do_screen_description` + `pline_xy`. `optlist.h:427–428` `mention_map` addr `&a11y.glyph_updates` Off. `docrt_flags` (`:1717–1720` / `:1772`) `in_docrt` skips nested redraw and gates the announce.

The diff **does** retarget `DOSET_BOOL_ADDR.mention_map` to `{ obj: 'a11y', key: 'glyph_updates' }`, parse rc, wrap `docrt` with `in_docrt`, and add an announce analogue. It also **always** runs `gbuf_show_kind` inside `show_glyph_cell` to stamp `disp_kind`, including when `glyph_updates` is Off.

That classifier calls `mon_glyph` / `obj_glyph`. Those helpers burn `rn2_on_display_rng` under Hallucination. C `glyph_is_monster(glyph)` / `glyph_to_cmap(glyph)` do **not**.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `DOSET_BOOL_ADDR.mention_map` | C addr, **fixed** | `&a11y.glyph_updates`; default Off |
| `parse_a11y_glyph_updates` | rc bag, **new** | colon words reuse D-1218 parser |
| `show_glyph_change_wanted` | C predicate `:2011–2028`, **clone** | tty/typ kinds, not integer glyphs |
| `gbuf_show_kind` | **clone** of `glyph_is_*` | **C-wrong:** re-rolls Hallu appearance |
| `emit_show_glyph_change` | C then-arm `:2059–2070`, **clone** | `auto_describe_text` not `do_screen_description` |
| `show_glyph_cell` | C `show_glyph` store, **now async** | yields only when announce fires |
| `docrt` `in_docrt` | C `docrt_flags`, **wired** | try/finally; swallow still clears |
| `clear_glyph_buffer` `disp_kind` | JS field, **new** | `'unexplored'` |

Grep of this SHA’s `js/` hunks: no `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2: dynamic `import('./getpos.js')` is ESM, not filesystem.

## C ↔ JS fidelity

Pinned C predicate (`display.c:2011–2028`):

```
if (a11y.glyph_updates && !a11y.mon_notices_blocked
    && !program_state.in_docrt && !program_state.gameover
    && !program_state.in_getlev && !program_state.stopprint
    && !_suppress_map_output()
    && (oldglyph != glyph || gg.gbuf[y][x].gnew)) {
    int c = glyph_to_cmap(glyph);
    if ((glyph_is_nothing(oldglyph) || glyph_is_unexplored(oldglyph)
         || is_cmap_furniture(c))
        && !is_cmap_wall(c) && !is_cmap_room(c)) {
        if ((a11y.mon_notices && glyph_is_monster(glyph))
            || glyph_is_monster(oldglyph)
            || u_at(x, y))
            ; /* nothing */
        else
            show_glyph_change = TRUE;
    }
}
```

`glyph_to_cmap` / `glyph_is_monster` / `glyph_is_unexplored` inspect the **glyph id already computed** by `newsym` / memory. `what_mon` / `random_obj_to_glyph` already ran **once** when that id was chosen. `show_glyph` does not call them again.

JS `show_glyph_change_wanted` (`display.js:1481–1508`) matches the **boolean gates** (`glyph_updates`, `mon_notices_blocked`, `in_docrt`/`gameover`/`in_getlev`/`stopprint`, `suppress_map_output`, ch/color/decgfx/attr change or `gnew`, furniture-or-old-unexplored, not wall/room, skip mon_notices+monster / old monster / `u_at`). `IS_FURNITURE(typ)` (`STAIRS`..`ALTAR`) is the same membership as `is_cmap_furniture` (`S_upstair`..`S_fountain`) for stairs/ladder/fountain/throne/sink/grave/altar. `new_cmap_is_room` is `typ===ROOM` not `IS_ROOM` (furniture is not “room”). Wall includes STONE/SCORR/`IS_WALL`. That analogue is acceptable **if** it does not burn extra RNG.

### The C-wrong: `gbuf_show_kind` always rolls Hallu

`show_glyph_cell` (`:1540–1557`) **always**:

```
const announce = show_glyph_change_wanted(...); // early-out if Off — OK
const kind = gbuf_show_kind(x, y, ch, color, decgfx, loc); // ALWAYS
loc.disp_kind = kind;
if (announce) await emit_show_glyph_change(x, y);
```

`gbuf_show_kind` (`:1426–1451`):

```
if (mtmp) {
    const mg = mon_glyph(mtmp);          // Hallu → rn2_on_display_rng(NUMMONS)
    ...
}
...
if (obj && !covers_objects(x, y)) {
    const og = obj_glyph(obj);           // Hallu → rn2_on_display_rng(NUM_OBJECTS-…)
```

`mon_glyph` (`:517–519`) and `obj_glyph` (`:825–850`) are the live Hallu appearance rollers. Calling them to **classify a tty cell that was already drawn** is a second `what_mon` / `random_obj_to_glyph` that C `show_glyph` does not make.

This runs when `glyph_updates` is **Off** (public default). Every `newsym`/`docrt`/`show_memory_glyph` through a cell that still has an `fmon` or floor object extra-burns display RNG. `docrt` `in_docrt` only skips **announce**, not `gbuf_show_kind`.

Cadence `#1550` full `sessions` at `b09b013d` (this SHA is in HEAD): **seed0383-wizard-hallucinate FAIL** RNG **11392**/16915, Scr **167**/219. Prior cadence `#1545` was **44**/44. D-1217 gather does not call `mon_glyph`. D-1218 is options. D-1220 is `revive_corpse`. This SHA is the Hallu classifier.

`IS_FURNITURE` vs `is_cmap_furniture` is **not** the 0383 desync. Extra `rn2_on_display_rng` is.

### Then-arm / `docrt`

C then-arm (`:2059–2070`): force `accessiblemsg`, `do_screen_description`, `pline_xy("%s.", firstmatch)`, restore. JS `emit_show_glyph_change` same force + `auto_describe_text` + `pline_xy`. firstmatch clone already named in D-1217. When On and callers **await**, order matches. Most `show_glyph_cell` sites do **not** await (named omit: await-`newsym` More when On). Default Off: no yield, store stays sync **except** the extra RNG above.

C `docrt_flags`: `if (!u.ux || program_state.in_docrt) return;` then `in_docrt = TRUE`; swallow/`Underwater`/`uburied` goto `post_map`; vision/cls/memory `show_glyph`/`vision_recalc(0)`/`see_monsters`; `in_docrt = FALSE` (`:1772`). JS: early nested return; try/finally clear; swallow `cls`+`swallowed(1)` then return inside try (finally still clears). Underwater/buried still named. Memory loop still `show_memory_glyph` — **and now `gbuf_show_kind`**. `in_docrt` correctly suppresses announce during redraw; it does not suppress the Hallu leak.

Addr: `mention_map` → `a11y.glyph_updates` matches `optlist.h:427–428`. No `optfn_boolean` special arm (unlike accessiblemsg). JS doset does not zero loc on mention_map. Match. Default Off. Match.

## Hallucinations / overclaim

Subject + D-1219 say `show_glyph` announces interesting map changes like C `show_glyph_change`. The **addr**, **gates**, **`in_docrt`**, and **then-arm writer** are the claimed hunk and are real. Stamping **Addressed:** D-1219 as “mention_map no longer writes `flags`” is fair for the option. Stamping “Match C `show_glyph` classifier” is **not**: the callee of the kind test is `mon_glyph`/`obj_glyph`, not `glyph_is_monster(oldglyph)`. That is exactly “Match C dispatch, classifier is a Hallu-rolling clone.” Do **not** stamp “Match C integer glyphs” or “Match C `do_screen_description`” or “Match C awaited newsym More.”

Journal “fortress unchanged (cadence #1545 44/44)” on this SHA is **overclaim**. This SHA’s own cohort omitted seed0383. The next port must treat the Hallu reroll as a C-wrong, not as a named integer-glyph omit.

## Density

Option addr + `show_glyph` announce analogue + `docrt` `in_docrt`. §2b one cluster. Too big only in the sense that the classifier helper invented a second Hallu path. Splitting “addr” from “announce” would not have saved seed0383: the leak is the always-on `gbuf_show_kind`.

## Branch-by-branch confirm

1. `glyph_updates` Off: `show_glyph_change_wanted` returns false before kind. **Announce** skipped. Match C. **`gbuf_show_kind` still runs.** C-wrong.
2. Off + monster on cell: extra `rn2_on_display_rng(NUMMONS)`. C: zero extra. **seed0383.**
3. Off + floor object: extra `obj_glyph` Hallu. C: zero extra.
4. Off + empty room cell: no `mtmp`/obj → no extra Hallu. Match C RNG on that cell.
5. On + unexplored→fountain, not `u_at`: announce. Match predicate.
6. On + unexplored→ROOM: `new_cmap_is_room` skip. Match `is_cmap_room`.
7. On + unexplored→STONE: wall skip. Match.
8. On + `u_at`: skip. Match.
9. On + `mon_notices` + new monster: skip. Match.
10. `in_docrt`: announce false. Match. Classifier still runs. C-wrong.
11. Nested `docrt`: early return. Match `:1717–1718`.
12. rc `OPTIONS=mention_map` → `a11y.glyph_updates` true. Match addr.
13. Default omit: Off; public unprefixed **until Hallu RNG desyncs screens.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. The Hallu leak is **not** a seed-shaped `if`; it is a clone that contradicts C `glyph_is_*`. Contest Rule #2 clean.

## Verification

Journal: private canary **26**/26 (OPTIONS=; unexplored→fountain; room/stone silent; `u_at`; Off; `in_docrt`; …); green+strict seed8000/0900; cohort **11**/11 **without seed0383**. **Public Hallu session unhit in the port iter, then FAIL at cadence.** This audit `__RESULTS_JSON__` at HEAD `b09b013d`: **43**/44, Scr **11353**/11405, RNG **787315**/792838 (99.30%), speed `35+0.29/turn` (R² 0.849). **Notable FAIL:** seed0383-wizard-hallucinate (RNG 11392/16915, Scr 167/219). Green Tourist sessions do not Hallucinate.

## Actionable C-wrongs

Must-fix (one port iter):

1. `display.c` `show_glyph` / JS `gbuf_show_kind`: do **not** call `mon_glyph` or `obj_glyph` (Hallu `rn2_on_display_rng`) on every `show_glyph_cell`. Classify from the already-chosen tty/`ch` (or skip classification entirely when `!a11y.glyph_updates`). C uses `glyph_is_monster` / `glyph_to_cmap` on the glyph id `newsym` already stored. Keep `mention_map` → `&a11y.glyph_updates`. Do not revert `in_docrt`. seed0383.

Named omits (map, not Must-fix):

2. Integer `GLYPH_NOTHING` vs `GLYPH_UNEXPLORED` ids
3. Full `do_screen_description` vs `auto_describe_text`
4. Await `newsym`/`show_glyph_cell` so On-path `--More--` is synchronous like C
5. `spot_monsters` → `a11y.mon_notices`; `mon_movement`
6. `docrt` underwater/buried; `use_background_glyph`

Do not Must-fix “always await `show_glyph_cell`” as the first item — that would steal the Hallu RNG fix. Do not “fix” seed0383 with FORCE/ALIGN.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: `mention_map` now writes `a11y.glyph_updates` and the announce gates match C, but `gbuf_show_kind` re-rolls Hallu `mon_glyph`/`obj_glyph` on every `show_glyph_cell` (including Off/`in_docrt`), which C `show_glyph` never does — cadence seed0383 FAIL.
- Must-fix prepends item 1. Next port ships that, not Soundeffect.

**Addressed:** D-1221
