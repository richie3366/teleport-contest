# Review 1105 — eb7ec1cb — throw_obj quivered-gold arm + freeinv coin arm (D-2139)

Metadata: SHA `eb7ec1cb`, `js/dothrow.js` only (+31/−11 in `js/`).
Queue row fired: Open `makemon.c makemon` (1 session,
scen-normal-Healer-91123). No prior review claimed closed.

## Intent vs deliverable

Subject promises three things: (1) quivered coins fall through to
the m_shot loop instead of being dropped (old code returned 0);
(2) the gold-count fix moves into file-local `freeinv`; (3) the
now-double `throw_gold` manual decrement is removed. Diff delivers
exactly those three: one changed gate condition, one new
`COIN_CLASS` arm in `freeinv`, one deleted block in `throw_gold`.
Promise matches diff.

## Inventory

One changed gate (`throw_obj` coin condition), one extended helper
(`freeinv` + COIN_CLASS arm), one trimmed function (`throw_gold`).
No new functions, no new imports, no new edges. Fall-through
callee closure: `splitobj` LIVE (`mkobj.js:345`), `throwit`
live in-module, `encumber_msg` LIVE (`invent.js:1046`,
pre-existing dynamic-import pattern), volley order
split→freeinv→throwit→encumber matching C. No symbol deleted or
re-pointed (code moved within the same file), so the required
`sym.mjs` deletion check is vacuously satisfied — confirmed by
inspection, not assumed.

## C ↔ JS fidelity

Gate audited against `dothrow.c:86–293` (via `csym`). C `:112`
is:

```c
if (obj->oclass == COIN_CLASS && obj != uquiver) {
    return throw_gold(obj); /* check */
}
```

JS now matches exactly; previously JS returned 0 for quivered
gold where C falls through. The fall-through path is genuinely
live, not a dispatch-to-stub: JS runs self-refuse → `u_wipe_engr`
→ multishot calc → m_shot loop, and the loop body
(`dothrow.js:993–1012`: split-one-coin / remove-worn /
freeinv / throwit / encumber, m_shot reset) matches C `:237–254`
call-for-call. The skipped gates (`canletgo`/Mjollnir/too-heavy/
welded/wet-towel) are provably dead for gold: `canletgo`
(`do.c:664–711`, read via `csym`) refuses only W_ARMOR|W_ACCESSORY,
welded uwep, cursed LOADSTONE, attached LEASH, W_SADDLE — quivered
GOLD_PIECE passes all of them, and the rest test otyp/uwep
predicates gold cannot satisfy. So skipping them for the gold path
is behavior-identical, and the D-log's `do.c:665–709` citation
checks out. Coin-cache arm: C `freeinv_core` (`invent.c:1355–1359`)
sets `botl` and returns for COIN_CLASS; JS adds the `_goldCount`
decrement (a JS display-cache invariant, same shape as the drop
path at `do.js:2219`) plus `botl`. All three file-local `freeinv`
call sites (`:790` throw_gold, `:996` split child, `:1006` whole
stack) are gold-leaves-inventory paths decrementing exactly once
— audited, no double-count, no missed path. Named omits
(`unsplitobj` D-0720, canletgo/Mjollnir arms, freeinv
update_inventory/artifact/timer arms) are map-named and outside
the gold cluster.

## Hallucinations / overclaim

None — and credit where due: the D-log explicitly labels `verify
throw_obj` vacuous (no session ever blocked on it) instead of
presenting it as proof, and covers the row with `verify makemon`.
That is the honest pattern the method demands.

## Density

One C-function cluster, one module, 31 insertions. Right-sized
per §2b.

## Verification

D-log bullet: green 2/2 + strict ×2 + cohort 7/7 + forced full
44/44, plus `verify makemon` → PROGRESS (step 4 → 27
`legs_in_no_shape`). Re-measured myself: `hidden-proxy verify
makemon --base eb7ec1cb~1` → `0 PASS, 1 moved past, 0 unchanged,
0 worse → PROGRESS` (Healer-91123 step 4 → step 27, RNG
3085/3085). Claim true; the session named in the bullet is the
session that moved. Added-code grep: 0 hits for
FORCE/DIAG/RNG-log/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
