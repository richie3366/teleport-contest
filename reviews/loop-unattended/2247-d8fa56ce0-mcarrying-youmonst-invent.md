# Review 2247 — d8fa56ce0 — m_carrying youmonst→invent branch

Metadata: SHA `d8fa56ce0085a417c8c35e6ed3a4c56e81ad0fb5` (D-3286,
2026-10-02). `js/mon.js` only (+15/−1, no import
changes). One function: `m_carrying` (C
mthrowu.c:1404–1414; whole 11-line body).

Intent vs deliverable: subject promises the
youmonst→invent branch (mthrowu.c:1409). The diff
ships the hero arm first, keeps the monster `nobj`
walk, and fixes the doc cite (`invent.c` →
`mthrowu.c:1405–1414`). Delivers what it promises.

Inventory:

- Hero arm (:428–433): `mon === game.youmonst ||
  mon._youmonst` iterates the `game.invent` array,
  first `otyp` match or null.
- Monster arm (:434–437): unchanged `nobj` walk;
  null carrier still returns null.
- No symbol deleted, re-pointed, or imported (same
  export, `game` pre-imported) → ran `sym.mjs`
  anyway: `m_carrying js/mon.js:427 sync`, single
  export, no clones ✓.

**C ↔ JS fidelity**: C is one `for` with the
`(mtmp == &gy.youmonst) ? gi.invent :
mtmp->minvent` ternary start (:1409–1411), first
`otyp` match or NULL. JS hero arm ≡ C: the array
iteration is the representational equivalent of
the chain walk (JS hero invent is an array, cf.
hack.js `carrying`); the `o &&` hole-guard only
tolerates sparse slots, no behavior change ✓.
Monster arm ≡ C verbatim (`mon?.minvent`, `nobj`
step, `otyp` compare) ✓. Null → null is a safe
extension of C NONNULLARG1 (header :2043) ✓. No
RNG in the body; branch order matches the ternary
semantics ✓. Caller wiring: D-log maps all 30 C
refs; spot-verified the live C hero path
uhitm.c:5235 → uhitm.js:328 with the hero
pre-split at :326–327 (`is_u` → `carrying_otyp`,
else `m_carrying`) ✓. monmove.c:100–102 stays a
pre-existing inlined monster-only walk (out of
diff, disclosed, not rewired).

Hallucinations / overclaim: none. Latency is
disclosed (all JS sites pre-split or
monster-only), and the vacuous hidden line is
labeled a coverage row, not a corpus PASS.

Density: single whole C leaf (11 lines, no
callees) — below ~80 ins but the exception is
documented (queue 4/8, coverage generator dry at
commit time; leaf has no closure to grow).
`Ledger: m_carrying` via mthrowu.c.jsonl ✓, one
Verify bullet ✓.

Verification: D-log Verify shows hidden-vacuous +
smoke REACH-OK + green/strict/cohort. Re-measured
(`hidden-proxy.mjs verify m_carrying --base
d8fa56ce0~1 --reach-all`): `0 session(s) blocked`
+ vacuous note + `smoke 24 PASS, 0 regressed →
REACH-OK`. Matches the D-log exactly; zero
REGRESSED. Banned-pattern grep (FORCE/DIAG/
getRngLog/seeds/fastforward/coords): clean.
Rule #2 clean (`imports.mjs --rulecheck`, this
iteration, whole scored tree).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
