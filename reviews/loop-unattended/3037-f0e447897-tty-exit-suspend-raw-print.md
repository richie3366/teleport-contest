# Review 3037 — f0e447897 — tty_exit_nhwindows does tty_suspend_nhwindows' raw_print("")

- SHA: `f0e447897` (D-4196 follow-up; the same two rows,
  scen-sweep-Rogue-51650031 frame 838 and scen-sweep-Wizard-95340 frame
  1044, cursor C [0, 454000240] vs JS [0, 454000239])
- D-entry: D-4197; Ledger: tty_exit_nhwindows ported
- `js/` diff: cmd.js +6 −2

## Intent vs deliverable

Promise: wintty.c tty_exit_nhwindows starts with
`tty_suspend_nhwindows(str)`, which ends `if (!str) tty_raw_print("")`
(`:808–813`). The recorder skips an empty raw print while ttyDisplay is
up and raw mode is off. After an overflow set raw_active, it advances
the raw row. JS skipped the call. The commit also corrects D-4196's
Verify bullet.

Diff: `void str;` becomes `if (!str) tty_raw_print('');` at the head of
tty_exit_nhwindows, and `tty_raw_print` joins the display.js import.
The promise matches the diff.

## Inventory

- tty_exit_nhwindows — cmd.js:322–343 (C wintty.c:810–867; suspend
  `:806–813`).
- tty_raw_print — display.js:9655, existing, new import.

## C ↔ JS fidelity

C `:806–813`:

```c
void tty_suspend_nhwindows(const char *str) {
    term_curs_set(1);
    settty(str); /* calls end_screen, perhaps raw_print */
    if (!str)
        tty_raw_print(""); /* calls fflush(stdout) */
}
```

The JS call sits before tty_display_free (`:339`), so ttyDisplay is
still alive, as in C: the free comes at `:863–864`, after the suspend.
JS tty_raw_print then bumps `_tty_rawprint`, and nomux_raw_emit returns
early on `""` unless raw mode is active. That is exactly the recorder's
gate. So every non-overflow game is unchanged, and an overflowed game
gets the +1 row.

Order note: C clears (settty) **then** raw-prints. JS raw-prints inside
tty_exit_nhwindows and the caller clears after (really_done, see
review 3036). An empty raw print paints no cell, and the grid clear does
not touch the raw row/col statics, so the swap changes no captured
frame. The cursor-only rows now PASS, which confirms this. The named
omission (settty's `if (s) raw_print(s)` for a non-NULL str) is true:
every JS caller passes null (end.js:1114, :1410, :1419; cmd.js:358
exit_nhwindows forwards str, and its one caller, cmd.js:388, passes
null). C's one non-NULL caller, dosave's «Be seeing you...», is
modelled by save.js:1466 on its own path.

## Hallucinations / overclaim

None. The commit openly corrects the previous SHA's false PASS (frozen
runner vs hidden-worker), which is the behaviour the loop wants. That
lesson is already in memory (frozen runner skips the final frame).

## Density

One call on the one remaining writer. Right-sized.

## Verification

```text
verify tty_exit_nhwindows --base f0e447897~1 --no-reach
  tty_exit_nhwindows: 0 blocked (vacuous; rows unattributed)
hidden-worker on HEAD (scores the final frame):
  scen-sweep-Rogue-51650031 true · scen-sweep-Wizard-95340 true ·
  scen-container-Barbarian-94326 true
```

The window's single full rescore re-checks both rows.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
