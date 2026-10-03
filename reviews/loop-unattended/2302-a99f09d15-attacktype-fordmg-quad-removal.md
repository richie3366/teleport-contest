# Review 2302 — a99f09d15 — attacktype_fordmg 4-clone removal

Metadata: SHA `a99f09d15`, D-3346, C `mondata.c:41–50`,
JS live `js/uhitm.js:609` (untouched), 4 files rewired (apply, eat,
mon, region). Stat: 15 files (incl. journal rotation), `apply.js
+2/-17`, `eat.js +6/-21`, `mon.js +3/-17`, `region.js +4/-16` + new
test file.

Intent vs deliverable: subject promises "attacktype_fordmg 4-clone
removal (apply/eat/mon/region → live export)". Diff actually: extends
1 ALREADY uhitm edge (apply) + 3 new static edges (eat/mon/region),
deletes all 4 clones, adds C-cite comments. Zero call-site expression
changes. Matches promise, with one message imprecision: "8 sites" —
the diff touches 6 references (apply:4669, eat:857, eat:2156, the eat
`attacktype` wrapper, mon:336, region:342), and none changed
textually. Count wrong, substance right.

Inventory: 1 function: `attacktype_fordmg` (clone→import ×4). All 4
deleted clones are the identical mattk-scan shape. The eat.js
`attacktype` wrapper (calls fordmg with -1) is kept and now rides the
live export — correctly re-documented, as is the eat.js fpostfx doc
block that named the in-file clone.

C ↔ JS fidelity: C (`mondata.c:41–50`, via `csym.mjs`):

```c
attacktype_fordmg(struct permonst *ptr, int atyp, int dtyp)
{
    struct attack *a;
    for (a = &ptr->mattk[0]; a < &ptr->mattk[NATTK]; a++)
        if (a->aatyp == atyp && (dtyp == AD_ANY || a->adtyp == dtyp))
            return a;
    return (struct attack *) 0;
}
```

No RNG. Live JS (`js/uhitm.js:609–620`): same loop over `slots`
(length NATTK), `(a?.aatyp|0) === (atyp|0) && (dtyp === -1 ||
(a?.adtyp|0) === (dtyp|0))`, null on miss — exact, with AD_ANY=-1.
Delta vs clones: live folds the *params* with `|0` where clones
compared raw `atyp`/`dtyp`. The message's claim ("all sites pass int
params so the folding is a no-op") holds: every site passes integer
constants or `|0`-folded values, and `(int|0)===int`. The `!slots →
null` guard is shared by live and all clones (C assumes non-null
`ptr`; benign). Branch-by-branch confirm.

Hallucinations / overclaim: only the "8 sites" count (actually 6
references, 0 changed). No fidelity overclaim — "behavior-identical"
is accurate.

Density: single-function 4-file rewire. One fidelity block, one
`Ledger: attacktype_fordmg` entry. Maintained test
`scripts/attacktype-fordmg-rewire.test.mjs` (3/3 pass, re-run this
review). Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify attacktype_fordmg --base
a99f09d15~1 --reach-all` → 0 blocked + "no RNG-tagged reach; fixed
smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK"; matches
D-log. `--can` all four →uhitm now ALREADY (3 added by this commit;
were SAFE at commit time). Diff grep: no banned patterns. `sym.mjs`
output (required paste):

```text
attacktype_fordmg js/uhitm.js:609   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
