# Review 1592 — d62c8935 — role.c role_menu_extra whole-body port (D-2633)

**Metadata:** SHA `d62c8935`, `role.c` `role_menu_extra`, D-2633
(+ `pager.c` whatdoes_cond compiled-out park).
JS: `js/player_selection.js` only (+107/−76).
Coverage row (partial clone → restart). No prior review claimed closed.

## Intent vs deliverable

Subject promises: RS_NAME arm, RS_ROLE filter loop, race/gender/
alignment filter-disabled arms, C-constant comparisons, C-order
output chain, impossible tail — plus two in-iteration TDZ renames
(`f`→`fsel`, `aligns[f]`). Diff delivers the restart with `await`
on all 8 pick_*_menu call sites — but the rename is incomplete:
one use of bare `f` survives (below). Promise otherwise matches
deliverable.

## Inventory

- `menu_extra_lines()` — restarted (now async), C order with
  per-arm cites.
- `impossible` + RS/ROLE constants joined to existing imports.
- 8 call sites gained `await` (4 pick_*_menu × random-row +
  which-row loops).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `role.c:1815–1960` (146 L, via `csym.mjs role_menu_extra`;
24 call sites inside `genl_player_setup`). Full C body read here.
Arm-by-arm confirm:

- RS_NAME `:1834`: only `what = "name"`, `f` stays 0 → "Pick another
  name first" — exact (JS `fsel = 0`).
- RS_ROLE `:1837–1847`: `f = r`, sparse `rfilter.roles` ≡ C
  zero-init — shape exact, **but** `js/player_selection.js:875`
  reads `if (i !== f && !rfilter.roles[i]) break;` where `f` is the
  module-level `function f()` (`:51`, returns the flags object),
  not C's local `f` (= initrole, renamed `fsel` at `:872` and used
  correctly at `:891`/`:909`/`:935`/`:953`). Number-vs-function
  compares always-true, so the scan breaks at the selected role
  itself and the `"filter forces role"` constrainer arm
  (`:1842–1844`) can never trigger when only the selected role
  passes the filter. Common-case outcome identical (both break
  before the end), so every gate stays green — but the arm
  contradicts C. **C-wrong, Must-fix below.**
- RS_RACE `:1848–1866`: `MH_HUMAN`, `c = ROLE_NONE` override,
  role/filter arms — exact.
- RS_GENDER `:1867–1888`: ROLE_MALE/FEMALE + filter arm — exact.
- RS_ALGNMNT `:1889–1927`: role→race→filter chain + `:1924`
  forcedvalue tail — exact.
- Output chain `:1929–1958` (constrainer/what/filter/random/quit/
  bad-arg) — order exact; per-arm letters match `RS_menu_let[]`.
- Bad-arg arm awaits live display.js `impossible` — exact.
- `roles.length` (13, no terminator) for C `SIZE(roles)-1` — exact
  per the C UNDEFINED_ROLE terminator.

whatdoes_cond park: body+prototype+sole caller all inside C `#if 0`
(`:2447–2585`) — legitimate no-JS companion, correctly parked
rather than ported.

Callee closure: `add_menu`/`add_menu_str` mapped to menu_pick line
objects (map-named, setup_*menu protocol); `'* * Random'` vs
`'* - Random'` preselect text kept (pre-existing presentation,
callers carry `preselected:true`). No stubs in live arms.

## Hallucinations / overclaim

D-log narrates both TDZ renames as complete ("renamed to `fsel`",
"renamed"), yet the shipped line 875 still uses bare `f` — the
rename claim is overbroad for this arm. Stated explicitly per
method §5: the D-log's "filter loop" bullet is correct about shape
but wrong that the rename finished.

## Density

146-line C function, one module, +107/−76. Right-sized. Full 44/44
re-run claimed for the shared startup file.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify role_menu_extra --base
  d62c8935~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled) + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Both summary lines cited; no REGRESSED session. The
  C-wrong hides on a filtered-role chargen path no corpus session
  exercises — verification genuine but blind to it, which is why
  the audit (not the gates) caught it.

## Actionable C-wrongs

1. RS_ROLE filter loop compares against module `f()` instead of
   `fsel` (`js/player_selection.js:875`): one-line fix `i !== f` →
   `i !== fsel`, restoring the `"filter forces role"` arm per C
   `:1840–1844`. Queueable in one port iter; prepended to
   LOOP-QUEUE.md Must-fix with this review as Source.

Verdict: **QUALITY-RISK**
