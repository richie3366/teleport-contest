# Review 2300 — 459a611e1 — Invocation_lev hack.js clone removal

Metadata: SHA `459a611e1`, D-3344, C `dungeon.c:2016–2021`,
JS live `js/dungeon.js:2392` (body untouched, comment refreshed),
sole site `js/hack.js:3436`. Stat: 11 files, `js/hack.js +1/-12`,
`js/dungeon.js` 1-line comment.

Intent vs deliverable: subject promises "Invocation_lev hack.js clone
removal (sole site → live export)". Diff actually: extends the ALREADY
dungeon import with `Invocation_lev`, deletes the clone, refreshes
the live doc comment. Site expression unchanged. Matches promise.

Inventory: 1 function: `Invocation_lev` (clone→import). The deleted
clone is line-for-line identical to live. Remaining renamed clones
(`Invocation_lev_apply` js/apply.js:4147, `Invocation_lev_mk`
js/mklev.js:20842) confirmed via `sym.mjs`, named in the refreshed
comment as out-of-cluster — and both already have Open rows in
LOOP-QUEUE's missing-arm section, so no coverage is lost by leaving
them.

C ↔ JS fidelity: C (`dungeon.c:2016–2021`, via `csym.mjs`):

```c
Invocation_lev(d_level *lev)
{
    return (boolean) (In_hell(lev)
                   && lev->dlevel == svd.dungeons[lev->dnum].num_dunlevs - 1);
}
```

Single expression — no branches, no RNG. Live JS
(`js/dungeon.js:2392–2397`):

```js
export function Invocation_lev(lev) {
    if (!lev) return false;
    const dun = game.dungeons?.[lev.dnum | 0];
    if (!dun?.flags?.hellish) return false;
    return (lev.dlevel | 0) === ((dun.num_dunlevs | 0) - 1);
}
```

Exact: `!lev` guard is JS null-safety (C takes non-null), the
hellish-flag check is `In_hell`, same `dlevel === num_dunlevs - 1`
comparison with `|0` folding. The deleted clone was byte-identical in
behavior → behavior-identical rewire as claimed. Branch-by-branch
confirm (single-expression function).

Hallucinations / overclaim: none.

Density: single-function minimal rewire (smallest js diff in this
batch: ~13 lines). One fidelity block, one `Ledger: Invocation_lev`
entry. No maintained test — acceptable for a byte-identical rewire,
though the batch's own norm (tests on 6 of 9 SHAs) would have allowed
one; not a debt. Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify Invocation_lev --base 459a611e1~1
--reach-all` → 0 blocked + "no RNG-tagged reach; fixed smoke spread
(24 run): 24 PASS, 0 regressed → REACH-OK"; matches D-log. `--can
hack→dungeon` ALREADY. Diff grep: no banned patterns. `sym.mjs`
output (required paste):

```text
Invocation_lev   js/dungeon.js:2392   sync
Invocation_lev_apply NOT EXPORTED — but 1 LOCAL CLONE(S): js/apply.js:4147
Invocation_lev_mk NOT EXPORTED — but 1 LOCAL CLONE(S): js/mklev.js:20842
```

Single live definer under the canonical name; the 2 renamed clones
are documented, queued, and out of scope.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
