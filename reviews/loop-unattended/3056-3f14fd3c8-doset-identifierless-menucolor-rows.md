# Review 3056 — 3f14fd3c8 — doset colours its identifier-less menu rows

- SHA: `3f14fd3c8` (cliffs head `doset`: scen-options-Priest-53051011
  step 73, `O` after a menucolor «e» → white)
- D-entry: D-4216; Ledger: doset ported; doset_add_menu ported
- `js/` diff: options.js +45 −19, display.js +14 −12

## Intent vs deliverable

Promise: doset adds three kinds of identifier-less rows: help text via
add_menu_str, the non-settable booleans via a zero-identifier add_menu,
and the gameview compounds via doset_add_menu with indexoffset 0.
windows.c add_menu applies menucolors to all of them (`:1803–1807`);
only headings skip. A new menu_row_coloring helper colours those rows.
The help rows follow C's helptext loop (`"%4s%.75s"`, trailing `"    "`
row). serialize_for_scoring counts a coloured leading space as row
content.

Diff:

- options.js adds a file-local `menu_row_coloring(str)`, which returns
  `get_menu_coloring` mapped to `{color, attr}` or `{}`.
- It is spread onto doset_add_menu's indexoffset-0 rows, the pass-0
  boolean rows, and the help rows.
- The help rows are now produced by a loop over C's `helptext[]`, with
  `null` standing for the `'?'` entry.
- display.js hoists `cellEmitColor` and adds `cellEmitColor(cell) !==
  NO_COLOR` to the first-column scan.

The promise matches the diff.

## Inventory

- menu_row_coloring — options.js:6291 (new; windows.c add_menu `:1803–
  1807` step for one row). Exported later by 857fe4c5d.
- doset_add_menu — options.js:10863 (C options.c `:9017–9065`). Changed.
- doset — options.js:11568ff (C `:8758–8960`): helptext loop and pass-0
  rows changed.
- serialize_for_scoring — display.js:7941 (capture serializer).
- sym.mjs:

```text
menu_row_coloring js/options.js:6291   sync
doset_add_menu   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:10863
```

  doset_add_menu has a single definition, the port of the C staticfn.
  No symbol deleted.

## C ↔ JS fidelity

windows.c add_menu `:1803–1807`:

```c
if (iflags.use_menu_color) {
    if ((itemflags & MENU_ITEMFLAGS_SKIPMENUCOLORS) == 0)
        (void) get_menu_coloring(str, &color, &attr);
}
```

JS get_menu_coloring (options.js:6270) checks `use_menu_color` first
(C `:1845`), so the helper inherits the gate. It matches on the full
`str`, indent included, as C does (buf holds the `"    "` indent).

- Help loop, C `:8790–8810`: the strings are verbatim. `"%4s%.75s"`
  becomes `"    " + ht.slice(0, 75)`. The NULL slot is the
  `'?' "view help for options menu"` add_menu, selectable (it has an
  identifier, so the generic menu colours it as a selectable row). The
  trailing `""` becomes `"    "`, four spaces, which the old JS got
  wrong (empty row). add_menu_str passes ATR_NONE/NO_COLOR with no
  SKIPMENUCOLORS (windows.c `:1832–1838`), so it is coloured. Same.
- Pass-0 booleans, C `:8851–8860`: `any.a_int = 0` and the indent is
  `"    "` unless menu_tab_sep. enhance_menu_text is a compiled-out
  no-op (`#if 0`, `:10168–10178`). Then add_menu with ATR_NONE and
  SKIPINVERT only, so it is coloured. JS: same indent rule, same
  colouring on the final `line`.
- doset_add_menu, C `:9038–9064`: `any.a_int = indexoffset == 0 ? 0 :
  …`, indent `"    "` when `!any.a_int`, add_menu with SKIPINVERT. So
  the zero-identifier rows are coloured and the selectable rows are
  coloured by the generic menu. JS colours exactly the `indexoffset ===
  0` rows. The C "option not in allopt[]" branch also gives a_int 0. JS
  never builds that row (every doset_add_menu caller passes an allopt
  name).
- Headings ("Booleans …", "Compounds …") keep menu_heading_style, with
  no menucolor (SKIPMENUCOLORS). Same.
- The blank `add_menu_str("")` separators are not given
  menu_row_coloring. An empty string has no cells to colour, so the
  screen is identical whatever matches.

Serializer: a row's first column now includes a space whose emit colour
is not NO_COLOR. Glyphless CLR_GRAY blanks map to NO_COLOR, so plain map
and menu blanks are unaffected. The cited capture ` \e[97m    For…` is
column 0 plain, then four white spaces. With firstCol = 1 that gives
`' '` plus the coloured run of 4 (≤ 4, so literal), byte-for-byte.

## Hallucinations / overclaim

None on doset. The D-log says the session moved on to furniture_detect
at step 87, not PASS. Its «Named omissions» admits that other JS menus
still push identifier-less rows plain. That admission is the real
debt of this design:

- windows.c add_menu colours **every** row without SKIPMENUCOLORS,
  centrally. JS colours selectable rows in the generic menus and
  leaves non-selectable rows to each caller.
- Pinned C has 86 `add_menu_str(` sites in 16 files (`grep -c`), plus
  the zero-identifier add_menu rows. After this commit and the next two
  (D-4217 nhl_text, D-4218 print_mapseen), only options.js doset,
  getpos.js and dungeon.js spread menu_row_coloring.
- Each new menucolor screen will need another one-caller iteration.
  This SHA chose the per-caller route; the next two commits paid for it
  on the same probe session.

## Density

It is the cliffs head (doset at 3f14fd3c8~1 LOOP-QUEUE), one C function
and its compound helper, plus the serializer case its capture needed.
Right-sized as a cliff. The family-wide gap above is debt, not a
density violation. No corpus session is blocked on another add_menu_str
caller now, so a centralizing sweep would be unreached work (§10.19).

## Verification

```text
verify doset,doset_add_menu,serialize_for_scoring --base 3f14fd3c8~1 --no-reach
  verify doset: 1 session(s) blocked (1 at baseline)
    scen-options-Priest-53051011: PASS
  verify doset: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  doset_add_menu / serialize_for_scoring: 0 blocked (vacuous)
```

PASS on HEAD includes D-4217/4218. At this SHA the D-log claimed "moved
past to furniture_detect step 87", which is consistent. The diff has no
seed, step or coordinate reads. The D-log lists green 2/2, strict ×2,
cohort 7/7, full 44/44 and sweep 710/710 REACH-OK (the serializer
reaches every screen).

## Actionable C-wrongs

None in doset.

Debt (not a Must-fix: no session blocks on it): windows.c add_menu's
menucolor step is applied per caller (`menu_row_coloring`), not in the
generic menus' non-selectable-row path. Every other add_menu_str or
zero-identifier add_menu row in JS stays uncoloured under a matching
menucolor. The right shape is one flag on raw rows (heading/prompt =
skip) and colouring inside select_menu_pick_* / paint_corner_nhw_menu.
Queue it when the next menucolor cliff lands on another caller, instead
of a fourth one-caller spread.

Verdict: **ACCEPT-WITH-DEBT**
