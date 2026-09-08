# Review 1031 — 9151bc52 — really_done first-move death line (D-2061)

**SHA:** `9151bc52` · **D-id:** D-2061 · **Files:** `js/end.js` only
(+7/−0)

## Intent vs deliverable

Subject promises: the `really_done` first-move «Do not pass Go»
line. Screen-first row 0 in all three, RNG matched; JS jumped
straight to «Do you want your possessions identified?»:

- scen-death-Ranger-92114 step 23 · scen-genesis-Archeologist-91132
  step 25 · scen-wish-Monk-91136 step 59 (steps >1 are scenario
  setup keystrokes; `moves` ≤ 1 at death, so the arm fires).

Diff actually adds the single gated `pline`. Promise matches diff.

## Inventory

| JS function | Change |
|---|---|
| `really_done` (end.js) | +7-line first-move arm |

## C ↔ JS fidelity

C `end.c:1186–1187` (read with surrounding order):

```c
if (svm.moves <= 1 && how < PANICKED && !done_stopprint)
    pline("Do not pass Go.  Do not collect 200 %s.", currency(200L));
```

JS (`end.js:958–964`): `((game.moves|0) <= 1) && how < PANICKED
&& !(game.program_state?.done_stopprint|0)` → `await
pline('Do not pass Go.  Do not collect 200 ${currency(200)}.')`.
Checked each term: (1) `svm.moves` ↔ `game.moves` is the
established mapping; (2) `how` enum order verified identical
(`const.js:507–522` vs `hack.h:485–500`: DIED=0…PANICKED=11…
ASCENDED=15), so `< PANICKED` selects the same set; (3)
`done_stopprint` as `program_state.done_stopprint` is the
established JS idiom (read at :735, written at :754/:779 — not
invented here); (4) `currency` is an existing LIVE import already
used twice in this file; (5) literal matches byte-for-byte
including the double space after «Go.». Placement (after
`at_midnight`, before `bones_ok`) matches C order relative to
everything ported; achievements/`dump_open_log`/`wait_synch`
remain named omissions, so no order exists to violate against
them. No RNG, no branches beyond the single gate.

## Hallucinations / overclaim

None. No callee to stub — the arm is one `pline` over LIVE
imports.

## Density

7 insertions for a 2-line C arm. Below the guideline, but C is
that small; a filler hunk would be the real density violation.

## Verification

Re-measured myself (note: at HEAD, so one later-queued session
additionally reports):

```text
node scripts/hidden-proxy.mjs verify really_done --base 9151bc52~1
verify really_done: 3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-death-Ranger-92114: PASS
  scen-genesis-Archeologist-91132: PASS
  scen-wish-Monk-91136: PASS
  scen-normal-Barbarian-92208: moved → really_done at step 19
    (was 14; still really_done, 5 step(s) later)
```

The three D-log sessions still PASS — claim confirmed, not
vacuous. The fourth row is forward movement from the *later*
D-2062 commit (one_characteristic@14 → really_done@19, a different
end-of-game arm, not this commit's first-move line); «still
really_done at a later step» there is a later owner, not a
regression of this arm. D-log's 3-PASS claim was written before
D-2062 landed and remains true. Diff grep: no FORCE/DIAG/RNG-log
gates. Green/strict/cohort per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
