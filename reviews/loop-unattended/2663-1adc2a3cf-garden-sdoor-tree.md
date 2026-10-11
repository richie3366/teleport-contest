# Review 2663 — 1adc2a3cf — garden SDOOR tree tty arm (D-3799)

Metadata. SHA `1adc2a3cf` (2026-10-11), D-3799, parent
`7b9481548`. js diff: `js/display.js` +14/−1 —
`case SDOOR` in terrain_glyph checks `arboreal_sdoor`
first. Works cliffs row-2 level_tele (95218
345→695).

## Intent vs deliverable

Promise: 95218@345 — a garden-theme secret door
(typ SDOOR, `arboreal_sdoor=1`): C renders S_tree
(green `g`) while JS fell through to wall_glyph,
whose wall-only table has no S_tree entry (blank).
The int twin already had the arm; only the tty
side missed it. Diff adds exactly the tty arm.
Promise and diff match.

## Inventory

Changed JS (1 writer arm):

- terrain_glyph SDOOR — `js/display.js:4195`.
  C: `display.c:2305` (back_to_glyph SDOOR →
  S_tree, no seenv gate) + `:3600` (wall_angle
  same arm), both read in pinned C.

## C ↔ JS fidelity

**C-exact.** C `:2304–2308`: `case SDOOR: if
(ptr->arboreal_sdoor) { idx = S_tree; break; }
FALLTHROUGH;` — unconditional, no seenv gate. JS:
`if (loc.arboreal_sdoor) return <TREE tty>;`
else `wall_glyph(loc)` — the same shape, and this
audit confirmed the returned tty is verbatim the
TREE arm's (`dec ? {g, GREEN} : {#, GREEN}`,
`js/display.js:4123`). The plain-SDOOR path is
byte-identical to before (fallthrough preserved
via the explicit `wall_glyph` call). wall_angle's
defensive twin arm correctly stays (mirrors C
`:3600`, unreachable via back_to_glyph on both
sides). No RNG, no message, no callee. No symbol
deleted or re-pointed, so no sym.mjs paste is
owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The falsified
gremlin/memory theories are disclosed rather than
hidden, and the row's other two probes are
diagnosed as separate writers with falsifiers —
not claimed, not fixed.

## Density

Cliff-phase §2b: one row-2 writer arm in
display.js (shared file — full 44/44 ran). No
other-file work rides along. Row-1 randomize
falsifier re-verified unfired live.

## Verification

D-log Verify: focused 1/4 → 4/4; level_tele
1 moved (345 → 695, +224 screens); reach 6/6;
gates + full PASS.

Re-measured by this audit (`verify level_tele
--base 1adc2a3cf~1 --reach-all`, re-run on HEAD
code):

```text
verify level_tele: 0 PASS, 1 moved past (1 still level_tele at a later step), 2 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-95218: moved → level_tele at step 695 (was 345)
reach level_tele: 6 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. Committed scoreboard:
1045 → 1045 (moved, no PASS flip), 0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
