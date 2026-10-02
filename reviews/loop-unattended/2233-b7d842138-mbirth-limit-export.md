# Review 2233 — b7d842138 — mbirth_limit canonical export

Metadata: SHA `b7d842138cdac3bd3465e0cce2d9e024440c8954` (D-3272,
2026-10-02). `js/makemon.js` + `js/dog.js` (+49/−27, mostly
deletions + doc). Single pure function `mbirth_limit` (C
makemon.c:1541–1551).

Intent vs deliverable: subject promises "mbirth_limit
canonical export (clone consolidation)". The diff promotes
the makemon.js local to export, deletes the dog.js clone +
its two consts, and corrects the abuse_dog doc. Delivers
what it promises.

Inventory:

- `mbirth_limit` (`js/makemon.js:1572`): local → `export
  function` (same if-chain, C-cited doc naming all 3 C
  callers). C-home file ✓.
- Deleted: dog.js:159–165 clone (body identical to the
  canonical) + module consts PM_NAZGUL/PM_ERINYS —
  repo-grep confirms zero remaining uses in dog.js (they
  were unexported locals) ✓.
- Import: `mbirth_limit` added to dog.js:6's pre-existing
  makemon.js edge; no new module edge, hoisted decl ✓.
- Doc-only: abuse_dog "callers deferred" → "All 5 C call
  sites wired".
- `sym.mjs mbirth_limit` (required): `mbirth_limit
  js/makemon.js:1572 sync` — single export, zero clones.
  Output pasted as required.

**C ↔ JS fidelity — `mbirth_limit`**: JS if-chain ≡ C's
`mndx==PM_NAZGUL ? 9 : mndx==PM_ERINYS ? 3 : MAXMONNO`
exactly ✓ (incl. the high-priest comment carried into the
doc). Pure, no RNG, no callees ✓. C callers exactly 3
(dog.c:117, makemon.c:961, mon.c:5298) ✓ — matches the
D-log; JS sites dog.js:195 / makemon.js:1593+2081 wired
to the canonical (single export ⇒ all resolve to it) ✓.

**C ↔ JS fidelity — `abuse_dog` doc claim**: C has 5 call
sites (dokick.c:72, hack.c:2186, trap.c:5486, uhitm.c:1595,
zap.c:415) + extern decl; JS has 5 matching call sites
(dokick.js:846, hack.js:1483, trap.js:7521, uhitm.js:2147,
zap.js:4315), one per C file ✓. The "verified, not a gap"
correction is itself verified.

Hallucinations / overclaim: none. "Zero behavior change by
construction" holds — deleted body identical, consts
dead.

Density: single callee-free function with the below-80
exception documented (0 callees, no same-file Open rows,
coverage block empty — confirmed at HEAD). `Ledger:
mbirth_limit ported` + Verify line present.

Verification: D-log Verify shows PASS + vacuous note +
smoke REACH-OK + green/strict/cohort + full 44/44 (shared
file). Re-measured (`hidden-proxy.mjs verify mbirth_limit
--base b7d842138~1 --reach-all`): vacuous (0 blocked — the
queue row cited none, pure function, honest note) + smoke
24/24 PASS → REACH-OK. Zero regressed. Banned-pattern
grep: clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
