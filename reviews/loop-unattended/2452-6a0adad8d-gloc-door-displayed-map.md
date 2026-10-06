# Review 2452 — 6a0adad8d — GLOC_DOOR reads the displayed map (D-3569)

**Metadata.** SHA `6a0adad8d` (2026-10-06, D-3569). Type: **cliff**:
writer port (glyph-based arm restart) for the cliffs head `dungeon.c
count_feat_lastseentyp` (1 blocked). `js/` insertions: 25
(`js/getpos.js` +25/−4) + 1 test file (44 lines).

## Intent vs deliverable

Promise: restart the GLOC_DOOR arm per C :466–470 (`glyph_at` +
`glyph_is_cmap`/`glyph_to_cmap` + door/drawbridge/`S_ndoor`), so a
door the map shows closed cycles even when live doormask says open;
Healer-94322 →PASS; C-recorded cursor-cycle test.

Diff actually adds: the arm, the `is_cmap_drawbridge` local, 2 const
names on the existing const.js import, doc correction. Promise matches
diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `gather_locs_interesting` (GLOC_DOOR arm; MONS/OBJS pre-existing) | ported | [getpos.js](/home/debian/dev/teleport-contest/js/getpos.js:972) | getpos.c:451–470; sym.h:98–100 |

Helpers: `glyph_at` / `glyph_is_cmap` / `glyph_to_cmap` — **C
callees**, live display.js sync exports (already imported for the
MONS/OBJS arms — no import edit, no new edge). `is_cmap_door`
pre-existing local; `is_cmap_drawbridge` new local. Both verified
CLONEs of file-local C macros below.

## C ↔ JS fidelity

**The arm:** C getpos.c:451–452 reads `glyph_at` once and derives
`sym` (or −1); :466–469 returns `glyph_is_cmap && (is_cmap_door ||
is_cmap_drawbridge || sym == S_ndoor)` — read. JS :977–981 is the same
expression with an early `false` instead of `sym = -1` — equivalent
(all three disjuncts are false at −1: ranges are non-negative,
`S_ndoor` ≥ 0) ✓.

**The ranges:** sym.h:99–100 — drawbridge `S_vodbridge..S_hcdbridge`,
door `S_vodoor..S_hcdoor` — read. JS `is_cmap_drawbridge`
(:304–307) and pre-existing `is_cmap_door` (:301–303) are exact
transcriptions ✓; const.js carries 42/45 matching the PCHAR2 indices
(verified in 2451) ✓.

**The mechanism:** C reads the displayed map (live + remembered
glyphs); JS read live `doormask` — at (30,8) typ DOOR disp `+` but
D_ISOPEN, so the typ test excluded a cell C includes by glyph 3989
(S_hcdoor). First three cycle stops matched both sides, isolating the
4th-stop skip as the sole fork; the restart makes DOOR consistent with
the sibling MONS/OBJS glyph arms (D-2058/D-3557 pattern) ✓. Kept
typ-based `shown_door_cmap` now serves only the GLOC_EXPLORE subtest
with corrected docs; the live door-state question at (30,8) is named
as future cliff material, not patched ✓.

## Hallucinations / overclaim

None. "C cursor [29,9] vs JS [42,14]", "glyph 3989", "first three
stops matched" are recorded-cycle + live-state measurements. The Next
"welcome head went 8 PASS + 1 moved on a no-change verify" is a
disclosed board regeneration from D-3565's wiring, not a claim of new
work — and my full rescore below re-verifies it independently.

## Density

Cliff §10.18: count_feat-head writer (the owner prints nothing and
matched only a comment literal — correctly stood down in favor of the
writer). One cliff, one arm, own `Ledger:` entry ✓. Single-session row
fully cleared (1 PASS, 0 unchanged). Per-function verdict ACCEPT → SHA
ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/getpos-door-cycle-displayed.test.mjs`: 1/1 pass.
- Re-measure (mine, `--base 6a0adad8d~1 --reach-all`, current code):
  `gather_locs_interesting`: 0 blocked (writer shape), smoke 24/24
  REACH-OK; `count_feat_lastseentyp`: **1 PASS (Healer-94322), 0
  moved, 0 unchanged, 0 worse → PROGRESS**; smoke 24/24 REACH-OK.
  Exact match. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
