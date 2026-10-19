# Review 2935 — aa55e544d — reveal_terrain_getglyph shows a cloud over non-accessible terrain

- SHA: `aa55e544d` (cliff, owner `reveal_terrain`)
- D-entry: D-4094; Ledger: detect.c (`reveal_terrain_getglyph`, D-4094)
- `js/` diff: `js/display.js` +7 (one else-arm)

## Intent vs deliverable

Promise: the JS stand-in for «glyph_at is a gas cloud» covered only
newsym's ACCESSIBLE/pool arm. It missed the `_map_location(x, y, 1)`
tail that calls `show_region` with no terrain gate, so in `#terrain`
view c a poison cloud over a tree drew as the tree. Diff: an else-arm
sets `glyph_shows_cloud` when the spot is seen, a region covers it, the
hero isn't Blind, and the shown thing is neither a monster nor an I.
Promise = diff.

## Inventory

- `reveal_terrain_getglyph` cloud overlay — display.js:5604–5614; C
  display.c `newsym` cansee branch (region arm :993–998, hero/monster/
  warning/I/`_map_location` chain after it), `_map_location` macro
  display.c:448–472 (tail :469–471).
- Callees `visible_region_at`, `cansee`, `hero_Blind`: already used in
  this function. No new imports, no clone.

## C ↔ JS fidelity

```c
if (show && !Blind && (_ml_reg = visible_region_at(x, y)) != 0)
    show_region(_ml_reg, x, y);
```

Each newsym leaf, compared with the new arm (non-ACCESSIBLE spot, region
present):

- Hero spot, `canspotself()` → `_map_location(x, y, 0)` then
  `display_self`, so no cloud. JS classifies the spot as kind `mon`
  (display.js:5507), which the arm excludes. Match.
- Hero spot, cannot spot self → `_map_location(x, y, 1)`, so the cloud
  shows. JS kind is not `mon`, so the arm fires. Match.
- Monster seen → `_map_location(x, y, FALSE)` + `display_monster`, so
  no cloud. JS kind `mon` is excluded. Match.
- `glyph_is_invisible` → `map_invisible`, so no cloud. JS kind
  `invisible` is excluded. Match.
- Otherwise `_map_location(x, y, 1)` → the cloud shows. Match.

`!hero_Blind()` is C's `!Blind`. It is redundant beside `cansee`, but
harmless. The ACCESSIBLE arm before it is unchanged, so its
`mon_overrides_region` precedence still applies only where C applies it.

Pre-existing, out of this diff: the `kind` classifier has no
`display_warning` arm, and it has no telepathy/Detect_monsters arm for
an unseen monster on a seen spot. In those cases C draws the warning
digit or the monster, while JS now falls into the cloud arm (and before
this commit it fell into the terrain). No corpus session reaches this,
so it is noted only.

## Hallucinations / overclaim

None. «terrain view only» is true: the live `newsym` already ran the
tail, so the normal map was right before this commit.

## Density

One arm of one C leaf. One Ledger bullet.

## Verification

```text
verify reveal_terrain (--base aa55e544d~1): 2 blocked
  scen-sweep-Monk-49950093: PASS
  scen-symset-Healer-50555020: still reveal_terrain at step 478 (named)
verify reveal_terrain: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
verify reveal_terrain_getglyph: 0 blocked (vacuous; owner is reveal_terrain)
```

Exact match with the D-log. Public 44/44 at HEAD. No banned strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
