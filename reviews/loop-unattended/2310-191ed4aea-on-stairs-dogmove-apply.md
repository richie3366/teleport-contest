# Review 2310 — 191ed4aea — On_stairs dogmove + apply removal

Metadata: SHA `191ed4aea`, D-3354, C `stairs.c:147–151`,
JS live `js/hack.js:3409` (untouched). Stat: `apply.js +11/-11`,
`dogmove.js +18/-18`, new test file (63 lines).

Intent vs deliverable: subject promises "On_stairs dogmove.js +
apply.js clone removal (3 sites → live export)". Diff actually: 2
ALREADY →hack extensions, 2 clones deleted, 3 sites re-pointed,
dogmove→const STAIRS edge dropped (orphaned). Matches promise.

Inventory: 1 function: `On_stairs` (2 clone→import). Deleted
clones are **clones** (apply: literal `stairway_at`; dogmove:
endpoint+typ heuristic). Live target a **C callee** whose
game.stairs walk is a documented inline of `stairway_at`'s loop
(verified: hack.js has no mklev import, so the rationale holds).
No stubs.

C ↔ JS fidelity: C (`stairs.c:147–151`, via `csym.mjs`):

```c
return (stairway_at(x, y) != NULL);
```

No RNG. Live JS (`js/hack.js:3409–3416`): walks `game.stairs`
comparing `|0`-folded (sx,sy) — the `stairway_at` loop, exact
given the mirrored stairs list. Branch-by-branch confirm. Delta
vs clones: apply clone was already literal-C (identical); dogmove
endpoint+typ heuristic now becomes literal-C — toward C wherever
the stairs list and the heuristic disagree (non-endpoint
stairways, atyp-typed stairs). The 3 sites match real C callers
(`--callers`: apply.c:1210 use_bell, apply.c:1361
use_candelabrum, dogmove.c:583 hero-on-stairs); dig/dungeon/
artifact/hack/polyself/spell/apply.c:2843 callers are other rows'
scope.

Hallucinations / overclaim: none on fidelity. One test-
maintenance miss (not a C-wrong): appending `On_stairs` to the
apply.js hack import breaks the D-3353 `invocation-pos-rewire`
exact-line regex (see review 2309) — this SHA should have relaxed
it. Noted, not queued.

Density: single-function 2-file rewire; one fidelity block, one
`Ledger: On_stairs` entry. Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify On_stairs --base 191ed4aea~1
--reach-all` → "0 session(s) blocked (0 at baseline, 0 working)"
+ "no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0
regressed → REACH-OK"; matches the D-log, queue row cited 0
blocks. `--can` dogmove/apply →hack both ALREADY. Diff grep: no
banned patterns. `sym.mjs` output (required paste):

```text
On_stairs        js/hack.js:3409   sync
```

Single live definer. Maintained test: 5/5 pass at this tree
(re-run here).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
