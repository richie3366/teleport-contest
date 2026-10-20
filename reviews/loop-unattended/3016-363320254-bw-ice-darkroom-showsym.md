# Review 3016 — 363320254 — BW ice collides with reglyph_darkroom's equate, not the symset slot

- SHA: `363320254` (cliff; board row dosounds, scen-symset-Rogue-50750039
  s269, ice painted inverse)
- D-entry: D-4176; Ledger: reglyph_darkroom split (reglyph_darkroom +
  darkroom_showsym)
- `js/` diff: display.js +23 −2

## Intent vs deliverable

Promise: with color off, reset_glyphmap flags S_ice MG_BW_ICE only
when its symbol equals `showsyms[S_room]` or `showsyms[S_darkroom]`
(`:2904–2907`). C's showsyms[S_darkroom] is reglyph_darkroom's equate
(`:1850–1853`), never the symset's own slot. JS read the loaded
symset's default `.`, so RogueIBM ice (`.`) collided.

Diff: a new `darkroom_showsym()` returns S_room's symbol if `dark_room
&& use_color`, else SYM_NOTHING's. lava_ice_sink_map_attr's ice test
uses it. The promise matches the diff.

## Inventory

- darkroom_showsym — display.js:586 (C display.c:1850–1853, the
  showsyms tail of reglyph_darkroom): new.
- lava_ice_sink_map_attr — display.js:594 (C reset_glyphmap
  `:2890–2911` BW chain): ice disjunct re-pointed.

## C ↔ JS fidelity

C reglyph_darkroom tail:

```c
if (flags.dark_room && iflags.use_color)
    gs.showsyms[S_darkroom] = gs.showsyms[S_room];
else
    gs.showsyms[S_darkroom] = gs.showsyms[SYM_NOTHING + SYM_OFF_X];
```

darkroom_showsym is this expression. There is no Is_rogue_level term
in the showsyms half, and JS adds none.

C reset_glyphmap's S_ice case reads the slot only under
`!iflags.use_color` (`:2890`). JS's chain returns early on `wc_color
!== false`, the same gate.

C caches the slot; JS derives it live. Callers of reglyph_darkroom
(`csym --callers`): do.c:1715 goto_level, options.c:7347
initoptions_finish, options.c:8999 reset_needed_visuals, restore.c:926.
So C's value is fresh from startup on. The only lag is inside the color
toggle, where reset_glyphmap (`:8983`) runs before reglyph_darkroom
(`:8999`).

That lag cannot change the ice result:

- color was on with dark_room on: the stale slot equals
  showsyms[S_room], which the first disjunct already tests;
- color was on with dark_room off: the stale value is the blank, which
  is what darkroom_showsym returns.

So the live derivation is exact for this reader.

## Hallucinations / overclaim

None. The D-log names the lag and the unwired reglyph_darkroom callers.
The glyph half of reglyph_darkroom still lives in map_glyphinfo, as
before.

## Density

One reader, one C equate, measured with a setCell hook. Right-sized.

## Verification

```text
verify dosounds,reset_glyphmap --base 363320254~1 --no-reach
  dosounds:       1 PASS (scen-symset-Rogue-50750039) → PROGRESS
  reset_glyphmap: 0 blocked (vacuous)
```

This reproduces the claim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
