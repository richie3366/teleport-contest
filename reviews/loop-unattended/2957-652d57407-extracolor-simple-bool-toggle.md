# Review 2957 — 652d57407 — tty_print_glyph extracolor arm + doset_simple boolean via optfn_boolean

- SHA: `652d57407` (cliff, live-queue owner `look_here`, 5 rows, two writers)
- D-entry: D-4117; Ledger: tty_print_glyph split
  (show_glyph_cell+map_screen_cell+serialize_for_scoring+glyph_bank_attr);
  doset_simple_menu ported; optfn_boolean ported
- `js/` diff: `js/display.js` +37/−9, `js/options.js` +16/−56

## Intent vs deliverable

Promise: the 5 symset rows had two writers. (1) The extracolor arm of
tty_print_glyph was missing. An RGB customcolor goes to
term_start_extracolor, which the recorder never captures, so C records
the default fg while JS painted bright blue. (2) doset_simple_menu
toggled booleans through a partial copy with no `color` arm, so
turning colour off never reached reglyph_darkroom. Diff: show_glyph_cell
gets the arm (`disp_extracolor`), the three grid writers paint NO_COLOR
for it, and `simple_bool_toggle` now calls `optfn_boolean_do_set`, which
removes 40 lines of copy. A hilite_pet constant is fixed
(MC_ATR_INVERSE). Promise = diff.

## Inventory

- `show_glyph_cell` — display.js:5284–5306; C wintty.c:3891–3913.
- `render_map_row` / `paint_gbuf_level_to_terminal` / `_paint_gbuf_cell`
  — display.js:7340, :8332, :8405 (the grid writers that make up the
  tty_print_glyph split).
- `simple_bool_toggle` — options.js:10000; C options.c:8659–8662.
- `doset_simple_menu` — options.js:10309 (now awaits the toggle).
- `optfn_boolean_do_set` hilite_pet — options.js:11107; C :5307–5308.

## C ↔ JS fidelity

```c
if ((tty_procs.wincap2 & WC2_EXTRACOLORS)
    && glyphinfo->gm.customcolor != 0
    && iflags.colorcount >= 256 && !calling_from_update_inventory) {
    if ((glyphinfo->gm.customcolor & NH_BASIC_COLOR) == 0) {
        term_start_extracolor(...); ... colordone = TRUE;   /* :3903–3906 */
    } else
        color = COLORVAL(glyphinfo->gm.customcolor);        /* :3909 */
}
```

JS applies the same gates. `wc_color !== false` stands for
`iflags.use_color`. The wincap2 word comes from `install_tty_wincap2()`.
`colorcount >= 256` and `!calling_from_update_inventory` are assumed
(recorder terminal, map paints), and the D-log names both assumptions.
The basic/RGB split tests the same bit: a basic colour gets COLORVAL
(`& 0xffffff`) and an RGB one sets `disp_extracolor`. C emits no
`term_start_color` for an RGB colour (`colordone`), and the recorder
never hooks term_start_extracolor, so C's captured cell has the default
fg. NO_COLOR in all three grid writers models that. gbuf keeps the C
colour, so the change test is unaffected. No RNG.

doset_simple_menu: C builds `"!name"` when `*addr` is set and calls
parseoptions → optfn_boolean. JS passes `negated = current value` to the
same `optfn_boolean_do_set` that doset uses, so a true option goes false,
as in C. doset_simple sets `give_opt_msg = FALSE` (:8722), which keeps
the shared body from printing a toggle line (options.js:11116 gate). The
deleted copy's arms (terrainstatus `wc2_supported`, the status
REASSESS_ONLY group, hitpointbar, OPT_GLYPH_RESET, customcolors and
customsymbols markers) are all optfn_boolean arms, so the shared body
covers them. The D-log reports a script check that all 22 Bool rows
share their addr with DOSET_BOOL_ADDR. hilite_pet: C opt_hilite_pet
stores wintype.h ATR_INVERSE (7). The shared body had stored terminal
ATR_INVERSE (1), and the fix is correct.

## Hallucinations / overclaim

None. The D-log names three NO MOVEMENT owners, and they are not
claimed: optfn_boolean (Knight s76 message order) and doset_simple_menu
(Barbarian s30, Samurai s120).

## Density

Two writers, one per C file, shipped together because both heal the
same 5 rows (§10.20 "one cause healing several rows" allows that for
co-owned sessions). Net −16 lines.

## Verification

```text
verify look_here (--base 652d57407~1): 5 blocked → 5 PASS → PROGRESS
verify optfn_boolean: 1 blocked, still at s76 → NO MOVEMENT (named)
verify doset_simple_menu: 2 blocked, still at s30/s120 → NO MOVEMENT (pre-existing)
```

Exact match with the D-log.

## Actionable C-wrongs

None. The config-path optfn_boolean copy the D-log names is a separate
body that this diff did not touch.

Verdict: **ACCEPT**
