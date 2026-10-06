# Review 2461 — 950a830e7 — swallowed gulp-path gbuf wipe (D-3579)

**Metadata.** SHA `950a830e7` (2026-10-06, D-3579). Type: **cliff**:
writer port for the cliffs head `objnam.c wishymatch`. `js/`
insertions: 50 (`js/display.js` +27/−23, `js/monmove.js` +4/−3).

## Intent vs deliverable

Promise: `swallowed(1)` never wiped gbuf on the gulp path (mhitu
calls it directly, not via docrt), so pre-swallow monster glyphs
stayed readable via `glyph_at` and getpos `m` cycled to phantoms;
first arm now calls live `clear_glyph_buffer()` (C :1338→:2200);
else arm passes GLYPH_UNEXPLORED with kind + suppress gate;
postmov `swallowed(0)` wired (C :1654). Probe Archeologist-94096
108→236.

Diff actually adds: the wipe (replacing a ch-only blank loop that
never cleared ids), the else-arm id/kind/gate, the postmov call +
import. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | swallowed (first + else arms; new 3x3 pre-existing) | ported | [display.js](/home/debian/dev/teleport-contest/js/display.js:5963) | display.c:1331–1386 |
| 2 | postmov engulfer-relocate arm (swallowed(0) call) | partial (pre-existing) | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:1848) | monmove.c:1648–1657 |

Helpers: none added. `clear_glyph_buffer` is the live same-module
export (single, no clones); `swallowed` import joins monmove's
existing `./display.js` edge — no new module edge ✓.

## C ↔ JS fidelity

**The bug and fix are exactly as diagnosed.** C `swallowed`
(:1331–1386 via `csym`, read whole): first arm `cls(); bot()`
(:1338–1339); else arm clears the old 3x3 with
`show_glyph(x,y,GLYPH_UNEXPLORED)` under bare `isok` (:1341–1348);
both arms paint the stomach 3x3 + `display_self` + lastx/lasty. C
`cls` (:2196–2201, read) = message flush + botlx +
clear_nhwindow(WIN_MAP) + `clear_glyph_buffer()` ("force
gbuf[][].glyph to unexplored"). The gulp caller mhitu.c:1396
(`swallowed(1)`, read) bypasses docrt — so the wipe must live in
`swallowed(1)` itself ✓. JS `clear_glyph_buffer` (display.js:7922,
read) blanks every cell AND sets kind/glyph/gnew + full-dirty span —
a strict superset of the deleted ch-only loop, which is precisely why
stale ids survived it. The decomposition (async cls stays the docrt
arm's; message-flush+botlx unobservable on tty) is sound and
disclosed.

**Else arm matches C with one mirrored gate.** Id-first clear via
`show_glyph_cell(...,GLYPH_UNEXPLORED)` ✓ (glyph_at reads disp_glyph,
verified); `disp_kind='unexplored'` has live readers (detect.js:2405)
✓; the `suppress_map_output()` gate mirrors C show_glyph :1886
(read: `_suppress_map_output()` return) — show_glyph_cell gates
itself too, so the loop-level gate is redundant-but-harmless and
covers the kind store. New 3x3 (pre-existing) matches C's gates
cell-for-cell ✓.

**Callers complete.** C code sites: allmain.c:461, display.c:1727,
mhitu.c:1396, mon.c:5438, monmove.c:1654, potion.c:421 — all six have
JS twins (allmain:1460, display:6323, mhitu:1781, makemon:1903,
monmove:1858 new, potion:1173/artifact:1106); the 7th reference
(wintty.c:3668) is inside `#if 0` (read) — correctly excluded. The
postmov `else if (mtmp.mx)` vs C bare else is pre-existing context,
disclosed, and equivalent (newsym no-ops off-map).

## Hallucinations / overclaim

None. "Swallowed's C body is now whole" holds (wipe, bot, old-3x3,
new 3x3, 6 callers — each verified). The never-swallowed guard and
postmov-else-shape notes are honest pre-existing disclosures.

## Density

Cliff §10.18: head writer, one function + one caller wire, own
`Ledger:` touch (display row gains D-3579). Per-function verdicts
ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: clean (no DIAG/FORCE/seed; temp DIAG reverted —
  diff shows none).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify wishymatch --base 950a830e7~1
  --reach-all` → **0 PASS, 1 moved** (Archeologist-94096 108 →
  mswings_verb@236), **0 worse** + smoke 24/24 REACH-OK — the D-log's
  numbers exactly.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
