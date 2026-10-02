# Review 2271 — f169dcc0a — invent safeq quartet

Metadata: SHA `f169dcc0a85c9dec770e4ae3b1016a9e2410a968`
(D-3315, 2026-10-02). `js/pickup.js` (+47/−12: safeq ctx + pair +
askchain rewire), `js/invent.js` (+32/−7: worn_wield_only +
!do_all filter). `any_obj_ok` is a split booking, no `js/` delta.
Cluster of 4, one C file.

Intent vs deliverable: subject promises the safeq head + sibling +
any_obj_ok split + worn_wield_only. The diff adds the ctx object,
both callbacks, the askchain rewire through `safe_qbuf` in C order,
the worn filter + predicate, and retires two named-omit lines.
Delivers what it promises; the askchain rewire additionally routes
floor chains through `safe_qbuf`, which is what C :2462–2465 does.

Inventory (per function):

- `safeq_xprname` — js/pickup.js:3770 module-local (C staticfn);
  ctx `safeq_xprn_ctx` :3762; wired at askchain :3850.
- `safeq_shortxprname` — js/pickup.js:3779 module-local; wired at
  askchain :3851.
- `any_obj_ok` — split booking, no new symbol: `drop_obj_ok`
  (js/do.js:3121) + `any_obj_ok_stone` (js/apply.js:2876),
  both pre-existing.
- `worn_wield_only` — js/invent.js:4394 module-local (C staticfn);
  wired as `display_minventory` filter :4422 + predicate :4423.
- No import added (objnam names already imported); nothing
  deleted or re-pointed, so no re-point `sym.mjs` run is owed.
  Callee check: `xprname` js/objnam.js:3807 sync, `safe_qbuf`
  js/objnam.js:3148 sync — both LIVE.

**C ↔ JS fidelity** (per function):

- `safeq_xprname` (invent.c:2179–2184): `xprname(obj, NULL,
  ctx.let, ctx.dot, 0L, 0L)`. C xprname order is (obj, txt, let,
  dot, cost, quan); JS `xprname(obj, let_, dot, quan, txt, cost)`
  (objnam.js:3807). The JS call `(obj, ctx.let, ctx.dot, 0, null,
  0)` maps every slot exactly: let ✓ dot ✓ quan=0L ✓ txt=NULL ✓
  cost=0L ✓. Caller C askchain :2463 → JS :3850
  (`ininv ? safeq_xprname : doname`) ✓. Confirm.
- `safeq_shortxprname` (invent.c:2187–2192): same with
  txt=`ansimpleoname(obj)`; JS passes it in the txt slot ✓.
  Caller :2464 → :3851 ✓. Confirm.
- Askchain envelope (shared): C :2450–2465 runs ctx writes →
  qpfx/first → `safe_qbuf(qbuf, qpfx, "?", otmp, ininv?…, "item")`;
  JS :3837–3852 runs the identical order with the identical
  `ininv ?` callback ternaries ✓. `safe_qbuf(null, …)` first-arg
  idiom pre-exists at pickup.js:3674/:4058 ✓. Ctx writers in C
  are exactly :2451–2452 (whole-file grep); JS rewrites the
  module-level ctx on every !allflag item before use, and the
  `{let:'\0', dot:false}` literal matches C zero-init ✓.
  `ilet` → pre-existing `iletCh`, the same value the deleted
  template used ✓. No RNG in any of it ✓.
- `any_obj_ok` (invent.c:1709–1715): `obj ? GETOBJ_SUGGEST :
  GETOBJ_EXCLUDE`. `drop_obj_ok` is the identical ternary;
  `any_obj_ok_stone` the identical if/return. Callers: C do.c:35
  → js/do.js:3141 + :3150 (inshop + normal arms, both pass
  `drop_obj_ok`) ✓; C apply.c:2698 (`known ? touchstone_ok :
  any_obj_ok`) → the `getobj_rub_on_stone` touchstone path via
  `any_obj_ok_stone` ✓. No third clone — correct split call.
  Confirm.
- `worn_wield_only` (invent.c:5308–5325): `#if 1` arm is
  `(owornmask != 0L)`; JS `(obj.owornmask|0) !== 0` ✓; the
  `#else` arm is compiled out in C and documented-not-ported ✓.
  Caller C display_minventory :5370 filter → JS :4422 `shown`
  filter ✓; C :5359 predicate `(misc_worn_check || MON_WEP)` →
  JS `shown.length > 0`, with the `misc_worn_check` cache field
  honestly named as the omission (wielded ⇒ W_WEP bit ⇒ passes
  the filter, so the observable gate matches) ✓. Correctly
  booked `partial`, not ported. Confirm.

Hallucinations / overclaim: none. The "brief ref-counts stale,
all four have live C callers" correction is verified above (C
:2463/:2464, do.c:35, apply.c:2698, :5370). "Output-identical on
fitting names" for the askchain rewire is defended by a C cite
(xprname :2941–2942 use_invlet override) and held by the gates.

Density: 4 whole functions, one C file, callees already live —
within §10.17. Below ~80 insertions, defended as the whole
invent.c measured-MISSING set. Each function has its own `Ledger:`
entry (ported ×2, split, partial — correct granularity) and its
own Verify sub-bullet. Per-function verdicts: all four confirm.

Verification: D-log claims 4× vacuous note + smoke REACH-OK,
green/strict/cohort, full 44/44. Re-measured in one call:
`hidden-proxy.mjs verify <all four> --base f169dcc0a~1
--reach-all` → every function "0 session(s) blocked (0 at
baseline, 0 in working)" + explicit vacuous note + "smoke (24
run): 24 PASS, 0 regressed → REACH-OK". Queue rows cited 0
blocks — vacuous is legitimate. Diff grep: no FORCE/DIAG/
getRngLog/seed/fastforward/coordinates. Rule #2 covered by the
iteration-wide clean scan.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
