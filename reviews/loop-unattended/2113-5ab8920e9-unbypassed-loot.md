# Review 2113 — 5ab8920e9 — nxt_unbypassed_loot restart + global clear_bypasses

- SHA: `5ab8920e9b7a2b17f091005fec93b37ba48ea09e` (D-3153)
- Date: 2026-09-30. `js/` delta: +31/−13 (`js/pickup.js` only).
- Cluster: single-function `worn.c` cluster — `nxt_unbypassed_loot`
  restart + askchain `ret:` rewiring to live `clear_bypasses`
  (ledger-ported as pre-existing-complete newly wired).
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "nxt_unbypassed_loot restart + askchain ret: global
clear_bypasses". Diff actually adds: the restarted scanner (cursor
deleted), the caller rewire, four `ret:` exits → `clear_bypasses()`,
and two import names. Promise matches deliverable.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `nxt_unbypassed_loot` (pickup.js local — C is extern in worn.c, but sole caller askchain is same-module both sides) | whole-body restart | whole |
| `clear_bypasses` (worn.js:1172, pre-existing) | newly wired (4 exits) | whole (verified arm-by-arm) |

Callee closure, all LIVE: `bypass_obj` (`worn.js:654`, sets bypass=1 +
`context.bypasses` — the exact bit the old clone missed),
`clear_bypasses` (full `:1067–1116` port — 6 chains, fmon walk with
DEADMONSTER skip + mcorpsenm revert, migrating/mydogs walks, floating
ball+chain, flag reset), `clear_bypass` (`:1148`, nobj walk +
Has_contents recursion = C `:1054–1064` + Array adaptation),
`obj_still_on_list` (listhead walk + Array-invent). No new clones; the
pre-existing `zap.js:2897` `bypass_obj` clone is disclosed
(`worn.js:652` names it) and out of cluster.

`sym.mjs` (required — cursor was a local var, not a symbol; two names
added to an existing edge):

```text
nxt_unbypassed_loot: 1 LOCAL (sole-caller-same-module placement)
bypass_obj:      js/worn.js:654   sync
clear_bypasses:  js/worn.js:1172   sync
```

`--can js/pickup.js js/worn.js bypass_obj` → ALREADY, no new edge —
the D-log's claim confirmed, no TDZ question.

## C ↔ JS fidelity

**`nxt_unbypassed_loot`** — C `worn.c:1156–1174` (`csym`; D-log cites
from `:1159`, same body). Re-scan from [0] every call (cursor deleted),
null-entry end, listhead nobj walk, `o && !bypass` gate →
`bypass_obj` — exact. Adaptations are correct: length-bounded scan (JS
sortloot emits no NULL sentinel; the null-entry break is kept for
defensive shape), `undefined`-at-end vs C NULL (sole consumer is the
`while ((otmp = ...))` condition — equally falsy; noted, not a wrong).
No RNG either side.

**Caller + `ret:`** — C `invent.c:2432–2433`: list-local pre-clear then
`while ((otmp = nxt_unbypassed_loot(sortedchn, *objchn)))` with the
head re-read every call — JS `:3782`/`:3792` + `:3797` identical
(`getHead()` re-read). C `ret:` `:2534–2540`: `unsortloot` + the
comment explicitly rejecting list-local clear + `clear_bypasses()` —
all four JS exits (`:3862`/`:3869`/`:3880`/`:3898`, three `goto ret` +
fall-through) now call the global clear; `unsortloot` free ≡ GC (JS
`sorted` is allocation-scoped). List-local `bypass_objlist_ask` kept
only at the two `:2432` pre-clear sites. This fixes a real behavioral
gap the old code had (bypass=1 stranded on chain-moved objects).
Confirm.

Diff grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. The "cursor clone / missing bypasses flag / skip-vs-stop" symptom
list describes the old code accurately against C, and each is fixed in
the diff.

## Density

- Whole-function verdicts: `nxt_unbypassed_loot` whole; `clear_bypasses`
  whole (pre-existing body, newly wired + ledger-ported).
- Cluster: single function + its wiring; the density exception is
  claimed (sole worn.c row in the eligible set, callee already live)
  and the footprint (+31/−13) matches that story. No Must-fix bundled.
  Ledger + Verify present per function.
- Placement note: C-extern-in-worn.c → JS-local-in-pickup.js follows
  the JS caller; complete while askchain stays the sole caller.

## Verification

Re-measured myself (`--base 5ab8920e9~1 --reach-all`, both fns):

```text
verify nxt_unbypassed_loot: baseline 5ab8920e9~1 — 0 session(s) blocked on it
smoke nxt_unbypassed_loot: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify clear_bypasses: baseline 5ab8920e9~1 — 0 session(s) blocked on it
smoke clear_bypasses: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
