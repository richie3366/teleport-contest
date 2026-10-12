# Review 2729 — 32ac8ebf9 — domove JS-only newsym(dest) (D-3869)

## Metadata

- SHA: `32ac8ebf9` (cliffs-head writer port)
- D-entry: D-3869; Ledger: `domove ported`
- js diff: `js/cmd.js` +6/−4 (one line deleted in `domove`) + test
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: `domove`'s JS-only `newsym(dest)` burned one
display-RNG draw per step; deleting it moves Samurai-578121 1328→PASS.

The diff actually adds: exactly that deletion (plus a C-citing comment).
No new imports/edges, no helper touched. Promise == deliverable.

## Inventory

- `domove` (`js/cmd.js`, did_step block) — `newsym(newx, newy)` deleted;
  block is now newsym(old) + vision_recalc(1) + invocation_message().
  No symbol deleted or re-pointed (no `sym.mjs` paste required).

## C ↔ JS fidelity

C locus: `hack.c` domove `:2964–2974`, read from pinned C:

```
if (u.ux0 != u.ux || u.uy0 != u.uy) {
    ...
    /* Clean old position -- vision_recalc() will print our new one. */
    newsym(u.ux0, u.uy0);
    vision_recalc(1);
    invocation_message();
}
```

No direct newsym(dest): `:2969` is explicit that vision_recalc prints
the new position (via `vision.c:849–850` newsym(hero)). JS now matches
arm-for-arm. The D-log's display-draw proof (JS painted the stones 4×
vs C's 3×; C's `[+[` == JS raw draws #259–261; post-fix boulders from
raw #259–261) is measured (temp draw log, reverted) and the prediction
confirmed by the FULL PASS. The pre-existing `vision_recalc` trailing
gate difference (`ux > 0` vs `!panicking`) is correctly left untouched
as vision.c scope with same outcome here.

RNG walk: the deleted paint burned exactly one display draw per
object-square step under Hallucination; scored-RNG prefix was already
full (29492/29492), so the fix only re-syncs the display stream — no
`rn2` call-order change on the scored path.

## Hallucinations / overclaim

None. "Match C" is for the did_step paint order, now exact. No
FORCE/DIAG/seed markers in the hunks; Rule #2 clean (review 2727 scan).
Callers table verified in form: domove signature/entry unchanged, C
call sites (`allmain.c:526`, `cmd.c` ×3) stay wired through the listed
live JS callers — none touched, none needed touching.

## Density

Cliff-head writer port with movement (dolook row's writer; dolook
itself correctly untouched — toplines identical, map-row divergence).
One cliff, code + ledger + verify in one handoff; full `sessions` run
manually even though the runner skipped it (movement-core file — good
judgment). `Ledger: domove ported` — single entry, right owner.

## Verification

Re-measured by this audit
(`verify dolook,domove --base 32ac8ebf9~1 --reach-all`):

- `verify dolook: 1 PASS → PROGRESS` (scen-sweep-Samurai-578121: PASS).
- `verify domove`: vacuous (0 blocked — expected; D-log said so).
- Smoke spreads 24/24 REACH-OK ×2; 0 regressed.

No REGRESSED session. The "1 PASS" movement claim is confirmed on
current code.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
