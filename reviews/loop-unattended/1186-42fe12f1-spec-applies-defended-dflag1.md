# Review 1186 — 42fe12f1 — spec_applies defended/DFLAG1 remainder (D-2220)

Metadata: SHA `42fe12f1`, `js/artifact.js` only,
D-2220. Queue row `artifact.c` defended()/DFLAG1
(named data.md:106, 0 blocked) — two named-deferred
arms inside `spec_applies`.

Intent vs deliverable: subject promises the
defended() guard plus the DFLAG1 arm. Diff delivers
exactly those two, plus doc updates retiring the
omits. Nothing else.

Inventory: one new import (`defended` from
`./mondata.js`) — but `imports.mjs --can` reports
ALREADY, so not even a new edge; no new cycle risk.
DFLAG1 stub (`return 0`) replaced by the live arm;
ATTK gains the guard line. No body deleted, no clone
added. `sym.mjs`: defended `mondata.js:135` sync
export.

**C ↔ JS fidelity**: checked against pinned
`artifact.c:1008–1060` (csym range cited). DFLAG1
`:1024–1025` `((ptr->mflags1 & weap->mtype) != 0L)`
≡ JS `(((ptr?.mflags1 | 0) & (weap.mtype | 0)) !== 0)
? 1 : 0` — 1/0 matches the neighboring DFLAG2-arm
idiom ✓. ATTK guard `:1036–1037`
`if (defended(mtmp, adtyp)) return FALSE` ≡ JS
`if (defended(mtmp, ad)) return 0;` in C position
before the switch ✓. Callee closure: `defended`
LIVE — JS `mondata.js:138–160` verified arm-for-arm
vs C `mondata.c:89–124` (wielded-artifact →
adult-dragon self-suit → worn W_ARM suit; hero
uwep/uarm, monster MON_WEP/which_armor). No STUB in
either touched arm. Remaining omits (DFLAG2
yours/Upolyd/ulycn, resists_* grants, Poison/Stone
uprops fallback) stay named in the map + header.

Hallucinations / overclaim: none. The commit message
claims "one new import edge" where the edge
pre-exists (ALREADY) — strictly safer than claimed,
not an overclaim of behavior. D-log does not claim a
corpus PASS.

Density: §2b right-size — two arms, one function,
one module.

Verification: re-measured —
`hidden-proxy verify spec_applies --base 42fe12f1~1`
→ 0 blocked at baseline and working scoreboard +
vacuous warning. Row cited 0 blocks; honest.
Rule #2 clean; no FORCE/DIAG/seed gates in the diff.
Green/strict/cohort claimed; HEAD re-confirmation
with the iteration cadence run.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
