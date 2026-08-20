# Review 224 — 72757d4c — hack.c moverock_core nopick m-dir (D-1262)

## Metadata
- Full / short hash: `72757d4c2d7e007635c118aa124d8d2675f683a9` / `72757d4c`
- Parent: `8e2808ad` (D-1261). This file audits **this SHA only**. Archive row **Addressed:** D-1262 lacked the short hash; this review commit fills `72757d4c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 09:55:22 +0200
- D-id: **D-1262**
- Stats: 12 files, +278 / −156 — `js/hack.js` +65 / −11; `js/cmd.js` +12 / −4; comment `js/trap.js`. Journal rotate in the same SHA.
- Claims to close: Open `hack.c` nopick `m<dir>` over/against (named from D-1253 / reviews **201**/**215**). Not giant pickup. `reviews/loop-2026-08-15/` has no unpaid nopick Must-fix.
- JS / map: `hack.js` `moverock_core`; `cmd.js` boulder arm; `c-js-map/turns.md`. Blind unseen start-of-loop / next_boulder / verysmall vain still named.
- Prior reviews this SHA claims to close: **201** named omit nopick m-dir after squeeze; **215** named it again after giant pickup.

## Intent vs deliverable

Git subject promises: “Match C hack.c moverock_core so m-prefix into a boulder steps over or squeezes against it, instead of aborting on levitation leverage or a vain push.”

C `moverock_core` (`hack.c:382–413`) after `nomul(0)`, **before** Levitation: if `context.nopick`, snapshot `glyph_at`, `feel_location`, then giant `throws_rocks` → `You("%s over a boulder here.", u_locomotion("step"))` + `sokoban_guilt` + return 0; else `could_move_onto_boulder` → squeeze Flying `"over"` else `"against"` + guilt + return 0; else `"There is a boulder in your way."` and if glyph changed `door_opened = move = TRUE`, return −1. Caller `test_move` (`:1229–1230`) returns FALSE on `moverock()<0`. `domove_core` (`:2843–2848`): if `!test_move` and `!door_opened`, `move=0` + `nomul(0)`; if `door_opened`, keep `move` (turn spent, cell not occupied).

Old JS: named omit; Levitation abort ran first; `moverock` −1 always zeroed `context.move`.

The diff **does** the nopick arm before Levitation, live `feel_location` / `sokoban_guilt` / `could_move_onto_boulder` / `u_locomotion`, and the caller skip of `move=0` when `door_opened`. It does **not** port Blind start-of-loop `"That feels like a boulder."`, `next_boulder` naming, or `moverock_done`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| nopick arm | C `:386–413`, **new** | before Levitation |
| `feel_location` | C `display.c`, **imported live** | |
| `throws_rocks` | C, **imported live** | giant |
| `u_locomotion` | C `:1817–1829`, **local clone** | Lev/Fly words; `locomotion(ptr)` named in helper |
| `could_move_onto_boulder` | C `:145–163`, **imported live** | D-1239 |
| `Flying_st` | C `youprop.h` Flying, **imported live** | squeeze over/against |
| `sokoban_guilt` | C `trap.c`, **imported live** | D-1239 |
| `glyph_at_fp` | C `glyph_at`, **stand-in** | gbuf `disp_*` + `remembered_glyph` |
| `cmd.js` `door_opened` | C `:1001` reset + `:2843–2848`, **wired** | keep move on glyph learn |
| Blind start-of-loop | C `:358–363`, **named omit** | |
| `moverock_done` / `next_boulder` | C `:327–333`, **named omit** | nopick messages do not use `xname` |
| verysmall vain-push | C `:426`, **named omit** | after nopick |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `glyph_at_fp` is not a hardcoded coordinate.

## C ↔ JS fidelity

Pinned C (`hack.c:386–413`):

```
        if (svc.context.nopick) {
            int oldglyph = glyph_at(sx, sy);
            feel_location(sx, sy);
            if (throws_rocks(gy.youmonst.data)) {
                You("%s over a boulder here.", u_locomotion("step"));
                sokoban_guilt();
                res = 0;
            } else if (could_move_onto_boulder(sx, sy)) {
                You("squeeze yourself %s the boulder.",
                    Flying ? "over" : "against");
                sokoban_guilt();
                res = 0;
            } else {
                There("is a boulder in your way.");
                if (glyph_at(sx, sy) != oldglyph)
                    svc.context.door_opened = svc.context.move = TRUE;
                res = -1;
            }
            return res;
        }
