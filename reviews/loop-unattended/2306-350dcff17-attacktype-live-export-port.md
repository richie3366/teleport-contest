# Review 2306 — 350dcff17 — attacktype live-export port + 4-clone removal

Metadata: SHA `350dcff17`, D-3350, C `mondata.c:53–57`,
JS live `js/mondata.js:79` (new export). Stat: `artifact.js
+16/-16`, `dog.js +14/-14`, `eat.js +11/-11`, `mondata.js +17/+17`,
`wizard.js +16/-16`, new test file (61 lines).

Intent vs deliverable: subject promises "attacktype live-export
port + 4-clone removal (artifact/dog/wizard/eat → live export)".
Diff actually: new canonical export (1-line body + file-local
AD_ANY), 2 new static edges (mondata→uhitm, wizard→mondata), 3
ALREADY extensions, 4 clones deleted, 6 sites C-cited. Matches
promise.

Inventory: 1 function: `attacktype` (1 canonical port + 4
clone→import). Deleted clones are **clones** (3 scans + 1 eat
wrapper over the live fordmg). Callee `attacktype_fordmg` is
**LIVE** (`js/uhitm.js:609`, reviewed ACCEPT in 2302). No stubs.

C ↔ JS fidelity: C (`mondata.c:53–57`, via `csym.mjs`):

```c
return attacktype_fordmg(ptr, atyp, AD_ANY) ? TRUE : FALSE;
```

No RNG. Live JS (`js/mondata.js:79–81`): `attacktype_fordmg(ptr,
atyp, AD_ANY) ? true : false` with file-local `AD_ANY = -1`
(monattk.h:41) — exact. Branch-by-branch confirm. Delta vs
clones: artifact `|0`-scan and eat `!!fordmg(..., -1)` wrapper are
identical to the live path; dog/wizard raw-`===` scans differ only
on non-int inputs, impossible at these sites (const AT_WEAP /
AT_MAGC args, int mattk) and off-C-domain anyway (C compares
ints; live `|0` is the C-truer fold). All 6 sites match real C call
sites (`--callers`: artifact.c:1342, dog.c:210/1277, eat.c:1311,
wizard.c:650/674 — each C-cited in the diff). Remaining out-of-
cluster clones (engrave/makemon/muse/polyself/trap) are named in
the mondata.js canon comment and shipped in D-3352/D-3355.

Hallucinations / overclaim: none. The mondata→uhitm edge note
("uhitm already imports mondata") is honest about the cycle; both
are hoisted fns in the same SCC, runtime-only calls.

Density: single-function canonical port + 4-file rewire; one
fidelity block, one `Ledger: attacktype` entry. Verdict for the
function: ACCEPT.

Verification: `hidden-proxy verify attacktype --base 350dcff17~1
--reach-all` → "0 session(s) blocked (0 at baseline, 0 working)" +
"no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0
regressed → REACH-OK"; matches the D-log, queue rows cited 0
blocks. `--can` mondata→uhitm and wizard→mondata now ALREADY (new
at commit time). Diff grep: no banned patterns. `sym.mjs` output
(required paste):

```text
attacktype       js/mondata.js:79   sync
```

Single live definer. Maintained test: 2/3 pass at this tree — the
census subtest expects the 5 remaining clones that D-3352/D-3355
later removed (see reviews 2308/2311). Correct at commit time;
stale expectation now, substance holds.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
