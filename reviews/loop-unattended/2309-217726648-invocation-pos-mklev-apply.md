# Review 2309 — 217726648 — invocation_pos mklev + apply removal

Metadata: SHA `217726648`, D-3353, C `hack.c:981–986`,
JS live `js/hack.js:3434` (untouched). Stat: `apply.js +15/-15`,
`mklev.js +14/-14`; test evolved (lev→pos, 65 lines).

Intent vs deliverable: subject promises "invocation_pos mklev.js
+ apply.js clone removal (3 sites → live export)". Diff actually:
2 ALREADY →hack extensions, 2 clones deleted, 3 sites re-pointed,
apply→dungeon edge dropped (orphaned). Matches promise.

Inventory: 1 function: `invocation_pos` (2 clone→import). Both
deleted clones are **clones** (apply: `game.inv_pos ||` +
`!ip` guard; mk: `svi_inv_pos()` + `{0,0}` compare). Live target
a **C callee**; its callee `Invocation_lev` is **LIVE**. No stubs.

C ↔ JS fidelity: C (`hack.c:981–986`, via `csym.mjs`):

```c
return (boolean) (Invocation_lev(&u.uz)
                  && x == svi.inv_pos.x && y == svi.inv_pos.y);
```

No RNG. Live JS (`js/hack.js:3434–3440`): `!u || !
Invocation_lev(u.uz) → false`, then `(x,y)==(svi.inv_pos ||
game.inv_pos)` with `!ip → false`. Two deltas vs C, both
pre-existing properties of the live export (not introduced by this
diff): (a) unset inv_pos → false where C's zero-init `{0,0}`
compares true at (0,0); (b) `game.inv_pos` fallback after svi.
This SHA's effect is which callers resolve to it. Rewire deltas:
apply sites gain C-truer svi-first order (clone preferred
top-level `game.inv_pos`); mklev `occupied` loses the clone's
invented mutation (`svi_inv_pos()` created state inside a pure
C predicate — a real impurity removed) and gains the unset→false
corner. Corner reachability: observable only with
Invocation_lev ∧ inv_pos-unset ∧ query (0,0); hero-pos callers
never pass (0,0), and `pick_vibrasquare_location`
(`js/mklev.js:20851–20888`) draws candidates ≥ 7 and creates
`{0,0}` before its `occupied` checks — identical to C there.
Unobservable in practice; net toward C. The 3 sites match real C
callers (`--callers`: apply.c:1209 use_bell, apply.c:1361
use_candelabrum, mklev.c:1810 occupied); artifact/getpos/hack/
spell callers are other rows' scope.

Hallucinations / overclaim: none. Dropped-edge claim verified
(no other apply.js `Invocation_lev` use; mklev keeps :150).

Density: single-function 2-file rewire; one fidelity block, one
`Ledger: invocation_pos` entry. Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify invocation_pos --base
217726648~1 --reach-all` → "0 session(s) blocked (0 at baseline,
0 working)" + "no RNG-tagged reach; fixed smoke spread (24 run):
24 PASS, 0 regressed → REACH-OK"; matches the D-log, queue row
cited 0 blocks. `--can` mklev/apply →hack both ALREADY. Diff
grep: no banned patterns. `sym.mjs` output (required paste):

```text
invocation_pos   js/hack.js:3434   sync
```

Single live definer. Maintained test: 4/5 pass at this tree —
the import regex fails only because D-3354 appends `On_stairs`
to the apply.js hack line (see review 2310); dropped-edge,
site-call and census subtests pass.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
