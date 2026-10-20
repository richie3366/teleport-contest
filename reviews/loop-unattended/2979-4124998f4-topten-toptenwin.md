# Review 2979 — 4124998f4 — topten into an NHW_TEXT window under toptenwin

- SHA: `4124998f4` (near-pass cliff; board owner wintty.c
  process_menu_window, writer topten.c topten + end.c really_done)
- D-entry: D-4139; Ledger: topten ported; really_done ported
- `js/` diff: `js/topten.js` +41/−17, `js/end.js` +9/−1

## Intent vs deliverable

Promise: with `iflags.toptenwin`, topten writes its lines into an
NHW_TEXT window shown with `display_nhwindow(…, TRUE)` (dmore, so
«--More--» on row 23), and really_done then calls `exit_nhwindows`, which
clears the screen. JS always drew the raw `!toptenwin` panel. Diff:
topten is async. Both line sources (wizard / explore «Since you were in
… mode» and the outentry panel) go to a new `topten_showwin`
(show_text_pages with ATR_BOLD for topten_print_bold) when toptenwin is
on. really_done awaits topten and, under toptenwin, calls
tty_exit_nhwindows and clears the display. Promise = diff.

## Inventory

- `topten` — topten.js:830; C topten.c:628–926 (create :655–658,
  showwin :908–917, destroywin :919–925).
- `topten_showwin` — topten.js:~1040 (new; C showwin + destroywin).
- `really_done` tail — end.js:1388–1399; C end.c:1579–1589.
- `sym.mjs`: `topten js/topten.js:830 ASYNC`, `show_text_pages
  js/pager.js:251 ASYNC`, `tty_exit_nhwindows js/cmd.js:321 sync`.
  Single JS caller (end.js:1391) awaits. C has one caller, end.c:1581.

## C ↔ JS fidelity

```c
if (have_windows && !iflags.toptenwin)
    exit_nhwindows((char *) 0), have_windows = FALSE;      /* :1579 */
topten(how, endtime);
if (have_windows) exit_nhwindows((char *) 0);              /* :1581–1582 */
...
if (!done_stopprint) { if (iflags.toptenwin) display_nhwindow(gt.toptenwin, TRUE); }
```

The toptenwin order matches: window up through topten, exit afterwards.
The `done_stopprint` gate moved to the right place. C topten_print's raw
path is not gated, while showwin is, and JS keeps the raw panel ungated
and the window gated. The `!toptenwin` side still has no
`exit_nhwindows` before topten (C :1579). JS stands for that with
tty_exit_nhwindows painting nothing (D-1831), and every public session
that ends in a raw topten passes (44/44 this audit). The D-log names it.

## Hallucinations / overclaim

None. The new clear in really_done is gated on toptenwin, standing in
for settty → term_end_screen. The D-log says so, and says other
exit_nhwindows callers keep their own handling.

## Density

Whole toptenwin arm of topten plus the really_done ordering.

## Verification

```text
verify process_menu_window (--base 4124998f4~1): options-Monk-50355038 PASS,
  options-Priest-50162016 PASS
verify topten / really_done: 0 blocked
```

Exact match with the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
