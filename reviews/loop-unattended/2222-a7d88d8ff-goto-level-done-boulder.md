# Review 2222 — a7d88d8ff — goto_level leave-arms + done seq/msg + boulder drawbridge

Metadata: SHA `a7d88d8ffcbf71432759106d092a173f79153050` (D-3261,
2026-10-02). `js/do.js` (+20/−12), `js/end.js` (+22/−3). Cluster: 3
missing-arm completions across do.c + end.c (goto_level's callee
closure holds done) — coherent. Method per function below.

Intent vs deliverable: subject promises "goto_level leave-arms +
done done_seq/last_msg + boulder_hits_pool drawbridge/mondied". The
diff delivers fill_pit/set_ustuck/uundetected in C order, the
done_seq catch-up + hangup Die? conjunct + last_msg write, and the
DB mask morph + mondied. Delivers what it promises.

Inventory:

- `goto_level` (`js/do.js:1700`): +fill_pit(u.ux,u.uy) :1619,
  +set_ustuck(null) :1620, +u.uundetected=0 :1622 around live
  set_uinwater(0) (:1621) — C order exact.
- `done` (`js/end.js:2104`): +done_seq catch-up (C :1061–1062 —
  D-log cites :1050–1051, off by ~11 lines; the code match is
  exact), +hangup `done_hup && done_seq++ == hero_seq` conjunct
  (C :1110), +last_msg=PLNMSG_OK_DONT_DIE (C :1113).
- `boulder_hits_pool` (`js/do.js:970`): DRAWBRIDGE_UP arm now
  `drawbridgemask = (mask & ~DB_UNDER) | DB_FLOOR` (C :74–77,
  single-statement exact, no typ/flags/recalc per C); monster arm
  now `await mondied(mtmp)` (C :89–91) under the pre-existing
  `m_at && !(mhp<=0) && !m_in_air` gate.
- Imports: fill_pit extends do.js→dig.js :183; DB_FLOOR/DB_UNDER +
  PLNMSG_OK_DONT_DIE extend const.js edges — all pre-existing, no
  new module edge (verified in hunks). `sym.mjs`: fill_pit
  dig.js:1019 sync (un-awaited call correct); set_ustuck
  mhitu.js:1602 sync (correct); mondied mhitm.js:3980 ASYNC
  (awaited ✓); m_in_air NOT EXPORTED — 4 local clones (do.js:560,
  mon.js:2303, teleport.js:216, trap.js:1169). No symbols deleted
  or re-pointed.

**C ↔ JS fidelity — `goto_level`** (C do.c:1618–1622)

- Order reset_utrap → fill_pit → set_ustuck → set_uinwater →
  uundetected matches C exactly ✓. Live set_ustuck (mhitu.js:1602)
  sets botl unconditionally + clears uswallow/uswldtim on null —
  matches C mon.c:3421–3434 (sanity/impossible arm is debug-only;
  correctly absent) ✓. fill_pit sync ✓.
- Callers: 8 C sites mapped to wired JS sites, signature
  unchanged ✓ (spot-checked dodown/deferred_goto; the next/prev
  homing drift is pre-existing and named).

**C ↔ JS fidelity — `done`** (C end.c:1040–1120)

- done_seq: `if (done_seq < hero_seq) done_seq = hero_seq` placed
  after the bot block — C-exact; game.done_seq/hero_seq live on
  game via allmain.js ✓.
- Hangup conjunct: C `!(done_hup && done_seq++ == hero_seq)`. JS
  runs the post-increment compare only when earlier conjuncts pass
  (block is inside the `if`) AND done_hup is set — short-circuit
  exact, including the increment side effect ✓. hangupNo polarity
  verified: blocks entry exactly when C's conjunct is false ✓.
- last_msg written after the OK pline, before savelife — C order
  exact ✓. PLNMSG enum order in const.js (:1145–1156) matches C
  flag.h:530–543 entry-for-entry (OK_DONT_DIE right after
  OBJNAM_ONLY) ✓. Consumer timeout.js:933 already live ✓.

**C ↔ JS fidelity — `boulder_hits_pool`** (C do.c:49–155)

- Mask morph C-exact ✓. DEADMONSTER gate: C `mhp < 1`
  (monst.h:214) vs JS `!(mhp <= 0)` — equivalent ✓.
- C fetches t_at (:73) before the morph; JS fetches after mondied
  (pre-existing line order). Neither the morph nor mondied alters
  the trap chain at (rx,ry) — semantically equivalent, not flagged.
- **Clone gap (debt, see Actionable 1):** the gate's `m_in_air`
  is the do.js:560 subset clone (`is_flyer || is_floater`), which
  drops C's third disjunct `(is_clinger && has_ceiling &&
  mundetected)` (mon.c:2130–2136). A ceiling-clinging undetected
  monster exactly at a boulder-filled square dies in JS, survives
  in C. Pre-existing clone, commit-named as "clone-drift debt",
  but absent from the D-log Named omissions — recorded here.
  Landscape: trap.js:1169's clone is C-complete (uses
  has_ceiling_trap); mon.js:2303 lacks only has_ceiling;
  teleport.js:216 same subset as do.js.

Hallucinations / overclaim: none material. The D-log's done_seq
citation (:1050–1051 vs actual :1061–1062) is an ~11-line citation
drift — code match verified exact, not an overclaim. "Full 44/44
(auto: shared file changed)" is the verify script's own gate.

Density: 3 arm-completions, 2 files, +42/−15 JS — below
the ~80 floor with the D-3258 escape (coverage generator 0 rows,
do.c nothing more Open) honestly invoked in the D-log. Verdicts:
goto_level ACCEPT, done ACCEPT, boulder_hits_pool ACCEPT-WITH-DEBT
(clone gap). Each has its own `Ledger:` entry (all `partial`) and
Verify sub-bullet. SHA verdict = worst = ACCEPT-WITH-DEBT.

Verification: D-log Verify shows green/strict/cohort/full 44/44 +
3× "hidden note (0 blocked)" with REACH-OK. Re-measured
(`hidden-proxy.mjs verify goto_level,done,boulder_hits_pool --base
a7d88d8ff~1 --reach-all`): all three vacuous at baseline (rows
cited 0 blocks — correctly presented as notes, not PASS) +
`reach goto_level: 32/32 → REACH-OK`, `smoke done/boulder:
24/24 → REACH-OK` each. Zero regressed. Banned-pattern grep on
js/ hunks: clean. Rule #2 clean (2221 run).

**Actionable C-wrongs**

1. `mon.c` m_in_air canonical export (map debt, unqueued —
   1563-class subset-clone precedent): export the C-complete body
   (mon.c:2130–2136; trap.js:1169 already has it modulo
   has_ceiling vs has_ceiling_trap equivalence to confirm), re-point
   the do.js:560, mon.js:2303 and teleport.js:216 subset clones,
   keep `verify --fn m_in_air` REACH-OK. Trigger today needs
   clinger + ceiling + mundetected + boulder-fill square — narrow,
   pre-existing, and this SHA strictly reduced the arm's divergence
   (mtrapped-clear → mondied); hence debt, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
