# Review 2639 — 7646f6dc1 — Poison_resistance uprops union (D-3775)

Metadata. SHA `7646f6dc1` (2026-10-10), D-3775, parent
`946b52cf3` (audit). js diff: 8 files, +~40/−~20 —
every hero Poison_resistance predicate gains
`uprops[POISON_RES].intrinsic || extrinsic` +
`scripts/poisoned-extrinsic-resist-gate.test.mjs`
(new). Ledger: `poisoned` ported-note. Works the
cliffs head (`mhitm_really_poison`, 95302).

## Intent vs deliverable

Promise: 95302@1122 — wished + worn poison-ring
confers extrinsic via confer_oc_oprop into
uprops, which all flat-only readers missed, so JS
took the attrib-loss arm (extra tell + STR loss +
draws) where C early-outs. Fix: all 8 hero
predicates read flats || uprops.

Diff delivers exactly that, plus POISON_RES added
to 3 existing const.js imports (ALREADY edges).
Promise and diff match.

## Inventory

Changed JS (1 writer family, 11 predicates):

- poisoned gate — `js/attrib.js:444–452`. C:
  `attrib.c:338` (`if (Poison_resistance)`,
  csym body :316–408 read).
- sickness Poison_resistance — `js/potion.js:498`.
  C: `potion.c:974/984/989/992` (read).
- contact-poison — `js/spell.js:630`. C:
  `spell.c:164–165` (read).
- gas explosion — `js/explode.js:181`. C:
  `explode.c:61` (read).
- eat.js ×4 — `js/eat.js:1679/2578/3359/4310`.
  C: `eat.c:1052/1931/2797/2691` (all full
  macro; :1051 H-gate kept — read).
- AD_DRST yours — `js/artifact.js:2571`. C:
  `artifact.c:1050` (read).
- contaminated water — `js/fountain.js:817`. C:
  `fountain.c:301` (read).
- enlightenment — `js/invent.js:5648`. C:
  `insight.c:1540` (`if (Poison_resistance)` —
  read; invent.c has no poison gate).

## C ↔ JS fidelity

**Union read C-exact.** `youprop.h:46–48`:
`Poison_resistance ≡ uprops[POISON_RES].intrinsic
|| extrinsic` — C has no flats at all, so every
new disjunct only closes distance to C. Every one
of the 11 C call sites uses the full macro, never
H-only (verified per site above). Mechanism
confirmed: `confer_oc_oprop`
(`js/do_wear.js:409`, read) writes
`uprops[p].extrinsic` for worn items and mirrors E
flats only for BLINDED/FAST/TELEPAT/STEALTH/
LEVITATION — never POISON_RES — so the ring path
was invisible to every old reader. Precedent real:
`js/mon.js:298`, `js/region.js:1224` already read
uprops POISON_RES. No symbol deleted or re-pointed
(const import extension only), so no sym.mjs paste
is owed. Over-read risk nil: OR-ing C's own two
storage halves cannot over-fire; stuck-bit class
checked on the sibling D-3783 probe.

## Hallucinations / overclaim

None. Diff grep: zero hits (FORCE/DIAG/seed/
coords). Rule #2 clean repo-wide
(`imports.mjs --rulecheck`). The "C early-out
repeats @1147/@1169, pre-ring bites prove mid-game
gain" chain is session-measured, not inferred.

## Density

Cliff-phase §2b: one row, writer family shipped
whole (all 11 predicates, one macro — the D-3770
Unaware precedent, not a sweep). No bundling.
95302 → do_statusline2@1550 (+428).

## Verification

D-log Verify: mhitm_really_poison 1 moved; reach
1/1 + 21/21; gates + cohort PASS.

Re-measured by this audit (`verify
mhitm_really_poison,poisoned --base 7646f6dc1~1
--reach-all`):

```text
verify mhitm_really_poison: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Samurai-95302: moved → do_statusline2 at step 1550 (was 1122)
reach mhitm_really_poison: 1 PASS, 0 regressed → REACH-OK
verify poisoned: no corpus session is blocked on it […] vacuous […]
reach poisoned: 21 PASS, 0 regressed → REACH-OK
```

Movement + reach match the D-log exactly, 0
regressed. The poisoned leg is honestly labeled
vacuous (writer fn).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
