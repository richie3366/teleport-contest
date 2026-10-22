# Review 3049 — d3187d477 — ^X attributes page loop follows process_menu_window

- SHA: `d3187d477` (off-queue: cliffs and Must-fix empty after D-4208;
  this is the lead D-4207 named while probing)
- D-entry: D-4209; Ledger: enlightenment split
  js=invent.js:enlightenment+invent.js:doattributes
- `js/` diff: invent.js +35 −4

## Intent vs deliverable

Promise: insight.c enlightenment shows the in-game ^X attributes through
select_menu(PICK_NONE) (`:451–460`), so tty process_menu_window's keys
apply. Return finishes, space pages and finishes on the last page, and
`>` `<` `^` `|` turn pages (`:1604–1649`). JS doattributes kept an
inline loop that took only space/CR/LF/ESC, with Return advancing a
page, so `^X >` stayed on «(1 of 3)» where C shows «(2 of 3)». The
fullscreen loop now follows C's switch and repaints only when the page
changes.

Diff: in doattributes' fullscreen branch (`offx === 0`), the
`for (p…) { paint; if (await waitMenuKey()) break; }` loop becomes a
`for (;;)` with a `newPage` flag. Keys go through `map_menu_cmd`.
ESC/CR/LF break. Space and `>` advance, and space breaks on the last
page. `<`, `^` and `|` go to the previous, first and last page. Any other
key just loops. The corner (single-page) branch keeps `waitMenuKey`. The
header comment was rewritten to cite the C path. The promise matches the
diff.

## Inventory

- doattributes fullscreen page loop — js/invent.js:8964–9012 (C
  insight.c enlightenment `:382–463`, menu arm `:451–460`; wintty.c
  process_menu_window `:1395–1649`; getline.c xwaitforspace `:229–257`).
- Callees: map_menu_cmd (options.js:14181, LIVE, already imported),
  MENU_FIRST/LAST/NEXT/PREVIOUS_PAGE (invent.js:134–137 imports; C
  wintype.h `:151–154` `^ | > <`), paint_overlay and flush_screen
  (unchanged). No symbol deleted. `waitMenuKey` is a function-local
  lambda that is still used by the corner branch:

```text
node scripts/sym.mjs map_menu_cmd
map_menu_cmd     js/options.js:14181   sync
node scripts/sym.mjs waitMenuKey
waitMenuKey      NOT FOUND in js/** (no export, no local function/const).   [local const lambda, invent.js:8963; not indexed]
node scripts/sym.mjs select_menu_pick_none
select_menu_pick_none js/invent.js:3404   ASYNC — await required
```

## C ↔ JS fidelity

C (wintty.c, PICK_NONE, resp = `" 0123456789\033\n\r"` + mapped + default
menu cmds):

- New page (`page_start == 0`): clear the screen, paint the page, then
  `dmore(cw, resp)`, which paints the morestr and calls xwaitforspace.
  JS: when `newPage` is set, it paints the chunk + morestr and flushes,
  then the next iteration reads the key. That is the same order.
- Same page (`:1548–1551`): the cursor goes back and xwaitforspace runs
  with no repaint. JS: `!newPage` reads a key without repainting. ✔
- xwaitforspace: `\n`/`\r` break with morc 0, and ESC sets morc `\033`.
  Keys in resp are returned. Other keys bell and keep waiting. JS:
  unlisted keys `continue` without painting, so the screen is the same.
- `\0`/`\n`/`\r` → finished (`:1616–1620`). JS breaks on 13/10. ✔
- `' '`/MENU_NEXT_PAGE (`:1622–1631`): advance unless on the last page,
  where only `' '` finishes. JS: `p < pageCount-1 → p++`, else break
  only on 32. ✔
- MENU_PREVIOUS_PAGE / FIRST / LAST (`:1632–1649`): these change the page
  only when it differs, so no repaint happens otherwise. JS guards
  `p > 0` / `p < pageCount-1` the same way. ✔
