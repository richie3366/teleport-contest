# Review 1084 — fcc6e805 — Inhell hellish flag, not dnum

Metadata: SHA `fcc6e805`, D-2118, `js/pray.js` only (~4 js/
insertions). No prior review claims this SHA.

Intent vs deliverable: the subject promises one helper fix —
`Inhell()` reads the dungeon `hellish` flag (`dungeon.c:1941–1945`)
instead of `dnum===GEHENNOM`, dropping the `GEHENNOM` import, fixing
all seven `Inhell()` call sites at once. The diff delivers exactly
that: two changed lines plus a C-citing comment. Nothing else.

Inventory: one extended function (`Inhell`); zero new functions, zero
deleted exports. Required `sym.mjs` output (dropped import; target
still live):

```text
GEHENNOM         js/const.js:655   sync   export const
```

**C ↔ JS fidelity**: C `In_hell`
(`nethack-c/upstream/src/dungeon.c:1941–1945`, 5 lines) returns
`svd.dungeons[lev->dnum].flags.hellish`, and `dungeon.h:140` defines
`Inhell` as `In_hell(&u.uz)`. JS is now
`!!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)` — the flag,
keyed by the hero's `dnum`, boolean-coerced. Character-for-character
the same predicate as the already-live `do.js:1215` idiom (which takes
an explicit level; pray.js passes `u.uz`, matching the macro). The old
`dnum===GEHENNOM` form is wrong wherever a hellish branch dungeon is
not Gehennom proper, and the symptom (spurious "shimmering light"
prayer branch at step 104) fits a mis-evaluated `Inhell()` gate.
Branch order / RNG: none in C body; none added. No clones introduced.

The three same-shape `dnum===GEHENNOM` clones the message names
(`minion.js:94`, `fountain.js:1041`, `makemon.js:1018`) are genuinely
left untouched and explicitly named with lines — proper named
deferrals, not silent omits (makemon.js:767 already cites the idiom).
The step-105 residual (`prayer_done` ublesscnt/rnl gate,
`pray.c:2307–2314`) is likewise named as the next owner.

Hallucinations / overclaim: none. "C is 5 lines so the small diff is
the whole function" is true (csym range `:1941–1945`). "No new edge"
is true (import removed, none added).

Density: below the ~40-insertion soft floor, but C is 5 lines and the
commit states that outright — this is the stated exception, not a
density miss.

Verification: D-log claims `verify gethungry` → PROGRESS
(Healer-92198 104 → `prayer_done`@105), green 2/2, strict ×2, cohort
7/7. Re-measured: `hidden-proxy.mjs verify gethungry --base
fcc6e805~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (same session, same step move). Exact match, non-vacuous.
Diff is free of FORCE/DIAG/seed/coordinate reads.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
