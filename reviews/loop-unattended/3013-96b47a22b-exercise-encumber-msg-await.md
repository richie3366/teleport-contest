# Review 3013 — 96b47a22b — exercise waits for encumber_msg's --More--

- SHA: `96b47a22b` (cliff; board row do_statusline2, 4 sessions,
  status row differs at a --More--)
- D-entry: D-4173; Ledger: exercise, exerper, encumber_msg ported
- `js/` diff: 23 files, +261 −203 (attrib.js +6 −2, allmain.js +23 −11,
  invent.js +7 −2; the rest is `exercise(` → `await exercise(` at the
  STR/CON sites)

## Intent vs deliverable

Promise: attrib.c exercise ends with `encumber_msg()` for STR/CON
(`:516–517`), whose pline can block at a --More-- before exercise
returns. JS floated it (`void encumber_msg()`), so callers ran on
(find_ac, mdamageu, the next RNG draw) before the key was read. Second
writer: encumber_msg left `_pending_botl` set on the message-less
Overloaded → Overtaxed crossing.

Diff: exercise returns encumber_msg's promise. exerper becomes async
and awaits its STR/CON calls through `ex()`, and exerchk awaits exerper.
96 STR/CON sites in async functions await exercise. encumber_msg sets
`_pending_botl` only on a crossing that prints. The promise matches the
diff.

## Inventory

- exercise — attrib.js:241 (C attrib.c:486–518): tail returns the
  promise.
- exerper — allmain.js:570 (C attrib.c:520–580): async; 8 STR/CON
  calls awaited, DEX/WIS calls unchanged.
- exerchk — allmain.js:666 (C `:598–603`): `await exerper()`.
- encumber_msg — invent.js:1203 (C pickup.c:1977–2020): `_pending_botl`
  gate.
- 96 call sites across 20 files: `await` added only.

## C ↔ JS fidelity

- **exercise tail.** C `:516–517` is `if (svm.moves > 0 && (i == A_STR
  || i == A_CON)) encumber_msg();`. JS has the same gate and returns
  the call's promise. The rn2(19)/rn2(2) AEXE draw (`:509`) is
  unchanged and still precedes it.
- **encumber_msg.** `csym encumber_msg` (pickup.c:1977–2020): the
  increase switch always prints (cases 1–3 and a default). The decrease
  switch prints only for newcap 0–3. Both arms set `disp.botl = TRUE`.
  JS's new `_pending_botl` predicate is `oldcap < newcap || (oldcap >
  newcap && newcap <= HVY_ENCUMBER)`, exactly the printing arms. The
  real botl set below it still fires on every crossing, as in C.
  `_pending_botl` is JS's deferred-commit model for "botl seen by this
  pline's flush"; it is not a C field. The change removes a commit that
  C has no pline to carry.
- **Caller coverage.** `grep -an "[^a-z_.]exercise("` minus awaited,
  ex(), comments and the DEX/WIS/INT/CHA sites returns nothing. Every
  STR/CON caller now awaits. A syntax pass (verify.mjs, D-log) confirms
  each is inside an async function.
- **Order.** In the zapfest case, C runs exerchk (`allmain.c:356`)
  before find_ac (`:453`). The awaited chain puts the --More-- before
  find_ac, which matches the measured C RNG boundary (`rn2(19) @
  exercise` ends the step).

## Hallucinations / overclaim

None. The fourth do_statusline2 row (worldtour-Valkyrie) was declared a
different cause and left to D-4178, which healed it.

## Density

One C fact (a blocking pline inside exercise) with its async closure.
The 96 one-word edits are the mechanical cost of the sync → async edge,
not scope creep. Right-sized.

## Verification

```text
verify do_statusline2,exercise,encumber_msg --base 96b47a22b~1 --no-reach
  do_statusline2: 4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  exercise / encumber_msg: 0 blocked (vacuous)
```

The 4th PASS is scen-worldtour-Valkyrie-49955041, healed later by D-4178
(this re-run uses HEAD's code). The D-log's own 3 PASS + 1 unchanged
is consistent with that.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
