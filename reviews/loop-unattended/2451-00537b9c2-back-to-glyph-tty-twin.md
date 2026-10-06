# Review 2451 — 00537b9c2 — back_to_glyph tty twin: arboreal + bridges (D-3568)

**Metadata.** SHA `00537b9c2` (2026-10-06, D-3568). Type: **cliff**:
writer port (paint arms) for the cliffs head `teleport.c level_tele`
(6 blocked). `js/` insertions: 61 (`js/display.js` +61/−7) + 1 test
file (131 lines, 7 cases).

## Intent vs deliverable

Promise: `terrain_glyph` gains the arboreal STONE/SCORR→tree arm,
DBWALL, and both drawbridge typs as tty twins of the int
`back_to_glyph`; `cmap_idx_to_tty` gains 42–45; 2 Ranger PASS + 1
moved 34→273; the 3 unchanged proven a separate seenv writer.

Diff actually adds: exactly those 5 arms + comment/doc updates. No new
imports (same module). Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `terrain_glyph` (4 new typ arms) + `cmap_idx_to_tty` (42–45) | ported (via `back_to_glyph`) | [display.js](/home/debian/dev/teleport-contest/js/display.js:3810) | display.c:2293–2297, :2393–2419; defsym.h:140–147; dat/symbols DECgraphics |

Helpers: none — all cells built from in-module tables. No clones.

## C ↔ JS fidelity

**STONE/SCORR:** C :2294–2297 `arboreal ? S_tree : S_stone` — read.
JS :3810–3822 shares the arm with the same predicate
(`game.level?.flags?.arboreal` — identical expression to the int twin
:3641) and returns the TREE cell verbatim on arboreal
(`g`/CLR_GREEN/DEC, `#`/CLR_GREEN/ASCII — matches the TREE arm below)
else the S_stone blank ✓. (Found secret corridors are typ CORR in C,
so SCORR⇒unfound⇒stone is exact, not approximate.)

**DBWALL:** C :2393–2395 `horizontal ? S_hcdbridge : S_vcdbridge` —
read; JS :3953–3955 identical via the cmap table ✓ ("never
seenv-gated" holds — no seenv read in either arm).

**DRAWBRIDGE_UP:** C :2396–2416 DB_UNDER switch
(MOAT→S_pool, LAVA→S_lava, ICE→S_ice, FLOOR→S_room, default
impossible+S_room) — read; JS :3959–3978 mirrors all four cases +
default-S_room, omitting `impossible()` exactly as the pre-existing
int twin does (:3749–3767, read) ✓ — twin-consistent by construction
since the tty arm routes through `cmap_idx_to_tty(uidx)`.

**DRAWBRIDGE_DOWN:** C :2417–2419 `horizontal ? S_hodbridge :
S_vodbridge` — read; JS :3982–3983 identical ✓.

**Cells:** PCHAR2(42–45): lowered `.`/raised `#`, all CLR_BROWN —
read (defsym.h:140–147) ✓. DECgraphics section (:689+): S_tree
`\xe7` meta-g (:708), S_vod/hodbridge `\xfe` meta-~ (:719–720), and no
raised-bridge entry — read ✓ — so DEC `~`/brown + ASCII `.`/brown for
lowered and ASCII `#`/brown in both modes for raised are exact.

## Hallucinations / overclaim

None. "C byte-proof" triples (tree `g`/2/DEC at shared-TREE and
C-only-STONE cells; DBWALL `#`/3/ASCII; DB_MOAT `` ` ``/4/DEC =
S_pool cell) are recorded-screen measurements; the C-only cells being
exactly the seen STONE cells of the arboreal level is a JS live-state
dump, and RNG 6254/6254 matched rules out terrain/vision. The 94236
"js-throw" label is the disclosed owner-null fallback (same shape as
94270, verified `error:null` in 2448).

## Density

Cliff §10.18: level_tele-head writer (level_tele body whole since
D-1846/D-2054/D-2136 — correctly not re-ported). One cliff, one paint
unit, own `Ledger:` entry ✓. The 3 unchanged carry per-session
no-movement proofs with JS live-state dumps pointing at a vision/seenv
writer in *opposite* directions (Kni/Hea C-paints-JS-blank vs Wiz
reversed) — fenced as its own iteration, not ridden ✓. Per-function
verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2445).
- `node --test scripts/terrain-glyph-arboreal-bridge.test.mjs`: 7/7 pass.
- Re-measure (mine, `--base 00537b9c2~1 --reach-all`, current code):
  `back_to_glyph`: 0 blocked (writer shape), smoke 24/24 REACH-OK;
  `level_tele`: **2 PASS (94136, 94296), 1 moved past (94236 34→273),
  3 unchanged (94336/94196/94177), 0 worse → PROGRESS**; smoke 24/24
  REACH-OK. Owner+step exact vs the D-log. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
