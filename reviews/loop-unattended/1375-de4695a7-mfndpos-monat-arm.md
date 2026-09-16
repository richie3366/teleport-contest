# Review 1375 — de4695a7 — mfndpos MON_AT aggression arm (D-2409)

- SHA: `de4695a7`, D-2409 (Open row: Caveman-92202 step 103 +
  Valkyrie pair track-check residuals). JS files: `js/mon.js` only
  (+102/−~8: three file-local fns + MON_AT arm + import names).
- Prior reviews closed: none (corpus-owner row, 3 blocks).

## Intent vs deliverable

Subject promises the `mfndpos` MON_AT arm (`mmflag = flag |
mm_aggression`, ALLOW_M / tame-TM / MDISP fallback with the
`flag &= ~ALLOW_MDISP` mutation) plus the three C staticfns as
file-locals. Diff delivers all of it, in C order, with the flag
mutation persisting across later neighbour cells as in C.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `mm_2way_aggression` | new file-local (C staticfn) | LIVE — C `:2387–2420` |
| `mm_aggression` | new file-local (C staticfn) | LIVE — C `:2428–2447` |
| `mm_displacement` | new file-local (C staticfn) | LIVE — C `:2451–2472` |
| `unique_corpstat` | new file-local (C staticfn) | LIVE — `geno & G_UNIQ` |
| MON_AT arm in `mfndpos` | rewired branch | LIVE — C `:2299–2317` |
| `ALLOW_MDISP`/`Is_stronghold`, `is_displacer`, `count_wsegs`, `On_W_tower_level`/`In_W_tower`, `PM_SHRIEKER` | callee/const joins | LIVE — all pre-existing exports (`--can` → ALREADY, no new edge; D-log's "new dungeon.js edge" is overstated — the static edge already existed, two names joined it) |
| `NODIAG` (mon.js:551) | pre-existing local macro-clone | untouched, out of scope |

No symbols deleted or re-pointed (the old raw-flag gate was inline
code, not a symbol). `sym.mjs` notes `In_W_tower`/`On_W_tower_level`
clones in `js/potion.js` — pre-existing, untouched, out of scope.

## C ↔ JS fidelity

C loci read in pinned source: `mm_2way_aggression`
(`mon.c:2387–2420`, csym range), `mm_aggression` (`:2423–2447`),
`mm_displacement` (`:2450–2472`), MON_AT arm (`:2299–2317`).

- 2way: W-tower inside/outside ternary exact (`In_W_tower` arg
  order preserved); zombie-maker arm exact — `mgenmklev` pair gate,
  `!Is_stronghold`, both-`unique_corpstat`, returns
  `ALLOW_M | ALLOW_TM`. Branch order identical. ✓
- aggression: tame-pair veto, purple-worm/shrieker arm
  (`mdef->data == &mons[PM_SHRIEKER]` ≡ `data.mndx`
  comparison under the `mndx` idiom), dual 2way OR. ✓
- displacement: all four conjuncts in C order incl. the
  `!is_displacer(pd) || m_lev >` guard, NODIAG diagonal exclusion,
  `!mtrapped && (!wormno || !count_wsegs)`, rider/size gate. ✓
- MON_AT arm: `mmflag = flag | mm_aggression` → ALLOW_M (+TM for
  tame behind the `ALLOW_TM` gate) else `flag &= ~ALLOW_MDISP`
  then displacement. Matches C statement-for-statement. ✓
- RNG-neutral both sides (no `rn2` in any of these C fns). ✓
- Pre-existing divergence (not introduced here, not charged):
  the ALLOW_SANCT block sits under the `else` (monster-free) fork
  in JS (`mon.js:2773–2781`) while C `:2318–2325` runs it for
  monster cells too — a monster-occupied temple square never gets
  `ALLOW_SANCT` in JS. Narrow; predates this commit (old
  `else if (m_at)/else` shape preserved). Left as an observation
  for a future Open row, not a Must-fix on this SHA.

## Hallucinations / overclaim

One harmless overstatement: "new `dungeon.js` edge … SAFE" — the
edge already existed (`--can` → ALREADY), so there is no new edge
at all. Stronger than claimed, not weaker. The "moved past /
unchanged" split is stated honestly (no PASS claimed where none
exists).

## Density

~100 `js/` lines + a 97-line unit test for one measured writer
(mover, occupant state, cnt 5-vs-6 all cited). One locus, one
falsifier — right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify m_move --base de4695a7~1` →
  `0 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS`
  (Caveman-92202 → distfleeck@116; both Valkyries still m_move at
  the same steps) — reproduces the D-log line-for-line. Genuine
  movement past the cited step, no D-1831 shape.
- `node --test scripts/mm-aggression-mfndpos.test.mjs` → 4/4
  (re-run this audit; stash-proven fail-before per D-log, taken
  as stated). Green/cohort per D-log accepted (single-module
  change, runner-skipped full as stated).

## Actionable C-wrongs

None chargeable to this SHA.

Verdict: **ACCEPT**
