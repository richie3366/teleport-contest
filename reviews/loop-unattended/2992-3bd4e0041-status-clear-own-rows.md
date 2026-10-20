# Review 2992 — 3bd4e0041 — new_status_window clears only the window's own rows

- SHA: `3bd4e0041` (Must-fix from audit 2983–2991: scen-symset-Monk-50255053,
  an archived PASS→FAIL bisected to D-3993 `384c02413`)
- D-entry: D-4152; Ledger: new_status_window ported
- `js/` diff: js/botl.js +17 −11

## Intent vs deliverable

Promise: wintty.c new_status_window clears the status window twice,
before the destroy (`:496`, old geometry) and after tty_status_init
(`:503`, new geometry), and each clear blanks only that window's rows.
JS blanked screen rows 21–23 every time. A 2-row window therefore also
wiped map row 20, and a rejected `statuslines:6` erased a `#` that C keeps.

Diff: a module `statusWinRows` is set in tty_status_init.
clear_status_window blanks rows `24 − statusWinRows .. 23`, and
new_status_window now calls it before the WIN_ERR assignment and again
after init. The promise matches the diff.

## Inventory

- `new_status_window` — botl.js:1171–1189; C wintty.c:489–507.
- `clear_status_window` (static, JS-only name for the
  tty_clear_nhwindow NHW_STATUS arm) — botl.js:1200–1209; C
  wintty.c:1059–1073.
- `tty_status_init` — botl.js:370–372 (one added line).
- Callers: options.js preference_update → new_status_window (C :602,
  live). winch_handler (C :431) has no JS resize path and stays named in
  the ledger note.

`sym.mjs`: `clear_status_window` NOT EXPORTED, 1 local def (botl.js:1200),
the only tty_clear_nhwindow-status body in js/. `statusWinRows` is a new
module `let`, with no other definition.

## C ↔ JS fidelity

C new_status_window: `if (WIN_STATUS != WIN_ERR) { tty_clear_nhwindow;
destroy; WIN_STATUS = WIN_ERR }`, then genl_status_finish,
tty_status_init, tty_clear_nhwindow, status_initialize(REASSESS_ONLY).
The JS runs the same calls in the same order.

C NHW_STATUS clear: for `i < cw->maxrow`, `tty_curs(window, 1, i);
cl_end()` at the window's `offy`, data to spaces, `disp.botlx = TRUE`.
tty_create_nhwindow sets `offy = min(LI − wc2_statuslines, ROWNO+1)` and
`maxrow = wc2_statuslines` (wintty.c:905–912). On a 24-row tty, rows
22–23 belong to a 2-line window and rows 21–23 to a 3-line one. JS's
`24 − rows` gives the same rows. The first clear reads the old
`statusWinRows`, because tty_status_init has not yet run, so a 3→2
shrink still blanks row 21 the way C's first clear does. The JS
`disp.botlx` is set by status_initialize, as noted. The clear draws no
RNG. The `erasing_tty_screen` gate is never true on this path.

## Hallucinations / overclaim

None. The old comment's "the map repaints row 21 at menu teardown" was
the false assumption, and this commit deletes it.

## Density

The Must-fix, alone, on its writer. Small and whole.

## Verification

```text
verify optfn_statuslines,new_status_window --base 3bd4e0041~1 --no-reach
  optfn_statuslines: 1 PASS (scen-symset-Monk-50255053) → PROGRESS
  new_status_window: 0 blocked (vacuous; owner is optfn_statuslines)
```

This reproduces the D-log's claim (864/864). The D-log's sweep of 365
archived «statuslines» sessions is not re-run here, because the full
rescore covers the active tier.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
