# Review 1189 — e0280149 — cant_finish_meal meal-interrupt (D-2223)

Metadata: SHA `e0280149`, `js/eat.js` + `js/zap.js`,
D-2223. Queue row revive/corpse family (0 blocked) —
`revive()` never detached the meal, so a later
`stop_occupation()` could consume the revived corpse
via `maybe_finished_meal()`.

Intent vs deliverable: subject promises the helper
plus the revive call-site wiring. Diff delivers the
new export after `eatfood` and the one call line in
`revive`. Nothing else.

Inventory: one new async export `cant_finish_meal`;
two import-list extensions (`donull` into eat.js,
`cant_finish_meal` into zap.js) — both
`imports.mjs --can` → ALREADY, no new edges. No body
deleted, no clone added, no symbol deleted or
re-pointed.

**C ↔ JS fidelity**: checked against pinned
`eat.c:3892–3912` (csym range) and the `zap.c:909`
call site (lines read directly). Gate
`occupation == eatfood && piece == corpse` ✓ —
correctly placed in eat.js, since it compares the
module-local `eatfood` identity. `zero_victual` →
house `{}` (5 pre-existing uses in eat.js, incl.
`:2004` in the same neighborhood) ✓. `oeaten = 1`
floor ✓. `occupation = donull` assigns the async
`do.js:1191` export by identity, matching C's
function-pointer assign ✓. `stop_occupation()` then
`newuhs(FALSE)`, awaited in C order (both live:
stop_occupation imported `:106`, newuhs defined
`:548`) ✓. No RNG either side ✓. Call site in C
position (after is_zomb, before `x = y = 0`) ✓, with
C's own comment rationale (after-makemon is too
late) preserved. Remaining omits named: opposite
predicate `maybe_finished_meal` (queued as Open
refill — confirmed present in LOOP-QUEUE.md) and the
`steal.c:371` caller.

Hallucinations / overclaim: none. D-log claims no
corpus PASS.

Density: §2b right-size — one helper + one call
site, two already-linked modules.

Verification: re-measured —
`verify cant_finish_meal --base e0280149~1` → 0
blocked at baseline and working scoreboard +
vacuous warning. Row cited 0 blocks; honest. Rule
#2 clean; no banned patterns. Green/strict/cohort
claimed; HEAD re-confirmation with the cadence run.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
