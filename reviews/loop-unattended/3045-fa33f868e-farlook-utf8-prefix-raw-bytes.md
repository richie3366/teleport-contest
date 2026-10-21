# Review 3045 — fa33f868e — farlook encglyph prefix as C's dropped UTF-8 bytes

- SHA: `fa33f868e` (cliffs head, owner do_screen_description:
  scen-symset-Priest-50058519 step 398)
- D-entry: D-4205; Ledger: do_screen_description ported
- `js/` diff: display.js +32 −2, pager.js +16 −2

## Intent vs deliverable

Promise: pager.c do_screen_description prefixes a farlook line with
encglyph(glyph) (`:1271`). Under a UTF-8 symset, tty_putmixed turns it
into the glyph's UTF-8 bytes (mixed_to_utf8, wintty.c `:4183–4187`), and
topl_putsym writes one byte per column. The patch-006 capture hook gets
topl_putsym's plain `char`, which is negative on the x86_64 recorder, so
`ch < 32` drops it. An Enhanced1 floor farlook therefore keeps two cells
of the previous topline («fl») and shifts the text one column right.

Diff: display.js adds `TOPL_RAW_BYTE` (U+F700 + byte) and
`topl_raw_utf8(str)`, which encodes each code point with the live
hacklib `unicodeval_to_utf8str` and emits one char per C byte (≥ 0x80
bytes as PUA chars). `topline_putsyms_cl_end` skips those chars as it
skips C0. pager.js adds `encglyph_message_prefix(x, y)`: a cell flagged
`disp_capture_drop` (drawn through g_pututf8) yields topl_raw_utf8 of
its char, and any other cell keeps rendered_glyph_char. The promise
matches the diff.

## Inventory

- topl_raw_utf8 — display.js:8307 (C utf8map.c mixed_to_utf8 `:104–111`
  + hacklib.c unicodeval_to_utf8str `:883–918`); new export, one caller.
- topline_putsyms_cl_end — display.js:8333 (topl.c topl_putsym
  `:302–342`); both topline paint sites (`:8104`, `:8355`) use it.
- encglyph_message_prefix — pager.js:1451, a file-local adapter for
  windows.c encglyph `:1427–1434` as the message window sees it.
- do_screen_description — pager.js:1501, the prefix line only.
- unicodeval_to_utf8str — hacklib.js, a LIVE C callee, newly imported.
  No symbol deleted.

## C ↔ JS fidelity

- C `:1266–1273`: `looked` → `Sprintf(prefix, "%s        ",
  encglyph(glyphinfo.glyph))`, else `%c` of the raw sym. JS keeps both
  arms. Only the `looked` arm changes.
- mixed_to_utf8 substitutes `gm.u->utf8str` only under
  `WC2_U_UTF8STR && SYMHANDLING(H_UTF8)` with a utf8str present. That is
  the same condition show_glyph_cell already uses to set
  `disp_capture_drop` (display.js:5404, the map-side capture drop,
  D-3962). So the topline and map decisions share one source.
- Byte count: one JS char per C byte, so curx, the wrap column and the
  --More-- column all count C bytes. Painting: C0 and ≥ 0x80 bytes leave
  the cell's previous content and advance the column. That reproduces
  «fl» + one-column shift.
- Recorder fidelity: modelling a capture quirk (signed `char` into
  `ch < 32`) follows the port-C-as-recorded rule. The D-log flags it as a
  probable recorder bug to fix later, which matches the user rule to
  imitate C faithfully and name it.

No RNG involved.

## Hallucinations / overclaim

None in the claim. One unnamed edge: the prefix chars also enter
message history. With the default `msg_window:single`, ^P replays
through the same topline painter, which matches C. Under
`msg_window:full`/`reversed`, history is painted by the invent.js
text/menu painters. Those skip only C0 (invent.js:3048, :3245), so the
PUA chars would be drawn. C drops those bytes there too
(`nomux_putch(*cp)`). The D-log names the same gap for pager.c's
menu-bound encglyph sites. No corpus session reaches it: a non-default
msg_window plus a UTF-8 symset farlook plus ^P. I recorded it in the
ledger note rather than queueing it.

## Density

One prefix, one painter rule and one adapter, on one measured cliff.
Right-sized.

## Verification

```text
verify do_screen_description,topl_putsym --base fa33f868e~1 --no-reach
  do_screen_description: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-symset-Priest-50058519: PASS
  topl_putsym: 0 blocked (vacuous)
imports.mjs --rulecheck: clean
```

D-log: green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 678
baseline-PASS 0 regressed.

## Actionable C-wrongs

None queueable (unreached). Debt: text/menu painters do not drop
TOPL_RAW_BYTE / ≥ 0x80 bytes (msg_window full/reversed history; pager.c
look_engrs / gather_symbols encglyph sites).

Verdict: **ACCEPT-WITH-DEBT**
