# Review 2398 — 21b213581 — lspo_monster name→helper rewire + impossible (D-3471)

Metadata: SHA `21b213581`, D-3471, Open head. 2 functions (≤10 →
whole Method each). Files: `js/mklev.js` (+7/−1: passthrough → helper
call) + `scripts/lspo-monster-name.test.mjs` (new, 6 tests). No
import change.

## Intent vs deliverable

Promise: re-audit coverage-head `impossible` unchanged; restart the
lspo_monster table-arm name read through the shared
`get_table_str_opt` (C :3295) — the passthrough left functions
uncalled and direct non-strings silent. Diff delivers exactly that
one-line restart + comment. Matches.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| get_table_str_opt@monname | partial (wire) | js/mklev.js:23173–23178 | sp_lev.c:3295 via nhlua.c:1053–1076 |
| impossible | audited | js/display.js:8970 (unchanged) | pline.c:583–634 |

## C ↔ JS fidelity

**Rewire — confirm.** C :3295
(`tmpmons.name.str = get_table_str_opt(L, "name", NULL)`,
grep-pinned) via the helper verified in 2396 (nil→NULL, string
kept, function pcalled + optstring conversion, else verbatim
throw). The passthrough gap is genuine: old code kept every
non-null value unconverted (functions reached christen_monst
uncalled); C pcalls functions and nhl_errors direct non-strings.
Equivalences verified: sole caller passes `tmp = {...o}` after the
null/non-object gate (:23272–23279; only call site), so
`lua_field` is `tmp.name` and classifications match C's. Downstream
safety by construction: post-change value classes are null and
string (both pre-existed downstream) plus throw (= C's fatal
nhl_error — a numeric name kills C too). `sym.mjs` single sync
def; edge pre-exists (:150).

**impossible — confirm:** cite 2396 (byte-identical, display.js
untouched here).

**Ledger note (no new defect):** this finish re-certified
get_table_str_opt (`d` += D-3471) without touching the omit, so
D-3469's impossible paste persists — still covered by queued
Must-fix row 7, whose repair restores D-3471's 15-caller Named line
(see 2397; re-verify at repair per protocol). This SHA's own Named
line is correct (15 callers: 3295/4262/4352 wired).

## Hallucinations / overclaim

None. "Behavior delta is exactly the C conversion" proved above;
the 15-caller census is D-3469's verified 16 minus :3295.

## Density

Breadth-phase bar: site whole on the shared helper (no adapter
remainder); audit re-certifies the 2396-verified body. Ledger
entries + Verify lines present; Left open: none.

## Verification

D-log: 2× hidden note + 2× REACH-OK, green, strict, cohort, full
44/44. Re-ran `hidden-proxy.mjs verify impossible,get_table_str_opt
--base 21b213581~1 --reach-all`: 0 blocked at baseline and working
scoreboard on both; 2× REACH-OK (24/24 each, 0 regressed). Claim
true. `node --test` lspo-monster-name: 6/6. Rule #2 clean
(iteration-wide). Diff grep: no FORCE/DIAG/seeds/coords/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
