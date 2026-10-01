# Review 2152 — 24e6bea47 — mpickstuff verbose gate

SHA `24e6bea47`, D-3192; 2026-10-01; +3/−1 JS in 1 file.
Closes review 2150 item 2 (last open 2150 item).

## Metadata

- Subject: "restore mpickstuff verbose default-ON gate (D-3191)."
- Files: `js/monmove.js` only (gate line + C-citing comment).
- Must-fix ships alone: density exception, no coverage row bundled.

## Intent vs deliverable

Promise: restore the C default-ON verbose gate in `mpickstuff`. Diff
delivers one ternary flip (`game.flags.verbose` → `game.flags?.verbose !==
false`) plus comment. No new functions, no imports, no caller touched.
Promise kept, nothing extra.

## Inventory

- `mpickstuff` (js/monmove.js:495, local async function): gate-only change.
- Helpers added: none. Deleted/re-pointed symbols: none. sym output
  (pasted per Method — the diff re-points no symbol, so this is context):

```text
mpickstuff       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/monmove.js:495
```

This is the sole implementation, local to its sole C caller's file
(monmove.c:1680 → monmove.js). No second implementation exists, so there is
no clone drift to fix; the local placement is inherited from D-3176, not
this SHA's defect. Noted, not queued.

## C ↔ JS fidelity

**Confirmed branch-exact.** C `mon.c:1846–1910` (csym range): after the
shopkeeper / rn2(25) / could_reach_item early returns and the
prize/corpse/touch/carry filters, `:1894–1900` runs `distant_name(otmp,
doname)` for side effects inside `if (cansee(...))`, then `if
(flags.verbose) pline_mon(...)`. JS js/monmove.js:531–540 mirrors it
line-for-line: cansee gate → distant_name before extract (D-0840 comment)
→ `!== false` gate → pline_mon. `flags.verbose` is decl-TRUE in C, so the
uninitialized-bag-ON reading is the faithful one; the D-3176 truthy gate
also dropped `?.`, both restored here. RNG (`rn2(25)` at :1858) untouched.

Diff grep: no FORCE, DIAG, getRngLog, seed names, fastforward, or hardcoded
coordinates. Rule #2 clean (iteration-wide `imports.mjs --rulecheck`).

## Hallucinations / overclaim

None. The D-log claims a one-gate restore with no new omissions and pastes
the real verify tail. No dispatch-over-stub claim; no callee involved.

## Density

Must-fix single item, alone — per §2b. One Ledger line (mpickstuff ported),
one Verify line. Function verdict: ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify mpickstuff: 0 blocked at 24e6bea47~1 (vacuous — review row, not corpus row)
reach mpickstuff: 3 baseline-PASS session(s) reach it: 3 PASS, 0 regressed → REACH-OK
```

Matches the D-log (reach 3/3, green 2/2, strict ×2, cohort 7/7, full 44/44
auto on shared file). No REGRESSED session; no vacuous-PASS overclaim.

## Actionable C-wrongs

None. Review 2150 is now fully closed (items 1, 3–4 by D-3191, item 2 here).

Verdict: **ACCEPT**
