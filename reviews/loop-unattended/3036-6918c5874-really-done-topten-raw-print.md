# Review 3036 — 6918c5874 — really_done exits the windows before a raw topten; nh_terminate stops the caller

- SHA: `6918c5874` (cliff; the two `unattributed` cliffs rows:
  scen-sweep-Rogue-51650031 s838, scen-sweep-Wizard-95340 s1044, C blank
  final frame vs JS «Since you were in wizard mode…»)
- D-entry: D-4196; Ledger: topten_print, topten_print_bold,
  tty_exit_nhwindows, really_done ported; tty_raw_print(_bold) partial
- `js/` diff: topten.js +15 −25, display.js +30 −2, end.js +25 −2,
  cmd.js +4 −2, jsmain.js +3 −1

## Intent vs deliverable

Promise: with toptenwin off, end.c really_done calls exit_nhwindows
**before** topten (`:1579–1580`), so topten_print's raw_print lines go
out with ttyDisplay freed into the recorder's raw shadow, which keeps a
prior overflow's raw row. JS painted its own panel. nh_terminate never
returns, so the dying caller must not run on.

Diff, function by function:

- really_done: `!toptenwin` → `tty_exit_nhwindows(null)` + clearScreen
  before topten. After it, `throw new NhTerminate()`.
- render_topten_lines: one `tty_raw_print` / `tty_raw_print_bold` per
  line. Bold lines are padded to COLNO-1.
- raw_print_blanks: `n` real `tty_raw_print('')` calls.
- display.js: `tty_display_free` / `tty_display_alive` model
  `ttyDisplay`, reset per game. tty_raw_print and nomux_raw_emit test
  it. New `tty_raw_print_bold`.
- cmd.js tty_exit_nhwindows calls tty_display_free. jsmain.js
  runSegment returns on NhTerminate.

The diff delivers every item.

## Inventory

```text
render_topten_lines NOT EXPORTED — 1 LOCAL CLONE: js/topten.js:627
raw_print_blanks    js/topten.js:645    sync
tty_raw_print_bold  js/display.js:9668  sync
tty_display_free    js/display.js:9576  sync
```

render_topten_lines is the JS folding of C topten_print +
topten_print_bold (topten.c `:165–181`) for the WIN_ERR arm. It is gated
by `toptenwin` at both callers (:851–856, :1028–1029). The toptenwin arm
stays topten_showwin, so it is a verified CLONE, not drift.

## C ↔ JS fidelity

C really_done `:1579–1589`:

```c
if (have_windows && !iflags.toptenwin)
    exit_nhwindows((char *) 0), have_windows = FALSE;
topten(how, endtime);
if (have_windows) exit_nhwindows((char *) 0);
if (done_stopprint) { raw_print(""); raw_print(""); }
nh_terminate(EXIT_SUCCESS);
```

JS end.js:1409–1427 has the same order. `have_windows` is not modelled:
JS reaches really_done only with windows up, as before.
C tty_raw_print_bold (wintty.c `:4021–4040`): it bumps
`ttyDisplay->rawprint`, else `raw_printed` for a non-empty string, then
prints standout text. JS has the same counters and emits through the
shadow with bold. The named omission (HUPSKIP, vt codes, real stdout
bytes) is accurate. nh_terminate → NhTerminate: there are no `.catch(`
sites in js/. The 4 catch-alls that swallow everything (do.js:578
catch_lit, :1030 bury_objs, :1793 reset_trapset, makemon.js:356 edog
copy) wrap nothing that can reach done(). So the throw always reaches
runSegment, like NhPanic.

Structure debt: C's settty → term_end_screen → term_clear_screen lives
inside tty_exit_nhwindows (via tty_suspend_nhwindows). JS writes
`clearScreen()` at both really_done call sites instead. The panic
caller (end.js:1114) gets no clear, but nothing is captured after its
getret (D-4103), so this is unobservable today.

## Hallucinations / overclaim

**The Verify bullet was false at this SHA.** It cited
`ps_test_runner` 838/838 and 1044/1044 PASS for both rows. The frozen
runner does not score the final nh_terminate frame (memory: frozen
runner skips the final frame). The corpus scorer still failed both on
the cursor (raw row +2 vs C +3). The very next SHA, f0e447897 (D-4197),
found this, corrected this bullet in place and closed it. This is
QUALITY-RISK material, but the Must-fix it would queue has already
shipped in-window, so I record it as an overclaim and do not queue it.

## Density

Five functions on one causal chain (raw topten after window exit), plus
the noreturn model the early exit forced: the scen-container-Barbarian
bot() panic, found and fixed before commit. That is large for one
iteration, but it is one writer chain, and the rows were unattributed.

## Verification

```text
verify topten,really_done,tty_exit_nhwindows --base 6918c5874~1 --no-reach
  all three: 0 blocked (vacuous; the rows were unattributed)
hidden-worker on HEAD (scores the final frame):
  scen-sweep-Rogue-51650031 true · scen-sweep-Wizard-95340 true ·
  scen-container-Barbarian-94326 true
```

On HEAD (with D-4197) the claim now holds.

## Actionable C-wrongs

None outstanding. Debt: move settty's clear into tty_exit_nhwindows so
every caller gets it. It is unreached, so it is not queued.

Verdict: **ACCEPT-WITH-DEBT**
