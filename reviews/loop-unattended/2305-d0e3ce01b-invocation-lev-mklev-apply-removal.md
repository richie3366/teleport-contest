# Review 2305 — d0e3ce01b — Invocation_lev mklev + apply removal

Metadata: SHA `d0e3ce01b`, D-3349, C `dungeon.c:2016–2021`,
JS live `js/dungeon.js:2392` (untouched body). Stat: `apply.js
+12/-12`, `dungeon.js +2/-2` (comment), `mklev.js +16/-16`, test
file (later evolved by D-3353, see below).

Intent vs deliverable: subject promises "Invocation_lev mklev.js +
apply.js clone removal (3 sites → live export)". Diff actually: no
mklev import change (live already imported), 1 new apply→dungeon
edge, 2 clones deleted, 3 sites re-pointed. Matches promise.

Inventory: 1 function: `Invocation_lev` (2 clone→import). Both
deleted clones are **clones** (same hellish/deepest-1 shape, one
with a no-arg default). Live target is a **C callee**. No stubs.

C ↔ JS fidelity: C (`dungeon.c:2016–2021`, via `csym.mjs`):

```c
return (boolean) (In_hell(lev)
               && lev->dlevel == svd.dungeons[lev->dnum].num_dunlevs - 1);
```

No RNG. Live JS (`js/dungeon.js:2392–2397`): `!lev → false` (C is
NONNULL; benign), `flags.hellish` gate (= In_hell), `dlevel ===
num_dunlevs - 1` — exact, in C order. Branch-by-branch confirm.
Delta vs clones: mk clone textually identical (arg-passing sites
unchanged in meaning); apply clone defaulted `lev ||
game.u?.uz` and its sole site passed no arg, so the new explicit
`Invocation_lev(game.u?.uz)` resolves the same value —
behavior-identical, as claimed. C callers (`--callers`:
dungeon.c ×3 in-module, hack.c:984, mkmaze.c ×2, nhlua.c:2021,
wizcmds.c:795, zap.c:3788): this SHA rewires the mklev (hellfill ~
nhlua shape) and apply (invocation_pos) sites; the rest are
in-module or other rows' scope.

Hallucinations / overclaim: none.

Density: single-function 2-file rewire; one fidelity block, one
`Ledger: Invocation_lev` entry. Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify Invocation_lev --base
d0e3ce01b~1 --reach-all` → "0 session(s) blocked (0 at baseline,
0 working)" + "no RNG-tagged reach; fixed smoke spread (24 run):
24 PASS, 0 regressed → REACH-OK"; matches the D-log, queue row
cited 0 blocks. `--can` mklev→dungeon ALREADY; apply→dungeon now
reports IN-SCC/SAFE (hoisted fn) because D-3353 dropped that edge
after the clone body went away — at commit time it was the new
SAFE edge the message describes. Diff grep: no banned patterns.
`sym.mjs` output (required paste):

```text
Invocation_lev   js/dungeon.js:2392   sync
```

Single live definer. Maintained test
`scripts/invocation-lev-rewire.test.mjs` no longer exists at this
tree — D-3353 evolved it into `invocation-pos-rewire.test.mjs`
(see review 2309); not re-runnable, by design of the later SHA.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
