# Review 979 — d7411fbf — doclose impaired-direction TIME (D-2009)

Metadata: SHA `d7411fbf`, D-2009, Open-row port (moveloop turn-count
off by one; scen-intrinsic-Caveman-92150 step 92 `^X`). js/ touches
1 file (`js/lock.js`, +18/−…: caller-local `confdir(false)` +
impaired `res`). No stamp owed. Notably, the D-log falsifies the
row's own prior suspect (dosearch count/interrupt) with a measured
slice (C 11 draws vs JS 0) and re-attributes to `doclose` — good
hypothesis discipline.

## Intent vs deliverable

Subject promises: caller-local `confdir(false)` after successful
`getdir` when `!u.dz`, then `if (HConfusion/Confusion/HStun/
Stunned) res = true` in exact C position. Diff actually adds:
exactly that plus one same-edge import. Promise == diff.

## Inventory

- Changed JS function: `doclose` head only (door-mask arms below
  untouched).
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required.
- No STUB in a live arm: the unported mimic/Blind/portcullis
  arms are comment-level (`// C: portcullis/drawbridge arms
  deferred`) at the already-named !IS_DOOR branch — pre-existing
  map omits, not new stubs.

## C ↔ JS fidelity

C loci read verbatim: getdir tail `cmd.c:4116–4117`
(`if (!u.dz) confdir(FALSE); return 1`), `doclose`
`lock.c:956–1051`, `u_maybe_impaired` `hack.c:2418–2421`
(`Stunned || (Confusion && !rn2(5))`), `confdir` `cmd.c:4300+`.

- `confdir(false)` placement: immediately after `getdir` success,
  gated on `!(u.dz|0)` — covers self `.` (dz 0) and skips `</>`
  (dz ±1), exactly as C. `u` is a live ref to `game.u`, so
  post-getdir dx/dy/dz are read correctly. ✓ Callee `confdir`
  is the live hack.js export (same edge, `--can` ALREADY);
  NODIAG≡grid-bug idiom inside it predates.
- Impaired `res`: C sets it after the self in-way return and the
  mimic check, before isok/nodoor (`lock.c:983–990`). JS sets it
  after the self return, before the bounds/nodoor returns — same
  observable position (the omitted mimic check can never fire in
  JS, so no order is disturbed). ✓ All nodoor exits below return
  `res`. ✓
- Predicate: C `Confusion || Stunned` ≡ H-fields
  (`youprop.h:84`/`81`); JS ORs the repo's sticky flat mirrors
  (`u.Confusion`, `u.Stunned`) — the standing convention
  (NOTES.md), documented in the comment. The load-bearing draw
  (`u_maybe_impaired`'s `rn2(5)`) fires identically on the
  falsifying session (Confused, unstunned): one draw both sides,
  confirmed by the 11-vs-11 throwaway slice. Observation (not
  Must-fix, pre-existing callee): JS `u_maybe_impaired`
  (hack.js:1790) returns on the `u.Stunned` sticky before
  consulting `HStun`, where C's first disjunct is `HStun` — any
  skew there is shared debt across all confdir callers, not this
  delta, and unobservable here.
- The fix's mechanism (TIME turn ⇒ full moveloop turn with its 11
  draws + `moves++`) is pre-existing machinery responding to the
  `true` return — this SHA only makes `doclose` report honestly.

## Hallucinations / overclaim

None. The D-log presents the throwaway slice tracer as a
throwaway (`/tmp`, not committed) with pre/post numbers — the
honest use of a scratch probe.

## Density

18 lines for a two-line C cause (confdir tail + impaired `res`)
plus positioning. Small but C is that small, and it closes a
full-session PASS.

## Verification

Re-measured myself: `hidden-proxy verify enlightenment --base
d7411fbf~1` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (92150 PASS; rngM 3207→3259 per D-log), identical to
the D-log. Plus cited green 2/2 + strict ×2, cohort 7/7, forced
full 44/44. Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward`. Rule #2 clean (re-ran this
iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
