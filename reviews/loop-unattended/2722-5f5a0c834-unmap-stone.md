# Review 2722 — 5f5a0c834 — unmap stone (D-3862)

Metadata: SHA `5f5a0c834`, D-3862, cliffs row-2
level_tele writer (unmap_object wrote blank where C
writes S_stone). JS: `js/display.js` (both fallback
arms + tweak detection). Test:
`scripts/unmap-darkroom-stone.test.mjs` (new).

## Intent vs deliverable

Promise: 578116 arrival reglyph resurrected a
floor tile because unmap wrote blank/NOTHING while
C writes S_stone (reglyph_darkroom only darkens
NOTHING); both arms now write
cmap_idx_to_glyph(S_stone), tweak detection is
C-exact glyph equality; 578116 PASS. Diff actually
does that. Match.

## Inventory

- unmap_object seenv fallthrough (display.js:1644):
  dark-room tweak now `!waslit && typ==ROOM &&
  memory_is_cmap(glyph, S_room)` → S_stone write.
  C: display.c `:408–438` (read): tweak at
  `:431–434` — `!waslit && glyph==cmap(S_room)
  && typ==ROOM → cmap(S_stone)`.
- unmap_object else arm (display.js:1657): blank
  write → S_stone write. C `:436` — default val
  S_stone.
- Untouched arms verified whole (display.js:1625,
  read): hero_memory guard, trap arm (tseen &&
  !covers_traps → map_trap), engraving sub-arm
  (spot_shows && engr && !covers_traps +
  cansee→erevealed + map_engraving) — all match
  C `:413–429` in order.

## C ↔ JS fidelity

Whole-function confirm. The ported function is
now arm-complete vs C `:408–438`: every branch
in C order, same predicates, same writes. The old
render-shape check (`ch=='.' && !decgfx`) is
replaced by glyph-id equality
(`memory_is_cmap`: glyph int vs cmap_to_glyph,
else remembered-shape match — display.js:1482,
single local helper, no cross-file clone). The
write shape `{ch, color, decgfx, glyph}` from
`cmap_idx_to_glyph` (display.js:2008 sync
export) carries the glyph id the arrival reglyph
reads — the NOTHING-vs-stone distinction the
mechanism needs. No RNG in unmap (glyph-only).

## Hallucinations / overclaim

None. Subject claims only 578116 PASS — the
sibling level_tele session (578306) is left open
and still is (current cliffs row). No DIAG/FORCE/
seed in the js hunk.

## Density

Cliff-phase: row-2 level_tele writer (row-1
gulpmu was mid-diagnosis at D-3861 — working the
next live row while the head parks is correct
play, not a skip). Ledger: display.c unmap row +
D-3862. Reached: probe PASS.

## Verification

Rule #2 clean (iteration-wide). Re-measure
(mine): `verify level_tele --base 5f5a0c834~1
--reach-all` → `2 session(s) blocked on it (2 at
baseline, 1 in the working scoreboard)`,
578116 PASS, 578306 still level_tele@859,
`1 PASS, 0 moved past, 1 unchanged, 0 worse →
PROGRESS`; reach 15/15 REACH-OK. Zero regressed.
The 578116-PASS claim is exactly true; the
unchanged sibling is disclosed by the row
staying open.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
