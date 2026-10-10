# Review 2640 — f486e0541 — mbhitm lifesave fall-through (D-3776)

Metadata. SHA `f486e0541` (2026-10-10), D-3776, parent
`7646f6dc1`. js diff: `js/muse.js` +9/−1 (one gate
in mbhitm striking arm) +
`scripts/mbhitm-lifesave.test.mjs` (new). Ledger:
`mbhitm` ported. Works the cliffs row-2 (exercise;
row-1 randomize exhausted per precedent).

## Intent vs deliverable

Promise: 95328@170 — Medusa striking zap kills,
wizard `Die?` decline; C's resumed turn opens with
the makeknown WIS-exercise draw while JS went to
pet draws. Cause: JS returned unconditionally after
finish_losehp_done, skipping learnit/stop/nomul/
makeknown on survival. Fix: conditional return.

Diff delivers exactly that gate. Promise and diff
match. No import change.

## Inventory

Changed JS (1 writer, 1 arm):

- mbhitm striking hits-you arm — `js/muse.js:808–824`.
  C: `muse.c:1596–1703` (csym range; whole body
  walked: :1602–1604 head, :1611–1631 striking,
  :1644–1647 makeknown gate, :1653–1663 teleport,
  :1665–1667 cancellation, :1668–1691 undead,
  :1695–1697 reveal tail — all read).

## C ↔ JS fidelity

**Gate C-exact.** C `:1625–1626` is `losehp(...);
learnit = TRUE` with no return — C's done() returns
only on life-save, so survival always reaches
learnit → stop_occupation/nomul (`:1630–1631`) →
makeknown (`:1644–1647`). JS now mirrors it: survive
(savelife clears gameover, `js/end.js:2218`, read)
falls through; true death (really_done keeps it set)
returns 0. Fall-through path verified wired in
order (learnit :824, stop/nomul :826–827, makeknown
gate :844–847 matching C's `learnit && zap_oseen &&
(hits_you || cansee)`). RNG order preserved (no
draw added before d(2,12)). Whole-body claim
checked arm-for-arm: teleport/cancel/undead/tail
all match, incl. the hits-you reveal skip (C
`!canspotmon(&youmonst)` false — self always
spotted; JS null-mtmp skip — same outcome).
No symbol deleted or re-pointed, so no sym.mjs
paste is owed. Watch (no session, no row): the
entry gate still reads plain `gameover`, not the
`_losehp_needs_done` idiom D-3777 proves needed at
thitu — a stale-gameover window would over-drain
here too; needs its own proving session.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "missed exactly
C's [3747] draw, N-shifted values, fork at
dog_invent rn2(20)" forensics is measured
(tagged replay + C step log), and the D-log
honestly scopes 95346/95225 to independent writers
(both later shipped as D-3781/D-3777).

## Density

Cliff-phase §2b: one row, one writer arm, no
bundling. 95328 → FULL PASS. Callers pre-wired
(:950/:959, cited). The mbhitm/95204 NO MOVEMENT is
correctly excluded from the gate with a measured
separate-writer proof (Antimagic desync).

## Verification

D-log Verify: exercise 1 PASS + 2 unchanged;
reach 80/80 spread; gates + cohort PASS.

Re-measured by this audit (`verify exercise --base
f486e0541~1 --reach-all`, run on HEAD so it
includes D-3777/D-3781):

```text
verify exercise: 2 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Barbarian-95328: PASS
  scen-sweep-Healer-95346: moved → do_statusline2 at step 474 (was 474; re-attributed)
  scen-worldtour-Wizard-95225: PASS
reach exercise: 960 PASS, 0 regressed → REACH-OK
```

95328 PASS confirms D-3776; the other two rows show
the later SHAs' movement (re-checked under 2641/
2645). Full 960/960 reach, 0 regressed —
supersedes the 80-spread.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
