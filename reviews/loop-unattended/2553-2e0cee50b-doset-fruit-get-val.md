# Review 2553 — 2e0cee50b — doset fruit get_val row (D-3678)

- SHA: `2e0cee50b5d434a3e75c76f2feda7844877f78f2`
- Subject: cliffs-head `paniclog` writer: doset full-menu fruit row hardcoded `[slime mold]` instead of optfn_fruit get_val (Archeologist-94231 → PASS) (D-3678)
- D-entry: D-3678. Type: cliff (writer port, 1 table row).
- Diff size: `js/options.js` 1 line; + test; ledger `options.c` D-tag. No scoreboard change in this SHA (recorded by the docs-only follow-up `be0ad1946`).

## Intent vs deliverable

Promise: replace the hardcoded full-menu `fruit` val with the
live `doset_compopt_get_val(optfn_fruit, 'fruit') || 'unknown'`
(C `:9038` get_val + `:9043` fallback, crash_name-row shape);
Archeologist-94231 → PASS.

Diff actually does: that one row. Nothing else in `js/`.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `doset()` full-menu fruit row (`js/options.js:11408`) | `val:` → `get_val:` | `options.c:9038–9044`, `:1770–1772` |

No symbols deleted or re-pointed. Helper (`doset_compopt_get_val`)
and callee (`optfn_fruit`) both pre-existing and live.

## C ↔ JS fidelity

C verified line by line:

- `options.c:9038`: `if (i >= 0 && i < OPTCOUNT && allopt[i].name
  && allopt[i].optfn)` gate; `:9040–9042` calls
  `(*allopt[i].optfn)(idx, get_val, FALSE, buf2, empty_optstr)`;
  `:9043–9044`: `if (reslt == optn_ok && buf2[0]) value = buf2;`
  with `value = "unknown"` preset at `:9026`. The JS
  `get_val(…) || 'unknown'` is exactly this: non-empty buf wins,
  else "unknown". (Error-with-buf divergence is unreachable for
  fruit: get_val always returns OK, do_set never touches buf.)
- `options.c:1770–1772` (`optfn_fruit`): `if (req == get_val ||
  req == get_cnf_val) { Sprintf(opts, "%s", svp.pl_fruit); return
  optn_ok; }` → JS `set_optbuf(opts, String(game.pl_fruit ||
  ''))` + OPTN_OK. Exact.
- `optlist.h:339–340`: `NHOPTC(fruit, …, No, Yes, No, No, …)` —
  the `h` slot is `has_handler` per the NHOPT_PARSE expansion
  (`:78–80`, trailing `Off, h, 0, 0`; disclose's row has `Yes`
  there). No `handler: true` on the JS row. Exact.
- Shape precedent: the adjacent `crash_name` row already uses
  `doset_compopt_get_val(…) || 'unknown'`; the set path (getlin,
  `:9651`) is pre-existing and proven (O menu showed `[j]` on
  both sides through step 150 — only this display row disagreed).

Combined-arm check: single-row change inside the `doset()`
dispatch; every callee LIVE (`doset_compopt_get_val` same module,
`optfn_fruit` same module). No STUB, no new arm.

## Hallucinations / overclaim

None. No dispatch-vs-callee gap. No FORCE/DIAG/seed reads. Rule
#2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: cliffs-head writer (the full-menu display row), one
row, code + ledger + verify in one handoff. Right-sized. Sampled
verdict: the fruit row — faithful.

## Verification

D-log claim: `verify paniclog: 1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS` + REACH-OK + full 44/44. The scoreboard write
was lost to a pre-finish checkout in this SHA and recorded by
`be0ad1946` (docs-only, correctly not reviewed as js-touching):
151/paniclog → PASS, the only row changed.

Audit re-measure
(`verify paniclog --base 2e0cee50b~1 --reach-all`):

```text
scen-options-Archeologist-94231: PASS
verify paniclog: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke paniclog: … 24 PASS, 0 regressed → REACH-OK
```

Claim reproduced exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
