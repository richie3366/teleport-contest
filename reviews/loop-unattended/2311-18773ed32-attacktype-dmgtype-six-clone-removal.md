# Review 2311 — 18773ed32 — attacktype ×4 + dmgtype ×2 removal

Metadata: SHA `18773ed32`, D-3355, C `mondata.c:53–57` +
`mondata.c:711–715`, JS live `js/mondata.js:79` /
`js/monsters.js:565` (both untouched). Stat: 7 js files, 6 clones
deleted, 20 + 5 sites rewired, new test file (94 lines).

Intent vs deliverable: subject promises "attacktype 4-clone
removal + dmgtype 2-clone removal (makemon/muse/polyself/trap/
engrave/eat → live exports)". Diff actually: 6 ALREADY edge
extensions, 6 clones deleted, markers + doc refreshes. Matches
promise. Commit message again prints only the attacktype
Verify/Named bullets; the D-log carries both — truncation, record
complete.

Inventory (attacktype): 4 clone→import (makemon/muse/polyself/
trap). All **clones** (3 raw-`===`, trap `|0`-folded). Live
target exact per review 2306.

Inventory (dmgtype): 2 clone→import (engrave/eat, both
raw-`===`). Live target a **C callee**. Remaining same-name
clones (mhitm/mhitu/monmove) + `dmgtype_zap` + unexported
`dmgtype_fromattack` are queued follow-up rows, named out of
cluster — confirmed via `sym.mjs` below.

C ↔ JS fidelity (attacktype): live reviewed exact in 2306
(fordmg + AD_ANY wildcard ≡ `|0` aatyp scan). Deleted clones
identical on int inputs; all 20 sites pass const AT_* (D-log
Callers maps each: mon.c:5413, steal.c:647, muse.c ×8-shape,
polyself.c ×3 + can_breathe + cmd.c ×2 domonability,
trap.c ×4). No site passes non-int; off-domain the live fold is
C-truer. Branch-by-branch confirm via 2306.

C ↔ JS fidelity (dmgtype): C (`mondata.c:711–715` + `:698–708`):

```c
return dmgtype_fromattack(ptr, dtyp, AT_ANY) ? TRUE : FALSE;
/* fromattack: a->adtyp == dtyp && (atyp == AT_ANY || ...) */
```

No RNG. With the AT_ANY wildcard the fromattack scan is a pure
adtyp scan — live JS (`js/monsters.js:565–573`, `|0`-folded
adtyp loop) is exactly that. The 4 rewired sites (sticks ×2 =
C mondata.c:656–657, polyfood = obj.h:324, eat.c:1303) pass int
AD_* — identical to the deleted raw-`===` clones. One shape
note: live reads `a.adtyp` (non-optional) where clones used
`?.` — dense-mattk assumption, already load-bearing at 13+
pre-existing live sites; no new risk from this rewire.
Branch-by-branch confirm.

Hallucinations / overclaim: none on fidelity. Test-maintenance
miss (not a C-wrong): removing the last 4 attacktype clones
invalidates the D-3350 census subtest's expectation (see review
2306) — this SHA ships its own 5/5 census but leaves the stale
one failing. Same brittle-expectation pattern as 2303/2304/2309.

Density: 2-function same-C-file (mondata.c) cluster, both whole,
each with full D-log C-locus/JS/Callers/Verify/Named bullets +
`Ledger: attacktype ported; dmgtype ported` + combined
`verify.mjs` (syntax 7, rule2, green, strict, cohort, full
44/44). Verdict per function: attacktype ACCEPT; dmgtype ACCEPT.

Verification: re-measured in one call — `verify
attacktype,dmgtype --base 18773ed32~1 --reach-all` → both "0
session(s) blocked (0 at baseline, 0 working)" + "no RNG-tagged
reach; fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK"; matches the D-log (rows cited 0 blocks). `--can`: all
six edges ALREADY. Diff grep: no banned patterns. `sym.mjs`
output (required paste):

```text
dmgtype          js/monsters.js:565   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/mhitm.js:785  js/mhitu.js:1098  js/monmove.js:1400
```

Remaining clones are the queued follow-up rows — correctly left.
(`attacktype` single-definer output in review 2306.)

Actionable C-wrongs: none.

Verdict: **ACCEPT**
