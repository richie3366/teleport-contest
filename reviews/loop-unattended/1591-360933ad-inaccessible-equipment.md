# Review 1591 — 360933ad — do_wear.c inaccessible_equipment caller closure (D-2632)

**Metadata:** SHA `360933ad`, `do_wear.c` `inaccessible_equipment`,
D-2632. JS: `js/do_wear.js` (+2/−21), `js/potion.js` (+10/−2).
Caller-closure row (body already live in apply.js). No prior review
claimed closed.

## Intent vs deliverable

Subject promises: potion.c dodip `:2282` post-check wired, and the
do_wear.c `equip_ok` `:3440` local clone retired to the live
export. Diff delivers both — dynamic-import post-check in `dodip`,
deleted `equip_inaccessible` with `equip_ok` calling live
`equipment_is_inaccessible`. Promise matches deliverable; net −11
lines (deletion is the deliverable).

## Inventory

- Deleted local clone `equip_inaccessible` (do_wear.js, −17 lines).
- Re-pointed `equip_ok` → live `equipment_is_inaccessible`
  (apply.js:2223, sync) via new static import.
- New `dodip` post-check → live `inaccessible_equipment`
  (apply.js:2243, async, awaited) via dynamic import (apply.js
  already statically imports potion.js — the cycle-safe pattern).
- Required `sym.mjs` outputs pasted:

```text
equip_inaccessible NOT FOUND in js/** (no export, no local function/const).
equipment_is_inaccessible js/apply.js:2223   sync
inaccessible_equipment js/apply.js:2243   ASYNC — await required
```

Clone fully retired, zero drift left; both targets live with the
right sync/async shape.

## C ↔ JS fidelity

Deleted clone verified line-for-line identical to the live
predicate (owornmask guard, anycovering/BLOCKSACCESS, uarm/uarmu/
ring arms, `game.u || {}`) — behavior-preserving retire, confirmed
by the D-log's 208/208 differential probe (throwaway, not
committed).

Caller closure audited against `csym.mjs --callers` (6 C sites) and
the JS tree — all 6 now wired:

- `apply.c:2595` (verb-0) → apply.js:2284 (pre-existing).
- `apply.c:2629` ("grease") → apply.js:2319 (pre-existing).
- `do_wear.c:3440` (verb-0, RING_CLASS flag) → do_wear.js:2489
  (this commit — verb-NULL predicate is correct, C passes
  `(const char *)0`).
- `potion.c:2223` (dip_ok callback, verb-0) → potion.js:2582 via
  the `inacc` param (pre-existing).
- `potion.c:2402` (dip-into post-check) → potion.js:2715
  (pre-existing dynamic import).
- `potion.c:2282` (dodip post-check) → potion.js:2496 (this
  commit). C position verified directly in pinned C: post-getobj,
  pre-`is_hands`, `return ECMD_OK` — JS placement exact.

"2 of 6 unwired" claim checks out against both trees. Dynamic
import justified (documented cycle); `imports.mjs --rulecheck`
clean.

## Hallucinations / overclaim

None. The D-log's caller census is exactly reproducible (above),
and the probe result is quoted as throwaway rather than committed
evidence.

## Density

Small closure handoff, net −11 lines across 2 files. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify inaccessible_equipment
  --base 360933ad~1 --reach-all` → `0 session(s) blocked`
  (vacuous-note path, honestly labeled) + `smoke 24/24 PASS, 0
  regressed → REACH-OK`. Both summary lines cited; no REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
