# Review 3004 — eea3dca81 — model the recorder's nomux_out overflow (cursor + obuf leak)

- SHA: `eea3dca81` (recorder model; 17 garbage-cursor recordings, the
  parked "OSC marker leak" rows)
- D-entry: D-4164; Ledger: show_glyph split (display.js painters)
- `js/` diff: new nomux_capture.js +212; display.js +43; jsmain.js +48 −20;
  bones.js / end.js +1 each; test scripts/nomux-capture-overflow.test.mjs

## Intent vs deliverable

Promise: the contest recorder (patch 006, termcap.c) renders each marker's
screen into `static char nomux_out[24 * 256]` with no bound. A dense
colour + DECgraphics screen passes 6144 bytes. Its tail overwrites
`nomux_raw_active/row/col`, so every later marker reports status-line text
as CX/CY. Past 6448 bytes it reaches `obuf`, so the recorded screen holds
the marker header and a second copy of the screen's first bytes. Per the
human rule of 2026-10-20 (port recorder bugs as recorded), JS models both
from its own screen.

Diff: nomux_capture.js ports nomux_capture_screen byte for byte over the
Terminal grid, keeps a 12-byte raw-statics image per game, and returns the
cursor and, past obuf, the corrupted screen. display.js adds
`nomux_cell_gbuf` (the raw DEC byte and unmapped colour of a map cell
still showing its gbuf paint) and `disp_color_raw` (restores CLR_BLACK for
S_darkroom / S_pit / S_spiked_pit). jsmain.js calls nomux_marker at every
input boundary and animation frame. The promise matches the diff.

## Inventory

- nomux_capture_bytes — nomux_capture.js (patch 006 `nomux_capture_screen`,
  patch lines 254–322).
- nomux_marker — nomux_capture.js (`nomux_emit_marker` 140–155 +
  `nomux_get_cursor` 411–419).
- recorder_screen — record-session.mjs payloadToLines + encodeScreenAnsiRle.
- nomux_cell_gbuf — display.js:8424; `disp_color_raw` in show_glyph_cell
  and the three cleared-cell sites (clear_glyph_buffer, bones, savebones).
- jsmain.js captureBoundary + animationFrame hooks.

## C ↔ JS fidelity

**nomux_capture_screen**, line for line. Per row, cur_fg 7 and cur_attr 0
are reset. The trailing-blank scan uses C's predicate (`ch ' '|0`, attr 0,
fg 7|0). Attribute transitions go in C's order (7/27, 1/22, 4/24), then
fg (`39m` for 7, else nomux_sgr_fg), then SO/SI around decgfx cells, then
the byte. At row end: SI if in DEC; C's three-way reset collapses to
`attr → 0m; else fg≠7 → 39m`, which gives the same bytes. Then `\n` for
rows 0–22. `*p = '\0'` corresponds to JS writing a 0 at index `len`. Every
index from 6144 up to and including len lands in the statics image.

**nomux_get_cursor**: if raw_active ≠ 0, then cx = raw_col and cy =
raw_row. In JS that is `int32le(mem,8)` / `int32le(mem,4)`, which is the
nm order measured in the D-log (active, row, col). **nomux_emit_marker**:
capture, then cursor, then the `KIND/SEQ/ANIM/CX/CY/LEN` header, then
fwrite. JS builds the same header. Past `base = 6144 + 0x130` it lays the
header and then `bytes[o − h]` over obuf's 1024 bytes. That is the
measured libc fill-then-direct-write (Monk SEQ 87, header at 6448).

**SEQ / ANIM are not trace reads.** `seq` is the count of JS screens + 1,
the analogue of C's own `nomux_seq++` per input boundary. `anim` counts
JS animation frames like `nomux_anim_id++`. Neither reads the recording,
a seed or a recorded coordinate. Everything else is computed from JS's
own Terminal and gbuf. This is a deterministic port of tooling behaviour
on the human's instruction, not trace-shaped production.

Colour inputs: `DEFSYM_CLR_BLACK = {20, 59, 60}` matches defsym.h:113,
:167, :168, the only CLR_BLACK cmap symbols.

**Risk (not a C-wrong):** objects and monsters drawn in CLR_BLACK reach
the encoder with whatever colour the JS painter passes. The commit
validated byte identity against the real Monk payload over [0, 6448) and
names non-map CLR_BLACK as open. A screen whose length crosses 6144 only
through such cells would be mis-modelled. No recording shows that.

`imports.mjs --rulecheck`: clean (no fs, no node specifiers).

## Hallucinations / overclaim

None. The named omissions list exactly what is not modelled (nilstring,
colour scratch, msghistory statics, the >7472 wintty statics that D-4165
then took, raw_print with raw_active stuck).

## Density

~300 lines of new tooling model for +14 sessions and ~2,369 screens. The
human ruled on this scope explicitly. Cost: sweep 120 s → 134 s; speed
label 107+0.55 → 103+0.61 /turn at this audit, which is within noise.

## Verification

Owner-null rows, so verify has nothing blocked. Direct replay at HEAD of
the 14 claimed rows plus Wizard-95340:

```text
frozen/ps_test_runner.mjs (15 recordings) → 15 PASS, cursors exact
  e.g. scen-tour-Healer-51152023 121/121, scen-sweep-Priest-50556014 311/311,
  scen-worldtour-Ranger-50050090 1027/1027, scen-sweep-Wizard-95340 1044/1044
```

This reproduces the claim. Public 44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