- MENU_SEARCH on PICK_NONE bells (`:1700–1703`), default bells
  (`:1737–1741`). JS: stays. ✔
- **ESC after a count (`:1564–1602`, `:1604–1614`) is not C.** A digit
  sets `counting = TRUE, reset_count = FALSE`, so the next ESC only
  "stops count" and the menu stays. JS breaks on every ESC, so `^X 5 ESC`
  closes the window in JS while C keeps page 1. The D-log names counts as
  "change nothing on screen … not modelled beyond 'stay'". That holds for
  the digit itself but is wrong for the digit+ESC pair. The same gap is
  in the shared select_menu_pick_none (invent.js:3451–3457) and in the
  corner branch's waitMenuKey. Unreached: no corpus session presses a
  digit inside a PICK_NONE menu.

RNG: none (menu I/O only). en_via_menu = `!final` (insight.c `:390`).
The final-disclosure path (display_nhwindow) is untouched, as stated.

Clone note: doattributes now holds a third inline copy of
process_menu_window's PICK_NONE switch, beside select_menu_pick_none and
the corner lambda, instead of routing through the shared export. Its key
semantics match select_menu_pick_none except that it skips the C no-op
repaints, which select_menu_pick_none does on `^` at page 0 /
`|` on the last page. The two copies keep the count/ESC gap above.

## Hallucinations / overclaim

The Named-omission line understates the count gap (see above). Nothing
else: the probe table (6 key strings, C vs JS SAME at
scen-worldtour-Wizard-610136 step 360) is a direct C measurement.

## Density

Off-queue. This is the "Possible lead" from D-4207, a successor lead in
§10.19's words, shipped when the cliffs block and Must-fix were empty.
Verify shows no corpus row moving (vacuous at the parent, see below). By
the letter of §10.19 that is QUALITY-RISK, with the Must-fix row being
"the session-reaching work, if any, else none". There was none: the block
was empty and the next slot was Grow #21. So this review records the slot
cost and the §10.19 breach as debt, not as a Must-fix. The caller may
upgrade the verdict. The C itself is right on every key a corpus session
plausibly sends (`^X` then space/Return/`>`), and the probes prove it
against C.

## Verification

```text
node scripts/hidden-proxy.mjs verify doattributes,enlightenment --base d3187d477~1 --no-reach
verify doattributes: no corpus session is blocked on it at d3187d477~1 — a vacuous verify is NOT a corpus PASS.
verify enlightenment: no corpus session is blocked on it at d3187d477~1 — vacuous.
Rule #2: imports.mjs --rulecheck clean (HEAD, review 3047)
```

The diff contains no FORCE/DIAG/getRngLog/seed/fastforward reads. The
D-log shows the probes, REACH-OK, green 2/2, strict ×2, cohort 7/7, full
44/44 and `sweep moveloop_core` 673 with 0 regressed. Since ^X appears
in many corpus sessions, the sweep line is the meaningful guard, and the
audit's final rescore re-checks it.

## Actionable C-wrongs

1. **Must-fix (queued by the audit).** wintty.c process_menu_window
   `:1604–1614`: ESC while `counting` only stops the count. JS
   doattributes' fullscreen loop, its corner `waitMenuKey`, and
   select_menu_pick_none (invent.js:3451) all finish on ESC after a
   digit. Fix: track `counting/reset_count` as C `:1395–1399/1601`, or
   route doattributes through select_menu_pick_none once that has it.

Audit note (2026-10-22): the reviewer recorded ACCEPT-WITH-DEBT and asked
for a ruling. Under §10.19 an off-queue commit with no corpus movement is
QUALITY-RISK even when its C is right, and item 1 is a review-named
C-wrong, which is eligible for Must-fix. The verdict is raised to
QUALITY-RISK, and item 1 is prepended to LOOP-QUEUE Must-fix.

Verdict: **QUALITY-RISK**
