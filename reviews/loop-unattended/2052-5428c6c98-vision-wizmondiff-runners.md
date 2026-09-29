# Review 2052 — 5428c6c98 — wiz_show_vision + wiz_mon_diff EXT_CMDS runners (D-3092)

Metadata: SHA `5428c6c98`, D-3092, Must-fix of review 2045. js/getline.js
(+23) + new scripts/vision-wizmondiff-runners.test.mjs (25 lines).

## Intent vs deliverable

Promise (subject): "wiz_show_vision + wiz_mon_diff EXT_CMDS runners:
#vision/#wizmondiff dispatch (Must-fix review 2045)". Diff actually
adds: two EXT_CMDS rows (both wiz:true/autocomplete:true), each a
lazy `import('./wizcmds.js')` async runner, plus a 3-it node:test.
No body touched. Promise kept exactly; review 2045's Actionable
item is what shipped.

## Inventory

- EXT_CMDS `vision` row (js/getline.js:946): → wiz_show_vision()
  (async export js/wizcmds.js:2059, awaited via returned promise ✓).
- EXT_CMDS `wizmondiff` row (:957): → wiz_mon_diff()
  (js/wizcmds.js:2016, async ✓).
- No helpers, no clones, no stubs, no deleted/re-pointed symbols
  (pure add; callee roll below instead).

## C ↔ JS fidelity

C locus is the extcmdlist table (bodies unchanged since D-3085
ACCEPT). Direct C read (csym reports 0 refs — the table trap):

- "vision" cmd.c:1928–1929: `wiz_show_vision, IFBURIED |
  AUTOCOMPLETE | WIZMODECMD`, unconditional ≡ runner
  autocomplete:true ✓; AC row pre-exists (:346) ✓.
- "wizmondiff" cmd.c:1985–1987 inside `#if (NH_DEVEL_STATUS !=
  NH_STATUS_RELEASED) || defined(DEBUG)` — live because
  patchlevel.h:35–37 defines DEBUG unconditionally (re-verified:
  `#define NH_DEVEL_STATUS NH_STATUS_RELEASED` then `#define
  DEBUG`) ≡ runner shipped ✓; AC row pre-exists (:352) ✓.

D-2779 pattern matched (dynamic import, no new static edge). No
RNG. Confirm.

`sym.mjs` output (Method §3 — no deletions; callee roll):

```text
wiz_show_vision  js/wizcmds.js:2059   ASYNC — await required
wiz_mon_diff     js/wizcmds.js:2016   ASYNC — await required
```

## Hallucinations / overclaim

None. "null runners pre-fix, 3/3 pass post-fix" re-runs green here
(3 pass / 0 fail, current tree). Flag strings match C verbatim.

## Density

Must-fix ships alone ✓. `Ledger:` both ported ✓. Per-function:
both ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify wiz_show_vision,wiz_mon_diff
  --base 5428c6c98~1 --reach-all`: both `0 session(s) blocked (0/0)`
  + `smoke (24 run): 24 PASS, 0 regressed → REACH-OK`. Matches the
  D-log; honestly vacuous (row cited 0 corpus blocks).
- Test re-run: 3/3 pass. Ban-grep on js hunk: 0 hits. Rule #2
  clean (re-checked this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
