# Review 2346 — 6d194731e — recover_savefile reverted to by-design

**SHA:** `6d194731e` — "`files.c` recover_savefile compiled-out port reverted to by-design (D-3391)."
**Scope:** js/files.js +8/−299 (3 deletions + 5 doc-line fixes) + ledger flip to by-design. Must-fix 2344.1.
**Prior reviews closed:** 2344 (stamped `**Addressed:** D-3391` + short hash `6d194731e` ✓).

## Intent vs deliverable

Promise: D-3389's live `recover_savefile` port was a scope C-wrong (C sits under `#ifdef SELF_RECOVER`, undefined in the scored build); delete the dead JS + helpers, flip the ledger, fix stale docs. Delivered exactly: `recover_savefile`, `sfo_int`, `sfvalue_int` defs gone, five doc lines corrected, `PL_NSIZ_PLUS` import dropped, nothing else touched. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `recover_savefile` def deleted (was js/files.js:1438) | delete (compiled out) | files.c:2864–3082 |
| 2 | `sfo_int` def deleted (was :1923) | delete (recover-only helper) | sfbase.c `SF_A(int)` :119–133, macro-generated |
| 3 | `sfvalue_int` def deleted (was :2168) | delete (recover-only helper) | sfbase.c:558–563, macro-generated |
| 4 | 5 doc lines: "live below" → compiled-out/by-design | docs | — |
| 5 | `PL_NSIZ_PLUS` import dropped | import prune | — |

Required sym output (every deleted symbol re-pointed to nothing):

```text
recover_savefile NOT FOUND in js/** (no export, no local function/const).
sfo_int          NOT FOUND in js/** (no export, no local function/const).
sfvalue_int      NOT FOUND in js/** (no export, no local function/const).
```

Grep over `js/**`: only the five corrected doc mentions remain; zero code refs. `sfo_int`/`sfvalue_int` were macro-generated (not pinned-C), so no ledger rows owed.

## C ↔ JS fidelity

**Classification — Confirm.** `files.c:2858` opens `#ifdef SELF_RECOVER` immediately above the recover block; `unixconf.h:126` reads `/* #define SELF_RECOVER */` (commented out — verified by direct read); sole C caller `sys/unix/unixunix.c:219` sits inside the same `#ifdef` (:217–219). Absent from contest binary and recorder alike → by-design per RUNBOOK §4, matching the Placebc/adjust_prefix precedent class. Deleting the whole port (rather than guarding it) is the correct handling — there is no scored analogue. `get_critical_size_count` kept live is right (scored version.c export; its only *in-tree* caller is the compiled-out one, but the export itself is scored code). `create_savefile`'s `in_self_recover` read untouched is right (live scored C :1168). No RNG, no branches to walk — deletion-only.

## Hallucinations / overclaim

None. "~140 JS lines" matches the deleted body; "zero call sites" confirmed by grep; verify claims re-measured below.

## Density

Must-fix ships alone ✓ (one item, one function, deletion-only). One `Ledger:` entry (by-design). No Open row bundled, no campaign needed. Correct density for a classification fix.

## Verification

Re-measured (`verify recover_savefile --base 6d194731e~1 --reach-all`): 0 blocked + vacuous note + REACH-OK — matches the D-log verbatim, including the honest "vacuous by construction" framing. Verbatim:

```text
smoke recover_savefile: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
```

D-log Verify shows full gates (green 2/2, strict ×2, cohort 7/7, full 44/44). Guard cites re-verified by direct read: `files.c:2858 #ifdef SELF_RECOVER`, `unixconf.h:126 /* #define SELF_RECOVER */`, caller `unixunix.c:219` inside `#ifdef` at :217. Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: `imports.mjs --rulecheck` → clean (iteration-wide run).

## Actionable C-wrongs

None. The five corrected doc lines read accurately; no stale ledger note introduced (by-design row carries no contradictory "measured MISSING" note — checked against the 2345.1 family).

Verdict: **ACCEPT**
