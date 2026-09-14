# Review 1260 — e6f16d72 — makemon MM_ANGRY mpeaceful + mwandexp field

Metadata: SHA `e6f16d72`, D-2294, queue row `makemon.c` birth knowledge
residuals. js/: 1 file, +3/−1 (`js/makemon.js` only — smallest of the
six SHAs).

Intent vs deliverable: subject promises the MM_ANGRY mpeaceful ternary
plus a template `mwandexp` default. Diff delivers both lines, nothing
else.

Inventory: one changed assignment; one template field.

## C ↔ JS fidelity

C locus `makemon.c:1297` (read with surroundings `:1285–1305`):

```c
mtmp->mpeaceful = (mmflags & MM_ANGRY) ? FALSE : peace_minded(ptr);
```

JS: `(mmflags & MM_ANGRY) ? 0 : (peace_minded(ptr) ? 1 : 0)` — verbatim,
including the short-circuit that skips the call entirely. The skip is
load-bearing, not cosmetic: `peace_minded`'s tail (re-read via `csym`)
draws `rn2(16 + record)` and `rn2(2 + abs(mal))`, so old JS burned up
to two RNG draws on every MM_ANGRY birth. Both live MM_ANGRY callers
re-verified both sides: `mcastu.c:665` summon (`MM_ANGRY|MM_NOMSG` ≡
`js/mcastu.js:621`) and `dokick.c:1180` killer bees (≡
`js/dokick.js:724`). The mcastu post-zeroing (`:667` ≡
`mcastu.js:624`) is kept — C does both, so the redundancy is faithful.
Unmounted/non-ANGRY path is byte-identical to the old line. ✓

- `mwandexp: false` in the template: C `monst.h:166` bitfield inside the
  whole struct, zero at birth via zeromonst, set TRUE only under the
  stronghold/knox/endgame/hell/V-tower/quest gates (`:1291–1293` — the
  TRUE arm was already live in JS). `false` ≡ zero-init; the D-log's
  serMon round-trip probe (deleted /tmp file, unreproducible) is at
  least consistent with the template-carried-field mechanism. ✓
- No clones, no re-points, no new import (same module) — no `sym.mjs`
  owed. No RNG added; up to two draws removed exactly where C never
  drew.

Hallucinations / overclaim: none. Both C citations (`:1297`,
`mcastu.c:665`/`dokick.c:1180`) resolve to the lines quoted.

Density: 2 insertions closing a 2-line C gap — small-C exception,
the row's entire remainder.

Verification: D-log `verify --fn makemon` PASS (syntax/rule2/green 2/2/
strict/cohort/full 44/44 — full auto since makemon.js is shared).
Re-measured: `hidden-proxy verify makemon --base e6f16d72~1` → 0
blocked baseline and working — vacuous claim confirmed. Diff grep: no
banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
