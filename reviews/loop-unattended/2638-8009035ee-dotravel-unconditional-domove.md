# Review 2638 — 8009035ee — dotravel_target unconditional domove (D-3774)

Metadata. SHA `8009035ee` (2026-10-10), D-3774, parent
`9352b7e56` (HEAD). js diff: `js/cmd.js` +26/−25
(dotravel_target tail restructure, one body) +
`scripts/dotravel-engulfed-first-step.test.mjs`
(new). Ledger: `dotravel_target` ported (D-3774
prepended; audit note kept). Works the parent
queue's row-2 (`eat.c` gethungry, 1 blocked: 95332
— verified; row-1 randomize exhausted, skipped per
precedent).

## Intent vs deliverable

Promise: 95332@817 — engulfed hero's `.` retravel:
C runs dotravel_target → domove → uswallow →
attack (melee gethungry prefix), JS gated domove
on travelStep so NOPATH (BFS blind inside the
worm) skipped the hero action entirely and
dochug ate C's gethungry word. Fix: C-order tail
— recompute, `found:` compensation on NOPATH,
travel1=0, unconditional domove, move-normalize.

Diff delivers exactly that restructure. Promise
and diff match. No import change.

## Inventory

Changed JS (1 writer, 1 body):

- dotravel_target tail — `js/cmd.js:4958–4978`.
  C: `cmd.c:5347–5377` (flags + unconditional
  `domove()` at :5375 + ECMD_TIME — csym read
  whole) + `hack.c:2724–2728` (domove_core:
  travel→guess recompute, travel1=0 — read) +
  `hack.c:2733–2737` (uswallow zeroes + attacks
  — read) + `hack.c:1518–1522` (`found:` zero +
  nomul(0) — read) + `hack.c:4160–4173` (nomul
  incl. end_running — read).

## C ↔ JS fidelity

**Restructure C-faithful.** Order now: recompute
(travel→guess + UNSURE, unchanged) → `found:`
compensation on NOPATH → travel1=0 → domove →
move-normalize → ECMD_TIME. C's domove_core runs
the same sequence (recompute+travel1 first, then
carrying/uswallow pre-step arms). Verified
supporting facts: JS domove does its own travel
recompute nowhere (no double-run); JS nomul
(`js/hack.js:1674`, read) calls end_running(true)
like C `:4171`, so dropping the explicit call is
exact; JS domove's uswallow arm (`:6537–6542`,
read) zeroes + attacks like C `:2733–2737`;
`move!==0 → 1` matches the house shape
(continue_run :4524, domove-blocked comment
:5680); guess no-pick (`:4841–4845`, read) and
dest==hero exits already apply `found:`, so the
call-site compensation is a no-op there and a
genuine fix only for BFS-exhausted exits, as the
comment claims. The preserved-D list checks out
(no distance gate, no couldsee-first, D-0702
rest→self-step). Callers pre-wired (dotravel,
`_` table, cmdq ×3). No symbol deleted or
re-pointed (local `stepped` removed), so no
sym.mjs paste is owed.

**The sharp edge (checked, not a C-wrong):** C
has a *bare* `return FALSE` at `:1515` (BFS
exhausted) beside the `goto found` no-guess exit
(`:1489`) — the bare exit zeroes nothing and
skips nomul. So the compensation over-applies
`found:` on one C exit. Unobservable in every
reachable case: engulfed (this session) — the
uswallow arm zeroes anyway and the attack ends
the run both sides, empirically settled by the
FULL PASS below; non-engulfed total enclosure —
every step bumps and the bump ends the run
either way. Same shape as proven continue_run
(D-3583). No session distinguishes; no Must-fix.

**Test.** Matched-RNG prefix: fails at exactly
25348 pre-fix (the step-817 split), passes post —
the authentic shape, strongest of the eight.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "same stream
word, different shape" diagnosis (rn2(20)=18 vs
rn2(40)=18 — one melee-draw behind) is exactly
what a skipped hero action produces. The
PRESENCE-ONLY falsifier call (owner never ran
because the writer never called it) is sound.

## Density

Cliff-phase §2b: one row, writer shipped (owner
read whole, untouched). One C locus
(`cmd.c:5347–5377` + 4 hack.c windows), no
bundling. 95332 → FULL PASS 1337/1337. Full
44/44 forced (cmd.js).

## Verification

D-log Verify: gethungry 1 PASS; reach spread
80/80 (of 1012) + smoke 24/24; gates + forced
full PASS.

Re-measured by this audit (`verify
gethungry,dotravel_target --base 8009035ee~1
--reach-all`):

```text
verify gethungry: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Archeologist-95332: PASS
reach gethungry: 1012 baseline-PASS session(s) reach it (1012 run, 465.7s): 1012 PASS, 0 regressed → REACH-OK
verify dotravel_target: no corpus session is blocked on it at 8009035ee~1 — […] vacuous […]
smoke dotravel_target: no RNG-tagged reach; fixed smoke spread (24 run, 11.3s): 24 PASS, 0 regressed → REACH-OK
```

PASS + full 1012/1012 reach, 0 regressed —
matches the D-log, supersedes its spread.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
