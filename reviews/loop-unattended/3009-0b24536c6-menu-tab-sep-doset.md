# Review 3009 — 0b24536c6 — doset under menu_tab_sep; menu painters drop C0 bytes

- SHA: `0b24536c6` (cliff; board row doset_simple_menu,
  scen-options-Samurai-50162003 s120; writers options.c doset format +
  wintty process_menu_window byte paint)
- D-entry: D-4169; Ledger: doset partial; process_menu_window partial
- `js/` diff: options.js +11 −2, invent.js +7

## Intent vs deliverable

Promise: under `menu_tab_sep`, doset uses `fmtstr_tab_doset =
"%s%s\t[%s]"` and drops the read-only booleans' indent. tty's
process_menu_window `putchar`s each byte with `curx++`, and the recorder's
nomux_putch drops `ch < 32`, so the tab cell stays blank. JS used the
padded form, kept the indent, and painted the tab byte.

Diff: format_doset_opt_line returns `` `${indent}${name}\t[${value}]` ``
under menu_tab_sep. The pass-0 bool caller passes `''` then. paint_overlay
and paint_corner_nhw_menu skip chars below 32, while still advancing one
column per byte. The promise matches the diff.

## Inventory

- format_doset_opt_line — options.js:10774 (C doset `:8760`, `:8822–8827`).
- doset pass-0 bool row — options.js:11527 (C `:8852`).
- paint_overlay — invent.js:3041; paint_corner_nhw_menu — invent.js:3229
  (C process_menu_window per-byte loop + patch 006 nomux_putch).

## C ↔ JS fidelity

C doset: `if (!iflags.menu_tab_sep) Sprintf(fmtstr_doset, "%%s%%-%us
[%%s]", longest_option_name(…)); else Strcpy(fmtstr_doset,
fmtstr_tab_doset);` (`:8822–8827`), then for each bool `indent = (pass ==
0 && !iflags.menu_tab_sep) ? "    " : ""` (`:8852`). JS reproduces both.
It reads the flag at format time rather than once at entry. That is the
same value, because the doset menu cannot toggle menu_tab_sep while it is
being built. doset_add_menu (`:9060–9062`) keeps `indent = !any.a_int ?
"    " : ""` with the same fmtstr. JS leaves its indent rule unchanged, and
it shares format_doset_opt_line, so it picks up the tab form too. That
is correct.

Painters: C puts one byte per cell (`curx++`). The shadow drops C0 and
keeps the cl_end blank. JS `continue`s on `charCodeAt(i) < 32`, indexing
by `col + i`, so the following text stays one cell to the right, as in C.
This is the same capture rule as the topline and the map (D-3962).

Not in scope, noted only: other C menu_tab_sep formatters
(artifact.c:1199, region.c:679, spell.c:2102, weapon.c:1278/:1289) are in
their own functions. The painter change already makes their tab cells
correct whenever JS emits a tab.

## Hallucinations / overclaim

None. The "different cause" row it named (Knight-50355037 s87) is fixed
by the next SHA (review 3010).

## Density

~15 lines for the measured writer. Right-sized.

## Verification

```text
verify doset_simple_menu,doset --base 0b24536c6~1 --no-reach
  doset_simple_menu: 2 PASS (Samurai-50162003; Knight-50355037 via D-4170 at HEAD) → PROGRESS
  doset: 0 blocked (vacuous)
```

This reproduces the claim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
