# Review 1576 — aea3bb71 — pickup.c carry_count whole-body restart (D-2617)

**Metadata:** SHA `aea3bb71`, `pickup.c` `carry_count` + `delta_cwt`, D-2617.
JS: `js/pickup.js` (+234/−90: new `delta_cwt`, restarted `carry_count`,
2 caller updates, `money_cnt_invent` retired).

## Intent vs deliverable

Subject promises: whole-body restart in C order — `adjust_wt` container
gate, provisional weigh + `delta_cwt` subtract, merged-gold correction,
gold plain-capacity vs 100-coin re-weigh loop, stack loop, You/There
messages, `money_cnt` first-stack. Diff actually adds: `delta_cwt`
(`js/pickup.js:1162`), restarted `carry_count` (`:1198`) with per-arm
`:line` cites, container threaded through `lift_object`, NULL container
in `pickup_object` scare path, deletion of `money_cnt_invent`. Promise
matches deliverable.

## Inventory

- `delta_cwt(container, obj)` (new file-local) — face-value vs BoH
  unlink/weigh/relink, C-message throw for the missing-link panic.
- `carry_count(obj, container, count, telekinesis, wts)` — restarted with
  the container param; out-params ride `wts.before/after`.
- Deleted: `money_cnt_invent` (summing local). Required `sym.mjs` output:
  `money_cnt_invent` now resolves only to the pre-existing unrelated
  `js/mhitu.js:1230` local — no remaining ref in pickup.js; `money_cnt`
  is the live `js/shk.js:4415` export (first-stack like C). Correct
  re-point direction.

## C ↔ JS fidelity

C locus `pickup.c:1569–1701` (carry_count) + `:1544–1568` (delta_cwt),
via `csym.mjs`; callers `:1736`, `:1839` via `--callers`. Full C body read
here. Arm-by-arm confirm:

- `adjust_wt = container && carried(container)` (`:1576`) via the live
  eat.js `carried` export of the `obj.h:332` macro (`where == OBJ_INVENT`;
  the JS `|| invent.includes` is a safe superset, pre-existing) — exact.
- Provisional weigh (`:1589–1601`), `wt_before/after` out-params,
  full-lift early return (`:1606–1607`) — exact.
- Gold arms (`:1610–1635`): plain `GOLD_CAPACITY` vs the `50 − umoney%100
  − 1` + 100-coin re-weigh loop with per-step `delta_cwt` — exact.
  `GOLD_WT`/`GOLD_CAPACITY` formulas verified identical to the C macros
  (`pickup.c:60–62`).
- Stack loop (`:1636–1654`, per-quan `weight()` + delta, `--qq`), single
  unliftable (`:1655–1656`), quan/owt restore (`:1658–1659`) — exact.
- Messages: container `in <the(xname)>`/`carry` vs floor `lying
  here`/`acquire`|`lift` (`:1661–1674`); partial `You('can only %s…')`
  via the live display.js `You` export; zero-lift `There(otense 'are' …)`
  via live objnam `otense` (the local `otense_pickup` stays for the
  scare arm only, as stated) — exact.
- `delta_cwt`: face-value return, prev-walk unlink, `weight`, relink,
  `owt − nwt` — exact; C `panic` → loud throw with the C message (house
  botl.js convention, cited in-code).
- Callers: `:1736` container threaded (`js/pickup.js:1349`),
  `:1839` NULL container (`:1437`). RNG: none in C or JS.

Callee closure: `carried`/`weight`/`max_capacity`/`doname`/`theArt`/
`You`/`There`/`currency`/`money_cnt` all live; no stub, no silent omit;
"Named: none new" accurate.

## Gap (C-wrong, Actionable 1 — review-debt)

Zero-lift branch (`:1687`): C `if (gi.invent || umoney)` tests the invent
**pointer** (NULL iff carrying nothing). JS writes `if (game.invent ||
umoney)` — but `game.invent` is array-initialized (`js/do.js:1071`) and
an empty array is truthy. A naked-and-broke hero (empty invent, 0 gold)
lifting an unliftable object gets "you cannot … any more" where C prints
"it is too heavy for you to lift". Return value (0) and state are
identical — message-only, rare state — but it contradicts C in a
whole-body port. One-line fix: `(game.invent?.length || umoney)`.

## Hallucinations / overclaim

No dispatch/stub split. "Coverage gap, not corpus divergence" accurate
(0 blocked, re-measured). Import-edge claims (existing edges only)
consistent with the diff (2-line import hunks, no new module edge).

## Density

One C function pair (133 + 25 L), one JS module + caller threading.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward` in added lines.
- Re-measured: `hidden-proxy.mjs verify carry_count --base aea3bb71~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed — RNG-0 function) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited; matches D-log.

## Actionable C-wrongs

1. (Review-debt, unqueued) Empty-invent zero-lift predicate
   (`js/pickup.js`, `if (game.invent || umoney)`): use
   `(game.invent?.length || umoney)` to match C `pickup.c:1687`
   (`gi.invent` NULL check). Message-only; one-iter fix with a naked-hero
   lift probe.

Verdict: **ACCEPT-WITH-DEBT**
