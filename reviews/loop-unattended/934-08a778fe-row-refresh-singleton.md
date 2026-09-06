# Review 934 — 08a778fe — display.c row_refresh glyph-row repaint singleton (D-1964)

Metadata: SHA `08a778fe`, D-1964, `js/display.js` only (new export +
`docorner` board-loop rewire). Reviewer re-ran the C body, all
three C call sites with their `#ifdef` guards, sym, Rule #2,
banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises exported `row_refresh` in
C order with `force` false, `framecolor` always NO_COLOR, the C
gate kept in shape, and `docorner` rewired to the `:3704` call
shape. Diff actually adds exactly that. Promise kept.

Inventory: one new function (`row_refresh`, `js/display.js:5726`,
sync per `sym.mjs`). One rewired caller (`docorner` board loop).
No deleted symbols, no new import edge (same-module).

C ↔ JS fidelity — against `display.c:2145–2186` (via `csym.mjs`)
and `wintty.c:3696–3711` (read at HEAD), branch-by-branch:

- `force` computation (`:2163–2173`, UNEXPLORED glyphinfo vs
  nul_gbuf across ttychar/color/flags/tileidx) → `const force =
  false` with the reason stated: JS nul (`' '`/`NO_COLOR`) renders
  identically to UNEXPLORED, and the tile/symset
  `map_glyphinfo` arms that could flip the comparison stay named
  omits in this commit's map row (verified at
  `docs/c-js-map/turns.md:2082`). Conditional constant, honestly
  bounded — not a silent drop.
- Per-cell loop `for (x = start; x <= stop; x++)`, gbuf glyph
  read, `get_bkglyph_and_framecolor` → `framecolor = NO_COLOR`
  (background/frame arms named), gate `force || glyph !==
  GLYPH_UNEXPLORED || framecolor !== NO_COLOR` kept in C shape.
- Paint: `print_glyph(WIN_MAP, x, y, Glyphinfo_at(...))` →
  `_paint_gbuf_cell(xi, yy, xi - 1, yy + 1)`; argument mapping
  verified identical to the old inline call (`mx, my, c, y` with
  `mx = c+1`, `my = y-1`). No RNG either side.
- Call-site shape: of the three C sites, `:3700` is `#if
  TILES_IN_GLYPHMAP && MSDOS` (compiled out), `:3704` is the
  CLIPPING arm, `:3709` the non-CLIPPING arm. JS takes `:3704`
  with clipx/clipy = 0, offx 0 / offy 1 — the two live arms
  coincide under the named CLIPPING omit. Correct choice.
- Behavior delta vs old JS (unconditional repaint of every
  cell): skipped UNEXPLORED cells now leave the `cl_end` blank
  from the clear loop two lines above — visually identical, and
  exactly C's `force = false` behavior.

Hallucinations / overclaim: none. No dispatch-over-stub shape
(leaf painter; `_paint_gbuf_cell` live).

Density: §2b right size — one painter + its caller arm, one
module. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn row_refresh` → PASS syntax/rule2/green/strict/cohort/full,
an explicitly vacuous hidden note (row cited 0 blocks, no
corpus-PASS claim), plus a /tmp probe (paint-only-`@`,
UNEXPLORED skip, empty-range/OOB safe) PROBE PASS. Reviewer
re-measured: `hidden-proxy verify row_refresh --base
08a778fe~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean (only hit is
D-log prose).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
