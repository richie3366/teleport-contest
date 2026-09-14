# Review 1244 — 80a22605 — shk.c splitbill unpaid bill split

- SHA: `80a22605` — "`shk.c` splitbill: unpaid bill split on stack split
  (D-2278)"
- D-log: D-2278. Queue row: `shk.c` splitbill (D-2275 named omit, first
  Open row). No corpus session blocked on `splitbill` (row cited 0).
- Character: new-function port + caller wiring, no corpus divergence.

## Intent vs deliverable

Subject promises: port C `splitbill` as a new `shk.js` export in C
position, wire it into `splitobj` behind `if (obj.unpaid)`, keep the four
`impossible()` prints as named omissions. Diff actually adds exactly that:
`export function splitbill(obj, otmp)` in `js/shk.js` (+36), one import
token + one call line in `js/mkobj.js`, map/doc retirement. Promise
matches diff exactly — nothing else rides along.

## Inventory

- Added JS: `splitbill` (`js/shk.js`, now `:852`; pre-commit hunk at
  `:839`), sync, directly before `sub_one_frombill`. Call site:
  `js/mkobj.js` `splitobj` (`if (obj.unpaid) splitbill(obj, otmp)` before
  `copy_oextra`, after the LUAFREE normalize).
- Deleted/retired: the `splitbill stays named (shk envelope)` doc line in
  `splitobj`; data.md omit line narrowed to "impossible() diagnostics
  (flow live D-2278)".
- Required `sym.mjs` output: `splitbill  js/shk.js:889  sync` — pasted,
  confirmed (line drifted post-commit; single definition, zero clones).
- Required `--can` output: `ALREADY: mkobj.js already statically imports
  shk.js. No new edge needed.` — pasted, confirmed. Call-time use only,
  hoisted function declaration, no top-level TDZ read.

## C ↔ JS fidelity

C locus `shk.c:3622–3658` (37 lines, via `csym.mjs splitbill`), caller
`mkobj.c:493–494` (verified by direct read, not just the D-log citation).
Branch-by-branch:

1. `shkp = shop_keeper(*u.ushops)`; `if (!shkp || !inhishop(shkp))` return
   (+ `impossible` print). JS: `shop_keeper(game.u?.ushops || '')`,
   `if (!shkp || !inhishop(shkp)) return` — gate identical, print named.
2. `bp = onbill(obj, shkp, FALSE)`; `if (!bp)` return (+ print). JS:
   `onbill(obj, shkp, false)`, `if (!bp) return` — identical, print named.
3. Under/zero-quantity `impossible` arms **fall through** in C (no return).
   JS has no early return here either — `bp.bquan -= otmp.quan` executes
   unconditionally. Control flow preserved exactly. ✓
4. `billct == BILLSZ` → `otmp->unpaid = 0`. JS identical. ✓
5. Else new `bill_p[billct]` entry `{bo_id = otmp->o_id, bquan =
   otmp->quan, useup = FALSE, price = old price}` + `billct++`. JS builds
   the same four fields from `otmp.o_id / otmp.quan / bp.price` and
   increments. ✓
6. Caller order: C `splitobj` runs splitbill (`:493–494`) after the
   LUAFREE normalize, before `copy_oextra` (`:495`) — JS matches that
   order exactly (read `mkobj.c:470–500` to confirm, not just the D-log).

One defensive extra: `if (!Array.isArray(bill)) { otmp.unpaid = 0; return; }`
on `eshk.bill_p || eshk.bill`. After an `onbill` match the bill container
necessarily exists, so this is unreachable scaffolding against ESM
strict-mode index-assign, disclosed in the D-log — not a semantic fork.

No RNG in C (`rn2`/`rnd`/`d` absent both sides); pure state port.

## Hallucinations / overclaim

None. D-log says "Match C" only for the ported control flow and names the
four `impossible()` prints plus `nextoid`/`bill_p === -1000` as omissions
in the map row. No dispatch-with-stubbed-callee shape — `shop_keeper`,
`inhishop`, local `onbill`, `ESHK`, `BILLSZ` are all live per the D-log
and the import graph is unchanged. "Sync by necessity" is real: C
`splitbill` is sync void and `splitobj` is sync.

## Density

§2b ok. Shipped C is 35–37 lines; JS insertions (+41/−3 across 2 files)
match C one-for-one with the import + wiring. Single C locus family, one
queue row, no unrelated subsystem.

## Verification

- Banned-pattern grep on the `js/` hunks: hits are commit-message prose
  only (`rnd(2)` inside a doc comment about `next_ident`); no
  FORCE/DIAG/`getRngLog`/seed-gate/coordinate/RNG-index reads in code.
  `imports.mjs --rulecheck` → Rule #2 clean.
- Re-measured corpus claim myself: `hidden-proxy.mjs verify splitbill
  --base 80a22605~1` → "0 session(s) blocked on it (0 at baseline, 0 in
  the working scoreboard)" — matches the D-log's vacuous note word for
  word. The D-log explicitly says vacuous-is-NOT-a-PASS and no `--base`
  is owed (row cited 0 blocks); no false PASS claimed.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log Verify bullet. One honest
  caveat the D-log discloses by construction: `splitobj` is a shared
  function, so "script skips full" is the runner's call, not a proof —
  but with 0 corpus sessions reaching an unpaid shop-stack split there is
  no fuller oracle available, and the /tmp throwaway probes (11/11 + shop
  end-to-end) cover the arms.
- No maintained unit test; disclosed with the durable-test-collateral
  rationale (no `js/` unit harness exists). Acceptable, stated plainly.

## Actionable C-wrongs

None. Every C arm is either ported verbatim or a print-only `impossible`
diagnostic named in the map row with control flow preserved.

Verdict: **ACCEPT**
