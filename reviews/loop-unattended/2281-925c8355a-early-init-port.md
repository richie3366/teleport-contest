# Review 2281 — 925c8355a — early_init whole-body port + jsmain wiring

- SHA: `925c8355a` (D-3325)
- Files: `js/allmain.js` (new export + 5 edges), `js/jsmain.js` (entry rewire)
- Insertions: modest; genuine new port on the startup path

## Intent vs deliverable

Subject promises: "allmain.c early_init whole-body port + jsmain entry
wiring (domenucontrols stale-split)". The diff delivers exactly that: new
`early_init(argc, argv)` at the C locus in allmain.js with 7 calls in C
order, and jsmain `start()` calling `early_init(0, [])` in place of 4
direct-init calls. No DIAG/FORCE/seed; Rule #2 clean (iteration-wide
rulecheck).

## Inventory

- `early_init` (allmain.js:776): NEW port, whole C body.
- jsmain `start()`: 4 direct calls replaced by 1; 3 imports dropped.
- All 7 callees pre-existing LIVE exports (no clones, no stubs).

## C ↔ JS fidelity

C body (allmain.c:32–45): `program_state_init()` `:35`, `#ifdef
CRASHREPORT crashreport_init(argc, argv)` `:38`, `decl_globals_init()`
`:40`, `objects_globals_init()` `:41`, `monst_globals_init()` `:42`,
`sys_early_init()` `:43`, `runtime_info_init()` `:44`; sole C caller
unixmain.c:66 (port entry ≡ jsmain `start()`). JS walks all 7 in C order
with C-line cites — call-for-call, no RNG in the body itself. CRASHREPORT
liveness re-measured: config.h:244 `#ifndef NOCRASHREPORT` defines it,
and unixconf.h contains no `NOCRASHREPORT` (grep over both headers) — the
`:38` call is live, correctly ported. Callee closure (all `sym.mjs` LIVE,
single defs): `program_state_init` decl.js:53, `crashreport_init`
report.js:32 (voids argc/argv ≡ C nhUse; `bid='unknown'` ≡ C `skip:` arm,
the only Rule-#2-reachable outcome), `decl_globals_init` decl.js:97,
`objects_globals_init` objects.js:69 (pure allocation, no RNG),
`monst_globals_init` monsters.js:222, `sys_early_init` sys.js:37,
`runtime_info_init` version.js:671 (one-shot guarded string/version
build, no RNG). Old jsmain order (program_state, decl, monst, sys)
becomes C-exact order with objects `:41` between decl and monst —
matching C is correct by definition, and the entry objects install draws
no RNG. New module edges ride the existing allmain→monsters edge (plus
decl/report/objects/sys/version, D-log `--can` SAFE); no TDZ — every
later verify in this audit re-ran green on this tree. Nit (unqueued,
pre-existing file): report.js:28 still says the `:38` caller "is
unported — exported unwired"; stale since this SHA.

## Hallucinations / overclaim

None. "7/7 calls" verified against the C body above. "(0, [])" is the
honest Rule-#2 analogue (no argv in ESM; callee voids both params).

## Density

Single whole function + entry wiring; `Ledger:` early_init ported
(+ domenucontrols stale-split booking). Verify lines present. The head's
closure holds nothing more Open per the D-log.

## Verification

Re-measured (`hidden-proxy.mjs verify early_init --base 925c8355a~1
--reach-all`): 0 blocked (vacuous; row cited 0 blocks, honestly noted) +
smoke 24/24, 0 regressed → REACH-OK — the D-log tail verbatim (which also
records green 2/2, strict both, cohort 7/7, full 44/44).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
