# Review 2391 — c0717c51e — 7-function batch + opt_phase fix (D-3457)

Metadata: SHA `c0717c51e`, D-3457, 8 functions (≤10 → whole Method each).
Files: `js/end.js` (savebones ×2 + doc), `js/options.js` (doset_simple +2).

## Intent vs deliverable

Promise: close 2 real gaps (savebones prev-restore vs C unconditional
clear; doset_simple missing `go.opt_phase = play_opt`), retire
bc_sanity_check's misfiled omit, audit 5 partials as unshippable-only.
Diff actually adds: 2 `in_mklev = false` lines (+doc), 1 opt_phase line
(+guard). Matches; no scope drift.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| savebones | audited (fix) | js/end.js:1642 | bones.c:402–625 |
| doset_simple | ported (fix) | js/options.js:11170 | options.c:8705–8735 |
| bc_sanity_check | ported (retire) | js/ball.js:1103 | ball.c:1033–1102 |
| opt_usage | audited | js/earlyarg.js:448 | earlyarg.c:375–387 |
| sanity_check | audited | js/wizcmds.js:1012 | wizcmds.c:1459–1481 |
| parseautocomplete | audited | js/cmd.js:2607 | cmd.c:3243–3292 |
| status_initialize | audited | js/botl.js:354 | botl.c:1682–1720 |
| doset | audited | js/options.js:10881 | options.c:8757–8975 |

## C ↔ JS fidelity

**savebones — confirm.** C sets `gi.in_mklev = TRUE`, makemon, `=
FALSE` unconditionally in both arise (:459–461) and ghost (:496–498)
arms — the fix matches exactly. Walked the rest of the 224-line C body:
probe-hit wizard Replace/delete/compress, make_bones envelope, statue
arm, `!mtmp` returns, mummy/m_dowear, ebones loops incl. the
crowned=uhand_of_elbereth quirk, mon/trap/obj loops, map wipe,
cemetery, VFS tail — all present or ledger-named (closes, create arms,
binary layout). Caller C end.c:1365 → js/end.js:1234 wired.

**doset_simple — confirm.** Line lands exactly at C :8719 (after menu
gate, before give_opt_msg). PLAY_OPT=6 matches the C enum. Caller
C options.c:8777 → js/options.js:10886 wired. Nit: D-log says "already
imported" — it is a same-file export (js/options.js:8759), no import
edge; harmless. `sym.mjs PLAY_OPT` reported NOT FOUND (blind spot on
multi-declarator export lines); resolved by direct read:
```
PLAY_OPT         NOT FOUND in js/** (no export, no local function/const).
```
No symbols deleted or re-pointed in this diff otherwise.

**bc_sanity_check — confirm (ported).** Punished pair with exact
`%s%s%s` composition, freeball/freechain incl. the "lie" disjunct as
0/1 ints for `^`, uball/uchain type/where/XOR/wornmask arms, carried
branch, distance gate + message, `%08lx` pre-format — all C :1037–1100
in order. Misfile-retire story checks: siblings sit on sanity_check's
ledger row. Caller js/wizcmds.js:1024 wired.

**opt_usage / sanity_check — confirm.** CHDIR is defined
(config.h:438) so chdirx is live C → Rule #2 omit legit; dlb_init +
genl_display_file + all 6 sanity callees verified ledger by-design.
Callee order preserved among live calls; sanity_no_check gate and
in_sanity_check envelope exact.

**parseautocomplete — confirm.** Comma-first/colon-fallback split,
recurse-then-truncate, trim, `!` negation, AUTOCOMP_ADJ toggle
condition (`!!condition !== has` ≡ C :3274), set/clear, raw_printf —
all C :3249–3290. wait_synch: ledger "not a pinned-C function", and C
shows `#define wait_synch()` — an empty macro, so JS's omission is
exactly right. Nit: D-log's "windowed input boundary" rationale is a
story; the truth (empty macro) is stronger. Outcome identical.

**status_initialize — confirm.** Impossible-no-return full-init path,
reassess panic (throw idiom), 9-field nested `?:` in C order,
TITLE/hitpointbar fmt, update_all + botlx. Omit correctly placed in
genl_status_init (D-3455). Callers wired (spot: js/allmain.js:225 gate).

**doset — confirm (re-certification).** No JS change; stands on review
2389's full bool-list read. Re-verified: skip helper is wc-only
(js/options.js:4532 — wc2 half absent = the named omit),
PREFIXES_IN_USE compiled out (unix defines neither gate macro),
help/rerun/bool/handler/getlin/othr pick structure + preference_update
stub calls present. Falsifier scen-options-Samurai-94071 keeps the
deferral honest.

## Hallucinations / overclaim

None. "Match C" claims hold on both fixes; audit "cannot ship" notes
verified arm-by-arm (or, for doset, re-verified against 2389 + no-op
diff). Two wording nits above, neither behavioral.

## Density

8 functions, each with Ledger entry + Verify line; Left open: none.
Manifest-drained small batch (7 partials + 1 fix); no Must-fix bundled
(override disclosed, heads still queued — accepted precedent).

## Verification

D-log: 8× vacuous + 8× REACH-OK, green/strict/cohort/full 44/44.
Re-ran `--base c0717c51e~1 --reach-all`: 0 blocked at baseline on all
8 (rows cited none — vacuous notes legitimate), 8× REACH-OK (24/24, 0
regressed). Claim true. Diff grep: no FORCE/DIAG/seeds/coords.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
