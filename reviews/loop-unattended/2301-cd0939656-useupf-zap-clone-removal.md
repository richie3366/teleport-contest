# Review 2301 — cd0939656 — useupf zap.js clone removal

Metadata: SHA `cd0939656`, D-3345, C `invent.c:4762–4783` (22 lines),
JS live `js/invent.js:4869` (body untouched, comment refreshed), sole
site `js/zap.js:931` (`burn_floor_objects`). Stat: 12 files,
`js/zap.js +3/-13`, `js/invent.js` 1-line comment + new test file.

Intent vs deliverable: subject promises "useupf zap.js clone removal
(sole site → live export)". Diff actually: extends the ALREADY invent
import with `useupf`, deletes the clone (one-line pointer left at
`:876`), adds the `zap.c:4636` site cite, retires the zap-clone
mention in the live comment (shop-bill named omit kept). Matches
promise.

Inventory: 1 function: `useupf` (clone→import). Deleted clone:
null-guard + `(quan||1) > n → splitobj||obj` + delobj; no at_u
snapshot, no shop-bill block, no hideunder arm.

C ↔ JS fidelity: C (`invent.c:4762–4783`, via `csym.mjs`): snapshot
`at_u` → `quan > numused ? splitobj : obj` → shop-bill block
(`!mon_moving && costly_spot`: addtobill vs stolen_value) → delobj →
hideunder arm (`at_u && uundetected && hides_under`). No RNG. Live JS
(`js/invent.js:4869–4883`):

```js
export function useupf(obj, numused) {
    const atHero = u_at(obj.ox, obj.oy);
    let otmp;
    if ((obj.quan | 0) > (numused | 0)) {
        otmp = splitobj(obj, numused);
    } else {
        otmp = obj;
    }
    delobj(otmp);
    const u = game.u || {};
    if (atHero && (u.uundetected | 0)
        && hides_under(game.youmonst?.data)) {
        hideunder(game.youmonst);
    }
}
```

Arm-for-arm exact except the shop-bill block (C `:4774–4779`),
which is a declared Named omit — ledger reads `useupf partial` with
the omit recorded including the C range, the D-entry Named bullet
re-names it in this commit, and the live comment keeps it. Deltas vs
the deleted clone all toward C: hideunder arm restored (fires when
fire burns the pile under a hiding hero), `(quan||1)`→`(quan|0)` and
the dropped `||obj` fallback match C exactly (C derefs non-null;
`splitobj` never returns null there). One asymmetry: the clone's `if
(!obj) return` guard is gone — live derefs `obj.ox` immediately.
C-faithful (C takes non-null) and the sole site passes a floor-chain
object that is non-null by construction; no new throw surface. Site
cite `zap.c:4636 useupf(obj, delquan)` verified via `--callers`.
Branch-by-branch confirm modulo the named omit.

Hallucinations / overclaim: none. The omit is named in the D-entry,
the live comment, and the ledger — not smuggled. The message's
"pre-existing live omit, kept" is accurate (the diff only retires the
clonedoc tail).

Density: single-function rewire with a real restored arm (hideunder).
One fidelity block, one `Ledger: useupf partial` entry. Maintained
test `scripts/useupf-rewire.test.mjs` (3/3 pass, re-run this review).
Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify useupf --base cd0939656~1
--reach-all` → 0 blocked + "no RNG-tagged reach; fixed smoke spread
(24 run): 24 PASS, 0 regressed → REACH-OK"; matches D-log. `--can
zap→invent` ALREADY. Diff grep: no banned patterns. `sym.mjs`
output (required paste):

```text
useupf           js/invent.js:4869   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
