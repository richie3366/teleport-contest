# Review 1026 — 72cf8c52 — dofire ready More + doquiver fire-arm period (D-2056)

Metadata: SHA `72cf8c52`, D-2056, Open-row port
(queue owner `dofire`, screen-first, 3 sessions).
js/ touches 2 files: `dothrow.js` (comment +
1-line delete), `wield.js` (1-line flag +
comment). No stamp owed.

## Intent vs deliverable

Subject promises: delete the post-doquiver
`mark_topline_seen()` (no C counterpart; the
pending NEED_MORE is flushed by getdir's
yn_function), and flip the fire-arm `xprname`
dot flag to TRUE (C `prinv` trailing period).
Diff actually does exactly those two lines.
Promise ≡ diff.

## Inventory

- Changed JS: `dofire` (`js/dothrow.js:2489+`),
  async; `doquiver_core` fire arm
  (`js/wield.js:896`), async pline kept.
- No import changes; no symbol deleted or
  re-pointed (a call site removed, not the
  callee). `sym.mjs` unnecessary — nothing
  renamed.

## C ↔ JS fidelity

C loci read directly:

- `dothrow.c dofire` (via `csym.mjs`): after
  `res = doquiver_core("fire")` + `obj = uquiver`
  the code falls straight into the fireassist
  block and `throw_obj(obj, shotlimit)` — no
  topline skip anywhere on the path ✓. The
  deleted `mark_topline_seen()` consumed the
  pending NEED_MORE, so JS showed "In what
  direction?" where C pauses at "You ready:
  …--More--" (and ate the space as a getdir
  cancel). Deletion restores the pause ✓.
- `wield.c:658-662` (fire arm): `prinv("You
  ready:", newquiver, 0L)`; C `prinv`
  (`invent.c:2874-2890`): `quan=0` →
  `total_of=FALSE` → `xprname(..., dot=
  !total_of=TRUE)` → trailing period ✓. JS
  `xprname(newquiver, undefined, true)` now
  matches; the sibling ready-verb arm
  (`prinv(NULL,…,0L)`, same dot=TRUE) already
  passed `true` — the two arms are consistent ✓.
- D-0485 `dir_from_key` behavior retained in the
  getdir path (untouched) ✓.

Callee closure: no new callee; one C-uncited
call removed.

## Hallucinations / overclaim

None. The intermediate NO-MOVEMENT round
(period-only diff) is disclosed as the
localizer for the second hunk — honest
two-cause triage inside one screen shape.

## Density

+5/−3 effective. Two lines, one screen shape,
one falsifier family. Minimal and complete —
2 of 3 sessions PASS outright.

## Verification

- Diff-hunk grep: the single FORCE/DIAG hit is
  the commit message quoting its own Verify
  line; zero code hits.
- Re-measured `hidden-proxy verify dofire
  --base 72cf8c52~1`: `2 PASS, 1 moved past,
  0 unchanged, 0 worse → PROGRESS`
  (Barbarian-92036 + Valkyrie-92237 PASS;
  Rogue-92030 → distfleeck@76 was 63) — matches
  the D-log owner-for-owner, step-for-step.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
