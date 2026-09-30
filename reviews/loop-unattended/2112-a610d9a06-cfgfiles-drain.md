# Review 2112 — a610d9a06 — cfgfiles drain + sysconf stores + heed + configfile

- SHA: `a610d9a065df83278d9ef7f70273782254359569` (D-3152)
- Date: 2026-09-30. `js/` delta: +90/−8 cfgfiles.js, +15 options.js;
  +110 test (5/5, re-ran myself).
- Cluster: 6 `cfgfiles.c` ports + 20 ledger-only `split` dispositions
  (no JS change for the 20).
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "config-error drain + sysconf stores + statement heed
+ default configfile". Diff actually adds: `l_get_config_errors`, both
`cnf_line_*` handlers wired into the table, heed/disregard exports,
`get_default_configfile`, two comment refreshes, and the test. Promise
matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `l_get_config_errors` (cfgfiles.js:278, sync export — C extern) | new, C order | whole |
| `cnf_line_DEBUGFILES` (cfgfiles.js local — C `staticfn`) | new, wired into table | whole |
| `cnf_line_BONES_POOLS` (cfgfiles.js local — C `staticfn`) | new, replaces mistyped lambda | whole |
| `heed_this_config_statement` (cfgfiles.js:986, export — C extern) | new | whole |
| `disregard_this_config_statement` (cfgfiles.js:997, export — C extern) | new | whole |
| `get_default_configfile` (options.js:744, export — C extern) | new | whole |
| 20 siblings (9 dir + 4 QT + 7 stores) | ledger `split` only | spot-verified below |

Callee closure: `cnf_store_str` (LIVE, free+dupstr ≡ assignment),
`sysoptBag().env_dbgfl` (0 via `sys.js:48/105` — Rule #2, no getenv),
`configErrorMsg` module list. The `nhl_add_table_entry_*` effects are
inlined as the `{line,error}` shape (by-design, no scored analogue).
No clones, no stubs. No import added → no `--can`/TDZ question.

`sym.mjs` (required — nothing deleted/re-pointed):

```text
l_get_config_errors: js/cfgfiles.js:278 sync
cnf_line_DEBUGFILES: 1 LOCAL (C staticfn — correct shape)
cnf_line_BONES_POOLS: 1 LOCAL (C staticfn — correct shape)
heed_this_config_statement: js/cfgfiles.js:986 sync
disregard_this_config_statement: js/cfgfiles.js:997 sync
get_default_configfile: js/options.js:744 sync
```

## C ↔ JS fidelity (per function)

**`l_get_config_errors`** — C `cfgfiles.c:1514–1539` (`csym`). Head→tail
walk pushing idx 1..n `{line,error}`, per-node free ≡ GC, head nulled,
table returned — exact modulo Lua-table→JS-array (named D-3098
adaptation; live `#ifndef SFCTOOL` in contest). Caller: sole —
`nhlua.c:1887` registration (verified in place). Confirm.

**`cnf_line_DEBUGFILES`** — C `:838–849`: env gate + free/dupstr + TRUE
— exact. Confirm. **`cnf_line_BONES_POOLS`** — C `:873–885`: atoi +
`(n<=0)?0:min(n,10)` + TRUE — exact (`parseInt`+NaN→0 ≡ atoi on all
inputs). Both replace lambdas; the BONES_POOLS lambda genuinely
mistyped (raw string vs clamped int). Confirm both.

**heed/disregard** — C `:1996–2007`: bounds-checked index set — exact.
The risky claim (59-row index compatibility) I verified independently:
JS table has 59 rows; C has OPTIONS + 19 + 28 SYSCF (defined,
`config.h:233`) + 7 + 4 QT = 59 with SOUNDDIR/SOUND compiled out
(USER_SOUNDS undefined for the contest build) — same order row-for-row,
and `disregardedConfigLines` is sized off the JS table. No C callers
(decls `extern.h:344–345` only) → unwired correctly. Confirm both.

**`get_default_configfile`** — C `:148–152` returns `default_configfile`
= `".nethackrc"` under UNIX (`:128`); other arms compiled out. JS
returns the literal. Callers: `files.c` reveal_paths (no JS symbol —
unported, named) + compiled-out fopen arms. The pre-existing
`fopen_config_file` UNIX literal is deliberately not rewired (noted in
the D-entry; same literal, no divergence). Confirm.

**20 splits** (sampled 4 shapes): dir handlers' unix body is
`nhUse+TRUE` (HACKDIR `:637–650`, LEVELDIR `:652–670` incl. its MICRO
extras — all compiled out) ≡ `cnf_line_nhUse`; QT handlers'
non-QT_GRAPHICS body is `nhUse+TRUE` ≡ same; plain stores are
free+dupstr+TRUE (SHELLERS `:811–818`) ≡ `cnf_store_str`. The split
targets are live shared bodies, not stubs. Confirm.

Diff grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. Every structural claim (registration line, 59-row compatibility,
split shapes) verified against C rather than trusted.

## Density

- Whole-function verdicts: all six whole; all 20 splits verified-shared.
- Cluster: one C file, 6 ported ≤ 10 (the 20 splits are ledger-only
  dispositions, no JS — same practice as 2104's 13 stale proofs, ACCEPT).
  No Must-fix bundled. One `Ledger:` entry + one Verify sub-bullet per
  ported function — present.
- Size (+105) is light but the closure is complete as claimed.

## Verification

Re-measured myself (`--base a610d9a06~1 --reach-all`, all 6):

```text
verify <each of 6>: baseline a610d9a06~1 — 0 session(s) blocked on it
smoke <each of 6>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Test 5/5 re-ran. No
seed/step/coordinate read. Note (finding, not this SHA): the neighbor
`parseoptions.test.mjs` 13/14 failure the D-entry discloses reproduces
at `fa5a786a1` (worktree check) — pre-existing to this whole batch,
cause undiagnosed, left for the loop (not a Must-fix: no C-wrong
identified).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
