# Review 1219 — c5027d75 — has_aggravatables + AGGRAVATION arm (D-2253)

Metadata: SHA `c5027d75` (D-2253). Queue row `mcastu.c`
choose_monster_spell, 4 sessions with it in diverged-step traces
(not as owner). js/ +37/−9 (wizard.js +29/−4, mcastu.js +8/−5).

## Intent vs deliverable

Subject promises `has_aggravatables` live and the AGGRAVATION
`rn2(100)` only when nothing to wake, plus `aggravate`'s
`In_W_tower` skip. Diff adds that. Promise kept.
`choose_monster_spell` itself is untouched (already C).

## Inventory

New: `export function has_aggravatables`. Changed:
`spell_would_be_useless` AGGRAVATION arm; `aggravate` W-tower
filter. `sym.mjs`:

```text
has_aggravatables js/wizard.js:177   sync
aggravate        js/wizard.js:199   sync
In_W_tower       js/dungeon.js:890   sync
helpless         NOT EXPORTED — 6 LOCAL CLONES (not a 7th)
```

`--can` mcastu→wizard / wizard→dungeon ALREADY. Callee closure
— all LIVE: `In_W_tower`, `STRAT_WAITFORU`, `has_aggravatables`,
`rn2`. `helpless` is inlined `msleeping || !mcanmove`
(monst.h:251), not clone #7. `DEADMONSTER` is `mhp < 1`
(monst.h:214) ≡ `(mhp|0) <= 0`.

## C ↔ JS fidelity

- `has_aggravatables` vs `wizard.c:473–491`: caster
  `In_W_tower(mx,my,u.uz)` vs hero `(ux,uy,u.uz)` mismatch →
  false; `fmon` scan skipping dead and other-side; `STRAT_WAITFORU
  || helpless` → true. `In_W_tower` is the dungeon.js export
  (`:890`, On_W_tower_level + dndest rect). No RNG.
- AGGRAVATION vs `mcastu.c:946–954`: `if (!has_aggravatables)
  return rn2(100) ? true : false; else break`. Short-circuit:
  no `rn2(100)` when someone is asleep/waiting. C.
- `aggravate` vs `:493–511`: hero-side `in_w_tower`, skip dead
  and other-side, clear WAITFORU|APPEARMSG, `msleeping=0`,
  `!mcanmove && !rn2(5)` unfreeze. The filter was the named
  omit; the `rn2(5)` tail was already live.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS. The 4 trace-reach
sessions are presence, not ownership (D-log: two already PASS
pre-diff, two other owners). "Match C" is the callee, not a
stubbed dispatch.

## Density

+37 for 18-line `has_aggravatables` + one filter. C is that
small. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify choose_monster_spell: baseline c5027d75~1 — 0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner, matching the D-log (row cited
trace reach, not blocks). Green 2/2 + strict ×2 + cohort 7/7
pasted. Diff grep: no FORCE/DIAG/seed/coordinates. Rule #2
clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
