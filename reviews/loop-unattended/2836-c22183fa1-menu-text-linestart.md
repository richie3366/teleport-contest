# Review 2836 — c22183fa1 — menu-text UTF8 linestart in show_nhw_menu_text

- SHA: `c22183fa1` (D-3991)
- Files: `js/pager.js` (+30/−9, 2 loops), focused test
  `scripts/menu-text-utf8-linestart.test.mjs` (new, 127 lines)
- Method: cliff writer (1 C arm × 2 paint loops); whole Method.
- Cites: C `wintty.c:1796–1831` (process_text_window),
  `:1943–1946` (routing), `invent.c:4295` — read directly
  (note: file is `win/tty/wintty.c`, not `src/`).

## Intent vs deliverable

Promise: 4 Enhanced symset sessions show C «hings that are here:» vs
JS «Things…» — the D-3977 linestart arm, but in `show_nhw_menu_text`
(putstr-only NHW_MENU), not `show_text_pages`. Fix: hoist
`utf8Handling`, compute `dropFirst` in both paint loops, start at
index 1, shift 1-char lines right, align the corner right-edge bound.
Diff: exactly the hoist + two loop rewrites. Promise and diff agree.

## Inventory

- `show_nhw_menu_text` fullscreen loop — `js/pager.js:704` vs C
  `:1806–1831` (offx=0 leg). Status: dropFirst added.
- `show_nhw_menu_text` corner loop — `js/pager.js:735` vs C
  `:1796–1831` (offx leg). Status: dropFirst + bound fix.

## C ↔ JS fidelity

C, verified line by line:

- Routing `:1943–1946`: `if (cw->data || !cw->maxrow)
  process_text_window else process_menu_window` ✓ — putstr-only
  NHW_MENU (cw->data, as the invent.c:4295 menu: `putstr` ×3 into
  NHW_MENU ✓) runs this arm, not the menu painter. The path claim
  holds.
- Linestart `:1819–1829`: first char via `g_putch` iff
  `SYMHANDLING(H_UTF8)` (`:1820–1822`) or high-bit (`:1823–1825`),
  else putchar ✓ — the JS predicate (`utf8Handling || charCodeAt(0)
  & 0x80`, same as D-3977's ACCEPTed `:278`) is exactly this branch
  condition. The hook mechanics (text[0] lands one cell right,
  covered by text[1]'s hook) were verified end-to-end in review 2822;
  same arm, same recorder, sibling JS path — and the cell measurement
  corroborates (« pony corpse», offx+1 blank, dmore intact).
- Right-edge bound: C `:1810` paints text[i] iff `++curx < cols`
  with curx starting at offx+1 (after the `:1804–1805` space) → iff
  `offx+2+i < cols` ✓ — the new bound matches C exactly; the old
  `offx+1+i < cols` painted one char too many at the edge.
- 1-char lines: C's lone g_putch lands one cell right with no cover
  → JS paints text[0] at offx+2 / col 1 ✓ consistent.
- Net effect = text[0] dropped, rest in place: «hings that are here:»
  ✓; non-dropFirst rows byte-identical to before (loop start 0,
  same cells) except the 1-char right-edge column C never paints.
- H_UTF8 already imported (`:121`), no new edge ✓. Footer untouched
  (own dmore path, below the loops) ✓. Attrs (`data[i][0]-1`) and
  multibyte-first-char correctly NAMED, not shipped ✓. No RNG on the
  path. No symbol deleted or re-pointed → `sym.mjs` N/A. Diff grep
  clean.

## Hallucinations / overclaim

None. The Monk-50059011 "js-throw" label is proven quirk: `show`
gives error null, jsPanic null, owner null, screen @451 — the
null-owner fallback, and the step moved 379→451 regardless.

## Density

Cliff head of its parent (`look_here`, Must-fix empty) ✓. One arm,
both loops, `Ledger:` entry touched (`wintty.c.jsonl`), focused test
1/5→5/5 (+ D-3977 suite kept 9/9), manual full 44/44 (pager.js not
script-shared, same standing as D-3977) ✓. The 7 no-movement sessions
are itemized per-writer with a spurious-owner proof, not waved.

## Verification

Ship-time: `verify look_here: 5 PASS (4 hings + Priest-50455058), 1
moved (Monk 379→451), 7 unchanged, 0 worse`.
Re-measure (`verify look_here --base c22183fa1~1 --no-reach` on HEAD):
`5 PASS, 1 moved past, 7 unchanged, 0 worse → PROGRESS` — identical
sessions. Exact match. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
