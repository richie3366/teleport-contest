# Review 944 — eacb0e50 — display.c redraw_map cliparound pan-resend singleton (D-1974)

- SHA: `eacb0e50` — "display.c redraw_map cliparound pan-resend singleton (D-1974)."
- D-id: D-1974. JS: `js/display.js` (1 file, +40). C locus: `nethack-c/upstream/src/display.c` `redraw_map` `:1776–1812` (csym; D-log cites `:1778–1812`, two-line nit).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the pan/clip resend singleton (tty cliparound
`wintty.c:3840 → redraw_map(TRUE)` and docrt redrawonly `:1722–1724 →
redraw_map(FALSE)` had no JS analogue). Diff actually adds: exported
async `redraw_map(cursor_on_u)` + `on_level` import extension.
Promise matches deliverable. Caller wiring explicitly deferred
(docrt redrawonly stays named on `docrt`; cliparound has no window-port
caller) — stated, not smuggled.

## Inventory

- New: `redraw_map` (exported async).
- Changed: one import line (`on_level` onto the existing dungeon.js
  edge). No deletions/re-points.

## C ↔ JS fidelity

Walked against C `:1776–1812` line by line (no RNG on this path):

- Guard `:1789` ✓: `!u.ux || suppress_map_output() ||
  !on_level(uz0, uz)` in C short-circuit order (both live: same-module
  `suppress_map_output`, imported `on_level`).
- Loop bounds `:1800–1801` ✓: y 0..ROWNO-1, x 1..COLNO-1 verbatim.
- `:1802` `_glyph_at` = gbuf glyph, read as `loc.disp_glyph` (D-1767
  premise) and hushed via `void` where C hushes via `nhUse` — same
  effect (value unused under buffered glyphinfo) ✓.
- `:1803–1806` per-cell `get_bkglyph_and_framecolor` (D-1973, live)
  + `_paint_gbuf_cell(x, y, x-1, y+1)` for `print_glyph`/`Glyphinfo_at`
  at WIN_MAP offx 0 / offy 1 (D-1964 precedent) ✓. No UNEXPLORED gate,
  unlike `row_refresh` — matches C's unconditional resend ✓. In-range
  bounds mean never `&no_ginfo` ✓.
- `:1808` `flush_screen(cursor_on_u)` awaited; async is forced by the
  callee (bot/more nhgetch reach) with boolean pass-through as C's
  promotion ✓. New-and-unwired, so no caller needs updating for the
  async shape.

Callee closure: `suppress_map_output` (same-module live),
`get_bkglyph_and_framecolor` (D-1973 live), `_paint_gbuf_cell`
(pre-existing live), `flush_screen` (async live), `on_level` — the
D-log imports the dungeon.js export rather than writing clone #13
(`sym.mjs` confirms the export + 12 existing local clones elsewhere;
  the right call per the clone rule). `--can` re-checked: ALREADY edge.
No STUBs. The discarded `get_bkglyph_and_framecolor` return is honest:
both fields currently have no tty consumer (D-1973), and the comment
says so — order-preserving call, not a fake use.

`nul_glyphinfo` has no JS record because each cell overwrites before
any read — correct reading of C (initializer, not a value) ✓.

## Hallucinations / overclaim

"Exact C order" holds for the ported body. The live-but-unwired state
is the reverse of the dispatch/stub anti-pattern (live callee, deferred
callers) and is named twice (D-log + code comment). No overclaim.

## Density

One 37-line C function, one module, +40. Right-size per §2b; the
deferred caller wiring belongs to the docrt/cliparound rows, not here.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green + strict
+ cohort + auto-full 44/44. Re-measured: `verify redraw_map --base
eacb0e50~1` → 0 blocked at baseline and now. The /tmp probe covers the
otherwise-unreached arms (3 guard arms silent-return; live arm paints
with doubles; deleted after). `imports.mjs --rulecheck` clean (re-run
this review). Added-line grep: no FORCE/DIAG/getRngLog/fastforward/
seed tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
