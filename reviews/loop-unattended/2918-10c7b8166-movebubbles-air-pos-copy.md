# Review 2918 — 10c7b8166 — movebubbles air arm copies all of air_pos

- SHA: `10c7b8166` (cliff, writer behind `auto_describe`)
- D-entry: D-4077; Ledger: mkmaze.c (`movebubbles`, D-4077)
- `js/` diff: `js/mklev.js` +13 −2

## Intent vs deliverable

Promise: on the Plane of Air, C struct-copies `air_pos` into every cell,
so seenv goes to 0. JS set only glyph/typ/lit, so a stale seenv let an
engulfed hero's travel validation succeed. That dropped
autodescribe's « (no travel path)» (10 sessions). Diff: the air arm also
zeroes seenv, flags, doormask, wall_info, horizontal, waslit, roomno and
edge, plus candig when set. Promise = diff for the **air** arm.

## Inventory

- `movebubbles` Is_airlevel arm — mklev.js:18787–18815; C mkmaze.c
  :1650–1667 (movebubbles :1537-1685).

## C ↔ JS fidelity

```c
static const struct rm water_pos = { cmap_b_to_glyph(S_water), WATER, 0,0,0,0,0,0,0,0 },
                       air_pos   = { cmap_b_to_glyph(S_cloud), AIR,   0,0,0,1,0,0,0,0 };
...
levl[x][y] = air_pos;  recalc_block_point(x, y);
```

`struct rm` (rm.h:159-171) is glyph, typ, seenv, flags:5, horizontal,
lit, waslit, roomno:6, edge, candig. JS `makeLocation` (game.js:8) splits
C's `flags` into `flags`/`doormask`/`wall_info`, and all three are
zeroed. Every C field now has its JS write, and lit=1 is kept. The perimeter
`rn2(xedge ? 3 : 5)` CLOUD arm is unchanged and still runs after
`recalc_block_point`, in C order. No RNG change.

**Sibling arm not done.** The water arm (mklev.js:18772–18782, C
:1644–1645 `levl[x][y] = water_pos`) has the same struct-copy semantics.
It still writes only glyph/typ/lit/seenv. flags/doormask/wall_info,
horizontal, waslit, roomno, edge and candig survive a bubble pass. This is
the same omission inside the function this commit says it fixed, but no
corpus session reaches the Plane of Water's bubble cells.

## Hallucinations / overclaim

None about the air arm. The ledger marks `movebubbles ported` with the
water arm still a partial copy. That's an overstatement of the same kind
§10.18 asks reviews to flag, but it's minor.

## Density

One arm of one function. The water-arm sibling is debt (above). One
Ledger bullet.

## Verification

`verify movebubbles` is vacuous (0 blocked). The D-log says so and
scores the auto_describe rows directly. Re-measure at HEAD:

```text
verify auto_describe (--base 10c7b8166~1): 15 blocked
  13 PASS — incl. all 10 D-log rows (worldtour Barbarian-50458507,
  Barbarian-51150080, Tourist-49950060, Archeologist-51250008,
  Healer-50056034, Samurai-50350064, Wizard-50056035/-50056057/-587300;
  hallu-Wizard-51450068) + the 3 shop corpse rows D-4079 fixed later
  2 unchanged: symset-Rogue-51250079 s421 (map diff), worldtour-Archeologist-50950008 s314
```

This is consistent with the D-log's 10 + 5 named. No FORCE/DIAG/seed
strings.

## Actionable C-wrongs

1. movebubbles water arm: copy all of `water_pos` (zero flags/doormask/
   wall_info, horizontal, waslit, roomno, edge, candig). This is debt,
   not Must-fix, because no session reaches it (§10.19).

Verdict: **ACCEPT-WITH-DEBT**
