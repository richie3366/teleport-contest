# Review 2635 — b39d64036 — dochug MMOVE_DIED return + flee-teleport (D-3771)

Metadata. SHA `b39d64036` (2026-10-10), D-3771, parent
`455ed3849`. js diff: `js/monmove.js` +9/−2 (DIED
return + flee-teleport return move + comments) +
`scripts/dochug-died-noattack.test.mjs` (new, 2 its).
Ledger: `dochug` ported (D-3771 prepended; stale note
kept). Works the parent queue's row-2 (`mon.c`
mcalcmove, 1 blocked: 95231 — verified; row-1
randomize exhausted, skipped per precedent).

## Intent vs deliverable

Promise: 95231@609 kind=rng — C's dochug ends the
turn when m_move reports DIED (`case MMOVE_DIED:
return 1`), JS had no DIED arm so the status fell
through to PHASE FOUR and the warhorse attacked a
turn early (HP 36→31, attack draws shifted).
Second fix: flee-teleport must cost the turn even
when rloc fails.

Diff delivers exactly the two arm fixes. Promise
and diff match. No import change.

## Inventory

Changed JS (2 arms, 1 function):

- DIED early return — `js/monmove.js:2891–2895`
  (`if (status === MMOVE_DIED) return 1;` right
  after the guarded recalc).
  C: `monmove.c:956–957` (`case MMOVE_DIED:
  return 1;` — csym body read, switch region
  `:900–989` verified: guarded recalc `:915`,
  then the switch).
- Flee-teleport `return 0` unconditioned —
  `js/monmove.js:2738–2748`.
  C: `monmove.c:747–749` (`if (rloc(...))
  leppie_stash(...); return 0;` — read).

## C ↔ JS fidelity

**Both arms C-exact in order and effect.** JS
placement mirrors C token-for-token: offmap guard
→ `if (status != DIED) distfleeck` recalc → DIED
return → NOMOVES/scared → idle isgd/Hallu → MOVED
arm → PHASE FOUR (read `js/monmove.js:2860–2905`).
The return skips exactly what C's case skips
(idle handling, PHASE FOUR attacks, quest_talk,
cuss — C `:958–989` read). Enum values verified
identical (`hack.h:1322–1326`: 0/1/2/3/4 =
JS `:184–188`), so the pre-existing `status ===
MMOVE_NOTHING` m_move gate ≡ C `!status`. The
DIED-both-sides premise (live warhorse, no
trap/door/dig/meat arm) is measured, not assumed
(live JS m_move → 2 with the 3 matched draws).

**Callees:** none touched. No symbol deleted or
re-pointed, so no sym.mjs paste is owed. Callers
(dochugw :2974, shk :826) pre-wired, signatures
kept. The standing demon_talk `else if` omit is
named with its C lines — correctly not Must-fix.

**Test.** 2 its (609 topline "" + HP). 0/2 →
2/2 is the authentic shape for a noattack fix.

## Hallucinations / overclaim

None. Diff grep: zero code hits (only the commit
message's own assertion line). The S_UNICORN
glyph/name aside is C-correct (monsters.h, cited).
"Writer ported whole" is earned: the whole-body
read (`:690–989`) is evidenced by the second,
unprompted flee-teleport arm fix in the same body.

## Density

Cliff-phase §2b: one row, writer shipped (owner
verified whole, untouched). One C locus
(`monmove.c:690–989`, two arms), no bundling.
95231 609→slimed_to_death@810 (+201). Full 44/44
ran (shared file).

## Verification

D-log Verify: mcalcmove 0 PASS + 1 moved
(609→810); reach spreads 80/80 ×2; gates PASS.
It skipped `--reach-all` ("paths unreachable in
baseline-PASS by construction").

Re-measured by this audit (`verify
mcalcmove,dochug --base b39d64036~1 --reach-all`):

```text
verify mcalcmove: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Ranger-95231: moved → slimed_to_death at step 810 (was 609)
reach mcalcmove: 1009 baseline-PASS session(s) reach it (1009 run, 486.4s): 1009 PASS, 0 regressed → REACH-OK
verify dochug: no corpus session is blocked on it at b39d64036~1 — […] vacuous […]
reach dochug: 528 baseline-PASS session(s) reach it (528 run, 349.2s): 528 PASS, 0 regressed → REACH-OK
```

Movement matches exactly. Full (non-spread) reach
— 1009 + 528, 0 regressed — supersedes the D-log's
spread justification; the construction argument is
moot with zero regressions at full scale. The
dochug vacuous line is honestly labeled (row cited
mcalcmove's 1; that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
