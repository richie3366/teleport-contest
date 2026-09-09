# Review 1170 — ea4547d5 — mon.c xkilled wasinside arm (D-2204)

Metadata: SHA `ea4547d5`, `js/uhitm.js` only (+12/−2), D-2204. Queue row
`stairs.c` stairs_description (scen-poly-Healer-92109 step 208/321,
0 blocked RNG, 113 blocked screens). Next index NN=1170; no prior
review file exists for this SHA.

Intent vs deliverable: subject promises the xkilled wasinside arm
(museum copy + `spoteffects(TRUE)`). Diff actually adds exactly that:
`if (wasinside) { mtmp = { ...mtmp }; await spoteffects(true); }`
in C position (after treasure/corpse, before `newsym`), plus retiring
the `wasinside spoteffects` map omission line. Promise == diff.

Inventory: one changed function (`xkilled`), one callee
(`spoteffects`, live async export `js/pickup.js:1913`, awaited at the
call site). No new helpers, no clones, no stubs, no import changes
(dynamic import on an existing same-SCC edge, call-time use only —
same idiom as the neighboring `mhitu.unstuck` call and D-2193's
expels-tail call for the same callee).

**C ↔ JS fidelity**: branch-by-branch confirm vs `mon.c:3632–3642`
(range from `csym.mjs xkilled` → `mon.c:3476–3740`; body read):

```c
if (wasinside) {
    /* spoteffects() can end up clearing level of monsters; grab a copy */
    museum = *mtmp;
    museum.nmon = 0;
    museum.minvent = 0;
    museum.mextra = 0;
    spoteffects(TRUE); /* poor man's expels() */
    mtmp = &museum; /* use the reference copy now */
}
/* monster is gone, corpse or other object might now be visible */
newsym(x, y);
```

JS (`js/uhitm.js:704–713`) mirrors it: gate, spread-copy,
`await spoteffects(true)`, reassigned `mtmp`, then
`if (x > 0) newsym(x, y)`. `wasinside` is captured pre-`mondead`
(`js/uhitm.js:627`, `const wasinside = engulfing_u(mtmp)`) exactly
like C's declaration-time initializer, so the kill-path value (not a
post-mortem recompute) drives both the "kill it" message gate and
this arm. The arm draws no RNG either side; `spoteffects` draws are
the live callee's own. Envelope parity: C reaches the arm past the
`stoned → goto cleanup` (`:3569–3572`) and
`nocorpse → goto cleanup` (`:3574–3575`) gates, and JS nests the arm
inside the matching `was_stoned` / `nocorpse` else-if — same skip
shape. Two deviations checked, both benign: (1) C zeroes
`museum.nmon/minvent/mextra` so the stale pointer can't be followed
after `spoteffects` clears monsters; JS spread keeps the links — but
JS has no manual free, the mon is already `mondead`'d, and nothing
downstream follows those links (cleanup reads only `malign`), so no
dangling state exists to sever. (2) C's arm sits outside the
`accessible(x,y) || is_pool(x,y)` gate (`:3582` vs `:3632`); JS nests
it inside — unreachable in practice since wasinside means the hero
shares the engulfer's square. Neither is a behavioral C-wrong.

Hallucinations / overclaim: none. The "Match C" claim covers callee
too, and the callee is live, not stubbed. Rule #2:
`imports.mjs --rulecheck` → clean suite-wide. No FORCE/DIAG/seed/
coordinate reads in the diff (12-line hunk, inspected whole).

Density: one C arm, one JS module, 12 lines — right-sized (§2b;
C is that small, so the <40-line floor does not apply).

Verification: D-log Verify bullet shows hidden PROGRESS + green 2/2 +
strict ×2 + cohort 7/7 + full 44/44. Re-measured myself instead of
trusting it:

```text
verify stairs_description: baseline ea4547d5~1 — 1 session(s) blocked
  scen-poly-Healer-92109: moved → do_statusline2 at step 241 (was 208)
verify stairs_description: 0 PASS, 1 moved past, 0 worse → PROGRESS
```

Not vacuous: the baseline scoreboard had the session blocked at 208
and it moved to a strictly later owner with nothing worse. Green/full
taken from the D-log and re-confirmed by this iteration's cadence
run (44/44 below).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
