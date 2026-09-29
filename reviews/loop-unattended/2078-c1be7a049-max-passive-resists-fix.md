# Review 2078 — c1be7a049 — max_passive_dmg Resists_Elem Must-fix

- SHA: `c1be7a049` (D-3118)
- Subject: "`max_passive_dmg` elemental arm via live `Resists_Elem` (Must-fix, review 2070)"
- js/ insertions: ~15 (js/mhitm.js only)
- Prior index: 2077; queue Must-fix at review time: empty (this SHA closed the 2070 row)

## Intent vs deliverable

Promise: fix review 2070's C-wrong — the elemental arm of
`max_passive_dmg` called bits-only `resists_*` locals instead of the
live full `Resists_Elem` — with a 4-line swap, no new import edge.

Diff actually adds: exactly that — 4 constant names on the existing
const.js edge plus the 4-line `else if` swap in `max_passive_dmg`
(js/mhitm.js:2329–2332). No new functions, no helpers, nothing
deleted. Matches the promise line for line.

## Inventory

- `max_passive_dmg` (js/mhitm.js:2299 local + re-export) — only
  function touched; the rest of the body is the D-3110 restart
  already reviewed in 2070 (multi2 loop, burn/rot/rust arm, dice
  math, tail). This SHA changes one predicate chain only.

Helpers: none added. The bits-only `resists_*` locals stay for the
pre-existing gazemm/explmm/passivemm call sites — explicitly out of
scope in the D-log, untouched by the diff. No clones, no stubs,
no re-pointed exports.

`sym.mjs` on the re-pointed call target (required — local clone →
import):
`Resists_Elem  js/mondata.js:240  sync` (canonical export, no
clones). And on the abandoned path:
`resists_fire  js/zap.js:1499  sync  !! ALSO 4 LOCAL CLONE(S) …
js/mhitm.js:419 …` — confirming 2070's diagnosis: the old call
resolved to the mhitm.js:419 bits-only clone, and the new call
resolves to the canonical full-semantics export.

## C ↔ JS fidelity

C locus (csym): `max_passive_dmg`, mondata.c:718–767; the arm at
C :753–757 (`adtyp == AD_ACID && !resists_acid(magr)` etc.).
C `resists_acid/cold/fire/elec` are monst.h macros for
`Resists_Elem(magr, *_RES)` (mondata.c:129–197): bits OR
wielded-artifact `defends` (:173–176) OR worn/carried (:178–196).

JS now calls `Resists_Elem(magr, ACID_RES/COLD_RES/FIRE_RES/
SHOCK_RES)` in the same disjunct order with the same
`adtyp == AD_PHYS` terminator. Branch order identical; the arm
draws no RNG on either side (pure predicate chain). Verified the
callee is genuinely live, not a second clone: js/mondata.js:240
implements bits (:171), wielded-artifact defends (:173–176),
worn oc_oprop (:186–187) and alchemy-smock (:188–193) arms with
per-arm C cites, and mhitm.js:15 already carried the import —
so no new static edge and no TDZ risk. Constants FIRE/COLD/
ACID/SHOCK_RES join the existing const.js import (same precedent
as `resists_poison_mm` at mhitm.js:1899).

Caller wiring unchanged: dogmove.c:1123 → js/dogmove.js:1432
(confirmed in 2070; untouched here).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (`imports.mjs --rulecheck`, iteration-wide).

## Hallucinations / overclaim

None. The D-log says "0 blocked" and "the arm draws no RNG"
rather than claiming a corpus PASS, and the Named line claims
"every callee live" — true now: Resists_Elem + completely*_mm
are all live. The leftover bits-only locals are disclosed, not
hidden.

## Density

Must-fix ships alone — correct per §2b (a Must-fix never bundles).
~15 js/ insertions is a fix, not a cluster; the ~80 floor applies
to non-Must-fix ports. Per-function verdict: max_passive_dmg
ACCEPT (the 2070 C-wrong is gone). SHA verdict: ACCEPT.

## Verification

Re-measured (`--base c1be7a049~1 --reach-all`): 0 blocked at
baseline and working tree, vacuous note printed, smoke 24/24 →
REACH-OK. Matches the D-log exactly; no REGRESSED session.
Shared gates per D-log: syntax 1 file, rule2, green 2/2,
strict ×2, cohort 7/7.

## Actionable C-wrongs

None. Review 2070 item 1 is satisfied via its first option (call
Resists_Elem); the `**Addressed:** D-3118` stamp + short hash are
already on the 2070 file (2c9129a4b / 4e2ac5b98).

Verdict: **ACCEPT**
