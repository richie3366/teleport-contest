# Review 2914 — ee925d524 — flush_screen paints the leave gbuf while the level is detached

- SHA: `ee925d524` (cliff, writer port: one branch of the flush choke)
- D-entry: D-4073; Ledger: display.c (`flush_screen`, D-4073)
- `js/` diff: `js/display.js` +8

## Intent vs deliverable

Promise: mid-goto_level, between the leave `vision_recalc(2)` loop and
mklev/getlev, a pline (`impossible("goto_level: returning to discarded
level?")`) flushes C's level-independent gbuf. That gbuf holds the
leave level's newsym'd cells (seen bats → remembered floor). JS painted
only topline/status, so the stale `B`s stayed (12 sessions → FULL PASS).
The diff paints `game._leave_gbuf_level` in that branch, but not on
the getbones `_stale_map_flush` path. Promise = diff.

## Inventory

- `flush_screen` detached branch — display.js:8943–8953.
  C: display.c flush_screen (gbuf flush loop), and do.c goto_level
  :1696 (the `impossible`) between `vision_recalc(2)` and `mklev()`.
- `paint_gbuf_level_to_terminal` — pre-existing (D-0583, used for the
  bones path).

## C ↔ JS fidelity

C (csym do.c goto_level, the relevant order):

```c
    vision_recalc(2);     /* leave: newsym prior IN_SIGHT → memory in gbuf */
    ...
        if (... level discarded ...) {
            impossible("goto_level: returning to discarded level?");
            svl.level_info[new_ledger].flags &= ~(VISITED);
        }
        mklev();
    ...
    flush_screen(-1);     /* ensure all map flushes are postponed */
```

C `impossible` → pline → `flush_screen(1)` paints every `gbuf` row whose
`gbuf_start..gbuf_stop` is dirty. That is the leave level's cells,
because the new level is not built yet. JS keeps the gbuf per level
(`game._leave_gbuf_level` after detach). Painting it on this branch is
the faithful equivalent. The `_stale_map_flush` guard leaves the bones
path to its own existing D-0583 handling, so the two flush flavours do
not double-paint. When `game.level` is attached, nothing changes.

Why this is reached: D-4070 made the discarded-tutorial re-entry
reproduce C's mapseen chain, and wizard `^V` back into the tutorial is
the common worldtour shape. That explains why 12 worldtour rows share
it.

## Hallucinations / overclaim

None. The worldtour-Wizard-50350000 s1322 enlightenment row is named as
the next owner, and the re-measure shows exactly that move.

## Density

One branch at the flush choke, mirroring C's gbuf semantics. One
`Ledger:` entry. The D-log's `sweep goto_level,flush_screen` (671
baseline-PASS re-run, 0 regressed) covers the reach.

## Verification

Re-measure (`--base ee925d524~1 --no-reach`):

```text
verify goto_level: 13 blocked
  Barbarian-50650080, Wizard-50056058, Wizard-50458501, Wizard-587312,
  sweep-Barbarian-50055106, Monk-49955062, Ranger-49955045,
  Valkyrie-620044, Wizard-49955042, Wizard-49955077, Wizard-50056056,
  Wizard-50255508: PASS
  scen-worldtour-Wizard-50350000: moved → enlightenment at step 1322 (was 373)
verify goto_level: 12 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log. There were no FORCE/DIAG/seed
strings, and the rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
