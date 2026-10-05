# Review 2392 — e947eb150 — regen_hp rehumanize arm (D-3459)

Metadata: SHA `e947eb150`, D-3459, 1 function (whole Method).
Files: `js/allmain.js` (import +1, arm +1, doc), new
`scripts/regen-hp-rehumanize.test.mjs`.

## Intent vs deliverable

Promise: wire the empty Upolyd mh<1 arm to `rehumanize()` (C :632–634)
and certify the tail C-whole → `ported`. Diff actually adds: +1 import
name, `await rehumanize();`, doc, static test. Matches exactly.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| regen_hp | ported | js/allmain.js:467 (local, C staticfn) | allmain.c:624–679 |

## C ↔ JS fidelity

Branch-by-branch confirm against C :624–679. Init triple exact
(`encumbrance_ok = wtcap < MOD_ENCUMBER \|\| !umoved`). mh<1 arm calls
and falls through with heal=0, exactly like C (no return either side).
Eel gate (S_EEL, !pool, !waterlevel, !Breathless) and inner condition
(mh>1, !Regeneration, `rn2(mh) > rn2(8)`, half-physical moves%2) match
with RNG call-for-call in short-circuit order. mh-regen arm
(`U_CAN_REGEN() \|\| (encumbrance_ok && !(moves % 20))`) and unclamped
`mh += heal` + `reached_full = (mh == mhmax)` match — C never clamps
mh, JS does not either. !Upolyd arm: entry gate, boolean→1/0 heal,
regen +1, sleepy +1, clamp, reached_full — all C :658–672.
`reached_full → interrupt_multi("You are in full health.")` exact.
`u_can_regen()` verified identical to the C macro (allmain.c:621:
`Regeneration \|\| (Sleepy && usleep)`; Sleepy ≡ HSleepy||ESleepy per
youprop.h:143). Caller C allmain.c:294 → js/allmain.js:1283, guard
re-checked C-exact (uinvulnerable/UNENCUMBERED + eel-or-full-mh entry).

Callee closure: `rehumanize` LIVE — `sym.mjs` confirms async export
js/polyself.js:1225, awaited at a call site inside an async fn; edge
allmain→polyself pre-exists (D-2349 safe, call-time use, no TDZ read).
No clones, no stubs, no re-pointed symbols in this diff.

## Hallucinations / overclaim

None. "Whole" holds; the test's static census is honest about
module-locality. D-log tail claims (u_can_regen identity, unclamped mh,
D-2012 interrupt) each re-verified above.

## Density

Single whole function; Ledger entry + Verify line present; Left open:
none. No Must-fix bundled (override disclosed, precedent chain cited).

## Verification

D-log: vacuous note + REACH-OK (365 reach, 80 run, 80 PASS), green,
strict, cohort, full 44/44, test 3/3. Re-ran `--base e947eb150~1
--reach-all`: 0 blocked (row cited none — vacuous legitimate),
365/365 PASS, 0 regressed → REACH-OK (stronger than the shipped
80-spread). `node --test scripts/regen-hp-rehumanize.test.mjs`: 3/3 at
HEAD. Diff grep: no FORCE/DIAG/seeds/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
