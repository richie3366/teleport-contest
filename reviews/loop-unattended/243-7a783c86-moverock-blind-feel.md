# Review 243 — 7a783c86 — hack.c moverock_core Blind unseen feel (D-1281)

## Metadata
- Full / short hash: `7a783c866ff4f27285c6ef575a920097f0383742` / `7a783c86`
- Parent: `5f8a620a` (D-1280). This file audits **this SHA only**. Archive row **Addressed:** D-1281 `7a783c86` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 14:27:00 +0200
- D-id: **D-1281**
- Stats: 10 files, +240 / −153 — `js/hack.js` +41 / −7 (journal rotate inflates docs).
- Claims to close: Open `hack.c` Blind unseen boulder feel (named from D-1262 / review **224**). Not next_boulder. `reviews/loop-2026-08-15/` has no unpaid moverock-feel Must-fix.
- JS / map: `hack.js` `moverock_core` / `glyph_to_obj_is_boulder`; live `display.js` `map_object`; live `nomul`; `c-js-map/turns.md`. next_boulder / dopush·`cannot_push_msg` / Levitation Blind `feel_location` named.
- Prior reviews this SHA claims to close: **224** named omit start-of-loop `"That feels like a boulder."` before nopick.

## Intent vs deliverable

Git subject promises: “Match C hack.c moverock_core so a Blind hero walking onto an unmapped boulder feels it and aborts before nopick or a push, instead of stepping over or vain-pushing.”

C `moverock_core` (`hack.c:356–363`) at the **start** of the `sobj_at(BOULDER)` loop, before `next_boulder` / top-of-pile `movobj` / nopick:

```
        if (Blind && glyph_to_obj(glyph_at(sx, sy)) != BOULDER) {
            pline("That feels like a boulder.");
            map_object(otmp, TRUE);
            nomul(0);
            return -1;
        }
```

`Blind` is `youprop.h:103` `(HBlinded||EBlinded)&&!BBlinded`. `glyph_at` is gbuf, not live floor (`display.c`). `glyph_to_obj` (`display.h:902–913`) yields `BOULDER` only for object-boulder glyphs; cmap/monster/`I` → `NUM_OBJECTS`. Callers: `test_move` `:1229` / `domove_core` `:2843–2848` (`door_opened` stays false on abort).

Old JS: named omit after D-1262; Blind giants hit nopick “over” before any feel.

The diff **does** Blind + `!glyph_to_obj_is_boulder` → pline + live `map_object` + `nomul(0)` + `return -1` before top-of-pile. It does **not** port `next_boulder` naming, dopush dest+src Blind `feel_location`, `cannot_push_msg` Blind feel, or Levitation Blind feel. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| start-of-loop feel | C `:358–363`, **wired** | before next_boulder / nopick |
| `Blind_im` | C `Blind`, **imported live** | hack.js youprop analog (incl. PermaBlind) |
| `map_object` | C `display.c`, **imported live** | stamps `remembered_glyph.boulder` |
| `nomul` | C `hack.c`, **imported live** | sync; `await` is harmless |
| `glyph_to_obj_is_boulder` | C `glyph_to_obj(glyph_at)`, **clone** | no integer glyph IDs; gbuf analog is `remembered_glyph` |
| nopick over/against | C `:386–413`, **pre-existing** | D-1262; now after feel |
| `next_boulder` | C `:365–372`, **named omit** | |
| dopush / Levitation Blind `feel_location` | C later, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

C compares **displayed** glyph, not `sobj_at`. The while loop already knows a boulder is on the floor; using live `sobj_at` for the predicate would make the feel unreachable. JS `glyph_to_obj_is_boulder` reads `remembered_glyph.boulder` and treats remembered `I` as not-boulder. That is the JS gbuf stand-in: `map_location`→`map_object` stamps `boulder:true` when a sighted hero saw the object; unseen / terrain memory / `I` do not.

Walk:

1. Blind, never mapped: `rg.boulder` false → feel, `map_object(otmp,true)` stamps boulder, abort −1. Match C `glyph_to_obj!=BOULDER`.
2. Blind, already mapped boulder: skip feel, fall into nopick/push. Match C gbuf boulder glyph.
3. Blind, remembered `I`: feel. Match C non-object glyph.
4. Sighted: `Blind_im` false, no feel. Match.
5. Blind giant `m<dir>`: feel **before** D-1262 over. That is the bug D-1262 left: nopick ran first. Match C order.

`map_object` is live, not a glyph no-op. `nomul(0)` is live. This is **not** “Match C dispatch, callee is a stub.” The clone is the predicate only; a darkroom overwrite that copies `ch` without `boulder:true` could false-feel a known boulder — that is a pre-existing memory-shape analog, not this SHA inventing `sobj_at` as the test.

## Hallucinations / overclaim

Subject + D-1281 say Blind + unmapped boulder feels and aborts before nopick/push. **The start-of-loop `if` is the hunk.** Stamping **Addressed:** D-1281 is fair. Do **not** stamp “Match C integer `glyph_to_obj`.” Do **not** stamp “Match C `next_boulder`.” Do **not** stamp “Match C dopush/Levitation Blind `feel_location`.” Do not stamp “Match C `moverock_done`.”

## Density

One C `if` at the named start-of-loop site. ~14 new JS lines plus a 12-line predicate. Same one-caller envelope as D-1262. Did not glue returning_missile.

## Branch-by-branch confirm

1. Blind unseen: pline + map + nomul + −1. Match `:358–363`.
2. Blind known boulder: skip; nopick giant still over (D-1262). Match skip + later arm.
3. Sighted walk-into: no feel; push/nopick unchanged. Match.
4. Remembered `I`: feel. Match non-BOULDER glyph.
5. Second bump after map: `rg.boulder` true, skip. Match C after `map_object`.
6. Human `m<dir>` unseen: feel, not “in your way.” Match order before nopick else.
7. Loaded pack unseen: feel, not squeeze. Match.
8. `next_boulder` still unset. Named skip.
9. Levitation Blind still no `feel_location` in that later arm. Named skip.
10. Public sighted Tourist. Public-unhit unless Blind walks onto an unmapped boulder.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No hardcoded coordinates. Plain ESM. Did not use live `sobj_at` as the glyph test (that would be the C-wrong this SHA exists to avoid).

## Verification

Journal: private canary **17**/17 (C order; JS live; unseen feel+map+abort; known skip; sighted no feel; Blind giant m-dir feels not over; known giant still over; remembered I feels; human m-dir feels not squeeze; loaded feels not in-way; D-1262 squeeze intact; nomul; second bump skips; Rule #2); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless Blind walks onto an unmapped boulder. Cadence this audit: full `sessions` at HEAD `7d61ee8b` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Predicate is gbuf-analog not floor-object; callees `map_object`/`nomul` are live; order is before nopick. A memory flag instead of integer glyph IDs is the named JS display model, not a feel that never aborts.

Named omits (map, not Must-fix):

1. `otmp->next_boulder` naming
2. dopush dest+src Blind `feel_location`; `cannot_push_msg` Blind feel
3. Levitation / airlevel Blind `feel_location` after nopick
4. verysmall vain-push after nopick

Do not Must-fix “JS uses `remembered_glyph.boulder`.” Do not Must-fix “`await nomul` on a sync function.” Do not pull returning_missile this SHA.

## Callers / RNG ledger

C: `test_move` / `domove_core`. JS: same `moverock_core`. No RNG. Public fortress is not evidence a Blind hero felt an unmapped boulder.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: Blind unseen boulder now feels, maps, and aborts before nopick; next_boulder and later Blind `feel_location` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1281 `7a783c86`.
