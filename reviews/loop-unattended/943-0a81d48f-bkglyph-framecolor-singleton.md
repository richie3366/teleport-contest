# Review 943 — 0a81d48f — display.c get_bkglyph_and_framecolor singleton (D-1973)

- SHA: `0a81d48f` — "display.c get_bkglyph_and_framecolor background/frame singleton (D-1973)."
- D-id: D-1973. JS: `js/display.js` + `js/getpos.js` (2 files). C locus: `nethack-c/upstream/src/display.c` `get_bkglyph_and_framecolor` `:2506–2579` (csym; D-log cites `:2507–2579`, one-line nit).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the background-glyph + frame-color singleton closing
the D-1964 `row_refresh` named omit (`framecolor` was hardcoded
`NO_COLOR`; no JS symbol computed the C `:2178–2179` call at all).
Diff actually adds: exported `get_bkglyph_and_framecolor(x, y)` →
`{bkglyph, framecolor}`, `row_refresh` rewired to destructure the live
`framecolor`, exported `mapxy_valid` in getpos.js, S_* const import
extension. Promise matches deliverable. `redraw_map`/`flush_screen`
call sites explicitly left for their own Open rows — stated, not
smuggled.

## Inventory

- New: `get_bkglyph_and_framecolor` (exported sync; C is `staticfn` —
  export justified in-comment for call-shape + testability),
  `mapxy_valid` (exported sync, 1:1 home getpos.c:93–99 per D-log).
- Changed: `row_refresh` (const → live call), `_paint_gbuf_cell`/
  `row_refresh` doc comments (omit lists updated).
- No deletions/re-points. `sym.mjs`: both symbols single-definition.

## C ↔ JS fidelity

Walked against C `:2506–2579` arm by arm (no RNG on this path):

- Init + gate `:2512–2516` ✓: `tmp_bkglyph = GLYPH_UNEXPLORED`,
  `use_background_glyph && seenv && gbuf.glyph != UNEXPLORED` with the
  gbuf read as `lev?.disp_glyph ?? UNEXPLORED` (D-1767 premise, carried).
  Truthy read of `use_background_glyph` reproduces C's tty-shut default
  (`windmain.c:332` sets FALSE; JS unset → falsy → shut) ✓.
- typ switch `:2517–2553` ✓: all 11 arms present in C order
  (SCORR/STONE arboreal→S_tree, ROOM, CORR waslit||lit_corridor, ICE,
  AIR, CLOUD, POOL+MOAT, WATER, LAVAPOOL, LAVAWALL, default S_room).
- Darken `:2555–2562` ✓: `!cansee && (!waslit || dark_room)` with the
  file's default-On `!== false` idiom for `dark_room` (C default TRUE —
  equivalent whenever set); litcorr→corr and S_room→DARKROOMSYM/stone
  with `use_color !== false` ✓; `darkroom_sym()` is the one pre-existing
  local clone (`sym.mjs`: single site, no clone #2) ✓.
- `idx != S_room → cmap_to_glyph` `:2563–2564` ✓; `#if 0` guard named
  as compiled out ✓.
- Frame `:2574–2578` ✓: `bgcolors && storedFrame != NO_COLOR &&
  mapxy_valid` with the absent gw store defaulting to NO_COLOR (named:
  `map_frame_color` store + getpos HiliteBackground wiring stay Open,
  so the arm reads shut exactly as C does pre-getpos) ✓.
- `mapxy_valid`: `typeof getpos_getvalid === 'function'` guard is
  ReferenceError-safe either way, FALSE default kept exactly (contrast
  with `getpos_validate`'s true default — called out in-comment) ✓.

Callee closure: `cansee`, `cmap_to_glyph`, `darkroom_sym`,
`mapxy_valid` all live or verified clones; S_* consts extend the
ALREADY `./const.js` edge. `display→getpos` import: `--can` returns
ALREADY (edge pre-exists; getpos already imports 12 display bindings,
same SCC, runtime-only call of a hoisted function — no new TDZ
surface; re-checked this review). No STUBs, no dispatch.

A note on what this buys today: both arms read shut under current
defaults (tty FALSE / no gw store), so `row_refresh` output is
unchanged — full 44/44 confirms. That is the *correct* shape (live
gates reading shut as in C), not NO-MOVEMENT-as-omission: the 16/16
/tmp probe forces the flags open and checks every arm (litcorr, darken,
DARKROOMSYM, arboreal, pool, seenv-0, gbuf-U, frame variants),
deleted after. Arm fidelity is demonstrated, not just named.

## Hallucinations / overclaim

"Exact C arm order with `:line` citations" — verified arm by arm
above; holds. No stubbed callees behind the export. The D-log does not
claim corpus movement.

## Density

One 74-line C staticfn + 1:1 getpos helper + one caller wiring, two
files that already call each other. Right-size per §2b.

## Verification

Honest vacuous note (0 blocks, no corpus-PASS claimed); green + strict
+ cohort + auto-full 44/44. Re-measured: `verify
get_bkglyph_and_framecolor --base 0a81d48f~1` → 0 blocked at baseline
and now — claim true. `imports.mjs --rulecheck` clean (re-run this
review). Added-line grep: no FORCE/DIAG/getRngLog/fastforward/seed
tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
