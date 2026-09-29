# Review 2051 — da4f12710 — wiz_custom + wiz_kill EXT_CMDS runners (D-3091)

Metadata: SHA `da4f12710`, D-3091, Must-fix of review 2049. js/getline.js
(+22) + new scripts/wizcustom-wizkill-runners.test.mjs (24 lines).

## Intent vs deliverable

Promise (subject): "wiz_custom + wiz_kill EXT_CMDS runners:
#wizcustom/#wizkill dispatch (Must-fix review 2049)". Diff actually
adds: two EXT_CMDS rows (wizcustom wiz:true/autocomplete:false,
wizkill wiz:true/autocomplete:true), each a lazy
`import('./wizcmds.js')` async runner, plus a 3-it node:test pinning
both resolvable + a sibling check. No body touched. Promise kept
exactly; review 2049's Actionable item is what shipped.

## Inventory

- EXT_CMDS `wizcustom` row (js/getline.js:783): name/wiz/autocomplete
  + async run → wiz_custom(). Callee LIVE (async export
  js/wizcmds.js:2109, awaited via returned promise — `return
  wiz_custom()` inside async run ✓).
- EXT_CMDS `wizkill` row (:794): same shape → wiz_kill()
  (js/wizcmds.js:2149, async ✓).
- No helpers, no clones, no stubs, no deleted/re-pointed symbols
  (pure add; nothing for `sym.mjs` deletion output — symbol roll
  below instead).

## C ↔ JS fidelity

C locus is the extcmdlist table, not the bodies (unchanged since
D-3089 ACCEPT). `csym --callers` reports 0 references for both (the
known function-pointer-table trap — review 2049's finding); direct C
read:

- "wizcustom" cmd.c:1951–1952: `wiz_custom, IFBURIED | WIZMODECMD |
  NOFUZZERCMD` — unconditional, no AUTOCOMPLETE ≡ runner
  autocomplete:false ✓. EXT_CMD_AC correctly untouched (no
  wizcustom row there — verified).
- "wizkill" cmd.c:1967–1969: `wiz_kill, IFBURIED | AUTOCOMPLETE |
  WIZMODECMD | CMD_M_PREFIX | NOFUZZERCMD` — unconditional ≡
  runner autocomplete:true ✓; AC row pre-exists (:351) ✓.
  CMD_M_PREFIX needs no runner handling (wizwish precedent — the
  prefix is consumed by the extended-command reader, not the row).

D-2779 sibling pattern matched (dynamic import, no new static edge —
no `--can` question). No RNG. Confirm.

`sym.mjs` output (Method §3 — no deletions; callee roll):

```text
wiz_custom       js/wizcmds.js:2109   ASYNC — await required
wiz_kill         js/wizcmds.js:2149   ASYNC — await required
```

## Hallucinations / overclaim

None. "2 fail pre-fix (null runners), 3/3 pass post-fix" re-runs
green here (3 pass / 0 fail, current tree). The D-log's flag strings
match the C rows verbatim.

## Density

Must-fix ships alone ✓ (runner rows + their test only). `Ledger:`
both ported ✓. Per-function: wiz_custom ACCEPT; wiz_kill ACCEPT →
SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify wiz_custom,wiz_kill --base
  da4f12710~1 --reach-all`: both `0 session(s) blocked (0 at
  baseline, 0 in working)` + `smoke (24 run): 24 PASS, 0 regressed
  → REACH-OK`. Matches the D-log; honestly vacuous (Must-fix row
  cited 0 corpus blocks; corpus cannot reach wizard extcmds).
- Test file re-run: 3/3 pass. Ban-grep on js hunk: 0 hits.
  `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
