# Review 1185 — 9a72fe17 — pleased pat_on_head case-5 gift-grant (D-2219)

Metadata: SHA `9a72fe17`, `js/pray.js` only (+65/−8),
D-2219. Queue row `pray.c` pleased gifts (named
debt.md:23, 0 blocked) — dispatch + case-5 arm of the
pat_on_head gift switch.

Intent vs deliverable: subject promises the case-5
intrinsic gift-grant. Diff delivers the `rn2` dispatch
plus case 5 live, all other arms as explicit `break`
with C-line deferral comments, and doc updates
retiring the case-5 omit. Nothing else.

Inventory: `pleased` gains the guarded switch; no new
function, no deleted body, no new cross-module edge
(`see_monsters` extends the pre-existing static
`display.js` edge; `INTRINSIC` extends the
pre-existing `const.js` edge). `sym.mjs`: see_monsters
`display.js:5140` sync, `imports.mjs --can` → ALREADY.
`godvoice`/`Luck`/`Blind` are file-local
(`pray.js:948` / `:201`); `verbalize`/`pline`/`rn1`
already imported. No symbol deleted or re-pointed.

**C ↔ JS fidelity**: checked against pinned
`pray.c:1167–1354` (`csym` has no entry — static
function; ranges read directly). Dispatch
`switch (rn2((Luck + 6) >> 1))` ✓ with C source-order
cases (C lists case 1, 3, 2, 4 — JS keeps that order).
Case 5 (`:1310–1338`): godvoice first ✓; ladder
`HTelepat/HFast/HStealth & INTRINSIC`, `|= FROMOUTSIDE`
(flat-field `|0` idiom per sit.js:374) ✓;
`rn1(3, 2)` first-protection / `ublessed++` repeat ✓;
Blind-gated `see_monsters()` sync, unawaited ✓;
pre-formatted gift literals (JS pline takes no format
args; quotes preserved) ✓; closing verbalize ✓.
Deferred arms carry exact C ranges (cases 1–4, 7/8,
6). One nit, behavior-neutral: C cases 7/8 fall
through to `give_spell()` when the
`record >= PIOUS && !uhand_of_elbereth` guard fails
(`:1340–1350`); JS breaks on both arms — identical
today since `give_spell` is also deferred, but the
fallthrough should be named when case 6 ships.

Hallucinations / overclaim: none. D-log does not
claim a corpus PASS — vacuous-hidden noted honestly.

Density: §2b right-size — one switch arm + dispatch,
one module.

Verification: re-measured —
`hidden-proxy verify pleased --base 9a72fe17~1` →
"0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)" + vacuous warning. Row cited 0
blocks, so no `--base` re-run is owed and none is
claimed. Rule #2 clean (`imports.mjs --rulecheck`);
no FORCE/DIAG/seed gates in the diff. Green/strict/
cohort claimed in the D-log; HEAD re-confirmation
lands with the iteration cadence run.

**Actionable C-wrongs**: none (fallthrough nit is
map-debt wording, not a behavior gap).

Verdict: **ACCEPT**
