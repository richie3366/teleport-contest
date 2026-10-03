# Review 2304 — 3d3580f61 — m_in_air canonical export + rewire

Metadata: SHA `3d3580f61`, D-3348, C `mon.c:2129–2136`,
JS live `js/mon.js:2300` (new export), sites in do/teleport/trap/mon.
Stat: `do.js +8/-8`, `mon.js +7/-7`, `teleport.js +12/-12`, `trap.js
+11/-11`, new test file (51 lines).

Intent vs deliverable: subject promises "m_in_air canonical export
+ do/teleport/trap.js rewire (12 sites → live export)". Diff
actually: upgrades the mon.js local to the full C body and exports
it, extends 3 ALREADY →mon edges, deletes 4 clones (do, mon-local,
teleport, trap). Matches promise; 12 = the C call-site count
(excluding the extern.h decl).

Inventory: 1 function: `m_in_air` (1 canonical port + 3
clone→import). All deleted clones are **clones**; the trap.js one
was already C-full. No stubs.

C ↔ JS fidelity: C (`mon.c:2129–2136`, via `csym.mjs`):

```c
return (is_flyer(mtmp->data)
        || is_floater(mtmp->data)
        || (is_clinger(mtmp->data)
            && has_ceiling(&u.uz) && mtmp->mundetected));
```

No RNG. Live JS (`js/mon.js:2300–2307`): `!ptr → false` guard (C is
NONNULL; benign), flyer/floater → true, else `is_clinger(ptr) &&
has_ceiling(game.u?.uz) && mtmp.mundetected` — exact, in C order,
with the live `has_ceiling` dungeon.js export. Branch-by-branch
confirm. Behavior deltas are C-true fixes, not drift: the old
mon.js local lacked the `has_ceiling` gate (true where C says
false on ceilingless levels), and the do/teleport clones lacked the
whole clinger arm (false where C says true). Trap sites identical.
C callers (`--callers`: do.c:89, mon.c:1053/1099/2166/2168,
teleport.c:147/161, trap.c:1441/1530/2608/2683/2743) map to the
rewired files; in-module mon.js uses keep resolving locally.

Hallucinations / overclaim: none. "Trap sites behavior-identical"
verified (clone text = live text modulo export). "12 sites" counts
C call sites, accurate.

Density: single-function canonical port + rewire; one fidelity
block, one `Ledger: m_in_air` entry. Verdict for the function:
ACCEPT.

Verification: `hidden-proxy verify m_in_air --base 3d3580f61~1
--reach-all` → "0 session(s) blocked (0 at baseline, 0 working)" +
"no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0
regressed → REACH-OK"; matches the D-log, queue row cited 0 blocks.
`--can` do/teleport/trap →mon all ALREADY. Diff grep: no banned
patterns. `sym.mjs` output (required paste):

```text
m_in_air         js/mon.js:2300   sync
```

Single live definer, clone count 0. Maintained test: 3/4 pass at
this tree — the import regex expects `m_in_air } from './mon.js'`
but D-3352 later appends `unique_corpstat` to the teleport.js line
(see review 2308). Brittle regex, substance holds.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
