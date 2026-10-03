# Review 2283 — 95d4fec09 — by-design trio + dist2 duplicate removal

- SHA: `95d4fec09` (D-3327)
- Files: 13 js files (dist2 import re-points + mon.js deletion); trio has no `js/`
- Insertions: small; consolidation + cited by-design shape

## Intent vs deliverable

Subject promises: "`do.c` badspot + free_eshk/free_egd by-design +
hacklib.c dist2 mon.js-duplicate removal". The diff delivers exactly
that: all 12 mon.js-edge importers moved to their hacklib.js edge, mon.js
imports `dist2` from hacklib.js and deletes its duplicate. No call-site
change; trio resolved in ledger only. No DIAG/FORCE/seed; Rule #2 clean
(iteration-wide rulecheck).

## Inventory

- `dist2`: deleted mon.js duplicate; 13 import lists edited. No body
  changes; live export re-verified here.
- `badspot`, `free_eshk`, `free_egd`: by-design, no `js/` (D-3312/D-3314
  precedent) — each C citation re-checked below.

## C ↔ JS fidelity

C `dist2` (hacklib.c:672–678): `dx*dx + dy*dy`, no RNG. Live JS
(hacklib.js:23): identical expression; the deleted mon.js twin was
textually identical, so the rewire is behavior-neutral and only fixes the
locus. Census: single `dist2` definition (hacklib.js:23); mon.js now
imports it (:69) with a deletion marker (:1124). The `dist2_lock`
(lock.js:1038) and `dist2u` (mhitu.js:344) census hits are different
functions (prefix matches), not clones:

```
dist2            js/hacklib.js:23   sync
```

By-design trio, each verified: `badspot` (do.c:1399–1406) is `static`
with a single C reference — the commented-out declaration at do.c:25 —
dead in C, no caller to wire. `free_eshk` (shknam.c:568–576) /
`free_egd` (vault.c:34–42): zero src callers (only extern.h decls; the
second `csym` body each is the `util/sfctool.c` tooling twin) — dead in
src, so the `isshk`/`isgd` flag-clear arms are unreachable state, not
omitted behavior. All three `sym.mjs` NOT FOUND in `js/` — correctly
absent, not cloned.

## Hallucinations / overclaim

None. "Dead in C / dead in src (tooling twin only)" verified against the
caller listings above.

## Density

Consolidation + 3 bookings; below-bar insertions defended (behavior-
neutral locus fix + cited by-designs). `Ledger:` badspot / free_eshk /
free_egd by-design, dist2 ported. Per-function Verify lines present.

## Verification

Re-measured all four (`hidden-proxy.mjs verify
badspot,free_eshk,free_egd,dist2 --base 95d4fec09~1 --reach-all`): every
function 0 blocked (vacuous; rows cited 0 blocks, honestly noted) +
smoke 24/24, 0 regressed → REACH-OK — the D-log tail verbatim (which
also records green 2/2, strict ×2, cohort 7/7, full 44/44).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
