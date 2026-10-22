# Review 3048 — 786cfe1ac — moverock_core's in-way turn reads the gbuf glyph

- SHA: `786cfe1ac` (cliffs head: owner set_apparxy,
  scen-shop-Barbarian-49959679 step 936)
- D-entry: D-4208; Ledger: moverock_core ported (hack.c `348-638`,
  js=hack.js:moverock_core)
- `js/` diff: hack.js +6 −24 (one fingerprint clone deleted)

## Intent vs deliverable

Promise: hack.c moverock_core's m<dir>/travel arm spends a turn on
«There is a boulder in your way.» only when feel_location changed
`glyph_at(sx, sy)`, the gbuf glyph int. JS compared a fingerprint that
also carried the remembered glyph's colour, which feel_location rewrites
while C's gbuf glyph stays the same. A blind hero travelling into a
boulder spent a turn on the first bump, and the monster pass ran one
hero move early. The arm now reads display.js glyph_at, and glyph_at_fp
is deleted.

Diff: both reads in the nopick arm (`oldglyph` before feel_location, the
post-message compare) now call `glyph_at(sx, sy)`, which was already
imported at hack.js:48 and used by glyph_to_obj_is_boulder two
functions below. The 19-line local `glyph_at_fp` (disp_ch, disp_color,
disp_decgfx, disp_attr plus remembered_glyph ch/colour/invisible joined
into a string) is removed. The promise matches the diff.

The board owner is set_apparxy, a symptom: its divergent draw came from
a step-boundary shift. The commit fixes the writer, which a domove/
movemon trace named (memory: RNG step-boundary shift, D-4208). It does
not re-port the symptom owner, so this is a §10.18 cliff.

## Inventory

- moverock_core nopick arm — js/hack.js:936–959 (C hack.c `:386–413`).
- Re-pointed: `glyph_at_fp` → display.js `glyph_at` (LIVE, ports
  display.c glyph_at `:2477–2483` over `loc.disp_glyph`, D-1767).
- Deleted: local `glyph_at_fp` (no other caller).

```text
node scripts/sym.mjs glyph_at_fp
glyph_at_fp      NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
node scripts/sym.mjs glyph_at
glyph_at         js/display.js:1144   sync
```

## C ↔ JS fidelity

C hack.c `:386–413` (moverock_core starts at `:347`):

```c
if (svc.context.nopick) {
    int oldglyph = glyph_at(sx, sy); /* before feel_location() */
    feel_location(sx, sy);
    if (throws_rocks(gy.youmonst.data)) { You("%s over a boulder here.", ...); sokoban_guilt(); res = 0; }
    else if (could_move_onto_boulder(sx, sy)) { You("squeeze yourself %s the boulder.", Flying ? "over" : "against"); sokoban_guilt(); res = 0; }
    else { There("is a boulder in your way.");
           if (glyph_at(sx, sy) != oldglyph) svc.context.door_opened = svc.context.move = TRUE;
           res = -1; }
    return res;
}
```

- Sampling point: C reads oldglyph before feel_location and the new
  glyph after There(). JS does the same (`oldglyph` at :937 before
  feel_location at :938, compare at :953 after the awaited There()).
- Value compared: C's `gbuf[y][x].glyphinfo.glyph` is the integer glyph
  only. Colour comes from glyphinfo.gm, which is not part of the compare,
  and the remembered glyph `lev->glyph` is not gbuf. JS glyph_at returns
  `loc.disp_glyph | 0` (the gbuf int) and is otherwise C's OOB
  `cmap_to_glyph(S_room)`. The old fingerprint added three things C does
  not compare: the colour, the attribute, and the remembered glyph. The
  measured 8 → 7 colour flip on the remembered boulder was the false
  positive.
- Arms: the giant step-over, the squeeze (Flying "over"/"against") and
  the in-way arm with `res = -1` are unchanged and in C order. The
  door_opened/move pair matches C's double assignment. domove_core
  `:2843–2847` consumes door_opened (D-log). That code is unchanged.
- RNG: the arm draws nothing. The fix moves where the turn boundary
  falls (80 draws shift from JS step 932 to C step 934), which is why
  the symptom showed in set_apparxy.

Same family, outside this diff: js/detect.js `glyph_at_disp` /
`glyph_disp_changed` (detect.js:1085–1103) is a second gbuf fingerprint
clone. do_vicinity_map compares ch/colour/kind/invisible where C compares
`newglyph != oldglyph` ints (detect.c do_vicinity_map, csym body lines
57/68–70/87–89). It has the same latent colour false positive for
odetected/mdetected (the «You sense your surroundings.» gate). No corpus
row is blocked there today. It is a lead for the coverage block, not a
C-wrong of this SHA.

## Hallucinations / overclaim

None. "glyph_at_fp had no other caller" is confirmed by sym.mjs (NOT
FOUND after deletion, and the diff removed no other call sites). The
D-log's premise correction ("JS has no integer glyph IDs" was false
since D-1767) is accurate: display.js glyph_at reads `disp_glyph`.

## Density

A two-line C compare restored, plus one clone deleted, on the cliffs-head
writer. Right-sized per §2b.

## Verification

```text
node scripts/hidden-proxy.mjs verify set_apparxy,moverock_core --base 786cfe1ac~1 --no-reach
  scen-shop-Barbarian-49959679: PASS
verify set_apparxy: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify moverock_core: no corpus session is blocked on it at 786cfe1ac~1 (vacuous; expected, owner is set_apparxy)
Rule #2: imports.mjs --rulecheck clean (run at HEAD, review 3047)
```

The diff contains no FORCE/DIAG/getRngLog/seed/fastforward reads and no
coordinates. The D-log shows the frozen runner PASS (RNG 69014/69014,
Screen 961/961), `sweep moveloop_core` 672 baseline-PASS with 0
regressed, full 44/44, strict ×2 and cohort 7/7. This change can
affect every blind m<dir>/travel boulder bump, so the sweep line is the
right corpus-wide check, and the audit's final rescore re-checks it.

## Actionable C-wrongs

None in this SHA. (The detect.js do_vicinity_map fingerprint above is a
pre-existing clone outside the diff, recorded as a lead.)

Verdict: **ACCEPT**
