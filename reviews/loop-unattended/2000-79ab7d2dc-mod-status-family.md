# Review 2000 — 79ab7d2dc — options.c mod-status family + donning stale

Metadata: SHA `79ab7d2dc`, D-3040, js/options.js (+62) + js/invent.js (+5/−2).

## Intent vs deliverable

Subject promises "mod-status family whole + donning stale". Diff actually
adds: exports `set_option_mod_status`, `set_wc_option_mod_status`,
`set_wc2_option_mod_status`; exports `SET_GAMEVIEW`; wires the two
`sync_perminvent` prohibited-arm calls in invent.js. Donning stale note in
message only (no donning diff — correct for a stale). Matches promise.

## Inventory

- `set_option_mod_status` (new export) — C options.c:9854–9869.
- `set_wc_option_mod_status` (new export) — C options.c:9880–9896.
- `set_wc2_option_mod_status` (new export) — C options.c:9934–9950.
- `sync_perminvent` prohibited arm (wired, 2 lines) — C invent.c:5623–5624.

## C ↔ JS fidelity

`set_option_mod_status` (C `:9854–9869` via csym): guard
`SET__IS_VALUE_VALID(status) → impossible + return` :9859–9861 ✓;
first-prefix-match loop with `str_start_is(..., TRUE)` :9864–9867 ✓
(`return` after first match ✓). The ironic macro verified directly:
global.h:603 `#define SET__IS_VALUE_VALID(s) ((s < set_in_sysconf) ||
(s > set_wiznofuz))` — true means *invalid*, and JS
`status < SET_IN_SYSCONF || status > SET_WIZNOFUZ` (0/6, matching
global.h:581/587; SET_GAMEVIEW=3 matches :584) preserves the call-site
semantics exactly. `void impossible(...)` matches file precedent for the
async callee in a sync function (disclosure arm pattern).

`set_wc_option_mod_status` (C `:9880–9896`) / `set_wc2_option_mod_status`
(C `:9934–9950`): guard ✓, null-terminated `while` → length loop ✓
(same shape as live `is_wc_option`), `(optmask & bit) !== 0` for C
nonzero test ✓ (all WC_ bits ≤ 0x80000000, sign-safe under `!== 0`);
fan-out calls `set_option_mod_status` :9893/:9947 ✓.

Invent wiring: `set_option_mod_status('perm_invent'/'perminv_mode',
SET_GAMEVIEW)` at :5623–5624 ✓, riding the pre-existing invent→options
edge (import line extended, no new cycle). No RNG; branch order is C
order with per-arm cites. Callee closure: `impossible` LIVE,
`str_start_is` (check: used elsewhere in options.js? it compiled and
gates pass — pre-existing helper), no clones, no stubs. Named omit:
wintty.c:2965 call under `#ifndef RESIZABLE` while the file defines
`RESIZABLE` (:39) — compiled out by C design, legitimate by-design note.

One indexer note (not a C-wrong): `node scripts/sym.mjs SET_GAMEVIEW`
reports NOT FOUND even though the export exists at js/options.js:8703 —
the single-line multi-const `export const A = 0, B = 1, ...` shape is
invisible to the indexer. Reviewers should grep, not sym, for such lines.

## Hallucinations / overclaim

None. "Every arm ported" holds for all three functions; the stale
`donning` claim is message-only with a file:line pointer, no code touched.

## Density

3 whole functions of one C file + a 2-line caller wiring in the same
handoff — within §2b. Each function has its Ledger entry. OK.

## Verification

D-log cites `verify.mjs --fn set_option_mod_status,set_wc_option_mod_status,
set_wc2_option_mod_status` → PASS + REACH-OK + green/strict/cohort + full
44/44, plus a headless first-match-wins probe. Re-measured:
`hidden-proxy.mjs verify ... --base 79ab7d2dc~1 --reach-all` → 0 blocked
at baseline (vacuous, expected for coverage rows — D-log says so), smoke
24/24 PASS each → REACH-OK ×3, no regressions. Diff grep: no
FORCE/DIAG/RNG-log/seed reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
