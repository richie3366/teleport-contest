# Review 2927 — efe3d4c2c — show_region stores the cloud's integer glyph

- SHA: `efe3d4c2c` (cliff, writer behind `lookat`)
- D-entry: D-4086; Ledger: region.c (`show_region`, D-4086)
- `js/` diff: `js/region.js` +7 −5

## Intent vs deliverable

Promise: the gas-cloud `#` was painted with no integer glyph, so
`glyph_at` returned NO_GLYPH. getpos autodescribe then named a
cloud-covered hero spot «unexplored area» instead of «fog/vapor cloud»
(2 sessions). Diff: `show_glyph_cell(..., 0, cmap_to_glyph(poison ?
S_poisoncloud : S_cloud))`, with the ch and color unchanged. Promise =
diff.

## Inventory

- `show_region` — region.js:117–122; C region.c:731-735.
- Callee `show_glyph_cell(x, y, ch, color, decgfx, attr, glyph)` —
  display.js:5170 (async). Callee `cmap_to_glyph` — display.js:910 (sync).

## C ↔ JS fidelity

```c
void show_region(NhRegion *reg, coordxy x, coordxy y) { show_glyph(x, y, reg->glyph); }
```

C's `reg->glyph` is `cmap_to_glyph(S_poisoncloud)` or `S_cloud`, set by
make_gas_cloud. JS keeps the cmap tag as a string and now maps it to the
same integer glyph. That's what `glyph_at` (gbuf) returns to
lookat/getpos. It equals C's. The `#`/CLR_BRIGHT_GREEN vs CLR_GRAY
paint is the same defsym. No RNG.

Pre-existing, not new: `show_region` is sync and does not await the
async `show_glyph_cell`. That was true before the diff and is not what
these rows needed.

## Hallucinations / overclaim

None about the fix. The board committed with this SHA also flips **39
reserve-tier rows** (33 owner-null, 3 getobj, 2 do_statusline2, 1 rng)
to PASS, which the D-log does not mention. They had been carried stale
in the reserve and got re-scored by this commit's board write. They are
earlier fixes being recorded, not this commit's movement. The D-log
claims only its 2, which is accurate.

## Density

One argument on one call. One Ledger bullet.

## Verification

```text
verify lookat (--base efe3d4c2c~1): 3 blocked
  scen-extcmd-Healer-51256009, scen-extcmd-Samurai-51257022: PASS
  scen-worldtour-Wizard-50550032 s553: still lookat (C «unexplored area» J «unexplored (no travel path)»)
verify lookat: 2 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log (two named rows). The remaining
lookat row is the travel-path suffix shape, a different cause. No
FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
