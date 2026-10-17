# Review 2916 — 08c934715 — flush_screen paints leave gbuf mid-goto_level

- SHA: `08c934715` (cliffs-head goto_level
  writer: leave-gbuf paint)
- D-entry: D-4078; Ledger: display.c
  (`flush_screen ported`)
- `js/` diff: `js/display.js` +11/−1 (comment
  + one `if` in the null-level arm of
  `flush_screen`); new
  `scripts/flush-screen-leave-gbuf.test.mjs`

## Intent vs deliverable

Promise: C's gg.gbuf survives level teardown
so vision_recalc(2)'s leave newsyms reach the
terminal at the next flush (the goto_level
discarded-level impossible More); JS returned
after topline+status on `!game.level`, keeping
stale white paint. Fix: paint the stashed leave
level's dirty cells in that arm; 13/14 FULL
PASS, 1 moved +949. The diff is exactly that
guarded call plus cites. Promise = diff.

## Inventory

- `flush_screen` (display.js:8963–9030):
  null-level arm gains `if
  (!_stale_map_flush && _leave_gbuf_level)
  paint_gbuf_level_to_terminal(...)`. C:
  display.c :2207–2267.
- No import changes, no new helpers. The
  callee is a same-module live function
  (display.js:8325, sync, setCell-only, no
  RNG). No deleted symbols, no re-pointed
  clones — step-3 paste not triggered.

## C ↔ JS fidelity

Confirmed against pinned C:

- flush_screen body (csym :2207–2267):
  suppress/delay/reentrancy guards, bot/
  timebot, the `:2241–2257` gnew-span print
  loop over gg.gbuf, bbox reset, cursor,
  display. The JS live body already carries
  all of these; this commit only extends the
  JS-only null-level early return.
- Mechanism cites verified: do.c:1631
  `vision_recalc(2)` before savelev; `:1650`
  `FREEING` mode savelev (level freed, gbuf
  untouched — gg.gbuf is not levl); `:1696`
  `impossible("goto_level: returning to
  discarded level?")` before mklev();
  pline.c:274–275 flush_screen before
  putmesg; display.c:1088 litcorr→corr
  darkening arm (`S_litcorr` memory + CORR
  → `S_corr`).
- Stash lifecycle pre-existed (`git log -S`:
  D-0583/D-0852/D-3807): do.js:2007 stash,
  do.js:2325 + bones.js:920 clear, bones.js:848
  the yn precedent call. The new call reads
  the same stash in the same window.
- `_stale_map_flush` exclusion preserves the
  D-0852 silent-bones behavior. Cursor-on-hero
  still skipped in this arm — named in the
  D-log as pre-existing early-return shape
  (the More sets its own cursor; no cursor
  diff in any probe).
- Cosmetic only: the ledger note still cites
  `flush_screen:7138` (actual :8963) —
  pre-existing drift, not touched by this
  commit's note text.

## Hallucinations / overclaim

None. The 49955042 baseline-RNG-gap closure
is reported as observed, not claimed as
caused ("though this change draws no RNG").
flush_screen vacuity stated as writer-note.

## Density

Cliffs-head writer, 13/14 → PASS, 1 strictly
later. One `Ledger:` entry. In-body arm only,
all 40 C call sites pre-wired per D-3287.
Full 44/44 in-commit (display.js shared). No
unreached work.

## Verification

Re-measure (`--base 08c934715~1 --no-reach`):

```text
verify goto_level: 13 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-50350000: moved → enlightenment at step 1322 (was 373)
verify flush_screen: no corpus session is blocked (vacuous, disclosed)
```

Exact match. No FORCE/DIAG/seed/coords in
the `js/` hunk. Rule #2 clean (window
rulecheck). Scoreboard hunk flips exactly
the claimed rows (Barbarian 50650080 →
PASS shown; 14 rows touched total).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
