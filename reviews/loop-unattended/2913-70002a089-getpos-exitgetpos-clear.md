# Review 2913 — 70002a089 — getpos exitgetpos `if (msg_given) clear_nhwindow`

- SHA: `70002a089` (cliff, writer port: exit funnel + 3 msg_given writes)
- D-entry: D-4072; Ledger: getpos.c (`getpos`, D-4072)
- `js/` diff: `js/getpos.js` +9/−3

## Intent vs deliverable

Promise: JS pick arms returned before C's `exitgetpos` clear, so with
autodescribe off the travel/getpos prompt stayed on the topline after
the pick (28 sessions → FULL PASS). The diff:
- (a) adds `if (msg_given) clear_nhwindow_message()` to the `finally`
  funnel;
- (b) sets `msg_given = false` in both «Done.» arms;
- (c) makes ESC set `msg_given = true` in place of a `_pending_message`
  blank;
- (d) removes the queued-non-key arm's blank.

Promise = diff.

## Inventory

- `getpos` — getpos.js:1408–1870. C: getpos.c getpos (csym body;
  exitgetpos label + clear at the tail).
- `clear_nhwindow_message` — display.js:3344 (tty_clear_nhwindow
  NHW_MESSAGE port, pre-existing).

## C ↔ JS fidelity

C (csym getpos.c getpos, loop head + tail):

```c
        if ((cmdq = cmdq_pop()) != 0) {
            if (cmdq->typ == CMDQ_KEY) c = cmdq->key;
            else { cmdq_clear(CQ_CANNED); result = -1; goto exitgetpos; }
            ...
        if (iflags.autodescribe)
            msg_given = FALSE;
        if (c == gc.Cmd.spkeys[NHKF_ESC]) {
            cx = cy = -10;
            msg_given = TRUE; /* force clear */
            result = -1;
            break;
        }
        ...
            pline("Done.");
            msg_given = FALSE; /* suppress clear */
 exitgetpos:
    lock_mouse_buttons(FALSE);
    if (msg_given)
        clear_nhwindow(WIN_MESSAGE);
```

JS now matches each write: initial `true` (:1412); verbose help `true`
(:1436); `autodescribe → false` after the key read (:1536); ESC `true`
(:1541); both «Done.» `false` (:1567, :1673 and the :1839 arm); the
gloc/menu arms `true` (:1713–1824 unchanged). The `finally` is the
single exit for all returns, so the clear runs exactly where C's label
does, after `lock_mouse_buttons(false)`. The queued-non-key arm now
reaches it with `msg_given` as is, like C's `goto exitgetpos`. The
removed `_pending_message = ''` blanks were a JS stand-in that cleared
regardless of `msg_given`, which is not C.

## Hallucinations / overclaim

None. The D-log says plainly that `verify getpos` is NO MOVEMENT. The
4 getpos-owned rows are the terrain-view prompt shape, and the fixed
rows are owner-null, which the per-fn verify cannot see. It gives a
direct re-score of all 30 (28 PASS + 2 later owners). That is not
"NO MOVEMENT sold as a named omission": the movement exists on the
owner-null rows, and this audit's full rescore checks it.

## Density

Whole exit path of the C function. One `Ledger:` entry. No unreached
work.

## Verification

Re-measure (`--base 70002a089~1 --no-reach`):

```text
verify getpos: 4 blocked
  scen-sweep-Caveman-50055035 s885, scen-sweep-Priest-50556014 s308,
  scen-tour-Healer-51152023 s60, scen-chain-Monk-50450082 s195:
  still getpos («Showing known terrain…» / «(For instructions…)» shape)
verify getpos: 0 PASS, 0 moved past, 4 unchanged, 0 worse → NO MOVEMENT
```

This is an exact match with the D-log's stated NO MOVEMENT on the owned
rows. The owner-null movement can't be re-measured by fn. The audit's
full rescore (873 scored) has 0 PASS→FAIL against the HEAD board, which
already carries the D-4072 re-scored PASS rows. So none of them fell
back. I did not re-derive the list of 28 rows by hand.
There were no FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

None. (The terrain-view prompt rows are the next getpos shape, already
on the board as getpos-owned.)

Verdict: **ACCEPT**
