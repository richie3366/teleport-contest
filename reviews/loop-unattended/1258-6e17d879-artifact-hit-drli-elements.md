# Review 1258 — 6e17d879 — artifact_hit FIRE/COLD/ELEC + SPFX_DRLI

Metadata: SHA `6e17d879`, D-2292, queue row `artifact.c`
spec_dbon/spec_applies SPFX_DRLI destroy/ignite. js/: 1 file
(`js/artifact.js`, ~+80/−10).

Intent vs deliverable: subject promises FIRE/COLD/ELEC
destroy/ignite bodies in C order plus the full DRLI arm verbatim.
Diff delivers both, plus import/doc-comment updates, nothing else.

Inventory: changed `artifact_hit` (3 elemental gates + new DRLI block);
`spec_ability` doc-comment retire; `losexp`/`monhp_per_lvl`/`destroy_items`
/`ignite_items`/`healup`/`healmon`/`nonliving`/`hcolor`/`The`/
`distant_name`/`ART_STORMBRINGER`/`NH_BLACK` added to existing or
already-present edges.

## C ↔ JS fidelity

C loci: FIRE `artifact.c:1490–1495`, COLD `:1505–1509`, ELEC
`:1524–1528`, DRLI `:1645–1720` (read in full above).

- Elemental: `destroy_items(mdef, AD_*, dmg)` inside the `rn2` gate with
  `if (!youdefend) dmg += itemdmg` ✓; FIRE-only `ignite_items` after ✓.
  D-log comment ("destroy runs even when defending, bonus kept") matches
  C exactly — the `!youdefend` gate is only on the bonus add. `mdef`
  at the call site already carries the spec_dbon preamble add both
  sides, so the passed `dmg` is the same value. `ignite_items`
  (`js/trap.js:4192`) early-returns on falsy, so hero `mdef?.minvent`
  (undefined) ≡ C NULL walk. ✓
- DRLI monster arm: `nonliving` life string ✓; entry snapshots
  m_lev/mhpmax/drain ✓; HP-floor clamp verbatim ✓; vis block calls
  `distant_name` for side effects on both print paths ✓; Stormbringer
  `hcolor(NH_BLACK)` vs `The(otmpname)` split ✓; m_lev==0 *assigns*
  `2*mhp+200` (not +=) ✓ with file-local `FATAL_DAMAGE_MODIFIER = 200`
  ≡ C `:63`; else `dmg += drain`, max/lev decrement ✓;
  `Math.trunc((drain+1)/2)` ≡ C `(drain+1)/2` (positive operands) ✓;
  `healup`/`healmon` split with the `assert(magr!=0)` covered by the
  null-safe canonical (comment says so) ✓; `return vis` ✓.
- DRLI hero arm: `uhpmax` snapshot before `losexp` ✓; Blind
  `You_feel("an …")` unholy-blade/object split vs seen plines ✓;
  `losexp("life drainage")` ✓; attacker heal gated on
  `magr && mhp < mhpmax` with `(abs Δ +1)/2` trunc ✓; `return TRUE` ✓.
- Callee closure (`sym.mjs`): `healmon` sync, `monhp_per_lvl` sync,
  `distant_name` sync — all called sync ✓; `destroy_items`/`losexp`
  ASYNC — both awaited ✓. `--can` on both "new" edges returns ALREADY
  (artifact.js already imports exper.js/makemon.js) — safer than the
  D-log's "new edge" wording, no contradiction that matters. No STUB in
  any live arm; every callee LIVE.
- RNG: `rn2(4)/rn2(5)` gates pre-burned and untouched; `monhp_per_lvl`
  draws through the live canonical both sides. No RNG added.

Hallucinations / overclaim: none. The 18/18 deleted-probe claim is
unreproducible but every asserted value (224-box, 12→7 scrolls,
max-floor 10) re-derives from the C above.

Density: one function completing its last two arms ("none left" retire)
— §2b right-sized.

Verification: D-log `verify --fn artifact_hit` PASS (syntax/rule2/green
2/2/strict/cohort). Re-measured: `hidden-proxy verify artifact_hit
--base 6e17d879~1` → 0 blocked baseline and working — vacuous claim
confirmed. Diff grep: no banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
