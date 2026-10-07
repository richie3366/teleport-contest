# Review 2463 — 92e0fb53b — waterlevel S_water via live DEC symset (D-3581)

**Metadata.** SHA `92e0fb53b` (2026-10-07, D-3581). Type: **cliff**:
writer port for the cliffs head `teleport.c level_tele`. `js/`
insertions: 18 (`js/mklev.js` +18/−3) + committed test.

## Intent vs deliverable

Promise: Plane-of-Water memory was frozen as ASCII `}` because
setup_waterlevel + movebubbles hardcoded the tty store, bypassing
the live DEC-aware twin; both stores now resolve through
`terrain_glyph({typ:WATER})`. Probe Tourist-92100 132→distfleeck@141.

Diff actually adds: the two hoisted `terrain_glyph` calls + the two
rewritten stores. Promise matches diff. No symbols deleted or
re-pointed (import pre-existing).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | setup_waterlevel memGlyph store | ported | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:18397) | mkmaze.c:1811–1857 |
| 2 | movebubbles water_pos store | ported | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:18560) | mkmaze.c:1537–1685 |

Helpers: none added. `terrain_glyph` is the live single export
(`sym.mjs`: `js/display.js:3907 sync`); the mklev→display edge
pre-exists, so no new edge and no `sym.mjs` re-point output is
required.

## C ↔ JS fidelity

**Both C stores confirmed.** `csym setup_waterlevel` →
mkmaze.c:1811–1857: `glyph = cmap_to_glyph(S_water|S_air)` once,
then `levl[x][y].glyph = glyph` on every cell — the hoisted
single-call shape mirrors C's own structure ✓. `csym movebubbles`
→ mkmaze.c:1537–1685: `static water_pos =
{cmap_b_to_glyph(S_water), WATER, …}` with `levl[x][y] = water_pos`
at the `:1644` site ✓. Callers (`--callers`): setup←mkmaze.c:583;
movebubbles←allmain.c:375 + do.c:1832 — bodies only, signatures
unchanged ✓.

**The twin is the right one.** terrain_glyph WATER arm
(display.js:4030, read): DEC → `` ` ``/CLR_BRIGHT_BLUE/dec,
ASCII → `}`/CLR_BRIGHT_BLUE — exactly the observed C-vs-JS delta
(bright-blue `\x0e`` vs `}`). dat/symbols DECgraphics section
(read: `start: DECgraphics`, S_water `\xe0` meta-diamond) confirms
the C paint-time resolution; S_air/S_cloud have no entries in that
section, so leaving the air stores hardcoded is correct ✓. The
`{typ:WATER}` bare object is safe (WATER arm reads only `dec` +
typ) ✓. No RNG in either touched arm (bubble RNG upstream,
untouched).

## Hallucinations / overclaim

None. The "symset cannot change mid-call" hoist rationale holds
(sync bodies, no menu indeces). The 2 unchanged sessions carry
outside-the-arm proofs (Quest/Home dnum 3, Castle dnum 0 — neither
executes the Is_waterlevel-gated stores), not counted as moved.

## Density

Cliff §10.18: cliffs-head writer, two stores of two ported
functions, own `Ledger:` touch (both rows gain D-3581).
Per-function verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message's own
  "no DIAG/FORCE/seed gates" — code clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `waterlevel-dec-diamond.test.mjs`: 1/1 PASS now
  (pre-fix FAIL claimed in-ship with the exact ch delta).
- Re-measure (mine): `verify level_tele --base 92e0fb53b~1
  --reach-all` → **0 PASS, 1 moved past, 2 unchanged, 0 worse** +
  smoke 24/24 REACH-OK. Tourist-92100 now reads makemon@158
  (moved further by later D-3582 — strictly later, consistent);
  the 2 unchanged keep the D-log's non-water dnums.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
