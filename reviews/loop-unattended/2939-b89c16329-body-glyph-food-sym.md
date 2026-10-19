# Review 2939 — b89c16329 — a corpse glyph's screen symbol is the food '%'

- SHA: `b89c16329` (cliff, writer behind board owner `glibr`)
- D-entry: D-4098; Ledger: pager.c (`do_screen_description`, D-4098)
- `js/` diff: `js/pager.js` +7/−1 (one arm split)

## Intent vs deliverable

Promise: `glyph_showsym_code` gave a body glyph its monster letter, as
for a statue. So `do_screen_description`'s object-class scan never
matched '%', and getpos autodescribe printed nothing over a corpse.
Diff: the statue arm stays as it was, and a new body arm returns
`live_showsyms(objects[CORPSE].oc_class + SYM_OFF_O)`. Promise = diff.

## Inventory

- `glyph_showsym_code` — pager.js:1385–1420, the JS stand-in for
  map_glyphinfo's ttychar. C display.c `reset_glyphmap` body ranges
  :2796–2797 (GLYPH_BODY_PILETOP_OFF) and :3004–3005 (GLYPH_BODY_OFF),
  statue ranges :2782–2795. Consumer: pager.c `do_screen_description`
  :1268–1271.
- Callees `glyph_is_body` (display.js:1183, covers both plain and
  piletop ranges) and `live_showsyms`. Both LIVE and already used in
  this function.

## C ↔ JS fidelity

```c
} else if ((offset = (glyph - GLYPH_STATUE_MALE_PILETOP_OFF)) >= 0) {
    gmap->sym.symidx = mons[offset].mlet + SYM_OFF_M; …
} else if ((offset = (glyph - GLYPH_BODY_PILETOP_OFF)) >= 0) {
    gmap->sym.symidx = objects[CORPSE].oc_class + SYM_OFF_O; …
} else if ((offset = (glyph - GLYPH_BODY_OFF)) >= 0) {
    gmap->sym.symidx = objects[CORPSE].oc_class + SYM_OFF_O;
```

In C, statues take the monster letter and bodies take the CORPSE
object-class symbol. That holds for both the plain and the piletop
range. `glyph_is_body` in JS covers both ranges (display.js:1185–1188),
so the split matches C's two arms. The lookup goes through
`live_showsyms(…+SYM_OFF_O)`, the same path the normal-object arm just
below uses (pager.js:1407). So a symset or rogue-level override of '%'
is honoured, as with C's showsyms. The color/glyphflags parts of
reset_glyphmap are not part of this helper, which returns only the
symbol. No RNG.

## Hallucinations / overclaim

None. The board owner `glibr` (do_wear.c) is a misattribution, and the
D-log says so. The topline is getpos's autodescribe. D-4100's commit
later recorded «+2 stale D-4098 flips». So this SHA under-claimed its
movement (4 claimed, 6 real), which is not an overclaim.

## Density

One C arm of the glyph-map table, in the one JS helper that mirrors
it. One Ledger bullet.

## Verification

```text
verify glibr (--base b89c16329~1): 4 blocked
  chain-Healer-50450034, chain-Ranger-50255604, chain-Tourist-610146,
  sweep-Barbarian-50456033: PASS
verify glibr: 4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify do_screen_description: 1 blocked
  scen-symset-Priest-50058519: still at step 398 (C «fla» vs J «·»
  prefix bytes; the D-log names it as untouched) → NO MOVEMENT
```

Exact match with the D-log, including the unchanged symset row. Public
44/44 at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
