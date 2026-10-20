# Review 3001 — 1dfeae837 — swallowed(1) runs the full cls on the gulp path

- SHA: `1dfeae837` (cliff; board head gulpmu, 2 symset sessions, 99
  screens; writer display.c swallowed)
- D-entry: D-4161; Ledger: swallowed ported
- `js/` diff: display.js +10 −20, mhitu.js, allmain.js, monmove.js,
  potion.js (one `await` each)

## Intent vs deliverable

Promise: C swallowed(1) starts with `cls(); bot();`. gulpmu calls
swallowed(1) directly (mhitu.c:1396), so the physical map clear has to
live inside swallowed, not in docrt's swallow arm. JS kept the async cls
in docrt and only wiped the glyph buffer in swallowed, so the gulp path
left pre-engulf cells on screen around the stomach box.

Diff: swallowed becomes `async`, and its first arm is `await cls(); void
bot();`. docrt_flags' swallow arm shrinks to `await swallowed(1)`.
gulpmu awaits swallowed(1). Three async swallowed(0) callers gain an
`await`. The promise matches the diff.

## Inventory

- swallowed — display.js:6931 (C display.c:1331–1386), now async.
- docrt_flags swallow arm — display.js:7304 (C :1726–1728).
- gulpmu — mhitu.js:1806 (C :1396).
- swallowed(0) awaits: allmain.js:1483 (C allmain.c:461), monmove.js:1874
  (C :1654), potion.js:1210 (C :421).

`sym.mjs swallowed` → `js/display.js:6931 ASYNC — await required`, one
def. The two unawaited callers are artifact.js:1107 (set_artifact_intrinsic,
sync) and makemon.js:1903 (C mon.c:5438, sync).

## C ↔ JS fidelity

C swallowed, `first` arm: `cls(); bot();`. Otherwise it clears the old 3×3
to GLYPH_UNEXPLORED, then draws the 8 stomach cells and display_self. The
JS first arm is now `await cls()` (display.js:9250): it handles a pending
NEED_MORE with more() (C's display_nhwindow(WIN_MESSAGE)), sets botlx,
clears the screen unless erasing_tty_screen (C tty_clear_nhwindow NHW_MAP),
then clear_glyph_buffer. That is C cls without its `in_cls` re-entrancy
guard. The guard is missing already at the parent, and nothing in this
diff re-enters cls. `void bot()` is unchanged from the parent.

The only `await` in swallowed is in the first arm. So swallowed(0) still
runs to completion synchronously, and the two unawaited sync callers keep
their exact behaviour. They are not floating promises that reorder output.

csym `--callers swallowed`: allmain.c:461, display.c:1727, mhitu.c:1396,
mon.c:5438, monmove.c:1654, potion.c:421, and wintty.c:3668 (inside
`#if 0` in docorner, so not live). Every live C caller has its JS site,
and both swallowed(1) sites await it.

A behaviour change to note: on the gulp path, cls can now raise a
`--More--` for a pending message before the box is drawn. That is C's
order (display_nhwindow → more), and both probe sessions pass with it.

## Hallucinations / overclaim

None. The old comment in swallowed said the physical clear "rides along"
through the dirty cells. The D-log shows that claim was false; this
commit removes it.

## Density

Head writer, whole function, ~30 lines. Right-sized.

## Verification

```text
verify gulpmu,swallowed --base 1dfeae837~1 --no-reach
  gulpmu: 2 PASS (scen-symset-Priest-51050015, scen-symset-Tourist-50255025) → PROGRESS
  swallowed: 0 blocked (vacuous; the row's owner is gulpmu)
```

This reproduces the D-log claim. Public 44/44 at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
