# Review 1595 — 271ceca1 — role.c role_menu_extra RS_ROLE filter-loop compare fix (D-2636)

**Metadata:** SHA `271ceca1`, `role.c` `role_menu_extra`, D-2636.
JS: `js/player_selection.js` (+3/−3: one-line fix + two additive exports);
new `scripts/role-menu-extra.test.mjs` (+48, not scored).
Closes review 1592's Must-fix (QUALITY-RISK → fix; queue line consumed,
`**Addressed:** D-2636` stamped, short hash filled this audit).

## Intent vs deliverable

Subject promises: one-line `i !== f` → `i !== fsel` in the RS_ROLE
filter loop, additive exports of `menu_extra_lines` + `rfilter` so the
arm is testable, and a committed headless regression test driving
RS_ROLE both ways. Diff delivers exactly that — 3 changed JS lines,
48-line test, no other behavior touched. Promise matches deliverable.

## Inventory

- `menu_extra_lines(which, preselectRandom)` (`js/player_selection.js:855`,
  ASYNC per `sym.mjs`) — one compare-operand change at `:875`.
- `rfilter` (`:49`) — `const` → `export const` (additive).
- `menu_extra_lines` — `async function` → `export async function` (additive).
- `scripts/role-menu-extra.test.mjs` — new node:test file, 2 cases.
- No deleted symbol, no local→import re-point (nothing for `sym.mjs`
  re-point output to paste beyond the ASYNC confirmation above).

## C ↔ JS fidelity

C locus `role.c:1815–1960` (146 L, via `csym.mjs role_menu_extra`).
The only changed arm is RS_ROLE, C `:1837–1847`:

```c
f = r;
for (i = 0; i < SIZE(roles) - 1; ++i)
    if (i != f && !gr.rfilter.roles[i])
        break;
if (i == SIZE(roles) - 1) { constrainer = "filter"; forcedvalue = "role"; }
```

C's `f` is the function-local int (`f = r` = initrole). The pre-fix JS
compared `i !== f` where `f` is the module-level `function f()` (`:51`,
returns the flags object) — number-vs-function, always true, so the
scan broke at the selected role itself and the `"filter forces role"`
arm (`:1840–1844`) could never fire. Post-fix `i !== fsel` reads the
correctly-renamed local (`fsel = r` at `:872`, already used at
`:891`/`:909`/`:935`/`:953`), restoring the C predicate exactly.
Branch order untouched; no RNG in this arm (`rn2`/`rnd`/`rn1`/`d` —
none in C `:1837–1847`, none in JS). The two new exports change no
call path (no caller change; test-only import).
Test-to-C mapping: case 1 (all roles excluded but initrole 0) walks
the full loop to `i === roles.length` → `filter forces role`, the C
`:1842–1844` arm; case 2 (no exclusions) breaks at `i = 1` → the
pick-first entry. Both match C outcomes for those states.

## Hallucinations / overclaim

D-log claims the committed test FAILED before the fix and passes
2/2 after. After-state verified here (`node --test` → 2 pass, 0 fail).
Before-state not re-executed, but it is provable from the diff: with
`i !== f` (function object), case 1 breaks at `i = 0`
(`0 !== fn` true, `!roles[0]` true) → `i !== roles.length` → asserts
`/filter forces role/` fails. No overclaim found; the "common-case
outcome identical" framing from the subject is accurate (both break
before the end whenever any non-selected role passes the filter).

## Density

Must-fix closure, not coverage: 3 JS lines + a 48-line test for a
one-arm C-wrong. Right-sized for the class (§2b does not demand
200+ lines on a Must-fix). No second subsystem touched.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- `node --test scripts/role-menu-extra.test.mjs` → 2 pass, 0 fail.
- Re-measured: `hidden-proxy.mjs verify role_menu_extra --base
  271ceca1~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — no corpus session exercises the
  filtered-role chargen path) + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Both summary lines cited; no REGRESSED session.
  The D-log's Verify bullet reports the same pair; claim genuine.

## Actionable C-wrongs

None. The single C-wrong from review 1592 is fixed at
`js/player_selection.js:875` with the arm now matching C `:1840–1844`.

Verdict: **ACCEPT**
