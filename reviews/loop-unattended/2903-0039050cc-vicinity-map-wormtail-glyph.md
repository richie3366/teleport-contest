# Review 2903 — 0039050cc — do_vicinity_map I-replace reads the displayed glyph

- SHA: `0039050cc` (cliff, writer port: one predicate in one pass)
- D-entry: D-4062; Ledger: detect.c (`do_vicinity_map`, D-4062)
- `js/` diff: `js/detect.js` +8/−1 (import + skip);
  new `scripts/vicinity-map-hallu-wormtail-glyph.test.mjs`

## Intent vs deliverable

Promise: the final "replace monsters with remembered, unseen" pass
must skip a spot whose *displayed* glyph is a long-worm tail. JS read
the real monster via `m_at`. Under Hallucination, map_monst painted a
display-RNG worm-tail draw and JS turned it into `I`
(Samurai-49956004 s830 → s1170). The diff adds `glyph_to_mon(newglyph.glyph)
=== PM_LONG_WORM_TAIL → continue` before the existing m_at check.
Promise = diff.

## Inventory

- `do_vicinity_map` I-replace loop — detect.js:1212–1228.
  C: detect.c:1447–1585 (loop at the end of the body).
- `glyph_to_mon` — display.js import (ALREADY edge, per
  `imports.mjs --can detect.js display.js glyph_to_mon`).

## C ↔ JS fidelity

C (csym detect.c, tail of do_vicinity_map):

```c
    for (zx = lo_x; zx <= hi_x; zx++)
        for (zy = lo_y; zy <= hi_y; zy++) {
            if (u_at(zx, zy))
                continue;
            newglyph = glyph_at(zx, zy);
            if (glyph_is_monster(newglyph)
                && glyph_to_mon(newglyph) != PM_LONG_WORM_TAIL) {
                if ((mtmp = m_at(zx, zy)) == 0 || !canspotmon(mtmp))
                    map_invisible(zx, zy);
            }
        }
    see_monsters();
```

JS (after): `u_at → continue`; `glyph_at_disp` (the gbuf/displayed
glyph, same source as C `glyph_at`); `kind !== 'monster' → continue`;
**`glyph_to_mon(glyph) === PM_LONG_WORM_TAIL → continue`**; then
`!mtmp || !canspotmon(mtmp) → map_invisible`. The C predicate is now
fully present and in order.

Leftover non-C operand: after the new check, JS keeps
`m_at(...).mnum === PM_LONG_WORM_TAIL → continue` "as a fallback". In C
and in JS, a tail segment's `m_at` is the worm *head* (PM_LONG_WORM),
and no monster struct carries PM_LONG_WORM_TAIL. The comment itself
says so. The branch is unreachable, so it is dead code, not a
divergence. It is a cleanup nit, not a C-wrong.

The pre-fix code also mis-handled the *non*-hallucinated tail glyph
(m_at → head ≠ TAIL → `canspotmon(head)` test). The glyph check fixes
that case too, silently. The D-log does not claim it, but it is a
strict improvement.

## Hallucinations / overclaim

None. The new s1170 `doaltarobj` row ("dancing flash" vs "amber flash")
is named as a later owner, and the re-measure shows exactly that move.

## Density

A single-predicate writer with movement on its probe. One `Ledger:`
entry. No unreached work.

## Verification

Re-measure (`--base 0039050cc~1 --no-reach`):

```text
verify dfeature_at: 6 blocked (1 at baseline, 5 in the working scoreboard)
  (5 uncached: scen-symset-Archeologist-50155034, Healer-50059030,
   Ranger-50059009, Ranger-50059059, Samurai-50359023)
  scen-sweep-Samurai-49956004: moved → doaltarobj at step 1170 (was 830)
verify dfeature_at: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
verify do_vicinity_map: no corpus session blocked (vacuous)
```

This is an exact match with the D-log. The 5 "working scoreboard"
symset rows are not regressions. They live in
`hidden-corpus/recipes-archive/` (PASS, archived), are absent from the
committed board at every window SHA, and appear only through a stale
local `.cache` scores file. There were no FORCE/DIAG/seed strings, and
the rulecheck is clean.

## Actionable C-wrongs

None. (Dead `m_at` tail fallback, cleanup only.)

Verdict: **ACCEPT**
