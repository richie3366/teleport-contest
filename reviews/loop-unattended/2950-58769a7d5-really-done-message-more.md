# Review 2950 — 58769a7d5 — really_done pages WIN_MESSAGE before the tombstone

- SHA: `58769a7d5` (cliff, board owner `look_here`, 2 rows)
- D-entry: D-4110; Ledger: really_done ported
- `js/` diff: `js/end.js` +6

## Intent vs deliverable

Promise: C really_done calls `display_nhwindow(WIN_MESSAGE, TRUE)`
before tearing down the windows. JS skipped it, so a NEED_MORE line left
by savebones never got its --More--. The chain was drop_upon_death
revoking an invoked Levitation artifact → float_down → pickup →
look_here «There are several objects here.», and then JS went straight
to the RIP window. Diff: one `await display_nhwindow_message()` after
`free_pickinv_cache()`. Promise = diff.

## Inventory

- `really_done` window cleanup — end.js:1366–1370; C end.c :1374–1387.
- Callee `display_nhwindow_message` — display.js:3408. LIVE (NEED_MORE →
  remember_topl, more(), re-set NEED_MORE, clear_nhwindow_message;
  else mark_topline_empty).

## C ↔ JS fidelity

```c
if (have_windows) {
    wait_synch();
    free_pickinv_cache();
    if (WIN_INVEN != WIN_ERR) { destroy_nhwindow(WIN_INVEN), …; }
    display_nhwindow(WIN_MESSAGE, TRUE);         /* end.c :1384 */
    destroy_nhwindow(WIN_MAP), …
```

The JS call sits right after free_pickinv_cache, which is C's order
(WIN_INVEN destruction has no visible effect in tty here). C's
`have_windows` guard is always true in a recorded session. The callee's
NEED_MORE arm is the tty NHW_MESSAGE display arm: more(), then the
clear. Its EMPTY arm only resets state with no wipe, as in C's
non-NEED_MORE path. No RNG.

The JS comment cites `:1383` for the call. The pinned line is `:1384`.
That is an off-by-one cite, not a code issue.

## Hallucinations / overclaim

None. The owner label `look_here` is the symptom printer. The D-log
names the real writer (really_done's missing window step).

## Density

A one-line C statement that unblocked two sessions. Small but
session-reaching, and from the generated queue.

## Verification

```text
verify look_here (--base 58769a7d5~1): 7 blocked
  scen-sweep-Tourist-49956023: PASS
  scen-wish-Barbarian-49959107: PASS
  5 × scen-symset-*: still look_here (parked D-3946, TOOLING-LIMIT)
verify look_here: 2 PASS, 0 moved past, 5 unchanged, 0 worse → PROGRESS
verify really_done: 0 blocked
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
