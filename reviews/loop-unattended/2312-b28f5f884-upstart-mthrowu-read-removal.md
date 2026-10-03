# Review 2312 — b28f5f884 — upstart mthrowu+read clone removal

Metadata: SHA `b28f5f884`, D-3356, C `hacklib.c:113–119`,
JS live `js/hacklib.js:497-then` (body untouched, doc only).
Stat: 3 js files, 2 clones deleted, 2 sites rewired, new test
(51 lines).

Intent vs deliverable: subject promises "upstart mthrowu.js +
read.js clone removal (2 sites → live js/hacklib.js export)".
Diff actually: 2 import extensions, 2 clone deletions with
markers, canon-doc refresh, new test. Matches promise.

Inventory: 2 clone→import. Both deleted clones are **clones**
(`if (!str)` + locale `toUpperCase`, mthrowu :287-then /
read :2558-then). Live target is a **C callee**, exact: C `if
(s) *s = highc(*s); return s;` vs live null/`''` guard +
`String(s)` + `highc` first char. Rewrite-only; no new
function, no stub, no callee closure to audit.

C ↔ JS fidelity: branch-by-branch confirm. C has one branch
(`if (s)`) and no RNG; live JS mirrors it. The rewire swaps
the clones' locale-Unicode `toUpperCase` for ASCII-only
`highc` — D-log Callers discloses this plus the falsy-
passthrough→`String()` delta, with the domain argument
(onmbuf/nam are ASCII C strings; no site passes non-strings).
Both rewired sites map to real C call sites (mthrowu.c:113
thitu wide-miss → js/mthrowu.js:653-then; read.c:2783
genocide-nonexistent → js/read.js:2717-then). The live fold is
C-truer on every in-domain input; verify judges the rest.

Hallucinations / overclaim: none. Commit message prints the
full Verify/Named bullets; the "below ~80 bar, defended"
note cites the D-3341–D-3355 precedent honestly.

Density: 1-function whole-function cluster (upstart), with
D-log C-locus/JS/Callers/Verify/Named bullets +
`Ledger: upstart ported` + `verify.mjs` (syntax 3, rule2,
green 2/2, strict 2/2, cohort 7/7). Out-of-cluster clones
named (trap/pickup queued this commit; 4 unqueued). ACCEPT.

Verification: re-measured — `verify upstart --base
b28f5f884~1 --reach-all` → "0 session(s) blocked (0 at
baseline, 0 working)" + vacuous-note + "fixed smoke spread
(24 run): 24 PASS, 0 regressed → REACH-OK". Matches the D-log
(rows cited 0 blocks — the vacuous note is honest, not a
PASS claim). `--can`: both edges ALREADY. Rule #2 clean.
Diff grep: no banned patterns. `sym.mjs` output (required
paste; HEAD shows the campaign-complete state):

```text
upstart          js/hacklib.js:498   sync
```

No remaining clones — the single-definer output confirms the
D-3356+D-3358 campaign removed all 8.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
