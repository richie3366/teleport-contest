# Review 1021 — d1f26ab3 — losehp noreturn drain at blast + poisoned arms (D-2051)

Metadata: SHA `d1f26ab3`, D-2051, Open-row port
(queue owner `losehp`, screen-first "You die...",
4 sessions). js/ touches 2 files: `artifact.js`
(+11/−1), `attrib.js` (+11/−0). No stamp owed.

## Intent vs deliverable

Subject promises: drain the deferred death
(`finish_maybe_wail` + `finish_losehp_done` +
early return) after the blast-arm losehp and the
poisoned HP-arm losehp, since C losehp is noreturn
when fatal. Diff actually adds both drains in the
established `hack.js:3010` idiom shape, plus one
static import-name extension. Promise ≡ diff.

## Inventory

- Changed JS: `touch_artifact` blast arm
  (`js/artifact.js:1147-1159`); `poisoned` HP arm
  (`js/attrib.js:434-448`). Both async; both use
  `await import('./end.js')` hoisted-dynamic for
  `finish_losehp_done` (cycle-safe: `--can`
  reports both pairs already IN-SCC — a cycle
  alone is not a blocker, and the import is
  runtime-only, never a top-level TDZ read).
- `finish_maybe_wail` extends the existing static
  `./hack.js` edge in artifact.js; attrib.js takes
  it dynamic (no new static edge). No symbol
  deleted or re-pointed.

## C ↔ JS fidelity

C loci read directly (not via grep-find):

- `hack.c:4255-4292` (`csym.mjs`): fatal arm
  (`:4284-4289`) copies the killer name,
  `urgent_pline("You die...")`, `done(DIED)` —
  noreturn, so nothing after a fatal losehp ever
  runs. Non-fatal low-HP arm (`:4290`) calls
  `maybe_wail()` inside losehp — hence draining
  `finish_maybe_wail()` at the call site is the
  faithful async rendering (no-op on the fatal
  path since JS sets `_needs_maybe_wail` only in
  its non-fatal arm, mirroring the C else-if).
- `artifact.c:940-963` (blast arm): `losehp(dmg,
  buf, KILLED_BY); exercise(A_WIS, FALSE);` —
  JS drain sits exactly between the two, firing
  only when `_losehp_needs_done` is set ✓.
  `if (!yours) return 0;` (`:949`) precedes the
  blast, so monster callers (mon.js:1971/2090,
  weapon.js:657) never reach the drain — the
  early `return 0` is hero-only ✓. All hero-path
  callers (`artifact.js:1181`, `invent.js:6917`,
  `pickup.js:1280`) treat 0 as refuse/abort, so
  returning 0 post-death cannot continue a turn ✓.
- `attrib.c:384-393` (poisoned HP arm, `i > 5`):
  `losehp(loss, pkiller, kprefix)` with fatal =
  noreturn ✓ drain + bare `return` correct. The
  survived-reaction `else` arm calls `adjattrib`,
  never losehp — needs no drain, as stated ✓.

Callee closure: both drains call only LIVE
exports (`finish_maybe_wail`, `finish_losehp_done`).
`showdamage`/`rehumanize` stay named omits
(Upolyd-fatal unreached by all four sessions).

## Hallucinations / overclaim

None. The mid-iteration 1-PASS partial is
disclosed as the localizer for the second
(poisoned) cause, not hidden; final verify ran
after the last edit.

## Density

+22/−1 across two arms of one C fact (fatal
losehp is noreturn). One falsifier family
("You die..." swallowed by post-death lines).
Right-sized; splitting the two call sites would
be two halves of one wrong.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed
  gates/fastforward/coords.
- Re-measured `hidden-proxy verify losehp
  --base d1f26ab3~1`: `2 PASS, 2 moved past,
  0 unchanged, 0 worse → PROGRESS` (Tourist-92081
  + Ranger-92126 PASS; 91132 → really_done@25 was
  23; 92014 → exercise@48 was 46) — matches the
  D-log owner-for-owner, step-for-step.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
