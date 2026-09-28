# Review 2009 — 68feb0e9e — relmon whole port

Metadata: SHA `68feb0e9e`, D-3049, js/dog.js + js/teleport.js (comments
except the relmon restart).

## Intent vs deliverable

Subject promises "`relmon` whole port (fmon-empty arm + nmon linkage)".
Diff actually restarts file-local `relmon` in C order (both panics
split, nmon linkage added) and touches only comments elsewhere. Matches
promise.

## Inventory

- `relmon` (restarted, file-local js/dog.js:741) — C mon.c:2559–2594.
- Comment-only: keepdogs omit note (js/dog.js:520), mon_leave cite fix
  (`:2559` → `:2561`), teleport.js migrate_to_level omit note.

## C ↔ JS fidelity

vs C `:2559–2594` (csym range cited): `!fmon → panic` split out as its
own `await impossible('relmon: no fmon available.')` :2565–2566 ✓ (old
code merged the two panics); `await mon_leaving_level(mon)` :2569 ✓
(async live js/mon.js:2115, awaited ✓); head-vs-scan unlink folded into
one `indexOf` + `splice` :2571–2581 ✓ (semantically identical on arrays;
absent → `impossible('relmon: mon not in list.')` :2583 ✓); prepend
`mon.nmon = list[0] || null; unshift` :2588–2589 ✓, orphan
`mon.nmon = null` :2592 ✓ (null-for-0 is the JS idiom). No RNG either
side. Branch order exact.

C `panic` is `ATTRNORETURN` (end.c:393–394) — C terminates where JS logs
`impossible` and continues. Both sites are unreachable in correct use
(live mon passed by every caller implies non-empty fmon containing it),
and continue-after-impossible is the repo-wide panic convention; the old
code continued too. Not a C-wrong.

Caller closure (9 C refs; 4 real sites + comments): dog.c:618
mon_arrive failed-placement arm is WIRED — `await relmon(mtmp,
failed_arrivals)` js/dog.js:1161 (pre-existing wiring, upgraded by this
restart) ✓; dog.c:863 keepdogs, dog.c:906 migrate_to_level, mon.c:2531
replmon stay inline with C-cited reasons (sync callers / out of cluster)
— all three named in the D-log this commit ✓. mhitm.c:919–922 and
dog.c:408/mon.c:2526 are comments, not sites ✓. No unwired caller, no
silent stub. `mon_leaving_level` LIVE; `relmon` itself file-local
matches C's non-exported use (only same-file callers wired so far).

The keepdogs comment records a measured A/B (rewire → 18/24 reach + a
public-session shift, reverted, ships as its own row once measured).
Honest named omit with evidence — map debt, not Must-fix. No new row
exists for it yet, but the D-log conditions it on measurement, so no
queue action this iteration.

## Hallucinations / overclaim

None. The commit message discloses the reverted rewire and its evidence
rather than claiming full wiring.

## Density

One whole function + comment updates. Small but the closure is complete
(single static-shape helper, all callers dispositioned). OK.

## Verification

D-log cites verify.mjs → PASS + vacuous hidden note + REACH smoke 24/24
+ green/strict/cohort (full skipped, no shared file changed — dog.js and
teleport.js are not shared-caller files; consistent). Re-measured:
`hidden-proxy.mjs verify relmon --base 68feb0e9e~1 --reach-all` → 0
blocked at baseline and now (vacuous, as stated — coverage row); smoke
24/24 PASS → REACH-OK, no regressions. Diff grep: no FORCE/DIAG/RNG-log
reads; no seed/coordinate logic.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
