# Review 2299 — dfc2974da — somex dog.js clone removal

Metadata: SHA `dfc2974da`, D-3343, C `mkroom.c:665–669`,
JS live `js/mklev.js:32977` (untouched), 3 sites in `js/dog.js`
(`somexy`). Stat: 11 files, `js/dog.js +5/-9` (import + 3 site
comments, clone deleted) + test extension.

Intent vs deliverable: subject promises "somex dog.js clone removal
(3 sites → live js/mklev.js export)". Diff actually: adds `import {
somex } from './mklev.js'` (new static dog→mklev edge), deletes the
clone, re-points the doc comment at the kept `somey` clone, one
C-cite comment per site (`:905/:920/:926`). Site expressions
unchanged. Matches promise.

Inventory: 1 function: `somex` (clone→import). Deleted clone:
`rn1((hx|0)-(lx|0)+1, lx|0)`. Kept: local `somey` clone —
pre-existing, honestly documented ("kept: no queued row", not
cycle-forced), out of this SHA's scope. Census now sole
`js/mklev.js` per the extended test.

C ↔ JS fidelity: C (`mkroom.c:665–669`, via `csym.mjs`):

```c
somex(struct mkroom *croom)
{
    return rn1(croom->hx - croom->lx + 1, croom->lx);
}
```

One RNG draw, no branches. Live JS (`js/mklev.js:32977`): `rn1(
croom.hx - croom.lx + 1, croom.lx)` — exact, call-for-call.
Micro-note: the deleted clone applied `|0` folding that live (like C,
whose struct fields are ints) omits; for real room coords these agree,
and live matches C's expression exactly — the rewire removes a
deviation, not a guard. The retired "dog cannot import mklev (mklev →
trap → dog)" rationale is correctly superseded: same 101-module SCC,
hoisted fn, `--can` SAFE at commit time (ALREADY now), and the full
corpus reach below judges TDZ empirically — 706 sessions exercise the
new edge with no throw. Branch-by-branch confirm (single-expression
function).

Hallucinations / overclaim: none. The test expectation change
(census `['js/mklev.js']`) is explained in the message, not
smuggled. "Behavior-identical" holds on all reachable inputs.

Density: single-function rewire. One fidelity block, one `Ledger:
somex` entry. Extended maintained test (5/5 pass, re-run this
review). Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify somex --base dfc2974da~1
--reach-all` → 0 blocked + **full reach 706/706 PASS, 0 regressed →
REACH-OK** (stronger than the D-log's 80-spread line — `--reach-all`
ran all 706). No REGRESSED session. `--can dog→mklev` ALREADY. Diff
grep: no banned patterns. `sym.mjs` output (required paste):

```text
somex            js/mklev.js:32977   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
