# Review 3012 — 6166352ec — a fortune ending in a literal --More-- keeps the cursor on the hero

- SHA: `6166352ec` (cliff; board rows scen-trek-Monk-50850075 s319,
  owner readobjnam_postparse1, and scen-sweep-Rogue-50055025 s64,
  owner-null; one screen lost each)
- D-entry: D-4172; Ledger: flush_screen ported
- `js/` diff: display.js +5 −1, jsmain.js +1 −1

## Intent vs deliverable

Promise: two rumors.fal fortunes end in the text `--More--` (`:389`
«You choke on the fortune cookie.  --More--», and the Amulet one). C
prints them as plain plines and no more() runs, so the next flush puts
the cursor on the hero. JS's flush painter and the capture hook both put
the cursor on the topline whenever the text ended in `--More--`.

Diff: the painter's arm is now gated on `_tty_inmore`. The capture
hook's `--More--` arm is dropped and its `Count:` arm kept. The promise
matches the diff.

## Inventory

- _buildScreenOutput — display.js:8164 (flush_screen painter; C
  display.c flush_screen → curs_on_u, topl.c more `:205–248`): one
  condition added.
- captureBoundary — jsmain.js:340 (recorder marker hook): one disjunct
  removed.

## C ↔ JS fidelity

C more() (topl.c:205–248):

```c
ttyDisplay->inmore++;
if (ttyDisplay->toplin) { tty_curs(BASE_WINDOW, cw->curx + 1, cw->cury); … }
putsyms(defmorestr);
xwaitforspace("\033 ");
… ttyDisplay->inmore = 0;
```

The only place tty leaves the cursor after a `--More--` is between
putsyms and xwaitforspace, with `inmore` set. Everywhere else,
flush_screen(1)'s curs_on_u wins. `_tty_inmore` is JS's mirror of
`ttyDisplay->inmore` (reset in reset_display_messages, set in JS
more()). So the gated arm covers exactly C's window. A message whose
text merely ends in `--More--` now falls through to the hero cursor, as
in C.

The capture-hook arm read row 0 text, a heuristic with no C
counterpart. Dropping it relies on JS more() placing the cursor itself.
The public 44/44 and the 671 corpus PASS rows at the time confirm
nothing else depended on it.

## Hallucinations / overclaim

None. The text-based `\n--More--` arms (painter and
_paintToplineOnly) are still heuristics on message text. The D-log names
them and says no corpus row reaches them with a literal `--More--`.

## Density

Two lines for a measured two-writer cause, each writer named by a
separate measurement (dropping the hook arm alone still left [42,0]).
Right-sized.

## Verification

```text
verify readobjnam_postparse1,flush_screen --base 6166352ec~1 --no-reach
  readobjnam_postparse1: 1 PASS (scen-trek-Monk-50850075) → PROGRESS
  flush_screen:          0 blocked (vacuous)
frozen ps_test_runner .cache/hidden/sessions/scen-sweep-Rogue-50055025
  (owner-null row): PASS, 1444/1444 screens, 38194/38194 RNG
```

Both rows of the claim reproduce.

## Actionable C-wrongs

None. The remaining text-keyed cursor arms are named debt with no
session reaching them.

Verdict: **ACCEPT**
