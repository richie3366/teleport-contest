# Review 1085 — 8985b7aa — kickedloc clears unconditionally at domove() end

Metadata: SHA `8985b7aa`, D-2119, `js/cmd.js` only (net −1 line:
3 arm-clears removed, 1 finally-clear added). No prior review claims
this SHA.

Intent vs deliverable: the subject promises the exact C shape —
`kickedloc` cleared unconditionally at `domove()` end beside
`domove_attempting = 0`, deleting the `did_step`-gated clear and the
three now-redundant fight-arm clears. The diff delivers exactly that
and nothing else.

Inventory: zero new/extended functions (one statement moved); zero
new imports; zero deleted symbols (no `sym.mjs` deletion output
required).

**C ↔ JS fidelity**: C `domove`
(`nethack-c/upstream/src/hack.c:2694–2709`, 16 lines) is a thin
wrapper: `domove_core()` runs (all bumps, fights, ironbars/web/empty
arms live inside it), then unconditionally
`gd.domove_attempting = 0L; gk.kickedloc.x = 0, gk.kickedloc.y = 0;`
(`:2708`). JS now mirrors this: the `try {` opens at the top of
`domove` (cmd.js:3083–3084) and the `finally` (cmd.js:3527) sets
`game.domove_attempting = 0; game.kickedloc = { x: 0, y: 0 };` — same
position, same unconditionality. The three removed clears sat in early
`return` paths (ironbars/web/empty, old lines ~3161–3172) that are
inside the `try`, so the `finally` covers them exactly as C's outer
clear covers `domove_core()`'s internal returns — no path loses or
gains a clear. The removed `if (did_step)` gate was the actual C-wrong
(a bumped/failed step left a stale kicked square that made pets avoid
it, starving `dog_move`'s selection draw). Mechanism, confirmed
against the symptom: the stale square was (26,9); with it uncleared,
the pet's `m_avoid_kicked_loc` arm kept skipping square j==0, so the
`!rn2(++chcnt)` selection draw at `dogmove.c:1255` never fired while C
drew `rn2(1)` there every prayer round — exactly the recorded first
divergence (C `rn2(1)=0 @ dog_move` vs JS `rn2(5) @ distfleeck`, same
step, matching toplines). The fix frees the square every turn, so the
pet stops avoiding it next turn, as the new code comment states.
Call-site parity (cmd.c:3788/3799/5375 + allmain.c:526 vs
cmd.js:1703/2049/2445/2460/2621/2654/2670) was spot-checked against the
`--callers` list and holds: C calls `domove()` per direction key and
per run/travel continuation turn, and JS `domove()` runs on the same
set, so no caller can observe a stale square across turns. The
`cmd.js:740` rhack `ECMD_TIME` clear and the `dokick.js:1636` set are
untouched and orthogonal (set vs clear sides of the same square).
RNG: none in C body; none added.

Hallucinations / overclaim: none. "C is 1 statement" is true for the
changed locus (`:2708`). The "behaved C-correctly given stale state"
note correctly scopes the fix to state, not to `dog_move`'s body.

Density: a 1-statement C locus honestly disclosed as such — not a
density miss.

Verification: D-log claims `verify dog_move` → PROGRESS
(Rogue-92146 48 → `hmon_hitmon_weapon_melee`@122), green 2/2, strict
×2, cohort 7/7. Re-measured: `hidden-proxy.mjs verify dog_move --base
8985b7aa~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (same session, same step move). Exact, non-vacuous match.
No FORCE/DIAG/seed/coordinate reads in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
