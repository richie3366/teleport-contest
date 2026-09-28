# Review 2023 — c055153c2 — date.c free_nomakedefs

Metadata: SHA `c055153c2`, D-3063, js/date.js (+~40/−~3) +
js/version.js (+~11/−~3). Single-function cluster + sole-caller
wiring.

## Intent vs deliverable

Subject promises "free_nomakedefs + mdlib.c:871 wiring". Diff
actually adds the export in C order, the `__setFreeNomakedefs` hook
pair, the `:871` hook call in `release_runtime_info`, and refreshes
the date.js:65 flag comment. Matches promise.

## Inventory

- `free_nomakedefs` (new export js/date.js:209, sync) — C
  date.c:133–173.
- `__setFreeNomakedefs` (new export js/version.js:610, sync) + hook
  call in `release_runtime_info` — C mdlib.c:871.
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

Body vs C `:134–173`: unpopulated early return `:139–140` ✓ (reads
the same module-local flag populate sets at `:129` ✓); four
guarded free+NULL arms `:142–153` → null-guarded nulling (GC owns
the memory — the only possible rendering, disclosed) ✓; numerics
untouched ✓ (C never clears them — verified by full-body read);
NETHACK_GIT_SHA/BRANCH/PREFIX `:154–168` compiled out ✓ —
verified: the defines are makedefs-generated, absent from the
contest build, and JS populate writes those three fields as null
(D-2653), so skipping them in free is exactly symmetric (nulling
nulls would be a no-op); `:171` populated = 0 ✓. The four nulled
fields are exactly the four strings populate writes — symmetric
pair ✓. Sole C caller mdlib.c:871 (csym shows only decls + this
call) ✓ wired via the hook in C order (after the opttext loop +
flag reset, matching C `:866–871` — verified by sed) ✓.

Hook pattern: version.js must not statically import date.js
(D-1881); the setter import rides the pre-existing date.js →
version.js edge (grep-confirmed: no version.js → date.js import),
registered at date.js eval, called conditionally. Graphs without
date.js keep the omission — behaviorally equivalent (no populate
hook ran either, so nothing dynamic exists to free). Sound.

sym.mjs: nothing deleted or re-pointed (additive export + hook).
No clones (explicitly none — "GC owns the memory"), no stubs, zero
RNG both sides.

## Hallucinations / overclaim

None. "Every arm ported" holds — the git_* arms are compile-gated
in C and null in JS populate, not live behavior. The D-log smoke
claims (unpopulated no-op, 4-null + numerics kept, second-free
guard) describe exactly the coded arms.

## Density

One 25-code-line C function + caller wiring, ~51 `js/`
insertions. Own Ledger entry (`ported`) + Verify line. Under the
200-line target but complete (sole-caller leaf). Right-sized.

## Verification

Re-measured (`--base c055153c2~1 --reach-all`): 0 blocked + 24/24
smoke REACH-OK — matches the D-log, honestly vacuous (coverage
row). Banned-pattern grep: clean outside CURRENT boilerplate. No
seed/step/coordinate reads. No committed harness this time (D-log
reports a smoke instead) — acceptable for a 4-null teardown whose
sole caller is release-path code; the audit's full `sessions` run
below guards the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
