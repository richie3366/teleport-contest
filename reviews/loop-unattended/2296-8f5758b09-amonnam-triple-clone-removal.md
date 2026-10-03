# Review 2296 — 8f5758b09 — Amonnam fountain+mhitu+zap clone removals

Metadata: SHA `8f5758b09`, D-3340, C `do_name.c:1158–1165`,
JS live `js/do_name.js:1234` (untouched), sites in `js/fountain.js`,
`js/mhitu.js`, `js/zap.js`. Stat: 14 files (incl. journal rotation),
js hunks `fountain.js +3/-10`, `mhitu.js +3/-10`, `zap.js +2/-7`.

Intent vs deliverable: subject promises "Amonnam fountain+mhitu+zap.js
clone removals (last 3 clones → live export)". Diff actually: extends
the three ALREADY do_name imports with `Amonnam`, deletes all 3
clones, removes the now-unused `x_monnam`/`ARTICLE_A` imports from
fountain+mhitu (zap keeps `mon_nam`, 14 other uses), one C-cite
comment per site. Matches promise; "last 3 clones" confirmed by
`sym.mjs` showing a single live definer now.

Inventory: 1 function: `Amonnam` (clone→import ×3). Three deleted
clones: fountain (`x_monnam`+ARTICLE_A, fallback `'A monster'`),
mhitu (same shape, fallback `'It'`), zap (`mon_nam`+highc — wrong
article, fallback `'it'`→`'It'`).

C ↔ JS fidelity: C (`do_name.c:1158–1165`, via `csym.mjs`):

```c
Amonnam(struct monst *mtmp)
{
    char *bp = a_monnam(mtmp);
    *bp = highc(*bp);
    return bp;
}
```

No RNG, no branches beyond the call. Live JS (`js/do_name.js:1234`):
`highc_name(a_monnam(mtmp))` where `highc_name` (`:793`) returns
`'It'` on empty — exact, plus a JS null-guard C never needs (C would
deref; `a_monnam` never returns empty). Per-clone deltas, all toward
C: (a) zap: the clone used `mon_nam` (ARTICLE_THE) where C calls
`Amonnam` (ARTICLE_A) — the article fix is C-faithful; (b)
fountain+mhitu clones called `x_monnam(...,0 /*no flags*/)` where live
`a_monnam` passes SUPPRESS_SADDLE for named monsters — matches C
`a_monnam`; (c) mhitu `'It'`→`'Something'` check preserved since
live's empty arm is identically `'It'` (live `highc_name`); (d)
fountain `'A monster'` vs live `'It'` empty fallback: unreachable for
real monsters (x_monnam always yields a name; same shape as D-3333
teleport, accepted in review 2289). All three site C-cites verified
via `--callers`: `fountain.c:184`, `mhitu.c:1176`, `zap.c:1212` all
call `Amonnam` with matching expressions. Branch-by-branch confirm
(single-expression function).

Hallucinations / overclaim: none. The D-log names each delta
honestly, including the unreachable fountain fallback.

Density: single-function 3-file rewire. One fidelity block, one
`Ledger: Amonnam` entry. Extended maintained test
`scripts/amonnam-rewire.test.mjs` (10/10 pass claimed; re-run this
review: 0 fail). Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify Amonnam --base 8f5758b09~1
--reach-all` → 0 blocked + "no RNG-tagged reach; fixed smoke spread
(24 run): 24 PASS, 0 regressed → REACH-OK"; matches D-log. `--can
fountain→do_name` ALREADY (same for mhitu/zap by the read import
blocks). Diff grep: no banned patterns. `sym.mjs` output (required
paste):

```text
Amonnam          js/do_name.js:1234   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
