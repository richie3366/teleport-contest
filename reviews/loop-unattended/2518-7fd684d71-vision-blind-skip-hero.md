# Review 2518 — 7fd684d71 — vision_recalc blind skip hero newsym (D-3638)

## Metadata

- SHA: `7fd684d71` (2026-10-07) — cliffs-head writer, D-3638
- D-entry: D-3638 (vision_recalc blind branch)
- js diff: `js/vision.js` +6/−0 (one guarded newsym + C-cite comment)
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): scen-impaired-Healer-94190 step 198 shows 19
mapped object cells at identical cells with 18/19 chars differing while
RNG matches 3158/3158 — a display-RNG count desync, not state (Hallu
`obj_to_glyph` randomizes every object glyph). Cause: C's Blind branch
`goto skip`s the sighted update loop but still lands on the skip-tail
hero `newsym` (which burns one display-RNG under Hallu); JS returned
without it. 1 corpus PASS.

Diff actually adds: `if (!game.program_state?.panicking && (u.ux | 0) >
0) newsym(u.ux, u.uy);` before the blind branch's `return`. Nothing else.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `js/vision.js:1133` blind-branch hero newsym | `vision.c:576–580` (`goto skip`) + `:843–850` skip tail | ports C |

`Ledger:` vision_recalc ported — with three disclosed Named gaps (below).

## C ↔ JS fidelity

C `vision_recalc` (`vision.c:511–857`): the Blind arm
(`:547–580`) runs `view_from`, its own previously-seen update loop, then
`/* skip the normal update loop */ goto skip;` — landing on `skip:` (`:843`)
whose tail is `if (!program_state.panicking) newsym(u.ux, u.uy);` (`:849–
850`, «Make sure the hero shows up!»). JS `heroBlind` branch
(`js/vision.js:1096–1134`): `view_from`, the same previously-seen loop
(`old_row[col] & IN_SIGHT`), the rmin/rmax swap — and now the hero newsym
before `return`. Branch order matches; the `panicking` guard matches C
`:849` exactly.

Two deliberate deltas, both benign:

- Extra `(u.ux | 0) > 0`: C has no such guard, but C's own comment (`:844–
  848`) ties `u.ux == 0` to the panicking crash path, and the sighted-path
  tail in the same function already uses the identical idiom (`if (ux > 0)
  newsym(ux, uy)`, `js/vision.js:1288`) plus a C-grounded `col !== 0` guard
  above it. Differs from C only in an unplaced-hero state that C itself
  documents as a crash — unreachable in scored play (ux ≥ 1 with a live
  level). House-consistent, not a C-wrong.
- Swap-before-newsym: C newsyms (`:850`) then swaps rmin/rmax (`:852–854`);
  JS swaps first. `newsym` reads `viz_array` (already swapped in both),
  never the rmin/rmax loop bounds — order-immaterial, and the swap
  placement predates this diff.

No helper involved (direct `newsym` call, already imported); no
clone/stub/no-op question. RNG: the added burn is the fix itself (one
display draw per blind recalc under Hallu, as in C) — main stream
untouched, corroborated by RNG 3158/3158 holding and all 61 failing
screens clearing.

Named gaps (disclosed in the D-log, map items — correctly not Must-fix):

1. control==2 skips loop+hero: verified in the JS tail (`control !== 2`
   gates both the loop and the sighted hero newsym, `js/vision.js:1213,
   1288`) with the #992/D-0852 rationale comment in place. True blocker
   as described.
2. `notice_all_mons(TRUE)` (`vision.c:856`, verified present at the skip
   tail): absent on both JS paths, pre-existing. RNG-free display-list
   maintenance; «drew 0» trivially true.
3. wiz_intrinsic end-`docrt()` timing: timing-only claim, screen-neutral
   here per the PASS. Accepted as named.

## Hallucinations / overclaim

None. The «shifted by 2» mechanism (per-recalc missing burn accumulating
across recalcs) is consistent with the 18/19-char same-cell diff shape;
the session reaching PASS with zero other changes is the corroboration.
Named gaps are genuinely named with C cites, not buried.

## Density

Cliff phase §10.18: one cliff, one writer line, one `Ledger:` entry, code
+ verify in one handoff. Owner-vs-writer correct (object_detect symptom →
vision writer). No foreign-file work, no re-audit. Right-sized.

## Verification

D-log claims: `verify object_detect: 1 PASS` (scen-impaired-Healer-94190,
all 61 failing screens clear), reach 16/16, green + strict + cohort, full
44/44 (shared file). `verify vision_recalc`: nothing blocked at baseline.

Re-measured:
`node scripts/hidden-proxy.mjs verify object_detect --base 7fd684d71~1 --reach-all`:

- `verify object_detect: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Healer-94190: PASS)
- `reach object_detect: 16 baseline-PASS … 16 PASS, 0 regressed → REACH-OK`

PASS claim reproduces exactly (16/16 reach matches the D-log's 16);
no REGRESSED. Rule #2 clean globally; diff grep for FORCE/DIAG/getRngLog/
fastforward/coords: 0 hits. No seed/step/coordinate reads. Committed
focused test present (`scripts/vision-blind-skip-hero.test.mjs`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
