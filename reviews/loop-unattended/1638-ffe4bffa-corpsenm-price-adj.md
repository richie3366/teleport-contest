# Review 1638 — ffe4bffa — `shk.c` corpsenm_price_adj whole-body port (D-2679)

Metadata: commit `ffe4bffa`, D-2679, js/shk.js + js/eat.js (1-line export).
Next index NN=1638. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body port of C `corpsenm_price_adj` (tin/egg/corpse
intrinsic-table surcharge) wired into `getprice`. Diff actually adds:
module-local `corpsenm_price_adj` (js/shk.js:3281), 3 otyp consts
(TIN/EGG/CORPSE), imports (`ismnum`, FIRE_RES…TELEPORT_CONTROL,
`unique_corpstat`, `intrinsic_possible`), 1-line FOOD_CLASS wiring,
`intrinsic_possible` export in js/eat.js. Matches the promise; no extras.

## Inventory

New/changed JS functions: `corpsenm_price_adj` (new, module-local);
`intrinsic_possible` (export-keyword only, body untouched);
`getprice` (1 added line first in FOOD_CLASS arm).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/shk.c:4274–4316` (csym range; D-log cites
`:4275–4316`, off-by-one on the decl line only). Callers: fwd decl `:101`,
sole call `:4330` (csym --callers, 2 refs).

Branch-by-branch confirm against C body:

- Gate `:4279–4280` `(otyp==TIN||EGG||CORPSE) && ismnum(corpsenm)` → JS
  identical predicate. Confirm.
- `icost[11]` table `:4287–4299` order FIRE2/SLEEP3/COLD2/DISINT5/SHOCK4/
  POISON2/ACID1/STONE3/TELEPORT2/TELEPORT_CONTROL3/TELEPAT5 → JS array
  identical order and costs. Confirm.
- Loop `:4301–4303` `tmp += cost` on `intrinsic_possible` → JS
  `for…of` identical. Confirm.
- `unique_corpstat` +50 `:4304–4305` → JS `if (unique_corpstat(ptr)) tmp += 50`.
  Confirm.
- `val = max(1,(mlevel-1)*2)` `:4308` → `Math.max(1, …)`. Confirm.
- CORPSE-only `max(1,cnutrit/30)` `:4309–4310` → `Math.trunc` division
  (correct for non-negative cnutrit). Confirm.
- `val*tmp`, `return val` → identical. Confirm.
- Wiring: C `:4330` `tmp += corpsenm_price_adj(obj)` is the first statement
  of the FOOD_CLASS arm (verified `sed -n '4320,4345p'` above); JS places it
  first in the arm, before the hunger multiplier and `oeaten`. Confirm.

Callee closure: `intrinsic_possible` LIVE (now exported js/eat.js:1565,
`sym.mjs` confirm); `unique_corpstat` LIVE (js/mon.js:2956 export; its 4
local clones elsewhere are pre-existing, not this commit's);
`ismnum`/`mons` live. C `staticfn` → module-local is the correct shape
(`sym.mjs corpsenm_price_adj`: not exported, 1 local — expected for a
staticfn). No STUB, no OMIT (getprice candle omit is a different scope).

No RNG in C body (`rn2/rnd/rn1/d` absent both sides). Diff grep: no
FORCE/DIAG/getRngLog/seed coordinate/fastforward. `imports.mjs --rulecheck`:
Rule #2 clean across scored `js/`. `--can js/shk.js js/eat.js
intrinsic_possible`: ALREADY statically imports — no new edge, TDZ-clean.

## Hallucinations / overclaim

None. "Whole-body" is accurate: all arms, both callees live, sole caller
wired. `intrinsic_possible` body untouched (export only) — no drift risk.

## Density

Breadth-phase whole-function row (C 43 L). ~50 JS insertions incl. imports —
right-sized, one C function family. Same-file STALE parks
(cost_per_charge, equip_ok) verified live, not re-popped.

## Verification

D-log Verify bullet: syntax, rule2, hidden 0-blocked note, reach smoke 24
PASS, green 2/2, strict ×2, cohort 7/7, no full (no shared file — eat.js
export line is not a behavior change). Re-ran
`hidden-proxy.mjs verify corpsenm_price_adj --base ffe4bffa~1 --reach-all`:
"0 session(s) blocked (0 at baseline…)" — vacuous note correctly stated
(queue row cited 0 blocks, so no vacuous-check violation) — plus
"24 PASS, 0 regressed → REACH-OK". No REGRESSED. Claim stands.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
