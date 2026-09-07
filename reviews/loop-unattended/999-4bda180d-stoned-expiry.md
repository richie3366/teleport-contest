# Review 999 — 4bda180d — STONED expiry killer + done_timeout (D-2029)

Metadata: SHA `4bda180d`, D-2029, Open-row port
(trapmove-symptom writer: statue-lives-on vs death
disclosure, 1 PASS + 2 moved). js/ touches
`js/timeout.js` only (+30/−5: STONING import, 1 arm,
2 doc lines). No stamp owed.

## Intent vs deliverable

Subject promises: STONED expiry arm before SLIMED in C
switch order — delayed-killer name (default "killed by
petrification"/NO_KILLER_PREFIX), dealloc, `await
done_timeout(STONING, STONED)`, gameover-guarded return.
Diff actually adds: exactly that arm + import name +
retired STONED-deferred comments. Promise == diff.
No new helpers; no deletes / re-points.

## Inventory

- Changed JS: `nh_timeout` uprops loop, one new arm.
- Callee closure: `find_delayed_killer` +
  `dealloc_killer` — LIVE (`js/end.js:1463,1472 sync`,
  pre-existing import line 73); `done_timeout` — LIVE
  local (`js/timeout.js:668`, D-2023 port of
  timeout.c:574–585, same file). `STONING` extends the
  pre-existing `./const.js` edge (ALREADY). No STUB /
  clone / no-op. Named: HALLUC/STUNNED/SEE_INVIS/
  SLEEPY/… expiry, region/sleep_dialogue, VOMITING/SICK
  arms, SLIMED shape — all pre-existing envelope.

## C ↔ JS fidelity

Against `timeout.c:674–685`, branch-by-branch confirm:

- `kptr = find_delayed_killer(STONED)` — same call.
- `if (kptr && kptr->name[0])` copy format+name else
  `NO_KILLER_PREFIX` + "killed by petrification" —
  JS `kptr && kptr.name` + same two arms, verbatim.
- `dealloc_killer(kptr)` then
  `done_timeout(STONING, STONED)` — same order; the
  "(unlike sliming, no form change)" comment ported.
- Position before SLIMED matches C `switch` order.
- `if (game.program_state?.gameover) return` models C
  `done()` noreturn-unless-lifesaved; matches the
  file's own convention (line 737, SLIMED path) and
  D-2023's documented `done_timeout` contract. No RNG
  in this arm — nothing to walk call-for-call.

## Hallucinations / overclaim

None. "C switch order", `--can: ALREADY`, and the
"1 PASS + 2 moved" counts all check out (see below
for the baseline-drift footnote).

## Density

Small arm (~20 lines) on a small C locus (`:674–685`
+ killer setup). One falsifier, one module — right-sized,
not padding.

## Verification

- `imports.mjs --rulecheck`: clean. Diff grep: no
  FORCE/DIAG/getRngLog/seed-gate/fastforward/coords.
- Re-measured `hidden-proxy verify trapmove --base
  4bda180d~1`: `1 PASS, 3 moved past, 0 unchanged,
  0 worse → PROGRESS` (Monk-92123 PASS; Knight-92203
  → drop_upon_death@95; Caveman-92070 →
  drop_upon_death@49). Footnote: current baseline
  shows 4 blocked vs the D-log's 3 — the extra row
  (Knight-92016) moved 63→83 *within* trapmove and
  the script counts it moved-past; direction is
  forward, verdict PROGRESS stands. Not vacuous.
- Green + strict ×2, cohort 7/7 per D-log; timeout.js
  shared-file full suite not run, but the arm only
  fires on STONED expiry (green sessions never take
  it) — acceptable.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
