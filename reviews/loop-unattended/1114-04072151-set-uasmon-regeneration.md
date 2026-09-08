# Review 1114 — 04072151 — set_uasmon REGENERATION PROPSET (D-2148)

Metadata: SHA `04072151`, `js/polyself.js` only (+6/−1 in `js/`).
Queue row fired: symptom `do_statusline2` (scen-poly-Priest-91137 step
214; writer `polyself.c set_uasmon`). No prior review claimed closed.

## Intent vs deliverable

Subject promises `PROPSET(REGENERATION, regenerates(mdat))` (C `:105`)
so M1_REGEN poly forms heal. Diff delivers exactly one helper line +
two same-edge imports + omission-comment retire.

## Inventory

- `set_uasmon` (extended): `propset_fromform(REGENERATION,
  'HRegeneration', regenerates(mdat))` after the BLINDED arm.
- Imports: `regenerates` (existing monsters.js edge), `REGENERATION`
  (existing const.js edge) — `--can`: ALREADY, no new edge.

## C ↔ JS fidelity

C `polyself.c:37–127`: `PROPSET(REGENERATION, regenerates(mdat))` at
`:105`, between PASSES_WALLS and REFLECTING. JS places the line after
the BLINDED arm instead — order across PROPSETs is immaterial
(independent bit sets, zero RNG), so no divergence. Predicate
`regenerates` is LIVE and C-exact (`M1_REGEN`, `js/monsters.js:954`).
Helper `propset_fromform` mirrors the macro's `|= / &= ~FROMFORM` on
`uprops[].intrinsic` and additionally maintains the `H*` flat like all
sibling arms (file convention); the reader (`js/allmain.js:561`
`regen_hp`) checks `(HRegeneration|0) || intrinsic`, so both writes
connect. Clearing is free as claimed: the helper's else-branch strips
the bit, and both `polymon` (`:696`) and `rehumanize` (`:1127`) route
through `set_uasmon` in JS. Diagnosis (+1/turn HP signature with
identical dice across steps 214–222) correctly identified a missing
regen source rather than a damage dice gap. Branch-by-branch confirm;
no gap.

## Hallucinations / overclaim

None. D-log verifies with the symptom owner (`--fn do_statusline2`,
not the writer name) and reports per-session outcomes including
retained pre-existing movement — no PASS inflation.

## Density

6 `js/` insertions for a one-line C locus — the allowed small-locus
exception (C arm is literally one macro line), and it ships 2 PASS.

## Verification

D-log Verify: `verify.mjs --fn do_statusline2` → 2 PASS + green/strict/
cohort. Re-measured myself: `hidden-proxy.mjs verify do_statusline2
--base 04072151~1` → `2 PASS, 2 moved past, 9 unchanged, 0 worse →
PROGRESS` (91137 + Rogue-92026 PASS; Monk-92164 → mhitm_mgc_atk_negated;
Ranger-92212 → hornoplenty; zero worse). Exact match, no regression.
`imports.mjs --rulecheck`: Rule #2 clean. Reverted mid-iter probes
(`git checkout` of mhitu/allmain) confirmed clean by the tiny final
`js/` stat. No FORCE/DIAG/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
