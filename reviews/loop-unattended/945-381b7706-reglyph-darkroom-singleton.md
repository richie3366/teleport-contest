# Review 945 — 381b7706 — display.c reglyph_darkroom darkroom reglyph singleton (D-1975)

- SHA: `381b7706` — "display.c reglyph_darkroom darkroom reglyph singleton (D-1975)."
- D-id: D-1975. JS: `js/display.js` (1 file, +103). C locus: `nethack-c/upstream/src/display.c` `reglyph_darkroom` `:1817–1854` (csym; D-log cites `:1818–1854`, one-line nit).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the darkroom reglyph singleton (no JS symbol
re-remembered corridor/darkroom glyphs after a dark_room / use_color /
Rogue-level change; four C caller sites). Diff actually adds: exported
sync `reglyph_darkroom()` + doc comment. No new imports. Caller wiring
deferred with the four C sites cited (`do.c:1715`, `options.c:7347` +
`:8999`, `restore.c:926`). Promise matches deliverable.

## Inventory

- New: `reglyph_darkroom` (exported sync). No other JS changes, no
  deletions/re-points. `sym.mjs`: single definition.

## C ↔ JS fidelity

Walked against C `:1817–1854` (no RNG on this path):

- Loop bounds ✓: x 1..COLNO-1 outer, y 0..ROWNO-1 inner, verbatim.
- Block 1 (`:1826–1833`) ✓: `!dark_room: S_corr+waslit → S_litcorr`
  else `S_litcorr+!cansee → S_corr`, exact conjunctions.
- Block 2 (`:1836–1847`) ✓: `!dark_room || !use_color || Rogue:
  S_darkroom → waslit ? S_room : NOTHING` else `S_room+seenv+waslit+
  !cansee → S_darkroom` elif `NOTHING+ROOM+seenv+!cansee → S_darkroom`.
  The `else { compute isNothing; if … }` shape preserves C's condition
  evaluation order (second predicate only tested when the first fails) ✓.
- Re-read after block 1 (`const mem = lev.remembered_glyph`) reproduces
  C seeing the first block's store through the same lvalue ✓.
- `lev->glyph` integer compares become `memory_is_cmap` (id-first exact
  integer compare; tty ch/color/decgfx triple only when no id stored —
  read the helper body lid: pre-existing newsym-precedent clone, single
  site, not introduced here) ✓. NOTHING blank-shape fallback fires only
  when no integer id is stored, and blank/NO_COLOR *is* the NOTHING
  rendering, so the fallback cannot misclassify a visible cell ✓.
- Writes via `cmap_idx_to_glyph` carry tty + integer id together, so the
  id-first reads above stay exact after a write ✓; the NOTHING write
  (blank + NOTHING id) matches C's integer store under the
  no-showsyms model ✓.
- `Is_rogue_level(game.u?.uz)` hoisted out of the loop: pure read on
  `u.uz` (const.js:3225, no side effects/RNG — read the body), hence an
  invisible hoist ✓. `dark_room`/`use_color` default-On `!== false`
  matches C TRUE defaults with the file's established idiom ✓;
  `cansee` kept last in each conjunction ✓ (short-circuit order
  preserved).
- Tail `:1850–1853` showsyms equate: no JS counterpart possible without
  showsyms[] machinery (D-1972 premise); named in code + D-log + map,
  with the remembered cells already carrying the darkroom tty ✓.

Callee closure: `memory_is_cmap`, `cmap_idx_to_glyph`, `cansee`,
`Is_rogue_level` all live or verified pre-existing clones; no new edge
(D-log claim true — import list untouched), no STUBs.

## Hallucinations / overclaim

"Exact C order with `:line` citations" — verified above; holds,
including the re-read subtlety which the comment calls out. No stubbed
callees, no movement claimed.

## Density

One 38-line C function, one module, +103. Right-size per §2b.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green + strict
+ cohort + auto-full 44/44. Re-measured: `verify reglyph_darkroom
--base 381b7706~1` → 0 blocked at baseline and now. The 6/6 /tmp probe
(three dark arms + three nodark arms, deleted after) is the right
throwaway for unreached display code. `imports.mjs --rulecheck` clean
(re-run this review). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
