# Review 2700 — 9aa67c471 — doturn known_spell/spelleffects arm

Metadata: SHA `9aa67c471`, D-3837, cliffs-head `spell.c`
spelleffects_check writer (owner proven already-whole,
ledger ported D-2078, body live js/spell.js:2054). JS:
`js/pray.js` (+10/−7: arm + import + const + doc). Test:
`scripts/doturn-turn-undead-spell.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: sweep-Wizard-578137@545 `#turn`: C doturn sees a
Wizard who knows SPE_TURN_UNDEAD and casts via spelleffects;
JS took the deferred don't-know branch. Port C :2419–2424
verbatim; session PASSes. Diff actually does: the arm +
`spelleffects` joining the existing spell.js import (edge
already exists; spell.js imports nothing from pray.js) +
SPE_TURN_UNDEAD via the in-file objectNames idiom + deferral
notes retired. Match.

## Inventory

- `doturn` (js/pray.js:2975–2985) — changed: the
  non-Cleric/Knight arm. C: `nethack-c/upstream/src/pray.c:2413–2487`
  (csym): `if (!Role_if(PM_CLERIC) && !Role_if(PM_KNIGHT)) {
  /* Try to use the "turn undead" spell. */ if
  (known_spell(SPE_TURN_UNDEAD)) return
  spelleffects(SPE_TURN_UNDEAD, FALSE, FALSE);
  You("don't know how to turn undead!"); return ECMD_OK; }`.
  JS is line-identical (Role_if guards pre-existing).
- Truthiness proof (the one subtle point): C `spell.h:20–25`
  `enum spellknowledge { spe_Forgotten = -1, spe_Unknown = 0,
  spe_Fresh = 1, spe_GoingStale = 2 }`; JS `js/spell.js:264–267`
  identical values; C `known_spell spell.c:2362–2375` (csym)
  returns the same Fresh/GoingStale/Forgotten/Unknown ternary
  JS mirrors (js/spell.js:1490–1499). So JS truthiness ⟺ C
  nonzero on all four outcomes — including Forgotten, which
  casts into the backfire path on both sides, exactly as the
  D-log claims.
- `spelleffects` (js/spell.js:2638, async per `sym.mjs`) —
  LIVE import; `return spelleffects(...)` from async doturn
  adopts the promise, correct. No clones, no re-points.

## C ↔ JS fidelity

Verbatim port of the cited range; enum values and the
known_spell body verified equal call-for-call above. No RNG in
the arm itself (the cast's draws live in spelleffects, LIVE
and REACH-OK). Gap: none.

## Hallucinations / overclaim

None. Owner-vs-writer evidenced (ledger + brief body), the
alternatives left standing are named precisely (resist-TELL
pline polish, nhl_doturn lua caller), and the import-safety
claim (`--can` ALREADY, no cycle) is checkable and checked.

## Density

Cliff-phase: head writer correct (doturn deferred arm, not a
re-port of the owner). One arm, whole; the retired deferral
notes match the shipped code. Ledger: `doturn ported` +
D-3837. Verify bullet: 1 PASS + REACH-OK ×2 + green + strict
+ cohort. Not unreached: probe PASSes.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify
spelleffects_check,doturn --base 9aa67c471~1` →
spelleffects_check: 1 blocked at parent → `1 PASS, 0 moved
past, 0 unchanged, 0 worse` (Wizard-578137 PASS — exact claim);
reach 80/80 REACH-OK; doturn: 0 blocked (writer, expected),
smoke 24/24 REACH-OK. Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
