# Review 3057 — 857fe4c5d — show_getpos_tip lines carry add_menu_str's menucolor

- SHA: `857fe4c5d` (cliffs head `furniture_detect`, a region label;
  writer nhl_text: scen-options-Priest-53051011 step 87, first `;`)
- D-entry: D-4217; Ledger: nhl_text split js=getpos.js:show_getpos_tip
- `js/` diff: getpos.js +5 −2, options.js +1 −1

## Intent vs deliverable

Promise: nhl_text (behind nhcore.lua show_getpos_tip) adds each tip line
with add_menu_str (`:836`), so windows.c add_menu applies menucolors to
every line. JS painted the lines as bare strings, so «Tip: Farlooking or
selecting a map location» stayed gray where C paints it white. Each line
now carries menu_row_coloring, which is now exported.

Diff: `export` added to options.js menu_row_coloring (from D-4216).
getpos.js imports it on its existing options.js import line and maps
`lines` to `{ text, attr: 0, color: NO_COLOR, ...menu_row_coloring(str)
}` before paint_corner_nhw_menu. The promise matches the diff.

The queue owner was furniture_detect, the region label of the first
differing screen. The commit fixed the writer (nhl_text's add_menu_str
rows) rather than the label, which is what §10.18 asks for.

## Inventory

- show_getpos_tip — getpos.js:1324 (stands in for nhcore.lua
  show_getpos_tip `:108–119` plus nhlua.c nhl_text `:809–851`). Changed.
- menu_row_coloring — options.js:6291, now exported. No body change.
- sym.mjs on the re-pointed / newly exported names:

```text
show_getpos_tip  js/getpos.js:1324   ASYNC — await required
menu_row_coloring js/options.js:6291   sync
```

  menu_row_coloring is called inside the function body, not at module
  top level, so the getpos.js ↔ options.js import edge (already present
  for select_menu_pick_one) has no TDZ read. No symbol deleted.

## C ↔ JS fidelity

C nhl_text `:821–846`: for each string, split at `'\n'` when the
newline is ≤ 76 chars away, else back up from `str + 76` to a space.
`add_menu_str(tmpwin, str)` for each piece, then `end_menu(tmpwin,
NULL)` and `select_menu(PICK_NONE)`.

The split of the nhcore.lua `[[...]]` text, worked by hand (Lua drops
the newline right after `[[`; `lstr` is the final `'\n'`):

1. «Tip: Farlooking or selecting a map location» (nl at 43)
2. «» (nl at 0, so `ptr == str`, empty piece)
3. «You are now in a "farlook" mode - the movement keys move the cursor,»
4. «not your character.  Game time does not advance.  This mode is used»
5. «to look around the map, or to select a location on it.»
6. «»
7. «When in this mode, you can press ESC to return to normal game mode,»
8. «and pressing ? will show the key help.» (`ptr = lstr`, then
   `str > lstr`, so the loop ends)

Every line is under 76 chars, so no space back-up fires. That gives
8 rows, identical to the JS `lines` array.

- Colouring: add_menu_str passes ATR_NONE / NO_COLOR with no
  SKIPMENUCOLORS (windows.c `:1832–1838`), and add_menu then applies
  get_menu_coloring to the whole string when use_menu_color is set
  (`:1803–1807`). menu_row_coloring is that step, with the
  use_menu_color gate inside get_menu_coloring. The rows have no
  selector, so wintty's attr_n is 0 (whole line). The JS row has no
  descStart, so the whole line is painted. Same.
- Empty rows: a menucolor on «» colours nothing, so the screen is the
  same either way.
- No prompt (`end_menu(…, NULL)`): JS adds no prompt rows. PICK_NONE:
  Esc/Return/Space finish, any other key rings the bell and stays. JS
  loops on other keys. Same.
- No RNG on either side.

## Hallucinations / overclaim

None. The ledger's `split` and the D-log's named omission say plainly
that nhl_text's generic 76-column wrap is not ported. JS keeps the
pre-split lines of its only scored caller (do.js:1279 → nhcore
getpos_tip). The hand split above confirms those lines equal what C's
splitter produces for this text. So this is a stand-in for one input,
labelled as such, not a divergent clone.

## Density

One cliff, one writer, a few lines. It is small, but it is the whole C
behaviour for this caller, and the session moved on. The per-caller
shape it extends is the debt filed in review 3056 (menucolor not
applied centrally to identifier-less rows). This SHA is its second
one-caller instance.

## Verification

```text
verify furniture_detect,show_getpos_tip,nhl_text --base 857fe4c5d~1 --no-reach
  verify furniture_detect: 1 session(s) blocked (1 at baseline)
    scen-options-Priest-53051011: PASS
  verify furniture_detect: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  show_getpos_tip / nhl_text: 0 blocked (vacuous)
```

PASS on HEAD includes D-4218. At this SHA the D-log claimed "moved past
to save_dungeon step 111", which is consistent. The diff has no seed,
step or coordinate reads. The D-log lists green 2/2, strict ×2, cohort
7/7, full 44/44 and sweep 710/710 REACH-OK.

## Actionable C-wrongs

None. The shared per-caller-menucolor debt is in review 3056.

Verdict: **ACCEPT**
