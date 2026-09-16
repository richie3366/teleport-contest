# Review 1390 — c2935846 — fire-trap xtradmg/monkilled guard (D-2431)

- SHA: `c2935846`, D-2431 (Open row: Tourist-92061 step 3/169
  kind=rng — JS double-detaches a fire-trap kill C leaves single).
  JS files: `js/trap.js` only (nesting + export). Test:
  `scripts/fire-trap-xtradmg-guard.test.mjs` (2 its).
- Prior reviews closed: none (corpus-owner writer row, 1 block).

## Intent vs deliverable

Subject promises: xtradmg subtract + AD_FIRE `monkilled` nested
under the existing mhp>0 check in C `:1800–1806` order; export
`trapeffect_fire_trap` for the test pin; no new import. Diff
delivers exactly that. Promise == diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `trapeffect_fire_trap` guard (`js/trap.js`) | changed branch | LIVE — C `trap.c:1800–1806` |
| `trapeffect_fire_trap` export | export-status change | LIVE — single async def (`sym.mjs`: `js/trap.js:4499 ASYNC`); C `staticfn` exported for test pin per D-2416 precedent |
| `monkilled` / `mondied` callees | C callees (local) | CLONE — pre-existing bodies, untouched; known gaps named (see below) |
| `burnarmor \|\| rn2(3)` gate, `destroy_items`, `ignite_items` | surrounding | LIVE — pre-existing, untouched |
| `thitm` −AD_RBRE arm, `accessible` gate | not ported | OMIT — named in D-2431, pre-existing |

## C ↔ JS fidelity

C locus read directly (`trap.c:1797–1807`):

```c
if (burnarmor(mtmp) || rn2(3)) {
    int xtradmg = destroy_items(mtmp, AD_FIRE, orig_dmg);
    ignite_items(mtmp->minvent);
    if (!DEADMONSTER(mtmp)) {
        mtmp->mhp -= xtradmg;
        if (DEADMONSTER(mtmp)) { /* NOW it's dead */
            monkilled(mtmp, "", AD_FIRE);
            trapkilled = TRUE;
        }
    }
}
```

JS after: `if ((mhp|0) > 0) { mhp -= xtradmg; if (mhp<=0) {
monkilled; trapkilled=true; } }`. `DEADMONSTER` is `mhp < 1`,
so `!DEADMONSTER` ⟺ `mhp > 0` exactly — the guard, the
subtract-then-recheck order, and the `trapkilled` set all match
C branch-for-branch. The pre-fix shape (subtract guarded, kill
check a *separate* `if (mhp<=0)`) fired `monkilled` on a corpse
that entered dead — the double-detach (`mon.c:2792`
impossible) plus the second `corpse_chance` draw the session
showed. No RNG reordering: the draws removed are the ones C
never makes on this path.

On the clone question: `monkilled` here is a live local body,
not a stub, and the D-log names its known gaps (ignoring
`how`/disintegrated, missing accessibility gate) as map debt
with no session evidence on this path. The commit narrows the
clone's call conditions toward C; it does not widen them. Named
debt, correctly out of Must-fix.

## Hallucinations / overclaim

None. "Match C" is earned at the granularity claimed (the
guard); the callee gaps are disclosed, not papered over.

## Density

~8 net JS lines + 2 test its for a 1-session writer arm —
minimal and right-sized.

## Verification

D-log claims the new test 2/2 (pre-fix stash fails with
Input-queue-empty on the double-detach More) + `verify
distfleeck` PROGRESS (Tourist-92061 @3 → `doread`@17, 0 worse)
+ green/strict/cohort. Re-ran both myself: `node --test
scripts/fire-trap-xtradmg-guard.test.mjs` → 2 pass / 0 fail;
`hidden-proxy verify distfleeck --base c2935846~1` → `0 PASS, 1
moved past, 4 unchanged, 0 worse → PROGRESS` (Tourist-92061 →
`doread`@17, was 3; the other four residuals unchanged at
their rows). Confirmed, not vacuous. Diff grep: no
FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
