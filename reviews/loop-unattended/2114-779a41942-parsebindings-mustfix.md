# Review 2114 — 779a41942 — parsebindings extcmd-miss returns FALSE (Must-fix 2111)

- SHA: `779a41942b4ecc7b4854762d20415bfeab54cf30` (D-3154)
- Date: 2026-09-30. `js/` delta: +2/−1 options.js; +8/−5 test.
- Cluster: one-arm return fix, closes review 2111.
- Prior-review closure claimed: 2111 (QUALITY-RISK miss-arm C-wrong).

## Intent vs deliverable

Subject promises: "parsebindings extcmd-miss returns FALSE (Must-fix
2111)". Diff actually adds: `return false` after the miss-arm
`config_error_add`, two corrected doc lines, two flipped test pins.
Promise matches deliverable exactly; nothing else touched.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `parsebindings` (options.js:974, sync export — C extern) | miss arm `return false` (was fall-through `return ret`) | whole (fix verified) |

No helpers added, removed, or re-pointed; no `sym.mjs` re-point check
needed (`parsebindings js/options.js:974 sync` — unchanged export).
Callee closure unchanged from D-3151 (all LIVE per review 2111).

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity

C `options.c:7593–7674` (`csym`), miss arm `:7668–7672` (read the body):

```c
    if (!bind_key(key, bind, TRUE)) {
        config_error_add("Unknown key binding command '%s'", bind);
        return FALSE;
    }
    return ret;
```

JS now: `if (!overlay_bind_key(...)) { config_error_add(...); return
false; } return ret;` — statement-for-statement identical, including
the hit path still returning accumulated `ret`. The error-flow claim
(`cnf_line_BINDINGS` → `parse_conf_buf p->rv=FALSE`) matches C
`cfgfiles.c:621` / `:1798` as cited in review 2111. Confirm — the
C-wrong is gone, hit-path behavior preserved.

## Hallucinations / overclaim

None. The D-entry correctly calls it "C-wrong, not a corpus
divergence" and names the two pins it flips. No "Match C" sold on a stub.

## Density

- Whole-function verdict: `parsebindings` whole (one-arm fix on the
  D-3151 whole body).
- Must-fix ships alone — correct per §2b; tiny delta is expected, not a
  density failure. One `Ledger:` entry + Verify sub-bullet — present.

## Verification

Re-measured myself (`--base 779a41942~1 --reach-all`):

```text
verify parsebindings: baseline 779a41942~1 — 0 session(s) blocked on it
smoke parsebindings: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`. The vacuous verify is honest here: review 2111
already established the C-wrong is corpus-invisible (no session feeds
a bogus BINDINGS line), and the fix is proven by the committed pins,
not the corpus. `parsebindings.test.mjs` → 22 pass, 0 fail (re-ran).
No seed/step/coordinate read.

## Actionable C-wrongs

None. Review 2111's Must-fix is closed (stamped `D-3154 779a41942`).

Verdict: **ACCEPT**
