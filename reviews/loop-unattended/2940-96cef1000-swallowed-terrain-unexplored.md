# Review 2940 — 96cef1000 — never-remembered levl glyph is GLYPH_UNEXPLORED

- SHA: `96cef1000` (cliff, writer behind `auto_describe` / `lookat`)
- D-entry: D-4099; Ledger: detect.c (`reveal_terrain_getglyph`, D-4099)
- `js/` diff: `js/display.js` +6/−3 (one ternary + comment)

## Intent vs deliverable

Promise: for a hero-memory spot that was never remembered, JS used the
stone glyph as `levl[][].glyph`. In C, clear_level_structures leaves
GLYPH_UNEXPLORED there. So an engulfed hero's `#terrain` getpos named
never-seen spots «unexplored» instead of «unexplored area». Diff: the
hero_memory arm attaches GLYPH_UNEXPLORED when there is no
`remembered_glyph`. When a memory exists it keeps the remembered int, or
the stone default for an id-less memory. Promise = diff.

## Inventory

- `reveal_terrain_getglyph` hero_memory `levl_glyph` —
  display.js:5451–5463; C detect.c `reveal_terrain_getglyph`
  :2166–2288 (`levl_glyph` :2201–2203, swallowed select :2209).
- The GLYPH_UNEXPLORED source is mklev.c clear_level_structures
  `zerorm` (:852). The consumer is pager.c lookat :730–737
  («unexplored area»), against the S_stone `!seenv` arm (:779–782).
- No new callee; `GLYPH_UNEXPLORED` was already imported here.

## C ↔ JS fidelity

```c
levl_glyph = svl.level.flags.hero_memory ? levl[x][y].glyph
             : seenv ? back_to_glyph(x, y) : default_glyph;
glyph = !swallowed ? glyph_at(x, y) : levl_glyph;
… else if ((!keep_mons && (glyph_is_monster(glyph) || glyph_is_warning(glyph)))
           || glyph_is_swallow(glyph)) { glyph = levl_glyph; was_mon = TRUE; }
```

`levl_glyph` reaches the output in three places: the swallowed select
(:2209), the monster/warning/swallow replacement (:2212–2215), and
nothing else before the strip arms. A spot that was never mapped holds
GLYPH_UNEXPLORED in C, and JS now attaches it. The non-hero_memory
branch (`seenv ? back_to_glyph : default`) is unchanged, and it already
matched C. No RNG.

Model note: JS «no `remembered_glyph`» stands in for C's «`levl.glyph`
is GLYPH_UNEXPLORED». This holds only if every C `_map_location` /
`map_background` write has a JS `remembered_glyph` writer (display.js
has about 12). Under a displayed monster, C's newsym still maps the
background (`_map_location(x, y, FALSE)`). A JS gap there would now
read «unexplored area» where it read stone before. Either way it would
differ from C, so the commit does not create a new kind of gap. The
sweep (717, 0 regressed) and the audit's full rescore cover it.

## Hallucinations / overclaim

None. The JS-was line is backed by a measurement (disp_glyph trap and
a reverted in-function log), not by inference.

## Density

One C read (the `levl.glyph` default) fixed at its one JS site. One
Ledger bullet.

## Verification

```text
verify auto_describe (--base 96cef1000~1): 1 blocked
  scen-worldtour-Archeologist-50950008: PASS
verify lookat: 1 blocked
  scen-worldtour-Wizard-50550032: PASS
→ 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match with the D-log. Public 44/44 at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
