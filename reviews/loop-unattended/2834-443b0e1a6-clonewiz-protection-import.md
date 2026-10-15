# Review 2834 — 443b0e1a6 — clonewiz Protection clone deleted for canonical import

- SHA: `443b0e1a6` (D-3989)
- Files: `js/wizard.js` (+4/−7), focused test
  `scripts/clonewiz-protection-uprops.test.mjs` (new, 58 lines)
- Method: cliff writer (1 clone deletion); whole Method.
- Cites: C `wizard.c:517–534` (clonewiz), `youprop.h:355–360`,
  `hack.h:1493` ROLL_FROM, `wizard.c:52–56` wizapp — read directly.

## Intent vs deliverable

Promise: C skips the `:527` ROLL_FROM arm (Protection TRUE via worn
ring); JS's flat-only local clone read FALSE → drew `rn2(12)=8`
(Ranger-50650001 s1037). Fix: delete the clone, import canonical
`Protection_from_shape_changers` from were.js. Diff: exactly the
import + deletion. Promise and diff agree.

## Inventory

- `Protection_from_shape_changers` (local clone) —
  `js/wizard.js:231` (deleted) vs C `youprop.h:355–360`. Status:
  deleted; call site `:243` now uses the import.
- `clonewiz` — `js/wizard.js:236` vs C `wizard.c:517–534`. Status:
  behavior repaired, body otherwise untouched.

## C ↔ JS fidelity

C, verified line by line:

- `wizard.c:527` `if (!Protection_from_shape_changers)` guards
  `:528–529` `M_AP_MONSTER` + `ROLL_FROM(wizapp)` ✓;
  `ROLL_FROM(array) = array[rn2(SIZE(array))]` (`hack.h:1493`) and
  wizapp has 12 entries (`wizard.c:52–56`) → `rn2(12)` exactly as
  cited ✓; preceding `rn2(2)` fake-amulet arm `:522` both sides drew
  0 ✓ (consistent with the divergence starting at the gate).
- Macro `youprop.h:355–360`:
  `uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic||extrinsic` ✓ — the
  deleted clone (3 flats, no uprops arm) contradicted it; the were.js
  canonical (`were.js:58–65`) reads flats||intrinsic||extrinsic ✓.
- `sym.mjs Protection_from_shape_changers` (required paste):
  `js/display.js:1309 sync` + `js/were.js:58 sync !! multiple exports`.
  Both bodies are identical and unioned (display.js:1309 verified same
  5-term read) — importing from were.js picks a C-correct export; the
  duplication is pre-existing, not this commit's. Nothing else deleted
  or re-pointed.
- Import safety: `imports.mjs --can js/wizard.js js/were.js …` →
  ALREADY (wizard.js statically imports were.js; no new edge). The
  message's "SAFE, 101-module SCC" framing undersells it — stronger:
  zero new edges. The single call site reads at runtime (`:243`
  inside clonewiz), no top-level TDZ surface.
- The Named flats-only Protection reads elsewhere (dogmove/potion/
  cmd/apply) are correctly NOT shipped — no session names them.

Diff grep clean; no DIAG/FORCE/seed.

## Hallucinations / overclaim

None. The `--can` claim resolves to an even safer ALREADY; conclusion
unchanged.

## Density

Cliff head of its parent (`distfleeck`, Must-fix empty) ✓. Writer
(clonewiz gate), clone deleted per playbook (not shimmed), `Ledger:`
entry touched, focused test with authentic pre-fix FAIL → PASS.

## Verification

Ship-time: `verify distfleeck: 1 PASS (50650001 full 1115), 0 moved,
5 unchanged, 0 worse` + reach 34/34 & 80/80; green/strict/cohort.
Re-measure (`verify distfleeck --base 443b0e1a6~1 --no-reach` on HEAD):
`2 PASS, 1 moved past (Monk 97→getpos@307), 3 unchanged, 0 worse →
PROGRESS` — the named session PASSes exactly; the extra PASS + move
are the later D-3990. 0 worse. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
