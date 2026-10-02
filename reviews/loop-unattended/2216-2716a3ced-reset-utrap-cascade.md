# Review 2216 — 2716a3ced — reset_utrap restart + await cascade

Metadata: SHA `2716a3ceded9d9ed22b8efc1ab51fc1b7c5e1158` (D-3255, 2026-10-02).
14 js/ files, +56 net. Restart of a 1-line THIN + mechanical async
cascade + 4 caller wirings. Highest-risk SHA of the nine (shared file,
cross-file awaits) — audited accordingly.

Intent vs deliverable: subject promises "reset_utrap msg/Levitation/
Flying restore + 19-site TRUE await cascade + 4 caller wirings". Counts
verified from the diff, not the message: 20 added
`await reset_utrap(true)` lines = 19 conversions + 1 new (domove_core)
✓; 3 added `reset_utrap(false)` (teleds/savelife/goto_level) + the
domove TRUE = 4 wirings ✓. Delivers what it promises.

Inventory:

- `reset_utrap` (`js/trap.js:3036`): sync 1-liner → `export async
  function reset_utrap(msg)` in C order (was_Lev/was_Fly snapshot →
  set_utrap(0,0) → msg arms). Callees all LIVE same-file or
  pre-imported: `hero_Levitation`/:1580 `hero_Flying` (D-1070 youprop
  helpers), `set_utrap`, `float_up` (`sym.mjs`: js/trap.js:3251 ASYNC,
  awaited), `You` (pline). No clones, no stubs.
- Cascade: `delfloortrap` → async (5 TRUE-site + internal), 19 TRUE
  sites `reset_utrap(true)` → `await reset_utrap(true)`,
  `buried_ball_to_freedom` → async, `delfloortrap`/`buried` callers
  awaited. FALSE sites deliberately un-awaited (see below).
- No symbols deleted or re-pointed (clone→import): `sym.mjs` outputs
  pasted above (`float_up`, `delfloortrap`, `buried_ball_to_freedom`
  all ASYNC). New static imports (`reset_utrap` into end.js, cmd.js,
  teleport.js, do.js…) extend pre-existing trap.js edges:
  `imports.mjs --can end.js trap.js reset_utrap` → ALREADY, no new
  edge. Call-time use of a hoisted function — no TDZ.

**C ↔ JS fidelity**

- Body — C `trap.c:1044–1057`: snapshot → `set_utrap(0,0)` →
  `if (msg)` float_up / `You("can fly.")`. JS is line-exact modulo
  await. No RNG either side.
- The 4 wirings checked against C call sites (`--callers`, 41 refs):
  - domove TRUE ← C `hack.c:2835` (`if (!u.utrap)` post-trapmove,
    botl + reset TRUE): JS `cmd.js:6189` matches gate, flags, arg. ✓
  - teleds FALSE ← C `teleport.c:487` (unconditional, before
    set_ustuck): JS `teleport.js:1489` same position, replaces inline
    clear. ✓
  - savelife FALSE ← C `end.c:738–739` (`u.utrap && TT_LAVA` gate):
    JS `end.js:2060` same gate, replaces inline clear. ✓
  - goto_level FALSE ← C `do.c:1618` ("needed in level_tele"): JS
    `do.js:1697` wired; fill_pit/set_ustuck/uundetected stay named
    (now a queue row). ✓
- Cascade soundness (independently re-checked, not trusted):
  every `reset_utrap(true` in `js/` is awaited (zero un-awaited TRUE
  outside comments); every `delfloortrap(`/`buried_ball_to_freedom(`
  in `js/`+`scripts/` is awaited. FALSE sites float un-awaited — safe
  by construction: with msg=false the body reaches no await, so the
  sync prefix (snapshot + set_utrap) runs synchronously, behaviorally
  identical to the old sync version.
- Stale pops (enhance_weapon_skill, trapeffect_landmine): bodies
  present with C-range docs (`js/weapon.js:1142`,
  `js/trap.js:5854–6065`); rows left Open, ledger-ported. Consistent
  with D-3251's identical verdict; no contradiction found.
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. "Every hunk reviewed in git diff"
is plausible — my independent re-grep reproduces the 19/10/4 counts.
The zap.c:5303 named omit is queued as its own row in the same commit
(shipped later as D-3259 — closes the loop).

Density (§2b): 14 files / +56 — one function whole + mechanical cascade
the restart forces. The cascade is part of the cluster (same callee
closure), not padding. Under caps. ACCEPT.

Verification: re-measured:
`verify reset_utrap --base 2716a3ced~1 --reach-all` → vacuous (D-log
says exactly that: missing-arm row) + `smoke 24/24 → REACH-OK`, 0
regressed. D-log's full-44/44 re-proven by this audit's own sessions
run (see iteration close). The newly-live msg arms (float_up /
"can fly") change behavior only where C emits them — no fortress
movement.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
