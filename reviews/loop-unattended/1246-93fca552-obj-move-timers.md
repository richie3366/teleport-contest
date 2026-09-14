# Review 1246 — 93fca552 — timeout.c obj_move_timers migrating carry

- SHA: `93fca552` — "`timeout.c` obj_move_timers: migrating-object timer
  carry (D-2280)"
- D-log: D-2280. Queue row: `timeout.c` obj_move_timers (D-1572-envelope
  residual, queue head). Row cited 0 blocks.
- Character: new-function port, zero callers (dead API in C too), no
  corpus divergence.

## Intent vs deliverable

Subject promises: port C `obj_move_timers` verbatim into `js/mkobj.js`
next to its sibling, `panic` → throw per file precedent, no new edge, no
new omits. Diff actually adds exactly one +26 export, nothing else in
`js/`. Promise matches diff exactly.

## Inventory

- Added JS: `obj_move_timers(src, dest)` (`js/mkobj.js`, now `:1165` per
  `sym.mjs`, sync), directly before `obj_split_timers`.
- No caller wiring — correct, because C has zero callers in pinned
  `src/` (only a doc-comment mention at `timeout.c:1940` and the
  `extern.h:3247` declaration, confirmed via `csym --callers`). Porting a
  dead API is defensible here: it retires a named omit in the live
  D-1572/timer envelope and future migrating-object paths need it.
- Required `sym.mjs` output: `obj_move_timers  js/mkobj.js:1165  sync` —
  pasted, confirmed. (No `--can` owed: same-file placement, no import.)

## C ↔ JS fidelity

C locus `timeout.c:2338–2353` (16 lines via `csym.mjs`; D-log cites
`:2339`, same body). Line-by-line:

1. `for (count = 0, curr = gt.timer_base; ...)` repoint walk. JS walks
   `timer_base()._timer_base` with `count = 0`. Same head. ✓
2. Per `TIMER_OBJECT`-on-src match: rebind arg to dest, `dest->timed++`,
   `count++`. JS: `curr.obj = dest; dest.timed = (dest.timed|0)+1;
   count++`. ✓ (The `.obj` field convention matches the live sibling
   `obj_split_timers`, which tests `curr.obj === src` — read at HEAD.)
3. `if (count != src->timed) panic("obj_move_timers")` **before** zeroing.
   JS throws `new Error('obj_move_timers')` before `src.timed = 0` — order
   preserved, so a mismatch leaves `src.timed` intact on both sides. ✓
4. `src->timed = 0`. JS identical. ✓
5. No reinsert/relink: C leaves queue order untouched (timeout is
   absolute — unlike split's `start_timer` copies). JS likewise only
   rebinds. ✓

`panic` → throw (not `impossible()`) is correct and disclosed: C
`panic` is fatal, and `impossible()` in this codebase is async — awaiting
it from a sync API would fire-and-forget. File precedent cited
(`dealloc_obj`). Null guards mirror the sibling (C NONNULLARG12). No RNG
either side.

## Hallucinations / overclaim

None. "Dead API in C too" verified true via `--callers`. The "no reinsert
because timeout is absolute" rationale is readable directly in the C
body (no `start_timer`/relink calls, unlike the sibling). No callee
closure issue — the function touches only the timer queue and `TIMER_OBJECT`.

## Density

§2b small-C exception, disclosed in the D-log itself: shipped C is 14–16
lines, insertions match one-for-one (+26/−0). Below the ~40-line floor is
fine when C is that small.

## Verification

- Added-line banned-pattern scan: 0 hits. Rule #2 clean (re-checked this
  iteration).
- Re-measured corpus claim myself: `verify obj_move_timers --base
  93fca552~1` → 0 blocked at baseline and working — matches the D-log's
  vacuous note, which correctly refuses PASS status.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log; /tmp throwaway probe
  13/13 through the real modules (dual-timer move preserves absolute
  timeouts, mismatch throws with `src.timed` preserved, queue order
  kept). No maintained unit test, disclosed with rationale.

## Actionable C-wrongs

None. Verbatim port, zero divergence surface (no callers).

Verdict: **ACCEPT**
