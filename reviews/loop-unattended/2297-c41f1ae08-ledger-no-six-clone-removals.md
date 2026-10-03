# Review 2297 — c41f1ae08 — ledger_no six-file clone removals

Metadata: SHA `c41f1ae08`, D-3341, C `dungeon.c:1374–1379`,
JS live `js/dungeon.js:1098` (untouched), 6 files rewired (do, mon,
muse, potion, shknam, teleport). Stat: 15 files, js hunks
`do.js +7/-8`, `mon.js +4/-8`, `muse.js +13/-8`, `potion.js +4/-7`,
`shknam.js +3/-5`, `teleport.js +3/-7` (23 site comments dominate).

Intent vs deliverable: subject promises "ledger_no
do+mon+muse+potion+shknam+teleport.js clone removals (last 6 clones →
live export)". Diff actually: extends six ALREADY dungeon imports
with `ledger_no`, deletes 6 clones (one-line C-locus pointer left at
each deletion site), adds 23 C-cite site comments (22 above-line + 1
inline at the potion `Can_rise_up`-shape `&&` arm). Site expressions
unchanged. Matches promise.

Inventory: 1 function: `ledger_no` (clone→import ×6). All 6 deleted
clones are the identical `|0`-guarded `ledger_start + dlevel` shape
(only operand order varies — commutative, behavior-identical). "Last 6
clones" confirmed by `sym.mjs` census below.

C ↔ JS fidelity: C (`dungeon.c:1374–1379`, via `csym.mjs`):

```c
ledger_no(d_level *lev)
{
    return (xint16) (lev->dlevel + svd.dungeons[lev->dnum].ledger_start);
}
```

Single expression — no branches, no RNG. Live JS
(`js/dungeon.js:1098–1101`):

```js
export function ledger_no(lev) {
    const dun = game.dungeons?.[lev?.dnum | 0];
    return ((dun?.ledger_start | 0) + (lev?.dlevel | 0)) | 0;
}
```

Exact plus JS null-guards. The clones were already this exact shape,
so all 6 rewires are behavior-identical as claimed. 6 of the 23 site
C-cites spot-verified against `--callers` output — `do.c:1357`
(create_levelfile), `mon.c:3836` (m_into_limbo target_lev),
`muse.c:903` (migrate_to_level flev), `potion.c:1086` (on_lvl_1),
`shknam.c:507` (name_wanted), `teleport.c:2094`
(mlevel_tele_trap) — all real `ledger_no` call sites with matching
expressions. Branch-by-branch confirm (single-expression function).

Hallucinations / overclaim: none. "Behavior-identical" is accurate —
the one case in this batch where the delta claim is literally zero.

Density: single-function 6-file rewire. One fidelity block, one
`Ledger: ledger_no` entry. No maintained test added — acceptable: a
pure behavior-identical rewire of a 3-line pure function, with the
smoke line covering it. Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify ledger_no --base c41f1ae08~1
--reach-all` → 0 blocked + "no RNG-tagged reach; fixed smoke spread
(24 run): 24 PASS, 0 regressed → REACH-OK"; matches D-log. `--can`
ALREADY all six per D-log (edges proven by the read import blocks in
the diff). Diff grep: no banned patterns. `sym.mjs` output (required
paste):

```text
ledger_no        js/dungeon.js:1098   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
