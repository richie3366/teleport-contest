# Review 2308 — 85e8a632f — unique_corpstat ×4 + attacktype engrave removal

Metadata: SHA `85e8a632f`, D-3352, C `mondata.h:174` (macro) +
`mondata.c:53–57`, JS live `js/mon.js:2961` / `js/mondata.js:79`
(both untouched). Stat: 6 js files (engrave/mondata/music/
teleport/trap/zap), 5 clones deleted, 10 sites rewired, no new test.

Intent vs deliverable: subject promises "unique_corpstat 4-clone
removal + attacktype engrave.js clone removal". Diff actually: 4
ALREADY →mon extensions, 1 new engrave→mondata edge, 5 clones
deleted, G_UNIQ import drops where orphaned. Matches promise. The
commit message prints only the unique_corpstat Verify/Named
bullets; the D-log entry carries both functions' bullets — message
truncation, record complete.

Inventory (unique_corpstat): 4 clone→import (trap/teleport/zap/
music). All **clones** (3 byte-identical, music `?? 0` shape).
Live target a **C callee**. No stubs.

Inventory (attacktype): 1 clone→import (engrave, raw-`===` scan).
Live target the D-3350 canonical export (review 2306: exact).

C ↔ JS fidelity (unique_corpstat): C (`mondata.h:174`):

```c
#define unique_corpstat(ptr) (((ptr)->geno & G_UNIQ) != 0)
```

No RNG. Live JS (`js/mon.js:2961–2963`): `!!((ptr?.geno | 0) &
G_UNIQ)` — exact for int geno; guards benign. Music `?? 0` vs
`| 0`: identical for undefined/null/numbers/strings (the `&`
coerces anyway); C geno is int, so on-domain identical.
Branch-by-branch confirm. D-log Callers maps all 7 rewired sites
to real C refs (`--callers`: trap.c:795/802, teleport.c:59,
monmove.c:260 via teleport's onscary copy + live mon.js:374,
read.c:3126, zap.c:1097, music.c:51); pre-existing mon.js:374/
3011 sites untouched. Out-of-scope inlines (trap.js:7049 named
omit, trap.js:1169/3497, zap.js:5097) are direct G_UNIQ uses, not
clones — correctly left.

C ↔ JS fidelity (attacktype): live export reviewed exact in 2306.
Engrave clone was a raw-`===` mattk scan; the 3 sites (sticks ×2
= C mondata.c:657–658, can_reach_floor = C engrave.c:197) pass
const AT_HUGS/AT_ENGL — on-domain identical to the live `|0`
fold. Branch-by-branch confirm via 2306.

Hallucinations / overclaim: none on fidelity. Two test-
maintenance misses (not C-wrongs): appending to the teleport.js
mon import breaks the D-3348 `m-in-air-rewire` regex (see review
2304), and removing the engrave clone invalidates half the D-3350
census expectation (see review 2306). Later-SHA staleness pattern;
substance holds in both.

Density: 2-function same-module (mondata predicate family)
cluster; the D-log defends the header-macro + function pairing
(ledger fail-closed needs a `.c` key; D-3096 precedent) and both
functions get full Inventory/fidelity/Verify/Callers bullets —
only the `Ledger:` line is single (`attacktype ported`, macro
unresolvable), as documented. Not an unrelated bundle. Verdict
per function: unique_corpstat ACCEPT; attacktype ACCEPT.

Verification: re-measured in one call — `verify
unique_corpstat,attacktype --base 85e8a632f~1 --reach-all` → both
"0 session(s) blocked (0 at baseline, 0 working)" + "no
RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0
regressed → REACH-OK"; matches the D-log (rows cited 0 blocks)
plus its combined `verify.mjs` PASS (syntax 6, rule2, green 2/2,
strict 2/2, cohort 7/7). `--can`: all five edges ALREADY now
(engrave→mondata new at commit time). Diff grep: no banned
patterns. `sym.mjs` output (required paste):

```text
unique_corpstat  js/mon.js:2961   sync
```

(`attacktype` single-definer output already pasted in review
2306.) Single live definers, clone count 0 for the shipped rows.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