```

JS matches that order and the three returns. Giant+Levitation still **over** (nopick before leverage abort) — the claimed fix. Squeeze uses `Flying_st()` (H||E||steed flyer, `!BFlying`), not sticky `u.Flying`. `could_move_onto_boulder` is the D-1239 function (phaze / not riding / giant unless diagonal-squeeze / tiny / light pack). `sokoban_guilt` is live luck. Return 0 falls through in `cmd.js` to occupy the boulder cell. Return −1 does not occupy.

Caller: C `test_move` starts `door_opened = FALSE` (`:1001`) then may call `moverock`. JS boulder arm resets `door_opened` then `moverock`; on `mr < 0`, if `!door_opened` then `move=0` (and `end_running` if run). When `door_opened`, keep `move` and return without occupying. Match `:2843–2848` for this split. C also `nomul(0)` on the abort; JS `moverock_core` already `nomul(0)` at loop start (C same before nopick).

`glyph_at_fp` fingerprints `disp_*` plus remembered ch/color/invisible. `feel_location` is live (`map_object` / `map_location` update `remembered_glyph`). Seen boulder, unchanged memory → no `door_opened` → free abort (`move=0`). Blind learn that maps a boulder into memory → fingerprint change → spend the turn. Integer `glyph_at` does not exist in JS; this is a stand-in aimed at the same inequality, not a no-op compare.

`u_locomotion` clone: C is `Levitation ? float : Flying ? fly : locomotion(data, def)` with capitalize from `def[0]`. JS checks sticky `u.Levitation`/`u.Flying` and returns `defWord` (poly `locomotion()` deferred in the helper). C’s own nopick comment: giant exotic locomotion is out; ring/spell lev and amulet fly still matter. `"step"` is lowercase so C would emit `"float"`/`"fly"`/`"step"`. For the claimed giant envelope the words match if sticky Lev/Fly track the macros (pre-existing D-1070 debt on this helper, not a new truncated silver-style clone).

This is **not** “Match C dispatch, callee is a stub”: occupy vs abort goes through live `sokoban_guilt` and `could_move_onto_boulder`.

## Hallucinations / overclaim

Subject + D-1262 say `m<dir>` steps over or squeezes instead of levitation abort or vain push. **Nopick before Levitation + return 0 occupy / −1 in-way + caller `door_opened` are the hunk.** Stamping **Addressed:** D-1262 is fair. Do **not** stamp “Match C Blind unseen start-of-loop feel” or “Match C `moverock_done` `next_boulder`.” `glyph_at_fp` is documented as a fingerprint, not C’s integer glyph id.

## Density

One C arm plus the `test_move`/`domove` `door_opened` consumer. ~50 JS lines in `moverock_core` + ~10 in `cmd.js`. Right size. Did not glue hitfloor `dropz`.

## Branch-by-branch confirm

1. Giant `m<dir>`: `"You step over a boulder here."`, guilt, occupy. Match.
2. Giant + Levitation: still over, not leverage abort. Match.
3. Tiny / light pack, not Flying: squeeze **against**, guilt, occupy. Match.
4. Flying + squeezable: squeeze **over**. Match.
5. Loaded human, seen boulder: in-way, glyph unchanged, `move=0`, no occupy. Match.
6. Nopick in-way + `feel_location` changes memory: `door_opened` + `move`, no occupy. Match C’s “learns something.”
7. Non-nopick vain push: still later arms (giant pickup D-1253 / squeeze D-1239 / leverage). Match.
8. `run>=2` boulder: still abort before `moverock` (D-1226). Match.
9. Blind unseen `"That feels like a boulder."`: still named (before nopick in C). Match the skip.
10. Verysmall **non**-nopick `"too small to push"`: still named (after nopick). Nopick verysmall uses squeeze. Match C order.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Fingerprint is not a recorded (x,y). Plain ESM.

## Verification

Journal: private canary **15**/15 (C order; giant over; Levitation giant still over; Sokoban guilt; empty squeeze against; flying over; loaded in-way; non-nopick vain; verysmall squeeze; glyph `door_opened`); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a hero uses `m<dir>` onto a boulder. Cadence this audit: full `sessions` at HEAD `e2aa4dbe` **44**/44 Scr **11405**/11405 RNG **100%**. Fortress is not evidence nopick fired.

## Actionable C-wrongs

None for Must-fix. Nopick is before Levitation and occupies on giant/squeeze through live callees. `glyph_at_fp` is a named stand-in that still calls live `feel_location`; a false compare would be a C-wrong if proven — the canary’s glyph case and seen-boulder no-spend path match C’s inequality intent. Sticky `u.Levitation` inside the pre-existing `u_locomotion` helper is D-1070-class clone debt on a word, not a return −1 that still aborts giants.

Named omits (map, not Must-fix):

1. Blind unseen start-of-loop feel (`hack.c:358–363`)
2. `next_boulder` / `moverock_done` (`:327–333`, `:365`)
3. Verysmall vain-push after nopick (`:426`)
4. Sokoban diagonal / shop costly / trap-pool arms

Do not Must-fix “JS splits `test_move` into `cmd.js`.” Do not Must-fix “`u_locomotion` skips `locomotion(ptr)` for giants.”

## Callers / RNG ledger

C: `moverock` ← `test_move` DO_MOVE. JS: `cmd.js` boulder arm. No RNG in the new arm. Public fortress is not evidence `m`+direction hit a boulder.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `m<dir>` into a boulder now steps over (giant) or squeezes, or in-way with `door_opened` on a learned glyph, instead of dying on levitation; Blind unseen feel stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1262 `72757d4c`.
